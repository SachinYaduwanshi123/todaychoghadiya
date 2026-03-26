'use client';

import React from 'react';
import type { PlanetPosition } from '@/lib/panchang';

interface PlanetaryTableProps {
  planets: PlanetPosition[];
}

export default function PlanetaryPositionsTable({ planets }: PlanetaryTableProps) {
  // Sorting planets in standard Navagraha order
  const order = ['Surya', 'Chandra', 'Mangal', 'Budha', 'Guru', 'Shukra', 'Shani', 'Rahu', 'Ketu'];
  const sortedPlanets = [...planets].sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

  const formatDegree = (deg: number) => {
    const d = Math.floor(deg);
    const m = Math.floor((deg - d) * 60);
    return `${d}° ${m}'`;
  };

  return (
    <div className="w-full bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center">
        Planetary Positions
        <span className="ml-3 text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md uppercase tracking-wide">Nirayana</span>
      </h3>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200 text-gray-500 text-xs uppercase tracking-wider font-bold">
              <th className="py-3 px-4">Planet</th>
              <th className="py-3 px-4">Sign</th>
              <th className="py-3 px-4 text-right">Degree in Sign</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Orbit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {sortedPlanets.map((p) => {
               // Status colors
               const isUdita = !p.isCombust;
               const isMargi = !p.isRetrograde;
               
               const orbitBg = isMargi ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200';
               const statusBg = isUdita ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200';

               return (
                 <tr key={p.name} className="hover:bg-gray-50 transition-colors">
                   <td className="py-3 px-4 font-bold text-gray-900">{p.name}</td>
                   <td className="py-3 px-4 text-gray-600 font-medium">{p.sign + 1} - {p.signName}</td>
                   <td className="py-3 px-4 text-right text-gray-700 font-mono tracking-tighter text-[13px]">
                     {formatDegree(p.degreeInSign)}
                   </td>
                   <td className="py-3 px-4 text-center">
                     {p.name === 'Rahu' || p.name === 'Ketu' ? (
                        <span className="text-gray-400 font-semibold px-2">—</span>
                     ) : (
                        <span className={`inline-block border px-2 py-0.5 rounded text-xs font-bold uppercase ${statusBg}`}>
                          {isUdita ? 'Udita (Rise)' : 'Asta (Combust)'}
                        </span>
                     )}
                   </td>
                   <td className="py-3 px-4 text-center">
                     <span className={`inline-block border px-2 py-0.5 rounded text-xs font-bold uppercase ${orbitBg}`}>
                       {isMargi ? 'Margi (Direct)' : 'Vakri (Retro)'}
                     </span>
                   </td>
                 </tr>
               );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
