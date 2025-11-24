// AI-Powered ROI Calculator
// Predicts referral program ROI using simple ML-inspired models

export interface ROIInputs {
  totalAmbassadors: number;
  avgTransactionValue: number;
  rewardAmount: number;
  monthlyCustomers: number;
  industryType?: 'beauty' | 'fitness' | 'retail' | 'hospitality' | 'other';
}

export interface ROIForecast {
  month30: {
    expectedReferrals: number;
    expectedRevenue: number;
    rewardCosts: number;
    netProfit: number;
    roi: number;
  };
  month60: {
    expectedReferrals: number;
    expectedRevenue: number;
    rewardCosts: number;
    netProfit: number;
    roi: number;
  };
  month90: {
    expectedReferrals: number;
    expectedRevenue: number;
    rewardCosts: number;
    netProfit: number;
    roi: number;
  };
  breakEvenDays: number;
  confidence: 'high' | 'medium' | 'low';
  insights: string[];
}

/**
 * Calculate referral conversion rate based on industry benchmarks
 */
function getConversionRate(industryType: string = 'other'): number {
  const rates = {
    beauty: 0.18, // 18% of customers become ambassadors
    fitness: 0.22, // 22%
    retail: 0.12, // 12%
    hospitality: 0.15, // 15%
    other: 0.15, // 15% default
  };
  return rates[industryType as keyof typeof rates] || 0.15;
}

/**
 * Calculate referral activity rate (avg referrals per ambassador per month)
 */
function getReferralActivityRate(rewardAmount: number, avgTransaction: number): number {
  // Higher rewards = more activity (with diminishing returns)
  const rewardRatio = rewardAmount / avgTransaction;
  const baseRate = 0.8; // Base: 0.8 referrals per month
  const incentiveBoost = Math.min(1.5, rewardRatio * 3); // Up to 1.5x boost
  return baseRate * incentiveBoost;
}

/**
 * Calculate viral coefficient (how many new ambassadors each referral creates)
 */
function getViralCoefficient(conversionRate: number, referralRate: number): number {
  // Percentage of referred customers who become ambassadors themselves
  return conversionRate * referralRate * 0.3; // 30% of referred customers become ambassadors
}

/**
 * Predict referral growth over time with viral effects
 */
function predictReferralGrowth(
  initialAmbassadors: number,
  referralRate: number,
  viralCoefficient: number,
  months: number
): number[] {
  const monthly = [initialAmbassadors];

  for (let i = 1; i <= months; i++) {
    const previousAmbassadors = monthly[i - 1];
    const newReferrals = previousAmbassadors * referralRate;
    const newAmbassadors = newReferrals * viralCoefficient;
    const churnRate = 0.05; // 5% monthly churn
    const netAmbassadors = previousAmbassadors * (1 - churnRate) + newAmbassadors;
    monthly.push(Math.max(initialAmbassadors, netAmbassadors));
  }

  return monthly;
}

/**
 * Calculate comprehensive ROI forecast
 */
export function calculateROIForecast(inputs: ROIInputs): ROIForecast {
  const {
    totalAmbassadors,
    avgTransactionValue,
    rewardAmount,
    monthlyCustomers,
    industryType = 'other',
  } = inputs;

  const conversionRate = getConversionRate(industryType);
  const referralActivityRate = getReferralActivityRate(rewardAmount, avgTransactionValue);
  const viralCoefficient = getViralCoefficient(conversionRate, referralActivityRate);

  // Predict ambassador growth over 3 months
  const ambassadorGrowth = predictReferralGrowth(totalAmbassadors, referralActivityRate, viralCoefficient, 3);

  // Calculate metrics for each period
  const calculatePeriod = (monthIndex: number) => {
    const activeAmbassadors = ambassadorGrowth[monthIndex];
    const expectedReferrals = Math.round(activeAmbassadors * referralActivityRate);
    const expectedRevenue = expectedReferrals * avgTransactionValue;
    const rewardCosts = expectedReferrals * rewardAmount;
    const netProfit = expectedRevenue - rewardCosts;
    const roi = rewardCosts > 0 ? ((netProfit / rewardCosts) * 100) : 0;

    return {
      expectedReferrals,
      expectedRevenue,
      rewardCosts,
      netProfit,
      roi: Math.round(roi),
    };
  };

  const month30 = calculatePeriod(1);
  const month60 = calculatePeriod(2);
  const month90 = calculatePeriod(3);

  // Calculate break-even point
  let breakEvenDays = 0;
  if (month30.netProfit > 0) {
    breakEvenDays = 15; // Break even in ~2 weeks if profitable in month 1
  } else if (month60.netProfit > 0) {
    breakEvenDays = 45; // Break even in ~1.5 months
  } else if (month90.netProfit > 0) {
    breakEvenDays = 75; // Break even in ~2.5 months
  } else {
    breakEvenDays = 120; // Longer timeline
  }

  // Confidence level based on input quality
  let confidence: 'high' | 'medium' | 'low' = 'medium';
  if (totalAmbassadors >= 50 && monthlyCustomers >= 100) {
    confidence = 'high';
  } else if (totalAmbassadors < 10 || monthlyCustomers < 30) {
    confidence = 'low';
  }

  // Generate insights
  const insights: string[] = [];

  if (month30.roi > 300) {
    insights.push(`🚀 Exceptional ROI potential! Your ${rewardAmount} AUD reward is perfectly positioned for explosive growth.`);
  } else if (month30.roi > 150) {
    insights.push(`✅ Strong ROI forecast. Your referral program should be highly profitable within 30 days.`);
  } else if (month30.roi > 50) {
    insights.push(`📊 Solid ROI expected. Consider increasing rewards by $${Math.round(avgTransactionValue * 0.05)} to accelerate growth.`);
  } else {
    insights.push(`⚠️ ROI could be improved. Consider reducing reward costs or focusing on higher-value customers.`);
  }

  if (viralCoefficient > 0.5) {
    insights.push(`🔥 High viral potential detected! Each ambassador will likely recruit ${(viralCoefficient * 2).toFixed(1)} more ambassadors.`);
  }

  if (breakEvenDays <= 30) {
    insights.push(`⏱️ Fast break-even timeline: ~${breakEvenDays} days. You'll see positive cash flow quickly.`);
  } else if (breakEvenDays > 90) {
    insights.push(`⏳ Longer break-even period (~${breakEvenDays} days). Focus on ambassador activation to speed up returns.`);
  }

  const totalNetProfit = month30.netProfit + month60.netProfit + month90.netProfit;
  insights.push(`💰 Projected 90-day net profit: $${totalNetProfit.toLocaleString()} AUD from ${month30.expectedReferrals + month60.expectedReferrals + month90.expectedReferrals} referrals.`);

  return {
    month30,
    month60,
    month90,
    breakEvenDays,
    confidence,
    insights,
  };
}

/**
 * Compare different reward amounts
 */
export function compareRewardScenarios(
  baseInputs: ROIInputs,
  rewardAmounts: number[]
): Array<{ rewardAmount: number; forecast: ROIForecast }> {
  return rewardAmounts.map(amount => ({
    rewardAmount: amount,
    forecast: calculateROIForecast({ ...baseInputs, rewardAmount: amount }),
  }));
}
