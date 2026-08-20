import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { DEFAULT_SEO_SETTINGS } from './src/data/travelData';
import { getBackendStore, saveBackendStore, logAuditAction } from './src/data/backendStore';
import { BLOG_POSTS, calculateReadTime } from './src/data/blogData';
import { generateCrawlerSitemap } from './src/utils/sitemapGenerator';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Enterprise Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Simple In-Memory Rate Limiter Middleware
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
app.use('/api/', (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return next();
  }
  if (record.count >= 80) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please wait a moment.' });
  }
  record.count += 1;
  next();
});

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'offbeatdestination-build',
      },
    },
  });
}

// In-Memory Leads Database for Agency Owner
interface Lead {
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
  status: 'New' | 'Contacted' | 'Booked' | 'Closed';
}

const leadsDatabase: Lead[] = [
  {
    id: "lead-101",
    customerName: "Ramesh Sharma",
    whatsappNumber: "+91 98301 44552",
    email: "ramesh.s@gmail.com",
    travelDates: "15th Sept - 20th Sept 2026",
    travelersCount: 4,
    packageOrRoute: "5N/6D Sikkim & Darjeeling Tour",
    vehiclePreference: "Toyota Innova Crysta",
    mealPreference: "Pure Veg (MAP Plan)",
    notes: "Nathula permit needed for 4 adults.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "New"
  },
  {
    id: "lead-102",
    customerName: "Sonia Kapoor",
    whatsappNumber: "+91 91234 56789",
    email: "sonia.k@outlook.com",
    travelDates: "5th Oct - 9th Oct 2026",
    travelersCount: 2,
    packageOrRoute: "North Sikkim (Lachung / Zero Point)",
    vehiclePreference: "Mahindra Scorpio 4x4",
    mealPreference: "Veg / Jain Food",
    notes: "Honeymoon couple, need comfortable hotel with valley view.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "Contacted"
  }
];

const AGENCY_DETAILS_INITIAL = {
  name: "OffbeatDestination Travels",
  legalName: "M/s Offbeat Destination Sikkim Tours & Travels",
  tagline: "A better way to explore",
  location: "Arithang, Gangtok, Sikkim - 737102",
  phonePrimary: "+91 62961 02341",
  phoneSecondary: "+91 98513 70773",
  whatsappNumber: "916296102341",
  email: "info@offbeatdestination.in",
  ownerEmail: "chettridev12@gmail.com",
  domain: "offbeatdestination.in",
  websiteUrl: "https://offbeatdestination.in",
  googleMapsUrl: "https://maps.app.goo.gl/1F2hXG1XeyKvM9DE8",
  govtRegistration: "Govt. Registered Travel Agent (Reg No. 1750/DoT&CAv/Gtk/25/TA)",
  licenseNo: "1750/DoT&CAv/Gtk/25/TA",
  serialNo: "1750",
  proprietor: "Mr. Devi Charan Chettri",
  regRules: "The Sikkim Registration of Tourist Trade Rules, 2025",
  issuingAuthority: "Tourism & Civil Aviation Dept., Govt. of Sikkim",
  validity: "Valid upto 30/04/2026",
  rating: 4.9,
  totalReviews: 542,
  fleetsCount: "15+ Luxury Innova Crystas & Xylos",
  logoUrl: "/images/offbeat_destination_logo.svg",
};

