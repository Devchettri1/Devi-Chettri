import React, { useState } from 'react';
import { Image, Upload, Plus, Trash2, CheckCircle2, Copy, Link, X } from 'lucide-react';
import { MediaItem } from '../../types';

interface AdminMediaLibraryProps {
  media: MediaItem[];
  onRefresh: () => void;
}

export const AdminMediaLibrary: React.FC<AdminMediaLibraryProps> = ({ media, onRefresh }) => {
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  const [form, setForm] = useState({
    title: 'Nathula Pass Snow Peaks',
    url: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg',
    category: 'Sikkim',
  });

  const handleUpload = async () => {
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveMessage('Media Asset Added to Central Library!');
        setIsUploadModal(false);
        onRefresh();
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Image className="w-5 h-5 text-cyan-400" />
            <span>Centralized Media Library</span>
          </h3>
          <p className="text-xs text-slate-400">
            Store and manage high-resolution hero banners, hotel photos & destination graphics
          </p>
        </div>

        <button
          onClick={() => setIsUploadModal(true)}
          className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Image</span>
        </button>
      </div>

      {saveMessage && (
        <div className="p-3 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((m) => (
          <div
            key={m.id}
            className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg space-y-2 p-2 group"
          >
            <div className="h-36 bg-slate-900 rounded-xl overflow-hidden relative">
              <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-slate-950/80 text-[10px] text-teal-300 font-bold px-2 py-0.5 rounded">
                {m.category}
              </span>
            </div>

            <div className="p-1 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 truncate">{m.title}</span>
              <button
                onClick={() => copyToClipboard(m.url, m.id)}
                className="p-1 bg-slate-900 text-slate-300 hover:text-white rounded transition-colors"
                title="Copy Image URL"
              >
                {copiedId === m.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Add Asset to Media Library</h3>
              <button onClick={() => setIsUploadModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Asset Title</label>
                <input
                  type="text"
                  placeholder="e.g. Gangtok Ropeway View"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image Asset Path / URL</label>
                <input
                  type="text"
                  placeholder="/src/assets/images/..."
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category Tag</label>
                <input
                  type="text"
                  placeholder="Sikkim / Darjeeling / Hotel"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsUploadModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button onClick={handleUpload} className="btn-luxury-gold text-xs !py-2 !px-5">
                <span>Save Asset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
