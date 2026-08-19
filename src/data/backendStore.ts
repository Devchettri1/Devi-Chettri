import fs from 'fs';
import path from 'path';
import {
  sikkimHeroBanner,
  yumthangZeroPoint,
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
} from './initialStoreData';

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
};

const STORE_FILE_PATH = path.join(process.cwd(), 'data', 'backend_store.json');

// Store Interface
export interface BackendStoreData {
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
}

let storeInMemory: BackendStoreData | null = null;

export function getBackendStore(): BackendStoreData {
  if (storeInMemory) return storeInMemory;

  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const raw = fs.readFileSync(STORE_FILE_PATH, 'utf-8');
      storeInMemory = JSON.parse(raw);
      if (storeInMemory) {
        if (!storeInMemory.navigation) {
          storeInMemory.navigation = INITIAL_NAVIGATION;
        }
        // Merge in any newly defined INITIAL_HOTELS that might not exist in an older JSON snapshot
        const existingIds = new Set((storeInMemory.hotels || []).map((h) => h.id));
        const missingHotels = INITIAL_HOTELS.filter((h) => !existingIds.has(h.id));
        if (missingHotels.length > 0) {
          storeInMemory.hotels = [...(storeInMemory.hotels || []), ...missingHotels];
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
    destinations: INITIAL_DESTINATIONS,
    hotels: INITIAL_HOTELS,
    seasons: INITIAL_SEASONS,
    quotations: INITIAL_QUOTATIONS,
    customers: INITIAL_CUSTOMERS,
    faqs: INITIAL_FAQS,
    users: INITIAL_USERS,
    auditLogs: INITIAL_AUDIT_LOGS,
    navigation: INITIAL_NAVIGATION,
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