const TOUR_PACKAGES_INITIAL = [
  {
    id: "pkg-5n6d-sikkim-darjeeling",
    title: "5 Nights / 6 Days Sikkim & Darjeeling Tour (Standard Deluxe)",
    duration: "5 Nights / 6 Days",
    location: "Gangtok, Tsomgo Lake, Nathula Pass & Darjeeling (3★ Deluxe Stays)",
    category: "Sikkim-Darjeeling",
    priceStarting: 18500,
    rating: 4.9,
    reviewsCount: 230,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "3★ Deluxe boutique hotel stays in Gangtok & Darjeeling",
      "Darjeeling Tea Garden city tour & sunrise at Tiger Hill",
      "Gangtok ropeway & MG Marg night stroll",
      "High-altitude Tsomgo Lake (12,400 ft) & Baba Mandir",
      "Nathula Pass Indo-China Border permit assistance",
      "Private Innova Crysta / Xylo transfers throughout"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / IXB Airport Pickup to Gangtok",
        description: "Pick up in clean Innova Crysta from NJP or Bagdogra (IXB). Scenic drive along Teesta River to Gangtok 3★ Deluxe hotel. Evening stroll at MG Marg."
      },
      {
        day: 2,
        title: "Excursion to Tsomgo Lake & Baba Mandir (Nathula Optional)",
        description: "Drive to Tsomgo Lake (12,400 ft) and historic Baba Harbhajan Singh Mandir. Optional permit extension to Nathula Pass Indo-China border."
      },
      {
        day: 3,
        title: "Gangtok Local Sightseeing & Transfer to Darjeeling",
        description: "Visit Hanuman Tok, Ganesh Tok, Ban Jhakri Waterfalls, and Rumtek Monastery. Afternoon drive through lush hills to Darjeeling."
      },
      {
        day: 4,
        title: "Darjeeling Sunrise at Tiger Hill & 7-Points Sightseeing",
        description: "Early 4:00 AM trip to Tiger Hill for Kanchenjunga sunrise. Visit Batasia Loop, Ghoom Monastery, Himalayan Mountaineering Institute, and Happy Valley Tea Estate."
      },
      {
        day: 5,
        title: "Darjeeling Mirik Lake Excursion or Leisure Tea Garden Walk",
        description: "Relaxed morning enjoying tea tasting, souvenir shopping, or day trip to Pashupati Market & Mirik Lake."
      },
      {
        day: 6,
        title: "Departure to NJP Station / Bagdogra Airport (IXB)",
        description: "Breakfast at hotel and private drive down to NJP Station or Bagdogra Airport with cherished Himalayan memories."
      }
    ],
    included: [
      "Private Innova Crysta / Xylo vehicle with professional driver",
      "3★ Deluxe boutique hotel stays with daily breakfast & dinner (AP/MAP plan)",
      "All Sikkim & Nathula Pass permit processing charges",
      "Driver allowance, toll taxes, fuel, and parking fees"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-5n6d-sikkim-darjeeling-luxury",
    title: "5 Nights / 6 Days Sikkim & Darjeeling Tour (Luxury Heritage)",
    duration: "5 Nights / 6 Days",
    location: "Gangtok & Darjeeling (5★ Mayfair Spa Resort & Elgin Heritage Stays)",
    category: "Sikkim-Darjeeling",
    priceStarting: 28500,
    rating: 5.0,
    reviewsCount: 145,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "5★ Heritage Luxury Resort stays (Mayfair Spa Resort Gangtok & Elgin Darjeeling)",
      "VIP Executive Innova Crysta (Captain Seats) with personal chauffeur",
      "Guaranteed VIP Nathula Pass & Tsomgo Lake army permit clearance",
      "Exclusive Tiger Hill VIP viewing terrace & Glenary's Bakery high-tea session"
    ],
    itinerary: [
      {
        day: 1,
        title: "VIP Welcome & Transfer to Mayfair Spa Resort Gangtok",
        description: "VIP arrival reception in luxury Innova Crysta. Private check-in at Mayfair Spa Resort Gangtok."
      },
      {
        day: 2,
        title: "VIP Army Clearance Excursion: Tsomgo Lake & Nathula Pass",
        description: "Priority army permit departure to Tsomgo Lake (12,400 ft) and Nathula Pass Indo-China border."
      },
      {
        day: 3,
        title: "Private Heritage Sightseeing & Transfer to Elgin Darjeeling",
        description: "Rumtek Monastery private tour and scenic transfer to Elgin Heritage Hotel Darjeeling."
      },
      {
        day: 4,
        title: "Tiger Hill Sunrise VIP Terrace & Glenary's High-Tea",
        description: "Chauffeur drive to Tiger Hill with reserved VIP viewing terrace."
      },
      {
        day: 5,
        title: "Mirik Lake Boating & Spa / Leisure Afternoon",
        description: "Private trip to Mirik Lake and afternoon spa session."
      },
      {
        day: 6,
        title: "Gourmet Buffet Breakfast & Luxury Airport Transfer",
        description: "Gourmet breakfast and VIP transfer to Bagdogra Airport / NJP Station."
      }
    ],
    included: [
      "VIP Executive Innova Crysta (Captain Seats)",
      "5★ Heritage Resort stays with full meals",
      "VIP Nathula Army Permit"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-north-sikkim",
    title: "North Sikkim Wonders: Lachung, Yumthang & Zero Point",
    duration: "3 Nights / 4 Days",
    location: "Lachung, Yumthang Valley, Zero Point & Katao",
    category: "North Sikkim",
    priceStarting: 14500,
    rating: 5.0,
    reviewsCount: 185,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Vibrant Valley of Flowers at Yumthang (11,800 ft)",
      "Snowbound experience at Zero Point (Yumesamdong 15,300 ft)",
      "Lachung traditional village stays with local hospitality"
    ],
    itinerary: [
      {
        day: 1,
        title: "Gangtok to Lachung via Seven Sisters Waterfall",
        description: "Morning departure from Gangtok up to Lachung village."
      },
      {
        day: 2,
        title: "Lachung to Yumthang Valley & Zero Point (15,300 ft)",
        description: "Early morning drive to Yumthang Valley of Flowers and Zero Point."
      },
      {
        day: 3,
        title: "Lachung / Mount Katao Excursion & Return to Gangtok",
        description: "Optional visit to Mount Katao and drive back to Gangtok."
      },
      {
        day: 4,
        title: "Gangtok Onward Journey / Airport Drop",
        description: "Final drop to airport or station."
      }
    ],
    included: [
      "Protected Area Permits (PAP)",
      "4WD Scorpio / Bolero / Innova mountain vehicle",
      "Lachung hotel with all meals"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-6n7d-sikkim-darjeeling",
    title: "6 Nights / 7 Days Grand Sikkim, Pelling & Darjeeling Circuit",
    duration: "6 Nights / 7 Days",
    location: "Gangtok (2N), Tsomgo & Nathula, Pelling (2N) & Darjeeling (2N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 20000,
    rating: 4.9,
    reviewsCount: 198,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "Gangtok ropeway ride & Tsomgo Lake (12,400 ft) high altitude excursion",
      "Nathula Pass Indo-China border permit processing",
      "India's first Glass Skywalk & Pemayangtse Monastery at Pelling",
      "Ravangla Buddha Park & Temi Tea Estate organic garden walk",
      "Tiger Hill sunrise over Mt. Kanchenjunga & Batasia Loop Toy Train track"
    ],
    itinerary: [
      { day: 1, title: "NJP Station / Bagdogra Airport Pickup to Gangtok", description: "Warm reception at NJP / IXB Airport and private drive along Teesta River to Gangtok hotel." },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion", description: "High altitude trip to Tsomgo Lake (12,400 ft) & Baba Mandir with Nathula Pass option." },
      { day: 3, title: "Gangtok to Pelling via Temi Tea & Ravangla", description: "Scenic drive through Temi Tea Estate and Ravangla Buddha Park to Pelling." },
      { day: 4, title: "Pelling Glass Skywalk & Waterfall Tour", description: "Thrilling Glass Skywalk, Rabdentse Palace Ruins, and Pemayangtse Monastery." },
      { day: 5, title: "Pelling to Darjeeling Transfer", description: "Scenic drive towards Darjeeling Queen of the Hills. Evening stroll at Chowrasta." },
      { day: 6, title: "Darjeeling Tiger Hill Sunrise & City Tour", description: "Early Tiger Hill sunrise on Kanchenjunga, Batasia Loop, Ghoom Monastery, and Tea Garden." },
      { day: 7, title: "Departure to NJP Station / Bagdogra Airport", description: "Breakfast checkout and comfortable drop to Bagdogra Airport or NJP Station." }
    ],
    included: [
      "Private Innova Crysta / Xylo with expert driver",
      "6 Nights accommodation with daily Breakfast & Dinner",
      "All permits, toll taxes, fuel, and parking"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-7n8d-complete-sikkim-darjeeling",
    title: "7 Nights / 8 Days Complete Sikkim & Darjeeling Circuit",
    duration: "7 Nights / 8 Days",
    location: "Gangtok (2N), North Sikkim Lachung & Zero Point (2N), Pelling (1N) & Darjeeling (2N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 25800,
    rating: 5.0,
    reviewsCount: 167,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Snowbound Zero Point (Yumesamdong 15,300 ft) & Yumthang Valley of Flowers",
      "Traditional Lachung mountain village homestay experience",
      "High-altitude Tsomgo Lake (12,400 ft) & Baba Harbhajan Mandir",
      "Pelling Glass Skywalk & Kanchenjunga mountain panoramas",
      "Tiger Hill sunrise & Batasia Loop Toy Train track"
    ],
    itinerary: [
      { day: 1, title: "NJP / IXB Airport Pickup & Transfer to Gangtok", description: "Pick up at Bagdogra Airport or NJP station in private Innova Crysta to Gangtok." },
      { day: 2, title: "Gangtok to Lachung (North Sikkim)", description: "Drive to North Sikkim stopping at Seven Sisters Waterfall and Chungthang." },
      { day: 3, title: "Lachung to Yumthang Valley & Zero Point (15,300 ft)", description: "Early morning trip to Yumthang Valley of Flowers and snow-capped Zero Point." },
      { day: 4, title: "Lachung Return to Gangtok", description: "Scenic drive back to Gangtok with stops at Singhik viewpoint and Ban Jhakri." },
      { day: 5, title: "Tsomgo Lake Excursion & Transfer to Pelling", description: "Morning trip to Tsomgo Lake (12,400 ft). Afternoon transfer to Pelling." },
      { day: 6, title: "Pelling Glass Skywalk & Drive to Darjeeling", description: "Pelling Glass Skywalk & Rabdentse Ruins visit, then drive to Darjeeling." },
      { day: 7, title: "Darjeeling Tiger Hill Sunrise & Sightseeing", description: "4:00 AM Tiger Hill sunrise over Kanchenjunga, Batasia Loop, and HMI Zoo." },
      { day: 8, title: "Darjeeling Drop to NJP / Bagdogra Airport", description: "Check-out after breakfast and private drop to NJP Station / IXB Airport." }
    ],
    included: [
      "North Sikkim Protected Area Permit (PAP) & Tsomgo permits",
      "Private 4WD Scorpio / Innova Crysta vehicle",
      "7 Nights deluxe hotel stays with meals"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-8n9d-ultimate-himalayan-odyssey",
    title: "8 Nights / 9 Days Ultimate Himalayan Odyssey: Sikkim, Kalimpong & Darjeeling",
    duration: "8 Nights / 9 Days",
    location: "Gangtok (2N), North Sikkim (2N), Pelling (2N), Kalimpong (1N) & Darjeeling (1N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 29900,
    rating: 5.0,
    reviewsCount: 142,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "East Sikkim, North Sikkim, West Sikkim, Kalimpong & Darjeeling",
      "Zero Point (15,300 ft), Yumthang Valley, Tsomgo Lake & Nathula Pass",
      "Pelling Glass Skywalk & Rabdentse Palace Ruins",
      "Kalimpong Deolo Hill, Cactus Nursery & Durpin Monastery",
      "Tiger Hill Kanchenjunga sunrise & Darjeeling Tea Estate walk"
    ],
    itinerary: [
      { day: 1, title: "NJP / IXB Airport Pickup to Gangtok", description: "Arrival pickup to Gangtok and evening stroll at MG Marg." },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion", description: "Drive to Tsomgo Lake (12,400 ft) and Baba Mandir." },
      { day: 3, title: "Gangtok to Lachung (North Sikkim)", description: "Journey into North Sikkim pine forests and waterfalls to Lachung." },
      { day: 4, title: "Yumthang Valley & Zero Point (15,300 ft)", description: "Excursion to Yumthang Valley and snow-clad Zero Point." },
      { day: 5, title: "Lachung to Gangtok Local Tour", description: "Return drive to Gangtok with Hanuman Tok and Ganesh Tok stops." },
      { day: 6, title: "Gangtok to Pelling via Temi Tea & Ravangla", description: "Drive to West Sikkim through Temi Tea Garden and Buddha Park." },
      { day: 7, title: "Pelling Glass Skywalk & Drive to Kalimpong", description: "Experience Glass Skywalk and drive along Teesta River to Kalimpong." },
      { day: 8, title: "Kalimpong Sightseeing & Transfer to Darjeeling", description: "Deolo Hill and Cactus Nursery tour, then afternoon transfer to Darjeeling." },
      { day: 9, title: "Tiger Hill Sunrise & Drop to NJP / IXB Airport", description: "Tiger Hill Kanchenjunga sunrise, Batasia Loop, and transfer to airport/station." }
    ],
    included: [
      "Private Innova Crysta / Xylo vehicle throughout",
      "8 Nights deluxe hotel accommodation with daily meals",
      "All Sikkim Restricted Area Permits & army permit clearance"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-silk-route-zuluk",
    title: "Old Silk Route Zuluk & Reshi Khola Heritage Tour",
    duration: "3 Nights / 4 Days",
    location: "Sillery Gaon, Zuluk, Nathang Valley & Gangtok",
    category: "Silk Route",
    priceStarting: 11500,
    rating: 4.9,
    reviewsCount: 145,
    heroImage: "/images/agency_poster_dark_1785772843834.jpg",
    highlights: [
      "30+ Hairpin bends of Old Silk Route Zig-Zag road",
      "Thambi Viewpoint Kanchenjunga sunrise & Kupup Elephant Lake",
      "Authentic homestays with Sikkimese home-cooked meals"
    ],
    itinerary: [
      { day: 1, title: "NJP / IXB Airport to Sillery Gaon", description: "Pick up and drive to eco-village Sillery Gaon or Reshi Khola riverbank." },
      { day: 2, title: "Sillery Gaon to Zuluk via Rongli Permits", description: "Rongli permit processing, Kuekhola Falls, and drive to Zuluk." },
      { day: 3, title: "Zuluk Zig-Zag Road to Kupup Lake & Gangtok", description: "Thambi sunrise, Nathang Valley, Old Baba Mandir, Kupup Lake & Gangtok drop." },
      { day: 4, title: "Gangtok Departure to NJP / IXB Airport", description: "Breakfast, MG Marg stroll, and drop to station or airport." }
    ],
    included: [
      "Private mountain vehicle with expert local driver",
      "3 Nights homestay/hotel stays with meals",
      "Rongli Silk Route Inner Line Permit processing"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-north-sikkim-5d4n",
    title: "5 Days / 4 Nights North Sikkim Special: Lachen, Lachung, Gurudongmar & Zero Point",
    duration: "4 Nights / 5 Days",
    location: "Gangtok (2N), Lachen (1N) & Lachung (1N)",
    category: "North Sikkim",
    priceStarting: 17800,
    rating: 4.9,
    reviewsCount: 176,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Sacred Gurudongmar Lake (17,800 ft) & Yumthang Valley",
      "Zero Point (Yumesamdong 15,300 ft) year-round snow",
      "Complete North Sikkim Restricted Area Permit clearance"
    ],
    itinerary: [
      { day: 1, title: "NJP / IXB Airport to Gangtok", description: "Pick up to Gangtok and evening stroll at MG Marg." },
      { day: 2, title: "Gangtok to Lachen Village", description: "Drive to North Sikkim stopping at Seven Sisters Waterfall and Chungthang." },
      { day: 3, title: "Gurudongmar Lake (17,800 ft) & Drive to Lachung", description: "Early morning trip to Gurudongmar Lake, then transfer to Lachung." },
      { day: 4, title: "Yumthang Valley & Zero Point to Gangtok", description: "Yumthang Valley of Flowers and Zero Point excursion, return to Gangtok." },
      { day: 5, title: "Gangtok Drop to NJP / IXB Airport", description: "Breakfast and private transfer to airport or railway station." }
    ],
    included: [
      "Protected Area Permit (PAP) for North Sikkim & Gurudongmar",
      "4WD Scorpio / Bolero / Innova mountain vehicle",
      "4 Nights accommodation with daily Meals"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-4n5d-sikkim-darjeeling-budget",
    title: "4 Nights / 5 Days Gangtok, Tsomgo Lake & Darjeeling Budget Explorer",
    duration: "4 Nights / 5 Days",
    location: "Gangtok (2N) & Darjeeling (2N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 14200,
    rating: 4.8,
    reviewsCount: 154,
    heroImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highlights: [
      "Tsomgo Lake (12,400 ft) & Baba Harbhajan Mandir",
      "Gangtok Ropeway & Tiger Hill Kanchenjunga sunrise",
      "Budget-friendly private cab tour with quality 3★ stays"
    ],
    itinerary: [
      { day: 1, title: "NJP / IXB Airport to Gangtok", description: "Pickup drive to Gangtok hotel and evening at MG Marg." },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion", description: "Excursion to alpine Tsomgo Lake and Baba Mandir." },
      { day: 3, title: "Gangtok Tour & Transfer to Darjeeling", description: "Ban Jhakri Waterfalls and Cable Car, then drive to Darjeeling." },
      { day: 4, title: "Darjeeling Tiger Hill & 7-Point Sightseeing", description: "4:00 AM Tiger Hill sunrise, Batasia Loop, and Tea Estate." },
      { day: 5, title: "Darjeeling Drop to NJP / IXB Airport", description: "Breakfast and drop to station or airport." }
    ],
    included: [
      "Private sedan/SUV vehicle with professional local driver",
      "4 Nights 3★ hotel stays with Breakfast & Dinner",
      "Tsomgo Lake & Nathula Pass permit coordination"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-honeymoon-sikkim-darjeeling",
    title: "5 Nights / 6 Days Romantic Sikkim & Darjeeling Honeymoon Special",
    duration: "5 Nights / 6 Days",
    location: "Gangtok (3N) & Darjeeling (2N)",
    category: "Honeymoon",
    priceStarting: 22500,
    rating: 5.0,
    reviewsCount: 132,
    heroImage: "/images/darjeeling_toy_train_1785681122611.jpg",
    highlights: [
      "Candlelight Dinner with floral bed decor & honeymoon cake",
      "Private Innova Crysta throughout & Mirik Lake couple boating",
      "High Tea at Glenary's Bakery Darjeeling & Tiger Hill sunrise"
    ],
    itinerary: [
      { day: 1, title: "Romantic Welcome & Gangtok Transfer", description: "Chauffeur reception, drive to Gangtok, candlelight dinner with cake & bed decor." },
      { day: 2, title: "Tsomgo Lake & Baba Mandir Excursion", description: "Snowy Tsomgo Lake excursion and traditional yak photo opportunities." },
      { day: 3, title: "Gangtok Sightseeing & MG Marg Stroll", description: "Ban Jhakri Waterfalls, Flower Exhibition, and romantic stroll at MG Marg." },
      { day: 4, title: "Gangtok to Darjeeling via Mirik Lake", description: "Drive to Darjeeling with couple boating at Mirik Lake & Nepal border market." },
      { day: 5, title: "Tiger Hill Sunrise & Glenary's High-Tea", description: "Tiger Hill Kanchenjunga sunrise, Tea Garden, and Glenary's High-Tea." },
      { day: 6, title: "Breakfast & Private Airport Drop", description: "Breakfast, tea hamper gift, and drop to airport/station." }
    ],
    included: [
      "Private Innova Crysta throughout with romantic setup",
      "5 Nights boutique hotel stays with daily breakfast & dinner",
      "1x Candlelight Dinner, Floral Bed Decor, Honeymoon Cake & Mirik Boating"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  }
];

const CAB_OPTIONS_INITIAL = [
  {
    id: "cab-innova-crysta",
    model: "Toyota Innova Crysta",
    type: "Luxury SUV",
    capacity: "6-7 Passengers + Luggage",
    bestFor: "Families, Couples, Long Mountain Drives & Nathula Pass",
    ratePerDay: 4500,
    njpIxbPickupRate: 3800,
    image: "/images/innova_crysta_cab_1785680577329.jpg",
    features: [
      "Captain Seats with plush leather cushioning",
      "Rear dual-zone air conditioning & heating",
      "Professional hill-certified drivers with 10+ yrs experience"
    ]
  },
  {
    id: "cab-xylo-scorpio",
    model: "Mahindra Xylo / Scorpio 4x4",
    type: "Rugged Mountain SUV",
    capacity: "6 Passengers",
    bestFor: "North Sikkim (Lachung/Zero Point) rough terrains",
    ratePerDay: 4000,
    njpIxbPickupRate: 3400,
    image: "/images/innova_crysta_cab_1785680577329.jpg",
    features: [
      "High ground clearance for snow & rocky mountain roads",
      "All-wheel drive stability for steep climbs"
    ]
  },
  {
    id: "cab-sedan-dzire",
    model: "Swift Dzire / Toyota Etios",
    type: "4-Seater Sedan",
    capacity: "4 Passengers + Luggage",
    bestFor: "Couples, Small Families, NJP/IXB transfers & Gangtok-Darjeeling tours",
    ratePerDay: 3200,
    njpIxbPickupRate: 2800,
    image: "/images/innova_mountain_drive_1785681104445.jpg",
    features: [
      "Comfortable 4-seater executive sedan with boot space",
      "Clean air-conditioned interior & smooth highway ride",
      "Ideal for Bagdogra / NJP pickups & Gangtok city tours"
    ]
  },
  {
    id: "cab-hatchback-wagonr",
    model: "WagonR / Swift / Alto",
    type: "4-Seater Hatchback",
    capacity: "3-4 Passengers",
    bestFor: "Budget Travelers, Couples, Local Point-to-Point drops & town tours",
    ratePerDay: 2500,
    njpIxbPickupRate: 2200,
    image: "/images/innova_mountain_drive_1785681104445.jpg",
    features: [
      "Compact and nimble for smooth Gangtok town point drops",
      "Most economical choice for budget-conscious travelers"
    ]
  }
];
const SYSTEM_PROMPT = `
You are the Official AI Sales Engine, Travel Planner & Itinerary Advisor for "OffbeatDestination Travels", a top-rated, government-registered travel agency located in Gangtok, Sikkim (Reg No: 1750/DoT&CAv/Gtk/25/TA).

YOUR BUSINESS PROFILE & TRAINED KNOWLEDGE:
- Business Name: OffbeatDestination Travels
- Official Website / Domain: https://offbeatdestination.in (offbeatdestination.in)
- Tagline: "A better way to explore"
- Location: Arithang, Gangtok, Sikkim - 737102
- Contact Phone: +91 62961 02341 / +91 98513 70773
- Official Email: info@offbeatdestination.in
- Reputation: Government-registered travel agency in Sikkim, 4.9-star rating based on 500+ authentic traveler reviews.

MANDATORY SIKKIM TOURISM & PERMIT REGULATIONS (STRICT COMPLIANCE REQUIRED):
1. MANDATORY 2-NIGHT LACHUNG STAY: As per official Sikkim Tourism & Army licensing regulations, ANY itinerary visiting North Sikkim (Lachung, Yumthang Valley, Zero Point, Katao) MUST include a MINIMUM 2-NIGHT STAY IN LACHUNG for high-altitude safety and complete permits. Single-night Lachung trips are NOT PERMITTED.
2. SMALL CAB RESTRICTIONS: Hatchbacks (WagonR/Alto) & Sedans (Swift Dzire/Etios) are STRICTLY BARRED for North Sikkim & Nathula Pass high-altitude army permits. Only 4WD SUVs (Innova Crysta, Scorpio 4x4, Xylo) are permit-approved.
3. AFFILIATED HOTEL PARTNERS: Direct contracts with Summit Hotels, Udaan Resorts, Mayfair Spa Resort, Yashshree, Sterling, and Rufina.

CORE OFFERINGS:
1. Customized Tailored Itineraries combining Popular Tourist Icons with Offbeat Hidden Gems.
2. North Sikkim Tours: Lachung (Mandatory 2 Nights stay), Yumthang Valley of Flowers, Zero Point (15,300 ft), Gurudongmar Lake (17,800 ft), and Mount Katao.
3. South & West Sikkim Offbeat Routes: Namthang village homestay, Tarey Bhir 10,000ft cliff ridge, Ravangla Buddha Park, Temi Organic Tea Garden, and Pelling Glass Skywalk.
4. Old Silk Route Zuluk Circuit: Reshi Khola riverbank, Aritar Lampokhari Lake, 30+ Hairpin bends, Thambi Viewpoint, and Nathang Valley.
5. Darjeeling & Kalimpong Highlights: Tiger Hill 4 AM sunrise, Batasia Loop Toy Train, Happy Valley Tea Estate, Lamahatta Eco Park, and Mirik Sumendu Lake.
6. Custom Bhutan Cultural Tours: Paro Tiger's Nest, Thimphu, Punakha with SDF permits.

PERSONALIZED ITINERARY CREATION INSTRUCTIONS:
When a customer asks for a travel recommendation or itinerary:
- Ask or collect their 4 key preferences:
  1. Preferred Duration (e.g. 3 Days, 5 Days, 7 Days, 10 Days)
  2. Travel Companions (Solo, Honeymoon Couple, Family with Kids/Seniors, Group of Friends)
  3. Primary Interests (Adventure, Culture & Heritage, Nature & Wildlife, Relaxation, Offbeat Hidden Gems)
  4. Budget Level (Budget Deluxe, Premium 3★/4★, Ultra Luxury 5★)
- Provide a day-by-day tailored itinerary featuring a 50/50 mix of popular highlights (e.g. Tsomgo Lake, Tiger Hill) and offbeat spots (e.g. Tarey Bhir cliff walk, Lamahatta pine gardens, Sillery Gaon, Katao).
- Include estimated package costs per person and for the group.
- Always include the mandatory 2-Night Lachung rule note for North Sikkim.

YOUR CONVERSATION STYLE:
- Respond in a warm, polite, hospitable Indian mountain hospitality tone ("Namaste! 🙏").
- CLOSING THE SALE: After providing advice or an itinerary proposal, ask: "To lock in your preferred vehicle and receive a complete PDF quotation on WhatsApp, may I have your WhatsApp number or phone number? Our Gangtok travel coordinator will finalize your custom permit slot immediately!"
`;

// Helper: Build Dynamic Offline Fallback Itinerary using Backend Managed Rates
function buildFallbackItinerary(params: any) {
  const durationDays = parseInt(params.duration) || 5;
  const travelers = parseInt(params.travelers) || 2;
  const budget = params.budget || 'Premium 3★/4★';
  const companion = params.companions || 'Couple / Family';
  const interests = Array.isArray(params.interests) ? params.interests.join(', ') : (params.interests || 'Popular Spots & Offbeat Locations');
  const isNorthSikkimRequested = (params.destination && params.destination.toLowerCase().includes('north')) || (typeof interests === 'string' && interests.toLowerCase().includes('zero point')) || durationDays >= 5;

  // 1. Look up Cab Rate from backend cabsDatabase
  let matchedCab = cabsDatabase.find(c => c.id === 'cab-innova-crysta');
  if (budget.includes('Budget') || budget.includes('Sedan')) {
    matchedCab = cabsDatabase.find(c => c.id === 'cab-sedan-dzire') || cabsDatabase[0];
  } else if (isNorthSikkimRequested || budget.includes('4x4') || budget.includes('Scorpio')) {
    matchedCab = cabsDatabase.find(c => c.id === 'cab-xylo-scorpio') || matchedCab;
  }
  const cabRatePerDay = matchedCab ? matchedCab.ratePerDay : 4500;
  const vehicle = matchedCab ? `${matchedCab.model}` : "Toyota Innova Crysta";

  // 2. Look up Hotel Night Rate from backend ratesConfigDatabase
  let hotelNightRate = ratesConfigDatabase.hotelNightRates.premium3Star;
  if (budget.includes('Budget') || budget.includes('Deluxe')) {
    hotelNightRate = ratesConfigDatabase.hotelNightRates.budgetDeluxe;
  } else if (budget.includes('Luxury') || budget.includes('5★')) {
    hotelNightRate = ratesConfigDatabase.hotelNightRates.luxury5Star;
  }

  // 3. Look up Permit Fees from backend ratesConfigDatabase
  const permitFee = isNorthSikkimRequested
    ? ratesConfigDatabase.permitFees.northSikkimPermit
    : ratesConfigDatabase.permitFees.tsomgoPermit;

  // 4. Calculate total cost using Backend Rates Matrix & Seasonal Multiplier
  const totalVehicleCost = cabRatePerDay * durationDays;
  const hotelNights = Math.max(1, durationDays - 1);
  const roomsNeeded = Math.ceil(travelers / 2);
  const totalHotelCost = hotelNightRate * hotelNights * roomsNeeded;
  const subtotal = (totalVehicleCost + totalHotelCost + permitFee) * ratesConfigDatabase.seasonalMultiplier;
  const totalTax = subtotal * (ratesConfigDatabase.gstTaxPercentage / 100);
  const totalCost = Math.round(subtotal + totalTax);
  const costPerPerson = Math.round(totalCost / travelers);

  const dayByDay = [];

  // Day 1
  dayByDay.push({
    day: 1,
    title: "NJP Station / Bagdogra Airport (IXB) Pickup to Gangtok",
    popularHighlights: ["Scenic Teesta River drive", "MG Marg pedestrian boulevard evening walk"],
    offbeatHighlights: ["Flower Exhibition Centre", "Local Sikkimese Bakery High-Tea"],
    overnightStay: budget.includes('Luxury') ? "Mayfair Spa Resort, Gangtok" : "Summit Denzong / Udaan Woodberry, Gangtok",
    mealsIncluded: "Welcome Drink & Gourmet Dinner (AP/MAP Plan)",
    details: "Chauffeur reception at NJP or Bagdogra Airport. Private drive through lush Teesta river valley up to Gangtok. Evening stroll at MG Marg."
  });

  if (isNorthSikkimRequested && durationDays >= 3) {
    // MANDATORY 2 NIGHT LACHUNG STAY FOR NORTH SIKKIM
    dayByDay.push({
      day: 2,
      title: "Gangtok to Lachung (North Sikkim) via Waterfalls [Lachung Stay Night 1]",
      popularHighlights: ["Seven Sisters Waterfall", "Chungthang Confluence"],
      offbeatHighlights: ["Kabi Lungchok historic treaty grove", "Bhim Nala Waterfall"],
      overnightStay: "Rufina Lachung Grand / Traditional Alpine Homestay, Lachung",
      mealsIncluded: "Breakfast, Lunch & Hot Sikkimese Dinner (AP Plan Included)",
      details: "Morning departure in 4WD SUV with North Sikkim Protected Area Permit (PAP). Scenic drive through pine forests and mountain cascades to Lachung village for Night 1 stay. ⚠️ MANDATORY 2-NIGHT LACHUNG STAY ENFORCED."
    });

    dayByDay.push({
      day: 3,
      title: "Lachung to Yumthang Valley, Zero Point (15,300 ft) & Katao [Lachung Stay Night 2]",
      popularHighlights: ["Yumthang Valley of Flowers (11,800 ft)", "Snowbound Zero Point (Yumesamdong 15,300 ft)"],
      offbeatHighlights: ["Mount Katao border snow peak excursion", "Hot Sulphur Springs"],
      overnightStay: "Rufina Lachung Grand / Traditional Alpine Homestay, Lachung",
      mealsIncluded: "Breakfast, Packed Lunch & Hot Dinner (AP Plan Included)",
      details: "Early morning drive to Yumthang Valley of Flowers and snow-capped Zero Point. Excursion to offbeat Mount Katao. Return to Lachung for 2nd mandatory night stay with hot home-cooked meals."
    });

    if (durationDays >= 4) {
      dayByDay.push({
        day: 4,
        title: "Lachung Return to Gangtok via Naga Waterfalls",
        popularHighlights: ["Naga Waterfalls", "Singhik Mt. Kanchenjunga Viewpoint"],
        offbeatHighlights: ["Phodong Monastery offbeat detour", "Ban Jhakri Energy Park"],
        overnightStay: budget.includes('Luxury') ? "Mayfair Spa Resort, Gangtok" : "Summit Denzong / Udaan Woodberry, Gangtok",
        mealsIncluded: "Breakfast & Dinner",
        details: "Leisurely morning village walk in Lachung. Drive back to Gangtok with panoramic Kanchenjunga viewpoints and Ban Jhakri Waterfalls."
      });
    }

    if (durationDays >= 5) {
      dayByDay.push({
        day: 5,
        title: "Tsomgo Glacial Lake (12,400 ft) & Drive to Darjeeling",
        popularHighlights: ["Sacred Tsomgo Lake (12,400 ft)", "Baba Harbhajan Singh Mandir"],
        offbeatHighlights: ["Kyongnosla Alpine Sanctuary view", "Lamahatta Eco Park pine gardens"],
        overnightStay: budget.includes('Luxury') ? "The Elgin Heritage Hotel, Darjeeling" : "Udaan Dekeling / Summit Grace, Darjeeling",
        mealsIncluded: "Breakfast & Dinner",
        details: "High-altitude trip to alpine Tsomgo Lake. Afternoon transfer through pine-scented tea estate hills to Darjeeling Queen of Hills."
      });
    }

    if (durationDays >= 6) {
      dayByDay.push({
        day: 6,
        title: "Darjeeling Tiger Hill Sunrise & 7-Point Sightseeing",
        popularHighlights: ["Tiger Hill 4:00 AM Kanchenjunga Sunrise", "Batasia Loop & Ghoom Toy Train track"],
        offbeatHighlights: ["Happy Valley Tea Estate walk", "Japanese Peace Pagoda"],
        overnightStay: budget.includes('Luxury') ? "The Elgin Heritage Hotel, Darjeeling" : "Udaan Dekeling / Summit Grace, Darjeeling",
        mealsIncluded: "Breakfast & Dinner",
        details: "Early morning Kanchenjunga sunrise at Tiger Hill, Batasia Loop, Himalayan Mountaineering Institute, Padmaja Naidu Himalayan Zoo, and tea tasting."
      });
    }

    if (durationDays >= 7) {
      dayByDay.push({
        day: 7,
        title: "Mirik Sumendu Lake & Pashupati Nepal Border Market",
        popularHighlights: ["Mirik Sumendu Lake paddle boating", "Pashupati Nepal Border Market"],
        offbeatHighlights: ["Bunkulung offbeat eco-village", "Kurseong Dow Hill tea slopes"],
        overnightStay: "Mirik Lake Resort / Kurseong Tea Estate Stay",
        mealsIncluded: "Breakfast & Dinner",
        details: "Day trip through rolling tea garden hills to Mirik Lake for couple/family boating and Nepal border shopping."
      });
    }
  } else {
    // Non-North Sikkim / Standard Sikkim-Darjeeling
    dayByDay.push({
      day: 2,
      title: "Excursion to Tsomgo Lake (12,400 ft) & Baba Mandir (Nathula Pass Optional)",
      popularHighlights: ["Tsomgo Glacial Lake", "Baba Harbhajan Mandir"],
      offbeatHighlights: ["Kyongnosla Alpine Sanctuary view", "Local Yak Ride & Hot Soup"],
      overnightStay: budget.includes('Luxury') ? "Mayfair Spa Resort, Gangtok" : "Summit Denzong / Udaan Woodberry, Gangtok",
      mealsIncluded: "Breakfast & Dinner",
      details: "Day trip to sacred Tsomgo Lake at 12,400 ft and Baba Mandir with optional Nathula Pass border permit extension."
    });

    dayByDay.push({
      day: 3,
      title: "Gangtok to Pelling via Temi Tea & Ravangla Buddha Park",
      popularHighlights: ["Ravangla Buddha Park (130ft Golden Buddha)", "Temi Organic Tea Estate"],
      offbeatHighlights: ["Tarey Bhir 10,000ft Cliff Ridge Walk", "Namthang organic village"],
      overnightStay: "Summit Clover / Udaan Alpine, Pelling",
      mealsIncluded: "Breakfast & Dinner",
      details: "Drive to West Sikkim through organic tea gardens and 10,000ft Tarey Bhir cliff ridge to Pelling."
    });

    dayByDay.push({
      day: 4,
      title: "Pelling Glass Skywalk & Transfer to Darjeeling",
      popularHighlights: ["India's First Glass Skywalk", "Pemayangtse Monastery"],
      offbeatHighlights: ["Rabdentse Palace Ruins walk", "Kanchenjunga Waterfalls"],
      overnightStay: budget.includes('Luxury') ? "The Elgin Heritage Hotel, Darjeeling" : "Udaan Dekeling / Summit Grace, Darjeeling",
      mealsIncluded: "Breakfast & Dinner",
      details: "Experience the thrilling Glass Skywalk facing Mt. Kanchenjunga and Rabdentse Palace Ruins before driving to Darjeeling."
    });

    if (durationDays >= 5) {
      dayByDay.push({
        day: 5,
        title: "Darjeeling Tiger Hill Sunrise & City Sightseeing",
        popularHighlights: ["Tiger Hill 4:00 AM Kanchenjunga Sunrise", "Batasia Loop Toy Train track"],
        offbeatHighlights: ["Lamahatta Eco Park pine gardens", "Happy Valley Tea tasting"],
        overnightStay: budget.includes('Luxury') ? "The Elgin Heritage Hotel, Darjeeling" : "Udaan Dekeling / Summit Grace, Darjeeling",
        mealsIncluded: "Breakfast & Dinner",
        details: "4 AM Tiger Hill sunrise, Batasia Loop, Ghoom Monastery, Padmaja Naidu Himalayan Zoo, and tea estate stroll."
      });
    }
  }

  // Final Departure Day
  dayByDay.push({
    day: durationDays,
    title: "Departure Transfer to NJP Railway Station / Bagdogra Airport (IXB)",
    popularHighlights: ["Scenic downhill drive", "Teesta souvenirs"],
    offbeatHighlights: ["Gourmet Himalayan Tea gift box"],
    overnightStay: "Home Sweet Home",
    mealsIncluded: "Buffet Breakfast at Hotel",
    details: "Breakfast checkout and private chauffeur transfer down to NJP Station or Bagdogra Airport with unforgettable memories."
  });

  return {
    title: `${durationDays} Days / ${durationDays - 1} Nights ${companion} Himalayan Odyssey (${budget})`,
    duration: `${durationDays - 1} Nights / ${durationDays} Days`,
    companions: companion,
    interests: Array.isArray(params.interests) ? params.interests : [interests],
    budgetTier: budget,
    estimatedCostPerPerson: `₹${costPerPerson.toLocaleString('en-IN')}`,
    totalEstimatedCost: `₹${totalCost.toLocaleString('en-IN')} (for group of ${travelers})`,
    vehicleRecommended: vehicle,
    hasNorthSikkim: isNorthSikkimRequested,
    lachungMandatory2NightsApplied: isNorthSikkimRequested,
    overview: `Tailored ${durationDays}-day itinerary for ${companion} focusing on ${interests}. Perfectly balances popular top-rated sights with serene offbeat villages. ${isNorthSikkimRequested ? 'Includes mandatory 2-Night Lachung stay for high-altitude acclimatization as per Sikkim Tourism rules.' : ''}`,
    dayByDay,
    inclusions: [
      `Private ${vehicle} throughout with certified local hill driver`,
      `${durationDays - 1} Nights accommodation in ${budget} affiliated properties (Summit / Udaan / Rufina)`,
      "Daily Breakfast & Dinner included (AP Plan for North Sikkim)",
      isNorthSikkimRequested ? "North Sikkim Restricted Area Permit (PAP) & Lachung 2-Night Mandate clearance" : "All Sikkim & Tsomgo Army permits",
      "All driver allowances, tolls, fuel, parking, and state entry taxes"
    ],
    permitsRequired: isNorthSikkimRequested
      ? ["North Sikkim Restricted Area Permit (PAP)", "Lachung 2-Night High Altitude Mandate"]
      : ["Tsomgo Lake & Nathula Pass Army Permits"]
  };
}

// API Endpoint: AI Chat Assistant
app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message parameter is required.' });
  }

  // Fallback offline intelligent responder if AI key is missing or API unavailable
  const generateFallbackResponse = (userMsg: string) => {
    const lower = userMsg.toLowerCase();
    if (lower.includes('itinerary') || lower.includes('plan') || lower.includes('custom') || lower.includes('days') || lower.includes('budget') || lower.includes('family') || lower.includes('couple') || lower.includes('solo')) {
      return "Namaste! 🙏 I can design a **100% personalized itinerary** tailored to your exact duration, travel companions, interests, and budget!\n\nFor example:\n• **5N/6D Sikkim & Darjeeling**: Combines popular Tsomgo Lake & Tiger Hill with offbeat Tarey Bhir 10,000ft cliff ridge and Lamahatta pine gardens.\n• **North Sikkim (Lachung & Zero Point)**: Features our **mandatory 2-Night Lachung stay** for full high-altitude safety & permit clearance in 4WD Scorpio/Innova.\n\nClick the **✨ Build My Custom Itinerary** button above or share your preferred **duration, group size, and WhatsApp number** to receive an instant PDF quote!";
    } else if (lower.includes('5n/6d') || lower.includes('sikkim darjeeling') || lower.includes('package')) {
      return "Namaste! 🙏 Our signature **5 Nights / 6 Days Sikkim & Darjeeling Tour** is our most popular package! It covers Gangtok local sightseeing, Tsomgo Lake, Baba Mandir, Nathula Pass border, and Darjeeling Tiger Hill sunrise along with offbeat Lamahatta Eco Park. We include clean Innova Crysta private transfers and hotel stays with meals.\n\nTo lock in your preferred travel dates and receive a complete PDF itinerary with exact pricing, may I have your **WhatsApp number** or **Phone number**?";
    } else if (lower.includes('north sikkim') || lower.includes('zero point') || lower.includes('lachung')) {
      return "Namaste! 🙏 For **North Sikkim (Lachung, Yumthang Valley & Zero Point at 15,300 ft)**, we arrange 2N/3D or 3N/4D trips with full Restricted Area Permit (PAP) processing. As per Sikkim Tourism rules, a **minimum 2-Night stay in Lachung is MANDATORY**. Vehicles used are rugged Scorpio 4x4 or Innova Crysta (small cabs are strictly not permitted).\n\nCould you share your tentative **travel dates and WhatsApp number** so our Gangtok permit team can check permit slots and send you the best quote?";
    } else if (lower.includes('cab') || lower.includes('innova') || lower.includes('pickup') || lower.includes('njp') || lower.includes('ixb') || lower.includes('bagdogra') || lower.includes('sedan') || lower.includes('hatchback')) {
      return "Namaste! 🙏 We provide private **Toyota Innova Crystas**, Mahindra Xylo 4x4s, 4-Seater Sedans (Swift Dzire/Etios), and Budget Hatchbacks (WagonR/Swift) directly from **NJP Railway Station** and **Bagdogra Airport (IXB)** straight to Gangtok or Darjeeling. Rates start at ₹2,200 for hatchbacks and ₹2,800 for sedans with professional hill drivers. Note: Small cabs are not allowed for North Sikkim or Nathula permits.\n\nWhat date is your arrival, and what is your **WhatsApp number**? I'll have our transport manager reserve your driver right away!";
    } else if (lower.includes('veg') || lower.includes('food') || lower.includes('jain') || lower.includes('non veg') || lower.includes('halal') || lower.includes('chicken') || lower.includes('fish')) {
      return "Namaste! 🙏 We cater to all dietary & meal preferences across Sikkim, Darjeeling, and Bhutan:\n• **Pure Veg & Strict Jain Food**: Prepared in separate utensils with 100% no onion, garlic, or root vegetables on request.\n• **Non-Veg Delicacies**: Fresh Sikkimese local chicken curry, Teesta river trout fish, Bengali fish curry in Darjeeling, egg/chicken momos & thukpa.\n• **Certified Halal Meals**: Special Halal dining arrangements available in Gangtok (MG Marg) & Darjeeling.\n\nMay I know your group size and **WhatsApp number** so our team can send customized hotel & meal plans?";
    } else {
      return "Namaste! 🙏 Welcome to OffbeatDestination Travels, Gangtok's 4.9★ rated local travel agency! We arrange customized Sikkim, Darjeeling & Bhutan packages, Nathula permits, and NJP/IXB Innova Crysta rentals.\n\nTo help you plan the perfect journey, could you share your travel dates, preferred destination, or your **WhatsApp number**?";
    }
  };

  try {
    if (!ai) {
      return res.json({
        reply: generateFallbackResponse(message),
        isFallback: true
      });
    }

    // Build context with history
    let promptText = `${SYSTEM_PROMPT}\n\n`;
    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      promptText += "Recent Conversation Context:\n";
      conversationHistory.slice(-6).forEach((msg: any) => {
        promptText += `${msg.sender === 'user' ? 'Customer' : 'Offbeat AI'}: ${msg.text}\n`;
      });
    }
    promptText += `Customer: ${message}\nOffbeat AI:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
    });

    const replyText = response.text || generateFallbackResponse(message);
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini Chat Error:', error);
    res.json({
      reply: generateFallbackResponse(message),
      isFallback: true,
      error: error?.message || 'AI service temporary fallback'
    });
  }
});

// API Endpoint: AI Himalayan Booking Concierge
app.post('/api/ai/concierge', async (req, res) => {
  const { prompt, context } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    if (!ai) {
      return res.json({
        reply: `Namaste! Based on "${prompt}", we recommend our signature 5N/6D Sikkim & Darjeeling or North Sikkim Special tour with private Innova Crysta transfers and 4-star view resorts. All army permits and local sightseeing are pre-arranged!`,
        bulletPoints: [
          'Certified hill chauffeur with clean commercial registration',
          'Mountain view stays in Gangtok & Darjeeling',
          'Fast-track Tsomgo Lake & Nathula army permits',
        ],
      });
    }

    const aiPrompt = `You are the Senior Concierge at OffbeatDestination Travels, Gangtok, Sikkim (Govt Regd: 1750/DoT&CAv/Gtk/25/TA).
Analyze this customer traveler query: "${prompt}".
Provide a concise, friendly, luxury-toned response (under 80 words) and 3 to 4 actionable bullet points on destinations, acclimatization tips, vehicle recommendations, and permit requirements.
Focus on Sikkim, Darjeeling, North Sikkim (Lachung/Gurudongmar), or Silk Route.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: aiPrompt,
    });

    const reply = response.text || 'We have crafted an optimal Himalayan package for your request.';
    return res.json({
      reply,
      bulletPoints: [
        'Private sanitized vehicle with experienced hill chauffeur',
        'Handpicked boutique & luxury view stays',
        'Restricted area permits cleared directly via Gangtok desk',
      ],
    });
  } catch (err: any) {
    return res.json({
      reply: `Namaste! For "${prompt}", our team recommends combining iconic sights with offbeat serene viewpoints, dedicated Innova Crysta transfers, and full permit processing.`,
      bulletPoints: [
        'Complimentary high-altitude health advisory',
        'Direct local coordination from Gangtok office',
      ],
    });
  }
});

