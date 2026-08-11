import React from 'react';
import { Building2, Users, ShieldCheck, Award, Sparkles, CheckCircle2, MessageCircle, ArrowRight, FileText, PhoneCall } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface CorporateGroupBannerProps {
  onOpenInquiry?: () => void;
}

export const CorporateGroupBanner: React.FC<CorporateGroupBannerProps> = ({ onOpenInquiry }) => {
  const corporateWhatsappMsg = encodeURIComponent(
    `Namaste ${AGENCY_DETAILS.name}! We want to inquire about a Corporate / Large Group Tour Package for Sikkim & Darjeeling. Please share group discounts, hotel availability, and GST proposal details.`
  );
  const whatsappUrl = `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${corporateWhatsappMsg}`;

  return (
    <section className="relative overflow-hidden py-8 px-4 sm:px-6 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border-y border-emerald-500/30 text-white my-6 shadow-2xl">
      {/* Background Decorative Element */}
      <div className="absolute -right-12 -top-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          
          {/* Main Copy & Features */}
          <div className="flex-1 min-w-[300px] space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Special Corporate & Group Tour Offers</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
              Corporate Offsites, MICE & Large Group Tours <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">Available!</span>
            </h2>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Planning a company retreat, incentive trip, or large family group tour (10 to 200+ guests) in Sikkim & Darjeeling? Get tailored bulk group rates, GST tax invoices, and dedicated fleet management.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold">Exclusive Bulk Discounts</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="font-bold">GST Billing & Tax Invoices</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold">On-Ground Tour Coordinator</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2.5 shadow-lg hover:shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-current text-white" />
              <span>Corporate WhatsApp Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            {onOpenInquiry && (
              <button
                onClick={onOpenInquiry}
                className="px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <PhoneCall className="w-4 h-4 text-teal-400" />
                <span>Request Custom Proposal</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
