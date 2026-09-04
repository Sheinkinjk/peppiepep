#!/usr/bin/env node
/**
 * Two guards on partner placement, both written after the fault they catch was
 * found by hand on a live page.
 *
 *  1. DISCLOSURE CONTRADICTION. /mens-health/sexual-wellness-products carried a
 *     Midoc commission link while its ComingSoonNote still read "nothing here
 *     earns us a commission before then". The note takes its wording from a
 *     category map, so adding a link to a page never updates it. A page that
 *     earns must never claim it does not.
 *
 *  3. LLMS.TXT CONTRADICTION. public/llms.txt told AI engines "Refer Labs has NO
 *     commercial partner in this category" for both partnered hubs, and "No
 *     retailer is named or linked yet" for a page that had carried a Midoc link
 *     for a week. Midoc had no entry at all. Nobody edits llms.txt when they add
 *     a link, so the file drifts into asserting the opposite of the site.
 *
 *     This is the same failure shape as (1), and as the hardcoded partner dates
 *     and the split price fields before it: a claim that was TRUE WHEN WRITTEN
 *     and went stale when something elsewhere changed. Treat any sentence in
 *     llms.txt asserting the commercial state of a hub as a generated artefact
 *     that happens to be stored as prose, never as prose someone maintains.
 *
 *  4. DENIED SERVICE LINES. A partner is not all-or-nothing. Midoc's own
 *     weight-management landing page uses "GLP-1 receptor agonists" and "weight
 *     loss injections", both of which this site bans as prescription-medicine
 *     identifiers, so we do not name, price, describe or route toward that line
 *     even though we happily route to the rest of the service. Denials are per
 *     partner and carry their reason, because in a year nobody will remember why
 *     one line of one partner is off limits and it will quietly come back.
 *
 *  2. PARTNER SCOPE. Midoc, Edible Beauty, Aussie Health and the Foreo link
 *     belong to two coming-soon hubs. Hair loss and weight loss are partnered
 *     with Mosh and Moshy, who generate the revenue, and a competing partner
 *     must not appear there. Verifying that by hand across 172 pages does not
 *     survive contact with a second month of partner onboarding.
 *
 * Static analysis of source, so it runs before a push and needs no build.
 * Adding a partner means adding a PARTNERS entry; widening where one may appear
 * means editing its `allow` list, deliberately, in this file.
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const APP = "src/app";
const LLMS = "public/llms.txt";
const PARTNER_DATA = "src/lib/partners";
const errors = [];

/** Routes carrying a partner link, and which partners each one links to. */
const linkedRoutes = new Map(); // route -> Set(partner name)

/**
 * Partner tokens, the ONLY route prefixes each may appear under, and any service
 * line of theirs we refuse to touch.
 *
 * `deny` is checked EVERYWHERE, including inside the allowed prefixes and in
 * llms.txt and go-links.ts. An allowlist says where a partner may appear; a
 * denylist says what about them may never appear at all.
 */
const PARTNERS = [
  {
    name: "Midoc",
    tokens: ["midoc", "Midoc"],
    allow: ["/mens-health", "/midoc", "/coming-soon"],
    deny: [
      {
        pattern: /midoc\.com\.au\/weightloss|\/weightloss/i,
        reason:
          "no link may resolve to midoc.com.au/weightloss: read 4 Sep 2026 it uses " +
          '"GLP-1 receptor agonists" and "weight loss injections", both banned here as ' +
          "prescription-medicine identifiers",
      },
      {
        pattern: /weight[- ]management/i,
        reason:
          "we do not name, price or describe Midoc's weight-management line, because it " +
          "routes readers to the page above. Weight loss is covered in its own hub with " +
          "different partners, so nothing is lost by leaving it out",
      },
    ],
  },
  { name: "Edible Beauty",  tokens: ["edible-beauty", "ediblebeauty"], allow: ["/skin-and-beauty", "/coming-soon"] },
  { name: "Aussie Health",  tokens: ["aussie-health", "aussiehealthproducts"], allow: ["/skin-and-beauty", "/coming-soon"] },
  { name: "Foreo",          tokens: ["foreo-", "t/60709"],             allow: ["/skin-and-beauty", "/coming-soon"] },
];

/** Wording that asserts the page earns nothing. Must never sit beside a link. */
const EARNS_NOTHING = /nothing (?:here|on this page) (?:earns us a commission|pays us)/i;

function pages(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) pages(p, acc);
    else if (e.name === "page.tsx") acc.push(p);
  }
  return acc;
}

