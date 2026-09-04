/**
 * Midoc's published prices and access facts, in one place.
 *
 * Telehealth pricing moves, and a page with $49 baked into prose is wrong the
 * day they change it and nobody can tell which pages to edit. Everything a page
 * states about Midoc comes from here, so a re-check is one edit to this file and
 * every page that quotes it updates together, including the date it was read.
 *
 * Each price is declared once as a constant above the object and referenced from
 * both the scalar fields and the `bands` table, because the first version of
 * this file duplicated them and a test edit moved 30 mentions while leaving 2
 * behind.
 *
 * RE-VERIFICATION PROCEDURE. Open midoc.com.au/telehealth, read the prices and
 * hours off the page, update the values below AND `readOn`. Do not bump `readOn`
 * without re-reading: the date is the claim, not decoration. If a figure has
 * gone, delete it rather than leaving the last-known number in place.
 *
 * TGA: nothing here may name a medicine. Midoc supplies Schedule 4 treatments
 * through several of these lines, and every page quoting this file carries a
 * commission link, so none of them can claim the editorial exemption. Service
 * names and prices only.
 */
const CONSULT_STANDARD = "$49";
const CONSULT_SPECIALIST = "$69";
const CERT_SINGLE = "$18";
const CERT_WEEK = "$36";
const MENTAL_HEALTH = "fully bulk billed";

export const MIDOC = {
  /** The date every figure below was read off midoc.com.au. */
  readOn: "2026-09-03",
  readOnLabel: "3 September 2026",
  source: "https://www.midoc.com.au/telehealth",

  consultStandard: CONSULT_STANDARD,
  consultSpecialist: CONSULT_SPECIALIST,
  certificateSingleDay: CERT_SINGLE,
  certificateWeek: CERT_WEEK,
  /** Stated as fully bulk billed, i.e. no cost, so nothing is earned on it. */
  mentalHealth: MENTAL_HEALTH,

  waitTime: "usually within 5 to 60 minutes",
  format: "phone or video, depending on the service",
  hoursMost: "8am to 2am, seven days",
  hoursExceptions: "weight management 8am to 8pm, smoking cessation 8am to 5pm, men's health 9am to 5pm",
  coverage: "nationally, across QLD, NSW, ACT, VIC, SA, WA, NT and TAS",
  medicare: "not required for a consultation, required for a prescription",
  practitioners: "doctors registered with AHPRA",

  bands: [
    { band: "Standard consultation", price: CONSULT_STANDARD, items: "General health, child health, COVID-19 antivirals, hair loss, sexual health and STI, smoking cessation, continence." },
    { band: "Specialist consultation", price: CONSULT_SPECIALIST, items: "Weight management, men's health (priced after the Medicare rebate), dementia support, wound care." },
    { band: "Mental health care plan or review", price: "Fully bulk billed", items: "Listed at no cost, so there is nothing for us to earn on it." },
    { band: "Medical certificate, single day", price: CERT_SINGLE, items: "Reviewed by an Australian-registered doctor." },
    { band: "Medical certificate, up to seven days", price: CERT_WEEK, items: "The same review, covering a longer period." },
  ],
} as const;
