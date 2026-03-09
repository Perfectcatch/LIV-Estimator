# MASTER WINDSURF PROMPT — LIV POOLS CRM
## Full Platform Build — Crucible-X Feature Parity

You have TWO source documents to read BEFORE writing any code:

1. **`/docs/` folder** (10 files) — LIV Pools pool construction estimator spec with 4-tier catalog, BOM engine, formula library, and seed data
2. **`CRUCIBLE_X_MASTER.md`** (in repo root) — Complete reverse-engineered spec of Crucible-X, a production construction SaaS with 251 tables, 24+ pages, AI features, client portal, and full financial suite

**BUILD GOAL:** Replicate every page and feature from Crucible-X, customized for LIV Pools' pool construction business, using our pool-specific catalog/BOM/estimating system from /docs.

**ARCHITECTURE:** Supabase-native (NO Prisma). Next.js 14 App Router. Supabase JS for all data access. JSONB for nested data. Supabase Auth + RLS.

---

## PHASE 1: Project Foundation

Clean the repo (keep /docs and CRUCIBLE_X_MASTER.md), then:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Install all deps:
```bash
npm install @supabase/supabase-js @supabase/ssr @tanstack/react-query zustand zod date-fns lucide-react class-variance-authority clsx tailwind-merge recharts @react-pdf/renderer
```

Remove any Prisma artifacts:
```bash
rm -rf prisma/ prisma.config.ts
npm uninstall prisma @prisma/client @prisma/adapter-pg 2>/dev/null
```

---

## PHASE 2: Supabase Clients

Create these exactly:

- `src/lib/supabase/server.ts` — Server component client using `@supabase/ssr` + `cookies()`
- `src/lib/supabase/client.ts` — Browser client using `createBrowserClient`
- `src/lib/supabase/admin.ts` — Service role client for server-only operations
- `src/lib/supabase/middleware.ts` — Auth middleware for protected routes

Environment vars are auto-set by Vercel Marketplace Supabase integration:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

---

## PHASE 3: Database Schema

Create `supabase/migrations/001_full_schema.sql` with ALL tables. Merge BOTH sources:

### From CRUCIBLE_X_MASTER.md — build EVERY table listed in their database schema section (251 tables). Use their exact column definitions. Key table groups:

**Auth & Users:** profiles, organizations, organization_members, organization_roles, user_roles, team_members, team_invitations, role_permissions, invite_codes

**CRM & Contacts:** clients, contacts, contact_tags, contact_tag_assignments, contact_lists, contact_list_members, contact_segments, contact_activities, contact_scoring_rules, contact_custom_field_definitions, contact_custom_field_values, client_intake_submissions, client_portal_tokens

**Sales Pipeline:** opportunities, opportunity_stages, crm_pipelines, crm_pipeline_stages, crm_deals, crm_deal_activities, lead_attribution, lead_forms, lead_form_submissions

**Estimating & Catalog:** client_estimates (with JSONB line_items, parameters, selections, payment_schedule), catalog_items (with supplier price sync fields), estimate_templates, estimate_style_settings, estimate_views, line_item_templates, cost_codes, units, pricing_data_points, selection_templates, selection_template_options, tiered_selection_templates, tiered_selection_template_options

**Proposals:** proposals, proposal_pages, proposal_selections, proposal_selection_options, proposal_client_selections, proposal_templates, proposal_documents

**Jobs & Projects:** jobs, job_line_items, projects, tasks, task_templates, task_sequence_templates, task_sequence_items, schedules, schedule_items, schedule_groups, daily_logs, daily_log_photos, specifications, time_entries

**BIM & 3D:** bim_models, bim_elements, bim_clashes, bim_markups, rfis, rfi_responses, rfi_attachments, submittals, submittal_attachments, punch_lists, punch_list_items, floor_plans, floor_plan_versions, floor_plan_comments, floor_plan_scans, floor_plan_xrefs, lidar_room_scans, exterior_scans

