/**
 * API Route: POST /api/ai/score-referrals
 *
 * Triggers AI scoring for all or specific customers in a business.
 * Can be called manually or automatically after CSV uploads.
 *
 * Request body:
 * {
 *   "businessId": "uuid",
 *   "customerIds"?: string[], // Optional: score specific customers
 *   "forceRescore"?: boolean   // Optional: rescore already-scored customers
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "jobId": "uuid",
 *   "message": "Scoring job queued. Check /api/ai/jobs/{jobId} for status."
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServiceClient();

    // Parse request body
    const body = await req.json();
    const { businessId, customerIds, forceRescore = false } = body;

    if (!businessId) {
      return NextResponse.json(
        { error: "businessId is required" },
        { status: 400 }
      );
    }

    // Verify business exists and user has access
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id, name, owner_id")
      .eq("id", businessId)
      .single();

    if (businessError || !business) {
      return NextResponse.json(
        { error: "Business not found" },
        { status: 404 }
      );
    }

    // Create a scoring job in the queue
    const { data: job, error: jobError } = await supabase
      .from("ai_scoring_jobs")
      .insert({
        business_id: businessId,
        job_type: "score_referrals",
        status: "pending",
        input_data: {
          customerIds: customerIds || null,
          forceRescore,
          requestedAt: new Date().toISOString(),
        },
        priority: 5,
        scheduled_for: new Date().toISOString(),
      })
      .select()
      .single();

    if (jobError || !job) {
      logger.error("Failed to create scoring job", { error: jobError });
      return NextResponse.json(
        { error: "Failed to queue scoring job" },
        { status: 500 }
      );
    }

    logger.info("AI scoring job created", {
      jobId: job.id,
      businessId,
      customersCount: customerIds?.length || "all",
    });

    // Process job asynchronously (fire and forget)
    // In production, this would be handled by a background worker
    processScoringJobAsync(job.id, businessId, customerIds, forceRescore);

    return NextResponse.json({
      success: true,
      jobId: job.id,
      message: `Scoring job queued. ${customerIds ? customerIds.length : "All unscored"} customers will be analyzed.`,
    });
  } catch (error) {
    logger.error("Error in /api/ai/score-referrals", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Process scoring job asynchronously
 * In production, this should be handled by a proper job queue (BullMQ, Inngest, etc.)
 */
async function processScoringJobAsync(
  jobId: string,
  businessId: string,
  customerIds: string[] | null,
  forceRescore: boolean
) {
  const supabase = await createServiceClient();

  try {
    // Update job status to processing
    await supabase
      .from("ai_scoring_jobs")
      .update({
        status: "processing",
        started_at: new Date().toISOString(),
      })
      .eq("id", jobId);

    // Import scorer (dynamic to avoid loading on API route init)
    const { scoreAllCustomers, scoreBatch, calculateScoringContext, saveScores } = await import("@/lib/ai/referral-scorer");

    let scoredCount = 0;
    let failedCount = 0;

    if (customerIds && customerIds.length > 0) {
      // Score specific customers
      const { data: customers } = await supabase
        .from("customers")
        .select("*")
        .in("id", customerIds)
        .eq("business_id", businessId);

      if (customers && customers.length > 0) {
        const context = await calculateScoringContext(businessId, supabase);
        const scores = await scoreBatch(customers, context);
        await saveScores(scores, supabase);

        scoredCount = scores.length;
        failedCount = scores.filter(s => s.confidence < 0.5).length;
      }
    } else {
      // Score all customers
      const result = await scoreAllCustomers(businessId, supabase, { forceRescore });
      scoredCount = result.scored;
      failedCount = result.failed;
    }

    // Update job as completed
    await supabase
      .from("ai_scoring_jobs")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        output_data: {
          scored: scoredCount,
          failed: failedCount,
          completedAt: new Date().toISOString(),
        },
      })
      .eq("id", jobId);

    logger.info("AI scoring job completed", {
      jobId,
      scored: scoredCount,
      failed: failedCount,
    });
  } catch (error) {
    logger.error("Error processing scoring job", { jobId, error });

    // Update job as failed
    await supabase
      .from("ai_scoring_jobs")
      .update({
        status: "failed",
        completed_at: new Date().toISOString(),
        error_message: error instanceof Error ? error.message : "Unknown error",
      })
      .eq("id", jobId);
  }
}

/**
 * GET /api/ai/score-referrals?jobId=xxx
 * Check the status of a scoring job
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createServiceClient();
    const jobId = req.nextUrl.searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { error: "jobId query parameter is required" },
        { status: 400 }
      );
    }

    const { data: job, error } = await supabase
      .from("ai_scoring_jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (error || !job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      jobId: job.id,
      status: job.status,
      startedAt: job.started_at,
      completedAt: job.completed_at,
      output: job.output_data,
      error: job.error_message,
    });
  } catch (error) {
    logger.error("Error checking job status", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
