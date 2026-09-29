import { NextResponse, type NextRequest } from "next/server";
import { HIMS_SLUG_LIST } from "@/content/hims/slugs";
import { HIMS_PREVIEW_COOKIE } from "./access";

/**
 * Call this first inside your existing middleware (or proxy.ts on Next 16).
 * Returns null for any path that isn't a Hims page, so the rest of your middleware runs as normal.
 *
 * While the pages are in preview it:
 *  - sets X-Robots-Tag: noindex on every Hims response, with or without the key
 *  - sets a 30-day httpOnly cookie when ?key= is correct, so Hims reviewers can click
 *    between the seven pages without the key on every link
 *  - marks responses private so no CDN caches a keyed page
 * The page itself enforces access (404 without key or cookie), so this is defence in depth.
 */
export function himsPreviewMiddleware(req: NextRequest): NextResponse | null {
  const path = req.nextUrl.pathname.replace(/^\/+|\/+$/g, "");
  if (!(HIMS_SLUG_LIST as readonly string[]).includes(path)) return null;
  if (process.env.HIMS_PAGES_LIVE === "true") return null;

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.headers.set("Cache-Control", "private, no-store, max-age=0");

  const key = req.nextUrl.searchParams.get("key");
  const expected = process.env.HIMS_PREVIEW_KEY;
  if (key && expected && expected.length >= 24 && key === expected) {
    res.cookies.set(HIMS_PREVIEW_COOKIE, key, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  return res;
}
