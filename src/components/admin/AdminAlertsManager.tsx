import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertOctagon,
  CloudSnow,
  Info,
  CheckCircle2,
  Save,
  RotateCcw,
  Sparkles,
  MapPin,
  MessageCircle,
  Eye,
  Radio,
  ExternalLink,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { TravelAlert, TravelAlertType } from '../../types';
import { INITIAL_ALERT } from '../../data/initialStoreData';

interface AdminAlertsManagerProps {
  currentAlert: TravelAlert;
  onSaveAlert: (updatedAlert: TravelAlert) => void;
  onBroadcastSuccess?: () => void;
}

const PRESET_ALERT_TEMPLATES: {
  name: string;
  badge: string;
  icon: string;
  data: Partial<TravelAlert>;
}[] = [
  {
    name: 'Nathula Pass Closed (Heavy Snowfall)',
    badge: 'High Altitude Winter',
    icon: '❄️',
    data: {
      type: 'critical',
      title: 'Nathula Pass Temporarily Closed (Heavy Snow)',
      message: 'Army checkpost at 13th Mile has halted Nathula & Baba Mandir permits today due to fresh snowfall. Tsomgo Lake is open. Contact Gangtok desk for alternate sightseeing.',
      locationTag: 'East Sikkim (Nathula Pass)',
      linkText: 'WhatsApp 24/7 Desk',
      linkAction: 'whatsapp',
      isUrgent: true,
    },
  },
  {
    name: 'North Sikkim 4x4 Snow Chains Required',
    badge: 'Zero Point / Gurudongmar',
    icon: '🏔️',
    data: {
      type: 'warning',
      title: 'North Sikkim 4x4 Snow Chain Advisory',
      message: 'Zero Point (15,300 ft) & Gurudongmar routes are operational with mandatory 4x4 snow chains. Lachung & Lachen homestays are fully powered.',
      locationTag: 'North Sikkim (Zero Point & Lachung)',
      linkText: 'Check Live Weather & Road Status',
      linkAction: 'weather',
      isUrgent: true,
    },
  },
  {
    name: 'NH10 Highway Route Clearance Update',
    badge: 'Transit Route',
    icon: '🛣️',
    data: {
      type: 'warning',
      title: 'NH10 Highway Travel & Route Clearance',
      message: 'Siliguri to Gangtok highway (NH10) is clear with smooth one-way regulated traffic. Alternate scenic route via Lava & Kalimpong is also on standby.',
      locationTag: 'Siliguri-Gangtok Highway',
      linkText: 'Book Innova Cab Transfer',
      linkAction: 'cabs',
      isUrgent: false,
    },
  },
  {
    name: 'Clear Blue Skies & Kanchenjunga Peak Visibility',
    badge: 'Scenic Season',
    icon: '☀️',
    data: {
      type: 'info',
      title: 'Spectacular Kanchenjunga Peak Visibility Alert',
      message: 'Clear blue skies across Gangtok, Pelling & Darjeeling Tiger Hill today. Best time for early morning sunrise photography & drone shoots.',
      locationTag: 'Gangtok, Pelling & Darjeeling',
      linkText: 'View Top Tour Packages',
      linkAction: 'packages',
      isUrgent: false,
    },
  },
  {
    name: 'Border Permit Protocol Notice (Original ID Required)',
    badge: 'Permit Guidelines',
    icon: '📋',
    data: {
      type: 'info',
      title: 'Army Border Permit Issuance Notice',
      message: 'Travelers for Nathula, Gurudongmar & Old Silk Route must submit 2 passport photos and original Govt ID (Voter ID/Passport) 24 hours prior to travel.',
      locationTag: 'All Sikkim Permit Zones',
      linkText: 'Permits & Travel Checklist',
      linkAction: 'permits',
      isUrgent: false,
    },
  },
];

