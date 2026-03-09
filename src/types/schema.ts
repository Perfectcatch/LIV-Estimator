// ══════════════════════════════════════════════════════════════
// Lightweight types extracted from database.ts for runtime use.
// Only the interfaces that are actively imported live here so
// webpack doesn't have to serialize the full 133 KB file.
// ══════════════════════════════════════════════════════════════

// ── Supabase Database generic ────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = Record<string, any>;

// ── Domain interfaces ────────────────────────────────────────

export interface ActivityLogs {
  id: string;
  owner_id: string;
  activity_type: string;
  entity_type: string;
  entity_id?: string;
  entity_name?: string;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Clients {
  id: string;
  owner_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  title?: string;
}

export interface Jobs {
  id: string;
  owner_id: string;
  project_id?: string;
  client_id?: string;
  name: string;
  description?: string;
  status: string;
  start_date?: string;
  target_end_date?: string;
  actual_end_date?: string;
  estimated_revenue?: number;
  actual_revenue?: number;
  estimated_cost?: number;
  actual_cost?: number;
  created_at: string;
  updated_at: string;
}

export interface CatalogItems {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  unit?: string;
  unit_cost?: number;
  markup_percentage?: number;
  cost_code?: string;
  is_active?: boolean;
  source_supplier?: string;
  created_at: string;
  updated_at: string;
}

export interface Proposals {
  id: string;
  owner_id: string;
  client_id?: string;
  name: string;
  status: string;
  final_total?: number;
  created_at: string;
  updated_at: string;
}

export interface Invoices {
  id: string;
  owner_id: string;
  invoice_number?: string;
  status: string;
  total?: number;
  amount_paid?: number;
  due_date?: string;
  created_at: string;
}

// ── Takeoff & BOM types ──────────────────────────────────────

export interface TakeoffInputs {
  poolLength: number;
  poolWidth: number;
  shallowDepth: number;
  deepDepth: number;
  spaSelection: number;
  spaLength: number;
  spaWidth: number;
  spaDepth: number;
}

export interface TakeoffResults {
  avgDepth: number;
  poolSqFt: number;
  poolPerimeter: number;
  poolGallons: number;
  guniteCY: number;
  excavCY: number;
  haulLoads: number;
  rebarSticks: number;
  rebarLF: number;
  plumbingLF: number;
  spaExists: boolean;
  interiorSF: number;
  tileSF: number;
  copingLF: number;
  fenceLF: number;
  spaCY: number;
}

export interface BomLine {
  skuId: string;
  skuCode: string;
  skuName: string;
  vendorName: string;
  costCodeCode: string;
  stageName: string;
  uom: string;
  quantity: number;
  unitCost: number;
  extCost: number;
  markupPct: number;
  sellPrice: number;
  fixedVar: "FIXED" | "VARIABLE";
  tier: "SKU" | "KIT" | "ASSEMBLY" | "SUPER_ASSEMBLY";
  kitName?: string;
  assemblyName?: string;
  superAssemblyName?: string;
}

// ── Enum-like union types ────────────────────────────────────
export type FixedVar = "FIXED" | "VARIABLE";
export type CostType =
  | "Materials"
  | "Labor"
  | "Subcontractor"
  | "Equipment"
  | "Expense"
  | "Overhead"
  | "Deposits"
  | "Other";

export interface EstimateLineItem {
  id: string;
  type: "group" | "item" | "selection";
  name: string;
  description?: string;
  quantity?: number;
  unit?: string;
  unit_cost?: number;
  markup_percentage?: number;
  total?: number;
  cost_code?: string;
  catalog_item_id?: string;
  formula?: string;
  is_optional?: boolean;
  children?: EstimateLineItem[];
}

export interface EstimateParameter {
  id: string;
  name: string;
  value: number | string;
  unit?: string;
  group?: string;
}

export interface PaymentMilestone {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  due_trigger?: string;
  paid?: boolean;
  paid_at?: string;
}
