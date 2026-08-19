import { TOUR_PACKAGES, CAB_OPTIONS } from '../data/travelData';
import { ADDITIONAL_PACKAGES } from '../data/additionalPackages';
import { INITIAL_DESTINATIONS, INITIAL_HOTELS } from '../data/initialStoreData';
import { BLOG_POSTS } from '../data/blogData';
import { TourPackage, HotelItem, DestinationItem, CabOption } from '../types';

export interface SitemapCrawlerOptions {
  baseUrl?: string;
  includeImages?: boolean;
  includeCoreSections?: boolean;
  includePackages?: boolean;
  includeHotels?: boolean;
  includeDestinations?: boolean;
  includeBlogs?: boolean;
  includeCabs?: boolean;
  customPackages?: TourPackage[];
  customHotels?: HotelItem[];
  customDestinations?: DestinationItem[];
  lastModDate?: string;
}

export interface CrawledSitemapEntry {
  url: string;
  title: string;
  category: 'core' | 'package' | 'hotel' | 'blog' | 'destination' | 'cab';
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  image?: {
    loc: string;
    title: string;
    caption?: string;
  };
}

export interface SitemapGenerationResult {
  xmlContent: string;
  totalUrls: number;
  imageCount: number;
  categories: {
    core: number;
    packages: number;
    hotels: number;
    blogs: number;
    destinations: number;
    cabs: number;
  };
  generatedAt: string;
  baseUrl: string;
  entries: CrawledSitemapEntry[];
}

/**
 * Escapes XML special characters safely
 */
function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Resolves full canonical URL starting from root
 */
function resolveCanonicalUrl(baseUrl: string, pathOrHash: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  if (!pathOrHash || pathOrHash === '/' || pathOrHash === '') {
    return `${cleanBase}/`;
  }
  if (pathOrHash.startsWith('http://') || pathOrHash.startsWith('https://')) {
    return pathOrHash;
  }
  if (pathOrHash.startsWith('#')) {
    return `${cleanBase}/${pathOrHash}`;
  }
  if (pathOrHash.startsWith('/')) {
    return `${cleanBase}${pathOrHash}`;
  }
  return `${cleanBase}/${pathOrHash}`;
}

/**
 * Resolves full image URL
 */
function resolveImageUrl(baseUrl: string, imagePath?: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const fallback = `${cleanBase}/images/sikkim_hero_banner_1785680563996.jpg`;
  if (!imagePath) return fallback;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  if (imagePath.startsWith('/')) return `${cleanBase}${imagePath}`;
  return `${cleanBase}/${imagePath}`;
}

/**
 * Primary Crawler Function: Gathers all active packages, hotels, blogs, destinations, and routes,
 * ensuring all indexed routes correctly point to the root domain.
 */
