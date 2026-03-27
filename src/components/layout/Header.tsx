import Link from 'next/link';
import CitySearch from '../choghadiya/CitySearch';
import { Sun } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-4">
              <Sun className="h-8 w-8 text-saffron-500 flex-shrink-0" />
              <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">Choghadiya India</span>
            </Link>
          </div>
          <div className="flex items-center flex-grow justify-end max-w-md w-full">
            <CitySearch />
          </div>
        </div>
      </div>
      <div className="bg-orange-50/50 border-t border-orange-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex space-x-4 sm:space-x-8 overflow-x-auto whitespace-nowrap text-sm font-bold tracking-wide">
          <Link href="/" className="text-gray-700 hover:text-saffron-600 px-2 py-1.5 rounded-lg hover:bg-orange-100/50 transition-colors">Daily Choghadiya</Link>
          <Link href="/panchang" className="text-gray-700 hover:text-saffron-600 px-2 py-1.5 rounded-lg hover:bg-orange-100/50 transition-colors">Today Panchang</Link>
          <Link href="/kundli" className="text-gray-700 hover:text-saffron-600 px-2 py-1.5 rounded-lg hover:bg-orange-100/50 transition-colors flex items-center">
            <span className="mr-1 text-orange-500 text-lg">🪐</span> Kundli
          </Link>
          <Link href="/love-calculator" className="text-gray-700 hover:text-saffron-600 px-2 py-1.5 rounded-lg hover:bg-orange-100/50 transition-colors flex items-center">
            <span className='mr-1'> ❤️ </span> Love Calculator <span className="ml-1 text-rose-500">❤️</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
