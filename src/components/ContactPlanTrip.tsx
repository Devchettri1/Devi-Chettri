import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AGENCY_DETAILS } from '../data/travelData';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { DestinationCarousel } from './DestinationCarousel';
import { LiveAvailabilityBadge } from './LiveAvailabilityBadge';
import { GovtRegistrationBadge } from './GovtRegistrationBadge';
import { fetchWithRetry } from '../utils/api';

interface ContactPlanTripProps {
  onLeadSubmitted: (lead: any) => void;
  onOpenAIChat: () => void;
}

export const ContactPlanTrip: React.FC<ContactPlanTripProps> = ({
  onLeadSubmitted,
  onOpenAIChat,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2');
  const [route, setRoute] = useState('5N/6D Sikkim & Darjeeling Tour');
  const [mealPref, setMealPref] = useState('Pure Veg (AP Plan)');
  const [vehiclePref, setVehiclePref] = useState('Toyota Innova Crysta');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      const response = await fetchWithRetry('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name,
          whatsappNumber: phone,
          email,
          travelDates: dates || 'Flexible',
          travelersCount: Number(guests) || 2,
          packageOrRoute: route,
          vehiclePreference: vehiclePref,
          mealPreference: mealPref,
          notes,
        }),
      });

      const data = await response.json();
      setSubmitted(true);
      if (data.lead) {
        onLeadSubmitted(data.lead);
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 bg-[#0B0F0E] text-[#F5F1E8] border-b border-[#D6B36A]/20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="luxury-eyebrow">PLAN YOUR JOURNEY</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F1E8] tracking-tight">
            Connect With OffbeatDestination Concierge
          </h2>
          <p className="text-[#A9AAA4] text-sm sm:text-base leading-relaxed">
            Submit your bespoke trip preferences below or interact directly with our 24/7 AI Luxury Assistant for an instant customized quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111513] p-6 rounded-xl border border-[#D6B36A]/20 space-y-6">
              <h3 className="font-bold text-lg text-[#F5F1E8]">Gangtok Head Office</h3>

              <div className="space-y-4 text-xs text-[#A9AAA4]">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#18352D] rounded text-[#D6B36A] border border-[#D6B36A]/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F5F1E8]">Address:</h4>
                    <p>{AGENCY_DETAILS.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#18352D] rounded text-[#D6B36A] border border-[#D6B36A]/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F5F1E8]">Phone Hotline:</h4>
                    <p>{AGENCY_DETAILS.phonePrimary} / {AGENCY_DETAILS.phoneSecondary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#18352D] rounded text-[#D6B36A] border border-[#D6B36A]/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F5F1E8]">Email:</h4>
                    <p>{AGENCY_DETAILS.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#18352D] rounded text-[#D6B36A] border border-[#D6B36A]/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F5F1E8]">Concierge Hours:</h4>
                    <p>8:00 AM - 10:00 PM IST (7 Days a Week)</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 bg-[#0B0F0E] border border-[#D6B36A]/30 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-[#D6B36A] font-bold text-xs">
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Concierge WhatsApp</span>
                </div>
                <p className="text-[11px] text-[#A9AAA4]">
                  Prefer direct messaging? Chat directly with our Gangtok transport & permit manager.
                </p>
                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20want%20to%20plan%20a%20luxury%20trip%20to%20Sikkim.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 text-xs font-bold rounded transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Message +91 62961 02341</span>
                </a>
              </div>
            </div>

            {/* AI Assistant Banner */}
            <div className="bg-[#111513] p-6 rounded-xl border border-[#D6B36A]/30 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-[#D6B36A] mx-auto" />
              <h4 className="font-bold text-[#F5F1E8] text-sm">Need Instant Custom Itinerary?</h4>
              <p className="text-xs text-[#A9AAA4]">
                Our embedded AI Assistant is trained on all Sikkim permits, luxury hotels, and vehicle rates.
              </p>
              <button
                onClick={onOpenAIChat}
                className="btn-luxury-gold w-full text-xs"
              >
                Launch AI Luxury Concierge
              </button>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#111513] p-6 sm:p-8 rounded-xl border border-[#D6B36A]/30 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h3 className="font-extrabold text-xl text-[#F5F1E8]">
                  Plan My Bespoke Trip
                </h3>
                <GovtRegistrationBadge />
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="p-8 bg-[#18352D] border border-[#D6B36A]/40 rounded-xl text-center space-y-4 shadow-xl"
                  >
                    <CheckCircle2 className="w-14 h-14 text-[#D6B36A] mx-auto" />
                    <h4 className="font-extrabold text-xl text-[#F5F1E8]">Trip Inquiry Received!</h4>
                    <p className="text-xs sm:text-sm text-[#A9AAA4] leading-relaxed max-w-lg mx-auto">
                      Namaste <strong className="text-[#F5F1E8]">{name}</strong>! Your trip details have been registered. Our Gangtok concierge team will contact you at <strong className="text-[#D6B36A]">{phone}</strong> within 5 minutes with a custom luxury quote.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-luxury-outline text-xs"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Anand Verma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">WhatsApp / Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="anand@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">Travel Dates</label>
                        <input
                          type="text"
                          placeholder="e.g. 15th - 20th Oct"
                          value={dates}
                          onChange={(e) => setDates(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">Travelers</label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">Select Route</label>
                        <select
                          value={route}
                          onChange={(e) => setRoute(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        >
                          <option value="5N/6D Sikkim & Darjeeling Tour">5N/6D Sikkim & Darjeeling Tour</option>
                          <option value="North Sikkim (Lachung & Zero Point)">North Sikkim (Lachung & Zero Point)</option>
                          <option value="South & West Sikkim (Pelling/Ravangla)">South & West Sikkim (Pelling/Ravangla)</option>
                          <option value="Bhutan Cultural Odyssey">Custom Bhutan Cultural Odyssey</option>
                          <option value="NJP / Bagdogra Cab Rental">NJP / Bagdogra Cab Rental</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">Vehicle Preference</label>
                        <select
                          value={vehiclePref}
                          onChange={(e) => setVehiclePref(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        >
                          <option value="Toyota Innova Crysta">Toyota Innova Crysta (Luxury SUV)</option>
                          <option value="Mahindra Xylo / Scorpio 4x4">Mahindra Xylo / Scorpio 4x4</option>
                          <option value="Swift Dzire / Etios (Sedan)">Swift Dzire / Toyota Etios (4-Seater Sedan)</option>
                          <option value="WagonR / Swift (Hatchback)">WagonR / Swift / Alto (4-Seater Hatchback)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#A9AAA4] font-medium mb-1">Meal Preference *</label>
                        <select
                          value={mealPref}
                          onChange={(e) => setMealPref(e.target.value)}
                          className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        >
                          <option value="Pure Veg Plan (100% Vegetarian AP/MAP)">🥬 Pure Veg Plan (100% Vegetarian AP/MAP)</option>
                          <option value="Strict Jain Food Plan (No Onion, Garlic & Root Veg)">🌱 Strict Jain Plan (No Onion, Garlic & Root Veg)</option>
                          <option value="Non-Veg Plan (Chicken & Fresh Fish)">🍗 Non-Veg Plan (Local Chicken & Fish)</option>
                          <option value="Mixed Family Plan (Veg & Non-Veg Combination)">🍲 Mixed Family Plan (Veg & Non-Veg Combo)</option>
                        </select>
                      </div>
                    </div>

                    {/* Live Seats Availability Badge */}
                    <LiveAvailabilityBadge selectedRoute={route} selectedDate={dates} />

                    {/* Dynamic Destination Carousel Visualization */}
                    <DestinationCarousel selectedRoute={route} />

                    <div>
                      <label className="block text-[#A9AAA4] font-medium mb-1">Special Notes / Requests</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Nathula Pass permit needed, elderly parents traveling, preferred hotel standard..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3.5 py-2.5 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-luxury-gold w-full text-sm font-bold !py-3.5"
                    >
                      <Send className="w-4 h-4 fill-slate-950" />
                      <span>Submit Inquiry for Instant WhatsApp Quote</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
