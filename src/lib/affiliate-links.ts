/**
 * Single source of truth for outbound affiliate / referral destination URLs.
 *
 * Every page that links out to a partner MUST import its URL from here so that
 * tracking parameters can never drift between the brand page (e.g. /moshy) and
 * the comparison roundup (e.g. /best-weight-loss-telehealth-australia).
 *
 * If a partner changes their tracking link, update it once here.
 */

// ── Health: weight-loss telehealth (BIGGEST EARNER) ─────────────────────────
// Attribution VERIFIED in the Moshy / Commission Factory dashboard (July 2026) —
// clicks through this link credit Refer Labs. Single source of truth used by
// every Moshy CTA site-wide; re-check periodically and update here if it changes.
export const MOSHY_URL = "https://www.getmoshy.com.au/start/eligibility-check-moshy";

// ── Health: hair-loss telehealth ────────────────────────────────────────────
// Mosh tracks via the partner path /start/referlabs. Canonical across all pages.
export const MOSH_HAIR_URL = "https://www.getmosh.com.au/start/referlabs";

// ── Health: hair care ───────────────────────────────────────────────────────
export const DENSE_URL =
  "https://densehairexperts.myshopify.com?sca_ref=10755034.xwTupm6fuv&utm_source=affiliate-jarred-krowitz&utm_medium=affiliate-jarred-krowitz&utm_campaign=affiliate";

// ── Weight-loss comparison competitors (non-affiliate reference links) ───────
export const JUNIPER_URL = "https://www.myjuniper.com.au/";
export const BETTERBEING_URL = "https://www.betterbeinghealth.com.au/";

// ── Research peptides (research use only) ────────────────────────────────────
export const APOLLO_URL = "https://apollopeptidesciences.com/?rfsn=9019392.2de9e6";
export const ASCENSION_URL = "https://ascensionpeptides.com/ref/referlabs/";
export const BIOPEPTITECH_URL = "https://biopeptitech.com?sca_ref=10803823.hKusHK7NAR";

// ── Website builders / landing pages ─────────────────────────────────────────
export const CARRD_URL = "https://try.carrd.co/6ph4m1bj";
export const DURABLE_URL = "https://durableai.link/referlabs";
export const BUTTERNUT_URL = "https://www.butternut.ai/?ref=jarred65";
export const SWIPE_PAGES_URL = "https://swipepages.com/?fpr=jarred74";

// ── Newsletter / creator tools ───────────────────────────────────────────────
// Canonical beehiiv code is via=refer-labs (confirmed). The /beehiiv brand page
// previously used a different code (via=14daytrial) that was not crediting us.
export const BEEHIIV_URL = "https://www.beehiiv.com?via=refer-labs";
export const INCOME_LAB_URL = "https://incomelab.me/welcome";

// ── AI sales & automation tools ──────────────────────────────────────────────
// AI SDR: AI sales development rep / automated outbound.
export const AISDR_URL = "https://partner.aisdr.com/referlabs";
// GoHighLevel: all-in-one CRM, marketing and sales automation (agencies).
export const GOHIGHLEVEL_URL = "https://www.gohighlevel.com/?fp_ref=jarred79";
// Reply.io: AI-first multichannel sales engagement / outbound platform.
export const REPLY_IO_URL = "https://get.reply.io/ob73cbdov4e9";
// Snov.io: sales prospecting, email finder and multichannel drip campaigns.
export const SNOV_URL = "https://snov.io?fp_ref=jarred16";

// ── B2B sales data & enrichment ──────────────────────────────────────────────
// FullEnrich: waterfall B2B contact enrichment (email + mobile numbers).
export const FULLENRICH_URL = "https://fullenrich.partnerlinks.io/4o7xslzqzvdw";

// ── HR & payroll ─────────────────────────────────────────────────────────────
// Employment Hero: Australian HR, payroll and employment platform.
export const EMPLOYMENT_HERO_URL = "https://try.employmenthero.com/65q9xczaxste";
// Gusto: US payroll, benefits and HR platform (for US-based teams).
export const GUSTO_URL = "https://get.gusto.com/6mikl6g7ycs1";

// ── Prediction markets ───────────────────────────────────────────────────────
// Polymarket: prediction-market referral link. Single source of truth; the
// UTM helper lives in src/lib/polymarket.ts (polymarketRef).
export const POLYMARKET_REF_URL = "https://polymarket.com/?r=JKRJ";

// ── Email marketing ──────────────────────────────────────────────────────────
// Brevo: all-in-one email marketing, SMS, automation and CRM (PartnerStack).
export const BREVO_URL = "https://get.brevo.com/kcslzesr2rid";

// ── E-commerce / dropshipping ────────────────────────────────────────────────
// AliDrop: AliExpress/Alibaba/Temu dropshipping sourcing + fulfilment (PartnerStack).
export const ALIDROP_URL = "https://get.alidrop.co/v33ywxmnny7c";

// ── Landing pages / lead generation ──────────────────────────────────────────
// Leadpages: AI landing-page builder with A/B testing and CRO (PartnerStack).
export const LEADPAGES_URL = "https://try.leadpages.com/sdb15x9a4i98";

// ── Affiliate / referral software (for brands) ───────────────────────────────
// Superfiliate: affiliate, referral and creator-program platform for brands (PartnerStack).
export const SUPERFILIATE_URL = "https://ps.superfiliate.com/tu04vbefl5kh";

// ── Payments / fintech ───────────────────────────────────────────────────────
// Payoneer: global cross-border payments and business accounts for freelancers/SMBs.
export const PAYONEER_URL = "https://payoneer557.partnerlinks.io/3qmtzfpag28u";

// Nutshell: easy sales CRM with built-in email marketing for SMB teams.
export const NUTSHELL_URL = "https://try.nutshell.com/pf9ozajrlkjn";

// ── Business phone / calling (PartnerStack) ──────────────────────────────────
// CloudTalk: AI-powered call-centre / business phone system for sales & support.
export const CLOUDTALK_URL = "https://get.cloudtalk.io/9mxppdbxerja";
// KrispCall: cloud telephony / virtual phone numbers for teams.
export const KRISPCALL_URL = "https://try.krispcall.com/1sakfwhvptb1";

// ── Accounting / finance (PartnerStack) ──────────────────────────────────────
// Dext: bookkeeping automation, receipt & invoice capture that syncs to accounting software.
export const DEXT_URL = "https://join.dext.com/rktouuh9xjzy";

// ── HR / training (PartnerStack) ─────────────────────────────────────────────
// Trainual: employee training, onboarding and SOP documentation.
export const TRAINUAL_URL = "https://start.trainual.com/pivunnejc2nz";

// ── AI tools (PartnerStack) ──────────────────────────────────────────────────
// Lindy: AI work assistant that automates inbox, meetings, CRM and admin tasks.
export const LINDY_URL = "https://try.lindy.ai/n9jgcq08hvbt";
// ElevenLabs: AI voice / text-to-speech, voice cloning and dubbing.
export const ELEVENLABS_URL = "https://try.elevenlabs.io/m4o3m4lmfm4o";

// ── Business support / other (PartnerStack) ──────────────────────────────────
// Wing Assistant: managed virtual assistant service across many roles.
export const WING_ASSISTANT_URL = "https://affiliate.wingassistant.com/ou3ezdy0b2id";
// Survicate: customer feedback and survey platform.
export const SURVICATE_URL = "https://try.survicate.com/oga31khowbqv";
