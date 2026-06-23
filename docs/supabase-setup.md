# Supabase Integration Setup

Complete guide to set up Supabase for the telecom SaaS platform.

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Choose your organization and region
4. Create a strong database password
5. Wait for project to initialize (2-3 minutes)

### 2. Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Keep service_role key private!** Never expose in browser.

### 3. Create `.env.local`

Copy from `.env.local.example` and fill in values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]
```

### 4. Set Up Database Schema

Execute these SQL commands in Supabase SQL Editor:

#### Users Table (managed by Supabase Auth)
```sql
-- Users are auto-created by Supabase Auth
-- This extends the auth.users table with additional profile data
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS phone text;
```

#### Plans Table
```sql
CREATE TABLE IF NOT EXISTS plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  billing_period text NOT NULL CHECK (billing_period IN ('monthly', 'yearly')),
  data_limit_gb integer NOT NULL,
  call_minutes integer NOT NULL,
  sms_count integer NOT NULL,
  features text[] DEFAULT '{}',
  active boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

#### Subscriptions Table
```sql
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES plans(id),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  current_period_start timestamp NOT NULL,
  current_period_end timestamp NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  cancelled_at timestamp,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

#### Usage Table
```sql
CREATE TABLE IF NOT EXISTS usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  data_used_gb numeric NOT NULL,
  calls_used_minutes integer NOT NULL,
  sms_used_count integer NOT NULL,
  recorded_at timestamp NOT NULL,
  created_at timestamp DEFAULT now()
);
```

#### Devices Table
```sql
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_name text NOT NULL,
  device_type text NOT NULL CHECK (device_type IN ('phone', 'tablet', 'smartwatch', 'router')),
  phone_number text,
  imei text,
  active boolean DEFAULT true,
  image_url text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

#### Invoices Table
```sql
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES subscriptions(id),
  amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  invoice_date date NOT NULL,
  due_date date NOT NULL,
  paid_at timestamp,
  pdf_url text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### 5. Set Up Row Level Security (RLS)

Enable RLS on all tables:

```sql
-- Enable RLS
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
```

#### Plans (public read)
```sql
CREATE POLICY "Plans are viewable by everyone" ON plans
  FOR SELECT USING (true);
```

#### Subscriptions (user specific)
```sql
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### Usage (user specific)
```sql
CREATE POLICY "Users can view their own usage" ON usage
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM subscriptions WHERE id = usage.subscription_id
    )
  );
```

#### Devices (user specific)
```sql
CREATE POLICY "Users can view their own devices" ON devices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices" ON devices
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices" ON devices
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert devices" ON devices
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

#### Invoices (user specific)
```sql
CREATE POLICY "Users can view their own invoices" ON invoices
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM subscriptions WHERE id = invoices.subscription_id
    )
  );
```

### 6. Set Up Storage Buckets

Create in Supabase **Storage** tab:

1. **avatars** - User profile pictures
2. **devices** - Device images
3. **invoices** - PDF invoices

Set RLS policies for each bucket in Storage tab.

## 📁 Project Structure

```
lib/
├── supabase.ts           # Browser client
├── supabase-server.ts    # Server client (admin)
├── auth.ts               # Auth functions
├── queries.ts            # Data query functions
├── validation.ts         # Zod schemas
└── hooks.ts              # Custom React hooks

types/
└── database.ts           # Database types (generated)

.env.local.example        # Environment variables template
```

## 🔑 API Keys Locations

In Supabase Dashboard:

- **Settings** → **API** → Project URL & API Keys
- **Settings** → **Auth** → Auth Configuration
- **Storage** → Bucket settings
- **Database** → Connection Pooler (optional, for direct connections)

## 🧪 Testing

### Test Authentication

```tsx
import { useAuth, useUser } from '@/lib/hooks'

export function TestAuth() {
  const { signUp, signIn, signOut } = useAuth()
  const { user } = useUser()

  return (
    <div>
      {user ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('test@example.com', 'password')}>
          Sign In
        </button>
      )}
    </div>
  )
}
```

### Test Data Queries

```tsx
import { useSubscription } from '@/lib/hooks'

export function TestData() {
  const { user } = useUser()
  const { subscription, loading } = useSubscription(user?.id)

  return <div>{loading ? 'Loading...' : JSON.stringify(subscription)}</div>
}
```

## 🔒 Security Checklist

- [ ] Service role key is in `.env.local` (never in `.env.local.example`)
- [ ] `.env.local` is in `.gitignore`
- [ ] RLS policies are enabled on all tables
- [ ] Anon key has limited permissions
- [ ] Only public data is accessible without auth
- [ ] Email verification is enabled
- [ ] Password requirements are enforced

## 📚 Useful Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase SSR](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [RLS Examples](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Realtime Subscriptions](https://supabase.com/docs/guides/realtime/subscribe)

## 🚀 Next Steps

1. Create authentication pages (sign up, sign in, dashboard)
2. Implement plan selection and subscription
3. Build usage dashboard
4. Set up device management
5. Add invoice generation
6. Enable real-time notifications