export function generateCrawlerSitemap(options: SitemapCrawlerOptions = {}): SitemapGenerationResult {
  const baseUrl = options.baseUrl || 'https://offbeatdestination.in';
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const today = options.lastModDate || new Date().toISOString().split('T')[0];
  const includeImages = options.includeImages !== false;

  const entries: CrawledSitemapEntry[] = [];
  const urlTracker = new Set<string>();

  const addEntry = (entry: CrawledSitemapEntry) => {
    if (!urlTracker.has(entry.url)) {
      urlTracker.add(entry.url);
      entries.push(entry);
    }
  };

  // 1. CORE LANDING & CONCIERGE HUBS (Root Canonical Routes)
  if (options.includeCoreSections !== false) {
    const coreRoutes = [
      {
        path: '',
        title: 'OffbeatDestination Travels - Official Sikkim & Darjeeling Tourism Portal',
        priority: 1.0,
        changefreq: 'daily' as const,
        image: {
          loc: resolveImageUrl(cleanBase, '/images/sikkim_hero_banner_1785680563996.jpg'),
          title: 'Offbeat Destination Travels Gangtok HQ Portal',
          caption: 'Govt. Registered Sikkim Tour Agency (offbeatdestination.in)',
        },
      },
      {
        path: '#packages',
        title: 'Handcrafted Sikkim & Darjeeling Tour Packages (5N/6D, 6N/7D, 7N/8D)',
        priority: 0.95,
        changefreq: 'daily' as const,
        image: {
          loc: resolveImageUrl(cleanBase, '/images/yumthang_zero_point_1785680592273.jpg'),
          title: 'Signature Sikkim Holiday Packages',
          caption: 'Zero Point, Yumthang, Nathula Pass & Pelling Tours',
        },
      },
      {
        path: '#cabs',
        title: 'Gangtok Taxi Rental & Luxury Toyota Innova Crysta Cab Fleet',
        priority: 0.90,
        changefreq: 'daily' as const,
        image: {
          loc: resolveImageUrl(cleanBase, '/images/innova_crysta_cab_1785680577329.jpg'),
          title: 'Innova Crysta Cab Rental Sikkim',
          caption: 'Official NJP, Bagdogra, Gangtok, and North Sikkim Taxi Service',
        },
      },
      {
        path: '#hotels',
        title: 'Affiliated Luxury Hotels & Mountain View Resorts Directory',
        priority: 0.88,
        changefreq: 'weekly' as const,
        image: {
          loc: resolveImageUrl(cleanBase, '/images/ravangla_buddha_park_1785680605794.jpg'),
          title: 'Sikkim & Darjeeling Luxury Hotels',
          caption: 'Hand-vetted 3-Star, 4-Star & 5-Star Heritage Mountain Resorts',
        },
      },
      {
        path: '#destinations',
        title: 'Sikkim Destination Guide & High-Altitude Travel Directory',
        priority: 0.90,
        changefreq: 'daily' as const,
      },
      {
        path: '#planner',
        title: 'AI Personalized Sikkim Trip Planner & Dynamic Budget Estimator',
        priority: 0.90,
        changefreq: 'daily' as const,
      },
      {
        path: '#calculator',
        title: 'Instant Sikkim Tour Cost & Cab Tariff Calculator',
        priority: 0.85,
        changefreq: 'weekly' as const,
      },
      {
        path: '#offers',
        title: 'Seasonal Himalayan Tour Discounts & Early-Bird Booking Offers',
        priority: 0.85,
        changefreq: 'daily' as const,
      },
      {
        path: '#reviews',
        title: '500+ Verified Traveler Reviews & 4.9-Star Google Ratings',
        priority: 0.80,
        changefreq: 'weekly' as const,
      },
      {
        path: '#blog',
        title: 'Himalayan Travel Chronicles, Permit Advice & Route Updates',
        priority: 0.85,
        changefreq: 'weekly' as const,
      },
      {
        path: '#faqs',
        title: 'Frequently Asked Questions - Nathula Permits, Weather & Acclimatization',
        priority: 0.78,
        changefreq: 'weekly' as const,
      },
      {
        path: '#checklist',
        title: 'High-Altitude Himalayan Packing Checklist & Winter Gear Guide',
        priority: 0.75,
        changefreq: 'monthly' as const,
      },
      {
        path: '#gallery',
        title: 'HD Photography & 4K Cinematic Video Gallery of Sikkim & Bhutan',
        priority: 0.75,
        changefreq: 'weekly' as const,
      },
      {
        path: '#about',
        title: 'About OffbeatDestination Travels - Govt Registered Travel Agency Gangtok',
        priority: 0.80,
        changefreq: 'monthly' as const,
      },
      {
        path: '#contact',
        title: 'Contact Local Tour Experts in Gangtok - 24x7 WhatsApp & Phone Support',
        priority: 0.85,
        changefreq: 'weekly' as const,
      },
    ];

    coreRoutes.forEach((route) => {
      addEntry({
        url: resolveCanonicalUrl(cleanBase, route.path),
        title: route.title,
        category: 'core',
        lastmod: today,
        changefreq: route.changefreq,
        priority: route.priority,
        image: includeImages ? route.image : undefined,
      });
    });
  }

  // 2. CRAWL TOUR PACKAGES (All Primary & Additional Handcrafted Packages)
  if (options.includePackages !== false) {
    const allPackagesMap = new Map<string, TourPackage>();
    // Collect from standard packages
    TOUR_PACKAGES.forEach((p) => allPackagesMap.set(p.id, p));
    // Collect from additional packages
    ADDITIONAL_PACKAGES.forEach((p) => allPackagesMap.set(p.id, p));
    // Collect from custom/dynamic store packages
    if (options.customPackages && options.customPackages.length > 0) {
      options.customPackages.forEach((p) => allPackagesMap.set(p.id, p));
    }

    allPackagesMap.forEach((pkg) => {
      const packageUrl = resolveCanonicalUrl(cleanBase, `#package-${pkg.id}`);
      const priceText = pkg.priceStarting ? ` Starting ₹${pkg.priceStarting.toLocaleString('en-IN')}` : '';
      addEntry({
        url: packageUrl,
        title: `${pkg.title} (${pkg.duration})${priceText} | OffbeatDestination Travels`,
        category: 'package',
        lastmod: today,
        changefreq: 'daily',
        priority: 0.92,
        image: includeImages && pkg.heroImage
          ? {
              loc: resolveImageUrl(cleanBase, pkg.heroImage),
              title: `${pkg.title} - ${pkg.duration}`,
              caption: `${pkg.location || 'Sikkim & Darjeeling'}. Highlights: ${pkg.highlights?.slice(0, 3).join(', ') || 'Custom Himalayan Itinerary'}`,
            }
          : undefined,
      });
    });
  }

  // 3. CRAWL AFFILIATED HOTELS & RESORTS
  if (options.includeHotels !== false) {
    const allHotelsMap = new Map<string, HotelItem>();
    INITIAL_HOTELS.forEach((h) => allHotelsMap.set(h.id, h));
    if (options.customHotels && options.customHotels.length > 0) {
      options.customHotels.forEach((h) => allHotelsMap.set(h.id, h));
    }

    // Key Hotel Hub Clusters
    const hotelHubs = [
      { slug: '#hotels-gangtok', title: 'Top 3★, 4★ & 5★ Luxury Hotels in Gangtok', desc: 'Central MG Marg, Dzongu View & Casino Resorts' },
      { slug: '#hotels-pelling', title: 'Kanchenjunga Facing Luxury Resorts in Pelling', desc: 'Glass Skywalk & Pemayangtse view accommodations' },
      { slug: '#hotels-lachung', title: 'Cozy Mountain Wood Cottages in Lachung & Yumthang', desc: 'Acclimatized valley view homestays & retreats' },
      { slug: '#hotels-lachen', title: 'High-Altitude Stays & Alpine Resorts in Lachen', desc: 'Gurudongmar Lake gateway luxury wood chalets' },
      { slug: '#hotels-darjeeling', title: 'Heritage Tea Estate & Colonial Luxury Hotels in Darjeeling', desc: 'Mall Road & Tiger Hill view suites' },
      { slug: '#hotels-bhutan', title: 'Luxury 4★ & 5★ Dzong Hotels in Thimphu & Paro', desc: 'Traditional Bhutanese luxury architecture' },
    ];

    hotelHubs.forEach((hub) => {
      addEntry({
        url: resolveCanonicalUrl(cleanBase, hub.slug),
        title: `${hub.title} | OffbeatDestination Travels`,
        category: 'hotel',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.85,
      });
    });

    // Individual crawled hotels
    allHotelsMap.forEach((hotel) => {
      const hotelUrl = resolveCanonicalUrl(cleanBase, `#hotel-${hotel.id}`);
      addEntry({
        url: hotelUrl,
        title: `${hotel.name} (${hotel.category || 'Luxury Hotel'}) - ${hotel.destination}`,
        category: 'hotel',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.82,
        image: includeImages && hotel.image
          ? {
              loc: resolveImageUrl(cleanBase, hotel.image),
              title: `${hotel.name} - ${hotel.destination}`,
              caption: hotel.description?.slice(0, 160) || `${hotel.category} in ${hotel.destination}`,
            }
          : undefined,
      });
    });
  }

  // 4. CRAWL HIMALAYAN BLOG ARTICLES & PERMIT GUIDES
  if (options.includeBlogs !== false) {
    BLOG_POSTS.forEach((blog) => {
      const blogUrl = resolveCanonicalUrl(cleanBase, `#blog-${blog.slug || blog.id}`);
      addEntry({
        url: blogUrl,
        title: `${blog.title} | Sikkim Travel Guide`,
        category: 'blog',
        lastmod: blog.publishedDate && !isNaN(Date.parse(blog.publishedDate)) ? new Date(blog.publishedDate).toISOString().split('T')[0] : today,
        changefreq: 'weekly',
        priority: 0.86,
        image: includeImages && blog.coverImage
          ? {
              loc: resolveImageUrl(cleanBase, blog.coverImage),
              title: blog.title,
              caption: blog.summary?.slice(0, 160) || blog.title,
            }
          : undefined,
      });
    });
  }

  // 5. CRAWL DESTINATION GUIDES
  if (options.includeDestinations !== false) {
    const allDestMap = new Map<string, DestinationItem>();
    INITIAL_DESTINATIONS.forEach((d) => allDestMap.set(d.id, d));
    if (options.customDestinations && options.customDestinations.length > 0) {
      options.customDestinations.forEach((d) => allDestMap.set(d.id, d));
    }

    allDestMap.forEach((dest) => {
      const destUrl = resolveCanonicalUrl(cleanBase, `#dest-${dest.slug || dest.id}`);
      addEntry({
        url: destUrl,
        title: `${dest.name} Tour Guide & Top Attractions (${dest.region})`,
        category: 'destination',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.88,
        image: includeImages && dest.heroImage
          ? {
              loc: resolveImageUrl(cleanBase, dest.heroImage),
              title: `${dest.name} - ${dest.region}`,
              caption: dest.shortDescription || dest.fullOverview?.slice(0, 150),
            }
          : undefined,
      });
    });
  }

  // 6. CRAWL CAB FLEET & HIGH-DEMAND MOUNTAIN ROUTES
  if (options.includeCabs !== false) {
    CAB_OPTIONS.forEach((cab) => {
      const cabUrl = resolveCanonicalUrl(cleanBase, `#cab-${cab.id}`);
      addEntry({
        url: cabUrl,
        title: `${cab.model} Taxi Booking Gangtok (${cab.capacity}, ₹${cab.ratePerDay}/day)`,
        category: 'cab',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.84,
        image: includeImages && cab.image
          ? {
              loc: resolveImageUrl(cleanBase, cab.image),
              title: `${cab.model} Cab Rental Gangtok`,
              caption: `Best for ${cab.bestFor}. Daily rate: ₹${cab.ratePerDay}`,
            }
          : undefined,
      });
    });

    const cabRoutes = [
      { slug: '#route-njp-to-gangtok', title: 'NJP Railway Station to Gangtok Private Innova Crysta Cab Fare' },
      { slug: '#route-bagdogra-to-gangtok', title: 'Bagdogra Airport (IXB) to Gangtok Taxi Booking' },
      { slug: '#route-gangtok-to-darjeeling', title: 'Gangtok to Darjeeling Scenic Mountain Taxi Service' },
      { slug: '#route-north-sikkim-cabs', title: 'North Sikkim 4x4 Luxury SUV Cab Hire (Lachung & Zero Point)' },
      { slug: '#route-gangtok-to-nathula', title: 'Gangtok to Nathula Pass & Tsomgo Lake Army Approved Cab' },
    ];

    cabRoutes.forEach((route) => {
      addEntry({
        url: resolveCanonicalUrl(cleanBase, route.slug),
        title: `${route.title} | OffbeatDestination Travels`,
        category: 'cab',
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.83,
      });
    });
  }

  // Format XML output
  const xmlContent = formatSitemapXml(entries);

  // Statistics
  const categories = {
    core: entries.filter((e) => e.category === 'core').length,
    packages: entries.filter((e) => e.category === 'package').length,
    hotels: entries.filter((e) => e.category === 'hotel').length,
    blogs: entries.filter((e) => e.category === 'blog').length,
    destinations: entries.filter((e) => e.category === 'destination').length,
    cabs: entries.filter((e) => e.category === 'cab').length,
  };

  const imageCount = entries.filter((e) => Boolean(e.image?.loc)).length;

  return {
    xmlContent,
    totalUrls: entries.length,
    imageCount,
    categories,
    generatedAt: new Date().toISOString(),
    baseUrl: cleanBase,
    entries,
  };
}

/**
 * Converts sitemap entries into strict XML standard adhering to sitemaps.org schema
 */
export function formatSitemapXml(entries: CrawledSitemapEntry[]): string {
  const xmlLines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
    '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
    '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  ];

  entries.forEach((entry) => {
    xmlLines.push('  <url>');
    xmlLines.push(`    <loc>${escapeXml(entry.url)}</loc>`);
    xmlLines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
    xmlLines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
    xmlLines.push(`    <priority>${entry.priority.toFixed(2)}</priority>`);

    if (entry.image?.loc) {
      xmlLines.push('    <image:image>');
      xmlLines.push(`      <image:loc>${escapeXml(entry.image.loc)}</image:loc>`);
      if (entry.image.title) {
        xmlLines.push(`      <image:title>${escapeXml(entry.image.title)}</image:title>`);
      }
      if (entry.image.caption) {
        xmlLines.push(`      <image:caption>${escapeXml(entry.image.caption)}</image:caption>`);
      }
      xmlLines.push('    </image:image>');
    }

    xmlLines.push('  </url>');
  });

  xmlLines.push('</urlset>');
  return xmlLines.join('\n');
}
