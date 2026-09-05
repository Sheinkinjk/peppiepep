#!/usr/bin/env node
/**
 * Nothing renders between the h1 and the lead paragraph, and the lead is the
 * answer rather than the disclosure.
 *
 * CLAUDE.md records this fault as fixed in August 2026: "Twelve pages had
 * metadata sitting in that slot and it was fixed for exactly this reason." It
 * came back twice, which means nothing was watching it.
 *
 *   HairLossGuide and ApolloGuide rendered <EditorialMeta> between the h1 and
 *   the lead, putting "How we compare - How we make money" in the answer slot on
 *   8 pages. Two shared components, so one edit each reintroduced it everywhere.
 *
 *   Then I did it myself on 34 pages, inserting the affiliate disclosure
 *   directly after </h1> while fixing disclosure placement. The answer-first
 *   metric did not see it because that metric strips the disclosure text before
 *   measuring, so the check and the fault shared a blind spot.
 *
 * WHY THE SLOT MATTERS. It is the span an answer engine lifts and the snippet
 * Google builds. Whatever sits there is what gets quoted as the page's answer.
 * A verification stamp, a byline strip or a commission notice quoted as the
 * answer to "how much does X cost" is worse than no citation.
 *
 * TWO RULES, because the second is the one that regressed:
 *   1. Nothing but whitespace or a HEADING between </h1> and the lead.
 *   2. The lead itself is not the disclosure, the date stamp or the breadcrumb.
 *
 * A heading is allowed on purpose, and the first version of this check was wrong
 * to flag it. /best-pet-insurance-australia runs "What is the best pet insurance
 * in Australia?" as an h2 and answers it underneath, which is the pattern we
 * want, not a fault. What may not sit there is furniture: a stamp, a strip, a
 * breadcrumb, a commission notice.
 *
 * Legal pages are exempt from the date rule. A terms or privacy document leading
 * with "Last updated" is correct; that IS the reader's first question.
 *
 * Runs on built HTML, because both regressions came from shared components and
 * only the output shows what a given page actually renders.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILT = ".next/server/app";
const APP = "src/app";
/** Legal documents where a date legitimately leads. */
const LEGAL = new Set(["/terms", "/privacy", "/disclaimer"]);

/** Text that must never be the first thing after the h1. */
const NOT_AN_ANSWER = [
  { re: /Refer Labs may earn|affiliate links?\b|earn a commission|commercial arrangement/i, what: "the affiliate disclosure" },
  { re: /^\s*Last (?:checked|updated)/i, what: "the last-updated stamp" },
  { re: /How we compare|How we make money|Independent guide/i, what: "the editorial meta strip" },
  { re: /^\s*(?:Home|Refer Labs)\s*\/\s*/i, what: "the breadcrumb" },
];

function pages(dir = BUILT, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) pages(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const text = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

if (!existsSync(BUILT)) {
  console.log("  No build output to check. Run after next build.");
  process.exit(0);
}

/** Built, but 308ed away: their markup is never served. */
const REDIRECTED = new Set(
  (readFileSync("next.config.ts", "utf8").match(/source:\s*'([^']+)'/g) ?? []).map((m) =>
    m.replace(/source:\s*'/, "").replace(/'$/, ""),
  ),
);

const errors = [];
let checked = 0;
for (const file of pages()) {
  const route = ("/" + file.slice(BUILT.length + 1).replace(/\.html$/, "").replace(/^index$/, "")).replace(/\/$/, "") || "/";
  // Only pages that are actually served. The retired lending cluster is still
  // built but 308s, so its markup is not what any reader or engine sees.
  if (!existsSync(join(APP, route === "/" ? "" : route.slice(1), "page.tsx"))) continue;
  if (REDIRECTED.has(route)) continue;
  const html = readFileSync(file, "utf8");
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!main) continue;
  const seg = main[1];
  const h1 = /<\/h1>/.exec(seg);
  if (!h1) continue;
  checked++;
  const after = seg.slice(h1.index + h1[0].length);

  // 1. only whitespace or a heading may sit between the h1 and the lead
  const lead = /<p\b[\s\S]*?<\/p>/.exec(after);
  if (!lead) continue; // a page with no prose lead is a different shape, not this fault
  const between = after.slice(0, lead.index).replace(/<h[2-4]\b[\s\S]*?<\/h[2-4]>/g, " ");
  const strayText = text(between);
  if (strayText) {
    errors.push(`${route}: "${strayText.slice(0, 90)}" renders between the h1 and the lead.`);
    continue;
  }

  // 2. the lead paragraph itself is the answer, not furniture.
  //    Scoped to the FIRST paragraph only: an earlier version read a 900-character
  //    window that ran past the lead into whatever followed, and reported pages
  //    whose lead was correct.
  //    And only its OPENING. A lead that answers the question and then closes
  //    with "some links earn a commission" is doing both jobs correctly; /about
  //    and /business-software were both reported for that. The fault is a lead
  //    that BEGINS as furniture, so only the first clause is tested.
  const leadText = text(lead[0]).slice(0, 110);
  for (const { re, what } of NOT_AN_ANSWER) {
    if (what === "the last-updated stamp" && LEGAL.has(route)) continue;
    if (re.test(leadText)) {
      errors.push(`${route}: the first paragraph after the h1 is ${what}, not the answer.`);
      break;
    }
  }
}

if (errors.length) {
  console.error("\n  Something other than the answer is in the answer slot:\n");
  for (const e of errors) console.error(`   - ${e}`);
  console.error(
    "\n  The first thing after the h1 is what an engine quotes as the page's answer.\n" +
      "  Move stamps, meta strips and disclosures below the lead paragraph.\n",
  );
  process.exit(1);
}
console.log(`\n  Answer slot clear on ${checked} pages: the lead follows the h1 with nothing between.\n`);
