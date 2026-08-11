import React, { useState, useEffect } from 'react';
import { Building2, Star, CheckCircle2, ShieldCheck, MessageCircle, MapPin, Sparkles, ExternalLink, Coffee, Flame, Utensils } from 'lucide-react';
import { AFFILIATED_HOTEL_CHAINS, HotelChainPartner, AGENCY_DETAILS } from '../data/travelData';

interface AffiliatedHotelsBannerProps {
  onOpenAIChatWithHotel?: (hotelName: string) => void;
  initialChainId?: string;
}

export const AffiliatedHotelsBanner: React.FC<AffiliatedHotelsBannerProps> = ({
  onOpenAIChatWithHotel,
  initialChainId = 'all'
}) => {
  const [selectedChainId, setSelectedChainId] = useState<string>(initialChainId);

  useEffect(() => {
    if (initialChainId) {
      setSelectedChainId(initialChainId);
    }
  }, [initialChainId]);

  const filteredChains = selectedChainId === 'all'
    ? AFFILIATED_HOTEL_CHAINS
    : AFFILIATED_HOTEL_CHAINS.filter(c => c.id === selectedChainId);

  return (
    <section id="affiliated-hotels-section" className="py-12 px-4 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/50 px-3.5 py-1 rounded-full text-amber-300 font-bold text-xs uppercase tracking-widest shadow-md">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Official Hotel Affiliations & Pure Veg Stays</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Our Affiliated Hotels & Resort Partners
          </h2>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            We hold direct local tie-ups with the finest hotel chains in Sikkim & Darjeeling. Book packages with guaranteed view rooms, pre-allocated inventory, and 100% pure vegetarian & strict Jain meal options at <strong>Jain Group of Hotels, Summit, Udaan, Mayfair, Yashshree, Sterling, and Rufina</strong>.
          </p>
        </div>

        {/* Brand Selector Ribbon / Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedChainId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
              selectedChainId === 'all'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg scale-105'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>All Partner Chains ({AFFILIATED_HOTEL_CHAINS.length})</span>
          </button>

          {AFFILIATED_HOTEL_CHAINS.map((chain) => (
            <button
              key={chain.id}
              onClick={() => setSelectedChainId(chain.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                selectedChainId === chain.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-amber-300'
              }`}
            >
              <span className="font-mono text-[10px] bg-slate-950/80 px-1.5 py-0.5 rounded text-amber-300">
                {chain.logoText}
              </span>
              <span>{chain.name}</span>
            </button>
          ))}
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChains.map((chain) => (
            <div
              key={chain.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header Image & Badge */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={chain.coverImage}
                    alt={chain.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider shadow-md">
                      {chain.badge}
                    </span>
                    <span className="bg-slate-950/90 text-amber-300 font-bold px-2.5 py-1 rounded-lg text-[10px] border border-amber-500/40">
                      {chain.starCategory}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-white drop-shadow-md">
                      {chain.name}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-amber-300/90 font-semibold italic">
                    "{chain.tagline}"
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {chain.description}
                  </p>

                  {/* Locations Covered */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Locations Covered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {chain.locations.map((loc, idx) => (
                        <span key={idx} className="bg-slate-950 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-900/60 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Perks */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Offbeat Guest Exclusive Benefits:
                    </span>
                    <div className="space-y-1">
                      {chain.keyPerks.map((perk, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Properties Sample */}
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider block">
                      Featured Partner Properties:
                    </span>
                    <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                      {chain.featuredProperties.slice(0, 3).map((prop, idx) => (
                        <li key={idx} className="truncate">{prop}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="p-5 pt-0 space-y-2">
                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Namaste OffbeatDestination! I am interested in booking a tour package staying at ${chain.name}. Please share quotes and room availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Inquire Packages with {chain.name.split(' ')[0]}</span>
                </a>

                {onOpenAIChatWithHotel && (
                  <button
                    onClick={() => onOpenAIChatWithHotel(chain.name)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold py-2 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ask AI About {chain.name.split(' ')[0]} Rates</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Guarantee Callout Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/60 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-emerald-500 text-slate-950 font-black px-2.5 py-0.5 rounded text-[10px] uppercase">
                Direct Hotel Chain Contract
              </span>
              <span className="text-emerald-300 font-extrabold text-xs">
                No Middlemen Commission
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              Why Book Your Stays via OffbeatDestination Travels?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Because we are registered with the Sikkim Tourism Department and maintain bulk advance inventory with Summit, Udaan, Mayfair, Yashshree, Sterling, and Rufina, our guests get <strong>lower package rates, guaranteed Kanchenjunga view rooms, and 100% pure veg meal customization</strong>.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Namaste! I want a customized tour package staying at Summit / Udaan / Mayfair affiliated hotels.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-xl flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get Custom Hotel Package Quote</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
