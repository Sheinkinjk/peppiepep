/**
 * Compliance tests for /preview/moshy-updates (8 Oct 2026).
 *
 * Renders the page (including the standard footer) to static HTML and scans
 * user-facing text, metadata, alt text and image labels against the banned list
 * from the brief. The amber preview banner is excluded (data-preview-chrome).
 * "treatment" is banned outright (Jarred, 8 Oct: safer wording, no exceptions).
 */
import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MoshyUpdatesView } from "@/components/moshy-preview/MoshyUpdatesView";
import { SiteFooterBar } from "@/components/brand/SiteChrome";
import { metadata } from "@/app/(preview)/preview/moshy-updates/page";
import sitemap from "@/app/sitemap";

const ROOT = path.resolve(__dirname, "..");

const BANNED: string[] = [
  // Goods / format
  "pill", "pills", "pll", "tablet", "capsule", "oral", "swallow", "dose", "dosing", "daily habit", "once a day",
  "once-daily", "morning routine", "room temperature", "fridge", "refrigerat", "needle", "injection", "injectable",
  "jab", "pen", "shot", "small enough", "finger and thumb", "shipment", "stock",
  // Medicines / classes
  "wegovy", "ozempic", "mounjaro", "saxenda", "semaglutide", "tirzepatide", "liraglutide", "orforglipron", "glp-1",
  "glp1", "glp 1", "peptide", "medication", "medicine", "prescription", "drug",
  // Mechanism / outcome
  "appetite", "food noise", "cravings", "metabolism", "fat burn", "%", "kg", "lose weight fast", "results", "transform",
  "before and after", "clinically proven", "clinical trial", "proven", "guaranteed", "safe", "tga approved", "approved",
  // Novelty / urgency
  "new treatment", "new option", "new way", "new era", "next generation", "innovative", "revolutionary", "breakthrough",
  "coming soon", "coming to australia", "first in australia", "waitlist", "wait list", "early access", "early bird",
  "first in line", "launch", "limited", "spots", "places", "hurry", "don't miss", "last chance", "exclusive",
  // Social proof
  "trustpilot", "review", "rated", "stars", "testimonial", "people have joined", "customers love",
  // Price comparison
  "costs less", "cheaper", "more affordable", "save on treatment",
  // Agreed 8 Oct: no exceptions
  "treatment",
];

/** Word-boundary match for words; plain substring for fragments ending mid-word and symbols. */
function matcher(term: string): RegExp {
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/ /g, "\\s+");
  if (term === "%") return /%/;
  if (term === "refrigerat") return /refrigerat/i;
  return new RegExp(`(?<![a-z0-9])${esc}(?![a-z0-9])`, "i");
}

function renderPage(): Document {
  const html = renderToStaticMarkup(
    <MoshyUpdatesView href="https://www.getmoshy.com.au/start/eligibility-check-moshy" preview footer={<SiteFooterBar />} />,
  );
  return new DOMParser().parseFromString(`<!doctype html><html><body>${html}</body></html>`, "text/html");
}

function userFacing(doc: Document): string {
  const clone = doc.body.cloneNode(true) as HTMLElement;
  clone.querySelectorAll("[data-preview-chrome]").forEach((n) => n.remove());
  const labels = Array.from(clone.querySelectorAll("[alt],[aria-label]"))
    .map((n) => `${n.getAttribute("alt") ?? ""} ${n.getAttribute("aria-label") ?? ""}`)
    .join(" ");
  return `${clone.textContent ?? ""} ${labels} ${String(metadata.title ?? "")} ${String(metadata.description ?? "")}`.replace(/\s+/g, " ");
}