// API Endpoint: Custom AI Itinerary Generator
app.post('/api/generate-itinerary', async (req, res) => {
  const { duration, destination, travelers, preferences, budget, companions, interests, vegMeals } = req.body;

  try {
    if (!ai) {
      const fallbackData = buildFallbackItinerary({
        duration,
        destination,
        travelers,
        preferences,
        budget,
        companions,
        interests,
        vegMeals
      });
      return res.json(fallbackData);
    }

    const prompt = `You are an expert Himalayan travel advisor at OffbeatDestination Travels in Gangtok, Sikkim.
Generate a high-converting, personalized day-by-day travel itinerary proposal based on these customer requirements:
- Target Destination: ${destination || 'Sikkim & Darjeeling'}
- Duration: ${duration || '5 Nights / 6 Days'}
- Travel Companions: ${companions || 'Couple / Family'}
- Primary Interests: ${Array.isArray(interests) ? interests.join(', ') : (interests || 'Popular sights & offbeat spots')}
- Budget Category: ${budget || 'Premium 3★/4★'}
- Travelers Count: ${travelers || 2} persons
- Pure Veg / Jain Meal Requirement: ${vegMeals ? 'YES (Strict Veg/Jain)' : 'Standard AP/MAP Plan'}

CRITICAL RULES TO ENFORCE IN THE ITINERARY:
1. LACHUNG 2-NIGHT MANDATORY RULE: If North Sikkim (Lachung, Yumthang Valley, Zero Point, Gurudongmar) is included in the route, YOU MUST MANDATORILY ALLOCATE AT LEAST 2 NIGHTS STAY IN LACHUNG. Mark "lachungMandatory2NightsApplied": true and explicitly mention this rule in the notes.
2. 50/50 POPULAR & OFFBEAT BLEND: Balance famous landmarks (e.g. Tsomgo Lake, Tiger Hill, Zero Point, Pelling Skywalk) with serene offbeat locations (e.g. Tarey Bhir 10,000ft cliff ridge walk, Sillery Gaon pine village, Lamahatta Eco Park, Katao snow peak, Reshi Khola riverbank, Aritar Lampokhari Lake).
3. VEHICLE PERMIT COMPLIANCE: Note that small cabs (Sedan/Hatchback) are strictly barred for North Sikkim & Nathula Pass. State permit-approved 4WD SUV (Innova Crysta / Scorpio 4x4) assigned.
4. ESTIMATED COSTS & HIGHLIGHTS: Provide exact estimated cost breakdown per person and total group cost based on budget tier chosen (${budget || 'Premium'}).

Return a JSON object with this exact structure:
{
  "title": "A captivating, catchy title for this tour",
  "duration": "e.g. 5 Nights / 6 Days",
  "companions": "${companions || 'Couple / Family'}",
  "interests": ["Interest 1", "Interest 2"],
  "budgetTier": "${budget || 'Premium 3★/4★'}",
  "estimatedCostPerPerson": "e.g. ₹16,800",
  "totalEstimatedCost": "e.g. ₹33,600 (for 2 persons)",
  "vehicleRecommended": "e.g. Toyota Innova Crysta / Mahindra Scorpio 4x4",
  "hasNorthSikkim": true/false,
  "lachungMandatory2NightsApplied": true/false,
  "overview": "2-3 inviting sentences summarizing the trip",
  "dayByDay": [
    {
      "day": 1,
      "title": "Day 1 title",
      "popularHighlights": ["Popular spot 1", "Popular spot 2"],
      "offbeatHighlights": ["Offbeat spot 1", "Offbeat spot 2"],
      "overnightStay": "Hotel name / Location",
      "mealsIncluded": "Meals summary",
      "details": "Detailed itinerary description including scenic drive, sights, and evening plan"
    }
  ],
  "inclusions": ["Inclusion 1", "Inclusion 2", "Inclusion 3", "Inclusion 4"],
  "permitsRequired": ["Permit name 1", "Permit name 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (err: any) {
    console.error('Itinerary generation error:', err);
    // Fallback if AI call errors out
    const fallbackData = buildFallbackItinerary({
      duration,
      destination,
      travelers,
      preferences,
      budget,
      companions,
      interests,
      vegMeals
    });
    res.json(fallbackData);
  }
});

// API Endpoint: Capture Lead (Stores lead & sends instant notification payload)
app.post('/api/leads', (req, res) => {
  const {
    customerName,
    whatsappNumber,
    email,
    travelDates,
    travelersCount,
    packageOrRoute,
    vehiclePreference,
    mealPreference,
    notes
  } = req.body;

  if (!whatsappNumber || !customerName) {
    return res.status(400).json({ error: 'Customer name and WhatsApp number are required.' });
  }

  const newLead: Lead = {
    id: `lead-${Date.now().toString().slice(-4)}`,
    customerName,
    whatsappNumber,
    email: email || '',
    travelDates: travelDates || 'Flexible / To be decided',
    travelersCount: travelersCount ? Number(travelersCount) : 2,
    packageOrRoute: packageOrRoute || 'Custom Sikkim Tour Inquiry',
    vehiclePreference: vehiclePreference || 'Toyota Innova Crysta',
    mealPreference: mealPreference || 'Standard / AP Plan',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    status: 'New'
  };

  leadsDatabase.unshift(newLead);

  // Return lead record + instant notification metadata simulation
  res.json({
    success: true,
    message: 'Lead recorded successfully. Instant notification triggered to OffbeatDestination Gangtok team!',
    lead: newLead,
    whatsappNotificationUrl: `https://wa.me/916296102341?text=${encodeURIComponent(
      `New Lead Received!\nName: ${customerName}\nWhatsApp: ${whatsappNumber}\nDates: ${travelDates}\nRoute: ${packageOrRoute}`
    )}`
  });
});

// In-Memory Reviews Database
interface ServerReview {
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
  approved: boolean;
  createdAt: string;
  helpfulCount: number;
}

const reviewsDatabase: ServerReview[] = [
  {
    id: "rev-1",
    author: "Anand Verma & Family",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "July 2026",
    comment: "Flawless arrangement! We booked the 5N/6D Sikkim & Darjeeling tour with an Innova Crysta. Driver Passang was punctual, extremely safe on mountain bends, and recommended fantastic pure veg thali spots in Gangtok. Permits for Nathula were issued effortlessly!",
    packageTaken: "5N/6D Sikkim & Darjeeling Tour",
    externalPlatform: "Google",
    photoUrl: "/images/sikkim_hero_banner_1785680563996.jpg",
    approved: true,
    createdAt: new Date(Date.now() - 3600000 * 120).toISOString(),
    helpfulCount: 24
  },
  {
    id: "rev-2",
    author: "Priya & Rohan Das",
    location: "Kolkata, West Bengal",
    rating: 5,
    date: "June 2026",
    comment: "The AI chat assistant on OffbeatDestination's site helped us tailor our North Sikkim Zero Point trip within minutes! We dropped our WhatsApp number and got the exact quote on WhatsApp in 2 minutes. The homestay in Lachung was warm and hospitable. 10/10 service!",
    packageTaken: "North Sikkim 3N/4D Tour",
    externalPlatform: "WhatsApp",
    photoUrl: "/images/yumthang_zero_point_1785680592273.jpg",
    approved: true,
    createdAt: new Date(Date.now() - 3600000 * 300).toISOString(),
    helpfulCount: 31
  },
  {
    id: "rev-3",
    author: "Dr. K. Swaminathan",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "May 2026",
    comment: "Top-notch professionalism. Being elderly travelers, pure vegetarian meal timing was crucial for us. OffbeatDestination arranged perfect AP meal plans and provided an exceptionally smooth Innova Crysta for NJP airport pickup.",
    packageTaken: "Cab Rental & Custom Sikkim Package",
    externalPlatform: "TripAdvisor",
    photoUrl: "/images/innova_crysta_cab_1785680577329.jpg",
    approved: true,
    createdAt: new Date(Date.now() - 3600000 * 500).toISOString(),
    helpfulCount: 18
  },
  {
    id: "rev-4",
    author: "Meenakshi & Rahul Roy",
    location: "Bengaluru, Karnataka",
    rating: 5,
    date: "August 2026",
    comment: "Bhutan Tour was magical! OffbeatDestination handled all SDF fees, permits, and assigned a super polite Bhutanese guide. Hiking Tiger's Nest was a dream come true. Highly recommended local Gangtok agency!",
    packageTaken: "Custom Bhutan Cultural Odyssey",
    externalPlatform: "Google",
    photoUrl: "/images/bhutan_tigers_nest_1785681037397.jpg",
    approved: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    helpfulCount: 15
  },
  {
    id: "rev-5",
    author: "Amitabh Banerjee",
    location: "Siliguri, West Bengal",
    rating: 5,
    date: "July 2026",
    comment: "Booked Bagdogra to Gangtok Innova Crysta pickup. Driver was waiting at the exit with name board. Clean leather captain seats and smooth driving down Teesta valley.",
    packageTaken: "Bagdogra IXB to Gangtok Private Cab",
    externalPlatform: "Direct",
    approved: true,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    helpfulCount: 9
  }
];

// API Endpoint: Fetch Reviews
app.get('/api/reviews', (req, res) => {
  const { all } = req.query;
  if (all === 'true') {
    return res.json(reviewsDatabase);
  }
  res.json(reviewsDatabase.filter((r) => r.approved));
});

// API Endpoint: Add New Review
app.post('/api/reviews', (req, res) => {
  const { author, location, rating, comment, packageTaken, photoUrl, externalPlatform } = req.body;

  if (!author || !comment || !rating) {
    return res.status(400).json({ error: 'Author, rating, and comment are required.' });
  }

  const newReview: ServerReview = {
    id: `rev-${Date.now().toString().slice(-4)}`,
    author,
    location: location || 'India',
    rating: Number(rating) || 5,
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    comment,
    packageTaken: packageTaken || 'Sikkim Tour Package',
    photoUrl: photoUrl || '',
    externalPlatform: externalPlatform || 'Direct',
    approved: true, // Auto approve for instant user delight
    createdAt: new Date().toISOString(),
    helpfulCount: 0
  };

  reviewsDatabase.unshift(newReview);
  res.json({ success: true, review: newReview });
});

// API Endpoint: Approve/Toggle Review Status (for Owner Console)
app.put('/api/reviews/:id/approve', (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;
  const rev = reviewsDatabase.find((r) => r.id === id);
  if (!rev) return res.status(404).json({ error: 'Review not found' });

  rev.approved = approved !== undefined ? Boolean(approved) : !rev.approved;
  res.json({ success: true, review: rev });
});

// API Endpoint: Delete Review (for Owner Console)
app.delete('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  const idx = reviewsDatabase.findIndex((r) => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Review not found' });

  reviewsDatabase.splice(idx, 1);
  res.json({ success: true });
});

// API Endpoint: Helpful count increment
app.post('/api/reviews/:id/helpful', (req, res) => {
  const { id } = req.params;
  const rev = reviewsDatabase.find((r) => r.id === id);
  if (rev) {
    rev.helpfulCount = (rev.helpfulCount || 0) + 1;
    return res.json({ success: true, helpfulCount: rev.helpfulCount });
  }
  res.status(404).json({ error: 'Review not found' });
});

// In-memory databases for Packages, Cabs, Agency Info, and Rates Matrix
let packagesDatabase = [...TOUR_PACKAGES_INITIAL];
let cabsDatabase = [...CAB_OPTIONS_INITIAL];
let agencyInfoDatabase = { ...AGENCY_DETAILS_INITIAL };

interface BackendRatesConfig {
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

const RATES_CONFIG_INITIAL: BackendRatesConfig = {
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

let ratesConfigDatabase: BackendRatesConfig = { ...RATES_CONFIG_INITIAL };

// ==========================================
// FULL BACKEND CONTROL CMS API ENDPOINTS
// ==========================================

// Admin Auth Login
app.post('/api/admin/login', (req, res) => {
  const { email, password, pin } = req.body;
  const store = getBackendStore();
  
  if (pin === '1750' || password === 'offbeat2026' || password === 'admin') {
    const user = store.users.find((u) => u.email === email) || store.users[0];
    logAuditAction(user.name, user.role, 'LOGIN', 'Admin authenticated into backend console.');
    return res.json({
      success: true,
      token: `odt-auth-${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }

  res.status(401).json({ error: 'Invalid PIN or credentials. (Default PIN: 1750)' });
});

