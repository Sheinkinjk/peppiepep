import { authorById } from "@/lib/entities/authors";
import { FACTS } from "@/lib/facts/registry";

/**
 * The observation log as CSV, generated from the same FACTS records /data renders,
 * so the page and the download cannot disagree.
 *
 * Added 15 Sep 2026 so the log can be reused and cited, not just read: licensed
 * CC BY 4.0 (stated on /data). `source_url` is only what the record itself
 * carries; health records read off referral landing pages leave it blank on
 * purpose (see the note at the top of src/lib/facts/registry.ts), and the CSV
 * keeps that rule rather than re-exposing those URLs.
 */

export const dynamic = "force-static";

const COLUMNS = [
  "id",
  "kind",
  "hub",
  "subject",
  "observed_at",
  "observed_by",
  "method",
  "claim",
  "value",
  "unit",
  "source_url",
  "supersedes",
];

function cell(value: unknown): string {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function GET() {
  const rows = [...FACTS]
    .sort((a, b) => a.observedAt.localeCompare(b.observedAt) || a.id.localeCompare(b.id))
    .map((fact) => {
      const author = authorById(fact.observedBy);
      return [
        fact.id,
        fact.kind,
        fact.hub,
        fact.subject,
        fact.observedAt,
        author ? `${author.name}, ${author.role}` : fact.observedBy,
        fact.method,
        fact.claim,
        fact.value,
        fact.unit,
        fact.sourceUrl,
        fact.supersedes,
      ]
        .map(cell)
        .join(",");
    });

  const body = [COLUMNS.join(","), ...rows].join("\r\n") + "\r\n";

  return new Response(body, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'inline; filename="refer-labs-observation-log.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
