import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, RotateCcw, Share2, ShieldAlert, Sparkles, FileText, Shirt, Stethoscope, Wallet, Plane, Printer } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface ChecklistItem {
  id: string;
  category: 'Documents & Permits' | 'North Sikkim Cold Gear' | 'Health & Altitude' | 'Cash & Electronics' | 'Bhutan Border Crossing';
  title: string;
  description: string;
  destinationTag: 'Sikkim' | 'North Sikkim' | 'Bhutan' | 'General';
  essential: boolean;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Documents & Permits
  {
    id: 'chk-doc-1',
    category: 'Documents & Permits',
    title: 'Original Photo ID Proofs (Passport or Voter ID)',
    description: 'Required for army RAP/PAP permits (Nathula Pass, Tsomgo Lake, Zero Point). Aadhaar is NOT accepted by Army.',
    destinationTag: 'Sikkim',
    essential: true
  },
  {
    id: 'chk-doc-2',
    category: 'Documents & Permits',
    title: 'Physical Xerox Copies (6 Copies per Person)',
    description: 'Keep 6 physical hardcopies of your ID and passport photos ready for checkposts.',
    destinationTag: 'Sikkim',
    essential: true
  },
  {
    id: 'chk-doc-3',
    category: 'Documents & Permits',
    title: 'Passport Size Photographs (6 Copies)',
    description: 'Recent photographs on white background required for Nathula, Lachung, & Lachen permits.',
    destinationTag: 'Sikkim',
    essential: true
  },
  {
    id: 'chk-doc-4',
    category: 'Documents & Permits',
    title: 'Specify Dietary Preference (Non-Veg, Pure Veg, Strict Jain, or Halal)',
    description: 'Inform our Gangtok desk in advance so hotels assign dedicated Jain cooks, Halal butchers, or fresh local non-veg chicken/trout fish menus.',
    destinationTag: 'General',
    essential: true
  },

  // North Sikkim Cold Gear
  {
    id: 'chk-gear-1',
    category: 'North Sikkim Cold Gear',
    title: 'Thermal Innerwear Set (Top & Bottom)',
    description: 'Essential for Zero Point (15,300 ft) and Gurudongmar Lake where temperatures drop below sub-zero.',
    destinationTag: 'North Sikkim',
    essential: true
  },
  {
    id: 'chk-gear-2',
    category: 'North Sikkim Cold Gear',
    title: 'Heavy Windproof & Waterproof Down Jacket',
    description: 'Heavy mountain winds blow across high altitude passes in Yumthang and Nathula.',
    destinationTag: 'North Sikkim',
    essential: true
  },
  {
    id: 'chk-gear-3',
    category: 'North Sikkim Cold Gear',
    title: 'Polarized UV Protection Sunglasses',
    description: 'Protects eyes from severe snow glare and snow blindness at Zero Point and Tsomgo Lake.',
    destinationTag: 'North Sikkim',
    essential: true
  },
  {
    id: 'chk-gear-4',
    category: 'North Sikkim Cold Gear',
    title: 'Waterproof Thermal Gloves & Woollen Skull Cap',
    description: 'Keep ears and hands warm; rental overcoats/snow boots are also available at Yumthang stalls for ₹150.',
    destinationTag: 'North Sikkim',
    essential: false
  },

  // Health & Altitude
  {
    id: 'chk-health-1',
    category: 'Health & Altitude',
    title: 'Altitude Sickness Medicine (Diamox / Consult Doctor)',
    description: 'Recommended for travelers ascending quickly to 15,000+ ft. Consult physician prior to travel.',
    destinationTag: 'General',
    essential: true
  },
  {
    id: 'chk-health-2',
    category: 'Health & Altitude',
    title: 'Motion Sickness / Avomine Tablets',
    description: 'Crucial for winding hair-pin mountain bends on NJP to Gangtok and Lachung routes.',
    destinationTag: 'General',
    essential: true
  },
  {
    id: 'chk-health-3',
    category: 'Health & Altitude',
    title: 'Camphor Sachets / Portable Oxygen Can',
    description: 'Inhaling camphor helps soothe high altitude breathlessness at Nathula & Gurudongmar.',
    destinationTag: 'North Sikkim',
    essential: false
  },

  // Cash & Electronics
  {
    id: 'chk-cash-1',
    category: 'Cash & Electronics',
    title: 'Sufficient Physical Cash in INR',
    description: 'ATMs in Lachung/Lachen are often out of service or non-existent beyond Gangtok.',
    destinationTag: 'North Sikkim',
    essential: true
  },
  {
    id: 'chk-cash-2',
    category: 'Cash & Electronics',
    title: '20,000 mAh Heavy Duty Power Bank',
    description: 'Freezing mountain temperatures drain mobile battery fast during sightseeing.',
    destinationTag: 'General',
    essential: false
  },
  {
    id: 'chk-cash-3',
    category: 'Cash & Electronics',
    title: 'Airtel or BSNL Mobile SIM Card',
    description: 'Jio network drops in North Sikkim; Airtel & BSNL provide best connectivity in remote hills.',
    destinationTag: 'Sikkim',
    essential: false
  },

  // Bhutan Border Crossing
  {
    id: 'chk-bhutan-1',
    category: 'Bhutan Border Crossing',
    title: 'Passport with Minimum 6 Months Validity',
    description: 'Or original Voter ID card for Indian citizens crossing Phuntsholing / Paro immigration.',
    destinationTag: 'Bhutan',
    essential: true
  },
  {
    id: 'chk-bhutan-2',
    category: 'Bhutan Border Crossing',
    title: 'SDF (Sustainable Development Fee) Voucher Receipt',
    description: 'OffbeatDestination processes your official SDF payment & guide voucher prior to border arrival.',
    destinationTag: 'Bhutan',
    essential: true
  },
  {
    id: 'chk-bhutan-3',
    category: 'Bhutan Border Crossing',
    title: 'Modest Formal Attire for Dzongs & Monasteries',
    description: 'Full sleeves shirt and full trousers required when entering Bhutanese Fortress Dzongs & Tiger Nest.',
    destinationTag: 'Bhutan',
    essential: true
  }
];

