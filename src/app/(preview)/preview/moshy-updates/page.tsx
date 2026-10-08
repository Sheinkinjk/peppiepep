import type { Metadata } from "next";
import "@/app/home.css";
import "@/app/theme.css";
import "@/app/brand.css";
import "@/components/moshy-preview/moshy-preview.css";
import { SiteFooterBar } from "@/components/brand/SiteChrome";
import { MoshyUpdatesView } from "@/components/moshy-preview/MoshyUpdatesView";
import { moshySignupUrl } from "@/components/moshy-preview/copy";

/*
 * PREVIEW ONLY (branch preview/moshy-updates, 8 Oct 2026).
 * Served behind the review password gate in src/proxy.ts (its own password,
 * MOSHY_PREVIEW_PASSWORD, separate from the Hims previews). noindex; no public
 * route, redirect or internal link points here; not in the sitemap; robots.txt
 * disallows /preview/; trackers are suppressed on /preview/* in the root layout.
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Moshy updates (preview) | Refer Labs",
  description: "Preview of a Refer Labs page for Moshy. Not live.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noarchive: true } },
};

export default function MoshyUpdatesPreviewPage() {
  return <MoshyUpdatesView href={moshySignupUrl()} preview footer={<SiteFooterBar />} />;
}
