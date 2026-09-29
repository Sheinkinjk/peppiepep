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
      <span className="select-all rounded-md border-2 border-dashed border-[#0F5E4E] bg-white px-4 py-2 text-2xl font-semibold tracking-[0.08em] text-[#17222B] sm:text-3xl">
        {code}
      </span>
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-[#0F5E4E] px-4 py-2 text-base font-semibold text-[#0F5E4E] hover:bg-[#0F5E4E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5E4E]"
      >
        {state === "copied" ? "Code copied" : state === "failed" ? "Select and copy the code" : "Copy code"}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Code copied to clipboard" : ""}
      </span>
    </div>
  );
}
