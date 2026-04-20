// generator.js - COMPLETE PRODUCTION VERSION (Copy-paste this ENTIRE file)
// This SINGLE file creates your entire ManyChat affiliate empire

const fs = require('fs');
const path = require('path');

const OUT_DIR = './dist';
const PAGES_DIR = `${OUT_DIR}/pages`;

// 🔥 YOUR AFFILIATE LINKS (UPDATE THESE)
const AFFILIATES = {
  growIg: 'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo',
  pricing: 'https://manychat.partnerlinks.io/98hj6b3pr28k-4znb59',
  freeMonth: 'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e', // 51 conv ⭐
  discount: 'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14',
  default: 'https://manychat.partnerlinks.io/nwkkk7vkps17'
};

// 🔥 KEYWORDS (Add more for scale)
const KEYWORDS = [
  'grow ig followers free', 'manychat pro discount 2026', 'instagram dm automation',
  'manychat instagram growth', 'free manychat pro trial', 'manychat pricing review',
  'best manychat flows', 'grow instagram manychat', 'manychat pro review'
];

// 🔥 BASE HTML TEMPLATE (Production optimized)
const BASE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{TITLE}} - ManyChat Pro 2026</title>
<meta name="description" content="{{DESCRIPTION}}">
<meta name="keywords" content="{{KEYWORDS}}">
<link rel="canonical" href="https://yoursite.github.io{{CANONICAL}}">
<link rel="manifest" href="/manifest.json">
<link rel="preload" href="/js/tracker.js" as="script">
<script type="application/ld+json">{{SCHEMA}}</script>
<style>body{font-family:system-ui,sans-serif;background:#f8f9fa;max-width:800px;margin:0 auto;padding:20px;line-height:1.6}h1{font-size:2.5em;color:#1a73e8}.cta{display:inline-block;background:#1a73e8;color:white;padding:15px 30px;text-decoration:none;border-radius:8px;font-weight:600;font-size:18px}.cta:hover{background:#1557b0}details{margin:20px 0}summary{cursor:pointer;font-weight:600}</style>
</head>
<body>
<header>
<h1>{{TITLE}}</h1>
<nav><a href="/">🏠 Home</a> | <a href="/pages/manychat-pricing-review/">💰 Pricing</a> | <a href="/pages/grow-ig-followers-free/">📈 IG Growth</a></nav>
</header>

<main>
<p><strong>✅ 2x IG Growth:</strong> ManyChat comment triggers → auto DMs → viral followers.</p>

<div style="background:#e8f4fd;padding:20px;border-radius:10px;margin:20px 0">
<h2>🎯 Top Converting Offers:</h2>
<a href="{{BEST_OFFER}}" class="cta" rel="sponsored">⭐ {{BEST_CTA}} (Highest Conv)</a><br><br>
<a href="${AFFILIATES.freeMonth}" class="cta" rel="sponsored" style="background:#10b981">First Month FREE</a>
<a href="${AFFILIATES.discount}" class="cta" rel="sponsored" style="background:#f59e0b;margin-left:10px">50% OFF 2 Months</a>
</div>

<section>
<h2>How It Works (3 Steps)</h2>
<ol>
<li>Post IG Reel → Keyword comment trigger</li>
<li>ManyChat auto-replies DM sequence</li>
<li><a href="${AFFILIATES.growIg}">Grow followers 2x</a> (proven)</li>
</ol>
</section>

${FAQ_SCHEMA('grow ig followers')}  <!-- Voice search -->

<div style="margin:20px 0;background:#f0f9ff;padding:20px;border-radius:10px">
<p><em>Affiliate disclosure: Commissioned links. 2026 results may vary.</em></p>
</div>
</main>

<footer style="text-align:center;padding:40px;background:#f1f5f9;margin-top:40px">
<p>© 2026 ManyChat Growth Hub | <a href="/sitemap.xml">Sitemap</a></p>
</footer>

<script src="/js/tracker.js"></script>
<script>if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js')</script>
</body></html>`;

// Generate ONE page
async function generatePage(keyword) {
  const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const dir = `${PAGES_DIR}/${slug}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const title = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const desc = `Grow IG fast with ManyChat ${keyword} 2026. Free trial + discount codes.`;
  
  // Best offer rotation (freeMonth wins)
  const bestOffer = AFFILIATES.freeMonth;
  const bestCTA = 'First Month FREE (51+ Conversions)';
  
  const schema = `{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How to ${keyword} with ManyChat?","acceptedAnswer":{"@type":"Answer","text":"Use automated DM flows + comment triggers. Free month available."}}]}`;
  
  let html = BASE_TEMPLATE
    .replace(/{{TITLE}}/g, title)
    .replace(/{{DESCRIPTION}}/g, desc)
    .replace(/{{KEYWORDS}}/g, keyword)
    .replace(/{{CANONICAL}}/g, `/pages/${slug}/`)
    .replace(/{{SCHEMA}}/g, schema)
    .replace(/{{BEST_OFFER}}/g, bestOffer)
    .replace(/{{BEST_CTA}}/g, bestCTA);
  
  fs.writeFileSync(`${dir}/index.html`, html);
  return `https://yoursite.github.io/pages/${slug}/`;
}

// 🔥 MAIN BUILD FUNCTION
async function buildSite() {
  console.log('🚀 Building ManyChat Affiliate Empire...');
  
  // Clean + create dirs
  if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(PAGES_DIR, { recursive: true });
  
  // Generate pages
  const urls = [];
  for (const keyword of KEYWORDS) {
    const url = await generatePage(keyword);
    urls.push(url);
    console.log(`✅ ${url}`);
  }
  
  // Copy YOUR index.html (rename yours to index.html first)
  if (fs.existsSync('index.html')) {
    fs.copyFileSync('index.html', `${OUT_DIR}/index.html`);
    console.log('✅ Your index.html copied');
  }
  
  // Sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://yoursite.github.io/</loc><priority>1.0</priority></url>
${urls.map(u => `<url><loc>${u}</loc><priority>0.8</priority>`).join('\n')}
</urlset>`;
  fs.writeFileSync(`${OUT_DIR}/sitemap.xml`, sitemap);
  
  // Robots.txt
  fs.writeFileSync(`${OUT_DIR}/robots.txt`, `User-agent: *
Allow: /
Sitemap: https://yoursite.github.io/sitemap.xml`);
  
  // PWA files
  fs.writeFileSync(`${OUT_DIR}/manifest.json`, JSON.stringify({
    name: "ManyChat IG Growth", short_name: "ManyChat", start_url: "/",
    display: "standalone", background_color: "#ffffff", theme_color: "#1a73e8",
    icons: [{ src: "data:image/svg+xml;base64,...", sizes: "192x192" }]
  }, null, 2));
  
  fs.writeFileSync(`${OUT_DIR}/sw.js`, `const CACHE="v1";self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))))`);
  
  // Tracker JS
  fs.writeFileSync(`${OUT_DIR}/js/tracker.js`, `console.log("Tracking ManyChat clicks");document.querySelectorAll("a[rel=sponsored],.cta").forEach(a=>{a.onclick=()=>console.log("Click:",a.href)})`);
  
  console.log(`\n🎉 EMPIRE BUILT! ${KEYWORDS.length} pages → dist/
📍 Live: https://yourusername.github.io
🔄 Automation: 4x daily via deploy.yml`);
}

buildSite();
