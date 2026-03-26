import { getCityBySlug, topCities } from '@/lib/cities';
import PanchangView from '@/components/choghadiya/PanchangView';
import AdBanner from '@/components/layout/AdBanner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Today Panchang - Detailed Vedic Hindu Calendar',
  description: 'Check today’s accurate Panchang, including Tithi, Nakshatra, Rahu Kaal, and Abhijit Muhurat carefully calculated according to local sunrise limits.',
};

export default function PanchangHomePage() {
  const defaultCity = getCityBySlug('delhi') || topCities[1];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full bg-saffron-50/50 py-4 text-center border-b border-saffron-100 mb-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Today Panchang</h1>
        <p className="text-gray-600 mt-1">Select your city above to get accurate localized timing.</p>
      </div>
      
      <div className="w-full px-4 sm:px-0 mt-4 xl:hidden">
        <AdBanner dataAdSlot="top-panchang-home" className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>
      
      <div className="w-full flex justify-center max-w-[1600px] mx-auto px-2 lg:px-4 mt-2">
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-4 pr-4 lg:pr-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot="left-panchang-home" className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
        
        <div className="w-full flex-grow max-w-4xl">
          <PanchangView location={defaultCity} />
        </div>
        
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-4 pl-4 lg:pl-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot="right-panchang-home" className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
      </div>
      
      <div className="w-full px-4 sm:px-0 mb-8 mt-4 xl:hidden">
        <AdBanner dataAdSlot="bottom-panchang-home" className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>
    </div>
  );
}
