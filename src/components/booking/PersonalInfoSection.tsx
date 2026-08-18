import React from 'react';
import { User, Phone, Mail, MapPin, Plane, Tag, Compass, Sparkles } from 'lucide-react';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { BookingFormData } from './BookingTypes';

interface PersonalInfoSectionProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  register,
  errors,
  watch,
  setValue,
}) => {
  const currentCoupon = watch('couponCode');

  const handleQuickCoupon = (code: string) => {
    setValue('couponCode', code);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>Primary Traveler Details</span>
        </h4>
        <span className="text-[10px] text-slate-400 font-mono">Step 1 of 4</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
        {/* Full Name */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
            <span>Full Name</span>
            <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Vikramaditya Sharma"
              {...register('fullName')}
              className={`w-full bg-[#060B18] border ${
                errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } rounded-xl pl-9 pr-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all`}
            />
          </div>
          {errors.fullName && (
            <p className="text-[10px] text-rose-400 mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* WhatsApp Phone */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
            <span>WhatsApp Number</span>
            <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              {...register('whatsappNumber')}
              className={`w-full bg-[#060B18] border ${
                errors.whatsappNumber ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
              } rounded-xl pl-9 pr-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all font-mono`}
            />
          </div>
          {errors.whatsappNumber && (
            <p className="text-[10px] text-rose-400 mt-1">{errors.whatsappNumber.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
            <span>Email Address (For PDF Itinerary)</span>
            <span className="text-[10px] text-slate-500">Optional</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="e.g. traveler@gmail.com"
              {...register('email')}
              className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Country / State */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">
            <span>Home State / Country</span>
          </label>
          <div className="relative">
            <Compass className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. Maharashtra, India / USA"
              {...register('country')}
              className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Pickup & Drop Points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs pt-1">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Pickup Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              {...register('pickupLocation')}
              className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-slate-100 focus:outline-none transition-all"
            >
              <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
              <option value="NJP Railway Station (New Jalpaiguri)">NJP Railway Station (New Jalpaiguri)</option>
              <option value="Pakyong Airport (Sikkim)">Pakyong Airport (PYG Sikkim)</option>
              <option value="Siliguri City / Hotel">Siliguri City / Hotel</option>
              <option value="Gangtok Hotel Pickup">Gangtok City Hotel</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Drop Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              {...register('dropLocation')}
              className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-slate-100 focus:outline-none transition-all"
            >
              <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
              <option value="NJP Railway Station (New Jalpaiguri)">NJP Railway Station (New Jalpaiguri)</option>
              <option value="Pakyong Airport (Sikkim)">Pakyong Airport (PYG Sikkim)</option>
              <option value="Darjeeling City">Darjeeling City Drop</option>
              <option value="Gangtok Hotel Drop">Gangtok City Drop</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flight / Train Number & Coupon Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs pt-1">
        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Plane className="w-3.5 h-3.5 text-cyan-400" />
              <span>Arrival Flight / Train Info</span>
            </span>
            <span className="text-[10px] text-slate-500">Optional</span>
          </label>
          <input
            type="text"
            placeholder="e.g. 6E-205 (Arriving 11:30 AM)"
            {...register('arrivalFlight')}
            className="w-full bg-[#060B18] border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>Promo Coupon Code</span>
            </span>
            <span className="text-[10px] text-amber-400 font-bold">Save up to 10%</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. SIKKIM2026"
              {...register('couponCode')}
              className="flex-1 bg-[#060B18] border border-slate-800 focus:border-amber-500 rounded-xl px-3 py-2 text-slate-100 uppercase font-mono placeholder:text-slate-600 focus:outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => handleQuickCoupon('SIKKIM2026')}
              className="px-2.5 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-600/40 text-amber-300 rounded-xl text-[10px] font-bold transition-all"
            >
              Apply 'SIKKIM2026'
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
