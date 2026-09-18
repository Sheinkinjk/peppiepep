/**
 * The data every imagery asset draws from.
 *
 * Nothing in an illustration is typed into the SVG. A figure, a date, a host or
 * a category position arrives here from `src/lib/offers.ts` (through
 * `src/lib/preview/data.ts`, which already filters to offers carrying a real
 * saving AND a reading date). Change an offer and every image that shows it
 * changes with it, which is the point: the images are records, and a record
 * that can drift from its source is the fault this site keeps guarding against.
 *
 * Read-only: nothing here writes back to the live data.
 */
import { verifiedOffers, formatReading, splitSaving } from "@/lib/home/data";

export type Reading = {
  brand: string;
  logo: string;
  href: string;
  /** The whole offer sentence, as the provider states it. */
  offer: string;
  /** Just the saving, e.g. "$120" or "55%" or "2 months free". Null if none. */
  figure: string | null;
  code?: string;
  readOn: string;
  readOnLabel: string;
  /** Host of the page the figure was read off, or null where no public page exists. */
  host: string | null;
  /** Why there is no page to open, when that is the case. */
  noPage: string | null;
};

export type CategoryKey = "weight-loss" | "hair-loss" | "pets" | "energy" | "business" | "health-beauty";

export type HomeCategory = {
  key: CategoryKey;
  label: string;
  short: string;
  href: string;
  /** 0 to 5. Language C files each category at its own tab position. */
  slot: number;
  readings: Reading[];
  /** Most recent reading, or null. A category with none is shown as unread, never decorated. */
  latest: Reading | null;
};

/** How each offer's category in offers.ts files into a homepage category. */
const FILE: Record<string, CategoryKey> = {
  "Weight loss": "weight-loss",
  "Hair loss": "hair-loss",
  Pets: "pets",
  "Home batteries": "energy",
  "Landing pages": "business",
  "Creator growth": "business",
};

function hostOf(url: string): string {
  try { return new URL(url).host.replace(/^www\./, ""); } catch { return url; }
}

export const readings: Reading[] = verifiedOffers.map((d) => {
  const s = splitSaving(d.offer);
  const src = d.source;
  return {
    brand: d.brand,
    logo: d.logo,
    href: d.href,
    offer: d.offer,
    figure: s.saving,
    code: d.code,
    readOn: d.verified as string,
    readOnLabel: formatReading(d.verified as string),
    host: src && "readOff" in src ? hostOf(src.readOff) : null,
    noPage: src && "noPublicPage" in src ? src.noPublicPage : null,
  };
});

const HOME: Omit<HomeCategory, "readings" | "latest">[] = [
  { key: "weight-loss", label: "Weight loss", short: "WL", href: "/weight-loss", slot: 0 },
  { key: "hair-loss", label: "Hair loss", short: "HL", href: "/hair-loss", slot: 1 },
  { key: "pets", label: "Pet insurance", short: "PI", href: "/pet-insurance", slot: 2 },
  { key: "energy", label: "Solar and energy", short: "SE", href: "/solar-and-energy", slot: 3 },
  { key: "business", label: "Business software", short: "BS", href: "/business-software", slot: 4 },
  { key: "health-beauty", label: "Health and beauty", short: "HB", href: "/health-and-beauty", slot: 5 },
];

export const homeCategories: HomeCategory[] = HOME.map((c) => {
  const rs = verifiedOffers
    .filter((d) => FILE[d.category] === c.key)
    .map((d) => readings.find((r) => r.brand === d.brand)!)
    .sort((a, b) => b.readOn.localeCompare(a.readOn));
  return { ...c, readings: rs, latest: rs[0] ?? null };
});

/** The hero reading: the flagship offer, and the only one read off a page anyone can open. */
export const featured: Reading =
  readings.find((r) => r.brand === "Moshy") ?? readings.find((r) => r.host) ?? readings[0];

const byDate = [...readings].sort((a, b) => a.readOn.localeCompare(b.readOn));
export const oldest = byDate[0];
export const newest = byDate[byDate.length - 1];

/** Offers are re-checked within 60 days of their reading (RECHECK_AFTER_DAYS). */
export const RECHECK_DAYS = 60;
export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
/** The date by which the oldest reading must be re-read. Static, so it cannot go stale. */
export const recheckBy = addDays(oldest.readOn, RECHECK_DAYS);

/** Whole days between two ISO dates. */
export function dayGap(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/** "17 Aug". For scale labels where the year is carried once elsewhere. */
export function shortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", { day: "numeric", month: "short", timeZone: "UTC" });
}
