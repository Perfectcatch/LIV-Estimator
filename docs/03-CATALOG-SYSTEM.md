# 03 — CATALOG SYSTEM

> The 4-tier master catalog: SKU → Kit → Assembly → Super-Assembly.  
> This is the backbone of the entire estimating system.

---

## TIER DEFINITIONS

| Tier | Code | What It Is | Example | Count |
|------|------|-----------|---------|-------|
| **T0 — SKU** | `SKU-MAT-001` | Individual purchasable item | "Rebar — #4 Grade 60 20ft sticks" | 428 |
| **T1 — Kit** | `K-PERMITS` | Vendor-grouped bundle of SKUs | "Permits & Inspections" (2 SKUs) | 30 |
| **T2 — Assembly** | `A-PRECONSTRUCTION` | Customer-facing line item (group of Kits) | "Pre-Construction & Permits" (4 Kits) | 13 |
| **T3 — Super-Assembly** | `SA-BASE-POOL` | Proposal section / payment milestone | "Base Pool & Spa" (6 Assemblies) | 3 |

---

## SKU MASTER (T0)

### Data Model

Every SKU has these properties (from `02-SKU-MASTER` columns):

| Field | Type | Example | Purpose |
|-------|------|---------|---------|
| `code` | String (unique) | `SKU-MAT-017` | System identifier |
| `name` | String | "Permit — Pool Construction" | Display name |
| `costType` | Enum | Materials / Labor / Equipment / Overhead | Determines budget category |
| `category` | String | PLUMBING, EQUIPMENT, INTERIOR, STRUCTURAL, KITCHEN | Groups for browsing |
| `detail` | String? | "Standard residential" | Sub-category notes |
| `vendor` | FK → Vendor | SCP, Pentair, Hayward | Primary vendor |
| `uom` | String | EA, LF, SF, CY, LS, LOAD | Unit of measure |
| `unitCost` | Decimal | $285.00 | Cost from vendor |
| `markupPct` | Decimal | 0.60 (60%) | Default markup percentage |
| `costCode` | FK → CostCode | "04-PLUMB" | Budget tracking code |
| `stage` | String | "Plumbing" | Construction stage name |
| `fixedVar` | Enum | FIXED / VARIABLE | Fixed qty or formula-driven |
| `defaultQty` | Decimal? | 1 | Default quantity for fixed items |
| `formulaRef` | String? | `CALC_RebarSticks` | Named range for variable qty |
| `altVendor1/2` | String? | "Horner Express" | Alternate vendor options |
| `altCost1/2` | Decimal? | $16.50 | Alternate pricing |

### SKU Code Prefixes

| Prefix | Meaning | Examples |
|--------|---------|---------|
| `SKU-MAT-` | Materials | Pipe, fittings, rebar, tile, coping |
| `SKU-EQP-` | Equipment | Pumps, filters, heaters, automation |
| `SKU-LAB-` | Labor | Plumbing labor, equipment set, steel install |
| `SKU-OVH-` | Overhead | PM fee, warranty bond |

### Category Breakdown

| Category | SKU Count | Types |
|----------|-----------|-------|
| PLUMBING | ~300+ | Caps, elbows, tees, couplings, adapters, valves |
| EQUIPMENT | ~20 | Pumps, filters, SWG, heaters, lights, automation |
| STRUCTURAL | ~10 | Rebar, gunite, excavation |
| INTERIOR | ~10 | Plaster, quartz, pebble finishes |
| KITCHEN | ~50+ | Outdoor kitchen components (Blaze, Big Horn) |

### Two SKU Behavior Types

1. **Fixed SKUs** — Same quantity every pool (e.g., 1 pool permit, 1 filter, 1 PM fee)
2. **Variable SKUs** — Quantity driven by takeoff formulas (e.g., rebar sticks = `CALC_RebarSticks`, pipe LF = `CALC_PlumbingLF`)

---

## KIT MASTER (T1)

### Purpose
Kits group SKUs by vendor/purchase-unit. When you order from a vendor, you order a "kit" — not individual SKUs scattered across assemblies.

