import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Edit2, Save, X, CheckCircle2, Image, Globe, Upload } from 'lucide-react';
import { DestinationItem } from '../../types';
import { ImageUploadPicker } from './ImageUploadPicker';

interface AdminDestinationsProps {
  destinations: DestinationItem[];
  onRefresh: () => void;
}

export const AdminDestinations: React.FC<AdminDestinationsProps> = ({ destinations, onRefresh }) => {
  const [editingDest, setEditingDest] = useState<DestinationItem | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [form, setForm] = useState<Partial<DestinationItem>>({
    name: '',
    slug: '',
    region: 'East Sikkim',
    heroImage: '/images/sikkim_hero_banner_1785680563996.jpg',
    shortDescription: '',
    fullOverview: '',
    bestTimeToVisit: 'October to May',
    recommendedDuration: '2 Nights',
    keyAttractions: ['Sightseeing Spot 1', 'Sightseeing Spot 2'],
    travelTips: ['Carry original ID proof'],
    active: true,
  });

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/admin/destinations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveMessage('Destination Added & Live!');
        setIsNewModalOpen(false);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editingDest) return;
    try {
      const res = await fetch(`/api/admin/destinations/${editingDest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDest),
      });
      if (res.ok) {
        setSaveMessage('Destination Updated Live!');
        setEditingDest(null);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      try {
        const res = await fetch(`/api/admin/destinations/${id}`, { method: 'DELETE' });
        if (res.ok) {
          onRefresh();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span>Destinations CMS</span>
          </h3>
          <p className="text-xs text-slate-400">
            Manage Sikkim, Darjeeling & Bhutan destinations, attractions, and guide details
          </p>
        </div>

        <button
          onClick={() => {
            setForm({
              name: '',
              slug: '',
              region: 'East Sikkim',
              heroImage: '/images/sikkim_hero_banner_1785680563996.jpg',
              shortDescription: '',
              fullOverview: '',
              bestTimeToVisit: 'October to May',
              recommendedDuration: '2 Nights',
              keyAttractions: ['Attraction 1', 'Attraction 2'],
              travelTips: ['Permit required'],
              active: true,
            });
            setIsNewModalOpen(true);
          }}
          className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Destination</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* List of Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((d) => (
          <div
            key={d.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="h-32 relative overflow-hidden bg-slate-900">
                <img src={d.heroImage} alt={d.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-slate-900/90 text-[#D9BC7A] text-[10px] font-bold px-2 py-0.5 rounded border border-[#C6A15B]/30">
                  {d.region}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-100 text-sm">{d.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">/{d.slug}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{d.shortDescription}</p>

                <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                  Best Time: {d.bestTimeToVisit}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setEditingDest(d)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(d.id)}
                className="p-1.5 text-rose-400 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg transition-colors"
                title="Delete Destination"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingDest && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Edit Destination: {editingDest.name}</h3>
              <button onClick={() => setEditingDest(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <ImageUploadPicker
              currentUrl={editingDest.heroImage}
              onImageChange={(newUrl) => setEditingDest({ ...editingDest, heroImage: newUrl })}
              label="Destination Cover Image"
              category="Destinations"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destination Name</label>
                <input
                  type="text"
                  value={editingDest.name}
                  onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">URL Slug</label>
                <input
                  type="text"
                  value={editingDest.slug}
                  onChange={(e) => setEditingDest({ ...editingDest, slug: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={editingDest.heroImage}
                  onChange={(e) => setEditingDest({ ...editingDest, heroImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Best Time to Visit</label>
                <input
                  type="text"
                  value={editingDest.bestTimeToVisit}
                  onChange={(e) => setEditingDest({ ...editingDest, bestTimeToVisit: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingDest.shortDescription}
                  onChange={(e) => setEditingDest({ ...editingDest, shortDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Full Overview</label>
                <textarea
                  rows={3}
                  value={editingDest.fullOverview}
                  onChange={(e) => setEditingDest({ ...editingDest, fullOverview: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setEditingDest(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="btn-luxury-gold text-xs !py-2 !px-5 flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Add New Sikkim Destination</h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <ImageUploadPicker
              currentUrl={form.heroImage}
              onImageChange={(newUrl) => setForm({ ...form, heroImage: newUrl })}
              label="Destination Cover Image"
              category="Destinations"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destination Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ravangla"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">URL Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <input
                  type="text"
                  placeholder="e.g. Home to 130ft Buddha Park & Temi Tea Estate"
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button onClick={handleCreate} className="btn-luxury-gold text-xs !py-2 !px-5">
                <span>Create Destination</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
