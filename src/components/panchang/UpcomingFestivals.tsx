'use client';

import React, { useState, useEffect } from 'react';
import { getPanchang } from '@/lib/panchang';
import { format } from 'date-fns';
import { Calendar, Sparkles } from 'lucide-react';

export default function UpcomingFestivals({ date, lat, lng }: { date: Date, lat: number, lng: number }) {
  const [festivals, setFestivals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Move heavy lifting off main thread safely or inside effect 
    // Since getPanchang is super-fast (~1ms per call), 40 is trivial
    setTimeout(() => {
        const found: any[] = [];
        const baseDir = new Date(date).setHours(0,0,0,0);
        for (let i = 0; i <= 45; i++) {
           const d = new Date(baseDir + i * 86400000);
           const p = getPanchang(d, lat, lng);
           if (p.festival) {
              if (!found.some(f => f.name === p.festival)) {
                 found.push({
                   name: p.festival,
                   date: d,
                   dayDiff: i
                 });
              }
           }
           if (found.length >= 6) break; // Limit to closest upcoming 6
        }
        setFestivals(found);
        setLoading(false);
    }, 10);
  }, [date, lat, lng]);

  const getDayTag = (diff: number) => {
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${diff} Days`;
  };

  if (!loading && !festivals.length) return null;

  return (
    <div className="w-full bg-indigo-50/40 p-5 sm:p-8 rounded-2xl border border-indigo-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/30 rounded-full blur-3xl -mr-10 -mt-10"></div>
      
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center relative z-10">
        <Sparkles className="w-6 h-6 text-indigo-500 mr-2" />
        Upcoming Vrat &amp; Festivals
      </h3>

      {loading ? (
        <div className="animate-pulse space-y-4">
           <div className="h-12 bg-indigo-100/50 rounded-xl"></div>
           <div className="h-12 bg-indigo-100/50 rounded-xl"></div>
           <div className="h-12 bg-indigo-100/50 rounded-xl"></div>
        </div>
      ) : (
        <div className="space-y-4 relative z-10">
          {festivals.map((f, i) => (
            <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-indigo-50 hover:border-indigo-200 transition-colors">
              <div className="flex items-center">
                <div className="bg-indigo-100 text-indigo-700 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                  {format(f.date, 'dd')}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">{f.name}</h4>
                  <p className="text-xs text-gray-500 flex items-center mt-0.5">
                    <Calendar className="w-3 h-3 mr-1" /> {format(f.date, 'EEEE, MMM yyyy')}
                  </p>
                </div>
              </div>
              <div className="text-right pl-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${f.dayDiff === 0 ? 'bg-rose-100 text-rose-700' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'}`}>
                  {getDayTag(f.dayDiff)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
