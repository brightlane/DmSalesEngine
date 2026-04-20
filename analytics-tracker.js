<!-- analytics-tracker.js - GA4 + LinkConnector pixel (Privacy-safe 2026)
Add to BASE_TEMPLATE before </body>. Tracks clicks, conversions, events.
Replace UA-XXXXX, your LinkConnector ID. Boosts attribution.
-->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID', { 
    'cookie_flags': 'SameSite=None;Secure',
    'anonymize_ip': true 
  });
</script>

<script>
// LinkConnector pixel (your affiliate network)
function lcPixel(url, offer) {
  const img = new Image();
  img.src = `https://secure.linkconnector.com/lc_pixel.gif?vid=YOUR_VID&uan=YOUR_UAN&offer=${offer}&click_url=${encodeURIComponent(url)}`;
  console.log('LC Track:', offer);
}

// Event tracking on all affiliate links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[rel="sponsored"], .cta');
  if (link) {
    const url = link.href;
    const offer = link.textContent.includes('FREE') ? 'freeMonth' : 
                  link.textContent.includes('50%') ? 'discount' : 'growIg';
    
    gtag('event', 'affiliate_click', {
      'event_category': 'ManyChat',
      'event_label': offer,
      'value': 47.00,  // Avg commission est.
      'currency': 'USD'
    });
    lcPixel(url, offer);
  }
});

// Pageview + scroll tracking
gtag('event', 'page_view', { page_title: document.title });
if (window.scrollY > 800) gtag('event', 'scroll_50');
</script>

<!-- Hotjar (Heatmaps for UX tweaks, free tier) -->
<script>
  (function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:HJID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
