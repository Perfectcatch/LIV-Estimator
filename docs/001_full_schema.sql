-- ══════════════════════════════════════════════════════════════
-- CRUCIBLE-X COMPLETE SCHEMA — 251 Tables, Auto-Generated
-- Source: Supabase OpenAPI extraction
-- Generated for LIV Pools CRM build
-- ══════════════════════════════════════════════════════════════

-- [1/251] activity_logs (9 columns)
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  entity_name TEXT,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [2/251] ai_agent_messages (11 columns)
CREATE TABLE IF NOT EXISTS ai_agent_messages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  session_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  tokens_used INTEGER,
  model TEXT,
  metadata JSONB,
  tool_calls JSONB,
  tool_results JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [3/251] ai_agent_sessions (10 columns)
CREATE TABLE IF NOT EXISTS ai_agent_sessions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  agent_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  title TEXT,
  status TEXT DEFAULT 'active',
  message_count INTEGER,
  metadata JSONB,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [4/251] ai_agents (16 columns)
CREATE TABLE IF NOT EXISTS ai_agents (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  agent_type TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL,
  organization_id UUID,
  system_prompt TEXT,
  model TEXT,
  temperature REAL,
  max_tokens INTEGER,
  tools JSONB,
  settings JSONB,
  knowledge_base_ids JSONB,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [5/251] ai_knowledge_bases (11 columns)
CREATE TABLE IF NOT EXISTS ai_knowledge_bases (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL,
  organization_id UUID,
  source_type TEXT,
  document_count INTEGER,
  last_synced_at TIMESTAMPTZ,
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [6/251] ai_knowledge_documents (15 columns)
CREATE TABLE IF NOT EXISTS ai_knowledge_documents (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  knowledge_base_id UUID NOT NULL,
  name TEXT NOT NULL,
  content TEXT,
  file_path TEXT,
  file_type TEXT,
  file_size INTEGER,
  chunk_count INTEGER,
  owner_id UUID NOT NULL,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  processed_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [7/251] analytics_tile_templates (9 columns)
CREATE TABLE IF NOT EXISTS analytics_tile_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general' NOT NULL,
  tile_type TEXT DEFAULT 'metric' NOT NULL,
  config JSONB NOT NULL,
  data_sources JSONB NOT NULL,
  is_active BOOLEAN DEFAULT 'True' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [8/251] approval_requests (12 columns)
CREATE TABLE IF NOT EXISTS approval_requests (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  workflow_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  current_step INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  requested_by UUID,
  amount NUMERIC,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [9/251] approval_step_responses (9 columns)
CREATE TABLE IF NOT EXISTS approval_step_responses (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  request_id UUID NOT NULL,
  step_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  approver_id UUID,
  decision TEXT NOT NULL,
  comments TEXT,
  decided_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [10/251] approval_workflow_steps (10 columns)
CREATE TABLE IF NOT EXISTS approval_workflow_steps (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  workflow_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  step_order INTEGER NOT NULL,
  approver_type TEXT NOT NULL,
  approver_id UUID,
  approver_role TEXT,
  auto_approve_threshold NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [11/251] approval_workflows (8 columns)
CREATE TABLE IF NOT EXISTS approval_workflows (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  entity_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [12/251] automation_ab_variants (13 columns)
CREATE TABLE IF NOT EXISTS automation_ab_variants (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  step_id UUID NOT NULL,
  variant_name VARCHAR DEFAULT 'A' NOT NULL,
  subject TEXT,
  content_html TEXT,
  weight INTEGER DEFAULT 50,
  sends INTEGER,
  opens INTEGER,
  clicks INTEGER,
  conversions INTEGER,
  is_winner BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [13/251] automation_conditions (10 columns)
CREATE TABLE IF NOT EXISTS automation_conditions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  step_id UUID NOT NULL,
  condition_type VARCHAR NOT NULL,
  field VARCHAR,
  operator VARCHAR NOT NULL,
  value TEXT,
  next_step_if_true UUID,
  next_step_if_false UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [14/251] automation_enrollments (13 columns)
CREATE TABLE IF NOT EXISTS automation_enrollments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  sequence_id UUID NOT NULL,
  contact_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  status TEXT DEFAULT 'active',
  current_step INTEGER,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  exit_reason TEXT,
  next_step_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [15/251] automation_execution_log (10 columns)
CREATE TABLE IF NOT EXISTS automation_execution_log (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  enrollment_id UUID NOT NULL,
  step_id UUID NOT NULL,
  executed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  status VARCHAR DEFAULT 'pending' NOT NULL,
  result JSONB,
  error_message TEXT,
  variant_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [16/251] automation_goals (11 columns)
CREATE TABLE IF NOT EXISTS automation_goals (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  sequence_id UUID NOT NULL,
  name VARCHAR NOT NULL,
  goal_type VARCHAR DEFAULT 'tag_applied' NOT NULL,
  conditions JSONB,
  target_count INTEGER,
  achieved_count INTEGER,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [17/251] automation_sequence_steps (12 columns)
CREATE TABLE IF NOT EXISTS automation_sequence_steps (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  sequence_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  step_type TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  config JSONB,
  step_name TEXT,
  next_step_id UUID,
  position_x INTEGER,
  position_y INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [18/251] automation_sequences (14 columns)
CREATE TABLE IF NOT EXISTS automation_sequences (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  description TEXT,
  category TEXT DEFAULT 'marketing',
  status TEXT DEFAULT 'draft',
  is_active BOOLEAN,
  trigger_conditions JSONB,
  settings JSONB,
  enrollment_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [19/251] automation_step_metrics (12 columns)
CREATE TABLE IF NOT EXISTS automation_step_metrics (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  step_id UUID NOT NULL,
  sequence_id UUID NOT NULL,
  date DATE DEFAULT 'CURRENT_DATE' NOT NULL,
  executions INTEGER,
  successes INTEGER,
  failures INTEGER,
  opens INTEGER,
  clicks INTEGER,
  unsubscribes INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [20/251] beta_invites (9 columns)
CREATE TABLE IF NOT EXISTS beta_invites (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  email TEXT NOT NULL,
  invited_by UUID NOT NULL,
  invite_code UUID DEFAULT gen_random_uuid(),
  status TEXT DEFAULT 'pending',
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT '(now() + '7 days'::interval)',
  created_at TIMESTAMPTZ DEFAULT now(),
  invite_code_text TEXT,
  PRIMARY KEY (id)
);

-- [21/251] beta_signups (14 columns)
CREATE TABLE IF NOT EXISTS beta_signups (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  plan_type TEXT NOT NULL,
  user_count INTEGER DEFAULT 1,
  monthly_amount NUMERIC,
  transaction_id TEXT,
  card_token TEXT,
  customer_code TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [22/251] beta_status (10 columns)
CREATE TABLE IF NOT EXISTS beta_status (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  approved_bugs_count INTEGER NOT NULL,
  subscription_discount NUMERIC NOT NULL,
  lifetime_discount NUMERIC NOT NULL,
  tier TEXT DEFAULT 'rookie' NOT NULL,
  has_used_feature_request BOOLEAN NOT NULL,
  is_beta_tester BOOLEAN DEFAULT 'True' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [23/251] bid_package_items (8 columns)
CREATE TABLE IF NOT EXISTS bid_package_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  bid_package_id UUID NOT NULL,
  description TEXT NOT NULL,
  quantity NUMERIC,
  unit TEXT,
  specs TEXT,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [24/251] bid_package_vendors (7 columns)
CREATE TABLE IF NOT EXISTS bid_package_vendors (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  bid_package_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  status TEXT DEFAULT 'invited' NOT NULL,
  invited_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  responded_at TIMESTAMPTZ,
  notes TEXT,
  PRIMARY KEY (id)
);

-- [25/251] bid_packages (9 columns)
CREATE TABLE IF NOT EXISTS bid_packages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  job_id UUID,
  due_date DATE,
  status TEXT DEFAULT 'draft' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [26/251] bid_requests (19 columns)
CREATE TABLE IF NOT EXISTS bid_requests (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  project_id UUID,
  client_id UUID,
  line_item_name TEXT NOT NULL,
  line_item_description TEXT,
  quantity NUMERIC,
  unit TEXT,
  requested_price NUMERIC,
  vendor_submitted_price NUMERIC,
  status TEXT DEFAULT 'pending' NOT NULL,
  notes TEXT,
  contractor_notes TEXT,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [27/251] bid_vendor_prices (11 columns)
CREATE TABLE IF NOT EXISTS bid_vendor_prices (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  bid_package_id UUID NOT NULL,
  bid_package_item_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  unit_price NUMERIC,
  total_price NUMERIC,
  notes TEXT,
  lead_time TEXT,
  alternative_description TEXT,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [28/251] bim_clashes (17 columns)
CREATE TABLE IF NOT EXISTS bim_clashes (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  job_id UUID,
  model_id UUID,
  element_a_id UUID,
  element_b_id UUID,
  clash_type TEXT NOT NULL,
  severity TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'new',
  distance NUMERIC,
  location JSONB,
  assigned_to UUID,
  resolved_by UUID,
  resolved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [29/251] bim_elements (11 columns)
CREATE TABLE IF NOT EXISTS bim_elements (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  model_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  element_id TEXT NOT NULL,
  element_type TEXT NOT NULL,
  category TEXT,
  name TEXT,
  properties JSONB,
  geometry_data JSONB,
  quantity_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [30/251] bim_markups (15 columns)
CREATE TABLE IF NOT EXISTS bim_markups (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  model_id UUID NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  markup_type TEXT NOT NULL,
  position JSONB NOT NULL,
  rotation JSONB,
  scale JSONB,
  color TEXT DEFAULT '#FF0000',
  label TEXT,
  description TEXT,
  camera_position JSONB,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [31/251] bim_models (14 columns)
CREATE TABLE IF NOT EXISTS bim_models (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  version INTEGER DEFAULT 1,
  thumbnail_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [32/251] booking_calendars (20 columns)
CREATE TABLE IF NOT EXISTS booking_calendars (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  description TEXT,
  duration_minutes INTEGER DEFAULT 30 NOT NULL,
  buffer_before_minutes INTEGER,
  buffer_after_minutes INTEGER,
  min_notice_hours INTEGER DEFAULT 1,
  max_days_ahead INTEGER DEFAULT 60,
  availability JSONB,
  timezone TEXT DEFAULT 'America/New_York',
  is_active BOOLEAN DEFAULT 'True',
  sync_to_google BOOLEAN,
  sync_to_outlook BOOLEAN,
  confirmation_type TEXT DEFAULT 'automatic',
  confirmation_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [33/251] bug_reports (10 columns)
CREATE TABLE IF NOT EXISTS bug_reports (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  route TEXT NOT NULL,
  screenshot_url TEXT,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  fix_notes TEXT,
  PRIMARY KEY (id)
);

-- [34/251] bugzapper_credits (10 columns)
CREATE TABLE IF NOT EXISTS bugzapper_credits (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  lifetime_purchase_id UUID,
  bugs_at_purchase INTEGER NOT NULL,
  bugs_current INTEGER NOT NULL,
  credit_amount NUMERIC NOT NULL,
  credited_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [35/251] calendar_bookings (19 columns)
CREATE TABLE IF NOT EXISTS calendar_bookings (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  calendar_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  booker_name TEXT NOT NULL,
  booker_email TEXT NOT NULL,
  booker_phone TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  timezone TEXT,
  notes TEXT,
  status TEXT DEFAULT 'confirmed',
  contact_id UUID,
  google_event_id TEXT,
  outlook_event_id TEXT,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  reminder_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [36/251] campaign_reports (7 columns)
CREATE TABLE IF NOT EXISTS campaign_reports (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  campaign_id UUID,
  report_type TEXT DEFAULT 'summary' NOT NULL,
  generated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [37/251] campaign_templates (10 columns)
CREATE TABLE IF NOT EXISTS campaign_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content_html TEXT NOT NULL,
  category TEXT,
  is_default BOOLEAN,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [38/251] campaign_url_clicks (12 columns)
CREATE TABLE IF NOT EXISTS campaign_url_clicks (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  template_id UUID,
  clicked_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [39/251] campaign_url_templates (11 columns)
CREATE TABLE IF NOT EXISTS campaign_url_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  base_url TEXT NOT NULL,
  utm_preset_id UUID,
  custom_params JSONB,
  short_code TEXT,
  click_count INTEGER,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [40/251] catalog_items (23 columns)
CREATE TABLE IF NOT EXISTS catalog_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'material' NOT NULL,
  subcategory TEXT,
  unit TEXT DEFAULT 'ea',
  unit_cost NUMERIC,
  markup_percentage NUMERIC,
  unit_cost_formula TEXT,
  quantity_formula TEXT,
  cost_code TEXT,
  image_url TEXT,
  linked_estimate_template_id UUID,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_allowance BOOLEAN,
  allowance_display_mode TEXT DEFAULT 'price',
  source_url TEXT,
  source_supplier TEXT,
  last_price_sync TIMESTAMPTZ,
  price_sync_enabled BOOLEAN,
  PRIMARY KEY (id)
);

-- [41/251] change_order_items (13 columns)
CREATE TABLE IF NOT EXISTS change_order_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  change_order_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  item_type TEXT DEFAULT 'add' NOT NULL,
  description TEXT NOT NULL,
  quantity NUMERIC DEFAULT 1,
  unit TEXT DEFAULT 'ea',
  unit_cost NUMERIC,
  unit_price NUMERIC,
  total_cost NUMERIC,
  total_price NUMERIC,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [42/251] change_orders (23 columns)
CREATE TABLE IF NOT EXISTS change_orders (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  co_number TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID NOT NULL,
  client_id UUID,
  estimate_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  reason TEXT,
  status TEXT DEFAULT 'draft' NOT NULL,
  cost_impact NUMERIC,
  price_impact NUMERIC,
  schedule_impact_days INTEGER,
  requested_by TEXT,
  requested_at TIMESTAMPTZ DEFAULT now(),
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  client_signature TEXT,
  client_signed_at TIMESTAMPTZ,
  share_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [43/251] channel_connections (12 columns)
CREATE TABLE IF NOT EXISTS channel_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  channel_type TEXT NOT NULL,
  channel_name TEXT,
  owner_id UUID NOT NULL,
  organization_id UUID,
  is_connected BOOLEAN,
  connected_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  credentials JSONB,
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [44/251] chat_widgets (17 columns)
CREATE TABLE IF NOT EXISTS chat_widgets (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  ai_agent_id UUID,
  welcome_message TEXT,
  offline_message TEXT,
  pre_chat_form JSONB,
  styling JSONB,
  business_hours JSONB,
  routing_type TEXT DEFAULT 'direct',
  is_active BOOLEAN DEFAULT 'True',
  embed_code TEXT,
  allowed_domains JSONB,
  ai_enabled BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [45/251] client_estimates (37 columns)
CREATE TABLE IF NOT EXISTS client_estimates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  client_id UUID NOT NULL,
  project_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  line_items JSONB,
  parameters JSONB,
  parameter_groups JSONB,
  subtotal NUMERIC,
  markup_total NUMERIC,
  total NUMERIC,
  client_approved_at TIMESTAMPTZ,
  converted_to_job_at TIMESTAMPTZ,
  job_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  share_token TEXT,
  client_selections JSONB,
  tax_rate NUMERIC,
  tax_amount NUMERIC,
  is_approvable BOOLEAN DEFAULT 'True',
  client_acknowledged_at TIMESTAMPTZ,
  client_signature_data TEXT,
  document_template_id UUID,
  cover_image_url TEXT,
  payment_schedule JSONB,
  tier_type TEXT DEFAULT 'single' NOT NULL,
  tier_estimates JSONB,
  optional_groups JSONB,
  first_viewed_at TIMESTAMPTZ,
  last_viewed_at TIMESTAMPTZ,
  view_count INTEGER NOT NULL,
  custom_styles JSONB,
  page_blocks JSONB,
  work_schedule JSONB,
  PRIMARY KEY (id)
);

-- [46/251] client_files (14 columns)
CREATE TABLE IF NOT EXISTS client_files (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  client_id UUID,
  folder_id UUID,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  is_client_visible BOOLEAN NOT NULL,
  tags JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [47/251] client_folders (11 columns)
CREATE TABLE IF NOT EXISTS client_folders (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  client_id UUID,
  parent_folder_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6366f1',
  is_client_visible BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [48/251] client_intake_submissions (17 columns)
CREATE TABLE IF NOT EXISTS client_intake_submissions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  project_type TEXT,
  project_description TEXT,
  budget_range TEXT,
  timeline TEXT,
  address TEXT,
  how_heard TEXT,
  status TEXT DEFAULT 'new',
  notes TEXT,
  converted_to_client_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [49/251] client_portal_tokens (5 columns)
CREATE TABLE IF NOT EXISTS client_portal_tokens (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  client_id UUID NOT NULL,
  token UUID DEFAULT gen_random_uuid() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at TIMESTAMPTZ,
  PRIMARY KEY (id)
);

-- [50/251] clients (11 columns)
CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT,
  PRIMARY KEY (id)
);

-- [51/251] community_comments (7 columns)
CREATE TABLE IF NOT EXISTS community_comments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  post_id UUID NOT NULL,
  author_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_comment_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [52/251] community_posts (10 columns)
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  author_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'discussion' NOT NULL,
  image_urls JSONB,
  file_urls JSONB,
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [53/251] community_reactions (6 columns)
CREATE TABLE IF NOT EXISTS community_reactions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  post_id UUID,
  comment_id UUID,
  reaction_type TEXT DEFAULT 'like' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [54/251] contact_activities (8 columns)
CREATE TABLE IF NOT EXISTS contact_activities (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  contact_id UUID,
  activity_type TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  score_change INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [55/251] contact_custom_field_definitions (12 columns)
CREATE TABLE IF NOT EXISTS contact_custom_field_definitions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  field_key TEXT NOT NULL,
  field_type TEXT DEFAULT 'text' NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  options JSONB,
  is_required BOOLEAN,
  display_order INTEGER,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [56/251] contact_custom_field_values (8 columns)
CREATE TABLE IF NOT EXISTS contact_custom_field_values (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  contact_id UUID NOT NULL,
  field_definition_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  value TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [57/251] contact_list_members (7 columns)
CREATE TABLE IF NOT EXISTS contact_list_members (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  list_id UUID NOT NULL,
  contact_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  added_at TIMESTAMPTZ DEFAULT now(),
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [58/251] contact_lists (11 columns)
CREATE TABLE IF NOT EXISTS contact_lists (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL,
  organization_id UUID,
  list_type TEXT DEFAULT 'static',
  filter_criteria JSONB,
  member_count INTEGER,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [59/251] contact_scoring_rules (10 columns)
CREATE TABLE IF NOT EXISTS contact_scoring_rules (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL,
  trigger_conditions JSONB,
  score_change INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [60/251] contact_segments (11 columns)
CREATE TABLE IF NOT EXISTS contact_segments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  filter_rules JSONB NOT NULL,
  is_dynamic BOOLEAN DEFAULT 'True',
  contact_count INTEGER,
  last_calculated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [61/251] contact_tag_assignments (6 columns)
CREATE TABLE IF NOT EXISTS contact_tag_assignments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  contact_id UUID NOT NULL,
  tag_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [62/251] contact_tags (9 columns)
CREATE TABLE IF NOT EXISTS contact_tags (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  color TEXT,
  owner_id UUID NOT NULL,
  organization_id UUID,
  description TEXT,
  usage_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [63/251] contacts (41 columns)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  status TEXT DEFAULT 'active',
  lifecycle_stage TEXT DEFAULT 'subscriber',
  lead_score INTEGER,
  source TEXT,
  source_medium TEXT,
  source_campaign TEXT,
  source_content TEXT,
  notes TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  assigned_to UUID,
  organization_id UUID,
  owner_id UUID NOT NULL,
  last_contacted_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  converted_to_client_id UUID,
  email_subscribed BOOLEAN DEFAULT 'True',
  unsubscribed_at TIMESTAMPTZ,
  unsubscribe_token UUID DEFAULT gen_random_uuid(),
  total_emails_sent INTEGER,
  total_emails_opened INTEGER,
  total_sms_sent INTEGER,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [64/251] contract_audit_log (8 columns)
CREATE TABLE IF NOT EXISTS contract_audit_log (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  contract_id UUID NOT NULL,
  signer_id UUID,
  action TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [65/251] contract_fields (19 columns)
CREATE TABLE IF NOT EXISTS contract_fields (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  contract_id UUID,
  template_id UUID,
  field_type TEXT NOT NULL,
  page_number INTEGER DEFAULT 1 NOT NULL,
  x_position NUMERIC NOT NULL,
  y_position NUMERIC NOT NULL,
  width NUMERIC DEFAULT 200 NOT NULL,
  height NUMERIC DEFAULT 50 NOT NULL,
  assigned_signer_index INTEGER,
  label TEXT,
  required BOOLEAN DEFAULT 'True',
  placeholder TEXT,
  value TEXT,
  filled_at TIMESTAMPTZ,
  filled_by UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [66/251] contract_signers (19 columns)
CREATE TABLE IF NOT EXISTS contract_signers (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  contract_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'signer',
  sign_order INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending' NOT NULL,
  signature_data TEXT,
  signature_type TEXT,
  signed_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  email_sent_at TIMESTAMPTZ,
  reminder_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  title TEXT,
  company TEXT,
  PRIMARY KEY (id)
);

-- [67/251] contract_templates (13 columns)
CREATE TABLE IF NOT EXISTS contract_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  placeholders JSONB,
  category TEXT,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  pdf_file_path TEXT,
  pdf_page_count INTEGER,
  document_type TEXT DEFAULT 'template',
  PRIMARY KEY (id)
);

-- [68/251] contractor_profiles (23 columns)
CREATE TABLE IF NOT EXISTS contractor_profiles (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  business_name TEXT NOT NULL,
  owner_id UUID NOT NULL,
  trade TEXT,
  trades JSONB,
  description TEXT,
  city TEXT,
  state_code TEXT,
  zip_code TEXT,
  license_number TEXT,
  certifications JSONB,
  years_in_business INTEGER,
  rating REAL,
  review_count INTEGER,
  portfolio_images JSONB,
  is_visible_in_directory BOOLEAN,
  is_available_today BOOLEAN,
  available_until TIMESTAMPTZ,
  contact_email TEXT,
  contact_phone TEXT,
  contact_on_request BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [69/251] contractor_reviews (10 columns)
CREATE TABLE IF NOT EXISTS contractor_reviews (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  contractor_profile_id UUID NOT NULL,
  reviewer_id UUID NOT NULL,
  rating INTEGER NOT NULL,
  review_text TEXT,
  project_type TEXT,
  is_verified BOOLEAN,
  owner_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [70/251] contractor_service_areas (10 columns)
CREATE TABLE IF NOT EXISTS contractor_service_areas (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  area_type TEXT NOT NULL,
  area_name TEXT,
  center_lat REAL,
  center_lng REAL,
  radius_miles REAL,
  state_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [71/251] contractor_work_requests (14 columns)
CREATE TABLE IF NOT EXISTS contractor_work_requests (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  contractor_profile_id UUID NOT NULL,
  requester_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  project_description TEXT,
  trade_needed TEXT,
  location TEXT,
  preferred_start_date DATE,
  budget_range TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [72/251] contracts (19 columns)
CREATE TABLE IF NOT EXISTS contracts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  template_id UUID,
  client_id UUID,
  job_id UUID,
  proposal_id UUID,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  filled_placeholders JSONB,
  status TEXT DEFAULT 'draft' NOT NULL,
  share_token UUID DEFAULT gen_random_uuid(),
  sent_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  pdf_file_path TEXT,
  pdf_page_count INTEGER,
  document_type TEXT DEFAULT 'template',
  PRIMARY KEY (id)
);

-- [73/251] conversation_messages (21 columns)
CREATE TABLE IF NOT EXISTS conversation_messages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  conversation_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  direction TEXT NOT NULL,
  sender_type TEXT NOT NULL,
  content TEXT,
  content_type TEXT DEFAULT 'text',
  sender_id UUID,
  sender_name TEXT,
  external_message_id TEXT,
  status TEXT DEFAULT 'sent',
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  media_urls JSONB,
  metadata JSONB,
  error_message TEXT,
  call_duration_seconds INTEGER,
  call_recording_url TEXT,
  call_transcription TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [74/251] conversations (20 columns)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  channel_type TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  channel_connection_id UUID,
  client_id UUID,
  contact_id UUID,
  external_thread_id TEXT,
  external_contact_id TEXT,
  status TEXT DEFAULT 'open',
  is_starred BOOLEAN,
  is_archived BOOLEAN,
  is_inbound BOOLEAN,
  unread_count INTEGER,
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  assigned_to UUID,
  snoozed_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [75/251] cost_codes (8 columns)
CREATE TABLE IF NOT EXISTS cost_codes (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [76/251] course_enrollments (14 columns)
CREATE TABLE IF NOT EXISTS course_enrollments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  course_id UUID NOT NULL,
  student_email TEXT NOT NULL,
  student_name TEXT,
  contact_id UUID,
  enrolled_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed_at TIMESTAMPTZ,
  progress_percentage INTEGER,
  certificate_issued_at TIMESTAMPTZ,
  certificate_url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [77/251] course_lessons (12 columns)
CREATE TABLE IF NOT EXISTS course_lessons (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  module_id UUID NOT NULL,
  course_id UUID NOT NULL,
  name TEXT NOT NULL,
  lesson_type TEXT DEFAULT 'text' NOT NULL,
  content JSONB,
  duration_minutes INTEGER,
  sort_order INTEGER,
  is_preview BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [78/251] course_modules (9 columns)
CREATE TABLE IF NOT EXISTS course_modules (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  course_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER,
  is_locked BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [79/251] courses (17 columns)
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  is_published BOOLEAN,
  is_free BOOLEAN DEFAULT 'True',
  price NUMERIC,
  estimated_duration_minutes INTEGER,
  difficulty_level TEXT DEFAULT 'beginner',
  tags JSONB,
  certificate_enabled BOOLEAN DEFAULT 'True',
  certificate_template JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [80/251] crm_deal_activities (9 columns)
CREATE TABLE IF NOT EXISTS crm_deal_activities (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  deal_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  title TEXT,
  description TEXT,
  created_by UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [81/251] crm_deals (23 columns)
CREATE TABLE IF NOT EXISTS crm_deals (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  title TEXT NOT NULL,
  pipeline_id UUID NOT NULL,
  stage_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  contact_id UUID,
  client_id UUID,
  value NUMERIC,
  currency TEXT DEFAULT 'USD',
  probability REAL,
  status TEXT DEFAULT 'open',
  source TEXT,
  expected_close_date TIMESTAMPTZ,
  actual_close_date TIMESTAMPTZ,
  loss_reason TEXT,
  notes TEXT,
  assigned_to UUID,
  last_activity_at TIMESTAMPTZ,
  tags JSONB,
  custom_fields JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [82/251] crm_pipeline_stages (12 columns)
CREATE TABLE IF NOT EXISTS crm_pipeline_stages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  pipeline_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  position INTEGER,
  color TEXT,
  probability REAL,
  is_won_stage BOOLEAN,
  is_lost_stage BOOLEAN,
  auto_actions JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [83/251] crm_pipelines (10 columns)
CREATE TABLE IF NOT EXISTS crm_pipelines (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL,
  organization_id UUID,
  pipeline_type TEXT DEFAULT 'sales',
  is_default BOOLEAN,
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [84/251] custom_analytics_tiles (17 columns)
CREATE TABLE IF NOT EXISTS custom_analytics_tiles (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  dashboard_type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  tile_type TEXT DEFAULT 'metric' NOT NULL,
  config JSONB NOT NULL,
  data_sources JSONB NOT NULL,
  refresh_mode TEXT DEFAULT 'manual' NOT NULL,
  refresh_interval_seconds INTEGER DEFAULT 300,
  sort_order INTEGER,
  is_visible BOOLEAN DEFAULT 'True' NOT NULL,
  size TEXT DEFAULT 'medium' NOT NULL,
  ai_prompt TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [85/251] custom_workspaces (9 columns)
CREATE TABLE IF NOT EXISTS custom_workspaces (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  nav_items JSONB NOT NULL,
  is_shared BOOLEAN NOT NULL,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [86/251] daemon_actions_log (9 columns)
CREATE TABLE IF NOT EXISTS daemon_actions_log (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  conversation_id UUID,
  user_id UUID NOT NULL,
  tool_name TEXT NOT NULL,
  tool_input JSONB,
  tool_output JSONB,
  status TEXT DEFAULT 'success' NOT NULL,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [87/251] daemon_conversations (6 columns)
CREATE TABLE IF NOT EXISTS daemon_conversations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  messages JSONB NOT NULL,
  status TEXT DEFAULT 'active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [88/251] daily_log_photos (7 columns)
CREATE TABLE IF NOT EXISTS daily_log_photos (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  daily_log_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [89/251] daily_logs (17 columns)
CREATE TABLE IF NOT EXISTS daily_logs (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  job_id UUID,
  client_id UUID,
  log_date DATE DEFAULT 'CURRENT_DATE' NOT NULL,
  weather TEXT,
  temperature TEXT,
  work_completed TEXT,
  materials_used TEXT,
  notes TEXT,
  hours_worked NUMERIC,
  workers_on_site INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  status TEXT DEFAULT 'draft' NOT NULL,
  client_visible BOOLEAN NOT NULL,
  submitted_at TIMESTAMPTZ,
  PRIMARY KEY (id)
);

-- [90/251] dashboard_layouts (5 columns)
CREATE TABLE IF NOT EXISTS dashboard_layouts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  layout JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [91/251] dashboard_tiles (10 columns)
CREATE TABLE IF NOT EXISTS dashboard_tiles (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  tile_key TEXT NOT NULL,
  title TEXT NOT NULL,
  icon TEXT DEFAULT 'FileText' NOT NULL,
  is_visible BOOLEAN DEFAULT 'True' NOT NULL,
  position INTEGER NOT NULL,
  target_view TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [92/251] demo_codes (9 columns)
CREATE TABLE IF NOT EXISTS demo_codes (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  code VARCHAR NOT NULL,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  max_uses INTEGER DEFAULT 1,
  uses_remaining INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT 'True',
  description TEXT,
  PRIMARY KEY (id)
);

-- [93/251] demo_sessions (7 columns)
CREATE TABLE IF NOT EXISTS demo_sessions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  demo_code_id UUID NOT NULL,
  session_token UUID DEFAULT gen_random_uuid() NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  ip_address TEXT,
  PRIMARY KEY (id)
);

-- [94/251] document_templates (17 columns)
CREATE TABLE IF NOT EXISTS document_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  document_type TEXT DEFAULT 'standard' NOT NULL,
  description TEXT,
  header_content JSONB,
  footer_content JSONB,
  terms_content JSONB,
  requires_signature BOOLEAN DEFAULT 'True',
  requires_initials BOOLEAN,
  signature_positions JSONB,
  logo_position TEXT DEFAULT 'top-left',
  auto_status_id UUID,
  is_default BOOLEAN,
  is_system BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [95/251] documents (11 columns)
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  client_id UUID,
  project_id UUID,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [96/251] email_bounces (9 columns)
CREATE TABLE IF NOT EXISTS email_bounces (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  campaign_id UUID,
  recipient_email TEXT NOT NULL,
  bounce_type TEXT NOT NULL,
  bounce_reason TEXT,
  bounce_code TEXT,
  bounced_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [97/251] email_campaign_recipients (12 columns)
CREATE TABLE IF NOT EXISTS email_campaign_recipients (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  campaign_id UUID NOT NULL,
  contact_id UUID,
  email TEXT NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  resend_message_id TEXT,
  owner_id UUID NOT NULL,
  ab_variant TEXT,
  PRIMARY KEY (id)
);

-- [98/251] email_campaigns (34 columns)
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  from_name TEXT NOT NULL,
  from_email TEXT NOT NULL,
  content_html TEXT NOT NULL,
  content_text TEXT,
  status TEXT DEFAULT 'draft' NOT NULL,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  total_recipients INTEGER,
  sent_count INTEGER,
  opened_count INTEGER,
  clicked_count INTEGER,
  bounced_count INTEGER,
  unsubscribed_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  segment_id UUID,
  template_id UUID,
  ab_test_enabled BOOLEAN,
  ab_variant_b_subject TEXT,
  ab_variant_b_content TEXT,
  ab_test_size_percent INTEGER DEFAULT 20,
  ab_winner_criteria TEXT DEFAULT 'open_rate',
  ab_winner_wait_hours INTEGER DEFAULT 4,
  ab_variant_a_opens INTEGER,
  ab_variant_b_opens INTEGER,
  ab_variant_a_clicks INTEGER,
  ab_variant_b_clicks INTEGER,
  ab_winning_variant TEXT,
  timezone TEXT DEFAULT 'UTC',
  PRIMARY KEY (id)
);

-- [99/251] email_domains (12 columns)
CREATE TABLE IF NOT EXISTS email_domains (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  domain TEXT NOT NULL,
  verification_status TEXT DEFAULT 'pending',
  dkim_verified BOOLEAN,
  spf_verified BOOLEAN,
  dmarc_verified BOOLEAN,
  verification_token TEXT,
  verified_at TIMESTAMPTZ,
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [100/251] email_health_metrics (14 columns)
CREATE TABLE IF NOT EXISTS email_health_metrics (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  date DATE NOT NULL,
  emails_sent INTEGER,
  emails_delivered INTEGER,
  emails_bounced INTEGER,
  hard_bounces INTEGER,
  soft_bounces INTEGER,
  spam_complaints INTEGER,
  unsubscribes INTEGER,
  delivery_rate NUMERIC,
  bounce_rate NUMERIC,
  complaint_rate NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [101/251] email_preferences (7 columns)
CREATE TABLE IF NOT EXISTS email_preferences (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  contact_id UUID,
  owner_id UUID NOT NULL,
  preference_type TEXT NOT NULL,
  is_subscribed BOOLEAN DEFAULT 'True',
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [102/251] email_templates (15 columns)
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  template_type TEXT NOT NULL,
  name TEXT NOT NULL,
  subject_template TEXT,
  header_text TEXT,
  body_template TEXT,
  footer_text TEXT,
  primary_color TEXT DEFAULT '#10b981',
  secondary_color TEXT DEFAULT '#d97706',
  show_logo BOOLEAN DEFAULT 'True',
  show_social_links BOOLEAN,
  is_default BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [103/251] email_tracking_events (9 columns)
CREATE TABLE IF NOT EXISTS email_tracking_events (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  campaign_id UUID,
  recipient_id UUID,
  event_type TEXT NOT NULL,
  link_url TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  owner_id UUID NOT NULL,
  PRIMARY KEY (id)
);

-- [104/251] estimate_style_settings (36 columns)
CREATE TABLE IF NOT EXISTS estimate_style_settings (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  cover_page_enabled BOOLEAN NOT NULL,
  cover_page_template TEXT DEFAULT 'modern' NOT NULL,
  primary_color TEXT DEFAULT '#0f766e' NOT NULL,
  accent_color TEXT DEFAULT '#ea580c' NOT NULL,
  font_family TEXT DEFAULT 'Inter' NOT NULL,
  show_quantity BOOLEAN DEFAULT 'True' NOT NULL,
  show_unit_price BOOLEAN NOT NULL,
  show_description BOOLEAN DEFAULT 'True' NOT NULL,
  show_category BOOLEAN NOT NULL,
  show_line_item_photos BOOLEAN DEFAULT 'True' NOT NULL,
  payment_schedule_template JSONB,
  default_terms_template_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  background_color TEXT DEFAULT '#f9fafb' NOT NULL,
  text_color TEXT DEFAULT '#111827' NOT NULL,
  header_bg_color TEXT DEFAULT '#ffffff' NOT NULL,
  section_header_color TEXT NOT NULL,
  border_color TEXT DEFAULT '#e5e7eb' NOT NULL,
  line_item_layout TEXT DEFAULT 'cards' NOT NULL,
  show_line_numbers BOOLEAN NOT NULL,
  show_group_subtotals BOOLEAN NOT NULL,
  intro_title TEXT NOT NULL,
  intro_content TEXT NOT NULL,
  footer_content TEXT NOT NULL,
  custom_total_label TEXT NOT NULL,
  show_company_contact BOOLEAN DEFAULT 'True' NOT NULL,
  item_photo_size TEXT DEFAULT 'md' NOT NULL,
  item_photo_shape TEXT DEFAULT 'rounded' NOT NULL,
  cover_config JSONB NOT NULL,
  custom_templates JSONB,
  default_template_id TEXT,
  heading_color TEXT,
  page_number_color TEXT,
  PRIMARY KEY (id)
);

-- [105/251] estimate_templates (11 columns)
CREATE TABLE IF NOT EXISTS estimate_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  parameter_groups JSONB NOT NULL,
  parameters JSONB NOT NULL,
  line_item_templates JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_community BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

-- [106/251] estimate_views (9 columns)
CREATE TABLE IF NOT EXISTS estimate_views (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  estimate_id UUID NOT NULL,
  viewer_email TEXT,
  viewer_ip TEXT,
  viewed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  time_spent_seconds INTEGER,
  device_type TEXT DEFAULT 'desktop',
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [107/251] expenses (15 columns)
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  project_id UUID,
  vendor_id UUID,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  category TEXT,
  expense_date DATE DEFAULT 'CURRENT_DATE' NOT NULL,
  receipt_url TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  cost_code TEXT,
  job_id UUID,
  PRIMARY KEY (id)
);

-- [108/251] exterior_scans (25 columns)
CREATE TABLE IF NOT EXISTS exterior_scans (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  org_id UUID NOT NULL,
  job_id UUID,
  client_id UUID,
  created_by UUID NOT NULL,
  building_type TEXT DEFAULT 'residential' NOT NULL,
  stories SMALLINT DEFAULT 1 NOT NULL,
  address TEXT,
  status TEXT DEFAULT 'setup' NOT NULL,
  photo_count INTEGER NOT NULL,
  coverage_percent SMALLINT NOT NULL,
  processing_job_id TEXT,
  callback_token TEXT,
  model_url TEXT,
  thumbnail_url TEXT,
  measurements JSONB,
  scale_method TEXT,
  scale_accuracy_cm NUMERIC,
  processing_time_ms INTEGER,
  processing_cost_usd NUMERIC,
  error_message TEXT,
  error_stage TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  elevation_images JSONB,
  PRIMARY KEY (id)
);

-- [109/251] feature_requests (9 columns)
CREATE TABLE IF NOT EXISTS feature_requests (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  admin_response TEXT,
  is_high_priority BOOLEAN DEFAULT 'True' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [110/251] financial_ai_suggestions (12 columns)
CREATE TABLE IF NOT EXISTS financial_ai_suggestions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  suggestion_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  suggested_allocations JSONB,
  income_amount NUMERIC,
  invoice_id UUID,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  resolved_at TIMESTAMPTZ,
  PRIMARY KEY (id)
);

-- [111/251] financial_allocations (10 columns)
CREATE TABLE IF NOT EXISTS financial_allocations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  bucket_id UUID NOT NULL,
  amount NUMERIC NOT NULL,
  source_type TEXT,
  source_id UUID,
  description TEXT,
  allocated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [112/251] financial_bills (14 columns)
CREATE TABLE IF NOT EXISTS financial_bills (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  bucket_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  amount NUMERIC NOT NULL,
  frequency TEXT DEFAULT 'monthly',
  due_day INTEGER,
  next_due_date DATE,
  auto_pay BOOLEAN,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [113/251] financial_buckets (14 columns)
CREATE TABLE IF NOT EXISTS financial_buckets (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  target_percentage NUMERIC,
  target_amount NUMERIC,
  current_balance NUMERIC,
  priority INTEGER,
  color TEXT DEFAULT '#6366f1',
  icon TEXT DEFAULT 'wallet',
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [114/251] floor_plan_comments (11 columns)
CREATE TABLE IF NOT EXISTS floor_plan_comments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  floor_plan_id UUID NOT NULL,
  parent_id UUID,
  block_id TEXT,
  position_x DOUBLE PRECISION,
  position_y DOUBLE PRECISION,
  text TEXT NOT NULL,
  resolved BOOLEAN,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [115/251] floor_plan_scans (16 columns)
CREATE TABLE IF NOT EXISTS floor_plan_scans (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  floor_plan_id UUID,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  scan_result JSONB NOT NULL,
  groups JSONB NOT NULL,
  linked_templates JSONB NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  generated_scene_data JSONB,
  image_urls JSONB,
  client_id UUID,
  pdf_url TEXT,
  PRIMARY KEY (id)
);

-- [116/251] floor_plan_versions (7 columns)
CREATE TABLE IF NOT EXISTS floor_plan_versions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  floor_plan_id UUID NOT NULL,
  version_number INTEGER NOT NULL,
  description TEXT,
  blocks_snapshot JSONB NOT NULL,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [117/251] floor_plan_xrefs (10 columns)
CREATE TABLE IF NOT EXISTS floor_plan_xrefs (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  source_floor_plan_id UUID NOT NULL,
  target_floor_plan_id UUID NOT NULL,
  insertion_x DOUBLE PRECISION,
  insertion_y DOUBLE PRECISION,
  scale_factor DOUBLE PRECISION DEFAULT 1,
  rotation DOUBLE PRECISION,
  visible BOOLEAN DEFAULT 'True',
  locked BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [118/251] floor_plans (11 columns)
CREATE TABLE IF NOT EXISTS floor_plans (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  project_id UUID,
  job_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  scene_data JSONB,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  client_id UUID,
  PRIMARY KEY (id)
);

-- [119/251] funnel_pages (17 columns)
CREATE TABLE IF NOT EXISTS funnel_pages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  funnel_id UUID,
  owner_id UUID NOT NULL,
  organization_id UUID,
  page_type TEXT DEFAULT 'landing',
  content JSONB,
  custom_css TEXT,
  custom_js TEXT,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  is_published BOOLEAN,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [120/251] funnel_stage_entries (10 columns)
CREATE TABLE IF NOT EXISTS funnel_stage_entries (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  funnel_id UUID,
  contact_id UUID,
  stage_key TEXT NOT NULL,
  entered_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  exited_at TIMESTAMPTZ,
  converted BOOLEAN,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [121/251] funnels (12 columns)
CREATE TABLE IF NOT EXISTS funnels (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL,
  organization_id UUID,
  domain TEXT,
  favicon_url TEXT,
  global_styles JSONB,
  conversion_goal TEXT,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [122/251] google_calendar_settings (9 columns)
CREATE TABLE IF NOT EXISTS google_calendar_settings (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  sync_enabled BOOLEAN DEFAULT 'True' NOT NULL,
  sync_tasks BOOLEAN DEFAULT 'True' NOT NULL,
  sync_milestones BOOLEAN DEFAULT 'True' NOT NULL,
  sync_appointments BOOLEAN DEFAULT 'True' NOT NULL,
  default_calendar_id TEXT DEFAULT 'primary',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [123/251] google_calendar_sync (8 columns)
CREATE TABLE IF NOT EXISTS google_calendar_sync (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  schedule_item_id UUID NOT NULL,
  google_event_id TEXT NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  sync_direction TEXT DEFAULT 'both' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [124/251] google_calendar_tokens (8 columns)
CREATE TABLE IF NOT EXISTS google_calendar_tokens (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  calendar_id TEXT DEFAULT 'primary',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [125/251] inbox_conversations (20 columns)
CREATE TABLE IF NOT EXISTS inbox_conversations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  channel_type TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  channel_connection_id UUID,
  client_id UUID,
  contact_id UUID,
  subject TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT,
  is_starred BOOLEAN,
  labels JSONB,
  unread_count INTEGER,
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,
  external_thread_id TEXT,
  assigned_to UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [126/251] inbox_messages (20 columns)
CREATE TABLE IF NOT EXISTS inbox_messages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  conversation_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  content TEXT NOT NULL,
  direction TEXT NOT NULL,
  sender_type TEXT NOT NULL,
  sender_id UUID,
  sender_name TEXT,
  sender_email TEXT,
  sender_phone TEXT,
  content_type TEXT DEFAULT 'text',
  status TEXT DEFAULT 'sent',
  external_id TEXT,
  attachments JSONB,
  metadata JSONB,
  ai_summary TEXT,
  ai_sentiment TEXT,
  ai_intent TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [127/251] inbox_templates (13 columns)
CREATE TABLE IF NOT EXISTS inbox_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  subject TEXT,
  category TEXT,
  channel_types JSONB,
  is_shared BOOLEAN,
  variables JSONB,
  usage_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [128/251] intake_form_settings (19 columns)
CREATE TABLE IF NOT EXISTS intake_form_settings (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  form_title TEXT DEFAULT 'Get a Free Quote',
  form_subtitle TEXT DEFAULT 'Fill out the form below and we''ll get back to you within 24 hours.',
  success_message TEXT DEFAULT 'Thank you! We''ll be in touch soon.',
  primary_color TEXT DEFAULT '#10b981',
  show_phone BOOLEAN DEFAULT 'True',
  show_company BOOLEAN,
  show_project_type BOOLEAN DEFAULT 'True',
  show_budget BOOLEAN DEFAULT 'True',
  show_timeline BOOLEAN DEFAULT 'True',
  show_address BOOLEAN,
  show_how_heard BOOLEAN,
  project_types JSONB,
  budget_ranges JSONB,
  timeline_options JSONB,
  notify_email BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [129/251] invite_codes (8 columns)
CREATE TABLE IF NOT EXISTS invite_codes (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  code VARCHAR NOT NULL,
  created_by UUID,
  used_by UUID,
  used_at TIMESTAMPTZ,
  is_admin_generated BOOLEAN,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [130/251] invoices (21 columns)
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  client_id UUID,
  proposal_id UUID,
  job_id UUID,
  invoice_number TEXT NOT NULL,
  status TEXT DEFAULT 'draft' NOT NULL,
  issue_date DATE DEFAULT 'CURRENT_DATE' NOT NULL,
  due_date DATE,
  subtotal NUMERIC,
  tax_rate NUMERIC,
  tax_amount NUMERIC,
  total NUMERIC,
  amount_paid NUMERIC,
  notes TEXT,
  terms TEXT,
  line_items JSONB,
  paid_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [131/251] job_line_items (17 columns)
CREATE TABLE IF NOT EXISTS job_line_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  job_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  quantity NUMERIC DEFAULT 1,
  unit TEXT DEFAULT 'ea',
  estimated_unit_cost NUMERIC,
  approved_unit_cost NUMERIC,
  actual_unit_cost NUMERIC,
  markup_percentage NUMERIC,
  bid_request_id UUID,
  vendor_id UUID,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [132/251] job_statuses (9 columns)
CREATE TABLE IF NOT EXISTS job_statuses (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6b7280' NOT NULL,
  display_order INTEGER NOT NULL,
  is_default BOOLEAN,
  is_system BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [133/251] jobs (16 columns)
CREATE TABLE IF NOT EXISTS jobs (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  project_id UUID,
  client_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active' NOT NULL,
  start_date DATE,
  target_end_date DATE,
  actual_end_date DATE,
  estimated_revenue NUMERIC,
  actual_revenue NUMERIC,
  estimated_cost NUMERIC,
  actual_cost NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [134/251] jobtread_connections (13 columns)
CREATE TABLE IF NOT EXISTS jobtread_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID,
  owner_id UUID NOT NULL,
  grant_key TEXT NOT NULL,
  jobtread_organization_id TEXT,
  jobtread_organization_name TEXT,
  is_active BOOLEAN DEFAULT 'True',
  last_sync_at TIMESTAMPTZ,
  sync_status TEXT DEFAULT 'pending',
  sync_error TEXT,
  auto_sync_enabled BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [135/251] jobtread_sync_logs (10 columns)
CREATE TABLE IF NOT EXISTS jobtread_sync_logs (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  connection_id UUID,
  owner_id UUID NOT NULL,
  sync_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  items_synced INTEGER,
  items_failed INTEGER,
  error_details JSONB,
  started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (id)
);

-- [136/251] lead_attribution (22 columns)
CREATE TABLE IF NOT EXISTS lead_attribution (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  contact_id UUID,
  opportunity_id UUID,
  first_touch_source TEXT,
  first_touch_medium TEXT,
  first_touch_campaign TEXT,
  first_touch_content TEXT,
  first_touch_term TEXT,
  first_touch_at TIMESTAMPTZ,
  last_touch_source TEXT,
  last_touch_medium TEXT,
  last_touch_campaign TEXT,
  last_touch_content TEXT,
  last_touch_term TEXT,
  last_touch_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  conversion_value NUMERIC,
  conversion_type TEXT,
  touchpoints JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [137/251] lead_form_submissions (14 columns)
CREATE TABLE IF NOT EXISTS lead_form_submissions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  form_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  contact_id UUID,
  data JSONB NOT NULL,
  source_url TEXT,
  ip_address TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [138/251] lead_forms (15 columns)
CREATE TABLE IF NOT EXISTS lead_forms (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL,
  fields JSONB NOT NULL,
  settings JSONB,
  styling JSONB,
  success_message TEXT DEFAULT 'Thank you for your submission!',
  redirect_url TEXT,
  is_active BOOLEAN DEFAULT 'True',
  submission_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [139/251] lesson_progress (11 columns)
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  enrollment_id UUID NOT NULL,
  lesson_id UUID NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  quiz_score NUMERIC,
  quiz_attempts INTEGER,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [140/251] lidar_room_scans (22 columns)
CREATE TABLE IF NOT EXISTS lidar_room_scans (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  floor_plan_id UUID,
  name TEXT NOT NULL,
  device_id TEXT,
  scanned_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  room_dimensions JSONB,
  walls JSONB,
  doors JSONB,
  windows JSONB,
  openings JSONB,
  fixtures JSONB,
  surfaces JSONB,
  usdz_file_path TEXT,
  thumbnail_url TEXT,
  preview_images JSONB,
  status TEXT DEFAULT 'syncing' NOT NULL,
  error_message TEXT,
  converted_to_floor_plan_at TIMESTAMPTZ,
  scan_result JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [141/251] lien_waivers (20 columns)
CREATE TABLE IF NOT EXISTS lien_waivers (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  invoice_id UUID,
  waiver_type TEXT NOT NULL,
  status TEXT DEFAULT 'draft' NOT NULL,
  amount NUMERIC NOT NULL,
  through_date DATE DEFAULT 'CURRENT_DATE' NOT NULL,
  claimant_name TEXT NOT NULL,
  claimant_title TEXT,
  share_token UUID DEFAULT gen_random_uuid(),
  signature_data JSONB,
  signed_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  exceptions TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [142/251] lifetime_membership_slots (5 columns)
CREATE TABLE IF NOT EXISTS lifetime_membership_slots (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  total_slots INTEGER DEFAULT 20 NOT NULL,
  claimed_slots INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [143/251] lifetime_purchases (13 columns)
CREATE TABLE IF NOT EXISTS lifetime_purchases (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  amount_paid NUMERIC NOT NULL,
  discount_applied NUMERIC NOT NULL,
  discount_at_purchase NUMERIC NOT NULL,
  bugs_at_purchase INTEGER NOT NULL,
  transaction_id TEXT,
  status TEXT DEFAULT 'active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [144/251] line_item_templates (14 columns)
CREATE TABLE IF NOT EXISTS line_item_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  cost_code TEXT,
  category TEXT,
  unit TEXT DEFAULT 'ea',
  unit_cost NUMERIC,
  markup_percentage NUMERIC,
  formula TEXT,
  is_description_only BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_community BOOLEAN NOT NULL,
  PRIMARY KEY (id)
);

-- [145/251] marketing_calendar_events (15 columns)
CREATE TABLE IF NOT EXISTS marketing_calendar_events (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  all_day BOOLEAN,
  color TEXT,
  entity_type TEXT,
  entity_id UUID,
  status TEXT DEFAULT 'scheduled',
  recurrence_rule TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [146/251] marketing_campaign_recipients (13 columns)
CREATE TABLE IF NOT EXISTS marketing_campaign_recipients (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  campaign_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  contact_id UUID,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [147/251] marketing_campaigns (20 columns)
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  campaign_type TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  subject TEXT,
  content TEXT,
  html_content TEXT,
  from_name TEXT,
  from_email TEXT,
  reply_to TEXT,
  template_id UUID,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  segment_filters JSONB,
  settings JSONB,
  stats JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [148/251] marketing_funnels (10 columns)
CREATE TABLE IF NOT EXISTS marketing_funnels (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  stages JSONB NOT NULL,
  goal_type TEXT DEFAULT 'conversion',
  goal_value NUMERIC,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [149/251] marketing_page_views (14 columns)
CREATE TABLE IF NOT EXISTS marketing_page_views (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  page_id UUID NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT now(),
  visitor_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer_url TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [150/251] marketing_pages (23 columns)
CREATE TABLE IF NOT EXISTS marketing_pages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  page_type TEXT DEFAULT 'landing',
  description TEXT,
  content JSONB,
  styling JSONB,
  custom_css TEXT,
  custom_js TEXT,
  custom_domain TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  favicon_url TEXT,
  form_id UUID,
  is_published BOOLEAN,
  published_at TIMESTAMPTZ,
  view_count INTEGER,
  conversion_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [151/251] messages (8 columns)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  client_id UUID NOT NULL,
  sender_id UUID,
  sender_type TEXT NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  email_sent BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [152/251] notifications (9 columns)
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  entity_type TEXT,
  entity_id UUID,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [153/251] opportunities (20 columns)
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  contact_id UUID,
  converted_to_client_id UUID,
  converted_to_job_id UUID,
  stage_id UUID,
  value NUMERIC,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'open',
  source TEXT,
  source_campaign TEXT,
  description TEXT,
  expected_close_date TIMESTAMPTZ,
  actual_close_date TIMESTAMPTZ,
  lost_reason TEXT,
  assigned_to UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [154/251] opportunity_stages (12 columns)
CREATE TABLE IF NOT EXISTS opportunity_stages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  pipeline_name TEXT DEFAULT 'default',
  owner_id UUID NOT NULL,
  organization_id UUID,
  display_order INTEGER,
  color TEXT,
  win_probability REAL,
  is_won_stage BOOLEAN,
  is_lost_stage BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [155/251] organization_files (12 columns)
CREATE TABLE IF NOT EXISTS organization_files (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  folder_id UUID,
  name TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  tags JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [156/251] organization_folders (9 columns)
CREATE TABLE IF NOT EXISTS organization_folders (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  parent_folder_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [157/251] organization_integrations (12 columns)
CREATE TABLE IF NOT EXISTS organization_integrations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  integration_type TEXT NOT NULL,
  is_connected BOOLEAN NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  settings JSONB,
  connected_at TIMESTAMPTZ,
  connected_by UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [158/251] organization_members (9 columns)
CREATE TABLE IF NOT EXISTS organization_members (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member',
  is_billable BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  custom_role_id UUID,
  hourly_rate NUMERIC,
  PRIMARY KEY (id)
);

-- [159/251] organization_payment_connections (10 columns)
CREATE TABLE IF NOT EXISTS organization_payment_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  processor_type TEXT NOT NULL,
  api_key_encrypted TEXT NOT NULL,
  account_id TEXT,
  is_active BOOLEAN DEFAULT 'True',
  is_test_mode BOOLEAN,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [160/251] organization_roles (7 columns)
CREATE TABLE IF NOT EXISTS organization_roles (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_system_role BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [161/251] organizations (38 columns)
CREATE TABLE IF NOT EXISTS organizations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  owner_id UUID NOT NULL,
  helcim_customer_code TEXT,
  helcim_subscription_id TEXT,
  subscription_status TEXT DEFAULT 'trial',
  trial_ends_at TIMESTAMPTZ DEFAULT '(now() + '14 days'::interval)',
  subscription_started_at TIMESTAMPTZ,
  base_price NUMERIC DEFAULT 200,
  per_user_price NUMERIC DEFAULT 25,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  logo_url TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  website TEXT,
  custom_email_domain TEXT,
  custom_email_from_name TEXT,
  email_provider TEXT DEFAULT 'default',
  resend_api_key_configured BOOLEAN,
  brand_color TEXT,
  daily_log_photos_required BOOLEAN DEFAULT 'True' NOT NULL,
  default_markups JSONB,
  roof_measurement_provider TEXT,
  roof_measurement_api_key TEXT,
  twilio_account_sid TEXT,
  twilio_auth_token_encrypted TEXT,
  twilio_phone_number TEXT,
  twilio_enabled BOOLEAN,
  meta_page_id TEXT,
  meta_page_access_token_encrypted TEXT,
  meta_instagram_account_id TEXT,
  meta_enabled BOOLEAN,
  meta_webhook_verify_token TEXT,
  meta_page_name TEXT,
  meta_connected_at TIMESTAMPTZ,
  business_days_config JSONB,
  PRIMARY KEY (id)
);

-- [162/251] outlook_connections (14 columns)
CREATE TABLE IF NOT EXISTS outlook_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  user_email TEXT,
  user_name TEXT,
  calendar_id TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT 'True',
  sync_settings JSONB,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [163/251] outlook_sync_log (10 columns)
CREATE TABLE IF NOT EXISTS outlook_sync_log (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  connection_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  local_id UUID NOT NULL,
  outlook_id TEXT,
  sync_direction TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  error_message TEXT,
  synced_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [164/251] payment_processor_connections (6 columns)
CREATE TABLE IF NOT EXISTS payment_processor_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  processor_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [165/251] pricing_data_points (21 columns)
CREATE TABLE IF NOT EXISTS pricing_data_points (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  item_name TEXT NOT NULL,
  item_name_normalized TEXT NOT NULL,
  category TEXT NOT NULL,
  trade TEXT,
  cost_code TEXT,
  unit TEXT NOT NULL,
  unit_price NUMERIC NOT NULL,
  quantity NUMERIC NOT NULL,
  markup_percentage NUMERIC,
  state TEXT NOT NULL,
  zip_code TEXT,
  project_type TEXT,
  organization_id UUID NOT NULL,
  estimate_id UUID,
  estimate_status TEXT,
  was_accepted BOOLEAN,
  was_converted BOOLEAN,
  actual_hours NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [166/251] procore_connections (13 columns)
CREATE TABLE IF NOT EXISTS procore_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  company_id TEXT NOT NULL,
  company_name TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT 'True',
  sync_settings JSONB,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [167/251] procore_sync_log (10 columns)
CREATE TABLE IF NOT EXISTS procore_sync_log (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  connection_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  local_id UUID NOT NULL,
  procore_id TEXT,
  sync_direction TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  error_message TEXT,
  synced_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [168/251] profiles (23 columns)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  logo_url TEXT,
  custom_email_domain TEXT,
  custom_email_from_name TEXT,
  onboarding_completed_at TIMESTAMPTZ,
  email_provider TEXT DEFAULT 'default',
  resend_api_key_configured BOOLEAN,
  organization_id UUID,
  account_type TEXT DEFAULT 'user',
  measurement_system TEXT DEFAULT 'imperial' NOT NULL,
  last_active_at TIMESTAMPTZ,
  last_action TEXT,
  is_parked BOOLEAN,
  parked_at TIMESTAMPTZ,
  parked_message TEXT,
  avatar_url TEXT,
  PRIMARY KEY (id)
);

-- [169/251] projects (10 columns)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  client_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  address TEXT,
  total_amount NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [170/251] proposal_client_selections (5 columns)
CREATE TABLE IF NOT EXISTS proposal_client_selections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  proposal_id UUID NOT NULL,
  selection_id UUID NOT NULL,
  option_id UUID NOT NULL,
  selected_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [171/251] proposal_documents (16 columns)
CREATE TABLE IF NOT EXISTS proposal_documents (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  proposal_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  document_type TEXT DEFAULT 'terms' NOT NULL,
  file_url TEXT,
  content TEXT,
  requires_signature BOOLEAN,
  signature_data TEXT,
  signed_at TIMESTAMPTZ,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  signer_name TEXT,
  signer_email TEXT,
  ip_address TEXT,
  PRIMARY KEY (id)
);

-- [172/251] proposal_pages (14 columns)
CREATE TABLE IF NOT EXISTS proposal_pages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  proposal_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  page_type TEXT DEFAULT 'custom' NOT NULL,
  title TEXT DEFAULT 'New Page' NOT NULL,
  subtitle TEXT,
  page_order INTEGER NOT NULL,
  background_color TEXT DEFAULT '#faf8f5',
  background_image_url TEXT,
  content JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  device_type TEXT DEFAULT 'both' NOT NULL,
  title_style JSONB,
  PRIMARY KEY (id)
);

-- [173/251] proposal_selection_options (12 columns)
CREATE TABLE IF NOT EXISTS proposal_selection_options (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  selection_id UUID NOT NULL,
  catalog_item_id UUID,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price NUMERIC,
  is_base_option BOOLEAN,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [174/251] proposal_selections (11 columns)
CREATE TABLE IF NOT EXISTS proposal_selections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  proposal_id UUID NOT NULL,
  page_id UUID,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  selection_type TEXT DEFAULT 'single' NOT NULL,
  is_required BOOLEAN DEFAULT 'True',
  display_columns INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [175/251] proposal_templates (13 columns)
CREATE TABLE IF NOT EXISTS proposal_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  pages JSONB NOT NULL,
  default_pricing_display TEXT DEFAULT 'show_price',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  is_community BOOLEAN NOT NULL,
  canvas_width INTEGER DEFAULT 1920,
  canvas_height INTEGER DEFAULT 1080,
  page_count INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- [176/251] proposals (23 columns)
CREATE TABLE IF NOT EXISTS proposals (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  client_id UUID,
  estimate_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' NOT NULL,
  share_token UUID DEFAULT gen_random_uuid(),
  pricing_display TEXT DEFAULT 'show_price' NOT NULL,
  base_price NUMERIC,
  selected_total NUMERIC,
  final_total NUMERIC,
  client_approved_at TIMESTAMPTZ,
  client_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  first_viewed_at TIMESTAMPTZ,
  last_viewed_at TIMESTAMPTZ,
  view_count INTEGER,
  tax_rate NUMERIC,
  tax_amount NUMERIC,
  canvas_width INTEGER DEFAULT 1920,
  canvas_height INTEGER DEFAULT 1080,
  PRIMARY KEY (id)
);

-- [177/251] punch_list_items (21 columns)
CREATE TABLE IF NOT EXISTS punch_list_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  punch_list_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  item_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  trade TEXT,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'normal',
  assigned_to UUID,
  assigned_to_name TEXT,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  verified_by UUID,
  model_id UUID,
  location_data JSONB,
  photo_urls JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [178/251] punch_lists (11 columns)
CREATE TABLE IF NOT EXISTS punch_lists (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID,
  client_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [179/251] purchase_order_items (13 columns)
CREATE TABLE IF NOT EXISTS purchase_order_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  purchase_order_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  description TEXT NOT NULL,
  quantity NUMERIC DEFAULT 1 NOT NULL,
  unit TEXT DEFAULT 'ea',
  unit_cost NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  received_quantity NUMERIC,
  catalog_item_id UUID,
  cost_code TEXT,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [180/251] purchase_orders (20 columns)
CREATE TABLE IF NOT EXISTS purchase_orders (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  po_number TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  vendor_id UUID,
  job_id UUID,
  client_id UUID,
  status TEXT DEFAULT 'draft' NOT NULL,
  issue_date DATE DEFAULT 'CURRENT_DATE' NOT NULL,
  expected_date DATE,
  subtotal NUMERIC,
  tax_rate NUMERIC,
  tax_amount NUMERIC,
  total NUMERIC,
  notes TEXT,
  vendor_notes TEXT,
  accepted_at TIMESTAMPTZ,
  share_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [181/251] qr_code_scans (12 columns)
CREATE TABLE IF NOT EXISTS qr_code_scans (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  qr_code_id UUID NOT NULL,
  scanned_at TIMESTAMPTZ DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [182/251] qr_codes (12 columns)
CREATE TABLE IF NOT EXISTS qr_codes (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  trigger_link_id UUID,
  qr_style JSONB,
  is_active BOOLEAN DEFAULT 'True',
  scan_count INTEGER,
  last_scanned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [183/251] quickbooks_connections (12 columns)
CREATE TABLE IF NOT EXISTS quickbooks_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  realm_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT 'True',
  last_sync_at TIMESTAMPTZ,
  sync_settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [184/251] quickbooks_sync_conflicts (15 columns)
CREATE TABLE IF NOT EXISTS quickbooks_sync_conflicts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  connection_id UUID,
  owner_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  local_id TEXT NOT NULL,
  qb_id TEXT NOT NULL,
  field_name TEXT NOT NULL,
  local_value TEXT NOT NULL,
  qb_value TEXT NOT NULL,
  status TEXT DEFAULT 'unresolved' NOT NULL,
  resolution TEXT,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID,
  PRIMARY KEY (id)
);

-- [185/251] quickbooks_sync_log (10 columns)
CREATE TABLE IF NOT EXISTS quickbooks_sync_log (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  connection_id UUID,
  owner_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  local_id UUID NOT NULL,
  qb_id TEXT,
  sync_direction TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  error_message TEXT,
  synced_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [186/251] retainage (13 columns)
CREATE TABLE IF NOT EXISTS retainage (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID NOT NULL,
  invoice_id UUID,
  retainage_percent NUMERIC DEFAULT 10 NOT NULL,
  retainage_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'held' NOT NULL,
  released_amount NUMERIC,
  released_at TIMESTAMPTZ,
  release_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [187/251] review_platform_connections (11 columns)
CREATE TABLE IF NOT EXISTS review_platform_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  platform TEXT NOT NULL,
  platform_account_id TEXT,
  platform_account_name TEXT,
  is_connected BOOLEAN,
  credentials JSONB,
  settings JSONB,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [188/251] review_request_campaigns (14 columns)
CREATE TABLE IF NOT EXISTS review_request_campaigns (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  template_id UUID,
  status TEXT DEFAULT 'draft' NOT NULL,
  total_recipients INTEGER,
  sent_count INTEGER,
  opened_count INTEGER,
  clicked_count INTEGER,
  completed_count INTEGER,
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [189/251] review_request_templates (10 columns)
CREATE TABLE IF NOT EXISTS review_request_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  platform_links JSONB,
  is_default BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [190/251] review_requests (18 columns)
CREATE TABLE IF NOT EXISTS review_requests (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  template_id UUID,
  contact_id UUID,
  client_id UUID,
  job_id UUID,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  review_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  campaign_id UUID,
  PRIMARY KEY (id)
);

-- [191/251] review_response_suggestions (10 columns)
CREATE TABLE IF NOT EXISTS review_response_suggestions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  review_id UUID,
  suggestion_type TEXT DEFAULT 'ai_generated' NOT NULL,
  content TEXT NOT NULL,
  sentiment_match TEXT,
  rating_range_min INTEGER,
  rating_range_max INTEGER,
  is_used BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [192/251] review_response_templates (9 columns)
CREATE TABLE IF NOT EXISTS review_response_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  is_default BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [193/251] reviews (23 columns)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  platform TEXT NOT NULL,
  external_review_id TEXT,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT,
  reviewer_avatar_url TEXT,
  rating INTEGER NOT NULL,
  content TEXT,
  review_date TIMESTAMPTZ DEFAULT now() NOT NULL,
  response_content TEXT,
  response_date TIMESTAMPTZ,
  responded_by UUID,
  status TEXT DEFAULT 'pending' NOT NULL,
  sentiment TEXT,
  is_verified BOOLEAN,
  contact_id UUID,
  client_id UUID,
  job_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [194/251] rfi_attachments (8 columns)
CREATE TABLE IF NOT EXISTS rfi_attachments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  rfi_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [195/251] rfi_responses (8 columns)
CREATE TABLE IF NOT EXISTS rfi_responses (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  rfi_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  responder_id UUID NOT NULL,
  responder_type TEXT DEFAULT 'internal',
  content TEXT NOT NULL,
  is_official_answer BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [196/251] rfis (23 columns)
CREATE TABLE IF NOT EXISTS rfis (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID,
  client_id UUID,
  rfi_number TEXT NOT NULL,
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  status TEXT DEFAULT 'draft',
  priority TEXT DEFAULT 'normal',
  due_date DATE,
  submitted_at TIMESTAMPTZ,
  submitted_by UUID,
  answered_at TIMESTAMPTZ,
  answered_by UUID,
  ball_in_court TEXT,
  cost_impact NUMERIC,
  schedule_impact_days INTEGER,
  model_id UUID,
  location_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [197/251] role_permissions (4 columns)
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  role_id UUID NOT NULL,
  permission TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [198/251] schedule_groups (9 columns)
CREATE TABLE IF NOT EXISTS schedule_groups (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  schedule_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6366f1',
  parent_group_id UUID,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [199/251] schedule_items (17 columns)
CREATE TABLE IF NOT EXISTS schedule_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  schedule_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'pending',
  team_member_ids JSONB,
  vendor_ids JSONB,
  notify_assignees BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  group_id UUID,
  color TEXT,
  depends_on_ids JSONB,
  sort_order INTEGER,
  PRIMARY KEY (id)
);

-- [200/251] schedules (10 columns)
CREATE TABLE IF NOT EXISTS schedules (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  project_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  job_id UUID,
  PRIMARY KEY (id)
);

-- [201/251] selection_template_options (12 columns)
CREATE TABLE IF NOT EXISTS selection_template_options (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  template_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  image_url TEXT,
  catalog_item_id UUID,
  is_base_option BOOLEAN,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [202/251] selection_templates (10 columns)
CREATE TABLE IF NOT EXISTS selection_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  selection_type TEXT DEFAULT 'single' NOT NULL,
  display_columns INTEGER DEFAULT 3,
  is_required BOOLEAN DEFAULT 'True',
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [203/251] sender_reputation (9 columns)
CREATE TABLE IF NOT EXISTS sender_reputation (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  score INTEGER DEFAULT 100,
  score_factors JSONB,
  last_calculated_at TIMESTAMPTZ DEFAULT now(),
  trend TEXT DEFAULT 'stable',
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [204/251] social_accounts (17 columns)
CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  platform VARCHAR NOT NULL,
  account_name VARCHAR NOT NULL,
  account_id VARCHAR,
  profile_url TEXT,
  avatar_url TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  is_connected BOOLEAN DEFAULT 'True',
  follower_count INTEGER,
  settings JSONB,
  connected_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [205/251] social_content_calendar (14 columns)
CREATE TABLE IF NOT EXISTS social_content_calendar (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  title VARCHAR NOT NULL,
  description TEXT,
  content_type VARCHAR DEFAULT 'post',
  platforms JSONB,
  scheduled_date DATE,
  scheduled_time TIME,
  status VARCHAR DEFAULT 'planned',
  assigned_to UUID,
  tags JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [206/251] social_post_metrics (14 columns)
CREATE TABLE IF NOT EXISTS social_post_metrics (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  post_id UUID NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  impressions INTEGER,
  reach INTEGER,
  likes INTEGER,
  comments INTEGER,
  shares INTEGER,
  saves INTEGER,
  clicks INTEGER,
  video_views INTEGER,
  engagement_rate NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [207/251] social_posts (18 columns)
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  content TEXT NOT NULL,
  platform TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  account_id UUID,
  channel_connection_id UUID,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  platform_post_id TEXT,
  page_id TEXT,
  page_name TEXT,
  link_url TEXT,
  media_urls JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [208/251] specifications (14 columns)
CREATE TABLE IF NOT EXISTS specifications (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID,
  client_id UUID,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  details JSONB,
  attachments JSONB,
  is_client_visible BOOLEAN DEFAULT 'True',
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [209/251] submittal_attachments (9 columns)
CREATE TABLE IF NOT EXISTS submittal_attachments (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  submittal_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  is_shop_drawing BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [210/251] submittals (22 columns)
CREATE TABLE IF NOT EXISTS submittals (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID,
  client_id UUID,
  submittal_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  spec_section TEXT,
  status TEXT DEFAULT 'draft',
  priority TEXT DEFAULT 'normal',
  due_date DATE,
  submitted_at TIMESTAMPTZ,
  submitted_by UUID,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  revision_number INTEGER,
  vendor_id UUID,
  model_id UUID,
  location_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [211/251] supplier_catalog_links (17 columns)
CREATE TABLE IF NOT EXISTS supplier_catalog_links (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  catalog_item_id UUID NOT NULL,
  supplier_name TEXT NOT NULL,
  supplier_sku TEXT,
  supplier_url TEXT,
  brand TEXT,
  product_name TEXT,
  specifications JSONB,
  unit_cost NUMERIC NOT NULL,
  unit TEXT DEFAULT 'ea' NOT NULL,
  in_stock BOOLEAN DEFAULT 'True',
  last_scraped_at TIMESTAMPTZ,
  is_primary BOOLEAN,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [212/251] supplier_integrations (11 columns)
CREATE TABLE IF NOT EXISTS supplier_integrations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  supplier_name TEXT NOT NULL,
  account_number TEXT,
  api_credentials JSONB,
  is_active BOOLEAN DEFAULT 'True',
  settings JSONB,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [213/251] supplier_orders (18 columns)
CREATE TABLE IF NOT EXISTS supplier_orders (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  integration_id UUID,
  purchase_order_id UUID,
  job_id UUID,
  supplier_order_number TEXT,
  status TEXT DEFAULT 'pending',
  items JSONB,
  subtotal NUMERIC,
  tax NUMERIC,
  shipping NUMERIC,
  total NUMERIC,
  tracking_number TEXT,
  estimated_delivery DATE,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [214/251] takeoff_template_mappings (9 columns)
CREATE TABLE IF NOT EXISTS takeoff_template_mappings (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  element_type TEXT NOT NULL,
  element_subtype TEXT,
  template_id UUID,
  template_name TEXT,
  is_default BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [215/251] task_sequence_items (11 columns)
CREATE TABLE IF NOT EXISTS task_sequence_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  sequence_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  days_offset INTEGER,
  priority TEXT DEFAULT 'medium',
  assigned_role TEXT,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [216/251] task_sequence_templates (8 columns)
CREATE TABLE IF NOT EXISTS task_sequence_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  trigger_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [217/251] task_templates (10 columns)
CREATE TABLE IF NOT EXISTS task_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  default_priority TEXT DEFAULT 'medium',
  default_due_days INTEGER,
  checklist_items JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [218/251] tasks (14 columns)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' NOT NULL,
  priority TEXT DEFAULT 'medium',
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  assigned_to UUID,
  client_id UUID,
  job_id UUID,
  template_id UUID,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [219/251] team_invitations (14 columns)
CREATE TABLE IF NOT EXISTS team_invitations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  invited_by UUID NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'member',
  is_billable BOOLEAN DEFAULT 'True',
  invite_code UUID DEFAULT gen_random_uuid(),
  status TEXT DEFAULT 'pending',
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT '(now() + '7 days'::interval)',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  custom_role_id UUID,
  PRIMARY KEY (id)
);

-- [220/251] team_members (8 columns)
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [221/251] tiered_selection_template_options (13 columns)
CREATE TABLE IF NOT EXISTS tiered_selection_template_options (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  template_id UUID NOT NULL,
  parent_id UUID,
  tier_level INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price NUMERIC,
  catalog_item_id UUID,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [222/251] tiered_selection_templates (10 columns)
CREATE TABLE IF NOT EXISTS tiered_selection_templates (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  tier_labels JSONB NOT NULL,
  category TEXT,
  show_prices BOOLEAN DEFAULT 'True',
  columns INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [223/251] time_entries (19 columns)
CREATE TABLE IF NOT EXISTS time_entries (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  team_member_id UUID,
  vendor_id UUID,
  user_id UUID,
  clock_in TIMESTAMPTZ DEFAULT now() NOT NULL,
  clock_out TIMESTAMPTZ,
  break_minutes INTEGER,
  job_id UUID,
  job_line_item_id UUID,
  hourly_rate NUMERIC,
  total_hours NUMERIC,
  total_cost NUMERIC,
  notes TEXT,
  status TEXT DEFAULT 'active',
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [224/251] trigger_link_clicks (16 columns)
CREATE TABLE IF NOT EXISTS trigger_link_clicks (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  trigger_link_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  contact_id UUID,
  clicked_at TIMESTAMPTZ DEFAULT now(),
  visitor_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer_url TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [225/251] trigger_links (19 columns)
CREATE TABLE IF NOT EXISTS trigger_links (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  description TEXT,
  trigger_workflow_id UUID,
  is_active BOOLEAN DEFAULT 'True',
  click_count INTEGER,
  unique_click_count INTEGER,
  last_clicked_at TIMESTAMPTZ,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [226/251] units (6 columns)
CREATE TABLE IF NOT EXISTS units (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  abbreviation TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [227/251] user_drafts (7 columns)
CREATE TABLE IF NOT EXISTS user_drafts (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  draft_key TEXT NOT NULL,
  draft_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT '(now() + '7 days'::interval)',
  PRIMARY KEY (id)
);

-- [228/251] user_roles (3 columns)
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'user' NOT NULL,
  PRIMARY KEY (id)
);

-- [229/251] utm_presets (11 columns)
CREATE TABLE IF NOT EXISTS utm_presets (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  source TEXT,
  medium TEXT,
  campaign TEXT,
  term TEXT,
  content TEXT,
  is_default BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [230/251] ux_audit_findings (19 columns)
CREATE TABLE IF NOT EXISTS ux_audit_findings (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  run_id UUID NOT NULL,
  severity TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  element_selector TEXT,
  element_html TEXT,
  current_value TEXT,
  expected_value TEXT,
  wcag_criterion TEXT,
  screenshot_region JSONB,
  fix_suggestion JSONB,
  status TEXT DEFAULT 'open' NOT NULL,
  fixed_by UUID,
  dismissed_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  scope TEXT DEFAULT 'page' NOT NULL,
  PRIMARY KEY (id)
);

-- [231/251] ux_audit_runs (18 columns)
CREATE TABLE IF NOT EXISTS ux_audit_runs (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  triggered_by UUID NOT NULL,
  audit_type TEXT NOT NULL,
  target_route TEXT NOT NULL,
  target_viewport TEXT DEFAULT '1440x900',
  status TEXT DEFAULT 'running' NOT NULL,
  summary TEXT,
  findings_count INTEGER,
  critical_count INTEGER,
  auto_fix_count INTEGER,
  page_snapshot JSONB,
  screenshot_url TEXT,
  duration_ms INTEGER,
  ai_model TEXT,
  ai_tokens_used INTEGER,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (id)
);

-- [232/251] vendor_catalog_prices (13 columns)
CREATE TABLE IF NOT EXISTS vendor_catalog_prices (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  catalog_item_id UUID,
  price_request_id UUID,
  linked_vendor_catalog_id UUID,
  unit_cost NUMERIC NOT NULL,
  custom_item_name TEXT,
  custom_item_description TEXT,
  custom_item_unit TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [233/251] vendor_catalog_pricing (9 columns)
CREATE TABLE IF NOT EXISTS vendor_catalog_pricing (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  catalog_item_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  unit_cost NUMERIC NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT now(),
  source_request_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [234/251] vendor_invitations (6 columns)
CREATE TABLE IF NOT EXISTS vendor_invitations (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  organization_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  invited_by UUID NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [235/251] vendor_price_list_items (12 columns)
CREATE TABLE IF NOT EXISTS vendor_price_list_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  request_id UUID NOT NULL,
  catalog_item_id UUID,
  item_name TEXT NOT NULL,
  item_description TEXT,
  unit TEXT,
  quantity_hint NUMERIC,
  vendor_unit_cost NUMERIC,
  vendor_notes TEXT,
  linked_vendor_catalog_item_id UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [236/251] vendor_price_list_requests (9 columns)
CREATE TABLE IF NOT EXISTS vendor_price_list_requests (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  vendor_user_id UUID,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id)
);

-- [237/251] vendor_price_requests (11 columns)
CREATE TABLE IF NOT EXISTS vendor_price_requests (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name TEXT NOT NULL,
  owner_id UUID NOT NULL,
  vendor_id UUID NOT NULL,
  description TEXT,
  requested_items JSONB,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [238/251] vendor_users (7 columns)
CREATE TABLE IF NOT EXISTS vendor_users (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  vendor_id UUID NOT NULL,
  user_id UUID,
  email TEXT NOT NULL,
  invited_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [239/251] vendors (13 columns)
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT,
  phone TEXT,
  specialty TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  hourly_rate NUMERIC,
  trade TEXT,
  trades JSONB,
  PRIMARY KEY (id)
);

-- [240/251] warranties (15 columns)
CREATE TABLE IF NOT EXISTS warranties (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  job_id UUID NOT NULL,
  client_id UUID,
  warranty_type TEXT DEFAULT 'workmanship' NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  coverage_details TEXT,
  terms TEXT,
  is_active BOOLEAN DEFAULT 'True',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [241/251] warranty_claims (14 columns)
CREATE TABLE IF NOT EXISTS warranty_claims (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  warranty_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  claim_number TEXT NOT NULL,
  reported_date DATE DEFAULT 'CURRENT_DATE' NOT NULL,
  issue_description TEXT NOT NULL,
  status TEXT DEFAULT 'reported' NOT NULL,
  resolution TEXT,
  resolved_date DATE,
  cost_to_repair NUMERIC,
  photos JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [242/251] work_order_items (12 columns)
CREATE TABLE IF NOT EXISTS work_order_items (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  work_order_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  description TEXT NOT NULL,
  quantity NUMERIC DEFAULT 1 NOT NULL,
  unit TEXT DEFAULT 'ea',
  unit_cost NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  cost_code TEXT,
  catalog_item_id UUID,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [243/251] work_orders (20 columns)
CREATE TABLE IF NOT EXISTS work_orders (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  wo_number TEXT NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  vendor_id UUID,
  job_id UUID,
  client_id UUID,
  status TEXT DEFAULT 'draft' NOT NULL,
  scope_of_work TEXT,
  start_date DATE,
  end_date DATE,
  subtotal NUMERIC,
  total NUMERIC,
  notes TEXT,
  vendor_notes TEXT,
  accepted_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  share_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [244/251] workflow_actions (12 columns)
CREATE TABLE IF NOT EXISTS workflow_actions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  workflow_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  action_type TEXT NOT NULL,
  action_config JSONB NOT NULL,
  position_x INTEGER,
  position_y INTEGER,
  display_order INTEGER,
  parent_action_id UUID,
  condition_branch TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [245/251] workflow_connections (7 columns)
CREATE TABLE IF NOT EXISTS workflow_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  workflow_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  source_action_id UUID NOT NULL,
  target_action_id UUID NOT NULL,
  connection_type TEXT DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [246/251] workflow_run_actions (11 columns)
CREATE TABLE IF NOT EXISTS workflow_run_actions (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  run_id UUID NOT NULL,
  action_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  status TEXT DEFAULT 'pending',
  input_data JSONB,
  output_data JSONB,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [247/251] workflow_runs (9 columns)
CREATE TABLE IF NOT EXISTS workflow_runs (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  workflow_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  trigger_data JSONB,
  status TEXT DEFAULT 'pending',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [248/251] workflows (11 columns)
CREATE TABLE IF NOT EXISTS workflows (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL,
  trigger_conditions JSONB,
  status TEXT DEFAULT 'draft',
  is_template BOOLEAN,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [249/251] xero_connections (13 columns)
CREATE TABLE IF NOT EXISTS xero_connections (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  tenant_id TEXT NOT NULL,
  tenant_name TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT 'True',
  sync_settings JSONB,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [250/251] xero_sync_log (10 columns)
CREATE TABLE IF NOT EXISTS xero_sync_log (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  connection_id UUID NOT NULL,
  owner_id UUID NOT NULL,
  entity_type TEXT NOT NULL,
  local_id UUID NOT NULL,
  xero_id TEXT,
  sync_direction TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  error_message TEXT,
  synced_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

-- [251/251] zapier_webhooks (11 columns)
CREATE TABLE IF NOT EXISTS zapier_webhooks (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  organization_id UUID,
  name TEXT NOT NULL,
  webhook_url TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 'True',
  last_triggered_at TIMESTAMPTZ,
  trigger_count INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);


-- ══════════════════════════════════════════════════════════════
-- FOREIGN KEY CONSTRAINTS (run after all tables created)
-- ══════════════════════════════════════════════════════════════

-- ALTER TABLE ai_agent_messages ADD CONSTRAINT fk_ai_agent_messages_session_id FOREIGN KEY (session_id) REFERENCES ai_agent_sessions(id);
-- ALTER TABLE ai_agent_sessions ADD CONSTRAINT fk_ai_agent_sessions_agent_id FOREIGN KEY (agent_id) REFERENCES ai_agents(id);
-- ALTER TABLE ai_agents ADD CONSTRAINT fk_ai_agents_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE ai_knowledge_bases ADD CONSTRAINT fk_ai_knowledge_bases_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE ai_knowledge_documents ADD CONSTRAINT fk_ai_knowledge_documents_knowledge_base_id FOREIGN KEY (knowledge_base_id) REFERENCES ai_knowledge_bases(id);
-- ALTER TABLE approval_requests ADD CONSTRAINT fk_approval_requests_workflow_id FOREIGN KEY (workflow_id) REFERENCES approval_workflows(id);
-- ALTER TABLE approval_step_responses ADD CONSTRAINT fk_approval_step_responses_request_id FOREIGN KEY (request_id) REFERENCES approval_requests(id);
-- ALTER TABLE approval_step_responses ADD CONSTRAINT fk_approval_step_responses_step_id FOREIGN KEY (step_id) REFERENCES approval_workflow_steps(id);
-- ALTER TABLE approval_workflow_steps ADD CONSTRAINT fk_approval_workflow_steps_workflow_id FOREIGN KEY (workflow_id) REFERENCES approval_workflows(id);
-- ALTER TABLE automation_enrollments ADD CONSTRAINT fk_automation_enrollments_sequence_id FOREIGN KEY (sequence_id) REFERENCES automation_sequences(id);
-- ALTER TABLE automation_enrollments ADD CONSTRAINT fk_automation_enrollments_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE automation_execution_log ADD CONSTRAINT fk_automation_execution_log_variant_id FOREIGN KEY (variant_id) REFERENCES automation_ab_variants(id);
-- ALTER TABLE automation_sequence_steps ADD CONSTRAINT fk_automation_sequence_steps_sequence_id FOREIGN KEY (sequence_id) REFERENCES automation_sequences(id);
-- ALTER TABLE automation_sequence_steps ADD CONSTRAINT fk_automation_sequence_steps_next_step_id FOREIGN KEY (next_step_id) REFERENCES automation_sequence_steps(id);
-- ALTER TABLE automation_sequences ADD CONSTRAINT fk_automation_sequences_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE bid_package_items ADD CONSTRAINT fk_bid_package_items_bid_package_id FOREIGN KEY (bid_package_id) REFERENCES bid_packages(id);
-- ALTER TABLE bid_package_vendors ADD CONSTRAINT fk_bid_package_vendors_bid_package_id FOREIGN KEY (bid_package_id) REFERENCES bid_packages(id);
-- ALTER TABLE bid_package_vendors ADD CONSTRAINT fk_bid_package_vendors_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE bid_packages ADD CONSTRAINT fk_bid_packages_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE bid_requests ADD CONSTRAINT fk_bid_requests_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE bid_requests ADD CONSTRAINT fk_bid_requests_project_id FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE bid_requests ADD CONSTRAINT fk_bid_requests_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE bid_vendor_prices ADD CONSTRAINT fk_bid_vendor_prices_bid_package_id FOREIGN KEY (bid_package_id) REFERENCES bid_packages(id);
-- ALTER TABLE bid_vendor_prices ADD CONSTRAINT fk_bid_vendor_prices_bid_package_item_id FOREIGN KEY (bid_package_item_id) REFERENCES bid_package_items(id);
-- ALTER TABLE bid_vendor_prices ADD CONSTRAINT fk_bid_vendor_prices_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE bim_clashes ADD CONSTRAINT fk_bim_clashes_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE bim_clashes ADD CONSTRAINT fk_bim_clashes_model_id FOREIGN KEY (model_id) REFERENCES bim_models(id);
-- ALTER TABLE bim_clashes ADD CONSTRAINT fk_bim_clashes_element_a_id FOREIGN KEY (element_a_id) REFERENCES bim_elements(id);
-- ALTER TABLE bim_clashes ADD CONSTRAINT fk_bim_clashes_element_b_id FOREIGN KEY (element_b_id) REFERENCES bim_elements(id);
-- ALTER TABLE bim_elements ADD CONSTRAINT fk_bim_elements_model_id FOREIGN KEY (model_id) REFERENCES bim_models(id);
-- ALTER TABLE bim_markups ADD CONSTRAINT fk_bim_markups_model_id FOREIGN KEY (model_id) REFERENCES bim_models(id);
-- ALTER TABLE bim_models ADD CONSTRAINT fk_bim_models_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE bim_models ADD CONSTRAINT fk_bim_models_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE booking_calendars ADD CONSTRAINT fk_booking_calendars_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE bugzapper_credits ADD CONSTRAINT fk_bugzapper_credits_lifetime_purchase_id FOREIGN KEY (lifetime_purchase_id) REFERENCES lifetime_purchases(id);
-- ALTER TABLE calendar_bookings ADD CONSTRAINT fk_calendar_bookings_calendar_id FOREIGN KEY (calendar_id) REFERENCES booking_calendars(id);
-- ALTER TABLE calendar_bookings ADD CONSTRAINT fk_calendar_bookings_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE campaign_reports ADD CONSTRAINT fk_campaign_reports_campaign_id FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id);
-- ALTER TABLE campaign_url_clicks ADD CONSTRAINT fk_campaign_url_clicks_template_id FOREIGN KEY (template_id) REFERENCES campaign_url_templates(id);
-- ALTER TABLE campaign_url_templates ADD CONSTRAINT fk_campaign_url_templates_utm_preset_id FOREIGN KEY (utm_preset_id) REFERENCES utm_presets(id);
-- ALTER TABLE catalog_items ADD CONSTRAINT fk_catalog_items_linked_estimate_template_id FOREIGN KEY (linked_estimate_template_id) REFERENCES estimate_templates(id);
-- ALTER TABLE change_order_items ADD CONSTRAINT fk_change_order_items_change_order_id FOREIGN KEY (change_order_id) REFERENCES change_orders(id);
-- ALTER TABLE change_orders ADD CONSTRAINT fk_change_orders_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE change_orders ADD CONSTRAINT fk_change_orders_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE change_orders ADD CONSTRAINT fk_change_orders_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE change_orders ADD CONSTRAINT fk_change_orders_estimate_id FOREIGN KEY (estimate_id) REFERENCES client_estimates(id);
-- ALTER TABLE channel_connections ADD CONSTRAINT fk_channel_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE chat_widgets ADD CONSTRAINT fk_chat_widgets_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE chat_widgets ADD CONSTRAINT fk_chat_widgets_ai_agent_id FOREIGN KEY (ai_agent_id) REFERENCES ai_agents(id);
-- ALTER TABLE client_estimates ADD CONSTRAINT fk_client_estimates_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE client_estimates ADD CONSTRAINT fk_client_estimates_project_id FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE client_estimates ADD CONSTRAINT fk_client_estimates_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE client_estimates ADD CONSTRAINT fk_client_estimates_document_template_id FOREIGN KEY (document_template_id) REFERENCES document_templates(id);
-- ALTER TABLE client_files ADD CONSTRAINT fk_client_files_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE client_files ADD CONSTRAINT fk_client_files_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE client_files ADD CONSTRAINT fk_client_files_folder_id FOREIGN KEY (folder_id) REFERENCES client_folders(id);
-- ALTER TABLE client_folders ADD CONSTRAINT fk_client_folders_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE client_folders ADD CONSTRAINT fk_client_folders_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE client_folders ADD CONSTRAINT fk_client_folders_parent_folder_id FOREIGN KEY (parent_folder_id) REFERENCES client_folders(id);
-- ALTER TABLE client_intake_submissions ADD CONSTRAINT fk_client_intake_submissions_converted_to_client_id FOREIGN KEY (converted_to_client_id) REFERENCES clients(id);
-- ALTER TABLE client_portal_tokens ADD CONSTRAINT fk_client_portal_tokens_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE community_comments ADD CONSTRAINT fk_community_comments_post_id FOREIGN KEY (post_id) REFERENCES community_posts(id);
-- ALTER TABLE community_comments ADD CONSTRAINT fk_community_comments_parent_comment_id FOREIGN KEY (parent_comment_id) REFERENCES community_comments(id);
-- ALTER TABLE community_reactions ADD CONSTRAINT fk_community_reactions_post_id FOREIGN KEY (post_id) REFERENCES community_posts(id);
-- ALTER TABLE community_reactions ADD CONSTRAINT fk_community_reactions_comment_id FOREIGN KEY (comment_id) REFERENCES community_comments(id);
-- ALTER TABLE contact_custom_field_definitions ADD CONSTRAINT fk_contact_custom_field_definitions_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE contact_custom_field_values ADD CONSTRAINT fk_contact_custom_field_values_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE contact_custom_field_values ADD CONSTRAINT fk_contact_custom_field_values_field_definition_id FOREIGN KEY (field_definition_id) REFERENCES contact_custom_field_definitions(id);
-- ALTER TABLE contact_list_members ADD CONSTRAINT fk_contact_list_members_list_id FOREIGN KEY (list_id) REFERENCES contact_lists(id);
-- ALTER TABLE contact_list_members ADD CONSTRAINT fk_contact_list_members_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE contact_lists ADD CONSTRAINT fk_contact_lists_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE contact_segments ADD CONSTRAINT fk_contact_segments_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE contact_tag_assignments ADD CONSTRAINT fk_contact_tag_assignments_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE contact_tag_assignments ADD CONSTRAINT fk_contact_tag_assignments_tag_id FOREIGN KEY (tag_id) REFERENCES contact_tags(id);
-- ALTER TABLE contact_tags ADD CONSTRAINT fk_contact_tags_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE contacts ADD CONSTRAINT fk_contacts_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE contacts ADD CONSTRAINT fk_contacts_converted_to_client_id FOREIGN KEY (converted_to_client_id) REFERENCES clients(id);
-- ALTER TABLE contract_audit_log ADD CONSTRAINT fk_contract_audit_log_contract_id FOREIGN KEY (contract_id) REFERENCES contracts(id);
-- ALTER TABLE contract_audit_log ADD CONSTRAINT fk_contract_audit_log_signer_id FOREIGN KEY (signer_id) REFERENCES contract_signers(id);
-- ALTER TABLE contract_fields ADD CONSTRAINT fk_contract_fields_contract_id FOREIGN KEY (contract_id) REFERENCES contracts(id);
-- ALTER TABLE contract_fields ADD CONSTRAINT fk_contract_fields_template_id FOREIGN KEY (template_id) REFERENCES contract_templates(id);
-- ALTER TABLE contract_signers ADD CONSTRAINT fk_contract_signers_contract_id FOREIGN KEY (contract_id) REFERENCES contracts(id);
-- ALTER TABLE contractor_reviews ADD CONSTRAINT fk_contractor_reviews_contractor_profile_id FOREIGN KEY (contractor_profile_id) REFERENCES contractor_profiles(id);
-- ALTER TABLE contractor_work_requests ADD CONSTRAINT fk_contractor_work_requests_contractor_profile_id FOREIGN KEY (contractor_profile_id) REFERENCES contractor_profiles(id);
-- ALTER TABLE contracts ADD CONSTRAINT fk_contracts_template_id FOREIGN KEY (template_id) REFERENCES contract_templates(id);
-- ALTER TABLE contracts ADD CONSTRAINT fk_contracts_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE contracts ADD CONSTRAINT fk_contracts_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE contracts ADD CONSTRAINT fk_contracts_proposal_id FOREIGN KEY (proposal_id) REFERENCES proposals(id);
-- ALTER TABLE conversation_messages ADD CONSTRAINT fk_conversation_messages_conversation_id FOREIGN KEY (conversation_id) REFERENCES conversations(id);
-- ALTER TABLE conversations ADD CONSTRAINT fk_conversations_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE conversations ADD CONSTRAINT fk_conversations_channel_connection_id FOREIGN KEY (channel_connection_id) REFERENCES channel_connections(id);
-- ALTER TABLE conversations ADD CONSTRAINT fk_conversations_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE conversations ADD CONSTRAINT fk_conversations_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE course_enrollments ADD CONSTRAINT fk_course_enrollments_course_id FOREIGN KEY (course_id) REFERENCES courses(id);
-- ALTER TABLE course_lessons ADD CONSTRAINT fk_course_lessons_module_id FOREIGN KEY (module_id) REFERENCES course_modules(id);
-- ALTER TABLE course_lessons ADD CONSTRAINT fk_course_lessons_course_id FOREIGN KEY (course_id) REFERENCES courses(id);
-- ALTER TABLE course_modules ADD CONSTRAINT fk_course_modules_course_id FOREIGN KEY (course_id) REFERENCES courses(id);
-- ALTER TABLE courses ADD CONSTRAINT fk_courses_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE crm_deal_activities ADD CONSTRAINT fk_crm_deal_activities_deal_id FOREIGN KEY (deal_id) REFERENCES crm_deals(id);
-- ALTER TABLE crm_deals ADD CONSTRAINT fk_crm_deals_pipeline_id FOREIGN KEY (pipeline_id) REFERENCES crm_pipelines(id);
-- ALTER TABLE crm_deals ADD CONSTRAINT fk_crm_deals_stage_id FOREIGN KEY (stage_id) REFERENCES crm_pipeline_stages(id);
-- ALTER TABLE crm_deals ADD CONSTRAINT fk_crm_deals_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE crm_deals ADD CONSTRAINT fk_crm_deals_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE crm_deals ADD CONSTRAINT fk_crm_deals_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE crm_pipeline_stages ADD CONSTRAINT fk_crm_pipeline_stages_pipeline_id FOREIGN KEY (pipeline_id) REFERENCES crm_pipelines(id);
-- ALTER TABLE crm_pipelines ADD CONSTRAINT fk_crm_pipelines_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE custom_analytics_tiles ADD CONSTRAINT fk_custom_analytics_tiles_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE custom_workspaces ADD CONSTRAINT fk_custom_workspaces_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE daemon_actions_log ADD CONSTRAINT fk_daemon_actions_log_conversation_id FOREIGN KEY (conversation_id) REFERENCES daemon_conversations(id);
-- ALTER TABLE daily_log_photos ADD CONSTRAINT fk_daily_log_photos_daily_log_id FOREIGN KEY (daily_log_id) REFERENCES daily_logs(id);
-- ALTER TABLE daily_logs ADD CONSTRAINT fk_daily_logs_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE daily_logs ADD CONSTRAINT fk_daily_logs_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE demo_sessions ADD CONSTRAINT fk_demo_sessions_demo_code_id FOREIGN KEY (demo_code_id) REFERENCES demo_codes(id);
-- ALTER TABLE document_templates ADD CONSTRAINT fk_document_templates_auto_status_id FOREIGN KEY (auto_status_id) REFERENCES job_statuses(id);
-- ALTER TABLE documents ADD CONSTRAINT fk_documents_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE documents ADD CONSTRAINT fk_documents_project_id FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE email_bounces ADD CONSTRAINT fk_email_bounces_campaign_id FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id);
-- ALTER TABLE email_campaign_recipients ADD CONSTRAINT fk_email_campaign_recipients_campaign_id FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id);
-- ALTER TABLE email_campaigns ADD CONSTRAINT fk_email_campaigns_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE email_campaigns ADD CONSTRAINT fk_email_campaigns_segment_id FOREIGN KEY (segment_id) REFERENCES contact_segments(id);
-- ALTER TABLE email_campaigns ADD CONSTRAINT fk_email_campaigns_template_id FOREIGN KEY (template_id) REFERENCES campaign_templates(id);
-- ALTER TABLE email_tracking_events ADD CONSTRAINT fk_email_tracking_events_campaign_id FOREIGN KEY (campaign_id) REFERENCES email_campaigns(id);
-- ALTER TABLE email_tracking_events ADD CONSTRAINT fk_email_tracking_events_recipient_id FOREIGN KEY (recipient_id) REFERENCES email_campaign_recipients(id);
-- ALTER TABLE estimate_style_settings ADD CONSTRAINT fk_estimate_style_settings_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE estimate_views ADD CONSTRAINT fk_estimate_views_estimate_id FOREIGN KEY (estimate_id) REFERENCES client_estimates(id);
-- ALTER TABLE expenses ADD CONSTRAINT fk_expenses_project_id FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE expenses ADD CONSTRAINT fk_expenses_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE expenses ADD CONSTRAINT fk_expenses_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE exterior_scans ADD CONSTRAINT fk_exterior_scans_org_id FOREIGN KEY (org_id) REFERENCES organizations(id);
-- ALTER TABLE exterior_scans ADD CONSTRAINT fk_exterior_scans_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE exterior_scans ADD CONSTRAINT fk_exterior_scans_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE financial_ai_suggestions ADD CONSTRAINT fk_financial_ai_suggestions_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE financial_ai_suggestions ADD CONSTRAINT fk_financial_ai_suggestions_invoice_id FOREIGN KEY (invoice_id) REFERENCES invoices(id);
-- ALTER TABLE financial_allocations ADD CONSTRAINT fk_financial_allocations_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE financial_allocations ADD CONSTRAINT fk_financial_allocations_bucket_id FOREIGN KEY (bucket_id) REFERENCES financial_buckets(id);
-- ALTER TABLE financial_bills ADD CONSTRAINT fk_financial_bills_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE financial_bills ADD CONSTRAINT fk_financial_bills_bucket_id FOREIGN KEY (bucket_id) REFERENCES financial_buckets(id);
-- ALTER TABLE financial_buckets ADD CONSTRAINT fk_financial_buckets_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE floor_plan_comments ADD CONSTRAINT fk_floor_plan_comments_floor_plan_id FOREIGN KEY (floor_plan_id) REFERENCES floor_plans(id);
-- ALTER TABLE floor_plan_comments ADD CONSTRAINT fk_floor_plan_comments_parent_id FOREIGN KEY (parent_id) REFERENCES floor_plan_comments(id);
-- ALTER TABLE floor_plan_scans ADD CONSTRAINT fk_floor_plan_scans_floor_plan_id FOREIGN KEY (floor_plan_id) REFERENCES floor_plans(id);
-- ALTER TABLE floor_plan_scans ADD CONSTRAINT fk_floor_plan_scans_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE floor_plan_versions ADD CONSTRAINT fk_floor_plan_versions_floor_plan_id FOREIGN KEY (floor_plan_id) REFERENCES floor_plans(id);
-- ALTER TABLE floor_plan_xrefs ADD CONSTRAINT fk_floor_plan_xrefs_source_floor_plan_id FOREIGN KEY (source_floor_plan_id) REFERENCES floor_plans(id);
-- ALTER TABLE floor_plan_xrefs ADD CONSTRAINT fk_floor_plan_xrefs_target_floor_plan_id FOREIGN KEY (target_floor_plan_id) REFERENCES floor_plans(id);
-- ALTER TABLE floor_plans ADD CONSTRAINT fk_floor_plans_project_id FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE floor_plans ADD CONSTRAINT fk_floor_plans_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE floor_plans ADD CONSTRAINT fk_floor_plans_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE funnel_pages ADD CONSTRAINT fk_funnel_pages_funnel_id FOREIGN KEY (funnel_id) REFERENCES funnels(id);
-- ALTER TABLE funnel_pages ADD CONSTRAINT fk_funnel_pages_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE funnel_stage_entries ADD CONSTRAINT fk_funnel_stage_entries_funnel_id FOREIGN KEY (funnel_id) REFERENCES marketing_funnels(id);
-- ALTER TABLE funnels ADD CONSTRAINT fk_funnels_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE google_calendar_sync ADD CONSTRAINT fk_google_calendar_sync_schedule_item_id FOREIGN KEY (schedule_item_id) REFERENCES schedule_items(id);
-- ALTER TABLE inbox_conversations ADD CONSTRAINT fk_inbox_conversations_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE inbox_conversations ADD CONSTRAINT fk_inbox_conversations_channel_connection_id FOREIGN KEY (channel_connection_id) REFERENCES channel_connections(id);
-- ALTER TABLE inbox_conversations ADD CONSTRAINT fk_inbox_conversations_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE inbox_conversations ADD CONSTRAINT fk_inbox_conversations_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE inbox_messages ADD CONSTRAINT fk_inbox_messages_conversation_id FOREIGN KEY (conversation_id) REFERENCES inbox_conversations(id);
-- ALTER TABLE inbox_templates ADD CONSTRAINT fk_inbox_templates_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE invoices ADD CONSTRAINT fk_invoices_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE invoices ADD CONSTRAINT fk_invoices_proposal_id FOREIGN KEY (proposal_id) REFERENCES proposals(id);
-- ALTER TABLE invoices ADD CONSTRAINT fk_invoices_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE job_line_items ADD CONSTRAINT fk_job_line_items_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE job_line_items ADD CONSTRAINT fk_job_line_items_bid_request_id FOREIGN KEY (bid_request_id) REFERENCES bid_requests(id);
-- ALTER TABLE job_line_items ADD CONSTRAINT fk_job_line_items_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE jobs ADD CONSTRAINT fk_jobs_project_id FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE jobs ADD CONSTRAINT fk_jobs_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE jobtread_connections ADD CONSTRAINT fk_jobtread_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE jobtread_sync_logs ADD CONSTRAINT fk_jobtread_sync_logs_connection_id FOREIGN KEY (connection_id) REFERENCES jobtread_connections(id);
-- ALTER TABLE lead_form_submissions ADD CONSTRAINT fk_lead_form_submissions_form_id FOREIGN KEY (form_id) REFERENCES lead_forms(id);
-- ALTER TABLE lead_forms ADD CONSTRAINT fk_lead_forms_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE lesson_progress ADD CONSTRAINT fk_lesson_progress_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES course_enrollments(id);
-- ALTER TABLE lesson_progress ADD CONSTRAINT fk_lesson_progress_lesson_id FOREIGN KEY (lesson_id) REFERENCES course_lessons(id);
-- ALTER TABLE lidar_room_scans ADD CONSTRAINT fk_lidar_room_scans_floor_plan_id FOREIGN KEY (floor_plan_id) REFERENCES floor_plans(id);
-- ALTER TABLE lien_waivers ADD CONSTRAINT fk_lien_waivers_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE lien_waivers ADD CONSTRAINT fk_lien_waivers_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE lien_waivers ADD CONSTRAINT fk_lien_waivers_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE lien_waivers ADD CONSTRAINT fk_lien_waivers_invoice_id FOREIGN KEY (invoice_id) REFERENCES invoices(id);
-- ALTER TABLE marketing_campaign_recipients ADD CONSTRAINT fk_marketing_campaign_recipients_campaign_id FOREIGN KEY (campaign_id) REFERENCES marketing_campaigns(id);
-- ALTER TABLE marketing_campaign_recipients ADD CONSTRAINT fk_marketing_campaign_recipients_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE marketing_campaigns ADD CONSTRAINT fk_marketing_campaigns_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE marketing_campaigns ADD CONSTRAINT fk_marketing_campaigns_template_id FOREIGN KEY (template_id) REFERENCES inbox_templates(id);
-- ALTER TABLE marketing_page_views ADD CONSTRAINT fk_marketing_page_views_page_id FOREIGN KEY (page_id) REFERENCES marketing_pages(id);
-- ALTER TABLE marketing_pages ADD CONSTRAINT fk_marketing_pages_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE marketing_pages ADD CONSTRAINT fk_marketing_pages_form_id FOREIGN KEY (form_id) REFERENCES lead_forms(id);
-- ALTER TABLE messages ADD CONSTRAINT fk_messages_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE opportunities ADD CONSTRAINT fk_opportunities_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE opportunities ADD CONSTRAINT fk_opportunities_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE opportunities ADD CONSTRAINT fk_opportunities_converted_to_client_id FOREIGN KEY (converted_to_client_id) REFERENCES clients(id);
-- ALTER TABLE opportunities ADD CONSTRAINT fk_opportunities_converted_to_job_id FOREIGN KEY (converted_to_job_id) REFERENCES jobs(id);
-- ALTER TABLE opportunities ADD CONSTRAINT fk_opportunities_stage_id FOREIGN KEY (stage_id) REFERENCES opportunity_stages(id);
-- ALTER TABLE opportunity_stages ADD CONSTRAINT fk_opportunity_stages_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE organization_files ADD CONSTRAINT fk_organization_files_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE organization_files ADD CONSTRAINT fk_organization_files_folder_id FOREIGN KEY (folder_id) REFERENCES organization_folders(id);
-- ALTER TABLE organization_folders ADD CONSTRAINT fk_organization_folders_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE organization_folders ADD CONSTRAINT fk_organization_folders_parent_folder_id FOREIGN KEY (parent_folder_id) REFERENCES organization_folders(id);
-- ALTER TABLE organization_integrations ADD CONSTRAINT fk_organization_integrations_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE organization_members ADD CONSTRAINT fk_organization_members_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE organization_members ADD CONSTRAINT fk_organization_members_custom_role_id FOREIGN KEY (custom_role_id) REFERENCES organization_roles(id);
-- ALTER TABLE organization_payment_connections ADD CONSTRAINT fk_organization_payment_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE organization_roles ADD CONSTRAINT fk_organization_roles_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE outlook_connections ADD CONSTRAINT fk_outlook_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE outlook_sync_log ADD CONSTRAINT fk_outlook_sync_log_connection_id FOREIGN KEY (connection_id) REFERENCES outlook_connections(id);
-- ALTER TABLE payment_processor_connections ADD CONSTRAINT fk_payment_processor_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE pricing_data_points ADD CONSTRAINT fk_pricing_data_points_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE pricing_data_points ADD CONSTRAINT fk_pricing_data_points_estimate_id FOREIGN KEY (estimate_id) REFERENCES client_estimates(id);
-- ALTER TABLE procore_connections ADD CONSTRAINT fk_procore_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE procore_sync_log ADD CONSTRAINT fk_procore_sync_log_connection_id FOREIGN KEY (connection_id) REFERENCES procore_connections(id);
-- ALTER TABLE profiles ADD CONSTRAINT fk_profiles_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE projects ADD CONSTRAINT fk_projects_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE proposal_client_selections ADD CONSTRAINT fk_proposal_client_selections_proposal_id FOREIGN KEY (proposal_id) REFERENCES proposals(id);
-- ALTER TABLE proposal_client_selections ADD CONSTRAINT fk_proposal_client_selections_selection_id FOREIGN KEY (selection_id) REFERENCES proposal_selections(id);
-- ALTER TABLE proposal_client_selections ADD CONSTRAINT fk_proposal_client_selections_option_id FOREIGN KEY (option_id) REFERENCES proposal_selection_options(id);
-- ALTER TABLE proposal_documents ADD CONSTRAINT fk_proposal_documents_proposal_id FOREIGN KEY (proposal_id) REFERENCES proposals(id);
-- ALTER TABLE proposal_pages ADD CONSTRAINT fk_proposal_pages_proposal_id FOREIGN KEY (proposal_id) REFERENCES proposals(id);
-- ALTER TABLE proposal_selection_options ADD CONSTRAINT fk_proposal_selection_options_selection_id FOREIGN KEY (selection_id) REFERENCES proposal_selections(id);
-- ALTER TABLE proposal_selection_options ADD CONSTRAINT fk_proposal_selection_options_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE proposal_selections ADD CONSTRAINT fk_proposal_selections_proposal_id FOREIGN KEY (proposal_id) REFERENCES proposals(id);
-- ALTER TABLE proposal_selections ADD CONSTRAINT fk_proposal_selections_page_id FOREIGN KEY (page_id) REFERENCES proposal_pages(id);
-- ALTER TABLE proposals ADD CONSTRAINT fk_proposals_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE proposals ADD CONSTRAINT fk_proposals_estimate_id FOREIGN KEY (estimate_id) REFERENCES client_estimates(id);
-- ALTER TABLE punch_list_items ADD CONSTRAINT fk_punch_list_items_punch_list_id FOREIGN KEY (punch_list_id) REFERENCES punch_lists(id);
-- ALTER TABLE punch_list_items ADD CONSTRAINT fk_punch_list_items_model_id FOREIGN KEY (model_id) REFERENCES bim_models(id);
-- ALTER TABLE punch_lists ADD CONSTRAINT fk_punch_lists_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE punch_lists ADD CONSTRAINT fk_punch_lists_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE punch_lists ADD CONSTRAINT fk_punch_lists_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE purchase_order_items ADD CONSTRAINT fk_purchase_order_items_purchase_order_id FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id);
-- ALTER TABLE purchase_order_items ADD CONSTRAINT fk_purchase_order_items_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE purchase_orders ADD CONSTRAINT fk_purchase_orders_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE purchase_orders ADD CONSTRAINT fk_purchase_orders_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE purchase_orders ADD CONSTRAINT fk_purchase_orders_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE purchase_orders ADD CONSTRAINT fk_purchase_orders_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE qr_code_scans ADD CONSTRAINT fk_qr_code_scans_qr_code_id FOREIGN KEY (qr_code_id) REFERENCES qr_codes(id);
-- ALTER TABLE qr_codes ADD CONSTRAINT fk_qr_codes_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE qr_codes ADD CONSTRAINT fk_qr_codes_trigger_link_id FOREIGN KEY (trigger_link_id) REFERENCES trigger_links(id);
-- ALTER TABLE quickbooks_connections ADD CONSTRAINT fk_quickbooks_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE quickbooks_sync_conflicts ADD CONSTRAINT fk_quickbooks_sync_conflicts_connection_id FOREIGN KEY (connection_id) REFERENCES quickbooks_connections(id);
-- ALTER TABLE quickbooks_sync_log ADD CONSTRAINT fk_quickbooks_sync_log_connection_id FOREIGN KEY (connection_id) REFERENCES quickbooks_connections(id);
-- ALTER TABLE retainage ADD CONSTRAINT fk_retainage_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE retainage ADD CONSTRAINT fk_retainage_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE retainage ADD CONSTRAINT fk_retainage_invoice_id FOREIGN KEY (invoice_id) REFERENCES invoices(id);
-- ALTER TABLE review_request_campaigns ADD CONSTRAINT fk_review_request_campaigns_template_id FOREIGN KEY (template_id) REFERENCES review_request_templates(id);
-- ALTER TABLE review_request_templates ADD CONSTRAINT fk_review_request_templates_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE review_requests ADD CONSTRAINT fk_review_requests_template_id FOREIGN KEY (template_id) REFERENCES review_request_templates(id);
-- ALTER TABLE review_requests ADD CONSTRAINT fk_review_requests_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE review_requests ADD CONSTRAINT fk_review_requests_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE review_requests ADD CONSTRAINT fk_review_requests_review_id FOREIGN KEY (review_id) REFERENCES reviews(id);
-- ALTER TABLE review_requests ADD CONSTRAINT fk_review_requests_campaign_id FOREIGN KEY (campaign_id) REFERENCES review_request_campaigns(id);
-- ALTER TABLE review_response_suggestions ADD CONSTRAINT fk_review_response_suggestions_review_id FOREIGN KEY (review_id) REFERENCES reviews(id);
-- ALTER TABLE review_response_templates ADD CONSTRAINT fk_review_response_templates_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE reviews ADD CONSTRAINT fk_reviews_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE reviews ADD CONSTRAINT fk_reviews_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE reviews ADD CONSTRAINT fk_reviews_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE rfi_attachments ADD CONSTRAINT fk_rfi_attachments_rfi_id FOREIGN KEY (rfi_id) REFERENCES rfis(id);
-- ALTER TABLE rfi_responses ADD CONSTRAINT fk_rfi_responses_rfi_id FOREIGN KEY (rfi_id) REFERENCES rfis(id);
-- ALTER TABLE rfis ADD CONSTRAINT fk_rfis_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE rfis ADD CONSTRAINT fk_rfis_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE rfis ADD CONSTRAINT fk_rfis_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE rfis ADD CONSTRAINT fk_rfis_model_id FOREIGN KEY (model_id) REFERENCES bim_models(id);
-- ALTER TABLE role_permissions ADD CONSTRAINT fk_role_permissions_role_id FOREIGN KEY (role_id) REFERENCES organization_roles(id);
-- ALTER TABLE schedule_groups ADD CONSTRAINT fk_schedule_groups_schedule_id FOREIGN KEY (schedule_id) REFERENCES schedules(id);
-- ALTER TABLE schedule_groups ADD CONSTRAINT fk_schedule_groups_parent_group_id FOREIGN KEY (parent_group_id) REFERENCES schedule_groups(id);
-- ALTER TABLE schedule_items ADD CONSTRAINT fk_schedule_items_schedule_id FOREIGN KEY (schedule_id) REFERENCES schedules(id);
-- ALTER TABLE schedule_items ADD CONSTRAINT fk_schedule_items_group_id FOREIGN KEY (group_id) REFERENCES schedule_groups(id);
-- ALTER TABLE schedules ADD CONSTRAINT fk_schedules_project_id FOREIGN KEY (project_id) REFERENCES projects(id);
-- ALTER TABLE schedules ADD CONSTRAINT fk_schedules_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE selection_template_options ADD CONSTRAINT fk_selection_template_options_template_id FOREIGN KEY (template_id) REFERENCES selection_templates(id);
-- ALTER TABLE social_accounts ADD CONSTRAINT fk_social_accounts_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE social_posts ADD CONSTRAINT fk_social_posts_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE social_posts ADD CONSTRAINT fk_social_posts_account_id FOREIGN KEY (account_id) REFERENCES social_accounts(id);
-- ALTER TABLE social_posts ADD CONSTRAINT fk_social_posts_channel_connection_id FOREIGN KEY (channel_connection_id) REFERENCES channel_connections(id);
-- ALTER TABLE specifications ADD CONSTRAINT fk_specifications_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE specifications ADD CONSTRAINT fk_specifications_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE specifications ADD CONSTRAINT fk_specifications_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE submittal_attachments ADD CONSTRAINT fk_submittal_attachments_submittal_id FOREIGN KEY (submittal_id) REFERENCES submittals(id);
-- ALTER TABLE submittals ADD CONSTRAINT fk_submittals_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE submittals ADD CONSTRAINT fk_submittals_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE submittals ADD CONSTRAINT fk_submittals_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE submittals ADD CONSTRAINT fk_submittals_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE submittals ADD CONSTRAINT fk_submittals_model_id FOREIGN KEY (model_id) REFERENCES bim_models(id);
-- ALTER TABLE supplier_catalog_links ADD CONSTRAINT fk_supplier_catalog_links_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE supplier_integrations ADD CONSTRAINT fk_supplier_integrations_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE supplier_orders ADD CONSTRAINT fk_supplier_orders_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE supplier_orders ADD CONSTRAINT fk_supplier_orders_integration_id FOREIGN KEY (integration_id) REFERENCES supplier_integrations(id);
-- ALTER TABLE supplier_orders ADD CONSTRAINT fk_supplier_orders_purchase_order_id FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id);
-- ALTER TABLE supplier_orders ADD CONSTRAINT fk_supplier_orders_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE takeoff_template_mappings ADD CONSTRAINT fk_takeoff_template_mappings_template_id FOREIGN KEY (template_id) REFERENCES estimate_templates(id);
-- ALTER TABLE task_sequence_items ADD CONSTRAINT fk_task_sequence_items_sequence_id FOREIGN KEY (sequence_id) REFERENCES task_sequence_templates(id);
-- ALTER TABLE tasks ADD CONSTRAINT fk_tasks_assigned_to FOREIGN KEY (assigned_to) REFERENCES team_members(id);
-- ALTER TABLE tasks ADD CONSTRAINT fk_tasks_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE tasks ADD CONSTRAINT fk_tasks_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE tasks ADD CONSTRAINT fk_tasks_template_id FOREIGN KEY (template_id) REFERENCES task_templates(id);
-- ALTER TABLE team_invitations ADD CONSTRAINT fk_team_invitations_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE team_invitations ADD CONSTRAINT fk_team_invitations_custom_role_id FOREIGN KEY (custom_role_id) REFERENCES organization_roles(id);
-- ALTER TABLE tiered_selection_template_options ADD CONSTRAINT fk_tiered_selection_template_options_template_id FOREIGN KEY (template_id) REFERENCES tiered_selection_templates(id);
-- ALTER TABLE tiered_selection_template_options ADD CONSTRAINT fk_tiered_selection_template_options_parent_id FOREIGN KEY (parent_id) REFERENCES tiered_selection_template_options(id);
-- ALTER TABLE tiered_selection_template_options ADD CONSTRAINT fk_tiered_selection_template_options_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE time_entries ADD CONSTRAINT fk_time_entries_team_member_id FOREIGN KEY (team_member_id) REFERENCES organization_members(id);
-- ALTER TABLE time_entries ADD CONSTRAINT fk_time_entries_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE time_entries ADD CONSTRAINT fk_time_entries_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE time_entries ADD CONSTRAINT fk_time_entries_job_line_item_id FOREIGN KEY (job_line_item_id) REFERENCES job_line_items(id);
-- ALTER TABLE trigger_link_clicks ADD CONSTRAINT fk_trigger_link_clicks_trigger_link_id FOREIGN KEY (trigger_link_id) REFERENCES trigger_links(id);
-- ALTER TABLE trigger_link_clicks ADD CONSTRAINT fk_trigger_link_clicks_contact_id FOREIGN KEY (contact_id) REFERENCES contacts(id);
-- ALTER TABLE trigger_links ADD CONSTRAINT fk_trigger_links_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE trigger_links ADD CONSTRAINT fk_trigger_links_trigger_workflow_id FOREIGN KEY (trigger_workflow_id) REFERENCES workflows(id);
-- ALTER TABLE ux_audit_findings ADD CONSTRAINT fk_ux_audit_findings_run_id FOREIGN KEY (run_id) REFERENCES ux_audit_runs(id);
-- ALTER TABLE vendor_catalog_prices ADD CONSTRAINT fk_vendor_catalog_prices_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE vendor_catalog_prices ADD CONSTRAINT fk_vendor_catalog_prices_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE vendor_catalog_prices ADD CONSTRAINT fk_vendor_catalog_prices_price_request_id FOREIGN KEY (price_request_id) REFERENCES vendor_price_requests(id);
-- ALTER TABLE vendor_catalog_prices ADD CONSTRAINT fk_vendor_catalog_prices_linked_vendor_catalog_id FOREIGN KEY (linked_vendor_catalog_id) REFERENCES catalog_items(id);
-- ALTER TABLE vendor_catalog_pricing ADD CONSTRAINT fk_vendor_catalog_pricing_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE vendor_catalog_pricing ADD CONSTRAINT fk_vendor_catalog_pricing_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE vendor_catalog_pricing ADD CONSTRAINT fk_vendor_catalog_pricing_source_request_id FOREIGN KEY (source_request_id) REFERENCES vendor_price_list_requests(id);
-- ALTER TABLE vendor_invitations ADD CONSTRAINT fk_vendor_invitations_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE vendor_invitations ADD CONSTRAINT fk_vendor_invitations_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE vendor_price_list_items ADD CONSTRAINT fk_vendor_price_list_items_request_id FOREIGN KEY (request_id) REFERENCES vendor_price_list_requests(id);
-- ALTER TABLE vendor_price_list_items ADD CONSTRAINT fk_vendor_price_list_items_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE vendor_price_list_requests ADD CONSTRAINT fk_vendor_price_list_requests_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE vendor_price_requests ADD CONSTRAINT fk_vendor_price_requests_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE vendor_users ADD CONSTRAINT fk_vendor_users_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE warranties ADD CONSTRAINT fk_warranties_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE warranties ADD CONSTRAINT fk_warranties_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE warranties ADD CONSTRAINT fk_warranties_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE warranty_claims ADD CONSTRAINT fk_warranty_claims_warranty_id FOREIGN KEY (warranty_id) REFERENCES warranties(id);
-- ALTER TABLE work_order_items ADD CONSTRAINT fk_work_order_items_work_order_id FOREIGN KEY (work_order_id) REFERENCES work_orders(id);
-- ALTER TABLE work_order_items ADD CONSTRAINT fk_work_order_items_catalog_item_id FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id);
-- ALTER TABLE work_orders ADD CONSTRAINT fk_work_orders_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE work_orders ADD CONSTRAINT fk_work_orders_vendor_id FOREIGN KEY (vendor_id) REFERENCES vendors(id);
-- ALTER TABLE work_orders ADD CONSTRAINT fk_work_orders_job_id FOREIGN KEY (job_id) REFERENCES jobs(id);
-- ALTER TABLE work_orders ADD CONSTRAINT fk_work_orders_client_id FOREIGN KEY (client_id) REFERENCES clients(id);
-- ALTER TABLE workflow_actions ADD CONSTRAINT fk_workflow_actions_workflow_id FOREIGN KEY (workflow_id) REFERENCES workflows(id);
-- ALTER TABLE workflow_actions ADD CONSTRAINT fk_workflow_actions_parent_action_id FOREIGN KEY (parent_action_id) REFERENCES workflow_actions(id);
-- ALTER TABLE workflow_connections ADD CONSTRAINT fk_workflow_connections_workflow_id FOREIGN KEY (workflow_id) REFERENCES workflows(id);
-- ALTER TABLE workflow_connections ADD CONSTRAINT fk_workflow_connections_source_action_id FOREIGN KEY (source_action_id) REFERENCES workflow_actions(id);
-- ALTER TABLE workflow_connections ADD CONSTRAINT fk_workflow_connections_target_action_id FOREIGN KEY (target_action_id) REFERENCES workflow_actions(id);
-- ALTER TABLE workflow_run_actions ADD CONSTRAINT fk_workflow_run_actions_run_id FOREIGN KEY (run_id) REFERENCES workflow_runs(id);
-- ALTER TABLE workflow_run_actions ADD CONSTRAINT fk_workflow_run_actions_action_id FOREIGN KEY (action_id) REFERENCES workflow_actions(id);
-- ALTER TABLE workflow_runs ADD CONSTRAINT fk_workflow_runs_workflow_id FOREIGN KEY (workflow_id) REFERENCES workflows(id);
-- ALTER TABLE xero_connections ADD CONSTRAINT fk_xero_connections_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);
-- ALTER TABLE xero_sync_log ADD CONSTRAINT fk_xero_sync_log_connection_id FOREIGN KEY (connection_id) REFERENCES xero_connections(id);
-- ALTER TABLE zapier_webhooks ADD CONSTRAINT fk_zapier_webhooks_organization_id FOREIGN KEY (organization_id) REFERENCES organizations(id);

-- ══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON activity_logs FOR ALL USING (owner_id = auth.uid());
ALTER TABLE ai_agent_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON ai_agent_messages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE ai_agent_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON ai_agent_sessions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE ai_agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON ai_agents FOR ALL USING (owner_id = auth.uid());
ALTER TABLE ai_knowledge_bases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON ai_knowledge_bases FOR ALL USING (owner_id = auth.uid());
ALTER TABLE ai_knowledge_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON ai_knowledge_documents FOR ALL USING (owner_id = auth.uid());
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON approval_requests FOR ALL USING (owner_id = auth.uid());
ALTER TABLE approval_step_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON approval_step_responses FOR ALL USING (owner_id = auth.uid());
ALTER TABLE approval_workflow_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON approval_workflow_steps FOR ALL USING (owner_id = auth.uid());
ALTER TABLE approval_workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON approval_workflows FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_ab_variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_ab_variants FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_conditions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_conditions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_enrollments FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_execution_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_execution_log FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_goals FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_sequence_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_sequence_steps FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_sequences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_sequences FOR ALL USING (owner_id = auth.uid());
ALTER TABLE automation_step_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON automation_step_metrics FOR ALL USING (owner_id = auth.uid());
ALTER TABLE bid_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON bid_packages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE bid_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON bid_requests FOR ALL USING (owner_id = auth.uid());
ALTER TABLE bim_clashes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON bim_clashes FOR ALL USING (owner_id = auth.uid());
ALTER TABLE bim_elements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON bim_elements FOR ALL USING (owner_id = auth.uid());
ALTER TABLE bim_markups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON bim_markups FOR ALL USING (owner_id = auth.uid());
ALTER TABLE bim_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON bim_models FOR ALL USING (owner_id = auth.uid());
ALTER TABLE booking_calendars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON booking_calendars FOR ALL USING (owner_id = auth.uid());
ALTER TABLE calendar_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON calendar_bookings FOR ALL USING (owner_id = auth.uid());
ALTER TABLE campaign_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON campaign_reports FOR ALL USING (owner_id = auth.uid());
ALTER TABLE campaign_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON campaign_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE campaign_url_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON campaign_url_clicks FOR ALL USING (owner_id = auth.uid());
ALTER TABLE campaign_url_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON campaign_url_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE catalog_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON catalog_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE change_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON change_order_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE change_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON change_orders FOR ALL USING (owner_id = auth.uid());
ALTER TABLE channel_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON channel_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE chat_widgets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON chat_widgets FOR ALL USING (owner_id = auth.uid());
ALTER TABLE client_estimates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON client_estimates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE client_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON client_files FOR ALL USING (owner_id = auth.uid());
ALTER TABLE client_folders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON client_folders FOR ALL USING (owner_id = auth.uid());
ALTER TABLE client_intake_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON client_intake_submissions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON clients FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_activities FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_custom_field_definitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_custom_field_definitions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_custom_field_values ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_custom_field_values FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_list_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_list_members FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_lists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_lists FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_scoring_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_scoring_rules FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_segments FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_tag_assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_tag_assignments FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contact_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contact_tags FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contacts FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contract_fields ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contract_fields FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contract_signers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contract_signers FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contract_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contract_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contractor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contractor_profiles FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contractor_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contractor_reviews FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contractor_service_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contractor_service_areas FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contractor_work_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contractor_work_requests FOR ALL USING (owner_id = auth.uid());
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON contracts FOR ALL USING (owner_id = auth.uid());
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON conversation_messages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON conversations FOR ALL USING (owner_id = auth.uid());
ALTER TABLE cost_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON cost_codes FOR ALL USING (owner_id = auth.uid());
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON course_enrollments FOR ALL USING (owner_id = auth.uid());
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON course_lessons FOR ALL USING (owner_id = auth.uid());
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON course_modules FOR ALL USING (owner_id = auth.uid());
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON courses FOR ALL USING (owner_id = auth.uid());
ALTER TABLE crm_deal_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON crm_deal_activities FOR ALL USING (owner_id = auth.uid());
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON crm_deals FOR ALL USING (owner_id = auth.uid());
ALTER TABLE crm_pipeline_stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON crm_pipeline_stages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE crm_pipelines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON crm_pipelines FOR ALL USING (owner_id = auth.uid());
ALTER TABLE custom_analytics_tiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON custom_analytics_tiles FOR ALL USING (owner_id = auth.uid());
ALTER TABLE custom_workspaces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON custom_workspaces FOR ALL USING (owner_id = auth.uid());
ALTER TABLE daily_log_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON daily_log_photos FOR ALL USING (owner_id = auth.uid());
ALTER TABLE daily_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON daily_logs FOR ALL USING (owner_id = auth.uid());
ALTER TABLE dashboard_tiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON dashboard_tiles FOR ALL USING (owner_id = auth.uid());
ALTER TABLE document_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON document_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON documents FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_bounces ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_bounces FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_campaign_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_campaign_recipients FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_campaigns FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_domains ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_domains FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_health_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_health_metrics FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_preferences FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE email_tracking_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON email_tracking_events FOR ALL USING (owner_id = auth.uid());
ALTER TABLE estimate_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON estimate_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON expenses FOR ALL USING (owner_id = auth.uid());
ALTER TABLE financial_ai_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON financial_ai_suggestions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE financial_allocations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON financial_allocations FOR ALL USING (owner_id = auth.uid());
ALTER TABLE financial_bills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON financial_bills FOR ALL USING (owner_id = auth.uid());
ALTER TABLE financial_buckets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON financial_buckets FOR ALL USING (owner_id = auth.uid());
ALTER TABLE floor_plan_scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON floor_plan_scans FOR ALL USING (owner_id = auth.uid());
ALTER TABLE floor_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON floor_plans FOR ALL USING (owner_id = auth.uid());
ALTER TABLE funnel_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON funnel_pages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE funnel_stage_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON funnel_stage_entries FOR ALL USING (owner_id = auth.uid());
ALTER TABLE funnels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON funnels FOR ALL USING (owner_id = auth.uid());
ALTER TABLE inbox_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON inbox_conversations FOR ALL USING (owner_id = auth.uid());
ALTER TABLE inbox_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON inbox_messages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE inbox_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON inbox_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE intake_form_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON intake_form_settings FOR ALL USING (owner_id = auth.uid());
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON invoices FOR ALL USING (owner_id = auth.uid());
ALTER TABLE job_line_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON job_line_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE job_statuses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON job_statuses FOR ALL USING (owner_id = auth.uid());
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON jobs FOR ALL USING (owner_id = auth.uid());
ALTER TABLE jobtread_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON jobtread_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE jobtread_sync_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON jobtread_sync_logs FOR ALL USING (owner_id = auth.uid());
ALTER TABLE lead_attribution ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON lead_attribution FOR ALL USING (owner_id = auth.uid());
ALTER TABLE lead_form_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON lead_form_submissions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE lead_forms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON lead_forms FOR ALL USING (owner_id = auth.uid());
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON lesson_progress FOR ALL USING (owner_id = auth.uid());
ALTER TABLE lidar_room_scans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON lidar_room_scans FOR ALL USING (owner_id = auth.uid());
ALTER TABLE lien_waivers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON lien_waivers FOR ALL USING (owner_id = auth.uid());
ALTER TABLE line_item_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON line_item_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE marketing_calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON marketing_calendar_events FOR ALL USING (owner_id = auth.uid());
ALTER TABLE marketing_campaign_recipients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON marketing_campaign_recipients FOR ALL USING (owner_id = auth.uid());
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON marketing_campaigns FOR ALL USING (owner_id = auth.uid());
ALTER TABLE marketing_funnels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON marketing_funnels FOR ALL USING (owner_id = auth.uid());
ALTER TABLE marketing_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON marketing_pages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON notifications FOR ALL USING (owner_id = auth.uid());
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON opportunities FOR ALL USING (owner_id = auth.uid());
ALTER TABLE opportunity_stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON opportunity_stages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE organization_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON organization_files FOR ALL USING (owner_id = auth.uid());
ALTER TABLE organization_folders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON organization_folders FOR ALL USING (owner_id = auth.uid());
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON organizations FOR ALL USING (owner_id = auth.uid());
ALTER TABLE outlook_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON outlook_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE outlook_sync_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON outlook_sync_log FOR ALL USING (owner_id = auth.uid());
ALTER TABLE procore_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON procore_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE procore_sync_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON procore_sync_log FOR ALL USING (owner_id = auth.uid());
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON projects FOR ALL USING (owner_id = auth.uid());
ALTER TABLE proposal_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON proposal_documents FOR ALL USING (owner_id = auth.uid());
ALTER TABLE proposal_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON proposal_pages FOR ALL USING (owner_id = auth.uid());
ALTER TABLE proposal_selection_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON proposal_selection_options FOR ALL USING (owner_id = auth.uid());
ALTER TABLE proposal_selections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON proposal_selections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE proposal_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON proposal_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON proposals FOR ALL USING (owner_id = auth.uid());
ALTER TABLE punch_list_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON punch_list_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE punch_lists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON punch_lists FOR ALL USING (owner_id = auth.uid());
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON purchase_order_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON purchase_orders FOR ALL USING (owner_id = auth.uid());
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON qr_codes FOR ALL USING (owner_id = auth.uid());
ALTER TABLE quickbooks_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON quickbooks_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE quickbooks_sync_conflicts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON quickbooks_sync_conflicts FOR ALL USING (owner_id = auth.uid());
ALTER TABLE quickbooks_sync_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON quickbooks_sync_log FOR ALL USING (owner_id = auth.uid());
ALTER TABLE retainage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON retainage FOR ALL USING (owner_id = auth.uid());
ALTER TABLE review_platform_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON review_platform_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE review_request_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON review_request_campaigns FOR ALL USING (owner_id = auth.uid());
ALTER TABLE review_request_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON review_request_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON review_requests FOR ALL USING (owner_id = auth.uid());
ALTER TABLE review_response_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON review_response_suggestions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE review_response_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON review_response_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON reviews FOR ALL USING (owner_id = auth.uid());
ALTER TABLE rfi_attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON rfi_attachments FOR ALL USING (owner_id = auth.uid());
ALTER TABLE rfi_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON rfi_responses FOR ALL USING (owner_id = auth.uid());
ALTER TABLE rfis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON rfis FOR ALL USING (owner_id = auth.uid());
ALTER TABLE schedule_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON schedule_groups FOR ALL USING (owner_id = auth.uid());
ALTER TABLE schedule_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON schedule_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON schedules FOR ALL USING (owner_id = auth.uid());
ALTER TABLE selection_template_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON selection_template_options FOR ALL USING (owner_id = auth.uid());
ALTER TABLE selection_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON selection_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE sender_reputation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON sender_reputation FOR ALL USING (owner_id = auth.uid());
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON social_accounts FOR ALL USING (owner_id = auth.uid());
ALTER TABLE social_content_calendar ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON social_content_calendar FOR ALL USING (owner_id = auth.uid());
ALTER TABLE social_post_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON social_post_metrics FOR ALL USING (owner_id = auth.uid());
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON social_posts FOR ALL USING (owner_id = auth.uid());
ALTER TABLE specifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON specifications FOR ALL USING (owner_id = auth.uid());
ALTER TABLE submittal_attachments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON submittal_attachments FOR ALL USING (owner_id = auth.uid());
ALTER TABLE submittals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON submittals FOR ALL USING (owner_id = auth.uid());
ALTER TABLE supplier_catalog_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON supplier_catalog_links FOR ALL USING (owner_id = auth.uid());
ALTER TABLE supplier_integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON supplier_integrations FOR ALL USING (owner_id = auth.uid());
ALTER TABLE supplier_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON supplier_orders FOR ALL USING (owner_id = auth.uid());
ALTER TABLE takeoff_template_mappings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON takeoff_template_mappings FOR ALL USING (owner_id = auth.uid());
ALTER TABLE task_sequence_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON task_sequence_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE task_sequence_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON task_sequence_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON task_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON tasks FOR ALL USING (owner_id = auth.uid());
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON team_members FOR ALL USING (owner_id = auth.uid());
ALTER TABLE tiered_selection_template_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON tiered_selection_template_options FOR ALL USING (owner_id = auth.uid());
ALTER TABLE tiered_selection_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON tiered_selection_templates FOR ALL USING (owner_id = auth.uid());
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON time_entries FOR ALL USING (owner_id = auth.uid());
ALTER TABLE trigger_link_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON trigger_link_clicks FOR ALL USING (owner_id = auth.uid());
ALTER TABLE trigger_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON trigger_links FOR ALL USING (owner_id = auth.uid());
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON units FOR ALL USING (owner_id = auth.uid());
ALTER TABLE utm_presets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON utm_presets FOR ALL USING (owner_id = auth.uid());
ALTER TABLE vendor_catalog_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON vendor_catalog_prices FOR ALL USING (owner_id = auth.uid());
ALTER TABLE vendor_catalog_pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON vendor_catalog_pricing FOR ALL USING (owner_id = auth.uid());
ALTER TABLE vendor_price_list_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON vendor_price_list_requests FOR ALL USING (owner_id = auth.uid());
ALTER TABLE vendor_price_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON vendor_price_requests FOR ALL USING (owner_id = auth.uid());
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON vendors FOR ALL USING (owner_id = auth.uid());
ALTER TABLE warranties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON warranties FOR ALL USING (owner_id = auth.uid());
ALTER TABLE warranty_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON warranty_claims FOR ALL USING (owner_id = auth.uid());
ALTER TABLE work_order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON work_order_items FOR ALL USING (owner_id = auth.uid());
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON work_orders FOR ALL USING (owner_id = auth.uid());
ALTER TABLE workflow_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON workflow_actions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE workflow_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON workflow_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE workflow_run_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON workflow_run_actions FOR ALL USING (owner_id = auth.uid());
ALTER TABLE workflow_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON workflow_runs FOR ALL USING (owner_id = auth.uid());
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON workflows FOR ALL USING (owner_id = auth.uid());
ALTER TABLE xero_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON xero_connections FOR ALL USING (owner_id = auth.uid());
ALTER TABLE xero_sync_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON xero_sync_log FOR ALL USING (owner_id = auth.uid());
ALTER TABLE zapier_webhooks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON zapier_webhooks FOR ALL USING (owner_id = auth.uid());

-- ══════════════════════════════════════════════════════════════
-- RPC FUNCTIONS (76 total)
-- ══════════════════════════════════════════════════════════════

-- CREATE OR REPLACE FUNCTION accept_team_invite(_invite_code uuid, _user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION acknowledge_estimate_by_token(p_client_notes text, p_signature_data text, p_token text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION admin_delete_user(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION admin_park_user(_message text, _user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION admin_unpark_user(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION approve_bug_report(bug_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION approve_estimate_by_token(p_client_notes text, p_signature_data text, p_token text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION can_generate_invite_codes(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION check_course_enrollment(_course_id uuid, _student_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION cleanup_expired_drafts()
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION complete_lesson(_enrollment_id uuid, _lesson_id uuid, _quiz_score numeric)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION end_demo_session(_session_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION generate_demo_code(_code_expires_hours integer, _description text, _max_uses integer)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION generate_invite_code(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION generate_portal_token(_client_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_admin_demo_codes()
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_all_bug_reports()
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_change_order_for_signing(_email text, _token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_contracts_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_contracts_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_estimates_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_estimates_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_invoices_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_invoices_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_jobs_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_messages_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_proposals_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_proposals_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_schedule_items(_email text, _schedule_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_schedule_items_by_portal_token(_schedule_id uuid, _token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_schedules_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_schedules_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_team_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_team_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_vendors_by_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_client_vendors_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_contract_for_signing(_signer_email text, _token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_contractor_info_by_client_email(_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_contractor_info_by_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_course_curriculum(_course_id uuid, _student_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_estimate_by_share_token(p_token text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_lead_form_by_slug(_owner_id uuid, _slug text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_lien_waiver_for_signing(_email text, _token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_org_payment_connection(_org_id uuid, _processor_type text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_public_course(_owner_id uuid, _slug text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_student_courses(_student_email text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_user_draft(_consume boolean, _draft_key text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION get_user_organization_id(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION handle_email_resubscribe(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION handle_email_unsubscribe(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION has_active_subscription(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION has_role(_role public.app_role, _user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION is_admin(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION is_org_member(org_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION is_org_owner_or_admin(org_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION is_super_admin(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION is_valid_public_proposal(_proposal_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION is_vendor_user(_user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION link_client_account(_client_email text, _user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION save_estimate_client_selections(p_selections jsonb, p_token text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION save_user_draft(_draft_data jsonb, _draft_key text, _expires_hours integer)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION send_client_message_via_portal(_content text, _token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION sign_change_order(_email text, _signature_data jsonb, _token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION sign_contract(_ip_address text, _signature_data text, _signature_type text, _signer_company text, _signer_email text, _signer_title text, _token uuid, _user_agent text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION sign_lien_waiver(_email text, _signature_data jsonb, _signer_name text, _signer_title text, _token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION start_demo_session(_code text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION submit_lead_form(_data jsonb, _form_id uuid, _ip_address text, _source_url text, _user_agent text, _utm_campaign text, _utm_medium text, _utm_source text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION update_user_activity(_action text)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION use_invite_code(_code character varying, _user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION user_has_permission(_permission text, _user_id uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION validate_demo_session(_session_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION validate_invite_code(_code character varying)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION validate_portal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION validate_proposal_token(_token uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION validate_team_invite(_invite_code uuid)
--   RETURNS ... AS $$ ... $$ LANGUAGE plpgsql;

-- ══════════════════════════════════════════════════════════════
-- LIV POOLS — POOL-SPECIFIC TABLES (not in Crucible-X)
-- 4-tier catalog: SKU → Kit → Assembly → Super-Assembly
-- ══════════════════════════════════════════════════════════════

-- [252/258] skus — Individual purchasable pool construction items
CREATE TABLE IF NOT EXISTS skus (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  cost_type TEXT NOT NULL,
  category TEXT NOT NULL,
  detail TEXT,
  vendor_id UUID,
  uom TEXT NOT NULL,
  unit_cost NUMERIC DEFAULT 0,
  markup_pct NUMERIC DEFAULT 0.60,
  cost_code_id UUID,
  stage TEXT,
  fixed_var TEXT NOT NULL,
  default_qty NUMERIC,
  formula_ref TEXT,
  notes TEXT,
  alt_vendor_1 TEXT,
  alt_cost_1 NUMERIC,
  alt_vendor_2 TEXT,
  alt_cost_2 NUMERIC,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(owner_id, code)
);

-- [253/258] kits — Vendor-grouped SKU bundles
CREATE TABLE IF NOT EXISTS kits (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  vendor_label TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(owner_id, code)
);

-- [254/258] kit_skus — Junction: SKUs in Kits
CREATE TABLE IF NOT EXISTS kit_skus (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  kit_id UUID NOT NULL REFERENCES kits(id) ON DELETE CASCADE,
  sku_id UUID NOT NULL REFERENCES skus(id),
  sort_order INTEGER DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE(kit_id, sku_id)
);

-- [255/258] assemblies — Customer-facing line item groups
CREATE TABLE IF NOT EXISTS assemblies (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(owner_id, code)
);

-- [256/258] assembly_kits — Junction: Kits in Assemblies
CREATE TABLE IF NOT EXISTS assembly_kits (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  assembly_id UUID NOT NULL REFERENCES assemblies(id) ON DELETE CASCADE,
  kit_id UUID NOT NULL REFERENCES kits(id),
  sort_order INTEGER DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE(assembly_id, kit_id)
);

-- [257/258] super_assemblies — Proposal sections / payment milestones
CREATE TABLE IF NOT EXISTS super_assemblies (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  cost_code_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(owner_id, code)
);

-- [258/258] super_assembly_assemblies — Junction: Assemblies in Super-Assemblies
CREATE TABLE IF NOT EXISTS super_assembly_assemblies (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  super_assembly_id UUID NOT NULL REFERENCES super_assemblies(id) ON DELETE CASCADE,
  assembly_id UUID NOT NULL REFERENCES assemblies(id),
  sort_order INTEGER DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE(super_assembly_id, assembly_id)
);

-- [+] formulas — Pool takeoff calculation formulas
CREATE TABLE IF NOT EXISTS formulas (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  owner_id UUID NOT NULL,
  named_range TEXT NOT NULL,
  description TEXT,
  expression TEXT NOT NULL,
  unit TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (id),
  UNIQUE(owner_id, named_range)
);

-- [+] budget_lines — Per-estimate budget tracking by cost code
CREATE TABLE IF NOT EXISTS budget_lines (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  estimate_id UUID NOT NULL,
  cost_code_id UUID NOT NULL,
  estimated NUMERIC DEFAULT 0,
  committed NUMERIC DEFAULT 0,
  actual NUMERIC DEFAULT 0,
  notes TEXT,
  PRIMARY KEY (id),
  UNIQUE(estimate_id, cost_code_id)
);

-- [+] job_stages — Construction stage progress per estimate
CREATE TABLE IF NOT EXISTS job_stages (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  estimate_id UUID NOT NULL,
  cost_code_id UUID NOT NULL,
  status TEXT DEFAULT 'not_started',
  start_date DATE,
  end_date DATE,
  duration_days INTEGER,
  notes TEXT,
  PRIMARY KEY (id),
  UNIQUE(estimate_id, cost_code_id)
);

-- RLS for pool-specific tables
ALTER TABLE skus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON skus FOR ALL USING (owner_id = auth.uid());
ALTER TABLE kits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON kits FOR ALL USING (owner_id = auth.uid());
ALTER TABLE assemblies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON assemblies FOR ALL USING (owner_id = auth.uid());
ALTER TABLE super_assemblies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON super_assemblies FOR ALL USING (owner_id = auth.uid());
ALTER TABLE formulas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_access" ON formulas FOR ALL USING (owner_id = auth.uid());

-- Indexes for pool-specific tables
CREATE INDEX idx_skus_owner ON skus(owner_id);
CREATE INDEX idx_skus_category ON skus(owner_id, category);
CREATE INDEX idx_skus_vendor ON skus(vendor_id);
CREATE INDEX idx_kits_owner ON kits(owner_id);
CREATE INDEX idx_assemblies_owner ON assemblies(owner_id);
