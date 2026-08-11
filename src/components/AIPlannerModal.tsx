import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Check, Calendar, Users, MapPin, DollarSign, MessageCircle, ArrowRight, RefreshCw, Loader2 } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';
import { GovtRegistrationBadge } from './GovtRegistrationBadge';

interface AIPlannerModalProps {
  onClose: () => void;
  onLeadCaptured: (lead: any) => void;
}

export const AIPlannerModal: React.FC<AIPlannerModalProps> = ({ onClose, onLeadCaptured }) => {
  const [destination, setDestination] = useState('Sikkim & Darjeeling');
  const [duration, setDuration] = useState('5 Nights / 6 Days');
  const [travelers, setTravelers] = useState('4');
  const [preferences, setPreferences] = useState('Family trip with comfortable slow pace');
  const [vegMeals, setVegMeals] = useState(true);

  const [loading, setLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);

  // Capture lead after generating
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [leadSaved, setLeadSaved] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duration,
          destination,
          travelers: Number(travelers) || 2,
          preferences,
          vegMeals,
        }),
      });

      const data = await response.json();
      setGeneratedItinerary(data);
    } catch (err) {
      console.error('Planner error:', err);
      alert('Unable to connect to AI engine. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: custName,
          whatsappNumber: custPhone,
          travelDates: 'To be decided',
          travelersCount: Number(travelers) || 2,
          packageOrRoute: generatedItinerary?.title || destination,
          vehiclePreference: 'Toyota Innova Crysta',
          notes: `AI Proposal Generated: ${generatedItinerary?.title}. Cost: ${generatedItinerary?.estimatedCostPerPerson}`,
        }),
      });

      const data = await response.json();
      setLeadSaved(true);
      if (data.lead) {
        onLeadCaptured(data.lead);
      }

      // Open WhatsApp
      const waMsg = `Namaste! I just created an AI Itinerary for "${generatedItinerary?.title}" on your website. My name is ${custName}. Please confirm vehicle availability!`;
      window.open(`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6 relative z-10 text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 uppercase tracking-wider">
                Powered by Gemini 3.6 Flash
              </span>
              <h2 className="text-xl font-extrabold text-slate-100 mt-1 flex flex-wrap items-center gap-2">
                <span>AI Custom Itinerary Proposal Generator</span>
                <GovtRegistrationBadge />
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!generatedItinerary ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleGenerate}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Destination / Circuit</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="5N/6D Sikkim & Darjeeling">5N/6D Sikkim & Darjeeling Circuit</option>
                    <option value="7D/6N Grand Sikkim & Gurudongmar Expedition">7D/6N Grand Sikkim & Gurudongmar Expedition</option>
                    <option value="8D/7N Old Silk Route Zuluk & North Sikkim">8D/7N Old Silk Route Zuluk & North Sikkim</option>
                    <option value="9D/8N Complete Sikkim, Pelling Skywalk & Darjeeling">9D/8N Complete Sikkim, Pelling Skywalk & Darjeeling</option>
                    <option value="10D/9N Ultimate Sikkim, Bhutan Border & Darjeeling">10D/9N Ultimate Sikkim, Bhutan Border & Darjeeling</option>
                    <option value="North Sikkim (Lachung & Zero Point)">North Sikkim (Lachung & Zero Point)</option>
                    <option value="South & West Sikkim (Namthang, Pelling)">South & West Sikkim (Pelling/Ravangla)</option>
                    <option value="Bhutan Cultural Expedition">Bhutan Cultural Expedition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="3 Nights / 4 Days">3 Nights / 4 Days</option>
                    <option value="5 Nights / 6 Days">5 Nights / 6 Days</option>
                    <option value="6 Nights / 7 Days">6 Nights / 7 Days</option>
                    <option value="7 Nights / 8 Days">7 Nights / 8 Days</option>
                    <option value="8 Nights / 9 Days">8 Nights / 9 Days</option>
                    <option value="9 Nights / 10 Days">9 Nights / 10 Days</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Number of Travelers</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Meal Preference</label>
                  <label className="flex items-center gap-2 pt-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vegMeals}
                      onChange={(e) => setVegMeals(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 accent-emerald-500"
                    />
                    <span>Require Pure Vegetarian AP/MAP Hotel Plan</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Travel Style & Preferences</label>
                <textarea
                  rows={3}
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g. Senior citizens traveling, love scenic viewpoints, need luxury Innova Crysta..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Gemini AI is crafting custom itinerary proposal...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Generate Customized AI Proposal</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Generated Proposal Card */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-800 space-y-4 text-xs shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-extrabold text-lg text-amber-300">
                      {generatedItinerary.title}
                    </h3>
                    <p className="text-slate-400 mt-1 leading-relaxed">{generatedItinerary.overview}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-[10px] text-slate-400 block">Est. Cost Per Person</span>
                    <span className="text-xl font-black text-emerald-400">
                      {generatedItinerary.estimatedCostPerPerson}
                    </span>
                  </div>
                </div>

                {/* Day By Day */}
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                    Custom Day-By-Day Plan:
                  </h4>
                  {generatedItinerary.dayByDay?.map((d: any, idx: number) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 space-y-1">
                      <span className="text-emerald-400 font-bold block">Day {d.day}: {d.title}</span>
                      <p className="text-slate-300 leading-relaxed">{d.details}</p>
                    </div>
                  ))}
                </div>

                {/* Inclusions */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80">
                  <h4 className="font-bold text-slate-300 mb-1.5">Included Services:</h4>
                  <div className="flex flex-wrap gap-2 text-emerald-300">
                    {generatedItinerary.inclusions?.map((inc: string, i: number) => (
                      <span key={i} className="bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 text-[11px]">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lock In Quote Lead Capture */}
              {!leadSaved ? (
                <form onSubmit={handleSaveLead} className="p-4 bg-slate-950 rounded-xl border border-amber-500/40 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-100 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    Send This Proposal Directly to Your WhatsApp
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Number *"
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all transform active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Proposal to WhatsApp</span>
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-950 border border-emerald-600 rounded-xl text-center text-xs text-emerald-200">
                  <Check className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                  <p className="font-bold">Proposal Sent & Saved!</p>
                  <p className="text-[11px] text-slate-300">Opening WhatsApp chat with OffbeatDestination Travels...</p>
                </div>
              )}

              <button
                onClick={() => setGeneratedItinerary(null)}
                className="text-xs text-slate-400 hover:text-white underline flex items-center justify-center gap-1 mx-auto transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Edit Preferences & Re-Generate</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