### All 30 Kits

| Kit ID | Kit Name | Vendor | SKUs | Parent Assembly |
|--------|----------|--------|------|----------------|
| K-PERMITS | Permits & Inspections | Government | 2 | Pre-Construction & Permits |
| K-SAFETY-FENCE | Safety Fence | Local Supplier | 1 | Pre-Construction & Permits |
| K-PROJECT-MGMT | Project Management | In-House | 1 | Pre-Construction & Permits |
| K-WARRANTY | Warranty Bond | Insurance | 1 | Pre-Construction & Permits |
| K-EXCAVATION | Machine Excavation | Excavation Sub | 1 | Excavation & Earthwork |
| K-HAUL-AWAY | Dirt Haul-Away | Haul-Away Co | 1 | Excavation & Earthwork |
| K-STEEL-MATERIAL | Rebar Material | SCP Distributors | 1 | Shell Construction |
| K-STEEL-LABOR | Steel Installation Labor | In-House | 1 | Shell Construction |
| K-GUNITE | Gunite / Shotcrete | SCP Distributors | 1 | Shell Construction |
| K-PLUMBING-PIPE | PVC Pipe & Fittings | SCP Distributors | 2 | Plumbing Rough-In |
| K-PLUMBING-FIXTURES | Skimmer & Drains | Hayward | 2 | Plumbing Rough-In |
| K-RETURN-JETS | Return Jets | SCP Distributors | 1 | Plumbing Rough-In |
| K-PLUMBING-LABOR | Plumbing Labor | In-House | 1 | Plumbing Rough-In |
| K-ELECTRICAL | Pool Electrical Package | Perfect Catch Electric | 2 | Electrical & Bonding |
| K-SPA-GUNITE | Spa Shell Shotcrete | SCP Distributors | 1 | Spa Construction |
| K-SPA-BLOWER | Spa Blower | Pentair | 1 | Spa Construction |
| K-PUMP-FILTER | Pump & Filter | Pentair | 3 | Circulation System |
| K-SANITIZATION | Salt System | Pentair | 1 | Circulation System |
| K-AUTOMATION | IntelliCenter System | Pentair | 1 | Automation & Controls |
| K-HEATER | Heat Pump | Hayward | 1 | Pool Heating |
| K-LIGHTING | LED Pool Lights | Hayward | 1 | Pool Lighting |
| K-EQP-INSTALL | Equipment Set Labor | In-House | 1 | Equipment Installation |
| K-STARTUP-CHEM | Chemical Startup Kit | SCP Distributors | 1 | Equipment Installation |
| K-CLEANER | Robotic Pool Cleaner | Pentair | 1 | Equipment Installation |
| K-WATERLINE-TILE | Waterline Tile | Pool Tile Warehouse | 1 | Tile & Coping |
| K-COPING | Pool Coping | Pool Tile Warehouse | 2 | Tile & Coping |
| K-TILE-LABOR | Tile & Coping Labor | Tile Sub | 2 | Tile & Coping |
| K-FINISH-NPT | Plaster & Quartz Finish | NPT | 2 | Interior Finish |
| K-FINISH-PEBBLE | Pebble Tec Finish | Pebble Technology | 1 | Interior Finish |
| K-INTERIOR-LABOR | Interior Application Labor | Finish Sub | 1 | Interior Finish |

---

## ASSEMBLY MASTER (T2)

### Purpose
Assemblies are customer-facing groups. These appear on proposals as line items. Each assembly contains 1-4 kits.

### All 13 Assemblies

