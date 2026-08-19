import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sliders,
  Sparkles,
  Download,
  Share2,
  RotateCw,
  FlipHorizontal,
  Crop,
  ShieldCheck,
  Check,
  Upload,
  Image as ImageIcon,
  MessageCircle,
  Layers,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { AGENCY_DETAILS, TOUR_PACKAGES, CAB_OPTIONS, GALLERY_ITEMS } from '../data/travelData';

interface PhotoEditorModalProps {
  initialImageUrl?: string;
  initialTitle?: string;
  onClose: () => void;
  onApplyPhotoToPackage?: (pkgId: string, newPhotoUrl: string) => void;
  onApplyPhotoToCab?: (cabId: string, newPhotoUrl: string) => void;
}

// Preset Filters
const PRESET_FILTERS = [
  { id: 'normal', name: 'Original', brightness: 100, contrast: 100, saturation: 100, warmth: 0, sepia: 0 },
  { id: 'himalayan_sunrise', name: 'Himalayan Sunrise 🌅', brightness: 110, contrast: 115, saturation: 125, warmth: 15, sepia: 10 },
  { id: 'snow_hdr', name: 'Snow Peak HDR 🏔️', brightness: 105, contrast: 130, saturation: 110, warmth: -10, sepia: 0 },
  { id: 'emerald_valley', name: 'Emerald Valley 🍃', brightness: 100, contrast: 110, saturation: 140, warmth: 5, sepia: 0 },
  { id: 'vintage_tea', name: 'Vintage Memory 📜', brightness: 95, contrast: 105, saturation: 80, warmth: 20, sepia: 35 },
  { id: 'twilight', name: 'Twilight Alpine 🌌', brightness: 90, contrast: 120, saturation: 120, warmth: -25, sepia: 0 },
];

