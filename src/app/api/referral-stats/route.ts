import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Referral code is required" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    // Fetch customer with business data
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("*, business:business_id(*)")
      .eq("referral_code", code)
      .single();

    if (customerError || !customer) {
      return NextResponse.json(
        { error: "Ambassador not found" },
        { status: 404 }
      );
    }

    // Type assertion to access customer properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customerId = (customer as any).id as string;

    // Fetch referrals for this ambassador
    const { data: referrals, error: referralsError } = await supabase
      .from("referrals")
      .select("*")
      .eq("ambassador_id", customerId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (referralsError) {
      console.error("Error fetching referrals:", referralsError);
      return NextResponse.json(
        { error: "Failed to fetch referrals" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      customer,
      referrals: referrals || [],
    });
  } catch (error) {
    console.error("Error in referral-stats API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
