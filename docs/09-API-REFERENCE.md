# 09 — API REFERENCE

> Complete API route documentation for all server endpoints.

---

## CATALOG API

### SKUs

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/catalog/skus` | List all SKUs (filterable by category, vendor, costType, stage) |
| `GET` | `/api/catalog/skus?search=cap+2in` | Search SKUs by name or code |
| `POST` | `/api/catalog/skus` | Create a new SKU |
| `GET` | `/api/catalog/skus/[id]` | Get single SKU with relations |
| `PUT` | `/api/catalog/skus/[id]` | Update SKU |
| `DELETE` | `/api/catalog/skus/[id]` | Delete SKU (fails if in active BOM) |
| `POST` | `/api/catalog/skus/import` | Bulk import from CSV |

**Query Parameters for GET /skus:**

| Param | Type | Example |
|-------|------|---------|
| `category` | string | `PLUMBING`, `EQUIPMENT` |
| `vendor` | string | vendor ID |
| `costType` | enum | `MATERIALS`, `LABOR`, `EQUIPMENT` |
| `stage` | string | `Plumbing`, `Equipment` |
| `fixedVar` | enum | `FIXED`, `VARIABLE` |
| `search` | string | Free-text search on code + name |
| `page` | number | Pagination (default 1) |
| `limit` | number | Page size (default 50, max 500) |

### Kits

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/catalog/kits` | List all kits with SKU counts |
| `POST` | `/api/catalog/kits` | Create kit with member SKUs |
| `GET` | `/api/catalog/kits/[id]` | Get kit with all member SKUs |
| `PUT` | `/api/catalog/kits/[id]` | Update kit (name, members, order) |
| `DELETE` | `/api/catalog/kits/[id]` | Delete kit |
| `POST` | `/api/catalog/kits/[id]/skus` | Add SKU to kit |
| `DELETE` | `/api/catalog/kits/[id]/skus/[skuId]` | Remove SKU from kit |

### Assemblies

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/catalog/assemblies` | List all assemblies with kit counts |
| `POST` | `/api/catalog/assemblies` | Create assembly with member kits |
| `GET` | `/api/catalog/assemblies/[id]` | Get assembly with all kits → SKUs |
| `PUT` | `/api/catalog/assemblies/[id]` | Update assembly |
| `DELETE` | `/api/catalog/assemblies/[id]` | Delete assembly |

### Super-Assemblies

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/catalog/super-assemblies` | List all SAs with assembly counts |
| `POST` | `/api/catalog/super-assemblies` | Create SA with member assemblies |
| `GET` | `/api/catalog/super-assemblies/[id]` | Get SA with full hierarchy |
| `PUT` | `/api/catalog/super-assemblies/[id]` | Update SA |

