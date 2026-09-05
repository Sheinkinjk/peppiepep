#!/usr/bin/env node
/**
 * After deploying, poll the LIVE URL of every route the commit touched and
 * assert the status the repo says it should return.
 *
 * WHY. On 5 September 2026 /databox shipped with a commit message saying its
 * redirect had been removed. The removal never ran: the script doing it aborted
 * on an unrelated assertion earlier in the same block, that step was fixed
 * separately, and the redirect step was never redone. The page was built,
 * wired, in the sitemap, and unreachable. The build passed. Every guard passed.
 * Polling the served URL is what caught it.
 *
 * The same day, a path added to the GONE list kept returning 308 because a
 * next.config catch-all answered first. Also caught by the served status, not
 * by the source.
 *
 * A commit message is not evidence. A green build is not evidence. The status
 * code the origin returns is evidence.
 *
 * AND NEITHER IS A PRINTED URL. `vercel deploy` prints a Production URL before
 * the build runs, so it prints one whether the build succeeds or fails. Every
 * CLI deploy for a week returned a URL and the status Error, while the Git
 * integration built the same commits independently and served production
 * healthily. A working pipeline masked a broken one and the site looked fine
 * throughout. So this script checks the DEPLOYMENT first and the routes second,
 * and it reports the deployment status even when the commit touched no page.
 *
 * USAGE
 *   npm run verify:deploy              routes touched in the last commit
 *   npm run verify:deploy -- HEAD~3    routes touched since that ref
 *   npm run verify:deploy -- /a /b     those routes explicitly
 *
 * EXPECTED STATUS is derived from the repo, never assumed:
 *   in the GONE list in proxy.ts        410
 *   a `source` in next.config           30x, and the destination is checked too
 *   has a page.tsx and no redirect      200
 * A route the repo does not describe is reported rather than guessed at.
 */
import { execSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ORIGIN = "https://referlabs.com.au";
const APP = "src/app";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const TRIES = 30;
const GAP_MS = 10_000;

const gone = (() => {
  const m = readFileSync("src/proxy.ts", "utf8").match(/const GONE\s*=\s*\[([\s\S]*?)\n\]/);
  return m ? [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]) : [];
})();

