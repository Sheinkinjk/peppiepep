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
const SOURCE_KEY = "rl_first_touch";

/**
 * Referrer hosts that GA4 either mislabels or loses. Instagram is the reason
 * this exists: its in-app browser frequently sends no referrer at all, and when
 * it does it arrives as l.instagram.com, so social traffic lands in "Direct"
 * and a real channel disappears from every report. Reading it ourselves at the
 * landing page, and holding it for the tab, is the only way the click event can
 * say where the visit came from.
 */
const REFERRER_SOURCES: { re: RegExp; source: string; medium: string }[] = [
  { re: /(^|\.)instagram\.com$|^l\.instagram\.com$/i, source: "instagram", medium: "social" },
  { re: /(^|\.)facebook\.com$|^l\.facebook\.com$|^lm\.facebook\.com$/i, source: "facebook", medium: "social" },
  { re: /(^|\.)linkedin\.com$|^lnkd\.in$/i, source: "linkedin", medium: "social" },
  { re: /(^|\.)t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/i, source: "x", medium: "social" },
  { re: /(^|\.)tiktok\.com$/i, source: "tiktok", medium: "social" },
  { re: /(^|\.)reddit\.com$/i, source: "reddit", medium: "social" },
  { re: /(^|\.)youtube\.com$|^youtu\.be$/i, source: "youtube", medium: "social" },
  { re: /(^|\.)google\./i, source: "google", medium: "organic" },
  { re: /(^|\.)bing\.com$/i, source: "bing", medium: "organic" },
  { re: /(^|\.)duckduckgo\.com$/i, source: "duckduckgo", medium: "organic" },
  { re: /chatgpt\.com|chat\.openai\.com|openai\.com/i, source: "chatgpt", medium: "ai_assistant" },
  { re: /perplexity\.ai/i, source: "perplexity", medium: "ai_assistant" },
  { re: /claude\.ai|anthropic\.com/i, source: "claude", medium: "ai_assistant" },
  { re: /gemini\.google\.com|bard\.google\.com/i, source: "gemini", medium: "ai_assistant" },
  { re: /copilot\.microsoft\.com|edgeservices\.bing\.com/i, source: "copilot", medium: "ai_assistant" },
];

type FirstTouch = { source: string; medium: string; campaign: string };

/**
 * Where this visit came from, decided once at the landing page and held for the
 * tab. UTM parameters win when present, then a known referrer, then the raw
 * referrer host, then direct.
 *
 * GA4 keeps its own session source and will usually agree. This exists because
 * it can be attached to the click event itself, which turns "which channel
 * produces Moshy clicks" from a cross-scope join into one row of a table, and
 * because it catches the cases GA4 drops.
 */
export function firstTouch(): FirstTouch {
  const fallback: FirstTouch = { source: "(direct)", medium: "(none)", campaign: "(not set)" };
  if (typeof window === "undefined") return fallback;
  try {
    const stored = sessionStorage.getItem(SOURCE_KEY);
    if (stored) return JSON.parse(stored) as FirstTouch;
  } catch {
    /* sessionStorage unavailable: fall through and compute it fresh */
  }

  let touch: FirstTouch = fallback;
  try {
    const qs = new URLSearchParams(window.location.search);
    const utmSource = qs.get("utm_source");
    if (utmSource) {
      touch = {
        source: utmSource.toLowerCase().slice(0, 40),
        medium: (qs.get("utm_medium") || "(not set)").toLowerCase().slice(0, 40),
        campaign: (qs.get("utm_campaign") || "(not set)").toLowerCase().slice(0, 60),
      };
    } else if (document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, "");
      if (host !== window.location.hostname) {
        const known = REFERRER_SOURCES.find((r) => r.re.test(host) || r.re.test(document.referrer));
        touch = known
          ? { source: known.source, medium: known.medium, campaign: "(not set)" }
          : { source: host.slice(0, 40), medium: "referral", campaign: "(not set)" };
      }
    }
  } catch {
    /* keep the direct fallback */
  }

  try {
    sessionStorage.setItem(SOURCE_KEY, JSON.stringify(touch));
  } catch {
    /* not storable, recomputed next event */
  }
  return touch;
}

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
  traffic_source: string;
  traffic_medium: string;
  traffic_campaign: string;
} {
  const t = firstTouch();
  return {
    landing_page: landingPage(),
    referrer_host: referrerHost(),
    page_path: typeof window === "undefined" ? "" : window.location.pathname,
    traffic_source: t.source,
    traffic_medium: t.medium,
    traffic_campaign: t.campaign,
  };
}
