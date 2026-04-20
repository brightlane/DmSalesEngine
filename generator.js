// generator.js - 100% PRODUCTION READY (Copy-paste ALL)
const fs = require('fs');
const path = require('path');

const OUT_DIR = './dist';
const PAGES_DIR = `${OUT_DIR}/pages`;

// AFFILIATES
const AFFILIATES = {
  growIg: 'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo',
  freeMonth: 'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e'
};

// KEYWORDS
const KEYWORDS = [
  'grow ig followers free', 'manychat pro discount', 'instagram dm automation'
];

// BASE TEMPLATE (NO VARIABLES IN GLOBAL SCOPE)
const BASE_TEMPLATE = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width">
<title>PAGE_TITLE - ManyChat Pro</title><meta name="description" content="PAGE_DESC">
<style>body{font-family:Arial;padding:20px;max-width:800px;margin:auto}h1{color:#1a73e8}.cta{background:#1a73e8;color:white;padding:15px 30px;display:inline-block;border-radius:5px;text-decoration:none}</style></head>
<body><h1>PAGE_TITLE</h1><p>ManyChat growth guide.</p>
<a href="${AFFILIATES.freeMonth}" class="cta" rel="sponsored">First Month FREE</a>
<a href="${AFFILIATES.growIg}" class="cta" rel="sponsored">Grow IG Now</a>
<p>Affiliate disclosure. © 2026</p></body></html>`;

// GENERATE SINGLE PAGE
function generatePage(keyword) {
  const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const dir = `${PAGES_DIR}/${slug}`;
  fs.mkdirSync(dir, { recursive: true });
  
  const title = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  let html = BASE_TEMPLATE
    .replace(/PAGE_TITLE/g, title)
    .replace(/PAGE_DESC/g, `ManyChat ${keyword} 2026.`);
  
  fs.writeFileSync(`${dir}/index.html`, html);
  console.log(`✅ ${slug}`);
}

// BUILD ALL
function build() {
  console.log('🚀 Building...');
  if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  
  KEYWORDS.forEach(generatePage);
  
  // Homepage
  fs.writeFileSync(`${OUT_DIR}/index.html`, '<h1>🚀 ManyChat Empire</h1><a href="/pages/grow-ig-followers-free/">FREE Growth Guide</a>');
  
  // Sitemap  
  const urls = KEYWORDS.map(k => k.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
  const sitemap = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://brightlane.github.io/</loc></url>
${urls.map(slug => `<url><loc>https://brightlane.github.io/pages/${slug}/</loc></url>`).join('')}
</urlset>`;
  fs.writeFileSync(`${OUT_DIR}/sitemap.xml`, sitemap);
  
  console.log(`\n🎉 DONE! ${KEYWORDS.length} pages → https://brightlane.github.io`);
}

build();
