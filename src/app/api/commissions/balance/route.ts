import { NextRequest, NextResponse } from 'next/server';
import type { PostgrestError } from '@supabase/supabase-js';
import { createServerComponentClient } from '@/lib/supabase';

/**
 * Get commission balance for the authenticated ambassador/customer
 *
 * GET /api/commissions/balance?customer_id=UUID
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get customer_id from query params (for ambassadors who need their data)
    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customer_id');

    if (!customerId) {
      return NextResponse.json({ error: 'customer_id required' }, { status: 400 });
    }

    // Verify the customer belongs to this user's business or is the user's email
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('id, email, business_id, business:businesses!business_id(owner_id)')
      .eq('id', customerId)
      .single() as {
        data: {
          id: string;
          email: string;
          business_id: string;
          business: { owner_id: string } | null;
        } | null;
        error: PostgrestError | null;
      };

    if (customerError || !customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Check authorization: either owns the business or is the customer themselves
    const isBusinessOwner = customer.business?.owner_id === user.id;
    const isCustomerThemselves = customer.email === user.email;

    if (!isBusinessOwner && !isCustomerThemselves) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Use the ambassador_commission_balances view created in Stripe migration
    const { data: balance, error: balanceError } = await supabase
      .from('ambassador_commission_balances')
      .select('*')
      .eq('customer_id', customerId)
      .single() as {
        data: {
          pending_balance: number | null;
          paid_total: number | null;
          lifetime_earnings: number | null;
          pending_commissions: number | null;
          paid_commissions: number | null;
          last_payout_date: string | null;
        } | null;
        error: PostgrestError | null;
      };

    if (balanceError || !balance) {
      // If no commissions exist yet, return zero balance
      if (balanceError?.code === 'PGRST116' || !balance) {
        return NextResponse.json({
          success: true,
          balance: {
            pending_balance: 0,
            paid_total: 0,
            lifetime_earnings: 0,
            pending_commissions: 0,
            paid_commissions: 0,
            last_payout_date: null,
          },
        });
      }
      throw balanceError;
    }

    return NextResponse.json({
      success: true,
      balance: {
        pending_balance: balance.pending_balance || 0,
        paid_total: balance.paid_total || 0,
        lifetime_earnings: balance.lifetime_earnings || 0,
        pending_commissions: balance.pending_commissions || 0,
        paid_commissions: balance.paid_commissions || 0,
        last_payout_date: balance.last_payout_date || null,
      },
    });
  } catch (error) {
    console.error('Commission balance error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
