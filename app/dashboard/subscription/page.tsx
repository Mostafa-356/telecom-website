'use client'

import { useState, useEffect } from 'react'
import { useUser, useSubscription } from '@/lib/hooks'
import { getPlans, createSubscription } from '@/lib/queries'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { Database } from '@/types/database'

export default function SubscriptionPage() {
  const { user } = useUser()
  const { subscription } = useSubscription(user?.id)
  const [plans, setPlans] = useState<Database['public']['Tables']['plans']['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [selectingPlan, setSelectingPlan] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await getPlans()
        setPlans(data)
      } catch (err) {
        setError('Failed to load plans')
      } finally {
        setLoading(false)
      }
    }
    loadPlans()
  }, [])

  const handleSelectPlan = async (planId: string) => {
    if (!user?.id) {
      setError('User not authenticated')
      return
    }

    setSelectingPlan(planId)
    try {
      const now = new Date()
      const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

      await createSubscription(
        user.id,
        planId,
        now.toISOString(),
        endDate.toISOString()
      )
      setError(null)
    } catch (err) {
      setError('Failed to subscribe to plan')
    } finally {
      setSelectingPlan(null)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading plans...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Plans & Subscription</h1>
        <p className="text-gray-600 mt-2">Choose the perfect plan for your needs</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {subscription && (
        <Alert>
          <AlertDescription>
            📱 You're currently on the <strong>{subscription.plans?.name}</strong> plan
          </AlertDescription>
        </Alert>
      )}

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={subscription?.plan_id === plan.id ? 'border-purple-600 border-2' : ''}>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price */}
              <div>
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600 ml-2">/{plan.billing_period}</span>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="font-semibold text-sm">Features:</p>
                <ul className="space-y-1">
                  <li className="text-sm text-gray-600">📊 {plan.data_limit_gb}GB data/month</li>
                  <li className="text-sm text-gray-600">📞 {plan.call_minutes} call minutes</li>
                  <li className="text-sm text-gray-600">💬 {plan.sms_count} SMS/month</li>
                </ul>
              </div>

              {/* Additional Features */}
              {plan.features && plan.features.length > 0 && (
                <div className="space-y-1">
                  {plan.features.map((feature) => (
                    <p key={feature} className="text-sm text-green-600">
                      ✅ {feature}
                    </p>
                  ))}
                </div>
              )}

              {/* Button */}
              {subscription?.plan_id === plan.id ? (
                <Button disabled className="w-full">
                  Current Plan
                </Button>
              ) : (
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={selectingPlan === plan.id}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {selectingPlan === plan.id ? 'Switching...' : 'Switch Plan'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
