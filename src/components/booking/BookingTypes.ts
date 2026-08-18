import { z } from 'zod';

export const bookingFormSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  whatsappNumber: z.string().min(10, 'Please enter a valid 10-digit WhatsApp number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  pickupLocation: z.string().optional().or(z.literal('')),
  dropLocation: z.string().optional().or(z.literal('')),
  preferredTour: z.string().min(1, 'Please select a tour circuit'),
  startDate: z.string().min(1, 'Please select your arrival date'),
  endDate: z.string().optional().or(z.literal('')),
  adults: z.number().min(1, 'At least 1 adult required').max(30),
  children: z.number().min(0).max(20),
  infants: z.number().min(0).max(10),
  vehiclePreference: z.string(),
  hotelCategory: z.enum(['budget', 'deluxe', 'premium', 'luxury', 'heritage', 'boutique']),
  mealPreference: z.enum(['EP', 'CP', 'MAP', 'AP']),
  budgetPreference: z.enum(['standard', 'comfort', 'luxury', 'ultra_luxury']),
  specialRequirements: z.string().optional().or(z.literal('')),
  arrivalFlight: z.string().optional().or(z.literal('')),
  departureFlight: z.string().optional().or(z.literal('')),
  couponCode: z.string().optional().or(z.literal('')),
  referralSource: z.string().optional().or(z.literal('')),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export interface TourOption {
  id: string;
  name: string;
  duration: string;
  nights: number;
  days: number;
  region: 'Sikkim' | 'North Sikkim' | 'Silk Route' | 'Darjeeling' | 'Bhutan' | 'Offbeat';
  basePricePerPerson: number;
  permitsRequired: boolean;
  permitType?: 'PAP' | 'ILP' | 'Army Permit' | 'Bhutan Entry Permit';
  highlights: string[];
  recommendedVehicle: string;
  tag?: string;
  popular?: boolean;
}

export interface VehicleOption {
  id: string;
  model: string;
  category: 'SUV' | 'Mountain 4x4' | 'Sedan' | 'Van/Coach';
  capacity: number;
  luggageCapacity: number;
  comfortRating: number; // 1-5
  mountainRoadSuitability: 'High' | 'Medium' | 'Restricted';
  pricePerDay: number;
  isPermittedNorthSikkim: boolean;
  isPermittedNathula: boolean;
  image: string;
  description: string;
}

export interface HotelCategoryOption {
  id: 'budget' | 'deluxe' | 'premium' | 'luxury' | 'heritage' | 'boutique';
  title: string;
  starBadge: string;
  pricePerNightPerRoom: number;
  sampleHotels?: string[];
  partnerChains?: string[];
  image?: string;
  amenities: string[];
  description: string;
}

export interface PriceBreakdown {
  hotelCost: number;
  vehicleCost: number;
  driverAllowance: number;
  permitFees: number;
  discountAmount: number;
  subtotal: number;
  gstTax: number;
  grandTotal: number;
  costPerPerson: number;
  appliedSeasonMultiplier?: number;
  seasonName?: string;
}