export const TravelChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('offbeat_travel_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    try {
      localStorage.setItem('offbeat_travel_checklist', JSON.stringify(checkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [checkedIds]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    if (window.confirm('Reset all checked items on your preparation checklist?')) {
      setCheckedIds({});
    }
  };

  const filteredItems = CHECKLIST_ITEMS.filter((item) => {
    if (selectedTag === 'All') return true;
    if (selectedTag === 'Sikkim') return item.destinationTag === 'Sikkim' || item.destinationTag === 'General';
    if (selectedTag === 'North Sikkim') return item.destinationTag === 'North Sikkim' || item.destinationTag === 'General';
    if (selectedTag === 'Bhutan') return item.destinationTag === 'Bhutan';
    return true;
  });

  const totalCount = filteredItems.length;
  const completedCount = filteredItems.filter((item) => checkedIds[item.id]).length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const categories = Array.from(new Set(filteredItems.map((i) => i.category)));

  const handleShareWhatsApp = () => {
    const text = `Namaste! I am checking my Sikkim & Bhutan Travel Preparation Checklist on OffbeatDestination Travels (${completedCount}/${totalCount} items completed - ${percentComplete}% ready). Please assist me with permits!`;
    window.open(`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Documents & Permits':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'North Sikkim Cold Gear':
        return <Shirt className="w-4 h-4 text-teal-400" />;
      case 'Health & Altitude':
        return <Stethoscope className="w-4 h-4 text-rose-400" />;
      case 'Cash & Electronics':
        return <Wallet className="w-4 h-4 text-amber-400" />;
      case 'Bhutan Border Crossing':
        return <Plane className="w-4 h-4 text-blue-400" />;
      default:
        return <FileText className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="travel-checklist" className="py-16 bg-slate-900 text-slate-100 space-y-10 border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-teal-400 bg-teal-950 px-3.5 py-1 rounded-full border border-teal-800 tracking-wider uppercase inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Himalayan Packing & Permit Assistant
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Travel Preparation Checklist
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Interactive packing & document manager to ensure zero hassles for Sikkim permits, Zero Point snow gear, and Bhutan border checks.
          </p>
        </div>

        {/* Filter & Progress Card */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
          {/* Destination Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              {['All', 'Sikkim', 'North Sikkim', 'Bhutan'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-2 rounded-xl transition-all ${
                    selectedTag === tag
                      ? 'bg-teal-600 text-white font-bold shadow-lg'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {tag === 'All' ? '🎒 Complete Checklist' : tag === 'North Sikkim' ? '❄️ North Sikkim (Zero Point)' : tag === 'Sikkim' ? '🏔️ Sikkim & Darjeeling' : '🇧🇹 Bhutan Border'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetChecklist}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors"
                title="Reset checked items"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Send to WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <span>Checklist Readiness:</span>
                <span className="text-teal-400">{completedCount} of {totalCount} Ready</span>
              </span>
              <span className="text-teal-400">{percentComplete}%</span>
            </div>

            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>
        </div>

        {/* Categorized Checklist Items */}
        <div className="space-y-6">
          {categories.map((cat) => {
            const items = filteredItems.filter((i) => i.category === cat);
            if (items.length === 0) return null;

            return (
              <div key={cat} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                    {getCategoryIcon(cat)}
                  </div>
                  <h3 className="font-extrabold text-base text-slate-100">{cat}</h3>
                  <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800 ml-auto font-mono">
                    {items.filter((i) => checkedIds[i.id]).length}/{items.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((item) => {
                    const isChecked = Boolean(checkedIds[item.id]);

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                          isChecked
                            ? 'bg-teal-950/40 border-teal-800/80 text-slate-300'
                            : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 text-slate-100'
                        }`}
                      >
                        <button className="mt-0.5 text-teal-400 flex-shrink-0">
                          {isChecked ? (
                            <CheckCircle2 className="w-5 h-5 fill-teal-500 text-slate-950" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-600" />
                          )}
                        </button>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                              {item.title}
                            </span>
                            {item.essential && (
                              <span className="text-[9px] bg-rose-950 text-rose-300 font-bold px-1.5 py-0.2 rounded border border-rose-900 flex-shrink-0">
                                Mandatory
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
        </div>

        {/* Permit Guarantee Note */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/80 to-slate-950 rounded-2xl border border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-slate-100">Need Help Preparing Documents?</h4>
              <p className="text-xs text-slate-400">Our Gangtok desk checks your IDs over WhatsApp before you board your flight.</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20need%20assistance%20verifying%20my%20documents%20for%20Nathula%20Pass%20permits.`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex-shrink-0 shadow-lg"
          >
            Verify Documents on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};
