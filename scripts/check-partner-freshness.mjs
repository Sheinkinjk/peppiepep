#!/usr/bin/env node
/**
 * Re-verification cadence for the partner data files in src/lib/partners/.
 *
 * Those files exist so a price lives in one place. That prevents a price being
 * wrong in six places at once; it does nothing about the price being wrong in
 * one place, which is what happens when nobody re-reads the vendor's site. A
 * single stale figure on the most-read part of a brand page is the failure the
 * file was built to prevent, and the file cannot detect it on its own.
 *
 * So the date has to nag. Every partner file exports a `readOn` (ISO) naming
 * the day its figures were read off the vendor's own site:
 *
 *   under 45 days   silent
 *   45 to 90 days   warns on every build, and says which pages depend on it
 *   over 90 days    fails the build
 *
 * The escalation matters. A warning that never becomes an error is a warning
 * everyone learns to scroll past, and a hard failure from day one would block
 * an unrelated deploy over a date, which is how a check gets deleted rather
 * than obeyed. Ninety days is the point at which we would not defend the number
 * to a reader.
 *
 * TO CLEAR IT: open the `source` URL, read the figures off the page, correct any
 * that moved, then set `readOn` to today. Bumping `readOn` without re-reading
 * makes the date a lie, and the date is the claim the pages print.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/lib/partners";
const WARN_DAYS = 45;
const FAIL_DAYS = 90;

if (!existsSync(DIR)) process.exit(0);

const today = new Date();
const days = (iso) => Math.floor((today - new Date(iso)) / 86_400_000);

/** Which pages read a given partner file, so the warning names the blast radius. */
function dependents(moduleName, dir = "src", acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) dependents(moduleName, p, acc);
    else if (/\.tsx?$/.test(e.name) && readFileSync(p, "utf8").includes(`partners/${moduleName}`)) acc.push(p);
  }
  return acc;
}

let failed = false;
for (const file of readdirSync(DIR).filter((f) => f.endsWith(".ts"))) {
  const name = file.replace(/\.ts$/, "");
  const src = readFileSync(join(DIR, file), "utf8");
  const readOn = src.match(/readOn:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (!readOn) {
    console.error(`\n  ${DIR}/${file} has no readOn date. Every partner file must carry one.\n`);
    failed = true;
    continue;
  }
  const age = days(readOn);
  if (age < WARN_DAYS) continue;

  const source = src.match(/source:\s*"([^"]+)"/)?.[1];
  if (!source) {
    console.error(`\n  ${DIR}/${file} has no source URL. A readOn date with nothing to re-read is not a check.\n`);
    failed = true;
    continue;
  }
  const users = dependents(name).filter((f) => !f.startsWith(DIR));
  const lines = [
    `${DIR}/${file} was last read on ${readOn}, ${age} days ago.`,
    `  ${users.length} file(s) print figures from it: ${users.slice(0, 6).join(", ")}${users.length > 6 ? ", …" : ""}`,
    `  Re-read ${source}, correct anything that moved, then set readOn to today.`,
  ];
  if (age >= FAIL_DAYS) {
    console.error(`\n  Partner data is too old to publish:\n   - ${lines.join("\n     ")}\n`);
    failed = true;
  } else {
    console.warn(`\n  Partner data is going stale:\n   - ${lines.join("\n     ")}\n`);
  }
}

if (failed) process.exit(1);
