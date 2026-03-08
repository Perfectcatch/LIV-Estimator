# 04 — ESTIMATE WORKFLOW

> The end-to-end flow from creating a new estimate through customer output.  
> This mirrors the Excel workbook's core workflow: Project Info → Selections → Takeoff → BOM → Pricing → Proposal.

---

## WORKFLOW OVERVIEW

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ 1. PROJECT   │──▶│ 2. SELECTIONS│──▶│ 3. TAKEOFF   │──▶│ 4. BOM       │
│    INFO      │   │              │   │              │   │    ENGINE    │
│              │   │ 8 category   │   │ Dimensions   │   │ Auto-explode │
│ Customer     │   │ dropdowns    │   │ → formulas   │   │ 4-tier       │
│ Pool Design  │   │ (0-3 each)   │   │ → quantities │   │ hierarchy    │
│ Spa / Deck   │   │              │   │              │   │              │
│ Screen       │   │              │   │              │   │              │
│ Addons       │   │              │   │              │   │              │
└──────────────┘   └──────────────┘   └──────────────┘   └──────┬───────┘
                                                                │
                                                                ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ 8. PURCHASE  │◀──│ 7. CONTRACT  │◀──│ 6. PROPOSAL  │◀──│ 5. PRICING   │
│    ORDERS    │   │              │   │              │   │    HUB       │
│              │   │ Formal       │   │ PDF-ready    │   │              │
│ PO Builder   │   │ agreement    │   │ document     │   │ Markup       │
│ per vendor   │   │ with scope   │   │ with payment │   │ Division     │
│              │   │ and terms    │   │ schedule     │   │ Margin check │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
```

---

## STEP 1 — PROJECT INFO (`/estimates/[id]`)

This is the **primary input form** and mirrors `10-PROJECT-INFO` from the Excel sheet. It's the main screen estimators use to build an estimate.

### Section Layout (matches Excel exactly)

The form is organized into these sections, laid out in a two-column grid pattern matching the Excel sheet:

#### LEFT COLUMN

**Customer Information**
| Field | Type | Required | Source |
|-------|------|----------|--------|
| Customer Name | Text | Yes | Manual input |
| Address | Text | Yes | Manual input |
| City / County | Text | Yes | Manual input |
| State | Text (default FL) | Yes | Manual input |
| ZIP | Text | Yes | Manual input |
| Phone (Cell) | Phone | No | Manual input |
| Phone (Home) | Phone | No | Manual input |
| Email | Email | No | Manual input |
| Project Name | Text | No | Manual input |

**General Site Conditions** (checkboxes)
| Condition | Default | Notes |
|-----------|---------|-------|
| Silt Fence Installation | ☑ Checked | Standard requirement |
| Dewatering | ☐ Unchecked | Only if water table |
| Yard Scrape | ☑ Checked | Standard requirement |
| Cap Irrigation | ☐ Unchecked | If irrigation exists |

**Pool Design — Base Pool & Excavation**
| Line Item | Units | Qty Field | Amount (calc'd) |
|-----------|-------|-----------|-----------------|
| Base Pool | sqft | Input | Auto |
| Raised Above Grade | lf | Input | Auto |
| Excavation | cy | Calc'd from takeoff | Auto |
| Pool Depth Over 5ft | lf | Input | Auto |
| Remove Existing Slab | sqft | Input | Auto |

**Pool Design — Access Items**
| Line Item | Units | Qty Field |
|-----------|-------|-----------|
| Sunshelf / Beach Entry | sqft | Input |
| Swimout / Bench | lf | Input |
| Extra Steps | sqft | Input |
| Half-Round Steps (x3) | ea | Input |
| SS Handrail 48" | ea | Input |
| SS Step Ladder 24" | ea | Input |

**Pool Design — Trim & Finish**
| Line Item | Units | Qty Field |
|-----------|-------|-----------|
| Coping | lf | Input |
| Pool Finish (Interior) | sqft | Input |
| Waterline Tile | lf | Input |
| Raised Tile Bond Beam | lf | Input |
| Tile Backside Raised | lf | Input |
| Stucco Riser Face | ea | Input |

**Spa Design — Spa Construction**
| Line Item | Units | Qty Field |
|-----------|-------|-----------|
| Base Spa | sqft | Input (default 100) |
| Spa Over Base | sqft | Input |
| Raised per 6" Above | in | Input (default 18) |
| Therapy Jets (4 incl) | ea | Input (default 1) |
| Spillways ≤12" Wide | ea | Input |
| SS Handrail 48" | ea | Input |

**Decking Design — Deck Areas**
| Line Item | Units | Qty Field |
|-----------|-------|-----------|
| Main Deck | sqft | Input |
| 2nd Deck | sqft | Input |
| Custom Deck #1 | sqft | Input |
| Custom Deck #2 | sqft | Input |

**Screen Enclosure**
| Line Item | Type |
|-----------|------|
| Screen Type | Dropdown |
| Screen Color | Dropdown |
| Screen Roof | Dropdown |
| Wall Perimeter | Input |
| Wall Height | Input |
| Doors | Input |

**Additional Items** — 10 freeform line item slots (#1 - #10)

**Options / Upgrades** — Left column (included) + Right column (optional)

#### RIGHT COLUMN

**Proposal # & Date** (auto-generated, top-right)
| Field | Value |
|-------|-------|
| Proposal # | Q25{MM}{seq} |
| Date | Auto-today |

**Pool Specifications** (calculated from takeoff)
| Spec | Source |
|------|--------|
| Pool Area (sqft) | Takeoff calc |
| Perimeter (ft) | Takeoff calc |
| Shallow Depth | Takeoff input |
| Opt. Depth 2 | Takeoff input |
| Deep Depth | Takeoff input |
| Avg. Depth | Formula calc |
| Interior Area | Formula calc |
| Gallons | Formula calc |
| Shape / Style | Dropdown |

**Pricing Controls**
| Setting | Source |
|---------|--------|
| Division | Dropdown: retail / residential / commercial |
| Target Margin | From settings (editable) |
| Min Margin | From settings |
| Round-Up | Toggle |
| Granularity | Input |
| Deposit % | From settings |
| Shell % | From settings |

**Standard Plumbing Checklist** (right column, read-only counts)
| Component | Qty Source |
|-----------|-----------|
| Returns | Takeoff calc |
| Skimmer | Default/input |
| Vac Port | Default/input |
| Main Drain Pots | Default |
| Heater | Selection |
| Floor Return | Input |
| Bubbler | Input |
| LED Bubbler | Input |
| Side Suction | Input |
| Channel Drain | Input |
| Autofill | Input |

**Standard Electrical Checklist**
| Component | Source |
|-----------|--------|
| Sub-Panel | Default |
| Pump (Var SPD) | Selection |
| Pool Light (LED) | Selection |
| Automation | Selection |
| Color-RGB | Selection |

**Spa Plumbing Checklist**
| Component | Source |
|-----------|--------|
| Spa Returns | Takeoff calc |
| Spa Skimmer | Default |
| Spa Drain | Default |
| Spa Bubbler | Input |
| Spa Auto Fill | Input |

**Footers / Raised Beams**
| Component | Source |
|-----------|--------|
| Screen Footer | Input |
| Retaining Wall | Input |
| 6" Rise w/ Coping | Input |
| Stucco Riser Face | Input |

**Project Totals** (bottom of form — running summary)
| Section | Subtotal |
|---------|----------|
| Pool Design | Calc |
| Pool Equipment | Calc |
| Spa Construction | Calc |
| Spa Equipment | Calc |
| Decking | Calc |
| Screen | Calc |
| Addons | Calc |
| Upgrades | Calc |
| Optional | Calc |
| **BASE POOL TOTAL** | **Sum** |
| **TOTAL w/ OPTIONS** | **Sum** |
| **TOTAL PROPOSAL** | **Grand Total** |

---

## STEP 2 — SELECTIONS (`/estimates/[id]/selections`)

Eight category panels, each with 4 options (index 0-3). Mirrors `11-SELECTIONS`.

### UI Pattern
Each category shows as a card with radio-button options:

```
┌─────────────────────────────────────────────┐
│ INTERIOR FINISH                             │
│                                             │
│  ○ 0  Standard Plaster        +$0           │
│       White plaster — entry level           │
│  ● 1  Quartz Finish          +$3.60/sqft    │
│       Quartz blend — most popular           │
│  ○ 2  Pebble Tec             +$8.30/sqft    │
│       Pebble aggregate — premium            │
│  ○ 3  Pebble Sheen           +$10.50/sqft   │
│       Fine pebble — luxury option           │
│                                             │
│  SELECTED: 1 — Quartz Finish                │
└─────────────────────────────────────────────┘
```

### Selection Options Data

| Category | Opt 0 (Base) | Opt 1 | Opt 2 | Opt 3 |
|----------|-------------|-------|-------|-------|
| Interior Finish | Standard Plaster ($0) | Quartz ($3.60) | Pebble Tec ($8.30) | Pebble Sheen ($10.50) |
| Coping | Trav 12x12 ($0) | Trav 12x24 (+$10) | Cantilever (-$5) | Bullnose (+$15) |
| Equipment | IntelliFlo 1.5HP ($0) | IntelliFlo 2.0HP (+$130) | Jandy JEP (-$30) | Hayward MaxFlo (-$50) |
| Sanitization | Chlorine Only ($0) | Salt IC40 (+$620) | Salt IC60 (+$820) | UV+Salt (+$1100) |
| Automation | Manual ($0) | IntelliCenter (+$1850) | iAqualink (+$1650) | OmniLogic (+$1750) |
| Heating | No Heater ($0) | 110k BTU (+$2400) | 140k BTU (+$2900) | Gas 400k (+$1800) |
| Lighting | No Lights ($0) | 1 LED (+$285) | 2 LED (+$570) | 2 LED + Spa (+$855) |
| Spa | Pool Only ($0) | 6x8 Spa (+$8500) | 8x8 Spa (+$10500) | Raised Spillway (+$12000) |

---

## STEP 3 — TAKEOFF (`/estimates/[id]/takeoff`)

### Input Fields (from 12-TAKEOFF)

| Field | Default | Unit |
|-------|---------|------|
| Pool Length | 32 | ft |
| Pool Width | 16 | ft |
| Shallow Depth | 3.5 | ft |
| Deep Depth | 5.5 | ft |
| Spa Length | 8 | ft |
| Spa Width | 6 | ft |
| Spa Depth | 3.5 | ft |

### Calculated Values (from 08-FORMULA-LIBRARY)

All formulas compute automatically when dimensions change:

| Named Range | Description | Formula | Unit |
|-------------|------------|---------|------|
| `POOL_AvgDepth` | Average pool depth | `(shallowDepth + deepDepth) / 2` | ft |
| `POOL_SqFt` | Pool surface area | `poolLength × poolWidth` | SF |
| `POOL_Perimeter` | Pool perimeter | `2 × (poolLength + poolWidth)` | LF |
| `CALC_PoolGallons` | Pool volume | `length × width × avgDepth × 7.48` | gal |
| `CALC_GuniteCY` | Gunite volume | Walls 6in + floor 4in calculation | CY |
| `CALC_ExcavCY` | Excavation volume | 3ft overdig each side, 2ft deeper | CY |
| `CALC_HaulLoads` | Haul-away loads | `excavCY / 14` | loads |
| `CALC_RebarSticks` | Rebar stick count | 20ft sticks, 30in OC grid | EA |
| `CALC_RebarLF` | Rebar linear feet | Stick count × 20 | LF |
| `CALC_PlumbingLF` | Plumbing pipe total | `1.5 × perimeter` avg | LF |
| `SPA_Exists` | Spa boolean | 0 or 1 based on selection | bool |
| `CALC_InteriorSF` | Interior finish SF | Includes spa if present | SF |
| `CALC_TileSF` | Waterline tile area | 1ft band at waterline | SF |
| `CALC_CopingLF` | Coping linear feet | + spa perimeter if spa | LF |
| `CALC_FenceLF` | Temp fence LF | Perimeter × 1.2 safety buffer | LF |
| `CALC_SpaCY` | Spa gunite volume | Zero if no spa | CY |
| `CALC_PMFee` | Project management fee | 8% of non-overhead cost base | $ |

---

## STEP 4 — BOM ENGINE

> See `05-BOM-ENGINE.md` for the full explosion algorithm.

The BOM Engine takes selections + calculated quantities and explodes the entire 4-tier hierarchy into a flat list of priced SKU lines. Every time selections or takeoff values change, the BOM re-explodes.

---

## STEP 5 — PRICING HUB (`/estimates/[id]/pricing`)

### Controls (from 14-PRICING-ENGINE + 16-PRICING-HUB)

| Setting | Options | Effect |
|---------|---------|--------|
| Division | Retail (1.0) / Residential (0.85) / Commercial (0.90) | Multiplied against sell price |
| Pool Count | 1-10 | Volume discount tier |
| Global Markup | 1.0 - 3.0 | Applied to all line items |
| Target Margin | 0 - 1.0 | Alert threshold (green/yellow/red) |
| Min Margin | 0 - 1.0 | Red alert if below |
| Round-Up | true/false | Round sell prices up |
| Round Granularity | $25 / $50 / $100 | Round to nearest X |

### Volume Discount Schedule

| Pool Count | Discount |
|-----------|----------|
| 1 | 0% |
| 2 | 3% |
| 3 | 5% |
| 5+ | 7% |
| 10+ | 10% |

### Sell Price Formula

```
sellPrice = (unitCost × quantity) / (1 - markupPct) × divisionMultiplier × (1 - volumeDiscount)
```

If `roundUp` is true:
```
sellPrice = ceil(sellPrice / granularity) × granularity
```

---

## STEP 6 — PROPOSAL

> See `06-PROPOSAL-SYSTEM.md` for full proposal generation logic.

---

## ESTIMATE STATUS LIFECYCLE

```
DRAFT ──▶ PROPOSED ──▶ APPROVED ──▶ IN_PROGRESS ──▶ COMPLETED
  │          │                          │
  ▼          ▼                          ▼
CANCELLED  CANCELLED              Change Orders
```

| Status | Can Edit | Can Generate POs | Can Track Budget |
|--------|---------|-----------------|-----------------|
| DRAFT | Full edit | No | No |
| PROPOSED | Limited (selections, pricing) | No | No |
| APPROVED | Change orders only | Yes | Yes |
| IN_PROGRESS | Change orders only | Yes | Yes |
| COMPLETED | Read-only | Read-only | Read-only |

---

*Next: See `05-BOM-ENGINE.md` for the BOM explosion algorithm.*
