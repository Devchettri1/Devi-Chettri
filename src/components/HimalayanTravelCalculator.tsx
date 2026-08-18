import React, { useState, useEffect } from 'react';
import { Compass, Fuel, ShieldAlert, CheckCircle, Calculator, FileText, AlertTriangle } from 'lucide-react';
import { useWhatsApp } from '../utils/whatsAppContext';

const ROUTES_MATRIX = [
  { from: 'NJP / Bagdogra Airport', to: 'Gangtok', dist: '120 km', time: '4.5 hrs', road: 'Teesta River NH10 Road', recommendedCab: 'Innova Crysta / Xylo' },
  { from: 'Gangtok', to: 'Tsomgo Lake & Nathula Pass', dist: '56 km', time: '2.5 hrs', road: 'Steep High Altitude Mountain Pass', recommendedCab: 'Innova / Scorpio 4x4' },
  { from: 'Gangtok', to: 'Lachen & Gurudongmar (17,800 ft)', dist: '120 km', time: '5.5 hrs', road: 'North Sikkim Rugged Terrain', recommendedCab: 'Mahindra Scorpio / Xylo' },
  { from: 'Gangtok', to: 'Pelling Glass Skywalk', dist: '115 km', time: '4.0 hrs', road: 'West Sikkim Scenic Route', recommendedCab: 'Innova Crysta / WagonR' },
  { from: 'Gangtok', to: 'Darjeeling', dist: '98 km', time: '3.5 hrs', road: 'Melli & Teesta Valley Route', recommendedCab: 'Innova Crysta / WagonR' },
  { from: 'Darjeeling', to: 'NJP / Bagdogra Airport', dist: '70 km', time: '3.0 hrs', road: 'Rohini Tea Garden Downhill', recommendedCab: 'Innova Crysta / WagonR' },
];

export const HimalayanTravelCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distance' | 'permits' | 'fuel'>('distance');
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);
  const [hasVoterId, setHasVoterId] = useState(true);
  const [hasPhotos, setHasPhotos] = useState(true);
  const [isAadhaarOnly, setIsAadhaarOnly] = useState(false);
  const { setPageContext } = useWhatsApp();

  const route = ROUTES_MATRIX[selectedRouteIdx];

  // Synchronize route and permit checker state to WhatsApp floating context
  useEffect(() => {
    if (activeTab === 'distance' || activeTab === 'fuel') {
      setPageContext({
        type: 'calculator',
        title: `${route.from} ➔ ${route.to}`,
        subtitle: `Distance: ${route.dist} (${route.time}) | Recommended: ${route.recommendedCab}`,
        vehicle: route.recommendedCab,
        duration: route.time,
        pickupLocation: route.from,
        dropLocation: route.to,
      });
    } else if (activeTab === 'permits') {
      setPageContext({
        type: 'calculator',
        title: 'Nathula Pass & North Sikkim Permit Verification',
        subtitle: 'Voter ID / Passport & Passport Photos Required',
        location: 'Gangtok Permit Cell',
      });
    }
  }, [activeTab, selectedRouteIdx, setPageContext, route.from, route.to, route.dist, route.time, route.recommendedCab]);

  return (
    <div className="bg-[#0A1128] text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-5 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <span>Sikkim Travel Tools & Distance Estimator</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Instant road travel time, permit eligibility verification, and fuel calculator
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#060B18] p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('distance')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'distance' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Distance & Time
          </button>
          <button
            onClick={() => setActiveTab('permits')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'permits' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Permit Checker
          </button>
          <button
            onClick={() => setActiveTab('fuel')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'fuel' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Fuel Estimator
          </button>
        </div>
      </div>

      {/* Tab 1: Distance Calculator */}
      {activeTab === 'distance' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-cyan-300 mb-1">Select Mountain Route:</label>
              <select
                value={selectedRouteIdx}
                onChange={(e) => setSelectedRouteIdx(Number(e.target.value))}
                className="w-full bg-[#060B18] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {ROUTES_MATRIX.map((r, idx) => (
                  <option key={idx} value={idx}>
                    {r.from} ➔ {r.to}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-[#060B18] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block">Distance & Est. Time</span>
                <span className="text-sm font-bold text-cyan-400">{route.dist} ({route.time})</span>
              </div>
              <Compass className="w-6 h-6 text-cyan-400" />
            </div>
          </div>

          <div className="bg-[#060B18] p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Starting From:</span>
              <strong className="text-white">{route.from}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Destination:</span>
              <strong className="text-white">{route.to}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Recommended Vehicle:</span>
              <strong className="text-cyan-300">{route.recommendedCab}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Permit Checker */}
      {activeTab === 'permits' && (
        <div className="space-y-4">
          <div className="bg-[#060B18] p-4 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              Nathula Pass & North Sikkim Protected Area Permit Requirements
            </h4>

            <div className="space-y-2 text-xs">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasVoterId}
                  onChange={(e) => setHasVoterId(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-cyan-400"
                />
                <span className="text-slate-200">I have Voter ID Card / Passport / Indian Driving License</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPhotos}
                  onChange={(e) => setHasPhotos(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-cyan-400"
                />
                <span className="text-slate-200">I have 2 Passport Size Physical Photographs per person</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer text-rose-300">
                <input
                  type="checkbox"
                  checked={isAadhaarOnly}
                  onChange={(e) => setIsAadhaarOnly(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-400"
                />
                <span>I ONLY have Aadhaar Card (Note: Army restrictions apply)</span>
              </label>
            </div>
          </div>

          {/* Verification Status */}
          <div
            className={`p-3.5 rounded-xl text-xs border flex items-start space-x-3 ${
              hasVoterId && hasPhotos && !isAadhaarOnly
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-100'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-100'
            }`}
          >
            {hasVoterId && hasPhotos && !isAadhaarOnly ? (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-300">Permit Status: 100% Eligible</strong>
                  <p className="mt-0.5 opacity-90">
                    OffbeatDestination Travels will process your Nathula Pass & Zero Point permits with the Army.
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-rose-300">Attention Required</strong>
                  <p className="mt-0.5 opacity-90">
                    Aadhaar Card is NOT accepted by Indian Army for Nathula Pass & North Sikkim permits. Please carry Voter ID, Passport, or DL.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Fuel Estimator */}
      {activeTab === 'fuel' && (
        <div className="space-y-3 text-xs">
          <div className="bg-[#060B18] p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-semibold flex items-center gap-2">
                <Fuel className="w-4 h-4 text-cyan-400" />
                Est. Mountain Fuel Efficiency
              </span>
              <span className="text-cyan-300 font-bold">10-12 km/L (Hill Driving)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              All cab rentals provided by OffbeatDestination Travels include 100% fuel, driver allowance, parking fees, and hill toll taxes. You never pay fuel extra.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
