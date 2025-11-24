import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI (will use env var OPENAI_API_KEY)
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  if (!openai) {
    // Return mock responses if OpenAI is not configured
    return NextResponse.json({
      messages: [
        "Hey! I just hooked you up with an amazing deal at {business}. Get {offer} when you book. Trust me, you'll love it! 🌟",
        "Yo! You've gotta check out {business}. I got you {offer} - just use my link. They're incredible! 💯",
        "Guess what? I'm sending you {offer} at {business}! Click my link to claim it. You're welcome! 😊",
        "Friend! I want you to experience {business} with {offer}. It's seriously amazing. Book through my link! ✨",
        "{business} is the best! I got you {offer} so you can see for yourself. Don't miss out! 🎁",
      ],
      model: "mock-fallback",
    });
  }

  let body: {
    businessName?: string;
    businessType?: string;
    offerText?: string;
    tone?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const {
    businessName = "our business",
    businessType = "beauty salon",
    offerText = "20% off your first visit",
    tone = "friendly and casual",
  } = body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a marketing expert specializing in referral messaging for Australian businesses.
Generate 5 short, authentic SMS referral messages that real people would send to their friends.

Requirements:
- Keep messages under 160 characters
- Use Australian English and casual tone
- Make them feel personal, not corporate
- Include placeholders: {business}, {offer}
- Use Australian slang where appropriate (mate, legend, etc.)
- Make them exciting but not salesy
- Include relevant emojis (1-2 per message)
- Vary the style and energy of each message`,
        },
        {
          role: "user",
          content: `Generate 5 referral messages for:
Business: ${businessName}
Type: ${businessType}
Offer: ${offerText}
Tone: ${tone}

Return ONLY a JSON array of 5 strings, no other text.`,
        },
      ],
      temperature: 0.9,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content generated");
    }

    // Try to parse JSON response
    let messages: string[];
    try {
      messages = JSON.parse(content);
    } catch {
      // If not valid JSON, split by newlines and clean up
      messages = content
        .split("\n")
        .filter((line) => line.trim().length > 0 && !line.startsWith("```"))
        .map((line) => line.replace(/^\d+\.\s*/, "").replace(/^["']|["']$/g, "").trim())
        .filter((line) => line.length > 20)
        .slice(0, 5);
    }

    return NextResponse.json({
      messages,
      model: completion.model,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);

    // Fallback to template messages if API fails
    return NextResponse.json({
      messages: [
        `Hey mate! Just hooked you up with ${offerText} at ${businessName}. You'll love it! 🌟`,
        `Legend! I got you ${offerText} at ${businessName}. Trust me on this one! 💯`,
        `You've gotta try ${businessName}! I'm sending you ${offerText}. Use my link! ✨`,
        `Friend! ${businessName} is amazing. Enjoy ${offerText} on me! 😊`,
        `${businessName} is the best! Grabbed you ${offerText}. Don't miss out! 🎁`,
      ],
      model: "fallback-template",
      error: "API unavailable, using templates",
    });
  }
}
