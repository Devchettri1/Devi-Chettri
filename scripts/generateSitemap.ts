import fs from 'fs';
import path from 'path';
import { generateCrawlerSitemap } from '../src/utils/sitemapGenerator';

function buildSitemap() {
  console.log('Generating comprehensive crawler sitemap.xml...');
  const result = generateCrawlerSitemap({
    baseUrl: 'https://offbeatdestination.in',
    includeImages: true,
  });

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, result.xmlContent, 'utf8');
  console.log(`✓ Wrote ${result.totalUrls} canonical URLs to ${sitemapPath}`);
  console.log(`  - Packages: ${result.categories.packages}`);
  console.log(`  - Hotels: ${result.categories.hotels}`);
  console.log(`  - Blogs: ${result.categories.blogs}`);
  console.log(`  - Destinations: ${result.categories.destinations}`);
  console.log(`  - Cabs: ${result.categories.cabs}`);
  console.log(`  - Core: ${result.categories.core}`);
  console.log(`  - Images Indexed: ${result.imageCount}`);
}

buildSitemap();
