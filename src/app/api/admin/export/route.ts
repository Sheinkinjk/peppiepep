import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/admin-auth';

/**
 * Export admin data as CSV
 *
 * GET /api/admin/export?type=payments|commissions|businesses|referrals
 */
export async function GET(request: NextRequest) {
  try {
    // Check admin auth using RBAC
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service client for cross-account data
    const supabase = await createServiceClient();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'payments';

    let csv = '';
    let filename = '';

    switch (type) {
      case 'payments': {
        const { data: payments } = await supabase
          .from('stripe_payments')
          .select(`
            *,
            business:businesses(id, name)
          `)
          .order('created_at', { ascending: false });

        csv = 'Date,Business,Amount,Currency,Status,Payment Intent ID,Receipt URL\n';
        payments?.forEach(p => {
          csv += `"${new Date(p.created_at).toISOString()}","${p.business?.name || 'N/A'}",${p.amount_total},${p.currency},"${p.status}","${p.stripe_payment_intent_id || ''}","${p.receipt_url || ''}"\n`;
        });
        filename = `payments_export_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      case 'commissions': {
        const { data: commissions } = await supabase
          .from('stripe_commissions')
          .select(`
            *,
            ambassador:customers!ambassador_id(id, email, name),
            business:businesses(id, name)
          `)
          .order('created_at', { ascending: false });

        csv = 'Date,Ambassador Name,Ambassador Email,Business,Type,Amount,Currency,Status,Paid At\n';
        commissions?.forEach(c => {
          csv += `"${new Date(c.created_at).toISOString()}","${c.ambassador?.name || 'N/A'}","${c.ambassador?.email || 'N/A'}","${c.business?.name || 'N/A'}","${c.commission_type}",${c.amount},${c.currency},"${c.status}","${c.paid_at || ''}"\n`;
        });
        filename = `commissions_export_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      case 'businesses': {
        const { data: businesses } = await supabase
          .from('businesses')
          .select(`
            *,
            owner:users!owner_id(id, email, created_at, last_sign_in_at)
          `)
          .order('created_at', { ascending: false });

        csv = 'Business Name,Owner Email,Created,Last Sign In,Status,ID\n';
        businesses?.forEach(b => {
          csv += `"${b.name}","${b.owner?.email || 'N/A'}","${new Date(b.created_at).toISOString()}","${b.owner?.last_sign_in_at ? new Date(b.owner.last_sign_in_at).toISOString() : 'Never'}","${b.is_active !== false ? 'Active' : 'Inactive'}","${b.id}"\n`;
        });
        filename = `businesses_export_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      case 'referrals': {
        const { data: referrals } = await supabase
          .from('referrals')
          .select(`
            *,
            business:businesses(id, name),
            customer:customers(id, email, name),
            ambassador:customers!referrer_id(id, email, name)
          `)
          .order('created_at', { ascending: false });

        csv = 'Date,Business,Ambassador Name,Ambassador Email,Customer Name,Customer Email,Status,Type,Code\n';
        referrals?.forEach(r => {
          csv += `"${new Date(r.created_at).toISOString()}","${r.business?.name || 'N/A'}","${r.ambassador?.name || 'N/A'}","${r.ambassador?.email || 'N/A'}","${r.customer?.name || 'N/A'}","${r.customer?.email || 'N/A'}","${r.status}","${r.type || 'N/A'}","${r.referral_code || ''}"\n`;
        });
        filename = `referrals_export_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      case 'ambassadors': {
        const { data: balances } = await supabase
          .from('ambassador_commission_balances')
          .select('*')
          .order('lifetime_earnings', { ascending: false });

        csv = 'Ambassador Email,Ambassador Name,Pending Balance,Paid Total,Lifetime Earnings,Pending Commissions,Paid Commissions,Last Payout Date\n';
        balances?.forEach(b => {
          csv += `"${b.ambassador_email || 'N/A'}","${b.ambassador_name || 'N/A'}",${b.pending_balance || 0},${b.paid_total || 0},${b.lifetime_earnings || 0},${b.pending_commissions || 0},${b.paid_commissions || 0},"${b.last_payout_date || ''}"\n`;
        });
        filename = `ambassadors_export_${new Date().toISOString().split('T')[0]}.csv`;
        break;
      }

      default:
        return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
    }

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
