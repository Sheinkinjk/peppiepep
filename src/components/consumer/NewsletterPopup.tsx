"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import { newsletter } from "@/lib/home/content";

/**
 * The newsletter ask, shown once, and only to someone who has read around.
 *
 * Why it exists: GA4 recorded two newsletter subscriptions in the 30 days to 23
 * Sep 2026, from a footer form on every page. Jarred's brief (24 Sep 2026): a
 * popup, but never on arrival, because most visitors come for one code and go;
 * ask on about the fifth page instead, when the person has shown they are
 * exploring.
 *
 * The rules, all enforced here:
 *  - counts distinct page views in this browser (localStorage), shows on the 5th;
 *  - shows once, then not again for 60 days after a dismissal;
 *  - never shows to someone who has subscribed anywhere on the site, which
 *    HomeNewsletter records on success;
 *  - never on the unsubscribe or login routes;
 *  - never while the cookie banner is still unanswered. Found on the first live
 *    test, 24 Sep 2026: on a phone both are fixed to the bottom, the banner sits
 *    above the popup, and it covered the popup's own buttons. One overlay at a
 *    time; the banner comes first because the law says so.
 *  - closes on the button, the backdrop or Escape, and traps nothing: the page
 *    behind stays scrollable and readable.
 *
 * The counter is a functional preference, not analytics: nothing leaves the
 * browser, so it sits outside the cookie banner's analytics toggle. The one
 * thing sent is the GA4 event on show, which gtag only transmits with consent.
 */
const PV_KEY = "referlabs_pv";
const DISMISSED_KEY = "referlabs_popup_dismissed_at";
const SUBSCRIBED_KEY = "referlabs_subscribed";
const SHOW_ON_PAGE = 5;
const QUIET_DAYS = 60;
const SKIP = /^\/(unsubscribe|login|dashboard|api)(\/|$)/;

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch {}
}

export default function NewsletterPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!pathname || SKIP.test(pathname)) return;
    // Count this page once, even if the effect re-runs. Counting happens before
    // any of the gates below, so a page read while the cookie banner was still
    // open still counts toward five; only the SHOWING waits on the answer. The
    // first version gated the count as well, which put the ask on the sixth
    // page for anyone who answered the banner on their first page, which is
    // most people.
    const seen = (read(PV_KEY) || "").split("|").filter(Boolean);
    if (!seen.includes(pathname)) {
      seen.push(pathname);
      write(PV_KEY, seen.slice(-50).join("|"));
    }

    if (read(SUBSCRIBED_KEY)) return;
    if (!read("referlabs_cookie_consent")) return;
    const dismissed = Number(read(DISMISSED_KEY) || 0);
    if (dismissed && Date.now() - dismissed < QUIET_DAYS * 24 * 3600 * 1000) return;
    if (seen.length < SHOW_ON_PAGE) return;
    // From the fifth page on, until answered. Exactly-five would skip anyone
    // whose fifth page was read with the banner still open.

    const t = setTimeout(() => {
      setOpen(true);
      window.gtag?.("event", "newsletter_popup_shown", { page: pathname, page_number: seen.length });
    }, 1800);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    write(DISMISSED_KEY, String(Date.now()));
    setOpen(false);
    window.gtag?.("event", "newsletter_popup_dismissed");
  }

  if (!open) return null;

  return (
    <div className="nw-pop" role="presentation" onClick={dismiss}>
      <div
        className="nw-pop__card"
        role="dialog"
        aria-modal="false"
        aria-labelledby="nw-pop-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="nw-pop__x" onClick={dismiss} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <p className="nw-pop__k">You have read a few of our pages</p>
        <h2 id="nw-pop-title" className="nw-pop__t">{newsletter.heading}</h2>
        <p className="nw-pop__b">{newsletter.body}</p>
        <HomeNewsletter source="popup-5th-page" compact />
        <button type="button" className="nw-pop__no" onClick={dismiss}>No thanks</button>
      </div>
    </div>
  );
}
