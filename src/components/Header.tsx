import React, { useState, useRef, useEffect } from 'react';
import { Phone, Star, ShieldCheck, MapPin, Code2, Sparkles, MessageCircle, Wand2, Menu, X, ChevronRight, ChevronDown, Package, Car, Database, ArrowRight, Building2, Rocket, CloudUpload, Heart } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';
import { TourPackage, CabOption, NavigationItem, HotelItem } from '../types';
import { ConsoleTab } from './OwnerDashboardModal';
import { Logo } from './Logo';
import { useWishlist } from '../utils/wishlistContext';
import { OptimizedImage } from './ui/OptimizedImage';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHostingerGuide: () => void;
  onOpenOwnerDashboard: (tab?: ConsoleTab) => void;
  onOpenAIPlanner: () => void;
  onOpenPhotoEditor: () => void;
  leadsCount: number;
  packages?: TourPackage[];
  cabs?: CabOption[];
  hotels?: HotelItem[];
  agencyDetails?: any;
  onOpenChatWithContext?: (ctxTitle: string) => void;
}

const DEFAULT_DB_NAV_ITEMS: NavigationItem[] = [
  { id: 'nav-home', label: 'Home', tabId: 'home', hasDropdown: false, active: true, order: 0 },
  { id: 'nav-packages', label: 'Tour Packages', tabId: 'packages', hasDropdown: true, dropdownType: 'packages', active: true, order: 1 },
  { id: 'nav-cabs', label: 'Cab Rentals', tabId: 'cabs', hasDropdown: true, dropdownType: 'cabs', active: true, order: 2 },
  { id: 'nav-hotels', label: 'Hotels', tabId: 'hotels', hasDropdown: true, dropdownType: 'hotels', active: true, order: 3 },
  { id: 'nav-jain-hotels', label: 'Jain Group Hotels', tabId: 'jain-hotels', hasDropdown: true, dropdownType: 'hotels', active: true, order: 4, badgeText: 'Pure Veg' },
  { id: 'nav-blog', label: 'Travel Blog', tabId: 'blog', hasDropdown: false, active: true, order: 5, badgeText: 'Stories' },
  { id: 'nav-admin', label: 'Admin Console', tabId: 'admin', hasDropdown: false, active: true, order: 6, badgeText: 'Admin' },
  { id: 'nav-gallery', label: 'Gallery', tabId: 'gallery', hasDropdown: false, active: true, order: 7 },
  { id: 'nav-reviews', label: 'Reviews', tabId: 'reviews', hasDropdown: false, active: true, order: 8 },
  { id: 'nav-faqs', label: 'FAQ', tabId: 'faqs', hasDropdown: false, active: true, order: 9 },
  { id: 'nav-about', label: 'About', tabId: 'about', hasDropdown: false, active: true, order: 10 },
  { id: 'nav-contact', label: 'Contact', tabId: 'contact', hasDropdown: false, active: true, order: 11 },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenHostingerGuide,
  onOpenOwnerDashboard,
  onOpenAIPlanner,
  onOpenPhotoEditor,
  leadsCount,
  packages = [],
  cabs = [],
  hotels = [],
  agencyDetails,
  onOpenChatWithContext,
}) => {
  const { wishlistIds } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'packages' | 'cabs' | 'hotels' | 'jain-hotels' | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<'packages' | 'cabs' | 'hotels' | 'jain-hotels' | null>(null);
  const [dbNavItems, setDbNavItems] = useState<NavigationItem[]>(DEFAULT_DB_NAV_ITEMS);
  const [dbHotels, setDbHotels] = useState<HotelItem[]>([]);
  const [totalReviewsCount, setTotalReviewsCount] = useState<number>(agencyDetails?.totalReviews || AGENCY_DETAILS.totalReviews || 542);

  useEffect(() => {
    let isMounted = true;
    const loadDbNavigation = async () => {
      try {
        const res = await fetch('/api/navigation');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setDbNavItems(data);
          }
        }
      } catch (err) {
        console.error('Failed to load database navigation links in header:', err);
      }
    };
    const loadDbHotels = async () => {
      try {
        const res = await fetch('/api/hotels');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setDbHotels(data);
          }
        }
      } catch (err) {
        console.error('Failed to load database hotels in header:', err);
      }
    };
    const loadReviewsCount = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            const baseCount = agencyDetails?.totalReviews || AGENCY_DETAILS.totalReviews || 542;
            setTotalReviewsCount(Math.max(baseCount, 500 + data.length));
          }
        }
      } catch (err) {
        // Graceful fallback to verified base count
      }
    };
    loadDbNavigation();
    loadDbHotels();
    loadReviewsCount();
    return () => {
      isMounted = false;
    };
  }, [agencyDetails?.totalReviews]);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentAgency = agencyDetails || AGENCY_DETAILS;
  const effectiveHotels = hotels && hotels.length > 0 ? hotels : dbHotels;

  const handleNavClick = (tabId: string) => {
    if (tabId === 'admin') {
      onOpenOwnerDashboard('kpis');
    } else {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleMouseEnter = (type: 'packages' | 'cabs' | 'hotels' | 'jain-hotels') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(type);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const navItems = dbNavItems
    .filter((item) => item.active)
    .sort((a, b) => a.order - b.order);

  return (
    <header className="sticky top-0 z-40 bg-[#060B18] text-[#F8FAFC] border-b border-slate-800/80 shadow-md backdrop-blur-md">
      {/* Top Utility Bar */}
      <div className="bg-[#0A1128] px-4 py-1.5 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1 text-cyan-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              {currentAgency.govtRegistration ? currentAgency.govtRegistration.split('(')[0] : AGENCY_DETAILS.govtRegistration.split('(')[0]}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              {currentAgency.rating || AGENCY_DETAILS.rating}★ Google Rating (540+ Verified Reviews)
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {currentAgency.location || AGENCY_DETAILS.location}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <a
              href={`tel:${(currentAgency.phonePrimary || AGENCY_DETAILS.phonePrimary).replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 text-[#F8FAFC] hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentAgency.phonePrimary || AGENCY_DETAILS.phonePrimary}</span>
            </a>
            <a
              href={`https://wa.me/${currentAgency.whatsappNumber || AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20want%20to%20plan%20a%20trip%20to%20Sikkim.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 px-2.5 py-1 rounded text-[11px] font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Official Brand Logo */}
        <div
          id="btn-header-logo"
          className="cursor-pointer group flex-shrink-0 flex items-center max-h-10 sm:max-h-12 md:max-h-14 transition-all duration-300 ease-in-out"
          onClick={() => handleNavClick('home')}
        >
          <Logo
            variant="light"
            size="md"
            className="max-h-10 sm:max-h-12 md:max-h-14 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 py-1 relative">
          {navItems.map((tab) => {
            const isPackages = tab.dropdownType === 'packages' || tab.tabId === 'packages';
            const isCabs = tab.dropdownType === 'cabs' || tab.tabId === 'cabs';

            if (isPackages) {
              return (
                <div
                  key={tab.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('packages')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleNavClick(tab.tabId || 'packages')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
                      activeTab === (tab.tabId || 'packages')
                        ? 'bg-[#0E1738] text-cyan-300 font-bold border-b-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {packages.length > 0 && (
                      <span className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                        {packages.length}
                      </span>
                    )}
                    <ChevronDown className={`w-3 h-3 text-cyan-400 transition-transform duration-200 ${openDropdown === 'packages' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown for Tour Packages loaded dynamically from Database State */}
                  {openDropdown === 'packages' && (
                    <div className="absolute top-full left-0 w-80 bg-[#0A1128] border border-cyan-500/40 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn mt-1 text-slate-100">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                          <Package className="w-4 h-4 text-cyan-400" />
                          <span>Database Tour Packages</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-700/50">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                          Live DB
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                        {packages.slice(0, 5).map((pkg) => (
                          <div
                            key={pkg.id}
                            onClick={() => {
                              handleNavClick('packages');
                              if (onOpenChatWithContext) {
                                onOpenChatWithContext(`Package Details: ${pkg.title}`);
                              }
                            }}
                            className="group/item flex items-center justify-between p-2 hover:bg-[#0E1738] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-cyan-500/30"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              {pkg.heroImage ? (
                                <OptimizedImage
                                  src={pkg.heroImage}
                                  alt={pkg.title}
                                  className="w-9 h-9 rounded object-cover flex-shrink-0 border border-slate-700"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 text-cyan-400">
                                  <Package className="w-4 h-4" />
                                </div>
                              )}
                              <div className="truncate">
                                <h4 className="text-xs font-semibold text-slate-100 group-hover/item:text-cyan-300 truncate">
                                  {pkg.title}
                                </h4>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {pkg.duration} • {pkg.category}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-xs font-extrabold text-cyan-400 block">
                                ₹{pkg.priceStarting ? pkg.priceStarting.toLocaleString('en-IN') : 'N/A'}
                              </span>
                              <span className="text-[9px] text-slate-400 block">per adult</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => handleNavClick('packages')}
                          className="text-cyan-300 hover:text-white font-bold flex items-center gap-1 text-[11px] transition-colors"
                        >
                          <span>All {packages.length} Packages</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setOpenDropdown(null);
                            onOpenOwnerDashboard('packages');
                          }}
                          className="bg-[#0E1738] hover:bg-[#15224F] text-cyan-300 px-2 py-1 rounded text-[10px] font-bold border border-cyan-500/40 flex items-center gap-1 transition-all"
                        >
                          <ShieldCheck className="w-3 h-3 text-cyan-400" />
                          <span>CMS Admin</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (isCabs) {
              return (
                <div
                  key={tab.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('cabs')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleNavClick(tab.tabId || 'cabs')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
                      activeTab === (tab.tabId || 'cabs')
                        ? 'bg-[#0E1738] text-cyan-300 font-bold border-b-2 border-cyan-400'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {cabs.length > 0 && (
                      <span className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                        {cabs.length}
                      </span>
                    )}
                    <ChevronDown className={`w-3 h-3 text-cyan-400 transition-transform duration-200 ${openDropdown === 'cabs' ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown for Cab Rentals loaded dynamically from Database State */}
                  {openDropdown === 'cabs' && (
                    <div className="absolute top-full left-0 w-80 bg-[#0A1128] border border-cyan-500/40 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn mt-1 text-slate-100">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                          <Car className="w-4 h-4 text-cyan-400" />
                          <span>Database Vehicle Fleet</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-700/50">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
                          Live Rates
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                        {cabs.slice(0, 5).map((cab) => (
                          <div
                            key={cab.id}
                            onClick={() => {
                              handleNavClick('cabs');
                              if (onOpenChatWithContext) {
                                onOpenChatWithContext(`Cab Rental: ${cab.model}`);
                              }
                            }}
                            className="group/item flex items-center justify-between p-2 hover:bg-[#0E1738] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-cyan-500/30"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              {cab.image ? (
                                <OptimizedImage
                                  src={cab.image}
                                  alt={cab.model}
                                  className="w-9 h-9 rounded object-cover flex-shrink-0 border border-slate-700"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 text-cyan-400">
                                  <Car className="w-4 h-4" />
                                </div>
                              )}
                              <div className="truncate">
                                <h4 className="text-xs font-semibold text-slate-100 group-hover/item:text-cyan-300 truncate">
                                  {cab.model}
                                </h4>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {cab.capacity} • {cab.type}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-xs font-extrabold text-cyan-400 block">
                                ₹{cab.ratePerDay ? cab.ratePerDay.toLocaleString('en-IN') : 'N/A'}
                              </span>
                              <span className="text-[9px] text-slate-400 block">per day</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => handleNavClick('cabs')}
                          className="text-cyan-300 hover:text-white font-bold flex items-center gap-1 text-[11px] transition-colors"
                        >
                          <span>All {cabs.length} Vehicles</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setOpenDropdown(null);
                            onOpenOwnerDashboard('cabs');
                          }}
                          className="bg-[#0E1738] hover:bg-[#15224F] text-cyan-300 px-2 py-1 rounded text-[10px] font-bold border border-cyan-500/40 flex items-center gap-1 transition-all"
                        >
                          <ShieldCheck className="w-3 h-3 text-cyan-400" />
                          <span>Fleet CMS</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const isHotels = tab.dropdownType === 'hotels' || tab.tabId === 'hotels' || tab.tabId === 'jain-hotels';
            if (isHotels) {
              const dropdownKey = tab.tabId === 'jain-hotels' ? 'jain-hotels' : 'hotels';
              const isJainTab = tab.tabId === 'jain-hotels';
              const isExpanded = openDropdown === dropdownKey;

              const displayedHotels = isJainTab
                ? effectiveHotels.filter(
                    (h) =>
                      h.name.toLowerCase().includes('jain') ||
                      h.amenities?.some((a) => a.toLowerCase().includes('jain') || a.toLowerCase().includes('pure veg'))
                  ).length > 0
                  ? effectiveHotels.filter(
                      (h) =>
                        h.name.toLowerCase().includes('jain') ||
                        h.amenities?.some((a) => a.toLowerCase().includes('jain') || a.toLowerCase().includes('pure veg'))
                    )
                  : effectiveHotels
                : effectiveHotels;

              return (
                <div
                  key={tab.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(dropdownKey)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => handleNavClick(tab.tabId || 'hotels')}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
                      activeTab === (tab.tabId || 'hotels')
                        ? 'bg-[#153451] text-[#D9BC7A] font-bold border-b-2 border-[#C6A15B]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badgeText ? (
                      <span className="bg-[#C6A15B]/20 border border-[#C6A15B]/60 text-[#D9BC7A] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                        {tab.badgeText}
                      </span>
                    ) : displayedHotels.length > 0 ? (
                      <span className="bg-[#153451] border border-[#C6A15B]/40 text-[#D9BC7A] px-1.5 py-0.2 rounded-full text-[10px] font-bold">
                        {displayedHotels.length}
                      </span>
                    ) : null}
                    <ChevronDown
                      className={`w-3 h-3 text-[#C6A15B] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown for Hotel Listings loaded dynamically from Database */}
                  {isExpanded && (
                    <div className="absolute top-full left-0 w-80 bg-[#071A2D] border border-[#C6A15B]/40 rounded-xl shadow-2xl p-3 z-50 animate-fadeIn mt-1 text-slate-100">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[#D9BC7A]">
                          <Building2 className="w-4 h-4 text-[#C6A15B]" />
                          <span>{isJainTab ? 'Jain Group Pure Veg Stays' : 'Database Hotel Listings'}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-700/50">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                          {isJainTab ? 'Pure Veg' : 'Live DB'}
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                        {displayedHotels.slice(0, 5).map((hotel) => (
                          <div
                            key={hotel.id}
                            onClick={() => {
                              handleNavClick(tab.tabId);
                              if (onOpenChatWithContext) {
                                onOpenChatWithContext(`Hotel Inquiry: ${hotel.name} (${hotel.destination})`);
                              }
                            }}
                            className="group/item flex items-center justify-between p-2 hover:bg-[#153451] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[#C6A15B]/30"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              {hotel.image ? (
                                <OptimizedImage
                                  src={hotel.image}
                                  alt={hotel.name}
                                  className="w-9 h-9 rounded object-cover flex-shrink-0 border border-slate-700"
                                />
                              ) : (
                                <div className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center flex-shrink-0 text-[#C6A15B]">
                                  <Building2 className="w-4 h-4" />
                                </div>
                              )}
                              <div className="truncate">
                                <h4 className="text-xs font-semibold text-slate-100 group-hover/item:text-[#D9BC7A] truncate">
                                  {hotel.name}
                                </h4>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {hotel.destination} • {hotel.category}
                                </p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-xs font-extrabold text-[#D9BC7A] block">
                                ₹{hotel.basePricePerNight ? hotel.basePricePerNight.toLocaleString('en-IN') : 'N/A'}
                              </span>
                              <span className="text-[9px] text-slate-400 block">per night</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => handleNavClick(tab.tabId)}
                          className="text-[#D9BC7A] hover:text-white font-bold flex items-center gap-1 text-[11px] transition-colors"
                        >
                          <span>{isJainTab ? 'View Jain Hotels' : `All ${displayedHotels.length} Hotels`}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setOpenDropdown(null);
                            onOpenOwnerDashboard('hotels');
                          }}
                          className="bg-[#153451] hover:bg-[#1f476e] text-[#D9BC7A] px-2 py-1 rounded text-[10px] font-bold border border-[#C6A15B]/40 flex items-center gap-1 transition-all"
                        >
                          <ShieldCheck className="w-3 h-3 text-[#C6A15B]" />
                          <span>Hotels CMS</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.tabId)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === tab.tabId
                    ? 'bg-[#153451] text-[#D9BC7A] font-bold border-b-2 border-[#C6A15B]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badgeText && (
                  <span className="bg-[#C6A15B]/20 border border-[#C6A15B]/60 text-[#D9BC7A] text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                    {tab.badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Dynamic 'Verified 500+ Reviews' Trust Badge next to booking button */}
          <button
            id="header-trust-badge-reviews"
            onClick={() => handleNavClick('reviews')}
            className="group hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0A1628]/95 hover:bg-[#11243E] border border-amber-400/50 hover:border-amber-400 text-amber-300 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
            title={`Click to view ${totalReviewsCount >= 500 ? '500+' : `${totalReviewsCount}+`} Verified Google & Traveler Reviews (${currentAgency.rating || 4.9}★)`}
          >
            <div className="flex items-center gap-1">
              <span className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </span>
              <span className="font-bold text-white text-[11px] sm:text-xs">
                {currentAgency.rating || 4.9}★
              </span>
            </div>
            <span className="w-1 h-1 rounded-full bg-amber-400/60 hidden md:inline-block" />
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-amber-200 group-hover:text-amber-100 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified {totalReviewsCount >= 500 ? '500+' : `${totalReviewsCount}+`} Reviews</span>
            </span>
          </button>

          <button
            id="btn-header-plan-journey"
            onClick={() => handleNavClick('contact')}
            className="btn-luxury-gold text-xs !py-1.5 !px-3 hidden sm:inline-flex"
          >
            <span>Plan Journey</span>
          </button>

          <button
            onClick={onOpenAIPlanner}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#153451] hover:bg-[#1f476e] text-[#D9BC7A] border border-[#C6A15B]/30 rounded text-xs font-semibold transition-all"
            title="AI Travel Planner"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="hidden md:inline">AI Planner</span>
          </button>

          <button
            onClick={() => handleNavClick('packages')}
            className="relative inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#153451] hover:bg-[#1f476e] text-rose-300 border border-rose-500/30 rounded text-xs font-semibold transition-all"
            title="Saved Wishlist Packages"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span className="hidden lg:inline">Saved</span>
            {wishlistIds.length > 0 && (
              <span className="bg-rose-500 text-white font-extrabold px-1.5 py-0.2 rounded-full text-[10px]">
                {wishlistIds.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onOpenOwnerDashboard('kpis')}
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#153451] hover:bg-[#1f476e] text-[#D9BC7A] rounded-lg text-xs font-bold border border-[#C6A15B]/50 transition-all shadow-sm hover:border-[#C6A15B]"
            title="Admin Console - Access Restricted to Authorized Users"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span className="hidden sm:inline">Admin Console</span>
            <span className="sm:hidden">Admin</span>
            {leadsCount > 0 && (
              <span className="bg-[#C6A15B] text-[#071A2D] font-extrabold px-1.5 py-0.2 rounded-full text-[10px]">
                {leadsCount}
              </span>
            )}
          </button>

          {/* Automatic Hostinger Deploy Button */}
          <button
            onClick={onOpenHostingerGuide}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 hover:from-purple-900 hover:to-indigo-900 text-purple-200 border border-purple-500/50 hover:border-purple-400 rounded-lg text-xs font-bold transition-all shadow-md active:scale-95 group"
            title="Automatic Hostinger Server & AI Deployment Engine"
          >
            <Rocket className="w-3.5 h-3.5 text-purple-400 group-hover:animate-bounce shrink-0" />
            <span className="hidden xl:inline">Auto Hostinger Deploy</span>
            <span className="xl:hidden hidden sm:inline">Hostinger Deploy</span>
            <span className="bg-purple-500/30 text-purple-200 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold border border-purple-400/40">
              AUTO
            </span>
          </button>

          {/* Tools Menu Icons for Admin/Developer */}
          <button
            onClick={onOpenPhotoEditor}
            className="hidden sm:inline-flex items-center gap-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded text-xs transition-all"
            title="Photo Editor & Watermark Tool"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#C6A15B]" />
          </button>

          {/* Mobile Hamburger Toggle Button (Screenshot matched circular dark pill with 2 lines) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#0A1128] border border-slate-800 flex items-center justify-center text-white hover:border-cyan-500/50 shadow-md transition-all active:scale-95"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-cyan-400" />
            ) : (
              <div className="flex flex-col gap-1 items-center justify-center">
                <span className="w-4 h-0.5 bg-slate-200 rounded-full block"></span>
                <span className="w-4 h-0.5 bg-slate-200 rounded-full block"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 top-[90px] sm:top-[98px] z-50 bg-[#060B18]/98 backdrop-blur-xl border-t border-slate-800 p-5 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <Logo
                variant="light"
                size="sm"
                className="max-h-9 sm:max-h-10 transition-all duration-300 ease-in-out"
              />
              <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
                Live Support
              </span>
            </div>

            <nav className="grid grid-cols-1 gap-1">
              {navItems.map((tab) => {
                const isPackages = tab.dropdownType === 'packages' || tab.tabId === 'packages';
                const isCabs = tab.dropdownType === 'cabs' || tab.tabId === 'cabs';

                if (isPackages) {
                  const isExpanded = mobileExpandedSection === 'packages';
                  return (
                    <div key={tab.id} className="space-y-1">
                      <div
                        onClick={() => handleNavClick(tab.tabId || 'packages')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          activeTab === (tab.tabId || 'packages')
                            ? 'bg-[#153451] text-[#D9BC7A] border-l-4 border-[#C6A15B]'
                            : 'text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{tab.label}</span>
                          <span className="bg-[#153451] border border-[#C6A15B]/50 text-[#D9BC7A] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                            {packages.length} DB
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileExpandedSection(isExpanded ? null : 'packages');
                            }}
                            className="p-1 hover:bg-white/10 rounded text-[#C6A15B]"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Mobile Packages List */}
                      {isExpanded && (
                        <div className="pl-4 pr-2 py-2 space-y-1.5 bg-[#0B1F3A]/60 rounded-lg border border-[#C6A15B]/20">
                          {packages.slice(0, 4).map((pkg) => (
                            <div
                              key={pkg.id}
                              onClick={() => {
                                handleNavClick('packages');
                                if (onOpenChatWithContext) {
                                  onOpenChatWithContext(`Package: ${pkg.title}`);
                                }
                              }}
                              className="flex items-center justify-between p-2 rounded hover:bg-white/5 text-xs text-slate-200 cursor-pointer"
                            >
                              <span className="truncate pr-2">{pkg.title}</span>
                              <span className="text-[#D9BC7A] font-bold flex-shrink-0">
                                ₹{pkg.priceStarting ? pkg.priceStarting.toLocaleString('en-IN') : ''}
                              </span>
                            </div>
                          ))}
                          <div className="pt-1 flex items-center justify-between text-[11px]">
                            <button
                              onClick={() => handleNavClick('packages')}
                              className="text-[#D9BC7A] font-bold"
                            >
                              View All Packages ({packages.length}) →
                            </button>
                            <button
                              onClick={() => {
                                setMobileMenuOpen(false);
                                onOpenOwnerDashboard('packages');
                              }}
                              className="text-xs text-emerald-400 font-bold flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>CMS</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                if (isCabs) {
                  const isExpanded = mobileExpandedSection === 'cabs';
                  return (
                    <div key={tab.id} className="space-y-1">
                      <div
                        onClick={() => handleNavClick(tab.tabId || 'cabs')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          activeTab === (tab.tabId || 'cabs')
                            ? 'bg-[#153451] text-[#D9BC7A] border-l-4 border-[#C6A15B]'
                            : 'text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{tab.label}</span>
                          <span className="bg-[#153451] border border-[#C6A15B]/50 text-[#D9BC7A] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                            {cabs.length} Fleet
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileExpandedSection(isExpanded ? null : 'cabs');
                            }}
                            className="p-1 hover:bg-white/10 rounded text-[#C6A15B]"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Mobile Cab List */}
                      {isExpanded && (
                        <div className="pl-4 pr-2 py-2 space-y-1.5 bg-[#0B1F3A]/60 rounded-lg border border-[#C6A15B]/20">
                          {cabs.slice(0, 4).map((cab) => (
                            <div
                              key={cab.id}
                              onClick={() => {
                                handleNavClick('cabs');
                                if (onOpenChatWithContext) {
                                  onOpenChatWithContext(`Cab: ${cab.model}`);
                                }
                              }}
                              className="flex items-center justify-between p-2 rounded hover:bg-white/5 text-xs text-slate-200 cursor-pointer"
                            >
                              <span className="truncate pr-2">{cab.model} ({cab.capacity})</span>
                              <span className="text-[#D9BC7A] font-bold flex-shrink-0">
                                ₹{cab.ratePerDay ? cab.ratePerDay.toLocaleString('en-IN') : ''}/day
                              </span>
                            </div>
                          ))}
                          <div className="pt-1 flex items-center justify-between text-[11px]">
                            <button
                              onClick={() => handleNavClick('cabs')}
                              className="text-[#D9BC7A] font-bold"
                            >
                              View All Vehicles ({cabs.length}) →
                            </button>
                            <button
                              onClick={() => {
                                setMobileMenuOpen(false);
                                onOpenOwnerDashboard('cabs');
                              }}
                              className="text-xs text-emerald-400 font-bold flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>CMS</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                const isHotels = tab.dropdownType === 'hotels' || tab.tabId === 'hotels' || tab.tabId === 'jain-hotels';
                if (isHotels) {
                  const dropdownKey = tab.tabId === 'jain-hotels' ? 'jain-hotels' : 'hotels';
                  const isExpanded = mobileExpandedSection === dropdownKey;
                  const isJainTab = tab.tabId === 'jain-hotels';
                  const displayedHotels = isJainTab
                    ? effectiveHotels.filter(
                        (h) =>
                          h.name.toLowerCase().includes('jain') ||
                          h.amenities?.some((a) => a.toLowerCase().includes('jain') || a.toLowerCase().includes('pure veg'))
                      ).length > 0
                      ? effectiveHotels.filter(
                          (h) =>
                            h.name.toLowerCase().includes('jain') ||
                            h.amenities?.some((a) => a.toLowerCase().includes('jain') || a.toLowerCase().includes('pure veg'))
                        )
                      : effectiveHotels
                    : effectiveHotels;

                  return (
                    <div key={tab.id} className="space-y-1">
                      <div
                        onClick={() => handleNavClick(tab.tabId || 'hotels')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          activeTab === (tab.tabId || 'hotels')
                            ? 'bg-[#153451] text-[#D9BC7A] border-l-4 border-[#C6A15B]'
                            : 'text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{tab.label}</span>
                          {tab.badgeText ? (
                            <span className="bg-[#153451] border border-[#C6A15B]/50 text-[#D9BC7A] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                              {tab.badgeText}
                            </span>
                          ) : (
                            <span className="bg-[#153451] border border-[#C6A15B]/50 text-[#D9BC7A] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                              {displayedHotels.length} Stays
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileExpandedSection(isExpanded ? null : dropdownKey);
                            }}
                            className="p-1 hover:bg-white/10 rounded text-[#C6A15B]"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Expanded Mobile Hotels List */}
                      {isExpanded && (
                        <div className="pl-4 pr-2 py-2 space-y-1.5 bg-[#0B1F3A]/60 rounded-lg border border-[#C6A15B]/20">
                          {displayedHotels.slice(0, 4).map((hotel) => (
                            <div
                              key={hotel.id}
                              onClick={() => {
                                handleNavClick(tab.tabId);
                                if (onOpenChatWithContext) {
                                  onOpenChatWithContext(`Hotel: ${hotel.name}`);
                                }
                              }}
                              className="flex items-center justify-between p-2 rounded hover:bg-white/5 text-xs text-slate-200 cursor-pointer"
                            >
                              <span className="truncate pr-2">{hotel.name} ({hotel.destination})</span>
                              <span className="text-[#D9BC7A] font-bold flex-shrink-0">
                                ₹{hotel.basePricePerNight ? hotel.basePricePerNight.toLocaleString('en-IN') : ''}/night
                              </span>
                            </div>
                          ))}
                          <div className="pt-1 flex items-center justify-between text-[11px]">
                            <button
                              onClick={() => handleNavClick(tab.tabId)}
                              className="text-[#D9BC7A] font-bold"
                            >
                              View {isJainTab ? 'Jain Hotels' : `All Hotels (${displayedHotels.length})`} →
                            </button>
                            <button
                              onClick={() => {
                                setMobileMenuOpen(false);
                                onOpenOwnerDashboard('hotels');
                              }}
                              className="text-xs text-emerald-400 font-bold flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>CMS</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavClick(tab.tabId)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-all ${
                      activeTab === tab.tabId
                        ? 'bg-[#153451] text-[#D9BC7A] border-l-4 border-[#C6A15B]'
                        : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{tab.label}</span>
                      {tab.badgeText && (
                        <span className="bg-[#153451] border border-[#C6A15B]/50 text-[#D9BC7A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {tab.badgeText}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C6A15B]" />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            {/* Owner & Admin Tools Quick Bar */}
            <div className="bg-[#153451] p-3 rounded-xl border border-[#C6A15B]/30 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C6A15B]">
                Agency Admin Console
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenOwnerDashboard('kpis');
                  }}
                  className="px-2.5 py-2 bg-[#071A2D] hover:bg-[#0f2a47] text-[#D9BC7A] rounded-lg border border-[#C6A15B]/40 flex items-center justify-center gap-1.5 font-bold"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Admin Console ({leadsCount})</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAIPlanner();
                  }}
                  className="px-2.5 py-2 bg-[#071A2D] hover:bg-[#0f2a47] text-[#D9BC7A] rounded-lg border border-[#C6A15B]/40 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>AI Planner</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPhotoEditor();
                  }}
                  className="px-2.5 py-2 bg-[#071A2D] hover:bg-[#0f2a47] text-slate-200 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Photo Editor</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenHostingerGuide();
                  }}
                  className="px-2.5 py-2 bg-[#071A2D] hover:bg-[#0f2a47] text-slate-200 rounded-lg border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Hostinger Setup</span>
                </button>
              </div>
            </div>

            {/* Mobile Trust Badge */}
            <div
              id="mobile-trust-badge-reviews"
              onClick={() => handleNavClick('reviews')}
              className="flex items-center justify-between p-2.5 bg-[#0B1728] border border-amber-400/40 rounded-xl cursor-pointer hover:bg-[#12243d] transition-all shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </span>
                <span className="font-bold text-white text-xs">
                  {currentAgency.rating || 4.9}★ Google Rating
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified {totalReviewsCount >= 500 ? '500+' : `${totalReviewsCount}+`} Reviews</span>
              </span>
            </div>

            <button
              onClick={() => {
                handleNavClick('contact');
              }}
              className="w-full btn-luxury-gold text-sm py-3 justify-center"
            >
              <span>Plan My Custom Trip</span>
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>{currentAgency.location || 'Gangtok Office: Arithang'}</span>
              <a
                href={`tel:${(currentAgency.phonePrimary || AGENCY_DETAILS.phonePrimary).replace(/\s+/g, '')}`}
                className="text-[#D9BC7A] font-bold"
              >
                {currentAgency.phonePrimary || AGENCY_DETAILS.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

