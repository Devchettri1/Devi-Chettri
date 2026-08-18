import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MapPin,
  Navigation,
  Mountain,
  ShieldAlert,
  Compass,
  ExternalLink,
  Clock,
  Info,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Map as MapIcon,
  Layers,
  Camera,
  AlertTriangle,
  Key,
  Globe,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Car,
  TrendingUp,
  Radio,
  Share2,
  Thermometer,
  Wind,
  Award,
  Calendar,
} from 'lucide-react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const isValidGoogleMapsKey = (key: any): boolean => {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (
    trimmed === '' ||
    trimmed === 'YOUR_API_KEY' ||
    trimmed === 'undefined' ||
    trimmed === 'null' ||
    trimmed.length < 25 ||
    !trimmed.startsWith('AIza')
  ) {
    return false;
  }
  return true;
};

const hasValidKey = isValidGoogleMapsKey(API_KEY);

export interface Waypoint {
  id: string;
  name: string;
  altitude: string; // e.g. "5,410 ft"
  elevationFeet: number;
  lat: number;
  lng: number;
  distanceFromPrev: string; // e.g. "55 km"
  driveTime: string; // e.g. "2.5 hrs"
  highlights: string[];
  type: 'hub' | 'lake' | 'pass' | 'valley' | 'hill' | 'border' | 'monastery' | 'city';
  permitRequired?: boolean;
  permitType?: string;
  image?: string;
  description: string;
}

export interface RouteData {
  id: string;
  matchedKey: string;
  routeName: string;
  tagline: string;
  circuitType: string;
  totalDistance: string;
  maxElevation: string;
  maxElevationFeet: number;
  minElevationFeet: number;
  requiredPermits: string[];
  recommendedVehicle: string;
  bestTravelMonths: string;
  googleMapsDirectionsUrl: string;
  waypoints: Waypoint[];
}

