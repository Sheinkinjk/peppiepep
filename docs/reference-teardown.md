# Reference teardown

**Date:** 10 September 2026
**Method:** Playwright, Chromium, real page loads at 1440x900 and 390x844. Every number below comes from `getComputedStyle` and `getBoundingClientRect` on the live DOM. Nothing is eyeballed off a screenshot.
**Scripts:** [`scripts/teardown/measure.mjs`](../scripts/teardown/measure.mjs) (capture + style/layout/imagery), [`scripts/teardown/ux.mjs`](../scripts/teardown/ux.mjs) (behaviour), [`scripts/teardown/path.mjs`](../scripts/teardown/path.mjs) (conversion path). Raw JSON in [`scripts/teardown/data/`](../scripts/teardown/data/).

Primaries: nerdwallet.com, comparethemarket.com.au. Secondaries for corroboration: finder.com.au, canstar.com.au, bankrate.com. Our own `/preview/home-a` and `/preview/home-b` were put through the identical script so the comparison is like-for-like.

Consent banners were dismissed before capture on every site.

---

## A. Capture

All shots in [`scripts/teardown/shots/`](../scripts/teardown/shots/). Naming: `<site>-<d|m>-<view>.png`, where `d` = 1440x900 and `m` = 390x844.

| Site | Hero | Full page | Module 1 | Header @800 | CTA focus |
|---|---|---|---|---|---|
| NerdWallet | [d](../scripts/teardown/shots/nerdwallet-d-hero.png) · [m](../scripts/teardown/shots/nerdwallet-m-hero.png) | [d](../scripts/teardown/shots/nerdwallet-d-full.png) · [m](../scripts/teardown/shots/nerdwallet-m-full.png) | [d](../scripts/teardown/shots/nerdwallet-d-module1.png) | [d](../scripts/teardown/shots/nerdwallet-d-header-800.png) | [png](../scripts/teardown/shots/nerdwallet-cta-focus.png) |
| Compare the Market | [d](../scripts/teardown/shots/ctm-d-hero.png) · [m](../scripts/teardown/shots/ctm-m-hero.png) | [d](../scripts/teardown/shots/ctm-d-full.png) · [m](../scripts/teardown/shots/ctm-m-full.png) | [d](../scripts/teardown/shots/ctm-d-module1.png) | [d](../scripts/teardown/shots/ctm-d-header-800.png) | n/a |
| Finder | [d](../scripts/teardown/shots/finder-d-hero.png) | [d](../scripts/teardown/shots/finder-d-full.png) | [d](../scripts/teardown/shots/finder-d-module1.png) | [d](../scripts/teardown/shots/finder-d-header-800.png) | [png](../scripts/teardown/shots/finder-cta-focus.png) |
| Canstar | [d](../scripts/teardown/shots/canstar-d-hero.png) | [d](../scripts/teardown/shots/canstar-d-full.png) | n/a | [d](../scripts/teardown/shots/canstar-d-header-800.png) | [png](../scripts/teardown/shots/canstar-cta-focus.png) |
| Bankrate | [d](../scripts/teardown/shots/bankrate-d-hero.png) | [d](../scripts/teardown/shots/bankrate-d-full.png) | n/a | [d](../scripts/teardown/shots/bankrate-d-header-800.png) | [png](../scripts/teardown/shots/bankrate-cta-focus.png) |
| **ours home-a** | [d](../scripts/teardown/shots/ours-a-d-hero.png) · [m](../scripts/teardown/shots/ours-a-m-hero.png) | [d](../scripts/teardown/shots/ours-a-d-full.png) | [d](../scripts/teardown/shots/ours-a-d-module1.png) | n/a | n/a |
| **ours home-b** | [d](../scripts/teardown/shots/ours-b-d-hero.png) · [m](../scripts/teardown/shots/ours-b-m-hero.png) | [d](../scripts/teardown/shots/ours-b-d-full.png) | [d](../scripts/teardown/shots/ours-b-d-module1.png) | n/a | n/a |

CTM's first hero capture landed a few hundred pixels down the page; it was re-shot with an explicit scroll-to-top ([`reshoot.mjs`](../scripts/teardown/reshoot.mjs)) and `scrollY` asserted at 0 before the shutter.

---

## B. Measurements

### Type

