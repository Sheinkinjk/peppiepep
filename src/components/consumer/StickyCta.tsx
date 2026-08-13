"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Mobile-only sticky affiliate CTA. Slides up after the reader scrolls past the
 * hero, keeping the primary action one tap away on the pages that earn. The
 * link carries rel="sponsored" + data-cta="mobile-sticky" so AffiliateClickTracker
 * attributes the click and its placement automatically.
 */
export default function StickyCta({
  href,
  label,
  product,
  offer,
  sponsored = true,
}: {
  href: string;
  label: string;
  product: string;
  /** When set, surfaces the deal as the headline line (still discloses the link). */
  offer?: string;
  sponsored?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isInternal = href.startsWith("/") || href.startsWith("#");
  // An on-site enquiry form is a disclosed commercial referral, not an affiliate link.
  const disclosure = isInternal ? "enquiry form · disclosed referral" : "disclosed affiliate link";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-[120%]"}`}
      aria-hidden={!show}
    >
      <div className="mx-3 mb-3 flex items-center gap-3 rounded-2xl border border-[#cfe6da] bg-white/95 px-4 py-2.5 shadow-[0_-8px_30px_-12px_rgba(16,37,27,0.4)] backdrop-blur">
        <div className="min-w-0 flex-1">
          {offer ? (
            <>
              <p className="truncate text-[13px] font-bold text-[#0a7c42]">{offer}</p>
              <p className="truncate text-[11px] text-[#9aa39c]">{product} · {disclosure}</p>
            </>
          ) : (
            <>
              <p className="truncate text-[13px] font-bold text-[#10251b]">{product}</p>
              <p className="truncate text-[11px] text-[#9aa39c]">{disclosure.charAt(0).toUpperCase() + disclosure.slice(1)}</p>
            </>
          )}
        </div>
        <a
          href={href}
          // Internal destinations (our own lead forms) must open in the same tab and
          // must not carry nofollow/sponsored, which would waste internal link equity
          // and misdescribe the link. Only outbound partner links get those.
          {...(isInternal
            ? {}
            : { target: "_blank", rel: sponsored ? "nofollow sponsored" : "nofollow" })}
          data-cta="mobile-sticky"
          className="nw-btn shrink-0 !px-4 !py-2.5 !text-[13px]"
        >
          {label}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
