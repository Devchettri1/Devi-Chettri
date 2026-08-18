import React, { useState, useEffect, useRef } from 'react';
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
  lat: number;
  lng: number;
  distanceFromPrev: string; // e.g. "55 km"
  driveTime: string; // e.g. "2.5 hrs"
  highlights: string[];
  type: 'hub' | 'lake' | 'pass' | 'valley' | 'hill' | 'border' | 'monastery';
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
  totalDistance: string;
  maxElevation: string;
  requiredPermits: string[];
  recommendedVehicle: string;
  googleMapsDirectionsUrl: string;
  waypoints: Waypoint[];
}

// Master Route Database
export const ROUTE_DATASETS: Record<string, RouteData> = {
  'grand-circuit': {
    id: 'grand-circuit',
    matchedKey: '5N/6D Sikkim & Darjeeling Grand Circuit',
    routeName: 'Sikkim & Darjeeling Grand Circuit (5N/6D)',
    tagline: 'Capital Hub ➔ Alpine Lake ➔ Indo-China Pass ➔ Skywalk ➔ Tea Gardens',
    totalDistance: '480 km circuit',
    maxElevation: '14,140 ft (Nathula)',
    requiredPermits: ['Protected Area Permit (PAP)', 'Nathula Special Army Pass'],
    recommendedVehicle: 'Toyota Innova Crysta / Mahindra Scorpio',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/Bagdogra+Airport/Gangtok/Tsomgo+Lake/Nathula/Pelling/Darjeeling',
    waypoints: [
      {
        id: 'ixb',
        name: 'Bagdogra / NJP',
        altitude: '328 ft',
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
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: '124 km from NJP',
        driveTime: '4.5 hrs drive',
        highlights: ['MG Marg Pedestrian Walkway', 'Rumtek Monastery', 'Gangtok Cable Car Ropeway'],
        type: 'city' as any,
        image: '/src/assets/images/sikkim_hero_banner_1785680563996.jpg',
        description: 'Vibrant capital of Sikkim with pedestrian shopping streets, monasteries, and pure vegetarian dining options.',
      },
      {
        id: 'tsomgo',
        name: 'Tsomgo Lake (Changu)',
        altitude: '12,310 ft',
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
        lat: 27.041,
        lng: 88.2663,
        distanceFromPrev: '72 km from Pelling',
        driveTime: '3.5 hrs drive',
        highlights: ['Tiger Hill Sunrise', 'UNESCO World Heritage Toy Train', 'Happy Valley Tea Gardens'],
        type: 'hill',
        image: '/src/assets/images/darjeeling_tea_gardens_1785681013467.jpg',
        description: 'Famous hill resort town with sprawling tea estates, colonial architecture, and views of 5 snow peaks.',
      },
    ],
  },

  'north-sikkim': {
    id: 'north-sikkim',
    matchedKey: '4N/5D North Sikkim Special (Gurudongmar & Zero Point)',
    routeName: 'North Sikkim Special Expedition (4N/5D)',
    tagline: 'High Altitude Plateau ➔ Sacred Lakes ➔ Zero Point Snow Valley',
    totalDistance: '560 km alpine route',
    maxElevation: '17,800 ft (Gurudongmar)',
    requiredPermits: ['Restricted Area Permit (RAP)', 'Sub-Divisional Magistrate (SDM) Army Permit'],
    recommendedVehicle: '4x4 Scorpio / Xylo / Bolero SUV',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/Gangtok/Mangan/Lachen/Gurudongmar+Lake/Lachung/Yumthang+Valley/Zero+Point/Gangtok',
    waypoints: [
      {
        id: 'gangtok',
        name: 'Gangtok Base',
        altitude: '5,410 ft',
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: 'Start Base',
        driveTime: '0 hrs',
        highlights: ['Permit Issuance Desk', 'Travel Briefing'],
        type: 'hub',
        description: 'Base camp where our office processes your North Sikkim SDM permits with photographs and voter ID verification.',
      },
      {
        id: 'lachen',
        name: 'Lachen Village',
        altitude: '9,200 ft',
        lat: 27.7167,
        lng: 88.55,
        distanceFromPrev: '120 km from Gangtok',
        driveTime: '6 hrs mountain drive',
        highlights: ['Seven Sisters Waterfall', 'Chungthang Confluence', 'Traditional Wooden Homestays'],
        type: 'valley',
        permitRequired: true,
        permitType: 'North Sikkim Protected Area Permit',
        description: 'Secluded high-altitude Lachen Bhutia village, night stop before early morning drive to Gurudongmar Lake.',
      },
      {
        id: 'gurudongmar',
        name: 'Gurudongmar Lake',
        altitude: '17,800 ft',
        lat: 28.0258,
        lng: 88.7097,
        distanceFromPrev: '66 km from Lachen',
        driveTime: '3.5 hrs early drive',
        highlights: ['One of Highest Lakes in World', 'Sacred Water Never Freezes Completely', 'Tibetan Plateau View'],
        type: 'lake',
        permitRequired: true,
        permitType: 'Indian Army High Altitude Border Permit',
        image: '/src/assets/images/yumthang_zero_point_1785680592273.jpg',
        description: 'Breathtaking high-altitude sacred lake revered by Hindus, Buddhists, and Sikhs. Majestic Tibetan plateau landscapes.',
      },
      {
        id: 'lachung',
        name: 'Lachung Valley',
        altitude: '8,610 ft',
        lat: 27.6891,
        lng: 88.743,
        distanceFromPrev: '50 km from Lachen',
        driveTime: '2.5 hrs drive',
        highlights: ['Lachung Monastery', 'Pine Forests', 'Local Mountain Hospitality'],
        type: 'valley',
        permitRequired: true,
        permitType: 'North Sikkim RAP Permit',
        description: 'Quaint mountain village on the banks of Lachung River with apple orchards and snow-covered peaks.',
      },
      {
        id: 'yumthang',
        name: 'Yumthang Valley of Flowers',
        altitude: '11,800 ft',
        lat: 27.828,
        lng: 88.696,
        distanceFromPrev: '25 km from Lachung',
        driveTime: '1 hr drive',
        highlights: ['Rhododendron Sanctuary', 'Yumthang Hot Springs', 'Lachung River Bank'],
        type: 'valley',
        image: '/src/assets/images/yumthang_zero_point_1785680592273.jpg',
        description: 'Famous Valley of Flowers blooming with over 24 species of Rhododendrons from April to June.',
      },
      {
        id: 'zeropoint',
        name: 'Zero Point (Yumesamdong)',
        altitude: '15,300 ft',
        lat: 27.91,
        lng: 88.74,
        distanceFromPrev: '23 km from Yumthang',
        driveTime: '1.5 hrs rugged drive',
        highlights: ['Year-round Snow Play', 'Indo-China Border End Point', 'Snowy Mountain Amphitheater'],
        type: 'pass',
        permitRequired: true,
        permitType: 'Extra Zero Point Permit Charge',
        image: '/src/assets/images/yumthang_zero_point_1785680592273.jpg',
        description: 'Where civilian road terminates amidst towering glaciers and eternal snow fields near the China border.',
      },
    ],
  },

  'silk-route': {
    id: 'silk-route',
    matchedKey: '3N/4D Old Silk Route Zuluk & Reshi Khola',
    routeName: 'Old Silk Route & Zuluk Circuit (3N/4D)',
    tagline: 'River Camps ➔ 32 Hairpin Curves ➔ Elephant Lake ➔ Historic Trade Path',
    totalDistance: '320 km heritage loop',
    maxElevation: '13,900 ft (Kupup Lake)',
    requiredPermits: ['Silk Route Restricted Area Permit (SDO Rongli)'],
    recommendedVehicle: 'Scorpio / Sumo / Innova 4x4',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/NJP/Reshi+Khola/Zuluk/Thambi+View+Point/Gnathang+Valley/Kupup/Gangtok',
    waypoints: [
      {
        id: 'reshi',
        name: 'Reshi Khola River Bank',
        altitude: '2,000 ft',
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
        name: 'Gangtok Exit',
        altitude: '5,410 ft',
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: '55 km from Kupup',
        driveTime: '2.5 hrs drive',
        highlights: ['Full Loop Complete', 'MG Marg Leisure'],
        type: 'hub',
        description: 'Completing the Silk Route loop back at Gangtok capital city for onwards transfer or local shopping.',
      },
    ],
  },

  'gangtok-tsomgo-darjeeling': {
    id: 'gangtok-tsomgo-darjeeling',
    matchedKey: '4N/5D Gangtok, Tsomgo Lake & Darjeeling',
    routeName: 'Gangtok, Tsomgo & Darjeeling Explorer (4N/5D)',
    tagline: 'Capital Stay ➔ Glacial Lake ➔ Tea Estates ➔ Tiger Hill Sunrise',
    totalDistance: '350 km classic tour',
    maxElevation: '12,310 ft (Tsomgo Lake)',
    requiredPermits: ['Tsomgo Lake Protected Area Permit'],
    recommendedVehicle: 'Swift Dzire / Toyota Innova',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/NJP/Gangtok/Tsomgo+Lake/Darjeeling/NJP',
    waypoints: [
      {
        id: 'njp',
        name: 'NJP / Bagdogra',
        altitude: '328 ft',
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
        lat: 27.3275,
        lng: 88.6128,
        distanceFromPrev: '124 km',
        driveTime: '4.5 hrs drive',
        highlights: ['MG Marg Night Market', 'Handicraft Center', 'Flower Exhibition Hall'],
        type: 'city' as any,
        description: 'Capital stay with pure vegetarian dining options, MG Marg evening walks, and comfortable 3★ hotel stay.',
      },
      {
        id: 'tsomgo',
        name: 'Tsomgo Lake Excursion',
        altitude: '12,310 ft',
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
        name: 'Tiger Hill Sunrise',
        altitude: '8,400 ft',
        lat: 26.994,
        lng: 88.283,
        distanceFromPrev: '11 km from Darjeeling',
        driveTime: '45 mins early morning',
        highlights: ['Golden Kanchenjunga Sunrise', 'Mt. Everest Peak View', 'Chowrasta Mall'],
        type: 'pass',
        description: 'World-famous sunrise point where first rays of sunlight turn Mt. Kanchenjunga into molten gold.',
      },
    ],
  },

  'bhutan': {
    id: 'bhutan',
    matchedKey: 'Bhutan Cultural Odyssey Package',
    routeName: 'Bhutan Cultural Odyssey (Paro & Thimphu)',
    tagline: 'Phuentsholing Border ➔ Capital Thimphu ➔ Paro Valley ➔ Tiger’s Nest',
    totalDistance: '420 km dragon kingdom route',
    maxElevation: '10,240 ft (Tiger’s Nest Monastery)',
    requiredPermits: ['Bhutan Govt SDF Permit', 'Immigration Entry Clearance'],
    recommendedVehicle: 'Bhutan Tourist SUV / Coaster Coach',
    googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/Phuentsholing/Thimphu/Punakha/Paro/Tiger\'s+Nest',
    waypoints: [
      {
        id: 'phuentsholing',
        name: 'Phuentsholing Border',
        altitude: '960 ft',
        lat: 26.862,
        lng: 89.383,
        distanceFromPrev: 'Entry Gate',
        driveTime: '0 hrs',
        highlights: ['Bhutan Gate Clearance', 'SDF Tax Verification'],
        type: 'border',
        permitRequired: true,
        permitType: 'Bhutan Entry Immigration Permit',
        description: 'Border gateway city entering the Kingdom of Bhutan with traditional arch architecture.',
      },
      {
        id: 'thimphu',
        name: 'Thimphu Capital',
        altitude: '7,656 ft',
        lat: 27.4722,
        lng: 89.639,
        distanceFromPrev: '165 km',
        driveTime: '5 hrs drive',
        highlights: ['Buddha Dordenma Giant Statue', 'Tashichho Dzong', 'National Memorial Chorten'],
        type: 'city' as any,
        description: 'Capital of Bhutan blending modern culture with ancient dzongs and traditional dress laws.',
      },
      {
        id: 'punakha',
        name: 'Punakha Valley & Dzong',
        altitude: '4,300 ft',
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
        name: 'Taktsang (Tiger’s Nest Monastery)',
        altitude: '10,240 ft',
        lat: 27.4919,
        lng: 89.3634,
        distanceFromPrev: '12 km hike base',
        driveTime: '4 hrs trek',
        highlights: ['Cliffside Sacred Monastery', 'Guru Rinpoche Cave', 'Panoramas of Paro Valley'],
        type: 'monastery' as any,
        permitRequired: true,
        permitType: 'Taktsang Entry Ticket',
        image: '/src/assets/images/bhutan_tigers_nest_1785681037397.jpg',
        description: 'Iconic monastery clinging to a sheer cliff 900 meters above Paro valley floor. Bhutan’s premier spiritual landmark.',
      },
    ],
  },
};

