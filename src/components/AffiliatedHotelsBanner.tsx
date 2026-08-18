import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Coffee, 
  Flame, 
  Utensils,
  Crown,
  Coins,
  Leaf,
  Layers,
  Filter,
  X,
  Bed,
  Wifi,
  Tv,
  Clock,
  Award,
  Info,
  ChevronRight,
  Search,
  ThumbsUp,
  SlidersHorizontal,
  Compass,
  Navigation,
  ArrowLeftRight,
  Camera
} from 'lucide-react';
import { 
  AFFILIATED_HOTEL_CHAINS, 
  FEATURED_STANDALONE_HOTELS,
  HotelChainPartner, 
  FeaturedStandaloneHotel,
  AGENCY_DETAILS 
} from '../data/travelData';
import { HotelLocationMap } from './HotelLocationMap';
import { HotelComparisonModal, AnyHotelItem } from './HotelComparisonModal';
import { HotelImageCarousel } from './HotelImageCarousel';
import { HotelWeatherForecast } from './HotelWeatherForecast';
import { useWhatsApp } from '../utils/whatsAppContext';

type HotelCategoryFilter = 'all' | 'luxury' | 'budget' | 'jain' | 'featured-boutique';

interface CategoryOption {
  id: HotelCategoryFilter;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
  colorClasses: {
    activeBg: string;
    activeText: string;
    activeBorder: string;
    badgeBg: string;
    iconColor: string;
  };
}

const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    id: 'all',
    label: 'All Partner Hotels & Chains',
    shortLabel: 'All Stays',
    icon: Layers,
    description: 'All 12+ verified Himalayan hotel chains & landmark boutique properties in Sikkim & Darjeeling',
    colorClasses: {
      activeBg: 'bg-emerald-500',
      activeText: 'text-slate-950',
      activeBorder: 'border-emerald-400',
      badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      iconColor: 'text-emerald-400'
    }
  },
  {
    id: 'featured-boutique',
    label: 'Landmark & Boutique Stays',
    shortLabel: 'Boutique Picks',
    icon: Award,
    description: 'Lachung Country House, Sila Norphel Pelling, Gangtok Sun Mount, Gangtok Prime, Hungry Jack & Crestora',
    colorClasses: {
      activeBg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      activeText: 'text-white',
      activeBorder: 'border-purple-400',
      badgeBg: 'bg-purple-950/90 text-purple-300 border-purple-800',
      iconColor: 'text-purple-400'
    }
  },
  {
    id: 'luxury',
    label: 'Luxury & Heritage',
    shortLabel: 'Luxury & 5★',
    icon: Crown,
    description: '5★ & 4★ royal palaces, spa resorts & bespoke mountain sanctuaries (Mayfair, Elgin, Rare Himalayas, Crestora)',
    colorClasses: {
      activeBg: 'bg-gradient-to-r from-amber-500 to-yellow-400',
      activeText: 'text-slate-950',
      activeBorder: 'border-amber-400',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-800',
      iconColor: 'text-amber-400'
    }
  },
  {
    id: 'budget',
    label: 'Budget & Deluxe Comfort',
    shortLabel: 'Budget Deluxe',
    icon: Coins,
    description: 'Best-value 3★ boutique & comfortable stays with 24/7 hot water (Rufina, Trickocity, Summit, Sun Mount, Hungry Jack)',
    colorClasses: {
      activeBg: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      activeText: 'text-slate-950',
      activeBorder: 'border-cyan-400',
      badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
      iconColor: 'text-cyan-400'
    }
  },
  {
    id: 'jain',
    label: 'Jain-Friendly Stays',
    shortLabel: 'Jain & Pure Veg',
    icon: Leaf,
    description: '100% Pure Vegetarian & dedicated Jain kitchens without onion, garlic or root vegetables (Jain Group, Udaan, Crestora)',
    colorClasses: {
      activeBg: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      activeText: 'text-slate-950',
      activeBorder: 'border-emerald-400',
      badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-800',
      iconColor: 'text-emerald-400'
    }
  }
];

// Unified Hotel Item type for the View Details Modal
type ModalHotelData = (HotelChainPartner | FeaturedStandaloneHotel) & {
  isStandalone?: boolean;
};

interface AffiliatedHotelsBannerProps {
  onOpenAIChatWithHotel?: (hotelName: string) => void;
  initialChainId?: string;
  initialCategory?: HotelCategoryFilter;
}

