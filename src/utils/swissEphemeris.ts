
// Browser-compatible astronomical calculations using SunCalc
// Removed Swiss Ephemeris dependency due to native compilation issues

import SunCalc from 'suncalc';

export interface AccuratePlanetPosition {
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
}

export interface SunriseData {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
}

// Convert Date to Julian Day Number (standard astronomical formula)
export function dateToJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours() + (date.getUTCMinutes() / 60) + (date.getUTCSeconds() / 3600);
  
  let a = Math.floor((14 - month) / 12);
  let y = year + 4800 - a;
  let m = month + 12 * a - 3;
  
  let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  return jdn + (hour - 12) / 24;
}

// Calculate accurate sunrise using SunCalc (browser-compatible)
export function calculateAccurateSunrise(date: Date, latitude: number, longitude: number): SunriseData {
  try {
    const times = SunCalc.getTimes(date, latitude, longitude);
    
    return {
      sunrise: times.sunrise || new Date(date.getFullYear(), date.getMonth(), date.getDate(), 6, 0, 0),
      sunset: times.sunset || new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0),
      solarNoon: times.solarNoon || new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0)
    };
  } catch (error) {
    console.error('Error calculating sunrise:', error);
    // Fallback calculation
    const sunrise = new Date(date);
    sunrise.setHours(6, 0, 0, 0);
    const sunset = new Date(date);
    sunset.setHours(18, 0, 0, 0);
    const solarNoon = new Date(date);
    solarNoon.setHours(12, 0, 0, 0);
    
    return { sunrise, sunset, solarNoon };
  }
}

// Enhanced browser-compatible planetary position calculation using VSOP87-inspired formulas
export function calculatePlanetPosition(jd: number, planet: number): AccuratePlanetPosition {
  try {
    const t = (jd - 2451545.0) / 36525; // Julian centuries since J2000.0
    
    if (planet === 0) { // Sun
      // More accurate Sun position using VSOP87 approximation
      const L0 = (280.46646 + 36000.76983 * t + 0.0003032 * t * t) % 360;
      const M = (357.52911 + 35999.05029 * t - 0.0001537 * t * t) % 360;
      const C = (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(M * Math.PI / 180) +
                (0.019993 - 0.000101 * t) * Math.sin(2 * M * Math.PI / 180) +
                0.000289 * Math.sin(3 * M * Math.PI / 180);
      
      const trueAnomaly = M + C;
      const trueLongitude = (L0 + C) % 360;
      
      return {
        longitude: trueLongitude < 0 ? trueLongitude + 360 : trueLongitude,
        latitude: 0, // Sun's ecliptic latitude is always 0
        distance: 1.000001018 * (1 - 0.01671123 * Math.cos(trueAnomaly * Math.PI / 180)),
        speed: 0.9856 // degrees per day approximately
      };
    } else if (planet === 1) { // Moon
      // Enhanced Moon position calculation using ELP2000 approximation
      const L = (218.3164477 + 481267.88123421 * t - 0.0015786 * t * t + t * t * t / 538841 - t * t * t * t / 65194000) % 360;
      const D = (297.8501921 + 445267.1114034 * t - 0.0018819 * t * t + t * t * t / 545868 - t * t * t * t / 113065000) % 360;
      const M = (357.5291092 + 35999.0502909 * t - 0.0001536 * t * t + t * t * t / 24490000) % 360;
      const M_prime = (134.9633964 + 477198.8675055 * t + 0.0087414 * t * t + t * t * t / 69699 - t * t * t * t / 14712000) % 360;
      
      // Main periodic terms (simplified ELP2000)
      const longitude = L + 
        6.289 * Math.sin(M_prime * Math.PI / 180) +
        1.274 * Math.sin((2 * D - M_prime) * Math.PI / 180) +
        0.658 * Math.sin(2 * D * Math.PI / 180) +
        0.214 * Math.sin(2 * M_prime * Math.PI / 180) +
        -0.185 * Math.sin(M * Math.PI / 180);
      
      const latitude = 5.128 * Math.sin((M_prime + 93.27) * Math.PI / 180) +
        0.281 * Math.sin((M_prime - 2 * D + 119.75) * Math.PI / 180);
      
      return {
        longitude: longitude < 0 ? longitude + 360 : longitude % 360,
        latitude: latitude,
        distance: 385000.56 + 20905.355 * Math.cos(M_prime * Math.PI / 180), // km
        speed: 13.176 // degrees per day approximately
      };
    }
    
    return {
      longitude: 0,
      latitude: 0,
      distance: 0,
      speed: 0
    };
  } catch (error) {
    console.error(`Error calculating position for planet ${planet}:`, error);
    return {
      longitude: 0,
      latitude: 0,
      distance: 0,
      speed: 0
    };
  }
}

// Calculate Sun and Moon positions at sunrise using browser-compatible methods
export function getSunMoonPositionsAtSunrise(date: Date, latitude: number, longitude: number) {
  const sunriseData = calculateAccurateSunrise(date, latitude, longitude);
  const sunriseJD = dateToJulianDay(sunriseData.sunrise);
  
  const sunPosition = calculatePlanetPosition(sunriseJD, 0); // 0 = Sun
  const moonPosition = calculatePlanetPosition(sunriseJD, 1); // 1 = Moon
  
  return {
    sunrise: sunriseData.sunrise,
    sunset: sunriseData.sunset,
    solarNoon: sunriseData.solarNoon,
    sunLongitude: sunPosition.longitude,
    moonLongitude: moonPosition.longitude
  };
}