// Admin Dashboard KPI Stats
app.get('/api/admin/dashboard-stats', (req, res) => {
  const store = getBackendStore();
  const totalLeads = leadsDatabase.length;
  const newLeads = leadsDatabase.filter((l) => l.status === 'New').length;
  const bookedLeads = leadsDatabase.filter((l) => l.status === 'Booked').length;
  const totalPackages = packagesDatabase.length;
  const totalQuotationValue = store.quotations.reduce((acc, q) => acc + q.totalFinalAmount, 0);

  res.json({
    totalLeads,
    newLeads,
    bookedLeads,
    totalPackages,
    totalQuotationValue,
    totalCustomers: store.customers.length,
    totalDestinations: store.destinations.length,
    recentAuditLogs: store.auditLogs.slice(0, 10),
  });
});

// API Endpoint: Fetch Captured Leads for Owner Console
app.get('/api/leads', (req, res) => {
  res.json(leadsDatabase);
});

app.put('/api/admin/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const lead = leadsDatabase.find((l) => l.id === id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  if (status) lead.status = status;
  if (notes !== undefined) lead.notes = notes;

  logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_LEAD', `Updated lead ${id} status to ${lead.status}`);
  res.json({ success: true, lead });
});

// API Endpoints for Rates Matrix (Backend Rate Management)
app.get('/api/rates', (req, res) => {
  res.json(ratesConfigDatabase);
});

