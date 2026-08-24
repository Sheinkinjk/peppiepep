import { MetadataRoute } from 'next';
import { CATALOG } from '@/lib/catalog/catalog';
import { HAIR_LOSS_GUIDES } from '@/lib/hair-loss-guides';
import { APOLLO_GUIDES } from '@/lib/apollo-guides';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://referlabs.com.au';
// Deploy-trigger check, 19 Aug 2026: verifying git auto-deploy fires on a single
// isolated push. Rapid consecutive pushes earlier today produced deploys for some
// commits and not others.

// Credible per-page lastmod tiers (avoids the "everything changed today" signal
// that Google discounts). Bump the relevant tier when a page is genuinely edited.
const TODAY  = new Date('2026-08-19'); // TGA sweep + hub offer bands
const AUG13  = new Date('2026-08-13'); // previous batch // materially rewritten in this batch (Aug: TGA scrub, pricing, compliance, answer-first)
const NEW    = new Date('2026-07-22'); // published/edited in the current batch
const FRESH  = new Date('2026-07-07'); // redesigned / new this release
const RECENT = new Date('2026-05-20'); // updated within the last few weeks
const STABLE = new Date('2026-03-10'); // company/service pages, rarely change
const LEGAL  = new Date('2026-01-15'); // legal, changes yearly

