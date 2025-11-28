'use client';

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface CSVUploadFormProps {
  uploadAction: (formData: FormData) => Promise<{ error?: string; success?: string }>;
}

export function CSVUploadForm({ uploadAction }: CSVUploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        setFileName("");
      } else if (result.error) {
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: result.error,
        });
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-bold text-slate-900">
          Upload CSV or Excel
        </Label>
        <p className="text-sm text-slate-600">
          Include columns for name, phone, and email (optional). We automatically create referral links for each row.
        </p>
      </div>

      <input
        ref={fileInputRef}
        id="file"
        type="file"
        name="file"
        accept=".csv,.xlsx,.xls"
        required
        disabled={isUploading}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="font-bold"
        >
          <Upload className="mr-2 h-4 w-4" />
          Choose File
        </Button>
        <Input
          readOnly
          value={fileName || "No file selected"}
          className="bg-slate-100 text-slate-600"
        />
        <Button type="submit" disabled={isUploading} className="font-bold">
          {isUploading ? "Uploading..." : "Upload & Generate Links"}
        </Button>
      </div>
      <p className="text-xs text-slate-500">
        Supported formats: CSV (.csv), Excel (.xlsx, .xls)
      </p>
    </form>
  );
}