export const AdminAlertsManager: React.FC<AdminAlertsManagerProps> = ({
  currentAlert,
  onSaveAlert,
}) => {
  const [formData, setFormData] = useState<TravelAlert>({
    ...currentAlert,
  });
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleToggle = (enabled: boolean) => {
    const updated = { ...formData, enabled, updatedAt: new Date().toISOString() };
    setFormData(updated);
    onSaveAlert(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleApplyPreset = (preset: (typeof PRESET_ALERT_TEMPLATES)[0]) => {
    setFormData((prev) => ({
      ...prev,
      ...preset.data,
      enabled: true,
      updatedAt: new Date().toISOString(),
    }));
    setSaveSuccess(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    const payload = {
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    onSaveAlert(payload);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 400);
  };

  const handleReset = () => {
    setFormData({ ...INITIAL_ALERT });
    setSaveSuccess(false);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header & Master Toggle */}
      <div className="bg-[#0C1527] p-5 rounded-xl border border-slate-700/60 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </span>
            <h3 className="text-lg font-bold text-white">Live Real-Time Travel Advisory Banner</h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Instantly broadcast critical high-altitude warnings (Nathula Pass road closures, snow chain advisories, sudden weather changes) to all website visitors in real-time.
          </p>
        </div>

        {/* Master Toggle Button */}
        <div className="flex items-center gap-3 bg-[#060B18] px-4 py-2.5 rounded-xl border border-slate-700/80">
          <div className="text-right">
            <div className="text-xs font-bold text-white">
              {formData.enabled ? 'BANNER ACTIVE' : 'BANNER OFF'}
            </div>
            <div className="text-[10px] text-slate-400">
              {formData.enabled ? 'Visible to all visitors' : 'Hidden from website'}
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleToggle(!formData.enabled)}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
              formData.enabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                formData.enabled ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="bg-[#0A1128] p-5 rounded-xl border border-cyan-500/30">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Live Visitor Preview
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${formData.enabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700/40 text-slate-400'}`}>
            {formData.enabled ? '● Currently Broadcasting' : '○ Disabled (Preview Mode)'}
          </span>
        </div>

        {/* Mock Banner Display */}
        <div className="rounded-lg overflow-hidden border border-slate-700/80 shadow-md">
          <div
            className={`p-3 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              formData.type === 'critical'
                ? 'bg-gradient-to-r from-red-950 via-rose-900/90 to-red-950 text-rose-100 border-b border-rose-500/50'
                : formData.type === 'weather'
                ? 'bg-gradient-to-r from-slate-950 via-cyan-950 to-slate-950 text-cyan-100 border-b border-cyan-500/40'
                : formData.type === 'info'
                ? 'bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-emerald-100 border-b border-emerald-500/40'
                : 'bg-gradient-to-r from-amber-950 via-amber-900/90 to-amber-950 text-amber-100 border-b border-amber-500/40'
            }`}
          >
            <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
              {formData.type === 'critical' ? (
                <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse flex-shrink-0 mt-0.5 sm:mt-0" />
              ) : formData.type === 'weather' ? (
                <CloudSnow className="w-4 h-4 text-cyan-300 animate-bounce flex-shrink-0 mt-0.5 sm:mt-0" />
              ) : formData.type === 'info' ? (
                <Info className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5 sm:mt-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-300 animate-pulse flex-shrink-0 mt-0.5 sm:mt-0" />
              )}

              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-black/40 border border-white/20">
                {formData.type.toUpperCase()} ADVISORY
              </span>

              {formData.locationTag && (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/30 px-2 py-0.5 rounded border border-white/10">
                  <MapPin className="w-3 h-3 text-cyan-300" />
                  {formData.locationTag}
                </span>
              )}

              <div className="flex-1 min-w-0">
                <span className="font-bold text-white text-xs mr-1">{formData.title}</span>
                <span className="text-white/80 text-[11px]">— {formData.message}</span>
              </div>
            </div>

            {formData.linkText && (
              <div className="self-end sm:self-center flex-shrink-0">
                <span className={`px-2.5 py-1 rounded text-[11px] font-bold inline-flex items-center gap-1 ${
                  formData.type === 'critical'
                    ? 'bg-rose-500 text-white'
                    : formData.type === 'weather'
                    ? 'bg-cyan-400 text-slate-950'
                    : formData.type === 'info'
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-amber-400 text-slate-950'
                }`}>
                  {formData.linkAction === 'whatsapp' && <MessageCircle className="w-3 h-3" />}
                  {formData.linkText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick 1-Click Preset Templates */}
      <div className="bg-[#0C1527] p-5 rounded-xl border border-slate-700/60 shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-bold text-white">Instant 1-Click Advisory Templates</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {PRESET_ALERT_TEMPLATES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3 rounded-lg bg-[#060B18] hover:bg-[#111A33] border border-slate-700/60 hover:border-cyan-500/50 transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base">{preset.icon}</span>
                <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                  {preset.badge}
                </span>
              </div>
              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {preset.name}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {preset.data.message}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Edit Form */}
      <div className="bg-[#0C1527] p-5 rounded-xl border border-slate-700/60 shadow-lg space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          Edit Advisory Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Advisory Severity Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Advisory Severity Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as TravelAlertType })}
              className="w-full bg-[#060B18] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="warning">⚠️ Warning / Road Advisory (Amber)</option>
              <option value="critical">🚨 Critical / Closure Alert (Crimson Red)</option>
              <option value="weather">❄️ Weather & Snow Update (Cyan / Ice)</option>
              <option value="info">ℹ️ Official Notice / Permit Info (Emerald Green)</option>
            </select>
          </div>

          {/* Location Tag */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Region / Location Tag
            </label>
            <input
              type="text"
              value={formData.locationTag || ''}
              onChange={(e) => setFormData({ ...formData, locationTag: e.target.value })}
              placeholder="e.g. East Sikkim (Nathula Pass), North Sikkim, NH10 Highway"
              className="w-full bg-[#060B18] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Headline Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Advisory Title / Headline
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Nathula Pass & Tsomgo Lake Road Advisory"
            className="w-full bg-[#060B18] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-semibold"
          />
        </div>

        {/* Full Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Full Advisory Message (Shown across desktop & mobile)
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Provide exact details on road condition, army clearance status, 4x4 requirement, or hotline..."
            className="w-full bg-[#060B18] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Action Button Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Action Button Text (Optional)
            </label>
            <input
              type="text"
              value={formData.linkText || ''}
              onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
              placeholder="e.g. Check Live Weather, WhatsApp 24/7 Desk"
              className="w-full bg-[#060B18] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Action Destination Trigger
            </label>
            <select
              value={formData.linkAction || 'weather'}
              onChange={(e) => setFormData({ ...formData, linkAction: e.target.value as any })}
              className="w-full bg-[#060B18] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="weather">Scroll to Live Weather Widget & Travel Calculator</option>
              <option value="whatsapp">Open WhatsApp Live Desk (+91 62961 02341)</option>
              <option value="permits">Scroll to Permit FAQ Section</option>
              <option value="cabs">Scroll to Cab Rentals & Innova Fleet</option>
              <option value="packages">Scroll to Tour Packages</option>
              <option value="custom">Custom External URL</option>
            </select>
          </div>
        </div>

        {formData.linkAction === 'custom' && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Custom External URL
            </label>
            <input
              type="url"
              value={formData.customUrl || ''}
              onChange={(e) => setFormData({ ...formData, customUrl: e.target.value })}
              placeholder="https://..."
              className="w-full bg-[#060B18] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* Action Bar */}
        <div className="pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default
          </button>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Alert Broadcasted Live!
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Broadcasting...' : 'Save & Broadcast Advisory'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
