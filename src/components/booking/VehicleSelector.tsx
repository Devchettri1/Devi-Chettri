import React from 'react';
import { Car, Users, Luggage, Star, ShieldCheck, AlertTriangle, Check } from 'lucide-react';
import { VEHICLE_OPTIONS } from './pricingEngine';
import { VehicleOption } from './BookingTypes';

interface VehicleSelectorProps {
  selectedVehicleModel: string;
  onSelectVehicle: (vehicle: VehicleOption) => void;
  requiresNorthSikkim?: boolean;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicleModel,
  onSelectVehicle,
  requiresNorthSikkim = false,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Vehicle Preference</span>
          </h4>
          <p className="text-[11px] text-slate-400">All vehicles come with verified hill-certified chauffeurs, fuel & toll allowances.</p>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60">
          100% Commercial Tourist Plates
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {VEHICLE_OPTIONS.map((v) => {
          const isSelected = selectedVehicleModel === v.model;
          const isRestricted = requiresNorthSikkim && !v.isPermittedNorthSikkim;

          return (
            <div
              key={v.id}
              onClick={() => {
                if (!isRestricted) onSelectVehicle(v);
              }}
              className={`rounded-2xl border p-3.5 flex flex-col justify-between transition-all relative overflow-hidden ${
                isRestricted
                  ? 'opacity-50 cursor-not-allowed bg-slate-950/80 border-slate-900'
                  : isSelected
                  ? 'bg-gradient-to-br from-cyan-950/70 via-[#0A1128] to-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/40 cursor-pointer'
                  : 'bg-[#060B18] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 cursor-pointer'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300">
                    {v.category}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(v.comfortRating)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <h5 className="font-bold text-xs text-slate-100 mb-1">{v.model}</h5>

                <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-2 font-mono">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-500" />
                    Max {v.capacity} Pax
                  </span>
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-slate-500" />
                    {v.luggageCapacity} Bags
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-tight mb-3 line-clamp-2">
                  {v.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs mt-auto">
                <div>
                  <span className="font-bold text-amber-300">₹{v.pricePerDay.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-500"> / day</span>
                </div>

                {isRestricted ? (
                  <span className="text-[9px] text-rose-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Not for North Sikkim
                  </span>
                ) : (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
