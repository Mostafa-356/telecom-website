/**
 * Supabase Database Types
 * Auto-generated from schema - update with: supabase gen types typescript --local > types/database.ts
 */

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          updated_at?: string
        }
      }
      plans: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          billing_period: 'monthly' | 'yearly'
          data_limit_gb: number
          call_minutes: number
          sms_count: number
          features: string[]
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          billing_period: 'monthly' | 'yearly'
          data_limit_gb: number
          call_minutes: number
          sms_count: number
          features?: string[]
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          price?: number
          billing_period?: 'monthly' | 'yearly'
          data_limit_gb?: number
          call_minutes?: number
          sms_count?: number
          features?: string[]
          active?: boolean
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: 'active' | 'paused' | 'cancelled' | 'expired'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end: boolean
          cancelled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: 'active' | 'paused' | 'cancelled' | 'expired'
          current_period_start: string
          current_period_end: string
          cancel_at_period_end?: boolean
          cancelled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'active' | 'paused' | 'cancelled' | 'expired'
          cancel_at_period_end?: boolean
          cancelled_at?: string | null
          updated_at?: string
        }
      }
      usage: {
        Row: {
          id: string
          subscription_id: string
          data_used_gb: number
          calls_used_minutes: number
          sms_used_count: number
          recorded_at: string
          created_at: string
        }
        Insert: {
          id?: string
          subscription_id: string
          data_used_gb: number
          calls_used_minutes: number
          sms_used_count: number
          recorded_at: string
          created_at?: string
        }
        Update: {
          data_used_gb?: number
          calls_used_minutes?: number
          sms_used_count?: number
        }
      }
      devices: {
        Row: {
          id: string
          user_id: string
          device_name: string
          device_type: 'phone' | 'tablet' | 'smartwatch' | 'router'
          phone_number: string | null
          imei: string | null
          active: boolean
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          device_name: string
          device_type: 'phone' | 'tablet' | 'smartwatch' | 'router'
          phone_number?: string | null
          imei?: string | null
          active?: boolean
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          device_name?: string
          device_type?: 'phone' | 'tablet' | 'smartwatch' | 'router'
          phone_number?: string | null
          imei?: string | null
          active?: boolean
          image_url?: string | null
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          subscription_id: string
          amount: number
          currency: string
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          invoice_date: string
          due_date: string
          paid_at: string | null
          pdf_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subscription_id: string
          amount: number
          currency?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          invoice_date: string
          due_date: string
          paid_at?: string | null
          pdf_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          paid_at?: string | null
          pdf_url?: string | null
          updated_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
