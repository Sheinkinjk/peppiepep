import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/admin-auth';

/**
 * Get all payments with filters
 *
 * GET /api/admin/payments?status=succeeded&limit=50
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin auth using RBAC
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = await createServerComponentClient();

    // Build query
    let query = supabase
      .from('stripe_payments')
      .select(
        `
        *,
        business:businesses(id, name),
        customer:stripe_customers(email, name)
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    const { data: payments, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch payments: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      payments,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: count ? offset + limit < count : false,
      },
    });
  } catch (error) {
    console.error('Payments fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
