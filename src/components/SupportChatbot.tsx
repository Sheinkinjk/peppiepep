'use client';

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type ChatRole = "assistant" | "user";

interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey! I'm the Pepform concierge. Curious about fees, referral code limits, or how we run VIP campaigns? Ask anything and I’ll map out the plan or line up a demo for you.",
};

const SUGGESTIONS = [
  "What are your fees and SMS costs?",
  "How many referral codes can we generate?",
  "How do approvals + payouts work?",
  "Can we book a concierge demo?",
];

const buildId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
};

export function SupportChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const latestMessagesRef = useRef(messages);
  latestMessagesRef.current = messages;

  useEffect(() => {
    if (!isOpen) return;
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: buildId(),
      role: "user",
      content: trimmed,
    };

    const updatedHistory = [...latestMessagesRef.current, userMessage];
    setMessages(updatedHistory);
    setInput("");
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory.map(({ role, content }) => ({ role, content })) }),
      });

      if (!response.ok) {
        throw new Error(`Chat API returned ${response.status}`);
      }

      const data = (await response.json()) as { reply?: string };
      const reply = data.reply?.trim();
      if (!reply) {
        throw new Error("Assistant did not return a reply.");
      }

      const assistantMessage: ChatMessage = {
        id: buildId(),
        role: "assistant",
        content: reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (apiError) {
      console.error("Failed to send chat message:", apiError);
      setError("We couldn't reach the AI concierge. Please try again in a few seconds.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendMessage(input);
  };

  const handleSuggestion = (suggestion: string) => {
    if (isSending) return;
    setInput(suggestion);
    setTimeout(() => {
      void sendMessage(suggestion);
    }, 50);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          buttonVariants({ variant: "cta" }),
          "fixed bottom-5 right-4 z-40 text-white shadow-2xl shadow-teal-200/70",
          isOpen && "translate-y-1 opacity-90",
        )}
        aria-expanded={isOpen}
        aria-controls="pepform-chatbot-panel"
        aria-label={isOpen ? "Hide Pepform concierge chat" : "Open Pepform concierge chat"}
      >
        <MessageCircle className="h-5 w-5 text-[#013136]" />
        <span className="hidden sm:inline font-bold">Speak with us</span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          id="pepform-chatbot-panel"
          className="fixed bottom-24 right-4 z-50 w-[92vw] max-w-md rounded-3xl border border-white/50 bg-white/95 p-4 shadow-2xl shadow-[#003c41]/20 backdrop-blur-xl sm:bottom-28"
          role="dialog"
          aria-label="Pepform chatbot dialog"
        >
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#002d32] to-[#04606b] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Pepform Concierge (Beta)</p>
                <p className="text-xs text-white/80">Ask anything. I respond in seconds.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/80 transition hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex h-72 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60">
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm text-slate-800">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-gradient-to-r from-[#00a6b4] to-[#19d3c5] text-white"
                        : "bg-white text-slate-900 border border-white/60",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#00a6b4]">
                        <Sparkles className="h-3.5 w-3.5" />
                        Concierge
                      </div>
                    )}
                    <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#03626e] w-max">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Typing…
                </div>
              )}
              <div ref={listRef} />
            </div>

            {error && (
              <div className="border-t border-rose-100 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600">
                {error}
              </div>
            )}

            {messages.length <= 3 && (
              <div className="border-t border-slate-200 bg-white/80 px-4 py-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ask me:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestion(suggestion)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-[#00a6b4] hover:text-[#00a6b4]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="e.g., Can you walk me through rewards + payouts?"
              className="h-16 flex-1 resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-[#00a6b4] focus:outline-none focus:ring-2 focus:ring-[#00a6b4]/40"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00a6b4] to-[#00d2be] text-white shadow-lg shadow-[#00a6b4]/30 transition hover:translate-y-[-2px] disabled:opacity-60"
              aria-label="Send message"
            >
              {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>

        <p className="mt-2 text-center text-xs text-slate-500">
          I use AI to suggest strategies. For hands-on onboarding, tap “Start Getting Referrals” or book a concierge demo call.
        </p>
      </div>
    )}
  </>
);
}
