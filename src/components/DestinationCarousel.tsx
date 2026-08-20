import {
  sikkimHeroBanner,
  yumthangZeroPoint,
  nathulaPassSnow,
  ravanglaBuddhaPark,
  darjeelingTeaGardens,
  darjeelingToyTrain,
  bhutanTigersNest,
  innovaCrystaCab,
  innovaMountainDrive,
  agencyCardBanner
} from '../assets/images';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MapPin, Camera, Sparkles, Maximize2, X } from 'lucide-react';
import { OptimizedImage } from './ui/OptimizedImage';

export interface RoutePhoto {
  url: string;
  caption: string;
  location: string;
  badge?: string;
}

export const ROUTE_PHOTO_MAP: Record<string, RoutePhoto[]> = {
  "5N/6D Sikkim & Darjeeling Grand Circuit": [
    {
      url: sikkimHeroBanner,
      caption: "Gangtok Hilltop Skyline & Kanchenjunga Mountain Views",
      location: "Gangtok Capital (5,500 ft)",
      badge: "Popular Circuit",
    },
    {
      url: nathulaPassSnow,
      caption: "Glacial Tsomgo Lake & Snow-clad Nathula Pass Border",
      location: "East Sikkim (14,140 ft)",
      badge: "Indo-China Border",
    },
    {
      url: darjeelingTeaGardens,
      caption: "Rolling Emerald Tea Estates & Tiger Hill Sunrise",
      location: "Darjeeling Hills (6,700 ft)",
      badge: "Tea Garden Haven",
    },
    {
      url: darjeelingToyTrain,
      caption: "UNESCO World Heritage Himalayan Steam Toy Train",
      location: "Batasia Loop, Darjeeling",
      badge: "UNESCO Heritage",
    },
  ],
  "4N/5D North Sikkim Special (Gurudongmar & Zero Point)": [
    {
      url: yumthangZeroPoint,
      caption: "Zero Point (Yumesamdong) Permanent Snow Realm",
      location: "North Sikkim (15,300 ft)",
      badge: "High Altitude Peak",
    },
    {
      url: sikkimHeroBanner,
      caption: "Yumthang Valley of Flowers & Hot Sulphur Springs",
      location: "Lachung & Lachen Valleys",
      badge: "Rhododendron Sanctuary",
    },
    {
      url: innovaMountainDrive,
      caption: "Chungthang Gorge & Scenic 4x4 Mountain Highway",
      location: "Lachen Alpine Highway",
      badge: "4x4 SUV Route",
    },
  ],
  "3N/4D Old Silk Route Zuluk & Reshi Khola": [
    {
      url: nathulaPassSnow,
      caption: "Zuluk Thambi View Point 32-Zigzag Hairpin Bends",
      location: "Old Silk Route (11,200 ft)",
      badge: "Ancient Trade Route",
    },
    {
      url: ravanglaBuddhaPark,
      caption: "Kupup Elephant Lake & Baba Harbhajan Shrine",
      location: "East Sikkim Highlands",
      badge: "Sacred Glacial Lake",
    },
    {
      url: innovaMountainDrive,
      caption: "Reshi Khola Crystal Riverbank Organic Homestays",
      location: "Reshi River Valley",
      badge: "Riverside Camping",
    },
  ],
  "4N/5D Gangtok, Tsomgo Lake & Darjeeling": [
    {
      url: nathulaPassSnow,
      caption: "Sacred Glacial Tsomgo Lake & Yak Rides",
      location: "East Sikkim (12,400 ft)",
      badge: "Glacial Marvel",
    },
    {
      url: sikkimHeroBanner,
      caption: "Gangtok Cable Car Ropeway & MG Marg Evening Walk",
      location: "Gangtok Town",
      badge: "Valley Viewpoint",
    },
    {
      url: darjeelingToyTrain,
      caption: "Batasia War Memorial Loop & Ghoom Monastery",
      location: "Darjeeling",
      badge: "Colonial Charm",
    },
  ],
  "5N/6D Romantic Sikkim & Darjeeling Honeymoon": [
    {
      url: darjeelingTeaGardens,
      caption: "Romantic Couple Strolls through Lush Tea Estates",
      location: "Darjeeling Tea Country",
      badge: "Honeymoon Exclusive",
    },
    {
      url: sikkimHeroBanner,
      caption: "Luxury Hillside Boutique Resort Stays & Candlelight Dining",
      location: "Gangtok & Darjeeling",
      badge: "Boutique Stays",
    },
    {
      url: ravanglaBuddhaPark,
      caption: "Panoramic Kanchenjunga Sunrise Views & Private Car Drives",
      location: "Pelling & Ravangla",
      badge: "Kanchenjunga Vista",
    },
  ],
  "Toyota Innova Crysta Cab Rental Only": [
    {
      url: innovaCrystaCab,
      caption: "Luxury Toyota Innova Crysta with Rear AC & Captain Seats",
      location: "All Sikkim & Bengal Routes",
      badge: "Luxury Fleet",
    },
    {
      url: innovaMountainDrive,
      caption: "Verified Experienced Hill Drivers for High-Altitude Passes",
      location: "NJP Station & IXB Airport Pickups",
      badge: "Safe Chauffeurs",
    },
    {
      url: agencyCardBanner,
      caption: "Clean, Sanitized Cabs with All Sikkim Tourist Permits Included",
      location: "Gangtok Head Office",
      badge: "Permits Included",
    },
  ],
  "Bhutan Cultural Odyssey Package": [
    {
      url: bhutanTigersNest,
      caption: "Climb to Sacred Taktsang Tiger's Nest Monastery",
      location: "Paro Valley, Bhutan",
      badge: "Himalayan Sanctuary",
    },
    {
      url: ravanglaBuddhaPark,
      caption: "Giant Buddha Dordenma Statue overlooking Thimphu Valley",
      location: "Thimphu, Bhutan",
      badge: "Kingdom of Bhutan",
    },
    {
      url: sikkimHeroBanner,
      caption: "Punakha Dzong Golden Fortress on River Confluence",
      location: "Punakha Valley",
      badge: "Cultural Heritage",
    },
  ],
  "Custom Itinerary Inquiry": [
    {
      url: sikkimHeroBanner,
      caption: "Customized Tailor-made Sikkim & Darjeeling Circuits",
      location: "Gangtok & Surrounds",
      badge: "Custom Route",
    },
    {
      url: yumthangZeroPoint,
      caption: "High Altitude Passes, Snow Points & Army Permits",
      location: "North & East Sikkim",
      badge: "100% Customized",
    },
    {
      url: innovaCrystaCab,
      caption: "Dedicated Transport & Private Driver Assignment",
      location: "Bagdogra / NJP Pickup",
      badge: "VIP Assistance",
    },
  ],
};

