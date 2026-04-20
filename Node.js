const fs = require('fs');
const keywords = ['grow ig followers free', 'manychat pro discount 2026', 'instagram dm automation']; // Expand to 1k+
keywords.forEach(kw => {
  const filename = `pages/${kw.replace(/ /g, '-')}/index.html`;
  fs.mkdirSync(filename.split('/')[0], { recursive: true });
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>${kw.charAt(0).toUpperCase() + kw.slice(1)} - ManyChat Review 2026</title>
  <meta name="description" content="Grow IG followers fast with ManyChat Pro. ${kw.includes('free') ? 'First month FREE' : '50% off'}. Affiliate link.">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Product","name":"ManyChat Pro","offers":[{"@type":"Offer","price":"0","priceCurrency":"USD","availability":"https://schema.org/InStock"}]}
  </script>
</head>
<body>
  <h1>${kw} using ManyChat (Proven 2x Growth)</h1>
  <p>Step 1: Viral reel + comment keyword trigger.<br>
  Step 2: ManyChat freebie template auto-DMs your affiliate flow.<br>
  <a href="https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e" rel="sponsored">Claim First Month FREE (51 conv)</a> | 
  <a href="https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo">Grow IG Now</a></p>
  <script>/* Popup for 50% off: https://manychat.partnerlinks.io/t8let4hhqtqg-wki14 */</script>
  <a href="/">Home</a> <!-- Internal link juice -->
</body></html>`;
  fs.writeFileSync(filename, html);
});
// Generate sitemap.xml with all URLs
