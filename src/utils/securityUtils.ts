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

// Enhanced rate limiting utility with persistence and exponential backoff
export class RateLimiter {
  private storageKey: string;
  private maxCalls: number;
  private timeWindow: number;
  private violations: number = 0;
  private lastViolationTime: number = 0;

  constructor(
    identifier: string = 'default',
    maxCalls: number = 10, 
    timeWindowMs: number = 60000
  ) {
    this.storageKey = `rate_limit_${identifier}`;
    this.maxCalls = maxCalls;
    this.timeWindow = timeWindowMs;
    this.loadState();
  }

  private loadState(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.violations = data.violations || 0;
        this.lastViolationTime = data.lastViolationTime || 0;
      }
    } catch (error) {
      console.warn('Failed to load rate limiter state:', error);
    }
  }

  private saveState(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        violations: this.violations,
        lastViolationTime: this.lastViolationTime
      }));
    } catch (error) {
      console.warn('Failed to save rate limiter state:', error);
    }
  }

  private getCalls(): number[] {
    try {
      const callsKey = `${this.storageKey}_calls`;
      const stored = localStorage.getItem(callsKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  private saveCalls(calls: number[]): void {
    try {
      const callsKey = `${this.storageKey}_calls`;
      localStorage.setItem(callsKey, JSON.stringify(calls));
    } catch (error) {
      console.warn('Failed to save calls:', error);
    }
  }

  canMakeRequest(): boolean {
    const now = Date.now();
    
    // Check if we're in a penalty period due to violations
    if (this.violations > 0) {
      const penaltyDuration = Math.min(
        this.timeWindow * Math.pow(2, this.violations - 1),
        this.timeWindow * 8 // Max 8x penalty
      );
      
      if (now - this.lastViolationTime < penaltyDuration) {
        return false;
      } else {
        // Reset violations after penalty period
        this.violations = 0;
        this.saveState();
      }
    }

    let calls = this.getCalls();
    
    // Remove calls outside the time window
    calls = calls.filter(time => now - time < this.timeWindow);
    
    // Check if we're within the limit
    if (calls.length >= this.maxCalls) {
      this.violations++;
      this.lastViolationTime = now;
      this.saveState();
      return false;
    }
    
    // Record this call
    calls.push(now);
    this.saveCalls(calls);
    return true;
  }

  getRemainingCalls(): number {
    const now = Date.now();
    const calls = this.getCalls().filter(time => now - time < this.timeWindow);
    return Math.max(0, this.maxCalls - calls.length);
  }

  getResetTime(): number {
    const calls = this.getCalls();
    if (calls.length === 0) return 0;
    
    const now = Date.now();
    const oldestCall = Math.min(...calls);
    return Math.max(0, this.timeWindow - (now - oldestCall));
  }
}

// Security monitoring utilities
export class SecurityMonitor {
  private static instance: SecurityMonitor;
  private events: Array<{
    type: string;
    timestamp: number;
    details: any;
  }> = [];

  static getInstance(): SecurityMonitor {
    if (!SecurityMonitor.instance) {
      SecurityMonitor.instance = new SecurityMonitor();
    }
    return SecurityMonitor.instance;
  }

  logSecurityEvent(type: string, details: any): void {
    const event = {
      type,
      timestamp: Date.now(),
      details
    };
    
    this.events.push(event);
    
    // Keep only last 100 events
    if (this.events.length > 100) {
      this.events = this.events.slice(-100);
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Security Event [${type}]:`, details);
    }
  }

  getRecentEvents(minutes: number = 60): Array<any> {
    const cutoff = Date.now() - (minutes * 60 * 1000);
    return this.events.filter(event => event.timestamp > cutoff);
  }
}

// Input sanitization for API requests
export const sanitizeApiInput = (input: any): any => {
  if (typeof input === 'string') {
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim()
      .substring(0, 1000);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeApiInput(value);
      } else if (typeof value === 'number' && !isNaN(value)) {
        sanitized[key] = value;
      } else if (typeof value === 'boolean') {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
  
  return input;
};
