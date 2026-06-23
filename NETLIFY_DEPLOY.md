# Netlify Deployment Guide

Deploy your Telecom Website to Netlify in minutes.

## Quick Deploy (Recommended)

### Step 1: Connect to Netlify
1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select **`telecom-website`** repository
6. Click **"Import"**

### Step 2: Configure Build Settings
Netlify should auto-detect settings, but verify:

**Build Command:** `pnpm build`  
**Publish Directory:** `.next`  
**Node Version:** 18 (or higher)

### Step 3: Environment Variables (if needed)
1. Go to **Site Settings** → **Build & Deploy** → **Environment**
2. Add variables if required (usually none for static site)
3. Click **"Save"**

### Step 4: Deploy
1. Click **"Deploy site"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at `https://[random-id].netlify.app`

## Custom Domain Setup

### Add Your Domain
1. Go to **Site Settings** → **Domain Management**
2. Click **"Add domain"**
3. Enter your domain (e.g., `telecomwebsite.com`)
4. Follow Netlify's DNS setup instructions
5. Wait for DNS propagation (up to 48 hours)

### SSL Certificate
- Netlify automatically provisions free SSL via Let's Encrypt
- HTTPS is enabled automatically

## Fix "Project has not yet been deployed"

If you see this error:

### Solution 1: Manual Deploy
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for build to complete

### Solution 2: Check Build Logs
1. Click the failed/pending deploy
2. Check logs for errors
3. Common issues:
   - `pnpm` not installed → Add to build environment
   - Missing dependencies → Run `pnpm install` locally first
   - Node version mismatch → Set to Node 18+

### Solution 3: Environment Setup
1. **Site Settings** → **Build & Deploy** → **Environment**
2. Add: `NODE_VERSION=18`
3. Add: `PNPM_VERSION=8`
4. Redeploy

## Build Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  command = "pnpm build"
  publish = ".next"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"
  PNPM_VERSION = "8"

[dev]
  command = "pnpm dev"
  port = 3000

[[redirects]]
  from = "/sitemap.xml"
  to = "/.next/static/sitemap.xml"
  status = 200

[[redirects]]
  from = "/robots.txt"
  to = "/.next/static/robots.txt"
  status = 200

# Handle client-side routing
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Verify Deployment

### Check Site is Live
```bash
# Test your domain
curl https://yourdomain.com

# Should return 200 status
```

### Verify SEO Files
- Check `/robots.txt` loads
- Check `/sitemap.xml` loads
- Check `/favicon.svg` appears in browser tab
- Check `/manifest.json` loads

### Performance Check
1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your Netlify URL
3. Check Core Web Vitals score

## Troubleshooting

### Build Fails: "pnpm: command not found"
**Fix:** Add to `netlify.toml`:
```toml
[build.environment]
  PNPM_VERSION = "8"
```

### Build Fails: "dependencies not installed"
**Fix:** 
1. Delete `node_modules` locally
2. Run `pnpm install`
3. Push to GitHub
4. Redeploy

### Build Slow or Times Out
**Fix:**
1. Clear Netlify build cache
2. Go to **Deploys** → **Clear cache & redeploy**
3. Check for large dependencies

### Site Shows Old Version
**Fix:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Or do cache purge in Netlify

### 404 Errors on Pages
**Fix:** Add redirect rule to `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Monitoring & Analytics

### Enable Netlify Analytics
1. **Site Settings** → **Analytics**
2. Click **"Enable analytics"** (paid feature)
3. Track page views and performance

### Google Analytics
1. Get measurement ID from [Google Analytics](https://analytics.google.com)
2. Add to `app/layout.tsx`
3. Redeploy
4. Data appears after 24 hours

### Search Console
1. [Add to Google Search Console](https://search.google.com/search-console)
2. Verify domain ownership
3. Submit sitemap: `/sitemap.xml`
4. Monitor search performance

## Production Checklist

Before going live:
- [ ] Domain configured
- [ ] SSL working (HTTPS)
- [ ] All pages loading correctly
- [ ] Navigation working
- [ ] Images optimized & loading
- [ ] Forms submitting (if applicable)
- [ ] Mobile responsive on all devices
- [ ] SEO tags in place (favicon, meta, etc.)
- [ ] Analytics configured
- [ ] Robots.txt & sitemap submitted

## Continuous Deployment

### Auto-Deploy on Push
- Enabled by default
- Every push to `main` branch = automatic deploy
- Can set branch protection rules

### Prevent Auto-Deploy
Go to **Site Settings** → **Build & Deploy** → toggle auto-publish off

## Production Deployment Command

For local testing before deploying:

```bash
# Build for production
pnpm build

# Test build locally
pnpm start

# Visit http://localhost:3000
```

## Need Help?

- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Support](https://support.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
