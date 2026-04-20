// generator.js - COMPLETE & FIXED (Copy-paste ENTIRELY)
const fs = require('fs');
const path = require('path');

const OUT_DIR = './dist';
const PAGES_DIR = `${OUT_DIR}/pages`;

// YOUR AFFILIATE LINKS
const AFFILIATES = {
  growIg: 'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo',
  pricing: 'https://manychat.partnerlinks.io/98hj6b3pr28k-4znb59',
  freeMonth: 'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e',
  discount: 'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14',
  default: 'https://manychat.partnerlinks.io/nwkkk7vkps17'
};

// KEYWORDS
const KEYWORDS = [
  'grow ig followers free', 'manychat pro discount 2026', 'instagram dm automation',
  'manychat instagram growth', 'free manychat pro trial', 'manychat pricing review'
];

// 🆕 FAQ_SCHEMA FUNCTION (FIXES ERROR)
function FAQ_SCHEMA(keyword) {
  return `
<script type="application/ld+json">
{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How to ${keyword}?","acceptedAnswer":{"@type":"Answer","text":"Use ManyChat Pro DM automation + free trial."}}]}
</script>`;
}

// BASE HTML TEMPLATE
const BASE_TEMPLATE = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{{TITLE}} - ManyChat Pro</title><meta name="description" content="{{DESCRIPTION}}"><link rel="canonical" href="https://brightlane.github.io{{CANONICAL}}">${FAQ_SCHEMA('grow ig followers')}<style>body{font-family:Arial;margin:0;padding:20px;max-width:800px;margin:auto}.cta{background:#1a73e8;color:white;padding:15px 25px;display:inline-block;border-radius:5px;text-decoration:none;font-weight:bold}</style></head><body><h1>{{TITLE}}</h1><p>ManyChat automation guide for ${keyword}.</p><a href="${AFFILIATES.freeMonth}" class="cta" rel="sponsored">First Month FREE</a> <a href="${AFFILIATES.growIg}" class="cta" rel="sponsored">Grow IG Now</a><footer>Affiliate links. © 2026</footer></body></html>`;

// GENERATE PAGE
function generatePage(keyword) {
  const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const dir = `${PAGES_DIR}/${slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const title = keyword.split(' ').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
  const desc = `ManyChat ${keyword} guide 2026. Free trial available.`;
  
  let html = BASE_TEMPLATE
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{CANONICAL}}/g, `/pages/${slug}/`);
  
  fs.writeFileSync(`${dir}/index.html`, html);
  return `/pages/${slug}/`;
}

// MAIN BUILD
function buildSite() {
  console.log('🚀 Building ManyChat Empire...');
  
  if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(PAGES_DIR, { recursive: true });
  
  const urls = [];
  for (let keyword of KEYWORDS) {
    const url = generatePage(keyword);
    urls.push(url);
    console.log(`✅ ${url}`);
  }
  
  // index.html fallback
  fs.writeFileSync(`${OUT_DIR}/index.html`, '<h1>🚀 ManyChat Empire Live</h1><a href="/pages/grow-ig-followers-free/">Grow IG Free</a>');
  
  // Sitemap
  const sitemap = `<?xml version="1.0"?><urlset><url><loc>https://brightlane.github.io/</loc></url>${urls.map(u=>`<url><loc>https://brightlane.github.io${u}</loc></url>`).join('') }</urlset>`;
  fs.writeFileSync(`${OUT_DIR}/sitemap.xml`, sitemap);
  
  console.log(`\n🎉 SUCCESS! ${KEYWORDS.length} pages → https://brightlane.github.io`);
}

buildSite();
