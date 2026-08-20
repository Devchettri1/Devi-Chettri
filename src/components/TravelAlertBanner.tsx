import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  CloudSnow,
  Info,
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Radio,
  Clock,
  Sparkles,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { TravelAlert, TravelAlertType } from '../types';

interface TravelAlertBannerProps {
  alert: TravelAlert | null;
  onNavigateAction?: (action?: string) => void;
  onOpenOwnerDashboardAlerts?: () => void;
  whatsappNumber?: string;
}

export const TravelAlertBanner: React.FC<TravelAlertBannerProps> = ({
  alert,
  onNavigateAction,
  onOpenOwnerDashboardAlerts,
  whatsappNumber = '+916296102341',
}) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Reset dismissal if the alert content or update timestamp changes
  useEffect(() => {
    if (alert) {
      const dismissedKey = `dismissed_alert_${alert.id}_${alert.updatedAt}`;
      const wasDismissed = sessionStorage.getItem(dismissedKey);
      setIsDismissed(Boolean(wasDismissed));
    }
  }, [alert?.id, alert?.updatedAt]);

  if (!alert || !alert.enabled || isDismissed) {
    return null;
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (alert) {
      sessionStorage.setItem(`dismissed_alert_${alert.id}_${alert.updatedAt}`, 'true');
    }
  };

  const handleAction = () => {
    if (!alert.linkAction) return;

    if (alert.linkAction === 'whatsapp') {
      const text = encodeURIComponent(`Namaste! I am checking on the live travel advisory: "${alert.title}". Please provide current road & permit status.`);
      window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
      return;
    }

    if (alert.linkAction === 'custom' && alert.customUrl) {
      window.open(alert.customUrl, '_blank');
      return;
    }

    if (onNavigateAction) {
      onNavigateAction(alert.linkAction);
    }
  };

  // Visual Theme Configuration
  const getThemeConfig = (type: TravelAlertType) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-r from-red-950 via-rose-900/90 to-red-950',
          border: 'border-b border-rose-500/50',
          text: 'text-rose-100',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
          btnBg: 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-950/50',
          icon: <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse flex-shrink-0" />,
          pulseColor: 'bg-rose-400',
          label: 'CRITICAL ADVISORY',
        };
      case 'weather':
        return {
          bg: 'bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-950',
          border: 'border-b border-cyan-500/40',
          text: 'text-cyan-100',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
          btnBg: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-cyan-950/50',
          icon: <CloudSnow className="w-4 h-4 text-cyan-300 flex-shrink-0 animate-bounce" />,
          pulseColor: 'bg-cyan-400',
          label: 'WEATHER UPDATE',
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950',
          border: 'border-b border-emerald-500/40',
          text: 'text-emerald-100',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
          btnBg: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold',
          icon: <Info className="w-4 h-4 text-emerald-300 flex-shrink-0" />,
          pulseColor: 'bg-emerald-400',
          label: 'OFFICIAL NOTICE',
        };
      case 'warning':
      default:
        return {
          bg: 'bg-gradient-to-r from-amber-950 via-amber-900/90 to-amber-950',
          border: 'border-b border-amber-500/40',
          text: 'text-amber-100',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
          btnBg: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-amber-950/50',
          icon: <AlertTriangle className="w-4 h-4 text-amber-300 animate-pulse flex-shrink-0" />,
          pulseColor: 'bg-amber-400',
          label: 'TRAVEL ALERT',
        };
    }
  };

  const theme = getThemeConfig(alert.type);

  return (
    <aside
      id="site-travel-alert-banner"
      aria-label="Travel Advisory Alert"
      className={`relative w-full z-50 transition-all duration-300 shadow-lg ${theme.bg} ${theme.border} text-xs`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4">
        {/* Left: Indicator & Content */}
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5 sm:mt-0">
            {theme.icon}
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${theme.badgeBg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${theme.pulseColor} animate-ping`} />
              {theme.label}
            </span>
          </div>

          {alert.locationTag && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-white/80 bg-black/30 px-2 py-0.5 rounded border border-white/10 flex-shrink-0">
              <MapPin className="w-3 h-3 text-cyan-300" />
              {alert.locationTag}
            </span>
          )}

          {/* Alert Main Headline & Message */}
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-[12px] sm:text-[13px] font-bold text-white tracking-wide truncate">
              {alert.title}
              <span className="hidden sm:inline font-normal text-white/90 text-xs ml-2">
                — {alert.message}
              </span>
            </p>
            {/* Mobile Expanded Message */}
            <p className="sm:hidden text-[11px] text-white/90 leading-tight mt-0.5 line-clamp-2">
              {alert.message}
            </p>
          </div>
        </div>

        {/* Right: Action CTA & Close Button */}
        <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0 w-full sm:w-auto justify-end">
          {alert.linkText && (
            <button
              id="btn-alert-action"
              onClick={handleAction}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded text-[11px] sm:text-xs transition-all shadow-sm active:scale-95 whitespace-nowrap ${theme.btnBg}`}
            >
              {alert.linkAction === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5" />}
              <span>{alert.linkText}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}

          <button
            id="btn-dismiss-alert"
            onClick={handleDismiss}
            aria-label="Dismiss travel alert"
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Dismiss notification for this session"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
