import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** Visible only in preview. Marks anything Hims still needs to confirm or issue. */
export function Flag({ show, children = "To confirm" }: { show: boolean; children?: ReactNode }) {
  if (!show) return null;
  return (
    <span className="ml-2 inline-block rounded bg-[#FCEFC7] px-2 py-0.5 align-middle text-xs font-semibold text-[#6B4F00]">
      {children}
    </span>
  );
}

/**
 * Outbound partner button, on the site's nw-btn system so it matches /moshy and
 * /moshhair. `loc` feeds data-cta, the placement label every brand page carries.
 */
export function CtaLink({
  href,
  label,
  placeholder,
  preview,
  loc,
  variant = "solid",
  size = "md",
  block = false,
}: {
  href: string;
  label: string;
  placeholder: boolean;
  preview: boolean;
  loc: string;
  variant?: "solid" | "ghost" | "inverse";
  size?: "md" | "lg";
  block?: boolean;
}) {
  const sizes = { md: "px-6 py-3.5 text-[15px]", lg: "px-8 py-4 text-base" } as const;
  const style =
    variant === "solid"
      ? "nw-btn"
      : variant === "ghost"
        ? "nw-btn-ghost"
        : "nw-btn !bg-white !text-[#00748e] hover:!bg-[#e4f2f5]";
  return (
    <span className={`inline-flex flex-wrap items-center ${block ? "w-full" : ""}`}>
      <a
        href={href}
        rel="nofollow sponsored noopener"
        target={placeholder ? undefined : "_blank"}
        data-cta={loc}
        className={`${style} justify-center ${sizes[size]} ${block ? "w-full" : ""} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007a95]`}
      >
        {label}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
      <Flag show={preview && placeholder}>Placeholder link</Flag>
    </span>
  );
}

export function Disclosure({ text, tone = "light" }: { text: string; tone?: "light" | "dark" }) {
  return (
    <p
      data-affiliate-disclosure
      className={
        tone === "dark"
          ? "text-[12px] leading-relaxed text-white/70"
          : "text-[13px] leading-relaxed text-[#56504a]"
      }
    >
      <span className={tone === "dark" ? "font-semibold text-white" : "font-semibold text-[#14120f]"}>Disclosure: </span>
      {text}
    </p>
  );
}
