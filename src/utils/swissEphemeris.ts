
// Browser-compatible astronomical calculations using SunCalc as fallback
// Swiss Ephemeris has compatibility issues in browser environments

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

// Convert Julian Day to Date
function julianDayToDate(jd: number): Date {
  const millisPerDay = 24 * 60 * 60 * 1000;
  const j1970 = 2440588; // Julian day for 1970-01-01
  return new Date((jd - j1970) * millisPerDay);
}

// Browser-compatible planetary position calculation using astronomical formulas
export function calculatePlanetPosition(jd: number, planet: number): AccuratePlanetPosition {
  try {
    // Simplified astronomical calculations for browser compatibility
    // These are approximations - in a production app, you'd use VSOP87 or similar
    const t = (jd - 2451545.0) / 36525; // Julian centuries since J2000.0
    
    if (planet === 0) { // Sun
      // Sun's geometric mean longitude
      const L0 = (280.46646 + 36000.76983 * t + 0.0003032 * t * t) % 360;
      return {
        longitude: L0 < 0 ? L0 + 360 : L0,
        latitude: 0, // Sun's ecliptic latitude is always 0
        distance: 1.0, // AU
        speed: 0.9856 // degrees per day approximately
      };
    } else if (planet === 1) { // Moon
      // Moon's mean longitude
      const L = (218.3164477 + 481267.88123421 * t - 0.0015786 * t * t) % 360;
      return {
        longitude: L < 0 ? L + 360 : L,
        latitude: 0, // Simplified
        distance: 60.268, // Earth radii
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
