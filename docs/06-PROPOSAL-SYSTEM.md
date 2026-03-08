# 06 — PROPOSAL SYSTEM

> Proposal generation, PDF export, contract documents, and change orders.  
> Mirrors sheets 18-PROPOSAL, 22-CONTRACT, and 21-CHANGE-ORDER.

---

## PROPOSAL STRUCTURE (mirrors 18-PROPOSAL)

### Header Block

```
┌─────────────────────────────────────────────────────────────┐
│                    PROJECT PROPOSAL                         │
│                                                             │
│  Job Name:   Residence or Job Name    Job #:    Q25050001   │
│  Street:     2128 Coronet Dr          Bid Date: 03/08/2026  │
│  Address:    Largo, Pinellas County   Bid Ends: 04/07/2026  │
│  Build Type: Concrete Pool            Estimator: John Doe   │
│                                                             │
│  Owner: Vendela Conley                                      │
│  Cell:  727-430-4710                                        │
│  Email: yanni@livpools.com                                  │
└─────────────────────────────────────────────────────────────┘
```

### Scope of Work Lines

These are the fixed proposal line items (from row 12+ of 18-PROPOSAL):

| Line | Description | Detail | Status | Amount |
|------|------------|--------|--------|--------|
| 1 | Inground Pool Construction | Construction of inground pool per drawings and specs | Included | BOM calc |
| 2 | Inground Spa Construction | (conditional on spa selection) | Included/— | BOM calc |
| 3 | Access | Yard access, removal/replacement of access walls | Included | — |
| 4 | Excavation | Digging, dirt removal and hauling | Included | — |
| 5 | Equipment runs | Install electrical, plumbing and other lines | — | — |
| 5a | • Plumbing Installation | Install all plumbing devices, skimmers, drains, returns | Included | — |
| 5b | • Electrical Installation | Install all electrical devices per code | Included | — |
| 5c | • Gas Installation | Install gas lines or features | — | — |
| 6 | Structural Installation | Raised walls, bond beam, posts, rebar, gunite | Included | — |
| 7 | Masonry Installation | Masonry features per plan | — | — |
| 8 | Coping and Tile | Coping and tile per plan | Included | — |
| 9 | Pool Decking | Pool decking per plan | Included | — |
| 9a | • Deck Coating | Decking coating per plan | Included | — |
| 9b | • Pool Interior Finishes | Pool finishes per plan | Included | — |
| 10 | Pool Cleaning System | Cleaning system per plan | Included | BOM calc |
| 11 | Pool Equipment and Controls | Equipment and controls per plan | Included | BOM calc |
| 12 | Water Features | Water features per plan | Included | — |
| 13 | Pool Accessories | Pool accessories per plan | Included | — |
| 14 | Landscaping | — | — | BOM calc |
| 15 | Misc / Other | — | — | BOM calc |

### Price Summary Block

```
┌─────────────────────────────────────┐
│  Job Totals:      $XX,XXX.XX        │
│  Other (+/-):     -                  │
│  Net Total:       $XX,XXX.XX        │
│                                     │
│  Total Price:     $XX,XXX.XX        │
└─────────────────────────────────────┘
```

### Payment Schedule Block

| Milestone | Timing | Amount |
|-----------|--------|--------|
| Deposit (10%) | Due at Signing | Calc |
| Shell Payment (45%) | Shell Complete | Calc |
| Equipment Payment (20%) | Equipment Set | Calc |
| Final Payment (25%) | Interior Finish | Calc |

### Exclusions & Clarifications

Standard exclusions (always included on proposal):

1. Landscaping, grading, or sodding beyond pool area
2. Screen enclosure or pool cage
3. Fencing beyond the required safety barrier
4. Driveway, sidewalk, or hardscape repairs
5. Permits or fees beyond standard pool construction
6. Survey or engineering beyond standard pool layout
7. Dewatering if water table is encountered
8. Rock removal — quoted separately if encountered

> "This proposal is valid for 30 days from the date above."

---

## PDF GENERATION

### Technology
Use `@react-pdf/renderer` for server-side PDF creation.

### Template Structure

```typescript
// components/proposal/proposal-pdf.tsx

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

export function ProposalPDF({ estimate, bomSummary, settings }) {
  return (
    <Document>
      {/* Page 1: Header + Scope of Work */}
      <Page size="LETTER" style={styles.page}>
        <CompanyHeader settings={settings} />
        <ProposalHeader estimate={estimate} />
        <ScopeOfWork lines={estimate.proposalLines} />
        <PriceSummary bomSummary={bomSummary} />
      </Page>
      
      {/* Page 2: Payment Schedule + Exclusions */}
      <Page size="LETTER" style={styles.page}>
        <PaymentSchedule estimate={estimate} />
        <Exclusions />
        <SignatureBlock />
      </Page>
    </Document>
  )
}
```

### PDF Actions

| Action | Endpoint | Notes |
|--------|----------|-------|
| Preview | Client-side render | Live preview in proposal page |
| Download | `GET /api/estimates/[id]/proposal?format=pdf` | Streams PDF |
| Email | `POST /api/estimates/[id]/proposal/send` | Sends via Resend |
| Store | Auto on generate | Saved to Supabase Storage |

---

## CONTRACT DOCUMENT (mirrors 22-CONTRACT)

### Structure

```
CONTRACT AGREEMENT

PROJECT DETAILS
  Prepared For:     [Customer Name]
  Project Address:  [Address]
  Project Number:   [Proposal #]
  Date:             [Date]

SCOPE OF WORK
  Construction of residential swimming pool and/or spa as specified in the
  attached proposal. Includes all materials, labor, equipment, and permits
  as outlined in the project proposal.

TERMS AND CONDITIONS
  [Standard contract terms]

PAYMENT SCHEDULE
  [Same as proposal payment schedule]

SIGNATURES
  ___________________________     ___________________________
  Owner                           Contractor
  Date: ___________              Date: ___________
```

---

## CHANGE ORDER SYSTEM (mirrors 21-CHANGE-ORDER)

### Change Order Fields

| Field | Type | Source |
|-------|------|--------|
| CO Number | Auto-increment per estimate | Sequential |
| Date | Auto-today | System |
| Project Number | From estimate | Auto |
| Customer | From estimate | Auto |
| Site Address | From estimate | Auto |

### Change Order Lines

| Field | Type | Example |
|-------|------|---------|
| Description | Text | "Add pool heater — Hayward 110k BTU" |
| Add/Remove | Enum | ADD or REMOVE |
| Amount | Decimal | $2,400.00 |

### Change Order Impact

When a change order is approved:
1. BOM is updated with added/removed items
2. Budget lines are adjusted
3. Proposal total is recalculated
4. Payment schedule amounts update proportionally
5. Activity log entry created

---

## PROPOSAL NUMBER FORMAT

Pattern: `Q{YY}{MM}{SEQ}`

- `Q` = Quote prefix
- `YY` = 2-digit year
- `MM` = 2-digit month
- `SEQ` = 4-digit sequence (0001, 0002, etc.)

Example: `Q25050001` = Quote, 2025, May, first estimate of that month.

Auto-generated on estimate creation. Unique constraint in database.

---

*Next: See `07-PO-AND-BUDGET.md` for purchase orders and budget tracking.*
