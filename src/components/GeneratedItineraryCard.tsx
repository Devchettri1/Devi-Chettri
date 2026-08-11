import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Car, ShieldCheck, ChevronDown, ChevronUp, Check, AlertTriangle, Sparkles, MessageCircle, MapPin, Compass, Utensils, Hotel, Download, FileText } from 'lucide-react';
import { GeneratedItinerary, GeneratedItineraryDay } from '../types';
import { AGENCY_DETAILS } from '../data/travelData';
import { generateItineraryPDF } from '../utils/pdfGenerator';

interface GeneratedItineraryCardProps {
  itinerary: GeneratedItinerary;
  onRequestWhatsAppQuote?: (itineraryTitle: string) => void;
}

export const GeneratedItineraryCard: React.FC<GeneratedItineraryCardProps> = ({
  itinerary,
  onRequestWhatsAppQuote
}) => {
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const toggleDay = (dayNum: number) => {
    setExpandedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const whatsappMessage = `Namaste! I would like to book/get a WhatsApp quotation for this custom AI Itinerary:
*${itinerary.title}* (${itinerary.duration})
Companions: ${itinerary.companions || 'Group'} | Budget: ${itinerary.budgetTier || 'Deluxe'}
Estimated Cost: ${itinerary.estimatedCostPerPerson} per person
Vehicle: ${itinerary.vehicleRecommended || 'Innova Crysta'}`;

  return (
    <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl shadow-2xl overflow-hidden text-xs my-3 space-y-0">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-4 border-b border-emerald-800/60 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>AI Tailored Tour Proposal</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
              {itinerary.budgetTier || 'Deluxe'}
            </span>
            <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-700">
              {itinerary.duration}
            </span>
            <button
              onClick={() => generateItineraryPDF(itinerary)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-2.5 py-0.5 rounded text-[10px] flex items-center gap-1 transition-all shadow-sm"
              title="Save as PDF document"
            >
              <Download className="w-3 h-3" />
              <span>PDF</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
            {itinerary.title}
          </h3>
          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
            {itinerary.overview}
          </p>
        </div>

        {/* Mandatory Lachung 2-Night Rule Notice */}
        {(itinerary.hasNorthSikkim || itinerary.lachungMandatory2NightsApplied || itinerary.title.toLowerCase().includes('north') || itinerary.title.toLowerCase().includes('lachung')) && (
          <div className="bg-amber-950/80 border border-amber-500/60 p-2.5 rounded-xl text-[11px] text-amber-200 flex items-start gap-2 shadow-inner">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold text-amber-300 block">
                Mandatory 2-Night Lachung Stay Included
              </span>
              <span className="text-[10px] text-amber-200/90 leading-tight block">
                As per official Sikkim Tourism & Army licensing regulations, all North Sikkim trips mandatorily feature a 2-Night Stay in Lachung village for high-altitude acclimatization & snow route permit approval.
              </span>
            </div>
          </div>
        )}

        {/* Cost & Vehicle Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-900/60 text-slate-200">
          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Estimated Price</span>
              <span className="font-extrabold text-emerald-300 text-xs">{itinerary.estimatedCostPerPerson} <span className="text-[9px] text-slate-400 font-normal">/ person</span></span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Group Total</span>
              <span className="font-bold text-slate-200 text-xs">{itinerary.totalEstimatedCost || 'Custom Quote'}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800 flex items-center gap-2">
            <Car className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-slate-400 uppercase font-bold block">Private Vehicle</span>
              <span className="font-bold text-amber-300 text-[11px] truncate block" title={itinerary.vehicleRecommended}>
                {itinerary.vehicleRecommended || 'Innova Crysta / Scorpio 4x4'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Day-by-Day Detailed Timeline */}
      <div className="p-4 space-y-3 bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-extrabold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Day-by-Day Customized Plan</span>
          </span>
          <button
            onClick={() => {
              const allExpanded = Object.keys(expandedDays).length === itinerary.dayByDay.length;
              if (allExpanded) {
                setExpandedDays({});
              } else {
                const newExp: Record<number, boolean> = {};
                itinerary.dayByDay.forEach(d => { newExp[d.day] = true; });
                setExpandedDays(newExp);
              }
            }}
            className="text-[10px] text-emerald-400 hover:underline font-bold"
          >
            Toggle All Days
          </button>
        </div>

        <div className="space-y-2">
          {itinerary.dayByDay.map((day: GeneratedItineraryDay) => {
            const isExpanded = !!expandedDays[day.day];
            return (
              <div
                key={day.day}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                {/* Day Header */}
                <button
                  onClick={() => toggleDay(day.day)}
                  className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black flex items-center justify-center text-[10px] flex-shrink-0">
                      D{day.day}
                    </span>
                    <span className="font-bold text-slate-100 text-xs">
                      {day.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {/* Day Content */}
                {isExpanded && (
                  <div className="p-3 pt-0 border-t border-slate-800/80 space-y-2.5 text-slate-300">
                    <p className="text-[11px] leading-relaxed pt-2 text-slate-300">
                      {day.details}
                    </p>

                    {/* Popular vs Offbeat Highlights Pills */}
                    <div className="space-y-1.5 pt-1">
                      {day.popularHighlights && day.popularHighlights.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                            <Compass className="w-3 h-3 text-cyan-400" />
                            Popular Sights:
                          </span>
                          {day.popularHighlights.map((pop, idx) => (
                            <span key={idx} className="bg-cyan-950/80 text-cyan-200 border border-cyan-800/60 px-2 py-0.5 rounded-full text-[10px]">
                              {pop}
                            </span>
                          ))}
                        </div>
                      )}

                      {day.offbeatHighlights && day.offbeatHighlights.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            Offbeat Spots:
                          </span>
                          {day.offbeatHighlights.map((off, idx) => (
                            <span key={idx} className="bg-amber-950/80 text-amber-200 border border-amber-800/60 px-2 py-0.5 rounded-full text-[10px]">
                              {off}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stay & Meals Info */}
                    {(day.overnightStay || day.mealsIncluded) && (
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/60">
                        {day.overnightStay && (
                          <div className="flex items-center gap-1 text-slate-300">
                            <Hotel className="w-3 h-3 text-emerald-400" />
                            <span>Stay: <strong>{day.overnightStay}</strong></span>
                          </div>
                        )}
                        {day.mealsIncluded && (
                          <div className="flex items-center gap-1 text-slate-300">
                            <Utensils className="w-3 h-3 text-amber-400" />
                            <span>Meals: <strong>{day.mealsIncluded}</strong></span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Inclusions & Permits Checklist */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl space-y-2">
          <span className="font-extrabold text-slate-200 text-[11px] block uppercase tracking-wider">
            Included In Package:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {itinerary.inclusions.map((inc, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[10px] text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={() => generateItineraryPDF(itinerary)}
            className="w-full sm:w-1/2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg border border-teal-400/30"
          >
            <Download className="w-4 h-4 text-teal-200" />
            <span>Download Itinerary (PDF)</span>
          </button>

          <a
            href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-1/2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md border border-emerald-500/40"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>Lock Vehicle on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