const redirects = (() => {
  const code = readFileSync("next.config.ts", "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^[ \t]*\/\/.*$/gm, "");
  const out = new Map();
  const marks = [...code.matchAll(/source:\s*'([^']+)'/g)];
  marks.forEach((m, i) => {
    const body = code.slice(m.index, marks[i + 1]?.index ?? code.length);
    if (/\b(has|missing)\s*:/.test(body)) return;
    if (m[1].includes(":")) return; // patterned rules: not a single route to check
    out.set(m[1], /permanent:\s*true/.test(body) ? 308 : 307);
  });
  return out;
})();

function routesFromGit(ref) {
  const files = execSync(`git diff --name-only ${ref}`, { encoding: "utf8" }).split("\n").filter(Boolean);
  const routes = new Set();
  for (const f of files) {
    if (f.startsWith(`${APP}/`) && f.endsWith("page.tsx")) {
      const r = "/" + f.slice(APP.length + 1).replace(/\/?page\.tsx$/, "");
      if (!r.includes("[")) routes.add(r.replace(/\/$/, "") || "/");
    }
    // a redirect or GONE edit changes routes no page.tsx mentions
    if (f === "next.config.ts" || f === "src/proxy.ts") for (const g of gone) routes.add(g);
  }
  return [...routes];
}

function expected(route) {
  if (gone.some((g) => route === g || route.startsWith(`${g}/`))) return { code: 410, why: "in GONE" };
  if (redirects.has(route)) return { code: redirects.get(route), why: "next.config redirect" };
  const p = join(APP, route === "/" ? "" : route.slice(1), "page.tsx");
  if (existsSync(p)) return { code: 200, why: "has page.tsx" };
  return { code: null, why: "not described by the repo" };
}

function status(url) {
  try {
    return Number(
      execSync(`curl -s -o /dev/null -A "${UA}" -m 25 -w '%{http_code}' "${url}"`, { encoding: "utf8" }).trim(),
    );
  } catch {
    return 0;
  }
}

// ── 1. the deployment itself ────────────────────────────────────────────────
/**
 * Checked first and always. A route check that passes against the PREVIOUS
 * deployment tells you nothing about the one you just made.
 */
/**
 * 2>&1 is load-bearing: `vercel inspect` writes its report to STDERR, so
 * capturing stdout alone returns an empty string and every state reads as
 * "polling" until the loop times out. The first version of this did exactly
 * that and reported a Ready deployment as Timeout.
 */
function vercel(cmd) {
  try {
    return execSync(`vercel ${cmd} 2>&1`, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    return String(e.stdout ?? "") + String(e.stderr ?? "");
  }
}

function latestProductionDeployment() {
  const out = vercel("ls --prod");
  const line = out.split("\n").find((l) => /https:\/\/\S+\.vercel\.app/.test(l));
  if (!line) return null;
  const url = line.match(/https:\/\/\S+\.vercel\.app/)?.[0] ?? null;
  const state = line.match(/●\s*(\w+)/)?.[1] ?? "Unknown";
  return { url, state };
}

function checkDeployment(url) {
  for (let i = 0; i < 40; i++) {
    const out = url ? vercel(`inspect ${url}`) : "";
    const state = out.match(/status\s+●\s*(\w+)/)?.[1] ?? out.match(/●\s*(\w+)/)?.[1];
    if (state === "Ready" || state === "Error" || state === "Canceled") return state;
    process.stdout.write(`   … ${state ?? "polling"} (${i + 1})\r`);
    execSync("perl -e 'select(undef,undef,undef,10)'");
  }
  return "Timeout";
}

const args = process.argv.slice(2).filter(Boolean);
const explicit = args.filter((a) => a.startsWith("/"));
const urlArg = args.find((a) => a.startsWith("https://"));
const ref = args.find((a) => !a.startsWith("/") && !a.startsWith("https://")) ?? "HEAD~1 HEAD";

let deployFailed = false;
const latest = urlArg ? { url: urlArg, state: null } : latestProductionDeployment();
if (!latest?.url) {
  console.warn(
    "\n  ! Could not read the deployment list from the Vercel CLI. The routes below\n" +
      "    are checked against whatever production currently serves, which may not be\n" +
      "    the build you just made. Run `vercel ls --prod` by hand.\n",
  );
} else {
  console.log(`\n  Latest production deployment: ${latest.url}`);
  const state = checkDeployment(latest.url);
  const mark = state === "Ready" ? "OK" : "!!";
  console.log(`   ${mark}  ${state}                    `);
  if (state !== "Ready") {
    deployFailed = true;
    console.error(`\n  The deployment is ${state}. The last 25 log lines:\n`);
    const log = vercel(`inspect --logs ${latest.url}`);
    for (const l of log.split("\n").slice(-25)) console.error(`     ${l}`);
    console.error(
      "\n  Read what the failing check sits DOWNSTREAM of before fixing what it names.\n" +
        "  A price check failing on a skincare page was the date generator writing an\n" +
        "  empty file three steps earlier.\n",
    );
  }
}

// ── 2. the routes the commit touched ────────────────────────────────────────
const routes = explicit.length ? explicit : routesFromGit(ref);

if (routes.length === 0) {
  console.log("\n  This commit touched no page.tsx, so there are no routes to check.");
  console.log(`  That is not a pass: the verdict above is the deployment status.\n`);
  process.exit(deployFailed ? 1 : 0);
}

console.log(`\n  Verifying ${routes.length} route(s) against ${ORIGIN}\n`);
const pending = routes.map((r) => ({ route: r, ...expected(r) }));
const unknown = pending.filter((p) => p.code === null);
const checkable = pending.filter((p) => p.code !== null);

for (const u of unknown) console.warn(`   ?  ${u.route}: ${u.why}, so there is nothing to assert. Check by hand.`);

const failed = [];
for (const item of checkable) {
  let got = 0;
  for (let i = 0; i < TRIES; i++) {
    got = status(`${ORIGIN}${item.route}`);
    if (got === item.code) break;
    if (i < TRIES - 1) execSync(`perl -e 'select(undef,undef,undef,${GAP_MS / 1000})'`);
  }
  const ok = got === item.code;
  console.log(`   ${ok ? "OK" : "!!"}  ${String(got).padEnd(3)} ${item.route}  (expected ${item.code}, ${item.why})`);
  if (!ok) failed.push({ ...item, got });
}

if (failed.length || deployFailed) {
  if (deployFailed) console.error(`\n  The deployment did not reach Ready. Everything above was checked against\n  whatever production served instead.`);
  if (failed.length) console.error(`\n  ${failed.length} route(s) do not serve what the repo says they should:\n`);
  for (const f of failed) {
    console.error(`   - ${f.route}: expected ${f.code} because it ${f.why}, got ${f.got}.`);
  }
  console.error(
    "\n  The build passing does not mean the route is reachable. Check whether the\n" +
      "  edit that was supposed to change this actually landed, and whether an\n" +
      "  earlier next.config rule answers first.\n",
  );
  process.exit(1);
}
console.log(`\n  Deploy verified: deployment Ready, ${checkable.length} route(s) serve what the repo says.\n`);
