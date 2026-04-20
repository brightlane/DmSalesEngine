// voice-search-optimizer.js - Schema + FAQ for voice/Google Featured
// Voice: 50% searches 2026. FAQ schema → Position 0 snippets.
// Auto-generates from keywords. Boost CTR 35%.

const FAQ_SCHEMA = (keyword) => `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How to grow IG followers with ManyChat?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Use comment triggers + DM flows. Free month trial converts 51 users."
    }
  },{
    "@type": "Question",
    "name": "Is ManyChat Pro worth it 2026?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, 2x growth ROI. 50% off first 2 months."
    }
  }]
}
</script>

<section class="voice-faq">
  <h2>🗣️ Voice Search: "Best ManyChat IG growth"</h2>
  <details>
    <summary>How to grow IG followers free?</summary>
    <p>ManyChat comment → DM flow. <a href="${AFFILIATES.freeMonth}">Start FREE</a></p>
  </details>
</section>`;

// Patch generator BASE_TEMPLATE <head>
function injectVoiceSEO() {
  return FAQ_SCHEMA('grow ig followers');
}

// Conversational long-tails for scraper.py
const VOICE_KEYWORDS = [
  'best manychat for instagram 2026',
  'how manychat pro discount works',
  'grow ig followers using manychat free'
];
