/**
 * Reference teardown, part C: behaviour rather than appearance.
 *
 * Scroll response, hover deltas, keyboard focus, motion, and the primary
 * conversion path. Run after measure.mjs.
 *
 *   node scripts/teardown/ux.mjs [siteKey]
 */
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SHOTS = "scripts/teardown/shots";
const DATA = "scripts/teardown/data";
mkdirSync(SHOTS, { recursive: true });
mkdirSync(DATA, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const SITES = {
  nerdwallet: "https://www.nerdwallet.com/",
  ctm: "https://www.comparethemarket.com.au/",
  finder: "https://www.finder.com.au/",
  canstar: "https://www.canstar.com.au/",
  bankrate: "https://www.bankrate.com/",
  "ours-a": "http://localhost:3000/preview/home-a",
  "ours-b": "http://localhost:3000/preview/home-b",
};

async function dismiss(p) {
  for (const sel of ["#onetrust-accept-btn-handler", "#truste-consent-button", 'button[id*="accept" i]']) {
    try { const e = await p.$(sel); if (e && (await e.isVisible())) { await e.click({ timeout: 2000 }); await p.waitForTimeout(600); return; } } catch {}
  }
  for (const rx of [/^accept all/i, /^accept cookies/i, /^allow all/i, /^got it/i]) {
    try { const b = p.getByRole("button", { name: rx }).first();
      if (await b.isVisible({ timeout: 1000 })) { await b.click({ timeout: 2000 }); await p.waitForTimeout(600); return; } } catch {}
  }
}

const snapEl = (sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const cs = getComputedStyle(el), r = el.getBoundingClientRect();
  return {
    h: Math.round(r.height), top: Math.round(r.top), position: cs.position,
    bg: cs.backgroundColor, shadow: cs.boxShadow, borderBottom: cs.borderBottomWidth + " " + cs.borderBottomColor,
    backdrop: cs.backdropFilter,
  };
};

async function run(key) {
  const url = SITES[key];
  const b = await chromium.launch({ args: ["--disable-blink-features=AutomationControlled"] });
  const ctx = await b.newContext({ userAgent: UA, locale: "en-AU", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => Object.defineProperty(navigator, "webdriver", { get: () => undefined }));
  const p = await ctx.newPage();
  const out = { site: key, url };

  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2500);
  await dismiss(p);
  await p.waitForTimeout(800);

  /* ---- 1. Header on scroll ---- */
  const hdrSel = "header, [role=banner]";
  out.header = { at0: await p.evaluate(snapEl, hdrSel) };
  await p.evaluate(() => scrollTo(0, 800));
  await p.waitForTimeout(1000);
  out.header.at800 = await p.evaluate(snapEl, hdrSel);
  out.header.changed = JSON.stringify(out.header.at0) !== JSON.stringify(out.header.at800);
  await p.evaluate(() => scrollTo(0, 0));
  await p.waitForTimeout(800);

  /* ---- 2. Motion inventory ---- */
  out.motion = await p.evaluate(() => {
    const m = new Map();
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      if (cs.transitionDuration && cs.transitionDuration !== "0s")
        m.set(`transition ${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}`,
          (m.get(`transition ${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}`) || 0) + 1);
      if (cs.animationName && cs.animationName !== "none")
        m.set(`animation ${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction}`,
          (m.get(`animation ${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction}`) || 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([v, n]) => ({ v, n }));
  });

  /* ---- 3. CTA metrics + hover/focus deltas ---- */
  const ctaInfo = await p.evaluate(() => {
    const cands = [...document.querySelectorAll("a,button")].filter((el) => {
      const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      if (cs.display === "none" || r.height < 28 || r.width < 56) return false;
      if (r.top + scrollY > innerHeight * 1.6) return false;
      const bg = cs.backgroundColor;
      const rgb = (bg.match(/[\d.]+/g) || []).map(Number);
      const filled = rgb.length >= 3 && !(rgb[3] === 0) && !(Math.max(rgb[0], rgb[1], rgb[2]) - Math.min(rgb[0], rgb[1], rgb[2]) < 12 && rgb[0] > 240);
      return filled;
    });
    const measure = (el) => {
      const cs = getComputedStyle(el), r = el.getBoundingClientRect();
      return {
        text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 34),
        h: Math.round(r.height), w: Math.round(r.width),
        padX: cs.paddingLeft + "/" + cs.paddingRight, radius: cs.borderRadius,
        fontSize: cs.fontSize, fontWeight: cs.fontWeight,
        bg: cs.backgroundColor, color: cs.color, border: cs.borderWidth + " " + cs.borderColor,
        shadow: cs.boxShadow, transition: cs.transitionDuration + " " + cs.transitionProperty,
      };
    };
    const sel = (el) => {
      // build a unique-ish selector
      if (el.id) return `#${CSS.escape(el.id)}`;
      const cls = [...el.classList].slice(0, 2).map((c) => "." + CSS.escape(c)).join("");
      return el.tagName.toLowerCase() + cls;
    };
    return cands.slice(0, 3).map((el) => ({ ...measure(el), selector: sel(el) }));
  });
  out.ctas = [];
  for (const cta of ctaInfo) {
    const rec = { default: cta, hover: null, focus: null };
    try {
      const loc = p.locator(cta.selector).first();
      await loc.scrollIntoViewIfNeeded({ timeout: 3000 });
      await loc.hover({ timeout: 3000 });
      await p.waitForTimeout(450);
      rec.hover = await loc.evaluate((el) => {
        const cs = getComputedStyle(el), r = el.getBoundingClientRect();
        return { bg: cs.backgroundColor, color: cs.color, shadow: cs.boxShadow, transform: cs.transform,
          h: Math.round(r.height), textDecoration: cs.textDecorationLine, border: cs.borderColor };
      });
      await loc.focus({ timeout: 3000 });
      await p.waitForTimeout(350);
      rec.focus = await loc.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { outline: `${cs.outlineWidth} ${cs.outlineStyle} ${cs.outlineColor}`, offset: cs.outlineOffset, shadow: cs.boxShadow };
      });
      await p.screenshot({ path: join(SHOTS, `${key}-cta-focus.png`), clip: await loc.boundingBox().then((bb) => bb && {
        x: Math.max(0, bb.x - 12), y: Math.max(0, bb.y - 12), width: bb.width + 24, height: bb.height + 24 }) });
    } catch {}
    out.ctas.push(rec);
  }

  /* ---- 4. Card / row hover deltas ---- */
  out.cardHover = await (async () => {
    try {
      const h = await p.evaluateHandle(() => {
        const cands = [...document.querySelectorAll("article, li, div")].filter((el) => {
          const cs = getComputedStyle(el), r = el.getBoundingClientRect();
          return r.width > 220 && r.width < 620 && r.height > 130 &&
            (cs.boxShadow !== "none" || parseFloat(cs.borderTopWidth) > 0) && el.querySelector("a,button");
        });
        return cands[0] || null;
      });
      const el = h.asElement();
      if (!el) return null;
      await el.scrollIntoViewIfNeeded();
      await p.waitForTimeout(400);
      const before = await el.evaluate((e) => { const cs = getComputedStyle(e), r = e.getBoundingClientRect();
        return { shadow: cs.boxShadow, transform: cs.transform, border: cs.borderColor, bg: cs.backgroundColor, top: Math.round(r.top) }; });
      await el.hover();
      await p.waitForTimeout(500);
      const after = await el.evaluate((e) => { const cs = getComputedStyle(e), r = e.getBoundingClientRect();
        return { shadow: cs.boxShadow, transform: cs.transform, border: cs.borderColor, bg: cs.backgroundColor, top: Math.round(r.top) }; });
      return { before, after, changed: JSON.stringify(before) !== JSON.stringify(after) };
    } catch { return null; }
  })();

  /* ---- 5. Keyboard focus through hero + first module ---- */
  await p.evaluate(() => scrollTo(0, 0));
  await p.keyboard.press("Tab");
  const walk = [];
  for (let i = 0; i < 12; i++) {
    const r = await p.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return null;
      const cs = getComputedStyle(a);
      return { tag: a.tagName, text: (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 28),
        outline: `${cs.outlineWidth} ${cs.outlineStyle}`, outlineColor: cs.outlineColor,
        offset: cs.outlineOffset, shadow: cs.boxShadow !== "none" ? "yes" : "no" };
    });
    if (r) walk.push(r);
    await p.keyboard.press("Tab");
  }
  out.keyboard = walk;

  /* ---- 6. What the page asks for before it gives anything ---- */
  out.asks = await p.evaluate(() => ({
    formsAboveFold: [...document.querySelectorAll("form")].filter((f) => f.getBoundingClientRect().top < innerHeight).length,
    inputsAboveFold: [...document.querySelectorAll("input:not([type=hidden]), select")]
      .filter((i) => i.getBoundingClientRect().top < innerHeight)
      .map((i) => ({ type: i.type || i.tagName, name: i.name || i.id || null,
        placeholder: i.placeholder || null, label: i.labels?.[0]?.textContent?.trim().slice(0, 30) || null })),
    totalInputs: document.querySelectorAll("input:not([type=hidden]), select").length,
    hasEmailGate: !!document.querySelector('input[type=email]'),
  }));

  writeFileSync(join(DATA, `${key}-ux.json`), JSON.stringify(out, null, 2));
  console.log(`  ${key}: header changes on scroll=${out.header.changed}  ctas=${out.ctas.length}  ` +
    `cardHoverChanges=${out.cardHover?.changed ?? "n/a"}  motionRules=${out.motion.length}  ` +
    `inputsAboveFold=${out.asks.inputsAboveFold.length}`);
  await b.close();
}

const only = process.argv[2];
for (const k of Object.keys(SITES)) {
  if (only && k !== only) continue;
  try { await run(k); } catch (e) { console.log(`  ${k} FAILED: ${e.message.split("\n")[0].slice(0, 80)}`); }
}
