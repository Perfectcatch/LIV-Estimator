# 05 — BOM ENGINE

> The Bill of Materials explosion algorithm. Takes the 4-tier catalog hierarchy,  
> applies selections + takeoff quantities, and produces a fully priced material list.

---

## EXPLOSION ALGORITHM

### Input
- **Catalog hierarchy:** SuperAssembly → Assembly → Kit → SKU (global data)
- **Selections:** 8 category choices (per-estimate)
- **Takeoff values:** Calculated quantities from formula library (per-estimate)

### Output
- **BomLine[]:** A flat list of tiered rows (T3, T2, T1, T0) with pricing on T0 lines

### Pseudocode

```typescript
// lib/bom-engine.ts

interface BomInput {
  estimateId: string
  selections: Selection[]       // 8 category selections
  takeoffValues: TakeoffCalcs   // Computed formula values
  catalog: FullCatalog          // 4-tier hierarchy from DB
}

function explodeBom(input: BomInput): BomLine[] {
  const lines: BomLine[] = []
  let sortOrder = 0

  // Walk the hierarchy: T3 → T2 → T1 → T0
  for (const sa of input.catalog.superAssemblies) {
    // T3 header line
    lines.push({
      tier: 'T3',
      superAssemblyId: sa.id,
      sortOrder: sortOrder++
    })

    for (const asm of sa.assemblies) {
      // T2 header line
      lines.push({
        tier: 'T2',
        assemblyId: asm.id,
        parentSuperAssemblyId: sa.id,
        sortOrder: sortOrder++
      })

      for (const kit of asm.kits) {
        // T1 header line
        lines.push({
          tier: 'T1',
          kitId: kit.id,
          parentAssemblyId: asm.id,
          parentSuperAssemblyId: sa.id,
          sortOrder: sortOrder++
        })

        for (const sku of kit.skus) {
          // T0 — the actual priced line
          const qty = resolveQuantity(sku, input.selections, input.takeoffValues)
          
          // Skip items with 0 quantity (e.g., no heater selected)
          if (qty === 0) continue

          const extCost = sku.unitCost * qty
          const sellPrice = extCost / (1 - sku.markupPct)

          lines.push({
            tier: 'T0',
            skuId: sku.id,
            parentKitId: kit.id,
            parentAssemblyId: asm.id,
            parentSuperAssemblyId: sa.id,
            quantity: qty,
            unitCost: sku.unitCost,
            extCost: extCost,
            markupPct: sku.markupPct,
            sellPrice: sellPrice,
            sortOrder: sortOrder++
          })
        }
      }
    }
  }

  return lines
}
```

### Quantity Resolution Logic

```typescript
function resolveQuantity(
  sku: Sku,
  selections: Selection[],
  takeoff: TakeoffCalcs
): number {
  // ── Case 1: Fixed quantity SKU ──
  if (sku.fixedVar === 'FIXED') {
    // Check if this SKU is selection-gated
    const gate = getSelectionGate(sku)
    if (gate) {
      const selection = selections.find(s => s.category === gate.category)
      if (!selection || selection.optionIndex !== gate.requiredOption) {
        return 0  // Not selected — exclude from BOM
      }
    }
    return sku.defaultQty ?? 1
  }

  // ── Case 2: Variable quantity SKU (formula-driven) ──
  if (sku.formulaRef) {
    const calcValue = takeoff[sku.formulaRef]
    if (calcValue !== undefined) {
      return Math.ceil(calcValue)  // Round up material quantities
    }
  }

  // ── Case 3: Fallback ──
  return sku.defaultQty ?? 0
}
```

### Selection Gate Map

This maps which SKUs are enabled/disabled based on selection choices:

