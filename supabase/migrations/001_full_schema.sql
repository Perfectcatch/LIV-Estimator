-- ============================================================
-- LIV POOLS CRM — Full Database Schema
-- Crucible-X feature parity + LIV Pool-specific tables
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- AUTH & USERS
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES auth.users(id),
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  title TEXT,
  measurement_system TEXT DEFAULT 'imperial',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  license TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  role TEXT DEFAULT 'member',
  is_billable BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  user_id UUID REFERENCES auth.users(id),
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'member',
  hourly_rate NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS custom_workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- CRM & CONTACTS
-- ============================================================

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  title TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  type TEXT DEFAULT 'residential',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS opportunity_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  stage_id UUID REFERENCES opportunity_stages(id),
  name TEXT NOT NULL,
  value NUMERIC(12,2) DEFAULT 0,
  probability INT DEFAULT 0,
  expected_close DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- JOBS & PROJECTS
-- ============================================================

CREATE TABLE IF NOT EXISTS job_statuses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6366f1',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  estimate_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  start_date DATE,
  target_end_date DATE,
  actual_end_date DATE,
  estimated_revenue NUMERIC(12,2) DEFAULT 0,
  actual_revenue NUMERIC(12,2) DEFAULT 0,
  estimated_cost NUMERIC(12,2) DEFAULT 0,
  actual_cost NUMERIC(12,2) DEFAULT 0,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_line_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  quantity NUMERIC(10,2) DEFAULT 1,
  unit_cost NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  cost_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  assigned_to UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS task_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  tasks JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS schedule_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'pending',
  color TEXT DEFAULT '#6366f1',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT,
  notes TEXT,
  weather TEXT,
  workers_on_site INT DEFAULT 0,
  status TEXT DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_log_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  daily_log_id UUID REFERENCES daily_logs(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  title TEXT NOT NULL,
  category TEXT,
  content TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  job_line_item_id UUID REFERENCES job_line_items(id),
  team_member_id UUID REFERENCES team_members(id),
  description TEXT,
  clock_in TIMESTAMPTZ,
  clock_out TIMESTAMPTZ,
  duration_hours NUMERIC(6,2),
  hourly_rate NUMERIC(10,2) DEFAULT 0,
  labor_cost NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ESTIMATING & CATALOG
-- ============================================================

CREATE TABLE IF NOT EXISTS catalog_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'materials',
  subcategory TEXT,
  unit TEXT DEFAULT 'ea',
  unit_cost NUMERIC(10,2) DEFAULT 0,
  markup_percentage NUMERIC(6,4) DEFAULT 0.35,
  unit_cost_formula TEXT,
  quantity_formula TEXT,
  cost_code TEXT,
  image_url TEXT,
  linked_estimate_template_id UUID,
  is_active BOOLEAN DEFAULT true,
  is_allowance BOOLEAN DEFAULT false,
  allowance_display_mode TEXT DEFAULT 'price',
  source_url TEXT,
  source_supplier TEXT,
  last_price_sync TIMESTAMPTZ,
  price_sync_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS estimate_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  line_items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS estimate_style_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  organization_id UUID REFERENCES organizations(id),
  font_family TEXT DEFAULT 'Inter',
  primary_color TEXT DEFAULT '#1a1a2e',
  logo_url TEXT,
  show_cost BOOLEAN DEFAULT false,
  show_markup BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS client_estimates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  project_id UUID REFERENCES jobs(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  -- JSONB nested data (Crucible-X pattern)
  line_items JSONB DEFAULT '[]',
  parameters JSONB DEFAULT '[]',
  parameter_groups JSONB DEFAULT '[]',
  client_selections JSONB DEFAULT '[]',
  optional_groups JSONB DEFAULT '[]',
  tier_estimates JSONB,
  work_schedule JSONB,
  payment_schedule JSONB DEFAULT '[]',
  page_blocks JSONB,
  custom_styles JSONB,
  -- Financials
  subtotal NUMERIC(12,2) DEFAULT 0,
  markup_total NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  tax_rate NUMERIC(6,4) DEFAULT 0,
  tax_amount NUMERIC(12,2) DEFAULT 0,
  -- Sharing & approval
  share_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
  is_approvable BOOLEAN DEFAULT false,
  client_approved_at TIMESTAMPTZ,
  client_acknowledged_at TIMESTAMPTZ,
  client_signature_data JSONB,
  converted_to_job_at TIMESTAMPTZ,
  job_id UUID REFERENCES jobs(id),
  -- View tracking
  first_viewed_at TIMESTAMPTZ,
  last_viewed_at TIMESTAMPTZ,
  view_count INT DEFAULT 0,
  -- Presentation
  document_template_id UUID REFERENCES estimate_templates(id),
  cover_image_url TEXT,
  tier_type TEXT DEFAULT 'single',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  estimate_id UUID REFERENCES client_estimates(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  share_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(24), 'hex'),
  pricing_display TEXT DEFAULT 'price',
  base_price NUMERIC(12,2) DEFAULT 0,
  selected_total NUMERIC(12,2) DEFAULT 0,
  final_total NUMERIC(12,2) DEFAULT 0,
  client_approved_at TIMESTAMPTZ,
  client_notes TEXT,
  canvas_width INT DEFAULT 1200,
  canvas_height INT DEFAULT 800,
  pages JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- FINANCE
-- ============================================================

CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  job_id UUID REFERENCES jobs(id),
  estimate_id UUID REFERENCES client_estimates(id),
  invoice_number TEXT,
  status TEXT DEFAULT 'draft',
  subtotal NUMERIC(12,2) DEFAULT 0,
  tax_amount NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  amount_paid NUMERIC(12,2) DEFAULT 0,
  due_date DATE,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  line_items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  vendor_id UUID,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) DEFAULT 0,
  category TEXT,
  status TEXT DEFAULT 'pending',
  receipt_url TEXT,
  expense_date DATE DEFAULT CURRENT_DATE,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS purchase_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  vendor_id UUID,
  estimate_id UUID REFERENCES client_estimates(id),
  po_number TEXT,
  status TEXT DEFAULT 'draft',
  subtotal NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  notes TEXT,
  issued_at TIMESTAMPTZ,
  expected_delivery DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS purchase_order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(10,2) DEFAULT 1,
  unit TEXT DEFAULT 'ea',
  unit_cost NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  cost_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS change_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  client_id UUID REFERENCES clients(id),
  estimate_id UUID REFERENCES client_estimates(id),
  co_number TEXT,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  subtotal NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) DEFAULT 0,
  client_approved_at TIMESTAMPTZ,
  line_items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lien_waivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  vendor_id UUID,
  waiver_type TEXT DEFAULT 'conditional',
  amount NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  due_date DATE,
  signed_at TIMESTAMPTZ,
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- CONTRACTS
-- ============================================================

