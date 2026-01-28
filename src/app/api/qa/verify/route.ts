import { NextResponse } from "next/server";
import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import type { BusinessOnboardingMetadata } from "@/types/business";

export async function POST() {
  const logger = createApiLogger("api:qa:verify");

  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the business
    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id, onboarding_metadata")
      .eq("owner_id", user.id)
      .single();

    if (businessError || !business) {
      logger.error("Business not found", { userId: user.id, error: businessError });
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Update the onboarding metadata with QA verification timestamp
    const currentMetadata = (business.onboarding_metadata as BusinessOnboardingMetadata) ?? {};
    const updatedMetadata: BusinessOnboardingMetadata = {
      ...currentMetadata,
      integrationStatus: {
        ...currentMetadata.integrationStatus,
        qa: "complete",
      },
      notifications: {
        ...currentMetadata.notifications,
        qaVerifiedAt: new Date().toISOString(),
      },
    };

    const { error: updateError } = await supabase
      .from("businesses")
      .update({ onboarding_metadata: updatedMetadata })
      .eq("id", business.id);

    if (updateError) {
      logger.error("Failed to update QA verification", { businessId: business.id, error: updateError });
      return NextResponse.json({ error: "Failed to save verification" }, { status: 500 });
    }

    logger.info("QA verification saved", { businessId: business.id });

    return NextResponse.json({
      success: true,
      qaVerifiedAt: updatedMetadata.notifications?.qaVerifiedAt,
    });
  } catch (error) {
    logger.error("QA verify exception", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
