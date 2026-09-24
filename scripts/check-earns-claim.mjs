#!/usr/bin/env node
/**
 * No rendered page may carry a partner link and also tell the reader it earns
 * nothing.
 *
 * scripts/check-partner-scope.mjs already checks this, but against each page's own
 * SOURCE, so it only ever sees a claim typed into that file. The sentence a reader
 * actually gets comes from a shared component, ComingSoonNote, and a category map
 * decides which wording it prints, so no page file contains the sentence at all.
 *
 * On 24 Sep 2026 two live pages carried a paid link directly beneath "nothing on
 * this page earns us a commission", while that script reported "no page earns while
 * claiming otherwise" on the same run:
 *   /longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia  (i-screen)
 *   /sleep/mattress-comparison-australia                             (Emma Sleep)
 * Both had been true when written and went false when a partner landed in the
 * section, which is the failure shape CLAUDE.md describes: a sentence asserting a
 * commercial state, stored as prose, maintained by nobody.
 *
 * This runs in POSTBUILD because it reads build output. Put it in prebuild and it
 * reads the previous build: it will fail on a fault already fixed and pass one just
 * introduced. That mistake was made and corrected on the same day.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".next/server/app";

/** Kept in step with EARNS_NOTHING in scripts/check-partner-scope.mjs. */
const EARNS_NOTHING =
  /nothing (?:here|on this page|in this (?:section|category|hub))(?:,? (?:currently|yet))? (?:earns us (?:a )?commission|pays us)|\bwe earn nothing (?:here|from this section)\b/i;

const EARNS_LINK = /href="\/go\/|rel="[^"]*sponsored/;

if (!existsSync(ROOT)) {
  console.log("\n  No build output to check. Run after next build.\n");
  process.exit(0);
}

const bad = [];
let checked = 0;

const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    if (!entry.name.endsWith(".html")) continue;
    const raw = readFileSync(full, "utf8");
    if (!EARNS_LINK.test(raw)) continue;
    checked++;
    const text = raw
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/g, " ")
      .replace(/\s+/g, " ");
    const m = text.match(EARNS_NOTHING);
    if (m) {
      const route = full.slice(ROOT.length).replace(/\.html$/, "") || "/";
      bad.push({ route, quote: m[0] });
    }
  }
};
walk(ROOT);

if (bad.length) {
  console.error(`\n  Pages that earn while telling the reader they do not: ${bad.length}\n`);
  for (const b of bad) console.error(`   - ${b.route}\n       says: "${b.quote}"`);
  console.error(
    "\n  Fix the wording, not this check. If the section now has a partner, move its\n" +
      "  ComingSoonNote category onto a variant that does not promise otherwise.\n",
  );
  process.exit(1);
}

console.log(`\n  Earnings claims agree with the links on all ${checked} earning page(s).\n`);