```typescript
const SELECTION_GATES: Record<string, { category: SelectionCategory, optionIndex: number }> = {
  // Equipment — pump selection
  'SKU-EQP-001': { category: 'EQUIPMENT', optionIndex: 0 },    // IntelliFlo 1.5HP (option 0)
  'SKU-EQP-002': { category: 'EQUIPMENT', optionIndex: 1 },    // IntelliFlo 2.0HP (option 1)
  
  // Sanitization
  'SKU-EQP-004': { category: 'SANITIZATION', optionIndex: 1 }, // Salt IC40

  // Automation
  'SKU-EQP-006': { category: 'AUTOMATION', optionIndex: 1 },   // IntelliCenter
  'SKU-LAB-008': { category: 'AUTOMATION', optionIndex: 1 },   // Automation wiring (enabled when automation selected)

  // Heating
  'SKU-EQP-007': { category: 'HEATING', optionIndex: 1 },      // HeatPro 110k

  // Lighting
  'SKU-EQP-005': { category: 'LIGHTING', optionIndex: 1 },     // 1 LED light (any lighting option)

  // Spa
  'SKU-MAT-019': { category: 'SPA', optionIndex: 1 },          // Spa gunite
  'SKU-EQP-009': { category: 'SPA', optionIndex: 1 },          // Spa blower
}
```

> **Note:** Option index 0 means "base/none" for most categories. Options 1-3 are upgrades. The gate check should pass for the selected option OR higher (e.g., if lighting option 2 is selected, SKU-EQP-005 for 1 LED should also be included). The exact mapping needs to be refined per selection option during implementation.

---

## BOM VIEWS

### Tree View (`bom-tree-view.tsx`)

Hierarchical display matching `13-BOM-ENGINE`:

```
▼ SA-BASE-POOL: Base Pool & Spa
  ▼ A-PRECONSTRUCTION: Pre-Construction & Permits
    ▼ K-PERMITS: Permits & Inspections
      ├── SKU-MAT-017  Permit — Pool Construction     1 LS    $1,200.00    $1,200.00
      └── SKU-MAT-018  Inspection Fees                1 LS      $650.00      $650.00
    ▼ K-SAFETY-FENCE: Safety Fence
      └── SKU-MAT-020  Safety Fence — 4ft mesh       115 LF      $22.00    $2,530.00
    ▼ K-PROJECT-MGMT: Project Management
      └── SKU-OVH-001  PM Fee (8%)                    1 LS    $3,200.00    $3,200.00
    ▼ K-WARRANTY: Warranty Bond
      └── SKU-OVH-002  1-Year Warranty                1 LS      $350.00      $350.00
  ▼ A-EXCAVATION: Excavation & Earthwork
    ...
```

### Flat View (`bom-flat-view.tsx`)

T0 SKUs only, sortable/filterable table:

| SKU Code | Name | Vendor | UOM | Qty | Unit Cost | Ext Cost | Sell Price |
|----------|------|--------|-----|-----|-----------|----------|-----------|
| SKU-MAT-017 | Permit — Pool | Government | LS | 1 | $1,200 | $1,200 | $3,000 |
| SKU-MAT-020 | Safety Fence | Local | LF | 115 | $22 | $2,530 | $6,325 |

### Stage Summary (`bom-stage-summary.tsx` — mirrors 15-STAGE-COSTS)

Costs aggregated by construction stage:

| Stage Code | Stage Name | Material $ | Labor $ | Equipment $ | Sub $ | Total | % |
|-----------|-----------|-----------|---------|------------|-------|-------|---|
| 01-PREP | Permitting & Inspections | $1,850 | $0 | $0 | $0 | $1,850 | 4% |
| 02-DIG | Excavation | $5,120 | $0 | $0 | $0 | $5,120 | 11% |
| 03-STL | Steel / Rebar | $2,960 | $800 | $0 | $0 | $3,760 | 8% |

### Vendor Summary (`bom-vendor-summary.tsx` — mirrors 17-VENDOR-PRICING)

Costs aggregated by vendor:

| Vendor | Item Count | Total Cost | Total Sell | Margin % | % of Total | Terms | Lead Days |
|--------|-----------|-----------|-----------|---------|----------|-------|-----------|
| Pentair | 7 | $4,130 | $8,260 | 50% | 18% | Net 30 | 5 |
| Hayward | 4 | $2,925 | $5,850 | 50% | 13% | Net 30 | 5 |
| SCP Distributors | 7 | $8,500 | $14,167 | 40% | 37% | Net 30 | 2 |

---

## RECALCULATION TRIGGERS

The BOM re-explodes whenever any of these change:

| Trigger | What Changes | Recalc Scope |
|---------|-------------|-------------|
| Takeoff dimensions edited | Formula calc values | Full BOM re-explosion |
| Selection changed | SKU inclusion/exclusion | Full BOM re-explosion |
| SKU unit cost updated (catalog) | Cost propagation | Affected lines only |
| Markup % changed | Sell price | Affected lines only |
| Division changed | Division multiplier | All sell prices |
| Pool count changed | Volume discount | All sell prices |

### API Endpoint

```
POST /api/estimates/[id]/bom
  → Recalculates full BOM from current selections + takeoff
  → Returns BomLine[] with all tiers
  → Saves to database (replaces existing BOM lines)
```

---

## FORMULA LIBRARY IMPLEMENTATION

```typescript
// lib/formulas.ts

export interface TakeoffInputs {
  poolLength: number
  poolWidth: number
  shallowDepth: number
  deepDepth: number
  spaLength: number
  spaWidth: number
  spaDepth: number
  spaExists: boolean  // from Selection[SPA] !== 0
}

export function calculateTakeoff(inputs: TakeoffInputs) {
  const avgDepth = (inputs.shallowDepth + inputs.deepDepth) / 2
  const poolSqft = inputs.poolLength * inputs.poolWidth
  const poolPerimeter = 2 * (inputs.poolLength + inputs.poolWidth)
  const poolGallons = inputs.poolLength * inputs.poolWidth * avgDepth * 7.48
  
  // Gunite: walls 6in + floor 4in
  const wallArea = poolPerimeter * avgDepth
  const floorArea = poolSqft
  const guniteCY = ((wallArea * 0.5) + (floorArea * (4/12))) / 27
  
  // Excavation: 3ft overdig each side, 2ft deeper
  const excavLength = inputs.poolLength + 6
  const excavWidth = inputs.poolWidth + 6
  const excavDepth = avgDepth + 2
  const excavCY = (excavLength * excavWidth * excavDepth) / 27
  
  const haulLoads = Math.ceil(excavCY / 14)
  
  // Rebar: 20ft sticks, 30in OC grid
  const gridSpacing = 30 / 12  // 2.5ft
  const lengthBars = Math.ceil(inputs.poolWidth / gridSpacing) + 1
  const widthBars = Math.ceil(inputs.poolLength / gridSpacing) + 1
  const rebarSticks = lengthBars + widthBars
  const rebarLF = rebarSticks * 20
  
  const plumbingLF = poolPerimeter * 1.5
  
  const interiorSF = poolSqft + (inputs.spaExists ? inputs.spaLength * inputs.spaWidth : 0)
  const tileSF = poolPerimeter * 1  // 1ft band
  const copingLF = poolPerimeter + (inputs.spaExists ? 2 * (inputs.spaLength + inputs.spaWidth) : 0)
  const fenceLF = poolPerimeter * 1.2  // 20% safety buffer
  
  const spaCY = inputs.spaExists 
    ? ((2 * (inputs.spaLength + inputs.spaWidth) * inputs.spaDepth * 0.5) + (inputs.spaLength * inputs.spaWidth * (4/12))) / 27
    : 0

  return {
    avgDepth, poolSqft, poolPerimeter, poolGallons,
    guniteCY, excavCY, haulLoads, rebarSticks, rebarLF,
    plumbingLF, interiorSF, tileSF, copingLF, fenceLF, spaCY
  }
}
```

---

*Next: See `06-PROPOSAL-SYSTEM.md` for proposal generation.*
