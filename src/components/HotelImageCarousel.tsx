import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Bed, 
  Utensils, 
  Building2, 
  Sparkles, 
  Layers, 
  Camera, 
  CheckCircle2, 
  Compass, 
  Flame, 
  Coffee,
  Play,
  Pause,
  ArrowLeftRight
} from 'lucide-react';
import { HotelPhotoItem, HotelChainPartner, FeaturedStandaloneHotel } from '../data/travelData';
import {
  sikkimHeroBanner,
  ravanglaBuddhaPark,
  darjeelingToyTrain,
  darjeelingTeaGardens,
  yumthangZeroPoint,
  nathulaPassSnow
} from '../assets/images';

export type PhotoCategory = 'all' | 'rooms' | 'dining' | 'exterior' | 'views' | 'amenities';

export interface HotelImageCarouselProps {
  hotel: HotelChainPartner | FeaturedStandaloneHotel | any;
  onOpenComparison?: () => void;
  className?: string;
}

// Curated high-resolution fallback image sets for Himalayan hotel types
const DEFAULT_HIMALAYAN_HOTEL_PHOTOS: Record<string, HotelPhotoItem[]> = {
  luxury: [
    {
      url: sikkimHeroBanner,
      category: "exterior",
      title: "Royal Himalayan Valley Resort Facade",
      caption: "Panoramic mountain architecture framed by lush pines and misty Himalayan ridges."
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Executive Imperial Suite with Mountain Balcony",
      caption: "King-sized bed with pure wooden flooring, centralized heating, and frontal snow peak views."
    },
    {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Deluxe Pine Balcony Room",
      caption: "Spacious seating lounge with direct sunrise views over Mt. Kanchenjunga."
    },
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      title: "Orchid Multi-Cuisine & Pure Veg Restaurant",
      caption: "Fine dining ambiance serving authentic Sikkimese, North Indian, Jain, and Continental dishes."
    },
    {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
      category: "amenities",
      title: "Mayfair & Metta Ayurvedic Spa & Wellness",
      caption: "Rejuvenating Himalayan therapies, hydrotherapy tubs, and steam sauna sessions."
    },
    {
      url: ravanglaBuddhaPark,
      category: "views",
      title: "180° Panoramic Sunrise Balcony View",
      caption: "Golden morning rays lighting up the snow-capped Himalayan ranges."
    },
    {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      category: "amenities",
      title: "Heated Hydrotherapy Pool & Forest Deck",
      caption: "Indoor heated swimming area with private deck nestled in cedar foliage."
    }
  ],
  heritage: [
    {
      url: darjeelingToyTrain,
      category: "exterior",
      title: "125-Year Colonial Heritage Facade",
      caption: "Historic stone estate with Burmese teakwood architecture and manicured mountain gazebos."
    },
    {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Royal Viceroy Heritage Suite",
      caption: "Authentic 4-poster king bed with antique armchairs and functioning stone fireplace."
    },
    {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Classic Colonial Mountain Room",
      caption: "Rich teak panelling, vintage brass lamps, and heated woolen throws."
    },
    {
      url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      title: "Victorian High-Tea Dining Hall",
      caption: "Silver-service afternoon Darjeeling tea sessions and piano dining evenings."
    },
    {
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      category: "amenities",
      title: "Cozy Lit Stone Fireplace Lounge",
      caption: "Warm library parlor with antique portraits, curated novels, and roaring fireplaces."
    },
    {
      url: darjeelingTeaGardens,
      category: "views",
      title: "Private Tea Estate & Pine Ridge Vista",
      caption: "Rolling green tea slopes and misty Darjeeling hills from private verandas."
    }
  ],
  jain: [
    {
      url: darjeelingTeaGardens,
      category: "exterior",
      title: "Mountain Ridge Hotel Facade",
      caption: "Centrally situated near mall promenades with dedicated pure vegetarian hospitality."
    },
    {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Deluxe Pure Veg Valley Suite",
      caption: "Bright wooden-panelled room with hygienic interiors and valley view windows."
    },
    {
      url: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Super Deluxe Family Quad Room",
      caption: "Interconnected family accommodations with individual climate heating."
    },
    {
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      title: "100% Pure Veg & Strict Jain Kitchen",
      caption: "Dedicated Jain kitchen preparing meals strictly without onion or garlic under Vedic protocols."
    },
    {
      url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      title: "Scenic Buffet Dining Lounge",
      caption: "Hot buffet breakfast and dinner with Gujarati, Marwari, North Indian, and Bengali specialties."
    },
    {
      url: sikkimHeroBanner,
      category: "views",
      title: "Kanchenjunga Golden Sunrise Vista",
      caption: "Clear views of Mt. Kanchenjunga right from the rooftop dining terrace."
    }
  ],
  alpine: [
    {
      url: yumthangZeroPoint,
      category: "exterior",
      title: "North Sikkim Alpine Pinewood Lodge",
      caption: "Insulated alpine wood architecture designed for extreme high-altitude warmth in Lachung & Lachen."
    },
    {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Insulated Alpine Pine Room with Central Heating",
      caption: "Continuous radiator heating, heavy woolen quilts, and hot water geysers."
    },
    {
      url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      category: "rooms",
      title: "Glacier Stream View Attic Suite",
      caption: "Rustic wooden duplex suite overlooking cascading alpine streams and snow crags."
    },
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      category: "dining",
      title: "Warm Homestyle Alpine Dining Room",
      caption: "Piping hot buffet meals, ginger lemon honey tea, and local Sikkimese organic dishes."
    },
    {
      url: nathulaPassSnow,
      category: "views",
      title: "Snowy Pine Ridges & Waterfall Balcony",
      caption: "Panoramic mountain river and snow peak scenery right outside your window."
    }
  ]
};

