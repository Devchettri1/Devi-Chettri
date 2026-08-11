import React, { useState } from 'react';
import { ShieldCheck, Compass, Sparkles, ArrowRight, CheckCircle2, MessageCircle, Car } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface HeroProps {
  onOpenAIChat: () => void;
  onOpenAIPlanner: () => void;
  onSelectTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAIChat, onOpenAIPlanner, onSelectTab }) => {
  const [quickCalcRoute, setQuickCalcRoute] = useState('5N/6D Sikkim & Darjeeling');
  const [quickCalcVehicle, setQuickCalcVehicle] = useState('Toyota Innova Crysta');
  const [quickCalcDays, setQuickCalcDays] = useState('6');
  const [quickCalcGuests, setQuickCalcGuests] = useState('4');
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let perDayVehicle = 4500;
    if (quickCalcVehicle === 'Mahindra Xylo') perDayVehicle = 4000;
    if (quickCalcVehicle === 'Swift Dzire') perDayVehicle = 3200;

    const days = Number(quickCalcDays) || 5;
    const guests = Number(quickCalcGuests) || 2;
    const totalEst = (perDayVehicle * days) + (days * guests * 2200) + 1500;
    setCalculatedCost(Math.round(totalEst / guests));
  };

  const whatsappLink = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    'Namaste! I want to consult your Gangtok team regarding a customized Sikkim itinerary.'
  )}`;

  return (
    <section className="bg-[#0B1F3A] text-[#FAF9F6] border-b border-[#E6E2D9]/15 py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headlines */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="editorial-eyebrow">SIKKIM • DARJEELING • BHUTAN</span>
              <div className="inline-flex items-center gap-2 text-xs text-[#D9BC7A] font-semibold bg-[#153451] px-3 py-1 rounded border border-[#C6A15B]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Govt. Registered Agency • Gangtok, Sikkim</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.12] text-[#FAF9F6] tracking-tight">
              Private Journeys Through The Himalayas
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Thoughtfully planned journeys across Sikkim, Darjeeling and Bhutan, operated by our local team based in Gangtok. Complete permit clearance, luxury Innova Crysta cabs, and boutique hotels.
            </p>

            {/* Practical Travel Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
                <span>North Sikkim & Nathula Army Permits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
                <span>NJP Railway & Bagdogra Private Pickups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
                <span>100% Pure Veg & Jain Meal Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
                <span>Local Drivers & Mountain Support</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onOpenAIPlanner}
                className="btn-luxury-gold"
              >
                <Sparkles className="w-4 h-4 text-[#071A2D]" />
                <span>Plan Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectTab('packages')}
                className="btn-luxury-outline-light"
              >
                <Compass className="w-4 h-4 text-[#D9BC7A]" />
                <span>View Packages</span>
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold rounded text-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Quality Photography & Clean Estimator */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Featured Photograph */}
            <div className="relative rounded overflow-hidden border border-[#E6E2D9]/20 shadow-xl aspect-[4/3]">
              <img
                src="/src/assets/images/sikkim_hero_banner_1785680563996.jpg"
                alt="Sikkim Himalaya Mountains and Tsomgo Lake"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#071A2D] via-[#071A2D]/60 to-transparent p-4 text-xs">
                <p className="font-semibold text-[#FAF9F6]">Tsomgo Lake & Snow Passes, Gangtok</p>
                <p className="text-slate-300 text-[11px]">Daily departure tours managed directly from Gangtok office</p>
              </div>
            </div>

            {/* Compact Practical Estimator */}
            <div className="bg-[#153451] border border-[#C6A15B]/30 rounded p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="font-serif text-sm font-bold text-[#FAF9F6] flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#C6A15B]" />
                  <span>Trip Cost Estimator</span>
                </h3>
                <span className="text-[10px] text-[#D9BC7A] font-semibold">Official Agency Rates</span>
              </div>

              <form onSubmit={handleCalculate} className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="col-span-2">
                  <label className="block text-slate-300 text-[11px] mb-1">Route / Circuit</label>
                  <select
                    value={quickCalcRoute}
                    onChange={(e) => setQuickCalcRoute(e.target.value)}
                    className="w-full bg-[#071A2D] border border-white/20 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-[#C6A15B]"
                  >
                    <option value="5N/6D Sikkim & Darjeeling">5N/6D Sikkim & Darjeeling</option>
                    <option value="North Sikkim Zero Point">North Sikkim (Lachung & Zero Point)</option>
                    <option value="Pelling & West Sikkim">Pelling Glass Skywalk & West Sikkim</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-[11px] mb-1">Vehicle</label>
                  <select
                    value={quickCalcVehicle}
                    onChange={(e) => setQuickCalcVehicle(e.target.value)}
                    className="w-full bg-[#071A2D] border border-white/20 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-[#C6A15B]"
                  >
                    <option value="Toyota Innova Crysta">Innova Crysta</option>
                    <option value="Mahindra Xylo">Mahindra Xylo / Scorpio</option>
                    <option value="Swift Dzire">Swift Dzire / Sedan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 text-[11px] mb-1">Travelers</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={quickCalcGuests}
                    onChange={(e) => setQuickCalcGuests(e.target.value)}
                    className="w-full bg-[#071A2D] border border-white/20 rounded px-2.5 py-1.5 text-white focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>

                <div className="col-span-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#C6A15B] hover:bg-[#D9BC7A] text-[#071A2D] font-bold rounded text-xs transition-colors"
                  >
                    Calculate Estimated Rate
                  </button>
                </div>
              </form>

              {calculatedCost !== null && (
                <div className="pt-2 text-center border-t border-white/10">
                  <p className="text-[11px] text-slate-300">Estimated Total Rate Per Person:</p>
                  <p className="text-xl font-bold text-[#D9BC7A] font-serif">₹{(calculatedCost || 0).toLocaleString('en-IN')}</p>
                  <button
                    onClick={onOpenAIChat}
                    className="text-[11px] text-[#C6A15B] hover:underline mt-1 font-medium inline-block"
                  >
                    Customize with AI Travel Assistant →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
