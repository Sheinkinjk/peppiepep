"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, Mail, Calendar, Send, AlertCircle, CheckCircle } from "lucide-react";
import { Database } from "@/types/supabase";

type Customer = Database["public"]["Tables"]["customers"]["Row"];

type CampaignBuilderProps = {
  customers: Customer[];
  businessName: string;
  siteUrl: string;
  sendCampaignAction: (formData: FormData) => Promise<{ success?: string; error?: string }>;
};

export function CampaignBuilder({
  customers,
  businessName,
  siteUrl,
  sendCampaignAction
}: CampaignBuilderProps) {
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignName, setCampaignName] = useState("");
  const [campaignMessage, setCampaignMessage] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [campaignChannel, setCampaignChannel] = useState<"sms" | "email">("sms");
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const eligibleCustomers = customers.filter(c =>
    campaignChannel === "sms" ? c.phone : c.email
  );

  const selectedCount = selectedCustomers.length;
  const costPerMessage = campaignChannel === "sms" ? 0.02 : 0.01;
  const estimatedCost = selectedCount * costPerMessage;

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAllCustomers = () => {
    setSelectedCustomers(eligibleCustomers.map(c => c.id));
  };

  const deselectAllCustomers = () => {
    setSelectedCustomers([]);
  };

  const handleSendCampaign = async () => {
    if (!campaignName || !campaignMessage || selectedCustomers.length === 0) {
      setStatusMessage({ type: "error", text: "Please fill in all required fields and select at least one customer." });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    const formData = new FormData();
    formData.append("campaignName", campaignName);
    formData.append("campaignMessage", campaignMessage);
    formData.append("campaignChannel", campaignChannel);
    formData.append("scheduleType", scheduleType);
    formData.append("scheduleDate", scheduleDate);
    formData.append("selectedCustomers", JSON.stringify(selectedCustomers));

    try {
      const result = await sendCampaignAction(formData);

      if (result.success) {
        setStatusMessage({ type: "success", text: result.success });
        setShowCampaignModal(false);
        // Reset form
        setCampaignName("");
        setCampaignMessage("");
        setSelectedCustomers([]);
        setScheduleType("now");
        setScheduleDate("");
      } else if (result.error) {
        setStatusMessage({ type: "error", text: result.error });
      }
    } catch (error) {
      console.error("Campaign send error:", error);
      setStatusMessage({ type: "error", text: "Failed to send campaign. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Status Message */}
      {statusMessage && (
        <Card className={`p-4 mb-6 border-2 ${
          statusMessage.type === "success"
            ? "bg-emerald-50 border-emerald-200"
            : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-center gap-3">
            {statusMessage.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600" />
            )}
            <p className={`text-sm font-semibold ${
              statusMessage.type === "success" ? "text-emerald-900" : "text-red-900"
            }`}>
              {statusMessage.text}
            </p>
          </div>
        </Card>
      )}

      {/* Start Campaign Button */}
      <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
              Launch Campaign
            </h2>
            <p className="text-slate-600">
              Send SMS or email messages to your ambassadors to boost referrals
            </p>
          </div>
          <Button
            onClick={() => setShowCampaignModal(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold shadow-lg"
          >
            <Send className="mr-2 h-4 w-4" />
            Start New Campaign
          </Button>
        </div>
      </Card>

      {/* Campaign Modal */}
      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create New Campaign</DialogTitle>
            <DialogDescription>
              Send personalized messages to your ambassadors to drive more referrals
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Campaign Name */}
            <div>
              <Label htmlFor="campaignName">Campaign Name</Label>
              <Input
                id="campaignName"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="e.g., Holiday Referral Push"
              />
            </div>

            {/* Channel Selection */}
            <div>
              <Label>Campaign Channel</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant={campaignChannel === "sms" ? "default" : "outline"}
                  onClick={() => {
                    setCampaignChannel("sms");
                    setSelectedCustomers([]);
                  }}
                  className="flex-1"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  SMS
                </Button>
                <Button
                  type="button"
                  variant={campaignChannel === "email" ? "default" : "outline"}
                  onClick={() => {
                    setCampaignChannel("email");
                    setSelectedCustomers([]);
                  }}
                  className="flex-1"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="campaignMessage">
                Message {campaignChannel === "sms" && "(160 characters recommended)"}
              </Label>
              <Textarea
                id="campaignMessage"
                value={campaignMessage}
                onChange={(e) => setCampaignMessage(e.target.value)}
                placeholder={`Hi {{name}}! Share your referral link and earn rewards at ${businessName}. Your link: {{referral_link}}`}
                rows={4}
                className="font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                Use {"{{name}}"} and {"{{referral_link}}"} as placeholders for personalization
              </p>
              {campaignChannel === "sms" && (
                <p className="text-xs text-slate-600 mt-1">
                  Character count: {campaignMessage.length}
                </p>
              )}
            </div>

            {/* Schedule */}
            <div>
              <Label>Schedule</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant={scheduleType === "now" ? "default" : "outline"}
                  onClick={() => setScheduleType("now")}
                  className="flex-1"
                >
                  Send Now
                </Button>
                <Button
                  type="button"
                  variant={scheduleType === "later" ? "default" : "outline"}
                  onClick={() => setScheduleType("later")}
                  className="flex-1"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Later
                </Button>
              </div>
              {scheduleType === "later" && (
                <Input
                  type="datetime-local"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="mt-3"
                  min={new Date().toISOString().slice(0, 16)}
                />
              )}
            </div>

            {/* Customer Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Select Recipients ({selectedCount} selected)</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={selectAllCustomers}
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={deselectAllCustomers}
                  >
                    Deselect All
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
                {eligibleCustomers.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No customers have {campaignChannel === "sms" ? "phone numbers" : "email addresses"} on file.
                  </p>
                )}
                {eligibleCustomers.map((customer) => {
                  const isSelected = selectedCustomers.includes(customer.id);
                  return (
                    <div
                      key={customer.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer border-2 ${
                        isSelected
                          ? "bg-purple-50 border-purple-300 shadow-sm"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                      onClick={() => toggleCustomerSelection(customer.id)}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => {
                          // Don't call toggleCustomerSelection here since onClick on parent div handles it
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{customer.name}</p>
                        <p className="text-xs text-slate-500">
                          {campaignChannel === "sms" ? customer.phone : customer.email}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="text-purple-600 font-bold text-xs">✓ Selected</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cost Estimate */}
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-900">Estimated Cost</p>
                  <p className="text-xs text-blue-700">
                    ${costPerMessage.toFixed(3)} per {campaignChannel === "sms" ? "SMS" : "email"} × {selectedCount} recipients
                  </p>
                </div>
                <p className="text-2xl font-black text-blue-900">
                  ${estimatedCost.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCampaignModal(false)}
                className="flex-1"
                disabled={isSending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSendCampaign}
                disabled={isSending || selectedCustomers.length === 0 || !campaignName || !campaignMessage}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 font-bold"
              >
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {scheduleType === "now" ? "Send Campaign" : "Schedule Campaign"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
