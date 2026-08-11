import React, { useState } from 'react';
import { GALLERY_ITEMS, AGENCY_DETAILS } from '../data/travelData';
import { GalleryItem } from '../types';
import { Image, Play, Film, MapPin, Tag, X, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Filter, Search, Wand2 } from 'lucide-react';

interface MediaGalleryProps {
  onOpenAIChatWithContext?: (context: string) => void;
  onOpenPhotoEditor?: (imageUrl?: string, title?: string) => void;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({ onOpenAIChatWithContext, onOpenPhotoEditor }) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [selectedService, setSelectedService] = useState<string>('All');
  const [selectedMediaType, setSelectedMediaType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Lightbox Modal state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesDest = selectedDestination === 'All' || item.destination === selectedDestination;
    const matchesService = selectedService === 'All' || item.serviceType === selectedService;
    const matchesType = selectedMediaType === 'All' || item.type === selectedMediaType;
    const matchesQuery =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesDest && matchesService && matchesType && matchesQuery;
  });

  const activeLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrevLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const handleNextLightbox = () => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="media-gallery" className="py-16 bg-slate-950 text-slate-100 space-y-10">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800 tracking-wider uppercase">
            Himalayan Visual Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Photo & Video Gallery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Explore authentic high-definition visuals of Sikkim's snow passes, Darjeeling tea estates, Bhutan monasteries, and our luxury Innova Crysta fleet.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          {/* Destination Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Destination:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              {['All', 'Sikkim', 'Darjeeling', 'Bhutan'].map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all ${
                    selectedDestination === dest
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {dest === 'All' ? 'All Regions' : dest}
                </button>
              ))}
            </div>
          </div>

          {/* Service & Media Type Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              {/* Service Type */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-slate-400">Service:</span>
                {['All', 'Tour Packages', 'Cab Rentals'].map((srv) => (
                  <button
                    key={srv}
                    onClick={() => setSelectedService(srv)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      selectedService === srv
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>

              {/* Media Type */}
              <div className="flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-semibold text-slate-400">Media:</span>
                {['All', 'photo', 'video'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMediaType(m)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-colors ${
                      selectedMediaType === m
                        ? 'bg-teal-600 text-white font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {m === 'photo' ? '📷 Photos' : m === 'video' ? '🎬 Videos' : 'All Media'}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Zero Point, Innova, Tea..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500 placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/80 shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="bg-slate-950/90 backdrop-blur-md text-emerald-300 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-800/80">
                    {item.destination}
                  </span>

                  <span className="bg-slate-950/90 backdrop-blur-md text-amber-300 font-medium px-2 py-0.5 rounded-full text-[10px] border border-amber-800/80">
                    {item.serviceType}
                  </span>
                </div>

                {/* Video Play Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center border-2 border-white shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                    {item.duration && (
                      <span className="absolute bottom-3 right-3 bg-slate-950/90 text-white text-[10px] px-2 py-0.5 rounded font-mono border border-slate-700">
                        {item.duration}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Details */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-[11px] text-slate-400 flex items-center gap-1 line-clamp-1">
                  <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
                  <span>{item.location}</span>
                </p>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {item.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <Image className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-bold text-slate-200 text-base">No media items found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your destination, service type, or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedDestination('All');
                setSelectedService('All');
                setSelectedMediaType('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-slate-900 border border-emerald-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-3 right-3 z-20 p-2 bg-slate-950/80 text-slate-300 hover:text-white rounded-full border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous & Next Controls */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full border border-slate-700 transition-transform hover:scale-110"
              title="Previous item"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNextLightbox}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-slate-950/80 hover:bg-slate-950 text-white rounded-full border border-slate-700 transition-transform hover:scale-110"
              title="Next item"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Media Viewer Side */}
            <div className="md:w-3/5 bg-slate-950 flex items-center justify-center relative min-h-[300px] md:min-h-[480px]">
              {activeLightboxItem.type === 'video' && activeLightboxItem.videoEmbedUrl ? (
                <iframe
                  src={activeLightboxItem.videoEmbedUrl}
                  title={activeLightboxItem.title}
                  className="w-full h-full min-h-[320px] md:min-h-[480px] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={activeLightboxItem.url}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-full object-contain p-2"
                />
              )}
            </div>

            {/* Details Side */}
            <div className="md:w-2/5 p-6 space-y-5 flex flex-col justify-between bg-slate-900">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-950 text-emerald-300 font-bold px-2.5 py-0.5 rounded text-[11px] border border-emerald-800">
                    {activeLightboxItem.destination}
                  </span>
                  <span className="bg-amber-950 text-amber-300 font-bold px-2.5 py-0.5 rounded text-[11px] border border-amber-800">
                    {activeLightboxItem.serviceType}
                  </span>
                </div>

                <h3 className="font-extrabold text-xl text-slate-100">
                  {activeLightboxItem.title}
                </h3>

                <p className="text-xs text-rose-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeLightboxItem.location}</span>
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeLightboxItem.description}
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tags:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLightboxItem.tags.map((t, i) => (
                      <span key={i} className="text-xs bg-slate-950 text-teal-300 px-2.5 py-1 rounded-lg border border-slate-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 border-t border-slate-800 pt-4">
                {onOpenPhotoEditor && activeLightboxItem.type !== 'video' && (
                  <button
                    onClick={() => {
                      onOpenPhotoEditor(activeLightboxItem.url, activeLightboxItem.title);
                      setActiveLightboxIndex(null);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Wand2 className="w-4 h-4 text-amber-300" />
                    <span>Edit & Customize This Photo</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20saw%20"${encodeURIComponent(activeLightboxItem.title)}"%20in%20your%20website%20gallery%20and%20would%20like%20to%20book.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book This Destination on WhatsApp</span>
                </a>

                {onOpenAIChatWithContext && (
                  <button
                    onClick={() => {
                      onOpenAIChatWithContext(activeLightboxItem.title);
                      setActiveLightboxIndex(null);
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Ask AI About This Spot</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
