// monetization-automator.js - Dynamic affiliate rotator + bid manager
// Rotates top-perf links (e.g., 51-conv first), upsell flows.
// Fetches LC stats via API, auto-switches losers. npm i axios cron
// Cron job: Hourly optimization.

require('axios');
require('cron');
require('fs');

const LINKCONNECTOR_API = 'https://api.linkconnector.com/v3/reports/performance';
const YOUR_UAN = 'YOUR_UAN';

let offers = {
  freeMonth: { url: 'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e', conv: 51, active: true },
  discount: { url: 'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14', conv: 0, active: false },
  growIg: { url: 'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo', conv: 12, active: true }
};

async function fetchLCStats() {
  try {
    const { data } = await axios.get(LINKCONNECTOR_API, {
      params: { uan: YOUR_UAN, period: 'last_24h' }
    });
    data.forEach(report => {
      const key = report.offer_name.toLowerCase();
      if (offers[key]) offers[key].conv = report.conversions;
    });
  } catch (e) {
    console.log('LC API demo mode');
  }
}

function getBestOffer() {
  return Object.values(offers)
    .filter(o => o.active)
    .sort((a, b) => b.conv - a.conv)[0].url;
}

function generateRotatorJS() {
  const best = getBestOffer();
  const js = `
<script>
window.bestManyChatOffer = '${best}';
document.querySelectorAll('.dynamic-cta').forEach(el => {
  el.href = bestManyChatOffer;
  el.textContent = bestManyChatOffer.includes('emwcbue') ? 'FREE Month (Top Conv)' : 'Grow IG Now';
});
</script>`;
  fs.writeFileSync('rotator.js', js);
  console.log(`✅ Rotator: ${best} is hero (CR: ${offers.freeMonth.conv})`);
}

// Cron: Hourly check + regenerate
const cronJob = require('cron').CronJob;
new cronJob('0 * * * *', async () => {
  await fetchLCStats();
  generateRotatorJS();
}, null, true);

generateRotatorJS();  // Initial
