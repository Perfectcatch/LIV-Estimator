# 07 — PURCHASE ORDERS & BUDGET TRACKING

> Purchase order generation, PO builder wizard, budget tracking, cost tracking,  
> job progress, and payment schedule management.  
> Mirrors sheets 19, 20, 23, 24, 25, and 26.

---

## PURCHASE ORDER SYSTEM

### PO Document Structure (mirrors 19-PURCHASE-ORDERS)

```
┌─────────────────────────────────────────────────────────┐
│  LIV POOLS — PURCHASE ORDER                 PO-0001     │
│                                   Date: 03/08/2026      │
│                                                         │
│  VENDOR                          SHIP TO                │
│  Excavation Sub                  2128 Coronet Dr        │
│                                  Largo, FL              │
│  Terms: Progress                 Vendela Conley         │
│                                                         │
│  SKU        DESCRIPTION           QTY  UNIT  COST  TOTAL│
│  SKU-MAT-014  Excavation—Dig    160   CY    $32   $5,120│
│                                                         │
│                              SUBTOTAL:         $5,120   │
│                              TAX:              $0       │
│                              TOTAL:            $5,120   │
└─────────────────────────────────────────────────────────┘
```

### PO Number Format
Sequential: `PO-0001`, `PO-0002`, etc. Global across all estimates.

### PO Status Lifecycle

```
DRAFT ──▶ SENT ──▶ ACKNOWLEDGED ──▶ RECEIVED
                                      │
                               PARTIAL (split delivery)
```

---

## SMART PO BUILDER (mirrors 23-PO-BUILDER)

A 5-step wizard for generating purchase orders from the BOM.

### Step 1 — Select PO Type

| Type | Description |
|------|-------------|
| **Supplier** | Materials and equipment POs sent to vendors |
| **Subcontractor** | Service POs for labor (plumbing, electrical, etc.) |

### Step 2 — Select Stages to Include

| # | Stage | Default |
|---|-------|---------|
| 1 | Pre-Construction | ☑ Yes |
| 2 | Excavation | ☑ Yes |
| 3 | Steel & Rebar | ☑ Yes |
| 4 | Plumbing | ☑ Yes |
| 5 | Electrical | ☑ Yes |
| 6 | Shotcrete Shell | ☑ Yes |
| 7 | Tile & Coping | ☑ Yes |
| 8 | Equipment Set | ☑ Yes |
| 9 | Interior Finish | ☑ Yes |
| 10 | Startup & Closeout | ☑ Yes |

### Step 3 — Browse & Select Items

Filtered list of BOM T0 lines matching selected PO type and stages:

| SKU Code | Description | Cost Type | Vendor | UOM | Unit Cost | QTY | ☑ Select | Ext Cost |
|----------|------------|-----------|--------|-----|-----------|-----|----------|----------|

Checkboxes for selecting which items to include on the PO.

### Step 4 — Vendor Assignment

| Option | Effect |
|--------|--------|
| (keep original) | Use each item's default vendor from catalog |
| Override: [Vendor] | Route all selected items to a single vendor |

### Step 5 — Preview & Generate

Shows PO summary grouped by vendor. One PO per vendor.

**Algorithm:**
```typescript
function generatePOs(selectedItems: BomLine[], vendorOverride?: string) {
  // Group items by vendor
  const byVendor = groupBy(selectedItems, item => 
    vendorOverride ?? item.sku.vendor.name
  )
  
  // Create one PO per vendor
  for (const [vendorName, items] of Object.entries(byVendor)) {
    const po = createPurchaseOrder({
      vendor: vendorName,
      lines: items.map(item => ({
        sku: item.sku,
        description: item.sku.name,
        quantity: item.quantity,
        uom: item.sku.uom,
        unitCost: item.unitCost,
        total: item.extCost
      })),
      terms: vendor.terms,
      subtotal: sum(items.map(i => i.extCost))
    })
  }
}
```

---

## BUDGET TRACKING (mirrors 20-BUDGET)

### Budget Line Structure

| Column | Source | Description |
|--------|--------|-------------|
| Cost Code | CostCode table | "01-PREP", "02-DIG", etc. |
| Description | CostCode.stageName | "Permitting & Inspections" |
| Cost Type | CostCode.costType | Expense, Subcontractor, Materials |
| Estimated | BOM aggregate | Sum of BOM ext costs for this cost code |
| Committed | PO totals | Sum of PO line items for this cost code |
| Actual | Manual entry / invoice import | What was actually paid |
| Variance $ | Estimated - Actual | Dollar variance |
| Variance % | (Estimated - Actual) / Estimated | Percentage variance |
| JT Code | CostCode.jtCode | JobTread integration code |
| JT ID | CostCode.jtId | JobTread budget item ID |

### All 27 Budget Lines

