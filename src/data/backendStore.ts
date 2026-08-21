import fs from 'fs';
import path from 'path';
import {
  sikkimHeroBanner,
  yumthangZeroPoint,
  innovaCrystaCab,
  officialLogo,
} from '../assets/images';
import {
  DestinationItem,
  HotelItem,
  SeasonItem,
  QuotationItem,
  CustomerRecord,
  FaqItem,
  StaffUser,
  AuditLogEntry,
  MediaItem,
  NavigationItem,
  TravelAlert,
  TourPackage,
  CabOption,
  CustomerReview,
  SeoSettings,
} from '../types';
import {
  INITIAL_DESTINATIONS,
  INITIAL_HOTELS,
  INITIAL_SEASONS,
  INITIAL_QUOTATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_FAQS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NAVIGATION,
  INITIAL_ALERT,
} from './initialStoreData';
import {
  TOUR_PACKAGES,
  CAB_OPTIONS,
  AGENCY_DETAILS,
  REVIEWS,
  DEFAULT_SEO_SETTINGS,
} from './travelData';

export {
  INITIAL_DESTINATIONS,
  INITIAL_HOTELS,
  INITIAL_SEASONS,
  INITIAL_QUOTATIONS,
  INITIAL_CUSTOMERS,
  INITIAL_FAQS,
  INITIAL_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NAVIGATION,
  INITIAL_ALERT,
};

const STORE_FILE_PATH = path.join(process.cwd(), 'data', 'backend_store.json');

export interface BackendRatesConfig {
  hotelNightRates: {
    budgetDeluxe: number;
    premium3Star: number;
    luxury5Star: number;
  };
  permitFees: {
    northSikkimPermit: number;
    nathulaArmyPermit: number;
    tsomgoPermit: number;
    silkRoutePermit: number;
  };
  seasonalMultiplier: number;
  extraAdultPerNight: number;
  extraChildPerNight: number;
  driverAllowancePerDay: number;
  gstTaxPercentage: number;
}

export const INITIAL_RATES_CONFIG: BackendRatesConfig = {
  hotelNightRates: {
    budgetDeluxe: 2200,
    premium3Star: 3500,
    luxury5Star: 8500,
  },
  permitFees: {
    northSikkimPermit: 1500,
    nathulaArmyPermit: 1500,
    tsomgoPermit: 500,
    silkRoutePermit: 800,
  },
  seasonalMultiplier: 1.0,
  extraAdultPerNight: 1200,
  extraChildPerNight: 800,
  driverAllowancePerDay: 500,
  gstTaxPercentage: 5,
};

// Store Interface
export interface BackendStoreData {
  packages: TourPackage[];
  cabs: CabOption[];
  agency: any;
  rates: BackendRatesConfig;
  reviews: any[];
  leads: any[];
  destinations: DestinationItem[];
  hotels: HotelItem[];
  seasons: SeasonItem[];
  quotations: QuotationItem[];
  customers: CustomerRecord[];
  faqs: FaqItem[];
  users: StaffUser[];
  auditLogs: AuditLogEntry[];
  media: MediaItem[];
  navigation: NavigationItem[];
  alert?: TravelAlert;
  seo?: SeoSettings;
}

let storeInMemory: BackendStoreData | null = null;

