import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const SQL_SCHEMA = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Plans Table
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

-- Subscriptions Table
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

-- Usage Table
CREATE TABLE IF NOT EXISTS usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  data_used_gb numeric NOT NULL,
  calls_used_minutes integer NOT NULL,
  sms_used_count integer NOT NULL,
  recorded_at timestamp NOT NULL,
  created_at timestamp DEFAULT now()
);

-- Devices Table
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

-- Invoices Table
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

-- Enable Row Level Security
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Plans (public read)
CREATE POLICY "Plans are viewable by everyone" ON plans
  FOR SELECT USING (true);

-- Subscriptions (user specific)
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usage (user specific)
CREATE POLICY "Users can view their own usage" ON usage
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM subscriptions WHERE id = usage.subscription_id
    )
  );

-- Devices (user specific)
CREATE POLICY "Users can view their own devices" ON devices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own devices" ON devices
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own devices" ON devices
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert devices" ON devices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Invoices (user specific)
CREATE POLICY "Users can view their own invoices" ON invoices
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM subscriptions WHERE id = invoices.subscription_id
    )
  );

-- Insert sample plans
INSERT INTO plans (name, description, price, billing_period, data_limit_gb, call_minutes, sms_count, features, active)
VALUES
  ('Starter', 'Perfect for individuals', 9.99, 'monthly', 5, 100, 50, ARRAY['5GB Data', 'Unlimited Calls', '50 SMS/month', 'Basic Support'], true),
  ('Pro', 'Great for professionals', 24.99, 'monthly', 20, 500, 200, ARRAY['20GB Data', 'Unlimited Calls', '200 SMS/month', 'Priority Support', '5G Access'], true),
  ('Enterprise', 'For heavy users', 49.99, 'monthly', 100, 2000, 1000, ARRAY['100GB Data', 'Unlimited Calls', '1000 SMS/month', '24/7 Support', '5G Priority', 'International Roaming'], true);
`;

async function setupDatabase() {
  try {
    console.log('🚀 Setting up Supabase database schema...')
    
    // Execute SQL via Supabase API
    const { error } = await supabase.rpc('exec', { sql: SQL_SCHEMA })
    
    if (error) {
      console.error('❌ Error setting up database:', error.message)
      process.exit(1)
    }

    console.log('✅ Database schema created successfully!')
    console.log('✅ Sample plans inserted!')
  } catch (err) {
    console.error('❌ Setup failed:', err)
    process.exit(1)
  }
}

setupDatabase()
