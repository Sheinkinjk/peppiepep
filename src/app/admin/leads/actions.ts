"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { lendingDb } from "@/lib/lending-db";
import { LEAD_STATUSES, SUBMISSION_OUTCOMES } from "@/lib/lending-status";

// All actions are gated by requireAdmin() (redirects non-admins) and run with the
// service-role client server-side. They power the /admin/leads submission tracker.

function num(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}
function txt(v: FormDataEntryValue | null): string | null {
  const s = String(v ?? "").trim();
  return s || null;
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("lead_id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !LEAD_STATUSES.includes(status as never)) return;
  const db = lendingDb();
  await db.from("lending_leads").update({ status }).eq("id", id);
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function updateLeadNotes(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("lead_id") || "");
  if (!id) return;
  const db = lendingDb();
  await db.from("lending_leads").update({ internal_notes: txt(formData.get("internal_notes")) }).eq("id", id);
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateCommercials(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("lead_id") || "");
  if (!id) return;
  const db = lendingDb();
  await db.from("lending_leads").update({
    settled_amount: num(formData.get("settled_amount")),
    commission_expected: num(formData.get("commission_expected")),
    commission_received: num(formData.get("commission_received")),
  }).eq("id", id);
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function addSubmission(formData: FormData) {
  await requireAdmin();
  const leadId = String(formData.get("lead_id") || "");
  const lender = String(formData.get("lender") || "").trim();
  if (!leadId || !lender) return;
  const db = lendingDb();
  await db.from("lead_submissions").insert({
    lead_id: leadId,
    lender,
    lender_ref: txt(formData.get("lender_ref")),
    outcome: "pending",
    notes: txt(formData.get("notes")),
  });
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function updateSubmission(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("submission_id") || "");
  const leadId = String(formData.get("lead_id") || "");
  const outcome = String(formData.get("outcome") || "");
  if (!id || !SUBMISSION_OUTCOMES.includes(outcome as never)) return;
  const db = lendingDb();
  await db.from("lead_submissions").update({
    outcome,
    offer_amount: num(formData.get("offer_amount")),
    offer_rate: txt(formData.get("offer_rate")),
    lender_ref: txt(formData.get("lender_ref")),
    notes: txt(formData.get("notes")),
  }).eq("id", id);
  revalidatePath(`/admin/leads/${leadId}`);
}

export async function deleteSubmission(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("submission_id") || "");
  const leadId = String(formData.get("lead_id") || "");
  if (!id) return;
  const db = lendingDb();
  await db.from("lead_submissions").delete().eq("id", id);
  revalidatePath(`/admin/leads/${leadId}`);
}
