import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, RefreshCw, X, Check, Folder } from 'lucide-react';

interface ImageUploadPickerProps {
  currentUrl?: string;
  onImageChange: (url: string) => void;
  label?: string;
  category?: string;
  aspectRatio?: 'landscape' | 'square' | 'wide';
  presetImages?: { label: string; url: string }[];
}

const DEFAULT_PRESETS = [
  { label: 'Sikkim Mountains Banner', url: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg' },
  { label: 'Darjeeling Tea Gardens', url: '/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg' },
  { label: 'Zero Point & Snow Peaks', url: '/src/assets/images/yumthang_zero_point_1785680592273.jpg' },
  { label: 'Ravangla Buddha Park', url: '/src/assets/images/ravangla_buddha_park_1785680605794.jpg' },
  { label: 'Luxury Innova Mountain Cab', url: '/src/assets/images/innova_crysta_cab_1785680577329.jpg' },
  { label: 'Offbeat Dark Travel Poster', url: '/src/assets/images/agency_poster_dark_1785772843834.jpg' },
];

export const ImageUploadPicker: React.FC<ImageUploadPickerProps> = ({
  currentUrl = '',
  onImageChange,
  label = 'Property Photo / Cover Image',
  category = 'Hotels',
  aspectRatio = 'landscape',
  presetImages = DEFAULT_PRESETS,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB. Please choose a smaller image.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Processing image file...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        try {
          // Send to backend endpoint for permanent store registration
          const res = await fetch('/api/admin/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: file.name.replace(/\.[^/.]+$/, ''),
              dataUrl,
              category,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const finalUrl = data.url || dataUrl;
            onImageChange(finalUrl);
            setUrlInput(finalUrl);
            setUploadStatus('Photo updated & saved to backend store!');
          } else {
            // Fallback to client data URL directly
            onImageChange(dataUrl);
            setUrlInput(dataUrl);
            setUploadStatus('Photo applied!');
          }
        } catch (err) {
          console.error('Photo upload error:', err);
          onImageChange(dataUrl);
          setUrlInput(dataUrl);
          setUploadStatus('Photo loaded!');
        }
      }
      setIsUploading(false);
      setTimeout(() => setUploadStatus(''), 3000);
    };

    reader.onerror = () => {
      setIsUploading(false);
      alert('Failed to read image file.');
    };

    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onImageChange(urlInput.trim());
    setUploadStatus('Image URL applied!');
    setTimeout(() => setUploadStatus(''), 3000);
  };

  return (
    <div className="space-y-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-200 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span>{label}</span>
        </label>

        {currentUrl && (
          <button
            type="button"
            onClick={() => {
              onImageChange('');
              setUrlInput('');
            }}
            className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Remove Photo</span>
          </button>
        )}
      </div>

      {/* Live Preview & Replace Overlay */}
      <div className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-900 min-h-[120px] flex items-center justify-center">
        {currentUrl ? (
          <>
            <img
              src={currentUrl}
              alt="Preview"
              referrerPolicy="no-referrer"
              className="w-full h-36 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/sikkim_hero_banner_1785680563996.jpg';
              }}
            />
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg shadow hover:bg-amber-400 text-[11px] flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Replace / Upload New</span>
              </button>
            </div>
          </>
        ) : (
          <div className="p-6 text-center space-y-2">
            <ImageIcon className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-[11px]">No photo assigned yet</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 text-[11px] inline-flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo File</span>
            </button>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center text-amber-400 space-y-1">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="text-[11px] font-bold">Uploading & Saving...</span>
          </div>
        )}
      </div>

      {uploadStatus && (
        <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
          <Check className="w-3.5 h-3.5" />
          <span>{uploadStatus}</span>
        </p>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
        className="hidden"
      />

      {/* Upload Mode Selector Pills */}
      <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
        <button
          type="button"
          onClick={() => {
            setActiveTab('upload');
            fileInputRef.current?.click();
          }}
          className={`flex-1 py-1 px-2 rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'upload'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Upload className="w-3 h-3" />
          <span>Upload File</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('url')}
          className={`flex-1 py-1 px-2 rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'url'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LinkIcon className="w-3 h-3" />
          <span>Image URL</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          className={`flex-1 py-1 px-2 rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${
            activeTab === 'presets'
              ? 'bg-amber-500 text-slate-950 shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Folder className="w-3 h-3" />
          <span>Select Preset</span>
        </button>
      </div>

      {/* Sub-panel: Direct URL Input */}
      {activeTab === 'url' && (
        <div className="flex gap-1.5">
          <input
            type="text"
            placeholder="Paste image URL (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-100 placeholder-slate-500"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-lg text-[11px]"
          >
            Apply
          </button>
        </div>
      )}

      {/* Sub-panel: Presets Picker */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-900 rounded-lg border border-slate-800">
          {presetImages.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                onImageChange(p.url);
                setUrlInput(p.url);
                setUploadStatus(`Applied ${p.label}`);
                setTimeout(() => setUploadStatus(''), 2500);
              }}
              className="text-left group relative h-14 rounded-md overflow-hidden border border-slate-800 hover:border-amber-400"
            >
              <img src={p.url} alt={p.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-1 flex items-end">
                <span className="text-[9px] font-bold text-slate-200 line-clamp-1">{p.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
