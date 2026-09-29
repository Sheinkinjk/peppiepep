import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getHimsPage } from "@/content/hims";
import { SITE_URL } from "@/content/hims/config";
import { HimsPage } from "@/components/hims/HimsPage";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import { HIMS_PREVIEW_COOKIE, hasHimsAccess, himsPagesLive } from "./access";

type SearchParams = Record<string, string | string[] | undefined>;

export async function himsMetadata(slug: string): Promise<Metadata> {
  const page = getHimsPage(slug);
  if (!page) return {};
  const live = himsPagesLive();
  const url = `${SITE_URL}/${slug}`;
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: live ? { canonical: url } : undefined,
    robots: live
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    openGraph: live
      ? { title: page.seoTitle, description: page.metaDescription, url, type: "article", siteName: "ReferLabs" }
      : undefined,
  };
}

export async function renderHimsRoute(slug: string, searchParams: SearchParams) {
  const page = getHimsPage(slug);
  if (!page) notFound();

  const jar = await cookies();
  const keyParam = typeof searchParams.key === "string" ? searchParams.key : undefined;
  const cookieValue = jar.get(HIMS_PREVIEW_COOKIE)?.value;

  if (!hasHimsAccess({ cookieValue, keyParam })) notFound();

  const live = himsPagesLive();
  // Carry the key on internal links in case the middleware cookie isn't set.
  const linkSuffix = !live && keyParam ? `?key=${encodeURIComponent(keyParam)}` : "";

  // Integration (29 Sep 2026): rendered inside the site's consumer shell so the normal
  // header and footer appear; the routes are listed in ChromeGate so the legacy chrome
  // does not render as well.
  return (
    <ConsumerShell>
      <HimsPage content={page} preview={!live} linkSuffix={linkSuffix} />
    </ConsumerShell>
  );
}
