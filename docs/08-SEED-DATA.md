# 08 — SEED DATA

> All reference data extracted from the Excel workbook for database seeding.  
> Run with `npx prisma db seed` to populate the database.

---

## SEED ORDER

Due to foreign key constraints, seed in this order:

1. AppSettings (singleton)
2. Vendors
3. CostCodes
4. Formulas
5. SKUs (depends on Vendor + CostCode)
6. Kits
7. KitSku (junction)
8. Assemblies
9. AssemblyKit (junction)
10. SuperAssemblies
11. SuperAssemblyAssembly (junction)

---

## 1. APP SETTINGS

```typescript
const appSettings = {
  id: "singleton",
  companyName: "LIV Pools LLC",
  cityStateZip: "Clearwater, FL 34619",
  license: "CPC1459998",
  phone: "(727) 555-0100",
  email: "info@livpools.com",
  defaultMarkup: 1.50,
  taxRate: 0.0875,
  depositPct: 0.10,
  shellPct: 0.45,
  equipmentPct: 0.20,
  finalPct: 0.25,
  targetMargin: 0.35,
  minMargin: 0.25,
  roundUp: true,
  roundGranularity: 50
}
```

---

## 2. VENDORS

```typescript
const vendors = [
  { name: "Horner Express",       category: "SUPPLIER" },
  { name: "Home Depot",           category: "SUPPLIER" },
  { name: "SCP",                  category: "SUPPLIER" },
  { name: "Tile and Paver Source", category: "SUPPLIER" },
  { name: "Baystone",             category: "SUPPLIER" },
  { name: "Blaze",                category: "SUPPLIER" },
  { name: "Big Horn",             category: "SUPPLIER" },
  { name: "Gulf Stream",          category: "SUPPLIER" },
  { name: "Pebble Pros",          category: "SUBCONTRACTOR" },
  // Additional vendors used in KIT/BOM that need to exist:
  { name: "Government",           category: "SUPPLIER" },
  { name: "Local Supplier",       category: "SUPPLIER" },
  { name: "In-House",             category: "SUPPLIER" },
  { name: "Insurance",            category: "SUPPLIER" },
  { name: "Excavation Sub",       category: "SUBCONTRACTOR" },
  { name: "Haul-Away Co",         category: "SUBCONTRACTOR" },
  { name: "SCP Distributors",     category: "SUPPLIER" },
  { name: "Hayward",              category: "SUPPLIER" },
  { name: "Pentair",              category: "SUPPLIER" },
  { name: "Perfect Catch Electric", category: "SUBCONTRACTOR" },
  { name: "Pool Tile Warehouse",  category: "SUPPLIER" },
  { name: "NPT",                  category: "SUPPLIER" },
  { name: "Pebble Technology",    category: "SUPPLIER" },
  { name: "Tile Sub",             category: "SUBCONTRACTOR" },
  { name: "Finish Sub",           category: "SUBCONTRACTOR" },
]
```

---

## 3. COST CODES

