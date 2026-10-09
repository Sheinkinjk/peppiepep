#!/usr/bin/env node
// Compliance linter for the Hims page set. No dependencies.
// Run: node scripts/lint-hims-copy.mjs   (wire as "lint:hims" in package.json)
//
// Encodes: Hims Partner Handbook rules 3-7, TGA restrictions on advertising
// prescription-only treatments (direct or indirect reference), and AHPRA's
// National Law s133 limits on advertising regulated health services.
// Fails the build on any hit. Fix the copy; don't widen the allowlist without a reason.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "src/content/hims");
const COMPONENT_DIR = join(ROOT, "src/components/hims");

// Handbook V3 option 2 with the publisher named in place of "I" (Jarred, 29 Sep 2026):
// every disclosure on the site names Refer Labs as the one who may earn.
const HANDBOOK_DISCLOSURE =
  "If you're a new patient to Hims and make a purchase with the affiliate code shared in this content, Refer Labs may earn a small commission at no extra cost to you.";

// Banned anywhere in page copy. Case-insensitive, whole word.
const BANNED = [
  // Medicine words (handbook rule 3, TGA)
  "medication", "medications", "medicine", "medicines", "prescription", "prescriptions", "prescribe", "prescribed", "prescribes",
  "script", "scripts", "pill", "pills", "tablet", "tablets", "capsule", "capsules", "injection", "injections", "injectable",
  "jab", "jabs", "shot", "shots", "pen", "pens", "drug", "drugs", "dose", "doses", "dosage", "compounded",
  // Named or implied treatments
  "sildenafil", "tadalafil", "viagra", "cialis", "levitra", "vardenafil", "minoxidil", "finasteride", "dutasteride",
  "semaglutide", "tirzepatide", "liraglutide", "ozempic", "wegovy", "mounjaro", "zepbound", "saxenda", "rybelsus",
  "orlistat", "phentermine", "metformin", "contrave", "glp-1", "glp1", "dht", "biotin",
  // Mechanism language (handbook: no explanation of how treatment works)
  "appetite", "food noise", "hormone", "hormones", "follicle", "follicles", "blood flow",
  // Profession terms (handbook: use "practitioner")
  "doctor", "doctors", "gp", "gps", "physician", "physicians",
  // Diagnosable conditions (handbook rule 4)
  "testosterone", "diabetes", "obesity", "obese", "bmi", "blood pressure", "hypertension", "heart", "cardiovascular",
  "cholesterol", "pcos", "apnoea", "apnea", "depression", "cancer",
  // Outcome and safety claims (handbook rule 5, AHPRA)
  "safe", "safety", "risk-free", "cure", "cures", "cured", "guaranteed", "you will", "success rate", "kg", "kilos",
  "weekly", "results in",
  // Fear framing (handbook rule 5)
  "before it's too late", "don't wait", "running out of time",
  // Not in the partner program
  "premature ejaculation",
  // Hims plan name that reads as a hormone reference (rule 4), and member-count stats
  "T Support", "300,000", "australians have joined",
];

// Checked case-sensitively (short tokens that would false-positive in lowercase).
const BANNED_CASE_SENSITIVE = ["PE", "Dr", "ReferLabs"];

// Competitors must not appear on the three single-brand review pages.
const REVIEW_FILES = ["pages/weight.ts", "pages/hair.ts", "pages/ed.ts"];
const COMPETITORS = ["mosh", "moshy", "juniper", "dense", "hub.health", "youly", "midoc", "instantscripts", "updoc", "hola health"];

// Phrases that contain a banned token but are permitted by the handbook.
// "($89 value)" is the value of the initial consultation in Hims' own offer line
// (V2, 9 Oct 2026). It is a consultation fee, not a plan or medicine price, which
// stay off these pages under the TGA price guidance and the no-partner-prices rule.
const ALLOW = [/money-back guarantee/gi, /price match guarantee/gi, /clinically appropriate/gi, /\(\$89 value\)/g];

// Source files only: partner-mark.png sits in the content folder and its bytes
// were being scanned as copy (found 9 Oct 2026).
function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.(ts|tsx)$/.test(p) ? [p] : [];
  });
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wordRe = (t, flags) => new RegExp(`(?<![A-Za-z0-9])${esc(t)}(?![A-Za-z0-9])`, flags);

const errors = [];

function scanText(file, text, { competitors }) {
  text.split("\n").forEach((rawLine, i) => {
    // Skip comments, imports and Tailwind class strings.
    const trimmed = rawLine.trim();
    if (trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("import ") || trimmed.includes("application/ld+json")) return;
    // Strip class strings and internal hrefs (URL slugs aren't copy).
    let line = rawLine.replace(/className=("[^"]*"|\{`[^`]*`\})/g, "").replace(/href: "\/[^"]*"/g, "");
    for (const a of ALLOW) line = line.replace(a, "");
    for (const t of BANNED) if (wordRe(t, "i").test(line)) errors.push(`${file}:${i + 1}  banned term "${t}"`);
    for (const t of BANNED_CASE_SENSITIVE) if (wordRe(t, "").test(line)) errors.push(`${file}:${i + 1}  banned term "${t}"`);
    if (/\d\s?%/.test(line)) errors.push(`${file}:${i + 1}  percentage (outcome statistic?)`);
    // No partner prices on these pages (Jarred, 29 Sep 2026): readers see prices on the provider's site.
    if (/\$\s?\d/.test(line)) errors.push(`${file}:${i + 1}  dollar figure (partner prices are not printed on Hims pages)`);
    if (competitors) for (const c of COMPETITORS) if (wordRe(c, "i").test(line)) errors.push(`${file}:${i + 1}  competitor "${c}" on a single-brand review page`);
  });
}

// 1. Page copy
for (const f of walk(CONTENT_DIR)) {
  const rel = relative(CONTENT_DIR, f);
  if (rel === "types.ts" || rel === "slugs.ts") continue;
  const text = readFileSync(f, "utf8");
  // config.ts holds the disclosure and offer terms; scan it too, minus the verbatim disclosure.
  scanText(`src/content/hims/${rel}`, text.replace(HANDBOOK_DISCLOSURE, ""), { competitors: REVIEW_FILES.includes(rel) });
}

// 2. Visible text in components
for (const f of walk(COMPONENT_DIR)) scanText(relative(ROOT, f), readFileSync(f, "utf8"), { competitors: false });

// 3. Disclosure: verbatim in config, rendered twice per page by the renderer
const config = readFileSync(join(CONTENT_DIR, "config.ts"), "utf8");
if (!config.includes(HANDBOOK_DISCLOSURE)) errors.push("config.ts: DISCLOSURE is not the handbook wording verbatim");
const renderer = readFileSync(join(COMPONENT_DIR, "HimsPage.tsx"), "utf8");
const count = (renderer.match(/<Disclosure text=\{DISCLOSURE\}/g) || []).length;
if (count < 2) errors.push(`HimsPage.tsx: Hims disclosure rendered ${count} time(s); must be at least 2`);

// 4. Every page has an offer block with terms, and a FAQ
for (const f of walk(join(CONTENT_DIR, "pages"))) {
  const t = readFileSync(f, "utf8");
  const rel = relative(ROOT, f);
  if (!/type: "offer"/.test(t)) errors.push(`${rel}: no offer block (offer terms must be shown with any discount)`);
  if (!/type: "faq"/.test(t)) errors.push(`${rel}: no FAQ block`);
}

if (errors.length) {
  console.error(`lint:hims failed with ${errors.length} issue(s):\n`);
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
console.log("lint:hims passed. 0 issues.");
