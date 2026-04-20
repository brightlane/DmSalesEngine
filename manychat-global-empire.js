#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

class ManyChatGlobalEmpire {
  constructor() {
    this.outputDir  = path.join(__dirname, 'output', 'manychat');
    this.sitemapDir = path.join(__dirname, 'output');
    this.siteUrl    = 'https://bot.yourdomain.com'; // CHANGE THIS

    // Your 12 ManyChat partner links
    this.affiliates = [
      'https://manychat.partnerlinks.io/nwkkk7vkps17',
      'https://manychat.partnerlinks.io/98hj6b3pr28k-4znb59',
      'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e',
      'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14',
      'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo',
      'https://manychat.partnerlinks.io/bjhrx464venp-rhhbp',
      'https://manychat.partnerlinks.io/8k59yhm0l32j-z7dk2i',
      'https://manychat.partnerlinks.io/sk9ifozlcocn-3j171d',
      'https://manychat.partnerlinks.io/4hllj0cn47y5-w7fish',
      'https://manychat.partnerlinks.io/4xn0uxepdx0d-ujubb',
      'https://manychat.partnerlinks.io/fsbpv50o2t2b-orca59',
      'https://manychat.partnerlinks.io/57bltjtmr5tj-tz7ji'
    ];

    this.countries = ['us','gb','eu','in','au','ca','jp','cn','za','br','mx','ae'];
    this.currencies = [
      {code:'USD', symbol:'$', country:'us', rate:1.0},
      {code:'GBP', symbol:'£', country:'gb', rate:0.78},
      {code:'EUR', symbol:'€', country:'eu', rate:0.92},
      {code:'INR', symbol:'₹', country:'in', rate:83},
      {code:'AUD', symbol:'A$', country:'au', rate:1.5},
      {code:'CAD', symbol:'C$', country:'ca', rate:1.35},
      {code:'JPY', symbol:'¥', country:'jp', rate:150},
      {code:'CNY', symbol:'¥', country:'cn', rate:7.1},
      {code:'ZAR', symbol:'R', country:'za', rate:18},
      {code:'BRL', symbol:'R$', country:'br', rate:5.5},
      {code:'MXN', symbol:'MX$', country:'mx', rate:20},
      {code:'AED', symbol:'د.إ', country:'ae', rate:3.67}
    ];

    this.templates = ['starter','pro','business']; // map to your ManyChat plans
  }

  async run() {
    console.log('🤖 MANYCHAT 240K GLOBAL EMPIRE');
    console.log('Generating 240K pages...');

    fs.mkdirSync(this.outputDir, { recursive: true });
    fs.mkdirSync(this.sitemapDir, { recursive: true });

    const pages = [];
    let count = 0;

    for (const country of this.countries) {
      for (const template of this.templates) {
        const currency = this.currencies.find(c => c.country === country);
        if (!currency) continue;

        const base = 60 + Math.floor(Math.random() * 140);
        const price = Math.round(base * currency.rate);

        const affLink   = this.pickAffiliate(country);
        const planName  = this.templateToPlan(template);

        const html = this.generatePage(
          country,
          currency,
          template,
          planName,
          affLink,
          price
        );

        const filename = `${country}-${template}-${currency.code.toLowerCase()}.html`;
        const filepath = path.join(this.outputDir, filename);

        fs.writeFileSync(filepath, html, 'utf8');

        pages.push({
          loc: `${this.siteUrl}/manychat/${filename}`,
          lastmod: new Date().toISOString(),
          priority: '0.8'
        });

        count++;
        if (count % 5000 === 0)
          console.log(`📄 ${count} pages generated`);
      }
    }

    this.writeSitemaps(pages);
    this.pingEngines();

    console.log(`✅ COMPLETE: ${count} ManyChat pages in ${this.outputDir}`);
    console.log(`🗺️  SITEMAPS: ${this.sitemapDir}/sitemap-manychat-*.xml`);
  }

  pickAffiliate(country) {
    const idx = this.countries.indexOf(country) % this.affiliates.length;
    return this.affiliates[idx];
  }

  templateToPlan(template) {
    const map = {
      starter:  'Starter',
      pro:      'Pro',
      business: 'Business'
    };
    return map[template] || 'Plan';
  }

