import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Choghadiya India',
  description: 'Terms and Conditions for using Choghadiya India services.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Terms & Conditions</h1>
      <div className="prose prose-lg text-gray-600 max-w-none">
        
        <p className="mb-4">Welcome to Choghadiya India. By using our website, you agree to comply with and be bound by the following terms and conditions.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Use of the Site</h2>
        <p className="mb-4">Choghadiya India provides location-based Vedic astrology timings. The content on this website is for general information and educational purposes only.</p>
        <p className="mb-4">You agree to use this site only for lawful purposes and in a manner that does not infringe upon the rights or restrict the use of this site by any third party.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Intellectual Property</h2>
        <p className="mb-4">The design, layout, look, appearance, and graphics of this website are owned by Choghadiya India. Reproduction is prohibited other than in accordance with the copyright notice.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. External Links</h2>
        <p className="mb-4">Our website may include links to other websites (e.g., Google Ads). These links are provided for your convenience. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Governing Law</h2>
        <p className="mb-4">Your use of this website and any dispute arising out of such use of the website is subject to the local laws of India.</p>
      </div>
    </div>
  );
}
