'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ReferralCompletionFormProps {
  referralId: string;
  ambassadorId: string;
  completionAction: (formData: FormData) => Promise<{ error?: string; success?: string }>;
}

export function ReferralCompletionForm({
  referralId,
  ambassadorId,
  completionAction
}: ReferralCompletionFormProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCompleting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await completionAction(formData);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Failed to Complete Referral',
          description: result.error,
        });
      } else if (result.success) {
        toast({
          title: 'Referral Completed!',
          description: result.success,
        });
      }
    } catch (error) {
      console.error('Completion error:', error);
      toast({
        variant: 'destructive',
        title: 'Failed to Complete Referral',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsCompleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="referral_id" value={referralId} />
      <input type="hidden" name="ambassador_id" value={ambassadorId} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        disabled={isCompleting}
      >
        {isCompleting ? 'Processing...' : 'Mark completed'}
      </Button>
    </form>
  );
}
