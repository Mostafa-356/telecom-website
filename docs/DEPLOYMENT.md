# Deployment Guide for Netlify

**Domain**: https://telecom-website7.netlify.app  
**Status**: Ready for deployment

## Pre-Deployment Checklist

### ✅ Local Setup Complete
- [x] Next.js 15 configured
- [x] Supabase libraries installed
- [x] Error pages configured
- [x] Navigation working
- [x] Domain URLs updated to `telecom-website7.netlify.app`

### 🔄 Next Steps Before Deploy

## Step 1: Install Dependencies (5 mins)

```bash
cd "c:\Users\Memo\Downloads\New folder (2)\telecom-website"
npm install --legacy-peer-deps
```

Wait for completion. This installs all packages including Supabase and UI components.

## Step 2: Test Locally (5 mins)

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- [ ] Homepage loads
- [ ] Navigation links work
- [ ] No console errors
- [ ] No 404 errors (except sw.js should work now)

Press `Ctrl+C` to stop dev server.

## Step 3: Build Test (5 mins)

```bash
npm run build
```

Verify build completes without errors. This creates `.next/` folder for production.

## Step 4: Set Up Supabase Database (30-60 mins)

### 4a. Create Supabase Project
1. Go to https://app.supabase.com
2. Click "New Project"
3. Choose organization and region
4. Create database password
5. Wait 2-3 minutes for setup

### 4b. Get API Keys
1. Go to **Settings → API**
2. Copy these values:
   - **Project URL** (under "Project Details")
   - **anon public key** (under "API keys")
   - **service_role key** (under "API keys")

### 4c. Create `.env.local` File
```bash
# Create file
echo. > .env.local

# Add these lines (replace with your values):
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
```

Or manually create file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4d. Execute SQL Schema
1. Go to Supabase dashboard
2. Open **SQL Editor** (left menu)
3. Copy all SQL from `docs/supabase-setup.md` section 5
4. Paste into SQL Editor
5. Click "Run" (execute each block)
6. Verify tables created without errors

### 4e. Enable RLS Policies
1. In SQL Editor, execute all RLS policies from `docs/supabase-setup.md` section 5
2. Copy each policy and run separately

### 4f. Create Storage Buckets
1. Go to **Storage** (left menu)
2. Click "Create Bucket"
3. Create 3 buckets:
   - `avatars` (public)
   - `devices` (public)
   - `invoices` (private)
4. Configure RLS policies for each

## Step 5: Prepare for Netlify Deployment (10 mins)

### 5a. Create GitHub Repository (if not exist)
```bash
cd "c:\Users\Memo\Downloads\New folder (2)\telecom-website"

# Initialize git if needed
git init

# Add all changes
git add .

# Commit
git commit -m "Deploy: Ready for Netlify"

# Push to GitHub
git push -u origin main
```

### 5b. Create/Update netlify.toml
Create file: `netlify.toml`
```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"
  NEXT_PRIVATE_TARGET = "serverless"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/public/*"
  [headers.values]
    Cache-Control = "max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "max-age=600, s-maxage=3600"
```

## Step 6: Deploy to Netlify

### Option A: Connect GitHub (Recommended)
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select GitHub
4. Authorize Netlify
5. Choose your repository
6. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy site"

### Option B: Manual Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

## Step 7: Configure Environment Variables on Netlify

1. Go to your Netlify site dashboard
2. Click **Site Settings → Build & deploy → Environment**
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click "Save"

## Step 8: Verify Deployment

After Netlify finishes deploying (5-10 mins):

1. Visit https://telecom-website7.netlify.app
2. Check:
   - [ ] Homepage loads
   - [ ] Navigation works
   - [ ] No console errors
   - [ ] Images load
   - [ ] Metadata visible (check page source)

## Step 9: Set Up Google Search Console

1. Go to https://search.google.com/search-console
2. Click "Add property"
3. Enter: `https://telecom-website7.netlify.app`
4. Verify domain (choose HTML file method)
5. Add `google-site-verification` meta tag to `app/layout.tsx`:
   ```tsx
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
6. Verify
7. Submit sitemap:
   - Go to Sitemaps section
   - Enter: `https://telecom-website7.netlify.app/sitemap.xml`
   - Submit

## Step 10: Set Up Google Analytics (Optional)

1. Go to https://analytics.google.com
2. Create new property
3. Get measurement ID (GA_ID)
4. Add to `app/layout.tsx`:
   ```tsx
   import Script from 'next/script'
   
   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
     strategy="afterInteractive"
   />
   <Script id="google-analytics" strategy="afterInteractive">
     {`window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${GA_ID}');`}
   </Script>
   ```

## Step 11: Run Lighthouse Audit

1. Open https://telecom-website7.netlify.app in Chrome
2. Press F12 (DevTools)
3. Go to "Lighthouse" tab
4. Click "Analyze page load"
5. Target scores:
   - Performance: 95+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 100
   - PWA: 90+

## Troubleshooting

### "Build failed on Netlify"
- Check build logs in Netlify dashboard
- Usually: missing env vars or node version issue
- Solution: Set Node 22 in Site Settings

### "Pages not found after deploy"
- Check `netlify.toml` configuration
- Verify build command: `npm run build`
- Verify publish directory: `.next`

### "Supabase requests failing"
- Check env vars are set in Netlify
- Verify keys are correct in Supabase dashboard
- Check CORS configuration in Supabase Auth settings

### "Images not loading"
- Check paths in `app/layout.tsx` metadata
- Verify OG images exist in `public/`
- Check image paths in components

## Production Monitoring

### Daily
- [ ] Check Netlify deployment status
- [ ] Monitor Google Search Console for errors
- [ ] Check Core Web Vitals in Google Analytics

### Weekly
- [ ] Review Lighthouse scores
- [ ] Monitor search impressions/clicks
- [ ] Check for crawl errors

### Monthly
- [ ] Review performance metrics
- [ ] Analyze user behavior
- [ ] Update content if needed

## Rollback Procedure

If deployment has issues:

1. Go to Netlify dashboard
2. Click "Deploys"
3. Find previous successful deploy
4. Click "Restore"
5. Verify site works

## Files Changed Before Deploy

```
app/layout.tsx          # Updated domain to telecom-website7.netlify.app
.env.local             # Created with Supabase keys
netlify.toml           # Created with deployment config
```

## Success Criteria

✅ Site is live at https://telecom-website7.netlify.app
✅ Homepage loads without errors
✅ Navigation works
✅ Supabase connected (will test after page implementation)
✅ Lighthouse score 90+
✅ In Google Search Console
✅ SSL certificate installed (auto on Netlify)

## Next Phase: Implement Pages

After deployment, implement:
1. Auth pages (signin, signup, etc.)
2. Dashboard pages (with Supabase data)
3. See `INTEGRATION_GUIDE.md` for code examples

---

**Deployment Status**: Ready to start Step 1