export const AffiliatedHotelsBanner: React.FC<AffiliatedHotelsBannerProps> = ({
  onOpenAIChatWithHotel,
  initialChainId = 'all',
  initialCategory = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<HotelCategoryFilter>(() => {
    if (initialChainId === 'partner-jain-group') return 'jain';
    return initialCategory;
  });
  const [selectedChainId, setSelectedChainId] = useState<string>(initialChainId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalHotel, setActiveModalHotel] = useState<ModalHotelData | null>(null);
  const { setPageContext } = useWhatsApp();

  // Synchronize active hotel modal with WhatsApp floating context
  useEffect(() => {
    if (activeModalHotel) {
      const hotelLoc = 'locations' in activeModalHotel 
        ? activeModalHotel.locations.join(', ') 
        : (activeModalHotel as any).destination || 'Sikkim & Darjeeling';

      const hotelCat = 'category' in activeModalHotel 
        ? (activeModalHotel as any).category 
        : (activeModalHotel.categories?.[0] || 'Luxury Partner Hotel');

      const hotelPrice = 'priceRange' in activeModalHotel 
        ? activeModalHotel.priceRange 
        : 'Partner Special Tariff';

      setPageContext({
        type: 'hotel',
        title: activeModalHotel.name,
        subtitle: `${hotelCat} | ${hotelPrice || 'Partner Special Tariff'}`,
        location: hotelLoc,
        hotelCategory: hotelCat,
      });
    }
  }, [activeModalHotel, setPageContext]);

  // Side-by-side Hotel Comparison state
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [comparisonHotelA, setComparisonHotelA] = useState<AnyHotelItem | null>(null);
  const [comparisonHotelB, setComparisonHotelB] = useState<AnyHotelItem | null>(null);

  const handleOpenComparison = (hotelA?: AnyHotelItem | ModalHotelData | null, hotelB?: AnyHotelItem | ModalHotelData | null) => {
    setComparisonHotelA((hotelA as AnyHotelItem) || (activeModalHotel as AnyHotelItem) || (AFFILIATED_HOTEL_CHAINS[0] as AnyHotelItem));
    setComparisonHotelB((hotelB as AnyHotelItem) || null);
    setIsComparisonModalOpen(true);
  };

  useEffect(() => {
    if (initialChainId && initialChainId !== 'all') {
      setSelectedChainId(initialChainId);
      if (initialChainId === 'partner-jain-group') {
        setSelectedCategory('jain');
      }
    }
  }, [initialChainId]);

  // Compute chains matching the active category
  const categoryChains = useMemo(() => {
    if (selectedCategory === 'featured-boutique') return [];
    if (selectedCategory === 'all') return AFFILIATED_HOTEL_CHAINS;
    return AFFILIATED_HOTEL_CHAINS.filter(chain => 
      chain.categories && chain.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  // Compute standalone boutique hotels matching active category
  const categoryBoutiques = useMemo(() => {
    if (selectedCategory === 'featured-boutique') return FEATURED_STANDALONE_HOTELS;
    if (selectedCategory === 'all') return FEATURED_STANDALONE_HOTELS;
    return FEATURED_STANDALONE_HOTELS.filter(hotel =>
      hotel.categories && hotel.categories.includes(selectedCategory)
    );
  }, [selectedCategory]);

  // Compute category counts for pills
  const countsByCategory = useMemo(() => {
    const totalCount = AFFILIATED_HOTEL_CHAINS.length + FEATURED_STANDALONE_HOTELS.length;
    return {
      all: totalCount,
      'featured-boutique': FEATURED_STANDALONE_HOTELS.length,
      luxury: AFFILIATED_HOTEL_CHAINS.filter(c => c.categories?.includes('luxury')).length + 
              FEATURED_STANDALONE_HOTELS.filter(h => h.categories?.includes('luxury')).length,
      budget: AFFILIATED_HOTEL_CHAINS.filter(c => c.categories?.includes('budget')).length + 
              FEATURED_STANDALONE_HOTELS.filter(h => h.categories?.includes('budget')).length,
      jain: AFFILIATED_HOTEL_CHAINS.filter(c => c.categories?.includes('jain')).length + 
            FEATURED_STANDALONE_HOTELS.filter(h => h.categories?.includes('jain')).length
    };
  }, []);

  // Filtered chains to render
  const visibleChains = useMemo(() => {
    let list = categoryChains;
    if (selectedChainId !== 'all') {
      const match = list.find(c => c.id === selectedChainId);
      list = match ? [match] : list;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.locations.some(l => l.toLowerCase().includes(q)) ||
        c.featuredProperties.some(p => p.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [categoryChains, selectedChainId, searchQuery]);

  // Filtered standalone boutique hotels to render
  const visibleBoutiques = useMemo(() => {
    let list = categoryBoutiques;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(h => 
        h.name.toLowerCase().includes(q) ||
        h.destination.toLowerCase().includes(q) ||
        h.locationSpecific.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [categoryBoutiques, searchQuery]);

  const handleCategoryChange = (category: HotelCategoryFilter) => {
    setSelectedCategory(category);
    setSelectedChainId('all'); // Reset specific chain filter when toggling category
  };

  const handleOpenDetails = (hotel: ModalHotelData) => {
    setActiveModalHotel(hotel);
  };

  const handleCloseDetails = () => {
    setActiveModalHotel(null);
  };

  // Helper to render amenity icons
  const getAmenityIcon = (amenity: string) => {
    const text = amenity.toLowerCase();
    if (text.includes('wifi') || text.includes('internet')) return <Wifi className="w-3.5 h-3.5 text-cyan-400" />;
    if (text.includes('heat') || text.includes('radiator') || text.includes('blanket') || text.includes('geyser') || text.includes('hot water')) return <Flame className="w-3.5 h-3.5 text-amber-400" />;
    if (text.includes('veg') || text.includes('jain') || text.includes('food') || text.includes('dining') || text.includes('restaurant') || text.includes('buffet')) return <Utensils className="w-3.5 h-3.5 text-emerald-400" />;
    if (text.includes('tea') || text.includes('coffee') || text.includes('kettle')) return <Coffee className="w-3.5 h-3.5 text-amber-300" />;
    if (text.includes('tv') || text.includes('screen')) return <Tv className="w-3.5 h-3.5 text-blue-400" />;
    if (text.includes('spa') || text.includes('massage') || text.includes('wellness')) return <Sparkles className="w-3.5 h-3.5 text-purple-400" />;
    if (text.includes('view') || text.includes('balcony') || text.includes('kanchenjunga')) return <MapPin className="w-3.5 h-3.5 text-rose-400" />;
    return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
  };

  return (
    <section id="affiliated-hotels-section" className="py-12 px-4 bg-slate-950 border-t border-slate-800 text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Banner Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/50 px-4 py-1.5 rounded-full text-amber-300 font-bold text-xs uppercase tracking-widest shadow-md">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Official Hotel Affiliations & Direct Tariffs</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Our Affiliated Hotels & Resort Partners
          </h2>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            We hold direct advance tie-ups with premium chains and iconic boutique lodges across Sikkim & Darjeeling. Explore room amenities, distance to city centers, verified guest ratings, and direct tariff perks below.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY FILTER TOGGLE: Luxury / Budget / Jain / Boutique / All */}
        {/* ========================================================================= */}
        <div className="bg-slate-900/90 border border-slate-800 p-2 sm:p-3 rounded-2xl shadow-xl max-w-5xl mx-auto backdrop-blur-sm space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Filter by Stay Category:</span>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hotel, city or amenity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {CATEGORY_OPTIONS.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = countsByCategory[cat.id];

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative p-3 rounded-xl transition-all duration-200 flex flex-col items-start text-left border ${
                    isSelected
                      ? `${cat.colorClasses.activeBg} ${cat.colorClasses.activeText} ${cat.colorClasses.activeBorder} shadow-lg scale-[1.02] ring-2 ring-white/20 font-black`
                      : 'bg-slate-950/70 text-slate-300 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : cat.colorClasses.iconColor}`} />
                      <span className="text-xs font-bold tracking-tight">{cat.shortLabel}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isSelected 
                        ? 'bg-slate-950 text-white font-bold' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {count}
                    </span>
                  </div>

                  <span className={`text-[10px] leading-tight line-clamp-1 ${
                    isSelected ? 'text-slate-900 font-medium' : 'text-slate-400'
                  }`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description Notice */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between px-2 text-[11px] text-slate-400">
            <span className="line-clamp-1">
              {CATEGORY_OPTIONS.find(c => c.id === selectedCategory)?.description}
            </span>
            <span className="font-bold text-amber-400 whitespace-nowrap ml-2">
              {visibleChains.length + (selectedCategory === 'featured-boutique' || selectedCategory === 'all' ? visibleBoutiques.length : 0)} Stays Listed
            </span>
          </div>
        </div>

        {/* Specific Chain Selector Ribbon / Sub-filter Pills (When not in featured-boutique only) */}
        {selectedCategory !== 'featured-boutique' && categoryChains.length > 0 && (
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedChainId('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                selectedChainId === 'all'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold scale-105'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>All {CATEGORY_OPTIONS.find(c => c.id === selectedCategory)?.shortLabel} Chains ({categoryChains.length})</span>
            </button>

            {categoryChains.map((chain) => (
              <button
                key={chain.id}
                onClick={() => setSelectedChainId(chain.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  selectedChainId === chain.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold scale-105'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/50 hover:text-amber-300'
                }`}
              >
                <span className="font-mono text-[10px] bg-slate-950/80 px-1.5 py-0.5 rounded text-amber-300">
                  {chain.logoText}
                </span>
                <span>{chain.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 1. MAJOR HOTEL CHAINS GRID */}
        {/* ========================================================================= */}
        {visibleChains.length > 0 && (
          <div className="space-y-4">
            {selectedCategory === 'all' && (
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Affiliated Himalayan Hotel Groups & Chains ({visibleChains.length})</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleChains.map((chain) => {
                const isLuxury = chain.categories?.includes('luxury');
                const isBudget = chain.categories?.includes('budget');
                const isJain = chain.categories?.includes('jain');

                return (
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

                        {/* Category Tags in Top-Left */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider shadow-md">
                            {chain.badge}
                          </span>
                          <span className="bg-slate-950/90 text-amber-300 font-bold px-2.5 py-1 rounded-lg text-[10px] border border-amber-500/40">
                            {chain.starCategory}
                          </span>
                        </div>

                        {/* Price Range Pill in Top-Right */}
                        {chain.priceRangeText && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-emerald-950/90 text-emerald-300 font-extrabold px-2.5 py-1 rounded-lg text-[10px] border border-emerald-500/50 shadow-md">
                              {chain.priceRangeText}
                            </span>
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <h3 className="text-xl font-extrabold text-white drop-shadow-md">
                            {chain.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 space-y-4">
                        {/* Rating & Distance Quick Stats */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-1.5 text-amber-400 font-extrabold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{chain.guestRating || 4.8} / 5.0</span>
                            <span className="text-[10px] text-slate-400 font-normal">({chain.reviewCount || 350}+ reviews)</span>
                          </div>

                          {chain.distanceToCenter && (
                            <div className="flex items-center gap-1 text-[11px] text-cyan-300">
                              <MapPin className="w-3 h-3 text-cyan-400" />
                              <span className="truncate max-w-[170px]">{chain.distanceToCenter}</span>
                            </div>
                          )}
                        </div>

                        {/* Category Type Chips */}
                        <div className="flex flex-wrap gap-1.5">
                          {isLuxury && (
                            <span className="bg-amber-950/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                              <Crown className="w-3 h-3 text-amber-400" />
                              Luxury Experience
                            </span>
                          )}
                          {isBudget && (
                            <span className="bg-cyan-950/80 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-800 flex items-center gap-1">
                              <Coins className="w-3 h-3 text-cyan-400" />
                              Value Deluxe
                            </span>
                          )}
                          {isJain && (
                            <span className="bg-emerald-950/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                              <Leaf className="w-3 h-3 text-emerald-400" />
                              100% Jain & Pure Veg
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-amber-300/90 font-semibold italic">
                          "{chain.tagline}"
                        </p>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {chain.description}
                        </p>

                        {/* Room Amenities Quick Pills */}
                        {chain.roomAmenities && chain.roomAmenities.length > 0 && (
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                              Key Amenities:
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {chain.roomAmenities.slice(0, 4).map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300 truncate">
                                  {getAmenityIcon(amenity)}
                                  <span className="truncate">{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

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

                        {/* Featured Properties Sample */}
                        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
                          <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider block">
                            Featured Properties:
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
                      {/* VIEW DETAILS BUTTON */}
                      <button
                        onClick={() => handleOpenDetails(chain)}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 font-extrabold py-2.5 rounded-xl text-xs border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-center gap-2 shadow-md group/btn"
                      >
                        <Info className="w-4 h-4 text-amber-400" />
                        <span>View Details, Amenities & Verified Ratings</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleOpenComparison(chain)}
                          className="bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 font-bold py-2 rounded-xl text-xs border border-slate-700 hover:border-amber-500/40 transition-all flex items-center justify-center gap-1 shadow truncate px-1.5"
                          title={`Compare ${chain.name} with other hotels`}
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
                          <span>Compare</span>
                        </button>

                        <a
                          href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Namaste OffbeatDestination! I am interested in booking a tour package staying at ${chain.name}. Please share room options and rates.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1 shadow-md truncate px-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                          <span>WhatsApp</span>
                        </a>

                        {onOpenAIChatWithHotel ? (
                          <button
                            onClick={() => onOpenAIChatWithHotel(chain.name)}
                            className="bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white font-bold py-2 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1 truncate px-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Ask AI</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenDetails(chain)}
                            className="bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white font-bold py-2 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1 truncate px-1.5"
                          >
                            <span>Details</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. FEATURED STANDALONE & BOUTIQUE PROPERTIES GRID */}
        {/* (Lachung Country House, Sila Norphel Pelling, Sun Mount, Gangtok Prime, Hungry Jack, Crestora) */}
        {/* ========================================================================= */}
        {visibleBoutiques.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-400 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Featured Boutique & Landmark Properties ({visibleBoutiques.length})</span>
              </div>
              <span className="text-xs text-slate-400">Handpicked Alpine & Valley View Stays</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBoutiques.map((hotel) => {
                const isLuxury = hotel.categories?.includes('luxury');
                const isBudget = hotel.categories?.includes('budget');
                const isJain = hotel.categories?.includes('jain');

                return (
                  <div
                    key={hotel.id}
                    className="bg-slate-900 border border-slate-800 hover:border-purple-500/60 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
                  >
                    <div>
                      {/* Header Image & Badge */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={hotel.coverImage}
                          alt={hotel.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                        {/* Badges in Top-Left */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="bg-purple-600 text-white font-black px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider shadow-md">
                            {hotel.badge}
                          </span>
                          <span className="bg-slate-950/90 text-purple-300 font-bold px-2.5 py-1 rounded-lg text-[10px] border border-purple-500/40">
                            {hotel.starCategory}
                          </span>
                        </div>

                        {/* Price Range Pill in Top-Right */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-emerald-950/90 text-emerald-300 font-extrabold px-2.5 py-1 rounded-lg text-[10px] border border-emerald-500/50 shadow-md">
                            {hotel.priceRangeText}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-xl font-extrabold text-white drop-shadow-md">
                            {hotel.name}
                          </h3>
                          <p className="text-[11px] text-cyan-300 font-semibold flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {hotel.destination}
                          </p>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 space-y-4">
                        {/* Rating & Distance Quick Stats */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-1.5 text-amber-400 font-extrabold">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>{hotel.guestRating} / 5.0</span>
                            <span className="text-[10px] text-slate-400 font-normal">({hotel.reviewCount}+ verified)</span>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-cyan-300">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            <span className="truncate max-w-[170px]">{hotel.distanceToCenter}</span>
                          </div>
                        </div>

                        {/* Tagline */}
                        <p className="text-xs text-purple-300 font-semibold italic">
                          "{hotel.tagline}"
                        </p>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {hotel.description}
                        </p>

                        {/* Room Amenities Quick Grid */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Key Room Amenities:
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {hotel.roomAmenities.slice(0, 4).map((amenity, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300 truncate">
                                {getAmenityIcon(amenity)}
                                <span className="truncate">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Location Specificity */}
                        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 space-y-1">
                          <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider block">
                            Exact Location & Distance:
                          </span>
                          <p className="text-slate-300">{hotel.locationSpecific}</p>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-5 pt-0 space-y-2">
                      {/* VIEW DETAILS BUTTON */}
                      <button
                        onClick={() => handleOpenDetails({ ...hotel, isStandalone: true })}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-purple-200 font-extrabold py-2.5 rounded-xl text-xs border border-purple-500/40 hover:border-purple-400 transition-all flex items-center justify-center gap-2 shadow-md group/btn"
                      >
                        <Info className="w-4 h-4 text-purple-400" />
                        <span>View Details, Amenities & Verified Ratings</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>

                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleOpenComparison({ ...hotel, isStandalone: true })}
                          className="bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-purple-200 font-bold py-2 rounded-xl text-xs border border-slate-700 hover:border-purple-500/40 transition-all flex items-center justify-center gap-1 shadow truncate px-1.5"
                          title={`Compare ${hotel.name} with other hotels`}
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5 text-purple-400" />
                          <span>Compare</span>
                        </button>

                        <a
                          href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Namaste OffbeatDestination! I would like to book a stay at ${hotel.name} (${hotel.destination}). Please share package quote and room availability.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1 shadow-md truncate px-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                          <span>WhatsApp</span>
                        </a>

                        {onOpenAIChatWithHotel ? (
                          <button
                            onClick={() => onOpenAIChatWithHotel(hotel.name)}
                            className="bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white font-bold py-2 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1 truncate px-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Ask AI</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenDetails({ ...hotel, isStandalone: true })}
                            className="bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white font-bold py-2 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1 truncate px-1.5"
                          >
                            <span>Details</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Partnership Guarantee Callout Banner */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/60 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-emerald-500 text-slate-950 font-black px-2.5 py-0.5 rounded text-[10px] uppercase">
                Direct Hotel Chain Contract
              </span>
              <span className="text-emerald-300 font-extrabold text-xs">
                No Middlemen Commission · Guaranteed View Rooms
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-100">
              Why Book Your Stays via OffbeatDestination Travels?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Because we maintain direct local contracts and bulk inventory with Rufina, Crestora, Jain Group, Lachung Country House, Sila Norphel Pelling, Sun Mount, Gangtok Prime, Hungry Jack, Rare Himalayas, Summit, Udaan, Mayfair, and The Elgin, our guests get <strong>exclusive direct tariffs, guaranteed mountain view rooms, and pure veg/Jain meal customization</strong>.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Namaste! I want a customized tour package staying at Rufina / Crestora / Lachung Country House / Sila Norphel / Jain Group / Summit / Udaan / Mayfair affiliated hotels.')}`}
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

      {/* ========================================================================= */}
      {/* 3. 'VIEW DETAILS' MODAL FOR HOTELS */}
      {/* Displays: Room Amenities, Distance to City Center, Verified Guest Ratings, */}
      {/* Room Types, Guest Reviews, Key Perks & Direct WhatsApp / AI Actions */}
      {/* ========================================================================= */}
      {activeModalHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div 
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Cover */}
            <div className="relative h-64 sm:h-72 flex-shrink-0 overflow-hidden">
              <img 
                src={activeModalHotel.coverImage} 
                alt={activeModalHotel.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-950/40" />

              {/* Top-Right Action Toolbar (Compare & Close Buttons) */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => handleOpenComparison(activeModalHotel)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black px-3.5 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-xl border border-amber-300 transition-all hover:scale-105"
                  title="Compare this hotel with other Himalayan partners"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-slate-950" />
                  <span>Compare with others</span>
                </button>

                <button 
                  onClick={handleCloseDetails}
                  className="bg-slate-950/80 hover:bg-slate-950 text-slate-300 hover:text-white p-2 rounded-full border border-slate-700 transition-colors shadow-lg"
                  title="Close Details"
                  aria-label="Close Details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Badges in Top-Left */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-xl text-xs uppercase tracking-wider shadow-lg">
                  {activeModalHotel.badge}
                </span>
                <span className="bg-slate-950/90 text-amber-300 font-bold px-3 py-1 rounded-xl text-xs border border-amber-500/40 shadow-lg">
                  {activeModalHotel.starCategory}
                </span>
                {activeModalHotel.priceRangeText && (
                  <span className="bg-emerald-950/90 text-emerald-300 font-extrabold px-3 py-1 rounded-xl text-xs border border-emerald-500/50 shadow-lg">
                    {activeModalHotel.priceRangeText}
                  </span>
                )}
              </div>

              {/* Title & Tagline in Bottom */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-lg">
                  {activeModalHotel.name}
                </h2>
                <p className="text-xs sm:text-sm text-amber-300 font-semibold italic drop-shadow">
                  "{activeModalHotel.tagline}"
                </p>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-1">
              
              {/* 1. KEY HIGHLIGHTS BAR (Distance, Rating, Direct Partnership) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                {/* Distance to City Center */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Distance to Center
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-100">
                      {activeModalHotel.distanceToCenter || 'Central Location with Mountain Views'}
                    </span>
                  </div>
                </div>

                {/* Verified Guest Rating */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 flex-shrink-0">
                    <Star className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Verified Guest Rating
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-extrabold text-amber-400">
                        {activeModalHotel.guestRating || 4.8} / 5.0
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({activeModalHotel.reviewCount || 350}+ reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Contract Badge */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Booking Guarantee
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-400">
                      100% Direct Affiliation & Best Rate
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. OVERVIEW & DESCRIPTION */}
              <div className="space-y-2">
                <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Property Overview</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeModalHotel.description}
                </p>
              </div>

              {/* 3. ROOM AMENITIES & FACILITIES GRID */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                  <span>Room Amenities & Stay Features</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  {activeModalHotel.roomAmenities && activeModalHotel.roomAmenities.length > 0 ? (
                    activeModalHotel.roomAmenities.map((amenity, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200 shadow-sm"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="font-medium leading-snug">{amenity}</span>
                      </div>
                    ))
                  ) : (
                    ['Mountain View Balcony', '24/7 Hot Water Geyser', 'High-Speed Wi-Fi', 'Room Heating / Blowers', 'Electric Kettle & Tea Kit', 'Pure Veg & Multi-Cuisine Dining', 'Daily Sanitized Housekeeping', 'Power Backup Generator'].map((amenity, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2 text-xs text-slate-200">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 3.5 REAL-TIME 3-DAY WEATHER FORECAST & CHECK-IN PLANNER */}
              <HotelWeatherForecast
                hotelName={activeModalHotel.name}
                hotelLocation={
                  'locationSpecific' in activeModalHotel && activeModalHotel.locationSpecific
                    ? `${activeModalHotel.locationSpecific}, ${activeModalHotel.destination}`
                    : 'locations' in activeModalHotel && Array.isArray(activeModalHotel.locations)
                    ? activeModalHotel.locations.join(', ')
                    : 'Sikkim'
                }
                featuredLocations={
                  'locations' in activeModalHotel && Array.isArray(activeModalHotel.locations)
                    ? activeModalHotel.locations
                    : 'destination' in activeModalHotel && typeof activeModalHotel.destination === 'string'
                    ? [activeModalHotel.destination]
                    : []
                }
              />

              {/* 4. INTERACTIVE GOOGLE MAP & TOURIST LANDMARK PROXIMITY */}
              <HotelLocationMap hotel={activeModalHotel} />

              {/* 5. VERIFIED GUEST RATINGS BREAKDOWN & REVIEWS */}
              <div className="space-y-4 bg-slate-950/90 p-5 rounded-2xl border border-slate-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <h3 className="text-base font-extrabold text-slate-100">
                      Verified Guest Reviews & Rating Score
                    </h3>
                  </div>
                  <span className="text-xs text-amber-400 font-bold bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800">
                    ⭐ {activeModalHotel.guestRating || 4.8} / 5.0 Overall Excellence
                  </span>
                </div>

                {/* Detailed Rating Breakdown Bars */}
                {activeModalHotel.ratingBreakdown && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
                    {[
                      { label: 'Cleanliness', score: activeModalHotel.ratingBreakdown.cleanliness },
                      { label: 'Location', score: activeModalHotel.ratingBreakdown.location },
                      { label: 'Service & Staff', score: activeModalHotel.ratingBreakdown.service },
                      { label: 'Food & Dining', score: activeModalHotel.ratingBreakdown.food },
                      { label: 'Value for Money', score: activeModalHotel.ratingBreakdown.value }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                        <div className="flex justify-between text-[11px] font-bold text-slate-300">
                          <span>{item.label}</span>
                          <span className="text-amber-400">{item.score}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-amber-400 h-full rounded-full" 
                            style={{ width: `${(item.score / 5.0) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Verified Guest Testimonial Cards */}
                {activeModalHotel.verifiedGuestReviews && activeModalHotel.verifiedGuestReviews.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Recent Verified Guest Experiences:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeModalHotel.verifiedGuestReviews.map((rev, idx) => (
                        <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-xs font-extrabold text-slate-100">{rev.author}</h4>
                              <p className="text-[10px] text-slate-400">{rev.city} · <span className="text-cyan-400">{rev.stayType}</span></p>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-400 text-xs">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-300 italic leading-relaxed">
                            "{rev.comment}"
                          </p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                            <span className="flex items-center gap-1 text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" /> Verified Offbeat Traveler
                            </span>
                            <span>{rev.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. AVAILABLE ROOM TYPES & PRICING */}
              {activeModalHotel.roomTypesAvailable && activeModalHotel.roomTypesAvailable.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Bed className="w-4 h-4 text-purple-400" />
                    <span>Available Room Types & Suites</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeModalHotel.roomTypesAvailable.map((room, idx) => (
                      <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-black text-slate-100">{room.name}</h4>
                            <span className="bg-emerald-950 text-emerald-300 font-extrabold text-[10px] px-2 py-0.5 rounded border border-emerald-800 whitespace-nowrap">
                              {room.approxPrice}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-snug">{room.description}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-300">
                          <span className="font-semibold text-purple-300">{room.bed}</span>
                          <span className="text-cyan-400 font-medium">{room.view}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. LOCATIONS & FEATURED PROPERTIES */}
              {'featuredProperties' in activeModalHotel && activeModalHotel.featuredProperties && (
                <div className="space-y-3">
                  <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>All Locations & Properties in Sikkim & Darjeeling</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    {activeModalHotel.featuredProperties.map((prop, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="truncate font-medium">{prop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. OFFBEAT EXCLUSIVE GUEST PERKS */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Exclusive OffbeatDestination Guest Perks</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalHotel.keyPerks.map((perk, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-amber-950/40 to-slate-950 p-3 rounded-xl border border-amber-900/40 flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. SIDE-BY-SIDE PROPERTY COMPARISON SECTION */}
              <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-cyan-950/40 p-5 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex-shrink-0">
                      <ArrowLeftRight className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-white">
                        Compare {activeModalHotel.name} with Rival Hotels
                      </h3>
                      <p className="text-xs text-slate-400">
                        Side-by-side comparison of amenities, guest ratings, location proximities, and direct tariff rates.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenComparison(activeModalHotel)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg transition-transform hover:scale-105 self-start sm:self-auto whitespace-nowrap"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    <span>Compare with Others</span>
                  </button>
                </div>

                {/* Quick 1-Click Comparison Competitor Pills */}
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Quick 1-Click Rival Comparisons:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {AFFILIATED_HOTEL_CHAINS.concat(FEATURED_STANDALONE_HOTELS as any)
                      .filter(h => h.id !== activeModalHotel.id)
                      .slice(0, 5)
                      .map((rival) => (
                        <button
                          key={rival.id}
                          onClick={() => handleOpenComparison(activeModalHotel, rival as any)}
                          className="bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all flex items-center gap-1.5 group shadow"
                        >
                          <span className="text-amber-400 font-black group-hover:scale-110 transition-transform">vs</span>
                          <span className="font-bold">{rival.name}</span>
                          <span className="text-[10px] text-slate-400">({rival.starCategory})</span>
                        </button>
                      ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Sticky Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                Direct tariff quotes customized for your travel dates with cab & permit coordination.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleOpenComparison(activeModalHotel)}
                  className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 font-extrabold px-4 py-3 rounded-xl text-xs border border-amber-500/40 transition-all flex items-center justify-center gap-1.5 shadow-md"
                  title="Compare with other hotels"
                >
                  <ArrowLeftRight className="w-4 h-4 text-amber-400" />
                  <span>Compare with others</span>
                </button>

                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Namaste OffbeatDestination! I would like to book a tour package with stay at ${activeModalHotel.name}. Please share quotes, room options, and availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book via WhatsApp</span>
                </a>

                {onOpenAIChatWithHotel && (
                  <button
                    onClick={() => {
                      const name = activeModalHotel.name;
                      handleCloseDetails();
                      onOpenAIChatWithHotel(name);
                    }}
                    className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold px-4 py-3 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Ask AI</span>
                  </button>
                )}

                <button
                  onClick={handleCloseDetails}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white px-4 py-3 rounded-xl text-xs border border-slate-800 transition-all"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SIDE-BY-SIDE HOTEL COMPARISON MODAL */}
      {/* ========================================================================= */}
      {isComparisonModalOpen && (
        <HotelComparisonModal
          initialHotelA={comparisonHotelA}
          initialHotelB={comparisonHotelB}
          onClose={() => setIsComparisonModalOpen(false)}
          onSelectHotelDetails={(hotel) => {
            setIsComparisonModalOpen(false);
            handleOpenDetails(hotel);
          }}
          onOpenAIChatWithHotel={onOpenAIChatWithHotel}
        />
      )}

    </section>
  );
};
