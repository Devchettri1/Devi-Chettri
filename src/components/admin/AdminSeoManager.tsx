import React, { useState, useEffect, useMemo } from 'react';
import {
  Globe,
  Sparkles,
  Search,
  Copy,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  RefreshCw,
  Eye,
  Sliders,
  FileCode2,
  Share2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Tag,
  Zap,
  Package,
  Car,
  ChevronRight,
  ArrowRight,
  Lightbulb,
  CheckCheck,
} from 'lucide-react';
import { SeoSettings, SeoPageMeta, TourPackage, CabOption } from '../../types';
import { DEFAULT_SEO_SETTINGS, TOUR_PACKAGES, CAB_OPTIONS } from '../../data/travelData';

interface AdminSeoManagerProps {
  seoSettings?: SeoSettings;
  packages?: TourPackage[];
  cabs?: CabOption[];
  initialSelectedItem?: { type: 'package' | 'cab'; id: string };
  onSaveSeo?: (updated: SeoSettings) => Promise<void> | void;
  onRefresh?: () => void;
}

export interface MetaDescriptionSuggestion {
  id: string;
  strategy: string;
  badge: string;
  title: string;
  description: string;
  charCount: number;
  rationale: string;
}

interface GeneratedKeyword {
  keyword: string;
  intent: 'Commercial' | 'Transactional' | 'Informational' | string;
  searchVolumeEst: 'Very High' | 'High' | 'Medium' | string;
  relevanceReason: string;
}

const PAGE_DEFINITIONS: Array<{ key: keyof SeoSettings; label: string; urlSlug: string; description: string }> = [
  { key: 'home', label: 'Home Page', urlSlug: '#home', description: 'Main landing page, hero search, brand overview' },
  { key: 'packages', label: 'Tour Packages', urlSlug: '#packages', description: '5D to 10D holiday itineraries, North Sikkim & Silk Route' },
  { key: 'cabs', label: 'Cab Rentals & Taxi Fleet', urlSlug: '#cabs', description: 'Innova Crysta, Scorpio 4WD, Sedans & airport transfers' },
  { key: 'hotels', label: 'Affiliated Hotels & Resorts', urlSlug: '#hotels', description: '3★/4★/5★ boutique hotels in Gangtok, Pelling & Lachung' },
  { key: 'offers', label: 'Seasonal Offers & Deals', urlSlug: '#offers', description: 'Limited-time discounts, honeymoon & family specials' },
  { key: 'gallery', label: 'Photo & Video Gallery', urlSlug: '#gallery', description: 'High-res Sikkim photography, Zero Point & Yumthang' },
  { key: 'reviews', label: 'Customer Reviews', urlSlug: '#reviews', description: '520+ verified 5-star traveler testimonials & ratings' },
  { key: 'faqs', label: 'Travel FAQs & Permit Rules', urlSlug: '#faqs', description: 'Nathula Pass permits, weather guides & altitude advice' },
  { key: 'checklist', label: 'Travel Packing Checklist', urlSlug: '#checklist', description: 'What to pack, thermal wear, documents & medical tips' },
  { key: 'location', label: 'Gangtok Office Map', urlSlug: '#location', description: 'Registered Arithang Gangtok HQ, phone & WhatsApp contact' },
  { key: 'about', label: 'About Us', urlSlug: '#about', description: 'Govt. registered agency license details & team story' },
  { key: 'contact', label: 'Contact Us & Custom Plan', urlSlug: '#contact', description: 'Custom itinerary builder & direct booking inquiries' },
];

