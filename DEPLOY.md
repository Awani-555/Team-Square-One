# 🚀 VendorVoice — Deployment Guide

## WHY IT WAS BROKEN (for reference)
1. Single root package.json mixing backend + frontend → Vercel/Render confused
2. Express 5 + React 19 + react-router-dom 7 breaking changes → crashes
3. Missing CORS config for Vercel URL → backend blocked frontend
4. Missing vercel.json → Vercel couldn't find frontend build

All fixed in this version.

---

## STEP 1: Push to GitHub

```bash
# In the vendorvoice/ folder:
git init
git add .
git commit -m "VendorVoice MVP"
git remote add origin https://github.com/YOUR_USERNAME/vendorvoice.git
git push -u origin main
```

---

## STEP 2: Deploy Backend on Render.com

1. Go to https://render.com → New → Web Service
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node app.js`
   - **Environment:** Node

4. Add Environment Variables (click "Environment" tab):
   ```
   MONGO_URI    = mongodb+srv://username:password@cluster.mongodb.net/vendorvoice
   JWT_SECRET   = any_long_random_string_here_abc123!@#xyz
   NODE_ENV     = production
   PORT         = 10000
   ```

5. Click Deploy → wait ~3 minutes
6. Test: visit `https://YOUR-APP.onrender.com/api/health`
   → Should return: `{"success":true,"message":"VendorVoice API running ✅"}`

7. Copy your Render URL (e.g. `https://team-square-one-bddx.onrender.com`)

---

## STEP 3: Deploy Frontend on Vercel

1. Go to https://vercel.com → New Project → Import from GitHub
2. Settings:
   - **Root Directory:** leave blank (uses vercel.json at root)
   - **Framework Preset:** Other (NOT Vite — vercel.json handles it)
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`

3. Add Environment Variable:
   ```
   VITE_API_URL = https://team-square-one-bddx.onrender.com
   ```
   ⚠️ Use YOUR actual Render URL from Step 2. NO trailing slash.

4. Click Deploy → wait ~2 minutes
5. Visit your Vercel URL → app should load and login should work

---

## STEP 4: Fix Existing Broken Deployments

### Fix Render (backend):
1. Render Dashboard → Your service → Environment
2. Make sure these are set:
   - `MONGO_URI` = your Atlas connection string
   - `JWT_SECRET` = any random string
   - `NODE_ENV` = production
3. Settings → Root Directory = `backend`
4. Settings → Start Command = `node app.js`
5. Click "Manual Deploy" → Deploy latest commit

### Fix Vercel (frontend):
1. Vercel Dashboard → Your project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://team-square-one-bddx.onrender.com`
3. Settings → Build & Output Settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
4. Deployments → Redeploy

---

## COMMON ERRORS

| Error | Fix |
|-------|-----|
| Vercel 404 | Check vercel.json exists at root. Check Output Directory = `frontend/dist` |
| Backend 502/crashed | Check MONGO_URI is set in Render env vars. Check Root Dir = `backend` |
| CORS error in console | Your Vercel URL must match `allowedOrigins` in `backend/app.js` |
| "Cannot connect to DB" | MongoDB Atlas → Network Access → Allow 0.0.0.0/0 |
| Render "Application failed to respond" | Check Start Command = `node app.js` (not `npm run dev`) |

---

## VERIFY IT'S WORKING

After both deploy:
1. `https://YOUR-RENDER-URL/api/health` → returns JSON ✅
2. `https://YOUR-VERCEL-URL` → shows login screen ✅
3. Register → login → add income → see earnings ✅
