import React, { useState } from 'react';
import { Building2, Plus, Trash2, Edit2, Save, X, CheckCircle2, Star, MapPin, Filter, Search, Image as ImageIcon, Upload } from 'lucide-react';
import { HotelItem } from '../../types';
import { ImageUploadPicker } from './ImageUploadPicker';
import { sikkimHeroBanner } from '../../assets/images';

interface AdminHotelsProps {
  hotels: HotelItem[];
  onRefresh: () => void;
}

const LOCATIONS = ['All', 'Gangtok', 'Darjeeling', 'Pelling', 'Kalimpong', 'Lachung', 'Namchi', 'Siliguri / Bagdogra'];
const CHAINS = ['All', 'Rare Himalayas', 'Trickocity', 'Summit', 'Udaan', 'Rufina', 'Voyage', 'Mayfair', 'Sterling', 'Elgin', 'Jain Group'];

export const AdminHotels: React.FC<AdminHotelsProps> = ({ hotels, onRefresh }) => {
  const [editingHotel, setEditingHotel] = useState<HotelItem | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedChain, setSelectedChain] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState<Partial<HotelItem>>({
    name: '',
    destination: 'Gangtok',
    category: '3 Star Deluxe',
    basePricePerNight: 3500,
    seasonalPricePerNight: 4800,
    address: 'MG Marg Area, Gangtok',
    amenities: ['Geyser', 'Free Wi-Fi', 'Breakfast', 'Heater', 'Mountain View'],
    roomTypes: ['Deluxe Valley View', 'Executive Suite'],
    contactPhone: '+91 97331 81750',
    image: '/images/sikkim_hero_banner_1785680563996.jpg',
    active: true,
  });

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/admin/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveMessage('New Hotel Property Created!');
        setIsNewModalOpen(false);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editingHotel) return;
    try {
      const res = await fetch(`/api/admin/hotels/${editingHotel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingHotel),
      });
      if (res.ok) {
        setSaveMessage('Hotel Pricing & Photo Specs Saved!');
        setEditingHotel(null);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickPhotoUpdate = async (hotelId: string, newPhotoUrl: string) => {
    try {
      const targetHotel = hotels.find((h) => h.id === hotelId);
      if (!targetHotel) return;

      const updated = { ...targetHotel, image: newPhotoUrl };
      const res = await fetch(`/api/admin/hotels/${hotelId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setSaveMessage(`Photo replaced for ${targetHotel.name}!`);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this hotel property from backend directory?')) {
      try {
        const res = await fetch(`/api/admin/hotels/${id}`, { method: 'DELETE' });
        if (res.ok) onRefresh();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Filter logic
  const filteredHotels = hotels.filter((h) => {
    const matchLoc =
      selectedLocation === 'All' ||
      h.destination.toLowerCase().includes(selectedLocation.toLowerCase().split(' ')[0]);

    const matchChain =
      selectedChain === 'All' ||
      h.name.toLowerCase().includes(selectedChain.toLowerCase());

    const matchSearch =
      !searchQuery.trim() ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchLoc && matchChain && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* CMS Header & Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <span>Hotels & Stays CMS ({hotels.length} Properties)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Configure Rare Himalayas, Trickocity, Summit, Udaan, Rufina, Voyage, Mayfair, Sterling, Elgin & Jain Group hotels location-wise with custom photos & pricing
          </p>
        </div>

        <button
          onClick={() => {
            setForm({
              name: '',
              destination: 'Gangtok',
              category: '3 Star Deluxe',
              basePricePerNight: 3500,
              seasonalPricePerNight: 4800,
              address: 'MG Marg Area, Gangtok',
              amenities: ['Geyser', 'Free Wi-Fi', 'Breakfast', 'Electric Kettle'],
              roomTypes: ['Deluxe Room', 'Super Deluxe Room'],
              contactPhone: '+91 97331 81750',
              image: '/images/sikkim_hero_banner_1785680563996.jpg',
              active: true,
            });
            setIsNewModalOpen(true);
          }}
          className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Partner Hotel</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-3 bg-teal-950 text-teal-300 border border-teal-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Location & Chain Filter Bar */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search hotel name, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/60">
            Showing {filteredHotels.length} of {hotels.length} Properties
          </span>
        </div>

        {/* Location Pills */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Filter by Location:</label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(loc)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all border ${
                  selectedLocation === loc
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Chain Filter Pills */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Filter by Hotel Chain:</label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CHAINS.map((chain) => (
              <button
                key={chain}
                onClick={() => setSelectedChain(chain)}
                className={`px-3 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all border ${
                  selectedChain === chain
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                {chain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHotels.map((h) => (
          <div
            key={h.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-amber-500/50 overflow-hidden flex flex-col justify-between shadow-lg transition-all group"
          >
            <div>
              {/* Hotel Photo with Replace Button */}
              <div className="relative h-44 overflow-hidden bg-slate-900">
                <img
                  src={h.image || sikkimHeroBanner}
                  alt={h.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = sikkimHeroBanner;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Location & Category Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                  <span className="bg-slate-950/90 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-md text-[10px] border border-amber-500/40">
                    {h.category}
                  </span>
                  <span className="bg-teal-950/90 text-teal-300 font-bold px-2 py-0.5 rounded-md text-[10px] border border-teal-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{h.destination}</span>
                  </span>
                </div>

                {/* Replace Photo Quick Button Overlay */}
                <div className="absolute bottom-2 right-2">
                  <button
                    type="button"
                    onClick={() => setEditingHotel(h)}
                    className="px-2.5 py-1 bg-slate-950/90 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 font-bold text-[10px] rounded-lg transition-all flex items-center gap-1 shadow-md"
                  >
                    <Upload className="w-3 h-3 text-amber-400 group-hover:text-slate-950" />
                    <span>Replace Photo</span>
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <h4 className="font-bold text-slate-100 text-sm leading-snug line-clamp-1">{h.name}</h4>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{h.description}</p>

                {/* Rates Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Regular Night</span>
                    <span className="font-bold text-slate-200">₹{h.basePricePerNight}/night</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Peak Surge</span>
                    <span className="font-bold text-amber-300">
                      ₹{h.seasonalPricePerNight || h.peakSeasonPricePerNight || Math.round(h.basePricePerNight * 1.25)}/night
                    </span>
                  </div>
                </div>

                {/* Amenities Chips */}
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {(h.amenities || []).slice(0, 4).map((a, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setEditingHotel(h)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Edit Specs & Photo</span>
              </button>

              <button
                onClick={() => handleDelete(h.id)}
                className="p-1.5 text-rose-400 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors"
                title="Delete Hotel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-12 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-bold text-sm">No properties match your filter criteria.</p>
          <p className="text-slate-500 text-xs">Try selecting 'All' locations or resetting your search filter.</p>
        </div>
      )}

      {/* Edit Modal with ImageUploadPicker */}
      {editingHotel && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Edit Hotel & Replace Photo</h3>
              <button onClick={() => setEditingHotel(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Uploader Component */}
            <ImageUploadPicker
              currentUrl={editingHotel.image}
              onImageChange={(newUrl) => setEditingHotel({ ...editingHotel, image: newUrl })}
              label="Hotel Property Cover Photo"
              category="Hotels"
            />

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-slate-300 font-semibold mb-1">Hotel Name</label>
                <input
                  type="text"
                  value={editingHotel.name}
                  onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-slate-300 font-semibold mb-1">Destination Location</label>
                <input
                  type="text"
                  value={editingHotel.destination}
                  onChange={(e) => setEditingHotel({ ...editingHotel, destination: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category Tier</label>
                <select
                  value={editingHotel.category}
                  onChange={(e) => setEditingHotel({ ...editingHotel, category: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                >
                  <option value="3 Star Deluxe">3 Star Deluxe</option>
                  <option value="4 Star Premium">4 Star Premium</option>
                  <option value="5 Star Heritage Luxury">5 Star Heritage Luxury</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Base Night Price (₹)</label>
                <input
                  type="number"
                  value={editingHotel.basePricePerNight}
                  onChange={(e) => setEditingHotel({ ...editingHotel, basePricePerNight: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Peak Season Price (₹)</label>
                <input
                  type="number"
                  value={editingHotel.seasonalPricePerNight || editingHotel.peakSeasonPricePerNight || 0}
                  onChange={(e) =>
                    setEditingHotel({
                      ...editingHotel,
                      seasonalPricePerNight: Number(e.target.value),
                      peakSeasonPricePerNight: Number(e.target.value),
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Description Overview</label>
                <textarea
                  rows={2}
                  value={editingHotel.description}
                  onChange={(e) => setEditingHotel({ ...editingHotel, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingHotel(null)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="btn-luxury-gold text-xs !py-2 !px-5">
                <span>Save Hotel Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Hotel Modal with ImageUploadPicker */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Add New Partner Hotel</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Uploader Component */}
            <ImageUploadPicker
              currentUrl={form.image}
              onImageChange={(newUrl) => setForm({ ...form, image: newUrl })}
              label="Upload Hotel Photo"
              category="Hotels"
            />

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-slate-300 font-semibold mb-1">Hotel Name</label>
                <input
                  type="text"
                  placeholder="e.g. Summit Grace Boutique Hotel"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-slate-300 font-semibold mb-1">Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Gangtok, Darjeeling, Pelling"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category Tier</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                >
                  <option value="3 Star Deluxe">3 Star Deluxe</option>
                  <option value="4 Star Premium">4 Star Premium</option>
                  <option value="5 Star Heritage Luxury">5 Star Heritage Luxury</option>
                  <option value="Budget">Budget</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Base Night Rate (₹)</label>
                <input
                  type="number"
                  value={form.basePricePerNight}
                  onChange={(e) => setForm({ ...form, basePricePerNight: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Peak Night Rate (₹)</label>
                <input
                  type="number"
                  value={form.seasonalPricePerNight || form.peakSeasonPricePerNight || 0}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      seasonalPricePerNight: Number(e.target.value),
                      peakSeasonPricePerNight: Number(e.target.value),
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief property description & highlights..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button onClick={handleCreate} className="btn-luxury-gold text-xs !py-2 !px-5">
                <span>Save Hotel Property</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
