import { GeoVector, Body, Ecliptic } from 'astronomy-engine';
import SunCalc from 'suncalc';

const TITHI_NAMES = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", 
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", 
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", 
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", 
  "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
];

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", "Punarvasu", 
  "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", 
  "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", 
  "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

const YOGAS = [
  "Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", 
  "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", 
  "Variyana", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
];

export const RASI_NAMES = [
  "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", 
  "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena"
];

const VAAR = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// AMANTA Lunar Months mapping based on Sun's Zodiac Sign at New Moon
const LUNAR_MONTHS = [
  "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada", "Ashvina", 
  "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna", "Chaitra" 
];

function getKaranaName(karanaIndex: number): string {
  if (karanaIndex === 0) return "Kintughna";
  if (karanaIndex >= 57) {
    if (karanaIndex === 57) return "Shakuni";
    if (karanaIndex === 58) return "Chatushpada";
    if (karanaIndex === 59) return "Naga";
  }
  const rotating = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti"];
  return rotating[(karanaIndex - 1) % 7];
}

// -------------------------------------------------------------
// VEDIC ASTRONOMY ENGINE (NIRAYANA - SIDEREAL SYSTEM)
// -------------------------------------------------------------

export function getAyanamsa(date: Date) {
  // Lahiri approximation for Ayanamsa
  const daysSince2000 = (date.getTime() - Date.UTC(2000, 0, 1)) / 86400000;
  const yearsSince2000 = daysSince2000 / 365.25;
  return 23.85 + (0.013969 * yearsSince2000);
}

const getTropicalEcliptic = (body: Body, date: Date) => Ecliptic(GeoVector(body, date, true));

const getNirayanaEcliptic = (body: Body, date: Date) => {
  let lon = getTropicalEcliptic(body, date).elon - getAyanamsa(date);
  if (lon < 0) lon += 360;
  return lon;
};

// Math computations
const getTithiIndex = (date: Date) => {
  let diff = getNirayanaEcliptic(Body.Moon, date) - getNirayanaEcliptic(Body.Sun, date);
  if (diff < 0) diff += 360;
  return Math.floor(diff / 12);
};

const getNakshatraIndex = (date: Date) => Math.floor(getNirayanaEcliptic(Body.Moon, date) / (360 / 27));

const getYogaIndex = (date: Date) => {
  let sum = getNirayanaEcliptic(Body.Moon, date) + getNirayanaEcliptic(Body.Sun, date);
  if (sum >= 360) sum -= 360;
  return Math.floor(sum / (360 / 27));
};

const getKaranaIndex = (date: Date) => {
  let diff = getNirayanaEcliptic(Body.Moon, date) - getNirayanaEcliptic(Body.Sun, date);
  if (diff < 0) diff += 360;
  return Math.floor(diff / 6);
};

// Binary-like Search for transition boundaries
function findTransitionTime(startDate: Date, getIndexFunc: (d: Date) => number, maxHours = 30): Date | null {
  const startIdx = getIndexFunc(startDate);
  let current = startDate.getTime();
  let foundHour = current;
  
  for (let i = 1; i <= maxHours; i++) {
    const d = new Date(current + i * 3600000);
    if (getIndexFunc(d) !== startIdx) {
      foundHour = current + (i - 1) * 3600000;
      break;
    }
  }
  
  if (foundHour === current && getIndexFunc(new Date(current + maxHours * 3600000)) === startIdx) return null;
  
  for (let m = 1; m <= 60; m++) {
    const d = new Date(foundHour + m * 60000);
    if (getIndexFunc(d) !== startIdx) return d;
  }
  return new Date(foundHour + 3600000); // fallback
}

// Moon Phase mapping for Calendar logic
function getPreviousNewMoon(date: Date): Date {
  let d = new Date(date);
  for (let i = 0; i < 35 * 24; i++) {
    d = new Date(date.getTime() - i * 3600000);
    if (getTithiIndex(d) === 29) {
      return findTransitionTime(d, getTithiIndex, 30) || d;
    }
  }
  return date;
}

