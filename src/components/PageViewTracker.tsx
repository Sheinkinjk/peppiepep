"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Sends a GA4 page_view on client-side navigation.
 *
 * gtag sends one page_view when it is configured, on the initial hard load, and
 * then nothing. In the App Router every subsequent link is a client-side
 * navigation with no document load, so GA4 never hears about it. On a site
 * where the whole point is that people read a hub, then a comparison, then a
 * brand page, that is most of the pageviews missing, and it makes every
 * landing-page and path report wrong rather than merely incomplete.
 *
 * The first load is skipped deliberately: gtag('config') already sent that one,
 * and sending it again would double-count every session's entry page.
 */
export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    if (typeof window === "undefined" || !window.gtag) return;

    const qs = searchParams?.toString();
    window.gtag("event", "page_view", {
      page_path: pathname + (qs ? `?${qs}` : ""),
      page_location: window.location.href,
      page_title: document.title,
    } as unknown as Record<string, unknown>);
  }, [pathname, searchParams]);

  return null;
}
