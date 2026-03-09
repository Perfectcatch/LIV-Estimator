// Auto-generated TypeScript types for LIV Pools CRM database schema

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// ============================================================
// ENUMS
// ============================================================

export type EstimateStatus = "draft" | "sent" | "approved" | "rejected" | "converted";
export type ItemCategory = "materials" | "labor" | "equipment" | "overhead" | "other";
export type TierType = "single" | "multi";
export type AllowanceDisplayMode = "price" | "cost";
export type VendorCategory = "SUPPLIER" | "SUBCONTRACTOR";
export type FixedVar = "FIXED" | "VARIABLE";
export type CostType = "Materials" | "Labor" | "Subcontractor" | "Equipment" | "Expense" | "Overhead" | "Deposits" | "Other";

// ============================================================
// ESTIMATE LINE ITEM STRUCTURE (JSONB)
// ============================================================

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
  due_date?: string;
  paid_at?: string;
}

export interface ClientSelection {
  category: string;
  selected_index: number;
  selected_name: string;
  cost_delta: number;
}

// ============================================================
// TABLE TYPES
// ============================================================

export interface Profile {
  id: string;
  owner_id: string | null;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  title: string | null;
  measurement_system: string;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  owner_id: string | null;
  name: string;
  logo_url: string | null;
  website: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  license: string | null;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  owner_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  title: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  notes: string | null;
  status: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface Opportunity {
  id: string;
  owner_id: string | null;
  client_id: string | null;
  stage_id: string | null;
  name: string;
  value: number;
  probability: number;
  expected_close: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OpportunityStage {
  id: string;
  owner_id: string | null;
  name: string;
  sort_order: number;
  color: string;
  created_at: string;
}

export interface Job {
  id: string;
  owner_id: string | null;
  client_id: string | null;
  estimate_id: string | null;
  name: string;
  description: string | null;
  status: string;
  start_date: string | null;
  target_end_date: string | null;
  actual_end_date: string | null;
  estimated_revenue: number;
  actual_revenue: number;
  estimated_cost: number;
  actual_cost: number;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  owner_id: string | null;
  job_id: string | null;
  assigned_to: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  owner_id: string | null;
  job_id: string | null;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScheduleItem {
  id: string;
  owner_id: string | null;
  schedule_id: string;
  title: string;
  start_date: string | null;
  end_date: string | null;
  status: string;
  color: string;
  sort_order: number;
  created_at: string;
}

export interface DailyLog {
  id: string;
  owner_id: string | null;
  job_id: string | null;
  log_date: string;
  title: string | null;
  notes: string | null;
  weather: string | null;
  workers_on_site: number;
  status: string;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TimeEntry {
  id: string;
  owner_id: string | null;
  job_id: string | null;
  job_line_item_id: string | null;
  team_member_id: string | null;
  description: string | null;
  clock_in: string | null;
  clock_out: string | null;
  duration_hours: number | null;
  hourly_rate: number;
  labor_cost: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CatalogItem {
  id: string;
  owner_id: string | null;
  name: string;
  description: string | null;
  category: ItemCategory;
  subcategory: string | null;
  unit: string;
  unit_cost: number;
  markup_percentage: number;
  unit_cost_formula: string | null;
  quantity_formula: string | null;
  cost_code: string | null;
  image_url: string | null;
  linked_estimate_template_id: string | null;
  is_active: boolean;
  is_allowance: boolean;
  allowance_display_mode: AllowanceDisplayMode;
  source_url: string | null;
  source_supplier: string | null;
  last_price_sync: string | null;
  price_sync_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientEstimate {
  id: string;
  owner_id: string | null;
  client_id: string | null;
  project_id: string | null;
  name: string;
  description: string | null;
  status: EstimateStatus;
  line_items: EstimateLineItem[];
  parameters: EstimateParameter[];
  parameter_groups: Json[];
  client_selections: ClientSelection[];
  optional_groups: Json | null;
  tier_estimates: Json | null;
  work_schedule: Json | null;
  payment_schedule: PaymentMilestone[];
  page_blocks: Json | null;
  custom_styles: Json | null;
  subtotal: number;
  markup_total: number;
  total: number;
  tax_rate: number;
  tax_amount: number;
  share_token: string | null;
  is_approvable: boolean;
  client_approved_at: string | null;
  client_acknowledged_at: string | null;
  client_signature_data: Json | null;
  converted_to_job_at: string | null;
  job_id: string | null;
  first_viewed_at: string | null;
  last_viewed_at: string | null;
  view_count: number;
  document_template_id: string | null;
  cover_image_url: string | null;
  tier_type: TierType;
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  owner_id: string | null;
  client_id: string | null;
  estimate_id: string | null;
  name: string;
  description: string | null;
  status: string;
  share_token: string;
  pricing_display: string;
  base_price: number;
  selected_total: number;
  final_total: number;
  client_approved_at: string | null;
  client_notes: string | null;
  canvas_width: number;
  canvas_height: number;
  pages: Json[];
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  owner_id: string | null;
  client_id: string | null;
  job_id: string | null;
  estimate_id: string | null;
  invoice_number: string | null;
  status: string;
  subtotal: number;
  tax_amount: number;
  total: number;
  amount_paid: number;
  due_date: string | null;
  paid_at: string | null;
  notes: string | null;
  line_items: Json[];
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  owner_id: string | null;
  job_id: string | null;
  vendor_id: string | null;
  description: string;
  amount: number;
  category: string | null;
  status: string;
  receipt_url: string | null;
  expense_date: string;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrder {
  id: string;
  owner_id: string | null;
  job_id: string | null;
  vendor_id: string | null;
  estimate_id: string | null;
  po_number: string | null;
  status: string;
  subtotal: number;
  total: number;
  notes: string | null;
  issued_at: string | null;
  expected_delivery: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChangeOrder {
  id: string;
  owner_id: string | null;
  job_id: string | null;
  client_id: string | null;
  estimate_id: string | null;
  co_number: string | null;
  title: string;
  description: string | null;
  status: string;
  subtotal: number;
  total: number;
  client_approved_at: string | null;
  line_items: Json[];
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  owner_id: string | null;
  client_id: string | null;
  job_id: string | null;
  estimate_id: string | null;
  template_id: string | null;
  title: string;
  status: string;
  content: string | null;
  total_value: number;
  signed_at: string | null;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  owner_id: string | null;
  name: string;
  category: VendorCategory;
  email: string | null;
  phone: string | null;
  address: string | null;
  contact_name: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  owner_id: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  role: string;
  hourly_rate: number | null;
  created_at: string;
  updated_at: string;
}

export interface Workflow {
  id: string;
  owner_id: string | null;
  name: string;
  description: string | null;
  trigger_type: string | null;
  trigger_config: Json;
  actions: Json[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommunityPost {
  id: string;
  owner_id: string | null;
  author: string | null;
  title: string;
  content: string | null;
  category: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// LIV POOLS POOL-SPECIFIC TYPES
// ============================================================

export interface CostCode {
  id: string;
  owner_id: string | null;
  code: string;
  stage_name: string;
  cost_type: CostType;
  stage_num: number;
  jt_code: number | null;
  jt_id: string | null;
  description: string | null;
  created_at: string;
}

export interface Formula {
  id: string;
  owner_id: string | null;
  named_range: string;
  description: string;
  expression: string;
  unit: string | null;
  notes: string | null;
  created_at: string;
}

export interface Sku {
  id: string;
  owner_id: string | null;
  code: string;
  name: string;
  vendor_id: string | null;
  cost_code_id: string | null;
  uom: string;
  unit_cost: number;
  markup_pct: number;
  fixed_var: FixedVar;
  default_qty: number;
  formula_ref: string | null;
  category: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Kit {
  id: string;
  owner_id: string | null;
  code: string;
  name: string;
  description: string | null;
  category: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Assembly {
  id: string;
  owner_id: string | null;
  code: string;
  name: string;
  description: string | null;
  division: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SuperAssembly {
  id: string;
  owner_id: string | null;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BudgetLine {
  id: string;
  owner_id: string | null;
  estimate_id: string;
  cost_code_id: string | null;
  budgeted_cost: number;
  actual_cost: number;
  committed_cost: number;
  variance: number;
  created_at: string;
  updated_at: string;
}

export interface JobStage {
  id: string;
  owner_id: string | null;
  estimate_id: string;
  cost_code_id: string | null;
  stage_name: string;
  stage_num: number;
  status: string;
  scheduled_date: string | null;
  completed_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppSettings {
  id: string;
  owner_id: string | null;
  company_name: string;
  city_state_zip: string;
  license: string;
  phone: string;
  email: string;
  default_markup: number;
  tax_rate: number;
  deposit_pct: number;
  shell_pct: number;
  equipment_pct: number;
  final_pct: number;
  target_margin: number;
  min_margin: number;
  round_up: boolean;
  round_granularity: number;
  created_at: string;
  updated_at: string;
}

// ============================================================
// TAKEOFF INPUTS (pool-specific, not stored — computed in UI)
// ============================================================

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
  id?: string;
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
  fixedVar: FixedVar;
  tier: "SKU" | "KIT" | "ASSEMBLY" | "SUPER_ASSEMBLY";
  assemblyName?: string;
  kitName?: string;
  superAssemblyName?: string;
}

// ============================================================
// DATABASE HELPER TYPE (for Supabase generics)
// ============================================================

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      organizations: { Row: Organization; Insert: Partial<Organization>; Update: Partial<Organization> };
      clients: { Row: Client; Insert: Partial<Client>; Update: Partial<Client> };
      contacts: { Row: { id: string; owner_id: string | null; client_id: string | null; name: string; email: string | null; phone: string | null; role: string | null; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      opportunities: { Row: Opportunity; Insert: Partial<Opportunity>; Update: Partial<Opportunity> };
      opportunity_stages: { Row: OpportunityStage; Insert: Partial<OpportunityStage>; Update: Partial<OpportunityStage> };
      jobs: { Row: Job; Insert: Partial<Job>; Update: Partial<Job> };
      job_line_items: { Row: { id: string; owner_id: string | null; job_id: string | null; name: string; description: string | null; quantity: number; unit_cost: number; total: number; cost_code: string | null; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      tasks: { Row: Task; Insert: Partial<Task>; Update: Partial<Task> };
      task_templates: { Row: { id: string; owner_id: string | null; name: string; description: string | null; tasks: Json; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      schedules: { Row: Schedule; Insert: Partial<Schedule>; Update: Partial<Schedule> };
      schedule_items: { Row: ScheduleItem; Insert: Partial<ScheduleItem>; Update: Partial<ScheduleItem> };
      daily_logs: { Row: DailyLog; Insert: Partial<DailyLog>; Update: Partial<DailyLog> };
      daily_log_photos: { Row: { id: string; owner_id: string | null; daily_log_id: string; url: string; caption: string | null; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      specifications: { Row: { id: string; owner_id: string | null; job_id: string | null; title: string; category: string | null; content: string | null; file_url: string | null; created_at: string; updated_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      time_entries: { Row: TimeEntry; Insert: Partial<TimeEntry>; Update: Partial<TimeEntry> };
      catalog_items: { Row: CatalogItem; Insert: Partial<CatalogItem>; Update: Partial<CatalogItem> };
      estimate_templates: { Row: { id: string; owner_id: string | null; name: string; category: string | null; description: string | null; line_items: Json; created_at: string; updated_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      client_estimates: { Row: ClientEstimate; Insert: Partial<ClientEstimate>; Update: Partial<ClientEstimate> };
      proposals: { Row: Proposal; Insert: Partial<Proposal>; Update: Partial<Proposal> };
      invoices: { Row: Invoice; Insert: Partial<Invoice>; Update: Partial<Invoice> };
      expenses: { Row: Expense; Insert: Partial<Expense>; Update: Partial<Expense> };
      purchase_orders: { Row: PurchaseOrder; Insert: Partial<PurchaseOrder>; Update: Partial<PurchaseOrder> };
      purchase_order_items: { Row: { id: string; owner_id: string | null; purchase_order_id: string; description: string; quantity: number; unit: string; unit_cost: number; total: number; cost_code: string | null; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      change_orders: { Row: ChangeOrder; Insert: Partial<ChangeOrder>; Update: Partial<ChangeOrder> };
      lien_waivers: { Row: { id: string; owner_id: string | null; job_id: string | null; vendor_id: string | null; waiver_type: string; amount: number; status: string; due_date: string | null; signed_at: string | null; document_url: string | null; created_at: string; updated_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      contract_templates: { Row: { id: string; owner_id: string | null; name: string; description: string | null; content: string | null; fields: Json; created_at: string; updated_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      contracts: { Row: Contract; Insert: Partial<Contract>; Update: Partial<Contract> };
      contract_signers: { Row: { id: string; owner_id: string | null; contract_id: string; name: string; email: string; role: string; signed_at: string | null; signature_data: Json | null; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      workflows: { Row: Workflow; Insert: Partial<Workflow>; Update: Partial<Workflow> };
      workflow_runs: { Row: { id: string; owner_id: string | null; workflow_id: string; status: string; started_at: string; completed_at: string | null; error: string | null; context: Json }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      notifications: { Row: { id: string; owner_id: string | null; user_id: string | null; title: string; body: string | null; type: string; read_at: string | null; entity_type: string | null; entity_id: string | null; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      messages: { Row: { id: string; owner_id: string | null; from_user_id: string | null; to_user_id: string | null; job_id: string | null; body: string; read_at: string | null; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      activity_logs: { Row: { id: string; owner_id: string | null; user_id: string | null; entity_type: string | null; entity_id: string | null; action: string; description: string | null; metadata: Json; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      community_posts: { Row: CommunityPost; Insert: Partial<CommunityPost>; Update: Partial<CommunityPost> };
      bug_reports: { Row: { id: string; owner_id: string | null; title: string; description: string | null; severity: string; status: string; screenshot_url: string | null; reward_paid: boolean; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      feature_requests: { Row: { id: string; owner_id: string | null; title: string; description: string | null; votes: number; status: string; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      beta_status: { Row: { id: string; owner_id: string | null; user_id: string | null; rank: string; bugs_zapped: number; monthly_savings: number; created_at: string; updated_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      vendors: { Row: Vendor; Insert: Partial<Vendor>; Update: Partial<Vendor> };
      team_members: { Row: TeamMember; Insert: Partial<TeamMember>; Update: Partial<TeamMember> };
      app_settings: { Row: AppSettings; Insert: Partial<AppSettings>; Update: Partial<AppSettings> };
      cost_codes: { Row: CostCode; Insert: Partial<CostCode>; Update: Partial<CostCode> };
      formulas: { Row: Formula; Insert: Partial<Formula>; Update: Partial<Formula> };
      skus: { Row: Sku; Insert: Partial<Sku>; Update: Partial<Sku> };
      kits: { Row: Kit; Insert: Partial<Kit>; Update: Partial<Kit> };
      kit_skus: { Row: { id: string; owner_id: string | null; kit_id: string; sku_id: string; quantity: number; sort_order: number }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      assemblies: { Row: Assembly; Insert: Partial<Assembly>; Update: Partial<Assembly> };
      assembly_kits: { Row: { id: string; owner_id: string | null; assembly_id: string; kit_id: string; quantity: number; sort_order: number }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      super_assemblies: { Row: SuperAssembly; Insert: Partial<SuperAssembly>; Update: Partial<SuperAssembly> };
      super_assembly_assemblies: { Row: { id: string; owner_id: string | null; super_assembly_id: string; assembly_id: string; quantity: number; sort_order: number }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
      budget_lines: { Row: BudgetLine; Insert: Partial<BudgetLine>; Update: Partial<BudgetLine> };
      job_stages: { Row: JobStage; Insert: Partial<JobStage>; Update: Partial<JobStage> };
      job_statuses: { Row: { id: string; owner_id: string | null; name: string; color: string; sort_order: number; created_at: string }; Insert: Record<string, unknown>; Update: Record<string, unknown> };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
