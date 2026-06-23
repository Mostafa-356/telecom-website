'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [isResending, setIsResending] = useState(false)
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    // Get email from session storage if available
    const storedEmail = typeof window !== 'undefined' ? sessionStorage.getItem('signupEmail') : null
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleResendEmail = async () => {
    setIsResending(true)
    // In a real app, you would call an API to resend the verification email
    setTimeout(() => {
      setIsResending(false)
    }, 2000)
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        <CardDescription>Check your inbox to confirm your email address</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Success state */}
        <Alert>
          <AlertDescription className="text-green-700">
            ✅ We've sent a confirmation email to {email || 'your email address'}
          </AlertDescription>
        </Alert>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-700">Next steps:</p>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>Check your email inbox</li>
            <li>Click the verification link in the email</li>
            <li>You'll be redirected to set up your account</li>
          </ol>
        </div>

        {/* Additional info */}
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            <strong>Didn't receive the email?</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure you entered the correct email address</li>
            <li>• Verification links expire after 24 hours</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Button
            onClick={handleResendEmail}
            disabled={isResending}
            variant="outline"
            className="w-full"
          >
            {isResending ? 'Resending...' : 'Resend Verification Email'}
          </Button>

          <Link href="/auth/signin">
            <Button variant="ghost" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>

        {/* Help text */}
        <p className="text-xs text-gray-500 text-center pt-4 border-t">
          Having trouble? <a href="mailto:support@example.com" className="text-purple-600 hover:text-purple-700">Contact Support</a>
        </p>
      </CardContent>
    </Card>
  )
}
