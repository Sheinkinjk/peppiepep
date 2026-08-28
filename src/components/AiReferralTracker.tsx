"use client";

import { useEffect } from "react";

/**
 * Logs visits that arrive from AI answer engines (ChatGPT, Perplexity, Copilot,
 * Gemini, Claude, etc.) as a separate GA4 `ai_referral` event, so GEO-sourced
 * traffic can be measured apart from normal organic search.
 *
 * Reads document.referrer once on load, matches the host against known AI
 * engines, and fires the event (consent-gated via Consent Mode, like all gtag
 * calls). Guarded by sessionStorage so it fires once per session, not on every
 * client-side navigation.
 *
 * SOLE EMITTER since 28 Aug 2026. A second copy lived as an inline script in
 * Analytics.tsx and fired on the same load with no session guard, so every
 * AI-referred landing produced two `ai_referral` events whose payloads differed
 * in shape and could not be deduplicated afterwards. This one was kept: it has
 * the guard, it covers two more engines, and it is editable without counting
 * backslashes in a template literal. Do not reintroduce an inline copy.
 *
 * Carried over from it: the `last_ai_source` user property, and
 * edgeservices.bing.com. Deliberately NOT carried over: the legacy
 * `bing.com/chat` and `bing.com/search?...sydney` patterns, which matched on the
 * full referrer URL rather than the hostname this file tests, and whose surface
 * folded into copilot.microsoft.com, already covered below.
 *
 * The referrer is the whole mechanism, and it is the limit: an assistant that
 * strips it produces a visit indistinguishable from direct. Treat the numbers
 * here as a floor, never as the count.
 */

// Referrer host (or host suffix) -> engine label.
const AI_SOURCES: { match: (host: string) => boolean; source: string }[] = [
  { source: "ChatGPT", match: (h) => h === "chatgpt.com" || h.endsWith(".chatgpt.com") || h === "chat.openai.com" || h === "openai.com" || h.endsWith(".openai.com") },
  { source: "Perplexity", match: (h) => h === "perplexity.ai" || h.endsWith(".perplexity.ai") },
  { source: "Copilot", match: (h) => h === "copilot.microsoft.com" || h.endsWith(".copilot.microsoft.com") || h === "copilot.cloud.microsoft" || h === "edgeservices.bing.com" },
  { source: "Gemini", match: (h) => h === "gemini.google.com" || h === "bard.google.com" },
  { source: "Claude", match: (h) => h === "claude.ai" || h.endsWith(".claude.ai") },
  { source: "You.com", match: (h) => h === "you.com" || h.endsWith(".you.com") },
  { source: "Grok", match: (h) => h === "grok.com" || h.endsWith(".grok.com") },
];

export function AiReferralTracker() {
  useEffect(() => {
    try {
      const ref = document.referrer;
      if (!ref) return;
      const host = new URL(ref).hostname.replace(/^www\./, "");
      const hit = AI_SOURCES.find((s) => s.match(host));
      if (!hit) return;

      // Fire once per session so SPA navigation doesn't double-count.
      const key = `ai_ref_${hit.source}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");

      const payload = {
        ai_source: hit.source,
        referrer_host: host,
        landing_page: window.location.pathname,
        event_category: "ai_referral",
        event_label: hit.source,
      };
      window.gtag?.("event", "ai_referral", payload);
      // User property, so every later event in the session can be segmented by
      // the assistant that sent the visit. It does not reach the first
      // page_view: gtag('config') has already sent that one by the time this
      // runs. That was equally true of the inline copy this replaces.
      window.gtag?.("set", "user_properties", { last_ai_source: hit.source });
      window.dataLayer?.push({ event: "ai_referral", ...payload });
    } catch {
      // Malformed referrer or storage unavailable: ignore.
    }
  }, []);

  return null;
}
