import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../../data/travelData';

export const ReviewCarousel: React.FC = () => {
  const reviews = REVIEWS.filter((r) => r.rating >= 4.8).slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (!reviews.length) return null;

  const current = reviews[currentIndex];

  return (
    <div className="p-3.5 bg-gradient-to-br from-[#060B18] to-[#0A1128] border border-cyan-900/40 rounded-2xl relative overflow-hidden shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400" />
            ))}
          </div>
          <span className="text-[11px] font-bold text-slate-300">4.9 / 5.0 Rating</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold">
            Google Verified
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
            className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="relative">
        <Quote className="w-6 h-6 text-cyan-500/20 absolute -top-1 -left-1" />
        <p className="text-xs text-slate-300 italic leading-relaxed pl-5 line-clamp-2">
          "{current.comment}"
        </p>
      </div>

      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/60 text-[11px]">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-500/50 flex items-center justify-center text-[9px] font-bold text-cyan-300">
            {current.author[0]}
          </div>
          <span className="font-bold text-slate-200">{current.author}</span>
          <span className="text-slate-500 text-[10px]">({current.location})</span>
        </div>
        <span className="text-[10px] text-amber-400/90 font-medium truncate max-w-[140px]">
          {current.packageTaken}
        </span>
      </div>
    </div>
  );
};
