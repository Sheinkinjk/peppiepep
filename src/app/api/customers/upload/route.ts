import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { z } from "zod";

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
    const isCSV = fileName.endsWith(".csv");
    const isExcel = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");

    if (!isCSV && !isExcel) {
      return NextResponse.json(
        { error: "Invalid file type. Upload a CSV or Excel file." },
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

    if (isCSV) {
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
    } else {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json<(string | number)[]>(worksheet, {
        header: 1,
        defval: "",
      });
      const headers = (rows[0] as string[] | undefined) || [];
      parsedRows = rows.slice(1).map((rowArr) => {
        const record: Record<string, string> = {};
        headers.forEach((header, index) => {
          const value = rowArr && rowArr[index] !== undefined ? String(rowArr[index]) : "";
          record[header] = value;
        });
        return record;
      });
    }

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
      const email = row.email?.toLowerCase().trim();
      const phone = row.phone?.trim();

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
  }
}
