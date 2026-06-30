import { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://referlabs.com.au';
const NOW  = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [

    // ── Core product ───────────────────────────────────────────────────
    { url: BASE,                         lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/referral-blueprint`, lastModified: NOW, changeFrequency: 'weekly',  priority: 0.98 },
    { url: `${BASE}/how-it-works`,       lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/faq`,                lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/guides`,             lastModified: NOW, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/how-we-research`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.55 },
    { url: `${BASE}/about`,              lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/contact`,            lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },

    // ── Blueprint by industry ──────────────────────────────────────────
    { url: `${BASE}/referral-blueprint-for-agencies`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/referral-blueprint-for-saas`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/referral-blueprint-for-ecommerce`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/referral-blueprint-for-coaches`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/referral-blueprint-for-creators`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },

    // ── Services ───────────────────────────────────────────────────────
    { url: `${BASE}/services`,                        lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/services/affiliate-distribution`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/services/referral-programs`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/services/apac-expansion`,         lastModified: NOW, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/services/influencer-activation`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/partner-activation`,     lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/services/product-distribution`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.68 },

    // ── Health affiliate pages ─────────────────────────────────────────
    { url: `${BASE}/moshy`,             lastModified: NOW, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/moshhair`,          lastModified: NOW, changeFrequency: 'weekly',  priority: 0.78 },
    { url: `${BASE}/dense`,             lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/apollopeptides`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/ascensionpeptides`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/biopeptitech`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.68 },

    // ── Website builders / AI tools ────────────────────────────────────
    { url: `${BASE}/carrd`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/durableai`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/butternut`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/swipepages`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.72 },

    // ── Creator / newsletter tools ─────────────────────────────────────
    { url: `${BASE}/beehiiv`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/incomelab`,  lastModified: NOW, changeFrequency: 'monthly', priority: 0.68 },

    // ── Comparison roundups ────────────────────────────────────────────
    { url: `${BASE}/best-website-builder`,                  lastModified: NOW, changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-newsletter-platform`,              lastModified: NOW, changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-peptide-supplier`,                 lastModified: NOW, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/best-weight-loss-telehealth-australia`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/best-hair-loss-treatment-australia`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-vs-juniper`,                      lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/comparison-website`,                    lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },

    // ── Blog ───────────────────────────────────────────────────────────
    { url: `${BASE}/blog`,                                            lastModified: NOW, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/blog/attorney-referral-fee-rules-state-guide`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/compliant-referral-network-law-firms`,       lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/consulting-firms-track-partner-referrals`,   lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/cpa-cross-referral-revenue-guide`,           lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/law-firm-generates-2m-referrals`,            lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/blog/best-affiliate-programs-australia-2026`,     lastModified: NOW, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/become-an-affiliate`,                              lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },

    // ── Integration pages ──────────────────────────────────────────────
    { url: `${BASE}/integrations`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/shopify`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.62 },
    { url: `${BASE}/webflow`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/hubspot`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },

    // ── Legal ──────────────────────────────────────────────────────────
    { url: `${BASE}/privacy`, lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/security`,lastModified: NOW, changeFrequency: 'yearly', priority: 0.3 },

    // /blueprint-access, /referral-blueprint/success, /dashboard, /login, /auth/* excluded (noIndex)
  ];
}
