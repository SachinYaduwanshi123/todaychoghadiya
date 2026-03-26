import { getCityBySlug } from '@/lib/cities';
import PanchangView from '@/components/choghadiya/PanchangView';
import AdBanner from '@/components/layout/AdBanner';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const top4 = ['indore', 'delhi', 'mumbai', 'jaipur'];
  return top4.map((slug) => ({ city: slug }));
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
  if (!city && resolvedSearchParams.name) {
    city = { name: resolvedSearchParams.name as string, slug: citySlug, lat: 0, lng: 0, state: '' };
  }
  if (!city) return {};
  
  return {
    title: `Today Panchang in ${city.name} - Rahu Kaal, Tithi, Nakshatra`,
    description: `Check today’s accurate Panchang for ${city.name}. Find Auspicious timings like Abhijit Muhurat and avoid inauspicious times like Rahu Kaal.`,
    alternates: { canonical: `/panchang/${city.slug}` }
  };
}

export default async function CityPanchangPage({ 
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
      city = { name, slug: citySlug, lat, lng, state: '' };
    }
  }
  
  if (!city) return notFound();

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full px-4 sm:px-0 mt-6 xl:hidden">
        <AdBanner dataAdSlot={`top-panchang-${city.slug}`} className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>

      <div className="w-full flex justify-center max-w-[1600px] mx-auto px-2 lg:px-4">
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-6 pr-4 lg:pr-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot={`left-panchang-${city.slug}`} className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
        
        <div className="w-full flex-grow max-w-4xl">
          <PanchangView location={city} />
        </div>
        
        <div className="hidden xl:block w-[160px] 2xl:w-[300px] flex-shrink-0 pt-6 pl-4 lg:pl-8">
          <div className="sticky top-24">
            <AdBanner dataAdSlot={`right-panchang-${city.slug}`} className="h-[600px] w-full m-0 rounded-xl" />
          </div>
        </div>
      </div>
      
      <div className="w-full px-4 sm:px-0 mb-8 mt-4 xl:hidden">
        <AdBanner dataAdSlot={`bottom-panchang-${city.slug}`} className="aspect-[320/50] sm:aspect-[728/90] max-w-[728px] mx-auto" />
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `Today Panchang in ${city.name}`,
            "description": `Check today’s Panchang, Tithi, Nakshatra, and Rahu Kaal for ${city.name}.`,
          })
        }}
      />
    </div>
  );
}
