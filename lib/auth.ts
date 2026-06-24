import { createClient } from './supabase'

/**
 * Sign up a new user
 */
export async function signUp(email: string, password: string, metadata?: Record<string, any>) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/auth/verify-email`,
    },
  })

  return { data, error }
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })

  return { data, error }
}

/**
 * Update user password
 */
export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  return { data, error }
}

/**
 * Get current user
 */
export async function getUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Update user metadata
 */
export async function updateUserMetadata(metadata: Record<string, any>) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    data: metadata,
  })

  return { data, error }
}


/**
 * Update user profile information
 */
export async function updateProfile(profile: {
  name?: string
  avatar_url?: string
  bio?: string
}) {
  return updateUserMetadata(profile)
}
