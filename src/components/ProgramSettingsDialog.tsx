'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Settings as SettingsIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/types/supabase";

type RewardType =
  Database["public"]["Tables"]["businesses"]["Row"]["reward_type"];

type ProgramSettingsDialogProps = {
  businessName: string;
  offerText: string | null;
  newUserRewardText: string | null;
  clientRewardText: string | null;
  rewardType: RewardType;
  rewardAmount: number | null;
  upgradeName: string | null;
  rewardTerms: string | null;
  logoUrl?: string | null;
  brandHighlightColor?: string | null;
  brandTone?: string | null;
  updateSettingsAction: (formData: FormData) => Promise<void>;
};

export function ProgramSettingsDialog({
  businessName,
  offerText,
  newUserRewardText,
  clientRewardText,
  rewardType,
  rewardAmount,
  upgradeName,
  rewardTerms,
  logoUrl,
  brandHighlightColor,
  brandTone,
  updateSettingsAction,
}: ProgramSettingsDialogProps) {
  const [open, setOpen] = useState(false);

  const [settingsOfferText, setSettingsOfferText] = useState(offerText ?? "");
  const [settingsNewUserRewardText, setSettingsNewUserRewardText] = useState(
    newUserRewardText ?? "",
  );
  const [settingsClientRewardText, setSettingsClientRewardText] = useState(
    clientRewardText ?? "",
  );
  const [settingsRewardType, setSettingsRewardType] = useState<RewardType>(
    rewardType ?? "credit",
  );
  const [settingsRewardAmount, setSettingsRewardAmount] = useState<number>(
    rewardAmount ?? 15,
  );
  const [settingsUpgradeName, setSettingsUpgradeName] = useState(
    upgradeName ?? "",
  );
  const [settingsRewardTerms, setSettingsRewardTerms] = useState(
    rewardTerms ?? "",
  );
  const [settingsLogoUrl, setSettingsLogoUrl] = useState(logoUrl ?? "");
  const [settingsBrandHighlightColor, setSettingsBrandHighlightColor] = useState(
    brandHighlightColor ?? "#7c3aed",
  );
  const [settingsBrandTone, setSettingsBrandTone] = useState(
    brandTone ?? "modern",
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    const formData = new FormData();
    formData.append("offer_text", settingsOfferText);
    formData.append("new_user_reward_text", settingsNewUserRewardText);
    formData.append("client_reward_text", settingsClientRewardText);
    formData.append("reward_type", settingsRewardType ?? "credit");
    formData.append(
      "reward_amount",
      String(settingsRewardAmount ?? 0),
    );
    formData.append("upgrade_name", settingsUpgradeName);
    formData.append("reward_terms", settingsRewardTerms);
    formData.append("logo_url", settingsLogoUrl);
    formData.append(
      "brand_highlight_color",
      settingsBrandHighlightColor ?? "",
    );
    formData.append("brand_tone", settingsBrandTone ?? "");

    try {
      await updateSettingsAction(formData);
      toast({
        title: "Program settings updated",
        description:
          "Referral pages, campaigns, and ambassador rewards now use the latest configuration.",
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to update program settings:", error);
      toast({
        variant: "destructive",
        title: "Failed to update settings",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center gap-2 rounded-full border-slate-300 px-4 py-2 text-sm font-semibold"
        >
          <SettingsIcon className="h-4 w-4" />
          Edit Program Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Program Settings &amp; Rewards
          </DialogTitle>
          <DialogDescription>
            Configure the default offer and rewards for{" "}
            <span className="font-semibold text-slate-900">
              {businessName}
            </span>
            . These settings power your referral pages, ambassador portal, and
            future campaigns.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="ps_offer_text">Public headline / offer</Label>
            <Textarea
              id="ps_offer_text"
              value={settingsOfferText}
              onChange={(e) => setSettingsOfferText(e.target.value)}
              placeholder="e.g., Turn your loyalty into $200 each time a friend joins"
              className="min-h-[72px]"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ps_new_user_reward_text">New user reward</Label>
              <Textarea
                id="ps_new_user_reward_text"
                value={settingsNewUserRewardText}
                onChange={(e) =>
                  setSettingsNewUserRewardText(e.target.value)
                }
                placeholder="e.g., $200 welcome credit or free VIP upgrade"
                className="min-h-[90px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_client_reward_text">
                Client / ambassador reward
              </Label>
              <Textarea
                id="ps_client_reward_text"
                value={settingsClientRewardText}
                onChange={(e) =>
                  setSettingsClientRewardText(e.target.value)
                }
                placeholder="e.g., $200 salon credit released once the booking is completed"
                className="min-h-[90px]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ps_reward_type">Reward type</Label>
              <select
                id="ps_reward_type"
                value={settingsRewardType ?? "credit"}
                onChange={(e) =>
                  setSettingsRewardType(
                    e.target.value as RewardType,
                  )
                }
                className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
              >
                <option value="credit">Credit</option>
                <option value="upgrade">Upgrade</option>
                <option value="discount">Discount</option>
                <option value="points">Points</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_reward_amount">Reward amount</Label>
              <Input
                id="ps_reward_amount"
                type="number"
                min="0"
                step="1"
                value={settingsRewardAmount}
                onChange={(e) =>
                  setSettingsRewardAmount(
                    Number(e.target.value || "0") || 0,
                  )
                }
              />
              <p className="text-[11px] text-slate-500">
                For credit/discount/points, enter the numeric amount.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_upgrade_name">Upgrade name</Label>
              <Input
                id="ps_upgrade_name"
                value={settingsUpgradeName}
                onChange={(e) => setSettingsUpgradeName(e.target.value)}
                placeholder="e.g., Complimentary brow tint"
              />
              <p className="text-[11px] text-slate-500">
                Used when reward type is set to &quot;Upgrade&quot;.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ps_logo_url">Logo URL (optional)</Label>
            <Input
              id="ps_logo_url"
              type="url"
              value={settingsLogoUrl}
              onChange={(e) => setSettingsLogoUrl(e.target.value)}
              placeholder="https://yourdomain.com/logo.png"
            />
            <p className="text-[11px] text-slate-500">
              Used in premium email campaigns and referral pages to keep
              everything on brand.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ps_brand_highlight_color">Brand highlight color</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="ps_brand_highlight_color"
                  type="color"
                  value={settingsBrandHighlightColor || "#7c3aed"}
                  onChange={(e) =>
                    setSettingsBrandHighlightColor(e.target.value || "#7c3aed")
                  }
                  className="h-10 w-16 cursor-pointer rounded-xl p-1"
                />
                <Input
                  type="text"
                  value={settingsBrandHighlightColor}
                  onChange={(e) => setSettingsBrandHighlightColor(e.target.value)}
                  placeholder="#7c3aed"
                  className="flex-1"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Controls gradients, CTA buttons, and referral card accents inside your campaigns.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ps_brand_tone">Brand tone</Label>
              <select
                id="ps_brand_tone"
                value={settingsBrandTone ?? "modern"}
                onChange={(e) => setSettingsBrandTone(e.target.value)}
                className="w-full rounded-2xl border-2 border-slate-200 p-2.5 text-sm font-semibold"
              >
                <option value="modern">Modern &amp; energetic</option>
                <option value="luxury">Luxury &amp; editorial</option>
                <option value="playful">Playful &amp; bold</option>
                <option value="earthy">Earthy &amp; grounded</option>
                <option value="minimal">Minimal &amp; clean</option>
              </select>
              <p className="text-[11px] text-slate-500">
                Adjusts typography, backgrounds, and textures to match your brand personality.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ps_reward_terms">
              Reward terms &amp; conditions
            </Label>
            <Textarea
              id="ps_reward_terms"
              value={settingsRewardTerms}
              onChange={(e) => setSettingsRewardTerms(e.target.value)}
              placeholder="e.g., Reward paid once referred client completes first booking within 60 days."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span>
                Changes apply to referral pages, ambassador portal, and new
                campaigns.
              </span>
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 font-bold shadow-md"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Program Settings"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
