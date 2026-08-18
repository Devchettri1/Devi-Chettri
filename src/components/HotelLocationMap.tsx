import React, { useState, useMemo } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useAdvancedMarkerRef,
  useMap 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  ExternalLink, 
  Sparkles, 
  Eye, 
  Footprints, 
  Car, 
  Building2, 
  Mountain, 
  Landmark, 
  ShoppingBag, 
  Key,
  Layers,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { HotelChainPartner, FeaturedStandaloneHotel, AGENCY_DETAILS } from '../data/travelData';

export interface TouristLandmark {
  id: string;
  name: string;
  category: 'viewpoint' | 'monastery' | 'promenade' | 'nature' | 'transit';
  categoryLabel: string;
  coords: { lat: number; lng: number };
  distanceFromHotelText: string;
  travelTimeText: string;
  travelType: 'walk' | 'drive';
  description: string;
  highlightTag?: string;
}

export interface HotelLocationInfo {
  destination: string;
  cityCenterName: string;
  exactAddress: string;
  coords: { lat: number; lng: number };
  landmarks: TouristLandmark[];
}

// Comprehensive database of coordinates & landmarks across Himalayan destinations
export const DESTINATION_LANDMARKS_MAP: Record<string, TouristLandmark[]> = {
  Gangtok: [
    {
      id: 'lm-mg-marg',
      name: 'MG Marg Promenade & Town Centre',
      category: 'promenade',
      categoryLabel: 'Shopping & Promenade',
      coords: { lat: 27.3297, lng: 88.6122 },
      distanceFromHotelText: '300 meters',
      travelTimeText: '3 min walk',
      travelType: 'walk',
      description: 'Vehicle-free cobblestone boulevard lined with cafes, Sikkimese handicraft emporiums, and live music.',
      highlightTag: 'Top Gangtok Landmark'
    },
    {
      id: 'lm-cable-car',
      name: 'Deorali Gangtok Ropeway & Cable Car',
      category: 'viewpoint',
      categoryLabel: 'Aerial Viewpoint',
      coords: { lat: 27.3204, lng: 88.6087 },
      distanceFromHotelText: '1.2 km',
      travelTimeText: '5 min drive / 14 min walk',
      travelType: 'drive',
      description: 'Zig-zagging aerial ropeway offering 360-degree views of Gangtok city and Mt Kanchenjunga valley.'
    },
    {
      id: 'lm-enchey-monastery',
      name: 'Enchey Monastery (200 yrs old)',
      category: 'monastery',
      categoryLabel: 'Sacred Monastery',
      coords: { lat: 27.3421, lng: 88.6189 },
      distanceFromHotelText: '2.8 km',
      travelTimeText: '10 min drive',
      travelType: 'drive',
      description: 'Historic Nyingma monastery blessed by Lama Drupthob Karpo, offering serene morning prayers.'
    },
    {
      id: 'lm-tashi-viewpoint',
      name: 'Tashi Viewpoint (Sunrise on Kanchenjunga)',
      category: 'viewpoint',
      categoryLabel: 'Snow Peak Viewpoint',
      coords: { lat: 27.3686, lng: 88.6318 },
      distanceFromHotelText: '6.5 km',
      travelTimeText: '18 min drive',
      travelType: 'drive',
      description: 'Famous dawn viewpoint overlooking Mt Kanchenjunga, Mt Siniolchu, and Phodong hills.',
      highlightTag: 'Best Sunrise View'
    },
    {
      id: 'lm-ban-jhakri',
      name: 'Ban Jhakri Waterfalls & Shamanic Park',
      category: 'nature',
      categoryLabel: 'Waterfall & Forest',
      coords: { lat: 27.3475, lng: 88.5830 },
      distanceFromHotelText: '5.4 km',
      travelTimeText: '16 min drive',
      travelType: 'drive',
      description: '100-foot cascading mountain waterfall surrounded by landscaped gardens celebrating Lepcha folklore.'
    },
    {
      id: 'lm-permit-office',
      name: 'Sikkim Tourism & Nathula Permit Desk',
      category: 'transit',
      categoryLabel: 'Permit Verification',
      coords: { lat: 27.3280, lng: 88.6130 },
      distanceFromHotelText: '400 meters',
      travelTimeText: '5 min walk',
      travelType: 'walk',
      description: 'Official desk for verification of Nathula Pass, Tsomgo Lake, and North Sikkim travel permits.'
    }
  ],
  Pelling: [
    {
      id: 'lm-pelling-helipad',
      name: 'Upper Pelling Helipad & Sunrise Ridge',
      category: 'viewpoint',
      categoryLabel: 'Panoramic Viewpoint',
      coords: { lat: 27.3185, lng: 88.2392 },
      distanceFromHotelText: '300 meters',
      travelTimeText: '4 min walk',
      travelType: 'walk',
      description: 'Expansive open ridge offering 180-degree unobstructed panoramas of Mt. Kanchenjunga and Kabru peaks.',
      highlightTag: 'Unobstructed 180° Vista'
    },
    {
      id: 'lm-pemayangtse-monastery',
      name: 'Pemayangtse Monastery (1705 AD)',
      category: 'monastery',
      categoryLabel: 'Ancient Monastery',
      coords: { lat: 27.3048, lng: 88.2527 },
      distanceFromHotelText: '1.8 km',
      travelTimeText: '6 min drive',
      travelType: 'drive',
      description: 'One of the oldest and premier monasteries in Sikkim, housing the magnificent 7-tiered wooden Zandog Palri.'
    },
    {
      id: 'lm-pelling-skywalk',
      name: 'Pelling Glass Skywalk & Chenrezig Statue',
      category: 'viewpoint',
      categoryLabel: 'Glass Skywalk & Shrine',
      coords: { lat: 27.3218, lng: 88.2435 },
      distanceFromHotelText: '2.2 km',
      travelTimeText: '7 min drive',
      travelType: 'drive',
      description: 'India’s first glass skywalk perched at 7,200 ft leading to the monumental 137 ft Chenrezig Statue.',
      highlightTag: 'Iconic Attraction'
    },
    {
      id: 'lm-rabdentse-ruins',
      name: 'Rabdentse Palace Ruins (2nd Royal Capital)',
      category: 'monastery',
      categoryLabel: 'Historical Heritage',
      coords: { lat: 27.2995, lng: 88.2590 },
      distanceFromHotelText: '3.5 km',
      travelTimeText: '12 min drive',
      travelType: 'drive',
      description: 'Archaeological ruins of Sikkim’s second capital from 1670 AD, nestled within dense rhododendron woods.'
    },
    {
      id: 'lm-khecheopalri-lake',
      name: 'Khecheopalri Sacred Wishing Lake',
      category: 'nature',
      categoryLabel: 'Sacred Lake',
      coords: { lat: 27.3556, lng: 88.1992 },
      distanceFromHotelText: '26 km',
      travelTimeText: '1 hr scenic drive',
      travelType: 'drive',
      description: 'Sacred footprint lake revered by Buddhists and Hindus where birds keep the water crystal pure.'
    }
  ],
  Darjeeling: [
    {
      id: 'lm-chowrasta-mall',
      name: 'Chowrasta & The Mall Road',
      category: 'promenade',
      categoryLabel: 'Mall Promenade',
      coords: { lat: 27.0435, lng: 88.2678 },
      distanceFromHotelText: '300 meters',
      travelTimeText: '4 min walk',
      travelType: 'walk',
      description: 'The historic heart of Darjeeling with horse rides, benches facing Mt Kanchenjunga, and colonial bakeries.',
      highlightTag: 'Darjeeling Heart'
    },
    {
      id: 'lm-tiger-hill',
      name: 'Tiger Hill Sunrise (Mt Everest & Kanchenjunga)',
      category: 'viewpoint',
      categoryLabel: 'Global Sunrise View',
      coords: { lat: 26.9942, lng: 88.2863 },
      distanceFromHotelText: '11 km',
      travelTimeText: '35 min dawn drive',
      travelType: 'drive',
      description: 'World-renowned sunrise point where the first rays illuminate twin peaks of Kanchenjunga and Everest.',
      highlightTag: 'Must-Visit Sunrise'
    },
    {
      id: 'lm-batasia-loop',
      name: 'Batasia Loop & Toy Train Spiral',
      category: 'nature',
      categoryLabel: 'Railway Heritage & Garden',
      coords: { lat: 27.0168, lng: 88.2472 },
      distanceFromHotelText: '4.8 km',
      travelTimeText: '15 min drive',
      travelType: 'drive',
      description: 'UNESCO World Heritage Toy Train 360-degree railway loop with panoramic floral gardens and Gorkha War Memorial.'
    },
    {
      id: 'lm-peace-pagoda',
      name: 'Japanese Peace Pagoda & Nipponzan Temple',
      category: 'monastery',
      categoryLabel: 'Peace Shrine',
      coords: { lat: 27.0305, lng: 88.2610 },
      distanceFromHotelText: '2.5 km',
      travelTimeText: '10 min drive',
      travelType: 'drive',
      description: 'Tranquil white stupa built under the guidance of Nichidatsu Fujii, radiating peace over Darjeeling hills.'
    },
    {
      id: 'lm-happy-valley-tea',
      name: 'Happy Valley Tea Estate & Factory',
      category: 'nature',
      categoryLabel: 'Organic Tea Gardens',
      coords: { lat: 27.0545, lng: 88.2625 },
      distanceFromHotelText: '2.8 km',
      travelTimeText: '10 min drive',
      travelType: 'drive',
      description: 'One of Darjeeling’s oldest organic tea plantations (1854) offering guided tea picking and tasting tours.'
    }
  ],
  Lachung: [
    {
      id: 'lm-lachung-village',
      name: 'Lachung Village Centre & Stream Bridge',
      category: 'promenade',
      categoryLabel: 'Alpine Settlement',
      coords: { lat: 27.6890, lng: 88.7430 },
      distanceFromHotelText: '200 meters',
      travelTimeText: '3 min walk',
      travelType: 'walk',
      description: 'Serene mountain valley village dotted with apple orchards, pine cottages, and pristine glacier streams.',
      highlightTag: 'Alpine Haven'
    },
    {
      id: 'lm-yumthang-valley',
      name: 'Yumthang Valley of Flowers (11,800 ft)',
      category: 'nature',
      categoryLabel: 'Rhododendron Sanctuary',
      coords: { lat: 27.8280, lng: 88.6970 },
      distanceFromHotelText: '24 km',
      travelTimeText: '50 min mountain drive',
      travelType: 'drive',
      description: 'Valley carpeted with 24+ species of blooming rhododendrons, hot sulfur springs, and grazing yaks.',
      highlightTag: 'Valley of Flowers'
    },
    {
      id: 'lm-zero-point',
      name: 'Zero Point / Yumesamdong (15,300 ft Snow Zone)',
      category: 'viewpoint',
      categoryLabel: 'High Altitude Snow Peak',
      coords: { lat: 27.9150, lng: 88.7250 },
      distanceFromHotelText: '50 km',
      travelTimeText: '2 hrs alpine drive',
      travelType: 'drive',
      description: 'The end of the civilian road near the Tibetan frontier where perpetual snow covers rugged Himalayan peaks.'
    },
    {
      id: 'lm-lachung-monastery',
      name: 'Lachung Gompa (Nyingma Shrine 1880)',
      category: 'monastery',
      categoryLabel: 'Alpine Monastery',
      coords: { lat: 27.6920, lng: 88.7410 },
      distanceFromHotelText: '400 meters',
      travelTimeText: '6 min walk',
      travelType: 'walk',
      description: 'Charming mountain monastery hosting annual masked Chaam dances against soaring snow walls.'
    }
  ]
};

