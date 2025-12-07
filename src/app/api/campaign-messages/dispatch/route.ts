import { NextResponse } from "next/server";

import { runCampaignDispatchBatch } from "@/lib/campaign-dispatch";
import { createApiLogger } from "@/lib/api-logger";

export async function POST(request: Request) {
  const logger = createApiLogger("api:campaign-messages:dispatch");
  const dispatchToken = process.env.CAMPAIGN_DISPATCH_TOKEN;
  if (!dispatchToken) {
    logger.error("Dispatch token missing");
    return NextResponse.json(
      { error: "CAMPAIGN_DISPATCH_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const suppliedAuth = request.headers.get("authorization");
  if (suppliedAuth !== `Bearer ${dispatchToken}`) {
    logger.warn("Dispatch unauthorized attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const batchSize = Number(process.env.CAMPAIGN_DISPATCH_BATCH ?? 25);
  logger.info("Running campaign dispatch batch", { batchSize });
  const result = await runCampaignDispatchBatch({ batchSize });

  if (result.error) {
    logger.error("Campaign dispatch failed", { error: result.error });
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  logger.info("Campaign dispatch completed", result);
  return NextResponse.json(result);
}