export function getBackendStore(): BackendStoreData {
  if (storeInMemory) return storeInMemory;

  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const raw = fs.readFileSync(STORE_FILE_PATH, 'utf-8');
      storeInMemory = JSON.parse(raw);
      if (storeInMemory) {
        let modified = false;

        if (!storeInMemory.packages || storeInMemory.packages.length === 0) {
          storeInMemory.packages = TOUR_PACKAGES;
          modified = true;
        }
        if (!storeInMemory.cabs || storeInMemory.cabs.length === 0) {
          storeInMemory.cabs = CAB_OPTIONS;
          modified = true;
        }
        if (!storeInMemory.agency || !storeInMemory.agency.name) {
          storeInMemory.agency = AGENCY_DETAILS;
          modified = true;
        }
        if (!storeInMemory.rates) {
          storeInMemory.rates = INITIAL_RATES_CONFIG;
          modified = true;
        }
        if (!storeInMemory.reviews || storeInMemory.reviews.length === 0) {
          storeInMemory.reviews = REVIEWS;
          modified = true;
        }
        if (!storeInMemory.leads) {
          storeInMemory.leads = [];
          modified = true;
        }
        if (!storeInMemory.seo) {
          storeInMemory.seo = DEFAULT_SEO_SETTINGS;
          modified = true;
        }
        if (!storeInMemory.navigation) {
          storeInMemory.navigation = INITIAL_NAVIGATION;
          modified = true;
        }
        if (!storeInMemory.alert) {
          storeInMemory.alert = INITIAL_ALERT;
          modified = true;
        }
        if (!storeInMemory.media || storeInMemory.media.length === 0) {
          storeInMemory.media = [
            {
              id: 'med-1',
              title: 'Sikkim Kanchenjunga Banner',
              url: sikkimHeroBanner,
              category: 'Banners',
              uploadedAt: new Date().toISOString(),
            },
            {
              id: 'med-2',
              title: 'Yumthang Zero Point',
              url: yumthangZeroPoint,
              category: 'Destinations',
              uploadedAt: new Date().toISOString(),
            },
            {
              id: 'med-3',
              title: 'Innova Crysta Luxury Cab',
              url: innovaCrystaCab,
              category: 'Vehicles',
              uploadedAt: new Date().toISOString(),
            },
            {
              id: 'med-4',
              title: 'Official Logo Crest',
              url: officialLogo,
              category: 'Banners',
              uploadedAt: new Date().toISOString(),
            },
          ];
          modified = true;
        }

        // Merge in any newly defined INITIAL_HOTELS that might not exist in an older JSON snapshot
        const existingIds = new Set((storeInMemory.hotels || []).map((h) => h.id));
        const missingHotels = INITIAL_HOTELS.filter((h) => !existingIds.has(h.id));
        if (missingHotels.length > 0) {
          storeInMemory.hotels = [...(storeInMemory.hotels || []), ...missingHotels];
          modified = true;
        }

        if (modified) {
          fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(storeInMemory, null, 2), 'utf-8');
        }
      }
      return storeInMemory!;
    }
  } catch (err) {
    console.error('Failed to read backend_store.json, creating new file store.', err);
  }

  // Fallback / Initial boot store creation
  storeInMemory = {
    packages: TOUR_PACKAGES,
    cabs: CAB_OPTIONS,
    agency: AGENCY_DETAILS,
    rates: INITIAL_RATES_CONFIG,
    reviews: REVIEWS,
    leads: [],
    destinations: INITIAL_DESTINATIONS,
    hotels: INITIAL_HOTELS,
    seasons: INITIAL_SEASONS,
    quotations: INITIAL_QUOTATIONS,
    customers: INITIAL_CUSTOMERS,
    faqs: INITIAL_FAQS,
    users: INITIAL_USERS,
    auditLogs: INITIAL_AUDIT_LOGS,
    navigation: INITIAL_NAVIGATION,
    alert: INITIAL_ALERT,
    seo: DEFAULT_SEO_SETTINGS,
    media: [
      {
        id: 'med-1',
        title: 'Sikkim Kanchenjunga Banner',
        url: sikkimHeroBanner,
        category: 'Banners',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: 'med-2',
        title: 'Yumthang Zero Point',
        url: yumthangZeroPoint,
        category: 'Destinations',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: 'med-3',
        title: 'Innova Crysta Luxury Cab',
        url: innovaCrystaCab,
        category: 'Vehicles',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: 'med-4',
        title: 'Official Logo Crest',
        url: officialLogo,
        category: 'Banners',
        uploadedAt: new Date().toISOString(),
      },
    ],
  };

  saveBackendStore(storeInMemory);
  return storeInMemory;
}

export function saveBackendStore(data: BackendStoreData) {
  storeInMemory = data;
  try {
    const dir = path.dirname(STORE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing backend_store.json:', err);
  }
}

export function logAuditAction(userName: string, userRole: string, action: string, details: string) {
  const store = getBackendStore();
  const entry: AuditLogEntry = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    userName,
    userRole,
    action,
    details,
  };
  store.auditLogs.unshift(entry);
  if (store.auditLogs.length > 200) store.auditLogs.pop();
  saveBackendStore(store);
}
