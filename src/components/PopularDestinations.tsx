import React from 'react';
import { MapPin, Clock, Compass, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

export interface DestinationCardData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  suggestedDuration: string;
  image: string;
  popularSpots: string[];
}

export const DESTINATIONS_DATA: DestinationCardData[] = [
  {
    id: 'gangtok',
    name: 'Gangtok',
    tagline: 'Capital of Sikkim & Cultural Hub',
    description: 'Vibrant hill town famous for MG Marg boulevard, Gangtok Ropeway, Rumtek Monastery, Ban Jhakri waterfalls, and high-altitude Tsomgo Lake gateway.',
    bestFor: 'First-time visitors, Families, Couples & Culture seekers',
    suggestedDuration: '2 - 3 Nights',
    image: '/images/sikkim_hero_banner_1785680563996.jpg',
    popularSpots: ['MG Marg', 'Tsomgo Lake', 'Nathula Pass', 'Rumtek Monastery', 'Ganesh Tok'],
  },
  {
    id: 'north-sikkim',
    name: 'North Sikkim',
    tagline: 'Lachung, Yumthang & Zero Point (15,300 ft)',
    description: 'Rugged alpine frontier featuring mandatory 2-Night Lachung stays, Yumthang Valley of Flowers, snowbound Zero Point, and crystal Gurudongmar Lake (17,800 ft).',
    bestFor: 'Snow enthusiasts, Adventure lovers, Photographers & Nature seekers',
    suggestedDuration: '2 - 3 Nights (Mandatory 2N Lachung)',
    image: '/images/yumthang_zero_point_1785680592273.jpg',
    popularSpots: ['Yumthang Valley', 'Zero Point (15,300ft)', 'Lachung Homestays', 'Gurudongmar Lake', 'Katao'],
  },
  {
    id: 'pelling',
    name: 'Pelling & West Sikkim',
    tagline: 'Glass Skywalk & Kanchenjunga Panoramas',
    description: 'Serene West Sikkim town boasting India’s first Glass Skywalk over Chenrezig Statue, historic Rabdentse Palace Ruins, and sacred Khecheopalri Lake.',
    bestFor: 'Mountain view seekers, Heritage buffs & Peaceful getaways',
    suggestedDuration: '2 Nights',
    image: '/images/ravangla_buddha_park_1785680605794.jpg',
    popularSpots: ['Pelling Glass Skywalk', 'Rabdentse Ruins', 'Pemayangtse Monastery', 'Khecheopalri Lake'],
  },
  {
    id: 'silk-route',
    name: 'Old Silk Route (Zuluk)',
    tagline: '30+ Hairpin Bends & Historic Trade Trail',
    description: 'Ancient trade corridor through East Sikkim with dramatic 30+ hairpin twists at Thambi viewpoint, Gnathang Valley, and Kupup Elephant Lake.',
    bestFor: 'Offbeat travelers, Road trippers & Scenic photography',
    suggestedDuration: '2 Nights',
    image: '/images/sikkim_hero_banner_1785680563996.jpg',
    popularSpots: ['Zuluk Loops', 'Thambi Viewpoint', 'Gnathang Valley', 'Kupup Lake', 'Reshi Khola'],
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    tagline: 'Queen of the Hills & World-Famous Tea',
    description: 'Colonial charm, golden Kanchenjunga sunrise from Tiger Hill, heritage steam Toy Train loops at Batasia, and organic tea garden walks.',
    bestFor: 'Honeymooners, Tea lovers, Heritage enthusiasts & Families',
    suggestedDuration: '2 Nights',
    image: '/images/darjeeling_tea_gardens_1785681013467.jpg',
    popularSpots: ['Tiger Hill Sunrise', 'Batasia Loop Toy Train', 'Happy Valley Tea Estate', 'Chowrasta Mall'],
  },
  {
    id: 'bhutan',
    name: 'Bhutan Odyssey',
    tagline: 'Land of the Thunder Dragon',
    description: 'Tranquil Himalayan Kingdom featuring Paro Taktsang (Tiger’s Nest Monastery), Thimphu Buddha Dordenma, and Punakha Suspension Bridge.',
    bestFor: 'Cultural travelers, Spiritual journeys & Bucket-list explorers',
    suggestedDuration: '4 - 6 Nights',
    image: '/images/bhutan_tigers_nest_1785681037397.jpg',
    popularSpots: ["Tiger's Nest Monastery", 'Thimphu Dzong', 'Punakha Suspension Bridge', 'Dochula Pass'],
  },
];

interface PopularDestinationsProps {
  onSelectDestination: (destName: string) => void;
  onOpenAIChat: (context: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  onSelectDestination,
  onOpenAIChat,
}) => {
  return (
    <section className="py-20 bg-[#060B18] relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="luxury-eyebrow">HIMALAYAN DESTINATIONS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Curated Himalayan Destinations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Explore handcrafted circuits across Sikkim, Darjeeling, and Bhutan. Local expertise, express army permits, and private Toyota Innova Crystas included.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {DESTINATIONS_DATA.map((dest) => {
            const whatsappMsg = `Hello OffbeatDestination Travels! I want to inquire about custom tour packages for ${dest.name} (${dest.suggestedDuration}). Please send me itinerary details and pricing.`;
            const whatsappLink = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

            return (
              <div
                key={dest.id}
                className="bg-[#0A1128] rounded-2xl border border-slate-800/90 overflow-hidden shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image & Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="224"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/50 to-transparent" />

                  {/* Duration pill */}
                  <div className="absolute top-3 right-3 bg-[#060B18]/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-500/30 text-[11px] font-semibold text-cyan-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {dest.suggestedDuration}
                  </div>

                  {/* Destination Title & Tagline */}
                  <div className="absolute bottom-3 left-4 right-4 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
                      Himalayan Circuit
                    </span>
                    <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {dest.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">{dest.tagline}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-xs">
                  <div className="space-y-3">
                    <p className="text-slate-300 leading-relaxed text-xs">
                      {dest.description}
                    </p>

                    {/* Best For */}
                    <div className="p-2.5 bg-[#060B18] rounded-xl border border-cyan-500/20 space-y-1">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                        Best For:
                      </span>
                      <p className="text-slate-200 text-[11px] font-medium">{dest.bestFor}</p>
                    </div>

                    {/* Popular Spots Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dest.popularSpots.map((spot, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-[#060B18] border border-slate-700/80 text-slate-300 rounded-lg text-[10px] font-medium"
                        >
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenAIChat(`${dest.name} Tour Packages`)}
                      className="btn-luxury-outline text-xs !py-2 !px-3"
                    >
                      <span>Explore Route</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                    </button>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>WhatsApp Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
