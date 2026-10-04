import { NextResponse, type NextRequest } from "next/server";
import {
  HIMS_REVIEW_COOKIE,
  HIMS_REVIEW_MAX_AGE,
  HIMS_REVIEW_PATH,
  REVIEW_HEADERS,
  reviewTokenForAttempt,
} from "@/lib/hims/access";

// Password check for the review area (2 Oct 2026). The gate's form posts to the
// page's own URL; src/proxy.ts rewrites that POST here with an x-review-slug header.
//
// Light rate limit: 8 wrong attempts per IP per 15 minutes, held in memory, so it
// is per function instance rather than global. Enough to blunt a casual guesser;
// the password's length does the rest.

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;
const failures = new Map<string, { count: number; first: number }>();

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function limited(ip: string): boolean {
  const f = failures.get(ip);
  if (!f) return false;
  if (Date.now() - f.first > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return f.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const now = Date.now();
  const f = failures.get(ip);
  if (!f || now - f.first > WINDOW_MS) failures.set(ip, { count: 1, first: now });
  else f.count += 1;
  if (failures.size > 5000) failures.clear();
}

function back(req: NextRequest, slug: string, error?: "wrong" | "limited") {
  const url = new URL(`${HIMS_REVIEW_PATH}/${slug}`, req.nextUrl.origin);
  if (error) url.searchParams.set("error", error);
  // 303 so the browser follows with a GET and a refresh never re-posts the password.
  const res = NextResponse.redirect(url, 303);
  for (const [k, v] of Object.entries(REVIEW_HEADERS)) res.headers.set(k, v);
  return res;
}

export async function POST(req: NextRequest) {
  // Set by src/proxy.ts when it rewrites the gate's POST here.
  const slugParam = req.headers.get("x-review-slug") ?? "";
  // Redirect back to the slug that was posted, real or not: sending unknown slugs to
  // a fixed real one disclosed it (5 Oct 2026 audit). The proxy only forwards slugs
  // matching this pattern; anything else falls back to a neutral path.
  const slug = /^[a-z0-9-]{1,60}$/.test(slugParam) ? slugParam : "draft";
  const ip = clientIp(req);

  if (limited(ip)) return back(req, slug, "limited");

  let attempt = "";
  try {
    const form = await req.formData();
    const v = form.get("password");
    attempt = typeof v === "string" ? v.trim() : "";
  } catch {
    attempt = "";
  }

  const token = attempt ? reviewTokenForAttempt(attempt) : null;
  if (!token) {
    recordFailure(ip);
    return back(req, slug, "wrong");
  }

  failures.delete(ip);
  const res = back(req, slug);
  res.cookies.set(HIMS_REVIEW_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: HIMS_REVIEW_PATH,
    maxAge: HIMS_REVIEW_MAX_AGE,
  });
  return res;
}