**Contracts & Documents:** contracts, contract_templates, contract_signers, contract_fields, contract_audit_log, documents, document_templates

**Finance:** invoices, expenses, purchase_orders, purchase_order_items, change_orders, change_order_items, lien_waivers, retainage, financial_buckets, financial_allocations, financial_ai_suggestions, financial_bills

**Vendors:** vendors, vendor_users, vendor_invitations, vendor_catalog_prices, vendor_catalog_pricing, vendor_price_requests, vendor_price_list_requests, vendor_price_list_items, bid_packages, bid_package_items, bid_package_vendors, bid_vendor_prices, bid_requests, work_orders, work_order_items

**Workflows & Automation:** workflows, workflow_runs

**Communication:** notifications, messages, activity_logs

**Dashboard & Analytics:** dashboard_tiles, dashboard_layouts, custom_analytics_tiles, analytics_tile_templates, custom_workspaces

**Community & Beta:** community_posts, bug_reports, feature_requests, beta_status

**Warranties:** warranties, warranty_claims

**Courses:** courses, course_modules, course_lessons, course_enrollments, lesson_progress

**Contractor Directory:** contractor_profiles, contractor_service_areas, contractor_reviews, contractor_work_requests

**Settings:** app_settings, intake_form_settings, job_statuses, user_drafts

### From /docs — ADD our pool-specific tables that Crucible-X doesn't have:

**LIV Pool Catalog Hierarchy:**
- `skus` (428 pool construction items — plumbing, equipment, structural, interior, kitchen)
- `kits` (30 vendor-grouped SKU bundles)
- `kit_skus` (junction)
- `assemblies` (13 customer-facing groups)
- `assembly_kits` (junction)
- `super_assemblies` (3 proposal sections — Base Pool, Equipment, Finishes)
- `super_assembly_assemblies` (junction)
- `formulas` (21 pool takeoff formulas)
- `budget_lines` (27 cost code budget tracking per estimate)
- `job_stages` (construction stage progress per estimate)

Add `owner_id UUID REFERENCES auth.users(id)` to every table. Enable RLS on every table with `"Users see own data"` policy.

---

## PHASE 4: Every Single Page

Build EVERY route from Crucible-X section 7 "ROUTES MAP" + our pool-specific pages. Each page must be a fully functional component matching the Crucible-X spec.

### GLOBAL SHELL (layout.tsx)
- **Top Nav Bar:** Logo, Workspace Switcher, Dashboard, Scheduling, Budgets, Financials, Analytics, Search (⌘K DAEMON command palette), Quick Add (+), Notifications, User Avatar
- **Left Sidebar** with 4 collapsible sections matching Crucible-X section "Left Sidebar (4 Sections)"
- **Dark theme** — background #1a1a2e, brand color matches LIV Pools
- **Command Palette** (⌘K) — search entities, navigate, create new items

### CORE SECTION

**`/` — Dashboard (Overview)**
Read Crucible-X section 1.1. Build:
- Job filter dropdown
- 4 KPI cards (Pipeline Value, Active Jobs, Customers, Open Invoices)
- Budget Summary with progress bar
- Schedule Status indicator
- Recent Activity feed
- Scheduled Tasks with calendar nav
- Budget vs Spent chart (recharts)
- Cash Flow chart
- Labor Hours summary
- Action Items list
- Active Jobs list

**`/clients` — Customer Management**
Read section 1.2. Build client cards with avatar, contact info, status badge, "View as Client" button. Add Client dialog. Search. 4 KPI cards.

**`/jobs` — Jobs**
Read section 1.3. Job list with status, revenue, cost. Create from estimate conversion. 4 KPI cards.

**`/agent` — OVERMIND (AI Intelligence)**
Read section 1.4. Build the AI chat interface with capability cards (Analysis, Intelligence, Warnings, Connections), quick prompt buttons, current context display, chat input.

### WORK SECTION

