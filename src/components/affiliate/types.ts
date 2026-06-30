export interface AffiliateSection {
  heading: string;
  paragraphs: string[];
  disclaimer?: string;
  hasCta?: boolean;
  ctaText?: string;
}

export interface AffiliateStep {
  num: string;
  heading: string;
  body: string;
}

export interface AffiliateFaq {
  q: string;
  a: string;
}

export interface AffiliateRelatedLink {
  /** Internal site path, e.g. "/best-weight-loss-telehealth-australia" */
  href: string;
  /** Link label */
  label: string;
  /** Short supporting line shown under the label */
  desc: string;
}

export interface AffiliatePageConfig {
  /** Display brand name, e.g. "Dense Hair Experts" */
  brand: string;

  /** Small badge label shown in hero, e.g. "Australia" or "Hair Care" */
  badgeText: string;

  /** Full affiliate destination URL */
  affiliateUrl: string;

  /**
   * Answer-first summary (2-3 sentences) that directly answers the page's core
   * query. Rendered prominently near the top for AI answer engines (GEO),
   * featured snippets, and voice. Lead with the answer, not context.
   */
  quickAnswer?: string;

  /**
   * Human-readable "last reviewed" date (e.g. "June 2026") shown in the byline.
   * Signals freshness and editorial ownership (E-E-A-T). Defaults site-wide.
   */
  lastReviewed?: string;

  // ── Optional fields used by the premium standalone landing template ──────────
  /** Small eyebrow above the H1, e.g. "Weight-loss telehealth · Australia · 2026" */
  eyebrow?: string;
  /** Editorial rating shown in the at-a-glance card and verdict, e.g. "4.4" */
  rating?: string;
  /** Read-time label, e.g. "6 min read" */
  readTime?: string;
  /** Scannable "at a glance" facts shown in the hero sidebar card */
  atAGlance?: { k: string; v: string }[];
  /** Trust-strip items shown under the hero */
  trustStrip?: string[];
  /** Editorial verdict paragraph (the "bottom line") */
  verdict?: string;
  /** Verdict supporting bullets */
  verdictPoints?: string[];
  /** Optional pull-quote rendered in the body */
  pullQuote?: string;

  hero: {
    /** Full H1 text before the highlighted span */
    h1Prefix: string;
    /** Highlighted part of H1 (rendered in cyan) */
    h1Highlight: string;
    subheading: string;
    trustBullets: string[];
  };

  /** Redirect banner copy */
  banner: {
    heading: string;
    body: string;
    buttonLabel: string;
  };

  /** Ordered content sections rendered between hero and FAQ */
  sections: AffiliateSection[];

  /** 4-step process */
  steps: AffiliateStep[];

  /** "Why use this page" bullets */
  whyUseThis: string[];

  /** FAQ pairs */
  faqs: AffiliateFaq[];

  /**
   * Visible breadcrumb trail (matches the page's BreadcrumbList JSON-LD).
   * The final crumb is the current page and is not linked.
   * Defaults to Refer Labs > Guides > {brand} when omitted.
   */
  breadcrumb?: { label: string; href?: string }[];

  /**
   * Internal cross-links to related guides / comparison pages.
   * Drives crawl depth, topical clustering, and alternate conversion paths.
   */
  relatedLinks?: AffiliateRelatedLink[];

  ctas: {
    /** Primary hero button */
    primary: string;
    /** Secondary hero button */
    secondary: string;
    /** Mid-page CTA section heading */
    midHeading: string;
    /** Mid-page CTA section body */
    midBody: string;
    /** Mid-page button */
    midButton: string;
    /** Bottom CTA heading */
    bottomHeading: string;
    /** Bottom CTA body */
    bottomBody: string;
    /** Bottom button */
    bottomButton: string;
  };

  /** Shown below bottom CTA in small print */
  disclaimer: string;
}
