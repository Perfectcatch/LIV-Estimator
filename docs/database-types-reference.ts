// ══════════════════════════════════════════════════════════════
// AUTO-GENERATED TypeScript types from Crucible-X schema
// 251 tables → 251 interfaces
// ══════════════════════════════════════════════════════════════

export interface ActivityLogs {
  id: string;
  owner_id: string;
  activity_type: string;
  entity_type: string;
  entity_id?: string;
  entity_name?: string;
  description: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface AiAgentMessages {
  id: string;
  session_id: string;
  owner_id: string;
  role: string;
  content: string;
  tokens_used?: number;
  model?: string;
  metadata?: Record<string, any>;
  tool_calls?: Record<string, any>;
  tool_results?: Record<string, any>;
  created_at: string;
}

export interface AiAgentSessions {
  id: string;
  agent_id: string;
  owner_id: string;
  title?: string;
  status?: string;
  message_count?: number;
  metadata?: Record<string, any>;
  ended_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AiAgents {
  id: string;
  name: string;
  agent_type: string;
  description?: string;
  owner_id: string;
  organization_id?: string;
  system_prompt?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  tools?: Record<string, any>;
  settings?: Record<string, any>;
  knowledge_base_ids?: Record<string, any>;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface AiKnowledgeBases {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  organization_id?: string;
  source_type?: string;
  document_count?: number;
  last_synced_at?: string;
  settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AiKnowledgeDocuments {
  id: string;
  knowledge_base_id: string;
  name: string;
  content?: string;
  file_path?: string;
  file_type?: string;
  file_size?: number;
  chunk_count?: number;
  owner_id: string;
  status?: string;
  error_message?: string;
  processed_at?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsTileTemplates {
  id: string;
  name: string;
  description?: string;
  category: string;
  tile_type: string;
  config: Record<string, any>;
  data_sources: Record<string, any>;
  is_active: boolean;
  created_at: string;
}

export interface ApprovalRequests {
  id: string;
  workflow_id: string;
  owner_id: string;
  entity_type: string;
  entity_id: string;
  current_step?: number;
  status?: string;
  requested_by?: string;
  amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ApprovalStepResponses {
  id: string;
  request_id: string;
  step_id: string;
  owner_id: string;
  approver_id?: string;
  decision: string;
  comments?: string;
  decided_at: string;
  created_at: string;
}

export interface ApprovalWorkflowSteps {
  id: string;
  workflow_id: string;
  owner_id: string;
  step_order: number;
  approver_type: string;
  approver_id?: string;
  approver_role?: string;
  auto_approve_threshold?: number;
  created_at: string;
  updated_at: string;
}

export interface ApprovalWorkflows {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  entity_type: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface AutomationAbVariants {
  id: string;
  owner_id: string;
  step_id: string;
  variant_name: string;
  subject?: string;
  content_html?: string;
  weight?: number;
  sends?: number;
  opens?: number;
  clicks?: number;
  conversions?: number;
  is_winner?: boolean;
  created_at: string;
}

export interface AutomationConditions {
  id: string;
  owner_id: string;
  step_id: string;
  condition_type: string;
  field?: string;
  operator: string;
  value?: string;
  next_step_if_true?: string;
  next_step_if_false?: string;
  created_at: string;
}

export interface AutomationEnrollments {
  id: string;
  sequence_id: string;
  contact_id: string;
  owner_id: string;
  status?: string;
  current_step?: number;
  enrolled_at?: string;
  completed_at?: string;
  exit_reason?: string;
  next_step_at?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AutomationExecutionLog {
  id: string;
  owner_id: string;
  enrollment_id: string;
  step_id: string;
  executed_at: string;
  status: string;
  result?: Record<string, any>;
  error_message?: string;
  variant_id?: string;
  created_at: string;
}

export interface AutomationGoals {
  id: string;
  owner_id: string;
  sequence_id: string;
  name: string;
  goal_type: string;
  conditions?: Record<string, any>;
  target_count?: number;
  achieved_count?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface AutomationSequenceSteps {
  id: string;
  sequence_id: string;
  owner_id: string;
  step_type: string;
  step_order: number;
  config?: Record<string, any>;
  step_name?: string;
  next_step_id?: string;
  position_x?: number;
  position_y?: number;
  created_at: string;
  updated_at: string;
}

export interface AutomationSequences {
  id: string;
  name: string;
  trigger_type: string;
  owner_id: string;
  organization_id?: string;
  description?: string;
  category?: string;
  status?: string;
  is_active?: boolean;
  trigger_conditions?: Record<string, any>;
  settings?: Record<string, any>;
  enrollment_count?: number;
  created_at: string;
  updated_at: string;
}

export interface AutomationStepMetrics {
  id: string;
  owner_id: string;
  step_id: string;
  sequence_id: string;
  date: string;
  executions?: number;
  successes?: number;
  failures?: number;
  opens?: number;
  clicks?: number;
  unsubscribes?: number;
  created_at: string;
}

export interface BetaInvites {
  id: string;
  email: string;
  invited_by: string;
  invite_code?: string;
  status?: string;
  accepted_at?: string;
  expires_at?: string;
  created_at?: string;
  invite_code_text?: string;
}

export interface BetaSignups {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  plan_type: string;
  user_count?: number;
  monthly_amount?: number;
  transaction_id?: string;
  card_token?: string;
  customer_code?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface BetaStatus {
  id: string;
  user_id: string;
  approved_bugs_count: number;
  subscription_discount: number;
  lifetime_discount: number;
  tier: string;
  has_used_feature_request: boolean;
  is_beta_tester: boolean;
  created_at: string;
  updated_at: string;
}

export interface BidPackageItems {
  id: string;
  bid_package_id: string;
  description: string;
  quantity?: number;
  unit?: string;
  specs?: string;
  sort_order: number;
  created_at: string;
}

export interface BidPackageVendors {
  id: string;
  bid_package_id: string;
  vendor_id: string;
  status: string;
  invited_at: string;
  responded_at?: string;
  notes?: string;
}

export interface BidPackages {
  id: string;
  owner_id: string;
  title: string;
  job_id?: string;
  due_date?: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BidRequests {
  id: string;
  owner_id: string;
  vendor_id: string;
  project_id?: string;
  client_id?: string;
  line_item_name: string;
  line_item_description?: string;
  quantity?: number;
  unit?: string;
  requested_price?: number;
  vendor_submitted_price?: number;
  status: string;
  notes?: string;
  contractor_notes?: string;
  submitted_at?: string;
  approved_at?: string;
  rejected_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BidVendorPrices {
  id: string;
  bid_package_id: string;
  bid_package_item_id: string;
  vendor_id: string;
  unit_price?: number;
  total_price?: number;
  notes?: string;
  lead_time?: string;
  alternative_description?: string;
  submitted_at?: string;
  created_at: string;
}

export interface BimClashes {
  id: string;
  owner_id: string;
  job_id?: string;
  model_id?: string;
  element_a_id?: string;
  element_b_id?: string;
  clash_type: string;
  severity?: string;
  status?: string;
  distance?: number;
  location?: Record<string, any>;
  assigned_to?: string;
  resolved_by?: string;
  resolved_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BimElements {
  id: string;
  model_id: string;
  owner_id: string;
  element_id: string;
  element_type: string;
  category?: string;
  name?: string;
  properties?: Record<string, any>;
  geometry_data?: Record<string, any>;
  quantity_data?: Record<string, any>;
  created_at: string;
}

export interface BimMarkups {
  id: string;
  owner_id: string;
  model_id: string;
  entity_type?: string;
  entity_id?: string;
  markup_type: string;
  position: Record<string, any>;
  rotation?: Record<string, any>;
  scale?: Record<string, any>;
  color?: string;
  label?: string;
  description?: string;
  camera_position?: Record<string, any>;
  created_by: string;
  created_at: string;
}

export interface BimModels {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id?: string;
  name: string;
  description?: string;
  file_path: string;
  file_type: string;
  file_size?: number;
  version?: number;
  thumbnail_url?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface BookingCalendars {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  organization_id?: string;
  description?: string;
  duration_minutes: number;
  buffer_before_minutes?: number;
  buffer_after_minutes?: number;
  min_notice_hours?: number;
  max_days_ahead?: number;
  availability?: Record<string, any>;
  timezone?: string;
  is_active?: boolean;
  sync_to_google?: boolean;
  sync_to_outlook?: boolean;
  confirmation_type?: string;
  confirmation_message?: string;
  created_at: string;
  updated_at: string;
}

export interface BugReports {
  id: string;
  user_id: string;
  route: string;
  screenshot_url?: string;
  description: string;
  status: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  fix_notes?: string;
}

export interface BugzapperCredits {
  id: string;
  user_id: string;
  lifetime_purchase_id?: string;
  bugs_at_purchase: number;
  bugs_current: number;
  credit_amount: number;
  credited_at?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CalendarBookings {
  id: string;
  calendar_id: string;
  owner_id: string;
  booker_name: string;
  booker_email: string;
  booker_phone?: string;
  scheduled_at: string;
  duration_minutes: number;
  timezone?: string;
  notes?: string;
  status?: string;
  contact_id?: string;
  google_event_id?: string;
  outlook_event_id?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  reminder_sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignReports {
  id: string;
  owner_id: string;
  campaign_id?: string;
  report_type: string;
  generated_at: string;
  data?: Record<string, any>;
  created_at: string;
}

export interface CampaignTemplates {
  id: string;
  owner_id: string;
  name: string;
  subject: string;
  content_html: string;
  category?: string;
  is_default?: boolean;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignUrlClicks {
  id: string;
  owner_id: string;
  template_id?: string;
  clicked_at: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device_type?: string;
  browser?: string;
  created_at: string;
}

export interface CampaignUrlTemplates {
  id: string;
  owner_id: string;
  name: string;
  base_url: string;
  utm_preset_id?: string;
  custom_params?: Record<string, any>;
  short_code?: string;
  click_count?: number;
  is_active?: boolean;
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
  unit_cost_formula?: string;
  quantity_formula?: string;
  cost_code?: string;
  image_url?: string;
  linked_estimate_template_id?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  is_allowance?: boolean;
  allowance_display_mode?: string;
  source_url?: string;
  source_supplier?: string;
  last_price_sync?: string;
  price_sync_enabled?: boolean;
}

export interface ChangeOrderItems {
  id: string;
  change_order_id: string;
  owner_id: string;
  item_type: string;
  description: string;
  quantity?: number;
  unit?: string;
  unit_cost?: number;
  unit_price?: number;
  total_cost?: number;
  total_price?: number;
  sort_order?: number;
  created_at: string;
}

export interface ChangeOrders {
  id: string;
  co_number: string;
  owner_id: string;
  organization_id?: string;
  job_id: string;
  client_id?: string;
  estimate_id?: string;
  title: string;
  description?: string;
  reason?: string;
  status: string;
  cost_impact?: number;
  price_impact?: number;
  schedule_impact_days?: number;
  requested_by?: string;
  requested_at?: string;
  approved_at?: string;
  approved_by?: string;
  client_signature?: string;
  client_signed_at?: string;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface ChannelConnections {
  id: string;
  channel_type: string;
  channel_name?: string;
  owner_id: string;
  organization_id?: string;
  is_connected?: boolean;
  connected_at?: string;
  expires_at?: string;
  credentials?: Record<string, any>;
  settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ChatWidgets {
  id: string;
  name: string;
  owner_id: string;
  organization_id?: string;
  ai_agent_id?: string;
  welcome_message?: string;
  offline_message?: string;
  pre_chat_form?: Record<string, any>;
  styling?: Record<string, any>;
  business_hours?: Record<string, any>;
  routing_type?: string;
  is_active?: boolean;
  embed_code?: string;
  allowed_domains?: Record<string, any>;
  ai_enabled?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientEstimates {
  id: string;
  owner_id: string;
  client_id: string;
  project_id?: string;
  name: string;
  description?: string;
  status?: string;
  line_items?: Record<string, any>;
  parameters?: Record<string, any>;
  parameter_groups?: Record<string, any>;
  subtotal?: number;
  markup_total?: number;
  total?: number;
  client_approved_at?: string;
  converted_to_job_at?: string;
  job_id?: string;
  created_at: string;
  updated_at: string;
  share_token?: string;
  client_selections?: Record<string, any>;
  tax_rate?: number;
  tax_amount?: number;
  is_approvable?: boolean;
  client_acknowledged_at?: string;
  client_signature_data?: string;
  document_template_id?: string;
  cover_image_url?: string;
  payment_schedule?: Record<string, any>;
  tier_type: string;
  tier_estimates?: Record<string, any>;
  optional_groups?: Record<string, any>;
  first_viewed_at?: string;
  last_viewed_at?: string;
  view_count: number;
  custom_styles?: Record<string, any>;
  page_blocks?: Record<string, any>;
  work_schedule?: Record<string, any>;
}

export interface ClientFiles {
  id: string;
  owner_id: string;
  organization_id?: string;
  client_id?: string;
  folder_id?: string;
  name: string;
  original_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  is_client_visible: boolean;
  tags?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ClientFolders {
  id: string;
  owner_id: string;
  organization_id?: string;
  client_id?: string;
  parent_folder_id?: string;
  name: string;
  description?: string;
  color?: string;
  is_client_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientIntakeSubmissions {
  id: string;
  owner_id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: string;
  project_description?: string;
  budget_range?: string;
  timeline?: string;
  address?: string;
  how_heard?: string;
  status?: string;
  notes?: string;
  converted_to_client_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientPortalTokens {
  id: string;
  client_id: string;
  token: string;
  created_at: string;
  expires_at?: string;
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

export interface CommunityComments {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  parent_comment_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityPosts {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  image_urls?: Record<string, any>;
  file_urls?: Record<string, any>;
  video_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityReactions {
  id: string;
  user_id: string;
  post_id?: string;
  comment_id?: string;
  reaction_type: string;
  created_at: string;
}

export interface ContactActivities {
  id: string;
  owner_id: string;
  contact_id?: string;
  activity_type: string;
  description?: string;
  metadata?: Record<string, any>;
  score_change?: number;
  created_at: string;
}

export interface ContactCustomFieldDefinitions {
  id: string;
  name: string;
  field_key: string;
  field_type: string;
  owner_id: string;
  organization_id?: string;
  options?: Record<string, any>;
  is_required?: boolean;
  display_order?: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactCustomFieldValues {
  id: string;
  contact_id: string;
  field_definition_id: string;
  owner_id: string;
  value?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ContactListMembers {
  id: string;
  list_id: string;
  contact_id: string;
  owner_id: string;
  added_at?: string;
  source?: string;
  created_at: string;
}

export interface ContactLists {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  organization_id?: string;
  list_type?: string;
  filter_criteria?: Record<string, any>;
  member_count?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactScoringRules {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  trigger_type: string;
  trigger_conditions?: Record<string, any>;
  score_change: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSegments {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  description?: string;
  filter_rules: Record<string, any>;
  is_dynamic?: boolean;
  contact_count?: number;
  last_calculated_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactTagAssignments {
  id: string;
  contact_id: string;
  tag_id: string;
  owner_id: string;
  assigned_at?: string;
  created_at: string;
}

export interface ContactTags {
  id: string;
  name: string;
  color?: string;
  owner_id: string;
  organization_id?: string;
  description?: string;
  usage_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Contacts {
  id: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  company?: string;
  job_title?: string;
  status?: string;
  lifecycle_stage?: string;
  lead_score?: number;
  source?: string;
  source_medium?: string;
  source_campaign?: string;
  source_content?: string;
  notes?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  assigned_to?: string;
  organization_id?: string;
  owner_id: string;
  last_contacted_at?: string;
  last_activity_at?: string;
  converted_at?: string;
  converted_to_client_id?: string;
  email_subscribed?: boolean;
  unsubscribed_at?: string;
  unsubscribe_token?: string;
  total_emails_sent?: number;
  total_emails_opened?: number;
  total_sms_sent?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at: string;
  updated_at: string;
}

export interface ContractAuditLog {
  id: string;
  contract_id: string;
  signer_id?: string;
  action: string;
  ip_address?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface ContractFields {
  id: string;
  owner_id: string;
  contract_id?: string;
  template_id?: string;
  field_type: string;
  page_number: number;
  x_position: number;
  y_position: number;
  width: number;
  height: number;
  assigned_signer_index?: number;
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  filled_at?: string;
  filled_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ContractSigners {
  id: string;
  contract_id: string;
  owner_id: string;
  name: string;
  email: string;
  role?: string;
  sign_order?: number;
  status: string;
  signature_data?: string;
  signature_type?: string;
  signed_at?: string;
  ip_address?: string;
  user_agent?: string;
  email_sent_at?: string;
  reminder_sent_at?: string;
  created_at: string;
  updated_at: string;
  title?: string;
  company?: string;
}

export interface ContractTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  content: string;
  placeholders?: Record<string, any>;
  category?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
  pdf_file_path?: string;
  pdf_page_count?: number;
  document_type?: string;
}

export interface ContractorProfiles {
  id: string;
  business_name: string;
  owner_id: string;
  trade?: string;
  trades?: Record<string, any>;
  description?: string;
  city?: string;
  state_code?: string;
  zip_code?: string;
  license_number?: string;
  certifications?: Record<string, any>;
  years_in_business?: number;
  rating?: number;
  review_count?: number;
  portfolio_images?: Record<string, any>;
  is_visible_in_directory?: boolean;
  is_available_today?: boolean;
  available_until?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_on_request?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContractorReviews {
  id: string;
  contractor_profile_id: string;
  reviewer_id: string;
  rating: number;
  review_text?: string;
  project_type?: string;
  is_verified?: boolean;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface ContractorServiceAreas {
  id: string;
  owner_id: string;
  area_type: string;
  area_name?: string;
  center_lat?: number;
  center_lng?: number;
  radius_miles?: number;
  state_code?: string;
  created_at: string;
  updated_at: string;
}

export interface ContractorWorkRequests {
  id: string;
  contractor_profile_id: string;
  requester_id: string;
  owner_id: string;
  project_description?: string;
  trade_needed?: string;
  location?: string;
  preferred_start_date?: string;
  budget_range?: string;
  status?: string;
  notes?: string;
  responded_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Contracts {
  id: string;
  owner_id: string;
  template_id?: string;
  client_id?: string;
  job_id?: string;
  proposal_id?: string;
  name: string;
  content: string;
  filled_placeholders?: Record<string, any>;
  status: string;
  share_token?: string;
  sent_at?: string;
  expires_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  pdf_file_path?: string;
  pdf_page_count?: number;
  document_type?: string;
}

export interface ConversationMessages {
  id: string;
  conversation_id: string;
  owner_id: string;
  direction: string;
  sender_type: string;
  content?: string;
  content_type?: string;
  sender_id?: string;
  sender_name?: string;
  external_message_id?: string;
  status?: string;
  sent_at?: string;
  delivered_at?: string;
  read_at?: string;
  media_urls?: Record<string, any>;
  metadata?: Record<string, any>;
  error_message?: string;
  call_duration_seconds?: number;
  call_recording_url?: string;
  call_transcription?: string;
  created_at: string;
}

export interface Conversations {
  id: string;
  channel_type: string;
  owner_id: string;
  organization_id?: string;
  channel_connection_id?: string;
  client_id?: string;
  contact_id?: string;
  external_thread_id?: string;
  external_contact_id?: string;
  status?: string;
  is_starred?: boolean;
  is_archived?: boolean;
  is_inbound?: boolean;
  unread_count?: number;
  last_message_at?: string;
  last_message_preview?: string;
  assigned_to?: string;
  snoozed_until?: string;
  created_at: string;
  updated_at: string;
}

export interface CostCodes {
  id: string;
  owner_id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseEnrollments {
  id: string;
  owner_id: string;
  course_id: string;
  student_email: string;
  student_name?: string;
  contact_id?: string;
  enrolled_at: string;
  completed_at?: string;
  progress_percentage?: number;
  certificate_issued_at?: string;
  certificate_url?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseLessons {
  id: string;
  owner_id: string;
  module_id: string;
  course_id: string;
  name: string;
  lesson_type: string;
  content?: Record<string, any>;
  duration_minutes?: number;
  sort_order?: number;
  is_preview?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseModules {
  id: string;
  owner_id: string;
  course_id: string;
  name: string;
  description?: string;
  sort_order?: number;
  is_locked?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Courses {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail_url?: string;
  is_published?: boolean;
  is_free?: boolean;
  price?: number;
  estimated_duration_minutes?: number;
  difficulty_level?: string;
  tags?: Record<string, any>;
  certificate_enabled?: boolean;
  certificate_template?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CrmDealActivities {
  id: string;
  deal_id: string;
  owner_id: string;
  activity_type: string;
  title?: string;
  description?: string;
  created_by?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface CrmDeals {
  id: string;
  title: string;
  pipeline_id: string;
  stage_id: string;
  owner_id: string;
  organization_id?: string;
  contact_id?: string;
  client_id?: string;
  value?: number;
  currency?: string;
  probability?: number;
  status?: string;
  source?: string;
  expected_close_date?: string;
  actual_close_date?: string;
  loss_reason?: string;
  notes?: string;
  assigned_to?: string;
  last_activity_at?: string;
  tags?: Record<string, any>;
  custom_fields?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CrmPipelineStages {
  id: string;
  name: string;
  pipeline_id: string;
  owner_id: string;
  position?: number;
  color?: string;
  probability?: number;
  is_won_stage?: boolean;
  is_lost_stage?: boolean;
  auto_actions?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CrmPipelines {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  organization_id?: string;
  pipeline_type?: string;
  is_default?: boolean;
  settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CustomAnalyticsTiles {
  id: string;
  owner_id: string;
  organization_id?: string;
  dashboard_type: string;
  name: string;
  description?: string;
  tile_type: string;
  config: Record<string, any>;
  data_sources: Record<string, any>;
  refresh_mode: string;
  refresh_interval_seconds?: number;
  sort_order?: number;
  is_visible: boolean;
  size: string;
  ai_prompt?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomWorkspaces {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  nav_items: Record<string, any>;
  is_shared: boolean;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface DaemonActionsLog {
  id: string;
  conversation_id?: string;
  user_id: string;
  tool_name: string;
  tool_input?: Record<string, any>;
  tool_output?: Record<string, any>;
  status: string;
  duration_ms?: number;
  created_at?: string;
}

export interface DaemonConversations {
  id: string;
  user_id: string;
  messages: Record<string, any>;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface DailyLogPhotos {
  id: string;
  daily_log_id: string;
  owner_id: string;
  file_path: string;
  file_name: string;
  description?: string;
  created_at: string;
}

export interface DailyLogs {
  id: string;
  owner_id: string;
  job_id?: string;
  client_id?: string;
  log_date: string;
  weather?: string;
  temperature?: string;
  work_completed?: string;
  materials_used?: string;
  notes?: string;
  hours_worked?: number;
  workers_on_site?: number;
  created_at: string;
  updated_at: string;
  status: string;
  client_visible: boolean;
  submitted_at?: string;
}

export interface DashboardLayouts {
  id: string;
  user_id: string;
  layout: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface DashboardTiles {
  id: string;
  owner_id: string;
  tile_key: string;
  title: string;
  icon: string;
  is_visible: boolean;
  position: number;
  target_view: string;
  created_at: string;
  updated_at: string;
}

export interface DemoCodes {
  id: string;
  code: string;
  created_by: string;
  created_at: string;
  expires_at: string;
  max_uses?: number;
  uses_remaining?: number;
  is_active?: boolean;
  description?: string;
}

export interface DemoSessions {
  id: string;
  demo_code_id: string;
  session_token: string;
  started_at: string;
  expires_at: string;
  ended_at?: string;
  ip_address?: string;
}

export interface DocumentTemplates {
  id: string;
  owner_id: string;
  name: string;
  document_type: string;
  description?: string;
  header_content?: Record<string, any>;
  footer_content?: Record<string, any>;
  terms_content?: Record<string, any>;
  requires_signature?: boolean;
  requires_initials?: boolean;
  signature_positions?: Record<string, any>;
  logo_position?: string;
  auto_status_id?: string;
  is_default?: boolean;
  is_system?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Documents {
  id: string;
  owner_id: string;
  client_id?: string;
  project_id?: string;
  file_name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailBounces {
  id: string;
  owner_id: string;
  campaign_id?: string;
  recipient_email: string;
  bounce_type: string;
  bounce_reason?: string;
  bounce_code?: string;
  bounced_at: string;
  created_at: string;
}

export interface EmailCampaignRecipients {
  id: string;
  campaign_id: string;
  contact_id?: string;
  email: string;
  name?: string;
  status?: string;
  sent_at?: string;
  opened_at?: string;
  clicked_at?: string;
  resend_message_id?: string;
  owner_id: string;
  ab_variant?: string;
}

export interface EmailCampaigns {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  subject: string;
  from_name: string;
  from_email: string;
  content_html: string;
  content_text?: string;
  status: string;
  scheduled_at?: string;
  sent_at?: string;
  total_recipients?: number;
  sent_count?: number;
  opened_count?: number;
  clicked_count?: number;
  bounced_count?: number;
  unsubscribed_count?: number;
  created_at: string;
  updated_at: string;
  segment_id?: string;
  template_id?: string;
  ab_test_enabled?: boolean;
  ab_variant_b_subject?: string;
  ab_variant_b_content?: string;
  ab_test_size_percent?: number;
  ab_winner_criteria?: string;
  ab_winner_wait_hours?: number;
  ab_variant_a_opens?: number;
  ab_variant_b_opens?: number;
  ab_variant_a_clicks?: number;
  ab_variant_b_clicks?: number;
  ab_winning_variant?: string;
  timezone?: string;
}

export interface EmailDomains {
  id: string;
  owner_id: string;
  domain: string;
  verification_status?: string;
  dkim_verified?: boolean;
  spf_verified?: boolean;
  dmarc_verified?: boolean;
  verification_token?: string;
  verified_at?: string;
  last_checked_at?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailHealthMetrics {
  id: string;
  owner_id: string;
  date: string;
  emails_sent?: number;
  emails_delivered?: number;
  emails_bounced?: number;
  hard_bounces?: number;
  soft_bounces?: number;
  spam_complaints?: number;
  unsubscribes?: number;
  delivery_rate?: number;
  bounce_rate?: number;
  complaint_rate?: number;
  created_at: string;
}

export interface EmailPreferences {
  id: string;
  contact_id?: string;
  owner_id: string;
  preference_type: string;
  is_subscribed?: boolean;
  updated_at?: string;
  created_at?: string;
}

export interface EmailTemplates {
  id: string;
  owner_id: string;
  template_type: string;
  name: string;
  subject_template?: string;
  header_text?: string;
  body_template?: string;
  footer_text?: string;
  primary_color?: string;
  secondary_color?: string;
  show_logo?: boolean;
  show_social_links?: boolean;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailTrackingEvents {
  id: string;
  campaign_id?: string;
  recipient_id?: string;
  event_type: string;
  link_url?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  owner_id: string;
}

export interface EstimateStyleSettings {
  id: string;
  organization_id: string;
  cover_page_enabled: boolean;
  cover_page_template: string;
  primary_color: string;
  accent_color: string;
  font_family: string;
  show_quantity: boolean;
  show_unit_price: boolean;
  show_description: boolean;
  show_category: boolean;
  show_line_item_photos: boolean;
  payment_schedule_template?: Record<string, any>;
  default_terms_template_id?: string;
  created_at: string;
  updated_at: string;
  background_color: string;
  text_color: string;
  header_bg_color: string;
  section_header_color: string;
  border_color: string;
  line_item_layout: string;
  show_line_numbers: boolean;
  show_group_subtotals: boolean;
  intro_title: string;
  intro_content: string;
  footer_content: string;
  custom_total_label: string;
  show_company_contact: boolean;
  item_photo_size: string;
  item_photo_shape: string;
  cover_config: Record<string, any>;
  custom_templates?: Record<string, any>;
  default_template_id?: string;
  heading_color?: string;
  page_number_color?: string;
}

export interface EstimateTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  category?: string;
  parameter_groups: Record<string, any>;
  parameters: Record<string, any>;
  line_item_templates: Record<string, any>;
  created_at: string;
  updated_at: string;
  is_community: boolean;
}

export interface EstimateViews {
  id: string;
  estimate_id: string;
  viewer_email?: string;
  viewer_ip?: string;
  viewed_at: string;
  time_spent_seconds?: number;
  device_type?: string;
  user_agent?: string;
  created_at: string;
}

export interface Expenses {
  id: string;
  owner_id: string;
  project_id?: string;
  vendor_id?: string;
  description: string;
  amount: number;
  category?: string;
  expense_date: string;
  receipt_url?: string;
  status?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  cost_code?: string;
  job_id?: string;
}

export interface ExteriorScans {
  id: string;
  org_id: string;
  job_id?: string;
  client_id?: string;
  created_by: string;
  building_type: string;
  stories: number;
  address?: string;
  status: string;
  photo_count: number;
  coverage_percent: number;
  processing_job_id?: string;
  callback_token?: string;
  model_url?: string;
  thumbnail_url?: string;
  measurements?: Record<string, any>;
  scale_method?: string;
  scale_accuracy_cm?: number;
  processing_time_ms?: number;
  processing_cost_usd?: number;
  error_message?: string;
  error_stage?: string;
  created_at?: string;
  updated_at?: string;
  elevation_images?: Record<string, any>;
}

export interface FeatureRequests {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  admin_response?: string;
  is_high_priority: boolean;
  created_at: string;
  updated_at: string;
}

export interface FinancialAiSuggestions {
  id: string;
  owner_id: string;
  organization_id?: string;
  suggestion_type: string;
  title: string;
  description?: string;
  suggested_allocations?: Record<string, any>;
  income_amount?: number;
  invoice_id?: string;
  status?: string;
  created_at: string;
  resolved_at?: string;
}

export interface FinancialAllocations {
  id: string;
  owner_id: string;
  organization_id?: string;
  bucket_id: string;
  amount: number;
  source_type?: string;
  source_id?: string;
  description?: string;
  allocated_at: string;
  created_at: string;
}

export interface FinancialBills {
  id: string;
  owner_id: string;
  organization_id?: string;
  bucket_id?: string;
  name: string;
  description?: string;
  amount: number;
  frequency?: string;
  due_day?: number;
  next_due_date?: string;
  auto_pay?: boolean;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface FinancialBuckets {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  description?: string;
  target_percentage?: number;
  target_amount?: number;
  current_balance?: number;
  priority?: number;
  color?: string;
  icon?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface FloorPlanComments {
  id: string;
  floor_plan_id: string;
  parent_id?: string;
  block_id?: string;
  position_x?: number;
  position_y?: number;
  text: string;
  resolved?: boolean;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface FloorPlanScans {
  id: string;
  owner_id: string;
  floor_plan_id?: string;
  name: string;
  image_url: string;
  scan_result: Record<string, any>;
  groups: Record<string, any>;
  linked_templates: Record<string, any>;
  status: string;
  error_message?: string;
  created_at: string;
  updated_at: string;
  generated_scene_data?: Record<string, any>;
  image_urls?: Record<string, any>;
  client_id?: string;
  pdf_url?: string;
}

export interface FloorPlanVersions {
  id: string;
  floor_plan_id: string;
  version_number: number;
  description?: string;
  blocks_snapshot: Record<string, any>;
  created_by?: string;
  created_at?: string;
}

export interface FloorPlanXrefs {
  id: string;
  source_floor_plan_id: string;
  target_floor_plan_id: string;
  insertion_x?: number;
  insertion_y?: number;
  scale_factor?: number;
  rotation?: number;
  visible?: boolean;
  locked?: boolean;
  created_at?: string;
}

export interface FloorPlans {
  id: string;
  owner_id: string;
  project_id?: string;
  job_id?: string;
  name: string;
  description?: string;
  scene_data?: Record<string, any>;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  client_id?: string;
}

export interface FunnelPages {
  id: string;
  name: string;
  slug: string;
  funnel_id?: string;
  owner_id: string;
  organization_id?: string;
  page_type?: string;
  content?: Record<string, any>;
  custom_css?: string;
  custom_js?: string;
  seo_title?: string;
  seo_description?: string;
  og_image_url?: string;
  is_published?: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface FunnelStageEntries {
  id: string;
  owner_id: string;
  funnel_id?: string;
  contact_id?: string;
  stage_key: string;
  entered_at: string;
  exited_at?: string;
  converted?: boolean;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Funnels {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  organization_id?: string;
  domain?: string;
  favicon_url?: string;
  global_styles?: Record<string, any>;
  conversion_goal?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface GoogleCalendarSettings {
  id: string;
  user_id: string;
  sync_enabled: boolean;
  sync_tasks: boolean;
  sync_milestones: boolean;
  sync_appointments: boolean;
  default_calendar_id?: string;
  created_at: string;
  updated_at: string;
}

export interface GoogleCalendarSync {
  id: string;
  user_id: string;
  schedule_item_id: string;
  google_event_id: string;
  last_synced_at: string;
  sync_direction: string;
  created_at: string;
  updated_at: string;
}

export interface GoogleCalendarTokens {
  id: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  token_expires_at: string;
  calendar_id?: string;
  created_at: string;
  updated_at: string;
}

export interface InboxConversations {
  id: string;
  channel_type: string;
  owner_id: string;
  organization_id?: string;
  channel_connection_id?: string;
  client_id?: string;
  contact_id?: string;
  subject?: string;
  status?: string;
  priority?: string;
  is_starred?: boolean;
  labels?: Record<string, any>;
  unread_count?: number;
  last_message_at?: string;
  last_message_preview?: string;
  external_thread_id?: string;
  assigned_to?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface InboxMessages {
  id: string;
  conversation_id: string;
  owner_id: string;
  content: string;
  direction: string;
  sender_type: string;
  sender_id?: string;
  sender_name?: string;
  sender_email?: string;
  sender_phone?: string;
  content_type?: string;
  status?: string;
  external_id?: string;
  attachments?: Record<string, any>;
  metadata?: Record<string, any>;
  ai_summary?: string;
  ai_sentiment?: string;
  ai_intent?: string;
  error_message?: string;
  created_at: string;
}

export interface InboxTemplates {
  id: string;
  name: string;
  content: string;
  owner_id: string;
  organization_id?: string;
  subject?: string;
  category?: string;
  channel_types?: Record<string, any>;
  is_shared?: boolean;
  variables?: Record<string, any>;
  usage_count?: number;
  created_at: string;
  updated_at: string;
}

export interface IntakeFormSettings {
  id: string;
  owner_id: string;
  form_title?: string;
  form_subtitle?: string;
  success_message?: string;
  primary_color?: string;
  show_phone?: boolean;
  show_company?: boolean;
  show_project_type?: boolean;
  show_budget?: boolean;
  show_timeline?: boolean;
  show_address?: boolean;
  show_how_heard?: boolean;
  project_types?: Record<string, any>;
  budget_ranges?: Record<string, any>;
  timeline_options?: Record<string, any>;
  notify_email?: boolean;
  created_at: string;
  updated_at: string;
}

export interface InviteCodes {
  id: string;
  code: string;
  created_by?: string;
  used_by?: string;
  used_at?: string;
  is_admin_generated?: boolean;
  expires_at?: string;
  created_at?: string;
}

export interface Invoices {
  id: string;
  owner_id: string;
  client_id?: string;
  proposal_id?: string;
  job_id?: string;
  invoice_number: string;
  status: string;
  issue_date: string;
  due_date?: string;
  subtotal?: number;
  tax_rate?: number;
  tax_amount?: number;
  total?: number;
  amount_paid?: number;
  notes?: string;
  terms?: string;
  line_items?: Record<string, any>;
  paid_at?: string;
  sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface JobLineItems {
  id: string;
  owner_id: string;
  job_id: string;
  name: string;
  description?: string;
  category?: string;
  quantity?: number;
  unit?: string;
  estimated_unit_cost?: number;
  approved_unit_cost?: number;
  actual_unit_cost?: number;
  markup_percentage?: number;
  bid_request_id?: string;
  vendor_id?: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface JobStatuses {
  id: string;
  owner_id: string;
  name: string;
  color: string;
  display_order: number;
  is_default?: boolean;
  is_system?: boolean;
  created_at?: string;
  updated_at?: string;
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

export interface JobtreadConnections {
  id: string;
  organization_id?: string;
  owner_id: string;
  grant_key: string;
  jobtread_organization_id?: string;
  jobtread_organization_name?: string;
  is_active?: boolean;
  last_sync_at?: string;
  sync_status?: string;
  sync_error?: string;
  auto_sync_enabled?: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobtreadSyncLogs {
  id: string;
  connection_id?: string;
  owner_id: string;
  sync_type: string;
  status: string;
  items_synced?: number;
  items_failed?: number;
  error_details?: Record<string, any>;
  started_at: string;
  completed_at?: string;
}

export interface LeadAttribution {
  id: string;
  owner_id: string;
  contact_id?: string;
  opportunity_id?: string;
  first_touch_source?: string;
  first_touch_medium?: string;
  first_touch_campaign?: string;
  first_touch_content?: string;
  first_touch_term?: string;
  first_touch_at?: string;
  last_touch_source?: string;
  last_touch_medium?: string;
  last_touch_campaign?: string;
  last_touch_content?: string;
  last_touch_term?: string;
  last_touch_at?: string;
  converted_at?: string;
  conversion_value?: number;
  conversion_type?: string;
  touchpoints?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface LeadFormSubmissions {
  id: string;
  form_id: string;
  owner_id: string;
  contact_id?: string;
  data: Record<string, any>;
  source_url?: string;
  ip_address?: string;
  user_agent?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  status?: string;
  processed_at?: string;
  created_at: string;
}

export interface LeadForms {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  description?: string;
  slug: string;
  fields: Record<string, any>;
  settings?: Record<string, any>;
  styling?: Record<string, any>;
  success_message?: string;
  redirect_url?: string;
  is_active?: boolean;
  submission_count?: number;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  owner_id: string;
  enrollment_id: string;
  lesson_id: string;
  started_at?: string;
  completed_at?: string;
  quiz_score?: number;
  quiz_attempts?: number;
  time_spent_seconds?: number;
  created_at: string;
  updated_at: string;
}

export interface LidarRoomScans {
  id: string;
  owner_id: string;
  floor_plan_id?: string;
  name: string;
  device_id?: string;
  scanned_at: string;
  room_dimensions?: Record<string, any>;
  walls?: Record<string, any>;
  doors?: Record<string, any>;
  windows?: Record<string, any>;
  openings?: Record<string, any>;
  fixtures?: Record<string, any>;
  surfaces?: Record<string, any>;
  usdz_file_path?: string;
  thumbnail_url?: string;
  preview_images?: Record<string, any>;
  status: string;
  error_message?: string;
  converted_to_floor_plan_at?: string;
  scan_result?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface LienWaivers {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id: string;
  vendor_id: string;
  invoice_id?: string;
  waiver_type: string;
  status: string;
  amount: number;
  through_date: string;
  claimant_name: string;
  claimant_title?: string;
  share_token?: string;
  signature_data?: Record<string, any>;
  signed_at?: string;
  sent_at?: string;
  exceptions?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface LifetimeMembershipSlots {
  id: string;
  total_slots: number;
  claimed_slots: number;
  created_at: string;
  updated_at: string;
}

export interface LifetimePurchases {
  id: string;
  user_id: string;
  email: string;
  company_name: string;
  contact_name: string;
  amount_paid: number;
  discount_applied: number;
  discount_at_purchase: number;
  bugs_at_purchase: number;
  transaction_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface LineItemTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  cost_code?: string;
  category?: string;
  unit?: string;
  unit_cost?: number;
  markup_percentage?: number;
  formula?: string;
  is_description_only?: boolean;
  created_at: string;
  updated_at: string;
  is_community: boolean;
}

export interface MarketingCalendarEvents {
  id: string;
  owner_id: string;
  title: string;
  description?: string;
  event_type: string;
  start_date: string;
  end_date?: string;
  all_day?: boolean;
  color?: string;
  entity_type?: string;
  entity_id?: string;
  status?: string;
  recurrence_rule?: string;
  created_at: string;
  updated_at: string;
}

export interface MarketingCampaignRecipients {
  id: string;
  campaign_id: string;
  owner_id: string;
  contact_id?: string;
  email?: string;
  phone?: string;
  status?: string;
  sent_at?: string;
  opened_at?: string;
  clicked_at?: string;
  error_message?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface MarketingCampaigns {
  id: string;
  name: string;
  campaign_type: string;
  owner_id: string;
  organization_id?: string;
  subject?: string;
  content?: string;
  html_content?: string;
  from_name?: string;
  from_email?: string;
  reply_to?: string;
  template_id?: string;
  status?: string;
  scheduled_at?: string;
  sent_at?: string;
  segment_filters?: Record<string, any>;
  settings?: Record<string, any>;
  stats?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface MarketingFunnels {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  stages: Record<string, any>;
  goal_type?: string;
  goal_value?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface MarketingPageViews {
  id: string;
  page_id: string;
  viewed_at?: string;
  visitor_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer_url?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
}

export interface MarketingPages {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  organization_id?: string;
  page_type?: string;
  description?: string;
  content?: Record<string, any>;
  styling?: Record<string, any>;
  custom_css?: string;
  custom_js?: string;
  custom_domain?: string;
  meta_title?: string;
  meta_description?: string;
  og_image_url?: string;
  favicon_url?: string;
  form_id?: string;
  is_published?: boolean;
  published_at?: string;
  view_count?: number;
  conversion_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Messages {
  id: string;
  client_id: string;
  sender_id?: string;
  sender_type: string;
  content: string;
  read_at?: string;
  email_sent?: boolean;
  created_at: string;
}

export interface Notifications {
  id: string;
  owner_id: string;
  type: string;
  title: string;
  message?: string;
  entity_type?: string;
  entity_id?: string;
  read_at?: string;
  created_at: string;
}

export interface Opportunities {
  id: string;
  name: string;
  owner_id: string;
  organization_id?: string;
  contact_id?: string;
  converted_to_client_id?: string;
  converted_to_job_id?: string;
  stage_id?: string;
  value?: number;
  currency?: string;
  status?: string;
  source?: string;
  source_campaign?: string;
  description?: string;
  expected_close_date?: string;
  actual_close_date?: string;
  lost_reason?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface OpportunityStages {
  id: string;
  name: string;
  pipeline_name?: string;
  owner_id: string;
  organization_id?: string;
  display_order?: number;
  color?: string;
  win_probability?: number;
  is_won_stage?: boolean;
  is_lost_stage?: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationFiles {
  id: string;
  owner_id: string;
  organization_id?: string;
  folder_id?: string;
  name: string;
  original_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  tags?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface OrganizationFolders {
  id: string;
  owner_id: string;
  organization_id?: string;
  parent_folder_id?: string;
  name: string;
  description?: string;
  color?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationIntegrations {
  id: string;
  organization_id: string;
  integration_type: string;
  is_connected: boolean;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  settings?: Record<string, any>;
  connected_at?: string;
  connected_by?: string;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMembers {
  id: string;
  organization_id: string;
  user_id: string;
  role?: string;
  is_billable?: boolean;
  created_at?: string;
  updated_at?: string;
  custom_role_id?: string;
  hourly_rate?: number;
}

export interface OrganizationPaymentConnections {
  id: string;
  organization_id: string;
  processor_type: string;
  api_key_encrypted: string;
  account_id?: string;
  is_active?: boolean;
  is_test_mode?: boolean;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface OrganizationRoles {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  is_system_role?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Organizations {
  id: string;
  name: string;
  owner_id: string;
  helcim_customer_code?: string;
  helcim_subscription_id?: string;
  subscription_status?: string;
  trial_ends_at?: string;
  subscription_started_at?: string;
  base_price?: number;
  per_user_price?: number;
  created_at?: string;
  updated_at?: string;
  logo_url?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  custom_email_domain?: string;
  custom_email_from_name?: string;
  email_provider?: string;
  resend_api_key_configured?: boolean;
  brand_color?: string;
  daily_log_photos_required: boolean;
  default_markups?: Record<string, any>;
  roof_measurement_provider?: string;
  roof_measurement_api_key?: string;
  twilio_account_sid?: string;
  twilio_auth_token_encrypted?: string;
  twilio_phone_number?: string;
  twilio_enabled?: boolean;
  meta_page_id?: string;
  meta_page_access_token_encrypted?: string;
  meta_instagram_account_id?: string;
  meta_enabled?: boolean;
  meta_webhook_verify_token?: string;
  meta_page_name?: string;
  meta_connected_at?: string;
  business_days_config?: Record<string, any>;
}

export interface OutlookConnections {
  id: string;
  owner_id: string;
  organization_id?: string;
  user_email?: string;
  user_name?: string;
  calendar_id?: string;
  access_token: string;
  refresh_token: string;
  token_expires_at: string;
  is_active?: boolean;
  sync_settings?: Record<string, any>;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OutlookSyncLog {
  id: string;
  connection_id: string;
  owner_id: string;
  entity_type: string;
  local_id: string;
  outlook_id?: string;
  sync_direction: string;
  status: string;
  error_message?: string;
  synced_at: string;
}

export interface PaymentProcessorConnections {
  id: string;
  organization_id: string;
  processor_type: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingDataPoints {
  id: string;
  item_name: string;
  item_name_normalized: string;
  category: string;
  trade?: string;
  cost_code?: string;
  unit: string;
  unit_price: number;
  quantity: number;
  markup_percentage?: number;
  state: string;
  zip_code?: string;
  project_type?: string;
  organization_id: string;
  estimate_id?: string;
  estimate_status?: string;
  was_accepted?: boolean;
  was_converted?: boolean;
  actual_hours?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProcoreConnections {
  id: string;
  owner_id: string;
  organization_id?: string;
  company_id: string;
  company_name?: string;
  access_token: string;
  refresh_token: string;
  token_expires_at: string;
  is_active?: boolean;
  sync_settings?: Record<string, any>;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ProcoreSyncLog {
  id: string;
  connection_id: string;
  owner_id: string;
  entity_type: string;
  local_id: string;
  procore_id?: string;
  sync_direction: string;
  status: string;
  error_message?: string;
  synced_at: string;
}

export interface Profiles {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  company_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  logo_url?: string;
  custom_email_domain?: string;
  custom_email_from_name?: string;
  onboarding_completed_at?: string;
  email_provider?: string;
  resend_api_key_configured?: boolean;
  organization_id?: string;
  account_type?: string;
  measurement_system: string;
  last_active_at?: string;
  last_action?: string;
  is_parked?: boolean;
  parked_at?: string;
  parked_message?: string;
  avatar_url?: string;
}

export interface Projects {
  id: string;
  owner_id: string;
  client_id?: string;
  name: string;
  description?: string;
  status?: string;
  address?: string;
  total_amount?: number;
  created_at: string;
  updated_at: string;
}

export interface ProposalClientSelections {
  id: string;
  proposal_id: string;
  selection_id: string;
  option_id: string;
  selected_at: string;
}

export interface ProposalDocuments {
  id: string;
  proposal_id: string;
  owner_id: string;
  name: string;
  document_type: string;
  file_url?: string;
  content?: string;
  requires_signature?: boolean;
  signature_data?: string;
  signed_at?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
  signer_name?: string;
  signer_email?: string;
  ip_address?: string;
}

export interface ProposalPages {
  id: string;
  proposal_id: string;
  owner_id: string;
  page_type: string;
  title: string;
  subtitle?: string;
  page_order: number;
  background_color?: string;
  background_image_url?: string;
  content?: Record<string, any>;
  created_at: string;
  updated_at: string;
  device_type: string;
  title_style?: Record<string, any>;
}

export interface ProposalSelectionOptions {
  id: string;
  selection_id: string;
  catalog_item_id?: string;
  owner_id: string;
  name: string;
  description?: string;
  image_url?: string;
  price?: number;
  is_base_option?: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface ProposalSelections {
  id: string;
  proposal_id: string;
  page_id?: string;
  owner_id: string;
  name: string;
  description?: string;
  selection_type: string;
  is_required?: boolean;
  display_columns?: number;
  created_at: string;
  updated_at: string;
}

export interface ProposalTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  category?: string;
  pages: Record<string, any>;
  default_pricing_display?: string;
  created_at: string;
  updated_at: string;
  is_community: boolean;
  canvas_width?: number;
  canvas_height?: number;
  page_count: number;
}

export interface Proposals {
  id: string;
  owner_id: string;
  client_id?: string;
  estimate_id?: string;
  name: string;
  description?: string;
  status: string;
  share_token?: string;
  pricing_display: string;
  base_price?: number;
  selected_total?: number;
  final_total?: number;
  client_approved_at?: string;
  client_notes?: string;
  created_at: string;
  updated_at: string;
  first_viewed_at?: string;
  last_viewed_at?: string;
  view_count?: number;
  tax_rate?: number;
  tax_amount?: number;
  canvas_width?: number;
  canvas_height?: number;
}

export interface PunchListItems {
  id: string;
  punch_list_id: string;
  owner_id: string;
  item_number: number;
  description: string;
  location?: string;
  trade?: string;
  status?: string;
  priority?: string;
  assigned_to?: string;
  assigned_to_name?: string;
  due_date?: string;
  completed_at?: string;
  verified_at?: string;
  verified_by?: string;
  model_id?: string;
  location_data?: Record<string, any>;
  photo_urls?: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PunchLists {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id?: string;
  client_id?: string;
  name: string;
  description?: string;
  status?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrderItems {
  id: string;
  purchase_order_id: string;
  owner_id: string;
  description: string;
  quantity: number;
  unit?: string;
  unit_cost: number;
  total: number;
  received_quantity?: number;
  catalog_item_id?: string;
  cost_code?: string;
  sort_order?: number;
  created_at: string;
}

export interface PurchaseOrders {
  id: string;
  po_number: string;
  owner_id: string;
  organization_id?: string;
  vendor_id?: string;
  job_id?: string;
  client_id?: string;
  status: string;
  issue_date: string;
  expected_date?: string;
  subtotal?: number;
  tax_rate?: number;
  tax_amount?: number;
  total?: number;
  notes?: string;
  vendor_notes?: string;
  accepted_at?: string;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface QrCodeScans {
  id: string;
  qr_code_id: string;
  scanned_at?: string;
  ip_address?: string;
  user_agent?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  country?: string;
  region?: string;
  city?: string;
  created_at: string;
}

export interface QrCodes {
  id: string;
  name: string;
  destination_url: string;
  owner_id: string;
  organization_id?: string;
  trigger_link_id?: string;
  qr_style?: Record<string, any>;
  is_active?: boolean;
  scan_count?: number;
  last_scanned_at?: string;
  created_at: string;
  updated_at: string;
}

export interface QuickbooksConnections {
  id: string;
  owner_id: string;
  organization_id?: string;
  realm_id: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  is_active?: boolean;
  last_sync_at?: string;
  sync_settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface QuickbooksSyncConflicts {
  id: string;
  connection_id?: string;
  owner_id: string;
  entity_type: string;
  local_id: string;
  qb_id: string;
  field_name: string;
  local_value: string;
  qb_value: string;
  status: string;
  resolution?: string;
  resolution_notes?: string;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
}

export interface QuickbooksSyncLog {
  id: string;
  connection_id?: string;
  owner_id: string;
  entity_type: string;
  local_id: string;
  qb_id?: string;
  sync_direction: string;
  status: string;
  error_message?: string;
  synced_at?: string;
}

export interface Retainage {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id: string;
  invoice_id?: string;
  retainage_percent: number;
  retainage_amount: number;
  status: string;
  released_amount?: number;
  released_at?: string;
  release_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewPlatformConnections {
  id: string;
  owner_id: string;
  platform: string;
  platform_account_id?: string;
  platform_account_name?: string;
  is_connected?: boolean;
  credentials?: Record<string, any>;
  settings?: Record<string, any>;
  last_synced_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewRequestCampaigns {
  id: string;
  owner_id: string;
  name: string;
  template_id?: string;
  status: string;
  total_recipients?: number;
  sent_count?: number;
  opened_count?: number;
  clicked_count?: number;
  completed_count?: number;
  scheduled_at?: string;
  sent_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewRequestTemplates {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  subject: string;
  body: string;
  platform_links?: Record<string, any>;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReviewRequests {
  id: string;
  owner_id: string;
  template_id?: string;
  contact_id?: string;
  client_id?: string;
  job_id?: string;
  recipient_email: string;
  recipient_name: string;
  status: string;
  sent_at?: string;
  opened_at?: string;
  clicked_at?: string;
  completed_at?: string;
  review_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  campaign_id?: string;
}

export interface ReviewResponseSuggestions {
  id: string;
  owner_id: string;
  review_id?: string;
  suggestion_type: string;
  content: string;
  sentiment_match?: string;
  rating_range_min?: number;
  rating_range_max?: number;
  is_used?: boolean;
  created_at: string;
}

export interface ReviewResponseTemplates {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  content: string;
  category?: string;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Reviews {
  id: string;
  owner_id: string;
  organization_id?: string;
  platform: string;
  external_review_id?: string;
  reviewer_name: string;
  reviewer_email?: string;
  reviewer_avatar_url?: string;
  rating: number;
  content?: string;
  review_date: string;
  response_content?: string;
  response_date?: string;
  responded_by?: string;
  status: string;
  sentiment?: string;
  is_verified?: boolean;
  contact_id?: string;
  client_id?: string;
  job_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface RfiAttachments {
  id: string;
  rfi_id: string;
  owner_id: string;
  file_path: string;
  file_name: string;
  file_type?: string;
  file_size?: number;
  created_at: string;
}

export interface RfiResponses {
  id: string;
  rfi_id: string;
  owner_id: string;
  responder_id: string;
  responder_type?: string;
  content: string;
  is_official_answer?: boolean;
  created_at: string;
}

export interface Rfis {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id?: string;
  client_id?: string;
  rfi_number: string;
  subject: string;
  question: string;
  answer?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  submitted_at?: string;
  submitted_by?: string;
  answered_at?: string;
  answered_by?: string;
  ball_in_court?: string;
  cost_impact?: number;
  schedule_impact_days?: number;
  model_id?: string;
  location_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface RolePermissions {
  id: string;
  role_id: string;
  permission: string;
  created_at: string;
}

export interface ScheduleGroups {
  id: string;
  schedule_id: string;
  owner_id: string;
  name: string;
  color?: string;
  parent_group_id?: string;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface ScheduleItems {
  id: string;
  schedule_id: string;
  owner_id: string;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  team_member_ids?: Record<string, any>;
  vendor_ids?: Record<string, any>;
  notify_assignees?: boolean;
  created_at: string;
  updated_at: string;
  group_id?: string;
  color?: string;
  depends_on_ids?: Record<string, any>;
  sort_order?: number;
}

export interface Schedules {
  id: string;
  owner_id: string;
  project_id?: string;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  job_id?: string;
}

export interface SelectionTemplateOptions {
  id: string;
  owner_id: string;
  template_id: string;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
  catalog_item_id?: string;
  is_base_option?: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface SelectionTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  selection_type: string;
  display_columns?: number;
  is_required?: boolean;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface SenderReputation {
  id: string;
  owner_id: string;
  score?: number;
  score_factors?: Record<string, any>;
  last_calculated_at?: string;
  trend?: string;
  recommendations?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface SocialAccounts {
  id: string;
  owner_id: string;
  organization_id?: string;
  platform: string;
  account_name: string;
  account_id?: string;
  profile_url?: string;
  avatar_url?: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  is_connected?: boolean;
  follower_count?: number;
  settings?: Record<string, any>;
  connected_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SocialContentCalendar {
  id: string;
  owner_id: string;
  title: string;
  description?: string;
  content_type?: string;
  platforms?: Record<string, any>;
  scheduled_date?: string;
  scheduled_time?: string;
  status?: string;
  assigned_to?: string;
  tags?: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SocialPostMetrics {
  id: string;
  owner_id: string;
  post_id: string;
  recorded_at: string;
  impressions?: number;
  reach?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  clicks?: number;
  video_views?: number;
  engagement_rate?: number;
  created_at: string;
}

export interface SocialPosts {
  id: string;
  content: string;
  platform: string;
  owner_id: string;
  organization_id?: string;
  account_id?: string;
  channel_connection_id?: string;
  status?: string;
  scheduled_at?: string;
  published_at?: string;
  platform_post_id?: string;
  page_id?: string;
  page_name?: string;
  link_url?: string;
  media_urls?: Record<string, any>;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

export interface Specifications {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id?: string;
  client_id?: string;
  category: string;
  title: string;
  description?: string;
  details?: Record<string, any>;
  attachments?: Record<string, any>;
  is_client_visible?: boolean;
  sort_order?: number;
  created_at: string;
  updated_at: string;
}

export interface SubmittalAttachments {
  id: string;
  submittal_id: string;
  owner_id: string;
  file_path: string;
  file_name: string;
  file_type?: string;
  file_size?: number;
  is_shop_drawing?: boolean;
  created_at: string;
}

export interface Submittals {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id?: string;
  client_id?: string;
  submittal_number: string;
  title: string;
  description?: string;
  spec_section?: string;
  status?: string;
  priority?: string;
  due_date?: string;
  submitted_at?: string;
  submitted_by?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  revision_number?: number;
  vendor_id?: string;
  model_id?: string;
  location_data?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface SupplierCatalogLinks {
  id: string;
  owner_id: string;
  catalog_item_id: string;
  supplier_name: string;
  supplier_sku?: string;
  supplier_url?: string;
  brand?: string;
  product_name?: string;
  specifications?: Record<string, any>;
  unit_cost: number;
  unit: string;
  in_stock?: boolean;
  last_scraped_at?: string;
  is_primary?: boolean;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierIntegrations {
  id: string;
  owner_id: string;
  organization_id?: string;
  supplier_name: string;
  account_number?: string;
  api_credentials?: Record<string, any>;
  is_active?: boolean;
  settings?: Record<string, any>;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierOrders {
  id: string;
  owner_id: string;
  organization_id?: string;
  integration_id?: string;
  purchase_order_id?: string;
  job_id?: string;
  supplier_order_number?: string;
  status?: string;
  items?: Record<string, any>;
  subtotal?: number;
  tax?: number;
  shipping?: number;
  total?: number;
  tracking_number?: string;
  estimated_delivery?: string;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TakeoffTemplateMappings {
  id: string;
  owner_id: string;
  element_type: string;
  element_subtype?: string;
  template_id?: string;
  template_name?: string;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskSequenceItems {
  id: string;
  sequence_id: string;
  owner_id: string;
  title: string;
  description?: string;
  days_offset?: number;
  priority?: string;
  assigned_role?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface TaskSequenceTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  category?: string;
  trigger_type?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  category?: string;
  default_priority?: string;
  default_due_days?: number;
  checklist_items?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Tasks {
  id: string;
  owner_id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  due_date?: string;
  completed_at?: string;
  assigned_to?: string;
  client_id?: string;
  job_id?: string;
  template_id?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamInvitations {
  id: string;
  organization_id: string;
  invited_by: string;
  email: string;
  name?: string;
  role?: string;
  is_billable?: boolean;
  invite_code?: string;
  status?: string;
  accepted_at?: string;
  expires_at?: string;
  created_at?: string;
  updated_at?: string;
  custom_role_id?: string;
}

export interface TeamMembers {
  id: string;
  owner_id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

export interface TieredSelectionTemplateOptions {
  id: string;
  owner_id: string;
  template_id: string;
  parent_id?: string;
  tier_level: number;
  name: string;
  description?: string;
  image_url?: string;
  price?: number;
  catalog_item_id?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface TieredSelectionTemplates {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  tier_labels: Record<string, any>;
  category?: string;
  show_prices?: boolean;
  columns?: number;
  created_at: string;
  updated_at: string;
}

export interface TimeEntries {
  id: string;
  owner_id: string;
  team_member_id?: string;
  vendor_id?: string;
  user_id?: string;
  clock_in: string;
  clock_out?: string;
  break_minutes?: number;
  job_id?: string;
  job_line_item_id?: string;
  hourly_rate?: number;
  total_hours?: number;
  total_cost?: number;
  notes?: string;
  status?: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TriggerLinkClicks {
  id: string;
  trigger_link_id: string;
  owner_id: string;
  contact_id?: string;
  clicked_at?: string;
  visitor_id?: string;
  ip_address?: string;
  user_agent?: string;
  referrer_url?: string;
  browser?: string;
  os?: string;
  device_type?: string;
  country?: string;
  region?: string;
  city?: string;
  created_at: string;
}

export interface TriggerLinks {
  id: string;
  name: string;
  slug: string;
  destination_url: string;
  owner_id: string;
  organization_id?: string;
  description?: string;
  trigger_workflow_id?: string;
  is_active?: boolean;
  click_count?: number;
  unique_click_count?: number;
  last_clicked_at?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at: string;
  updated_at: string;
}

export interface Units {
  id: string;
  owner_id: string;
  name: string;
  abbreviation: string;
  created_at: string;
  updated_at: string;
}

export interface UserDrafts {
  id: string;
  user_id: string;
  draft_key: string;
  draft_data: Record<string, any>;
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

export interface UserRoles {
  id: string;
  user_id: string;
  role: string;
}

export interface UtmPresets {
  id: string;
  owner_id: string;
  name: string;
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface UxAuditFindings {
  id: string;
  run_id: string;
  severity: string;
  category: string;
  title: string;
  description: string;
  element_selector?: string;
  element_html?: string;
  current_value?: string;
  expected_value?: string;
  wcag_criterion?: string;
  screenshot_region?: Record<string, any>;
  fix_suggestion?: Record<string, any>;
  status: string;
  fixed_by?: string;
  dismissed_reason?: string;
  created_at?: string;
  updated_at?: string;
  scope: string;
}

export interface UxAuditRuns {
  id: string;
  triggered_by: string;
  audit_type: string;
  target_route: string;
  target_viewport?: string;
  status: string;
  summary?: string;
  findings_count?: number;
  critical_count?: number;
  auto_fix_count?: number;
  page_snapshot?: Record<string, any>;
  screenshot_url?: string;
  duration_ms?: number;
  ai_model?: string;
  ai_tokens_used?: number;
  error_message?: string;
  created_at?: string;
  completed_at?: string;
}

export interface VendorCatalogPrices {
  id: string;
  owner_id: string;
  vendor_id: string;
  catalog_item_id?: string;
  price_request_id?: string;
  linked_vendor_catalog_id?: string;
  unit_cost: number;
  custom_item_name?: string;
  custom_item_description?: string;
  custom_item_unit?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface VendorCatalogPricing {
  id: string;
  owner_id: string;
  catalog_item_id: string;
  vendor_id: string;
  unit_cost: number;
  last_updated?: string;
  source_request_id?: string;
  notes?: string;
  created_at?: string;
}

export interface VendorInvitations {
  id: string;
  organization_id: string;
  vendor_id: string;
  invited_by: string;
  status?: string;
  created_at?: string;
}

export interface VendorPriceListItems {
  id: string;
  request_id: string;
  catalog_item_id?: string;
  item_name: string;
  item_description?: string;
  unit?: string;
  quantity_hint?: number;
  vendor_unit_cost?: number;
  vendor_notes?: string;
  linked_vendor_catalog_item_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VendorPriceListRequests {
  id: string;
  owner_id: string;
  vendor_id: string;
  vendor_user_id?: string;
  status?: string;
  notes?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VendorPriceRequests {
  id: string;
  name: string;
  owner_id: string;
  vendor_id: string;
  description?: string;
  requested_items?: Record<string, any>;
  status?: string;
  submitted_at?: string;
  accepted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface VendorUsers {
  id: string;
  vendor_id: string;
  user_id?: string;
  email: string;
  invited_at: string;
  accepted_at?: string;
  created_at: string;
}

export interface Vendors {
  id: string;
  owner_id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  specialty?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  hourly_rate?: number;
  trade?: string;
  trades?: Record<string, any>;
}

export interface Warranties {
  id: string;
  owner_id: string;
  organization_id?: string;
  job_id: string;
  client_id?: string;
  warranty_type: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  coverage_details?: string;
  terms?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export interface WarrantyClaims {
  id: string;
  warranty_id: string;
  owner_id: string;
  claim_number: string;
  reported_date: string;
  issue_description: string;
  status: string;
  resolution?: string;
  resolved_date?: string;
  cost_to_repair?: number;
  photos?: Record<string, any>;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderItems {
  id: string;
  work_order_id: string;
  owner_id: string;
  description: string;
  quantity: number;
  unit?: string;
  unit_cost: number;
  total: number;
  cost_code?: string;
  catalog_item_id?: string;
  sort_order?: number;
  created_at: string;
}

export interface WorkOrders {
  id: string;
  wo_number: string;
  owner_id: string;
  organization_id?: string;
  vendor_id?: string;
  job_id?: string;
  client_id?: string;
  status: string;
  scope_of_work?: string;
  start_date?: string;
  end_date?: string;
  subtotal?: number;
  total?: number;
  notes?: string;
  vendor_notes?: string;
  accepted_at?: string;
  completed_at?: string;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkflowActions {
  id: string;
  workflow_id: string;
  owner_id: string;
  action_type: string;
  action_config: Record<string, any>;
  position_x?: number;
  position_y?: number;
  display_order?: number;
  parent_action_id?: string;
  condition_branch?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkflowConnections {
  id: string;
  workflow_id: string;
  owner_id: string;
  source_action_id: string;
  target_action_id: string;
  connection_type?: string;
  created_at: string;
}

export interface WorkflowRunActions {
  id: string;
  run_id: string;
  action_id: string;
  owner_id: string;
  status?: string;
  input_data?: Record<string, any>;
  output_data?: Record<string, any>;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export interface WorkflowRuns {
  id: string;
  workflow_id: string;
  owner_id: string;
  trigger_data?: Record<string, any>;
  status?: string;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  created_at: string;
}

export interface Workflows {
  id: string;
  owner_id: string;
  name: string;
  description?: string;
  trigger_type: string;
  trigger_conditions?: Record<string, any>;
  status?: string;
  is_template?: boolean;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface XeroConnections {
  id: string;
  owner_id: string;
  organization_id?: string;
  tenant_id: string;
  tenant_name?: string;
  access_token: string;
  refresh_token: string;
  token_expires_at: string;
  is_active?: boolean;
  sync_settings?: Record<string, any>;
  last_sync_at?: string;
  created_at: string;
  updated_at: string;
}

export interface XeroSyncLog {
  id: string;
  connection_id: string;
  owner_id: string;
  entity_type: string;
  local_id: string;
  xero_id?: string;
  sync_direction: string;
  status: string;
  error_message?: string;
  synced_at: string;
}

export interface ZapierWebhooks {
  id: string;
  owner_id: string;
  organization_id?: string;
  name: string;
  webhook_url: string;
  trigger_event: string;
  is_active?: boolean;
  last_triggered_at?: string;
  trigger_count?: number;
  created_at: string;
  updated_at: string;
}

// ══════════════════════════════════════════════════════════════
// POOL-SPECIFIC TYPES — BOM Engine, Formulas, Takeoff
// ══════════════════════════════════════════════════════════════

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

// ══════════════════════════════════════════════════════════════
// LEGACY POOL TYPES (kept for page compatibility)
// ══════════════════════════════════════════════════════════════

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type EstimateStatus = "draft" | "sent" | "approved" | "rejected" | "converted";
export type ItemCategory = "materials" | "labor" | "equipment" | "overhead" | "other";
export type VendorCategory = "SUPPLIER" | "SUBCONTRACTOR";
export type FixedVar = "FIXED" | "VARIABLE";
export type CostType = "Materials" | "Labor" | "Subcontractor" | "Equipment" | "Expense" | "Overhead" | "Deposits" | "Other";

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

// ══════════════════════════════════════════════════════════════
// SUPABASE DATABASE TYPE — used as generic param for createClient
// ══════════════════════════════════════════════════════════════
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = Record<string, any>;
