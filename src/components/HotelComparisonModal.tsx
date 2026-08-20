import React, { useState, useMemo } from 'react';
import { 
  X, 
  ArrowLeftRight, 
  Check, 
  XCircle, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Building2, 
  Bed, 
  Utensils, 
  Flame, 
  Wifi, 
  Droplets, 
  Maximize2, 
  MessageCircle, 
  ChevronDown, 
  ExternalLink,
  Award,
  Crown,
  Coffee,
  Car,
  Compass,
  SlidersHorizontal,
  CheckCircle2,
  HeartHandshake,
  Layers,
  Leaf
} from 'lucide-react';
import { 
  AFFILIATED_HOTEL_CHAINS, 
  FEATURED_STANDALONE_HOTELS, 
  HotelChainPartner, 
  FeaturedStandaloneHotel, 
  AGENCY_DETAILS 
} from '../data/travelData';
import { OptimizedImage } from './ui/OptimizedImage';

export type AnyHotelItem = (HotelChainPartner | FeaturedStandaloneHotel) & {
  isStandalone?: boolean;
};

// Combine all hotels into a unified searchable comparison list
export const ALL_COMPATIBLE_HOTELS: AnyHotelItem[] = [
  ...AFFILIATED_HOTEL_CHAINS.map(h => ({ ...h, isStandalone: false })),
  ...FEATURED_STANDALONE_HOTELS.map(h => ({ ...h, isStandalone: true }))
];

interface HotelComparisonModalProps {
  initialHotelA?: AnyHotelItem | null;
  initialHotelB?: AnyHotelItem | null;
  onClose: () => void;
  onSelectHotelDetails?: (hotel: AnyHotelItem) => void;
  onOpenAIChatWithHotel?: (hotelName: string) => void;
}

