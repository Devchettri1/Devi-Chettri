import React from 'react';
import officialLogoImg from '../assets/images/official_logo.jpg';

interface LogoProps {
  variant?: 'light' | 'dark' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  mode?: 'image' | 'combined' | 'svg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
  mode = 'combined',
}) => {
  // Size mapping
  const imgSizes = {
    sm: 'h-8 w-auto',
    md: 'h-11 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto',
  }[size];

  const iconDimensions = {
    sm: { width: 48, height: 32 },
    md: { width: 68, height: 44 },
    lg: { width: 96, height: 62 },
    xl: { width: 140, height: 90 },
  }[size];

  const titleSizes = {
    sm: 'text-sm font-serif font-bold tracking-tight',
    md: 'text-lg font-serif font-bold tracking-tight',
    lg: 'text-2xl font-serif font-bold tracking-tight',
    xl: 'text-3xl font-serif font-bold tracking-tight',
  }[size];

  const sloganSizes = {
    sm: 'text-[10px]',
    md: 'text-[12px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  // Colors
  const titleColor = variant === 'dark' ? 'text-slate-900' : 'text-slate-100';
  const sloganColor = variant === 'dark' ? 'text-slate-700 font-semibold' : 'text-slate-200 font-medium';
  const ruleColor = variant === 'dark' ? 'border-slate-400' : 'border-slate-500/80';

  if (mode === 'image') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src={officialLogoImg}
          alt="Offbeat Destination Travels Logo"
          className={`${imgSizes} object-contain rounded-lg shadow-md border border-amber-500/30`}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Image Badge Logo */}
      <img
        src={officialLogoImg}
        alt="Offbeat Destination Travels Emblem"
        className={`${imgSizes} object-contain rounded-lg shadow-lg border border-amber-500/40 hover:scale-105 transition-transform`}
      />

      {/* Brand Name & Slogan */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-serif leading-tight tracking-wide ${titleColor} ${titleSizes}`}>
            Offbeat Destination Travels
          </span>

          <div className="flex items-center gap-2 mt-0.5">
            <span className={`h-px flex-1 border-t ${ruleColor}`} />
            <span className={`font-serif italic font-medium tracking-wider whitespace-nowrap ${sloganColor} ${sloganSizes}`}>
              A Better Way to Explore
            </span>
            <span className={`h-px flex-1 border-t ${ruleColor}`} />
          </div>
        </div>
      )}
    </div>
  );
};

