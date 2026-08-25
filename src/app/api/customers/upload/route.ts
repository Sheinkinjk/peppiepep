import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import Papa from "papaparse";
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";

import type { Database } from "@/types/supabase";
import { buildCustomersFromRows } from "@/lib/customer-import";
import { generateUniqueDiscountCode } from "@/lib/discount-codes";
import { ensureUniqueReferralCodesForCustomerInserts } from "@/lib/referral-codes";
import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// Constants for upload validation
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_ROWS = 5000; // Maximum rows per upload
const ALLOWED_HEADERS = ['name', 'email', 'phone', 'notes', 'tags', 'company'];

// Concurrent upload protection: Track active uploads by user ID
const activeUploads = new Map<string, boolean>();

const uploadFormSchema = z.object({
  file: z.instanceof(File, { message: "Please select a CSV or Excel file to upload." }),
});

async function resolveBusinessId(
  supabase: SupabaseClient<Database>,
  ownerId: string,
  fallbackName: string,
) {
  const { data, error } = await supabase
    .from("businesses")
    .select("id")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (!error && data && data.length > 0) {
    const [row] = data as Array<{ id: string }>;
    return row.id;
  }

  const insertPayload: Database["public"]["Tables"]["businesses"]["Insert"] = {
    owner_id: ownerId,
    name: fallbackName,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const businessInsert = supabase.from("businesses") as any;
  const { data: inserted, error: insertError } = await businessInsert
    .insert([insertPayload])
    .select("id")
    .single();

  if (insertError || !inserted) {
    throw new Error("Unable to locate or create business profile.");
  }

  return inserted.id as string;
}

export async function POST(request: Request) {
  const logger = createApiLogger("api:customers:upload");
  logger.info("Received customer upload request");

  // Rate limiting
  const rateLimitCheck = await checkRateLimit(request, "customerUpload");
  if (!rateLimitCheck.success && rateLimitCheck.response) {
    logger.warn("Rate limit exceeded for customer upload");
    return rateLimitCheck.response;
  }

  try {
    const supabase = await createServerComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      logger.warn("Customer upload unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Concurrent upload protection
    if (activeUploads.get(user.id)) {
      logger.warn("Concurrent upload attempt detected", { userId: user.id });
      return NextResponse.json(
        { error: "An upload is already in progress. Please wait for it to complete." },
        { status: 409 }
      );
    }

    // Mark upload as active
    activeUploads.set(user.id, true);

    try {
      const businessId = await resolveBusinessId(
        supabase,
        user.id,
        `${user.email?.split("@")[0] ?? "Your"}'s salon`,
      );

    const formData = await request.formData();
    const validation = validateWithSchema(uploadFormSchema, { file: formData.get("file") }, logger, {
      errorMessage: "Please select a CSV or Excel file to upload.",
    });

    if (!validation.success) {
      return validation.response;
    }

    const { file: uploadedFile } = validation.data;
    const fileName = uploadedFile.name.toLowerCase();
    // Excel support is gone deliberately. It required the `xlsx` package, which
    // carries an unfixed prototype-pollution and ReDoS advisory with no patched
    // release, on a route that parses a file an uploader controls. Papa Parse
    // handles CSV, every spreadsheet exports CSV, and this is the only place the
    // dependency was used.
    const isCSV = fileName.endsWith(".csv");
    const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");

    if (isExcel) {
      return NextResponse.json(
        { error: "Excel files are no longer supported. Save the sheet as CSV and upload that." },
        { status: 400 },
      );
    }
    if (!isCSV) {
      return NextResponse.json(
        { error: "Invalid file type. Upload a CSV file." },
        { status: 400 },
      );
    }

    if (uploadedFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 },
      );
    }

    logger.info("Validated upload file", {
      userId: user.id,
      fileName: uploadedFile.name,
      size: uploadedFile.size,
    });

    let parsedRows: Array<Record<string, string>> = [];

    {
      const text = await uploadedFile.text();
      const parsed = Papa.parse<Record<string, string>>(text, {
        header: true,
        skipEmptyLines: "greedy",
        transformHeader: (header, index) => {
          const trimmed = (header ?? "").trim();
          return trimmed || `column_${index}`;
        },
      });

      if (parsed.errors?.length) {
        const blockingError = parsed.errors.find(
          (err) => err && err.type !== "FieldMismatch",
        );
        if (blockingError) {
          return NextResponse.json(
            { error: "CSV parsing failed. Please check your file format." },
            { status: 400 },
          );
        }
      }

      parsedRows =
        parsed.data?.filter((row) => row && Object.values(row).some(Boolean)) ?? [];
    }

    // Validate row count
    // Validate row count
    if (parsedRows.length > MAX_ROWS) {
      logger.warn("Upload exceeded row limit", {
        userId: user.id,
        rowCount: parsedRows.length,
        maxAllowed: MAX_ROWS,
      });
      return NextResponse.json(
        { error: `Maximum ${MAX_ROWS.toLocaleString()} rows allowed. Your file has ${parsedRows.length.toLocaleString()} rows.` },
        { status: 400 },
      );
    }

    // Check for duplicates within the upload
    const emailSet = new Set<string>();
    const phoneSet = new Set<string>();
    const duplicates: string[] = [];

    parsedRows.forEach((row, index) => {
      // Sanitize all values to prevent XSS
      const sanitizedRow: Record<string, string> = {};
      Object.keys(row).forEach((key) => {
        const value = row[key];
        sanitizedRow[key] = typeof value === 'string' ? DOMPurify.sanitize(value.trim()) : '';
      });
      parsedRows[index] = sanitizedRow;

      const email = sanitizedRow.email?.toLowerCase().trim();
      const phone = sanitizedRow.phone?.trim();

      if (email && emailSet.has(email)) {
        duplicates.push(`Row ${index + 2}: Duplicate email "${email}"`);
      } else if (email) {
        emailSet.add(email);
      }

      if (phone && phoneSet.has(phone)) {
        duplicates.push(`Row ${index + 2}: Duplicate phone "${phone}"`);
      } else if (phone) {
        phoneSet.add(phone);
      }
    });

    if (duplicates.length > 0) {
      logger.warn("Duplicates found in upload", {
        userId: user.id,
        duplicateCount: duplicates.length,
      });
      return NextResponse.json(
        {
          error: `Found ${duplicates.length} duplicate(s) in your file. Please remove duplicates and try again.`,
          duplicates: duplicates.slice(0, 10), // Return first 10 for user reference
        },
        { status: 400 },
      );
    }

    const customersToInsert = buildCustomersFromRows(parsedRows, { businessId });

    for (const customer of customersToInsert) {
      customer.discount_code = await generateUniqueDiscountCode({
        supabase,
        businessId,
        seedName: customer.name ?? customer.email ?? customer.phone ?? null,
      });
    }

    const customersWithUniqueReferralCodes = await ensureUniqueReferralCodesForCustomerInserts({
      supabase,
      rows: customersToInsert,
    });

    if (customersToInsert.length === 0) {
      return NextResponse.json(
        {
          error:
            "No valid customer data found. Include at least a name, phone, or email column.",
        },
        { status: 400 },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: insertError } = await (supabase.from("customers") as any).insert(
      customersWithUniqueReferralCodes,
    );

    if (insertError) {
      logger.error("Failed to import customers", { error: insertError, businessId });
      return NextResponse.json(
        { error: "Failed to import customers. Please try again." },
        { status: 500 },
      );
    }

    revalidatePath("/dashboard");

    logger.info("Customers imported", {
      businessId,
      count: customersWithUniqueReferralCodes.length,
      userId: user.id,
    });

      return NextResponse.json({
        success: `Imported ${customersWithUniqueReferralCodes.length} customer${
          customersWithUniqueReferralCodes.length === 1 ? "" : "s"
        }. Referral links are live.`,
      });
    } catch (error) {
      logger.error("Upload API error", { error });
      return NextResponse.json(
        { error: "An unexpected error occurred while uploading customers." },
        { status: 500 },
      );
    } finally {
      // Clean up concurrent upload tracking
      activeUploads.delete(user.id);
    }
  } catch (error) {
    logger.error("Outer upload API error", { error });
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
