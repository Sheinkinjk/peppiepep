#!/usr/bin/env node
import { execSync } from "node:child_process";
/**
 * IndexNow submitter for referlabs.com.au.
 *
 * Reads the live sitemap, then pings the IndexNow API (Bing, Yandex, and
 * other participating engines) so newly added/updated pages get indexed
 * fast — instead of waiting for the next crawl. Run this AFTER a production
 * deploy so the live sitemap already includes any new pages:
 *
 *   npm run indexnow
 *
 * The key file must be live at https://referlabs.com.au/<KEY>.txt (it is,
 * committed under public/). IndexNow validates ownership by fetching it.
 */

const HOST = "referlabs.com.au";
const KEY = "bb9c36b904b60b926f5ed8a7d0d6a28a";
const SITEMAP = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
    // Vercel's bot protection began 403ing node's fetch on 21 Aug 2026, while the
    // identical request from curl returned 200 even with full browser headers, so
    // it is a TLS/client fingerprint block rather than a header one. Shelling out
    // to curl is the pragmatic fix; the alternative is this silently never
    // submitting again, which is the kind of failure nobody notices.
    let xml;
    try {
      xml = execSync(
        `curl -s --fail -m 30 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" "${SITEMAP}"`,
        { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
      );
    } catch {
      throw new Error("Failed to fetch sitemap (curl)");
    }
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urlList.length === 0) throw new Error("No <loc> URLs found in sitemap");

  console.log(`Submitting ${urlList.length} URLs to IndexNow…`);

  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // 200 = accepted, 202 = accepted (validation pending). Both are success.
  const text = await r.text().catch(() => "");
  console.log(`IndexNow response: ${r.status} ${r.statusText}${text ? " — " + text.slice(0, 200) : ""}`);
  if (r.status !== 200 && r.status !== 202) {
    console.error("IndexNow submission did not succeed. Check the key file is live at", KEY_LOCATION);
    process.exit(1);
  }
  console.log("Done. New/updated pages queued for fast indexing (Bing, Yandex).");
}

main().catch((e) => {
  console.error("IndexNow error:", e.message);
  process.exit(1);
});
