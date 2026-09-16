/**
 * Partner logo files, in one place so a hub and a brand page cannot disagree.
 *
 * Only brands whose file actually exists in public/logos are listed. A missing
 * entry renders the monogram fallback, which is deliberate: a `logo` prop
 * pointing at a file that is not there renders a broken image, which looks worse
 * than no logo at all.
 *
 * Pulled from each vendor's own site on 16 Sep 2026 rather than recreated, per
 * the onboarding rule. Three are still outstanding because the brand does not
 * serve its mark as a file we could fetch: Technogym and OptiSlim render theirs
 * as inline SVG or a CSS background, and Edible Beauty's only square asset was a
 * 16px favicon. To add one, drop the file in public/logos using EXACTLY these
 * names and add the line here:
 *
 *   public/logos/technogym.png
 *   public/logos/optislim.png
 *   public/logos/edible-beauty.png
 *
 * Square, transparent, about 256px. Edible Beauty's supplied artwork is white
 * type on black; on our white cards that needs the black tile kept or the type
 * recoloured to its own dark hex, never dropped onto white as-is.
 */
const LOGOS: Record<string, string> = {
  "/foreo": "/logos/foreo.svg",
  "/emma-sleep": "/logos/emma-sleep.svg",
  "/aussie-health-products": "/logos/aussie-health-products.png",
};

/** Accepts the brand's own route, e.g. "/foreo". */
export function partnerLogo(slug: string): string | undefined {
  return LOGOS[slug];
}
