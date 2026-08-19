import React, { useState } from 'react';
import {
  Car,
  Users,
  Luggage,
  Wind,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Heart,
  UserCheck,
  ChevronRight,
  Zap,
  PhoneCall,
  SlidersHorizontal,
  Compass,
  Award,
  ChevronLeft,
  Info,
  Maximize2
} from 'lucide-react';
import { CabOption } from '../types';
import { AGENCY_DETAILS } from '../data/travelData';
import { GovtRegistrationBadge } from './GovtRegistrationBadge';

interface FeaturedVehiclesSectionProps {
  onSelectCabForBooking: (cab: CabOption) => void;
  onOpenAIChatWithCab: (cabModel: string) => void;
}

interface InnovaGalleryPhoto {
  url: string;
  title: string;
  caption: string;
  tag: string;
}

const INNOVA_GALLERY: InnovaGalleryPhoto[] = [
  {
    url: '/images/innova_mountain_drive_1785681104445.jpg',
    title: 'Himalayan Ridge Highway Drive',
    caption: 'Cruising through the scenic pine forests and Teesta river valley in whisper-quiet cabin comfort.',
    tag: 'Flagship Exterior'
  },
  {
    url: '/images/innova_crysta_cab_1785680577329.jpg',
    title: 'Deluxe Chauffeur-Driven Crysta',
    caption: 'Immaculate exterior with sanitized interiors, tinted sun protection, and hill-certified senior chauffeurs.',
    tag: 'Executive Fleet'
  },
  {
    url: '/images/nathula_pass_snow_1785681052944.jpg',
    title: 'Nathula Pass & Snowline Performance',
    caption: 'High ground clearance and anti-roll suspension engineered for steep snow climbs and rocky mountain passes.',
    tag: 'Permit Pre-Cleared'
  },
  {
    url: '/images/agency_card_banner_1785772861093.jpg',
    title: 'Fleet Mountain Panorama',
    caption: 'Our top-tier Toyota Innova Crystas stationed across Gangtok, Bagdogra Airport, Darjeeling & Pelling.',
    tag: '24/7 Availability'
  }
];

