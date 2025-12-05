export type CampaignTemplate = {
  id: string;
  name: string;
  description: string;
  category: "launch" | "reengagement" | "seasonal" | "milestone" | "appreciation" | "urgency";
  channel: "sms" | "email" | "both";
  subject?: string; // For email
  message: string;
  tone: "professional" | "friendly" | "enthusiastic" | "urgent" | "casual";
  bestFor: string[];
  tags: string[];
};

export const campaignTemplates: CampaignTemplate[] = [
  // Launch & Introduction Templates
  {
    id: "launch-welcome",
    name: "Welcome to the Program",
    description: "Introduce new ambassadors to your referral program",
    category: "launch",
    channel: "both",
    subject: "You're officially a {{businessName}} ambassador!",
    message: "Hey {{name}}! 🎉\n\nYou're now part of an exclusive group of {{businessName}} ambassadors. Share your unique link and earn {{clientReward}} for every friend who {{offer}}.\n\nYour referral link: {{referral_link}}\n\nStart sharing today and watch the rewards add up!",
    tone: "enthusiastic",
    bestFor: ["New program launches", "First-time ambassador outreach", "Onboarding campaigns"],
    tags: ["welcome", "onboarding", "introduction"],
  },
  {
    id: "launch-exclusive-invite",
    name: "Exclusive Invitation",
    description: "Make ambassadors feel special with VIP treatment",
    category: "launch",
    channel: "email",
    subject: "You've been hand-selected as a {{businessName}} VIP",
    message: "Hi {{name}},\n\nWe don't offer this to everyone. You've been carefully selected to join our exclusive ambassador program.\n\nAs a VIP member, you'll earn {{clientReward}} every time someone you refer {{offer}}. Plus, your friends get {{newUserReward}} on their first purchase.\n\nReady to start? Here's your personal referral link:\n{{referral_link}}\n\nThis is your chance to turn your network into rewards.",
    tone: "professional",
    bestFor: ["High-value customers", "Influencer outreach", "Exclusive programs"],
    tags: ["VIP", "exclusive", "selective"],
  },

  // Re-engagement Templates
  {
    id: "reeng-dormant",
    name: "We Miss You",
    description: "Re-engage inactive ambassadors",
    category: "reengagement",
    channel: "both",
    subject: "Your referral link is still active (and missing you!)",
    message: "Hey {{name}}!\n\nIt's been a while since we've seen you share your link. The good news? Your referral rewards are still waiting.\n\nYou've earned ${{credits}} so far, and there's plenty more where that came from. Share your link today:\n\n{{referral_link}}\n\nYour network is your goldmine - time to tap into it!",
    tone: "friendly",
    bestFor: ["Inactive ambassadors (30+ days)", "Low engagement campaigns", "Win-back strategies"],
    tags: ["reengagement", "dormant", "win-back"],
  },
  {
    id: "reeng-reminder",
    name: "Quick Reminder",
    description: "Gentle nudge for recent but quiet ambassadors",
    category: "reengagement",
    channel: "sms",
    message: "{{name}}, just a quick reminder: You have ${{credits}} in referral credits! Share your link to earn more: {{referral_link}}",
    tone: "casual",
    bestFor: ["Moderately active ambassadors", "Gentle reminders", "SMS campaigns"],
    tags: ["reminder", "gentle", "credits"],
  },

  // Seasonal & Timely Templates
  {
    id: "seasonal-holiday",
    name: "Holiday Gift Guide",
    description: "Leverage holiday shopping season",
    category: "seasonal",
    channel: "email",
    subject: "The perfect gift is just a share away 🎁",
    message: "Hi {{name}},\n\nThe holidays are here, and your friends are looking for the perfect gift. Why not help them discover {{businessName}}?\n\nShare your referral link and you'll both win:\n• They get {{newUserReward}} off their order\n• You earn {{clientReward}} when they purchase\n\nYour link: {{referral_link}}\n\nSpread joy (and rewards) this season!",
    tone: "enthusiastic",
    bestFor: ["November-December campaigns", "Gift-based businesses", "Holiday promotions"],
    tags: ["holiday", "seasonal", "gifts"],
  },
  {
    id: "seasonal-new-year",
    name: "New Year, New Rewards",
    description: "Capitalize on New Year motivation",
    category: "seasonal",
    channel: "both",
    subject: "Start 2025 with instant rewards",
    message: "Happy New Year, {{name}}!\n\nNew year, new goals, new rewards. Make 2025 your most profitable year yet by sharing {{businessName}} with your network.\n\nEarn {{clientReward}} for every referral that {{offer}}. No limits, no caps.\n\nStart now: {{referral_link}}\n\nLet's make this year count!",
    tone: "enthusiastic",
    bestFor: ["January campaigns", "Goal-oriented messaging", "Fresh start promotions"],
    tags: ["new year", "goals", "motivation"],
  },

  // Milestone Templates
  {
    id: "milestone-first-referral",
    name: "First Referral Celebration",
    description: "Celebrate and encourage after first successful referral",
    category: "milestone",
    channel: "both",
    subject: "You just earned your first reward! 🎉",
    message: "Congrats {{name}}!\n\nYou just earned {{clientReward}} from your first referral! That was easy, wasn't it?\n\nImagine if 5 more friends signed up this month. That's ${{estimatedEarnings}} in your pocket.\n\nKeep the momentum going: {{referral_link}}\n\nYou're just getting started!",
    tone: "enthusiastic",
    bestFor: ["Post-first-conversion", "Momentum building", "Engagement boost"],
    tags: ["milestone", "first referral", "celebration"],
  },
  {
    id: "milestone-top-performer",
    name: "Top Performer Recognition",
    description: "Recognize and motivate top ambassadors",
    category: "milestone",
    channel: "email",
    subject: "You're in the top 10% of {{businessName}} ambassadors!",
    message: "{{name}}, you're crushing it!\n\nYou're officially in the top 10% of all {{businessName}} ambassadors. You've referred {{referralCount}} people and earned ${{credits}} so far.\n\nWant to aim for #1? Keep sharing: {{referral_link}}\n\nTop performers get exclusive perks, early access to new products, and special recognition. Keep up the amazing work!",
    tone: "professional",
    bestFor: ["High performers", "Competitive messaging", "Recognition campaigns"],
    tags: ["recognition", "top performer", "achievement"],
  },

  // Appreciation Templates
  {
    id: "thank-you-simple",
    name: "Simple Thank You",
    description: "Show gratitude to active ambassadors",
    category: "appreciation",
    channel: "both",
    subject: "Thank you for being amazing",
    message: "{{name}}, just wanted to say thank you.\n\nYou've shared {{businessName}} with {{referralCount}} people, and that means the world to us. You're not just an ambassador - you're part of our growth story.\n\nKeep doing what you're doing: {{referral_link}}\n\nWe appreciate you!",
    tone: "friendly",
    bestFor: ["Retention campaigns", "Relationship building", "Ambassador appreciation"],
    tags: ["thank you", "appreciation", "gratitude"],
  },

  // Urgency Templates
  {
    id: "urgency-limited-time",
    name: "Limited Time Bonus",
    description: "Create urgency with time-sensitive offer",
    category: "urgency",
    channel: "both",
    subject: "LAST CHANCE: Double rewards this weekend only",
    message: "{{name}}, this is it!\n\nThis weekend ONLY, we're DOUBLING all referral rewards. That means you'll earn {{doubleReward}} instead of {{clientReward}} for every friend who {{offer}}.\n\nOffer ends Sunday at midnight.\n\nShare now: {{referral_link}}\n\nDon't let this opportunity slip away!",
    tone: "urgent",
    bestFor: ["Flash campaigns", "End-of-month pushes", "Special promotions"],
    tags: ["urgent", "limited time", "bonus"],
  },
  {
    id: "urgency-almost-expired",
    name: "Credits Expiring Soon",
    description: "Alert ambassadors about expiring credits",
    category: "urgency",
    channel: "sms",
    message: "URGENT {{name}}: You have ${{credits}} expiring in 7 days! Use them now or share your link to earn more: {{referral_link}}",
    tone: "urgent",
    bestFor: ["Credit expiration warnings", "Urgency-driven action", "Policy reminders"],
    tags: ["expiration", "urgent", "credits"],
  },

  // Simple & Professional
  {
    id: "professional-simple",
    name: "Professional & Direct",
    description: "Clean, professional message for B2B or formal contexts",
    category: "launch",
    channel: "email",
    subject: "Your {{businessName}} referral program access",
    message: "Hello {{name}},\n\nYour referral program account is now active. You'll receive {{clientReward}} for each qualified referral that {{offer}}.\n\nYour unique referral link:\n{{referral_link}}\n\nReferrals are tracked automatically. You can view your earnings and redemption options in your account dashboard.\n\nBest regards,\nThe {{businessName}} Team",
    tone: "professional",
    bestFor: ["B2B programs", "Professional services", "Formal communications"],
    tags: ["professional", "formal", "B2B"],
  },

  // Social Sharing Focused
  {
    id: "social-optimized",
    name: "Social Media Optimized",
    description: "Short, shareable message perfect for social platforms",
    category: "launch",
    channel: "sms",
    message: "🔥 {{name}}! Share this link with friends and earn {{clientReward}} every time: {{referral_link}}\n\nThey save, you earn. Win-win! 🎯",
    tone: "casual",
    bestFor: ["Social media campaigns", "Viral potential", "Young audiences"],
    tags: ["social", "shareable", "viral"],
  },

  // Educational
  {
    id: "educational-how-it-works",
    name: "How It Works Guide",
    description: "Educate ambassadors on program mechanics",
    category: "launch",
    channel: "email",
    subject: "How to maximize your {{businessName}} referrals",
    message: "Hi {{name}},\n\nHere's exactly how to turn your network into cash:\n\n1. Share your unique link: {{referral_link}}\n2. Your friend gets {{newUserReward}} on their first purchase\n3. You earn {{clientReward}} when they {{offer}}\n4. Repeat (there's no limit!)\n\nPro tips:\n• Share on social media for maximum reach\n• Personal messages convert better than posts\n• Follow up with friends who clicked but haven't purchased\n\nCurrent balance: ${{credits}}\n\nQuestions? Reply to this email.\n\nHappy referring!",
    tone: "friendly",
    bestFor: ["Onboarding sequences", "Educational campaigns", "Program explanation"],
    tags: ["educational", "how-to", "guide"],
  },
];

export function getTemplatesByCategory(category: CampaignTemplate["category"]) {
  return campaignTemplates.filter((t) => t.category === category);
}

export function getTemplatesByChannel(channel: "sms" | "email") {
  return campaignTemplates.filter((t) => t.channel === channel || t.channel === "both");
}

export function getTemplateById(id: string) {
  return campaignTemplates.find((t) => t.id === id);
}

export function fillTemplateVariables(
  template: string,
  variables: Record<string, string | number>
): string {
  let filled = template;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    filled = filled.replace(regex, String(value));
  });
  return filled;
}
