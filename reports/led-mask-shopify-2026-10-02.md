# Own-brand LED face mask on Shopify: regulation, competition, supply, economics

Read-only research, 2 October 2026. Builds on `longevity-own-brand-feasibility-2026-10-02.md`, `longevity-demand-2026-10-02.md` and `longevity-partner-landscape-2026-10-02.md`; it does not repeat what they settled (Class IIa fees of A$1,244 + A$1,305 a year, the +58% "red light therapy" trend, the Christmas peak, the LED page at position 7 with 921 impressions and 5 clicks in 90 days).

Every fact below was read on **2 October 2026** from the URL beside it, unless another date is given. "UNVERIFIED" means no primary source was found. Figures marked **assumption** are mine and are there only to make the model run; each one is a number to replace with a quote.

---

## Verdict

**No-go on the brief as stated, which was an autopilot business making A$1M profit a year. Conditional go on a small, cosmetic-claim test brand.**

- A$1M profit needs about **9,700 to 23,800 masks a year at A$349**, depending on CAC. The best-selling LED mask listings on Amazon AU show "100+ bought in past month", which is roughly 1,200 a year. The target needs a brand selling **8 to 20 times the volume of the top Amazon AU listing**, every month, against SharkNinja, CurrentBody, Foreo and Omnilux.
- **A realistic first year is a loss**: about A$50k to A$100k before inventory, at 1,000 to 2,000 units. It only breaks even at about 3,000 units with CAC held to A$120.
- **The regulatory route and the marketing engine conflict.** Wrinkle or acne claims need an ARTG entry, and an ARTG device cannot use paid creator testimonials, which are the main UGC engine in this category. Cosmetic-only claims keep the creators but give up the claims every market leader makes.
- It **sits awkwardly with Refer Labs.** Foreo is a Refer Labs partner, and the LED page sends readers to `/go/foreo-led-masks`. An own brand needs disclosure on that page, or has to stay off it.

**Conditions for a go (all six):**
1. Cosmetic claims only, with copy reviewed against the claim line in section 1.4.
2. A battery or USB-C mask **shipped without a wall adapter**. That keeps it out of EESS, which applies only above 50 V AC (section 1.5).
3. An IEC 62471 photobiological-safety report and an EMC report from the factory, both read before money is paid.
4. Quotes from at least three OEMs, with Kaiyan among them, covering MOQ, unit cost, lead time and certificates.
5. A first order of 500 units or fewer, so cash at risk is about A$36k landed (assumption-based).
6. A launch timed for Mother's Day (May 2027) or Christmas 2027. Christmas 2026 cannot be met: no OEM publishes a lead time, and searches peak on 21 to 27 December.

---

## 1. Regulation: cosmetic claims versus therapeutic claims

### 1.1 What makes an LED mask a medical device