// Intelligently generates or selects a full curated photo set for any hotel
export const getCuratedHotelPhotos = (hotel: any): HotelPhotoItem[] => {
  if (hotel.galleryPhotos && hotel.galleryPhotos.length > 0) {
    return hotel.galleryPhotos;
  }

  // Determine hotel archetype
  const nameLower = (hotel.name || '').toLowerCase();
  const descLower = (hotel.description || '').toLowerCase();
  const catList = hotel.categories || [];
  const starStr = hotel.starCategory || '';

  let photoSet: HotelPhotoItem[] = [];

  if (nameLower.includes('elgin') || descLower.includes('heritage') || descLower.includes('colonial') || nameLower.includes('yashshree')) {
    photoSet = [...DEFAULT_HIMALAYAN_HOTEL_PHOTOS.heritage];
  } else if (catList.includes('jain') || hotel.isJainCertified || nameLower.includes('jain')) {
    photoSet = [...DEFAULT_HIMALAYAN_HOTEL_PHOTOS.jain];
  } else if (nameLower.includes('lachung') || nameLower.includes('lachen') || descLower.includes('alpine') || nameLower.includes('rufina')) {
    photoSet = [...DEFAULT_HIMALAYAN_HOTEL_PHOTOS.alpine];
  } else {
    photoSet = [...DEFAULT_HIMALAYAN_HOTEL_PHOTOS.luxury];
  }

  // Ensure coverImage is the first photo if available
  if (hotel.coverImage) {
    const existingIndex = photoSet.findIndex(p => p.url === hotel.coverImage);
    if (existingIndex > 0) {
      const item = photoSet.splice(existingIndex, 1)[0];
      photoSet.unshift(item);
    } else if (existingIndex === -1) {
      photoSet.unshift({
        url: hotel.coverImage,
        category: 'exterior',
        title: `${hotel.name} Property Showcase`,
        caption: hotel.tagline || `Stunning mountain views and premium hospitality at ${hotel.name}.`
      });
    }
  }

  return photoSet;
};

