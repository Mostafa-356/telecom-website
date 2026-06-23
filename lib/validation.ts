/**
 * Zod Validation Schemas
 * For form validation and type safety
 */

import { z } from 'zod'

// Auth schemas
export const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const ProfileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
})

// Plan & subscription schemas
export const PlanSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  billingPeriod: z.enum(['monthly', 'yearly']),
  dataLimitGb: z.number().positive(),
  callMinutes: z.number().positive(),
  smsCount: z.number().positive(),
  features: z.array(z.string()),
})

// Device schemas
export const DeviceSchema = z.object({
  deviceName: z.string().min(1, 'Device name is required'),
  deviceType: z.enum(['phone', 'tablet', 'smartwatch', 'router']),
  phoneNumber: z.string().optional(),
  imei: z.string().optional(),
})

// Usage schemas
export const UsageSchema = z.object({
  dataUsedGb: z.number().nonnegative(),
  callsUsedMinutes: z.number().nonnegative(),
  smsUsedCount: z.number().nonnegative(),
  recordedAt: z.string().datetime(),
})

// Export types
export type SignUp = z.infer<typeof SignUpSchema>
export type SignIn = z.infer<typeof SignInSchema>
export type Profile = z.infer<typeof ProfileSchema>
export type Plan = z.infer<typeof PlanSchema>
export type Device = z.infer<typeof DeviceSchema>
export type Usage = z.infer<typeof UsageSchema>
