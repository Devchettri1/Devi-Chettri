import { TourPackage, CabOption, CustomerReview, GalleryItem, SeoSettings } from '../types';
import { ADDITIONAL_PACKAGES } from './additionalPackages';

export const AGENCY_DETAILS = {
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
  googleMapsUrl: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
  googleBusinessProfileUrl: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
  facebookUrl: "https://www.facebook.com/offbeatdestinationtravels",
  instagramUrl: "https://www.instagram.com/offbeatdestinationtravels",
  instagramHandle: "@offbeatdestinationtravels",
  tripAdvisorUrl: "https://www.tripadvisor.in/Attraction_Review-g304557-d25088231-Reviews-Offbeat_Destination_Sikkim_Tours_Travels-Gangtok_East_Sikkim_Sikkim.html",
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
  logoUrl: "/images/official_logo.jpg",
  officePhoto: "/images/gmb_office_photo_1786168516883.jpg",
};

export const STANDARD_5N6D_PKG: TourPackage = {
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
    "Driver allowance, toll taxes, fuel, and parking fees",
    "Customizable Meals: Pure Veg, Strict Jain & Non-Veg (Local Chicken/Fish) options"
  ],
  permitsRequired: true,
  vegMealsAvailable: true,
  hotelTiers: {
    deluxe: { price: 15500, hotelType: "Deluxe Mountain Hotels & Cozy Homestays" },
    premium: { price: 18500, hotelType: "3-Star Standard & Executive View Hotels" },
    luxury: { price: 28500, hotelType: "4-Star Hotels & Luxury Spa Resorts (Mayfair, Elgin, etc.)" }
  },
  isSharedTourAvailable: true,
  sharedPricePerSeat: 1200,
  sharedTourDetails: "Nathula Pass & Tsomgo Lake Day Trip sharing seat in Innova/Xylo available at ₹1,200/seat with permits.",
  isLastMinuteAvailable: true,
  lastMinuteDepartureDate: "Aug 20, 2026",
  lastMinuteDepartureDaysAway: 3,
  lastMinuteDiscountPercent: 12,
  lastMinuteSeatsRemaining: 2,
  lastMinuteNote: "Guaranteed Innova Crysta & 3★ Gangtok/Darjeeling stays confirmed for immediate departure."
};

export const LUXURY_5N6D_PKG: TourPackage = {
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
    "5★ Heritage Luxury Resort stays (Mayfair Spa Resort Gangtok & Elgin/Windamere Darjeeling)",
    "VIP Executive Innova Crysta (Captain Seats) with personal chauffeur & Wi-Fi",
    "Guaranteed VIP Nathula Pass & Tsomgo Lake army permit clearance with warm oxygen support",
    "Exclusive Tiger Hill VIP viewing terrace & Glenary's Bakery high-tea session",
    "Complimentary 45-min foot reflexology spa session & welcome bottle of Himalayan wine",
    "Full Board Gourmet Meals (AP Plan: Multi-cuisine, Pure Veg, Strict Jain, or Non-Veg)"
  ],
  itinerary: [
    {
      day: 1,
      title: "VIP Welcome & Transfer to Mayfair Spa Resort Gangtok",
      description: "VIP arrival reception in luxury Innova Crysta with chilled beverages & snacks. Private check-in at 5★ Mayfair Spa Resort & Casino Gangtok with welcome candlelight dinner."
    },
    {
      day: 2,
      title: "VIP Army Clearance Excursion: Tsomgo Lake & Nathula Pass",
      description: "Priority army permit departure to Tsomgo Lake (12,400 ft) and Nathula Pass Indo-China border. Vehicle equipped with portable warm oxygen support & thermals. Hot gourmet lunch box served at high altitude."
    },
    {
      day: 3,
      title: "Private Heritage Sightseeing & Transfer to Elgin Darjeeling",
      description: "Private guided tour of Rumtek Monastery & Ban Jhakri Waterfalls with local historian guide. Scenic transfer to Darjeeling with suite check-in at The Elgin / Windamere Heritage Hotel."
    },
    {
      day: 4,
      title: "Tiger Hill Sunrise VIP Terrace & Glenary's High-Tea",
      description: "Chauffeur drive to Tiger Hill with reserved VIP viewing terrace. Private tea tasting session at Happy Valley Tea Estate & complimentary high-tea session at historic Glenary's Bakery."
    },
    {
      day: 5,
      title: "Mirik Lake Boating & Spa / Leisure Afternoon",
      description: "Private chauffeur trip to Mirik Lake with lakefront gazebo lunch & souvenir tea gift box. Afternoon complimentary 45-min foot reflexology spa session at resort."
    },
    {
      day: 6,
      title: "Gourmet Buffet Breakfast & Luxury Airport Transfer",
      description: "Gourmet buffet breakfast, luxury checkout with complimentary Sikkim organic tea hamper, and VIP transfer to Bagdogra Airport / NJP Station."
    }
  ],
  included: [
    "VIP Executive Innova Crysta (Captain Seats) with personal chauffeur & Wi-Fi",
    "5★ Heritage Luxury Resort stays (Mayfair Gangtok & Elgin/Windamere Darjeeling)",
    "Full Board Gourmet Meals (AP Plan: Multi-cuisine, Pure Veg, Strict Jain or Non-Veg)",
    "Guaranteed VIP Nathula Pass & Tsomgo Lake army permit processing",
    "Complimentary Glenary's High-Tea, 1x Spa Voucher & Welcome Wine",
    "All driver allowances, tolls, luxury taxes, and 24/7 dedicated tour manager"
  ],
  permitsRequired: true,
  vegMealsAvailable: true,
  hotelTiers: {
    deluxe: { price: 22000, hotelType: "Deluxe Heritage Stays" },
    premium: { price: 25000, hotelType: "3-Star Boutique Heritage Hotels" },
    luxury: { price: 28500, hotelType: "4-Star & 5-Star Luxury Mayfair & Elgin Resorts" }
  },
  isSharedTourAvailable: false
};