### Full Hierarchy

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/catalog/hierarchy` | Full 4-tier tree for BOM engine |

---

## ESTIMATE API

### Estimates

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates` | List estimates (filterable by status) |
| `POST` | `/api/estimates` | Create new estimate (auto-generates proposal #) |
| `GET` | `/api/estimates/[id]` | Get estimate with all nested data |
| `PUT` | `/api/estimates/[id]` | Update estimate (project info, design, pricing) |
| `DELETE` | `/api/estimates/[id]` | Soft-delete estimate |
| `POST` | `/api/estimates/[id]/duplicate` | Clone estimate with new proposal # |

**POST /api/estimates — Create Estimate**

```typescript
// Request body
{
  customerName: string       // required
  address: string            // required
  cityCounty: string         // required
  zip: string                // required
  state?: string             // default "FL"
  phoneCel?: string
  email?: string
  projectName?: string
}

// Response: full Estimate object with auto-generated:
//   - proposalNumber (Q{YY}{MM}{SEQ})
//   - takeoff (default dimensions)
//   - 8 selections (all defaults = 0)
//   - budget lines (all 27 cost codes)
//   - 4 payment milestones
//   - job stages (all 27 cost codes)
```

### Selections

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/selections` | Get all 8 selections |
| `PUT` | `/api/estimates/[id]/selections` | Update selections (triggers BOM recalc) |

**PUT body:**
```typescript
{
  selections: [
    { category: "INTERIOR_FINISH", optionIndex: 1 },
    { category: "EQUIPMENT", optionIndex: 0 },
    // ... all 8 categories
  ]
}
```

### Takeoff

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/takeoff` | Get takeoff inputs + calculated values |
| `PUT` | `/api/estimates/[id]/takeoff` | Update dimensions (triggers recalculation) |

### BOM

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/bom` | Get current BOM lines (all tiers) |
| `POST` | `/api/estimates/[id]/bom` | Recalculate BOM from current selections + takeoff |
| `GET` | `/api/estimates/[id]/bom/stage-summary` | BOM aggregated by construction stage |
| `GET` | `/api/estimates/[id]/bom/vendor-summary` | BOM aggregated by vendor |

### Pricing

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/pricing` | Get pricing settings + summary |
| `PUT` | `/api/estimates/[id]/pricing` | Update pricing controls (triggers recalc) |

### Proposal

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/proposal` | Get proposal data |
| `GET` | `/api/estimates/[id]/proposal?format=pdf` | Download proposal PDF |
| `POST` | `/api/estimates/[id]/proposal/send` | Email proposal to customer |

### Purchase Orders

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/po` | List POs for this estimate |
| `POST` | `/api/estimates/[id]/po/build` | Generate POs via PO builder |
| `GET` | `/api/estimates/[id]/po/[poId]` | Get single PO with lines |
| `PUT` | `/api/estimates/[id]/po/[poId]` | Update PO status |
| `GET` | `/api/estimates/[id]/po/[poId]?format=pdf` | Download PO PDF |

**POST /api/estimates/[id]/po/build — PO Builder**
```typescript
{
  poType: "SUPPLIER" | "SUBCONTRACTOR"
  stages: string[]                    // Cost code IDs to include
  selectedItems: string[]             // BomLine IDs to include
  vendorOverride?: string             // Vendor ID (null = keep original)
}
```

### Budget

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/budget` | Get all budget lines |
| `PUT` | `/api/estimates/[id]/budget/[lineId]` | Update committed/actual amounts |

### Change Orders

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/change-orders` | List change orders |
| `POST` | `/api/estimates/[id]/change-orders` | Create change order |
| `PUT` | `/api/estimates/[id]/change-orders/[coId]` | Update change order |
| `POST` | `/api/estimates/[id]/change-orders/[coId]/approve` | Approve CO (updates BOM + budget) |

### Job Tracker

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/job-stages` | Get all stages with status |
| `PUT` | `/api/estimates/[id]/job-stages/[stageId]` | Update stage status/dates |

### Payments

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/payments` | Get all 4 payment milestones |
| `PUT` | `/api/estimates/[id]/payments/[paymentId]` | Record payment |

### Activity Log

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/estimates/[id]/activity` | Get changelog entries |

---

## REFERENCE DATA API

### Vendors

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/vendors` | List all vendors |
| `POST` | `/api/vendors` | Create vendor |
| `PUT` | `/api/vendors/[id]` | Update vendor |
| `GET` | `/api/vendors/[id]/pricing` | Vendor pricing summary across estimates |

### Cost Codes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/cost-codes` | List all cost codes |
| `PUT` | `/api/cost-codes/[id]` | Update cost code (JT ID, description) |

### Formulas

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/formulas` | List all formulas |
| `POST` | `/api/formulas/calculate` | Calculate values from inputs |

### Settings

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/settings` | Get app settings |
| `PUT` | `/api/settings` | Update app settings |

---

## INTEGRATION API

### JobTread

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/jobtread/sync` | Push budget / pull actuals for an estimate |
| `GET` | `/api/jobtread/status` | Check JobTread connection status |

---

## COMMON PATTERNS

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Customer name is required",
    "field": "customerName"
  }
}
```

### Pagination Response
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 428,
    "totalPages": 9
  }
}
```

### Validation
All request bodies are validated with Zod schemas. Invalid requests return 400 with field-level error messages.

---

*End of system directory. Return to `00-SYSTEM-DIRECTORY.md` for the master index.*
