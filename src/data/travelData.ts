import { TourPackage, CabOption, CustomerReview, GalleryItem, SeoSettings } from '../types';

export const AGENCY_DETAILS = {
  name: "OffbeatDestination Travels",
  legalName: "M/s Offbeat Destination Sikkim Tours & Travels",
  tagline: "A better way to explore",
  location: "Arithang, Gangtok, Sikkim - 737102",
  phonePrimary: "+91 62961 02341",
  phoneSecondary: "+91 98513 70773",
  whatsappNumber: "916296102341",
  email: "info@offbeatdestination.in",
  domain: "offbeatdestination.in",
  websiteUrl: "https://offbeatdestination.in",
  googleMapsUrl: "https://maps.app.goo.gl/yMzj2AQ8QBGrzBQm7",
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
  logoUrl: "/src/assets/images/official_logo.jpg",
  officePhoto: "/src/assets/images/gmb_office_photo_1786168516883.jpg",
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
  heroImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
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
    "Customizable Meals: Non-Veg (Local Chicken/Fish), Pure Veg, Strict Jain & Halal options"
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
  sharedTourDetails: "Nathula Pass & Tsomgo Lake Day Trip sharing seat in Innova/Xylo available at ₹1,200/seat with permits."
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
  heroImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
  highlights: [
    "5★ Heritage Luxury Resort stays (Mayfair Spa Resort Gangtok & Elgin/Windamere Darjeeling)",
    "VIP Executive Innova Crysta (Captain Seats) with personal chauffeur & Wi-Fi",
    "Guaranteed VIP Nathula Pass & Tsomgo Lake army permit clearance with warm oxygen support",
    "Exclusive Tiger Hill VIP viewing terrace & Glenary's Bakery high-tea session",
    "Complimentary 45-min foot reflexology spa session & welcome bottle of Himalayan wine",
    "Full Board Gourmet Meals (AP Plan: Multi-cuisine, Pure Veg, Strict Jain, or Halal)"
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
    "Full Board Gourmet Meals (AP Plan: Multi-cuisine, Pure Veg, Strict Jain or Halal)",
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
    heroImage: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
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
    sharedTourDetails: "North Sikkim 2N/3D (Mandatory 2 Night Lachung Stay) shared Scorpio seat at ₹4,800/seat including stays, AP meals & permits."
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
    heroImage: "/src/assets/images/ravangla_buddha_park_1785680605794.jpg",
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
    heroImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
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
    heroImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
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
    sharedTourDetails: "Nathula Pass Day Trip sharing seat available at ₹1,200 per head."
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
    heroImage: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
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
    heroImage: "/src/assets/images/ravangla_buddha_park_1785680605794.jpg",
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
    heroImage: "/src/assets/images/agency_poster_dark_1785772843834.jpg",
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
    heroImage: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
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
    heroImage: "/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg",
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
    heroImage: "/src/assets/images/darjeeling_toy_train_1785681122611.jpg",
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
    vegMealsAvailable: true
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
    heroImage: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
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
    heroImage: "/src/assets/images/agency_poster_dark_1785772843834.jpg",
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
    heroImage: "/src/assets/images/ravangla_buddha_park_1785680605794.jpg",
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
    heroImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "The ultimate 10-day Himalayan circuit across Sikkim, Bhutan Border & Darjeeling",
      "Gurudongmar Sacred Lake (17,800 ft), Yumthang Valley & Zero Point North Sikkim",
      "Tsomgo Lake & Nathula Pass Indo-China Border army permits",
      "Pelling Glass Skywalk, Rabdentse Ruins & Rimbi Waterfalls",
      "Ravangla Buddha Park, Namchi Char Dham & Temi Tea Estate",
      "Phuntsholing Bhutan Gate excursion & Darjeeling Tiger Hill Kanchenjunga sunrise",
      "VIP Innova Crysta transfers with custom meal options (Pure Veg / Non-Veg / Jain / Halal)"
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
    heroImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
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
    heroImage: "/src/assets/images/agency_poster_dark_1785772843834.jpg",
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
    heroImage: "/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg",
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
    heroImage: "/src/assets/images/darjeeling_toy_train_1785681122611.jpg",
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
  }
];

