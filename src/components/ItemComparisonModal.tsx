import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles, Star, BarChart3, TableProperties, ArrowRight } from 'lucide-react';
import { TourPackage, CabOption } from '../types';
import { D3ComparisonChart } from './D3ComparisonChart';

interface ItemComparisonModalProps {
  type: 'packages' | 'cabs';
  packages?: TourPackage[];
  cabs?: CabOption[];
  onClose: () => void;
  onSelectForBooking: (title: string) => void;
}

export const ItemComparisonModal: React.FC<ItemComparisonModalProps> = ({
  type,
  packages = [],
  cabs = [],
  onClose,
  onSelectForBooking,
}) => {
  const [viewTab, setViewTab] = useState<'all' | 'chart' | 'table'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Sikkim-Darjeeling', 'North Sikkim', 'Silk Route', 'South-West Sikkim', 'Honeymoon', 'Bhutan', 'Offbeat', 'Adventure', 'Family'];

  const displayedPackages = selectedCategory === 'All' 
    ? packages 
    : packages.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#071A2D] text-slate-100 w-full max-w-5xl rounded-3xl border border-cyan-500/30 shadow-2xl p-4 sm:p-6 relative font-sans my-6 space-y-6 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-900 border border-white/10 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Offbeat Side-by-Side Comparison & D3 Analytics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-100">
              {type === 'packages' ? `Compare Tour Packages (${packages.length}+ Options)` : 'Compare Cab & SUV Rental Fleet Options'}
            </h2>
          </div>

          {/* View Toggles */}
          <div className="flex items-center bg-[#051322] p-1 rounded-xl border border-slate-800 text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewTab === 'all'
                  ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Combined View
            </button>
            <button
              type="button"
              onClick={() => setViewTab('chart')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewTab === 'chart'
                  ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>D3 Chart Only</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('table')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewTab === 'table'
                  ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableProperties className="w-3.5 h-3.5" />
              <span>Specs Table</span>
            </button>
          </div>
        </div>

        {/* Category Filter for Tour Packages */}
        {type === 'packages' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap mr-1">Circuit:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* D3-based Bar Chart Visualization */}
        {(viewTab === 'all' || viewTab === 'chart') && (
          <D3ComparisonChart
            type={type}
            packages={displayedPackages}
            cabs={cabs}
            onSelectForBooking={onSelectForBooking}
          />
        )}

        {/* Specifications Comparison Table */}
        {(viewTab === 'all' || viewTab === 'table') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm sm:text-base text-slate-200 flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-cyan-400" />
                <span>Feature & Specification Matrix</span>
              </h3>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Scroll horizontally on mobile to view all options
              </span>
            </div>

            {/* Packages Comparison Table */}
            {type === 'packages' && displayedPackages.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#051322]/80">
                <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-cyan-500/20 text-slate-300">
                      <th className="p-3.5 bg-slate-900/90 w-1/4 font-semibold">Features / Specs</th>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <th key={pkg.id} className="p-3.5 bg-slate-900/60 w-1/4 font-serif font-bold text-cyan-200">
                          <div className="space-y-1">
                            <span className="block leading-snug">{pkg.title}</span>
                            <span className="inline-block text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800/80 font-mono">
                              {pkg.duration}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Starting Price</td>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <td key={pkg.id} className="p-3.5 font-bold text-amber-300 text-sm">
                          ₹{pkg.priceStarting.toLocaleString('en-IN')}{' '}
                          <span className="text-[10px] text-slate-400 font-normal">/ person</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Duration</td>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <td key={pkg.id} className="p-3.5 text-slate-200 font-medium">{pkg.duration}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Guest Rating</td>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <td key={pkg.id} className="p-3.5 text-slate-200">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="font-bold">{pkg.rating}</span>
                            <span className="text-slate-400 text-[11px]">({pkg.reviewsCount})</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Permit Included</td>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <td key={pkg.id} className="p-3.5 text-slate-200">
                          {pkg.permitsRequired ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-4 h-4" /> 100% Permit Handled
                            </span>
                          ) : (
                            <span className="text-slate-400">Not Required</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Hotel Tiers</td>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <td key={pkg.id} className="p-3.5 text-slate-300 text-[11px] space-y-1">
                          <div>
                            <span className="text-slate-400">Deluxe 3★: </span>
                            <strong className="text-cyan-300">₹{pkg.hotelTiers?.deluxe.price?.toLocaleString('en-IN') || pkg.priceStarting.toLocaleString('en-IN')}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400">Luxury 4★: </span>
                            <strong className="text-rose-300">₹{pkg.hotelTiers?.luxury.price?.toLocaleString('en-IN') || (pkg.priceStarting * 1.4).toLocaleString('en-IN')}</strong>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Key Highlights</td>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <td key={pkg.id} className="p-3.5 text-slate-300 space-y-1">
                          {pkg.highlights.slice(0, 3).map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px]">
                              <span className="text-cyan-400 flex-shrink-0">•</span>
                              <span className="line-clamp-2">{h}</span>
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Action</td>
                      {displayedPackages.slice(0, 4).map((pkg) => (
                        <td key={pkg.id} className="p-3.5">
                          <button
                            onClick={() => {
                              onSelectForBooking(pkg.title);
                              onClose();
                            }}
                            className="w-full py-2 px-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-md transition-all"
                          >
                            <span>Book Package</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Cabs Comparison Table */}
            {type === 'cabs' && cabs.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#051322]/80">
                <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                  <thead>
                    <tr className="border-b border-amber-500/20 text-slate-300">
                      <th className="p-3.5 bg-slate-900/90 w-1/4 font-semibold">Vehicle Spec</th>
                      {cabs.slice(0, 4).map((cab) => (
                        <th key={cab.id} className="p-3.5 bg-slate-900/60 w-1/4 font-serif font-bold text-amber-200">
                          <div className="space-y-1">
                            <span className="block leading-snug">{cab.model}</span>
                            <span className="inline-block text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-800/80 font-mono">
                              {cab.type}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Daily Tariff Rate</td>
                      {cabs.slice(0, 4).map((cab) => (
                        <td key={cab.id} className="p-3.5 font-bold text-amber-300 text-sm">
                          ₹{cab.ratePerDay.toLocaleString('en-IN')}{' '}
                          <span className="text-[10px] text-slate-400 font-normal">/ day</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">NJP / Airport Rate</td>
                      {cabs.slice(0, 4).map((cab) => (
                        <td key={cab.id} className="p-3.5 font-bold text-cyan-300 text-sm">
                          ₹{cab.njpIxbPickupRate.toLocaleString('en-IN')}{' '}
                          <span className="text-[10px] text-slate-400 font-normal">/ transfer</span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Seating Capacity</td>
                      {cabs.slice(0, 4).map((cab) => (
                        <td key={cab.id} className="p-3.5 text-slate-200 font-medium">{cab.capacity}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Best Suited For</td>
                      {cabs.slice(0, 4).map((cab) => (
                        <td key={cab.id} className="p-3.5 text-slate-200 text-[11px] leading-relaxed">{cab.bestFor}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Key Features</td>
                      {cabs.slice(0, 4).map((cab) => (
                        <td key={cab.id} className="p-3.5 text-slate-300 space-y-1">
                          {cab.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-start gap-1 text-[11px]">
                              <span className="text-amber-400 flex-shrink-0">•</span>
                              <span className="line-clamp-2">{feat}</span>
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-400 bg-slate-900/40">Action</td>
                      {cabs.slice(0, 4).map((cab) => (
                        <td key={cab.id} className="p-3.5">
                          <button
                            onClick={() => {
                              onSelectForBooking(`Cab Rental: ${cab.model}`);
                              onClose();
                            }}
                            className="w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow-md transition-all"
                          >
                            <span>Reserve Cab</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

