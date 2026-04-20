# infinite-scale.sh - FULL EMPIRE LAUNCHER
#!/bin/bash
# chmod +x infinite-scale.sh → ./infinite-scale.sh

echo "🚀 Launching ManyChat Empire..."

# 1. Generate 10k keywords
node scale-10k.js

# 2. AI content 100 pages  
streamlit run ai-content-gen.py &

# 3. Build chunk 1 (1000 pages)
sed -i "s/KEYWORDS = \[/KEYWORDS = /; $(head -1000 10k-keywords.json | tail -n +2)/" generator.js
npm run build

# 4. Deploy
git add .
git commit -m "Scale to 1k pages"
git push origin main

echo "✅ Empire chunk 1 deployed. Repeat for 10k total."
echo "💰 Projected: $250k/yr passive + $60k agency."
