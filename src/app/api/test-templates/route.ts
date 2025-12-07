import { NextResponse } from "next/server";

import { campaignTemplates } from "@/lib/campaign-templates";
import { createApiLogger } from "@/lib/api-logger";

export async function GET() {
  const logger = createApiLogger("api:test-templates");
  logger.info("Test templates endpoint hit");
  return NextResponse.json({
    status: "ok",
    templateCount: campaignTemplates.length,
    templates: campaignTemplates.map((t) => ({
      id: t.id,
      name: t.name,
      category: t.category,
    })),
    deployedAt: new Date().toISOString(),
    commit: process.env.VERCEL_GIT_COMMIT_SHA || "local",
  });
}
