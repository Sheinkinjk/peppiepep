import type { ReactNode } from "react";

/** Visible only in preview. Marks anything Hims still needs to confirm or issue. */
export function Flag({ show, children = "To confirm" }: { show: boolean; children?: ReactNode }) {
  if (!show) return null;
  return (
    <span className="ml-2 inline-block rounded bg-[#FCEFC7] px-2 py-0.5 align-middle text-xs font-semibold text-[#6B4F00]">
      {children}
    </span>
  );
}

export function CtaLink({
  href,
  label,
  placeholder,
  preview,
  variant = "solid",
}: {
  href: string;
  label: string;
  placeholder: boolean;
  preview: boolean;
  variant?: "solid" | "outline";
}) {
  const base =
    "inline-flex items-center rounded-md px-6 py-3 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5E4E]";
  const style =
    variant === "solid"
      ? "bg-[#0F5E4E] text-white hover:bg-[#0B4A3D]"
      : "border border-[#0F5E4E] text-[#0F5E4E] hover:bg-[#E6F1EE]";
  return (
    <span className="inline-flex flex-wrap items-center">
      <a href={href} rel="sponsored nofollow noopener" target={placeholder ? undefined : "_blank"} className={`${base} ${style}`}>
        {label}
      </a>
      <Flag show={preview && placeholder}>Placeholder link</Flag>
    </span>
  );
}

export function Disclosure({ text }: { text: string }) {
  return (
    <p className="border-l-4 border-[#56636E] bg-white px-4 py-3 text-sm leading-relaxed text-[#3A4650]">
      <span className="font-semibold text-[#17222B]">Disclosure: </span>
      {text}
    </p>
  );
}
