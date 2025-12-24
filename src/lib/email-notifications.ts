/**
 * Email notification helper using Resend API
 * Sends automated notifications to jarred@referlabs.com.au for key events
 */

type EmailParams = {
  subject: string;
  html: string;
  from?: string;
  to?: string;
};

export async function sendAdminNotification({
  subject,
  html,
  from,
  to,
}: EmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const resendFrom = from || process.env.RESEND_FROM_EMAIL?.trim() || "Refer Labs <noreply@referlabs.com>";
    const resendTo = to || "jarred@referlabs.com.au";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return { success: false, error: "Email service not configured" };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [resendTo],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Resend API error:", errorData);
      return { success: false, error: `Resend API returned ${response.status}` };
    }

    const data = await response.json();
    return { success: true };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

/**
 * Email template for new account registration
 */
export function buildNewAccountEmail(userData: {
  email: string;
  businessName?: string;
  createdAt: string;
}): string {
  return `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
      <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">🎉 New Account Created</p>
        <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${userData.businessName || "New User"}</h1>
        <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${userData.email}</p>
      </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
        <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Account Details</h2>
        <ul style="list-style:none;padding:0;margin:0 0 16px;">
          <li style="margin:6px 0;"><strong>Email:</strong> <a href="mailto:${userData.email}">${userData.email}</a></li>
          <li style="margin:6px 0;"><strong>Business Name:</strong> ${userData.businessName || "Not provided yet"}</li>
          <li style="margin:6px 0;"><strong>Created:</strong> ${new Date(userData.createdAt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</li>
        </ul>
        <div style="margin-top:24px;padding:16px;border-radius:16px;background:#f1f5f9;border:1px solid #e2e8f0;">
          <p style="margin:0;font-weight:600;color:#0f172a;">Next Steps</p>
          <p style="margin:6px 0 0;font-size:14px;color:#475569;">This user can now access their dashboard and start setting up their referral program. Consider reaching out to welcome them and offer onboarding assistance.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Email template for chatbot conversation start
 */
export function buildChatbotLeadEmail(leadData: {
  firstName: string;
  email: string;
  firstMessage: string;
  timestamp: string;
}): string {
  return `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
      <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">💬 New Chatbot Conversation</p>
        <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${leadData.firstName}</h1>
        <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${leadData.email}</p>
      </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
        <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Conversation Started</h2>
        <ul style="list-style:none;padding:0;margin:0 0 16px;">
          <li style="margin:6px 0;"><strong>Name:</strong> ${leadData.firstName}</li>
          <li style="margin:6px 0;"><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></li>
          <li style="margin:6px 0;"><strong>Time:</strong> ${new Date(leadData.timestamp).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</li>
        </ul>
        <div style="margin-top:16px;padding:16px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;">
          <p style="margin:0 0 8px;font-weight:600;font-size:14px;color:#64748b;">First Message:</p>
          <p style="margin:0;color:#475569;white-space:pre-wrap;">${leadData.firstMessage}</p>
        </div>
        <div style="margin-top:24px;padding:16px;border-radius:16px;background:#ecfdf5;border:1px solid #bbf7d0;">
          <p style="margin:0;font-weight:600;color:#065f46;">Opportunity</p>
          <p style="margin:6px 0 0;font-size:14px;color:#047857;">This is a warm lead who initiated a conversation. Consider reaching out within 24 hours to maximize conversion potential.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Email template for onboarding snapshot saved
 */
export function buildOnboardingSnapshotEmail(snapshotData: {
  businessName: string;
  userEmail: string;
  businessType?: string;
  websiteUrl?: string;
  websitePlatform?: string;
  crmPlatform?: string;
  avgSale?: number;
  referralGoal?: number;
  timestamp: string;
}): string {
  return `
    <div style="font-family:Inter,system-ui,-apple-system,sans-serif;margin:0 auto;max-width:640px;">
      <div style="padding:32px;border-radius:24px 24px 0 0;background:linear-gradient(135deg,#0abab5,#24d9e2);color:white;">
        <p style="margin:0;text-transform:uppercase;letter-spacing:0.3em;font-size:12px;">📋 Onboarding Progress</p>
        <h1 style="margin:8px 0 0;font-size:28px;font-weight:800;">${snapshotData.businessName}</h1>
        <p style="margin:4px 0 0;font-size:14px;opacity:0.9;">${snapshotData.userEmail}</p>
      </div>
      <div style="padding:32px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 24px 24px;background:white;">
        <h2 style="margin-top:0;font-size:18px;color:#0f172a;">Snapshot Saved</h2>
        <p style="margin:0 0 16px;color:#475569;font-size:14px;">User has saved their onboarding configuration. Here's what they've set up:</p>
        <ul style="list-style:none;padding:0;margin:0 0 16px;">
          <li style="margin:6px 0;"><strong>Business Name:</strong> ${snapshotData.businessName}</li>
          ${snapshotData.businessType ? `<li style="margin:6px 0;"><strong>Business Type:</strong> ${snapshotData.businessType}</li>` : ""}
          ${snapshotData.websiteUrl ? `<li style="margin:6px 0;"><strong>Website:</strong> <a href="${snapshotData.websiteUrl}" target="_blank">${snapshotData.websiteUrl}</a></li>` : ""}
          ${snapshotData.websitePlatform ? `<li style="margin:6px 0;"><strong>Platform:</strong> ${snapshotData.websitePlatform}</li>` : ""}
          ${snapshotData.crmPlatform ? `<li style="margin:6px 0;"><strong>CRM:</strong> ${snapshotData.crmPlatform}</li>` : ""}
          ${snapshotData.avgSale ? `<li style="margin:6px 0;"><strong>Avg Sale:</strong> $${snapshotData.avgSale}</li>` : ""}
          ${snapshotData.referralGoal ? `<li style="margin:6px 0;"><strong>Referral Goal:</strong> ${snapshotData.referralGoal} referrals/month</li>` : ""}
          <li style="margin:6px 0;"><strong>Saved:</strong> ${new Date(snapshotData.timestamp).toLocaleString("en-AU", { timeZone: "Australia/Sydney" })}</li>
        </ul>
        <div style="margin-top:24px;padding:16px;border-radius:16px;background:#fef3c7;border:1px solid #fbbf24;">
          <p style="margin:0;font-weight:600;color:#92400e;">User is progressing!</p>
          <p style="margin:6px 0 0;font-size:14px;color:#b45309;">This user is actively configuring their program. Consider checking in to ensure they're not blocked on any integrations.</p>
        </div>
      </div>
    </div>
  `;
}
