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
 */

// Referrer host (or host suffix) -> engine label.
const AI_SOURCES: { match: (host: string) => boolean; source: string }[] = [
  { source: "ChatGPT", match: (h) => h === "chatgpt.com" || h.endsWith(".chatgpt.com") || h === "chat.openai.com" || h === "openai.com" || h.endsWith(".openai.com") },
  { source: "Perplexity", match: (h) => h === "perplexity.ai" || h.endsWith(".perplexity.ai") },
  { source: "Copilot", match: (h) => h === "copilot.microsoft.com" || h.endsWith(".copilot.microsoft.com") || h === "copilot.cloud.microsoft" },
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
      window.dataLayer?.push({ event: "ai_referral", ...payload });
    } catch {
      // Malformed referrer or storage unavailable: ignore.
    }
  }, []);

  return null;
}
