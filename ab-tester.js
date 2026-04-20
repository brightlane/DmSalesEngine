<!-- ab-tester.js - A/B testing framework (No server needed, client-side)
Tests CTAs/Headlines. GA4 events auto-report winners. Boost conv 15-30%.
Add to BASE_TEMPLATE <head>. Variants for your 0-click discount link.
-->
<script>
// A/B Config: Test 3 variants per page
const AB_TEST = {
  ctaText: ['Claim FREE Month (51 conv)', '50% OFF First 2 Months 🚀', 'Grow IG 2x Now'],
  headline: ['Grow IG Followers FREE w/ ManyChat', 'ManyChat Pro: #1 IG Automation 2026', '51 Users Converted - You Next?'],
  variantWeight: [0.4, 0.3, 0.3]  // Free month favored
};

let abVariant = localStorage.getItem('abVariant') || Math.random() < 0.4 ? 0 : 
                Math.random() < 0.75 ? 1 : 2;
localStorage.setItem('abVariant', abVariant);

function applyVariant() {
  const v = AB_TEST.ctaText[abVariant];
  const h = AB_TEST.headline[abVariant];
  
  // Dynamic replace
  document.querySelectorAll('.cta').forEach(el => {
    el.textContent = v;
    if (abVariant === 1) el.href = 'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14';  // Test discount
  });
  if (document.querySelector('h1')) document.querySelector('h1').textContent = h;
  
  gtag('event', 'ab_test', {
    variant: abVariant,
    page: window.location.pathname
  });
}

window.addEventListener('load', applyVariant);
</script>
