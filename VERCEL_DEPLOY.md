# H2 Bombs - Vercel Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **Framework Preset:** Vite
5. **Root Directory:** Leave as `.` (root)
6. **Build Command:** `npm run build` (auto-detected)
7. **Output Directory:** `dist/public` (already in vercel.json)
8. **Install Command:** Leave default or use `npm install`

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### 3. Add Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

**Required:**
- `MAILCHIMP_API_KEY` = `your-mailchimp-api-key-us21`

**Optional:**
- `NODE_ENV` = `production` (auto-set by Vercel)

### 4. Deploy
Click **Deploy** and wait ~2 minutes.

Your site will be live at: `https://your-project-name.vercel.app`

---

## Project Structure (Vercel-Optimized)

```
h2bombs/
├── api/                      # Serverless functions
│   ├── waitlist.ts          # /api/waitlist endpoint
│   └── package.json         # API dependencies
├── client/                   # React frontend source
│   ├── src/
│   │   ├── pages/
│   │   │   └── landing.tsx
│   │   └── components/
│   └── index.html
├── dist/public/             # Build output (generated)
├── attached_assets/         # Images
├── vite.config.ts          # Vite configuration
├── vercel.json             # Vercel deployment config
└── package.json            # Root dependencies
```

---

## Important Notes

### ⚠️ In-Memory Storage Limitation
**Current Setup:** Waitlist uses in-memory storage (Map), which **resets on every deployment**.

**For Production:** Use one of these:
- **Vercel KV** (Redis)
- **Neon PostgreSQL** (already configured in project)
- **Vercel Postgres**
- **Supabase**

To switch to a database, update `api/waitlist.ts` to use your DB instead of the Map.

### ✅ What Works
- Frontend builds to static files
- Mailchimp API integration
- Serverless `/api/waitlist` endpoint
- Email validation and duplicate prevention
- CORS enabled for API calls

### 🔧 Environment Variables
Set these in Vercel Dashboard:
- `MAILCHIMP_API_KEY` - Your Mailchimp API key with datacenter suffix

---

## Troubleshooting

### Build Fails
- Check that `vite` is version 6.x (not 7.x) in package.json
- Ensure `@tailwindcss/vite` is compatible with Vite 6

### API Not Working
- Verify `api/waitlist.ts` is in the root `api/` folder
- Check environment variables are set in Vercel Dashboard
- Review function logs in Vercel Dashboard → Deployments → Function Logs

### 404 on Routes
- Ensure `vercel.json` rewrites are configured correctly
- React Router routes should work with the catch-all rewrite

### Waitlist Data Lost
- Expected behavior with in-memory storage
- Implement database for persistence (see notes above)

---

## Performance Optimizations Applied

✅ Removed 37 unused shadcn components  
✅ Optimized asset loading  
✅ Minimal bundle size  
✅ Serverless functions for instant cold starts  
✅ Static asset caching via Vercel CDN  

---

## Post-Deployment

1. **Test the live site:** Submit a test email to verify Mailchimp integration
2. **Check Mailchimp:** Verify subscribers appear in list `c44d59cb72` with "early-bird" tag
3. **Custom Domain:** Add in Vercel Dashboard → Settings → Domains
4. **Analytics:** Enable Vercel Analytics for traffic insights

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Serverless Functions:** https://vercel.com/docs/functions
- **Environment Variables:** https://vercel.com/docs/environment-variables

Your H2 Bombs landing page is ready to capture thousands of leads! 🚀💜
