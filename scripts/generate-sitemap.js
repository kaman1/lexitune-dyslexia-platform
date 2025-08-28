const fs = require('node:fs');
const path = require('node:path');
const glob = require('glob');

// Configuration
const SITE_URL = 'https://tekimax.com';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const APP_DIR = path.join(process.cwd(), 'app');
const PAGES_DIR = path.join(process.cwd(), 'pages'); // If using pages directory
const CURRENT_DATE = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

// URL priority mappings
const PRIORITY_MAP = {
  '/': 1.0,
  '/contact': 0.8,
  '/defense': 0.8,
  '/ai-literacy': 0.8,
  '/legal/privacy-policy': 0.5,
  '/legal/terms-of-service': 0.5,
};

// URL change frequency mappings
const CHANGEFREQ_MAP = {
  '/': 'monthly',
  '/contact': 'monthly',
  '/defense': 'monthly',
  '/ai-literacy': 'monthly',
  '/legal/privacy-policy': 'yearly',
  '/legal/terms-of-service': 'yearly',
};

// Default values
const DEFAULT_PRIORITY = 0.7;
const DEFAULT_CHANGEFREQ = 'monthly';

// Find allowed routes only (home and contact)
function findAppRoutes() {
  const allowedRoutes = ['/', '/contact'];
  return allowedRoutes;
}

// No pages directory routes needed
function findPageRoutes() {
  return [];
}

// Generate sitemap XML
function generateSitemap() {
  let appRoutes = [];
  let pageRoutes = [];
  
  try {
    appRoutes = findAppRoutes();
  } catch (error) {
    console.error('Error finding app routes:', error);
  }
  
  try {
    pageRoutes = findPageRoutes();
  } catch (error) {
    console.error('Error finding page routes:', error);
  }
  
  // Combine routes and remove duplicates
  const routes = [...new Set([...appRoutes, ...pageRoutes])];
  
  // Generate XML content
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  for (const route of routes) {
    const url = `${SITE_URL}${route}`;
    const priority = PRIORITY_MAP[route] || DEFAULT_PRIORITY;
    const changefreq = CHANGEFREQ_MAP[route] || DEFAULT_CHANGEFREQ;
    
    xml += '  <url>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${CURRENT_DATE}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }
  
  xml += '</urlset>';
  
  // Write to file
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  console.log(`Sitemap generated at ${path.join(PUBLIC_DIR, 'sitemap.xml')} with ${routes.length} URLs`);
}

// Execute
generateSitemap(); 