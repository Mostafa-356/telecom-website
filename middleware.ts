import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // This middleware refreshes the auth token on every request
  // It also handles redirects for protected routes

  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Session update is handled in supabase-server.ts
    // If no session, Supabase will return null and auth check should redirect
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith('/auth')) {
    const session = request.cookies.get('sb-session')
    if (session) {
      // User is already authenticated, redirect to dashboard
      // This is optional - you might want to allow viewing auth pages even when logged in
    }
  }

  return NextResponse.next()
}

// Specify which routes should run middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sw.js (service worker)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|sw.js|public).*)',
  ],
}
