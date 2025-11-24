// AI Ambassador Scoring System
// Scores customers based on their likelihood to become successful ambassadors

export interface CustomerData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  referrals_made: number;
  credits: number;
  status: 'active' | 'inactive' | 'pending';
  total_value_generated: number;
  last_referral: string | null;
  joined_date?: string;
}

export interface ScoredCustomer extends CustomerData {
  aiScore: number;
  aiRank: number;
  scoreBreakdown: {
    activity: number;
    performance: number;
    recency: number;
    potential: number;
  };
  aiInsight: string;
  recommendation: 'high-priority' | 'medium-priority' | 'low-priority' | 'nurture';
}

/**
 * Calculate AI Ambassador Score (0-100)
 * Uses weighted factors to predict ambassador success
 */
export function calculateAmbassadorScore(customer: CustomerData, avgTransaction: number = 120): ScoredCustomer {
  const now = new Date();
  const lastReferralDate = customer.last_referral ? new Date(customer.last_referral) : null;
  const daysSinceLastReferral = lastReferralDate
    ? Math.floor((now.getTime() - lastReferralDate.getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  // Activity Score (0-25): Based on number of referrals
  const activityScore = Math.min(25, (customer.referrals_made / 5) * 25);

  // Performance Score (0-30): Based on value generated
  const expectedValue = customer.referrals_made * avgTransaction;
  const performanceRatio = expectedValue > 0 ? customer.total_value_generated / expectedValue : 0;
  const performanceScore = Math.min(30, performanceRatio * 30);

  // Recency Score (0-25): Based on recent activity
  let recencyScore = 0;
  if (customer.status === 'active' && customer.referrals_made > 0) {
    if (daysSinceLastReferral <= 7) recencyScore = 25;
    else if (daysSinceLastReferral <= 30) recencyScore = 20;
    else if (daysSinceLastReferral <= 60) recencyScore = 15;
    else if (daysSinceLastReferral <= 90) recencyScore = 10;
    else recencyScore = 5;
  } else if (customer.status === 'inactive') {
    recencyScore = 0;
  }

  // Potential Score (0-20): Based on credits and engagement
  const creditsRatio = customer.credits / (avgTransaction * 0.5); // Assuming 50% credit rate
  const potentialScore = Math.min(20, creditsRatio * 4);

  // Total Score
  const totalScore = Math.round(activityScore + performanceScore + recencyScore + potentialScore);

  // Generate AI Insight
  let aiInsight = '';
  let recommendation: 'high-priority' | 'medium-priority' | 'low-priority' | 'nurture' = 'nurture';

  if (totalScore >= 75) {
    aiInsight = `🌟 Top performer! ${customer.name} is a powerhouse ambassador with consistent high-value referrals. Prioritize engagement.`;
    recommendation = 'high-priority';
  } else if (totalScore >= 50) {
    aiInsight = `✅ Strong performer. ${customer.name} shows good activity. Consider offering bonus incentives to boost performance.`;
    recommendation = 'medium-priority';
  } else if (totalScore >= 25) {
    aiInsight = `📊 Moderate potential. ${customer.name} has shown some activity but needs nurturing. Send re-engagement campaigns.`;
    recommendation = 'low-priority';
  } else if (customer.status === 'inactive' || daysSinceLastReferral > 90) {
    aiInsight = `💤 Dormant ambassador. ${customer.name} needs reactivation. Try win-back offers or special bonuses.`;
    recommendation = 'nurture';
  } else {
    aiInsight = `🌱 New or low activity. ${customer.name} may need training or better incentives to get started.`;
    recommendation = 'nurture';
  }

  return {
    ...customer,
    aiScore: totalScore,
    aiRank: 0, // Will be set after sorting
    scoreBreakdown: {
      activity: Math.round(activityScore),
      performance: Math.round(performanceScore),
      recency: Math.round(recencyScore),
      potential: Math.round(potentialScore),
    },
    aiInsight,
    recommendation,
  };
}

/**
 * Rank all customers and assign ranks
 */
export function rankAmbassadors(customers: CustomerData[], avgTransaction: number = 120): ScoredCustomer[] {
  const scored = customers.map(c => calculateAmbassadorScore(c, avgTransaction));
  const sorted = scored.sort((a, b) => b.aiScore - a.aiScore);

  return sorted.map((customer, index) => ({
    ...customer,
    aiRank: index + 1,
  }));
}

/**
 * Get top N ambassadors
 */
export function getTopAmbassadors(customers: CustomerData[], n: number = 10, avgTransaction: number = 120): ScoredCustomer[] {
  const ranked = rankAmbassadors(customers, avgTransaction);
  return ranked.slice(0, n);
}

/**
 * Get ambassadors that need attention
 */
export function getAmbassadorsNeedingAttention(customers: CustomerData[], avgTransaction: number = 120): ScoredCustomer[] {
  const ranked = rankAmbassadors(customers, avgTransaction);
  return ranked.filter(c => c.recommendation === 'nurture' || (c.recommendation === 'low-priority' && c.scoreBreakdown.recency < 10));
}
