import { NextResponse } from "next/server";
import { z } from "zod";
import { sendAdminNotification, buildChatbotLeadEmail } from "@/lib/email-notifications";

const leadSchema = z.object({
  firstName: z.string().min(1),
  email: z.string().email(),
  timestamp: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid lead data" },
        { status: 400 }
      );
    }

    const { firstName, email, timestamp } = parsed.data;

    // Send admin notification about chatbot conversation
    await sendAdminNotification({
      subject: `💬 New chatbot conversation: ${firstName} (${email})`,
      html: buildChatbotLeadEmail({
        firstName,
        email,
        firstMessage: "(User started conversation)",
        timestamp,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chatbot lead capture error:", error);
    // Don't fail - this is non-critical
    return NextResponse.json({ success: true });
  }
}