export const TOUR_PACKAGES: TourPackage[] = [
  STANDARD_5N6D_PKG,
  {
    id: "pkg-north-sikkim",
    title: "North Sikkim 2N/3D Expedition: Mandatory 2 Night Lachung Stay, Yumthang & Zero Point",
    duration: "2 Nights / 3 Days",
    location: "Mandatory 2 Night Stay in Lachung, Yumthang Valley, Zero Point & Katao",
    category: "North Sikkim",
    priceStarting: 14500,
    rating: 5.0,
    reviewsCount: 185,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Mandatory 2 Nights stay in Lachung homestay/hotel as per Sikkim Tourism rules",
      "Vibrant Valley of Flowers at Yumthang (11,800 ft)",
      "Snowbound experience at Zero Point (Yumesamdong 15,300 ft) & Katao Excursion",
      "Chungthang confluence, Seven Sisters Waterfall & Bhim Nala Waterfalls",
      "Strictly 4WD Scorpio / Innova heavy vehicles (Small cabs strictly not permitted)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Gangtok to Lachung (North Sikkim) via Seven Sisters Waterfall",
        description: "Morning departure from Gangtok in 4WD SUV. Enroute stop at Kabi Lungchok, Seven Sisters Waterfalls, and Chungthang confluence. Reach picturesque Lachung village for 1st Night stay."
      },
      {
        day: 2,
        title: "Lachung to Yumthang Valley, Zero Point (15,300 ft) & Katao Excursion",
        description: "Early morning drive through rhododendron sanctuary to Yumthang Valley of Flowers. Continue up to snowbound Zero Point (Yumesamdong) & optional Mount Katao. Return to Lachung for 2nd Night mandatory stay with hot home-cooked meals."
      },
      {
        day: 3,
        title: "Lachung to Gangtok Return via Bhim Nala Waterfalls",
        description: "After breakfast, enjoy peaceful village walks in Lachung. Scenic return drive to Gangtok with stops at Naga Waterfalls and Singhik Viewpoint."
      }
    ],
    included: [
      "Mandatory 2 Nights stay in Lachung village homestay/hotel with AP Meals (Breakfast, Lunch, Dinner)",
      "Protected Area Permits (PAP) for North Sikkim",
      "Heavy 4WD Scorpio / Innova mountain specialized vehicle (Small cabs not permitted)",
      "Experienced mountain driver trained in high-altitude snow terrain"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 11500, hotelType: "Deluxe Mountain Lodges & Village Homestays" },
      premium: { price: 14500, hotelType: "3-Star Premium Lachung Wooden View Hotels" },
      luxury: { price: 21500, hotelType: "4-Star Alpine Luxury Resorts & Suites" }
    },
    isSharedTourAvailable: true,
    sharedPricePerSeat: 4800,
    sharedTourDetails: "North Sikkim 2N/3D (Mandatory 2 Night Lachung Stay) shared Scorpio seat at ₹4,800/seat including stays, AP meals & permits.",
    isLastMinuteAvailable: true,
    lastMinuteDepartureDate: "Aug 22, 2026",
    lastMinuteDepartureDaysAway: 5,
    lastMinuteDiscountPercent: 15,
    lastMinuteSeatsRemaining: 3,
    lastMinuteNote: "Guaranteed 4WD Scorpio & 2-Night Lachung stay with permits ready for departure."
  },
  {
    id: "pkg-south-west-sikkim",
    title: "South & West Sikkim Offbeat Village & Skywalk Experience",
    duration: "4 Nights / 5 Days",
    location: "Namthang, Tarey Bhir, Ravangla & Pelling",
    category: "South-West Sikkim",
    priceStarting: 16200,
    rating: 4.8,
    reviewsCount: 112,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "Offbeat village stays at Namthang & panoramic cliff walk at Tarey Bhir",
      "Majestic Buddha Park at Ravangla with mountain views",
      "Organic tea gardens walk at Temi Tea Estate",
      "India's first Glass Skywalk & Chenrezig Statue at Pelling",
      "Khecheopalri Sacred Lake & Rimbi Waterfalls"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / IXB Pickup to Namthang Village & Tarey Bhir Ridge",
        description: "Scenic drive from Bagdogra/NJP up to Namthang village. Visit Tarey Bhir, a breathtaking 10,000 ft long cliff ridge offering views of Bengal plains and Teesta river."
      },
      {
        day: 2,
        title: "Namthang to Temi Tea Garden & Ravangla Buddha Park to Pelling",
        description: "Walk through Sikkim's only tea garden (Temi). Visit Buddha Park at Ravangla featuring the 130ft golden Buddha statue. Overnight in Pelling."
      },
      {
        day: 3,
        title: "Pelling Glass Skywalk & West Sikkim Exploration",
        description: "Thrilling glass walk at Pelling Skywalk. Visit Rabdentse Ruins, Pemayangtse Monastery, Khecheopalri Wish-Fulfilling Lake, and Kanchenjunga Waterfalls."
      },
      {
        day: 4,
        title: "Pelling to Gangtok via Namchi Char Dham",
        description: "Visit Solophok Chardham in Namchi featuring replicas of India's sacred dhams and 87ft Shiva statue. Evening arrival at Gangtok."
      },
      {
        day: 5,
        title: "Gangtok Departure to Airport / Station",
        description: "Drop back to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Dedicated Innova Crysta / Xylo private cab",
      "Deluxe mountain hotels and village homestays",
      "Daily Breakfast & Dinner",
      "Sightseeing permits & entry ticket coordination"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 13800, hotelType: "Deluxe Homestays & Village Cottages" },
      premium: { price: 16200, hotelType: "3-Star Mountain View Hotels in Pelling" },
      luxury: { price: 24000, hotelType: "4-Star Resorts & Skywalk View Suites" }
    },
    isSharedTourAvailable: false
  },
  {
    id: "pkg-bhutan-cultural",
    title: "Custom Bhutan Cultural Odyssey: Paro, Thimphu & Tiger's Nest",
    duration: "5 Nights / 6 Days",
    location: "Phuntsholing, Thimphu, Punakha & Paro",
    category: "Bhutan",
    priceStarting: 26500,
    rating: 4.9,
    reviewsCount: 95,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "Hike to iconic Taktsang Monastery (Tiger's Nest) in Paro",
      "Thimphu Buddha Dordenma & Tashichho Dzong tour",
      "Punakha Suspension Bridge & majestic Punakha Dzong",
      "Complete Bhutan Entry Permit & SDF fee handling",
      "Experienced Bhutanese English-speaking local guide"
    ],
    itinerary: [
      {
        day: 1,
        title: "Pick up at Hasimara / NJP to Phuntsholing Border",
        description: "Pick up and transfer to Bhutan border town Phuntsholing. Complete entry permit documentation."
      },
      {
        day: 2,
        title: "Phuntsholing to Thimphu Capital Drive",
        description: "Scenic mountain drive along Wangchu river to Thimphu capital. Visit Memorial Chorten."
      },
      {
        day: 3,
        title: "Thimphu Sightseeing & Dochula Pass to Punakha",
        description: "Visit Buddha Dordenma (169ft giant Buddha), National Textile Museum, and Dochula Pass with 108 stupas. Overnight in Punakha."
      },
      {
        day: 4,
        title: "Punakha Dzong to Paro Valley",
        description: "Visit Punakha Dzong at river confluence and walk across Punakha Suspension Bridge. Drive to Paro."
      },
      {
        day: 5,
        title: "Trek to Tiger's Nest Monastery (Taktsang)",
        description: "Unforgettable morning hike to cliffside Tiger's Nest Monastery perched 900 meters above Paro valley."
      },
      {
        day: 6,
        title: "Departure from Paro Airport or Drop to Bagdogra / NJP",
        description: "Private drop to Paro Airport or drive back across border to Bagdogra / NJP."
      }
    ],
    included: [
      "SDF (Sustainable Development Fee) & Entry Permit assistance",
      "Private luxury tourist vehicle with driver",
      "3-Star & 4-Star Bhutan certified hotels with meals",
      "Licensed local Bhutanese tourist guide"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 22500, hotelType: "Deluxe Bhutanese Heritage Lodges" },
      premium: { price: 26500, hotelType: "3-Star Certified Bhutanese Hotels" },
      luxury: { price: 38500, hotelType: "4-Star Luxury Resorts in Paro & Thimphu" }
    },
    isSharedTourAvailable: false
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
      "Tiger Hill sunrise over Mt. Kanchenjunga & Batasia Loop Toy Train track",
      "Private Innova Crysta / Xylo transfers with hill-certified chauffeur"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport (IXB) Pickup to Gangtok",
        description: "Warm reception at NJP / Bagdogra Airport by private chauffeur. Drive along scenic Teesta River up to Gangtok. Check-in at 3★ Deluxe hotel & evening leisurely stroll at MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Baba Mandir (Nathula Pass Optional)",
        description: "Excursion to alpine Tsomgo Lake (12,400 ft) surrounded by snow peaks and sacred Baba Harbhajan Singh Mandir. Optional permit extension to Nathula Pass Indo-China Border."
      },
      {
        day: 3,
        title: "Gangtok to Pelling via Temi Tea Garden & Ravangla Buddha Park",
        description: "Drive to West Sikkim. En route visit Temi Tea Estate (Sikkim's only tea garden) and Ravangla Buddha Park featuring the monumental 130ft Golden Buddha statue."
      },
      {
        day: 4,
        title: "Pelling Glass Skywalk & Kanchenjunga Waterfalls",
        description: "Walk the thrilling Glass Skywalk overlooking Chenrezig statue. Visit historic Rabdentse Palace Ruins, Pemayangtse Monastery, Khecheopalri Sacred Lake, and Rimbi Waterfalls."
      },
      {
        day: 5,
        title: "Pelling to Darjeeling - Queen of the Hills",
        description: "Morning departure towards Darjeeling through lush pine forests and tea slopes. Check-in at hotel and evening walk at Chowrasta Mall Road."
      },
      {
        day: 6,
        title: "Darjeeling Tiger Hill Sunrise & 7-Point Sightseeing",
        description: "Early 4:00 AM trip to Tiger Hill for sunrise over Mt. Kanchenjunga. Visit Batasia Loop, Ghoom Monastery, Himalayan Mountaineering Institute (HMI), and Happy Valley Tea Estate."
      },
      {
        day: 7,
        title: "Darjeeling Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and relaxing downhill drive to Bagdogra Airport (IXB) or NJP Railway Station with sweet Himalayan memories."
      }
    ],
    included: [
      "Private Innova Crysta / Xylo vehicle with professional mountain driver",
      "6 Nights accommodation in 3★ Deluxe hotels with daily Breakfast & Dinner",
      "Tsomgo Lake & Nathula Pass army permit coordination",
      "All toll taxes, parking fees, fuel, driver allowances, and state entry permits"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 16800, hotelType: "Deluxe Hotels in Gangtok, Pelling & Darjeeling" },
      premium: { price: 20000, hotelType: "3-Star Boutique View Hotels" },
      luxury: { price: 31000, hotelType: "4-Star Hotels & Luxury Mountain Resorts" }
    },
    isSharedTourAvailable: true,
    sharedPricePerSeat: 1200,
    sharedTourDetails: "Nathula Pass Day Trip sharing seat available at ₹1,200 per head.",
    isLastMinuteAvailable: true,
    lastMinuteDepartureDate: "Aug 25, 2026",
    lastMinuteDepartureDaysAway: 8,
    lastMinuteDiscountPercent: 10,
    lastMinuteSeatsRemaining: 2,
    lastMinuteNote: "Innova Crysta + 3★ Gangtok, Pelling & Darjeeling rooms secured."
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
      "Tiger Hill sunrise, Batasia Loop Toy Train track & Glenary's high-tea",
      "Complete Protected Area Permits (PAP) & Nathula border clearance"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / IXB Airport Pickup & Transfer to Gangtok",
        description: "Pick up at Bagdogra Airport or NJP station in private Innova Crysta. Drive to Gangtok along Teesta river valley. Evening free for local MG Marg exploration."
      },
      {
        day: 2,
        title: "Gangtok to Lachung (North Sikkim) via Waterfalls",
        description: "Morning departure to North Sikkim. Stop at Kabi Lungchok, Seven Sisters Waterfalls, and Chungthang river confluence. Reach scenic Lachung village by evening."
      },
      {
        day: 3,
        title: "Lachung to Yumthang Valley & Zero Point (15,300 ft)",
        description: "Early morning drive through rhododendron trees to Yumthang Valley of Flowers and Zero Point (Yumesamdong) covered in snow year-round. Evening return to Lachung."
      },
      {
        day: 4,
        title: "Lachung Return to Gangtok via Ban Jhakri Waterfalls",
        description: "Scenic drive back to Gangtok with stops at Singhik viewpoint and Ban Jhakri Energy Park. Evening check-in at Gangtok hotel."
      },
      {
        day: 5,
        title: "Tsomgo Lake Excursion & Transfer to Pelling",
        description: "Morning trip to Tsomgo Lake (12,400 ft) & Baba Mandir. Afternoon drive towards West Sikkim town of Pelling via Ravangla Buddha Park."
      },
      {
        day: 6,
        title: "Pelling Glass Skywalk & Transfer to Darjeeling",
        description: "Visit Pelling Glass Skywalk, Rabdentse Ruins, and Pemayangtse Monastery. Afternoon scenic drive across Rangeet River to Darjeeling."
      },
      {
        day: 7,
        title: "Darjeeling Tiger Hill Sunrise & City Sightseeing",
        description: "Early 4:00 AM trip to Tiger Hill for golden sunrise on Kanchenjunga. Visit Batasia Loop, Ghoom Monastery, Padmaja Naidu Himalayan Zoo, and Tea Garden."
      },
      {
        day: 8,
        title: "Darjeeling Drop to NJP Station / Bagdogra Airport",
        description: "Check-out after delicious breakfast and private drive down to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "North Sikkim Restricted Area Permit (PAP) & Tsomgo Lake permits",
      "Private 4WD Scorpio / Innova Crysta throughout the journey",
      "7 Nights deluxe hotel & Lachung village stays with meals",
      "Pure vegetarian & Jain meal options upon request"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 21500, hotelType: "Deluxe Hotels & Lachung Homestays" },
      premium: { price: 25800, hotelType: "3-Star Premium Hotels throughout circuit" },
      luxury: { price: 38500, hotelType: "4-Star Luxury Hotels & Alpine Resorts" }
    },
    isSharedTourAvailable: true,
    sharedPricePerSeat: 4800,
    sharedTourDetails: "North Sikkim 2N/3D (Lachung/Yumthang/Zero Point) shared seat at ₹4,800/seat with meals & permits."
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
      "Comprehensive coverage of East Sikkim, North Sikkim, West Sikkim, Kalimpong & Darjeeling",
      "Zero Point (15,300 ft), Yumthang Valley, Tsomgo Lake & Nathula Pass",
      "Pelling Glass Skywalk, Khecheopalri Wish Lake & Rabdentse Palace Ruins",
      "Kalimpong Deolo Hill, Cactus Nursery & Durpin Monastery",
      "Tiger Hill Kanchenjunga sunrise & Darjeeling Tea Estate walk",
      "VIP 24/7 travel desk coordinator & dedicated driver"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / IXB Airport Pickup to Gangtok",
        description: "Arrival at Bagdogra Airport (IXB) or NJP station. Private Innova Crysta pickup to Gangtok. Evening stroll at MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Baba Mandir (Nathula Pass Border Optional)",
        description: "High altitude drive to sacred Tsomgo Lake (12,400 ft) and Baba Mandir. Optional permit extension to Nathula Pass Indo-China Border."
      },
      {
        day: 3,
        title: "Gangtok to Lachung (North Sikkim)",
        description: "Journey into North Sikkim pine forests via Seven Sisters Waterfall and Chungthang confluence. Night stay at Lachung."
      },
      {
        day: 4,
        title: "Yumthang Valley of Flowers & Zero Point (15,300 ft)",
        description: "Visit Yumthang Valley and snow-clad Zero Point. Enjoy hot noodles and tea at high altitude before returning to Lachung."
      },
      {
        day: 5,
        title: "Lachung to Gangtok Local Sightseeing",
        description: "Return to Gangtok. Visit Hanuman Tok, Ganesh Tok, and Enchey Monastery. Evening leisure time."
      },
      {
        day: 6,
        title: "Gangtok to Pelling via Temi Tea Estate & Ravangla Buddha Park",
        description: "Drive to West Sikkim. Stroll through Temi Tea Garden and Ravangla Buddha Park. Overnight in Pelling."
      },
      {
        day: 7,
        title: "Pelling Glass Skywalk & Drive to Kalimpong",
        description: "Experience Pelling Glass Skywalk and Kanchenjunga Waterfalls. Drive along Teesta River to quaint hill town Kalimpong."
      },
      {
        day: 8,
        title: "Kalimpong Sightseeing & Transfer to Darjeeling",
        description: "Visit Deolo Hill, Pine View Cactus Nursery, and Durpin Monastery in Kalimpong. Afternoon transfer to Darjeeling."
      },
      {
        day: 9,
        title: "Tiger Hill Sunrise & Departure to NJP / Bagdogra Airport",
        description: "4:00 AM Tiger Hill Kanchenjunga sunrise, Batasia Loop Toy Train track, followed by breakfast and private transfer to NJP / IXB Airport."
      }
    ],
    included: [
      "Private Innova Crysta / Xylo vehicle with expert driver",
      "8 Nights deluxe hotel accommodation with daily breakfast & dinner",
      "All Sikkim Restricted Area Permits (PAP) & army permit fees",
      "Driver allowance, toll taxes, fuel, parking, and 24/7 dedicated support"
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
    heroImage: "/images/nathula_pass_snow_1785681052944.jpg",
    highlights: [
      "Navigate 30+ legendary hairpin bends of the Old Silk Route Zig-Zag road",
      "Sunrise over Mt. Kanchenjunga from Thambi Viewpoint (11,200 ft)",
      "Primal high-altitude lakes: Elephant Lake (Kupup) & Tsomgo Lake",
      "Old Baba Mandir & Nathang Valley snow plateau",
      "Authentic homestay warm hospitality with organic Sikkimese home-cooked meals",
      "Complete Silk Route inner line permit clearance"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport to Sillery Gaon / Reshi Khola",
        description: "Pick up in private mountain vehicle. Drive through Rangpo to peaceful eco-village Sillery Gaon or Reshi Khola riverbank. Evening bonfire and local organic dinner."
      },
      {
        day: 2,
        title: "Sillery Gaon to Zuluk via Rongli Permit Clearance",
        description: "Process Silk Route permits at Rongli. Pass through Lingtam, Kuekhola Waterfalls, and Nimachen to reach historic Zuluk village. Stroll through the quiet hamlets."
      },
      {
        day: 3,
        title: "Zuluk Zig-Zag Road to Nathang Valley, Kupup Lake & Gangtok",
        description: "4:30 AM drive to Thambi Viewpoint for Kanchenjunga sunrise over 30+ hairpin bends. Visit Nathang Valley (13,500 ft), Old Baba Mandir, Kupup Elephant Lake, and drop to Gangtok."
      },
      {
        day: 4,
        title: "Gangtok Departure to NJP / Bagdogra Airport",
        description: "Morning breakfast, souvenir shopping at MG Marg, and private drop back to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private vehicle with mountain driver experienced in Silk Route hairpin bends",
      "3 Nights homestay & hotel accommodation with home-cooked breakfast & dinner",
      "Rongli Silk Route Inner Line Permit processing",
      "Driver allowance, toll taxes, fuel, and state fees"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    isLastMinuteAvailable: true,
    lastMinuteDepartureDate: "Aug 26, 2026",
    lastMinuteDepartureDaysAway: 9,
    lastMinuteDiscountPercent: 10,
    lastMinuteSeatsRemaining: 4,
    lastMinuteNote: "Zuluk homestay rooms & Rongli SDPO permit clearance pre-processed."
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
      "Sacred Gurudongmar Lake (17,800 ft) - one of the highest lakes in North Sikkim",
      "Yumthang Valley of Flowers & hot sulphur springs",
      "Year-round snow adventure at Zero Point (Yumesamdong 15,300 ft)",
      "Seven Sisters Waterfall, Singhik Viewpoint & Chungthang river confluence",
      "Traditional Lachen & Lachung mountain village homestays with hot Sikkimese meals",
      "Complete North Sikkim Protected Area Permit (PAP) processing"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport to Gangtok",
        description: "Pick up in private Innova/Scorpio and drive along Teesta River to Gangtok. Evening free for stroll at MG Marg."
      },
      {
        day: 2,
        title: "Gangtok to Lachen Village (9,000 ft) via Waterfalls",
        description: "Morning departure for North Sikkim. View Seven Sisters Waterfalls, Mangan Valley, and Chungthang confluence. Night stay in serene Lachen village."
      },
      {
        day: 3,
        title: "Lachen to Sacred Gurudongmar Lake (17,800 ft) & Transfer to Lachung",
        description: "4:00 AM trip through Tibetan plateau landscape to sacred Gurudongmar Lake (17,800 ft) near Indo-China border. Return to Lachen for lunch and drive to Lachung."
      },
      {
        day: 4,
        title: "Lachung to Yumthang Valley, Zero Point (15,300 ft) & Return to Gangtok",
        description: "Morning visit to Yumthang Valley of Flowers and Zero Point covered in perpetual snow. Return to Gangtok by evening."
      },
      {
        day: 5,
        title: "Gangtok Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private drive down to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Protected Area Permit (PAP) for North Sikkim & Gurudongmar Lake",
      "4WD Scorpio / Bolero / Innova specialized mountain cab with hill driver",
      "4 Nights accommodation (2N Gangtok, 1N Lachen, 1N Lachung) with daily Meals (AP/MAP)",
      "Pure vegetarian, strict Jain & Sikkimese non-veg meal plans"
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
      "High-altitude Tsomgo Lake (12,400 ft) & Baba Harbhajan Singh Mandir",
      "Nathula Pass Indo-China border permit option",
      "Gangtok ropeway ride, Hanuman Tok & Ban Jhakri Waterfalls",
      "Tiger Hill sunrise over Mt. Kanchenjunga & Batasia Loop Toy Train track",
      "Happy Valley Tea Estate walk & Japanese Peace Pagoda",
      "Most economical private tour package with quality 3★ hotel stays"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport Pickup to Gangtok",
        description: "Pick up at station/airport and drive along scenic mountain roads to Gangtok. Evening leisure time at MG Marg."
      },
      {
        day: 2,
        title: "Excursion to Tsomgo Lake & Baba Mandir (Nathula Optional)",
        description: "Day trip to sacred Tsomgo Lake (12,400 ft) and Baba Mandir. Optional permit extension to Nathula Pass border."
      },
      {
        day: 3,
        title: "Gangtok City Sightseeing & Transfer to Darjeeling",
        description: "Visit Ban Jhakri Waterfalls, Cable Car, and Ganesh Tok. Afternoon drive through tea-clad hills to Darjeeling."
      },
      {
        day: 4,
        title: "Darjeeling Tiger Hill Sunrise & 7-Point Sightseeing",
        description: "4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop, Ghoom Monastery, HMI Himalayan Mountaineering Institute, and Happy Valley Tea Estate."
      },
      {
        day: 5,
        title: "Darjeeling Departure to NJP Station / IXB Airport",
        description: "Breakfast at hotel and private drive down to NJP Railway Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private sedan/SUV vehicle with professional local driver",
      "4 Nights accommodation in 3★ hotels with daily Breakfast & Dinner",
      "Tsomgo Lake & Nathula Pass permit clearance",
      "Tolls, parking, fuel, and driver allowances"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    isLastMinuteAvailable: true,
    lastMinuteDepartureDate: "Aug 28, 2026",
    lastMinuteDepartureDaysAway: 11,
    lastMinuteDiscountPercent: 15,
    lastMinuteSeatsRemaining: 3,
    lastMinuteNote: "Budget explorer special: Hotel + cab confirmed for instant checkout."
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
      "Romantic Candlelight Dinner with floral bed decoration & special honeymoon cake",
      "Private Innova Crysta throughout with couple privacy and soft music",
      "Tsomgo Lake alpine snow scenery & Nathula Pass border experience",
      "Private couple boating at Mirik Lake & Pashupati Nepal border market shopping",
      "High Tea & pastries session at historic Glenary's Bakery Darjeeling",
      "Tiger Hill sunrise over Mt. Kanchenjunga with VIP viewing deck"
    ],
    itinerary: [
      {
        day: 1,
        title: "Romantic Welcome & Private Transfer to Gangtok Hotel",
        description: "Chauffeur reception at Bagdogra/NJP with welcome flowers. Scenic drive to Gangtok. Candlelight dinner with flower bed decor & honeymoon cake at hotel."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Baba Mandir (Nathula Pass Border Optional)",
        description: "Couple excursion to snow-kissed Tsomgo Lake (12,400 ft) and Baba Mandir. Photo ops in traditional Sikkimese attire with yaks."
      },
      {
        day: 3,
        title: "Gangtok Local Sightseeing & MG Marg Evening Stroll",
        description: "Visit Hanuman Tok, Ban Jhakri Waterfalls, Flower Exhibition Centre, and enjoy a romantic evening walk at pedestrian MG Marg."
      },
      {
        day: 4,
        title: "Gangtok to Darjeeling via Mirik Lake Couple Boating",
        description: "Drive to Darjeeling via pine-fringed Mirik Lake. Enjoy peaceful couple boating on Sumendu Lake and visit Pashupati Nepal border market."
      },
      {
        day: 5,
        title: "Tiger Hill Sunrise & Glenary's High-Tea Experience",
        description: "4:00 AM Tiger Hill sunrise view over Kanchenjunga. Visit Batasia Loop, Happy Valley Tea Garden, and enjoy complimentary High Tea at Glenary's Bakery."
      },
      {
        day: 6,
        title: "Farewell Breakfast & Private Drop to NJP / Bagdogra Airport",
        description: "Relaxed gourmet breakfast, gift pack of fresh Darjeeling tea, and private drop to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private Innova Crysta throughout the tour with romantic setup",
      "5 Nights boutique luxury hotel stays with daily breakfast & dinner",
      "1x Romantic Candlelight Dinner, Floral Bed Decoration & Honeymoon Cake",
      "Complimentary Mirik Lake Boating tickets & Glenary's High Tea voucher",
      "Tsomgo Lake & Nathula Pass permit processing fees"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    isLastMinuteAvailable: true,
    lastMinuteDepartureDate: "Aug 24, 2026",
    lastMinuteDepartureDaysAway: 7,
    lastMinuteDiscountPercent: 10,
    lastMinuteSeatsRemaining: 1,
    lastMinuteNote: "Last 1 Honeymoon Suite & private Innova Crysta ready for departure."
  },
  {
    id: "pkg-7d6n-grand-sikkim-north-darjeeling",
    title: "7 Days / 6 Nights Grand Sikkim, Gurudongmar & Darjeeling Expedition",
    duration: "7 Days / 6 Nights",
    location: "Gangtok (2N), Lachen & Gurudongmar (1N), Lachung & Zero Point (1N) & Darjeeling (2N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 24500,
    rating: 5.0,
    reviewsCount: 188,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Sacred Gurudongmar Lake (17,800 ft) & snowbound Zero Point (15,300 ft)",
      "Traditional Lachen & Lachung mountain village homestays with hot meals",
      "Tsomgo High Altitude Glacial Lake (12,400 ft) & Baba Mandir",
      "Tiger Hill early morning Kanchenjunga sunrise & Batasia Loop",
      "Happy Valley Tea Garden tour & Darjeeling Mall road",
      "Guaranteed North Sikkim Restricted Area Permits & Nathula assistance"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport Pickup to Gangtok",
        description: "Warm welcome by private chauffeur in Innova Crysta. Drive along Teesta River to Gangtok. Evening free for stroll at MG Marg."
      },
      {
        day: 2,
        title: "Gangtok to Lachen Village (9,000 ft) via Waterfalls",
        description: "Morning departure for North Sikkim. Stop at Kabi Lungchok, Seven Sisters Waterfalls, and Chungthang river confluence. Check-in at cozy Lachen village hotel."
      },
      {
        day: 3,
        title: "Lachen to Sacred Gurudongmar Lake (17,800 ft) & Drive to Lachung",
        description: "4:00 AM trip through Tibetan plateau landscape to sacred Gurudongmar Lake (17,800 ft). Return to Lachen for lunch and drive to Lachung village."
      },
      {
        day: 4,
        title: "Lachung to Yumthang Valley, Zero Point (15,300 ft) & Return to Gangtok",
        description: "Visit Yumthang Valley of Flowers and Zero Point (Yumesamdong) covered in perpetual snow. Return to Gangtok by evening."
      },
      {
        day: 5,
        title: "Tsomgo Lake Excursion & Transfer to Darjeeling",
        description: "Morning trip to alpine Tsomgo Lake (12,400 ft) & Baba Harbhajan Mandir. Afternoon drive across tea garden slopes to Darjeeling."
      },
      {
        day: 6,
        title: "Darjeeling Tiger Hill Sunrise & 7-Points Sightseeing",
        description: "4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop, Ghoom Monastery, Padmaja Naidu Himalayan Zoo, and Happy Valley Tea Estate."
      },
      {
        day: 7,
        title: "Darjeeling Departure to NJP Station / Bagdogra Airport",
        description: "Gourmet breakfast, souvenir tea pack, and private drive down to NJP Station or Bagdogra Airport (IXB)."
      }
    ],
    included: [
      "North Sikkim Restricted Area Permit (PAP) & Tsomgo Lake army permits",
      "4WD Scorpio / Innova Crysta private vehicle with experienced mountain driver",
      "6 Nights accommodation in 3★ hotels & Lachen/Lachung village stays with meals",
      "Customizable Meals: Pure Vegetarian, Strict Jain, or Non-Veg AP/MAP plan"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-8d7n-silk-route-north-sikkim-darjeeling",
    title: "8 Days / 7 Nights Old Silk Route Zuluk, North Sikkim & Darjeeling Expedition",
    duration: "8 Days / 7 Nights",
    location: "Reshi Khola / Sillery (1N), Zuluk Silk Route (1N), Gangtok (1N), Lachung (2N) & Darjeeling (2N)",
    category: "Silk Route",
    priceStarting: 27800,
    rating: 4.9,
    reviewsCount: 164,
    heroImage: "/images/agency_poster_dark_1785772843834.jpg",
    highlights: [
      "Navigate 30+ hairpin bends of legendary Old Silk Route & Thambi Viewpoint sunrise",
      "Elephant Lake (Kupup), Old Baba Mandir & Nathang Valley snow plateau",
      "Yumthang Valley of Flowers & Zero Point (15,300 ft) North Sikkim",
      "Tsomgo Lake & Gangtok ropeway ride",
      "Darjeeling Tiger Hill Kanchenjunga sunrise & Glenary's Bakery high tea",
      "Complete Silk Route Inner Line Permits & Restricted Area Permits included"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / IXB Pickup to Sillery Gaon / Reshi Khola Eco-Village",
        description: "Arrival pickup and drive to peaceful eco-village Sillery Gaon or Reshi Khola riverbank. Evening bon-fire and organic dinner."
      },
      {
        day: 2,
        title: "Sillery Gaon to Zuluk via Rongli Permit Clearance",
        description: "Process Silk Route permits at Rongli. Pass through Kuekhola Waterfalls to historic Zuluk village (9,400 ft)."
      },
      {
        day: 3,
        title: "Zuluk Silk Route Zig-Zag Bends to Nathang Valley, Kupup Lake & Gangtok",
        description: "Early morning Kanchenjunga sunrise at Thambi Viewpoint over 30+ hairpin bends. Visit Nathang Valley, Old Baba Mandir, Kupup Lake, and drop to Gangtok."
      },
      {
        day: 4,
        title: "Gangtok to Lachung Village via Waterfalls",
        description: "Journey into North Sikkim pine forests via Seven Sisters Waterfalls and Chungthang confluence. Check-in at Lachung."
      },
      {
        day: 5,
        title: "Yumthang Valley of Flowers & Zero Point (15,300 ft)",
        description: "Drive through rhododendron forests to Yumthang Valley and snow-bound Zero Point. Hot local tea and meals in Lachung."
      },
      {
        day: 6,
        title: "Lachung Return to Gangtok & Onward to Darjeeling",
        description: "Scenic drive back from Lachung through Gangtok hills to Darjeeling Queen of Hills. Evening walk at Chowrasta Mall Road."
      },
      {
        day: 7,
        title: "Darjeeling Tiger Hill Sunrise & City Sightseeing",
        description: "4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop Toy Train track, Ghoom Monastery, and Happy Valley Tea Estate."
      },
      {
        day: 8,
        title: "Darjeeling Drop to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private drive down to NJP Railway Station or Bagdogra Airport."
      }
    ],
    included: [
      "Rongli Silk Route Inner Line Permit & North Sikkim Restricted Area Permit",
      "Private 4WD Scorpio / Innova Crysta throughout with specialized hill driver",
      "7 Nights accommodation in mountain homestays & 3★ hotels with daily meals",
      "Driver allowance, fuel, tolls, parking, and 24/7 dedicated support"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-9d8n-complete-sikkim-pelling-darjeeling",
    title: "9 Days / 8 Nights Complete Sikkim, Gurudongmar, Pelling Skywalk & Darjeeling",
    duration: "9 Days / 8 Nights",
    location: "Gangtok (2N), Lachen (1N), Lachung (1N), Pelling Glass Skywalk (2N) & Darjeeling (2N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 31500,
    rating: 5.0,
    reviewsCount: 210,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "Comprehensive coverage of East, West, South & North Sikkim + Darjeeling",
      "Gurudongmar Sacred Lake (17,800 ft) & Zero Point snow region (15,300 ft)",
      "India's 1st Glass Skywalk at Pelling & Khecheopalri Wish-Fulfilling Lake",
      "Ravangla Buddha Park & Temi Tea Garden organic tea tasting",
      "Tsomgo Glacial Lake, Nathula Pass Indo-China border & Tiger Hill Kanchenjunga sunrise",
      "Private Innova Crysta throughout with dedicated 24/7 tour manager"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport Pickup to Gangtok",
        description: "Arrival pickup in private Innova Crysta. Scenic drive along Teesta River to Gangtok hotel. Evening walk at MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Baba Mandir Excursion (Nathula Pass Optional)",
        description: "Day trip to sacred Tsomgo Lake (12,400 ft) and Baba Harbhajan Mandir. Optional extension to Nathula Pass border."
      },
      {
        day: 3,
        title: "Gangtok to Lachen Village (North Sikkim)",
        description: "Drive north along waterfalls and river gorges via Seven Sisters Waterfalls and Chungthang confluence. Night stay at Lachen."
      },
      {
        day: 4,
        title: "Sacred Gurudongmar Lake (17,800 ft) & Transfer to Lachung",
        description: "Early morning trip to high-altitude Gurudongmar Lake near Tibet border. Return to Lachen and transfer to Lachung."
      },
      {
        day: 5,
        title: "Yumthang Valley, Zero Point (15,300 ft) & Return to Gangtok",
        description: "Morning excursion to Yumthang Valley of Flowers and snow-capped Zero Point. Evening return to Gangtok."
      },
      {
        day: 6,
        title: "Gangtok to Pelling via Temi Tea Garden & Ravangla Buddha Park",
        description: "Drive to West Sikkim. Stroll through Temi Tea Estate and visit Ravangla Buddha Park. Check-in at Pelling."
      },
      {
        day: 7,
        title: "Pelling Glass Skywalk & West Sikkim Exploration",
        description: "Walk India's 1st Glass Skywalk, Rabdentse Palace Ruins, Pemayangtse Monastery, and Khecheopalri Wish Lake."
      },
      {
        day: 8,
        title: "Pelling to Darjeeling - Queen of Hills",
        description: "Scenic transfer through tea gardens to Darjeeling. Check-in at hotel and evening shopping at Chowrasta."
      },
      {
        day: 9,
        title: "Tiger Hill Sunrise & Drop to NJP Station / Bagdogra Airport",
        description: "4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop Toy Train track, followed by breakfast and private drop to NJP / IXB Airport."
      }
    ],
    included: [
      "All Sikkim Restricted Area Permits (PAP) & Nathula border clearance",
      "Private Innova Crysta SUV throughout with experienced hill driver",
      "8 Nights deluxe hotel & village homestay accommodation with daily meals",
      "Pure vegetarian, Jain, or non-veg meal plans handled"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-10d9n-ultimate-sikkim-darjeeling-bhutan-grand-odyssey",
    title: "10 Days / 9 Nights Ultimate Sikkim, Bhutan Border & Darjeeling Grand Odyssey",
    duration: "10 Days / 9 Nights",
    location: "Gangtok (3N), Lachen & Gurudongmar (1N), Lachung & Zero Point (1N), Pelling (2N) & Darjeeling (2N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 36500,
    rating: 5.0,
    reviewsCount: 142,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "The ultimate 10-day Himalayan circuit across Sikkim, Bhutan Border & Darjeeling",
      "Gurudongmar Sacred Lake (17,800 ft), Yumthang Valley & Zero Point North Sikkim",
      "Tsomgo Lake & Nathula Pass Indo-China Border army permits",
      "Pelling Glass Skywalk, Rabdentse Ruins & Rimbi Waterfalls",
      "Ravangla Buddha Park, Namchi Char Dham & Temi Tea Estate",
      "Phuntsholing Bhutan Gate excursion & Darjeeling Tiger Hill Kanchenjunga sunrise",
      "VIP Innova Crysta transfers with custom meal options (Pure Veg / Strict Jain / Non-Veg)"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / IXB Airport Pickup to Gangtok",
        description: "Arrival welcome by chauffeur in Innova Crysta. Scenic drive along Teesta River to Gangtok. Evening stroll at MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Nathula Pass Border Excursion",
        description: "Excursion to alpine Tsomgo Lake (12,400 ft), Baba Harbhajan Mandir, and Nathula Pass Indo-China border."
      },
      {
        day: 3,
        title: "Gangtok to Lachen Village (North Sikkim)",
        description: "Drive north past Seven Sisters Waterfalls, Mangan valley, and Chungthang confluence. Night stay in serene Lachen."
      },
      {
        day: 4,
        title: "Gurudongmar Lake (17,800 ft) & Drive to Lachung",
        description: "4:00 AM trip to sacred Gurudongmar Lake (17,800 ft) near Tibet border. Return to Lachen for lunch and drive to Lachung."
      },
      {
        day: 5,
        title: "Yumthang Valley, Zero Point (15,300 ft) & Return to Gangtok",
        description: "Visit Yumthang Valley of Flowers and snow-capped Zero Point. Return to Gangtok by evening."
      },
      {
        day: 6,
        title: "Gangtok to Pelling via Namchi Char Dham & Ravangla Buddha Park",
        description: "Visit Namchi Solophok Char Dham (87ft Shiva statue) and Ravangla Buddha Park. Check-in at Pelling."
      },
      {
        day: 7,
        title: "Pelling Glass Skywalk & West Sikkim Heritage Tour",
        description: "Walk Pelling Glass Skywalk, Rabdentse Palace Ruins, Pemayangtse Monastery, and Khecheopalri Wish Lake."
      },
      {
        day: 8,
        title: "Pelling to Darjeeling via Mirik Lake & Pashupati Nepal Border",
        description: "Drive to Darjeeling via Mirik Lake. Enjoy lakefront boating and shopping at Pashupati Nepal border market."
      },
      {
        day: 9,
        title: "Darjeeling Tiger Hill Sunrise & 7-Points Sightseeing",
        description: "4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop Toy Train track, HMI Zoo, and Happy Valley Tea Estate."
      },
      {
        day: 10,
        title: "Gourmet Breakfast & Private Drop to NJP Station / IXB Airport",
        description: "Relaxed breakfast, souvenir Darjeeling tea gift box, and private transfer to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "All North Sikkim Protected Area Permits (PAP), Nathula border & Tsomgo permits",
      "Executive Innova Crysta SUV throughout with professional hill chauffeur",
      "9 Nights accommodation in 3★ Deluxe hotels & mountain homestays with meals (AP/MAP)",
      "Driver allowance, fuel, toll taxes, parking, and 24/7 dedicated trip coordinator"
    ],
    permitsRequired: true,
    vegMealsAvailable: true
  },
  {
    id: "pkg-etripto-3n4d-glimpse",
    title: "3 Nights / 4 Days Gangtok & Darjeeling Express Glimpse (etripto.in Special)",
    duration: "3 Nights / 4 Days",
    location: "Gangtok (2N) & Darjeeling (1N) with Tsomgo Lake & Tiger Hill Sunrise",
    category: "Sikkim-Darjeeling",
    priceStarting: 12500,
    rating: 4.9,
    reviewsCount: 189,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "Quick express circuit for travelers with short holiday windows",
      "High-altitude Tsomgo Lake (12,400 ft) & Baba Harbhajan Mandir",
      "Nathula Pass Indo-China Border permit assistance",
      "Tiger Hill 4:00 AM Kanchenjunga sunrise & Batasia Loop Toy Train track",
      "Happy Valley Tea Estate walk & MG Marg Gangtok evening stroll",
      "Stay in affiliated Summit / Udaan / Rufina hotels with daily breakfast & dinner"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / IXB Airport Pickup & Transfer to Gangtok",
        description: "Arrival pickup in private vehicle from NJP station or Bagdogra Airport. Scenic drive along Teesta River to Gangtok hotel. Evening walk at MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Glacial Lake & Baba Mandir Excursion (Nathula Optional)",
        description: "Day excursion to sacred Tsomgo Lake (12,400 ft) and Baba Mandir. Optional permit extension to Nathula Pass Indo-China border."
      },
      {
        day: 3,
        title: "Gangtok City Sightseeing & Drive to Darjeeling",
        description: "Visit Ban Jhakri Waterfalls, Cable Car, and Enchey Monastery. Afternoon drive through tea garden slopes to Darjeeling. Evening at Chowrasta."
      },
      {
        day: 4,
        title: "Tiger Hill Sunrise & Drop to NJP / Bagdogra Airport",
        description: "Early 4:00 AM trip to Tiger Hill for Kanchenjunga sunrise. Visit Batasia Loop and Ghoom Monastery, then drop to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private mountain vehicle (Sedan / Innova Crysta / Scorpio)",
      "3 Nights hotel accommodation in Summit / Udaan / Rufina affiliated properties",
      "Daily Breakfast & Dinner (MAP Plan)",
      "Tsomgo Lake & Nathula Pass permit processing",
      "Tolls, fuel, driver allowance, and parking charges"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 10500, hotelType: "Rufina / Deluxe Mountain Stays" },
      premium: { price: 12500, hotelType: "Summit / Udaan 3-Star View Hotels" },
      luxury: { price: 21000, hotelType: "Mayfair Spa Resort & Elgin Heritage Suites" }
    }
  },
  {
    id: "pkg-etripto-4n5d-silkroute",
    title: "4 Nights / 5 Days Historic Old Silk Route & Zuluk Circuit (etripto.in Special)",
    duration: "4 Nights / 5 Days",
    location: "Reshi Khola / Aritar (1N), Zuluk (1N) & Gangtok (2N)",
    category: "Silk Route",
    priceStarting: 15800,
    rating: 4.9,
    reviewsCount: 165,
    heroImage: "/images/agency_poster_dark_1785772843834.jpg",
    highlights: [
      "Cross the historic trade corridor: 30+ hairpin bends of Zuluk Zig-Zag road",
      "Sunrise over Mt. Kanchenjunga from Thambi Viewpoint (11,200 ft)",
      "Nathang Valley snow plateau, Kupup Elephant Lake & Old Baba Mandir",
      "Aritar Lampokhari Lake boating & Reshi Riverbank nature walks",
      "Tsomgo Glacial Lake & MG Marg Gangtok exploration",
      "Complete Silk Route Inner Line Permit (ILP) clearance included"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / Bagdogra Pickup to Reshi Khola / Aritar Lake",
        description: "Pick up at station or airport. Scenic drive to Reshi Khola riverbank or Aritar Lake. Enjoy paddle boating at Lampokhari Lake and cozy bonfire."
      },
      {
        day: 2,
        title: "Aritar to Zuluk via Rongli Permit Clearance",
        description: "Obtain Silk Route inner line permits at Rongli. Pass through Lingtam and Kuekhola Waterfalls to historic Zuluk village (9,400 ft)."
      },
      {
        day: 3,
        title: "Zuluk Hairpin Bends to Nathang Valley, Kupup Lake & Gangtok",
        description: "4:30 AM sunrise from Thambi Viewpoint over 30+ hairpin bends. Visit Nathang Valley, Old Baba Mandir, Kupup Elephant Lake, and drop to Gangtok."
      },
      {
        day: 4,
        title: "Tsomgo Lake & Baba Mandir High-Altitude Excursion",
        description: "Morning trip to Tsomgo Lake (12,400 ft) surrounded by snow peaks. Evening free for souvenir shopping at MG Marg Gangtok."
      },
      {
        day: 5,
        title: "Gangtok Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private drive down to NJP Station or Bagdogra Airport with Silk Route memories."
      }
    ],
    included: [
      "Private 4WD Scorpio / Innova vehicle with experienced Silk Route hill driver",
      "4 Nights accommodation (Reshi, Zuluk homestay, Gangtok hotel) with meals",
      "Rongli Silk Route Inner Line Permit & Tsomgo permits",
      "Fuel, driver allowance, tolls, and state entry taxes"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 13200, hotelType: "Traditional Silk Route Homestays & Deluxe Gangtok Hotel" },
      premium: { price: 15800, hotelType: "Premium Silk Route Stays & Summit / Udaan Gangtok" },
      luxury: { price: 24500, hotelType: "Mayfair Spa Resort Gangtok & Luxury Silk Route Cottage" }
    }
  },
  {
    id: "pkg-etripto-3n4d-darjeeling-mirik",
    title: "3 Nights / 4 Days Darjeeling, Mirik Lake & Lamahatta Tea Garden Special",
    duration: "3 Nights / 4 Days",
    location: "Darjeeling (2N) & Mirik Lake / Kurseong (1N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 11900,
    rating: 4.8,
    reviewsCount: 142,
    heroImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highlights: [
      "Tiger Hill 4:00 AM Kanchenjunga sunrise & Batasia Loop Toy Train track",
      "Happy Valley Tea Estate stroll & high-tea session",
      "Lamahatta Eco Park pine forest canopy walk & quiet meditation garden",
      "Mirik Sumendu Lake paddle boating & Pashupati Nepal border market",
      "Kurseong Dow Hill tea estate view & Japanese Peace Pagoda",
      "Affiliated stay at Udaan Dekeling / Summit Grace / Yashshree Darjeeling"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / IXB Pickup to Darjeeling Queen of Hills",
        description: "Pick up at Bagdogra Airport or NJP station. Drive up through tea garden hills to Darjeeling. Check-in at hotel and evening walk at Chowrasta Mall."
      },
      {
        day: 2,
        title: "Tiger Hill Sunrise, 7-Point Sightseeing & Lamahatta Excursion",
        description: "Early 4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop, Ghoom Monastery. Afternoon excursion to Lamahatta Eco Park pine gardens."
      },
      {
        day: 3,
        title: "Darjeeling to Mirik Lake via Tea Gardens & Pashupati Border",
        description: "Drive through undulating tea estates to Mirik Lake. Enjoy lakefront boating and shopping at Pashupati Nepal border market. Night stay at Mirik / Kurseong."
      },
      {
        day: 4,
        title: "Mirik / Kurseong Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast overlooking tea hills and easy downhill drive to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private sedan/SUV vehicle with polite local hill chauffeur",
      "3 Nights hotel stay in Udaan / Summit / Yashshree Darjeeling properties",
      "Daily Breakfast & Dinner (MAP Plan)",
      "Mirik Lake boating tickets & Lamahatta entry pass",
      "All tolls, driver allowance, and parking fees"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 9800, hotelType: "Rufina / Deluxe Tea Garden Homestays" },
      premium: { price: 11900, hotelType: "Udaan Dekeling / Summit Grace / Yashshree" },
      luxury: { price: 19800, hotelType: "The Elgin Heritage / Windamere Hotel Darjeeling" }
    }
  },
  {
    id: "pkg-etripto-5n6d-glamorous-sikkim-darjeeling",
    title: "5 Nights / 6 Days Best of Sikkim & Darjeeling with Summit & Udaan Hotel Stays",
    duration: "5 Nights / 6 Days",
    location: "Gangtok (3N) & Darjeeling (2N) with 3★/4★ Affiliated Chain Stays",
    category: "Sikkim-Darjeeling",
    priceStarting: 19200,
    rating: 5.0,
    reviewsCount: 228,
    heroImage: "/images/darjeeling_toy_train_1785681122611.jpg",
    highlights: [
      "Guaranteed stays at affiliated Summit Hotels & Udaan Resorts",
      "Tsomgo Glacial Lake (12,400 ft) & Nathula Pass Indo-China Border army permit",
      "Gangtok Ropeway, Ban Jhakri Waterfalls & Flower Exhibition Centre",
      "Tiger Hill sunrise over Mt. Kanchenjunga & Batasia Loop Toy Train track",
      "Happy Valley Tea Estate walk & Glenary's Bakery high tea",
      "Dedicated Innova Crysta private transfers & 100% Pure Veg / Jain options"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP / IXB Pickup to Summit / Udaan Gangtok",
        description: "Warm reception at NJP or Bagdogra Airport by private Innova Crysta. Drive along Teesta River to Summit Denzong / Udaan Woodberry Gangtok."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Baba Mandir Excursion (Nathula Pass Optional)",
        description: "High altitude drive to sacred Tsomgo Lake (12,400 ft) and Baba Mandir. Optional permit extension to Nathula Pass border."
      },
      {
        day: 3,
        title: "Gangtok City Sightseeing & Enchey Monastery",
        description: "Visit Ban Jhakri Energy Park, Hanuman Tok, Ganesh Tok, Ropeway ride, and evening stroll at MG Marg pedestrian boulevard."
      },
      {
        day: 4,
        title: "Gangtok to Udaan Dekeling / Summit Grace Darjeeling",
        description: "Drive through pine slopes to Darjeeling. Check-in at Udaan Dekeling Resort or Summit Grace Hotel. Evening walk at Chowrasta."
      },
      {
        day: 5,
        title: "Tiger Hill Kanchenjunga Sunrise & 7-Point Sightseeing",
        description: "4:00 AM Tiger Hill sunrise, Batasia Loop, Ghoom Monastery, Padmaja Naidu Himalayan Zoo, HMI, and Tea Estate walk."
      },
      {
        day: 6,
        title: "Gourmet Breakfast & Drop to NJP Station / Bagdogra Airport",
        description: "Buffet breakfast at resort, gift box of fresh Darjeeling tea, and private drop to NJP Railway Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private Toyota Innova Crysta / Xylo vehicle with personal chauffeur",
      "5 Nights guaranteed stay in Summit Hotels / Udaan Resorts with Breakfast & Dinner",
      "Tsomgo Lake & Nathula Pass army permit coordination",
      "Pure Veg / Jain / Non-Veg meal plans",
      "Driver allowance, tolls, parking, and 24/7 travel desk"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 16200, hotelType: "Rufina / Deluxe View Hotels" },
      premium: { price: 19200, hotelType: "Summit Hotels & Udaan Resorts Guaranteed" },
      luxury: { price: 29500, hotelType: "Mayfair Spa Resort Gangtok & Elgin Darjeeling" }
    }
  },
  {
    id: "pkg-10n11d-grand-himalayan-circuit",
    title: "10 Nights / 11 Days Grand Sikkim, Old Silk Route, North Sikkim & Darjeeling Grand Circuit",
    duration: "10 Nights / 11 Days",
    location: "Sillery/Reshi (1N), Zuluk (1N), Gangtok (2N), Lachen (1N), Lachung (2N), Pelling (2N) & Darjeeling (1N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 38500,
    rating: 5.0,
    reviewsCount: 168,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "Epic 10-Night Grand Himalayan Odyssey across East, West, South, North Sikkim & Darjeeling",
      "Old Silk Route Zuluk zig-zag bends (32 hairpin curves) & Thambi Viewpoint sunrise",
      "Sacred Gurudongmar Lake (17,800 ft), Yumthang Valley & snowbound Zero Point (15,300 ft)",
      "Mandatory 2-Night Lachung stay for optimal high-altitude acclimatization & scenic pacing",
      "Pelling Glass Skywalk (7,200 ft), Chenrezig Statue & Rabdentse Ancient Palace Ruins",
      "Darjeeling Tiger Hill Kanchenjunga sunrise, Batasia Loop Toy Train & Tea Estate walks",
      "Dedicated Toyota Innova Crysta / 4WD SUV with 24/7 Gangtok ground operations support"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport (IXB) Pickup to Sillery Gaon / Reshi Khola",
        description: "Arrival reception by private chauffeur in Innova Crysta. Scenic drive to the peaceful eco-village of Sillery Gaon or Reshi Khola riverbank homestay. Evening bonfire by the stream."
      },
      {
        day: 2,
        title: "Sillery Gaon to Historic Zuluk via Rongli Silk Route Permit Clearance",
        description: "Process Silk Route Inner Line Permits at Rongli SDPO office. Visit Kuekhola Waterfalls, Lingtam, and Padamchen. Check-in at traditional mountain homestay in Zuluk (9,400 ft)."
      },
      {
        day: 3,
        title: "Zuluk Sunrise at Thambi Viewpoint to Nathang Valley, Kupup Lake & Gangtok",
        description: "4:30 AM Kanchenjunga sunrise over the 32 hairpin bends from Thambi Viewpoint. Visit Nathang Valley (13,500 ft), Old Baba Mandir, Kupup Elephant Lake (13,900 ft), and Tukla Valley. Drop to Gangtok hotel."
      },
      {
        day: 4,
        title: "Tsomgo Glacial Lake (12,400 ft) & Baba Mandir Excursion (Nathula Optional)",
        description: "Day excursion to holy Tsomgo Lake surrounded by alpine peaks and New Baba Harbhajan Singh Memorial shrine. Optional extension to Nathula Pass Indo-China border subject to lottery pass."
      },
      {
        day: 5,
        title: "Gangtok to Lachen Village (North Sikkim 9,000 ft) via Waterfalls",
        description: "Drive north along the Teesta River gorge via Seven Sisters Waterfalls, Mangan viewpoint, and Chungthang river confluence. Evening arrival at tranquil Lachen village."
      },
      {
        day: 6,
        title: "Sacred Gurudongmar Lake (17,800 ft) Excursion & Transfer to Lachung [Lachung Night 1]",
        description: "4:00 AM journey across cold alpine Tibetan plateau to sacred Gurudongmar Lake (17,800 ft). Return to Lachen for lunch and drive through pine valleys to Lachung village for first night stay."
      },
      {
        day: 7,
        title: "Yumthang Valley of Flowers, Zero Point (15,300 ft) & Katao Peak [Lachung Night 2]",
        description: "Excursion to vibrant Yumthang Valley (11,800 ft) and snow-capped Zero Point (15,300 ft). Detour to Mount Katao snow slopes. Second night in Lachung ensures leisurely mountain relaxation."
      },
      {
        day: 8,
        title: "Lachung to Pelling via Temi Tea Garden & Ravangla Buddha Park",
        description: "Drive from North Sikkim to West Sikkim. Stop at Temi Tea Estate (Sikkim's only tea garden) for organic tea tasting and visit majestic Ravangla Buddha Park with 130ft golden statue. Check-in at Pelling."
      },
      {
        day: 9,
        title: "Pelling Glass Skywalk, Rabdentse Palace Ruins & Khecheopalri Wish Lake",
        description: "Walk across India's 1st Glass Skywalk facing Chenrezig Colossus. Visit ancient Rabdentse Palace Ruins, sacred Pemayangtse Monastery, and tranquil Khecheopalri Wish-Fulfilling Lake."
      },
      {
        day: 10,
        title: "Pelling to Darjeeling Queen of Hills via Lamahatta Eco Pine Park",
        description: "Picturesque drive to Darjeeling via sacred prayer pine grove at Lamahatta Eco Park. Check-in at Darjeeling hotel with evening walk at heritage Chowrasta Mall Road and Glenary's Bakery."
      },
      {
        day: 11,
        title: "Tiger Hill Kanchenjunga Sunrise & Private Transfer to NJP Station / Bagdogra Airport",
        description: "4:00 AM golden sunrise at Tiger Hill overlooking Mt. Kanchenjunga (8,586 m). Visit Batasia Loop and Ghoom Monastery. Breakfast at hotel followed by private chauffeur drop at NJP or Bagdogra Airport."
      }
    ],
    included: [
      "Complete North Sikkim Restricted Area Permit (PAP), Rongli Silk Route Permit & Tsomgo Army Permits",
      "Private Toyota Innova Crysta / 4WD SUV throughout with experienced hill driver",
      "10 Nights hotel accommodation in 3★ boutique properties & authentic village homestays",
      "Daily Breakfast & Gourmet Dinners (MAP Plan) with hot local meals in North Sikkim (AP Plan)",
      "All fuel, toll tax, Sikkim entry permits, parking charges, and 24/7 dedicated travel desk"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 34500, hotelType: "Comfort View Lodges & Cozy Silk Route Homestays" },
      premium: { price: 38500, hotelType: "Summit / Udaan / Rufina 3★ Deluxe Hotels & Premium Homestays" },
      luxury: { price: 58000, hotelType: "Mayfair Spa Resort Gangtok, Elgin Darjeeling & Luxury Chalets" }
    }
  },
  {
    id: "pkg-11n12d-ultimate-sikkim-darjeeling-kalimpong-unexplored",
    title: "11 Nights / 12 Days Ultimate Sikkim, Darjeeling, Kalimpong & Dooars Foothills Odyssey",
    duration: "11 Nights / 12 Days",
    location: "Kalimpong (1N), Sillery (1N), Zuluk (1N), Gangtok (2N), Lachen (1N), Lachung (2N), Pelling (2N) & Darjeeling (1N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 43500,
    rating: 5.0,
    reviewsCount: 124,
    heroImage: "/images/agency_poster_dark_1785772843834.jpg",
    highlights: [
      "Comprehensive 12-day Himalayan mega expedition across Kalimpong, Silk Route, North Sikkim, West Sikkim & Darjeeling",
      "Kalimpong Deolo Hill, Pine View Cactus Nursery & colonial Morgan House heritage tour",
      "Zuluk Silk Route 32 hairpin curves, Nathang Valley, Kupup Lake & Elephant Lake",
      "Sacred Gurudongmar Lake (17,800 ft), Yumthang Valley & Zero Point snow peak",
      "Pelling Glass Skywalk, Pemayangtse Monastery & Khecheopalri Sacred Lake",
      "Darjeeling Tiger Hill Kanchenjunga sunrise, Batasia Loop & Glenary's high tea",
      "Exclusive private Innova Crysta with seasoned hill chauffeur & all PAP permits pre-cleared"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport Pickup to Kalimpong",
        description: "Welcome pickup and drive to Kalimpong hill station. Visit Deolo Hill view park, Pine View Cactus Nursery, and colonial Morgan House. Evening leisure at Kalimpong market."
      },
      {
        day: 2,
        title: "Kalimpong to Sillery Gaon & Reshi Khola River Retreat",
        description: "Drive through cinchona plantations to peaceful eco-hamlet Sillery Gaon. Short hike to Ramitey Viewpoint for panoramic 14-bend view of Teesta River. Bonfire by riverbank."
      },
      {
        day: 3,
        title: "Sillery Gaon to Historic Zuluk via Rongli Silk Route Permit Office",
        description: "Process Inner Line Permits at Rongli. Pass Kuekhola Falls and Padamchen pine ridges to high-altitude hamlet Zuluk (9,400 ft)."
      },
      {
        day: 4,
        title: "Zuluk Sunrise to Nathang Valley, Kupup Lake & Drive to Gangtok",
        description: "Witness dawn over Mt. Kanchenjunga from Thambi Viewpoint. Cross Nathang Valley, Tukla War Memorial, Kupup Elephant Lake, and arrive at Gangtok for evening walk at MG Marg."
      },
      {
        day: 5,
        title: "Tsomgo Alpine Glacial Lake & Baba Harbhajan Mandir (Nathula Pass Optional)",
        description: "Day excursion up to 12,400 ft to holy Tsomgo Lake and Baba Mandir shrine. Optional visit to Indo-China border at Nathula Pass."
      },
      {
        day: 6,
        title: "Gangtok to Lachen Village (North Sikkim 9,000 ft) via Waterfalls",
        description: "Drive north along mountain cascades and Teesta River gorge via Seven Sisters Falls and Chungthang confluence to picturesque Lachen."
      },
      {
        day: 7,
        title: "Gurudongmar Sacred Lake (17,800 ft) & Transfer to Lachung [Lachung Night 1]",
        description: "Early morning expedition to sacred Gurudongmar Lake near Tibet border. Return for hot lunch and scenic transfer to Lachung village for first night stay."
      },
      {
        day: 8,
        title: "Yumthang Valley of Flowers & Zero Point Snowfield (15,300 ft) [Lachung Night 2]",
        description: "Explore blooming Yumthang Valley and snow-laden Zero Point (Yumesamdong). Hot tea by the river and leisurely relaxation in Lachung."
      },
      {
        day: 9,
        title: "Lachung to Pelling via Temi Tea Garden & Ravangla Buddha Park",
        description: "Drive through South Sikkim. Walk through Temi organic tea gardens and visit 130ft golden Buddha statue in Ravangla. Check-in at Pelling hotel."
      },
      {
        day: 10,
        title: "Pelling Glass Skywalk & West Sikkim Royal Heritage Exploration",
        description: "Walk the Glass Skywalk, explore 17th-century Rabdentse Palace Ruins, Pemayangtse Monastery, and wish-fulfilling Khecheopalri Lake."
      },
      {
        day: 11,
        title: "Pelling to Darjeeling via Mirik Lake Boating & Pashupati Nepal Border",
        description: "Scenic transfer to Darjeeling via Mirik Lake. Enjoy couple boating on Sumendu Lake and shopping at Pashupati Nepal border market."
      },
      {
        day: 12,
        title: "Tiger Hill Sunrise & Drop to NJP Railway Station / Bagdogra Airport",
        description: "4:00 AM Kanchenjunga sunrise from Tiger Hill, Batasia Loop Toy Train track, followed by hearty breakfast and private drop to NJP or IXB Airport."
      }
    ],
    included: [
      "All North Sikkim Protected Area Permits (PAP), Silk Route ILP & Tsomgo Army Permits",
      "Private Toyota Innova Crysta SUV with experienced mountain chauffeur",
      "11 Nights accommodation in 3★ boutique hotels & handpicked heritage homestays",
      "Daily Breakfast & Dinners (MAP Plan), plus all meals during North Sikkim stays (AP Plan)",
      "All state entry taxes, toll fees, driver allowances, parking, and 24/7 concierge"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 38500, hotelType: "Comfort Deluxe Homestays & Standard Mountain Hotels" },
      premium: { price: 43500, hotelType: "Summit Hotels, Udaan Resorts & Rufina Properties" },
      luxury: { price: 64000, hotelType: "Mayfair Resorts Gangtok & Darjeeling, Elgin Heritage Hotels" }
    }
  },
  {
    id: "pkg-12n13d-complete-sikkim-bhutan-international-cross-border",
    title: "12 Nights / 13 Days Complete Sikkim & Kingdom of Bhutan International Cross-Border Tour",
    duration: "12 Nights / 13 Days",
    location: "Gangtok (2N), Lachung (2N), Darjeeling (2N), Phuentsholing (1N), Thimphu (2N) & Paro (3N)",
    category: "Bhutan",
    priceStarting: 56500,
    rating: 5.0,
    reviewsCount: 98,
    heroImage: "/images/bhutan_tigers_nest_1785680619985.jpg",
    highlights: [
      "Extraordinary 13-day international cross-border expedition combining Sikkim's peaks with the Kingdom of Bhutan",
      "Hike to the legendary Tiger's Nest Monastery (Paro Taktsang, 10,240 ft) perched on a cliff",
      "Thimphu Buddha Dordenma (169ft bronze colossus), Tashichho Dzong & Motithang Takin Preserve",
      "Yumthang Valley of Flowers & Zero Point (15,300 ft) North Sikkim with mandatory 2-night Lachung stay",
      "Tsomgo Glacial Lake & Darjeeling Tiger Hill Kanchenjunga golden sunrise",
      "Complete Bhutan Entry Visa / Permit & Sikkim Restricted Area Permits pre-coordinated",
      "End-to-end private vehicle transfers with certified Bhutanese English-speaking tour guide"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport Pickup to Gangtok",
        description: "Arrival reception by private Innova Crysta chauffeur. Scenic drive along Teesta River to Gangtok. Evening leisure walk on MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Glacial Lake (12,400 ft) & Baba Mandir Excursion",
        description: "Day trip to sacred Tsomgo Lake and Baba Harbhajan Mandir shrine. Optional Nathula Pass border permit extension."
      },
      {
        day: 3,
        title: "Gangtok to Lachung Village (North Sikkim) via Waterfalls [Lachung Night 1]",
        description: "Drive north past Seven Sisters Falls and Chungthang river confluence to Lachung village for first night stay."
      },
      {
        day: 4,
        title: "Yumthang Valley, Zero Point (15,300 ft) & Katao Peak [Lachung Night 2]",
        description: "Full day excursion to Yumthang Valley of Flowers, hot springs, and snowbound Zero Point. Second night relaxation in Lachung."
      },
      {
        day: 5,
        title: "Lachung to Darjeeling Queen of Hills via Teesta Valley",
        description: "Scenic drive from Lachung down to Darjeeling. Check-in at hotel with evening stroll at Chowrasta and Glenary's Bakery."
      },
      {
        day: 6,
        title: "Tiger Hill Sunrise & Darjeeling City Sightseeing",
        description: "4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop Toy Train track, Padmaja Naidu Himalayan Zoo, and Happy Valley Tea Estate."
      },
      {
        day: 7,
        title: "Darjeeling to Phuentsholing (Bhutan Gateway Border Town)",
        description: "Scenic drive down through tea hills to the Indo-Bhutan border town of Phuentsholing. Complete Bhutan entry immigration permits."
      },
      {
        day: 8,
        title: "Phuentsholing to Thimphu (Capital of Bhutan 7,600 ft)",
        description: "Drive past lush sub-tropical Himalayan valleys and waterfalls to Thimphu. Visit Tashichho Dzong fortress and local handicraft markets."
      },
      {
        day: 9,
        title: "Thimphu Full-Day Cultural Sightseeing & Buddha Dordenma",
        description: "Visit giant 169ft Buddha Dordenma statue overlooking valley, National Memorial Chorten, Motithang Takin Preserve, and Simply Bhutan museum."
      },
      {
        day: 10,
        title: "Thimphu to Paro Valley via Dochula Pass (10,170 ft)",
        description: "Scenic drive to Paro via Dochula Pass with 108 memorial chortens and views of snow peaks. Visit Rinpung Dzong and Kyichu Lhakhang."
      },
      {
        day: 11,
        title: "Trek to Iconic Tiger's Nest Monastery (Paro Taktsang 10,240 ft)",
        description: "Iconic pilgrimage trek through pine forests to Tiger's Nest Monastery clinging to a sheer cliff. Evening traditional Bhutanese hot stone bath."
      },
      {
        day: 12,
        title: "Paro Chele La Pass (13,088 ft) & Haa Valley Excursion",
        description: "Drive to Chele La Pass, Bhutan's highest motorable road pass with views of Mt. Jomolhari. Explore pristine Haa Valley and return to Paro."
      },
      {
        day: 13,
        title: "Paro International Airport (PBH) Departure / Transfer to Bagdogra / NJP",
        description: "Farewell breakfast and private transfer to Paro Airport (PBH) for flight, or overland transfer back to NJP Station / Bagdogra Airport."
      }
    ],
    included: [
      "Bhutan Entry Permits, Sustainable Development Fee (SDF) assistance & Sikkim Restricted Area Permits",
      "Licensed English-speaking Bhutanese Tour Guide throughout Bhutan segment",
      "Private Toyota Innova Crysta / Hyundai H1 luxury vehicle throughout India and Bhutan",
      "12 Nights accommodation in 3★/4★ boutique hotels & mountain lodges with daily breakfast & dinner",
      "All entrance fees to Bhutanese Dzongs, monasteries, museums, and permit clearance fees"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 49500, hotelType: "Comfort 3★ Hotels in India & Standard Bhutanese Lodges" },
      premium: { price: 56500, hotelType: "Summit/Udaan in India & Certified 3★/4★ Bhutanese Resorts (Hotel Druk, Terma Linca)" },
      luxury: { price: 89000, hotelType: "Mayfair Resorts & Luxury 5★ Bhutan Properties (Le Méridien, Zhiwa Ling)" }
    }
  },
  {
    id: "pkg-14n15d-grand-eastern-himalayan-epic-odyssey",
    title: "14 Nights / 15 Days Grand Eastern Himalayan Epic Odyssey: Complete Sikkim, Darjeeling, Bhutan Border & North East Heritage",
    duration: "14 Nights / 15 Days",
    location: "Kalimpong (1N), Sillery (1N), Zuluk (1N), Gangtok (3N), Lachen (1N), Lachung (2N), Pelling (2N), Darjeeling (2N) & Mirik (1N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 59800,
    rating: 5.0,
    reviewsCount: 86,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "The ultimate 15-day flagship Eastern Himalayan expedition covering every iconic destination and hidden gem",
      "Old Silk Route Zuluk zig-zag hairpin bends, Thambi Viewpoint sunrise, Nathang Valley & Kupup Elephant Lake",
      "Sacred Gurudongmar Lake (17,800 ft), Yumthang Valley of Flowers, Zero Point (15,300 ft) & Katao Peak",
      "Mandatory 2-Night Lachung stay for optimal altitude acclimatization and deep village immersion",
      "Tsomgo Glacial Lake (12,400 ft), Baba Mandir & Nathula Pass Indo-China Border army permits",
      "Pelling Glass Skywalk (7,200 ft), Chenrezig Statue, Rabdentse Palace Ruins & Khecheopalri Wish Lake",
      "Darjeeling Tiger Hill Kanchenjunga sunrise, Batasia Loop Toy Train ride & Happy Valley Tea Estate tour",
      "Mirik Lake pine boating, Pashupati Nepal border market & Kalimpong colonial heritage",
      "Dedicated Toyota Innova Crysta throughout with 24/7 Gangtok HQ operations manager & VIP hospitality"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP Station / Bagdogra Airport Pickup to Kalimpong Hill Station",
        description: "Chauffeur reception by private Innova Crysta. Scenic drive along Teesta River to Kalimpong. Visit Deolo Hill Viewpoint, Pine View Cactus Nursery, and colonial Morgan House."
      },
      {
        day: 2,
        title: "Kalimpong to Sillery Gaon & Reshi Khola Riverbank Eco-Resort",
        description: "Drive into pine-fringed Sillery Gaon. Hike to Ramitey Viewpoint for panoramic 14-bend view of Teesta River. Evening bonfire by the stream at Reshi Khola."
      },
      {
        day: 3,
        title: "Sillery to Historic Zuluk via Rongli Silk Route Permit Office",
        description: "Process Silk Route Inner Line Permits at Rongli. Pass Kuekhola Waterfalls, Lingtam, and Padamchen pine ridges to high-altitude hamlet Zuluk (9,400 ft)."
      },
      {
        day: 4,
        title: "Zuluk Sunrise to Nathang Valley, Kupup Lake & Gangtok",
        description: "4:30 AM Kanchenjunga sunrise over the 32 hairpin curves from Thambi Viewpoint. Visit Nathang Valley (13,500 ft), Old Baba Mandir, Kupup Elephant Lake (13,900 ft), and Tukla Valley. Check-in at Gangtok hotel."
      },
      {
        day: 5,
        title: "High-Altitude Tsomgo Glacial Lake & Baba Mandir (Nathula Pass Optional)",
        description: "Day trip to sacred Tsomgo Lake (12,400 ft) and Baba Harbhajan Singh Memorial shrine. Optional Indo-China border Nathula Pass lottery visit."
      },
      {
        day: 6,
        title: "Gangtok City Sightseeing & Ropeway Cable Car Ride",
        description: "Visit Ban Jhakri Energy Park, Enchey Monastery, Flower Exhibition Centre, Do Drul Chorten Stupa, and Namgyal Institute of Tibetology. Evening stroll at MG Marg."
      },
      {
        day: 7,
        title: "Gangtok to Lachen Village (North Sikkim 9,000 ft) via Waterfalls",
        description: "Drive north along the Teesta River gorge via Seven Sisters Falls, Mangan viewpoint, and Chungthang river confluence to peaceful Lachen village."
      },
      {
        day: 8,
        title: "Sacred Gurudongmar Lake (17,800 ft) & Transfer to Lachung [Lachung Night 1]",
        description: "4:00 AM trip across cold alpine plateau to sacred Gurudongmar Lake near Tibet border. Return for hot lunch and drive to Lachung village for first night stay."
      },
      {
        day: 9,
        title: "Yumthang Valley of Flowers, Zero Point (15,300 ft) & Katao Peak [Lachung Night 2]",
        description: "Explore blooming Yumthang Valley and snowfield Zero Point (Yumesamdong). Hot local tea by the river and second night in Lachung."
      },
      {
        day: 10,
        title: "Lachung to Pelling via Temi Tea Garden & Ravangla Buddha Park",
        description: "Drive through South Sikkim. Stroll through Temi organic tea gardens and visit the 130ft golden Buddha statue in Ravangla. Check-in at Pelling."
      },
      {
        day: 11,
        title: "Pelling Glass Skywalk, Rabdentse Palace Ruins & Khecheopalri Sacred Lake",
        description: "Walk the Glass Skywalk facing Chenrezig Colossus, visit ancient Rabdentse Palace Ruins, Pemayangtse Monastery, and wish-fulfilling Khecheopalri Lake."
      },
      {
        day: 12,
        title: "Pelling to Darjeeling Queen of Hills via Lamahatta Eco Pine Grove",
        description: "Picturesque drive to Darjeeling via sacred prayer pine grove at Lamahatta Eco Park. Check-in at Darjeeling hotel with evening stroll at Chowrasta and Glenary's."
      },
      {
        day: 13,
        title: "Tiger Hill Kanchenjunga Sunrise & Darjeeling City Heritage Sightseeing",
        description: "4:00 AM sunrise at Tiger Hill, Batasia Loop Toy Train track, Ghoom Monastery, Padmaja Naidu Himalayan Zoo, HMI, and Happy Valley Tea Estate tour."
      },
      {
        day: 14,
        title: "Darjeeling to Mirik Lake via Tea Gardens & Pashupati Nepal Border",
        description: "Scenic transfer to Mirik Lake. Enjoy serene boating on Sumendu Lake surrounded by cryptomeria pines and shopping at Pashupati Nepal border market. Night stay in Mirik."
      },
      {
        day: 15,
        title: "Mirik Sunrise, Gourmet Breakfast & Private Drop to NJP Station / Bagdogra Airport",
        description: "Sunrise over pine valleys, farewell buffet breakfast, fresh Darjeeling tea souvenir gift, and private chauffeur transfer down to NJP Station or Bagdogra Airport (IXB)."
      }
    ],
    included: [
      "All North Sikkim Protected Area Permits (PAP), Silk Route ILP, Tsomgo Army Permits & Nathula coordination",
      "Executive Toyota Innova Crysta SUV throughout with experienced hill chauffeur",
      "14 Nights accommodation in 3★/4★ boutique hotels & handpicked heritage homestays",
      "Daily Breakfast & Gourmet Dinners (MAP Plan), plus all meals during North Sikkim stays (AP Plan)",
      "Mirik Lake boating tickets, tea garden tasting passes, all tolls, parking, and 24/7 dedicated trip manager"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 51000, hotelType: "Comfort Deluxe Homestays & Standard Mountain Hotels" },
      premium: { price: 59800, hotelType: "Summit Hotels, Udaan Resorts & Rufina Luxury Properties" },
      luxury: { price: 88000, hotelType: "Mayfair Spa Resorts Gangtok & Darjeeling, Elgin Heritage Hotels" }
    }
  },
  ...ADDITIONAL_PACKAGES
];

