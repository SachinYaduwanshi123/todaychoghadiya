import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Choghadiya India',
  description: 'Get in touch with the Choghadiya India team for support and inquiries.',
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Contact Us</h1>
      <p className="text-center text-lg text-gray-600 mb-10">
        Have questions, feedback, or need help? We'd love to hear from you.
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-saffron-500 focus:ring-saffron-500 sm:text-sm py-2 px-3 border" placeholder="Your Name" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-saffron-500 focus:ring-saffron-500 sm:text-sm py-2 px-3 border" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-saffron-500 focus:ring-saffron-500 sm:text-sm py-2 px-3 border" placeholder="How can we help you?"></textarea>
          </div>
          <div>
            <button type="button" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-saffron-600 hover:bg-saffron-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-saffron-500 transition-colors">
              Send Message
            </button>
          </div>
        </form>
        
        <div className="mt-10 pt-6 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>You can also email us directly at: <a href="mailto:support@choghadiya-india.com" className="text-saffron-600 hover:underline">support@choghadiya-india.com</a></p>
        </div>
      </div>
    </div>
  );
}
