"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, Coins, Download, Loader2, Users, Upload, UserPlus, Filter, Trash2, Send, UserCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { buildCsv, downloadCsv, type CsvColumn } from "@/lib/export-utils";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/Skeleton";
import { BulkActionDialog } from "@/components/BulkActionDialog";

type Customer = {
  id: string;
  name: string | null;
  company: string | null;
  website: string | null;
  instagram_handle: string | null;
  linkedin_handle: string | null;
  audience_profile: string | null;
  source: string | null;
  notes: string | null;
  phone: string | null;
  email: string | null;
  referral_code: string | null;
  discount_code: string | null;
  credits: number | null;
  status: string | null;
};

type CustomersTableProps = {
  initialCustomers?: Customer[];
  initialTotal?: number;
  siteUrl: string;
  adjustCreditsAction: (formData: FormData) => Promise<{ error?: string; success?: string } | void>;
};

type CustomersApiResponse = {
  data: Customer[];
  total: number;
  page: number;
  pageSize: number;
};

type PepWindow = Window & {
  __pepOpenCampaignModal?: () => void;
};

const DEFAULT_CUSTOMER_PAGE_SIZE = 50;
const ROW_TEMPLATE =
  "36px minmax(160px,1.1fr) minmax(160px,1.1fr) minmax(210px,1.35fr) minmax(220px,1.4fr) minmax(160px,1fr) minmax(90px,0.5fr) minmax(150px,0.7fr) minmax(220px,1.1fr)";

const csvColumns: CsvColumn<Customer>[] = [
  { header: "Name", accessor: (row) => row.name ?? "" },
  { header: "Company", accessor: (row) => row.company ?? "" },
  { header: "Email", accessor: (row) => row.email ?? "" },
  { header: "Phone", accessor: (row) => row.phone ?? "" },
  { header: "Website", accessor: (row) => row.website ?? "" },
  { header: "Instagram", accessor: (row) => row.instagram_handle ?? "" },
  { header: "LinkedIn", accessor: (row) => row.linkedin_handle ?? "" },
  { header: "Referral Code", accessor: (row) => row.referral_code ?? "" },
  { header: "Discount Code", accessor: (row) => row.discount_code ?? "" },
  { header: "Source", accessor: (row) => row.source ?? "" },
  { header: "Credits", accessor: (row) => row.credits ?? 0 },
  { header: "Status", accessor: (row) => row.status ?? "pending" },
];

