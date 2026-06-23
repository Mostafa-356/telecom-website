/**
 * Custom React Hooks for Supabase
 * Server and client-side hooks for authentication and data
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// ===== AUTH HOOKS =====

/**
 * Hook to get current user
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  return { user, loading }
}

/**
 * Hook to get current session
 */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => subscription?.unsubscribe()
  }, [])

  return { session, loading }
}

/**
 * Hook for authentication (sign in, sign up, sign out)
 */
export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
        },
      })
      if (error) throw error
      
      // Store email for verify page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('signupEmail', email)
      }
      
      router.push('/auth/verify-email')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }, [router])

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      
      // Add a small delay to ensure auth state is updated
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
      setLoading(false)
    }
  }, [router])

  const signOut = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed')
    } finally {
      setLoading(false)
    }
  }, [router])

  return { signUp, signIn, signOut, loading, error }
}

// ===== DATA HOOKS =====

/**
 * Hook to fetch user subscription
 */
export function useSubscription(userId: string | undefined) {
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*, plans(*)')
          .eq('user_id', userId)
          .eq('status', 'active')
          .single()

        if (error && error.code !== 'PGRST116') throw error
        setSubscription(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch subscription')
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`subscriptions:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'subscriptions',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setSubscription(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return { subscription, loading, error }
}

/**
 * Hook to fetch user devices
 */
export function useDevices(userId: string | undefined) {
  const [devices, setDevices] = useState<Database['public']['Tables']['devices']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchDevices = async () => {
      try {
        const { data, error } = await supabase
          .from('devices')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        setDevices(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch devices')
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`devices:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'devices',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setDevices((prev) => prev.filter((d) => d.id !== payload.old.id))
          } else {
            setDevices((prev) => {
              const idx = prev.findIndex((d) => d.id === payload.new.id)
              if (idx > -1) {
                prev[idx] = payload.new
              } else {
                prev.push(payload.new)
              }
              return [...prev]
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return { devices, loading, error }
}

/**
 * Hook to fetch usage stats
 */
export function useUsageStats(subscriptionId: string | undefined) {
  const [usage, setUsage] = useState<Database['public']['Tables']['usage']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!subscriptionId) {
      setLoading(false)
      return
    }

    const fetchUsage = async () => {
      try {
        const { data, error } = await supabase
          .from('usage')
          .select('*')
          .eq('subscription_id', subscriptionId)
          .order('recorded_at', { ascending: false })
          .limit(30)

        if (error) throw error
        setUsage(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch usage')
      } finally {
        setLoading(false)
      }
    }

    fetchUsage()

    // Subscribe to real-time changes
    const channel = supabase
      .channel(`usage:${subscriptionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'usage',
          filter: `subscription_id=eq.${subscriptionId}`,
        },
        (payload) => {
          setUsage((prev) => [payload.new, ...prev.slice(0, 29)])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [subscriptionId])

  return { usage, loading, error }
}