export const FeaturedVehiclesSection: React.FC<FeaturedVehiclesSectionProps> = ({
  onSelectCabForBooking,
  onOpenAIChatWithCab
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeAudienceTab, setActiveAudienceTab] = useState<'families' | 'couples' | 'groups'>('families');
  const [groupSizeFilter, setGroupSizeFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  const innovaCabData: CabOption = {
    id: 'cab-innova-crysta',
    model: 'Toyota Innova Crysta',
    type: 'Luxury SUV (Captain Seats)',
    capacity: '6-7 Passengers + 5 Luggage',
    bestFor: 'Families, Couples, North Sikkim (2N Lachung) & Nathula Pass Army Permits',
    ratePerDay: 4500,
    njpIxbPickupRate: 3800,
    image: '/images/innova_crysta_cab_1785680577329.jpg',
    features: [
      '✓ Fully Approved for North Sikkim (2N Lachung) & Nathula Pass Army Permits',
      'Plush Reclining Captain Seats with individual armrests',
      'Rear dual-zone air conditioning & heating vents',
      'Massive boot space accommodating 4-6 large mountain suitcases',
      'High ground clearance & anti-roll mountain suspension',
      'Professional hill-certified drivers with 10+ yrs mountain experience'
    ]
  };

  const xyloCabData: CabOption = {
    id: 'cab-xylo-scorpio',
    model: 'Mahindra Xylo / Scorpio 4x4',
    type: 'Rugged Mountain 4x4 SUV',
    capacity: '6 Passengers + 4 Luggage',
    bestFor: 'North Sikkim 2N Lachung, Zero Point & High Altitude Snow Terrain',
    ratePerDay: 4000,
    njpIxbPickupRate: 3400,
    image: '/images/innova_crysta_cab_1785680577329.jpg',
    features: [
      '✓ Fully Approved for North Sikkim Restricted Area Permit (PAP)',
      'High ground clearance for snow & rocky mountain riverbeds',
      'All-wheel 4x4 drive stability for steep climbs & Zero Point (15,300 ft)',
      'Rugged suspension and high headroom for bumpy mountain trails',
      'Experienced local drivers adept at snow chain handling'
    ]
  };

  const travellerCabData: CabOption = {
    id: 'cab-tempo-traveller',
    model: 'Force Urbania / Luxury Tempo Traveller',
    type: 'Group Mountain Coach (9 / 13 / 17 / 26 Seater)',
    capacity: '9 to 26 Passengers + 15+ Luggage',
    bestFor: 'Large Families, Corporate Groups, College Tours & Destination Weddings',
    ratePerDay: 6500,
    njpIxbPickupRate: 5800,
    image: '/images/agency_card_banner_1785772861093.jpg',
    features: [
      '✓ Pre-cleared for all Sikkim tourist routes & corporate circuits',
      'Individual 2x1 Maharaja pushback reclining luxury seats',
      'High-roof walk-in standing cabin with individual AC vents & reading lights',
      'Massive rear luggage chamber + full overhead carrier',
      'PA audio system with microphone for tour leader briefings',
      'Dedicated senior hill driver + assistant for luggage handling'
    ]
  };

  const boleroCabData: CabOption = {
    id: 'cab-bolero-camper',
    model: 'Mahindra Bolero Neo / Mountain 4WD',
    type: 'Rugged Offbeat 4WD',
    capacity: '6 Passengers + 4 Luggage',
    bestFor: 'Offbeat Dzongu, Zuluk Silk Route & Rustic Village Expeditions',
    ratePerDay: 3800,
    njpIxbPickupRate: 3200,
    image: '/images/yumthang_zero_point_1785680592273.jpg',
    features: [
      '✓ Full clearance for Silk Route & remote North Sikkim trails',
      'Heavy-duty leaf spring mountain suspension for rough roads',
      'High torque mHawk diesel engine for steep gradients',
      'Reliable and economical for adventure groups and photographers'
    ]
  };

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % INNOVA_GALLERY.length);
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + INNOVA_GALLERY.length) % INNOVA_GALLERY.length);
  };

  return (
    <div className="space-y-12 mb-16">
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18352D] border border-[#D6B36A]/40 text-[#D6B36A] text-xs font-bold uppercase tracking-wider shadow-md">
          <Award className="w-3.5 h-3.5 text-[#D6B36A]" />
          <span>Featured Vehicles • The Himalayan Gold Standard</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F1E8] tracking-tight">
          Executive Comfort on Every Mountain Mile
        </h2>
        <p className="text-xs sm:text-sm text-[#A9AAA4] max-w-2xl mx-auto leading-relaxed">
          Traversing the steep gradients and sharp hairpin curves of Sikkim requires superior engineering. Discover our flagship <strong className="text-[#D6B36A]">Toyota Innova Crysta</strong> and our high-capacity fleet for larger groups.
        </p>
      </div>

      {/* Flagship Showcase Card: Toyota Innova Crysta */}
      <div className="bg-gradient-to-b from-[#141B18] to-[#0D1210] border-2 border-[#D6B36A]/40 rounded-2xl overflow-hidden shadow-2xl">
        {/* Flagship Top Bar */}
        <div className="bg-[#18352D] border-b border-[#D6B36A]/30 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#D6B36A] animate-pulse" />
            <span className="text-xs font-extrabold text-[#F5F1E8] uppercase tracking-wider">
              👑 Flagship Himalayan Vehicle of OffbeatDestination Travels
            </span>
            <span className="hidden sm:inline-block bg-[#D6B36A] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              #1 Guest Rated
            </span>
          </div>
          <div className="flex items-center gap-3">
            <GovtRegistrationBadge />
            <span className="text-xs text-[#D6B36A] font-bold">100% Permit Approved</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Interactive Image Gallery (7 Cols on LG) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#D6B36A]/20 bg-[#0B0F0E]/60">
            <div className="space-y-4">
              {/* Main Featured Photo */}
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-[#D6B36A]/30 shadow-2xl group">
                <img
                  src={INNOVA_GALLERY[activePhotoIdx].url}
                  alt={INNOVA_GALLERY[activePhotoIdx].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-transparent to-black/30" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#0B0F0E]/90 text-[#D6B36A] font-bold px-3 py-1 rounded-md text-xs border border-[#D6B36A]/40 backdrop-blur-md shadow-lg">
                    {INNOVA_GALLERY[activePhotoIdx].tag}
                  </span>
                  <span className="bg-[#18352D]/90 text-emerald-300 font-semibold px-2.5 py-1 rounded-md text-[11px] border border-emerald-500/30 backdrop-blur-md">
                    Toyota Innova Crysta 2.4L Diesel
                  </span>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0B0F0E]/80 hover:bg-[#18352D] text-[#D6B36A] flex items-center justify-center border border-[#D6B36A]/40 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 shadow-xl"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0B0F0E]/80 hover:bg-[#18352D] text-[#D6B36A] flex items-center justify-center border border-[#D6B36A]/40 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 shadow-xl"
                  title="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Caption Banner */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#0B0F0E] via-[#0B0F0E]/90 to-transparent">
                  <h4 className="text-sm sm:text-base font-bold text-[#F5F1E8]">
                    {INNOVA_GALLERY[activePhotoIdx].title}
                  </h4>
                  <p className="text-xs text-[#A9AAA4] mt-0.5 line-clamp-2">
                    {INNOVA_GALLERY[activePhotoIdx].caption}
                  </p>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-2.5">
                {INNOVA_GALLERY.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative rounded-lg overflow-hidden border transition-all h-16 sm:h-20 text-left ${
                      activePhotoIdx === idx
                        ? 'border-[#D6B36A] ring-2 ring-[#D6B36A]/60 scale-102'
                        : 'border-[#D6B36A]/20 opacity-70 hover:opacity-100 hover:border-[#D6B36A]/50'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="absolute bottom-1 left-1 bg-slate-950/80 text-[9px] font-bold text-[#D6B36A] px-1 rounded truncate max-w-[90%]">
                      {img.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#D6B36A]/20">
              <div className="bg-[#111513] p-3 rounded-lg border border-[#D6B36A]/20 text-center">
                <Users className="w-4 h-4 text-[#D6B36A] mx-auto mb-1" />
                <span className="text-[10px] text-[#A9AAA4] block">Max Capacity</span>
                <span className="text-xs font-bold text-[#F5F1E8]">6–7 Passengers</span>
              </div>
              <div className="bg-[#111513] p-3 rounded-lg border border-[#D6B36A]/20 text-center">
                <Wind className="w-4 h-4 text-[#D6B36A] mx-auto mb-1" />
                <span className="text-[10px] text-[#A9AAA4] block">Climate Control</span>
                <span className="text-xs font-bold text-[#F5F1E8]">Dual-Zone A/C</span>
              </div>
              <div className="bg-[#111513] p-3 rounded-lg border border-[#D6B36A]/20 text-center">
                <Luggage className="w-4 h-4 text-[#D6B36A] mx-auto mb-1" />
                <span className="text-[10px] text-[#A9AAA4] block">Luggage Trunk</span>
                <span className="text-xs font-bold text-[#F5F1E8]">4–6 Large Bags</span>
              </div>
              <div className="bg-[#111513] p-3 rounded-lg border border-[#D6B36A]/20 text-center">
                <ShieldCheck className="w-4 h-4 text-[#D6B36A] mx-auto mb-1" />
                <span className="text-[10px] text-[#A9AAA4] block">Permit Clearance</span>
                <span className="text-xs font-bold text-emerald-400">100% Pre-Approved</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Features & Audience Benefits (5 Cols on LG) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[#D6B36A] uppercase tracking-wider">
                  Toyota Fleet Innovation
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                  ✓ Always Sanitized
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F1E8]">
                Toyota Innova Crysta
              </h3>
              <p className="text-xs text-[#A9AAA4] mt-1 leading-relaxed">
                The undisputed benchmark of luxury mountain touring. Engineered with superior chassis dampening to eliminate body roll on sharp Himalayan hairpins.
              </p>

              {/* Key Features List */}
              <div className="mt-5 space-y-2.5">
                <h4 className="text-xs font-bold text-[#D6B36A] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Key Features & Mountain Amenities:</span>
                </h4>

                <div className="space-y-2 text-xs text-[#F5F1E8]">
                  <div className="flex items-start gap-2.5 bg-[#0B0F0E] p-2.5 rounded-lg border border-[#D6B36A]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F5F1E8]">Dual-Zone A/C & Independent Roof Vents:</strong>
                      <span className="text-[#A9AAA4] block text-[11px] mt-0.5">
                        Individual cooling/heating controls for rear passengers ensure comfort across tropical foothills and freezing alpine summits.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#0B0F0E] p-2.5 rounded-lg border border-[#D6B36A]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F5F1E8]">Plush Ergonomic Reclining Captain Seats:</strong>
                      <span className="text-[#A9AAA4] block text-[11px] mt-0.5">
                        Individual armrests, supple leather cushioning, and superior lumbar support prevent mountain travel fatigue.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#0B0F0E] p-2.5 rounded-lg border border-[#D6B36A]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F5F1E8]">Expansive Luggage Capacity:</strong>
                      <span className="text-[#A9AAA4] block text-[11px] mt-0.5">
                        Accommodates 4–6 large suitcases + winter jackets in the dedicated rear boot without crowding passenger seating.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#0B0F0E] p-2.5 rounded-lg border border-[#D6B36A]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F5F1E8]">High Ground Clearance & Anti-Roll Suspension:</strong>
                      <span className="text-[#A9AAA4] block text-[11px] mt-0.5">
                        Glides over gravel, unpaved snow sections, and rock streams while maintaining whisper-quiet cabin stability.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-[#0B0F0E] p-2.5 rounded-lg border border-[#D6B36A]/15">
                    <CheckCircle2 className="w-4 h-4 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#F5F1E8]">Hill-Certified Native Driver & USB Fast Chargers:</strong>
                      <span className="text-[#A9AAA4] block text-[11px] mt-0.5">
                        Senior Sikkimese driver with 10+ years experience, snow chains, onboard first aid kit, motion-sickness relief, and device charging ports.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Audience Benefits Section */}
              <div className="mt-6 pt-5 border-t border-[#D6B36A]/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-[#D6B36A] uppercase tracking-wider">
                    Tailored Benefits By Traveler Type:
                  </h4>
                </div>

                {/* Audience Tabs */}
                <div className="flex bg-[#0B0F0E] p-1 rounded-xl border border-[#D6B36A]/30 text-xs font-bold mb-3">
                  <button
                    onClick={() => setActiveAudienceTab('families')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeAudienceTab === 'families'
                        ? 'bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/40 shadow-md'
                        : 'text-[#A9AAA4] hover:text-[#F5F1E8]'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>For Families</span>
                  </button>

                  <button
                    onClick={() => setActiveAudienceTab('couples')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeAudienceTab === 'couples'
                        ? 'bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/40 shadow-md'
                        : 'text-[#A9AAA4] hover:text-[#F5F1E8]'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>For Couples</span>
                  </button>

                  <button
                    onClick={() => setActiveAudienceTab('groups')}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      activeAudienceTab === 'groups'
                        ? 'bg-[#18352D] text-[#D6B36A] border border-[#D6B36A]/40 shadow-md'
                        : 'text-[#A9AAA4] hover:text-[#F5F1E8]'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>For Groups (4–7)</span>
                  </button>
                </div>

                {/* Audience Content Box */}
                <div className="bg-[#0B0F0E] border border-[#D6B36A]/20 p-3.5 rounded-xl text-xs space-y-2 text-[#A9AAA4]">
                  {activeAudienceTab === 'families' && (
                    <>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">Elderly & Grandparent Comfort:</strong> Low step-in height with cushioned shock dampening eliminates the jarring jolts of mountain roads.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">Motion-Sickness Prevention:</strong> Independent air circulation and smooth braking prevent altitude dizziness and nausea for kids.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">All Belongings Inside:</strong> Strollers, baby bags, warm blankets, and lunch boxes fit easily in the trunk.
                        </p>
                      </div>
                    </>
                  )}

                  {activeAudienceTab === 'couples' && (
                    <>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">Private & Whisper-Quiet:</strong> Acoustic glass insulation creates an intimate, peaceful mountain sanctuary during romantic drives.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">Panoramic Sightseeing:</strong> Wide panoramic tinted windows provide unhindered views of Kanchenjunga sunrises and mist-covered tea gardens.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">Unscheduled Photo Stops:</strong> Private chauffeur happily pauses at picturesque viewpoints, tea plantations, and suspension bridges.
                        </p>
                      </div>
                    </>
                  )}

                  {activeAudienceTab === 'groups' && (
                    <>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">No Cramped Middle Seats:</strong> Every passenger gets generous legroom, shoulder space, and individual armrest comfort.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">Zero Luggage On Laps:</strong> Dedicated boot space stores all trekking backpacks, camera tripods, and heavy winter coats.
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D6B36A] font-bold text-sm leading-none">•</span>
                        <p>
                          <strong className="text-[#F5F1E8]">Cost-Effective Luxury:</strong> Dividing the vehicle rate among 4–6 friends yields 5-star executive comfort at very economical per-person pricing.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Bar & Action Buttons */}
            <div className="pt-4 border-t border-[#D6B36A]/20 space-y-3">
              <div className="bg-[#0B0F0E] p-3 rounded-xl border border-[#D6B36A]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#A9AAA4] block uppercase tracking-wider font-semibold">
                    Airport Pickup (NJP / IXB)
                  </span>
                  <span className="text-xl font-extrabold text-[#D6B36A]">
                    ₹{innovaCabData.njpIxbPickupRate?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#A9AAA4] block uppercase tracking-wider font-semibold">
                    Full Day Sightseeing
                  </span>
                  <span className="text-xl font-extrabold text-[#F5F1E8]">
                    ₹{innovaCabData.ratePerDay?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onSelectCabForBooking(innovaCabData)}
                  className="btn-luxury-gold text-xs !py-3 col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 shadow-lg font-bold"
                >
                  <Car className="w-4 h-4" />
                  <span>Book Innova</span>
                </button>

                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                    'Namaste OffbeatDestination! I would like to book the Toyota Innova Crysta for our Sikkim & Darjeeling tour. Please share available dates and chauffeur details.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold px-3 py-2.5 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>WhatsApp Quote</span>
                </a>

                <button
                  onClick={() => onOpenAIChatWithCab('Toyota Innova Crysta')}
                  className="btn-luxury-outline text-xs !py-2.5 flex items-center justify-center gap-1.5"
                  title="Ask AI Concierge about Innova Crysta"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Larger Groups & Rugged Expeditions Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D6B36A]/20 pb-4">
          <div>
            <span className="text-[10px] font-bold text-[#D6B36A] bg-[#18352D] px-3 py-1 rounded border border-[#D6B36A]/30 tracking-wider uppercase inline-block mb-1.5">
              🚐 High-Capacity Fleet & Mountain 4x4s
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#F5F1E8]">
              Options for Larger Groups & Rugged Expeditions
            </h3>
            <p className="text-xs sm:text-sm text-[#A9AAA4]">
              Planning an extended family reunion, corporate mountain offsite, college tour, or rugged offbeat adventure? Explore our heavy-duty SUVs and luxury Travellers.
            </p>
          </div>

          {/* Group Filter Chips */}
          <div className="flex items-center gap-1.5 bg-[#111513] p-1 rounded-lg border border-[#D6B36A]/20 text-xs font-semibold self-start md:self-auto">
            <button
              onClick={() => setGroupSizeFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                groupSizeFilter === 'all' ? 'bg-[#18352D] text-[#D6B36A] font-bold' : 'text-[#A9AAA4]'
              }`}
            >
              All Vehicles
            </button>
            <button
              onClick={() => setGroupSizeFilter('medium')}
              className={`px-2.5 py-1 rounded transition-colors ${
                groupSizeFilter === 'medium' ? 'bg-[#18352D] text-[#D6B36A] font-bold' : 'text-[#A9AAA4]'
              }`}
            >
              5–7 Pax (4x4 SUVs)
            </button>
            <button
              onClick={() => setGroupSizeFilter('large')}
              className={`px-2.5 py-1 rounded transition-colors ${
                groupSizeFilter === 'large' ? 'bg-[#18352D] text-[#D6B36A] font-bold' : 'text-[#A9AAA4]'
              }`}
            >
              9–26 Pax (Travellers)
            </button>
          </div>
        </div>

        {/* Fleet Grid for Larger Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mahindra Xylo / Scorpio 4x4 */}
          {(groupSizeFilter === 'all' || groupSizeFilter === 'medium') && (
            <div className="bg-[#111513] border border-[#D6B36A]/30 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D6B36A]/60 transition-all">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/innova_crysta_cab_1785680577329.jpg"
                    alt="Mahindra Xylo Scorpio 4x4"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#0B0F0E]/90 text-[#D6B36A] font-bold px-2.5 py-1 rounded text-xs border border-[#D6B36A]/30">
                    Rugged Mountain 4x4
                  </span>
                  <span className="absolute bottom-2 left-3 text-xs font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800">
                    ✓ North Sikkim PAP Approved
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-lg text-[#F5F1E8]">
                      Mahindra Xylo / Scorpio 4x4
                    </h4>
                    <p className="text-xs text-[#D6B36A] font-semibold mt-0.5">
                      Capacity: 6–7 Passengers + 4 Bags
                    </p>
                    <p className="text-xs text-[#A9AAA4] mt-1 leading-relaxed">
                      High ground clearance workhorse engineered for rocky mountain rivers, snow-covered roads to Zero Point (15,300 ft), and the 30+ hairpin bends of Old Silk Route Zuluk.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#D6B36A]/15 text-xs text-[#A9AAA4]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">All-wheel drive stability on ice & steep inclines</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">High roof clearance for tall travelers & rough roads</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">Economical choice for budget-conscious adventurous groups</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="p-2.5 bg-[#0B0F0E] rounded border border-[#D6B36A]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A9AAA4] block">Airport Transfer</span>
                    <span className="text-base font-extrabold text-[#D6B36A]">₹3,400</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#A9AAA4] block">Per Day Sightseeing</span>
                    <span className="text-base font-extrabold text-[#F5F1E8]">₹4,000</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectCabForBooking(xyloCabData)}
                    className="btn-luxury-gold flex-1 text-xs !py-2"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Book Xylo/Scorpio</span>
                  </button>
                  <button
                    onClick={() => onOpenAIChatWithCab('Mahindra Xylo / Scorpio 4x4')}
                    className="btn-luxury-outline text-xs !py-2 !px-2.5"
                    title="Ask AI"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Force Urbania & Luxury Tempo Traveller */}
          {(groupSizeFilter === 'all' || groupSizeFilter === 'large') && (
            <div className="bg-[#111513] border-2 border-[#D6B36A]/40 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D6B36A] transition-all relative">
              <div className="absolute top-2 right-2 z-10 bg-[#D6B36A] text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                Best For 9–26 Pax
              </div>

              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/agency_card_banner_1785772861093.jpg"
                    alt="Force Urbania Luxury Tempo Traveller"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#0B0F0E]/90 text-[#D6B36A] font-bold px-2.5 py-1 rounded text-xs border border-[#D6B36A]/30">
                    Luxury Group Coach
                  </span>
                  <span className="absolute bottom-2 left-3 text-xs font-bold text-cyan-300 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-800">
                    9 / 13 / 17 / 26 Seater
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-lg text-[#F5F1E8]">
                      Force Urbania & Tempo Traveller
                    </h4>
                    <p className="text-xs text-[#D6B36A] font-semibold mt-0.5">
                      Capacity: 9 to 26 Passengers + 15+ Luggage
                    </p>
                    <p className="text-xs text-[#A9AAA4] mt-1 leading-relaxed">
                      The premier solution for extended family tours, corporate offsites, college reunions, and destination weddings. Walk-in standing cabin with pushback Maharaja seating.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#D6B36A]/15 text-xs text-[#A9AAA4]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">Individual 2x1 Maharaja pushback reclining seats</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">High-roof walk-in cabin, central powerful A/C & PA audio</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">Massive rear luggage compartment + rooftop carrier</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="p-2.5 bg-[#0B0F0E] rounded border border-[#D6B36A]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A9AAA4] block">Airport Transfer</span>
                    <span className="text-base font-extrabold text-[#D6B36A]">₹5,800</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#A9AAA4] block">Per Day Sightseeing</span>
                    <span className="text-base font-extrabold text-[#F5F1E8]">₹6,500</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectCabForBooking(travellerCabData)}
                    className="btn-luxury-gold flex-1 text-xs !py-2 font-bold"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Book Traveller</span>
                  </button>
                  <button
                    onClick={() => onOpenAIChatWithCab('Force Urbania / Luxury Tempo Traveller')}
                    className="btn-luxury-outline text-xs !py-2 !px-2.5"
                    title="Ask AI"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Mahindra Bolero Neo / Mountain 4WD */}
          {(groupSizeFilter === 'all' || groupSizeFilter === 'medium') && (
            <div className="bg-[#111513] border border-[#D6B36A]/30 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-[#D6B36A]/60 transition-all">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/yumthang_zero_point_1785680592273.jpg"
                    alt="Mahindra Bolero Neo 4WD"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#0B0F0E]/90 text-[#D6B36A] font-bold px-2.5 py-1 rounded text-xs border border-[#D6B36A]/30">
                    Offbeat 4WD Camper
                  </span>
                  <span className="absolute bottom-2 left-3 text-xs font-bold text-amber-300 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-800">
                    Unbreakable Leaf Springs
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-lg text-[#F5F1E8]">
                      Mahindra Bolero Neo / 4WD
                    </h4>
                    <p className="text-xs text-[#D6B36A] font-semibold mt-0.5">
                      Capacity: 6 Passengers + 4 Bags
                    </p>
                    <p className="text-xs text-[#A9AAA4] mt-1 leading-relaxed">
                      The undisputed champion of remote Himalayan terrain. Ideal for offbeat rustic homestay routes, Dzongu valley, trekking basecamps (Yuksom), and adventure photographers.
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#D6B36A]/15 text-xs text-[#A9AAA4]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">Unbeatable traction on wet mud, slush & steep gravel</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">Heavy-duty mHawk diesel engine with low-end pulling torque</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B36A] flex-shrink-0 mt-0.5" />
                      <span className="text-[#F5F1E8]">Rugged and budget-friendly for remote trekking basecamps</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="p-2.5 bg-[#0B0F0E] rounded border border-[#D6B36A]/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A9AAA4] block">Airport Transfer</span>
                    <span className="text-base font-extrabold text-[#D6B36A]">₹3,200</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#A9AAA4] block">Per Day Sightseeing</span>
                    <span className="text-base font-extrabold text-[#F5F1E8]">₹3,800</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectCabForBooking(boleroCabData)}
                    className="btn-luxury-gold flex-1 text-xs !py-2"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Book Bolero</span>
                  </button>
                  <button
                    onClick={() => onOpenAIChatWithCab('Mahindra Bolero Neo / Mountain 4WD')}
                    className="btn-luxury-outline text-xs !py-2 !px-2.5"
                    title="Ask AI"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fleet Comparison & Recommendation Guide Banner */}
      <div className="bg-[#111513] border border-[#D6B36A]/30 rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#D6B36A]" />
            <h4 className="text-base sm:text-lg font-bold text-[#F5F1E8]">
              Unsure which vehicle matches your mountain itinerary?
            </h4>
          </div>
          <p className="text-xs text-[#A9AAA4] max-w-2xl leading-relaxed">
            Our Gangtok dispatch team customizes fleet allocation based on your traveler count, luggage volume, and altitude permits (North Sikkim Lachung vs. Gangtok/Darjeeling).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <a
            href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
              'Namaste OffbeatDestination! Please help us choose the best vehicle for our group size and planned Sikkim itinerary.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 md:flex-initial bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Consult Chauffeur Desk</span>
          </a>

          <button
            onClick={() => onOpenAIChatWithCab('Vehicle Recommendation Guide')}
            className="flex-1 md:flex-initial btn-luxury-outline text-xs !py-2.5 !px-4 flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D6B36A]" />
            <span>AI Fleet Matcher</span>
          </button>
        </div>
      </div>
    </div>
  );
};
