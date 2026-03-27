import { GeoVector, Body, Ecliptic } from 'astronomy-engine';
import { getAyanamsa, RASI_NAMES, getLagnaNirayana } from './panchang';

export interface PlanetDetail {
  name: string;
  lon: number;
  sign: number;
  signName: string;
  degreeInSign: number;
  isRetrograde: boolean;
  isCombust: boolean;
}

export interface KundliData {
  basic: {
    dob: string;
    tob: string;
    place: string;
    lat: number;
    lng: number;
    ayanamsa: number;
  };
  lagna: {
    degree: number;
    sign: number;
    signName: string;
  };
  planets: PlanetDetail[];
}

const getTropicalEcliptic = (body: Body, date: Date) => Ecliptic(GeoVector(body, date, true));

const getNirayanaEcliptic = (body: Body, date: Date) => {
  let lon = getTropicalEcliptic(body, date).elon - getAyanamsa(date);
  if (lon < 0) lon += 360;
  return lon;
};

const isRetrograde = (body: Body, date: Date) => {
  if (body === Body.Sun || body === Body.Moon) return false;
  const today = getTropicalEcliptic(body, date).elon;
  const tomorrow = getTropicalEcliptic(body, new Date(date.getTime() + 86400000)).elon;
  let diff = tomorrow - today;
  if (diff < -180) diff += 360;
  if (diff > 180) diff -= 360;
  return diff < 0;
};

const getMeanRahu = (date: Date) => {
  const D = (date.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;
  let rahu = (125.04452 - 0.05295328 * D) % 360;
  if (rahu < 0) rahu += 360;
  let nirayanaRahu = rahu - getAyanamsa(date);
  if (nirayanaRahu < 0) nirayanaRahu += 360;
  return nirayanaRahu;
};

export function calculateKundli(date: Date, lat: number, lng: number, placeName: string): KundliData {
  const ayanamsa = getAyanamsa(date);
  const sunLon = getNirayanaEcliptic(Body.Sun, date);

  const planetMapping = [
    { name: 'Surya (Sun)', body: Body.Sun },
    { name: 'Chandra (Moon)', body: Body.Moon },
    { name: 'Mangal (Mars)', body: Body.Mars },
    { name: 'Budha (Mercury)', body: Body.Mercury },
    { name: 'Guru (Jupiter)', body: Body.Jupiter },
    { name: 'Shukra (Venus)', body: Body.Venus },
    { name: 'Shani (Saturn)', body: Body.Saturn },
  ];

  const planets: PlanetDetail[] = planetMapping.map(p => {
    const lon = getNirayanaEcliptic(p.body, date);
    const sign = Math.floor(lon / 30);
    const degreeInSign = lon % 30;

    let isCombust = false;
    if (p.body !== Body.Sun && p.body !== Body.Moon) {
      let d = Math.abs(lon - sunLon);
      if (d > 180) d = 360 - d;
      const threshold: Record<string, number> = { [Body.Mars]: 17, [Body.Mercury]: 14, [Body.Jupiter]: 11, [Body.Venus]: 10, [Body.Saturn]: 15 };
      isCombust = d < (threshold[p.body as string] || 15);
    }

    return {
      name: p.name.split(' ')[0],
      lon,
      sign,
      signName: RASI_NAMES[sign],
      degreeInSign,
      isRetrograde: isRetrograde(p.body, date),
      isCombust
    };
  });

  const rahuLon = getMeanRahu(date);
  const ketuLon = (rahuLon + 180) % 360;

  planets.push({
    name: 'Rahu', lon: rahuLon, sign: Math.floor(rahuLon / 30), signName: RASI_NAMES[Math.floor(rahuLon / 30)],
    isRetrograde: true, isCombust: false, degreeInSign: rahuLon % 30
  });
  planets.push({
    name: 'Ketu', lon: ketuLon, sign: Math.floor(ketuLon / 30), signName: RASI_NAMES[Math.floor(ketuLon / 30)],
    isRetrograde: true, isCombust: false, degreeInSign: ketuLon % 30
  });

  const lagnaDegree = getLagnaNirayana(date, lat, lng);
  const lagnaSign = Math.floor(lagnaDegree / 30);

  return {
    basic: {
      dob: date.toLocaleDateString(),
      tob: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      place: placeName,
      lat,
      lng,
      ayanamsa
    },
    lagna: {
      degree: lagnaDegree,
      sign: lagnaSign,
      signName: RASI_NAMES[lagnaSign]
    },
    planets
  };
}
