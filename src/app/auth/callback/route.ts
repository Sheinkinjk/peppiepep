import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

function normalizeCookieValue(value?: string | null) {
  if (!value) return value;
  const base64Prefix = "base64-";
  if (value.startsWith(base64Prefix)) {
    const encoded = value.slice(base64Prefix.length);
    try {
      return Buffer.from(encoded, "base64").toString("utf8");
    } catch {
      return value;
    }
  }
  return value;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)

  try {
    const code = requestUrl.searchParams.get('code')
    const error = requestUrl.searchParams.get('error')
    const errorDescription = requestUrl.searchParams.get('error_description')

    if (error) {
      console.error('OAuth error:', error, errorDescription)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(errorDescription || error)}`)
    }

    if (!code) {
      return NextResponse.redirect(`${requestUrl.origin}/login`)
    }

    // Next.js 15+ requires cookies() to be awaited
    const cookieStore = await cookies()

    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll().map(({ name, value }) => ({
              name,
              value: normalizeCookieValue(value) ?? "",
            }));
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch (error) {
              // Ignore errors in route handlers
              console.error('Cookie setting error:', error);
            }
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(exchangeError.message)}`)
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError || !session?.user) {
      console.error('Session error after exchange:', sessionError)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent('Unable to establish a session. Please try again.')}`)
    }

    const user = session.user

    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id')
      .eq('owner_id', user.id)
      .maybeSingle()

    if (businessError && businessError.code !== 'PGRST116') {
      console.error('Business lookup error:', businessError)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent('Unable to load your business profile')}`)
    }

    if (!business) {
      return NextResponse.redirect(`${requestUrl.origin}/login?needs_onboarding=true`)
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
  } catch (callbackError) {
    console.error('Unhandled auth callback error:', callbackError)
    const message =
      callbackError instanceof Error && callbackError.message
        ? callbackError.message
        : 'Authentication failed. Please try again.'
    return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(message)}`)
  }
}
