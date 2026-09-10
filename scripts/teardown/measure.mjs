/**
 * Reference teardown: capture + measure.
 *
 * Everything measured here comes from the live DOM via getComputedStyle and
 * getBoundingClientRect. Nothing is eyeballed off a screenshot.
 *
 *   node scripts/teardown/measure.mjs [siteKey]
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = "scripts/teardown";
const SHOTS = join(ROOT, "shots");
const DATA = join(ROOT, "data");
mkdirSync(SHOTS, { recursive: true });
mkdirSync(DATA, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const SITES = {
  nerdwallet: { url: "https://www.nerdwallet.com/", primary: true },
  ctm: { url: "https://www.comparethemarket.com.au/", primary: true },
  finder: { url: "https://www.finder.com.au/", primary: false },
  canstar: { url: "https://www.canstar.com.au/", primary: false },
  bankrate: { url: "https://www.bankrate.com/", primary: false },
  "ours-a": { url: "http://localhost:3000/preview/home-a", primary: false },
  "ours-b": { url: "http://localhost:3000/preview/home-b", primary: false },
  plate: { url: "http://localhost:3000/preview/plate", primary: false },
};

const BREAKPOINTS = [
  { key: "d", width: 1440, height: 900, mobile: false },
  { key: "m", width: 390, height: 844, mobile: true },
];

/** Cookie/consent dismissal. Generic text match first, then known ids. */
async function dismissConsent(page) {
  const attempts = [
    '#onetrust-accept-btn-handler',
    '#truste-consent-button',
    'button[id*="accept" i]',
    'button[class*="accept" i]',
    '[aria-label*="accept" i]',
  ];
  for (const sel of attempts) {
    try {
      const el = await page.$(sel);
      if (el && (await el.isVisible())) {
        await el.click({ timeout: 2500 });
        await page.waitForTimeout(700);
        return sel;
      }
    } catch {}
  }
  // Text-based fallback
  for (const rx of [/^accept all/i, /^accept cookies/i, /^i accept/i, /^got it/i, /^allow all/i, /^agree/i]) {
    try {
      const btn = page.getByRole("button", { name: rx }).first();
      if (await btn.isVisible({ timeout: 1200 })) {
        await btn.click({ timeout: 2500 });
        await page.waitForTimeout(700);
        return String(rx);
      }
    } catch {}
  }
  return null;
}

/** Close any modal/interstitial that is not a consent banner. */
async function dismissInterstitial(page) {
  for (const rx of [/^close/i, /^no thanks/i, /^dismiss/i, /^maybe later/i, /^skip/i]) {
    try {
      const btn = page.getByRole("button", { name: rx }).first();
      if (await btn.isVisible({ timeout: 900 })) {
        await btn.click({ timeout: 2000 });
        await page.waitForTimeout(500);
      }
    } catch {}
  }
}

