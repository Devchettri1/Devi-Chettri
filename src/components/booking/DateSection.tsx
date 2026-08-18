import React from 'react';
import { Calendar, CloudSun, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getSeasonMultiplier } from './pricingEngine';

interface DateSectionProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  totalNights: number;
}

export const DateSection: React.FC<DateSectionProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  totalNights,
}) => {
  // Today formatted as YYYY-MM-DD for min date
  const today = new Date().toISOString().split('T')[0];

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onStartDateChange(val);
    if (val) {
      const d = new Date(val);
      d.setDate(d.getDate() + totalNights);
      onEndDateChange(d.toISOString().split('T')[0]);
    }
  };

  const seasonInfo = getSeasonMultiplier(startDate);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Travel Dates & Season Forecast</span>
          </h4>
          <p className="text-[11px] text-slate-400">Select arrival date. Departure date calculates automatically.</p>
        </div>
        <span className="text-[10px] text-amber-300 font-mono bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60">
          {totalNights} Nights / {totalNights + 1} Days
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
            <span>Arrival / Pickup Date</span>
            <span className="text-rose-400">*</span>
          </label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={handleStartChange}
            className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-100 focus:outline-none transition-all font-mono"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
            <span>Departure / Drop Date</span>
            <span className="text-[10px] text-slate-500 font-normal">Calculated automatically</span>
          </label>
          <input
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-100 focus:outline-none transition-all font-mono opacity-90"
          />
        </div>
      </div>

      {/* Season Intelligence Banner */}
      {startDate ? (
        <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-800/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-700/50 text-cyan-400">
              <CloudSun className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-200">{seasonInfo.name}</p>
              <p className="text-[10px] text-slate-400">Clear mountain views, pleasant road conditions & snow availability.</p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-lg bg-cyan-900/60 text-cyan-300 border border-cyan-700/40 text-[10px] font-bold">
            {seasonInfo.tag}
          </span>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Flexible dates? Select your tentative month and our concierge will secure optimal weather slots!</span>
        </div>
      )}
    </div>
  );
};
