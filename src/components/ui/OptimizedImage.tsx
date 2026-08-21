import React, { useState, useEffect, useRef } from 'react';
import { resolveImage, DEFAULT_FALLBACK_IMAGE } from '@/assets/images';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  blurEffect?: boolean;
  aspectRatio?: string | number;
  wrapperClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  priority = false,
  blurEffect = true,
  loading,
  decoding = 'async',
  aspectRatio,
  wrapperClassName,
  style,
  onLoad,
  onError,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Safely resolve the image source
  const safeFallback = fallbackSrc || DEFAULT_FALLBACK_IMAGE || '/images/placeholder.webp';
  const resolvedSrc = hasError
    ? resolveImage(safeFallback)
    : resolveImage(src || safeFallback);

  // Check if image is already cached/complete on initial mount or src change
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const failedUrl = src || target.src || 'unknown';
    
    // Log missing/failed image for developer awareness while keeping UX intact
    if (process.env.NODE_ENV !== 'production' || !target.src.includes('placeholder')) {
      console.warn(`[ImageLoadWarning] Image failed to load: ${failedUrl}. Using fallback placeholder.`);
    }

    if (!hasError) {
      setHasError(true);
      setIsLoaded(true);
      target.src = resolveImage(safeFallback);
    } else {
      // If even the fallback failed, use the inline/public SVG placeholder
      target.src = '/images/placeholder.svg';
    }

    if (onError) {
      onError(e);
    }
  };

  const effectiveLoading = priority ? 'eager' : loading || 'lazy';
  const effectiveFetchPriority = priority ? 'high' : 'auto';

  // Apply blur-up transition classes if blurEffect is enabled
  const blurClasses = blurEffect
    ? `transition-all duration-500 ease-out ${
        isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-70 blur-[3px] scale-[1.02]'
      }`
    : '';

  const combinedImgClassName = `${className} ${blurClasses}`.trim();

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(aspectRatio ? { aspectRatio: String(aspectRatio) } : {}),
  };

  return (
    <img
      ref={imgRef}
      src={resolvedSrc}
      alt={alt || 'OffbeatDestination Travels'}
      loading={effectiveLoading}
      decoding={decoding}
      fetchPriority={effectiveFetchPriority}
      referrerPolicy="no-referrer"
      className={combinedImgClassName}
      style={combinedStyle}
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  );
};

export default OptimizedImage;
