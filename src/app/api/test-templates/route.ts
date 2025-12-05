import { NextResponse } from "next/server";
import { campaignTemplates } from "@/lib/campaign-templates";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    templateCount: campaignTemplates.length,
    templates: campaignTemplates.map(t => ({
      id: t.id,
      name: t.name,
      category: t.category
    })),
    deployedAt: new Date().toISOString(),
    commit: process.env.VERCEL_GIT_COMMIT_SHA || "local"
  });
}
