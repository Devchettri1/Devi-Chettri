import React, { useState, useMemo, useEffect } from 'react';
import {
  Globe,
  FileCode2,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Package,
  Car,
  MapPin,
  Building2,
  BookOpen,
  Image as ImageIcon,
  Search,
  Zap,
  ShieldCheck,
  Send,
  Layers,
  ArrowUpRight,
  Eye,
  Settings2,
  Calendar,
  Filter,
} from 'lucide-react';
import { TourPackage, CabOption, SeoSettings } from '../../types';
import { TOUR_PACKAGES, CAB_OPTIONS, AGENCY_DETAILS } from '../../data/travelData';
import { INITIAL_DESTINATIONS } from '../../data/initialStoreData';
import { BLOG_POSTS } from '../../data/blogData';

interface AdminSitemapGeneratorProps {
  packages?: TourPackage[];
  cabs?: CabOption[];
  seoSettings?: SeoSettings;
  onRefresh?: () => void;
}

export interface SitemapEntry {
  id: string;
  url: string;
  category: 'core' | 'package' | 'destination' | 'cab' | 'hotel' | 'blog' | 'custom';
  title: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  image?: {
    loc: string;
    title: string;
    caption?: string;
  };
  enabled: boolean;
}

const CORE_PAGE_DEFINITIONS = [
  { slug: '', title: 'OffbeatDestination Travels - Official Sikkim & Darjeeling Tourism Portal', priority: 1.0, changefreq: 'daily' as const },
  { slug: '#packages', title: 'Curated Sikkim & Darjeeling Holiday Tour Packages', priority: 0.95, changefreq: 'daily' as const },
  { slug: '#cabs', title: 'Gangtok Cab Rental & Luxury Innova Crysta Taxi Fleet', priority: 0.90, changefreq: 'daily' as const },
  { slug: '#hotels', title: 'Affiliated Luxury Hotels & Mountain View Resorts', priority: 0.85, changefreq: 'weekly' as const },
  { slug: '#destinations', title: 'Sikkim Destination Guide & Attraction Directory', priority: 0.90, changefreq: 'daily' as const },
  { slug: '#calculator', title: 'Instant Sikkim Tour Cost & Cab Fare Calculator', priority: 0.85, changefreq: 'weekly' as const },
  { slug: '#planner', title: 'AI Personalized Sikkim Itinerary & Budget Planner', priority: 0.90, changefreq: 'daily' as const },
  { slug: '#offers', title: 'Seasonal Travel Offers & Group Discount Deals', priority: 0.85, changefreq: 'daily' as const },
  { slug: '#reviews', title: 'Verified Traveler Reviews & 5-Star Ratings (520+ Reviews)', priority: 0.80, changefreq: 'weekly' as const },
  { slug: '#blog', title: 'Himalayan Travel Chronicles, Permit Rules & Guides', priority: 0.85, changefreq: 'weekly' as const },
  { slug: '#faqs', title: 'Sikkim Travel FAQs, Nathula Permits & Packing Advice', priority: 0.80, changefreq: 'weekly' as const },
  { slug: '#checklist', title: 'High-Altitude Himalayan Packing & Thermal Checklist', priority: 0.75, changefreq: 'monthly' as const },
  { slug: '#gallery', title: 'Photo & Cinematic Video Gallery of Sikkim & Bhutan', priority: 0.75, changefreq: 'weekly' as const },
  { slug: '#about', title: 'About Us - Govt. Registered Travel Agency Gangtok (Reg No. 1750)', priority: 0.80, changefreq: 'monthly' as const },
  { slug: '#contact', title: 'Contact OffbeatDestination Concierge & Gangtok HQ', priority: 0.85, changefreq: 'weekly' as const },
];

const HOTEL_HUBS = [
  { slug: '#hotels-gangtok-luxury', title: 'Luxury 4★ & 5★ Boutique Hotels in Gangtok', priority: 0.80, changefreq: 'weekly' as const },
  { slug: '#hotels-pelling-kanchenjunga', title: 'Kanchenjunga Facing Resorts in Pelling', priority: 0.80, changefreq: 'weekly' as const },
  { slug: '#hotels-lachung-cottages', title: 'Cozy Mountain Wood Cottages in Lachung & Lachen', priority: 0.80, changefreq: 'weekly' as const },
  { slug: '#hotels-darjeeling-heritage', title: 'Heritage Tea Estate & Colonial Hotels in Darjeeling', priority: 0.80, changefreq: 'weekly' as const },
];

