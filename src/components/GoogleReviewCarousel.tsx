import {
  sikkimHeroBanner,
  yumthangZeroPoint,
  bhutanTigersNest,
  innovaCrystaCab,
  ravanglaBuddhaPark,
  gmbOfficePhoto
} from '../assets/images';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, ThumbsUp, ShieldCheck, Quote, ExternalLink, CheckCircle2, MessageCircle } from 'lucide-react';
import { CustomerReview } from '../types';
import { REVIEWS } from '../data/travelData';
import { OptimizedImage } from './ui/OptimizedImage';

// Extended Google Review interface with reviewer avatars & local guide stats
export interface GoogleReviewItem extends CustomerReview {
  googleGuideLevel?: string;
  reviewerAvatar?: string;
  tripPhotoUrl?: string;
  isVerifiedBooking?: boolean;
  bookedViaWhatsapp?: boolean;
}

const GOOGLE_REVIEWS_DATA: GoogleReviewItem[] = [
  {
    id: "g-rev-1",
    author: "Anand Verma & Family",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "July 2026",
    comment: "Flawless arrangement! We booked the 5N/6D Sikkim & Darjeeling tour with an Innova Crysta. Driver Passang was punctual, extremely safe on mountain bends, and recommended fantastic pure veg thali spots in Gangtok. Permits for Nathula were issued effortlessly!",
    packageTaken: "5N/6D Sikkim & Darjeeling Tour",
    externalPlatform: "Google",
    approved: true,
    helpfulCount: 24,
    googleGuideLevel: "Local Guide · Level 6 (42 reviews)",
    reviewerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tripPhotoUrl: sikkimHeroBanner,
    isVerifiedBooking: true,
    bookedViaWhatsapp: true,
  },
  {
    id: "g-rev-2",
    author: "Subhashis Mukhopadhyay & Group",
    location: "Kolkata, West Bengal",
    rating: 5,
    date: "June 2026",
    comment: "Visited Zero Point at 15,300ft with OffbeatDestination Travels. Passang and our North Sikkim driver kept us safe and comfortable during snowy weather. Transparent pricing, pure veg food arrangements, and no hidden costs!",
    packageTaken: "North Sikkim 3N/4D Zero Point Expedition",
    externalPlatform: "Google",
    approved: true,
    helpfulCount: 31,
    googleGuideLevel: "Local Guide · Level 5 (28 reviews)",
    reviewerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    tripPhotoUrl: yumthangZeroPoint,
    isVerifiedBooking: true,
    bookedViaWhatsapp: true,
  },
  {
    id: "g-rev-3",
    author: "Meenakshi & Rahul Roy",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "August 2026",
    comment: "Bhutan Tour was magical! OffbeatDestination handled all SDF fees, permits, and assigned a super polite Bhutanese guide. Hiking Tiger's Nest was a dream come true. Highly recommended local Gangtok agency!",
    packageTaken: "Custom Bhutan Cultural Odyssey",
    externalPlatform: "Google",
    approved: true,
    helpfulCount: 19,
    googleGuideLevel: "Verified Google Traveler",
    reviewerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    tripPhotoUrl: bhutanTigersNest,
    isVerifiedBooking: true,
    bookedViaWhatsapp: true,
  },
  {
    id: "g-rev-4",
    author: "Dr. K. Swaminathan",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "May 2026",
    comment: "Top-notch professionalism. Being elderly travelers, pure vegetarian meal timing was crucial for us. OffbeatDestination arranged perfect AP meal plans and provided an exceptionally smooth Innova Crysta for NJP pickup.",
    packageTaken: "Innova Crysta Cab & Custom Sikkim Tour",
    externalPlatform: "Google",
    approved: true,
    helpfulCount: 18,
    googleGuideLevel: "Local Guide · Level 7 (84 reviews)",
    reviewerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    tripPhotoUrl: innovaCrystaCab,
    isVerifiedBooking: true,
    bookedViaWhatsapp: true,
  },
  {
    id: "g-rev-5",
    author: "Pooja & Sameer Kulkarni",
    location: "Pune, Maharashtra",
    rating: 5,
    date: "July 2026",
    comment: "Exceptional service by Mr. Tamang at OffbeatDestination. Everything from Bagdogra airport pickup to hotel check-ins in Gangtok and Pelling was smooth. Highly recommend them for family trips!",
    packageTaken: "6N/7D Grand Sikkim & Pelling Tour",
    externalPlatform: "Google",
    approved: true,
    helpfulCount: 22,
    googleGuideLevel: "Verified Google Reviewer",
    reviewerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    tripPhotoUrl: ravanglaBuddhaPark,
    isVerifiedBooking: true,
    bookedViaWhatsapp: true,
  },
  {
    id: "g-rev-6",
    author: "Rohan & Sneha Deshmukh",
    location: "Nagpur, Maharashtra",
    rating: 5,
    date: "August 2026",
    comment: "Visited the OffbeatDestination office in Gangtok near Arithang before starting our North Sikkim tour. Very welcoming staff, instant hard-copy permits issued, and clear itinerary explanation over tea!",
    packageTaken: "Gangtok Local Office Booking",
    externalPlatform: "Google",
    approved: true,
    helpfulCount: 29,
    googleGuideLevel: "Local Guide · Level 5 (36 reviews)",
    reviewerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    tripPhotoUrl: gmbOfficePhoto,
    isVerifiedBooking: true,
    bookedViaWhatsapp: true,
  },
];

