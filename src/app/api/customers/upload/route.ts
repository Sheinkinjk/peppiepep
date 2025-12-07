import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { z } from "zod";

import type { Database } from "@/types/supabase";
import { buildCustomersFromRows } from "@/lib/customer-import";
import { generateUniqueDiscountCode } from "@/lib/discount-codes";
import { createServerComponentClient } from "@/lib/supabase";
import { createApiLogger } from "@/lib/api-logger";
import { validateWithSchema } from "@/lib/api-validation";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

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

    if (uploadedFile.size > 5 * 1024 * 1024) {
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

    const customersToInsert = buildCustomersFromRows(parsedRows, { businessId });

    for (const customer of customersToInsert) {
      customer.discount_code = await generateUniqueDiscountCode({
        supabase,
        businessId,
        seedName: customer.name ?? customer.email ?? customer.phone ?? null,
      });
    }

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
      customersToInsert,
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
      count: customersToInsert.length,
      userId: user.id,
    });

    return NextResponse.json({
      success: `Imported ${customersToInsert.length} customer${
        customersToInsert.length === 1 ? "" : "s"
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
