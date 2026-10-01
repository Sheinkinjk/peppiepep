import { himsMetadata, renderHimsRoute } from "@/lib/hims/render";

const SLUG = "hims";

// 404 until HIMS_PAGES_LIVE=true (src/proxy.ts refuses first). Review happens at
// /preview/hims behind a password. Read per request so flipping the env var needs
// no rebuild; switch to static after launch if you like.
export const dynamic = "force-dynamic";

export function generateMetadata() {
  return himsMetadata(SLUG);
}

export default function Page() {
  return renderHimsRoute(SLUG);
}
