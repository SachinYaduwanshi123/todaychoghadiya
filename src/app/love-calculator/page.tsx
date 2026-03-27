'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Heart, Share2, RefreshCw, ArrowLeft, Zap, Sparkles, User } from 'lucide-react';

const flamesMapping: { [key: string]: { label: string; icon: string; message: string; color: string } } = {
  F: { label: 'Friends 🤝', icon: '🤝', message: 'Strong friendship bond 🤝', color: 'text-blue-200' },
  L: { label: 'Love ❤️', icon: '❤️', message: 'You both are deeply connected ❤️', color: 'text-rose-200' },
  A: { label: 'Affection 😊', icon: '😊', message: 'Caring relationship 😊', color: 'text-orange-200' },
  M: { label: 'Marriage 💍', icon: '💍', message: 'Perfect life partners 💍', color: 'text-pink-200' },
  E: { label: 'Enemy 😈', icon: '😈', message: 'Not a good match 😅', color: 'text-yellow-200' },
  S: { label: 'Sibling 👨‍👩‍👧', icon: '👨‍👩‍👧', message: 'Pure bonding 👨‍👩‍👧', color: 'text-emerald-200' },
};

interface FlamesMeaningProps {
  onSelect: (key: string) => void;
  selectedKey?: string;
}

function FlamesMeaning({ onSelect, selectedKey }: FlamesMeaningProps) {
  return (
    <section id="flames-meaning" className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      <h2 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
        Meaning of FLAMES
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {Object.entries(flamesMapping).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 group hover:scale-105 ${
              selectedKey === key
                ? 'bg-rose-100 border-rose-400 shadow-inner'
                : 'bg-rose-50 border-rose-100 hover:bg-rose-100'
            }`}
          >
            <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{value.icon}</span>
            <span className="font-bold text-rose-600">{value.label.split(' ')[0]}</span>
            <span className="text-[10px] text-gray-500 text-center mt-1 uppercase tracking-tighter">{value.message.split(' ').slice(0, 2).join(' ')}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

interface LoveCalculatorInfoProps {
  onSelectCategory: (key: string) => void;
  selectedCategory?: string;
}

function LoveCalculatorInfo({ onSelectCategory, selectedCategory }: LoveCalculatorInfoProps) {
  return (
    <div className="max-w-4xl w-full mt-16 mb-20 relative z-10 space-y-12 px-2">
      <FlamesMeaning onSelect={onSelectCategory} selectedKey={selectedCategory} />

      <section className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-white shadow-xl translate-y-0 hover:-translate-y-1 transition-transform duration-300">
        <h2 className="text-3xl font-black mb-6 flex items-center">
          <Sparkles className="mr-3 text-rose-300" /> What is a Love Calculator?
        </h2>
        <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-4">
          <p>
            A <strong>Love Calculator</strong> is a fun and interactive online tool designed to estimate the compatibility between two individuals based on their names. While love is complex and multifaceted, these calculators use traditional name-matching algorithms to give you a "Love Score" that represents your potential connection.
          </p>
          <p>
            Our Love Calculator combines two popular methods: a numerical name-hash algorithm and the classic <strong>FLAMES</strong> game, providing a comprehensive and entertaining look at your relationship dynamics.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-white shadow-xl">
          <h3 className="text-2xl font-black mb-4 flex items-center">
            <Zap className="mr-3 text-yellow-300" /> How it Works
          </h3>
          <p className="text-white/70 leading-relaxed">
            The algorithm processes the characters of both names. It looks for common patterns, vowel frequency, and letter positioning to generate a unique numerical value. This value is then normalized into a percentage from 0% to 100%. Remember, this is purely for entertainment!
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-white shadow-xl">
          <h3 className="text-2xl font-black mb-4 flex items-center">
            <Heart className="mr-3 text-rose-300" /> The FLAMES Logic
          </h3>
          <p className="text-white/70 leading-relaxed">
            FLAMES stands for Friends, Love, Affection, Marriage, Enemy, and Sibling. It's a popular relationship game where common letters in both names are struck out, and the remaining count is used to cycle through the letters of "FLAMES" to find the resulting relationship type.
          </p>
        </div>
      </section>

      

      <section className="text-center text-white/40 text-xs px-8">
        <p className="mb-2"><strong>Disclaimer:</strong> This Love Calculator is strictly for fun and entertainment purposes. Human relationships are based on trust, communication, and mutual respect, which cannot be measured by a computer algorithm.</p>
        <p>© {new Date().getFullYear()} Choghadiya India - All Rights Reserved</p>
      </section>
    </div>
  );
}

export default function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ score: number; flames: string; flamesMeta: any } | null>(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);


  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('love_calc_data');
    if (saved) {
      try {
        const { n1, n2, res } = JSON.parse(saved);
        setName1(n1 || '');
        setName2(n2 || '');
        if (res) {
          setResult(res);
          setShowResult(true);
          setDisplayScore(res.score);
        }
      } catch (e) {
        console.error('Failed to load saved data');
      }
    }
  }, []);

  // Save to localStorage when result changes
  useEffect(() => {
    if (name1 || name2 || result) {
      localStorage.setItem('love_calc_data', JSON.stringify({
        n1: name1,
        n2: name2,
        res: result
      }));
    }
  }, [name1, name2, result]);

  const handleCategorySelect = (key: string) => {
    setSelectedCategory(key);
    
    // Force result if names are already entered
    if (name1.trim() && name2.trim()) {
      setIsCalculating(true);
      setShowResult(false);
      setDisplayScore(0);
      
      setTimeout(() => {
        // High score for Love/Marriage/Affection, random otherwise but consistent-ish
        let score = 0;
        if (['L', 'M', 'A'].includes(key)) {
          score = 80 + Math.floor(Math.random() * 20);
        } else {
          score = 40 + Math.floor(Math.random() * 30);
        }
        
        setResult({
          score,
          flames: key,
          flamesMeta: flamesMapping[key]
        });
        setIsCalculating(false);
        setShowResult(true);
        
        if (score > 80 || key === 'L' || key === 'M') {
          createConfetti();
        }
      }, 1000);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const calculateResult = () => {
    if (!name1 || !name2) return;
    setIsCalculating(true);
    setShowResult(false);
    setDisplayScore(0);

    setTimeout(() => {
      // 1. Love Percentage Logic (Deterministic + slight random)
      const combined = (name1 + name2).toLowerCase().trim();
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash += combined.charCodeAt(i) * (i + 1);
      }
      const randomOffset = Math.floor(Math.random() * 21) - 10;
      let score = (hash % 60) + 40 + randomOffset; // Range 30-100ish
      score = Math.max(0, Math.min(100, score));

      // 2. FLAMES Logic
      let n1 = name1.toLowerCase().replace(/\s/g, '').split('');
      let n2 = name2.toLowerCase().replace(/\s/g, '').split('');

      for (let i = 0; i < n1.length; i++) {
        const char = n1[i];
        const idx = n2.indexOf(char);
        if (idx !== -1) {
          n1.splice(i, 1);
          n2.splice(idx, 1);
          i--;
        }
      }

      const count = n1.length + n2.length;
      let flamesArr = ['F', 'L', 'A', 'M', 'E', 'S'];
      if (count > 0) {
        let currentPos = 0;
        while (flamesArr.length > 1) {
          currentPos = (currentPos + count - 1) % flamesArr.length;
          flamesArr.splice(currentPos, 1);
        }
      }
      const flamesKey = flamesArr[0];
      const flamesMeta = flamesMapping[flamesKey];

      setResult({ score, flames: flamesKey, flamesMeta });
      setIsCalculating(false);
      setShowResult(true);
      setSelectedCategory(undefined); // Reset manual selection when calculating fresh


      // Trigger confetti if high score or Love/Marriage
      if (score > 80 || flamesKey === 'L' || flamesKey === 'M') {
        createConfetti();
      }
    }, 1800);
  };

  const createConfetti = () => {
    const pieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      size: Math.random() * 10 + 5,
      color: ['#ff85a1', '#ff0a54', '#ff477e', '#ff7096', '#fbb1bd'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 4000);
  };

  useEffect(() => {
    if (showResult && result && displayScore < result.score) {
      const timer = setTimeout(() => {
        setDisplayScore((prev) => Math.min(prev + 1, result.score));
      }, 15);
      return () => clearTimeout(timer);
    }
  }, [showResult, result, displayScore]);

  const shareOnWhatsApp = () => {
    if (!result) return;
    const text = `💘 Love Compatibility Check!\n\n${name1} & ${name2}\n❤️ Love: ${result.score}%\n🔥 FLAMES: ${result.flamesMeta.label}\n\n"${result.flamesMeta.message}"\n\nCheck yours here: ${window.location.host}/love-calculator`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const reset = () => {
    setName1('');
    setName2('');
    setShowResult(false);
    setResult(null);
    setDisplayScore(0);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-pink-500 via-rose-500 to-purple-800 relative overflow-hidden flex flex-col items-center p-4">

      {/* Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10 text-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 20 + 20}px`,
            }}
          >
            <Heart fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Confetti */}
      {confetti.map((p) => (
        <div
          key={p.id}
          className="absolute z-50 animate-bounce pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: '50%',
            animation: `fall 3s linear forwards`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-custom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out 3;
        }
        .glow-heart {
          filter: drop-shadow(0 0 15px rgba(255, 50, 100, 0.8));
        }
        .glow-border {
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.6) !important;
        }
      `}</style>


      <div className="max-w-md w-full relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        {!showResult ? (
          <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl text-white w-full animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-white/20 rounded-full animate-heart-beat mb-3">
                <Heart className="w-8 h-8 fill-white text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-1">
                Love Calculator {selectedCategory ? `+ ${flamesMapping[selectedCategory].label.split(' ')[0]}` : '+ FLAMES'}
              </h1>
              <p className="text-white/70 text-sm">Find your love percent & relationship type</p>
            </div>


            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/80 transition-colors" />
                <input
                  type="text"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Enter Your Name"
                  className="w-full pl-12 pr-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/40 text-lg font-medium transition-all"
                />
              </div>

              <div className="flex justify-center -my-2">
                <Sparkles className="text-rose-300 w-5 h-5 animate-pulse" />
              </div>

              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/80 transition-colors" />
                <input
                  type="text"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Enter Partner's Name"
                  className="w-full pl-12 pr-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/40 text-lg font-medium transition-all"
                />
              </div>


              <button
                onClick={calculateResult}
                disabled={!name1 || !name2 || isCalculating}
                className="w-full py-4 bg-white text-rose-600 rounded-2xl font-bold text-xl shadow-lg hover:bg-rose-50 active:scale-95 transition-all disabled:opacity-50 mt-4 overflow-hidden relative"
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 mr-2 animate-spin" />
                    Calculating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    💖 Calculate Love
                  </span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className={`glass-card rounded-3xl p-6 sm:p-8 shadow-2xl text-white w-full animate-in slide-in-from-bottom-5 duration-500 ${(result?.score || 0) > 80 ? 'glow-border' : ''} ${(result?.score || 0) < 40 ? 'animate-shake' : ''}`}>
            <div className="text-center space-y-6">
              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 animate-pulse-custom ${(result?.score || 0) > 80 ? 'bg-white/20' : ''}`}>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Love Score</span>
                  <div className="relative flex items-center justify-center">
                    <svg className="w-24 h-24 -rotate-90">
                      <circle cx="48" cy="48" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
                      <circle cx="48" cy="48" r="42" stroke="#fff" strokeWidth="6" fill="transparent" strokeDasharray={264} strokeDashoffset={264 - (264 * displayScore) / 100} strokeLinecap="round" className={`transition-all duration-300 ${(result?.score || 0) > 80 ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`} />
                    </svg>
                    <span className={`absolute text-2xl font-black ${(result?.score || 0) > 80 ? 'text-white drop-shadow-md' : ''}`}>{displayScore}%</span>
                  </div>
                </div>


                {/* FLAMES Card */}
                <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/10 animate-in zoom-in slide-in-from-left-2 duration-700 delay-300 fill-mode-both">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">FLAMES</span>
                  <div className="text-4xl mb-1">{result?.flamesMeta.icon}</div>
                  <span className={`text-sm font-bold ${result?.flamesMeta.color}`}>{result?.flamesMeta.label.split(' ')[0]}</span>
                </div>
              </div>

              {/* Message */}
              <div className="py-4 border-y border-white/10 animate-in fade-in duration-1000 delay-500 fill-mode-both">
                <h2 className="text-xl sm:text-2xl font-black mb-1 italic">
                  "{result?.flamesMeta.message}"
                </h2>
                <p className="text-white/60 text-xs">A perfect match for {name1} & {name2}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={reset}
                  className="flex items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-bold transition-all"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </button>
                <button
                  onClick={shareOnWhatsApp}
                  className="flex items-center justify-center px-4 py-3 bg-[#25D366] hover:bg-[#128C7E] rounded-xl text-sm font-bold shadow-lg transition-all"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center space-x-1 text-white/40 text-[10px] uppercase font-bold tracking-widest">
          <Zap className="w-3 h-3" />
          <span>Powered by Choghadiya India</span>
        </div>
      </div>

      <LoveCalculatorInfo onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
    </div>
  );
}

