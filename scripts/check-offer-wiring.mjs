#!/usr/bin/env node
/**
 * Checks that every brand page is wired into all the places an offer has to
 * reach, and reports what is missing.
 *
 * This exists because the failure is silent and has already cost real revenue:
 * Knose and PetsOnMe were both live for months without ever appearing on
 * /deals, so nobody browsing the offers hub could find them. Nothing errors, no
 * build fails, the page just quietly earns less than it should.
 *
 * Steps 5 to 8 of the onboarding standard in CLAUDE.md are the ones that get
 * skipped, so they are the ones this checks hardest.
 *
 *   node scripts/check-offer-wiring.mjs            # every brand page
 *   node scripts/check-offer-wiring.mjs superfiliate brevo
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

const seo         = read("src/lib/seo.ts");
const sitemap     = read("src/app/sitemap.ts");
const searchIndex = read("src/lib/search-index.ts");
const guides      = read("src/app/guides/page.tsx");
const offers      = read("src/lib/offers.ts");
const llms        = read("public/llms.txt");
const links       = read("src/lib/affiliate-links.ts");
const redirects   = read("next.config.ts");

// Retired pages redirect and are deliberately absent from the sitemap and index.
const isRetired = (slug) => new RegExp(`source: '/${slug}'`).test(redirects);

// A page only needs a DEALS entry and an llms.txt offer line if it HAS an offer.
const hasOffer = (cfg) => /^\s*offer:\s*"[^"]+"/m.test(cfg);
const offerText = (cfg) => (cfg.match(/^\s*offer:\s*"([^"]+)"/m) || [, ""])[1];

// A discount is a real monetary saving, not a trial everyone already gets.
const isRealDiscount = (t) =>
  /\d+\s*%\s*off|\$\d[\d,]*\s*off|off your first (order|month)|months? free|US\$\d for a/i.test(t);

const slugs = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync("src/app", { withFileTypes: true })
      .filter((d) => d.isDirectory() && existsSync(join("src/app", d.name, "config.ts")))
      .map((d) => d.name);

let problems = 0;
const rows = [];

for (const slug of slugs) {
  const cfg = read(join("src/app", slug, "config.ts"));
  if (!cfg) continue;
  if (isRetired(slug)) continue;
  const miss = [];

  if (!new RegExp(`\`\\$\\{SITE_URL\\}/${slug}\``).test(seo)) miss.push("seoConfig");
  if (!new RegExp(`\`\\$\\{BASE\\}/${slug}\``).test(sitemap)) miss.push("sitemap");
  if (!new RegExp(`href: "/${slug}"`).test(searchIndex)) miss.push("search-index");
  if (!new RegExp(`href: "/${slug}"`).test(guides)) miss.push("/guides");

  if (hasOffer(cfg)) {
    const text = offerText(cfg);
    // Only a genuine monetary discount belongs on /deals. A free trial anyone can
    // start direct from the vendor is not a deal, and listing them all would bury
    // the offers that actually differentiate us.
    if (isRealDiscount(text)) {
      if (!new RegExp(`href: "/${slug}"`).test(offers)) miss.push("offers.ts (so it never reaches /deals)");
      // A real discount should be visible in the SERP title, which is the pattern
      // /moshy and /moshhair use and the reason they convert.
      const entry = seo.match(new RegExp(`\\{[^}]*?\`\\$\\{SITE_URL\\}/${slug}\`[\\s\\S]*?\\n  \\},`));
      const title = entry ? (entry[0].match(/title: "(.*?)"/) || [, ""])[1] : "";
      if (title && !/\d+\s*%|\$\d|US\$\d/.test(title)) miss.push("discount not in <title>");
      if (!llms.includes(`/${slug}`)) miss.push("llms.txt");
    }
  }

  // A tracked link that is not exported centrally cannot be swapped in one place.
  const constName = slug.replace(/-/g, "_").toUpperCase();
  if (!links.includes(constName) && /affiliateUrl/.test(cfg)) {
    const usesKnown = /affiliateUrl:\s*[A-Z_]+/.test(cfg);
    if (!usesKnown) miss.push("affiliate-links.ts constant");
  }

  if (miss.length) {
    problems++;
    rows.push([slug, offerText(cfg) || "(no offer)", miss.join(", ")]);
  }
}

if (!rows.length) {
  console.log(`  ${slugs.length} brand pages checked. All fully wired.`);
} else {
  console.log(`  ${slugs.length} checked, ${problems} with gaps:\n`);
  for (const [slug, offer, miss] of rows) {
    console.log(`  /${slug}`);
    console.log(`     offer:   ${offer.slice(0, 60)}`);
    console.log(`     missing: ${miss}\n`);
  }
}
process.exit(0);
