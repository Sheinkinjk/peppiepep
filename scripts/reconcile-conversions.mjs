#!/usr/bin/env node
/**
 * Join network-reported conversions back to the page that produced the click.
 *
 * WHY THIS EXISTS. The site fires affiliate_click, newsletter_subscribe and
 * quiz_result_click. It fires no conversion event of any kind. So every priority
 * ranking produced so far optimises impressions and CTR as PROXIES for money,
 * and which pages actually earn is unknown. This turns that into a table.
 *
 * HOW THE JOIN WORKS. AffiliateClickTracker sends a SubID shaped
 *
 *     <first-touch source>__<page-slug>__<click-id>
 *
 * to every network whose parameter is mapped in SUBID_PARAM. PartnerStack takes
 * it as sid1, Commission Factory as UniqueId, Juniper as utm_content. The
 * network echoes that string back on the transaction, so the page is recoverable
 * from the conversion row with no cookie and no shared identifier.
 *
 * MOSHY AND MOSH SEND NO SUBID. They are the biggest earners and they are
 * missing from that map on purpose, pending confirmation of the parameter their
 * dashboard reads. Until that lands, their rows arrive here with no page and are
 * reported as unattributed rather than being guessed at or dropped.
 *
 * USAGE
 *   Drop network exports into reports/conversions/ as CSV. Any column layout;
 *   the parser looks for a SubID-shaped column and an amount column by name.
 *   Then:  npm run reconcile
 *
 * PULL THE RIGHT PARTNERSTACK REPORT. The "partner team member report" is
 * aggregated by merchant and month and carries no sub-ID column, so it cannot
 * be joined and this script will say so. The one that works is the
 * TRANSACTION or CUSTOMER level export, where each row is one conversion and
 * sid1 is available as a column. If PartnerStack shows no such report, there
 * have been no transactions to list, which is itself the answer.
 *
 * WHAT IT WILL NOT DO. It will not estimate. A conversion whose SubID is absent,
 * truncated or unrecognised is counted as unattributed and named. The whole
 * point is to replace inference with measurement, so inferring here would defeat
 * it.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIR = "reports/conversions";

/** Columns a network might use for the SubID we sent. */
const SUBID_COLS = [
  "sid1", "sub_id", "subid", "sub id", "uniqueid", "unique id", "utm_content",
  "custom_id", "customid", "click_ref", "clickref", "sub1", "s1",
];
/** Columns a network might use for commission. */
const AMOUNT_COLS = [
  "commission", "commission amount", "payout", "earnings", "amount", "revenue",
  "commission_amount", "publisher commission", "net commission",
];
const STATUS_COLS = ["status", "state", "transaction status", "approval status"];

/** Minimal CSV parser that survives quoted fields containing commas. */
function parseCsv(text) {
  const rows = [];
  let row = [], field = "", inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQ = false;
      else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim()));
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function pickColumn(header, candidates) {
  const h = header.map(norm);
  for (const c of candidates) {
    const i = h.indexOf(norm(c));
    if (i >= 0) return i;
  }
  return -1;
}

/** "google__moshy-vs-juniper__k3f9" -> { source, page, clickId } */
function parseSubid(v) {
  if (!v) return null;
  const parts = String(v).split("__");
  if (parts.length < 2) return null;
  return {
    source: parts[0] || "(unknown)",
    page: "/" + (parts[1] || "").replace(/-/g, "/") === "/" ? "/" : "/" + parts[1],
    slug: parts[1] || "",
    clickId: parts[2] || "",
  };
}

if (!existsSync(DIR)) {
  console.error(`  ${DIR} does not exist. Create it and drop network CSV exports in.`);
  process.exit(1);
}
const files = readdirSync(DIR).filter((f) => f.toLowerCase().endsWith(".csv"));
if (files.length === 0) {
  console.log(`\n  No CSVs in ${DIR} yet.\n`);
  console.log("  Export conversions from each network and drop them in, one file per network.");
  console.log("  Required: a column holding the SubID we sent (sid1 / UniqueId / utm_content)");
  console.log("  and a commission column. Any other columns are ignored.\n");
  console.log("  Then run: npm run reconcile\n");
  process.exit(0);
}

const byPage = new Map();
let total = 0, attributed = 0, unattributed = 0, amountTotal = 0;
const noSubid = [];

for (const f of files) {
  const rows = parseCsv(readFileSync(join(DIR, f), "utf8"));
  if (rows.length < 2) continue;
  const header = rows[0];
  const iSub = pickColumn(header, SUBID_COLS);
  const iAmt = pickColumn(header, AMOUNT_COLS);
  const iSt = pickColumn(header, STATUS_COLS);
  if (iSub < 0) {
    console.warn(`  ! ${f}: no SubID column found. Looked for: ${SUBID_COLS.slice(0, 6).join(", ")}…`);
    console.warn(`    Columns present: ${header.join(", ").slice(0, 160)}`);
    continue;
  }
  for (const r of rows.slice(1)) {
    total++;
    const amount = iAmt >= 0 ? Number(String(r[iAmt] ?? "").replace(/[^0-9.\-]/g, "")) || 0 : 0;
    const status = iSt >= 0 ? (r[iSt] ?? "").trim() : "";
    const parsed = parseSubid(r[iSub]);
    if (!parsed?.slug) {
      unattributed++;
      noSubid.push({ file: f, raw: (r[iSub] ?? "").slice(0, 40), amount, status });
      continue;
    }
    attributed++;
    amountTotal += amount;
    const key = "/" + parsed.slug;
    const e = byPage.get(key) ?? { conversions: 0, amount: 0, sources: new Set(), network: f };
    e.conversions++; e.amount += amount; e.sources.add(parsed.source);
    byPage.set(key, e);
  }
}

console.log(`\n  ${files.length} network export(s), ${total} conversion rows\n`);
console.log(`  attributed to a page : ${attributed}`);
console.log(`  unattributed         : ${unattributed}`);
if (amountTotal) console.log(`  commission attributed: ${amountTotal.toFixed(2)}`);

if (byPage.size) {
  console.log(`\n  ── revenue by page ──\n`);
  const sorted = [...byPage.entries()].sort((a, b) => b[1].amount - a[1].amount || b[1].conversions - a[1].conversions);
  console.log(`  ${"conv".padStart(5)} ${"amount".padStart(10)}  page`);
  for (const [page, e] of sorted) {
    console.log(`  ${String(e.conversions).padStart(5)} ${e.amount.toFixed(2).padStart(10)}  ${page}   [${[...e.sources].join(", ")}]`);
  }
}

if (noSubid.length) {
  console.log(`\n  ── unattributed, NOT guessed at ──\n`);
  console.log(`  ${noSubid.length} conversion(s) carry no usable SubID. Expected for Moshy and Mosh,`);
  console.log(`  which send none. If they appear for a network that should be sending one, the`);
  console.log(`  parameter is being dropped somewhere and the mapping needs re-checking.\n`);
  for (const n of noSubid.slice(0, 12)) {
    console.log(`     ${n.file}  raw="${n.raw}"  amount=${n.amount}  ${n.status}`);
  }
  if (noSubid.length > 12) console.log(`     … and ${noSubid.length - 12} more`);
}
console.log("");