| Assembly ID | Assembly Name | Kit Count | Super-Assembly |
|-------------|--------------|-----------|---------------|
| A-PRECONSTRUCTION | Pre-Construction & Permits | 4 | Base Pool & Spa |
| A-EXCAVATION | Excavation & Earthwork | 2 | Base Pool & Spa |
| A-SHELL | Shell Construction | 3 | Base Pool & Spa |
| A-PLUMBING | Plumbing Rough-In | 4 | Base Pool & Spa |
| A-ELECTRICAL | Electrical & Bonding | 1 | Base Pool & Spa |
| A-SPA | Spa Construction | 2 | Base Pool & Spa |
| A-CIRCULATION | Circulation System | 2 | Equipment Package |
| A-AUTOMATION | Automation & Controls | 1 | Equipment Package |
| A-HEATING | Pool Heating | 1 | Equipment Package |
| A-LIGHTING | Pool Lighting | 1 | Equipment Package |
| A-EQUIPMENT-SET | Equipment Installation | 3 | Equipment Package |
| A-TILE-COPING | Tile & Coping | 3 | Finishes & Aesthetics |
| A-INTERIOR | Interior Finish | 3 | Finishes & Aesthetics |

---

## SUPER-ASSEMBLY MASTER (T3)

### Purpose
Super-Assemblies are proposal sections and align with payment milestones. There are exactly 3.

| SA ID | SA Name | Assemblies | Cost Code |
|-------|---------|-----------|-----------|
| SA-BASE-POOL | Base Pool & Spa | 6 | 01-PREP |
| SA-EQUIPMENT | Equipment Package | 5 | 08-EQP |
| SA-FINISHES | Finishes & Aesthetics | 2 | 07-TIL |

---

## CATALOG UI FEATURES

### SKU Master Page (`/catalog/skus`)
- **Filterable columns:** Category, Vendor, Cost Type, Stage, Fixed/Var
- **Searchable:** by SKU code and name
- **Sortable:** by any column
- **Inline editing:** unit cost, markup %, notes
- **Bulk import:** CSV upload for new SKUs
- **Vendor alt pricing:** show alt vendor costs in expandable row

### Kit Builder (`/catalog/kits/new` — mirrors 28-ASSEMBLY-BUILDER)
- **Step 1 — Define:** Kit ID, name, vendor label
- **Step 2 — Browse:** Filter SKU catalog by category/vendor/cost type
- **Step 3 — Build:** Select SKUs to add, set sort order
- **Step 4 — Review:** Preview kit composition, total base cost

### Assembly Hierarchy View (`/catalog`)
- **Tree view:** Expandable SA → Assembly → Kit → SKU tree
- **Drag-and-drop:** Reorder kits within assemblies
- **Health indicators:** Show kits without SKUs, assemblies without kits

---

## SELECTION-DRIVEN ITEMS

Some catalog items are **selection-driven** — their inclusion and pricing depends on customer choices in the Selections panel. The 8 selection categories from `11-SELECTIONS`:

| Category | Options | Default | Affects |
|----------|---------|---------|---------|
| Interior Finish | Standard Plaster / Quartz / Pebble Tec / Pebble Sheen | 0 (Standard) | K-FINISH-NPT, K-FINISH-PEBBLE |
| Coping | Travertine 12x12 / 12x24 / Cantilever / Bullnose | 0 (Trav 12x12) | K-COPING |
| Equipment | IntelliFlo 1.5HP / 2.0HP / Jandy JEP / Hayward MaxFlo | 0 (1.5HP) | K-PUMP-FILTER |
| Sanitization | Chlorine Only / Salt IC40 / Salt IC60 / UV+Salt | 0 (Chlorine) | K-SANITIZATION |
| Automation | Manual / IntelliCenter / iAqualink / OmniLogic | 0 (Manual) | K-AUTOMATION |
| Heating | No Heater / 110k BTU / 140k BTU / Gas 400k | 0 (No Heater) | K-HEATER |
| Lighting | No Lights / 1 LED / 2 LED / 2 LED + Spa | 0 (No Lights) | K-LIGHTING |
| Spa | Pool Only / 6x8 Spa / 8x8 Spa / Raised Spillway | 0 (Pool Only) | K-SPA-GUNITE, K-SPA-BLOWER |

When a selection is made, the BOM Engine adjusts which SKUs are included and at what quantities. Option index 0 is always the base/no-cost option.

---

*Next: See `04-ESTIMATE-WORKFLOW.md` for the full estimate creation flow.*
