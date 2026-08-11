import React, { useState } from 'react';
import { MessageCircle, Bot, Zap, X, Send, CheckCircle2, User, Phone, Calendar, Users, Car, ShieldCheck, Sparkles, Tag, Calculator } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';
import { LeadSubmission } from '../types';
import { DateRangePicker } from './DateRangePicker';
import { DestinationCarousel } from './DestinationCarousel';
import { LiveAvailabilityBadge } from './LiveAvailabilityBadge';
import { GoogleReviewCarousel } from './GoogleReviewCarousel';
import { RouteMapVisualization } from './RouteMapVisualization';
import { GovtRegistrationBadge } from './GovtRegistrationBadge';

interface FloatingWhatsAppProps {
  onOpenAIChat: () => void;
  onLeadCaptured?: (lead: LeadSubmission) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenAIChat, onLeadCaptured }) => {
  const [isQuickBookOpen, setIsQuickBookOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [route, setRoute] = useState('5N/6D Sikkim & Darjeeling Grand Circuit');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState('2');
  const [vehicle, setVehicle] = useState('Toyota Innova Crysta');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formattedDateRange = startDate && endDate
    ? `${startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} to ${endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} (${Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} Nights)`
    : startDate
    ? `From ${startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`
    : '';

  const getEstimatedPriceRange = (selectedRoute: string, guestCountStr: string, selectedVehicle: string) => {
    const numGuests = parseInt(guestCountStr, 10) || 2;
    let minPerPerson = 12500;
    let maxPerPerson = 15500;
    let noteText = "Includes 3★ Deluxe Stay, Private Cab & Permits";

    if (selectedRoute.includes("5N/6D Sikkim & Darjeeling Grand Circuit")) {
      if (numGuests === 1) { minPerPerson = 22000; maxPerPerson = 26000; }
      else if (numGuests === 2) { minPerPerson = 15500; maxPerPerson = 18500; }
      else if (numGuests === 4) { minPerPerson = 13500; maxPerPerson = 16000; }
      else if (numGuests === 6) { minPerPerson = 12500; maxPerPerson = 15000; }
      else { minPerPerson = 12000; maxPerPerson = 14500; }
      noteText = "3★ Deluxe Hotel (AP Plan), Innova/Xylo & Nathula Permit";
    } else if (selectedRoute.includes("North Sikkim")) {
      if (numGuests === 1) { minPerPerson = 21000; maxPerPerson = 25000; }
      else if (numGuests === 2) { minPerPerson = 14000; maxPerPerson = 17000; }
      else if (numGuests === 4) { minPerPerson = 12000; maxPerPerson = 14500; }
      else if (numGuests === 6) { minPerPerson = 11000; maxPerPerson = 13000; }
      else { minPerPerson = 10500; maxPerPerson = 12500; }
      noteText = "Lachen/Lachung Homestays, 4x4 SUV & PAP Permits";
    } else if (selectedRoute.includes("Silk Route") || selectedRoute.includes("Zuluk")) {
      if (numGuests === 1) { minPerPerson = 14000; maxPerPerson = 17000; }
      else if (numGuests === 2) { minPerPerson = 9500; maxPerPerson = 11500; }
      else if (numGuests === 4) { minPerPerson = 8000; maxPerPerson = 9500; }
      else if (numGuests === 6) { minPerPerson = 7000; maxPerPerson = 8500; }
      else { minPerPerson = 6800; maxPerPerson = 8200; }
      noteText = "Zuluk Silk Route Homestay, Meals & Restricted Permits";
    } else if (selectedRoute.includes("Gangtok, Tsomgo Lake & Darjeeling")) {
      if (numGuests === 1) { minPerPerson = 18000; maxPerPerson = 21000; }
      else if (numGuests === 2) { minPerPerson = 12500; maxPerPerson = 15000; }
      else if (numGuests === 4) { minPerPerson = 10500; maxPerPerson = 12500; }
      else if (numGuests === 6) { minPerPerson = 9500; maxPerPerson = 11500; }
      else { minPerPerson = 9000; maxPerPerson = 11000; }
      noteText = "Budget Deluxe Stay, Sightseeing Cab & Tsomgo Permit";
    } else if (selectedRoute.includes("Honeymoon")) {
      if (numGuests === 1) { minPerPerson = 26000; maxPerPerson = 32000; }
      else if (numGuests === 2) { minPerPerson = 19000; maxPerPerson = 23000; }
      else { minPerPerson = 16000; maxPerPerson = 19000; }
      noteText = "Luxury Room, Candlelight Dinner, Flower Bed & Private Innova";
    } else if (selectedRoute.includes("Cab Rental")) {
      const dailyCabRate = selectedVehicle.includes("Innova") ? 4800 : selectedVehicle.includes("Scorpio") ? 4200 : selectedVehicle.includes("Dzire") ? 3200 : selectedVehicle.includes("WagonR") ? 2500 : 3500;
      const estimatedTotal = dailyCabRate * 5;
      noteText = `Estimated 5-Day Cab Rental for ${selectedVehicle} (₹${(dailyCabRate || 0).toLocaleString('en-IN')}/day)`;
      return {
        totalMinStr: `₹${(estimatedTotal || 0).toLocaleString('en-IN')}`,
        totalMaxStr: `₹${(estimatedTotal + 2500 || 0).toLocaleString('en-IN')}`,
        perPersonStr: `~₹${(Math.round(estimatedTotal / (numGuests || 1)) || 0).toLocaleString('en-IN')}/person`,
        noteText
      };
    } else if (selectedRoute.includes("Bhutan")) {
      if (numGuests === 1) { minPerPerson = 28000; maxPerPerson = 34000; }
      else if (numGuests === 2) { minPerPerson = 22000; maxPerPerson = 28000; }
      else if (numGuests === 4) { minPerPerson = 20000; maxPerPerson = 25000; }
      else { minPerPerson = 19000; maxPerPerson = 23000; }
      noteText = "Bhutan Daily SDF Govt Tax, 3★ Hotel & Private Guide";
    } else {
      minPerPerson = 3500 * 5;
      maxPerPerson = 5500 * 5;
      noteText = "Custom Tailored Itinerary (Subject to Final Details)";
    }

    const totalMin = minPerPerson * numGuests;
    const totalMax = maxPerPerson * numGuests;

    return {
      totalMinStr: `₹${(totalMin || 0).toLocaleString('en-IN')}`,
      totalMaxStr: `₹${(totalMax || 0).toLocaleString('en-IN')}`,
      perPersonStr: `₹${(minPerPerson || 0).toLocaleString('en-IN')} – ₹${(maxPerPerson || 0).toLocaleString('en-IN')}`,
      noteText
    };
  };

  const waDirectUrl = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste%20OffbeatDestination%20Travels!%20I%20want%20to%20plan%20a%20trip%20to%20Sikkim.`;

  const handleQuickBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    const leadPayload = {
      customerName: name,
      whatsappNumber: phone,
      email: '',
      travelDates: formattedDateRange || 'Flexible / Soon',
      travelersCount: Number(guests) || 2,
      packageOrRoute: route,
      vehiclePreference: vehicle,
      mealPreference: 'Standard AP Plan',
      notes: notes,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });

      const data = await response.json();
      if (data.lead && onLeadCaptured) {
        onLeadCaptured(data.lead);
      }
    } catch (err) {
      console.error('Lead submission network note:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Open direct WhatsApp chat with prefilled formatted booking details
      const waMsg = `Namaste OffbeatDestination Travels! 🙏%0A*Quick Booking Request*%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *WhatsApp:* ${encodeURIComponent(phone)}%0A🗺️ *Route/Package:* ${encodeURIComponent(route)}%0A🗓️ *Dates:* ${encodeURIComponent(formattedDateRange || 'Flexible')}%0A👥 *Guests:* ${guests} Persons%0A🚘 *Vehicle:* ${encodeURIComponent(vehicle)}${notes ? `%0A📝 *Notes:* ${encodeURIComponent(notes)}` : ''}%0A%0APlease share available cab options, hotel choices, and best discounted quote!`;
      
      window.open(`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${waMsg}`, '_blank');
    }
  };

  const handleResetModal = () => {
    setIsSubmitted(false);
    setIsQuickBookOpen(false);
    setName('');
    setPhone('');
    setStartDate(null);
    setEndDate(null);
    setNotes('');
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Quick Book Rapid Button */}
        <button
          id="quick-book-button"
          onClick={() => setIsQuickBookOpen(true)}
          className="group flex items-center gap-2.5 bg-[#071A2D] hover:bg-[#0c233c] text-[#D9BC7A] px-4 py-2.5 rounded-[4px] shadow-xl border border-[#C6A15B] transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs font-bold tracking-wide"
          title="Quick Book - Direct Lead Entry without AI Chat"
        >
          <div className="w-5 h-5 rounded-[2px] bg-[#C6A15B]/15 flex items-center justify-center text-[#D9BC7A] border border-[#C6A15B]/40">
            <Zap className="w-3.5 h-3.5 fill-[#D9BC7A] text-[#D9BC7A]" />
          </div>
          <span className="tracking-wider uppercase text-[11px] font-bold text-[#FAF9F6]">Quick Book</span>
          <span className="hidden sm:inline-block bg-[#C6A15B]/20 text-[#D9BC7A] px-2 py-0.5 rounded-[2px] text-[9px] font-bold border border-[#C6A15B]/40 tracking-wider">
            FAST
          </span>
        </button>

        {/* AI Assistant Floating Button */}
        <button
          onClick={onOpenAIChat}
          className="group flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-3.5 py-2 rounded-full shadow-xl border border-teal-400/40 transition-all transform hover:scale-105 active:scale-95"
          title="Chat with AI Sales Engine"
        >
          <div className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-teal-300">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold pr-1 hidden sm:inline">Ask Offbeat AI</span>
        </button>

        {/* WhatsApp Direct Floating Icon Button */}
        <a
          href={waDirectUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 border-2 border-emerald-300/60"
          title="Direct WhatsApp Chat (+91 62961 02341)"
        >
          <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900 animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-slate-900" />
        </a>
      </div>

      {/* Quick Book Direct Modal */}
      {isQuickBookOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-slate-950 shadow-lg font-black">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-100 flex flex-wrap items-center gap-2">
                    <span>Quick Tour & Cab Booking</span>
                    <GovtRegistrationBadge />
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-800 font-bold">
                      Direct WhatsApp
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Skip AI chat — receive custom quote & vehicle availability instantly!
                  </p>
                </div>
              </div>
              <button
                onClick={handleResetModal}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-800 shadow-xl">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h4 className="text-xl font-extrabold text-slate-100">Booking Request Dispatched!</h4>
                    <p className="text-sm text-slate-300">
                      We have logged your request and launched WhatsApp with your prefilled details.
                    </p>
                    <p className="text-xs text-amber-300/90 italic bg-slate-950 p-3 rounded-xl border border-slate-800">
                      "Our Gangtok travel desk (+91 62961 02341) will reply within 5 minutes with customized hotel choices, driver details, and permit guidelines."
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl shadow-lg transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      Re-open WhatsApp Chat
                    </a>
                    <button
                      onClick={handleResetModal}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuickBookSubmit} className="space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Preferred Package or Route */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                      Select Tour Package or Service
                    </label>
                    <select
                      value={route}
                      onChange={(e) => setRoute(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="5N/6D Sikkim & Darjeeling Grand Circuit">5N/6D Sikkim & Darjeeling Grand Circuit (Most Popular)</option>
                      <option value="4N/5D North Sikkim Special (Gurudongmar & Zero Point)">4N/5D North Sikkim Special (Gurudongmar & Zero Point)</option>
                      <option value="3N/4D Old Silk Route Zuluk & Reshi Khola">3N/4D Old Silk Route Zuluk & Reshi Khola Heritage</option>
                      <option value="4N/5D Gangtok, Tsomgo Lake & Darjeeling">4N/5D Gangtok, Tsomgo Lake & Darjeeling Budget Explorer</option>
                      <option value="5N/6D Romantic Sikkim & Darjeeling Honeymoon">5N/6D Romantic Sikkim & Darjeeling Honeymoon Special</option>
                      <option value="Toyota Innova Crysta Cab Rental Only">Toyota Innova Crysta Cab Rental Only (NJP/IXB Pickups)</option>
                      <option value="Bhutan Cultural Odyssey Package">Bhutan Cultural Odyssey Package</option>
                      <option value="Custom Itinerary Inquiry">Custom Tailored Itinerary</option>
                    </select>

                    {/* Dynamic Price Estimator Badge */}
                    {(() => {
                      const priceEst = getEstimatedPriceRange(route, guests, vehicle);
                      return (
                        <div className="mt-2.5 p-3 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 rounded-xl border border-emerald-500/40 shadow-lg">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400">
                              <Tag className="w-3.5 h-3.5 text-amber-400" />
                              <span>Estimated Base Price:</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-extrabold text-amber-300">
                                {priceEst.totalMinStr} – {priceEst.totalMaxStr}
                              </span>
                              <span className="text-[10px] text-slate-400 block font-semibold">
                                (Total for {guests} {Number(guests) === 1 ? 'Guest' : 'Guests'})
                              </span>
                            </div>
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-300 gap-1">
                            <span className="text-teal-300 font-bold flex items-center gap-1">
                              <Calculator className="w-3 h-3 text-teal-400" />
                              Per Person: <span className="text-slate-100 font-black">{priceEst.perPersonStr}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 italic">
                              {priceEst.noteText}
                            </span>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Live Seats Availability Badge */}
                    <LiveAvailabilityBadge selectedRoute={route} selectedDate={startDate} />

                    {/* Dynamic Destination Photo Carousel */}
                    <DestinationCarousel selectedRoute={route} />

                    {/* Route Waypoints & Journey Map Visualization */}
                    <div className="mt-3">
                      <RouteMapVisualization
                        selectedRoute={route}
                        compactMode={false}
                        onRouteChange={(newRouteTitle) => setRoute(newRouteTitle)}
                        onSelectWaypointForNote={(wpName) => {
                          setNotes((prev) =>
                            prev && prev.includes(wpName)
                              ? prev
                              : prev
                              ? `${prev}, Priority stop at ${wpName}`
                              : `Priority stop requested at ${wpName}`
                          );
                        }}
                      />
                    </div>
                  </div>

                  {/* Travel Dates & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        Travel Date Range *
                      </label>
                      <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(start, end) => {
                          setStartDate(start);
                          setEndDate(end);
                        }}
                        placeholder="Pick Start & End Dates"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-purple-400" />
                        Number of Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="2">2 Adults (Couple / Honeymoon)</option>
                        <option value="4">4 Adults (Family / Group)</option>
                        <option value="6">6 Adults (Innova Full Cab)</option>
                        <option value="8">8+ Guests (Corporate / Large Group Tour)</option>
                        <option value="1">1 Person (Solo Explorer)</option>
                      </select>
                    </div>
                  </div>

                  {/* Vehicle Choice */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-amber-400" />
                      Preferred Vehicle Category
                    </label>
                    <select
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Toyota Innova Crysta">Toyota Innova Crysta (Luxury Captain Seats)</option>
                      <option value="Mahindra Scorpio / Xylo">Mahindra Scorpio / Xylo (4x4 Heavy SUV)</option>
                      <option value="Swift Dzire / Etios">Swift Dzire / Toyota Etios (4-Seater Sedan)</option>
                      <option value="WagonR / Swift">Maruti WagonR / Swift (4-Seater Hatchback)</option>
                    </select>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Need Pure Veg AP meal plan, Nathula pass permit, or senior citizen assistance"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  {/* Real Google Review Testimonial Carousel */}
                  <div className="pt-1">
                    <GoogleReviewCarousel compact={true} />
                  </div>

                  {/* Guarantee Badge */}
                  <div className="flex items-center gap-2 p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>No middle-man commissions. Directly handled by Govt Registered Gangtok Office.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !phone}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <span>Logging Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 fill-slate-950" />
                        <span>Confirm & Get WhatsApp Quote Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

