"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Customer = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  referral_code: string | null;
  credits: number | null;
  status: string | null;
};

type CustomersTableProps = {
  customers: Customer[];
  siteUrl: string;
};

export function CustomersTable({ customers, siteUrl }: CustomersTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, customerId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(customerId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Referral Link</TableHead>
            <TableHead className="text-right">Credits</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                No customers yet. Upload a CSV to get started!
              </TableCell>
            </TableRow>
          )}
          {customers.map((customer) => {
            const referralLink = customer.referral_code
              ? `${siteUrl}/r/${customer.referral_code}`
              : null;
            const isCopied = copiedId === customer.id;

            return (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name ?? "—"}</TableCell>
                <TableCell className="text-slate-600">{customer.phone ?? "—"}</TableCell>
                <TableCell className="text-slate-600">{customer.email ?? "—"}</TableCell>
                <TableCell className="max-w-[280px]">
                  {referralLink ? (
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-mono text-blue-600">
                        {referralLink}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  <span className={customer.credits && customer.credits > 0 ? "text-emerald-600" : ""}>
                    ${customer.credits ?? 0}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    customer.status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-800"
                  }`}>
                    {customer.status ?? "active"}
                  </span>
                </TableCell>
                <TableCell>
                  {referralLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(referralLink, customer.id)}
                      className="w-full"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