export interface HotelPhotoItem {
  id?: string;
  url: string;
  category: 'rooms' | 'dining' | 'exterior' | 'views' | 'amenities';
  title: string;
  caption?: string;
  tag?: string;
}

export interface HotelChainPartner {
  id: string;
  name: string;
  tagline: string;
  starCategory: string;
  badge: string;
  logoText: string;
  coverImage: string;
  galleryPhotos?: HotelPhotoItem[];
  locations: string[];
  featuredProperties: string[];
  keyPerks: string[];
  description: string;
  websiteUrl?: string;
  categories: ('luxury' | 'budget' | 'jain')[];
  priceRangeText?: string;
  isJainCertified?: boolean;
  distanceToCenter?: string;
  guestRating?: number;
  reviewCount?: number;
  ratingBreakdown?: {
    cleanliness: number;
    location: number;
    service: number;
    food: number;
    value: number;
  };
  roomAmenities?: string[];
  roomTypesAvailable?: {
    name: string;
    description: string;
    bed: string;
    view: string;
    approxPrice: string;
  }[];
  verifiedGuestReviews?: {
    author: string;
    city: string;
    rating: number;
    comment: string;
    stayType: string;
    date: string;
  }[];
}

export const AFFILIATED_HOTEL_CHAINS: HotelChainPartner[] = [
  {
    id: "partner-jain-group",
    name: "Jain Group of Hotels & Resorts",
    tagline: "100% Pure Vegetarian Hospitality & Luxury Stays in Sikkim & Darjeeling",
    starCategory: "3★ & 4★ Luxury Pure Veg Stays",
    badge: "Pure Veg & Jain Special Partner",
    logoText: "JAIN GROUP",
    coverImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    locations: ["Gangtok", "Darjeeling", "Siliguri", "Pelling", "Kalimpong"],
    categories: ["jain", "budget"],
    priceRangeText: "From ₹2,900 / night",
    isJainCertified: true,
    distanceToCenter: "350m from MG Marg Gangtok · 400m from Chowrasta Darjeeling",
    guestRating: 4.8,
    reviewCount: 540,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 4.8,
      service: 4.9,
      food: 5.0,
      value: 4.8
    },
    roomAmenities: [
      "100% Dedicated Pure Veg & Jain Kitchen",
      "Kanchenjunga & Valley View Windows",
      "Complimentary High-Speed Wi-Fi",
      "24/7 Hot Water Geysers",
      "Electric Kettle & Herbal Teas",
      "Room Heating / Blowers Provided",
      "Daily Housekeeping & Sanitization",
      "Power Backup Generator"
    ],
    roomTypesAvailable: [
      { name: "Deluxe Valley View Room", description: "Bright room with large glass windows overlooking Gangtok valley", bed: "King / Twin Bed", view: "Valley & Mist View", approxPrice: "₹2,900 / night" },
      { name: "Super Deluxe Panoramic Room", description: "Spacious wooden-panelled room with dedicated seating area", bed: "King Bed", view: "Direct Kanchenjunga View", approxPrice: "₹3,700 / night" },
      { name: "Family Four-Bed Suite", description: "Interconnected suite for families with 2 bathrooms and private lobby", bed: "2 King Beds", view: "Mountain Panorama", approxPrice: "₹5,400 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Anand J. & Family", city: "Ahmedabad, Gujarat", rating: 5, comment: "Finding 100% authentic Jain food without onion or garlic in Sikkim was so easy with OffbeatDestination's tie-up with Jain Group. Piping hot breakfast and dinner every single day!", stayType: "Family Vacation", date: "May 2026" },
      { author: "Pooja Mehta", city: "Mumbai", rating: 5, comment: "Royal Residency Gangtok had the cleanest rooms and beautiful valley view. Walking distance to MG Marg made our evenings wonderful.", stayType: "Couples Trip", date: "April 2026" }
    ],
    featuredProperties: [
      "Hotel Jain Group Royal Residency (Gangtok)",
      "Jain Group Hotel Mount Conifer (Darjeeling)",
      "Jain Group Hotel Seven Seas (Siliguri)",
      "Jain Group Grand Heritage (Pelling)",
      "Jain Group Valley View Resort (Gangtok)"
    ],
    keyPerks: [
      "100% Pure Veg & Strict Jain Food (No Onion No Garlic Kitchen Available)",
      "Prime Mall Road & Mountain Valley View Locations",
      "Dedicated Jain Meal Coordination for Families & Groups",
      "Complimentary High-Speed Wi-Fi & Room Heating"
    ],
    description: "Pioneers in 100% pure vegetarian hospitality across East India. Offering pristine accommodations with dedicated Jain dining facilities, spacious mountain-facing rooms, and warm Sikkimese service."
  },
  {
    id: "partner-crestora",
    name: "Crestora Hotels & Resorts",
    tagline: "Contemporary Alpine Boutique Luxury & Serene Mountain Panoramas",
    starCategory: "3★ & 4★ Premium Lifestyle Stays",
    badge: "Official Chain Partner",
    logoText: "CRESTORA",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    locations: ["Gangtok", "Darjeeling", "Pelling", "Kalimpong"],
    categories: ["budget", "luxury", "jain"],
    priceRangeText: "From ₹3,500 / night",
    distanceToCenter: "400m from MG Marg Gangtok · 500m from Darjeeling Mall Road",
    guestRating: 4.8,
    reviewCount: 380,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 4.8,
      service: 4.9,
      food: 4.8,
      value: 4.7
    },
    roomAmenities: [
      "Private Mountain View Balconies",
      "Centralized Heating & Electric Blankets",
      "Optical Fiber Wi-Fi (100 Mbps)",
      "Multi-Cuisine & Pure Veg / Jain Dining",
      "Tea/Coffee Maker with Premium Tea Bags",
      "24/7 Hot Water Shower & Premium Toiletries",
      "Elevator Access to All Floors",
      "Full Power Backup (Generator)"
    ],
    roomTypesAvailable: [
      { name: "Crestora Alpine Deluxe", description: "Modern alpine themed room with pine woodwork and valley balcony", bed: "Queen / King Bed", view: "Pine Valley View", approxPrice: "₹3,500 / night" },
      { name: "Crestora Kanchenjunga Executive Suite", description: "Luxury suite with floor-to-ceiling glass panoramic mountain view", bed: "King Bed", view: "Unobstructed Mt. Kanchenjunga", approxPrice: "₹4,900 / night" },
      { name: "Crestora Royal Family Suite", description: "Spacious duplex suite designed for comfortable family stays", bed: "2 King Beds", view: "360° Valley & Snow Peak", approxPrice: "₹6,800 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Vikram & Shilpa Sengupta", city: "Kolkata", rating: 5, comment: "Crestora Grand Gangtok exceeded all expectations! The view of Mt Kanchenjunga right from our bed at sunrise was magical. Staff was remarkably polite and attentive.", stayType: "Honeymoon", date: "June 2026" },
      { author: "Rajesh Kulkarni", city: "Pune", rating: 5, comment: "Stayed at Crestora Pineview in Darjeeling and Crestora Valley in Pelling. Excellent heating, delicious food, and seamless check-in booked through OffbeatDestination.", stayType: "Family Trip", date: "May 2026" }
    ],
    featuredProperties: [
      "Crestora Grand Hotel & Spa (Gangtok)",
      "Crestora Pineview Manor (Darjeeling)",
      "Crestora Valley Retreat (Pelling)",
      "Crestora Ridge & Cloud Spa (Kalimpong)"
    ],
    keyPerks: [
      "Guaranteed Kanchenjunga Frontal View Rooms",
      "Rooftop Sunset Cafe & Bonfire Terrace",
      "Pure Vegetarian & Jain Food Prepared Separately",
      "Complimentary Early Check-in & Luggage Storage"
    ],
    description: "Crestora Hotels & Resorts combines modern minimalist alpine architecture with heartfelt Himalayan hospitality. Guests enjoy floor-to-ceiling mountain views, cozy heated suites, and exquisite multi-cuisine & pure vegetarian dining."
  },
  {
    id: "partner-rufina",
    name: "Rufina Hotels & Resorts",
    tagline: "Comfortable, Trustworthy & Economical Hill Station Stays",
    starCategory: "Deluxe & 3★ Comfort Hotels",
    badge: "Official Value Partner",
    logoText: "RUFINA",
    coverImage: "/images/yumthang_zero_point_1785680592273.jpg",
    locations: ["Gangtok", "Darjeeling", "Pelling", "Lachung", "Lachen"],
    categories: ["budget"],
    priceRangeText: "From ₹2,400 / night",
    distanceToCenter: "200m from Lachung Village · 500m from MG Marg Gangtok",
    guestRating: 4.7,
    reviewCount: 620,
    ratingBreakdown: {
      cleanliness: 4.7,
      location: 4.8,
      service: 4.8,
      food: 4.6,
      value: 4.9
    },
    roomAmenities: [
      "24/7 Running Hot Water Geysers",
      "Heavy Woolen Blankets & Room Heaters",
      "Continuous North Sikkim Power Generator Backup",
      "Homestyle Buffet Meals (Breakfast & Dinner Included)",
      "High-Altitude Oxygen Assistance on Standby",
      "Free In-Room Tea & Coffee Kit",
      "Free Local Sightseeing Guidance"
    ],
    roomTypesAvailable: [
      { name: "Standard Deluxe Room", description: "Cozy wood-panelled room with modern attached bathroom", bed: "Double Bed", view: "Valley / Mountain View", approxPrice: "₹2,400 / night" },
      { name: "Super Deluxe Wooden Suite", description: "Insulated alpine wood suite ideal for winter & North Sikkim", bed: "King Bed", view: "Snow Peak & Waterfall View", approxPrice: "₹3,200 / night" },
      { name: "Triple / Quad Family Room", description: "Spacious group room accommodating 3 to 4 adults comfortably", bed: "1 King + 1 Single Bed", view: "River & Valley Panorama", approxPrice: "₹4,200 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Deepak Sharma", city: "Delhi NCR", rating: 5, comment: "Rufina Lachung Grand was a life saver in North Sikkim! 24/7 electricity and piping hot water even when temperatures dipped below zero. Great North Indian food.", stayType: "Friends Tour", date: "April 2026" },
      { author: "Sourav Banerjee", city: "Kolkata", rating: 5, comment: "Rufina Darjeeling on Mall road is unbeatable for value. Extremely clean bedsheets and helpful staff.", stayType: "Budget Leisure", date: "May 2026" }
    ],
    featuredProperties: [
      "Rufina Lachung Grand (North Sikkim)",
      "Rufina Lachen Glacier Lodge (North Sikkim)",
      "Rufina Gangtok Heritage (Near MG Marg)",
      "Rufina Pelling Mountain View",
      "Rufina Darjeeling Mall Road"
    ],
    keyPerks: [
      "Best Value Budget Deluxe Packages across Sikkim",
      "24/7 Hot Water & Power Backup in North Sikkim",
      "Home-cooked Sikkimese & North Indian AP Meals",
      "Convenient Central Locations near taxi stands & markets"
    ],
    description: "Dependable, comfortable, and highly affordable stays with excellent service and hot meals in high-altitude destinations like Lachung, Lachen, Pelling, and Gangtok."
  },
  {
    id: "partner-summit",
    name: "Summit Hotels & Resorts",
    tagline: "Himalayan Hospitality at its Finest",
    starCategory: "3★ & 4★ Premium View Hotels",
    badge: "Official Chain Partner",
    logoText: "SUMMIT",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    locations: ["Gangtok", "Darjeeling", "Pelling", "Lachung", "Kalimpong"],
    categories: ["budget", "jain"],
    priceRangeText: "From ₹3,400 / night",
    distanceToCenter: "600m from MG Marg Gangtok · 800m from Chowrasta Darjeeling",
    guestRating: 4.8,
    reviewCount: 890,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 4.8,
      service: 4.9,
      food: 4.7,
      value: 4.8
    },
    roomAmenities: [
      "Kanchenjunga Mountain View Windows",
      "In-House Metta Spa & Ayurvedic Therapies",
      "Alpenglow Multi-Cuisine & Pure Veg Dining",
      "High-Speed Free Wi-Fi & Smart TV",
      "Electric Room Heaters & Kettle",
      "24/7 Hot Water & Rain Showers",
      "Elevator & Valet Parking",
      "Doctor on Call & Oxygen Kit"
    ],
    roomTypesAvailable: [
      { name: "Executive Mountain View Room", description: "Elegantly styled room with direct sight of mountain peaks", bed: "King / Twin Bed", view: "Mt. Kanchenjunga", approxPrice: "₹3,400 / night" },
      { name: "Premium Spa Suite", description: "Luxurious suite with private bathtub and balcony overlooking misty pines", bed: "King Bed", view: "Valley & Snow Range", approxPrice: "₹4,800 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Kavita Rao", city: "Bengaluru", rating: 5, comment: "Summit Denzong in Gangtok and Summit Grace in Darjeeling made our anniversary vacation unforgettable. The spa treatment was heavenly!", stayType: "Couples Retreat", date: "May 2026" }
    ],
    featuredProperties: [
      "Summit Denzong Hotel & Spa (Gangtok)",
      "Summit Grace Hotel & Spa (Darjeeling)",
      "Summit Dragon's Delight (Pelling)",
      "Summit Golden Crescent (Gangtok)",
      "Summit Alpine Resort Lachung"
    ],
    keyPerks: [
      "Kanchenjunga Mountain Room View Guarantee",
      "Buffet Breakfast & Multi-Cuisine Dining Included",
      "Heated Rooms & In-House Spa Discounts for Offbeat Guests",
      "Pure Veg & Jain Meals Available On Request"
    ],
    description: "One of the most trusted hotel chains across the Himalayas offering breathtaking mountain views, premium room amenities, and warm Sikkimese hospitality."
  },
  {
    id: "partner-udaan",
    name: "Udaan Hotels & Resorts",
    tagline: "Authentic Himalayan Stays & Spa Resorts",
    starCategory: "3★ & 4★ Deluxe Boutique Hotels",
    badge: "Official Chain Partner",
    logoText: "UDAAN",
    coverImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    locations: ["Darjeeling", "Gangtok", "Pelling", "Siliguri"],
    categories: ["budget", "jain"],
    priceRangeText: "From ₹3,600 / night",
    isJainCertified: true,
    distanceToCenter: "300m from Darjeeling Mall · 700m from MG Marg Gangtok",
    guestRating: 4.8,
    reviewCount: 710,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 4.9,
      service: 4.8,
      food: 4.9,
      value: 4.7
    },
    roomAmenities: [
      "100% Pure Vegetarian Kitchen Option Available",
      "Tea Estate & Valley View Balconies",
      "Centralized Heating / Radiator Blowers",
      "Free High-Speed Wi-Fi & Workspace Desk",
      "Electric Tea Kettle with Darjeeling First Flush",
      "Luxury Bath Amenities & Geysers",
      "Full Power Backup"
    ],
    roomTypesAvailable: [
      { name: "Deluxe Valley Room", description: "Warm wooden interiors with picturesque valley vista", bed: "King Bed", view: "Tea Valley & Pine Slopes", approxPrice: "₹3,600 / night" },
      { name: "Kanchenjunga Panorama Suite", description: "Premier suite with 180-degree unobstructed snow view", bed: "King Bed", view: "Mt. Kanchenjunga", approxPrice: "₹5,200 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Mohit Jain", city: "Jaipur", rating: 5, comment: "Udaan Dekeling in Darjeeling provided spotless rooms and pure vegetarian food without onion/garlic on request. Highly recommend!", stayType: "Family Holiday", date: "April 2026" }
    ],
    featuredProperties: [
      "Udaan Dekeling Resort (Darjeeling)",
      "Udaan Woodberry Residences (Gangtok)",
      "Udaan Clover Hotel & Spa (Pelling)",
      "Udaan Alpine Resort (Gangtok)"
    ],
    keyPerks: [
      "100% Pure Vegetarian Kitchen Option Available",
      "Prime Mall Road & Valley View Locations",
      "Complimentary High-Speed Wi-Fi & Tea Maker",
      "Priority Early Check-In for Offbeat Guests"
    ],
    description: "Renowned for boutique luxury, exquisite dining, and prime hill-station locations with scenic views of Mt. Kanchenjunga."
  },
  {
    id: "partner-rare-himalayas",
    name: "Rare Himalayas Hotels & Resorts",
    tagline: "Bespoke Mountain Heritage & Eco-Luxury Sanctuaries",
    starCategory: "4★ & 5★ Experiential Luxury Stays",
    badge: "Bespoke Heritage Partner",
    logoText: "RARE HIMALAYAS",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    locations: ["Gangtok", "Pelling", "Lachung", "Kalimpong", "Darjeeling"],
    categories: ["luxury", "jain"],
    priceRangeText: "From ₹6,800 / night",
    distanceToCenter: "Exclusive Scenic Enclaves (1.2 km from crowded town centers)",
    guestRating: 4.9,
    reviewCount: 290,
    ratingBreakdown: {
      cleanliness: 5.0,
      location: 4.9,
      service: 5.0,
      food: 4.9,
      value: 4.8
    },
    roomAmenities: [
      "Private Heated Cedar-Wood Suites",
      "100% Organic Farm-to-Table Gourmet Dining",
      "Unobstructed 180° Kanchenjunga Balconies",
      "Stargazing Decks & Bonfire Lawns",
      "Complimentary Himalayan Herbal Tea Tasting",
      "High-Altitude Oxygen & Medical Support",
      "Personalized Butler & Chauffeur Services"
    ],
    roomTypesAvailable: [
      { name: "Mountain Sanctuary Suite", description: "Bespoke suite crafted with local pine and stone, heated floors", bed: "California King Bed", view: "Snow Range & Pine Canopy", approxPrice: "₹6,800 / night" },
      { name: "Royal Kanchenjunga Villa", description: "Private multi-level villa with personal bonfire deck and jacuzzi", bed: "2 King Beds", view: "Unmatched Kanchenjunga Frontal", approxPrice: "₹11,500 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Dr. Alistair & Elena Wright", city: "London, UK", rating: 5, comment: "Rare Himalayas in Pelling and Lachung was the highlight of our Indian trip. Pristine tranquility, heated suites, and breathtaking morning sunrises.", stayType: "International Couple", date: "May 2026" }
    ],
    featuredProperties: [
      "Rare Himalayas Norbu Retreat (Gangtok)",
      "Rare Himalayas Kanchenjunga Estate (Pelling)",
      "Rare Himalayas Alpine Sanctuary (Lachung)",
      "Rare Himalayas Pinecrest Manor (Darjeeling)"
    ],
    keyPerks: [
      "100% Organic Farm-to-Table Dining (Pure Veg & Jain on request)",
      "Unobstructed Private Balconies facing Kanchenjunga range",
      "Curated Local Himalayan Tea Tastings & Forest Walk Excursions",
      "Complimentary High-Altitude Heated Suites & Welcome Mountain Cider"
    ],
    description: "Renowned for intimate eco-luxury and soul-stirring Himalayan architecture, Rare Himalayas offers boutique sanctuaries blending indigenous Sikkimese woodwork with bespoke 5-star mountain comforts."
  },
  {
    id: "partner-trickocity",
    name: "Trickocity Hotels & Resorts",
    tagline: "Vibrant Experiential Stays & Alpine Comfort",
    starCategory: "3★ & 4★ Boutique Lifestyle Hotels",
    badge: "Official Lifestyle Partner",
    logoText: "TRICKOCITY",
    coverImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    locations: ["Gangtok", "Darjeeling", "Pelling", "Lachung"],
    categories: ["budget"],
    priceRangeText: "From ₹3,200 / night",
    distanceToCenter: "Steps from MG Marg Promenade · 250m from Darjeeling Mall",
    guestRating: 4.8,
    reviewCount: 410,
    ratingBreakdown: {
      cleanliness: 4.8,
      location: 5.0,
      service: 4.8,
      food: 4.7,
      value: 4.9
    },
    roomAmenities: [
      "Steps Away from Shopping & Cafes",
      "Rooftop Sunset Lounge & Coffee Bar",
      "24/7 High-Pressure Hot Water Geyser",
      "High-Speed Wi-Fi for Remote Working",
      "Smart TV with Netflix / Prime",
      "Daily Buffet Breakfast & Dinner"
    ],
    roomTypesAvailable: [
      { name: "Urban Deluxe Room", description: "Trendy modern room with ambient lighting and city/valley view", bed: "Queen Bed", view: "City & Valley Lights", approxPrice: "₹3,200 / night" },
      { name: "Alpine Skyline Suite", description: "Upper-floor room with panoramic balcony and seating lounge", bed: "King Bed", view: "Snow Mountains & Town", approxPrice: "₹4,400 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Aditya Roy", city: "Mumbai", rating: 5, comment: "Trickocity Grand near MG Marg was incredibly convenient. We could walk in and out of the market whenever we wanted. Rooms were warm and clean.", stayType: "Solo & Friends", date: "April 2026" }
    ],
    featuredProperties: [
      "Trickocity Grand MG Marg (Gangtok)",
      "Trickocity Highpoint Retreat & Rooftop Lounge (Darjeeling)",
      "Trickocity Alpine Heights (Pelling)",
      "Trickocity Snowline Lodge (Lachung)"
    ],
    keyPerks: [
      "Central Prime Locations steps from MG Marg & Mall Road",
      "Rooftop Panoramic Mountain View Cafes & Bonfire Sessions",
      "Dedicated Travel Concierge & Zero Point Permit Desk",
      "Piping Hot 24/7 Geyser Water & High-Speed Optical Wi-Fi"
    ],
    description: "Modern, vibrant, and traveler-centric boutique hotels designed for families, couples, and groups seeking stylish comfort, mountain view terraces, and top-tier hill hospitality."
  },
  {
    id: "partner-elgin",
    name: "The Elgin Heritage Hotels & Resorts",
    tagline: "125+ Years of Regal Colonial & Royal Sikkimese Splendor",
    starCategory: "5★ Heritage Royal Mansions",
    badge: "Royal Heritage Partner",
    logoText: "ELGIN",
    coverImage: "/images/darjeeling_toy_train_1785681122611.jpg",
    locations: ["Gangtok", "Darjeeling", "Kalimpong", "Pelling"],
    categories: ["luxury"],
    priceRangeText: "From ₹8,900 / night",
    distanceToCenter: "400m from Darjeeling Mall · 800m from Gangtok Palace Enclave",
    guestRating: 4.9,
    reviewCount: 650,
    ratingBreakdown: {
      cleanliness: 5.0,
      location: 4.9,
      service: 5.0,
      food: 4.9,
      value: 4.7
    },
    roomAmenities: [
      "Historic Burma Teak Wooden Panelling & Open Fireplaces",
      "Authentic Victorian Furniture & Royal Portraits",
      "Silver-Service Afternoon High Tea Sessions",
      "Luxury Heated Baths with Premium Bathrobes & Linens",
      "Curated Botanical Gardens & Gazebos",
      "Personal Butler & Royal Concierge Service"
    ],
    roomTypesAvailable: [
      { name: "Royal Heritage Room", description: "Classic colonial room with antique armchairs, fireplace, and hill view", bed: "Heritage King Bed", view: "Himalayan Ridge & Valley", approxPrice: "₹8,900 / night" },
      { name: "The Chogyal / Viceroy Suite", description: "Grand suite historically occupied by royal royalty and dignitaries", bed: "Royal 4-Poster King Bed", view: "Private Garden & Kanchenjunga", approxPrice: "₹14,500 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Lord Charles & Margaret Hamilton", city: "Edinburgh, Scotland", rating: 5, comment: "The Elgin Nor-Khill in Gangtok and Elgin Darjeeling are living history. The fireplace in the evening with Darjeeling tea is an unmatched feeling.", stayType: "Heritage Travelers", date: "March 2026" }
    ],
    featuredProperties: [
      "The Elgin Nor-Khill (Gangtok - Royal Guesthouse of the Chogyal King)",
      "The Elgin Darjeeling (125-Year Heritage Estate)",
      "The Elgin Silver Oaks (Kalimpong)",
      "The Elgin Mount Pandim (Pelling)"
    ],
    keyPerks: [
      "Former Royal Summer Palaces & Authentic Victorian Lounges",
      "Traditional Afternoon High-Tea & Classical Piano Performances",
      "Original Burma Teak Woodwork & Lit Stone Fireplaces",
      "Exclusive VIP Welcome for OffbeatDestination Guests"
    ],
    description: "Live like Himalayan royalty in authentic heritage palaces once graced by Kings, Chogyals, and dignitaries, featuring open fireplaces, antique portraits, and 5-star mountain pampering."
  },
  {
    id: "partner-mayfair",
    name: "Mayfair Hotels & Resorts",
    tagline: "5★ Ultra-Luxury Spa & Casino Heritage",
    starCategory: "5★ Luxury Spa & Casino",
    badge: "Official 5★ Luxury Partner",
    logoText: "MAYFAIR",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    locations: ["Gangtok", "Darjeeling"],
    categories: ["luxury"],
    priceRangeText: "From ₹9,500 / night",
    distanceToCenter: "Ranipool Valley Enclave Gangtok (15 min drive from MG Marg)",
    guestRating: 4.9,
    reviewCount: 980,
    ratingBreakdown: {
      cleanliness: 5.0,
      location: 4.8,
      service: 5.0,
      food: 4.9,
      value: 4.7
    },
    roomAmenities: [
      "Monastery Royal Sikkimese Architecture",
      "On-Site Casino Mahjong & Live Gaming",
      "Heated Indoor Swimming Pool & Hydrotherapy",
      "Mayfair Pevonia Luxury Spa & Wellness Salon",
      "Fine Dining Orchid Multi-Cuisine Restaurant",
      "Forest Jogging Trail & Billiards Room"
    ],
    roomTypesAvailable: [
      { name: "Executive Deluxe Cottage", description: "Private standalone cottage tucked among pine ferns with forest deck", bed: "King Bed", view: "Lush Pine Valley", approxPrice: "₹9,500 / night" },
      { name: "Grand Imperial Villa with Dip Pool", description: "Opulent villa with private plunge pool and 24h butler service", bed: "King Bed", view: "Valley & Monastery", approxPrice: "₹18,000 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Rohan & Sneha Kapur", city: "Gurugram", rating: 5, comment: "Mayfair Spa Resort Gangtok is absolute paradise. The spa treatments and casino evening made our vacation extraordinary.", stayType: "Luxury Leisure", date: "June 2026" }
    ],
    featuredProperties: [
      "Mayfair Spa Resort & Casino (Gangtok)",
      "Mayfair Hill Resort & Spa (Darjeeling)",
      "Mayfair Himalayan Retreat (Kalimpong)"
    ],
    keyPerks: [
      "Monastery Style Royal Architecture & Forest Ambiance",
      "World-class Spa, Heated Swimming Pool & Casino Access",
      "Complimentary Foot Reflexology Spa Voucher",
      "Gourmet Fine Dining & High-Tea Sessions"
    ],
    description: "The gold standard of luxury in East India. Nestled in lush pine forests with spa, fine dining, and casino experiences."
  },
  {
    id: "partner-sterling",
    name: "Sterling Resorts",
    tagline: "Memorable Holiday Experiences Guaranteed",
    starCategory: "4★ Premium Vacation Resorts",
    badge: "Official Resort Partner",
    logoText: "STERLING",
    coverImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    locations: ["Gangtok", "Darjeeling"],
    categories: ["luxury"],
    priceRangeText: "From ₹5,800 / night",
    distanceToCenter: "1.5 km from Ghoom Railway Station · 2 km from Gangtok Center",
    guestRating: 4.8,
    reviewCount: 510,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 4.8,
      service: 4.8,
      food: 4.7,
      value: 4.8
    },
    roomAmenities: [
      "Panoramic Kanchenjunga Sunrise View Balconies",
      "Bonfire Nights & Sikkimese Folk Performances",
      "Kids Play Zone & Activity Center",
      "Multi-Cuisine Buffet Restaurant",
      "In-Room Central Heating & Geysers",
      "Free High-Speed Wi-Fi & Large Car Park"
    ],
    roomTypesAvailable: [
      { name: "Classic Mountain View Room", description: "Comfortable room with wide windows facing Mt. Kanchenjunga", bed: "King Bed", view: "Snow Mountains", approxPrice: "₹5,800 / night" },
      { name: "Privilege Family Suite", description: "Spacious suite designed for family relaxation with private balcony", bed: "King Bed + Sofa Bed", view: "Valley & Sunrise", approxPrice: "₹7,600 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Praveen Nair", city: "Chennai", rating: 5, comment: "Sterling Darjeeling at Ghoom has the most spectacular sunrise view over Kanchenjunga! The kids loved the indoor games and bonfire.", stayType: "Family Vacation", date: "April 2026" }
    ],
    featuredProperties: [
      "Sterling Gangtok (Dzongu View)",
      "Sterling Darjeeling (Ghoom Heights)"
    ],
    keyPerks: [
      "Spacious Family Suites & Kid-Friendly Activity Zones",
      "Panoramic Kanchenjunga Sunrise View Balconies",
      "Bonfire Nights & Cultural Sikkimese Folk Performances",
      "Curated Local Sightseeing Desk"
    ],
    description: "A premier national resort brand offering expansive family suites, bonfire evenings, and panoramic valley views."
  },
  {
    id: "partner-yashshree",
    name: "Yashshree Hotels & Resorts",
    tagline: "Elegance & Heritage Comfort in the Hills",
    starCategory: "3★ & 4★ Heritage Boutique Stays",
    badge: "Official Chain Partner",
    logoText: "YASHSHREE",
    coverImage: "/images/darjeeling_toy_train_1785681122611.jpg",
    locations: ["Darjeeling", "Gangtok", "Kalimpong"],
    categories: ["budget"],
    priceRangeText: "From ₹3,200 / night",
    distanceToCenter: "250m from Chowrasta Darjeeling · 500m from MG Marg Gangtok",
    guestRating: 4.7,
    reviewCount: 460,
    ratingBreakdown: {
      cleanliness: 4.8,
      location: 4.9,
      service: 4.7,
      food: 4.8,
      value: 4.8
    },
    roomAmenities: [
      "Colonial Architecture & Wooden Floors",
      "Walking distance from Mall Road",
      "Multi-Cuisine & Bengali Cuisine Specialty",
      "24/7 Hot Water Geyser & Heating",
      "Free Wi-Fi & Electric Kettle",
      "Concierge for Toy Train Tickets"
    ],
    roomTypesAvailable: [
      { name: "Deluxe Heritage Room", description: "Cozy colonial ambiance with high ceilings and wood finishes", bed: "King Bed", view: "Town & Hill View", approxPrice: "₹3,200 / night" },
      { name: "Executive Suite", description: "Generously sized suite with separate sitting parlor and valley window", bed: "King Bed", view: "Valley Panorama", approxPrice: "₹4,600 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Debashis Mukherjee", city: "Kolkata", rating: 5, comment: "Yashshree Fleur is situated at the best spot in Darjeeling. You step out and you are right at Chowrasta Mall. Delicious food and warm rooms.", stayType: "Family Holiday", date: "May 2026" }
    ],
    featuredProperties: [
      "Yashshree Fleur Hotel (Darjeeling)",
      "Yashshree Gangtok Hotel",
      "Yashshree Kalimpong Heritage Resort"
    ],
    keyPerks: [
      "Colonial Heritage Charm & Modern Luxury",
      "Walking distance from Chowrasta & MG Marg",
      "Multi-Cuisine Restaurant with Local Sikkimese & Bengali delicacies",
      "Warm Hospitality & Personal Guest Concierge"
    ],
    description: "Combining traditional colonial elegance with contemporary comfort, Yashshree offers boutique stays right in the heart of mountain hubs."
  },
  {
    id: "partner-voyage",
    name: "Voyage Hotels & Resorts",
    tagline: "Serene Boutique Escapes & Tea Garden Heritage",
    starCategory: "3★ Deluxe & Tea Garden Stays",
    badge: "Official Chain Partner",
    logoText: "VOYAGE",
    coverImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    locations: ["Darjeeling", "Gangtok", "Pelling", "Kalimpong"],
    categories: ["budget"],
    priceRangeText: "From ₹2,800 / night",
    distanceToCenter: "400m from Central Ridge · 600m from MG Marg Gangtok",
    guestRating: 4.7,
    reviewCount: 330,
    ratingBreakdown: {
      cleanliness: 4.7,
      location: 4.8,
      service: 4.7,
      food: 4.7,
      value: 4.8
    },
    roomAmenities: [
      "Tea Estate & Valley Vista Rooms",
      "In-House Fresh Darjeeling Tea Tastings",
      "Attached Bathroom with 24/7 Hot Water",
      "Room Heating & Comfortable Bedding",
      "Free Optical Wi-Fi",
      "Travel Desk & Cab Coordination"
    ],
    roomTypesAvailable: [
      { name: "Tea Garden Deluxe Room", description: "Bright room overlooking rolling green tea bushes and misty hills", bed: "Queen Bed", view: "Tea Garden & Pines", approxPrice: "₹2,800 / night" },
      { name: "Voyage Panoramic Suite", description: "Spacious corner suite with dual-aspect mountain views", bed: "King Bed", view: "Snow Mountains & Valley", approxPrice: "₹4,100 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Meenal Varma", city: "Lucknow", rating: 5, comment: "Voyage Glenburn stay was so peaceful away from the noisy traffic. Waking up to chirping birds and fresh tea was unforgettable.", stayType: "Couples Trip", date: "April 2026" }
    ],
    featuredProperties: [
      "Voyage Glenburn Tea Estate Stay (Darjeeling)",
      "Voyage Gangtok Regency",
      "Voyage Pelling Heights",
      "Voyage Kalimpong Retreat"
    ],
    keyPerks: [
      "Boutique Stays & Heritage Tea Estate Experiences",
      "Prime Walking Access to Scenic Ridge Walks",
      "In-House Multi-Cuisine Dining & Local Tea Tasting",
      "Warm & Personalized Concierge Service"
    ],
    description: "Offering picturesque boutique stays and tranquil tea garden retreats with panoramic Himalayan scenery."
  }
];