| Site | Largest rendered text | h1 | Body | Body (mobile) | Scale steps | Distinct combos | Primary family |
|---|---|---|---|---|---|---|---|
| NerdWallet | **52px** | 40px | 16px | 16px | 14 | 50 | Gotham |
| Compare the Market | **64px** | 32px | 16px | 16px | 12 | 25 | Plus Jakarta Sans |
| Finder | **60px** | 60px | 18px | 16px | 14 | 54 | Modern Era |
| Canstar | **40px** | 32px | 20px | 16px | 8 | 18 | Figtree |
| Bankrate | **48px** | 36px | 16px | 16px | 8 | 24 | RecifeText / Instrument Sans |
| **ours home-a** | 56px | 56px | **13px** | **13px** | **5** | 20 | Public Sans |
| **ours home-b** | 44px | 44px | **13px** | **13px** | **6** | 21 | Public Sans |

Full scales, desktop:

```
nerdwallet  10 11 12 13 14 16 18 20 24 24.6 28 36 40 52
ctm         10 11 12 14 16 18 20 24 32 48 56 64
finder      10 11 12 14 16 17 18 18.4 20 24 26 30 36 60
canstar     11 12 14 16 18 20 32 40
bankrate    12 14 16 18 20 28 36 48
ours-a      13 16 20 32 56
ours-b      13 16 20 24 32 44
```

**The ratio is not uniform, and that matters.** Every reference runs a dense, near-linear ramp through the small sizes (10, 11, 12, 14, 16, 18, 20, steps of 1 to 2px) and then jumps hard to display sizes. NerdWallet's step from 20 to 24 is 1.20x, 24 to 28 is 1.17x, then 28 to 36 is 1.29x and 40 to 52 is 1.30x. CTM: 24 to 32 is 1.33x, 32 to 48 is 1.50x, 48 to 64 is 1.33x.

Ours is the opposite shape: 13, 16, 20, 32, 56. That is 1.23x, 1.25x, then **1.60x**, then **1.75x**. We have no 24 and no 40. The gap between our sub-head and our display size has nothing in it, which is why the page reads as two sizes rather than a hierarchy.

**Body text is the clearest single miss.** Every reference sets long-form body at 16px or larger on both breakpoints. Ours is 13px on both. Our `--rl-s--1` (0.8125rem) is doing the work their `--body` (1rem) does.

### Colour

| Site | Accent area % of document | Painted % | Dominant accents (by area) |
|---|---|---|---|
| Compare the Market | **44.30%** | 118.7 | `rgb(15,88,171)`, `rgb(0,20,100)` |
| Bankrate | **29.12%** | 155.3 | `rgb(19,34,59)`, oklab dark navy |
| Finder | **15.39%** | 48.7 | `rgb(29,83,255)`, `rgb(9,38,115)`, `rgb(10,65,238)` |
| NerdWallet | **8.71%** | 119.8 | `rgb(0,102,66)`, `rgb(0,130,84)`, `rgb(229,255,192)` |
| Canstar | 0.24% | 52.2 | `rgb(0,149,169)` |
| **ours home-a** | **0.31%** | 139.7 | `rgb(14,124,90)` |
| **ours home-b** | **0.15%** | 142.2 | `rgb(14,124,90)` |

Median across the five references: **15.39%**. Ours: **0.31%**. We spend roughly **fifty times less colour** than the median reference.

Canstar is the outlier at 0.24%, and it is instructive rather than a counter-example: it carries **87 images including 15 photographic**, so it buys its warmth with imagery instead of colour fields. It is the one reference that does what we do (near-white ground) and it compensates with pictures. We do neither.

"Painted %" exceeds 100 because nested elements each paint their own background; it is a stacking measure, not a coverage measure. Accent % is against total document area and is the comparable figure.

### Depth

| Site | Real shadows | Blur of most-used | Distinct radii | Most-used radius |
|---|---|---|---|---|
| NerdWallet | **6** | 16px | 11 | 16px |
| Canstar | 4 | 8px | 6 | 8px |
| Finder | 4 | 8px | 16 | 12px |
| Compare the Market | 2 | 0px (hard offset `8px 8px 0`) | 5 | 8px |
| Bankrate | 1 | 15px | 10 | 12px |
| **ours home-a / home-b** | **1** | 8px | **3** | 6px / 12px |

