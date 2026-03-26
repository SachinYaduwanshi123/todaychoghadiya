import { getCityBySlug } from '@/lib/cities';
import ChoghadiyaView from '@/components/choghadiya/ChoghadiyaView';
import AdBanner from '@/components/layout/AdBanner';
import ChoghadiyaInfo from '@/components/choghadiya/ChoghadiyaInfo';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const top4 = ['indore', 'delhi', 'mumbai', 'jaipur'];
  return top4.map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ 
  params,
  searchParams
}: { 
  params: Promise<{ city: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const resolvedSearchParams = await searchParams;
  
  let city = getCityBySlug(citySlug);
  
  if (!city) {
    const name = resolvedSearchParams.name as string;
    if (name) {
      city = { name, slug: citySlug, lat: 0, lng: 0, state: '' };
    }
  }
  
  if (!city) return {};
  
  return {
    title: `Today Choghadiya in ${city.name} – Auspicious Timings`,
    description: `Check today’s Choghadiya in ${city.name} with accurate sunrise and sunset based timings. Plan your day with Amrit, Shubh, and Labh Choghadiya.`,
    alternates: {
      canonical: `/choghadiya/${city.slug}`,
    }
  };
}

export default async function CityPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ city: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { city: citySlug } = await params;
  const resolvedSearchParams = await searchParams;
  
  let city = getCityBySlug(citySlug);
  
  if (!city) {
    const lat = Number(resolvedSearchParams.lat);
    const lng = Number(resolvedSearchParams.lng);
    const name = resolvedSearchParams.name as string;
    
    if (!isNaN(lat) && !isNaN(lng) && name) {
      city = {
        name,
        slug: citySlug,
        lat,
        lng,
        state: ''
      };
    }
  }
  
  if (!city) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mobile/Tablet Top Banner */}
      <div className="w-full px-4 sm:px-0 mt-6 xl:hidden">
        <AdBanner dataAdSlot={`top-${city.slug}-banner`} className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>

      <div className="w-full flex justify-center max-w-[1600px] mx-auto px-2 lg:px-4">
        {/* Left Vertical Ad (Visible on Desktop) */}
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-6 pr-4 lg:pr-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot={`left-${city.slug}-banner`} className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="w-full flex-grow max-w-4xl">
          <ChoghadiyaView location={city} />
        </div>
        
        {/* Right Vertical Ad (Visible on Desktop) */}
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-6 pl-4 lg:pl-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot={`right-${city.slug}-banner`} className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 mt-4">
        <ChoghadiyaInfo />
      </div>

      {/* Mobile/Tablet Bottom Banner */}
      <div className="w-full px-4 sm:px-0 mb-8 mt-4 xl:hidden">
        <AdBanner dataAdSlot={`bottom-${city.slug}-banner`} className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `Today Choghadiya in ${city.name}`,
            "description": `Check today’s auspicious timings (Choghadiya) for ${city.name}.`,
            "provider": {
              "@type": "Organization",
              "name": "Choghadiya India"
            }
          })
        }}
      />
    </div>
  );
}