// Master Route Database with Detailed Circuit Topologies
export const ROUTE_DATASETS: Record<string, RouteData> = {
  'north-sikkim': {
    id: 'north-sikkim',
    matchedKey: '4N/5D North Sikkim Special (Gurudongmar & Zero Point)',
    routeName: 'NJP to Gangtok & North Sikkim High-Altitude Circuit (5N/6D)',
    tagline: 'Gateway Plains ➔ Teesta Gorge ➔ Capital Gangtok ➔ Gurudongmar Lake (17,800 ft) ➔ Zero Point (15,300 ft)',
    circuitType: 'Extreme High-Altitude Alpine Circuit',
    totalDistance: '680 km Complete Circuit',
    maxElevation: '17,800 ft (Gurudongmar Lake)',
    maxElevationFeet: 17800,
    minElevationFeet: 328,
    requiredPermits: ['Protected Area Permit (PAP)', 'Sub-Divisional Magistrate (SDM) Army Border Pass'],
    recommendedVehicle: 'Heavy 4WD Mahindra Scorpio / Tata Safari / Toyota Innova Crysta',
    bestTravelMonths: 'March to June (Flowers & Snow) & October to December (Clear Skies)',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/Bagdogra+Airport/Sevoke/Gangtok/Mangan/Chungthang/Lachen/Gurudongmar+Lake/Lachung/Yumthang+Valley/Zero+Point/Singtam/Bagdogra+Airport',
    waypoints: [
      {
        id: 'ixb_start',
        name: 'Bagdogra Airport (IXB) / NJP',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: 'Circuit Start Point',
        driveTime: '0 hrs',
        highlights: ['Private SUV Chauffeur Welcome', 'Flight & Train Pickups', 'Foothills Entry'],
        type: 'hub',
        description: 'Gateway arrival terminal in Siliguri plains. Your dedicated heavy 4WD SUV and local driver welcome you with traditional Sikkimese khadas and chilled mineral water.',
      },
      {
        id: 'sevoke_teesta',
        name: 'Sevoke Coronation Bridge & Teesta Gorge',
        altitude: '720 ft',
        elevationFeet: 720,
        lat: 26.8851,
        lng: 88.4729,
        distanceFromPrev: '26 km from IXB',
        driveTime: '45 mins scenic drive',
        highlights: ['Historic 1941 British Arch Bridge', 'Emerald Teesta River Confluence', 'Mahananda Wildlife View'],
        type: 'valley',
        description: 'Scenic gateway to the Himalayas where NH-10 crosses the turquoise Teesta River. Famous for the yellow Coronation Arch Bridge and river viewpoint stops.',
      },
      {
        id: 'gangtok',
        name: 'Gangtok Capital & Permit Desk',
        altitude: '5,410 ft',
        elevationFeet: 5410,
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: '98 km from Sevoke',
        driveTime: '3.5 hrs mountain drive',
        highlights: ['MG Marg Pedestrian Promenade', 'SDM North Sikkim Permit Processing', 'Rumtek Monastery', 'Cable Car Ropeway'],
        type: 'city',
        image: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg',
        description: 'Capital hub of Sikkim. Our office team processes your North Sikkim SDM Army Permits with voter IDs and photographs while you enjoy evening walks along vehicle-free MG Marg.',
      },
      {
        id: 'mangan',
        name: 'Mangan (North Sikkim HQ)',
        altitude: '3,950 ft',
        elevationFeet: 3950,
        lat: 27.5085,
        lng: 88.5284,
        distanceFromPrev: '65 km from Gangtok',
        driveTime: '2.5 hrs mountain drive',
        highlights: ['Cardamom Capital of India', 'Seven Sisters Waterfalls', 'Naga Waterfall Viewpoint'],
        type: 'valley',
        permitRequired: true,
        permitType: 'North Sikkim PAP Checkpoint',
        description: 'District headquarters of North Sikkim known for organic cardamom plantations, rushing waterfalls along the road, and initial military permit verification.',
      },
      {
        id: 'chungthang',
        name: 'Chungthang Confluence',
        altitude: '5,800 ft',
        elevationFeet: 5800,
        lat: 27.6042,
        lng: 88.6469,
        distanceFromPrev: '30 km from Mangan',
        driveTime: '1.5 hrs river drive',
        highlights: ['Lachen & Lachung River Fork', 'Guru Dongmar Sacred Rock', 'Valley Division Point'],
        type: 'valley',
        permitRequired: true,
        permitType: 'North District Police Verification',
        description: 'Historic river confluence where Lachen Chu and Lachung Chu merge to form the Teesta River. The road divides into two iconic valleys: Lachen (Left) and Lachung (Right).',
      },
      {
        id: 'lachen',
        name: 'Lachen Bhutia Village',
        altitude: '9,200 ft',
        elevationFeet: 9200,
        lat: 27.7167,
        lng: 88.5500,
        distanceFromPrev: '28 km from Chungthang',
        driveTime: '2 hrs high altitude climb',
        highlights: ['Traditional Wooden Homestays', 'Lachen Monastery', 'Gurudongmar Acclimatization Base'],
        type: 'valley',
        permitRequired: true,
        permitType: 'Sub-Divisional Magistrate Protected Area Pass',
        description: 'Picturesque high-altitude Bhutia village nestled under towering pine peaks. Night halt destination before early morning (4:00 AM) ascent to Gurudongmar Lake.',
      },
      {
        id: 'thangu',
        name: 'Thangu & Chopta Valley',
        altitude: '13,500 ft',
        elevationFeet: 13500,
        lat: 27.9015,
        lng: 88.5320,
        distanceFromPrev: '36 km from Lachen',
        driveTime: '2 hrs alpine drive',
        highlights: ['Nomadic Tibetan Yak Herders', 'Alpine Tundra Vegetation', 'Hot Maggi & Black Tea Stalls'],
        type: 'pass',
        permitRequired: true,
        permitType: 'Indian Army High Altitude Clearance',
        description: 'Alpine acclimatization halt with wooden military outposts and frozen streams. Nomadic herds of yaks graze on the tundra before the final plateau ascent.',
      },
      {
        id: 'gurudongmar',
        name: 'Gurudongmar Sacred Lake',
        altitude: '17,800 ft',
        elevationFeet: 17800,
        lat: 28.0258,
        lng: 88.7097,
        distanceFromPrev: '30 km from Thangu',
        driveTime: '1.5 hrs plateau drive',
        highlights: ['One of Highest Sacred Lakes on Earth', 'Never Fully Freezes (Blessed Spot)', 'Tibetan Plateau Panorama'],
        type: 'lake',
        permitRequired: true,
        permitType: 'Indian Army Special Frontier Clearance',
        image: '/src/assets/images/yumthang_zero_point_1785680592273.jpg',
        description: 'Breathtaking sacred turquoise glacial lake revered by Buddhists, Hindus, and Sikhs. Majestic Tibetan plateau surrounds the crystal clear water against Mount Siniolchu.',
      },
      {
        id: 'lachung',
        name: 'Lachung Valley of Apples',
        altitude: '8,610 ft',
        elevationFeet: 8610,
        lat: 27.6891,
        lng: 88.7430,
        distanceFromPrev: '94 km from Gurudongmar',
        driveTime: '4.5 hrs scenic descent',
        highlights: ['Lachung Monastery (1880)', 'Organic Apple Orchards', 'Snow-Draped Mountain Amphitheater'],
        type: 'valley',
        permitRequired: true,
        permitType: 'Restricted Area Permit (RAP)',
        description: 'Quaint mountain hamlet on the banks of Lachung Chu river. Renowned for traditional wooden cottages, roaring fireplaces, and warm mountain hospitality.',
      },
      {
        id: 'yumthang',
        name: 'Yumthang Valley of Flowers',
        altitude: '11,800 ft',
        elevationFeet: 11800,
        lat: 27.8280,
        lng: 88.6960,
        distanceFromPrev: '25 km from Lachung',
        driveTime: '1 hr winding drive',
        highlights: ['24+ Rhododendron Bloom Species', 'Natural Sulphur Hot Spring', 'Grazing Yaks along Riverbank'],
        type: 'valley',
        permitRequired: true,
        permitType: 'Forest Department Pass',
        image: '/src/assets/images/yumthang_zero_point_1785680592273.jpg',
        description: 'World-famous Himalayan Valley of Flowers carpeted in vivid blooms from April to June and glistening under thick snow sheets during winter.',
      },
      {
        id: 'zeropoint',
        name: 'Yumesamdong / Zero Point',
        altitude: '15,300 ft',
        elevationFeet: 15300,
        lat: 27.9100,
        lng: 88.7400,
        distanceFromPrev: '23 km from Yumthang',
        driveTime: '1.5 hrs rugged 4WD drive',
        highlights: ['Civilian Motorable End Point', 'Permanent Snowfields & Glaciers', 'Indo-China Border Closeness'],
        type: 'pass',
        permitRequired: true,
        permitType: 'Special Zero Point Supplemental Permit',
        image: '/src/assets/images/yumthang_zero_point_1785680592273.jpg',
        description: 'Where civilian roads terminate at 15,300 ft amidst perennial snow fields, jagged glaciers, and the Indo-China frontier mountain barrier.',
      },
      {
        id: 'singtam_return',
        name: 'Singtam / Rangpo Riverside Corridor',
        altitude: '1,050 ft',
        elevationFeet: 1050,
        lat: 27.1764,
        lng: 88.5298,
        distanceFromPrev: '145 km from Zero Point',
        driveTime: '5 hrs return drive',
        highlights: ['Teesta River Road', 'Local Sweet Shops', 'Smooth Highway Corridor'],
        type: 'hub',
        description: 'Return valley descent through South Sikkim foothills along the river corridor, completing the high-altitude alpine loop.',
      },
      {
        id: 'ixb_end',
        name: 'Bagdogra / NJP Departure Hub',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: '78 km from Singtam',
        driveTime: '2.5 hrs highway drive',
        highlights: ['Airport / Railway Drop', 'Sweet Memories & Souvenirs', 'Trip Farewell'],
        type: 'hub',
        description: 'Circuit completion at Bagdogra Airport or NJP Railway Station for your flight/train home with unforgettable Himalayan memories.',
      },
    ],
  },

  'grand-circuit': {
    id: 'grand-circuit',
    matchedKey: '5N/6D Sikkim & Darjeeling Grand Circuit',
    routeName: 'Sikkim & Darjeeling Grand Circuit (5N/6D)',
    tagline: 'Plains ➔ Gangtok Capital ➔ Tsomgo Lake ➔ Nathula Pass (14,140 ft) ➔ Pelling Skywalk ➔ Darjeeling Tea Hills',
    circuitType: 'Signature Mountain Highlights Circuit',
    totalDistance: '520 km Heritage Circuit',
    maxElevation: '14,140 ft (Nathula Pass)',
    maxElevationFeet: 14140,
    minElevationFeet: 328,
    requiredPermits: ['Protected Area Permit (PAP)', 'Nathula Special Army Border Pass'],
    recommendedVehicle: 'Toyota Innova Crysta / Mahindra Scorpio',
    bestTravelMonths: 'Year Round (Best: Oct–May)',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/Bagdogra+Airport/Gangtok/Tsomgo+Lake/Nathula/Pelling/Darjeeling/Bagdogra+Airport',
    waypoints: [
      {
        id: 'ixb',
        name: 'Bagdogra / NJP',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: 'Start Point',
        driveTime: '0 hrs',
        highlights: ['Airport / Railway Pickups', 'Teesta River Bridge View'],
        type: 'hub',
        description: 'Gateway entry point. Our private Innova Crysta driver welcomes you for a scenic drive along the Teesta River Valley.',
      },
      {
        id: 'gangtok',
        name: 'Gangtok Capital',
        altitude: '5,410 ft',
        elevationFeet: 5410,
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: '124 km from NJP',
        driveTime: '4.5 hrs drive',
        highlights: ['MG Marg Pedestrian Walkway', 'Rumtek Monastery', 'Gangtok Cable Car Ropeway'],
        type: 'city',
        image: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg',
        description: 'Vibrant capital of Sikkim with pedestrian shopping streets, monasteries, and pure vegetarian dining options.',
      },
      {
        id: 'tsomgo',
        name: 'Tsomgo Lake (Changu)',
        altitude: '12,310 ft',
        elevationFeet: 12310,
        lat: 27.3807,
        lng: 88.7618,
        distanceFromPrev: '38 km from Gangtok',
        driveTime: '1.5 hrs drive',
        highlights: ['Glacial Sacred Water', 'Yak Rides on Snow', 'Ropeway to 14,000 ft Viewpoint'],
        type: 'lake',
        permitRequired: true,
        permitType: 'Sikkim Tourism Protected Area Permit',
        image: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg',
        description: 'High-altitude sacred oval lake surrounded by snow-capped Himalayan peaks. Yaks with colorful decor available for rides.',
      },
      {
        id: 'nathula',
        name: 'Nathula Pass (Indo-China Border)',
        altitude: '14,140 ft',
        elevationFeet: 14140,
        lat: 27.3867,
        lng: 88.8317,
        distanceFromPrev: '16 km from Tsomgo',
        driveTime: '45 mins drive',
        highlights: ['Historic Silk Route Pass', 'Indo-China Border Pillar', 'Baba Harbhajan Singh Shrine'],
        type: 'border',
        permitRequired: true,
        permitType: 'Indian Army Special Clearance Pass (PAP)',
        image: '/src/assets/images/nathula_pass_snow_1785681052944.jpg',
        description: 'High altitude mountain pass on the ancient Silk Route connecting India and Tibet. Army border post with heavy snow cover.',
      },
      {
        id: 'pelling',
        name: 'Pelling West Sikkim',
        altitude: '7,200 ft',
        elevationFeet: 7200,
        lat: 27.3168,
        lng: 88.2372,
        distanceFromPrev: '132 km from Gangtok',
        driveTime: '5 hrs drive',
        highlights: ['Glass Skywalk Sanga Choeling', 'Kanchenjunga Panoramic Views', 'Rabdentse Palace Ruins'],
        type: 'hill',
        image: '/src/assets/images/ravangla_buddha_park_1785680605794.jpg',
        description: 'Picturesque West Sikkim town offering up-close views of Mt. Kanchenjunga and India’s first Glass Skywalk.',
      },
      {
        id: 'darjeeling',
        name: 'Darjeeling Queen of Hills',
        altitude: '6,700 ft',
        elevationFeet: 6700,
        lat: 27.041,
        lng: 88.2663,
        distanceFromPrev: '72 km from Pelling',
        driveTime: '3.5 hrs drive',
        highlights: ['Tiger Hill Sunrise', 'UNESCO World Heritage Toy Train', 'Happy Valley Tea Gardens'],
        type: 'hill',
        image: '/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg',
        description: 'Famous hill resort town with sprawling tea estates, colonial architecture, and views of 5 snow peaks.',
      },
      {
        id: 'ixb_return',
        name: 'Bagdogra / NJP Departure',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: '68 km from Darjeeling',
        driveTime: '2.5 hrs drive',
        highlights: ['Downhill Tea Estate Run', 'Drop to Flights/Trains'],
        type: 'hub',
        description: 'Smooth downhill transfer along Kurseong and Rohini tea gardens to Bagdogra Airport.',
      },
    ],
  },

  'silk-route': {
    id: 'silk-route',
    matchedKey: '3N/4D Old Silk Route Zuluk & Reshi Khola',
    routeName: 'Old Silk Route & Zuluk Zig-Zag Circuit (3N/4D)',
    tagline: 'River Camps ➔ 32 Hairpin Curves ➔ Elephant Lake ➔ Historic Trade Path',
    circuitType: 'Historic High-Altitude Heritage Loop',
    totalDistance: '360 km Heritage Loop',
    maxElevation: '13,900 ft (Kupup Lake)',
    maxElevationFeet: 13900,
    minElevationFeet: 328,
    requiredPermits: ['Silk Route Restricted Area Permit (SDO Rongli)'],
    recommendedVehicle: 'Scorpio / Sumo / Innova 4x4',
    bestTravelMonths: 'Oct–May (Snow: Dec–Mar, Wildflowers: Apr–May)',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/NJP/Reshi+Khola/Zuluk/Thambi+View+Point/Gnathang+Valley/Kupup/Gangtok/NJP',
    waypoints: [
      {
        id: 'njp_start',
        name: 'NJP / Bagdogra',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: 'Start Point',
        driveTime: '0 hrs',
        highlights: ['Pickup in Siliguri', 'Rongli Highway Route'],
        type: 'hub',
        description: 'Gateway meeting point with dedicated mountain 4WD vehicle for the historic Silk Route loop.',
      },
      {
        id: 'reshi',
        name: 'Reshi Khola River Bank',
        altitude: '2,000 ft',
        elevationFeet: 2000,
        lat: 27.185,
        lng: 88.632,
        distanceFromPrev: '95 km from NJP',
        driveTime: '3.5 hrs drive',
        highlights: ['Reshi River Angling', 'Forest Camping', 'Warm Climate Gateway'],
        type: 'valley',
        description: 'Serene riverside retreat on the border of Sikkim and West Bengal, ideal for campfire and warm nature walks.',
      },
      {
        id: 'zuluk',
        name: 'Zuluk Village',
        altitude: '9,400 ft',
        elevationFeet: 9400,
        lat: 27.251,
        lng: 88.778,
        distanceFromPrev: '42 km from Reshi',
        driveTime: '2 hrs winding drive',
        highlights: ['Historic Silk Trader Stop', 'Authentic Homestays', 'Local Organic Cuisine'],
        type: 'valley',
        permitRequired: true,
        permitType: 'SDO Rongli Permit Checkpoint',
        description: 'Small village perched on rugged mountains that served as a transit point for ancient Silk Route traders traveling to Tibet.',
      },
      {
        id: 'thambi',
        name: 'Thambi Viewpoint (32 Curves)',
        altitude: '11,200 ft',
        elevationFeet: 11200,
        lat: 27.27,
        lng: 88.785,
        distanceFromPrev: '14 km from Zuluk',
        driveTime: '45 mins hairpin drive',
        highlights: ['32 Loop Zig-Zag Road', 'Kanchenjunga Panorama', 'Sunrise Viewpoint'],
        type: 'pass',
        description: 'Iconic panoramic viewpoint famous for the world-renowned 32 hairpin curves of the Silk Route winding through mountains.',
      },
      {
        id: 'gnathang',
        name: 'Gnathang Valley (Ladakh of East)',
        altitude: '13,500 ft',
        elevationFeet: 13500,
        lat: 27.301,
        lng: 88.812,
        distanceFromPrev: '18 km from Thambi',
        driveTime: '40 mins drive',
        highlights: ['High Altitude Cold Desert', 'Snowy Homestays', 'British War Memorial'],
        type: 'valley',
        description: 'High-altitude cold plateau often called the Ladakh of Sikkim. Covered in deep snow during winter months.',
      },
      {
        id: 'kupup',
        name: 'Kupup Elephant Lake',
        altitude: '13,900 ft',
        elevationFeet: 13900,
        lat: 27.35,
        lng: 88.82,
        distanceFromPrev: '12 km from Gnathang',
        driveTime: '30 mins drive',
        highlights: ['Elephant Shaped Sacred Lake', 'Highest Golf Course', 'Baba Mandir Junction'],
        type: 'lake',
        description: 'Sacred lake shaped exactly like an elephant trunk, adjacent to the Yak Golf Course (highest altitude 18-hole course).',
      },
      {
        id: 'gangtok',
        name: 'Gangtok Hub',
        altitude: '5,410 ft',
        elevationFeet: 5410,
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: '55 km from Kupup',
        driveTime: '2.5 hrs drive',
        highlights: ['Full Loop Complete', 'MG Marg Leisure'],
        type: 'hub',
        description: 'Completing the Silk Route loop back at Gangtok capital city for onwards transfer or local shopping.',
      },
      {
        id: 'njp_return',
        name: 'NJP Departure',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: '124 km from Gangtok',
        driveTime: '4 hrs drive',
        highlights: ['Return Drop', 'Farewell'],
        type: 'hub',
        description: 'Final highway transfer back to NJP/IXB.',
      },
    ],
  },

  'gangtok-tsomgo-darjeeling': {
    id: 'gangtok-tsomgo-darjeeling',
    matchedKey: '4N/5D Gangtok, Tsomgo Lake & Darjeeling',
    routeName: 'Gangtok, Tsomgo Lake & Darjeeling Explorer (4N/5D)',
    tagline: 'Capital Stay ➔ Glacial Lake ➔ Tea Estates ➔ Tiger Hill Sunrise',
    circuitType: 'Popular Family & Couple Circuit',
    totalDistance: '390 km Classic Circuit',
    maxElevation: '12,310 ft (Tsomgo Lake)',
    maxElevationFeet: 12310,
    minElevationFeet: 328,
    requiredPermits: ['Tsomgo Lake Protected Area Permit'],
    recommendedVehicle: 'Swift Dzire / Toyota Innova Crysta',
    bestTravelMonths: 'All 12 Months (Spring & Autumn Peak)',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/NJP/Gangtok/Tsomgo+Lake/Darjeeling/NJP',
    waypoints: [
      {
        id: 'njp',
        name: 'NJP / Bagdogra',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: 'Start Point',
        driveTime: '0 hrs',
        highlights: ['Private Driver Welcome', 'Teesta Scenic Route'],
        type: 'hub',
        description: 'Pickups at NJP Railway or IXB Airport with smooth drive along Sevoke Coronation Bridge and Teesta River.',
      },
      {
        id: 'gangtok',
        name: 'Gangtok City',
        altitude: '5,410 ft',
        elevationFeet: 5410,
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: '124 km',
        driveTime: '4.5 hrs drive',
        highlights: ['MG Marg Night Market', 'Handicraft Center', 'Flower Exhibition Hall'],
        type: 'city',
        description: 'Capital stay with pure vegetarian dining options, MG Marg evening walks, and comfortable hotel stay.',
      },
      {
        id: 'tsomgo',
        name: 'Tsomgo Lake Excursion',
        altitude: '12,310 ft',
        elevationFeet: 12310,
        lat: 27.3807,
        lng: 88.7618,
        distanceFromPrev: '38 km',
        driveTime: '1.5 hrs drive',
        highlights: ['Sacred Tsomgo Lake', 'Baba Mandir Shrine', 'Yak Snow Rides'],
        type: 'lake',
        permitRequired: true,
        permitType: 'Tourism PAP Permit',
        description: 'Day trip to the famous alpine lake surrounded by snow-draped cliffs.',
      },
      {
        id: 'darjeeling',
        name: 'Darjeeling Hill Town',
        altitude: '6,700 ft',
        elevationFeet: 6700,
        lat: 27.041,
        lng: 88.2663,
        distanceFromPrev: '98 km from Gangtok',
        driveTime: '4 hrs drive',
        highlights: ['Mall Road Walkway', 'Ghoom Monastery', 'Batasia Loop'],
        type: 'hill',
        image: '/src/assets/images/darjeeling_toy_train_1785681122611.jpg',
        description: 'Queen of Hills featuring Batasia Loop Toy Train curve, tea gardens, and crisp Himalayan air.',
      },
      {
        id: 'tigerhill',
        name: 'Tiger Hill Sunrise Point',
        altitude: '8,400 ft',
        elevationFeet: 8400,
        lat: 26.994,
        lng: 88.283,
        distanceFromPrev: '11 km from Darjeeling',
        driveTime: '45 mins early morning',
        highlights: ['Golden Kanchenjunga Sunrise', 'Mt. Everest Peak View', 'Chowrasta Mall'],
        type: 'pass',
        description: 'World-famous sunrise point where first rays of sunlight turn Mt. Kanchenjunga into molten gold.',
      },
      {
        id: 'njp_end',
        name: 'NJP / Bagdogra Drop',
        altitude: '328 ft',
        elevationFeet: 328,
        lat: 26.6812,
        lng: 88.3286,
        distanceFromPrev: '68 km from Darjeeling',
        driveTime: '2.5 hrs descent',
        highlights: ['Tea Garden Drive', 'Airport / Station Drop'],
        type: 'hub',
        description: 'Return downhill transfer back to Siliguri plains.',
      },
    ],
  },

  'bhutan': {
    id: 'bhutan',
    matchedKey: 'Bhutan Cultural Odyssey Package',
    routeName: 'Bhutan Cultural Odyssey (Phuentsholing, Thimphu & Paro)',
    tagline: 'Border Gate ➔ Capital Thimphu ➔ Punakha Valley ➔ Paro ➔ Tiger’s Nest (10,240 ft)',
    circuitType: 'International Himalayan Kingdom Circuit',
    totalDistance: '460 km Kingdom Loop',
    maxElevation: '10,240 ft (Tiger’s Nest Monastery)',
    maxElevationFeet: 10240,
    minElevationFeet: 960,
    requiredPermits: ['Bhutan Govt SDF Permit', 'Immigration Entry Clearance'],
    recommendedVehicle: 'Bhutan Tourist SUV / Toyota Coaster Coach',
    bestTravelMonths: 'Sept–Nov (Festivals) & Mar–May (Spring Blooms)',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/Phuentsholing/Thimphu/Punakha/Paro/Taktsang+Monastery/Phuentsholing',
    waypoints: [
      {
        id: 'phuentsholing',
        name: 'Phuentsholing Border Gate',
        altitude: '960 ft',
        elevationFeet: 960,
        lat: 26.862,
        lng: 89.383,
        distanceFromPrev: 'Entry Gate',
        driveTime: '0 hrs',
        highlights: ['Bhutan Gate Clearance', 'SDF Tax Verification'],
        type: 'border',
        permitRequired: true,
        permitType: 'Bhutan Entry Immigration Permit',
        description: 'Border gateway city entering the Kingdom of Bhutan with traditional dragon arch architecture.',
      },
      {
        id: 'thimphu',
        name: 'Thimphu Capital',
        altitude: '7,656 ft',
        elevationFeet: 7656,
        lat: 27.4722,
        lng: 89.639,
        distanceFromPrev: '165 km',
        driveTime: '5 hrs drive',
        highlights: ['Buddha Dordenma Giant Statue', 'Tashichho Dzong', 'National Memorial Chorten'],
        type: 'city',
        description: 'Capital of Bhutan blending modern culture with ancient dzongs and traditional dress laws.',
      },
      {
        id: 'punakha',
        name: 'Punakha Valley & Dzong',
        altitude: '4,300 ft',
        elevationFeet: 4300,
        lat: 27.592,
        lng: 89.877,
        distanceFromPrev: '84 km',
        driveTime: '3 hrs drive',
        highlights: ['Dochula Pass 108 Stupas', 'Punakha Suspension Bridge', 'Palace of Great Happiness'],
        type: 'valley',
        description: 'Sub-tropical valley famous for the majestic Punakha Dzong situated at the confluence of Pho Chhu and Mo Chhu rivers.',
      },
      {
        id: 'paro',
        name: 'Paro Valley',
        altitude: '7,200 ft',
        elevationFeet: 7200,
        lat: 27.428,
        lng: 89.416,
        distanceFromPrev: '115 km',
        driveTime: '3.5 hrs drive',
        highlights: ['National Museum of Bhutan', 'Rinpung Dzong', 'Paro Airport Scenic View'],
        type: 'valley',
        image: '/src/assets/images/bhutan_tigers_nest_1785681037397.jpg',
        description: 'Historic valley home to Bhutan’s only international airport, ancient fortress Dzongs, and lush rice fields.',
      },
      {
        id: 'tigersnest',
        name: 'Taktsang (Tiger’s Nest)',
        altitude: '10,240 ft',
        elevationFeet: 10240,
        lat: 27.4919,
        lng: 89.3634,
        distanceFromPrev: '12 km hike base',
        driveTime: '4 hrs trek',
        highlights: ['Cliffside Sacred Monastery', 'Guru Rinpoche Cave', 'Panoramas of Paro Valley'],
        type: 'monastery',
        permitRequired: true,
        permitType: 'Taktsang Entry Ticket',
        image: '/src/assets/images/bhutan_tigers_nest_1785681037397.jpg',
        description: 'Iconic monastery clinging to a sheer cliff 900 meters above Paro valley floor. Bhutan’s premier spiritual landmark.',
      },
    ],
  },
};

