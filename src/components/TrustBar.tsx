import React from 'react';
import { Star, ShieldCheck, Car, FileCheck2, Headset } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] border-b border-[#E6E2D9] py-5 px-4 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm text-[#17202A]">
        {/* Rating & Reviews */}
        <a
          href={AGENCY_DETAILS.googleMapsUrl || "https://maps.app.goo.gl/yMzj2QB8QBGrzBQm7"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 hover:text-[#0B1F3A] transition-colors group"
        >
          <div className="p-2 bg-[#0B1F3A] rounded text-[#C6A15B]">
            <Star className="w-4 h-4 fill-[#C6A15B] text-[#C6A15B]" />
          </div>
          <div>
            <span className="font-bold text-[#0B1F3A] group-hover:text-[#C6A15B] text-sm block">
              4.9★ Google Rating
            </span>
            <p className="text-[11px] text-slate-500">540+ Verified Reviews</p>
          </div>
        </a>

        {/* Local Agency Reg */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0B1F3A] rounded text-[#C6A15B]">
            <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
          </div>
          <div>
            <span className="font-bold text-[#0B1F3A] text-sm block">Local Sikkim Team</span>
            <p className="text-[11px] text-slate-500">Based in Gangtok</p>
          </div>
        </div>

        {/* Private Vehicles */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0B1F3A] rounded text-[#C6A15B]">
            <Car className="w-4 h-4 text-[#C6A15B]" />
          </div>
          <div>
            <span className="font-bold text-[#0B1F3A] text-sm block">Private Fleet</span>
            <p className="text-[11px] text-slate-500">Innova / SUV / Sedan</p>
          </div>
        </div>

        {/* Permit Assistance */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0B1F3A] rounded text-[#C6A15B]">
            <FileCheck2 className="w-4 h-4 text-[#C6A15B]" />
          </div>
          <div>
            <span className="font-bold text-[#0B1F3A] text-sm block">Permit Assistance</span>
            <p className="text-[11px] text-slate-500">North & East Sikkim</p>
          </div>
        </div>

        {/* Dedicated Support */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#0B1F3A] rounded text-[#C6A15B]">
            <Headset className="w-4 h-4 text-[#C6A15B]" />
          </div>
          <div>
            <span className="font-bold text-[#0B1F3A] text-sm block">Gangtok Office Team</span>
            <p className="text-[11px] text-slate-500">24/7 On-Trip Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};
