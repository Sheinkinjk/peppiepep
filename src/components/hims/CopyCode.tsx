"use client";

import { useState } from "react";

export function CopyCode({ code }: { code: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="select-all rounded-xl border-2 border-dashed border-[#007a95] bg-white px-4 py-2 font-mono text-2xl font-bold tracking-[0.08em] text-[#14120f] sm:text-[1.7rem]">
        {code}
      </span>
      <button
        type="button"
        onClick={copy}
        className="nw-btn-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007a95]"
      >
        {state === "copied" ? "Code copied" : state === "failed" ? "Select and copy the code" : "Copy code"}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Code copied to clipboard" : ""}
      </span>
    </div>
  );
}