export default function sitemap(): MetadataRoute.Sitemap {
  return [

    // ── Core platform ──────────────────────────────────────────────────
    { url: BASE,                         lastModified: FRESH,  changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/weight-loss`,        lastModified: TODAY,  changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/hair-loss`,          lastModified: TODAY,  changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/coming-soon`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.6 },
    // Longevity (19 Aug 2026). Recovery, diagnostics and supplements.
    { url: `${BASE}/longevity`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/longevity/recovery`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/longevity/diagnostics`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/longevity/recovery/ice-bath-running-costs-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/longevity/recovery/ice-bath-comparison-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/longevity/recovery/home-sauna-cost-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/longevity/recovery/infrared-vs-traditional-sauna-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/longevity/recovery/contrast-therapy-what-the-evidence-says`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/longevity/recovery/recovery-setup-quiz`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.62 },
    { url: `${BASE}/longevity/diagnostics/whole-body-mri-australia-cost`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/longevity/diagnostics/everlab-vs-prenuvo-vs-i-screen-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/longevity/diagnostics/biological-age-testing-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/longevity/diagnostics/cgm-for-non-diabetics-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/longevity/diagnostics/health-screening-quiz`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.62 },
    { url: `${BASE}/longevity/supplements/longevity-supplements-evidence-review`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    // Men's health (19 Aug 2026). Clinical guides carry no commercial links.
    { url: `${BASE}/mens-health`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/mens-health/erectile-dysfunction-treatment-cost-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/mens-health/premature-ejaculation-treatment-options-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/mens-health/online-mens-health-clinics-compared`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/mens-health/is-telehealth-or-a-gp-cheaper-for-mens-health`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/mens-health/sexual-wellness-products`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/mens-health/mens-health-quiz`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.65 },
    // Sleep (19 Aug 2026). Category live and indexed ahead of partners.
    { url: `${BASE}/sleep`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/sleep/do-i-have-sleep-apnoea`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/sleep/home-sleep-test-australia-cost`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/sleep/cpap-machine-costs-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },
    { url: `${BASE}/sleep/mattress-comparison-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/sleep/sleep-tracker-comparison-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/sleep/how-much-does-good-sleep-cost`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.68 },
    // Skin & beauty (19 Aug 2026). Category live and indexed ahead of partners.
    { url: `${BASE}/skin-and-beauty`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/skin-and-beauty/retinol-vs-prescription-strength-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/skin-and-beauty/led-face-mask-comparison-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/skin-and-beauty/best-value-skincare-australia-cost-per-use`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/skin-and-beauty/acne-treatment-options-and-costs-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/skin-and-beauty/anti-ageing-treatments-what-they-cost`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/skin-and-beauty/skincare-quiz`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/for-business`,       lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.7 },
    // Programmatic category hubs (auto-generated from the catalog)
    ...CATALOG.map((v) => ({
      url: `${BASE}/compare/${v.slug}`,
      lastModified: FRESH,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    { url: `${BASE}/faq`,                lastModified: STABLE, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/guides`,             lastModified: AUG13,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/deals`,              lastModified: AUG13,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/business-software`,  lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/pet-insurance`,  lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/knose`,  lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/petsonme`,  lastModified: AUG13,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/best-pet-insurance-australia`,  lastModified: AUG13,  changeFrequency: 'weekly',  priority: 0.86 },
    { url: `${BASE}/knose-vs-petsonme`,  lastModified: AUG13,  changeFrequency: 'weekly',  priority: 0.84 },
    { url: `${BASE}/who-underwrites-pet-insurance-australia`, lastModified: FRESH, changeFrequency: 'monthly',  priority: 0.75 },
    { url: `${BASE}/what-pet-insurance-covers-australia`,  lastModified: FRESH,  changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${BASE}/about`,              lastModified: AUG13, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,            lastModified: STABLE, changeFrequency: 'monthly', priority: 0.6 },

    // ── Business lending: withdrawn from the sitemap, 22 August 2026 ──────
    // The vertical is hidden pending a review of the credit-licensing position
    // and because it never found traction. The routes temporarily redirect (see
    // next.config.ts), and a redirecting URL must never appear here: it tells
    // Google to crawl a page we are simultaneously sending away. /how-we-make-money
    // stays, because it is a sitewide trust page that only happened to live in
    // this block.
    //
    // To restore: put this block back, and delete the lending redirects in
    // next.config.ts. LENDERS, LENDER_COMPARISONS and INTENT_PAGES are untouched.
    { url: `${BASE}/how-we-make-money`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.5 },


    // ── Services ───────────────────────────────────────────────────────

    // ── Portable power (EcoFlow + Anker SOLIX, both Commission Factory) ─
    { url: `${BASE}/portable-power-station-australia`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/ecoflow-vs-anker-solix`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/ecoflow`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/anker-solix`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/portable-vs-installed-home-battery-australia`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.8 },

    // ── Apollo Energy (VIP money page) ────────────────────────────────
    { url: `${BASE}/apollo-energy-group`, lastModified: AUG13, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/apollo-energy-review`, lastModified: AUG13, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/home-battery-rebate-australia`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/home-battery-rebate-by-state-australia`, lastModified: AUG13, changeFrequency: "weekly", priority: 0.88 },
    { url: `${BASE}/virtual-power-plant-australia`, lastModified: AUG13, changeFrequency: "weekly", priority: 0.82 },
    { url: `${BASE}/home-battery-cost-australia`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/home-battery-payback-calculator`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.88 },

    // ── Health affiliate pages (redesigned this release) ───────────────
    { url: `${BASE}/moshy`,             lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.92 },
    { url: `${BASE}/juniper`,           lastModified: AUG13, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/moshy-review`,      lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/moshy-eligibility`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/getmoshy`,          lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-vs-gp`,       lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-alternatives`,lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/weight-loss-telehealth-men-australia`,   lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/weight-loss-telehealth-women-australia`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/online-weight-loss-programs-australia`,  lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/mens-health-telehealth-australia`,       lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/weight-loss-telehealth-cost-australia`,  lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/weight-loss-cost-calculator`,            lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/weight-loss-quiz`,                       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/online-weight-loss-doctor-australia`,    lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/moshhair`,          lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.78 },
    { url: `${BASE}/mosh-review`,        lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    // The medicine-name slugs (/finasteride-australia, /minoxidil-australia,
    // /finasteride-vs-minoxidil-australia, /how-long-does-finasteride-take-to-work-australia)
    // 301-redirect to /hair-loss for TGA compliance, so they are kept out of the sitemap.
    { url: `${BASE}/hair-loss-treatment-cost-australia`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    // Hair-loss guide cluster (generated from the registry)
    ...HAIR_LOSS_GUIDES.filter((g) => !g.meta?.noIndex).map((g) => ({
      url: `${BASE}${g.slug}`,
      lastModified: NEW,
      changeFrequency: 'monthly' as const,
      priority: g.priority,
    })),
    // Home-battery guide cluster (generated from the registry)
    ...APOLLO_GUIDES.map((g) => ({
      url: `${BASE}${g.slug}`,
      lastModified: NEW,
      changeFrequency: 'monthly' as const,
      priority: g.priority,
    })),
    { url: `${BASE}/dense`,             lastModified: FRESH, changeFrequency: 'monthly', priority: 0.7 },

    // ── Website builders / AI tools (redesigned this release) ──────────
    { url: `${BASE}/carrd`,      lastModified: AUG13, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/durableai`,  lastModified: AUG13, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/butternut`,  lastModified: AUG13, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/swipepages`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.72 },

    // ── Creator / newsletter tools (redesigned this release) ───────────
    { url: `${BASE}/beehiiv`,    lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },

    // ── AI sales & automation tools (new this release) ─────────────────
    { url: `${BASE}/gohighlevel`,        lastModified: AUG13, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/aisdr`,              lastModified: AUG13, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/replyio`,            lastModified: AUG13, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/fullenrich`,         lastModified: AUG13, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/employmenthero`,     lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/best-ai-sales-tools`,lastModified: AUG13, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/best-crm-small-business-australia`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },

    // ── Email / e-commerce / landing pages / affiliate software ────────
    { url: `${BASE}/brevo`,        lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/alidrop`,      lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/leadpages`,    lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/krispcall`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/dext`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/trainual`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/lindy`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/elevenlabs`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/wing-assistant`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/survicate`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/nutshell`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/pipedrive`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/activecampaign`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/hellobar`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/outgrow`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/flexiquiz`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/landingi`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/unbounce`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/superfiliate`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/affiliate-software-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/keap`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/capsule`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/beautifulai`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pandadoc`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/blinq`, lastModified: AUG13, changeFrequency: 'monthly', priority: 0.78 },

    // ── Polymarket guides (prediction markets cluster) ─────────────────

    // ── Comparison roundups ────────────────────────────────────────────
    { url: `${BASE}/best-website-builder`,                  lastModified: AUG13,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-newsletter-platform`,              lastModified: AUG13,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-weight-loss-telehealth-australia`, lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/weight-loss-treatment-eligibility-australia`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/best-hair-loss-treatment-australia`,    lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-vs-juniper`,                      lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/moshy-vs-pilot`,                        lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/cheapest-weight-loss-telehealth-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/carrd-vs-durable`,                      lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.74 },
    { url: `${BASE}/durable-vs-butternut`,                  lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/carrd-vs-butternut`,                    lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/mosh-vs-dense`,                         lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/mosh-vs-pilot`,                         lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/comparison-website`,                    lastModified: RECENT, changeFrequency: 'monthly', priority: 0.7 },

    // ── Affiliate programs cluster (hub + 3 spokes) ────────────────────
    { url: `${BASE}/affiliate-programs-australia`,             lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/affiliate-earnings-calculator`,            lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/website-builder-quiz`,             lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/ai-sales-tools-quiz`,              lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/newsletter-platform-quiz`,         lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/hair-loss-quiz`,                   lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/high-paying-affiliate-programs`,           lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/recurring-affiliate-programs`,             lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/how-to-start-affiliate-marketing-australia`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },

    // ── Blog ───────────────────────────────────────────────────────────
    // /blog and its 5 posts removed: all noIndex. They are content marketing for the
    // retired referral platform, written for a US audience (state-by-state attorney
    // fee rules, CPA ethics, a law-firm case study), orphaned from the site chrome.
    // On a young AU domain, crawl budget belongs on the health + software money pages.

    // /blog/best-affiliate-programs-australia-2026 removed: it 301s to
    // /affiliate-programs-australia (next.config.ts), which is already listed above.
    // Advertising both the redirect source and its target wastes crawl budget.

    // Integration pages (/integrations, /shopify, /webflow, /hubspot) removed: all
    // noIndex. Listing a noIndex URL tells Google to crawl a page we also tell it to
    // drop, which is self-contradictory and burns crawl budget on a young domain.

    // ── Legal ──────────────────────────────────────────────────────────
    { url: `${BASE}/privacy`, lastModified: AUG13, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: LEGAL, changeFrequency: 'yearly', priority: 0.3 },
    // /security removed: noIndex (retired SaaS trust page).

    // Excluded as noIndex: /blueprint-access, /referral-blueprint/success, /dashboard,
    // /login, /auth/*, /security, /integrations + children.
  ];
}
