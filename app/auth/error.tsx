'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Auth Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-2">
            <div className="text-5xl mb-4">🔐</div>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription>Something went wrong during authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Message */}
            {error.message && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 font-mono break-words">
                  {error.message}
                </p>
              </div>
            )}

            {/* Error Reference */}
            {error.digest && (
              <div className="text-xs text-gray-500 text-center">
                Reference ID: {error.digest}
              </div>
            )}

            {/* Troubleshooting */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Try these steps:</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">1.</span> Try again
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">2.</span> Clear browser cache
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">3.</span> Contact support
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4">
              <Button
                onClick={reset}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full"
              >
                Try Again
              </Button>
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Support */}
            <p className="text-xs text-gray-500 text-center pt-4 border-t">
              Need help?{' '}
              <a href="mailto:support@example.com" className="text-purple-600 hover:text-purple-700 font-semibold">
                Contact Support
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
