#!/usr/bin/env node
/**
 * Two guards on partner placement, both written after the fault they catch was
 * found by hand on a live page.
 *
 *  1. DISCLOSURE CONTRADICTION. /mens-health/sexual-wellness-products carried a
 *     Midoc commission link while its ComingSoonNote still read "nothing here
 *     earns us a commission before then". The note takes its wording from a
 *     category map, so adding a link to a page never updates it. A page that
 *     earns must never claim it does not.
 *
 *  2. PARTNER SCOPE. Midoc, Edible Beauty, Aussie Health and the Foreo link
 *     belong to two coming-soon hubs. Hair loss and weight loss are partnered
 *     with Mosh and Moshy, who generate the revenue, and a competing partner
 *     must not appear there. Verifying that by hand across 172 pages does not
 *     survive contact with a second month of partner onboarding.
 *
 * Static analysis of source, so it runs before a push and needs no build.
 * Adding a partner means adding a PARTNERS entry; widening where one may appear
 * means editing its `allow` list, deliberately, in this file.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const APP = "src/app";
const errors = [];

/** Partner tokens, and the ONLY route prefixes each may appear under. */
const PARTNERS = [
  { name: "Midoc",          tokens: ["midoc", "Midoc"],                allow: ["/mens-health", "/midoc", "/coming-soon"] },
  { name: "Edible Beauty",  tokens: ["edible-beauty", "ediblebeauty"], allow: ["/skin-and-beauty", "/coming-soon"] },
  { name: "Aussie Health",  tokens: ["aussie-health", "aussiehealthproducts"], allow: ["/skin-and-beauty", "/coming-soon"] },
  { name: "Foreo",          tokens: ["foreo-", "t/60709"],             allow: ["/skin-and-beauty", "/coming-soon"] },
];

/** Wording that asserts the page earns nothing. Must never sit beside a link. */
const EARNS_NOTHING = /nothing (?:here|on this page) (?:earns us a commission|pays us)/i;

function pages(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) pages(p, acc);
    else if (e.name === "page.tsx") acc.push(p);
  }
  return acc;
}

const routeOf = (file) => {
  const r = "/" + file.slice(APP.length + 1).replace(/\/page\.tsx$/, "");
  return r === "/." ? "/" : r;
};

// ── The component source is needed to know which variants earn ───────────────
const noteSrc = existsSync("src/components/consumer/ComingSoonNote.tsx")
  ? readFileSync("src/components/consumer/ComingSoonNote.tsx", "utf8")
  : "";
// Variants whose body does NOT claim we earn nothing.
const PARTNERED_VARIANTS = new Set(["partnered"]);
// category -> variant, parsed from BY_CATEGORY so the check cannot drift from it.
const byCategory = new Map();
for (const m of noteSrc.matchAll(/^\s*"?([^":\n]+?)"?:\s*"(a|b|c|d|partnered)",/gm)) {
  byCategory.set(m[1].trim(), m[2]);
}

for (const file of pages(APP)) {
  const route = routeOf(file);
  if (route.includes("[")) continue;
  const src = readFileSync(file, "utf8");

  // ── 1. a page that earns must not render unpartnered coming-soon wording ──
  const hasPartnerLink = /href:\s*"\/go\/|href="\/go\/|t\.cfjump\.com/.test(src);
  if (hasPartnerLink && /<ComingSoonNote/.test(src)) {
    const call = src.match(/<ComingSoonNote[\s\S]{0,300}?\/>/)?.[0] ?? "";
    const explicit = call.match(/variant="([a-z]+)"/)?.[1];
    const category = call.match(/category="([^"]+)"/)?.[1];
    const variant = explicit ?? byCategory.get(category ?? "") ?? "a";
    if (!PARTNERED_VARIANTS.has(variant)) {
      errors.push(
        `${route}: carries a partner link but renders ComingSoonNote variant "${variant}", ` +
        `whose wording says the page earns nothing. Pass variant="partnered" or map ` +
        `category "${category}" to it in ComingSoonNote.tsx.`,
      );
    }
  }
  // Belt and braces: the literal claim, beside a link, whatever produced it.
  if (hasPartnerLink && EARNS_NOTHING.test(src)) {
    errors.push(`${route}: carries a partner link and also states it earns nothing.`);
  }

  // ── 2. partner tokens may only appear under an allowlisted prefix ─────────
  for (const p of PARTNERS) {
    // An index page has to be able to LINK to a partner page whose own slug
    // carries the brand: /guides names "/skin-and-beauty/foreo-luna-vs-ufo",
    // and so do sitemap, search and the hubs. Those are internal hrefs into
    // allowlisted territory with no affiliate link attached, so they are
    // stripped before matching. A /go/<partner> slug or a cfjump URL is not
    // stripped, which is the thing the guard is actually for.
    const scoped = p.allow.reduce(
      (acc, a) => acc.split(new RegExp(`"${a}/[^"]*"`, "g")).join('""'),
      src,
    );
    if (!p.tokens.some((t) => scoped.includes(t))) continue;
    if (p.allow.some((a) => route === a || route.startsWith(a + "/"))) continue;
    errors.push(
      `${route}: references partner "${p.name}", which is scoped to ${p.allow.join(", ")}. ` +
      `Hair loss and weight loss are partnered elsewhere. Widen the allow list in ` +
      `scripts/check-partner-scope.mjs only if that is deliberate.`,
    );
  }
}

if (errors.length) {
  console.error("\n  Partner scope/disclosure check FAILED:\n");
  for (const e of errors) console.error(`   - ${e}`);
  console.error("");
  process.exit(1);
}
console.log(`\n  Partner scope holds: no page earns while claiming otherwise, no partner outside its hub.\n`);
