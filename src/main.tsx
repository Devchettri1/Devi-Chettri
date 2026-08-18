import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/ToastProvider';
import { WishlistProvider } from './utils/wishlistContext';
import { WhatsAppProvider } from './utils/whatsAppContext';
import { initLazyAnalytics } from './utils/analytics';

// Register Service Worker for PWA Offline Support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}

// Initialize Deferred Lazy Analytics
initLazyAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <WishlistProvider>
          <WhatsAppProvider>
            <App />
          </WhatsAppProvider>
        </WishlistProvider>
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>
);
