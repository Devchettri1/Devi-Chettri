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
    image: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg',
    popularSpots: ['MG Marg', 'Tsomgo Lake', 'Nathula Pass', 'Rumtek Monastery', 'Ganesh Tok'],
  },
  {
    id: 'north-sikkim',
    name: 'North Sikkim',
    tagline: 'Lachung, Yumthang & Zero Point (15,300 ft)',
    description: 'Rugged alpine frontier featuring mandatory 2-Night Lachung stays, Yumthang Valley of Flowers, snowbound Zero Point, and crystal Gurudongmar Lake (17,800 ft).',
    bestFor: 'Snow enthusiasts, Adventure lovers, Photographers & Nature seekers',
    suggestedDuration: '2 - 3 Nights (Mandatory 2N Lachung)',
    image: '/src/assets/images/yumthang_zero_point_1785680592273.jpg',
    popularSpots: ['Yumthang Valley', 'Zero Point (15,300ft)', 'Lachung Homestays', 'Gurudongmar Lake', 'Katao'],
  },
  {
    id: 'pelling',
    name: 'Pelling & West Sikkim',
    tagline: 'Glass Skywalk & Kanchenjunga Panoramas',
    description: 'Serene West Sikkim town boasting India’s first Glass Skywalk over Chenrezig Statue, historic Rabdentse Palace Ruins, and sacred Khecheopalri Lake.',
    bestFor: 'Mountain view seekers, Heritage buffs & Peaceful getaways',
    suggestedDuration: '2 Nights',
    image: '/src/assets/images/ravangla_buddha_park_1785680605794.jpg',
    popularSpots: ['Pelling Glass Skywalk', 'Rabdentse Ruins', 'Pemayangtse Monastery', 'Khecheopalri Lake'],
  },
  {
    id: 'silk-route',
    name: 'Old Silk Route (Zuluk)',
    tagline: '30+ Hairpin Bends & Historic Trade Trail',
    description: 'Ancient trade corridor through East Sikkim with dramatic 30+ hairpin twists at Thambi viewpoint, Gnathang Valley, and Kupup Elephant Lake.',
    bestFor: 'Offbeat travelers, Road trippers & Scenic photography',
    suggestedDuration: '2 Nights',
    image: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg',
    popularSpots: ['Zuluk Loops', 'Thambi Viewpoint', 'Gnathang Valley', 'Kupup Lake', 'Reshi Khola'],
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    tagline: 'Queen of the Hills & World-Famous Tea',
    description: 'Colonial charm, golden Kanchenjunga sunrise from Tiger Hill, heritage steam Toy Train loops at Batasia, and organic tea garden walks.',
    bestFor: 'Honeymooners, Tea lovers, Heritage enthusiasts & Families',
    suggestedDuration: '2 Nights',
    image: '/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg',
    popularSpots: ['Tiger Hill Sunrise', 'Batasia Loop Toy Train', 'Happy Valley Tea Estate', 'Chowrasta Mall'],
  },
  {
    id: 'bhutan',
    name: 'Bhutan Odyssey',
    tagline: 'Land of the Thunder Dragon',
    description: 'Tranquil Himalayan Kingdom featuring Paro Taktsang (Tiger’s Nest Monastery), Thimphu Buddha Dordenma, and Punakha Suspension Bridge.',
    bestFor: 'Cultural travelers, Spiritual journeys & Bucket-list explorers',
    suggestedDuration: '4 - 6 Nights',
    image: '/src/assets/images/bhutan_tigers_nest_1785681037397.jpg',
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
    <section className="py-20 bg-[#0B0F0E] relative overflow-hidden border-b border-[#D6B36A]/20">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="luxury-eyebrow">HIMALAYAN DESTINATIONS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F1E8]">
            Curated Himalayan Destinations
          </h2>
          <p className="text-[#A9AAA4] text-sm sm:text-base leading-relaxed">
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
                className="bg-[#111513] rounded-xl border border-[#D6B36A]/20 overflow-hidden shadow-xl hover:border-[#D6B36A]/50 transition-all duration-300 flex flex-col group hover:bg-[#151A17]"
              >
                {/* Image & Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-[#0B0F0E]/40 to-transparent" />

                  {/* Duration pill */}
                  <div className="absolute top-3 right-3 bg-[#0B0F0E]/85 backdrop-blur-md px-3 py-1 rounded border border-[#D6B36A]/30 text-[11px] font-semibold text-[#D6B36A] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D6B36A]" />
                    {dest.suggestedDuration}
                  </div>

                  {/* Destination Title & Tagline */}
                  <div className="absolute bottom-3 left-4 right-4 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#D6B36A] tracking-wider block">
                      Himalayan Circuit
                    </span>
                    <h3 className="text-xl font-bold text-[#F5F1E8] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#D6B36A]" />
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#A9AAA4] font-medium">{dest.tagline}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-xs">
                  <div className="space-y-3">
                    <p className="text-[#A9AAA4] leading-relaxed text-xs">
                      {dest.description}
                    </p>

                    {/* Best For */}
                    <div className="p-2.5 bg-[#0B0F0E] rounded-lg border border-[#D6B36A]/15 space-y-1">
                      <span className="text-[10px] font-bold text-[#D6B36A] uppercase tracking-wider block">
                        Best For:
                      </span>
                      <p className="text-[#F5F1E8] text-[11px] font-medium">{dest.bestFor}</p>
                    </div>

                    {/* Popular Spots Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {dest.popularSpots.map((spot, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#151A17] border border-white/10 text-[#A9AAA4] rounded text-[10px] font-medium"
                        >
                          {spot}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#D6B36A]/15 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenAIChat(`${dest.name} Tour Packages`)}
                      className="btn-luxury-outline text-xs !py-2 !px-3"
                    >
                      <span>Explore Route</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6B36A]" />
                    </button>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1 shadow-md"
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
