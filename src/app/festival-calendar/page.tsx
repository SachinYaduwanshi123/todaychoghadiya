import { getPanchang } from '@/lib/panchang';
import { format } from 'date-fns';
import { Sparkles, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import AdBanner from '@/components/layout/AdBanner';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hindu Festival Calendar 2026 - Accurate Panchang Dates',
  description: 'View the comprehensive list of major Hindu festivals. Dates are calculated using exact astronomical sun and moon positions.',
};

export default function FestivalCalendarPage() {
  const currentYear = new Date().getFullYear();
  const festivals: { name: string, date: Date, samvat: number, month: string }[] = [];

  // New Delhi coordinates as default reference for pan-India festivals
  const lat = 28.6139;
  const lng = 77.2090;

  // Scan the entire year utilizing the powerful local Ephemeris SDK
  const startDate = new Date(currentYear, 0, 1);
  for (let i = 0; i < 366; i++) {
    const d = new Date(startDate.getTime() + i * 86400000);
    if (d.getFullYear() > currentYear) break;

    const p = getPanchang(d, lat, lng);
    if (p.festival) {
      if (!festivals.some(f => f.name === p.festival)) {
        festivals.push({
          name: p.festival,
          date: d,
          samvat: p.calendar.vikramSamvat,
          month: p.calendar.amantaMonth
        });
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="w-full bg-indigo-50/50 py-8 text-center border-b border-indigo-100 mb-6">
        <Sparkles className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Hindu Festival Calendar {currentYear}</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto px-4">
          All festival dates are extremely precise, computed natively using NASA JPL Ephemeris astronomical tracking for the exact transition of Lunar Tithis and Solar conjunctions.
        </p>
      </div>

      <div className="w-full px-4 sm:px-0 mt-2 xl:hidden">
        <AdBanner dataAdSlot="top-festival-home" className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>

      <div className="w-full flex justify-center max-w-[1600px] mx-auto px-2 lg:px-4">
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-4 pr-4 lg:pr-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot="left-festival-home" className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>

        <div className="w-full flex-grow max-w-4xl px-2 sm:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="bg-white px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <CalendarIcon className="w-6 h-6 text-indigo-600 mr-3" />
                <h2 className="text-xl font-bold text-gray-900">
                  Major Upcoming Events
                </h2>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {festivals.map((fest, idx) => {
                const isPast = fest.date.getTime() < new Date().getTime() - 86400000;
                return (
                  <div key={idx} className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-colors hover:bg-indigo-50/20 ${isPast ? 'opacity-60 grayscale-[50%]' : ''}`}>
                    <div className="flex items-start mb-3 sm:mb-0">
                      <div className="bg-indigo-100/50 rounded-xl p-3 text-center min-w-[70px] mr-5 border border-indigo-100">
                        <span className="block text-indigo-900 font-bold text-lg leading-tight">{format(fest.date, 'dd')}</span>
                        <span className="block text-indigo-600 font-semibold text-xs uppercase tracking-wider">{format(fest.date, 'MMM')}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{fest.name}</h3>
                        <p className="text-gray-500 text-sm mt-0.5">{format(fest.date, 'EEEE')} • {fest.month} Maas, Samvat {fest.samvat}</p>
                      </div>
                    </div>

                    {!isPast && (
                      <Link href={`/panchang/delhi`} className="bg-white border border-gray-200 hover:border-indigo-300 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all text-center w-full sm:w-auto mt-2 sm:mt-0">
                        View Panchang
                      </Link>
                    )}
                    {isPast && (
                      <div className="flex items-center text-gray-400 text-sm font-medium px-4 py-2 w-full sm:w-auto justify-center sm:justify-start">
                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Completed
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {festivals.length === 0 && (
              <div className="p-10 text-center text-gray-500 font-medium">No major festivals mapped yet.</div>
            )}
          </div>
        </div>

        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-4 pl-4 lg:pl-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot="right-festival-home" className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
