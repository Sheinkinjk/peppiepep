// @ts-nocheck
import { createServerComponentClient } from '@/lib/supabase';
import { stripe, calculateCommission, COMMISSION_RULES } from '@/lib/stripe';

/**
 * Commission Management Library
 * Handles creation, tracking, and payout of referral commissions
 */

// ============================================
// Types
// ============================================

export type CommissionType = 'signup_bonus' | 'revenue_share' | 'one_time' | 'recurring';
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled' | 'disputed';

export interface Commission {
  id: string;
  business_id: string;
  ambassador_id: string;
  referral_id: string | null;
  payment_id: string | null;
  amount: number; // in cents
  currency: string;
  commission_type: CommissionType;
  commission_rate: number | null;
  original_payment_amount: number | null;
  status: CommissionStatus;
  approved_by: string | null;
  approved_at: string | null;
  paid_at: string | null;
  payout_id: string | null;
  notes: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CommissionBalance {
  pending_balance: number; // in cents
  paid_total: number; // in cents
  lifetime_earnings: number; // in cents
  pending_commissions: number; // count
  paid_commissions: number; // count
  last_payout_date: string | null;
}

// ============================================
// Commission Creation
// ============================================

/**
 * Create a signup bonus commission for a partner referral
 * This is called when a partner signs up through a referral link
 */
export async function createSignupBonusCommission(
  referralId: string,
  ambassadorId: string,
  businessId: string
): Promise<Commission> {
  const supabase = createServerComponentClient();

  const amount = COMMISSION_RULES.PARTNER_SIGNUP_BONUS;

  const { data, error } = await supabase
    .from('stripe_commissions')
    .insert({
      business_id: businessId,
      ambassador_id: ambassadorId,
      referral_id: referralId,
      amount,
      currency: 'aud',
      commission_type: 'signup_bonus',
      status: 'approved', // Auto-approve signup bonuses
      approved_at: new Date().toISOString(),
      metadata: {
        rule: 'Partner signup bonus',
        amount_aud: amount / 100,
      },
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create signup bonus commission:', error);
    throw new Error(`Failed to create commission: ${error.message}`);
  }

  return data;
}

/**
 * Create a revenue share commission for a partner payment
 * This is called when a partner makes a payment (subscription/purchase)
 */
export async function createRevenueShareCommission(
  paymentId: string,
  ambassadorId: string,
  businessId: string,
  paymentAmount: number
): Promise<Commission> {
  const supabase = createServerComponentClient();

  const commissionAmount = calculateCommission('revenue_share', paymentAmount);

  const { data, error } = await supabase
    .from('stripe_commissions')
    .insert({
      business_id: businessId,
      ambassador_id: ambassadorId,
      payment_id: paymentId,
      amount: commissionAmount,
      currency: 'aud',
      commission_type: 'revenue_share',
      commission_rate: COMMISSION_RULES.PARTNER_REVENUE_SHARE_RATE,
      original_payment_amount: paymentAmount,
      status: 'approved', // Auto-approve revenue share
      approved_at: new Date().toISOString(),
      metadata: {
        rule: 'Partner revenue share',
        payment_amount_aud: paymentAmount / 100,
        commission_amount_aud: commissionAmount / 100,
        commission_rate: COMMISSION_RULES.PARTNER_REVENUE_SHARE_RATE,
      },
    })
    .select()
    .single();

  if (error) {
    console.error('Failed to create revenue share commission:', error);
    throw new Error(`Failed to create commission: ${error.message}`);
  }

  return data;
}

// ============================================
// Commission Queries
// ============================================

/**
 * Get ambassador's commission balance
 */
export async function getAmbassadorBalance(ambassadorId: string): Promise<CommissionBalance> {
  const supabase = createServerComponentClient();

  const { data, error } = await supabase
    .from('ambassador_commission_balances')
    .select('*')
    .eq('customer_id', ambassadorId)
    .single();

  if (error) {
    console.error('Failed to get ambassador balance:', error);
    return {
      pending_balance: 0,
      paid_total: 0,
      lifetime_earnings: 0,
      pending_commissions: 0,
      paid_commissions: 0,
      last_payout_date: null,
    };
  }

  return {
    pending_balance: data.pending_balance || 0,
    paid_total: data.paid_total || 0,
    lifetime_earnings: data.lifetime_earnings || 0,
    pending_commissions: data.pending_commissions || 0,
    paid_commissions: data.paid_commissions || 0,
    last_payout_date: data.last_payout_date,
  };
}

/**
 * Get all commissions for an ambassador
 */
export async function getAmbassadorCommissions(
  ambassadorId: string,
  status?: CommissionStatus
): Promise<Commission[]> {
  const supabase = createServerComponentClient();

  let query = supabase
    .from('stripe_commissions')
    .select('*')
    .eq('ambassador_id', ambassadorId)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Failed to get ambassador commissions:', error);
    throw new Error(`Failed to fetch commissions: ${error.message}`);
  }

  return data || [];
}

/**
 * Get pending commissions for payout
 */
export async function getPendingCommissions(ambassadorId: string): Promise<Commission[]> {
  return getAmbassadorCommissions(ambassadorId, 'approved');
}

/**
 * Check if ambassador can request payout
 */
export async function canRequestPayout(ambassadorId: string): Promise<{
  canPayout: boolean;
  pendingBalance: number;
  threshold: number;
  message: string;
}> {
  const balance = await getAmbassadorBalance(ambassadorId);
  const threshold = 50000; // $500 AUD minimum

  const canPayout = balance.pending_balance >= threshold;

  return {
    canPayout,
    pendingBalance: balance.pending_balance,
    threshold,
    message: canPayout
      ? `You have $${(balance.pending_balance / 100).toFixed(2)} available for payout`
      : `You need $${(threshold / 100).toFixed(2)} to request a payout. Current balance: $${(balance.pending_balance / 100).toFixed(2)}`,
  };
}

// ============================================
// Commission Updates
// ============================================

/**
 * Approve a commission (manual approval if needed)
 */
export async function approveCommission(
  commissionId: string,
  approvedBy: string
): Promise<Commission> {
  const supabase = createServerComponentClient();

  const { data, error } = await supabase
    .from('stripe_commissions')
    .update({
      status: 'approved',
      approved_by: approvedBy,
      approved_at: new Date().toISOString(),
    })
    .eq('id', commissionId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to approve commission: ${error.message}`);
  }

  return data;
}

/**
 * Mark commissions as paid (called after successful payout)
 */
export async function markCommissionsAsPaid(
  commissionIds: string[],
  payoutId: string
): Promise<void> {
  const supabase = createServerComponentClient();

  const { error } = await supabase
    .from('stripe_commissions')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
      payout_id: payoutId,
    })
    .in('id', commissionIds);

  if (error) {
    throw new Error(`Failed to mark commissions as paid: ${error.message}`);
  }
}

/**
 * Cancel a commission
 */
export async function cancelCommission(
  commissionId: string,
  reason: string
): Promise<Commission> {
  const supabase = createServerComponentClient();

  const { data, error } = await supabase
    .from('stripe_commissions')
    .update({
      status: 'cancelled',
      notes: reason,
    })
    .eq('id', commissionId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to cancel commission: ${error.message}`);
  }

