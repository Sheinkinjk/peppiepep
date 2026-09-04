#!/usr/bin/env node
/**
 * Every price on a page we earn from must carry the date it was read.
 *
 * Runs on the BUILT html rather than on source, because that is the only place
 * the question can actually be answered: a page assembles its prices from a data
 * file, a table, a FAQ array and prose, and whether a figure ends up near its
 * date is a property of the output, not of any one source file.
 *
 * WHY IT IS A RULE AND NOT A PREFERENCE. An undated price is a representation
 * about what something costs today. When it goes stale it becomes a misleading
 * representation about price under ACL s29(1)(i), and the fact it was true when
 * written is not a defence. It also makes the figure useless to an answer
 * engine, which will quote the number and strand it in an answer with no way for
 * a reader to tell how old it is.
 *
 * Scoped to pages carrying a partner link, because those are advertisements.
 * A page with no commercial route is not making a price representation for gain,
 * and widening this check to the whole site would fire on legacy pages nobody is
 * being paid for.
 *
 * A figure passes if a date appears within WINDOW characters of it in the
 * rendered text. Tables are the case that motivated the window: a caption at the
 * top of a long table is too far from the bottom row, which is why the price
 * column header on those tables carries the date as well.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BUILT = ".next/server/app";
const APP = "src/app";
const WINDOW = 400;
const DATE = /\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* 20\d\d|\b(?:January|February|March|April|May|June|July|August|September|October|November|December) 20\d\d/;
const PRICE = /A?\$\s?\d[\d,]*/g;
const ILLUSTRATIVE = /illustrative|worked example|Product A|placeholder/i;

if (!existsSync(BUILT)) {
  console.log("  No build output to check. Run after next build.");
  process.exit(0);
}

/** Routes whose source carries a partner link: those are the advertisements. */
function earningRoutes(dir = APP, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) earningRoutes(p, acc);
    else if (e.name === "page.tsx") {
      const src = readFileSync(p, "utf8");
      if (/href:\s*"\/go\/|href="\/go\/|t\.cfjump\.com/.test(src)) {
        const r = "/" + dir.slice(APP.length + 1);
        if (!r.includes("[")) acc.push(r === "/" ? "/index" : r);
      }
    }
  }
  return acc;
}

/**
 * Only the <main> region counts.
 *
 * The header mega-menu repeats an offer amount on all 300 pages and the <title>
 * appears in extracted text; neither is a price representation made by the page
 * about its own subject, and flagging them would train everyone to ignore this.
 */
function text(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  const body = (main ? main[1] : html).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  return body
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
}

const errors = [];
for (const route of earningRoutes()) {
  const file = join(BUILT, `${route.replace(/^\//, "")}.html`);
  if (!existsSync(file)) continue;
  const body = text(readFileSync(file, "utf8"));

  const undated = [...body.matchAll(PRICE)].filter((m) => {
    const window = body.slice(Math.max(0, m.index - WINDOW), m.index + m[0].length + WINDOW);
    if (DATE.test(window)) return false;
    // A figure declared as a worked example is not a claim about what anything
    // costs, so it needs no read date. /best-value-skincare uses Product A and
    // Product B precisely to avoid inventing prices, and dating those numbers
    // would assert they were read off something.
    if (ILLUSTRATIVE.test(window)) return false;
    return true;
  });
  if (undated.length) {
    errors.push(
      `${route}: ${undated.length} price(s) with no date within ${WINDOW} characters.\n` +
        undated
          .slice(0, 4)
          .map((m) => `       ${m[0]} in "…${body.slice(Math.max(0, m.index - 70), m.index + 70).trim()}…"`)
          .join("\n"),
    );
  }
}

if (errors.length) {
  console.error("\n  Undated prices on pages that earn a commission:\n");
  for (const e of errors) console.error(`   - ${e}`);
  console.error(
    "\n  Put the read date beside the figure. For a table, the price column header\n" +
      "  carries it so a single lifted row is still dated.\n",
  );
  process.exit(1);
}
console.log(`\n  Price provenance holds: every price on an earning page carries a read date.\n`);