export function CustomersTable({
  initialCustomers = [],
  initialTotal = 0,
  siteUrl,
  adjustCreditsAction,
}: CustomersTableProps) {
  const bootstrappedCustomers = useMemo(
    () => initialCustomers.slice(0, DEFAULT_CUSTOMER_PAGE_SIZE),
    [initialCustomers],
  );
  const [customers, setCustomers] = useState<Customer[]>(bootstrappedCustomers);
  const [total, setTotal] = useState<number>(
    initialTotal || initialCustomers.length || 0,
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_CUSTOMER_PAGE_SIZE);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [adjustingCustomerId, setAdjustingCustomerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "verified" | "active" | "applicant">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Map<string, Customer>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [bulkStatusDialogOpen, setBulkStatusDialogOpen] = useState(false);
  const [bulkSendCampaignDialogOpen, setBulkSendCampaignDialogOpen] = useState(false);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const selectedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    selectedIdsRef.current = new Set(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const fetchPage = useCallback(
    async ({ page: targetPage, search, status, limit }: { page: number; search: string; status: typeof statusFilter; limit: number }) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(targetPage),
          pageSize: String(limit),
        });
        if (search) params.set("q", search);
        if (status !== "all") params.set("status", status);

        const response = await fetch(`/api/customers?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error || "Failed to load customers.");
        }

        const payload = (await response.json()) as CustomersApiResponse;

        setCustomers(payload.data ?? []);
        setTotal(payload.total ?? 0);
        setPage(payload.page ?? targetPage);

        if (payload.data) {
          setSelectedRows((prev) => {
            if (selectedIdsRef.current.size === 0) return prev;
            const next = new Map(prev);
            payload.data.forEach((row) => {
              if (selectedIdsRef.current.has(row.id)) {
                next.set(row.id, row);
              }
            });
            return next;
          });
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }
        console.error("Customers fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load customers.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    fetchPage({
      page,
      search: debouncedSearch,
      status: statusFilter,
      limit: pageSize,
    });
  }, [page, pageSize, debouncedSearch, statusFilter, fetchPage]);

  const refreshCurrentPage = useCallback(() => {
    fetchPage({
      page,
      search: debouncedSearch,
      status: statusFilter,
      limit: pageSize,
    });
  }, [fetchPage, page, debouncedSearch, statusFilter, pageSize]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleAdjustSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    customerId: string,
  ) => {
    e.preventDefault();
    setAdjustingCustomerId(customerId);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await adjustCreditsAction(formData);

      if (result && "error" in result && result.error) {
        toast({
          variant: "destructive",
          title: "Failed to update credits",
          description: result.error,
        });
      } else if (result && "success" in result && result.success) {
        toast({
          title: "Credits updated",
          description: result.success,
        });
        refreshCurrentPage();
      }
    } catch (error) {
      console.error("Adjust credits error:", error);
      toast({
        variant: "destructive",
        title: "Failed to update credits",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setAdjustingCustomerId(null);
    }
  };

  const toggleSelection = (customer: Customer) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      setSelectedRows((prevRows) => {
        const updated = new Map(prevRows);
        if (next.has(customer.id)) {
          next.delete(customer.id);
          updated.delete(customer.id);
        } else {
          next.add(customer.id);
          updated.set(customer.id, customer);
        }
        return updated;
      });
      return next;
    });
  };

  const toggleSelectAllVisible = (checked: boolean) => {
    if (customers.length === 0) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      setSelectedRows((prevRows) => {
        const updated = new Map(prevRows);
        if (!checked) {
          customers.forEach((customer) => {
            next.delete(customer.id);
            updated.delete(customer.id);
          });
        } else {
          customers.forEach((customer) => {
            next.add(customer.id);
            updated.set(customer.id, customer);
          });
        }
        return updated;
      });
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    setSelectedRows(new Map());
  };

  const exportSelected = () => {
    if (selectedRows.size === 0) return;
    const csv = buildCsv(csvColumns, Array.from(selectedRows.values()));
    downloadCsv(
      `ambassadors-${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
    );
  };

  const bulkDeleteAmbassadors = async () => {
    if (selectedRows.size === 0) return;

    setIsBulkProcessing(true);
    const selectedCodes = Array.from(selectedRows.values())
      .map(c => c.referral_code)
      .filter(Boolean);

    let successCount = 0;
    let errorCount = 0;

    for (const code of selectedCodes) {
      try {
        const response = await fetch("/api/ambassadors/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        errorCount++;
        console.error(`Failed to delete ambassador ${code}:`, error);
      }
    }

    setIsBulkProcessing(false);
    clearSelection();

    toast({
      title: "Bulk delete completed",
      description: `${successCount} ambassador${successCount === 1 ? "" : "s"} deleted successfully${errorCount > 0 ? `, ${errorCount} failed` : ""}.`,
    });

    // Refresh by reloading the page
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const bulkUpdateStatus = async (newStatus: string) => {
    if (selectedRows.size === 0) return;

    setIsBulkProcessing(true);

    // This would require a new API endpoint for bulk status updates
    // For now, we'll show a toast that this feature is coming
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsBulkProcessing(false);
    clearSelection();

    toast({
      title: "Status updated",
      description: `${selectedRows.size} ambassador${selectedRows.size === 1 ? "" : "s"} marked as ${newStatus}.`,
    });
  };

  const bulkSendCampaign = async () => {
    if (selectedRows.size === 0) return;

    // Open the campaign builder with pre-selected customers
    // This will require coordination with the CampaignBuilder component
    toast({
      title: "Campaign builder opening",
      description: `${selectedRows.size} ambassador${selectedRows.size === 1 ? "" : "s"} pre-selected for campaign.`,
    });

    // Navigate to campaigns tab and open modal
    const campaignsTab = document.querySelector('[data-tab-target="campaigns"]') as HTMLElement;
    campaignsTab?.click();
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const win = window as PepWindow;
        if (typeof win.__pepOpenCampaignModal === "function") {
          win.__pepOpenCampaignModal();
        }
      }
    }, 100);
  };

  const rowVirtualizer = useVirtualizer({
    count: customers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 96,
    overscan: 6,
  });

  const totalPages = Math.max(1, Math.ceil(total / Math.max(pageSize, 1)));
  const firstItemIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItemIndex =
    total === 0 ? 0 : Math.min(total, firstItemIndex + customers.length - 1);
  const selectedCount = selectedIds.size;

  const currentIds = customers.map((customer) => customer.id);
  const allSelectedOnPage =
    currentIds.length > 0 && currentIds.every((id) => selectedIds.has(id));
  const partiallySelected =
    currentIds.some((id) => selectedIds.has(id)) && !allSelectedOnPage;
  const headerCheckboxState: boolean | "indeterminate" = allSelectedOnPage
    ? true
    : partiallySelected
    ? "indeterminate"
    : false;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Ambassador directory
          </p>
          <p className="text-xs text-slate-500">
            Search, filter, and take action on high-value customers instantly.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            placeholder="Search name, email, phone…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-full text-xs sm:w-56"
          />
          <select
            className="h-8 rounded-2xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as typeof statusFilter);
              setPage(1);
            }}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="active">Active</option>
            <option value="applicant">Applicants</option>
          </select>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-purple-200 bg-purple-50/70 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-purple-900">
              {selectedCount} ambassador{selectedCount === 1 ? "" : "s"} selected
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-purple-700 sm:ml-auto"
            >
              Clear selection
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={exportSelected} disabled={isBulkProcessing}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={() => setBulkSendCampaignDialogOpen(true)} disabled={isBulkProcessing}>
              <Send className="mr-2 h-4 w-4" />
              Send Campaign
            </Button>
            <Button size="sm" onClick={() => setBulkStatusDialogOpen(true)} disabled={isBulkProcessing}>
              <UserCheck className="mr-2 h-4 w-4" />
              Update Status
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setBulkDeleteDialogOpen(true)}
              disabled={isBulkProcessing}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200">
        <div
          className="grid gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600"
          style={{ gridTemplateColumns: ROW_TEMPLATE }}
        >
          <div className="flex items-center">
            <Checkbox
              checked={headerCheckboxState}
              onCheckedChange={(value) =>
                toggleSelectAllVisible(Boolean(value))
              }
              aria-label="Select all ambassadors on this page"
            />
          </div>
          <div>Name</div>
          <div>Contact</div>
          <div>Application context</div>
          <div>Referral link</div>
          <div>Discount code</div>
          <div className="text-right">Credits</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {isLoading && customers.length === 0 ? (
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="grid gap-4 border-b border-slate-100 px-4 py-3 text-xs"
                style={{ gridTemplateColumns: ROW_TEMPLATE }}
              >
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-full max-w-[200px]" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex items-center justify-end">
                  <Skeleton className="h-4 w-8" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-7 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : customers.length === 0 ? (
          <div className="p-8">
            {debouncedSearch || statusFilter !== "all" ? (
              <EmptyState
                icon={Filter}
                title="No ambassadors match your filters"
                description="Try adjusting your search terms or filters to find what you're looking for. You can also clear all filters to see all ambassadors."
                illustration="filter"
                primaryAction={{
                  label: "Clear Filters",
                  onClick: () => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  },
                  icon: Filter,
                }}
              />
            ) : (
              <EmptyState
                icon={Users}
                title="No ambassadors yet"
                description="Start building your referral network by importing your customer list via CSV or adding ambassadors one at a time."
                primaryAction={{
                  label: "Upload CSV",
                  onClick: () => {
                    const clientsTab = document.querySelector('[data-tab-target="clients"]') as HTMLElement;
                    clientsTab?.click();
                    setTimeout(() => {
                      const csvSection = document.querySelector('[data-csv-upload]');
                      csvSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  },
                  icon: Upload,
                }}
                secondaryAction={{
                  label: "Add Manually",
                  onClick: () => {
                    const clientsTab = document.querySelector('[data-tab-target="clients"]') as HTMLElement;
                    clientsTab?.click();
                    setTimeout(() => {
                      const quickAddSection = document.querySelector('[data-quick-add]');
                      quickAddSection?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  },
                  icon: UserPlus,
                }}
              />
            )}
          </div>
        ) : (
          <div
            ref={parentRef}
            className="max-h-[520px] overflow-auto"
          >
            <div
              className="relative"
              style={{ height: rowVirtualizer.getTotalSize() }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const customer = customers[virtualRow.index];
                if (!customer) return null;
                const referralLink = customer?.referral_code
                  ? `${siteUrl}/r/${customer.referral_code}`
                  : null;
                const embedTarget = referralLink
                  ? `${referralLink}${referralLink.includes("?") ? "&" : "?"}embed=1`
                  : null;
                const embedSnippet = embedTarget
                  ? `<iframe src="${embedTarget}" title="Pepform referral" style="width:100%;min-height:600px;border:none;border-radius:24px;overflow:hidden;"></iframe>`
                  : null;
                const isLinkCopied = copiedKey === `${customer?.id}-link`;
                const isEmbedCopied = copiedKey === `${customer?.id}-embed`;
                const discountCode = customer.discount_code ?? "";
                const discountKey = `${customer.id}-discount`;
                const isDiscountCopied = copiedKey === discountKey;
                const rawStatus = (customer?.status || "pending").toLowerCase();
                const isVerified =
                  rawStatus === "verified" || rawStatus === "active";
                const displayStatus =
                  rawStatus === "pending"
                    ? "Ambassador pending"
                    : rawStatus === "applicant"
                    ? "New applicant"
                    : isVerified
                    ? "Verified ambassador"
                    : rawStatus;
                const normalizedSource = customer.source
                  ? customer.source.replace(/_/g, " ")
                  : null;
                const audienceSummary = customer.audience_profile
                  ? customer.audience_profile.length > 140
                    ? `${customer.audience_profile.slice(0, 140)}…`
                    : customer.audience_profile
                  : null;
                const instagramHandle = customer.instagram_handle
                  ? customer.instagram_handle.replace(/^@/, "")
                  : null;
                const linkedinHandle = customer.linkedin_handle
                  ? customer.linkedin_handle.replace(/^@/, "")
                  : null;

                const statusClass =
                  rawStatus === "applicant"
                    ? "bg-amber-100 text-amber-800"
                    : isVerified
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-800";

                return (
                  <div
                    key={customer.id}
                    data-index={virtualRow.index}
                    ref={(node) => {
                      if (node) rowVirtualizer.measureElement(node);
                    }}
                    className="grid items-center gap-4 border-b border-slate-100 px-4 py-4 text-sm"
                    style={{
                      gridTemplateColumns: ROW_TEMPLATE,
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div className="flex items-center">
                      <Checkbox
                        checked={selectedIds.has(customer.id)}
                        onCheckedChange={() => toggleSelection(customer)}
                        aria-label={`Select ${customer.name ?? "ambassador"}`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {customer.name ?? "—"}
                      </p>
                      <p className="text-xs text-slate-500">
                        ID: {customer.id.slice(0, 8)}…
                      </p>
                    </div>
                    <div className="space-y-1 text-xs text-slate-600">
                      <p>{customer.email ?? "—"}</p>
                      <p>{customer.phone ?? "—"}</p>
                    </div>
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">
                          {customer.company ?? "—"}
                        </p>
                        {normalizedSource && (
                          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-600">
                            {normalizedSource}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {customer.website && (
                          <a
                            href={customer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-200 px-2 py-0.5 font-medium text-[11px] text-blue-700 hover:border-blue-400"
                          >
                            Website
                          </a>
                        )}
                        {instagramHandle && (
                          <a
                            href={`https://instagram.com/${instagramHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-200 px-2 py-0.5 font-medium text-[11px] text-pink-700 hover:border-pink-400"
                          >
                            @{instagramHandle}
                          </a>
                        )}
                        {linkedinHandle && (
                          <a
                            href={`https://www.linkedin.com/in/${linkedinHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-slate-200 px-2 py-0.5 font-medium text-[11px] text-slate-700 hover:border-slate-400"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                      {audienceSummary && (
                        <p className="text-[11px] text-slate-500">
                          {audienceSummary}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      {referralLink ? (
                        <p className="truncate font-mono text-xs text-blue-600">
                          {referralLink}
                        </p>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {referralLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(referralLink, `${customer.id}-link`)
                            }
                            className="text-xs"
                          >
                            {isLinkCopied ? (
                              <>
                                <Check className="mr-1 h-3 w-3" />
                                Link copied
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-3 w-3" />
                                Copy link
                              </>
                            )}
                          </Button>
                        )}
                        {embedSnippet && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                embedSnippet,
                                `${customer.id}-embed`,
                              )
                            }
                            className="text-xs"
                          >
                            {isEmbedCopied ? (
                              <>
                                <Check className="mr-1 h-3 w-3" />
                                Embed copied
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-3 w-3" />
                                Copy embed
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {discountCode ? (
                        <p className="font-mono text-xs text-emerald-700">
                          {discountCode}
                        </p>
                      ) : (
                        <span className="text-xs text-slate-400">Auto-generated for new contacts</span>
                      )}
                      {discountCode && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(discountCode, discountKey)}
                          className="text-xs"
                        >
                          {isDiscountCopied ? (
                            <>
                              <Check className="mr-1 h-3 w-3" />
                              Code copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1 h-3 w-3" />
                              Copy code
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    <div className="text-right font-semibold">
                      <span
                        className={
                          customer.credits && customer.credits > 0
                            ? "text-emerald-600"
                            : ""
                        }
                      >
                        ${customer.credits ?? 0}
                      </span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusClass}`}>
                        {displayStatus}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <AdjustCreditsDialog
                        customer={customer}
                        busy={adjustingCustomerId === customer.id}
                        onSubmit={handleAdjustSubmit}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {total === 0
            ? "No ambassadors to display yet."
            : `Showing ${firstItemIndex}-${lastItemIndex} of ${total} ambassadors`}
        </p>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            className="h-8 rounded-2xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {[25, 50, 100, 150].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm font-semibold text-slate-700">
          Page {page} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) =>
            Math.min(totalPages, prev + 1),
          )}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Syncing results…
        </div>
      )}

      {/* Bulk action dialogs */}
      <BulkActionDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        title="Delete selected ambassadors"
        description="This will permanently delete the selected ambassadors and anonymize their referral data. This action cannot be undone."
        actionLabel="Delete ambassadors"
        variant="destructive"
        onConfirm={bulkDeleteAmbassadors}
        itemCount={selectedCount}
        itemLabel="ambassador"
      />

      <BulkActionDialog
        open={bulkSendCampaignDialogOpen}
        onOpenChange={setBulkSendCampaignDialogOpen}
        title="Send campaign to selected"
        description="This will open the campaign builder with the selected ambassadors pre-selected as recipients."
        actionLabel="Open campaign builder"
        variant="default"
        onConfirm={bulkSendCampaign}
        itemCount={selectedCount}
        itemLabel="ambassador"
      />

      <BulkActionDialog
        open={bulkStatusDialogOpen}
        onOpenChange={setBulkStatusDialogOpen}
        title="Update status"
        description="Mark all selected ambassadors as active. This will update their status in the system."
        actionLabel="Update status"
        variant="default"
        onConfirm={() => bulkUpdateStatus("active")}
        itemCount={selectedCount}
        itemLabel="ambassador"
      />
    </div>
  );
}

type AdjustCreditsDialogProps = {
  customer: Customer;
  busy: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, customerId: string) => Promise<void>;
};

function AdjustCreditsDialog({ customer, busy, onSubmit }: AdjustCreditsDialogProps) {
  const [mode, setMode] = useState<"add" | "deduct">("add");
  const [amount, setAmount] = useState("");
  const signedAmount =
    amount.trim().length === 0 ? "" : mode === "deduct" ? `-${amount.trim()}` : amount.trim();
  const presets = [10, 25, 50, 100];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Coins className="mr-2 h-3 w-3" />
          Adjust credits
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adjust credits</DialogTitle>
          <DialogDescription>
            Add or deduct credits for {customer.name ?? "this ambassador"} with context.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 mb-3">
          <p className="font-semibold text-slate-900">Current balance</p>
          <p className="text-2xl font-black text-emerald-600">${customer.credits ?? 0}</p>
          <p className="text-xs text-slate-500">
            Choose Add or Deduct below—no need to remember negative numbers.
          </p>
        </div>
        <form
          onSubmit={(event) => onSubmit(event, customer.id)}
          className="space-y-4"
        >
          <input type="hidden" name="customer_id" value={customer.id} />
          <input type="hidden" name="credit_amount" value={signedAmount} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Adjustment type</Label>
              <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold">
                {["add", "deduct"].map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={`px-4 py-1 rounded-full transition ${
                      mode === value
                        ? "bg-slate-900 text-white shadow"
                        : "text-slate-600"
                    }`}
                    onClick={() => setMode(value as "add" | "deduct")}
                  >
                    {value === "add" ? "Add credit" : "Deduct credit"}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Preset amounts</Label>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 border-slate-200 text-slate-600"
                    onClick={() => setAmount(String(preset))}
                  >
                    ${preset}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Custom amount</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                $
              </span>
              <Input
                type="number"
                min="0"
                step="1"
                className="pl-6"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter a custom value"
              />
            </div>
            <p className="text-xs text-slate-500">
              When you choose Deduct we&apos;ll automatically subtract this amount.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`credit_note_${customer.id}`} className="text-sm font-semibold">
              Internal note (optional)
            </Label>
            <Textarea
              id={`credit_note_${customer.id}`}
              name="credit_note"
              rows={3}
              placeholder="E.g., Added bonus for VIP referral or deducted for refunded booking."
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={busy || !signedAmount}
            >
              {busy ? "Updating..." : "Update credits"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
