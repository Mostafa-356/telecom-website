'use client'

import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="text-center max-w-lg space-y-8">
            {/* Animated Error */}
            <div className="relative h-40 flex items-center justify-center">
              <div className="text-8xl animate-bounce">🔴</div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Component Error</h1>
              <p className="text-gray-600">
                Something went wrong while rendering this component. Please try refreshing the page.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
              <p className="text-sm font-mono text-left text-red-600 break-words">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>

            <Button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