"Real" excludes Tailwind's transparent `rgba(0,0,0,0) 0px 0px 0px 0px` reset, which is what NerdWallet's and Bankrate's raw top entry actually is. Filtering it changes NerdWallet from 7 to 6 and Bankrate from 2 to 1.

Elevation is a **mix** on four of five: shadow plus a light border plus a surface fill lighter than the page ground. NerdWallet's most-used card shadow is `rgba(100,102,106,0.05) 0px 4px 16px` used 35 times, plus a heavier `0px 20px 25px -5px` for the raised tray. That is **two levels, deliberately different**. CTM does something unusual and worth naming: a hard, blur-free offset shadow in a *lighter tint of its own brand blue* (`rgb(180,212,248) 8px 8px 0px 0px`), which reads as printed rather than as a drop shadow.

Ours uses **one shadow value on everything that is elevated at all**, and a near-white surface on a near-white ground, so the shadow has almost nothing to separate.

### Layout

| Site | Container | Gutter (desktop) | Gutter (mobile) | Grid columns seen |
|---|---|---|---|---|
| Compare the Market | 1344px | 20px | 16px | n/a |
| Bankrate | 1280px | 24px | 16px | 2col x5, 3col x2, 4col x2 |
| Canstar | 1230px | 35px | 24px | 12col x3, 4col, 3col |
| Finder | 1160px | 73px | 12px | 2col x6, 8col x2, 5col |
| NerdWallet | 1152px | 24px | 16px | 3col x4, 2col x3 |
| **ours** | 1120px | **16px** | 16px | 3col x4, 4col x2 |

Median container **1230px**; ours 1120px is the narrowest measured. Median desktop gutter **24px**; ours 16px.

**Vertical rhythm, section by section down the page** (top-level children of `main`, desktop):

NerdWallet:
```
 0  h=500   pad   0/0    imgs=2    "Smart financial decisions start with NerdWallet"
 1  h=532   pad   0/0    imgs=10
 2  h=526   pad  80/80   imgs=41   "Why millions trust NerdWallet"
 3  h=752   pad   0/96   imgs=22   "News That Impacts Your Wallet"
 4  h=718   pad  64/64   imgs=2    "Find smarter rates today"
 5  h=224   pad   0/0    imgs=0
 6  h=572   pad   0/0    imgs=2    "Earn 3.9% APY on your cash"
 7  h=784   pad  48/48   imgs=181  "More resources"
 8  h=821   pad  32/56   imgs=2    "Track, save, and invest"
 9  h=104   pad   0/0    imgs=0
```

Compare the Market:
```
 0  h=601   pad   0/0    imgs=4    "AUSTRALIA'S #1 FOR COMPARISON"
 1  h=449   pad  60/60   imgs=0
 2  h=563   pad  80/80   imgs=13   "We compare hundreds of products..."
 3  h=796   pad  80/80   imgs=1    "It pays to compare"
 4  h=959   pad  80/80   imgs=0    "Why compare with us?"
 5  h=702   pad   0/0    imgs=3    "We believe the best decisions..."
 6  h=527   pad  80/80   imgs=14   "As seen in the media"
```

ours home-a:
```
 0  h=474   pad  72/72   imgs=3    "Independent comparisons, with the date we checked."
 1  h=219   pad  44/44   imgs=0
 2  h=970   pad  72/72   imgs=8    "Current offers"
 3  h=399   pad  72/72   imgs=0    "How we compare"
 4  h=199   pad  44/44   imgs=6
 5  h=400   pad  72/72   imgs=0    "Popular comparisons"
 6  h=142   pad  44/44   imgs=0
 7  h=284   pad  44/44   imgs=0    "Get the re-checks"
```

CTM's rhythm is **the most disciplined of the five**: 80/80 on four of seven sections, 60/60 once, 0/0 on the two full-bleed bands. Section heights sit between 449 and 959px. NerdWallet varies more (0 to 96) but its *sections* are tall: median height 572px against ours at 341px.

Our padding (72/72 and 44/44) is within range. **Our section heights are not.** Our shortest content sections are 142px and 199px, which is a strip rather than a section.

Finder, Canstar and Bankrate return 1 to 6 sections because their markup does not put sections as direct children of `main`. Their rhythm is not comparable and is excluded from that median.

### Imagery

