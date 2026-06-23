import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center max-w-lg space-y-8">
        {/* Animated 404 */}
        <div className="relative h-48 flex items-center justify-center">
          <div className="relative">
            {/* Animated background circles */}
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-3xl opacity-20"></div>
            </div>

            {/* 404 Text */}
            <div className="relative text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 animate-bounce">
              404
            </div>

            {/* Floating dots animation */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse" style={{ animationDuration: '3s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-lg text-gray-600">
            Oops! The page you're looking for seems to have wandered off the network. Don't worry, we'll get you back on track.
          </p>
        </div>

        {/* Suggestions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Here's what you can do:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span> Check the URL for typos
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span> Return to the home page
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-600">✓</span> Contact support if you need help
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 text-lg">
              ← Back Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Error Code */}
        <div className="text-xs text-gray-500 pt-8 border-t">
          Error Code: 404 | Network Route Not Found
        </div>
      </div>
    </div>
  )
}
