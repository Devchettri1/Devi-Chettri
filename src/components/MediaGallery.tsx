import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GALLERY_ITEMS, AGENCY_DETAILS } from '../data/travelData';
import { GalleryItem } from '../types';
import {
  Image,
  Play,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Search,
  Wand2,
  Car,
  Star,
  ShieldCheck,
  ExternalLink,
  Share2,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Check,
  Heart,
  Camera,
  Compass,
  Layers,
  SlidersHorizontal,
  Mountain,
  Grid,
  CheckCircle2
} from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';

interface MediaGalleryProps {
  onOpenAIChatWithContext?: (context: string) => void;
  onOpenPhotoEditor?: (imageUrl?: string, title?: string) => void;
}

// Optimized progressive image component with shimmer skeleton and graceful error fallback
const OptimizedGalleryImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  highPriority?: boolean;
}> = ({ src, alt, className = '', highPriority = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Apply responsive optimization to Unsplash or CDN images
  const optimizedSrc = useMemo(() => {
    if (src.includes('unsplash.com')) {
      return `${src.split('?')[0]}?auto=format&fit=crop&q=80&w=800`;
    }
    return src;
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#060B18]">
      {/* Loading Skeleton Shimmer */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-[#0A1128] animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-cyan-400/60">
            <Camera className="w-5 h-5 animate-bounce" />
            <span className="text-[10px] uppercase font-mono font-semibold tracking-wider">Loading 4K...</span>
          </div>
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 bg-[#0A1128] flex flex-col items-center justify-center p-4 text-center border border-cyan-500/10">
          <Mountain className="w-8 h-8 text-cyan-500/40 mb-1" />
          <span className="text-xs text-slate-400 font-medium line-clamp-1">{alt}</span>
        </div>
      ) : (
        <OptimizedImage
          src={optimizedSrc}
          alt={alt}
          priority={highPriority}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100' : 'opacity-90 scale-105'
          } ${className}`}
        />
      )}
    </div>
  );
};

export const MediaGallery: React.FC<MediaGalleryProps> = ({ onOpenAIChatWithContext, onOpenPhotoEditor }) => {
  // Category tabs: 'All' | 'Sikkim' | 'Darjeeling' | 'Bhutan' | 'Fleet' | 'Google'
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('All');
  const [selectedMediaType, setSelectedMediaType] = useState<string>('All');
  const [activeTag, setActiveTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Lightbox Modal state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Category counts for quick overview
  const categoryCounts = useMemo(() => {
    return {
      all: GALLERY_ITEMS.length,
      sikkim: GALLERY_ITEMS.filter((i) => i.destination === 'Sikkim' && !i.isVehicle).length,
      darjeeling: GALLERY_ITEMS.filter((i) => i.destination === 'Darjeeling').length,
      bhutan: GALLERY_ITEMS.filter((i) => i.destination === 'Bhutan').length,
      fleet: GALLERY_ITEMS.filter((i) => i.isVehicle || i.serviceType === 'Cab Rentals' || (i.vehicleType && i.vehicleType !== '')).length,
      innova: GALLERY_ITEMS.filter((i) => i.vehicleType === 'Innova Crysta' || i.tags.some(t => t.toLowerCase().includes('innova'))).length,
      google: GALLERY_ITEMS.filter((i) => i.isGoogleBusiness || i.socialSource === 'Google').length,
      facebook: GALLERY_ITEMS.filter((i) => i.socialSource === 'Facebook' || i.tags.some(t => t.toLowerCase().includes('facebook'))).length,
      instagram: GALLERY_ITEMS.filter((i) => i.socialSource === 'Instagram' || i.tags.some(t => t.toLowerCase().includes('instagram'))).length,
      video: GALLERY_ITEMS.filter((i) => i.type === 'video').length,
    };
  }, []);

  // Filter items based on active criteria
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      // 1. Primary Category Filter
      let matchesCategory = true;
      if (activeCategory === 'Sikkim') {
        matchesCategory = item.destination === 'Sikkim' && !item.isVehicle;
      } else if (activeCategory === 'Darjeeling') {
        matchesCategory = item.destination === 'Darjeeling';
      } else if (activeCategory === 'Bhutan') {
        matchesCategory = item.destination === 'Bhutan';
      } else if (activeCategory === 'Fleet') {
        matchesCategory = item.isVehicle === true || item.serviceType === 'Cab Rentals' || !!item.vehicleType;
      } else if (activeCategory === 'Google') {
        matchesCategory = item.isGoogleBusiness === true || item.socialSource === 'Google';
      } else if (activeCategory === 'Facebook') {
        matchesCategory = item.socialSource === 'Facebook' || item.tags.some(t => t.toLowerCase().includes('facebook'));
      } else if (activeCategory === 'Instagram') {
        matchesCategory = item.socialSource === 'Instagram' || item.tags.some(t => t.toLowerCase().includes('instagram'));
      } else if (activeCategory === 'Videos') {
        matchesCategory = item.type === 'video';
      }

      // 2. Vehicle Sub-filter
      let matchesVehicle = true;
      if (selectedVehicleType !== 'All') {
        if (selectedVehicleType === 'Innova Crysta') {
          matchesVehicle = item.vehicleType === 'Innova Crysta' || item.tags.some(t => t.toLowerCase().includes('innova'));
        } else if (selectedVehicleType === 'Scorpio / Xylo') {
          matchesVehicle = item.vehicleType === 'Scorpio / Xylo' || item.tags.some(t => t.toLowerCase().includes('scorpio') || t.toLowerCase().includes('xylo'));
        } else if (selectedVehicleType === 'Tempo Traveller') {
          matchesVehicle = item.vehicleType === 'Tempo Traveller' || item.tags.some(t => t.toLowerCase().includes('tempo') || t.toLowerCase().includes('urbania'));
        }
      }

      // 3. Media Type filter (photo vs video)
      const matchesMediaType = selectedMediaType === 'All' || item.type === selectedMediaType;

      // 4. Tag filter
      const matchesTag = activeTag === 'All' || item.tags.some(t => t.toLowerCase() === activeTag.toLowerCase());

      // 5. Search keyword filter
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        query === '' ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.destination && item.destination.toLowerCase().includes(query)) ||
        (item.vehicleType && item.vehicleType.toLowerCase().includes(query)) ||
        (item.altitude && item.altitude.toLowerCase().includes(query)) ||
        (item.googleBusinessDetails?.reviewerName && item.googleBusinessDetails.reviewerName.toLowerCase().includes(query)) ||
        item.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesVehicle && matchesMediaType && matchesTag && matchesQuery;
    });
  }, [activeCategory, selectedVehicleType, selectedMediaType, activeTag, searchQuery]);

  // Display items capped at visibleCount
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const activeLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrevLightbox = useCallback(() => {
    if (activeLightboxIndex === null || filteredItems.length === 0) return;
    setZoomLevel(1);
    setActiveLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  }, [activeLightboxIndex, filteredItems.length]);

  const handleNextLightbox = useCallback(() => {
    if (activeLightboxIndex === null || filteredItems.length === 0) return;
    setZoomLevel(1);
    setActiveLightboxIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrevLightbox();
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNextLightbox, handlePrevLightbox]);

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSharePhoto = async (item: GalleryItem) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Explore ${item.title} (${item.location}) with ${AGENCY_DETAILS.name}`,
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const resetAllFilters = () => {
    setActiveCategory('All');
    setSelectedVehicleType('All');
    setSelectedMediaType('All');
    setActiveTag('All');
    setSearchQuery('');
    setVisibleCount(12);
  };

  // Popular quick tags for chips
  const popularTags = [
    { label: 'All Tags', value: 'All' },
    { label: '🏔️ High Altitude Lakes', value: 'Tsomgo Lake' },
    { label: '❄️ Snow & Zero Point', value: 'Zero Point' },
    { label: '🚖 Innova Crysta', value: 'Innova Crysta' },
    { label: '🌅 Tiger Hill Sunrise', value: 'Tiger Hill' },
    { label: '🚂 UNESCO Toy Train', value: 'Toy Train' },
    { label: '🛕 Tiger’s Nest Paro', value: "Tiger's Nest" },
    { label: '🍃 Organic Tea Estates', value: 'Tea Garden' },
    { label: '📜 Google Reviews', value: 'Google Review' }
  ];

  return (
    <section id="media-gallery" className="py-16 bg-[#060B18] text-slate-100 space-y-10 border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Luxury Obsidian Badges & Trust Metrics */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-[#0A1128] px-3.5 py-1 rounded-full border border-cyan-500/30 tracking-wider uppercase shadow-inner">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              High-Definition Visual Library
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 bg-[#0A1128] px-3 py-1 rounded-full border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              4.9★ Google Business Profile Verified
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 bg-[#0A1128] px-3 py-1 rounded-full border border-teal-500/30">
              <Car className="w-3.5 h-3.5 text-teal-400" />
              Toyota Innova Crysta Mountain Fleet
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Curated Himalayan Visual & Fleet Gallery
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Authentic high-resolution photography across <strong className="text-cyan-300 font-semibold">Sikkim</strong>,{' '}
            <strong className="text-amber-300 font-semibold">Darjeeling</strong>, and <strong className="text-teal-300 font-semibold">Bhutan</strong>.
            Showcasing our luxury <strong className="text-cyan-400 font-semibold">Toyota Innova Crysta</strong> mountain fleet and verified traveler captures.
          </p>

          {/* Official Social Channels & Verification Hub */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0A1128] border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 transition-all shadow-md group"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Google Business Profile (4.9★)</span>
              <ExternalLink className="w-3 h-3 text-amber-400/70 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="https://www.facebook.com/offbeatdestinationtravels"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0A1128] border border-blue-500/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all shadow-md group"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Facebook Community</span>
              <ExternalLink className="w-3 h-3 text-blue-400/70 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="https://www.instagram.com/offbeatdestinationtravels"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0A1128] border border-pink-500/40 text-pink-300 hover:bg-pink-500/10 hover:border-pink-400 transition-all shadow-md group"
            >
              <Camera className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram @offbeatdestinationtravels</span>
              <ExternalLink className="w-3 h-3 text-pink-400/70 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="https://www.tripadvisor.in/Attraction_Review-g304557-d25088231-Reviews-Offbeat_Destination_Sikkim_Tours_Travels-Gangtok_East_Sikkim_Sikkim.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0A1128] border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all shadow-md group"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TripAdvisor Verified</span>
              <ExternalLink className="w-3 h-3 text-emerald-400/70 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Metrics Bar in Obsidian Aesthetic */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-left">
            <div className="bg-[#0A1128] border border-cyan-500/20 p-3.5 rounded-xl shadow-lg">
              <div className="text-[11px] text-slate-400 font-medium">Curated Visuals</div>
              <div className="text-lg font-extrabold text-white flex items-center gap-1.5 pt-0.5">
                <Camera className="w-4 h-4 text-cyan-400" />
                {categoryCounts.all}+ High-Res Shots
              </div>
            </div>
            <div className="bg-[#0A1128] border border-amber-500/20 p-3.5 rounded-xl shadow-lg">
              <div className="text-[11px] text-slate-400 font-medium">Google Profile</div>
              <div className="text-lg font-extrabold text-amber-400 flex items-center gap-1.5 pt-0.5">
                <Star className="w-4 h-4 fill-amber-400" />
                {categoryCounts.google} Verified Reviews
              </div>
            </div>
            <div className="bg-[#0A1128] border border-teal-500/20 p-3.5 rounded-xl shadow-lg">
              <div className="text-[11px] text-slate-400 font-medium">Innova Crysta</div>
              <div className="text-lg font-extrabold text-cyan-300 flex items-center gap-1.5 pt-0.5">
                <Car className="w-4 h-4" />
                {categoryCounts.innova} Fleet Showcases
              </div>
            </div>
            <div className="bg-[#0A1128] border border-cyan-500/20 p-3.5 rounded-xl shadow-lg">
              <div className="text-[11px] text-slate-400 font-medium">Govt Authorized</div>
              <div className="text-lg font-extrabold text-teal-300 flex items-center gap-1.5 pt-0.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Reg. 1750/DoT
              </div>
            </div>
          </div>
        </div>

        {/* Master Category & Filter Panel */}
        <div className="bg-[#0A1128]/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-cyan-500/20 shadow-2xl space-y-5">
          
          {/* Row 1: Primary Category Tabs (Sikkim, Darjeeling, Bhutan, Innova Fleet, Google Business, Facebook, Instagram) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. Select Category:</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {activeCategory === 'All' ? 'Complete Collection' : `${activeCategory} Gallery`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { key: 'All', label: 'All Showcase', count: categoryCounts.all, sub: 'Complete Library', icon: Grid },
                { key: 'Sikkim', label: 'Sikkim', count: categoryCounts.sikkim, sub: 'Tsomgo & Zero Pt', icon: Mountain },
                { key: 'Darjeeling', label: 'Darjeeling', count: categoryCounts.darjeeling, sub: 'Tiger Hill & Tea', icon: MapPin },
                { key: 'Bhutan', label: 'Bhutan', count: categoryCounts.bhutan, sub: "Tiger's Nest", icon: Compass },
                { key: 'Fleet', label: 'Innova Crysta', count: categoryCounts.fleet, sub: 'Mountain Fleet', icon: Car, highlight: true },
                { key: 'Google', label: 'Google 4.9★', count: categoryCounts.google, sub: 'Verified Reviews', icon: Star },
                { key: 'Facebook', label: 'Facebook', count: categoryCounts.facebook, sub: 'Community Posts', icon: Share2 },
                { key: 'Instagram', label: 'Instagram', count: categoryCounts.instagram, sub: 'Reels & Stories', icon: Camera },
              ].map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setActiveCategory(cat.key);
                      setVisibleCount(12);
                    }}
                    className={`p-2.5 rounded-xl text-left transition-all border ${
                      isSelected
                        ? cat.highlight
                          ? 'bg-gradient-to-r from-blue-700 to-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-950/60 scale-[1.02]'
                          : 'bg-gradient-to-r from-cyan-800 to-blue-900 text-white border-cyan-400 shadow-lg shadow-cyan-950/60 scale-[1.02]'
                        : cat.highlight
                        ? 'bg-[#060B18] text-cyan-300 border-cyan-500/40 hover:bg-[#0E1738] hover:border-cyan-400'
                        : 'bg-[#060B18] text-slate-300 hover:text-white hover:bg-[#0E1738] border-cyan-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs flex items-center gap-1.5 truncate">
                        <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-200' : 'text-cyan-400'}`} />
                        <span className="truncate">{cat.label}</span>
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#0E1738] text-cyan-400 border border-cyan-500/20'
                      }`}>
                        {cat.count}
                      </span>
                    </div>
                    <div className={`text-[10px] line-clamp-1 ${isSelected ? 'text-cyan-100' : 'text-slate-400'}`}>
                      {cat.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Secondary Filters - Vehicle Model, Media Type & Quick Chips */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-cyan-500/10">
            {/* Vehicle Model Pills */}
            <div className="lg:col-span-6 space-y-2">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-cyan-400" />
                <span>2. Filter Vehicle Models:</span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: 'All', label: 'All Vehicles' },
                  { key: 'Innova Crysta', label: '✨ Toyota Innova Crysta (Luxury)', highlight: true },
                  { key: 'Scorpio / Xylo', label: 'Scorpio / Xylo 4WD' },
                  { key: 'Tempo Traveller', label: 'Tempo Traveller (12-26s)' },
                ].map((veh) => {
                  const isSelected = selectedVehicleType === veh.key;
                  return (
                    <button
                      key={veh.key}
                      onClick={() => {
                        setSelectedVehicleType(veh.key);
                        setVisibleCount(12);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        isSelected
                          ? veh.highlight
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-cyan-300 shadow-md scale-105'
                            : 'bg-cyan-700 text-white border-cyan-400 shadow-md'
                          : veh.highlight
                          ? 'bg-[#060B18] text-cyan-300 border-cyan-500/30 hover:bg-[#0E1738] hover:border-cyan-400'
                          : 'bg-[#060B18] text-slate-300 border-cyan-500/10 hover:bg-[#0E1738] hover:text-white'
                      }`}
                    >
                      {veh.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Media Type & Popular Tag Chips */}
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3. Media & Themes:</span>
                </label>

                {/* Media Type Switcher */}
                <div className="inline-flex bg-[#060B18] rounded-xl p-0.5 border border-cyan-500/20">
                  {['All', 'photo', 'video'].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMediaType(m)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                        selectedMediaType === m
                          ? 'bg-cyan-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {m === 'photo' ? '📷 Photos' : m === 'video' ? '🎬 Videos' : 'All Media'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {popularTags.slice(1, 6).map((t) => {
                  const isSelected = activeTag === t.value;
                  return (
                    <button
                      key={t.value}
                      onClick={() => setActiveTag(isSelected ? 'All' : t.value)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : 'bg-[#060B18] text-slate-400 border-cyan-500/10 hover:text-slate-200 hover:border-cyan-500/30'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 3: Instant Keyword Search Bar & Result Counters */}
          <div className="pt-2 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Zero Point, Innova Crysta, Tiger Hill, Gurudongmar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#060B18] border border-cyan-500/20 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400 placeholder:text-slate-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs p-0.5"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
              <span className="text-slate-400 font-medium">
                Showing <strong className="text-cyan-300">{visibleItems.length}</strong> of{' '}
                <strong className="text-white">{filteredItems.length}</strong> visuals
              </span>

              {(activeCategory !== 'All' ||
                selectedVehicleType !== 'All' ||
                selectedMediaType !== 'All' ||
                activeTag !== 'All' ||
                searchQuery !== '') && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Grid Showcase with Smooth Performance & Aspect Ratio Containers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleItems.map((item, idx) => {
            const isLiked = likedMap[item.id] || false;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveLightboxIndex(idx);
                  setZoomLevel(1);
                }}
                className="group relative bg-[#0A1128] rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Thumbnail Visual Container with Strict Aspect Ratio (Prevents Layout Shift) */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#060B18]">
                  <OptimizedGalleryImage
                    src={item.url}
                    alt={item.title}
                    highPriority={idx < 4}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                  {/* Top Badges: Destination & Vehicle / Google Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 pointer-events-none">
                    <span className="bg-[#060B18]/90 backdrop-blur-md text-cyan-300 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-cyan-500/30 shadow-md">
                      {item.destination}
                    </span>

                    <div className="flex items-center gap-1">
                      {item.vehicleType && (
                        <span className="bg-blue-950/90 backdrop-blur-md text-cyan-200 font-bold px-2 py-0.5 rounded-full text-[10px] border border-cyan-400/50 shadow-md flex items-center gap-1">
                          <Car className="w-2.5 h-2.5" />
                          {item.vehicleType}
                        </span>
                      )}

                      {item.isGoogleBusiness && (
                        <span className="bg-amber-950/90 backdrop-blur-md text-amber-300 font-bold px-2 py-0.5 rounded-full text-[10px] border border-amber-500/40 shadow-md flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Altitude Geotag Overlay */}
                  {item.altitude && (
                    <div className="absolute bottom-3 left-3 pointer-events-none">
                      <span className="bg-[#060B18]/90 backdrop-blur-md text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-md border border-cyan-500/20 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                        {item.altitude}
                      </span>
                    </div>
                  )}

                  {/* Like Button */}
                  <button
                    onClick={(e) => handleToggleLike(item.id, e)}
                    className="absolute bottom-3 right-3 z-10 p-2 bg-[#060B18]/80 hover:bg-[#060B18] text-white rounded-full border border-cyan-500/30 transition-transform active:scale-90"
                    title="Like Photo"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300 hover:text-rose-400'
                      }`}
                    />
                  </button>

                  {/* Video Play Overlay */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-cyan-600/90 text-white flex items-center justify-center border-2 border-white shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                      {item.duration && (
                        <span className="absolute bottom-3 right-12 bg-[#060B18]/90 text-white text-[10px] px-2 py-0.5 rounded font-mono border border-cyan-500/20">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-slate-400 flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span>{item.location}</span>
                    </p>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-2 border-t border-cyan-500/10 space-y-2">
                    {/* Google Review snippet if applicable */}
                    {item.googleBusinessDetails && (
                      <div className="bg-[#060B18] p-2 rounded-lg border border-amber-500/20 text-[10px] text-amber-300 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1 font-semibold line-clamp-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
                          <span>{item.googleBusinessDetails.reviewerName}</span>
                        </div>
                        <span className="text-[9px] text-slate-400 flex-shrink-0">
                          {item.googleBusinessDetails.verifiedDate}
                        </span>
                      </div>
                    )}

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-[#060B18] text-cyan-300/80 px-2 py-0.5 rounded border border-cyan-500/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button for Progressive Infinite Scrolling */}
        {filteredItems.length > visibleCount && (
          <div className="text-center pt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-6 py-3 bg-[#0A1128] hover:bg-[#0E1738] text-cyan-300 hover:text-cyan-200 text-xs font-bold rounded-xl border border-cyan-500/30 hover:border-cyan-400 shadow-xl transition-all inline-flex items-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Load More Visuals ({filteredItems.length - visibleCount} Remaining)</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-[#0A1128] rounded-2xl border border-cyan-500/20 space-y-4">
            <Image className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-bold text-slate-200 text-lg">No visuals found matching your criteria</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn't find any photos with the current filters or search keywords.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              Reset All Filters & Show Full Gallery
            </button>
          </div>
        )}

        {/* Google Business Profile Action Callout in Obsidian & Gold */}
        <div className="bg-gradient-to-r from-[#0A1128] via-[#0E1738] to-[#0A1128] p-6 rounded-2xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Traveled with OffbeatDestination? Share Your Memories!</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  4.9★ Rated
                </span>
              </h4>
              <p className="text-xs text-slate-300 max-w-xl">
                Upload your photos and review to our verified Google Business Profile to be featured in our official gallery.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <a
              href={AGENCY_DETAILS.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View On Google Maps</span>
            </a>

            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20would%20like%20to%20send%20my%20Sikkim%20tour%20photos%20for%20the%20website%20gallery.`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-[#060B18] hover:bg-[#0E1738] text-cyan-300 text-xs font-bold rounded-xl transition-all border border-cyan-500/30 flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Send Photos via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Modal with Obsidian & Electric Cyan Theme */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 bg-[#060B18]/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="relative max-w-6xl w-full bg-[#0A1128] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[92vh]">
            
            {/* Top Bar Controls on Modal */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
              {/* Zoom Controls */}
              {activeLightboxItem.type !== 'video' && (
                <div className="hidden sm:flex items-center bg-[#060B18]/90 backdrop-blur-md rounded-full border border-cyan-500/30 p-1">
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                    className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-cyan-950"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                    className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-cyan-950"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 text-slate-300 hover:text-white rounded-full hover:bg-cyan-950"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveLightboxIndex(null);
                  setZoomLevel(1);
                }}
                className="p-2 bg-[#060B18]/90 hover:bg-[#060B18] text-slate-300 hover:text-white rounded-full border border-cyan-500/30 transition-colors"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Previous & Next Navigation Buttons */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#060B18]/90 hover:bg-cyan-600 text-white rounded-full border border-cyan-500/30 shadow-2xl transition-all hover:scale-110"
              title="Previous visual (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextLightbox}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#060B18]/90 hover:bg-cyan-600 text-white rounded-full border border-cyan-500/30 shadow-2xl transition-all hover:scale-110 lg:right-[38%]"
              title="Next visual (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Left Side: Media Display Viewport */}
            <div className="lg:w-3/5 bg-[#060B18] flex items-center justify-center relative min-h-[320px] lg:min-h-[540px] overflow-hidden">
              {activeLightboxItem.type === 'video' && activeLightboxItem.videoEmbedUrl ? (
                <iframe
                  src={activeLightboxItem.videoEmbedUrl}
                  title={activeLightboxItem.title}
                  className="w-full h-full min-h-[320px] lg:min-h-[540px] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center overflow-auto p-4">
                  <OptimizedImage
                    src={activeLightboxItem.highResUrl || activeLightboxItem.url}
                    alt={activeLightboxItem.title}
                    priority={true}
                    className="max-h-[72vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>
              )}

              {/* Quality & Camera Indicator */}
              <div className="absolute bottom-3 left-3 bg-[#060B18]/90 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/20 text-[10px] text-cyan-300 flex items-center gap-1.5 pointer-events-none">
                <Camera className="w-3 h-3 text-cyan-400" />
                <span>{activeLightboxItem.cameraInfo || '4K Ultra HD • WebP Optimized'}</span>
              </div>
            </div>

            {/* Right Side: Rich Meta Details, Google Business Info & Actions */}
            <div className="lg:w-2/5 p-6 space-y-4 flex flex-col justify-between bg-[#0A1128] overflow-y-auto max-h-[92vh]">
              <div className="space-y-3.5">
                {/* Destination & Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="bg-[#060B18] text-cyan-300 font-bold px-2.5 py-0.5 rounded-full text-xs border border-cyan-500/30">
                    {activeLightboxItem.destination}
                  </span>

                  {activeLightboxItem.vehicleType && (
                    <span className="bg-blue-950 text-cyan-200 font-bold px-2.5 py-0.5 rounded-full text-xs border border-cyan-400/40 flex items-center gap-1">
                      <Car className="w-3 h-3" />
                      {activeLightboxItem.vehicleType}
                    </span>
                  )}

                  {activeLightboxItem.isGoogleBusiness && (
                    <span className="bg-amber-950 text-amber-300 font-bold px-2.5 py-0.5 rounded-full text-xs border border-amber-500/40 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      Google Verified
                    </span>
                  )}
                </div>

                {/* Title & Location */}
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-white leading-tight">
                    {activeLightboxItem.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-cyan-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="font-medium">{activeLightboxItem.location}</span>
                    {activeLightboxItem.altitude && (
                      <span className="text-slate-400 font-mono">• {activeLightboxItem.altitude}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#060B18] p-3.5 rounded-xl border border-cyan-500/10">
                  {activeLightboxItem.description}
                </p>

                {/* Google Business Review Spotlight if present */}
                {activeLightboxItem.googleBusinessDetails && (
                  <div className="bg-amber-950/20 border border-amber-500/30 p-3.5 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-300 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{activeLightboxItem.googleBusinessDetails.badgeText || 'Google Verified Review'}</span>
                      </div>
                      <span className="text-[10px] text-amber-400/80 font-semibold">
                        {activeLightboxItem.googleBusinessDetails.verifiedDate}
                      </span>
                    </div>

                    <div className="text-slate-200 font-medium">
                      Reviewer: <strong className="text-white">{activeLightboxItem.googleBusinessDetails.reviewerName}</strong>
                    </div>

                    <a
                      href={activeLightboxItem.googleBusinessDetails.googleMapsLink || AGENCY_DETAILS.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline pt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>View Official Google Business Review</span>
                    </a>
                  </div>
                )}

                {/* Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Indexed Categories:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLightboxItem.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#060B18] text-cyan-300 px-2.5 py-1 rounded-lg border border-cyan-500/20"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 border-t border-cyan-500/10 pt-4">
                {/* WhatsApp Direct Book */}
                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20saw%20"${encodeURIComponent(
                    activeLightboxItem.title
                  )}"%20(${encodeURIComponent(
                    activeLightboxItem.location
                  )})%20in%20your%20photo%20gallery%20and%20would%20like%20a%20quote%20with%20an%20Innova%20Crysta.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book Spot / Cab on WhatsApp</span>
                </a>

                {/* Photo Editor Link */}
                {onOpenPhotoEditor && activeLightboxItem.type !== 'video' && (
                  <button
                    onClick={() => {
                      onOpenPhotoEditor(activeLightboxItem.highResUrl || activeLightboxItem.url, activeLightboxItem.title);
                      setActiveLightboxIndex(null);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-blue-700 to-cyan-700 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Customize in AI Photo Editor</span>
                  </button>
                )}

                {/* AI Assistant Context Query */}
                {onOpenAIChatWithContext && (
                  <button
                    onClick={() => {
                      onOpenAIChatWithContext(
                        `Tell me about visiting ${activeLightboxItem.title} in ${activeLightboxItem.location}, best season, permit requirements, and cab cost.`
                      );
                      setActiveLightboxIndex(null);
                    }}
                    className="w-full py-2 bg-[#060B18] hover:bg-[#0E1738] text-cyan-300 rounded-xl text-xs font-semibold border border-cyan-500/20 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ask AI Travel Assistant About This Spot</span>
                  </button>
                )}

                {/* Secondary Actions: Share & Download */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleSharePhoto(activeLightboxItem)}
                    className="flex-1 py-1.5 bg-[#060B18] hover:bg-[#0E1738] text-slate-300 hover:text-white rounded-lg text-[11px] font-semibold border border-cyan-500/20 flex items-center justify-center gap-1.5"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3 h-3 text-cyan-400" />
                        <span className="text-cyan-400">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        <span>Share Visual</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeLightboxItem.highResUrl || activeLightboxItem.url}
                    target="_blank"
                    rel="noreferrer"
                    download={`${activeLightboxItem.title.replace(/\s+/g, '_')}.jpg`}
                    className="flex-1 py-1.5 bg-[#060B18] hover:bg-[#0E1738] text-slate-300 hover:text-white rounded-lg text-[11px] font-semibold border border-cyan-500/20 flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Open High-Res</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
