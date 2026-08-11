import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Phone, Mail, Compass, ExternalLink, ShieldCheck, Clock, CheckCircle2, Key, Globe } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

const GANGTOK_COORDS = { lat: 27.3275, lng: 88.6128 }; // Arithang, Gangtok

const NEARBY_LANDMARKS = [
  { name: 'MG Marg Walkway', distance: '500 meters (6 min walk)', desc: 'Main Gangtok pedestrian hub & travel desk center' },
  { name: 'Gangtok Ropeway Station', distance: '1.2 km (5 min drive)', desc: 'Panoramic cable car ride over Gangtok town' },
  { name: 'Sikkim Tourism Office', distance: '800 meters', desc: 'Government tourism & permit verification desk' },
  { name: 'Bagdogra Airport (IXB)', distance: '124 km (4.5 hrs drive)', desc: 'Direct pickup available in our Innova Crystas' },
  { name: 'New Jalpaiguri Railway (NJP)', distance: '118 km (4 hrs drive)', desc: '24/7 private tourist cab pickups' },
];

export const AgencyLocationMap: React.FC = () => {
  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    '';

  const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';
  const [selectedLandmark, setSelectedLandmark] = useState<string | null>(null);

  return (
    <section id="agency-location" className="py-16 bg-slate-900 text-slate-100 border-t border-slate-800 space-y-10">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-800 tracking-wider uppercase inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Gangtok Head Office Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Visit Our Travel Office in Gangtok
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Located in Arithang, minutes from MG Marg. Drop by for permit submissions, itinerary customization, or tea with our local Sikkim travel experts!
          </p>
        </div>

        {/* Main Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Office Details Card */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Govt. Registered Travel Agent</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-100">{AGENCY_DETAILS.name}</h3>
              <p className="text-xs font-mono text-amber-300 font-semibold bg-slate-900 px-2.5 py-1 rounded border border-slate-800 inline-block">
                Reg No: {AGENCY_DETAILS.licenseNo} (Prop: {AGENCY_DETAILS.proprietor})
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 border-t border-b border-slate-800/80 py-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Head Office Address:</span>
                  <p className="text-slate-400 leading-relaxed mt-0.5">{AGENCY_DETAILS.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Office Hours & Support:</span>
                  <p className="text-slate-400 mt-0.5">Monday – Sunday: 7:00 AM – 9:00 PM (24/7 WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Direct Helplines:</span>
                  <p className="text-slate-400 mt-0.5">{AGENCY_DETAILS.phonePrimary} / {AGENCY_DETAILS.phoneSecondary}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Official Email:</span>
                  <p className="text-slate-400 mt-0.5">{AGENCY_DETAILS.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-200 block">Official Portal Domain:</span>
                  <a href={AGENCY_DETAILS.websiteUrl} target="_blank" rel="noreferrer" className="text-teal-300 hover:underline mt-0.5 block font-bold">
                    {AGENCY_DETAILS.domain}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={AGENCY_DETAILS.googleMapsUrl || "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7"}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Location on Google Maps (https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7)</span>
              </a>

              <a
                href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20am%20coming%20to%20your%20Gangtok%20office%20at%20Arithang.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold rounded-xl text-xs border border-slate-800 flex items-center justify-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>Notify Desk via WhatsApp</span>
              </a>
            </div>

            {/* Nearby Highlights List */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Key Nearby Distances:
              </span>
              <div className="space-y-2">
                {NEARBY_LANDMARKS.map((lm, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800/80 text-xs flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-200 block">{lm.name}</span>
                      <span className="text-[10px] text-slate-400 block">{lm.desc}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900 flex-shrink-0">
                      {lm.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Box */}
          <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[480px] h-full">
            {hasValidKey ? (
              <div className="w-full h-[500px] relative">
                <APIProvider apiKey={API_KEY} version="weekly">
                  <Map
                    defaultCenter={GANGTOK_COORDS}
                    defaultZoom={15}
                    mapId="OFFBEAT_DESTINATION_MAP"
                    style={{ width: '100%', height: '100%' }}
                  >
                    <AdvancedMarker position={GANGTOK_COORDS} title={AGENCY_DETAILS.name}>
                      <Pin background="#059669" glyphColor="#ffffff" borderColor="#047857" />
                    </AdvancedMarker>

                    <InfoWindow position={GANGTOK_COORDS} zIndex={10}>
                      <div className="p-2 text-slate-900 max-w-xs space-y-1">
                        <div className="font-bold text-sm text-emerald-700">{AGENCY_DETAILS.name}</div>
                        <p className="text-xs text-slate-600">{AGENCY_DETAILS.location}</p>
                        <p className="text-[11px] font-semibold text-amber-700">Govt Reg: SK-TA-2021-984</p>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(AGENCY_DETAILS.name + ' Gangtok')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block text-xs font-bold text-blue-600 hover:underline pt-1"
                        >
                          Open in Google Maps →
                        </a>
                      </div>
                    </InfoWindow>
                  </Map>
                </APIProvider>
              </div>
            ) : (
              <div className="w-full h-full min-h-[500px] flex flex-col">
                {/* Embedded Map iFrame Fallback */}
                <div className="w-full h-[380px] relative bg-slate-900">
                  <iframe
                    title="OffbeatDestination Travels Gangtok Map Location"
                    src={`https://maps.google.com/maps?q=${GANGTOK_COORDS.lat},${GANGTOK_COORDS.lng}&hl=en&z=15&output=embed`}
                    className="w-full h-full border-0 filter grayscale-[20%] contrast-[110%]"
                    loading="lazy"
                    allowFullScreen
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-xs space-y-1">
                    <span className="font-extrabold text-emerald-400 block">{AGENCY_DETAILS.name}</span>
                    <span className="text-slate-300 text-[11px] block">{AGENCY_DETAILS.location}</span>
                  </div>
                </div>

                {/* API Key Setup Banner */}
                <div className="p-5 bg-slate-900 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-xs text-slate-200">Google Maps Platform Key Setup</span>
                    </div>
                    <span className="text-[10px] bg-amber-950 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-800">
                      Optional secret configuration
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    To enable fully interactive custom 3D WebGL markers & Advanced Map controls, paste your Google Maps Platform API key under <strong>Settings (⚙️ top right) → Secrets → GOOGLE_MAPS_PLATFORM_KEY</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
