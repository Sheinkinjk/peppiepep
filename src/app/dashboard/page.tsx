import Papa from "papaparse";
import * as XLSX from "xlsx";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { CSVUploadForm } from "@/components/CSVUploadForm";
import { ReferralCompletionForm } from "@/components/ReferralCompletionForm";
import { CampaignBuilder } from "@/components/CampaignBuilder";
import { AITools } from "@/components/AITools";
import { CustomersTable } from "@/components/CustomersTable";
import { DashboardShortcutCards } from "@/components/DashboardShortcutCards";
import {
  Users, TrendingUp, DollarSign, Zap, Upload, MessageSquare,
  Gift, Crown, BarChart3, Settings as SettingsIcon,
  Award, Rocket, CreditCard, Plus, Send,
} from "lucide-react";
import {
  createServerComponentClient,
  createServiceClient,
} from "@/lib/supabase";
import { Database } from "@/types/supabase";
import twilio from "twilio";
import { Resend } from "resend";
import { normalizePhoneNumber } from "@/lib/phone-utils";

async function getBusiness() {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Select only core columns that definitely exist
  const { data, error } = await supabase
    .from("businesses")
    .select("id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, created_at")
    .eq("owner_id", user.id)
    .single();

  // Log error for debugging but don't crash
  if (error) {
    console.error("Error fetching business:", error);
  }

  if (!data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: newBiz } = await (supabase as any)
      .from("businesses")
      .insert([
        {
          owner_id: user.id,
          name: `${user.email?.split("@")[0] ?? "Your"}'s salon`,
        },
      ])
      .select("id, owner_id, name, offer_text, reward_type, reward_amount, upgrade_name, created_at")
      .single();
    return newBiz;
  }

  return data;
}

