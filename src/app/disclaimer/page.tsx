import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Choghadiya India',
  description: 'Disclaimer regarding the astrological timings provided on Choghadiya India.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Disclaimer</h1>
      <div className="prose prose-lg text-gray-600 max-w-none">
        <p className="mb-4"><strong>Please read this disclaimer carefully before using Choghadiya India.</strong></p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">General Information Only</h2>
        <p className="mb-4">The astrological calculations, Muhurat, and Choghadiya timings provided on this website are based on the ancient Vedic system of Jyotish Shastra and astronomical suncalc formulas. The information is provided for general, educational, and cultural purposes only.</p>
        <p className="mb-4"><strong>We make no guarantees regarding the 100% absolute accuracy or effectiveness of the timings provided.</strong> Astrology is a matter of belief, and interpretations can vary significantly.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">No Liability</h2>
        <p className="mb-4">In no event will Choghadiya India, its owners, or developers be liable for any loss, damage, or consequence (including without limitation, indirect or consequential loss or damage) arising from reliance on the timings, information, or materials provided on this website.</p>
        <p className="mb-4">You acknowledge that using the timings for starting a business, traveling, or important life events is done strictly at your own risk.</p>
        
        <p className="mt-10 font-medium">If you have serious decisions to make, we recommend consulting a certified local astrologer.</p>
      </div>
    </div>
  );
}
