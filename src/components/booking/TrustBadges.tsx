import React from 'react';
import { ShieldCheck, Award, Clock, Star, MapPin, CheckCircle2 } from 'lucide-react';
import { AGENCY_DETAILS } from '../../data/travelData';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Sikkim Govt Regd',
      subtitle: 'Reg: 1750/DoT&CAv/Gtk/25/TA',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-950/40 border-emerald-800/60',
    },
    {
      icon: Star,
      title: '4.9★ Google Verified',
      subtitle: '540+ Authentic Reviews',
      color: 'text-amber-400',
      bgColor: 'bg-amber-950/40 border-amber-800/60',
    },
    {
      icon: Award,
      title: 'Zero Commission',
      subtitle: 'Direct Gangtok Head Office',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-950/40 border-cyan-800/60',
    },
    {
      icon: Clock,
      title: '24×7 Local Concierge',
      subtitle: 'Emergency Hill Assistance',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-950/40 border-indigo-800/60',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <div
            key={idx}
            className={`p-2 rounded-xl border flex items-center gap-2 ${badge.bgColor} transition-all`}
          >
            <div className="p-1.5 rounded-lg bg-slate-900/80 flex-shrink-0">
              <Icon className={`w-3.5 h-3.5 ${badge.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-200 truncate leading-tight">{badge.title}</p>
              <p className="text-[9px] text-slate-400 truncate leading-tight">{badge.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
