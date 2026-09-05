#!/usr/bin/env node
/**
 * The commercial relationship must be disclosed BEFORE the first affiliate link,
 * not underneath it.
 *
 * Two regulators, one fix. Ahpra's Guidelines for advertising a regulated health
 * service (read 4 September 2026) confirm that "anyone (person, business or
 * corporate entity) who advertises a regulated health service is considered an
 * advertiser", registered practitioner or not, so this site is an advertiser
 * whenever it promotes a telehealth partner. Section 133 has no standalone
 * disclosure rule, but s133(1)(a) catches advertising that "provides partial
 * information and/or omits important details", and a page presenting itself as
 * an independent comparison while being paid omits the most important detail
 * there is. The ACCC's position on affiliate disclosure points the same way and
 * is the more demanding of the two.
 *
 * Ahpra's test for where such information must sit, given for terms and
 * conditions, is that it be "easily found and accessible" and that "the public
 * should not be required to exhaustively search". Below the button fails that,
 * because the reader who clicks never reaches it.
 *
 * So: disclosure above the first affiliate link, on every page that has one.
 * The full disclosure block below the links stays; this checks the one above.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILT = ".next/server/app";
const APP = "src/app";
/**
 * Must match the canonical wording in AffiliateDisclosure, which deliberately
 * says "Refer Labs may earn" and not "we may earn": first person is
 * unattributable once a sentence is lifted out of the page. An earlier version
 * of this pattern required the word "we" and so failed to see the very component
 * that fixes the fault.
 */
const DISCLOSURE =
  /commercial arrangement|affiliate links?\b|(?:we|Refer Labs) (?:may )?earn a commission|paid partnership|how we make money/i;
const FIRST_LINK = /<a[^>]+(?:rel="[^"]*sponsored|href="\/go\/)/;

if (!existsSync(BUILT)) {
  console.log("  No build output to check. Run after next build.");
  process.exit(0);
}

function earningRoutes(dir = APP, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) earningRoutes(p, acc);
    else if (e.name === "page.tsx") {
      const src = readFileSync(p, "utf8");
      // Widened 5 Sep 2026 from /go/ pages to EVERY page carrying an affiliate
      // link. The narrow version passed while 82 pages put the disclosure under
      // the button, because it only ever looked at the 18 newest.
      if (/href:\s*"\/go\/|href="\/go\/|t\.cfjump\.com|rel="nofollow sponsored"|AffiliateDisclosure|PremiumAffiliateLanding/.test(src)) {
        const r = "/" + dir.slice(APP.length + 1);
        if (!r.includes("[")) acc.push(r === "/" ? "/index" : r);
      }
    }
  }
  return acc;
}

const errors = [];
let checked = 0;
for (const route of earningRoutes()) {
  const file = join(BUILT, `${route.replace(/^\//, "")}.html`);
  if (!existsSync(file)) continue;
  const main = readFileSync(file, "utf8").match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!main) continue;
  const link = FIRST_LINK.exec(main[1]);
  // A page may import the disclosure component without rendering a link (a hub
  // that only describes partners). Nothing to order, so nothing to check.
  if (!link) continue;
  checked++;
  const above = main[1].slice(0, link.index).replace(/<[^>]+>/g, " ");
  if (!DISCLOSURE.test(above)) {
    errors.push(
      `${route}: the first affiliate link has no disclosure of the commercial relationship above it.`,
    );
  }
}

if (errors.length) {
  console.error("\n  Affiliate link reached before any disclosure:\n");
  for (const e of errors) console.error(`   - ${e}`);
  console.error(
    "\n  Say we are paid before the reader can click, not after. A line in the\n" +
      "  PartnerRoute intro is enough; the block underneath is not.\n",
  );
  process.exit(1);
}
console.log(`\n  Disclosure order holds: paid relationship stated above the first link on ${checked} pages.\n`);
