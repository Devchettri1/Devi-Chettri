import React from 'react';
import { BedDouble, Star, Utensils, Check, ShieldCheck } from 'lucide-react';
import { HOTEL_CATEGORIES } from './pricingEngine';
import { HotelCategoryOption } from './BookingTypes';

interface HotelSelectorProps {
  selectedCategoryId: string;
  onSelectCategory: (category: HotelCategoryOption) => void;
  selectedMealPlan: 'EP' | 'CP' | 'MAP' | 'AP';
  onSelectMealPlan: (plan: 'EP' | 'CP' | 'MAP' | 'AP') => void;
}

export const HotelSelector: React.FC<HotelSelectorProps> = ({
  selectedCategoryId,
  onSelectCategory,
  selectedMealPlan,
  onSelectMealPlan,
}) => {
  const mealPlans = [
    { code: 'EP' as const, label: 'EP Plan', desc: 'Room Only (No Meals)' },
    { code: 'CP' as const, label: 'CP Plan', desc: 'Room + Daily Breakfast' },
    { code: 'MAP' as const, label: 'MAP Plan', desc: 'Breakfast + Gourmet Dinner (Recommended)' },
    { code: 'AP' as const, label: 'AP Plan', desc: 'All Meals (Breakfast + Lunch + Dinner)' },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Hotel & Resort Category</span>
          </h4>
          <p className="text-[11px] text-slate-400">All stays are pre-screened for cleanliness, hot water, view & hospitality.</p>
        </div>
        <span className="text-[10px] text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/60">
          6 Curated Tiers
        </span>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {HOTEL_CATEGORIES.map((h) => {
          const isSelected = selectedCategoryId === h.id;
          return (
            <div
              key={h.id}
              onClick={() => onSelectCategory(h)}
              className={`cursor-pointer rounded-2xl border p-3.5 flex flex-col justify-between transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/70 via-[#0A1128] to-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/40'
                  : 'bg-[#060B18] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-amber-300">
                    {h.starBadge}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </div>
                </div>

                <h5 className="font-bold text-xs text-slate-100 mb-1 leading-snug">{h.title}</h5>

                <p className="text-[11px] text-slate-400 mb-2.5 leading-tight">{h.description}</p>

                <div className="space-y-1 mb-3">
                  {h.amenities.slice(0, 3).map((amenity, idx) => (
                    <div key={idx} className="text-[10px] text-slate-300 flex items-center gap-1.5 leading-tight">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs mt-auto">
                <div>
                  <span className="font-bold text-amber-300">₹{h.pricePerNightPerRoom.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-500"> / room / night</span>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Meal Plan Preference Radio Buttons */}
      <div className="p-3 bg-[#060B18] rounded-2xl border border-slate-800 space-y-2">
        <label className="block text-slate-200 font-bold text-xs flex items-center gap-1.5">
          <Utensils className="w-3.5 h-3.5 text-amber-400" />
          <span>Meal Plan Options</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {mealPlans.map((plan) => (
            <button
              key={plan.code}
              type="button"
              onClick={() => onSelectMealPlan(plan.code)}
              className={`p-2 rounded-xl border text-left transition-all ${
                selectedMealPlan === plan.code
                  ? 'bg-cyan-950/80 border-cyan-400 text-slate-100 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-xs text-cyan-300">{plan.label}</div>
              <div className="text-[9px] text-slate-400 leading-tight mt-0.5">{plan.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
