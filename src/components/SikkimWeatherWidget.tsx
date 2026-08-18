import React, { useState } from 'react';
import { CloudSun, Snowflake, Sun, Thermometer, ShieldCheck, MapPin, Info } from 'lucide-react';

interface WeatherLoc {
  name: string;
  altitude: string;
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Snowing' | 'Pleasant';
  permitStatus: 'Open' | 'Army Restricted' | 'Weather Check';
  clothing: string;
}

const LOCATIONS: WeatherLoc[] = [
  { name: 'Gangtok', altitude: '5,410 ft', temp: 18, condition: 'Pleasant', permitStatus: 'Open', clothing: 'Light woollens & comfortable jacket' },
  { name: 'Nathula Pass', altitude: '14,140 ft', temp: -2, condition: 'Snowing', permitStatus: 'Weather Check', clothing: 'Heavy thermal innerwear & windproof down jacket' },
  { name: 'Lachen & Gurudongmar', altitude: '17,800 ft', temp: 2, condition: 'Snowing', permitStatus: 'Open', clothing: 'Heavy winter coat, gloves & woollen boots' },
  { name: 'Yumthang & Zero Point', altitude: '15,300 ft', temp: 4, condition: 'Cloudy', permitStatus: 'Open', clothing: 'Down jacket & snow gloves' },
  { name: 'Darjeeling', altitude: '6,700 ft', temp: 16, condition: 'Sunny', permitStatus: 'Open', clothing: 'Cotton clothes with light fleece jacket' },
  { name: 'Pelling', altitude: '7,200 ft', temp: 15, condition: 'Pleasant', permitStatus: 'Open', clothing: 'Light jacket & walking shoes' },
];

export const SikkimWeatherWidget: React.FC = () => {
  const [selectedLoc, setSelectedLoc] = useState<WeatherLoc>(LOCATIONS[0]);

  return (
    <div id="sikkim-weather-widget" className="bg-[#0A1128] text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-2xl space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <CloudSun className="w-5 h-5 text-cyan-400" />
          <h3 className="font-serif font-bold text-base text-white">Live Sikkim Weather & Permit Radar</h3>
        </div>
        <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-800">
          Updated Today
        </span>
      </div>

      {/* Location Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {LOCATIONS.map((loc) => (
          <button
            key={loc.name}
            onClick={() => setSelectedLoc(loc)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedLoc.name === loc.name
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'bg-[#060B18] text-slate-300 hover:bg-[#0E1738] border border-slate-800'
            }`}
          >
            {loc.name}
          </button>
        ))}
      </div>

      {/* Selected Location Weather Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#060B18] p-4 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-3 md:col-span-1">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            {selectedLoc.temp < 5 ? (
              <Snowflake className="w-6 h-6 text-cyan-300 animate-pulse" />
            ) : selectedLoc.temp < 17 ? (
              <CloudSun className="w-6 h-6 text-cyan-300" />
            ) : (
              <Sun className="w-6 h-6 text-amber-400" />
            )}
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-extrabold text-white">{selectedLoc.temp}°C</span>
              <span className="text-xs text-cyan-300 font-semibold">{selectedLoc.condition}</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>Altitude: {selectedLoc.altitude}</span>
            </p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-2 text-xs border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Army Permit Clearance:
            </span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                selectedLoc.permitStatus === 'Open'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-amber-950 text-amber-300 border border-amber-800'
              }`}
            >
              {selectedLoc.permitStatus}
            </span>
          </div>

          <div className="flex items-start gap-1.5 text-slate-300">
            <Thermometer className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong className="text-cyan-200">Clothing Advice:</strong> {selectedLoc.clothing}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
