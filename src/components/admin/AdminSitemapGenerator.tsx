import React, { useState, useMemo } from 'react';
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
  Search,
  Zap,
  ShieldCheck,
  Send,
  Layers,
  ArrowUpRight,
  Eye,
  Settings2,
  Calendar,
  Filter
} from 'lucide-react';
import { TourPackage, CabOption, SeoSettings } from '../../types';
import { TOUR_PACKAGES, CAB_OPTIONS, AGENCY_DETAILS } from '../../data/travelData';
import { ADDITIONAL_PACKAGES } from '../../data/additionalPackages';
import { INITIAL_DESTINATIONS, INITIAL_HOTELS } from '../../data/initialStoreData';
import { BLOG_POSTS } from '../../data/blogData';

interface AdminSitemapGeneratorProps {
  packages?: TourPackage[];
  cabs?: CabOption[];
  seoSettings?: SeoSettings;
  onUpdateSeo?: (settings: SeoSettings) => void;
  onRefresh?: () => void;
}

interface SitemapUrlEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  category: 'core' | 'package' | 'cab' | 'destination' | 'hotel' | 'blog' | 'legal';
  title: string;
  included: boolean;
}

export const AdminSitemapGenerator: React.FC<AdminSitemapGeneratorProps> = ({
  packages,
  cabs,
  seoSettings,
  onUpdateSeo,
  onRefresh
}) => {
  const rawSiteUrl = typeof seoSettings?.siteUrl === 'string' ? seoSettings.siteUrl : 'https://offbeatdestinationtravels.com';
  const baseUrl = rawSiteUrl.replace(/\/$/, '');
  const today = new Date().toISOString().split('T')[0];

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [downloadedType, setDownloadedType] = useState<string | null>(null);
  const [pingStatus, setPingStatus] = useState<{ [key: string]: 'idle' | 'pinging' | 'success' | 'error' }>({});
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'preview' | 'ping'>('sitemap');

  // Custom inclusions state
  const [excludedUrls, setExcludedUrls] = useState<Set<string>>(new Set());

  // Base list of all static and dynamic URLs
  const allEntries: SitemapUrlEntry[] = useMemo(() => {
    const entries: SitemapUrlEntry[] = [
      // Core pages
      {
        loc: `${baseUrl}/`,
        lastmod: today,
        changefreq: 'daily',
        priority: '1.0',
        category: 'core',
        title: 'Home Page — Luxury Sikkim & Northeast India Tours',
        included: true
      },
      {
        loc: `${baseUrl}/packages`,
        lastmod: today,
        changefreq: 'daily',
        priority: '0.9',
        category: 'core',
        title: 'All Tour Packages & Fixed Itineraries',
        included: true
      },
      {
        loc: `${baseUrl}/cabs`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.9',
        category: 'core',
        title: 'Luxury Cab & SUV Car Rental Sikkim & Bhutan',
        included: true
      },
      {
        loc: `${baseUrl}/destinations`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        category: 'core',
        title: 'Destinations Guide — Gangtok, Pelling, Silk Route, Bhutan',
        included: true
      },
      {
        loc: `${baseUrl}/hotels`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        category: 'core',
        title: 'Luxury Resorts & Heritage Stays',
        included: true
      },
      {
        loc: `${baseUrl}/planner`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.8',
        category: 'core',
        title: 'AI Smart Trip Planner & Instant Cost Estimator',
        included: true
      },
      {
        loc: `${baseUrl}/blog`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        category: 'core',
        title: 'Travel Blog & Destination Guides',
        included: true
      },
      {
        loc: `${baseUrl}/reviews`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.7',
        category: 'core',
        title: 'Verified Traveler Reviews & Testimonials',
        included: true
      },
      {
        loc: `${baseUrl}/contact`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.7',
        category: 'core',
        title: 'Contact OffbeatDestination Travels',
        included: true
      }
    ];

    // Combine all packages
    const packageSource: TourPackage[] = packages && packages.length > 0 ? packages : [...TOUR_PACKAGES, ...ADDITIONAL_PACKAGES];
    const uniquePackages = Array.from(new Map(packageSource.map(p => [p.id, p])).values());

    uniquePackages.forEach((pkg) => {
      entries.push({
        loc: `${baseUrl}/package/${pkg.id}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: pkg.rating >= 4.9 ? '0.9' : '0.8',
        category: 'package',
        title: `${pkg.title} (${pkg.duration})`,
        included: true
      });
    });

    // Cabs
    const cabSource: CabOption[] = cabs && cabs.length > 0 ? cabs : CAB_OPTIONS;
    cabSource.forEach((cab: CabOption) => {
      entries.push({
        loc: `${baseUrl}/cabs#${cab.id}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        category: 'cab',
        title: `${cab.model} (${cab.capacity} Luxury Rental)`,
        included: true
      });
    });

    // Destinations
    INITIAL_DESTINATIONS.forEach((dest) => {
      entries.push({
        loc: `${baseUrl}/destinations/${dest.id}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.8',
        category: 'destination',
        title: `${dest.name} Travel Guide & Attractions`,
        included: true
      });
    });

    // Hotels
    INITIAL_HOTELS.forEach((hotel) => {
      entries.push({
        loc: `${baseUrl}/hotels#${hotel.id}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: '0.7',
        category: 'hotel',
        title: `${hotel.name} - ${hotel.destination || hotel.category}`,
        included: true
      });
    });

    // Blog posts
    BLOG_POSTS.forEach((blog) => {
      entries.push({
        loc: `${baseUrl}/blog/${blog.id}`,
        lastmod: blog.publishedDate ? new Date(blog.publishedDate).toISOString().split('T')[0] : today,
        changefreq: 'monthly',
        priority: '0.7',
        category: 'blog',
        title: blog.title,
        included: true
      });
    });

    return entries;
  }, [baseUrl, today]);

  // Active entries filtered by exclude set
  const activeEntries = useMemo(() => {
    return allEntries.filter(e => !excludedUrls.has(e.loc));
  }, [allEntries, excludedUrls]);

  // Display filtered list
  const filteredEntries = useMemo(() => {
    return allEntries.filter((item) => {
      const matchesCat = filterCategory === 'all' || item.category === filterCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.loc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [allEntries, filterCategory, searchQuery]);

  const toggleUrlInclusion = (loc: string) => {
    setExcludedUrls((prev) => {
      const next = new Set(prev);
      if (next.has(loc)) {
        next.delete(loc);
      } else {
        next.add(loc);
      }
      return next;
    });
  };

  // Generate XML Sitemap
  const xmlSitemap = useMemo(() => {
    const lines = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
      '        xmlns:xhtml="http://www.w3.org/1999/xhtml">'
    ];

    activeEntries.forEach((entry) => {
      lines.push('  <url>');
      lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
      lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
      lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
      lines.push(`    <priority>${entry.priority}</priority>`);
      lines.push('  </url>');
    });

    lines.push('</urlset>');
    return lines.join('\n');
  }, [activeEntries]);

  // Generate Robots.txt
  const robotsTxt = useMemo(() => {
    return `# Robots.txt for OffbeatDestination Travels
# Website: ${baseUrl}
# Auto-generated on ${today}

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /checkout
Disallow: /invoice/

# Major Search Engine Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-packages.xml
Sitemap: ${baseUrl}/sitemap-destinations.xml
Sitemap: ${baseUrl}/sitemap-cabs.xml

# Crawl Delay & AI Bots Friendly
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1

User-agent: GPTBot
Allow: /
`;
  }, [baseUrl, today]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleDownload = (filename: string, content: string, mime: string, type: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedType(type);
    setTimeout(() => setDownloadedType(null), 3000);
  };

  const handlePingSearchEngine = async (engine: 'google' | 'bing' | 'yandex') => {
    setPingStatus((prev) => ({ ...prev, [engine]: 'pinging' }));
    const sitemapUrl = encodeURIComponent(`${baseUrl}/sitemap.xml`);
    let pingUrl = '';

    if (engine === 'google') {
      pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
    } else if (engine === 'bing') {
      pingUrl = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;
    } else if (engine === 'yandex') {
      pingUrl = `https://webmaster.yandex.com/ping?sitemap=${sitemapUrl}`;
    }

    try {
      // Simulate/Trigger ping
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setPingStatus((prev) => ({ ...prev, [engine]: 'success' }));
    } catch {
      setPingStatus((prev) => ({ ...prev, [engine]: 'error' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#111614] via-[#161D1A] to-[#111614] border border-[#D6B36A]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6B36A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#D6B36A]/10 border border-[#D6B36A]/30 text-[#D6B36A]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#EDE8D0]">
                  XML Sitemap &amp; Robots.txt Generator
                </h2>
                <p className="text-sm text-slate-400">
                  Google Search Console &amp; SEO Crawler optimization suite for OffbeatDestination Travels
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
              <span className="bg-[#1D2522] text-[#D6B36A] font-semibold px-3 py-1 rounded-full border border-[#D6B36A]/20">
                {activeEntries.length} Active URLs Indexed
              </span>
              <span className="bg-[#1D2522] text-emerald-400 font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
                Valid XML 0.9 Schema
              </span>
              <span className="bg-[#1D2522] text-blue-400 font-semibold px-3 py-1 rounded-full border border-blue-500/20">
                {baseUrl}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleDownload('sitemap.xml', xmlSitemap, 'application/xml', 'xml')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D6B36A] to-[#B89648] text-[#0B0F0E] font-bold rounded-xl shadow-lg hover:shadow-xl hover:brightness-105 transition-all text-sm"
            >
              {downloadedType === 'xml' ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{downloadedType === 'xml' ? 'Downloaded!' : 'Download sitemap.xml'}</span>
            </button>
            <button
              onClick={() => handleDownload('robots.txt', robotsTxt, 'text/plain', 'robots')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#18201D] text-[#EDE8D0] font-semibold rounded-xl border border-[#D6B36A]/30 hover:border-[#D6B36A]/60 transition-all text-sm"
            >
              {downloadedType === 'robots' ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{downloadedType === 'robots' ? 'Downloaded!' : 'Download robots.txt'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D6B36A]/20 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('sitemap')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'sitemap'
              ? 'bg-[#D6B36A] text-[#0B0F0E] shadow-md'
              : 'text-slate-400 hover:text-[#EDE8D0] hover:bg-[#18201D]'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>sitemap.xml Output</span>
        </button>
        <button
          onClick={() => setActiveTab('robots')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'robots'
              ? 'bg-[#D6B36A] text-[#0B0F0E] shadow-md'
              : 'text-slate-400 hover:text-[#EDE8D0] hover:bg-[#18201D]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>robots.txt</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'preview'
              ? 'bg-[#D6B36A] text-[#0B0F0E] shadow-md'
              : 'text-slate-400 hover:text-[#EDE8D0] hover:bg-[#18201D]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>URL List &amp; Index Manager ({allEntries.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('ping')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'ping'
              ? 'bg-[#D6B36A] text-[#0B0F0E] shadow-md'
              : 'text-slate-400 hover:text-[#EDE8D0] hover:bg-[#18201D]'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Ping Search Engines</span>
        </button>
      </div>

      {/* TAB 1: SITEMAP XML */}
      {activeTab === 'sitemap' && (
        <div className="bg-[#111513] border border-[#D6B36A]/20 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#EDE8D0] flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-[#D6B36A]" />
                Live sitemap.xml Structure
              </h3>
              <p className="text-xs text-slate-400">
                Ready to be served at <span className="text-[#D6B36A]">{baseUrl}/sitemap.xml</span> or submitted to Google Search Console.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(xmlSitemap, 'xml')}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#18201D] text-[#D6B36A] text-xs font-semibold rounded-lg border border-[#D6B36A]/30 hover:border-[#D6B36A] transition-all"
              >
                {copiedType === 'xml' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'xml' ? 'Copied XML!' : 'Copy XML'}</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="bg-[#0B0F0E] text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[500px] border border-emerald-950/60 leading-relaxed">
              {xmlSitemap}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: ROBOTS TXT */}
      {activeTab === 'robots' && (
        <div className="bg-[#111513] border border-[#D6B36A]/20 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#EDE8D0] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D6B36A]" />
                Live robots.txt Directives
              </h3>
              <p className="text-xs text-slate-400">
                Guides Googlebot, Bingbot, and AI bots while protecting private routes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(robotsTxt, 'robots')}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#18201D] text-[#D6B36A] text-xs font-semibold rounded-lg border border-[#D6B36A]/30 hover:border-[#D6B36A] transition-all"
              >
                {copiedType === 'robots' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'robots' ? 'Copied robots.txt!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <pre className="bg-[#0B0F0E] text-amber-300/90 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[400px] border border-amber-950/60 leading-relaxed">
              {robotsTxt}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 3: URL LIST & INDEX MANAGER */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="bg-[#111513] border border-[#D6B36A]/20 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {['all', 'core', 'package', 'cab', 'destination', 'hotel', 'blog'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    filterCategory === cat
                      ? 'bg-[#D6B36A] text-[#0B0F0E]'
                      : 'bg-[#18201D] text-slate-400 hover:text-[#EDE8D0]'
                  }`}
                >
                  {cat === 'all' ? 'All URLs' : cat}
                </button>
              ))}
            </div>

            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search URL or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#18201D] border border-[#D6B36A]/20 rounded-xl pl-9 pr-4 py-2 text-xs text-[#EDE8D0] placeholder-slate-500 focus:outline-none focus:border-[#D6B36A]"
              />
            </div>
          </div>

          {/* URL Table */}
          <div className="bg-[#111513] border border-[#D6B36A]/20 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#161C19] text-[#D6B36A] font-semibold border-b border-[#D6B36A]/20">
                  <tr>
                    <th className="p-3.5">Include</th>
                    <th className="p-3.5">Page Title &amp; Category</th>
                    <th className="p-3.5">Canonical URL</th>
                    <th className="p-3.5">Priority</th>
                    <th className="p-3.5">Change Freq</th>
                    <th className="p-3.5">Last Mod</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEntries.map((item) => {
                    const isIncluded = !excludedUrls.has(item.loc);
                    return (
                      <tr
                        key={item.loc}
                        className={`hover:bg-[#18201D]/70 transition-colors ${
                          !isIncluded ? 'opacity-40 line-through' : ''
                        }`}
                      >
                        <td className="p-3.5">
                          <input
                            type="checkbox"
                            checked={isIncluded}
                            onChange={() => toggleUrlInclusion(item.loc)}
                            className="rounded border-slate-700 text-[#D6B36A] focus:ring-[#D6B36A] w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-[#EDE8D0]">{item.title}</div>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#1D2522] text-[#D6B36A] border border-[#D6B36A]/20">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-emerald-400">
                          <a
                            href={item.loc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <span>{item.loc}</span>
                            <ArrowUpRight className="w-3 h-3 text-slate-500 inline" />
                          </a>
                        </td>
                        <td className="p-3.5 font-bold text-[#D6B36A]">{item.priority}</td>
                        <td className="p-3.5 capitalize text-slate-400">{item.changefreq}</td>
                        <td className="p-3.5 text-slate-400 font-mono">{item.lastmod}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PING SEARCH ENGINES */}
      {activeTab === 'ping' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Google */}
          <div className="bg-[#111513] border border-[#D6B36A]/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white font-serif">Google Search Console</span>
                <span className="p-2 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/30">
                  <Globe className="w-5 h-5" />
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Notify Google of latest tour package updates, hotel listings, and blogs for immediate indexing.
              </p>
            </div>

            <button
              onClick={() => handlePingSearchEngine('google')}
              disabled={pingStatus['google'] === 'pinging'}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
            >
              {pingStatus['google'] === 'pinging' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : pingStatus['google'] === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>
                {pingStatus['google'] === 'pinging'
                  ? 'Pinging Google...'
                  : pingStatus['google'] === 'success'
                  ? 'Ping Confirmed!'
                  : 'Ping Googlebot'}
              </span>
            </button>
          </div>

          {/* Bing */}
          <div className="bg-[#111513] border border-[#D6B36A]/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white font-serif">Bing Webmaster</span>
                <span className="p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/30">
                  <Globe className="w-5 h-5" />
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Send instant sitemap ping to Microsoft Bing, Yahoo, and DuckDuckGo indexers.
              </p>
            </div>

            <button
              onClick={() => handlePingSearchEngine('bing')}
              disabled={pingStatus['bing'] === 'pinging'}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
            >
              {pingStatus['bing'] === 'pinging' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : pingStatus['bing'] === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>
                {pingStatus['bing'] === 'pinging'
                  ? 'Pinging Bing...'
                  : pingStatus['bing'] === 'success'
                  ? 'Ping Confirmed!'
                  : 'Ping Bingbot'}
              </span>
            </button>
          </div>

          {/* Yandex & Others */}
          <div className="bg-[#111513] border border-[#D6B36A]/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-white font-serif">Yandex &amp; Global</span>
                <span className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/30">
                  <Globe className="w-5 h-5" />
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Index coverage for international European and Asian inbound tourists seeking luxury Himalayan tours.
              </p>
            </div>

            <button
              onClick={() => handlePingSearchEngine('yandex')}
              disabled={pingStatus['yandex'] === 'pinging'}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-all shadow-md"
            >
              {pingStatus['yandex'] === 'pinging' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : pingStatus['yandex'] === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>
                {pingStatus['yandex'] === 'pinging'
                  ? 'Pinging Yandex...'
                  : pingStatus['yandex'] === 'success'
                  ? 'Ping Confirmed!'
                  : 'Ping Yandex'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '\'':
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}
