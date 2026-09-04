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
const SCRIPT_REPEAT = "$18";
const SCRIPT_NEW = "$39";
const SCRIPT_ANTIBIOTIC = "$39";
const CERT_SINGLE = "$18";
const CERT_WEEK = "$36";
const MENTAL_HEALTH = "fully bulk billed";

export const MIDOC = {
  /** The date every figure below was read off midoc.com.au. */
  readOn: "2026-09-04",
  readOnLabel: "4 September 2026",
  /** Short form, for a card or a table header where the full label will not fit. */
  readOnShort: "4 Sep 2026",
  source: "https://www.midoc.com.au/telehealth",

  consultStandard: CONSULT_STANDARD,
  consultSpecialist: CONSULT_SPECIALIST,
  scriptRepeat: SCRIPT_REPEAT,
  scriptNew: SCRIPT_NEW,
  scriptAntibiotic: SCRIPT_ANTIBIOTIC,
  /** Midoc's own framing, read off midoc.com.au/scripts on 3 Sep 2026. */
  scriptSpeed: "in minutes",

  /**
   * The scripts line has its own page with facts the telehealth page does not
   * carry, read off midoc.com.au/instantscripts on 4 Sep 2026.
   */
  scriptsSource: "https://www.midoc.com.au/instantscripts",
  scriptsHours: "24 hours a day, seven days",
  scriptDelivery:
    "an eScript sent to your phone by SMS or email as a QR code, which you present at any Australian pharmacy",
  /**
   * The distinction that decides whether a consultation ends in what the reader
   * came for. Most competing pages state a flat "you need a Medicare card" and
   * omit the alternative, which is wrong for anyone without one.
   */
  scriptIdentifier:
    "a valid Medicare card, or an Individual Healthcare Identifier (IHI) number if you do not have one",
  scriptRepeatProof: "proof of your previous prescription, uploaded with the request",
  /**
   * Their product copy says one prescription per repeat consultation; their FAQ
   * on the same page says up to three different repeat medications per request.
   * Both are quoted rather than reconciled, because we cannot resolve it for a
   * reader and picking one would be a guess.
   */
  scriptRepeatCountProductCopy: "up to 1 prescription in one consultation",
  scriptRepeatCountFaq: "up to 3 different types of repeat medications in one request, subject to doctor discretion",
  scriptPractitioners: "AHPRA-registered doctors and nurse practitioners",

  /** midoc.com.au/verify, read 4 Sep 2026: "Verify Medical or Carer Certificate". */
  certificateVerifyUrl: "https://www.midoc.com.au/verify",
  certificateCarer: true,

  /** Their own disclaimer, verbatim. */
  platformNote:
    "MIDOC operates as a technology and administrative platform connecting users with independent Australian-registered practitioners. MIDOC does not provide healthcare services, medical treatment or clinical care. All clinical decisions are made solely by the independent practitioners. MIDOC is not a substitute for your regular doctor. In an emergency, call 000 immediately.",
  certificateSingleDay: CERT_SINGLE,

  /**
   * The certificate line has its own hours and its own delivery method, both
   * different from the general telehealth line, and both read off the Midoc
   * homepage on 4 Sep 2026. An earlier draft of the certificate page carried the
   * telehealth hours by mistake, which is exactly what this file exists to stop.
   */
  certificateHours: "24 hours a day, seven days",
  certificateTurnaround: "usually within 15 minutes of the doctor's review",
  /** Their own words on the homepage, worth keeping because it answers a real query. */
  certificateOverseasStudents: "Overseas students in Australia are eligible",
  certificateDelivery: "sent to your email if approved",
  certificateMedicare: "not required for a certificate",
  certificateTypes: [
    { type: "Medical certificate, single day", price: CERT_SINGLE },
    { type: "Medical certificate, multiple days", price: CERT_WEEK },
    { type: "Carer certificate, single day", price: CERT_SINGLE },
    { type: "Carer certificate, multiple days", price: CERT_WEEK },
  ],
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
    { band: "Repeat script", price: SCRIPT_REPEAT, items: "A repeat of something already prescribed to you." },
    { band: "New script", price: SCRIPT_NEW, items: "For something you do not take regularly. Issued where a practitioner assesses it as appropriate." },
    { band: "Antibiotic request", price: SCRIPT_ANTIBIOTIC, items: "Reviewed like any other request, and declined where it is not appropriate." },
    { band: "Medical or carer certificate, single day", price: CERT_SINGLE, items: "Reviewed by an Australian-registered doctor. Carer certificates are priced the same as medical ones." },
    { band: "Medical or carer certificate, multiple days", price: CERT_WEEK, items: "The same review, covering a longer period." },
  ],
} as const;