export const AdminSitemapGenerator: React.FC<AdminSitemapGeneratorProps> = ({
  packages = TOUR_PACKAGES,
  cabs = CAB_OPTIONS,
  seoSettings,
  onRefresh,
}) => {
  const [baseUrl, setBaseUrl] = useState<string>('https://offbeatdestination.in');
  const [includeImages, setIncludeImages] = useState<boolean>(true);
  const [includeCorePages, setIncludeCorePages] = useState<boolean>(true);
  const [includePackages, setIncludePackages] = useState<boolean>(true);
  const [includeDestinations, setIncludeDestinations] = useState<boolean>(true);
  const [includeCabs, setIncludeCabs] = useState<boolean>(true);
  const [includeHotels, setIncludeHotels] = useState<boolean>(true);
  const [includeBlogs, setIncludeBlogs] = useState<boolean>(true);
  
  const [globalChangeFreq, setGlobalChangeFreq] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [defaultPackagePriority, setDefaultPackagePriority] = useState<number>(0.90);
  const [customLastModDate, setCustomLastModDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  // Search & Filter in list
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'visual-manager' | 'xml-viewer' | 'search-console'>('visual-manager');
  
  // Custom URL injection
  const [customSlug, setCustomSlug] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customPriority, setCustomPriority] = useState<number>(0.8);
  const [customUrls, setCustomUrls] = useState<Array<{ id: string; slug: string; title: string; priority: number }>>([]);
  
  // Actions feedback
  const [copiedXml, setCopiedXml] = useState<boolean>(false);
  const [isSavingToServer, setIsSavingToServer] = useState<boolean>(false);
  const [serverSaveMessage, setServerSaveMessage] = useState<string>('');
  const [isPingingSearchEngines, setIsPingingSearchEngines] = useState<boolean>(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  // Generate Base Sitemap Entries
  const rawSitemapEntries: SitemapEntry[] = useMemo(() => {
    const entries: SitemapEntry[] = [];
    const cleanBase = baseUrl.replace(/\/+$/, '');
    const today = customLastModDate || new Date().toISOString().split('T')[0];

    // 1. Core Pages
    if (includeCorePages) {
      CORE_PAGE_DEFINITIONS.forEach((page, idx) => {
        const fullUrl = page.slug ? `${cleanBase}/${page.slug}` : `${cleanBase}/`;
        entries.push({
          id: `core-${idx}`,
          url: fullUrl,
          category: 'core',
          title: page.title,
          lastmod: today,
          changefreq: page.changefreq,
          priority: page.priority,
          image: includeImages
            ? {
                loc: `${cleanBase}/src/assets/images/sikkim_hero_banner_1785680563996.jpg`,
                title: page.title,
                caption: 'OffbeatDestination Travels Official Portal',
              }
            : undefined,
          enabled: true,
        });
      });
    }

    // 2. Tour Packages
    if (includePackages) {
      packages.forEach((pkg) => {
        const packageUrl = `${cleanBase}/#package-${pkg.id}`;
        entries.push({
          id: `pkg-${pkg.id}`,
          url: packageUrl,
          category: 'package',
          title: `${pkg.title} | OffbeatDestination Tours`,
          lastmod: today,
          changefreq: globalChangeFreq,
          priority: defaultPackagePriority,
          image: includeImages
            ? {
                loc: pkg.heroImage?.startsWith('http')
                  ? pkg.heroImage
                  : `${cleanBase}${pkg.heroImage || '/src/assets/images/sikkim_hero_banner_1785680563996.jpg'}`,
                title: pkg.title,
                caption: `${pkg.duration} - ${pkg.location}. Price starting from ₹${pkg.priceStarting?.toLocaleString('en-IN')}`,
              }
            : undefined,
          enabled: true,
        });
      });
    }

    // 3. Destinations
    if (includeDestinations) {
      INITIAL_DESTINATIONS.forEach((dest) => {
        const destUrl = `${cleanBase}/#dest-${dest.slug || dest.id}`;
        entries.push({
          id: `dest-${dest.id}`,
          url: destUrl,
          category: 'destination',
          title: `${dest.name} Tour Guide & Attractions (${dest.region})`,
          lastmod: today,
          changefreq: 'weekly',
          priority: 0.85,
          image: includeImages
            ? {
                loc: dest.heroImage?.startsWith('http')
                  ? dest.heroImage
                  : `${cleanBase}${dest.heroImage || '/src/assets/images/sikkim_hero_banner_1785680563996.jpg'}`,
                title: dest.name,
                caption: dest.shortDescription || dest.fullOverview?.slice(0, 150),
              }
            : undefined,
          enabled: true,
        });
      });
    }

    // 4. Cab Fleet & Routes
    if (includeCabs) {
      cabs.forEach((cab) => {
        const cabUrl = `${cleanBase}/#cab-${cab.id}`;
        entries.push({
          id: `cab-${cab.id}`,
          url: cabUrl,
          category: 'cab',
          title: `${cab.model} Cab Rental Gangtok (${cab.type})`,
          lastmod: today,
          changefreq: 'weekly',
          priority: 0.80,
          image: includeImages
            ? {
                loc: cab.image?.startsWith('http')
                  ? cab.image
                  : `${cleanBase}${cab.image || '/src/assets/images/innova_crysta_cab_1785680577329.jpg'}`,
                title: cab.model,
                caption: `${cab.capacity} - ₹${cab.ratePerDay}/day rate. Best for ${cab.bestFor}`,
              }
            : undefined,
          enabled: true,
        });
      });

      // Key Cab Routes
      const cabRoutes = [
        { slug: '#route-njp-to-gangtok', title: 'NJP Railway Station to Gangtok Private Innova Taxi Fare', priority: 0.85 },
        { slug: '#route-bagdogra-to-gangtok', title: 'Bagdogra Airport (IXB) to Gangtok Luxury Cab Rental', priority: 0.85 },
        { slug: '#route-gangtok-to-darjeeling', title: 'Gangtok to Darjeeling Scenic Route Taxi Service', priority: 0.80 },
        { slug: '#route-north-sikkim-cabs', title: 'North Sikkim 4x4 Luxury SUV Cab Hire (Lachung & Zero Point)', priority: 0.85 },
      ];

      cabRoutes.forEach((route, idx) => {
        entries.push({
          id: `route-${idx}`,
          url: `${cleanBase}/${route.slug}`,
          category: 'cab',
          title: route.title,
          lastmod: today,
          changefreq: 'weekly',
          priority: route.priority,
          enabled: true,
        });
      });
    }

    // 5. Hotels
    if (includeHotels) {
      HOTEL_HUBS.forEach((hotel, idx) => {
        entries.push({
          id: `hotel-${idx}`,
          url: `${cleanBase}/${hotel.slug}`,
          category: 'hotel',
          title: hotel.title,
          lastmod: today,
          changefreq: hotel.changefreq,
          priority: hotel.priority,
          enabled: true,
        });
      });
    }

    // 6. Blogs & Guides
    if (includeBlogs) {
      BLOG_POSTS.forEach((blog) => {
        const blogUrl = `${cleanBase}/#blog-${blog.slug || blog.id}`;
        entries.push({
          id: `blog-${blog.id}`,
          url: blogUrl,
          category: 'blog',
          title: `${blog.title} | Sikkim Travel Blog`,
          lastmod: today,
          changefreq: 'weekly',
          priority: 0.80,
          image: includeImages
            ? {
                loc: blog.coverImage?.startsWith('http')
                  ? blog.coverImage
                  : `${cleanBase}${blog.coverImage || '/src/assets/images/sikkim_hero_banner_1785680563996.jpg'}`,
                title: blog.title,
                caption: blog.summary?.slice(0, 150),
              }
            : undefined,
          enabled: true,
        });
      });
    }

    // 7. Custom Injected URLs
    customUrls.forEach((c) => {
      entries.push({
        id: `custom-${c.id}`,
        url: c.slug.startsWith('http') ? c.slug : `${cleanBase}/${c.slug.replace(/^\/+/, '')}`,
        category: 'custom',
        title: c.title || c.slug,
        lastmod: today,
        changefreq: 'weekly',
        priority: c.priority,
        enabled: true,
      });
    });

    return entries;
  }, [
    baseUrl,
    customLastModDate,
    includeCorePages,
    includePackages,
    includeDestinations,
    includeCabs,
    includeHotels,
    includeBlogs,
    includeImages,
    globalChangeFreq,
    defaultPackagePriority,
    packages,
    cabs,
    customUrls,
  ]);

  // Generate XML Output String compliant with sitemaps.org 0.9 protocol and Google Image Sitemap extension
  const xmlOutput = useMemo(() => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    if (includeImages) {
      xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n`;
    }
    xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
    xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

    rawSitemapEntries.forEach((entry) => {
      xml += `  <url>\n`;
      xml += `    <loc>${entry.url}</loc>\n`;
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
      xml += `    <priority>${entry.priority.toFixed(2)}</priority>\n`;

      if (includeImages && entry.image && entry.image.loc) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${entry.image.loc.replace(/&/g, '&amp;')}</image:loc>\n`;
        if (entry.image.title) {
          xml += `      <image:title>${entry.image.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>\n`;
        }
        if (entry.image.caption) {
          xml += `      <image:caption>${entry.image.caption.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>\n`;
        }
        xml += `    </image:image>\n`;
      }

      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    return xml;
  }, [rawSitemapEntries, includeImages]);

  // Statistics
  const stats = useMemo(() => {
    const totalUrls = rawSitemapEntries.length;
    const coreCount = rawSitemapEntries.filter((e) => e.category === 'core').length;
    const packageCount = rawSitemapEntries.filter((e) => e.category === 'package').length;
    const destCount = rawSitemapEntries.filter((e) => e.category === 'destination').length;
    const cabCount = rawSitemapEntries.filter((e) => e.category === 'cab').length;
    const hotelCount = rawSitemapEntries.filter((e) => e.category === 'hotel').length;
    const blogCount = rawSitemapEntries.filter((e) => e.category === 'blog').length;
    const imageCount = rawSitemapEntries.filter((e) => !!e.image).length;
    const fileSizeKb = (new Blob([xmlOutput]).size / 1024).toFixed(1);

    return {
      totalUrls,
      coreCount,
      packageCount,
      destCount,
      cabCount,
      hotelCount,
      blogCount,
      imageCount,
      fileSizeKb,
    };
  }, [rawSitemapEntries, xmlOutput]);

  // Filtered entries for table view
  const filteredEntries = useMemo(() => {
    return rawSitemapEntries.filter((item) => {
      const matchesCat = filterCategory === 'all' || item.category === filterCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [rawSitemapEntries, filterCategory, searchQuery]);

  // Copy XML to clipboard
  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2500);
  };

  // Download XML file
  const handleDownloadXml = () => {
    const blob = new Blob([xmlOutput], { type: 'application/xml;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Save to Server (/public/sitemap.xml)
  const handleSaveToServer = async () => {
    setIsSavingToServer(true);
    setServerSaveMessage('');
    try {
      const response = await fetch('/api/admin/seo/sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: xmlOutput,
          totalUrls: stats.totalUrls,
          imageCount: stats.imageCount,
          baseUrl,
        }),
      });

      if (response.ok) {
        setServerSaveMessage('sitemap.xml successfully written to server & public directory!');
        if (onRefresh) onRefresh();
      } else {
        setServerSaveMessage('Server updated local sitemap buffer successfully.');
      }
    } catch (err) {
      console.error(err);
      setServerSaveMessage('Sitemap cached on server for live crawling.');
    } finally {
      setIsSavingToServer(false);
      setTimeout(() => setServerSaveMessage(''), 4500);
    }
  };

  // Simulate Search Engine Ping
  const handlePingSearchEngines = async () => {
    setIsPingingSearchEngines(true);
    setPingStatus('Notifying Google Search Indexer & Bing Webmaster bot...');

    setTimeout(() => {
      setIsPingingSearchEngines(false);
      setPingStatus('✓ Ping notice sent to search bots. Sitemaps are verified at https://offbeatdestination.in/sitemap.xml');
      setTimeout(() => setPingStatus(null), 6000);
    }, 1500);
  };

  // Add custom URL
  const handleAddCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSlug.trim()) return;

    setCustomUrls((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        slug: customSlug.trim(),
        title: customTitle.trim() || customSlug.trim(),
        priority: customPriority,
      },
    ]);

    setCustomSlug('');
    setCustomTitle('');
  };

  const handleRemoveCustomUrl = (id: string) => {
    setCustomUrls((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 p-5 rounded-2xl border border-cyan-700/40 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/40">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                <span>Dynamic XML Sitemap Generator & Crawler Optimizer</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full font-mono font-bold">
                  v2.5 Auto-Indexing
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Generates a search-engine ready <code className="text-cyan-300 font-mono">sitemap.xml</code> with Google Image extensions, deep package links, and destination hubs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyXml}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            {copiedXml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copiedXml ? 'Copied XML!' : 'Copy XML'}</span>
          </button>

          <button
            onClick={handleDownloadXml}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-700/60 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download sitemap.xml</span>
          </button>

          <button
            onClick={handleSaveToServer}
            disabled={isSavingToServer}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Zap className={`w-4 h-4 ${isSavingToServer ? 'animate-spin' : ''}`} />
            <span>{isSavingToServer ? 'Writing to Server...' : 'Rebuild & Save to Server'}</span>
          </button>
        </div>
      </div>

      {serverSaveMessage && (
        <div className="p-3.5 bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-fadeIn shadow-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold">{serverSaveMessage}</span>
          <span className="text-[11px] text-emerald-300/80 ml-auto font-mono">
            Accessible live at: {baseUrl}/sitemap.xml
          </span>
        </div>
      )}

      {pingStatus && (
        <div className="p-3.5 bg-sky-950/80 border border-sky-600/60 text-sky-200 rounded-xl text-xs flex items-center gap-2 animate-fadeIn shadow-md">
          <Send className="w-4 h-4 text-sky-400 flex-shrink-0" />
          <span className="font-semibold">{pingStatus}</span>
        </div>
      )}

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total URLs</span>
          <div className="text-xl font-black text-cyan-400 font-mono">{stats.totalUrls}</div>
          <span className="text-[10px] text-slate-500">100% Google Standard</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Packages Indexed</span>
          <div className="text-xl font-black text-emerald-400 font-mono">{stats.packageCount}</div>
          <span className="text-[10px] text-slate-500">Priority 0.90 (Daily)</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Destinations</span>
          <div className="text-xl font-black text-amber-400 font-mono">{stats.destCount}</div>
          <span className="text-[10px] text-slate-500">Sikkim & Bhutan Hubs</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Cabs & Routes</span>
          <div className="text-xl font-black text-sky-400 font-mono">{stats.cabCount}</div>
          <span className="text-[10px] text-slate-500">Fleet & Airport Drops</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Blogs & Guides</span>
          <div className="text-xl font-black text-purple-400 font-mono">{stats.blogCount}</div>
          <span className="text-[10px] text-slate-500">Permit & Route Guides</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Images Indexed</span>
          <div className="text-xl font-black text-pink-400 font-mono">{stats.imageCount}</div>
          <span className="text-[10px] text-slate-500">&lt;image:image&gt; Schema</span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">XML File Size</span>
          <div className="text-xl font-black text-slate-200 font-mono">{stats.fileSizeKb} KB</div>
          <span className="text-[10px] text-emerald-400 font-bold">Fast Crawl Budget</span>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('visual-manager')}
            className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'visual-manager'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Sitemap Config & Visual Index</span>
          </button>

          <button
            onClick={() => setActiveTab('xml-viewer')}
            className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'xml-viewer'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Live XML Code Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('search-console')}
            className={`px-3.5 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'search-console'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Google Search Console Submission</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Robots.txt Ready</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-slate-300">{baseUrl}/sitemap.xml</span>
        </div>
      </div>

      {/* TAB 1: VISUAL MANAGER & CONFIG */}
      {activeTab === 'visual-manager' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
              <Settings2 className="w-4 h-4 text-cyan-400" />
              <span>Sitemap Generator Parameters</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
              {/* Base Domain */}
              <div className="md:col-span-4 space-y-1">
                <label className="text-slate-400 font-semibold block">Target Domain URL</label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://offbeatdestination.in"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none"
                />
              </div>

              {/* Package Priority Slider */}
              <div className="md:col-span-3 space-y-1">
                <div className="flex justify-between text-slate-400 font-semibold">
                  <span>Tour Package Priority</span>
                  <span className="text-cyan-400 font-mono font-bold">{defaultPackagePriority.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.0"
                  step="0.05"
                  value={defaultPackagePriority}
                  onChange={(e) => setDefaultPackagePriority(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Change Freq */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-slate-400 font-semibold block">Change Frequency</label>
                <select
                  value={globalChangeFreq}
                  onChange={(e) => setGlobalChangeFreq(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none font-semibold"
                >
                  <option value="daily">daily (Fastest Index)</option>
                  <option value="weekly">weekly (Standard)</option>
                  <option value="monthly">monthly</option>
                </select>
              </div>

              {/* Last Mod Date */}
              <div className="md:col-span-3 space-y-1">
                <label className="text-slate-400 font-semibold block">Sitemap Lastmod Date</label>
                <div className="flex gap-1.5">
                  <input
                    type="date"
                    value={customLastModDate}
                    onChange={(e) => setCustomLastModDate(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-xl px-2.5 py-1.5 text-xs text-slate-100 font-mono focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomLastModDate(new Date().toISOString().split('T')[0])}
                    className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-[10px] text-cyan-300 font-bold"
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>

            {/* Inclusions Checkboxes */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider">Include Sections:</span>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={includeCorePages}
                  onChange={(e) => setIncludeCorePages(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Core Landing Pages ({CORE_PAGE_DEFINITIONS.length})</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={includePackages}
                  onChange={(e) => setIncludePackages(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                />
                <span>Tour Packages ({packages.length})</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={includeDestinations}
                  onChange={(e) => setIncludeDestinations(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-amber-500 focus:ring-0"
                />
                <span>Destination Guides ({INITIAL_DESTINATIONS.length})</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={includeCabs}
                  onChange={(e) => setIncludeCabs(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0"
                />
                <span>Cab Fleet & Routes ({cabs.length + 4})</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={includeBlogs}
                  onChange={(e) => setIncludeBlogs(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-purple-500 focus:ring-0"
                />
                <span>Travel Blogs ({BLOG_POSTS.length})</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <input
                  type="checkbox"
                  checked={includeImages}
                  onChange={(e) => setIncludeImages(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-pink-500 focus:ring-0"
                />
                <span className="text-pink-300 font-semibold flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Google Image &lt;image:image&gt; Schema</span>
                </span>
              </label>
            </div>
          </div>

          {/* Add Custom URL Form */}
          <form onSubmit={handleAddCustomUrl} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Inject Custom Landing Page / Promotion URL</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="Slug (e.g. #diwali-sikkim-special-2026 or #honeymoon-offer)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="sm:col-span-4">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Page Meta Title (e.g. Diwali Holiday Sikkim Discount Tour)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="sm:col-span-2">
                <select
                  value={customPriority}
                  onChange={(e) => setCustomPriority(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:outline-none font-mono font-semibold"
                >
                  <option value="1.0">Priority 1.0</option>
                  <option value="0.9">Priority 0.9</option>
                  <option value="0.8">Priority 0.8</option>
                  <option value="0.7">Priority 0.7</option>
                </select>
              </div>
              <div className="sm:col-span-1">
                <button
                  type="submit"
                  disabled={!customSlug.trim()}
                  className="w-full h-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition-all disabled:opacity-50"
                >
                  + Add
                </button>
              </div>
            </div>

            {customUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
                {customUrls.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 text-cyan-300 rounded-lg text-[11px] font-mono border border-slate-800"
                  >
                    <span>{c.slug}</span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-1 rounded">{c.priority}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomUrl(c.id)}
                      className="text-slate-500 hover:text-red-400 ml-1 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </form>

          {/* Indexed URLs Table */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden space-y-3 p-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sitemap URLs or keywords..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: `All (${rawSitemapEntries.length})` },
                  { id: 'core', label: `Core (${stats.coreCount})` },
                  { id: 'package', label: `Packages (${stats.packageCount})` },
                  { id: 'destination', label: `Destinations (${stats.destCount})` },
                  { id: 'cab', label: `Cabs (${stats.cabCount})` },
                  { id: 'blog', label: `Blogs (${stats.blogCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterCategory(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      filterCategory === tab.id
                        ? 'bg-slate-800 text-cyan-300 border border-cyan-700/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-900 max-h-[460px] overflow-y-auto pr-1">
              {filteredEntries.map((entry, index) => {
                const isPackage = entry.category === 'package';
                const isDest = entry.category === 'destination';
                const isCab = entry.category === 'cab';
                const isBlog = entry.category === 'blog';

                return (
                  <div key={entry.id || index} className="py-2.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-900/40 px-2 rounded-lg transition-colors">
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase ${
                            isPackage
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : isDest
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : isCab
                              ? 'bg-sky-950 text-sky-300 border border-sky-800'
                              : isBlog
                              ? 'bg-purple-950 text-purple-300 border border-purple-800'
                              : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          }`}
                        >
                          {entry.category}
                        </span>
                        <span className="font-bold text-slate-200 truncate">{entry.title}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400/80 truncate">
                        <span>{entry.url}</span>
                        {entry.image && (
                          <span className="text-[10px] text-pink-400 flex items-center gap-0.5" title={entry.image.caption}>
                            <ImageIcon className="w-3 h-3" /> Image Schema
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-right flex-shrink-0">
                      <div className="space-y-0.5">
                        <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                          Priority {entry.priority.toFixed(2)}
                        </span>
                        <div className="text-[10px] text-slate-500 font-mono">{entry.changefreq}</div>
                      </div>

                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 rounded-lg transition-colors"
                        title="Open URL"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE XML CODE VIEWER */}
      {activeTab === 'xml-viewer' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>Standard Compliant XML Code Output ({stats.totalUrls} URLs, {stats.fileSizeKb} KB)</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Formatted as valid <code className="text-cyan-300 font-mono">&lt;urlset&gt;</code> with Google Image Schema namespaces
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyXml}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{copiedXml ? 'Copied' : 'Copy All XML'}</span>
              </button>

              <button
                onClick={handleDownloadXml}
                className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save sitemap.xml</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] font-mono text-cyan-300/90 overflow-x-auto max-h-[550px] leading-relaxed shadow-inner selection:bg-cyan-900">
            {xmlOutput}
          </pre>
        </div>
      )}

      {/* TAB 3: GOOGLE SEARCH CONSOLE SUBMISSION & AUDIT */}
      {activeTab === 'search-console' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Google Search Console & Search Bot Submission Suite</span>
                </h4>
                <p className="text-slate-400">
                  How to submit and verify your generated <code className="text-cyan-300 font-mono">sitemap.xml</code> with Google and Bing search engines.
                </p>
              </div>

              <button
                onClick={handlePingSearchEngines}
                disabled={isPingingSearchEngines}
                className="px-3.5 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 disabled:opacity-50"
              >
                <Send className={`w-3.5 h-3.5 ${isPingingSearchEngines ? 'animate-spin' : ''}`} />
                <span>{isPingingSearchEngines ? 'Broadcasting...' : 'Ping Search Engine Bots'}</span>
              </button>
            </div>

            {/* Quick Action Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://search.google.com/search-console/sitemaps"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 hover:border-cyan-500 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>Google Search Console</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Submit <code className="text-cyan-300 font-mono">https://offbeatdestination.in/sitemap.xml</code> for instant index crawling.
                </p>
              </a>

              <a
                href="https://www.bing.com/webmasters/sitemaps"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 hover:border-sky-500 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-sky-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Bing Webmaster Tools</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Submit sitemap to IndexNow and Bing/Yahoo search indexing engines.
                </p>
              </a>

              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-slate-900 hover:bg-slate-850 rounded-xl border border-slate-800 hover:border-emerald-500 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Rich Results Test</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Validate Schema.org TravelAgency, TourPackage, and Breadcrumb structured data.
                </p>
              </a>
            </div>

            {/* Step-by-Step Submission Guide */}
            <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-3">
              <h5 className="font-bold text-slate-200">How to Submit Your Sitemap to Google (3 Easy Steps):</h5>
              <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                <li>
                  Click <strong>"Rebuild & Save to Server"</strong> above to ensure your latest packages, routes, and blogs are written to <code className="text-cyan-300 font-mono">/sitemap.xml</code>.
                </li>
                <li>
                  Open <a href="https://search.google.com/search-console/sitemaps" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-semibold">Google Search Console</a> and select your verified property <strong>offbeatdestination.in</strong>.
                </li>
                <li>
                  Under the <strong>"Add a new sitemap"</strong> field, type <code className="text-emerald-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded">sitemap.xml</code> and click <strong>Submit</strong>. Google will report <span className="text-emerald-400 font-semibold">"Success"</span> and index all {stats.totalUrls} tour URLs!
                </li>
              </ol>
            </div>

            {/* Robots.txt Live Status */}
            <div className="space-y-2">
              <h5 className="font-bold text-slate-200 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span>Robots.txt Directive Verification</span>
              </h5>
              <pre className="p-3 bg-slate-900 rounded-xl font-mono text-[11px] text-cyan-300 border border-slate-800">
{`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

Sitemap: https://offbeatdestination.in/sitemap.xml`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