const routeOf = (file) => {
  const r = "/" + file.slice(APP.length + 1).replace(/\/page\.tsx$/, "");
  return r === "/." ? "/" : r;
};

// ── The component source is needed to know which variants earn ───────────────
const noteSrc = existsSync("src/components/consumer/ComingSoonNote.tsx")
  ? readFileSync("src/components/consumer/ComingSoonNote.tsx", "utf8")
  : "";
// Variants whose body does NOT claim we earn nothing.
const PARTNERED_VARIANTS = new Set(["partnered"]);
// category -> variant, parsed from BY_CATEGORY so the check cannot drift from it.
const byCategory = new Map();
for (const m of noteSrc.matchAll(/^\s*"?([^":\n]+?)"?:\s*"(a|b|c|d|partnered)",/gm)) {
  byCategory.set(m[1].trim(), m[2]);
}

for (const file of pages(APP)) {
  const route = routeOf(file);
  if (route.includes("[")) continue;
  const src = readFileSync(file, "utf8");

  // ── 1. a page that earns must not render unpartnered coming-soon wording ──
  const hasPartnerLink = /href:\s*"\/go\/|href="\/go\/|t\.cfjump\.com/.test(src);
  if (hasPartnerLink && /<ComingSoonNote/.test(src)) {
    const call = src.match(/<ComingSoonNote[\s\S]{0,300}?\/>/)?.[0] ?? "";
    const explicit = call.match(/variant="([a-z]+)"/)?.[1];
    const category = call.match(/category="([^"]+)"/)?.[1];
    const variant = explicit ?? byCategory.get(category ?? "") ?? "a";
    if (!PARTNERED_VARIANTS.has(variant)) {
      errors.push(
        `${route}: carries a partner link but renders ComingSoonNote variant "${variant}", ` +
        `whose wording says the page earns nothing. Pass variant="partnered" or map ` +
        `category "${category}" to it in ComingSoonNote.tsx.`,
      );
    }
  }
  // Belt and braces: the literal claim, beside a link, whatever produced it.
  if (hasPartnerLink && EARNS_NOTHING.test(src)) {
    errors.push(`${route}: carries a partner link and also states it earns nothing.`);
  }

  if (hasPartnerLink) linkedRoutes.set(route, new Set());

  // ── 4. a denied service line may not appear anywhere, allowed prefix or not ─
  for (const p of PARTNERS) {
    if (!p.deny || !p.tokens.some((t) => src.includes(t))) continue;
    for (const d of p.deny) {
      const hit = src.match(d.pattern);
      if (hit) errors.push(`${route}: mentions "${hit[0]}" on a page that references ${p.name}. Denied: ${d.reason}.`);
    }
  }

  // ── 2. partner tokens may only appear under an allowlisted prefix ─────────
  for (const p of PARTNERS) {
    // An index page has to be able to LINK to a partner page whose own slug
    // carries the brand: /guides names "/skin-and-beauty/foreo-luna-vs-ufo",
    // and so do sitemap, search and the hubs. Those are internal hrefs into
    // allowlisted territory with no affiliate link attached, so they are
    // stripped before matching. A /go/<partner> slug or a cfjump URL is not
    // stripped, which is the thing the guard is actually for.
    const scoped = p.allow.reduce(
      (acc, a) => acc.split(new RegExp(`"${a}/[^"]*"`, "g")).join('""'),
      src,
    );
    if (!p.tokens.some((t) => scoped.includes(t))) continue;
    if (p.allow.some((a) => route === a || route.startsWith(a + "/"))) {
      if (hasPartnerLink) linkedRoutes.get(route)?.add(p.name);
      continue;
    }
    errors.push(
      `${route}: references partner "${p.name}", which is scoped to ${p.allow.join(", ")}. ` +
      `Hair loss and weight loss are partnered elsewhere. Widen the allow list in ` +
      `scripts/check-partner-scope.mjs only if that is deliberate.`,
    );
  }
}

// ── 4b. the same denial applies to destinations and to what we tell engines ──
/**
 * Per LINE, not per file. go-links.ts and llms.txt describe every partner, so a
 * file-wide match flags the wrong thing: the first version of this rule failed on
 * llms.txt because our Moshy and Juniper entries say "weight-management", which
 * is the TGA-safe phrasing those pages are supposed to use. A denial is only a
 * denial when it lands on the same line as the partner it belongs to.
 */