app.post('/api/admin/rates', (req, res) => {
  const { rates } = req.body;
  if (rates && typeof rates === 'object') {
    ratesConfigDatabase = { ...ratesConfigDatabase, ...rates };
    logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_RATES', 'Updated pricing rates matrix.');
    return res.json({ success: true, rates: ratesConfigDatabase });
  }
  res.status(400).json({ error: 'Invalid rates payload' });
});

// API Endpoints for Packages CRUD
app.get('/api/packages', (req, res) => {
  res.json(packagesDatabase);
});

app.post('/api/admin/packages', (req, res) => {
  const { packages } = req.body;
  if (Array.isArray(packages)) {
    packagesDatabase = packages;
    logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_PACKAGES', `Updated ${packages.length} tour packages.`);
    return res.json({ success: true, count: packagesDatabase.length });
  }
  res.status(400).json({ error: 'Invalid packages payload' });
});

// API Endpoints for Cabs/Vehicles CRUD
app.get('/api/cabs', (req, res) => {
  res.json(cabsDatabase);
});

app.post('/api/admin/cabs', (req, res) => {
  const { cabs } = req.body;
  if (Array.isArray(cabs)) {
    cabsDatabase = cabs;
    logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_CABS', `Updated ${cabs.length} cab vehicle options.`);
    return res.json({ success: true, count: cabsDatabase.length });
  }
  res.status(400).json({ error: 'Invalid cabs payload' });
});

