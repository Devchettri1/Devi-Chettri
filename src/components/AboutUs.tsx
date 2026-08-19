import React from 'react';
import { AGENCY_DETAILS, REVIEWS } from '../data/travelData';
import { ShieldCheck, Star, MapPin, Award, Users, ThumbsUp, Quote, CheckCircle2, Globe } from 'lucide-react';
import { agencyPosterDark, gmbOfficePhoto, googleReviewBadge } from '../assets/images';

export const AboutUs: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B0F0E] text-[#F5F1E8] border-b border-[#D6B36A]/20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        {/* Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <p className="luxury-eyebrow">REGISTERED SIKKIM AGENCY</p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F1E8] tracking-tight leading-tight">
              About {AGENCY_DETAILS.name}
            </h2>

            <p className="text-[#F5F1E8] text-sm sm:text-base leading-relaxed">
              Founded and operated directly out of Gangtok, Sikkim, <strong className="text-[#D6B36A]">OffbeatDestination Travels</strong> lives by our core philosophy: <em className="text-[#D6B36A] font-serif">"{AGENCY_DETAILS.tagline}"</em>.
            </p>

            <p className="text-[#A9AAA4] text-xs sm:text-sm leading-relaxed">
              Navigating the pristine yet challenging terrain of the Eastern Himalayas requires deep local knowledge, verified Restricted Area Permits, and reliable mountain-hardened vehicles. Whether it is securing Nathula Pass border permits, organizing pure vegetarian AP meals in Lachung, or providing plush Toyota Innova Crysta transfers from Bagdogra and NJP, our local Gangtok concierge team ensures a 100% stress-free journey.
            </p>

            {/* Official Registration & License Certificate Card */}
            <div className="p-6 bg-[#111513] rounded-xl border border-[#D6B36A]/30 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6B36A]/20 pb-3">
                <div className="flex items-center gap-2 text-[#D6B36A] font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-5 h-5 text-[#D6B36A] flex-shrink-0" />
                  <span>{AGENCY_DETAILS.govtRegistration}</span>
                </div>
                <span className="text-[11px] font-bold bg-[#18352D] text-[#D6B36A] px-2.5 py-0.5 rounded border border-[#D6B36A]/30">
                  {AGENCY_DETAILS.validity}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#A9AAA4]">
                <div>
                  <span className="text-[#A9AAA4] block text-[11px]">Registered Legal Name:</span>
                  <strong className="text-[#F5F1E8] font-semibold">{AGENCY_DETAILS.legalName}</strong>
                </div>
                <div>
                  <span className="text-[#A9AAA4] block text-[11px]">Official Registration / License No:</span>
                  <strong className="text-[#D6B36A] font-mono font-bold">{AGENCY_DETAILS.licenseNo}</strong>
                </div>
                <div>
                  <span className="text-[#A9AAA4] block text-[11px]">Proprietor / Founder:</span>
                  <strong className="text-[#F5F1E8]">{AGENCY_DETAILS.proprietor}</strong>
                  <span className="block text-[11px] text-[#D6B36A] font-mono">{AGENCY_DETAILS.ownerEmail}</span>
                </div>
                <div>
                  <span className="text-[#A9AAA4] block text-[11px]">Issuing Authority:</span>
                  <strong className="text-[#F5F1E8]">{AGENCY_DETAILS.issuingAuthority}</strong>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#D6B36A]/15 text-xs text-[#A9AAA4]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
                  <span><strong className="text-[#F5F1E8]">Head Office:</strong> {AGENCY_DETAILS.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D6B36A] flex-shrink-0" />
                  <span><strong className="text-[#F5F1E8]">Official Web Portal:</strong> <a href={AGENCY_DETAILS.websiteUrl} target="_blank" rel="noreferrer" className="text-[#D6B36A] hover:underline font-bold">{AGENCY_DETAILS.domain}</a></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2 text-center">
              <div className="p-4 bg-[#111513] rounded-xl border border-[#D6B36A]/20">
                <span className="block text-2xl font-extrabold text-[#D6B36A]">4.9★</span>
                <span className="text-[10px] text-[#A9AAA4] font-medium uppercase tracking-wider">500+ Reviews</span>
              </div>
              <div className="p-4 bg-[#111513] rounded-xl border border-[#D6B36A]/20">
                <span className="block text-2xl font-extrabold text-[#D6B36A]">100%</span>
                <span className="text-[10px] text-[#A9AAA4] font-medium uppercase tracking-wider">Permit Guarantee</span>
              </div>
              <div className="p-4 bg-[#111513] rounded-xl border border-[#D6B36A]/20">
                <span className="block text-2xl font-extrabold text-[#D6B36A]">15+</span>
                <span className="text-[10px] text-[#A9AAA4] font-medium uppercase tracking-wider">Innova Fleet</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-[#D6B36A]/30 shadow-2xl group">
              <img
                src={agencyPosterDark}
                alt="OffbeatDestination Travels Official Poster"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E] via-[#0B0F0E]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#111513]/90 backdrop-blur-md rounded-lg border border-[#D6B36A]/30 text-xs">
                <div className="flex items-center gap-1.5 text-[#D6B36A] font-bold mb-1">
                  <Star className="w-4 h-4 fill-[#D6B36A] text-[#D6B36A]" />
                  <span>4.9★ Rated Official Travel Operator</span>
                </div>
                <p className="text-[#A9AAA4] text-[11px] italic leading-relaxed">
                  "No middle-man agents. Directly deal with Gangtok locals who care about your comfort, safety and authentic Himalayan memories."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg overflow-hidden border border-[#D6B36A]/20 h-28 relative group">
                <img
                  src={gmbOfficePhoto}
                  alt="Google My Business Registered Storefront Office"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0B0F0E]/50 flex items-end p-2">
                  <span className="text-[10px] font-bold text-[#F5F1E8] bg-[#18352D] px-2 py-0.5 rounded border border-[#D6B36A]/30">
                    GMB Office Photo
                  </span>
                </div>
              </div>

              <a
                href={AGENCY_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg overflow-hidden border border-[#D6B36A]/30 h-28 relative bg-[#111513] p-2 flex flex-col items-center justify-center text-center group hover:border-[#D6B36A] transition-colors shadow-lg"
              >
                <img
                  src={googleReviewBadge}
                  alt="Review Us On Google"
                  referrerPolicy="no-referrer"
                  className="max-h-12 object-contain mb-1 group-hover:scale-105 transition-transform"
                />
                <span className="text-[10px] font-bold text-[#D6B36A] group-hover:underline flex items-center gap-1">
                  <span>Verify on Google Maps</span>
                  <Globe className="w-3 h-3 text-[#D6B36A]" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-8 pt-8 border-t border-[#D6B36A]/20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <p className="luxury-eyebrow">TESTIMONIALS</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5F1E8]">
              Verified Traveler Reviews
            </h3>
            <p className="text-xs sm:text-sm text-[#A9AAA4]">
              Real experiences from families, honeymoon couples, and corporate groups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#111513] p-6 rounded-xl border border-[#D6B36A]/20 space-y-4 relative flex flex-col justify-between hover:border-[#D6B36A]/40 transition-colors"
              >
                <Quote className="w-8 h-8 text-[#D6B36A]/20 absolute top-4 right-4" />

                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D6B36A]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D6B36A] text-[#D6B36A]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#A9AAA4] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D6B36A]/15 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#F5F1E8]">{rev.author}</h4>
                    <span className="text-[10px] text-[#A9AAA4]">{rev.location}</span>
                  </div>
                  <span className="text-[10px] bg-[#18352D] text-[#D6B36A] px-2 py-0.5 rounded border border-[#D6B36A]/30 font-medium">
                    {rev.packageTaken}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
