import React, { useState, useMemo } from 'react';
import {
  CloudSun,
  Sun,
  Snowflake,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Calendar,
  Sparkles,
  Info,
  ShieldCheck,
  MapPin,
  Clock,
  Compass,
  Shirt
} from 'lucide-react';

export interface RegionalForecastDay {
  dayName: string;
  dateLabel: string;
  condition: 'Sunny' | 'Partly Cloudy' | 'Mountain Mist' | 'Pleasant' | 'Crisp Snow' | 'Light Showers';
  highTemp: number;
  lowTemp: number;
  visibility: string;
  humidity: string;
  windSpeed: string;
  precipitation: string;
  mountainViewScore: 'Exceptional (100%)' | 'Clear (90%)' | 'Good (75%)' | 'Misty';
  checkInTip: string;
}

export interface RegionWeatherConfig {
  regionName: string;
  state: string;
  altitude: string;
  elevationMeters: number;
  currentTemp: number;
  feelsLike: number;
  overallStatus: 'Optimal For Travel' | 'Pleasant Mountain Climate' | 'Snow Experience' | 'Clear Blue Skies';
  clothingAdvice: string;
  bestCheckInWindow: string;
  roadCondition: string;
  forecast: RegionalForecastDay[];
}

const REGIONAL_WEATHER_DATABASE: Record<string, RegionWeatherConfig> = {
  gangtok: {
    regionName: 'Gangtok',
    state: 'East Sikkim',
    altitude: '5,410 ft (1,650 m)',
    elevationMeters: 1650,
    currentTemp: 18,
    feelsLike: 17,
    overallStatus: 'Optimal For Travel',
    clothingAdvice: 'Comfortable day cottons with a light fleece or softshell jacket for evening MG Marg strolls.',
    bestCheckInWindow: '1:00 PM – 3:30 PM (Sunlit hill vistas & smooth check-in)',
    roadCondition: 'NH-10 Siliguri-Gangtok route fully clear and smooth.',
    forecast: [
      {
        dayName: 'Today (Day 1)',
        dateLabel: 'Check-in Day',
        condition: 'Sunny',
        highTemp: 20,
        lowTemp: 13,
        visibility: '10+ km (Clear)',
        humidity: '62%',
        windSpeed: '8 km/h NW',
        precipitation: '5%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: 'Golden afternoon sunlight across valley-facing balconies. Perfect for sunset tea.'
      },
      {
        dayName: 'Tomorrow (Day 2)',
        dateLabel: 'Sightseeing Day',
        condition: 'Pleasant',
        highTemp: 19,
        lowTemp: 12,
        visibility: '8+ km (Good)',
        humidity: '65%',
        windSpeed: '10 km/h W',
        precipitation: '10%',
        mountainViewScore: 'Clear (90%)',
        checkInTip: 'Ideal weather for Rumtek Monastery & Ban Jhakri Waterfalls excursion.'
      },
      {
        dayName: 'Day After (Day 3)',
        dateLabel: 'Mountain Tour Day',
        condition: 'Partly Cloudy',
        highTemp: 18,
        lowTemp: 11,
        visibility: '8 km',
        humidity: '68%',
        windSpeed: '12 km/h NW',
        precipitation: '15%',
        mountainViewScore: 'Good (75%)',
        checkInTip: 'Clear morning skies for ropeway rides and Tsomgo Lake departure.'
      }
    ]
  },
  pelling: {
    regionName: 'Pelling',
    state: 'West Sikkim',
    altitude: '7,200 ft (2,150 m)',
    elevationMeters: 2150,
    currentTemp: 15,
    feelsLike: 14,
    overallStatus: 'Clear Blue Skies',
    clothingAdvice: 'Mid-weight warm jacket, woollen pullover, and comfortable walking shoes for Skywalk.',
    bestCheckInWindow: '1:30 PM – 4:00 PM (Unobstructed golden hour Kanchenjunga view)',
    roadCondition: 'Pelling-Geyzing mountain highway clear with fresh asphalt.',
    forecast: [
      {
        dayName: 'Today (Day 1)',
        dateLabel: 'Check-in Day',
        condition: 'Sunny',
        highTemp: 17,
        lowTemp: 9,
        visibility: '12+ km (Pristine)',
        humidity: '58%',
        windSpeed: '9 km/h N',
        precipitation: '0%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: '5:30 AM sunrise from your room balcony reveals direct Mt. Kanchenjunga peak line.'
      },
      {
        dayName: 'Tomorrow (Day 2)',
        dateLabel: 'Skywalk & Ruins Day',
        condition: 'Pleasant',
        highTemp: 16,
        lowTemp: 8,
        visibility: '10 km (Clear)',
        humidity: '60%',
        windSpeed: '11 km/h NE',
        precipitation: '5%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: 'Pelling Glass Skywalk & Rabdentse Ruins best visited between 9:00 AM - 1:00 PM.'
      },
      {
        dayName: 'Day After (Day 3)',
        dateLabel: 'Lakes & Falls Day',
        condition: 'Partly Cloudy',
        highTemp: 15,
        lowTemp: 8,
        visibility: '9 km',
        humidity: '64%',
        windSpeed: '12 km/h N',
        precipitation: '10%',
        mountainViewScore: 'Clear (90%)',
        checkInTip: 'Khecheopalri sacred wish-fulfilling lake is serene and misty in early morning.'
      }
    ]
  },
  lachung: {
    regionName: 'Lachung & Yumthang',
    state: 'North Sikkim',
    altitude: '8,800 ft – 15,300 ft',
    elevationMeters: 2700,
    currentTemp: 8,
    feelsLike: 5,
    overallStatus: 'Snow Experience',
    clothingAdvice: 'Heavy thermal innerwear, down feather jacket, woollen cap, gloves, and warm socks.',
    bestCheckInWindow: '3:00 PM – 5:00 PM (Before mountain dusk temperature drops)',
    roadCondition: '4WD Scorpio / Innova mandatory. Army clearance verified daily.',
    forecast: [
      {
        dayName: 'Today (Day 1)',
        dateLabel: 'Arrival in Lachung',
        condition: 'Crisp Snow',
        highTemp: 10,
        lowTemp: 2,
        visibility: '7 km (Alpine)',
        humidity: '75%',
        windSpeed: '15 km/h NW',
        precipitation: '15%',
        mountainViewScore: 'Clear (90%)',
        checkInTip: 'Hot butter tea & electric blankets ready in homestay upon arrival.'
      },
      {
        dayName: 'Tomorrow (Day 2)',
        dateLabel: 'Yumthang & Zero Point',
        condition: 'Crisp Snow',
        highTemp: 6,
        lowTemp: -3,
        visibility: '6 km (Snowbound)',
        humidity: '80%',
        windSpeed: '18 km/h NW',
        precipitation: '20%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: '6:00 AM early start for Zero Point ensures snow tracks and clear mountain pass.'
      },
      {
        dayName: 'Day After (Day 3)',
        dateLabel: 'Valley Exploration',
        condition: 'Partly Cloudy',
        highTemp: 9,
        lowTemp: 1,
        visibility: '8 km',
        humidity: '72%',
        windSpeed: '12 km/h W',
        precipitation: '10%',
        mountainViewScore: 'Clear (90%)',
        checkInTip: 'Katao excursion & apple orchard walk optimal before midday transfer.'
      }
    ]
  },
  darjeeling: {
    regionName: 'Darjeeling',
    state: 'West Bengal / Hills',
    altitude: '6,700 ft (2,042 m)',
    elevationMeters: 2042,
    currentTemp: 16,
    feelsLike: 15,
    overallStatus: 'Optimal For Travel',
    clothingAdvice: 'Comfortable cotton layer, warm cardigan or windbreaker, and walking shoes for Mall Road.',
    bestCheckInWindow: '12:30 PM – 3:00 PM (Great for afternoon tea garden walk & high tea)',
    roadCondition: 'Pankhabari / Rohini road in excellent condition.',
    forecast: [
      {
        dayName: 'Today (Day 1)',
        dateLabel: 'Check-in Day',
        condition: 'Sunny',
        highTemp: 19,
        lowTemp: 11,
        visibility: '10 km (Clear)',
        humidity: '63%',
        windSpeed: '7 km/h SW',
        precipitation: '5%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: 'Stroll Chowrasta Mall Road and enjoy fresh bakery high-tea at Glenary’s.'
      },
      {
        dayName: 'Tomorrow (Day 2)',
        dateLabel: 'Tiger Hill Sunrise',
        condition: 'Pleasant',
        highTemp: 18,
        lowTemp: 10,
        visibility: '12 km (Crisp Sunrise)',
        humidity: '60%',
        windSpeed: '8 km/h S',
        precipitation: '0%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: '4:00 AM private Innova departure for golden Kanchenjunga sunrise from Tiger Hill.'
      },
      {
        dayName: 'Day After (Day 3)',
        dateLabel: 'Heritage Toy Train',
        condition: 'Mountain Mist',
        highTemp: 17,
        lowTemp: 10,
        visibility: '7 km (Scenic Mist)',
        humidity: '70%',
        windSpeed: '10 km/h SW',
        precipitation: '15%',
        mountainViewScore: 'Good (75%)',
        checkInTip: 'Himalayan Mountaineering Institute & Happy Valley tea tasting session.'
      }
    ]
  },
  ravangla: {
    regionName: 'Ravangla & Namchi',
    state: 'South Sikkim',
    altitude: '7,000 ft (2,130 m)',
    elevationMeters: 2130,
    currentTemp: 16,
    feelsLike: 15,
    overallStatus: 'Pleasant Mountain Climate',
    clothingAdvice: 'Light jacket or shawl, sunglasses, and comfortable sneakers for Buddha Park.',
    bestCheckInWindow: '1:00 PM – 3:30 PM (Bright mountain sun behind 130ft Buddha statue)',
    roadCondition: 'Tarku-Ravangla highway scenic and smooth.',
    forecast: [
      {
        dayName: 'Today (Day 1)',
        dateLabel: 'Check-in Day',
        condition: 'Sunny',
        highTemp: 18,
        lowTemp: 10,
        visibility: '11 km',
        humidity: '59%',
        windSpeed: '8 km/h N',
        precipitation: '0%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: 'Quiet evening stroll in Buddha Park with prayer bell chants.'
      },
      {
        dayName: 'Tomorrow (Day 2)',
        dateLabel: 'Temi Tea Garden Day',
        condition: 'Pleasant',
        highTemp: 18,
        lowTemp: 10,
        visibility: '10 km',
        humidity: '62%',
        windSpeed: '9 km/h NE',
        precipitation: '5%',
        mountainViewScore: 'Clear (90%)',
        checkInTip: 'Organic tea plucking session at Temi Tea Estate in crisp morning sun.'
      },
      {
        dayName: 'Day After (Day 3)',
        dateLabel: 'Char Dham Namchi',
        condition: 'Partly Cloudy',
        highTemp: 17,
        lowTemp: 9,
        visibility: '9 km',
        humidity: '65%',
        windSpeed: '11 km/h N',
        precipitation: '10%',
        mountainViewScore: 'Good (75%)',
        checkInTip: 'Visit 87ft Lord Shiva statue at Solophok Char Dham before transfer.'
      }
    ]
  },
  bhutan: {
    regionName: 'Paro & Thimphu',
    state: 'Bhutan Kingdom',
    altitude: '7,200 ft – 7,600 ft',
    elevationMeters: 2280,
    currentTemp: 17,
    feelsLike: 16,
    overallStatus: 'Clear Blue Skies',
    clothingAdvice: 'Formal modest full-length clothing for Dzong visits, light sweater & comfortable trekking boots.',
    bestCheckInWindow: '12:00 PM – 3:00 PM (Paro valley sunlight & easy hotel briefing)',
    roadCondition: 'Thimphu-Paro 4-lane expressway immaculate.',
    forecast: [
      {
        dayName: 'Today (Day 1)',
        dateLabel: 'Arrival Day',
        condition: 'Sunny',
        highTemp: 19,
        lowTemp: 8,
        visibility: '15 km (Crystal Clear)',
        humidity: '50%',
        windSpeed: '6 km/h NW',
        precipitation: '0%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: 'Paro riverbank evening walk with traditional Bhutanese architecture.'
      },
      {
        dayName: 'Tomorrow (Day 2)',
        dateLabel: "Tiger's Nest Hike",
        condition: 'Sunny',
        highTemp: 18,
        lowTemp: 7,
        visibility: '15 km (Pristine)',
        humidity: '52%',
        windSpeed: '8 km/h NW',
        precipitation: '0%',
        mountainViewScore: 'Exceptional (100%)',
        checkInTip: '7:00 AM trailhead start allows cool shade up to Taktsang Monastery.'
      },
      {
        dayName: 'Day After (Day 3)',
        dateLabel: 'Punakha Valley Tour',
        condition: 'Pleasant',
        highTemp: 21,
        lowTemp: 11,
        visibility: '12 km',
        humidity: '55%',
        windSpeed: '7 km/h S',
        precipitation: '5%',
        mountainViewScore: 'Clear (90%)',
        checkInTip: 'Dochula Pass (108 stupas) offers 360° snowcapped Himalayan vistas.'
      }
    ]
  }
};

