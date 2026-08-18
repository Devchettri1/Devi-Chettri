import React from 'react';
import { Map, Clock, ShieldCheck, Sparkles, Check, ChevronRight } from 'lucide-react';
import { TOUR_OPTIONS } from './pricingEngine';
import { TourOption } from './BookingTypes';

interface TourSelectionProps {
  selectedTourId: string;
  onSelectTour: (tour: TourOption) => void;
}

export const TourSelection: React.FC<TourSelectionProps> = ({
  selectedTourId,
  onSelectTour,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Map className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Tour Package & Route Circuit</span>
          </h4>
          <p className="text-[11px] text-slate-400">All packages include dedicated vehicle, stays, meals & permits.</p>
        </div>
        <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/60">
          6 Handcrafted Circuits
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOUR_OPTIONS.map((tour) => {
          const isSelected = selectedTourId === tour.id;
          return (
            <div
              key={tour.id}
              onClick={() => onSelectTour(tour)}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/70 via-[#0A1128] to-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/40'
                  : 'bg-[#060B18] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              {tour.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 font-bold text-[9px] px-2.5 py-0.5 rounded-bl-xl shadow-sm uppercase tracking-wider">
                  ★ Bestseller
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 font-bold text-[10px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {tour.duration}
                  </span>
                  {tour.permitsRequired && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 font-semibold text-[9px] border border-emerald-800/60 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Permit Included ({tour.permitType})
                    </span>
                  )}
                </div>

                <h5 className="font-bold text-xs text-slate-100 mb-1 leading-snug">
                  {tour.name}
                </h5>

                <ul className="space-y-1 mb-3">
                  {tour.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-tight">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between mt-auto text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Starting from</span>
                  <span className="font-black text-amber-300 text-sm">
                    ₹{tour.basePricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal"> / person</span>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
