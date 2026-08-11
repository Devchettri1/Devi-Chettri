import React from 'react';
import { CalendarCheck, ShieldCheck, Sparkles } from 'lucide-react';

interface LiveAvailabilityBadgeProps {
  selectedRoute: string;
  selectedDate?: string;
  className?: string;
}

export const LiveAvailabilityBadge: React.FC<LiveAvailabilityBadgeProps> = ({
  selectedRoute,
  selectedDate,
  className = '',
}) => {
  return (
    <div className={`mt-2.5 p-3 bg-slate-900/90 rounded-xl border border-emerald-800/40 shadow-lg relative overflow-hidden ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Honest Demand Status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-700/40 rounded-lg text-emerald-300 font-semibold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Popular Route — Early Booking Recommended</span>
          </div>
        </div>

        {/* Confirmation Note */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
          <CalendarCheck className="w-3 h-3 text-amber-400" />
          <span>Dates: <strong className="text-slate-100">{selectedDate || 'Flexible'}</strong></span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
        <span className="flex items-center gap-1 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Availability & Permit slot subject to final confirmation
        </span>
        <span className="text-emerald-400 font-bold hidden sm:inline">
          Official Sikkim Govt Reg. Agency
        </span>
      </div>
    </div>
  );
};
