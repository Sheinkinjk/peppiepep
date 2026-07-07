import { MetadataRoute } from 'next';
import { CATALOG } from '@/lib/catalog/catalog';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://referlabs.com.au';

// Credible per-page lastmod tiers (avoids the "everything changed today" signal
// that Google discounts). Bump the relevant tier when a page is genuinely edited.
const FRESH  = new Date('2026-07-07'); // redesigned / new this release
const RECENT = new Date('2026-05-20'); // updated within the last few weeks
const STABLE = new Date('2026-03-10'); // company/service pages, rarely change
const BLOG   = new Date('2026-01-12'); // evergreen B2B posts
const LEGAL  = new Date('2026-01-15'); // legal, changes yearly

export default function sitemap(): MetadataRoute.Sitemap {
  return [

    // ── Core platform ──────────────────────────────────────────────────
    { url: BASE,                         lastModified: FRESH,  changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/weight-loss`,        lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/hair-loss`,          lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/for-business`,       lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.7 },
    // Programmatic category hubs (auto-generated from the catalog)
    ...CATALOG.map((v) => ({
      url: `${BASE}/compare/${v.slug}`,
      lastModified: FRESH,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    { url: `${BASE}/referral-blueprint`, lastModified: RECENT, changeFrequency: 'weekly',  priority: 0.98 },
    { url: `${BASE}/faq`,                lastModified: STABLE, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/guides`,             lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/how-we-research`,    lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.55 },
    { url: `${BASE}/about`,              lastModified: STABLE, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/contact`,            lastModified: STABLE, changeFrequency: 'monthly', priority: 0.6 },

    // ── Blueprint by industry ──────────────────────────────────────────
    { url: `${BASE}/referral-blueprint-for-agencies`,  lastModified: RECENT, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/referral-blueprint-for-saas`,      lastModified: RECENT, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/referral-blueprint-for-ecommerce`, lastModified: RECENT, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/referral-blueprint-for-coaches`,   lastModified: RECENT, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/referral-blueprint-for-creators`,  lastModified: RECENT, changeFrequency: 'monthly', priority: 0.85 },

    // ── Services ───────────────────────────────────────────────────────
    { url: `${BASE}/services`,                        lastModified: STABLE, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/services/affiliate-distribution`, lastModified: STABLE, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/services/referral-programs`,      lastModified: STABLE, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/services/apac-expansion`,         lastModified: STABLE, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/services/partner-activation`,     lastModified: STABLE, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/product-distribution`,   lastModified: STABLE, changeFrequency: 'monthly', priority: 0.68 },

    // ── Health affiliate pages (redesigned this release) ───────────────
    { url: `${BASE}/moshy`,             lastModified: FRESH, changeFrequency: 'weekly',  priority: 0.92 },
    { url: `${BASE}/moshy-review`,      lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/moshy-eligibility`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/getmoshy`,          lastModified: FRESH, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-vs-gp`,       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-alternatives`,lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/juniper-alternatives`,lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/weight-loss-telehealth-men-australia`,   lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/online-weight-loss-programs-australia`,  lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/mens-health-telehealth-australia`,       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/weight-loss-injections-australia`,       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/glp-1-weight-loss-australia`,            lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/weight-loss-telehealth-cost-australia`,  lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/online-weight-loss-doctor-australia`,    lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/moshhair`,          lastModified: FRESH, changeFrequency: 'weekly',  priority: 0.78 },
    { url: `${BASE}/dense`,             lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/apollopeptides`,    lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/ascensionpeptides`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/biopeptitech`,      lastModified: FRESH, changeFrequency: 'monthly', priority: 0.68 },

    // ── Website builders / AI tools (redesigned this release) ──────────
    { url: `${BASE}/carrd`,      lastModified: FRESH, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/durableai`,  lastModified: FRESH, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/butternut`,  lastModified: FRESH, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/swipepages`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.72 },

    // ── Creator / newsletter tools (redesigned this release) ───────────
    { url: `${BASE}/beehiiv`,    lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/incomelab`,  lastModified: FRESH, changeFrequency: 'monthly', priority: 0.68 },

    // ── AI sales & automation tools (new this release) ─────────────────
    { url: `${BASE}/gohighlevel`,        lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/aisdr`,              lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/replyio`,            lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/fullenrich`,         lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/employmenthero`,     lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/best-ai-sales-tools`,lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },

    // ── Comparison roundups ────────────────────────────────────────────
    { url: `${BASE}/best-website-builder`,                  lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-newsletter-platform`,              lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-peptide-supplier`,                 lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/best-weight-loss-telehealth-australia`, lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/best-hair-loss-treatment-australia`,    lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-vs-juniper`,                      lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/moshy-vs-pilot`,                        lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/cheapest-weight-loss-telehealth-australia`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/carrd-vs-durable`,                      lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.74 },
    { url: `${BASE}/durable-vs-butternut`,                  lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/apollo-vs-ascension`,                   lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/carrd-vs-butternut`,                    lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/apollo-vs-biopeptitech`,                lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/ascension-vs-biopeptitech`,             lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/mosh-vs-dense`,                         lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/mosh-vs-pilot`,                         lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/comparison-website`,                    lastModified: RECENT, changeFrequency: 'monthly', priority: 0.7 },

    // ── Affiliate programs cluster (hub + 3 spokes) ────────────────────
    { url: `${BASE}/affiliate-programs-australia`,             lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/high-paying-affiliate-programs`,           lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/recurring-affiliate-programs`,             lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/how-to-start-affiliate-marketing-australia`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },

    // ── Blog ───────────────────────────────────────────────────────────
    { url: `${BASE}/blog`,                                            lastModified: RECENT, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog/attorney-referral-fee-rules-state-guide`,    lastModified: BLOG,   changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/compliant-referral-network-law-firms`,       lastModified: BLOG,   changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/consulting-firms-track-partner-referrals`,   lastModified: BLOG,   changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/cpa-cross-referral-revenue-guide`,           lastModified: BLOG,   changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/law-firm-generates-2m-referrals`,            lastModified: BLOG,   changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/best-affiliate-programs-australia-2026`,     lastModified: RECENT, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/become-an-affiliate`,                              lastModified: RECENT, changeFrequency: 'monthly', priority: 0.85 },

    // ── Integration pages ──────────────────────────────────────────────
    { url: `${BASE}/integrations`, lastModified: STABLE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/shopify`,      lastModified: STABLE, changeFrequency: 'monthly', priority: 0.62 },
    { url: `${BASE}/webflow`,      lastModified: STABLE, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/hubspot`,      lastModified: STABLE, changeFrequency: 'monthly', priority: 0.6 },

    // ── Legal ──────────────────────────────────────────────────────────
    { url: `${BASE}/privacy`, lastModified: LEGAL, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: LEGAL, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/security`,lastModified: LEGAL, changeFrequency: 'yearly', priority: 0.3 },

    // /blueprint-access, /referral-blueprint/success, /dashboard, /login, /auth/* excluded (noIndex)
  ];
}