export interface FeaturedStandaloneHotel {
  id: string;
  name: string;
  destination: string;
  locationSpecific: string;
  tagline: string;
  starCategory: string;
  badge: string;
  coverImage: string;
  galleryPhotos?: HotelPhotoItem[];
  categories: ('luxury' | 'budget' | 'jain')[];
  priceRangeText: string;
  distanceToCenter: string;
  guestRating: number;
  reviewCount: number;
  ratingBreakdown: {
    cleanliness: number;
    location: number;
    service: number;
    food: number;
    value: number;
  };
  roomAmenities: string[];
  keyPerks: string[];
  description: string;
  isJainCertified?: boolean;
  roomTypesAvailable: {
    name: string;
    description: string;
    bed: string;
    view: string;
    approxPrice: string;
  }[];
  verifiedGuestReviews: {
    author: string;
    city: string;
    rating: number;
    comment: string;
    stayType: string;
    date: string;
  }[];
}

export const FEATURED_STANDALONE_HOTELS: FeaturedStandaloneHotel[] = [
  {
    id: "hotel-lachung-country-house",
    name: "Lachung Country House",
    destination: "Lachung, North Sikkim",
    locationSpecific: "Upper Lachung Valley, 200m from Lachung Monastery",
    tagline: "Handcrafted Alpine Pinewood Lodge with Radiator Heating & Stream Views",
    starCategory: "4★ Boutique Alpine Lodge",
    badge: "North Sikkim Recommended",
    coverImage: "/images/yumthang_zero_point_1785680592273.jpg",
    categories: ["luxury", "budget"],
    priceRangeText: "From ₹4,500 / night",
    distanceToCenter: "200m from Lachung Village Centre · 22 km to Yumthang Valley",
    guestRating: 4.9,
    reviewCount: 310,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 5.0,
      service: 4.9,
      food: 4.8,
      value: 4.8
    },
    roomAmenities: [
      "Central Radiator Room Heating System",
      "Authentic Pine Wood Panelled Suites",
      "24/7 Heavy Generator Backup & Hot Water Geysers",
      "Organic Farm-to-Table Sikkimese & North Indian Meals",
      "Emergency Oxygen Cylinders on Standby",
      "Heated Woolen Blankets & Electric Kettles",
      "Lachung River & Glacier Panorama Balconies"
    ],
    keyPerks: [
      "Guaranteed room warmth even at sub-zero temperatures",
      "Freshly prepared hot breakfast and dinner included",
      "Zero Point & Yumthang early departure permit coordination",
      "Cozy stone fireplace lounge for evening tea"
    ],
    description: "Lachung Country House is North Sikkim's premier alpine lodge, featuring insulated pine wood architecture, continuous radiator heating, and hearty home-style meals before venturing to Yumthang Valley and Zero Point (15,300 ft).",
    roomTypesAvailable: [
      { name: "Alpine Pine Deluxe Room", description: "Warm wooden room with central heating and attached heated bathroom", bed: "King Bed", view: "Lachung River & Valley", approxPrice: "₹4,500 / night" },
      { name: "Himalayan Stream Suite", description: "Spacious corner suite overlooking rushing alpine streams and snowy crags", bed: "King Bed", view: "Snow Mountain & Pine Forest", approxPrice: "₹5,800 / night" },
      { name: "Country Attic Family Suite", description: "Rustic duplex attic suite accommodating up to 4 adults with 2 beds", bed: "2 King Beds", view: "360° Glacier Peaks", approxPrice: "₹7,200 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Aniket & Neha Joshi", city: "Mumbai", rating: 5, comment: "Staying at Lachung Country House was the warmest experience in freezing Lachung. The radiator heating worked all night, and the hot dinner was delicious!", stayType: "Couples Tour", date: "May 2026" },
      { author: "Sunil Ganguly", city: "Kolkata", rating: 5, comment: "Best property in North Sikkim by far. Very clean blankets, 24-hour hot water, and helpful staff.", stayType: "Family Trip", date: "April 2026" }
    ]
  },
  {
    id: "hotel-sila-norphel-pelling",
    name: "Sila Norphel Resort Pelling",
    destination: "Pelling, West Sikkim",
    locationSpecific: "Upper Pelling Ridge, near Helipad & Pemayangtse",
    tagline: "Unobstructed 180° Kanchenjunga Balconies & Serene Pine Gardens",
    starCategory: "4★ Premium Scenic Resort",
    badge: "Best Kanchenjunga View",
    coverImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    categories: ["luxury", "budget"],
    priceRangeText: "From ₹4,100 / night",
    distanceToCenter: "300m from Upper Pelling Helipad · 1.5 km to Pemayangtse Monastery",
    guestRating: 4.8,
    reviewCount: 420,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 5.0,
      service: 4.8,
      food: 4.8,
      value: 4.8
    },
    roomAmenities: [
      "Direct Facing Unobstructed Kanchenjunga Balconies",
      "Spacious Pine Wooden Interiors",
      "Multi-Cuisine & Pure Veg / Jain Kitchen Facility",
      "High-Speed Wi-Fi & Smart TV",
      "24/7 Hot Water Geyser & Central Room Heater",
      "Expansive Lawn Garden & Bonfire Corner",
      "Free Parking & Driver Accommodation"
    ],
    keyPerks: [
      "Sunrise over Kanchenjunga visible directly from your bed",
      "Walking distance to Pelling viewpoints and skywalk shuttles",
      "Freshly prepared Sikkimese, Bengali, and Jain delicacies",
      "Special discounts on local sightseeing cab coordination"
    ],
    description: "Sila Norphel Resort in Upper Pelling is celebrated for having one of the most stunning, unobstructed 180-degree views of Mt Kanchenjunga in all of Sikkim. Guests enjoy spacious wooden balconies, immaculate gardens, and warm mountain hospitality.",
    roomTypesAvailable: [
      { name: "Sila Mountain View Deluxe", description: "Glass fronted room with direct morning sunrise over snow peaks", bed: "King Bed", view: "Mt Kanchenjunga Frontal", approxPrice: "₹4,100 / night" },
      { name: "Super Deluxe Balcony Suite", description: "Extra-spacious wooden suite with private sitting area and wide terrace", bed: "King Bed", view: "Snow Range & Pine Canopy", approxPrice: "₹5,200 / night" },
      { name: "Norphel Royal Family Suite", description: "Two interconnected bedrooms with private balcony for families", bed: "2 Queen Beds", view: "Kanchenjunga Panorama", approxPrice: "₹6,800 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Pradeep & Sunita Chatterjee", city: "Kolkata", rating: 5, comment: "The view from Sila Norphel is simply breathtaking. We watched the golden sunrise on Kanchenjunga sipping Darjeeling tea on our balcony. Absolute bliss!", stayType: "Family Holiday", date: "June 2026" }
    ]
  },
  {
    id: "hotel-sun-mount-gangtok",
    name: "Hotel Sun Mount Gangtok",
    destination: "Gangtok, East Sikkim",
    locationSpecific: "Tibet Road / Near MG Marg Promenade",
    tagline: "Sunlit Valley Panoramas & Walking Access to MG Marg",
    starCategory: "3★ Deluxe Boutique",
    badge: "Prime Central Value",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    categories: ["budget"],
    priceRangeText: "From ₹2,900 / night",
    distanceToCenter: "250m from MG Marg Promenade (3 min flat walk)",
    guestRating: 4.7,
    reviewCount: 390,
    ratingBreakdown: {
      cleanliness: 4.8,
      location: 4.9,
      service: 4.8,
      food: 4.6,
      value: 4.9
    },
    roomAmenities: [
      "Sunlit Valley View Windows & Balconies",
      "Walking Distance to MG Marg shopping & cafes",
      "Multi-Cuisine Restaurant with In-Room Dining",
      "24/7 Hot Water Geyser & Electric Blanket",
      "Free Optical Fiber Wi-Fi",
      "Elevator & Full Power Backup"
    ],
    keyPerks: [
      "Superb central location avoiding long taxi commutes",
      "Budget-friendly deluxe pricing with hot morning breakfast",
      "Permit assistance for Tsomgo Lake & Nathula Pass",
      "Spotlessly clean linen and friendly mountain staff"
    ],
    description: "Hotel Sun Mount is one of Gangtok's most beloved hotels, offering bright, sunlit rooms, quick 3-minute walking access to MG Marg, and warm Sikkimese hospitality at attractive tariff rates.",
    roomTypesAvailable: [
      { name: "Deluxe Valley View Room", description: "Comfortable room with wide valley windows and modern bath", bed: "Queen Bed", view: "Gangtok Valley & Hills", approxPrice: "₹2,900 / night" },
      { name: "Super Deluxe Mountain Suite", description: "Spacious wooden floor suite with private sitting area", bed: "King Bed", view: "Valley & Snow Cap Range", approxPrice: "₹3,800 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Arjun Nambiar", city: "Kochi", rating: 5, comment: "Hotel Sun Mount's location is perfect! You walk out and in 3 minutes you are at MG Marg. Rooms are cozy, clean, and warm.", stayType: "Solo & Friends", date: "May 2026" }
    ]
  },
  {
    id: "hotel-gangtok-prime",
    name: "Gangtok Prime Hotel & Spa",
    destination: "Gangtok, East Sikkim",
    locationSpecific: "Paljor Stadium Road / Near MG Marg Enclave",
    tagline: "Executive Boutique Luxury, Wellness Spa & Valley Balconies",
    starCategory: "4★ Premium Executive",
    badge: "Executive Favorite",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    categories: ["luxury", "budget"],
    priceRangeText: "From ₹4,600 / night",
    distanceToCenter: "400m from MG Marg · 1.2 km from Deorali Cable Car",
    guestRating: 4.8,
    reviewCount: 480,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 4.8,
      service: 4.9,
      food: 4.8,
      value: 4.7
    },
    roomAmenities: [
      "In-House Prime Spa & Rejuvenation Therapies",
      "Floor-to-Ceiling Valley View Windows",
      "Fine Dining Multi-Cuisine & Pure Veg Kitchen",
      "Centralized Climate Control & Heating",
      "High-Speed Wi-Fi & Workstation",
      "24/7 In-Room Dining & Concierge",
      "Modern Elevator & Underground Parking"
    ],
    keyPerks: [
      "Executive suites ideal for luxury leisure & honeymooners",
      "Complimentary access to steam and sauna wellness facilities",
      "Dedicated Jain food preparation upon prior request",
      "Private airport transfers coordinated seamlessly"
    ],
    description: "Gangtok Prime Hotel & Spa delivers upscale comfort, refined contemporary aesthetics, and revitalizing spa therapies right in the heart of Sikkim's capital city.",
    roomTypesAvailable: [
      { name: "Prime Executive Room", description: "Plush modern room with ambient LED lighting and city/valley view", bed: "King Bed", view: "Gangtok City & Valley", approxPrice: "₹4,600 / night" },
      { name: "Kanchenjunga Luxury Suite", description: "Grand suite with panoramic balcony and designer soaking tub", bed: "King Bed", view: "Snow Range & Valley", approxPrice: "₹6,200 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Kunal & Ritu Verma", city: "Chandigarh", rating: 5, comment: "Gangtok Prime gave us a true 4-star experience. The food was top quality, the spa was deeply relaxing after our North Sikkim trip.", stayType: "Couples Holiday", date: "April 2026" }
    ]
  },
  {
    id: "hotel-hungry-jack-gangtok",
    name: "Hotel Hungry Jack Gangtok",
    destination: "Gangtok, East Sikkim",
    locationSpecific: "NH10 / Arithang, Central Gangtok",
    tagline: "Iconic Multi-Cuisine Culinary Destination & Comfortable Stays",
    starCategory: "3★ Deluxe",
    badge: "Foodie & Family Pick",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    categories: ["budget"],
    priceRangeText: "From ₹2,700 / night",
    distanceToCenter: "500m from MG Marg Shopping Promenade",
    guestRating: 4.7,
    reviewCount: 510,
    ratingBreakdown: {
      cleanliness: 4.7,
      location: 4.8,
      service: 4.8,
      food: 5.0,
      value: 4.9
    },
    roomAmenities: [
      "Famous Hungry Jack Multi-Cuisine Restaurant on Premise",
      "Spacious Family Rooms with Hot Water Geysers",
      "Complimentary High-Speed Wi-Fi",
      "Prompt 24/7 Room Service",
      "Power Backup & Cable Television",
      "Travel Desk for North Sikkim & Silk Route"
    ],
    keyPerks: [
      "Renowned for the best North Indian, Sikkimese & Chinese delicacies",
      "Pocket-friendly tariff with generous room dimensions",
      "Easy taxi access for arrival and departure luggage",
      "Special discounts on food orders for in-house hotel guests"
    ],
    description: "Hotel Hungry Jack is an institution in Gangtok, famed for its legendary restaurant serving mouth-watering cuisine, paired with comfortable, spotless deluxe rooms and dependable mountain hospitality.",
    roomTypesAvailable: [
      { name: "Deluxe Comfort Room", description: "Well-appointed deluxe room with attached bathroom and geyser", bed: "Double Bed", view: "City View", approxPrice: "₹2,700 / night" },
      { name: "Super Deluxe Family Room", description: "Large suite for families with extra seating and valley window", bed: "King + Single Bed", view: "Valley & Hills", approxPrice: "₹3,700 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Siddharth Sen", city: "Siliguri", rating: 5, comment: "The food at Hungry Jack is simply the best in Gangtok! The rooms are clean, warm, and very reasonably priced. Highly recommended.", stayType: "Business & Leisure", date: "June 2026" }
    ]
  },
  {
    id: "hotel-crestora-grand-gangtok",
    name: "Crestora Grand Hotel & Spa Gangtok",
    destination: "Gangtok, East Sikkim",
    locationSpecific: "Upper Sichey / Near VIP Enclave Gangtok",
    tagline: "Floor-to-Ceiling Mountain Panoramas, Rooftop Sunset Lounge & Alpine Warmth",
    starCategory: "4★ Premium Lifestyle",
    badge: "Crestora Flagship",
    coverImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    categories: ["luxury", "budget", "jain"],
    priceRangeText: "From ₹4,200 / night",
    distanceToCenter: "400m from MG Marg Gangtok",
    guestRating: 4.8,
    reviewCount: 380,
    ratingBreakdown: {
      cleanliness: 4.9,
      location: 4.8,
      service: 4.9,
      food: 4.8,
      value: 4.7
    },
    roomAmenities: [
      "Floor-to-Ceiling Panoramic Mountain Glass Windows",
      "Rooftop Sunset Lounge & Evening Bonfire Terrace",
      "Centralized Heating & Electric Radiators",
      "Multi-Cuisine & Pure Veg / Jain Dining Facility",
      "Modern Elevator Access to All Floors",
      "Optical Fiber 100Mbps Wi-Fi & Smart TV",
      "24/7 Geyser Hot Running Water"
    ],
    keyPerks: [
      "Direct front-facing views of Mt. Kanchenjunga from upper floor suites",
      "Jain and 100% pure vegetarian kitchen option available",
      "Complimentary welcome herbal tea and early check-in priority",
      "In-house travel concierge for Zero Point & Nathula Pass permits"
    ],
    description: "The flagship property of Crestora Hotels & Resorts in Sikkim, Crestora Grand features Scandinavian-inspired mountain architecture, floor-to-ceiling panoramic views, heated suites, and exquisite dining.",
    roomTypesAvailable: [
      { name: "Crestora Alpine Deluxe", description: "Modern alpine room with pine wood finishes and valley balcony", bed: "King Bed", view: "Valley & Pine Slopes", approxPrice: "₹4,200 / night" },
      { name: "Kanchenjunga Executive Suite", description: "Luxury suite with panoramic glass frontage facing Mt Kanchenjunga", bed: "King Bed", view: "Mt Kanchenjunga Frontal", approxPrice: "₹5,600 / night" }
    ],
    verifiedGuestReviews: [
      { author: "Dr. Sandeep & Shalini Jain", city: "Indore", rating: 5, comment: "Crestora Grand Gangtok is an absolute gem. Spotless cleanliness, heated rooms, and authentic Jain food served with immense care.", stayType: "Family Holiday", date: "May 2026" }
    ]
  }
];

