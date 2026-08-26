import { createServiceClient } from "@/lib/supabase";

/**
 * The one place a subscriber row is written.
 *
 * Four entry points capture email addresses: the sitewide footer, the
 * weight-loss guide, the quizzes, and a legacy newsletter route. Three wrote to
 * Supabase and the footer did not, so the list was split across two systems
 * depending on which control someone happened to use. This is the single upsert
 * they now all go through.
 *
 * Best-effort by design. Every caller already had its own behaviour for a failed
 * write, and none of them fail the request on it: losing the row is bad, but
 * refusing the subscription in front of the person is worse, and the caller's
 * email backstop still runs. This helper therefore reports what happened and
 * never throws.
 */

export type SubscribeSource = {
  /** Free-text label the capture control already sends, e.g. "footer". */
  source: string;
  /** Path the visitor was on when they subscribed, e.g. "/moshy". */
  sourcePath?: string;
  /** Hub the path belongs to, where the caller knows it. */
  hub?: string;
};

export type SubscribeResult =
  | { stored: true; alreadyPresent: boolean }
  | { stored: false; error: string };

/** 23505 is Postgres unique_violation: the address is already on the list. */
const UNIQUE_VIOLATION = "23505";

/**
 * The database says a column does not exist. 42703 is Postgres undefined_column;
 * PGRST204 is PostgREST failing to find it in its schema cache.
 *
 * This happens in exactly one window: after this code deploys and before the
 * consolidation migration is applied. Without the retry below, three capture
 * routes that write successfully today would silently stop writing during that
 * window, which is a worse outcome than the split list this change is fixing.
 */
const MISSING_COLUMN = new Set(["42703", "PGRST204"]);

/**
 * Records a subscriber, treating a repeat subscribe as success rather than an
 * error. `confirmed_at` is set on insert because this is a single opt-in list
 * with express consent at the point of capture; there is no confirmation step
 * to wait for, and leaving it null would misrepresent consent that was given.
 */
export async function recordSubscriber(
  email: string,
  { source, sourcePath, hub }: SubscribeSource,
): Promise<SubscribeResult> {
  const address = email.trim().toLowerCase();
  if (!address) return { stored: false, error: "empty email" };

  try {
    const supabase = await createServiceClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: address,
      source,
      source_path: sourcePath ?? null,
      hub: hub ?? null,
      confirmed_at: new Date().toISOString(),
    });

    if (!error) return { stored: true, alreadyPresent: false };
    if (error.code === UNIQUE_VIOLATION) return { stored: true, alreadyPresent: true };

    // Pre-migration fallback: keep the row rather than lose the subscriber.
    if (MISSING_COLUMN.has(error.code ?? "")) {
      const { error: legacyError } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: address, source });
      if (!legacyError) return { stored: true, alreadyPresent: false };
      if (legacyError.code === UNIQUE_VIOLATION) return { stored: true, alreadyPresent: true };
      console.error(`[subscribe] legacy insert failed for ${address}: ${legacyError.message}`);
      return { stored: false, error: legacyError.message };
    }

    console.error(`[subscribe] insert failed for ${address}: ${error.message}`);
    return { stored: false, error: error.message };
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown error";
    console.error(`[subscribe] insert threw for ${address}: ${message}`);
    return { stored: false, error: message };
  }
}

/** Maps a path to its hub, for the three hubs the site reports on. */
export function hubForPath(path?: string): string | undefined {
  if (!path) return undefined;
  if (/hair-loss|moshhair|mosh-|dense/.test(path)) return "hair-loss";
  if (/weight-loss|moshy|juniper|getmoshy/.test(path)) return "weight-loss";
  if (/solar|battery|energy|ecoflow|anker|portable-power/.test(path)) return "solar-energy";
  return undefined;
}

/**
 * Records an unsubscribe in our own table.
 *
 * This is the authoritative record, not the Resend Audience: the Audience is a
 * sending tool that may or may not be configured, and an unsubscribe must be
 * honoured regardless. Tolerates the column being absent for the same
 * pre-migration window as recordSubscriber.
 */
export async function recordUnsubscribe(email: string): Promise<boolean> {
  const address = email.trim().toLowerCase();
  try {
    const supabase = await createServiceClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      // Cast: the generated Supabase types predate the consolidation migration
      // and do not know these columns yet. Regenerating them needs Management
      // API access, so the cast is scoped to this one call rather than the
      // generated file being hand-edited.
      .update({ unsubscribed_at: new Date().toISOString() } as never)
      .eq("email", address);
    if (!error) return true;
    if (MISSING_COLUMN.has(error.code ?? "")) {
      console.error(`[subscribe] unsubscribed_at column missing; ${address} not recorded in Supabase`);
      return false;
    }
    console.error(`[subscribe] unsubscribe failed for ${address}: ${error.message}`);
    return false;
  } catch (e) {
    console.error(`[subscribe] unsubscribe threw for ${address}: ${e instanceof Error ? e.message : e}`);
    return false;
  }
}
