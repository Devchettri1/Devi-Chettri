import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, FileText, Share2, Copy, Check, Download, ExternalLink, Calendar, MapPin, Car, BedDouble } from 'lucide-react';
import { AGENCY_DETAILS } from '../../data/travelData';
import { generatePackageItineraryPDF } from '../../utils/pdfGenerator';
import { TOUR_OPTIONS } from './pricingEngine';

interface SuccessScreenProps {
  enquiryId: string;
  customerName: string;
  whatsappNumber: string;
  tourId: string;
  vehicleModel: string;
  hotelCategory: string;
  travelDates: string;
  adultsCount: number;
  estimatedGrandTotal: number;
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  enquiryId,
  customerName,
  whatsappNumber,
  tourId,
  vehicleModel,
  hotelCategory,
  travelDates,
  adultsCount,
  estimatedGrandTotal,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const selectedTour = TOUR_OPTIONS.find((t) => t.id === tourId) || TOUR_OPTIONS[0];

  const handleOpenWhatsAppAgain = () => {
    const text = `Namaste OffbeatDestination Travels! I submitted Enquiry #${enquiryId} for ${selectedTour.name}. Please confirm driver and hotel availability.`;
    window.open(`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    setIsDownloadingPdf(true);
    try {
      // Find package or fallback
      await generatePackageItineraryPDF(
        {
          id: selectedTour.id,
          title: selectedTour.name,
          duration: selectedTour.duration,
          location: 'Gangtok, North Sikkim & Darjeeling',
          category: 'Sikkim-Darjeeling',
          priceStarting: selectedTour.basePricePerPerson,
          rating: 4.9,
          reviewsCount: 240,
          heroImage: '',
          highlights: selectedTour.highlights,
          itinerary: [
            { day: 1, title: 'Arrival & Scenic Mountain Drive to Gangtok', description: 'Reception at Bagdogra (IXB)/NJP. Drive along Teesta River.' },
            { day: 2, title: 'Tsomgo Glacial Lake & Baba Mandir Excursion', description: 'High-altitude excursion to 12,400 ft.' },
            { day: 3, title: 'City Highlights & Scenic Transfer', description: 'Monasteries, waterfalls & ropeway cable ride.' },
            { day: 4, title: 'Kanchenjunga Sunrise & Heritage Sightseeing', description: 'Tiger Hill sunrise, tea gardens & Batasia Loop.' },
            { day: 5, title: 'Departure with Cherished Himalayan Memories', description: 'Private transfer back to Airport/Station.' },
          ],
          included: ['Private dedicated vehicle with hill chauffeur', 'Deluxe hotel stays with daily meals', 'All mountain permits processed'],
          permitsRequired: selectedTour.permitsRequired,
          vegMealsAvailable: true,
        },
        {
          travelerName: customerName,
          travelerPhone: whatsappNumber,
          travelDates: travelDates,
          travelersCount: adultsCount,
          hotelTier: hotelCategory,
          vehiclePreference: vehicleModel,
          totalGroupPrice: estimatedGrandTotal,
        }
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleCopyEnquiryId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(enquiryId);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="text-center space-y-4 py-2 text-slate-100">
      {/* Animated Success Checkmark */}
      <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/60 animate-bounce">
        <CheckCircle2 className="w-9 h-9 text-emerald-400" />
      </div>

      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800">
          Enquiry Registered & Dispatched
        </span>
        <h3 className="text-lg font-serif font-bold text-white mt-2">
          Thank you, {customerName}!
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
          Your travel blueprint has been sent to our Gangtok operations desk. Our senior tour coordinator is preparing your official quotation with live hotel allocations.
        </p>
      </div>

      {/* Booking Reference Card */}
      <div className="p-4 bg-[#060B18] border border-cyan-500/40 rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-400 font-medium">Official Reference Number:</span>
          <div className="flex items-center gap-1.5 font-mono font-bold text-amber-300 text-sm">
            <span>{enquiryId}</span>
            <button
              type="button"
              onClick={handleCopyEnquiryId}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
              title="Copy Reference ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-300">
          <div>
            <span className="text-slate-500 block">Selected Circuit</span>
            <span className="font-semibold text-slate-200 line-clamp-1">{selectedTour.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Travel Dates</span>
            <span className="font-semibold text-slate-200">{travelDates || 'Flexible'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Assigned Vehicle</span>
            <span className="font-semibold text-cyan-300">{vehicleModel}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Estimated Package Value</span>
            <span className="font-bold text-amber-300">₹{estimatedGrandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto pt-2 text-xs">
        <button
          type="button"
          onClick={handleOpenWhatsAppAgain}
          className="w-full sm:flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>Chat on WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isDownloadingPdf}
          className="w-full sm:flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold rounded-xl flex items-center justify-center gap-2 border border-cyan-500/30 transition-all"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF Quotation'}</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-[11px] text-slate-400 hover:text-slate-200 underline pt-2"
      >
        Plan Another Tour or Customize Parameters
      </button>
    </div>
  );
};