| Site | Total | Above fold | Below | Photography | Illustration | Logo | Icon |
|---|---|---|---|---|---|---|---|
| Canstar | 87 | 17 | 70 | 8 (+7 png) | 0 | 26 | 46 |
| NerdWallet | 86 | 17 | 69 | **24** | 0 | 23 | 26 |
| Compare the Market | 39 | 5 | 34 | 1 (+6 png) | 0 | 18 | 14 |
| Finder | 37 | 2 | 35 | 6 | 2 | 20 | 8 |
| Bankrate | 14 | 1 | 13 | 2 (+1 png) | 0 | 9 | 2 |
| **ours home-a** | 17 | 3 | 14 | **0** | **0** | 2 | 15 |
| **ours home-b** | 14 | 3 | 11 | **0** | **0** | 2 | 12 |

Classification is heuristic: by file extension, rendered size, alt text and whether the node sits inside header/nav/footer. `illustration-or-photo` is a PNG over 120px that could be either; it is reported separately above rather than guessed.

**Median photographic or illustrative content across the five: 7 assets. Ours: zero, on both variants.** Our 17 "images" are 15 icons and 2 partner logos. Every reference puts a person or an object on the page. We put no picture of anything.

Gradient-carrying elements: NerdWallet and CTM both use them, and both use them as the hero colour field rather than as decoration on cards.

### Controls

Automated CTA detection picked the first filled control above the fold, which on several sites is the nav "Log in" or "Sign up" rather than the hero action. Those rows are marked.

| Site | Control | Height | Pad X | Radius | Size/weight | Fill | Hover | Focus |
|---|---|---|---|---|---|---|---|---|
| NerdWallet | "Sign Up" *(nav)* | 44px | 16px | **2px** | 13px/700 | `rgb(0,130,84)` | bg to `rgb(216,217,218)` | `1px auto rgb(0,95,204)`, offset 1px |
| Finder | "Log in" *(nav)* | 34px | 14px | 8px | 16px/800 | `rgb(10,65,238)` | n/a | n/a |
| Canstar | "Join" *(nav)* | 42px | 9px | **20px** | 14px/400 | `rgb(0,149,169)` | n/a | n/a |
| Bankrate | "Log in" *(nav)* | 38px | 16px | 8px | 14px/700 | `rgb(0,97,254)` | n/a | n/a |
| CTM | hero CTA is "Compare now" on the category page, not the homepage | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| **ours home-a** | "Browse current offers" | 44px | 18.4px | 6px | 16px/500 | `rgb(14,124,90)` | bg to `rgb(10,92,67)` | `2px solid`, offset 2px |

Our button geometry is **already in range** (44px tall, 18px padding). Our font weight is 500 against their 700 to 800. Our focus treatment is stronger than any reference measured: NerdWallet ships the browser default `1px auto`.

---

## C. Behaviour

### Header on scroll

| Site | Changes at scrollY 800 | What changes |
|---|---|---|
| NerdWallet | **yes** | position and background resolve to a solid sticky bar |
| Finder | **yes** | sticky, background solidifies |
| Canstar | **yes** | sticky |
| Bankrate | **yes** | sticky |
| Compare the Market | **no** | header scrolls away entirely and does not return |
| ours home-a / home-b | yes | sticky, no visual change |

CTM is the odd one out and it is a deliberate choice: the homepage header is a thin utility bar that leaves, because the page's job is to get you into a category tray that is already on screen.

### The primary conversion path

**Compare the Market.** Clicking a category tile is a **full page navigation** to a dedicated landing page (`/car-insurance/`), not a modal and not an inline form. That landing page has **zero visible form fields**. The funnel is deferred behind a "Compare now" button, which appears four times on the page. So the count of fields before the first result on the homepage is **zero**, and on the category page it is still **zero**. They ask for nothing until you have chosen a category and clicked a second time.

**NerdWallet.** A category tile also navigates on-site (`/h/category/credit-cards`). Of the 14 CTA links on that page, **0 are offsite**. Labels are all "Compare credit cards", "Compare top lenders", "Compare car insurance quotes". The monetised outbound click lives deeper than the second page.

**Neither primary sends a visitor offsite from the homepage or the category page.** Both spend two full pages building context before asking for anything. Our home-a hero sends you to `/deals`, and `/deals` links straight out to the merchant.

### What the page asks for before it gives anything

