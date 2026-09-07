#!/usr/bin/env node
/**
 * Checks the AEO invariants that engines actually respond to, and that regress
 * silently because nothing errors when they break.
 *
 * Every rule here exists because it was found broken on a live money page, not
 * because it is a best practice someone published:
 *
 *  - ANSWER SLOT: 12 pages opened with "Last updated: ... | How we make money"
 *    because EditorialMeta sat between the h1 and the first paragraph. An
 *    extractor reads that as the answer.
 *  - TITLE/H1 INTENT: /moshhair was titled "Mosh Discount Code" with an h1 of
 *    "Mosh hair loss in Australia, explained". Google served a different page
 *    for the query, at position 20, while its sibling /moshy with an aligned
 *    title and h1 ranked 8th.
 *  - CODE NAMED: six pages ranking #6-9 stated "$120 off" without ever naming
 *    REFERRAL120, and three said "no code needed". The codes pay a commission on
 *    the code itself, so an unnamed code is a reader converting for free.
 *  - DUPLICATES: two pages with the same title compete with each other.
 *
 * Static analysis of source, so it runs before a push and needs no deployment.
 *
 *   node scripts/check-aeo.mjs
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");
const offers = read("src/lib/offers.ts");
const seo = read("src/lib/seo.ts");
const redirects = read("next.config.ts");

// Codes we hold, so the check knows which offers have one to name.
const CODES = [...offers.matchAll(/code:\s*"([A-Z0-9]+)"/g)].map((m) => m[1]);

const problems = [];
const add = (file, msg) => problems.push({ file, msg });

// ── 1. Nothing may sit between the h1 and the first content paragraph ────────
function pageFiles(dir = "src/app", out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) pageFiles(p, out);
    else if (e.name === "page.tsx") out.push(p);
  }
  return out;
}

for (const f of pageFiles()) {
  const t = read(f);
  const h1 = t.indexOf("</h1>");
  if (h1 < 0) continue;
  const em = t.indexOf("<EditorialMeta");
  if (em > h1) {
    const between = t.slice(h1, em).replace(/<[^>]+>/g, " ");
    // fewer than ~12 words between them means no real paragraph came first
    if (between.split(/\s+/).filter(Boolean).length < 12) {
      add(f, "EditorialMeta occupies the answer slot: put the lede paragraph before it");
    }
  }
}

// ── 2. A title promising a discount code needs an h1 that agrees ─────────────
// Parse seoConfig into url -> title properly. Matching a brace-block by regex
// grabbed neighbouring entries and reported pages whose titles say nothing of
// the sort.
const SEO = new Map();
for (const m of seo.matchAll(/\n  (\w+): \{([\s\S]*?)\n  \},/g)) {
  const block = m[2];
  const url = (block.match(/url:\s*`\$\{SITE_URL\}(\/[^`]*)`/) || [, ""])[1];
  const title = (block.match(/title:\s*"(.*?)"/) || [, ""])[1];
  if (url) SEO.set(url, title);
}

const slugDirs = readdirSync("src/app", { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("[") && !d.name.startsWith("("))
  .map((d) => d.name);

for (const slug of slugDirs) {
  if (new RegExp(`source: '/${slug}'`).test(redirects)) continue; // retired
  const title = SEO.get(`/${slug}`) || "";
  if (!/discount code/i.test(title)) continue;
  if (/\bis there (one|a)\b|\?/i.test(title)) continue; // question form: answered by an FAQ, not the h1

  const src = read(join("src/app", slug, "page.tsx")) + read(join("src/app", slug, "config.ts"));
  const h1 =
    (src.match(/h1Prefix:\s*"(.*?)"/) || [, ""])[1] + " " +
    (src.match(/h1Highlight:\s*"(.*?)"/) || [, ""])[1] + " " +
    (src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ""])[1].replace(/<[^>]+>/g, " ");
  const AMOUNT = /\d+\s*%\s*off|\$\d[\d,]*\s*off|off your first|months? free|US\$\d for a/i;
  const namesCode = CODES.some((c) => h1.includes(c));
  if (!/discount code/i.test(h1) && !AMOUNT.test(h1) && !namesCode) {
    add(`/${slug}`, `title says "discount code" but the h1 does not: "${h1.trim().slice(0, 60)}"`);
  }
}

// ── 3. A page stating an offer amount should name the code that earns on it ──
// Scoped to the brand the page is FOR, taken from its DEALS href. A page that
// merely cross-links a sibling brand is not this page's problem.
for (const slug of slugDirs) {
  if (new RegExp(`source: '/${slug}'`).test(redirects)) continue;
  const src = read(join("src/app", slug, "page.tsx")) + read(join("src/app", slug, "config.ts"));
  if (!src) continue;
  const body = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

  const deal = offers.match(new RegExp(`\\{[^}]*href: "/${slug}"[^}]*\\}`));
  if (!deal) continue;
  const code = (deal[0].match(/code: "([A-Z0-9]+)"/) || [, ""])[1];
  if (!code || body.includes(code)) continue;
  if (/no code (?:required|needed|to type)|, no code"/i.test(body)) {
    add(`/${slug}`, `its own offer uses code ${code}, but the page says no code is needed`);
  }
}

// ── 3b. A title may not promise a discount that does not exist ──────────────
// Twenty-seven pages were titled "<Brand> Discount Code 2026" while offering a
// free trial, a free plan or nothing. That is a representation about the
// existence of a price benefit, which ACL s29(1) covers, and at that scale it is
// also the coupon-page pattern Google's helpful-content system targets.
// /krispcall was the clearest case: its own FAQ said "we don't publish a promo
// code" directly beneath a title promising one.
const REAL_DISCOUNT = /\d+\s*%\s*off|\$\d[\d,]*\s*off|off your first|months? free|US\$\d for a/i;
for (const slug of slugDirs) {
  if (new RegExp(`source: '/${slug}'`).test(redirects)) continue;
  if (!existsSync(join("src/app", slug, "config.ts"))) continue; // hubs are not brand pages
  const title = SEO.get(`/${slug}`) || "";
  if (!/discount code/i.test(title)) continue;
  const src = read(join("src/app", slug, "config.ts")) + read(join("src/app", slug, "page.tsx"));
  const offer = (src.match(/^\s*offer:\s*"([^"]+)"/m) || [, ""])[1];
  const dealRow = offers.match(new RegExp(`\\{[^}]*href: "/${slug}"[^}]*\\}`));
  const dealOffer = dealRow ? (dealRow[0].match(/offer: "([^"]+)"/) || [, ""])[1] : "";
  const asksRatherThanClaims = /\bis there (one|a)\b|\?/i.test(title);
  if (!REAL_DISCOUNT.test(offer) && !REAL_DISCOUNT.test(dealOffer) && !REAL_DISCOUNT.test(title) && !asksRatherThanClaims) {
    add(`/${slug}`, `title asserts a discount code but none exists (offer: "${offer || "none"}"). Either name the real offer or pose it as a question the page answers.`);
  }
  // A question-form title must actually be answered on the page.
  if (asksRatherThanClaims && !/q(?:uestion)?:\s*"[^"]*discount code[^"]*"/i.test(src)) {
    add(`/${slug}`, "title asks whether a discount code exists but no FAQ on the page answers it");
  }
}

// ── 4. Duplicate titles or descriptions across seoConfig ─────────────────────
for (const [label, re] of [["title", /title: "(.*?)"/g], ["description", /description:\s*\n?\s*"([\s\S]*?)",\n/g]]) {
  const seen = new Map();
  for (const m of seo.matchAll(re)) {
    const v = m[1].replace(/\s+/g, " ").trim();
    if (!v) continue;
    seen.set(v, (seen.get(v) || 0) + 1);
  }
  for (const [v, n] of seen) if (n > 1) add("src/lib/seo.ts", `duplicate ${label} x${n}: "${v.slice(0, 70)}"`);
}

// ── report ───────────────────────────────────────────────────────────────────
const seenMsg = new Set();
const unique = problems.filter((p) => {
  const k = p.file + "|" + p.msg;
  if (seenMsg.has(k)) return false;
  seenMsg.add(k);
  return true;
});

if (!unique.length) {
  console.log("  AEO invariants hold: answer slot clear, titles and h1s agree, codes named, no duplicates.");
} else {
  console.error(`  ${unique.length} AEO problem(s):\n`);
  for (const p of unique) console.error(`  ${p.file}\n     ${p.msg}\n`);
}
/**
 * Exits NON-ZERO on a finding, as of 5 Sep 2026.
 *
 * This script printed its findings and then exited 0, every time, since it was
 * written. It was reporting /databox's title problem from the moment that page
 * was built and nothing stopped, because nothing could: a check that always
 * succeeds is a log line. It was also run by hand rather than by the build,
 * so the log line was only seen when someone chose to look.
 *
 * Both halves of that are now fixed: this runs in `postbuild` and it fails.
 */
process.exit(unique.length ? 1 : 0);
