import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

export type ReferralEventType =
  | "link_visit"
  | "signup_submitted"
  | "conversion_pending"
  | "conversion_completed"
  | "manual_conversion_recorded"
  | "payout_released"
  | "payout_adjusted"
  | "campaign_message_queued"
  | "campaign_message_sent"
  | "campaign_message_delivered"
  | "campaign_message_failed"
  | "campaign_delivery_batch_started"
  | "campaign_delivery_batch_finished"
  | "schedule_call_clicked"
  | "contact_us_clicked";

type LogReferralEventInput = {
  supabase: SupabaseClient<Database>;
  businessId: string;
  ambassadorId: string | null;
  referralId?: string | null;
  eventType: ReferralEventType;
  source?: string | null;
  device?: string | null;
  metadata?: Record<string, unknown> | null;
};

export async function logReferralEvent({
  supabase,
  businessId,
  ambassadorId,
  referralId = null,
  eventType,
  source = null,
  device = null,
  metadata = null,
}: LogReferralEventInput) {
  try {
    const payload: Database["public"]["Tables"]["referral_events"]["Insert"] = {
      business_id: businessId,
      ambassador_id: ambassadorId,
      referral_id: referralId,
      event_type: eventType,
      source,
      device,
      metadata,
    };

    await (supabase as unknown as {
      from: (table: string) => { insert: (values: unknown) => Promise<{ error: Error | null }> };
    })
      .from("referral_events")
      .insert(payload);
  } catch (error) {
    console.warn("Failed to log referral event", error);
  }
}

export function inferDeviceFromUserAgent(userAgent: string | null | undefined) {
  if (!userAgent) return "unknown";
  const normalized = userAgent.toLowerCase();
  if (/mobile|iphone|android|ipad/.test(normalized)) {
    return "mobile";
  }
  if (/tablet/.test(normalized)) {
    return "tablet";
  }
  return "desktop";
}
