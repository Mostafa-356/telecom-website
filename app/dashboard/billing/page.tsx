'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/lib/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function BillingPage() {
  const { user } = useUser()
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadInvoices() {
      if (!user?.id) return
      setLoading(true)
      try {
        // TODO: Fetch invoices from server action when Supabase is configured
        // For now, display a placeholder
        setInvoices([])
      } finally {
        setLoading(false)
      }
    }
    if (user?.id) {
      loadInvoices()
    }
  }, [user?.id])

  if (loading) {
    return <div className="text-center py-8">Loading invoices...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Billing</h1>
        <p className="text-gray-600 mt-2">View and manage your invoices</p>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-600">Card ending in</p>
            <p className="font-semibold">•••• •••• •••• 4242</p>
          </div>
          <Button variant="outline">Update Payment Method</Button>
        </CardContent>
      </Card>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Recent billing statements</CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No invoices yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Amount</th>
                    <th className="text-left py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">${invoice.amount.toFixed(2)}</td>
                      <td className="py-2 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        {invoice.pdf_url ? (
                          <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline">
                              Download
                            </Button>
                          </a>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            Coming Soon
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
