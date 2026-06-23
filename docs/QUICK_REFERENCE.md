# Quick Reference - Supabase Integration

## What's Done ✅

- Core Supabase libraries created
- Auth functions ready
- Data query functions ready
- React hooks for real-time data ready
- Error pages enhanced
- Navigation links working
- Documentation complete
- **Everything committed to git**

## What's Next 🔄

1. `npm install --legacy-peer-deps`
2. Execute SQL from `docs/supabase-setup.md`
3. Update auth pages with forms
4. Update dashboard pages with data
5. Test auth flow
6. Deploy to production

## Common Tasks

### Sign Up Implementation
```tsx
'use client'
import { useAuth } from '@/lib/hooks'

const { signUp, loading, error } = useAuth()
await signUp(email, password)
// Automatically redirects to verify-email
```

### Get Current User
```tsx
// Client Component
import { useUser } from '@/lib/hooks'
const { user, loading } = useUser()

// Server Component
import { getServerUser } from '@/lib/supabase-server'
const user = await getServerUser()
```

### Fetch User Subscription
```tsx
// Server Component
import { getUserSubscription } from '@/lib/queries'
const { data: subscription } = await getUserSubscription(userId)
```

### Real-Time Updates
```tsx
'use client'
import { useRealtimeUsage } from '@/lib/hooks'
const { usage } = useRealtimeUsage(subscriptionId)
```

### Device Management
```tsx
import { addDevice, updateDevice, deleteDevice } from '@/lib/queries'

await addDevice(userId, { device_name: 'My Phone', device_type: 'phone' })
await updateDevice(deviceId, { active: false })
await deleteDevice(deviceId)
```

## All Hooks

| Hook | Purpose |
|------|---------|
| `useUser()` | Get current user |
| `useAuth()` | Auth functions (signup, signin, signout) |
| `useRealtimeUsage()` | Live usage updates |
| `useRealtimeSubscriptionStatus()` | Live subscription changes |

## All Auth Functions

| Function | Purpose |
|----------|---------|
| `signUp(email, password)` | Create account |
| `signIn(email, password)` | Login |
| `signOut()` | Logout |
| `resetPassword(email)` | Send reset email |
| `updatePassword(newPassword)` | Change password |
| `getUser()` | Get current user (browser) |

## All Query Functions

| Function | Purpose |
|----------|---------|
| `getPlans()` | Get all plans |
| `getUserSubscription(userId)` | Get user subscription |
| `getUserUsage(subscriptionId)` | Get usage data |
| `getUserDevices(userId)` | Get user devices |
| `getUserInvoices(userId)` | Get invoices |
| `addDevice(userId, data)` | Add device |
| `updateDevice(deviceId, updates)` | Update device |
| `deleteDevice(deviceId)` | Delete device |
| `createSubscription(userId, planId)` | Create subscription |

## Server vs Client

### Use in Server Components ✅
```tsx
import { getServerUser } from '@/lib/supabase-server'
import { getUserSubscription } from '@/lib/queries'

const user = await getServerUser()
const { data } = await getUserSubscription(user.id)
```

### Use in Client Components ('use client') ✅
```tsx
import { useUser, useAuth } from '@/lib/hooks'
import { createClient } from '@/lib/supabase'

const { user } = useUser()
const { signIn } = useAuth()
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
```

## Documentation Files

| File | Purpose |
|------|---------|
| `SUPABASE_SETUP.md` | Database schema & SQL |
| `INTEGRATION_GUIDE.md` | Code examples |
| `IMPLEMENTATION_CHECKLIST.md` | Task list |
| `NAVIGATION_PATHS.md` | All routes |
| `SUPABASE_IMPLEMENTATION_SUMMARY.md` | Architecture |
| `COMPLETION_STATUS.md` | Progress |
| `SESSION_SUMMARY.md` | What was done |
| `QUICK_REFERENCE.md` | This file |

## Pages to Implement

### Auth Pages
- `/app/auth/signin/page.tsx`
- `/app/auth/signup/page.tsx`
- `/app/auth/forgot-password/page.tsx`
- `/app/auth/verify-email/page.tsx`

### Dashboard Pages
- `/app/dashboard/page.tsx`
- `/app/dashboard/usage/page.tsx`
- `/app/dashboard/devices/page.tsx`
- `/app/dashboard/billing/page.tsx`
- `/app/dashboard/subscription/page.tsx`
- `/app/dashboard/settings/page.tsx`

## SQL Setup

1. Go to Supabase dashboard
2. Open SQL Editor
3. Copy SQL from `docs/supabase-setup.md` section 5
4. Execute each block
5. Enable RLS policies (section 5)
6. Create storage buckets (section 6)

## Git Status

```
✅ Committed: 26 files changed, 2,251 insertions, 4,178 deletions
✅ Ready to push
🔄 Next: npm install --legacy-peer-deps
```

## API Routes Example

```tsx
// app/api/user/route.ts
import { getServerUser } from '@/lib/supabase-server'

export async function GET(req: Request) {
  const user = await getServerUser()
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  return Response.json({ user })
}
```

## Error Handling

All error pages are in place:
- `app/error.tsx` - Global errors
- `app/global-error.tsx` - Critical errors
- `app/not-found.tsx` - 404
- `app/auth/error.tsx` - Auth errors
- `app/dashboard/error.tsx` - Dashboard errors

## Middleware

Route protection template ready in `middleware.ts`:
- Refresh session on every request
- Optional: Redirect unauthenticated users

## Real-Time Example

```tsx
'use client'
import { useRealtimeUsage } from '@/lib/hooks'

export function UsageMeter({ subscriptionId }: { subscriptionId: string }) {
  const { usage } = useRealtimeUsage(subscriptionId)
  
  return (
    <div>
      <p>Data: {usage?.data_used_gb || 0} GB</p>
      <p>Updates in real-time! 📊</p>
    </div>
  )
}
```

## Testing Checklist

- [ ] npm install --legacy-peer-deps works
- [ ] npm run dev starts
- [ ] No build errors
- [ ] SQL executed in Supabase
- [ ] Buckets created
- [ ] Sign up works
- [ ] Email verification works
- [ ] Sign in works
- [ ] Dashboard loads user data
- [ ] Real-time updates work

## Common Issues

| Issue | Fix |
|-------|-----|
| Module not found | Run `npm install --legacy-peer-deps` |
| Build errors | Clear `.next` folder, restart dev server |
| RLS errors | Execute all RLS policies from `supabase-setup.md` |
| Real-time not working | Check RLS policies are enabled |
| useUser() returns null | Expected on first load, show loading state |

## File Locations

```
lib/
├── supabase.ts              ← Browser client
├── supabase-server.ts       ← Server client
├── auth.ts                  ← Auth functions
├── queries.ts               ← Data functions
└── hooks.ts                 ← React hooks

app/
├── auth/
│   ├── signin/page.tsx      ← Needs implementation
│   ├── signup/page.tsx      ← Needs implementation
│   └── error.tsx            ← Ready ✅
└── dashboard/
    ├── page.tsx             ← Needs implementation
    ├── usage/page.tsx       ← Needs implementation
    └── error.tsx            ← Ready ✅
```

## Performance Tips

- Use `useUser()` for current user only (cached)
- Fetch data server-side when possible
- Use real-time hooks only when needed
- Implement loading states with `loading` boolean
- Show skeleton screens while loading

---

**Status**: ✅ Ready for next phase

See `IMPLEMENTATION_CHECKLIST.md` for full task list
See `INTEGRATION_GUIDE.md` for detailed code examples
