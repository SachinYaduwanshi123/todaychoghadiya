import { ChoghadiyaSlot, choghadiyaColors } from '@/lib/choghadiya';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface TimeSlotCardProps {
  slot: ChoghadiyaSlot;
  isCurrent: boolean;
}

export default function TimeSlotCard({ slot, isCurrent }: TimeSlotCardProps) {
  const colorClasses = choghadiyaColors[slot.name];

  return (
    <div
      className={cn(
        'relative flex items-center justify-between p-4 mb-3 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md',
        colorClasses,
        isCurrent ? 'ring-2 ring-saffron-500 scale-[1.02] shadow-md z-10' : ''
      )}
    >
      {isCurrent && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-saffron-500"></span>
        </span>
      )}
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight">{slot.name}</span>
        <span className="text-sm opacity-80 mt-1">{slot.type} Choghadiya</span>
      </div>
      <div className="flex items-center space-x-2 text-lg font-medium bg-white/50 px-3 py-1.5 rounded-md">
        <Clock className="w-5 h-5 opacity-70" />
        <span>
          {format(slot.startTime, 'hh:mm a')} - {format(slot.endTime, 'hh:mm a')}
        </span>
      </div>
    </div>
  );
}
