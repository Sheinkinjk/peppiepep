// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { getCurrentAdmin } from '@/lib/admin-auth';

/**
 * Get platform-wide analytics
 *
 * GET /api/admin/analytics
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

    // Fetch all data for analytics
    const [
      { count: totalBusinesses },
      { count: totalCustomers },
      { count: totalPayments },
      { count: totalReferrals },
      { count: totalCommissions },
      { data: recentPayments },
      { data: recentReferrals },
    ] = await Promise.all([
      supabase.from('businesses').select('*', { count: 'exact', head: true }),
      supabase.from('customers').select('*', { count: 'exact', head: true }),
      supabase.from('stripe_payments').select('*', { count: 'exact', head: true }),
      supabase.from('referrals').select('*', { count: 'exact', head: true }),
      supabase.from('stripe_commissions').select('*', { count: 'exact', head: true }),
      supabase
        .from('stripe_payments')
        .select('amount_total, status, created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false }),
      supabase
        .from('referrals')
        .select('status, created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false }),
    ]);

    // Calculate revenue
    const totalRevenue = recentPayments?.reduce((sum, p) =>
      sum + (p.status === 'succeeded' ? p.amount_total : 0), 0) || 0;

    const successfulPayments = recentPayments?.filter(p => p.status === 'succeeded').length || 0;
    const failedPayments = recentPayments?.filter(p => p.status === 'failed').length || 0;
    const successRate = totalPayments
      ? ((successfulPayments / (successfulPayments + failedPayments || 1)) * 100).toFixed(1)
      : 0;

    // Calculate referral metrics
    const convertedReferrals = recentReferrals?.filter(r => r.status === 'converted').length || 0;
    const conversionRate = recentReferrals?.length
      ? ((convertedReferrals / recentReferrals.length) * 100).toFixed(1)
      : 0;

    // Daily breakdown for last 30 days
    const dailyStats = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayPayments = recentPayments?.filter(p =>
        p.created_at.startsWith(dateStr)
      ) || [];
      const dayReferrals = recentReferrals?.filter(r =>
        r.created_at.startsWith(dateStr)
      ) || [];

      dailyStats.push({
        date: dateStr,
        revenue: dayPayments.reduce((sum, p) =>
          sum + (p.status === 'succeeded' ? p.amount_total : 0), 0),
        payments: dayPayments.length,
        referrals: dayReferrals.length,
        conversions: dayReferrals.filter(r => r.status === 'converted').length,
      });
    }

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          totalBusinesses: totalBusinesses || 0,
          totalCustomers: totalCustomers || 0,
          totalPayments: totalPayments || 0,
          totalReferrals: totalReferrals || 0,
          totalCommissions: totalCommissions || 0,
        },
        revenue: {
          last30Days: totalRevenue,
          successRate: parseFloat(successRate),
          successfulPayments,
          failedPayments,
        },
        referrals: {
          last30Days: recentReferrals?.length || 0,
          converted: convertedReferrals,
          conversionRate: parseFloat(conversionRate),
        },
        daily: dailyStats,
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