| Code | Stage Name | Cost Type | JT Code |
|------|-----------|-----------|---------|
| 00-UNCAT | Uncategorized | Other | 1000 |
| 00-ADMIN | Admin | Expense | 1100 |
| 01-PREP | Permitting & Inspections | Expense | 1200 |
| 01-ENG | Engineering | Subcontractor | 1300 |
| 01-FENCE | General Job Site | Expense | 1400 |
| 01-FREIGHT | Freight & Deliveries | Expense | 1500 |
| 01-DEMO | Demolition | Subcontractor | 1600 |
| 01-LAYOUT | Layout | Labor | 1700 |
| 02-DIG | Excavation | Subcontractor | 1800 |
| 03-STL | Steel / Rebar | Materials | 1900 |
| 06-GUN | Shell / Shotcrete | Subcontractor | 1900 |
| 06-GAS | Gas | Subcontractor | 2000 |
| 06-GRADE | Grading & Backfill | Subcontractor | 2100 |
| 04-PLUMB | Plumbing | Subcontractor | 2200 |
| 05-ELC | Electrical | Subcontractor | 2300 |
| 08-EQP | Equipment | Equipment | 2400 |
| 07-COP | Coping & Decking Materials | Materials | 2500 |
| 07-DECK | Deck Install | Subcontractor | 2600 |
| 07-TIL | Tile & Coping Install | Subcontractor | 2700 |
| 09-FIN | Interior Finish | Subcontractor | 2800 |
| 10-START | Start Up | Labor | 2900 |
| 10-CHEM | Chemicals & Maintenance | Materials | 3000 |
| ADD-LAND | Landscaping | Subcontractor | 3100 |
| ADD-KITCH | Outdoor Kitchen | Subcontractor | 3200 |
| ADD-SCREEN | Screen Enclosure | Subcontractor | 3300 |
| SYS-WARR | Warranty & Callbacks | Expense | 3400 |
| SYS-DEP | Contract Deposits | Deposits | 3500 |

### Variance Indicators

| Condition | Color | Meaning |
|-----------|-------|---------|
| Actual ≤ Estimated | Green | On or under budget |
| Actual > Estimated (< 10%) | Yellow | Slight overrun |
| Actual > Estimated (≥ 10%) | Red | Significant overrun |

---

## COST TRACKING (mirrors 25-COST-TRACKING)

Simplified view of budget focusing on estimated vs actual:

| Cost Code | Stage Name | Estimated | Actual | Variance $ | Variance % | Notes |
|-----------|-----------|-----------|--------|-----------|-----------|-------|

This is a simpler view than the full budget — mainly for field use.

---

## JOB TRACKER (mirrors 24-JOB-TRACKER)

Stage-by-stage progress tracker:

| Stage Code | Stage Name | Status | Start Date | End Date | Duration | Notes |
|-----------|-----------|--------|-----------|---------|----------|-------|
| 01-PREP | Permitting | Not Started | — | — | — | — |
| 02-DIG | Excavation | In Progress | 03/15 | — | — | Machine arriving Monday |
| 03-STL | Steel | Not Started | — | — | — | — |

### Status Options

| Status | Icon | Description |
|--------|------|-------------|
| Not Started | ○ | Stage hasn't begun |
| In Progress | ◐ | Active work underway |
| Complete | ● | Stage finished |
| On Hold | ⊘ | Paused (weather, permits, etc.) |

### UI Component
A kanban-style board or Gantt-style timeline showing all stages with drag-to-update status.

---

## PAYMENT SCHEDULE (mirrors 26-PAYMENT-SCHEDULE)

### 4 Payment Milestones

| # | Milestone | Pct | Trigger |
|---|-----------|-----|---------|
| 1 | Deposit — Contract Signing | 10% | Estimate approved |
| 2 | Shell Complete — Gunite Poured | 45% | Stage 06-GUN complete |
| 3 | Equipment Set — Pad Complete | 20% | Stage 08-EQP complete |
| 4 | Final — Interior Finish Complete | 25% | Stage 09-FIN complete |

### Payment Tracking Fields

| Field | Type | Notes |
|-------|------|-------|
| Amount Due | Calc'd from total × pct | Auto-updates on total change |
| Date Paid | Date picker | Manual entry |
| Amount Paid | Decimal | Can differ from amount due |
| Balance | Calc'd | Amount Due - Amount Paid |

### Payment Status Summary

```
Contract Total:    $XX,XXX.XX
Total Paid:        $XX,XXX.XX
Remaining Balance: $XX,XXX.XX
% Collected:       XX%
```

---

## JOBTREAD INTEGRATION

### Sync Direction
- **Push:** Estimated budget → JobTread budget items (on estimate approval)
- **Pull:** JobTread actual costs → Budget "Actual" column (scheduled sync)

### Mapping
Each CostCode has a `jtCode` (JobTread numeric code) and `jtId` (JobTread item UUID). The sync maps budget lines to JobTread budget items using these IDs.

### Sync Endpoint
```
POST /api/jobtread/sync
  Body: { estimateId: string }
  
  1. Fetches estimate budget lines
  2. Maps to JobTread budget items via jtCode/jtId
  3. Pushes estimated amounts to JobTread
  4. Pulls actual costs back from JobTread
  5. Updates local budget lines
```

### Cron Schedule
Auto-sync every 6 hours via Vercel cron job (configured in `vercel.json`).

---

*Next: See `08-SEED-DATA.md` for all reference data from the Excel workbook.*
