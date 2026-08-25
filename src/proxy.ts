import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { logger } from '@/lib/logger'

/**
 * Permanently withdrawn content with no equivalent live page.
 *
 * Polymarket is prohibited in Australia under the Interactive Gambling Act 2001;
 * the research-peptide cluster was withdrawn as grey-market and off-fit for the
 * consumer health direction. Neither has a closest-live-page by intent, so the
 * usual 301 does not apply: a bulk redirect to '/' is read by Google as a soft
 * 404, passes no equity, and leaves the URL in limbo. 410 Gone is the correct,
 * unambiguous signal and deindexes fastest.
 *
 * Exact paths, plus anything nested beneath them.
 */
const GONE = [
  '/polymarket',
  '/best-peptide-supplier',
  '/apollopeptides',
  '/ascensionpeptides',
  '/biopeptitech',
  '/apollo-vs-ascension',
  '/apollo-vs-biopeptitech',
  '/ascension-vs-biopeptitech',
  '/compare/research-peptides',
]

function isGone(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, '') || '/'
  return GONE.some((g) => p === g || p.startsWith(`${g}/`))
}

// Crawlers need the status code; people who follow an old link need somewhere to go.
const GONE_BODY = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Page no longer available | Refer Labs</title>
<style>body{margin:0;background:#F6F5F1;color:#16201C;font:16px/1.6 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}
main{max-width:32rem;padding:2rem;text-align:center}h1{font-size:1.5rem;margin:0 0 .75rem}
a{color:#0E7C66;font-weight:600}</style></head><body><main>
<h1>This page is no longer available</h1>
<p>We removed it and there is no replacement. If you were comparing something specific, our current guides are the best starting point.</p>
<p><a href="/guides">Browse the guides</a></p>
</main></body></html>`

async function runProxy(request: NextRequest) {
  // Checked before the Supabase client is built: these paths need no session, and
  // skipping the auth roundtrip keeps a bot hammering dead URLs off the auth path.
  if (isGone(request.nextUrl.pathname)) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' },
    })
  }

  // Create a response that we'll update with cookies
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // A missing Supabase env var must never take the whole site down. These two
  // were asserted non-null with `!`, so when they became unreadable on 24 Aug
  // 2026 createServerClient threw inside middleware, which runs on every
  // request, and every page returned 500 including the ones people paid for.
  // Auth is the only thing here that needs them; the other 160-odd pages are
  // public and do not.
  //
  // If they are absent: log it and serve the request without the auth check. A
  // signed-in user loses session refresh until the variable is restored, which
  // is a far smaller failure than a total outage.
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supaAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supaUrl || !supaAnon) {
    console.error(
      "[proxy] Supabase env missing (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY); " +
        "serving without an auth check. NEXT_PUBLIC_* values are inlined at build, so they must " +
        'not be marked "Sensitive" in Vercel, which makes them runtime-only.',
    )
    return response
  }

  const supabase = createServerClient(
    supaUrl,
    supaAnon,
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
  }

  // The dashboard it used to guard is gone with the retired SaaS (Aug 2026).
  // Anything under /dashboard now 404s, which is the honest answer for a product
  // that no longer exists, and there is nothing left to gate.

  // Already signed in and hitting /login: send them on rather than showing a form
  if (request.nextUrl.pathname === '/login' && user) {
    const needsOnboarding = request.nextUrl.searchParams.get('needs_onboarding') === 'true'
    if (needsOnboarding) {
      return response
    }
    const nextParam = request.nextUrl.searchParams.get('next')
    const safeNext =
      nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//')
        ? nextParam
        : '/'
    return NextResponse.redirect(new URL(safeNext, request.url))
  }

  // IMPORTANT: You *must* return the response object as it is.
  // This response has cookies set by Supabase's session refresh logic.
  return response
}

// Searchable's server-side event capture was removed on 14 Aug 2026 when the
// trial ended. It wrapped every request and forwarded it to a third party, so
// leaving it in place after the relationship ended would keep sending visitor
// data to a vendor with no reason to receive it. The client-side tracker in
// components/Analytics.tsx went with it.
export const proxy = runProxy

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
