import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerComponentClient, createServiceClient } from "@/lib/supabase";
import { runCampaignDispatchBatch } from "@/lib/campaign-dispatch";
import { checkRateLimit } from "@/lib/rate-limit";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";

export const runtime = "nodejs";

const payloadSchema = z.object({
  campaignId: z.string().trim().min(1),
  batchSize: z.number().int().min(1).max(100).optional(),
});

export async function POST(request: Request) {
  const logger = createApiLogger("api:campaign-messages:dispatch-owner");

  const rateLimitCheck = await checkRateLimit(request, "campaignSend");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Rate limit exceeded for campaign dispatch");
    return rateLimitCheck.response;
  }

  const parsed = await parseJsonBody(request, payloadSchema, logger, {
    errorMessage: "Invalid payload",
  });
  if (!parsed.success) return parsed.response;

  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { campaignId, batchSize } = parsed.data;

  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .select("id, business_id")
    .eq("id", campaignId)
    .maybeSingle();

  if (campaignError || !campaign?.id) {
    logger.warn("Campaign not found for owner", { campaignId, error: campaignError });
    return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
  }

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id")
    .eq("id", campaign.business_id)
    .eq("owner_id", user.id)
    .maybeSingle();

  if (businessError || !business?.id) {
    logger.warn("Campaign ownership check failed", { campaignId, error: businessError });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Campaign dispatch is not configured (missing service role key)." },
      { status: 500 },
    );
  }

  // Ensure the service client is initialised so dispatch uses the correct env.
  await createServiceClient();

  const result = await runCampaignDispatchBatch({
    batchSize: batchSize ?? Number(process.env.CAMPAIGN_DISPATCH_BATCH ?? 25),
    restrictCampaignId: campaignId,
    skipBatchEvents: true,
  });

  if (result.error) {
    logger.error("Dispatch batch failed", { error: result.error });
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
