import { getCityBySlug, topCities } from '@/lib/cities';
import ChoghadiyaView from '@/components/choghadiya/ChoghadiyaView';
import AdBanner from '@/components/layout/AdBanner';
import ChoghadiyaInfo from '@/components/choghadiya/ChoghadiyaInfo';

export default function Home() {
  // Default to Delhi
  const defaultCity = getCityBySlug('delhi') || topCities[1];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mobile/Tablet Top Banner */}
      <div className="w-full px-4 sm:px-0 mt-4 xl:hidden">
        <AdBanner dataAdSlot="top-home-banner" className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>
      
      <div className="w-full flex justify-center max-w-[1600px] mx-auto px-2 lg:px-4 mt-2">
        {/* Left Vertical Ad (Visible on Desktop) */}
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-4 pr-4 lg:pr-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot="left-home-banner" className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full flex-grow max-w-4xl">
          <ChoghadiyaView location={defaultCity} />
        </div>
        
        {/* Right Vertical Ad (Visible on Desktop) */}
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-4 pl-4 lg:pl-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot="right-home-banner" className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 mt-4">
        <ChoghadiyaInfo />
      </div>

      {/* Mobile/Tablet Bottom Banner */}
      <div className="w-full px-4 sm:px-0 mb-8 mt-4 xl:hidden">
        <AdBanner dataAdSlot="bottom-home-banner" className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>
    </div>
  );
}