/**
 * Partner data files are checked whole rather than per line, because the file is
 * about one partner and the denied phrase sits inside a data row that names no
 * partner. Comments are stripped first: the reason a line is denied has to be
 * written down next to the denial, and that prose necessarily quotes the phrase.
 */
for (const file of readdirSync(PARTNER_DATA).map((f) => join(PARTNER_DATA, f))) {
  if (!file.endsWith(".ts")) continue;
  const partner = PARTNERS.find((p) =>
    p.tokens.some((t) => file.toLowerCase().includes(t.toLowerCase().replace(/\s+/g, "-"))),
  );
  if (!partner?.deny) continue;
  const code = readFileSync(file, "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
  for (const d of partner.deny) {
    const hit = code.match(d.pattern);
    if (hit) errors.push(`${file}: contains "${hit[0]}" outside a comment. Denied for ${partner.name}: ${d.reason}.`);
  }
}

for (const file of ["src/lib/go-links.ts", LLMS]) {
  if (!existsSync(file)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const p of PARTNERS) {
      if (!p.deny || !p.tokens.some((t) => line.includes(t))) continue;
      for (const d of p.deny) {
        const hit = line.match(d.pattern);
        if (hit) {
          errors.push(
            `${file}:${i + 1}: line mentions ${p.name} and contains "${hit[0]}". Denied: ${d.reason}.`,
          );
        }
      }
    }
  });
}

// ── 3. llms.txt must not contradict a hub that now earns ────────────────────
/**
 * Sentences that assert we earn nothing. Each was live in llms.txt on
 * 4 Sep 2026 while the page it described carried a commission link.
 */
const NO_PARTNER_CLAIM = [
  /\bno commercial partner\b/i,
  /\bnothing in this section earns\b/i,
  /\bno retailer is named or linked\b/i,
  /\bearns? (?:us )?no commission\b/i,
  /\bnothing here earns\b/i,
];

if (existsSync(LLMS)) {
  const llms = readFileSync(LLMS, "utf8");

  /** path -> the whole llms.txt entry describing it. */
  const entries = new Map();
  for (const m of llms.matchAll(/^-\s*\[[^\]]*\]\(https:\/\/referlabs\.com\.au(\/[^)]*)?\)\s*:?(.*)$/gm)) {
    entries.set((m[1] ?? "/").replace(/\/$/, "") || "/", m[0]);
  }

  // Every route that earns, and every hub above it, must not claim otherwise.
  const mustNotDisclaim = new Set();
  for (const route of linkedRoutes.keys()) {
    mustNotDisclaim.add(route);
    const hub = "/" + route.split("/")[1];
    if (hub !== route) mustNotDisclaim.add(hub);
  }
  for (const path of mustNotDisclaim) {
    const entry = entries.get(path);
    if (!entry) continue;
    const claim = NO_PARTNER_CLAIM.find((re) => re.test(entry));
    if (claim) {
      errors.push(
        `${LLMS}: the entry for ${path} still says we earn nothing there (matched ${claim}), ` +
        `but that page or its hub now carries a partner link. Rewrite the entry: it states the ` +
        `commercial state of a hub, so it is a generated artefact, not prose to leave alone.`,
      );
    }
  }

  /**
   * A partner that is live anywhere must be named in llms.txt PROSE. URLs and
   * bare domains are stripped first: /midoc was absent from the file entirely
   * while "midoc.com.au" still appeared inside other entries, so a naive
   * substring test passes on exactly the fault this is here to catch.
   */
  const prose = llms
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\b[a-z0-9-]+\.(?:com|net|org|gov)(?:\.au)?\b/gi, " ");
  const livePartners = new Set([...linkedRoutes.values()].flatMap((s) => [...s]));
  for (const name of livePartners) {
    if (!prose.toLowerCase().includes(name.toLowerCase())) {
      errors.push(
        `${LLMS}: partner "${name}" is linked on the site but never named in llms.txt. ` +
        `An engine asked "who does Refer Labs partner with" has nothing to match.`,
      );
    }
  }
}

if (errors.length) {
  console.error("\n  Partner scope/disclosure check FAILED:\n");
  for (const e of errors) console.error(`   - ${e}`);
  console.error("");
  process.exit(1);
}
console.log(
  `\n  Partner scope holds: no page earns while claiming otherwise, no partner outside ` +
  `its hub, no denied service line anywhere, and llms.txt agrees with the site on ` +
  `${linkedRoutes.size} earning routes.\n`,
);