| Site | Forms above fold | Inputs above fold | Email gate |
|---|---|---|---|
| NerdWallet | 1 | 24 (the NerdAI search plus a hidden nav search set) | no |
| Finder | 1 | 3 | no |
| Bankrate | 1 | 1 | no |
| Compare the Market | 0 | **0** | no |
| Canstar | 0 | 0 | no |
| ours home-a / home-b | 0 | 0 | no |

None of the five gates content behind an email. NerdWallet's hero input is a *question box*, not a lead capture: it invites a query and answers it.

### Hover

Card and row hover produced **no measurable computed-style change** on NerdWallet, CTM, Finder or Bankrate in this harness. That is a limitation of measuring `:hover` through CDP rather than proof that nothing happens; treat as inconclusive. The CTA hovers that did register: NerdWallet's nav button swaps fill from green to grey, ours darkens green to `rgb(10,92,67)`.

### Keyboard

All five sites put a visible focus ring on nav links. NerdWallet uses the browser default (`1px auto rgb(0,95,204)`, offset 1px). Ours is `2px solid` at 2px offset, which is the strongest of the set. **This is the one dimension where our build already beats every reference.**

### Motion

Twelve distinct transition or animation rules on NerdWallet, CTM, Finder and Bankrate; five on Canstar; ten and eleven on ours. Durations cluster at 0.2s to 0.3s with `ease` or `ease-in-out`. **No reference animates sections in on scroll.** There is no fade-and-slide-up pattern anywhere in the set. Motion is confined to hover, focus, menu open and carousel movement.

---

## D. Looking at them

### NerdWallet

[Hero at 1440](../scripts/teardown/shots/nerdwallet-d-hero.png)

**Hero anatomy.** The first screen is roughly: 100px white utility header, then a 700px band split about 55/45 between a deep green colour field on the left and a full-bleed lifestyle photograph on the right. The photograph is a man on a green sofa looking at his phone, and it is colour-matched to the brand green so tightly that the join between field and photo is nearly invisible. The eye lands on the headline first, because it is white, 52px, and sits on the darkest part of the field. The second landing point is the white search input, which is the brightest object on screen.

Then the move that does most of the work: a **white rounded tray slides up over the bottom edge of the green field**, carrying ten category cards with full-colour illustrated icons. The tray overlaps the hero by about 100px. That overlap is what creates depth on this page. Nothing else needed to do it.

**Module sequence, with heights.** Hero 500px → category tray 532px → "Why millions trust NerdWallet" 526px with 41 images → "News That Impacts Your Wallet" 752px with 22 images → "Find smarter rates today" 718px → 224px spacer → "Earn 3.9% APY on your cash" 572px → "More resources" 784px with 181 images → app promo 821px → 104px footer lead-in.

**Where it spends its boldness.** The headline word "NerdWallet" set in acid green against white on dark green. One word. Everything else in the hero is white or photographic. That single colour decision is the most confident thing on the page.

**How trust is built, module by module.** Photography of an ordinary person first (this is for you). Category cards second (we cover your thing). "Why millions trust NerdWallet" third, with 41 images, which is where the awards and press marks live. News fourth (we are current). Product rates fifth (we have the numbers).

**Why it reads expensive.** The photograph is colour-graded into the brand palette rather than dropped in. The illustrated icons are a consistent commissioned set with a shared perspective and shadow direction, not stock glyphs. And the tray overlap is a compositing decision that costs nothing to build but is invisible unless someone chose it.

**What it does badly.** The category tray is ten cards of near-identical weight, so no category is prioritised and the eye has nowhere to go after the first row. And the NerdAI chat bubble bottom-right collides with the tray on a 1440 viewport.

### Compare the Market

[Hero at 1440](../scripts/teardown/shots/ctm-d-hero.png)

**Hero anatomy.** A thin cream utility bar, then an 830px saturated blue field running the full width, gradient from deep blue at the left edge to a brighter blue at right. Headline in all caps at 64px, two-tone: white "AUSTRALIA'S #1" over pale blue "FOR COMPARISON". Sub-copy in white beneath. Then a **darker blue trust panel** carrying a 4.5-star rating, a ProductReview award mark and a Feefo Platinum Trusted Service Award. Right side: a cut-out photograph of a television presenter with the meerkat mascot and a gold "1" trophy, overlapping the field edge.

Then the same structural move as NerdWallet: a **pale blue rounded tray overlapping the bottom of the colour field**, holding fourteen white category cards in a 6/4/4 arrangement. The first six carry a blue icon on a folded-corner pin shape; the remaining eight are text with a small blue icon.

