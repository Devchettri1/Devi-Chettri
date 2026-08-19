import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { PopularDestinations } from './components/PopularDestinations';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import type { ConsoleTab } from './components/OwnerDashboardModal';
import { Logo } from './components/Logo';
import { AGENCY_DETAILS, TOUR_PACKAGES, CAB_OPTIONS, DEFAULT_SEO_SETTINGS, SIKKIM_TOUR_FAQS } from './data/travelData';
import { INITIAL_HOTELS } from './data/initialStoreData';
import { CabOption, LeadSubmission, TourPackage, SeoSettings, HotelItem } from './types';
import { Phone, MapPin, Mail, ShieldCheck, Heart, FileText, Lock, AlertTriangle, CreditCard } from 'lucide-react';

import { SikkimWeatherWidget } from './components/SikkimWeatherWidget';
import { HimalayanTravelCalculator } from './components/HimalayanTravelCalculator';
import { ItemComparisonModal } from './components/ItemComparisonModal';
import { fetchWithRetry } from './utils/api';
import { useWhatsApp } from './utils/whatsAppContext';

import { CorporateGroupBanner } from './components/CorporateGroupBanner';
import { AIChatWidget } from './components/AIChatWidget';
import { QuickPackages } from './components/QuickPackages';
import { AffiliatedHotelsBanner } from './components/AffiliatedHotelsBanner';
import { SeasonalOffers } from './components/SeasonalOffers';
import { CabRental } from './components/CabRental';
import { MediaGallery } from './components/MediaGallery';
import { SeoDestinationGuide } from './components/SeoDestinationGuide';
import { CustomerReviews } from './components/CustomerReviews';
import { FAQSection } from './components/FAQSection';
import { TravelChecklist } from './components/TravelChecklist';
import { AgencyLocationMap } from './components/AgencyLocationMap';
import { AboutUs } from './components/AboutUs';
import { ContactPlanTrip } from './components/ContactPlanTrip';
import { HimalayanTravelBlog } from './components/HimalayanTravelBlog';

import { HostingerGuideModal } from './components/HostingerGuideModal';
import { OwnerDashboardModal } from './components/OwnerDashboardModal';
import { AIPlannerModal } from './components/AIPlannerModal';
import { PhotoEditorModal } from './components/PhotoEditorModal';
import { LegalPoliciesModal } from './components/LegalPoliciesModal';
import { MobileBottomNav } from './components/MobileBottomNav';

