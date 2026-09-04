/**
 * Destinations for /go/<slug>, the attribution wrapper in src/app/go/[slug].
 *
 * One entry per PLACEMENT, not per partner. The slug carries the page a click
 * came from, which is the only way we can attribute a Midoc conversion to a
 * page: Midoc's `?ref=` is a single account-level code and their dashboard
 * cannot tell our pages apart.
 *
 * DESTINATION IS HOMEPAGE-ONLY, DELIBERATELY, until Midoc confirm otherwise.
 * Checked 3 Sep 2026: midoc.com.au/telehealth?ref=ytvpnchm returns 200 and the
 * parameter survives in the URL, but the response sets no referral cookie. The
 * only Set-Cookie values are Wix SSR caching, Cloudflare's bot cookie and
 * sec-fetch-unsupported. Their attribution is therefore client-side, and cannot
 * be confirmed from a server response. Deep-linking on that assumption risks
 * losing the commission entirely, which is a worse failure than a longer path,
 * so every placement points at the homepage and the page copy does the work of
 * telling a reader which service to pick.
 *
 * To switch to deep links once confirmed: change the values here only. No page
 * or component changes.
 */
const MIDOC_HOME = "https://www.midoc.com.au/?ref=ytvpnchm";

/**
 * Commission Factory partners are routed through /go as well, so every partner
 * on the site has one attribution shape rather than two. CF still receives its
 * own cfclick, and AffiliateClickTracker still appends UniqueId at click time.
 *
 * Swapping the Foreo merchant is a value change here and nothing else: the
 * pages take providers as data. If Adore Beauty, Shaver Shop or Activeskin turn
 * out to be on CF, their link replaces this line.
 *
 * Destinations verified 4 Sep 2026: both resolve 200 with CF tracking intact.
 */
const EDIBLE_BEAUTY = "https://t.cfjump.com/94361/t/76712";
const AUSSIE_HEALTH = "https://t.cfjump.com/94361/t/14839";

/**
 * Points at the UFO PRODUCT page, not foreo.com/red-light-therapy.
 *
 * Changed 4 Sep 2026. Under the Therapeutic Goods Act a good is a therapeutic
 * good if it is "represented in any way" to be for therapeutic use, and the
 * representation can be made by whoever publishes it. Routing our commission
 * traffic through a URL whose own path asserts "red light therapy" put that
 * representation inside our advertisement rather than only on Foreo's site.
 * The product page carries the same range and the same tracking; both were
 * confirmed to resolve 200 with cfclick intact on 4 Sep 2026.
 *
 * Same principle as the Midoc denial: we do not repeat a claim we would not
 * publish, and we do not route to the page that makes it.
 */
const FOREO_UFO =
  "https://t.cfjump.com/94361/t/60709?Url=https%3a%2f%2fwww.foreo.com%2fufo";
const FOREO_LUNA =
  "https://t.cfjump.com/94361/t/60709?Url=https%3a%2f%2fwww.foreo.com%2fluna-collection";

export const GO_DESTINATIONS: Record<string, string> = {
  "midoc-telehealth-vs-gp": MIDOC_HOME,
  "midoc-mens-health-hub": MIDOC_HOME,
  "midoc-clinics-compared": MIDOC_HOME,
  "midoc-premature-ejaculation": MIDOC_HOME,
  "midoc-hair-loss": MIDOC_HOME,
  "midoc-brand-page": MIDOC_HOME,
  "midoc-medical-certificate": MIDOC_HOME,
  "midoc-online-prescription": MIDOC_HOME,
  "foreo-led-masks": FOREO_UFO,
  "foreo-skin-hub": FOREO_LUNA,
  "foreo-anti-ageing": FOREO_UFO,
  "foreo-luna-vs-ufo": FOREO_LUNA,
  "edible-beauty-natural-skincare": EDIBLE_BEAUTY,
  "aussie-health-natural-skincare": AUSSIE_HEALTH,
  "edible-beauty-acne": EDIBLE_BEAUTY,
  "edible-beauty-cost-per-use": EDIBLE_BEAUTY,
  "edible-beauty-retinol-otc": EDIBLE_BEAUTY,
  "edible-beauty-skin-hub": EDIBLE_BEAUTY,
  "edible-beauty-skincare-quiz": EDIBLE_BEAUTY,
  "aussie-health-cost-per-use": AUSSIE_HEALTH,
  "aussie-health-skin-hub": AUSSIE_HEALTH,
  "midoc-sexual-wellness": MIDOC_HOME,
  "midoc-mens-health-quiz": MIDOC_HOME,
  // No mental-health placement: Midoc describe that line as fully bulk billed,
  // so there is no purchase to earn a commission on.
  // No erectile-dysfunction placement: Midoc's sexual-health line is scoped to
  // STI/STD on their own site and does not name ED. The slot on that page is
  // reserved and empty until a partner covers it.
};
