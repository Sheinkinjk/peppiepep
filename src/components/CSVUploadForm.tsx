'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface CSVUploadFormProps {
  uploadAction: (formData: FormData) => Promise<{ error?: string; success?: string }>;
}

export function CSVUploadForm({ uploadAction }: CSVUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await uploadAction(formData);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Upload Failed',
          description: result.error,
        });
      } else if (result.success) {
        toast({
          title: 'Success!',
          description: result.success,
        });
        // Reset form
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file">
          Upload CSV or Excel (columns: name, phone, email optional)
        </Label>
        <Input
          id="file"
          type="file"
          name="file"
          accept=".csv,.xlsx,.xls"
          required
          disabled={isUploading}
        />
        <p className="text-xs text-slate-500 mt-1">
          Supported formats: CSV (.csv), Excel (.xlsx, .xls)
        </p>
      </div>
      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload & Generate Links'}
      </Button>
    </form>
  );
}
