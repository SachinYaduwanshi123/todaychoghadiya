'use client';
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { getPanchang, AdvancedPanchangData } from '@/lib/panchang';
import { AlertTriangle, Clock, ShieldAlert, XOctagon } from 'lucide-react';
import type { City } from '@/lib/cities';

export default function RahuKaalView({ location }: { location: City }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [panchang, setPanchang] = useState<AdvancedPanchangData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setPanchang(getPanchang(selectedDate, location.lat, location.lng));
    }
  }, [location, selectedDate, mounted]);

  if (!mounted || !panchang) {
    return <div className="min-h-[400px] flex items-center justify-center text-red-600 font-medium">Calculating Rahu Kaal...</div>;
  }

  const formatTime = (date: Date) => format(date, 'hh:mm a');

  return (
    <div className="w-full">
      <div className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-xl border border-gray-100 mb-6">
        <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Yesterday</button>
        <div className="font-bold text-gray-900 text-sm sm:text-base">{format(selectedDate, 'EEEE, MMM do yyyy')}</div>
        <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">Tomorrow</button>
      </div>

      <div className="bg-red-50/80 rounded-2xl shadow-sm border border-red-200 overflow-hidden mb-10">
        <div className="bg-red-600 px-6 py-5 flex items-center justify-center text-center">
          <XOctagon className="w-8 h-8 text-white mr-3" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase">
            Avoid Time Today
          </h2>
        </div>
        
        <div className="p-6 sm:p-8 flex flex-col items-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mb-4 opacity-80" />
          <h3 className="text-xl sm:text-3xl font-black text-gray-900 mb-2">Rahu Kaal in {location.name}</h3>
          <p className="text-gray-700 text-center max-w-lg mb-8 font-medium">
            This is the most inauspicious time of the day according to Vedic astrology. Important work, travel, or purchases should be strictly avoided during this window.
          </p>

          <div className="bg-white border-2 border-red-200 rounded-2xl p-6 w-full max-w-md shadow-md text-center transform hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2 block">Rahu Kaal Period</span>
            <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight flex items-center justify-center space-x-2">
              <span>{formatTime(panchang.rahuKaal.start)}</span>
              <span className="text-2xl text-gray-400">-</span>
              <span>{formatTime(panchang.rahuKaal.end)}</span>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2 text-gray-500 text-sm font-medium">
              <Clock className="w-4 h-4" /> <span>Duration: 1.5 Hours</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 pb-6 lg:px-8 lg:pb-8">
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Yamaganda</span>
              <span className="text-lg font-bold text-gray-900 text-left">
                {formatTime(panchang.yamaganda.start)} - {formatTime(panchang.yamaganda.end)}
              </span>
            </div>
            <AlertTriangle className="w-6 h-6 text-orange-500 opacity-60" />
          </div>
          <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Gulika Kaal</span>
              <span className="text-lg font-bold text-gray-900 text-left">
                {formatTime(panchang.gulikaKaal.start)} - {formatTime(panchang.gulikaKaal.end)}
              </span>
            </div>
            <AlertTriangle className="w-6 h-6 text-amber-500 opacity-60" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">What is Rahu Kaal?</h4>
            <p className="text-gray-600 leading-relaxed">Rahu Kaal (or Rahukaalam) is a particular period of the day spanning about 90 minutes that is considered extremely inauspicious in Vedic astrology. It takes place every single day between sunrise and sunset.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Why should you avoid Rahu Kaal?</h4>
            <p className="text-gray-600 leading-relaxed">According to Jyotish Shastra, Rahu is a shadowy planet that causes confusion, delays, and obstacles. Starting a new business, buying property, conducting marriages, or undertaking significant journeys during this period often leads to negative outcomes or failure.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Are Yamaganda and Gulika Kaal also bad?</h4>
            <p className="text-gray-600 leading-relaxed">Yes. Yamaganda is governed by Yama (the lord of death) and activities started here tend to result in failure. Gulika is governed by Saturn (Shani) and delays progress. It is advisable to avoid these periods as well.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