// Hotel coordinate mapper
export const getHotelLocationDetails = (
  hotel: HotelChainPartner | FeaturedStandaloneHotel,
  activeCityOverride?: string
): HotelLocationInfo => {
  const hotelId = hotel.id;
  const hotelName = hotel.name.toLowerCase();

  // 1. Check standalone hotels
  if (hotelId === 'hotel-lachung-country-house') {
    return {
      destination: 'Lachung',
      cityCenterName: 'Upper Lachung Valley (200m to Village Centre)',
      exactAddress: 'Upper Lachung Valley, near Lachung Monastery, North Sikkim 737120',
      coords: { lat: 27.6895, lng: 88.7428 },
      landmarks: DESTINATION_LANDMARKS_MAP.Lachung
    };
  }

  if (hotelId === 'hotel-sila-norphel-pelling') {
    return {
      destination: 'Pelling',
      cityCenterName: 'Upper Pelling Ridge (300m to Helipad)',
      exactAddress: 'Upper Pelling Ridge, near Helipad & Pemayangtse, West Sikkim 737113',
      coords: { lat: 27.3178, lng: 88.2395 },
      landmarks: DESTINATION_LANDMARKS_MAP.Pelling
    };
  }

  if (hotelId === 'hotel-sun-mount-gangtok') {
    return {
      destination: 'Gangtok',
      cityCenterName: 'Tibet Road (250m to MG Marg)',
      exactAddress: 'Tibet Road, 3 min walk to MG Marg Shopping Promenade, Gangtok 737101',
      coords: { lat: 27.3290, lng: 88.6142 },
      landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
    };
  }

  if (hotelId === 'hotel-gangtok-prime') {
    return {
      destination: 'Gangtok',
      cityCenterName: 'Paljor Stadium Road (400m to MG Marg)',
      exactAddress: 'Paljor Stadium Road, near MG Marg Enclave, Gangtok 737101',
      coords: { lat: 27.3305, lng: 88.6130 },
      landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
    };
  }

  if (hotelId === 'hotel-hungry-jack-gangtok') {
    return {
      destination: 'Gangtok',
      cityCenterName: 'NH10 / Arithang (500m to MG Marg)',
      exactAddress: 'NH10 Highway, Arithang Central Junction, Gangtok 737101',
      coords: { lat: 27.3268, lng: 88.6120 },
      landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
    };
  }

  if (hotelId === 'hotel-crestora-grand-gangtok') {
    return {
      destination: 'Gangtok',
      cityCenterName: 'Upper Sichey VIP Enclave (400m to MG Marg)',
      exactAddress: 'Upper Sichey, near Chief Secretariat & VIP Enclave, Gangtok 737101',
      coords: { lat: 27.3335, lng: 88.6095 },
      landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
    };
  }

  // 2. Multi-branch chains or destination check
  const chosenCity = activeCityOverride || (
    'locations' in hotel && hotel.locations && hotel.locations.length > 0
      ? hotel.locations[0]
      : ('destination' in hotel && hotel.destination ? hotel.destination : 'Gangtok')
  );

  if (chosenCity.toLowerCase().includes('pelling')) {
    return {
      destination: 'Pelling',
      cityCenterName: 'Upper Pelling Scenic Ridge',
      exactAddress: `Upper Pelling Main Ridge, West Sikkim 737113 (${hotel.name})`,
      coords: { lat: 27.3180, lng: 88.2405 },
      landmarks: DESTINATION_LANDMARKS_MAP.Pelling
    };
  }

  if (chosenCity.toLowerCase().includes('darjeeling')) {
    return {
      destination: 'Darjeeling',
      cityCenterName: 'Chowrasta Mall / Gandhi Road Enclave',
      exactAddress: `The Mall Road / Gandhi Road, Darjeeling, West Bengal 734101 (${hotel.name})`,
      coords: { lat: 27.0425, lng: 88.2660 },
      landmarks: DESTINATION_LANDMARKS_MAP.Darjeeling
    };
  }

  if (chosenCity.toLowerCase().includes('lachung') || chosenCity.toLowerCase().includes('north sikkim')) {
    return {
      destination: 'Lachung',
      cityCenterName: 'Lachung Valley Stream View',
      exactAddress: `Upper Lachung Valley, North Sikkim 737120 (${hotel.name})`,
      coords: { lat: 27.6890, lng: 88.7435 },
      landmarks: DESTINATION_LANDMARKS_MAP.Lachung
    };
  }

  // Default to Gangtok
  if (hotelId === 'partner-mayfair') {
    return {
      destination: 'Gangtok',
      cityCenterName: 'Ranipool Valley Enclave (15 min drive to MG Marg)',
      exactAddress: 'Ranipool Eco-Park Enclave, Gangtok, Sikkim 737135',
      coords: { lat: 27.2872, lng: 88.5836 },
      landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
    };
  }

  if (hotelId === 'partner-jain-group') {
    return {
      destination: 'Gangtok',
      cityCenterName: 'Tibet Road (200m to MG Marg Walkway)',
      exactAddress: 'Tibet Road, Near MG Marg Promenade, Gangtok, Sikkim 737101',
      coords: { lat: 27.3292, lng: 88.6135 },
      landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
    };
  }

  if (hotelId === 'partner-rufina') {
    return {
      destination: 'Gangtok',
      cityCenterName: 'Central Gangtok / MG Marg Promenade Area',
      exactAddress: 'MG Marg Central Access, Gangtok, Sikkim 737101',
      coords: { lat: 27.3285, lng: 88.6110 },
      landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
    };
  }

  return {
    destination: 'Gangtok',
    cityCenterName: 'Central Gangtok / MG Marg Enclave',
    exactAddress: `Near MG Marg Promenade, Gangtok, Sikkim 737101 (${hotel.name})`,
    coords: { lat: 27.3300, lng: 88.6120 },
    landmarks: DESTINATION_LANDMARKS_MAP.Gangtok
  };
};