```typescript
const costCodes = [
  { code: "00-UNCAT",    stageName: "Uncategorized",              costType: "Other",         stageNum: 0,  jtCode: 1000, jtId: "22Ns3escGeqF", description: "Unassigned or miscellaneous costs" },
  { code: "00-ADMIN",    stageName: "Admin",                      costType: "Expense",       stageNum: 0,  jtCode: 1100, jtId: "22Ns3hqraeBU", description: "Administrative costs, insurance, office" },
  { code: "01-PREP",     stageName: "Permitting & Inspections",   costType: "Expense",       stageNum: 1,  jtCode: 1200, jtId: "22Ns3escGeqG", description: "Building permits, inspection fees, HOA approval" },
  { code: "01-ENG",      stageName: "Engineering",                costType: "Subcontractor", stageNum: 1,  jtCode: 1300, jtId: "22Ns3i8CKqqV", description: "Structural engineering, soil reports" },
  { code: "01-FENCE",    stageName: "General Job Site",           costType: "Expense",       stageNum: 1,  jtCode: 1400, jtId: "22Nx69EJJgSf", description: "Temp fence, porta-john, dumpster, mobilization" },
  { code: "01-FREIGHT",  stageName: "Freight & Deliveries",       costType: "Expense",       stageNum: 1,  jtCode: 1500, jtId: "22NxTqYFTv4T", description: "Material delivery charges, crane rental" },
  { code: "01-DEMO",     stageName: "Demolition",                 costType: "Subcontractor", stageNum: 1,  jtCode: 1600, jtId: "22Ns3escGeqH", description: "Demo of existing pool, structures, concrete" },
  { code: "01-LAYOUT",   stageName: "Layout",                     costType: "Labor",         stageNum: 1,  jtCode: 1700, jtId: "22PSWTPh8eDY", description: "Pool layout, survey stake-out, dig marks" },
  { code: "02-DIG",      stageName: "Excavation",                 costType: "Subcontractor", stageNum: 2,  jtCode: 1800, description: "Machine excavation, haul-away, over-dig" },
  { code: "03-STL",      stageName: "Steel / Rebar",              costType: "Materials",     stageNum: 3,  jtCode: 1900, description: "Rebar cage — pool + spa" },
  { code: "06-GUN",      stageName: "Shell / Shotcrete",          costType: "Subcontractor", stageNum: 6,  jtCode: 1900, description: "Shotcrete/gunite shell — pool + spa" },
  { code: "06-GAS",      stageName: "Gas",                        costType: "Subcontractor", stageNum: 6,  jtCode: 2000, description: "Gas line for pool heater" },
  { code: "06-GRADE",    stageName: "Grading & Backfill",         costType: "Subcontractor", stageNum: 6,  jtCode: 2100, description: "Backfill, grading, compaction after shell" },
  { code: "04-PLUMB",    stageName: "Plumbing",                   costType: "Subcontractor", stageNum: 4,  jtCode: 2200, description: "Rough-in plumbing, returns, skimmer, drains" },
  { code: "05-ELC",      stageName: "Electrical",                 costType: "Subcontractor", stageNum: 5,  jtCode: 2300, description: "Pool bond, equipment circuits, lighting, GFCI" },
  { code: "08-EQP",      stageName: "Equipment",                  costType: "Equipment",     stageNum: 8,  jtCode: 2400, description: "Pump, filter, heater, SWG, automation, lights" },
  { code: "07-COP",      stageName: "Coping & Decking Materials", costType: "Materials",     stageNum: 7,  jtCode: 2500, description: "Coping stone, pavers, deck materials" },
  { code: "07-DECK",     stageName: "Deck Install",               costType: "Subcontractor", stageNum: 7,  jtCode: 2600, description: "Deck pour, paver install labor" },
  { code: "07-TIL",      stageName: "Tile & Coping Install",      costType: "Subcontractor", stageNum: 7,  jtCode: 2700, description: "Waterline tile, coping installation labor" },
  { code: "09-FIN",      stageName: "Interior Finish",            costType: "Subcontractor", stageNum: 9,  jtCode: 2800, description: "Plaster, quartz, PebbleTec application" },
  { code: "10-START",    stageName: "Start Up",                   costType: "Labor",         stageNum: 10, jtCode: 2900, description: "Water fill, startup, equipment commissioning" },
  { code: "10-CHEM",     stageName: "Chemicals & Maintenance",    costType: "Materials",     stageNum: 10, jtCode: 3000, description: "Startup chemicals, salt, initial balance" },
  { code: "ADD-LAND",    stageName: "Landscaping",                costType: "Subcontractor", stageNum: 11, jtCode: 3100, description: "Landscaping, sod, irrigation repair" },
  { code: "ADD-KITCH",   stageName: "Outdoor Kitchen",            costType: "Subcontractor", stageNum: 11, jtCode: 3200, description: "Outdoor kitchen, grill island, countertops" },
  { code: "ADD-SCREEN",  stageName: "Screen Enclosure",           costType: "Subcontractor", stageNum: 11, jtCode: 3300, description: "Screen enclosure, cage, rescreening" },
  { code: "SYS-WARR",    stageName: "Warranty & Callbacks",       costType: "Expense",       stageNum: 99, jtCode: 3400, description: "Warranty work, callbacks, punch list" },
  { code: "SYS-DEP",     stageName: "Contract Deposits",          costType: "Deposits",      stageNum: 99, jtCode: 3500, description: "Customer deposit tracking" },
]
```

---

## 4. FORMULAS

