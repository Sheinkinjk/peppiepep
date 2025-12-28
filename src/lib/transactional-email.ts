import { Resend } from "resend";

export type EmailSendRequest = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string | null;
};

export type EmailSendResult =
  | { success: true; id?: string | null }
  | { success: false; error: string };

function normalizeRecipients(to: string | string[]) {
  if (Array.isArray(to)) return to.filter(Boolean);
  return [to].filter(Boolean);
}

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  text,
  from,
  replyTo,
}: EmailSendRequest): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim() || null;
  const fromEnv = process.env.RESEND_FROM_EMAIL?.trim() || null;
  const replyToEnv = process.env.RESEND_REPLY_TO?.trim() || null;

  if (!apiKey || !(from ?? fromEnv)) {
    return { success: false, error: "Resend is not configured (missing RESEND_API_KEY / RESEND_FROM_EMAIL)." };
  }

  const resend = new Resend(apiKey);
  const resolvedFrom = from ?? fromEnv!;
  const resolvedReplyTo = (replyTo ?? replyToEnv) || undefined;

  try {
    const response = await resend.emails.send({
      from: resolvedFrom,
      to: normalizeRecipients(to),
      subject,
      html,
      ...(text ? { text } : {}),
      ...(resolvedReplyTo ? { reply_to: resolvedReplyTo } : {}),
    });

    return { success: true, id: response?.data?.id ?? null };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown email send error" };
  }
}

