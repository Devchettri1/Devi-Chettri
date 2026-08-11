import React, { useState } from 'react';
import { Compass, Search, MapPin, Sparkles, ShieldCheck, ArrowRight, Star, ExternalLink, Calendar, Car, Award, ChevronRight } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface SeoDestinationGuideProps {
  onSelectPackageFilter?: (keyword: string) => void;
  onOpenChatWithTopic?: (topic: string) => void;
}

const DESTINATION_SEO_HIGHLIGHTS = [
  {
    id: 'north-sikkim',
    title: 'North Sikkim (Lachung & Zero Point 15,300 ft)',
    subtitle: 'Snow Paradise & Rhododendron Valley',
    altitude: '15,300 FT',
    bestTime: 'Oct - May (Snow)',
    permitType: 'Mandatory PAP Permit (2 Photos + ID)',
    highlights: ['Zero Point (Yumesamdong)', 'Yumthang Valley of Flowers', 'Lachung Monastery', 'Hot Springs'],
    vehicleAllowed: 'Scorpio 4x4 / Innova Crysta (Small Cabs Restricted)',
    popularPackage: '3N/4D North Sikkim & Gangtok Circuit',
    keywordTag: 'North Sikkim Tour Package',
    color: 'from-blue-600 to-indigo-800',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'nathula-pass',
    title: 'Nathula Pass & Tsomgo Lake',
    subtitle: 'Indo-China Border & High Altitude Lake',
    altitude: '14,140 FT',
    bestTime: 'Year-Round (Closed Mon/Tue)',
    permitType: 'Army Restricted Pass (Voter ID / Passport)',
    highlights: ['Old Baba Harbhajan Mandir', 'Tsomgo Glacial Lake', 'Yak Rides', 'Indo-China Border Post'],
    vehicleAllowed: 'Innova Crysta / Mahindra Xylo / Scorpio',
    popularPackage: '5N/6D Sikkim & Darjeeling Signature',
    keywordTag: 'Nathula Pass Army Permit',
    color: 'from-emerald-600 to-teal-800',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'pelling-west-sikkim',
    title: 'Pelling Glass Skywalk & Ravangla',
    subtitle: 'Kanchenjunga Panoramic Views & Heritage',
    altitude: '7,200 FT',
    bestTime: 'Sept - June',
    permitType: 'Standard Tourist Entry (No special permit)',
    highlights: ['India First Glass Skywalk', 'Ravangla Buddha Park', 'Pemayangtse Monastery', 'Rabdentse Ruins'],
    vehicleAllowed: 'All Cabs (Innova, Sedan, Hatchback)',
    popularPackage: '6N/7D Grand Sikkim & Pelling Circuit',
    keywordTag: 'Pelling Glass Skywalk Tour',
    color: 'from-amber-600 to-orange-800',
    borderColor: 'border-amber-500/30',
  },
  {
    id: 'darjeeling-hills',
    title: 'Darjeeling Tea Gardens & Tiger Hill',
    subtitle: 'Queen of the Hills & Colonial Charm',
    altitude: '6,700 FT',
    bestTime: 'Sept - May',
    permitType: 'Open Tourist Region',
    highlights: ['Tiger Hill Kanchenjunga Sunrise', 'UNESCO Toy Train Ride', 'Batasia Loop', 'Happy Valley Tea Estate'],
    vehicleAllowed: 'Innova Crysta / Swift Dzire / WagonR',
    popularPackage: '4N/5N Gangtok & Darjeeling Budget Explorer',
    keywordTag: 'Darjeeling Tour Packages',
    color: 'from-teal-600 to-cyan-800',
    borderColor: 'border-teal-500/30',
  },
];

export const SeoDestinationGuide: React.FC<SeoDestinationGuideProps> = ({
  onSelectPackageFilter,
  onOpenChatWithTopic,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filteredDestinations = DESTINATION_SEO_HIGHLIGHTS.filter((dest) => {
    const matchesSearch =
      dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase())) ||
      dest.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTag === 'All') return matchesSearch;
    if (selectedTag === 'Permit Regions') return matchesSearch && dest.permitType.includes('Mandatory');
    if (selectedTag === 'Snow & Passes') return matchesSearch && (dest.id === 'north-sikkim' || dest.id === 'nathula-pass');
    return matchesSearch;
  });

  return (
    <section className="py-12 px-4 sm:px-6 bg-slate-950 border-t border-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* SEO Header & Keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-black uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>Official Gangtok Travel Guide & Permit Advisor</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Explore Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">Sikkim, Darjeeling & Bhutan</span> Destinations
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Planning your Himalayan getaway with <strong>OffbeatDestination Travels</strong> (Arithang, Gangtok)? Discover mandatory army permit requirements, altitude tips, best cab vehicles, and custom package routes.
          </p>
        </div>

        {/* Interactive SEO Search & Filter Chips */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Zero Point, Nathula, Skywalk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs font-semibold">
            {['All', 'Permit Regions', 'Snow & Passes'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className={`group relative bg-slate-900/80 rounded-2xl border ${dest.borderColor} p-5 flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-emerald-950/40`}
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-slate-950 border border-slate-800 text-emerald-300 rounded-lg">
                    {dest.altitude}
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {dest.bestTime}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                    {dest.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{dest.subtitle}</p>
                </div>

                {/* Permit & Vehicle Specs */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px]">
                  <div className="flex items-start gap-1.5 text-amber-300">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                    <span><strong>Permit:</strong> {dest.permitType}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-slate-300">
                    <Car className="w-3.5 h-3.5 shrink-0 mt-0.5 text-teal-400" />
                    <span><strong>Recommended Cabs:</strong> {dest.vehicleAllowed}</span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">Top Attractions:</span>
                  <div className="flex flex-wrap gap-1">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 bg-slate-950/90 text-slate-300 rounded-md border border-slate-800"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-800/80 space-y-2">
                <button
                  onClick={() => {
                    if (onOpenChatWithTopic) {
                      onOpenChatWithTopic(`Permits & Packages for ${dest.title}`);
                    }
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Ask AI Permit Advisor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
                    `Namaste ${AGENCY_DETAILS.name}! I am interested in booking a tour package covering ${dest.title}. Please share itinerary options and cab availability.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                >
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Get WhatsApp Quote</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Local Office SEO Footer Banner */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-emerald-950/50 to-slate-900 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Sikkim Tourism Regd Agency #1750</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white">
              Visiting Gangtok? Drop by our head office in Arithang, Gangtok!
            </h4>
            <p className="text-xs text-slate-400 max-w-2xl">
              Submit your passport photos for Nathula / Zero Point army permits in person or enjoy a warm cup of local Sikkimese tea with our travel coordinators.
            </p>
          </div>

          <a
            href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(
              `Namaste! I want to visit your Gangtok Office at Arithang, Sikkim for trip planning.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs whitespace-nowrap flex items-center gap-2 shadow-lg transition-transform transform hover:scale-[1.02]"
          >
            <MapPin className="w-4 h-4" />
            <span>Arithang Office Map</span>
          </a>
        </div>

      </div>
    </section>
  );
};
