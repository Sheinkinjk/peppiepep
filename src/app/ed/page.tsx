import { himsMetadata, renderHimsRoute } from "@/lib/hims/render";

const SLUG = "ed";

// Reads the preview cookie/key per request. Switch to static once HIMS_PAGES_LIVE=true if you like.
export const dynamic = "force-dynamic";

export function generateMetadata() {
  return himsMetadata(SLUG);
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return renderHimsRoute(SLUG, await searchParams);
}
