import React, { useState } from 'react';
import { CAB_OPTIONS, AGENCY_DETAILS } from '../data/travelData';
import { CabOption } from '../types';
import { Car, ShieldCheck, Users, CheckCircle, ArrowRight, Phone, MessageCircle, X, Sparkles, AlertTriangle, XCircle, Camera, Upload, Link, Image as ImageIcon, Wand2, Check } from 'lucide-react';
import { GovtRegistrationBadge } from './GovtRegistrationBadge';

interface CabRentalProps {
  cabs?: CabOption[];
  onOpenAIChatWithCab: (cabModel: string) => void;
  onApplyPhotoToCab?: (cabId: string, newPhotoUrl: string) => void;
  onOpenPhotoEditor?: () => void;
}

const CAB_PRESET_PHOTOS = [
  { title: 'Toyota Innova Crysta Deluxe', url: '/src/assets/images/innova_crysta_cab_1785680577329.jpg' },
  { title: 'Innova Mountain Highway Drive', url: '/src/assets/images/innova_mountain_drive_1785681104445.jpg' },
  { title: 'Sikkim Himalayan Route SUV', url: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg' },
  { title: 'Fleet Mountain Panorama', url: '/src/assets/images/agency_card_banner_1785772861093.jpg' },
  { title: 'Zero Point High Altitude 4x4', url: '/src/assets/images/yumthang_zero_point_1785680592273.jpg' },
  { title: 'Nathula Pass Snow Road Drive', url: '/src/assets/images/nathula_pass_snow_1785681052944.jpg' },
];

export const CabRental: React.FC<CabRentalProps> = ({
  cabs,
  onOpenAIChatWithCab,
  onApplyPhotoToCab,
  onOpenPhotoEditor,
}) => {
  const [selectedCabForBooking, setSelectedCabForBooking] = useState<CabOption | null>(null);
  const [editingPhotoCab, setEditingPhotoCab] = useState<CabOption | null>(null);
  const [photoMode, setPhotoMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const sourceCabs = cabs && cabs.length > 0 ? cabs : CAB_OPTIONS;
  const [pickupDate, setPickupDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Bagdogra Airport (IXB)');
  const [dropLocation, setDropLocation] = useState('Gangtok Hotel');
  const [passengers, setPassengers] = useState('4');

  const handleOpenPhotoChanger = (cab: CabOption) => {
    setEditingPhotoCab(cab);
    setPreviewPhoto(cab.image);
    setCustomPhotoUrl(cab.image);
    setPhotoMode('upload');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewPhoto(reader.result);
          setCustomPhotoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhotoChange = () => {
    if (!editingPhotoCab || !previewPhoto) return;
    if (onApplyPhotoToCab) {
      onApplyPhotoToCab(editingPhotoCab.id, previewPhoto);
    }
    setEditingPhotoCab(null);
  };

  const handleCabBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCabForBooking) return;

    const message = `Namaste OffbeatDestination Travels! I want to book a ${selectedCabForBooking.model} for pickup from ${pickupLocation} to ${dropLocation} on ${pickupDate || 'upcoming date'} for ${passengers} passengers.`;
    const waUrl = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSelectedCabForBooking(null);
  };

  return (
    <section className="py-20 bg-[#0B0F0E] text-[#F5F1E8] border-b border-[#D6B36A]/20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="luxury-eyebrow">SIKKIM LUXURY FLEET</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F1E8] tracking-tight">
            Private Luxury Himalayan Cab Service
          </h2>
          <p className="text-[#A9AAA4] text-sm sm:text-base leading-relaxed">
            Safe mountain driving with highly experienced Sikkim-local drivers. Immaculate Toyota Innova Crystas, Scorpios, 4-Seater Sedans, and Hatchbacks at government approved transparent rates.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#111513] p-6 rounded-xl border border-[#D6B36A]/20 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#18352D] border border-[#D6B36A]/30 flex items-center justify-center text-[#D6B36A] mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#F5F1E8]">Hill-Certified Drivers</h3>
            <p className="text-xs text-[#A9AAA4]">10+ years experience navigating steep mountain bends & snow passes</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#18352D] border border-[#D6B36A]/30 flex items-center justify-center text-[#D6B36A] mx-auto">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#F5F1E8]">100% Sanitized & Clean</h3>
            <p className="text-xs text-[#A9AAA4]">Innova Crystas, Sedans & Hatchbacks equipped for high comfort</p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[#18352D] border border-[#D6B36A]/30 flex items-center justify-center text-[#D6B36A] mx-auto">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#F5F1E8]">Zero Hidden Charges</h3>
            <p className="text-xs text-[#A9AAA4]">Includes driver allowance, toll taxes, fuel, and Sikkim state permits</p>
          </div>
        </div>

        {/* Mandatory Permit & Small Cab Rule Warning Banner */}
        <div className="bg-[#111513] border border-[#D6B36A]/40 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 text-[#F5F1E8] text-xs sm:text-sm shadow-xl">
          <div className="w-12 h-12 rounded-lg bg-[#18352D] border border-[#D6B36A]/30 flex items-center justify-center text-[#D6B36A] flex-shrink-0 shadow-lg">
            <AlertTriangle className="w-6 h-6 text-[#D6B36A]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#D6B36A] text-sm sm:text-base uppercase tracking-wider">
                ⚠️ Mandatory Sikkim Tourism & Army Permit Rules
              </span>
              <span className="bg-[#D6B36A] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Official Regulation
              </span>
            </div>
            <p className="text-[#A9AAA4] text-xs sm:text-sm leading-relaxed">
              <strong className="text-[#F5F1E8]">1. SMALL CABS RESTRICTED:</strong> Hatchbacks & Sedans (Swift Dzire, Etios, WagonR, Alto) are <strong className="text-[#F5F1E8]">NOT ALLOWED</strong> for North Sikkim (Lachung / Yumthang / Zero Point) and Nathula Pass high-altitude army permits. Only <strong className="text-[#D6B36A]">4WD SUVs & Heavy Cabs</strong> (Toyota Innova Crysta, Scorpio 4x4, Mahindra Xylo) are permitted by Sikkim Tourism.
            </p>
            <p className="text-[#A9AAA4] text-[11px] leading-relaxed pt-0.5">
              <strong className="text-[#F5F1E8]">2. MANDATORY 2-NIGHT LACHUNG STAY:</strong> As per Sikkim Tourism regulations, a minimum <strong className="text-[#D6B36A]">2 Nights stay at Lachung</strong> is mandatory for all North Sikkim tours to ensure high-altitude safety.
            </p>
          </div>
        </div>

        {/* Sharing Tour / Shared Cab Section for North Sikkim & Nathula Pass */}
        <div className="bg-[#111513] border border-[#D6B36A]/30 rounded-xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D6B36A]/20 pb-4">
            <div>
              <span className="text-[10px] font-bold text-[#D6B36A] bg-[#18352D] px-3 py-1 rounded border border-[#D6B36A]/30 tracking-wider uppercase inline-block mb-1.5">
                🚌 Budget Friendly Sharing Cabs (Luxury 4WD SUVs)
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F1E8]">
                Sharing Tours Available for North Sikkim & Nathula Pass
              </h3>
              <p className="text-xs sm:text-sm text-[#A9AAA4]">
                Travelling solo or as a couple? Book individual seats in our luxury 4WD Scorpios & Innovas with all army permits, 2-Night Lachung stays, and meals included!
              </p>
            </div>

            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent('Namaste OffbeatDestination! I want to inquire about booking a seat in a Sharing Tour / Shared Cab for North Sikkim (2N Lachung Mandatory) / Nathula Pass.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs transition-all shadow-lg flex items-center justify-center gap-2 self-start md:self-auto"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Book Shared Seat on WhatsApp</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Nathula Shared Seat */}
            <div className="bg-[#0B0F0E] border border-[#D6B36A]/20 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F5F1E8]">Nathula Pass & Tsomgo Lake</span>
                <span className="text-sm font-extrabold text-[#D6B36A]">₹1,200 / seat</span>
              </div>
              <p className="text-[11px] text-[#A9AAA4]">Day Excursion from Gangtok in heavy Innova/Xylo. Includes army permits & vehicle charges.</p>
              <div className="pt-1 flex items-center justify-between text-[10px] text-[#D6B36A] font-semibold">
                <span>✓ Army Permit Included</span>
                <span>✓ SUV/Innova Seat Only</span>
              </div>
            </div>

            {/* North Sikkim 2N/3D Shared Seat (Mandatory Rule) */}
            <div className="bg-[#0B0F0E] border border-[#D6B36A]/20 p-4 rounded-lg space-y-2 col-span-1 md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-xs font-bold text-[#F5F1E8] flex items-center gap-1.5">
                  <span>North Sikkim 2N/3D Tour</span>
                  <span className="text-[10px] bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/30 px-2 py-0.5 rounded font-bold">
                    MANDATORY 2 NIGHT LACHUNG STAY
                  </span>
                </span>
                <span className="text-sm font-extrabold text-[#D6B36A]">₹4,800 / seat</span>
              </div>
              <p className="text-[11px] text-[#A9AAA4]">
                2 Nights mandatory stay in Lachung homestay/hotel with Yumthang Valley, Zero Point (15,300 ft), Katao excursion, all home-cooked AP meals & Protected Area Permits (PAP).
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-between text-[10px] text-[#D6B36A] font-semibold gap-2">
                <span>✓ 2 Nights Mandatory Lachung Stay & AP Meals Included</span>
                <span>✓ Heavy 4WD Scorpio Seat Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sourceCabs.map((cab) => {
            const isSmallCab = cab.id.includes('sedan') || cab.id.includes('hatchback') || cab.model.toLowerCase().includes('dzire') || cab.model.toLowerCase().includes('wagonr') || cab.model.toLowerCase().includes('alto') || cab.model.toLowerCase().includes('etios');

            return (
              <div
                key={cab.id}
                className="bg-[#111513] border border-[#D6B36A]/20 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D6B36A]/50 transition-all"
              >
                <div>
                  <div className="relative h-52 overflow-hidden group/img">
                    <img
                      src={cab.image}
                      alt={cab.model}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-[#0B0F0E]/20 to-transparent" />

                    <span className="absolute top-3 left-3 bg-[#0B0F0E]/90 text-[#D6B36A] font-bold px-2.5 py-1 rounded text-xs border border-[#D6B36A]/30">
                      {cab.type}
                    </span>

                    {/* Change Photo Overlay Button */}
                    <button
                      onClick={() => handleOpenPhotoChanger(cab)}
                      className="absolute top-3 right-3 px-2.5 py-1.5 bg-[#0B0F0E]/90 hover:bg-[#18352D] text-[#D6B36A] hover:text-white rounded-lg text-xs font-bold border border-[#D6B36A]/40 flex items-center gap-1.5 shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                      title={`Change photo for ${cab.model}`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    {/* High altitude permit compliance badge */}
                    {isSmallCab ? (
                      <div className="bg-[#0B0F0E] border border-red-900/40 p-2 rounded text-red-300 text-[11px] font-bold flex items-start gap-1.5 shadow-md">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-red-400 block">❌ NOT ALLOWED FOR PERMITS</span>
                          <span className="text-[10px] text-[#A9AAA4] font-normal block">
                            Valid for Gangtok, Darjeeling & NJP/IXB drops only.
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#18352D] border border-[#D6B36A]/30 p-2 rounded text-[#D6B36A] text-[11px] font-bold flex items-start gap-1.5 shadow-md">
                        <CheckCircle className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[#D6B36A] block">✓ PERMIT APPROVED VEHICLE</span>
                          <span className="text-[10px] text-[#A9AAA4] font-normal block">
                            Allowed for North Sikkim & Nathula Pass Permits.
                          </span>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-extrabold text-xl text-[#F5F1E8]">{cab.model}</h3>
                      <p className="text-xs text-[#D6B36A] font-semibold mt-1">
                        Capacity: {cab.capacity}
                      </p>
                      <p className="text-xs text-[#A9AAA4] mt-1 leading-relaxed">
                        Best For: {cab.bestFor}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#D6B36A]/15">
                      <h4 className="text-[11px] font-bold text-[#D6B36A] uppercase tracking-wider">Features:</h4>
                      {cab.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#A9AAA4]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                          <span className="text-[#F5F1E8]">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking Footer */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="p-3 bg-[#0B0F0E] rounded border border-[#D6B36A]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#A9AAA4] block font-medium">NJP / Airport Pickup</span>
                      <span className="text-lg font-extrabold text-[#D6B36A]">₹{(cab.njpIxbPickupRate || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#A9AAA4] block font-medium">Full Day Sightseeing</span>
                      <span className="text-lg font-extrabold text-[#F5F1E8]">₹{(cab.ratePerDay || 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCabForBooking(cab)}
                      className="btn-luxury-gold flex-1 text-xs !py-2.5"
                    >
                      <Car className="w-4 h-4" />
                      <span>Book Vehicle</span>
                    </button>

                    <button
                      onClick={() => onOpenAIChatWithCab(cab.model)}
                      className="btn-luxury-outline text-xs !py-2.5 !px-3"
                      title="Ask AI about vehicle availability"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cab Booking Modal */}
      {selectedCabForBooking && (
        <div className="fixed inset-0 z-50 bg-[#0B0F0E]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111513] border border-[#D6B36A]/30 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#D6B36A]/20 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <Car className="w-5 h-5 text-[#D6B36A]" />
                <h3 className="font-bold text-[#F5F1E8] text-base">Book {selectedCabForBooking.model}</h3>
                <GovtRegistrationBadge />
              </div>
              <button
                onClick={() => setSelectedCabForBooking(null)}
                className="p-1 text-[#A9AAA4] hover:text-[#F5F1E8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCabBookingSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#A9AAA4] mb-1 font-medium">Pickup Point *</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3 py-2 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                >
                  <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
                  <option value="NJP Railway Station">NJP Railway Station</option>
                  <option value="Gangtok Hotel">Gangtok Hotel</option>
                  <option value="Darjeeling Hotel">Darjeeling Hotel</option>
                </select>
              </div>

              <div>
                <label className="block text-[#A9AAA4] mb-1 font-medium">Drop Destination *</label>
                <input
                  type="text"
                  required
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  placeholder="e.g. Gangtok Hotel / Lachung / Pelling"
                  className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3 py-2 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A9AAA4] mb-1 font-medium">Travel Date *</label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3 py-2 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>

                <div>
                  <label className="block text-[#A9AAA4] mb-1 font-medium">Passengers</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full bg-[#0B0F0E] border border-[#D6B36A]/30 rounded px-3 py-2 text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#0B0F0E] border border-[#D6B36A]/30 rounded text-center space-y-1">
                <p className="text-[11px] text-[#A9AAA4]">Estimated Fare:</p>
                <p className="text-xl font-bold text-[#D6B36A]">
                  ₹{(selectedCabForBooking.njpIxbPickupRate || 0).toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-[#A9AAA4]">Includes driver, toll, fuel & state permits</p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold rounded transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Confirm on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Cab Photo Change Modal */}
      {editingPhotoCab && (
        <div className="fixed inset-0 z-50 bg-[#0B0F0E]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111513] border border-[#D6B36A]/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#D6B36A]/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#18352D] border border-[#D6B36A]/30 flex items-center justify-center text-[#D6B36A]">
                  <Camera className="w-5 h-5 text-[#D6B36A]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#F5F1E8] text-base">Change Cab Photo</h3>
                  <p className="text-xs text-[#A9AAA4]">{editingPhotoCab.model} ({editingPhotoCab.type})</p>
                </div>
              </div>
              <button
                onClick={() => setEditingPhotoCab(null)}
                className="p-1.5 text-[#A9AAA4] hover:text-[#F5F1E8] rounded-lg hover:bg-[#18352D] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Preview */}
            <div className="relative h-48 rounded-xl overflow-hidden border border-[#D6B36A]/30 bg-slate-950 shadow-inner">
              {previewPhoto ? (
                <img
                  src={previewPhoto}
                  alt="Cab Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewPhoto('/src/assets/images/innova_crysta_cab_1785680577329.jpg')}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#A9AAA4] text-xs">
                  <ImageIcon className="w-8 h-8 text-[#D6B36A] mb-2" />
                  <span>No preview image available</span>
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-[#0B0F0E]/90 px-2.5 py-1 rounded text-[11px] text-[#D6B36A] font-bold border border-[#D6B36A]/30">
                Live Preview
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="flex bg-[#0B0F0E] p-1 rounded-xl border border-[#D6B36A]/20 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPhotoMode('upload')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  photoMode === 'upload'
                    ? 'bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/30 shadow'
                    : 'text-[#A9AAA4] hover:text-[#F5F1E8]'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload File</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoMode('url')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  photoMode === 'url'
                    ? 'bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/30 shadow'
                    : 'text-[#A9AAA4] hover:text-[#F5F1E8]'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Image URL</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoMode('presets')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  photoMode === 'presets'
                    ? 'bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/30 shadow'
                    : 'text-[#A9AAA4] hover:text-[#F5F1E8]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Presets Gallery</span>
              </button>
            </div>

            {/* Mode Tab Contents */}
            {photoMode === 'upload' && (
              <div className="space-y-2">
                <label className="block p-5 border-2 border-dashed border-[#D6B36A]/40 hover:border-[#D6B36A] rounded-xl bg-[#0B0F0E] text-center cursor-pointer transition-all hover:bg-[#18352D]/30 group">
                  <Upload className="w-8 h-8 text-[#D6B36A] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-[#F5F1E8] block">Click to Upload Cab Image</span>
                  <span className="text-[10px] text-[#A9AAA4] block mt-1">Supports JPG, PNG, WEBP files</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}

            {photoMode === 'url' && (
              <div className="space-y-2 text-xs">
                <label className="block text-[#A9AAA4] font-medium">Paste Custom Image Web URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customPhotoUrl}
                    onChange={(e) => {
                      setCustomPhotoUrl(e.target.value);
                      setPreviewPhoto(e.target.value);
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 bg-[#0B0F0E] border border-[#D6B36A]/30 rounded-lg px-3 py-2 text-[#F5F1E8] text-xs outline-none focus:border-[#D6B36A]"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewPhoto(customPhotoUrl)}
                    className="px-3 py-2 bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/30 rounded-lg font-bold hover:bg-[#18352D]/80"
                  >
                    Preview
                  </button>
                </div>
              </div>
            )}

            {photoMode === 'presets' && (
              <div className="space-y-2">
                <p className="text-xs text-[#A9AAA4]">Select from High-Res Sikkim Fleet Photos:</p>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {CAB_PRESET_PHOTOS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPreviewPhoto(preset.url);
                        setCustomPhotoUrl(preset.url);
                      }}
                      className={`relative rounded-lg overflow-hidden border transition-all h-20 text-left ${
                        previewPhoto === preset.url
                          ? 'border-[#D6B36A] ring-2 ring-[#D6B36A]/50'
                          : 'border-[#D6B36A]/20 hover:border-[#D6B36A]/60'
                      }`}
                    >
                      <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                      {previewPhoto === preset.url && (
                        <div className="absolute top-1 right-1 bg-[#D6B36A] text-slate-950 p-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] text-white p-1 truncate">
                        {preset.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#D6B36A]/20 flex items-center justify-between gap-3">
              {onOpenPhotoEditor && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingPhotoCab(null);
                    onOpenPhotoEditor();
                  }}
                  className="px-3 py-2 bg-purple-950/80 hover:bg-purple-900 text-purple-300 border border-purple-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5 text-purple-300" />
                  <span>AI Studio Editor</span>
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setEditingPhotoCab(null)}
                  className="px-4 py-2 bg-[#0B0F0E] hover:bg-slate-900 text-[#A9AAA4] border border-[#D6B36A]/20 rounded-xl text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePhotoChange}
                  className="btn-luxury-gold text-xs !py-2 !px-5 flex items-center gap-1.5 shadow-lg"
                >
                  <Check className="w-4 h-4" />
                  <span>Apply Photo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
