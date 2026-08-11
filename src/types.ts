export interface PackageHotelTiers {
  deluxe: {
    price: number;
    hotelType: string;
  };
  premium: {
    price: number;
    hotelType: string;
  };
  luxury: {
    price: number;
    hotelType: string;
  };
}

export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  location: string;
  category: 'Sikkim-Darjeeling' | 'North Sikkim' | 'South-West Sikkim' | 'Silk Route' | 'Honeymoon' | 'Bhutan';
  priceStarting: number;
  hotelTiers?: PackageHotelTiers;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  included: string[];
  permitsRequired: boolean;
  vegMealsAvailable: boolean;
  isSharedTourAvailable?: boolean;
  sharedPricePerSeat?: number;
  sharedTourDetails?: string;
}

export interface CabOption {
  id: string;
  model: string;
  type: string;
  capacity: string;
  bestFor: string;
  ratePerDay: number;
  njpIxbPickupRate: number;
  image: string;
  features: string[];
}

export interface LeadSubmission {
  id: string;
  customerName: string;
  whatsappNumber: string;
  email?: string;
  travelDates: string;
  travelersCount: number;
  packageOrRoute: string;
  vehiclePreference?: string;
  mealPreference?: string;
  notes?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Booked' | 'Closed';
}

export interface GeneratedItineraryDay {
  day: number;
  title: string;
  popularHighlights?: string[];
  offbeatHighlights?: string[];
  overnightStay?: string;
  mealsIncluded?: string;
  details: string;
}

export interface GeneratedItinerary {
  title: string;
  duration: string;
  companions?: string;
  interests?: string[];
  budgetTier?: string;
  estimatedCostPerPerson: string;
  totalEstimatedCost?: string;
  vehicleRecommended?: string;
  hasNorthSikkim?: boolean;
  lachungMandatory2NightsApplied?: boolean;
  overview: string;
  dayByDay: GeneratedItineraryDay[];
  inclusions: string[];
  permitsRequired?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  isLeadPrompt?: boolean;
  itineraryData?: GeneratedItinerary;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  packageTaken: string;
  avatarUrl?: string;
  photoUrl?: string;
  externalPlatform?: 'Google' | 'TripAdvisor' | 'WhatsApp' | 'Direct';
  approved?: boolean;
  createdAt?: string;
  helpfulCount?: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  destination: 'Sikkim' | 'Darjeeling' | 'Bhutan';
  serviceType: 'Tour Packages' | 'Cab Rentals' | 'Agency Info';
  type: 'photo' | 'video';
  url: string;
  videoEmbedUrl?: string;
  thumbnail?: string;
  duration?: string;
  location: string;
  description: string;
  tags: string[];
}

export interface SeoPageConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string;
}

export interface SeoSettings {
  [key: string]: SeoPageConfig;
}

export interface DestinationItem {
  id: string;
  name: string;
  slug: string;
  region: 'East Sikkim' | 'North Sikkim' | 'South Sikkim' | 'West Sikkim' | 'Darjeeling' | 'Silk Route' | 'Bhutan';
  heroImage: string;
  shortDescription: string;
  fullOverview: string;
  bestTimeToVisit: string;
  recommendedDuration: string;
  keyAttractions: string[];
  travelTips: string[];
  featuredPackageIds?: string[];
  active: boolean;
}

export interface HotelItem {
  id: string;
  name: string;
  destination: string;
  category: 'Budget' | '3 Star Deluxe' | '4 Star Premium' | '5 Star Heritage Luxury' | string;
  roomTypes: string[];
  basePricePerNight: number;
  seasonalPricePerNight?: number;
  peakSeasonPricePerNight?: number;
  image?: string;
  heroImage?: string;
  address?: string;
  contactPhone?: string;
  amenities: string[];
  description: string;
  active: boolean;
}

export interface SeasonItem {
  id: string;
  name: string;
  months: string;
  priceMultiplier: number;
  description: string;
  status: 'Peak' | 'Mid' | 'Monsoon' | 'Winter';
  active: boolean;
}

export interface QuotationItem {
  id: string;
  quoteNumber: string;
  customerName: string;
  whatsappNumber: string;
  email?: string;
  destination?: string;
  packageTitle?: string;
  packageName?: string;
  travelDates: string;
  adultsCount: number;
  childrenCount: number;
  nightsCount?: number;
  hotelCategory: string;
  vehicleModel: string;
  baseAmount?: number;
  totalCabCost?: number;
  totalHotelCost?: number;
  permitsFee?: number;
  permitCharges?: number;
  discountAmount: number;
  taxAmount?: number;
  gstTax?: number;
  subtotal?: number;
  totalFinalAmount: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
  createdAt: string;
  validUntil: string;
  notes?: string;
  internalNotes?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  city?: string;
  totalTripsBooked: number;
  totalAmountSpent: number;
  lastTripDate?: string;
  internalNotes?: string;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  category: 'General' | 'Permits & Documents' | 'Cab & Transport' | 'Hotels & Food' | 'North Sikkim' | 'Booking & Payments';
  question: string;
  answer: string;
  active: boolean;
  order: number;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'STAFF' | 'EDITOR';
  status: 'Active' | 'Inactive';
  lastLogin?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: 'Packages' | 'Destinations' | 'Hotels' | 'Vehicles' | 'Banners' | 'Watermark';
  sizeFormatted?: string;
  uploadedAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  tabId: string;
  hasDropdown?: boolean;
  dropdownType?: 'packages' | 'cabs' | 'destinations' | 'hotels' | 'custom';
  active: boolean;
  order: number;
  badgeText?: string;
  externalUrl?: string;
}