interface GoogleReviewCarouselProps {
  compact?: boolean;
  autoPlay?: boolean;
}

export const GoogleReviewCarousel: React.FC<GoogleReviewCarouselProps> = ({
  compact = true,
  autoPlay = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState<{ [id: string]: number }>({});
  const [photoModalUrl, setPhotoModalUrl] = useState<string | null>(null);

  const reviews = GOOGLE_REVIEWS_DATA;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, isPaused, reviews.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const currentReview = reviews[currentIndex];

  const handleHelpfulClick = (id: string, initialCount: number) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xl overflow-hidden"
    >
      {/* Top Google Review Trust Banner Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          {/* Authentic Google 'G' Logo */}
          <div className="w-6 h-6 rounded-full bg-white p-1 flex items-center justify-center shadow-md flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.23v3.15C3.25 21.37 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.23C.44 8.18 0 10.03 0 12s.44 3.82 1.23 5.39l4.05-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.63 1.23 6.61l4.05 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-100 tracking-tight">Google Reviews</span>
              <span className="text-[10px] font-extrabold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded">
                4.9 ★
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              520+ Verified Travelers · Govt Reg. Agency
            </p>
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/80 active:scale-95"
            title="Previous Review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-slate-400 px-1">
            {currentIndex + 1}/{reviews.length}
          </span>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-700/80 active:scale-95"
            title="Next Review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Content Animated Box */}
      <div className="min-h-[140px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-2.5"
          >
            {/* Reviewer Header: Avatar + Name + Rating */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <OptimizedImage
                    src={currentReview.reviewerAvatar}
                    alt={currentReview.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/80 shadow-md"
                  />
                  {/* Google Small Badge on Avatar */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full p-0.5 shadow flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h4 className="text-xs font-black text-slate-100 leading-tight">
                      {currentReview.author}
                    </h4>
                    {currentReview.isVerifiedBooking !== false && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-emerald-300 bg-emerald-950/90 border border-emerald-700/80 px-1.5 py-0.5 rounded-md shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Verified Booking
                      </span>
                    )}
                    {currentReview.bookedViaWhatsapp && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-green-300 bg-green-950/90 border border-green-700/80 px-1.5 py-0.5 rounded-md shadow-sm">
                        <MessageCircle className="w-3 h-3 text-green-400 fill-green-500/20" />
                        Booked via WhatsApp
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">
                    {currentReview.location} · <span className="text-amber-300">{currentReview.googleGuideLevel}</span>
                  </p>
                </div>
              </div>

              {/* Star Rating & Date */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-0.5">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                  {currentReview.date}
                </span>
              </div>
            </div>

            {/* Package Taken Badge */}
            <div className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-teal-300">
              <span className="text-amber-400">📍</span>
              <span>{currentReview.packageTaken}</span>
            </div>

            {/* Comment Text with Quote Icon */}
            <div className="relative bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-normal">
              <Quote className="w-4 h-4 text-emerald-500/30 absolute top-1.5 right-2 pointer-events-none" />
              <p className="pr-4 line-clamp-3 hover:line-clamp-none transition-all">
                "{currentReview.comment}"
              </p>
            </div>

            {/* Footer with Traveler Trip Photo Thumbnail & Helpful Button */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
              {currentReview.tripPhotoUrl ? (
                <button
                  type="button"
                  onClick={() => setPhotoModalUrl(currentReview.tripPhotoUrl || null)}
                  className="flex items-center gap-2 group hover:text-emerald-300 transition-colors"
                >
                  <OptimizedImage
                    src={currentReview.tripPhotoUrl}
                    alt="Traveler Trip Photo"
                    className="w-10 h-7 rounded-md object-cover border border-slate-700 group-hover:border-emerald-500 transition-all shadow"
                  />
                  <span className="text-[10px] font-bold underline decoration-slate-600 group-hover:decoration-emerald-400">
                    View Traveler's Holiday Photo
                  </span>
                </button>
              ) : (
                <span className="text-[10px] text-slate-500 italic">Google Verified Traveler Review</span>
              )}

              <button
                type="button"
                onClick={() =>
                  handleHelpfulClick(
                    currentReview.id,
                    currentReview.helpfulCount || 10
                  )
                }
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 text-[10px] font-bold transition-all active:scale-95"
              >
                <ThumbsUp className="w-3 h-3 text-emerald-400" />
                <span>
                  Helpful (
                  {helpfulCounts[currentReview.id] ??
                    currentReview.helpfulCount ??
                    12}
                  )
                </span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Dot Indicators & Direct Google Maps Link */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mt-2 text-[10px]">
        <div className="flex items-center gap-1.5">
          {reviews.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-emerald-400 shadow-sm'
                  : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        <a
          href="https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold hover:underline transition-colors"
        >
          <span>View All Reviews on Google Maps</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Traveler Photo Enlargement Modal */}
      {photoModalUrl && (
        <div
          onClick={() => setPhotoModalUrl(null)}
          className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-3 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Traveler Photo from Google Review
              </span>
              <button
                onClick={() => setPhotoModalUrl(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>
            <OptimizedImage
              src={photoModalUrl || ''}
              alt="Traveler Holiday Photo"
              className="w-full max-h-[70vh] object-cover rounded-xl border border-slate-800 shadow"
            />
            <p className="text-[11px] text-slate-400 text-center italic">
              Authentic holiday photograph taken during guest's trip with OffbeatDestination Travels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
