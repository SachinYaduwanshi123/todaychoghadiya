'use client';

import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { getPanchang, AdvancedPanchangData } from '@/lib/panchang';
import { Calendar, Sunrise, Sunset, SunriseIcon, Moon, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import type { City } from '@/lib/cities';
import LagnaKundali from '../panchang/LagnaKundali';
import PlanetaryPositionsTable from '../panchang/PlanetaryPositionsTable';
import UpcomingFestivals from '../panchang/UpcomingFestivals';

export default function PanchangView({ location }: { location: City }) {
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
     return <div className="min-h-[400px] flex items-center justify-center text-orange-600 font-medium animate-pulse">Calculating NASA JPL Ephemeris...</div>;
  }

  const formatTime = (date: Date) => format(date, 'hh:mm a');

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Date Header */}
      <div className="flex justify-between items-center bg-gray-50 p-2 sm:p-3 rounded-xl border border-gray-100 shadow-sm">
        <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50 transition-colors">Yesterday</button>
        <div className="font-bold text-gray-900 text-sm sm:text-base text-center flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-saffron-600 hidden sm:block" />
            <span className="hidden sm:inline">Panchang for </span> {format(selectedDate, 'EEEE, MMM do yyyy')}
        </div>
        <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50 transition-colors">Tomorrow</button>
      </div>

      {/* Hero Sunrise Block */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl shadow-md p-6 text-white flex flex-col sm:flex-row items-center justify-around">
        <div className="flex flex-col items-center">
            <Sunrise className="w-10 h-10 mb-2 opacity-90" />
            <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Sunrise</span>
            <span className="text-2xl sm:text-3xl font-black">{formatTime(panchang.sunrise)}</span>
        </div>
        <div className="my-4 sm:my-0 h-[1px] w-full sm:h-16 sm:w-[1px] bg-white/30" />
        <div className="flex flex-col items-center">
            <Sunset className="w-10 h-10 mb-2 opacity-90" />
            <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Sunset</span>
            <span className="text-2xl sm:text-3xl font-black">{formatTime(panchang.sunset)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Panchang Details */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-saffron-500"></div>
             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                 <SunriseIcon className="w-6 h-6 mr-3 text-saffron-600" />
                 Panchang Details
             </h3>
             <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Tithi</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.tithi.name} {panchang.tithi.endTime ? `upto ${formatTime(panchang.tithi.endTime)}` : ''}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Nakshatra</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.nakshatra.name} {panchang.nakshatra.endTime ? `upto ${formatTime(panchang.nakshatra.endTime)}` : ''}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Yoga</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.yoga.name} {panchang.yoga.endTime ? `upto ${formatTime(panchang.yoga.endTime)}` : ''}</span>
                </li>
                <li className="flex justify-between items-start border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3 pt-1">Karana</span>
                    <div className="flex flex-col text-right w-2/3 space-y-1">
                       <span className="text-gray-900 font-bold">{panchang.karana.name} {panchang.karana.endTime ? `upto ${formatTime(panchang.karana.endTime)}` : ''}</span>
                       {panchang.kaarana2 && (
                          <span className="text-gray-900 font-bold">{panchang.kaarana2.name} {panchang.kaarana2.endTime ? `upto ${formatTime(panchang.kaarana2.endTime)}` : ''}</span>
                       )}
                    </div>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Paksha</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.tithi.paksha}</span>
                </li>
                <li className="flex justify-between items-center">
                    <span className="text-gray-500 font-semibold w-1/3">Weekday</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.vaar}</span>
                </li>
             </ul>
          </div>

          {/* Calendar Info */}
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
                 <Moon className="w-6 h-6 mr-3 text-blue-600" />
                 Calendar Info
             </h3>
             <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Amanta Month</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.calendar.amantaMonth}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Purnimanta</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.calendar.purnimantaMonth}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Moonsign</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.calendar.moonsign}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Sunsign</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.calendar.sunsign}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Shaka Samvat</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.calendar.shakaSamvat}</span>
                </li>
                <li className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-semibold w-1/3">Vikram Samvat</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.calendar.vikramSamvat}</span>
                </li>
                <li className="flex justify-between items-center">
                    <span className="text-gray-500 font-semibold w-1/3">Gujarati Samvat</span>
                    <span className="text-gray-900 font-bold text-right w-2/3">{panchang.calendar.gujaratiSamvat}</span>
                </li>
             </ul>
          </div>
      </div>

      {/* Lagna & Planetary Table */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8">
        <div className="xl:col-span-2">
            <LagnaKundali lagnaSign={panchang.lagnaSign} planets={panchang.planets} />
        </div>
        <div className="xl:col-span-3">
            <PlanetaryPositionsTable planets={panchang.planets} />
        </div>
      </div>

      {/* Muhurat Sub-Dashboard */}
      <div className="bg-gray-50 rounded-2xl shadow-inner border border-gray-200 p-5 sm:p-8">
         <h3 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-200 pb-3 flex items-center"><Clock className="mr-3" /> Important Muhurat timings</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 shadow-sm relative">
                <div className="absolute top-3 right-3"><CheckCircle className="text-emerald-500 w-6 h-6 opacity-60" /></div>
                <h4 className="text-emerald-800 font-bold text-lg mb-4 flex items-center">Auspicious Times (Good)</h4>
                
                <div className="mb-4">
                   <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">Abhijit Muhurat</span>
                   <span className="text-2xl font-black text-emerald-900">
                     {formatTime(panchang.abhijitMuhurat.start)} - {formatTime(panchang.abhijitMuhurat.end)}
                   </span>
                </div>
            </div>

            <div className="bg-rose-50 rounded-xl p-5 border border-rose-200 shadow-sm relative">
                <div className="absolute top-3 right-3"><AlertTriangle className="text-rose-500 w-6 h-6 opacity-60" /></div>
                <h4 className="text-rose-800 font-bold text-lg mb-4 flex items-center">Inauspicious Times (Avoid)</h4>
                
                <div className="mb-4 bg-white/60 p-3 rounded-lg border border-rose-100">
                   <span className="text-xs font-bold text-rose-600 uppercase tracking-widest block mb-1">Rahu Kaal</span>
                   <span className="text-xl sm:text-2xl font-black text-rose-900">
                     {formatTime(panchang.rahuKaal.start)} - {formatTime(panchang.rahuKaal.end)}
                   </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/60 p-3 rounded-lg border border-rose-100">
                     <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-0.5">Yamaganda</span>
                     <span className="text-sm font-bold text-gray-900">
                       {formatTime(panchang.yamaganda.start)} - {formatTime(panchang.yamaganda.end)}
                     </span>
                  </div>
                  <div className="bg-white/60 p-3 rounded-lg border border-rose-100">
                     <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block mb-0.5">Gulika Kaal</span>
                     <span className="text-sm font-bold text-gray-900">
                       {formatTime(panchang.gulikaKaal.start)} - {formatTime(panchang.gulikaKaal.end)}
                     </span>
                  </div>
                </div>
            </div>
         </div>
      </div>

      <UpcomingFestivals date={selectedDate} lat={location.lat} lng={location.lng} />

    </div>
  );
}
