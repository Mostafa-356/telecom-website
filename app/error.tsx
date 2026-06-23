'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error caught by boundary:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg space-y-8">
        {/* Animated Error Icon */}
        <div className="relative h-40 flex items-center justify-center">
          <div className="relative">
            {/* Animated background */}
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
            </div>

            {/* Error Icon */}
            <div className="relative text-8xl animate-bounce">⚠️</div>

            {/* Pulse rings */}
            <div className="absolute -inset-12 border-2 border-red-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute -inset-24 border-2 border-pink-400 rounded-full opacity-10 animate-pulse" style={{ animationDuration: '3s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Something Went Wrong</h1>
          <p className="text-lg text-gray-600">
            We encountered an unexpected error. Our team has been notified and is working to fix it.
          </p>
        </div>

        {/* Error Details */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-4">
          {error.message && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Error Details:</p>
              <div className="bg-red-50 border border-red-200 rounded p-3 text-left">
                <p className="text-sm text-red-800 font-mono break-words">{error.message}</p>
              </div>
            </div>
          )}

          {error.digest && (
            <div className="text-xs text-gray-500">
              Reference ID: {error.digest}
            </div>
          )}
        </div>

        {/* Troubleshooting */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
          <p className="text-sm font-semibold text-gray-700">Try these steps:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">1.</span> Refresh the page
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">2.</span> Clear your browser cache
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">3.</span> Try again in a few minutes
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            onClick={reset}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg"
          >
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Dashboard
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
