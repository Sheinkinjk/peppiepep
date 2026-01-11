import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { buildAdminLoginAlertEmail, sendAdminNotification } from '@/lib/email-notifications';
import { createApiLogger } from '@/lib/api-logger';

// Safe error messages that don't expose internal details
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'invalid_credentials': 'Invalid email or password',
  'email_not_confirmed': 'Please verify your email address before signing in',
  'user_not_found': 'Invalid email or password', // Same as invalid_credentials for security
  'too_many_requests': 'Too many login attempts. Please try again later',
};

export async function POST(request: NextRequest) {
  const logger = createApiLogger('api:auth:signin');

  // Rate limiting: 5 attempts per minute to prevent brute force attacks
  const rateLimitCheck = await checkRateLimit(request, 'authentication');
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn('Rate limit exceeded for signin attempt');
    return rateLimitCheck.response;
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch (error) {
              console.error('Cookie setting error:', error);
            }
          },
        },
      }
    );

    // Attempt sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const safeMessage = AUTH_ERROR_MESSAGES[signInError.message] ?? 'Invalid email or password';
      logger.error('Sign in failed', {
        code: signInError.code,
        message: signInError.message,
        email: email.substring(0, 3) + '***' // Partial email for debugging
      });
      return NextResponse.json(
        { error: safeMessage },
        { status: 401 }
      );
    }

    // Check if email is confirmed
    if (data?.user && !data.user.email_confirmed_at) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { error: 'Confirm your email before signing in – the verification link just hit your inbox.' },
        { status: 403 }
      );
    }

    // Verify session was established
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      return NextResponse.json(
        { error: 'Session could not be established. Please try again.' },
        { status: 500 }
      );
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || null;
    const userAgent = request.headers.get("user-agent");

    await sendAdminNotification({
      subject: `Dashboard login: ${data.user?.email ?? "Unknown user"}`,
      html: buildAdminLoginAlertEmail({
        email: data.user?.email ?? "Unknown",
        timestamp: new Date().toISOString(),
        ipAddress,
        userAgent,
      }),
    }).catch((notifyError) => {
      console.error("Failed to send login alert:", notifyError);
    });

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Authentication failed. Please try again.' },
      { status: 500 }
    );
  }
}
