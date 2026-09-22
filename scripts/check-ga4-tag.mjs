#!/usr/bin/env node
/**
 * Does GA4 count a visit once?
 *
 * Run by hand against the live site (it needs a real browser and a real deploy):
 *   npm run check-ga4 [url]
 *
 * This exists because reading the source could not answer the question. On 22 Sep 2026
 * the site sent TWO page_view hits for every client-side navigation: GA4 enhanced
 * measurement fires on browser history events, and components/PageViewTracker.tsx sent
 * its own as well. Nothing in the repo showed it, because one half of the pair was a
 * setting in the GA4 admin UI. The same run found the opposite fault on the entry page:
 * the first page_view goes out before the cookie banner is answered, so it carries
 * consent denied (gcs=G100), and this property is far below the volume Google needs for
 * behavioural modelling, so those hits are not in the reports at all.
 *
 * What the check asserts, counting ONLY hits sent with analytics consent granted (G111):
 *   1. exactly one counted page_view per URL visited, so nothing is double counted;
 *   2. the entry page has one, so accepting the banner is not invisible;
 *   3. consent starts denied, which is what the banner promises.
 *
 * To test the check itself, put a second page_view back (re-add a route-change sender,
 * or turn the GA4 history-event setting off) and watch the relevant assertion fail.
 */
import { chromium } from "playwright";

const SITE = process.argv[2] ?? "https://referlabs.com.au";
const hits = [];

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();

page.on("request", (r) => {
  const url = r.url();
  if (!/google-analytics\.com\/(g\/)?collect/.test(url)) return;
  const u = new URL(url);
  const gcs = u.searchParams.get("gcs");
  const take = (params) => {
    const en = params.get("en");
    if (en) hits.push({ en, dl: params.get("dl") ?? u.searchParams.get("dl"), gcs });
  };
  take(u.searchParams);
  // gtag batches several events into one POST, one per line.
  if (r.postData()) for (const line of r.postData().split("\n")) take(new URLSearchParams(line));
});

const settle = (ms) => page.waitForTimeout(ms);
const fail = [];

await page.goto(SITE, { waitUntil: "networkidle" });
await settle(4000);

const beforeConsent = hits.filter((h) => h.en === "page_view");
if (!beforeConsent.length) fail.push("No page_view at all on the first load: the tag is not firing.");
else if (beforeConsent.some((h) => h.gcs !== "G100"))
  fail.push(`Consent did not start denied: saw ${[...new Set(beforeConsent.map((h) => h.gcs))].join(", ")}, expected G100.`);

const accept = page.getByRole("button", { name: "Accept all" });
if (!(await accept.isVisible().catch(() => false))) fail.push("Cookie banner did not appear, so consent can never be granted.");
else { await accept.click(); await settle(4000); }

/**
 * Wait for the hit rather than for a fixed delay. A timed wait made this check flaky:
 * a run that closed the browser 6s after the click reported the last page as missing
 * from GA4 when the request was simply still in flight. Waiting for the event means a
 * failure here means the event never came.
 */
async function pageViewFor(url, ms = 15000) {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    if (hits.some((h) => h.en === "page_view" && h.dl === url)) return true;
    await settle(250);
  }
  return false;
}

// Two client-side navigations: the case that was being counted twice.
const visited = [new URL(SITE).href];
for (const nth of [3, 5]) {
  const link = page.locator('a[href^="/"]:visible').nth(nth);
  if (!(await link.count())) continue;
  await link.click();
  await page.waitForLoadState("networkidle").catch(() => {});
  const url = page.url();
  visited.push(url);
  await pageViewFor(url);
  // A duplicate would arrive alongside the first, so give it a moment to show up.
  await settle(2500);
}

await browser.close();

// Only consented hits reach the reports on a property this size, so only they are counted.
const counted = hits.filter((h) => h.en === "page_view" && h.gcs === "G111");
const perUrl = {};
for (const h of counted) perUrl[h.dl] = (perUrl[h.dl] ?? 0) + 1;

for (const url of visited) {
  const n = perUrl[url] ?? 0;
  if (n === 1) continue;
  fail.push(n === 0
    ? `${url}: no counted page_view. This visit is missing from GA4.`
    : `${url}: ${n} counted page_views for one visit. Pageviews are inflated ${n}x here.`);
}

const label = (h) => `${h.dl} (${h.gcs === "G111" ? "counted" : "denied, not in reports"})`;
console.log("\n  page_view hits, in order:");
hits.filter((h) => h.en === "page_view").forEach((h, i) => console.log(`    ${i + 1}. ${label(h)}`));

if (fail.length) {
  console.error("\n  GA4 tag check FAILED:");
  for (const f of fail) console.error(`    - ${f}`);
  process.exit(1);
}
console.log(`\n  GA4 counts each of the ${visited.length} pages visited exactly once, and consent starts denied.\n`);
