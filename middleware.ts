import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Database } from "@/types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if needed; ensures auth context is available in RSC.
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Enforce auth for dashboard routes at the edge so unauthenticated requests get an HTTP redirect
  // instead of a 200 HTML shell containing a client-side/meta refresh.
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/dashboard") && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/login";
    const next = `${req.nextUrl.pathname}${req.nextUrl.search}`;
    redirectUrl.search = `?next=${encodeURIComponent(next)}`;
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/r/:path*", "/me/:path*"],
};
