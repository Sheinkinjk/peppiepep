import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/admin-auth';

/**
 * Debug endpoint to check environment configuration
 * Only accessible to admins
 */
export async function GET() {
  try {
    // Only allow admins to access this endpoint
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const envCheck = {
      timestamp: new Date().toISOString(),
      domain: process.env.VERCEL_URL || 'localhost',
      deployment: {
        vercel_env: process.env.VERCEL_ENV,
        vercel_url: process.env.VERCEL_URL,
        vercel_region: process.env.VERCEL_REGION,
      },
      supabase: {
        url_set: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        url_value: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
        anon_key_set: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        anon_key_length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length,
        service_key_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        service_key_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length,
      },
      site: {
        next_public_site_url: process.env.NEXT_PUBLIC_SITE_URL,
      },
      node: {
        version: process.version,
        env: process.env.NODE_ENV,
      },
    };

    return NextResponse.json(envCheck, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
