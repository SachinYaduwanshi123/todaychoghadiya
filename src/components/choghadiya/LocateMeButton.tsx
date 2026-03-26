'use client';

import { useState } from 'react';
import { topCities } from '@/lib/cities';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';

export default function LocateMeButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLocate = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Find closest city
        let closestCity = topCities[0];
        let minDistance = Infinity;

        for (const city of topCities) {
          const dLat = city.lat - latitude;
          const dLng = city.lng - longitude;
          const distance = Math.sqrt(dLat * dLat + dLng * dLng); // Simple euclidean for rough estimation
          
          if (distance < minDistance) {
            minDistance = distance;
            closestCity = city;
          }
        }

        router.push(`/choghadiya/${closestCity.slug}`);
      },
      () => {
        alert('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <button
      onClick={handleLocate}
      disabled={loading}
      className="flex items-center space-x-2 bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm disabled:opacity-70"
    >
      <MapPin className="w-4 h-4" />
      <span>{loading ? 'Locating...' : 'Use My Location'}</span>
    </button>
  );
}