function getCalendarDetails(date: Date) {
  const newMoonTime = getPreviousNewMoon(date);
  const sunSign = Math.floor(getNirayanaEcliptic(Body.Sun, newMoonTime) / 30);
  
  const amantaMonth = LUNAR_MONTHS[sunSign];
  const tithiIdx = getTithiIndex(date);
  
  // Purnimanta month is typically the next month if it is krishna paksha
  let purnimantaMonth = amantaMonth;
  if (tithiIdx >= 15) {
     const nextIdx = (sunSign + 1) % 12;
     purnimantaMonth = LUNAR_MONTHS[nextIdx];
  }
  
  const shaka = date.getFullYear() - 78;
  const vikram = date.getFullYear() + 57 - (sunSign >= 8 && sunSign <= 10 ? 1 : 0);
  const gujarati = vikram - 1; // Approx mapping for kartikadi

  return { amantaMonth, purnimantaMonth, shaka, vikram, gujarati };
}

export function getLagnaNirayana(date: Date, lat: number, lng: number): number {
    const jd = (date.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;
    let T = jd / 36525;
    let gst = (280.46061837 + 360.98564736629 * jd + 0.000387933 * T * T) % 360;
    if (gst < 0) gst += 360;
    let lst = (gst + lng) % 360;
    if (lst < 0) lst += 360;

    const obliq = 23.439291 - 0.0130042 * T;
    const rad = Math.PI / 180;
    let y = Math.cos(lst * rad);
    let x = -Math.sin(lst * rad) * Math.cos(obliq * rad) - Math.tan(lat * rad) * Math.sin(obliq * rad);
    
    let ascendant = Math.atan2(y, x) / rad;
    if (ascendant < 0) ascendant += 360;
    
    let nirayana = ascendant - getAyanamsa(date);
    if (nirayana < 0) nirayana += 360;
    return nirayana;
}

function isRetrograde(body: Body, date: Date) {
  if (body === Body.Sun || body === Body.Moon) return false;
  const today = getTropicalEcliptic(body, date).elon;
  const tmrw = getTropicalEcliptic(body, new Date(date.getTime() + 86400000)).elon;
  let diff = tmrw - today;
  if (diff < -180) diff += 360;
  if (diff > 180) diff -= 360;
  return diff < 0;
}

function getMeanRahu(date: Date) {
  const D = (date.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;
  let rahu = (125.04452 - 0.05295328 * D) % 360;
  if (rahu < 0) rahu += 360;
  let nirayanaRahu = rahu - getAyanamsa(date);
  if (nirayanaRahu < 0) nirayanaRahu += 360;
  return nirayanaRahu;
}

// Hardcoded prominent festivals using Tithi + Month Logic
function getFestival(month: string, tithiIndex: number): string | null {
  const tithiName = TITHI_NAMES[tithiIndex];
  const paksha = tithiIndex < 15 ? 'Shukla' : 'Krishna';
  if (month === 'Chaitra' && tithiName === 'Navami' && paksha === 'Shukla') return 'Rama Navami';
  if (month === 'Chaitra' && tithiIndex === 0) return 'Gudi Padwa / Ugadi';
  if (month === 'Phalguna' && tithiIndex === 14) return 'Holi';
  if (month === 'Kartika' && tithiIndex === 29) return 'Diwali'; // Amavasya
  if (month === 'Kartika' && tithiIndex === 0) return 'Govardhan Puja';
  if (month === 'Ashvina' && tithiIndex === 9 && paksha === 'Shukla') return 'Dussehra (Vijayadashami)';
  if (month === 'Shravana' && tithiIndex === 14) return 'Raksha Bandhan';
  if (month === 'Bhadrapada' && tithiName === 'Chaturthi' && paksha === 'Shukla') return 'Ganesh Chaturthi';
  if (month === 'Bhadrapada' && tithiName === 'Ashtami' && paksha === 'Krishna') return 'Krishna Janmashtami';
  if (month === 'Ashvina' && tithiName === 'Pratipada' && paksha === 'Shukla') return 'Navratri Begins';
  if (month === 'Magha' && tithiName === 'Panchami' && paksha === 'Shukla') return 'Vasant Panchami';
  if (month === 'Magha' && tithiName === 'Chaturdashi' && paksha === 'Krishna') return 'Maha Shivaratri';
  if (tithiName === 'Ekadashi') return 'Ekadashi Vrat';
  if (tithiName === 'Chaturthi' && paksha === 'Krishna') return 'Sankashti Chaturthi';
  if (tithiIndex === 14) return 'Purnima Vrat';
  if (tithiIndex === 29) return 'Amavasya / Darsha Amavasya';
  return null;
}

export interface TimeSpan { start: Date; end: Date; }
export interface EphemerisEvent { name: string; endTime: Date | null; paksha?: string; }

export interface PlanetPosition {
  name: string;
  lon: number;
  sign: number;
  signName: string;
  isRetrograde: boolean;
  isCombust: boolean;
  degreeInSign: number;
}

export interface AdvancedPanchangData {
  tithi: EphemerisEvent;
  nakshatra: EphemerisEvent;
  yoga: EphemerisEvent;
  karana: EphemerisEvent;
  kaarana2?: EphemerisEvent; // second half of the day if applicable
  vaar: string;
  calendar: {
    amantaMonth: string;
    purnimantaMonth: string;
    sunsign: string;
    moonsign: string;
    shakaSamvat: number;
    vikramSamvat: number;
    gujaratiSamvat: number;
  };
  planets: PlanetPosition[];
  lagnaDegree: number;
  lagnaSign: number;
  festival: string | null;
  sunrise: Date;
  sunset: Date;
  moonrise: Date | null;
  moonset: Date | null;
  rahuKaal: TimeSpan;
  yamaganda: TimeSpan;
  gulikaKaal: TimeSpan;
  abhijitMuhurat: TimeSpan;
}

export function getPanchang(date: Date, lat: number, lng: number): AdvancedPanchangData {
  const localTimes = SunCalc.getTimes(date, lat, lng);
  const sunrise = localTimes.sunrise || new Date(date.setHours(6, 0, 0, 0));
  const sunset = localTimes.sunset || new Date(date.setHours(18, 0, 0, 0));
  const baseTime = new Date(sunrise);

  const tithiIdx = getTithiIndex(baseTime);
  const nakshatraIdx = getNakshatraIndex(baseTime);
  const yogaIdx = getYogaIndex(baseTime);
  const karanaIdx = getKaranaIndex(baseTime);

  const tithiEnd = findTransitionTime(baseTime, getTithiIndex, 30);
  const nakshatraEnd = findTransitionTime(baseTime, getNakshatraIndex, 30);
  const yogaEnd = findTransitionTime(baseTime, getYogaIndex, 30);
  const karanaEnd = findTransitionTime(baseTime, getKaranaIndex, 15);
  
  let karana2End = null;
  if (karanaEnd) karana2End = findTransitionTime(new Date(karanaEnd.getTime() + 60000), getKaranaIndex, 15);

  const cal = getCalendarDetails(baseTime);
  const sunLon = getNirayanaEcliptic(Body.Sun, baseTime);
  const moonLon = getNirayanaEcliptic(Body.Moon, baseTime);

  const festival = getFestival(cal.amantaMonth, tithiIdx);

  // Navagraha array
  const planetMapping = [
    { key: 'Surya', body: Body.Sun },
    { key: 'Chandra', body: Body.Moon },
    { key: 'Mangal', body: Body.Mars },
    { key: 'Budha', body: Body.Mercury },
    { key: 'Guru', body: Body.Jupiter },
    { key: 'Shukra', body: Body.Venus },
    { key: 'Shani', body: Body.Saturn },
  ];

  const planets: PlanetPosition[] = planetMapping.map(p => {
    const lon = getNirayanaEcliptic(p.body, baseTime);
    const sign = Math.floor(lon / 30);
    const degreeInSign = lon % 30;
    
    let isCombust = false;
    if (p.body !== Body.Sun && p.body !== Body.Moon) {
       let d = Math.abs(lon - sunLon);
       if (d > 180) d = 360 - d;
       const thr: Record<string, number> = { [Body.Mars]: 17, [Body.Mercury]: 14, [Body.Jupiter]: 11, [Body.Venus]: 10, [Body.Saturn]: 15 };
       isCombust = d < (thr[p.body as string] || 15);
    }
    
    return {
      name: p.key,
      lon,
      sign,
      signName: RASI_NAMES[sign],
      isRetrograde: isRetrograde(p.body, baseTime),
      isCombust,
      degreeInSign
    };
  });

  const rahuLon = getMeanRahu(baseTime);
  const ketuLon = (rahuLon + 180) % 360;
  planets.push({
    name: 'Rahu', lon: rahuLon, sign: Math.floor(rahuLon / 30), signName: RASI_NAMES[Math.floor(rahuLon / 30)],
    isRetrograde: true, isCombust: false, degreeInSign: rahuLon % 30
  });
  planets.push({
    name: 'Ketu', lon: ketuLon, sign: Math.floor(ketuLon / 30), signName: RASI_NAMES[Math.floor(ketuLon / 30)],
    isRetrograde: true, isCombust: false, degreeInSign: ketuLon % 30
  });

  const lagnaDegree = getLagnaNirayana(baseTime, lat, lng);
  const lagnaSign = Math.floor(lagnaDegree / 30);

  const moonTimes = SunCalc.getMoonTimes(date, lat, lng);
  const weekday = baseTime.getDay(); 
  const dayDuration = sunset.getTime() - sunrise.getTime();
  const muhuratDuration = dayDuration / 8;
  
  const RAHU_KAAL_PARTS = [8, 2, 7, 5, 6, 4, 3];
  const YAMAGANDA_PARTS = [5, 4, 3, 2, 1, 7, 6];
  const GULIKA_PARTS    = [7, 6, 5, 4, 3, 2, 1];
  
  const getTimespan = (idxPos: number): TimeSpan => {
    const start = new Date(sunrise.getTime() + (idxPos - 1) * muhuratDuration);
    return { start, end: new Date(start.getTime() + muhuratDuration) };
  };

  const abhijitDuration = dayDuration / 15;
  const abhijitStart = new Date(sunrise.getTime() + 7 * abhijitDuration);

  return {
    tithi: { name: TITHI_NAMES[tithiIdx], paksha: tithiIdx < 15 ? 'Shukla Paksha' : 'Krishna Paksha', endTime: tithiEnd },
    nakshatra: { name: NAKSHATRAS[nakshatraIdx], endTime: nakshatraEnd },
    yoga: { name: YOGAS[yogaIdx], endTime: yogaEnd },
    karana: { name: getKaranaName(karanaIdx), endTime: karanaEnd },
    kaarana2: karanaEnd ? { name: getKaranaName((karanaIdx + 1) % 60), endTime: karana2End } : undefined,
    vaar: VAAR[weekday],
    calendar: {
      amantaMonth: cal.amantaMonth,
      purnimantaMonth: cal.purnimantaMonth,
      sunsign: RASI_NAMES[Math.floor(sunLon / 30)],
      moonsign: RASI_NAMES[Math.floor(moonLon / 30)],
      shakaSamvat: cal.shaka,
      vikramSamvat: cal.vikram,
      gujaratiSamvat: cal.gujarati
    },
    planets,
    lagnaDegree,
    lagnaSign,
    festival,
    sunrise,
    sunset,
    moonrise: moonTimes.rise || null,
    moonset: moonTimes.set || null,
    rahuKaal: getTimespan(RAHU_KAAL_PARTS[weekday]),
    yamaganda: getTimespan(YAMAGANDA_PARTS[weekday]),
    gulikaKaal: getTimespan(GULIKA_PARTS[weekday]),
    abhijitMuhurat: { start: abhijitStart, end: new Date(abhijitStart.getTime() + abhijitDuration) }
  };
}
