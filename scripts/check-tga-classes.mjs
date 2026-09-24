#!/usr/bin/env node
/**
 * No page we earn from may name a CLASS of prescription medicine.
 *
 * The rule everyone remembers is "do not name a medicine". That is only half of
 * it. The TGA's guidance on complying with the restrictions on advertising
 * prescription medicines to the public (tga.gov.au, read 4 September 2026) puts,
 * in one prohibited table alongside brand names and substances:
 *
 *   "Reference to a class of prescription medicines, including indirectly or
 *    using substitute terms"  medicinal cannabis / plant-based medicine,
 *    weight-loss injections, wrinkle reduction injections, peptides
 *
 * and its worked non-compliant example is a pharmacy saying its service means
 * "you can get the antibiotics you need without visiting a GP", failing because
 * it named a condition and presented the service as a way to obtain a class.
 *
 * Three real instances shipped before this check existed, all of them written by
 * someone who believed they were following the no-medicines rule:
 *
 *   /mens-health/online-prescription-australia priced an "antibiotic request"
 *   /midoc listed "COVID-19 antivirals" as a consultation line
 *   /health-and-beauty/anti-ageing said "cosmetic injectable treatments"
 *
 * WHAT IS STILL ALLOWED, and why this list is terms and not topics: the TGA's
 * own general guide is that promoting the CONDITIONS a service covers, without
 * referring to the goods, is unlikely to be advertising those goods. So
 * "COVID-19" is fine and "COVID-19 antivirals" is not; "acne" is fine and the
 * medicine class used for it is not. Fix a hit by naming the condition or the
 * service, not by finding a subtler synonym for the drug.
 *
 * Scoped to pages carrying a partner link, because those are advertisements. A
 * page with no commercial route can rely on the editorial exemption; a page with
 * a commission link cannot, which is the whole reason this site is stricter than
 * a news site would need to be.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILT = ".next/server/app";
const APP = "src/app";

/** Straight from the TGA's Table 1, plus the classes adjacent to what we cover. */
const CLASSES = [
  "antibiotics?",
  "antivirals?",
  "antifungals?",
  "peptides?",
  "cosmetic injectables?",
  "weight[- ]loss injections?",
  "wrinkle[- ]reduction injections?",
  "medicinal cannabis",
  "plant[- ]based medicines?",
  "GLP-?1",
  "erectile dysfunction medicines?",
  "hormone replacement therapy",
  "\\bHRT\\b",
  "opioids?",
  "benzodiazepines?",
  "botulinum",
  "dermal fillers?",
  "IV drip therap(?:y|ies)",
];
const PATTERN = new RegExp(`\\b(?:${CLASSES.join("|")})\\b`, "gi");

if (!existsSync(BUILT)) {
  console.log("  No build output to check. Run after next build.");
  process.exit(0);
}

/*
 * Which pages are advertisements is decided from the RENDERED html, not the
 * page source. Until 24 Sep 2026 this grepped page.tsx for `href="/go/`, so any
 * hub passing its partner link through a prop (HubProviders takes `visitHref`)
 * was invisible: /weight-loss, /hair-loss, /health-and-beauty and, once rebuilt
 * on that component, /mens-health all carried commission links and were never
 * checked. The count fell from 21 to 20 on the rebuild, which is how it was
 * noticed. A page is an advertisement if what it SERVES contains a partner link;
 * `rel="sponsored"` is included because /weight-loss and /hair-loss link their
 * partners directly rather than through /go/.
 */
const EARNING = /href="\/go\/|rel="[^"]*sponsored|t\.cfjump\.com/;
function earningRoutes(dir = BUILT, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) earningRoutes(p, acc);
    else if (e.name.endsWith(".html") && EARNING.test(readFileSync(p, "utf8"))) {
      const r = p.slice(BUILT.length).replace(/\.html$/, "");
      if (!r.includes("[")) acc.push(r === "/index" ? "/" : r);
    }
  }
  return acc;
}

const errors = [];
let checked = 0;
for (const route of earningRoutes()) {
  const file = join(BUILT, `${route === "/" ? "index" : route.replace(/^\//, "")}.html`);
  if (!existsSync(file)) continue;
  checked++;
  const html = readFileSync(file, "utf8");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!main) continue;
  const t = main[1]
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
  for (const m of t.matchAll(PATTERN)) {
    errors.push(
      `${route}: names the medicine class "${m[0]}" on a page that earns a commission.\n` +
        `       …${t.slice(Math.max(0, m.index - 100), m.index + m[0].length + 100).trim()}…`,
    );
  }
}

if (errors.length) {
  console.error("\n  Prescription-medicine CLASS named on an advertising page:\n");
  for (const e of errors) console.error(`   - ${e}`);
  console.error(
    "\n  The TGA treats a class reference, including a substitute term, the same as a\n" +
      "  brand name. Name the CONDITION or the SERVICE instead. Do not reach for a\n" +
      "  subtler synonym: that is the thing the word \"indirectly\" in the rule covers.\n",
  );
  process.exit(1);
}
console.log(`\n  TGA class check holds: no medicine class named across ${checked} advertising pages.\n`);
