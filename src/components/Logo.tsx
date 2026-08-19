import React, { useState, useEffect } from 'react';
import { officialLogo } from '../assets/images';

const officialLogoImg = officialLogo;

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  mode?: 'image' | 'combined' | 'emblem' | 'full';
  customLogoUrl?: string;
}

/**
 * Built-in fallback SVG vector emblem matching the OffbeatDestination Travels visual identity.
 * Displays mountain peaks, radiant golden sunburst, lush green valley, and electric blue river.
 */
export const VectorLogoEmblem: React.FC<{ className?: string; size?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="vecSunGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#fffbeb" />
        <stop offset="50%" stopColor="#fde047" />
        <stop offset="80%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="vecRiver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="45%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="vecHill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#84cc16" />
        <stop offset="60%" stopColor="#65a30d" />
        <stop offset="100%" stopColor="#4d7c0f" />
      </linearGradient>
    </defs>

    {/* Circular Badge Background */}
    <circle cx="250" cy="250" r="242" fill="#ffffff" />
    <circle cx="250" cy="250" r="238" fill="#ffffff" stroke="#e2e8f0" strokeWidth="4" />
    <circle cx="250" cy="250" r="228" fill="none" stroke="#f1f5f9" strokeWidth="2" />

    {/* Radiant Sun & Rays */}
    <g transform="translate(186, 172)">
      <circle cx="0" cy="0" r="42" fill="url(#vecSunGlow)" />
      <circle cx="0" cy="0" r="14" fill="#fef08a" />
      <circle cx="0" cy="0" r="9" fill="#ffffff" />

      {/* Sun Rays */}
      <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
        <line x1="0" y1="-18" x2="0" y2="-38" />
        <line x1="0" y1="18" x2="0" y2="38" />
        <line x1="-18" y1="0" x2="-38" y2="0" />
        <line x1="18" y1="0" x2="38" y2="0" />
        <line x1="-13" y1="-13" x2="-28" y2="-28" strokeWidth="1.8" />
        <line x1="13" y1="13" x2="28" y2="28" strokeWidth="1.8" />
        <line x1="13" y1="-13" x2="28" y2="-28" strokeWidth="1.8" />
        <line x1="-13" y1="13" x2="-28" y2="28" strokeWidth="1.8" />
        <line x1="-7" y1="-16" x2="-15" y2="-34" strokeWidth="1.4" stroke="#fbbf24" />
        <line x1="7" y1="-16" x2="15" y2="-34" strokeWidth="1.4" stroke="#fbbf24" />
        <line x1="-16" y1="-7" x2="-34" y2="-15" strokeWidth="1.4" stroke="#fbbf24" />
        <line x1="16" y1="-7" x2="34" y2="-15" strokeWidth="1.4" stroke="#fbbf24" />
      </g>
    </g>

    {/* Mountain Peaks with Snow Ridge Facets */}
    {/* Left Peak */}
    <path d="M 118 232 L 186 186 L 214 204 L 160 236 Z" fill="#2c3e50" />
    <path d="M 186 186 L 214 204 L 194 202 Z" fill="#1a252f" />
    <path d="M 186 186 L 160 236 L 152 236 Z" fill="#ffffff" />

    {/* Main Peak */}
    <path d="M 212 206 L 276 146 L 320 198 L 260 216 Z" fill="#2c3e50" />
    <path d="M 276 146 L 320 198 L 290 190 Z" fill="#1a252f" />
    <path d="M 276 146 L 254 192 L 274 186 Z" fill="#ffffff" />

    {/* Right Peak */}
    <path d="M 320 198 L 342 182 L 424 252 L 350 232 Z" fill="#2c3e50" />
    <path d="M 342 182 L 424 252 L 372 238 Z" fill="#1a252f" />
    <path d="M 342 182 L 334 212 L 324 202 Z" fill="#ffffff" />

    {/* Curved Lime Green Hill */}
    <path d="M 80 252 Q 210 218 340 240 L 332 248 Q 206 226 80 258 Z" fill="url(#vecHill)" />

    {/* Flowing Electric Blue River */}
    <path
      d="M 242 208 Q 220 218 245 226 Q 280 234 328 248 Q 365 258 406 254 L 388 266 Q 348 266 312 254 Q 268 240 226 230 Q 206 222 234 212 Z"
      fill="url(#vecRiver)"
    />

    {/* Brand Title Text */}
    <text
      x="250"
      y="306"
      fontFamily="Georgia, 'Times New Roman', serif"
      fontSize="33"
      fontWeight="bold"
      fill="#0f2438"
      textAnchor="middle"
      letterSpacing="-0.2"
    >
      Offbeat Destination Travels
    </text>

    {/* Tagline & Accent Flanks */}
    <line x1="65" y1="332" x2="135" y2="332" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" />
    <text
      x="250"
      y="341"
      fontFamily="cursive, Georgia, serif"
      fontStyle="italic"
      fontSize="28"
      fontWeight="600"
      fill="#1e293b"
      textAnchor="middle"
    >
      A Better Way to Explore
    </text>
    <line x1="365" y1="332" x2="435" y2="332" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
  mode = 'combined',
  customLogoUrl,
}) => {
  const [imgErrorCount, setImgErrorCount] = useState<number>(0);
  const [dynamicLogo, setDynamicLogo] = useState<string | null>(() => {
    if (customLogoUrl) return customLogoUrl;
    try {
      return localStorage.getItem('offbeat_custom_logo') || null;
    } catch {
      return null;
    }
  });

  // Listen for real-time logo updates from admin panel
  useEffect(() => {
    const handleLogoUpdate = () => {
      try {
        const saved = localStorage.getItem('offbeat_custom_logo');
        setDynamicLogo(saved || null);
        setImgErrorCount(0);
      } catch {}
    };

    window.addEventListener('offbeat_logo_updated', handleLogoUpdate);
    return () => {
      window.removeEventListener('offbeat_logo_updated', handleLogoUpdate);
    };
  }, []);

  useEffect(() => {
    if (customLogoUrl) {
      setDynamicLogo(customLogoUrl);
      setImgErrorCount(0);
    }
  }, [customLogoUrl]);

  // Fallback chain for logo sources
  const logoSources = [
    dynamicLogo,
    officialLogoImg,
    '/logo.svg',
    '/logo.png',
    '/official_logo.png',
    '/official_logo.jpg',
  ].filter(Boolean) as string[];

  const currentImgSrc = logoSources[imgErrorCount] || null;

  const handleImageError = () => {
    setImgErrorCount((prev) => prev + 1);
  };

  const sizeConfigs = {
    sm: {
      badge: 'h-9 w-9 sm:h-10 sm:w-10',
      badgeFull: 'h-9 sm:h-10 px-2 py-0.5 min-w-[65px] sm:min-w-[75px]',
      img: 'h-7 sm:h-8 w-auto max-w-[80px] sm:max-w-[95px]',
      badgePadding: 'p-1',
      title: 'text-xs sm:text-sm md:text-base',
      subtitle: 'text-[8px] sm:text-[9px]',
      tagline: 'text-[8px] sm:text-[9px]',
    },
    md: {
      badge: 'h-10 w-10 sm:h-12 sm:w-12',
      badgeFull: 'h-10 sm:h-12 px-2 sm:px-2.5 py-0.5 sm:py-1 min-w-[75px] sm:min-w-[95px]',
      img: 'h-8 sm:h-10 w-auto max-w-[95px] sm:max-w-[125px]',
      badgePadding: 'p-1 sm:p-1.5',
      title: 'text-sm sm:text-base md:text-lg',
      subtitle: 'text-[8px] sm:text-[9px] md:text-[10px]',
      tagline: 'text-[8px] sm:text-[9px] md:text-[10px]',
    },
    lg: {
      badge: 'h-13 w-13 sm:h-16 sm:w-16',
      badgeFull: 'h-13 sm:h-16 px-3 sm:px-3.5 py-1.5 min-w-[100px] sm:min-w-[130px]',
      img: 'h-11 sm:h-14 w-auto max-w-[130px] sm:max-w-[170px]',
      badgePadding: 'p-1.5 sm:p-2',
      title: 'text-lg sm:text-xl md:text-2xl',
      subtitle: 'text-[10px] sm:text-xs',
      tagline: 'text-[10px] sm:text-xs',
    },
    xl: {
      badge: 'h-18 w-18 sm:h-24 sm:w-24',
      badgeFull: 'h-18 sm:h-24 px-4 sm:px-5 py-2 sm:py-2.5 min-w-[140px] sm:min-w-[180px]',
      img: 'h-15 sm:h-20 w-auto max-w-[180px] sm:max-w-[250px]',
      badgePadding: 'p-2 sm:p-3',
      title: 'text-xl sm:text-2xl md:text-3xl',
      subtitle: 'text-xs sm:text-sm',
      tagline: 'text-xs sm:text-sm',
    },
  }[size];

  // Full standalone emblem mode
  if (mode === 'full' || mode === 'image') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <div className={`relative rounded-full overflow-hidden shadow-lg border border-amber-300/40 bg-white ${sizeConfigs.badgePadding} transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
          {currentImgSrc ? (
            <img
              src={currentImgSrc}
              alt="Offbeat Destination Travels — A Better Way to Explore"
              className={`${sizeConfigs.img} object-contain mx-auto block rounded-full`}
              referrerPolicy="no-referrer"
              loading="eager"
              onError={handleImageError}
            />
          ) : (
            <VectorLogoEmblem className={sizeConfigs.img} />
          )}
        </div>
      </div>
    );
  }

  // Pure emblem badge mode
  if (mode === 'emblem') {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <div className={`relative rounded-full overflow-hidden shadow-md border border-slate-700/60 bg-white ${sizeConfigs.badge} flex items-center justify-center`}>
          {currentImgSrc ? (
            <img
              src={currentImgSrc}
              alt="Offbeat Destination Travels"
              className="w-full h-full object-contain p-0.5 rounded-full"
              referrerPolicy="no-referrer"
              loading="eager"
              onError={handleImageError}
            />
          ) : (
            <VectorLogoEmblem className="w-full h-full p-0.5" />
          )}
        </div>
      </div>
    );
  }

  // Combined mode (Emblem + High-Contrast Brand Typography)
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3.5 select-none max-h-full transition-all duration-300 ease-in-out ${className}`}>
      {/* High-contrast pristine white circular badge framing the authentic brand graphic */}
      <div
        className={`relative rounded-full overflow-hidden flex-shrink-0 shadow-md border border-slate-700/60 bg-white ${sizeConfigs.badge} max-h-full flex items-center justify-center transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:border-cyan-400 group-hover:shadow-cyan-500/20`}
      >
        {currentImgSrc ? (
          <img
            src={currentImgSrc}
            alt="Offbeat Destination Travels"
            className="w-full h-full max-h-full object-contain p-0.5 rounded-full transition-all duration-300 ease-in-out"
            referrerPolicy="no-referrer"
            loading="eager"
            onError={handleImageError}
          />
        ) : (
          <VectorLogoEmblem className="w-full h-full max-h-full p-0.5 transition-all duration-300 ease-in-out" />
        )}
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center text-left min-w-0 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-1 sm:gap-1.5 transition-all duration-300">
            <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400 uppercase leading-none truncate">
              PREMIUM TRAVEL
            </span>
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full inline-block flex-shrink-0"></span>
          </div>

          <div className="flex items-center tracking-tight text-white leading-none pt-0.5 transition-all duration-300">
            <span className={`${sizeConfigs.title} font-light transition-all duration-300 ${variant === 'dark' ? 'text-slate-800' : 'text-slate-100'}`}>
              OFFBEAT
            </span>
            <span className={`${sizeConfigs.title} font-black transition-all duration-300 ${variant === 'dark' ? 'text-slate-950' : 'text-white'} ml-1`}>
              DESTINATION
            </span>
          </div>

          <span className={`${sizeConfigs.tagline} text-amber-300 font-medium tracking-wide italic leading-none pt-0.5 sm:pt-1 flex items-center gap-1 transition-all duration-300 truncate`}>
            <span>A Better Way to Explore</span>
          </span>
        </div>
      )}
    </div>
  );
};








