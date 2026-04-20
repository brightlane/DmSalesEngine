// generator.js - Full Node.js script for ManyChat affiliate SEO site generator
// Run: node generator.js
// Outputs: ./dist/ with 100+ pages, sitemap.xml, robots.txt
// Customize: Edit KEYWORDS, AFFILIATE_URLS, TEMPLATE_HTML

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);

const OUT_DIR = './dist';
const PAGES_DIR = `${OUT_DIR}/pages`;
const KEYWORDS = [
  'grow ig followers free', 'manychat pro discount', 'instagram dm automation',
  'manychat instagram growth', 'free manychat pro trial', '50 off manychat',
  'best manychat flows 2026', 'grow instagram with manychat', 'manychat pricing review',
  // Add 1k+ via CSV import or scraper
];

const AFFILIATE_URLS = {
  growIg: 'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo',
  pricing: 'https://manychat.partnerlinks.io/98hj6b3pr28k-4znb59',
  freeMonth: 'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e', // 51 conv
  discount: 'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14',
  default: 'https://manychat.partnerlinks.io/nwkkk7vkps17'
};

const BASE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}} - ManyChat Review & Guide 2026</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <meta name="keywords" content="{{KEYWORDS}}, manychat pro, instagram growth">
  <link rel="canonical" href="https://yoursite.com{{CANONICAL}}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ManyChat Pro",
    "description": "Grow IG followers with automated DMs. First month FREE.",
    "offers": [{
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "{{PRIMARY_URL}}"
    }]
  }
  </script>
  <style>body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:20px;background:#f9f9f9;}
  .cta{background:#007cba;color:white;padding:15px 30px;text-decoration:none;border-radius:5px;display:inline-block;font-size:18px;}
  .cta:hover{background:#005a87;}.popup{opacity:0;transition:1s;}
  </style>
</head>
<body>
  <header>
    <h1>{{TITLE}}</h1>
    <nav><a href="/">Home</a> | <a href="/manychat-pricing/">Pricing</a> | <a href="/grow-ig-followers/">Grow IG</a></nav>
  </header>
  <main>
    <p><strong>Proven 2x IG Growth:</strong> Use ManyChat comment triggers → Auto DM flows → Viral follower gain.</p>
    <p>Step-by-step: Post reel → Keyword reply → {{PRIMARY_OFFER}} via <a href="{{PRIMARY_URL}}" rel="sponsored" class="cta" onclick="trackClick('{{PRIMARY_URL}}')">Primary CTA ({{PRIMARY_CLICKS}} conv)</a></p>
    <ul>
      <li><a href="{{PRIMARY_URL}}" rel="sponsored">Grow IG Followers Now</a></li>
      <li><a href="${AFFILIATE_URLS.freeMonth}" rel="sponsored">First Month FREE (Top Performer)</a></li>
      <li><a href="${AFFILIATE_URLS.pricing}" rel="sponsored">Pricing Details</a></li>
      <li><a href="${AFFILIATE_URLS.discount}" rel="sponsored">50% Off First 2 Months</a></li>
    </ul>
    <section id="trust">
      <h2>Why ManyChat Converts</h2>
      <p>Trust signals: 10M+ users, IG DM automation leader 2026. Disclosure: Affiliate links.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 ManyChat Affiliate Guide. <a href="/sitemap.xml">Sitemap</a></p>
  </footer>
  <script>
    function trackClick(url) { console.log('Click:', url); /* Add GA/LinkConnector pixel */ }
    setTimeout(() => { document.querySelector('.popup').style.opacity=1; }, 5000); // Discount popup
  </script>
</body></html>`;

// Generate single page
async function generatePage(keyword) {
  const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const pageDir = `${PAGES_DIR}/${slug}`;
  await mkdir(pageDir, { recursive: true });

  const title = keyword.charAt(0).toUpperCase() + keyword.slice(1);
  const desc = `Best way to ${keyword} using ManyChat Pro 2026. Free trial + 50% discount.`;
  const primaryUrl = AFFILIATE_URLS.freeMonth; // Highest conv
  const primaryClicks = '51'; // Your data

  let template = BASE_TEMPLATE
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{KEYWORDS}}/g, keyword)
    .replace(/{{CANONICAL}}/g, `/pages/${slug}/`)
    .replace(/{{PRIMARY_URL}}/g, primaryUrl)
    .replace(/{{PRIMARY_OFFER}}/g, 'Free Month FREE')
    .replace(/{{PRIMARY_CLICKS}}/g, primaryClicks);

  const filePath = `${pageDir}/index.html`;
  await writeFile(filePath, template);
  return `https://yoursite.com/pages/${slug}/`;
}

// Main generator
async function generateSite() {
  console.log('Generating ManyChat SEO affiliate site...');
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(PAGES_DIR, { recursive: true });

  const pageUrls = [];
  for (const kw of KEYWORDS) {
    const url = await generatePage(kw);
    pageUrls.push(url);
    console.log(`Generated: ${url}`);
  }

  // Copy your index.html to dist/
  if (fs.existsSync('index.html')) {
    fs.copyFileSync('index.html', `${OUT_DIR}/index.html`);
  }

  // sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yoursite.com/</loc><priority>1.0</priority></url>
  ${pageUrls.map(url => `<url><loc>${url}</loc><priority>0.8</priority></url>`).join('\n  ')}
</urlset>`;
  await writeFile(`${OUT_DIR}/sitemap.xml`, sitemap);

  // robots.txt
  const robots = `User-agent: *
Allow: /
Sitemap: https://yoursite.com/sitemap.xml`;
  await writeFile(`${OUT_DIR}/robots.txt`, robots);

  // affiliate-tracker.js
  await writeFile(`${OUT_DIR}/js/affiliate-tracker.js`, 'console.log("Tracking active");');

  console.log(`✅ Site generated in ${OUT_DIR}/ with ${pageUrls.length} pages. Deploy to Netlify/GitHub Pages.`);
}

generateSite().catch(console.error);