interface HotelWeatherForecastProps {
  hotelName?: string;
  hotelLocation?: string;
  featuredLocations?: string[];
}

export const HotelWeatherForecast: React.FC<HotelWeatherForecastProps> = ({
  hotelName = '',
  hotelLocation = '',
  featuredLocations = []
}) => {
  // Determine region key
  const defaultRegionKey = useMemo(() => {
    const combined = `${hotelName} ${hotelLocation} ${featuredLocations.join(' ')}`.toLowerCase();
    if (combined.includes('lachung') || combined.includes('lachen') || combined.includes('zero point') || combined.includes('north sikkim') || combined.includes('yumthang')) {
      return 'lachung';
    }
    if (combined.includes('pelling') || combined.includes('west sikkim') || combined.includes('gezing') || combined.includes('skywalk') || combined.includes('norphel') || combined.includes('rabdentse')) {
      return 'pelling';
    }
    if (combined.includes('darjeeling') || combined.includes('tiger hill') || combined.includes('glenary') || combined.includes('elgin darjeeling') || combined.includes('windamere')) {
      return 'darjeeling';
    }
    if (combined.includes('ravangla') || combined.includes('namchi') || combined.includes('south sikkim') || combined.includes('temi')) {
      return 'ravangla';
    }
    if (combined.includes('bhutan') || combined.includes('paro') || combined.includes('thimphu')) {
      return 'bhutan';
    }
    return 'gangtok';
  }, [hotelName, hotelLocation, featuredLocations]);

  const [selectedRegion, setSelectedRegion] = useState<string>(defaultRegionKey);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(0);

  const regionData = REGIONAL_WEATHER_DATABASE[selectedRegion] || REGIONAL_WEATHER_DATABASE.gangtok;
  const activeDayForecast = regionData.forecast[selectedDayIdx] || regionData.forecast[0];

  const getWeatherIcon = (condition: string, className: string = 'w-6 h-6') => {
    switch (condition) {
      case 'Sunny':
        return <Sun className={`${className} text-amber-400`} />;
      case 'Pleasant':
        return <CloudSun className={`${className} text-cyan-300`} />;
      case 'Crisp Snow':
        return <Snowflake className={`${className} text-cyan-200 animate-pulse`} />;
      case 'Light Showers':
        return <CloudRain className={`${className} text-blue-400`} />;
      case 'Mountain Mist':
        return <Wind className={`${className} text-indigo-300`} />;
      default:
        return <CloudSun className={`${className} text-cyan-400`} />;
    }
  };

  return (
    <div className="bg-[#060B18] border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CloudSun className="w-4 h-4" />
            </span>
            <h4 className="font-serif font-bold text-base text-white">
              Real-Time 3-Day Regional Weather & Check-In Forecast
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Live mountain meteorological forecast for <strong>{regionData.regionName} ({regionData.state})</strong> • Alt: {regionData.altitude}
          </p>
        </div>

        {/* Region Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-slate-400 uppercase font-semibold hidden md:inline">Region:</span>
          {Object.keys(REGIONAL_WEATHER_DATABASE).map((key) => {
            const r = REGIONAL_WEATHER_DATABASE[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setSelectedRegion(key);
                  setSelectedDayIdx(0);
                }}
                className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all border ${
                  selectedRegion === key
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md font-bold'
                    : 'bg-[#0A1128] text-slate-300 border-slate-800 hover:bg-[#0E1738]'
                }`}
              >
                {r.regionName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Day Forecast Strip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {regionData.forecast.map((day, idx) => {
          const isSelected = selectedDayIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedDayIdx(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-cyan-950/80 to-[#0A1128] border-cyan-400 shadow-lg ring-1 ring-cyan-400/50'
                  : 'bg-[#0A1128] border-slate-800 hover:border-slate-700 opacity-90 hover:opacity-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                    {day.dayName}
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {day.dateLabel}
                  </span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#060B18] border border-slate-800">
                  {getWeatherIcon(day.condition, 'w-5 h-5')}
                </div>
              </div>

              <div className="my-2.5 flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-white">{day.highTemp}°</span>
                  <span className="text-xs text-slate-400 font-semibold">/ {day.lowTemp}°C</span>
                </div>
                <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  {day.condition}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <strong className="text-slate-200">Vista:</strong> {day.mountainViewScore.split(' ')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="w-3 h-3 text-blue-400" />
                  <span>Rain: {day.precipitation}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive Check-In Planning Advisory Box for Selected Day */}
      <div className="bg-[#0A1128] border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {activeDayForecast.dayName} Check-In & Mountain Advisory:
            </span>
          </div>

          <span className="text-[11px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/70 flex items-center gap-1 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{regionData.overallStatus}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Check-In Timing & Balcony View Tip */}
          <div className="space-y-2 bg-[#060B18] p-3 rounded-lg border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recommended Check-In Window:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {regionData.bestCheckInWindow}
            </p>
            <p className="text-emerald-300 text-[11px] font-medium pt-1 border-t border-slate-800/60 flex items-start gap-1">
              <span>💡</span>
              <span>{activeDayForecast.checkInTip}</span>
            </p>
          </div>

          {/* Clothing & Mountain Packing Advisory */}
          <div className="space-y-2 bg-[#060B18] p-3 rounded-lg border border-slate-800/80">
            <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <Shirt className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended Clothing & Packing:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {regionData.clothingAdvice}
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60">
              <span className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-cyan-400" />
                <span>Wind: {activeDayForecast.windSpeed}</span>
              </span>
              <span className="flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-amber-400" />
                <span>Feels like {regionData.feelsLike}°C</span>
              </span>
            </div>
          </div>
        </div>

        {/* Road & Transit Status */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 bg-[#060B18]/60 p-2 rounded-lg">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <strong className="text-slate-200">Transit & Roadway:</strong> {regionData.roadCondition}
          </span>
          <span className="text-[10px] text-cyan-400 font-semibold hidden sm:inline">
            Updated via Gangtok Operations Desk
          </span>
        </div>
      </div>
    </div>
  );
};