**`/estimates` — Estimates**
Read section 2.1 + the detailed Estimates API spec (sections 3-7 of CRUCIBLE_X_MASTER.md). Build:
- Estimate list with KPI cards (Drafts/Sent/Approved/Pipeline)
- Tab filters (All/Drafts/Sent/Approved)
- **Estimate Detail Page** (`/estimates/[id]`) with:
  - Top bar: name, description, status dropdown, Review/Presentation/Save buttons
  - 4 tabs: Scope, Budget, Assembly, Allowances + Selections
  - Scope tab toolbar: Spreadsheet, ACCEL, Stream, BLACKLEDGER, Summary, Load Template
  - Line item table with all columns from section 3.5
  - Add Group/Selection/Item buttons
  - Financial summary panel (Total Cost, Subtotal, Tax, Profit, Margin, Grand Total)
  - **INTEGRATE our pool-specific BOM engine** — when creating pool estimates, auto-populate from the 4-tier SKU→Kit→Assembly→SuperAssembly hierarchy using the formula library from docs/05-BOM-ENGINE.md
  - Selections panel with our 8 pool categories from docs/04-ESTIMATE-WORKFLOW.md
  - Share token generation for client portal

**`/tasks` — Tasks**
Read section 2.2. Tasks + Templates tabs. Add Task button, task list, template management.

**`/schedules` — Schedules**
Read section 2.3. Schedule list, calendar/timeline view per schedule.

**`/bim` — BIM (Building Information Modeling)**
Read section 2.4. Build ALL 5 tabs: 3D Models, Clashes, RFIs, Submittals, Punch Lists. Three.js viewer for 3D models.

**`/daily-logs` — Daily Logs**
Read section 2.5. Log list, photo upload, Draft→Submitted workflow, client notification.

**`/specifications` — Spec Sheets**
Read section 2.6. Spec list with job and category filters.

**`/time` — Time Tracking**
Read section 2.7. Build:
- 4 KPI cards (Active Clocks, Hours This Week, Labor Cost, Total Entries)
- Time Clock Widget (Who, Job, Rate, Notes, Clock In)
- Tab filters (All/Active/Pending Approval/Approved)
- Manual entry button

### FINANCE SECTION

**`/expenses` — Expenses**
Read section 3.1. Expense tracking with 4 KPIs, searchable list.

**`/cashflow` — Cash Flow Calendar**
Read section 3.2. Full month calendar with color-coded days (green inflow, red outflow, orange overdue). Day detail panel. Upcoming events tabs.

**`/planner` — Financial Planner**
Read section 3.3. Budget buckets (Overhead, Materials, Equipment, Payroll, Insurance, Taxes, Marketing). AI allocation. Priority setting.

**`/analytics` — Reports / Analytics**
Read section 3.4. SF Cost Analytics with KPIs (Pipeline Value, Close Rate, Avg Cost/SF, YTD Volume). Tabs: Area Group Averages, Project Breakdown, Line Item Averages, By Group Type, Embeddable Tiles.

**`/lien-waivers` — Lien Waivers**
Read section 3.5. Dashboard + Waivers + Timeline + Settings tabs. Compliance tracking with KPIs.

### SYSTEM SECTION