/* ------------------------------------------------------------------ */
/* The in-page measurement. Runs in the browser.                       */
/* ------------------------------------------------------------------ */
const MEASURE = () => {
  const vw = innerWidth, vh = innerHeight;
  const all = [...document.querySelectorAll("body *")];
  const visible = all.filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });

  const rectOf = (el) => el.getBoundingClientRect();
  const area = (el) => { const r = rectOf(el); return Math.max(0, r.width) * Math.max(0, r.height); };
  const hasOwnText = (el) =>
    [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);

  /* ---- TYPE ---- */
  const typeMap = new Map();
  for (const el of visible) {
    if (!hasOwnText(el)) continue;
    const cs = getComputedStyle(el);
    const key = [
      cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
      Math.round(parseFloat(cs.fontSize) * 10) / 10,
      cs.fontWeight,
      Math.round(parseFloat(cs.lineHeight) * 10) / 10 || "normal",
      cs.letterSpacing,
    ].join("|");
    const cur = typeMap.get(key) || { count: 0, sample: "", maxArea: 0 };
    cur.count++;
    const a = area(el);
    if (a > cur.maxArea) { cur.maxArea = a; cur.sample = el.textContent.trim().replace(/\s+/g, " ").slice(0, 60); }
    typeMap.set(key, cur);
  }
  const type = [...typeMap.entries()]
    .map(([k, v]) => {
      const [family, size, weight, lineHeight, letterSpacing] = k.split("|");
      return { family, size: +size, weight: +weight, lineHeight, letterSpacing, count: v.count, sample: v.sample };
    })
    .sort((a, b) => b.count - a.count);

  /* largest headline actually rendered */
  const headlineEl = visible
    .filter((el) => hasOwnText(el) && /^H[1-3]$/.test(el.tagName))
    .sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize))[0];
  const biggestText = visible
    .filter(hasOwnText)
    .sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize))[0];

  /* body size = most common size on elements with >40 chars of own text */
  const bodyCount = new Map();
  for (const el of visible) {
    if (!hasOwnText(el)) continue;
    const t = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();
    if (t.length < 40) continue;
    const s = Math.round(parseFloat(getComputedStyle(el).fontSize));
    bodyCount.set(s, (bodyCount.get(s) || 0) + 1);
  }
  const bodySize = [...bodyCount.entries()].sort((a, b) => b[1] - a[1])[0] || [null, 0];

  /* ---- COLOUR ---- */
  const norm = (c) => c.replace(/\s+/g, "");
  const bg = new Map(), fg = new Map();
  let paintedTotal = 0;
  for (const el of visible) {
    const cs = getComputedStyle(el);
    const a = area(el);
    const b = norm(cs.backgroundColor);
    if (b && b !== "rgba(0,0,0,0)" && !b.startsWith("rgba(0,0,0,0)")) {
      const cur = bg.get(b) || { count: 0, area: 0 };
      cur.count++; cur.area += a; bg.set(b, cur);
      paintedTotal += a;
    }
    if (hasOwnText(el)) {
      const c = norm(cs.color);
      const cur = fg.get(c) || { count: 0, area: 0 };
      cur.count++; cur.area += a; fg.set(c, cur);
    }
  }
  const bgSorted = [...bg.entries()].map(([c, v]) => ({ color: c, count: v.count, area: Math.round(v.area) }))
    .sort((a, b) => b.area - a.area);
  const fgSorted = [...fg.entries()].map(([c, v]) => ({ color: c, count: v.count, area: Math.round(v.area) }))
    .sort((a, b) => b.count - a.count);

  /* accent coverage: saturated, non-neutral background colours as a share of
     the painted area of the whole document */
  const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const isNeutral = ([r, g, b2]) => {
    if (r === undefined) return true;
    const mx = Math.max(r, g, b2), mn = Math.min(r, g, b2);
    return mx - mn < 26; // near-grey
  };
  const docArea = document.documentElement.scrollWidth * document.documentElement.scrollHeight;
  const accentArea = bgSorted.filter((x) => !isNeutral(parse(x.color))).reduce((s, x) => s + x.area, 0);
  const accentColours = bgSorted.filter((x) => !isNeutral(parse(x.color))).slice(0, 12);

  /* ---- DEPTH ---- */
  const shadows = new Map(), radii = new Map(), borders = new Map();
  for (const el of visible) {
    const cs = getComputedStyle(el);
    if (cs.boxShadow && cs.boxShadow !== "none") shadows.set(cs.boxShadow, (shadows.get(cs.boxShadow) || 0) + 1);
    const r = cs.borderRadius;
    if (r && r !== "0px") radii.set(r, (radii.get(r) || 0) + 1);
    if (cs.borderTopWidth !== "0px" || cs.borderBottomWidth !== "0px")
      borders.set(`${cs.borderTopWidth}/${cs.borderTopStyle}`, (borders.get(`${cs.borderTopWidth}/${cs.borderTopStyle}`) || 0) + 1);
  }

  /* ---- LAYOUT ---- */
  const containers = visible
    .filter((el) => { const cs = getComputedStyle(el); return cs.maxWidth !== "none" && parseFloat(cs.maxWidth) > 600; })
    .map((el) => Math.round(parseFloat(getComputedStyle(el).maxWidth)));
  const containerCount = new Map();
  containers.forEach((c) => containerCount.set(c, (containerCount.get(c) || 0) + 1));

  const main = document.querySelector("main") || document.body;
  const sections = [...main.children].filter((el) => {
    const cs = getComputedStyle(el);
    const r = rectOf(el);
    return cs.display !== "none" && r.height > 40;
  }).map((el, i) => {
    const cs = getComputedStyle(el);
    const r = rectOf(el);
    return {
      i, tag: el.tagName, cls: String(el.className).slice(0, 40),
      height: Math.round(r.height),
      paddingTop: Math.round(parseFloat(cs.paddingTop)),
      paddingBottom: Math.round(parseFloat(cs.paddingBottom)),
      bg: norm(cs.backgroundColor),
      heading: el.querySelector("h1,h2,h3")?.textContent?.trim().replace(/\s+/g, " ").slice(0, 52) || null,
      imgs: el.querySelectorAll("img").length,
    };
  });

  /* gutter: distance from viewport edge to the first wide container's content */
  const wide = visible.filter((el) => { const r = rectOf(el); return r.width > vw * 0.6 && r.width <= vw + 2; })
    .sort((a, b) => rectOf(a).top - rectOf(b).top);
  let gutter = null;
  for (const el of wide) {
    const cs = getComputedStyle(el);
    const pl = parseFloat(cs.paddingLeft);
    if (pl > 0) { gutter = Math.round(pl); break; }
  }
  const grids = visible.filter((el) => getComputedStyle(el).display === "grid")
    .map((el) => getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length)
    .filter((n) => n > 1);
  const gridCount = new Map();
  grids.forEach((g) => gridCount.set(g, (gridCount.get(g) || 0) + 1));

  /* ---- IMAGERY ---- */
  const fold = vh;
  const classify = (el, r, src) => {
    const alt = (el.getAttribute?.("alt") || "").toLowerCase();
    const inNav = !!el.closest?.("header,nav,footer");
    const max = Math.max(r.width, r.height);
    const s = (src || "").toLowerCase();
    if (/\.svg($|\?)/.test(s) && max <= 56) return "icon";
    if (max <= 40) return "icon";
    if (inNav && max <= 220) return "logo";
    if (/logo|brand/.test(s) || /logo/.test(alt)) return "logo";
    if (/\.(jpe?g|webp|avif)($|\?)/.test(s)) return max >= 120 ? "photography" : "icon";
    if (/\.svg($|\?)/.test(s)) return max >= 120 ? "illustration" : "icon";
    if (/\.png($|\?)/.test(s)) return max >= 120 ? "illustration-or-photo" : "icon";
    if (alt === "" || el.getAttribute?.("role") === "presentation") return "decorative";
    return "unclassified";
  };
  const imgs = [...document.querySelectorAll("img")].filter((el) => {
    const cs = getComputedStyle(el); const r = rectOf(el);
    return cs.display !== "none" && r.width > 4 && r.height > 4;
  }).map((el) => {
    const r = rectOf(el);
    const src = el.currentSrc || el.src || "";
    return {
      kind: "img", src: src.split("/").pop()?.slice(0, 48) || "",
      w: Math.round(r.width), h: Math.round(r.height),
      ratio: r.height ? +(r.width / r.height).toFixed(2) : null,
      aboveFold: r.top + scrollY < fold,
      cls: classify(el, r, src),
      alt: (el.getAttribute("alt") || "").slice(0, 40),
    };
  });
  const bgImgs = visible.filter((el) => {
    const bi = getComputedStyle(el).backgroundImage;
    return bi && bi !== "none" && !bi.startsWith("linear-gradient") && !bi.startsWith("radial-gradient");
  }).map((el) => {
    const r = rectOf(el);
    const src = (getComputedStyle(el).backgroundImage.match(/url\(["']?([^"')]+)/) || [])[1] || "";
    return {
      kind: "bg", src: src.split("/").pop()?.slice(0, 48) || "",
      w: Math.round(r.width), h: Math.round(r.height),
      ratio: r.height ? +(r.width / r.height).toFixed(2) : null,
      aboveFold: r.top + scrollY < fold,
      cls: classify(el, r, src), alt: "",
    };
  });
  const gradients = visible.filter((el) => /gradient/.test(getComputedStyle(el).backgroundImage)).length;

  /* ---- MOTION ---- */
  const motion = new Map();
  for (const el of visible) {
    const cs = getComputedStyle(el);
    if (cs.transitionDuration && cs.transitionDuration !== "0s") {
      const k = `${cs.transitionProperty}|${cs.transitionDuration}|${cs.transitionTimingFunction}`;
      motion.set(k, (motion.get(k) || 0) + 1);
    }
    if (cs.animationName && cs.animationName !== "none") {
      const k = `@${cs.animationName}|${cs.animationDuration}|${cs.animationTimingFunction}`;
      motion.set(k, (motion.get(k) || 0) + 1);
    }
  }

  const top = (m, n = 14) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ v: k, n: v }));

  return {
    viewport: { vw, vh },
    docHeight: document.documentElement.scrollHeight,
    type: {
      combos: type.slice(0, 40),
      distinctCombos: type.length,
      distinctSizes: [...new Set(type.map((t) => t.size))].sort((a, b) => a - b),
      families: top(new Map(type.map((t) => [t.family, t.count]))),
      largestHeadlinePx: headlineEl ? Math.round(parseFloat(getComputedStyle(headlineEl).fontSize)) : null,
      largestHeadlineText: headlineEl?.textContent?.trim().replace(/\s+/g, " ").slice(0, 60) || null,
      largestTextPx: biggestText ? Math.round(parseFloat(getComputedStyle(biggestText).fontSize)) : null,
      bodySizePx: bodySize[0], bodySizeCount: bodySize[1],
    },
    colour: {
      backgrounds: bgSorted.slice(0, 18),
      inks: fgSorted.slice(0, 14),
      accentColours,
      accentAreaPct: +((accentArea / docArea) * 100).toFixed(2),
      paintedAreaPct: +((paintedTotal / docArea) * 100).toFixed(1),
      docArea: Math.round(docArea),
    },
    depth: {
      shadows: top(shadows, 12), distinctShadows: shadows.size,
      radii: top(radii, 12), distinctRadii: radii.size,
      borders: top(borders, 8),
    },
    layout: {
      containers: [...containerCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w, n]) => ({ maxWidth: w, n })),
      gutter,
      sections,
      grids: [...gridCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([cols, n]) => ({ cols, n })),
    },
    imagery: {
      all: [...imgs, ...bgImgs],
      total: imgs.length + bgImgs.length,
      aboveFold: [...imgs, ...bgImgs].filter((i) => i.aboveFold).length,
      belowFold: [...imgs, ...bgImgs].filter((i) => !i.aboveFold).length,
      byClass: [...imgs, ...bgImgs].reduce((a, i) => ((a[i.cls] = (a[i.cls] || 0) + 1), a), {}),
      gradientElements: gradients,
    },
    motion: top(motion, 14),
  };
};

