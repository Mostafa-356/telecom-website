/**
 * Authentication Utilities
 * Helper functions for user authentication
 */

import { supabase } from './supabase'

/**
 * Sign up new user with email and password
 */
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) throw error
  return data
}

/**
 * Sign in user with email and password
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

/**
 * Get current session
 */
export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

/**
 * Update user profile
 */
export async function updateProfile(fullName: string, phone?: string) {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
      phone,
    },
  })

  if (error) throw error
  return data
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}
