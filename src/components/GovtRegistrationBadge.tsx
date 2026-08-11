import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface GovtRegistrationBadgeProps {
  variant?: 'badge' | 'icon' | 'compact';
  className?: string;
}

export const GovtRegistrationBadge: React.FC<GovtRegistrationBadgeProps> = ({
  variant = 'badge',
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={() => setShowTooltip(!showTooltip)}
    >
      <button
        type="button"
        aria-label="Government Registration Validation"
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 hover:border-emerald-500 hover:bg-emerald-900 transition-all text-[11px] font-bold shadow-sm cursor-help focus:outline-none focus:ring-1 focus:ring-emerald-500"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        {variant !== 'icon' && (
          <span className="whitespace-nowrap">Govt. Regd.</span>
        )}
        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
      </button>

      {/* Tooltip on Hover */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 border border-emerald-500/80 rounded-xl shadow-2xl z-50 text-slate-100 text-[11px] space-y-1 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 border-b border-slate-800 pb-1">
            <Award className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>Official Government License</span>
          </div>
          <div className="space-y-0.5 text-[10px]">
            <p className="text-slate-200 font-medium">
              <span className="text-slate-400">License No:</span>{' '}
              <strong className="text-amber-300 font-mono font-bold">{AGENCY_DETAILS.licenseNo}</strong>
            </p>
            <p className="text-slate-300 leading-tight">
              <span className="text-slate-400">Authority:</span> {AGENCY_DETAILS.issuingAuthority}
            </p>
            <p className="text-emerald-400 font-semibold text-[9px] pt-0.5">
              ✓ Verified & {AGENCY_DETAILS.validity}
            </p>
          </div>
          {/* Tooltip Arrow Pointer */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