export interface WaypointWeather {
  tempC: number;
  condition: string;
  icon: string;
  windSpeed: number;
  gearRecommendation: string;
}

const WMO_CODE_MAP: Record<number, { condition: string; icon: string }> = {
  0: { condition: 'Clear Sky', icon: '☀️' },
  1: { condition: 'Mainly Clear', icon: '🌤️' },
  2: { condition: 'Partly Cloudy', icon: '⛅' },
  3: { condition: 'Overcast', icon: '☁️' },
  45: { condition: 'Dense Fog', icon: '🌫️' },
  48: { condition: 'Icy Fog', icon: '🌫️' },
  51: { condition: 'Light Drizzle', icon: '🌦️' },
  53: { condition: 'Drizzle', icon: '🌦️' },
  55: { condition: 'Heavy Drizzle', icon: '🌧️' },
  61: { condition: 'Slight Rain', icon: '🌧️' },
  63: { condition: 'Moderate Rain', icon: '🌧️' },
  65: { condition: 'Heavy Rain', icon: '🌧️' },
  71: { condition: 'Slight Snow', icon: '❄️' },
  73: { condition: 'Moderate Snow', icon: '❄️' },
  75: { condition: 'Heavy Snowfall', icon: '❄️' },
  77: { condition: 'Snow Grains', icon: '❄️' },
  80: { condition: 'Rain Showers', icon: '🌧️' },
  81: { condition: 'Moderate Showers', icon: '🌧️' },
  82: { condition: 'Violent Showers', icon: '🌧️' },
  85: { condition: 'Snow Showers', icon: '🌨️' },
  86: { condition: 'Heavy Snow', icon: '🌨️' },
  95: { condition: 'Thunderstorm', icon: '🌩️' },
};

