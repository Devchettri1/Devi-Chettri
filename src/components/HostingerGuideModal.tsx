import React, { useState } from 'react';
import { X, Check, Copy, Code2, Globe, Cpu, MessageSquare, Bell, ShieldCheck, Download, Zap, Sparkles, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface HostingerGuideModalProps {
  onClose: () => void;
}

export const HostingerGuideModal: React.FC<HostingerGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'auto' | 'gbp' | 'embed' | 'step1' | 'step2' | 'step3' | 'step4'>('auto');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const originUrl = window.location.origin;

  // Single Page Full Widget HTML Snippet for Hostinger
  const fullHostingerHtmlSnippet = `<!-- ============================================================
  OFFBEATDESTINATION TRAVELS - AUTOMATED HOSTINGER WIDGET
  Agency: ${AGENCY_DETAILS.name} (${AGENCY_DETAILS.domain})
  Address: ${AGENCY_DETAILS.location}
  WhatsApp: +${AGENCY_DETAILS.whatsappNumber}
============================================================ -->
<div id="offbeat-hostinger-ai-root"></div>
<script>
  (function() {
    window.OffbeatAIConfig = {
      agencyName: "${AGENCY_DETAILS.name}",
      domain: "${AGENCY_DETAILS.domain}",
      websiteUrl: "${AGENCY_DETAILS.websiteUrl}",
      location: "${AGENCY_DETAILS.location}",
      whatsappNumber: "${AGENCY_DETAILS.whatsappNumber}",
      phonePrimary: "${AGENCY_DETAILS.phonePrimary}",
      apiEndpoint: "${originUrl}/api/chat",
      welcomeMsg: "Namaste! 🙏 Welcome to OffbeatDestination Travels. Planning a trip to Sikkim, Darjeeling, or Bhutan?"
    };

    var script = document.createElement('script');
    script.src = "${originUrl}/src/main.tsx";
    script.type = "module";
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
<!-- End Automated Hostinger Widget -->`;

  const copyToClipboard = (text: string, typeKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(typeKey);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleDownloadHostingerBundle = () => {
    const blobContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${AGENCY_DETAILS.name} - Hostinger AI Selling Widget</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #020617; color: #f8fafc; margin: 0; padding: 2rem; text-align: center; }
    .card { max-width: 500px; margin: 3rem auto; padding: 2rem; background: #0f172a; border: 1px solid #10b981; rounded: 1rem; border-radius: 1rem; shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
    h1 { color: #34d399; font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 0.875rem; line-height: 1.5; }
    .badge { display: inline-block; background: #064e3b; color: #6ee7b7; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: bold; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Hostinger Automated Integration</span>
    <h1>${AGENCY_DETAILS.name}</h1>
    <p>Location: ${AGENCY_DETAILS.location}</p>
    <p>Official WhatsApp: +${AGENCY_DETAILS.whatsappNumber}</p>
    <p>This widget automatically loads the AI Sales Engine & Floating WhatsApp hotline onto your Hostinger website.</p>
  </div>

  ${fullHostingerHtmlSnippet}
</body>
</html>`;

    const blob = new Blob([blobContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hostinger-ai-widget-${AGENCY_DETAILS.domain.replace('.', '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-emerald-700/60 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6 relative text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800 flex items-center gap-1 w-fit">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Automated Hostinger Setup Hub</span>
              </span>
              <h2 className="text-xl font-extrabold text-slate-100 mt-1">
                Hostinger Website & AI Engine Integration
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-semibold">Backend API Engine</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Online (/api/chat)
            </span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-semibold">Gangtok Address</span>
            <span className="text-slate-200 font-bold truncate block">Arithang, Gangtok</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-semibold">WhatsApp Hotline</span>
            <span className="text-teal-300 font-bold">+91 62961 02341</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 block font-semibold">Domain Target</span>
            <span className="text-amber-300 font-bold">{AGENCY_DETAILS.domain}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'auto', label: '⚡ 1-Click Auto Setup' },
            { id: 'gbp', label: '📍 Google Business Profile & Domain' },
            { id: 'embed', label: 'Code Snippets' },
            { id: 'step1', label: 'Hostinger Pages' },
            { id: 'step2', label: 'AI Prompt Setup' },
            { id: 'step3', label: 'Lead Automation' },
            { id: 'step4', label: 'Floating WhatsApp' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1-Click Auto Setup Tab */}
        {activeTab === 'auto' && (
          <div className="space-y-5 text-xs leading-relaxed animate-fadeIn">
            <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 rounded-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400 fill-current" />
                    <span>Instant Hostinger Setup & Widget Exporter</span>
                  </h3>
                  <p className="text-slate-300 text-[11px]">
                    Deploy the entire OffbeatDestination AI Selling Machine directly into your Hostinger Website Builder in under 60 seconds.
                  </p>
                </div>

                <button
                  onClick={handleDownloadHostingerBundle}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-xl flex items-center gap-2 shadow-lg transition-all transform hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadSuccess ? 'Downloaded HTML File!' : 'Download Hostinger HTML Bundle'}</span>
                </button>
              </div>

              {/* 3 Step Auto Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-slate-200">
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-amber-400 font-extrabold flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px]">1</span>
                    <span>Download Bundle</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Click the download button above or copy the HTML code block below.</p>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px]">2</span>
                    <span>Hostinger Builder</span>
                  </div>
                  <p className="text-[11px] text-slate-400">In Hostinger Website Builder, add an <strong>Embed Code / Custom HTML</strong> element.</p>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                  <div className="text-teal-300 font-extrabold flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-[10px]">3</span>
                    <span>Publish & Go Live</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Paste code, click <strong>Publish</strong>. AI Assistant & WhatsApp hotline will appear live on offbeatdestination.in!</p>
                </div>
              </div>
            </div>

            {/* Quick Copy Script */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 text-xs flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Hostinger Universal Custom HTML Snippet:</span>
                </span>
                <button
                  onClick={() => copyToClipboard(fullHostingerHtmlSnippet, 'autoSnippet')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode === 'autoSnippet' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'autoSnippet' ? 'Copied Code!' : 'Copy Snippet'}</span>
                </button>
              </div>

              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-teal-300 font-mono overflow-x-auto whitespace-pre">
                {fullHostingerHtmlSnippet}
              </pre>
            </div>
          </div>
        )}

        {/* Google Business Profile & Hostinger Domain Setup Tab */}
        {activeTab === 'gbp' && (
          <div className="space-y-5 text-xs leading-relaxed animate-fadeIn">
            {/* Step 1: Deploy on offbeatdestination.in (Hostinger) */}
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>1. Deploy Website to offbeatdestination.in on Hostinger</span>
                </h3>
                <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 font-bold rounded text-[10px] border border-emerald-800">
                  Domain: offbeatdestination.in
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-extrabold text-amber-300 block">A. Hostinger hPanel Domain Setup:</span>
                  <p className="text-[11px] text-slate-400">
                    Log in to Hostinger hPanel → Go to <strong>Domains</strong> → Select <strong>offbeatdestination.in</strong>. Ensure standard DNS points to your Hostinger server IP or Nameservers.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-extrabold text-emerald-300 block">B. Upload & Publish:</span>
                  <p className="text-[11px] text-slate-400">
                    In Hostinger Website Builder, create an <strong>Embed Code / Custom HTML</strong> section or upload built static files (`index.html`) to `public_html/`. Enable <strong>Free SSL Certificate</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Add to Google Business Profile */}
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>2. Connect to Google Business Profile (Gangtok, Sikkim)</span>
                </h3>
                <a
                  href="https://maps.app.goo.gl/1F2hXG1XeyKvM9DE8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-amber-500 text-slate-950 font-black rounded-lg text-[11px] hover:bg-amber-400 transition-colors flex items-center gap-1 shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open GBP Map Link</span>
                </a>
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                  <span className="font-extrabold text-slate-100 block">Steps to Link offbeatdestination.in in Google Business Profile:</span>
                  <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                    <li>Go to <strong className="text-amber-300">Google Business Profile Manager</strong> (business.google.com).</li>
                    <li>Select <strong>Offbeat Destination Travels (Arithang, Gangtok)</strong>.</li>
                    <li>Click <strong className="text-emerald-400">Edit Profile → Business Information</strong>.</li>
                    <li>Under <strong className="text-teal-300">Website URL</strong>, paste: <code className="bg-slate-950 px-2 py-0.5 rounded text-amber-300 font-mono">https://offbeatdestination.in</code></li>
                    <li>Under <strong className="text-teal-300">Appointment / Inquiry Link</strong>, paste: <code className="bg-slate-950 px-2 py-0.5 rounded text-emerald-300 font-mono">https://offbeatdestination.in/#plan-trip</code> or your WhatsApp hotline link.</li>
                    <li>Click <strong>Save</strong>. Verification takes 10–15 minutes to reflect across Google Search & Maps!</li>
                  </ol>
                </div>

                {/* Structured Schema Verification */}
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-400">✅ Pre-Configured LocalBusiness & TravelAgency JSON-LD Schema:</span>
                    <span className="text-[10px] text-slate-400">Embedded in index.html</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Your website already includes valid Google JSON-LD schema linking <code className="text-teal-300">https://offbeatdestination.in</code> directly with Google Maps listing <code className="text-amber-300">https://maps.app.goo.gl/1F2hXG1XeyKvM9DE8</code>, phone <code className="text-emerald-300">+91 62961 02341</code>, and 4.9★ rating (520+ reviews).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Snippets Tab */}
        {activeTab === 'embed' && (
          <div className="space-y-4 text-xs leading-relaxed animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-teal-400 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>Hostinger Head & Body Scripts</span>
              </h3>
              <button
                onClick={() => copyToClipboard(fullHostingerHtmlSnippet, 'embedCode')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedCode === 'embedCode' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === 'embedCode' ? 'Copied Code!' : 'Copy Full Script'}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-teal-300 font-mono overflow-x-auto whitespace-pre">
              {fullHostingerHtmlSnippet}
            </pre>
            <p className="text-[11px] text-slate-400">
              Paste this block inside Hostinger Website Builder -&gt; Add Element -&gt; Custom HTML / Embed Code.
            </p>
          </div>
        )}

        {/* Step 1 Content */}
        {activeTab === 'step1' && (
          <div className="space-y-4 text-xs leading-relaxed animate-fadeIn">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Website Structure & Hostinger Setup</span>
            </h3>
            <p className="text-slate-300">
              Create these main pages on your Hostinger Website Builder to structure a high-converting agency workflow:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-100">1. Home Page</span>
                <p className="text-slate-400">Hero banner with snow peaks, 4.9★ rating badge, quick package cards, and the AI Sales Chatbot front-and-center.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-100">2. Tour Packages Page</span>
                <p className="text-slate-400">Dedicated sections for 5N/6D Sikkim & Darjeeling, North Sikkim (Zero Point), South/West Sikkim, and Bhutan.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-100">3. Cab Rental Page</span>
                <p className="text-slate-400">Highlighting Toyota Innova Crysta fleet, NJP Station & Bagdogra Airport (IXB) pickups, Swift Dzire, and WagonR cabs.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-100">4. About Us Page</span>
                <p className="text-slate-400">Your story as a Gangtok registered agency located at Arithang, tagline <em>"A better way to explore"</em>, and 500+ reviews.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 sm:col-span-2">
                <span className="font-bold text-slate-100">5. Contact / Plan My Trip Page</span>
                <p className="text-slate-400">Simple lead inquiry form backed by the AI chatbot and direct WhatsApp hotline (+91 62961 02341).</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 Content */}
        {activeTab === 'step2' && (
          <div className="space-y-4 text-xs leading-relaxed animate-fadeIn">
            <h3 className="text-sm font-bold text-teal-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Embedding the AI Chatbot (The Selling Engine)</span>
            </h3>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200">Chatbot Welcome Popup:</h4>
              <p className="text-emerald-300 italic bg-emerald-950/60 p-2.5 rounded border border-emerald-800">
                "Namaste! 🙏 Welcome to OffbeatDestination Travels. Planning a trip to Sikkim, Darjeeling, or Bhutan? Tell me your travel dates or what you'd like to explore, and I’ll help you find the perfect package instantly!"
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-slate-200">AI Knowledge Base Prompt Profile:</h4>
              <pre className="p-3 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-wrap overflow-x-auto">
{`Business Name: OffbeatDestination Travels
Tagline: A better way to explore
Location: Arithang, Gangtok, Sikkim - 737102
Contact Numbers: +91 62961 02341 / +91 98513 70773
Reputation: Government-registered travel agency in Sikkim, 4.9-star rating based on 500+ reviews. Known for flawless planning, professional drivers, and clean Innova Crysta cars.

Core Offerings & Itineraries:
1. 5 Nights / 6 Days Sikkim & Darjeeling Tour: Covers Darjeeling tea gardens & city tour, Gangtok sightseeing, Tsomgo Lake & Nathula Pass.
2. North Sikkim Tours: Lachung, Yumthang Valley, Zero Point, and Mount Katao with full permit assistance.
3. South & West Sikkim Offbeat Routes: Namthang village stays, Tarey Bhir, Ravangla Buddha Park, Temi Tea Garden, and Pelling Skywalk.
4. Custom Bhutan Cultural Tours.
5. Cab Rentals: Dedicated private pickups from NJP Station and Bagdogra Airport (IXB) using Innova Crystas, Xylos, Swift Dzires, and WagonR cabs.

Special Preferences Handled:
- Pure vegetarian meal coordination (AP and MAP plans).
- Safe, stable monsoon and seasonal routes.
- Family and couple-friendly custom itineraries.`}
              </pre>
            </div>
          </div>
        )}

        {/* Step 3 Content */}
        {activeTab === 'step3' && (
          <div className="space-y-4 text-xs leading-relaxed animate-fadeIn">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Automated Lead Notifications</span>
            </h3>
            <p className="text-slate-300">
              To ensure no customer lead is ever lost, connect your chatbot tool to WhatsApp Business API or Email Notifications:
            </p>

            <ul className="space-y-2">
              <li className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Instant Phone Ping:</strong> Whenever a visitor submits their phone/WhatsApp number in chat, receive an immediate alert containing travel dates and group size.
                </div>
              </li>
              <li className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Auto WhatsApp Reply:</strong> Sends an automated greeting to the traveler's WhatsApp with a link to download the 5N/6D itinerary PDF.
                </div>
              </li>
            </ul>
          </div>
        )}

        {/* Step 4 Content */}
        {activeTab === 'step4' && (
          <div className="space-y-4 text-xs leading-relaxed animate-fadeIn">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Floating WhatsApp Button Setup</span>
            </h3>
            <p className="text-slate-300">
              In Hostinger's website builder, add a custom HTML element in the bottom-right corner of every page linked to:
            </p>
            <div className="p-3 bg-slate-950 border border-emerald-800 rounded-xl font-mono text-emerald-300">
              https://wa.me/916296102341?text=Namaste%20OffbeatDestination%20Travels!%20I%20want%20to%20plan%20a%20trip%20to%20Sikkim.
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleDownloadHostingerBundle}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download HTML Bundle</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

