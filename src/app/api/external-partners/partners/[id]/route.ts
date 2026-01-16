import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";
import type { Database } from "@/types/supabase";

const patchSchema = z.object({
  status: z.enum(["Active", "Paused"]),
});

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const logger = createApiLogger("api:external-partners:partners:update");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const body = await request.json().catch(() => null);
    const validation = validateWithSchema(patchSchema, body, logger);
    if (!validation.success) return validation.response;

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id">>();

    if (businessError || !business) {
      return NextResponse.json({ error: "Business not found." }, { status: 404 });
    }

    const { data: partner, error: partnerError } = await supabase
      .from("customers")
      .select("id, status, metadata")
      .eq("id", id)
      .eq("business_id", business.id)
      .eq("source", "external_partner")
      .single<{ id: string; status: string | null; metadata: any }>();

    if (partnerError || !partner?.id) {
      return NextResponse.json({ error: "External partner not found." }, { status: 404 });
    }

    const nextExternalStatus = validation.data.status;
    const nextCustomerStatus = nextExternalStatus === "Active" ? "active" : "pending";
    const nextLinkStatus = nextExternalStatus === "Active" ? "active" : "paused";

    const nextMetadata = {
      ...(partner.metadata ?? {}),
      external_partner: {
        ...((partner.metadata ?? {}) as any).external_partner,
        status: nextExternalStatus,
      },
    };

    const { error: customerUpdateError } = await supabase
      .from("customers")
      .update({ status: nextCustomerStatus, metadata: nextMetadata } as any)
      .eq("id", partner.id)
      .eq("business_id", business.id);

    if (customerUpdateError) {
      logger.error("Customer update failed", { customerUpdateError });
      return NextResponse.json({ error: "Failed to update partner." }, { status: 500 });
    }

    const { error: linkUpdateError } = await supabase
      .from("external_partner_links")
      .update({ status: nextLinkStatus } as any)
      .eq("business_id", business.id)
      .eq("customer_id", partner.id);

    if (linkUpdateError) {
      logger.error("Link update failed", { linkUpdateError });
      return NextResponse.json({ error: "Partner updated but links could not be updated." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Partner update exception", { error });
    return NextResponse.json({ error: "Failed to update partner." }, { status: 500 });
  }
}