export const getPhotosForRoute = (selectedRoute: string): RoutePhoto[] => {
  if (ROUTE_PHOTO_MAP[selectedRoute]) {
    return ROUTE_PHOTO_MAP[selectedRoute];
  }
  const lower = (selectedRoute || '').toLowerCase();
  for (const key of Object.keys(ROUTE_PHOTO_MAP)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return ROUTE_PHOTO_MAP[key];
    }
  }
  if (lower.includes('north sikkim') || lower.includes('zero point') || lower.includes('lachung')) {
    return ROUTE_PHOTO_MAP["4N/5D North Sikkim Special (Gurudongmar & Zero Point)"];
  }
  if (lower.includes('silk route') || lower.includes('zuluk')) {
    return ROUTE_PHOTO_MAP["3N/4D Old Silk Route Zuluk & Reshi Khola"];
  }
  if (lower.includes('bhutan')) {
    return ROUTE_PHOTO_MAP["Bhutan Cultural Odyssey Package"];
  }
  if (lower.includes('cab') || lower.includes('innova') || lower.includes('rental')) {
    return ROUTE_PHOTO_MAP["Toyota Innova Crysta Cab Rental Only"];
  }
  if (lower.includes('honeymoon')) {
    return ROUTE_PHOTO_MAP["5N/6D Romantic Sikkim & Darjeeling Honeymoon"];
  }
  return ROUTE_PHOTO_MAP["5N/6D Sikkim & Darjeeling Grand Circuit"];
};

interface DestinationCarouselProps {
  selectedRoute: string;
}

