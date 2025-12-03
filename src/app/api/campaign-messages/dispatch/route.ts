import { NextResponse } from "next/server";
import { runCampaignDispatchBatch } from "@/lib/campaign-dispatch";

export async function POST(request: Request) {
  const dispatchToken = process.env.CAMPAIGN_DISPATCH_TOKEN;
  if (!dispatchToken) {
    return NextResponse.json(
      { error: "CAMPAIGN_DISPATCH_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const suppliedAuth = request.headers.get("authorization");
  if (suppliedAuth !== `Bearer ${dispatchToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const batchSize = Number(process.env.CAMPAIGN_DISPATCH_BATCH ?? 25);
  const result = await runCampaignDispatchBatch({ batchSize });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result);
}
