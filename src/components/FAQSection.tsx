import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, CloudSun, PackageCheck, Car, Utensils, MessageCircle, Sparkles, Search } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface FAQItem {
  id: string;
  category: 'Permits' | 'Weather & Time' | 'Packing & Clothing' | 'Vehicles & Drivers' | 'Meals & Stays';
  question: string;
  answer: string;
  keyTakeaway?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Permits',
    question: 'How do I get Restricted Area Permits (RAP) for Nathula Pass, Tsomgo Lake, and Zero Point?',
    answer: 'Nathula Pass, Baba Mandir, Tsomgo Lake, and North Sikkim (Lachung, Lachen, Zero Point, Gurudongmar) are protected border regions requiring official army/state permits. OffbeatDestination Travels handles 100% of permit processing for you! All we need are 2 passport-size photographs and a clear government photo ID (Voter ID, Passport, or Driving License; Aadhaar is NOT accepted for Nathula Pass per army regulations).',
    keyTakeaway: 'Send documents 24 hours prior to Gangtok arrival. We deliver hardcopy permits to your driver.'
  },
  {
    id: 'faq-2',
    category: 'Permits',
    question: 'Are permits guaranteed for Nathula Pass and Zero Point?',
    answer: 'Permits are issued by the Sikkim Tourism & Civil Aviation Department and Indian Army based on weather conditions and border security clearance. During peak snowfall or severe landslides, the army may restrict access to Zero Point or Nathula Pass for safety. In such cases, we reroute to safe alternative scenic spots or issue a refund for the Nathula surcharge.',
    keyTakeaway: 'Nathula remains closed on Mondays & Tuesdays for maintenance.'
  },
  {
    id: 'faq-3',
    category: 'Weather & Time',
    question: 'What is the best month to visit Sikkim and Darjeeling?',
    answer: 'Sikkim is a year-round paradise with distinct seasonal charms: March to May offers blooming rhododendrons and pleasant 15°C–22°C temperatures. October to December guarantees crystal-clear skies with unobstructed views of Mount Kanchenjunga. January to February is ideal for snow lovers in Yumthang and Zero Point.',
    keyTakeaway: 'March–May for flowers, Oct–Dec for clear Himalayan peaks, Jan–Feb for heavy snow.'
  },
  {
    id: 'faq-4',
    category: 'Weather & Time',
    question: 'Is it safe to travel during monsoon (July – September)?',
    answer: 'While heavy rains occur in lower foot-hills, Gangtok and South/West Sikkim remain very accessible. Our hill-experienced drivers monitor Teesta river water levels and real-time highway updates to ensure complete safety. We recommend Innova Crystas or 4x4 vehicles for monsoon mountain journeys.',
    keyTakeaway: 'Always keep 1 buffer day if traveling to high-altitude North Sikkim in monsoon.'
  },
  {
    id: 'faq-5',
    category: 'Packing & Clothing',
    question: 'What clothing should I pack for high-altitude Zero Point and Nathula Pass?',
    answer: 'High-altitude areas (14,000 ft +) remain freezing even in summer! Pack thermal innerwear, a heavy windproof jacket, woollen gloves, skull cap, and warm socks. Heavy snow boots and overcoats are also available for rental at Tsomgo Lake and Yumthang Valley stalls for ₹100–₹150.',
    keyTakeaway: 'Layering is key: Thermal inner + Fleece jacket + Heavy outer down jacket.'
  },
  {
    id: 'faq-6',
    category: 'Packing & Clothing',
    question: 'What essential medicines and documents should I carry?',
    answer: 'Carry personal routine medicines along with Diamox (for high-altitude sickness upon doctor advice), camphor sachets or small oxygen cans for high passes, motion sickness tablets (Avomine for winding roads), 6 physical copies of ID proofs, and 6 passport photos per person.',
    keyTakeaway: 'ATM connectivity is limited in North Sikkim; carry sufficient cash in Gangtok.'
  },
  {
    id: 'faq-7',
    category: 'Vehicles & Drivers',
    question: 'What cab options do you offer for NJP / Bagdogra Airport (IXB) pickup and local sightseeing?',
    answer: 'We maintain a fleet of immaculate, luxury Toyota Innova Crystas (6+1 captain seaters), Mahindra Xylos/Scorpios 4x4, 4-seater Swift Dzire sedans, and Maruti WagonR/Swift hatchbacks. All vehicles are registered local Sikkim tourist commercial cabs with dual AC, spacious luggage racks, and hill-certified local drivers.',
    keyTakeaway: 'Includes driver allowance, toll taxes, fuel, and Sikkim state permits.'
  },
  {
    id: 'faq-8',
    category: 'Meals & Stays',
    question: 'What Pure Veg, Jain, and Non-Veg food options are provided in your tour packages?',
    answer: 'We provide fully customizable AP (Breakfast + Lunch + Dinner) and MAP (Breakfast + Dinner) meal plans to suit all dietary preferences: \n1) Pure Veg & Strict Jain Food: Prepared without onion, garlic, or root vegetables in dedicated hygienic cookware.\n2) Non-Veg Delicacies: Wholesome local preparations including fresh local chicken curry, Teesta river trout fish, and authentic local momos & thukpa.\n3) Vegetarian Comfort: Fresh hill vegetables, dal tadka, paneer delicacies, and hot rotis.',
    keyTakeaway: 'Notify us during booking so our Gangtok coordinator locks in your exact dietary preferences with partner hotel chefs.'
  },
  {
    id: 'faq-9',
    category: 'Meals & Stays',
    question: 'How is strict Jain food (no onion, no garlic, no root vegetables) handled in remote Lachung / Lachen?',
    answer: 'In high-altitude North Sikkim (Lachung and Lachen), our partner homestays and hotels prepare fresh, piping hot Jain meals using separate utensils. Dishes include steamed rice, yellow dal fry, seasonal hill vegetable curry (no potato/onion/garlic), and hot rotis.',
    keyTakeaway: 'Fresh, hygienic Jain meal plans are 100% guaranteed even in remote North Sikkim.'
  }
];

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Generate JSON-LD Schema markup for Google Rich Results FAQ structured data
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const categories = ['All', 'Permits', 'Weather & Time', 'Packing & Clothing', 'Vehicles & Drivers', 'Meals & Stays'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.keyTakeaway && item.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesQuery;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs-section" className="py-16 bg-[#FAF9F6] text-[#17202A] border-t border-[#E6E2D9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="editorial-eyebrow">ESSENTIAL TRAVEL INFORMATION</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1F3A]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Clear answers about Sikkim permits, weather, clothing, Innova cab rentals, and meal plans.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-white p-4 rounded border border-[#E6E2D9] shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0B1F3A] text-white font-bold'
                    : 'bg-[#FAF9F6] text-slate-700 hover:bg-slate-100 border border-[#E6E2D9]'
                }`}
              >
                {cat === 'All' ? 'All Topics' : cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search 'Nathula permit', 'clothing', 'Innova'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E6E2D9] rounded pl-10 pr-8 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0B1F3A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-slate-400 hover:text-slate-800 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`bg-white border rounded transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#0B1F3A] shadow-md'
                    : 'border-[#E6E2D9] hover:border-slate-400'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#C6A15B] uppercase tracking-wider block mb-0.5">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-[#0B1F3A]">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`p-1 text-slate-500 transition-transform ${isOpen ? 'rotate-180 text-[#0B1F3A]' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-[#E6E2D9] space-y-3 font-sans">
                    <p className="pt-3">{faq.answer}</p>

                    {faq.keyTakeaway && (
                      <div className="p-3 bg-[#FAF9F6] rounded border border-[#E6E2D9] text-[#0B1F3A] flex items-start gap-2 text-xs">
                        <span className="font-bold text-[#C6A15B] flex-shrink-0">Key Note:</span>
                        <span>{faq.keyTakeaway}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="p-6 bg-[#0B1F3A] text-white rounded border border-[#E6E2D9] text-center space-y-3">
          <h3 className="font-serif font-bold text-lg text-[#FAF9F6]">
            Have a Specific Question About Your Itinerary?
          </h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto font-sans">
            Our Gangtok team is directly reachable via WhatsApp or Phone to guide you on permits, cab requirements, and hotel bookings.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={`https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=Namaste!%20I%20have%20a%20question%20about%20Sikkim%20travel.`}
              target="_blank"
              rel="noreferrer"
              className="btn-luxury-gold text-xs !py-2 !px-4"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Gangtok Team</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
