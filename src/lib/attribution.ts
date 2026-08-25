/**
 * Attribution context attached to every money event.
 *
 * GA4 resolves a session's source and medium by itself, so "how many
 * affiliate_clicks came from Organic Search" is already answerable. What it
 * cannot tell you is which entry page earned the visit that produced the click,
 * or which specific click a network later paid for. Those two are the questions
 * that decide what to write next and what to keep, so the events carry them.
 *
 * Nothing here identifies a visitor. The click id is random per click, not the
 * GA client id: it answers the same join question without handing a visitor
 * identifier to an affiliate network, which would be a disclosure we would then
 * owe in the privacy policy.
 */

const LANDING_KEY = "rl_landing_page";

/** Random id for one click or submission, short enough to sit in a URL parameter. */
export function newEventId(): string {
  try {
    const a = new Uint8Array(4);
    crypto.getRandomValues(a);
    return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return Math.floor(Math.random() * 0xffffffff).toString(16);
  }
}

/** The page this visit started on, remembered for the tab. */
export function landingPage(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = sessionStorage.getItem(LANDING_KEY);
    if (existing) return existing;
    sessionStorage.setItem(LANDING_KEY, window.location.pathname);
    return window.location.pathname;
  } catch {
    return window.location.pathname;
  }
}

/** Referrer hostname, or "(direct)" when there is none. */
export function referrerHost(): string {
  if (typeof window === "undefined") return "";
  try {
    return document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "(direct)";
  } catch {
    return "(unknown)";
  }
}

/**
 * The context every money event should carry: where the visit started, where it
 * came from, and which page the action happened on.
 */
export function attributionContext(): {
  landing_page: string;
  referrer_host: string;
  page_path: string;
} {
  return {
    landing_page: landingPage(),
    referrer_host: referrerHost(),
    page_path: typeof window === "undefined" ? "" : window.location.pathname,
  };
}
