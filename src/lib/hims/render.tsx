import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getHimsPage } from "@/content/hims";
import { SITE_URL } from "@/content/hims/config";
import { HimsPage } from "@/components/hims/HimsPage";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { HIMS_REVIEW_COOKIE, HIMS_REVIEW_PATH, hasReviewAccess, himsPagesLive } from "./access";

const NOINDEX: Metadata["robots"] = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: { index: false, follow: false, noarchive: true },
};

/**
 * `review: true` is the /preview/<slug> copy: always noindex, whatever HIMS_PAGES_LIVE says.
 * The canonical points at the final production URL in both cases (harmless while
 * noindexed, correct at launch); without one the page would inherit the root
 * layout's homepage canonical.
 */
export async function himsMetadata(slug: string, opts: { review?: boolean } = {}): Promise<Metadata> {
  const page = getHimsPage(slug);
  if (!page) return {};
  const indexable = himsPagesLive() && !opts.review;
  const url = `${SITE_URL}/${slug}`;
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    robots: indexable ? { index: true, follow: true } : NOINDEX,
    openGraph: indexable
      ? { title: page.seoTitle, description: page.metaDescription, url, type: "article", siteName: "Refer Labs" }
      : undefined,
  };
}

/** The real slug. 404 until HIMS_PAGES_LIVE=true (src/proxy.ts refuses first). */
export function renderHimsRoute(slug: string) {
  const page = getHimsPage(slug);
  if (!page || !himsPagesLive()) notFound();

  // Integration (29 Sep 2026): rendered inside the site's consumer shell so the normal
  // header and footer appear; the routes are listed in ChromeGate so the legacy chrome
  // does not render as well.
  return (
    <ConsumerShell>
      <HimsPage content={page} preview={false} linkPrefix="" />
    </ConsumerShell>
  );
}

/** /preview/<slug>: draft mode, for holders of the review cookie only. */
export async function renderHimsPreview(slug: string) {
  const page = getHimsPage(slug);
  if (!page) notFound();

  const jar = await cookies();
  if (!hasReviewAccess(jar.get(HIMS_REVIEW_COOKIE)?.value)) notFound();

  // Links between the five pages stay inside the review area.
  return (
    <ConsumerShell>
      <HimsPage content={page} preview linkPrefix={HIMS_REVIEW_PATH} />
    </ConsumerShell>
  );
}
