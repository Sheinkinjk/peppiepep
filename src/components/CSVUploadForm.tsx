'use client';

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, Download } from "lucide-react";

export function CSVUploadForm() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    setIsUploading(true);

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "Please choose a CSV or Excel file before uploading.",
      });
      setStatus({
        type: "error",
        message: "Select a CSV or Excel file before uploading.",
      });
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/customers/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok || result?.error) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: result?.error || "Unable to import customers. Please try again.",
        });
        setStatus({
          type: "error",
          message: result?.error || "Unable to import customers. Please try again.",
        });
        return;
      }

      toast({
        title: "Upload complete",
        description: result.success,
      });
      setStatus({ type: "success", message: result.success });
      formElement.reset();
      setFileName("");
      router.refresh();
    } catch (error) {
      console.error("Upload error:", error);
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: message,
      });
      setStatus({
        type: "error",
        message,
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
        <Button
          type="button"
          variant="ghost"
          className="w-full sm:w-auto gap-2 text-slate-700"
          asChild
        >
          <a href="/customer-upload-template.csv" download>
            <Download className="h-4 w-4" />
            Download template CSV
          </a>
        </Button>
      </div>

      <input
        ref={fileInputRef}
        id="file"
        type="file"
        name="file"
        accept=".csv,.xlsx,.xls"
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
        Supported formats: CSV (.csv), Excel (.xlsx, .xls). Every new contact automatically receives a referral link and a reusable discount code you can sync to Shopify or your checkout form.
      </p>
      {status && (
        <div
          className={`rounded-2xl border px-3 py-2 text-xs ${
            status.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  );
}