describe("/preview/moshy-updates compliance", () => {
  const doc = renderPage();
  const text = userFacing(doc);

  it("contains no banned term in user-facing text, metadata or labels", () => {
    const hits = BANNED.filter((t) => matcher(t).test(text)).map((t) => {
      const m = text.match(matcher(t))!;
      const i = m.index ?? 0;
      return `${t}: …${text.slice(Math.max(0, i - 50), i + 50)}…`;
    });
    expect(hits).toEqual([]);
  });

  it("shows REFERRAL120 only inside the offer card", () => {
    expect(doc.body.innerHTML).toContain("REFERRAL120");
    const clone = doc.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-offer-card]").forEach((n) => n.remove());
    expect(clone.innerHTML).not.toContain("REFERRAL120");
  });

  it("keeps REFERRAL120 in source only as an <OfferWithTerms> code prop", () => {
    const dirs = ["src/components/moshy-preview", "src/app/(preview)/preview/moshy-updates"];
    const offenders: string[] = [];
    for (const d of dirs) {
      for (const f of fs.readdirSync(path.join(ROOT, d), { recursive: true }) as string[]) {
        const p = path.join(ROOT, d, f);
        if (!fs.statSync(p).isFile()) continue;
        fs.readFileSync(p, "utf8")
          .split("\n")
          .forEach((line, n) => {
            // The code as a string literal; identifiers such as REFERRAL120_TERMS are not user-facing.
            if (/["'`>]REFERRAL120(?![A-Z0-9_])/.test(line) && !/code="REFERRAL120"|checkedOn\("REFERRAL120"\)/.test(line)) offenders.push(`${d}/${f}:${n + 1}`);
          });
      }
    }
    expect(offenders).toEqual([]);
  });

  it("shows the offer with its terms in the same card", () => {
    const card = doc.querySelector("[data-offer-card]")!;
    expect(card).not.toBeNull();
    expect(card.textContent).toContain("Terms");
    expect(card.textContent).toContain("$120 off your first order");
    expect(card.textContent).toContain("3-month minimum commitment");
    expect(card.textContent).toContain("getmoshy.com.au/terms");
    const link = card.querySelector('a[rel~="sponsored"]')!;
    expect(link.getAttribute("rel")).toBe("sponsored noopener");
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("shows the preview banner", () => {
    expect(doc.querySelector("[data-preview-chrome]")?.textContent).toContain("PREVIEW");
  });

  it("shows the $ amount only inside the offer card, beside its terms", () => {
    const clone = doc.body.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("[data-offer-card]").forEach((n) => n.remove());
    expect(clone.textContent).not.toMatch(/\$\d/);
  });

  it("collects nothing: no form or input on the page", () => {
    expect(doc.querySelectorAll("form, input").length).toBe(0);
  });

  it("gives every image alt text with no banned term", () => {
    doc.querySelectorAll("img").forEach((img) => {
      const alt = img.getAttribute("alt");
      expect(alt).not.toBeNull();
      const src = img.getAttribute("src") ?? "";
      BANNED.forEach((t) => {
        expect(matcher(t).test(alt ?? "")).toBe(false);
        expect(matcher(t).test(src)).toBe(false);
      });
    });
  });

  it("is noindex, absent from the sitemap and disallowed in robots.txt", () => {
    const robots = metadata.robots as { index?: boolean; follow?: boolean; nocache?: boolean };
    expect(robots.index).toBe(false);
    expect(robots.follow).toBe(false);
    expect(robots.nocache).toBe(true);
    expect(sitemap().some((e) => e.url.includes("/preview"))).toBe(false);
    expect(fs.readFileSync(path.join(ROOT, "public/robots.txt"), "utf8")).toContain("Disallow: /preview/");
  });

  it("has no internal link to the page anywhere else in src", () => {
    const hits: string[] = [];
    const walk = (dir: string) => {
      for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, f.name);
        if (f.isDirectory()) walk(p);
        else if (/\.(tsx?|mdx?)$/.test(f.name) && fs.readFileSync(p, "utf8").includes("/preview/moshy-updates")) hits.push(path.relative(ROOT, p));
      }
    };
    walk(path.join(ROOT, "src"));
    // The feature's own files and the gate that protects it may name the path.
    const allowed = (h: string) =>
      h.startsWith("src/components/moshy-preview/") ||
      h.startsWith("src/app/(preview)/preview/moshy-updates/") ||
      h === "src/lib/hims/access.ts";
    expect(hits.filter((h) => !allowed(h))).toEqual([]);
  });
});
