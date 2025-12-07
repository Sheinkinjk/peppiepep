"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Mail, MessageSquare, Gift, TrendingUp, Award, Heart, Zap, FileText } from "lucide-react";
import { campaignTemplates, type CampaignTemplate, fillTemplateVariables } from "@/lib/campaign-templates";

type CampaignTemplateSelectorProps = {
  onSelectTemplate: (template: CampaignTemplate) => void;
  businessName: string;
  clientReward: string;
  newUserReward: string;
  offer: string;
};

const categoryIcons = {
  launch: Sparkles,
  reengagement: TrendingUp,
  seasonal: Gift,
  milestone: Award,
  appreciation: Heart,
  urgency: Zap,
};

const categoryLabels = {
  launch: "Launch & Welcome",
  reengagement: "Re-engagement",
  seasonal: "Seasonal",
  milestone: "Milestones",
  appreciation: "Thank You",
  urgency: "Urgent",
};

export function CampaignTemplateSelector({
  onSelectTemplate,
  businessName,
  clientReward,
  newUserReward,
  offer,
}: CampaignTemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CampaignTemplate["category"]>("launch");
  const [previewTemplate, setPreviewTemplate] = useState<CampaignTemplate | null>(null);

  const handleSelectTemplate = (template: CampaignTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  const getPreviewText = (template: CampaignTemplate) => {
    return fillTemplateVariables(template.message, {
      name: "Sarah",
      businessName,
      clientReward,
      newUserReward,
      offer,
      referral_link: "https://example.com/r/ABC123",
      credits: "250",
      referralCount: "12",
      estimatedEarnings: "150",
      doubleReward: `$${parseFloat(clientReward.replace(/[^0-9.]/g, "")) * 2}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[95vw] sm:w-full overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Campaign Templates
          </DialogTitle>
          <DialogDescription>
            Choose from professionally-written templates to save time and boost engagement
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as CampaignTemplate["category"])} className="h-full flex flex-col">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-2 bg-slate-50">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const Icon = categoryIcons[key as keyof typeof categoryIcons];
                const count = campaignTemplates.filter((t) => t.category === key).length;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-white data-[state=active]:text-purple-600"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{label}</span>
                    <span className="text-[10px] text-slate-500">{count}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.keys(categoryLabels).map((category) => (
              <TabsContent key={category} value={category} className="flex-1 overflow-auto mt-4">
                <div className="grid gap-3 md:grid-cols-2">
                  {campaignTemplates
                    .filter((t) => t.category === category)
                    .map((template) => (
                      <div
                        key={template.id}
                        className="group relative rounded-lg border border-slate-200 bg-white p-4 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setPreviewTemplate(template)}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition">
                              {template.name}
                            </h3>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {template.description}
                            </p>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            {template.channel === "both" ? (
                              <>
                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                                <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                              </>
                            ) : template.channel === "email" ? (
                              <Mail className="h-3.5 w-3.5 text-slate-400" />
                            ) : (
                              <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            {template.tone}
                          </Badge>
                          {template.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 bg-slate-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-xs text-slate-700 line-clamp-2 mb-3 font-mono bg-slate-50 p-2 rounded">
                          {getPreviewText(template).substring(0, 120)}...
                        </p>

                        <Button
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTemplate(template);
                          }}
                        >
                          Use This Template
                        </Button>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Preview Dialog */}
        {previewTemplate && (
          <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
            <DialogContent className="max-w-2xl w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{previewTemplate.name}</DialogTitle>
                <DialogDescription>{previewTemplate.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>{previewTemplate.tone} tone</Badge>
                  <Badge variant="outline">{previewTemplate.channel}</Badge>
                  {previewTemplate.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {previewTemplate.subject && (
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-1">Email Subject:</p>
                    <p className="text-sm text-slate-900 p-2 bg-slate-50 rounded border border-slate-200">
                      {fillTemplateVariables(previewTemplate.subject, {
                        businessName,
                        clientReward,
                        newUserReward,
                        offer,
                      })}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-1">Message Preview:</p>
                  <div className="text-sm text-slate-900 p-3 bg-slate-50 rounded border border-slate-200 whitespace-pre-wrap font-mono text-xs">
                    {getPreviewText(previewTemplate)}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Best For:</p>
                  <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
                    {previewTemplate.bestFor.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleSelectTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="flex-1"
                >
                  Use This Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}
