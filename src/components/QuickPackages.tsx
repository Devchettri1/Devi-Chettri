import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TOUR_PACKAGES, STANDARD_5N6D_PKG, LUXURY_5N6D_PKG, AGENCY_DETAILS } from '../data/travelData';
import { TourPackage, GroupSizeOption } from '../types';
import { GROUP_SIZE_CONFIGS, calculateGroupPrice, calculateTotalGroupCost } from '../utils/groupPricing';
import { GoogleReviewCarousel } from './GoogleReviewCarousel';
import { RouteMapVisualization } from './RouteMapVisualization';
import { OptimizedImage } from './ui/OptimizedImage';
import {
  Calendar,
  MapPin,
  Star,
  ShieldCheck,
  Check,
  ArrowRight,
  X,
  PhoneCall,
  Utensils,
  Compass,
  FileText,
  Sparkles,
  Crown,
  ChevronDown,
  Wand2,
  Building2,
  Users,
  User,
  UserCheck,
  Users2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Coffee,
  CheckCircle2,
  Download,
  Share2,
  Zap,
  Heart,
  Info,
  Flame,
  Tag,
  AlertCircle,
  Timer,
} from 'lucide-react';
import { useWishlist } from '../utils/wishlistContext';
import { useWhatsApp } from '../utils/whatsAppContext';
import { generatePackageItineraryPDF } from '../utils/pdfGenerator';

interface QuickPackagesProps {
  packages?: TourPackage[];
  onSelectPackage: (pkg: TourPackage) => void;
  onOpenAIChatWithPackage: (pkgTitle: string) => void;
  onOpenPhotoEditor?: (imageUrl?: string, title?: string) => void;
  onQuickBookPackage?: (pkgTitle: string) => void;
  showAllByDefault?: boolean;
  selectedGroupSize?: GroupSizeOption;
  onSelectGroupSize?: (size: GroupSizeOption) => void;
}

// Helper function to derive or construct milestone tags for an itinerary day
function getDayMilestones(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const milestones: string[] = [];

  if (text.includes('pickup') || text.includes('njp') || text.includes('ixb') || text.includes('airport')) {
    milestones.push('NJP / IXB Airport Pickup');
  }
  if (text.includes('teesta')) {
    milestones.push('Teesta River Highway Drive');
  }
  if (text.includes('gangtok') && (text.includes('mg marg') || text.includes('check-in'))) {
    milestones.push('Gangtok Check-in & MG Marg Stroll');
  }
  if (text.includes('tsomgo')) {
    milestones.push('Tsomgo Lake (12,400 ft)');
  }
  if (text.includes('baba')) {
    milestones.push('Baba Harbhajan Singh Mandir');
  }
  if (text.includes('nathula')) {
    milestones.push('Nathula Pass Indo-China Border');
  }
  if (text.includes('tiger hill') || text.includes('sunrise')) {
    milestones.push('Tiger Hill Kanchenjunga Sunrise');
  }
  if (text.includes('tea garden') || text.includes('happy valley') || text.includes('temi')) {
    milestones.push('Organic Tea Estate Walk & Tasting');
  }
  if (text.includes('darjeeling') && text.includes('batasia')) {
    milestones.push('Batasia Loop & Ghoom Monastery');
  }
  if (text.includes('lachung') || text.includes('seven sisters')) {
    milestones.push('Seven Sisters Waterfalls & Lachung Drive');
  }
  if (text.includes('yumthang')) {
    milestones.push('Yumthang Valley of Flowers (11,800 ft)');
  }
  if (text.includes('zero point')) {
    milestones.push('Snowbound Zero Point (15,300 ft)');
  }
  if (text.includes('skywalk') || text.includes('pelling')) {
    milestones.push('Pelling Glass Skywalk & Chenrezig Statue');
  }
  if (text.includes('ravangla') || text.includes('buddha')) {
    milestones.push('Ravangla Buddha Park (130ft Golden Statue)');
  }
  if (text.includes('taktsang') || text.includes('tiger\'s nest')) {
    milestones.push('Taktsang Monastery (Tiger\'s Nest) Hike');
  }
  if (text.includes('thimphu') || text.includes('punakha')) {
    milestones.push('Punakha Suspension Bridge & Dzong Tour');
  }
  if (text.includes('departure') || text.includes('drop')) {
    milestones.push('Departure Transfer & Farewell');
  }

  // Fallback if none matched
  if (milestones.length === 0) {
    const parts = title.split(' via ').concat(title.split(' to ')).concat(title.split('&'));
    parts.forEach(p => {
      const cleaned = p.trim();
      if (cleaned.length > 3 && milestones.length < 3) {
        milestones.push(cleaned);
      }
    });
  }

  if (milestones.length === 0) {
    milestones.push('Sightseeing & Scenic Transfers');
  }

  return Array.from(new Set(milestones)).slice(0, 4);
}

