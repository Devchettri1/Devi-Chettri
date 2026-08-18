import React from 'react';
import { Star, ShieldCheck, Car, FileCheck2, Headset } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-[#0A1128] border-b border-slate-800 py-5 px-4 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm text-slate-200">
        {/* Rating & Reviews */}
        <a
          href={AGENCY_DETAILS.googleMapsUrl || "https://maps.app.goo.gl/yMzj2QB8QBGrzBQm7"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:text-cyan-300 transition-colors group"
        >
          <div className="p-2 bg-[#060B18] rounded-xl border border-cyan-500/30 text-cyan-400">
            <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
          </div>
          <div>
            <span className="font-bold text-white group-hover:text-cyan-300 text-sm block">
              4.9★ Google Rating
            </span>
            <p className="text-[11px] text-slate-400">540+ Verified Reviews</p>
          </div>
        </a>

        {/* Local Agency Reg */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#060B18] rounded-xl border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="font-bold text-white text-sm block">Local Sikkim Team</span>
            <p className="text-[11px] text-slate-400">Based in Gangtok</p>
          </div>
        </div>

        {/* Private Vehicles */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#060B18] rounded-xl border border-cyan-500/30 text-cyan-400">
            <Car className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="font-bold text-white text-sm block">Private Fleet</span>
            <p className="text-[11px] text-slate-400">Innova / SUV / Sedan</p>
          </div>
        </div>

        {/* Permit Assistance */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#060B18] rounded-xl border border-cyan-500/30 text-cyan-400">
            <FileCheck2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="font-bold text-white text-sm block">Permit Assistance</span>
            <p className="text-[11px] text-slate-400">North & East Sikkim</p>
          </div>
        </div>

        {/* Dedicated Support */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#060B18] rounded-xl border border-cyan-500/30 text-cyan-400">
            <Headset className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="font-bold text-white text-sm block">Gangtok Office Team</span>
            <p className="text-[11px] text-slate-400">24/7 On-Trip Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
