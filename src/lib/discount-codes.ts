import { nanoid } from "nanoid";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

const DESCRIPTORS = [
  "velvet",
  "ember",
  "linen",
  "plush",
  "suede",
  "luxe",
  "crown",
  "gilded",
  "opal",
  "onyx",
  "glow",
  "gloss",
  "aura",
  "linen",
  "silk",
];

const ACTION_SUFFIXES = ["perks", "less", "more", "tier", "lane", "line", "pass"];

function normalizeName(name?: string | null) {
  if (!name) return "";
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.replace(/[^a-z0-9]/gi, ""))
    .filter(Boolean)
    .map((part) => part.slice(0, 8))
    .join("")
    .slice(0, 8);
}

function randomDescriptor() {
  return DESCRIPTORS[Math.floor(Math.random() * DESCRIPTORS.length)];
}

function randomSuffix() {
  return ACTION_SUFFIXES[Math.floor(Math.random() * ACTION_SUFFIXES.length)];
}

export function buildDiscountCode(seedName?: string | null) {
  const base = normalizeName(seedName) || randomDescriptor();
  const suffix = randomSuffix();
  // Include a high-entropy token to avoid collisions across businesses
  // (discount_code is globally unique in production).
  const token = nanoid(8).replace(/[_-]/g, "").slice(0, 8);
  return `${base}${suffix}${token}`.slice(0, 20);
}

type GenerateArgs = {
  supabase: SupabaseClient<Database>;
  businessId: string;
  seedName?: string | null;
  maxAttempts?: number;
};

export async function generateUniqueDiscountCode({
  supabase,
  seedName,
  maxAttempts = 6,
}: GenerateArgs): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = buildDiscountCode(seedName);
    const { data, error } = await supabase
      .from("customers")
      .select("id")
      .eq("discount_code", candidate)
      .limit(1)
      .maybeSingle();

    if (!error && !data) {
      return candidate;
    }
  }

  // Fallback to nanoid-based code if collisions persist
  return `${normalizeName(seedName) || "ambassador"}-${nanoid(6)}`.replace(/[^a-z0-9-]/gi, "");
}
