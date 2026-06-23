'use client'

import { useUser, useSubscription, useUsageStats } from '@/lib/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function UsagePage() {
  const { user } = useUser()
  const { subscription } = useSubscription(user?.id)
  const { usage, loading } = useUsageStats(subscription?.id)

  const currentUsage = usage[0] || {
    data_used_gb: 0,
    calls_used_minutes: 0,
    sms_used_count: 0,
  }

  const dataPercent = subscription?.plans?.data_limit_gb
    ? (currentUsage.data_used_gb / subscription.plans.data_limit_gb) * 100
    : 0

  const callsPercent = subscription?.plans?.call_minutes
    ? (currentUsage.calls_used_minutes / subscription.plans.call_minutes) * 100
    : 0

  const smsPercent = subscription?.plans?.sms_count
    ? (currentUsage.sms_used_count / subscription.plans.sms_count) * 100
    : 0

  if (loading) {
    return <div className="text-center py-8">Loading usage...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Usage</h1>
        <p className="text-gray-600 mt-2">Track your data, calls, and SMS usage</p>
      </div>

      {/* Usage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Data Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Data Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{currentUsage.data_used_gb}GB</span>
                <span className="text-sm text-gray-600">of {subscription?.plans?.data_limit_gb}GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${Math.min(dataPercent, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">{dataPercent.toFixed(1)}% used</p>
          </CardContent>
        </Card>

        {/* Calls Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Call Minutes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{currentUsage.calls_used_minutes}m</span>
                <span className="text-sm text-gray-600">of {subscription?.plans?.call_minutes}m</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${Math.min(callsPercent, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">{callsPercent.toFixed(1)}% used</p>
          </CardContent>
        </Card>

        {/* SMS Usage */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">SMS Count</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{currentUsage.sms_used_count}</span>
                <span className="text-sm text-gray-600">of {subscription?.plans?.sms_count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${Math.min(smsPercent, 100)}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">{smsPercent.toFixed(1)}% used</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage History */}
      {usage.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Usage History</CardTitle>
            <CardDescription>Last 30 days of usage data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Data (GB)</th>
                    <th className="text-left py-2 px-4">Calls (min)</th>
                    <th className="text-left py-2 px-4">SMS</th>
                  </tr>
                </thead>
                <tbody>
                  {usage.slice(0, 10).map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{new Date(record.recorded_at).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{record.data_used_gb.toFixed(2)}</td>
                      <td className="py-2 px-4">{record.calls_used_minutes}</td>
                      <td className="py-2 px-4">{record.sms_used_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