```typescript
const formulas = [
  { namedRange: "POOL_AvgDepth",    description: "Average pool depth",         expression: "(shallowDepth + deepDepth) / 2",                                    unit: "ft" },
  { namedRange: "POOL_SqFt",        description: "Pool surface area",          expression: "poolLength * poolWidth",                                              unit: "SF" },
  { namedRange: "POOL_Perimeter",   description: "Pool perimeter",             expression: "2 * (poolLength + poolWidth)",                                        unit: "LF" },
  { namedRange: "CALC_PoolGallons", description: "Pool volume in gallons",     expression: "poolLength * poolWidth * avgDepth * 7.48",                            unit: "gal",   notes: "7.48 gal/CF" },
  { namedRange: "CALC_GuniteCY",    description: "Gunite/shotcrete volume",    expression: "((perimeter * avgDepth * 0.5) + (sqft * (4/12))) / 27",              unit: "CY",    notes: "Walls 6in + floor 4in" },
  { namedRange: "CALC_ExcavCY",     description: "Excavation volume",          expression: "((poolLength + 6) * (poolWidth + 6) * (avgDepth + 2)) / 27",         unit: "CY",    notes: "3ft overdig each side, 2ft deep" },
  { namedRange: "CALC_HaulLoads",   description: "Haul-away truck loads",      expression: "ceil(excavCY / 14)",                                                  unit: "loads", notes: "14 CY per load" },
  { namedRange: "CALC_RebarSticks", description: "Rebar stick count",          expression: "ceil(poolWidth / 2.5) + 1 + ceil(poolLength / 2.5) + 1",             unit: "EA",    notes: "20ft sticks, 30in OC grid" },
  { namedRange: "CALC_RebarLF",     description: "Total rebar linear feet",    expression: "rebarSticks * 20",                                                    unit: "LF" },
  { namedRange: "CALC_PlumbingLF",  description: "Plumbing pipe total",        expression: "perimeter * 1.5",                                                     unit: "LF",    notes: "1.5x perimeter average" },
  { namedRange: "SPA_Exists",       description: "Spa boolean (0 or 1)",       expression: "spaSelection > 0 ? 1 : 0",                                            unit: "bool",  notes: "Guards against SpaPresent values 2-3" },
  { namedRange: "CALC_InteriorSF",  description: "Interior finish sq ft",      expression: "poolSqft + (spaExists ? spaLength * spaWidth : 0)",                   unit: "SF",    notes: "Includes spa if present" },
  { namedRange: "CALC_TileSF",      description: "Waterline tile area",        expression: "perimeter * 1",                                                       unit: "SF",    notes: "1ft band at waterline" },
  { namedRange: "CALC_CopingLF",    description: "Coping linear feet",         expression: "perimeter + (spaExists ? 2 * (spaLength + spaWidth) : 0)",            unit: "LF",    notes: "Spa perimeter only if spa exists" },
  { namedRange: "CALC_FenceLF",     description: "Temporary fence",            expression: "perimeter * 1.2",                                                     unit: "LF",    notes: "20% safety buffer" },
  { namedRange: "CALC_SpaCY",       description: "Spa shotcrete volume",       expression: "spaExists ? ((2*(spaL+spaW)*spaD*0.5)+(spaL*spaW*(4/12)))/27 : 0",   unit: "CY",    notes: "Zero if no spa" },
  { namedRange: "CALC_PMFee",       description: "Project management fee",     expression: "bomNonOverheadTotal * 0.08",                                          unit: "$",     notes: "8% of non-overhead cost base" },
  { namedRange: "BOM_ExtCost",      description: "BOM line extended cost",     expression: "unitCost * quantity",                                                  unit: "$",     notes: "Col L = Col G * Col K" },
  { namedRange: "BOM_SellPrice",    description: "BOM line sell price",        expression: "extCost / (1 - markupPct)",                                            unit: "$",     notes: "Col N = Col L / (1 - Col M)" },
  { namedRange: "BOM_TotalCost",    description: "BOM total cost (T0 only)",   expression: "SUM(all T0 extCost)",                                                 unit: "$" },
  { namedRange: "BOM_TotalSell",    description: "BOM total sell (T0 only)",   expression: "SUM(all T0 sellPrice)",                                                unit: "$" },
]
```

---

## 5. SELECTION OPTIONS

