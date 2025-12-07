import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const systemPrompt = `You are Pepform's referral concierge—an in-depth chat guide that makes luxury service brands feel confident about launching referral programs.

Pepform essentials:
- Pricing: Base plan $499/mo (50 referrers, 5,000 SMS credits), Scale $599/mo (125 referrers, 12,500 credits, concierge branding), Enterprise is custom with unlimited referrers/messages. Prices are waived during the current testing period.
- Every contact imported (CSV, CRM export, manual add) automatically receives a unique referral code + Tiffany-inspired referral lounge, so you can generate as many codes as you have contacts, with no extra fee.
- The platform handles SMS + email concierge flows, wallet-ready perks, approvals/payouts, dashboards, and integrations.
- SMS overages cost $0.05 per send; additional ambassadors require upgrading plans or Enterprise pooling.

Mission:
- Answer anything users ask (fees, referral codes, integrations, ROI, onboarding timelines) with confident, specific guidance rooted in the details above. If you don't have an answer, say so plainly and describe how to learn it.
- Clarify vague prompts with follow-up questions so your response stays relevant. Summaries should reflect the user's exact scenario (industry, channel, volume) whenever mentioned.
- When visitors show buying intent, steer them to either press "Start Getting Referrals" or book a concierge demo at https://calendly.com/jarredkrowitz/30min. Mention both options in replies where it makes sense.
- Keep replies under ~220 words, formatted with short paragraphs or lightweight bullets, and maintain a premium-but-warm tone.
- If a question is unrelated, offer a succinct helpful response and then show how Pepform still supports their growth goals. Never refuse harmless info.`;

function buildFallbackReply(latestUserMessage?: string) {
  const normalized = latestUserMessage?.toLowerCase() ?? "";
  const sections: string[] = [];

  if (latestUserMessage?.trim()) {
    sections.push(
      `Thanks for the question about "${latestUserMessage.trim().slice(0, 160)}". Here’s how Pepform approaches it:`,
    );
  } else {
    sections.push("Happy to help you map out Pepform's concierge referral engine:");
  }

  if (/(fee|price|cost|pricing|plan)/i.test(normalized)) {
    sections.push(
      "• Pricing: Base is $499/mo (50 referrers, 5k SMS credits) and Scale is $599/mo (125 referrers, 12.5k credits, concierge branding). Enterprise unlocks unlimited ambassadors/messages with pooled pricing, and pricing is currently waived during testing.",
    );
  }

  if (/(code|referral code|link)/i.test(normalized)) {
    sections.push(
      "• Referral codes: every contact you import—CSV, CRM export, or manual add—automatically receives a unique referral code plus a Tiffany-inspired referral lounge. There’s no ceiling, so you can issue as many codes as your CRM holds.",
    );
  }

  if (/(sms|text|message|whatsapp|credits)/i.test(normalized)) {
    sections.push(
      "• Messaging: Base includes 5,000 SMS/WhatsApp credits monthly, Scale bumps that to 12,500, and additional sends are $0.05. Automated concierge flows handle launches, reminders, and perk unlocks.",
    );
  }

  if (/(payout|reward|approval|credit ledger|payments)/i.test(normalized)) {
    sections.push(
      "• Approvals & payouts: conversions sync into the dashboard so you can approve rewards, reload credits, and trigger ambassador notifications in minutes—no spreadsheets required.",
    );
  }

  if (/(integration|crm|import|sync)/i.test(normalized)) {
    sections.push(
      "• Integrations: upload spreadsheets, sync CRM exports, or use our API/webhooks. Pepform issues links, discount words, and wallet-ready perks automatically on import.",
    );
  }

  if (/(demo|call|speak|meeting|talk)/i.test(normalized)) {
    sections.push(
      "Happy to line up a concierge walkthrough—book a slot anytime: https://calendly.com/jarredkrowitz/30min.",
    );
  }

  if (sections.length === 1) {
    sections.push(
      "Pepform automates concierge-level referral journeys end-to-end: ambassador onboarding, campaign messaging, Tiffany-inspired lounges, analytics, and payouts live in one workspace.",
    );
  }

  sections.push(
    'Ready to experience it? Tap "Start Getting Referrals" to activate your workspace or grab a white-glove demo slot: https://calendly.com/jarredkrowitz/30min.',
  );

  return sections.join("\n\n");
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]).optional(),
  content: z.string(),
});

const chatbotPayloadSchema = z.object({
  messages: z.array(chatMessageSchema).optional(),
});

export async function POST(request: Request) {
  const logger = createApiLogger("api:chatbot");
  logger.info("Received chatbot request");
  const rateLimitCheck = await checkRateLimit(request, "supportChat");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Chatbot rate limited");
    return rateLimitCheck.response;
  }

  const parsedPayload = await parseJsonBody(request, chatbotPayloadSchema, logger, {
    errorMessage: "Invalid JSON payload",
  });

  if (!parsedPayload.success) {
    return parsedPayload.response;
  }

  const body = parsedPayload.data;
  const sanitizedMessages = Array.isArray(body.messages)
    ? body.messages
        .map((message) => {
          if (!message || typeof message.content !== "string") return null;
          const trimmed = message.content.trim();
          if (!trimmed) return null;
          const role: ChatMessage["role"] =
            message.role === "assistant" ? "assistant" : "user";
          return { role, content: trimmed.slice(0, 2000) };
        })
        .filter((message): message is ChatMessage => Boolean(message))
        .slice(-12)
    : [];

  if (sanitizedMessages.length === 0) {
    logger.warn("Chatbot request missing messages");
    return NextResponse.json(
      { error: "Please include at least one user message." },
      { status: 400 },
    );
  }

  const latestUserMessage = [...sanitizedMessages]
    .reverse()
    .find((message) => message.role === "user")?.content;

  if (!openai) {
    logger.warn("Chatbot fallback used (missing OpenAI key)");
    return NextResponse.json({
      reply: buildFallbackReply(latestUserMessage),
      model: "offline-fallback",
      notice: "OpenAI API key missing. Returning canned assistant response.",
    });
  }

  try {
    logger.info("Dispatching chatbot completion", {
      messageCount: sanitizedMessages.length,
    });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 500,
      messages: [
        { role: "system", content: systemPrompt },
        ...sanitizedMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      ],
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      throw new Error("No reply generated by OpenAI");
    }

    const responsePayload = {
      reply,
      model: completion.model,
    };
    logger.info("Chatbot reply ready", { model: completion.model });
    return NextResponse.json(responsePayload);
  } catch (error) {
    logger.error("Chatbot API error", { error });
    return NextResponse.json(
      {
        reply: buildFallbackReply(latestUserMessage),
        model: "fallback-template",
        notice: "Chatbot temporarily unavailable. Served fallback answer.",
      },
      { status: 200 },
    );
  }
}