// Interactive Google Maps Sub-Components
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
  // Lapse rate estimation: base 26 C at sea level, minus ~1.8 C per 1000 ft
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
        // Fallback to estimation
      }

      // Fallback calculation based on altitude
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

function InteractiveWaypointMarker({
  waypoint,
  index,
  isSelected,
  onSelect,
  weather,
}: {
  key?: string;
  waypoint: Waypoint;
  index: number;
  isSelected: boolean;
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

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: waypoint.lat, lng: waypoint.lng }}
        title={`${index + 1}. ${waypoint.name}`}
        onClick={() => {
          onSelect();
          setInfoOpen(true);
        }}
        zIndex={isSelected ? 1000 : index + 10}
      >
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 shadow-2xl backdrop-blur-md cursor-pointer transition-all transform hover:scale-110 ${
            isSelected
              ? 'bg-[#153451] border-[#C6A15B] text-[#D9BC7A] ring-4 ring-[#C6A15B]/40 scale-105'
              : waypoint.permitRequired
              ? 'bg-amber-950/95 border-amber-500 text-amber-200'
              : 'bg-slate-900/95 border-emerald-500 text-emerald-300'
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full font-extrabold text-[10px] flex items-center justify-center ${
              isSelected
                ? 'bg-[#D9BC7A] text-slate-950'
                : waypoint.permitRequired
                ? 'bg-amber-500 text-slate-950'
                : 'bg-emerald-500 text-slate-950'
            }`}
          >
            {index + 1}
          </span>
          <span className="text-xs font-extrabold whitespace-nowrap">{waypoint.name}</span>

          {weather && (
            <span className="ml-0.5 bg-sky-950/90 text-sky-200 text-[10px] px-1.5 py-0.5 rounded-full border border-sky-400/40 font-mono font-bold flex items-center gap-0.5">
              <span>{weather.icon}</span>
              <span>{weather.tempC}°C</span>
            </span>
          )}
        </div>
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
          <div className="p-2 max-w-xs space-y-1.5 text-slate-900 font-sans">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1">
              <span className="font-extrabold text-xs text-slate-900">
                {index + 1}. {waypoint.name}
              </span>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                ⛰️ {waypoint.altitude}
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
              {waypoint.description}
            </p>

            {weather && (
              <div className="bg-sky-50 p-1.5 rounded-lg border border-sky-200 text-[10px] space-y-0.5">
                <div className="flex items-center justify-between font-bold text-sky-900">
                  <span>Forecast: {weather.icon} {weather.tempC}°C</span>
                  <span className="font-normal text-sky-700">{weather.condition}</span>
                </div>
                <div className="text-slate-600 text-[9.5px] italic leading-tight">
                  {weather.gearRecommendation}
                </div>
              </div>
            )}

            {waypoint.permitRequired && (
              <div className="text-[10px] font-extrabold text-amber-800 bg-amber-100 p-1 rounded border border-amber-300 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-700 flex-shrink-0" />
                <span>{waypoint.permitType || 'Protected Area Permit Required'}</span>
              </div>
            )}
            <div className="text-[10px] text-slate-500 flex items-center justify-between pt-0.5">
              <span>Drive: {waypoint.driveTime}</span>
              <span>Dist: {waypoint.distanceFromPrev}</span>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function InteractiveRouteMapLayer({
  waypoints,
  selectedWaypointId,
  onSelectWaypoint,
  weatherDataMap,
}: {
  waypoints: Waypoint[];
  selectedWaypointId: string | null;
  onSelectWaypoint: (wp: Waypoint) => void;
  weatherDataMap?: Record<string, WaypointWeather>;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map || waypoints.length === 0) return;

    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    const bounds = new google.maps.LatLngBounds();
    waypoints.forEach((wp) => bounds.extend({ lat: wp.lat, lng: wp.lng }));
    map.fitBounds(bounds, { top: 60, bottom: 60, left: 60, right: 60 });

    const drawFallbackPolyline = () => {
      const path = waypoints.map((w) => ({ lat: w.lat, lng: w.lng }));
      const polyline = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#D9BC7A',
        strokeOpacity: 0.9,
        strokeWeight: 5,
        map,
      });
      polylinesRef.current = [polyline];
    };

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
                strokeColor: '#D9BC7A',
                strokeWeight: 5,
                strokeOpacity: 0.9,
              });
              p.setMap(map);
            });
            polylinesRef.current = newPolylines;
            if (routes[0].viewport) {
              map.fitBounds(routes[0].viewport);
            }
          } else {
            drawFallbackPolyline();
          }
        })
        .catch(() => {
          drawFallbackPolyline();
        });
    } else {
      drawFallbackPolyline();
    }

    return () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
    };
  }, [map, routesLib, waypoints]);

  return (
    <>
      {/* Intermediate Leg Data Overlays (Distance & Estimated Time in Minutes) */}
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
            zIndex={80}
            title={`Leg: ${prevWp.name} ➔ ${wp.name}: ${dist}, ${mins} mins`}
          >
            <div className="bg-[#0B1F3A]/95 text-[#D9BC7A] border border-[#C6A15B] px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-2xl backdrop-blur-md flex items-center gap-1.5 cursor-default hover:scale-110 transition-transform">
              <Navigation className="w-3 h-3 text-[#C6A15B] flex-shrink-0" />
              <span>{dist}</span>
              <span className="text-slate-400">•</span>
              <Clock className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span>{mins} mins</span>
            </div>
          </AdvancedMarker>
        );
      })}

      {waypoints.map((wp, idx) => (
        <InteractiveWaypointMarker
          key={wp.id}
          waypoint={wp}
          index={idx}
          isSelected={selectedWaypointId === wp.id}
          onSelect={() => onSelectWaypoint(wp)}
          weather={weatherDataMap ? weatherDataMap[wp.id] : undefined}
        />
      ))}
    </>
  );
}

function GoogleMapRouteViewer({
  waypoints,
  selectedWaypoint,
  onSelectWaypoint,
  routeName,
  weatherDataMap,
}: {
  waypoints: Waypoint[];
  selectedWaypoint: Waypoint;
  onSelectWaypoint: (wp: Waypoint) => void;
  routeName: string;
  weatherDataMap?: Record<string, WaypointWeather>;
}) {
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('hybrid');
  const [mapError, setMapError] = useState(false);

  const defaultCenter = selectedWaypoint
    ? { lat: selectedWaypoint.lat, lng: selectedWaypoint.lng }
    : { lat: 27.3275, lng: 88.6128 };

  if (!hasValidKey || mapError) {
    return (
      <div className="bg-[#0B1F3A] border border-[#C6A15B]/40 rounded-2xl p-5 space-y-4 text-slate-100 shadow-2xl">
        <div className="flex items-start gap-3 p-4 bg-amber-950/80 border border-amber-600/60 rounded-xl">
          <Key className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-amber-100">
            <h4 className="font-extrabold text-amber-300 text-sm">
              Google Maps API Key Required for Live Map Rendering
            </h4>
            <p className="leading-relaxed">
              To view real-time Google Maps interactive routes and sat-view polylines for{' '}
              <strong>{routeName}</strong>, configure your API key secret in AI Studio:
            </p>
            <div className="bg-slate-950/90 p-3 rounded-lg border border-amber-700/50 space-y-1 text-[11px] font-mono text-slate-200">
              <p><strong>1. Get an API key:</strong> https://console.cloud.google.com/google/maps-apis/start</p>
              <p><strong>2. Add Secret in AI Studio:</strong> Open Settings (⚙️ top-right) → Secrets → Add <code>GOOGLE_MAPS_PLATFORM_KEY</code></p>
              <p><strong>3. Save key:</strong> Paste key value & press Enter. The app rebuilds automatically.</p>
            </div>
          </div>
        </div>

        <div className="relative w-full h-80 rounded-xl overflow-hidden border border-[#C6A15B]/30 shadow-inner bg-slate-900">
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
            )}&hl=en&z=11&output=embed`}
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
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#0B1F3A] rounded-xl border border-[#C6A15B]/30 text-xs">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
          <Globe className="w-3.5 h-3.5 text-[#D9BC7A]" />
          <span className="font-bold text-[#D9BC7A]">Google Maps Type:</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/10">
          {(['hybrid', 'satellite', 'roadmap', 'terrain'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setMapTypeId(type)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                mapTypeId === type
                  ? 'bg-[#153451] text-[#D9BC7A] border border-[#C6A15B]/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#C6A15B]/40 shadow-2xl bg-slate-950">
        <APIProvider
          apiKey={API_KEY}
          version="weekly"
          libraries={['marker', 'routes', 'places', 'geometry']}
          onError={() => setMapError(true)}
        >
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={10}
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
            />
          </Map>
        </APIProvider>

        <div className="absolute top-3 left-3 bg-slate-950/90 text-slate-100 text-xs px-3 py-1.5 rounded-xl border border-[#C6A15B]/40 shadow-xl font-bold flex items-center gap-2 backdrop-blur-md pointer-events-none">
          <Compass className="w-4 h-4 text-[#D9BC7A] animate-pulse" />
          <span>Interactive Route Path: {waypoints.length} Tourist Landmarks</span>
        </div>
      </div>
    </div>
  );
}

const CIRCUIT_PRESETS = [
  { key: 'grand-circuit', label: '5N/6D Grand Circuit', icon: '🌲' },
  { key: 'north-sikkim', label: 'North Sikkim & Zero Point', icon: '⛰️' },
  { key: 'silk-route', label: 'Old Silk Route Zuluk', icon: '📜' },
  { key: 'gangtok-tsomgo-darjeeling', label: 'Gangtok & Tsomgo', icon: '🏔️' },
  { key: 'bhutan', label: 'Bhutan Odyssey', icon: '🐉' },
];

interface RouteMapVisualizationProps {
  selectedRoute: string;
  onSelectWaypointForNote?: (waypointName: string) => void;
  compactMode?: boolean;
  onRouteChange?: (newRouteTitle: string) => void;
}

export const RouteMapVisualization: React.FC<RouteMapVisualizationProps> = ({
  selectedRoute,
  onSelectWaypointForNote,
  compactMode = false,
  onRouteChange,
}) => {
  const [activeTab, setActiveTab] = useState<'journey' | 'googlemap'>('journey');
  const [selectedWaypointId, setSelectedWaypointId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(!compactMode);
  const [overrideKey, setOverrideKey] = useState<string | null>(null);
  const [weatherDataMap, setWeatherDataMap] = useState<Record<string, WaypointWeather>>({});

  // Reset override key when selectedRoute prop changes externally
  useEffect(() => {
    setOverrideKey(null);
    setSelectedWaypointId(null);
  }, [selectedRoute]);

  // Derive current route dataset key
  let initialKey = 'grand-circuit';
  const lower = (selectedRoute || '').toLowerCase();

  if (lower.includes('north sikkim') || lower.includes('gurudongmar')) {
    initialKey = 'north-sikkim';
  } else if (lower.includes('silk route') || lower.includes('zuluk')) {
    initialKey = 'silk-route';
  } else if (lower.includes('bhutan')) {
    initialKey = 'bhutan';
  } else if (lower.includes('gangtok, tsomgo')) {
    initialKey = 'gangtok-tsomgo-darjeeling';
  }

  const currentKey = overrideKey || initialKey;
  const currentRouteData: RouteData = ROUTE_DATASETS[currentKey] || ROUTE_DATASETS['grand-circuit'];

  // Fetch live or estimated weather whenever waypoints list changes
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

  const handleSwitchCircuit = (key: string) => {
    setOverrideKey(key);
    setSelectedWaypointId(null);
    const dataset = ROUTE_DATASETS[key];
    if (dataset && onRouteChange) {
      onRouteChange(dataset.matchedKey);
    }
  };

  const selectedWaypoint =
    currentRouteData.waypoints.find((w) => w.id === selectedWaypointId) || currentRouteData.waypoints[1] || currentRouteData.waypoints[0];
  const selectedWeather = selectedWaypoint ? weatherDataMap[selectedWaypoint.id] : undefined;

  return (
    <div className="w-full bg-[#071A2D] border border-[#C6A15B]/40 rounded-2xl shadow-xl overflow-hidden transition-all text-slate-100">
      {/* Top Banner Header */}
      <div
        className="p-3.5 sm:p-4 bg-gradient-to-r from-[#0B1F3A] via-[#153451] to-[#071A2D] border-b border-[#C6A15B]/30 flex flex-wrap items-center justify-between gap-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/20 border border-[#C6A15B]/60 flex items-center justify-center text-[#D9BC7A] flex-shrink-0">
            <Compass className="w-4 h-4 text-[#D9BC7A] animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D9BC7A] bg-[#C6A15B]/15 px-2 py-0.5 rounded border border-[#C6A15B]/40">
                Route Journey Map
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 font-bold flex items-center gap-1">
                <Mountain className="w-3 h-3 text-emerald-400" />
                Max Altitude: {currentRouteData.maxElevation}
              </span>
              <span className="text-[10px] text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800 font-bold flex items-center gap-1">
                <span>🌤️</span>
                <span>Live Weather Active</span>
              </span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-white truncate mt-0.5">
              {currentRouteData.routeName}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-xs font-bold text-[#D9BC7A] hover:text-white flex items-center gap-1 bg-[#153451] hover:bg-[#1a4168] px-2.5 py-1 rounded border border-[#C6A15B]/40 transition-colors"
          >
            <span>{isExpanded ? 'Hide Map' : 'Explore Route Map'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Map Content */}
      {isExpanded && (
        <div className="p-3.5 sm:p-5 space-y-4 bg-slate-950/90">
          {/* Circuit Map Selector Pills Bar */}
          <div className="p-3 bg-[#0B1F3A]/80 border border-[#C6A15B]/30 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#D9BC7A]">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                Toggle Circuit Map:
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                Click any circuit map to switch route details
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#153451] text-[#D9BC7A] border-[#C6A15B] ring-2 ring-[#C6A15B]/30 shadow-md scale-[1.02]'
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-[#C6A15B]/40 hover:text-white'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                    {isActive && <Check className="w-3.5 h-3.5 text-[#D9BC7A] ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Tab switch + Stats pill */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-white/10 text-xs">
            <div className="flex items-center gap-1.5 bg-[#0B1F3A] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('journey')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all text-xs flex items-center gap-1.5 ${
                  activeTab === 'journey'
                    ? 'bg-[#153451] text-[#D9BC7A] border border-[#C6A15B]/60 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Interactive Waypoints</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('googlemap')}
                className={`px-3 py-1.5 rounded-lg font-extrabold transition-all text-xs flex items-center gap-1.5 ${
                  activeTab === 'googlemap'
                    ? 'bg-[#153451] text-[#D9BC7A] border border-[#C6A15B]/60 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Google Satellite View</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-300">
              <span className="bg-[#0B1F3A] px-2.5 py-1 rounded-lg border border-slate-800">
                📏 {currentRouteData.totalDistance}
              </span>
              <span className="bg-[#0B1F3A] px-2.5 py-1 rounded-lg border border-slate-800 text-amber-300">
                🚘 {currentRouteData.recommendedVehicle}
              </span>
            </div>
          </div>

          {/* TAB 1: INTERACTIVE WAYPOINTS TOPOGRAPHIC MAP */}
          {activeTab === 'journey' && (
            <div className="space-y-4">
              {/* Route Waypoint Nodes Diagram */}
              <div className="relative bg-[#071A2D]/90 rounded-2xl p-4 border border-[#C6A15B]/30 overflow-x-auto custom-scrollbar">
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#D9BC7A] mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-[#C6A15B]" />
                    Interactive Waypoint Flow (Tap any point to inspect details)
                  </span>
                  <span className="text-slate-400 lowercase italic">
                    {currentRouteData.waypoints.length} stops logged
                  </span>
                </div>

                {/* Waypoints Horizontally Scrollable Flow */}
                <div className="flex items-center min-w-[560px] py-4 px-2 justify-between relative">
                  {/* Connecting Route Line */}
                  <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-sky-400 -translate-y-1/2 z-0 rounded-full opacity-60" />

                  {currentRouteData.waypoints.map((wp, idx) => {
                    const isSelected = selectedWaypoint.id === wp.id;
                    const wpWeather = weatherDataMap[wp.id];

                    return (
                      <div
                        key={wp.id}
                        onClick={() => setSelectedWaypointId(wp.id)}
                        className={`relative z-10 flex flex-col items-center group cursor-pointer transition-all transform ${
                          isSelected ? 'scale-110' : 'hover:scale-105'
                        }`}
                      >
                        {/* Distance / Drive badge & Weather overlay above */}
                        <div className="mb-2 flex flex-col items-center gap-1">
                          {wpWeather && (
                            <span className="text-[9px] bg-sky-950/90 text-sky-200 px-2 py-0.5 rounded-full border border-sky-400/50 font-mono font-bold flex items-center gap-1 shadow-md">
                              <span>{wpWeather.icon}</span>
                              <span>{wpWeather.tempC}°C</span>
                            </span>
                          )}

                          <div className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#0B1F3A] border border-[#C6A15B]/50 text-[#D9BC7A] shadow whitespace-nowrap flex items-center gap-1">
                            {idx === 0 ? (
                              <span>Start</span>
                            ) : (
                              <>
                                <span>{extractDistanceKm(wp.distanceFromPrev)}</span>
                                <span className="text-slate-400">•</span>
                                <Clock className="w-2.5 h-2.5 text-amber-400 flex-shrink-0" />
                                <span>{parseDriveTimeMins(wp.driveTime)} mins</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Node Marker Circle */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-xl ${
                            isSelected
                              ? 'bg-[#153451] border-[#C6A15B] text-[#D9BC7A] ring-4 ring-[#C6A15B]/30 scale-110'
                              : wp.permitRequired
                              ? 'bg-amber-950 border-amber-500 text-amber-300'
                              : 'bg-slate-900 border-emerald-500 text-emerald-400 hover:border-[#D9BC7A]'
                          }`}
                        >
                          {wp.type === 'hub' ? (
                            <Navigation className="w-4 h-4 fill-[#D9BC7A]" />
                          ) : wp.type === 'lake' ? (
                            <Sparkles className="w-4 h-4 text-sky-300" />
                          ) : wp.type === 'border' || wp.type === 'pass' ? (
                            <Mountain className="w-4 h-4 text-amber-300" />
                          ) : (
                            <MapPin className="w-4 h-4 text-emerald-400" />
                          )}
                        </div>

                        {/* Waypoint Label */}
                        <div className="mt-2 text-center max-w-[90px]">
                          <span
                            className={`block text-xs font-bold leading-tight truncate ${
                              isSelected ? 'text-[#D9BC7A] underline' : 'text-slate-200'
                            }`}
                          >
                            {wp.name}
                          </span>
                          <span className="text-[10px] text-amber-400 font-mono font-semibold block">
                            {wp.altitude}
                          </span>
                        </div>

                        {/* Pulse Ring for Selected */}
                        {isSelected && (
                          <span className="absolute -inset-1 rounded-full border border-[#C6A15B] animate-ping opacity-30 pointer-events-none" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Waypoint Detailed Inspector Card */}
              {selectedWaypoint && (
                <div className="bg-[#0B1F3A] border border-[#C6A15B]/40 rounded-2xl p-4 space-y-3 relative overflow-hidden animate-fadeIn">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold bg-[#C6A15B]/20 text-[#D9BC7A] px-2 py-0.5 rounded border border-[#C6A15B]/40">
                          Selected Stop Inspection
                        </span>
                        {selectedWaypoint.permitRequired && (
                          <span className="text-[10px] font-extrabold bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-700/60 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-amber-400" />
                            {selectedWaypoint.permitType || 'PAP Permit Required'}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                        <span>{selectedWaypoint.name}</span>
                        <span className="text-xs font-mono font-bold text-[#D9BC7A] bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                          ⛰️ {selectedWaypoint.altitude}
                        </span>
                      </h4>
                    </div>

                    {onSelectWaypointForNote && (
                      <button
                        type="button"
                        onClick={() => onSelectWaypointForNote(selectedWaypoint.name)}
                        className="bg-[#153451] hover:bg-[#1a4168] text-[#D9BC7A] px-3 py-1.5 rounded-xl border border-[#C6A15B]/40 text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 text-[#C6A15B]" />
                        <span>Add to Special Request Notes</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedWaypoint.description}
                  </p>

                  {/* Weather Forecast & Recommended Gear Section */}
                  {selectedWeather && (
                    <div className="bg-[#153451]/90 p-3 rounded-xl border border-sky-400/40 space-y-2 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase text-sky-300 flex items-center gap-1.5">
                          <span>🌤️</span> Waypoint Weather & Gear Advisory
                        </span>
                        <span className="bg-sky-950 text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-400/50 font-mono font-bold text-[11px] flex items-center gap-1.5">
                          <span>{selectedWeather.icon}</span>
                          <span>{selectedWeather.tempC}°C</span>
                          <span className="text-slate-400">•</span>
                          <span>{selectedWeather.condition}</span>
                          <span className="text-slate-400">•</span>
                          <span>💨 {selectedWeather.windSpeed} km/h wind</span>
                        </span>
                      </div>

                      <div className="bg-slate-950/80 p-2.5 rounded-lg border border-sky-500/30 text-slate-200 text-xs flex items-start gap-2">
                        <span className="text-base flex-shrink-0">🧥</span>
                        <div className="space-y-0.5">
                          <span className="font-bold text-sky-300 block text-[11px]">Recommended Packing Gear:</span>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {selectedWeather.gearRecommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Key Highlights */}
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase text-[#D9BC7A] block">
                        🌟 Key Stop Attractions:
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

                    {/* Drive & Distance Stats */}
                    <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Drive from previous:</span>
                        <span className="font-bold text-amber-300">{selectedWaypoint.distanceFromPrev}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400">Estimated duration:</span>
                        <span className="font-bold text-emerald-400">
                          {selectedWaypoint.driveTime} ({parseDriveTimeMins(selectedWaypoint.driveTime)} mins)
                        </span>
                      </div>
                      {selectedWaypoint.permitRequired && (
                        <div className="p-2 bg-amber-950/60 rounded border border-amber-800/80 text-[11px] text-amber-200 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <span>
                            Needs original Voter ID / Passport + 2 passport photos for Army clearance pass.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE GOOGLE MAPS INTERACTIVE ROUTE PREVIEW */}
          {activeTab === 'googlemap' && (
            <div className="space-y-3">
              <GoogleMapRouteViewer
                waypoints={currentRouteData.waypoints}
                selectedWaypoint={selectedWaypoint}
                onSelectWaypoint={(wp) => setSelectedWaypointId(wp.id)}
                routeName={currentRouteData.routeName}
                weatherDataMap={weatherDataMap}
              />

              <div className="flex items-center justify-between gap-2 p-3 bg-[#0B1F3A] rounded-xl border border-[#C6A15B]/30 text-xs">
                <div className="text-slate-300 text-[11px]">
                  Want exact GPS navigation route on your phone?
                </div>
                <a
                  href={currentRouteData.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#153451] hover:bg-[#1f476e] text-[#D9BC7A] px-3 py-1.5 rounded-lg border border-[#C6A15B]/40 font-bold flex items-center gap-1.5 transition-all text-xs flex-shrink-0"
                >
                  <span>Open Full Route in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* Bottom Required Permits Badge */}
          <div className="p-3 bg-[#0B1F3A]/80 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300">
                <strong className="text-emerald-400">Government Permits Handled:</strong>{' '}
                {currentRouteData.requiredPermits.join(' • ')}
              </span>
            </div>
            <span className="text-[10px] text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
              100% Free Processing by Offbeat Destination Desk
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
