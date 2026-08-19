export interface FAQItem {
  id: string;
  category: 'Permits' | 'Tour Packages' | 'Weather & Time' | 'Packing & Clothing' | 'Vehicles & Drivers' | 'Meals & Stays' | 'Booking & Policy';
  question: string;
  answer: string;
  keyTakeaway?: string;
}

export const SIKKIM_TOUR_FAQS: FAQItem[] = [
  {
    id: 'faq-permits-1',
    category: 'Permits',
    question: 'How do I get Restricted Area Permits (RAP) and Protected Area Permits (PAP) for Nathula Pass, Tsomgo Lake, and Zero Point?',
    answer: 'Nathula Pass, Baba Mandir, Tsomgo Lake (Changu Lake), and North Sikkim regions (Lachung, Lachen, Yumthang Valley, Zero Point 15,300 ft, Gurudongmar Lake) are protected border areas requiring official army and state civil aviation permits. OffbeatDestination Travels handles 100% of all permit procedures in Gangtok on your behalf at zero extra liaison fee. All you need to provide are 2 passport-size photographs and a clear government photo ID (Voter ID, Passport, or Driving License; Aadhaar is NOT accepted for Nathula Pass per Indian Army regulations).',
    keyTakeaway: 'Send digital document copies 24 hours before Gangtok arrival. We deliver printed hardcopy permits directly to your driver.'
  },
  {
    id: 'faq-permits-2',
    category: 'Permits',
    question: 'Are permits guaranteed for Nathula Pass and Zero Point? What happens during bad weather?',
    answer: 'Permits for Nathula Pass and North Sikkim are issued daily by the Sikkim Tourism & Civil Aviation Department and Indian Army checkposts based on border security clearance and road/weather conditions. In case of unexpected heavy snowfall, military convoys, or landslides, the army may restrict high-pass access for traveler safety. In such situations, our Gangtok operations desk coordinates alternative scenic circuits (such as Old Baba Mandir or Tukla Valley) or provides a transparent refund/credit for the permit surcharge.',
    keyTakeaway: 'Note: Nathula Pass remains closed on Mondays & Tuesdays for army protocol and road maintenance.'
  },
  {
    id: 'faq-permits-3',
    category: 'Permits',
    question: 'Can foreign nationals and OCI cardholders visit Nathula Pass and North Sikkim?',
    answer: 'Foreign tourists and OCI cardholders can freely explore Gangtok, Pelling, Ravangla, Yuksom, and Darjeeling with a standard Sikkim Inner Line Permit (ILP), which we assist in obtaining at Rangpo or Melli border checkposts. Foreign nationals can also visit Lachung, Yumthang Valley, and Dzongri/Goechala in groups of 2 or more with a registered local travel agency like OffbeatDestination Travels. However, Nathula Pass and Gurudongmar Lake are restricted exclusively to Indian citizens due to sensitive international border regulations.',
    keyTakeaway: 'Foreign nationals can enjoy Yumthang Valley & South/West Sikkim. Minimum group size of 2 persons required for North Sikkim.'
  },
  {
    id: 'faq-packages-1',
    category: 'Tour Packages',
    question: 'What is included in OffbeatDestination Travels Sikkim & Darjeeling tour packages?',
    answer: 'Our all-inclusive tour packages include: (1) Verified 3★, 4★ Deluxe or boutique heritage hotel accommodations with scenic mountain views; (2) Daily breakfast and dinner (MAP plan) tailored to your dietary choices (Pure Veg, Jain, or Non-Veg); (3) Dedicated private vehicle (Toyota Innova Crysta, Scorpio, or Sedan) with fuel, driver allowances, toll taxes, and parking fees; (4) Complete Sikkim Government & Army permit clearance; (5) 24/7 on-ground assistance from our Gangtok headquarters.',
    keyTakeaway: 'Zero hidden charges. Complete vehicle and accommodation arrangements handled seamlessly.'
  },
  {
    id: 'faq-packages-2',
    category: 'Tour Packages',
    question: 'Can tour packages be customized for couples, families, and senior citizens?',
    answer: 'Yes, 100%! Every itinerary on OffbeatDestination Travels is fully customizable. We specialize in relaxed honeymoon itineraries with luxury candle-light dinners and flower bed decorations, family tours with child-friendly pacing and spacious Innova Crystas, and senior citizen-friendly routes featuring ground-floor rooms, easy sightseeing spots, and minimal steep walking.',
    keyTakeaway: 'Talk to our Gangtok local coordinator via WhatsApp or phone to customize days, hotel tiers, and route pacing.'
  },
  {
    id: 'faq-packages-3',
    category: 'Tour Packages',
    question: 'How many days are ideal for a complete Sikkim & Darjeeling trip?',
    answer: 'For a balanced Himalayan experience, 5 Nights / 6 Days is the most popular duration covering Gangtok, Tsomgo Lake, Baba Mandir, and Darjeeling Tiger Hill. If you wish to include North Sikkim (Lachung, Yumthang Valley, Zero Point 15,300 ft), we recommend 6 Nights / 7 Days or 7 Nights / 8 Days. For the complete Grand Circuit including Pelling Glass Skywalk and West Sikkim heritage, an 8N/9D or 9N/10D itinerary is ideal.',
    keyTakeaway: '5N/6D for Gangtok + Darjeeling; 7N/8D for Gangtok + North Sikkim + Darjeeling; 9N/10D for Grand Sikkim.'
  },
  {
    id: 'faq-weather-1',
    category: 'Weather & Time',
    question: 'What is the best time and season to visit Sikkim and Darjeeling?',
    answer: 'Sikkim offers distinct seasonal beauty throughout the year: (1) Spring (March to May): Pleasant 15°C–22°C temperatures, blooming rhododendron sanctuaries in Yumthang, and clear mountain trails. (2) Autumn (October to mid-December): Crystal-clear azure skies with spectacular 180-degree views of Mt. Kanchenjunga. (3) Winter (January to February): Heavy snowfall in Yumthang Valley, Zero Point, and Tsomgo Lake for winter sports and snow enthusiasts.',
    keyTakeaway: 'March–May for blooming flora & pleasant weather; Oct–Dec for peak Kanchenjunga visibility; Jan–Feb for snow.'
  },
  {
    id: 'faq-weather-2',
    category: 'Weather & Time',
    question: 'Is it safe to travel to Sikkim and Darjeeling during the monsoon season (July to September)?',
    answer: 'Yes. While heavy rainfall occurs in lower foothills, major tourist centers like Gangtok, Pelling, Ravangla, and Namchi remain active and accessible with lush green waterfalls and tranquil misty valley scenery. Our experienced hill drivers monitor real-time Teesta Highway alerts and road clearance bulletins continuously. We deploy robust SUV vehicles (Innova Crysta / 4x4 Scorpios) for all monsoon departures.',
    keyTakeaway: 'We recommend keeping 1 buffer day for North Sikkim tours during peak monsoon.'
  },
  {
    id: 'faq-packing-1',
    category: 'Packing & Clothing',
    question: 'What clothing should I pack for high-altitude Zero Point (15,300 ft) and Nathula Pass (14,140 ft)?',
    answer: 'High-altitude Himalayan passes remain freezing even during summer months! We recommend the 3-layer rule: (1) Base Layer: Thermal inner top & bottoms; (2) Mid Layer: Fleece jacket or warm woolen sweater; (3) Outer Layer: Windproof and waterproof down feather jacket. Also carry woolen gloves, beanie/skull cap, thermal socks, and UV-protection polarized sunglasses. Heavy snow overcoats and rubber snow boots can also be rented locally at Tsomgo Lake and Yumthang Valley stalls for ₹100–₹150.',
    keyTakeaway: 'Dress in layers so you can adjust as altitude and temperatures change during mountain drives.'
  },
  {
    id: 'faq-packing-2',
    category: 'Packing & Clothing',
    question: 'What essential medicines and documents should I carry for a Sikkim trip?',
    answer: 'Carry: (1) Personal prescribed medicines; (2) Motion sickness tablets (like Avomine) for winding mountain roads; (3) Acetazolamide (Diamox) for high altitude acclimatization (consult your doctor); (4) Camphor sachets or portable oxygen cans for high altitude comfort; (5) 4 to 6 physical passport-sized photos per traveler; (6) Original Voter ID card or Passport + photocopies. Note: ATMs are scarce in North Sikkim and remote Silk Route villages, so carry adequate physical cash from Gangtok.',
    keyTakeaway: 'Carry original Voter ID/Passport + 6 physical passport photos. Withdraw sufficient cash in Gangtok.'
  },
  {
    id: 'faq-vehicles-1',
    category: 'Vehicles & Drivers',
    question: 'What cab options are available for NJP Railway Station and Bagdogra Airport (IXB) pickups?',
    answer: 'We maintain a premium fleet of commercial luxury Toyota Innova Crystas (6+1 captain seats), Mahindra Xylos / Scorpios, 4-seater Swift Dzire sedans, and Tempo Travellers (13–26 seaters). All vehicles are commercially registered tourist cabs equipped with high-altitude heating/AC, luggage carriers, and driven by verified, courteous local hill drivers with 8+ years of mountain highway experience.',
    keyTakeaway: 'All cab rates include driver allowance, fuel, toll taxes, parking charges, and inter-state permit fees.'
  },
  {
    id: 'faq-vehicles-2',
    category: 'Vehicles & Drivers',
    question: 'Is a private Innova Crysta recommended over smaller hatchbacks for North Sikkim?',
    answer: 'Yes, absolutely. The route from Gangtok to North Sikkim (Chungthang, Lachung, Lachen, Yumthang Valley, and Zero Point) involves rugged mountain terrain, rocky passes, and high elevation changes. Sturdy SUVs like Toyota Innova Crysta, Mahindra Xylo, or Scorpio provide superior ground clearance, independent suspension comfort, and robust power for a smooth and safe family ride.',
    keyTakeaway: 'SUVs are mandatory for North Sikkim & Zero Point routes to ensure safety and comfort on hill roads.'
  },
  {
    id: 'faq-meals-1',
    category: 'Meals & Stays',
    question: 'Do you provide Pure Vegetarian and strict Jain meals (no onion, no garlic, no root vegetables)?',
    answer: 'Yes, 100%! We take dietary requirements very seriously. We provide dedicated Pure Vegetarian and strict Jain meal arrangements (cooked without onion, garlic, potatoes, or root vegetables) across all our partner hotels in Gangtok, Pelling, and Darjeeling, as well as in remote high-altitude homestays in Lachung and Lachen. Partner hotel kitchens utilize separate cookware and fresh ingredients upon advance notice.',
    keyTakeaway: '100% guaranteed Jain and Pure Veg meal preparation. Simply inform our coordinator during booking.'
  },
  {
    id: 'faq-meals-2',
    category: 'Meals & Stays',
    question: 'What hotel categories and amenities are provided in tour packages?',
    answer: 'We offer three transparent hotel tiers: (1) Deluxe (Comfortable 3★ hotels with clean rooms, geysers, mountain views, and hearty buffet meals); (2) Premium 3★ (Centrally located boutique hotels near MG Marg or Mall Road with room heaters, modern bathrooms, and elevated amenities); (3) Luxury 4★ / Heritage (Premium resort properties like Mayfair, Summit, Udaan, and Elgin with luxury spa facilities, scenic balconies, and gourmet multi-cuisine dining).',
    keyTakeaway: 'All partner hotels are personally audited for hygiene, reliable 24/7 hot water geysers, and power backup.'
  },
  {
    id: 'faq-booking-1',
    category: 'Booking & Policy',
    question: 'How do I book a tour package with OffbeatDestination Travels, and what are the payment terms?',
    answer: 'Booking is simple, secure, and transparent: (1) Select your preferred package or get a custom itinerary quote via WhatsApp/Phone; (2) Pay a 25%–30% advance booking deposit to confirm hotel vouchers, vehicle reservation, and army permit processing; (3) Pay 50% upon arrival at Gangtok check-in; (4) Settle the remaining 20%–25% balance during the tour. We accept UPI, Net Banking, Credit/Debit Cards, and issue official GST-compliant invoices.',
    keyTakeaway: 'Govt. Registered Agency (Reg No. 1750/DoT&CAv/Gtk/25/TA). 100% safe payments and official GST invoices.'
  },
  {
    id: 'faq-booking-2',
    category: 'Booking & Policy',
    question: 'What is your cancellation and date rescheduling policy?',
    answer: 'We offer traveler-friendly cancellation and rescheduling terms: Cancellations made 21+ days prior to travel receive an 85% refund of the advance deposit; cancellations 10–20 days prior receive a 50% refund. In case of unexpected natural roadblocks or medical emergencies, we offer free date rescheduling (subject to hotel availability) or a credit voucher valid for 12 months with no penalty.',
    keyTakeaway: 'Flexible date changes and transparent cancellation policies designed for unpredictable mountain conditions.'
  }
];
