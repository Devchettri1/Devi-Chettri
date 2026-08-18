import React, { useState } from 'react';
import { 
  MessageCircle, 
  Sparkles, 
  Phone, 
  ShieldCheck, 
  Car, 
  Compass, 
  Building2, 
  Tag, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  X,
  ExternalLink
} from 'lucide-react';
import { useWhatsApp, ContextType } from '../../utils/whatsAppContext';
import { AGENCY_DETAILS } from '../../data/travelData';

interface FloatingWhatsAppTriggerProps {
  onOpenBookingModal: () => void;
  unreadCount?: number;
}

const getContextIcon = (type: ContextType) => {
  switch (type) {
    case 'cab':
      return Car;
    case 'package':
      return Compass;
    case 'hotel':
      return Building2;
    case 'offer':
      return Tag;
    case 'calculator':
      return Calculator;
    default:
      return Sparkles;
  }
};

const getContextTypeBadge = (type: ContextType) => {
  switch (type) {
    case 'cab':
      return { label: 'Cab Rental', color: 'text-amber-300 border-amber-500/40 bg-amber-950/80' };
    case 'package':
      return { label: 'Tour Package', color: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/80' };
    case 'hotel':
      return { label: 'Hotel Booking', color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/80' };
    case 'offer':
      return { label: 'Special Offer', color: 'text-rose-300 border-rose-500/40 bg-rose-950/80' };
    case 'calculator':
      return { label: 'Custom Quote', color: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/80' };
    default:
      return { label: 'Himalayan Concierge', color: 'text-cyan-300 border-cyan-500/40 bg-cyan-950/80' };
  }
};

export const FloatingWhatsAppTrigger: React.FC<FloatingWhatsAppTriggerProps> = ({
  onOpenBookingModal,
}) => {
  const { context, openWhatsAppChat, buildContextualMessage } = useWhatsApp();
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  const ContextIcon = getContextIcon(context.type);
  const badgeInfo = getContextTypeBadge(context.type);

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWhatsAppChat();
  };

  const handleOpenBooking = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuickMenu(false);
    onOpenBookingModal();
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Expanded Quick Action Flyout Menu when toggled */}
      {showQuickMenu && (
        <div className="mb-2 bg-[#060B18]/95 backdrop-blur-xl border border-cyan-500/40 p-3.5 rounded-2xl shadow-2xl shadow-black/80 w-72 sm:w-80 text-xs space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeInfo.color}`}>
                {badgeInfo.label}
              </span>
              <span className="text-[11px] font-bold text-slate-200">WhatsApp Inquiry</span>
            </div>
            <button
              onClick={() => setShowQuickMenu(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
              aria-label="Close menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current Page Context Box */}
          <div className="bg-[#0A1128] p-2.5 rounded-xl border border-slate-800/80 space-y-1">
            <div className="flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-700/50 text-cyan-300 flex-shrink-0 mt-0.5">
                <ContextIcon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Inquiring about:
                </p>
                <p className="font-bold text-slate-100 line-clamp-2 leading-tight">
                  {context.title}
                </p>
                {context.subtitle && (
                  <p className="text-[10px] text-cyan-300 mt-0.5 truncate font-medium">
                    {context.subtitle}
                  </p>
                )}
                {context.duration && (
                  <p className="text-[10px] text-amber-300 mt-0.5 font-semibold">
                    ⏱️ {context.duration}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5">
            {/* Primary: Direct WhatsApp with prefilled context */}
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20ba59] hover:to-[#17a34e] text-slate-950 font-black rounded-xl text-xs flex items-center justify-between transition-all shadow-lg shadow-[#25D366]/20 group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Chat on WhatsApp Now</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Secondary: Open Full Cost Estimator & Itinerary PDF */}
            <button
              type="button"
              onClick={handleOpenBooking}
              className="w-full py-2 px-3 bg-[#0A1128] hover:bg-slate-900 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 font-bold rounded-xl text-[11px] flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                <span>Customize Itinerary & Get PDF</span>
              </div>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${AGENCY_DETAILS.phonePrimary}`}
              className="w-full py-1.5 px-3 bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 hover:text-white rounded-xl text-[10px] flex items-center justify-between transition-all border border-slate-800"
            >
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>Call Gangtok Desk: {AGENCY_DETAILS.phonePrimary}</span>
              </div>
              <span className="text-[9px] text-emerald-400 font-bold">24x7</span>
            </a>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sikkim Govt. Regd Desk
            </span>
            <span>Avg. reply &lt; 2 mins</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Bar */}
      <div className="flex items-center gap-2 group">
        {/* Context Pill Badge (Desktop & Tablet) */}
        <div 
          onClick={handleDirectWhatsApp}
          className="hidden sm:flex items-center gap-2 bg-[#060B18]/90 hover:bg-[#0A1128] border border-cyan-500/40 hover:border-cyan-400 text-slate-100 px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-md cursor-pointer transition-all max-w-xs transform hover:scale-[1.02] active:scale-95"
          title="Click to inquire about this on WhatsApp"
        >
          <div className="p-1 rounded-full bg-cyan-950 text-cyan-300 flex-shrink-0">
            <ContextIcon className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 pr-1">
            <p className="text-[9px] font-bold text-cyan-300 uppercase tracking-wider leading-none">
              Inquire on WhatsApp
            </p>
            <p className="text-xs font-bold text-white truncate max-w-[170px]">
              {context.title}
            </p>
          </div>
          <span className="text-[10px] bg-[#25D366] text-slate-950 font-black px-1.5 py-0.5 rounded-full flex-shrink-0">
            Send ➔
          </span>
        </div>

        {/* Primary Floating Action WhatsApp Button */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            aria-label={`Inquire about ${context.title} on WhatsApp`}
            className="relative p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-emerald-600 via-[#25D366] to-teal-400 text-slate-950 font-black shadow-2xl shadow-emerald-500/40 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 border border-emerald-300/40"
          >
            {/* Pulsing radar aura rings */}
            <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
            <span className="absolute -inset-2 rounded-full bg-emerald-500/10 pointer-events-none" />

            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-slate-950 text-slate-950" />

            <span className="hidden md:inline font-bold text-xs sm:text-sm tracking-wide pr-1">
              WhatsApp Booking
            </span>

            {/* Live Active Online Green Dot */}
            <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400 border-2 border-slate-900" />
            </span>
          </button>

          {/* Quick Menu Options Toggle Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickMenu((prev) => !prev);
            }}
            aria-label="Toggle options"
            className="absolute -top-2 -left-2 bg-[#060B18] hover:bg-[#0A1128] text-cyan-300 hover:text-white border border-cyan-500/50 p-1 rounded-full shadow-lg transition-all"
            title="View Context Details & Booking Options"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
