'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bot, Send, Sparkles, X } from 'lucide-react';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

interface OnboardingData {
  businessName: string;
  businessType: string;
  avgTransaction: number;
  rewardAmount: number;
  offerText: string;
}

interface AIChatbotOnboardingProps {
  onComplete?: (data: OnboardingData) => void;
  onClose?: () => void;
}

export default function AIChatbotOnboarding({ onComplete, onClose }: AIChatbotOnboardingProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      content: "G'day! I'm your AI assistant. I'll help you set up your referral program in just a few minutes. What's your business name?",
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const steps = [
    {
      field: 'businessName',
      question: "G'day! I'm your AI assistant. I'll help you set up your referral program in just a few minutes. What's your business name?",
      validate: (value: string) => value.length > 0,
    },
    {
      field: 'businessType',
      question: "Awesome! What type of business is {businessName}? (e.g., beauty salon, fitness studio, cafe, retail store)",
      validate: (value: string) => value.length > 0,
    },
    {
      field: 'avgTransaction',
      question: "Perfect! What's your average transaction value in AUD? (Just the number, like 120)",
      validate: (value: string) => !isNaN(Number(value)) && Number(value) > 0,
      transform: (value: string) => Number(value),
    },
    {
      field: 'rewardAmount',
      question: "Great! How much do you want to reward ambassadors per successful referral? (Typically 10-20% of transaction value)",
      validate: (value: string) => !isNaN(Number(value)) && Number(value) > 0,
      transform: (value: string) => Number(value),
    },
    {
      field: 'offerText',
      question: "Almost done! What offer do you want to give to referred customers? (e.g., '20% off first visit', '$50 credit')",
      validate: (value: string) => value.length > 0,
    },
  ];

  const addAIMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', content }]);
      setIsTyping(false);
    }, 500);
  };

  const handleSend = () => {
    if (!currentInput.trim()) return;

    const currentStep = steps[step];
    if (!currentStep.validate(currentInput)) {
      addAIMessage("Hmm, that doesn't look quite right. Can you try again?");
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: currentInput }]);

    // Save data
    const fieldValue = currentStep.transform ? currentStep.transform(currentInput) : currentInput;
    const updatedData = { ...onboardingData, [currentStep.field]: fieldValue };
    setOnboardingData(updatedData);

    setCurrentInput('');

    // Move to next step or complete
    if (step < steps.length - 1) {
      const nextStep = steps[step + 1];
      const questionWithData = nextStep.question.replace(
        /{(\w+)}/g,
        (_, key) => (updatedData as any)[key] || ''
      );
      addAIMessage(questionWithData);
      setStep(step + 1);
    } else {
      // Complete onboarding
      addAIMessage(
        `🎉 Perfect! I've set up your referral program for ${updatedData.businessName}!\n\n` +
          `Here's what we configured:\n` +
          `• Business: ${updatedData.businessName} (${updatedData.businessType})\n` +
          `• Average transaction: $${updatedData.avgTransaction} AUD\n` +
          `• Ambassador reward: $${updatedData.rewardAmount} per referral\n` +
          `• Customer offer: ${updatedData.offerText}\n\n` +
          `Ready to launch your campaign?`
      );
      setTimeout(() => {
        if (onComplete) {
          onComplete(updatedData as OnboardingData);
        }
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Setup Assistant</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Powered by GPT-4
              </p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-900'
                }`}
              >
                {message.role === 'ai' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-purple-600" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer..."
              className="flex-1"
              disabled={isTyping || step >= steps.length}
            />
            <Button
              onClick={handleSend}
              disabled={isTyping || step >= steps.length || !currentInput.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Step {Math.min(step + 1, steps.length)} of {steps.length} • Press Enter to send
          </p>
        </div>
      </Card>
    </div>
  );
}
