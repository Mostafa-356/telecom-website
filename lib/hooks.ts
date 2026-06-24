'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from './supabase'
import * as authFunctions from './auth'

/**
 * Hook to get current user and auth state
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) {
        setError(error)
      } else {
        setUser(user)
      }
      setLoading(false)
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { user, loading, error }
}

/**
 * Hook for authentication functions
 */
export function useAuth() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const signUp = useCallback(
    async (email: string, password: string, metadata?: Record<string, any>) => {
      setLoading(true)
      setError(null)
      try {
        const { error: err } = await authFunctions.signUp(email, password, metadata)
        if (err) throw err
        // Redirect to verify email page
        router.push('/auth/verify-email')
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Sign up failed'))
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      setError(null)
      try {
        const { error: err } = await authFunctions.signIn(email, password)
        if (err) throw err
        router.push('/dashboard')
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Sign in failed'))
      } finally {
        setLoading(false)
      }
    },
    [router]
  )

  const signOut = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { error: err } = await authFunctions.signOut()
      if (err) throw err
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Sign out failed'))
    } finally {
      setLoading(false)
    }
  }, [router])

  return { signUp, signIn, signOut, loading, error }
}

/**
 * Hook to listen to real-time changes on a table
 */
export function useRealtimeSubscription(
  table: string,
  filter?: string,
  onUpdate?: (payload: any) => void
) {
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          ...(filter && { filter }),
        },
        (payload) => {
          if (onUpdate) onUpdate(payload)
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [table, filter, onUpdate])
}

/**
 * Hook to subscribe to real-time usage updates
 */
export function useRealtimeUsage(subscriptionId: string | null) {
  const [usage, setUsage] = useState<any>(null)

  useRealtimeSubscription(
    'usage',
    subscriptionId ? `subscription_id=eq.${subscriptionId}` : undefined,
    (payload) => {
      if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
        setUsage(payload.new)
      }
    }
  )

  return { usage }
}

/**
 * Hook to subscribe to real-time subscription status changes
 */
export function useRealtimeSubscriptionStatus(userId: string | null) {
  const [subscription, setSubscription] = useState<any>(null)

  useRealtimeSubscription(
    'subscriptions',
    userId ? `user_id=eq.${userId}` : undefined,
    (payload) => {
      if (payload.eventType === 'UPDATE') {
        setSubscription(payload.new)
      }
    }
  )

  return { subscription }
}


/**
 * Hook to get user subscription data
 */
export function useSubscription() {
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    // TODO: Fetch subscription from Supabase when configured
    setSubscription(null)
    setLoading(false)
  }, [user?.id])

  return { subscription, loading, error }
}

/**
 * Hook to get usage statistics
 */
export function useUsageStats() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    // TODO: Fetch usage stats from Supabase when configured
    setStats(null)
    setLoading(false)
  }, [user?.id])

  return { stats, loading, error }
}

/**
 * Hook to manage devices
 */
export function useDevices() {
  const [devices, setDevices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { user } = useUser()

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    // TODO: Fetch devices from Supabase when configured
    setDevices([])
    setLoading(false)
  }, [user?.id])

  return { devices, loading, error }
}