/* ------------------------------------------------------------------ */

async function run(key) {
  const site = SITES[key];
  const b = await chromium.launch({ args: ["--disable-blink-features=AutomationControlled"] });
  const out = { site: key, url: site.url, capturedAt: new Date().toISOString(), breakpoints: {} };

  for (const bp of BREAKPOINTS) {
    const ctx = await b.newContext({
      userAgent: UA, locale: "en-AU",
      viewport: { width: bp.width, height: bp.height },
      deviceScaleFactor: 2, isMobile: bp.mobile, hasTouch: bp.mobile,
    });
    await ctx.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => undefined }));
    const p = await ctx.newPage();
    await p.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await p.waitForTimeout(2500);
    const consent = await dismissConsent(p);
    await dismissInterstitial(p);
    await p.waitForTimeout(1200);

    // lazy content: scroll through, then return to top
    await p.evaluate(async () => {
      const step = innerHeight * 0.8;
      for (let y = 0; y < Math.min(document.body.scrollHeight, 12000); y += step) {
        scrollTo(0, y); await new Promise((r) => setTimeout(r, 220));
      }
      scrollTo(0, 0); await new Promise((r) => setTimeout(r, 700));
    });

    const tag = `${key}-${bp.key}`;
    await p.screenshot({ path: join(SHOTS, `${tag}-hero.png`) });
    await p.screenshot({ path: join(SHOTS, `${tag}-full.png`), fullPage: true });

    // header at scrollY 0 and 800
    const headerSel = "header, [role=banner], nav";
    const hdr0 = await p.evaluate((sel) => {
      const h = document.querySelector(sel); if (!h) return null;
      const cs = getComputedStyle(h), r = h.getBoundingClientRect();
      return { h: Math.round(r.height), pos: cs.position, bg: cs.backgroundColor, shadow: cs.boxShadow, top: Math.round(r.top) };
    }, headerSel);
    await p.evaluate(() => scrollTo(0, 800));
    await p.waitForTimeout(900);
    await p.screenshot({ path: join(SHOTS, `${tag}-header-800.png`) });
    const hdr800 = await p.evaluate((sel) => {
      const h = document.querySelector(sel); if (!h) return null;
      const cs = getComputedStyle(h), r = h.getBoundingClientRect();
      return { h: Math.round(r.height), pos: cs.position, bg: cs.backgroundColor, shadow: cs.boxShadow, top: Math.round(r.top) };
    }, headerSel);
    await p.evaluate(() => scrollTo(0, 0));
    await p.waitForTimeout(600);

    const data = await p.evaluate(MEASURE);
    data.header = { at0: hdr0, at800: hdr800, consentDismissed: consent };

    // first module below the fold
    try {
      const target = await p.evaluateHandle((vh) => {
        const main = document.querySelector("main") || document.body;
        return [...main.children].find((el) => {
          const r = el.getBoundingClientRect();
          return r.top + scrollY > vh * 0.75 && r.height > 180;
        }) || null;
      }, bp.height);
      const el = target.asElement();
      if (el) {
        await el.scrollIntoViewIfNeeded();
        await p.waitForTimeout(600);
        await el.screenshot({ path: join(SHOTS, `${tag}-module1.png`) });
      }
    } catch {}

    out.breakpoints[bp.key] = data;
    await ctx.close();
  }

  await b.close();
  writeFileSync(join(DATA, `${key}.json`), JSON.stringify(out, null, 2));
  const d = out.breakpoints.d;
  console.log(`  ${key}: type combos=${d.type.distinctCombos} h1=${d.type.largestHeadlinePx}px body=${d.type.bodySizePx}px ` +
    `imgs=${d.imagery.total} accent=${d.colour.accentAreaPct}% shadows=${d.depth.distinctShadows} radii=${d.depth.distinctRadii}`);
}

const only = process.argv[2];
for (const key of Object.keys(SITES)) {
  if (only && key !== only) continue;
  try { await run(key); } catch (e) { console.log(`  ${key} FAILED: ${e.message.split("\n")[0]}`); }
}