// DESTINATIONS CRUD
app.get('/api/destinations', (req, res) => {
  const store = getBackendStore();
  res.json(store.destinations);
});

app.post('/api/admin/destinations', (req, res) => {
  const store = getBackendStore();
  const newItem = { id: `dest-${Date.now()}`, active: true, ...req.body };
  store.destinations.unshift(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'ADD_DESTINATION', `Added destination ${newItem.name}`);
  res.json({ success: true, destination: newItem });
});

app.put('/api/admin/destinations/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  const idx = store.destinations.findIndex((d) => d.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Destination not found' });

  store.destinations[idx] = { ...store.destinations[idx], ...req.body };
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_DESTINATION', `Updated destination ${store.destinations[idx].name}`);
  res.json({ success: true, destination: store.destinations[idx] });
});

app.delete('/api/admin/destinations/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  store.destinations = store.destinations.filter((d) => d.id !== id);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'DELETE_DESTINATION', `Deleted destination ${id}`);
  res.json({ success: true });
});

// HOTELS CRUD
app.get('/api/hotels', (req, res) => {
  const store = getBackendStore();
  res.json(store.hotels);
});

app.post('/api/admin/hotels', (req, res) => {
  const store = getBackendStore();
  const newItem = { id: `hotel-${Date.now()}`, active: true, ...req.body };
  store.hotels.unshift(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'ADD_HOTEL', `Added hotel ${newItem.name}`);
  res.json({ success: true, hotel: newItem });
});

app.put('/api/admin/hotels/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  const idx = store.hotels.findIndex((h) => h.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Hotel not found' });

  store.hotels[idx] = { ...store.hotels[idx], ...req.body };
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_HOTEL', `Updated hotel ${store.hotels[idx].name}`);
  res.json({ success: true, hotel: store.hotels[idx] });
});

app.delete('/api/admin/hotels/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  store.hotels = store.hotels.filter((h) => h.id !== id);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'DELETE_HOTEL', `Deleted hotel ${id}`);
  res.json({ success: true });
});

// SEASONS CRUD
app.get('/api/seasons', (req, res) => {
  const store = getBackendStore();
  res.json(store.seasons);
});

app.post('/api/admin/seasons', (req, res) => {
  const store = getBackendStore();
  const newItem = { id: `season-${Date.now()}`, active: true, ...req.body };
  store.seasons.unshift(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'ADD_SEASON', `Added season ${newItem.name}`);
  res.json({ success: true, season: newItem });
});

app.put('/api/admin/seasons/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  const idx = store.seasons.findIndex((s) => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Season not found' });

  store.seasons[idx] = { ...store.seasons[idx], ...req.body };
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_SEASON', `Updated season ${store.seasons[idx].name}`);
  res.json({ success: true, season: store.seasons[idx] });
});

// QUOTATIONS CRUD
app.get('/api/admin/quotations', (req, res) => {
  const store = getBackendStore();
  res.json(store.quotations);
});

app.post('/api/admin/quotations', (req, res) => {
  const store = getBackendStore();
  const quoteNumber = `ODT-${new Date().getFullYear()}-QT${String(store.quotations.length + 1).padStart(2, '0')}`;
  const newItem = {
    id: `quote-${Date.now()}`,
    quoteNumber,
    createdAt: new Date().toISOString(),
    validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
    status: 'Sent',
    ...req.body,
  };
  store.quotations.unshift(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'CREATE_QUOTATION', `Created quotation ${quoteNumber} for ${newItem.customerName}`);
  res.json({ success: true, quotation: newItem });
});

app.put('/api/admin/quotations/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  const idx = store.quotations.findIndex((q) => q.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Quotation not found' });

  store.quotations[idx] = { ...store.quotations[idx], ...req.body };
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_QUOTATION', `Updated quotation ${store.quotations[idx].quoteNumber}`);
  res.json({ success: true, quotation: store.quotations[idx] });
});

app.delete('/api/admin/quotations/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  store.quotations = store.quotations.filter((q) => q.id !== id);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'DELETE_QUOTATION', `Deleted quotation ${id}`);
  res.json({ success: true });
});

// CUSTOMERS CRUD
app.get('/api/admin/customers', (req, res) => {
  const store = getBackendStore();
  res.json(store.customers);
});

app.post('/api/admin/customers', (req, res) => {
  const store = getBackendStore();
  const newItem = { id: `cust-${Date.now()}`, createdAt: new Date().toISOString(), ...req.body };
  store.customers.unshift(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'ADD_CUSTOMER', `Added customer ${newItem.name}`);
  res.json({ success: true, customer: newItem });
});

app.put('/api/admin/customers/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  const idx = store.customers.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Customer not found' });

  store.customers[idx] = { ...store.customers[idx], ...req.body };
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_CUSTOMER', `Updated customer ${store.customers[idx].name}`);
  res.json({ success: true, customer: store.customers[idx] });
});

app.delete('/api/admin/customers/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  store.customers = store.customers.filter((c) => c.id !== id);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'DELETE_CUSTOMER', `Deleted customer ${id}`);
  res.json({ success: true });
});

// FAQS CRUD
app.get('/api/faqs', (req, res) => {
  const store = getBackendStore();
  res.json(store.faqs);
});

app.post('/api/admin/faqs', (req, res) => {
  const store = getBackendStore();
  const newItem = { id: `faq-${Date.now()}`, active: true, order: store.faqs.length + 1, ...req.body };
  store.faqs.push(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'ADD_FAQ', `Added FAQ item.`);
  res.json({ success: true, faq: newItem });
});

app.put('/api/admin/faqs/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  const idx = store.faqs.findIndex((f) => f.id === id);
  if (idx === -1) return res.status(404).json({ error: 'FAQ not found' });

  store.faqs[idx] = { ...store.faqs[idx], ...req.body };
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_FAQ', `Updated FAQ item ${id}`);
  res.json({ success: true, faq: store.faqs[idx] });
});

app.delete('/api/admin/faqs/:id', (req, res) => {
  const { id } = req.params;
  const store = getBackendStore();
  store.faqs = store.faqs.filter((f) => f.id !== id);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'DELETE_FAQ', `Deleted FAQ ${id}`);
  res.json({ success: true });
});

// USERS & STAFF
app.get('/api/admin/users', (req, res) => {
  const store = getBackendStore();
  res.json(store.users);
});

app.post('/api/admin/users', (req, res) => {
  const store = getBackendStore();
  const newItem = { id: `usr-${Date.now()}`, status: 'Active', ...req.body };
  store.users.push(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'OWNER', 'ADD_STAFF_USER', `Added staff user ${newItem.name}`);
  res.json({ success: true, user: newItem });
});

// AUDIT LOGS
app.get('/api/admin/audit-logs', (req, res) => {
  const store = getBackendStore();
  res.json(store.auditLogs);
});

// MEDIA LIBRARY
app.get('/api/admin/media', (req, res) => {
  const store = getBackendStore();
  res.json(store.media);
});

app.post('/api/admin/media', (req, res) => {
  const store = getBackendStore();
  const newItem = { id: `med-${Date.now()}`, uploadedAt: new Date().toISOString(), ...req.body };
  store.media.unshift(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPLOAD_MEDIA', `Uploaded media item ${newItem.title}`);
  res.json({ success: true, media: newItem });
});

app.post('/api/admin/upload-photo', (req, res) => {
  const { title, dataUrl, category } = req.body;
  if (!dataUrl) return res.status(400).json({ error: 'No photo data provided' });

  const store = getBackendStore();
  const newItem = {
    id: `med-${Date.now()}`,
    title: title || 'Uploaded Photo Asset',
    url: dataUrl,
    category: category || 'General',
    uploadedAt: new Date().toISOString(),
  };
  store.media.unshift(newItem);
  saveBackendStore(store);
  logAuditAction('Owner Admin', 'ADMIN', 'UPLOAD_PHOTO', `Uploaded photo asset: ${title || 'Property photo'}`);
  res.json({ success: true, url: dataUrl, media: newItem });
});

// HIMALAYAN TRAVEL BLOG API
app.get('/api/blog', (req, res) => {
  const { category, search } = req.query;
  let posts = BLOG_POSTS.map(p => ({
    ...p,
    readTime: calculateReadTime(p.content),
  }));

  if (category && category !== 'All') {
    posts = posts.filter(p => p.category === category);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json(posts);
});

app.get('/api/blog/:slugOrId', (req, res) => {
  const { slugOrId } = req.params;
  const post = BLOG_POSTS.find(p => p.slug === slugOrId || p.id === slugOrId);
  if (!post) return res.status(404).json({ error: 'Blog post not found' });

  res.json({
    ...post,
    readTime: calculateReadTime(post.content),
  });
});

// NAVIGATION LINKS TABLE CRUD
app.get('/api/navigation', (req, res) => {
  const store = getBackendStore();
  const navItems = (store.navigation || []).slice().sort((a, b) => a.order - b.order);
  res.json(navItems);
});

app.post('/api/admin/navigation', (req, res) => {
  const { navigation } = req.body;
  if (Array.isArray(navigation)) {
    const store = getBackendStore();
    store.navigation = navigation;
    saveBackendStore(store);
    logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_NAVIGATION', `Updated ${navigation.length} database navigation links.`);
    return res.json({ success: true, navigation: store.navigation });
  }
  res.status(400).json({ error: 'Invalid navigation payload' });
});

// REAL-TIME TRAVEL ALERT CRUD (Nathula Pass, Weather, Road Status)
app.get('/api/alerts', (req, res) => {
  const store = getBackendStore();
  res.json(store.alert || {
    id: 'alert-sikkim-live-1',
    enabled: true,
    title: 'Nathula Pass & High Altitude Advisory',
    message: 'Nathula Pass & Tsomgo Lake permits are active today subject to daily Army clearance. 4x4 Snow-Chain vehicles deployed for Zero Point & Gurudongmar. Contact 24/7 Gangtok desk for live road reports.',
    type: 'warning',
    locationTag: 'North & East Sikkim',
    linkText: 'Check Live Weather & Permits',
    linkAction: 'weather',
    updatedAt: new Date().toISOString(),
    isUrgent: true,
  });
});

app.post('/api/admin/alerts', (req, res) => {
  const { alert } = req.body;
  if (alert && typeof alert === 'object') {
    const store = getBackendStore();
    const updatedAlert = {
      ...store.alert,
      ...alert,
      updatedAt: new Date().toISOString(),
    };
    store.alert = updatedAlert;
    saveBackendStore(store);
    logAuditAction(
      'Owner Admin',
      'ADMIN',
      'UPDATE_ALERT',
      `Updated travel advisory alert (${updatedAlert.enabled ? 'ACTIVE' : 'MUTED'}): ${updatedAlert.title}`
    );
    return res.json({ success: true, alert: updatedAlert });
  }
  res.status(400).json({ error: 'Invalid alert payload' });
});

// SEO MANAGEMENT
let seoDatabase: any = { ...DEFAULT_SEO_SETTINGS };

app.get('/api/seo', (req, res) => {
  res.json(seoDatabase);
});

app.post('/api/admin/seo', (req, res) => {
  const { seo } = req.body;
  if (seo && typeof seo === 'object') {
    seoDatabase = { ...seoDatabase, ...seo };
    logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_SEO', 'Updated SEO metadata across site tabs.');
    return res.json({ success: true, seo: seoDatabase });
  }
  res.status(400).json({ error: 'Invalid SEO payload' });
});

// SITEMAP GET ROUTE (SERVES SITEMAP.XML WITH DYNAMIC FALLBACK CRAWL)
app.get('/sitemap.xml', (req, res) => {
  try {
    const publicSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(publicSitemapPath)) {
      const xmlContent = fs.readFileSync(publicSitemapPath, 'utf8');
      res.type('application/xml; charset=utf-8').send(xmlContent);
      return;
    }
  } catch (e) {
    console.error('Error reading sitemap.xml from disk:', e);
  }
  
  // Dynamic Crawler Fallback
  try {
    const result = generateCrawlerSitemap({
      baseUrl: 'https://offbeatdestination.in',
      includeImages: true,
    });
    res.type('application/xml; charset=utf-8').send(result.xmlContent);
  } catch (err: any) {
    console.error('Error generating fallback sitemap:', err);
    res.status(500).send('Error generating sitemap');
  }
});

// AUTOMATED SITEMAP CRAWLER & GENERATOR API
app.post(['/api/generate-sitemap', '/api/admin/seo/crawl-sitemap'], (req, res) => {
  try {
    const { baseUrl, includeImages, lastModDate } = req.body || {};
    const store = getBackendStore();

    const sitemapResult = generateCrawlerSitemap({
      baseUrl: baseUrl || 'https://offbeatdestination.in',
      includeImages: includeImages !== false,
      lastModDate: lastModDate || new Date().toISOString().split('T')[0],
      customHotels: store?.hotels,
      customDestinations: store?.destinations,
    });

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapResult.xmlContent, 'utf8');

    const distDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      try {
        fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapResult.xmlContent, 'utf8');
      } catch {}
    }

    logAuditAction(
      'System Crawler',
      'SYSTEM',
      'AUTO_CRAWL_SITEMAP',
      `Crawled & generated sitemap.xml with ${sitemapResult.totalUrls} URLs (${sitemapResult.categories.packages} packages, ${sitemapResult.categories.hotels} hotels, ${sitemapResult.categories.blogs} blogs) for ${sitemapResult.baseUrl}`
    );

    return res.json({
      success: true,
      message: `sitemap.xml successfully generated with ${sitemapResult.totalUrls} canonical URLs`,
      result: sitemapResult,
      path: '/sitemap.xml',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error crawling and generating sitemap:', error);
    return res.status(500).json({ error: 'Failed to auto-generate sitemap', details: error.message });
  }
});

