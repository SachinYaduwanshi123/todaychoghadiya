import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Choghadiya India',
  description: 'Privacy policy and data handling for Choghadiya India.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-lg text-gray-600 max-w-none">
        
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">Welcome to Choghadiya India. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect and process your information when you visit our website.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
        <p className="mb-4">We do not require users to create an account or provide personal information to use the majority of our website. We only collect details you provide voluntarily (e.g., via our contact form). Additionally, we might use the HTML5 Geolocation API provided by your browser to find your closest city. This location data is processed entirely on your device and is not saved on our servers.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cookies and Google AdSense</h2>
        <p className="mb-4">We use cookies and similar tracking technologies to track activity on our service and hold certain information.</p>
        <p className="mb-4">Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</p>
        <p className="mb-4">Users may opt out of personalized advertising by visiting Google Ads Settings.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Google Analytics</h2>
        <p className="mb-4">We use Google Analytics to measure website performance and analyze user traffic. This helps us improve our service. Analytics data is anonymized and aggregated.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at support@choghadiya-india.com.</p>
      </div>
    </div>
  );
}
