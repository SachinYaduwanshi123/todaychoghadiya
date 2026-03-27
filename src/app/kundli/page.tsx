'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  User as UserIcon, 
  LayoutDashboard, 
  Orbit, 
  BrainCircuit,
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import KundliForm from '@/components/kundli/KundliForm';
import LagnaKundali from '@/components/panchang/LagnaKundali';
import PlanetaryPositionsTable from '@/components/panchang/PlanetaryPositionsTable';
import { calculateKundli, KundliData } from '@/lib/kundli';
import { generateAstrologyInsights, AstrologyInsights } from '@/lib/astrology-ai';

export default function KundliPage() {
  const [kundliData, setKundliData] = useState<KundliData | null>(null);
  const [insights, setInsights] = useState<AstrologyInsights | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'planets' | 'insights'>('overview');
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const handleFormSubmit = (formData: any) => {
    const birthDate = new Date(`${formData.dob}T${formData.tob}`);
    const data = calculateKundli(birthDate, formData.lat, formData.lng, formData.city);
    const generatedInsights = generateAstrologyInsights(data);
    
    setKundliData(data);
    setInsights(generatedInsights);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!kundliData) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-orange-400 via-saffron-500 to-amber-700 flex flex-col items-center justify-center p-4 py-12">
        <KundliForm onSubmit={handleFormSubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcf5] text-gray-900 pb-20">
      {/* Header Info Section */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-12 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => setKundliData(null)}
              className="flex items-center text-orange-100 font-bold mb-4 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> New Kundli
            </button>
            <h1 className="text-4xl font-black tracking-tight flex items-center">
               Personalized Kundli Chart <Sparkles className="ml-3 w-6 h-6 text-yellow-300 animate-pulse" />
            </h1>
            <div className="flex flex-wrap gap-4 text-orange-50 font-medium">
              <span className="flex items-center"><UserIcon className="w-4 h-4 mr-1.5 opacity-70" /> {kundliData.basic.place.split(',')[0]} (Birth Chart)</span>
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5 opacity-70" /> {kundliData.basic.dob}</span>
              <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5 opacity-70" /> {kundliData.basic.tob}</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-orange-100/60 mb-1">Ascendant (Lagna)</span>
            <span className="text-2xl font-black">{kundliData.lagna.signName}</span>
            <span className="text-xs font-bold text-orange-200">{(kundliData.lagna.degree % 30).toFixed(2)}°</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="flex space-x-2 bg-orange-100/50 p-1.5 rounded-2xl border border-orange-100 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'planets', label: 'Planetary Positions', icon: Orbit },
            { id: 'insights', label: 'AI Astrology Insights', icon: BrainCircuit },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center flex-1 min-w-max px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'text-orange-900/60 hover:bg-white hover:text-orange-600'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 mt-10">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="lg:col-span-5 flex flex-col space-y-6">
               <LagnaKundali lagnaSign={kundliData.lagna.sign} planets={kundliData.planets as any} />
               <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm space-y-4">
                  <h4 className="font-black text-orange-900 flex items-center">
                    <Info className="w-4 h-4 mr-2 text-orange-500" /> Key Observations
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>The Ascendant (Lagna) is <strong>{kundliData.lagna.signName}</strong>, defining your physical self and personality.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <ChevronRight className="w-4 h-4 mr-2 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>Current Ayanamsa used is <strong>{kundliData.basic.ayanamsa.toFixed(4)}°</strong> (Sidereal calculation).</span>
                    </li>
                  </ul>
               </div>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/5 rounded-full -mr-16 -mt-16 group-hover:bg-orange-400/10 transition-colors"></div>
                <h3 className="text-2xl font-black text-orange-900 mb-6 flex items-center justify-between">
                  Quick Insights
                  <button onClick={() => setActiveTab('insights')} className="text-xs font-bold text-orange-600 hover:text-orange-700 underline flex items-center">
                    Full AI prediction <ChevronRight className="w-3 h-3 ml-0.5" />
                  </button>
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                    <h5 className="text-xs font-black uppercase tracking-widest text-orange-900/40 mb-2">Personality Traits</h5>
                    <p className="text-gray-700 font-medium italic">"{insights?.personality.en}"</p>
                  </div>
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                    <h5 className="text-xs font-black uppercase tracking-widest text-amber-900/40 mb-2">Career Roadmap</h5>
                    <p className="text-gray-700 font-medium italic">"{insights?.career.en}"</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"></div>
                 <h4 className="text-lg font-bold mb-4 flex items-center">
                   <Sparkles className="w-5 h-5 mr-3 text-yellow-400" /> Important Notice
                 </h4>
                 <p className="text-orange-100/80 text-sm leading-relaxed mb-4">
                    Astrology predictions are for guidance purposes only. They provide a cosmic weather report, but your karma and choices shape your destiny.
                 </p>
                 <div className="flex items-center text-xs font-bold text-orange-300 bg-white/5 py-2 px-4 rounded-full border border-white/10 w-fit">
                    Verified Sidereal Calculations (Lahiri Ayanamsha)
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'planets' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <PlanetaryPositionsTable planets={kundliData.planets as any} />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 space-y-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-orange-900 flex items-center">
                <BrainCircuit className="w-8 h-8 mr-3 text-orange-600" /> AI Deep Analysis
              </h2>
              <div className="flex bg-orange-100 p-1 rounded-xl border border-orange-200">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-orange-600 text-white shadow-sm' : 'text-orange-900/60'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setLang('hi')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === 'hi' ? 'bg-orange-600 text-white shadow-sm' : 'text-orange-900/60'}`}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { title: lang === 'en' ? 'Personality Traits' : 'व्यक्तित्व विशेषताएँ', content: insights?.personality[lang], color: 'border-orange-200 bg-orange-50/30' },
                 { title: lang === 'en' ? 'Career & Success' : 'करियर और सफलता', content: insights?.career[lang], color: 'border-amber-200 bg-amber-50/30' },
                 { title: lang === 'en' ? 'Love & Marriage' : 'प्रेम और विवाह', content: insights?.love[lang], color: 'border-rose-200 bg-rose-50/30' },
                 { title: lang === 'en' ? 'Health Insights' : 'स्वास्थ्य अंतर्दृष्टि', content: insights?.health[lang], color: 'border-emerald-200 bg-emerald-50/30' },
                 { title: lang === 'en' ? 'Financial Outlook' : 'वित्तीय भविष्य', content: insights?.finance[lang], color: 'border-indigo-200 bg-indigo-50/30' },
               ].map((item, idx) => (
                 <div key={idx} className={`p-8 rounded-3xl border shadow-sm transition-transform hover:-translate-y-1 duration-300 ${item.color}`}>
                   <h4 className="text-xl font-black text-gray-900 mb-4">{item.title}</h4>
                   <p className="text-gray-700 leading-relaxed font-medium">
                     {item.content}
                   </p>
                 </div>
               ))}
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-orange-200 shadow-xl text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>
               <p className="text-orange-800 font-bold text-lg mb-2">Want a more detailed consultation?</p>
               <p className="text-gray-500 text-sm mb-6">These insights are generated by our premium astrology logic based on your birth coordinates.</p>
               <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
                 Astrology predictions are for guidance purposes only.
               </div>
            </div>

            <section className="mt-20 max-w-4xl mx-auto space-y-12">
               <div className="text-center">
                 <h2 className="text-3xl font-black text-orange-900 mb-4">Understanding Your Kundli</h2>
                 <p className="text-gray-600">Deep dive into the ancient science of Vedic Astrology and how it impacts your life path.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-100">
                   <h3 className="text-xl font-bold text-orange-800 mb-3">What is a Kundli?</h3>
                   <p className="text-sm text-gray-600 leading-relaxed">
                     A Janam Kundli, or Birth Chart, is a snapshot of the celestial sky at the exact moment of your birth. It maps the positions of the Sun, Moon, and other planets across 12 houses and 12 zodiac signs.
                   </p>
                 </div>
                 <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-orange-100">
                   <h3 className="text-xl font-bold text-orange-800 mb-3">The Significance of Lagna</h3>
                   <p className="text-sm text-gray-600 leading-relaxed">
                     Lagna (Ascendant) is the zodiac sign that was rising on the eastern horizon at your birth. It represents your physical appearance, self-identity, and the primary filter through which you view the world.
                   </p>
                 </div>
               </div>
            </section>
          </div>
        )}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