export interface HotelChainPartner {
  id: string;
  name: string;
  tagline: string;
  starCategory: string;
  badge: string;
  logoText: string;
  coverImage: string;
  locations: string[];
  featuredProperties: string[];
  keyPerks: string[];
  description: string;
  websiteUrl?: string;
}

export const AFFILIATED_HOTEL_CHAINS: HotelChainPartner[] = [
  {
    id: "partner-jain-group",
    name: "Jain Group of Hotels & Resorts",
    tagline: "100% Pure Vegetarian Hospitality & Luxury Stays in Sikkim & Darjeeling",
    starCategory: "3★ & 4★ Luxury Pure Veg Stays",
    badge: "Pure Veg & Jain Special Partner",
    logoText: "JAIN GROUP",
    coverImage: "/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg",
    locations: ["Gangtok", "Darjeeling", "Siliguri", "Pelling", "Kalimpong"],
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
    id: "partner-summit",
    name: "Summit Hotels & Resorts",
    tagline: "Himalayan Hospitality at its Finest",
    starCategory: "3★ & 4★ Premium View Hotels",
    badge: "Official Chain Partner",
    logoText: "SUMMIT",
    coverImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
    locations: ["Gangtok", "Darjeeling", "Pelling", "Lachung", "Kalimpong"],
    featuredProperties: [
      "Summit Denzong Hotel & Spa (Gangtok)",
      "Summit Grace Hotel & Spa (Darjeeling)",
      "Summit Dragon's Delight (Pelling)",
      "Summit Golden Crescent (Gangtok)",
      "Summit Oriental (Gangtok)"
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
    coverImage: "/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg",
    locations: ["Darjeeling", "Gangtok", "Pelling", "Siliguri"],
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
    id: "partner-mayfair",
    name: "Mayfair Hotels & Resorts",
    tagline: "5★ Ultra-Luxury Spa & Casino Heritage",
    starCategory: "5★ Luxury Spa & Casino",
    badge: "Official 5★ Luxury Partner",
    logoText: "MAYFAIR",
    coverImage: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
    locations: ["Gangtok", "Darjeeling"],
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
    id: "partner-yashshree",
    name: "Yashshree Hotels & Resorts",
    tagline: "Elegance & Heritage Comfort in the Hills",
    starCategory: "3★ & 4★ Heritage Boutique Stays",
    badge: "Official Chain Partner",
    logoText: "YASHSHREE",
    coverImage: "/src/assets/images/darjeeling_toy_train_1785681122611.jpg",
    locations: ["Darjeeling", "Gangtok", "Kalimpong"],
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
    id: "partner-sterling",
    name: "Sterling Resorts",
    tagline: "Memorable Holiday Experiences Guaranteed",
    starCategory: "4★ Premium Vacation Resorts",
    badge: "Official Resort Partner",
    logoText: "STERLING",
    coverImage: "/src/assets/images/ravangla_buddha_park_1785680605794.jpg",
    locations: ["Gangtok", "Darjeeling"],
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
    id: "partner-rufina",
    name: "Rufina Hotels & Resorts",
    tagline: "Comfortable & Economical Hill Station Stays",
    starCategory: "Deluxe & 3★ Comfort Hotels",
    badge: "Official Value Partner",
    logoText: "RUFINA",
    coverImage: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
    locations: ["Gangtok", "Darjeeling", "Pelling", "Lachung"],
    featuredProperties: [
      "Rufina Lachung Grand (North Sikkim)",
      "Rufina Gangtok Heritage",
      "Rufina Pelling Mountain View",
      "Rufina Darjeeling Mall Road"
    ],
    keyPerks: [
      "Best Value Budget Deluxe Packages",
      "24/7 Hot Water & Power Backup in North Sikkim",
      "Home-cooked Sikkimese & North Indian AP Meals",
      "Convenient Central Locations"
    ],
    description: "Dependable, comfortable, and highly affordable stays with excellent service and hot meals in high-altitude destinations like Lachung and Gangtok."
  },
  {
    id: "partner-voyage",
    name: "Voyage Hotels & Resorts",
    tagline: "Serene Boutique Escapes & Tea Garden Heritage",
    starCategory: "3★ Deluxe & Tea Garden Stays",
    badge: "Official Chain Partner",
    logoText: "VOYAGE",
    coverImage: "/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg",
    locations: ["Darjeeling", "Gangtok", "Pelling", "Kalimpong"],
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

export const CAB_OPTIONS: CabOption[] = [
  {
    id: "cab-innova-crysta",
    model: "Toyota Innova Crysta",
    type: "Luxury SUV",
    capacity: "6-7 Passengers + Luggage",
    bestFor: "Families, Couples, North Sikkim (2N Lachung) & Nathula Pass Army Permits",
    ratePerDay: 4500,
    njpIxbPickupRate: 3800,
    image: "/src/assets/images/innova_crysta_cab_1785680577329.jpg",
    features: [
      "✓ Fully Approved for North Sikkim (2N Lachung) & Nathula Pass Army Permits",
      "Captain Seats with plush leather cushioning",
      "Rear dual-zone air conditioning & heating",
      "Extra boot space for mountain luggage",
      "Professional hill-certified drivers with 10+ yrs experience"
    ]
  },
  {
    id: "cab-xylo-scorpio",
    model: "Mahindra Xylo / Scorpio 4x4",
    type: "Rugged Mountain SUV",
    capacity: "6 Passengers",
    bestFor: "North Sikkim 2N Lachung, Zero Point & High Altitude Terrain",
    ratePerDay: 4000,
    njpIxbPickupRate: 3400,
    image: "/src/assets/images/innova_crysta_cab_1785680577329.jpg",
    features: [
      "✓ Fully Approved for North Sikkim Restricted Area Permit (PAP)",
      "High ground clearance for snow & rocky mountain roads",
      "All-wheel drive stability for steep climbs & Zero Point",
      "Experienced local drivers adept at snow chain handling"
    ]
  },
  {
    id: "cab-sedan-dzire",
    model: "Swift Dzire / Toyota Etios",
    type: "4-Seater Sedan",
    capacity: "4 Passengers + Luggage",
    bestFor: "Couples, NJP/IXB drops, Gangtok & Darjeeling Local (NOT Allowed for North Sikkim / Nathula Pass)",
    ratePerDay: 3200,
    njpIxbPickupRate: 2800,
    image: "/src/assets/images/innova_mountain_drive_1785681104445.jpg",
    features: [
      "❌ Strictly NOT PERMITTED for North Sikkim or Nathula Pass permits",
      "Comfortable 4-seater executive sedan with boot space",
      "Clean air-conditioned interior for Gangtok local & Darjeeling transfers",
      "Hill-certified polite local chauffeur"
    ]
  },
  {
    id: "cab-hatchback-wagonr",
    model: "WagonR / Swift / Alto",
    type: "4-Seater Hatchback",
    capacity: "3-4 Passengers",
    bestFor: "Budget Travelers, Gangtok Town Point Drops (NOT Allowed for North Sikkim / Nathula Pass)",
    ratePerDay: 2500,
    njpIxbPickupRate: 2200,
    image: "/src/assets/images/innova_mountain_drive_1785681104445.jpg",
    features: [
      "❌ Strictly NOT PERMITTED for North Sikkim or Nathula Pass permits",
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
    photoUrl: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
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
    photoUrl: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
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
    photoUrl: "/src/assets/images/innova_crysta_cab_1785680577329.jpg",
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
    photoUrl: "/src/assets/images/bhutan_tigers_nest_1785681037397.jpg",
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
  {
    id: "gal-0",
    title: "OffbeatDestination Gangtok Registered Office (Google My Business)",
    destination: "Sikkim",
    serviceType: "Agency Info",
    type: "photo",
    url: "/src/assets/images/gmb_office_photo_1786168516883.jpg",
    location: "Arithang, Gangtok (Near MG Marg), Sikkim",
    description: "Official Govt Registered travel office and Google My Business verified booking center in Gangtok.",
    tags: ["Google My Business", "Gangtok Office", "Govt Registered", "Sikkim Travel Agency"]
  },
  {
    id: "gal-1",
    title: "High Altitude Tsomgo Lake & Snow Peaks",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/sikkim_hero_banner_1785680563996.jpg",
    location: "Tsomgo Lake (12,400 ft), East Sikkim",
    description: "Glacial lake surrounded by snow-capped peaks on the way to Nathula Pass border.",
    tags: ["Tsomgo Lake", "Nathula Pass", "Gangtok", "Snow"]
  },
  {
    id: "gal-2",
    title: "Yumthang Valley & Zero Point Snow Drive",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
    location: "Yumesamdong / Zero Point (15,300 ft), North Sikkim",
    description: "Year-round snow experience near Tibet border in North Sikkim.",
    tags: ["Zero Point", "Yumthang Valley", "Lachung", "North Sikkim"]
  },
  {
    id: "gal-3",
    title: "Ravangla Buddha Park & Mountain View",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/ravangla_buddha_park_1785680605794.jpg",
    location: "Buddha Park, Ravangla, South Sikkim",
    description: "130-foot Golden Buddha statue set against Mount Kanchenjunga backdrop.",
    tags: ["Ravangla", "Buddha Park", "South Sikkim", "Monastery"]
  },
  {
    id: "gal-4",
    title: "Nathula Pass Border & Snow Highway",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/nathula_pass_snow_1785681052944.jpg",
    location: "Indo-China Border, Nathula Pass (14,140 ft)",
    description: "Protected border zone trip with full permit coordination by OffbeatDestination.",
    tags: ["Nathula Pass", "Indo-China Border", "Permits", "Snow Highway"]
  },
  {
    id: "gal-5",
    title: "Luxury Innova Crysta Airport & NJP Fleet",
    destination: "Sikkim",
    serviceType: "Cab Rentals",
    type: "photo",
    url: "/src/assets/images/innova_crysta_cab_1785680577329.jpg",
    location: "Bagdogra Airport (IXB) / NJP Station",
    description: "Plush Toyota Innova Crysta with captain seats, dual AC, and hill-certified driver.",
    tags: ["Innova Crysta", "Airport Pickup", "NJP Station", "Cab Rental"]
  },
  {
    id: "gal-6",
    title: "Toyota Innova Mountain Drive to Gangtok",
    destination: "Sikkim",
    serviceType: "Cab Rentals",
    type: "photo",
    url: "/src/assets/images/innova_mountain_drive_1785681104445.jpg",
    location: "Teesta River Valley Highway, Sikkim",
    description: "Smooth mountain transit along Teesta River valley with experienced local drivers.",
    tags: ["Innova Drive", "Mountain Highway", "Private Cab", "Safety"]
  },
  {
    id: "gal-7",
    title: "Darjeeling Rolling Tea Gardens & Kanchenjunga",
    destination: "Darjeeling",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg",
    location: "Happy Valley Tea Estate, Darjeeling",
    description: "Lush organic tea garden stroll with panoramic Himalayan mountain vistas.",
    tags: ["Darjeeling", "Tea Garden", "Tiger Hill", "Kanchenjunga"]
  },
  {
    id: "gal-8",
    title: "Heritage Steam Toy Train at Batasia Loop",
    destination: "Darjeeling",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/darjeeling_toy_train_1785681122611.jpg",
    location: "Batasia Loop War Memorial, Darjeeling",
    description: "UNESCO World Heritage Darjeeling Himalayan Railway steam engine.",
    tags: ["Toy Train", "Batasia Loop", "Heritage Railway", "Darjeeling"]
  },
  {
    id: "gal-9",
    title: "Darjeeling Airport Pickup & Sightseeing Cab",
    destination: "Darjeeling",
    serviceType: "Cab Rentals",
    type: "photo",
    url: "/src/assets/images/innova_crysta_cab_1785680577329.jpg",
    location: "Bagdogra IXB to Darjeeling Town",
    description: "Comfortable pickup and 7-points city tour cab in Darjeeling.",
    tags: ["Darjeeling Cab", "Airport Transfer", "Tiger Hill Pickup"]
  },
  {
    id: "gal-10",
    title: "Taktsang Tiger's Nest Monastery Hike",
    destination: "Bhutan",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/bhutan_tigers_nest_1785681037397.jpg",
    location: "Paro Valley, Bhutan",
    description: "Cliffside sacred monastery perched 900 meters above Paro valley floor.",
    tags: ["Tiger's Nest", "Paro", "Bhutan Tour", "Cultural Odyssey"]
  },
  {
    id: "gal-11",
    title: "Bhutan Private Tourist Vehicle Transit",
    destination: "Bhutan",
    serviceType: "Cab Rentals",
    type: "photo",
    url: "/src/assets/images/innova_mountain_drive_1785681104445.jpg",
    location: "Phuntsholing to Thimphu & Paro Highway",
    description: "Licensed Bhutanese tourist vehicle with dedicated guide & driver.",
    tags: ["Bhutan Cab", "Thimphu Drive", "Paro Airport Drop", "Guided Transit"]
  },
  {
    id: "gal-12",
    title: "North Sikkim Snow Experience Video Tour",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "video",
    url: "/src/assets/images/yumthang_zero_point_1785680592273.jpg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/5qap5aO4i9A",
    duration: "2:45",
    location: "Zero Point (Yumesamdong 15,300 ft)",
    description: "Traveler video diary showing real road conditions and snow beauty at Zero Point North Sikkim.",
    tags: ["Video Tour", "Zero Point", "Real Snow", "Customer Diary"]
  },
  {
    id: "gal-13",
    title: "Innova Crysta Ride Experience & Mountain Curves Video",
    destination: "Sikkim",
    serviceType: "Cab Rentals",
    type: "video",
    url: "/src/assets/images/innova_mountain_drive_1785681104445.jpg",
    videoEmbedUrl: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4",
    duration: "1:30",
    location: "NJP to Gangtok Highway",
    description: "Video preview of luxury Innova Crysta ride comfort and driver mountain navigation skill.",
    tags: ["Video Drive", "Cab Comfort", "Driver Safety"]
  },
  {
    id: "gal-14",
    title: "OffbeatDestination Official Poster - Sikkim, Darjeeling & Bhutan",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/agency_poster_dark_1785772843834.jpg",
    location: "Arithang, Gangtok, Sikkim (Govt Registered Agency)",
    description: "Official promotional poster banner of OffbeatDestination Travels highlighting Gangtok, Darjeeling, and Bhutan custom itineraries with 4.9★ Google rating.",
    tags: ["Official Poster", "OffbeatDestination", "Gangtok Office", "4.9 Google Rating"]
  },
  {
    id: "gal-15",
    title: "Gangtok Valley Vista & Agency Promotional Card",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/agency_card_banner_1785772861093.jpg",
    location: "WestPoint Mall / Rashmi Prasad Alley Margh, Gangtok",
    description: "Panoramic cloud-kissed mountain valley vista card showcasing 500+ verified traveler reviews and custom tour offerings.",
    tags: ["Agency Banner", "Valley View", "Verified Reviews", "Sikkim Tour"]
  },
  {
    id: "gal-16",
    title: "Google 5-Star Verified Travel Agency Badge",
    destination: "Sikkim",
    serviceType: "Tour Packages",
    type: "photo",
    url: "/src/assets/images/google_review_badge_1785772879766.jpg",
    location: "Google Business Verified Badge",
    description: "Top-rated 4.9★ travel agency on Google based on 520+ authentic customer reviews for Sikkim, Darjeeling & Bhutan packages.",
    tags: ["Google Reviews", "5 Star Rating", "Trusted Operator", "Verified Agency"]
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

