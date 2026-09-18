import Link from "next/link";
import { HubObject, type ObjectKind } from "@/components/home/Objects";

export type GuideLink = { href: string; title: string; desc: string; kind?: GuideKind };
export type GuideKind = "review" | "compare" | "cost" | "calculator" | "quiz" | "offer" | "explainer";

/** Each kind of guide has one drawing, so the grid can be scanned by what a page IS. */
const KIND_OBJECT: Record<GuideKind, ObjectKind> = {
  review: "document",
  compare: "balance",
  cost: "calculator",
  calculator: "calculator",
  quiz: "checklist",
  offer: "offer",
  explainer: "lens",
};
const KIND_LABEL: Record<GuideKind, string> = {
  review: "Review", compare: "Comparison", cost: "Costs", calculator: "Calculator", quiz: "Tool", offer: "Offer", explainer: "Guide",
};

/** Read off the URL and title, so a hub does not have to label every guide by hand. */
export function guideKind(g: GuideLink): GuideKind {
  if (g.kind) return g.kind;
  const t = `${g.href} ${g.title}`.toLowerCase();
  if (/offer|discount|promo|referral link/.test(t)) return "offer";
  if (/calculator|payback/.test(t)) return "calculator";
  if (/quiz|eligib|qualify|fits you|matcher|finder/.test(t)) return "quiz";
  if (/-vs-|\bvs\b|versus|best-|\bbest\b|compare|alternatives|cheapest/.test(t)) return "compare";
  if (/cost|price|pricing|rebate/.test(t)) return "cost";
  if (/review/.test(t)) return "review";
  return "explainer";
}

export function GuideGrid({ guides }: { guides: GuideLink[] }) {
  return (
    <ul className="br-guides">
      {guides.map((g) => {
        const k = guideKind(g);
        return (
          <li key={g.href}>
            <Link href={g.href} className="br-guide">
              <HubObject kind={KIND_OBJECT[k]} size={44} className="hy-obj br-guide__obj" />
              <span className="br-guide__body">
                <span className="br-guide__k">{KIND_LABEL[k]}</span>
                <span className="br-guide__t">{g.title}</span>
                <span className="br-guide__d">{g.desc}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
