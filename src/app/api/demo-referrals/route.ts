import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // Apply rate limiting: 30 requests per minute
  const rateLimitCheck = checkRateLimit(request, 'demoReferrals');
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    return rateLimitCheck.response;
  }
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return NextResponse.json(
      { error: "Supabase credentials are not configured" },
      { status: 500 },
    );
  }

  let body: {
    name?: string;
    phone?: string;
    email?: string;
    source?: string;
    context?: Record<string, unknown> | string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!body.name || !body.phone) {
    return NextResponse.json(
      { error: "Name and phone are required" },
      { status: 400 },
    );
  }

  const supabase = await createServiceClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabaseAny = supabase as any;

  const { error } = await supabaseAny.from("demo_referrals").insert([
    {
      name: body.name.slice(0, 120),
      phone: body.phone.slice(0, 40),
      email: body.email?.slice(0, 160) ?? null,
      source: body.source?.slice(0, 80) ?? "demo-referral",
      context:
        typeof body.context === "string"
          ? body.context.slice(0, 500)
          : JSON.stringify(body.context ?? {}).slice(0, 500),
    },
  ]);

  if (error) {
    console.error("Failed to save demo referral", error);
    return NextResponse.json(
      { error: "Failed to save demo referral" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
