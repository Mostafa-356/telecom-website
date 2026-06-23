import { createClient } from './supabase'
import { createServerSupabaseClient } from './supabase-server'

/**
 * Get all available plans
 */
export async function getPlans() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('price', { ascending: true })

  return { data, error }
}

/**
 * Get user's current subscription (Server Component)
 */
export async function getUserSubscription(userId: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*, plans(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  return { data, error }
}

/**
 * Get user's usage data (Server Component)
 */
export async function getUserUsage(subscriptionId: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('usage')
    .select('*')
    .eq('subscription_id', subscriptionId)
    .order('recorded_at', { ascending: false })
    .limit(30)

  return { data, error }
}

/**
 * Get user's devices (Server Component)
 */
export async function getUserDevices(userId: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

/**
 * Get user's invoices (Server Component)
 */
export async function getUserInvoices(userId: string) {
  const supabase = await createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .in(
      'subscription_id',
      (
        await supabase
          .from('subscriptions')
          .select('id')
          .eq('user_id', userId)
      ).data?.map((s) => s.id) || []
    )
    .order('invoice_date', { ascending: false })

  return { data, error }
}

/**
 * Create a new subscription
 */
export async function createSubscription(userId: string, planId: string) {
  const supabase = createClient()
  
  const now = new Date()
  const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days

  const { data, error } = await supabase
    .from('subscriptions')
    .insert([
      {
        user_id: userId,
        plan_id: planId,
        status: 'active',
        current_period_start: now,
        current_period_end: periodEnd,
      },
    ])
    .select()

  return { data, error }
}

/**
 * Add a device
 */
export async function addDevice(userId: string, deviceData: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('devices')
    .insert([
      {
        user_id: userId,
        ...deviceData,
      },
    ])
    .select()

  return { data, error }
}

/**
 * Update a device
 */
export async function updateDevice(deviceId: string, updates: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('devices')
    .update(updates)
    .eq('id', deviceId)
    .select()

  return { data, error }
}

/**
 * Delete a device
 */
export async function deleteDevice(deviceId: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('devices')
    .delete()
    .eq('id', deviceId)

  return { error }
}
