'use client'

import { useState, useEffect } from 'react'
import { useUser, useDevices } from '@/lib/hooks'
import { createDevice, updateDevice } from '@/lib/queries'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeviceSchema, type Device } from '@/lib/validation'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function DevicesPage() {
  const { user } = useUser()
  const { devices, loading } = useDevices(user?.id)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<Device>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      deviceName: '',
      deviceType: 'phone',
      phoneNumber: '',
      imei: '',
    },
  })

  const onSubmit = async (values: Device) => {
    if (!user?.id) {
      setError('User not authenticated')
      return
    }

    try {
      await createDevice(
        user.id,
        values.deviceName,
        values.deviceType,
        values.phoneNumber,
        values.imei
      )
      form.reset()
      setShowForm(false)
      setError(null)
    } catch (err) {
      setError('Failed to add device')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading devices...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">My Devices</h1>
          <p className="text-gray-600 mt-2">Manage your connected devices</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          {showForm ? 'Cancel' : '+ Add Device'}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Add Device Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Device</CardTitle>
            <CardDescription>Register a new device to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="deviceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device Name</FormLabel>
                      <FormControl>
                        <Input placeholder="iPhone 15 Pro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deviceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Device Type</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full border rounded px-3 py-2">
                          <option value="phone">Phone</option>
                          <option value="tablet">Tablet</option>
                          <option value="smartwatch">Smart Watch</option>
                          <option value="router">Router</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imei"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IMEI (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="358240082855607" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Add Device
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Devices List */}
      {devices.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-600">No devices yet. Add one to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devices.map((device) => (
            <Card key={device.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{device.device_name}</CardTitle>
                    <CardDescription className="mt-1">{device.device_type.charAt(0).toUpperCase() + device.device_type.slice(1)}</CardDescription>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${device.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {device.active ? '✅ Active' : 'Inactive'}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {device.phone_number && (
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-mono">{device.phone_number}</p>
                  </div>
                )}
                {device.imei && (
                  <div>
                    <p className="text-sm text-gray-600">IMEI</p>
                    <p className="font-mono text-sm">{device.imei}</p>
                  </div>
                )}
                <div className="pt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateDevice(device.id, { active: !device.active })}
                  >
                    {device.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
