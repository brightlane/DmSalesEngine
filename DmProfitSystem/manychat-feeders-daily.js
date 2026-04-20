s.mkdirSync(this.outputDir, { recursive: true });
    fs.mkdirSync(this.socialDir, { recursive: true });

    const pages = [];
    let count = 0;

    for (const country of this.countries) {
      for (const template of this.templates) {
        const currency = this.currencies.find(c => c.country === country);
        if (!currency) continue;

        const base = 60 + Math.floor(Math.random() * 140);
        const price = Math.round(base * currency.rate);
        const affLink  = this.pickAffiliate(country);
        const planName  = this.templateToPlan(template);
        const pageUrl  = `https://bot.yourdomain.com/manychat/${country}-${template}-${currency.code.toLowerCase()}.html`;

        const html = this.generatePage(
          country,
          currency,
          template,
          planName,
          affLink,
          price,
          pageText
        );

        const filename = `${country}-${template}-${currency.code.toLowerCase()}.html`;
        const filepath = path.join(this.outputDir, filename);

        fs.writeFileSync(filepath, html, 'utf8');

        pages.push({
          loc: pageUrl,
          lastmod: new Date().toISOString(),
          priority: '0.8'
        });

        // TikTok line
        this.socialLines.tiktok.push(
          `🚀 Join ManyChat affiliate → 50% commission on ManyChat ${planName} | ${country.toUpperCase()}\n${currency.symbol}${price}/mo plan\n${affLink}\n${pageUrl}`
        );

        // Reddit line
        this.socialLines.reddit.push(
          `[ManyChat ${planName} | ${country.toUpperCase()}](${affLink})\n${currency.symbol}${price}/mo ManyChat affiliate plan → 50% commission for 12 months.\n${pageUrl}`
        );

        // Twitter line
        this.socialLines.twitter.push(
          `🚀 ManyChat ${planName} | ${country.toUpperCase()}\n${currency.symbol}${price}/mo via ManyChat affiliate\n${affLink}\n${pageUrl}`
        );

        count++;
      }
    }

    // Write social‑ready files
    fs.writeFileSync(
      path.join(this.socialDir, 'social-ready-tiktok.txt'),
      this.socialLines.tiktok.join('\n\n') + '\n',
      'utf8'
    );
    fs.writeFileSync(
      path.join(this.socialDir, 'social-ready-reddit.txt'),
      this.socialLines.reddit.join('\n\n') + '\n',
      'utf8'
    );
    fs.writeFileSync(
      path.join(this.socialDir, 'social-ready-twitter.txt'),
      this.socialLines.twitter.join('\n\n') + '\n',
      'utf8'
    );

    this.writeSitemaps(pages);
    this.pingEngines();

    console.log(`✅ COMPLETE: ${count} ManyChat pages generated`);
    console.log(`📁 ./output/manychat/`);
    console.log(`📁 Social feeds: ./output/social-ready-*.txt`);
  }

  pickAffiliate(country) {
    const idx = this.countries.indexOf(country) % this.affiliates.length;
    return this.affiliates[idx];
  }

  templateToPlan(template) {
    const map = {starter:'Starter', pro:'Pro', business:'Business'};
    return map[template] || 'Plan';
  }

  generatePage(country, currency, template, planName, affLink, price, pageUrl) {
    const title = `${currency.symbol}${price}/mo ManyChat ${planName} | ${country.toUpperCase()}`;
    const desc  = `Earn 50% via ManyChat affiliate in ${currency.code}.`;

    return `<!DOCTYPE html>
<html lang="${country}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1" />

  <title>${title}</title>
  <meta name="description" content="${desc}" />

  <link rel="canonical" href="${pageUrl}" />

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
    :root{--hl:#667eea;--p:#ff6b35;--bg:#f8f9fa}
    body{font-family:system-ui;background:var(--bg);color:#000}
    .hero{background:linear-gradient(135deg,var(--hl),#764ba2);color:#fff;padding:40px;text-align:center;border-radius:12px}
    .cta{display:inline-block;background:var(--p);color:#fff;padding:14px 30px;border-radius:8px;text-decoration:none}
  </style>
</head>
<body>
  <div class="hero">
    <h1>🎉 ManyChat ${planName}</h1>
    <p>${currency.symbol}${price}/mo ManyChat affiliate</p>
    <a href="${affLink}" class="cta">Click Here → 50% Commission</a>
  </div>
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
${chunk.map(p => `<url><loc>${p.loc}</loc><lastmod>${p.lastmod}</lastmod><priority>${p.priority}</priority></url>`).join('')}
</urlset>`;
      fs.writeFileSync(path.join(this.socialDir, `sitemap-manychat-${i + 1}.xml`), xml);
    });
  }

  pingEngines() {
    const indexUrl = `https://bot.yourdomain.com/output/sitemap-manychat-1.xml`;
    console.log(`📡 Ping Google: https://www.google.com/ping?sitemap=${indexUrl}`);
    console.log(`📡 Ping Bing: https://www.bing.com/ping?sitemap=${indexUrl}`);
