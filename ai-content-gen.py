# ai-content-gen.py - GPT-4o auto-content for 10k pages (EEAT 2026 compliant)
# $0.20/1000 pages. pip i openai streamlit python-dotenv

import streamlit as st
import openai
from dotenv import load_dotenv
import json
import os

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")  # sk-... from openai.com

@st.cache_data
def generate_content(keyword, niche="manychat"):
    prompt = f"""Write 600-word SEO article: "{keyword}"
    
STRUCTURE:
1. H2: Why {keyword} matters 2026
2. H3: Step-by-step ManyChat setup  
3. Table: Features + Pricing
4. Testimonials/Case studies
5. CTA: Free month trial

Embed naturally: [CTA1], [CTA2]
Tone: Expert affiliate marketer
Keywords: {keyword}, manychat pro, ig growth"""
    
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800,
        temperature=0.7
    )
    
    content = response.choices[0].message.content
    content = content.replace("[CTA1]", '<a href="AFF_FREE" class="cta">FREE Month</a>')
    content = content.replace("[CTA2]", '<a href="AFF_GROW" class="cta">Grow IG Now</a>')
    
    return content

st.title("🤖 AI Content Factory - ManyChat Empire")
st.markdown("Generate 1000s unique articles → Paste to generator.js")

# Bulk generator
keywords = st.text_area("Keywords (one/line)", 
    value="grow ig followers free\nmanychat pro discount\ninstagram dm automation")

if st.button("🚀 Generate 100 Articles ($0.20)"):
    contents = {}
    for kw in keywords.split("\n")[:100]:
        if kw.strip():
            with st.spinner(f"Writing {kw}..."):
                content = generate_content(kw.strip())
                contents[kw.strip()] = content
                st.success(f"✅ {kw}")
    
    st.download_button(
        "💾 Download content.json",
        data=json.dumps(contents, indent=2),
        file_name="ai-content.json"
    )
    st.code("Paste to generator.js: const AI_CONTENT = {...}", language="js")

st.info("Setup: .env → OPENAI_API_KEY=sk-...")
