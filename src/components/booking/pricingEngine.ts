import { TourOption, VehicleOption, HotelCategoryOption, PriceBreakdown } from './BookingTypes';

export const TOUR_OPTIONS: TourOption[] = [
  {
    id: 'pkg-5n6d-sikkim-darjeeling',
    name: '5N/6D Sikkim & Darjeeling Classic (Gangtok, Tsomgo & Tiger Hill)',
    duration: '5 Nights / 6 Days',
    nights: 5,
    days: 6,
    region: 'Sikkim',
    basePricePerPerson: 18500,
    permitsRequired: true,
    permitType: 'Army Permit',
    highlights: ['Tsomgo Lake & Baba Mandir', 'Darjeeling Tiger Hill Sunrise', 'Batasia Loop', 'MG Marg Strolls'],
    recommendedVehicle: 'Toyota Innova Crysta',
    popular: true,
    tag: 'Bestseller',
  },
  {
    id: 'pkg-north-sikkim-special',
    name: '4N/5D North Sikkim Special: Lachen, Lachung, Gurudongmar & Zero Point',
    duration: '4 Nights / 5 Days',
    nights: 4,
    days: 5,
    region: 'North Sikkim',
    basePricePerPerson: 17800,
    permitsRequired: true,
    permitType: 'PAP',
    highlights: ['Gurudongmar Lake (17,800 ft)', 'Yumthang Valley of Flowers', 'Zero Point Snow (15,300 ft)', 'Lachung Stays'],
    recommendedVehicle: 'Mahindra Scorpio 4x4',
    popular: true,
    tag: 'High Altitude Adventure',
  },
  {
    id: 'pkg-silk-route-zuluk',
    name: '4N/5D Historic Old Silk Route: Zuluk, Nathang Valley & Kupup Lake',
    duration: '4 Nights / 5 Days',
    nights: 4,
    days: 5,
    region: 'Silk Route',
    basePricePerPerson: 16500,
    permitsRequired: true,
    permitType: 'ILP',
    highlights: ['32 Hairpin Zig-Zag Bends', 'Thambi Viewpoint Sunrise', 'Nathang Valley', 'Elephant Lake Kupup'],
    recommendedVehicle: 'Toyota Innova Crysta',
    tag: 'Offbeat Scenic',
  },
  {
    id: 'pkg-pelling-west-sikkim',
    name: '4N/5D South & West Sikkim: Pelling Skywalk, Ravangla & Namchi',
    duration: '4 Nights / 5 Days',
    nights: 4,
    days: 5,
    region: 'Offbeat',
    basePricePerPerson: 15200,
    permitsRequired: false,
    highlights: ['India First Glass Skywalk', 'Ravangla Buddha Park', 'Temi Tea Garden', 'Namchi Char Dham'],
    recommendedVehicle: 'Toyota Innova Crysta',
  },
  {
    id: 'pkg-grand-8n9d-complete',
    name: '8N/9D Grand Sikkim, Silk Route & Darjeeling Odyssey',
    duration: '8 Nights / 9 Days',
    nights: 8,
    days: 9,
    region: 'Sikkim',
    basePricePerPerson: 29500,
    permitsRequired: true,
    permitType: 'PAP',
    highlights: ['Complete Sikkim Coverage', 'North Sikkim Lachung Stays', 'Silk Route Zuluk', 'Darjeeling Heritage'],
    recommendedVehicle: 'Toyota Innova Crysta',
    tag: 'All-Inclusive Grand Expedition',
  },
  {
    id: 'pkg-bhutan-cultural',
    name: '5N/6D Bhutan Cultural Gateway: Thimphu, Paro & Tiger Nest Hike',
    duration: '5 Nights / 6 Days',
    nights: 5,
    days: 6,
    region: 'Bhutan',
    basePricePerPerson: 36500,
    permitsRequired: true,
    permitType: 'Bhutan Entry Permit',
    highlights: ['Tiger Nest Taktsang Monastery', 'Punakha Suspension Bridge', 'Thimphu Buddha Dordenma', 'SDF Clearance'],
    recommendedVehicle: 'Toyota Innova Crysta',
    tag: 'International Himalayan',
  },
];

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'innova-crysta',
    model: 'Toyota Innova Crysta',
    category: 'SUV',
    capacity: 7,
    luggageCapacity: 5,
    comfortRating: 5,
    mountainRoadSuitability: 'High',
    pricePerDay: 4500,
    isPermittedNorthSikkim: true,
    isPermittedNathula: true,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    description: 'Executive plush captain seats, dual-zone AC/heater, smooth suspension for winding mountain roads.',
  },
  {
    id: 'scorpio-4x4',
    model: 'Mahindra Scorpio / Xylo 4x4',
    category: 'Mountain 4x4',
    capacity: 6,
    luggageCapacity: 4,
    comfortRating: 4,
    mountainRoadSuitability: 'High',
    pricePerDay: 4000,
    isPermittedNorthSikkim: true,
    isPermittedNathula: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    description: 'Heavy-duty 4WD torque, high ground clearance, best suited for snow trails and rocky North Sikkim passes.',
  },
  {
    id: 'tata-sumo-bolero',
    model: 'Tata Sumo / Mahindra Bolero',
    category: 'Mountain 4x4',
    capacity: 8,
    luggageCapacity: 4,
    comfortRating: 3,
    mountainRoadSuitability: 'High',
    pricePerDay: 3600,
    isPermittedNorthSikkim: true,
    isPermittedNathula: true,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80',
    description: 'Sturdy budget mountain workhorse with high seating capacity for group and student travel.',
  },
  {
    id: 'maruti-dzire',
    model: 'Maruti Swift Dzire / Etios',
    category: 'Sedan',
    capacity: 4,
    luggageCapacity: 3,
    comfortRating: 4,
    mountainRoadSuitability: 'Medium',
    pricePerDay: 3200,
    isPermittedNorthSikkim: false,
    isPermittedNathula: false,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
    description: 'Economical sedan for couple travel across Gangtok, Darjeeling, and Kalimpong (Note: Not permitted for North Sikkim/Nathula).',
  },
  {
    id: 'tempo-traveller',
    model: 'Force Luxury Tempo Traveller (13/17 Seater)',
    category: 'Van/Coach',
    capacity: 14,
    luggageCapacity: 12,
    comfortRating: 5,
    mountainRoadSuitability: 'High',
    pricePerDay: 7500,
    isPermittedNorthSikkim: true,
    isPermittedNathula: true,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    description: 'Reclining pushback seats, individual AC vents, luggage carrier on top, perfect for large family and corporate tours.',
  },
];