export const HotelComparisonModal: React.FC<HotelComparisonModalProps> = ({
  initialHotelA,
  initialHotelB,
  onClose,
  onSelectHotelDetails,
  onOpenAIChatWithHotel
}) => {
  // Hotel A & Hotel B selection state
  const [hotelAId, setHotelAId] = useState<string>(() => {
    if (initialHotelA) return initialHotelA.id;
    return ALL_COMPATIBLE_HOTELS[0]?.id || 'partner-rufina';
  });

  const [hotelBId, setHotelBId] = useState<string>(() => {
    if (initialHotelB && initialHotelB.id !== (initialHotelA?.id || ALL_COMPATIBLE_HOTELS[0]?.id)) {
      return initialHotelB.id;
    }
    // Pick an intelligent default rival
    if (initialHotelA?.id === 'partner-mayfair') return 'partner-elgin';
    if (initialHotelA?.id === 'partner-jain-group') return 'partner-crestora';
    if (initialHotelA?.id === 'hotel-lachung-country-house') return 'partner-trickocity';
    if (initialHotelA?.id === 'hotel-sila-norphel-pelling') return 'partner-summit';
    
    // Fallback to second hotel
    const defaultRival = ALL_COMPATIBLE_HOTELS.find(h => h.id !== (initialHotelA?.id || ALL_COMPATIBLE_HOTELS[0]?.id));
    return defaultRival?.id || 'partner-crestora';
  });

  // Filter for selecting rivals
  const [rivalFilterCategory, setRivalFilterCategory] = useState<'all' | 'same-destination' | 'luxury' | 'budget' | 'jain'>('all');

  const hotelA = useMemo(() => {
    return ALL_COMPATIBLE_HOTELS.find(h => h.id === hotelAId) || ALL_COMPATIBLE_HOTELS[0];
  }, [hotelAId]);

  const hotelB = useMemo(() => {
    return ALL_COMPATIBLE_HOTELS.find(h => h.id === hotelBId) || ALL_COMPATIBLE_HOTELS[1];
  }, [hotelBId]);

  // Swap Hotel A and Hotel B
  const handleSwapHotels = () => {
    const temp = hotelAId;
    setHotelAId(hotelBId);
    setHotelBId(temp);
  };

  // Helper to extract clean destination name
  const getDestinationDisplay = (hotel: AnyHotelItem) => {
    if ('destination' in hotel && hotel.destination) {
      return hotel.destination;
    }
    if ('locations' in hotel && hotel.locations && hotel.locations.length > 0) {
      return hotel.locations.join(' · ');
    }
    return 'Sikkim & Darjeeling';
  };

  // Helper to check if a hotel has a specific amenity
  const checkAmenityPresent = (hotel: AnyHotelItem, queryKeywords: string[]): boolean => {
    const combinedText = [
      hotel.description,
      hotel.tagline,
      ...(hotel.roomAmenities || []),
      ...(hotel.keyPerks || []),
      'featuredProperties' in hotel ? (hotel.featuredProperties || []).join(' ') : ''
    ].join(' ').toLowerCase();

    return queryKeywords.some(kw => combinedText.includes(kw.toLowerCase()));
  };

  // Curated list of critical Himalayan stay amenities to compare
  const AMENITY_COMPARISON_LIST = [
    {
      id: 'hot-water',
      label: '24/7 Hot Water Geyser',
      category: 'Comfort & Essentials',
      keywords: ['hot water', 'geyser', 'running hot'],
      icon: Droplets,
      importance: 'Essential for Himalayan high altitude mornings'
    },
    {
      id: 'heating',
      label: 'Room Heating / Radiator / Electric Blankets',
      category: 'Comfort & Essentials',
      keywords: ['heating', 'heater', 'radiator', 'blower', 'warm blanket', 'electric blanket', 'climate control'],
      icon: Flame,
      importance: 'Prevents winter sub-zero chills'
    },
    {
      id: 'kanchenjunga-view',
      label: 'Kanchenjunga / Valley View Balcony',
      category: 'Views & Scenery',
      keywords: ['kanchenjunga', 'mountain view', 'valley view', 'balcony', 'snow peak', 'panoramic view'],
      icon: Sparkles,
      importance: 'Golden sunrise right from private room'
    },
    {
      id: 'jain-pureveg',
      label: '100% Pure Veg & Jain Kitchen (No Onion/Garlic)',
      category: 'Dining & Kitchen',
      keywords: ['jain', 'pure veg', 'vegetarian', 'swaminarayan'],
      icon: Leaf,
      importance: 'Dedicated utensils and Jain chef protocols'
    },
    {
      id: 'wifi',
      label: 'High-Speed Wi-Fi & Smart TV',
      category: 'Connectivity',
      keywords: ['wi-fi', 'wifi', 'internet', 'smart tv'],
      icon: Wifi,
      importance: 'Fast connectivity for remote workers & family'
    },
    {
      id: 'tea-maker',
      label: 'In-Room Electric Kettle & Tea/Coffee Station',
      category: 'Comfort & Essentials',
      keywords: ['kettle', 'tea maker', 'tea kit', 'coffee maker'],
      icon: Coffee,
      importance: 'Fresh hot Darjeeling tea on demand'
    },
    {
      id: 'generator-backup',
      label: 'Full Power Generator Backup',
      category: 'Reliability',
      keywords: ['power backup', 'generator', 'backup power'],
      icon: CheckCircle2,
      importance: 'Uninterrupted electricity during mountain rainfall'
    },
    {
      id: 'elevator',
      label: 'Elevator / Lift Facility',
      category: 'Accessibility',
      keywords: ['elevator', 'lift'],
      icon: Building2,
      importance: 'Easy access for seniors and heavy luggage'
    },
    {
      id: 'spa-wellness',
      label: 'In-House Luxury Spa & Wellness Salon',
      category: 'Luxury & Wellness',
      keywords: ['spa', 'wellness', 'hydrotherapy', 'massage', 'sauna', 'rejuvenation'],
      icon: Crown,
      importance: 'Post-trek rejuvenation and hot stone therapy'
    },
    {
      id: 'parking-driver',
      label: 'Free On-Site Parking & Driver Accommodation',
      category: 'Transit & Vehicles',
      keywords: ['parking', 'driver accommodation', 'chauffeur'],
      icon: Car,
      importance: 'Safe vehicle depot and driver rest zones'
    }
  ];

  // Candidates for Hotel B selector filtered by user criteria
  const availableRivalsForB = useMemo(() => {
    return ALL_COMPATIBLE_HOTELS.filter(h => {
      if (h.id === hotelAId) return false;
      if (rivalFilterCategory === 'all') return true;
      if (rivalFilterCategory === 'same-destination') {
        const destA = getDestinationDisplay(hotelA).toLowerCase();
        const destH = getDestinationDisplay(h).toLowerCase();
        return (destA.includes('gangtok') && destH.includes('gangtok')) ||
               (destA.includes('pelling') && destH.includes('pelling')) ||
               (destA.includes('darjeeling') && destH.includes('darjeeling')) ||
               (destA.includes('lachung') && destH.includes('lachung'));
      }
      if (rivalFilterCategory === 'luxury') {
        return h.categories?.includes('luxury') || h.starCategory.includes('5★') || h.starCategory.includes('4★');
      }
      if (rivalFilterCategory === 'budget') {
        return h.categories?.includes('budget') || h.starCategory.includes('3★');
      }
      if (rivalFilterCategory === 'jain') {
        return h.categories?.includes('jain') || (h as any).isJainCertified || h.name.toLowerCase().includes('jain');
      }
      return true;
    });
  }, [hotelAId, hotelA, rivalFilterCategory]);

  return (
    <div 
      className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn font-sans"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* MODAL HEADER WITH CONTROLS & SWAP BUTTON */}
        {/* ========================================================================= */}
        <div className="bg-slate-950 border-b border-slate-800 p-4 sm:p-6 flex flex-col gap-4 flex-shrink-0">
          
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Side-by-Side Comparison
                  </span>
                  <span className="text-xs text-slate-400 font-bold hidden sm:inline">
                    Direct Offbeat Tariff & Verified Ratings
                  </span>
                </div>
                <h2 className="text-lg sm:text-2xl font-black text-white">
                  Compare Himalayan Stays & Amenities
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSwapHotels}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5 shadow-md"
                title="Swap Side A and Side B"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Swap Properties</span>
              </button>

              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-full border border-slate-700 transition-colors shadow-lg"
                title="Close Comparison"
                aria-label="Close Comparison"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Rival Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1 border-t border-slate-800/80">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              Filter Rival Options:
            </span>

            {[
              { id: 'all', label: 'All Partners' },
              { id: 'same-destination', label: 'Same Location Rivals' },
              { id: 'luxury', label: '4★ & 5★ Luxury' },
              { id: 'jain', label: 'Jain & Pure Veg' },
              { id: 'budget', label: 'Budget & Deluxe' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRivalFilterCategory(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  rivalFilterCategory === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-extrabold shadow'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MODAL BODY (SCROLLABLE COMPARISON TABLE & CARDS) */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-900/95">

          {/* 1. TOP DUAL HEADER HERO CARDS (Selectable Dropdowns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* HOTEL A CARD */}
            <div className="bg-slate-950 rounded-2xl border-2 border-amber-500/40 p-4 space-y-3 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                    Property Option A
                  </span>
                  <span className="text-xs text-amber-400 font-extrabold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {hotelA.guestRating || 4.8} / 5.0
                  </span>
                </div>

                {/* Hotel Selector Dropdown A */}
                <div className="relative">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Select First Hotel:
                  </label>
                  <div className="relative">
                    <select
                      value={hotelAId}
                      onChange={(e) => setHotelAId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-extrabold rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                    >
                      {ALL_COMPATIBLE_HOTELS.map((hotel) => (
                        <option key={hotel.id} value={hotel.id} className="bg-slate-950 text-white font-bold py-1">
                          {hotel.name} ({getDestinationDisplay(hotel)}) - {hotel.starCategory}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Cover Image & Quick Snapshot */}
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-800 group">
                  <OptimizedImage 
                    src={hotelA.coverImage} 
                    alt={hotelA.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
                    <span className="text-amber-300 font-extrabold drop-shadow">
                      {hotelA.priceRangeText || 'Custom Tariff'}
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm border border-slate-700">
                      {hotelA.starCategory}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-snug line-clamp-2 italic">
                  "{hotelA.tagline}"
                </p>
              </div>

              {/* Action Buttons for Hotel A */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Namaste OffbeatDestination! I would like to book a stay at Option A: ${hotelA.name} (${getDestinationDisplay(hotelA)}). Please share package pricing and room availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                  <span className="truncate">Book Hotel A</span>
                </a>

                {onSelectHotelDetails && (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectHotelDetails(hotelA);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 border border-purple-500/30 transition-colors truncate"
                  >
                    <span>Full Details</span>
                    <ExternalLink className="w-3 h-3 text-purple-400" />
                  </button>
                )}
              </div>
            </div>

            {/* HOTEL B CARD */}
            <div className="bg-slate-950 rounded-2xl border-2 border-cyan-500/40 p-4 space-y-3 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-cyan-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                    Property Option B
                  </span>
                  <span className="text-xs text-cyan-400 font-extrabold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-cyan-400" />
                    {hotelB.guestRating || 4.8} / 5.0
                  </span>
                </div>

                {/* Hotel Selector Dropdown B */}
                <div className="relative">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Select Rival Hotel:
                  </label>
                  <div className="relative">
                    <select
                      value={hotelBId}
                      onChange={(e) => setHotelBId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-extrabold rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                    >
                      {availableRivalsForB.map((hotel) => (
                        <option key={hotel.id} value={hotel.id} className="bg-slate-950 text-white font-bold py-1">
                          {hotel.name} ({getDestinationDisplay(hotel)}) - {hotel.starCategory}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Cover Image & Quick Snapshot */}
                <div className="relative h-32 rounded-xl overflow-hidden border border-slate-800 group">
                  <OptimizedImage 
                    src={hotelB.coverImage} 
                    alt={hotelB.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
                    <span className="text-cyan-300 font-extrabold drop-shadow">
                      {hotelB.priceRangeText || 'Custom Tariff'}
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm border border-slate-700">
                      {hotelB.starCategory}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-snug line-clamp-2 italic">
                  "{hotelB.tagline}"
                </p>
              </div>

              {/* Action Buttons for Hotel B */}
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Namaste OffbeatDestination! I would like to book a stay at Option B: ${hotelB.name} (${getDestinationDisplay(hotelB)}). Please share package pricing and room availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                  <span className="truncate">Book Hotel B</span>
                </a>

                {onSelectHotelDetails && (
                  <button
                    onClick={() => {
                      onClose();
                      onSelectHotelDetails(hotelB);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 border border-cyan-500/30 transition-colors truncate"
                  >
                    <span>Full Details</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* 2. CORE SPECIFICATIONS COMPARISON TABLE */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-100 uppercase tracking-wider">
                1. Tariff, Location & Ratings Matrix
              </h3>
            </div>

            <div className="divide-y divide-slate-800/80 text-xs">
              
              {/* Row: Starting Tariff */}
              <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-900/40 transition-colors">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Tariff Tier</span>
                </div>
                <div className="font-extrabold text-amber-300 pr-2">
                  {hotelA.priceRangeText || 'Direct Contract Quote'}
                </div>
                <div className="font-extrabold text-cyan-300 pl-2 border-l border-slate-800">
                  {hotelB.priceRangeText || 'Direct Contract Quote'}
                </div>
              </div>

              {/* Row: Star Classification & Tier */}
              <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-900/40 transition-colors">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>Category & Star</span>
                </div>
                <div className="text-slate-200 font-semibold pr-2">
                  {hotelA.starCategory}
                </div>
                <div className="text-slate-200 font-semibold pl-2 border-l border-slate-800">
                  {hotelB.starCategory}
                </div>
              </div>

              {/* Row: Overall Verified Rating */}
              <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-900/40 transition-colors">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Verified Guest Rating</span>
                </div>
                <div className="pr-2">
                  <div className="flex items-center gap-1.5 font-extrabold text-amber-400">
                    <span>⭐ {hotelA.guestRating || 4.8} / 5.0</span>
                    <span className="text-[10px] text-slate-500 font-normal">({hotelA.reviewCount || 350}+ reviews)</span>
                  </div>
                </div>
                <div className="pl-2 border-l border-slate-800">
                  <div className="flex items-center gap-1.5 font-extrabold text-cyan-400">
                    <span>⭐ {hotelB.guestRating || 4.8} / 5.0</span>
                    <span className="text-[10px] text-slate-500 font-normal">({hotelB.reviewCount || 350}+ reviews)</span>
                  </div>
                </div>
              </div>

              {/* Row: Location & Walking Distance */}
              <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-900/40 transition-colors">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Distance & Proximity</span>
                </div>
                <div className="text-slate-200 text-[11px] leading-snug pr-2">
                  {hotelA.distanceToCenter || 'Prime mountain valley location with panoramic views'}
                </div>
                <div className="text-slate-200 text-[11px] leading-snug pl-2 border-l border-slate-800">
                  {hotelB.distanceToCenter || 'Prime mountain valley location with panoramic views'}
                </div>
              </div>

              {/* Row: Best Suited For Traveler Type */}
              <div className="grid grid-cols-3 p-3.5 items-center hover:bg-slate-900/40 transition-colors">
                <div className="text-slate-400 font-bold flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Best Suited For</span>
                </div>
                <div className="pr-2">
                  <span className="bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {hotelA.badge || 'Recommended Stay'}
                  </span>
                </div>
                <div className="pl-2 border-l border-slate-800">
                  <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {hotelB.badge || 'Recommended Stay'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* 3. VERIFIED GUEST SCORECARD BREAKDOWN */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-100 uppercase tracking-wider">
                  2. Detailed Guest Ratings Scorecard
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Scale of 1.0 to 5.0 Stars</span>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { label: 'Cleanliness & Hygiene', scoreA: hotelA.ratingBreakdown?.cleanliness || 4.9, scoreB: hotelB.ratingBreakdown?.cleanliness || 4.9 },
                { label: 'Location & Mountain Views', scoreA: hotelA.ratingBreakdown?.location || 4.9, scoreB: hotelB.ratingBreakdown?.location || 4.9 },
                { label: 'Staff & Hospitality Service', scoreA: hotelA.ratingBreakdown?.service || 4.8, scoreB: hotelB.ratingBreakdown?.service || 4.8 },
                { label: 'Food & Dining Quality', scoreA: hotelA.ratingBreakdown?.food || 4.7, scoreB: hotelB.ratingBreakdown?.food || 4.7 },
                { label: 'Value for Money', scoreA: hotelA.ratingBreakdown?.value || 4.8, scoreB: hotelB.ratingBreakdown?.value || 4.8 }
              ].map((metric, idx) => (
                <div key={idx} className="bg-slate-900/70 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-amber-400">{hotelA.name.split(' ')[0]}: {metric.scoreA}</span>
                    <span className="text-slate-300 font-semibold">{metric.label}</span>
                    <span className="text-cyan-400">{hotelB.name.split(' ')[0]}: {metric.scoreB}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Bar A */}
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex justify-end">
                      <div 
                        className="bg-gradient-to-l from-amber-400 to-yellow-500 h-full rounded-full" 
                        style={{ width: `${(metric.scoreA / 5.0) * 100}%` }}
                      />
                    </div>
                    {/* Bar B */}
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full" 
                        style={{ width: `${(metric.scoreB / 5.0) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. CRITICAL HIMALAYAN AMENITIES MATRIX */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-100 uppercase tracking-wider">
                  3. Key Himalayan Room Amenities & Facilities
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">
                Verified On-Site Equipment
              </span>
            </div>

            <div className="divide-y divide-slate-800/80 text-xs">
              {AMENITY_COMPARISON_LIST.map((item) => {
                const IconComponent = item.icon;
                const hasA = checkAmenityPresent(hotelA, item.keywords);
                const hasB = checkAmenityPresent(hotelB, item.keywords);

                return (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-12 p-3 items-center hover:bg-slate-900/50 transition-colors gap-2"
                  >
                    {/* Left: Amenity Title & Icon */}
                    <div className="col-span-6 flex items-start gap-2">
                      <div className="p-1 rounded-md bg-slate-900 text-slate-300 flex-shrink-0 mt-0.5 border border-slate-800">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-200 block text-[11px] leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[9px] text-slate-500 block">
                          {item.importance}
                        </span>
                      </div>
                    </div>

                    {/* Middle: Hotel A Status */}
                    <div className="col-span-3 flex items-center justify-center">
                      {hasA ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                          <Check className="w-3.5 h-3.5" />
                          <span>Included</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          <XCircle className="w-3 h-3 text-slate-600" />
                          <span>On Request</span>
                        </span>
                      )}
                    </div>

                    {/* Right: Hotel B Status */}
                    <div className="col-span-3 flex items-center justify-center border-l border-slate-800 pl-2">
                      {hasB ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                          <Check className="w-3.5 h-3.5" />
                          <span>Included</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          <XCircle className="w-3 h-3 text-slate-600" />
                          <span>On Request</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. EXCLUSIVE OFFBEAT GUEST PERKS COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hotel A Perks */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-black text-amber-300 uppercase">
                  {hotelA.name} Exclusive Perks
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {hotelA.keyPerks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotel B Perks */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 space-y-2.5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Crown className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-black text-cyan-300 uppercase">
                  {hotelB.name} Exclusive Perks
                </h4>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {hotelB.keyPerks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. ROOM TYPES AVAILABLE COMPARISON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hotel A Rooms */}
            {hotelA.roomTypesAvailable && hotelA.roomTypesAvailable.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Bed className="w-4 h-4 text-purple-400" />
                  <h4 className="text-xs font-black text-slate-100 uppercase">
                    {hotelA.name} Room Types
                  </h4>
                </div>
                <div className="space-y-2">
                  {hotelA.roomTypesAvailable.map((room, idx) => (
                    <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-100 block">{room.name}</span>
                        <span className="text-[10px] text-slate-400">{room.bed} · {room.view}</span>
                      </div>
                      <span className="bg-amber-950 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-800">
                        {room.approxPrice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hotel B Rooms */}
            {hotelB.roomTypesAvailable && hotelB.roomTypesAvailable.length > 0 && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Bed className="w-4 h-4 text-purple-400" />
                  <h4 className="text-xs font-black text-slate-100 uppercase">
                    {hotelB.name} Room Types
                  </h4>
                </div>
                <div className="space-y-2">
                  {hotelB.roomTypesAvailable.map((room, idx) => (
                    <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-100 block">{room.name}</span>
                        <span className="text-[10px] text-slate-400">{room.bed} · {room.view}</span>
                      </div>
                      <span className="bg-cyan-950 text-cyan-300 text-[10px] font-extrabold px-2 py-0.5 rounded border border-cyan-800">
                        {room.approxPrice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MODAL FOOTER WITH COMBINED ACTIONS */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Can't decide? Our Sikkim travel experts will customize an itinerary with your favorite stays.
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Namaste OffbeatDestination! I am comparing ${hotelA.name} and ${hotelB.name} for my Sikkim & Darjeeling holiday. Please recommend the best fit and share customized package quotes.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire About Both on WhatsApp</span>
            </a>

            {onOpenAIChatWithHotel && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAIChatWithHotel(`Compare ${hotelA.name} vs ${hotelB.name}`);
                }}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-4 py-2.5 rounded-xl text-xs border border-amber-500/30 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI Recommendation</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-4 py-2.5 rounded-xl text-xs border border-slate-800 transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
