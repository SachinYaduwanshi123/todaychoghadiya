'use client';

import { ChoghadiyaSlot, choghadiyaColors } from '@/lib/choghadiya';
import { Clock, Hourglass } from 'lucide-react';
import { format, differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';

export default function CurrentChoghadiyaCard({ slot }: { slot: ChoghadiyaSlot }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!slot) return null;

  const colorClasses = choghadiyaColors[slot.name];
  
  const end = slot.endTime;
  const remainingSeconds = Math.max(0, differenceInSeconds(end, now));
  const hrs = Math.floor(remainingSeconds / 3600);
  const mins = Math.floor((remainingSeconds % 3600) / 60);
  const secs = remainingSeconds % 60;
  
  const formattedRemaining = `${hrs > 0 ? `${hrs}h ` : ''}${mins}m ${secs}s`;

  return (
    <div className={`relative overflow-hidden rounded-xl border p-4 mb-6 shadow-sm transition-all ${colorClasses}`}>
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-20 rounded-full blur-2xl"></div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between relative z-10">
        <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
          <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1.5 flex items-center bg-white/30 px-2.5 py-0.5 rounded-full">
            <span className="relative flex h-2 w-2 mr-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
            </span>
            Live Now
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1 flex items-baseline space-x-2">
            <span>{slot.name}</span>
            <span className="text-xl font-medium opacity-75 hidden sm:inline-block">({slot.type})</span>
          </h2>
          <div className="flex items-center space-x-1.5 text-sm sm:text-base font-medium bg-white/50 px-3 py-1.5 rounded-lg mt-1 backdrop-blur-sm">
            <Clock className="w-4 h-4 opacity-80" />
            <span>{format(slot.startTime, 'hh:mm a')} - {format(slot.endTime, 'hh:mm a')}</span>
          </div>
        </div>

        <div className="flex flex-col items-center bg-white/50 backdrop-blur-sm p-3 rounded-xl min-w-[140px] shadow-sm border border-white/20">
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-0.5 flex items-center">
            <Hourglass className="w-3.5 h-3.5 mr-1" /> Time Remaining
          </span>
          <span className="text-2xl font-black font-mono tracking-tight text-gray-800">
            {formattedRemaining}
          </span>
        </div>
      </div>
    </div>
  );
}
