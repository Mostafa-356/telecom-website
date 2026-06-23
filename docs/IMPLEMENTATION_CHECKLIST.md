# Supabase Implementation Checklist

## Phase 1: Foundation Setup ✓
- [x] Create Supabase project
- [x] Get API keys from Settings → API
- [x] Create `.env.local` with keys
- [x] Document env vars in `.env.local.example`

## Phase 2: Database Schema (SQL to Execute)
- [ ] Run all SQL in `supabase-setup.md` → 5. Set Up Database Schema
  - [ ] Plans table
  - [ ] Subscriptions table
  - [ ] Usage table
  - [ ] Devices table
  - [ ] Invoices table
  - [ ] Update auth.users with additional fields

- [ ] Enable RLS on all tables (from `supabase-setup.md` → 5. Set Up Row Level Security)
  - [ ] Plans policy (public read)
  - [ ] Subscriptions policies (user specific)
  - [ ] Usage policies (user specific)
  - [ ] Devices policies (user specific)
  - [ ] Invoices policies (user specific)

## Phase 3: Storage Setup
- [ ] Create storage buckets (from `supabase-setup.md` → 6. Set Up Storage Buckets)
  - [ ] `avatars` bucket
  - [ ] `devices` bucket
  - [ ] `invoices` bucket
- [ ] Set RLS policies for each bucket

## Phase 4: Integration Code ✓
Core files created (no conflicts):
- [x] `lib/supabase.ts` - Browser client factory
- [x] `lib/supabase-server.ts` - Server client + session helpers
- [x] `lib/auth.ts` - Auth functions (signUp, signIn, signOut, etc.)
- [x] `lib/queries.ts` - Data query functions (getPlans, getUserSubscription, etc.)
- [x] `lib/hooks.ts` - React hooks (useUser, useAuth, useRealtimeSubscription, etc.)

## Phase 5: Auth Pages Integration
Existing pages to update (no new files to avoid conflicts):

### Sign Up Page
File: `app/auth/signup/page.tsx`
- [ ] Import `useAuth` hook from `lib/hooks`
- [ ] Add form with email/password fields
- [ ] Call `signUp()` on submit
- [ ] Show error messages
- [ ] Redirect to verify-email on success

### Sign In Page
File: `app/auth/signin/page.tsx`
- [ ] Import `useAuth` hook
- [ ] Add form with email/password
- [ ] Call `signIn()` on submit
- [ ] Show error messages
- [ ] Redirect to dashboard on success

### Forgot Password Page
File: `app/auth/forgot-password/page.tsx`
- [ ] Import auth functions
- [ ] Add email input
- [ ] Call `resetPassword()` on submit
- [ ] Show success message

### Verify Email Page
File: `app/auth/verify-email/page.tsx`
- [x] Already has basic structure
- [ ] Add logic to check email verification status

## Phase 6: Dashboard Pages Integration
Existing pages to update:

### Dashboard Main
File: `app/dashboard/page.tsx`
- [ ] Use `useUser()` to get current user
- [ ] Use `useServerUser()` to get session
- [ ] Display user greeting
- [ ] Show subscription status via `getUserSubscription()`
- [ ] Show usage overview via `getUserUsage()`
- [ ] Add real-time updates with `useRealtimeUsage()`

### Usage Page
File: `app/dashboard/usage/page.tsx`
- [ ] Fetch usage data via `getUserUsage()`
- [ ] Display usage charts/meters
- [ ] Add real-time updates with `useRealtimeUsage()`
- [ ] Show data, minutes, SMS usage

### Devices Page
File: `app/dashboard/devices/page.tsx`
- [ ] Fetch devices via `getUserDevices()`
- [ ] Display list of devices
- [ ] Add device form with `addDevice()`
- [ ] Update device with `updateDevice()`
- [ ] Delete device with `deleteDevice()`
- [ ] Show device images from storage

### Billing Page
File: `app/dashboard/billing/page.tsx`
- [ ] Fetch subscriptions via `getUserSubscription()`
- [ ] Fetch invoices via `getUserInvoices()`
- [ ] Display billing history
- [ ] Show payment methods (future: Stripe integration)

### Subscription Page
File: `app/dashboard/subscription/page.tsx`
- [ ] Fetch available plans via `getPlans()`
- [ ] Display current subscription
- [ ] Show upgrade/downgrade options
- [ ] Call `createSubscription()` on plan select
- [ ] Add cancellation option

### Settings Page
File: `app/dashboard/settings/page.tsx`
- [ ] Display user profile info
- [ ] Allow profile picture upload to `avatars` bucket
- [ ] Allow profile info updates
- [ ] Add password change form
- [ ] Add email change option

## Phase 7: Middleware & Protection
- [ ] Create `middleware.ts` in root
  - [ ] Redirect unauthenticated users from `/dashboard/*` to `/auth/signin`
  - [ ] Refresh session on every request
  - [ ] Handle token refresh

## Phase 8: Testing
- [ ] Test sign up flow
  - [ ] Email verification works
  - [ ] User is created in database
- [ ] Test sign in flow
  - [ ] Session is created
  - [ ] Redirect to dashboard works
- [ ] Test protected routes
  - [ ] Unauthenticated users redirected to signin
  - [ ] Authenticated users can access dashboard
- [ ] Test data queries
  - [ ] Plans load correctly
  - [ ] User subscription displays
  - [ ] Usage data shows
  - [ ] Devices list works
- [ ] Test real-time features
  - [ ] Usage updates live
  - [ ] Subscription changes reflect instantly

## Phase 9: Production Checklist
- [ ] Environment variables set in Vercel/hosting
- [ ] Service role key NEVER exposed in client code
- [ ] RLS policies tested and working
- [ ] Storage bucket policies secure
- [ ] Email templates configured in Supabase Auth
- [ ] CORS configured for your domain
- [ ] Database backups enabled
- [ ] Error logging set up
- [ ] Rate limiting configured (if needed)

## Files Modified vs Created

### Created (no conflicts):
- `lib/supabase.ts` - New client factory
- `lib/supabase-server.ts` - New server client
- `lib/auth.ts` - New auth functions
- `lib/queries.ts` - New data queries
- `lib/hooks.ts` - New React hooks
- `middleware.ts` - New middleware

### To Update (existing files):
- `app/auth/signup/page.tsx` - Add form + logic
- `app/auth/signin/page.tsx` - Add form + logic
- `app/auth/forgot-password/page.tsx` - Add form
- `app/auth/verify-email/page.tsx` - Add verification logic
- `app/dashboard/page.tsx` - Add data display
- `app/dashboard/usage/page.tsx` - Add usage display
- `app/dashboard/devices/page.tsx` - Add device management
- `app/dashboard/billing/page.tsx` - Add billing display
- `app/dashboard/subscription/page.tsx` - Add subscription management
- `app/dashboard/settings/page.tsx` - Add profile management
- `.env.local` - Add Supabase keys

## Dependencies Already Installed
- ✓ `@supabase/supabase-js` (^2.108.2)
- ✓ `@supabase/ssr` (^0.12.0)

## Next Steps
1. Execute all SQL from `supabase-setup.md` in Supabase dashboard
2. Create storage buckets with RLS policies
3. Update auth pages with forms and hooks
4. Update dashboard pages with data fetching
5. Create middleware for route protection
6. Test complete auth flow
7. Deploy to production
