import React, { useState, useEffect } from 'react';
import { ShieldCheck, Compass, Sparkles, ArrowRight, CheckCircle2, MessageCircle, Car, CloudSun, MapPin, Users, User, UserCheck, Users2, ChevronDown, Check, Info } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';
import { GroupSizeOption, GroupSizeConfig, GROUP_SIZE_CONFIGS } from '../utils/groupPricing';
import { sikkimHeroBanner } from '../assets/images';
import { OptimizedImage } from './ui/OptimizedImage';

interface HeroProps {
  onOpenAIChat: () => void;
  onOpenAIPlanner: () => void;
  onSelectTab: (tab: string) => void;
  selectedGroupSize?: GroupSizeOption;
  onSelectGroupSize?: (size: GroupSizeOption) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAIChat,
  onOpenAIPlanner,
  onSelectTab,
  selectedGroupSize = 'couple',
  onSelectGroupSize,
}) => {
  const [currentGroupSize, setCurrentGroupSize] = useState<GroupSizeOption>(selectedGroupSize);
  const [quickCalcRoute, setQuickCalcRoute] = useState('5N/6D Sikkim & Darjeeling');
  const [quickCalcVehicle, setQuickCalcVehicle] = useState('Toyota Innova Crysta');
  const [quickCalcDays, setQuickCalcDays] = useState('6');
  const [quickCalcGuests, setQuickCalcGuests] = useState('2');
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);

  // Sync internal group size if prop changes
  useEffect(() => {
    if (selectedGroupSize) {
      setCurrentGroupSize(selectedGroupSize);
    }
  }, [selectedGroupSize]);

  // Handle group size selection
  const handleGroupChange = (size: GroupSizeOption) => {
    setCurrentGroupSize(size);
    if (onSelectGroupSize) {
      onSelectGroupSize(size);
    }

    // Update the cost estimator travelers input accordingly (Min 2 pax enforced)
    const cfg = GROUP_SIZE_CONFIGS[size];
    const targetGuests = cfg.paxCount.toString();
    setQuickCalcGuests(targetGuests);

    // Auto-select sensible vehicle for group
    if (size === 'family' || size === 'large_group') {
      setQuickCalcVehicle('Toyota Innova Crysta');
    }

    // Recalculate if already estimated
    let perDayVehicle = 4500;
    if (quickCalcVehicle === 'Mahindra Xylo') perDayVehicle = 4000;
    if (quickCalcVehicle === 'Swift Dzire') perDayVehicle = 3200;

    const days = Number(quickCalcDays) || 6;
    const guests = Number(targetGuests) || 2;
    const totalEst = (perDayVehicle * days) + (days * guests * 2200) + 1500;
    setCalculatedCost(Math.round(totalEst / guests));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let perDayVehicle = 4500;
    if (quickCalcVehicle === 'Mahindra Xylo') perDayVehicle = 4000;
    if (quickCalcVehicle === 'Swift Dzire') perDayVehicle = 3200;

    const days = Number(quickCalcDays) || 6;
    const guests = Math.max(2, Number(quickCalcGuests) || 2); // Minimum 2 pax enforced
    const totalEst = (perDayVehicle * days) + (days * guests * 2200) + 1500;
    setCalculatedCost(Math.round(totalEst / guests));
  };

  const scrollToPackages = () => {
    const packagesEl = document.getElementById('packages-section');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onSelectTab('packages');
    }
  };

  const activeConfig = GROUP_SIZE_CONFIGS[currentGroupSize] || GROUP_SIZE_CONFIGS.couple;

  const whatsappLink = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    `Namaste! I want to consult your Gangtok team regarding a customized Sikkim itinerary for a ${activeConfig.label} (${activeConfig.paxLabel}).`
  )}`;

  return (
    <section className="bg-[#060B18] text-[#F8FAFC] border-b border-slate-800/80 py-8 lg:py-14 relative overflow-hidden">
      {/* Subtle Cyan Radiant Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Signature Typography, Group Selector & Modern UI Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Headline */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[11px] text-cyan-300 font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Live Dynamic Pricing by Group Size</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                <span>A Better Way</span>
                <span className="block italic font-light bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  to Explore.
                </span>
              </h1>
              
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-normal pt-0.5">
                Curated luxury journeys across Sikkim, Bhutan, and the Silk Route with instant group rate optimization.
              </p>
            </div>

            {/* Interactive Group Size Selector Widget */}
            <div className="bg-[#0A1128]/95 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span>Select Your Group Size</span>
                      <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30 font-semibold">
                        Min 2 Pax Base
                      </span>
                    </h3>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Updates package rates below in real-time
                </span>
              </div>

              {/* Group Size 4-Button Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. Solo */}
                <button
                  type="button"
                  onClick={() => handleGroupChange('solo')}
                  className={`p-3 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                    currentGroupSize === 'solo'
                      ? 'bg-gradient-to-b from-cyan-950/80 to-[#0A1128] border-cyan-400 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                      : 'bg-[#060B18] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#0E1738]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <User className={`w-4 h-4 ${currentGroupSize === 'solo' ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Min 2pax
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Solo Traveler</span>
                    <span className="text-[10px] text-slate-400 block">Min 2pax Base</span>
                  </div>
                </button>

                {/* 2. Couple */}
                <button
                  type="button"
                  onClick={() => handleGroupChange('couple')}
                  className={`p-3 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                    currentGroupSize === 'couple'
                      ? 'bg-gradient-to-b from-cyan-950/80 to-[#0A1128] border-cyan-400 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                      : 'bg-[#060B18] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#0E1738]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Users className={`w-4 h-4 ${currentGroupSize === 'couple' ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Standard
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Couple / Duo</span>
                    <span className="text-[10px] text-slate-400 block">2 Adults (Base)</span>
                  </div>
                </button>

                {/* 3. Family */}
                <button
                  type="button"
                  onClick={() => handleGroupChange('family')}
                  className={`p-3 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                    currentGroupSize === 'family'
                      ? 'bg-gradient-to-b from-cyan-950/80 to-[#0A1128] border-cyan-400 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                      : 'bg-[#060B18] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#0E1738]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <UserCheck className={`w-4 h-4 ${currentGroupSize === 'family' ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Save 14%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Small Family</span>
                    <span className="text-[10px] text-slate-400 block">3–4 Travelers</span>
                  </div>
                </button>

                {/* 4. Large Group */}
                <button
                  type="button"
                  onClick={() => handleGroupChange('large_group')}
                  className={`p-3 rounded-xl text-left border transition-all relative flex flex-col justify-between ${
                    currentGroupSize === 'large_group'
                      ? 'bg-gradient-to-b from-cyan-950/80 to-[#0A1128] border-cyan-400 text-white shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                      : 'bg-[#060B18] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#0E1738]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <Users2 className={`w-4 h-4 ${currentGroupSize === 'large_group' ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                      Save 24%
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">Large Group</span>
                    <span className="text-[10px] text-slate-400 block">5–8+ Travelers</span>
                  </div>
                </button>
              </div>

              {/* Dynamic Group Description & Min Pax Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="text-[11px]">
                    <strong className="text-white">{activeConfig.label}:</strong> {activeConfig.description}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={scrollToPackages}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] whitespace-nowrap self-end sm:self-auto group"
                >
                  <span>View Updated Packages</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Featured Tour Card (The Silk Route Odyssey) */}
            <div 
              onClick={() => {
                onSelectTab('packages');
                onOpenAIChat();
              }}
              className="group cursor-pointer relative rounded-2xl overflow-hidden border border-slate-800/90 bg-[#0A1128] hover:border-cyan-500/50 shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
                <OptimizedImage
                  src={sikkimHeroBanner}
                  alt="The Silk Route Odyssey"
                  priority
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/60 to-transparent" />
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-200 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/80">
                    FEATURED ROUTE
                  </span>
                </div>

                {/* Tour Info with Live Group Estimate */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      The Silk Route Odyssey
                    </h2>
                    <p className="text-cyan-400 text-xs sm:text-sm font-semibold flex items-center gap-1.5 pt-0.5">
                      <span>Gangtok & Zuluk</span>
                      <span className="text-slate-500">•</span>
                      <span>7 Days</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-bold">{activeConfig.badge || activeConfig.paxLabel}</span>
                    </p>
                  </div>

                  <div className="text-right bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 hidden sm:block">
                    <span className="text-[10px] text-slate-400 block">{activeConfig.shortLabel} Est.</span>
                    <span className="text-sm font-bold text-cyan-300">
                      ₹{Math.round(24500 * activeConfig.priceMultiplier).toLocaleString('en-IN')}<span className="text-[10px] text-slate-400 font-normal">/pax</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Grid Cards: Weather & AI Planner */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              
              {/* Left Card: WEATHER */}
              <div 
                onClick={() => {
                  const weatherEl = document.getElementById('sikkim-weather-widget');
                  if (weatherEl) weatherEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#0A1128]/95 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold text-cyan-400 tracking-[0.2em] uppercase">
                      WEATHER
                    </span>
                    <CloudSun className="w-4 h-4 text-cyan-400/70 group-hover:text-cyan-300" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mt-2">
                    14°c
                  </div>
                </div>
                <div className="text-slate-400 text-xs sm:text-sm mt-1">
                  Sunny, Gangtok
                </div>
              </div>

              {/* Right Card: AI PLANNER */}
              <div 
                onClick={onOpenAIPlanner}
                className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-400 text-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl shadow-cyan-950/40 hover:shadow-cyan-500/20 hover:scale-[1.02] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold text-cyan-100/90 tracking-[0.2em] uppercase">
                      AI PLANNER
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                  </div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight mt-2 max-w-[140px]">
                    Build Your Dream Trip
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Army Permit Clearances</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Toyota Innova Crysta Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Pure Veg & Jain Meals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Direct Gangtok Local Team</span>
              </div>
            </div>

          </div>

          {/* Right Column: Trip Cost Estimator & Direct WhatsApp Quote */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Govt Registration Trust Badge */}
            <div className="flex items-center justify-between bg-[#0A1128] border border-cyan-500/30 rounded-xl px-4 py-2.5 text-xs text-slate-200 shadow-md">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-cyan-300">Govt. Registered Agency</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Gangtok, Sikkim</span>
            </div>

            {/* Compact Trip Cost Estimator with Min 2 Pax Validation */}
            <div className="bg-[#0A1128]/95 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Car className="w-4 h-4 text-cyan-400" />
                  <span>Trip Cost Estimator</span>
                </h3>
                <span className="text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Official Rates
                </span>
              </div>

              <form onSubmit={handleCalculate} className="grid grid-cols-2 gap-3 text-xs">
                <div className="col-span-2">
                  <label className="block text-slate-300 text-[11px] mb-1">Route / Circuit</label>
                  <select
                    value={quickCalcRoute}
                    onChange={(e) => setQuickCalcRoute(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700/80 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="5N/6D Sikkim & Darjeeling">5N/6D Sikkim & Darjeeling</option>
                    <option value="North Sikkim Zero Point">North Sikkim (Lachung & Zero Point)</option>
                    <option value="The Silk Route Odyssey">The Silk Route Odyssey (7 Days)</option>
                    <option value="Pelling & West Sikkim">Pelling Glass Skywalk & West Sikkim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-[11px] mb-1">Vehicle</label>
                  <select
                    value={quickCalcVehicle}
                    onChange={(e) => setQuickCalcVehicle(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700/80 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Toyota Innova Crysta">Innova Crysta</option>
                    <option value="Mahindra Xylo">Mahindra Xylo / Scorpio</option>
                    <option value="Swift Dzire">Swift Dzire / Sedan</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-slate-300 text-[11px]">Travelers</label>
                    <span className="text-[9px] text-cyan-400 font-semibold">Min 2 Pax</span>
                  </div>
                  <input
                    type="number"
                    min="2"
                    max="20"
                    value={quickCalcGuests}
                    onChange={(e) => setQuickCalcGuests(e.target.value)}
                    className="w-full bg-[#060B18] border border-slate-700/80 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="col-span-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-2.5 btn-luxury-cyan text-xs font-bold rounded-xl"
                  >
                    Calculate Estimated Rate
                  </button>
                </div>
              </form>

              {calculatedCost !== null && (
                <div className="pt-3 text-center border-t border-slate-800 bg-[#060B18]/60 p-3 rounded-xl space-y-1">
                  <p className="text-[11px] text-slate-400">Estimated Rate for {activeConfig.label} ({quickCalcGuests} Pax):</p>
                  <p className="text-2xl font-black text-cyan-400">
                    ₹{(calculatedCost || 0).toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal"> / person</span>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Total Estimated Group Cost: <strong className="text-white">₹{((calculatedCost || 0) * Number(quickCalcGuests || 2)).toLocaleString('en-IN')}</strong>
                  </p>
                  <button
                    onClick={onOpenAIChat}
                    className="text-[11px] text-cyan-300 hover:text-cyan-200 underline mt-1 font-medium inline-block"
                  >
                    Customize with AI Assistant →
                  </button>
                </div>
              )}
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Quote</span>
              </a>

              <button
                onClick={scrollToPackages}
                className="flex-1 btn-luxury-outline text-xs !py-3"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Explore Packages</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};


