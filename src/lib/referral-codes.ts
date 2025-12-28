import { nanoid } from "nanoid";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

export function generateReferralCode(length = 12) {
  return nanoid(length);
}

export async function generateUniqueReferralCode({
  supabase,
  length = 12,
  maxAttempts = 12,
}: {
  supabase: SupabaseClient<Database>;
  length?: number;
  maxAttempts?: number;
}): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = generateReferralCode(length);
    const { data, error } = await supabase
      .from("customers")
      .select("id")
      .eq("referral_code", candidate)
      .limit(1);

    if (error) {
      throw new Error(`Failed to check referral code uniqueness: ${error.message}`);
    }

    if (!data || data.length === 0) {
      return candidate;
    }
  }

  throw new Error("Unable to generate a unique referral code (too many collisions).");
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

async function fetchExistingReferralCodes({
  supabase,
  codes,
}: {
  supabase: SupabaseClient<Database>;
  codes: string[];
}): Promise<Set<string>> {
  const existing = new Set<string>();
  for (const codeChunk of chunk(codes, 250)) {
    const { data, error } = await supabase
      .from("customers")
      .select("referral_code")
      .in("referral_code", codeChunk);

    if (error) {
      throw new Error(`Failed to check referral code uniqueness: ${error.message}`);
    }

    (data ?? []).forEach((row) => {
      if (row?.referral_code) existing.add(row.referral_code);
    });
  }
  return existing;
}

export async function ensureUniqueReferralCodesForCustomerInserts({
  supabase,
  rows,
  length = 12,
  maxRounds = 4,
}: {
  supabase: SupabaseClient<Database>;
  rows: Array<Database["public"]["Tables"]["customers"]["Insert"]>;
  length?: number;
  maxRounds?: number;
}): Promise<Array<Database["public"]["Tables"]["customers"]["Insert"]>> {
  const updated = rows.map((row) => ({ ...row }));
  const used = new Set<string>();

  for (const row of updated) {
    const raw = typeof row.referral_code === "string" ? row.referral_code.trim() : "";
    if (!raw) {
      row.referral_code = generateReferralCode(length);
    } else {
      row.referral_code = raw;
    }

    if (used.has(row.referral_code)) {
      row.referral_code = generateReferralCode(length);
    }
    used.add(row.referral_code);
  }

  for (let round = 0; round < maxRounds; round += 1) {
    const codes = updated
      .map((row) => row.referral_code)
      .filter((value): value is string => typeof value === "string" && value.length > 0);

    const existing = await fetchExistingReferralCodes({ supabase, codes });
    if (existing.size === 0) return updated;

    let mutated = false;
    for (const row of updated) {
      if (!row.referral_code) continue;
      if (!existing.has(row.referral_code)) continue;

      let candidate = "";
      for (let attempt = 0; attempt < 25; attempt += 1) {
        candidate = generateReferralCode(length);
        if (!used.has(candidate) && !existing.has(candidate)) break;
      }

      if (!candidate || used.has(candidate) || existing.has(candidate)) {
        // Fall back to a more expensive check for a single unique code.
        candidate = await generateUniqueReferralCode({ supabase, length });
      }

      used.delete(row.referral_code);
      row.referral_code = candidate;
      used.add(candidate);
      mutated = true;
    }

    if (!mutated) return updated;
  }

  throw new Error("Unable to ensure unique referral codes for customer insert batch.");
}

