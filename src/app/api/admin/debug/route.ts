import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient, createServiceClient } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/admin-auth';

/**
 * Debug endpoint to check admin status and configuration
 *
 * GET /api/admin/debug
 */
export async function GET(request: NextRequest) {
  try {
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

    // Get all admin roles for debugging
    const { data: allAdminRoles } = await serviceClient
      .from('admin_roles')
      .select('*');

    // Check if getCurrentAdmin works
    const currentAdmin = await getCurrentAdmin();

    // Check Stripe configuration
    const stripeSecretKeyExists = Boolean(process.env.STRIPE_SECRET_KEY);
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    const isStripeTestMode = stripePublishableKey.startsWith('pk_test_');
    const isStripeSecretTestMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_') || false;

    return NextResponse.json({
      status: 'success',
      currentUser: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      },
      adminRoleQuery: {
        found: Boolean(adminRole),
        data: adminRole,
        error: adminError?.message,
      },
      allAdminRoles: {
        count: allAdminRoles?.length || 0,
        roles: allAdminRoles,
      },
      getCurrentAdminResult: {
        isAdmin: Boolean(currentAdmin),
        admin: currentAdmin,
      },
      stripeConfiguration: {
        secretKeyConfigured: stripeSecretKeyExists,
        publishableKeyConfigured: Boolean(stripePublishableKey),
        isTestMode: isStripeTestMode && isStripeSecretTestMode,
        publishableKeyPrefix: stripePublishableKey.substring(0, 7),
        secretKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || 'not_set',
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
