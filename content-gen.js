// content-gen.js - LLM-powered content generator (OpenAI/Groq API)
// Scales pages with unique, SEO-rich content (EEAT 2026 compliant)
// npm i openai dotenv
// .env: OPENAI_API_KEY=sk-...

require('dotenv').config();
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPTS = {
  growIg: `Write 800-word SEO article on "Grow IG Followers Free with ManyChat 2026". 
  Include: Step-by-step flow setup, screenshots placeholders, testimonials, 
  comparison table vs Hootsuite/Buffer. Embed affiliate CTA naturally 3x.
  Tone: Helpful, expert marketer. Keywords: manychat instagram growth, free trial.
  End with disclosure: Affiliate links.`,
  pricing: `ManyChat Pro pricing review 2026: Full breakdown, features vs free plan, 
  ROI calculator (e.g., 2x leads). CTAs for 50% off/discount links. Table format.`
};

const AFFILIATE_INSERTS = [
  '<a href="https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e" class="cta">First Month FREE (51+ conv)</a>',
  '<a href="https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo">Grow IG Now</a>'
];

async function generateContent(promptKey, keyword) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',  // Or groq-llama3 for speed/$0.10/1M tokens
      messages: [{ role: 'user', content: PROMPTS[promptKey] + `\nKeyword focus: ${keyword}` }],
      max_tokens: 1200,
      temperature: 0.7
    });
    let content = completion.choices[0].message.content;
    
    // Inject affiliates randomly
    content = content.replace(/\[CTA\]/g, AFFILIATE_INSERTS[Math.floor(Math.random() * AFFILIATE_INSERTS.length)]);
    
    return content;
  } catch (err) {
    console.error('LLM Error:', err);
    return `<h2>${keyword}</h2><p>Detailed guide coming soon. <a href="${AFFILIATE_INSERTS[0]}" class="cta">Start Free Trial</a></p>`;
  }
}

// Integrate with generator: Replace template <main> with LLM content
async function enhanceGeneratorPage(slug, keyword) {
  const content = await generateContent('growIg', keyword);  // Rotate prompts
  const enhancedMain = `<main>${content}</main>`;
  // Patch into your BASE_TEMPLATE .replace('</main>', enhancedMain + '</main>')
  console.log(`Generated ${keyword.length} chars for ${slug}`);
  return enhancedMain;
}

// Bulk generate for all keywords
async function bulkContentGen(keywords) {
  const contents = {};
  for (const kw of keywords.slice(0, 10)) {  // Batch $0.50/10 pages
    contents[kw] = await enhanceGeneratorPage(kw.replace(/ /g, '-'), kw);
  }
  fs.writeFileSync('generated-content.json', JSON.stringify(contents, null, 2));
  console.log('✅ Content ready. Patch into generator.js BASE_TEMPLATE.');
}

bulkContentGen(KEYWORDS);  // From previous generator.js