export const CAB_OPTIONS: CabOption[] = [
  {
    id: "cab-innova-crysta",
    model: "Toyota Innova Crysta",
    type: "Luxury SUV (Captain Seats)",
    capacity: "6-7 Passengers + 5 Luggage",
    bestFor: "Families, Couples, North Sikkim (2N Lachung) & Nathula Pass Army Permits",
    ratePerDay: 4500,
    njpIxbPickupRate: 3800,
    image: "/images/innova_crysta_cab_1785680577329.jpg",
    features: [
      "✓ Fully Approved for North Sikkim (2N Lachung) & Nathula Pass Army Permits",
      "Plush Reclining Captain Seats with individual armrests",
      "Rear dual-zone air conditioning & heating vents",
      "Massive boot space accommodating 4-6 large mountain suitcases",
      "High ground clearance & anti-roll mountain suspension",
      "Professional hill-certified drivers with 10+ yrs mountain experience"
    ]
  },
  {
    id: "cab-xylo-scorpio",
    model: "Mahindra Xylo / Scorpio 4x4",
    type: "Rugged Mountain 4x4 SUV",
    capacity: "6 Passengers + 4 Luggage",
    bestFor: "North Sikkim 2N Lachung, Zero Point & High Altitude Snow Terrain",
    ratePerDay: 4000,
    njpIxbPickupRate: 3400,
    image: "/images/innova_crysta_cab_1785680577329.jpg",
    features: [
      "✓ Fully Approved for North Sikkim Restricted Area Permit (PAP)",
      "High ground clearance for snow & rocky mountain riverbeds",
      "All-wheel 4x4 drive stability for steep climbs & Zero Point (15,300 ft)",
      "Rugged suspension and high headroom for bumpy mountain trails",
      "Experienced local drivers adept at snow chain handling"
    ]
  },
  {
    id: "cab-tempo-traveller",
    model: "Force Urbania / Luxury Tempo Traveller",
    type: "Group Mountain Coach (9 / 13 / 17 / 26 Seater)",
    capacity: "9 to 26 Passengers + 15+ Luggage",
    bestFor: "Large Families, Corporate Groups, College Tours & Destination Weddings",
    ratePerDay: 6500,
    njpIxbPickupRate: 5800,
    image: "/images/agency_card_banner_1785772861093.jpg",
    features: [
      "✓ Pre-cleared for all Sikkim tourist routes & corporate circuits",
      "Individual 2x1 Maharaja pushback reclining luxury seats",
      "High-roof walk-in standing cabin with individual AC vents & reading lights",
      "Massive rear luggage chamber + full overhead carrier",
      "PA audio system with microphone for tour leader briefings",
      "Dedicated senior hill driver + assistant for luggage handling"
    ]
  },
  {
    id: "cab-bolero-camper",
    model: "Mahindra Bolero Neo / Mountain 4WD",
    type: "Rugged Offbeat 4WD",
    capacity: "6 Passengers + 4 Luggage",
    bestFor: "Offbeat Dzongu, Zuluk Silk Route & Rustic Village Expeditions",
    ratePerDay: 3800,
    njpIxbPickupRate: 3200,
    image: "/images/yumthang_zero_point_1785680592273.jpg",
    features: [
      "✓ Full clearance for Silk Route & remote North Sikkim trails",
      "Heavy-duty leaf spring mountain suspension for rough roads",
      "High torque mHawk diesel engine for steep gradients",
      "Reliable and economical for adventure groups and photographers"
    ]
  },
  {
    id: "cab-sedan-dzire",
    model: "Swift Dzire / Toyota Etios",
    type: "4-Seater Sedan",
    capacity: "4 Passengers + 2 Luggage",
    bestFor: "Couples, NJP/IXB transfers, Gangtok & Darjeeling Local (Permit charges applied as per govt rate)",
    ratePerDay: 3200,
    njpIxbPickupRate: 2800,
    image: "/images/innova_mountain_drive_1785681104445.jpg",
    features: [
      "🏛️ Permit charges applied as per official govt rate for hill circuits",
      "Comfortable 4-seater executive sedan with boot space",
      "Clean air-conditioned interior for Gangtok local & Darjeeling transfers",
      "Hill-certified polite local chauffeur"
    ]
  },
  {
    id: "cab-hatchback-wagonr",
    model: "WagonR / Swift / Alto",
    type: "4-Seater Hatchback",
    capacity: "3-4 Passengers + 1-2 Bags",
    bestFor: "Budget Travelers, Gangtok Town Point Drops (Permit charges applied as per govt rate)",
    ratePerDay: 2500,
    njpIxbPickupRate: 2200,
    image: "/images/innova_mountain_drive_1785681104445.jpg",
    features: [
      "🏛️ Permit charges applied as per official govt rate for local trips",
      "Compact and nimble for smooth Gangtok town point drops",
      "Most economical choice for budget-conscious local travelers",
      "Punctual local Sikkim driver"
    ]
  }
];