export const DestinationCarousel: React.FC<DestinationCarouselProps> = ({ selectedRoute }) => {
  const photos = getPhotosForRoute(selectedRoute);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Reset index to 0 when selectedRoute changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedRoute]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, photos.length, selectedRoute]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div className="space-y-2 mt-3">
      {/* Carousel Container */}
      <div 
        className="relative w-full h-48 sm:h-52 bg-[#0B0F0E] rounded-xl overflow-hidden border border-[#D6B36A]/25 shadow-xl group cursor-pointer"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onClick={() => setLightboxOpen(true)}
      >
        {/* Main Active Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`${selectedRoute}-${currentIndex}`}
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Top Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-[#0B0F0E]/20 to-[#0B0F0E]/60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0B0F0E]/85 backdrop-blur-md border border-[#D6B36A]/30 rounded text-[10px] font-bold text-[#D6B36A] shadow-md">
            <Sparkles className="w-3 h-3 text-[#D6B36A]" />
            <span>{currentPhoto.badge || "Destination Visual"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-[#0B0F0E]/85 backdrop-blur-md border border-[#D6B36A]/30 rounded text-[10px] font-bold text-[#A9AAA4]">
              {currentIndex + 1} / {photos.length} Photos
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(true);
              }}
              className="p-1.5 bg-[#0B0F0E]/85 hover:bg-[#151A17] border border-[#D6B36A]/30 rounded text-[#A9AAA4] hover:text-[#F5F1E8] transition-colors pointer-events-auto"
              title="Expand photo view"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Prev / Next Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-[#0B0F0E]/85 hover:bg-[#D6B36A] text-[#F5F1E8] hover:text-[#0B0F0E] flex items-center justify-center border border-[#D6B36A]/30 shadow-lg transition-all transform hover:scale-105 active:scale-95 z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-[#0B0F0E]/85 hover:bg-[#D6B36A] text-[#F5F1E8] hover:text-[#0B0F0E] flex items-center justify-center border border-[#D6B36A]/30 shadow-lg transition-all transform hover:scale-105 active:scale-95 z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-[#F5F1E8] tracking-tight drop-shadow-md line-clamp-1">
              {currentPhoto.caption}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-[#D6B36A] font-bold drop-shadow">
              <MapPin className="w-3 h-3 text-[#D6B36A]" />
              <span>{currentPhoto.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Thumbnail Indicators */}
      {photos.length > 1 && (
        <div className="flex items-center justify-between gap-1.5 px-1">
          <div className="flex items-center gap-1.5">
            {photos.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-[#D6B36A] shadow-sm'
                    : 'w-2 bg-[#151A17] hover:bg-[#18352D]'
                }`}
                title={`Photo ${idx + 1}: ${p.location}`}
              />
            ))}
          </div>

          <span className="text-[10px] text-[#A9AAA4] flex items-center gap-1 font-medium">
            <Camera className="w-3 h-3 text-[#D6B36A]" />
            <span>Click photo to expand</span>
          </span>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[150] bg-[#0B0F0E]/95 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div 
            className="relative max-w-3xl w-full bg-[#111513] border border-[#D6B36A]/30 rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#D6B36A]/15 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#D6B36A]" />
                <h4 className="font-bold text-sm text-[#F5F1E8]">{currentPhoto.caption}</h4>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="w-8 h-8 rounded bg-[#151A17] hover:bg-[#18352D] text-[#F5F1E8] flex items-center justify-center transition-colors border border-[#D6B36A]/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-[#0B0F0E] border border-[#D6B36A]/20">
              <OptimizedImage
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#0B0F0E]/85 px-3 py-1.5 rounded border border-[#D6B36A]/30 flex items-center gap-2 text-xs font-bold text-[#D6B36A]">
                <MapPin className="w-3.5 h-3.5 text-[#D6B36A]" />
                <span>{currentPhoto.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-[#A9AAA4]">
              <span className="font-semibold text-[#D6B36A]">Package: {selectedRoute}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-1.5 bg-[#151A17] hover:bg-[#18352D] text-[#F5F1E8] border border-[#D6B36A]/20 rounded font-bold transition-colors"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-1.5 bg-[#D6B36A] hover:bg-[#E8CC8A] text-[#0B0F0E] rounded font-bold transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