export default async function Dashboard() {
  const business = await getBusiness();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const baseSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  async function updateSettings(formData: FormData) {
    "use server";
    const supabase = await createServerComponentClient();

    const updateData: Partial<Database["public"]["Tables"]["businesses"]["Update"]> = {
      offer_text: (formData.get("offer_text") as string) ?? null,
      reward_type: (formData.get("reward_type") as string) ?? null,
      reward_amount: Number(formData.get("reward_amount") || 0),
      upgrade_name: ((formData.get("upgrade_name") as string) || "").trim() || null,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("businesses")
      .update(updateData)
      .eq("id", business.id);
    revalidatePath("/dashboard");
  }

  async function uploadCSV(formData: FormData) {
    "use server";
    try {
      const file = formData.get("file");

      if (!(file instanceof File)) {
        return { error: "Please select a file to upload." };
      }

      const fileName = file.name.toLowerCase();
      const isCSV = fileName.endsWith('.csv');
      const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');

      // Validate file type
      if (!isCSV && !isExcel) {
        return { error: "Invalid file type. Please upload a CSV or Excel file (.csv, .xlsx, .xls)." };
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return { error: "File too large. Maximum size is 5MB." };
      }

      let parsedData: Array<Record<string, string>> = [];

      if (isCSV) {
        // Parse CSV
        const text = await file.text();
        const parsed = Papa.parse<Record<string, string>>(text, { header: true });

        if (parsed.errors && parsed.errors.length > 0) {
          console.error("CSV parsing errors:", parsed.errors);
          return { error: "CSV parsing failed. Please check your file format." };
        }

        parsedData = parsed.data || [];
      } else {
        // Parse Excel
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON with header row
        const rows = XLSX.utils.sheet_to_json<(string | number)[]>(worksheet, {
          header: 1,
          defval: ""
        });
        const headers = (rows[0] as string[] | undefined) || [];
        parsedData = rows.slice(1).map((rowArr) => {
          const obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            const value = (rowArr && rowArr[index] !== undefined) ? String(rowArr[index]) : "";
            obj[header] = value;
          });
          return obj;
        });
      }

      const supabase = await createServiceClient(); // service role to bypass RLS for bulk insert

      const customersToInsert = parsedData
        .map((row) => ({
          business_id: business.id,
          name: row.name || row.Name || row.full_name || row['Full Name'] || null,
          phone: row.phone || row.Phone || row.mobile || row.Mobile || null,
          email: row.email || row.Email || null,
          referral_code: nanoid(12),
        }))
        .filter((row) => row.name || row.phone || row.email);

      if (customersToInsert.length === 0) {
        return { error: "No valid customer data found. Please ensure your file has 'name', 'phone', or 'email' columns." };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: insertError } = await (supabase as any).from("customers").insert(customersToInsert);

      if (insertError) {
        console.error("Upload error:", insertError);
        return { error: "Failed to import customers. Please try again." };
      }

      revalidatePath("/dashboard");
      return { success: `Successfully imported ${customersToInsert.length} customers!` };
    } catch (error) {
      console.error("Upload error:", error);
      return { error: "An unexpected error occurred while uploading. Please try again." };
    }
  }

  async function markReferralCompleted(formData: FormData) {
    "use server";
    try {
      const referralId = formData.get("referral_id") as string | null;
      const ambassadorId = formData.get("ambassador_id") as string | null;

      if (!referralId || !ambassadorId) {
        return { error: "Missing referral or ambassador information." };
      }

      const supabase = await createServiceClient();

      const amount =
        business.reward_type === "credit" ? business.reward_amount ?? 0 : 0;

      // Update referral status
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: updateError } = await (supabase as any)
        .from("referrals")
        .update({ status: "completed", rewarded_at: new Date().toISOString() })
        .eq("id", referralId);

      if (updateError) {
        console.error("Failed to update referral:", updateError);
        return { error: "Failed to mark referral as completed." };
      }

      let ambassadorPhone: string | null | undefined;
      let ambassadorReferralCode: string | null | undefined;

      if (amount > 0) {
        const { data: ambassador, error: ambassadorError } = await supabase
          .from("customers")
          .select("credits, phone, referral_code")
          .eq("id", ambassadorId)
          .single();

        if (ambassadorError) {
          console.error("Failed to fetch ambassador:", ambassadorError);
          return { error: "Failed to fetch ambassador details." };
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentCredits = (ambassador as any)?.credits ?? 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorPhone = (ambassador as any)?.phone;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorReferralCode = (ambassador as any)?.referral_code;

        // Update credits
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: creditError } = await (supabase as any)
          .from("customers")
          .update({ credits: currentCredits + amount })
          .eq("id", ambassadorId);

        if (creditError) {
          console.error("Failed to update credits:", creditError);
          return { error: "Failed to update ambassador credits." };
        }
      } else {
        const { data: ambassador, error: ambassadorError } = await supabase
          .from("customers")
          .select("phone, referral_code")
          .eq("id", ambassadorId)
          .single();

        if (ambassadorError) {
          console.error("Failed to fetch ambassador:", ambassadorError);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorPhone = (ambassador as any)?.phone;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ambassadorReferralCode = (ambassador as any)?.referral_code;
      }

      // Send SMS notification
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_PHONE_NUMBER;

      if (sid && token && from && ambassadorPhone) {
        try {
          const client = twilio(sid, token);
          const referralLink = ambassadorReferralCode
            ? `${baseSiteUrl}/r/${ambassadorReferralCode}`
            : "";

          await client.messages.create({
            body: `Amazing! Your friend just booked – you've earned $${amount} credit at ${business.name}! Your link: ${referralLink}`,
            from,
            to: ambassadorPhone,
          });
        } catch (smsError) {
          console.error("Failed to send SMS notification:", smsError);
          // Don't return error - referral was completed successfully
          // SMS notification is a bonus feature
        }
      }

      revalidatePath("/dashboard");
      return { success: `Referral completed! ${amount > 0 ? `$${amount} credited to ambassador.` : ''}` };
    } catch (error) {
      console.error("Mark referral completed error:", error);
      return { error: "An unexpected error occurred. Please try again." };
    }
  }

  async function quickAddCustomer(formData: FormData) {
    "use server";
    try {
      const name = (formData.get("quick_name") as string | null)?.trim() || "";
      const phone = (formData.get("quick_phone") as string | null)?.trim() || "";
      const email = (formData.get("quick_email") as string | null)?.trim() || "";

      if (!name && !phone && !email) {
        return;
      }

      const supabase = await createServiceClient();
      const referral_code = nanoid(12);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from("customers").insert([
        {
          business_id: business.id,
          name: name || null,
          phone: phone || null,
          email: email || null,
          referral_code,
        },
      ]);

      if (error) {
        console.error("Quick add error:", error);
        return;
      }

      revalidatePath("/dashboard");
    } catch (error) {
      console.error("Quick add error:", error);
    }
  }

  async function sendCampaign(formData: FormData) {
    "use server";
    try {
      const campaignName = formData.get("campaignName") as string;
      const campaignMessage = formData.get("campaignMessage") as string;
      const campaignChannel = formData.get("campaignChannel") as "sms" | "email";
      const scheduleType = formData.get("scheduleType") as "now" | "later";
      const scheduleDate = (formData.get("scheduleDate") as string | null) ?? "";
      const selectedCustomersJson = formData.get("selectedCustomers") as string;

      if (!campaignName || !campaignMessage || !selectedCustomersJson) {
        return { error: "Missing required campaign information." };
      }

      const selectedCustomerIds = JSON.parse(selectedCustomersJson) as string[];

      if (selectedCustomerIds.length === 0) {
        return { error: "Please select at least one customer." };
      }

      // Only support "send now" for initial implementation
      if (scheduleType === "later") {
        return {
          error: `Scheduled campaigns are not yet supported (requested: ${scheduleDate || "unspecified"}). Please select 'Send Now'.`,
        };
      }

      const supabase = await createServiceClient();

      // Fetch selected customers
      const { data: customersData, error: fetchError } = await supabase
        .from("customers")
        .select("id, name, phone, email, referral_code")
        .in("id", selectedCustomerIds)
        .eq("business_id", business.id);

      if (fetchError || !customersData) {
        console.error("Failed to fetch customers:", fetchError);
        return { error: "Failed to fetch customer data." };
      }

      const selectedCustomers =
        (customersData ?? []) as Database["public"]["Tables"]["customers"]["Row"][];

      // Store campaign record (optional - won't block if table doesn't exist)
      let campaign = null;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: campaignData, error: campaignError } = await (supabase as any)
          .from("campaigns")
          .insert([
            {
              business_id: business.id,
              name: campaignName,
              message: campaignMessage,
              channel: campaignChannel,
              status: "sending",
              total_recipients: selectedCustomers.length,
              sent_count: 0,
            },
          ])
          .select()
          .single();

        if (campaignError) {
          console.error("Failed to create campaign record:", campaignError);
          // Continue anyway - campaign tracking is optional
        } else {
          campaign = campaignData;
        }
      } catch (campaignTrackingError) {
        console.error("Campaign tracking not available:", campaignTrackingError);
        // Continue anyway - campaign tracking is optional
      }

      let successCount = 0;
      let failureCount = 0;
      let simulationNotice: string | null = null;

      if (campaignChannel === "sms") {
        // Send SMS via Twilio (or simulate if not configured)
        const sid = process.env.TWILIO_ACCOUNT_SID;
        const token = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_PHONE_NUMBER;

        if (!sid || !token || !from) {
          console.warn("Twilio credentials missing. Simulating SMS send.");
          successCount = selectedCustomers.filter((c) => !!c.phone).length;
          simulationNotice = "SMS sending simulated. Add TWILIO credentials to send live messages.";
        } else {
          const client = twilio(sid, token);

          for (const customer of selectedCustomers) {
            if (!customer.phone) {
              console.error(`Customer ${customer.name} has no phone number`);
              failureCount++;
              continue;
            }

            // Normalize phone number to E.164 format (Australian numbers default)
            const normalizedPhone = normalizePhoneNumber(customer.phone, "AU");

            if (!normalizedPhone) {
              console.error(`Invalid phone format for ${customer.name}: ${customer.phone}`);
              failureCount++;
              continue;
            }

            try {
              // Build unique referral link for this specific customer (they become the ambassador)
              const referralLink = customer.referral_code ? `${baseSiteUrl}/r/${customer.referral_code}` : "";

              // Personalize message with name and referral link placeholders
              let personalizedMessage = campaignMessage
                .replace(/\{\{name\}\}/g, customer.name || "there")
                .replace(/\{\{referral_link\}\}/g, referralLink);

              // Always append unique referral link if template omitted it
              if (!campaignMessage.includes("{{referral_link}}") && referralLink) {
                personalizedMessage += `\n\nYour unique referral link: ${referralLink}`;
              }

              await client.messages.create({
                body: personalizedMessage,
                from,
                to: normalizedPhone,
              });

              console.log(`SMS sent successfully to ${customer.name} (${normalizedPhone})`);
              successCount++;
            } catch (smsError) {
              console.error(`Failed to send SMS to ${customer.name} (${normalizedPhone}):`, smsError);
              failureCount++;
            }
          }
        }
      } else if (campaignChannel === "email") {
        // Send Email via Resend (or simulate)
        const apiKey = process.env.RESEND_API_KEY;
        const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@peppiepep.com";
        const businessEmail = business.name ? `${business.name} <${fromEmail}>` : fromEmail;

        if (!apiKey) {
          console.warn("Resend API key missing. Simulating email send.");
          successCount = selectedCustomers.filter((c) => !!c.email).length;
          simulationNotice = "Email sending simulated. Add RESEND credentials to send live messages.";
        } else {
          const resend = new Resend(apiKey);

          for (const customer of selectedCustomers) {
            if (!customer.email) {
              failureCount++;
              continue;
            }

            try {
              // Personalize message
              const personalizedMessage = campaignMessage
                .replace(/\{\{name\}\}/g, customer.name || "there")
                .replace(
                  /\{\{referral_link\}\}/g,
                  customer.referral_code ? `${baseSiteUrl}/r/${customer.referral_code}` : "",
                );

              // Convert message to HTML (basic formatting)
              const htmlMessage = personalizedMessage
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.length > 0)
                .map((line) => `<p style="margin: 0 0 12px 0; line-height: 1.6;">${line}</p>`)
                .join("");

              const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">${business.name || "Your Business"}</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${htmlMessage}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">
                ${business.name || "Your Business"}
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                You received this email because you're a valued customer.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

              await resend.emails.send({
                from: businessEmail,
                to: customer.email,
                subject: campaignName || `Message from ${business.name}`,
                html: emailHtml,
                text: personalizedMessage,
              });

              successCount++;
            } catch (emailError) {
              console.error(`Failed to send email to ${customer.email}:`, emailError);
              failureCount++;
            }
          }
        }
      }

      // Update campaign status (optional - won't block if table doesn't exist)
      if (campaign) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase as any)
            .from("campaigns")
            .update({
              status: failureCount === 0 ? "completed" : "partial",
              sent_count: successCount,
              failed_count: failureCount,
            })
            .eq("id", campaign.id);
        } catch (updateError) {
          console.error("Failed to update campaign status:", updateError);
          // Continue anyway - campaign tracking is optional
        }
      }

      revalidatePath("/dashboard");

      const baseMessage =
        failureCount === 0
          ? `Campaign sent successfully to ${successCount} customers!`
          : `Campaign completed with ${successCount} successful and ${failureCount} failed messages.`;

      return {
        success: simulationNotice ? `${baseMessage} ${simulationNotice}` : baseMessage,
      };
    } catch (error) {
      console.error("Campaign send error:", error);
      return { error: "Failed to send campaign. Please try again." };
    }
  }

  const supabase = await createServerComponentClient();
  const { data: customers = [] } = await supabase
    .from("customers")
    .select("id,status,credits,name,phone,email,referral_code")
    .eq("business_id", business.id);

  const { data: referrals = [] } = await supabase
    .from("referrals")
    .select(
      "id,status,ambassador_id,referred_name,referred_email,referred_phone,created_at",
    )
    .eq("business_id", business.id);

  const safeReferrals =
    (referrals ?? []) as Database["public"]["Tables"]["referrals"]["Row"][];
  const safeCustomers =
    (customers ?? []) as Database["public"]["Tables"]["customers"]["Row"][];

  const pendingReferrals =
    safeReferrals.filter((r) => r.status === "pending").length || 0;
  const completedReferrals =
    safeReferrals.filter((r) => r.status === "completed").length || 0;
  const totalRewards =
    safeCustomers.reduce((sum, c) => sum + (c.credits ?? 0), 0) || 0;
  let totalCampaignsSent = 0;
  let totalMessagesSent = 0;
  try {
    const { data: campaignsRaw } = await supabase
      .from("campaigns")
      .select("id,sent_count")
      .eq("business_id", business.id);

    const campaignsData =
      (campaignsRaw as { id: string; sent_count: number | null }[] | null) ?? [];
    totalCampaignsSent = campaignsData.length;
    totalMessagesSent = campaignsData.reduce(
      (sum, campaign) => sum + (campaign.sent_count ?? 0),
      0,
    );
  } catch (campaignFetchError) {
    console.warn("Campaign data unavailable:", campaignFetchError);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* Premium Hero Banner */}
        <div className="mb-8 sm:mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-8 sm:p-10 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_50%)]" />
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="h-6 w-6 text-yellow-300" />
                <span className="text-xs font-bold text-purple-100 bg-purple-900/30 px-3 py-1 rounded-full backdrop-blur">
                  LIVE DASHBOARD
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
                {business.name}
              </h1>
              <p className="text-base sm:text-lg text-purple-100 mb-6 max-w-2xl">
                Real-time micro-influencer program. Send live SMS/Email campaigns and track actual performance.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start gap-3 text-sm">
                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-purple-900/30 backdrop-blur flex items-center justify-center">
                    <Upload className="h-4 w-4 text-purple-100" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Import & Activate</p>
                    <p className="text-purple-100 text-xs">Upload real customer data</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-900/30 backdrop-blur flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-100" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Live Campaigns</p>
                    <p className="text-blue-100 text-xs">Send real SMS/Email via Twilio/Resend</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-emerald-900/30 backdrop-blur flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-emerald-100" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Track Real-Time</p>
                    <p className="text-emerald-100 text-xs">Live referral tracking</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-amber-900/30 backdrop-blur flex items-center justify-center">
                    <Gift className="h-4 w-4 text-amber-100" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Auto Rewards</p>
                    <p className="text-amber-100 text-xs">Real credits to customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <DashboardShortcutCards />

        {/* Quick Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-purple-200/50 hover:border-purple-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">AMBASSADORS</span>
            </div>
            <p className="text-4xl font-black text-slate-900">{safeCustomers.length}</p>
            <p className="text-sm text-slate-600 mt-1">Active micro-influencers</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-blue-200/50 hover:border-blue-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">REFERRALS</span>
            </div>
            <p className="text-4xl font-black text-slate-900">{safeReferrals.length}</p>
            <p className="text-sm text-slate-600 mt-1">{pendingReferrals} pending, {completedReferrals} completed</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-emerald-200/50 hover:border-emerald-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">REWARDS</span>
            </div>
            <p className="text-4xl font-black text-slate-900">${totalRewards}</p>
            <p className="text-sm text-slate-600 mt-1">Total credits issued</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-amber-200/50 hover:border-amber-300 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">CONVERSION</span>
            </div>
            <p className="text-4xl font-black text-slate-900">
              {safeReferrals.length > 0 ? Math.round((completedReferrals / safeReferrals.length) * 100) : 0}%
            </p>
            <p className="text-sm text-slate-600 mt-1">Referral completion rate</p>
          </Card>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 p-2 bg-white/95 backdrop-blur-xl shadow-2xl shadow-slate-300/50 ring-1 ring-slate-300/50 rounded-3xl h-auto gap-2">
            <TabsTrigger
              value="campaigns"
              data-tab-target="campaigns"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:via-pink-600 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <Rocket className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Campaigns & AI</span>
              <span className="sm:hidden">Campaigns</span>
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              data-tab-target="clients"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-600 data-[state=active]:via-teal-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              <Users className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Clients & Ambassadors</span>
              <span className="sm:hidden">Clients</span>
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              data-tab-target="performance"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:via-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              data-tab-target="settings"
              className="text-base px-6 py-4 font-black rounded-2xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-600 data-[state=active]:via-orange-600 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              <SettingsIcon className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Settings</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

        <TabsContent value="campaigns">
          <div className="space-y-6">
            {/* Campaign Builder Card */}
            <CampaignBuilder
              customers={safeCustomers}
              businessName={business.name || "Your Business"}
              sendCampaignAction={sendCampaign}
            />

            {/* AI Tools Card */}
            <AITools
              customers={safeCustomers.map(c => ({
                ...c,
                phone: c.phone || null,
                email: c.email || null,
              }))}
              referrals={safeReferrals}
              businessName={business.name || "Your Business"}
              offerText={business.offer_text}
              rewardAmount={business.reward_amount || 0}
            />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
                <Gift className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Settings & Rewards</h3>
                <p className="text-sm text-slate-600">Update the public offer and how ambassadors get paid.</p>
              </div>
            </div>

            <form action={updateSettings} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="offer_text" className="text-base font-bold text-slate-900">
                  Customer Offer
                </Label>
                <Textarea
                  id="offer_text"
                  name="offer_text"
                  defaultValue={business.offer_text ?? ""}
                  placeholder="e.g., Give $200, Get $200 + a VIP upgrade"
                  className="min-h-[90px] text-base"
                />
                <p className="text-sm text-slate-500">
                  This copy appears on referral landing pages, SMS, and email invites.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <Label htmlFor="reward_type" className="text-base font-bold text-slate-900">
                    Reward Type
                  </Label>
                  <select
                    id="reward_type"
                    name="reward_type"
                    defaultValue={business.reward_type ?? "credit"}
                    className="w-full rounded-2xl border-2 border-slate-200 p-3 text-sm font-semibold"
                  >
                    <option value="credit">Credit</option>
                    <option value="upgrade">Upgrade</option>
                    <option value="discount">Discount</option>
                    <option value="points">Points</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reward_amount" className="text-base font-bold text-slate-900">
                    Reward Amount ($)
                  </Label>
                  <Input
                    id="reward_amount"
                    name="reward_amount"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={business.reward_amount ?? 15}
                    className="text-base"
                  />
                  <p className="text-xs text-slate-500 mt-1">Per successful referral</p>
                </div>
                <div>
                  <Label htmlFor="upgrade_name" className="text-base font-bold text-slate-900">
                    Upgrade Name
                  </Label>
                  <Input
                    id="upgrade_name"
                    name="upgrade_name"
                    defaultValue={business.upgrade_name ?? ""}
                    placeholder="e.g., Complimentary brow tint"
                    className="text-base"
                  />
                  <p className="text-xs text-slate-500 mt-1">Only used if reward type = Upgrade</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                <p className="text-sm font-semibold text-amber-900 mb-1">Live summary</p>
                <p className="text-sm text-amber-800">
                  Ambassadors promote <span className="font-bold">{business.offer_text || "your hero offer"}</span> and earn{" "}
                  <span className="font-bold">
                    {business.reward_type === "credit"
                      ? `$${business.reward_amount ?? 15} credit`
                      : business.reward_type === "upgrade"
                      ? business.upgrade_name || "a free upgrade"
                      : business.reward_type === "discount"
                      ? `${business.reward_amount ?? 15}% discount`
                      : `${business.reward_amount ?? 100} points`}
                  </span>{" "}
                  per completed referral.
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-200 pt-4">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 font-bold shadow-lg"
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </form>
          </Card>

          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Reward fulfillment options</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <p className="font-semibold text-slate-900">Store credit</p>
                </div>
                <p className="text-sm text-slate-600 mt-2">Auto-applied to Pepform or POS accounts.</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <p className="font-semibold text-slate-900">Cash / bank</p>
                </div>
                <p className="text-sm text-slate-600 mt-2">Export CSV to process manual payouts.</p>
              </div>
              <div className="p-4 rounded-xl border-2 border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-amber-600" />
                  <p className="font-semibold text-slate-900">Gift cards</p>
                </div>
                <p className="text-sm text-slate-600 mt-2">Issue digital or physical rewards.</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
              <div className="flex items-start gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Import Customers</h2>
                  <p className="text-sm text-slate-600">Bulk upload spreadsheets to instantly generate referral links.</p>
                </div>
              </div>
              <CSVUploadForm uploadAction={uploadCSV} />
              <div className="mt-6 rounded-xl bg-purple-50 p-4 border border-purple-200">
                <p className="text-sm font-semibold text-purple-900 mb-2">
                  💡 Pro tip
                </p>
                <p className="text-sm text-purple-700">
                  Include <span className="font-mono bg-white px-2 py-0.5 rounded">name</span>,{" "}
                  <span className="font-mono bg-white px-2 py-0.5 rounded">phone</span>, and{" "}
                  <span className="font-mono bg-white px-2 py-0.5 rounded">email</span> columns.
                  We&apos;ll create unique referral links for each contact.
                </p>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
              <form action={quickAddCustomer} className="space-y-4">
                <Label className="text-base font-bold text-slate-900">Quick Add Customer</Label>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Input name="quick_name" placeholder="Full name" />
                  <Input name="quick_phone" placeholder="Phone number" />
                  <Input name="quick_email" placeholder="Email (optional)" />
                </div>
                <Button type="submit" className="font-bold w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
                <p className="text-xs text-slate-500">
                  We&apos;ll refresh the dashboard instantly with their referral link.
                </p>
              </form>
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-5">
                <p className="text-sm font-semibold text-emerald-800">
                  Active ambassadors: <span className="text-2xl font-black ml-2">{safeCustomers.length}</span>
                </p>
                <p className="text-xs text-emerald-700 mt-2">
                  Every manual addition instantly receives their shareable link.
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/80 rounded-3xl border-slate-200/80 bg-white/95">
            <h3 className="text-xl font-black text-slate-900 mb-4">
              All Customers ({safeCustomers.length})
            </h3>
            <CustomersTable customers={safeCustomers} siteUrl={siteUrl} />
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Referrals Table */}
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Referrals & Performance</h2>
                  <p className="text-sm text-slate-600">Track all referrals and performance metrics</p>
                </div>
              </div>
              <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referred</TableHead>
                    <TableHead>Ambassador</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safeReferrals.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-sm">
                        No referrals yet.
                      </TableCell>
                    </TableRow>
                  )}
                  {safeReferrals.map((referral) => {
                    const ambassador = safeCustomers.find(
                      (c) => c.id === referral.ambassador_id,
                    );
                    const isPending = referral.status === "pending";
                    return (
                      <TableRow key={referral.id}>
                        <TableCell>
                          <div className="font-medium">
                            {referral.referred_name ?? "Unknown"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {referral.referred_email ?? referral.referred_phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {ambassador?.name ?? "Unknown"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {ambassador?.email ?? ambassador?.phone ?? "—"}
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {referral.status ?? "—"}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {referral.created_at
                            ? new Date(referral.created_at).toLocaleDateString()
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {isPending ? (
                            <ReferralCompletionForm
                              referralId={referral.id}
                              ambassadorId={referral.ambassador_id ?? ""}
                              completionAction={markReferralCompleted}
                            />
                          ) : (
                            <Button size="sm" variant="outline" disabled>
                              Completed
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </div>
            </div>
          </Card>

          {/* Performance Analytics */}
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-slate-900 tracking-tight">Performance Analytics</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Total Ambassadors</h3>
                </div>
                <p className="text-3xl font-black text-purple-700">{safeCustomers.length}</p>
                <p className="text-sm text-slate-600 mt-1">Active micro-influencers</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Total Referrals</h3>
                </div>
                <p className="text-3xl font-black text-emerald-700">{safeReferrals.length}</p>
                <p className="text-sm text-slate-600 mt-1">{completedReferrals} completed</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Conversion Rate</h3>
                </div>
                <p className="text-3xl font-black text-blue-700">
                  {safeReferrals.length > 0 ? Math.round((completedReferrals / safeReferrals.length) * 100) : 0}%
                </p>
                <p className="text-sm text-slate-600 mt-1">Referral to completion</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-600 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Credits Issued</h3>
                </div>
                <p className="text-3xl font-black text-amber-700">${totalRewards}</p>
                <p className="text-sm text-slate-600 mt-1">Total rewards paid</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-pink-600 flex items-center justify-center">
                    <Gift className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Pending Rewards</h3>
                </div>
                <p className="text-3xl font-black text-pink-700">{pendingReferrals}</p>
                <p className="text-sm text-slate-600 mt-1">Awaiting completion</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Avg per Ambassador</h3>
                </div>
                <p className="text-3xl font-black text-indigo-700">
                  {safeCustomers.length > 0 ? (safeReferrals.length / safeCustomers.length).toFixed(1) : 0}
                </p>
                <p className="text-sm text-slate-600 mt-1">Referrals per person</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-rose-600 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Campaigns Sent</h3>
                </div>
                <p className="text-3xl font-black text-rose-700">{totalCampaignsSent}</p>
                <p className="text-sm text-slate-600 mt-1">Live SMS & email blasts</p>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    <Send className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Messages Delivered</h3>
                </div>
                <p className="text-3xl font-black text-slate-800">{totalMessagesSent}</p>
                <p className="text-sm text-slate-600 mt-1">Across all channels</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
      </div>
    </div>
  );
}