export const REVIEWS: CustomerReview[] = [
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
    helpfulCount: 24,
    createdAt: "2026-07-20T10:30:00Z"
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
    helpfulCount: 31,
    createdAt: "2026-06-15T14:20:00Z"
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
    helpfulCount: 18,
    createdAt: "2026-05-10T09:15:00Z"
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
    helpfulCount: 15,
    createdAt: "2026-08-01T11:00:00Z"
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
    helpfulCount: 9,
    createdAt: "2026-07-28T16:45:00Z"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // -------------------------------------------------------------
  // GOOGLE BUSINESS PROFILE & AGENCY VERIFIED PHOTOS
  // -------------------------------------------------------------
  {
    id: "gal-gmb-1",
    title: "OffbeatDestination Gangtok Headquarters & Permit Desk",
    destination: "Sikkim",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    googleBusinessDetails: {
      reviewerName: "Devi Charan Chettri (Proprietor)",
      rating: 5.0,
      verifiedDate: "Verified Owner Profile",
      badgeText: "Google Business Verified Office",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Office & Fleet"
    },
    type: "photo",
    url: "/images/gmb_office_photo_1786168516883.jpg",
    highResUrl: "/images/gmb_office_photo_1786168516883.jpg",
    location: "Arithang, Gangtok (Near MG Marg), Sikkim",
    altitude: "5,410 ft",
    description: "Official Govt-registered headquarters and Google My Business verified travel agency in Gangtok. Walk-in permit processing and 24/7 mountain trip operations.",
    tags: ["Google Business", "Gangtok Office", "Govt Registered", "Permit Desk", "Arithang"],
    cameraInfo: "Google Maps Geotagged • Verified Office",
    likesCount: 142,
    featured: true
  },
  {
    id: "gal-gmb-2",
    title: "Google Verified Review: Family Yak Ride at Tsomgo Lake",
    destination: "Sikkim",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    googleBusinessDetails: {
      reviewerName: "Rajesh & Neha Sharma (Bengaluru)",
      rating: 5.0,
      verifiedDate: "Travelled Oct 2025",
      badgeText: "Google Verified Guest Photo",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Customer Upload"
    },
    type: "photo",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=85&w=1800",
    location: "Tsomgo Lake, East Sikkim",
    altitude: "12,400 ft",
    description: "Guest upload via Google Business Profile: 'Devi Charan ji organized our complete Sikkim tour with an impeccable Innova Crysta and warm driver Prem. Tsomgo Lake in clear skies was unforgettable!'",
    tags: ["Google Review", "Tsomgo Lake", "Family Trip", "Yak Ride", "5-Star Review"],
    cameraInfo: "Customer Upload • Google 5-Star Review",
    likesCount: 98,
    featured: true
  },
  {
    id: "gal-gmb-3",
    title: "Google Verified Review: Innova Crysta Airport Pickup & North Sikkim Tour",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    googleBusinessDetails: {
      reviewerName: "Dr. Anirban Mukherjee (Kolkata)",
      rating: 5.0,
      verifiedDate: "Travelled Nov 2025",
      badgeText: "Google Verified Traveler",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Customer Upload"
    },
    type: "photo",
    url: "/images/innova_crysta_cab_1785680577329.jpg",
    highResUrl: "/images/innova_crysta_cab_1785680577329.jpg",
    location: "Bagdogra Airport (IXB) to Gangtok",
    altitude: "5,410 ft",
    description: "Google Business review: 'Spotless Innova Crysta received us right at Bagdogra arrival. The car handled steep hairpins up to Lachung with zero body roll. Top tier service by OffbeatDestination.'",
    tags: ["Innova Crysta", "Google Review", "Bagdogra Pickup", "Luxury Cab", "Verified Driver"],
    cameraInfo: "Customer Capture • Verified Google Profile",
    likesCount: 124,
    featured: true
  },
  {
    id: "gal-gmb-4",
    title: "Google Verified Review: Zero Point Snow Expedition at 15,300 ft",
    destination: "Sikkim",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    googleBusinessDetails: {
      reviewerName: "Vikram Mehta & College Friends (Mumbai)",
      rating: 5.0,
      verifiedDate: "Travelled Dec 2025",
      badgeText: "Google Verified Reviewer",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Live Travel Moment"
    },
    type: "photo",
    url: "/images/yumthang_zero_point_1785680592273.jpg",
    highResUrl: "/images/yumthang_zero_point_1785680592273.jpg",
    location: "Yumesamdong / Zero Point, North Sikkim",
    altitude: "15,300 ft",
    description: "Traveler capture posted to Google Maps: 'Zero Point was covered in fresh snowfall! Permits were arranged smoothly by the Gangtok office without any morning hassle.'",
    tags: ["Google Review", "Zero Point", "Snow Trip", "North Sikkim", "Verified Review"],
    cameraInfo: "Customer Upload • Google Maps Geotag",
    likesCount: 167,
    featured: true
  },
  {
    id: "gal-gmb-5",
    title: "Google Verified Review: Tiger Hill Sunrise over Kanchenjunga",
    destination: "Darjeeling",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    googleBusinessDetails: {
      reviewerName: "Priyanshi Roy & Family (Delhi)",
      rating: 5.0,
      verifiedDate: "Travelled Jan 2026",
      badgeText: "Google Top Contributor",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Customer Upload"
    },
    type: "photo",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=85&w=1800",
    location: "Tiger Hill (8,400 ft), Darjeeling",
    altitude: "8,400 ft",
    description: "Google Business snapshot: '4:00 AM private pickup in comfortable Innova. We reached Tiger Hill summit before the crowd and caught the golden rays illuminating Mt. Kanchenjunga.'",
    tags: ["Tiger Hill", "Google Review", "Darjeeling Sunrise", "Kanchenjunga", "Verified Guest"],
    cameraInfo: "Customer Review • Google 5-Star Rating",
    likesCount: 115
  },
  {
    id: "gal-gmb-6",
    title: "Google Verified Review: Bhutan Cultural Odyssey & Tiger's Nest Hike",
    destination: "Bhutan",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    googleBusinessDetails: {
      reviewerName: "Amit & Sunita Sengupta (Pune)",
      rating: 5.0,
      verifiedDate: "Travelled Dec 2025",
      badgeText: "Google Verified Traveler",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Customer Upload"
    },
    type: "photo",
    url: "/images/bhutan_tigers_nest_1785681037397.jpg",
    highResUrl: "/images/bhutan_tigers_nest_1785681037397.jpg",
    location: "Taktsang Monastery, Paro Valley, Bhutan",
    altitude: "10,240 ft",
    description: "Google Maps customer review photo: 'From Phuntsholing entry permits to guide Tenzin in Paro, OffbeatDestination managed our 7-day Bhutan honeymoon seamlessly.'",
    tags: ["Bhutan Tour", "Tiger's Nest", "Google Review", "Honeymoon", "Verified Agency"],
    cameraInfo: "Customer Upload • Google Business Profile",
    socialSource: "Google",
    socialLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
    likesCount: 149
  },
  {
    id: "gal-gmb-7",
    title: "Google Business Review: Ravangla 130ft Buddha Park Panoramic Vista",
    destination: "Sikkim",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    socialSource: "Google",
    socialLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
    googleBusinessDetails: {
      reviewerName: "Sanjay Singhal & Family (Jaipur)",
      rating: 5.0,
      verifiedDate: "Travelled Feb 2026",
      badgeText: "Google Business Verified Review",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Customer Upload"
    },
    type: "photo",
    url: "/images/ravangla_buddha_park_1785680605794.jpg",
    highResUrl: "/images/ravangla_buddha_park_1785680605794.jpg",
    location: "Buddha Park, Ravangla, South Sikkim",
    altitude: "7,000 ft",
    description: "Google Maps review: 'Devi Charan ji curated an amazing South & West Sikkim circuit. Buddha Park with clear blue skies was deeply peaceful. Pure vegetarian meal arrangements were 10/10.'",
    tags: ["Google Business", "Ravangla", "Buddha Park", "South Sikkim", "5-Star Review"],
    cameraInfo: "Google Maps Verified • 7,000 ft",
    likesCount: 138,
    featured: true
  },
  {
    id: "gal-gmb-8",
    title: "Google Business Review: Happy Valley Organic Tea Estate Tour in Darjeeling",
    destination: "Darjeeling",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    socialSource: "Google",
    socialLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
    googleBusinessDetails: {
      reviewerName: "Ritu & Sourav Ganguly (Kolkata)",
      rating: 5.0,
      verifiedDate: "Travelled March 2026",
      badgeText: "Google Verified Guest",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Customer Upload"
    },
    type: "photo",
    url: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highResUrl: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    location: "Happy Valley Tea Estate, Darjeeling",
    altitude: "6,800 ft",
    description: "Google Business review: 'The tea plucking walk in Darjeeling arranged by OffbeatDestination was delightful. Clean car, hill-certified chauffeur, and transparent pricing.'",
    tags: ["Google Business", "Darjeeling Tea", "Happy Valley", "Tea Garden", "Verified Review"],
    cameraInfo: "Google Business Capture • Darjeeling",
    likesCount: 121
  },

  // -------------------------------------------------------------
  // FACEBOOK COMMUNITY (@offbeatdestinationtravels)
  // -------------------------------------------------------------
  {
    id: "gal-fb-1",
    title: "Facebook Community: Devi Charan Chettri & Travelers at Nathula Pass (14,140 ft)",
    destination: "Sikkim",
    serviceType: "Google Business Photos",
    socialSource: "Facebook",
    socialLink: "https://www.facebook.com/offbeatdestinationtravels",
    googleBusinessDetails: {
      reviewerName: "Devi Charan Chettri (Founder) with Guest Group",
      rating: 5.0,
      verifiedDate: "Posted on Facebook Page",
      badgeText: "Facebook Community Post",
      googleMapsLink: "https://www.facebook.com/offbeatdestinationtravels",
      photoType: "Live Travel Moment"
    },
    type: "photo",
    url: "/images/nathula_pass_snow_1785681052944.jpg",
    highResUrl: "/images/nathula_pass_snow_1785681052944.jpg",
    location: "Nathula Pass Indo-China Border (14,140 ft)",
    altitude: "14,140 ft",
    description: "Live moment from our Facebook community: Escorting our 8-member family group to the snow-covered Nathula Pass Indo-China border with full army permit clearances.",
    tags: ["Facebook Post", "Nathula Pass", "Devi Charan Chettri", "Snow Tour", "Army Clearance"],
    cameraInfo: "Facebook Official Page • 14,140 ft",
    likesCount: 210,
    featured: true
  },
  {
    id: "gal-fb-2",
    title: "Facebook Community: Family Group at Temi Tea Estate Organic Slopes",
    destination: "Sikkim",
    serviceType: "Google Business Photos",
    socialSource: "Facebook",
    socialLink: "https://www.facebook.com/offbeatdestinationtravels",
    googleBusinessDetails: {
      reviewerName: "The Kulkarni Family (Pune)",
      rating: 5.0,
      verifiedDate: "Shared on Facebook Community",
      badgeText: "Facebook Guest Story",
      googleMapsLink: "https://www.facebook.com/offbeatdestinationtravels",
      photoType: "Customer Upload"
    },
    type: "photo",
    url: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highResUrl: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    location: "Temi Tea Garden, South Sikkim",
    altitude: "5,800 ft",
    description: "Shared on Facebook by our guests: 'Tea tasting at Temi was pure bliss! Thanks to OffbeatDestination Travels for making our family trip so comfortable and memorable.'",
    tags: ["Facebook Community", "Temi Tea", "Family Vacation", "South Sikkim", "Organic Tea"],
    cameraInfo: "Facebook Guest Upload • Temi Tea",
    likesCount: 164
  },
  {
    id: "gal-fb-3",
    title: "Facebook Community: Innova Crysta Teesta River Valley Transit",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Cab Rentals",
    socialSource: "Facebook",
    socialLink: "https://www.facebook.com/offbeatdestinationtravels",
    type: "photo",
    url: "/images/innova_mountain_drive_1785681104445.jpg",
    highResUrl: "/images/innova_mountain_drive_1785681104445.jpg",
    location: "Teesta River Valley Highway (NH-10), Sikkim",
    altitude: "2,400 ft",
    description: "Featured on our Facebook page: Our flagship Toyota Innova Crysta cruising along the emerald waters of Teesta River on the Siliguri-Gangtok corridor.",
    tags: ["Facebook Post", "Innova Crysta", "Teesta River", "Cab Rental", "NH-10"],
    cameraInfo: "Facebook Fleet Showcase • NH-10",
    likesCount: 178
  },

  // -------------------------------------------------------------
  // INSTAGRAM FEED (@offbeatdestinationtravels)
  // -------------------------------------------------------------
  {
    id: "gal-ig-1",
    title: "Instagram @offbeatdestinationtravels: Golden Kanchenjunga Sunrise over Pelling Skywalk",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    socialSource: "Instagram",
    socialLink: "https://www.instagram.com/offbeatdestinationtravels",
    type: "photo",
    url: "/images/sikkim_hero_banner_1785680563996.jpg",
    highResUrl: "/images/sikkim_hero_banner_1785680563996.jpg",
    location: "Pelling Glass Skywalk & Sanga Choeling, West Sikkim",
    altitude: "7,200 ft",
    description: "Instagram highlight: The first morning rays striking the snow crowns of Mt. Kanchenjunga as seen from Pelling Skywalk. Plan your sunrise tour with OffbeatDestination.",
    tags: ["Instagram Reel", "Kanchenjunga", "Pelling Skywalk", "Sunrise", "@offbeatdestinationtravels"],
    cameraInfo: "Instagram 4K Post • West Sikkim",
    likesCount: 289,
    featured: true
  },
  {
    id: "gal-ig-2",
    title: "Instagram @offbeatdestinationtravels: Snowfall Expedition at Zero Point (15,300 ft)",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    socialSource: "Instagram",
    socialLink: "https://www.instagram.com/offbeatdestinationtravels",
    type: "photo",
    url: "/images/yumthang_zero_point_1785680592273.jpg",
    highResUrl: "/images/yumthang_zero_point_1785680592273.jpg",
    location: "Yumesamdong / Zero Point, North Sikkim",
    altitude: "15,300 ft",
    description: "Instagram viral reel: Fresh powder snow at Zero Point (15,300 ft) in North Sikkim. 4WD mountain SUV transfers and hot Maggie noodles at high altitude.",
    tags: ["Instagram Reel", "Zero Point", "North Sikkim", "Snow Adventure", "@offbeatdestinationtravels"],
    cameraInfo: "Instagram Reel Moment • 15,300 ft",
    likesCount: 345,
    featured: true
  },
  {
    id: "gal-ig-3",
    title: "Instagram @offbeatdestinationtravels: Paro Tiger's Nest Hike in Bhutan",
    destination: "Bhutan",
    serviceType: "Tour Packages",
    socialSource: "Instagram",
    socialLink: "https://www.instagram.com/offbeatdestinationtravels",
    type: "photo",
    url: "/images/bhutan_tigers_nest_1785681037397.jpg",
    highResUrl: "/images/bhutan_tigers_nest_1785681037397.jpg",
    location: "Paro Taktsang (Tiger's Nest Monastery), Bhutan",
    altitude: "10,240 ft",
    description: "Instagram story: Trekking up to cliffside Tiger's Nest with our Bhutanese certified guide. Full SDF processing and premium resort stays arranged effortlessly.",
    tags: ["Instagram Post", "Bhutan", "Tiger's Nest", "Paro", "@offbeatdestinationtravels"],
    cameraInfo: "Instagram 4K Story • Bhutan",
    likesCount: 232,
    featured: true
  },
  {
    id: "gal-ig-4",
    title: "Instagram @offbeatdestinationtravels: Darjeeling Toy Train Batasia Loop Heritage Track",
    destination: "Darjeeling",
    serviceType: "Tour Packages",
    socialSource: "Instagram",
    socialLink: "https://www.instagram.com/offbeatdestinationtravels",
    type: "photo",
    url: "/images/darjeeling_toy_train_1785681122611.jpg",
    highResUrl: "/images/darjeeling_toy_train_1785681122611.jpg",
    location: "Batasia Loop, Darjeeling",
    altitude: "7,000 ft",
    description: "Instagram capture: The UNESCO World Heritage DHR Steam Toy Train chugging around Batasia Loop with Mt. Kanchenjunga looming in the background.",
    tags: ["Instagram Reel", "Toy Train", "Darjeeling", "Batasia Loop", "@offbeatdestinationtravels"],
    cameraInfo: "Instagram Heritage Reel • Darjeeling",
    likesCount: 198
  },

  // -------------------------------------------------------------
  // VEHICLE SHOWCASE - TOYOTA INNOVA CRYSTA & HIMALAYAN FLEET
  // -------------------------------------------------------------
  {
    id: "gal-veh-1",
    title: "Toyota Innova Crysta Luxury Mountain Fleet (Gangtok & Airport)",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "photo",
    url: "/images/innova_crysta_cab_1785680577329.jpg",
    highResUrl: "/images/innova_crysta_cab_1785680577329.jpg",
    location: "Arithang Fleet Hub, Gangtok & Bagdogra IXB",
    altitude: "5,410 ft",
    description: "Our signature flagship Toyota Innova Crysta cabs. Equipped with plush captain seats, multi-zone climate control, heavy-duty hill suspension, and certified Himalayan drivers.",
    tags: ["Innova Crysta", "Luxury Cab", "Captain Seats", "Airport Transfer", "Mountain Fleet"],
    cameraInfo: "4K UHD • Verified Offbeat Fleet",
    likesCount: 189,
    featured: true
  },
  {
    id: "gal-veh-2",
    title: "Innova Crysta Mountain Drive Along Teesta River Valley",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "photo",
    url: "/images/innova_mountain_drive_1785681104445.jpg",
    highResUrl: "/images/innova_mountain_drive_1785681104445.jpg",
    location: "NH-10 Teesta River Valley Highway, Sikkim",
    altitude: "2,800 ft",
    description: "Smooth mountain cruising on the Siliguri-Gangtok highway. The Innova Crysta delivers unmatched stability around mountain curves and riverbank gorges.",
    tags: ["Innova Crysta", "Teesta Valley", "Mountain Drive", "Smooth Ride", "NH10 Highway"],
    cameraInfo: "High-Speed Dynamic Action Shot",
    likesCount: 134,
    featured: true
  },
  {
    id: "gal-veh-3",
    title: "Innova Crysta High-Altitude Snow Transit to Nathula Pass",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "photo",
    url: "/images/nathula_pass_snow_1785681052944.jpg",
    highResUrl: "/images/nathula_pass_snow_1785681052944.jpg",
    location: "Jawaharlal Nehru Road to Nathula (14,140 ft)",
    altitude: "14,140 ft",
    description: "High-altitude winter run up to Indo-China border. Anti-skid tire chains and experienced drivers ensure maximum passenger security in snow and ice.",
    tags: ["Innova Crysta", "Nathula Pass", "Snow Highway", "Border Permit", "High Altitude"],
    cameraInfo: "Sub-Zero Snow Altitude Capture",
    likesCount: 178,
    featured: true
  },
  {
    id: "gal-veh-4",
    title: "Innova Crysta Luxury Interior: Captain Seats & Luggage Space",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "photo",
    url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=85&w=1800",
    location: "OffbeatDestination Private Fleet Depot, Gangtok",
    altitude: "5,410 ft",
    description: "Inside look: Leather captain seating with armrests, dedicated USB charging ports, ample legroom, and cavernous luggage capacity for large family suitcases.",
    tags: ["Innova Crysta", "Interior", "Captain Seats", "Luxury Comfort", "Family Travel"],
    cameraInfo: "Studio Interior Detail Shot",
    likesCount: 156
  },
  {
    id: "gal-veh-5",
    title: "Innova Crysta Traversing Silk Route Zuluk Hairpin Bends",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "photo",
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=85&w=1800",
    location: "Zuluk Zig-Zag Silk Route, East Sikkim",
    altitude: "9,400 ft",
    description: "Navigating the 32 famous hairpin bends of the historic Old Silk Route with precision steering and experienced local mountain chauffeurs.",
    tags: ["Innova Crysta", "Silk Route", "Zuluk", "Hairpin Bends", "Adventure Transit"],
    cameraInfo: "High-Pass Scenic Landscape",
    likesCount: 145
  },
  {
    id: "gal-veh-6",
    title: "Mahindra Scorpio & Xylo 4WD Mountain Expedition Fleet",
    destination: "Sikkim",
    vehicleType: "Scorpio / Xylo",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "photo",
    url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=85&w=1800",
    location: "Lachen to Gurudongmar Lake Track (17,800 ft)",
    altitude: "17,800 ft",
    description: "Rugged 4x4 vehicles specially tuned for off-road Tibetan plateau terrain, rocky riverbeds, and unpaved high-altitude passes in North Sikkim.",
    tags: ["Scorpio 4x4", "Xylo", "North Sikkim", "Off-Road", "Gurudongmar"],
    cameraInfo: "4WD Mountain Terrain Capture",
    likesCount: 112
  },
  {
    id: "gal-veh-7",
    title: "Luxury Force Urbania & Tempo Traveller (12 to 26 Seater)",
    destination: "Sikkim",
    vehicleType: "Tempo Traveller",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "photo",
    url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=85&w=1800",
    location: "Darjeeling & Gangtok Corporate Route",
    altitude: "6,700 ft",
    description: "Spacious push-back recliner seats with individual AC vents and LED entertainment for corporate retreats, college groups, and large family reunions.",
    tags: ["Tempo Traveller", "Force Urbania", "Group Tour", "Corporate Fleet", "12-26 Seater"],
    cameraInfo: "Luxury Van High-Definition Shot",
    likesCount: 88
  },

  // -------------------------------------------------------------
  // DESTINATION: SIKKIM (SNOW PASSES, SACRED LAKES & MONASTERIES)
  // -------------------------------------------------------------
  {
    id: "gal-sik-1",
    title: "Glacial Tsomgo Changu Lake & Snow-Capped Peaks",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/images/sikkim_hero_banner_1785680563996.jpg",
    highResUrl: "/images/sikkim_hero_banner_1785680563996.jpg",
    location: "Tsomgo Lake (12,400 ft), East Sikkim",
    altitude: "12,400 ft",
    description: "Sacred high-altitude oval glacial lake reflecting the clouds. The lake surface remains frozen in winter and shifts azure blue during spring.",
    tags: ["Tsomgo Lake", "East Sikkim", "Frozen Lake", "Gangtok Tour", "Nathula Route"],
    cameraInfo: "Ultra HD Landscape • 12,400 ft",
    likesCount: 215,
    featured: true
  },
  {
    id: "gal-sik-2",
    title: "Sacred Gurudongmar Lake - High Tibetan Plateau (17,800 ft)",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=85&w=1800",
    location: "Gurudongmar Lake, North Sikkim",
    altitude: "17,800 ft",
    description: "One of the highest lakes in the world, blessed by Guru Padmasambhava. Even in peak freezing winter, a central portion of the sacred lake never freezes.",
    tags: ["Gurudongmar Lake", "North Sikkim", "Lachen", "High Altitude", "Tibet Plateau"],
    cameraInfo: "17,800 ft Extreme Altitude Shot",
    likesCount: 240,
    featured: true
  },
  {
    id: "gal-sik-3",
    title: "Yumthang Valley of Flowers & Hot Springs",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1800",
    location: "Yumthang Valley (11,800 ft), Lachung, North Sikkim",
    altitude: "11,800 ft",
    description: "Spectacular Himalayan valley with rolling alpine meadows, 24 varieties of Rhododendrons blooming in April-May, and natural curative hot springs.",
    tags: ["Yumthang Valley", "Rhododendrons", "Lachung", "Alpine Meadow", "Spring Bloom"],
    cameraInfo: "Wide-Angle Alpine Panorama",
    likesCount: 195
  },
  {
    id: "gal-sik-4",
    title: "Ravangla Tathagata Tsal (Buddha Park)",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/images/ravangla_buddha_park_1785680605794.jpg",
    highResUrl: "/images/ravangla_buddha_park_1785680605794.jpg",
    location: "Buddha Park, Ravangla, South Sikkim",
    altitude: "7,000 ft",
    description: "Grand 130-foot statue of Gautama Buddha consecrated by the 14th Dalai Lama, surrounded by lush spiritual gardens and Kanchenjunga views.",
    tags: ["Ravangla", "Buddha Park", "South Sikkim", "Monastery", "Dalai Lama"],
    cameraInfo: "Golden Hour Architectural Vista",
    likesCount: 162
  },
  {
    id: "gal-sik-5",
    title: "Pelling Glass Skywalk & Chenrezig Colossus",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=85&w=1800",
    location: "Sanga Choeling, Pelling, West Sikkim",
    altitude: "7,200 ft",
    description: "India's first glass skywalk overlooking deep Himalayan gorges and the world's tallest Chenrezig (Avalokiteshvara) statue in scenic West Sikkim.",
    tags: ["Pelling", "Glass Skywalk", "Chenrezig", "West Sikkim", "Kanchenjunga"],
    cameraInfo: "Aerial Perspective Panorama",
    likesCount: 183
  },
  {
    id: "gal-sik-6",
    title: "Authentic Lachung Wooden Hamlet in North Sikkim Snow",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&q=85&w=1800",
    location: "Lachung Village (8,600 ft), North Sikkim",
    altitude: "8,600 ft",
    description: "Picturesque traditional mountain settlement along the Lachung Chu river with wooden homestays, warm bukhari stoves, and organic local meals.",
    tags: ["Lachung", "Village Homestay", "North Sikkim", "Snow Village", "Bukhari"],
    cameraInfo: "Cozy Mountain Village Atmosphere",
    likesCount: 147
  },

  // -------------------------------------------------------------
  // DESTINATION: DARJEELING (TEA ESTATES, TOY TRAIN & TIGER HILL)
  // -------------------------------------------------------------
  {
    id: "gal-dar-1",
    title: "Rolling Organic Tea Estates & Kanchenjunga Vistas",
    destination: "Darjeeling",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highResUrl: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    location: "Happy Valley Tea Estate, Darjeeling",
    altitude: "6,800 ft",
    description: "Emerald green contoured tea terraces where world-famous Muscatel Darjeeling Champagne tea is hand-plucked with snow-capped mountain views.",
    tags: ["Darjeeling", "Tea Garden", "Happy Valley", "Organic Tea", "Queen of Hills"],
    cameraInfo: "Crisp Sunlit Valley Landscape",
    likesCount: 191,
    featured: true
  },
  {
    id: "gal-dar-2",
    title: "UNESCO Heritage Steam Toy Train at Batasia Loop",
    destination: "Darjeeling",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/images/darjeeling_toy_train_1785681122611.jpg",
    highResUrl: "/images/darjeeling_toy_train_1785681122611.jpg",
    location: "Batasia Loop War Memorial, Ghoom, Darjeeling",
    altitude: "7,000 ft",
    description: "The iconic 1881 Darjeeling Himalayan Railway vintage steam locomotive circling the 360-degree spiral loop with the Gorkha War Memorial.",
    tags: ["Toy Train", "Batasia Loop", "UNESCO Heritage", "Steam Engine", "Ghoom"],
    cameraInfo: "Historic Heritage Capture",
    likesCount: 228,
    featured: true
  },
  {
    id: "gal-dar-3",
    title: "Darjeeling Mall Road & Chowrasta Promenade",
    destination: "Darjeeling",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=85&w=1800",
    location: "Chowrasta Mall Road, Darjeeling",
    altitude: "6,700 ft",
    description: "Traffic-free pedestrian promenade lined with heritage bakeries, antique curio shops, horse rides, and benches offering open valley views.",
    tags: ["Mall Road", "Chowrasta", "Darjeeling Town", "Heritage Walk", "Shopping"],
    cameraInfo: "Golden Hour Street Photography",
    likesCount: 139
  },
  {
    id: "gal-dar-4",
    title: "Mirik Lake & Weeping Willow Pine Forest Walk",
    destination: "Darjeeling",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=85&w=1800",
    location: "Sumendu Lake, Mirik, Darjeeling Hills",
    altitude: "4,900 ft",
    description: "Tranquil natural lake with an arch footbridge, boating, cardamom plantations, and lush pine trails en route from Siliguri to Darjeeling.",
    tags: ["Mirik", "Sumendu Lake", "Boating", "Pine Forest", "Darjeeling Excursion"],
    cameraInfo: "Serene Lake Reflection Shot",
    likesCount: 121
  },

  // -------------------------------------------------------------
  // DESTINATION: BHUTAN (DZONGS, CLIFF MONASTERIES & HIMALAYAN PASSES)
  // -------------------------------------------------------------
  {
    id: "gal-bhu-1",
    title: "Paro Taktsang (Tiger's Nest Cliffside Monastery)",
    destination: "Bhutan",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/images/bhutan_tigers_nest_1785681037397.jpg",
    highResUrl: "/images/bhutan_tigers_nest_1785681037397.jpg",
    location: "Taktsang Trail, Paro Valley, Bhutan",
    altitude: "10,240 ft",
    description: "The jewel of the Kingdom of Bhutan: a sacred 17th-century monastery clinging dramatically to a vertical granite cliff 900m above Paro valley.",
    tags: ["Tiger's Nest", "Paro", "Bhutan Monastery", "Sacred Temple", "Himalayan Marvel"],
    cameraInfo: "National Geographic Caliber Clifftop Shot",
    likesCount: 275,
    featured: true
  },
  {
    id: "gal-bhu-2",
    title: "Buddha Dordenma (Giant Golden Shakyamuni Buddha)",
    destination: "Bhutan",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=85&w=1800",
    location: "Kuenselphodrang Hill, Thimphu, Bhutan",
    altitude: "8,200 ft",
    description: "A 51.5-meter bronze statue overlooking the capital city of Thimphu, housing over 100,000 smaller gilded bronze Buddha statues inside.",
    tags: ["Buddha Dordenma", "Thimphu", "Giant Buddha", "Bhutan Capital", "Spiritual"],
    cameraInfo: "High-Contrast Golden Statue Vista",
    likesCount: 184
  },
  {
    id: "gal-bhu-3",
    title: "Punakha Dzong - The Palace of Great Happiness",
    destination: "Bhutan",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=85&w=1800",
    location: "Pho Chhu & Mo Chhu Confluence, Punakha, Bhutan",
    altitude: "4,000 ft",
    description: "Regarded as Bhutan's most majestic fortress, situated at the sacred meeting point of the Father and Mother rivers, framed by purple jacaranda blossoms.",
    tags: ["Punakha Dzong", "River Confluence", "Bhutan Fortress", "Punakha Valley", "Royal Heritage"],
    cameraInfo: "Reflective Riverfront Architecture",
    likesCount: 204
  },
  {
    id: "gal-bhu-4",
    title: "Dochula Pass 108 Memorial Chortens & Himalayan Panorama",
    destination: "Bhutan",
    serviceType: "Tour Packages",
    type: "photo",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
    highResUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=85&w=1800",
    location: "Dochula Pass (10,170 ft), Thimphu to Punakha Highway",
    altitude: "10,170 ft",
    description: "108 Druk Wangyal memorial stupas set amidst pine forests, offering sweeping 360-degree views of snow-covered peaks like Mt. Gangkar Puensum.",
    tags: ["Dochula Pass", "108 Chortens", "Himalayan Ridge", "Bhutan Highway", "Mountain Vista"],
    cameraInfo: "High-Altitude Fog & Mountain Panorama",
    likesCount: 168
  },

  // -------------------------------------------------------------
  // BRAND PROMOTIONAL & REPUTATION ASSETS
  // -------------------------------------------------------------
  {
    id: "gal-14",
    title: "OffbeatDestination Official Poster - Sikkim, Darjeeling & Bhutan",
    destination: "Sikkim",
    serviceType: "Agency Info",
    type: "photo",
    url: "/images/agency_poster_dark_1785772843834.jpg",
    highResUrl: "/images/agency_poster_dark_1785772843834.jpg",
    location: "Arithang, Gangtok, Sikkim (Govt Registered Agency)",
    altitude: "5,410 ft",
    description: "Official promotional poster banner of OffbeatDestination Travels highlighting Gangtok, Darjeeling, and Bhutan custom itineraries with 4.9★ Google rating.",
    tags: ["Official Poster", "OffbeatDestination", "Gangtok Office", "4.9 Google Rating", "Govt License"],
    cameraInfo: "Agency Verified Branding",
    likesCount: 110
  },
  {
    id: "gal-15",
    title: "Gangtok Valley Vista & Agency Promotional Card",
    destination: "Sikkim",
    serviceType: "Agency Info",
    type: "photo",
    url: "/images/agency_card_banner_1785772861093.jpg",
    highResUrl: "/images/agency_card_banner_1785772861093.jpg",
    location: "WestPoint Mall / Rashmi Prasad Alley Margh, Gangtok",
    altitude: "5,410 ft",
    description: "Panoramic cloud-kissed mountain valley vista card showcasing 500+ verified traveler reviews and custom tour offerings.",
    tags: ["Agency Banner", "Valley View", "Verified Reviews", "Sikkim Tour"],
    cameraInfo: "Official Agency Card Artwork",
    likesCount: 95
  },
  {
    id: "gal-16",
    title: "Google 5-Star Verified Travel Agency Badge",
    destination: "Sikkim",
    serviceType: "Google Business Photos",
    isGoogleBusiness: true,
    googleBusinessDetails: {
      reviewerName: "Google Business Official",
      rating: 4.9,
      verifiedDate: "540+ Reviews Active",
      badgeText: "Google Top-Rated 4.9★",
      googleMapsLink: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
      photoType: "Owner Verification"
    },
    type: "photo",
    url: "/images/google_review_badge_1785772879766.jpg",
    highResUrl: "/images/google_review_badge_1785772879766.jpg",
    location: "Google Business Verified Badge",
    altitude: "Verified Badge",
    description: "Top-rated 4.9★ travel agency on Google based on 540+ authentic customer reviews for Sikkim, Darjeeling & Bhutan packages.",
    tags: ["Google Reviews", "5 Star Rating", "Trusted Operator", "Verified Agency", "4.9 Stars"],
    cameraInfo: "Google Verified Authority Badge",
    likesCount: 220
  },

  // -------------------------------------------------------------
  // VIDEO VISUAL EXPERIENCES
  // -------------------------------------------------------------
  {
    id: "gal-vid-1",
    title: "North Sikkim Snow Experience Video Tour",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "video",
    url: "/images/yumthang_zero_point_1785680592273.jpg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/5qap5aO4i9A",
    duration: "2:45",
    location: "Zero Point (Yumesamdong 15,300 ft)",
    altitude: "15,300 ft",
    description: "Traveler video diary showing real road conditions and snow beauty at Zero Point North Sikkim.",
    tags: ["Video Tour", "Zero Point", "Real Snow", "Customer Diary", "4K Video"],
    cameraInfo: "4K 60FPS Action Video",
    likesCount: 312
  },
  {
    id: "gal-vid-2",
    title: "Innova Crysta Ride Experience & Mountain Curves Video",
    destination: "Sikkim",
    vehicleType: "Innova Crysta",
    isVehicle: true,
    serviceType: "Cab Rentals",
    type: "video",
    url: "/images/innova_mountain_drive_1785681104445.jpg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4",
    duration: "1:30",
    location: "NJP to Gangtok Highway",
    altitude: "3,200 ft",
    description: "Video preview of luxury Innova Crysta ride comfort and driver mountain navigation skill.",
    tags: ["Video Drive", "Cab Comfort", "Driver Safety", "Innova Crysta Video"],
    cameraInfo: "In-Car 4K Dynamic Footage",
    likesCount: 268
  }
];

