# LIV POOLS — CRM ESTIMATOR SYSTEM DIRECTORY

> **Version:** 1.0.0  
> **Stack:** Next.js 14 (App Router) · TypeScript · Prisma · PostgreSQL · Tailwind CSS · Vercel  
> **Source of Truth:** LIV-Pools-Master-Estimator.xlsm (28-sheet workbook)

---

## TABLE OF CONTENTS

1. [Architecture Overview](#1-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Document Index](#3-document-index)
4. [Sheet → Feature Map](#4-sheet--feature-map)
5. [Data Tier Hierarchy](#5-data-tier-hierarchy)
6. [Page & Route Map](#6-page--route-map)
7. [Build Phases](#7-build-phases)

---

## 1. ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                         VERCEL                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js 14 (App Router)                  │  │
│  │                                                       │  │
│  │  PAGES (Server Components + Client Islands)           │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐              │  │
│  │  │Dashboard │ │Estimates │ │ Catalog  │              │  │
│  │  └──────────┘ └──────────┘ └──────────┘              │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐              │  │
│  │  │Proposals │ │  POs     │ │ Settings │              │  │
│  │  └──────────┘ └──────────┘ └──────────┘              │  │
│  │                                                       │  │
│  │  API ROUTES (Route Handlers)                          │  │
│  │  /api/catalog/* · /api/estimates/* · /api/bom/*       │  │
│  │  /api/proposals/* · /api/po/* · /api/jobtread/*       │  │
│  │                                                       │  │
│  │  PRISMA ORM ─────────────────────────────┐            │  │
│  │                                          ▼            │  │
│  │                              ┌───────────────────┐    │  │
│  │                              │   PostgreSQL      │    │  │
│  │                              │   (Supabase)      │    │  │
│  │                              └───────────────────┘    │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │   Supabase Storage  │  │   External Integrations      │  │
│  │   (PDF storage,     │  │   • JobTread API             │  │
│  │    attachments)      │  │   • Email (Resend)           │  │
│  └─────────────────────┘  │   • PDF Gen (react-pdf)      │  │
│                           └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Core Principle
> LIV builds essentially the same pool every time. The system manages **controlled variation** — not infinite configurability. A standard build with well-defined selection points (interior finish, equipment tier, spa option, etc.) that roll up through a 4-tier BOM hierarchy.

---

## 2. FOLDER STRUCTURE

```
liv-pools-crm/
├── .env.local                          # DB URL, API keys
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── prisma/
│   ├── schema.prisma                   # → See 02-DATABASE-SCHEMA.md
│   ├── seed.ts                         # → See 08-SEED-DATA.md
│   └── migrations/
│
├── docs/                               # THIS DIRECTORY — project documentation
│   ├── 00-SYSTEM-DIRECTORY.md          # ← You are here
│   ├── 01-ARCHITECTURE.md              # Stack decisions, deployment config
│   ├── 02-DATABASE-SCHEMA.md           # Full Prisma schema + relationships
│   ├── 03-CATALOG-SYSTEM.md            # SKU → Kit → Assembly → Super-Assembly
│   ├── 04-ESTIMATE-WORKFLOW.md         # Project Info → Selections → BOM → Pricing
│   ├── 05-BOM-ENGINE.md               # Bill of Materials explosion logic
│   ├── 06-PROPOSAL-SYSTEM.md          # Proposal generation, PDF export, contracts
│   ├── 07-PO-AND-BUDGET.md            # Purchase orders, budget tracking, cost codes
│   ├── 08-SEED-DATA.md                # All seed data from Excel workbook
│   └── 09-API-REFERENCE.md            # Every API route documented
│
├── src/
│   ├── app/                            # Next.js App Router
│   │   ├── layout.tsx                  # Root layout (sidebar nav, header)
│   │   ├── page.tsx                    # Dashboard (mirrors 01-DASHBOARD)
│   │   │
│   │   ├── estimates/
│   │   │   ├── page.tsx                # Estimate list / overview
│   │   │   ├── new/
│   │   │   │   └── page.tsx            # Create new estimate
│   │   │   └── [id]/
│   │   │       ├── layout.tsx          # Estimate sub-nav (tabbed interface)
│   │   │       ├── page.tsx            # Project Info (10-PROJECT-INFO)
│   │   │       ├── selections/
│   │   │       │   └── page.tsx        # Selections (11-SELECTIONS)
│   │   │       ├── takeoff/
│   │   │       │   └── page.tsx        # Pool Takeoff (12-TAKEOFF)
│   │   │       ├── bom/
│   │   │       │   └── page.tsx        # BOM Engine view (13-BOM-ENGINE)
│   │   │       ├── pricing/
│   │   │       │   └── page.tsx        # Pricing Hub (16-PRICING-HUB)
│   │   │       ├── proposal/
│   │   │       │   └── page.tsx        # Proposal (18-PROPOSAL)
│   │   │       ├── purchase-orders/
│   │   │       │   └── page.tsx        # PO Builder + POs (19, 23)
│   │   │       ├── budget/
│   │   │       │   └── page.tsx        # Budget (20-BUDGET)
│   │   │       ├── change-orders/
│   │   │       │   └── page.tsx        # Change Orders (21-CHANGE-ORDER)
│   │   │       ├── contract/
│   │   │       │   └── page.tsx        # Contract (22-CONTRACT)
│   │   │       ├── job-tracker/
│   │   │       │   └── page.tsx        # Job Tracker (24-JOB-TRACKER)
│   │   │       ├── cost-tracking/
│   │   │       │   └── page.tsx        # Cost Tracking (25-COST-TRACKING)
│   │   │       └── payments/
│   │   │           └── page.tsx        # Payment Schedule (26-PAYMENT-SCHEDULE)
│   │   │
│   │   ├── catalog/
│   │   │   ├── page.tsx                # Master Catalog overview
│   │   │   ├── skus/
│   │   │   │   ├── page.tsx            # SKU Master (02-SKU-MASTER)
│   │   │   │   ├── new/page.tsx        # Add SKU
│   │   │   │   └── [id]/page.tsx       # Edit SKU
│   │   │   ├── kits/
│   │   │   │   ├── page.tsx            # Kit Master (03-KIT-MASTER)
│   │   │   │   ├── new/page.tsx        # Kit Builder (28-ASSEMBLY-BUILDER)
│   │   │   │   └── [id]/page.tsx       # Edit Kit
│   │   │   ├── assemblies/
│   │   │   │   ├── page.tsx            # Assembly Master (04-ASSEMBLY-MASTER)
│   │   │   │   └── [id]/page.tsx       # Edit Assembly
│   │   │   └── super-assemblies/
│   │   │       ├── page.tsx            # Super-Assembly (05-SUPER-ASSEMBLY)
│   │   │       └── [id]/page.tsx       # Edit Super-Assembly
│   │   │
│   │   ├── vendors/
│   │   │   ├── page.tsx                # Vendor List (06-VENDOR-LIST)
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # Vendor detail
│   │   │       └── pricing/page.tsx    # Vendor Pricing (17-VENDOR-PRICING)
│   │   │
│   │   ├── settings/
│   │   │   └── page.tsx                # Settings (09-SETTINGS)
│   │   │
│   │   └── api/
│   │       ├── catalog/
│   │       │   ├── skus/route.ts       # CRUD SKUs
│   │       │   ├── kits/route.ts       # CRUD Kits
│   │       │   ├── assemblies/route.ts
│   │       │   └── super-assemblies/route.ts
│   │       ├── estimates/
│   │       │   ├── route.ts            # List/Create estimates
│   │       │   └── [id]/
│   │       │       ├── route.ts        # Get/Update/Delete estimate
│   │       │       ├── selections/route.ts
│   │       │       ├── bom/route.ts    # BOM explosion endpoint
│   │       │       ├── pricing/route.ts
│   │       │       └── proposal/route.ts
│   │       ├── po/
│   │       │   ├── route.ts            # List/Create POs
│   │       │   ├── [id]/route.ts
│   │       │   └── builder/route.ts    # Smart PO Builder logic
│   │       ├── vendors/route.ts
│   │       ├── cost-codes/route.ts
│   │       ├── formulas/route.ts       # Formula Library calculations
│   │       ├── settings/route.ts
│   │       └── jobtread/
│   │           └── sync/route.ts       # JobTread budget sync
│   │
│   ├── components/
│   │   ├── ui/                         # Shared UI primitives (shadcn)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── table.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   └── sidebar.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── app-sidebar.tsx         # Main navigation sidebar
│   │   │   ├── header.tsx              # Top bar with company info
│   │   │   └── estimate-tabs.tsx       # Tabbed nav within estimate
│   │   │
│   │   ├── catalog/
│   │   │   ├── sku-table.tsx           # Filterable/sortable SKU table
│   │   │   ├── sku-form.tsx            # Add/Edit SKU form
│   │   │   ├── kit-table.tsx           # Kit listing with member SKUs
│   │   │   ├── kit-builder.tsx         # Drag-and-drop kit composition
│   │   │   ├── assembly-tree.tsx       # Visual hierarchy viewer
│   │   │   └── catalog-browser.tsx     # Filter/search across all tiers
│   │   │
│   │   ├── estimate/
│   │   │   ├── project-info-form.tsx   # Customer info + pool specs
│   │   │   ├── pool-design-section.tsx # Base pool, access items, trim
│   │   │   ├── spa-design-section.tsx  # Spa construction section
│   │   │   ├── decking-section.tsx     # Decking design section
│   │   │   ├── screen-section.tsx      # Screen enclosure section
│   │   │   ├── addons-section.tsx      # Additional items section
│   │   │   ├── upgrades-section.tsx    # Options/upgrades section
│   │   │   ├── selections-panel.tsx    # Category dropdown selectors
│   │   │   ├── takeoff-calculator.tsx  # Dimensions → calculated values
│   │   │   ├── site-conditions.tsx     # Silt fence, dewatering, etc.
│   │   │   ├── plumbing-checklist.tsx  # Standard plumbing config
│   │   │   ├── electrical-checklist.tsx
│   │   │   └── project-totals.tsx      # Running totals panel
│   │   │
│   │   ├── bom/
│   │   │   ├── bom-tree-view.tsx       # Tiered BOM tree (T3→T2→T1→T0)
│   │   │   ├── bom-flat-view.tsx       # Flat T0 SKU list view
│   │   │   ├── bom-stage-summary.tsx   # Costs by stage (15-STAGE-COSTS)
│   │   │   └── bom-vendor-summary.tsx  # Costs by vendor (17-VENDOR-PRICING)
│   │   │
│   │   ├── pricing/
│   │   │   ├── pricing-hub.tsx         # Division, markup, margin controls
│   │   │   ├── pricing-engine.tsx      # Multiplier/discount application
│   │   │   └── margin-indicator.tsx    # Visual margin health
│   │   │
│   │   ├── proposal/
│   │   │   ├── proposal-preview.tsx    # Live proposal preview
│   │   │   ├── proposal-pdf.tsx        # react-pdf template
│   │   │   ├── proposal-exclusions.tsx
│   │   │   └── payment-schedule-view.tsx
│   │   │
│   │   ├── po/
│   │   │   ├── po-builder-wizard.tsx   # 5-step wizard (matches 23-PO-BUILDER)
│   │   │   ├── po-document.tsx         # PO preview/print
│   │   │   └── po-table.tsx            # PO list view
│   │   │
│   │   ├── budget/
│   │   │   ├── budget-table.tsx        # Estimated vs committed vs actual
│   │   │   ├── cost-tracking-table.tsx
│   │   │   ├── job-tracker-board.tsx   # Stage progress tracker
│   │   │   └── payment-tracker.tsx     # Payment collection status
│   │   │
│   │   ├── contract/
│   │   │   ├── contract-preview.tsx
│   │   │   └── change-order-form.tsx
│   │   │
│   │   └── dashboard/
│   │       ├── dashboard-stats.tsx     # KPI cards (top of 01-DASHBOARD)
│   │       ├── dashboard-nav.tsx       # Quick-nav cards
│   │       └── recent-estimates.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                       # Prisma client singleton
│   │   ├── formulas.ts                 # Formula Library (08-FORMULA-LIBRARY)
│   │   ├── bom-engine.ts              # BOM explosion logic
│   │   ├── pricing-engine.ts          # Markup, discount, margin logic
│   │   ├── po-generator.ts            # PO document generation
│   │   ├── proposal-generator.ts      # Proposal assembly
│   │   ├── jobtread.ts                # JobTread API client
│   │   ├── pdf.ts                     # PDF generation utilities
│   │   ├── utils.ts                   # General helpers
│   │   └── constants.ts              # Enums, default values
│   │
│   ├── types/
│   │   ├── catalog.ts                 # SKU, Kit, Assembly, SuperAssembly types
│   │   ├── estimate.ts                # Estimate, ProjectInfo, Selection types
│   │   ├── bom.ts                     # BomLine, BomTier types
│   │   ├── pricing.ts                 # Division, Discount types
│   │   ├── po.ts                      # PurchaseOrder, POLine types
│   │   ├── budget.ts                  # Budget, CostTracking types
│   │   └── settings.ts               # AppSettings type
│   │
│   └── hooks/
│       ├── use-estimate.ts            # Estimate CRUD + state
│       ├── use-bom.ts                 # BOM recalculation hook
│       ├── use-catalog.ts             # Catalog browsing/filtering
│       └── use-pricing.ts            # Live pricing recalc
│
└── public/
    ├── logo.svg                        # LIV Pools logo
    └── favicon.ico
```

---

## 3. DOCUMENT INDEX

| Doc | File | Purpose |
|-----|------|---------|
| 00 | `00-SYSTEM-DIRECTORY.md` | Master index — you are here |
| 01 | `01-ARCHITECTURE.md` | Stack, deployment, environment vars, auth |
| 02 | `02-DATABASE-SCHEMA.md` | Complete Prisma schema with all models & relationships |
| 03 | `03-CATALOG-SYSTEM.md` | 4-tier catalog: SKU → Kit → Assembly → Super-Assembly |
| 04 | `04-ESTIMATE-WORKFLOW.md` | Project Info → Selections → Takeoff → BOM → Pricing |
| 05 | `05-BOM-ENGINE.md` | Bill of Materials explosion algorithm |
| 06 | `06-PROPOSAL-SYSTEM.md` | Proposal generation, PDF export, contracts, change orders |
| 07 | `07-PO-AND-BUDGET.md` | Purchase orders, PO builder, budget tracking, payments |
| 08 | `08-SEED-DATA.md` | All reference data from Excel workbook for DB seeding |
| 09 | `09-API-REFERENCE.md` | Complete API route documentation |

---

## 4. SHEET → FEATURE MAP

Every Excel sheet maps to a specific feature area in the web app:

### CATALOG & REFERENCE DATA (Global — shared across all estimates)

| Sheet | Web App Feature | Route | Notes |
|-------|----------------|-------|-------|
| `02-SKU-MASTER` | SKU Master Table | `/catalog/skus` | 428 SKUs across 5 categories, 6 vendors |
| `03-KIT-MASTER` | Kit Builder & List | `/catalog/kits` | 30 kits — vendor-grouped SKU bundles |
| `04-ASSEMBLY-MASTER` | Assembly Manager | `/catalog/assemblies` | 13 assemblies — customer-facing groups |
| `05-SUPER-ASSEMBLY` | Super-Assembly Manager | `/catalog/super-assemblies` | 3 super-assemblies (Base Pool, Equipment, Finishes) |
| `06-VENDOR-LIST` | Vendor Directory | `/vendors` | 8 suppliers + 1 sub |
| `07-COST-CODES` | Cost Code Config | `/settings` | 27 cost codes with JT mappings |
| `08-FORMULA-LIBRARY` | Formula Engine | `lib/formulas.ts` | 21 named formulas for takeoff calcs |
| `09-SETTINGS` | System Settings | `/settings` | Company info, markup, tax, payment splits |

### PER-ESTIMATE WORKFLOW (Each estimate gets its own)

| Sheet | Web App Feature | Route | Notes |
|-------|----------------|-------|-------|
| `10-PROJECT-INFO` | **Primary Input Form** | `/estimates/[id]` | Customer info, pool design, spa, decking, screen, addons, upgrades |
| `11-SELECTIONS` | Selection Dropdowns | `/estimates/[id]/selections` | 8 categories × 4 options each |
| `12-TAKEOFF` | Pool Takeoff Calculator | `/estimates/[id]/takeoff` | Dimensions → calculated quantities |
| `13-BOM-ENGINE` | Bill of Materials | `/estimates/[id]/bom` | Auto-exploded from selections + takeoff |
| `14-PRICING-ENGINE` | Pricing Rules | `/estimates/[id]/pricing` | Division multipliers, volume discounts |
| `15-STAGE-COSTS` | Stage Cost Breakdown | `/estimates/[id]/bom` (tab) | Aggregated by construction stage |
| `16-PRICING-HUB` | Pricing Controls | `/estimates/[id]/pricing` | Markup, margin, round-up settings |
| `17-VENDOR-PRICING` | Vendor Price Summary | `/estimates/[id]/bom` (tab) | Costs aggregated by vendor |
| `18-PROPOSAL` | Proposal Document | `/estimates/[id]/proposal` | Customer-facing proposal + PDF export |
| `19-PURCHASE-ORDERS` | Generated POs | `/estimates/[id]/purchase-orders` | Vendor-specific PO documents |
| `20-BUDGET` | Job Cost Budget | `/estimates/[id]/budget` | Estimated vs committed vs actual |
| `21-CHANGE-ORDER` | Change Orders | `/estimates/[id]/change-orders` | Scope changes post-contract |
| `22-CONTRACT` | Contract Document | `/estimates/[id]/contract` | Formal agreement + signatures |
| `23-PO-BUILDER` | Smart PO Builder | `/estimates/[id]/purchase-orders` | 5-step wizard for PO creation |
| `24-JOB-TRACKER` | Job Progress | `/estimates/[id]/job-tracker` | Stage-by-stage status tracking |
| `25-COST-TRACKING` | Variance Analysis | `/estimates/[id]/cost-tracking` | Estimated vs actual with variance |
| `26-PAYMENT-SCHEDULE` | Payment Milestones | `/estimates/[id]/payments` | 4-milestone collection tracker |
| `27-CHANGELOG` | Activity Log | Estimate sidebar | Timestamped action history |

### TOOLS (Cross-cutting)

| Sheet | Web App Feature | Route | Notes |
|-------|----------------|-------|-------|
| `01-DASHBOARD` | Home Dashboard | `/` | KPI cards + quick-nav |
| `28-ASSEMBLY-BUILDER` | Kit Builder Tool | `/catalog/kits/new` | Browse + compose kits from SKU catalog |

---

## 5. DATA TIER HIERARCHY

The entire estimating system is built on a strict 4-tier hierarchy:

```
SUPER-ASSEMBLY  (T3)    ← Proposal sections / payment milestones
  └── ASSEMBLY  (T2)    ← Customer-facing line items
       └── KIT  (T1)    ← Vendor-grouped bundles
            └── SKU (T0) ← Individual purchasable items
```

### Concrete Example

```
SA-BASE-POOL: "Base Pool & Spa"                      ← T3 Super-Assembly
├── A-PRECONSTRUCTION: "Pre-Construction & Permits"   ← T2 Assembly
│   ├── K-PERMITS: "Permits & Inspections"            ← T1 Kit (Government)
│   │   ├── SKU-MAT-017: Pool Construction Permit     ← T0 SKU ($1,200)
│   │   └── SKU-MAT-018: Inspection Fees              ← T0 SKU ($650)
│   ├── K-SAFETY-FENCE: "Safety Fence"                ← T1 Kit (Local Supplier)
│   │   └── SKU-MAT-020: 4ft Mesh Fence (per LF)     ← T0 SKU ($22/LF × calc'd)
│   ├── K-PROJECT-MGMT: "Project Management"          ← T1 Kit (In-House)
│   │   └── SKU-OVH-001: PM Fee (8% of base)         ← T0 SKU (formula-driven)
│   └── K-WARRANTY: "Warranty Bond"                   ← T1 Kit (Insurance)
│       └── SKU-OVH-002: 1-Year Warranty Bond         ← T0 SKU ($350)
├── A-EXCAVATION: "Excavation & Earthwork"            ← T2
│   ├── K-EXCAVATION → SKU-MAT-014                    ← $32/CY × calc'd
│   └── K-HAUL-AWAY → SKU-MAT-015                    ← $385/load × calc'd
├── A-SHELL: "Shell Construction"                     ← T2
│   ├── K-STEEL-MATERIAL → SKU-MAT-002               ← $18.50/stick × calc'd
│   ├── K-STEEL-LABOR → SKU-LAB-001                  ← $2.50/LF × calc'd
│   └── K-GUNITE → SKU-MAT-001                       ← $285/CY × calc'd
├── A-PLUMBING: "Plumbing Rough-In"                   ← T2
│   ├── K-PLUMBING-PIPE → 2 SKUs
│   ├── K-PLUMBING-FIXTURES → 2 SKUs
│   ├── K-RETURN-JETS → 1 SKU
│   └── K-PLUMBING-LABOR → 1 SKU
├── A-ELECTRICAL: "Electrical & Bonding"              ← T2
│   └── K-ELECTRICAL → 2 SKUs
└── A-SPA: "Spa Construction"                         ← T2
    ├── K-SPA-GUNITE → 1 SKU
    └── K-SPA-BLOWER → 1 SKU

SA-EQUIPMENT: "Equipment Package"                     ← T3
├── A-CIRCULATION (Pump, Filter, Salt System)
├── A-AUTOMATION (IntelliCenter)
├── A-HEATING (Heat Pump)
├── A-LIGHTING (LEDs)
└── A-EQUIPMENT-SET (Install Labor, Startup, Cleaner)

SA-FINISHES: "Finishes & Aesthetics"                  ← T3
├── A-TILE-COPING (Tile, Coping, Labor)
└── A-INTERIOR (Plaster/Quartz/Pebble + Labor)
```

---

## 6. PAGE & ROUTE MAP

### Public Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Dashboard | KPI cards, quick-nav, recent estimates |

### Catalog Routes (Global Data)
| Route | Page | Purpose |
|-------|------|---------|
| `/catalog` | Catalog Overview | Tier counts, health stats |
| `/catalog/skus` | SKU Master | Full SKU table with filters |
| `/catalog/skus/new` | Add SKU | SKU creation form |
| `/catalog/skus/[id]` | Edit SKU | SKU edit form |
| `/catalog/kits` | Kit Master | Kit list with member counts |
| `/catalog/kits/new` | Kit Builder | Browse + compose from SKU catalog |
| `/catalog/kits/[id]` | Edit Kit | Modify kit membership |
| `/catalog/assemblies` | Assembly Master | Assembly list with kit counts |
| `/catalog/assemblies/[id]` | Edit Assembly | Modify assembly composition |
| `/catalog/super-assemblies` | Super-Assembly | SA list with assembly counts |
| `/catalog/super-assemblies/[id]` | Edit Super-Assembly | Modify SA composition |

### Vendor Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/vendors` | Vendor List | All suppliers and subs |
| `/vendors/[id]` | Vendor Detail | Contact info, terms, lead days |
| `/vendors/[id]/pricing` | Vendor Pricing | Items from this vendor, totals |

### Estimate Routes (Per-Estimate)
| Route | Page | Excel Sheet |
|-------|------|------------|
| `/estimates` | Estimate List | — |
| `/estimates/new` | Create Estimate | — |
| `/estimates/[id]` | **Project Info** | `10-PROJECT-INFO` |
| `/estimates/[id]/selections` | Selections | `11-SELECTIONS` |
| `/estimates/[id]/takeoff` | Pool Takeoff | `12-TAKEOFF` |
| `/estimates/[id]/bom` | BOM Engine | `13-BOM-ENGINE` + `15` + `17` |
| `/estimates/[id]/pricing` | Pricing Hub | `14-PRICING-ENGINE` + `16-PRICING-HUB` |
| `/estimates/[id]/proposal` | Proposal | `18-PROPOSAL` |
| `/estimates/[id]/purchase-orders` | POs + Builder | `19-PURCHASE-ORDERS` + `23-PO-BUILDER` |
| `/estimates/[id]/budget` | Budget | `20-BUDGET` |
| `/estimates/[id]/change-orders` | Change Orders | `21-CHANGE-ORDER` |
| `/estimates/[id]/contract` | Contract | `22-CONTRACT` |
| `/estimates/[id]/job-tracker` | Job Tracker | `24-JOB-TRACKER` |
| `/estimates/[id]/cost-tracking` | Cost Tracking | `25-COST-TRACKING` |
| `/estimates/[id]/payments` | Payments | `26-PAYMENT-SCHEDULE` |

### Settings Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/settings` | All Settings | Company info, markup, tax, payment %, cost codes |

---

## 7. BUILD PHASES

### Phase 1 — Foundation (Catalog + Database)
- [ ] Prisma schema + PostgreSQL setup
- [ ] Seed data from Excel workbook
- [ ] SKU Master CRUD (`/catalog/skus`)
- [ ] Kit Master CRUD + Kit Builder (`/catalog/kits`)
- [ ] Assembly & Super-Assembly CRUD
- [ ] Vendor List CRUD
- [ ] Cost Codes & Formula Library
- [ ] Settings page

### Phase 2 — Estimate Core (The Main Workflow)
- [ ] Create Estimate flow
- [ ] Project Info form (mirrors 10-PROJECT-INFO exactly)
- [ ] Selections panel (8 categories with option dropdowns)
- [ ] Takeoff Calculator (dimensions → formula-driven quantities)
- [ ] BOM Engine (explode selections + takeoff through 4-tier hierarchy)
- [ ] Pricing Hub (markup, division multiplier, margin checks)
- [ ] Dashboard with KPI cards

### Phase 3 — Output Documents
- [ ] Proposal generation + PDF export
- [ ] Contract document generation
- [ ] PO Builder (5-step wizard)
- [ ] PO document generation
- [ ] Change Order system

### Phase 4 — Tracking & Integration
- [ ] Budget tracking (estimated vs committed vs actual)
- [ ] Cost tracking with variance analysis
- [ ] Job Tracker (stage progress)
- [ ] Payment Schedule tracking
- [ ] Changelog / activity log
- [ ] JobTread API integration for budget sync

---

*Next: See `01-ARCHITECTURE.md` for stack decisions and deployment configuration.*