export const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  initialImageUrl,
  initialTitle,
  onClose,
  onApplyPhotoToPackage,
  onApplyPhotoToCab,
}) => {
  // Sample source photos list for easy picking
  const samplePhotos = [
    { name: 'Yumthang Zero Point', url: '/images/yumthang_zero_point_1785680592273.jpg' },
    { name: 'Ravangla Buddha Park', url: '/images/ravangla_buddha_park_1785680605794.jpg' },
    { name: 'Sikkim Mountains Banner', url: '/images/sikkim_hero_banner_1785680563996.jpg' },
    { name: 'Agency Poster Banner', url: '/images/agency_poster_dark_1785772843834.jpg' },
    ...GALLERY_ITEMS.slice(0, 4).map((g) => ({ name: g.title, url: g.url })),
  ];

  const [imageUrl, setImageUrl] = useState<string>(
    initialImageUrl || samplePhotos[0].url
  );
  const [photoTitle, setPhotoTitle] = useState<string>(initialTitle || 'Sikkim Tour Photo');

  // Adjustments State
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);
  const [warmth, setWarmth] = useState<number>(0);
  const [sepia, setSepia] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);

  // Transform State
  const [rotation, setRotation] = useState<number>(0);
  const [flippedH, setFlippedH] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<'free' | '16:9' | '4:3' | '1:1'>('16:9');

  // Branding & Overlays
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [showBadge, setShowBadge] = useState<boolean>(true);
  const [customCaption, setCustomCaption] = useState<string>('OffbeatDestination Travels • Govt. Regd 1750');
  const [captionPosition, setCaptionPosition] = useState<'bottom' | 'top' | 'watermark'>('bottom');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'filters' | 'adjust' | 'branding' | 'source' | 'apply'>('filters');

  // Target apply selection
  const [targetPkgId, setTargetPkgId] = useState<string>('');
  const [targetCabId, setTargetCabId] = useState<string>('');
  const [appliedNotification, setAppliedNotification] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImageUrl(uploadEvent.target.result as string);
          setPhotoTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset Adjustments
  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setWarmth(0);
    setSepia(0);
    setBlur(0);
    setRotation(0);
    setFlippedH(false);
  };

  // Apply Preset
  const applyPreset = (preset: typeof PRESET_FILTERS[0]) => {
    setBrightness(preset.brightness);
    setContrast(preset.contrast);
    setSaturation(preset.saturation);
    setWarmth(preset.warmth);
    setSepia(preset.sepia);
  };

  // Render to Canvas for High Quality Export
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      setImageLoaded(true);

      // Determine size based on aspect ratio
      let renderWidth = img.naturalWidth || 1200;
      let renderHeight = img.naturalHeight || 800;

      if (aspectRatio === '16:9') {
        renderHeight = Math.round(renderWidth * (9 / 16));
      } else if (aspectRatio === '4:3') {
        renderHeight = Math.round(renderWidth * (3 / 4));
      } else if (aspectRatio === '1:1') {
        renderHeight = renderWidth;
      }

      canvas.width = renderWidth;
      canvas.height = renderHeight;

      ctx.save();
      ctx.clearRect(0, 0, renderWidth, renderHeight);

      // Apply transformations
      ctx.translate(renderWidth / 2, renderHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flippedH ? -1 : 1, 1);

      // Apply Canvas Filters
      const hueDegree = warmth * 2;
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hueDegree}deg) sepia(${sepia}%) blur(${blur}px)`;

      // Draw image
      ctx.drawImage(img, -renderWidth / 2, -renderHeight / 2, renderWidth, renderHeight);
      ctx.restore();

      // Draw Overlays (Watermark, Captions, Badges)
      ctx.save();
      ctx.filter = 'none';

      if (showWatermark) {
        // Bottom subtle gradient overlay
        const grad = ctx.createLinearGradient(0, renderHeight - 120, 0, renderHeight);
        grad.addColorStop(0, 'rgba(2, 6, 23, 0)');
        grad.addColorStop(1, 'rgba(2, 6, 23, 0.85)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, renderHeight - 120, renderWidth, 120);

        // Logo / Agency Name text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.fillText(AGENCY_DETAILS.name, 24, renderHeight - 48);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
        ctx.fillText(`Lic No: ${AGENCY_DETAILS.licenseNo} • Govt. Registered Travel Agent`, 24, renderHeight - 24);
      }

      if (showBadge) {
        // Top Left Verification Badge
        const badgeWidth = 240;
        const badgeHeight = 36;
        ctx.fillStyle = 'rgba(6, 78, 59, 0.85)';
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.roundRect(24, 24, badgeWidth, badgeHeight, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ecfdf5';
        ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
        ctx.fillText(`✓ 100% Verified Sikkim Tour`, 38, 47);
      }

      if (customCaption) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
        if (captionPosition === 'top') {
          ctx.fillText(customCaption, 24, showBadge ? 85 : 40);
        } else if (captionPosition === 'bottom') {
          const textWidth = ctx.measureText(customCaption).width;
          ctx.fillRect(renderWidth - textWidth - 40, renderHeight - 48, textWidth + 24, 30);
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(customCaption, renderWidth - textWidth - 28, renderHeight - 28);
        }
      }

      ctx.restore();
    };
  }, [
    imageUrl,
    brightness,
    contrast,
    saturation,
    warmth,
    sepia,
    blur,
    rotation,
    flippedH,
    aspectRatio,
    showWatermark,
    showBadge,
    customCaption,
    captionPosition,
  ]);

  // Download Handler
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `OffbeatDestination-${photoTitle.replace(/\s+/g, '_')}-edited.png`;
    link.href = canvas.toDataURL('image/png', 0.95);
    link.click();
  };

  // Share via WhatsApp
  const handleShareWhatsApp = () => {
    const msg = `Namaste! I edited/customized a photo for our Sikkim trip: "${photoTitle}". Please assist me with booking: https://${AGENCY_DETAILS.domain}`;
    window.open(`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Apply to Package or Cab
  const handleApplyToApp = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);

    if (targetPkgId && onApplyPhotoToPackage) {
      onApplyPhotoToPackage(targetPkgId, dataUrl);
      setAppliedNotification('Successfully updated cover photo for package!');
    } else if (targetCabId && onApplyPhotoToCab) {
      onApplyPhotoToCab(targetCabId, dataUrl);
      setAppliedNotification('Successfully updated vehicle photo for cab fleet!');
    } else {
      setAppliedNotification('Please select a package or cab from the list below.');
    }

    setTimeout(() => setAppliedNotification(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                Easy Photo Editor & Media Studio
                <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800">
                  OffbeatDestination Studio
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Enhance tour photos, add agency watermarks, apply filters, and customize package cover images easily.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Work Area: Canvas Preview + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Left / Top: Interactive Canvas Studio */}
          <div className="lg:col-span-7 bg-slate-950 p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 min-h-[320px]">
            {/* Live Render Canvas */}
            <div className="relative max-w-full max-h-[50vh] lg:max-h-[60vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/50 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[50vh] lg:max-h-[60vh] object-contain rounded-xl"
              />
            </div>

            {/* Quick Action Overlay Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 flex items-center gap-1.5"
              >
                <RotateCw className="w-3.5 h-3.5 text-teal-400" />
                <span>Rotate 90° ({rotation}°)</span>
              </button>

              <button
                onClick={() => setFlippedH(!flippedH)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border flex items-center gap-1.5 ${
                  flippedH
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <FlipHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Flip Horizontally</span>
              </button>

              {/* Aspect Ratio Buttons */}
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                {(['16:9', '4:3', '1:1', 'free'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-2.5 py-0.5 rounded-lg font-bold transition-all ${
                      aspectRatio === ratio
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Bottom: Photo Editor Tools Panel */}
          <div className="lg:col-span-5 bg-slate-900 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('filters')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'filters'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Presets</span>
              </button>

              <button
                onClick={() => setActiveTab('adjust')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'adjust'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Sliders</span>
              </button>

              <button
                onClick={() => setActiveTab('branding')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'branding'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Badge</span>
              </button>

              <button
                onClick={() => setActiveTab('source')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'source'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Source</span>
              </button>
            </div>

            {/* TAB 1: PRESET FILTERS */}
            {activeTab === 'filters' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  One-Click Himalayan Aesthetic Presets
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {PRESET_FILTERS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className="p-3 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 hover:border-emerald-500 text-left transition-all group"
                    >
                      <span className="font-bold text-xs text-white group-hover:text-emerald-300 block">
                        {preset.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Sat: {preset.saturation}% • Warmth: {preset.warmth}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SLIDERS ADJUSTMENT */}
            {activeTab === 'adjust' && (
              <div className="space-y-4 text-xs">
                {/* Brightness */}
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-semibold">
                    <span>Brightness</span>
                    <span className="text-emerald-400 font-mono">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg"
                  />
                </div>

                {/* Contrast */}
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-semibold">
                    <span>Contrast</span>
                    <span className="text-emerald-400 font-mono">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg"
                  />
                </div>

                {/* Saturation */}
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-semibold">
                    <span>Saturation (Vibrancy)</span>
                    <span className="text-emerald-400 font-mono">{saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg"
                  />
                </div>

                {/* Warmth / Hue */}
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-semibold">
                    <span>Warmth Tone</span>
                    <span className="text-amber-400 font-mono">{warmth > 0 ? `+${warmth}` : warmth}</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={warmth}
                    onChange={(e) => setWarmth(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg"
                  />
                </div>

                {/* Sepia */}
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300 font-semibold">
                    <span>Vintage Sepia</span>
                    <span className="text-emerald-400 font-mono">{sepia}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sepia}
                    onChange={(e) => setSepia(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: WATERMARKS & BADGES */}
            {activeTab === 'branding' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <label className="flex items-center justify-between font-bold text-slate-200 cursor-pointer">
                    <span>Agency Watermark Footer</span>
                    <input
                      type="checkbox"
                      checked={showWatermark}
                      onChange={(e) => setShowWatermark(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded"
                    />
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Embeds OffbeatDestination Travels legal agency name & Reg No. {AGENCY_DETAILS.licenseNo}.
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <label className="flex items-center justify-between font-bold text-slate-200 cursor-pointer">
                    <span>Verified Tour Badge</span>
                    <input
                      type="checkbox"
                      checked={showBadge}
                      onChange={(e) => setShowBadge(e.target.checked)}
                      className="accent-emerald-500 w-4 h-4 rounded"
                    />
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Adds top-left emerald green "✓ 100% Verified Sikkim Tour" guarantee badge.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-300 font-bold">Custom Photo Caption / Subtitle</label>
                  <input
                    type="text"
                    value={customCaption}
                    onChange={(e) => setCustomCaption(e.target.value)}
                    placeholder="e.g. Gurudongmar Lake 17,800 ft - Pure Magic!"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: PHOTO SOURCE & UPLOAD */}
            {activeTab === 'source' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-2xl border border-dashed border-emerald-800 text-center space-y-2">
                  <Upload className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="font-bold text-slate-200">Upload Your Own Custom Image</p>
                  <p className="text-[11px] text-slate-400">Supports PNG, JPG, WEBP from your phone or PC</p>
                  <label className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors mt-2">
                    Browse Local File
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-slate-300">Or Select Existing Sample Image</label>
                  <div className="grid grid-cols-2 gap-2">
                    {samplePhotos.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setImageUrl(p.url);
                          setPhotoTitle(p.name);
                        }}
                        className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          imageUrl === p.url
                            ? 'bg-emerald-950 border-emerald-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <img src={p.url} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="truncate text-[11px] font-medium">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* APPLY TO PACKAGE / CAB SECTION */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 block uppercase tracking-wider">
                Apply Photo to Website
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={targetPkgId}
                  onChange={(e) => {
                    setTargetPkgId(e.target.value);
                    setTargetCabId('');
                  }}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Apply to Package --</option>
                  {TOUR_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.duration} - {pkg.title.slice(0, 24)}...
                    </option>
                  ))}
                </select>

                <select
                  value={targetCabId}
                  onChange={(e) => {
                    setTargetCabId(e.target.value);
                    setTargetPkgId('');
                  }}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="">-- Apply to Cab Fleet --</option>
                  {CAB_OPTIONS.map((cab) => (
                    <option key={cab.id} value={cab.id}>
                      {cab.model} ({cab.type})
                    </option>
                  ))}
                </select>
              </div>

              {(targetPkgId || targetCabId) && (
                <button
                  onClick={handleApplyToApp}
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Set as Live Cover Photo</span>
                </button>
              )}

              {appliedNotification && (
                <p className="text-[11px] font-bold text-emerald-400 text-center animate-pulse">
                  {appliedNotification}
                </p>
              )}
            </div>

            {/* Bottom Final Export Buttons */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Photo</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
