import { generateMetadata as generateSEOMetadata, seoConfig } from "@/lib/seo";
import Link from "next/link";
import { Check } from "lucide-react";
import ConsumerShell from "@/components/consumer/ConsumerShell";
import GuideCapture from "@/components/consumer/GuideCapture";

export const metadata = generateSEOMetadata(seoConfig.weightLossGuide);

const inside: string[] = [
  "Medical telehealth, open to anyone: the fast, fully-online clinical pathway, and Moshy's $120-off offer for new customers",
  "Coaching-led telehealth built for women: Juniper's program, community and free first consultation",
  "The GP route: when face-to-face care and Medicare make more sense",
  "A 60-second matcher to point you to the one that fits, and why",
];

export default function WeightLossGuidePage() {
  return (
    <ConsumerShell>
      <main id="main-content" className="mx-auto max-w-2xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a7c42]">Free guide</p>
        <h1 className="mt-3 text-3xl font-black leading-[1.1] tracking-tight text-[#10251b] sm:text-[2.6rem]">
          Weight loss in Australia, without the confusion
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#3d4b44]">
          Telehealth, coaching, meal plans, your GP. The options blur together and everyone is selling something. This
          free guide lays out the main pathways in plain English and who each one actually suits, so you can choose with
          your eyes open. We will email it to you now.
        </p>

        <ul className="mt-8 grid gap-3">
          {inside.map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#2b362f]">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f3ec]">
                <Check className="h-3.5 w-3.5 text-[#0a7c42]" strokeWidth={2.5} aria-hidden="true" />
              </span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <GuideCapture source="weight-loss-guide" />
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[#9aa39c]">
          Refer Labs is an independent Australian comparison publisher. This guide is general information, not medical
          advice, and does not recommend any treatment or imply suitability for any individual. Results vary between
          people, and suitability for any program is decided by a registered Australian practitioner. The guide contains
          disclosed affiliate links: we may earn a commission if you sign up through them, at no extra cost to you, and it
          never changes what we write.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e5e9e7] pt-6 text-sm">
          <Link href="/weight-loss-quiz" className="nw-link">Prefer the 60-second quiz?</Link>
          <Link href="/weight-loss" className="nw-link">The full weight-loss hub</Link>
        </div>
      </main>
    </ConsumerShell>
  );
}
