import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { PopularDestinations } from './components/PopularDestinations';
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
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HostingerGuideModal } from './components/HostingerGuideModal';
import { OwnerDashboardModal, ConsoleTab } from './components/OwnerDashboardModal';
import { AIPlannerModal } from './components/AIPlannerModal';
import { PhotoEditorModal } from './components/PhotoEditorModal';
import { LegalPoliciesModal } from './components/LegalPoliciesModal';
import { AGENCY_DETAILS, TOUR_PACKAGES, CAB_OPTIONS, DEFAULT_SEO_SETTINGS } from './data/travelData';
import { INITIAL_HOTELS } from './data/initialStoreData';
import { CabOption, LeadSubmission, TourPackage, SeoSettings, HotelItem } from './types';
import { Phone, MapPin, Mail, ShieldCheck, Heart, FileText, Lock, AlertTriangle, CreditCard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [leads, setLeads] = useState<LeadSubmission[]>([]);

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
  const [isOwnerDashboardOpen, setIsOwnerDashboardOpen] = useState<boolean>(true);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState<boolean>(false);
  const [isPhotoEditorOpen, setIsPhotoEditorOpen] = useState<boolean>(false);
  const [photoEditorImage, setPhotoEditorImage] = useState<string>('');
  const [photoEditorTitle, setPhotoEditorTitle] = useState<string>('');

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
    fetch('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  const handleApplyPhotoToCab = (cabId: string, newPhotoUrl: string) => {
    const updated = cabs.map((cab) => (cab.id === cabId ? { ...cab, image: newPhotoUrl } : cab));
    setCabs(updated);
    localStorage.setItem('offbeat_cabs', JSON.stringify(updated));
    fetch('/api/admin/cabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(() => {});
  };

  // Fetch initial leads, packages, cabs from server
  useEffect(() => {
    fetch('/api/leads')
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

    fetch('/api/packages')
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

    fetch('/api/cabs')
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

    fetch('/api/hotels')
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

    fetch('/api/agency')
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

    fetch('/api/seo')
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
  }, [activeTab, packages, agencyDetails, seoSettings]);

  const handleSavePackages = (updatedPackages: TourPackage[]) => {
    setPackages(updatedPackages);
    localStorage.setItem('offbeat_packages', JSON.stringify(updatedPackages));
    fetch('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packages: updatedPackages }),
    }).catch((err) => console.error('Failed to post updated packages:', err));
  };

  const handleSaveCabs = (updatedCabs: CabOption[]) => {
    setCabs(updatedCabs);
    localStorage.setItem('offbeat_cabs', JSON.stringify(updatedCabs));
    fetch('/api/admin/cabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cabs: updatedCabs }),
    }).catch((err) => console.error('Failed to post updated cabs:', err));
  };

  const handleSaveAgencyDetails = (updatedAgency: any) => {
    setAgencyDetails(updatedAgency);
    localStorage.setItem('offbeat_agency', JSON.stringify(updatedAgency));
    fetch('/api/admin/agency', {
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
    fetch('/api/admin/reset-defaults', { method: 'POST' }).catch(() => {});
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
        {activeTab === 'home' && (
          <>
            {/* Hero Banner Section */}
            <Hero
              onOpenAIChat={() => handleOpenChatWithContext()}
              onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
              onSelectTab={setActiveTab}
            />

            {/* Trust Bar */}
            <TrustBar />

            {/* Popular Destinations Cards */}
            <PopularDestinations
              onSelectDestination={(destName) => handleOpenChatWithContext(`${destName} Packages`)}
              onOpenAIChat={(ctx) => handleOpenChatWithContext(ctx)}
            />

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
            <QuickPackages
              packages={packages}
              onSelectPackage={() => {}}
              onOpenAIChatWithPackage={(pkgTitle) => handleOpenChatWithContext(pkgTitle)}
              onOpenPhotoEditor={handleOpenPhotoEditor}
            />

            {/* Official Affiliated Hotels Banner */}
            <AffiliatedHotelsBanner
              onOpenAIChatWithHotel={(hotelName) => handleOpenChatWithContext(`Affiliated Hotel Inquiry: ${hotelName}`)}
            />

            {/* Time-Sensitive Seasonal Offers */}
            <SeasonalOffers
              onOpenAIChatWithOffer={(offerTitle) => handleOpenChatWithContext(`Offer: ${offerTitle}`)}
            />

            {/* Cab Rentals Preview */}
            <CabRental
              cabs={cabs}
              onOpenAIChatWithCab={(cabModel) => handleOpenChatWithContext(cabModel)}
              onApplyPhotoToCab={handleApplyPhotoToCab}
              onOpenPhotoEditor={handleOpenPhotoEditor}
            />

            {/* Photo & Video Showcase Gallery */}
            <MediaGallery
              onOpenAIChatWithContext={(ctx) => handleOpenChatWithContext(ctx)}
              onOpenPhotoEditor={handleOpenPhotoEditor}
            />

            {/* SEO Destination & Permit Guide Section */}
            <SeoDestinationGuide
              onOpenChatWithTopic={(topic) => handleOpenChatWithContext(topic)}
            />

            {/* Verified Customer Reviews Section */}
            <CustomerReviews />

            {/* FAQs Component */}
            <FAQSection />

            {/* Travel Preparation Checklist Component */}
            <TravelChecklist />

            {/* Interactive Office Location Map */}
            <AgencyLocationMap />

            {/* About Us Local Registration Preview */}
            <AboutUs />

            {/* Contact & Plan My Trip */}
            <ContactPlanTrip
              onLeadSubmitted={handleLeadCaptured}
              onOpenAIChat={() => handleOpenChatWithContext()}
            />
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
            />
          </>
        )}

        {(activeTab === 'hotels' || activeTab === 'jain-hotels') && (
          <AffiliatedHotelsBanner
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
      </main>

      {/* Footer */}
      <footer className="bg-[#071A2D] border-t border-[#E6E2D9]/20 text-slate-300 text-xs py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-[#FAF9F6] text-base tracking-tight">{AGENCY_DETAILS.name}</h3>
            <p className="text-slate-300 leading-relaxed font-sans">
              {AGENCY_DETAILS.tagline}. Government-registered travel company providing customized Sikkim, Darjeeling, and Bhutan tours.
            </p>
            <div className="space-y-1.5 font-sans">
              <span className="inline-flex items-center gap-1.5 text-[#D9BC7A] font-bold block">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                {AGENCY_DETAILS.govtRegistration}
              </span>
              <p className="text-[11px] text-slate-400">
                Lic No: {AGENCY_DETAILS.licenseNo} | Prop: {AGENCY_DETAILS.proprietor}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-[#FAF9F6] text-sm">Quick Links</h4>
            <ul className="space-y-2 font-sans">
              <li>
                <button onClick={() => setActiveTab('packages')} className="hover:text-[#D9BC7A] transition-colors">
                  5N/6D Sikkim & Darjeeling Package
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('packages')} className="hover:text-[#D9BC7A] transition-colors">
                  North Sikkim Zero Point Tours
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cabs')} className="hover:text-[#D9BC7A] transition-colors">
                  Innova Crysta NJP Pickup Rates
                </button>
              </li>
              <li>
                <button onClick={() => setIsHostingerGuideOpen(true)} className="hover:text-[#D9BC7A] transition-colors">
                  Hostinger Blueprint & Embed Code
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-bold text-[#FAF9F6] text-sm">Legal & Policies</h4>
            <ul className="space-y-2 font-sans">
              <li>
                <button
                  onClick={() => handleOpenLegalModal('privacy')}
                  className="hover:text-[#D9BC7A] flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenLegalModal('terms')}
                  className="hover:text-[#D9BC7A] flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenLegalModal('cancellation')}
                  className="hover:text-[#D9BC7A] flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Cancellation Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenLegalModal('payment')}
                  className="hover:text-[#D9BC7A] flex items-center gap-1.5 text-slate-300 transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>Payment Policy</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3 font-sans">
            <h4 className="font-serif font-bold text-[#FAF9F6] text-sm">Gangtok Office</h4>
            <p className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-[#C6A15B] flex-shrink-0 mt-0.5" />
              <span>{AGENCY_DETAILS.location}</span>
            </p>
            <p className="flex items-center gap-2 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-[#C6A15B] flex-shrink-0" />
              <span>{AGENCY_DETAILS.phonePrimary} / {AGENCY_DETAILS.phoneSecondary}</span>
            </p>
            <button
              onClick={() => setIsOwnerDashboardOpen(true)}
              className="mt-2 btn-luxury-outline-light text-xs !py-1.5 !px-3"
            >
              Leads Console
            </button>
          </div>
        </div>

        {/* SEO Keywords Cloud */}
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/10 space-y-2 font-sans">
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
                className="px-2 py-0.5 bg-[#0B1F3A] border border-white/10 rounded text-slate-300 hover:text-[#D9BC7A] transition-colors"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-[11px] text-slate-400 font-sans">
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
    </div>
  );
}
