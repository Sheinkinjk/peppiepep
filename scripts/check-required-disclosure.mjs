#!/usr/bin/env node
/**
 * A partner's required wording must appear on every page that carries its link.
 *
 * Some partners specify a disclosure sentence word-for-word as a condition of
 * the affiliate agreement. Ours we can phrase freely; theirs we cannot, and a
 * paraphrase that means the same thing still breaches the agreement.
 *
 * The requirement follows the LINK, not the page, and that is exactly how it
 * was missed. On 16 Sep 2026 a provider comparison put a Juniper link on
 * /weight-loss carrying only our own generic earnings line. /juniper had the
 * required sentence and was untouched, so nothing looked broken: the page that
 * held the sentence was not the page that gained the link. Reviewing the diff
 * would not have caught it either, because the sentence's absence is invisible
 * unless you already know the link's arrival demands it.
 *
 * So this reads what actually shipped. For every entry in REQUIRED_DISCLOSURES,
 * it finds each built page whose HTML contains the destination URL and asserts
 * the exact sentence is present in that same page.
 *
 * Runs in postbuild, against .next/server/app, for the same reason the other
 * guards do: a claim about what a page says is settled by the rendered HTML,
 * never by the source that was meant to produce it.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILT = ".next/server/app";
const REGISTRY = "src/lib/partner-disclosures.ts";

if (!existsSync(BUILT)) {
  console.error(`\n  ${BUILT} is missing. Run this after a build.\n`);
  process.exit(1);
}

/**
 * The registry is TypeScript, so read the literal rather than importing it.
 * `url` is a constant reference (JUNIPER_URL), so resolve that from
 * affiliate-links.ts rather than expecting a string here.
 */
function registry() {
  const src = readFileSync(REGISTRY, "utf8");
  const links = readFileSync("src/lib/affiliate-links.ts", "utf8");
  const out = [];
  for (const block of src.split(/\{\s*\n\s*partner:/).slice(1)) {
    const partner = (block.match(/^\s*"(.*?)"/) || [, ""])[1];
    const urlRef = (block.match(/\n\s*url:\s*([A-Za-z0-9_]+)\s*,/) || [, ""])[1];
    const text = (block.match(/\n\s*text:\s*\n?\s*"([\s\S]*?)",\s*\n/) || [, ""])[1];
    if (!partner || !urlRef || !text) continue;
    const url = (links.match(new RegExp(`${urlRef}\\s*=\\s*\\n?\\s*"(.*?)"`)) || [, ""])[1];
    if (!url) {
      console.error(`\n  Could not resolve ${urlRef} in affiliate-links.ts for ${partner}.\n`);
      process.exit(1);
    }
    out.push({ partner, url, text });
  }
  return out;
}

function htmlFiles(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) htmlFiles(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}

const entries = registry();
if (entries.length === 0) {
  console.log("\n  No partner requires its own wording. Nothing to check.\n");
  process.exit(0);
}

const files = htmlFiles(BUILT);
const failures = [];
let carrying = 0;

for (const { partner, url, text } of entries) {
  // Next escapes & as &amp; in rendered href attributes.
  const needles = [url, url.replace(/&/g, "&amp;")];
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    if (!needles.some((n) => html.includes(n))) continue;
    carrying++;
    // The sentence renders as text, where an apostrophe may be escaped too.
    const present = html.includes(text) || html.includes(text.replace(/'/g, "&#x27;"));
    if (!present) {
      failures.push({ partner, route: "/" + file.slice(BUILT.length + 1).replace(/\.html$/, "") });
    }
  }
}

if (failures.length > 0) {
  console.error(`\n  ${failures.length} page(s) carry a partner link without the wording that partner requires:\n`);
  for (const f of failures) {
    const e = entries.find((x) => x.partner === f.partner);
    console.error(`   ${f.route}  links to ${f.partner} but does not print:`);
    console.error(`     "${e.text}"`);
  }
  console.error(`\n  Print it verbatim beside the link, or remove the link. Do not paraphrase.\n`);
  process.exit(1);
}

console.log(
  `\n  Required partner wording holds: ${carrying} page(s) carrying a link that demands it print it verbatim.\n`,
);
