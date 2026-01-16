import { NextResponse } from "next/server";

import { z } from "zod";

import { createApiLogger } from "@/lib/api-logger";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase";
import { sendTransactionalEmail } from "@/lib/transactional-email";
import { buildPremiumEmail } from "@/lib/premium-email";
import type { Database } from "@/types/supabase";

const formSchema = z.object({
  requestId: z.string().uuid(),
});

type ExternalPartnerRequestWithBusiness = Pick<
  Database["public"]["Tables"]["external_partner_requests"]["Row"],
  "id" | "business_id" | "status"
> & {
  businesses:
    | Pick<Database["public"]["Tables"]["businesses"]["Row"], "id" | "name" | "owner_id">
    | null;
};

function sanitizeFilename(value: string) {
  return value
    .trim()
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

export async function POST(request: Request) {
  const logger = createApiLogger("api:external-partners:admin:deliver-dataset");
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const requestIdRaw = formData.get("requestId");
    const file = formData.get("file");

    const parsed = formSchema.safeParse({ requestId: requestIdRaw });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request id." }, { status: 400 });
    }

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "Missing dataset file." }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const { data: requestRow, error: requestError } = await supabase
      .from("external_partner_requests")
      .select(
        `
          id,
          business_id,
          status,
          businesses (
            id,
            name,
            owner_id
          )
        `,
      )
      .eq("id", parsed.data.requestId)
      .maybeSingle<ExternalPartnerRequestWithBusiness>();

    if (requestError || !requestRow?.id) {
      logger.error("Request lookup failed", { requestError });
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    const business = requestRow.businesses;
    if (!business?.owner_id || !business.id) {
      return NextResponse.json({ error: "Request business not found." }, { status: 404 });
    }

    const bucket = "external-partner-datasets";
    const cleanName = sanitizeFilename(file.name || "dataset.xlsx");
    const storagePath = `${business.id}/${requestRow.id}/${Date.now()}-${cleanName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const upload = await supabase.storage.from(bucket).upload(storagePath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: true,
    });
    if (upload.error) {
      logger.error("Storage upload failed", { error: upload.error });
      return NextResponse.json({ error: "Upload failed." }, { status: 500 });
    }

    const { error: datasetError } = await supabase
      .from("external_partner_request_datasets")
      .insert({
        request_id: requestRow.id,
        business_id: business.id,
        filename: cleanName,
        storage_bucket: bucket,
        storage_path: storagePath,
        uploaded_by: admin.id,
      } as any);

    if (datasetError) {
      logger.error("Dataset row insert failed", { datasetError });
      return NextResponse.json({ error: "Failed to store dataset metadata." }, { status: 500 });
    }

    const { error: updateError } = await supabase
      .from("external_partner_requests")
      .update({ status: "delivered", assigned_to: admin.id } as any)
      .eq("id", requestRow.id);
    if (updateError) {
      logger.error("Request status update failed", { updateError });
    }

    let ownerEmail: string | null = null;
    try {
      const owner = await supabase.auth.admin.getUserById(business.owner_id);
      ownerEmail = owner?.data?.user?.email ?? null;
    } catch (emailLookupError) {
      logger.warn("Owner email lookup failed", { emailLookupError });
    }

    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://peppiepep.vercel.app"}/dashboard?section=external-partners`;
    if (ownerEmail) {
      const html = buildPremiumEmail({
        title: "Your external partner dataset is ready",
        subtitle: business.name ? `Partner discovery dataset delivered for ${business.name}` : "Partner discovery dataset delivered",
        preheader: "Your Refer Labs partner dataset is ready in your dashboard.",
        bodyHtml: `
          <p style="margin:0 0 12px 0;">We've delivered your curated external partner dataset.</p>
          <p style="margin:0 0 12px 0;"><strong>Request ID:</strong> <code>${requestRow.id}</code></p>
          <p style="margin:0 0 18px 0;">Open your dashboard to review next steps and activate partners with trackable referral links.</p>
          <p style="margin:0 0 18px 0;">
            <a href="${dashboardUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;padding:10px 14px;border-radius:10px;text-decoration:none;font-weight:700;">
              Open External Partners
            </a>
          </p>
          <p style="margin:0;color:#475569;font-size:13px;">Reply to this email if you'd like us to activate the first batch for you.</p>
        `,
        brandName: "Refer Labs",
        logoUrl: `${process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://peppiepep.vercel.app"}/logo.svg`,
      });

      await sendTransactionalEmail({
        to: ownerEmail,
        subject: "External Partners dataset delivered",
        html,
      }).catch((err) => logger.warn("Owner email send failed (non-fatal)", { err }));
    }

    return NextResponse.json({ success: true, storagePath, filename: cleanName });
  } catch (error) {
    logger.error("Dataset delivery exception", { error });
    return NextResponse.json({ error: "Failed to deliver dataset." }, { status: 500 });
  }
}
