import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { logger } from '@/lib/logger'

export async function proxy(request: NextRequest) {
  // Create a response that we'll update with cookies
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // Don't run auth checks on auth callback routes - they handle their own auth
  if (
    request.nextUrl.pathname === '/auth/callback' ||
    request.nextUrl.pathname === '/auth/reset-password'
  ) {
    return response
  }

  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  // Debug logging for authentication issues (development only)
  if (process.env.NODE_ENV === 'development') {
    if (authError) {
      logger.error('[Middleware] Auth error:', authError)
    }
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      logger.info('[Middleware] Dashboard access attempt:', {
        path: request.nextUrl.pathname,
        hasUser: !!user,
        userId: user?.id ? user.id.substring(0, 8) + '...' : undefined, // Truncated for privacy
      })
    }
  }

  // Protect dashboard routes - redirect to login if not authenticated
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`
    url.searchParams.set('next', nextPath)
    return NextResponse.redirect(url)
  }

  // Redirect to dashboard if already logged in and trying to access login
  if (request.nextUrl.pathname === '/login' && user) {
    const needsOnboarding = request.nextUrl.searchParams.get('needs_onboarding') === 'true'
    if (needsOnboarding) {
      return response
    }
    const nextParam = request.nextUrl.searchParams.get('next')
    const safeNext =
      nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')
        ? nextParam
        : '/dashboard'
    return NextResponse.redirect(new URL(safeNext, request.url))
  }

  // IMPORTANT: You *must* return the response object as it is.
  // This response has cookies set by Supabase's session refresh logic.
  return response
}

export default proxy

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
