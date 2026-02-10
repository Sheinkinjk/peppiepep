import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const systemPrompt = `You are the Refer Labs assistant - a knowledgeable chat guide that helps overseas companies understand how Refer Labs can be their Australian sales and partnerships arm.

Refer Labs essentials:
- We are a services business (not a SaaS product). We act as your on-the-ground sales rep, partnership builder, and distribution channel manager in Australia.
- Three core services: (1) Direct Customer Acquisition - outbound, introductions, pipeline, deal support; (2) Partnerships & Distribution - agencies, platforms, channel partners; (3) Referral & Affiliate Channel Management - recruitment, enablement, attribution, optimisation.
- Engagement models: 90-Day Pilot (fixed monthly fee + success fee, recommended starting point), Ongoing Retainer (6-month minimum, lower success fee), or Intro-Only (fixed fee per introduction, lighter touch).
- Target clients: overseas B2B SaaS, fintech, marketplace, and subscription businesses entering Australia.
- Typical 90-day pilot targets: 10-20 qualified prospect conversations, 3-8 distribution partner opportunities, 5-15 sales conversations.
- We do not require exclusivity or equity.

Mission:
- Answer questions about our services, pricing structure, engagement models, timelines, and how we work with confidence and specificity.
- Clarify vague prompts with follow-up questions so your response stays relevant to the visitor's situation.
- When visitors show buying intent, guide them to book a 15-minute expansion call at https://calendly.com/jarred-referlabs/30min.
- Keep replies under ~220 words, formatted with short paragraphs or lightweight bullets, and maintain a premium-but-warm tone.
- If a question is unrelated, offer a succinct helpful response and then explain how Refer Labs can support their Australia growth goals. Never refuse harmless info.`;

function buildFallbackReply(latestUserMessage?: string) {
  const normalized = latestUserMessage?.toLowerCase() ?? "";
  const sections: string[] = [];

  if (latestUserMessage?.trim()) {
    sections.push(
      `Thanks for your question about "${latestUserMessage.trim().slice(0, 160)}". Here's how Refer Labs can help:`,
    );
  } else {
    sections.push("Happy to help you learn about Refer Labs - your Australian sales and partnerships arm:");
  }

  if (/(fee|price|cost|pricing|plan)/i.test(normalized)) {
    sections.push(
      "• Engagement models: We offer a 90-Day Pilot (fixed monthly fee + success fee on closed revenue or partner wins), an Ongoing Retainer (6-month minimum with lower success fee), or an Intro-Only option (fixed fee per introduction). Pricing is scoped during our initial call based on your target market and channels.",
    );
  }

  if (/(partner|channel|distribution|agency)/i.test(normalized)) {
    sections.push(
      "• Partnerships & Distribution: We identify, recruit, and manage agency partners, platform integrations, and channel partners across Australia. Our 90-day pilot typically delivers 3-8 qualified distribution partner opportunities.",
    );
  }

  if (/(affiliate|referral|commission)/i.test(normalized)) {
    sections.push(
      "• Affiliate & Referral Channels: We recruit affiliate partners, manage onboarding, set up attribution tracking, and optimise performance monthly. Expect 10-15 active affiliate partners within the first 90 days.",
    );
  }

  if (/(sales|customer|outbound|pipeline|prospect)/i.test(normalized)) {
    sections.push(
      "• Customer Acquisition: We run outbound sequences, book and attend introductory meetings, and provide closing support on key opportunities. Typical pilot targets: 10-20 qualified prospect conversations and 5-15 sales conversations.",
    );
  }

  if (/(pilot|90.day|timeline|start|begin)/i.test(normalized)) {
    sections.push(
      "• 90-Day Pilot structure: Week 1 - ICP and messaging alignment. Weeks 2-3 - target list build. Weeks 4-12 - outreach, introductions, meetings, and closing support. You receive weekly reporting throughout.",
    );
  }

  if (/(demo|call|speak|meeting|talk|book)/i.test(normalized)) {
    sections.push(
      "Happy to set up a quick call - book a 15-minute expansion call anytime: https://calendly.com/jarred-referlabs/30min.",
    );
  }

  if (sections.length === 1) {
    sections.push(
      "Refer Labs acts as your on-the-ground Australian sales rep and partnerships arm. We handle customer acquisition, partner distribution, and affiliate channel management - so you can enter Australia without hiring locally.",
    );
  }

  sections.push(
    "Ready to explore Australia? Book a 15-minute expansion call: https://calendly.com/jarred-referlabs/30min.",
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
