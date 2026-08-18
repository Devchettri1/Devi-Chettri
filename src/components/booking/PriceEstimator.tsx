import React, { useState } from 'react';
import { Calculator, Tag, Sparkles, ShieldCheck, ChevronDown, ChevronUp, Check, Info } from 'lucide-react';
import { PriceBreakdown } from './BookingTypes';

interface PriceEstimatorProps {
  priceBreakdown: PriceBreakdown;
  adultsCount: number;
  couponCode?: string;
  onApplyCoupon: (code: string) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({
  priceBreakdown,
  adultsCount,
  couponCode = '',
  onApplyCoupon,
}) => {
  const [showDetails, setShowDetails] = useState(true);
  const [inputCoupon, setInputCoupon] = useState(couponCode);
  const [couponAppliedMsg, setCouponAppliedMsg] = useState(false);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    onApplyCoupon(inputCoupon.trim().toUpperCase());
    setCouponAppliedMsg(true);
    setTimeout(() => setCouponAppliedMsg(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-[#060B18] via-[#0A1128] to-[#060B18] border border-cyan-500/40 rounded-2xl p-4 shadow-xl text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-700/50 text-cyan-400">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">Smart Dynamic Cost Estimate</h4>
            <p className="text-[10px] text-slate-400">Real-time transparent pricing with zero hidden surcharges.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-slate-400 hover:text-slate-200 p-1 flex items-center gap-1 text-[11px]"
        >
          <span>{showDetails ? 'Hide Breakdown' : 'Show Breakdown'}</span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {showDetails && (
        <div className="space-y-2 text-slate-300 text-xs py-1">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Hotel & Accommodation Stays:</span>
            <span className="font-mono text-slate-200 font-semibold">
              ₹{priceBreakdown.hotelCost.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Private Dedicated Vehicle & Fuel:</span>
            <span className="font-mono text-slate-200 font-semibold">
              ₹{priceBreakdown.vehicleCost.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Chauffeur Allowance, Tolls & Parking:</span>
            <span className="font-mono text-slate-200 font-semibold">
              ₹{priceBreakdown.driverAllowance.toLocaleString('en-IN')}
            </span>
          </div>

          {priceBreakdown.permitFees > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Army & Restricted Area Permits:</span>
              <span className="font-mono text-slate-200 font-semibold">
                ₹{priceBreakdown.permitFees.toLocaleString('en-IN')}
              </span>
            </div>
          )}

          {priceBreakdown.discountAmount > 0 && (
            <div className="flex justify-between items-center text-emerald-400 font-semibold">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Promo Coupon Applied:
              </span>
              <span className="font-mono">-₹{priceBreakdown.discountAmount.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-[11px] text-slate-400">
            <span>Govt GST (5% Tour Operator):</span>
            <span className="font-mono text-slate-300">₹{priceBreakdown.gstTax.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Coupon input form */}
      <form onSubmit={handleCouponSubmit} className="flex gap-2 pt-1">
        <input
          type="text"
          placeholder="Promo code (e.g. SIKKIM2026)"
          value={inputCoupon}
          onChange={(e) => setInputCoupon(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs uppercase font-mono text-slate-200 focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
        >
          Apply
        </button>
      </form>
      {couponAppliedMsg && (
        <p className="text-[10px] text-emerald-400 flex items-center gap-1">
          <Check className="w-3 h-3" /> Coupon verified and applied to total calculation!
        </p>
      )}

      {/* Grand Total Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Estimated Grand Total (All-Inclusive)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-amber-300 font-serif">
              ₹{priceBreakdown.grandTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-cyan-300 font-mono">
              (₹{priceBreakdown.costPerPerson.toLocaleString('en-IN')} / person)
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold inline-flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Best Price Guaranteed
          </span>
        </div>
      </div>
    </div>
  );
};
