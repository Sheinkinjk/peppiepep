import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";
import { generateUniqueDiscountCode } from "@/lib/discount-codes";
import { generateUniqueReferralCode } from "@/lib/referral-codes";

export type QuickAddCustomerResult =
  | { status: "error"; error: string }
  | { status: "duplicate"; message: string; existingCustomerId: string }
  | { status: "created"; message: string; customerId: string };

function normalizePhone(value: string) {
  return value.replace(/[\s\-\(\)]/g, "");
}

export async function quickAddCustomerProfile({
  supabase,
  businessId,
  name,
  phone,
  email,
}: {
  supabase: SupabaseClient<Database>;
  businessId: string;
  name: string;
  phone: string;
  email: string;
}): Promise<QuickAddCustomerResult> {
  const trimmedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = phone.trim() ? normalizePhone(phone.trim()) : "";

  if (!trimmedName && !normalizedPhone && !normalizedEmail) {
    return { status: "error", error: "Enter at least a name, phone, or email before adding a customer." };
  }

  if (normalizedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { status: "error", error: "Invalid email format. Please enter a valid email address." };
  }

  if (normalizedPhone && !/^\+?[1-9]\d{1,14}$/.test(normalizedPhone)) {
    return { status: "error", error: "Invalid phone format. Please enter a valid phone number (e.g., +1234567890)." };
  }

  const duplicateFilters: string[] = [];
  if (normalizedEmail) {
    duplicateFilters.push(`email.ilike.${normalizedEmail}`);
  }
  if (normalizedPhone) {
    duplicateFilters.push(`phone.eq.${normalizedPhone}`);
  }

  if (duplicateFilters.length > 0) {
    const { data: existingMatches, error: duplicateError } = await supabase
      .from("customers")
      .select("id, name")
      .eq("business_id", businessId)
      .or(duplicateFilters.join(","))
      .limit(1);

    if (!duplicateError && existingMatches && existingMatches.length > 0) {
      const duplicateCustomer = existingMatches[0] as { id: string; name: string | null };
      return {
        status: "duplicate",
        existingCustomerId: duplicateCustomer.id,
        message: `${duplicateCustomer.name || "Ambassador"} already has a referral profile, so we skipped a duplicate.`,
      };
    }
  }

  const referralCode = await generateUniqueReferralCode({ supabase });
  const discountCode = await generateUniqueDiscountCode({
    supabase,
    businessId,
    seedName: trimmedName || normalizedEmail || normalizedPhone,
  });

  const insertPayload: Database["public"]["Tables"]["customers"]["Insert"] = {
    business_id: businessId,
    name: trimmedName || null,
    phone: normalizedPhone || null,
    email: normalizedEmail || null,
    referral_code: referralCode,
    discount_code: discountCode,
    status: "pending",
  };

  const { data: inserted, error } = await supabase
    .from("customers")
    .insert([insertPayload])
    .select("id")
    .single<{ id: string }>();

  if (error || !inserted?.id) {
    return { status: "error", error: "Unable to add customer. Please try again." };
  }

  const displayLabel = trimmedName || normalizedPhone || normalizedEmail || "Customer";
  return { status: "created", customerId: inserted.id, message: `${displayLabel} added and ready to refer.` };
}

