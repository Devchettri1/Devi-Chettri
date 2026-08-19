import { TourPackage } from '../types';

export const ADDITIONAL_PACKAGES: TourPackage[] = [
  {
    id: "pkg-north-sikkim-3n4d-lachen-lachung",
    title: "3 Nights / 4 Days North Sikkim Alpine Odyssey: Lachen, Gurudongmar Lake & Lachung Zero Point",
    duration: "3 Nights / 4 Days",
    location: "Lachen (1N), Gurudongmar Lake (17,800 ft), Lachung (2N), Yumthang Valley & Zero Point",
    category: "North Sikkim",
    priceStarting: 16800,
    rating: 5.0,
    reviewsCount: 142,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Sacred Gurudongmar Lake (17,800 ft) high altitude plateau expedition near Tibet border",
      "Mandatory 2-Night Lachung stay for optimal acclimatization and scenic relaxation",
      "Yumthang Valley of Flowers (11,800 ft) and snow-covered Zero Point (15,300 ft)",
      "High ground clearance 4WD Heavy SUV (Scorpio / Innova) with snow chains",
      "Protected Area Permits (PAP) & army checkpoint clearances included"
    ],
    itinerary: [
      {
        day: 1,
        title: "Gangtok to Lachen Village (9,000 ft) via Waterfalls",
        description: "Morning departure from Gangtok in 4WD SUV. Enroute stops at Kabi Lungchok, Seven Sisters Waterfalls, Mangan viewpoint, and Chungthang river confluence. Reach picturesque Lachen village for overnight stay."
      },
      {
        day: 2,
        title: "Gurudongmar Lake (17,800 ft) to Lachung Valley",
        description: "4:00 AM journey across cold alpine Tibetan plateau to sacred Gurudongmar Lake (17,800 ft). Return to Lachen for hot lunch and drive through pine valleys to Lachung village for first night stay."
      },
      {
        day: 3,
        title: "Yumthang Valley, Zero Point (15,300 ft) & Katao Snow Slopes",
        description: "Excursion to blooming Yumthang Valley and snowbound Zero Point (Yumesamdong). Optional detour to Mount Katao snow slopes. Second night in Lachung ensures leisurely mountain relaxation."
      },
      {
        day: 4,
        title: "Lachung to Gangtok Return via Bhim Nala & Naga Waterfalls",
        description: "Scenic return drive to Gangtok with stops at Bhim Nala and Singhik Viewpoint overlooking Mount Kanchenjunga. Evening drop at Gangtok hotel."
      }
    ],
    included: [
      "Heavy 4WD Scorpio / Innova SUV throughout with experienced snow driver",
      "3 Nights hotel accommodation with all meals included (AP Plan: Breakfast, Lunch, Dinner)",
      "All North Sikkim Protected Area Permits (PAP) and army checkpoint coordination",
      "Emergency high-altitude oxygen cylinder on standby in vehicle"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 14500, hotelType: "Deluxe Mountain Wooden Lodges & Homestays" },
      premium: { price: 16800, hotelType: "3-Star Premium View Hotels in Lachen & Lachung" },
      luxury: { price: 24500, hotelType: "4-Star Alpine Pinewood Luxury Resorts & Suites" }
    },
    isSharedTourAvailable: true,
    sharedPricePerSeat: 5500,
    sharedTourDetails: "Lachen-Gurudongmar-Lachung 3N/4D shared Scorpio seat at ₹5,500/seat with AP meals & permits."
  },
  {
    id: "pkg-north-sikkim-4n5d-grand-alpine",
    title: "4 Nights / 5 Days In-Depth North Sikkim Glacial Odyssey: Gangtok, Lachen, Gurudongmar & Lachung",
    duration: "4 Nights / 5 Days",
    location: "Gangtok (1N), Lachen (1N), Lachung (2N), Gurudongmar Lake, Zero Point & Katao",
    category: "North Sikkim",
    priceStarting: 19500,
    rating: 4.9,
    reviewsCount: 98,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Complete North Sikkim circuit with zero rush and dedicated buffer days",
      "Gurudongmar Lake (17,800 ft), Chopta Valley, Yumthang Valley & Zero Point",
      "Exclusive excursion to Mount Katao alpine snow region",
      "Hot Sikkimese organic farm meals and village walks in Lachung and Lachen",
      "Full Board All-Meals (AP Plan) and army Protected Area Permits (PAP)"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Gangtok",
        description: "Chauffeur pickup in private SUV from Bagdogra Airport or NJP station. Drive along Teesta River to Gangtok. Evening permit briefing and walk at MG Marg."
      },
      {
        day: 2,
        title: "Gangtok to Lachen Village via Seven Sisters Waterfalls",
        description: "Scenic mountain drive into North Sikkim. Visit Singhik Viewpoint and Chungthang confluence. Night stay at tranquil Lachen village."
      },
      {
        day: 3,
        title: "Gurudongmar Lake (17,800 ft) & Transfer to Lachung",
        description: "Early morning expedition to sacred Gurudongmar Lake. Return to Lachen for lunch and scenic transfer to Lachung village for first night stay."
      },
      {
        day: 4,
        title: "Yumthang Valley of Flowers, Zero Point & Mount Katao",
        description: "Explore rhododendron valleys, Zero Point snowfields, and Mount Katao slopes. Hot noodles and tea by the river. Second night stay at Lachung."
      },
      {
        day: 5,
        title: "Lachung to Gangtok Return via Naga Waterfalls",
        description: "Relaxed breakfast and scenic return drive to Gangtok with photography stops along the Teesta River gorge."
      }
    ],
    included: [
      "Private 4WD Scorpio / Innova vehicle throughout with dedicated mountain driver",
      "4 Nights accommodation (1N Gangtok, 1N Lachen, 2N Lachung) with daily meals",
      "All North Sikkim Protected Area Permits (PAP) & environmental cess charges",
      "Tolls, parking, fuel, and driver allowances"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 17500, hotelType: "Comfort Mountain Lodges & Deluxe Gangtok Hotel" },
      premium: { price: 19500, hotelType: "3-Star Summit / Udaan & Lachung Wooden View Hotels" },
      luxury: { price: 28900, hotelType: "Mayfair Gangtok & Alpine Luxury Pinewood Resorts" }
    }
  },
  {
    id: "pkg-silkroute-3n4d-express",
    title: "3 Nights / 4 Days Old Silk Route Express: Sillery Gaon, Zuluk Zig-Zag & Nathang Valley",
    duration: "3 Nights / 4 Days",
    location: "Sillery Gaon (1N), Zuluk (1N) & Gangtok (1N)",
    category: "Silk Route",
    priceStarting: 12500,
    rating: 4.9,
    reviewsCount: 110,
    heroImage: "/images/agency_poster_dark_1785772843834.jpg",
    highlights: [
      "Experience the 32 legendary hairpin loops of historic Zuluk Zig-Zag road",
      "Sunrise over Mount Kanchenjunga from Thambi Viewpoint (11,200 ft)",
      "High altitude Nathang Valley (13,500 ft), Old Baba Mandir & Kupup Elephant Lake",
      "Quiet eco-homestay stay at Sillery Gaon with Teesta River 14-bend view at Ramitey",
      "Complete Silk Route Inner Line Permit (ILP) processed at Rongli SDPO"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/Bagdogra Pickup to Sillery Gaon Pine Hamlet",
        description: "Chauffeur reception and drive to peaceful Sillery Gaon. Hike to Ramitey Viewpoint for panoramic 14-bend view of Teesta River. Evening bonfire at village homestay."
      },
      {
        day: 2,
        title: "Sillery Gaon to Historic Zuluk via Rongli Permit Office",
        description: "Process Silk Route permits at Rongli. Visit Kuekhola Waterfalls, Lingtam, and Padamchen. Check-in at traditional mountain homestay in Zuluk (9,400 ft)."
      },
      {
        day: 3,
        title: "Zuluk Sunrise to Nathang Valley, Kupup Lake & Gangtok",
        description: "4:30 AM Kanchenjunga sunrise over the 32 hairpin curves from Thambi Viewpoint. Visit Nathang Valley (13,500 ft), Old Baba Mandir, Kupup Elephant Lake, and drop to Gangtok hotel."
      },
      {
        day: 4,
        title: "Gangtok Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private drive down to NJP Station or Bagdogra Airport with Silk Route memories."
      }
    ],
    included: [
      "Private 4WD Scorpio / Innova vehicle with experienced Silk Route hill driver",
      "3 Nights accommodation (Sillery, Zuluk homestay, Gangtok hotel) with meals",
      "Rongli Silk Route Inner Line Permit processing and state road taxes",
      "Driver allowances, fuel, tolls, and parking fees"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 10800, hotelType: "Traditional Silk Route Eco-Homestays & Deluxe Gangtok Stay" },
      premium: { price: 12500, hotelType: "Premium Silk Route Wooden Stays & Summit Gangtok" },
      luxury: { price: 19800, hotelType: "Luxury Silk Route Pine Cottage & Mayfair Gangtok" }
    }
  },
  {
    id: "pkg-silkroute-5n6d-heritage-connector",
    title: "5 Nights / 6 Days Grand Silk Route, Kupup Lake, Tsomgo & Gangtok Heritage",
    duration: "5 Nights / 6 Days",
    location: "Reshi Khola (1N), Zuluk (1N), Nathang Valley (1N) & Gangtok (2N)",
    category: "Silk Route",
    priceStarting: 18900,
    rating: 5.0,
    reviewsCount: 128,
    heroImage: "/images/agency_poster_dark_1785772843834.jpg",
    highlights: [
      "Overnight stay at Nathang Valley (13,500 ft) - 'Ladakh of the East'",
      "Riverside bonfire and organic trout dining at Reshi Khola riverbank",
      "Thambi Viewpoint sunrise over 32 hairpin bends & Tukla War Memorial",
      "Sacred Tsomgo Glacial Lake (12,400 ft) and MG Marg Gangtok exploration",
      "Exclusive 4WD mountain SUV with dedicated local Silk Route coordinator"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Pickup to Reshi Khola Riverbank Homestay",
        description: "Scenic drive from Siliguri to Reshi Khola stream. Enjoy paddle dipping, birdwatching, and evening riverside bonfire."
      },
      {
        day: 2,
        title: "Reshi Khola to Zuluk via Rongli Permit Clearance",
        description: "Drive through Rongli SDPO office for Silk Route Inner Line Permits. Visit Kuekhola Waterfalls and check-in at Zuluk homestay."
      },
      {
        day: 3,
        title: "Zuluk Zig-Zag to High Altitude Nathang Valley Stay",
        description: "Sunrise from Thambi Viewpoint. Visit Lungthung and check-in at cozy homestay in snow-valley Nathang (13,500 ft)."
      },
      {
        day: 4,
        title: "Nathang to Gangtok via Kupup Lake & Tsomgo Glacial Lake",
        description: "Drive past Kupup Elephant Lake, Old Baba Mandir, and high-altitude Tsomgo Lake. Check-in at Gangtok hotel."
      },
      {
        day: 5,
        title: "Gangtok City Sightseeing & Ropeway Cable Car Ride",
        description: "Visit Ban Jhakri Falls, Enchey Monastery, Do Drul Chorten Stupa, and Namgyal Institute of Tibetology. Evening free at MG Marg."
      },
      {
        day: 6,
        title: "Gangtok Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private chauffeur transfer down to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private 4WD SUV vehicle throughout with expert hill chauffeur",
      "5 Nights accommodation with daily Breakfast and Dinners (AP meals on Silk Route)",
      "All Silk Route & East Sikkim Protected Area Permits (ILP & PAP)",
      "Driver allowance, fuel, tolls, and state entry fees"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 16200, hotelType: "Authentic Silk Route Homestays & Deluxe Gangtok Hotel" },
      premium: { price: 18900, hotelType: "Premium Heated Silk Route Stays & Udaan Gangtok" },
      luxury: { price: 27500, hotelType: "Luxury Silk Route Cottage & Mayfair Spa Resort Gangtok" }
    }
  },
  {
    id: "pkg-west-sikkim-3n4d-pelling-skywalk",
    title: "3 Nights / 4 Days Pelling Glass Skywalk, Chenrezig & Pemayangtse Monastery",
    duration: "3 Nights / 4 Days",
    location: "Pelling (2N) & Ravangla Buddha Park (1N)",
    category: "South-West Sikkim",
    priceStarting: 11800,
    rating: 4.8,
    reviewsCount: 135,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "Walk across India's first Glass Skywalk (7,200 ft) facing Chenrezig Colossus",
      "Ancient Rabdentse Palace Ruins & 300-year-old Pemayangtse Monastery",
      "Sacred wish-fulfilling Khecheopalri Lake and Kanchenjunga Waterfalls",
      "Temi Tea Estate walk (Sikkim's only organic tea garden) and Ravangla Buddha Park",
      "Private sedan/SUV vehicle with certified local hill driver"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/Bagdogra Pickup to Pelling via Legship",
        description: "Pick up at Bagdogra/NJP and drive through scenic river valleys to Pelling. Enjoy panoramic views of Mount Kanchenjunga from hotel balcony."
      },
      {
        day: 2,
        title: "Pelling Glass Skywalk & Full Day West Sikkim Sightseeing",
        description: "Walk the Glass Skywalk, visit Rabdentse Palace Ruins, Pemayangtse Monastery, Rimbi Waterfalls, and sacred Khecheopalri Lake."
      },
      {
        day: 3,
        title: "Pelling to Ravangla via Temi Tea Garden",
        description: "Scenic drive to Ravangla. Tour Sikkim's only organic tea estate at Temi and marvel at the 130ft golden Buddha statue in Buddha Park."
      },
      {
        day: 4,
        title: "Ravangla Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private drive down through South Sikkim tea valleys to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private mountain vehicle (Sedan / Innova Crysta / Xylo) with hill chauffeur",
      "3 Nights 3★ hotel accommodation with daily Breakfast & Dinner (MAP Plan)",
      "Skywalk entry assistance, parking, tolls, fuel, and driver allowances",
      "Pure vegetarian and Jain food arrangements upon request"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 9800, hotelType: "Comfort View Stays in Pelling & Ravangla" },
      premium: { price: 11800, hotelType: "3-Star Standard Summit / Rufina Pelling Properties" },
      luxury: { price: 18500, hotelType: "The Chumbi Mountain Retreat & Elgin Mount Pandim" }
    }
  },
  {
    id: "pkg-west-sikkim-5n6d-historical-kingdom",
    title: "5 Nights / 6 Days West Sikkim Royal Heritage & Sacred Lakes: Pelling, Yuksom, Ravangla & Namchi",
    duration: "5 Nights / 6 Days",
    location: "Namchi (1N), Ravangla (1N), Pelling (2N) & Yuksom (1N)",
    category: "South-West Sikkim",
    priceStarting: 17500,
    rating: 4.9,
    reviewsCount: 118,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "Visit Siddhesvara Dham (Namchi Char Dham replicas) & 118ft Samdruptse Statue",
      "First capital of Sikkim at historic Yuksom & Coronation Throne of Norbugang",
      "India's 1st Glass Skywalk at Pelling facing Chenrezig Colossus",
      "Sacred wish-fulfilling Khecheopalri Lake & Dubdi Monastery hike",
      "Temi Tea Estate tea tasting session and Ravangla Buddha Park"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Namchi (Char Dham)",
        description: "Chauffeur reception and drive to Namchi. Visit Siddhesvara Dham (Char Dham replicas with 108ft Shiva statue) and Samdruptse Hill. Night stay in Namchi."
      },
      {
        day: 2,
        title: "Namchi to Ravangla via Temi Tea Garden",
        description: "Stroll through organic tea trails at Temi Tea Estate. Visit the iconic 130ft Buddha statue at Ravangla Buddha Park. Night stay in Ravangla."
      },
      {
        day: 3,
        title: "Ravangla to Historic Yuksom - Ancient Capital",
        description: "Drive to Yuksom, the historic coronation place of the first Chogyal monarch in 1642. Visit Norbugang Throne and Kathok Lake. Night stay in Yuksom."
      },
      {
        day: 4,
        title: "Yuksom to Pelling via Khecheopalri Sacred Lake",
        description: "Drive to sacred wish-fulfilling Khecheopalri Lake, Kanchenjunga Waterfalls, and Rimbi Orange Garden. Check-in at Pelling hotel."
      },
      {
        day: 5,
        title: "Pelling Glass Skywalk & Rabdentse Palace Ruins",
        description: "Walk across the Glass Skywalk, visit ancient Rabdentse Palace Ruins, and 300-year-old Pemayangtse Monastery. Evening leisure at Pelling."
      },
      {
        day: 6,
        title: "Pelling Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast with Kanchenjunga mountain view, followed by private chauffeur transfer down to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private Innova Crysta / Xylo SUV throughout with experienced hill driver",
      "5 Nights accommodation in 3★ boutique hotels with daily Breakfast and Dinner",
      "All toll taxes, parking fees, fuel, and driver allowances",
      "Special pure vegetarian and Jain meals guaranteed"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 14800, hotelType: "Deluxe Mountain View Hotels & Heritage Lodges" },
      premium: { price: 17500, hotelType: "3-Star Premium View Stays (Summit / Rufina / Udaan)" },
      luxury: { price: 26500, hotelType: "Elgin Mount Pandim Pelling & The Chumbi Mountain Retreat" }
    }
  },
  {
    id: "pkg-bhutan-5n6d-glimpse-of-dragon-kingdom",
    title: "5 Nights / 6 Days Glimpse of Bhutan: Thimphu, Punakha Valley & Paro Tiger's Nest",
    duration: "5 Nights / 6 Days",
    location: "Phuentsholing (1N), Thimphu (2N), Punakha (1N) & Paro (1N)",
    category: "Bhutan",
    priceStarting: 27500,
    rating: 5.0,
    reviewsCount: 164,
    heroImage: "/images/bhutan_tigers_nest_1785681037397.jpg",
    highlights: [
      "Hike to the legendary cliff-hanging Taktsang Monastery (Tiger's Nest) in Paro",
      "Majestic Punakha Dzong at the confluence of Pho Chhu and Mo Chhu rivers",
      "Buddha Dordenma (169ft giant golden Buddha) overlooking Thimphu Valley",
      "Dochula Pass (10,170 ft) with 108 memorial chortens and Himalayan peak panorama",
      "Complete Bhutan Tourist Entry Permit & Sustainable Development Fee (SDF) handled"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bagdogra/Hasimara Pickup to Phuentsholing Gateway",
        description: "Chauffeur pickup and transfer to Bhutan border town Phuentsholing/Jaigaon. Process Bhutan immigration permits and evening walk."
      },
      {
        day: 2,
        title: "Phuentsholing to Thimphu - Capital of Happiness",
        description: "Scenic highway drive into Bhutan mountains. Visit Buddha Dordenma Colossus, Tashichho Dzong, and Thimphu Clock Tower Square."
      },
      {
        day: 3,
        title: "Thimphu City Sightseeing to Dochula Pass & Punakha",
        description: "Visit National Memorial Chorten and Simply Bhutan cultural museum. Drive over Dochula Pass (10,170 ft) to sub-tropical Punakha Valley."
      },
      {
        day: 4,
        title: "Punakha Dzong & Suspension Bridge to Paro Valley",
        description: "Tour the breathtaking Punakha Dzong and walk across Bhutan's longest suspension bridge. Afternoon scenic transfer to Paro Valley."
      },
      {
        day: 5,
        title: "Legendary Paro Taktsang (Tiger's Nest) Hike",
        description: "Iconic hike up to cliff-hanging Tiger's Nest Monastery (9,000 ft). Visit Kyichu Lhakhang and traditional Bhutanese archery session."
      },
      {
        day: 6,
        title: "Paro Departure to Hasimara / NJP / Bagdogra Airport",
        description: "Scenic return drive down to Phuentsholing border and transfer to Hasimara Railway Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private Bhutan-licensed Toyota HiAce / SUV with certified Bhutanese tour guide",
      "5 Nights 3★/4★ traditional Bhutanese hotel accommodation with daily meals",
      "Bhutan Department of Tourism entry permits and immigration clearances",
      "Dochula Pass & Tiger's Nest coordination, monument entrance tickets, and mineral water"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 24500, hotelType: "Traditional 3-Star Bhutanese Boutique Hotels" },
      premium: { price: 27500, hotelType: "3-Star+ Premium Heritage Stays (Hotel Druk / Terma Linca)" },
      luxury: { price: 42000, hotelType: "4-Star & 5-Star Luxury Stays (Le Meridien / Zhiwa Ling Paro)" }
    }
  },
  {
    id: "pkg-bhutan-7n8d-essential-kingdom",
    title: "7 Nights / 8 Days Essential Kingdom of Bhutan: Thimphu, Punakha, Phobjikha & Paro",
    duration: "7 Nights / 8 Days",
    location: "Phuentsholing (1N), Thimphu (2N), Punakha (1N), Phobjikha (1N) & Paro (2N)",
    category: "Bhutan",
    priceStarting: 36500,
    rating: 5.0,
    reviewsCount: 132,
    heroImage: "/images/bhutan_tigers_nest_1785681037397.jpg",
    highlights: [
      "Glacial Phobjikha Valley - winter sanctuary of the endangered Black-Necked Cranes",
      "Taktsang Monastery (Tiger's Nest) hike with hot stone bath experience",
      "Punakha Dzong, Chimi Lhakhang (Fertility Temple) & longest suspension bridge",
      "Thimphu Takin Preserve (Bhutan national animal) & National Textile Museum",
      "Dedicated Bhutanese English/Hindi speaking licensed cultural tour guide"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bagdogra / IXB Pickup to Phuentsholing Border",
        description: "Pickup from Bagdogra and transfer to Bhutan border town Phuentsholing. Immigration permit biometric processing."
      },
      {
        day: 2,
        title: "Phuentsholing to Thimphu Valley",
        description: "Mountain drive to Thimphu. Visit giant Buddha Point, Motithang Takin Preserve, and evening leisure in Norzin Lam."
      },
      {
        day: 3,
        title: "Thimphu Sightseeing & Cultural Museum",
        description: "Visit National Memorial Chorten, Folk Heritage Museum, Tashichho Dzong, and Centenary Farmers Market."
      },
      {
        day: 4,
        title: "Thimphu to Phobjikha Valley via Dochula Pass",
        description: "Drive over Dochula Pass (108 Chortens) into pristine Phobjikha glacial valley. Visit Gangtey Monastery and nature trail."
      },
      {
        day: 5,
        title: "Phobjikha to Punakha Valley",
        description: "Scenic transfer to Punakha. Visit Chimi Lhakhang fertility temple and majestic Punakha Dzong river fortress."
      },
      {
        day: 6,
        title: "Punakha to Paro Valley & National Museum",
        description: "Drive along Puna Tsang Chhu river to Paro Valley. Visit Ta Dzong National Museum and Rinpung Dzong fortress."
      },
      {
        day: 7,
        title: "Tiger's Nest Monastery Hike & Traditional Hot Stone Bath",
        description: "Hike up to Tiger's Nest Monastery (Taktsang). In evening, relax with traditional Bhutanese herbal hot stone bath."
      },
      {
        day: 8,
        title: "Paro Departure to Hasimara Station / Bagdogra Airport",
        description: "Scenic return drive to border and drop at Hasimara Railway Station or Bagdogra Airport (IXB)."
      }
    ],
    included: [
      "Private tourist vehicle with certified Bhutanese driver and licensed tour guide",
      "7 Nights 3★/4★ accommodation with all meals included (AP Plan)",
      "Bhutan immigration entry permits and SDF assistance",
      "All monument entry tickets, monastery passes, and mineral water"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 32500, hotelType: "Deluxe 3-Star Traditional Bhutanese Hotels" },
      premium: { price: 36500, hotelType: "Premium 3-Star+ Boutique Heritage Properties" },
      luxury: { price: 54000, hotelType: "5-Star Luxury Resorts (Zhiwa Ling / Terma Linca / Amankora)" }
    }
  },
  {
    id: "pkg-bhutan-9n10d-sikkim-bhutan-combo",
    title: "9 Nights / 10 Days Grand Sikkim to Bhutan Himalayan Gateway Cross-Border Odyssey",
    duration: "9 Nights / 10 Days",
    location: "Gangtok (2N), Darjeeling (2N), Phuentsholing (1N), Thimphu (2N) & Paro (2N)",
    category: "Bhutan",
    priceStarting: 44500,
    rating: 5.0,
    reviewsCount: 88,
    heroImage: "/images/bhutan_tigers_nest_1785681037397.jpg",
    highlights: [
      "Ultimate cross-border odyssey combining Sikkim, Darjeeling, and Kingdom of Bhutan",
      "Tsomgo Lake, Nathula Pass, Tiger Hill Kanchenjunga sunrise & Batasia Loop",
      "Thimphu Buddha Point, Dochula Pass (108 Chortens) & Punakha Dzong",
      "Climb to Paro Taktsang Tiger's Nest & traditional Bhutanese cultural show",
      "Seamless door-to-door coordination between Sikkim and Bhutan operations teams"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Gangtok",
        description: "Chauffeur pickup in private SUV to Gangtok hotel. Evening stroll along pedestrian MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Glacial Lake & Baba Mandir (Nathula Pass Optional)",
        description: "High altitude drive to sacred Tsomgo Lake (12,400 ft) and Baba Harbhajan Mandir. Optional Nathula Pass border visit."
      },
      {
        day: 3,
        title: "Gangtok to Darjeeling Queen of Hills",
        description: "Visit Ban Jhakri Falls and scenic transfer across tea hills to Darjeeling. Check-in at hotel."
      },
      {
        day: 4,
        title: "Tiger Hill Sunrise & Darjeeling Sightseeing",
        description: "4:00 AM Kanchenjunga sunrise at Tiger Hill, Batasia Loop, Ghoom Monastery, and Happy Valley Tea Estate."
      },
      {
        day: 5,
        title: "Darjeeling to Phuentsholing Bhutan Gateway",
        description: "Drive through Dooars tea gardens down to Bhutan border town Phuentsholing. Process entry permits."
      },
      {
        day: 6,
        title: "Phuentsholing to Thimphu Capital Valley",
        description: "Scenic drive into Bhutan. Visit giant Buddha Dordenma, Tashichho Dzong, and National Memorial Chorten."
      },
      {
        day: 7,
        title: "Thimphu Dochula Pass Excursion & Paro Transfer",
        description: "Drive to Dochula Pass (10,170 ft) for 108 Chortens mountain view. Transfer to Paro Valley and visit Rinpung Dzong."
      },
      {
        day: 8,
        title: "Iconic Paro Tiger's Nest Hike",
        description: "Hike up to Taktsang Monastery (Tiger's Nest). Evening Bhutanese archery session and herbal hot stone bath."
      },
      {
        day: 9,
        title: "Paro to Hasimara / Siliguri",
        description: "Drive down to border and check-in at Siliguri/Hasimara for comfortable departure staging."
      },
      {
        day: 10,
        title: "Departure from Bagdogra Airport (IXB) / NJP Station",
        description: "Breakfast at hotel and private chauffeur transfer to Bagdogra Airport or NJP Station."
      }
    ],
    included: [
      "Dedicated SUVs throughout (Innova Crysta in India + Toyota HiAce in Bhutan)",
      "9 Nights 3★/4★ accommodation with daily Breakfast and Dinners (AP meals in Bhutan)",
      "All Sikkim Protected Area Permits and Bhutan International Tourist Entry Permits",
      "Certified Bhutanese tour guide, monument entrance passes, and 24/7 travel desk"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 39500, hotelType: "Deluxe 3-Star Hotels in Sikkim & Bhutan" },
      premium: { price: 44500, hotelType: "3-Star+ Premium Boutique Stays (Summit / Druk / Terma)" },
      luxury: { price: 68000, hotelType: "Mayfair Gangtok, Elgin Darjeeling & Zhiwa Ling Paro" }
    }
  },
  {
    id: "pkg-honeymoon-luxury-6n7d-candlelight",
    title: "6 Nights / 7 Days Luxury Alpine Romance: Mayfair Gangtok, Elgin Darjeeling & Mirik Lake",
    duration: "6 Nights / 7 Days",
    location: "Gangtok (3N), Darjeeling (2N) & Mirik Lake (1N)",
    category: "Honeymoon",
    priceStarting: 29500,
    rating: 5.0,
    reviewsCount: 156,
    heroImage: "/images/darjeeling_toy_train_1785681122611.jpg",
    highlights: [
      "5★ Luxury stays at Mayfair Spa Resort Gangtok & The Elgin Heritage Darjeeling",
      "Private Candlelight Dinner with floral room decor and honeymoon celebration cake",
      "Couple boating at pine-fringed Mirik Sumendu Lake & Pashupati Nepal border market",
      "VIP Innova Crysta throughout with couple privacy, soft music, and Wi-Fi",
      "Tiger Hill sunrise over Mt. Kanchenjunga & Glenary's Bakery high-tea session"
    ],
    itinerary: [
      {
        day: 1,
        title: "VIP Romantic Welcome & Transfer to Mayfair Gangtok",
        description: "Chauffeur reception with welcome bouquet and luxury Innova Crysta. Check-in at 5★ Mayfair Spa Resort. Romantic candlelight dinner with floral room decoration."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Baba Mandir (Nathula Border Optional)",
        description: "Private drive to alpine snow lake Tsomgo (12,400 ft). Cozy couple hot chocolate and noodles at high altitude. Evening at resort casino & spa."
      },
      {
        day: 3,
        title: "Gangtok Romantic Viewpoints & Spa Session",
        description: "Visit Hanuman Tok viewpoint, Ban Jhakri Falls, and Rumtek Monastery. Afternoon complimentary couple foot reflexology spa session."
      },
      {
        day: 4,
        title: "Gangtok to Heritage Darjeeling via Tea Hills",
        description: "Scenic drive through tea gardens. Suite check-in at The Elgin Heritage Hotel. Evening romantic walk at heritage Chowrasta Mall Road."
      },
      {
        day: 5,
        title: "Tiger Hill Sunrise VIP Terrace & Glenary's High-Tea",
        description: "4:00 AM private drive to Tiger Hill for golden sunrise over Kanchenjunga. Visit Batasia Loop Toy Train and enjoy high-tea at historic Glenary's Bakery."
      },
      {
        day: 6,
        title: "Darjeeling to Mirik Pine Lake & Couple Boating",
        description: "Drive through pine valleys to Mirik Lake. Private couple paddle boating on Sumendu Lake and shopping at Pashupati Nepal border market."
      },
      {
        day: 7,
        title: "Farewell Breakfast & Private Drop to Bagdogra Airport",
        description: "Gourmet buffet breakfast, farewell gift box of Darjeeling First Flush tea, and private chauffeur drop at Bagdogra Airport (IXB)."
      }
    ],
    included: [
      "Executive Toyota Innova Crysta with personal chauffeur throughout",
      "6 Nights luxury accommodation (Mayfair Gangtok & Elgin Darjeeling)",
      "Daily gourmet Breakfast & Dinners, 1x Candlelight Dinner with Cake & Flower Decor",
      "1x Glenary's High-Tea Voucher, 1x Couple Spa Session, and all permits"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 23500, hotelType: "Deluxe Boutique Romance Hotels" },
      premium: { price: 29500, hotelType: "4-Star Luxury Heritage Suites (Mayfair / Elgin)" },
      luxury: { price: 38500, hotelType: "5-Star Ultra Luxury Suites & Spa Villas" }
    }
  },
  {
    id: "pkg-honeymoon-4n5d-darjeeling-tea-romance",
    title: "4 Nights / 5 Days Darjeeling Heritage & Tea Estate Romantic Couple Retreat",
    duration: "4 Nights / 5 Days",
    location: "Darjeeling (3N) & Kurseong Tea Estate (1N)",
    category: "Honeymoon",
    priceStarting: 18500,
    rating: 4.9,
    reviewsCount: 114,
    heroImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highlights: [
      "Stay inside a colonial tea planter's bungalow surrounded by misty tea gardens",
      "Private couple Joyride on UNESCO Darjeeling Himalayan Toy Train (Steam Engine)",
      "Tiger Hill golden Kanchenjunga sunrise & private high-tea at Happy Valley Estate",
      "Candlelight dinner with wine, flower bed decor, and custom honeymoon cake",
      "Chauffeur-driven private sedan/SUV for couple privacy throughout"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bagdogra Pickup to Darjeeling Heritage Hotel",
        description: "Pickup in private vehicle with welcome flowers. Drive up through Rohini tea slopes to Darjeeling. Candlelight dinner with flower bed decor."
      },
      {
        day: 2,
        title: "Tiger Hill Sunrise & UNESCO Toy Train Joyride",
        description: "4:00 AM Kanchenjunga sunrise from Tiger Hill. Return for breakfast and board the iconic Darjeeling steam Toy Train joyride to Ghoom and Batasia Loop."
      },
      {
        day: 3,
        title: "Darjeeling Tea Garden Walk & Lamahatta Pine Garden",
        description: "Private tea tasting at Happy Valley Tea Estate. Afternoon excursion to Lamahatta Eco Park pine forest canopy."
      },
      {
        day: 4,
        title: "Darjeeling to Kurseong Heritage Tea Retreat",
        description: "Transfer to quiet Kurseong Dow Hill tea estate. Evening cozy fireplace dinner with estate-made organic tea."
      },
      {
        day: 5,
        title: "Kurseong Sunrise & Departure to Bagdogra Airport",
        description: "Breakfast with tea garden panoramic view, followed by private chauffeur drop at Bagdogra Airport or NJP Station."
      }
    ],
    included: [
      "Private vehicle throughout with professional hill driver",
      "4 Nights boutique accommodation with daily Breakfast and Candlelight Dinners",
      "UNESCO Toy Train tickets, tea tasting session passes, and honeymoon amenities",
      "Tolls, parking, driver allowance, and 24/7 dedicated trip coordinator"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 15200, hotelType: "Cozy Boutique Hill Hotels" },
      premium: { price: 18500, hotelType: "3-Star Standard Heritage Properties (Udaan / Summit)" },
      luxury: { price: 27500, hotelType: "Colonial Planter's Bungalows & Elgin Darjeeling" }
    }
  },
  {
    id: "pkg-dzongu-3n4d-lepcha-homestay",
    title: "3 Nights / 4 Days Offbeat Dzongu Lepcha Reserve Homestay & River Valley Sanctuary",
    duration: "3 Nights / 4 Days",
    location: "Passingdang & Tingvong Village, Dzongu Special Reserve, North Sikkim",
    category: "Offbeat",
    priceStarting: 13500,
    rating: 5.0,
    reviewsCount: 92,
    heroImage: "/images/yumthang_zero_point_1785680592273.jpg",
    highlights: [
      "Exclusive entry into Dzongu - the protected ancestral homeland of the indigenous Lepcha tribe",
      "Authentic traditional Lepcha wooden homestay with bamboo architecture and fireplace",
      "Hike to Lingzya Waterfall, sacred mountain cane bridges, and natural hot sulphur springs",
      "Organic farm-to-table meals cooked on woodfire with wild herbs and local millet wine (Chi)",
      "Official Dzongu Special Restricted Area Permit processed at Mangan SDPO"
    ],
    itinerary: [
      {
        day: 1,
        title: "Gangtok / NJP Pickup to Dzongu Protected Reserve",
        description: "Drive north into North Sikkim. Process special Dzongu permits at Mangan and cross the bridge into pristine Lepcha reserve. Check-in at Passingdang village homestay."
      },
      {
        day: 2,
        title: "Lingzya Waterfall, Cane Bridges & Upper Dzongu Hike",
        description: "Hike through cardamom forests to towering Lingzya Waterfall and traditional bamboo hanging bridge. Visit Tingvong village with Mount Pandim views."
      },
      {
        day: 3,
        title: "Lepcha Cultural Immersion & Hot Sulphur Springs",
        description: "Visit traditional Lepcha museum, learn bamboo basket weaving, and dip in natural riverside hot springs. Evening bonfire with traditional Lepcha storytelling."
      },
      {
        day: 4,
        title: "Dzongu Departure to Gangtok / NJP Station",
        description: "Traditional farewell breakfast with organic cardamom tea, followed by private chauffeur drive down to Gangtok or NJP Station."
      }
    ],
    included: [
      "Dedicated 4WD mountain SUV throughout with local Lepcha driver-guide",
      "3 Nights traditional village homestay accommodation with all meals (AP Plan)",
      "Official Dzongu Special Restricted Area Permits and environmental conservation fees",
      "Guided village nature walks and cultural exchange sessions"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 11800, hotelType: "Authentic Lepcha Village Wooden Homestays" },
      premium: { price: 13500, hotelType: "Premium Eco-Cottages in Tingvong & Passingdang" },
      luxury: { price: 18500, hotelType: "Exclusive Wilderness Eco-Resorts in Dzongu" }
    }
  },
  {
    id: "pkg-borong-ravangla-4n5d-hot-springs",
    title: "4 Nights / 5 Days Offbeat Borong Hot Springs, Ralang Monasteries & Ravangla Nature Retreat",
    duration: "4 Nights / 5 Days",
    location: "Ravangla (2N) & Borong Village / Ralang (2N), South Sikkim",
    category: "Offbeat",
    priceStarting: 14800,
    rating: 4.8,
    reviewsCount: 78,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "Natural mineral-rich hot sulphur springs (Tatopani) by the roaring Rangit River",
      "Ancient Old & New Ralang Monasteries with traditional monastic mask dances",
      "Borong eco-village walks, birdwatching trails & pristine pine canopy walks",
      "Temi Organic Tea Garden walk and 130ft golden Buddha statue in Ravangla",
      "Peaceful offbeat alternative to crowded tourist towns with pure mountain serenity"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Ravangla",
        description: "Scenic drive from Siliguri through Teesta valley up to Ravangla. Check-in at mountain resort and enjoy evening sunset over Kanchenjunga."
      },
      {
        day: 2,
        title: "Ravangla Buddha Park & Temi Tea Estate Tour",
        description: "Visit the iconic 130ft Buddha statue at Buddha Park and walk through Sikkim's only organic tea estate at Temi. Evening walk in Ravangla town."
      },
      {
        day: 3,
        title: "Ravangla to Borong Eco-Village & Ralang Monasteries",
        description: "Scenic drive down into forested valley of Borong. Visit the historic Kagyu lineage Ralang Monasteries and check-in at cottage homestay."
      },
      {
        day: 4,
        title: "Borong Hot Springs (Tatopani) & Forest Trails",
        description: "Morning hike down to natural Rangit River hot springs. Relaxing therapeutic thermal bath followed by birdwatching in pine woods."
      },
      {
        day: 5,
        title: "Borong Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at resort and private chauffeur transfer down through South Sikkim tea slopes to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private mountain vehicle throughout with experienced local driver",
      "4 Nights accommodation in mountain cottages with daily Breakfast & Dinner",
      "Entry tickets to Buddha Park and tea tasting passes at Temi",
      "All tolls, parking fees, fuel, and driver allowances"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 12500, hotelType: "Cozy Village Homestays & Deluxe Ravangla Hotel" },
      premium: { price: 14800, hotelType: "3-Star Wilderness Cottages & Summit Ravangla" },
      luxury: { price: 21500, hotelType: "Luxury Pine Cottages & Wildflower Retreats" }
    }
  },
  {
    id: "pkg-kalimpong-lava-rishyap-kolakham-4n5d",
    title: "4 Nights / 5 Days Kalimpong, Lava Pine Forest, Rishyap & Kolakham Neora Valley Getaway",
    duration: "4 Nights / 5 Days",
    location: "Kalimpong (2N), Lava / Rishyap (1N) & Kolakham (1N)",
    category: "Offbeat",
    priceStarting: 13900,
    rating: 4.9,
    reviewsCount: 86,
    heroImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highlights: [
      "Untouched pine forests of Neora Valley National Park & Changey Waterfalls",
      "360-degree Kanchenjunga mountain view from Tiffin Dara & Rishyap ridge",
      "Colonial heritage in Kalimpong: Morgan House, Deolo Hill & Durpin Monastery",
      "Pine View Cactus Nursery with over 1,500 rare exotic cactus varieties",
      "Lava Buddhist Monastery surrounded by misty pine forests"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/Bagdogra Pickup to Kalimpong Hill Station",
        description: "Scenic drive along Teesta River to Kalimpong. Visit Deolo Hill viewpoint, Pine View Cactus Nursery, and colonial Morgan House."
      },
      {
        day: 2,
        title: "Kalimpong Heritage Sightseeing & Science Centre",
        description: "Visit Durpin Dara Monastery, Kalimpong Arts & Crafts Centre, and Hanuman Tok viewpoint. Evening shopping for Kalimpong cheese & lollipops."
      },
      {
        day: 3,
        title: "Kalimpong to Lava & Rishyap Pine Ridge",
        description: "Drive through dense pine forests to Lava. Visit Lava Monastery and transfer to peaceful hilltop village Rishyap. Sunset over Kanchenjunga."
      },
      {
        day: 4,
        title: "Rishyap to Kolakham & Neora Valley National Park",
        description: "Short trek to Tiffin Dara viewpoint. Scenic drive to Kolakham village facing the Neora Valley forest. Visit Changey Waterfalls."
      },
      {
        day: 5,
        title: "Kolakham Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast with pine forest breeze and private drive down via Gorubathan tea gardens to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private vehicle throughout with polite local hill chauffeur",
      "4 Nights accommodation in boutique hill resorts and pine cottages",
      "Daily Breakfast & Dinners with fresh local organic ingredients",
      "All tolls, parking fees, driver allowance, and fuel"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 11900, hotelType: "Comfort Pine Wooden Homestays" },
      premium: { price: 13900, hotelType: "3-Star Standard Boutique Properties (Summit / Silver Fir)" },
      luxury: { price: 19800, hotelType: "The Elgin Silver Oaks Kalimpong & Luxury Pine Resorts" }
    }
  },
  {
    id: "pkg-adventure-7n8d-goechala-kanchenjunga",
    title: "7 Nights / 8 Days Goechala Kanchenjunga Base Camp Trekking Expedition",
    duration: "7 Nights / 8 Days",
    location: "Yuksom, Bakhim, Dzongri, Thansing, Lamuney & Goechala Viewpoint (15,100 ft)",
    category: "Adventure",
    priceStarting: 24500,
    rating: 5.0,
    reviewsCount: 76,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "Stand face-to-face with the colossal South-East Face of Mount Kanchenjunga (8,586 m)",
      "Cross rhododendron forests, Dzongri Top (13,778 ft) & sacred Samiti Lake",
      "Professional certified mountaineering guide, camp cook, and porter team",
      "Four-season alpine dome tents, warm sleeping bags, and high-altitude nutritious meals",
      "Kanchenjunga National Park UNESCO World Heritage trekking permits included"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/Bagdogra Pickup to Trek Basecamp Yuksom (5,800 ft)",
        description: "Chauffeur transfer to historic Yuksom. Briefing with trekking expedition leader, gear inspection, and permit verification."
      },
      {
        day: 2,
        title: "Yuksom to Bakhim / Sachen (Trek 12 km / 5-6 hrs)",
        description: "Trek through lush subtropical forests crossing suspension bridges over Prek Chu river. Camp at Sachen or Bakhim."
      },
      {
        day: 3,
        title: "Bakhim to Dzongri via Tshoka (Trek 9 km / 5 hrs)",
        description: "Steep climb through blooming rhododendron forests past Tshoka Tibetan settlement to alpine meadow Dzongri (13,000 ft)."
      },
      {
        day: 4,
        title: "Dzongri Top Sunrise (13,778 ft) & Acclimatization",
        description: "4:30 AM sunrise from Dzongri Top: 360-degree panorama of Kanchenjunga, Pandim, Kabru, and Simvo peaks. Rest and acclimatize."
      },
      {
        day: 5,
        title: "Dzongri to Thansing Valley (Trek 8 km / 4 hrs)",
        description: "Descend into Kokchurang riverbed and ascend into the open glacial valley of Thansing (12,900 ft) right beneath Mount Pandim."
      },
      {
        day: 6,
        title: "Thansing to Lamuney & Sacred Samiti Lake",
        description: "Gentle trek past sacred Samiti Lake to the high camp at Lamuney (13,650 ft). Early dinner and rest for summit push."
      },
      {
        day: 7,
        title: "Summit Push: Goechala Viewpoint (15,100 ft) & Return to Tshoka",
        description: "3:00 AM push to Goechala Viewpoint for unforgettable golden sunrise hitting Kanchenjunga wall. Long descent back to Tshoka."
      },
      {
        day: 8,
        title: "Tshoka to Yuksom & Drive to NJP / Bagdogra Airport",
        description: "Final descent to Yuksom, debriefing celebration lunch, and private transfer to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Certified local mountaineering trek leader + experienced camp cook and porters/yaks",
      "All alpine camping equipment: 4-season tents, sub-zero sleeping bags, foam mats & dining tent",
      "Nutritious high-altitude meals throughout the trek (Breakfast, Packed Lunch, Hot Dinner, Tea)",
      "Kanchenjunga National Park permits, environmental conservation fees, and oxygen kits"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 21500, hotelType: "Alpine Tents & Trekker Lodges in Yuksom" },
      premium: { price: 24500, hotelType: "Premium Expedition Tents & 3-Star Basecamp Hotel" },
      luxury: { price: 34500, hotelType: "VIP Private Trekking Expedition with Personal Sherpa" }
    }
  },
  {
    id: "pkg-adventure-5n6d-dzongri-viewpoint-trek",
    title: "5 Nights / 6 Days Dzongri Panoramic Peak & Himalayan Wilderness Trek",
    duration: "5 Nights / 6 Days",
    location: "Yuksom, Tshoka, Dzongri Top (13,778 ft) & Prek Chu River Gorge",
    category: "Adventure",
    priceStarting: 17800,
    rating: 4.9,
    reviewsCount: 65,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "Ideal shorter high-altitude trek for adventure seekers with breathtaking views",
      "Dzongri Top sunrise: close-up view of Mt. Kanchenjunga, Mt. Pandim & Kabru Dome",
      "Walk through ancient pine, oak, and vibrant rhododendron sanctuaries",
      "Complete camping setup with cozy tents, dining tent, and fresh hot mountain meals",
      "All wilderness park permits and certified local mountain guides included"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Yuksom Basecamp",
        description: "Drive to historic Yuksom. Check-in at hotel, gear check, and route briefing with certified trek guide."
      },
      {
        day: 2,
        title: "Yuksom to Tshoka (Trek 14 km / 6 hrs)",
        description: "Trek along Prek Chu gorge crossing three suspension bridges to charming Tibetan hamlet Tshoka (9,650 ft)."
      },
      {
        day: 3,
        title: "Tshoka to Dzongri Alpine Meadow (Trek 8 km / 5 hrs)",
        description: "Climb through rhododendron forest past Phedang ridge to high alpine meadow Dzongri (13,000 ft). Camp under starlight."
      },
      {
        day: 4,
        title: "Dzongri Top Sunrise & Exploration of Dzongri Ridge",
        description: "4:30 AM sunrise from Dzongri Top (13,778 ft) with golden rays hitting Kanchenjunga massif. Day walk around Dzongri ridge."
      },
      {
        day: 5,
        title: "Dzongri to Yuksom Descent (Trek 18 km / 6 hrs)",
        description: "Scenic descent through pine woods back to Yuksom basecamp. Celebration dinner and hot shower."
      },
      {
        day: 6,
        title: "Yuksom Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private drive down to NJP Railway Station or Bagdogra Airport."
      }
    ],
    included: [
      "Certified mountain guide + cooking crew and luggage porters",
      "High quality alpine tents, warm sleeping bags, and dining setup",
      "All meals during trek (AP plan with hot tea, soups, and energy snacks)",
      "National Park entry permits and safety medical kit"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 15500, hotelType: "Alpine Tents & Trekker Lodges" },
      premium: { price: 17800, hotelType: "Premium Trekking Tents & 3-Star Yuksom Hotel" },
      luxury: { price: 26000, hotelType: "Private Guided Alpine Trek with Deluxe Basecamp" }
    }
  },
  {
    id: "pkg-adventure-4n5d-teesta-rafting-biking",
    title: "4 Nights / 5 Days Teesta White-Water Rafting, Mountain Biking & Paragliding Adventure",
    duration: "4 Nights / 5 Days",
    location: "Melli / Teesta Bazar, Gangtok & Pelling",
    category: "Adventure",
    priceStarting: 16500,
    rating: 4.9,
    reviewsCount: 84,
    heroImage: "/images/innova_mountain_drive_1785681104445.jpg",
    highlights: [
      "Thrilling Grade III & IV white-water river rafting on Teesta & Rangit rivers",
      "Tandem high-altitude paragliding flight over Gangtok hills with HD video",
      "Downhill mountain biking trail through Temi tea gardens and pine ridges",
      "Zip-lining over river gorge & camping bonfire night by Teesta riverbank",
      "All safety gear, certified adventure instructors, and life jackets provided"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Pickup to Teesta River Adventure Camp",
        description: "Arrive at Melli/Teesta adventure camp. Afternoon Grade III white-water rafting session on Teesta River. Evening riverside BBQ and bonfire."
      },
      {
        day: 2,
        title: "Teesta to Gangtok & High-Altitude Paragliding",
        description: "Drive to Gangtok. Tandem paragliding flight from Baliman Dara with aerial views of Kanchenjunga. Evening walk at MG Marg."
      },
      {
        day: 3,
        title: "Gangtok to Temi Tea Mountain Biking Trail",
        description: "Downhill mountain biking adventure through winding roads of Temi Tea Estate. Visit Ravangla Buddha Park. Night stay in Ravangla."
      },
      {
        day: 4,
        title: "Pelling Glass Skywalk & Rock Climbing / Rappelling",
        description: "Walk the Pelling Glass Skywalk. Afternoon guided rock climbing and rappelling session at Rimbi Waterfalls."
      },
      {
        day: 5,
        title: "Pelling Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at resort and private chauffeur transfer down to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "All adventure activities: White Water Rafting, Tandem Paragliding, and Mountain Biking with gear",
      "Certified rafting river guides, paragliding pilots, and safety rescue support",
      "4 Nights accommodation (1N Riverside Camp, 2N Gangtok, 1N Pelling) with meals",
      "Private transport throughout with equipment carriers"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 14200, hotelType: "Adventure Camps & Deluxe Hill Hotels" },
      premium: { price: 16500, hotelType: "3-Star Standard Adventure Resorts (Summit / Udaan)" },
      luxury: { price: 24500, hotelType: "Luxury Spa Resorts with VIP Adventure Logistical Support" }
    }
  },
  {
    id: "pkg-family-pure-veg-jain-6n7d",
    title: "6 Nights / 7 Days Pure Vegetarian & Jain Friendly Sikkim-Darjeeling Pilgrimage & Heritage Tour",
    duration: "6 Nights / 7 Days",
    location: "Namchi Char Dham (1N), Gangtok (3N) & Darjeeling (2N)",
    category: "Family",
    priceStarting: 19800,
    rating: 5.0,
    reviewsCount: 172,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "100% Guaranteed Pure Vegetarian & Strict Jain food (No Onion, No Garlic, Root-free meals)",
      "Siddhesvara Dham (Namchi Char Dham replicas) & 118ft Samdruptse Golden Statue",
      "Ravangla Buddha Park (130ft Buddha statue) & Rumtek Sacred Dharma Chakra Centre",
      "Tsomgo Glacial Lake (12,400 ft) & Baba Harbhajan Mandir with oxygen-supported cab",
      "Darjeeling Tiger Hill sunrise & Toy Train ride with comfortable pacing for all ages"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/Bagdogra Pickup to Namchi (Siddhesvara Dham)",
        description: "Chauffeur reception and drive to Namchi. Visit Siddhesvara Dham (Char Dham replicas of Badrinath, Jagannath, Dwarka, and Rameshwaram with 108ft Shiva statue). Jain dinner at hotel."
      },
      {
        day: 2,
        title: "Namchi to Gangtok via Ravangla Buddha Park",
        description: "Visit Samdruptse Hill and majestic Ravangla Buddha Park. Scenic drive to Gangtok. Evening leisure walk on flat pedestrian MG Marg."
      },
      {
        day: 3,
        title: "Sacred Tsomgo Lake & Baba Mandir Excursion",
        description: "Drive to high-altitude holy Tsomgo Lake (12,400 ft) and Baba Mandir. Pure veg/Jain hot packed lunch provided. Evening free in Gangtok."
      },
      {
        day: 4,
        title: "Rumtek Monastery & Scenic Transfer to Darjeeling",
        description: "Visit Rumtek Dharma Chakra Centre and Enchey Monastery. Scenic transfer through tea-clad hills to Darjeeling. Check-in at Jain-friendly hotel."
      },
      {
        day: 5,
        title: "Tiger Hill Sunrise, Batasia Loop & Japanese Peace Pagoda",
        description: "4:00 AM Kanchenjunga sunrise from Tiger Hill, Batasia Loop Toy Train track, Ghoom Monastery, and Japanese Peace Pagoda."
      },
      {
        day: 6,
        title: "Darjeeling Tea Garden Walk & Mirik Lake Boating",
        description: "Stroll through organic tea garden and enjoy peaceful paddle boating at Mirik Lake surrounded by pines. Jain dinner at hotel."
      },
      {
        day: 7,
        title: "Darjeeling Departure to NJP Station / Bagdogra Airport",
        description: "Freshly prepared Jain breakfast and private drive down to NJP Railway Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private Innova Crysta SUV with experienced and polite driver throughout",
      "6 Nights accommodation in handpicked Pure Veg / Jain certified partner hotels",
      "Full Board Pure Vegetarian / Jain Meals (Breakfast & Dinner guaranteed separate cooking)",
      "All Sikkim permits, temple entry assistance, and 24/7 dedicated family coordinator"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 16800, hotelType: "Jain Group & Pure Veg Certified Deluxe Stays" },
      premium: { price: 19800, hotelType: "3-Star Pure Veg Summit / Udaan / Rufina Guaranteed" },
      luxury: { price: 29500, hotelType: "Mayfair Spa Resort Gangtok & Elgin Heritage Darjeeling (Pure Veg Kitchen)" }
    }
  },
  {
    id: "pkg-family-gentle-hills-5n6d",
    title: "5 Nights / 6 Days Senior Citizen & Family Gentle Hills Tour: Low Altitude Gangtok & Darjeeling",
    duration: "5 Nights / 6 Days",
    location: "Gangtok (3N) & Darjeeling (2N)",
    category: "Family",
    priceStarting: 17200,
    rating: 4.9,
    reviewsCount: 148,
    heroImage: "/images/sikkim_hero_banner_1785680563996.jpg",
    highlights: [
      "Thoughtfully paced low-altitude itinerary with zero strenuous climbing for seniors & kids",
      "Spacious Toyota Innova Crysta with plush captain seats and gentle hill driving",
      "Ground floor / lift-equipped 3★/4★ hotel rooms situated near town centers",
      "Gangtok Ropeway cable car, Ban Jhakri Waterfalls, Flower Show & Darjeeling Toy Train",
      "Onboard vehicle medical first aid kit, hot water thermoses, and wheelchair assistance on call"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/Bagdogra Airport Pickup to Gangtok",
        description: "Relaxed pickup in private Innova Crysta. Scenic gentle drive along Teesta River to Gangtok. Lift-accessible hotel check-in and evening stroll at flat MG Marg."
      },
      {
        day: 2,
        title: "Gangtok Gentle City Tour & Cable Car Ropeway",
        description: "Visit Gangtok Ropeway (cable car ride), Flower Exhibition Centre, Namgyal Institute of Tibetology, and Do Drul Chorten Stupa with ample rest breaks."
      },
      {
        day: 3,
        title: "Ban Jhakri Energy Park & Rumtek Monastery",
        description: "Visit wheelchair-friendly landscaped Ban Jhakri Waterfall Park and serene Rumtek Monastery. Afternoon relaxation at hotel."
      },
      {
        day: 4,
        title: "Gangtok to Darjeeling via Scenic Tea Hills",
        description: "Gentle drive to Darjeeling with tea garden photo stops. Check-in at heritage hotel. Evening walk at flat Chowrasta Mall Road."
      },
      {
        day: 5,
        title: "Darjeeling UNESCO Toy Train Ride & Peace Pagoda",
        description: "Leisurely morning steam Toy Train ride to Batasia Loop. Visit Japanese Peace Pagoda and Happy Valley Tea Estate view terrace."
      },
      {
        day: 6,
        title: "Darjeeling Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and smooth private chauffeur transfer down to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private Toyota Innova Crysta (Captain Seats) with courteous senior-friendly hill driver",
      "5 Nights accommodation in lift-equipped/accessible 3★/4★ hotels with daily meals",
      "Toy Train tickets, cable car passes, all parking fees, and driver allowances",
      "Wheelchair assistance on request and 24/7 dedicated family support coordinator"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 14500, hotelType: "Lift-Accessible Deluxe Mountain Hotels" },
      premium: { price: 17200, hotelType: "3-Star Standard Central Properties (Summit / Udaan)" },
      luxury: { price: 26500, hotelType: "Mayfair Spa Resort Gangtok & The Elgin Darjeeling" }
    }
  },
  {
    id: "pkg-weekend-2n3d-gangtok-quick-break",
    title: "2 Nights / 3 Days Gangtok City & Tsomgo Glacial Lake Weekend Break",
    duration: "2 Nights / 3 Days",
    location: "Gangtok (2N), Tsomgo Lake (12,400 ft) & Baba Mandir",
    category: "Sikkim-Darjeeling",
    priceStarting: 8900,
    rating: 4.8,
    reviewsCount: 165,
    heroImage: "/images/nathula_pass_snow_1785681052944.jpg",
    highlights: [
      "Perfect short weekend getaway for working professionals and quick explorers",
      "High altitude Tsomgo Glacial Lake (12,400 ft) and historic Baba Mandir",
      "Optional Nathula Pass Indo-China border army permit coordination",
      "MG Marg shopping, local Sikkimese momos, and Gangtok ropeway ride",
      "Private vehicle throughout from Bagdogra Airport / NJP Station"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Gangtok",
        description: "Pick up at Bagdogra/NJP and drive up along Teesta River to Gangtok. Check-in at hotel and evening stroll at vibrant MG Marg."
      },
      {
        day: 2,
        title: "Tsomgo Lake & Baba Mandir (Nathula Border Optional)",
        description: "Day trip to sacred Tsomgo Lake (12,400 ft) surrounded by alpine peaks and Baba Harbhajan Mandir. Optional Nathula Pass permit."
      },
      {
        day: 3,
        title: "Gangtok City Sightseeing & Drop to NJP / Bagdogra Airport",
        description: "Visit Ban Jhakri Falls, Flower Exhibition Centre, and private drive down to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private sedan/SUV vehicle throughout with hill driver",
      "2 Nights 3★ hotel accommodation with daily Breakfast and Dinner",
      "Tsomgo Lake and Baba Mandir permit clearance charges",
      "Tolls, fuel, driver allowance, and parking fees"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 7500, hotelType: "Comfort View Hotel near MG Marg" },
      premium: { price: 8900, hotelType: "3-Star Standard Summit / Udaan Gangtok" },
      luxury: { price: 14500, hotelType: "Mayfair Spa Resort & Casino Gangtok" }
    },
    isSharedTourAvailable: true,
    sharedPricePerSeat: 1200,
    sharedTourDetails: "Tsomgo Lake day trip shared Scorpio seat available at ₹1,200/seat with permits."
  },
  {
    id: "pkg-weekend-2n3d-darjeeling-toy-train-refresh",
    title: "2 Nights / 3 Days Darjeeling Toy Train, Tea Garden & Tiger Hill Sunrise Quick Refresh",
    duration: "2 Nights / 3 Days",
    location: "Darjeeling Queen of Hills (2N)",
    category: "Sikkim-Darjeeling",
    priceStarting: 8500,
    rating: 4.8,
    reviewsCount: 152,
    heroImage: "/images/darjeeling_tea_gardens_1785681013467.jpg",
    highlights: [
      "Quick refreshing weekend escape to the Queen of the Hills",
      "Tiger Hill 4:00 AM golden Kanchenjunga sunrise & Batasia Loop",
      "UNESCO World Heritage Darjeeling Himalayan Toy Train Joyride",
      "Happy Valley Tea Estate stroll and bakery treats at historic Glenary's",
      "Private sedan/SUV transfer from NJP Railway Station / Bagdogra Airport"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Darjeeling",
        description: "Pick up and drive up through winding tea garden slopes to Darjeeling. Check-in at hotel and evening walk at heritage Chowrasta Mall Road."
      },
      {
        day: 2,
        title: "Tiger Hill Sunrise, Toy Train & 7-Point Sightseeing",
        description: "4:00 AM Kanchenjunga sunrise from Tiger Hill, Batasia Loop, Ghoom Monastery, Himalayan Mountaineering Institute, and Happy Valley Tea Estate."
      },
      {
        day: 3,
        title: "Darjeeling Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private chauffeur drive down through Kurseong tea hills to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private vehicle throughout with certified hill chauffeur",
      "2 Nights accommodation in 3★ hotel with daily Breakfast and Dinner",
      "Toy Train tickets and tea garden tasting pass assistance",
      "All tolls, parking fees, fuel, and driver allowances"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 6900, hotelType: "Deluxe View Hotel near Mall Road" },
      premium: { price: 8500, hotelType: "3-Star Standard Summit Grace / Udaan Dekeling" },
      luxury: { price: 15500, hotelType: "The Elgin Heritage Hotel / Windamere Darjeeling" }
    }
  },
  {
    id: "pkg-photography-birdwatching-5n6d",
    title: "5 Nights / 6 Days Himalayan Bird Watching, Orchid Sanctuary & Rhododendron Photography Tour",
    duration: "5 Nights / 6 Days",
    location: "Kitam Bird Sanctuary (1N), Maenam Forest / Ravangla (2N) & Okhrey / Varsey (2N)",
    category: "Offbeat",
    priceStarting: 18200,
    rating: 5.0,
    reviewsCount: 72,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "Spot exotic Himalayan birds: Satyr Tragopan, Fire-tailed Sunbird, Blood Pheasant & Red Panda",
      "Varsey Rhododendron Sanctuary trail ablaze with crimson rhododendron blooms",
      "Kitam Bird Sanctuary sal forest walks & Maenam Wildlife Reserve canopy trails",
      "Accompanied by expert certified Sikkim naturalist and wildlife photography guide",
      "High ground clearance 4WD SUV with custom slow-paced photo stop itinerary"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Pickup to Kitam Bird Sanctuary",
        description: "Drive to Kitam sal forest sanctuary. Afternoon birdwatching walk along riverbanks for peafowl, kalij pheasant, and endemic warblers."
      },
      {
        day: 2,
        title: "Kitam to Ravangla & Maenam Wildlife Ridge",
        description: "Drive to Ravangla. Guided birding trail along Maenam Wildlife Sanctuary for laughingthrushes, flycatchers, and minivets."
      },
      {
        day: 3,
        title: "Ravangla to Okhrey Pine Village (Varsey Gateway)",
        description: "Scenic transfer to peaceful Sherpa village Okhrey. Evening golden hour landscape photography over Mount Kanchenjunga."
      },
      {
        day: 4,
        title: "Varsey Rhododendron Sanctuary Photography Trail",
        description: "Full day trek through Varsey Rhododendron Sanctuary (10,000 ft) surrounded by blooming red rhododendron canopies and bird calls."
      },
      {
        day: 5,
        title: "Okhrey to Pelling Panoramic Viewpoints",
        description: "Scenic drive to Pelling. Sunset photography at ancient Rabdentse Palace Ruins and Pemayangtse Monastery."
      },
      {
        day: 6,
        title: "Pelling Departure to NJP Station / Bagdogra Airport",
        description: "Early morning Kanchenjunga sunrise photo session, followed by breakfast and private transfer to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Dedicated 4WD mountain SUV throughout with experienced slow-pace photo driver",
      "Certified local Sikkim wildlife naturalist guide with spotting scopes and field guides",
      "5 Nights accommodation in scenic birding lodges and eco-homestays with all meals",
      "Sanctuary entrance permits, photography camera fees, and conservation cess"
    ],
    permitsRequired: true,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 15800, hotelType: "Cozy Eco-Homestays & Birding Lodges" },
      premium: { price: 18200, hotelType: "3-Star Standard Nature Resorts (Summit / Wildflower)" },
      luxury: { price: 26500, hotelType: "Luxury Alpine Wooden Cottages & The Chumbi Retreat" }
    }
  },
  {
    id: "pkg-namchi-char-dham-3n4d-spiritual",
    title: "3 Nights / 4 Days South Sikkim Spiritual Circuit: Siddhesvara Dham (Char Dham), Samdruptse & Temi",
    duration: "3 Nights / 4 Days",
    location: "Namchi (2N) & Ravangla Buddha Park (1N), South Sikkim",
    category: "South-West Sikkim",
    priceStarting: 10900,
    rating: 4.9,
    reviewsCount: 124,
    heroImage: "/images/ravangla_buddha_park_1785680605794.jpg",
    highlights: [
      "Replicas of India's 4 Sacred Dhams (Badrinath, Jagannath, Dwarka, Rameshwaram) with 108ft Shiva statue",
      "118ft gold-plated Guru Padmasambhava Statue atop sacred Samdruptse Hill",
      "Majestic 130ft Buddha Statue at Ravangla Buddha Park with consecrated relics",
      "Temi Tea Estate tour (Sikkim's only organic tea garden) with fresh tea tasting",
      "100% Pure vegetarian and Jain meal options guaranteed"
    ],
    itinerary: [
      {
        day: 1,
        title: "NJP/IXB Airport Pickup to Namchi Spiritual Center",
        description: "Chauffeur reception and scenic drive through tea garden slopes to Namchi. Check-in at hotel and evening Aarti at Siddhesvara Dham."
      },
      {
        day: 2,
        title: "Namchi Char Dham & Samdruptse Hill Exploration",
        description: "Full day spiritual tour of Siddhesvara Dham (12 Jyotirlingas & Char Dham replicas), 118ft Samdruptse statue, and Ngadak Monastery."
      },
      {
        day: 3,
        title: "Namchi to Ravangla Buddha Park via Temi Tea Estate",
        description: "Stroll through organic tea trails at Temi Tea Garden. Visit the iconic 130ft Buddha statue at Ravangla Buddha Park. Night stay in Ravangla."
      },
      {
        day: 4,
        title: "Ravangla Departure to NJP Station / Bagdogra Airport",
        description: "Breakfast at hotel and private drive down through South Sikkim river valleys to NJP Station or Bagdogra Airport."
      }
    ],
    included: [
      "Private mountain vehicle throughout with courteous hill driver",
      "3 Nights 3★ hotel accommodation with daily Pure Veg Breakfast & Dinner (MAP Plan)",
      "Temple entry passes, Char Dham parking, tolls, and driver allowances",
      "Pure vegetarian and strict Jain meals guaranteed"
    ],
    permitsRequired: false,
    vegMealsAvailable: true,
    hotelTiers: {
      deluxe: { price: 8900, hotelType: "Comfort Pure Veg Deluxe Stays in Namchi & Ravangla" },
      premium: { price: 10900, hotelType: "3-Star Standard Summit / Jain Group Hotels" },
      luxury: { price: 17500, hotelType: "Luxury Heritage Mountain Resorts & Spa" }
    }
  }
];