export function getAltitudeEstimatedTemp(altitudeStr: string): number {
  const match = (altitudeStr || '').match(/([\d,]+)/);
  if (!match) return 14;
  const feet = parseInt(match[1].replace(/,/g, ''), 10);
  if (isNaN(feet)) return 14;
  const estimated = Math.round(26 - (feet / 1000) * 1.85);
  return Math.max(-8, Math.min(26, estimated));
}

export function getGearRecommendation(tempC: number, permitRequired?: boolean): string {
  if (tempC <= 0) {
    return '❄️ Sub-zero alpine conditions: Heavy down parka, thermal base layers, fleece-lined gloves & insulated snow boots required.';
  } else if (tempC <= 8) {
    return '🧥 High altitude cold: Windproof jacket, heavy woolen sweater, beanie & warm trekking shoes recommended.';
  } else if (tempC <= 15) {
    return '🧥 Cool mountain climate: Light fleece or windbreaker jacket with comfortable closed walking shoes.';
  } else {
    return '👕 Pleasant mountain climate: Comfortable cotton/fleece layers, sunglasses & sun cap.';
  }
}

export async function fetchWeatherForWaypoints(
  waypoints: Waypoint[]
): Promise<Record<string, WaypointWeather>> {
  const weatherMap: Record<string, WaypointWeather> = {};

  await Promise.all(
    waypoints.map(async (wp) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${wp.lat}&longitude=${wp.lng}&current_weather=true`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data?.current_weather) {
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            const wind = Math.round(data.current_weather.windspeed);
            const mapped = WMO_CODE_MAP[code] || { condition: 'Partly Cloudy', icon: '⛅' };
            weatherMap[wp.id] = {
              tempC: temp,
              condition: mapped.condition,
              icon: mapped.icon,
              windSpeed: wind,
              gearRecommendation: getGearRecommendation(temp, wp.permitRequired),
            };
            return;
          }
        }
      } catch (err) {
        // Fallback to altitude-based estimation
      }

      const estTemp = getAltitudeEstimatedTemp(wp.altitude);
      const isHighAlt = wp.lat > 27.5 || estTemp < 6;
      weatherMap[wp.id] = {
        tempC: estTemp,
        condition: estTemp <= 2 ? 'Snowy Cold' : isHighAlt ? 'Partly Cloudy' : 'Pleasant Mountain Clear',
        icon: estTemp <= 2 ? '❄️' : estTemp <= 10 ? '⛅' : '☀️',
        windSpeed: isHighAlt ? 18 : 10,
        gearRecommendation: getGearRecommendation(estTemp, wp.permitRequired),
      };
    })
  );

  return weatherMap;
}

export function parseDriveTimeMins(driveTimeStr: string): number {
  if (!driveTimeStr) return 0;
  const str = driveTimeStr.toLowerCase();
  if (str.includes('min')) {
    const match = str.match(/(\d+)\s*min/);
    return match ? parseInt(match[1], 10) : 30;
  }
  const match = str.match(/([\d.]+)\s*hr/);
  if (match) {
    const hours = parseFloat(match[1]);
    return Math.round(hours * 60);
  }
  return 0;
}

export function extractDistanceKm(distStr: string): string {
  if (!distStr || distStr.toLowerCase().includes('start')) return '0 km';
  const match = distStr.match(/(\d+\s*km)/i);
  return match ? match[1] : distStr;
}

// Generate intermediate step coordinates for high-precision path animation
function interpolatePathPoints(waypoints: Waypoint[], pointsPerLeg = 25): Array<{ lat: number; lng: number; legIndex: number }> {
  const points: Array<{ lat: number; lng: number; legIndex: number }> = [];
  if (waypoints.length < 2) return points;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const start = waypoints[i];
    const end = waypoints[i + 1];
    for (let j = 0; j <= pointsPerLeg; j++) {
      const fraction = j / pointsPerLeg;
      points.push({
        lat: start.lat + (end.lat - start.lat) * fraction,
        lng: start.lng + (end.lng - start.lng) * fraction,
        legIndex: i,
      });
    }
  }
  return points;
}

// Get elevation color token based on feet
function getElevationColor(feet: number): { hex: string; bg: string; text: string } {
  if (feet >= 15000) return { hex: '#c084fc', bg: 'bg-purple-950/80', text: 'text-purple-300' };
  if (feet >= 11000) return { hex: '#38bdf8', bg: 'bg-sky-950/80', text: 'text-sky-300' };
  if (feet >= 7000) return { hex: '#fbbf24', bg: 'bg-amber-950/80', text: 'text-amber-300' };
  if (feet >= 3000) return { hex: '#34d399', bg: 'bg-emerald-950/80', text: 'text-emerald-300' };
  return { hex: '#2dd4bf', bg: 'bg-teal-950/80', text: 'text-teal-300' };
}

// Interactive Waypoint Marker Component
function InteractiveWaypointMarker({
  waypoint,
  index,
  totalWaypoints,
  isSelected,
  isActiveInSimulation,
  onSelect,
  weather,
}: {
  waypoint: Waypoint;
  index: number;
  totalWaypoints: number;
  isSelected: boolean;
  isActiveInSimulation: boolean;
  onSelect: () => void;
  weather?: WaypointWeather;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setInfoOpen(true);
    }
  }, [isSelected]);

  const elev = getElevationColor(waypoint.elevationFeet);
  const isStartOrEnd = index === 0 || index === totalWaypoints - 1;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: waypoint.lat, lng: waypoint.lng }}
        title={`${index + 1}. ${waypoint.name} (${waypoint.altitude})`}
        onClick={() => {
          onSelect();
          setInfoOpen(true);
        }}
        zIndex={isSelected ? 1000 : isActiveInSimulation ? 900 : index + 20}
      >
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 shadow-2xl backdrop-blur-md cursor-pointer transition-all transform ${
            isSelected
              ? 'bg-[#153451] border-[#C6A15B] text-[#D9BC7A] ring-4 ring-[#C6A15B]/50 scale-110'
              : isActiveInSimulation
              ? 'bg-cyan-950 border-cyan-400 text-cyan-200 ring-4 ring-cyan-400/40 scale-105 animate-pulse'
              : isStartOrEnd
              ? 'bg-slate-900/95 border-emerald-400 text-emerald-300'
              : waypoint.permitRequired
              ? 'bg-amber-950/95 border-amber-500 text-amber-200'
              : 'bg-slate-900/95 border-sky-500 text-sky-200 hover:scale-105'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full font-extrabold text-[10px] flex items-center justify-center ${
              isSelected
                ? 'bg-[#D9BC7A] text-slate-950'
                : isActiveInSimulation
                ? 'bg-cyan-400 text-slate-950'
                : isStartOrEnd
                ? 'bg-emerald-400 text-slate-950'
                : waypoint.permitRequired
                ? 'bg-amber-500 text-slate-950'
                : 'bg-sky-400 text-slate-950'
            }`}
          >
            {index + 1}
          </span>
          <span className="text-xs font-black whitespace-nowrap">{waypoint.name}</span>

          <span
            className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded"
            style={{ color: elev.hex, backgroundColor: 'rgba(0,0,0,0.6)' }}
          >
            {waypoint.altitude}
          </span>

          {weather && (
            <span className="ml-0.5 bg-sky-950/90 text-sky-200 text-[10px] px-1.5 py-0.2 rounded-full border border-sky-400/40 font-mono font-bold flex items-center gap-0.5">
              <span>{weather.icon}</span>
              <span>{weather.tempC}°C</span>
            </span>
          )}
        </div>
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
          <div className="p-2.5 max-w-xs space-y-2 text-slate-900 font-sans">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-800">
                  Stop #{index + 1} of {totalWaypoints}
                </div>
                <span className="font-extrabold text-sm text-slate-950">
                  {waypoint.name}
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                <Mountain className="w-3 h-3 text-amber-700" />
                <span>{waypoint.altitude}</span>
              </span>
            </div>

            <p className="text-[11.5px] text-slate-700 leading-snug">
              {waypoint.description}
            </p>

            {weather && (
              <div className="bg-sky-50 p-2 rounded-lg border border-sky-200 text-[10.5px] space-y-1">
                <div className="flex items-center justify-between font-bold text-sky-950">
                  <span className="flex items-center gap-1">
                    <span>{weather.icon}</span>
                    <span>{weather.tempC}°C</span>
                    <span className="font-normal text-sky-800">({weather.condition})</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">💨 {weather.windSpeed} km/h</span>
                </div>
                <div className="text-slate-700 text-[10px] italic leading-tight">
                  {weather.gearRecommendation}
                </div>
              </div>
            )}

            {waypoint.permitRequired && (
              <div className="text-[10.5px] font-extrabold text-amber-900 bg-amber-100 p-1.5 rounded-md border border-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                <span>{waypoint.permitType || 'Protected Area Permit Required'}</span>
              </div>
            )}

            <div className="text-[10px] text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>Drive: {waypoint.driveTime}</span>
              </span>
              <span>Dist: {waypoint.distanceFromPrev}</span>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

// Interactive Map Layer with Realtime Path Drawing & Active Vehicle Simulation
function InteractiveRouteMapLayer({
  waypoints,
  selectedWaypointId,
  onSelectWaypoint,
  weatherDataMap,
  simulationProgress,
  activeLegIndex,
  isPlaying,
}: {
  waypoints: Waypoint[];
  selectedWaypointId: string | null;
  onSelectWaypoint: (wp: Waypoint) => void;
  weatherDataMap?: Record<string, WaypointWeather>;
  simulationProgress: number; // 0 to 1
  activeLegIndex: number;
  isPlaying: boolean;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const fullPolylineRef = useRef<google.maps.Polyline | null>(null);
  const activeTrailPolylineRef = useRef<google.maps.Polyline | null>(null);
  const interpolatedPoints = useMemo(() => interpolatePathPoints(waypoints, 30), [waypoints]);

  // Fit bounds and setup polylines
  useEffect(() => {
    if (!map || waypoints.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    waypoints.forEach((wp) => bounds.extend({ lat: wp.lat, lng: wp.lng }));
    map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });

    // Clean up previous polylines
    if (fullPolylineRef.current) fullPolylineRef.current.setMap(null);
    if (activeTrailPolylineRef.current) activeTrailPolylineRef.current.setMap(null);

    const fullPath = waypoints.map((w) => ({ lat: w.lat, lng: w.lng }));

    // Base glowing circuit polyline
    const fullPoly = new google.maps.Polyline({
      path: fullPath,
      geodesic: true,
      strokeColor: '#C6A15B',
      strokeOpacity: 0.85,
      strokeWeight: 5,
      map,
    });
    fullPolylineRef.current = fullPoly;

    // Active trail polyline with glowing cyan accent
    const activePoly = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: '#00f0ff',
      strokeOpacity: 0.95,
      strokeWeight: 6,
      map,
    });
    activeTrailPolylineRef.current = activePoly;

    // Try Route.computeRoutes for enhanced route matching if available
    if (routesLib && waypoints.length >= 2) {
      const origin = { lat: waypoints[0].lat, lng: waypoints[0].lng };
      const destination = {
        lat: waypoints[waypoints.length - 1].lat,
        lng: waypoints[waypoints.length - 1].lng,
      };
      const intermediates = waypoints.slice(1, waypoints.length - 1).map((w) => ({
        location: { lat: w.lat, lng: w.lng },
      }));

      routesLib.Route.computeRoutes({
        origin,
        destination,
        intermediates: intermediates as any,
        travelMode: 'DRIVING',
        fields: ['path', 'viewport'],
      })
        .then(({ routes }) => {
          if (routes?.[0]) {
            const newPolylines = routes[0].createPolylines();
            newPolylines.forEach((p) => {
              p.setOptions({
                strokeColor: '#C6A15B',
                strokeWeight: 5,
                strokeOpacity: 0.9,
              });
              p.setMap(map);
            });
            if (routes[0].viewport) {
              map.fitBounds(routes[0].viewport, { top: 60, bottom: 60, left: 60, right: 60 });
            }
          }
        })
        .catch(() => {
          // Fallback to custom geodesic polyline
        });
    }

    return () => {
      if (fullPolylineRef.current) fullPolylineRef.current.setMap(null);
      if (activeTrailPolylineRef.current) activeTrailPolylineRef.current.setMap(null);
    };
  }, [map, routesLib, waypoints]);

  // Update active simulation trail
  useEffect(() => {
    if (!activeTrailPolylineRef.current || interpolatedPoints.length === 0) return;

    const targetIdx = Math.min(
      Math.floor(simulationProgress * (interpolatedPoints.length - 1)),
      interpolatedPoints.length - 1
    );

    const activePoints = interpolatedPoints.slice(0, targetIdx + 1).map((p) => ({
      lat: p.lat,
      lng: p.lng,
    }));

    activeTrailPolylineRef.current.setPath(activePoints);
  }, [simulationProgress, interpolatedPoints]);

  // Derive current vehicle position
  const currentVehiclePoint = useMemo(() => {
    if (interpolatedPoints.length === 0) return waypoints[0];
    const targetIdx = Math.min(
      Math.floor(simulationProgress * (interpolatedPoints.length - 1)),
      interpolatedPoints.length - 1
    );
    return interpolatedPoints[targetIdx] || waypoints[0];
  }, [simulationProgress, interpolatedPoints, waypoints]);

  return (
    <>
      {/* Intermediate Distance / Drive Time Badges between Waypoints */}
      {waypoints.slice(1).map((wp, idx) => {
        const prevWp = waypoints[idx];
        const midLat = (prevWp.lat + wp.lat) / 2;
        const midLng = (prevWp.lng + wp.lng) / 2;
        const dist = extractDistanceKm(wp.distanceFromPrev);
        const mins = parseDriveTimeMins(wp.driveTime);

        return (
          <AdvancedMarker
            key={`leg-${prevWp.id}-${wp.id}`}
            position={{ lat: midLat, lng: midLng }}
            zIndex={40}
            title={`Leg ${idx + 1}: ${prevWp.name} ➔ ${wp.name}: ${dist}, ${mins} mins`}
          >
            <div className="bg-[#0B1F3A]/95 text-[#D9BC7A] border border-[#C6A15B]/70 px-2 py-0.5 rounded-full text-[9px] font-extrabold shadow-xl backdrop-blur-md flex items-center gap-1 cursor-default hover:scale-110 transition-transform">
              <Navigation className="w-2.5 h-2.5 text-[#C6A15B] flex-shrink-0" />
              <span>{dist}</span>
              <span className="text-slate-400">•</span>
              <Clock className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
              <span>{mins}m</span>
            </div>
          </AdvancedMarker>
        );
      })}

      {/* Simulated 4WD Expedition Vehicle Pin Marker */}
      {currentVehiclePoint && (
        <AdvancedMarker
          position={{ lat: currentVehiclePoint.lat, lng: currentVehiclePoint.lng }}
          zIndex={1500}
          title="Active Expedition Vehicle on Circuit"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulse Radar Ring */}
            <span className="absolute w-12 h-12 rounded-full bg-cyan-400/30 animate-ping pointer-events-none" />
            <div className="relative px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-black text-[10px] rounded-full shadow-2xl border-2 border-white flex items-center gap-1.5 transform -translate-y-2 scale-110">
              <Car className="w-3.5 h-3.5 fill-slate-950 animate-bounce" />
              <span>Innova Crysta 4WD</span>
            </div>
          </div>
        </AdvancedMarker>
      )}

      {/* Interactive Waypoints */}
      {waypoints.map((wp, idx) => (
        <InteractiveWaypointMarker
          key={wp.id}
          waypoint={wp}
          index={idx}
          totalWaypoints={waypoints.length}
          isSelected={selectedWaypointId === wp.id}
          isActiveInSimulation={activeLegIndex === idx || activeLegIndex === idx - 1}
          onSelect={() => onSelectWaypoint(wp)}
          weather={weatherDataMap ? weatherDataMap[wp.id] : undefined}
        />
      ))}
    </>
  );
}

