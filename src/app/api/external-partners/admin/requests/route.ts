import { NextResponse } from "next/server";
import { z } from "zod";

import { createApiLogger } from "@/lib/api-logger";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase";
import { validateWithSchema } from "@/lib/api-validation";
import type { Database } from "@/types/supabase";

const querySchema = z.object({
  status: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export async function GET(request: Request) {
  const logger = createApiLogger("api:external-partners:admin:requests:list");
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const url = new URL(request.url);
    const validation = validateWithSchema(
      querySchema,
      {
        status: url.searchParams.get("status") ?? undefined,
        limit: url.searchParams.get("limit") ?? undefined,
      },
      logger,
    );
    if (!validation.success) return validation.response;

    const status = (validation.data.status ?? "").trim();
    const limit = validation.data.limit;

    const supabase = await createServiceClient();
    let query = supabase
      .from("external_partner_requests")
      .select(
        `
          id,
          business_id,
          submitted_by,
          status,
          assigned_to,
          payload,
          created_at,
          updated_at,
          businesses (
            id,
            name,
            owner_id
          )
        `,
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) {
      logger.error("Admin request list query failed", { error });
      return NextResponse.json({ error: "Failed to load requests." }, { status: 500 });
    }

    return NextResponse.json({ data: data ?? [] });
  } catch (error) {
    logger.error("Admin request list exception", { error });
    return NextResponse.json({ error: "Failed to load requests." }, { status: 500 });
  }
}

const patchSchema = z.object({
  status: z.string().optional(),
  assignedTo: z.string().uuid().nullable().optional(),
  adminNotes: z.string().max(4000).optional(),
  requestId: z.string().uuid(),
});

export async function PATCH(request: Request) {
  const logger = createApiLogger("api:external-partners:admin:requests:update");
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json().catch(() => null);
    const validation = validateWithSchema(patchSchema, body, logger);
    if (!validation.success) return validation.response;

    const supabase = await createServiceClient();

    const { data: current, error: currentError } = await supabase
      .from("external_partner_requests")
      .select("id, payload")
      .eq("id", validation.data.requestId)
      .maybeSingle<Pick<Database["public"]["Tables"]["external_partner_requests"]["Row"], "id" | "payload">>();

    if (currentError || !current?.id) {
      logger.error("Request lookup failed", { currentError });
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    const payload = (current.payload ?? {}) as Record<string, unknown>;
    const nextPayload = {
      ...payload,
      admin: {
        ...(typeof payload.admin === "object" && payload.admin ? (payload.admin as Record<string, unknown>) : {}),
        ...(validation.data.adminNotes ? { notes: validation.data.adminNotes } : {}),
        updatedAt: new Date().toISOString(),
        updatedBy: admin.id,
      },
    };

    const updatePatch: Partial<Database["public"]["Tables"]["external_partner_requests"]["Update"]> = {
      payload: nextPayload as any,
    };
    if (typeof validation.data.status === "string" && validation.data.status.trim()) {
      updatePatch.status = validation.data.status.trim();
    }
    if ("assignedTo" in validation.data) {
      updatePatch.assigned_to = validation.data.assignedTo ?? null;
    }

    const { data: updated, error: updateError } = await supabase
      .from("external_partner_requests")
      .update(updatePatch as any)
      .eq("id", validation.data.requestId)
      .select("id, status, assigned_to, updated_at, payload")
      .single();

    if (updateError || !updated?.id) {
      logger.error("Request update failed", { updateError });
      return NextResponse.json({ error: "Failed to update request." }, { status: 500 });
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    logger.error("Admin request update exception", { error });
    return NextResponse.json({ error: "Failed to update request." }, { status: 500 });
  }
}

