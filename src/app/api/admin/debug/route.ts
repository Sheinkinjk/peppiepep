import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient, createServiceClient } from '@/lib/supabase';
import { requireAdmin, getCurrentAdmin } from '@/lib/admin-auth';

/**
 * Debug endpoint to check admin status and configuration
 * PROTECTED: Requires admin authentication
 *
 * GET /api/admin/debug
 */
export async function GET(request: NextRequest) {
  // Require admin access to prevent information disclosure
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unauthorized',
        error: 'Unauthorized. Admin access required.',
        message: 'This endpoint is only accessible to admin users.'
      },
      { status: 403 }
    );
  }

  try {
    void request;
    const authClient = await createServerComponentClient();
    const serviceClient = await createServiceClient();

    // Get current user
    const { data: { user }, error: userError } = await authClient.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({
        status: 'not_authenticated',
        message: 'User is not logged in',
        userError: userError?.message,
      });
    }

    // Check admin role
    const { data: adminRole, error: adminError } = await serviceClient
      .from('admin_roles')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .is('revoked_at', null)
      .single();

    // SECURITY FIX: Don't expose all admin roles - only check count
    const { count: adminRoleCount } = await serviceClient
      .from('admin_roles')
      .select('*', { count: 'exact', head: true });

    // Check if getCurrentAdmin works
    const currentAdmin = await getCurrentAdmin();

    // SECURITY FIX: Don't expose Stripe key prefixes or detailed config
    const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

    return NextResponse.json({
      status: 'success',
      currentUser: {
        id: user.id,
        email: user.email,
      },
      adminRoleQuery: {
        found: Boolean(adminRole),
        role: adminRole?.role || null,
        error: adminError?.message,
      },
      adminRolesCount: adminRoleCount || 0,
      getCurrentAdminResult: {
        isAdmin: Boolean(currentAdmin),
        role: currentAdmin?.role || null,
      },
      stripeConfiguration: {
        configured: stripeConfigured,
      },
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
