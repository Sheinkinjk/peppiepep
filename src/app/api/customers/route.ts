import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerComponentClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 200;

function sanitizeSearchTerm(term: string) {
  return term.replace(/[%_]/g, "\\$&");
}

export async function GET(request: Request) {
  const logger = createApiLogger("api:customers:list");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      logger.warn("Customers listing unauthorized", { authError });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id">>();

    if (businessError || !business) {
      logger.warn("Customers listing missing business", { userId: user.id });
      return NextResponse.json(
        { error: "Business not found for this account." },
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const paramsSchema = z.object({
      q: z.string().optional(),
      status: z.string().optional(),
      page: z.string().optional(),
      pageSize: z.string().optional(),
    });
    const queryValidation = validateWithSchema(
      paramsSchema,
      {
        q: url.searchParams.get("q") ?? undefined,
        status: url.searchParams.get("status") ?? undefined,
        page: url.searchParams.get("page") ?? undefined,
        pageSize: url.searchParams.get("pageSize") ?? undefined,
      },
      logger,
    );

    if (!queryValidation.success) {
      return queryValidation.response;
    }

    const { q, status: rawStatus, page: rawPage, pageSize: rawSize } = queryValidation.data;
    const search = (q ?? "").trim();
    const status = (rawStatus ?? "all").toLowerCase();
    const pageParam = Number(rawPage ?? "1");
    const sizeParam = Number(rawSize ?? DEFAULT_PAGE_SIZE);
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const pageSize = Number.isNaN(sizeParam)
      ? DEFAULT_PAGE_SIZE
      : Math.min(MAX_PAGE_SIZE, Math.max(1, sizeParam));
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("customers")
      .select(
        "id, name, phone, email, referral_code, discount_code, credits, status, created_at, company, website, instagram_handle, linkedin_handle, audience_profile, source, notes",
        { count: "exact" },
      )
      .eq("business_id", business.id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      const likeValue = `%${sanitizeSearchTerm(search)}%`;
      query = query.or(
        [
          `name.ilike.${likeValue}`,
          `email.ilike.${likeValue}`,
          `phone.ilike.${likeValue}`,
          `referral_code.ilike.${likeValue}`,
          `discount_code.ilike.${likeValue}`,
          `company.ilike.${likeValue}`,
          `website.ilike.${likeValue}`,
          `instagram_handle.ilike.${likeValue}`,
          `linkedin_handle.ilike.${likeValue}`,
          `audience_profile.ilike.${likeValue}`,
          `source.ilike.${likeValue}`,
        ].join(","),
      );
    }

    if (status !== "all") {
      if (status === "verified") {
        query = query.in("status", ["verified", "active"]);
      } else {
        query = query.eq("status", status);
      }
    }

    const { data, error, count } = await query;

    if (error) {
      logger.error("Customers API query failed", { error });
      return NextResponse.json(
        { error: "Failed to load customers." },
        { status: 500 },
      );
    }

    logger.info("Customers list returned", {
      businessId: business.id,
      count: data?.length ?? 0,
      page,
      pageSize,
    });

    return NextResponse.json({
      data: data ?? [],
      total: count ?? 0,
      page,
      pageSize,
    });
  } catch (error) {
    logger.error("Customers API error", { error });
    return NextResponse.json(
      { error: "Unexpected error loading customers." },
      { status: 500 },
    );
  }
}
