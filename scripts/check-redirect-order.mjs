#!/usr/bin/env node
/**
 * A path that must return 410 may not be shadowed by a next.config redirect.
 *
 * next.config redirects run BEFORE middleware. Anything in the GONE list in
 * src/proxy.ts whose path also matches a redirect `source` never reaches the
 * 410: the redirect answers first and the URL keeps its 30x forever.
 *
 * This is written down in next.config.ts, beside the code, in a comment that
 * says exactly this about the peptide and Polymarket paths. On 5 September 2026
 * I added /blog/attorney-referral-fee-rules-state-guide to GONE anyway, and the
 * catch-all `/blog/:path*` swallowed it. The URL kept returning 308 and I only
 * found out by checking the served status code.
 *
 * A note next to the code was not enough, because the note is only read by
 * someone already looking at that line. This fails the build instead.
 *
 * THE FIX WHEN IT FIRES is not to delete the GONE entry. It is to carve the path
 * out of the redirect that shadows it, the way the /blog catch-all now excludes
 * that post with a negative lookahead:
 *
 *   source: '/blog/:path((?!attorney-referral-fee-rules-state-guide$).*)'
 */
import { readFileSync } from "node:fs";

const CONFIG = "next.config.ts";
const PROXY = "src/proxy.ts";

/** The GONE array in proxy.ts. Exact paths, plus anything nested beneath them. */
function gonePaths() {
  const src = readFileSync(PROXY, "utf8");
  const block = src.match(/const GONE\s*=\s*\[([\s\S]*?)\n\]/);
  if (!block) return [];
  return [...block[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

/**
 * Redirect `source` patterns that apply UNCONDITIONALLY on the apex host.
 *
 * A rule carrying `has` or `missing` only fires when its condition holds, so it
 * is not a shadow for an ordinary request. The one that matters here is the
 * www -> non-www canonicaliser, whose source is a bare `/:path*` scoped to
 * `has: [{ type: 'host', value: 'www.referlabs.com.au' }]`. Counting it would
 * report every 410 on the site as shadowed, which the first version of this
 * check did.
 *
 * Comments are stripped first so a path discussed in prose is not read as a rule.
 */
function redirectSources() {
  const src = readFileSync(CONFIG, "utf8");
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^[ \t]*\/\/.*$/gm, "");
  const out = [];
  // each rule is a `source:` and everything up to the next `source:` or the end
  const marks = [...code.matchAll(/source:\s*'([^']+)'/g)];
  marks.forEach((m, i) => {
    const body = code.slice(m.index, marks[i + 1]?.index ?? code.length);
    if (/\b(has|missing)\s*:/.test(body)) return; // conditional, not a blanket shadow
    out.push(m[1]);
  });
  return out;
}

/**
 * Next.js path-to-regexp, reduced to what this config actually uses:
 * `:name*` (zero or more segments), `:name(<re>)` (custom), `:name` (one
 * segment), and literals. Anything else is treated as literal, which errs
 * toward reporting a shadow rather than missing one.
 */
function toRegExp(source) {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    if (ch === ":") {
      const name = /^[A-Za-z0-9_]+/.exec(source.slice(i + 1))?.[0] ?? "";
      i += 1 + name.length;
      if (source[i] === "(") {
        // custom pattern: copy it out, balancing nested parentheses
        let depth = 0;
        let j = i;
        for (; j < source.length; j++) {
          if (source[j] === "(") depth++;
          else if (source[j] === ")") {
            depth--;
            if (depth === 0) break;
          }
        }
        out += `(?:${source.slice(i + 1, j)})`;
        i = j + 1;
        if (source[i] === "*") { out += "*"; i++; }
      } else if (source[i] === "*") {
        out += ".*";
        i++;
      } else if (source[i] === "?") {
        out += "[^/]*";
        i++;
      } else {
        out += "[^/]+";
      }
    } else {
      out += ch.replace(/[.+^${}()|[\]\\]/g, "\\$&");
      i++;
    }
  }
  return new RegExp(`^${out}/?$`);
}

const gone = gonePaths();
const sources = redirectSources();
const errors = [];

for (const path of gone) {
  // proxy.ts matches the path itself and anything beneath it, so both must be clear
  for (const probe of [path, `${path}/child`]) {
    for (const source of sources) {
      let re;
      try {
        re = toRegExp(source);
      } catch {
        continue;
      }
      if (re.test(probe)) {
        errors.push(
          `${probe} is in GONE (410) but matches the next.config redirect source '${source}',\n` +
            `       which runs first. The 410 is unreachable and the URL will keep returning 30x.`,
        );
        break;
      }
    }
  }
}

if (errors.length) {
  console.error("\n  A 410 path is shadowed by a redirect:\n");
  for (const e of errors) console.error(`   - ${e}`);
  console.error(
    "\n  Carve the path out of the redirect rather than dropping it from GONE, e.g.\n" +
      "  source: '/blog/:path((?!the-slug$).*)'\n",
  );
  process.exit(1);
}
console.log(`\n  Redirect order holds: all ${gone.length} GONE paths reach their 410.\n`);