  return data;
}

// ============================================
// Reporting & Analytics
// ============================================

/**
 * Get commission summary for a business
 */
export async function getBusinessCommissionSummary(businessId: string): Promise<{
  total_commissions: number;
  total_paid: number;
  total_pending: number;
  commission_count: number;
  ambassador_count: number;
}> {
  const supabase = createServerComponentClient();

  const { data, error } = await supabase
    .from('stripe_commissions')
    .select('amount, status, ambassador_id')
    .eq('business_id', businessId);

  if (error) {
    throw new Error(`Failed to get commission summary: ${error.message}`);
  }

  const totalCommissions = data?.reduce((sum, c) => sum + c.amount, 0) || 0;
  const totalPaid = data?.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0) || 0;
  const totalPending = data?.filter(c => c.status === 'approved' || c.status === 'pending').reduce((sum, c) => sum + c.amount, 0) || 0;
  const ambassadorCount = new Set(data?.map(c => c.ambassador_id)).size;

  return {
    total_commissions: totalCommissions,
    total_paid: totalPaid,
    total_pending: totalPending,
    commission_count: data?.length || 0,
    ambassador_count: ambassadorCount,
  };
}

/**
 * Get top earning ambassadors
 */
export async function getTopEarningAmbassadors(
  businessId: string,
  limit: number = 10
): Promise<Array<{
  ambassador_id: string;
  ambassador_name: string;
  ambassador_email: string;
  total_earnings: number;
  commission_count: number;
}>> {
  const supabase = createServerComponentClient();

  const { data, error } = await supabase
    .from('stripe_commissions')
    .select(`
      ambassador_id,
      amount,
      customers!inner (
        name,
        email
      )
    `)
    .eq('business_id', businessId)
    .eq('status', 'paid');

  if (error) {
    throw new Error(`Failed to get top ambassadors: ${error.message}`);
  }

  // Group by ambassador
  const ambassadorMap = new Map<string, {
    id: string;
    name: string;
    email: string;
    total: number;
    count: number;
  }>();

  data?.forEach((row: any) => {
    const existing = ambassadorMap.get(row.ambassador_id);
    if (existing) {
      existing.total += row.amount;
      existing.count += 1;
    } else {
      ambassadorMap.set(row.ambassador_id, {
        id: row.ambassador_id,
        name: row.customers.name,
        email: row.customers.email,
        total: row.amount,
        count: 1,
      });
    }
  });

  // Convert to array and sort
  return Array.from(ambassadorMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
    .map(a => ({
      ambassador_id: a.id,
      ambassador_name: a.name,
      ambassador_email: a.email,
      total_earnings: a.total,
      commission_count: a.count,
    }));
}
