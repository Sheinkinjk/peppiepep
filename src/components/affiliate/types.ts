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
