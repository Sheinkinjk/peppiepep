import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

import { checkRateLimit } from "@/lib/rate-limit";
import { createApiLogger } from "@/lib/api-logger";
import { parseJsonBody } from "@/lib/api-validation";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const systemPrompt = `You are the Refer Labs assistant, answering questions from businesses about working with Refer Labs.

Rewritten 16 Sep 2026. This prompt previously described a market-expansion agency: a 90-Day Pilot, ongoing retainers, outbound sequences, and target numbers such as "10-20 qualified prospect conversations" and "3-8 distribution partner opportunities". That business is retired, and those figures were outcome claims for a service that no longer exists. Do not reintroduce any of it.

What Refer Labs is:
- An independent Australian comparison publisher. We write comparisons for Australian readers using published provider pricing and terms.
- Pages carry disclosed affiliate links. We may earn a commission when a reader signs up or buys through one, at no extra cost to them.
- Rankings are never sold. A business cannot pay for a position, to be added to a comparison, or to have a criticism removed. Say this plainly whenever someone asks about placement, and never imply otherwise.

What we offer businesses, per referlabs.com.au/for-business:
1. Get featured: put your product in front of people who are actively choosing.
2. Lead generation: qualified enquiries rather than anonymous clicks.
3. Referral and affiliate programs, built and run.

How to answer:
- Be specific about the three things above and honest about the limits. If you do not know something, say so and point to a person.
- Never quote performance numbers, conversion rates, lead volumes or timelines. We publish none, and inventing them would be a misleading representation under Australian Consumer Law.
- Editorial independence is not negotiable. If someone asks to buy a ranking or a better review, tell them we do not sell those.
- Send buying intent to jarred@referlabs.com.au or referlabs.com.au/for-business.
- Keep replies under ~200 words, in short paragraphs or light bullets.
- Consumer questions about a product we compare should be pointed at the relevant guide rather than answered with a recommendation.`;

function buildFallbackReply(latestUserMessage?: string) {
  const normalized = latestUserMessage?.toLowerCase() ?? "";
  const sections: string[] = [];

  if (latestUserMessage?.trim()) {
    sections.push(`Thanks for asking about "${latestUserMessage.trim().slice(0, 160)}".`);
  }

  if (/(rank|ranking|position|placement|top|best|review|remove)/i.test(normalized)) {
    sections.push(
      "• Rankings are never sold. You cannot pay for a position, to be added to a comparison, or to have a criticism removed. We correct factual errors on request, but we decide what a page says.",
    );
  }

  if (/(feature|listed|listing|compare|comparison|include)/i.test(normalized)) {
    sections.push(
      "• Getting featured: we put products in front of Australians who are actively choosing, using your published pricing and terms. Email jarred@referlabs.com.au with the subject \"Get featured enquiry\".",
    );
  }

  if (/(lead|enquir|inquir|customer|traffic|click)/i.test(normalized)) {
    sections.push(
      "• Lead generation: qualified enquiries rather than anonymous clicks. Email jarred@referlabs.com.au with the subject \"Lead generation enquiry\".",
    );
  }

  if (/(affiliate|referral|commission|program|partner)/i.test(normalized)) {
    sections.push(
      "• Referral and affiliate programs, built and run. Email jarred@referlabs.com.au with the subject \"Growth services enquiry\".",
    );
  }

  if (/(fee|price|cost|pricing|plan|quote)/i.test(normalized)) {
    sections.push(
      "• Pricing is agreed in writing for each piece of work, so there is no rate card to quote here. Tell us what you are after and we will price it.",
    );
  }

  if (sections.length <= 1) {
    sections.push(
      "Refer Labs is an independent Australian comparison publisher. Businesses work with us three ways: getting featured, lead generation, and having a referral or affiliate program built and run. Rankings are never sold.",
    );
  }

  sections.push("More at referlabs.com.au/for-business, or email jarred@referlabs.com.au.");

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