**Module sequence.** Hero 601px → 449px band → "We compare hundreds of products" 563px → "It pays to compare" 796px → "Why compare with us?" 959px → brand statement 702px → "As seen in the media" 527px.

**Where it spends its boldness.** The blue. 44.3% of the document's area is accent colour. There is no timidity anywhere in this page: it commits to one hue and floods the viewport with it.

**How trust is built.** Rating and awards inside the hero, above the fold, in a panel that is visually separated from the headline so it reads as evidence rather than decoration. Then breadth of providers. Then a values statement. Then media logos.

**Why it reads expensive.** Production value in the photography (a commissioned shoot with a licensed celebrity and a CG mascot), and the discipline of the rhythm: 80/80 padding on four consecutive sections, one container width, one radius family.

**What it does badly.** The trust panel is doing four jobs in one strip and the Feefo and ProductReview marks are small enough to be unreadable at a glance. And the all-caps headline plus the "#1" claim reads as advertising, which slightly undercuts the neutrality a comparison site is selling.

### What neither of them does that our spec assumed

Neither uses hairline-bordered transparent chips as category entry points. Both use **filled white cards, elevated, on a coloured ground**. That contrast between card and ground is what makes the cards read as buttons. Ours are transparent boxes with a 1px border on a near-white ground, which is why they read as barely-there.

---

## E. Synthesis

### Medians and ranges across all five references

| Metric | Median | Min | Max | ours home-a | ours home-b | Gap |
|---|---|---|---|---|---|---|
| Hero headline (desktop) | **52px** | 40 | 64 | 56px | 44px | **in range** |
| Hero headline (mobile) | **36px** | 28 | 42 | 36px | 32px | **in range** |
| Body size (desktop) | **16px** | 16 | 20 | 13px | 13px | 1.23x under |
| Body size (mobile) | **16px** | 16 | 16 | 13px | 13px | 1.23x under |
| Type scale steps | **12** | 8 | 14 | 5 | 6 | **2.4x under** |
| Container width | **1230px** | 1152 | 1344 | 1120px | 1120px | narrowest of 7 |
| Section padding (dominant) | **80/80** | 32 | 96 | 72/72 | 52/52 | slightly under |
| Median section height | **572px** (NW) / 601px (CTM) | 449 | 959 | 341px | 350px | **1.7x under** |
| Card radius | **12px** | 8 | 16 | 6px | 12px | A is 2x under |
| Distinct radii | **10** | 5 | 16 | 3 | 3 | **3.3x under** |
| Real shadows | **4** | 1 | 6 | 1 | 1 | **4x under** |
| Accent area | **15.39%** | 0.24 | 44.3 | **0.31%** | **0.15%** | **50x under** |
| Total images | **39** | 14 | 87 | 17 | 14 | 2.3x under |
| Photographic / illustrative | **7** | 3 | 24 | **0** | **0** | **absolute** |

### Modules on four or more of five, in their common order

1. **Thin utility header**: logo, category nav, sign in. 5/5.
2. **Hero: colour field or photograph, headline, one action.** 5/5. Four of five use a saturated full-bleed field; NerdWallet and CTM both put a person in it.
3. **Category entry tray, overlapping the hero's bottom edge.** 4/5 (NerdWallet, CTM, Canstar, Finder). This is the strongest convention in the set and the one we should not fight.
4. **Trust / proof strip**: ratings, awards, provider counts, press. 5/5, and on CTM it is inside the hero.
5. **Product or rate comparison module** with real numbers in rows. 5/5.
6. **Editorial / guides block** with dates. 4/5.
7. **Provider or partner logo wall.** 4/5.
8. **Heavy multi-column footer.** 5/5.

Our current order is: hero → category chips → offers → how we compare → partner strip → popular comparisons → editorial line → newsletter → footer. That is **already close to the convention**. The sequence is not the problem.

### The three techniques most responsible for the premium feel, ranked

**1. A saturated colour field behind the hero, at 15% or more of total page area.**
Median accent coverage across the references is 15.39%; CTM runs 44.3%, Bankrate 29.1%, Finder 15.4%. We run 0.31%. This is the single largest measured gap, at roughly fifty times. It is also the cheapest to close: it needs no assets, only the confidence to fill a band with brand colour and put white type on it.

