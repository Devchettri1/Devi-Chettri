import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { AGENCY_DETAILS } from '../data/travelData';

export type ContextType =
  | 'package'
  | 'cab'
  | 'hotel'
  | 'offer'
  | 'calculator'
  | 'planner'
  | 'section'
  | 'tab'
  | 'general';

export interface PageContextInfo {
  type: ContextType;
  title: string;
  subtitle?: string;
  duration?: string;
  location?: string;
  price?: number | string;
  vehicle?: string;
  hotelCategory?: string;
  pickupLocation?: string;
  dropLocation?: string;
  dates?: string;
  passengers?: number | string;
  code?: string;
  customMessage?: string;
  tourType?: string;
  timestamp?: number;
}

const DEFAULT_CONTEXT: PageContextInfo = {
  type: 'general',
  title: 'Sikkim & Darjeeling Tour Planning',
  subtitle: 'Gangtok Head Office Direct Concierge',
  location: 'Gangtok, North Sikkim & Darjeeling',
};

interface WhatsAppContextValue {
  context: PageContextInfo;
  setPageContext: (ctx: Partial<PageContextInfo> & { title: string; type: ContextType }) => void;
  resetContext: () => void;
  buildContextualMessage: (overrideText?: string) => string;
  getWhatsAppUrl: (overrideText?: string) => string;
  openWhatsAppChat: (overrideText?: string) => void;
}

const WhatsAppContext = createContext<WhatsAppContextValue | undefined>(undefined);

export const buildContextualWhatsAppMessage = (ctx: PageContextInfo, overrideText?: string): string => {
  if (overrideText && overrideText.trim()) {
    return overrideText.trim();
  }

  const { type, title, subtitle, duration, location, price, vehicle, hotelCategory, pickupLocation, dropLocation, dates, passengers, code } = ctx;

  switch (type) {
    case 'package':
      return `Namaste OffbeatDestination Travels! 🙏

I am browsing your website and inquiring about the tour package:
🏔️ *${title}*
${duration ? `⏱️ *Duration:* ${duration}\n` : ''}${location ? `📍 *Circuit:* ${location}\n` : ''}${price ? `💰 *Starting Price:* ₹${typeof price === 'number' ? price.toLocaleString('en-IN') : price} / person\n` : ''}${vehicle ? `🚗 *Preferred Cab:* ${vehicle}\n` : ''}${hotelCategory ? `🏨 *Hotel Tier:* ${hotelCategory.toUpperCase()}\n` : ''}
Please share complete day-wise itinerary, available departure dates, Nathula & North Sikkim permit requirements, and the best quote for our trip.`;

    case 'cab':
      return `Namaste OffbeatDestination Travels! 🙏

I would like to inquire about Himalayan Cab Rental:
🚗 *Vehicle Model:* *${title}*
${subtitle ? `📋 *Type:* ${subtitle}\n` : ''}${passengers ? `👥 *Passengers:* ${passengers} Pax\n` : ''}${pickupLocation || dropLocation ? `📍 *Route:* ${pickupLocation || 'Bagdogra / NJP'} ➔ ${dropLocation || 'Gangtok / North Sikkim'}\n` : ''}${price ? `💰 *Estimated Tariff:* ₹${typeof price === 'number' ? price.toLocaleString('en-IN') : price}\n` : ''}${dates ? `🗓️ *Travel Date:* ${dates}\n` : ''}
Please confirm driver availability, luggage capacity, and all-inclusive mountain tariff.`;

    case 'hotel':
      return `Namaste OffbeatDestination Travels! 🙏

I am inquiring about hotel booking in Sikkim / Darjeeling:
🏨 *Property:* *${title}*
${location ? `📍 *Location:* ${location}\n` : ''}${subtitle ? `⭐ *Category:* ${subtitle}\n` : ''}${dates ? `🗓️ *Check-in Dates:* ${dates}\n` : ''}
Please check room availability, luxury/deluxe rates, and meal plans (Pure Veg & Jain food options).`;

    case 'offer':
      return `Namaste OffbeatDestination Travels! 🙏

I saw this special seasonal offer on your website:
🎉 *Offer:* *${title}*
${code ? `🏷️ *Promo Code:* ${code}\n` : ''}${subtitle ? `✨ *Benefit:* ${subtitle}\n` : ''}${price ? `💰 *Discounted Rate:* ₹${typeof price === 'number' ? price.toLocaleString('en-IN') : price}\n` : ''}
Please let me know how to claim this offer for my upcoming Sikkim & Darjeeling vacation.`;

    case 'calculator':
      return `Namaste OffbeatDestination Travels! 🙏

I used your Himalayan Travel Cost Calculator for my trip plan:
📍 *Route / Destination:* *${title}*
${duration ? `⏱️ *Duration:* ${duration}\n` : ''}${vehicle ? `🚗 *Vehicle:* ${vehicle}\n` : ''}${passengers ? `👥 *Travelers:* ${passengers} Pax\n` : ''}${price ? `💰 *Estimated Budget:* ₹${typeof price === 'number' ? price.toLocaleString('en-IN') : price}\n` : ''}
Please review this requirement, customize the day-wise itinerary, and share the official quotation.`;

    case 'tab':
    case 'section':
      return `Namaste OffbeatDestination Travels! 🙏

I am currently exploring the *${title}* section on your website.
${subtitle ? `📌 *Details:* ${subtitle}\n` : ''}
Could you please provide expert assistance, recommendations, and pricing for Sikkim, Darjeeling, and Bhutan?`;

    case 'general':
    default:
      return `Namaste OffbeatDestination Travels! 🙏

I am visiting your website and planning a trip to Sikkim & Darjeeling.
Please connect me with a local travel expert for customized tour packages, Innova cab rentals, and high-altitude permits.`;
  }
};

export const WhatsAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [context, setContext] = useState<PageContextInfo>(DEFAULT_CONTEXT);

  const setPageContext = useCallback((newCtx: Partial<PageContextInfo> & { title: string; type: ContextType }) => {
    setContext((prev) => ({
      ...prev,
      ...newCtx,
      timestamp: Date.now(),
    }));
  }, []);

  const resetContext = useCallback(() => {
    setContext(DEFAULT_CONTEXT);
  }, []);

  const buildContextualMessage = useCallback(
    (overrideText?: string) => {
      return buildContextualWhatsAppMessage(context, overrideText);
    },
    [context]
  );

  const getWhatsAppUrl = useCallback(
    (overrideText?: string) => {
      const msg = buildContextualWhatsAppMessage(context, overrideText);
      return `https://wa.me/${AGENCY_DETAILS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    },
    [context]
  );

  const openWhatsAppChat = useCallback(
    (overrideText?: string) => {
      const url = getWhatsAppUrl(overrideText);
      window.open(url, '_blank');
    },
    [getWhatsAppUrl]
  );

  const value = useMemo(
    () => ({
      context,
      setPageContext,
      resetContext,
      buildContextualMessage,
      getWhatsAppUrl,
      openWhatsAppChat,
    }),
    [context, setPageContext, resetContext, buildContextualMessage, getWhatsAppUrl, openWhatsAppChat]
  );

  return <WhatsAppContext.Provider value={value}>{children}</WhatsAppContext.Provider>;
};

export const useWhatsApp = (): WhatsAppContextValue => {
  const ctx = useContext(WhatsAppContext);
  if (!ctx) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return ctx;
};
