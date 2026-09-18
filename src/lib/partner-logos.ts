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
 * serve its mark as a file we could fetch. OptiSlim's was found on 17 Sep 2026 in
 * its Shopify header srcset and is now in. Two remain: Technogym's asset host
 * returns 403 to everything, and Edible Beauty publishes no logo file we could
 * find (the only square asset in its header is a rotating promo banner, checked
 * and rejected rather than shipped). To add one, drop the file in public/logos
 * using EXACTLY these names and add the line here:
 *
 *   public/logos/technogym.png
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
  "/optislim": "/logos/optislim.svg",
  // Added 18 Sep 2026 for the hub redesign: these files were already in
  // public/logos (the homepage and /deals use them) but the hubs, reading only
  // this map, showed monograms for every health and pets partner.
  "/moshy": "/logos/moshy.png",
  "/juniper": "/logos/juniper.png",
  "/moshhair": "/logos/mosh-tile.png",
  "/dense": "/logos/dense.png",
  "/knose": "/logos/knose.svg",
  "/petsonme": "/logos/petsonme.svg",
  "/apollo-energy-group": "/logos/apollo-energy.png",
};

/** Accepts the brand's own route, e.g. "/foreo". */
export function partnerLogo(slug: string): string | undefined {
  return LOGOS[slug];
}
