import Papa from "papaparse";
import * as XLSX from "xlsx";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  createServerComponentClient,
  createServiceClient,
} from "@/lib/supabase";
import { Database } from "@/types/supabase";
import twilio from "twilio";

async function getBusiness() {
  const supabase = createServerComponentClient();
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
    const supabase = createServerComponentClient();
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
        parsedData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, {
          header: 1,
          defval: ''
        }).slice(1).map((row: any) => {
          const headers = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 })[0] || [];
          const obj: Record<string, string> = {};
          headers.forEach((header: string, index: number) => {
            obj[header] = row[index] || '';
          });
          return obj;
        });
      }

      const supabase = createServiceClient(); // service role to bypass RLS for bulk insert

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

      const supabase = createServiceClient();

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

  const supabase = createServerComponentClient();
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
  const totalRewards =
    safeCustomers.reduce((sum, c) => sum + (c.credits ?? 0), 0) || 0;

  return (
    <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
      <h1 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-bold">
        Pepform Dashboard — {business.name}
      </h1>
      <p className="mb-6 sm:mb-8 text-xs sm:text-sm text-muted-foreground">
        Pending referrals: {pendingReferrals} • Total credits issued:{" "}
        {totalRewards}
      </p>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto">
          <TabsTrigger value="settings" className="text-xs sm:text-sm px-2 py-2">Settings</TabsTrigger>
          <TabsTrigger value="clients" className="text-xs sm:text-sm px-2 py-2">Clients</TabsTrigger>
          <TabsTrigger value="referrals" className="text-xs sm:text-sm px-2 py-2">
            Referrals ({pendingReferrals})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card className="p-6">
            <form action={updateSettings} className="space-y-4">
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

              <Button type="submit" className="mt-2">
                Save Settings
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card className="p-6">
            <CSVUploadForm uploadAction={uploadCSV} />

            <div className="mt-8 space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">All customers</h3>
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
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold">Referrals</h3>
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
      </Tabs>
      <Toaster />
    </div>
  );
}