export const HotelImageCarousel: React.FC<HotelImageCarouselProps> = ({
  hotel,
  onOpenComparison,
  className = ''
}) => {
  const photos = useMemo(() => getCuratedHotelPhotos(hotel), [hotel]);
  
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter photos by selected category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter(p => p.category === activeCategory);
  }, [photos, activeCategory]);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Safe index within bounds
  const safeIndex = Math.min(Math.max(0, currentIndex), Math.max(0, filteredPhotos.length - 1));
  const currentPhoto = filteredPhotos[safeIndex] || photos[0];

  // Next & Previous Handlers
  const handleNext = useCallback(() => {
    if (filteredPhotos.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (filteredPhotos.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  // Auto-play management
  useEffect(() => {
    if (isAutoPlaying && !isLightboxOpen) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 3800);
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, isLightboxOpen, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isLightboxOpen]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.children[safeIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [safeIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  // Category Tab Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<PhotoCategory, number> = {
      all: photos.length,
      rooms: photos.filter(p => p.category === 'rooms').length,
      dining: photos.filter(p => p.category === 'dining').length,
      exterior: photos.filter(p => p.category === 'exterior').length,
      views: photos.filter(p => p.category === 'views').length,
      amenities: photos.filter(p => p.category === 'amenities').length
    };
    return counts;
  }, [photos]);

  const CATEGORY_TABS: { id: PhotoCategory; label: string; icon: any }[] = [
    { id: 'all', label: 'All Photos', icon: Layers },
    { id: 'rooms', label: 'Rooms & Suites', icon: Bed },
    { id: 'dining', label: 'Dining & Kitchen', icon: Utensils },
    { id: 'exterior', label: 'Exterior & Grounds', icon: Building2 },
    { id: 'views', label: 'Views & Balconies', icon: Sparkles },
    { id: 'amenities', label: 'Amenities & Spa', icon: Flame }
  ];

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'rooms':
        return 'bg-purple-950/90 text-purple-300 border-purple-700/60';
      case 'dining':
        return 'bg-amber-950/90 text-amber-300 border-amber-700/60';
      case 'exterior':
        return 'bg-blue-950/90 text-blue-300 border-blue-700/60';
      case 'views':
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-700/60';
      case 'amenities':
        return 'bg-rose-950/90 text-rose-300 border-rose-700/60';
      default:
        return 'bg-slate-900/90 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      
      {/* ========================================================================= */}
      {/* 1. CATEGORY FILTER TABS */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="flex items-center gap-1.5 min-w-max">
          {CATEGORY_TABS.map(tab => {
            const count = categoryCounts[tab.id];
            if (count === 0 && tab.id !== 'all') return null;
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold scale-100'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-900 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Slideshow & Compare Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-1.5 rounded-lg text-xs border transition-colors flex items-center gap-1 ${
              isAutoPlaying 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' 
                : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
            }`}
            title={isAutoPlaying ? "Pause Slideshow" : "Auto-Play Slideshow"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-bold hidden sm:inline">
              {isAutoPlaying ? "Playing" : "Slideshow"}
            </span>
          </button>

          {onOpenComparison && (
            <button
              onClick={onOpenComparison}
              className="p-1.5 rounded-lg text-xs bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1"
              title="Compare side-by-side with rival stays"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] font-bold hidden sm:inline">Compare</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN CAROUSEL IMAGE STAGE */}
      {/* ========================================================================= */}
      <div 
        className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group select-none shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Active Photo */}
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title || hotel.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-102"
        />

        {/* Ambient Top & Bottom Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none" />

        {/* Top Floating Badges & Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg border backdrop-blur-md shadow-md ${getCategoryBadgeClass(currentPhoto.category)}`}>
              {currentPhoto.category.toUpperCase()}
            </span>
            <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-lg border border-slate-700 shadow-md">
              Photo {safeIndex + 1} of {filteredPhotos.length}
            </span>
          </div>

          <button
            onClick={() => setIsLightboxOpen(true)}
            className="bg-slate-950/85 hover:bg-slate-900 text-slate-200 hover:text-white p-2 rounded-xl border border-slate-700 shadow-lg backdrop-blur-md transition-all hover:scale-105 flex items-center gap-1.5 text-xs font-bold"
            title="Expand Fullscreen Lightbox"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline text-[11px]">Fullscreen</span>
          </button>
        </div>

        {/* Prev & Next Floating Arrow Buttons */}
        {filteredPhotos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-slate-950/80 hover:bg-slate-900 text-white p-2.5 rounded-full border border-slate-700/80 backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 group/arrow"
              title="Previous Photo (Left Arrow)"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 text-slate-200 group-hover/arrow:text-amber-400 transition-colors" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-slate-950/80 hover:bg-slate-900 text-white p-2.5 rounded-full border border-slate-700/80 backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95 group/arrow"
              title="Next Photo (Right Arrow)"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 text-slate-200 group-hover/arrow:text-amber-400 transition-colors" />
            </button>
          </>
        )}

        {/* Bottom Caption & Title Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800/80 shadow-lg">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs sm:text-sm font-black text-white truncate drop-shadow">
              {currentPhoto.title}
            </h4>
            <span className="text-[10px] text-amber-400 font-extrabold flex-shrink-0">
              {hotel.name}
            </span>
          </div>
          {currentPhoto.caption && (
            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
              {currentPhoto.caption}
            </p>
          )}
        </div>

        {/* Dot Indicators */}
        {filteredPhotos.length > 1 && (
          <div className="absolute bottom-16 left-0 right-0 flex items-center justify-center gap-1 z-10 pointer-events-none">
            {filteredPhotos.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === safeIndex 
                    ? 'w-6 bg-amber-400 shadow-md shadow-amber-400/50' 
                    : 'w-1.5 bg-slate-500/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE THUMBNAIL FILMSTRIP */}
      {/* ========================================================================= */}
      {filteredPhotos.length > 1 && (
        <div 
          ref={thumbnailContainerRef}
          className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950 px-0.5"
        >
          {filteredPhotos.map((photo, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-shrink-0 w-16 sm:w-20 h-12 sm:h-14 rounded-xl overflow-hidden border-2 transition-all group ${
                  isSelected 
                    ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20 ring-2 ring-amber-400/30' 
                    : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                }`}
                title={photo.title}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-white bg-slate-950/80 px-1 rounded backdrop-blur-xs">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FULLSCREEN LIGHTBOX THEATER MODAL */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 animate-fadeIn select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar with Title, Counter & Close */}
          <div 
            className="flex items-center justify-between gap-4 text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  {hotel.name}
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${getCategoryBadgeClass(currentPhoto.category)}`}>
                  {currentPhoto.category}
                </span>
              </div>
              <h3 className="text-sm sm:text-lg font-black text-white mt-1">
                {currentPhoto.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400 hidden sm:inline">
                {safeIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white p-2.5 rounded-full border border-slate-700 transition-colors shadow-lg"
                title="Close Fullscreen (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Full-Size Image in Lightbox */}
          <div 
            className="relative flex-1 flex items-center justify-center my-2 max-h-[78vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800/80"
            />

            {/* Prev/Next Buttons in Lightbox */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full border border-slate-700 backdrop-blur-md transition-all shadow-2xl hover:scale-110"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6 text-amber-400" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-white p-3 rounded-full border border-slate-700 backdrop-blur-md transition-all shadow-2xl hover:scale-110"
                  title="Next Photo"
                >
                  <ChevronRight className="w-6 h-6 text-amber-400" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption & Thumbnail Strip in Lightbox */}
          <div 
            className="space-y-3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {currentPhoto.caption && (
              <p className="text-xs sm:text-sm text-slate-300 text-center max-w-3xl mx-auto drop-shadow bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
                {currentPhoto.caption}
              </p>
            )}

            {/* Thumbnail selector in Lightbox */}
            {filteredPhotos.length > 1 && (
              <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-4xl mx-auto scrollbar-thin">
                {filteredPhotos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-14 sm:w-16 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      idx === safeIndex 
                        ? 'border-amber-400 scale-105 shadow-md ring-2 ring-amber-400/40' 
                        : 'border-slate-800 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p.url}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
