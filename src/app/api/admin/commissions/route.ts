import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase';

/**
 * Get all commissions with filters
 *
 * GET /api/admin/commissions?status=approved&limit=50
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const ambassadorId = searchParams.get('ambassadorId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = createServerComponentClient();

    // Build query
    let query = supabase
      .from('stripe_commissions')
      .select(
        `
        *,
        ambassador:customers!ambassador_id(id, email, name),
        business:businesses(id, name),
        referral:referrals(id, type),
        payment:stripe_payments(id, amount_total, paid_at),
        payout:stripe_payouts(id, amount, status)
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }

    if (ambassadorId) {
      query = query.eq('ambassador_id', ambassadorId);
    }

    const { data: commissions, error, count } = await query;

    if (error) {
      throw new Error(`Failed to fetch commissions: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      commissions,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: count ? offset + limit < count : false,
      },
    });
  } catch (error) {
    console.error('Commissions fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Update commission status
 *
 * PATCH /api/admin/commissions
 * Body: { commissionId: string, status: 'approved' | 'cancelled' }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { commissionId, status, notes } = body;

    if (!commissionId || !status) {
      return NextResponse.json(
        { error: 'Commission ID and status are required' },
        { status: 400 }
      );
    }

    const supabase = createServerComponentClient();

    // TODO: Get admin user ID from auth
    const adminUserId = 'ADMIN_USER_ID';

    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (status === 'approved') {
      updateData.approved_at = new Date().toISOString();
      updateData.approved_by = adminUserId;
    }

    if (notes) {
      updateData.notes = notes;
    }

    const { data: commission, error } = await supabase
      .from('stripe_commissions')
      .update(updateData)
      .eq('id', commissionId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update commission: ${error.message}`);
    }

    return NextResponse.json({
      success: true,
      commission,
    });
  } catch (error) {
    console.error('Commission update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
