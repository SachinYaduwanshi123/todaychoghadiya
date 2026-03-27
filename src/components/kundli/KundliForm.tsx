'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, Calendar, Clock, User as UserIcon } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  name: string;
}

interface KundliFormProps {
  onSubmit: (data: { name: string; dob: string; tob: string; lat: number; lng: number; city: string }) => void;
}

export default function KundliForm({ onSubmit }: KundliFormProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<NominatimResult | null>(null);
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(cityQuery, 500);

  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedQuery || debouncedQuery.length < 3 || selectedCity) {
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
  }, [debouncedQuery, selectedCity]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (r: NominatimResult) => {
    setSelectedCity(r);
    setCityQuery(r.name);
    setIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob || !tob || !selectedCity) return;
    onSubmit({
      name,
      dob,
      tob,
      lat: parseFloat(selectedCity.lat),
      lng: parseFloat(selectedCity.lon),
      city: selectedCity.name
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-orange-100 max-w-2xl w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-orange-900 mb-2">Generate Your Kundli</h2>
        <p className="text-orange-700/60 font-medium">Enter birth details for accurate astronomical insights</p>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-orange-900/70 ml-1 flex items-center">
              <UserIcon className="w-4 h-4 mr-1.5" /> Full Name (Optional)
            </label>
            <input
              type="text"
              className="px-5 py-3.5 rounded-2xl bg-orange-50 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-orange-900 font-medium transition-all"
              placeholder="E.g. Sachin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-orange-900/70 ml-1 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" /> Date of Birth
            </label>
            <input
              type="date"
              required
              className="px-5 py-3.5 rounded-2xl bg-orange-50 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-orange-900 font-medium transition-all"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-bold text-orange-900/70 ml-1 flex items-center">
              <Clock className="w-4 h-4 mr-1.5" /> Time of Birth
            </label>
            <input
              type="time"
              required
              className="px-5 py-3.5 rounded-2xl bg-orange-50 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-orange-900 font-medium transition-all"
              value={tob}
              onChange={(e) => setTob(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2 relative" ref={wrapperRef}>
            <label className="text-sm font-bold text-orange-900/70 ml-1 flex items-center">
              <MapPin className="w-4 h-4 mr-1.5" /> Place of Birth
            </label>
            <div className="relative">
              <input
                type="text"
                required
                className="w-full px-5 py-3.5 rounded-2xl bg-orange-50 border border-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-orange-900 font-medium transition-all"
                placeholder="Search City..."
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  if (selectedCity) setSelectedCity(null);
                }}
              />
              {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500 animate-spin" />}
            </div>

            {isOpen && results.length > 0 && (
              <ul className="absolute z-50 mt-1 top-full w-full bg-white shadow-2xl rounded-2xl py-2 border border-orange-100 max-h-60 overflow-auto">
                {results.map((r) => (
                  <li
                    key={r.place_id}
                    onClick={() => handleCitySelect(r)}
                    className="px-5 py-3 hover:bg-orange-50 cursor-pointer text-orange-900 font-medium transition-colors border-b last:border-0 border-orange-50"
                  >
                    <div className="font-bold">{r.name}</div>
                    <div className="text-[10px] text-orange-700/50 truncate uppercase tracking-widest">{r.display_name}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl font-black text-xl shadow-xl hover:shadow-orange-200 hover:scale-[1.01] active:scale-95 transition-all mt-4 uppercase tracking-wider"
        >
          Generate Kundli Chart
        </button>
      </form>
      
      <p className="mt-8 text-center text-xs text-orange-900/40 font-bold border-t border-orange-50 pt-6">
        🔒 Your birth data is processed securely and not stored permanently.
      </p>
    </div>
  );
}
