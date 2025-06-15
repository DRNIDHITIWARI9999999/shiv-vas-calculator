
// Swiss Ephemeris wrapper for accurate astronomical calculations
import { swe_calc_ut, swe_rise_trans_true_hor, swe_julday, swe_set_ephe_path, SE_SUN, SE_MOON } from 'swisseph';

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

// Initialize Swiss Ephemeris
swe_set_ephe_path(''); // Use built-in ephemeris data

// Convert Date to Julian Day Number
export function dateToJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours() + (date.getUTCMinutes() / 60) + (date.getUTCSeconds() / 3600);
  
  return swe_julday(year, month, day, hour, 1); // 1 = Gregorian calendar
}

// Calculate accurate sunrise for given location and date
export function calculateAccurateSunrise(date: Date, latitude: number, longitude: number): SunriseData {
  try {
    const jd = dateToJulianDay(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
    
    // Calculate sunrise, sunset, and solar noon
    const sunriseResult = swe_rise_trans_true_hor(jd, SE_SUN, longitude, latitude, -0.8333, 1); // 1 = sunrise
    const sunsetResult = swe_rise_trans_true_hor(jd, SE_SUN, longitude, latitude, -0.8333, 2); // 2 = sunset
    const solarNoonResult = swe_rise_trans_true_hor(jd, SE_SUN, longitude, latitude, 0, 4); // 4 = upper culmination
    
    const sunrise = julianDayToDate(sunriseResult.tret[0]);
    const sunset = julianDayToDate(sunsetResult.tret[0]);
    const solarNoon = julianDayToDate(solarNoonResult.tret[0]);
    
    return { sunrise, sunset, solarNoon };
  } catch (error) {
    console.error('Error calculating sunrise:', error);
    // Fallback to approximate calculation
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

// Calculate accurate planetary positions using Swiss Ephemeris
export function calculatePlanetPosition(jd: number, planet: number): AccuratePlanetPosition {
  try {
    const result = swe_calc_ut(jd, planet, 0); // 0 = SEFLG_SWIEPH
    
    return {
      longitude: result.xx[0],
      latitude: result.xx[1], 
      distance: result.xx[2],
      speed: result.xx[3]
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

// Calculate accurate Sun and Moon positions at sunrise
export function getSunMoonPositionsAtSunrise(date: Date, latitude: number, longitude: number) {
  const sunriseData = calculateAccurateSunrise(date, latitude, longitude);
  const sunriseJD = dateToJulianDay(sunriseData.sunrise);
  
  const sunPosition = calculatePlanetPosition(sunriseJD, SE_SUN);
  const moonPosition = calculatePlanetPosition(sunriseJD, SE_MOON);
  
  return {
    sunrise: sunriseData.sunrise,
    sunset: sunriseData.sunset,
    solarNoon: sunriseData.solarNoon,
    sunLongitude: sunPosition.longitude,
    moonLongitude: moonPosition.longitude
  };
}