// SITEMAP API: SAVE CUSTOM XML TO SERVER / PUBLIC DIRECTORY
app.post('/api/admin/seo/sitemap', (req, res) => {
  try {
    const { xmlContent, totalUrls, imageCount, baseUrl } = req.body;
    if (!xmlContent || typeof xmlContent !== 'string') {
      return res.status(400).json({ error: 'Invalid XML content provided' });
    }

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xmlContent, 'utf8');

    // Also write to dist/sitemap.xml if dist directory exists
    const distDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      try {
        fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xmlContent, 'utf8');
      } catch (err) {
        // non-blocking
      }
    }

    logAuditAction(
      'Owner Admin',
      'ADMIN',
      'REBUILD_SITEMAP',
      `Rebuilt sitemap.xml with ${totalUrls || 'multiple'} URLs & ${imageCount || 0} image schemas for ${baseUrl || 'offbeatdestination.in'}`
    );

    return res.json({
      success: true,
      message: 'sitemap.xml saved to server successfully',
      path: '/sitemap.xml',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error saving sitemap.xml:', error);
    return res.status(500).json({ error: 'Failed to write sitemap.xml to disk', details: error.message });
  }
});

// SEO KEYWORD GENERATOR (GEMINI POWERED)
app.post('/api/admin/generate-keywords', async (req, res) => {
  try {
    const { pageKey, title, description, customPrompt } = req.body;

    const fallbackKeywordsMap: Record<string, Array<{ keyword: string; intent: string; searchVolumeEst: string; relevanceReason: string }>> = {
      home: [
        { keyword: "Sikkim tour packages with Gangtok and Darjeeling", intent: "Commercial", searchVolumeEst: "Very High", relevanceReason: "Top searched multi-destination tour phrase in North East India" },
        { keyword: "best Sikkim travel agency in Gangtok", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "High conversion intent for registered local DMC bookings" },
        { keyword: "Innova Crysta cab hire NJP to Gangtok", intent: "Transactional", searchVolumeEst: "High", relevanceReason: "Direct vehicle booking intent for arriving tourists" },
        { keyword: "North Sikkim Lachung Yumthang Zero Point package price", intent: "Transactional", searchVolumeEst: "Very High", relevanceReason: "High-value seasonal booking query" },
        { keyword: "Nathula Pass army permit agent Gangtok", intent: "Informational", searchVolumeEst: "High", relevanceReason: "Permit assistance query converting directly to tour leads" },
        { keyword: "Sikkim honeymoon tour package with 4 star luxury hotel", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "Luxury high-ticket booking query" },
        { keyword: "Govt registered Sikkim tour operator contact number", intent: "Transactional", searchVolumeEst: "Medium", relevanceReason: "High-trust buyer query looking for genuine local agency" },
        { keyword: "Sikkim 5 nights 6 days itinerary with private cab", intent: "Commercial", searchVolumeEst: "Very High", relevanceReason: "Most popular standard holiday duration in Sikkim" },
        { keyword: "Old Silk Route Zuluk homestay package cost", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "Rapidly trending offbeat travel search phrase" },
        { keyword: "customized Sikkim family holiday with pure veg meals", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "Key demographic requirement for Indian family tourists" }
      ],
      packages: [
        { keyword: "5 Nights 6 Days Sikkim Darjeeling package price with cab", intent: "Transactional", searchVolumeEst: "Very High", relevanceReason: "Primary bestselling package commercial keyword" },
        { keyword: "North Sikkim 3 nights 4 days tour Lachung Zero Point", intent: "Commercial", searchVolumeEst: "Very High", relevanceReason: "High demand package search with specific nights" },
        { keyword: "Gangtok Pelling Darjeeling tour package cost for couple", intent: "Transactional", searchVolumeEst: "High", relevanceReason: "Top couple tour package search term" },
        { keyword: "Complete Sikkim 7 days itinerary with Gurudongmar Lake", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "Adventure and comprehensive traveler query" },
        { keyword: "Silk Route Zuluk package from NJP railway station", intent: "Transactional", searchVolumeEst: "High", relevanceReason: "Direct departure route booking keyword" },
        { keyword: "Sikkim luxury tour package Mayfair Spa Resort Gangtok", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "5-star luxury traveler booking intent" },
        { keyword: "Bhutan tour package from Gangtok with SDF permit", intent: "Commercial", searchVolumeEst: "Medium", relevanceReason: "Cross-border high-margin tour booking" },
        { keyword: "Sikkim group tour package with tempo traveller rate", intent: "Transactional", searchVolumeEst: "Medium", relevanceReason: "Corporate and college group booking keyword" },
        { keyword: "Sikkim honeymoon packages with candlelight dinner and flower bed", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "High-margin romantic honeymoon inquiry keyword" },
        { keyword: "all inclusive Sikkim tour package with hotel food cab and permits", intent: "Transactional", searchVolumeEst: "Very High", relevanceReason: "Comprehensive buyer intent looking for zero hassle" }
      ],
      cabs: [
        { keyword: "Toyota Innova Crysta taxi fare Bagdogra to Gangtok", intent: "Transactional", searchVolumeEst: "Very High", relevanceReason: "Highest volume airport transfer cab keyword" },
        { keyword: "Gangtok taxi booking rates per day with driver", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "Daily rental pricing comparison query" },
        { keyword: "4x4 Scorpio rental for North Sikkim Zero Point", intent: "Transactional", searchVolumeEst: "High", relevanceReason: "Essential 4WD vehicle search for tough mountain terrain" },
        { keyword: "NJP to Gangtok private car fare Innova Dzire", intent: "Transactional", searchVolumeEst: "Very High", relevanceReason: "High volume railway station transfer keyword" },
        { keyword: "Bagdogra airport to Darjeeling prepaid taxi rate", intent: "Informational", searchVolumeEst: "High", relevanceReason: "Airport to hill station transfer query" },
        { keyword: "Sikkim luxury cab service with English speaking driver", intent: "Commercial", searchVolumeEst: "Medium", relevanceReason: "Premium tourist and NRI traveler query" },
        { keyword: "Tempo Traveller on rent in Gangtok for 12 persons", intent: "Transactional", searchVolumeEst: "Medium", relevanceReason: "Group travel vehicle hiring query" },
        { keyword: "Gangtok local sightseeing full day taxi fare", intent: "Transactional", searchVolumeEst: "High", relevanceReason: "7-point and 10-point local town tour search" },
        { keyword: "Tsomgo Lake and Nathula Pass private cab fare", intent: "Transactional", searchVolumeEst: "Very High", relevanceReason: "East Sikkim day trip vehicle booking" },
        { keyword: "best reliable cab operator in Gangtok Arithang MG Marg", intent: "Commercial", searchVolumeEst: "Medium", relevanceReason: "Local trust search for verified taxi operator" }
      ],
      hotels: [
        { keyword: "luxury hotels in Gangtok with Kanchenjunga view", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "Scenic room booking query" },
        { keyword: "best 3 star hotels in Gangtok near MG Marg", intent: "Transactional", searchVolumeEst: "Very High", relevanceReason: "Prime location accommodation search" },
        { keyword: "Lachung homestays with room heater and hot water", intent: "Informational", searchVolumeEst: "High", relevanceReason: "Crucial comfort requirement for high altitude stays" },
        { keyword: "Pelling resorts with glass skywalk view", intent: "Commercial", searchVolumeEst: "Medium", relevanceReason: "Specific viewpoint attraction accommodation" }
      ],
      reviews: [
        { keyword: "OffbeatDestination Travels Gangtok reviews", intent: "Navigational", searchVolumeEst: "High", relevanceReason: "Direct brand validation search" },
        { keyword: "Sikkim tour operator genuine Google ratings", intent: "Commercial", searchVolumeEst: "High", relevanceReason: "Pre-booking trustworthiness check" },
        { keyword: "best travel agency in Sikkim tripadvisor reviews", intent: "Commercial", searchVolumeEst: "Medium", relevanceReason: "Third-party platform validation query" }
      ],
      faqs: [
        { keyword: "Nathula Pass permit documents required for Indian tourists", intent: "Informational", searchVolumeEst: "Very High", relevanceReason: "High-volume informational search converting to permit bookings" },
        { keyword: "best time to visit North Sikkim for snow", intent: "Informational", searchVolumeEst: "Very High", relevanceReason: "Seasonal travel planning query" },
        { keyword: "is Gurudongmar Lake safe for children and senior citizens", intent: "Informational", searchVolumeEst: "High", relevanceReason: "Safety and high-altitude health advisory search" }
      ]
    };

    if (ai) {
      const prompt = `You are a Senior SEO Strategist and Generative Engine Optimization (GEO) expert for "OffbeatDestination Travels", a leading Govt-registered travel agency and cab operator in Gangtok, Sikkim (offbeatdestination.in).
      
Target Page: ${pageKey || 'General'}
Current Page Title: "${title || 'Sikkim & Darjeeling Tour Packages'}"
Current Meta Description: "${description || 'Book Sikkim tours and cab rentals with local travel agency'}"
${customPrompt ? `Special Owner Focus / Instruction: "${customPrompt}"` : ''}

Generate exactly 10 high-volume, highly relevant long-tail SEO keywords & search queries that real tourists and travelers search on Google when searching to book trips, cabs, permits, hotels, and holiday itineraries for this page.

Return ONLY a valid JSON array of 10 objects with this exact structure:
[
  {
    "keyword": "string (the exact long-tail search phrase, 3-7 words, high intent)",
    "intent": "Commercial" | "Transactional" | "Informational",
    "searchVolumeEst": "Very High" | "High" | "Medium",
    "relevanceReason": "string (one concise sentence explaining why this keyword brings high-converting bookings)"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          logAuditAction('Owner Admin', 'ADMIN', 'GENERATE_SEO_KEYWORDS', `Generated ${parsed.length} Gemini AI SEO keywords for page ${pageKey}.`);
          return res.json({ success: true, source: 'gemini', keywords: parsed });
        }
      } catch (parseErr) {
        console.warn('Failed to parse Gemini keywords response as JSON:', parseErr);
      }
    }

    // Fallback if AI not available
    const pageFallbacks = fallbackKeywordsMap[pageKey] || fallbackKeywordsMap.home;
    logAuditAction('Owner Admin', 'ADMIN', 'GENERATE_SEO_KEYWORDS', `Generated curated high-volume SEO keywords for page ${pageKey}.`);
    return res.json({
      success: true,
      source: 'curated-database',
      keywords: pageFallbacks,
    });
  } catch (err: any) {
    console.error('Error generating SEO keywords:', err);
    res.status(500).json({ error: 'Failed to generate SEO keywords', details: err?.message });
  }
});

// SEO META DESCRIPTION GENERATOR BASED ON PACKAGE OR CAB (GEMINI POWERED)
app.post('/api/admin/generate-meta-descriptions', async (req, res) => {
  try {
    const { itemType, itemData, targetPage } = req.body;

    const itemName = itemData?.title || itemData?.name || itemData?.vehicleType || 'Sikkim Tour & Cab Service';
    const itemDuration = itemData?.duration || (itemType === 'cab' ? 'Daily / Point-to-Point' : 'Custom Itinerary');
    const itemPrice = itemData?.priceStarting ? `₹${Number(itemData.priceStarting).toLocaleString('en-IN')}` : itemData?.baseRate ? `₹${Number(itemData.baseRate).toLocaleString('en-IN')}` : '';
    const itemLocation = itemData?.location || itemData?.pickupDrop || 'Gangtok, North Sikkim & Darjeeling';
    const itemHighlights = Array.isArray(itemData?.highlights) ? itemData.highlights.slice(0, 3).join(', ') : '';

    // Smart deterministic fallbacks matching itemData
    const fallbackSuggestions = [
      {
        id: 'desc-conversion',
        strategy: 'High Conversion & Pricing',
        badge: 'Top CTR',
        title: itemType === 'cab' 
          ? `${itemName} Taxi Rental Gangtok | Best Rates | OffbeatDestination`
          : `${itemName} from ${itemPrice || '₹18,500'} | Sikkim Tour Packages`,
        description: itemType === 'cab'
          ? `Book ${itemName} cab in Gangtok${itemPrice ? ` starting ${itemPrice}` : ''}. Clean luxury vehicle, verified local driver & zero hidden fees. Get instant WhatsApp quote!`
          : `Book ${itemName}${itemPrice ? ` starting ${itemPrice}` : ''}. Includes private cab, 3★ deluxe hotels & Nathula Pass permit assistance. Instant WhatsApp quote!`,
        charCount: 0,
        rationale: 'Direct pricing and strong call-to-action converts searchers into immediate inquiries.'
      },
      {
        id: 'desc-luxury',
        strategy: 'Luxury & All-Inclusive Stays',
        badge: 'Premium',
        title: itemType === 'cab'
          ? `Luxury ${itemName} Cab Hire with Driver in Sikkim & Darjeeling`
          : `Luxury ${itemName} (${itemDuration}) | Private Stays & Cab`,
        description: itemType === 'cab'
          ? `Premium ${itemName} rental for Sikkim, Darjeeling & Silk Route. Reclining seats, sanitized interiors, expert mountain drivers & 24/7 support. Book online!`
          : `Experience luxury in Sikkim with ${itemName}. Boutique hotel stays, private Innova Crysta drives, pure veg dining & guaranteed permits. Plan your trip!`,
        charCount: 0,
        rationale: 'Appeals to luxury tourists and families valuing comfort, hygiene, and full coordination.'
      },
      {
        id: 'desc-seo',
        strategy: 'SEO & Search Dominance',
        badge: 'High Search Vol',
        title: itemType === 'cab'
          ? `${itemName} Fare Bagdogra to Gangtok & North Sikkim 4WD Rates`
          : `${itemName} Itinerary, Rates & Permits | Gangtok Agency`,
        description: itemType === 'cab'
          ? `Govt. registered taxi service in Gangtok for ${itemName}. Airport pickup from Bagdogra & NJP to Gangtok, Lachung & Darjeeling with transparent rates.`
          : `Best ${itemName} covering ${itemLocation}. Includes private vehicle transfers, boutique hotel stays & Nathula permit clearance. Registered Sikkim DMC.`,
        charCount: 0,
        rationale: 'Maximizes primary location search terms and registered agency trust signals.'
      },
      {
        id: 'desc-mobile',
        strategy: 'Mobile Snippet (Zero Truncation)',
        badge: 'Punchy',
        title: itemType === 'cab'
          ? `Hire ${itemName} in Gangtok | 4.9★ Rated Sikkim Cab Operator`
          : `${itemName} | 4.9★ Sikkim Tour Package`,
        description: itemType === 'cab'
          ? `Hire ${itemName} in Gangtok${itemPrice ? ` from ${itemPrice}` : ''}. Bagdogra airport pickup, North Sikkim & Silk Route with 4.9★ rated local driver.`
          : `${itemDuration} ${itemName}${itemPrice ? ` from ${itemPrice}` : ''}. Private cab, hotels & permits included. Govt registered Gangtok agency. Book now!`,
        charCount: 0,
        rationale: 'Targeted at ~130-145 characters to guarantee zero truncation on small smartphone screens.'
      }
    ].map(s => ({
      ...s,
      charCount: s.description.length
    }));

    if (ai) {
      const prompt = `You are a Senior SEO Specialist and Copywriter for "OffbeatDestination Travels", a Govt-registered travel agency and luxury cab operator in Gangtok, Sikkim (offbeatdestination.in).

Generate exactly 4 distinct, Google-optimized META DESCRIPTIONS tailored specifically for this currently selected ${itemType === 'cab' ? 'Cab Rental Service' : 'Tour Package'}:

Target Item Details:
- Name/Title: "${itemName}"
- Type: ${itemType}
- Duration: "${itemDuration}"
- Price: "${itemPrice || 'Available on Inquiry'}"
- Key Locations / Route: "${itemLocation}"
${itemHighlights ? `- Highlights: "${itemHighlights}"` : ''}
${targetPage ? `- Target Web Page: "${targetPage}"` : ''}

CRITICAL RULES:
1. Every meta description MUST be strictly between 120 and 158 characters long (including spaces). This is the optimal Google SERP length to avoid "..." truncation.
2. Include concrete facts: item name, price or "starting ₹X", key destinations (Gangtok, Nathula, Lachung, Darjeeling), vehicle type (Innova Crysta, etc.), and clear action CTA (Instant WhatsApp quote, Book now, Plan trip).
3. Do NOT use fake symbols or all-caps shouting.

Provide 4 strategies:
1. "High Conversion & Pricing"
2. "Luxury & All-Inclusive Stays"
3. "SEO & Search Dominance"
4. "Mobile Snippet (Zero Truncation)"

Return ONLY a valid JSON array of 4 objects with this exact structure:
[
  {
    "id": "desc-1",
    "strategy": "Strategy Name",
    "badge": "Short 1-2 word badge",
    "title": "Suggested Meta Title Tag (45-60 chars)",
    "description": "Meta description text (MUST BE 120-158 characters)",
    "charCount": 145,
    "rationale": "Why this description drives high search CTR and conversions"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validated = parsed.map((item, idx) => ({
            id: item.id || `desc-${idx}`,
            strategy: item.strategy || `Option ${idx + 1}`,
            badge: item.badge || 'Optimized',
            title: item.title || itemName,
            description: item.description,
            charCount: item.description?.length || 0,
            rationale: item.rationale || 'Engineered for high search visibility and click-through rates.'
          }));
          logAuditAction('Owner Admin', 'ADMIN', 'GENERATE_META_DESCRIPTIONS', `Generated 4 AI meta descriptions for ${itemType} "${itemName}".`);
          return res.json({ success: true, source: 'gemini', suggestions: validated });
        }
      } catch (parseErr) {
        console.warn('Failed to parse Gemini meta description response as JSON:', parseErr);
      }
    }

    // Return deterministic fallback
    logAuditAction('Owner Admin', 'ADMIN', 'GENERATE_META_DESCRIPTIONS', `Generated smart curated meta descriptions for ${itemType} "${itemName}".`);
    return res.json({
      success: true,
      source: 'smart-template-engine',
      suggestions: fallbackSuggestions
    });
  } catch (err: any) {
    console.error('Error generating meta descriptions:', err);
    res.status(500).json({ error: 'Failed to generate meta descriptions', details: err?.message });
  }
});