```typescript
const selectionOptions = {
  INTERIOR_FINISH: [
    { index: 0, name: "Standard Plaster",  costDelta: 0,     notes: "White plaster — entry level" },
    { index: 1, name: "Quartz Finish",     costDelta: 3.60,  notes: "Quartz blend — most popular" },
    { index: 2, name: "Pebble Tec",        costDelta: 8.30,  notes: "Pebble aggregate — premium" },
    { index: 3, name: "Pebble Sheen",      costDelta: 10.50, notes: "Fine pebble — luxury option" },
  ],
  COPING: [
    { index: 0, name: "Travertine 12x12",      costDelta: 0,    notes: "Standard travertine" },
    { index: 1, name: "Travertine 12x24",      costDelta: 10,   notes: "Larger format — per LF" },
    { index: 2, name: "Cantilever Concrete",   costDelta: -5,   notes: "Poured cantilever coping" },
    { index: 3, name: "Natural Bullnose Tile", costDelta: 15,   notes: "Porcelain bullnose" },
  ],
  EQUIPMENT: [
    { index: 0, name: "Pentair IntelliFlo3 1.5HP", costDelta: 0,    notes: "Standard VS pump" },
    { index: 1, name: "Pentair IntelliFlo3 2.0HP", costDelta: 130,  notes: "High flow" },
    { index: 2, name: "Jandy JEP VS 1.85HP",      costDelta: -30,  notes: "Alt brand" },
    { index: 3, name: "Hayward MaxFlo VS 1.65HP",  costDelta: -50,  notes: "Budget VS pump" },
  ],
  SANITIZATION: [
    { index: 0, name: "Chlorine Only (no SWG)",  costDelta: 0,    notes: "Traditional chlorine" },
    { index: 1, name: "Salt System IC40",        costDelta: 620,  notes: "Pentair IntelliChlor IC40" },
    { index: 2, name: "Salt System IC60",        costDelta: 820,  notes: "IC60 — larger pools" },
    { index: 3, name: "UV + Salt Combo",         costDelta: 1100, notes: "UV sanitizer + IC40" },
  ],
  AUTOMATION: [
    { index: 0, name: "Manual Controls",         costDelta: 0,    notes: "Timer + basic switches" },
    { index: 1, name: "Pentair IntelliCenter",   costDelta: 1850, notes: "Full automation" },
    { index: 2, name: "Jandy iAqualink",         costDelta: 1650, notes: "Alt automation system" },
    { index: 3, name: "Hayward OmniLogic",       costDelta: 1750, notes: "Alt automation system" },
  ],
  HEATING: [
    { index: 0, name: "No Heater",               costDelta: 0,    notes: "Unheated pool" },
    { index: 1, name: "Heat Pump 110k BTU",      costDelta: 2400, notes: "Hayward HeatPro — efficient" },
    { index: 2, name: "Heat Pump 140k BTU",      costDelta: 2900, notes: "Larger pools" },
    { index: 3, name: "Gas Heater 400k BTU",     costDelta: 1800, notes: "Fast heat — higher operating cost" },
  ],
  LIGHTING: [
    { index: 0, name: "No Lights",               costDelta: 0,    notes: "Unlit pool" },
    { index: 1, name: "1 LED Light",             costDelta: 285,  notes: "Single color-changing LED" },
    { index: 2, name: "2 LED Lights",            costDelta: 570,  notes: "Two lights — larger pools" },
    { index: 3, name: "2 LED + Spa Light",       costDelta: 855,  notes: "Full lighting package" },
  ],
  SPA: [
    { index: 0, name: "Pool Only",               costDelta: 0,     notes: "No attached spa" },
    { index: 1, name: "Attached Spa (6x8)",      costDelta: 8500,  notes: "Standard attached spa" },
    { index: 2, name: "Attached Spa (8x8)",      costDelta: 10500, notes: "Larger spa — seats 6-8" },
    { index: 3, name: "Raised Spillway Spa",     costDelta: 12000, notes: "Raised spa with spillway" },
  ],
}
```

---

## 6. KEY BOM SKUS (from 13-BOM-ENGINE)

These are the 40+ SKUs that appear in the active BOM with their quantities and pricing:

