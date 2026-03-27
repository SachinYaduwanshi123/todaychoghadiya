import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import { Sun, Mail, ShieldCheck } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Choghadiya India - Daily Auspicious Timings',
  description: 'Check today’s Choghadiya with accurate sunrise and sunset based timings for all cities in India.',
  keywords: 'choghadiya, today choghadiya, auspicious time, hindu calendar, panchang',
};

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow bg-white">
          {children}
        </main>
        <footer className="bg-neutral-950 border-t border-neutral-800 pt-10 pb-6 mt-auto relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-saffron-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
              <div className="col-span-1 flex flex-col space-y-4">
                <Link href="/" className="inline-flex items-center space-x-2.5">
                  <div className="bg-saffron-500/10 p-2 rounded-xl">
                    <Sun className="h-6 w-6 text-saffron-500" />
                  </div>
                  <span className="text-xl font-extrabold tracking-tight text-white">Choghadiya India</span>
                </Link>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Your most trusted source for accurate, location-based Vedic astrology timings. Plan your day perfectly by discovering the most auspicious Muhurats, customized for your exact coordinates.
                </p>
                <div className="flex space-x-4 pt-2">
                  <a href="mailto:support@choghadiya-india.com" className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-saffron-500 hover:text-white hover:border-saffron-500 transition-all duration-300 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="col-span-1">
                <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Features</h3>
                <ul className="space-y-3 text-sm text-neutral-400 font-medium">
                  <li><Link href="/" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Daily Choghadiya</Link></li>
                  <li><Link href="/panchang" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Today Panchang</Link></li>
                  <li><Link href="/love-calculator" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Love Calculator</Link></li>
                  <li><Link href="/festival-calendar" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Hindu Festival Calendar</Link></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Quick Links</h3>
                <ul className="space-y-3 text-sm text-neutral-400 font-medium">
                  <li><Link href="/" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Home</Link></li>
                  <li><Link href="/about" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Contact Us</Link></li>
                </ul>
              </div>

              <div className="col-span-1">
                <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5">Legal</h3>
                <ul className="space-y-3 text-sm text-neutral-400 font-medium">
                  <li><Link href="/privacy-policy" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Terms & Conditions</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-saffron-400 hover:translate-x-1 inline-flex transition-all duration-300">Disclaimer</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col items-center">
              <div className="flex items-center text-emerald-400 font-medium mb-6 bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-800/50">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Data strictly based on verified astronomical calculations and exact ephemeris boundaries.
              </div>
              <p className="text-gray-500 text-sm text-center">
                &copy; {new Date().getFullYear()} Choghadiya India. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        {/* <GoogleAnalytics gaId="G-XXXXXXXXXX" /> */}
      </body>
    </html>
  );
}
