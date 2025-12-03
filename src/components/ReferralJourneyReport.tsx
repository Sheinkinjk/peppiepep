import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MousePointerClick,
  UserPlus,
  TrendingUp,
  Link as LinkIcon,
  Clock,
  ClipboardCheck,
  Gift,
  Coins,
  MessageSquare,
  Send,
  MailCheck,
  AlertTriangle,
  Rocket,
  Flag,
} from "lucide-react";

import type { ReferralEventType } from "@/lib/referral-events";

export type ReferralJourneyEvent = {
  id: string;
  event_type: ReferralEventType;
  source: string | null;
  device: string | null;
  created_at: string | null;
  metadata: Record<string, unknown> | null;
  referral_id: string | null;
  ambassador: {
    id: string | null;
    name: string | null;
    referral_code: string | null;
  } | null;
};

const EVENT_META: Record<ReferralEventType, { label: string; description: string; color: string; Icon: typeof MousePointerClick }> = {
  link_visit: {
    label: "Link Visit",
    description: "A prospect landed on the referral page",
    color: "text-sky-600",
    Icon: MousePointerClick,
  },
  signup_submitted: {
    label: "Signup Submitted",
    description: "Lead shared their details",
    color: "text-amber-600",
    Icon: UserPlus,
  },
  conversion_pending: {
    label: "Approval Pending",
    description: "Team is reviewing the referred visit",
    color: "text-slate-600",
    Icon: Clock,
  },
  conversion_completed: {
    label: "Conversion",
    description: "Referral marked as completed",
    color: "text-emerald-600",
    Icon: TrendingUp,
  },
  manual_conversion_recorded: {
    label: "Manual Conversion",
    description: "Conversion recorded from an offline visit",
    color: "text-indigo-600",
    Icon: ClipboardCheck,
  },
  payout_released: {
    label: "Payout Released",
    description: "Reward issued to the ambassador",
    color: "text-pink-600",
    Icon: Gift,
  },
  payout_adjusted: {
    label: "Payout Adjusted",
    description: "Reward amount was updated",
    color: "text-rose-500",
    Icon: Coins,
  },
  campaign_message_queued: {
    label: "Message Queued",
    description: "Campaign message staged in the dispatcher",
    color: "text-blue-500",
    Icon: MessageSquare,
  },
  campaign_message_sent: {
    label: "Message Sent",
    description: "Provider accepted the outbound send",
    color: "text-cyan-600",
    Icon: Send,
  },
  campaign_message_delivered: {
    label: "Message Delivered",
    description: "Recipient device confirmed delivery",
    color: "text-emerald-500",
    Icon: MailCheck,
  },
  campaign_message_failed: {
    label: "Message Failed",
    description: "Provider reported a temporary or fatal error",
    color: "text-red-500",
    Icon: AlertTriangle,
  },
  campaign_delivery_batch_started: {
    label: "Batch Started",
    description: "Worker began delivering scheduled messages",
    color: "text-purple-500",
    Icon: Rocket,
  },
  campaign_delivery_batch_finished: {
    label: "Batch Finished",
    description: "Dispatcher finished the current batch",
    color: "text-green-700",
    Icon: Flag,
  },
};

function formatTimestamp(timestamp: string | null) {
  if (!timestamp) return "—";
  try {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } catch {
    return timestamp;
  }
}

export function ReferralJourneyReport({ events }: { events: ReferralJourneyEvent[] }) {
  if (events.length === 0) {
    return (
      <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
        <div className="flex items-center gap-3 text-slate-600">
          <Users className="h-5 w-5" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">Referral Journey</h3>
            <p className="text-sm">Once prospects start clicking, signing up, and converting, their full path will appear here.</p>
          </div>
        </div>
      </Card>
    );
  }

  const grouped = events.reduce<Record<string, ReferralJourneyEvent[]>>((acc, event) => {
    const key = event.ambassador?.id ?? "unknown";
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});

  return (
    <Card className="p-6 sm:p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 rounded-3xl border-slate-200/80">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center">
          <LinkIcon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Referral Journey</h3>
          <p className="text-sm text-slate-600">End-to-end event timeline for every ambassador.</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([ambassadorId, ambassadorEvents]) => {
          const ambassadorName = ambassadorEvents[0]?.ambassador?.name || "Unknown ambassador";
          const referralCode = ambassadorEvents[0]?.ambassador?.referral_code || "—";
          const sorted = [...ambassadorEvents].sort((a, b) => {
            const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
            const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
            return bTime - aTime;
          });

          return (
            <div key={ambassadorId} className="rounded-2xl border border-slate-200 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Ambassador</p>
                  <p className="text-lg font-bold text-slate-900">{ambassadorName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Referral code</p>
                  <p className="text-sm font-mono text-slate-700">{referralCode}</p>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {sorted.map((event) => {
                  const meta = EVENT_META[event.event_type];
                  const Icon = meta?.Icon ?? MousePointerClick;
                  const metadataReferrer =
                    event.metadata && typeof (event.metadata as { referrer?: unknown }).referrer === "string"
                      ? String((event.metadata as { referrer?: string }).referrer)
                      : null;
                  return (
                    <div key={event.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 ${meta?.color || "text-slate-600"}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{meta?.label ?? event.event_type}</p>
                          <p className="text-xs text-slate-500">{meta?.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-wrap items-center gap-2 text-xs text-slate-600">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                          Source: {event.source || "direct"}
                        </Badge>
                        <Badge variant="outline">Device: {event.device || "unknown"}</Badge>
                        {metadataReferrer && (
                          <Badge variant="outline">Referrer: {metadataReferrer}</Badge>
                        )}
                        {event.referral_id && (
                          <Badge variant="outline">Referral ID: {event.referral_id.slice(0, 8)}</Badge>
                        )}
                      </div>
                      <div className="text-sm font-mono text-slate-500">
                        {formatTimestamp(event.created_at)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
