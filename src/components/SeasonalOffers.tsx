import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Tag, CheckCircle2, Copy, MessageCircle, Clock, Percent, ShieldCheck, Flame, CloudRain, Sun, Leaf, AlertCircle } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';
import { useWhatsApp } from '../utils/whatsAppContext';

export interface SeasonalOffer {
  id: string;
  title: string;
  category: 'July Offers' | 'August Offers' | 'September Offers' | 'Monsoon & Autumn Specials';
  seasonDates: string;
  badge: string;
  badgeBg: string;
  discountText: string;
  promoCode: string;
  validTill: string;
  description: string;
  highlights: string[];
  bannerImage: string;
  originalStartingPrice: number;
  discountedStartingPrice: number;
  urgencyText: string;
}

export const SEASONAL_OFFERS_DATA: SeasonalOffer[] = [
  {
    id: 'offer-july-monsoon',
    title: 'July Monsoon Waterfall & Lush Green Getaway',
    category: 'July Offers',
    seasonDates: 'July 1 - July 31, 2026',
    badge: '🌧️ July Monsoon Offer',
    badgeBg: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    discountText: 'FLAT 25% OFF + Free Room Upgrades',
    promoCode: 'JULYMONSOON25',
    validTill: 'Valid till July 31, 2026',
    description: 'Witness Seven Sisters & Ban Jhakri waterfalls in peak thunderous flow, misty tea gardens of Darjeeling, and quiet green mountain roads during the off-season discount month.',
    highlights: [
      'Free upgrade to Deluxe Mountain / Waterfall View hotel room',
      'Complimentary hot ginger tea & Sikkimese snacks during scenic halts',
      'Heavy 4WD Scorpio / Innova Crysta for safe wet mountain driving',
      '2 Nights mandatory Lachung stay package discount included'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    originalStartingPrice: 16500,
    discountedStartingPrice: 12375,
    urgencyText: 'Limited monsoon off-season discount — Book with ₹3,000 advance'
  },
  {
    id: 'offer-august-freedom',
    title: 'August Independence Day & Green Valley Special',
    category: 'August Offers',
    seasonDates: 'August 1 - August 31, 2026',
    badge: '🇮🇳 August Holiday Offer',
    badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    discountText: 'SAVE ₹4,000 / Couple + Free Meals Upgrade',
    promoCode: 'FREEDOMAUG4000',
    validTill: 'Valid till August 31, 2026',
    description: 'Celebrate the August long weekend across South Sikkim, Ravangla Buddha Park, and Pelling Glass Skywalk with pristine air and misty mountain vistas.',
    highlights: [
      'Complimentary upgrade to Full Board (AP Plan: Breakfast, Lunch & Dinner)',
      'Free entry ticket vouchers for Pelling Glass Skywalk & Ravangla Buddha Park',
      'Guaranteed 4WD Scorpio / Innova for high altitude safety (No small cabs)',
      'Zero permit coordination fee for Tsomgo Lake & Nathula Pass'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    originalStartingPrice: 18000,
    discountedStartingPrice: 14000,
    urgencyText: 'High long-weekend demand — Lock your vehicle in advance'
  },
  {
    id: 'offer-september-autumn',
    title: 'September Autumn Bloom & Early Festival Offer',
    category: 'September Offers',
    seasonDates: 'September 1 - September 30, 2026',
    badge: '🍁 September Autumn Deal',
    badgeBg: 'bg-amber-950 text-amber-300 border-amber-800',
    discountText: 'FLAT 15% OFF + Free 4WD Scorpio Upgrade',
    promoCode: 'AUTUMNSEP15',
    validTill: 'Valid till September 30, 2026',
    description: 'Experience clear autumn skies, opening panoramic views of Mt. Kanchenjunga, and fresh crisp weather across Gangtok, North Sikkim Lachung, and Darjeeling.',
    highlights: [
      'Free upgrade from standard cab to heavy 4WD Scorpio SUV',
      'Guaranteed Kanchenjunga view hotel room in Pelling & Darjeeling',
      'North Sikkim 2-Night mandatory Lachung stay with Yumthang Valley',
      'Complimentary Bagdogra (IXB) / NJP welcome pickup board'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    originalStartingPrice: 19500,
    discountedStartingPrice: 16575,
    urgencyText: 'Pre-festive Autumn season opening — Book before slots fill up'
  },
  {
    id: 'offer-monsoon-north-sikkim',
    title: 'July - Sept North Sikkim 2N Lachung Mandatory Special',
    category: 'Monsoon & Autumn Specials',
    seasonDates: 'July, August & September 2026',
    badge: '🏔️ North Sikkim 2N Lachung Rule',
    badgeBg: 'bg-teal-950 text-teal-300 border-teal-800',
    discountText: 'FLAT ₹3,000 OFF on 2N/3D North Sikkim Tour',
    promoCode: 'LACHUNG2N',
    validTill: 'Valid July, August & September 2026',
    description: 'As per Sikkim Tourism rules, 2 Nights stay at Lachung is mandatory for North Sikkim tours. Enjoy Yumthang Valley of Flowers, Zero Point, and Katao with full lodging and hot Sikkimese meals.',
    highlights: [
      'Mandatory 2 Nights stay in Lachung homestay/hotel included with all AP meals',
      'Yumthang Valley of Flowers, Zero Point (15,300 ft) & Katao Excursion',
      'Heavy 4WD SUV vehicle (Scorpio/Innova) with Restricted Area Permit (PAP)',
      'Free waterproof snow boot rental voucher at Zero Point'
    ],
    bannerImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
    originalStartingPrice: 17500,
    discountedStartingPrice: 14500,
    urgencyText: 'Strict 2N Lachung rule enforced — Army permit clearance included'
  }
];

interface SeasonalOffersProps {
  onOpenAIChatWithOffer?: (offerTitle: string) => void;
}

export const SeasonalOffers: React.FC<SeasonalOffersProps> = ({
  onOpenAIChatWithOffer
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { setPageContext } = useWhatsApp();

  const categories = ['All', 'July Offers', 'August Offers', 'September Offers', 'Monsoon & Autumn Specials'];

  const filteredOffers = SEASONAL_OFFERS_DATA.filter((offer) => {
    if (selectedCategory === 'All') return true;
    return offer.category === selectedCategory;
  });

  const handleCopyCode = (code: string, offer?: SeasonalOffer) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    if (offer) {
      setPageContext({
        type: 'offer',
        title: offer.title,
        subtitle: `${offer.discountText} (Promo: ${offer.promoCode})`,
        price: offer.discountedStartingPrice,
        duration: offer.seasonDates,
      });
    }
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleClaimOfferWhatsApp = (offer: SeasonalOffer) => {
    setPageContext({
      type: 'offer',
      title: offer.title,
      subtitle: `${offer.discountText} (Promo: ${offer.promoCode})`,
      price: offer.discountedStartingPrice,
      duration: offer.seasonDates,
    });
    const text = `Namaste OffbeatDestination Travels! 🙏%0A%0A*Claiming July-Sept Seasonal Offer*%0A🏷️ *Offer:* ${encodeURIComponent(offer.title)}%0A🎟️ *Promo Code:* ${offer.promoCode}%0A💰 *Discount:* ${encodeURIComponent(offer.discountText)}%0A🗓️ *Target Month:* ${encodeURIComponent(offer.seasonDates)}%0A%0APlease share available dates and discounted itinerary quote!`;
    const url = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <section id="seasonal-offers-section" className="py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-y border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 px-3.5 py-1 rounded-full border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>Monsoon & Autumn Travel Savings (July • August • September)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            July, August & September Seasonal Offers
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Exclusive monsoon, Independence Day long-weekend, and early Autumn discounts for July, August & September 2026 with OffbeatDestination Travels Gangtok.
          </p>

          {/* Important Regulatory Rules Alert Banner */}
          <div className="bg-amber-950/60 border border-amber-500/60 p-3 rounded-xl text-left text-xs text-amber-200 space-y-1 my-3 shadow-md">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Mandatory Sikkim Travel Rules for July - September:</span>
            </div>
            <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 pl-1">
              <li><strong>North Sikkim 2-Night Stay Mandatory:</strong> As per Sikkim Tourism rules, 2 Nights stay at Lachung is mandatory for North Sikkim tours.</li>
              <li><strong>No Small Cabs Allowed:</strong> Hatchbacks & Sedans (Dzire, Etios) are strictly NOT permitted for North Sikkim & Nathula Pass army permits (Only 4WD SUV / Heavy Cabs allowed).</li>
            </ul>
          </div>

          {/* Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-950/40 font-black'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat === 'All' ? '🔥 All July-Sept Offers' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOffers.map((offer) => (
              <motion.div
                key={offer.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-amber-950/20 transition-all flex flex-col justify-between"
              >
                {/* Banner & Header */}
                <div>
                  <div className="relative h-48 sm:h-52 overflow-hidden group">
                    <img
                      src={offer.bannerImage}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full border shadow-md flex items-center gap-1.5 ${offer.badgeBg}`}>
                        <span>{offer.badge}</span>
                      </span>

                      <span className="bg-slate-950/90 text-amber-400 border border-amber-500/60 text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{offer.seasonDates}</span>
                      </span>
                    </div>

                    {/* Discount Headline Banner */}
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 border border-emerald-500/60 p-2.5 rounded-xl backdrop-blur-md flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Percent className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <div>
                          <span className="text-xs font-black text-emerald-300 block">
                            {offer.discountText}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            {offer.validTill}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 line-through block">
                          ₹{(offer.originalStartingPrice || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-base font-black text-amber-400 block">
                          ₹{(offer.discountedStartingPrice || 0).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    {/* Promo Code Copy Bar */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-amber-400" />
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Promo Code</span>
                          <span className="text-xs font-black text-amber-300 font-mono">{offer.promoCode}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyCode(offer.promoCode)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          copiedCode === offer.promoCode
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {copiedCode === offer.promoCode ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            <span>COPIED!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-300" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Offer Inclusions & Perks:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                        {offer.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-[11px]">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  <div className="p-2 bg-amber-950/40 border border-amber-800/60 rounded-lg text-center text-[10px] font-bold text-amber-300 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span>{offer.urgencyText}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenAIChatWithOffer && onOpenAIChatWithOffer(offer.title)}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors border border-slate-700 flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      <span>Ask AI Quote</span>
                    </button>

                    <button
                      onClick={() => handleClaimOfferWhatsApp(offer)}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                      <span>Claim Deal</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
