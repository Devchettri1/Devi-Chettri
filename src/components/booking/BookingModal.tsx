import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  X,
  MessageCircle,
  Sparkles,
  Car,
  Calculator,
  ShieldCheck,
  Send,
  Share2,
  Download,
  QrCode,
  CheckCircle2,
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { AGENCY_DETAILS } from '../../data/travelData';
import { bookingFormSchema, BookingFormData, TourOption, VehicleOption, HotelCategoryOption } from './BookingTypes';
import { calculateBookingPrice, TOUR_OPTIONS, VEHICLE_OPTIONS, HOTEL_CATEGORIES } from './pricingEngine';
import { PersonalInfoSection } from './PersonalInfoSection';
import { TourSelection } from './TourSelection';
import { DateSection } from './DateSection';
import { TravellerSection } from './TravellerSection';
import { VehicleSelector } from './VehicleSelector';
import { HotelSelector } from './HotelSelector';
import { PriceEstimator } from './PriceEstimator';
import { AITripAssistant } from './AITripAssistant';
import { TrustBadges } from './TrustBadges';
import { ReviewCarousel } from './ReviewCarousel';
import { QRShareModal } from './QRShareModal';
import { SuccessScreen } from './SuccessScreen';
import { generatePackageItineraryPDF } from '../../utils/pdfGenerator';
import { Logo } from '../Logo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoute?: string;
  initialVehicle?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoute,
  initialVehicle,
}) => {
  const [activeTab, setActiveTab] = useState<'booking' | 'ai' | 'cab' | 'reviews'>('booking');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEnquiryId, setSubmittedEnquiryId] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // React Hook Form initialization with Zod Resolver
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      whatsappNumber: '',
      email: '',
      country: 'India',
      pickupLocation: 'Bagdogra Airport (IXB) / NJP Railway Station',
      dropLocation: 'Bagdogra Airport (IXB) / NJP Railway Station',
      preferredTour: initialRoute || TOUR_OPTIONS[0].name,
      startDate: '',
      endDate: '',
      adults: 2,
      children: 0,
      infants: 0,
      vehiclePreference: initialVehicle || 'Toyota Innova Crysta',
      hotelCategory: 'deluxe',
      mealPreference: 'MAP',
      budgetPreference: 'comfort',
      specialRequirements: '',
      couponCode: '',
      referralSource: 'Website Direct Concierge',
    },
  });

  const watchedValues = watch();

  // Find currently matched tour object
  const currentTour =
    TOUR_OPTIONS.find((t) => t.name === watchedValues.preferredTour) ||
    TOUR_OPTIONS.find((t) => t.id === watchedValues.preferredTour) ||
    TOUR_OPTIONS[0];

  // Dynamic Price Breakdown calculation
  const priceBreakdown = calculateBookingPrice({
    tourId: currentTour.id,
    hotelCategoryId: watchedValues.hotelCategory,
    vehicleModel: watchedValues.vehiclePreference,
    adults: watchedValues.adults,
    children: watchedValues.children,
    startDate: watchedValues.startDate,
    couponCode: watchedValues.couponCode,
    mealPlan: watchedValues.mealPreference,
  });

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  // Sync initial props
  useEffect(() => {
    if (initialRoute) {
      setValue('preferredTour', initialRoute);
    }
    if (initialVehicle) {
      setValue('vehiclePreference', initialVehicle);
    }
  }, [initialRoute, initialVehicle, setValue]);

  if (!isOpen) return null;

  const handleTourSelect = (tour: TourOption) => {
    setValue('preferredTour', tour.name);
    if (tour.recommendedVehicle) {
      setValue('vehiclePreference', tour.recommendedVehicle);
    }
  };

  const handleVehicleSelect = (vehicle: VehicleOption) => {
    setValue('vehiclePreference', vehicle.model);
  };

  const handleHotelSelect = (hotel: HotelCategoryOption) => {
    setValue('hotelCategory', hotel.id);
  };

  const handleApplyAIPlan = (plan: {
    tourId: string;
    hotelCategoryId: string;
    vehicleModel: string;
    adults: number;
    notes: string;
  }) => {
    const matchedTour = TOUR_OPTIONS.find((t) => t.id === plan.tourId);
    if (matchedTour) setValue('preferredTour', matchedTour.name);
    setValue('hotelCategory', plan.hotelCategoryId as any);
    setValue('vehiclePreference', plan.vehicleModel);
    setValue('adults', plan.adults);
    if (plan.notes) {
      setValue('specialRequirements', plan.notes);
    }
    setActiveTab('booking');
  };

  const handleNativeShare = async () => {
    const shareTitle = `🏔️ Travel Plan: ${currentTour.name} | OffbeatDestination Travels`;
    const shareText = `Check out this Himalayan trip plan!\n\n📍 Route: ${currentTour.name}\n🗓️ Dates: ${
      watchedValues.startDate || 'Flexible'
    }\n👥 Travelers: ${watchedValues.adults} Adults\n🚘 Vehicle: ${watchedValues.vehiclePreference}\n🏨 Stay: ${watchedValues.hotelCategory.toUpperCase()} Category\n💰 Estimated Total: ₹${priceBreakdown.grandTotal.toLocaleString(
      'en-IN'
    )}\n\nDirect Sikkim Govt Registered Operator: +91 62961 02341`;
    const shareUrl = window.location.origin || 'https://offbeatdestination.in';

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setShowQRModal(true);
        }
      }
    } else {
      setShowQRModal(true);
    }
  };

  const handleQuickDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    try {
      await generatePackageItineraryPDF(
        {
          id: currentTour.id,
          title: currentTour.name,
          duration: currentTour.duration,
          location: 'Gangtok, North Sikkim & Darjeeling',
          category: 'Sikkim-Darjeeling',
          priceStarting: currentTour.basePricePerPerson,
          rating: 4.9,
          reviewsCount: 240,
          heroImage: '',
          highlights: currentTour.highlights,
          itinerary: [
            { day: 1, title: 'Arrival & Scenic Mountain Drive to Gangtok', description: 'Reception at Bagdogra (IXB)/NJP. Drive along Teesta River.' },
            { day: 2, title: 'Tsomgo Glacial Lake & Baba Mandir Excursion', description: 'High-altitude excursion to 12,400 ft.' },
            { day: 3, title: 'City Highlights & Scenic Transfer', description: 'Monasteries, waterfalls & ropeway cable ride.' },
            { day: 4, title: 'Kanchenjunga Sunrise & Heritage Sightseeing', description: 'Tiger Hill sunrise, tea gardens & Batasia Loop.' },
            { day: 5, title: 'Departure with Cherished Himalayan Memories', description: 'Private transfer back to Airport/Station.' },
          ],
          included: ['Private dedicated vehicle with hill chauffeur', 'Deluxe hotel stays with daily meals', 'All mountain permits processed'],
          permitsRequired: currentTour.permitsRequired,
          vegMealsAvailable: true,
        },
        {
          travelerName: watchedValues.fullName || 'Valued Guest',
          travelerPhone: watchedValues.whatsappNumber || AGENCY_DETAILS.phonePrimary,
          travelDates: watchedValues.startDate || 'Flexible Dates',
          travelersCount: watchedValues.adults,
          hotelTier: watchedValues.hotelCategory,
          vehiclePreference: watchedValues.vehiclePreference,
          totalGroupPrice: priceBreakdown.grandTotal,
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // On submit booking handler: saves lead to database, generates Enquiry ID, then opens WhatsApp
  const onFormSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    const generatedId = `ODT-ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

    const leadPayload = {
      id: generatedId,
      customerName: data.fullName,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      travelDates: `${data.startDate || 'Flexible'} to ${data.endDate || ''}`,
      travelersCount: data.adults + data.children,
      packageOrRoute: data.preferredTour,
      vehiclePreference: data.vehiclePreference,
      hotelCategory: data.hotelCategory,
      mealPreference: data.mealPreference,
      notes: `${data.specialRequirements || ''} | Pickup: ${data.pickupLocation} | Drop: ${data.dropLocation} | Flight: ${data.arrivalFlight || 'N/A'} | Promo: ${data.couponCode || 'None'} | Est. Total: ₹${priceBreakdown.grandTotal}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };

    // Save lead to backend API
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
    } catch (err) {
      console.error('Lead storage fallback:', err);
    }

    // Prepare rich WhatsApp message format
    const waMessage = `🏔️ *NEW TOUR BOOKING INQUIRY*
━━━━━━━━━━━━━━━━━━━━
📌 *Enquiry Reference:* #${generatedId}
👤 *Traveler:* ${data.fullName}
📞 *WhatsApp:* ${data.whatsappNumber}
${data.email ? `✉️ *Email:* ${data.email}\n` : ''}📍 *Pickup:* ${data.pickupLocation}
🏁 *Drop:* ${data.dropLocation}

🗺️ *Tour Circuit:* ${data.preferredTour}
🗓️ *Travel Dates:* ${data.startDate || 'Flexible'} ${data.endDate ? `to ${data.endDate}` : ''}
👥 *Travelers:* ${data.adults} Adults${data.children > 0 ? `, ${data.children} Children` : ''}${data.infants > 0 ? `, ${data.infants} Infants` : ''}

🚗 *Vehicle:* ${data.vehiclePreference}
🏨 *Hotel Tier:* ${data.hotelCategory.toUpperCase()} (${data.mealPreference} Plan)
💰 *Estimated Total:* ₹${priceBreakdown.grandTotal.toLocaleString('en-IN')} (₹${priceBreakdown.costPerPerson.toLocaleString('en-IN')} / pax)
${data.couponCode ? `🏷️ *Coupon Code:* ${data.couponCode.toUpperCase()}\n` : ''}${data.arrivalFlight ? `✈️ *Arrival Flight:* ${data.arrivalFlight}\n` : ''}${data.specialRequirements ? `📝 *Special Notes:* ${data.specialRequirements}\n` : ''}━━━━━━━━━━━━━━━━━━━━
*OffbeatDestination Travels* (Govt. Regd: ${AGENCY_DETAILS.licenseNo})
Gangtok Head Office: +91 62961 02341`;

    const waUrl = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    setSubmittedEnquiryId(generatedId);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop with luxury blur */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Box */}
      <div
        ref={modalRef}
        className="relative bg-[#0A1128] border border-cyan-500/40 rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl z-10 space-y-4 text-slate-100 max-h-[92vh] flex flex-col my-auto"
      >
        {/* Modal Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Logo size="sm" mode="image" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                  Himalayan Booking & AI Concierge
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                  ● Live Rates
                </span>
              </div>
              <p className="text-[11px] text-cyan-400">
                OffbeatDestination Travels • Govt. Reg No: 1750/DoT&CAv/Gtk/25/TA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Share Itinerary"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Share Plan</span>
            </button>

            <button
              type="button"
              onClick={handleQuickDownloadPDF}
              disabled={isGeneratingPdf}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download PDF Quotation"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isGeneratingPdf ? 'PDF...' : 'Instant PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        {!isSubmitted && (
          <div className="flex items-center gap-1 bg-[#060B18] p-1 rounded-2xl border border-slate-800/90 flex-shrink-0 overflow-x-auto text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('booking')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'booking'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Instant Tour Booking</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('ai')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'ai'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Trip Concierge</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cab')}
              className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'cab'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Vehicle Fleet Guide</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 min-w-[100px] py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>4.9★ Reviews</span>
            </button>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          {isSubmitted ? (
            <SuccessScreen
              enquiryId={submittedEnquiryId}
              customerName={watchedValues.fullName}
              whatsappNumber={watchedValues.whatsappNumber}
              tourId={currentTour.id}
              vehicleModel={watchedValues.vehiclePreference}
              hotelCategory={watchedValues.hotelCategory}
              travelDates={`${watchedValues.startDate || 'Flexible'} ${watchedValues.endDate ? `to ${watchedValues.endDate}` : ''}`}
              adultsCount={watchedValues.adults}
              estimatedGrandTotal={priceBreakdown.grandTotal}
              onReset={() => {
                setIsSubmitted(false);
                reset();
              }}
            />
          ) : (
            <>
              {activeTab === 'booking' && (
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                  {/* Step 1: Personal Contact */}
                  <PersonalInfoSection
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                  />

                  {/* Step 2: Tour Selection */}
                  <TourSelection
                    selectedTourId={currentTour.id}
                    onSelectTour={handleTourSelect}
                  />

                  {/* Step 3: Dates & Travelers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DateSection
                      startDate={watchedValues.startDate}
                      endDate={watchedValues.endDate || ''}
                      onStartDateChange={(d) => setValue('startDate', d)}
                      onEndDateChange={(d) => setValue('endDate', d)}
                      totalNights={currentTour.nights}
                    />

                    <TravellerSection
                      adults={watchedValues.adults}
                      children={watchedValues.children}
                      infants={watchedValues.infants}
                      onAdultsChange={(c) => setValue('adults', c)}
                      onChildrenChange={(c) => setValue('children', c)}
                      onInfantsChange={(c) => setValue('infants', c)}
                    />
                  </div>

                  {/* Step 4: Vehicle & Hotel Categories */}
                  <VehicleSelector
                    selectedVehicleModel={watchedValues.vehiclePreference}
                    onSelectVehicle={handleVehicleSelect}
                    requiresNorthSikkim={currentTour.region === 'North Sikkim'}
                  />

                  <HotelSelector
                    selectedCategoryId={watchedValues.hotelCategory}
                    onSelectCategory={handleHotelSelect}
                    selectedMealPlan={watchedValues.mealPreference}
                    onSelectMealPlan={(p) => setValue('mealPreference', p)}
                  />

                  {/* Special Requests */}
                  <div className="space-y-1.5 text-xs">
                    <label className="block text-slate-300 font-semibold">
                      Special Requirements / Dietary Preferences / Occasions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Strict Jain / Pure Veg food required, traveling for Honeymoon with flower bed decor, senior citizen wheelchair assist..."
                      {...register('specialRequirements')}
                      className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl p-3 text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Step 5: Real-time Price Estimator */}
                  <PriceEstimator
                    priceBreakdown={priceBreakdown}
                    adultsCount={watchedValues.adults}
                    couponCode={watchedValues.couponCode}
                    onApplyCoupon={(c) => setValue('couponCode', c)}
                  />

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 text-sm sm:text-base tracking-wide transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Send className="w-5 h-5 fill-slate-950" />
                      <span>
                        {isSubmitting
                          ? 'Generating Quotation & Registering Lead...'
                          : `Confirm & Send Booking on WhatsApp (₹${priceBreakdown.grandTotal.toLocaleString('en-IN')})`}
                      </span>
                    </button>
                    <p className="text-center text-[10px] text-slate-500 mt-2">
                      🔒 Zero Booking Fee required upfront. Free date modifications up to 72 hours prior to arrival.
                    </p>
                  </div>
                </form>
              )}

              {activeTab === 'ai' && (
                <AITripAssistant onApplyPlan={handleApplyAIPlan} />
              )}

              {activeTab === 'cab' && (
                <div className="space-y-4">
                  <VehicleSelector
                    selectedVehicleModel={watchedValues.vehiclePreference}
                    onSelectVehicle={(v) => {
                      handleVehicleSelect(v);
                      setActiveTab('booking');
                    }}
                  />
                  <div className="p-4 rounded-2xl bg-[#060B18] border border-slate-800 space-y-2 text-xs text-slate-300">
                    <h5 className="font-bold text-amber-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Sikkim High-Altitude Road Regulations</span>
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      As per Sikkim Motor Vehicles & Army directives, small hatchbacks and standard sedans are strictly forbidden from entering North Sikkim (Lachen, Lachung, Zero Point, Gurudongmar Lake) and Indo-China Border at Nathula Pass. Our fleet consists of certified 4WD heavy SUVs with snow-chain capability.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <ReviewCarousel />
                  <TrustBadges />
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Trust Bar */}
        {!isSubmitted && (
          <div className="border-t border-slate-800/80 pt-2.5 flex-shrink-0">
            <TrustBadges />
          </div>
        )}
      </div>

      {/* QR Code Sharing Dialog */}
      <QRShareModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        shareData={{
          title: `Trip Plan: ${currentTour.name} | OffbeatDestination Travels`,
          text: `Check out this Himalayan trip plan with OffbeatDestination Travels (+91 62961 02341)`,
          url: window.location.href,
        }}
      />
    </div>
  );
};
