import Papa from "papaparse";
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
import {
  createServerComponentClient,
  createServiceClient,
} from "@/lib/supabase";
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
    // ts: align types once generated from Supabase; casting for now to satisfy build.
    const supabaseAny = supabase as any;
    const { data: newBiz } = await supabaseAny
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
    const supabaseAny = supabase as any;
    await supabaseAny
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
    const file = formData.get("file");
    if (!(file instanceof File)) {
      throw new Error("CSV file missing");
    }

    const text = await file.text();
    const parsed = Papa.parse<Record<string, string>>(text, { header: true });

    const supabase = createServiceClient(); // service role to bypass RLS for bulk insert
    const supabaseAny = supabase as any;

    const customersToInsert = (parsed.data || [])
      .map((row) => ({
        business_id: business.id,
        name: row.name || row.Name || row.full_name || null,
        phone: row.phone || row.Phone || row.mobile || null,
        email: row.email || row.Email || null,
        referral_code: nanoid(12),
      }))
      .filter((row) => row.name || row.phone || row.email);

    if (customersToInsert.length === 0) {
      return;
    }

    await supabaseAny.from("customers").insert(customersToInsert);
    revalidatePath("/dashboard");
  }

  async function markReferralCompleted(formData: FormData) {
    "use server";
    const referralId = formData.get("referral_id") as string | null;
    const ambassadorId = formData.get("ambassador_id") as string | null;
    if (!referralId || !ambassadorId) return;

    const supabase = createServiceClient();
    const supabaseAny = supabase as any;

    const amount =
      business.reward_type === "credit" ? business.reward_amount ?? 0 : 0;

    await supabaseAny
      .from("referrals")
      .update({ status: "completed", rewarded_at: new Date().toISOString() })
      .eq("id", referralId);

    let ambassadorPhone: string | null | undefined;
    let ambassadorReferralCode: string | null | undefined;

    if (amount > 0) {
      const { data: ambassador } = await supabaseAny
        .from("customers")
        .select("credits, phone, referral_code")
        .eq("id", ambassadorId)
        .single();

      const currentCredits = ambassador?.credits ?? 0;
      ambassadorPhone = ambassador?.phone;
      ambassadorReferralCode = ambassador?.referral_code;

      await supabaseAny
        .from("customers")
        .update({ credits: currentCredits + amount })
        .eq("id", ambassadorId);
    } else {
      const { data: ambassador } = await supabaseAny
        .from("customers")
        .select("phone, referral_code")
        .eq("id", ambassadorId)
        .single();
      ambassadorPhone = ambassador?.phone;
      ambassadorReferralCode = ambassador?.referral_code;
    }

    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;

    if (sid && token && from && ambassadorPhone) {
      const client = twilio(sid, token);
      const referralLink = ambassadorReferralCode
        ? `${baseSiteUrl}/r/${ambassadorReferralCode}`
        : "";

      await client.messages.create({
        body: `Amazing! Your friend just booked – you've earned £${amount} credit at ${business.name}! Your link: ${referralLink}`,
        from,
        to: ambassadorPhone,
      });
    }

    revalidatePath("/dashboard");
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

  const safeReferrals = (referrals ?? []) as any[];
  const safeCustomers = (customers ?? []) as any[];

  const pendingReferrals =
    safeReferrals.filter((r) => r.status === "pending").length || 0;
  const totalRewards =
    safeCustomers.reduce((sum, c) => sum + (c.credits ?? 0), 0) || 0;

  return (
    <div className="mx-auto max-w-5xl p-8">
      <h1 className="mb-2 text-4xl font-bold">
        Pepform Dashboard — {business.name}
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Pending referrals: {pendingReferrals} • Total credits issued:{" "}
        {totalRewards}
      </p>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList>
          <TabsTrigger value="settings">Settings &amp; Rewards</TabsTrigger>
          <TabsTrigger value="clients">Clients &amp; Ambassadors</TabsTrigger>
          <TabsTrigger value="referrals">
            Referrals ({pendingReferrals} pending)
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
                <Label htmlFor="reward_amount">Reward amount (£/$)</Label>
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
            <form action={uploadCSV} className="space-y-4">
              <div>
                <Label htmlFor="file">
                  Upload CSV (columns: name, phone, email optional)
                </Label>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  accept=".csv"
                  required
                />
              </div>
              <Button type="submit">Upload &amp; Generate Links</Button>
            </form>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold">All customers</h3>
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
          </Card>
        </TabsContent>

        <TabsContent value="referrals">
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Referrals</h3>
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
                          <form action={markReferralCompleted}>
                            <input
                              type="hidden"
                              name="referral_id"
                              value={referral.id}
                            />
                            <input
                              type="hidden"
                              name="ambassador_id"
                              value={referral.ambassador_id ?? ""}
                            />
                            <Button
                              type="submit"
                              size="sm"
                              variant={isPending ? "default" : "outline"}
                              disabled={!isPending}
                            >
                              {isPending ? "Mark completed" : "Completed"}
                            </Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
