import React from 'react';
import { Users, Baby, UserCheck, BedDouble, AlertCircle } from 'lucide-react';

interface TravellerSectionProps {
  adults: number;
  children: number;
  infants: number;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  onInfantsChange: (count: number) => void;
}

export const TravellerSection: React.FC<TravellerSectionProps> = ({
  adults,
  children,
  infants,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
}) => {
  const roomsCount = Math.ceil(adults / 2);
  const totalOccupants = adults + children;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Travelers & Room Configuration</span>
          </h4>
          <p className="text-[11px] text-slate-400">Specify adults, children (5-11 yrs), and infants (under 5 yrs).</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
          <BedDouble className="w-3.5 h-3.5 text-amber-400" />
          <span>{roomsCount} Room{roomsCount > 1 ? 's' : ''} Recommended</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Adults Counter */}
        <div className="p-3 bg-[#060B18] border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-200 font-bold text-xs">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Adults</span>
            </div>
            <p className="text-[10px] text-slate-500">Age 12+ years</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="w-6 text-center font-bold text-sm text-cyan-300 font-mono">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => onAdultsChange(Math.min(30, adults + 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Children Counter */}
        <div className="p-3 bg-[#060B18] border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-200 font-bold text-xs">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Children</span>
            </div>
            <p className="text-[10px] text-slate-500">Age 5 - 11 years</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChildrenChange(Math.max(0, children - 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="w-6 text-center font-bold text-sm text-amber-300 font-mono">
              {children}
            </span>
            <button
              type="button"
              onClick={() => onChildrenChange(Math.min(20, children + 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Infants Counter */}
        <div className="p-3 bg-[#060B18] border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1 text-slate-200 font-bold text-xs">
              <Baby className="w-3.5 h-3.5 text-emerald-400" />
              <span>Infants</span>
            </div>
            <p className="text-[10px] text-slate-500">Under 5 years (Free)</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onInfantsChange(Math.max(0, infants - 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors"
            >
              -
            </button>
            <span className="w-6 text-center font-bold text-sm text-emerald-300 font-mono">
              {infants}
            </span>
            <button
              type="button"
              onClick={() => onInfantsChange(Math.min(10, infants + 1))}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {totalOccupants > 6 && (
        <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/60 flex items-center gap-2 text-xs text-amber-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Large group ({totalOccupants} pax): We recommend booking 2 Innova Crystas or a 13-Seater Tempo Traveller for maximum comfort on winding mountain roads.</span>
        </div>
      )}
    </div>
  );
};