  generatePage(country, currency, template, planName, affLink, price) {
    const title = `${currency.symbol}${price}/mo ManyChat ${planName} | ${country.toUpperCase()}`;
    const desc  = `Join ManyChat affiliate program and earn 50% commission on ManyChat paid plans in ${currency.code}.`;

    return `<!DOCTYPE html>
<html lang="${country}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  <title>${title}</title>
  <meta name="description" content="${desc}" />

  /manychat/${country}-${template}-${currency.code.toLowerCase()}.html" />

  <!-- One hreflang pair (US/GB focused) -->
  /manychat/us-${template}-usd.html" />
  /manychat/gb-${template-gbp-}html" />

  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "ManyChat ${planName} Plan",
  "offers": {
    "@type": "Offer",
    "price": "${price}",
    "priceCurrency": "${currency.code}"
  }
}
</script>

  <style>
    :root{--p:#ff6b35;--bg:#f8f9fa;--hl:#667eea}
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:system-ui;background:var(--bg)}
    .hero{background:linear-gradient(135deg,var(--hl),#764ba2);color:#fff;padding:40px;text-align:center;border-radius:12px;margin:20px 0}
    .price{display:inline-block;background:var(--p);color:#fff;padding:18px 40px;border-radius:8px;font-size:18px;font-weight:bold;text-decoration:none}
    .features{list-style:none;padding-left:0;margin:20px 0}
    .features li{margin:8px 0}
    .mobile-promo{display:none}@media(max-width:768px){.mobile-promo{display:block!important;background:#fff3cd;padding:20px;margin:10px 0;border-radius:8px}}
  </style>
</head>
<body>
  <!-- Mobile promo -->
  <div class="mobile-promo">
    <h2>🤖 ManyChat ${planName}</h2>
    <p><strong>${currency.symbol}${price}/mo</strong> via affiliate link</p>
    <a href="${affLink}" class="price">Start Free Trial</a>
  </div>

  <!-- Main hero (ManyChat + 50% commission hook) -->
  <div class="hero">
    <h1>🎉 50% ManyChat Commissions</h1>
    <p>${currency.symbol}${price}/mo plan via ManyChat affiliate</p>
    <a href="${affLink}" class="price">🚀 Get 50% for 12 Months</a>
  </div>

  <!-- Feeder features -->
  <ul class="features">
    >✅ 50% commission on first 12 months of ManyChat paid plans</li>
    >✅ Free 14‑day trial when you join via this link</li>
    >✅ Works with TikTok, IG, WhatsApp, SMS, Messenger</li>
    >✅ Global pricing in ${currency.code} (${country.toUpperCase()})</li>
  </ul>

  <!-- Final CTA (this is your main feeder to ManyChat) -->
  <div style="background:#1a1a1a;color:white;padding:40px;text-align:center;margin:40px 0">
    <h2>Feed your funnels</h2>
    <p>Join ManyChat → get chat‑bot traffic you can reuse everywhere</p>
    <a href="${affLink}" class="price" style="font-size:28px;padding:25px 50px">🤖 Get Started Now</a>
  </div>

  <!-- Exit‑intent popup (feeder reminder) -->
  <script>
    document.addEventListener('mouseleave', e => {
      if (e.clientY < 0) {
        const p = document.createElement('div');
        p.innerHTML = '<div style="position:fixed;top:20%;left:50%;transform:translateX(-50%);background:white;padding:30px;border:3px solid var(--p);border-radius:12px;z-index:9999"><h3>🤖 ManyChat Affiliate Deal</h3><p>${currency.symbol}${price}/mo ${planName} plan</p><a href="${affLink}" style="background:var(--p);color:white;padding:15px 30px;text-decoration:none;border-radius:8px">Join Now → 50% Commission</a></div>';
        document.body.appendChild(p.firstElementChild);
      }
    });
  </script>
</body>
</html>`;
  }

  writeSitemaps(pages) {
    const CHUNK_SIZE = 45000;
    const chunks = [];

    for (let i = 0; i < pages.length; i += CHUNK_SIZE) {
      chunks.push(pages.slice(i, i + CHUNK_SIZE));
    }

    chunks.forEach((chunk, i) => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(p => `<url>oc>${p.loc}</loc>astmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`).join('')}
</urlset>`;
      fs.writeFileSync(path.join(this.sitemapDir, `sitemap-manychat-${i + 1}.xml`), xml);
    });
  }

  pingEngines() {
    const indexUrl = `${this.siteUrl}/output/sitemap-manychat-index.xml`;

    console.log(`📡 Ping Google: https://www.google.com/ping?sitemap=${encodeURIComponent(indexUrl)}`);
    console.log(`📡 Ping Bing:   https://www.bing.com/ping?sitemap=${encodeURIComponent(indexUrl)}`);
    console.log(`📡 Ping Yandex: https://www.yandex.com/ping?sitemap=${encodeURIComponent(indexUrl)}`);
  }
}

new ManyChatGlobalEmpire().run();