```typescript
const bomSkus = [
  // Pre-Construction
  { code: "SKU-MAT-017", name: "Permit — Pool Construction",          vendor: "Government",        uom: "LS",   unitCost: 1200,  markupPct: 0.60, costCode: "01-PREP",  fixedVar: "FIXED",    defaultQty: 1 },
  { code: "SKU-MAT-018", name: "Inspection Fees — City/County",       vendor: "Government",        uom: "LS",   unitCost: 650,   markupPct: 0.60, costCode: "01-PREP",  fixedVar: "FIXED",    defaultQty: 1 },
  { code: "SKU-MAT-020", name: "Safety Fence — 4ft mesh (per LF)",    vendor: "Local Supplier",    uom: "LF",   unitCost: 22,    markupPct: 0.60, costCode: "01-FENCE", fixedVar: "VARIABLE", formulaRef: "CALC_FenceLF" },
  { code: "SKU-OVH-001", name: "Project Management Fee (8%)",         vendor: "In-House",          uom: "LS",   unitCost: null,  markupPct: 0.60, costCode: "01-PREP",  fixedVar: "FIXED",    defaultQty: 1, notes: "Calculated from CALC_PMFee" },
  { code: "SKU-OVH-002", name: "1-Year Warranty Bond",                vendor: "Insurance",         uom: "LS",   unitCost: 350,   markupPct: 0.60, costCode: "01-PREP",  fixedVar: "FIXED",    defaultQty: 1 },
  
  // Excavation
  { code: "SKU-MAT-014", name: "Excavation — Machine Dig (per CY)",   vendor: "Excavation Sub",    uom: "CY",   unitCost: 32,    markupPct: 0.60, costCode: "02-DIG",   fixedVar: "VARIABLE", formulaRef: "CALC_ExcavCY" },
  { code: "SKU-MAT-015", name: "Haul-Away — Excess Dirt (per load)",   vendor: "Haul-Away Co",      uom: "LOAD", unitCost: 385,   markupPct: 0.60, costCode: "02-DIG",   fixedVar: "VARIABLE", formulaRef: "CALC_HaulLoads" },
  
  // Shell Construction
  { code: "SKU-MAT-002", name: "Rebar — #4 Grade 60 20ft sticks",     vendor: "SCP Distributors",  uom: "EA",   unitCost: 18.50, markupPct: 0.60, costCode: "03-STL",   fixedVar: "VARIABLE", formulaRef: "CALC_RebarSticks" },
  { code: "SKU-LAB-001", name: "Steel Installation Labor (per LF)",   vendor: "In-House",          uom: "LF",   unitCost: 2.50,  markupPct: 0.60, costCode: "03-STL",   fixedVar: "VARIABLE", formulaRef: "CALC_RebarLF" },
  { code: "SKU-MAT-001", name: "Shotcrete / Gunite (per CY)",         vendor: "SCP Distributors",  uom: "CY",   unitCost: 285,   markupPct: 0.60, costCode: "06-GUN",   fixedVar: "VARIABLE", formulaRef: "CALC_GuniteCY" },
  
  // Plumbing
  { code: "SKU-MAT-003", name: "PVC Pipe — 2in Sch40 (per LF)",      vendor: "SCP Distributors",  uom: "LF",   unitCost: 1.85,  markupPct: 0.60, costCode: "04-PLUMB", fixedVar: "VARIABLE", formulaRef: "CALC_PlumbingLF" },
  { code: "SKU-MAT-007", name: "PVC Fittings — 2in bulk kit",         vendor: "SCP Distributors",  uom: "LS",   unitCost: 185,   markupPct: 0.60, costCode: "04-PLUMB", fixedVar: "FIXED",    defaultQty: 1 },
  { code: "SKU-MAT-004", name: "Pool Skimmer — Hayward SP1091LX",     vendor: "Hayward",           uom: "EA",   unitCost: 95,    markupPct: 0.60, costCode: "04-PLUMB", fixedVar: "FIXED",    defaultQty: 1 },
  { code: "SKU-MAT-005", name: "Main Drain — VGB Dual Hayward",       vendor: "Hayward",           uom: "EA",   unitCost: 145,   markupPct: 0.60, costCode: "04-PLUMB", fixedVar: "FIXED",    defaultQty: 1 },
  { code: "SKU-MAT-006", name: "Return Jets — 3/4in eyeball (each)",  vendor: "SCP Distributors",  uom: "EA",   unitCost: 22,    markupPct: 0.60, costCode: "04-PLUMB", fixedVar: "VARIABLE" },
  { code: "SKU-LAB-002", name: "Plumbing Rough-In Labor (per LF)",    vendor: "In-House",          uom: "LF",   unitCost: 4.50,  markupPct: 0.60, costCode: "04-PLUMB", fixedVar: "VARIABLE", formulaRef: "CALC_PlumbingLF" },
  
  // Electrical
  { code: "SKU-LAB-007", name: "Electrical — Bond + Equipment Circuits",   vendor: "Perfect Catch Electric", uom: "LS", unitCost: 1850, markupPct: 0.60, costCode: "05-ELC", fixedVar: "FIXED", defaultQty: 1 },
  { code: "SKU-LAB-008", name: "Electrical — Automation Wiring",           vendor: "Perfect Catch Electric", uom: "LS", unitCost: 650,  markupPct: 0.60, costCode: "05-ELC", fixedVar: "FIXED", defaultQty: 0, notes: "Enabled by automation selection" },
  
  // Spa
  { code: "SKU-MAT-019", name: "Spa — Gunite Add-On (per CY)",       vendor: "SCP Distributors",  uom: "CY",   unitCost: 285,   markupPct: 0.60, costCode: "06-GUN",   fixedVar: "VARIABLE", formulaRef: "CALC_SpaCY" },
  { code: "SKU-EQP-009", name: "Spa Blower — Pentair 1.5HP",         vendor: "Pentair",           uom: "EA",   unitCost: 320,   markupPct: 0.45, costCode: "08-EQP",   fixedVar: "FIXED",    defaultQty: 1 },
  
  // Equipment
  { code: "SKU-EQP-001", name: "VS Pump — Pentair IntelliFlo3 1.5HP", vendor: "Pentair",  uom: "EA", unitCost: 950,  markupPct: 0.45, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 0 },
  { code: "SKU-EQP-002", name: "VS Pump — Pentair IntelliFlo3 2.0HP", vendor: "Pentair",  uom: "EA", unitCost: 1080, markupPct: 0.45, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 1 },
  { code: "SKU-EQP-003", name: "Cartridge Filter — Pentair CCP520",   vendor: "Pentair",  uom: "EA", unitCost: 480,  markupPct: 0.45, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 1 },
  { code: "SKU-EQP-004", name: "Salt Chlorine Gen — Pentair IntelliChlor", vendor: "Pentair", uom: "EA", unitCost: 620, markupPct: 0.45, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 0 },
  { code: "SKU-EQP-005", name: "LED Pool Light — Hayward ColorLogic 4.0", vendor: "Hayward", uom: "EA", unitCost: 285, markupPct: 0.50, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 0 },
  { code: "SKU-EQP-006", name: "Automation — Pentair IntelliCenter",  vendor: "Pentair",  uom: "EA", unitCost: 1850, markupPct: 0.45, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 0 },
  { code: "SKU-EQP-007", name: "Heat Pump — Hayward HeatPro 110k BTU", vendor: "Hayward", uom: "EA", unitCost: 2400, markupPct: 0.45, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 0 },
  { code: "SKU-EQP-008", name: "Pool Cleaner — Pentair Prowler 920",  vendor: "Pentair",  uom: "EA", unitCost: 680,  markupPct: 0.45, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 1 },
  { code: "SKU-LAB-005", name: "Equipment Set Labor — Pump/Filter/SWG", vendor: "In-House", uom: "LS", unitCost: 480, markupPct: 0.60, costCode: "08-EQP", fixedVar: "FIXED", defaultQty: 1 },
  { code: "SKU-MAT-016", name: "Pool Chemical Startup Kit",           vendor: "SCP Distributors",  uom: "LS",   unitCost: 285,   markupPct: 0.60, costCode: "10-CHEM",  fixedVar: "FIXED",    defaultQty: 1 },
  
  // Finishes
  { code: "SKU-MAT-008", name: "Waterline Tile — 6x6 (per SF)",      vendor: "Pool Tile Warehouse", uom: "SF", unitCost: 8.50, markupPct: 0.50, costCode: "07-TIL", fixedVar: "VARIABLE", formulaRef: "CALC_TileSF" },
  { code: "SKU-MAT-009", name: "Coping — Travertine 12x12 (per LF)", vendor: "Pool Tile Warehouse", uom: "LF", unitCost: 32,   markupPct: 0.50, costCode: "07-COP", fixedVar: "VARIABLE", formulaRef: "CALC_CopingLF" },
  { code: "SKU-MAT-010", name: "Coping — Travertine 12x24 Premium (per LF)", vendor: "Pool Tile Warehouse", uom: "LF", unitCost: 42, markupPct: 0.50, costCode: "07-COP", fixedVar: "VARIABLE", defaultQty: 0 },
]
```

> **Note:** The full 428 SKUs from 02-SKU-MASTER include ~300+ plumbing fittings. These should be imported from the Master Catalog Excel file separately. The seed data above covers the ~40 SKUs that appear in the active BOM.

---

## SEED SCRIPT LOCATION

```
prisma/seed.ts
```

Run with: `npx prisma db seed`

---

*Next: See `09-API-REFERENCE.md` for complete API documentation.*
