'use client';

import { useState, useEffect, useMemo } from 'react';
import { getChoghadiyaSlots, ChoghadiyaSlot } from '@/lib/choghadiya';
import { addDays, isSameDay } from 'date-fns';
import WeeklyTabs from './WeeklyTabs';
import TimeSlotCard from './TimeSlotCard';
import CurrentChoghadiyaCard from './CurrentChoghadiyaCard';

type LocationData = { name: string; lat: number; lng: number };

export default function ChoghadiyaView({ location }: { location: LocationData }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // To avoid hydration mismatch error on the client, we don't render time-sensitive UI 
  // until the component has mounted on the client.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectDay = (dayIndex: number) => {
    const currentDayIndex = selectedDate.getDay();
    const diff = dayIndex - currentDayIndex;
    setSelectedDate(addDays(selectedDate, diff));
  };

  const { daySlots, nightSlots } = useMemo(() => {
    return getChoghadiyaSlots(selectedDate, location.lat, location.lng);
  }, [selectedDate, location.lat, location.lng]);

  const isCurrentSlot = (slot: ChoghadiyaSlot) => {
    if (!mounted || !isSameDay(selectedDate, currentTime)) return false;
    return currentTime >= slot.startTime && currentTime < slot.endTime;
  };

  const currentActiveSlot = useMemo(() => {
    if (!mounted || !isSameDay(selectedDate, currentTime)) return undefined;
    const all = [...daySlots, ...nightSlots];
    return all.find(s => currentTime >= s.startTime && currentTime < s.endTime);
  }, [daySlots, nightSlots, currentTime, selectedDate, mounted]);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 xl:px-0">
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-2">
          Today's Choghadiya in <span className="text-saffron-600">{location.name}</span>
        </h1>
        <p className="text-gray-500 text-center font-medium">
          Accurate Auspicious Timings based on Local Sunrise & Sunset
        </p>
      </div>

      <div className="mb-8">
        <WeeklyTabs currentDay={selectedDate.getDay()} onSelectDay={handleSelectDay} />
      </div>

      {mounted && currentActiveSlot && (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CurrentChoghadiyaCard slot={currentActiveSlot} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-4 text-orange-600">
            <span>Day Choghadiya</span>
          </h2>
          <div className="flex flex-col space-y-1">
            {daySlots.map((slot, i) => (
              <TimeSlotCard key={`day-${i}`} slot={slot} isCurrent={isCurrentSlot(slot)} />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-4 text-indigo-900">
            <span>Night Choghadiya</span>
          </h2>
          <div className="flex flex-col space-y-1">
            {nightSlots.map((slot, i) => (
              <TimeSlotCard key={`night-${i}`} slot={slot} isCurrent={isCurrentSlot(slot)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
