# Navigation & Path Reference

## Public Routes

### Home
- **Path**: `/`
- **Type**: Landing page
- **Sections**: Plans, Features, Services, Testimonials

### Auth Routes
- **Sign In**: `/auth/signin`
- **Sign Up**: `/auth/signup`
- **Forgot Password**: `/auth/forgot-password`
- **Verify Email**: `/auth/verify-email`

## Protected Routes (Dashboard)

### Dashboard Main
- **Path**: `/dashboard`
- **Sub-pages**:
  - Usage & Stats: `/dashboard/usage`
  - Billing: `/dashboard/billing`
  - Subscription: `/dashboard/subscription`
  - Devices: `/dashboard/devices`
  - Settings: `/dashboard/settings`

## Error & Special Pages

### Error Handling
- **Global Error**: `/app/error.tsx`
- **Auth Error**: `/app/auth/error.tsx`
- **Dashboard Error**: `/app/dashboard/error.tsx`
- **Critical Error**: `/app/global-error.tsx`
- **404 Page**: `/app/not-found.tsx`

## Header Navigation

**Desktop Menu:**
- Home Logo → `/`
- Plans → `/#plans`
- Features → `/#features`
- Services → `/#services`
- Testimonials → `/#testimonials`
- Usage → `/dashboard/usage`
- Sign In → `/auth/signin`
- Sign Up → `/auth/signup`
- Dashboard → `/dashboard`

**Mobile Menu:**
- Menu Icon (collapsible)
- Sign In → `/auth/signin`
- Sign Up → `/auth/signup`
- Dashboard → `/dashboard`

## Footer Navigation

### Services Section
- Mobile Plans → `/#plans`
- Broadband Services → `/#services`
- Features & Solutions → `/#features`
- Manage Devices → `/dashboard/devices`

### Account Section
- Dashboard → `/dashboard`
- Usage & Stats → `/dashboard/usage`
- Billing → `/dashboard/billing`
- Subscriptions → `/dashboard/subscription`

### Resources Section
- Testimonials → `/#testimonials`
- Sign In → `/auth/signin`
- Get Started → `/auth/signup`
- Settings → `/dashboard/settings`

### Social Links
- Facebook → `https://facebook.com`
- Twitter → `https://twitter.com`
- Instagram → `https://instagram.com`
- YouTube → `https://youtube.com`

### Legal & Info
- Privacy Policy → `/`
- Terms of Service → `/`
- Accessibility → `/`
- Contact → `/`

## All Unique Paths

**Internal Routes:**
1. `/` - Home
2. `/auth/signin` - Sign In
3. `/auth/signup` - Sign Up
4. `/auth/forgot-password` - Forgot Password
5. `/auth/verify-email` - Verify Email
6. `/dashboard` - Dashboard
7. `/dashboard/usage` - Usage
8. `/dashboard/billing` - Billing
9. `/dashboard/subscription` - Subscription
10. `/dashboard/devices` - Devices
11. `/dashboard/settings` - Settings

**Anchor Links (on home page):**
- `/#plans` - Plans section
- `/#features` - Features section
- `/#services` - Services section
- `/#testimonials` - Testimonials section

**External Links:**
- Facebook: https://facebook.com
- Twitter: https://twitter.com
- Instagram: https://instagram.com
- YouTube: https://youtube.com

## Notes

- All internal routes use Next.js `<Link>` component
- External social links use `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"`
- Anchor links (#section) work on the home page
- Dashboard routes are protected by authentication layout
- All error pages have proper navigation back to key sections
