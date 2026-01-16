import { NextResponse } from "next/server";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";

const paramsSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export async function GET(request: Request) {
  const logger = createApiLogger("api:admin:master:businesses");
  await requireAdmin();

  const url = new URL(request.url);
  const validation = validateWithSchema(
    paramsSchema,
    {
      q: url.searchParams.get("q") ?? undefined,
      page: url.searchParams.get("page") ?? undefined,
      limit: url.searchParams.get("limit") ?? undefined,
    },
    logger,
  );

  if (!validation.success) return validation.response;

  const { q, page, limit } = validation.data;
  const search = (q ?? "").trim();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createServiceClient();

  let query = supabase
    .from("businesses")
    .select(
      `
        id,
        owner_id,
        name,
        upgrade_name,
        reward_type,
        reward_amount,
        created_at,
        onboarding_metadata,
        owner:users!owner_id(
          id,
          email,
          created_at,
          last_sign_in_at
        )
      `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error, count } = await query;
  if (error) {
    logger.error("Failed to fetch businesses", { error });
    return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 });
  }

  return NextResponse.json({
    data: data ?? [],
    pagination: {
      page,
      limit,
      total: count ?? 0,
      totalPages: Math.max(1, Math.ceil((count ?? 0) / limit)),
    },
  });
}
