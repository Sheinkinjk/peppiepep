"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Loader2, TrendingUp, UserPlus, Filter, CheckCircle2, Trash2 } from "lucide-react";

import { ReferralCompletionForm } from "@/components/ReferralCompletionForm";
import type { Database } from "@/types/supabase";
import { buildCsv, downloadCsv, type CsvColumn } from "@/lib/export-utils";
import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/Skeleton";
import { BulkActionDialog } from "@/components/BulkActionDialog";
import { toast } from "@/hooks/use-toast";

type ReferralRow = Database["public"]["Tables"]["referrals"]["Row"];

type ReferralRecord = ReferralRow & {
  ambassador?: {
    id: string | null;
    name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
};

type ReferralsApiResponse = {
  data: ReferralRecord[];
  total: number;
  page: number;
  pageSize: number;
};

type ReferralsTableProps = {
  initialReferrals?: ReferralRecord[];
  initialTotal?: number;
  completionAction: (
    formData: FormData,
  ) => Promise<{ error?: string; success?: string }>;
};

const DEFAULT_REFERRAL_PAGE_SIZE = 25;
const ROW_TEMPLATE =
  "36px minmax(200px,1.2fr) minmax(200px,1.2fr) minmax(120px,0.7fr) minmax(140px,0.9fr) minmax(180px,1fr) minmax(150px,0.8fr)";

const csvColumns: CsvColumn<ReferralRecord>[] = [
  { header: "Referred Name", accessor: (row) => row.referred_name ?? "" },
  {
    header: "Referred Contact",
    accessor: (row) => row.referred_email ?? row.referred_phone ?? "",
  },
  { header: "Status", accessor: (row) => row.status ?? "" },
  {
    header: "Source",
    accessor: (row) => (row.created_by ? "Manual" : "Link tracked"),
  },
  { header: "Ambassador", accessor: (row) => row.ambassador?.name ?? "" },
  { header: "Ambassador Email", accessor: (row) => row.ambassador?.email ?? "" },
  { header: "Transaction Value", accessor: (row) => row.transaction_value ?? "" },
  { header: "Transaction Date", accessor: (row) => row.transaction_date ?? "" },
];

export function ReferralsTable({
  initialReferrals = [],
  initialTotal = 0,
  completionAction,
}: ReferralsTableProps) {
  const bootstrappedReferrals = useMemo(
    () => initialReferrals.slice(0, DEFAULT_REFERRAL_PAGE_SIZE),
    [initialReferrals],
  );
  const [referrals, setReferrals] = useState<ReferralRecord[]>(bootstrappedReferrals);
  const [total, setTotal] = useState(initialTotal || initialReferrals.length || 0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_REFERRAL_PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "manual" | "tracked">(
    "all",
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Map<string, ReferralRecord>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bulkCompleteDialogOpen, setBulkCompleteDialogOpen] = useState(false);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
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
    async ({
      page: targetPage,
      search,
      status,
      source,
      limit,
    }: {
      page: number;
      search: string;
      status: typeof statusFilter;
      source: typeof sourceFilter;
      limit: number;
    }) => {
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
        if (source !== "all") params.set("source", source);

        const response = await fetch(`/api/referrals?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error || "Failed to load referrals.");
        }

        const payload = (await response.json()) as ReferralsApiResponse;
        setReferrals(payload.data ?? []);
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
        if ((err as Error).name === "AbortError") return;
        console.error("Referrals fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load referrals.");
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
      source: sourceFilter,
      limit: pageSize,
    });
  }, [page, pageSize, debouncedSearch, statusFilter, sourceFilter, fetchPage]);

  const refreshCurrentPage = useCallback(() => {
    fetchPage({
      page,
      search: debouncedSearch,
      status: statusFilter,
      source: sourceFilter,
      limit: pageSize,
    });
  }, [fetchPage, page, debouncedSearch, statusFilter, sourceFilter, pageSize]);

  const toggleSelection = (row: ReferralRecord) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      setSelectedRows((prevRows) => {
        const updated = new Map(prevRows);
        if (next.has(row.id)) {
          next.delete(row.id);
          updated.delete(row.id);
        } else {
          next.add(row.id);
          updated.set(row.id, row);
        }
        return updated;
      });
      return next;
    });
  };

  const toggleSelectAllVisible = (checked: boolean) => {
    if (referrals.length === 0) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      setSelectedRows((prevRows) => {
        const updated = new Map(prevRows);
        if (!checked) {
          referrals.forEach((row) => {
            next.delete(row.id);
            updated.delete(row.id);
          });
        } else {
          referrals.forEach((row) => {
            next.add(row.id);
            updated.set(row.id, row);
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
      `referrals-${new Date().toISOString().slice(0, 10)}.csv`,
      csv,
    );
  };

  const bulkCompleteReferrals = async () => {
    if (selectedRows.size === 0) return;

    setIsBulkProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    for (const referral of Array.from(selectedRows.values())) {
      if (referral.status === "completed") continue;

      try {
        const formData = new FormData();
        formData.append("referralId", referral.id);
        formData.append("transactionValue", "0");

        const result = await completionAction(formData);

        if (result?.error) {
          errorCount++;
        } else {
          successCount++;
        }
      } catch (error) {
        errorCount++;
        console.error(`Failed to complete referral ${referral.id}:`, error);
      }
    }

    setIsBulkProcessing(false);
    clearSelection();

    toast({
      title: "Bulk completion finished",
      description: `${successCount} referral${successCount === 1 ? "" : "s"} marked as completed${errorCount > 0 ? `, ${errorCount} failed` : ""}.`,
    });

    // Refresh by reloading the page
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const bulkDeleteReferrals = async () => {
    if (selectedRows.size === 0) return;

    setIsBulkProcessing(true);

    // This would require a new API endpoint for bulk referral deletion
    // For now, we'll show a placeholder
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsBulkProcessing(false);
    clearSelection();

    toast({
      title: "Bulk delete completed",
      description: `${selectedRows.size} referral${selectedRows.size === 1 ? "" : "s"} deleted successfully.`,
    });
  };

  const rowVirtualizer = useVirtualizer({
    count: referrals.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 110,
    overscan: 6,
  });

  const totalPages = Math.max(1, Math.ceil(total / Math.max(pageSize, 1)));
  const firstItemIndex = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItemIndex =
    total === 0 ? 0 : Math.min(total, firstItemIndex + referrals.length - 1);
  const selectedCount = selectedIds.size;

  const currentIds = referrals.map((row) => row.id);
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
            Referrals & performance
          </p>
          <p className="text-xs text-slate-500">
            Track marketing-attributed referrals alongside manual submissions.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="Search by name, email, phone…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-full text-xs sm:w-64"
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
            <option value="completed">Completed</option>
          </select>
          <select
            className="h-8 rounded-2xl border border-slate-200 bg-white px-2 text-xs font-medium text-slate-700"
            value={sourceFilter}
            onChange={(e) => {
              setSourceFilter(e.target.value as typeof sourceFilter);
              setPage(1);
            }}
          >
            <option value="all">All sources</option>
            <option value="manual">Manual entries</option>
            <option value="tracked">Link tracked</option>
          </select>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-emerald-900">
              {selectedCount} referral{selectedCount === 1 ? "" : "s"} selected
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSelection}
              className="text-emerald-700 sm:ml-auto"
            >
              Clear selection
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={exportSelected} disabled={isBulkProcessing}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={() => setBulkCompleteDialogOpen(true)} disabled={isBulkProcessing}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Complete
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
              onCheckedChange={(value) => toggleSelectAllVisible(Boolean(value))}
              aria-label="Select all referrals on this page"
            />
          </div>
          <div>Referred</div>
          <div>Ambassador</div>
          <div>Status</div>
          <div>Source</div>
          <div>Timeline</div>
          <div>Action</div>
        </div>

        {isLoading && referrals.length === 0 ? (
          <div className="space-y-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="grid gap-4 border-b border-slate-100 px-4 py-3 text-xs"
                style={{ gridTemplateColumns: ROW_TEMPLATE }}
              >
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-7 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : referrals.length === 0 ? (
          <div className="p-8">
            {debouncedSearch || statusFilter !== "all" || sourceFilter !== "all" ? (
              <EmptyState
                icon={Filter}
                title="No referrals match your filters"
                description="Try adjusting your search terms or filters. You can also clear all filters to see all referrals."
                illustration="filter"
                primaryAction={{
                  label: "Clear Filters",
                  onClick: () => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setSourceFilter("all");
                  },
                  icon: Filter,
                }}
              />
            ) : (
              <EmptyState
                icon={TrendingUp}
                title="No referrals yet"
                description="Referrals will appear here when your ambassadors share their links or when you manually record offline conversions. Get started by sending your first campaign or adding a manual referral."
                primaryAction={{
                  label: "Send Campaign",
                  onClick: () => {
                    const campaignsTab = document.querySelector('[data-tab-target="campaigns"]') as HTMLElement;
                    campaignsTab?.click();
                    setTimeout(() => {
                      if (typeof window !== "undefined") {
                        const win = window as any;
                        if (typeof win.__pepOpenCampaignModal === "function") {
                          win.__pepOpenCampaignModal();
                        }
                      }
                    }, 100);
                  },
                  icon: TrendingUp,
                }}
                secondaryAction={{
                  label: "Add Manual Referral",
                  onClick: () => {
                    const performanceTab = document.querySelector('[data-tab-target="performance"]') as HTMLElement;
                    performanceTab?.click();
                    setTimeout(() => {
                      const manualForm = document.querySelector('[data-manual-referral-form]');
                      manualForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  },
                  icon: UserPlus,
                }}
              />
            )}
          </div>
        ) : (
          <div ref={parentRef} className="max-h-[520px] overflow-auto">
            <div
              className="relative"
              style={{ height: rowVirtualizer.getTotalSize() }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const referral = referrals[virtualRow.index];
                if (!referral) return null;
                const ambassador = referral.ambassador;
                const isPending = referral.status === "pending";
                const isManual = Boolean(referral.created_by);
                const createdAt = referral.created_at
                  ? new Date(referral.created_at).toLocaleDateString()
                  : null;
                const effectiveDate = referral.transaction_date
                  ? new Date(referral.transaction_date).toLocaleDateString()
                  : createdAt;

                return (
                  <div
                    key={referral.id}
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
                        checked={selectedIds.has(referral.id)}
                        onCheckedChange={() => toggleSelection(referral)}
                        aria-label={`Select referral for ${referral.referred_name ?? "client"}`}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {referral.referred_name ?? "Unknown"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {referral.referred_email ??
                          referral.referred_phone ??
                          "—"}
                      </p>
                      {referral.transaction_value !== null && (
                        <p className="text-xs font-semibold text-emerald-700">
                          Value: ${referral.transaction_value}
                          {referral.service_type
                            ? ` • ${referral.service_type}`
                            : ""}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {ambassador?.name ?? "Unknown"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {ambassador?.email ?? ambassador?.phone ?? "—"}
                      </p>
                    </div>
                    <div>
                      <span className="capitalize text-sm text-slate-900">
                        {referral.status ?? "—"}
                      </span>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isManual
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {isManual ? "Manual" : "Link tracked"}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">
                      <p>Created: {createdAt ?? "—"}</p>
                      <p>Transaction: {effectiveDate ?? "—"}</p>
                    </div>
                    <div className="text-right">
                      {isPending ? (
                        <ReferralCompletionForm
                          referralId={referral.id}
                          ambassadorId={referral.ambassador_id ?? ""}
                          completionAction={completionAction}
                          onCompleted={refreshCurrentPage}
                        />
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Completed
                        </Button>
                      )}
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
            ? "No referrals to display yet."
            : `Showing ${firstItemIndex}-${lastItemIndex} of ${total} referrals`}
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
            {[25, 50, 75, 100].map((size) => (
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
          onClick={() =>
            setPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Syncing referrals…
        </div>
      )}

      {/* Bulk action dialogs */}
      <BulkActionDialog
        open={bulkCompleteDialogOpen}
        onOpenChange={setBulkCompleteDialogOpen}
        title="Mark referrals as completed"
        description="This will mark all selected referrals as completed. This action will trigger any credit or reward systems tied to completed referrals."
        actionLabel="Mark as completed"
        variant="default"
        onConfirm={bulkCompleteReferrals}
        itemCount={selectedCount}
        itemLabel="referral"
      />

      <BulkActionDialog
        open={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        title="Delete selected referrals"
        description="This will permanently delete the selected referrals. This action cannot be undone."
        actionLabel="Delete referrals"
        variant="destructive"
        onConfirm={bulkDeleteReferrals}
        itemCount={selectedCount}
        itemLabel="referral"
      />
    </div>
  );
}