CREATE TABLE IF NOT EXISTS contract_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  content TEXT,
  fields JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id),
  job_id UUID REFERENCES jobs(id),
  estimate_id UUID REFERENCES client_estimates(id),
  template_id UUID REFERENCES contract_templates(id),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  content TEXT,
  total_value NUMERIC(12,2) DEFAULT 0,
  signed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contract_signers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  contract_id UUID REFERENCES contracts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'client',
  signed_at TIMESTAMPTZ,
  signature_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- AUTOMATION
-- ============================================================

CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT,
  trigger_config JSONB DEFAULT '{}',
  actions JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workflow_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'running',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  error TEXT,
  context JSONB DEFAULT '{}'
);

-- ============================================================
-- COMMUNICATION
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  body TEXT,
  type TEXT DEFAULT 'info',
  read_at TIMESTAMPTZ,
  entity_type TEXT,
  entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  from_user_id UUID REFERENCES auth.users(id),
  to_user_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  body TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  user_id UUID REFERENCES auth.users(id),
  entity_type TEXT,
  entity_id UUID,
  action TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- DASHBOARD & ANALYTICS
-- ============================================================

CREATE TABLE IF NOT EXISTS dashboard_tiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  tile_type TEXT NOT NULL,
  title TEXT,
  config JSONB DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dashboard_layouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  layout JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS custom_analytics_tiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  query_config JSONB DEFAULT '{}',
  chart_type TEXT DEFAULT 'bar',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS analytics_tile_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  query_config JSONB DEFAULT '{}',
  chart_type TEXT DEFAULT 'bar',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- COMMUNITY & BETA
-- ============================================================

CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  author UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  content TEXT,
  category TEXT DEFAULT 'discussion',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bug_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  severity TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  screenshot_url TEXT,
  reward_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  votes INT DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS beta_status (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  rank TEXT DEFAULT 'Rookie',
  bugs_zapped INT DEFAULT 0,
  monthly_savings NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- MEMBERSHIP & BILLING
-- ============================================================

CREATE TABLE IF NOT EXISTS lifetime_membership_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_slots INT DEFAULT 100,
  slots_remaining INT DEFAULT 100,
  price NUMERIC(10,2) DEFAULT 20000,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lifetime_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  user_id UUID REFERENCES auth.users(id),
  amount_paid NUMERIC(10,2) DEFAULT 20000,
  purchased_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- VENDORS (Crucible-X)
-- ============================================================

CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  category TEXT DEFAULT 'SUPPLIER',
  email TEXT,
  phone TEXT,
  address TEXT,
  contact_name TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(owner_id, name)
);

CREATE TABLE IF NOT EXISTS vendor_catalog_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
  catalog_item_id UUID REFERENCES catalog_items(id) ON DELETE CASCADE,
  unit_price NUMERIC(10,2) DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- BIM & PROJECT CONTROLS
-- ============================================================

CREATE TABLE IF NOT EXISTS bim_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  name TEXT NOT NULL,
  file_type TEXT,
  file_url TEXT,
  file_size_mb NUMERIC(8,2),
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS rfis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  rfi_number TEXT,
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'open',
  due_date DATE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS submittals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  submittal_number TEXT,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  due_date DATE,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS punch_lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES jobs(id),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS punch_list_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  punch_list_id UUID REFERENCES punch_lists(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  assigned_to UUID REFERENCES team_members(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- APP SETTINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS app_settings (
  id TEXT PRIMARY KEY DEFAULT 'singleton',
  owner_id UUID REFERENCES auth.users(id),
  company_name TEXT DEFAULT 'LIV Pools LLC',
  city_state_zip TEXT DEFAULT 'Clearwater, FL 34619',
  license TEXT DEFAULT 'CPC1459998',
  phone TEXT DEFAULT '(727) 555-0100',
  email TEXT DEFAULT 'info@livpools.com',
  default_markup NUMERIC(6,4) DEFAULT 1.50,
  tax_rate NUMERIC(6,4) DEFAULT 0.0875,
  deposit_pct NUMERIC(6,4) DEFAULT 0.10,
  shell_pct NUMERIC(6,4) DEFAULT 0.45,
  equipment_pct NUMERIC(6,4) DEFAULT 0.20,
  final_pct NUMERIC(6,4) DEFAULT 0.25,
  target_margin NUMERIC(6,4) DEFAULT 0.35,
  min_margin NUMERIC(6,4) DEFAULT 0.25,
  round_up BOOLEAN DEFAULT true,
  round_granularity INT DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- LIV POOLS — POOL-SPECIFIC CATALOG HIERARCHY
-- ============================================================

CREATE TABLE IF NOT EXISTS cost_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  code TEXT NOT NULL UNIQUE,
  stage_name TEXT NOT NULL,
  cost_type TEXT NOT NULL,
  stage_num INT DEFAULT 0,
  jt_code INT,
  jt_id TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS formulas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  named_range TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  expression TEXT NOT NULL,
  unit TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  vendor_id UUID REFERENCES vendors(id),
  cost_code_id UUID REFERENCES cost_codes(id),
  uom TEXT NOT NULL,
  unit_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  markup_pct NUMERIC(6,4) NOT NULL DEFAULT 0.60,
  fixed_var TEXT NOT NULL DEFAULT 'FIXED',
  default_qty NUMERIC(10,2) DEFAULT 1,
  formula_ref TEXT REFERENCES formulas(named_range),
  category TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kit_skus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  kit_id UUID REFERENCES kits(id) ON DELETE CASCADE,
  sku_id UUID REFERENCES skus(id) ON DELETE CASCADE,
  quantity NUMERIC(10,2) DEFAULT 1,
  sort_order INT DEFAULT 0,
  UNIQUE(kit_id, sku_id)
);

CREATE TABLE IF NOT EXISTS assemblies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  division TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assembly_kits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  assembly_id UUID REFERENCES assemblies(id) ON DELETE CASCADE,
  kit_id UUID REFERENCES kits(id) ON DELETE CASCADE,
  quantity NUMERIC(10,2) DEFAULT 1,
  sort_order INT DEFAULT 0,
  UNIQUE(assembly_id, kit_id)
);

CREATE TABLE IF NOT EXISTS super_assemblies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS super_assembly_assemblies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  super_assembly_id UUID REFERENCES super_assemblies(id) ON DELETE CASCADE,
  assembly_id UUID REFERENCES assemblies(id) ON DELETE CASCADE,
  quantity NUMERIC(10,2) DEFAULT 1,
  sort_order INT DEFAULT 0,
  UNIQUE(super_assembly_id, assembly_id)
);