export const SYSTEM_KNOWLEDGE_BASE_PROMPT = `
Business Name: OffbeatDestination Travels
Tagline: A better way to explore
Location: Arithang, Gangtok, Sikkim - 737102
Contact Numbers: +91 62961 02341 / +91 98513 70773
WhatsApp: +91 62961 02341
Reputation: Government-registered travel agency in Sikkim, 4.9-star rating based on 500+ reviews. Known for flawless planning, professional drivers, and clean Innova Crysta cars.

Core Offerings & Itineraries:
1. 5 Nights / 6 Days Sikkim & Darjeeling Tour: Covers Darjeeling tea gardens & city tour, Gangtok sightseeing, Tsomgo Lake & Nathula Pass (Standard & Luxury 5★ Mayfair/Elgin options).
2. 7 Days / 6 Nights Grand Sikkim & Gurudongmar Expedition: Gangtok, Lachen, Gurudongmar Lake (17,800 ft), Lachung, Zero Point & Darjeeling.
3. 8 Days / 7 Nights Old Silk Route Zuluk & North Sikkim Circuit: Reshi Khola, Zuluk 30+ hairpin bends, Nathang Valley, Kupup Lake, Lachung, Zero Point & Darjeeling.
4. 9 Days / 8 Nights Complete Sikkim, Pelling Skywalk & Darjeeling: Gangtok, Gurudongmar Lake, Zero Point, Ravangla Buddha Park, Pelling Glass Skywalk & Darjeeling.
5. 10 Days / 9 Nights Ultimate Sikkim, Bhutan Border & Darjeeling Grand Odyssey: All 4 Sikkim districts, Gurudongmar, Zero Point, Nathula Pass, Pelling Skywalk, Namchi Char Dham, Phuntsholing Bhutan Gate & Darjeeling.
6. North Sikkim Tours: Lachung, Yumthang Valley, Zero Point, Gurudongmar Lake & Mount Katao with full permit assistance.
7. South & West Sikkim Offbeat Routes: Namthang village stays, Tarey Bhir, Ravangla Buddha Park, Temi Tea Garden, and Pelling Skywalk.
8. Custom Bhutan Cultural Tours: Paro, Thimphu, Punakha, Tiger's Nest.
9. Cab Rentals: Dedicated private pickups from NJP Station and Bagdogra Airport (IXB) using Innova Crystas, Xylos, and Tempo Travellers.

Special Preferences Handled:
- Pure vegetarian meal coordination (AP and MAP plans).
- Safe, stable monsoon and seasonal routes.
- Family and couple-friendly custom itineraries.

Lead Generation Objective:
Whenever a user asks for prices, custom itineraries, vehicle availability, or permits, give them a warm, highly helpful answer, and end by asking for their WhatsApp number/Phone number so our Sikkim travel experts can send the exact itinerary PDF, vehicle lock confirmation, and best discounted quote!
`;

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  home: {
    title: 'OffbeatDestination Travels - Official Sikkim & Darjeeling Tour Operator',
    description: 'Book customizable 5N/6D Sikkim & Darjeeling tour packages, luxury Innova Crysta cab rentals, and North Sikkim Zero Point trips with Govt Registered Sikkim travel agency.',
    canonicalUrl: 'https://offbeatdestination.in/#home',
    keywords: 'Sikkim tour packages, Gangtok travel agency, Darjeeling tour, Nathula pass permit, Innova Crysta cab Sikkim',
  },
  packages: {
    title: 'Book Sikkim & Darjeeling Tour Packages | Offbeat Destination Travels',
    description: 'Explore 5N/6D, 6N/7D, 7N/8D Sikkim Darjeeling itineraries, North Sikkim Lachung & Zero Point 15,300ft packages, and luxury heritage stays with transparent pricing.',
    canonicalUrl: 'https://offbeatdestination.in/#packages',
    keywords: 'Book Sikkim tours, Gangtok holiday packages, Yumthang valley tour, Nathula permit package, Darjeeling trip, Zero Point Sikkim',
  },
  cabs: {
    title: 'Gangtok Taxi & Cab Rentals | Innova Crysta, Sedan & Hatchback | Offbeat Destination',
    description: 'Rent Toyota Innova Crysta, Mahindra Xylo, 4-seater Swift Dzire sedans, and budget hatchbacks for NJP station / Bagdogra IXB airport pickup and Sikkim sightseeings.',
    canonicalUrl: 'https://offbeatdestination.in/#cabs',
    keywords: 'Gangtok cab rental, Innova Crysta hire Sikkim, Swift Dzire taxi Gangtok, NJP to Gangtok taxi, Bagdogra airport cab rate, budget Sikkim cab',
  },
  hotels: {
    title: 'Affiliated 3★ & 4★ Hotels in Gangtok, Pelling & Darjeeling | Offbeat Destination',
    description: 'Partner luxury hotels, heritage resorts, and cozy Lachung homestays verified for safety, hot water, and pure vegetarian meal facilities.',
    canonicalUrl: 'https://offbeatdestination.in/#hotels',
    keywords: 'Gangtok hotels, Pelling resorts, Lachung homestay, Darjeeling hotel booking',
  },
  offers: {
    title: 'Exclusive Sikkim Travel Deals & Seasonal Discounts | Offbeat Destination',
    description: 'Limited-time seasonal offers on family packages, honeymoon specials, and group discounts for Sikkim & Darjeeling travel.',
    canonicalUrl: 'https://offbeatdestination.in/#offers',
    keywords: 'Sikkim tour discount, honeymoon offer Gangtok, Darjeeling travel deals',
  },
  gallery: {
    title: 'Sikkim & Darjeeling Tour Photo & Video Gallery | Offbeat Destination',
    description: 'Browse real authentic traveler photographs from Yumthang Valley, Zero Point, Nathula Pass, Tsomgo Lake, and Pelling Skywalk.',
    canonicalUrl: 'https://offbeatdestination.in/#gallery',
    keywords: 'Sikkim photo gallery, Zero Point images, Yumthang valley photos, Gangtok scenery',
  },
  reviews: {
    title: 'Customer Reviews & Ratings | Offbeat Destination Travels Sikkim',
    description: 'Read 520+ verified 5-star traveler reviews for Gangtok tour packages, driver safety, Nathula pass permit handling, and pure veg/Jain meal options.',
    canonicalUrl: 'https://offbeatdestination.in/#reviews',
    keywords: 'OffbeatDestination reviews, Sikkim tour feedback, Gangtok travel agency rating, Sikkim travel experiences',
  },
  faqs: {
    title: 'Sikkim Travel FAQs & Border Permit Rules | Offbeat Destination',
    description: 'Everything you need to know about Sikkim travel: best time to visit, Nathula Pass ILP rules, Zero Point weather, and pure veg food availability.',
    canonicalUrl: 'https://offbeatdestination.in/#faqs',
    keywords: 'Sikkim travel permit rules, Nathula pass documents, North Sikkim weather, Gangtok travel tips',
  },
  checklist: {
    title: 'Essential Sikkim Travel Checklist & Packing Guide | Offbeat Destination',
    description: 'Complete packing checklist for Sikkim & Darjeeling trips: thermal wear, permit documents, ID requirements, camera tips, and altitude medicine.',
    canonicalUrl: 'https://offbeatdestination.in/#checklist',
    keywords: 'Sikkim travel packing checklist, what to carry in Sikkim, Nathula pass documents',
  },
  location: {
    title: 'Gangtok Office Map & Contact Details | Offbeat Destination Travels',
    description: 'Visit our Sikkim Govt Registered Office at Arithang, Gangtok. Direct phone +91 62961 02341 & official WhatsApp support.',
    canonicalUrl: 'https://offbeatdestination.in/#location',
    keywords: 'Offbeat Destination Gangtok address, Sikkim travel agency office, Gangtok tour operator phone number',
  },
  about: {
    title: 'About Us | Offbeat Destination Travels - Local Sikkim Travel Agency',
    description: 'Learn about M/s Offbeat Destination Sikkim Tours & Travels, Govt Registration 1750/DoT&CAv/Gtk/25/TA, located in Arithang, Gangtok.',
    canonicalUrl: 'https://offbeatdestination.in/#about',
    keywords: 'About Offbeat Destination Sikkim, Gangtok travel company, local Sikkim travel agent',
  },
  contact: {
    title: 'Contact Us & Plan My Trip | Offbeat Destination Travels Gangtok',
    description: 'Get in touch with local Sikkim travel experts for custom itineraries, cab rentals, and group tour inquiries.',
    canonicalUrl: 'https://offbeatdestination.in/#contact',
    keywords: 'Contact Offbeat Destination, Gangtok travel contact, Sikkim tour inquiry',
  },
};

