import { withSearchable } from "@searchablehq/middleware/nextjs";
import { NextResponse, type NextRequest } from "next/server";

// Searchable Analytics server-side capture. Fires each request to the Searchable
// collector asynchronously (no added latency for visitors). IPs are anonymised
// by default (anonymizeIp defaults to true — last octet zeroed).
//
// Guarded: the middleware only activates when BOTH credentials are present, so a
// missing/rotated env var can never 500 the site — it degrades to a pass-through.
const siteToken = process.env.SEARCHABLE_SITE_TOKEN;
const apiKey = process.env.SEARCHABLE_API_KEY;

const handler =
  siteToken && apiKey
    ? withSearchable({ siteToken, apiKey })
    : (_req: NextRequest) => NextResponse.next();

export default handler;

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
