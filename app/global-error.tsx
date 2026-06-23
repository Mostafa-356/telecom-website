'use client'

import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="text-center max-w-lg space-y-8">
            {/* Critical Error Icon */}
            <div className="relative h-40 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl opacity-30"></div>
                </div>
                <div className="relative text-8xl animate-bounce">🚨</div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Critical Error</h1>
              <p className="text-lg text-gray-600">
                A critical error has occurred. Please refresh the page or contact support if the problem persists.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <p className="text-sm font-semibold text-gray-700">Error Information:</p>
              <div className="bg-red-50 border border-red-200 rounded p-3 text-left">
                <p className="text-sm text-red-800 font-mono break-words">{error.message}</p>
              </div>
              {error.digest && (
                <p className="text-xs text-gray-500">Reference: {error.digest}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={reset}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all"
              >
                Try Again
              </button>
              <Link href="/">
                <button className="w-full px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Back to Home
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="w-full px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Dashboard
                </button>
              </Link>
              <Link href="/auth/signin">
                <button className="w-full px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