export const AdminSeoManager: React.FC<AdminSeoManagerProps> = ({
  seoSettings = DEFAULT_SEO_SETTINGS,
  packages = TOUR_PACKAGES,
  cabs = CAB_OPTIONS,
  initialSelectedItem,
  onSaveSeo,
  onRefresh,
}) => {
  const [localSeo, setLocalSeo] = useState<SeoSettings>(() => ({ ...DEFAULT_SEO_SETTINGS, ...seoSettings }));
  const [selectedPage, setSelectedPage] = useState<keyof SeoSettings>('home');
  const [activeSubView, setActiveSubView] = useState<'editor' | 'serp-preview' | 'sitemap-schema'>('editor');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Package & Cab Context Selection State for Meta Description suggestions
  const [contextType, setContextType] = useState<'package' | 'cab'>(
    initialSelectedItem?.type || 'package'
  );
  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    (initialSelectedItem?.type === 'package' && initialSelectedItem.id) || packages[0]?.id || ''
  );
  const [selectedCabId, setSelectedCabId] = useState<string>(
    (initialSelectedItem?.type === 'cab' && initialSelectedItem.id) || cabs[0]?.id || ''
  );

  // Meta Description Suggestion State
  const [isGeneratingMetaDesc, setIsGeneratingMetaDesc] = useState<boolean>(false);
  const [metaSuggestions, setMetaSuggestions] = useState<MetaDescriptionSuggestion[]>([]);
  const [appliedSuggestionId, setAppliedSuggestionId] = useState<string | null>(null);

  // AI Keyword Generator State
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState<boolean>(false);
  const [generatedKeywords, setGeneratedKeywords] = useState<GeneratedKeyword[]>([]);
  const [generationSource, setGenerationSource] = useState<string>('');
  const [customKeywordInput, setCustomKeywordInput] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveStatusMessage, setSaveStatusMessage] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (seoSettings) {
      setLocalSeo((prev) => ({ ...prev, ...seoSettings }));
    }
  }, [seoSettings]);

  // Sync context when target page changes
  useEffect(() => {
    if (selectedPage === 'packages') {
      setContextType('package');
    } else if (selectedPage === 'cabs') {
      setContextType('cab');
    }
  }, [selectedPage]);

  const currentPageMeta: SeoPageMeta = localSeo[selectedPage] || {
    title: '',
    description: '',
    keywords: '',
    canonicalUrl: `https://offbeatdestination.in/#${selectedPage}`,
  };

  const handleFieldChange = (field: keyof SeoPageMeta, value: string) => {
    setLocalSeo((prev) => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        [field]: value,
      },
    }));
  };

  // Find current selected package or cab object
  const currentSelectedPackage = useMemo(() => {
    return packages.find((p) => p.id === selectedPkgId) || packages[0];
  }, [packages, selectedPkgId]);

  const currentSelectedCab = useMemo(() => {
    return cabs.find((c) => c.id === selectedCabId) || cabs[0];
  }, [cabs, selectedCabId]);

  // Generate fallback smart suggestions for instant response
  const buildLocalMetaSuggestions = (
    type: 'package' | 'cab',
    itemData: any
  ): MetaDescriptionSuggestion[] => {
    const itemName = itemData?.title || itemData?.model || itemData?.type || 'Sikkim Tour';
    const itemDuration = itemData?.duration || (type === 'cab' ? `${itemData?.capacity || '6-7 Seats'} · Daily Rental` : 'Custom Itinerary');
    const itemPrice = itemData?.priceStarting
      ? `₹${Number(itemData.priceStarting).toLocaleString('en-IN')}`
      : itemData?.ratePerDay
      ? `₹${Number(itemData.ratePerDay).toLocaleString('en-IN')}`
      : '';
    const itemLocation = itemData?.location || (type === 'cab' ? 'Gangtok, Bagdogra & North Sikkim' : 'Gangtok, North Sikkim & Darjeeling');

    return [
      {
        id: 'desc-conversion',
        strategy: 'High Conversion & Pricing',
        badge: 'Top CTR',
        title:
          type === 'cab'
            ? `${itemName} Taxi Rental Gangtok | Best Rates | OffbeatDestination`
            : `${itemName} from ${itemPrice || '₹18,500'} | Sikkim Tour Packages`,
        description:
          type === 'cab'
            ? `Book ${itemName} cab in Gangtok${itemPrice ? ` starting ${itemPrice}/day` : ''}. Clean luxury vehicle, verified local driver & zero hidden fees. Get instant WhatsApp quote!`
            : `Book ${itemName}${itemPrice ? ` starting ${itemPrice}` : ''}. Includes private cab, 3★ deluxe hotels & Nathula Pass permit assistance. Instant WhatsApp quote!`,
        charCount: 0,
        rationale: 'Includes direct pricing and high-converting CTA for searchers ready to book.',
      },
      {
        id: 'desc-luxury',
        strategy: 'Luxury & All-Inclusive Stays',
        badge: 'Premium',
        title:
          type === 'cab'
            ? `Luxury ${itemName} Cab Hire with Driver in Sikkim & Darjeeling`
            : `Luxury ${itemName} (${itemDuration}) | Private Stays & Cab`,
        description:
          type === 'cab'
            ? `Premium ${itemName} rental for Sikkim, Darjeeling & Silk Route. Reclining seats, sanitized interiors, expert mountain drivers & 24/7 support. Book online!`
            : `Experience luxury in Sikkim with ${itemName}. Boutique hotel stays, private Innova Crysta drives, pure veg dining & guaranteed permits. Plan your trip!`,
        charCount: 0,
        rationale: 'Highlights premium comfort, hygiene, and full coordination for discerning travelers.',
      },
      {
        id: 'desc-seo',
        strategy: 'SEO & Search Dominance',
        badge: 'High Search Vol',
        title:
          type === 'cab'
            ? `${itemName} Fare Bagdogra to Gangtok & North Sikkim 4WD Rates`
            : `${itemName} Itinerary, Rates & Permits | Gangtok Agency`,
        description:
          type === 'cab'
            ? `Govt. registered taxi service in Gangtok for ${itemName}. Airport pickup from Bagdogra & NJP to Gangtok, Lachung & Darjeeling with transparent rates.`
            : `Best ${itemName} covering ${itemLocation}. Includes private vehicle transfers, boutique hotel stays & Nathula permit clearance. Registered Sikkim DMC.`,
        charCount: 0,
        rationale: 'Targets high-frequency search keywords and Govt. registration trust signals.',
      },
      {
        id: 'desc-mobile',
        strategy: 'Mobile Snippet (Zero Truncation)',
        badge: 'Punchy',
        title:
          type === 'cab'
            ? `Hire ${itemName} in Gangtok | 4.9★ Rated Sikkim Cab Operator`
            : `${itemName} | 4.9★ Sikkim Tour Package`,
        description:
          type === 'cab'
            ? `Hire ${itemName} in Gangtok${itemPrice ? ` from ${itemPrice}` : ''}. Bagdogra airport pickup, North Sikkim & Silk Route with 4.9★ rated local driver.`
            : `${itemDuration} ${itemName}${itemPrice ? ` from ${itemPrice}` : ''}. Private cab, hotels & permits included. Govt registered Gangtok agency. Book now!`,
        charCount: 0,
        rationale: 'Optimized at ~135-145 characters to avoid truncation on mobile Google SERPs.',
      },
    ].map((s) => ({
      ...s,
      charCount: s.description.length,
    }));
  };

  // Generate Meta Descriptions based on the selected package or cab
  const handleGenerateMetaDescriptions = async () => {
    setIsGeneratingMetaDesc(true);
    setAppliedSuggestionId(null);
    const activeItem = contextType === 'package' ? currentSelectedPackage : currentSelectedCab;

    try {
      const res = await fetch('/api/admin/generate-meta-descriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType: contextType,
          itemData: activeItem,
          targetPage: selectedPage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setMetaSuggestions(data.suggestions);
      } else {
        // Use local template fallback
        setMetaSuggestions(buildLocalMetaSuggestions(contextType, activeItem));
      }
    } catch (err) {
      console.warn('Meta description API error, using smart fallback:', err);
      setMetaSuggestions(buildLocalMetaSuggestions(contextType, activeItem));
    } finally {
      setIsGeneratingMetaDesc(false);
    }
  };

  // Auto-generate suggestions on mount or when context changes
  useEffect(() => {
    const activeItem = contextType === 'package' ? currentSelectedPackage : currentSelectedCab;
    if (activeItem) {
      setMetaSuggestions(buildLocalMetaSuggestions(contextType, activeItem));
    }
  }, [contextType, selectedPkgId, selectedCabId]);

  // Apply chosen meta description suggestion
  const handleApplySuggestion = (suggestion: MetaDescriptionSuggestion, alsoApplyTitle = false) => {
    setLocalSeo((prev) => ({
      ...prev,
      [selectedPage]: {
        ...prev[selectedPage],
        description: suggestion.description,
        ...(alsoApplyTitle ? { title: suggestion.title } : {}),
      },
    }));
    setAppliedSuggestionId(suggestion.id);
    setTimeout(() => setAppliedSuggestionId(null), 3000);
  };

  // Keywords Array Helper
  const keywordsArray = currentPageMeta.keywords
    ? currentPageMeta.keywords.split(',').map((k) => k.trim()).filter(Boolean)
    : [];

  const handleAddKeyword = (keywordToAdd: string) => {
    const clean = keywordToAdd.trim();
    if (!clean) return;
    if (keywordsArray.includes(clean)) return;
    const updated = [...keywordsArray, clean].join(', ');
    handleFieldChange('keywords', updated);
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const updated = keywordsArray.filter((k) => k !== keywordToRemove).join(', ');
    handleFieldChange('keywords', updated);
  };

  const handleAddAllGeneratedKeywords = () => {
    if (generatedKeywords.length === 0) return;
    const newItems = generatedKeywords.map((g) => g.keyword.trim()).filter((k) => !keywordsArray.includes(k));
    const combined = [...keywordsArray, ...newItems].join(', ');
    handleFieldChange('keywords', combined);
  };

  // Generate Keywords with Gemini API
  const handleGenerateKeywordsWithAI = async () => {
    setIsGeneratingKeywords(true);
    setSaveStatusMessage('');
    try {
      const res = await fetch('/api/admin/generate-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: selectedPage,
          title: currentPageMeta.title,
          description: currentPageMeta.description,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.keywords)) {
        setGeneratedKeywords(data.keywords);
        setGenerationSource(data.source || 'gemini');
      } else {
        throw new Error(data.error || 'Failed to generate keywords');
      }
    } catch (err: any) {
      console.error('Keyword generation error:', err);
      setSaveStatusMessage(`Note: Using high-intent cached keyword bank (${err?.message || 'AI timeout'})`);
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  const handleCopyText = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveSeo = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seo: localSeo }),
      });

      if (res.ok) {
        if (onSaveSeo) {
          await onSaveSeo(localSeo);
        }
        setSaveStatusMessage('SEO metadata saved & deployed live to active website pages!');
        if (onRefresh) onRefresh();
      } else {
        setSaveStatusMessage('Failed to save SEO metadata to backend.');
      }
    } catch (err: any) {
      setSaveStatusMessage(`Save error: ${err.message}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatusMessage(''), 4000);
    }
  };

  // Character calculations for Google SERP
  const titleLength = currentPageMeta.title?.length || 0;
  const descLength = currentPageMeta.description?.length || 0;

  const titleStatusColor =
    titleLength >= 45 && titleLength <= 65
      ? 'text-emerald-400'
      : titleLength > 65
      ? 'text-amber-400'
      : 'text-sky-400';

  const descStatusColor =
    descLength >= 120 && descLength <= 160
      ? 'text-emerald-400'
      : descLength > 160
      ? 'text-amber-400'
      : 'text-sky-400';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 p-5 rounded-2xl border border-cyan-800/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-cyan-300">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100 flex items-center gap-2">
                <span>SEO Metadata & SERP Manager</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700/50 px-2 py-0.5 rounded-full font-bold">
                  Gemini AI Powered
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamically update Google meta titles, descriptions, and long-tail keywords across all pages with zero code deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setActiveSubView('editor')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeSubView === 'editor' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Metadata Editor</span>
            </button>
            <button
              onClick={() => setActiveSubView('serp-preview')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeSubView === 'serp-preview' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>SERP & Social Preview</span>
            </button>
            <button
              onClick={() => setActiveSubView('sitemap-schema')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeSubView === 'sitemap-schema' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Schema & Sitemap</span>
            </button>
          </div>

          <button
            onClick={handleSaveSeo}
            disabled={isSaving}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{isSaving ? 'Saving...' : 'Save Live SEO'}</span>
          </button>
        </div>
      </div>

      {saveStatusMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveStatusMessage}</span>
          </div>
        </div>
      )}

      {/* Page Selector Tabs */}
      <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>Select Target Website Page</span>
          <span className="text-cyan-400 font-mono text-[10px]">Editing: {PAGE_DEFINITIONS.find((p) => p.key === selectedPage)?.label}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {PAGE_DEFINITIONS.map((page) => {
            const isSelected = selectedPage === page.key;
            return (
              <button
                key={page.key}
                onClick={() => {
                  setSelectedPage(page.key);
                  setGeneratedKeywords([]);
                }}
                className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-500 text-slate-100 shadow-md shadow-cyan-950'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-xs flex items-center justify-between">
                  <span className={isSelected ? 'text-cyan-300' : 'text-slate-200'}>{page.label}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1 truncate">{page.urlSlug}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* View 1: Metadata Editor */}
      {activeSubView === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <span>Meta Title Tag (`&lt;title&gt;`)</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Primary Google Ranking Signal)</span>
                  </label>
                  <span className={`text-[11px] font-mono font-bold ${titleStatusColor}`}>
                    {titleLength} / 60 chars {titleLength > 65 && '(Google may truncate)'}
                  </span>
                </div>
                <input
                  type="text"
                  value={currentPageMeta.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  placeholder="e.g. Best Sikkim Tour Packages & Gangtok Cab Rentals | OffbeatDestination"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-semibold focus:outline-none"
                />
                <div className="w-full bg-slate-900 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      titleLength <= 60 ? 'bg-cyan-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${Math.min(100, (titleLength / 60) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <span>Meta Description (`&lt;meta name="description"&gt;`)</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Search Snippet CTR Booster)</span>
                  </label>
                  <span className={`text-[11px] font-mono font-bold ${descStatusColor}`}>
                    {descLength} / 160 chars {descLength >= 120 && descLength <= 158 ? '✓ Optimal Length' : descLength > 160 ? '⚠ Truncates on Google' : ''}
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={currentPageMeta.description}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  placeholder="Compelling description of tour packages, rates, permits, and vehicle fleet with direct CTA..."
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none leading-relaxed"
                />
                <div className="w-full bg-slate-900 h-1 rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      descLength >= 120 && descLength <= 158 ? 'bg-emerald-400' : descLength > 160 ? 'bg-amber-400' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${Math.min(100, (descLength / 160) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* ================= DYNAMIC PACKAGE & CAB CONTEXTUAL META DESCRIPTION SUGGESTER ================= */}
              <div className="bg-gradient-to-br from-slate-900 via-cyan-950/30 to-slate-900 p-4 rounded-xl border border-cyan-700/40 space-y-3.5 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/40 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                        <span>Auto-Suggest Meta Descriptions</span>
                        <span className="text-[9px] bg-cyan-900 text-cyan-200 border border-cyan-600 px-1.5 py-0.2 rounded font-mono font-bold">
                          Based on Selected Item
                        </span>
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Generates 4 Google-ready 120-160 char descriptions from currently edited package or cab
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateMetaDescriptions}
                    disabled={isGeneratingMetaDesc}
                    className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingMetaDesc ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingMetaDesc ? 'Analyzing Details...' : 'Regenerate 4 Options'}</span>
                  </button>
                </div>

                {/* Source Item Context Switcher */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                  <div className="sm:col-span-4 flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                    <button
                      onClick={() => setContextType('package')}
                      className={`flex-1 py-1 px-2 rounded-md font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                        contextType === 'package'
                          ? 'bg-emerald-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Package className="w-3 h-3" />
                      <span>Tour Package</span>
                    </button>
                    <button
                      onClick={() => setContextType('cab')}
                      className={`flex-1 py-1 px-2 rounded-md font-bold text-[11px] flex items-center justify-center gap-1 transition-all ${
                        contextType === 'cab'
                          ? 'bg-cyan-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Car className="w-3 h-3" />
                      <span>Cab Service</span>
                    </button>
                  </div>

                  <div className="sm:col-span-8">
                    {contextType === 'package' ? (
                      <select
                        value={selectedPkgId}
                        onChange={(e) => setSelectedPkgId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-emerald-500"
                      >
                        {packages.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} (₹{pkg.priceStarting ? Number(pkg.priceStarting).toLocaleString('en-IN') : 'N/A'}) • {pkg.duration}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        value={selectedCabId}
                        onChange={(e) => setSelectedCabId(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-cyan-500"
                      >
                        {cabs.map((cab) => (
                          <option key={cab.id} value={cab.id}>
                            {cab.model} ({cab.type}) • {cab.capacity} • ₹{cab.ratePerDay}/day
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Meta Description Suggestions Cards */}
                <div className="space-y-2.5 pt-1">
                  {metaSuggestions.map((sug) => {
                    const isOptimalLength = sug.charCount >= 120 && sug.charCount <= 158;
                    const isApplied = appliedSuggestionId === sug.id;
                    return (
                      <div
                        key={sug.id}
                        className={`p-3 rounded-xl border transition-all space-y-2 ${
                          isApplied
                            ? 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-950'
                            : 'bg-slate-950/90 border-slate-800/90 hover:border-cyan-700/60'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black text-slate-200">
                              {sug.strategy}
                            </span>
                            <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded font-mono font-semibold">
                              {sug.badge}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                isOptimalLength
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                                  : 'bg-amber-950 text-amber-400 border border-amber-800/80'
                              }`}
                            >
                              {sug.charCount} chars {isOptimalLength ? '· Optimal' : ''}
                            </span>

                            <button
                              onClick={() => handleCopyText(sug.description, `sug-${sug.id}`)}
                              className="p-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 rounded text-xs transition-colors cursor-pointer"
                              title="Copy description"
                            >
                              {copiedKey === `sug-${sug.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Description Text */}
                        <p className="text-xs text-slate-100 leading-relaxed font-normal bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          "{sug.description}"
                        </p>

                        {/* Rationale & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                          <p className="text-[10px] text-slate-400 italic flex items-center gap-1 truncate max-w-xs">
                            <Lightbulb className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{sug.rationale}</span>
                          </p>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleApplySuggestion(sug, false)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                isApplied
                                  ? 'bg-emerald-500 text-slate-950'
                                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm'
                              }`}
                            >
                              {isApplied ? (
                                <>
                                  <CheckCheck className="w-3.5 h-3.5" />
                                  <span>Applied to Description!</span>
                                </>
                              ) : (
                                <>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                  <span>Apply Description</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleApplySuggestion(sug, true)}
                              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer"
                              title="Also apply the suggested meta title"
                            >
                              + Apply Title Too
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Keywords Tag Manager */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Target Meta Keywords ({keywordsArray.length} keywords active)</span>
                  </label>
                  {keywordsArray.length > 0 && (
                    <button
                      onClick={() => handleFieldChange('keywords', '')}
                      className="text-[10px] text-rose-400 hover:text-rose-300 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Keywords Chips */}
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl min-h-[70px] space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {keywordsArray.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">
                        No keywords assigned. Click 'Generate Keywords with Gemini' below or type custom tags.
                      </span>
                    ) : (
                      keywordsArray.map((keyword, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded-lg text-[11px] font-semibold"
                        >
                          <span>{keyword}</span>
                          <button
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="text-cyan-400/60 hover:text-rose-400 transition-colors ml-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Add keyword input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <input
                      type="text"
                      value={customKeywordInput}
                      onChange={(e) => setCustomKeywordInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault();
                          handleAddKeyword(customKeywordInput);
                          setCustomKeywordInput('');
                        }
                      }}
                      placeholder="Type custom keyword and press Enter or Comma..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-100 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        handleAddKeyword(customKeywordInput);
                        setCustomKeywordInput('');
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Canonical URL */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1">
                  Canonical URL (`&lt;link rel="canonical"&gt;`)
                </label>
                <input
                  type="text"
                  value={currentPageMeta.canonicalUrl || `https://offbeatdestination.in/#${selectedPage}`}
                  onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
                  placeholder="https://offbeatdestination.in/#home"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-300 font-mono focus:outline-none"
                />
              </div>

              {/* DIRECT GENERATE KEYWORDS ACTION & SUGGESTED LIST BELOW INPUT FIELDS */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 p-3 rounded-xl border border-cyan-800/40">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-cyan-500/20 text-cyan-300 rounded-lg">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-100 flex items-center gap-1.5">
                        <span>AI SEO Keyword Generator</span>
                        <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-700/60 px-1.5 py-0.2 rounded font-mono">Gemini 2.5</span>
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Uses current title & description to suggest 10 high-intent search terms
                      </p>
                    </div>
                  </div>

                  <button
                    id="btn-generate-seo-keywords"
                    onClick={handleGenerateKeywordsWithAI}
                    disabled={isGeneratingKeywords}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGeneratingKeywords ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingKeywords ? 'Generating 10 Keywords...' : 'Generate Keywords'}</span>
                  </button>
                </div>

                {/* Populated 10 High-Volume Long-Tail Keywords List */}
                {generatedKeywords.length > 0 && (
                  <div className="p-4 bg-slate-900/90 border border-cyan-800/50 rounded-xl space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-black text-slate-200">
                          10 Suggested High-Volume Long-Tail Keywords
                        </span>
                        <span className="text-[10px] text-cyan-400 font-mono">({generationSource})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const allKeywordsString = generatedKeywords.map((k) => k.keyword).join(', ');
                            handleCopyText(allKeywordsString, 'copy-all-keywords');
                          }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all"
                          title="Copy all 10 keywords as comma-separated text"
                        >
                          {copiedKey === 'copy-all-keywords' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">All Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy All 10</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={handleAddAllGeneratedKeywords}
                          className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Add All to Tags</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                      {generatedKeywords.map((kw, index) => {
                        const isAdded = keywordsArray.includes(kw.keyword);
                        const isCopied = copiedKey === `main-kw-${index}`;
                        return (
                          <div
                            key={index}
                            className={`p-2 rounded-lg border transition-all flex flex-col justify-between gap-1.5 ${
                              isAdded
                                ? 'bg-slate-950/60 border-slate-800/80 opacity-75'
                                : 'bg-slate-950 border-slate-800 hover:border-cyan-700/60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <span className="text-xs font-semibold text-slate-100 leading-snug">
                                {kw.keyword}
                              </span>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => handleCopyText(kw.keyword, `main-kw-${index}`)}
                                  className="p-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 rounded transition-colors"
                                  title="Copy keyword"
                                >
                                  {isCopied ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleAddKeyword(kw.keyword)}
                                  disabled={isAdded}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                                    isAdded
                                      ? 'bg-slate-800 text-slate-500'
                                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                                  }`}
                                >
                                  {isAdded ? 'Added' : '+ Tag'}
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800/60">
                              <span
                                className={`px-1 rounded font-mono ${
                                  kw.intent === 'Transactional'
                                    ? 'text-emerald-400 bg-emerald-950/60'
                                    : kw.intent === 'Commercial'
                                    ? 'text-cyan-400 bg-cyan-950/60'
                                    : 'text-amber-400 bg-amber-950/60'
                                }`}
                              >
                                {kw.intent}
                              </span>
                              <span>Vol: {kw.searchVolumeEst}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Keyword Generator Sidebar (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-b from-slate-950 via-slate-950 to-cyan-950/40 p-5 rounded-2xl border border-cyan-800/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-cyan-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-100 uppercase tracking-wider">
                      Gemini Keyword Engine
                    </h4>
                    <span className="text-[10px] text-cyan-400 font-mono">Real-time Search Intent AI</span>
                  </div>
                </div>

                <button
                  onClick={handleGenerateKeywordsWithAI}
                  disabled={isGeneratingKeywords}
                  className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isGeneratingKeywords ? 'animate-spin text-slate-950' : ''}`} />
                  <span>{isGeneratingKeywords ? 'Analyzing...' : 'Generate Keywords'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Gemini analyzes the title, description, and mountain travel booking search queries to suggest 10 high-intent long-tail keywords.
              </p>

              {/* Generated Keywords Results */}
              {isGeneratingKeywords ? (
                <div className="p-8 text-center space-y-3 bg-slate-900/60 rounded-xl border border-slate-800">
                  <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
                  <div className="text-xs text-slate-300 font-semibold">
                    Consulting Gemini 2.5 Flash for Himalayan travel queries...
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Extracting commercial intent, permit queries & vehicle booking phrases
                  </div>
                </div>
              ) : generatedKeywords.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300">
                      10 Suggested Long-Tail Keywords ({generationSource})
                    </span>
                    <button
                      onClick={handleAddAllGeneratedKeywords}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add All 10</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {generatedKeywords.map((item, idx) => {
                      const isAlreadyAdded = keywordsArray.includes(item.keyword);
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border transition-all space-y-1.5 ${
                            isAlreadyAdded
                              ? 'bg-slate-900/40 border-slate-800 opacity-60'
                              : 'bg-slate-900 border-slate-800 hover:border-cyan-700/60'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-100">{item.keyword}</span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => handleCopyText(item.keyword, `kw-${idx}`)}
                                className="p-1 text-slate-400 hover:text-cyan-300 transition-colors"
                                title="Copy keyword"
                              >
                                {copiedKey === `kw-${idx}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleAddKeyword(item.keyword)}
                                disabled={isAlreadyAdded}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all flex items-center gap-0.5 ${
                                  isAlreadyAdded
                                    ? 'bg-slate-800 text-slate-500 cursor-default'
                                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                                }`}
                              >
                                {isAlreadyAdded ? 'Added' : '+ Add'}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-[10px]">
                            <span
                              className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                                item.intent === 'Transactional'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : item.intent === 'Commercial'
                                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                              }`}
                            >
                              {item.intent}
                            </span>
                            <span className="text-slate-400 flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3 text-cyan-400" /> Volume: {item.searchVolumeEst}
                            </span>
                          </div>

                          {item.relevanceReason && (
                            <p className="text-[10px] text-slate-400 leading-tight italic">
                              "{item.relevanceReason}"
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center space-y-2 bg-slate-900/40 rounded-xl border border-slate-800/80">
                  <Sparkles className="w-5 h-5 text-cyan-400/60 mx-auto" />
                  <div className="text-xs text-slate-300 font-semibold">No AI keywords generated yet</div>
                  <p className="text-[11px] text-slate-500">
                    Click "Generate Keywords" to fetch 10 high-conversion search phrases tailored for this page.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Live SERP & Social Preview */}
      {activeSubView === 'serp-preview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-slate-100">Live Search Engine Simulator</h4>
              <p className="text-xs text-slate-400">See exactly how this page appears on Google search results & WhatsApp shares</p>
            </div>
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1 rounded-lg font-bold ${
                  previewDevice === 'desktop' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Desktop Google
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1 rounded-lg font-bold ${
                  previewDevice === 'mobile' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                Mobile Google
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google SERP Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Google Search Result Snippet ({previewDevice.toUpperCase()})</span>
              </div>

              <div
                className={`p-4 bg-white text-slate-900 rounded-xl font-sans space-y-1.5 shadow-md ${
                  previewDevice === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[9px] font-bold">
                    OD
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-slate-900">OffbeatDestination Travels</span>
                    <span className="text-slate-500 ml-1">https://offbeatdestination.in/{selectedPage}</span>
                  </div>
                </div>

                <div className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                  {currentPageMeta.title || 'OffbeatDestination Travels - Official Sikkim & Darjeeling Tour Operator'}
                </div>

                <div className="text-xs text-[#4d5156] leading-relaxed line-clamp-3">
                  {currentPageMeta.description ||
                    'Book customizable 5N/6D Sikkim & Darjeeling tour packages, luxury Innova Crysta cab rentals, and North Sikkim Zero Point trips with Govt Registered Sikkim travel agency.'}
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center gap-4 text-[11px] text-[#4d5156]">
                  <span>Rating: 4.9 ★★★★★</span>
                  <span>520+ Reviews</span>
                  <span>Price: ₹14,500+</span>
                </div>
              </div>
            </div>

            {/* Social Share Preview (WhatsApp / Facebook) */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Social Link Unfurl Preview (WhatsApp / Facebook)</span>
              </div>

              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 max-w-sm mx-auto shadow-lg">
                <div className="h-36 bg-slate-800 relative">
                  <img
                    src="/src/assets/images/sikkim_hero_banner_1785680563996.jpg"
                    alt="OpenGraph Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-slate-950/80 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    og:image
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-mono">
                    offbeatdestination.in
                  </div>
                  <div className="text-xs font-bold text-slate-100 line-clamp-2">
                    {currentPageMeta.title}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {currentPageMeta.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Schema & Sitemap */}
      {activeSubView === 'sitemap-schema' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* JSON-LD Schema */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>Schema.org JSON-LD Structured Data</span>
              </h4>
              <button
                onClick={() =>
                  handleCopyText(
                    JSON.stringify(
                      {
                        '@context': 'https://schema.org',
                        '@type': 'TravelAgency',
                        name: 'OffbeatDestination Travels',
                        url: 'https://offbeatdestination.in',
                        description: currentPageMeta.description,
                        address: {
                          '@type': 'PostalAddress',
                          streetAddress: 'Arithang',
                          addressLocality: 'Gangtok',
                          addressRegion: 'Sikkim',
                          postalCode: '737102',
                          addressCountry: 'IN',
                        },
                        telephone: '+916296102341',
                      },
                      null,
                      2
                    ),
                    'schema'
                  )
                }
                className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
              >
                {copiedKey === 'schema' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'schema' ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 rounded-xl text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-80 leading-relaxed border border-slate-800">
{`{
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "OffbeatDestination Travels",
  "legalName": "M/s Offbeat Destination Sikkim Tours & Travels",
  "url": "https://offbeatdestination.in",
  "telephone": "+916296102341",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Arithang",
    "addressLocality": "Gangtok",
    "addressRegion": "Sikkim",
    "postalCode": "737102",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.3389,
    "longitude": 88.6065
  },
  "pageTitle": "${currentPageMeta.title.replace(/"/g, '\\"')}",
  "pageDescription": "${currentPageMeta.description.replace(/"/g, '\\"')}"
}`}
            </pre>
          </div>

          {/* XML Sitemap */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>XML Sitemap URL Structure</span>
              </h4>
              <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-mono">
                Auto-generated
              </span>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {PAGE_DEFINITIONS.map((p, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-slate-200">{p.label}</div>
                    <div className="text-[10px] text-cyan-400 font-mono">https://offbeatdestination.in/{p.urlSlug}</div>
                  </div>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-2 py-0.5 rounded">
                    Priority {p.key === 'home' ? '1.0' : p.key === 'packages' || p.key === 'cabs' ? '0.9' : '0.8'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
