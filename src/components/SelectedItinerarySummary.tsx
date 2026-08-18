import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Car,
  Utensils,
  FileCheck,
  AlertCircle,
  Compass,
  Layers,
  Info
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import { TourPackage } from '../types';

interface SelectedItinerarySummaryProps {
  selectedRoute: string;
  onAddNoteRequirement?: (noteText: string) => void;
}

interface StructuredSummary {
  title: string;
  duration: string;
  category: string;
  heroHighlights: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    keyStop?: string;
  }>;
  inclusions: string[];
  permitsRequired: boolean;
  advisoryNote?: string;
}

export const SelectedItinerarySummary: React.FC<SelectedItinerarySummaryProps> = ({
  selectedRoute,
  onAddNoteRequirement,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true, 2: true });

  // Resolve matching package or fallback custom structure
  const getStructuredData = (): StructuredSummary => {
    const routeLower = selectedRoute.toLowerCase();

    // Try finding exact or partial title match in TOUR_PACKAGES
    let pkgMatch: TourPackage | undefined = TOUR_PACKAGES.find(
      (p) => p.title.toLowerCase().includes(routeLower) || routeLower.includes(p.title.toLowerCase())
    );

    if (!pkgMatch) {
      if (routeLower.includes('5n/6d') || routeLower.includes('grand circuit')) {
        pkgMatch = TOUR_PACKAGES.find((p) => p.id === 'pkg-5n6d-sikkim-darjeeling');
      } else if (routeLower.includes('north sikkim') || routeLower.includes('gurudongmar')) {
        pkgMatch = TOUR_PACKAGES.find((p) => p.id === 'pkg-north-sikkim');
      } else if (routeLower.includes('silk route') || routeLower.includes('zuluk')) {
        pkgMatch = TOUR_PACKAGES.find((p) => p.id === 'pkg-silk-route-zuluk');
      } else if (routeLower.includes('budget explorer') || routeLower.includes('gangtok, tsomgo')) {
        pkgMatch = TOUR_PACKAGES.find((p) => p.id === 'pkg-4n5d-sikkim-darjeeling-budget');
      } else if (routeLower.includes('honeymoon')) {
        pkgMatch = TOUR_PACKAGES.find((p) => p.id === 'pkg-honeymoon-sikkim-darjeeling');
      } else if (routeLower.includes('bhutan')) {
        pkgMatch = TOUR_PACKAGES.find((p) => p.id === 'pkg-bhutan-cultural');
      }
    }

    if (pkgMatch) {
      return {
        title: pkgMatch.title,
        duration: pkgMatch.duration,
        category: pkgMatch.category || 'Sikkim & Darjeeling',
        heroHighlights: pkgMatch.highlights.slice(0, 4),
        itinerary: pkgMatch.itinerary.map((it) => ({
          day: it.day,
          title: it.title,
          description: it.description,
          keyStop: it.title.includes('via') ? it.title.split('via')[1]?.trim() : it.title.split('to')[1]?.trim(),
        })),
        inclusions: pkgMatch.included.slice(0, 4),
        permitsRequired: pkgMatch.permitsRequired ?? true,
        advisoryNote: pkgMatch.permitsRequired
          ? 'Requires Army Protected Area Permits (North Sikkim / Tsomgo Pass). Our Gangtok office handles all permit clearances.'
          : undefined,
      };
    }

    // Cab rental fallback
    if (routeLower.includes('cab rental') || routeLower.includes('innova')) {
      return {
        title: 'Toyota Innova Crysta & SUV Dedicated Cab Rental',
        duration: 'Custom Rental Duration',
        category: 'Private Cab Service',
        heroHighlights: [
          'Clean, air-conditioned Toyota Innova Crysta / Scorpio',
          'Verified, courteous mountain drivers with snow driving experience',
          'All fuel, toll taxes, parking fees & driver night charges included',
          'NJP Railway Station & Bagdogra Airport (IXB) door-to-door pickups',
        ],
        itinerary: [
          {
            day: 1,
            title: 'NJP Station / IXB Airport Pickup & Hill Transfer',
            description: 'Driver receives you at arrival gate. Scenic drive through Teesta river valley to Gangtok/Darjeeling.',
          },
          {
            day: 2,
            title: 'Full Day Sightseeing & Permit Excursions',
            description: 'Exclusive vehicle at your service for Tsomgo Lake, Nathula Pass, or local 7-point city tours.',
          },
          {
            day: 3,
            title: 'Inter-Destination Transfers & Departure Drop',
            description: 'Smooth transfers between Gangtok, Pelling, Ravangla & Darjeeling with final airport drop.',
          },
        ],
        inclusions: [
          'Vehicle, Fuel, Driver Allowance, Parking & Tolls',
          '24x7 Gangtok Transport Desk Emergency Support',
        ],
        permitsRequired: false,
        advisoryNote: 'Cab rates are all-inclusive with zero hidden vehicle charges or driver night fees.',
      };
    }

    // Default custom itinerary fallback
    return {
      title: 'Custom Tailored Sikkim & Darjeeling Circuit',
      duration: 'Flexible Duration',
      category: 'Custom Package',
      heroHighlights: [
        'Personalized day-by-day route tailored to your group preferences',
        '3★ Deluxe or 4★ Luxury hotel options with MAP meal plans',
        'Private Innova / Scorpio vehicle dedicated for your entire trip',
        'Army permit clearances for Tsomgo Lake, Nathula Pass & North Sikkim',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival at Bagdogra (IXB) / NJP Station → Gangtok Transfer',
          description: 'Receive greeting at station/airport. Drive along Teesta river to Gangtok. Evening at leisure on MG Marg.',
        },
        {
          day: 2,
          title: 'Gangtok → Tsomgo Lake (12,400 ft) & Baba Mandir Excursion',
          description: 'High altitude glacial lake excursion with optional Nathula Pass Indo-China Border visit.',
        },
        {
          day: 3,
          title: 'Gangtok City Sightseeing → Darjeeling Hill Station Transfer',
          description: 'Visit Rumtek Monastery, Ropeway & Temi Tea Garden enroute to Darjeeling.',
        },
        {
          day: 4,
          title: 'Tiger Hill Kanchenjunga Sunrise & Departure Drop',
          description: 'Early morning Tiger Hill sunrise view, Batasia Loop, Ghoom Monastery & airport departure.',
        },
      ],
      inclusions: [
        '3★ Hotel Accommodation with Daily Breakfast & Dinner',
        'Dedicated Private Vehicle with Mountain Specialist Driver',
        'Protected Area Permits & Border Clearances',
      ],
      permitsRequired: true,
      advisoryNote: 'Send your request to receive a customized PDF quote within 5 minutes on WhatsApp!',
    };
  };

  const data = getStructuredData();

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  return (
    <div className="mt-3 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
      {/* Header Banner */}
      <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-500/30">
                Itinerary Summary
              </span>
              <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {data.duration}
              </span>
            </div>
            <h4 className="text-xs font-extrabold text-slate-100 truncate mt-0.5">
              {data.title}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-amber-300 px-2.5 py-1 bg-slate-800 hover:bg-slate-700/80 rounded-lg border border-slate-700/60 transition-colors flex-shrink-0"
        >
          <span>{isExpanded ? 'Hide Overview' : 'View Summary'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-3.5 space-y-3.5 text-xs animate-in fade-in duration-200">
          {/* Key Highlights Pill Tags */}
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Tour Highlights & Key Stops</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.heroHighlights.map((hl, idx) => (
                <span
                  key={idx}
                  className="bg-slate-900/90 text-slate-200 text-[10.5px] px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Day-by-Day High Level Timeline */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-teal-400" />
                <span>Day-by-Day Journey Breakdown ({data.itinerary.length} Days)</span>
              </div>
              <span className="text-[10px] text-slate-500 italic">Tap day to expand detail</span>
            </div>

            <div className="space-y-1.5 border-l-2 border-slate-800 ml-2 pl-3">
              {data.itinerary.map((item) => {
                const isOpen = expandedDays[item.day];
                return (
                  <div
                    key={item.day}
                    className="relative group bg-slate-900/60 hover:bg-slate-900 rounded-xl p-2.5 border border-slate-800/80 transition-all"
                  >
                    {/* Day circle node */}
                    <div className="absolute -left-[19px] top-3 w-3 h-3 rounded-full bg-slate-900 border-2 border-emerald-500 shadow-md" />

                    <div
                      className="flex items-start justify-between gap-2 cursor-pointer"
                      onClick={() => toggleDay(item.day)}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60">
                            Day {item.day}
                          </span>
                          <h5 className="font-bold text-slate-200 text-xs truncate">
                            {item.title}
                          </h5>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="text-slate-500 hover:text-slate-300 p-0.5"
                      >
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {isOpen && (
                      <p className="mt-2 text-[11px] text-slate-300 leading-relaxed bg-slate-950/70 p-2 rounded-lg border border-slate-800/60 font-sans">
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Major Inclusions Footer Grid */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/90 grid grid-cols-2 gap-2 text-[10.5px]">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Car className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Private Non-AC Vehicle Included</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Utensils className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>MAP Meals (Breakfast & Dinner)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <FileCheck className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
              <span>All Permit Clearances Included</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
              <span>Govt Regd Gangtok Desk 24x7 Support</span>
            </div>
          </div>

          {/* Advisory or Note Banner */}
          {data.advisoryNote && (
            <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-[10.5px] text-amber-200/90 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-medium">{data.advisoryNote}</p>
                {onAddNoteRequirement && (
                  <button
                    type="button"
                    onClick={() => onAddNoteRequirement(`Need permits for ${data.title}`)}
                    className="mt-1 text-[10px] font-bold text-amber-400 underline hover:text-amber-300 block"
                  >
                    + Add permit requirement to special requests
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
