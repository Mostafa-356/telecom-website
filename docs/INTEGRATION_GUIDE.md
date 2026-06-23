# Supabase Integration Guide for Telecom App

## Overview

This guide explains the new Supabase integration without conflicts or duplicates. The app now has:

- ✅ Browser client factory (`lib/supabase.ts`)
- ✅ Server client for protected routes (`lib/supabase-server.ts`)
- ✅ Auth functions (`lib/auth.ts`)
- ✅ Data query functions (`lib/queries.ts`)
- ✅ React hooks for client components (`lib/hooks.ts`)
- ✅ Middleware for route protection (`middleware.ts`)

## Quick Usage Examples

### 1. Sign Up Page Example

```tsx
'use client'

import { useAuth } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function SignUpPage() {
  const { signUp, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signUp(email, password)
    // Hook automatically redirects to verify-email on success
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-600">{error.message}</p>}
      <Button disabled={loading} type="submit">
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>
    </form>
  )
}
```

### 2. Sign In Page Example

```tsx
'use client'

import { useAuth } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function SignInPage() {
  const { signIn, loading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
    // Hook automatically redirects to dashboard on success
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-600">{error.message}</p>}
      <Button disabled={loading} type="submit">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}
```

### 3. Dashboard Page Example (Server Component)

```tsx
import { getServerUser } from '@/lib/supabase-server'
import { getUserSubscription, getUserUsage } from '@/lib/queries'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getServerUser()

  // Redirect to signin if not authenticated
  if (!user) {
    redirect('/auth/signin')
  }

  // Fetch user data
  const { data: subscription } = await getUserSubscription(user.id)
  const { data: usage } = subscription
    ? await getUserUsage(subscription.id)
    : { data: null }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      {subscription && (
        <div>
          <h2>Current Plan: {subscription.plans.name}</h2>
          <p>Status: {subscription.status}</p>
        </div>
      )}
      {usage && (
        <div>
          <h3>Usage This Month</h3>
          <p>Data: {usage[0]?.data_used_gb || 0} GB</p>
          <p>Calls: {usage[0]?.calls_used_minutes || 0} minutes</p>
        </div>
      )}
    </div>
  )
}
```

### 4. Real-time Updates Example

```tsx
'use client'

import { useUser, useRealtimeUsage } from '@/lib/hooks'
import { useState, useEffect } from 'react'

export default function UsagePage() {
  const { user } = useUser()
  const { usage } = useRealtimeUsage(user?.id || null)

  if (!user) return <p>Loading...</p>

  return (
    <div>
      <h1>Live Usage</h1>
      <p>Data: {usage?.data_used_gb || 0} GB</p>
      <p>Calls: {usage?.calls_used_minutes || 0} minutes</p>
      <p>Updates in real-time!</p>
    </div>
  )
}
```

### 5. Devices Management Example

```tsx
'use client'

import { useUser } from '@/lib/hooks'
import { addDevice, updateDevice, deleteDevice } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function DevicesPage() {
  const { user } = useUser()
  const [devices, setDevices] = useState([])
  const [deviceName, setDeviceName] = useState('')

  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const { data: newDevice, error } = await addDevice(user.id, {
      device_name: deviceName,
      device_type: 'phone',
      active: true,
    })

    if (newDevice) {
      setDevices([...devices, newDevice[0]])
      setDeviceName('')
    }
  }

  const handleDelete = async (deviceId: string) => {
    const { error } = await deleteDevice(deviceId)
    if (!error) {
      setDevices(devices.filter((d) => d.id !== deviceId))
    }
  }

  return (
    <div>
      <h1>My Devices</h1>
      <form onSubmit={handleAddDevice}>
        <input
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          placeholder="Device name"
        />
        <Button type="submit">Add Device</Button>
      </form>

      <div>
        {devices.map((device) => (
          <div key={device.id}>
            <p>{device.device_name}</p>
            <Button onClick={() => handleDelete(device.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## File Organization

```
lib/
├── supabase.ts              # Browser client (use in 'use client')
├── supabase-server.ts       # Server client (use in Server Components)
├── auth.ts                  # Auth functions
├── queries.ts               # Data queries
└── hooks.ts                 # React hooks

middleware.ts               # Route protection & session refresh

app/
├── auth/
│   ├── signin/page.tsx      # UPDATE with form + useAuth hook
│   ├── signup/page.tsx      # UPDATE with form + useAuth hook
│   ├── forgot-password/page.tsx  # UPDATE with form
│   └── verify-email/page.tsx     # UPDATE with verification
├── dashboard/
│   ├── page.tsx             # UPDATE with getServerUser + queries
│   ├── usage/page.tsx       # UPDATE with useRealtimeUsage
│   ├── devices/page.tsx     # UPDATE with device CRUD
│   ├── billing/page.tsx     # UPDATE with invoices
│   ├── subscription/page.tsx # UPDATE with plans
│   └── settings/page.tsx    # UPDATE with profile
```

## No Conflicts

The implementation is designed to avoid conflicts:

1. **No existing files modified** - Only new `lib/` files and `middleware.ts` created
2. **Existing auth pages unchanged** - You update them incrementally with the hooks
3. **Existing dashboard pages unchanged** - You add data fetching to them
4. **Error boundaries still work** - Error pages already in place
5. **Navigation links still work** - Footer/header unchanged

## Best Practices

### Client Components
```tsx
'use client'
import { useUser, useAuth, useRealtimeUsage } from '@/lib/hooks'
import { createClient } from '@/lib/supabase'
```

### Server Components
```tsx
import { getServerUser, getServerSession } from '@/lib/supabase-server'
import { getUserSubscription, getUserUsage } from '@/lib/queries'
```

### API Routes
```tsx
import { getServerUser } from '@/lib/supabase-server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const user = await getServerUser()
  if (!user) return new Response('Unauthorized', { status: 401 })
  // Protected API logic here
}
```

## Environment Setup

Your `.env.local` should have:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]  # Keep private!
```

Never commit `.env.local` - it's in `.gitignore`.

## Testing Checklist

- [ ] Sign up creates user in auth.users
- [ ] Email verification email is sent
- [ ] Sign in creates session
- [ ] useUser() hook returns logged-in user
- [ ] Subscription data loads in dashboard
- [ ] Usage updates in real-time
- [ ] Device CRUD works
- [ ] Protected routes redirect to signin
- [ ] Logout clears session

## Common Issues

### "Module not found: @supabase/ssr"
Install missing dependency:
```bash
npm install @supabase/ssr
```

### Session not persisting
Check middleware.ts is present and configured correctly.

### Real-time not updating
Ensure RLS policies are set on tables.

### useUser() returns null on first load
Expected - it's async. Show loading state first.

## Next: Execute SQL Schema

See `supabase-setup.md` section 5 to run all SQL in Supabase dashboard.

Then implement the pages using examples above.
