#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

class ManyChatFeedersDaily {
  constructor() {
    this.outputDir = path.join(__dirname, 'output', 'manychat');
    this.socialDir = path.join(__dirname, 'output');
    this.siteUrl = 'https://bot.yourdomain.com';

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

    this.templates = ['starter','pro','business'];
    this.socialLines = { tiktok: [], reddit: [], twitter: [] };
  }

  async run() {
    fs.mkdirSync(this.outputDir, { recursive: true });
    fs.mkdirSync(this.socialDir, { recursive: true });

    const pages = [];
    let count = 0;

    for (const country of this.countries) {
      for (const template of this.templates) {
        const currency = this.currencies.find(c => c.country === country);
        if (!currency) continue;

        const base = 60 + Math.floor(Math.random() * 140);
        const price = Math.round(base * currency.rate);
        const affLink = this.pickAffiliate(country);
        const planName = this.templateToPlan(template);
        const pageUrl = `${this.siteUrl}/manychat/${country}-${template}-${currency.code.toLowerCase()}.html`;

        const html = this.generatePage(country, currency, template, planName, affLink, price, pageUrl);
        const filename = `${country}-${template}-${currency.code.toLowerCase()}.html`;
        fs.writeFileSync(path.join(this.outputDir, filename), html, 'utf8');

        pages.push({ loc: pageUrl, lastmod: new Date().toISOString(), priority: '0.8' });

        this.socialLines.tiktok.push(`🚀 ManyChat ${planName} | ${country.toUpperCase()}\n${currency.symbol}${price}/mo\n${affLink}\n${pageUrl}`);
        this.socialLines.reddit.push(`[ManyChat ${planName} | ${country.toUpperCase()}](${affLink})\n${currency.symbol}${price}/mo ManyChat affiliate plan.\n${pageUrl}`);
        this.socialLines.twitter.push(`🚀 ManyChat ${planName} | ${country.toUpperCase()}\n${currency.symbol}${price}/mo via affiliate\n${affLink}\n${pageUrl}`);
        count++;
      }
    }

    fs.writeFileSync(path.join(this.socialDir, 'social-ready-tiktok.txt'), this.socialLines.tiktok.join('\n\n') + '\n', 'utf8');
    fs.writeFileSync(path.join(this.socialDir, 'social-ready-reddit.txt'), this.socialLines.reddit.join('\n\n') + '\n', 'utf8');
    fs.writeFileSync(path.join(this.socialDir, 'social-ready-twitter.txt'), this.socialLines.twitter.join('\n\n') + '\n', 'utf8');

    this.writeSitemaps(pages);
    console.log(`✅ COMPLETE: ${count} ManyChat pages generated`);
  }

  pickAffiliate(country) {
    return this.affiliates[this.countries.indexOf(country) % this.affiliates.length];
  }

  templateToPlan(template) {
    return { starter: 'Starter', pro: 'Pro', business: 'Business' }[template] || 'Plan';
  }

  generatePage(country, currency, template, planName, affLink, price, pageUrl) {
    const title = `${currency.symbol}${price}/mo ManyChat ${planName} | ${country.toUpperCase()}`;
    const desc = `Earn 50% via ManyChat affiliate in ${currency.code}.`;

    return `<!DOCTYPE html>
<html lang="${country}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="${pageUrl}" />
</head>
<body>
  <h1>ManyChat ${planName}</h1>
  <p>${currency.symbol}${price}/mo</p>
  <a href="${affLink}">Get started</a>
</body>
</html>`;
  }

  writeSitemaps(pages) {
    const chunkSize = 45000;
    for (let i = 0; i < pages.length; i += chunkSize) {
      const chunk = pages.slice(i, i + chunkSize);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${chunk.map(p => `<url><loc>${p.loc}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`).join('')}
</urlset>`;
      fs.writeFileSync(path.join(this.socialDir, `sitemap-manychat-${Math.floor(i / chunkSize) + 1}.xml`), xml);
    }
  }
}

new ManyChatFeedersDaily().run();
