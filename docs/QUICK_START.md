# Supabase Quick Start Reference

## 3-Minute Setup

### 1. Get API Keys
```
Supabase Dashboard → Settings → API
Copy: Project URL, Anon Key, Service Role Key
```

### 2. Set Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
```

### 3. Execute SQL
Copy all SQL from `supabase-setup.md` section 5 and run in Supabase SQL editor.

### 4. Enable RLS
Copy all RLS policies from `supabase-setup.md` section 5 and run in Supabase SQL editor.

### 5. Create Storage Buckets
Create 3 buckets in Supabase Storage tab:
- `avatars`
- `devices`
- `invoices`

---

## Most Common Code Patterns

### Pattern 1: Sign Up Form
```tsx
'use client'
import { useAuth } from '@/lib/hooks'

export function SignUpForm() {
  const { signUp, loading, error } = useAuth()
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      signUp(email, password)
    }}>
      {/* form inputs */}
    </form>
  )
}
```

### Pattern 2: Get Current User
```tsx
'use client'
import { useUser } from '@/lib/hooks'

export function UserProfile() {
  const { user, loading } = useUser()
  if (loading) return <div>Loading...</div>
  return <div>Hello {user?.email}</div>
}
```

### Pattern 3: Dashboard Data
```tsx
import { getServerUser } from '@/lib/supabase-server'
import { getUserSubscription } from '@/lib/queries'

export default async function Dashboard() {
  const user = await getServerUser()
  const { data: subscription } = await getUserSubscription(user.id)
  return <div>{subscription.plan_name}</div>
}
```

### Pattern 4: Real-Time Updates
```tsx
'use client'
import { useRealtimeUsage } from '@/lib/hooks'

export function UsageMeter() {
  const { usage } = useRealtimeUsage('sub-123')
  return <div>Data: {usage?.data_used_gb} GB</div>
}
```

### Pattern 5: Add Device
```tsx
'use client'
import { addDevice } from '@/lib/queries'
import { useUser } from '@/lib/hooks'

export function AddDeviceForm() {
  const { user } = useUser()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await addDevice(user.id, {
      device_name: 'My Phone',
      device_type: 'phone'
    })
  }
  
  return <form onSubmit={handleSubmit}>{/* form */}</form>
}
```

---

## File Locations

| Task | File | Use |
|------|------|-----|
| Sign up/in | `app/auth/*/page.tsx` | `useAuth()` hook |
| User profile | `app/dashboard/settings/page.tsx` | `useUser()` hook |
| Subscription | `app/dashboard/subscription/page.tsx` | `getPlans()` query |
| Usage display | `app/dashboard/usage/page.tsx` | `useRealtimeUsage()` hook |
| Devices | `app/dashboard/devices/page.tsx` | Device CRUD functions |
| Protected API | `app/api/*/route.ts` | `getServerUser()` |

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| Module not found: '@supabase/ssr' | `npm install @supabase/ssr` |
| env vars undefined | Restart dev server after updating `.env.local` |
| useUser() returns null | It's async, show loading state |
| RLS permission denied | Check RLS policies in Supabase |
| Real-time not updating | Verify RLS is enabled on tables |

---

## Testing Checklist

- [ ] Sign up creates user
- [ ] Email verification works
- [ ] Sign in creates session
- [ ] Dashboard loads user data
- [ ] Usage updates in real-time
- [ ] Can add/edit/delete device
- [ ] Sign out clears session

---

## Documentation Links

Full docs: `docs/INTEGRATION_GUIDE.md`
Checklist: `docs/IMPLEMENTATION_CHECKLIST.md`
Summary: `docs/SUPABASE_IMPLEMENTATION_SUMMARY.md`
Database: `docs/supabase-setup.md`

---

## API Keys Locations

**In your app code:**
```
lib/supabase.ts - Uses NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
lib/supabase-server.ts - Same (server-safe)

middleware.ts - Uses NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**In .env.local (never commit):**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  ← Server-side only!
```

**In Supabase Dashboard:**
Settings → API → Copy keys from there

---

## Key Takeaways

✅ Zero conflicts - existing code untouched
✅ All functions ready to use
✅ Hooks handle async/loading automatically
✅ Real-time subscriptions included
✅ Server components for data fetching
✅ Middleware for route protection
✅ Everything type-safe with TypeScript

**Next Step:** Execute SQL from `supabase-setup.md` section 5
