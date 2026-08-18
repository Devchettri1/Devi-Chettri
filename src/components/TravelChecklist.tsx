import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  Share2, 
  ShieldAlert, 
  Sparkles, 
  FileText, 
  Shirt, 
  Stethoscope, 
  Wallet, 
  Plane, 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  Search, 
  Calendar, 
  User, 
  Mountain, 
  ThermometerSnowflake, 
  CheckCheck, 
  ExternalLink,
  Info,
  Layers,
  Clock
} from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';
import { generateChecklistPDF, ChecklistExportItem } from '../utils/pdfGenerator';
import { useWhatsApp } from '../utils/whatsAppContext';

export interface ChecklistItemData {
  id: string;
  category: 'Documents & Army Permits' | 'High-Altitude Cold Gear' | 'Health, Altitude & Medicine' | 'Cash, Tech & Connectivity' | 'Bhutan Border Crossing';
  title: string;
  description: string;
  destinationTag: 'Sikkim' | 'North Sikkim' | 'Bhutan' | 'General';
  essential: boolean;
  baseQty: string;
  durationMultiplier?: {
    short: string;
    standard: string;
    extended: string;
    long: string;
  };
}

const CHECKLIST_ITEMS: ChecklistItemData[] = [
  // Documents & Permits
  {
    id: 'chk-doc-1',
    category: 'Documents & Army Permits',
    title: 'Original Photo ID Proofs (Passport or Voter ID Card)',
    description: 'Crucial for military checkposts (Nathula Pass, Tsomgo Lake, Zero Point). Aadhaar is NOT accepted by Indian Army for Restricted Area Permits.',
    destinationTag: 'Sikkim',
    essential: true,
    baseQty: 'Original Physical Card'
  },
  {
    id: 'chk-doc-2',
    category: 'Documents & Army Permits',
    title: 'Physical Xerox Photocopies of ID Cards',
    description: 'Keep multiple hardcopies of each traveler’s ID ready for police and army checkposts along Gangtok-Lachung corridor.',
    destinationTag: 'Sikkim',
    essential: true,
    baseQty: '6 Hardcopies per person',
    durationMultiplier: {
      short: '4 Copies / Person',
      standard: '6 Copies / Person',
      extended: '8 Copies / Person',
      long: '10 Copies / Person'
    }
  },
  {
    id: 'chk-doc-3',
    category: 'Documents & Army Permits',
    title: 'Passport Size Photographs (Recent, White Background)',
    description: 'Required for issuance of Nathula Pass, Lachung, Lachen, and Gurudongmar Lake military permits at Gangtok Police desk.',
    destinationTag: 'Sikkim',
    essential: true,
    baseQty: '6 Passport Photos',
    durationMultiplier: {
      short: '4 Photos / Person',
      standard: '6 Photos / Person',
      extended: '8 Photos / Person',
      long: '10 Photos / Person'
    }
  },
  {
    id: 'chk-doc-4',
    category: 'Documents & Army Permits',
    title: 'Dietary Preference Intimation (Pure Veg / Jain / Non-Veg)',
    description: 'Inform our Gangtok desk in advance so high-altitude hotels in Lachung prepare dedicated Jain cookware or pure veg meals.',
    destinationTag: 'General',
    essential: true,
    baseQty: 'Pre-Trip Verification'
  },

  // High-Altitude Cold Gear
  {
    id: 'chk-gear-1',
    category: 'High-Altitude Cold Gear',
    title: 'Thermal Innerwear Set (Merino Wool / Heattech Top & Bottom)',
    description: 'Essential for Zero Point (15,300 ft) and Gurudongmar Lake (17,800 ft) where temperatures routinely fall sub-zero.',
    destinationTag: 'North Sikkim',
    essential: true,
    baseQty: '2 Sets',
    durationMultiplier: {
      short: '1-2 Sets',
      standard: '2-3 Sets',
      extended: '3-4 Sets',
      long: '4-5 Sets'
    }
  },
  {
    id: 'chk-gear-2',
    category: 'High-Altitude Cold Gear',
    title: 'Heavy Windproof & Waterproof Down Jacket / Parka',
    description: 'High velocity freezing mountain winds sweep across Yumthang Valley and Nathula Pass.',
    destinationTag: 'North Sikkim',
    essential: true,
    baseQty: '1 Heavy Jacket'
  },
  {
    id: 'chk-gear-3',
    category: 'High-Altitude Cold Gear',
    title: 'Polarized UV Protection Sunglasses (Cat 3 or 4)',
    description: 'Crucial to prevent severe snow glare and snow blindness at Zero Point and high-altitude frozen lakes.',
    destinationTag: 'North Sikkim',
    essential: true,
    baseQty: '1 Pair'
  },
  {
    id: 'chk-gear-4',
    category: 'High-Altitude Cold Gear',
    title: 'Waterproof Thermal Gloves & Woolen Skull Cap / Beanie',
    description: 'Protects ears and extremities; overcoats/snow boots are also available for on-spot rental at Yumthang stalls for ~₹150.',
    destinationTag: 'North Sikkim',
    essential: false,
    baseQty: '2 Pairs Gloves & 2 Beanies'
  },
  {
    id: 'chk-gear-5',
    category: 'High-Altitude Cold Gear',
    title: 'Thick Woolen / Merino Trekking Socks',
    description: 'Keeps feet warm and dry when walking on snow patches at Zero Point or Nathula steps.',
    destinationTag: 'North Sikkim',
    essential: true,
    baseQty: '3 Pairs',
    durationMultiplier: {
      short: '3 Pairs',
      standard: '5 Pairs',
      extended: '7 Pairs',
      long: '9 Pairs'
    }
  },
  {
    id: 'chk-gear-6',
    category: 'High-Altitude Cold Gear',
    title: 'Comfortable Waterproof Shoes with Good Grip',
    description: 'Avoid flat sandals or heels; hilly terrains and temple steps in Gangtok/Pelling require sturdy walking footwear.',
    destinationTag: 'General',
    essential: true,
    baseQty: '1 Primary + 1 Backup'
  },

  // Health, Altitude & Medicine
  {
    id: 'chk-health-1',
    category: 'Health, Altitude & Medicine',
    title: 'Altitude Sickness Medicine (Diamox / Consult Doctor)',
    description: 'Recommended when ascending to 15,000+ ft. Consult your family doctor prior to departure. Start 24h prior to Lachung ascent.',
    destinationTag: 'North Sikkim',
    essential: true,
    baseQty: 'As per Prescription'
  },
  {
    id: 'chk-health-2',
    category: 'Health, Altitude & Medicine',
    title: 'Motion Sickness Tablets (Avomine / Ondansetron)',
    description: 'Essential for mountain hairpin bends on the 4.5h NJP-Gangtok Highway and the scenic North Sikkim circuit.',
    destinationTag: 'General',
    essential: true,
    baseQty: '1 Strip (10 Tabs)'
  },
  {
    id: 'chk-health-3',
    category: 'Health, Altitude & Medicine',
    title: 'Camphor Sachets / Portable Oxygen Canister',
    description: 'Inhaling natural camphor crystals significantly eases altitude breathlessness at high passes.',
    destinationTag: 'North Sikkim',
    essential: false,
    baseQty: '2 Sachets / 1 Can'
  },
  {
    id: 'chk-health-4',
    category: 'Health, Altitude & Medicine',
    title: 'Basic First Aid Kit, Cold Meds & Pain Relievers',
    description: 'Paracetamol, Band-Aids, ORS hydration sachets, antiseptic cream, and personal prescription meds in original packing.',
    destinationTag: 'General',
    essential: true,
    baseQty: 'Travel Kit'
  },
  {
    id: 'chk-health-5',
    category: 'Health, Altitude & Medicine',
    title: 'Lip Balm (SPF 30+) & Heavy Moisturizing Cream',
    description: 'Cold dry Himalayan air causes quick chapping of lips and dry skin at high altitudes.',
    destinationTag: 'General',
    essential: false,
    baseQty: '1 Each'
  },

  // Cash, Tech & Connectivity
  {
    id: 'chk-cash-1',
    category: 'Cash, Tech & Connectivity',
    title: 'Physical Cash in INR (₹5,000 to ₹15,000)',
    description: 'No working ATMs in Lachung, Lachen, or Silk Route. UPI/Google Pay fails in remote valleys due to zero data signal.',
    destinationTag: 'North Sikkim',
    essential: true,
    baseQty: '₹5,000 - ₹15,000 Cash'
  },
  {
    id: 'chk-cash-2',
    category: 'Cash, Tech & Connectivity',
    title: 'High Capacity Power Bank (20,000 mAh)',
    description: 'Sub-zero temperatures drain phone and camera batteries 3x faster during full-day sightseeing.',
    destinationTag: 'General',
    essential: true,
    baseQty: '1x 20,000 mAh'
  },
  {
    id: 'chk-cash-3',
    category: 'Cash, Tech & Connectivity',
    title: 'Airtel or BSNL Secondary SIM Card',
    description: 'Jio network drops past Mangan in North Sikkim; Airtel and BSNL provide superior coverage in high altitude villages.',
    destinationTag: 'Sikkim',
    essential: false,
    baseQty: '1 Active SIM'
  },
  {
    id: 'chk-cash-4',
    category: 'Cash, Tech & Connectivity',
    title: 'Thermos Flask (Insulated Hot Water Bottle)',
    description: 'Drinking warm water continuously prevents Acute Mountain Sickness (AMS) and keeps you energized on long mountain drives.',
    destinationTag: 'General',
    essential: false,
    baseQty: '1 Flask / Person'
  },

  // Bhutan Border Crossing
  {
    id: 'chk-bhutan-1',
    category: 'Bhutan Border Crossing',
    title: 'Original Passport (Min. 6 Months Validity) or Voter ID',
    description: 'Mandatory for immigration clearance at Phuntsholing border gate or Paro International Airport.',
    destinationTag: 'Bhutan',
    essential: true,
    baseQty: 'Original Document'
  },
  {
    id: 'chk-bhutan-2',
    category: 'Bhutan Border Crossing',
    title: 'SDF (Sustainable Development Fee) Official Voucher',
    description: 'Processed by OffbeatDestination Travels prior to arrival; keep the printed voucher receipt handy for entry stamp.',
    destinationTag: 'Bhutan',
    essential: true,
    baseQty: 'Printed Voucher'
  },
  {
    id: 'chk-bhutan-3',
    category: 'Bhutan Border Crossing',
    title: 'Modest Full-Sleeve Formal Attire for Dzongs',
    description: 'Collared full shirts and full trousers required when visiting Tashichho Dzong, Punakha Dzong, and Tiger’s Nest.',
    destinationTag: 'Bhutan',
    essential: true,
    baseQty: '2 Modest Sets'
  }
];

