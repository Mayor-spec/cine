# CineScout — AI Film Development Intelligence Platform

CineScout is an elite film development intelligence engine functioning as an 8-agent virtual studio room. It synthesizes comprehensive screenplay evaluations, audience demographic modeling, festival positioning strategies, budget-to-scope containment assessments, risk matrices, and producer-ready **Executive Pitch Packs**.

---

## 🚀 Deploying to Vercel (Step-by-Step)

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit: CineScout AI Film Development Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Import Project on Vercel
1. Log in to [Vercel](https://vercel.com) and click **"Add New..." > "Project"**.
2. Select your imported repository.
3. In **Project Settings**:
   - **Framework Preset**: `Vite` (auto-detected)
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - `GEMINI_API_KEY`: *Your Google Gemini API Key* ([Get one for free at Google AI Studio](https://aistudio.google.com/app/apikey))
   - *(Optional)* `GEMINI_MODEL`: `gemini-2.5-flash` or `gemini-3.7-flash`
5. Click **Deploy**.

---

## 🛠️ Why Vercel Deployments Fail & How It Was Resolved

1. **Serverless API Routing**:
   - Vercel automatically treats files in `/api/` as serverless functions (`/api/scout.ts`, `/api/ask-room.ts`, `/api/health.ts`).
   - `vercel.json` is configured with `"/((?!api/.*).*)"` rewrite to ensure client-side Single Page Application routes don't shadow `/api/*` endpoints.

2. **Decoupled Serverless Backend (`/api/_lib/filmIntelligence.ts`)**:
   - The AI analysis engine is decoupled from dev-server middleware (`vite`), allowing Vercel's Node.js runtime to bundle and execute functions instantly without dependency conflicts.

3. **Resilient AI Fallbacks & Heuristics**:
   - If the `GEMINI_API_KEY` is not yet configured in Vercel or upstream limits are reached, CineScout automatically executes an in-depth heuristic evaluation so the application never crashes.

---

## 🔑 Environment Variables Reference

| Variable | Required | Description |
| :--- | :---: | :--- |
| `GEMINI_API_KEY` | **Recommended** | Google Gemini API Key from Google AI Studio. |
| `GEMINI_MODEL` | No | Target Gemini model alias (default: `gemini-2.5-flash`). |

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server (accessible at http://localhost:3000)
npm run dev
```

---

## 🏗️ Production Build & Verification

```bash
# Verify typecheck
npm run lint

# Build client and bundled server
npm run build
```
