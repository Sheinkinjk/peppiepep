import { NextResponse } from "next/server";

import { createServerComponentClient } from "@/lib/supabase";
import type { Database } from "@/types/supabase";

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 200;

function sanitizeSearchTerm(term: string) {
  return term.replace(/[%_]/g, "\\$&");
}

export async function GET(request: Request) {
  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: business, error: businessError } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single<Pick<Database["public"]["Tables"]["businesses"]["Row"], "id">>();

    if (businessError || !business) {
      return NextResponse.json(
        { error: "Business not found for this account." },
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const search = (url.searchParams.get("q") ?? "").trim();
    const status = (url.searchParams.get("status") ?? "all").toLowerCase();
    const pageParam = Number(url.searchParams.get("page") ?? "1");
    const sizeParam = Number(url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE);
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const pageSize = Number.isNaN(sizeParam)
      ? DEFAULT_PAGE_SIZE
      : Math.min(MAX_PAGE_SIZE, Math.max(1, sizeParam));
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("customers")
      .select(
        "id, name, phone, email, referral_code, credits, status, created_at",
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
      console.error("Customers API query failed:", error);
      return NextResponse.json(
        { error: "Failed to load customers." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: data ?? [],
      total: count ?? 0,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Customers API error:", error);
    return NextResponse.json(
      { error: "Unexpected error loading customers." },
      { status: 500 },
    );
  }
}
