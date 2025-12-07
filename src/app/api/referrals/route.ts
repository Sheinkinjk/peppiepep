import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerComponentClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";

const DEFAULT_PAGE_SIZE = 25;
const MAX_PAGE_SIZE = 150;
const AMBASSADOR_SEARCH_LIMIT = 200;

type BusinessIdRow = Pick<Database["public"]["Tables"]["businesses"]["Row"], "id">;
type CustomerIdRow = Pick<Database["public"]["Tables"]["customers"]["Row"], "id">;

function sanitizeSearchTerm(term: string) {
  return term.replace(/[%_]/g, "\\$&");
}

export async function GET(request: Request) {
  const logger = createApiLogger("api:referrals:list");
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      logger.warn("Referrals unauthorized", { authError });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single<BusinessIdRow>();

    if (businessError || !business) {
      logger.warn("Referrals missing business", { userId: user.id });
      return NextResponse.json(
        { error: "Business not found for this account." },
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const querySchema = z.object({
      q: z.string().optional(),
      status: z.string().optional(),
      source: z.string().optional(),
      page: z.string().optional(),
      pageSize: z.string().optional(),
    });
    const validation = validateWithSchema(
      querySchema,
      {
        q: url.searchParams.get("q"),
        status: url.searchParams.get("status"),
        source: url.searchParams.get("source"),
        page: url.searchParams.get("page"),
        pageSize: url.searchParams.get("pageSize"),
      },
      logger,
    );

    if (!validation.success) {
      return validation.response;
    }

    const { q, status: rawStatus, source: rawSource, page: rawPage, pageSize: rawSize } =
      validation.data;

    const search = (q ?? "").trim();
    const status = (rawStatus ?? "all").toLowerCase();
    const source = (rawSource ?? "all").toLowerCase();
    const pageParam = Number(rawPage ?? "1");
    const sizeParam = Number(rawSize ?? DEFAULT_PAGE_SIZE);
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const pageSize = Number.isNaN(sizeParam)
      ? DEFAULT_PAGE_SIZE
      : Math.min(MAX_PAGE_SIZE, Math.max(1, sizeParam));
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let ambassadorMatches: string[] = [];
    if (search) {
      const likeValue = `%${sanitizeSearchTerm(search)}%`;
      const { data: ambassadorRows, error: ambassadorError } = await supabase
        .from("customers")
        .select("id")
        .eq("business_id", business.id)
        .or(
          [
            `name.ilike.${likeValue}`,
            `email.ilike.${likeValue}`,
            `phone.ilike.${likeValue}`,
            `referral_code.ilike.${likeValue}`,
          ].join(","),
        )
        .limit(AMBASSADOR_SEARCH_LIMIT);

      if (ambassadorError) {
        logger.error("Failed to search ambassadors for referrals", { error: ambassadorError });
      } else {
        const typedRows = (ambassadorRows ?? []) as CustomerIdRow[];
        ambassadorMatches = typedRows.map((row) => row.id);
      }
    }

    let query = supabase
      .from("referrals")
      .select(
        `
          id,
          ambassador_id,
          referred_name,
          referred_email,
          referred_phone,
          status,
          created_by,
          created_at,
          updated_at,
          transaction_value,
          transaction_date,
          service_type,
          ambassador:customers!referrals_ambassador_id_fkey (
            id,
            name,
            email,
            phone
          )
        `,
        { count: "exact" },
      )
      .eq("business_id", business.id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (status !== "all") {
      query = query.eq("status", status);
    }

    if (source === "manual") {
      query = query.not("created_by", "is", null);
    } else if (source === "tracked") {
      query = query.is("created_by", null);
    }

    if (search) {
      const likeValue = `%${sanitizeSearchTerm(search)}%`;
      const filterParts = [
        `referred_name.ilike.${likeValue}`,
        `referred_email.ilike.${likeValue}`,
        `referred_phone.ilike.${likeValue}`,
      ];
      if (ambassadorMatches.length > 0) {
        filterParts.push(`ambassador_id.in.(${ambassadorMatches.join(",")})`);
      }

      query = query.or(filterParts.join(","));
    }

    const { data, error, count } = await query;

    if (error) {
      logger.error("Referrals API query failed", { error });
      return NextResponse.json(
        { error: "Failed to load referrals." },
        { status: 500 },
      );
    }

    logger.info("Referrals list returned", {
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
    logger.error("Referrals API error", { error });
    return NextResponse.json(
      { error: "Unexpected error loading referrals." },
      { status: 500 },
    );
  }
}
