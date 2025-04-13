import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if we're on a protected route
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/profile')

  if (isProtectedRoute && !session) {
    // Redirect to login if accessing a protected route without a session
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ['/profile/:path*'],
}