const SectionSkeleton = () => (
  <div className="w-full py-16 flex flex-col items-center justify-center space-y-3 bg-[#060B18]/50 min-h-[200px]">
    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    <span className="text-xs text-cyan-200/80 font-sans tracking-wide">Loading Offbeat Himalayan Experience...</span>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const { setPageContext } = useWhatsApp();

  // Dynamic context synchronization based on active navigation tab
  useEffect(() => {
    switch (activeTab) {
      case 'packages':
        setPageContext({
          type: 'package',
          title: 'Sikkim & Darjeeling Tour Packages',
          subtitle: '3N to 15N Curated Mountain Circuits & Group Discounts',
          location: 'Gangtok, North Sikkim, Silk Route & Darjeeling',
        });
        break;
      case 'cabs':
        setPageContext({
          type: 'cab',
          title: 'Toyota Innova Crysta & Himalayan Cabs',
          subtitle: 'Luxury Mountain Fleets & NJP/IXB Airport Pickup Tariff',
          location: 'Gangtok, North Sikkim & Darjeeling',
          vehicle: 'Toyota Innova Crysta',
        });
        break;
      case 'hotels':
        setPageContext({
          type: 'hotel',
          title: 'Affiliated Luxury Hotels & Mountain Resorts',
          subtitle: 'Mayfair, Summit, Udaan & Handpicked Boutique Stays',
          location: 'Gangtok, Pelling, Lachung & Darjeeling',
        });
        break;
      case 'jain-hotels':
        setPageContext({
          type: 'hotel',
          title: 'Pure Vegetarian & Jain Friendly Stays',
          subtitle: 'Dedicated Jain Kitchens & Pure Veg Meals in Sikkim',
          location: 'Sikkim & Darjeeling',
        });
        break;
      case 'offers':
        setPageContext({
          type: 'offer',
          title: 'Seasonal Tour Offers & Long Weekend Deals',
          subtitle: 'Monsoon, Autumn & Group Specials with Free Upgrades',
        });
        break;
      case 'reviews':
        setPageContext({
          type: 'general',
          title: 'Verified Customer Reviews & Feedback',
          subtitle: 'Direct Feedback on Drivers, Hotels & Sikkim Permits',
        });
        break;
      case 'faqs':
        setPageContext({
          type: 'general',
          title: 'Sikkim Travel FAQs & Permit Guidelines',
          subtitle: 'Nathula Pass, Zero Point, Weather & Best Time Guidance',
        });
        break;
      case 'checklist':
        setPageContext({
          type: 'general',
          title: 'High Altitude Packing & Preparation Checklist',
          subtitle: 'Essential Documents, Permits & Woolens Guide',
        });
        break;
      case 'location':
        setPageContext({
          type: 'general',
          title: 'OffbeatDestination Travels Gangtok Head Office',
          subtitle: 'Arithang Office Visit & Direct Permit Processing',
          location: 'Arithang, Gangtok, Sikkim',
        });
        break;
      case 'blog':
        setPageContext({
          type: 'general',
          title: 'Himalayan Travel Blog & Field Notes',
          subtitle: 'Authentic Local Stories, High Altitude Tips & Hidden Offbeat Gems',
          location: 'Sikkim & Eastern Himalayas',
        });
        break;
      case 'about':
        setPageContext({
          type: 'general',
          title: 'About OffbeatDestination Travels',
          subtitle: 'Govt. Registered Sikkim Tour Agency (Lic: W2309191340)',
        });
        break;
      case 'contact':
        setPageContext({
          type: 'general',
          title: 'Customized Tour Planning Consultation',
          subtitle: 'Direct 24/7 Operations Desk at Gangtok',
        });
        break;
      case 'home':
      default:
        setPageContext({
          type: 'general',
          title: 'Sikkim & Darjeeling Tour Planning',
          subtitle: 'Direct WhatsApp Concierge & Custom Quotes',
        });
        break;
    }
  }, [activeTab, setPageContext]);

  // IntersectionObserver for real-time section context detection on home page
  useEffect(() => {
    if (activeTab !== 'home') return;

    const sectionContextMap: Record<string, { title: string; subtitle?: string; type: any; location?: string }> = {
      'hero-section': {
        type: 'calculator',
        title: 'Custom Himalayan Tour & Cost Calculator',
        subtitle: 'Calculate 5N/6D Sikkim Itinerary & Instant Budget',
      },
      'popular-destinations-section': {
        type: 'package',
        title: 'Top Sikkim, Darjeeling & Bhutan Destinations',
        subtitle: 'Gangtok, North Sikkim, Pelling, Silk Route & Paro',
      },
      'calculator-section': {
        type: 'calculator',
        title: 'Himalayan Travel Calculator & Permit Checker',
        subtitle: 'Distance Matrix, Road Conditions & Nathula Pass Permits',
      },
      'ai-chat-section': {
        type: 'general',
        title: '24/7 AI Himalayan Advisor Consultation',
        subtitle: 'Itinerary Planning, Pure Veg Meals & Mountain Guidance',
      },
      'packages-section': {
        type: 'package',
        title: 'Sikkim & Darjeeling Holiday Tour Packages',
        subtitle: '5N/6D Grand Circuit & High Altitude North Sikkim',
      },
      'hotels-section': {
        type: 'hotel',
        title: 'Affiliated Luxury Hotels & Mountain Resorts',
        subtitle: 'Mayfair Spa, Summit, Udaan & Pure Veg Jain Stays',
      },
      'offers-section': {
        type: 'offer',
        title: 'Seasonal Tour Offers & Long Weekend Deals',
        subtitle: 'Monsoon, Autumn & Group Specials with Free Upgrades',
      },
      'cabs-section': {
        type: 'cab',
        title: 'Toyota Innova Crysta & Himalayan Cabs',
        subtitle: 'Luxury Mountain Fleets & NJP/IXB Airport Pickup Tariff',
      },
      'gallery-section': {
        type: 'general',
        title: 'Sikkim Sightseeing Photo & Video Gallery',
        subtitle: 'Gurudongmar, Zero Point, Tsomgo Lake & Darjeeling',
      },
      'blog-section': {
        type: 'general',
        title: 'Himalayan Travel Blog & Field Notes',
        subtitle: 'Stories, High Altitude Tips & Hidden Offbeat Gems',
        location: 'Sikkim & Himalayas',
      },
      'seo-guide-section': {
        type: 'general',
        title: 'Sikkim Travel Guides & Army Permits',
        subtitle: 'Nathula Pass, Baba Mandir & Zero Point Regulations',
      },
      'reviews-section': {
        type: 'general',
        title: 'Verified Customer Reviews & Feedback',
        subtitle: '5-Star Experiences with Sikkim Hill Chauffeurs',
      },
      'faq-section': {
        type: 'general',
        title: 'Sikkim Travel FAQs & High Altitude Permits',
        subtitle: 'Best Time to Visit, Permits & Road Conditions',
      },
      'checklist-section': {
        type: 'general',
        title: 'High Altitude Packing & Preparation Checklist',
        subtitle: 'Essential Documents, Permits & Woolens Guide',
      },
      'location-section': {
        type: 'general',
        title: 'OffbeatDestination Travels Gangtok Head Office',
        subtitle: 'Arithang Office Visit & Direct Permit Processing',
      },
      'contact-section': {
        type: 'general',
        title: 'Customized Tour Planning Consultation',
        subtitle: 'Direct 24/7 Operations Desk at Gangtok',
      },
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const highest = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          const targetId = highest.target.id;
          if (targetId && sectionContextMap[targetId]) {
            setPageContext(sectionContextMap[targetId]);
          }
        }
      },
      { threshold: [0.2, 0.5] }
    );

    const sectionIds = Object.keys(sectionContextMap);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeTab, setPageContext]);

  // Automatically scroll to top when active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Packages, Cabs, Agency state with localStorage fallback
  const [packages, setPackages] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('offbeat_packages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return TOUR_PACKAGES;
  });

  const [cabs, setCabs] = useState<CabOption[]>(() => {
    const saved = localStorage.getItem('offbeat_cabs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return CAB_OPTIONS;
  });

  const [hotels, setHotels] = useState<HotelItem[]>(() => {
    const saved = localStorage.getItem('offbeat_hotels');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_HOTELS;
  });

  const [agencyDetails, setAgencyDetails] = useState<any>(() => {
    const saved = localStorage.getItem('offbeat_agency');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return AGENCY_DETAILS;
  });

  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    const saved = localStorage.getItem('offbeat_seo');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_SEO_SETTINGS;
  });

  const [isHostingerGuideOpen, setIsHostingerGuideOpen] = useState<boolean>(false);
  const [ownerDashboardTab, setOwnerDashboardTab] = useState<ConsoleTab | undefined>('navigation');

  const handleOpenOwnerDashboard = (tab?: ConsoleTab) => {
    setOwnerDashboardTab(tab || 'navigation');
    setIsOwnerDashboardOpen(true);
  };
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState<boolean>(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState<boolean>(false);
  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState<boolean>(false);
  const [photoEditorImage, setPhotoEditorImage] = useState<string>('');
  const [photoEditorTitle, setPhotoEditorTitle] = useState<string>('');

  // Quick Booking State
  const [quickBookRoute, setQuickBookRoute] = useState<string>('5N/6D Sikkim & Darjeeling Grand Circuit');
  const [isQuickBookOpen, setIsQuickBookOpen] = useState<boolean>(false);

  // Comparison Modal State
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [compareType, setCompareType] = useState<'packages' | 'cabs'>('packages');

  const handleOpenComparison = (type: 'packages' | 'cabs') => {
    setCompareType(type);
    setIsCompareOpen(true);
  };

  const handleOpenQuickBook = (routeTitle?: string) => {
    if (routeTitle) {
      setQuickBookRoute(routeTitle);
    }
    setIsQuickBookOpen(true);
  };

  // Legal Modal State
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms' | 'cancellation' | 'payment'>('privacy');

  const handleOpenLegalModal = (tab: 'privacy' | 'terms' | 'cancellation' | 'payment') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleOpenPhotoEditor = (imageUrl?: string, title?: string) => {
    setPhotoEditorImage(imageUrl || '');
    setPhotoEditorTitle(title || '');
    setIsPhotoEditorOpen(true);
  };

  const handleApplyPhotoToPackage = (pkgId: string, newPhotoUrl: string) => {
    const updated = packages.map((pkg) => (pkg.id === pkgId ? { ...pkg, heroImage: newPhotoUrl } : pkg));
    setPackages(updated);
    localStorage.setItem('offbeat_packages', JSON.stringify(updated));
    fetchWithRetry('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const handleApplyPhotoToCab = (cabId: string, newPhotoUrl: string) => {
    const updated = cabs.map((cab) => (cab.id === cabId ? { ...cab, image: newPhotoUrl } : cab));
    setCabs(updated);
    localStorage.setItem('offbeat_cabs', JSON.stringify(updated));
    fetchWithRetry('/api/admin/cabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  // Fetch initial leads, packages, cabs from server with exponential backoff retry logic
  useEffect(() => {
    fetchWithRetry('/api/leads')
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setLeads(data);
        }
      })
      .catch((err) => console.error('Failed to load leads:', err));

    fetchWithRetry('/api/packages')
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPackages(data);
          localStorage.setItem('offbeat_packages', JSON.stringify(data));
        }
      })
      .catch(() => {});

    fetchWithRetry('/api/cabs')
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCabs(data);
          localStorage.setItem('offbeat_cabs', JSON.stringify(data));
        }
      })
      .catch(() => {});

    fetchWithRetry('/api/hotels')
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHotels(data);
          localStorage.setItem('offbeat_hotels', JSON.stringify(data));
        }
      })
      .catch(() => {});

    fetchWithRetry('/api/agency')
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data && typeof data === 'object' && data.name) {
          setAgencyDetails(data);
          localStorage.setItem('offbeat_agency', JSON.stringify(data));
        }
      })
      .catch(() => {});

    fetchWithRetry('/api/seo')
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        if (data && typeof data === 'object') {
          setSeoSettings(data);
          localStorage.setItem('offbeat_seo', JSON.stringify(data));
        }
      })
      .catch(() => {});

    if (window.location.pathname.includes('/admin') || window.location.hash.includes('admin')) {
      setIsOwnerDashboardOpen(true);
    }
  }, []);

  // Dynamic SEO meta tags & document title generation based on activeTab & seoSettings
  useEffect(() => {
    const pageSeo = seoSettings[activeTab] || DEFAULT_SEO_SETTINGS[activeTab] || DEFAULT_SEO_SETTINGS.home;
    const title = pageSeo.title || 'OffbeatDestination Travels - Official Sikkim & Darjeeling Tour Operator';
    const description =
      pageSeo.description ||
      'Book customizable 5N/6D Sikkim & Darjeeling tour packages, luxury Innova Crysta cab rentals, and North Sikkim Zero Point trips with Govt Registered Sikkim travel agency.';
    const keywords =
      pageSeo.keywords ||
      'Sikkim tour packages, Gangtok travel agency, Darjeeling tour, Nathula pass permit, Innova Crysta cab Sikkim';
    const canonicalUrl = pageSeo.canonicalUrl || `https://offbeatdestination.in/#${activeTab}`;

    document.title = title;

    const updateMetaTag = (nameAttr: string, attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameAttr, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', canonicalUrl);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    if (canonical) {
      canonical.setAttribute('href', `https://offbeatdestination.in/#${activeTab}`);
    }

    // Dynamic Breadcrumb Schema
    let breadcrumbScript = document.getElementById('json-ld-breadcrumb');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'json-ld-breadcrumb';
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://offbeatdestination.in',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: activeTab.toUpperCase(),
          item: `https://offbeatdestination.in/#${activeTab}`,
        },
      ],
    });

    // Dynamic Tour Packages Schema (TouristTrip & ItemList for search engine rich snippets)
    let packagesScript = document.getElementById('json-ld-tour-packages');
    if (!packagesScript) {
      packagesScript = document.createElement('script');
      packagesScript.id = 'json-ld-tour-packages';
      packagesScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(packagesScript);
    }

    const packageSchemaItems = packages.map((pkg, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'TouristTrip',
        '@id': `https://offbeatdestination.in/#package-${pkg.id}`,
        name: pkg.title,
        description: `${pkg.duration} holiday itinerary covering ${pkg.location}. Major highlights include ${pkg.highlights.join(', ')}.`,
        touristType: ['Families', 'Honeymooners', 'Couples', 'Group Explorers'],
        touristDestination: {
          '@type': 'TouristDestination',
          name: pkg.location,
        },
        subTrip: pkg.itinerary.map((day) => ({
          '@type': 'TouristTrip',
          name: `Day ${day.day}: ${day.title}`,
          description: day.description,
        })),
        itinerary: {
          '@type': 'ItemList',
          numberOfItems: pkg.itinerary.length,
          itemListElement: pkg.itinerary.map((day) => ({
            '@type': 'ListItem',
            position: day.day,
            name: `Day ${day.day}: ${day.title}`,
            description: day.description,
          })),
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: pkg.priceStarting,
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          url: `https://offbeatdestination.in/#packages`,
          seller: {
            '@type': 'TravelAgency',
            name: agencyDetails.name || AGENCY_DETAILS.name,
            telephone: agencyDetails.phonePrimary || AGENCY_DETAILS.phonePrimary,
            url: 'https://offbeatdestination.in',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Arithang',
              addressLocality: 'Gangtok',
              addressRegion: 'Sikkim',
              postalCode: '737102',
              addressCountry: 'IN',
            },
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: pkg.rating || 4.9,
          reviewCount: pkg.reviewsCount || 120,
          bestRating: 5,
          worstRating: 1,
        },
        provider: {
          '@type': 'TravelAgency',
          name: agencyDetails.name || AGENCY_DETAILS.name,
          telephone: agencyDetails.phonePrimary || AGENCY_DETAILS.phonePrimary,
          url: 'https://offbeatdestination.in',
        },
        image: pkg.heroImage.startsWith('http')
          ? pkg.heroImage
          : `https://offbeatdestination.in${pkg.heroImage}`,
      },
    }));

    packagesScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'OffbeatDestination Travels Sikkim & Darjeeling Holiday Tour Packages',
      description: 'Official list of customized tour packages for Sikkim, Darjeeling, North Sikkim, Silk Route, and Bhutan by OffbeatDestination Travels.',
      numberOfItems: packages.length,
      itemListElement: packageSchemaItems,
    });

    // Dynamic FAQPage Schema (Google Rich Results for all Sikkim & Darjeeling tour-related questions)
    let faqScript = document.getElementById('json-ld-faq-page');
    if (!faqScript) {
      faqScript = document.createElement('script');
      faqScript.id = 'json-ld-faq-page';
      faqScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(faqScript);
    }

    faqScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: SIKKIM_TOUR_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }, [activeTab, packages, agencyDetails, seoSettings]);

  const handleSavePackages = (updatedPackages: TourPackage[]) => {
    setPackages(updatedPackages);
    localStorage.setItem('offbeat_packages', JSON.stringify(updatedPackages));
    fetchWithRetry('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packages: updatedPackages }),
    }).catch((err) => console.error('Failed to post updated packages:', err));
  };

  const handleSaveCabs = (updatedCabs: CabOption[]) => {
    setCabs(updatedCabs);
    localStorage.setItem('offbeat_cabs', JSON.stringify(updatedCabs));
    fetchWithRetry('/api/admin/cabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cabs: updatedCabs }),
    }).catch((err) => console.error('Failed to post updated cabs:', err));
  };

  const handleSaveAgencyDetails = (updatedAgency: any) => {
    setAgencyDetails(updatedAgency);
    localStorage.setItem('offbeat_agency', JSON.stringify(updatedAgency));
    fetchWithRetry('/api/admin/agency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ agency: updatedAgency }),
    }).catch((err) => console.error('Failed to post updated agency details:', err));
  };

  const handleResetToDefaults = () => {
    localStorage.removeItem('offbeat_packages');
    localStorage.removeItem('offbeat_cabs');
    localStorage.removeItem('offbeat_agency');
    setPackages(TOUR_PACKAGES);
    setCabs(CAB_OPTIONS);
    setAgencyDetails(AGENCY_DETAILS);
    fetchWithRetry('/api/admin/reset-defaults', { method: 'POST' }).catch(() => {});
  };

  const handleLeadCaptured = (newLead: LeadSubmission) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: any) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  const handleOpenChatWithContext = (contextTitle?: string) => {
    setActiveTab('home');
    const chatElement = document.getElementById('ai-chat-section');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#17202A] flex flex-col font-sans antialiased relative overflow-x-hidden">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHostingerGuide={() => setIsHostingerGuideOpen(true)}
        onOpenOwnerDashboard={handleOpenOwnerDashboard}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onOpenPhotoEditor={() => handleOpenPhotoEditor()}
        leadsCount={leads.length}
        packages={packages}
        cabs={cabs}
        hotels={hotels}
        agencyDetails={agencyDetails}
        onOpenChatWithContext={handleOpenChatWithContext}
      />

      {/* Main Page View Renderer */}
      <main className="flex-1">
        <React.Suspense fallback={<SectionSkeleton />}>
          {activeTab === 'home' && (
          <>
            {/* Hero Banner Section */}
            <div id="hero-section">
              <Hero
                onOpenAIChat={() => handleOpenChatWithContext()}
                onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
                onSelectTab={setActiveTab}
              />
            </div>

            {/* Trust Bar */}
            <TrustBar />

            {/* Popular Destinations Cards */}
            <div id="popular-destinations-section">
              <PopularDestinations
                onSelectDestination={(destName) => handleOpenChatWithContext(`${destName} Packages`)}
                onOpenAIChat={(ctx) => handleOpenChatWithContext(ctx)}
              />
            </div>

            {/* Live Weather & Travel Tools Section */}
            <section id="calculator-section" className="py-8 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <SikkimWeatherWidget />
              <HimalayanTravelCalculator />
            </section>

            {/* Compare Bar Callout */}
            <section className="bg-[#071A2D] py-4 border-y border-[#C6A15B]/20 px-4 text-center">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
                <span className="text-amber-200 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Compare 5N/6D Sikkim Packages & Innova Cab Fleet Specs
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenComparison('packages')}
                    className="btn-luxury-outline-light text-xs !py-1 !px-3"
                  >
                    Compare Packages
                  </button>
                  <button
                    onClick={() => handleOpenComparison('cabs')}
                    className="btn-luxury-outline-light text-xs !py-1 !px-3"
                  >
                    Compare Cab Rentals
                  </button>
                </div>
              </div>
            </section>

            {/* Corporate & Group Tour High-Visibility Banner */}
            <CorporateGroupBanner
              onOpenInquiry={() => {
                const chatElement = document.getElementById('ai-chat-section');
                if (chatElement) {
                  chatElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* AI Sales Assistant Section */}
            <section id="ai-chat-section" className="py-12 px-4 bg-slate-950 border-y border-emerald-900/40">
              <div className="max-w-4xl mx-auto text-center mb-6 space-y-2">
                <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800 tracking-wider uppercase">
                  24/7 AI Himalayan Advisor
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                  Ask Anything to Offbeat AI Assistant
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                  Instant guidance on 5N/6D itineraries, Nathula & Zero Point permits, Innova Crysta cabs, and pure vegetarian meal plans.
                </p>
              </div>

              <AIChatWidget onLeadCaptured={handleLeadCaptured} />
            </section>

            {/* Quick Tour Packages Preview */}
            <div id="packages-section">
              <QuickPackages
                packages={packages}
                onSelectPackage={() => {}}
                onOpenAIChatWithPackage={(pkgTitle) => handleOpenChatWithContext(pkgTitle)}
                onOpenPhotoEditor={handleOpenPhotoEditor}
                onQuickBookPackage={handleOpenQuickBook}
              />
            </div>

            {/* Official Affiliated Hotels Banner */}
            <div id="hotels-section">
              <AffiliatedHotelsBanner
                onOpenAIChatWithHotel={(hotelName) => handleOpenChatWithContext(`Affiliated Hotel Inquiry: ${hotelName}`)}
              />
            </div>

            {/* Time-Sensitive Seasonal Offers */}
            <div id="offers-section">
              <SeasonalOffers
                onOpenAIChatWithOffer={(offerTitle) => handleOpenChatWithContext(`Offer: ${offerTitle}`)}
              />
            </div>

            {/* Cab Rentals Preview */}
            <div id="cabs-section">
              <CabRental
                cabs={cabs}
                onOpenAIChatWithCab={(cabModel) => handleOpenChatWithContext(cabModel)}
                onApplyPhotoToCab={handleApplyPhotoToCab}
                onOpenPhotoEditor={handleOpenPhotoEditor}
              />
            </div>

            {/* Photo & Video Showcase Gallery */}
            <div id="gallery-section">
              <MediaGallery
                onOpenAIChatWithContext={(ctx) => handleOpenChatWithContext(ctx)}
                onOpenPhotoEditor={handleOpenPhotoEditor}
              />
            </div>

            {/* Himalayan Travel Blog: Stories, Expert Tips & Hidden Gems */}
            <div id="blog-section">
              <HimalayanTravelBlog
                onOpenAIChatWithTopic={(topic) => handleOpenChatWithContext(`Blog Story: ${topic}`)}
              />
            </div>

            {/* SEO Destination & Permit Guide Section */}
            <div id="seo-guide-section">
              <SeoDestinationGuide
                onOpenChatWithTopic={(topic) => handleOpenChatWithContext(topic)}
              />
            </div>

            {/* Verified Customer Reviews Section */}
            <div id="reviews-section">
              <CustomerReviews />
            </div>

            {/* FAQs Component */}
            <div id="faq-section">
              <FAQSection />
            </div>

            {/* Travel Preparation Checklist Component */}
            <div id="checklist-section">
              <TravelChecklist />
            </div>

            {/* Interactive Office Location Map */}
            <div id="location-section">
              <AgencyLocationMap />
            </div>

            {/* About Us Local Registration Preview */}
            <div id="about-section">
              <AboutUs />
            </div>

            {/* Contact & Plan My Trip */}
            <div id="contact-section">
              <ContactPlanTrip
                onLeadSubmitted={handleLeadCaptured}
                onOpenAIChat={() => handleOpenChatWithContext()}
              />
            </div>
          </>
        )}

        {activeTab === 'packages' && (
          <>
            <CorporateGroupBanner
              onOpenInquiry={() => {
                handleOpenChatWithContext('Corporate Group Tour Package');
              }}
            />
            <QuickPackages
              packages={packages}
              onSelectPackage={() => {}}
              onOpenAIChatWithPackage={(pkgTitle) => handleOpenChatWithContext(pkgTitle)}
              onOpenPhotoEditor={handleOpenPhotoEditor}
              onQuickBookPackage={handleOpenQuickBook}
              showAllByDefault={true}
            />
          </>
        )}

        {(activeTab === 'hotels' || activeTab === 'jain-hotels') && (
          <AffiliatedHotelsBanner
            initialCategory={activeTab === 'jain-hotels' ? 'jain' : 'all'}
            initialChainId={activeTab === 'jain-hotels' ? 'partner-jain-group' : 'all'}
            onOpenAIChatWithHotel={(hotelName) => handleOpenChatWithContext(`Affiliated Hotel Inquiry: ${hotelName}`)}
          />
        )}

        {activeTab === 'offers' && (
          <SeasonalOffers
            onOpenAIChatWithOffer={(offerTitle) => handleOpenChatWithContext(`Offer: ${offerTitle}`)}
          />
        )}

        {activeTab === 'cabs' && (
          <CabRental
            cabs={cabs}
            onOpenAIChatWithCab={(cabModel) => handleOpenChatWithContext(cabModel)}
            onApplyPhotoToCab={handleApplyPhotoToCab}
            onOpenPhotoEditor={handleOpenPhotoEditor}
          />
        )}

        {activeTab === 'gallery' && (
          <MediaGallery
            onOpenAIChatWithContext={(ctx) => handleOpenChatWithContext(ctx)}
            onOpenPhotoEditor={handleOpenPhotoEditor}
          />
        )}

        {activeTab === 'blog' && (
          <HimalayanTravelBlog
            onOpenAIChatWithTopic={(topic) => handleOpenChatWithContext(`Blog Story: ${topic}`)}
          />
        )}

        {activeTab === 'reviews' && <CustomerReviews />}

        {activeTab === 'faqs' && <FAQSection />}

        {activeTab === 'checklist' && <TravelChecklist />}

        {activeTab === 'location' && <AgencyLocationMap />}

        {activeTab === 'about' && <AboutUs />}

        {activeTab === 'contact' && (
          <ContactPlanTrip
            onLeadSubmitted={handleLeadCaptured}
            onOpenAIChat={() => handleOpenChatWithContext()}
          />
        )}
        </React.Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-[#060B18] border-t border-slate-800 text-slate-300 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="cursor-pointer" onClick={() => setActiveTab('home')}>
              <Logo variant="light" size="md" />
            </div>
            <p className="text-slate-300 leading-relaxed font-sans pt-1">
              Government-registered travel company providing customized Sikkim, Darjeeling, and Bhutan tours with dedicated cab rentals & hotel bookings.
            </p>
            <div className="space-y-1.5 font-sans">
              <span className="inline-flex items-center gap-1.5 text-cyan-300 font-bold block">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                {AGENCY_DETAILS.govtRegistration}
              </span>
              <p className="text-[11px] text-slate-400">
                Lic No: {AGENCY_DETAILS.licenseNo} | Prop: {AGENCY_DETAILS.proprietor}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-white text-sm">Quick Links</h4>
            <ul className="space-y-2 font-sans">
              <li>
                <button onClick={() => setActiveTab('blog')} className="hover:text-[#D6B36A] text-[#D6B36A] font-semibold transition-colors flex items-center gap-1.5">
                  <span>🏔️ Himalayan Travel Blog</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('packages')} className="hover:text-cyan-300 transition-colors">
                  5N/6D Sikkim & Darjeeling Package
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('packages')} className="hover:text-cyan-300 transition-colors">
                  North Sikkim Zero Point Tours
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cabs')} className="hover:text-cyan-300 transition-colors">
                  Innova Crysta NJP Pickup Rates
                </button>
              </li>
              <li>
                <button onClick={() => setIsHostingerGuideOpen(true)} className="hover:text-cyan-300 transition-colors">
                  Hostinger Blueprint & Embed Code
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-white text-sm">Legal & Policies</h4>
            <ul className="space-y-2 font-sans">
              <li>
                <button
                  onClick={() => handleOpenLegalModal('privacy')}
                  className="hover:text-cyan-300 flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenLegalModal('terms')}
                  className="hover:text-cyan-300 flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenLegalModal('cancellation')}
                  className="hover:text-cyan-300 flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Cancellation Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenLegalModal('payment')}
                  className="hover:text-cyan-300 flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Payment Policy</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3 font-sans">
            <h4 className="font-serif font-bold text-white text-sm">Gangtok Office</h4>
            <p className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{AGENCY_DETAILS.location}</span>
            </p>
            <p className="flex items-center gap-2 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{AGENCY_DETAILS.phonePrimary} / {AGENCY_DETAILS.phoneSecondary}</span>
            </p>
            <button
              onClick={() => setIsOwnerDashboardOpen(true)}
              className="mt-2 btn-luxury-outline text-xs !py-1.5 !px-3"
            >
              Leads Console
            </button>
          </div>
        </div>

        {/* SEO Keywords Cloud */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 space-y-2 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Popular Sikkim & Darjeeling Circuits:
          </span>
          <div className="flex flex-wrap gap-1.5 text-[10px] text-slate-400">
            {[
              'Gangtok Travel Agency',
              'Sikkim Tour Packages 5N/6D',
              'Arithang Gangtok Office',
              'Nathula Pass Army Permit',
              'North Sikkim Zero Point 15,300ft',
              'Yumthang Valley of Flowers',
              'Innova Crysta Rental Gangtok',
              'Bagdogra IXB Airport Pickup',
              'NJP Railway Station Cabs',
              'Pelling Glass Skywalk',
              'Ravangla Buddha Park',
              'Darjeeling Tiger Hill Sunrise',
              'Bhutan Cultural Tour Packages',
              'Pure Veg & Jain Meals Sikkim',
            ].map((kw, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-[#0A1128] border border-slate-800 rounded text-slate-300 hover:text-cyan-300 transition-colors"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6 pt-6 border-t border-slate-800 flex flex-wrap justify-between items-center gap-4 text-[11px] text-slate-400 font-sans">
          <p>© {new Date().getFullYear()} {AGENCY_DETAILS.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted for Sikkim & Himalayan Mountain Explorers
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp
        onOpenAIChat={() => handleOpenChatWithContext()}
        onLeadCaptured={handleLeadCaptured}
        initialRoute={quickBookRoute}
        isOpenOverride={isQuickBookOpen ? true : undefined}
        onCloseOverride={() => setIsQuickBookOpen(false)}
      />

      {/* Mobile Bottom Navigation matching screenshot */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onOpenAllPackages={() => {
          setActiveTab('packages');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      {isHostingerGuideOpen && (
        <HostingerGuideModal onClose={() => setIsHostingerGuideOpen(false)} />
      )}

        {isOwnerDashboardOpen && (
          <OwnerDashboardModal
            leads={leads}
            packages={packages}
            cabs={cabs}
            agencyDetails={agencyDetails}
            seoSettings={seoSettings}
            initialTab={ownerDashboardTab}
            onClose={() => setIsOwnerDashboardOpen(false)}
            onUpdateStatus={handleUpdateLeadStatus}
            onSavePackages={handleSavePackages}
            onSaveCabs={handleSaveCabs}
            onSaveAgencyDetails={handleSaveAgencyDetails}
            onSaveSeoSettings={(updatedSeo) => {
              setSeoSettings(updatedSeo);
              localStorage.setItem('offbeat_seo', JSON.stringify(updatedSeo));
            }}
            onResetToDefaults={handleResetToDefaults}
          />
        )}

        {isAIPlannerOpen && (
          <AIPlannerModal
            onClose={() => setIsAIPlannerOpen(false)}
            onLeadCaptured={handleLeadCaptured}
          />
        )}

        {isPhotoEditorOpen && (
          <PhotoEditorModal
            initialImageUrl={photoEditorImage}
            initialTitle={photoEditorTitle}
            onClose={() => setIsPhotoEditorOpen(false)}
            onApplyPhotoToPackage={handleApplyPhotoToPackage}
            onApplyPhotoToCab={handleApplyPhotoToCab}
          />
        )}

        {isLegalModalOpen && (
          <LegalPoliciesModal
            initialTab={legalModalTab}
            onClose={() => setIsLegalModalOpen(false)}
          />
        )}

        {isCompareOpen && (
          <ItemComparisonModal
            type={compareType}
            packages={packages}
            cabs={cabs}
            onClose={() => setIsCompareOpen(false)}
            onSelectForBooking={(title) => handleOpenChatWithContext(title)}
          />
        )}
    </div>
  );
}