// Google Maps Interactive Route Viewer Container
function GoogleMapRouteViewer({
  waypoints,
  selectedWaypoint,
  onSelectWaypoint,
  routeName,
  weatherDataMap,
  simulationProgress,
  activeLegIndex,
  isPlaying,
}: {
  waypoints: Waypoint[];
  selectedWaypoint: Waypoint;
  onSelectWaypoint: (wp: Waypoint) => void;
  routeName: string;
  weatherDataMap?: Record<string, WaypointWeather>;
  simulationProgress: number;
  activeLegIndex: number;
  isPlaying: boolean;
}) {
  const [mapTypeId, setMapTypeId] = useState<'hybrid' | 'satellite' | 'terrain' | 'roadmap'>('hybrid');
  const [mapError, setMapError] = useState(false);

  const defaultCenter = selectedWaypoint
    ? { lat: selectedWaypoint.lat, lng: selectedWaypoint.lng }
    : { lat: 27.5, lng: 88.6 };

  if (!hasValidKey || mapError) {
    return (
      <div className="bg-[#0B1F3A] border border-[#C6A15B]/40 rounded-2xl p-5 space-y-4 text-slate-100 shadow-2xl">
        <div className="flex items-start gap-3 p-4 bg-amber-950/80 border border-amber-600/60 rounded-xl">
          <Key className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-amber-100">
            <h4 className="font-extrabold text-amber-300 text-sm">
              Google Maps Platform API Key Setup Required
            </h4>
            <p className="leading-relaxed">
              To render the real-time Google Maps interactive satellite path drawing and waypoint routing for{' '}
              <strong>{routeName}</strong>, configure your API key secret in AI Studio:
            </p>
            <div className="bg-slate-950/90 p-3 rounded-lg border border-amber-700/50 space-y-1 text-[11px] font-mono text-slate-200">
              <p>
                <strong>1. Get an API key:</strong>{' '}
                <a
                  href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline"
                >
                  https://console.cloud.google.com/google/maps-apis/start
                </a>
              </p>
              <p>
                <strong>2. Add Secret in AI Studio:</strong> Open <strong>Settings</strong> (⚙️ top-right) →{' '}
                <strong>Secrets</strong> → add <code>GOOGLE_MAPS_PLATFORM_KEY</code>
              </p>
              <p>
                <strong>3. Save:</strong> Paste your key value & press Enter. The app rebuilds automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Fallback Interactive Embed */}
        <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-[#C6A15B]/30 shadow-inner bg-slate-900">
          <iframe
            title={`Map for ${selectedWaypoint?.name || routeName}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              selectedWaypoint
                ? `${selectedWaypoint.name} Sikkim`
                : `${routeName} Gangtok Sikkim`
            )}&hl=en&z=10&output=embed`}
          />
          <div className="absolute top-2 left-2 bg-slate-950/90 text-slate-100 text-[10px] px-2.5 py-1 rounded-lg border border-slate-800 shadow font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Map View: {selectedWaypoint.name} ({selectedWaypoint.altitude})</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Map Header & View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#0B1F3A] rounded-xl border border-[#C6A15B]/30 text-xs">
        <div className="flex items-center gap-2 text-[11px] text-slate-300">
          <Globe className="w-3.5 h-3.5 text-[#D9BC7A]" />
          <span className="font-bold text-[#D9BC7A]">Google Maps Terrain Mode:</span>
          <span className="text-slate-400 hidden sm:inline">• High-Res Satellite with 3D Contours</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/10">
          {(['hybrid', 'satellite', 'terrain', 'roadmap'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMapTypeId(type)}
              className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase transition-all ${
                mapTypeId === type
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 shadow-md shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative w-full h-80 sm:h-[450px] rounded-2xl overflow-hidden border border-[#C6A15B]/40 shadow-2xl bg-slate-950">
        <APIProvider
          apiKey={API_KEY}
          version="weekly"
          libraries={['marker', 'routes', 'places', 'geometry']}
          onError={() => setMapError(true)}
        >
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={9}
            mapId="DEMO_MAP_ID"
            mapTypeId={mapTypeId}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: '100%', height: '100%' }}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            <InteractiveRouteMapLayer
              waypoints={waypoints}
              selectedWaypointId={selectedWaypoint.id}
              onSelectWaypoint={onSelectWaypoint}
              weatherDataMap={weatherDataMap}
              simulationProgress={simulationProgress}
              activeLegIndex={activeLegIndex}
              isPlaying={isPlaying}
            />
          </Map>
        </APIProvider>

        {/* Overlay Circuit Badge */}
        <div className="absolute top-3 left-3 bg-slate-950/90 text-slate-100 text-xs px-3 py-1.5 rounded-xl border border-[#C6A15B]/40 shadow-xl font-bold flex items-center gap-2 backdrop-blur-md pointer-events-none">
          <Compass className="w-4 h-4 text-[#D9BC7A] animate-spin-slow" />
          <span>Interactive Circuit Path: {waypoints.length} Key Stops</span>
        </div>

        {/* Live Tracking Altitude Pill */}
        <div className="absolute bottom-3 left-3 bg-slate-950/90 text-slate-100 text-xs px-3 py-1.5 rounded-xl border border-cyan-500/40 shadow-xl font-bold flex items-center gap-2 backdrop-blur-md">
          <Mountain className="w-4 h-4 text-cyan-400" />
          <span>Active Stop: <strong className="text-cyan-300">{selectedWaypoint.name}</strong> ({selectedWaypoint.altitude})</span>
        </div>
      </div>
    </div>
  );
}

// Elevation Profile Visualizer Component
function ElevationProfileBar({
  waypoints,
  activeWaypointId,
  onSelectWaypoint,
}: {
  waypoints: Waypoint[];
  activeWaypointId: string;
  onSelectWaypoint: (wp: Waypoint) => void;
}) {
  const maxElev = Math.max(...waypoints.map((w) => w.elevationFeet));
  const minElev = Math.min(...waypoints.map((w) => w.elevationFeet));

  return (
    <div className="p-3.5 bg-[#0B1F3A]/90 border border-[#C6A15B]/30 rounded-xl space-y-2 text-xs">
      <div className="flex items-center justify-between text-slate-300">
        <span className="font-extrabold text-[#D9BC7A] flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#C6A15B]" />
          <span>Circuit Elevation Profile & Climbing Gradient:</span>
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          Min: <strong>{minElev.toLocaleString()} ft</strong> ➔ Max: <strong className="text-purple-300">{maxElev.toLocaleString()} ft</strong>
        </span>
      </div>

      {/* Visual Elevation Bars */}
      <div className="grid grid-flow-col auto-cols-fr gap-1 items-end h-20 pt-2 border-b border-slate-800 pb-1">
        {waypoints.map((wp, idx) => {
          const heightPct = Math.max(15, Math.round(((wp.elevationFeet - minElev) / (maxElev - minElev || 1)) * 100));
          const isSelected = activeWaypointId === wp.id;
          const elevToken = getElevationColor(wp.elevationFeet);

          return (
            <div
              key={wp.id}
              onClick={() => onSelectWaypoint(wp)}
              className="flex flex-col items-center h-full justify-end group cursor-pointer"
              title={`${idx + 1}. ${wp.name}: ${wp.altitude}`}
            >
              <div
                className={`w-full rounded-t-md transition-all ${
                  isSelected
                    ? 'bg-gradient-to-t from-cyan-500 to-sky-300 ring-2 ring-cyan-300 scale-105'
                    : 'hover:brightness-125'
                }`}
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: isSelected ? undefined : elevToken.hex,
                }}
              />
              <span className={`text-[9px] font-mono mt-1 truncate max-w-[45px] ${isSelected ? 'text-cyan-300 font-bold' : 'text-slate-400'}`}>
                {wp.elevationFeet > 999 ? `${Math.round(wp.elevationFeet / 1000)}k` : wp.elevationFeet}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CIRCUIT_PRESETS = [
  { key: 'north-sikkim', label: 'NJP ➔ Gangtok ➔ North Sikkim', icon: '🏔️', subtitle: 'Gurudongmar & Zero Point' },
  { key: 'grand-circuit', label: '5N/6D Grand Circuit', icon: '🌲', subtitle: 'Nathula, Pelling & Darjeeling' },
  { key: 'silk-route', label: 'Old Silk Route Zuluk', icon: '📜', subtitle: '32 Hairpin Curves' },
  { key: 'gangtok-tsomgo-darjeeling', label: 'Gangtok & Tsomgo', icon: '❄️', subtitle: 'Alpine Lakes & Tea Gardens' },
  { key: 'bhutan', label: 'Bhutan Odyssey', icon: '🐉', subtitle: 'Thimphu, Paro & Tiger\'s Nest' },
];

interface RouteMapVisualizationProps {
  selectedRoute?: string;
  onSelectWaypointForNote?: (waypointName: string) => void;
  compactMode?: boolean;
  onRouteChange?: (newRouteTitle: string) => void;
  initialCircuitKey?: string;
}

export const RouteMapVisualization: React.FC<RouteMapVisualizationProps> = ({
  selectedRoute,
  onSelectWaypointForNote,
  compactMode = false,
  onRouteChange,
  initialCircuitKey,
}) => {
  const [activeTab, setActiveTab] = useState<'googlemap' | 'journey'>('googlemap');
  const [selectedWaypointId, setSelectedWaypointId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(!compactMode);
  const [overrideKey, setOverrideKey] = useState<string | null>(initialCircuitKey || null);
  const [weatherDataMap, setWeatherDataMap] = useState<Record<string, WaypointWeather>>({});

  // Simulation state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simulationProgress, setSimulationProgress] = useState<number>(0);
  const [playSpeed, setPlaySpeed] = useState<number>(1);
  const animationFrameRef = useRef<number | null>(null);

  // Derive active dataset key
  let derivedKey = 'north-sikkim';
  const lower = (selectedRoute || '').toLowerCase();

  if (lower.includes('grand circuit') || lower.includes('pelling')) {
    derivedKey = 'grand-circuit';
  } else if (lower.includes('silk route') || lower.includes('zuluk')) {
    derivedKey = 'silk-route';
  } else if (lower.includes('bhutan')) {
    derivedKey = 'bhutan';
  } else if (lower.includes('gangtok, tsomgo')) {
    derivedKey = 'gangtok-tsomgo-darjeeling';
  }

  const currentKey = overrideKey || derivedKey;
  const currentRouteData: RouteData = ROUTE_DATASETS[currentKey] || ROUTE_DATASETS['north-sikkim'];

  // Fetch weather data
  useEffect(() => {
    let isMounted = true;
    fetchWeatherForWaypoints(currentRouteData.waypoints).then((data) => {
      if (isMounted) {
        setWeatherDataMap(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [currentRouteData.waypoints]);

  // Circuit simulator playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    let lastTimestamp = performance.now();
    const durationMs = 18000 / playSpeed; // 18 seconds for full circuit at 1x

    const step = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      setSimulationProgress((prev) => {
        const next = prev + delta / durationMs;
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, playSpeed]);

  const handleSwitchCircuit = (key: string) => {
    setOverrideKey(key);
    setSelectedWaypointId(null);
    setSimulationProgress(0);
    setIsPlaying(false);
    const dataset = ROUTE_DATASETS[key];
    if (dataset && onRouteChange) {
      onRouteChange(dataset.matchedKey);
    }
  };

  const activeLegIndex = Math.min(
    Math.floor(simulationProgress * (currentRouteData.waypoints.length - 1)),
    currentRouteData.waypoints.length - 1
  );

  const selectedWaypoint =
    currentRouteData.waypoints.find((w) => w.id === selectedWaypointId) ||
    currentRouteData.waypoints[activeLegIndex] ||
    currentRouteData.waypoints[0];

  const selectedWeather = selectedWaypoint ? weatherDataMap[selectedWaypoint.id] : undefined;

  return (
    <div className="w-full bg-[#071A2D] border border-[#C6A15B]/40 rounded-2xl shadow-2xl overflow-hidden transition-all text-slate-100">
      {/* Top Banner Header */}
      <div
        className="p-4 bg-gradient-to-r from-[#0B1F3A] via-[#153451] to-[#071A2D] border-b border-[#C6A15B]/30 flex flex-wrap items-center justify-between gap-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C6A15B] to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg flex-shrink-0">
            <Compass className="w-5 h-5 text-slate-950 animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-[#D9BC7A] px-2 py-0.5 rounded shadow">
                Google Maps Circuit Engine
              </span>
              <span className="text-[10px] text-emerald-300 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-700/80 font-bold flex items-center gap-1">
                <Mountain className="w-3 h-3 text-emerald-400" />
                Max Alt: {currentRouteData.maxElevation}
              </span>
              <span className="text-[10px] text-cyan-300 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-700/80 font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                Live Weather Sync
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white truncate mt-1">
              {currentRouteData.routeName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-xs font-bold text-[#D9BC7A] hover:text-white flex items-center gap-1.5 bg-[#153451] hover:bg-[#1a4168] px-3 py-1.5 rounded-xl border border-[#C6A15B]/40 transition-colors shadow"
          >
            <span>{isExpanded ? 'Collapse Map' : 'Explore Circuit'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Content Area */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-4 bg-slate-950/95">
          {/* Circuit Switcher Pills */}
          <div className="p-3 bg-[#0B1F3A]/90 border border-[#C6A15B]/40 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#D9BC7A]">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Select Mountain Circuit:</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                Click to load route geometry, waypoints & altitudes
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
              {CIRCUIT_PRESETS.map((preset) => {
                const isActive = currentKey === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => handleSwitchCircuit(preset.key)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 border-cyan-300 ring-2 ring-cyan-400/40 shadow-lg scale-[1.02]'
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-[#C6A15B]/50 hover:text-white'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <div className="text-left">
                      <div className="font-extrabold">{preset.label}</div>
                      <div className={`text-[9px] ${isActive ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                        {preset.subtitle}
                      </div>
                    </div>
                    {isActive && <Check className="w-3.5 h-3.5 text-slate-950 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Circuit Controls & Simulator Bar */}
          <div className="p-3.5 bg-gradient-to-r from-[#0B1F3A] via-[#102a45] to-[#0B1F3A] border border-cyan-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3 py-1.5 rounded-xl font-black flex items-center gap-1.5 transition-all text-xs shadow-md ${
                  isPlaying
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                    : 'bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 hover:brightness-110'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-slate-950" /> : <Play className="w-3.5 h-3.5 fill-slate-950" />}
                <span>{isPlaying ? 'Pause Circuit' : 'Play Animated Circuit'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulationProgress(0);
                  setIsPlaying(false);
                }}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg transition-colors"
                title="Reset Circuit Simulator"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px]">
                {([1, 2, 4] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setPlaySpeed(spd)}
                    className={`px-1.5 py-0.5 rounded font-mono font-bold ${
                      playSpeed === spd ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Scrubber */}
            <div className="flex-1 min-w-[200px] flex items-center gap-2.5">
              <span className="text-[10px] text-slate-400 font-mono">Trace Path:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.005"
                value={simulationProgress}
                onChange={(e) => {
                  setSimulationProgress(parseFloat(e.target.value));
                  setIsPlaying(false);
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] font-mono text-cyan-300 font-bold min-w-[36px]">
                {Math.round(simulationProgress * 100)}%
              </span>
            </div>

            {/* View Tab Switcher */}
            <div className="flex items-center gap-1 bg-[#0B1F3A] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('googlemap')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                  activeTab === 'googlemap'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Google Satellite View</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('journey')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs flex items-center gap-1.5 ${
                  activeTab === 'journey'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Waypoint List & Gear</span>
              </button>
            </div>
          </div>

          {/* TAB 1: GOOGLE MAPS SATELLITE CIRCUIT & PATH DRAWING */}
          {activeTab === 'googlemap' && (
            <div className="space-y-4">
              <GoogleMapRouteViewer
                waypoints={currentRouteData.waypoints}
                selectedWaypoint={selectedWaypoint}
                onSelectWaypoint={(wp) => setSelectedWaypointId(wp.id)}
                routeName={currentRouteData.routeName}
                weatherDataMap={weatherDataMap}
                simulationProgress={simulationProgress}
                activeLegIndex={activeLegIndex}
                isPlaying={isPlaying}
              />

              {/* Elevation Profile Visualizer */}
              <ElevationProfileBar
                waypoints={currentRouteData.waypoints}
                activeWaypointId={selectedWaypoint.id}
                onSelectWaypoint={(wp) => setSelectedWaypointId(wp.id)}
              />

              {/* Active Waypoint Inspector Card */}
              {selectedWaypoint && (
                <div className="bg-[#0B1F3A] border border-[#C6A15B]/40 rounded-2xl p-4 sm:p-5 space-y-3 relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold bg-[#C6A15B]/20 text-[#D9BC7A] px-2.5 py-0.5 rounded border border-[#C6A15B]/40">
                          Waypoint Inspection
                        </span>
                        {selectedWaypoint.permitRequired && (
                          <span className="text-[10px] font-extrabold bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded border border-amber-700/80 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-amber-400" />
                            {selectedWaypoint.permitType || 'PAP Permit Required'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base sm:text-xl font-extrabold text-white flex items-center gap-2">
                        <span>{selectedWaypoint.name}</span>
                        <span className="text-xs font-mono font-bold text-[#D9BC7A] bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-700">
                          ⛰️ {selectedWaypoint.altitude}
                        </span>
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {onSelectWaypointForNote && (
                        <button
                          type="button"
                          onClick={() => onSelectWaypointForNote(selectedWaypoint.name)}
                          className="bg-[#153451] hover:bg-[#1a4168] text-[#D9BC7A] px-3 py-1.5 rounded-xl border border-[#C6A15B]/40 text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>Add to Itinerary Request</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedWaypoint.description}
                  </p>

                  {/* Weather Forecast & Recommended Gear Section */}
                  {selectedWeather && (
                    <div className="bg-[#153451]/90 p-3.5 rounded-xl border border-sky-400/40 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase text-sky-300 flex items-center gap-1.5">
                          <Thermometer className="w-3.5 h-3.5 text-sky-300" />
                          <span>Live Waypoint Climate & Temperature</span>
                        </span>
                        <span className="bg-sky-950 text-sky-200 px-3 py-1 rounded-full border border-sky-400/50 font-mono font-bold text-xs flex items-center gap-2">
                          <span>{selectedWeather.icon}</span>
                          <span>{selectedWeather.tempC}°C</span>
                          <span className="text-slate-400">•</span>
                          <span>{selectedWeather.condition}</span>
                          <span className="text-slate-400">•</span>
                          <span>💨 {selectedWeather.windSpeed} km/h</span>
                        </span>
                      </div>

                      <div className="bg-slate-950/90 p-3 rounded-lg border border-sky-500/30 text-slate-200 text-xs flex items-start gap-2.5">
                        <span className="text-xl flex-shrink-0">🧥</span>
                        <div className="space-y-0.5">
                          <span className="font-bold text-sky-300 block text-xs">Recommended Mountain Gear:</span>
                          <p className="text-xs text-slate-300 leading-snug">
                            {selectedWeather.gearRecommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Key Attractions */}
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-[#D9BC7A] block">
                        🌟 Key Stop Highlights:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-200">
                        {selectedWaypoint.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#C6A15B] rounded-full flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Drive & Distance Details */}
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Drive from previous stop:</span>
                        <span className="font-bold text-amber-300">{selectedWaypoint.distanceFromPrev}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Estimated duration:</span>
                        <span className="font-bold text-emerald-400">
                          {selectedWaypoint.driveTime} ({parseDriveTimeMins(selectedWaypoint.driveTime)} mins)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Recommended Vehicle:</span>
                        <span className="font-bold text-cyan-300">{currentRouteData.recommendedVehicle}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE WAYPOINT LIST & TOPOGRAPHIC DIAGRAM */}
          {activeTab === 'journey' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentRouteData.waypoints.map((wp, idx) => {
                  const isSelected = selectedWaypoint.id === wp.id;
                  const wpWeather = weatherDataMap[wp.id];
                  const elev = getElevationColor(wp.elevationFeet);

                  return (
                    <div
                      key={wp.id}
                      onClick={() => setSelectedWaypointId(wp.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-[#153451] border-[#C6A15B] ring-2 ring-[#C6A15B]/50 shadow-xl'
                          : 'bg-[#0B1F3A]/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <h5 className="font-bold text-white text-sm">{wp.name}</h5>
                        </div>
                        <span
                          className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                          style={{ color: elev.hex, backgroundColor: 'rgba(0,0,0,0.5)' }}
                        >
                          ⛰️ {wp.altitude}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2">
                        {wp.description}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-[11px] text-slate-400">
                        <span>Drive: {wp.driveTime} ({wp.distanceFromPrev})</span>
                        {wpWeather && (
                          <span className="text-sky-300 font-bold flex items-center gap-1">
                            <span>{wpWeather.icon}</span>
                            <span>{wpWeather.tempC}°C</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom GPS & Permits Bar */}
          <div className="p-3.5 bg-[#0B1F3A]/90 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300">
                <strong className="text-emerald-400">Government Permits Managed:</strong>{' '}
                {currentRouteData.requiredPermits.join(' • ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={currentRouteData.googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#153451] hover:bg-[#1f476e] text-[#D9BC7A] px-3.5 py-1.5 rounded-xl border border-[#C6A15B]/50 font-bold flex items-center gap-1.5 transition-all text-xs shadow"
              >
                <span>Open Circuit in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