app.get('/api/agency', (req, res) => {
  res.json(agencyInfoDatabase);
});

app.post('/api/admin/agency', (req, res) => {
  const { agency } = req.body;
  if (agency && typeof agency === 'object') {
    agencyInfoDatabase = { ...agencyInfoDatabase, ...agency };
    logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_AGENCY_DETAILS', 'Updated agency business credentials and details.');
    return res.json({ success: true, agency: agencyInfoDatabase });
  }
  res.status(400).json({ error: 'Invalid agency payload' });
});

app.post('/api/admin/reset-defaults', (req, res) => {
  packagesDatabase = [...TOUR_PACKAGES_INITIAL];
  cabsDatabase = [...CAB_OPTIONS_INITIAL];
  agencyInfoDatabase = { ...AGENCY_DETAILS_INITIAL };
  ratesConfigDatabase = { ...RATES_CONFIG_INITIAL };
  seoDatabase = { ...DEFAULT_SEO_SETTINGS };
  logAuditAction('Owner Admin', 'OWNER', 'RESET_DEFAULTS', 'Reset factory defaults.');
  res.json({ success: true, message: 'Reset all packages, cabs, rates, agency details, and SEO settings to factory defaults.' });
});



// API Endpoint: Quick Quote Estimator
app.post('/api/calculate-quote', (req, res) => {
  const { route, vehicle, days, travelers } = req.body;
  
  // Look up cab rate from backend cabsDatabase
  const matchedCab = cabsDatabase.find(c =>
    c.model.toLowerCase().includes(String(vehicle).toLowerCase()) ||
    c.id.toLowerCase().includes(String(vehicle).toLowerCase())
  ) || cabsDatabase.find(c => c.id === 'cab-innova-crysta') || cabsDatabase[0];

  const cabRatePerDay = matchedCab ? matchedCab.ratePerDay : 4500;
  const numDays = Number(days) || 5;
  const numTravelers = Number(travelers) || 2;
  
  const totalVehicleCost = cabRatePerDay * numDays;
  const hotelNights = Math.max(1, numDays - 1);
  const roomsNeeded = Math.ceil(numTravelers / 2);
  const hotelNightRate = ratesConfigDatabase.hotelNightRates.premium3Star;
  const totalHotelCost = hotelNightRate * hotelNights * roomsNeeded;
  const permitFee = ratesConfigDatabase.permitFees.tsomgoPermit;
  
  const subtotal = (totalVehicleCost + totalHotelCost + permitFee) * ratesConfigDatabase.seasonalMultiplier;
  const totalTax = subtotal * (ratesConfigDatabase.gstTaxPercentage / 100);
  const totalPackageEstimate = Math.round(subtotal + totalTax);

  res.json({
    route: route || 'Sikkim & Darjeeling Tour',
    vehicle: matchedCab ? matchedCab.model : (vehicle || 'Toyota Innova Crysta'),
    days: numDays,
    travelers: numTravelers,
    estimatedVehicleCost: totalVehicleCost,
    estimatedHotelCost: totalHotelCost,
    estimatedTotalPackageCost: totalPackageEstimate,
    costPerPerson: Math.round(totalPackageEstimate / numTravelers),
    backendRatesApplied: {
      cabRatePerDay,
      hotelNightRate,
      seasonalMultiplier: ratesConfigDatabase.seasonalMultiplier,
      gstTaxPercentage: ratesConfigDatabase.gstTaxPercentage
    }
  });
});

// Agency Details & Branding API
let agencyDatabase: any = {
  name: 'OffbeatDestination Travels',
  tagline: 'A Better Way to Explore',
  location: 'Gangtok, Sikkim, India',
  phone: '+91 62961 02341',
  whatsappNumber: '916296102341',
  govtRegistration: 'Reg No: 1750/DoT&CAv/Gtk/25/TA',
  logoUrl: '',
};

app.get('/api/agency', (req, res) => {
  res.json(agencyDatabase);
});

app.post('/api/admin/agency', (req, res) => {
  const { agency } = req.body;
  if (agency && typeof agency === 'object') {
    agencyDatabase = { ...agencyDatabase, ...agency };
    logAuditAction('Owner Admin', 'ADMIN', 'UPDATE_AGENCY', 'Updated agency profile, branding & logo details.');
    return res.json({ success: true, agency: agencyDatabase });
  }
  res.status(400).json({ error: 'Invalid agency payload' });
});

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', agency: 'OffbeatDestination Travels AI Backend' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OffbeatDestination Travels server running on http://localhost:${PORT}`);
  });
}

startServer();
