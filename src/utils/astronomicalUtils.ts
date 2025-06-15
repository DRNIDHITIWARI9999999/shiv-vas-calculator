
import { format, addDays, setHours, setMinutes } from 'date-fns';

// Swiss Ephemeris-inspired planetary position calculations
export interface PlanetaryPosition {
  longitude: number;
  latitude: number;
  distance: number;
}

export interface PanchangData {
  tithi: string;
  tithiNumber: number;
  nakshatra: string;
  nakshatraNumber: number;
  yoga: string;
  karana: string;
  sunrise: Date;
  sunset: Date;
  moonrise: Date;
  moonset: Date;
  rahu: string;
  yamaghanta: string;
  gulika: string;
  abhijit: string;
}

export interface ShivVaasData {
  isShivVaas: boolean;
  type: string;
  startTime: Date;
  endTime: Date;
  significance: string;
  observances: string[];
}

// Nakshatra names in Sanskrit
const NAKSHATRAS = [
  'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशीर्षा', 'आर्द्रा', 'पुनर्वसु',
  'पुष्य', 'आश्लेषा', 'मघा', 'पूर्व फाल्गुनी', 'उत्तर फाल्गुनी', 'हस्त', 'चित्रा',
  'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा', 'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा',
  'श्रवण', 'धनिष्ठा', 'शतभिषा', 'पूर्वभाद्रपद', 'उत्तरभाद्रपद', 'रेवती'
];

// Tithi names
const TITHIS = [
  'प्रतिपदा', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पंचमी', 'षष्ठी', 'सप्तमी',
  'अष्टमी', 'नवमी', 'दशमी', 'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा/अमावस्या'
];

// Yoga names
const YOGAS = [
  'विष्कुम्भ', 'प्रीति', 'आयुष्मान', 'सौभाग्य', 'शोभन', 'अतिगण्ड', 'सुकर्मा',
  'धृति', 'शूल', 'गण्ड', 'वृद्धि', 'ध्रुव', 'व्याघात', 'हर्षण', 'वज्र',
  'सिद्धि', 'व्यतीपात', 'वरीयान', 'परिघ', 'शिव', 'सिद्ध', 'साध्य',
  'शुभ', 'शुक्ल', 'ब्रह्म', 'इन्द्र', 'वैधृति'
];

// Calculate lunar day (Tithi)
export function calculateTithi(date: Date): { name: string; number: number } {
  const lunarMonth = (date.getTime() / (1000 * 60 * 60 * 24)) % 29.53;
  const tithiNumber = Math.floor(lunarMonth) + 1;
  const adjustedTithi = tithiNumber > 15 ? tithiNumber - 15 : tithiNumber;
  
  return {
    name: TITHIS[adjustedTithi - 1] || TITHIS[14],
    number: adjustedTithi
  };
}

// Calculate Nakshatra
export function calculateNakshatra(date: Date): { name: string; number: number } {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const nakshatraNumber = (dayOfYear % 27) + 1;
  
  return {
    name: NAKSHATRAS[nakshatraNumber - 1],
    number: nakshatraNumber
  };
}

// Calculate Yoga
export function calculateYoga(date: Date): string {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const yogaIndex = dayOfYear % 27;
  return YOGAS[yogaIndex];
}

// Calculate sunrise and sunset (simplified)
export function calculateSunTimes(date: Date, latitude: number, longitude: number) {
  // Simplified calculation - in real app would use precise ephemeris
  const sunrise = setHours(setMinutes(new Date(date), 30), 6);
  const sunset = setHours(setMinutes(new Date(date), 15), 18);
  
  return { sunrise, sunset };
}

// Calculate moon times (simplified)
export function calculateMoonTimes(date: Date) {
  const lunarPhase = (date.getTime() / (1000 * 60 * 60 * 24)) % 29.53;
  const moonriseHour = 6 + (lunarPhase * 0.8);
  const moonsetHour = 18 + (lunarPhase * 0.5);
  
  const moonrise = setHours(setMinutes(new Date(date), (moonriseHour % 1) * 60), Math.floor(moonriseHour));
  const moonset = setHours(setMinutes(new Date(date), (moonsetHour % 1) * 60), Math.floor(moonsetHour) % 24);
  
  return { moonrise, moonset };
}

