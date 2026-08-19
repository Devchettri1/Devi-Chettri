import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, CloudSun, PackageCheck, Car, Utensils, MessageCircle, Sparkles, Search } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';
import { SIKKIM_TOUR_FAQS, FAQItem } from '../data/faqData';

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-permits-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Generate JSON-LD Schema markup for Google Rich Results FAQ structured data
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SIKKIM_TOUR_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const categories = [
    'All',
    'Permits',
    'Tour Packages',
    'Weather & Time',
    'Packing & Clothing',
    'Vehicles & Drivers',
    'Meals & Stays',
    'Booking & Policy',
  ];

  const filteredFaqs = SIKKIM_TOUR_FAQS.filter((item) => {
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
