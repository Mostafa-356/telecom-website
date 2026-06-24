# 🚀 Deployment Information

## Current Deployment: Netlify Only

This project is **ONLY** deployed on **Netlify**.

### Live Site
- **URL:** https://telecom-website7.netlify.app
- **Platform:** Netlify
- **Status:** Active ✅

---

## Removing Vercel Deployments

If you're seeing Vercel deployment notifications, follow these steps:

### Step 1: Disconnect from Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find the "telecom-website" project
3. Click **Settings**
4. Scroll to **Danger Zone**
5. Click **Delete** or **Disconnect**
6. Confirm deletion

### Step 2: Disable GitHub Integration (if needed)
1. Go to GitHub → Settings → Applications
2. Find **Vercel** in "Authorized OAuth Apps"
3. Click **Revoke** if you want to disconnect all repos

### Step 3: Remove Vercel from Local Git
```bash
# Remove .vercel folder from git history (if it exists)
git rm -r --cached .vercel
git commit -m "Remove Vercel deployment files"
git push
```

---

## Netlify Deployment Configuration

### Build Command
```bash
npm run build
```

### Environment Variables (Set in Netlify Dashboard)
```
NEXT_PUBLIC_SUPABASE_URL=https://jwcemlqbkkdjwxvdksua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[Your public key]
SUPABASE_SERVICE_ROLE_KEY=[Your secret key]
```

### Configuration File
- **File:** `netlify.toml` (in root)
- **Purpose:** Defines build settings and redirects
- **Node Version:** 20
- **Package Manager:** npm

### Key Settings
```toml
[build]
  command = "npm run build"

[build.environment]
  NODE_VERSION = "20"

[dev]
  command = "npm run dev"
  port = 3000
```

---

## Troubleshooting

### Issue: Vercel Still Sending Notifications
**Solution:**
1. Disconnect from Vercel Dashboard
2. Wait 5 minutes
3. Check GitHub Webhooks:
   - Go to GitHub Repo → Settings → Webhooks
   - Delete any `api.vercel.com` webhooks

### Issue: Deployment Failing on Netlify
**Solution:**
1. Check build logs in Netlify Dashboard
2. Verify environment variables are set
3. Run `npm run build` locally to test
4. Check node version: `node --version` (should be ≥18)

### Issue: Getting Vercel CLI Errors
**Solution:**
```bash
# Uninstall Vercel CLI if not needed
npm uninstall -g vercel

# Or disconnect from local Vercel
rm -rf .vercel
```

---

## Files Related to Deployment

### Netlify Configuration
- `netlify.toml` - Build settings, redirects, environment

### Project Configuration
- `package.json` - Dependencies and scripts
- `next.config.ts` - Next.js configuration
- `.env.local.example` - Environment variable template
- `tsconfig.json` - TypeScript configuration

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Monitoring Deployments

### Netlify Dashboard
- **URL:** https://app.netlify.com
- **Status:** Real-time deployment logs
- **Analytics:** Visitor stats, performance

### GitHub
- **Push to main** → Auto-deploys to Netlify
- **Deployment status:** Check GitHub repo → Actions or Deployments

---

## Summary

| Aspect | Details |
|--------|---------|
| **Platform** | Netlify |
| **Domain** | telecom-website7.netlify.app |
| **Build Command** | npm run build |
| **Node Version** | 20 |
| **Package Manager** | npm |
| **Config File** | netlify.toml |
| **Auto-Deploy** | On push to main ✓ |
| **Environment Vars** | Set in Netlify Dashboard |

---

**Last Updated:** June 24, 2026  
**Status:** ✅ Deployed on Netlify only