**`/catalog` — Catalog**
Read section 4.1. Build ALL tabs: Catalog Items, Suppliers, Estimates, Presentations, Selections, Multi-Tier, Line Items, Cost Codes, FORGE-X.
- Catalog Items: category tabs (Materials/Labor/Equipment/Overhead/Other), import button, add item, full table
- **FORGE-X tab:** supplier search (Home Depot, Lowe's, Menards, Ferguson), auto-price updates, multi-supplier linking
- **INTEGRATE our pool-specific 4-tier catalog** — SKU Master, Kit Master, Assembly Master, Super-Assembly Master from docs/03-CATALOG-SYSTEM.md as additional catalog views

**`/files` — File Management**
Read section 4.2. Organization + Customer tabs. Folder structure. Drag-and-drop upload.

**`/contracts` — Contracts & E-Signatures**
Read section 4.3. Contracts + Templates tabs. Contract list, template system, e-signature with contract_signers.

**`/team` — Team Management**
Read section 4.4. 4 tabs: Team Members, Vendors, Price Lists, Roles. Invite member button, member cards, role management.

**`/directory` — Find Contractors**
Read section 4.5. My Profile tab, search by trade/city/state/available today, contractor cards.

**`/workflows` — Workflow Automation**
Read section 4.6. 5 tabs: AI Builder, Automations, Task Sequences, Approvals, Run History. Natural language workflow creation.

**`/community` — Community Forum**
Read section 4.7. New Post button, category tabs (All/Tips/Showcase/Help/Discussion/Announcements), post cards with markdown.

**`/settings` — Settings**
Read section 4.8. Tabs: Overview, Documents, Integrations, Job Statuses, Document Templates, Estimates. Company info, branding.

### ADDITIONAL PAGES (from Crucible-X special features)

**`/invoices` — Invoicing** (section 5.8)
**`/purchase-orders` — Purchase Orders** (section 5.6)
**`/change-orders` — Change Orders** (section 5.7)
**`/opportunities` — Sales Pipeline** (section 5.9)
**`/messages` — Internal Messaging** (section 5.10)

### POOL-SPECIFIC PAGES (from /docs, not in Crucible-X)

**`/estimates/[id]/takeoff` — Pool Takeoff Calculator**
Dimensions input → formula-driven quantities from docs/05-BOM-ENGINE.md

**`/estimates/[id]/bom` — BOM Engine View**
Tree view (SA→Assembly→Kit→SKU) + flat view + stage summary + vendor summary from docs/05-BOM-ENGINE.md

**`/estimates/[id]/pricing` — Pricing Hub**
Division multipliers, volume discounts, markup/margin controls from docs/04-ESTIMATE-WORKFLOW.md

### CLIENT PORTAL (public routes, no auth required)

**`/portal/[token]` — Client Portal**
Read section 5.4. Client-facing view accessed via share token. Shows estimate/proposal, approval button, e-signature capture.

**`/portal/[token]/proposal` — Client Proposal View**
Public proposal with payment schedule, exclusions, signature block.

---

## PHASE 5: Core Library Files

- `src/lib/utils.ts` — cn(), formatCurrency(), generateProposalNumber(), generateShareToken()
- `src/lib/constants.ts` — All constants from docs + Crucible-X enums
- `src/lib/formulas.ts` — Full calculateTakeoff() from docs/05-BOM-ENGINE.md
- `src/lib/bom-engine.ts` — BOM explosion algorithm from docs/05-BOM-ENGINE.md

---

## PHASE 6: TypeScript Types

Create `src/types/database.ts` — Generate TypeScript interfaces for EVERY table from the SQL schema. Use the exact column definitions from CRUCIBLE_X_MASTER.md.

---

## PHASE 7: Seed Data

Create seed endpoint at `src/app/api/seed/route.ts` (dev only). Seed:
- All LIV Pools reference data from docs/08-SEED-DATA.md (vendors, cost codes, formulas, SKUs, kits, assemblies, super-assemblies with all junction records)
- Default app settings, default opportunity stages, default job statuses

---

## PHASE 8: Verify + Stage

1. `npm run build` — must compile clean
2. `npm run dev` — must start with all routes accessible
3. `git add -A && git status` — show me before pushing

---

## RULES
- **NO PRISMA** — Supabase JS only
- **Read BOTH docs** — CRUCIBLE_X_MASTER.md for every page spec + /docs for pool-specific data
- **Every page from Crucible-X must exist** with real components, not just placeholders
- **Dark theme** throughout — #1a1a2e background, matching Crucible-X "forge" aesthetic
- **JSONB for nested data** — line items, selections, parameters, PO lines, change order lines
- **RLS on every table** — owner_id = auth.uid()
- **shadcn/ui + Tailwind + lucide-react** for all UI
- **recharts** for all charts (Budget vs Spent, Cash Flow, Analytics)
