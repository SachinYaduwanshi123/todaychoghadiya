import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Choghadiya India',
  description: 'Learn more about Choghadiya India and our mission to provide accurate auspicious timings.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">About Us</h1>
      <div className="prose prose-lg text-gray-600 max-w-none">
        <p className="mb-6">
          Welcome to <strong>Choghadiya India</strong>, your ultimate destination for highly accurate, location-based Vedic astrology timings. 
        </p>
        <p className="mb-6">
          Our purpose is to help millions of users effortlessly find the most auspicious times (Muhurat) for their daily activities. Whether you are starting a new business venture, signing a contract, performing a pooja, or planning a journey, following the correct Choghadiya can bring positivity and success.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What We Do</h2>
        <p className="mb-6">
          Unlike generic printed calendars, Choghadiya India calculates exact sunrise and sunset times based on the specific latitude and longitude of your chosen city or district. This ensures that the Day and Night Choghadiya slots you view are mathematically precise and astrologically accurate for your exact location.
        </p>
        <p className="mb-6">
          We deeply respect the ancient traditions of Jyotish Shastra and aim to merge them with modern, fast, and accessible technology.
        </p>
      </div>
    </div>
  );
}
