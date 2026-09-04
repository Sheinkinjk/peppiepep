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
 * Destination verified 3 Sep 2026: resolves 200 to foreo.com/red-light-therapy
 * with CF tracking intact.
 */
const FOREO_RED_LIGHT =
  "https://t.cfjump.com/94361/t/60709?Url=https%3a%2f%2fwww.foreo.com%2fred-light-therapy";

export const GO_DESTINATIONS: Record<string, string> = {
  "midoc-telehealth-vs-gp": MIDOC_HOME,
  "midoc-mens-health-hub": MIDOC_HOME,
  "midoc-clinics-compared": MIDOC_HOME,
  "midoc-premature-ejaculation": MIDOC_HOME,
  "midoc-hair-loss": MIDOC_HOME,
  "midoc-brand-page": MIDOC_HOME,
  "foreo-led-masks": FOREO_RED_LIGHT,
  "foreo-skin-hub": FOREO_RED_LIGHT,
  // No mental-health placement: Midoc describe that line as fully bulk billed,
  // so there is no purchase to earn a commission on.
  // No erectile-dysfunction placement: Midoc's sexual-health line is scoped to
  // STI/STD on their own site and does not name ED. The slot on that page is
  // reserved and empty until a partner covers it.
};