export const HOTEL_CATEGORIES: HotelCategoryOption[] = [
  {
    id: 'budget',
    title: 'Standard Deluxe Mountain Stays',
    starBadge: '2-3 Star Standard',
    pricePerNightPerRoom: 2400,
    amenities: ['Clean Rooms with Attached Bath', 'Geyser / 24x7 Hot Water', 'Mountain View Windows', 'Fresh Homestyle Food'],
    partnerChains: ['Rufina Stays', 'Alpine View Lodges', 'Cozy Homestays'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    description: 'Clean, safe, hygienic accommodations with hospitable local hosts and warm Sikkimese meals.',
  },
  {
    id: 'deluxe',
    title: '3-Star Deluxe Boutique Hotels',
    starBadge: '3-Star Deluxe',
    pricePerNightPerRoom: 3800,
    amenities: ['Kanchenjunga View Balconies', 'Room Heater', 'Electric Kettle & Tea Bags', 'Buffet Breakfast & Dinner', 'Free WiFi'],
    partnerChains: ['Trickocity Hotels', 'Summit Hotels', 'Udaan Hotels', 'Rufina Grand'],
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    description: 'Our most popular tier. Premium hill-view rooms located in central locations with modern conveniences.',
  },
  {
    id: 'premium',
    title: '4-Star Premium Mountain View Resorts',
    starBadge: '4-Star Executive',
    pricePerNightPerRoom: 5800,
    amenities: ['Central Heating', 'Panoramic Floor-to-Ceiling Windows', 'Bathtub / Jacuzzi', 'Multi-Cuisine Fine Dining', 'Valet Parking'],
    partnerChains: ['Rare Himalayas Eco-Luxury', 'Sterling Resorts', 'Yashshree Suites', 'Trickocity Premium'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    description: 'Expansive scenic view suites with plush interiors, fine dining, and specialized guest concierge.',
  },
  {
    id: 'luxury',
    title: '5-Star Heritage & Spa Resorts',
    starBadge: '5-Star Luxury',
    pricePerNightPerRoom: 12500,
    amenities: ['Forest Spa & Casino Access', 'Heated Indoor Swimming Pool', 'Personal Chauffeur Desk', 'Gourmet High Tea Sessions', 'Butler on Demand'],
    partnerChains: ['Rare Himalayas Sanctuaries', 'Mayfair Spa Resort & Casino', 'The Elgin Darjeeling', 'Vivanta Sikkim Pakyong'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    description: 'The pinnacle of luxury in the Eastern Himalayas. Royal colonial charm, heated pools, and holistic wellness.',
  },
  {
    id: 'heritage',
    title: 'Colonial Heritage & Tea Estate Bungalows',
    starBadge: 'Heritage Luxury',
    pricePerNightPerRoom: 9500,
    amenities: ['Historic 100-yr Fireplaces', 'Tea Plucking Masterclass', 'Antique Wooden Furnishing', 'English High Tea', 'Private Lawn'],
    partnerChains: ['Glenburn Tea Estate', 'The Elgin Heritage', 'Windamere Hotel'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
    description: 'Experience the romantic Raj-era charm amidst serene rolling tea estates with roaring fireplaces.',
  },
  {
    id: 'boutique',
    title: 'Eco-Luxury Glass Cottages & Alpine Glamping',
    starBadge: 'Eco-Boutique',
    pricePerNightPerRoom: 7200,
    amenities: ['360° Glass Ceiling for Stargazing', 'Organic Farm-to-Table Meals', 'Private Forest Deck', 'Bonfire & Barbecue'],
    partnerChains: ['Zuluk Cloud Chalet', 'Pelling Alpine Pods', 'Temi Eco Retreat'],
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80',
    description: 'Architectural wonder cottages blending seamlessly into virgin Himalayan forests.',
  },
];

export const COUPONS: Record<string, { discountPercent: number; maxDiscount: number; description: string }> = {
  OFFBEAT500: { discountPercent: 5, maxDiscount: 1500, description: '5% Instant Early-Bird Discount' },
  SIKKIM2026: { discountPercent: 8, maxDiscount: 2500, description: '8% Direct Booking Special' },
  HIMALAYA10: { discountPercent: 10, maxDiscount: 4000, description: '10% Family & Group Explorer Saver' },
  ROYALHONEYMOON: { discountPercent: 7, maxDiscount: 3000, description: '7% Couple Honeymoon Package Discount' },
};

export function getSeasonMultiplier(dateString?: string): { multiplier: number; name: string; tag: string } {
  if (!dateString) {
    return { multiplier: 1.0, name: 'Standard Season', tag: 'Standard Rates' };
  }
  const date = new Date(dateString);
  const month = date.getMonth(); // 0 = Jan, 11 = Dec

  // Peak Season: April, May, October, November (Spring Rhododendron & Autumn Clear Skies)
  if (month === 3 || month === 4 || month === 9 || month === 10) {
    return { multiplier: 1.15, name: 'Peak Season (High Demand & Clear Skies)', tag: 'Peak Season (+15%)' };
  }
  // Winter Snow Season: December, January (Snowfalls in North Sikkim & Nathula)
  if (month === 11 || month === 0) {
    return { multiplier: 1.08, name: 'Winter Snow Season (Zero Point & Gurudongmar Snow)', tag: 'Winter Snow (+8%)' };
  }
  // Monsoon Offbeat: July, August (Budget Friendly & Green Valleys)
  if (month === 6 || month === 7) {
    return { multiplier: 0.88, name: 'Monsoon Green Season (Best Value Discounts)', tag: 'Monsoon Saver (-12%)' };
  }
  // Standard Season: February, March, June, September
  return { multiplier: 1.0, name: 'Pleasant Regular Season', tag: 'Standard Rates' };
}

export function calculateBookingPrice(params: {
  tourId: string;
  hotelCategoryId: string;
  vehicleModel: string;
  adults: number;
  children: number;
  startDate?: string;
  couponCode?: string;
  mealPlan?: 'EP' | 'CP' | 'MAP' | 'AP';
}): PriceBreakdown {
  const tour = TOUR_OPTIONS.find((t) => t.id === params.tourId) || TOUR_OPTIONS[0];
  const hotel = HOTEL_CATEGORIES.find((h) => h.id === params.hotelCategoryId) || HOTEL_CATEGORIES[1];
  const vehicle = VEHICLE_OPTIONS.find((v) => v.model === params.vehicleModel) || VEHICLE_OPTIONS[0];

  const totalNights = tour.nights;
  const totalDays = tour.days;
  const totalTravelers = Math.max(1, params.adults + params.children * 0.5);

  // Number of rooms required (2 adults per room, children with extra bed)
  const roomsRequired = Math.ceil(params.adults / 2);

  // Hotel cost calculation with Meal Plan additions
  let mealMultiplier = 1.0;
  if (params.mealPlan === 'EP') mealMultiplier = 0.85; // Room only
  if (params.mealPlan === 'CP') mealMultiplier = 0.92; // Breakfast
  if (params.mealPlan === 'MAP') mealMultiplier = 1.0; // Breakfast + Dinner
  if (params.mealPlan === 'AP') mealMultiplier = 1.12; // All Meals

  const rawHotelCost = hotel.pricePerNightPerRoom * roomsRequired * totalNights * mealMultiplier;

  // Vehicle cost calculation
  const rawVehicleCost = vehicle.pricePerDay * totalDays;

  // Driver Allowance, hill tolls & interstate parking fees
  const driverAllowance = 700 * totalDays;

  // Mountain & Restricted Area Permits (Nathula / North Sikkim PAP / Rongli ILP)
  const permitFees = tour.permitsRequired ? (tour.permitType === 'Bhutan Entry Permit' ? 3200 * totalTravelers : 800 * params.adults) : 0;

  // Seasonality Multiplier
  const seasonInfo = getSeasonMultiplier(params.startDate);
  const baseSubtotal = (rawHotelCost + rawVehicleCost + driverAllowance + permitFees) * seasonInfo.multiplier;

  // Coupon discount calculation
  let discountAmount = 0;
  if (params.couponCode && COUPONS[params.couponCode.toUpperCase().trim()]) {
    const coupon = COUPONS[params.couponCode.toUpperCase().trim()];
    const potentialDiscount = (baseSubtotal * coupon.discountPercent) / 100;
    discountAmount = Math.min(potentialDiscount, coupon.maxDiscount);
  }

  const subtotalAfterDiscount = Math.max(0, baseSubtotal - discountAmount);

  // GST (5% on tour operator packages)
  const gstTax = Math.round(subtotalAfterDiscount * 0.05);

  const grandTotal = Math.round(subtotalAfterDiscount + gstTax);
  const costPerPerson = Math.round(grandTotal / Math.max(1, params.adults));

  return {
    hotelCost: Math.round(rawHotelCost),
    vehicleCost: Math.round(rawVehicleCost),
    driverAllowance: Math.round(driverAllowance),
    permitFees: Math.round(permitFees),
    subtotal: Math.round(baseSubtotal),
    discountAmount: Math.round(discountAmount),
    gstTax,
    grandTotal,
    costPerPerson,
    appliedSeasonMultiplier: seasonInfo.multiplier,
    seasonName: seasonInfo.name,
  };
}
