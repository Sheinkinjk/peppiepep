"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { CARRD_URL, DURABLE_URL, BUTTERNUT_URL, SWIPE_PAGES_URL } from "@/lib/affiliate-links";
import NewsletterSignup from "@/components/consumer/NewsletterSignup";

/**
 * Website-builder recommender. Three preference questions map deterministically
 * to one of four builders, each an honest "best for" with a tracked affiliate
 * CTA and a link to the full review. Ends with an email capture of the result.
 */

const GREEN = "#0a7c42";

type Project = "onepage" | "business" | "ads";
type Build = "cheap" | "ai" | "conversion";
type Depth = "crm" | "fast";

type Result = {
  name: string;
  why: string;
  href: string;
  reviewHref: string;
  cta: string;
};

const CARRD: Result = { name: "Carrd", why: "For a simple one-page site or link-in-bio, Carrd is the cheapest, fastest way to get live, a genuine free plan and Pro from about $9/year.", href: CARRD_URL, reviewHref: "/carrd", cta: "Try Carrd free" };
const DURABLE: Result = { name: "Durable AI", why: "For a service business that wants a working site plus back-office tools, Durable AI generates a full site in ~30 seconds and bundles a CRM and invoicing.", href: DURABLE_URL, reviewHref: "/durableai", cta: "Try Durable AI" };
const BUTTERNUT: Result = { name: "Butternut AI", why: "For the fastest full multi-page draft, Butternut AI builds a complete site from one prompt in ~20 seconds that you then refine. Free to generate.", href: BUTTERNUT_URL, reviewHref: "/butternut", cta: "Try Butternut AI" };
const SWIPE: Result = { name: "Swipe Pages", why: "For paid-ad landing pages, Swipe Pages is the specialist: AMP pages that load in under a second, with A/B testing built in. 14-day free trial.", href: SWIPE_PAGES_URL, reviewHref: "/swipepages", cta: "Start the free trial" };

function resolve(project: Project, build: Build, depth: Depth | null): Result {
  if (project === "ads" || build === "conversion") return SWIPE;
  if (project === "onepage" || build === "cheap") return CARRD;
  // business + AI path
  return depth === "crm" ? DURABLE : BUTTERNUT;
}

const btn =
  "w-full text-left rounded-xl border border-[#e5e9e7] bg-white px-5 py-4 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a7c42]";

export default function BuilderQuiz() {
  const [project, setProject] = useState<Project | null>(null);
  const [build, setBuild] = useState<Build | null>(null);
  const [depth, setDepth] = useState<Depth | null>(null);

  // Depth only needed on the business + AI path.
  const needsDepth = project === "business" && build === "ai";
  const done = project !== null && build !== null && (!needsDepth || depth !== null);
  const result = done ? resolve(project as Project, build as Build, depth) : null;

  function track(name: string) {
    if (typeof window !== "undefined") window.gtag?.("event", "builder_quiz_result", { name });
  }

  function reset() {
    setProject(null);
    setBuild(null);
    setDepth(null);
  }

  if (result) {
    track(result.name);
    return (
      <div>
        <div className="rounded-2xl border bg-white p-6 sm:p-8" style={{ borderColor: `${GREEN}40`, background: `${GREEN}06` }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa39c]">Your match</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#10251b]">{result.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#3d4b44] max-w-xl">{result.why}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href={result.href} target="_blank" rel="nofollow sponsored" data-cta="builder-quiz-result" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5" style={{ background: GREEN, boxShadow: `0 8px 24px ${GREEN}25` }}>
              {result.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href={result.reviewHref} className="text-sm font-semibold text-[#0a7c42] hover:text-[#086536]">Read our full review</Link>
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6e7b74] hover:text-[#10251b] transition-colors">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Start over
            </button>
          </div>
        </div>
        <div className="mt-4">
          <NewsletterSignup
            variant="alert"
            source="builder-quiz"
            interest={`Website builders (matched: ${result.name})`}
            heading="Want the result and the best current deals emailed to you?"
            sub="We'll send your match plus any genuinely good website-builder offers we verify. No spam."
          />
        </div>
        <p className="mt-3 text-xs text-[#9aa39c]">
          A recommendation based on your answers, not the only option. Compare all four in the{" "}
          <Link href="/best-website-builder" className="underline underline-offset-2">full roundup</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#e5e9e7] bg-[#f5f8f6] p-6 sm:p-8">
      {project === null && (
        <Step legend="1 of 3: What are you building?">
          <Opt onClick={() => setProject("onepage")} title="A one-page site or link-in-bio" note="Portfolio, a single landing page, a bio link" />
          <Opt onClick={() => setProject("business")} title="A full business website" note="Multiple pages, a real company site" />
          <Opt onClick={() => setProject("ads")} title="Landing pages for paid ads" note="Google/Meta campaigns, fast and testable" />
        </Step>
      )}

      {project !== null && build === null && (
        <Step legend="2 of 3: How do you want it built?">
          <Opt onClick={() => setBuild("cheap")} title="As cheap as possible, I'll build it" note="Lowest cost, simple editor" />
          <Opt onClick={() => setBuild("ai")} title="Let AI generate it for me" note="Describe it, get a site in seconds" />
          <Opt onClick={() => setBuild("conversion")} title="I need speed and A/B testing for ads" note="Conversion-focused landing pages" />
        </Step>
      )}

      {needsDepth && depth === null && (
        <Step legend="3 of 3: What matters more?">
          <Opt onClick={() => setDepth("crm")} title="A built-in CRM and invoicing" note="You run a service business" />
          <Opt onClick={() => setDepth("fast")} title="The fastest full-site draft" note="Get everything generated, then edit" />
        </Step>
      )}
    </div>
  );
}

function Step({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-base sm:text-lg font-bold text-[#10251b] mb-4">{legend}</legend>
      <div className="grid gap-3">{children}</div>
    </fieldset>
  );
}

function Opt({ title, note, onClick }: { title: string; note: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={btn}>
      <span className="block text-sm font-semibold text-[#10251b]">{title}</span>
      <span className="block text-xs text-[#6e7b74]">{note}</span>
    </button>
  );
}