**2. Photography or commissioned illustration of a person or object.**
Median 7 photographic or illustrative assets per page, NerdWallet 24. We have **zero** on both variants. Our 17 "images" are icons and two partner logos. Canstar proves the trade-off is real rather than stylistic: it is the only reference with near-zero accent colour, and it carries 15 photographic assets to compensate. A near-white page with no pictures, which is what we built, is the one combination none of the five ships.

**3. An elevated white surface overlapping a coloured ground, with more than one elevation level.**
Four of five put a white card tray over the bottom edge of the hero field. NerdWallet runs 6 distinct real shadows across two clear levels: `0px 4px 16px rgba(...,0.05)` on 35 cards, and `0px 20px 25px -5px` on the raised tray. We run **one shadow on everything**, and we run it on a white surface sitting on a near-white ground, so it has nothing to separate from. Depth here is a function of contrast between card and ground, not of the shadow value.

### Our build against all five, bluntly

Looking at [ours home-a](../scripts/teardown/shots/ours-a-d-hero.png) beside [NerdWallet](../scripts/teardown/shots/nerdwallet-d-hero.png) and [CTM](../scripts/teardown/shots/ctm-d-hero.png):

1. **There is no colour field.** The entire hero is `#F4F7F5`. Both primaries fill the hero with saturated brand colour. We spend 0.31% of the page on accent against a 15.39% median.
2. **There is no picture of anything.** Zero photographic or illustrative assets. Every reference has at least three.
3. **The proof card is white on near-white.** It carries our only shadow, and that shadow is `0.04` and `0.06` alpha, so the card barely lifts. On both primaries the equivalent tray is white on saturated colour, which needs no shadow at all to read as elevated.
4. **The category chips are transparent with a hairline border.** No reference does this. All four that have a category tray use filled white cards on a coloured ground.
5. **Body copy is 13px against a 16px median**, on both desktop and mobile. Our descriptive text is set at the size the references use for legal footnotes.
6. **The type scale has five steps against a median of twelve**, and the two largest gaps are 1.60x and 1.75x. There is no 24px and no 40px. Hierarchy needs the rungs we removed.
7. **One radius and one shadow across the whole page**, against medians of 10 and 4. Every card has identical elevation regardless of importance.
8. **Sections are half their height.** Our median content section is 341px against 572px on NerdWallet and 601px on CTM. Two of our sections are 142px and 199px, which is a strip.
9. **The gutter is 16px against a 24px median**, and the container is 1120px, the narrowest of all seven pages measured.
10. **There is a dead band in the hero.** Roughly 150px of empty `#F4F7F5` sits between the CTA row and the category chips, doing nothing. On both primaries that zone is where the tray overlaps the field.
11. **home-b's hero has no filled CTA at all** above the fold; the automated pass found none. The category tiles are the only action, and they are white on near-white.

Where we already match or beat them: hero headline size (56px against a 52px median), button geometry (44px tall, 18px padding), focus treatment (2px solid at 2px offset, stronger than any reference), module order, and CLS at 0.

**Would a designer guess it was machine-generated?** Yes, and the specific tells are: one shadow value used everywhere regardless of hierarchy, one radius, a palette that never commits to its own accent, hairline borders substituting for contrast, and no image of anything anywhere. It reads as a page assembled from tokens rather than composed.

---

## Measurement limitations

- **Section rhythm is only comparable for NerdWallet, CTM and ours.** Finder, Canstar and Bankrate do not put sections as direct children of `main`, so the walker returns 1 to 6 nodes and their per-section padding is not measured. They are excluded from that median.
- **CTA auto-detection picked nav buttons** on NerdWallet, Finder, Canstar and Bankrate, because those are the first filled controls above the fold. The hero actions on those sites are inputs or text links. Rows are marked.
- **Card hover returned no computed change** on four sites. Measuring `:hover` through CDP is unreliable; this is inconclusive, not a finding.
- **Imagery classification is heuristic** (extension, rendered size, alt text, nav ancestry). `illustration-or-photo` is reported as its own bucket rather than guessed into one.
- **Accent-colour detection treats any background with a max-min RGB channel spread under 26 as neutral.** Bankrate's dark navy `rgb(19,34,59)` counts as accent under that rule, which is arguably right for a brand colour and arguably inflates its 29.12%.
- All figures are a single capture on 10 September 2026. These are live commercial sites and will drift.
