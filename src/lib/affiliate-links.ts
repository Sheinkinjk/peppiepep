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

// Pet insurance referral (Knose). Structured as a referral under Corporations
// Regulation 7.6.01(1)(e): general information + referral only, the benefit is
// disclosed on-page, and NO financial product advice/recommendation is given.
// Promo code referlab2mf gives the customer 2 months free.
export const KNOSE_URL = "https://quick-quote.knose.com.au/details?promo=referlab2mf";

// PetsOnMe: second pet-insurance partner (Aug 2026). No tracked URL exists yet, so
// the code REFERLABS is entered by the customer at quote and must stay visible next
// to every CTA. Swap this constant for a tracked link if PetsOnMe supplies one.
// NOTE: REFERLABS upgrades the pet-care-services discount from 12% to 15%. It is NOT
// a discount on the premium; never describe it as one.
export const PETSONME_URL = "https://www.petsonme.com.au/pet-insurance/compare-cover/";
export const PETSONME_CODE = "REFERLABS";

// ── Health: hair care ───────────────────────────────────────────────────────
export const DENSE_URL =
  "https://densehairexperts.myshopify.com?sca_ref=10755034.xwTupm6fuv&utm_source=affiliate-jarred-krowitz&utm_medium=affiliate-jarred-krowitz&utm_campaign=affiliate";

// ── Weight-loss: Juniper (affiliate partner from July 2026) ──────────────────
// Commission-only tracking link. The code JARREDKFC gives the customer NO
// discount, so Juniper must never be presented with an "$X off" offer (ACL s29).
// myjuniper.com is the live site; myjuniper.com.au is a parked domain.
// Confirmed tracking URL supplied by Jarred (July 2026).
export const JUNIPER_URL =
  "https://www.myjuniper.com/?utm_source=affiliate&utm_campaign=jarred_k&discountCode=JARREDKFC";

// ── Home & energy: portable power (Commission Factory) ───────────────────────
// Both brands sell portable power stations AND installed whole-home batteries.
// The whole-home half competes with Apollo Energy Group, which pays us on a
// $500 exclusive; every page that compares them states that we earn from all
// three rather than quietly ranking one above another.
export const ECOFLOW_URL =
  "https://t.cfjump.com/94361/t/88567?Url=https%3a%2f%2fau.ecoflow.com%2f";

export const ANKER_SOLIX_URL =
  "https://t.cfjump.com/94361/t/91722?Url=https%3a%2f%2fwww.ankersolix.com%2fau";

// ── Research peptides (research use only) ────────────────────────────────────

// ── Website builders / landing pages ─────────────────────────────────────────
export const CARRD_URL = "https://try.carrd.co/6ph4m1bj";
export const DURABLE_URL = "https://durableai.link/referlabs";
export const BUTTERNUT_URL = "https://www.butternut.ai/?ref=jarred65";
export const SWIPE_PAGES_URL = "https://swipepages.com/?fpr=jarred74";

// ── Newsletter / creator tools ───────────────────────────────────────────────
// Canonical beehiiv code is via=refer-labs (confirmed). The /beehiiv brand page
// previously used a different code (via=14daytrial) that was not crediting us.
export const BEEHIIV_URL = "https://www.beehiiv.com?via=refer-labs";

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

// ── Prediction markets ───────────────────────────────────────────────────────
// Polymarket: prediction-market referral link. Single source of truth; the
// UTM helper lives in src/lib/polymarket.ts (polymarketRef).

// ── Email marketing ──────────────────────────────────────────────────────────
// Brevo: all-in-one email marketing, SMS, automation and CRM (PartnerStack).
export const BREVO_URL = "https://get.brevo.com/kcslzesr2rid";

// ── E-commerce / dropshipping ────────────────────────────────────────────────
// AliDrop: AliExpress/Alibaba/Temu dropshipping sourcing + fulfilment (PartnerStack).
export const ALIDROP_URL = "https://get.alidrop.co/v33ywxmnny7c";

