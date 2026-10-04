import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { logger } from '@/lib/logger'
import { HIMS_SLUG_LIST } from '@/content/hims/slugs'
import { HIMS_REVIEW_COOKIE, REVIEW_HEADERS, hasReviewAccess, isHimsSlug } from '@/lib/hims/access'
import { reviewGateHtml, type GateError } from '@/lib/hims/review-gate'

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
  // Integration docs for the referral SaaS retired in July 2026 (5 Sep 2026).
  // "Sync ambassadors into Klaviyo", "Embed Refer Labs referral pages in
  // Squarespace": a product that no longer exists. They were in no sitemap and
  // no seoConfig, yet live, indexed and drawing impressions. There is no
  // closest-live-page for a feature that was withdrawn, so 410 rather than a
  // redirect to a hub that does not answer the query either.
  '/calendly',
  '/klaviyo',
  '/mailchimp',
  '/make',
  '/squarespace',
  '/stripe',
  '/webflow',
  // Deleted on purpose (Aug 2026), and 404 left Google guessing. It was ranking
  // at position 5.6 with clicks; losing that is the accepted price of the
  // decision, and 410 makes the withdrawal explicit rather than ambiguous.
  '/juniper-alternatives',
  // US legal content we do not write and will not write (5 Sep 2026). It drew
  // 13 clicks a quarter at position 19.5 and 308ed to /affiliate-programs-
  // australia, an Australian affiliate hub that answers a different question
  // entirely, so every one of those readers arrived and left. There is no
  // closest-live-page for "attorney referral fee rules by state" on a site
  // about Australian consumer comparisons, which is what 410 is for.
  '/blog/attorney-referral-fee-rules-state-guide',
  // The rest of the retired referral SaaS (14 Sep 2026): integration docs that
  // published the old capture-secret header name, the status and security pages,
  // the go-live checklist, the ambassador join and stats pages, and a debug page.
  // Same reasoning as the integration docs above: no live page answers them.
  '/analytics',
  '/api-guide',
  '/dashboard-test',
  '/go-live',
  '/gtm',
  '/hubspot',
  '/meta-ads',
  '/r/ambassador-join',
  '/r/referral',
  '/referred',
  '/security',
  '/servicem8',
  '/shopify',
  '/square',
  '/status',
  '/wix',
  '/wordpress',
  '/zapier',
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

const HIMS_NOT_FOUND_BODY = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Page not found | Refer Labs</title>
<style>body{margin:0;background:#F6F5F1;color:#16201C;font:16px/1.6 system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}
main{max-width:32rem;padding:2rem;text-align:center}h1{font-size:1.5rem;margin:0 0 .75rem}a{color:#0E7C66;font-weight:600}</style></head>
<body><main><h1>Page not found</h1><p><a href="/guides">Browse the guides</a></p></main></body></html>`

function withReviewHeaders(res: NextResponse): NextResponse {
  for (const [k, v] of Object.entries(REVIEW_HEADERS)) res.headers.set(k, v)
  return res
}

// /preview/auth            -> the password route handler (POST only)
// POST /preview/<slug>     -> rewritten to /preview/auth (slug in x-review-slug); the form
//                             posts to its own URL so its markup never names the page
// GET /preview/<slug>      -> the draft with a valid review cookie, else the 401 gate
// anything else            -> 404
function reviewArea(request: NextRequest, rest: string): NextResponse {
  if (rest === 'auth') return withReviewHeaders(NextResponse.next())
  // Any well-formed slug gets the same gate and the same password handling, so a
  // visitor without the password cannot tell a real preview from an invented one
  // (5 Oct 2026 audit). Only a visitor holding the cookie sees the 404 for an
  // unknown slug.
  const notFound = () =>
    new NextResponse(HIMS_NOT_FOUND_BODY, {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8', ...REVIEW_HEADERS },
    })
  if (!/^[a-z0-9-]{1,60}$/.test(rest)) return notFound()
  if (request.method === 'POST') {
    // The slug travels as a request header: the route handler sees the original URL's
    // query string after a rewrite, not the rewritten one (found in local testing).
    const url = request.nextUrl.clone()
    url.pathname = '/preview/auth'
    url.search = ''
    const headers = new Headers(request.headers)
    headers.set('x-review-slug', rest)
    return withReviewHeaders(NextResponse.rewrite(url, { request: { headers } }))
  }
  if (hasReviewAccess(request.cookies.get(HIMS_REVIEW_COOKIE)?.value)) {
    return isHimsSlug(rest) ? withReviewHeaders(NextResponse.next()) : notFound()
  }
  const e = request.nextUrl.searchParams.get('error')
  const error: GateError = e === 'wrong' || e === 'limited' ? e : null
  return new NextResponse(reviewGateHtml(error), {
    status: 401,
    headers: { 'content-type': 'text/html; charset=utf-8', ...REVIEW_HEADERS },
  })
}

async function runProxy(request: NextRequest) {
  // Checked before the Supabase client is built: these paths need no session, and
  // skipping the auth roundtrip keeps a bot hammering dead URLs off the auth path.
  if (isGone(request.nextUrl.pathname)) {
    return new NextResponse(GONE_BODY, {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' },
    })
  }

  // Hims page set (29 Sep 2026; password review area 2 Oct 2026).
  // The real slugs 404 for everyone until HIMS_PAGES_LIVE=true. Refusing here, before
  // rendering starts, matters: the page's own notFound() runs after the root
  // loading.tsx has begun streaming, so it served the not-found UI with status 200
  // and leaked the page title from generateMetadata (29 Sep 2026).
  const himsPath = request.nextUrl.pathname.replace(/^\/+|\/+$/g, '')
  if ((HIMS_SLUG_LIST as readonly string[]).includes(himsPath) && process.env.HIMS_PAGES_LIVE !== 'true') {
    return new NextResponse(HIMS_NOT_FOUND_BODY, {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8', ...REVIEW_HEADERS },
    })
  }
  // /preview/*: the password-protected review copy. Every response here is noindex
  // and uncached. Deliberately NOT disallowed in robots.txt: a crawler has to fetch
  // a page to see its noindex.
  if (himsPath === 'preview' || himsPath.startsWith('preview/')) {
    return reviewArea(request, himsPath.slice('preview/'.length))
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
  // Anything under /dashboard now 404s, because the product no longer exists and
  // there is nothing left to gate.

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
