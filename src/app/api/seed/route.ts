import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createAdminClient() as any;

  try {
    // Upsert AppSettings
    await supabase.from("app_settings").upsert({
      id: "singleton",
      company_name: "LIV Pools LLC",
      address: "123 Gulf Blvd, Clearwater, FL 33755",
      phone: "(727) 555-0100",
      email: "hello@livpools.com",
      website: "www.livpools.com",
      license_number: "FL-CPC1234567",
      tax_rate: 0,
      default_markup: 0.60,
      pm_fee_rate: 0.08,
      contingency_rate: 0.05,
      payment_schedule: {
        deposit: 0.10,
        shell: 0.45,
        equipment: 0.20,
        final: 0.25,
      },
    });

    // Seed vendors
    const vendors = [
      { name: "ABC Steel & Supply",        category: "materials",    contact_name: "Bob Martinez",  phone: "(813) 555-0201", email: "sales@abcsteel.com" },
      { name: "Dirt Pro Excavation",        category: "excavation",   contact_name: "Rick Paulson",  phone: "(727) 555-0302", email: "rick@dirtpro.com" },
      { name: "Pool Supply Co.",            category: "equipment",    contact_name: "Diana Lee",     phone: "(727) 555-0403", email: "diana@poolsupply.com" },
      { name: "Graybar Electric",           category: "electrical",   contact_name: "Tom Harris",    phone: "(813) 555-0504", email: "tom@graybar.com" },
      { name: "Precision Plumbing Sub",    category: "plumbing",     contact_name: "Carlos Ruiz",   phone: "(727) 555-0605", email: "carlos@precplumb.com" },
      { name: "Sunstate Shotcrete",        category: "subcontractor",contact_name: "Jeff Moss",     phone: "(727) 555-0706", email: "jeff@sunstate.com" },
      { name: "Pebble Tec",               category: "materials",    contact_name: "Sales Dept",    phone: "(800) 555-0800", email: "sales@pebbletec.com" },
    ];

    for (const v of vendors) {
      await supabase.from("vendors").upsert(v, { onConflict: "name" });
    }

    // Seed cost codes
    const costCodes = [
      { code: "01-PERMIT",   name: "Permitting & Fees",       category: "overhead" },
      { code: "02-EXCAV",    name: "Excavation & Haul",       category: "labor" },
      { code: "03-STEEL",    name: "Steel & Rebar",           category: "materials" },
      { code: "04-PLUMB",    name: "Plumbing",                category: "labor" },
      { code: "05-ELEC",     name: "Electrical",              category: "labor" },
      { code: "06-SHOT",     name: "Shotcrete / Gunite",      category: "subcontractor" },
      { code: "07-TILE",     name: "Tile & Coping",           category: "materials" },
      { code: "08-EQP",      name: "Equipment Package",       category: "materials" },
      { code: "09-INT",      name: "Interior Finish",         category: "materials" },
      { code: "10-DECK",     name: "Deck & Hardscape",        category: "subcontractor" },
      { code: "11-CLEAN",    name: "Startup & Cleanup",       category: "labor" },
    ];

    for (const cc of costCodes) {
      await supabase.from("cost_codes").upsert(cc, { onConflict: "code" });
    }

    // Seed formulas
    const formulas = [
      { name: "SURF_AREA",    expression: "length * width",                      description: "Pool surface area in SF" },
      { name: "WALL_AREA",    expression: "perimeter_wall * avg_depth",           description: "Pool wall wet area in SF" },
      { name: "WET_SURFACE",  expression: "SURF_AREA + WALL_AREA",               description: "Total wet surface in SF" },
      { name: "GALLONS",      expression: "SURF_AREA * avg_depth * 7.48",        description: "Pool volume in gallons" },
      { name: "EXCAV_CY",     expression: "ceil((SURF_AREA * (avg_depth+1) * 1.25) / 27)", description: "Excavation in CY" },
      { name: "CONCRETE_CY",  expression: "ceil(WET_SURFACE * 0.5 / 27)",        description: "Gunite/shotcrete in CY" },
      { name: "STEEL_LBS",    expression: "ceil(WET_SURFACE * 0.8)",             description: "Rebar estimate in LBS" },
    ];

    for (const f of formulas) {
      await supabase.from("formulas").upsert(f, { onConflict: "name" });
    }

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "POST to this endpoint to seed the database" });
}
