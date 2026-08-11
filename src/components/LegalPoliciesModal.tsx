import React, { useState } from 'react';
import { X, ShieldCheck, FileText, AlertTriangle, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/travelData';

interface LegalPoliciesModalProps {
  initialTab?: 'privacy' | 'terms' | 'cancellation' | 'payment';
  onClose: () => void;
}

export const LegalPoliciesModal: React.FC<LegalPoliciesModalProps> = ({
  initialTab = 'privacy',
  onClose,
}) => {
  const [tab, setTab] = useState<'privacy' | 'terms' | 'cancellation' | 'payment'>(initialTab);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-800/50 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-scaleUp">
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">{AGENCY_DETAILS.name} Legal Policies</h2>
              <p className="text-xs text-slate-400">
                {AGENCY_DETAILS.govtRegistration}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 text-xs overflow-x-auto">
          <button
            onClick={() => setTab('privacy')}
            className={`px-4 py-3 font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              tab === 'privacy'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setTab('terms')}
            className={`px-4 py-3 font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              tab === 'terms'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>

          <button
            onClick={() => setTab('cancellation')}
            className={`px-4 py-3 font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              tab === 'cancellation'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Cancellation & Refunds</span>
          </button>

          <button
            onClick={() => setTab('payment')}
            className={`px-4 py-3 font-bold border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              tab === 'payment'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payment Policy</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {tab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                Privacy Policy
              </h3>
              <p>
                At <strong>{AGENCY_DETAILS.name}</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website or book travel services.
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider text-emerald-400">
                  1. Information We Collect
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>Contact Details: Name, phone number, WhatsApp number, email address.</li>
                  <li>Identification Documents: Aadhaar, Voter ID, Passport copies required strictly for Sikkim Protected Area Permits (Nathula Pass, North Sikkim, Zero Point).</li>
                  <li>Travel Preferences: Hotel choices, vehicle preferences, meal restrictions (Pure Veg/Jain).</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider text-emerald-400">
                  2. How We Use Your Information
                </h4>
                <p>
                  Your information is used exclusively for issuing Sikkim Tourism & Army permits, reserving private vehicle drivers, booking hotel stays, and sending instant WhatsApp trip updates. We <strong>never sell, lease, or share</strong> your personal details with third-party marketing companies.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider text-emerald-400">
                  3. Government Security Compliance
                </h4>
                <p>
                  Permit documentation is transmitted through encrypted, secure channels directly to Sikkim Tourism & Army Permit Authorities in Gangtok.
                </p>
              </div>
            </div>
          )}

          {tab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Terms & Conditions
              </h3>
              <p>
                By booking a tour or cab rental with <strong>{AGENCY_DETAILS.name}</strong>, you agree to the following terms governed by the Sikkim Tourism & Civil Aviation Department rules.
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider text-emerald-400">
                  1. Permit Clearance & ID Requirements
                </h4>
                <p>
                  All foreign nationals and Indian tourists visiting restricted border areas (Nathula Pass, Tsomgo Lake, North Sikkim Lachung/Gurudongmar, Silk Route) must carry valid government-issued photo ID (Voter ID / Passport) and passport-size photographs. PAN card is NOT accepted as valid ID proof by army authorities.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider text-emerald-400">
                  2. Mandatory 2-Night Lachung Rule
                </h4>
                <p>
                  As per Sikkim Tourism guidelines, all North Sikkim itineraries covering Lachung, Yumthang Valley, and Zero Point must include a minimum <strong>2-Night stay in Lachung</strong> for high-altitude acclimatization and road safety.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider text-emerald-400">
                  3. Vehicle Rules
                </h4>
                <p>
                  Small cabs (Sedans/Hatchbacks) are strictly barred for North Sikkim and Nathula Pass routes. Only 4WD heavy SUVs (Innova Crysta, Scorpio, Xylo) are authorized.
                </p>
              </div>
            </div>
          )}

          {tab === 'cancellation' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Cancellation & Refund Policy
              </h3>
              <p>
                Mountain travel involves unpredictable weather conditions, landslides, and military road closures. Our cancellation policy is designed to be fair, transparent, and compliant with local Sikkim tourism standards.
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider">
                  Standard Cancellation Schedule
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="font-bold text-slate-200">30+ Days Before Trip:</span>
                    <p className="text-emerald-400">100% Refund (minus ₹1,000 admin processing fee)</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="font-bold text-slate-200">15–29 Days Before Trip:</span>
                    <p className="text-amber-400">75% Refund of total booking amount</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="font-bold text-slate-200">7–14 Days Before Trip:</span>
                    <p className="text-amber-500">50% Refund of total booking amount</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded border border-slate-800">
                    <span className="font-bold text-slate-200">Less than 7 Days / No Show:</span>
                    <p className="text-rose-400">Non-refundable (hotel & vehicle non-cancelable)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider text-emerald-400">
                  Landslides, Weather & Army Closure Rule
                </h4>
                <p>
                  If Nathula Pass, Zero Point, or North Sikkim roads are blocked due to heavy snowfall, landslides, or military orders:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>We will attempt an alternative route or sight (e.g. Namchi Char Dham, Pelling, or Gangtok local sights) subject to road feasibility.</li>
                  <li>If permits are denied by army authorities prior to departure, permit fees are refunded in full.</li>
                  <li>Vehicle charges for completed portions of the journey remain non-refundable.</li>
                </ul>
              </div>
            </div>
          )}

          {tab === 'payment' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                Payment & Deposit Policy
              </h3>
              <p>
                We offer flexible payment options for all custom packages and cab bookings.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 font-bold block text-xs">Booking Advance Deposit</strong>
                    <p className="text-slate-300 text-xs">
                      A <strong>30% advance deposit</strong> is required at the time of booking to lock hotel rooms, driver allocation, and initiate permit applications.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 font-bold block text-xs">Balance Payment</strong>
                    <p className="text-slate-300 text-xs">
                      The remaining <strong>70% balance</strong> is payable upon arrival in Gangtok or Siliguri prior to departure for North Sikkim / Nathula Pass.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-100 font-bold block text-xs">Accepted Payment Methods</strong>
                    <p className="text-slate-300 text-xs">
                      UPI (Google Pay, PhonePe, Paytm), Direct Bank Transfer (NEFT/RTGS/IMPS), Credit/Debit Cards, and GST Invoicing for Corporate / MICE bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">
            Official Inquiry: <strong className="text-emerald-400">{AGENCY_DETAILS.phonePrimary}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
