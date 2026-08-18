export interface ItineraryGenerationParams {
  duration: string;
  destination: string;
  travelers?: number;
  preferences?: string;
  budget?: string;
  companions?: string;
  interests?: string[] | string;
  vegMeals?: boolean;
}

export function generateClientItineraryFallback(params: ItineraryGenerationParams) {
  const durationDays = parseInt(params.duration) || 5;
  const travelers = Number(params.travelers) || 2;
  const budget = params.budget || 'Premium 3★/4★';
  const isNorthSikkimRequested =
    (params.destination && params.destination.toLowerCase().includes('north')) ||
    (params.destination && params.destination.toLowerCase().includes('lachung')) ||
    (params.preferences && params.preferences.toLowerCase().includes('zero point')) ||
    durationDays >= 6;

  const costPerPersonNum = budget.includes('Luxury')
    ? 24500 + (durationDays - 4) * 3500
    : 16800 + (durationDays - 4) * 2400;

  const totalCostNum = costPerPersonNum * travelers;

  const dayByDay = [];

  // Day 1
  dayByDay.push({
    day: 1,
    title: 'NJP Railway / Bagdogra Airport (IXB) to Gangtok Scenic Transfer',
    popularHighlights: ['Teesta River Valley scenic drive', 'MG Marg pedestrian stroll'],
    offbeatHighlights: ['Flower Exhibition Centre', 'Local Sikkimese High-Tea & Momos'],
    overnightStay: budget.includes('Luxury') ? 'Mayfair Spa Resort / Denzong Regency, Gangtok' : 'Summit Denzong / Udaan Woodberry, Gangtok',
    mealsIncluded: 'Welcome Drink & Gourmet Dinner (MAP Plan)',
    details:
      'Chauffeur reception at NJP Station or Bagdogra Airport in private Toyota Innova Crysta. Drive along the scenic Teesta River to Gangtok. Evening leisure walk on the vehicle-free MG Marg.',
  });

  if (isNorthSikkimRequested && durationDays >= 3) {
    // MANDATORY 2 NIGHT LACHUNG STAY FOR NORTH SIKKIM
    dayByDay.push({
      day: 2,
      title: 'Gangtok to Lachung (North Sikkim) via Waterfalls [Lachung Stay Night 1]',
      popularHighlights: ['Seven Sisters Waterfall', 'Chungthang Confluence'],
      offbeatHighlights: ['Kabi Lungchok historic treaty grove', 'Bhim Nala Waterfall'],
      overnightStay: 'Rufina Lachung Grand / Traditional Alpine Homestay, Lachung',
      mealsIncluded: 'Breakfast, Lunch & Hot Sikkimese Dinner (AP Plan Included)',
      details:
        'Morning departure in private 4WD SUV with North Sikkim Protected Area Permit (PAP). Scenic drive through pine forests and mountain cascades to Lachung village for Night 1 stay. Mandatory 2-Night Lachung stay enforced for safe altitude acclimatization.',
    });

    dayByDay.push({
      day: 3,
      title: 'Lachung to Yumthang Valley, Zero Point (15,300 ft) & Katao [Lachung Stay Night 2]',
      popularHighlights: ['Yumthang Valley of Flowers (11,800 ft)', 'Snowbound Zero Point (15,300 ft)'],
      offbeatHighlights: ['Mount Katao border snow peak excursion', 'Hot Sulphur Springs'],
      overnightStay: 'Rufina Lachung Grand / Traditional Alpine Homestay, Lachung',
      mealsIncluded: 'Breakfast, Packed Lunch & Hot Dinner (AP Plan Included)',
      details:
        'Early morning drive to Yumthang Valley of Flowers and snow-capped Zero Point. Excursion to offbeat Mount Katao. Return to Lachung for second night stay with hot home-cooked meals.',
    });

    if (durationDays >= 4) {
      dayByDay.push({
        day: 4,
        title: 'Lachung to Gangtok via Naga Waterfalls & Singhik',
        popularHighlights: ['Naga Waterfalls', 'Singhik Mt. Kanchenjunga Viewpoint'],
        offbeatHighlights: ['Phodong Monastery offbeat detour', 'Ban Jhakri Energy Park'],
        overnightStay: budget.includes('Luxury') ? 'Mayfair Spa Resort, Gangtok' : 'Summit Denzong / Udaan Woodberry, Gangtok',
        mealsIncluded: 'Breakfast & Dinner',
        details:
          'Scenic return drive to Gangtok with stopovers at Singhik viewpoint and Naga waterfalls. Check-in at hotel and evening relax.',
      });
    }

    if (durationDays >= 5) {
      dayByDay.push({
        day: 5,
        title: 'Excursion to High-Altitude Tsomgo Lake (12,400 ft) & Baba Mandir',
        popularHighlights: ['Glacial Tsomgo Lake (Changu)', 'New Baba Mandir Memorial'],
        offbeatHighlights: ['Old Silk Route Kupup Elephant Lake', 'Tukla Valley view'],
        overnightStay: 'Gangtok 3★/4★ Boutique Hotel',
        mealsIncluded: 'Breakfast & Dinner',
        details:
          'Ascend to sacred Tsomgo Lake surrounded by alpine peaks. Visit historic Baba Mandir. (Nathula Pass Indo-China Border subject to state permit lottery approval).',
      });
    }

    if (durationDays >= 6) {
      dayByDay.push({
        day: 6,
        title: 'Gangtok to Darjeeling Queen of Hills via Lamahatta Pine Forest',
        popularHighlights: ['Darjeeling Mall Road & Chowrasta', 'Ghum Monastery'],
        offbeatHighlights: ['Lamahatta Eco Park sacred prayer pine grove', 'Tinchuley orange orchard view'],
        overnightStay: budget.includes('Luxury') ? 'The Elgin / Mayfair Darjeeling' : 'Summit Hermon / Udaan Dekeling, Darjeeling',
        mealsIncluded: 'Breakfast & Dinner',
        details:
          'Picturesque drive through tea garden slopes and Lamahatta pine forests to Darjeeling. Check-in and evening stroll at colonial Chowrasta.',
      });
    }

    if (durationDays >= 7) {
      dayByDay.push({
        day: 7,
        title: 'Tiger Hill Sunrise & Darjeeling City Tour to NJP / Bagdogra Departure',
        popularHighlights: ['Tiger Hill sunrise over Mt. Kanchenjunga', 'Batasia Loop & Toy Train', 'Himalayan Mountaineering Institute'],
        offbeatHighlights: ['Happy Valley Tea Estate factory tea tasting walk'],
        overnightStay: 'Departure Day',
        mealsIncluded: 'Breakfast Included',
        details:
          'Early 4:00 AM drive to Tiger Hill for golden sunrise over Kanchenjunga. Visit Batasia Loop and tea gardens, followed by timely transfer to NJP station / Bagdogra Airport.',
      });
    }
  } else {
    // Sikkim & Darjeeling Circuit
    dayByDay.push({
      day: 2,
      title: 'High-Altitude Tsomgo Lake (12,400 ft), Baba Mandir & Nathula Pass',
      popularHighlights: ['Glacial Tsomgo Lake (Changu)', 'Indo-China Border Nathula Pass', 'Baba Mandir'],
      offbeatHighlights: ['Yak ride near alpine lake', 'Sherathang Border Trade Market'],
      overnightStay: 'Gangtok 3★/4★ Deluxe Hotel',
      mealsIncluded: 'Breakfast & Dinner',
      details:
        'Drive through dramatic mountain hairpins up to 12,400 ft to holy Tsomgo Lake and historic Baba Harbhajan Singh Memorial shrine. Evening return to Gangtok.',
    });

    dayByDay.push({
      day: 3,
      title: 'Gangtok Local Sightseeing to Pelling via Ravangla Buddha Park',
      popularHighlights: ['Buddha Park Ravangla (130ft Golden Buddha)', 'Rumtek Monastery'],
      offbeatHighlights: ['Tarey Bhir 10,000ft Ridge Walk', 'Temi Tea Garden'],
      overnightStay: 'Pelling 3★ Deluxe Hotel',
      mealsIncluded: 'Breakfast & Dinner',
      details:
        'Visit majestic Buddha Park in Ravangla with panoramic Kanchenjunga backdrop. Scenic drive to Pelling with scenic mountain sunset.',
    });

    dayByDay.push({
      day: 4,
      title: 'Pelling Skywalk, Chenrezig Statue & Rabdentse Ruins to Darjeeling',
      popularHighlights: ['India’s 1st Glass Skywalk (7,200 ft)', 'Rabdentse Ancient Palace Ruins', 'Pemayangtse Monastery'],
      offbeatHighlights: ['Rimbi Orange Garden & Rock Garden', 'Khecheopalri Wish-Fulfilling Sacred Lake'],
      overnightStay: 'Darjeeling Boutique Stay',
      mealsIncluded: 'Breakfast & Dinner',
      details:
        'Walk on the thrilling transparent glass skywalk gazing at Chenrezig statue. Drive through valleys to Darjeeling Queen of Hills.',
    });

    if (durationDays >= 5) {
      dayByDay.push({
        day: 5,
        title: 'Darjeeling Tiger Hill Sunrise & Tea Gardens to Bagdogra / NJP Departure',
        popularHighlights: ['Tiger Hill Mt. Kanchenjunga Sunrise', 'Batasia Loop', 'Japanese Peace Pagoda'],
        offbeatHighlights: ['Chunnu Summer Fall & Rock Garden', 'Happy Valley Tea Tasting'],
        overnightStay: 'Departure Day',
        mealsIncluded: 'Breakfast Included',
        details:
          'Witness the sunrise over the Himalayan range at Tiger Hill. Visit Batasia Loop Toy Train track and tea estate, followed by private chauffeur drop at NJP or Bagdogra Airport.',
      });
    }
  }

  return {
    title: `${params.destination || 'Sikkim & Darjeeling'} Custom Himalayan Tour (${params.duration || `${durationDays} Days`})`,
    duration: params.duration || `${durationDays} Days`,
    companions: params.companions || 'Couple / Family',
    interests: Array.isArray(params.interests)
      ? params.interests
      : ['Mountain Panoramas', 'Lakes & Waterfalls', 'Tea Gardens', 'Offbeat Viewpoints'],
    budgetTier: budget,
    estimatedCostPerPerson: `₹${costPerPersonNum.toLocaleString('en-IN')}`,
    totalEstimatedCost: `₹${totalCostNum.toLocaleString('en-IN')} (for ${travelers} travelers)`,
    vehicleRecommended: isNorthSikkimRequested
      ? 'Toyota Innova Crysta / Mahindra Scorpio 4x4 (Govt. North Sikkim Permit Approved)'
      : 'Toyota Innova Crysta / Luxury SUV',
    hasNorthSikkim: isNorthSikkimRequested,
    lachungMandatory2NightsApplied: isNorthSikkimRequested,
    overview: `A personalized, high-comfort tour package tailored for ${travelers} travelers covering breathtaking mountain passes, emerald alpine lakes, and serene offbeat valleys with private chauffeur and verified hotel stays.`,
    dayByDay,
    inclusions: [
      'Dedicated Toyota Innova Crysta / 4WD SUV Chauffeur throughout trip',
      `${params.vegMeals ? 'Pure Vegetarian / Jain' : 'Deluxe MAP Plan (Breakfast & Dinner)'} meals at boutique hotels`,
      'Sikkim Protected Area Permits (PAP) & Nathula Pass verification handling',
      'All fuel, toll tax, interstate entry fees, driver allowance, and luxury parking',
      '24×7 Local Gangtok HQ Concierge & Ground Emergency Support',
    ],
    permitsRequired: isNorthSikkimRequested
      ? ['North Sikkim Protected Area Permit (PAP)', 'Zero Point / Yumthang Inner Line Entry']
      : ['Tsomgo Lake & Baba Mandir Permit', 'Nathula Pass Indo-China Border Pass'],
  };
}
