'use client';
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { getPanchang, AdvancedPanchangData } from '@/lib/panchang';
import { getChoghadiyaSlots } from '@/lib/choghadiya';
import { CheckCircle, Clock, Sparkles } from 'lucide-react';
import type { City } from '@/lib/cities';

export default function ShubhMuhuratView({ location }: { location: City }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [panchang, setPanchang] = useState<AdvancedPanchangData | null>(null);
  const [choghadiya, setChoghadiya] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setPanchang(getPanchang(selectedDate, location.lat, location.lng));
      setChoghadiya(getChoghadiyaSlots(selectedDate, location.lat, location.lng).daySlots);
    }
  }, [location, selectedDate, mounted]);

  if (!mounted || !panchang) {
    return <div className="min-h-[400px] flex items-center justify-center text-emerald-600 font-medium">Calculating Shubh Muhurat...</div>;
  }

  const formatTime = (date: Date) => format(date, 'hh:mm a');
  
  // Filter only good choghadiyas
  const goodChoghadiyas = choghadiya.filter(slot => ['Amrit', 'Shubh', 'Labh'].includes(slot.name));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-xl border border-gray-100 mb-6">
        <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Yesterday</button>
        <div className="font-bold text-gray-900 text-sm sm:text-base">{format(selectedDate, 'EEEE, MMM do yyyy')}</div>
        <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Tomorrow</button>
      </div>

      <div className="bg-emerald-50/80 rounded-2xl shadow-sm border border-emerald-200 overflow-hidden mb-10">
        <div className="bg-emerald-600 px-6 py-5 flex items-center justify-center text-center">
          <CheckCircle className="w-8 h-8 text-white mr-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
            Best Time Today
          </h2>
        </div>
        
        <div className="p-6 sm:p-8 flex flex-col items-center">
          <Sparkles className="w-14 h-14 text-emerald-500 mb-4" />
          <h3 className="text-xl sm:text-3xl font-black text-gray-900 mb-2">Shubh Muhurat in {location.name}</h3>
          <p className="text-gray-700 text-center max-w-lg mb-8 font-medium">
            These are the most auspicious times of the day. Perfect for starting a new venture, performing pujas, purchasing property, or beginning a journey.
          </p>

          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 w-full max-w-md shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2 block">Abhijit Muhurat</span>
            <p className="text-xs text-gray-500 mb-3">(The Universal Auspicious Window)</p>
            <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight flex items-center justify-center space-x-2">
              <span>{formatTime(panchang.abhijitMuhurat.start)}</span>
              <span className="text-2xl text-gray-400">-</span>
              <span>{formatTime(panchang.abhijitMuhurat.end)}</span>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2 text-gray-500 text-sm font-medium">
              <Clock className="w-4 h-4" /> <span>Duration: ~48 Mins</span>
            </div>
          </div>
        </div>

        {goodChoghadiyas.length > 0 && (
          <div className="px-6 pb-6 lg:px-8 lg:pb-8">
            <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-widest mb-4">Auspicious Choghadiya Slots Today</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {goodChoghadiyas.map((slot, idx) => (
                 <div key={idx} className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex flex-col items-center justify-center">
                   <span className="text-emerald-700 font-bold mb-1 text-lg">{slot.name}</span>
                   <span className="text-sm font-bold text-gray-900">
                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                   </span>
                 </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">What is Abhijit Muhurat?</h4>
            <p className="text-gray-600 leading-relaxed">Abhijit Muhurat is considered an ultra-auspicious time window that occurs roughly in the middle of the day (around local noon). It is capable of destroying countless doshas (flaws) in astrology and is powerful enough for starting any new endeavor safely.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">What are Amrit, Shubh, and Labh Choghadiya?</h4>
            <p className="text-gray-600 leading-relaxed">These are the three positive planetary hours. <strong>Amrit</strong> is governed by the Moon and best for all work; <strong>Shubh</strong> is governed by Jupiter and excellent for marriage or education; <strong>Labh</strong> is governed by Mercury and best for starting a business and earning profit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
