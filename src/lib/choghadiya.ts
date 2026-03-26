import SunCalc from 'suncalc';
import { addDays, set } from 'date-fns';

export type ChoghadiyaName = 'Amrit' | 'Shubh' | 'Labh' | 'Char' | 'Rog' | 'Kaal' | 'Udveg';

export type ChoghadiyaType = 'Day' | 'Night';

export interface ChoghadiyaSlot {
  name: ChoghadiyaName;
  startTime: Date;
  endTime: Date;
  type: ChoghadiyaType;
}

const daySequences: Record<number, ChoghadiyaName[]> = {
  0: ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'], // Sunday
  1: ['Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit'], // Monday
  2: ['Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'],   // Tuesday
  3: ['Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh'],  // Wednesday
  4: ['Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh'], // Thursday
  5: ['Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg', 'Char'],  // Friday
  6: ['Kaal', 'Shubh', 'Rog', 'Udveg', 'Char', 'Labh', 'Amrit', 'Kaal']   // Saturday
};

const nightSequences: Record<number, ChoghadiyaName[]> = {
  0: ['Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh'], // Sunday
  1: ['Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char'],  // Monday
  2: ['Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal'],  // Tuesday
  3: ['Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg'], // Wednesday
  4: ['Amrit', 'Char', 'Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit'], // Thursday
  5: ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog'],   // Friday
  6: ['Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog', 'Kaal', 'Labh']   // Saturday
};

export const choghadiyaColors: Record<ChoghadiyaName, string> = {
  Amrit: 'text-green-700 bg-green-50 border-green-200',
  Shubh: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  Labh: 'text-teal-700 bg-teal-50 border-teal-200',
  Char: 'text-blue-700 bg-blue-50 border-blue-200',
  Rog: 'text-red-700 bg-red-50 border-red-200',
  Kaal: 'text-neutral-700 bg-neutral-100 border-neutral-300',
  Udveg: 'text-orange-700 bg-orange-50 border-orange-200'
};

export function getChoghadiyaSlots(date: Date, lat: number, lng: number): { daySlots: ChoghadiyaSlot[], nightSlots: ChoghadiyaSlot[] } {
  // Use noon to calculate sunrise/sunset for the given date correctly
  const noon = set(date, { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 });
  const nextNoon = addDays(noon, 1);
  
  const todayTimes = SunCalc.getTimes(noon, lat, lng);
  const tomorrowTimes = SunCalc.getTimes(nextNoon, lat, lng);
  
  const sunrise = todayTimes.sunrise;
  const sunset = todayTimes.sunset;
  const nextSunrise = tomorrowTimes.sunrise;
  
  const dayDurationMs = sunset.getTime() - sunrise.getTime();
  const daySlotDurationMs = dayDurationMs / 8;
  
  const nightDurationMs = nextSunrise.getTime() - sunset.getTime();
  const nightSlotDurationMs = nightDurationMs / 8;
  
  const dayOfWeek = noon.getDay();
  const daySeq = daySequences[dayOfWeek];
  const nightSeq = nightSequences[dayOfWeek];
  
  const daySlots: ChoghadiyaSlot[] = [];
  for (let i = 0; i < 8; i++) {
    daySlots.push({
      name: daySeq[i],
      type: 'Day',
      startTime: new Date(sunrise.getTime() + i * daySlotDurationMs),
      endTime: i === 7 ? sunset : new Date(sunrise.getTime() + (i + 1) * daySlotDurationMs)
    });
  }
  
  const nightSlots: ChoghadiyaSlot[] = [];
  for (let i = 0; i < 8; i++) {
    nightSlots.push({
      name: nightSeq[i],
      type: 'Night',
      startTime: new Date(sunset.getTime() + i * nightSlotDurationMs),
      endTime: i === 7 ? nextSunrise : new Date(sunset.getTime() + (i + 1) * nightSlotDurationMs)
    });
  }
  
  return { daySlots, nightSlots };
}
