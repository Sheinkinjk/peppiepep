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
import {
  Users, TrendingUp, DollarSign, Zap, Upload, MessageSquare,
  Gift, Sparkles, Crown, CheckCircle2, BarChart3, Settings as SettingsIcon,
  Award, PieChart, Activity, Bot, Rocket, Copy
} from "lucide-react";
import {
  createServerComponentClient,
  createServiceClient,
} from "@/lib/supabase";
import { Database } from "@/types/supabase";
import twilio from "twilio";
import { Resend } from "resend";
import { rankAmbassadors, type ScoredCustomer } from "@/lib/ai-scoring";
import { calculateROIForecast, type ROIForecast } from "@/lib/ai-roi-calculator";
import { normalizePhoneNumber } from "@/lib/phone-utils";

async function getBusiness() {
  const supabase = await createServerComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .single();

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
      .select()
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any)
      .from("businesses")
      .update({
        offer_text: (formData.get("offer_text") as string) ?? null,
        reward_type: (formData.get("reward_type") as string) ?? null,
        reward_amount: Number(formData.get("reward_amount") || 0),
        upgrade_name:
          ((formData.get("upgrade_name") as string) || "").trim() || null,
      })
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

  async function sendCampaign(formData: FormData) {
    "use server";
    try {
      const campaignName = formData.get("campaignName") as string;
      const campaignMessage = formData.get("campaignMessage") as string;
      const campaignChannel = formData.get("campaignChannel") as "sms" | "email";
      const scheduleType = formData.get("scheduleType") as "now" | "later";
      const scheduleDate = formData.get("scheduleDate") as string;
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
        return { error: "Scheduled campaigns are not yet supported. Please select 'Send Now'." };
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedCustomers = customersData as any[];

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

      if (campaignChannel === "sms") {
        // Send SMS via Twilio
        const sid = process.env.TWILIO_ACCOUNT_SID;
        const token = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_PHONE_NUMBER;

        if (!sid || !token || !from) {
          return { error: "SMS service not configured. Please contact support." };
        }

        const client = twilio(sid, token);

        for (const customer of selectedCustomers) {
          if (!customer.phone) {
            console.error(`Customer ${customer.name} has no phone number`);
            failureCount++;
            continue;
          }

          // Normalize phone number to E.164 format (Australian numbers default)
          const normalizedPhone = normalizePhoneNumber(customer.phone, 'AU');

          if (!normalizedPhone) {
            console.error(`Invalid phone format for ${customer.name}: ${customer.phone}`);
            failureCount++;
            continue;
          }

          try {
            // Personalize message
            const personalizedMessage = campaignMessage
              .replace(/\{\{name\}\}/g, customer.name || "there")
              .replace(
                /\{\{referral_link\}\}/g,
                customer.referral_code ? `${baseSiteUrl}/r/${customer.referral_code}` : ""
              );

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
      } else if (campaignChannel === "email") {
        // Send Email via Resend
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
          return { error: "Email service not configured. Please contact support." };
        }

        const resend = new Resend(apiKey);
        const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@peppiepep.com";
        const businessEmail = business.name ? `${business.name} <${fromEmail}>` : fromEmail;

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
                customer.referral_code ? `${baseSiteUrl}/r/${customer.referral_code}` : ""
              );

            // Convert message to HTML (basic formatting)
            const htmlMessage = personalizedMessage
              .split('\n')
              .map(line => line.trim())
              .filter(line => line.length > 0)
              .map(line => `<p style="margin: 0 0 12px 0; line-height: 1.6;">${line}</p>`)
              .join('');

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

      if (failureCount === 0) {
        return { success: `Campaign sent successfully to ${successCount} customers!` };
      } else {
        return {
          success: `Campaign completed with ${successCount} successful and ${failureCount} failed messages.`,
        };
      }
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
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 p-1.5 bg-white/90 backdrop-blur-xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-2xl h-auto">
            <TabsTrigger
              value="ai-tools"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-purple-400/50 transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">AI Tools</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-purple-400/50 transition-all duration-200"
            >
              <Rocket className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Campaigns</span>
              <span className="sm:hidden">Camp</span>
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-purple-300/50 transition-all duration-200"
            >
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Clients & Ambassadors</span>
              <span className="sm:hidden">Clients</span>
            </TabsTrigger>
            <TabsTrigger
              value="referrals"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-emerald-300/50 transition-all duration-200"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Referrals
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-300/50 transition-all duration-200"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-sm px-4 py-3 font-bold rounded-xl data-[state=active]:bg-gradient-to-b data-[state=active]:from-amber-600 data-[state=active]:to-amber-700 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-amber-300/50 transition-all duration-200"
            >
              <SettingsIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings & Rewards</span>
              <span className="sm:hidden">Settings</span>
            </TabsTrigger>
          </TabsList>

        <TabsContent value="ai-tools">
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
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignBuilder
            customers={safeCustomers}
            businessName={business.name || "Your Business"}
            siteUrl={siteUrl}
            sendCampaignAction={sendCampaign}
          />
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-slate-900 tracking-tight">Settings & Rewards</h2>
            <form action={updateSettings} className="space-y-6">
              <div>
                <Label htmlFor="offer_text">New client offer text</Label>
                <Input
                  id="offer_text"
                  name="offer_text"
                  defaultValue={business.offer_text ?? ""}
                />
              </div>

              <div>
                <Label htmlFor="reward_type">Reward type</Label>
                <select
                  id="reward_type"
                  name="reward_type"
                  defaultValue={business.reward_type ?? "credit"}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="credit">Credit £/$</option>
                  <option value="upgrade">Free upgrade</option>
                </select>
              </div>

              {business.reward_type === "upgrade" && (
                <div>
                  <Label htmlFor="upgrade_name">Upgrade name</Label>
                  <Input
                    id="upgrade_name"
                    name="upgrade_name"
                    defaultValue={business.upgrade_name ?? ""}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="reward_amount">Reward amount (AUD $)</Label>
                <Input
                  id="reward_amount"
                  name="reward_amount"
                  type="number"
                  defaultValue={business.reward_amount ?? 0}
                />
              </div>

              <Button type="submit" className="mt-4 bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-400/50 transition-all duration-200">
                Save Settings
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-slate-900 tracking-tight">Import Customers</h2>
            <CSVUploadForm uploadAction={uploadCSV} />

            <div className="mt-10 space-y-5">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">All customers</h3>
              <div className="overflow-x-auto -mx-6 px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Referral link</TableHead>
                    <TableHead className="text-right">Credits</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safeCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-sm">
                        No customers yet. Upload a CSV to get started.
                      </TableCell>
                    </TableRow>
                  )}
                  {safeCustomers.map((customer) => {
                    const referralLink = customer.referral_code
                      ? `${siteUrl}/r/${customer.referral_code}`
                      : null;
                    return (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.name ?? "—"}</TableCell>
                        <TableCell>{customer.phone ?? "—"}</TableCell>
                        <TableCell>{customer.email ?? "—"}</TableCell>
                        <TableCell className="max-w-[220px] truncate">
                          {referralLink ?? "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          {customer.credits ?? 0}
                        </TableCell>
                        <TableCell className="capitalize">
                          {customer.status ?? "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
            <div className="space-y-5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Referrals</h2>
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
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
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
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
      </div>
    </div>
  );
}