- **The definition turns on the supplier's stated purpose.** Under s41BD(1)(a) of the Therapeutic Goods Act, a medical device is an article intended for "(i) diagnosis, prevention, monitoring, prediction, prognosis, treatment or alleviation of disease ... (iii) investigation, replacement or modification of the anatomy or of a physiological or pathological process or state". Under s41BD(2), that purpose "is to be ascertained from the information supplied ... on ... the labelling", the instructions and the advertising ([Act, compilation of 5 Sep 2025](https://www.legislation.gov.au/C2004A03952/latest/text)).
- **"Therapeutic use" in s3 is broader.** It includes "influencing, inhibiting or modifying a physiological process" and "the replacement or modification of parts of the anatomy" (same source).
- **The TGA's own guidance answers the cosmetic question directly.** It says: "Radiating beauty therapy products such as: solariums, laser combs, dermal abrasion devices ..., **skin rejuvenation devices (or skin rejuvenation products that apply energy to the patient)** ... are not medical devices unless: therapeutic claims are made or the product is: surgically invasive [or] invasive via a body orifice." Since 1 August 2023 the same page has carried this note: "The regulatory requirements for cosmetic products (including radiating beauty therapy products) are currently under review and their regulatory status may change" ([TGA, Meeting rules for active medical devices, last updated 24 Sep 2024](https://www.tga.gov.au/resources/guidance/meeting-rules-active-medical-devices-use-energy-operate)).
- **No exclusion is needed.** The Excluded Goods Determination 2018 (Compilation 11, 8 Aug 2024) has no item for light, LED or beauty devices ([F2018L01350](https://www.legislation.gov.au/F2018L01350/latest/text)). A cosmetic mask is outside the device definition in the first place, so this does not matter.
- **Australia has no equivalent of the EU's Annex XVI.** In the EU, light-emitting skin-treatment equipment is regulated even without a medical purpose. Australia's Medical Devices (Specified Articles) Instrument 2020 (Compilation 5, 1 Jan 2026) lists no light or skin-treatment item ([F2020L00463](https://www.legislation.gov.au/F2020L00463/latest/text)).

**Answer.** A mask sold only to improve the look of the skin is a consumer good, not a therapeutic good, and needs **no ARTG inclusion**. That holds only while every label, instruction and ad stays cosmetic. One acne, collagen or pain claim anywhere makes the product a medical device, and supplying it without an ARTG entry is the offence. The TGA has flagged this whole category for review, and "Therapeutic goods used in cosmetic procedures" is one of its 12 compliance focus areas for 2026 to 2027 ([TGA media release, 22 Jan 2026](https://www.tga.gov.au/news/media-releases/tga-releases-compliance-principles-reinforcing-proactive-and-risk-based-enforcement-throughout-2026-and-2027)).

### 1.2 What the ARTG shows: the leaders all chose the device route

An ARTG search for "cosmetic phototherapy system" returns 41 entries. Their public summaries were read on 2 Oct 2026 (`tga.gov.au/resources/artg/<id>`).

| Brand / sponsor | ARTG | Class | Manufacturer | Accepted intended purpose (summary) |
|---|---|---|---|---|
| CurrentBody Skin Series 2 mask (Light Tree Ventures) | 429892 | IIa | Shenzhen Kaiyan | "treatment of full-face wrinkles" |
| CurrentBody Multi-Light mask MK-110D | 517785 (30 Oct 2025) | IIa | Kaiyan | acne, wrinkles, pigmentation |
| CurrentBody 4-in-1 mask | 476447 | IIa | Kaiyan | "reduce the appearance of pigmentation and wrinkles" |
| Shark CryoGlow (SharkNinja) | 511579 (10 Sep 2025) | IIa | SharkNinja Operating LLC | fine lines and wrinkles; mild-to-moderate inflammatory acne |
| Therabody TheraFace Mask Glo | 512308 (19 Sep 2025) | IIa | Therabody Inc | wrinkles; acne |
| Emergo Australia for iSmart Developments (UK) | 430778 / 430779 / 430780 | IIa | iSmart Developments | acne; wrinkles. iSMART says it powers Omnilux ([ismartdevelopments.com](https://ismartdevelopments.com/)). **That these entries are Omnilux's is an inference** |
| Ulike Reglow (Kingsmead) | 529759 (4 Aug 2026) | IIa | Shenzhen Ulike | wrinkles; acne |
| Qure, Fringe, Skin 2.0, DNS Lab, Balco, Trudermal, Smooth Skin Solution, Ergo Health (Illumia) | various, 2021 to 2025 | IIa | all Kaiyan | wrinkles and/or acne |
| Kahlia Skin | 338561, 407496, 408962 | **I** | Shenzhen NTS | "rejuvenate the skin, reduce pigmentation and wrinkles ... combat acne" |
| Beauty By Light (Space Tech) | 339328 | **I** | self | same template wording |
| Universal Glows | 447785 | **I** | Eyco | "improve, rejuvenate and manage the cosmetic appearance of human skin" |

What this shows:
- **Kaiyan already supplies at least 20 Australian sponsor entries.** Its technical file is proven with the TGA. An own brand taking the device route would be sponsor number 21 on a well-worn path.
- **Several Class I self-declared entries claim acne and wrinkles.** The TGA cancelled OzMask's light unit in 2020 because it "was incorrectly classified as a class I medical device" (cited in the feasibility report). Those entries carry the same risk.
- **No ARTG entry was found for Foreo, Dr Dennis Gross, Nanoleaf, LumiMask or Luminex Glow** (searched by brand on 2 Oct 2026). Sponsors can file under a different name, so this proves nothing alone.
- **Luminex Glow's own site claims masks that target "acne-causing bacteria" and "stimulate collagen production"** ([luminexglow.com.au](https://www.luminexglow.com.au/)). That is the exposure this report says to avoid.
- **Bon Charge sells its A$499 face mask on appearance language**: "supports healthier-looking skin, helping improve the appearance of tone, texture, and reduce the appearance of fine line and wrinkles" (product JSON on au.boncharge.com). Its sponsor company, BLUblox, holds three red/infrared ARTG entries, and all of them are pain-relief panels (460946, 455726, Class IIa; 460290, Class I). **Bon Charge is the working precedent for the cosmetic route.**

### 1.3 Enforcement found

- **No TGA infringement notice or recall naming an LED face mask was found.** The TGA infringement list was read in full on 2 Oct 2026. Its cosmetic cases are injectables and a dermapen: InSkin Cosmedics paid A$37,800 "for alleged supply and advertising of unapproved dermapen device" ([TGA infringement notices](https://www.tga.gov.au/safety/compliance-and-enforcement/compliance-actions-and-outcomes/infringement-notices)).
- **The only Australian LED mask recall is Neutrogena's (2019)**, for risk of "retinal damage" (cited in the feasibility report).
- **The nearest overseas precedent is the UK ASA, 5 Nov 2025.** Four rulings against LED mask sellers, including Project E Beauty, which also sells on Amazon AU, found "targeted solutions for ... acne, ... rosacea" to be medical claims for an unauthorised device ([Osborne Clarke summary, 19 Dec 2025](https://marketinglaw.osborneclarke.com/advertising-regulation/claims-made-for-led-facemasks-scrutinised-by-the-asa/)).
- **No ACCC action against an LED mask seller was found** (UNVERIFIED: the productsafety.gov.au search is script-rendered and returned nothing to a direct query).
- **Plenty of unlisted masks make acne or wrinkle claims on Amazon AU and Chemist Warehouse.** The risk today is a complaint-driven TGA letter or a platform takedown, not routine prosecution. That can change, because cosmetic procedures are a named priority.

### 1.4 What the product page and ads can say

| Fine (appearance, cosmetic) | Not without an ARTG entry (therapeutic) |
|---|---|
| "improves the look of skin tone and texture", "for a radiant-looking complexion", "reduces the appearance of fine lines" (Bon Charge's wording) | "treats acne", "kills acne bacteria", "rosacea", "eczema", "psoriasis" (diseases) |
| "a 10-minute LED skincare ritual", "red 630nm and near-infrared 850nm" (a factual spec) | "boosts / stimulates collagen" (modifies a physiological process, s41BD(1)(a)(iii)) |
| "glow", "refreshed-looking skin" | "reduces wrinkles" as treatment, "anti-inflammatory", "heals", "pain relief", "hair regrowth" |
| Before-and-after photos (Meta allows them for cosmetic products shown to people aged 18 and over; see 4.3) | "TGA approved", "medical grade", "clinically proven" without the trial to back it |

Two more constraints:
- **Every cosmetic claim still has to be true and substantiated under the Australian Consumer Law** (s18 misleading conduct; s29 false representations).
- **If the device route is chosen, the Advertising Code applies to all advertising.** Section 24 bars testimonials from anyone given "valuable consideration", which "includes social media influencers, bloggers and brand ambassadors". Free product counts as consideration ([TGA, Applying the Advertising Code rules: testimonials and endorsements](https://www.tga.gov.au/resources/guidance/applying-advertising-code-rules-testimonials-and-endorsements)). **A gifted-product creator program cannot produce testimonials for an ARTG-listed mask.** Endorsements, as distinct from testimonials, remain possible.

### 1.5 Electrical, EMC and eye safety

- **EESS does not apply to the mask.** In-scope equipment is "rated at a voltage greater than 50 V AC RMS or 120 V ripple-free DC" ([EESS in-scope definitions v4.3, Jul 2024](https://www.eess.gov.au/wp-content/uploads/2024/07/EESS-Inscope-Equipment-Definitions-and-Risk-Levels-v4.3-Approved.pdf), preface). A 5 V USB or battery mask falls below that.
- **A wall charger shipped with it would be Level 3.** The "Power supply or charger" entry (output under 50 V, household type, for charging batteries) is marked **Level 3** (page 22), so it needs a certificate of conformity and registration. "Beauty care lamp" is also Level 3 (page 7), but only applies to equipment within the voltage scope. **Ship a USB-C cable only.** Beauty By Light sells a "2 Amp USB charger" separately (A$29.95), and doing that brings the charger into scope.
- **EMC (ACMA).** Suppliers must meet the applicable EMC standard, label with the RCM and register on the national database. The EMC compliance level (1, 2 or 3) decides whether testing is required ([ACMA Step 1](https://www.acma.gov.au/step-1-check-rules-follow), [Step 2](https://www.acma.gov.au/step-2-show-your-product-complies); read via search summary, as the page timed out). The level for an LED mask is UNVERIFIED. Assume a test report is needed. If the mask has Bluetooth or an app, radiocommunications standards also apply.
- **Eye safety.** For cosmetic consumer goods there is no mandatory Australian standard naming LED masks (UNVERIFIED that none exists). The relevant standard is **IEC/AS/NZS 62471 photobiological safety**. The EESS class specification already uses "exempt group limits from AS/NZS 62471" for nail lamps. A device-route mask must meet Essential Principle 11 on radiation. Blue light near the eyes is the Neutrogena recall risk, so require an IEC 62471 "exempt group" report and fit opaque eye shields.
- **Lithium battery.** Sea or air freight of lithium cells normally needs UN38.3 test documents (industry practice; confirm with the forwarder, UNVERIFIED here).
- **Customs.** HS 8543.70.00 "Other machines and apparatus" carries a **Free** general rate ([ABF Working Tariff, ch. 85](https://www.abf.gov.au/importing-exporting-and-manufacturing/tariff-classification/current-tariff/schedule-3/section-xvi/chapter-85)). The mask's classification needs a broker's confirmation. 10% import GST is claimable as an input credit.

---

## 2. Competition in Australia

All prices are AUD as listed on 2 Oct 2026.

| Brand | Where | Price | ARTG | Sales signal |
|---|---|---|---|---|
| **CurrentBody** (UK) | [currentbody.com.au](https://www.currentbody.com.au/collections/led-face-masks) | Series 2 A$679.99; Series 3 A$979.99; Blue Series 1 A$585.99; 4-in-1 A$799.99; Face & Neck Kit S2 A$1,259.99 | Yes, Class IIa, many entries (Light Tree Ventures, made by Kaiyan) | Series 2 shows **4,241 reviews**, the most of any mask seen |
| **Omnilux** (US/UK) | [RY](https://ry.com.au/search?q=omnilux) | Contour Face A$470 (was A$595); Clear A$470; Men A$470; Hydrogel masks 3-pack A$35 | Probably the Emergo/iSmart entries (inference) | RY tags Contour Face "BEST-SELLER". omnilux.com.au is an unrelated clinic site |
| **Foreo** (Sweden) | [foreo.com](https://www.foreo.com/faq-swiss-201) | FAQ 201 A$829; FAQ 202 A$1,319; 202 plus A$1,899; UFO 3 LED A$329 (shown at $199); activated masks A$36.49 for 6 | None found under "foreo" | 202 plus billed "Best-selling LED face mask". **A Refer Labs partner** |
| **Dr Dennis Gross** (US) | [Mecca](https://www.mecca.com/en-au/search/?searchTerm=led%20mask) | SpectraLite FaceWare Pro A$797; Gold Glitter edition A$657 | None found | not published |
| **Shark CryoGlow** (SharkNinja) | sharkninja.com.au A$699.99; Myer A$699; JB Hi-Fi A$699; **Amazon AU A$419 to A$459** | | Yes, 511579, Class IIa | Amazon "50+ bought in past month". SEC 6-K: Beauty & Home Environment sales +56.7% to US$189.3M in Q3 2025, "primarily driven by ... FlexBreeze fans and air purifiers as well as the launch of CryoGlow face masks" ([SEC](https://www.sec.gov/Archives/edgar/data/1957132/000162828025049846/exhibit993pressreleaseofsh.htm)) |
| **Therabody** TheraFace Mask Glo / Mask | David Jones, Amazon AU | A$499 / A$899 | Yes, 512308, Class IIa | Amazon "50+ bought" |
| **Bon Charge** (AU-founded, global) | au.boncharge.com | Face mask A$499; neck/chest A$499; controller A$135 | Face mask: no matching entry (BLUblox entries are pain panels) | Revenue UNVERIFIED ("8-figure" is an aggregator or podcast claim, not used) |
| **Kahlia Skin** (AU Shopify) | kahliaskin.com.au; Myer, David Jones | 7-colour mask A$99; Silicone Radiant Mask A$349 (A$389 to A$489 at David Jones and Myer) | Class I (338561, 407496, 408962) | In Myer and David Jones |
| **Beauty By Light** (AU Shopify) | beautybylight.com.au | A$389 (all colours) | Class I (339328) | |
| **Luminex Glow** (AU, Gold Coast) | luminexglow.com.au | "20% off" sitewide | None found | Makes acne and collagen claims |
| **Lumière** | The "Lumiere" name is used by Zobelle (Dr Pen NZ) and on generic marketplace listings; no Australian brand of that name was found | | | |
| **Nanoleaf** | JB Hi-Fi, Amazon AU | A$299 | None found | Amazon "50+ bought" |
| **Amazon AU generic** | [amazon.com.au](https://www.amazon.com.au/s?k=led+face+mask) | A$18.29 to A$969; bulk at A$31 to A$140 | Mostly none | **Top: "100+ bought in past month"** at A$139.99 and A$135.99 (both unbranded) |
| **Chemist Warehouse** | search | Caremax 8-colour A$189.99 (13 reviews); Caremax 3-colour A$59; House of Dermis 4D A$677 | not checked | Low review counts |
| Priceline, Adore Beauty | | no LED mask listings rendered (UNVERIFIED) | | |

**The price bands:**
- **Commodity:** A$20 to A$150 (Amazon, Caremax).
- **Australian DTC mid-tier:** A$99 to A$499 (Kahlia, Beauty By Light, Bon Charge, Nanoleaf).
- **Premium:** A$470 to A$1,899 (Omnilux, Dr Dennis Gross, CurrentBody, Foreo).
- **Shark sets the price-war marker.** Its A$699.99 list price sells for A$419 on Amazon AU.

**Australian DTC revenue:** no Australian LED mask brand publishes revenue (UNVERIFIED for all of them). The only audited figure in the category is SharkNinja's, and it is US-led.

---

## 3. Supply

**Published listings** ([Global Sources](https://www.globalsources.com/searchList/products?keyWord=led%20face%20mask), 15,923 results from 544 suppliers). All specs and certificates are the seller's own claims.

| Listing | Unit price | MOQ |
|---|---|---|
| 7-colour silicone face + neck set | US$18.00 to 24.00 | 500 |
| Blue/red 7-colour mask | US$18.50 to 20.00 | 500 |
| Red + near-infrared "skin tightening" | US$21.92 to 24.77 | 1,000 |
| OEM 630nm/830nm mask with remote | US$29.50 to 38.50 | 5 |
| Silicone photon mask | US$39.12 | 500 |
| 3D LED soft mask | US$43.00 | 100 |
| Sodolux 850nm, 5 wavelengths, custom logo | US$65.00 to 69.00 | not shown |
| "Velour LED Face Mask, FDA-cleared" | US$150.00 | 1 |
| Liquid-silicone mask "with global patent" | US$199.00 | not shown |

At A$1 = US$0.6949 (RBA, 1 Oct 2026, [rba.gov.au](https://www.rba.gov.au/statistics/frequency/exchange-rates.html)), US$40 is A$57.56 and US$65 is A$93.54.

**Kaiyan Medical** ([kaiyanmedical.com](https://www.kaiyanmedical.com/)) describes itself as "FDA-Cleared Red Light Therapy Manufacturer". It claims founding in 2009, "1,200+ patents", "FDA, BSI, ISO 13485, MDSAP, BSCI", and "LED face masks ... for private-label beauty brands". It publishes **no price, MOQ or lead time**. Its quote form lists "500 - 1,000 units" as an option (feasibility report). Its value is the 20-plus Australian ARTG entries it already supports.

**Alibaba and Made-in-China** blocked automated access (slider captcha), so nothing was read there.

**Needs a quote:** unit price at 500 and 1,000 units for a red 630 nm + NIR 830 to 850 nm silicone mask with irradiance stated in mW/cm²; IEC 62471 and EMC reports; UN38.3; packaging; lead time; warranty and defect-replacement terms; a ARTG technical-file letter if the device route is chosen.

---

## 4. Shopify unit economics and the automation stack

### 4.1 Sourced cost inputs

| Input | Figure | Source |
|---|---|---|
| Shopify Basic | A$42/mo yearly, A$56/mo monthly; cards 1.7% + 30c (Grow 1.55%, Amex 2.9%) | [shopify.com/au/pricing](https://www.shopify.com/au/pricing) |
| Amazon MCF (pick, pack and delivery from Amazon stock to Shopify orders), standard parcel | A$11.71 for 501 to 1,000 g; A$14.70 for 1,001 to 1,500 g (ex GST) | [sell.amazon.com.au/pricing](https://sell.amazon.com.au/pricing) |
| eStore Logistics, ShipBob AU | quote-based; no published rates | estorelogistics.com.au, shipbob.com/au/pricing |
| Shippit | managed tracking SMS A$0.08 each | [shippit.com/pricing](https://www.shippit.com/pricing) |
| Klaviyo | free to 250 profiles and 500 emails a month; paid tiers not rendered (UNVERIFIED) | [klaviyo.com/au/pricing](https://www.klaviyo.com/au/pricing) |
| Import duty | Free under 8543.70.00 (classification to confirm) | ABF |
| TGA device route | A$1,244 application + A$1,305 a year per Class IIa entry | feasibility report |
| Consumable price anchors | Omnilux hydrogel 3-pack A$35; Foreo activated masks 6 for A$36.49; Foreo serum A$134.99; CurrentBody hydrogel A$84.95; CurrentBody conductive gel A$55.99 | pages above |

**CAC.** No primary source publishes CAC for a beauty device. Agency blogs quote figures (e.g. "Beauty $110"); those are unsourced and not used here. The model is therefore run across CAC values, and the **breakeven CAC** is the useful output.

### 4.2 Per-unit model (A$349 including GST, cosmetic route)

| Line | A$ | Basis |
|---|---|---|
| Net revenue ex GST | 317.27 | 349 / 1.1 |
| OEM unit cost | 57.56 | **assumption**: US$40, from the middle of the published band |
| Freight, packaging, testing amortised | 15.00 | **assumption**, needs quotes |
| Shopify Payments | 6.23 | 1.7% + 30c |
| Fulfilment (MCF, at or under 1 kg) | 11.71 | Amazon AU; boxed weight is an **assumption** |
| Returns and warranty allowance | 25.38 | **assumption**: 8% of net revenue |
| Customer service per order | 3.00 | **assumption** |
| **Contribution before marketing** | **198.39** | equals the breakeven CAC |

**Profit of A$1M a year**, with fixed costs of A$150k a year (assumption: one part-time ops/CS person, insurance, apps, testing):

| Price | CAC | Margin/unit | Units/yr | Revenue |
|---|---|---|---|---|
| A$249 | A$80 | A$36 | 31,551 | A$7.9M |
| A$249 | A$120 | loss | n/a | n/a |
| **A$349** | **A$80** | **A$118** | **9,714** | **A$3.4M** |
| A$349 | A$120 | A$78 | 14,671 | A$5.1M |
| A$349 | A$150 | A$48 | 23,767 | A$8.3M |
| A$349 | A$200 | loss | n/a | n/a |
| A$499 | A$120 | A$201 | 5,713 | A$2.9M |
| A$499 | A$200 | A$121 | 9,481 | A$4.7M |

The model in one line: **A$1M profit needs about 9,700 units at A$349 with CAC of A$80, or 14,700 units at A$120.** A brand priced at A$499 needs fewer units, but there it competes directly with Omnilux at A$470 and Bon Charge at A$499, both established.

**Realistic first year** (A$349, same assumptions, before inventory capital):

| Units | CAC | Result |
|---|---|---|
| 1,000 | 150 | -A$101,600 |
| 2,000 | 150 | -A$53,200 |
| 3,000 | 120 | +A$85,200 |

On top of this, a 500-unit first order ties up about A$36k (500 × A$72.56).

**The volume check.** No Amazon AU mask listing shows more than "100+ bought in past month". 3,000 units a year is 250 a month, already more than any visible listing. Refer Labs' own LED page sent 5 clicks in 90 days, so the site is not an acquisition channel for this product.

**Consumables help retention, not the core equation.** Every premium brand sells hydrogel masks or serum (A$35 to A$135). A subscription hydrogel refill at A$35 every 1 to 2 months is plausible. Its margin is UNVERIFIED (no OEM price was read), and importing a serum makes the business a cosmetics importer, which normally requires AICIS registration (UNVERIFIED here; confirm before adding serums).

### 4.3 Ad platform policies

- **Meta.** Allows ads for "laser or light treatments" and "general cosmetic products ... that depict before-and-after transformations" when targeted at people aged 18 and over. It bans "statements of inferiority about physical appearance" and "promises of specific outcomes within a set timeframe without disclaimers" ([Meta Health and Wellness policy](https://www.facebook.com/business/help/2489235377779939)). So "visible results in 4 weeks" needs qualifiers, and acne close-ups invite rejection.
- **Google.** The Healthcare and medicines policy restricts prescription drugs, pharmacies, telemedicine and unapproved substances. Its Australia section says nothing about consumer LED devices ([Google Ads policy 176031](https://support.google.com/adspolicy/answer/176031?hl=en)). Misrepresentation and unreliable-claims policies still apply (general Google policy, not re-read here).

### 4.4 Automation stack, and what still needs people

| Function | Can run on autopilot | Needs a person |
|---|---|---|
| Storefront and checkout | Shopify Basic or Grow | Copy review against the claim table |
| Fulfilment | Amazon MCF (published rates) or a quoted 3PL (eStore, ShipBob); Shippit for tracking | Inbound shipments, stock counts, Christmas forecasting |
| Email and SMS | Klaviyo flows (welcome, abandoned cart, post-purchase how-to, 30-day check-in, refill reminder) | Writing the flows once; compliance check |
| Consumables subscription | Shopify subscriptions or a subscription app | Sourcing a second SKU |
| UGC and creators | Gifting and affiliate apps | Creator selection, briefing, legal review. **Under the device route, paid testimonials are banned** |
| Paid ads | Meta Advantage+, Google Shopping | Creative testing every week. This is the actual business |
| Customer service | Help-desk macros and order-status bot | "Is this working?" questions, device faults, ACL warranty claims (a guarantee that cannot be excluded), returns inspection |
| Compliance | | One person accountable for claims, the EMC/IEC 62471 file and ARTG obligations if listed |

**Realistic split:** fulfilment, email and payments can be about 80% automated. Customer acquisition (creative and creators), supplier QC, warranty and claims compliance cannot. An honest staffing floor is one part-time operator plus a contract creative or performance marketer.

---

## 5. Risks

1. **Saturation and price war.** Over 1,000 Amazon AU results, products from A$18, and SharkNinja selling an A$699.99 Class IIa mask for A$419. Shark has appliance-retail distribution (JB Hi-Fi, Myer) that a Shopify brand cannot match. The mid-tier already has at least five Australian brands (Kahlia, Beauty By Light, Luminex Glow, Bon Charge, LumiMask).
2. **The claims trap.** The claims that sell (acne, collagen, wrinkles) need an ARTG entry. The ARTG entry bans the paid-creator testimonials that drive sales. The cosmetic route depends on a TGA position the TGA says is "under review", in a category it has named as a 2026 to 2027 compliance focus.
3. **Warranty, returns and eye safety.** LED arrays, batteries and controllers fail. Bon Charge already sells replacement controllers (A$135) and cables, which signals a real fault rate. ACL guarantees cannot be excluded. The Neutrogena retinal-risk recall shows the worst case, which is why an IEC 62471 report is a precondition.
4. **Christmas seasonality.** Searches peak on 21 to 27 December. A brand that misses the Q4 stock window carries a year of slow inventory. Christmas 2026 is effectively out of reach from 2 October without a published lead time.
5. **Channel conflict with Refer Labs.** Foreo is a partner, and CurrentBody and Bon Charge are proposed affiliate programs. An own brand competing with them on a comparison page needs explicit ownership disclosure, or exclusion from the page, under the hub-neutrality rule.

---

## Open items before any commitment

- OEM quotes: Kaiyan plus two Global Sources makers, at 500 and 1,000 units, with IEC 62471, EMC and UN38.3 reports.
- A customs broker's tariff classification.
- ACMA EMC compliance level for an LED mask.
- AICIS registration if serums are added.
- A 3PL quote against Amazon MCF.
- Product liability insurance quote (UNVERIFIED cost).
- Jarred's decision on the device route versus the cosmetic route, which sets everything else: copy, creators, fees and timeline.
