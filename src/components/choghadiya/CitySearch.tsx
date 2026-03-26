'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { Search, MapPin, Loader2, X } from 'lucide-react';

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name: string;
}

export default function CitySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedQuery || debouncedQuery.length < 3) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedQuery)}&countrycodes=in&limit=5`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (e) {
        console.error('Failed to fetch cities', e);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (r: NominatimResult) => {
    setIsOpen(false);
    setQuery('');
    
    // Create a URL friendly slug
    const slug = r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Route to panchang or choghadiya dynamically
    const basePath = pathname?.startsWith('/panchang') ? '/panchang' : '/choghadiya';
    router.push(`${basePath}/${slug}?lat=${r.lat}&lng=${r.lon}&name=${encodeURIComponent(r.name)}`);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm sm:w-72 lg:w-96">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-saffron-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-11 py-2.5 border border-gray-300 rounded-full text-gray-900 leading-5 bg-gray-50/50 hover:bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-500/50 focus:border-saffron-500 focus:bg-white sm:text-base transition-all duration-200 shadow-sm"
          placeholder="Search any city or district..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        />
        {(query || loading) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {loading ? (
              <Loader2 className="h-5 w-5 text-saffron-500 animate-spin" />
            ) : (
              <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white shadow-xl max-h-72 rounded-xl py-2 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm origin-top animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 pb-2 pt-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Search Results
          </div>
          {results.map((r) => (
            <li
              key={r.place_id}
              onClick={() => handleSelect(r)}
              className="cursor-pointer select-none relative py-2.5 pl-4 pr-4 hover:bg-orange-50 text-gray-900 mx-1 rounded-lg transition-colors"
            >
              <div className="flex items-start">
                <div className="bg-orange-100 p-1.5 rounded-full mr-3 mt-0.5">
                  <MapPin className="h-4 w-4 text-saffron-600 flex-shrink-0" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold block truncate text-base">{r.name}</span>
                  <span className="text-gray-500 text-xs line-clamp-1 mt-0.5">{r.display_name}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
