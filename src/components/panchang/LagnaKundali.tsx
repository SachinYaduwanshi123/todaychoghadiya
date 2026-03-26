'use client';

import React from 'react';
import type { PlanetPosition } from '@/lib/panchang';

interface KundaliProps {
  lagnaSign: number; // 0-11
  planets: PlanetPosition[];
}

export default function LagnaKundali({ lagnaSign, planets }: KundaliProps) {
  // House 1 corresponds to lagnaSign. 
  // Map each sign to the planets residing in it.
  const signToPlanets: Record<number, PlanetPosition[]> = {};
  for (let i = 0; i < 12; i++) signToPlanets[i] = [];
  
  planets.forEach(p => {
    // Treat lagna as an entity if we wanted to, but we only have 9 planets
    signToPlanets[p.sign].push(p);
  });

  // For a North Indian chart:
  // House 1 is always the top central diamond. And flows counter-clockwise.
  // House 1 -> House 12.
  // The Zodiac number written in House 1 is (lagnaSign + 1).
  const houses = Array.from({ length: 12 }, (_, i) => {
    return (lagnaSign + i) % 12; // The Zodiac sign (0-11) residing in this house
  });

  // Centers for the 12 houses in a 400x400 diamond grid
  const houseCenters = [
    { x: 200, y: 100 }, // House 1
    { x: 100, y: 50 },  // House 2
    { x: 50, y: 100 },  // House 3
    { x: 100, y: 200 }, // House 4
    { x: 50, y: 300 },  // House 5
    { x: 100, y: 350 }, // House 6
    { x: 200, y: 300 }, // House 7
    { x: 300, y: 350 }, // House 8
    { x: 350, y: 300 }, // House 9
    { x: 300, y: 200 }, // House 10
    { x: 350, y: 100 }, // House 11
    { x: 300, y: 50 },  // House 12
  ];
  
  // Zodiac Number offsets inside the cell to make room for planets
  const numOffsets = [
    { x: 200, y: 140 }, { x: 140, y: 80 }, { x: 80, y: 140 }, { x: 140, y: 200 },
    { x: 80, y: 260 }, { x: 140, y: 320 }, { x: 200, y: 260 }, { x: 260, y: 320 },
    { x: 320, y: 260 }, { x: 260, y: 200 }, { x: 320, y: 140 }, { x: 260, y: 80 }
  ];

  return (
    <div className="w-full bg-[#fdf5e6] p-4 sm:p-6 rounded-2xl border border-orange-200 shadow-sm flex flex-col items-center">
      <div className="flex justify-between items-center w-full mb-6">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-orange-900 border-b-2 border-orange-200 pb-1">Lagna Kundali</h3>
        <div className="text-sm font-semibold text-orange-700 bg-orange-100/50 px-3 py-1 rounded-full border border-orange-200">North Indian</div>
      </div>
      
      <div className="w-full max-w-md aspect-square relative">
        <svg viewBox="0 0 400 400" className="w-full h-full text-orange-800 font-sans" stroke="currentColor" fill="none">
          {/* Base Rectangle */}
          <rect x="2" y="2" width="396" height="396" strokeWidth="3" />
          
          {/* Cross Diagonals */}
          <line x1="2" y1="2" x2="398" y2="398" strokeWidth="2" />
          <line x1="398" y1="2" x2="2" y2="398" strokeWidth="2" />
          
          {/* Inner Diamond */}
          <polygon points="200,2 398,200 200,398 2,200" strokeWidth="2" />

          {/* Render House Signs and Planets */}
          {houses.map((signIndex, houseIndex) => {
            const planetList = signToPlanets[signIndex] || [];
            const center = houseCenters[houseIndex];
            const numOffset = numOffsets[houseIndex];

            return (
              <g key={`house-${houseIndex}`}>
                {/* Zodiac Sign Number */}
                <text x={numOffset.x} y={numOffset.y} fontSize="14" fontWeight="bold" fill="#cb6a21" className="opacity-80" textAnchor="middle" alignmentBaseline="middle">
                  {signIndex + 1}
                </text>

                {/* Planets residing in this sign */}
                <g transform={`translate(${center.x}, ${center.y - (planetList.length - 1) * 8})`}>
                  {planetList.map((p, pIdx) => {
                    const isRetro = p.isRetrograde;
                    const isCombust = p.isCombust;
                    let displayStr = p.name.substring(0, 3);
                    if (isRetro && p.name !== 'Rahu' && p.name !== 'Ketu') displayStr += '(R)';
                    if (isCombust) displayStr += '*';

                    // Color coding planet names for visual rich feel
                    let color = "#7c2d12"; // default dark orange
                    if (p.name === 'Surya') color = "#dc2626"; // Red
                    else if (p.name === 'Chandra') color = "#2563eb"; // Blue
                    else if (p.name === 'Guru') color = "#d97706"; // Amber
                    else if (p.name === 'Shukra') color = "#db2777"; // Pink
                    else if (p.name === 'Shani') color = "#4b5563"; // Gray/Black
                    else if (p.name === 'Mangal') color = "#b91c1c"; // Dark Red
                    else if (p.name === 'Budha') color = "#16a34a"; // Green
                    else if (p.name === 'Rahu' || p.name === 'Ketu') color = "#52525b"; // Slate

                    return (
                      <text 
                        key={p.name}
                        x="0" 
                        y={pIdx * 18 - 4} 
                        fontSize="14" 
                        fontWeight="700" 
                        fill={color}
                        textAnchor="middle" 
                        alignmentBaseline="middle"
                        className="tracking-wide"
                      >
                        {displayStr}
                      </text>
                    );
                  })}
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-semibold text-orange-800">
        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-800 mr-1.5 opacity-60"></span> Numbers indicate Zodiac Sign (1=Aries, 12=Pisces)</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-800 mr-1.5 opacity-60"></span> (R) = Retrograde (Vakri)</span>
        <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-800 mr-1.5 opacity-60"></span> * = Combust (Asta)</span>
      </div>
    </div>
  );
}