const isValidGoogleMapsKey = (key: any): boolean => {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (
    trimmed === '' ||
    trimmed === 'YOUR_API_KEY' ||
    trimmed === 'YOUR_GOOGLE_MAPS_API_KEY' ||
    trimmed === 'undefined' ||
    trimmed === 'null' ||
    trimmed.length < 25 ||
    !trimmed.startsWith('AIza')
  ) {
    return false;
  }
  return true;
};

// Sub-component that manages Map panning when a landmark is clicked
const MapController: React.FC<{
  targetCoords: { lat: number; lng: number };
  zoom?: number;
}> = ({ targetCoords, zoom = 15 }) => {
  const map = useMap();
  React.useEffect(() => {
    if (map && targetCoords) {
      map.panTo(targetCoords);
      if (zoom) map.setZoom(zoom);
    }
  }, [map, targetCoords, zoom]);
  return null;
};

interface HotelLocationMapProps {
  hotel: HotelChainPartner | FeaturedStandaloneHotel;
}

export const HotelLocationMap: React.FC<HotelLocationMapProps> = ({ hotel }) => {
  const API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
    '';

  const hasValidKey = isValidGoogleMapsKey(API_KEY);
  const [mapError, setMapError] = useState(false);

  // For multi-location chains, allow toggling between cities
  const availableCities = useMemo(() => {
    if ('locations' in hotel && hotel.locations && hotel.locations.length > 1) {
      return hotel.locations;
    }
    return [];
  }, [hotel]);

  const [activeCity, setActiveCity] = useState<string>(() => {
    if (availableCities.length > 0) return availableCities[0];
    return 'Gangtok';
  });

  const locationInfo = useMemo(() => {
    return getHotelLocationDetails(hotel, availableCities.length > 0 ? activeCity : undefined);
  }, [hotel, activeCity, availableCities]);

  // Selected landmark for InfoWindow & center
  const [selectedLandmark, setSelectedLandmark] = useState<TouristLandmark | null>(null);
  const [hotelInfoOpen, setHotelInfoOpen] = useState(true);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'viewpoint' | 'monastery' | 'promenade' | 'nature'>('all');

  // Marker refs for Google Maps InfoWindows
  const [hotelMarkerRef, hotelMarker] = useAdvancedMarkerRef();
  const [landmarkMarkerRef, landmarkMarker] = useAdvancedMarkerRef();

  // Target map coordinates
  const currentMapCenter = useMemo(() => {
    if (selectedLandmark) return selectedLandmark.coords;
    return locationInfo.coords;
  }, [selectedLandmark, locationInfo.coords]);

  const filteredLandmarks = useMemo(() => {
    if (activeCategoryFilter === 'all') return locationInfo.landmarks;
    return locationInfo.landmarks.filter(lm => lm.category === activeCategoryFilter);
  }, [locationInfo.landmarks, activeCategoryFilter]);

  const handleSelectLandmark = (lm: TouristLandmark) => {
    setSelectedLandmark(lm);
    setHotelInfoOpen(false);
  };

  const handleResetToHotel = () => {
    setSelectedLandmark(null);
    setHotelInfoOpen(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'viewpoint': return <Mountain className="w-3.5 h-3.5 text-amber-400" />;
      case 'monastery': return <Landmark className="w-3.5 h-3.5 text-rose-400" />;
      case 'promenade': return <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />;
      case 'nature': return <Eye className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <MapPin className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-xl">
      
      {/* Header & City Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Compass className="w-4 h-4" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-100">
              Interactive Hotel Location & Tourist Landmark Map
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-300 font-semibold">{locationInfo.cityCenterName}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{locationInfo.exactAddress}</span>
          </p>
        </div>

        {/* Multi-Location Switcher if Chain has properties in Gangtok, Pelling, Darjeeling etc */}
        {availableCities.length > 1 && (
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider">Branch:</span>
            {availableCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setActiveCity(city);
                  setSelectedLandmark(null);
                  setHotelInfoOpen(true);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeCity === city
                    ? 'bg-amber-500 text-slate-950 shadow font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter Pills for Landmarks */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
          <Layers className="w-3 h-3 text-cyan-400" />
          Filter Landmarks:
        </span>

        {[
          { id: 'all', label: `All Landmarks (${locationInfo.landmarks.length})` },
          { id: 'viewpoint', label: 'Viewpoints & Sunrise' },
          { id: 'promenade', label: 'Mall & Walkways' },
          { id: 'monastery', label: 'Heritage Monasteries' },
          { id: 'nature', label: 'Nature & Falls' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategoryFilter(tab.id as any)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
              activeCategoryFilter === tab.id
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}

        <button
          onClick={handleResetToHotel}
          className="ml-auto bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
        >
          <Building2 className="w-3 h-3 text-amber-400" />
          <span>Center on Hotel</span>
        </button>
      </div>

      {/* Main Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 h-[380px] sm:h-[440px]">
        {hasValidKey && !mapError ? (
          <APIProvider
            apiKey={API_KEY}
            version="weekly"
            libraries={['marker', 'places', 'geometry']}
            onError={() => setMapError(true)}
          >
            <Map
              defaultCenter={locationInfo.coords}
              defaultZoom={14}
              mapId="HOTEL_DETAILS_LOCATION_MAP"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
              gestureHandling="greedy"
              disableDefaultUI={false}
            >
              <MapController targetCoords={currentMapCenter} zoom={selectedLandmark ? 15 : 14} />

              {/* 1. HOTEL ADVANCED MARKER (Golden / Amber Theme) */}
              <AdvancedMarker
                ref={hotelMarkerRef}
                position={locationInfo.coords}
                title={hotel.name}
                onClick={() => {
                  setHotelInfoOpen(true);
                  setSelectedLandmark(null);
                }}
              >
                <div className="group cursor-pointer transform transition-transform hover:scale-110 flex flex-col items-center">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-2xl border-2 border-white ring-4 ring-amber-500/30 animate-pulse">
                    <Building2 className="w-3.5 h-3.5 text-slate-950" />
                    <span className="whitespace-nowrap">{hotel.name.split(' ')[0]} (Hotel)</span>
                  </div>
                  <div className="w-2.5 h-2.5 bg-amber-500 rotate-45 -mt-1 border-r border-b border-white" />
                </div>
              </AdvancedMarker>

              {/* Hotel InfoWindow */}
              {hotelInfoOpen && hotelMarker && (
                <InfoWindow anchor={hotelMarker} onCloseClick={() => setHotelInfoOpen(false)}>
                  <div className="p-1.5 text-slate-900 max-w-xs space-y-1.5 font-sans">
                    <div className="flex items-center gap-1">
                      <span className="bg-amber-500 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase">
                        {hotel.badge || 'Partner Hotel'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-600">
                        {hotel.starCategory}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900">{hotel.name}</h4>
                    <p className="text-[11px] text-slate-600 leading-tight">{locationInfo.exactAddress}</p>
                    <p className="text-[10px] text-cyan-700 font-semibold pt-0.5">
                      ⭐ {hotel.guestRating || 4.8}/5.0 Verified Rating · Direct Offbeat Tariff
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${locationInfo.destination}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-700 hover:underline pt-1"
                    >
                      <span>Open Navigation in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </InfoWindow>
              )}

              {/* 2. TOURIST LANDMARKS ADVANCED MARKERS */}
              {filteredLandmarks.map((lm) => {
                const isSelected = selectedLandmark?.id === lm.id;
                return (
                  <AdvancedMarker
                    key={lm.id}
                    position={lm.coords}
                    title={lm.name}
                    onClick={() => handleSelectLandmark(lm)}
                  >
                    <div className={`cursor-pointer transform transition-all hover:scale-110 flex flex-col items-center ${
                      isSelected ? 'scale-110 z-20' : 'z-10 opacity-90'
                    }`}>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold shadow-lg border ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-white ring-2 ring-cyan-400'
                          : 'bg-slate-950/90 text-cyan-300 border-cyan-800'
                      }`}>
                        {getCategoryIcon(lm.category)}
                        <span className="whitespace-nowrap truncate max-w-[110px]">{lm.name.split('(')[0]}</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rotate-45 -mt-0.5 ${
                        isSelected ? 'bg-cyan-500' : 'bg-slate-950'
                      }`} />
                    </div>
                  </AdvancedMarker>
                );
              })}

              {/* Selected Landmark InfoWindow */}
              {selectedLandmark && (
                <InfoWindow
                  position={selectedLandmark.coords}
                  onCloseClick={() => setSelectedLandmark(null)}
                >
                  <div className="p-1.5 text-slate-900 max-w-xs space-y-1.5 font-sans">
                    <div className="flex items-center justify-between gap-1">
                      <span className="bg-cyan-600 text-white font-bold text-[9px] px-1.5 py-0.5 rounded uppercase">
                        {selectedLandmark.categoryLabel}
                      </span>
                      <span className="text-[10px] font-extrabold text-amber-700">
                        {selectedLandmark.distanceFromHotelText} from Hotel
                      </span>
                    </div>

                    <h4 className="font-extrabold text-xs text-slate-900">{selectedLandmark.name}</h4>
                    <p className="text-[11px] text-slate-600 leading-snug">{selectedLandmark.description}</p>

                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 p-1.5 rounded">
                      {selectedLandmark.travelType === 'walk' ? (
                        <Footprints className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Car className="w-3 h-3 text-cyan-600" />
                      )}
                      <span>Travel Time: {selectedLandmark.travelTimeText}</span>
                    </div>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${locationInfo.coords.lat},${locationInfo.coords.lng}&destination=${selectedLandmark.coords.lat},${selectedLandmark.coords.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-cyan-700 hover:underline pt-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Get Driving / Walking Directions</span>
                    </a>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : (
          /* Embedded Google Maps iFrame Fallback (Instant, Zero Key Required) */
          <div className="w-full h-full relative flex flex-col bg-slate-950">
            <iframe
              title={`${hotel.name} Location Map in ${locationInfo.destination}`}
              src={`https://maps.google.com/maps?q=${locationInfo.coords.lat},${locationInfo.coords.lng}&hl=en&z=14&output=embed`}
              className="w-full h-full border-0 filter contrast-[105%]"
              loading="lazy"
              allowFullScreen
            />

            {/* Overlay Hotel Badge */}
            <div className="absolute top-3 left-3 bg-slate-950/95 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-2xl text-xs space-y-1 max-w-xs">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="font-extrabold text-amber-300 truncate">{hotel.name}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">{locationInfo.cityCenterName}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${locationInfo.destination}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:underline pt-1"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {/* Map Legend Overlay in Bottom-Right */}
        <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[10px] text-slate-300 space-y-1 shadow-lg hidden sm:block">
          <div className="flex items-center gap-2 font-bold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Hotel Location</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Tourist Landmarks</span>
          </div>
        </div>
      </div>

      {/* Landmark Proximity Cards Grid (Click to Center & View Distance) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proximity to Key Sightseeing & Points of Interest:</span>
          </span>
          <span className="text-[10px] text-slate-500">Click any landmark to pin & view route</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredLandmarks.map((lm) => {
            const isSelected = selectedLandmark?.id === lm.id;
            return (
              <button
                key={lm.id}
                onClick={() => handleSelectLandmark(lm)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between space-y-1.5 group ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                    : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 w-full">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(lm.category)}
                    <h5 className={`text-xs font-bold leading-snug line-clamp-1 ${
                      isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {lm.name}
                    </h5>
                  </div>
                  <span className="bg-slate-950 text-cyan-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-cyan-900/60 whitespace-nowrap">
                    {lm.distanceFromHotelText}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 line-clamp-1">
                  {lm.description}
                </p>

                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800/60 w-full text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300 font-semibold">
                    {lm.travelType === 'walk' ? (
                      <Footprints className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Car className="w-3 h-3 text-cyan-400" />
                    )}
                    {lm.travelTimeText}
                  </span>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${locationInfo.coords.lat},${locationInfo.coords.lng}&destination=${lm.coords.lat},${lm.coords.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-0.5 hover:underline"
                  >
                    <span>Directions</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
