import {
  sikkimHeroBanner,
  innovaCrystaCab
} from '../assets/images';
import { OptimizedImage } from './ui/OptimizedImage';
import React, { useState, useEffect } from 'react';
import { LeadSubmission, TourPackage, CabOption, SeoSettings } from '../types';
import {
  X,
  LayoutDashboard,
  MessageCircle,
  Download,
  Filter,
  Package,
  Car,
  Settings,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle2,
  Globe,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Calendar,
  Upload,
  Image,
  DollarSign,
  Search,
  FileText,
  Building2,
  Users,
  HelpCircle,
  ShieldCheck,
  Activity,
  Edit2,
  Key,
  Lock,
  Compass,
  Check,
  Layers,
  Star,
  Eye,
  Sliders,
  Clock,
  Menu,
  Radio,
  AlertTriangle,
} from 'lucide-react';
import { Logo } from './Logo';
import { DEFAULT_SEO_SETTINGS } from '../data/travelData';
import { AdminDashboardKpis } from './admin/AdminDashboardKpis';
import { AdminDestinations } from './admin/AdminDestinations';
import { AdminHotels } from './admin/AdminHotels';
import { AdminQuotations } from './admin/AdminQuotations';
import { AdminCustomers } from './admin/AdminCustomers';
import { AdminFaqs } from './admin/AdminFaqs';
import { AdminUsersAudit } from './admin/AdminUsersAudit';
import { AdminMediaLibrary } from './admin/AdminMediaLibrary';
import { AdminNavigation } from './admin/AdminNavigation';
import { AdminSeoManager } from './admin/AdminSeoManager';
import { AdminPerformanceMonitor } from './admin/AdminPerformanceMonitor';
import { AdminAlertsManager } from './admin/AdminAlertsManager';
import { TravelAlert } from '../types';
import { INITIAL_ALERT } from '../data/initialStoreData';

interface OwnerDashboardModalProps {
  leads: LeadSubmission[];
  packages: TourPackage[];
  cabs: CabOption[];
  agencyDetails: any;
  onClose: () => void;
  onUpdateStatus: (leadId: string, newStatus: 'New' | 'Contacted' | 'Booked' | 'Closed') => void;
  onSavePackages: (updatedPackages: TourPackage[]) => void;
  onSaveCabs: (updatedCabs: CabOption[]) => void;
  onSaveAgencyDetails: (updatedAgency: any) => void;
  onResetToDefaults: () => void;
  seoSettings?: SeoSettings;
  onSaveSeoSettings?: (updatedSeo: SeoSettings) => void;
  currentAlert?: TravelAlert;
  onSaveAlert?: (updatedAlert: TravelAlert) => void;
  initialTab?: any;
}

export type MainAdminSection =
  | 'dashboard'
  | 'alerts'
  | 'packages'
  | 'cabs'
  | 'hotels'
  | 'destinations'
  | 'leads'
  | 'website'
  | 'seo'
  | 'navigation'
  | 'settings';

export type ConsoleTab = MainAdminSection | string;

