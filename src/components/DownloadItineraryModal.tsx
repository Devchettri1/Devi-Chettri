import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  X,
  Calendar,
  Users,
  Car,
  Utensils,
  Building2,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  MessageCircle,
  Clock,
  MapPin,
  Check,
  Zap,
} from 'lucide-react';
import { TourPackage } from '../types';
import { AGENCY_DETAILS } from '../data/travelData';
import { generatePackageItineraryPDF, PDFCustomOptions } from '../utils/pdfGenerator';

interface DownloadItineraryModalProps {
  packageData: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  defaultTier?: 'deluxe' | 'premium' | 'luxury';
}

export const DownloadItineraryModal: React.FC<DownloadItineraryModalProps> = ({
  packageData,
  isOpen,
  onClose,
  defaultTier = 'premium',
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [travelersCount, setTravelersCount] = useState(2);
  const [selectedTier, setSelectedTier] = useState<'deluxe' | 'premium' | 'luxury'>(defaultTier);
  const [selectedVehicle, setSelectedVehicle] = useState('Toyota Innova Crysta');
  const [mealPreference, setMealPreference] = useState('MAP (Daily Breakfast & Dinner)');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !packageData) return null;

  // Calculate tier pricing
  const deluxePrice = packageData.hotelTiers?.deluxe?.price || (packageData.priceStarting ? Math.round(packageData.priceStarting * 0.85) : 12500);
  const premiumPrice = packageData.hotelTiers?.premium?.price || packageData.priceStarting || 15999;
  const luxuryPrice = packageData.hotelTiers?.luxury?.price || (packageData.priceStarting ? Math.round(packageData.priceStarting * 1.55) : 24999);

  let currentPerPersonPrice = premiumPrice;
  if (selectedTier === 'deluxe') currentPerPersonPrice = deluxePrice;
  if (selectedTier === 'luxury') currentPerPersonPrice = luxuryPrice;

  const totalEstimate = currentPerPersonPrice * travelersCount;

  const handleDownloadPDF = () => {
    setIsGenerating(true);

    const customOptions: PDFCustomOptions = {
      travelerName: customerName.trim() || 'Valued Traveler',
      travelerPhone: customerPhone.trim() || undefined,
      travelDates: travelDates.trim() || 'Dates as Confirmed',
      travelersCount: travelersCount,
      hotelTier: selectedTier,
      vehiclePreference: selectedVehicle,
      mealPreference: mealPreference,
      specialRequests: specialRequests.trim() || undefined,
      calculatedPricePerPerson: currentPerPersonPrice,
      totalGroupPrice: totalEstimate,
    };

    setTimeout(() => {
      try {
        generatePackageItineraryPDF(packageData, customOptions);
        setIsSuccess(true);
      } catch (err) {
        console.error('Failed to generate PDF:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 300);
  };

  const whatsappMessage = `Namaste OffbeatDestination Travels! I customized the itinerary for:
*${packageData.title}* (${packageData.duration})
Traveler: ${customerName || 'Guest'} (${travelersCount} Travelers)
Dates: ${travelDates || 'Flexible'}
Hotel Tier: ${selectedTier.toUpperCase()} | Vehicle: ${selectedVehicle}
Estimated Tariff: ₹${currentPerPersonPrice.toLocaleString('en-IN')}/person (Total: ₹${totalEstimate.toLocaleString('en-IN')})
Please confirm vehicle availability & send detailed booking confirmation.`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative bg-[#0A1128] border border-cyan-500/40 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl z-10 space-y-5 text-slate-100 font-sans"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4 gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 px-2.5 py-0.5 rounded">
                  {packageData.duration}
                </span>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded">
                  Govt Regd Agency SKT/123/2021
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                Download Official PDF Itinerary
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>{packageData.title}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Package Snapshot Card */}
          <div className="p-3.5 bg-[#060B18] rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Package Highlights:</span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Permits & Driver Allowance Included</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {packageData.highlights.slice(0, 4).map((hl, idx) => (
                <span
                  key={idx}
                  className="text-[10.5px] bg-[#0A1128] text-slate-300 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Customization Inputs Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Lead Traveler Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  WhatsApp Number (Optional for quote)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Travel Dates / Month</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15th - 20th October"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Number of Travelers ({travelersCount} Persons)</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                  <span className="text-xs font-bold bg-[#060B18] px-2.5 py-1.5 rounded-lg border border-slate-800 min-w-[36px] text-center text-cyan-300">
                    {travelersCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Hotel Tier Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Select Accommodation Tier (Calculates in PDF):</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTier('deluxe')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedTier === 'deluxe'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-[#060B18] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[9px] font-bold block uppercase tracking-wider">Deluxe Plan</span>
                  <span className="text-sm font-bold block mt-0.5">
                    ₹{deluxePrice.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[9px] block ${selectedTier === 'deluxe' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Standard View Rooms
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier('premium')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedTier === 'premium'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-[#060B18] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[9px] font-bold block uppercase tracking-wider">Premium 3★</span>
                  <span className="text-sm font-bold block mt-0.5">
                    ₹{premiumPrice.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[9px] block ${selectedTier === 'premium' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Mountain View Deluxe
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier('luxury')}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedTier === 'luxury'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-[#060B18] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[9px] font-bold block uppercase tracking-wider">Luxury 4★ / 5★</span>
                  <span className="text-sm font-bold block mt-0.5">
                    ₹{luxuryPrice.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[9px] block ${selectedTier === 'luxury' ? 'text-slate-900' : 'text-slate-400'}`}>
                    Heritage Suites
                  </span>
                </button>
              </div>
            </div>

            {/* Vehicle & Meal Plan Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dedicated Private Vehicle</span>
                </label>
                <select
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Toyota Innova Crysta">Toyota Innova Crysta (Luxury SUV)</option>
                  <option value="Mahindra Scorpio / Xylo 4x4">Mahindra Scorpio / Xylo 4x4</option>
                  <option value="Swift Dzire / Toyota Etios">Swift Dzire / Toyota Etios (Sedan)</option>
                  <option value="Tempo Traveller 12-Seater">Tempo Traveller 12-Seater (Groups)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Meal Plan Preference</span>
                </label>
                <select
                  value={mealPreference}
                  onChange={(e) => setMealPreference(e.target.value)}
                  className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="MAP (Daily Breakfast & Dinner)">MAP (Daily Breakfast & Dinner)</option>
                  <option value="AP (Breakfast, Lunch & Dinner)">AP (All Meals Included)</option>
                  <option value="100% Pure Veg (No Non-Veg / Pure Kitchen)">100% Pure Vegetarian</option>
                  <option value="Strict Jain Food (No Onion & Garlic)">Strict Jain Food (No Onion/Garlic)</option>
                </select>
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Permit Requirements / Special Requests (Printed on PDF)
              </label>
              <input
                type="text"
                placeholder="e.g. Include Nathula Pass permit, elderly traveler, baby cot needed..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-[#060B18] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Pricing Calculation Summary Card */}
          <div className="p-3.5 bg-gradient-to-r from-[#060B18] via-slate-900 to-[#060B18] rounded-xl border border-cyan-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                Calculated Tariff ({selectedTier.toUpperCase()} • {travelersCount} Travelers)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl font-serif font-bold text-cyan-400">
                  ₹{currentPerPersonPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-300">/ person</span>
                <span className="text-xs text-slate-400 font-semibold">
                  (Total: ₹{totalEstimate.toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 inline-block">
                ✓ Includes GST & All Taxes
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full sm:w-1/2 btn-luxury-cyan text-xs !py-3 font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Generating PDF File...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-950" />
                  <span>Download PDF Itinerary</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-1/2 px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Lock Deal on WhatsApp</span>
            </a>
          </div>

          {/* Success Notification Bar */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-xs text-emerald-200 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>PDF Downloaded Successfully!</strong> Check your browser downloads folder.
                </span>
              </div>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-[10px] text-emerald-300 underline font-bold"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
