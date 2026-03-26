'use client';

import { cn } from '@/lib/utils';
import { MouseEvent } from 'react';

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface WeeklyTabsProps {
  currentDay: number;
  onSelectDay: (day: number) => void;
}

export default function WeeklyTabs({ currentDay, onSelectDay }: WeeklyTabsProps) {
  return (
    <div className="flex overflow-x-auto space-x-2 p-1 bg-gray-50 rounded-lg no-scrollbar">
      {daysOfWeek.map((day, ix) => (
        <button
          key={day}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onSelectDay(ix);
          }}
          className={cn(
            'flex-shrink-0 px-4 py-2 text-sm font-medium rounded-md transition-colors',
            currentDay === ix 
              ? 'bg-white text-saffron-600 shadow-sm ring-1 ring-gray-200' 
              : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
          )}
        >
          {day.slice(0, 3)}
        </button>
      ))}
    </div>
  );
}
