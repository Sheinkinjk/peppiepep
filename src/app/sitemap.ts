import { MetadataRoute } from 'next';
import { CATALOG } from '@/lib/catalog/catalog';
import { LENDERS } from '@/lib/lenders';
import { INTENT_PAGES } from '@/lib/lending-intent';
import { LENDER_COMPARISONS } from '@/lib/lender-comparisons';
import { HAIR_LOSS_GUIDES } from '@/lib/hair-loss-guides';
import { APOLLO_GUIDES } from '@/lib/apollo-guides';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://referlabs.com.au';

// Credible per-page lastmod tiers (avoids the "everything changed today" signal
// that Google discounts). Bump the relevant tier when a page is genuinely edited.
const TODAY  = new Date('2026-07-28'); // materially rewritten in this batch
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
    { url: `${BASE}/hair-loss`,          lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/for-business`,       lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.7 },
    // Programmatic category hubs (auto-generated from the catalog)
    ...CATALOG.map((v) => ({
      url: `${BASE}/compare/${v.slug}`,
      lastModified: FRESH,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    { url: `${BASE}/faq`,                lastModified: STABLE, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/guides`,             lastModified: TODAY,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/deals`,              lastModified: TODAY,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/business-software`,  lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/pet-insurance`,  lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/knose`,  lastModified: FRESH,  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/what-pet-insurance-covers-australia`,  lastModified: FRESH,  changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${BASE}/about`,              lastModified: TODAY, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,            lastModified: STABLE, changeFrequency: 'monthly', priority: 0.6 },

    // ── Business lending (lead-capture vertical; admin/api never listed) ─
    { url: `${BASE}/business-loans`,                            lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/business-loan-calculator`,                  lastModified: NEW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/what-a-business-loan-actually-costs`,       lastModified: NEW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/equipment-finance-instant-asset-write-off`, lastModified: NEW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/how-we-make-money`,                         lastModified: TODAY, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/true-cost-of-business-loans-australia`,     lastModified: NEW, changeFrequency: 'monthly', priority: 0.82 },
    // Lender pages, generated from the config (adding a lender = one config entry)
    ...LENDERS.flatMap((l) => [
      { url: `${BASE}/business-loans/${l.slug}`,        lastModified: TODAY, changeFrequency: 'monthly' as const, priority: 0.78 },
      { url: `${BASE}/business-loans/${l.slug}/review`, lastModified: TODAY, changeFrequency: 'monthly' as const, priority: 0.72 },
    ]),
    // Lender head-to-head comparisons
    ...LENDER_COMPARISONS.map((c) => ({ url: `${BASE}/compare-business-lenders/${c.slug}`, lastModified: TODAY, changeFrequency: 'monthly' as const, priority: c.priority })),
    // Intent + explainer pages, generated from the registry
    ...INTENT_PAGES.map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: NEW,
      changeFrequency: 'monthly' as const,
      priority: p.priority,
    })),


    // ── Services ───────────────────────────────────────────────────────

    // ── Apollo Energy (VIP money page) ────────────────────────────────
    { url: `${BASE}/apollo-energy-group`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/apollo-energy-review`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/home-battery-rebate-australia`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/home-battery-rebate-by-state-australia`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.88 },
    { url: `${BASE}/virtual-power-plant-australia`, lastModified: TODAY, changeFrequency: "weekly", priority: 0.82 },
    { url: `${BASE}/home-battery-cost-australia`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/home-battery-payback-calculator`, lastModified: FRESH, changeFrequency: "weekly", priority: 0.88 },

    // ── Health affiliate pages (redesigned this release) ───────────────
    { url: `${BASE}/moshy`,             lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.92 },
    { url: `${BASE}/juniper`,           lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/moshy-review`,      lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/moshy-eligibility`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/getmoshy`,          lastModified: FRESH, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-vs-gp`,       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-alternatives`,lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/weight-loss-telehealth-men-australia`,   lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/weight-loss-telehealth-women-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/online-weight-loss-programs-australia`,  lastModified: FRESH, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/mens-health-telehealth-australia`,       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/weight-loss-injections-australia`,       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/glp-1-weight-loss-australia`,            lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/weight-loss-telehealth-cost-australia`,  lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/weight-loss-cost-calculator`,            lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/weight-loss-quiz`,                       lastModified: FRESH, changeFrequency: 'monthly', priority: 0.88 },
    { url: `${BASE}/online-weight-loss-doctor-australia`,    lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/moshhair`,          lastModified: TODAY, changeFrequency: 'weekly',  priority: 0.78 },
    // /finasteride-australia and /minoxidil-australia removed: noindex (TGA
    // compliance, prescription-medicine topics), so kept out of the sitemap.
    { url: `${BASE}/hair-loss-treatment-cost-australia`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.8 },
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
    { url: `${BASE}/carrd`,      lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/durableai`,  lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/butternut`,  lastModified: TODAY, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/swipepages`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.72 },

    // ── Creator / newsletter tools (redesigned this release) ───────────
    { url: `${BASE}/beehiiv`,    lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },

    // ── AI sales & automation tools (new this release) ─────────────────
    { url: `${BASE}/gohighlevel`,        lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/aisdr`,              lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/replyio`,            lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/fullenrich`,         lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/employmenthero`,     lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/best-ai-sales-tools`,lastModified: TODAY, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/best-crm-small-business-australia`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },

    // ── Email / e-commerce / landing pages / affiliate software ────────
    { url: `${BASE}/brevo`,        lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/alidrop`,      lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/leadpages`,    lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/cloudtalk`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/krispcall`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/dext`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/trainual`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/lindy`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/elevenlabs`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/wing-assistant`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/survicate`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/nutshell`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/pipedrive`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/activecampaign`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/hellobar`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/outgrow`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/flexiquiz`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/landingi`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/superfiliate`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/keap`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/capsule`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/beautifulai`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pandadoc`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.82 },
    { url: `${BASE}/blinq`, lastModified: TODAY, changeFrequency: 'monthly', priority: 0.78 },

    // ── Polymarket guides (prediction markets cluster) ─────────────────

    // ── Comparison roundups ────────────────────────────────────────────
    { url: `${BASE}/best-website-builder`,                  lastModified: TODAY,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-newsletter-platform`,              lastModified: TODAY,  changeFrequency: 'weekly',  priority: 0.82 },
    { url: `${BASE}/best-weight-loss-telehealth-australia`, lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/best-hair-loss-treatment-australia`,    lastModified: TODAY,  changeFrequency: 'monthly', priority: 0.78 },
    { url: `${BASE}/moshy-vs-juniper`,                      lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/moshy-vs-pilot`,                        lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/cheapest-weight-loss-telehealth-australia`, lastModified: FRESH, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/carrd-vs-durable`,                      lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.74 },
    { url: `${BASE}/durable-vs-butternut`,                  lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/carrd-vs-butternut`,                    lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/mosh-vs-dense`,                         lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/mosh-vs-pilot`,                         lastModified: FRESH,  changeFrequency: 'monthly', priority: 0.8 },
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
    { url: `${BASE}/privacy`, lastModified: TODAY, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: LEGAL, changeFrequency: 'yearly', priority: 0.3 },
    // /security removed: noIndex (retired SaaS trust page).

    // Excluded as noIndex: /blueprint-access, /referral-blueprint/success, /dashboard,
    // /login, /auth/*, /security, /integrations + children.
  ];
}