export const QuickPackages: React.FC<QuickPackagesProps> = ({
  packages,
  onSelectPackage,
  onOpenAIChatWithPackage,
  onOpenPhotoEditor,
  onQuickBookPackage,
  showAllByDefault = false,
  selectedGroupSize = 'couple',
  onSelectGroupSize,
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [currentGroupSize, setCurrentGroupSize] = useState<GroupSizeOption>(selectedGroupSize);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDuration, setActiveDuration] = useState<string>('All');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | 'deluxe' | 'premium' | 'luxury' | 'shared'>('all');
  const [onlyLastMinute, setOnlyLastMinute] = useState<boolean>(false);
  const [tier5N6D, setTier5N6D] = useState<'standard' | 'luxury'>('standard');
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState<TourPackage | null>(null);
  const [activeModalTier, setActiveModalTier] = useState<'deluxe' | 'premium' | 'luxury'>('premium');
  const [isViewAll, setIsViewAll] = useState<boolean>(showAllByDefault);
  const { setPageContext } = useWhatsApp();

  // Update WhatsApp context whenever a package modal is opened or active tier changes
  useEffect(() => {
    if (selectedItineraryPkg) {
      const discountedPrice = activeModalTier === 'luxury' 
        ? Math.round(selectedItineraryPkg.priceStarting * 1.4) 
        : activeModalTier === 'deluxe' 
          ? Math.round(selectedItineraryPkg.priceStarting * 0.85) 
          : selectedItineraryPkg.priceStarting;

      setPageContext({
        type: 'package',
        title: selectedItineraryPkg.title,
        subtitle: `${selectedItineraryPkg.duration} | ${activeModalTier.toUpperCase()} Plan starting ₹${discountedPrice.toLocaleString('en-IN')}/person`,
        duration: selectedItineraryPkg.duration,
        location: selectedItineraryPkg.location,
        price: discountedPrice,
        hotelCategory: activeModalTier === 'luxury' ? '5-Star Luxury' : activeModalTier === 'deluxe' ? '3-Star Deluxe' : '4-Star Premium',
        tourType: currentGroupSize,
      });
    }
  }, [selectedItineraryPkg, activeModalTier, currentGroupSize, setPageContext]);

  // Synchronize internal group size with parent prop
  useEffect(() => {
    if (selectedGroupSize) {
      setCurrentGroupSize(selectedGroupSize);
    }
  }, [selectedGroupSize]);

  const handleGroupSizeChange = (size: GroupSizeOption) => {
    setCurrentGroupSize(size);
    if (onSelectGroupSize) {
      onSelectGroupSize(size);
    }
  };

  const activeGroupConfig = GROUP_SIZE_CONFIGS[currentGroupSize] || GROUP_SIZE_CONFIGS.couple;

  useEffect(() => {
    if (showAllByDefault) {
      setIsViewAll(true);
      setActiveCategory('All');
      setActiveDuration('All');
      setSelectedTierFilter('all');
    }
  }, [showAllByDefault]);

  // Dedicated Active Package for the Day-by-Day Itinerary Section below
  const [activeItineraryId, setActiveItineraryId] = useState<string>('pkg-5n6d-sikkim-darjeeling');

  // PDF Itinerary Download State
  const [downloadingPkgId, setDownloadingPkgId] = useState<string | null>(null);
  const [pdfSuccessMessage, setPdfSuccessMessage] = useState<string | null>(null);

  // Download Itinerary as Formatted PDF document
  const handleDownloadPackagePdf = (pkg: TourPackage, customTier?: string) => {
    try {
      setDownloadingPkgId(pkg.id);
      
      const tierToUse = customTier || (selectedTierFilter !== 'all' && selectedTierFilter !== 'shared' ? selectedTierFilter : 'premium');
      
      const baseDeluxe = pkg.hotelTiers?.deluxe?.price || (pkg.priceStarting ? Math.round(pkg.priceStarting * 0.85) : 0);
      const basePremium = pkg.hotelTiers?.premium?.price || pkg.priceStarting || 0;
      const baseLuxury = pkg.hotelTiers?.luxury?.price || (pkg.priceStarting ? Math.round(pkg.priceStarting * 1.55) : 0);

      let unitPrice = basePremium;
      if (tierToUse === 'deluxe') unitPrice = baseDeluxe;
      else if (tierToUse === 'luxury') unitPrice = baseLuxury;

      const calcPrice = calculateGroupPrice(unitPrice, currentGroupSize);
      const totalCost = calculateTotalGroupCost(calcPrice, currentGroupSize);

      const paxCounts: Record<GroupSizeOption, number> = {
        solo: 1,
        couple: 2,
        family: 4,
        large_group: 6,
      };

      generatePackageItineraryPDF(pkg, {
        travelerName: 'Valued Traveler',
        travelersCount: paxCounts[currentGroupSize] || 2,
        hotelTier: tierToUse,
        calculatedPricePerPerson: calcPrice,
        totalGroupPrice: totalCost,
        vehiclePreference: activeGroupConfig.vehicleType,
        mealPreference: 'MAP (Breakfast & Dinner Included)',
      });

      setPdfSuccessMessage(`"${pkg.title}" Itinerary downloaded as formatted PDF!`);
      setTimeout(() => {
        setPdfSuccessMessage(null);
      }, 4500);
    } catch (error) {
      console.error('Error generating PDF itinerary:', error);
    } finally {
      setDownloadingPkgId(null);
    }
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  const modalRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Sikkim-Darjeeling', 'North Sikkim', 'Silk Route', 'South-West Sikkim', 'Honeymoon', 'Bhutan', 'Offbeat', 'Adventure', 'Family'];
  const durationFilters = ['All Durations', '3-5 Days', '6-7 Days', '8-10 Days', '10-15 Nights / Long Stays'];

  const sourcePackages = packages && packages.length > 0 ? packages : TOUR_PACKAGES;

  const deduplicatedPackages = sourcePackages.filter(
    (pkg) => pkg.id !== 'pkg-5n6d-sikkim-darjeeling-luxury'
  );

  const rawPackages = deduplicatedPackages.map((pkg) => {
    if (pkg.id === 'pkg-5n6d-sikkim-darjeeling') {
      return tier5N6D === 'luxury' ? LUXURY_5N6D_PKG : STANDARD_5N6D_PKG;
    }
    return pkg;
  });

  const lastMinuteCount = rawPackages.filter((p) => p.isLastMinuteAvailable).length;

  const filteredPackages = rawPackages.filter((p) => {
    if (onlyLastMinute && !p.isLastMinuteAvailable) {
      return false;
    }
    const matchCategory = activeCategory === 'All' || p.category === activeCategory;
    let matchDuration = true;
    if (activeDuration === '3-5 Days') {
      matchDuration = p.duration.includes('3 Days') || p.duration.includes('4 Days') || p.duration.includes('5 Days') || p.duration.includes('3 Nights') || p.duration.includes('4 Nights');
    } else if (activeDuration === '6-7 Days') {
      matchDuration = p.duration.includes('6 Days') || p.duration.includes('7 Days') || p.duration.includes('5 Nights') || p.duration.includes('6 Nights');
    } else if (activeDuration === '8-10 Days') {
      matchDuration = p.duration.includes('8 Days') || p.duration.includes('9 Days') || p.duration.includes('10 Days') || p.duration.includes('7 Nights') || p.duration.includes('8 Nights') || p.duration.includes('9 Nights');
    } else if (activeDuration === '10-15 Nights / Long Stays') {
      matchDuration = p.duration.includes('10 Nights') || p.duration.includes('11 Nights') || p.duration.includes('12 Nights') || p.duration.includes('13 Nights') || p.duration.includes('14 Nights') || p.duration.includes('15 Days') || p.duration.includes('11 Days') || p.duration.includes('12 Days') || p.duration.includes('13 Days');
    }

    let matchTier = true;
    if (selectedTierFilter === 'shared') {
      matchTier = !!p.isSharedTourAvailable;
    }

    return matchCategory && matchDuration && matchTier;
  });

  // Active package for the Day-by-Day section below
  const featuredItineraryPackage =
    rawPackages.find((p) => p.id === activeItineraryId) || rawPackages[0] || STANDARD_5N6D_PKG;

  // Calculate Paginated or All Packages
  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE) || 1;
  const paginatedPackages = filteredPackages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const displayPackages = isViewAll ? filteredPackages : paginatedPackages;

  // Auto Scroll to top of packages section
  const scrollToPackagesTop = () => {
    const section = document.getElementById('packages-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    scrollToPackagesTop();
  };

  const handleDurationChange = (dur: string) => {
    setActiveDuration(dur === 'All Durations' ? 'All' : dur);
    setCurrentPage(1);
    scrollToPackagesTop();
  };

  const handleTierFilterChange = (tier: 'all' | 'deluxe' | 'premium' | 'luxury' | 'shared') => {
    setSelectedTierFilter(tier);
    setCurrentPage(1);
    scrollToPackagesTop();
  };

  const handleToggleViewAll = () => {
    setIsViewAll(!isViewAll);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToPackagesTop();
    }
  };

  // Modal Next/Prev Navigation
  const currentModalIndex = selectedItineraryPkg
    ? filteredPackages.findIndex((p) => p.id === selectedItineraryPkg.id)
    : -1;
  const hasPrevModalPkg = currentModalIndex > 0;
  const hasNextModalPkg = currentModalIndex >= 0 && currentModalIndex < filteredPackages.length - 1;

  const handlePrevModalPackage = () => {
    if (hasPrevModalPkg) {
      setSelectedItineraryPkg(filteredPackages[currentModalIndex - 1]);
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    }
  };

  const handleNextModalPackage = () => {
    if (hasNextModalPkg) {
      setSelectedItineraryPkg(filteredPackages[currentModalIndex + 1]);
      if (modalRef.current) {
        modalRef.current.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [selectedItineraryPkg]);

  const handleSharedInquiry = (pkgTitle: string, sharedPrice?: number) => {
    const message = `Namaste OffbeatDestination! I want to inquire about booking a seat in a Sharing Tour for ${pkgTitle}${sharedPrice ? ` (₹${sharedPrice}/seat)` : ''}. Please guide me on upcoming available dates and permits.`;
    const waUrl = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="packages-section" className="py-14 bg-[#060B18] text-slate-100 scroll-mt-6 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="editorial-eyebrow">SIGNATURE ITINERARIES & HOTEL CATEGORIES</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Handcrafted Himalayan Tour Packages
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Flawless execution by local Sikkim experts based in Gangtok. Select from 3 customizable hotel categories with dynamic group-size rate adjustments.
          </p>
        </div>

        {/* Interactive Group Size Sync Bar */}
        <div className="bg-[#0A1128] border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl max-w-4xl mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Select Group Size for Package Rates:
              </span>
            </div>
            <span className="text-[11px] text-cyan-300 font-medium">
              ⚡ Showing rates for <strong className="text-white">{activeGroupConfig.label} ({activeGroupConfig.paxLabel})</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Solo */}
            <button
              type="button"
              onClick={() => handleGroupSizeChange('solo')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                currentGroupSize === 'solo'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-950/40'
                  : 'bg-[#060B18] text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className={`w-4 h-4 ${currentGroupSize === 'solo' ? 'text-slate-950' : 'text-cyan-400'}`} />
                <div>
                  <span className="text-xs block font-bold">Solo Traveler</span>
                  <span className={`text-[10px] block ${currentGroupSize === 'solo' ? 'text-slate-800' : 'text-slate-400'}`}>
                    Min 2pax Base
                  </span>
                </div>
              </div>
            </button>

            {/* Couple */}
            <button
              type="button"
              onClick={() => handleGroupSizeChange('couple')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                currentGroupSize === 'couple'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-950/40'
                  : 'bg-[#060B18] text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className={`w-4 h-4 ${currentGroupSize === 'couple' ? 'text-slate-950' : 'text-cyan-400'}`} />
                <div>
                  <span className="text-xs block font-bold">Couple / Duo</span>
                  <span className={`text-[10px] block ${currentGroupSize === 'couple' ? 'text-slate-800' : 'text-slate-400'}`}>
                    2 Adults (Base)
                  </span>
                </div>
              </div>
            </button>

            {/* Family */}
            <button
              type="button"
              onClick={() => handleGroupSizeChange('family')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                currentGroupSize === 'family'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-950/40'
                  : 'bg-[#060B18] text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className={`w-4 h-4 ${currentGroupSize === 'family' ? 'text-slate-950' : 'text-emerald-400'}`} />
                <div>
                  <span className="text-xs block font-bold">Small Family</span>
                  <span className={`text-[10px] block ${currentGroupSize === 'family' ? 'text-slate-800 font-bold' : 'text-emerald-400'}`}>
                    3–4 Pax (Save 14%)
                  </span>
                </div>
              </div>
            </button>

            {/* Large Group */}
            <button
              type="button"
              onClick={() => handleGroupSizeChange('large_group')}
              className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                currentGroupSize === 'large_group'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-950/40'
                  : 'bg-[#060B18] text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users2 className={`w-4 h-4 ${currentGroupSize === 'large_group' ? 'text-slate-950' : 'text-amber-400'}`} />
                <div>
                  <span className="text-xs block font-bold">Large Group</span>
                  <span className={`text-[10px] block ${currentGroupSize === 'large_group' ? 'text-slate-800 font-bold' : 'text-amber-400'}`}>
                    5–8+ Pax (Save 24%)
                  </span>
                </div>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
            <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span>
              <strong>{activeGroupConfig.label} Notes:</strong> {activeGroupConfig.description}. {activeGroupConfig.minPaxNotice}.
            </span>
          </div>
        </div>

        {/* Filter Controls: Tier Filter Pills, Region Category Pills & Last Minute Toggle */}
        <div className="space-y-3">
          {/* Top Row: Last Minute Availability Toggle & Tier Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* Last Minute Availability Filter Button */}
            <button
              onClick={() => {
                setOnlyLastMinute(!onlyLastMinute);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                onlyLastMinute
                  ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 border-amber-300 font-extrabold shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/40'
                  : 'bg-[#0A1128] text-amber-300 border-amber-500/40 hover:bg-amber-950/40 hover:border-amber-400 shadow-sm'
              }`}
              title="Filter packages with confirmed departures departing within the next 15 days"
            >
              <Zap className={`w-3.5 h-3.5 ${onlyLastMinute ? 'text-slate-950 fill-slate-950' : 'text-amber-400 fill-amber-400'}`} />
              <span>⚡ Last Minute Availability (Next 15 Days)</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                onlyLastMinute ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {lastMinuteCount}
              </span>
              <span className={`w-2 h-2 rounded-full ${onlyLastMinute ? 'bg-slate-950' : 'bg-emerald-400 animate-ping'}`} />
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <button
              onClick={() => handleTierFilterChange('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedTierFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                  : 'bg-[#0A1128] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
              }`}
            >
              🏨 All Package Tiers
            </button>
            <button
              onClick={() => handleTierFilterChange('deluxe')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedTierFilter === 'deluxe'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                  : 'bg-[#0A1128] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
              }`}
            >
              🏡 Deluxe (Lodges & Cottages)
            </button>
            <button
              onClick={() => handleTierFilterChange('premium')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedTierFilter === 'premium'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                  : 'bg-[#0A1128] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
              }`}
            >
              ⭐ Premium (3-Star Hotels)
            </button>
            <button
              onClick={() => handleTierFilterChange('luxury')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedTierFilter === 'luxury'
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold border-cyan-300 shadow-md'
                  : 'bg-[#0A1128] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
              }`}
            >
              ✨ Luxury (4-Star Resorts)
            </button>
            <button
              onClick={() => handleTierFilterChange('shared')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedTierFilter === 'shared'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                  : 'bg-[#0A1128] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
              }`}
            >
              🚌 Shared Tours (Seat Basis)
            </button>
          </div>

          {/* Region Filter Pills & View All Button */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-[#0A1128] text-slate-300 hover:bg-[#0E1738] border border-slate-800'
                }`}
              >
                {cat === 'All' ? 'All Destinations' : cat}
              </button>
            ))}

            <button
              onClick={handleToggleViewAll}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                isViewAll
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 border-cyan-300 shadow-md'
                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-700/60 hover:bg-cyan-900/60'
              }`}
            >
              {isViewAll ? `✓ Showing All (${filteredPackages.length}) Packages` : `👁️ View All (${filteredPackages.length}) Packages`}
            </button>
          </div>

          {/* Duration Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>Duration:</span>
            </span>
            {durationFilters.map((dur) => (
              <button
                key={dur}
                onClick={() => {
                  setActiveDuration(dur);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                  activeDuration === dur
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm'
                    : 'bg-[#060B18] text-slate-300 hover:text-white hover:bg-slate-900 border-slate-800'
                }`}
              >
                {dur}
              </button>
            ))}
          </div>
        </div>

        {/* Last Minute Availability Active Notice Banner */}
        {onlyLastMinute && (
          <div className="bg-gradient-to-r from-amber-950/80 via-[#0A1128] to-amber-950/70 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black flex-shrink-0 shadow-md shadow-amber-500/30">
                <Zap className="w-5 h-5 fill-slate-950" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    ⚡ Immediate Himalayan Departures (Departing Next 15 Days)
                  </span>
                  <span className="bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold">
                    Pre-Blocked Cabs & Permits
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  Showing <strong>{filteredPackages.length} packages</strong> with locked hotel rooms & dedicated mountain 4WD/Innova cabs departing between <strong>Aug 20 – Sep 01, 2026</strong>. Instant confirmation and pre-arranged Nathula / North Sikkim permits included.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setOnlyLastMinute(false)}
                className="text-xs px-3.5 py-1.5 bg-[#060B18] text-slate-300 hover:text-white border border-slate-700 rounded-xl transition-colors font-medium"
              >
                Reset to All Packages
              </button>
            </div>
          </div>
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {displayPackages.map((pkg) => {
            const rawDeluxe = pkg.hotelTiers?.deluxe.price || Math.round(pkg.priceStarting * 0.85);
            const rawPremium = pkg.hotelTiers?.premium.price || pkg.priceStarting;
            const rawLuxury = pkg.hotelTiers?.luxury.price || Math.round(pkg.priceStarting * 1.55);

            // Group adjusted pricing
            const deluxePrice = calculateGroupPrice(rawDeluxe, currentGroupSize);
            const premiumPrice = calculateGroupPrice(rawPremium, currentGroupSize);
            const luxuryPrice = calculateGroupPrice(rawLuxury, currentGroupSize);
            const totalGroupEst = calculateTotalGroupCost(premiumPrice, currentGroupSize);

            const isCurrentItinerarySelected = activeItineraryId === pkg.id;

            return (
              <div
                key={pkg.id}
                className={`travel-card bg-[#0A1128] rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-between shadow-xl hover:border-cyan-500/50 transition-all duration-300 ${
                  isCurrentItinerarySelected ? 'border-cyan-400 ring-1 ring-cyan-400/40' : ''
                }`}
              >
                {/* Image Banner */}
                <div 
                  className="relative h-60 overflow-hidden cursor-pointer group/img"
                  onClick={() => setSelectedItineraryPkg(pkg)}
                  title="Click to view detailed itinerary & photos"
                >
                  <OptimizedImage
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/30 to-transparent pointer-events-none" />

                  {/* Duration & Group Badge */}
                  <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="bg-[#060B18]/90 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border border-cyan-500/30">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{pkg.duration}</span>
                      </div>

                      <div className="bg-cyan-950/90 text-cyan-300 px-2.5 py-1 rounded-full text-[11px] font-bold border border-cyan-500/40 backdrop-blur-md">
                        {activeGroupConfig.shortLabel}
                      </div>
                    </div>

                    {/* Last Minute Availability Image Pill */}
                    {pkg.isLastMinuteAvailable && (
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-black flex items-center gap-1 shadow-lg shadow-amber-950/70 border border-amber-300 animate-pulse">
                        <Zap className="w-3 h-3 fill-slate-950" />
                        <span>DEP: {pkg.lastMinuteDepartureDate} ({pkg.lastMinuteDepartureDaysAway}d left)</span>
                        {pkg.lastMinuteDiscountPercent && (
                          <span className="bg-slate-950 text-amber-300 px-1 rounded text-[9px] font-black ml-0.5">
                            {pkg.lastMinuteDiscountPercent}% OFF
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Rating Badge & Wishlist Heart */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(pkg.id, pkg.title);
                      }}
                      className={`p-1.5 rounded-full transition-all shadow-md ${
                        isInWishlist(pkg.id)
                          ? 'bg-rose-600 text-white scale-110'
                          : 'bg-[#060B18]/90 text-slate-300 hover:text-rose-400 hover:bg-[#060B18]'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(pkg.id) ? 'fill-white' : ''}`} />
                    </button>
                    <div className="bg-[#060B18]/90 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-cyan-500/30">
                      <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                      <span>{pkg.rating} ({pkg.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif font-bold text-lg text-white drop-shadow-md">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{pkg.location}</span>
                    </p>
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-xs">
                  {/* Tier Pricing Cards Adjusted for Group Size */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-400 uppercase tracking-wider block">
                        3 Hotel Tiers ({activeGroupConfig.label}):
                      </span>
                      {activeGroupConfig.savingsPercent > 0 && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-1.5 py-0.5 rounded">
                          {activeGroupConfig.badge}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-[#060B18] rounded-xl border border-slate-800">
                        <span className="text-[10px] block font-bold text-slate-400">DELUXE</span>
                        <span className="font-bold text-white block">₹{(deluxePrice || 0).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-2 bg-cyan-950/70 text-white rounded-xl border border-cyan-500/40">
                        <span className="text-[10px] block font-bold text-cyan-300">PREMIUM 3★</span>
                        <span className="font-bold text-white block">₹{(premiumPrice || 0).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-2 bg-[#060B18] rounded-xl border border-slate-800">
                        <span className="text-[10px] block font-bold text-cyan-400">LUXURY 4★</span>
                        <span className="font-bold text-white block">₹{(luxuryPrice || 0).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Last Minute Availability Info Strip */}
                  {pkg.isLastMinuteAvailable && (
                    <div className="p-2.5 bg-gradient-to-r from-amber-950/50 via-[#060B18] to-amber-950/30 border border-amber-500/40 rounded-xl space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                          <Timer className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>Departing: <strong>{pkg.lastMinuteDepartureDate}</strong> ({pkg.lastMinuteDepartureDaysAway}d left)</span>
                        </span>
                        <span className="text-[10px] font-bold text-rose-300 bg-rose-950/80 border border-rose-800 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                          <Flame className="w-3 h-3 text-rose-400" />
                          <span>{pkg.lastMinuteSeatsRemaining || 2} Slots Left</span>
                        </span>
                      </div>
                      {pkg.lastMinuteNote && (
                        <p className="text-[11px] text-slate-300 font-sans">
                          {pkg.lastMinuteNote}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Shared Tour Option if available */}
                  {pkg.isSharedTourAvailable && (
                    <div className="p-2.5 bg-[#060B18] border border-cyan-500/30 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="font-medium text-slate-200">Shared Tour Option Available</span>
                      </div>
                      <button
                        onClick={() => handleSharedInquiry(pkg.title, pkg.sharedPricePerSeat)}
                        className="text-[11px] font-bold text-[#25D366] hover:underline"
                      >
                        ₹{pkg.sharedPricePerSeat?.toLocaleString('en-IN') || 1200}/seat →
                      </button>
                    </div>
                  )}

                  {/* Key Highlights */}
                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Highlights:</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {pkg.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Footer & Actions */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-400 block">
                        Estimated ({activeGroupConfig.shortLabel})
                      </span>
                      <div className="flex items-baseline gap-1">
                        {activeGroupConfig.savingsPercent > 0 && (
                          <span className="text-xs text-slate-500 line-through">
                            ₹{(rawPremium || 0).toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-lg font-serif font-bold text-cyan-400">
                          ₹{(premiumPrice || 0).toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400">/person</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        Group Total: ₹{(totalGroupEst || 0).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => handleDownloadPackagePdf(pkg)}
                        disabled={downloadingPkgId === pkg.id}
                        className="text-[11px] px-2.5 py-1.5 bg-[#060B18] hover:bg-[#0E1738] text-cyan-300 font-semibold rounded-lg border border-cyan-500/30 shadow-sm flex items-center gap-1 transition-all cursor-pointer hover:border-cyan-400 disabled:opacity-50"
                        title="Download Formatted Itinerary PDF with full day plan & pricing"
                      >
                        <Download className={`w-3 h-3 ${downloadingPkgId === pkg.id ? 'animate-bounce text-cyan-400' : 'text-cyan-400'}`} />
                        <span>{downloadingPkgId === pkg.id ? 'Saving...' : 'PDF'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveItineraryId(pkg.id);
                          const el = document.getElementById('day-by-day-itinerary-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`text-[11px] px-2.5 py-1.5 rounded-lg font-medium border transition-colors flex items-center gap-1 ${
                          activeItineraryId === pkg.id
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-[#060B18] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
                        }`}
                        title="View Interactive Google Map Circuit & Day Plan"
                      >
                        <Compass className="w-3 h-3 text-cyan-400" />
                        <span>Circuit Map</span>
                      </button>

                      {onQuickBookPackage && (
                        <button
                          onClick={() => onQuickBookPackage(`${pkg.title} (${activeGroupConfig.label})`)}
                          className="text-[11px] px-2.5 py-1.5 bg-[#060B18] hover:bg-[#0E1738] text-white font-bold rounded-lg border border-cyan-500/40 shadow-sm flex items-center gap-1 transition-all"
                          title="Open Quick Booking Modal with selected itinerary summary"
                        >
                          <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                          <span>Quick Book</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedItineraryPkg(pkg)}
                        className="btn-luxury-cyan text-[11px] !py-1.5 !px-2.5"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls / View All Status */}
        {!isViewAll && totalPages > 1 ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0A1128] border border-slate-800 rounded-2xl shadow-sm">
            <div className="text-xs text-slate-400">
              Showing <strong>{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredPackages.length)}</strong> of <strong>{filteredPackages.length}</strong> packages
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  currentPage === 1
                    ? 'text-slate-600 border border-slate-800 cursor-not-allowed'
                    : 'bg-[#060B18] text-slate-300 border border-slate-700 hover:bg-[#0E1738]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === pageNum
                      ? 'bg-cyan-500 text-slate-950 font-extrabold'
                      : 'bg-[#060B18] text-slate-300 border border-slate-800 hover:bg-[#0E1738]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                  currentPage === totalPages
                    ? 'text-slate-600 border border-slate-800 cursor-not-allowed'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}

        {/* Day-by-Day Detailed Itinerary Section for active selected package */}
        <div id="day-by-day-itinerary-section" className="pt-8 scroll-mt-6">
          <div className="bg-[#0A1128] border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="editorial-eyebrow">DAY-WISE ITINERARY ROADMAP</span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  {featuredItineraryPackage.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {featuredItineraryPackage.duration} • {featuredItineraryPackage.location}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => handleDownloadPackagePdf(featuredItineraryPackage)}
                  disabled={downloadingPkgId === featuredItineraryPackage.id}
                  className="px-3.5 py-1.5 bg-[#060B18] hover:bg-[#0E1738] text-cyan-300 font-bold rounded-xl border border-cyan-500/40 text-xs flex items-center gap-1.5 shadow-sm transition-all hover:border-cyan-400 disabled:opacity-50"
                  title="Export this tour itinerary as a formatted PDF file"
                >
                  <Download className={`w-3.5 h-3.5 text-cyan-400 ${downloadingPkgId === featuredItineraryPackage.id ? 'animate-bounce' : ''}`} />
                  <span>{downloadingPkgId === featuredItineraryPackage.id ? 'Saving...' : 'Export PDF'}</span>
                </button>
                <div className="flex items-center gap-1.5 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  <span className="text-xs text-slate-400">Route for:</span>
                  <span className="text-xs font-bold text-cyan-300">
                    {activeGroupConfig.label} ({activeGroupConfig.paxLabel})
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Route Journey Map */}
            <div className="space-y-2">
              <RouteMapVisualization selectedRoute={featuredItineraryPackage.title} compactMode={false} />
            </div>

            {/* Day by Day List */}
            <div className="space-y-4 pt-2">
              {featuredItineraryPackage.itinerary.map((dayItem) => {
                const milestones = getDayMilestones(dayItem.title, dayItem.description);
                return (
                  <div
                    key={dayItem.day}
                    className="p-5 bg-[#060B18] border border-slate-800/90 rounded-xl space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                          {dayItem.day}
                        </span>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-white">
                          {dayItem.title}
                        </h4>
                      </div>

                      <span className="text-[11px] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-medium">
                        Day {dayItem.day} of {featuredItineraryPackage.itinerary.length}
                      </span>
                    </div>

                    {milestones.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {milestones.map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-[#0A1128] text-slate-300 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1"
                          >
                            <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                            <span>{m}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans pt-1">
                      {dayItem.description}
                    </p>

                    {/* Day Inclusions & Stay Footer */}
                    <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                          <strong className="text-white">Overnight Stay:</strong> {dayItem.title.includes('Darjeeling') ? 'Darjeeling' : dayItem.title.includes('Lachung') ? 'Lachung' : dayItem.title.includes('Pelling') ? 'Pelling' : 'Gangtok'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Utensils className="w-3.5 h-3.5 text-cyan-400" />
                          <strong className="text-white">Meals:</strong> Breakfast & Dinner
                        </span>
                      </div>

                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/70 px-2 py-0.5 rounded-md border border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Driver & Fuel Covered</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-300 font-medium">
                  Need custom adjustments or dates modification for your {activeGroupConfig.label}?
                </p>
                <p className="text-[11px] text-slate-400">
                  Our local Gangtok coordinator can personalize vehicle allocations and hotel stays for your group size.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleDownloadPackagePdf(featuredItineraryPackage)}
                  disabled={downloadingPkgId === featuredItineraryPackage.id}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer hover:border-cyan-400 disabled:opacity-50"
                  title="Download complete formatted itinerary PDF document"
                >
                  <Download className={`w-4 h-4 text-cyan-400 ${downloadingPkgId === featuredItineraryPackage.id ? 'animate-bounce' : ''}`} />
                  <span>{downloadingPkgId === featuredItineraryPackage.id ? 'Generating PDF Document...' : 'Download PDF Itinerary'}</span>
                </button>

                <button
                  onClick={() => onOpenAIChatWithPackage(`${featuredItineraryPackage.title} (${activeGroupConfig.label})`)}
                  className="btn-luxury-cyan text-xs !py-2.5 !px-4"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Customize Day Plan With AI</span>
                </button>

                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                    `Namaste! I want to book/inquire about the day-by-day itinerary for "${featuredItineraryPackage.title}" for a ${activeGroupConfig.label} (${activeGroupConfig.paxLabel}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-outline text-xs !py-2.5 !px-4"
                >
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Day-Wise Itinerary & Hotel Tier Modal */}
      <AnimatePresence>
        {selectedItineraryPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedItineraryPkg(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative bg-[#0A1128] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl z-10 space-y-6 text-slate-100"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4 gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-950 bg-cyan-400 px-2.5 py-0.5 rounded">
                      {selectedItineraryPkg.duration}
                    </span>
                    <span className="text-xs font-bold text-cyan-300 bg-[#060B18] px-2.5 py-0.5 rounded border border-cyan-500/30">
                      Rates calculated for {activeGroupConfig.label} ({activeGroupConfig.paxLabel})
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mt-2">
                    {selectedItineraryPkg.title}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {selectedItineraryPkg.location}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedItineraryPkg(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Last Minute Availability Alert inside Modal */}
              {selectedItineraryPkg.isLastMinuteAvailable && (
                <div className="p-3.5 bg-gradient-to-r from-amber-950/80 via-[#060B18] to-amber-950/60 rounded-xl border border-amber-500/50 space-y-2 text-xs shadow-lg shadow-amber-950/50">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-amber-500 text-slate-950 font-black flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5 fill-slate-950" />
                      </span>
                      <span className="font-bold text-amber-300">
                        Immediate Departure: <strong>{selectedItineraryPkg.lastMinuteDepartureDate}</strong> ({selectedItineraryPkg.lastMinuteDepartureDaysAway} days away)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {selectedItineraryPkg.lastMinuteDiscountPercent && (
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded text-[10px] font-black">
                          {selectedItineraryPkg.lastMinuteDiscountPercent}% INSTANT OFF
                        </span>
                      )}
                      <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-400" />
                        <span>Only {selectedItineraryPkg.lastMinuteSeatsRemaining || 2} Slots Left</span>
                      </span>
                    </div>
                  </div>

                  {selectedItineraryPkg.lastMinuteNote && (
                    <p className="text-[11px] text-slate-300 font-sans">
                      {selectedItineraryPkg.lastMinuteNote}
                    </p>
                  )}

                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                        `Namaste! I want to instantly book the LAST MINUTE departure on ${selectedItineraryPkg.lastMinuteDepartureDate} for "${selectedItineraryPkg.title}" (${activeGroupConfig.label} - ${activeModalTier.toUpperCase()}). Please confirm cab and permit availability.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Lock Last-Minute Departure via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Group Size Selector inside Modal */}
              <div className="p-3 bg-[#060B18] rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Group Configuration:</span>
                  </span>
                  <span className="text-[11px] text-cyan-400 font-semibold">{activeGroupConfig.badge || activeGroupConfig.paxLabel}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['solo', 'couple', 'family', 'large_group'] as GroupSizeOption[]).map((size) => {
                    const cfg = GROUP_SIZE_CONFIGS[size];
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleGroupSizeChange(size)}
                        className={`p-1.5 rounded-lg text-center border transition-all text-xs ${
                          currentGroupSize === size
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                            : 'bg-[#0A1128] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
                        }`}
                      >
                        <span className="block text-[11px] truncate">{cfg.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-slate-400 pt-1">
                  🚗 <strong>Vehicle:</strong> {activeGroupConfig.vehicleType} • 🏨 <strong>Stay:</strong> {activeGroupConfig.roomsDescription}
                </p>
              </div>

              {/* Tier Selection */}
              <div className="p-4 bg-[#060B18] rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white block">
                  Select Hotel Accommodation Category:
                </span>

                {(() => {
                  const mBaseDeluxe = selectedItineraryPkg.hotelTiers?.deluxe?.price || (selectedItineraryPkg.priceStarting ? Math.round(selectedItineraryPkg.priceStarting * 0.85) : 0);
                  const mBasePremium = selectedItineraryPkg.hotelTiers?.premium?.price || selectedItineraryPkg.priceStarting || 0;
                  const mBaseLuxury = selectedItineraryPkg.hotelTiers?.luxury?.price || (selectedItineraryPkg.priceStarting ? Math.round(selectedItineraryPkg.priceStarting * 1.55) : 0);

                  const mDeluxePrice = calculateGroupPrice(mBaseDeluxe, currentGroupSize);
                  const mPremiumPrice = calculateGroupPrice(mBasePremium, currentGroupSize);
                  const mLuxuryPrice = calculateGroupPrice(mBaseLuxury, currentGroupSize);

                  return (
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setActiveModalTier('deluxe')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          activeModalTier === 'deluxe'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-[#0A1128] border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-bold block uppercase">Deluxe</span>
                        <span className="text-sm font-bold block">
                          ₹{mDeluxePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-slate-400 block font-normal">
                          Total: ₹{calculateTotalGroupCost(mDeluxePrice, currentGroupSize).toLocaleString('en-IN')}
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveModalTier('premium')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          activeModalTier === 'premium'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-[#0A1128] border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-bold block uppercase">Premium 3★</span>
                        <span className="text-sm font-bold block">
                          ₹{mPremiumPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-slate-400 block font-normal">
                          Total: ₹{calculateTotalGroupCost(mPremiumPrice, currentGroupSize).toLocaleString('en-IN')}
                        </span>
                      </button>

                      <button
                        onClick={() => setActiveModalTier('luxury')}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          activeModalTier === 'luxury'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                            : 'bg-[#0A1128] border-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-bold block uppercase">Luxury 4★</span>
                        <span className="text-sm font-bold block">
                          ₹{mLuxuryPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] text-slate-400 block font-normal">
                          Total: ₹{calculateTotalGroupCost(mLuxuryPrice, currentGroupSize).toLocaleString('en-IN')}
                        </span>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Interactive Route Journey Map */}
              <div className="space-y-2">
                <RouteMapVisualization selectedRoute={selectedItineraryPkg.title} compactMode={false} />
              </div>

              {/* Day-by-Day List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Detailed Day-by-Day Plan
                </h4>

                <div className="space-y-3">
                  {selectedItineraryPkg.itinerary.map((day) => {
                    const milestones = getDayMilestones(day.title, day.description);

                    return (
                      <div key={day.day} className="p-4 bg-[#060B18] rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded">
                            DAY {day.day}
                          </span>
                          <h5 className="font-serif font-bold text-white text-sm">{day.title}</h5>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {milestones.map((m, idx) => (
                            <span key={idx} className="text-[10px] bg-[#0A1128] text-slate-300 px-2 py-0.5 rounded-md border border-slate-800">
                              • {m}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                          {day.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedItineraryPkg(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleDownloadPackagePdf(selectedItineraryPkg, activeModalTier)}
                    disabled={downloadingPkgId === selectedItineraryPkg.id}
                    className="px-3.5 py-2 bg-[#060B18] hover:bg-[#0E1738] text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer hover:border-cyan-400 disabled:opacity-50"
                    title="Download complete formatted itinerary PDF document"
                  >
                    <Download className={`w-4 h-4 text-cyan-400 ${downloadingPkgId === selectedItineraryPkg.id ? 'animate-bounce' : ''}`} />
                    <span>{downloadingPkgId === selectedItineraryPkg.id ? 'Generating PDF...' : 'Download PDF Itinerary'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const title = `${selectedItineraryPkg.title} (${activeGroupConfig.label} - ${activeModalTier.toUpperCase()})`;
                      setSelectedItineraryPkg(null);
                      onOpenAIChatWithPackage(title);
                    }}
                    className="btn-luxury-cyan text-xs !py-2 !px-4 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Get Customized Quote</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PDF Download Toast Notification */}
      <AnimatePresence>
        {pdfSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-slate-950/95 border border-cyan-500/60 text-slate-100 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 max-w-md"
          >
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/40 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>Itinerary PDF Ready & Downloaded</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700/60 px-1.5 py-0.5 rounded font-mono">
                  Official PDF
                </span>
              </div>
              <p className="text-slate-300 line-clamp-1">{pdfSuccessMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

