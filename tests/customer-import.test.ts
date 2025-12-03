import { describe, expect, it } from "vitest";

import { buildCustomersFromRows } from "@/lib/customer-import";

describe("customer import helper", () => {
  const businessId = "biz_123";

  it("normalizes common header variations and trims values", () => {
    let counter = 0;
    const referralCodeFactory = () => `code_${++counter}`;

    const rows = [
      { Name: "  Alice Example  ", Email: "alice@example.com", Phone: " 0400 000 001 " },
      { full_name: "Bob Example", mobile: "+61400000002", email: "bob@example.com" },
    ];

    const customers = buildCustomersFromRows(rows, { businessId, referralCodeFactory });

    expect(customers).toHaveLength(2);
    expect(customers[0]).toMatchObject({
      business_id: businessId,
      name: "Alice Example",
      phone: "0400 000 001",
      email: "alice@example.com",
      referral_code: "code_1",
      status: "pending",
    });
    expect(customers[1]).toMatchObject({
      name: "Bob Example",
      phone: "+61400000002",
      email: "bob@example.com",
      referral_code: "code_2",
    });
  });

  it("filters out empty rows with no contact fields", () => {
    const customers = buildCustomersFromRows(
      [
        { Name: "", phone: "", email: "" },
        { something: "else" },
        { name: "Valid User" },
      ],
      { businessId, referralCodeFactory: () => "fixed" },
    );

    expect(customers).toHaveLength(1);
    expect(customers[0].name).toBe("Valid User");
  });

  it("handles extra columns and fuzzy header names", () => {
    const customers = buildCustomersFromRows(
      [
        {
          "Client Name": "Chloe Luxe",
          "Preferred Phone Number": "555-0109",
          "Primary Mail": "chloe@example.com",
          Notes: "VIP",
        },
        {
          "First Name": "Lia",
          "Last_Name": "Monet",
          "contact_email": "lia@example.com",
          instagram: "@lia",
        },
      ],
      { businessId, referralCodeFactory: () => "code" },
    );

    expect(customers).toHaveLength(2);
    expect(customers[0]).toMatchObject({
      name: "Chloe Luxe",
      phone: "555-0109",
      email: "chloe@example.com",
    });
    expect(customers[1]).toMatchObject({
      name: "Lia Monet",
      email: "lia@example.com",
    });
  });
});
