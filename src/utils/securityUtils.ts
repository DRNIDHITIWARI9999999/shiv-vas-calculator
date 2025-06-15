
/**
 * Security utilities for input validation and sanitization
 */

// Validate date input to prevent injection attacks
export const validateDate = (dateString: string): boolean => {
  if (!dateString || typeof dateString !== 'string') return false;
  
  // Check if it matches YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Validate time input (HH:MM format)
export const validateTime = (timeString: string): boolean => {
  if (!timeString || typeof timeString !== 'string') return false;
  
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
};

// Validate coordinates to ensure they're within valid ranges
export const validateCoordinates = (lat: number, lng: number): boolean => {
  return (
    typeof lat === 'number' && 
    typeof lng === 'number' && 
    lat >= -90 && 
    lat <= 90 && 
    lng >= -180 && 
    lng <= 180 &&
    !isNaN(lat) && 
    !isNaN(lng)
  );
};

// Sanitize city name input
export const sanitizeCityName = (cityName: string): string => {
  if (!cityName || typeof cityName !== 'string') return '';
  
  // Remove any HTML tags and special characters that could be harmful
  return cityName
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"&]/g, '') // Remove potentially harmful characters
    .trim()
    .substring(0, 100); // Limit length
};

// Rate limiting utility for API calls
export class RateLimiter {
  private calls: number[] = [];
  private maxCalls: number;
  private timeWindow: number;

  constructor(maxCalls: number = 10, timeWindowMs: number = 60000) {
    this.maxCalls = maxCalls;
    this.timeWindow = timeWindowMs;
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    
    // Remove calls outside the time window
    this.calls = this.calls.filter(time => now - time < this.timeWindow);
    
    // Check if we're within the limit
    if (this.calls.length >= this.maxCalls) {
      return false;
    }
    
    // Record this call
    this.calls.push(now);
    return true;
  }
}
