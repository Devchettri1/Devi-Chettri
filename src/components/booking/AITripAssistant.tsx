import React, { useState } from 'react';
import { Sparkles, Bot, Send, CheckCircle2, MapPin, Compass, AlertCircle, ShieldCheck, ThermometerSnowflake, FileText, ArrowRight } from 'lucide-react';
import { TOUR_OPTIONS, HOTEL_CATEGORIES, VEHICLE_OPTIONS } from './pricingEngine';

interface AITripAssistantProps {
  onApplyPlan: (plan: {
    tourId: string;
    hotelCategoryId: string;
    vehicleModel: string;
    adults: number;
    notes: string;
  }) => void;
}

export const AITripAssistant: React.FC<AITripAssistantProps> = ({ onApplyPlan }) => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<
    Array<{
      sender: 'user' | 'ai';
      text: string;
      suggestedPlan?: {
        tourId: string;
        tourName: string;
        hotelCategoryId: string;
        hotelName: string;
        vehicleModel: string;
        adults: number;
        reasoning: string;
      };
      bulletPoints?: string[];
    }>
  >([
    {
      sender: 'ai',
      text: 'Namaste! I am your AI Himalayan Travel Concierge. Tell me your travel style, duration, budget, or family details, and I will craft an optimal itinerary with permit rules, vehicle choice, and offbeat recommendations.',
      bulletPoints: [
        'Family with senior citizens or children (smooth altitude acclimation)',
        'Adventure couples seeking snow at Gurudongmar & Zero Point',
        'Historic Old Silk Route & Zuluk 32 hairpin turns',
        'High-end luxury resort retreats with heated pools & spa',
      ],
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleAskAI = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToUse = customPrompt || query;
    if (!promptToUse.trim()) return;

    // Add user message
    const userMsg = { sender: 'user' as const, text: promptToUse };
    setConversation((prev) => [...prev, userMsg]);
    setQuery('');
    setIsThinking(true);

    // Call server AI Concierge endpoint or fallback to smart local rules
    try {
      const res = await fetch('/api/ai/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          context: 'OffbeatDestination Travels Himalayan Booking & Concierge',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setConversation((prev) => [
            ...prev,
            {
              sender: 'ai',
              text: data.reply,
              suggestedPlan: data.suggestedPlan,
              bulletPoints: data.bulletPoints,
            },
          ]);
          setIsThinking(false);
          return;
        }
      }
    } catch {
      // Fallback below
    }

    // Smart Local Expert Rule-based generator
    setTimeout(() => {
      const lower = promptToUse.toLowerCase();
      let replyText = '';
      let suggestedPlan = undefined;
      let bulletPoints: string[] = [];

      if (lower.includes('family') || lower.includes('kids') || lower.includes('senior') || lower.includes('child')) {
        replyText =
          'For family travel with kids or senior citizens, we prioritize gradual elevation gains, comfortable broad-seat Innova Crysta transfers, and 4-star heated mountain view stays with 24/7 hot water.';
        suggestedPlan = {
          tourId: 'pkg-5n6d-sikkim-darjeeling',
          tourName: '5N/6D Sikkim & Darjeeling Classic',
          hotelCategoryId: 'premium',
          hotelName: '4-Star Premium Mountain View Resorts (Sterling / Udaan)',
          vehicleModel: 'Toyota Innova Crysta',
          adults: 4,
          reasoning: 'Gentle altitudes, Tiger Hill sunrise, toy train experience, and zero strenuous rough passes.',
        };
        bulletPoints = [
          'Stay: Gangtok (3N) + Darjeeling (2N) in premium view suites',
          'Vehicle: Toyota Innova Crysta with luggage rack & experienced hill chauffeur',
          'Permits: Fast-track Tsomgo Lake army clearance included',
          'Medical: Pre-stocked portable oxygen canister in vehicle',
        ];
      } else if (lower.includes('north sikkim') || lower.includes('snow') || lower.includes('gurudongmar') || lower.includes('zero point') || lower.includes('adventure')) {
        replyText =
          'North Sikkim is breathtaking! For high altitude passes like Gurudongmar Lake (17,800 ft) and Zero Point (15,300 ft), heavy 4x4 vehicles and warm layered clothing are mandatory.';
        suggestedPlan = {
          tourId: 'pkg-north-sikkim-special',
          tourName: '4N/5D North Sikkim Special: Lachen, Lachung, Gurudongmar & Zero Point',
          hotelCategoryId: 'deluxe',
          hotelName: 'Deluxe Cozy Wooden Lodges in Lachung & Lachen',
          vehicleModel: 'Mahindra Scorpio / Xylo 4x4',
          adults: 2,
          reasoning: 'Heavy-duty 4WD vehicle for snow trails; Protected Area Permits processed directly via Gangtok DM office.',
        };
        bulletPoints = [
          'Stay: 2N Gangtok + 1N Lachen + 1N Lachung with hot AP meals',
          'Vehicle: Heavy 4WD Scorpio with snow-chain capability',
          'Permit: Protected Area Permit (PAP) with 2 passport photos & Voter ID/Passport',
          'Essential Gear: Thermal thermals, windproof jacket, dark UV sunglasses, Diamox for altitude',
        ];
      } else if (lower.includes('silk route') || lower.includes('zuluk') || lower.includes('offbeat')) {
        replyText =
          'The Old Silk Route is our signature specialty! Experience the historic trade route with 32 hairpin turns, Thambi Viewpoint sunrise, and Kupup Elephant Lake.';
        suggestedPlan = {
          tourId: 'pkg-silk-route-zuluk',
          tourName: '4N/5D Historic Old Silk Route Zuluk Expedition',
          hotelCategoryId: 'deluxe',
          hotelName: 'Authentic Village Homestays & Cloud Chalets',
          vehicleModel: 'Toyota Innova Crysta',
          adults: 2,
          reasoning: 'Homestyle organic Sikkimese hospitality, roaring bonfires, and misty pine valleys.',
        };
        bulletPoints = [
          'Route: Reshi Khola (1N) -> Zuluk (1N) -> Nathang Valley -> Gangtok (2N)',
          'Permit: Rongli SDPO Inner Line Permit arranged seamlessly by our team',
          'Highlights: Thambi Kanchenjunga sunrise & Old Baba Mandir',
        ];
      } else {
        replyText =
          'I have analyzed your Himalayan getaway parameters. Here is a curated, high-comfort package crafted with our most celebrated destinations, certified vehicle chauffeur, and luxury stays.';
        suggestedPlan = {
          tourId: 'pkg-5n6d-sikkim-darjeeling',
          tourName: '5N/6D Sikkim & Darjeeling Luxury Heritage',
          hotelCategoryId: 'luxury',
          hotelName: '5-Star Heritage & Spa Resorts (Mayfair / Elgin)',
          vehicleModel: 'Toyota Innova Crysta',
          adults: 2,
          reasoning: 'Highest customer satisfaction rating (4.9/5.0) with panoramic Kanchenjunga views.',
        };
        bulletPoints = [
          'All Sikkim & Darjeeling iconic sights covered',
          '24/7 dedicated local trip coordinator in Gangtok',
          'Complimentary tea estate walk & high-tea tasting session',
        ];
      }

      setConversation((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          suggestedPlan,
          bulletPoints,
        },
      ]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-700/50 text-cyan-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm">AI Himalayan Concierge & Planner</h4>
            <p className="text-[10px] text-slate-400">Instant custom itinerary, weather advisories & smart package suggestions.</p>
          </div>
        </div>

        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI Active
        </span>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-1.5">
        {[
          'Best 5-Day Trip for Family with Kids',
          'North Sikkim Snow & Gurudongmar (17,800 ft)',
          'Old Silk Route Zuluk & 32 Hairpin Turns',
          'Luxury Honeymoon with Mayfair Spa Stays',
        ].map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAskAI(undefined, prompt)}
            className="px-2.5 py-1 bg-slate-900/80 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-700 text-[10px] text-slate-300 hover:text-cyan-300 rounded-lg transition-all"
          >
            ✦ {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[92%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-slate-950 font-medium'
                  : 'bg-[#060B18] border border-slate-800 text-slate-200 shadow-md'
              }`}
            >
              <p className="text-xs">{msg.text}</p>

              {msg.bulletPoints && msg.bulletPoints.length > 0 && (
                <ul className="mt-2 space-y-1 pt-1.5 border-t border-slate-800/80 text-[11px] text-slate-300">
                  {msg.bulletPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {msg.suggestedPlan && (
                <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-cyan-950/80 to-slate-950 border border-cyan-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                      ✨ AI Recommended Configuration
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">100% Guaranteed Stays</span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <div>
                      <span className="text-slate-400">Tour Circuit: </span>
                      <span className="font-bold text-slate-100">{msg.suggestedPlan.tourName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Hotel Category: </span>
                      <span className="text-slate-200">{msg.suggestedPlan.hotelName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Vehicle: </span>
                      <span className="text-cyan-300 font-mono">{msg.suggestedPlan.vehicleModel}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onApplyPlan({
                        tourId: msg.suggestedPlan!.tourId,
                        hotelCategoryId: msg.suggestedPlan!.hotelCategoryId,
                        vehicleModel: msg.suggestedPlan!.vehicleModel,
                        adults: msg.suggestedPlan!.adults,
                        notes: `AI Suggested: ${msg.suggestedPlan!.reasoning}`,
                      })
                    }
                    className="w-full mt-1.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Apply This Plan to My Booking Form</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 p-3 bg-[#060B18] border border-slate-800 rounded-2xl w-max text-xs text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>Consulting Himalayan weather, road terrain & permit rules...</span>
          </div>
        )}
      </div>

      {/* Input Query Bar */}
      <form onSubmit={handleAskAI} className="flex gap-2 pt-1">
        <input
          type="text"
          placeholder="Ask AI (e.g. 'I have 6 days in May with my wife, want snow & luxury stay')..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!query.trim() || isThinking}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
};
