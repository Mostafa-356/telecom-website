/**
 * Database Query Functions
 * Reusable data access functions with proper typing
 */

import { supabase } from './supabase'
import type { Database } from '@/types/database'

// ===== PLANS =====

export async function getPlans() {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('active', true)
    .order('price', { ascending: true })

  if (error) throw error
  return data as Database['public']['Tables']['plans']['Row'][]
}

export async function getPlanById(planId: string) {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .single()

  if (error) throw error
  return data as Database['public']['Tables']['plans']['Row']
}

// ===== SUBSCRIPTIONS =====

export async function getUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*, plans(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
  return data
}

export async function createSubscription(
  userId: string,
  planId: string,
  currentPeriodStart: string,
  currentPeriodEnd: string
) {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      plan_id: planId,
      status: 'active',
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
    })
    .select()
    .single()

  if (error) throw error
  return data as Database['public']['Tables']['subscriptions']['Row']
}

export async function updateSubscription(
  subscriptionId: string,
  updates: Partial<Database['public']['Tables']['subscriptions']['Update']>
) {
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', subscriptionId)
    .select()
    .single()

  if (error) throw error
  return data as Database['public']['Tables']['subscriptions']['Row']
}

// ===== USAGE =====

export async function getUsageStats(subscriptionId: string) {
  const { data, error } = await supabase
    .from('usage')
    .select('*')
    .eq('subscription_id', subscriptionId)
    .order('recorded_at', { ascending: false })
    .limit(30)

  if (error) throw error
  return data as Database['public']['Tables']['usage']['Row'][]
}

export async function recordUsage(
  subscriptionId: string,
  dataUsedGb: number,
  callsUsedMinutes: number,
  smsUsedCount: number,
  recordedAt: string
) {
  const { data, error } = await supabase
    .from('usage')
    .insert({
      subscription_id: subscriptionId,
      data_used_gb: dataUsedGb,
      calls_used_minutes: callsUsedMinutes,
      sms_used_count: smsUsedCount,
      recorded_at: recordedAt,
    })
    .select()
    .single()

  if (error) throw error
  return data as Database['public']['Tables']['usage']['Row']
}

// ===== DEVICES =====

export async function getUserDevices(userId: string) {
  const { data, error } = await supabase
    .from('devices')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Database['public']['Tables']['devices']['Row'][]
}

export async function createDevice(
  userId: string,
  deviceName: string,
  deviceType: 'phone' | 'tablet' | 'smartwatch' | 'router',
  phoneNumber?: string,
  imei?: string
) {
  const { data, error } = await supabase
    .from('devices')
    .insert({
      user_id: userId,
      device_name: deviceName,
      device_type: deviceType,
      phone_number: phoneNumber,
      imei,
      active: true,
    })
    .select()
    .single()

  if (error) throw error
  return data as Database['public']['Tables']['devices']['Row']
}

export async function updateDevice(
  deviceId: string,
  updates: Partial<Database['public']['Tables']['devices']['Update']>
) {
  const { data, error } = await supabase
    .from('devices')
    .update(updates)
    .eq('id', deviceId)
    .select()
    .single()

  if (error) throw error
  return data as Database['public']['Tables']['devices']['Row']
}

// ===== INVOICES =====

export async function getUserInvoices(userId: string) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*, subscriptions(plans(*))')
    .eq('subscriptions.user_id', userId)
    .order('invoice_date', { ascending: false })

  if (error) throw error
  return data
}

export async function getInvoiceById(invoiceId: string) {
  const { data, error } = await supabase
    .from('invoices')
    .select('*, subscriptions(plans(*))')
    .eq('id', invoiceId)
    .single()

  if (error) throw error
  return data
}
