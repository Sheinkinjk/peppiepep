import { NextResponse } from "next/server";

import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { createServiceClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

async function handleDeletion(code: string | null, ownerId: string | null) {
  if (!code) {
    return NextResponse.json({ error: "referral code is required" }, { status: 400 });
  }

  if (!ownerId) {
    return NextResponse.json({ error: "Owner authentication required" }, { status: 401 });
  }

  const supabase = await createServiceClient();
  const { data: ambassador, error } = await supabase
    .from("customers")
    .select("id, business_id, business:business_id(owner_id)")
    .eq("referral_code", code)
    .single();

  if (error || !ambassador) {
    return NextResponse.json({ error: "Ambassador not found" }, { status: 404 });
  }
  const ambassadorRow = ambassador as {
    id: string;
    business_id: string;
    business: { owner_id: string | null } | null;
  };

  if (ambassadorRow.business?.owner_id !== ownerId) {
    return NextResponse.json({ error: "You do not have permission to delete this ambassador" }, { status: 403 });
  }

  await (supabase as unknown as {
    from: (table: string) => {
      update: (values: unknown) => {
        eq: (column: string, value: unknown) => Promise<{ error: Error | null }>;
      };
    };
  })
    .from("customers")
    .update({
      name: null,
      email: null,
      phone: null,
      credits: 0,
      status: "deleted",
    })
    .eq("id", ambassadorRow.id);

  await (supabase as unknown as {
    from: (table: string) => {
      update: (values: unknown) => {
        eq: (column: string, value: unknown) => Promise<{ error: Error | null }>;
      };
    };
  })
    .from("referrals")
    .update({
      referred_name: null,
      referred_email: null,
      referred_phone: null,
    })
    .eq("ambassador_id", ambassadorRow.id);

  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  try {
    const routeClient = createRouteHandlerClient<Database>({ cookies });
    const {
      data: { user },
    } = await routeClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const code = typeof body.code === "string" ? body.code : null;
    return handleDeletion(code, user.id);
  } catch (error) {
    console.error("Ambassador delete error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error:
        "Direct deletion is not available. Business owners can delete ambassadors from the dashboard or via an authenticated POST request.",
    },
    { status: 405 },
  );
}
