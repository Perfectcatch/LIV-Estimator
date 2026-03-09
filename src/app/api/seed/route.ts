import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => createAdminClient() as any;

export async function POST() {
  const supabase = db();

  try {
    // ── 1. APP SETTINGS ──────────────────────────────────────────
    await supabase.from("app_settings").upsert({
      id: "singleton",
      company_name: "LIV Pools LLC",
      city_state_zip: "Clearwater, FL 34619",
      license: "CPC1459998",
      phone: "(727) 555-0100",
      email: "info@livpools.com",
      default_markup: 1.50,
      tax_rate: 0.0875,
      deposit_pct: 0.10,
      shell_pct: 0.45,
      equipment_pct: 0.20,
      final_pct: 0.25,
      target_margin: 0.35,
      min_margin: 0.25,
      round_up: true,
      round_granularity: 50,
    });

    // ── 2. VENDORS ───────────────────────────────────────────────
    const vendors = [
      { name: "Horner Express",           category: "SUPPLIER" },
      { name: "Home Depot",               category: "SUPPLIER" },
      { name: "SCP",                      category: "SUPPLIER" },
      { name: "Tile and Paver Source",    category: "SUPPLIER" },
      { name: "Baystone",                 category: "SUPPLIER" },
      { name: "Blaze",                    category: "SUPPLIER" },
      { name: "Big Horn",                 category: "SUPPLIER" },
      { name: "Gulf Stream",              category: "SUPPLIER" },
      { name: "Pebble Pros",              category: "SUBCONTRACTOR" },
      { name: "Government",               category: "SUPPLIER" },
      { name: "Local Supplier",           category: "SUPPLIER" },
      { name: "In-House",                 category: "SUPPLIER" },
      { name: "Insurance",                category: "SUPPLIER" },
      { name: "Excavation Sub",           category: "SUBCONTRACTOR" },
      { name: "Haul-Away Co",             category: "SUBCONTRACTOR" },
      { name: "SCP Distributors",         category: "SUPPLIER" },
      { name: "Hayward",                  category: "SUPPLIER" },
      { name: "Pentair",                  category: "SUPPLIER" },
      { name: "Perfect Catch Electric",   category: "SUBCONTRACTOR" },
      { name: "Pool Tile Warehouse",      category: "SUPPLIER" },
      { name: "NPT",                      category: "SUPPLIER" },
      { name: "Pebble Technology",        category: "SUPPLIER" },
      { name: "Tile Sub",                 category: "SUBCONTRACTOR" },
      { name: "Finish Sub",               category: "SUBCONTRACTOR" },
    ];
    for (const v of vendors) {
      await supabase.from("vendors").upsert(v, { onConflict: "name" });
    }

    // ── 3. COST CODES ─────────────────────────────────────────────
    const costCodes = [
      { code: "00-UNCAT",   stage_name: "Uncategorized",            cost_type: "Other",         stage_num: 0  },
      { code: "00-ADMIN",   stage_name: "Admin",                    cost_type: "Expense",       stage_num: 0  },
      { code: "01-PREP",    stage_name: "Permitting & Inspections", cost_type: "Expense",       stage_num: 1  },
      { code: "01-ENG",     stage_name: "Engineering",              cost_type: "Subcontractor", stage_num: 1  },
      { code: "01-FENCE",   stage_name: "General Job Site",         cost_type: "Expense",       stage_num: 1  },
      { code: "01-FREIGHT", stage_name: "Freight & Deliveries",     cost_type: "Expense",       stage_num: 1  },
      { code: "01-DEMO",    stage_name: "Demolition",               cost_type: "Subcontractor", stage_num: 1  },
      { code: "01-LAYOUT",  stage_name: "Layout",                   cost_type: "Labor",         stage_num: 1  },
      { code: "02-DIG",     stage_name: "Excavation",               cost_type: "Subcontractor", stage_num: 2  },
      { code: "03-STL",     stage_name: "Steel / Rebar",            cost_type: "Materials",     stage_num: 3  },
      { code: "06-GUN",     stage_name: "Shell / Shotcrete",        cost_type: "Subcontractor", stage_num: 6  },
      { code: "06-GAS",     stage_name: "Gas",                      cost_type: "Subcontractor", stage_num: 6  },
      { code: "06-GRADE",   stage_name: "Grading & Backfill",       cost_type: "Subcontractor", stage_num: 6  },
      { code: "04-PLUMB",   stage_name: "Plumbing",                 cost_type: "Subcontractor", stage_num: 4  },
      { code: "05-ELC",     stage_name: "Electrical",               cost_type: "Subcontractor", stage_num: 5  },
      { code: "08-EQP",     stage_name: "Equipment",                cost_type: "Equipment",     stage_num: 8  },
      { code: "07-COP",     stage_name: "Coping & Decking Materials",cost_type: "Materials",    stage_num: 7  },
      { code: "07-DECK",    stage_name: "Deck Install",             cost_type: "Subcontractor", stage_num: 7  },
      { code: "07-TIL",     stage_name: "Tile & Coping Install",    cost_type: "Subcontractor", stage_num: 7  },
      { code: "09-FIN",     stage_name: "Interior Finish",          cost_type: "Subcontractor", stage_num: 9  },
      { code: "10-START",   stage_name: "Start Up",                 cost_type: "Labor",         stage_num: 10 },
      { code: "10-CHEM",    stage_name: "Chemicals & Maintenance",  cost_type: "Materials",     stage_num: 10 },
      { code: "ADD-LAND",   stage_name: "Landscaping",              cost_type: "Subcontractor", stage_num: 11 },
      { code: "ADD-KITCH",  stage_name: "Outdoor Kitchen",          cost_type: "Subcontractor", stage_num: 11 },
      { code: "ADD-SCREEN", stage_name: "Screen Enclosure",         cost_type: "Subcontractor", stage_num: 11 },
      { code: "SYS-WARR",   stage_name: "Warranty & Callbacks",     cost_type: "Expense",       stage_num: 99 },
      { code: "SYS-DEP",    stage_name: "Contract Deposits",        cost_type: "Deposits",      stage_num: 99 },
    ];
    for (const cc of costCodes) {
      await supabase.from("cost_codes").upsert(cc, { onConflict: "code" });
    }

    // ── 4. FORMULAS ───────────────────────────────────────────────
    const formulas = [
      { named_range: "POOL_AvgDepth",    description: "Average pool depth",         expression: "(shallowDepth + deepDepth) / 2",                                    unit: "ft" },
      { named_range: "POOL_SqFt",        description: "Pool surface area",          expression: "poolLength * poolWidth",                                              unit: "SF" },
      { named_range: "POOL_Perimeter",   description: "Pool perimeter",             expression: "2 * (poolLength + poolWidth)",                                        unit: "LF" },
      { named_range: "CALC_PoolGallons", description: "Pool volume in gallons",     expression: "poolLength * poolWidth * avgDepth * 7.48",                            unit: "gal" },
      { named_range: "CALC_GuniteCY",    description: "Gunite/shotcrete volume",    expression: "((perimeter * avgDepth * 0.5) + (sqft * (4/12))) / 27",              unit: "CY" },
      { named_range: "CALC_ExcavCY",     description: "Excavation volume",          expression: "((poolLength + 6) * (poolWidth + 6) * (avgDepth + 2)) / 27",         unit: "CY" },
      { named_range: "CALC_HaulLoads",   description: "Haul-away truck loads",      expression: "ceil(excavCY / 14)",                                                  unit: "loads" },
      { named_range: "CALC_RebarSticks", description: "Rebar stick count",          expression: "ceil(poolWidth / 2.5) + 1 + ceil(poolLength / 2.5) + 1",             unit: "EA" },
      { named_range: "CALC_RebarLF",     description: "Total rebar linear feet",    expression: "rebarSticks * 20",                                                    unit: "LF" },
      { named_range: "CALC_PlumbingLF",  description: "Plumbing pipe total",        expression: "perimeter * 1.5",                                                     unit: "LF" },
      { named_range: "SPA_Exists",       description: "Spa boolean (0 or 1)",       expression: "spaSelection > 0 ? 1 : 0",                                            unit: "bool" },
      { named_range: "CALC_InteriorSF",  description: "Interior finish sq ft",      expression: "poolSqft + (spaExists ? spaLength * spaWidth : 0)",                   unit: "SF" },
      { named_range: "CALC_TileSF",      description: "Waterline tile area",        expression: "perimeter * 1",                                                       unit: "SF" },
      { named_range: "CALC_CopingLF",    description: "Coping linear feet",         expression: "perimeter + (spaExists ? 2 * (spaLength + spaWidth) : 0)",            unit: "LF" },
      { named_range: "CALC_FenceLF",     description: "Temporary fence",            expression: "perimeter * 1.2",                                                     unit: "LF" },
      { named_range: "CALC_SpaCY",       description: "Spa shotcrete volume",       expression: "spaExists ? ((2*(spaL+spaW)*spaD*0.5)+(spaL*spaW*(4/12)))/27 : 0",   unit: "CY" },
      { named_range: "CALC_PMFee",       description: "Project management fee",     expression: "bomNonOverheadTotal * 0.08",                                          unit: "$" },
      { named_range: "BOM_ExtCost",      description: "BOM line extended cost",     expression: "unitCost * quantity",                                                  unit: "$" },
      { named_range: "BOM_SellPrice",    description: "BOM line sell price",        expression: "extCost / (1 - markupPct)",                                            unit: "$" },
      { named_range: "BOM_TotalCost",    description: "BOM total cost (T0 only)",   expression: "SUM(all T0 extCost)",                                                 unit: "$" },
      { named_range: "BOM_TotalSell",    description: "BOM total sell (T0 only)",   expression: "SUM(all T0 sellPrice)",                                                unit: "$" },
    ];
    for (const f of formulas) {
      await supabase.from("formulas").upsert(f, { onConflict: "named_range" });
    }

    // ── 5. SKUS ───────────────────────────────────────────────────
    const skus = [
      { code: "SKU-MAT-017", name: "Permit — Pool Construction",           vendor_name: "Government",             uom: "LS",   unit_cost: 1200,  markup_pct: 0.60, cost_code: "01-PREP",  fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-018", name: "Inspection Fees — City/County",        vendor_name: "Government",             uom: "LS",   unit_cost: 650,   markup_pct: 0.60, cost_code: "01-PREP",  fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-020", name: "Safety Fence — 4ft mesh (per LF)",     vendor_name: "Local Supplier",         uom: "LF",   unit_cost: 22,    markup_pct: 0.60, cost_code: "01-FENCE", fixed_var: "VARIABLE", formula_ref: "CALC_FenceLF" },
      { code: "SKU-OVH-001", name: "Project Management Fee (8%)",          vendor_name: "In-House",               uom: "LS",   unit_cost: null,  markup_pct: 0.60, cost_code: "01-PREP",  fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-OVH-002", name: "1-Year Warranty Bond",                 vendor_name: "Insurance",              uom: "LS",   unit_cost: 350,   markup_pct: 0.60, cost_code: "01-PREP",  fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-014", name: "Excavation — Machine Dig (per CY)",    vendor_name: "Excavation Sub",         uom: "CY",   unit_cost: 32,    markup_pct: 0.60, cost_code: "02-DIG",   fixed_var: "VARIABLE", formula_ref: "CALC_ExcavCY" },
      { code: "SKU-MAT-015", name: "Haul-Away — Excess Dirt (per load)",   vendor_name: "Haul-Away Co",           uom: "LOAD", unit_cost: 385,   markup_pct: 0.60, cost_code: "02-DIG",   fixed_var: "VARIABLE", formula_ref: "CALC_HaulLoads" },
      { code: "SKU-MAT-002", name: "Rebar — #4 Grade 60 20ft sticks",      vendor_name: "SCP Distributors",       uom: "EA",   unit_cost: 18.50, markup_pct: 0.60, cost_code: "03-STL",   fixed_var: "VARIABLE", formula_ref: "CALC_RebarSticks" },
      { code: "SKU-LAB-001", name: "Steel Installation Labor (per LF)",    vendor_name: "In-House",               uom: "LF",   unit_cost: 2.50,  markup_pct: 0.60, cost_code: "03-STL",   fixed_var: "VARIABLE", formula_ref: "CALC_RebarLF" },
      { code: "SKU-MAT-001", name: "Shotcrete / Gunite (per CY)",          vendor_name: "SCP Distributors",       uom: "CY",   unit_cost: 285,   markup_pct: 0.60, cost_code: "06-GUN",   fixed_var: "VARIABLE", formula_ref: "CALC_GuniteCY" },
      { code: "SKU-MAT-003", name: "PVC Pipe — 2in Sch40 (per LF)",       vendor_name: "SCP Distributors",       uom: "LF",   unit_cost: 1.85,  markup_pct: 0.60, cost_code: "04-PLUMB", fixed_var: "VARIABLE", formula_ref: "CALC_PlumbingLF" },
      { code: "SKU-MAT-007", name: "PVC Fittings — 2in bulk kit",          vendor_name: "SCP Distributors",       uom: "LS",   unit_cost: 185,   markup_pct: 0.60, cost_code: "04-PLUMB", fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-004", name: "Pool Skimmer — Hayward SP1091LX",      vendor_name: "Hayward",                uom: "EA",   unit_cost: 95,    markup_pct: 0.60, cost_code: "04-PLUMB", fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-005", name: "Main Drain — VGB Dual Hayward",        vendor_name: "Hayward",                uom: "EA",   unit_cost: 145,   markup_pct: 0.60, cost_code: "04-PLUMB", fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-006", name: "Return Jets — 3/4in eyeball (each)",   vendor_name: "SCP Distributors",       uom: "EA",   unit_cost: 22,    markup_pct: 0.60, cost_code: "04-PLUMB", fixed_var: "VARIABLE" },
      { code: "SKU-LAB-002", name: "Plumbing Rough-In Labor (per LF)",     vendor_name: "In-House",               uom: "LF",   unit_cost: 4.50,  markup_pct: 0.60, cost_code: "04-PLUMB", fixed_var: "VARIABLE", formula_ref: "CALC_PlumbingLF" },
      { code: "SKU-LAB-007", name: "Electrical — Bond + Equipment Circuits",vendor_name: "Perfect Catch Electric", uom: "LS",   unit_cost: 1850,  markup_pct: 0.60, cost_code: "05-ELC",   fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-LAB-008", name: "Electrical — Automation Wiring",        vendor_name: "Perfect Catch Electric", uom: "LS",   unit_cost: 650,   markup_pct: 0.60, cost_code: "05-ELC",   fixed_var: "FIXED",    default_qty: 0 },
      { code: "SKU-MAT-019", name: "Spa — Gunite Add-On (per CY)",          vendor_name: "SCP Distributors",       uom: "CY",   unit_cost: 285,   markup_pct: 0.60, cost_code: "06-GUN",   fixed_var: "VARIABLE", formula_ref: "CALC_SpaCY" },
      { code: "SKU-EQP-009", name: "Spa Blower — Pentair 1.5HP",            vendor_name: "Pentair",                uom: "EA",   unit_cost: 320,   markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-EQP-001", name: "VS Pump — Pentair IntelliFlo3 1.5HP",   vendor_name: "Pentair",                uom: "EA",   unit_cost: 950,   markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 0 },
      { code: "SKU-EQP-002", name: "VS Pump — Pentair IntelliFlo3 2.0HP",   vendor_name: "Pentair",                uom: "EA",   unit_cost: 1080,  markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-EQP-003", name: "Cartridge Filter — Pentair CCP520",     vendor_name: "Pentair",                uom: "EA",   unit_cost: 480,   markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-EQP-004", name: "Salt Chlorine Gen — Pentair IntelliChlor",vendor_name:"Pentair",               uom: "EA",   unit_cost: 620,   markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 0 },
      { code: "SKU-EQP-005", name: "LED Pool Light — Hayward ColorLogic 4.0",vendor_name:"Hayward",               uom: "EA",   unit_cost: 285,   markup_pct: 0.50, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 0 },
      { code: "SKU-EQP-006", name: "Automation — Pentair IntelliCenter",     vendor_name: "Pentair",               uom: "EA",   unit_cost: 1850,  markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 0 },
      { code: "SKU-EQP-007", name: "Heat Pump — Hayward HeatPro 110k BTU",   vendor_name: "Hayward",               uom: "EA",   unit_cost: 2400,  markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 0 },
      { code: "SKU-EQP-008", name: "Pool Cleaner — Pentair Prowler 920",     vendor_name: "Pentair",               uom: "EA",   unit_cost: 680,   markup_pct: 0.45, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-LAB-005", name: "Equipment Set Labor — Pump/Filter/SWG",  vendor_name: "In-House",              uom: "LS",   unit_cost: 480,   markup_pct: 0.60, cost_code: "08-EQP",   fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-016", name: "Pool Chemical Startup Kit",              vendor_name: "SCP Distributors",      uom: "LS",   unit_cost: 285,   markup_pct: 0.60, cost_code: "10-CHEM",  fixed_var: "FIXED",    default_qty: 1 },
      { code: "SKU-MAT-008", name: "Waterline Tile — 6x6 (per SF)",          vendor_name: "Pool Tile Warehouse",   uom: "SF",   unit_cost: 8.50,  markup_pct: 0.50, cost_code: "07-TIL",   fixed_var: "VARIABLE", formula_ref: "CALC_TileSF" },
      { code: "SKU-MAT-009", name: "Coping — Travertine 12x12 (per LF)",     vendor_name: "Pool Tile Warehouse",   uom: "LF",   unit_cost: 32,    markup_pct: 0.50, cost_code: "07-COP",   fixed_var: "VARIABLE", formula_ref: "CALC_CopingLF" },
      { code: "SKU-MAT-010", name: "Coping — Travertine 12x24 Premium (per LF)", vendor_name: "Pool Tile Warehouse", uom: "LF", unit_cost: 42,   markup_pct: 0.50, cost_code: "07-COP",   fixed_var: "VARIABLE", default_qty: 0 },
    ];
    for (const s of skus) {
      await supabase.from("skus").upsert(s, { onConflict: "code" });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      counts: {
        vendors: vendors.length,
        costCodes: costCodes.length,
        formulas: formulas.length,
        skus: skus.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "POST to /api/seed to seed the database with LIV Pools reference data",
    seeds: ["app_settings", "vendors (24)", "cost_codes (27)", "formulas (21)", "skus (33)"],
  });
}
