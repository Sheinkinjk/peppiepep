import { NextResponse } from "next/server";

// The $799 Referral Blueprint is retired (July 2026). This route previously minted a
// Stripe checkout session. It must never take money for a product we can no longer
// deliver, so it now returns 410 Gone. No UI reaches it. See next.config.ts, where
// /referral-blueprint and its funnel 301 to /affiliate-programs-australia.
export async function POST() {
  return NextResponse.json(
    { error: "The Referral Blueprint is no longer available for purchase." },
    { status: 410 },
  );
}