-- ============================================================
-- LIV POOLS — PER-ESTIMATE POOL DATA
-- ============================================================

CREATE TABLE IF NOT EXISTS budget_lines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  estimate_id UUID REFERENCES client_estimates(id) ON DELETE CASCADE,
  cost_code_id UUID REFERENCES cost_codes(id),
  budgeted_cost NUMERIC(12,2) DEFAULT 0,
  actual_cost NUMERIC(12,2) DEFAULT 0,
  committed_cost NUMERIC(12,2) DEFAULT 0,
  variance NUMERIC(12,2) GENERATED ALWAYS AS (budgeted_cost - actual_cost) STORED,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES auth.users(id),
  estimate_id UUID REFERENCES client_estimates(id) ON DELETE CASCADE,
  cost_code_id UUID REFERENCES cost_codes(id),
  stage_name TEXT NOT NULL,
  stage_num INT DEFAULT 0,
  status TEXT DEFAULT 'pending',
  scheduled_date DATE,
  completed_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

DO $$ 
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'profiles','organizations','organization_members','user_roles','team_members','custom_workspaces',
    'clients','contacts','opportunity_stages','opportunities',
    'job_statuses','jobs','job_line_items','tasks','task_templates','schedules','schedule_items',
    'daily_logs','daily_log_photos','specifications','time_entries',
    'catalog_items','estimate_templates','estimate_style_settings','client_estimates','proposals',
    'invoices','expenses','purchase_orders','purchase_order_items','change_orders','lien_waivers',
    'contract_templates','contracts','contract_signers',
    'workflows','workflow_runs',
    'notifications','messages','activity_logs',
    'dashboard_tiles','dashboard_layouts','custom_analytics_tiles',
    'community_posts','bug_reports','feature_requests','beta_status',
    'vendors','vendor_catalog_prices',
    'bim_models','rfis','submittals','punch_lists','punch_list_items',
    'app_settings',
    'cost_codes','formulas','skus','kits','kit_skus','assemblies','assembly_kits',
    'super_assemblies','super_assembly_assemblies','budget_lines','job_stages'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
    EXECUTE format('
      DROP POLICY IF EXISTS "Users see own data" ON %I;
      CREATE POLICY "Users see own data" ON %I
        USING (owner_id = auth.uid() OR owner_id IS NULL)
        WITH CHECK (owner_id = auth.uid() OR owner_id IS NULL)
    ', tbl, tbl);
  END LOOP;
END $$;

-- Public read for reference tables (cost_codes, formulas shared across users)
CREATE POLICY "Public read cost_codes" ON cost_codes FOR SELECT USING (true);
CREATE POLICY "Public read formulas" ON formulas FOR SELECT USING (true);
CREATE POLICY "Public read analytics templates" ON analytics_tile_templates FOR SELECT USING (true);

-- Client portal: public read via share_token (no auth needed)
CREATE POLICY "Public portal read estimates" ON client_estimates
  FOR SELECT USING (share_token IS NOT NULL);
CREATE POLICY "Public portal read proposals" ON proposals
  FOR SELECT USING (share_token IS NOT NULL);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_client_estimates_owner ON client_estimates(owner_id);
CREATE INDEX IF NOT EXISTS idx_client_estimates_client ON client_estimates(client_id);
CREATE INDEX IF NOT EXISTS idx_client_estimates_status ON client_estimates(status);
CREATE INDEX IF NOT EXISTS idx_client_estimates_share_token ON client_estimates(share_token);
CREATE INDEX IF NOT EXISTS idx_jobs_owner ON jobs(owner_id);
CREATE INDEX IF NOT EXISTS idx_jobs_client ON jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_owner ON clients(owner_id);
CREATE INDEX IF NOT EXISTS idx_tasks_owner ON tasks(owner_id);
CREATE INDEX IF NOT EXISTS idx_skus_code ON skus(code);
CREATE INDEX IF NOT EXISTS idx_proposals_share_token ON proposals(share_token);