// ── Landing pages / lead generation ──────────────────────────────────────────
// Leadpages: AI landing-page builder with A/B testing and CRO (PartnerStack).
// Unbounce referral link. The destination is an "invitation" page that states the
// offer in full: 20% off the first three months, or 35% off the first full year
// on an annual plan, new customers only. Read there 20 August 2026.
// Worth noting for future onboarding: that offer appears ONLY on the partner
// destination, not on unbounce.com, so checking a vendor's public site alone
// will miss affiliate-exclusive discounts.
export const UNBOUNCE_URL = "https://unbounce.partnerlinks.io/659i6182mwb4";

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

// ── Lead generation / conversion (PartnerStack) ──────────────────────────────
// Hello Bar: website popups and notification bars for email capture.
export const HELLOBAR_URL = "https://try.hellobar.com/epwenas0ezvh";
// Outgrow: interactive content — quizzes, calculators and forms for lead gen.
export const OUTGROW_URL = "https://share.outgrow.biz/s6fk26puoy4k";
// FlexiQuiz: online quiz, test and assessment maker.
export const FLEXIQUIZ_URL = "https://try.flexiquiz.com/yeoy5ho7a2fs";

// ── Sales, CRM & data (PartnerStack) ─────────────────────────────────────────
// Pipedrive: sales CRM and pipeline management.
export const PIPEDRIVE_URL = "https://aff.trypipedrive.com/wp69xv7vwcuj";
// ZoomInfo: enterprise B2B sales intelligence and contact database.
export const ZOOMINFO_URL = "https://try.zoominfo.com/bbw8emez3al4";
// ActiveCampaign: email marketing, automation and CRM.
export const ACTIVECAMPAIGN_URL = "https://try.activecampaign.com/3zahcmecmili";

// ── Payments (PartnerStack) ──────────────────────────────────────────────────
// Melio: B2B bill pay / accounts payable (US businesses only).

// ── AI & document tools (PartnerStack) ───────────────────────────────────────
// Logome.ai: AI logo and brand-kit generator.
export const LOGOME_URL = "https://logomeai.partnerlinks.io/6p4oylwrsagk";
// Alohi: Sign.Plus e-signatures and Fax.Plus online fax.
export const ALOHI_URL = "https://ref.alohi.com/0jjps4u4di4n";

// ── Batch 3 additions (PartnerStack) ─────────────────────────────────────────
// Landingi: no-code landing-page builder for marketers.
export const LANDINGI_URL = "https://try.landingi.com/n2az1ocvmgui";
// Databox: KPI dashboards that pull data from many sources.
export const DATABOX_URL = "https://join.databox.com/1bkedv8rrirv";
// CometChat: in-app chat, voice and video SDK/API for developers.
export const COMETCHAT_URL = "https://try.cometchat.com/cmy1z1n1y5go";
// MeetGeek: AI meeting assistant that records, transcribes and summarises meetings.
export const MEETGEEK_URL = "https://get.meetgeek.ai/ybh05mzi9v1e";
// Flocksy: unlimited creative and graphic-design subscription (human designers).
export const FLOCKSY_URL = "https://join.flocksy.com/saseqeg74ylm";

// Keap
export const KEAP_URL = "https://get.keap.com/dpkfzc1evrxv";
// Capsule
export const CAPSULE_URL = "https://get.capsulenow.io/blg44mgnn80p";
// Instapage
export const INSTAPAGE_URL = "https://get.instapage.io/5v4gjgh4kzyk";
// Beautiful.ai
export const BEAUTIFULAI_URL = "https://beautifulai.partnerlinks.io/e7xl7f91vjja";
// PandaDoc
export const PANDADOC_URL = "https://pandadoc.partnerlinks.io/kc9kruhmgrfy";
// Blinq
export const BLINQ_URL = "https://partners.blinq.me/vpsdocfxga1y";

// Apollo Energy Group: NSW home battery installer.
// Aug 2026: Apollo lead generation is handled ON SITE, not by sending traffic out.
// Every Apollo CTA points at our own enquiry form so Refer Labs captures and manages
// the lead, then passes it to Apollo. The old outbound landing
// (apolloenergygroup.com.au/referlabs) is deliberately retired: do not reintroduce it,
// and do not mark this href sponsored/nofollow, it is an internal link.
export const APOLLO_ENERGY_LEAD_HREF = "/apollo-energy-group#register";
