/**
 * AI Referral Scoring Engine
 *
 * This module uses Claude AI to score potential referrers on their likelihood to:
 * 1. Actually share referral links
 * 2. Drive high-quality conversions
 * 3. Generate significant revenue
 *
 * Scoring methodology:
 * - Analyzes contact metadata (company, role, network size, engagement history)
 * - Predicts referral potential (0-100 score)
 * - Provides human-readable explanations
 * - Estimates expected revenue per referrer
 */

import Anthropic from "@anthropic-ai/sdk";
import { Database } from "@/types/supabase";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

export interface ReferralScoreResult {
  customerId: string;
  score: number; // 0-100
  explanation: string;
  estimatedValue: number; // USD
  likelihoodToRefer: number; // 0-1
  optimalApproach: string;
  bestContactTime: Date | null;
  confidence: number; // 0-1
}

export interface ScoringContext {
  businessName: string;
  businessIndustry: string;
  averageCustomerValue: number;
  historicalConversionRate: number;
  typicalReferralCount: number;
}

/**
 * Initialize Anthropic client with API key from environment
 */
function getAnthropicClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }

  return new Anthropic({ apiKey });
}

/**
 * Build the AI prompt for scoring a single referrer
 */
function buildScoringPrompt(
  customer: Customer,
  context: ScoringContext
): string {
  return `You are an AI assistant specialized in predicting referral marketing performance.

Your task: Analyze this contact and predict how effective they'll be as a referrer for ${context.businessName}.

CONTACT INFORMATION:
- Name: ${customer.name || "Unknown"}
- Company: ${customer.company || "Not provided"}
- Role/Title: ${customer.source || "Not specified"}
- Email: ${customer.email || "Not provided"}
- Phone: ${customer.phone || "Not provided"}
- Website: ${customer.website || "Not provided"}
- LinkedIn: ${customer.linkedin_handle || "Not provided"}
- Instagram: ${customer.instagram_handle || "Not provided"}
- Audience Profile: ${customer.audience_profile || "Not provided"}
- Notes: ${customer.notes || "None"}
- Engagement: ${customer.total_referrals_sent || 0} referrals sent, ${customer.total_conversions || 0} conversions

BUSINESS CONTEXT:
- Industry: ${context.businessIndustry}
- Average Customer Value: $${context.averageCustomerValue}
- Historical Conversion Rate: ${(context.historicalConversionRate * 100).toFixed(1)}%
- Typical Referrals per Ambassador: ${context.typicalReferralCount}

SCORING CRITERIA:
1. Network Size & Quality (30%): Do they have access to relevant potential customers?
2. Influence & Authority (25%): Are they respected/influential in their network?
3. Engagement Likelihood (20%): Will they actually share referral links?
4. Conversion Potential (15%): Will their referrals convert?
5. Historical Performance (10%): Past referral activity (if any)

Provide your analysis in this EXACT JSON format:
{
  "score": <number 0-100>,
  "explanation": "<2-3 sentence explanation of the score>",
  "estimatedValue": <expected revenue in USD over next 90 days>,
  "likelihoodToRefer": <probability 0-1 they'll actively share>,
  "optimalApproach": "<one sentence on best way to activate them>",
  "bestContactTime": "<ISO timestamp of optimal outreach time, or null>",
  "confidence": <your confidence in this prediction, 0-1>,
  "reasoning": {
    "networkQuality": "<brief assessment>",
    "influenceLevel": "<brief assessment>",
    "engagementLikelihood": "<brief assessment>",
    "conversionPotential": "<brief assessment>"
  }
}

Be honest and realistic. A score of 50 is average. Only score 80+ for exceptional referrers.`;
}

/**
 * Parse AI response and extract structured scoring data
 */
function parseAIResponse(aiResponse: string): Partial<ReferralScoreResult> {
  try {
    // Extract JSON from response (AI might wrap it in markdown)
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      score: Math.min(100, Math.max(0, parsed.score)),
      explanation: parsed.explanation,
      estimatedValue: Math.max(0, parsed.estimatedValue),
      likelihoodToRefer: Math.min(1, Math.max(0, parsed.likelihoodToRefer)),
      optimalApproach: parsed.optimalApproach,
      bestContactTime: parsed.bestContactTime ? new Date(parsed.bestContactTime) : null,
      confidence: Math.min(1, Math.max(0, parsed.confidence || 0.7)),
    };
  } catch (error) {
    console.error("Failed to parse AI scoring response:", error);
    console.error("Raw response:", aiResponse);

    // Fallback to neutral score if parsing fails
    return {
      score: 50,
      explanation: "Unable to analyze contact - defaulting to neutral score",
      estimatedValue: 0,
      likelihoodToRefer: 0.5,
      optimalApproach: "Standard outreach recommended",
      bestContactTime: null,
      confidence: 0.3,
    };
  }
}

/**
 * Score a single referrer using Claude AI
 */