// Calculate complete Panchang data
export function calculatePanchang(date: Date, latitude: number = 28.6139, longitude: number = 77.2090): PanchangData {
  const tithi = calculateTithi(date);
  const nakshatra = calculateNakshatra(date);
  const yoga = calculateYoga(date);
  const sunTimes = calculateSunTimes(date, latitude, longitude);
  const moonTimes = calculateMoonTimes(date);
  
  // Calculate auspicious and inauspicious times
  const rahuStart = setHours(setMinutes(new Date(date), 30), 10);
  const rahuEnd = setHours(setMinutes(new Date(date), 0), 12);
  const yamaStart = setHours(setMinutes(new Date(date), 0), 14);
  const yamaEnd = setHours(setMinutes(new Date(date), 30), 15);
  
  return {
    tithi: tithi.name,
    tithiNumber: tithi.number,
    nakshatra: nakshatra.name,
    nakshatraNumber: nakshatra.number,
    yoga,
    karana: 'बव', // Simplified
    sunrise: sunTimes.sunrise,
    sunset: sunTimes.sunset,
    moonrise: moonTimes.moonrise,
    moonset: moonTimes.moonset,
    rahu: `${format(rahuStart, 'HH:mm')} - ${format(rahuEnd, 'HH:mm')}`,
    yamaghanta: `${format(yamaStart, 'HH:mm')} - ${format(yamaEnd, 'HH:mm')}`,
    gulika: '15:00 - 16:30',
    abhijit: '11:48 - 12:36'
  };
}

// Calculate Shiv Vaas - specific fasting days dedicated to Lord Shiva
export function calculateShivVaas(date: Date): ShivVaasData {
  const tithi = calculateTithi(date);
  const nakshatra = calculateNakshatra(date);
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  let isShivVaas = false;
  let type = '';
  let significance = '';
  let observances: string[] = [];
  
  // Monday is always auspicious for Lord Shiva
  if (dayOfWeek === 1) {
    isShivVaas = true;
    type = 'सोमवार व्रत';
    significance = 'भगवान शिव को समर्पित पवित्र दिन';
    observances = ['सूर्योदय से सूर्यास्त तक उपवास', 'शिव मंत्र जाप', 'रुद्राभिषेक', 'बिल्व पत्र अर्पण'];
  }
  
  // Chaturdashi (14th lunar day) - Shivaratri
  if (tithi.number === 14) {
    isShivVaas = true;
    type = 'मासिक शिवरात्रि';
    significance = 'मासिक शिवरात्रि - अत्यंत पुण्यकारी';
    observances = ['रात्रि जागरण', 'निर्जला उपवास', 'शिव तांडव स्तोत्र', 'महामृत्युंजय मंत्र'];
  }
  
  // Pradosh (13th lunar day)
  if (tithi.number === 13) {
    isShivVaas = true;
    type = 'प्रदोष व्रत';
    significance = 'प्रदोष काल में शिव पूजा अत्यंत फलदायी';
    observances = ['संध्या काल पूजा', 'शिव चालीसा पाठ', 'नंदी दर्शन', 'धूप दीप अर्पण'];
  }
  
  // Shravan month special consideration (simplified)
  const isShravanMonth = date.getMonth() === 6 || date.getMonth() === 7; // July-August approximation
  if (isShravanMonth && dayOfWeek === 1) {
    type = 'श्रावण सोमवार व्रत';
    significance = 'श्रावण मास का सोमवार - सर्वोत्तम शिव व्रत';
  }
  
  const startTime = setHours(setMinutes(new Date(date), 0), 5); // 5:00 AM
  const endTime = setHours(setMinutes(addDays(date, 1), 0), 6); // Next day 6:00 AM
  
  return {
    isShivVaas,
    type,
    startTime,
    endTime,
    significance,
    observances
  };
}

// Determine auspicious timing for Shiva worship
export function getShivaPujaTime(date: Date): { time: string; significance: string } {
  const hour = date.getHours();
  
  if (hour >= 4 && hour < 6) {
    return { time: 'ब्रह्म मुहूर्त', significance: 'सर्वोत्तम पूजा काल' };
  } else if (hour >= 18 && hour < 20) {
    return { time: 'संध्या काल', significance: 'प्रदोष पूजा का समय' };
  } else if (hour >= 23 || hour < 2) {
    return { time: 'निशीथ काल', significance: 'शिवरात्रि पूजा काल' };
  } else {
    return { time: 'सामान्य काल', significance: 'नियमित पूजा समय' };
  }
}