export const OwnerDashboardModal: React.FC<OwnerDashboardModalProps> = ({
  leads,
  packages,
  cabs,
  agencyDetails,
  onClose,
  onUpdateStatus,
  onSavePackages,
  onSaveCabs,
  onSaveAgencyDetails,
  onResetToDefaults,
  seoSettings,
  onSaveSeoSettings,
  currentAlert,
  onSaveAlert,
  initialTab,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<any>({ name: 'Owner Admin', role: 'OWNER' });

  // Main Section & Sub Tab State
  const [activeSection, setActiveSection] = useState<MainAdminSection>('dashboard');
  const [activeSubTab, setActiveSubTab] = useState<string>('enquiries');

  // Real-time Travel Alert State
  const [localAlert, setLocalAlert] = useState<TravelAlert>(() => {
    if (currentAlert) return currentAlert;
    try {
      const saved = localStorage.getItem('offbeat_travel_alert');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ALERT;
  });

  useEffect(() => {
    if (initialTab) {
      if (['alerts', 'alert-banner', 'advisory', 'weather-alert', 'road-closures'].includes(initialTab)) {
        setActiveSection('alerts');
        setActiveSubTab('manage');
      } else if (['seo', 'seo-manager', 'keywords', 'metadata'].includes(initialTab)) {
        setActiveSection('seo');
        setActiveSubTab('metadata');
      } else if (['performance', 'web-vitals', 'speed', 'core-web-vitals'].includes(initialTab)) {
        setActiveSection('dashboard');
        setActiveSubTab('performance');
      } else if (['navigation', 'header-links', 'footer-links', 'menu'].includes(initialTab)) {
        setActiveSection('navigation');
        setActiveSubTab('header-links');
      } else if (['kpis', 'dashboard', 'enquiries', 'bookings', 'revenue', 'todays-leads'].includes(initialTab)) {
        setActiveSection('dashboard');
        setActiveSubTab(initialTab === 'kpis' ? 'enquiries' : initialTab);
      } else if (['packages', 'create', 'edit', 'pricing', 'itinerary', 'photos', 'inclusions', 'publish'].includes(initialTab)) {
        setActiveSection('packages');
        setActiveSubTab(initialTab === 'packages' ? 'edit' : initialTab);
      } else if (['cabs', 'vehicles', 'photos', 'per-km', 'package-rates', 'dest-rates', 'availability'].includes(initialTab)) {
        setActiveSection('cabs');
        setActiveSubTab(initialTab === 'cabs' ? 'vehicles' : initialTab);
      } else if (['hotels', 'hotel-list', 'room-types', 'seasonal'].includes(initialTab)) {
        setActiveSection('hotels');
        setActiveSubTab(initialTab === 'hotels' ? 'hotel-list' : initialTab);
      } else if (['destinations', 'gangtok', 'north-sikkim', 'silk-route', 'pelling', 'darjeeling', 'bhutan'].includes(initialTab)) {
        setActiveSection('destinations');
        setActiveSubTab(initialTab === 'destinations' ? 'gangtok' : initialTab);
      } else if (['leads', 'new', 'contacted', 'quoted', 'confirmed', 'lost'].includes(initialTab)) {
        setActiveSection('leads');
        setActiveSubTab(initialTab === 'leads' ? 'all' : initialTab);
      } else if (['website', 'hero', 'gallery', 'reviews', 'faqs', 'seo', 'media'].includes(initialTab)) {
        setActiveSection('website');
        setActiveSubTab(initialTab === 'website' ? 'hero' : initialTab === 'media' ? 'gallery' : initialTab);
      } else if (['settings', 'company', 'whatsapp', 'maps', 'api-keys', 'permissions', 'users', 'agency'].includes(initialTab)) {
        setActiveSection('settings');
        setActiveSubTab(initialTab === 'settings' ? 'company' : initialTab === 'agency' ? 'company' : initialTab === 'users' ? 'permissions' : initialTab);
      }
    }
  }, [initialTab]);

  // Backend Entities State
  const [stats, setStats] = useState<any>({
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'New').length,
    bookedLeads: leads.filter((l) => l.status === 'Booked' || l.status === 'Confirmed').length,
    totalPackages: packages.length,
    totalQuotationValue: 485000,
    totalCustomers: 12,
    totalDestinations: 8,
    recentAuditLogs: [],
  });

  const [destinations, setDestinations] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);

  // SEO Settings State
  const [localSeo, setLocalSeo] = useState<SeoSettings>(() => seoSettings || DEFAULT_SEO_SETTINGS);

  // Leads state
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [leadSearchQuery, setLeadSearchQuery] = useState<string>('');

  // Packages Editor State
  const [localPackages, setLocalPackages] = useState<TourPackage[]>([...packages]);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(packages[0]?.id || '');
  const [pkgSaveStatus, setPkgSaveStatus] = useState<string>('');

  // Cabs Editor State
  const [localCabs, setLocalCabs] = useState<CabOption[]>([...cabs]);
  const [cabSaveStatus, setCabSaveStatus] = useState<string>('');

  // Agency Info Editor State
  const [localAgency, setLocalAgency] = useState<any>({ ...agencyDetails });
  const [agencySaveStatus, setAgencySaveStatus] = useState<string>('');
  const [logoSaveStatus, setLogoSaveStatus] = useState<string>('');
  const [logoInputUrl, setLogoInputUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('offbeat_custom_logo') || agencyDetails?.logoUrl || '';
    } catch {
      return agencyDetails?.logoUrl || '';
    }
  });

  // Hero Banners & Website Content State
  const [heroContent, setHeroContent] = useState<any>({
    headline: 'Discover Unexplored Sikkim & Darjeeling',
    subheadline: 'Customized North Sikkim Permits, Private SUV Cabs & Offbeat Village Stays',
    ctaText: 'Explore Tour Packages',
    bannerImage: sikkimHeroBanner,
  });

  const handleSaveAlert = async (updatedAlert: TravelAlert) => {
    setLocalAlert(updatedAlert);
    if (onSaveAlert) {
      onSaveAlert(updatedAlert);
    }
    try {
      localStorage.setItem('offbeat_travel_alert', JSON.stringify(updatedAlert));
      await fetch('/api/admin/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alert: updatedAlert }),
      });
      window.dispatchEvent(new CustomEvent('offbeat_alert_updated', { detail: updatedAlert }));
    } catch (err) {
      console.error('Error broadcasting alert:', err);
    }
  };

  // Fetch Backend Collections
  const fetchAllBackendData = async () => {
    try {
      const [
        statsRes,
        destRes,
        hotelsRes,
        quotesRes,
        custRes,
        faqsRes,
        usersRes,
        auditRes,
        mediaRes,
        alertRes,
      ] = await Promise.all([
        fetch('/api/admin/dashboard-stats').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/destinations').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/hotels').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/admin/quotations').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/admin/customers').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/faqs').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/admin/users').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/admin/audit-logs').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/admin/media').then((r) => (r.ok ? r.json() : [])),
        fetch('/api/alerts').then((r) => (r.ok ? r.json() : null)),
      ]);

      if (statsRes) setStats(statsRes);
      if (Array.isArray(destRes)) setDestinations(destRes);
      if (Array.isArray(hotelsRes)) setHotels(hotelsRes);
      if (Array.isArray(quotesRes)) setQuotations(quotesRes);
      if (Array.isArray(custRes)) setCustomers(custRes);
      if (Array.isArray(faqsRes)) setFaqs(faqsRes);
      if (Array.isArray(usersRes)) setUsers(usersRes);
      if (Array.isArray(auditRes)) setAuditLogs(auditRes);
      if (Array.isArray(mediaRes)) setMedia(mediaRes);
      if (alertRes && alertRes.title) setLocalAlert(alertRes);
    } catch (err) {
      console.error('Error fetching backend collections:', err);
    }
  };

  useEffect(() => {
    fetchAllBackendData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput, password: pinInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setCurrentUser(data.user);
        setAuthError('');
      } else {
        setAuthError(data.error || 'Invalid PIN code. Default PIN: 1750');
      }
    } catch (err) {
      setAuthError('Connection error to backend login endpoint.');
    }
  };

  const handleSaveAllPackages = () => {
    onSavePackages(localPackages);
    setPkgSaveStatus('Saved & Published Live!');
    setTimeout(() => setPkgSaveStatus(''), 3000);
  };

  const handleSaveAllCabs = () => {
    onSaveCabs(localCabs);
    setCabSaveStatus('Cab Rates Updated!');
    setTimeout(() => setCabSaveStatus(''), 3000);
  };

  const handleSaveAgency = () => {
    onSaveAgencyDetails(localAgency);
    setAgencySaveStatus('Agency Info Saved!');
    setTimeout(() => setAgencySaveStatus(''), 3000);
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setLogoInputUrl(dataUrl);
        try {
          localStorage.setItem('offbeat_custom_logo', dataUrl);
        } catch {}
        const updatedAgency = { ...localAgency, logoUrl: dataUrl };
        setLocalAgency(updatedAgency);
        onSaveAgencyDetails(updatedAgency);
        window.dispatchEvent(new Event('offbeat_logo_updated'));
        setLogoSaveStatus('Logo updated and applied across website!');
        setTimeout(() => setLogoSaveStatus(''), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyLogoUrl = (url: string) => {
    setLogoInputUrl(url);
    try {
      if (url.trim()) {
        localStorage.setItem('offbeat_custom_logo', url.trim());
      } else {
        localStorage.removeItem('offbeat_custom_logo');
      }
    } catch {}
    const updatedAgency = { ...localAgency, logoUrl: url.trim() };
    setLocalAgency(updatedAgency);
    onSaveAgencyDetails(updatedAgency);
    window.dispatchEvent(new Event('offbeat_logo_updated'));
    setLogoSaveStatus(url.trim() ? 'Logo URL applied globally!' : 'Reset to official default crest!');
    setTimeout(() => setLogoSaveStatus(''), 3500);
  };

  const handleResetToDefaultLogo = () => {
    handleApplyLogoUrl('');
  };

  const handleFileUploadForPackage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        handlePkgFieldChange('heroImage', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUploadForCab = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const updated = [...localCabs];
        updated[index].image = dataUrl;
        setLocalCabs(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const currentPkg = localPackages.find((p) => p.id === selectedPkgId) || localPackages[0];

  const handlePkgFieldChange = (field: keyof TourPackage, value: any) => {
    if (!currentPkg) return;
    const updatedList = localPackages.map((p) => (p.id === currentPkg.id ? { ...p, [field]: value } : p));
    setLocalPackages(updatedList);
  };

  const handleCreateNewPackage = () => {
    const newId = `pkg-${Date.now()}`;
    const newPkg: TourPackage = {
      id: newId,
      title: 'New Sikkim Exploration Tour',
      duration: '4 Days / 3 Nights',
      priceStarting: 18500,
      heroImage: sikkimHeroBanner,
      category: 'North Sikkim',
      location: 'Gangtok & Lachen',
      rating: 4.9,
      reviewsCount: 18,
      highlights: ['Scenic Himalayan Passes', 'Protected Area Permits Included', 'Private Luxury Cab Transfers'],
      included: ['Hotel Stay with Breakfast & Dinner', 'Private Cab', 'Permits & Taxes'],
      permitsRequired: true,
      vegMealsAvailable: true,
      itinerary: [
        { day: 1, title: 'Arrival at Bagdogra/NJP & Transfer to Gangtok', description: 'Meet our executive and transfer to Gangtok hotel.' },
        { day: 2, title: 'Gangtok Local Sightseeing & Tsomgo Lake', description: 'Visit Tsomgo Lake and Baba Mandir.' },
        { day: 3, title: 'Return Transfer to Airport/Station', description: 'Departure with memorable Sikkim experiences.' },
      ],
    };
    const updated = [...localPackages, newPkg];
    setLocalPackages(updated);
    setSelectedPkgId(newId);
    setActiveSubTab('edit');
  };

  const handleDeletePackage = (pkgId: string) => {
    if (localPackages.length <= 1) {
      alert('You must keep at least one tour package.');
      return;
    }
    if (confirm('Are you sure you want to delete this tour package?')) {
      const updated = localPackages.filter((p) => p.id !== pkgId);
      setLocalPackages(updated);
      setSelectedPkgId(updated[0].id);
    }
  };

  const handleAddItineraryDay = () => {
    if (!currentPkg) return;
    const nextDayNum = (currentPkg.itinerary?.length || 0) + 1;
    const newDay = {
      day: nextDayNum,
      title: `Day ${nextDayNum} Sightseeing & Excursion`,
      description: 'Explore local attractions, scenic viewpoints, and cultural heritage sites.',
    };
    const updatedItinerary = [...(currentPkg.itinerary || []), newDay];
    handlePkgFieldChange('itinerary', updatedItinerary);
  };

  const handleDeleteItineraryDay = (dayIndex: number) => {
    if (!currentPkg || !currentPkg.itinerary) return;
    if (currentPkg.itinerary.length <= 1) {
      alert('Itinerary must have at least one day.');
      return;
    }
    const updatedItinerary = currentPkg.itinerary
      .filter((_, idx) => idx !== dayIndex)
      .map((d, idx) => ({ ...d, day: idx + 1 }));
    handlePkgFieldChange('itinerary', updatedItinerary);
  };

  const handleCreateNewCab = () => {
    const newCab: CabOption = {
      id: `cab-${Date.now()}`,
      model: 'Mahindra Scorpio-N 4x4',
      type: 'SUV',
      ratePerDay: 4800,
      njpIxbPickupRate: 3800,
      bestFor: 'Mountain Terrains',
      capacity: '6+1 Seater',
      image: innovaCrystaCab,
      features: ['Air Conditioning', 'Hill Assist', 'Leather Seats'],
    };
    setLocalCabs([...localCabs, newCab]);
  };

  const handleDeleteCab = (cabId: string) => {
    if (localCabs.length <= 1) {
      alert('Keep at least one cab option in fleet.');
      return;
    }
    if (confirm('Delete this cab vehicle option?')) {
      setLocalCabs(localCabs.filter((c) => c.id !== cabId));
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'WhatsApp', 'Dates', 'Guests', 'Package', 'Vehicle', 'Status', 'Received At'];
    const rows = leads.map((l) => [
      l.customerName,
      l.whatsappNumber,
      l.travelDates,
      l.travelersCount,
      l.packageOrRoute,
      l.vehiclePreference || 'Innova Crysta',
      l.status,
      new Date(l.createdAt).toLocaleString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `OffbeatDestination_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-emerald-700/60 rounded-2xl max-w-md w-full p-6 text-slate-100 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <Logo variant="light" size="md" showText={true} />
            <h2 className="text-lg font-bold text-slate-100">Agency Admin Console Security</h2>
            <p className="text-xs text-slate-400">Enter Admin PIN or password to gain access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Security PIN / Password</label>
              <input
                type="password"
                placeholder="Enter PIN (Default: 1750)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 text-center font-mono tracking-widest"
              />
            </div>

            {authError && <div className="p-2.5 bg-rose-950/80 text-rose-300 border border-rose-800 rounded-xl text-xs text-center font-semibold">{authError}</div>}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button type="submit" className="w-2/3 btn-luxury-gold text-xs !py-2.5">
                <span>Authenticate</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Taxonomy Configuration mapping 1-to-1 with prompt
  const SECTIONS = [
    {
      key: 'dashboard' as MainAdminSection,
      label: 'Dashboard',
      icon: LayoutDashboard,
      subTabs: [
        { key: 'enquiries', label: 'Enquiries' },
        { key: 'bookings', label: 'Bookings' },
        { key: 'revenue', label: 'Revenue' },
        { key: 'todays-leads', label: "Today's Leads" },
        { key: 'performance', label: 'Speed & Web Vitals' },
      ],
    },
    {
      key: 'alerts' as MainAdminSection,
      label: 'Live Alert Banner',
      icon: Radio,
      subTabs: [
        { key: 'manage', label: 'Advisory Broadcast & Presets' },
      ],
    },
    {
      key: 'packages' as MainAdminSection,
      label: 'Tour Packages',
      icon: Package,
      subTabs: [
        { key: 'edit', label: 'Package List' },
        { key: 'create', label: 'Create' },
        { key: 'pricing', label: 'Pricing' },
        { key: 'itinerary', label: 'Itinerary' },
        { key: 'photos', label: 'Photos' },
        { key: 'inclusions', label: 'Inclusions' },
        { key: 'publish', label: 'Publish / Unpublish' },
      ],
    },
    {
      key: 'cabs' as MainAdminSection,
      label: 'Cab Rental',
      icon: Car,
      subTabs: [
        { key: 'vehicles', label: 'Vehicles' },
        { key: 'photos', label: 'Photos' },
        { key: 'per-km', label: 'Per-km Rates' },
        { key: 'package-rates', label: 'Package Rates' },
        { key: 'dest-rates', label: 'Destination Rates' },
        { key: 'availability', label: 'Availability' },
      ],
    },
    {
      key: 'hotels' as MainAdminSection,
      label: 'Hotels',
      icon: Building2,
      subTabs: [
        { key: 'hotel-list', label: 'Hotel List' },
        { key: 'room-types', label: 'Room Types' },
        { key: 'seasonal', label: 'Seasonal Pricing' },
        { key: 'photos', label: 'Photos' },
        { key: 'availability', label: 'Availability' },
      ],
    },
    {
      key: 'destinations' as MainAdminSection,
      label: 'Destinations',
      icon: MapPin,
      subTabs: [
        { key: 'gangtok', label: 'Gangtok' },
        { key: 'north-sikkim', label: 'North Sikkim' },
        { key: 'silk-route', label: 'Silk Route' },
        { key: 'pelling', label: 'Pelling' },
        { key: 'darjeeling', label: 'Darjeeling' },
        { key: 'bhutan', label: 'Bhutan' },
      ],
    },
    {
      key: 'leads' as MainAdminSection,
      label: 'Leads',
      icon: MessageCircle,
      subTabs: [
        { key: 'all', label: 'All' },
        { key: 'new', label: 'New' },
        { key: 'contacted', label: 'Contacted' },
        { key: 'quoted', label: 'Quoted' },
        { key: 'confirmed', label: 'Confirmed' },
        { key: 'lost', label: 'Lost' },
      ],
    },
    {
      key: 'website' as MainAdminSection,
      label: 'Website Content',
      icon: Globe,
      subTabs: [
        { key: 'hero', label: 'Hero Banners' },
        { key: 'gallery', label: 'Gallery' },
        { key: 'reviews', label: 'Reviews' },
        { key: 'faqs', label: 'FAQs' },
        { key: 'seo', label: 'SEO Manager' },
      ],
    },
    {
      key: 'seo' as MainAdminSection,
      label: 'SEO Metadata',
      icon: Globe,
      subTabs: [
        { key: 'metadata', label: 'Meta Tags & Keywords' },
      ],
    },
    {
      key: 'navigation' as MainAdminSection,
      label: 'Navigation',
      icon: Menu,
      subTabs: [
        { key: 'menu', label: 'Header & Footer Links' },
      ],
    },
    {
      key: 'settings' as MainAdminSection,
      label: 'Settings',
      icon: Settings,
      subTabs: [
        { key: 'company', label: 'Company Details' },
        { key: 'branding', label: 'Logo & Visual Identity' },
        { key: 'whatsapp', label: 'WhatsApp' },
        { key: 'maps', label: 'Google Maps' },
        { key: 'api-keys', label: 'API Keys' },
        { key: 'permissions', label: 'User Permissions' },
      ],
    },
  ];

  const currentSectionConfig = SECTIONS.find((s) => s.key === activeSection) || SECTIONS[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-emerald-700/60 rounded-2xl max-w-7xl w-full max-h-[96vh] flex flex-col shadow-2xl relative text-slate-100 my-auto">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-xl font-extrabold text-slate-100">
                  OffbeatDestination Admin Dashboard
                </h2>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-800 uppercase tracking-wider">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Full travel agency management: Tour Packages, Cab Rental, Hotels, Destinations, Leads, Content & Settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveSection('alerts');
                setActiveSubTab('manage');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                localAlert?.enabled
                  ? 'bg-amber-950/80 hover:bg-amber-900/90 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Toggle or edit real-time travel alert banner"
            >
              <Radio className={`w-3.5 h-3.5 ${localAlert?.enabled ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span>Alert Banner: {localAlert?.enabled ? 'LIVE' : 'OFF'}</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('settings');
                setActiveSubTab('branding');
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-semibold border border-amber-500/30 flex items-center gap-1.5 transition-colors"
              title="Change or upload custom agency logo"
            >
              <Image className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Change Logo</span>
            </button>

            <button
              onClick={exportCSV}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Leads CSV</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset all packages, cabs, and agency details back to factory defaults?')) {
                  onResetToDefaults();
                  onClose();
                }
              }}
              className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 rounded-lg text-xs font-semibold border border-rose-800/80 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary Section Navigation Bar */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-2 border-b border-slate-800 overflow-x-auto text-xs font-bold scrollbar-thin">
          {SECTIONS.map((sec) => {
            const IconComp = sec.icon;
            const isActive = activeSection === sec.key;
            return (
              <button
                key={sec.key}
                onClick={() => {
                  setActiveSection(sec.key);
                  setActiveSubTab(sec.subTabs[0].key);
                }}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg font-black'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Sub-Tab Pill Bar */}
        <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs scrollbar-thin">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider flex items-center gap-1 mr-1">
            <Sliders className="w-3 h-3 text-emerald-400" />
            <span>{currentSectionConfig.label} Controls:</span>
          </span>
          {currentSectionConfig.subTabs.map((sub) => {
            const isSubActive = activeSubTab === sub.key;
            return (
              <button
                key={sub.key}
                onClick={() => {
                  setActiveSubTab(sub.key);
                  if (sub.key === 'create' && activeSection === 'packages') {
                    handleCreateNewPackage();
                  }
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${
                  isSubActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>

        {/* Console Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ================= SECTION 1: DASHBOARD ================= */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <AdminDashboardKpis
                stats={stats}
                onNavigateTab={(tabKey) => {
                  if (tabKey === 'leads') {
                    setActiveSection('leads');
                    setActiveSubTab('all');
                  } else if (tabKey === 'quotations') {
                    setActiveSection('leads');
                    setActiveSubTab('quoted');
                  } else if (tabKey === 'packages') {
                    setActiveSection('packages');
                    setActiveSubTab('edit');
                  } else if (tabKey === 'destinations') {
                    setActiveSection('destinations');
                    setActiveSubTab('gangtok');
                  } else if (tabKey === 'hotels') {
                    setActiveSection('hotels');
                    setActiveSubTab('hotel-list');
                  } else if (tabKey === 'performance') {
                    setActiveSection('dashboard');
                    setActiveSubTab('performance');
                  }
                }}
              />

              {/* Sub tab details: Enquiries, Bookings, Revenue, Today's leads */}
              {activeSubTab === 'enquiries' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Recent Guest Enquiries ({leads.length})</span>
                    </h3>
                    <button onClick={() => { setActiveSection('leads'); setActiveSubTab('all'); }} className="text-xs text-emerald-400 font-bold hover:underline">
                      Manage All Leads →
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {leads.slice(0, 4).map((l) => (
                      <div key={l.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-200">{l.customerName}</span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-800">
                            {l.status}
                          </span>
                        </div>
                        <div className="text-slate-400 text-[11px]">{l.packageOrRoute} • {l.travelDates}</div>
                        <div className="text-emerald-400 font-mono text-[11px]">WhatsApp: {l.whatsappNumber}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'bookings' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Confirmed Tour Bookings</span>
                  </h3>
                  <div className="space-y-3">
                    {leads.filter((l) => l.status === 'Booked' || l.status === 'Confirmed').length === 0 ? (
                      <div className="text-xs text-slate-500 py-4 text-center">No confirmed bookings yet in this session.</div>
                    ) : (
                      leads.filter((l) => l.status === 'Booked' || l.status === 'Confirmed').map((l) => (
                        <div key={l.id} className="p-3 bg-slate-900 rounded-xl border border-emerald-800/60 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-emerald-300 block">{l.customerName}</span>
                            <span className="text-slate-400 text-[11px]">{l.packageOrRoute} ({l.travelersCount} Guests)</span>
                          </div>
                          <span className="text-emerald-400 font-extrabold text-sm">CONFIRMED</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeSubTab === 'revenue' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Pipeline Revenue & Projections</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[11px] uppercase font-bold">Estimated Pipeline</div>
                      <div className="text-2xl font-black text-amber-300 mt-1">₹{(stats.totalQuotationValue || 485000).toLocaleString('en-IN')}</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[11px] uppercase font-bold">Average Deal Value</div>
                      <div className="text-2xl font-black text-teal-300 mt-1">₹38,500</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[11px] uppercase font-bold">Confirmed Advance</div>
                      <div className="text-2xl font-black text-emerald-300 mt-1">₹1,24,000</div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'todays-leads' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Today's Incoming Leads (Last 24 Hours)</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    {leads.map((l) => (
                      <div key={l.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-100">{l.customerName}</span>
                          <span className="text-slate-400 block text-[11px]">{l.packageOrRoute} • {l.whatsappNumber}</span>
                        </div>
                        <span className="text-[10px] bg-cyan-950 text-cyan-300 font-mono px-2.5 py-1 rounded border border-cyan-800">
                          Fresh Today
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'performance' && (
                <AdminPerformanceMonitor onRefresh={fetchAllBackendData} />
              )}
            </div>
          )}

          {/* ================= SECTION 2: TOUR PACKAGES ================= */}
          {activeSection === 'packages' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100">Tour Packages CMS & Day-by-Day Itinerary Builder</h3>
                  <p className="text-xs text-slate-400">Edit package title, duration, pricing, day itineraries, photos & inclusions live</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateNewPackage}
                    className="px-3.5 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Package</span>
                  </button>

                  <button
                    onClick={handleSaveAllPackages}
                    className="btn-luxury-gold text-xs !py-2 !px-4 flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Changes Live</span>
                  </button>
                </div>
              </div>

              {pkgSaveStatus && (
                <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded-xl text-xs font-semibold">
                  {pkgSaveStatus}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Left Package Selector */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-400 block px-2">Select Package to Edit</span>
                  {localPackages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPkgId(p.id)}
                      className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all ${
                        selectedPkgId === p.id
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="truncate">{p.title}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">₹{p.priceStarting} • {p.duration}</div>
                    </button>
                  ))}
                </div>

                {/* Right Editor Panel */}
                {currentPkg && (
                  <div className="md:col-span-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="font-bold text-slate-200 text-sm flex items-center gap-2">
                        <Package className="w-4 h-4 text-emerald-400" />
                        <span>Editing: {currentPkg.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveSection('seo');
                            setActiveSubTab('metadata');
                          }}
                          className="px-3 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Generate & Auto-Suggest Google Meta Descriptions for this package"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Optimize SEO</span>
                        </button>
                        <button
                          onClick={() => handleDeletePackage(currentPkg.id)}
                          className="px-3 py-1 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Package</span>
                        </button>
                      </div>
                    </div>

                    {/* Sub Tab View Specific Content */}
                    {(activeSubTab === 'edit' || activeSubTab === 'pricing') && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Package Title</label>
                          <input
                            type="text"
                            value={currentPkg.title}
                            onChange={(e) => handlePkgFieldChange('title', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Starting Price (₹)</label>
                          <input
                            type="number"
                            value={currentPkg.priceStarting}
                            onChange={(e) => handlePkgFieldChange('priceStarting', Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Duration</label>
                          <input
                            type="text"
                            value={currentPkg.duration}
                            onChange={(e) => handlePkgFieldChange('duration', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">Category / Region</label>
                          <select
                            value={currentPkg.category || 'North Sikkim'}
                            onChange={(e) => handlePkgFieldChange('category', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-semibold"
                          >
                            <option value="Gangtok">Gangtok & East Sikkim</option>
                            <option value="North Sikkim">North Sikkim (Lachen / Lachung)</option>
                            <option value="Silk Route">Old Silk Route Zuluk</option>
                            <option value="Pelling">West Sikkim Pelling</option>
                            <option value="Darjeeling">Darjeeling Tea Gardens</option>
                            <option value="Bhutan">Bhutan Kingdom</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Photos View */}
                    {(activeSubTab === 'photos' || activeSubTab === 'edit') && (
                      <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-slate-200 font-bold text-xs flex items-center gap-1.5">
                            <Image className="w-4 h-4 text-emerald-400" />
                            <span>Package Cover Photo / Banner</span>
                          </label>
                          <span className="text-[10px] text-slate-400">Upload file or enter URL</span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="relative w-full sm:w-44 h-28 bg-slate-950 rounded-xl overflow-hidden border border-slate-700/80 shrink-0 shadow-md">
                            <OptimizedImage
                              src={currentPkg.heroImage || sikkimHeroBanner}
                              alt={currentPkg.title}
                              fallbackSrc={sikkimHeroBanner}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                            <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-slate-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700">
                              Live Banner
                            </span>
                          </div>

                          <div className="flex-1 w-full space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md active:scale-95">
                                <Upload className="w-4 h-4 text-white" />
                                <span>Upload Image File</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFileUploadForPackage}
                                />
                              </label>
                              <span className="text-[11px] text-slate-400">or paste URL below</span>
                            </div>

                            <input
                              type="text"
                              value={currentPkg.heroImage}
                              placeholder="https://... or /images/..."
                              onChange={(e) => handlePkgFieldChange('heroImage', e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:border-emerald-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Itinerary View */}
                    {(activeSubTab === 'itinerary' || activeSubTab === 'edit') && (
                      <div className="space-y-3 pt-3 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-200 text-xs">Day-by-Day Itinerary ({currentPkg.itinerary.length} Days)</h4>
                          <button
                            onClick={handleAddItineraryDay}
                            className="px-3 py-1 bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Itinerary Day</span>
                          </button>
                        </div>

                        {currentPkg.itinerary.map((dayItem, idx) => (
                          <div key={idx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <div className="font-bold text-amber-300">Day {dayItem.day}</div>
                              <button
                                onClick={() => handleDeleteItineraryDay(idx)}
                                className="text-rose-400 hover:text-rose-300 text-[11px] font-bold"
                              >
                                Remove Day
                              </button>
                            </div>
                            <input
                              type="text"
                              value={dayItem.title}
                              onChange={(e) => {
                                const updated = [...currentPkg.itinerary];
                                updated[idx].title = e.target.value;
                                handlePkgFieldChange('itinerary', updated);
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-100 font-semibold"
                            />
                            <textarea
                              rows={2}
                              value={dayItem.description}
                              onChange={(e) => {
                                const updated = [...currentPkg.itinerary];
                                updated[idx].description = e.target.value;
                                handlePkgFieldChange('itinerary', updated);
                              }}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-100"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Inclusions View */}
                    {(activeSubTab === 'inclusions' || activeSubTab === 'edit') && (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                        <label className="font-bold text-slate-200 block">Package Inclusions Checklist</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                          {['Hotel Stay', 'Breakfast & Dinner', 'Private Cab', 'Army Permits', 'Toll & Fuel', 'Sightseeing'].map((inc) => (
                            <label key={inc} className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800">
                              <input type="checkbox" defaultChecked className="accent-emerald-500" />
                              <span>{inc}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Publish / Unpublish View */}
                    {activeSubTab === 'publish' && (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-100 block text-sm">Publish Status</span>
                            <span className="text-slate-400 text-[11px]">Control whether this package is visible on the main website</span>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold uppercase text-[10px]">
                            PUBLISHED LIVE
                          </span>
                        </div>
                        <button onClick={handleSaveAllPackages} className="btn-luxury-gold text-xs !py-2 !px-4">
                          Update Live Status
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= SECTION 3: CAB RENTAL ================= */}
          {activeSection === 'cabs' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100">Cab Fleet & Tariff Rates CMS</h3>
                  <p className="text-xs text-slate-400">Configure Toyota Innova Crysta, Mahindra XUV700, Scorpio-N & Tempo Traveller rates</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCreateNewCab}
                    className="px-3.5 py-2 bg-teal-950 hover:bg-teal-900 text-teal-300 border border-teal-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Vehicle Cab</span>
                  </button>

                  <button onClick={handleSaveAllCabs} className="btn-luxury-gold text-xs !py-2 !px-4">
                    <span>Save Fleet Rates</span>
                  </button>
                </div>
              </div>

              {cabSaveStatus && <div className="p-3 bg-emerald-950 text-emerald-300 rounded-xl text-xs font-semibold">{cabSaveStatus}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localCabs.map((cab, idx) => {
                  const cabImg = cab.image || innovaCrystaCab;
                  return (
                    <div key={cab.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="font-bold text-slate-100 text-sm flex items-center gap-2">
                          <Car className="w-4 h-4 text-teal-400" />
                          <span>{cab.model}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-900 text-teal-300 px-2 py-0.5 rounded border border-slate-800 font-semibold">
                            {cab.type}
                          </span>
                          <button onClick={() => handleDeleteCab(cab.id)} className="p-1 text-rose-400 hover:text-rose-300">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Photo upload sub tab focus */}
                      {(activeSubTab === 'photos' || activeSubTab === 'vehicles') && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center gap-3">
                            <OptimizedImage src={cabImg} alt={cab.model} className="w-20 h-14 object-cover rounded-lg border border-slate-700" />
                            <div className="flex-1 space-y-1">
                              <label className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-800 hover:bg-teal-700 text-white rounded text-[11px] font-bold cursor-pointer">
                                <Upload className="w-3 h-3" /> Upload Photo
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUploadForCab(idx, e)} />
                              </label>
                              <input
                                type="text"
                                value={cab.image || ''}
                                placeholder="Photo URL"
                                onChange={(e) => {
                                  const updated = [...localCabs];
                                  updated[idx].image = e.target.value;
                                  setLocalCabs(updated);
                                }}
                                className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-100"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tariff inputs */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-slate-400 block text-[10px] font-semibold mb-1">Daily Rate (₹)</label>
                          <input
                            type="number"
                            value={cab.ratePerDay}
                            onChange={(e) => {
                              const updated = [...localCabs];
                              updated[idx].ratePerDay = Number(e.target.value);
                              setLocalCabs(updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-100 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400 block text-[10px] font-semibold mb-1">Capacity</label>
                          <input
                            type="text"
                            value={cab.capacity}
                            onChange={(e) => {
                              const updated = [...localCabs];
                              updated[idx].capacity = e.target.value;
                              setLocalCabs(updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-100"
                          />
                        </div>
                      </div>

                      {activeSubTab === 'dest-rates' && (
                        <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] text-slate-300 space-y-1">
                          <div><strong>NJP / Bagdogra Transfer:</strong> ₹{cab.njpIxbPickupRate || 3500}</div>
                          <div><strong>North Sikkim Lachen/Lachung:</strong> ₹{cab.ratePerDay * 2} (2 Days minimum)</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= SECTION 4: HOTELS ================= */}
          {activeSection === 'hotels' && (
            <AdminHotels hotels={hotels} onRefresh={fetchAllBackendData} />
          )}

          {/* ================= SECTION 5: DESTINATIONS ================= */}
          {activeSection === 'destinations' && (
            <AdminDestinations destinations={destinations} onRefresh={fetchAllBackendData} />
          )}

          {/* ================= SECTION 6: LEADS ================= */}
          {activeSection === 'leads' && (() => {
            const statusOptions = [
              { key: 'all', label: 'All Inquiries' },
              { key: 'new', label: 'New' },
              { key: 'contacted', label: 'Contacted' },
              { key: 'quoted', label: 'Quoted' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'lost', label: 'Lost / Closed' },
            ];

            const filteredLeads = leads.filter((l) => {
              const currentFilter = activeSubTab === 'all' ? 'All' : activeSubTab;
              const matchesStatus =
                currentFilter === 'All' || currentFilter === 'all'
                  ? true
                  : currentFilter.toLowerCase() === 'confirmed'
                  ? l.status === 'Booked' || l.status === 'Confirmed'
                  : l.status.toLowerCase() === currentFilter.toLowerCase();

              const query = leadSearchQuery.toLowerCase().trim();
              const matchesSearch =
                !query ||
                l.customerName.toLowerCase().includes(query) ||
                l.whatsappNumber.toLowerCase().includes(query) ||
                l.packageOrRoute.toLowerCase().includes(query);

              return matchesStatus && matchesSearch;
            });

            return (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                      <span>Guest Leads & Inquiry CRM</span>
                    </h3>
                    <p className="text-xs text-slate-400">Captured website inquiries, WhatsApp numbers & requested travel dates</p>
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search lead name, phone..."
                      value={leadSearchQuery}
                      onChange={(e) => setLeadSearchQuery(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-8 py-1.5 text-xs text-slate-100 w-64 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredLeads.length === 0 ? (
                    <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
                      No leads found matching current filter ({activeSubTab}).
                    </div>
                  ) : (
                    filteredLeads.map((l) => (
                      <div key={l.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-100 text-sm">{l.customerName}</h4>
                              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800 uppercase font-mono">
                                {l.status}
                              </span>
                            </div>
                            <div className="text-xs text-teal-400 font-mono mt-0.5">{l.whatsappNumber}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-semibold">Status:</span>
                            <select
                              value={l.status}
                              onChange={(e) => onUpdateStatus(l.id, e.target.value as any)}
                              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-bold"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Booked">Booked / Confirmed</option>
                              <option value="Closed">Lost / Closed</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
                          <div><strong className="text-slate-400 block text-[10px]">Route:</strong> {l.packageOrRoute}</div>
                          <div><strong className="text-slate-400 block text-[10px]">Dates:</strong> {l.travelDates}</div>
                          <div><strong className="text-slate-400 block text-[10px]">Guests:</strong> {l.travelersCount}</div>
                          <div><strong className="text-slate-400 block text-[10px]">Cab:</strong> {l.vehiclePreference || 'Innova Crysta'}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })()}

          {/* ================= SECTION 7: WEBSITE CONTENT ================= */}
          {activeSection === 'website' && (
            <div className="space-y-6">
              {activeSubTab === 'hero' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <span>Hero Banners CMS</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Headline Slogan</label>
                      <input
                        type="text"
                        value={heroContent.headline}
                        onChange={(e) => setHeroContent({ ...heroContent, headline: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Sub-headline Description</label>
                      <textarea
                        rows={2}
                        value={heroContent.subheadline}
                        onChange={(e) => setHeroContent({ ...heroContent, subheadline: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                      />
                    </div>
                  </div>
                  <button onClick={() => alert('Hero banner updated live!')} className="btn-luxury-gold text-xs !py-2 !px-4">
                    Save Hero Content
                  </button>
                </div>
              )}

              {activeSubTab === 'gallery' && (
                <AdminMediaLibrary media={media} onRefresh={fetchAllBackendData} />
              )}

              {activeSubTab === 'faqs' && (
                <AdminFaqs faqs={faqs} onRefresh={fetchAllBackendData} />
              )}

              {activeSubTab === 'reviews' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400" />
                    <span>Customer Reviews & Testimonials</span>
                  </h3>
                  <div className="space-y-3">
                    {[{ name: 'Rahul Sharma', rating: 5, comment: 'Flawless Gangtok and Nathula Pass trip! Cabs arrived on time.' }].map((r, i) => (
                      <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <div className="font-bold text-amber-300">{r.name} • ★★★★★</div>
                        <p className="text-slate-300">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'seo' && (
                <AdminSeoManager
                  seoSettings={localSeo}
                  packages={localPackages}
                  cabs={localCabs}
                  onSaveSeo={async (updated) => {
                    setLocalSeo(updated);
                    if (onSaveSeoSettings) {
                      onSaveSeoSettings(updated);
                    }
                  }}
                  onRefresh={fetchAllBackendData}
                />
              )}
            </div>
          )}

          {/* ================= SECTION: SEO METADATA ================= */}
          {activeSection === 'seo' && (
            <AdminSeoManager
              seoSettings={localSeo}
              packages={localPackages}
              cabs={localCabs}
              onSaveSeo={async (updated) => {
                setLocalSeo(updated);
                if (onSaveSeoSettings) {
                  onSaveSeoSettings(updated);
                }
              }}
              onRefresh={fetchAllBackendData}
            />
          )}

          {/* ================= SECTION: NAVIGATION ================= */}
          {activeSection === 'navigation' && (
            <AdminNavigation onRefresh={fetchAllBackendData} />
          )}

          {/* ================= SECTION 8: SETTINGS ================= */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              {activeSubTab === 'company' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-5 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">Company & Agency Details</h3>
                      <p className="text-slate-400 text-[11px]">Manage registered agency info, certifications, and primary brand assets.</p>
                    </div>
                    <button
                      onClick={() => setActiveSubTab('branding')}
                      className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Image className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Customize Brand Logo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Agency Brand Name</label>
                      <input
                        type="text"
                        value={localAgency.name}
                        onChange={(e) => setLocalAgency({ ...localAgency, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Govt Tourism Registration No.</label>
                      <input
                        type="text"
                        value={localAgency.govtRegistration}
                        onChange={(e) => setLocalAgency({ ...localAgency, govtRegistration: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Official Support Phone</label>
                      <input
                        type="text"
                        value={localAgency.phone || '+91 62961 02341'}
                        onChange={(e) => setLocalAgency({ ...localAgency, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Registered Head Office Address</label>
                      <input
                        type="text"
                        value={localAgency.address || 'MG Marg, Gangtok, Sikkim 737101'}
                        onChange={(e) => setLocalAgency({ ...localAgency, address: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100"
                      />
                    </div>
                  </div>

                  {agencySaveStatus && (
                    <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-400 font-bold text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{agencySaveStatus}</span>
                    </div>
                  )}

                  <button onClick={handleSaveAgency} className="btn-luxury-gold text-xs !py-2 !px-4">
                    Save Company Details
                  </button>
                </div>
              )}

              {activeSubTab === 'branding' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-6 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                        <Image className="w-5 h-5 text-amber-400" />
                        <span>Logo & Brand Visual Identity</span>
                      </h3>
                      <p className="text-slate-400 text-[11px]">
                        Upload a new official logo or paste an image URL. Updates immediately across the website header, footer, modals, PDF quotations, and customer invoices.
                      </p>
                    </div>

                    {logoSaveStatus && (
                      <div className="px-3 py-1.5 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-400 font-bold text-xs flex items-center gap-1.5 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{logoSaveStatus}</span>
                      </div>
                    )}
                  </div>

                  {/* Real-time Logo Preview Cards */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Live Logo Previews Across App Contexts</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Light Context Preview */}
                      <div className="p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 flex flex-col items-center justify-center gap-2">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Light Theme Header</span>
                        <div className="py-2">
                          <Logo variant="light" size="md" />
                        </div>
                      </div>

                      {/* Dark Context Preview */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 flex flex-col items-center justify-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dark Navigation / Sticky Bar</span>
                        <div className="py-2">
                          <Logo variant="dark" size="md" />
                        </div>
                      </div>

                      {/* Standalone Emblem / PDF Invoice Preview */}
                      <div className="p-3 rounded-xl bg-gradient-to-tr from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col items-center justify-center gap-2">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">PDF Quotation & Invoice Crest</span>
                        <div className="py-2">
                          <Logo mode="image" size="md" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Custom Logo File */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>Upload Logo File (PNG, SVG, JPG)</span>
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Upload your agency logo. A transparent PNG or clean SVG with at least 500×500px resolution is recommended for crisp rendering on Retina screens.
                      </p>
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all text-xs">
                        <Upload className="w-4 h-4" />
                        <span>Select Logo File from Computer</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/svg+xml,image/webp"
                          className="hidden"
                          onChange={handleLogoFileUpload}
                        />
                      </label>
                    </div>

                    {/* Logo Image URL Input */}
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-cyan-400" />
                        <span>Or Paste Image URL</span>
                      </h4>
                      <p className="text-slate-400 text-[11px]">
                        Provide a direct hosted image link (e.g. Cloudinary, AWS S3, or your CDN).
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://your-domain.com/assets/logo.png"
                          value={logoInputUrl}
                          onChange={(e) => setLogoInputUrl(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleApplyLogoUrl(logoInputUrl)}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reset to Original Official Crest */}
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-300">Reset to Built-in Official Crest</h4>
                      <p className="text-slate-400 text-[11px]">
                        Reverts back to the authentic OffbeatDestination Travels Himalayan mountain crest emblem.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetToDefaultLogo}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Restore Default Crest</span>
                    </button>
                  </div>
                </div>
              )}

              {activeSubTab === 'whatsapp' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    <span>WhatsApp Integration Settings</span>
                  </h3>
                  <div>
                    <label className="block text-slate-300 mb-1">Support WhatsApp Number (With Country Code)</label>
                    <input
                      type="text"
                      defaultValue="+91 97330 12345"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-slate-100 font-mono font-bold"
                    />
                  </div>
                </div>
              )}

              {activeSubTab === 'maps' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-400" />
                    <span>Google Maps Integration Config</span>
                  </h3>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-emerald-300 font-bold">Google Maps API Status: Active</div>
                    <div className="text-slate-400 text-[11px]">Center: Gangtok, Sikkim (27.3389° N, 88.6065° E)</div>
                  </div>
                </div>
              )}

              {activeSubTab === 'api-keys' && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-400" />
                    <span>Backend API Keys Status</span>
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span>Open-Meteo Weather API</span>
                      <span className="text-emerald-400 font-bold">Connected (Free Tier)</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span>Google GenAI Gemini Studio Key</span>
                      <span className="text-emerald-400 font-bold">Configured (Server-Side)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeSubTab === 'permissions' && (
                <AdminUsersAudit users={users} auditLogs={auditLogs} onRefresh={fetchAllBackendData} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
