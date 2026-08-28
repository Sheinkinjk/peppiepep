#!/usr/bin/env node
import { execSync } from "node:child_process";
/**
 * IndexNow submitter for referlabs.com.au.
 *
 * Pings the IndexNow API (Bing, Yandex, and other participating engines) so
 * changed pages get recrawled fast instead of waiting for the next crawl. Run
 * it AFTER a production deploy, so the live sitemap already reflects the change:
 *
 *   npm run indexnow -- /moshy /knose      submit just those two
 *   npm run indexnow                       submit every URL in the sitemap
 *
 * PREFER THE FIRST FORM. IndexNow means "these URLs changed", and every run of
 * the second form asserts that all ~154 of them did. After a five-page edit that
 * is 149 false claims, and repeatedly resubmitting an unchanged set is what gets
 * a key deprioritised by the engines that honour it. Bing is also the index
 * ChatGPT retrieves from, so the cost of a throttled key is not confined to Bing
 * search. The whole-sitemap form stays for a genuine site-wide change (a
 * template edit that really did touch every page, a domain-level fix) and as the
 * fallback when no arguments are given, which is what it always did.
 *
 * Arguments may be paths (/moshy) or full URLs; both normalise to absolute URLs
 * on HOST. IndexNow rejects a payload containing any URL from another host, so a
 * foreign host is a hard error rather than a dropped row.
 *
 * Targeted submissions are checked against the live sitemap first. A URL that is
 * not in it is either noindex or redirecting, and pointing an engine at one is
 * the documented way to waste a crawl on a page we are trying to have dropped.
 * Those are reported and skipped, never submitted silently.
 *
 * The key file must be live at https://referlabs.com.au/<KEY>.txt (it is,
 * committed under public/). IndexNow validates ownership by fetching it.
 *
 * Bing Webmaster Tools is verified for this domain outside the codebase, so its
 * AI Performance report is where the effect of a submission shows up. Nothing
 * here needs a verification token.
 */

const HOST = "referlabs.com.au";
const KEY = "bb9c36b904b60b926f5ed8a7d0d6a28a";
const ORIGIN = `https://${HOST}`;
const SITEMAP = `${ORIGIN}/sitemap.xml`;
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;

/**
 * Vercel's bot protection began 403ing node's fetch on 21 Aug 2026, while the
 * identical request from curl returned 200 even with full browser headers, so it
 * is a TLS/client fingerprint block rather than a header one. Shelling out to
 * curl is the pragmatic fix; the alternative is this silently never submitting
 * again, which is the kind of failure nobody notices.
 */
function sitemapUrls() {
  let xml;
  try {
    xml = execSync(
      `curl -s --fail -m 30 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" "${SITEMAP}"`,
      { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
    );
  } catch {
    throw new Error("Failed to fetch sitemap (curl)");
  }
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("No <loc> URLs found in sitemap");
  return urls;
}

/** "/moshy", "moshy" and the full URL all normalise to the same absolute URL. */
function toAbsolute(arg) {
  if (/^https?:\/\//i.test(arg)) {
    const u = new URL(arg);
    if (u.host !== HOST) {
      throw new Error(
        `${arg} is not on ${HOST}. IndexNow rejects a payload containing any URL from another host.`,
      );
    }
    return u.href.replace(/\/$/, "") || ORIGIN;
  }
  return `${ORIGIN}/${arg.replace(/^\/+/, "")}`.replace(/\/$/, "") || ORIGIN;
}

async function main() {
  const args = process.argv.slice(2).filter(Boolean);
  let urlList;

  if (args.length === 0) {
    urlList = sitemapUrls();
    console.log(
      `No URLs given, so submitting the whole sitemap: ${urlList.length} URLs.\n` +
        "  This asserts every one of them changed. If only a few did, rerun as\n" +
        "  `npm run indexnow -- /page-one /page-two` instead.",
    );
  } else {
    const requested = args.map(toAbsolute);
    const inSitemap = new Set(sitemapUrls());
    urlList = requested.filter((u) => inSitemap.has(u));
    const skipped = requested.filter((u) => !inSitemap.has(u));
    if (skipped.length) {
      console.warn(
        `Skipping ${skipped.length} URL(s) absent from the sitemap (noindex, redirecting, or a typo):`,
      );
      for (const u of skipped) console.warn(`  ${u}`);
    }
    if (urlList.length === 0) throw new Error("Nothing left to submit.");
    console.log(`Submitting ${urlList.length} URL(s) to IndexNow:`);
    for (const u of urlList) console.log(`  ${u}`);
  }

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
  console.log(`Done. ${urlList.length} page(s) queued for recrawl (Bing, Yandex).`);
}

main().catch((e) => {
  console.error("IndexNow error:", e.message);
  process.exit(1);
});