export async function scoreReferrer(
  customer: Customer,
  context: ScoringContext
): Promise<ReferralScoreResult> {
  const client = getAnthropicClient();

  const prompt = buildScoringPrompt(customer, context);

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      temperature: 0.3, // Lower temperature for more consistent scoring
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiText = response.content[0].type === "text"
      ? response.content[0].text
      : "";

    const scoreData = parseAIResponse(aiText);

    return {
      customerId: customer.id,
      score: scoreData.score || 50,
      explanation: scoreData.explanation || "No explanation provided",
      estimatedValue: scoreData.estimatedValue || 0,
      likelihoodToRefer: scoreData.likelihoodToRefer || 0.5,
      optimalApproach: scoreData.optimalApproach || "Standard outreach",
      bestContactTime: scoreData.bestContactTime || null,
      confidence: scoreData.confidence || 0.7,
    };
  } catch (error) {
    console.error(`Error scoring customer ${customer.id}:`, error);

    // Return safe fallback on error
    return {
      customerId: customer.id,
      score: 50,
      explanation: "Scoring failed - using default neutral score",
      estimatedValue: 0,
      likelihoodToRefer: 0.5,
      optimalApproach: "Review contact details and try again",
      bestContactTime: null,
      confidence: 0.1,
    };
  }
}

/**
 * Score multiple referrers in batch (with rate limiting)
 *
 * @param customers Array of customers to score
 * @param context Business context for scoring
 * @param options Batch processing options
 */
export async function scoreBatch(
  customers: Customer[],
  context: ScoringContext,
  options: {
    maxConcurrent?: number;
    delayMs?: number;
  } = {}
): Promise<ReferralScoreResult[]> {
  const { maxConcurrent = 5, delayMs = 200 } = options;

  const results: ReferralScoreResult[] = [];

  // Process in batches to avoid rate limits
  for (let i = 0; i < customers.length; i += maxConcurrent) {
    const batch = customers.slice(i, i + maxConcurrent);

    const batchPromises = batch.map((customer) =>
      scoreReferrer(customer, context)
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    // Delay between batches to respect rate limits
    if (i + maxConcurrent < customers.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Calculate scoring context from business's historical data
 */
export async function calculateScoringContext(
  businessId: string,
  supabase: any // Supabase client
): Promise<ScoringContext> {
  // Get business details
  const { data: business } = await supabase
    .from("businesses")
    .select("name, onboarding_metadata")
    .eq("id", businessId)
    .single();

  // Get historical referral performance
  const { data: referrals } = await supabase
    .from("referrals")
    .select("transaction_value, status")
    .eq("business_id", businessId);

  // Get customers (ambassadors)
  const { data: customers } = await supabase
    .from("customers")
    .select("total_referrals_sent, total_conversions")
    .eq("business_id", businessId);

  // Calculate metrics
  const totalReferrals = referrals?.length || 0;
  const convertedReferrals = referrals?.filter((r: any) => r.status === "completed").length || 0;
  const totalRevenue = referrals?.reduce((sum: number, r: any) => sum + (r.transaction_value || 0), 0) || 0;
  const totalAmbassadors = customers?.length || 1;

  const conversionRate = totalReferrals > 0 ? convertedReferrals / totalReferrals : 0.15; // Default 15%
  const avgCustomerValue = convertedReferrals > 0 ? totalRevenue / convertedReferrals : 500; // Default $500
  const avgReferralsPerAmbassador = totalAmbassadors > 0 ? totalReferrals / totalAmbassadors : 3; // Default 3

  return {
    businessName: business?.name || "Unknown Business",
    businessIndustry: (business?.onboarding_metadata as any)?.industry || "General",
    averageCustomerValue: avgCustomerValue,
    historicalConversionRate: conversionRate,
    typicalReferralCount: avgReferralsPerAmbassador,
  };
}

/**
 * Save scoring results to database
 */
export async function saveScores(
  scores: ReferralScoreResult[],
  supabase: any // Supabase client
): Promise<void> {
  const updates = scores.map((score) => ({
    id: score.customerId,
    ai_referral_score: Math.round(score.score),
    ai_score_explanation: score.explanation,
    ai_estimated_value: score.estimatedValue,
    ai_likelihood_to_refer: score.likelihoodToRefer,
    ai_optimal_approach: score.optimalApproach,
    ai_best_contact_time: score.bestContactTime?.toISOString() || null,
    ai_scored_at: new Date().toISOString(),
    ai_score_version: "v1.0",
  }));

  // Update in batches of 100
  for (let i = 0; i < updates.length; i += 100) {
    const batch = updates.slice(i, i + 100);

    for (const update of batch) {
      await supabase
        .from("customers")
        .update(update)
        .eq("id", update.id);
    }
  }
}

/**
 * Main entry point: Score all unscored customers for a business
 */
export async function scoreAllCustomers(
  businessId: string,
  supabase: any,
  options: {
    forceRescore?: boolean;
    maxCustomers?: number;
  } = {}
): Promise<{ scored: number; failed: number }> {
  const { forceRescore = false, maxCustomers = 1000 } = options;

  // Get customers to score
  let query = supabase
    .from("customers")
    .select("*")
    .eq("business_id", businessId)
    .limit(maxCustomers);

  if (!forceRescore) {
    // Only score customers that haven't been scored yet
    query = query.is("ai_referral_score", null);
  }

  const { data: customers, error } = await query;

  if (error || !customers || customers.length === 0) {
    return { scored: 0, failed: 0 };
  }

  // Calculate context
  const context = await calculateScoringContext(businessId, supabase);

  // Score in batches
  const scores = await scoreBatch(customers, context);

  // Save results
  await saveScores(scores, supabase);

  const failed = scores.filter(s => s.confidence < 0.5).length;

  return {
    scored: scores.length,
    failed,
  };
}
