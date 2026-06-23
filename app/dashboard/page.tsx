'use client'

import { useUser } from '@/lib/hooks'
import { useSubscription } from '@/lib/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()
  const { subscription, loading } = useSubscription(user?.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your account overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscription?.plans?.name || 'No Plan'}</div>
            <p className="text-sm text-gray-500 mt-1">
              {subscription?.status === 'active' ? '✅ Active' : '⚠️ Inactive'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${subscription?.plans?.price || '0'}</div>
            <p className="text-sm text-gray-500 mt-1">Renews {subscription?.current_period_end?.split('T')[0]}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-sm text-gray-500 mt-1">Member since {user?.created_at?.split('T')[0]}</p>
          </CardContent>
        </Card>
      </div>

      {/* Plan Details */}
      {subscription ? (
        <Card>
          <CardHeader>
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>{subscription.plans?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Data Limit</p>
                <p className="text-lg font-semibold">{subscription.plans?.data_limit_gb}GB/month</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Call Minutes</p>
                <p className="text-lg font-semibold">{subscription.plans?.call_minutes} minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">SMS Count</p>
                <p className="text-lg font-semibold">{subscription.plans?.sms_count} messages</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Features</p>
                <p className="text-lg font-semibold">{subscription.plans?.features?.length} included</p>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Link href="/dashboard/subscription">
                <Button>Manage Subscription</Button>
              </Link>
              <Button variant="outline">Download Invoice</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Active Plan</CardTitle>
            <CardDescription>Choose a plan to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/subscription">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                Browse Plans
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>📲 Devices</CardTitle>
            <CardDescription>Manage your connected devices</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/devices">
              <Button variant="outline" className="w-full">
                View Devices
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📈 Usage</CardTitle>
            <CardDescription>Check your data and call usage</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/usage">
              <Button variant="outline" className="w-full">
                View Usage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
