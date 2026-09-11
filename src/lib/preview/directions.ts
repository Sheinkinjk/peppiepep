/**
 * Shared content for the five homepage directions.
 *
 * All five render the same facts. Nothing here is written per direction except
 * the copy, which lives in each direction's own component because voice is part
 * of a direction. Everything below derives from `src/lib/offers` by read-only
 * import, so a figure cannot drift from the live table.
 *
 * TWO DELIBERATE EXCLUSIONS, both about not asserting a relationship we do not
 * have:
 *
 * 1. `public/partners/*.svg` holds HubSpot, Salesforce, Shopify, Mailchimp,
 *    Klaviyo, Attentive and Resend. None appears in offers.ts or
 *    affiliate-links.ts; they are integration marks left over from the retired
 *    SaaS platform. On a wall captioned "partners" they would assert commercial
 *    relationships that do not exist, which is ACL s29(1)(e). Not used.
 *
 * 2. `/logos/juniper.png` is 3840x2160 with `hasAlpha: no` at 22KB: an opaque
 *    banner, not a transparent logo. Beside seven transparent marks it renders
 *    as a white rectangle. It is in `partnerLogos` but is excluded from the wall
 *    here and listed in `logoDefects` instead.
 */

import {
  liveCategories,
  oldestReadingISO,
  verifiedOffers,
} from "@/lib/preview/data";

/* ---------------------------------------------------------------------------
   Categories.

   Six, because six is how many distinct categories carry a verified offer.
   The site navigates five hubs, so two offer categories share one hub; the
   mapping is explicit rather than inferred, and `hub` is the real href.
   --------------------------------------------------------------------------- */

const HUB_FOR: Record<string, string> = {
  "Weight loss": "/weight-loss",
  "Hair loss": "/hair-loss",
  Pets: "/pet-insurance",
  "Home batteries": "/solar-and-energy",
  "Landing pages": "/business-software",
  "Creator growth": "/business-software",
};

export type DirCategory = {
  key: string;
  /** the category as offers.ts names it */
  label: string;
  /** the hub it navigates to, and that hub's own label */
  hub: string;
  hubLabel: string;
  blurb: string;
  /** every brand in this category that carries a verified offer */
  brands: { name: string; logo: string; href: string }[];
  offerCount: number;
};

export const dirCategories: DirCategory[] = Array.from(
  new Set(verifiedOffers.map((d) => d.category)),
).map((label) => {
  const hub = HUB_FOR[label] ?? "/compare";
  const inCat = verifiedOffers.filter((d) => d.category === label);
  const hubMeta = liveCategories.find((c) => c.href === hub);
  return {
    key: label.toLowerCase().replace(/\s+/g, "-"),
    label,
    hub,
    hubLabel: hubMeta?.label ?? label,
    blurb: hubMeta?.blurb ?? "",
    brands: inCat.map((d) => ({ name: d.brand, logo: d.logo, href: d.href })),
    offerCount: inCat.length,
  };
});

/* ---------------------------------------------------------------------------
   The partner wall.

   The brands we actually hold a verified offer with, deduplicated. Eight rows
   in the table, eight brands on the wall, and the two numbers agree because
   they are the same array.
   --------------------------------------------------------------------------- */

export const wallBrands = Array.from(
  new Map(verifiedOffers.map((d) => [d.brand, { name: d.brand, logo: d.logo, href: d.href }])).values(),
);

/* ---------------------------------------------------------------------------
   Logo quality, measured rather than assumed.

   A logo shown at 28px needs 56 source pixels at 2x, so a 128px tile is fine
   in a table row and soft on a wall at 120px. `wallSafe` is the honest list of
   marks that hold up large; the rest are set at row size or as a wordmark.
   --------------------------------------------------------------------------- */

export const LOGO_PX: Record<string, number> = {
  "/logos/apollo-energy.png": 256,
  "/logos/knose.svg": Infinity,
  "/logos/petsonme.svg": Infinity,
  "/logos/unbounce.png": 651,
  "/logos/mosh-tile.png": 600,
  "/logos/leadpages.png": 128,
  "/logos/superfiliate.png": 128,
  "/logos/moshy.png": 128,
};

/** Source width needed to render crisply at `displayPx` on a 2x screen. */
export function isCrispAt(logo: string, displayPx: number): boolean {
  return (LOGO_PX[logo] ?? 0) >= displayPx * 2;
}

export const logoDefects = [
  {
    file: "/logos/juniper.png",
    fault: "3840x2160, hasAlpha: no, 22KB. An opaque banner, not a transparent mark.",
    fix: "Retrace from Juniper's own site, or drop Juniper from any wall until it exists.",
  },
  {
    file: "/logos/leadpages.png, /logos/superfiliate.png, /logos/moshy.png",
    fault: "128x128 square tiles. Crisp to 64px display, soft beyond it.",
    fix: "Fine in a table row. Set as a wordmark, not a tile, on a wall above 64px.",
  },
];

/* ---------------------------------------------------------------------------
   Codes. Four, and every one of them is real.
   --------------------------------------------------------------------------- */

export const liveCodes = verifiedOffers.filter((d) => Boolean(d.code));

export const oldestReading = oldestReadingISO;

export { verifiedOffers };
