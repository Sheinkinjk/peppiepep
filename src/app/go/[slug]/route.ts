import { NextRequest, NextResponse } from "next/server";
import { GO_DESTINATIONS } from "@/lib/go-links";

/**
 * Attribution wrapper for partners whose tracking is a plain query-string code
 * rather than a network click URL.
 *
 * Commission Factory links carry their own click id and are decorated per page
 * by AffiliateClickTracker's SUBID_PARAM map. Midoc's `?ref=` code is not a
 * network link, so that map does not apply: nothing tells us which page a click
 * came from. This route is the substitute. /go/midoc-<page-slug> resolves to the
 * Midoc URL for that placement, so the page is identifiable from our own logs
 * even though the merchant only ever sees one referral code.
 *
 * 302, not 308: the destination is a commercial arrangement that will change,
 * and a permanent redirect would be cached by browsers and intermediaries long
 * after we repoint it. This matches the reasoning already applied to /r/*.
 *
 * Disallowed in robots.txt alongside /r/ and /me/, so no crawler follows a
 * monetised hop and no /go URL competes for indexing with the page it sits on.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(_req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const destination = GO_DESTINATIONS[slug];

  // An unknown slug goes to the hub rather than the partner: a typo must never
  // silently send a reader to a commercial destination they did not choose.
  if (!destination) {
    return NextResponse.redirect(new URL("/mens-health", _req.nextUrl.origin), 302);
  }
  return NextResponse.redirect(destination, 302);
}
