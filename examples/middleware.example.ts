// EXAMPLE ONLY. If the repo already has middleware.ts (or proxy.ts on Next 16), merge the
// himsPreviewMiddleware call into it instead of replacing it.
import { NextResponse, type NextRequest } from "next/server";
import { himsPreviewMiddleware } from "@/lib/hims/middleware";

export function middleware(req: NextRequest) {
  const hims = himsPreviewMiddleware(req);
  if (hims) return hims;
  // ...existing middleware logic here...
  return NextResponse.next();
}

// Matchers must be literal. If the existing matcher is broader, just make sure these paths are covered.
export const config = {
  matcher: [
    "/hims",
    "/hims-hair-loss",
    "/hims-ed",
    "/hims-vs-mosh",
    "/best-mens-weight-loss-program-australia",
    "/best-hair-loss-treatment-online-australia",
    "/best-online-ed-treatment-australia",
  ],
};