export const TravelChecklist: React.FC = () => {
  const { setPageContext } = useWhatsApp();

  // Trip Customization State
  const [travelerName, setTravelerName] = useState<string>(() => {
    try {
      return localStorage.getItem('offbeat_chk_traveler_name') || '';
    } catch {
      return '';
    }
  });

  const [tripDuration, setTripDuration] = useState<'short' | 'standard' | 'extended' | 'long'>(() => {
    try {
      return (localStorage.getItem('offbeat_chk_duration') as any) || 'standard';
    } catch {
      return 'standard';
    }
  });

  const [travelSeason, setTravelSeason] = useState<string>('Autumn & Spring (Oct - Apr)');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [filterMode, setFilterMode] = useState<'all' | 'unpacked' | 'packed' | 'mandatory'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Checked state stored in local storage
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('offbeat_travel_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom User Items
  const [customItems, setCustomItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('offbeat_custom_packing_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newCustomItemText, setNewCustomItemText] = useState<string>('');
  const [isAddingCustom, setIsAddingCustom] = useState<boolean>(false);

  // PDF Generation State & Download Link
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<{ url: string; fileName: string } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('offbeat_travel_checklist', JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('offbeat_custom_packing_items', JSON.stringify(customItems));
    } catch (e) {
      console.error(e);
    }
  }, [customItems]);

  useEffect(() => {
    try {
      localStorage.setItem('offbeat_chk_traveler_name', travelerName);
      localStorage.setItem('offbeat_chk_duration', tripDuration);
    } catch (e) {
      console.error(e);
    }
  }, [travelerName, tripDuration]);

  // Duration label map
  const durationLabels: Record<string, { title: string; subtitle: string; days: string }> = {
    short: { title: '3N / 4D', subtitle: 'Quick Sikkim Escape', days: '3 Nights / 4 Days' },
    standard: { title: '5N / 6D', subtitle: 'Grand Circuit & North Sikkim', days: '5 Nights / 6 Days' },
    extended: { title: '7N / 8D', subtitle: 'Silk Route & High Passes', days: '7 Nights / 8 Days' },
    long: { title: '10N+', subtitle: 'Complete Himalayan Odyssey', days: '10+ Days (Sikkim & Bhutan)' },
  };

  // Toggle item
  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Bulk actions
  const handleCheckAll = () => {
    const allChecked: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach((i) => {
      allChecked[i.id] = true;
    });
    setCheckedIds(allChecked);
  };

  const handleCheckMandatoryOnly = () => {
    const mandatoryMap: Record<string, boolean> = { ...checkedIds };
    CHECKLIST_ITEMS.filter((i) => i.essential).forEach((i) => {
      mandatoryMap[i.id] = true;
    });
    setCheckedIds(mandatoryMap);
  };

  const handleResetChecklist = () => {
    if (window.confirm('Reset all checked items on your preparation checklist?')) {
      setCheckedIds({});
      setDownloadLink(null);
    }
  };

  // Add custom item
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomItemText.trim()) {
      setCustomItems((prev) => [...prev, newCustomItemText.trim()]);
      setNewCustomItemText('');
      setIsAddingCustom(false);
    }
  };

  const handleRemoveCustomItem = (index: number) => {
    setCustomItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Get recommended quantity for an item based on duration
  const getQtyForItem = (item: ChecklistItemData) => {
    if (item.durationMultiplier && item.durationMultiplier[tripDuration]) {
      return item.durationMultiplier[tripDuration];
    }
    return item.baseQty;
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return CHECKLIST_ITEMS.filter((item) => {
      // Destination Tag filter
      if (selectedTag === 'Sikkim' && item.destinationTag !== 'Sikkim' && item.destinationTag !== 'General') return false;
      if (selectedTag === 'North Sikkim' && item.destinationTag !== 'North Sikkim' && item.destinationTag !== 'General') return false;
      if (selectedTag === 'Bhutan' && item.destinationTag !== 'Bhutan') return false;

      // Status filter
      const isChecked = Boolean(checkedIds[item.id]);
      if (filterMode === 'packed' && !isChecked) return false;
      if (filterMode === 'unpacked' && isChecked) return false;
      if (filterMode === 'mandatory' && !item.essential) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [selectedTag, filterMode, searchQuery, checkedIds]);

  const totalPossible = CHECKLIST_ITEMS.length;
  const completedCount = CHECKLIST_ITEMS.filter((item) => checkedIds[item.id]).length;
  const percentComplete = totalPossible > 0 ? Math.round((completedCount / totalPossible) * 100) : 0;
  const mandatoryCount = CHECKLIST_ITEMS.filter((item) => item.essential).length;
  const completedMandatory = CHECKLIST_ITEMS.filter((item) => item.essential && checkedIds[item.id]).length;

  const categories = Array.from(new Set(filteredItems.map((i) => i.category)));

  // Synchronize context to WhatsApp
  useEffect(() => {
    setPageContext({
      type: 'calculator',
      title: `Himalayan Packing Checklist (${durationLabels[tripDuration].days})`,
      subtitle: `${completedCount}/${totalPossible} Packed (${percentComplete}% Ready) - ${selectedTag} Circuit`,
      location: selectedTag === 'All' ? 'Sikkim & Darjeeling' : selectedTag,
      duration: durationLabels[tripDuration].days,
    });
  }, [tripDuration, completedCount, totalPossible, percentComplete, selectedTag, setPageContext]);

  // Generate Personalized PDF
  const handleGeneratePDF = () => {
    setIsGeneratingPDF(true);
    try {
      const exportItems: ChecklistExportItem[] = CHECKLIST_ITEMS.map((item) => ({
        id: item.id,
        category: item.category,
        title: item.title,
        description: item.description,
        essential: item.essential,
        isChecked: Boolean(checkedIds[item.id]),
        recommendedQty: getQtyForItem(item),
      }));

      const result = generateChecklistPDF({
        travelerName: travelerName || 'Valued Himalayan Traveler',
        tripDuration: durationLabels[tripDuration].days,
        travelSeason: travelSeason,
        destinationTag: selectedTag,
        travelerType: 'Curated Mountain Holiday',
        items: exportItems,
        customItems: customItems,
      });

      setDownloadLink({
        url: result.blobUrl,
        fileName: result.fileName,
      });
    } catch (err) {
      console.error('Failed to generate checklist PDF:', err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // WhatsApp Share
  const handleShareWhatsApp = () => {
    const nameStr = travelerName ? `*Traveler:* ${travelerName}%0A` : '';
    const text = `Namaste OffbeatDestination Travels! 🙏%0A%0A*Himalayan Travel Checklist Report*%0A${nameStr}⏱️ *Duration:* ${encodeURIComponent(durationLabels[tripDuration].days)}%0A🏔️ *Circuit:* ${encodeURIComponent(selectedTag)}%0A📊 *Readiness:* ${completedCount}/${totalPossible} items (${percentComplete}% Packed)%0A🚨 *Mandatory Documents:* ${completedMandatory}/${mandatoryCount} Ready%0A%0APlease assist me with army permit pre-verification and driver contact!`;
    window.open(`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${text}`, '_blank');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Documents & Army Permits':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'High-Altitude Cold Gear':
        return <Shirt className="w-4 h-4 text-cyan-400" />;
      case 'Health, Altitude & Medicine':
        return <Stethoscope className="w-4 h-4 text-rose-400" />;
      case 'Cash, Tech & Connectivity':
        return <Wallet className="w-4 h-4 text-amber-400" />;
      case 'Bhutan Border Crossing':
        return <Plane className="w-4 h-4 text-indigo-400" />;
      default:
        return <FileText className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="travel-checklist" className="py-16 bg-[#060B18] text-slate-100 space-y-8 border-t border-slate-800 relative">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        
        {/* Master Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Himalayan Packing & Permit Assistant</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Personalized Travel Checklist & PDF
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select your trip duration, toggle required items, and download a customized PDF checklist ready for Nathula Pass, Zero Point, and Sikkim Army checkposts.
          </p>
        </div>

        {/* Dynamic Trip Customization Bar */}
        <div className="bg-[#0A1128]/95 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Traveler Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Your Name / Group Name (For PDF)</span>
              </label>
              <input
                type="text"
                value={travelerName}
                onChange={(e) => setTravelerName(e.target.value)}
                placeholder="e.g. Rahul Sharma & Family"
                className="w-full bg-[#060B18] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* 2. Travel Season */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <ThermometerSnowflake className="w-3.5 h-3.5 text-amber-400" />
                <span>Travel Season & Climate</span>
              </label>
              <select
                value={travelSeason}
                onChange={(e) => setTravelSeason(e.target.value)}
                className="w-full bg-[#060B18] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="Autumn & Spring (Oct - Apr)">🍂 Autumn & Spring (Crisp, Clear Views & Mild Cold)</option>
                <option value="Winter & Snow Season (Dec - Feb)">❄️ Winter Snow Season (Sub-Zero Gurudongmar & Snowfalls)</option>
                <option value="Monsoon & Summer (May - Sep)">🌿 Monsoon & Summer (Blooming Orchids & Rhododendrons)</option>
              </select>
            </div>

            {/* 3. Target Region */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" />
                <span>Destination Circuit</span>
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full bg-[#060B18] border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="All">🏔️ Complete (Sikkim + North Sikkim + Darjeeling)</option>
                <option value="Sikkim">🌲 Gangtok, Pelling & Darjeeling (Standard Altitudes)</option>
                <option value="North Sikkim">❄️ North Sikkim (Lachung, Lachen & 15,300 ft Zero Point)</option>
                <option value="Bhutan">🇧🇹 Bhutan Border Crossing (Phuntsholing & Paro)</option>
              </select>
            </div>
          </div>

          {/* Trip Duration Selector Pills */}
          <div className="space-y-2 border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Trip Duration (Auto-scales Packing Quantities):</span>
              </span>
              <span className="text-[11px] text-cyan-400 font-semibold hidden sm:inline">
                Currently: {durationLabels[tripDuration].days}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(durationLabels) as Array<'short' | 'standard' | 'extended' | 'long'>).map((key) => {
                const isSelected = tripDuration === key;
                const info = durationLabels[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTripDuration(key)}
                    className={`p-3 rounded-2xl border text-left transition-all relative select-none ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-950 to-[#0A1128] border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-[#060B18]/70 hover:bg-[#060B18] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                        {info.title}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </div>
                    <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                      {info.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Master Progress Readiness Bar */}
          <div className="bg-[#060B18] p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold">
              <div className="flex items-center gap-3">
                <span className="text-slate-200 flex items-center gap-1.5">
                  <CheckCheck className="w-4 h-4 text-emerald-400" />
                  <span>Packing Readiness:</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-mono">
                  {completedCount} of {totalPossible} Packed ({percentComplete}%)
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-rose-400">
                  🚨 Mandatory Docs: <strong className="text-white">{completedMandatory}/{mandatoryCount}</strong>
                </span>
              </div>
            </div>

            <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>

          {/* Quick Actions & PDF Generation Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
            
            {/* Left Filter & Search */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items (e.g. Diamox, Gloves, Cash)..."
                  className="bg-[#060B18] border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-48 sm:w-60"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center bg-[#060B18] p-0.5 rounded-xl border border-slate-800 text-[11px] font-semibold">
                {(['all', 'unpacked', 'packed', 'mandatory'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setFilterMode(mode)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                      filterMode === mode
                        ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode === 'all' ? 'All' : mode === 'unpacked' ? 'Pending' : mode === 'packed' ? 'Packed' : 'Mandatory'}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Action Buttons: PDF Download, Check Mandatory, Reset */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCheckMandatoryOnly}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-rose-300 hover:text-rose-200 text-xs font-bold rounded-xl border border-rose-900/50 flex items-center gap-1.5 transition-colors"
                title="Mark all mandatory government and permit documents as ready"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Mark Mandatory</span>
              </button>

              <button
                type="button"
                onClick={handleCheckAll}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Check All</span>
              </button>

              <button
                type="button"
                onClick={handleResetChecklist}
                className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition-colors"
                title="Reset Checklist"
                aria-label="Reset checklist"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Primary PDF Download Action */}
              <button
                type="button"
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download Packing PDF'}</span>
              </button>
            </div>
          </div>

          {/* Download Ready Banner if Generated */}
          {downloadLink && (
            <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  <strong>Personalized PDF Ready:</strong> <span className="font-mono text-[11px] text-emerald-300">{downloadLink.fileName}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={downloadLink.url}
                  download={downloadLink.fileName}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Download className="w-3 h-3" />
                  <span>Download Again</span>
                </a>
                
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Send to WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Categorized Checklist Grid */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const items = filteredItems.filter((i) => i.category === cat);
            if (items.length === 0) return null;

            const catPacked = items.filter((i) => checkedIds[i.id]).length;

            return (
              <div
                key={cat}
                className="bg-[#0A1128]/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#060B18] rounded-xl border border-slate-800">
                      {getCategoryIcon(cat)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white">{cat}</h3>
                      <p className="text-[11px] text-slate-400">
                        Recommended for {durationLabels[tripDuration].days}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs bg-[#060B18] text-cyan-300 px-3 py-1 rounded-full border border-slate-800 font-mono font-bold">
                    {catPacked}/{items.length} Packed
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((item) => {
                    const isChecked = Boolean(checkedIds[item.id]);
                    const recommendedQty = getQtyForItem(item);

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 select-none relative group ${
                          isChecked
                            ? 'bg-emerald-950/20 border-emerald-800/60 text-slate-300'
                            : 'bg-[#060B18]/90 hover:bg-[#060B18] border-slate-800/80 text-slate-100 hover:border-slate-700'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-cyan-400 flex-shrink-0 focus:outline-none"
                          aria-label={isChecked ? `Uncheck ${item.title}` : `Check ${item.title}`}
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-slate-950 transition-transform transform scale-110" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                          )}
                        </button>

                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`font-bold text-xs leading-snug ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                              {item.title}
                            </span>
                            
                            {item.essential && (
                              <span className="text-[9px] bg-rose-950 text-rose-300 font-bold px-1.5 py-0.5 rounded border border-rose-900 flex-shrink-0">
                                Mandatory
                              </span>
                            )}

                            {recommendedQty && (
                              <span className="text-[9px] bg-cyan-950 text-cyan-300 font-semibold px-2 py-0.5 rounded-full border border-cyan-800/60 flex-shrink-0">
                                {recommendedQty}
                              </span>
                            )}
                          </div>

                          <p className={`text-[11px] leading-relaxed ${isChecked ? 'text-slate-500' : 'text-slate-400'}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* User Custom Items Section */}
          <div className="bg-[#0A1128]/80 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#060B18] rounded-xl border border-slate-800 text-amber-400">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">Custom Personal Items & Meds</h3>
                  <p className="text-[11px] text-slate-400">Add personal prescription medicines, baby supplies, or camera equipment</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingCustom((prev) => !prev)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {/* Add Custom Item Form */}
            {isAddingCustom && (
              <form onSubmit={handleAddCustomItem} className="flex gap-2 animate-in fade-in duration-200">
                <input
                  type="text"
                  value={newCustomItemText}
                  onChange={(e) => setNewCustomItemText(e.target.value)}
                  placeholder="e.g. Asthma inhaler, Sony 70-200mm lens, baby warm formula..."
                  className="flex-1 bg-[#060B18] border border-cyan-500/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Add to PDF
                </button>
              </form>
            )}

            {/* Custom items list */}
            {customItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {customItems.map((cItem, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#060B18] rounded-xl border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{cItem}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomItem(index)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No custom items added yet. Click &quot;Add Item&quot; to include personal medications or gear.</p>
            )}
          </div>
        </div>

        {/* Free Document Pre-Verification Callout */}
        <div className="p-6 bg-gradient-to-r from-[#0A1128] via-[#0D1B3E] to-[#0A1128] rounded-3xl border border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-600/50 text-cyan-300 flex-shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-base text-white flex items-center gap-2">
                <span>Free Pre-Flight Document Check on WhatsApp</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Govt. Desk
                </span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Avoid last-minute permit rejections at Gangtok! WhatsApp photo copies of your Voter ID or Passport to our Gangtok desk 48 hours before departure. Our licensed team clears your Nathula and North Sikkim permits in advance.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleGeneratePDF}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white font-bold rounded-xl text-xs border border-cyan-500/30 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Get Checklist PDF</span>
            </button>

            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20would%20like%20to%20send%20my%20documents%20for%20pre-verification%20for%20Nathula%20Pass%20permits.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20ba59] hover:to-[#17a34e] text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all flex-shrink-0"
            >
              <span>Verify Documents on WhatsApp →</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
