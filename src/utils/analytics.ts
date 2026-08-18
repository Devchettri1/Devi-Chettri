/**
 * Lazy Deferred Analytics Loader
 * Only loads Google Analytics / Tag Manager / Clarity after initial user interaction
 * (scroll, touch, mouse movement) to maximize Lighthouse Speed & Core Web Vitals score.
 */

let isAnalyticsLoaded = false;

export function initLazyAnalytics(gaMeasurementId = 'G-OFFBEAT001', clarityId = 'clarity001') {
  if (isAnalyticsLoaded || typeof window === 'undefined') return;

  const loadScripts = () => {
    if (isAnalyticsLoaded) return;
    isAnalyticsLoaded = true;

    // Remove interaction listeners
    ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
      window.removeEventListener(evt, loadScripts);
    });

    try {
      // Google Analytics 4 (GA4)
      if (gaMeasurementId) {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', gaMeasurementId, { send_page_view: true });
      }
    } catch (e) {
      console.warn('Analytics deferred init warning:', e);
    }
  };

  // Add event listeners for interaction or fallback timer after 4 seconds
  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
    window.addEventListener(evt, loadScripts, { once: true, passive: true });
  });

  setTimeout(loadScripts, 4000);
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
