import { NextResponse } from "next/server";

import { createServiceClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

const DEMO_BUSINESS_ID = process.env.DEMO_BUSINESS_ID;
const MAX_ROWS = 75;

type DemoCustomer = Pick<
  Database["public"]["Tables"]["customers"]["Row"],
  "id" | "name" | "phone" | "email" | "referral_code" | "credits" | "created_at"
>;

type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];

type DemoReferral = {
  id: string;
  referrer_code: string | null;
  referred_name: string | null;
  referred_phone: string | null;
  status: string | null;
  created_at: string | null;
};

export async function GET(request: Request) {
  try {
    if (!DEMO_BUSINESS_ID) {
      return NextResponse.json(
        { error: "DEMO_BUSINESS_ID is not configured." },
        { status: 500 },
      );
    }

    const persona = new URL(request.url).searchParams.get("persona") ?? "owner";
    const supabase = await createServiceClient();

    const [businessRes, customersRes, referralsRes] = await Promise.all([
      supabase
        .from("businesses")
        .select(
          "id, name, offer_text, reward_amount, reward_type, client_reward_text, new_user_reward_text, created_at, logo_url",
        )
        .eq("id", DEMO_BUSINESS_ID)
        .single<BusinessRow>(),
      supabase
        .from("customers")
        .select("id, name, phone, email, referral_code, credits, created_at")
        .eq("business_id", DEMO_BUSINESS_ID)
        .order("created_at", { ascending: false })
        .limit(MAX_ROWS),
      supabase
        .from("referrals")
        .select(
          `
            id,
            referred_name,
            referred_phone,
            status,
            created_at,
            ambassador:ambassador_id (
              referral_code
            )
          `,
        )
        .eq("business_id", DEMO_BUSINESS_ID)
        .order("created_at", { ascending: false })
        .limit(MAX_ROWS),
    ]);

    if (businessRes.error || !businessRes.data) {
      console.error("Failed to load demo business:", businessRes.error);
      return NextResponse.json(
        { error: "Unable to load demo business." },
        { status: 500 },
      );
    }

    const customersData = (customersRes.data ?? []) as DemoCustomer[];
    const referralsData: DemoReferral[] = (referralsRes.data ?? []).map((row) => {
      const typedRow = row as {
        id?: string;
        referred_name?: string | null;
        referred_phone?: string | null;
        status?: string | null;
        created_at?: string | null;
        ambassador?: { referral_code: string | null } | null;
      };

      return {
        id: typedRow.id ?? crypto.randomUUID(),
        referrer_code: typedRow.ambassador?.referral_code ?? null,
        referred_name: typedRow.referred_name ?? null,
        referred_phone: typedRow.referred_phone ?? null,
        status: typedRow.status ?? "pending",
        created_at: typedRow.created_at ?? null,
      };
    });

    return NextResponse.json({
      persona,
      business: businessRes.data,
      customers: customersData,
      referrals: referralsData,
    });
  } catch (error) {
    console.error("Demo dashboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load demo data." },
      { status: 500 },
    );
  }
}
