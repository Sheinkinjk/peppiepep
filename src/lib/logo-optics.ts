/**
 * Optical scale for partner logos shown in rows (the /deals table, the programs grid,
 * the AI sales tools list). Uniform boxes make wide wordmarks read small and dense
 * square marks read heavy. Each value comes from the PNG itself on 14 Sep 2026:
 * trimmed ink box, aspect and ink density, scaled so rendered visual weight meets the
 * median, capped so the mark stays inside its 40px well. Logos not listed render at 1.
 * Re-derive if a logo file is replaced.
 */
const SCALE: Record<string, number> = {
  // Health & Beauty / Sleep partners, added 16 Sep 2026 with the files
  // themselves. These are wide wordmarks, so they read small in a uniform well
  // and are scaled up; Aussie Health ships a square tile that already fills it.
  //
  // CAP AT ~1.2 FOR THESE. The well is 44px around a 32px mark, so a scale past
  // roughly 1.25 pushes the artwork wider than its container and the well clips
  // it. Foreo shipped at 1.42 on 16 Sep and rendered as "FOREC SWEDEN" with the
  // last letter cut off. Look at the logo after changing a scale.
  "aussie-health-products.png": 1.0,
  "emma-sleep.svg": 1.18,
  // i-screen, 23 Sep 2026. Their own 1280x191 wordmark, about 6.7:1 and the widest
  // mark on the site, so it sits at the 1.2 cap rather than above it.
  "i-screen.svg": 1.2,
  "optislim.svg": 1.2,
  "foreo.svg": 1.12,
  // Hub partners, 18 Sep 2026, matched by eye to the homepage's optical sizes
  // (src/lib/home/content.ts logoOptical) and kept under the 1.2 cap above.
  "apollo-energy.png": 0.86,
  "activecampaign.png": 0.94,
  "aisdr.png": 1.18,
  "alohi.png": 1.36,
  "anker-solix.png": 1.45,
  "beautifulai.png": 0.94,
  "blinq.png": 1.3,
  "butternut.png": 0.94,
  "capsule.png": 1.3,
  "cloudtalk.png": 1.22,
  "cometchat.png": 1.3,
  "databox.png": 1.36,
  "dext.png": 1.25,
  "ecoflow.png": 1.62,
  "flexiquiz.png": 0.94,
  "flocksy.png": 1.23,
  "fullenrich.png": 1.06,
  "gohighlevel.png": 0.94,
  "gusto.png": 1.11,
  "hellobar.png": 0.94,
  "incomelab.png": 1.15,
  "instapage.png": 1.09,
  "juniper.png": 1.26,
  "keap.png": 1.27,
  "kit.png": 0.94,
  "krispcall.png": 0.94,
  "lumi.png": 0.94,
  "meetgeek.png": 0.94,
  "melio.png": 1.11,
  "mosh-tile.png": 0.94,
  "moshy.png": 1.38,
  "nutshell.png": 0.94,
  "outgrow.png": 0.94,
  "pandadoc.png": 1.33,
  "pipedrive.png": 1.26,
  "prospa.png": 0.94,
  "shift.png": 1.15,
  "snov.png": 1.26,
  "superfiliate.png": 0.94,
  "survicate.png": 1.06,
  "unbounce.png": 1.36,
  "zoominfo.png": 0.94,
};

/** Accepts a filename or a /logos/... path. */
export function logoScale(src: string): number {
  return SCALE[src.split("/").pop() ?? ""] ?? 1;
}
