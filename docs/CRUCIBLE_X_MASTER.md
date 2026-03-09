# Crucible-X — Complete System Directory
## Every Page, Feature, and Function
### Captured: March 8, 2026 | Version: v2.0.26.217

---

## TECH STACK
- **Frontend:** React + Vite (SPA)
- **Backend:** Supabase (PostgreSQL + Auth + Storage + REST)
- **Hosting:** Vercel (app.crucible-x.com) + Cloudflare (crucible-x.com)
- **3D Engine:** Three.js (BIM module)
- **Charts:** Dedicated chart library
- **PDF:** PDF generation/viewing library
- **Data Fetching:** TanStack Query (React Query)
- **PWA:** Yes (workbox service worker, installable)
- **Theme:** Dark mode ("forge"), brand color #1a1a2e

---

## GLOBAL SHELL

### Top Navigation Bar
- **Logo/Home** → Dashboard
- **Workspace Switcher** → "Production" (multi-workspace support)
- **Dashboard** → Overview dashboard
- **Scheduling** → Schedules page
- **Budgets** → Jobs page (budget tracking)
- **Financials** → Expenses/Invoices
- **Analytics** → SF Cost Analytics
- **Search (⌘K)** → "DAEMON" command hub — natural language AI commands
  - Create entities by typing (e.g., "create estimate for kitchen remodel")
  - Navigate anywhere
  - Ask questions about data
  - Trigger workflows
- **Help & Support** → Help system
- **BugZapper 9000** → Bug reporting (gamified beta testing)
- **Quick Add (+)** → Create new entities
- **Refresh** → Refresh data
- **Notifications** → Notification center
- **More Navigation** → Overflow menu
- **User Avatar** → Profile/account menu

### Left Sidebar (4 Sections)

---

## 1. CORE SECTION

### 1.1 Overview (Dashboard)
**Route:** `/`
**Purpose:** Central command center with KPI overview

**Components:**
- **Job Filter Dropdown** — Filter by specific job or "All Jobs Overview"
- **Customize Button** — Customize dashboard layout
- **KPI Cards (4):**
  - Pipeline Value ($X, +X% trend)
  - Active Jobs (count, revenue)
  - Customers (count)
  - Open Invoices ($X, pending count)
- **Budget Summary** — Total budget, spent amount, progress bar, percentage
- **Schedule Status** — On track indicator, active jobs, tasks count, completed/active today
- **Recent Activity** — Activity feed
- **Scheduled Tasks** — Calendar navigation (prev/next/today), task count
- **Next Task** — Next upcoming task preview
- **Budget vs Spent** — Visual comparison chart
- **Cash Flow** — Cash flow chart with Received/Spent legend
- **Labor Hours** — Time tracking summary
- **Beta Tester Status** — Gamified bug hunting:
  - Rank (Rookie → Insect Repellent → ...)
  - Bugs Zapped count
  - Monthly Savings from bug rewards
  - Progress bar to next rank
  - Lifetime Membership offer ($20,000 one-time vs $400/mo subscription)
  - Bug reward: $50 per approved bug, $0.50/mo subscription discount
  - Credit guarantee for early purchasers
- **Custom Analytics** — AI-built custom dashboard tiles
- **Action Items** — To-do list with "View All"
- **Active Jobs** — Active jobs list with "View All"

**DB Tables:** jobs, clients, invoices, expenses, schedules, schedule_items, tasks, time_entries, activity_logs, dashboard_tiles, dashboard_layouts, custom_analytics_tiles, analytics_tile_templates, beta_status, bug_reports, lifetime_membership_slots, lifetime_purchases

---

### 1.2 Customers (Client Management)
**Route:** `/clients`
**Purpose:** CRM — manage customer relationships

**Components:**
- **Add Client** button
- **KPI Cards (4):**
  - Total Job Value ($)
  - Projects (count)
  - Total Clients (count)
  - Avg. Job Value ($)
- **Search** — Search clients
- **Client Cards** — Each shows:
  - Avatar/initials
  - Name
  - Type (Residential/Commercial)
  - Email, Phone
  - Address
  - Status badge (active/inactive)
  - "View as Client" button (client portal preview)

**DB Tables:** clients (id, owner_id, name, email, phone, company, title, address, notes, created_at, updated_at)

---

### 1.3 Jobs
**Route:** `/jobs`
**Purpose:** Project/job tracking with full lifecycle

**Components:**
- **New Job** button
- **KPI Cards (4):**
  - Active Jobs (count)
  - Completed (count)
  - Total Revenue ($)
  - Total Cost ($)
- **Search** — Search jobs
- **Job List** — Table/cards with job details
- **Create from Estimate** — Convert approved estimates to jobs

**DB Tables:** jobs (id, owner_id, project_id, client_id, name, description, status, start_date, target_end_date, actual_end_date, estimated_revenue, actual_revenue, estimated_cost, actual_cost, created_at, updated_at)

---

### 1.4 OVERMIND (AI Intelligence)
**Route:** `/agent`
**Purpose:** AI-powered organizational intelligence

**Components:**
- **Capability Cards (4):**
  - Analysis — Contracts, specs, documents
  - Intelligence — Patterns, risk, scope creep
  - Warnings — Pricing drift, failures
  - Connections — Cross-reference detection
- **Tagline:** "OVERMIND reads everything."
- **Description:** Analyzes contracts, change orders, emails, specifications. Connects patterns no human had time to notice.
- **Quick Prompts:**
  - "Scan my contracts for scope creep risks"
  - "What patterns do you see in my active jobs?"
  - "Where am I losing money that I haven't noticed?"
  - "Identify pricing drift in my recent estimates"
  - "Surface any repeating failures across projects"
- **Current Context** — Shows: Active Jobs, Pending Tasks, Clients, Estimates counts
- **Chat Input** — "Ask me anything about your projects, estimates, or tasks..."
- **Footer:** "OVERMIND does not give opinions. It gives warnings."

**DB Tables:** All tables (cross-references everything)

---

## 2. WORK SECTION

### 2.1 Estimates
**Route:** `/estimates`
**Purpose:** Construction estimating with catalog integration

**Components:**
- **New Estimate** button
- **KPI Cards (4):**
  - Drafts (count, click to filter)
  - Sent (count, click to filter)
  - Approved (count, click to filter)
  - Pipeline ($, view all)
- **Search** — Search estimates or clients
- **Tab Filters:** All | Drafts | Sent | Approved
- **Estimate Table:**
  - Columns: Estimate name, Client, Status, Total, Created date
- **Estimate Detail** (when opened):
  - Line items from catalog
  - Markup/margin calculations
  - Quantity formulas, cost code assignment
  - Group items into sections
  - Area groups for SF tracking
  - Convert to proposal/job
  - Share via token link

**DB Tables:** client_estimates (id, owner_id, client_id, project_id, name, description, status, subtotal, markup_total, total, client_approved_at, converted_to_job_at, job_id, share_token, created_at, updated_at), catalog_items

---

### 2.2 Tasks
**Route:** `/tasks`
**Purpose:** Task management with templates

**Tabs:** Tasks | Templates

**Components:**
- **Add Task** button
- **Task Count** with "All" filter
- **Task List** — Standard task management
- **Templates Tab** — Reusable task templates

**DB Tables:** tasks (*)

---

### 2.3 Schedule
**Route:** `/schedules`
**Purpose:** Project scheduling / Gantt-style planning

**Components:**
- **New Schedule** button
- **Schedule List** — Multiple schedules per project
- **Calendar/Timeline View** (within each schedule)

**DB Tables:** schedules (*), schedule_items (id, schedule_id, owner_id, title, start_date, end_date, status, color, created_at)

---

### 2.4 BIM (Building Information Modeling)
**Route:** `/bim`
**Purpose:** 3D model viewing, clash detection, RFIs, submittals, punch lists

**Tabs:** 3D Models | Clashes | RFIs | Submittals | Punch Lists

**3D Models Tab:**
- Upload IFC, Revit, Navisworks, or glTF files
- Category filter
- KPI: Total Models, Revit Models, IFC Models, Total Size
- 3D visualization with Three.js
- Multi-story support

**Clashes Tab:** Clash detection between models
**RFIs Tab:** Request for Information tracking
**Submittals Tab:** Submittal management
**Punch Lists Tab:** Punch list items

**DB Tables:** Multiple BIM-related tables (models, clashes, rfis, submittals, punch_items)

---

### 2.5 Daily Logs
**Route:** `/daily-logs`
**Purpose:** Field reporting with photos

**Components:**
- **New Log** button
- **Log List** — Draft → Submitted workflow
- **Photo Upload** — Attach progress photos
- **Client Notification** — Submit to notify clients

**DB Tables:** daily_logs (*)

---

### 2.6 Spec Sheets
**Route:** `/specifications`
**Purpose:** Technical specifications by trade/category

**Components:**
- **Add Spec** button
- **Job Filter** — Filter by job
- **Category Filter** — Filter by category
- **Spec List** — Searchable spec management

**DB Tables:** specifications or similar

---

### 2.7 Time Tracking
**Route:** `/time`
**Purpose:** Clock in/out, labor cost tracking

**Components:**
- **Add Manual Entry** button
- **KPI Cards (4):**
  - Active Clocks (count)
  - Hours This Week (decimal)
  - Labor Cost This Week ($)
  - Total Entries (count)
- **Time Clock Widget:**
  - Who: Myself / Team member
  - Job (optional)
  - Hourly Rate (optional)
  - Notes (optional)
  - Clock In button
- **Tab Filters:** All Entries | Active | Pending Approval | Approved

**DB Tables:** time_entries (*, job→jobs, job_line_item→job_line_items, vendor→vendors)

---

## 3. FINANCE SECTION

### 3.1 Expenses
**Route:** `/expenses`
**Purpose:** Project expense tracking

**Components:**
- **Add Expense** button
- **KPI Cards (4):**
  - Total Expenses ($, count)
  - Pending ($)
  - Approved ($)
  - This Month ($)
- **Expense List** — Searchable, filterable

**DB Tables:** expenses (*)

---

### 3.2 Cash Flow
**Route:** `/cashflow`
**Purpose:** Financial calendar with invoices, expenses, forecasts

**Components:**
- **KPI Cards (4):**
  - Expected Inflow ($, % trend)
  - Expected Outflow ($, % trend)
  - Net Cash Flow ($, positive/negative indicator)
  - Pending Invoices ($, count)
- **Calendar View** — Full month calendar with color-coded days:
  - Green = Inflow
  - Red = Outflow
  - Orange = Overdue
- **Day Detail Panel** — Click a day to see transactions
- **Upcoming Events** — Tabs: All | Invoices | Expenses | Forecasts

**DB Tables:** invoices, expenses, jobs (financial data)

---

### 3.3 Planner (Financial Planner)
**Route:** `/planner`
**Purpose:** Budget bucket allocation with AI

**Components:**
- **Welcome Setup** — Create default buckets
- **Default Buckets:** Overhead, Materials, Equipment, Payroll, Insurance, Taxes, Marketing
- **AI Allocation** — AI helps allocate income to buckets
- **Priority Setting** — Set budget priorities

**DB Tables:** planner-related tables

---

### 3.4 Reports / Analytics
**Route:** `/analytics`
**Purpose:** SF cost analytics, project performance

**Components:**
- **KPI Cards (4):**
  - Pipeline Value ($, % trend)
  - Close Rate (%, approved/total)
  - Avg Cost/SF ($)
  - YTD Volume ($, count)
- **Time Filter** — All Time selector
- **Best Practices Guide** — How to use area groups for accurate SF tracking
- **Stats:** Projects with Area Groups, Total SF Tracked, Avg Cost/SF, Unique Area Types
- **Tabs:**
  - Area Group Averages
  - Project Breakdown
  - Line Item Averages
  - By Group Type
  - Embeddable Tiles
- **Area Group Charts** — Historical cost/SF by area type

**DB Tables:** client_estimates, jobs, catalog_items (aggregated)

---

### 3.5 Lien Waivers
**Route:** `/lien-waivers`
**Purpose:** Lien waiver compliance tracking

**Tabs:** Dashboard | Waivers | Timeline | Settings

**Dashboard:**
- **KPI Cards (4):**
  - Pending (count)
  - Overdue (count)
  - Completed this month (count)
  - Compliance (%)
- **Compliance by Job** — Job filter, compliance breakdown

**DB Tables:** lien_waivers or similar

---

## 4. SYSTEM SECTION

### 4.1 Catalog
**Route:** `/catalog`
**Purpose:** Material/labor pricing database with supplier integration

**Tabs:** Catalog Items | Suppliers | Estimates | Presentations | Selections | Multi-Tier | Line Items | Cost Codes | FORGE-X

**Catalog Items Tab:**
- **Category Tabs:** Materials | Labor | Equipment | Overhead | Other
- **Import JobTread** — Import from JobTread
- **Add Item** button
- **Table Columns:** Name, Subcategory, Cost, Unit, Margin %, Price, Cost Code, Allowance

**FORGE-X (Catalog Synthesis Core):**
- **Purpose:** "Builds structure from disorder — assembles catalogs from fragments"
- **Supplier Search:** Home Depot 🏠, Lowe's 🔵, Menards 🟢, Ferguson/Build.com 🔧
- **Auto-Price Updates** — Products with supplier links auto-update pricing
- **Multi-Supplier Linking** — Compare prices across suppliers

**DB Tables:** catalog_items (id, owner_id, name, description, category, subcategory, unit, unit_cost, markup_percentage, unit_cost_formula, quantity_formula, cost_code, image_url, linked_estimate_template_id, is_active, is_allowance, allowance_display_mode, created_at, updated_at)

---

### 4.2 Files
**Route:** `/files`
**Purpose:** File management with drag-and-drop

**Components:**
- **Tabs:** Organization | Customer
- **New Folder** button
- **Upload** button
- **Drag-and-drop** file upload
- **File Browser** — Folder structure

**DB Tables:** Supabase Storage buckets

---

### 4.3 Contracts
**Route:** `/contracts`
**Purpose:** Contract generation with e-signatures

**Tabs:** Contracts | Templates

**Components:**
- **New Contract** button
- **Contract List** — Status tracking
- **Template System** — Create from templates or scratch
- **E-Signature** — Digital signing (contract_signers table)

**DB Tables:** contracts (*, clients(name,email), contract_signers(*)), contract_templates (*)

---

### 4.4 Team
**Route:** `/team`
**Purpose:** Organization member management

**Tabs:** Team Members | Vendors | Price Lists | Roles

**Team Members:**
- **Invite Team Member** button
- **Member Cards:** Name, role (owner/admin/member), email, phone

**Vendors:**
- Vendor management (subcontractors, suppliers)

**Price Lists:**
- Vendor-specific pricing

**Roles:**
- Role-based access control

**DB Tables:** team_members (*), organization_members (id, user_id, role, is_billable, organization_id), vendors (*), user_roles (role)

---

### 4.5 Find Contractors
**Route:** `/directory`
**Purpose:** Contractor marketplace/directory

**Components:**
- **My Profile** tab — Your contractor profile
- **Search Contractors** — Find by:
  - Trade (dropdown)
  - City (text)
  - State (dropdown)
  - Available Today (toggle)
- **Contractor Cards** — Search results

**DB Tables:** contractor_profiles or similar

---

### 4.6 Workflows
**Route:** `/workflows`
**Purpose:** Business process automation

**Tabs:** AI Builder | Automations | Task Sequences | Approvals | Run History

**AI Builder:**
- **Natural Language Input** — Describe automation, AI builds it
- **Example Prompts:**
  - "When a presentation is approved, create a job and notify the team"
  - "Send a follow-up email 3 days after sending an estimate"
  - "Create onboarding tasks when a new client is added"
  - "Send invoice reminders for overdue payments"
  - "Notify the client when their job status changes"
  - "Generate a schedule from the estimate when a presentation is signed"

**Automations:** Trigger-based automations
**Task Sequences:** Multi-step task chains
**Approvals:** Approval workflows
**Run History:** Execution logs

**DB Tables:** workflows (*), workflow_runs (*, workflows(name))

---

### 4.7 Community
**Route:** `/community`
**Purpose:** User community forum

**Components:**
- **New Post** button
- **KPI:** Total Posts, Tips Shared, Showcases, Help Requests
- **Category Tabs:** All Posts | Tips & Tricks | Showcase | Help Needed | Discussion | Announcements
- **Post Cards:** Author, timestamp, category badge, title, content (markdown)

**DB Tables:** community_posts (id, title, created_at, category, content, author)

---

### 4.8 Settings
**Route:** `/settings`
**Purpose:** Organization configuration

**Tabs:** Overview | Documents | Integrations | Job Statuses | Document Templates | Estimates

**Overview:**
- Company Info — Name, branding, details
- Edit Settings button
- Documents summary (click to manage)
- Integrations count (click to manage)

**Documents:** Organization-wide document storage
**Integrations:** Third-party integration management
**Job Statuses:** Custom job status workflow configuration
**Document Templates:** Template management for contracts/docs
**Estimates:** Estimate-specific settings (defaults, numbering, etc.)

**DB Tables:** organizations (*), profiles (measurement_system, etc.), custom_workspaces

---

## 5. SPECIAL FEATURES

### 5.1 DAEMON Command Hub (⌘K / Ctrl+K)
**Purpose:** AI-powered command palette
- Natural language entity creation
- Navigation by description
- Question answering about data
- Workflow triggering
- Step-by-step guided flows for complex actions

### 5.2 BugZapper 9000
**Purpose:** Gamified beta bug reporting
- Bug submission with screenshots
- Rank progression (Rookie → Insect Repellent → ...)
- Financial rewards ($50/bug, $0.50/mo discount)
- Leaderboard
- Feature Request submission

**DB Tables:** bug_reports (*), feature_requests (*), beta_status (*)

### 5.3 Proposals (Presentation Builder)
**Route:** Accessed via Estimates/Catalog
**Purpose:** Visual proposal canvas builder

- Canvas-based layout (width/height)
- Pricing display options
- Client approval workflow
- Share via token link
- Client notes

**DB Tables:** proposals (id, owner_id, client_id, estimate_id, name, description, status, share_token, pricing_display, base_price, selected_total, final_total, client_approved_at, client_notes, canvas_width, canvas_height, created_at, updated_at)

### 5.4 Client Portal
**Purpose:** Client-facing view of their projects
- Accessed via "View as Client" button
- Shows estimates, proposals, daily logs, invoices
- Approval workflows

### 5.5 Notifications System
- In-app notifications
- Toast notifications (success/error/info)
- Keyboard shortcut: F8

### 5.6 Purchase Orders
**Purpose:** PO management linked to vendors and jobs
**DB Tables:** purchase_orders (*, vendor→vendors, job→jobs, items→purchase_order_items)

### 5.7 Change Orders
**Purpose:** Job change order tracking
**DB Tables:** change_orders (*, job→jobs, client→clients)

### 5.8 Invoicing
**Purpose:** Invoice generation and tracking
**DB Tables:** invoices (*)

### 5.9 Opportunities (Sales Pipeline)
**Purpose:** Sales/CRM pipeline
**DB Tables:** opportunities (*, stage→opportunity_stages, contact→contacts)

### 5.10 Messages
**Purpose:** Internal messaging system
**DB Tables:** messages (*)

### 5.11 Custom Workspaces
**Purpose:** Multi-workspace support (e.g., Production, Staging)
**DB Tables:** custom_workspaces (*, sort_order)

---

## 6. DATABASE SCHEMA (40+ Tables)

### Auth & Users
- profiles
- organizations
- organization_members
- user_roles
- team_members

### CRM
- clients
- contacts
- opportunities
- opportunity_stages

### Projects
- jobs
- job_line_items
- tasks
- schedules
- schedule_items
- daily_logs
- time_entries

### Estimating & Catalog
- client_estimates
- catalog_items
- proposals

### Finance
- invoices
- expenses
- purchase_orders
- purchase_order_items
- change_orders
- vendors

### Contracts
- contracts
- contract_templates
- contract_signers

### Automation
- workflows
- workflow_runs

### Dashboard & Analytics
- dashboard_tiles
- dashboard_layouts
- custom_analytics_tiles
- analytics_tile_templates
- custom_workspaces

### Community & Beta
- community_posts
- bug_reports
- feature_requests
- beta_status

### Membership & Billing
- lifetime_membership_slots
- lifetime_purchases

### Communication
- notifications
- messages
- activity_logs

### RPC Functions
- update_user_activity

---

## 7. ROUTES MAP

```
/auth                → Login / Signup
/                    → Dashboard (Overview)
/clients             → Customer Management
/jobs                → Jobs
/agent               → OVERMIND (AI)
/estimates           → Estimates
/tasks               → Tasks
/schedules           → Schedules
/bim                 → BIM & Project Controls
/daily-logs          → Daily Logs
/specifications      → Spec Sheets
/time                → Time Tracking
/expenses            → Expenses
/cashflow            → Cash Flow Calendar
/planner             → Financial Planner
/analytics           → SF Cost Analytics / Reports
/lien-waivers        → Lien Waivers
/catalog             → Catalog & FORGE-X
/files               → File Management
/contracts           → Contracts & E-Signatures
/team                → Team Management
/directory           → Find Contractors
/workflows           → Workflow Automation
/community           → Community Forum
/settings            → Organization Settings
/agreement/subscription → Subscription Agreement
```

---

## 8. PRICING MODEL
- **Monthly:** $400/mo base + $35/additional user
- **Lifetime:** $20,000 one-time (unlimited users & usage)
- **Bug Bounty:** $50 per approved bug, $0.50/mo subscription discount per bug
- **Max Savings:** $20,000

---

*Document generated by reverse-engineering the live application at app.crucible-x.com*
*This serves as the complete spec for a ground-up rebuild.*
# Crucible-X — Estimates Section: Complete API & Data Spec
## Captured: March 8, 2026

---

## SUPABASE CONNECTION

```
URL:      https://fazcslzmxbqcaabjjtuz.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhemNzbHpteGJxY2FhYmpqdHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1OTMyOTksImV4cCI6MjA4NjE2OTI5OX0.NbNASPvUVmYSP6Y1e78zKjN_u1RBvK8utPS2xN6Gj6Q
REST API: https://fazcslzmxbqcaabjjtuz.supabase.co/rest/v1
```

---

## 1. DATABASE TABLES

### 1.1 `client_estimates` — Main Estimate Table

**All Columns (confirmed from live API response):**

```typescript
interface ClientEstimate {
  // Identity
  id: string;                          // UUID, primary key
  owner_id: string;                    // UUID, FK → auth.users
  client_id: string;                   // UUID, FK → clients
  project_id: string | null;           // UUID, FK → jobs (optional)

  // Basic Info
  name: string;                        // "Estimate for yanni ramos"
  description: string;                 // Free text

  // Status & Lifecycle
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'converted';
  client_approved_at: string | null;   // ISO timestamp
  client_acknowledged_at: string | null;
  converted_to_job_at: string | null;  // When converted to a job
  job_id: string | null;               // FK → jobs (after conversion)

  // Line Items (JSONB — stored inline, NOT in separate tables)
  line_items: EstimateLineItem[];      // All items/groups nested
  parameters: EstimateParameter[];     // Global estimate parameters
  parameter_groups: ParameterGroup[];  // Parameter groupings

  // Financials
  subtotal: number;                    // Sum of all line items before tax
  markup_total: number;                // Total markup amount
  total: number;                       // Grand total
  tax_rate: number;                    // Tax percentage (0 = disabled)
  tax_amount: number;                  // Calculated tax amount

  // Sharing
  share_token: string | null;          // Public share URL token

  // Client Interaction
  client_selections: ClientSelection[];// Client's selection choices
  is_approvable: boolean;              // Can client approve
  client_signature_data: any | null;   // E-signature data

  // View Tracking
  first_viewed_at: string | null;      // First client view
  last_viewed_at: string | null;       // Last client view
  view_count: number;                  // Total views

  // Presentation & Styling
  document_template_id: string | null; // FK → document templates
  cover_image_url: string | null;      // Cover image
  custom_styles: any | null;           // Custom CSS/styling overrides
  page_blocks: any | null;             // Page layout blocks

  // Tiered Estimates
  tier_type: 'single' | 'multi';      // Single or multi-tier (good/better/best)
  tier_estimates: any | null;          // Tier configuration

  // Optional Groups
  optional_groups: any | null;         // Groups client can opt in/out of

  // Schedule
  work_schedule: any | null;           // Work schedule attached to estimate
  payment_schedule: any | null;        // Payment milestones

  // Timestamps
  created_at: string;                  // ISO timestamp
  updated_at: string;                  // ISO timestamp
}
```

### 1.2 `catalog_items` — Material/Labor Catalog

```typescript
interface CatalogItem {
  id: string;                           // UUID
  owner_id: string;                     // UUID, FK → auth.users
  name: string;                         // "2x4x8 lumber"
  description: string | null;
  category: 'materials' | 'labor' | 'equipment' | 'overhead' | 'other';
  subcategory: string | null;
  unit: string;                         // "ea", "lf", "sf", "hr", etc.
  unit_cost: number;                    // Base cost per unit
  markup_percentage: number;            // Default markup %
  unit_cost_formula: string | null;     // Dynamic formula for cost
  quantity_formula: string | null;      // Dynamic formula for qty
  cost_code: string | null;             // Cost code reference
  image_url: string | null;             // Product image
  linked_estimate_template_id: string | null; // FK → estimate_templates
  is_active: boolean;
  is_allowance: boolean;                // Is this an allowance item?
  allowance_display_mode: 'price' | 'cost'; // How to show allowance

  // Supplier Integration
  source_url: string | null;            // Home Depot/Lowe's product URL
  source_supplier: string | null;       // Supplier name
  last_price_sync: string | null;       // Last auto-price update
  price_sync_enabled: boolean;          // Auto-update pricing

  created_at: string;
  updated_at: string;
}
```

### 1.3 `estimate_templates` — Reusable Templates

```typescript
interface EstimateTemplate {
  id: string;
  name: string;
  category: string;
  // Full template structure (likely similar to client_estimates line_items)
  // Table exists but empty for this account
}
```

### 1.4 `estimate_style_settings` — Org-Level Style Config

```typescript
interface EstimateStyleSettings {
  id: string;
  organization_id: string;              // FK → organizations
  // Custom branding, fonts, colors for estimates
  // Table exists but empty for this account
}
```

### 1.5 `proposals` — Visual Presentation Builder

```typescript
interface Proposal {
  id: string;
  owner_id: string;
  client_id: string;
  estimate_id: string;                  // FK → client_estimates
  name: string;
  description: string;
  status: string;
  share_token: string;
  pricing_display: string;              // How to show pricing
  base_price: number;
  selected_total: number;
  final_total: number;
  client_approved_at: string | null;
  client_notes: string | null;
  canvas_width: number;                 // Visual canvas dimensions
  canvas_height: number;
  created_at: string;
  updated_at: string;
}
```

### 1.6 `job_line_items` — Line Items After Conversion to Job

```typescript
interface JobLineItem {
  id: string;
  name: string;
  // Referenced by time_entries for labor tracking
  // Populated when estimate converts to job
}
```

---

## 2. API CALLS (All Supabase REST / PostgREST)

### 2.1 List All Estimates

```
GET /rest/v1/client_estimates
  ?select=id,owner_id,client_id,project_id,name,description,status,
          subtotal,markup_total,total,client_approved_at,
          converted_to_job_at,job_id,share_token,created_at,updated_at
  &owner_id=eq.{user_id}
  &order=created_at.desc

Headers:
  Authorization: Bearer {access_token}
  apikey: {anon_key}
```

### 2.2 Get Single Estimate (Full Detail)

```
GET /rest/v1/client_estimates
  ?select=*
  &id=eq.{estimate_id}
  &owner_id=eq.{user_id}

Returns: Full record including line_items[], parameters[], parameter_groups[],
         client_selections[], tier_estimates, optional_groups, work_schedule,
         payment_schedule, page_blocks, custom_styles
```

### 2.3 Get Estimates by Client

```
GET /rest/v1/client_estimates
  ?select=id,owner_id,client_id,project_id,name,description,status,
          subtotal,markup_total,total,client_approved_at,
          converted_to_job_at,job_id,share_token,created_at,updated_at
  &owner_id=eq.{user_id}
  &client_id=eq.{client_id}
  &order=created_at.desc
  &limit=500
```

### 2.4 Get Catalog Items

```
GET /rest/v1/catalog_items
  ?select=id,owner_id,name,description,category,subcategory,unit,
          unit_cost,markup_percentage,unit_cost_formula,quantity_formula,
          cost_code,image_url,linked_estimate_template_id,is_active,
          is_allowance,allowance_display_mode,created_at,updated_at
  &owner_id=eq.{user_id}
  &order=category.asc,name.asc
  &limit=1000
```

### 2.5 Get Estimate Templates

```
GET /rest/v1/estimate_templates
  ?select=*
  &order=category.asc,name.asc
  &limit=1000
```

### 2.6 Get Estimate Style Settings (Org-Level)

```
GET /rest/v1/estimate_style_settings
  ?select=*
  &organization_id=eq.{org_id}
```

### 2.7 Get Proposals for Estimates

```
GET /rest/v1/proposals
  ?select=id,owner_id,client_id,estimate_id,name,description,status,
          share_token,pricing_display,base_price,selected_total,
          final_total,client_approved_at,client_notes,canvas_width,
          canvas_height,created_at,updated_at
  &owner_id=eq.{user_id}
  &order=updated_at.desc
  &limit=500
```

### 2.8 Get Proposals by Client

```
GET /rest/v1/proposals
  ?select=...same as above...
  &owner_id=eq.{user_id}
  &client_id=eq.{client_id}
  &order=updated_at.desc
  &limit=500
```

### 2.9 Get Client Info for Estimate

```
GET /rest/v1/clients
  ?select=email,name,address
  &id=eq.{client_id}
```

### 2.10 Get All Clients (for client picker)

```
GET /rest/v1/clients
  ?select=id,owner_id,name,email,phone,company,title,address,notes,
          created_at,updated_at
  &owner_id=eq.{user_id}
  &order=name.asc
  &limit=1000
```

### 2.11 Get Client Name List (lightweight)

```
GET /rest/v1/clients
  ?select=id,name
  &owner_id=eq.{user_id}
```

---

## 3. ESTIMATE DETAIL PAGE — UI STRUCTURE

### 3.1 Top Bar
- **Breadcrumb:** Home > Estimates > [Estimate Name]
- **Name Field:** Editable textbox ("Estimate for yanni ramos")
- **Description Field:** Editable textbox
- **Status Dropdown:** Draft | Sent | Approved | Rejected | Converted
- **Action Buttons:**
  - **Review** — Preview estimate as client sees it
  - **Presentation** — Open proposal/presentation builder
  - **More (⋮)** — Additional actions menu
  - **Save** — Save changes

### 3.2 Main Tabs (4)
1. **Scope** — Line items, groups, pricing (default)
2. **Budget** — Budget view of the estimate
3. **Assembly** — Assembly/build-up view
4. **Allowances + Selections** — Client selection options

### 3.3 Scope Tab — Sub-tabs (2)
1. **Items & Groups** — Main line item editor
2. **Parameters** — Global estimate parameters

### 3.4 Scope Tab — Toolbar
- **Spreadsheet** — Toggle spreadsheet view
- **ACCEL** — AI-powered estimate acceleration
- **Stream** — Real-time collaboration/streaming
- **More (⋮)** — Additional options
- **BLACKLEDGER** — Financial analysis tool
- **Summary** — Estimate summary (disabled when empty)
- **Load Template** — Import from template library

### 3.5 Line Item Table Columns
| Column | Description |
|--------|-------------|
| ☑ (checkbox) | Select item |
| Name | Item name |
| Description | Item description |
| Qty | Quantity |
| Unit | Unit of measure |
| Formula | Cost/qty formula |
| Ext. Cost | Extended cost (qty × unit_cost) |
| Unit Price | Price per unit (with markup) |
| Ext. Price | Extended price |
| Margin | Margin percentage |
| Select | Client selection toggle |
| Profit | Profit amount |

### 3.6 Add Buttons
- **Add Group** — Create a group (section/category)
- **Add Selection** — Create a selection option
- **Item** — Add single line item
- **Group** — Add item group
- **Selection** — Add selection group

### 3.7 Bottom Controls
- **Schedule Work** | **Payment** | **Phase** — Scheduling options
- **Visible to client** (toggle switch) — Show/hide from client
- **Approvable** (toggle switch) — Allow client approval

### 3.8 Financial Summary (Right/Bottom)
| Field | Description |
|-------|-------------|
| Total Cost | Sum of all costs |
| Subtotal | Before tax |
| Tax (toggle) | Enable/disable tax |
| Tax Amount | Calculated tax |
| Profit | Total profit ($) |
| Margin | Profit margin (%) |
| Grand Total | Final amount |

---

## 4. LINE ITEM DATA STRUCTURE (JSONB)

Line items are stored as JSONB arrays in the `client_estimates.line_items` column.
Based on the UI columns and catalog_items fields:

```typescript
interface EstimateLineItem {
  id: string;                    // UUID
  type: 'item' | 'group' | 'selection';
  name: string;
  description: string | null;

  // Pricing
  quantity: number;
  unit: string;                  // "ea", "lf", "sf", "hr"
  unit_cost: number;             // Cost per unit
  unit_price: number;            // Price per unit (with markup)
  extended_cost: number;         // qty × unit_cost
  extended_price: number;        // qty × unit_price
  margin: number;                // Margin percentage
  profit: number;                // Profit amount
  markup_percentage: number;

  // Formulas
  unit_cost_formula: string | null;    // Dynamic cost formula
  quantity_formula: string | null;     // Dynamic qty formula

  // Catalog Reference
  catalog_item_id: string | null;      // FK → catalog_items
  cost_code: string | null;

  // Grouping
  parent_group_id: string | null;      // Nested in group
  sort_order: number;

  // Selection/Allowance
  is_allowance: boolean;
  allowance_display_mode: 'price' | 'cost';
  is_selected: boolean;                // Client selected this option
  is_optional: boolean;

  // Client Visibility
  visible_to_client: boolean;

  // For type='group'
  children: EstimateLineItem[];        // Nested items
  is_area_group: boolean;              // Track as SF area group
  area_sf: number | null;              // Square footage for area group
}
```

### Parameters Structure:

```typescript
interface EstimateParameter {
  id: string;
  name: string;                 // e.g., "total_sf", "num_stories"
  value: number | string;
  unit: string | null;
  group_id: string | null;      // FK → parameter_groups
}

interface ParameterGroup {
  id: string;
  name: string;                 // e.g., "Dimensions", "Project Info"
  sort_order: number;
}
```

### Client Selections:

```typescript
interface ClientSelection {
  line_item_id: string;
  selected_option_id: string;
  notes: string | null;
}
```

---

## 5. ESTIMATE LIFECYCLE / WORKFLOWS

```
                    ┌──────────┐
                    │  DRAFT   │
                    └────┬─────┘
                         │ Send to client
                    ┌────▼─────┐
                    │   SENT   │◄─── Client views (view_count++)
                    └────┬─────┘     first_viewed_at / last_viewed_at
                         │
              ┌──────────┼──────────┐
              │          │          │
         ┌────▼─────┐   │    ┌─────▼────┐
         │ APPROVED │   │    │ REJECTED │
         └────┬─────┘   │    └──────────┘
              │         │
              │ client_approved_at set
              │ client_signature_data captured
              │
         ┌────▼─────┐
         │CONVERTED │ → Creates Job (job_id set)
         └──────────┘   converted_to_job_at set
```

---

## 6. SPECIAL FEATURES

### 6.1 ACCEL (AI Estimate Builder)
- Toolbar button in estimate editor
- AI-accelerated estimate generation
- Likely uses catalog items + templates to auto-populate

### 6.2 Stream
- Real-time collaboration on estimates
- Multiple users editing simultaneously

### 6.3 BLACKLEDGER
- Financial analysis overlay
- Shows cost/profit analysis for the estimate

### 6.4 Tiered Estimates (Good/Better/Best)
- `tier_type: 'single' | 'multi'`
- `tier_estimates` JSONB stores multiple pricing tiers
- Client can compare and choose tier

### 6.5 Area Group Tracking
- Groups can be marked as "Area Groups"
- Enter total SF for the area
- Rolls up cost/SF analytics across projects
- Feeds into the Analytics/Reports page

### 6.6 Formulas
- `unit_cost_formula` — Dynamic cost calculation
- `quantity_formula` — Dynamic quantity calculation
- References estimate parameters (e.g., `{total_sf} * 0.15`)

### 6.7 Supplier Price Sync
- Catalog items linked to Home Depot/Lowe's/Menards/Ferguson
- `source_url`, `source_supplier` fields
- `price_sync_enabled` for auto-updates
- `last_price_sync` tracks freshness

---

## 7. RELATED API CALLS (Supporting Data)

### Create New Estimate
```
POST /rest/v1/client_estimates
Body: {
  owner_id: "{user_id}",
  client_id: "{client_id}",
  name: "New Estimate",
  status: "draft",
  line_items: [],
  parameters: [],
  parameter_groups: [],
  subtotal: 0,
  markup_total: 0,
  total: 0,
  tax_rate: 0,
  tax_amount: 0,
  is_approvable: true,
  tier_type: "single"
}
```

### Update Estimate
```
PATCH /rest/v1/client_estimates
  ?id=eq.{estimate_id}
  &owner_id=eq.{user_id}
Body: {
  line_items: [...updated items...],
  subtotal: 1500.00,
  markup_total: 450.00,
  total: 1950.00,
  updated_at: "now()"
}
```

### Delete Estimate
```
DELETE /rest/v1/client_estimates
  ?id=eq.{estimate_id}
  &owner_id=eq.{user_id}
```

### Convert to Job
```
PATCH /rest/v1/client_estimates
  ?id=eq.{estimate_id}
Body: {
  status: "converted",
  converted_to_job_at: "{timestamp}",
  job_id: "{new_job_id}"
}

POST /rest/v1/jobs
Body: { ...job data from estimate... }
```

---

## 8. IDS & REFERENCES

```
User ID:         263820cc-d30f-450a-962c-04d0601d970c
Org ID:          6df27c27-f836-4208-a48a-b1734d458ba5
Client ID:       fbf169a9-ac8a-4c7a-aca3-fe7dbc426f7b
Estimate ID:     af19e07a-373a-475d-9afc-de30003c2179
Supabase Proj:   fazcslzmxbqcaabjjtuz
```

---

*Complete API spec for the Estimates section of Crucible-X*
# Crucible-X — Complete Database Schema
## Extracted: March 8, 2026 | Source: Supabase OpenAPI Spec

**Total Tables: 251 | RPC Functions: 37 | Total Columns: 3269**

---

## Auth & Users

### `profiles` (23 columns)
```
  id
  user_id
  email
  full_name
  company_name
  phone
  created_at
  updated_at
  logo_url
  custom_email_domain
  custom_email_from_name
  onboarding_completed_at
  email_provider
  resend_api_key_configured
  organization_id
  account_type
  measurement_system
  last_active_at
  last_action
  is_parked
  parked_at
  parked_message
  avatar_url
```

### `organizations` (38 columns)
```
  id
  name
  owner_id
  helcim_customer_code
  helcim_subscription_id
  subscription_status
  trial_ends_at
  subscription_started_at
  base_price
  per_user_price
  created_at
  updated_at
  logo_url
  phone
  email
  address
  website
  custom_email_domain
  custom_email_from_name
  email_provider
  resend_api_key_configured
  brand_color
  daily_log_photos_required
  default_markups
  roof_measurement_provider
  roof_measurement_api_key
  twilio_account_sid
  twilio_auth_token_encrypted
  twilio_phone_number
  twilio_enabled
  meta_page_id
  meta_page_access_token_encrypted
  meta_instagram_account_id
  meta_enabled
  meta_webhook_verify_token
  meta_page_name
  meta_connected_at
  business_days_config
```

### `organization_members` (9 columns)
```
  id
  organization_id
  user_id
  role
  is_billable
  created_at
  updated_at
  custom_role_id
  hourly_rate
```

### `organization_roles` (7 columns)
```
  id
  organization_id
  name
  description
  is_system_role
  created_at
  updated_at
```

### `user_roles` (3 columns)
```
  id
  user_id
  role
```

### `team_members` (8 columns)
```
  id
  owner_id
  name
  email
  phone
  role
  created_at
  updated_at
```

### `team_invitations` (14 columns)
```
  id
  organization_id
  invited_by
  email
  name
  role
  is_billable
  invite_code
  status
  accepted_at
  expires_at
  created_at
  updated_at
  custom_role_id
```

### `role_permissions` (4 columns)
```
  id
  role_id
  permission
  created_at
```

### `invite_codes` (8 columns)
```
  id
  code
  created_by
  used_by
  used_at
  is_admin_generated
  expires_at
  created_at
```

### `demo_codes` (9 columns)
```
  id
  code
  created_by
  created_at
  expires_at
  max_uses
  uses_remaining
  is_active
  description
```

### `demo_sessions` (7 columns)
```
  id
  demo_code_id
  session_token
  started_at
  expires_at
  ended_at
  ip_address
```

### `beta_signups` (14 columns)
```
  id
  company_name
  contact_name
  email
  phone
  plan_type
  user_count
  monthly_amount
  transaction_id
  card_token
  customer_code
  status
  created_at
  updated_at
```

### `beta_invites` (9 columns)
```
  id
  email
  invited_by
  invite_code
  status
  accepted_at
  expires_at
  created_at
  invite_code_text
```

### `beta_status` (10 columns)
```
  id
  user_id
  approved_bugs_count
  subscription_discount
  lifetime_discount
  tier
  has_used_feature_request
  is_beta_tester
  created_at
  updated_at
```

## CRM & Contacts

### `clients` (11 columns)
```
  id
  owner_id
  name
  email
  phone
  company
  address
  notes
  created_at
  updated_at
  title
```

### `contacts` (41 columns)
```
  id
  first_name
  last_name
  email
  phone
  company
  job_title
  status
  lifecycle_stage
  lead_score
  source
  source_medium
  source_campaign
  source_content
  notes
  address_line1
  address_line2
  city
  state
  postal_code
  country
  assigned_to
  organization_id
  owner_id
  last_contacted_at
  last_activity_at
  converted_at
  converted_to_client_id
  email_subscribed
  unsubscribed_at
  unsubscribe_token
  total_emails_sent
  total_emails_opened
  total_sms_sent
  utm_source
  utm_medium
  utm_campaign
  utm_content
  utm_term
  created_at
  updated_at
```

### `contact_tags` (9 columns)
```
  id
  name
  color
  owner_id
  organization_id
  description
  usage_count
  created_at
  updated_at
```

### `contact_tag_assignments` (6 columns)
```
  id
  contact_id
  tag_id
  owner_id
  assigned_at
  created_at
```

### `contact_lists` (11 columns)
```
  id
  name
  description
  owner_id
  organization_id
  list_type
  filter_criteria
  member_count
  is_active
  created_at
  updated_at
```

### `contact_list_members` (7 columns)
```
  id
  list_id
  contact_id
  owner_id
  added_at
  source
  created_at
```

### `contact_segments` (11 columns)
```
  id
  owner_id
  organization_id
  name
  description
  filter_rules
  is_dynamic
  contact_count
  last_calculated_at
  created_at
  updated_at
```

### `contact_activities` (8 columns)
```
  id
  owner_id
  contact_id
  activity_type
  description
  metadata
  score_change
  created_at
```

### `contact_scoring_rules` (10 columns)
```
  id
  owner_id
  name
  description
  trigger_type
  trigger_conditions
  score_change
  is_active
  created_at
  updated_at
```

### `contact_custom_field_definitions` (12 columns)
```
  id
  name
  field_key
  field_type
  owner_id
  organization_id
  options
  is_required
  display_order
  description
  created_at
  updated_at
```

### `contact_custom_field_values` (8 columns)
```
  id
  contact_id
  field_definition_id
  owner_id
  value
  metadata
  created_at
  updated_at
```

### `client_intake_submissions` (17 columns)
```
  id
  owner_id
  name
  email
  phone
  company
  project_type
  project_description
  budget_range
  timeline
  address
  how_heard
  status
  notes
  converted_to_client_id
  created_at
  updated_at
```

### `client_portal_tokens` (5 columns)
```
  id
  client_id
  token
  created_at
  expires_at
```

## Sales Pipeline

### `opportunities` (20 columns)
```
  id
  name
  owner_id
  organization_id
  contact_id
  converted_to_client_id
  converted_to_job_id
  stage_id
  value
  currency
  status
  source
  source_campaign
  description
  expected_close_date
  actual_close_date
  lost_reason
  assigned_to
  created_at
  updated_at
```

### `opportunity_stages` (12 columns)
```
  id
  name
  pipeline_name
  owner_id
  organization_id
  display_order
  color
  win_probability
  is_won_stage
  is_lost_stage
  created_at
  updated_at
```

### `crm_pipelines` (10 columns)
```
  id
  name
  description
  owner_id
  organization_id
  pipeline_type
  is_default
  settings
  created_at
  updated_at
```

### `crm_pipeline_stages` (12 columns)
```
  id
  name
  pipeline_id
  owner_id
  position
  color
  probability
  is_won_stage
  is_lost_stage
  auto_actions
  created_at
  updated_at
```

### `crm_deals` (23 columns)
```
  id
  title
  pipeline_id
  stage_id
  owner_id
  organization_id
  contact_id
  client_id
  value
  currency
  probability
  status
  source
  expected_close_date
  actual_close_date
  loss_reason
  notes
  assigned_to
  last_activity_at
  tags
  custom_fields
  created_at
  updated_at
```

### `crm_deal_activities` (9 columns)
```
  id
  deal_id
  owner_id
  activity_type
  title
  description
  created_by
  metadata
  created_at
```

### `lead_attribution` (22 columns)
```
  id
  owner_id
  contact_id
  opportunity_id
  first_touch_source
  first_touch_medium
  first_touch_campaign
  first_touch_content
  first_touch_term
  first_touch_at
  last_touch_source
  last_touch_medium
  last_touch_campaign
  last_touch_content
  last_touch_term
  last_touch_at
  converted_at
  conversion_value
  conversion_type
  touchpoints
  created_at
  updated_at
```

### `lead_forms` (15 columns)
```
  id
  owner_id
  organization_id
  name
  description
  slug
  fields
  settings
  styling
  success_message
  redirect_url
  is_active
  submission_count
  created_at
  updated_at
```

### `lead_form_submissions` (14 columns)
```
  id
  form_id
  owner_id
  contact_id
  data
  source_url
  ip_address
  user_agent
  utm_source
  utm_medium
  utm_campaign
  status
  processed_at
  created_at
```

## Estimating

### `client_estimates` (37 columns)
```
  id
  owner_id
  client_id
  project_id
  name
  description
  status
  line_items
  parameters
  parameter_groups
  subtotal
  markup_total
  total
  client_approved_at
  converted_to_job_at
  job_id
  created_at
  updated_at
  share_token
  client_selections
  tax_rate
  tax_amount
  is_approvable
  client_acknowledged_at
  client_signature_data
  document_template_id
  cover_image_url
  payment_schedule
  tier_type
  tier_estimates
  optional_groups
  first_viewed_at
  last_viewed_at
  view_count
  custom_styles
  page_blocks
  work_schedule
```

### `catalog_items` (23 columns)
```
  id
  owner_id
  name
  description
  category
  subcategory
  unit
  unit_cost
  markup_percentage
  unit_cost_formula
  quantity_formula
  cost_code
  image_url
  linked_estimate_template_id
  is_active
  created_at
  updated_at
  is_allowance
  allowance_display_mode
  source_url
  source_supplier
  last_price_sync
  price_sync_enabled
```

### `estimate_templates` (11 columns)
```
  id
  owner_id
  name
  description
  category
  parameter_groups
  parameters
  line_item_templates
  created_at
  updated_at
  is_community
```

### `estimate_style_settings` (36 columns)
```
  id
  organization_id
  cover_page_enabled
  cover_page_template
  primary_color
  accent_color
  font_family
  show_quantity
  show_unit_price
  show_description
  show_category
  show_line_item_photos
  payment_schedule_template
  default_terms_template_id
  created_at
  updated_at
  background_color
  text_color
  header_bg_color
  section_header_color
  border_color
  line_item_layout
  show_line_numbers
  show_group_subtotals
  intro_title
  intro_content
  footer_content
  custom_total_label
  show_company_contact
  item_photo_size
  item_photo_shape
  cover_config
  custom_templates
  default_template_id
  heading_color
  page_number_color
```

### `estimate_views` (9 columns)
```
  id
  estimate_id
  viewer_email
  viewer_ip
  viewed_at
  time_spent_seconds
  device_type
  user_agent
  created_at
```

### `line_item_templates` (14 columns)
```
  id
  owner_id
  name
  description
  cost_code
  category
  unit
  unit_cost
  markup_percentage
  formula
  is_description_only
  created_at
  updated_at
  is_community
```

### `cost_codes` (8 columns)
```
  id
  owner_id
  code
  name
  description
  category
  created_at
  updated_at
```

### `units` (6 columns)
```
  id
  owner_id
  name
  abbreviation
  created_at
  updated_at
```

### `pricing_data_points` (21 columns)
```
  id
  item_name
  item_name_normalized
  category
  trade
  cost_code
  unit
  unit_price
  quantity
  markup_percentage
  state
  zip_code
  project_type
  organization_id
  estimate_id
  estimate_status
  was_accepted
  was_converted
  actual_hours
  created_at
  updated_at
```

### `selection_templates` (10 columns)
```
  id
  owner_id
  name
  description
  selection_type
  display_columns
  is_required
  category
  created_at
  updated_at
```

### `selection_template_options` (12 columns)
```
  id
  owner_id
  template_id
  name
  description
  price
  image_url
  catalog_item_id
  is_base_option
  display_order
  created_at
  updated_at
```

### `tiered_selection_templates` (10 columns)
```
  id
  owner_id
  name
  description
  tier_labels
  category
  show_prices
  columns
  created_at
  updated_at
```

### `tiered_selection_template_options` (13 columns)
```
  id
  owner_id
  template_id
  parent_id
  tier_level
  name
  description
  image_url
  price
  catalog_item_id
  display_order
  created_at
  updated_at
```

## Proposals & Presentations

### `proposals` (23 columns)
```
  id
  owner_id
  client_id
  estimate_id
  name
  description
  status
  share_token
  pricing_display
  base_price
  selected_total
  final_total
  client_approved_at
  client_notes
  created_at
  updated_at
  first_viewed_at
  last_viewed_at
  view_count
  tax_rate
  tax_amount
  canvas_width
  canvas_height
```

### `proposal_pages` (14 columns)
```
  id
  proposal_id
  owner_id
  page_type
  title
  subtitle
  page_order
  background_color
  background_image_url
  content
  created_at
  updated_at
  device_type
  title_style
```

### `proposal_selections` (11 columns)
```
  id
  proposal_id
  page_id
  owner_id
  name
  description
  selection_type
  is_required
  display_columns
  created_at
  updated_at
```

### `proposal_selection_options` (12 columns)
```
  id
  selection_id
  catalog_item_id
  owner_id
  name
  description
  image_url
  price
  is_base_option
  display_order
  created_at
  updated_at
```

### `proposal_client_selections` (5 columns)
```
  id
  proposal_id
  selection_id
  option_id
  selected_at
```

### `proposal_templates` (13 columns)
```
  id
  owner_id
  name
  description
  category
  pages
  default_pricing_display
  created_at
  updated_at
  is_community
  canvas_width
  canvas_height
  page_count
```

### `proposal_documents` (16 columns)
```
  id
  proposal_id
  owner_id
  name
  document_type
  file_url
  content
  requires_signature
  signature_data
  signed_at
  display_order
  created_at
  updated_at
  signer_name
  signer_email
  ip_address
```

## Jobs & Projects

### `jobs` (16 columns)
```
  id
  owner_id
  project_id
  client_id
  name
  description
  status
  start_date
  target_end_date
  actual_end_date
  estimated_revenue
  actual_revenue
  estimated_cost
  actual_cost
  created_at
  updated_at
```

### `job_line_items` (17 columns)
```
  id
  owner_id
  job_id
  name
  description
  category
  quantity
  unit
  estimated_unit_cost
  approved_unit_cost
  actual_unit_cost
  markup_percentage
  bid_request_id
  vendor_id
  status
  created_at
  updated_at
```

### `projects` (10 columns)
```
  id
  owner_id
  client_id
  name
  description
  status
  address
  total_amount
  created_at
  updated_at
```

### `tasks` (14 columns)
```
  id
  owner_id
  title
  description
  status
  priority
  due_date
  completed_at
  assigned_to
  client_id
  job_id
  template_id
  created_at
  updated_at
```

### `task_templates` (10 columns)
```
  id
  owner_id
  name
  description
  category
  default_priority
  default_due_days
  checklist_items
  created_at
  updated_at
```

### `task_sequence_templates` (8 columns)
```
  id
  owner_id
  name
  description
  category
  trigger_type
  created_at
  updated_at
```

### `task_sequence_items` (11 columns)
```
  id
  sequence_id
  owner_id
  title
  description
  days_offset
  priority
  assigned_role
  display_order
  created_at
  updated_at
```

### `schedules` (10 columns)
```
  id
  owner_id
  project_id
  name
  description
  start_date
  end_date
  created_at
  updated_at
  job_id
```

### `schedule_items` (17 columns)
```
  id
  schedule_id
  owner_id
  title
  description
  start_date
  end_date
  status
  team_member_ids
  vendor_ids
  notify_assignees
  created_at
  updated_at
  group_id
  color
  depends_on_ids
  sort_order
```

### `schedule_groups` (9 columns)
```
  id
  schedule_id
  owner_id
  name
  color
  parent_group_id
  sort_order
  created_at
  updated_at
```

### `daily_logs` (17 columns)
```
  id
  owner_id
  job_id
  client_id
  log_date
  weather
  temperature
  work_completed
  materials_used
  notes
  hours_worked
  workers_on_site
  created_at
  updated_at
  status
  client_visible
  submitted_at
```

### `daily_log_photos` (7 columns)
```
  id
  daily_log_id
  owner_id
  file_path
  file_name
  description
  created_at
```

### `specifications` (14 columns)
```
  id
  owner_id
  organization_id
  job_id
  client_id
  category
  title
  description
  details
  attachments
  is_client_visible
  sort_order
  created_at
  updated_at
```

### `time_entries` (19 columns)
```
  id
  owner_id
  team_member_id
  vendor_id
  user_id
  clock_in
  clock_out
  break_minutes
  job_id
  job_line_item_id
  hourly_rate
  total_hours
  total_cost
  notes
  status
  approved_by
  approved_at
  created_at
  updated_at
```

## BIM & 3D

### `bim_models` (14 columns)
```
  id
  owner_id
  organization_id
  job_id
  name
  description
  file_path
  file_type
  file_size
  version
  thumbnail_url
  metadata
  created_at
  updated_at
```

### `bim_elements` (11 columns)
```
  id
  model_id
  owner_id
  element_id
  element_type
  category
  name
  properties
  geometry_data
  quantity_data
  created_at
```

### `bim_clashes` (17 columns)
```
  id
  owner_id
  job_id
  model_id
  element_a_id
  element_b_id
  clash_type
  severity
  status
  distance
  location
  assigned_to
  resolved_by
  resolved_at
  notes
  created_at
  updated_at
```

### `bim_markups` (15 columns)
```
  id
  owner_id
  model_id
  entity_type
  entity_id
  markup_type
  position
  rotation
  scale
  color
  label
  description
  camera_position
  created_by
  created_at
```

### `rfis` (23 columns)
```
  id
  owner_id
  organization_id
  job_id
  client_id
  rfi_number
  subject
  question
  answer
  status
  priority
  due_date
  submitted_at
  submitted_by
  answered_at
  answered_by
  ball_in_court
  cost_impact
  schedule_impact_days
  model_id
  location_data
  created_at
  updated_at
```

### `rfi_responses` (8 columns)
```
  id
  rfi_id
  owner_id
  responder_id
  responder_type
  content
  is_official_answer
  created_at
```

### `rfi_attachments` (8 columns)
```
  id
  rfi_id
  owner_id
  file_path
  file_name
  file_type
  file_size
  created_at
```

### `submittals` (22 columns)
```
  id
  owner_id
  organization_id
  job_id
  client_id
  submittal_number
  title
  description
  spec_section
  status
  priority
  due_date
  submitted_at
  submitted_by
  reviewed_at
  reviewed_by
  revision_number
  vendor_id
  model_id
  location_data
  created_at
  updated_at
```

### `submittal_attachments` (9 columns)
```
  id
  submittal_id
  owner_id
  file_path
  file_name
  file_type
  file_size
  is_shop_drawing
  created_at
```

### `punch_lists` (11 columns)
```
  id
  owner_id
  organization_id
  job_id
  client_id
  name
  description
  status
  due_date
  created_at
  updated_at
```

### `punch_list_items` (21 columns)
```
  id
  punch_list_id
  owner_id
  item_number
  description
  location
  trade
  status
  priority
  assigned_to
  assigned_to_name
  due_date
  completed_at
  verified_at
  verified_by
  model_id
  location_data
  photo_urls
  notes
  created_at
  updated_at
```

### `floor_plans` (11 columns)
```
  id
  owner_id
  project_id
  job_id
  name
  description
  scene_data
  thumbnail_url
  created_at
  updated_at
  client_id
```

### `floor_plan_versions` (7 columns)
```
  id
  floor_plan_id
  version_number
  description
  blocks_snapshot
  created_by
  created_at
```

### `floor_plan_comments` (11 columns)
```
  id
  floor_plan_id
  parent_id
  block_id
  position_x
  position_y
  text
  resolved
  created_by
  created_at
  updated_at
```

### `floor_plan_scans` (16 columns)
```
  id
  owner_id
  floor_plan_id
  name
  image_url
  scan_result
  groups
  linked_templates
  status
  error_message
  created_at
  updated_at
  generated_scene_data
  image_urls
  client_id
  pdf_url
```

### `floor_plan_xrefs` (10 columns)
```
  id
  source_floor_plan_id
  target_floor_plan_id
  insertion_x
  insertion_y
  scale_factor
  rotation
  visible
  locked
  created_at
```

### `lidar_room_scans` (22 columns)
```
  id
  owner_id
  floor_plan_id
  name
  device_id
  scanned_at
  room_dimensions
  walls
  doors
  windows
  openings
  fixtures
  surfaces
  usdz_file_path
  thumbnail_url
  preview_images
  status
  error_message
  converted_to_floor_plan_at
  scan_result
  created_at
  updated_at
```

### `exterior_scans` (25 columns)
```
  id
  org_id
  job_id
  client_id
  created_by
  building_type
  stories
  address
  status
  photo_count
  coverage_percent
  processing_job_id
  callback_token
  model_url
  thumbnail_url
  measurements
  scale_method
  scale_accuracy_cm
  processing_time_ms
  processing_cost_usd
  error_message
  error_stage
  created_at
  updated_at
  elevation_images
```

### `takeoff_template_mappings` (9 columns)
```
  id
  owner_id
  element_type
  element_subtype
  template_id
  template_name
  is_default
  created_at
  updated_at
```

## Contracts & Documents

### `contracts` (19 columns)
```
  id
  owner_id
  template_id
  client_id
  job_id
  proposal_id
  name
  content
  filled_placeholders
  status
  share_token
  sent_at
  expires_at
  completed_at
  created_at
  updated_at
  pdf_file_path
  pdf_page_count
  document_type
```

### `contract_templates` (13 columns)
```
  id
  owner_id
  name
  description
  content
  placeholders
  category
  is_active
  created_at
  updated_at
  pdf_file_path
  pdf_page_count
  document_type
```

### `contract_signers` (19 columns)
```
  id
  contract_id
  owner_id
  name
  email
  role
  sign_order
  status
  signature_data
  signature_type
  signed_at
  ip_address
  user_agent
  email_sent_at
  reminder_sent_at
  created_at
  updated_at
  title
  company
```

### `contract_fields` (19 columns)
```
  id
  owner_id
  contract_id
  template_id
  field_type
  page_number
  x_position
  y_position
  width
  height
  assigned_signer_index
  label
  required
  placeholder
  value
  filled_at
  filled_by
  created_at
  updated_at
```

### `contract_audit_log` (8 columns)
```
  id
  contract_id
  signer_id
  action
  ip_address
  user_agent
  metadata
  created_at
```

### `documents` (11 columns)
```
  id
  owner_id
  client_id
  project_id
  file_name
  file_path
  file_type
  file_size
  description
  created_at
  updated_at
```

### `document_templates` (17 columns)
```
  id
  owner_id
  name
  document_type
  description
  header_content
  footer_content
  terms_content
  requires_signature
  requires_initials
  signature_positions
  logo_position
  auto_status_id
  is_default
  is_system
  created_at
  updated_at
```

## Finance

### `invoices` (21 columns)
```
  id
  owner_id
  client_id
  proposal_id
  job_id
  invoice_number
  status
  issue_date
  due_date
  subtotal
  tax_rate
  tax_amount
  total
  amount_paid
  notes
  terms
  line_items
  paid_at
  sent_at
  created_at
  updated_at
```

### `expenses` (15 columns)
```
  id
  owner_id
  project_id
  vendor_id
  description
  amount
  category
  expense_date
  receipt_url
  status
  notes
  created_at
  updated_at
  cost_code
  job_id
```

### `purchase_orders` (20 columns)
```
  id
  po_number
  owner_id
  organization_id
  vendor_id
  job_id
  client_id
  status
  issue_date
  expected_date
  subtotal
  tax_rate
  tax_amount
  total
  notes
  vendor_notes
  accepted_at
  share_token
  created_at
  updated_at
```

### `purchase_order_items` (13 columns)
```
  id
  purchase_order_id
  owner_id
  description
  quantity
  unit
  unit_cost
  total
  received_quantity
  catalog_item_id
  cost_code
  sort_order
  created_at
```

### `change_orders` (23 columns)
```
  id
  co_number
  owner_id
  organization_id
  job_id
  client_id
  estimate_id
  title
  description
  reason
  status
  cost_impact
  price_impact
  schedule_impact_days
  requested_by
  requested_at
  approved_at
  approved_by
  client_signature
  client_signed_at
  share_token
  created_at
  updated_at
```

### `change_order_items` (13 columns)
```
  id
  change_order_id
  owner_id
  item_type
  description
  quantity
  unit
  unit_cost
  unit_price
  total_cost
  total_price
  sort_order
  created_at
```

### `lien_waivers` (20 columns)
```
  id
  owner_id
  organization_id
  job_id
  vendor_id
  invoice_id
  waiver_type
  status
  amount
  through_date
  claimant_name
  claimant_title
  share_token
  signature_data
  signed_at
  sent_at
  exceptions
  notes
  created_at
  updated_at
```

### `retainage` (13 columns)
```
  id
  owner_id
  organization_id
  job_id
  invoice_id
  retainage_percent
  retainage_amount
  status
  released_amount
  released_at
  release_notes
  created_at
  updated_at
```

### `financial_buckets` (14 columns)
```
  id
  owner_id
  organization_id
  name
  description
  target_percentage
  target_amount
  current_balance
  priority
  color
  icon
  is_active
  created_at
  updated_at
```

### `financial_allocations` (10 columns)
```
  id
  owner_id
  organization_id
  bucket_id
  amount
  source_type
  source_id
  description
  allocated_at
  created_at
```

### `financial_ai_suggestions` (12 columns)
```
  id
  owner_id
  organization_id
  suggestion_type
  title
  description
  suggested_allocations
  income_amount
  invoice_id
  status
  created_at
  resolved_at
```

### `financial_bills` (14 columns)
```
  id
  owner_id
  organization_id
  bucket_id
  name
  description
  amount
  frequency
  due_day
  next_due_date
  auto_pay
  is_active
  created_at
  updated_at
```

## Vendors

### `vendors` (13 columns)
```
  id
  owner_id
  name
  company
  email
  phone
  specialty
  notes
  created_at
  updated_at
  hourly_rate
  trade
  trades
```

### `vendor_users` (7 columns)
```
  id
  vendor_id
  user_id
  email
  invited_at
  accepted_at
  created_at
```

### `vendor_invitations` (6 columns)
```
  id
  organization_id
  vendor_id
  invited_by
  status
  created_at
```

### `vendor_catalog_prices` (13 columns)
```
  id
  owner_id
  vendor_id
  catalog_item_id
  price_request_id
  linked_vendor_catalog_id
  unit_cost
  custom_item_name
  custom_item_description
  custom_item_unit
  notes
  created_at
  updated_at
```

### `vendor_catalog_pricing` (9 columns)
```
  id
  owner_id
  catalog_item_id
  vendor_id
  unit_cost
  last_updated
  source_request_id
  notes
  created_at
```

### `vendor_price_requests` (11 columns)
```
  id
  name
  owner_id
  vendor_id
  description
  requested_items
  status
  submitted_at
  accepted_at
  created_at
  updated_at
```

### `vendor_price_list_requests` (9 columns)
```
  id
  owner_id
  vendor_id
  vendor_user_id
  status
  notes
  due_date
  created_at
  updated_at
```

### `vendor_price_list_items` (12 columns)
```
  id
  request_id
  catalog_item_id
  item_name
  item_description
  unit
  quantity_hint
  vendor_unit_cost
  vendor_notes
  linked_vendor_catalog_item_id
  created_at
  updated_at
```

### `bid_packages` (9 columns)
```
  id
  owner_id
  title
  job_id
  due_date
  status
  notes
  created_at
  updated_at
```

### `bid_package_items` (8 columns)
```
  id
  bid_package_id
  description
  quantity
  unit
  specs
  sort_order
  created_at
```

### `bid_package_vendors` (7 columns)
```
  id
  bid_package_id
  vendor_id
  status
  invited_at
  responded_at
  notes
```

### `bid_vendor_prices` (11 columns)
```
  id
  bid_package_id
  bid_package_item_id
  vendor_id
  unit_price
  total_price
  notes
  lead_time
  alternative_description
  submitted_at
  created_at
```

### `bid_requests` (19 columns)
```
  id
  owner_id
  vendor_id
  project_id
  client_id
  line_item_name
  line_item_description
  quantity
  unit
  requested_price
  vendor_submitted_price
  status
  notes
  contractor_notes
  submitted_at
  approved_at
  rejected_at
  created_at
  updated_at
```

### `work_orders` (20 columns)
```
  id
  wo_number
  owner_id
  organization_id
  vendor_id
  job_id
  client_id
  status
  scope_of_work
  start_date
  end_date
  subtotal
  total
  notes
  vendor_notes
  accepted_at
  completed_at
  share_token
  created_at
  updated_at
```

### `work_order_items` (12 columns)
```
  id
  work_order_id
  owner_id
  description
  quantity
  unit
  unit_cost
  total
  cost_code
  catalog_item_id
  sort_order
  created_at
```

### `supplier_integrations` (11 columns)
```
  id
  owner_id
  organization_id
  supplier_name
  account_number
  api_credentials
  is_active
  settings
  last_sync_at
  created_at
  updated_at
```

### `supplier_orders` (18 columns)
```
  id
  owner_id
  organization_id
  integration_id
  purchase_order_id
  job_id
  supplier_order_number
  status
  items
  subtotal
  tax
  shipping
  total
  tracking_number
  estimated_delivery
  submitted_at
  created_at
  updated_at
```

### `supplier_catalog_links` (17 columns)
```
  id
  owner_id
  catalog_item_id
  supplier_name
  supplier_sku
  supplier_url
  brand
  product_name
  specifications
  unit_cost
  unit
  in_stock
  last_scraped_at
  is_primary
  image_url
  created_at
  updated_at
```

## Workflows & Automation

### `workflows` (11 columns)
```
  id
  owner_id
  name
  description
  trigger_type
  trigger_conditions
  status
  is_template
  category
  created_at
  updated_at
```

### `workflow_actions` (12 columns)
```
  id
  workflow_id
  owner_id
  action_type
  action_config
  position_x
  position_y
  display_order
  parent_action_id
  condition_branch
  created_at
  updated_at
```

### `workflow_connections` (7 columns)
```
  id
  workflow_id
  owner_id
  source_action_id
  target_action_id
  connection_type
  created_at
```

### `workflow_runs` (9 columns)
```
  id
  workflow_id
  owner_id
  trigger_data
  status
  started_at
  completed_at
  error_message
  created_at
```

### `workflow_run_actions` (11 columns)
```
  id
  run_id
  action_id
  owner_id
  status
  input_data
  output_data
  error_message
  started_at
  completed_at
  created_at
```

### `approval_workflows` (8 columns)
```
  id
  owner_id
  name
  description
  entity_type
  is_active
  created_at
  updated_at
```

### `approval_workflow_steps` (10 columns)
```
  id
  workflow_id
  owner_id
  step_order
  approver_type
  approver_id
  approver_role
  auto_approve_threshold
  created_at
  updated_at
```

### `approval_requests` (12 columns)
```
  id
  workflow_id
  owner_id
  entity_type
  entity_id
  current_step
  status
  requested_by
  amount
  notes
  created_at
  updated_at
```

### `approval_step_responses` (9 columns)
```
  id
  request_id
  step_id
  owner_id
  approver_id
  decision
  comments
  decided_at
  created_at
```

### `automation_sequences` (14 columns)
```
  id
  name
  trigger_type
  owner_id
  organization_id
  description
  category
  status
  is_active
  trigger_conditions
  settings
  enrollment_count
  created_at
  updated_at
```

### `automation_sequence_steps` (12 columns)
```
  id
  sequence_id
  owner_id
  step_type
  step_order
  config
  step_name
  next_step_id
  position_x
  position_y
  created_at
  updated_at
```

### `automation_conditions` (10 columns)
```
  id
  owner_id
  step_id
  condition_type
  field
  operator
  value
  next_step_if_true
  next_step_if_false
  created_at
```

### `automation_enrollments` (13 columns)
```
  id
  sequence_id
  contact_id
  owner_id
  status
  current_step
  enrolled_at
  completed_at
  exit_reason
  next_step_at
  metadata
  created_at
  updated_at
```

### `automation_execution_log` (10 columns)
```
  id
  owner_id
  enrollment_id
  step_id
  executed_at
  status
  result
  error_message
  variant_id
  created_at
```

### `automation_step_metrics` (12 columns)
```
  id
  owner_id
  step_id
  sequence_id
  date
  executions
  successes
  failures
  opens
  clicks
  unsubscribes
  created_at
```

### `automation_goals` (11 columns)
```
  id
  owner_id
  sequence_id
  name
  goal_type
  conditions
  target_count
  achieved_count
  is_active
  created_at
  updated_at
```

### `automation_ab_variants` (13 columns)
```
  id
  owner_id
  step_id
  variant_name
  subject
  content_html
  weight
  sends
  opens
  clicks
  conversions
  is_winner
  created_at
```

### `zapier_webhooks` (11 columns)
```
  id
  owner_id
  organization_id
  name
  webhook_url
  trigger_event
  is_active
  last_triggered_at
  trigger_count
  created_at
  updated_at
```

## Marketing & Email

### `email_campaigns` (34 columns)
```
  id
  owner_id
  organization_id
  name
  subject
  from_name
  from_email
  content_html
  content_text
  status
  scheduled_at
  sent_at
  total_recipients
  sent_count
  opened_count
  clicked_count
  bounced_count
  unsubscribed_count
  created_at
  updated_at
  segment_id
  template_id
  ab_test_enabled
  ab_variant_b_subject
  ab_variant_b_content
  ab_test_size_percent
  ab_winner_criteria
  ab_winner_wait_hours
  ab_variant_a_opens
  ab_variant_b_opens
  ab_variant_a_clicks
  ab_variant_b_clicks
  ab_winning_variant
  timezone
```

### `email_campaign_recipients` (12 columns)
```
  id
  campaign_id
  contact_id
  email
  name
  status
  sent_at
  opened_at
  clicked_at
  resend_message_id
  owner_id
  ab_variant
```

### `email_templates` (15 columns)
```
  id
  owner_id
  template_type
  name
  subject_template
  header_text
  body_template
  footer_text
  primary_color
  secondary_color
  show_logo
  show_social_links
  is_default
  created_at
  updated_at
```

### `email_tracking_events` (9 columns)
```
  id
  campaign_id
  recipient_id
  event_type
  link_url
  ip_address
  user_agent
  created_at
  owner_id
```

### `email_bounces` (9 columns)
```
  id
  owner_id
  campaign_id
  recipient_email
  bounce_type
  bounce_reason
  bounce_code
  bounced_at
  created_at
```

### `email_health_metrics` (14 columns)
```
  id
  owner_id
  date
  emails_sent
  emails_delivered
  emails_bounced
  hard_bounces
  soft_bounces
  spam_complaints
  unsubscribes
  delivery_rate
  bounce_rate
  complaint_rate
  created_at
```

### `email_preferences` (7 columns)
```
  id
  contact_id
  owner_id
  preference_type
  is_subscribed
  updated_at
  created_at
```

### `email_domains` (12 columns)
```
  id
  owner_id
  domain
  verification_status
  dkim_verified
  spf_verified
  dmarc_verified
  verification_token
  verified_at
  last_checked_at
  created_at
  updated_at
```

### `campaign_templates` (10 columns)
```
  id
  owner_id
  name
  subject
  content_html
  category
  is_default
  thumbnail_url
  created_at
  updated_at
```

### `campaign_reports` (7 columns)
```
  id
  owner_id
  campaign_id
  report_type
  generated_at
  data
  created_at
```

### `campaign_url_templates` (11 columns)
```
  id
  owner_id
  name
  base_url
  utm_preset_id
  custom_params
  short_code
  click_count
  is_active
  created_at
  updated_at
```

### `campaign_url_clicks` (12 columns)
```
  id
  owner_id
  template_id
  clicked_at
  ip_address
  user_agent
  referrer
  country
  city
  device_type
  browser
  created_at
```

### `marketing_campaigns` (20 columns)
```
  id
  name
  campaign_type
  owner_id
  organization_id
  subject
  content
  html_content
  from_name
  from_email
  reply_to
  template_id
  status
  scheduled_at
  sent_at
  segment_filters
  settings
  stats
  created_at
  updated_at
```

### `marketing_campaign_recipients` (13 columns)
```
  id
  campaign_id
  owner_id
  contact_id
  email
  phone
  status
  sent_at
  opened_at
  clicked_at
  error_message
  metadata
  created_at
```

### `marketing_pages` (23 columns)
```
  id
  name
  slug
  owner_id
  organization_id
  page_type
  description
  content
  styling
  custom_css
  custom_js
  custom_domain
  meta_title
  meta_description
  og_image_url
  favicon_url
  form_id
  is_published
  published_at
  view_count
  conversion_count
  created_at
  updated_at
```

### `marketing_page_views` (14 columns)
```
  id
  page_id
  viewed_at
  visitor_id
  ip_address
  user_agent
  referrer_url
  browser
  os
  device_type
  utm_source
  utm_medium
  utm_campaign
  created_at
```

### `marketing_funnels` (10 columns)
```
  id
  owner_id
  name
  description
  stages
  goal_type
  goal_value
  is_active
  created_at
  updated_at
```

### `marketing_calendar_events` (15 columns)
```
  id
  owner_id
  title
  description
  event_type
  start_date
  end_date
  all_day
  color
  entity_type
  entity_id
  status
  recurrence_rule
  created_at
  updated_at
```

### `funnels` (12 columns)
```
  id
  name
  description
  owner_id
  organization_id
  domain
  favicon_url
  global_styles
  conversion_goal
  is_active
  created_at
  updated_at
```

### `funnel_pages` (17 columns)
```
  id
  name
  slug
  funnel_id
  owner_id
  organization_id
  page_type
  content
  custom_css
  custom_js
  seo_title
  seo_description
  og_image_url
  is_published
  published_at
  created_at
  updated_at
```

### `funnel_stage_entries` (10 columns)
```
  id
  owner_id
  funnel_id
  contact_id
  stage_key
  entered_at
  exited_at
  converted
  metadata
  created_at
```

### `utm_presets` (11 columns)
```
  id
  owner_id
  name
  source
  medium
  campaign
  term
  content
  is_default
  created_at
  updated_at
```

### `trigger_links` (19 columns)
```
  id
  name
  slug
  destination_url
  owner_id
  organization_id
  description
  trigger_workflow_id
  is_active
  click_count
  unique_click_count
  last_clicked_at
  utm_source
  utm_medium
  utm_campaign
  utm_content
  utm_term
  created_at
  updated_at
```

### `trigger_link_clicks` (16 columns)
```
  id
  trigger_link_id
  owner_id
  contact_id
  clicked_at
  visitor_id
  ip_address
  user_agent
  referrer_url
  browser
  os
  device_type
  country
  region
  city
  created_at
```

### `qr_codes` (12 columns)
```
  id
  name
  destination_url
  owner_id
  organization_id
  trigger_link_id
  qr_style
  is_active
  scan_count
  last_scanned_at
  created_at
  updated_at
```

### `qr_code_scans` (12 columns)
```
  id
  qr_code_id
  scanned_at
  ip_address
  user_agent
  browser
  os
  device_type
  country
  region
  city
  created_at
```

## Social Media

### `social_accounts` (17 columns)
```
  id
  owner_id
  organization_id
  platform
  account_name
  account_id
  profile_url
  avatar_url
  access_token
  refresh_token
  token_expires_at
  is_connected
  follower_count
  settings
  connected_at
  created_at
  updated_at
```

### `social_posts` (18 columns)
```
  id
  content
  platform
  owner_id
  organization_id
  account_id
  channel_connection_id
  status
  scheduled_at
  published_at
  platform_post_id
  page_id
  page_name
  link_url
  media_urls
  error_message
  created_at
  updated_at
```

### `social_post_metrics` (14 columns)
```
  id
  owner_id
  post_id
  recorded_at
  impressions
  reach
  likes
  comments
  shares
  saves
  clicks
  video_views
  engagement_rate
  created_at
```

### `social_content_calendar` (14 columns)
```
  id
  owner_id
  title
  description
  content_type
  platforms
  scheduled_date
  scheduled_time
  status
  assigned_to
  tags
  notes
  created_at
  updated_at
```

## Reviews & Reputation

### `reviews` (23 columns)
```
  id
  owner_id
  organization_id
  platform
  external_review_id
  reviewer_name
  reviewer_email
  reviewer_avatar_url
  rating
  content
  review_date
  response_content
  response_date
  responded_by
  status
  sentiment
  is_verified
  contact_id
  client_id
  job_id
  metadata
  created_at
  updated_at
```

### `review_requests` (18 columns)
```
  id
  owner_id
  template_id
  contact_id
  client_id
  job_id
  recipient_email
  recipient_name
  status
  sent_at
  opened_at
  clicked_at
  completed_at
  review_id
  metadata
  created_at
  updated_at
  campaign_id
```

### `review_request_campaigns` (14 columns)
```
  id
  owner_id
  name
  template_id
  status
  total_recipients
  sent_count
  opened_count
  clicked_count
  completed_count
  scheduled_at
  sent_at
  created_at
  updated_at
```

### `review_request_templates` (10 columns)
```
  id
  owner_id
  organization_id
  name
  subject
  body
  platform_links
  is_default
  created_at
  updated_at
```

### `review_response_templates` (9 columns)
```
  id
  owner_id
  organization_id
  name
  content
  category
  is_default
  created_at
  updated_at
```

### `review_response_suggestions` (10 columns)
```
  id
  owner_id
  review_id
  suggestion_type
  content
  sentiment_match
  rating_range_min
  rating_range_max
  is_used
  created_at
```

### `review_platform_connections` (11 columns)
```
  id
  owner_id
  platform
  platform_account_id
  platform_account_name
  is_connected
  credentials
  settings
  last_synced_at
  created_at
  updated_at
```

### `sender_reputation` (9 columns)
```
  id
  owner_id
  score
  score_factors
  last_calculated_at
  trend
  recommendations
  created_at
  updated_at
```

## Communication & Inbox

### `messages` (8 columns)
```
  id
  client_id
  sender_id
  sender_type
  content
  read_at
  email_sent
  created_at
```

### `notifications` (9 columns)
```
  id
  owner_id
  type
  title
  message
  entity_type
  entity_id
  read_at
  created_at
```

### `activity_logs` (9 columns)
```
  id
  owner_id
  activity_type
  entity_type
  entity_id
  entity_name
  description
  metadata
  created_at
```

### `conversations` (20 columns)
```
  id
  channel_type
  owner_id
  organization_id
  channel_connection_id
  client_id
  contact_id
  external_thread_id
  external_contact_id
  status
  is_starred
  is_archived
  is_inbound
  unread_count
  last_message_at
  last_message_preview
  assigned_to
  snoozed_until
  created_at
  updated_at
```

### `conversation_messages` (21 columns)
```
  id
  conversation_id
  owner_id
  direction
  sender_type
  content
  content_type
  sender_id
  sender_name
  external_message_id
  status
  sent_at
  delivered_at
  read_at
  media_urls
  metadata
  error_message
  call_duration_seconds
  call_recording_url
  call_transcription
  created_at
```

### `inbox_conversations` (20 columns)
```
  id
  channel_type
  owner_id
  organization_id
  channel_connection_id
  client_id
  contact_id
  subject
  status
  priority
  is_starred
  labels
  unread_count
  last_message_at
  last_message_preview
  external_thread_id
  assigned_to
  metadata
  created_at
  updated_at
```

### `inbox_messages` (20 columns)
```
  id
  conversation_id
  owner_id
  content
  direction
  sender_type
  sender_id
  sender_name
  sender_email
  sender_phone
  content_type
  status
  external_id
  attachments
  metadata
  ai_summary
  ai_sentiment
  ai_intent
  error_message
  created_at
```

### `inbox_templates` (13 columns)
```
  id
  name
  content
  owner_id
  organization_id
  subject
  category
  channel_types
  is_shared
  variables
  usage_count
  created_at
  updated_at
```

### `channel_connections` (12 columns)
```
  id
  channel_type
  channel_name
  owner_id
  organization_id
  is_connected
  connected_at
  expires_at
  credentials
  settings
  created_at
  updated_at
```

### `chat_widgets` (17 columns)
```
  id
  name
  owner_id
  organization_id
  ai_agent_id
  welcome_message
  offline_message
  pre_chat_form
  styling
  business_hours
  routing_type
  is_active
  embed_code
  allowed_domains
  ai_enabled
  created_at
  updated_at
```

## Dashboard & Analytics

### `dashboard_tiles` (10 columns)
```
  id
  owner_id
  tile_key
  title
  icon
  is_visible
  position
  target_view
  created_at
  updated_at
```

### `dashboard_layouts` (5 columns)
```
  id
  user_id
  layout
  created_at
  updated_at
```

### `custom_analytics_tiles` (17 columns)
```
  id
  owner_id
  organization_id
  dashboard_type
  name
  description
  tile_type
  config
  data_sources
  refresh_mode
  refresh_interval_seconds
  sort_order
  is_visible
  size
  ai_prompt
  created_at
  updated_at
```

### `analytics_tile_templates` (9 columns)
```
  id
  name
  description
  category
  tile_type
  config
  data_sources
  is_active
  created_at
```

### `custom_workspaces` (9 columns)
```
  id
  owner_id
  organization_id
  name
  nav_items
  is_shared
  sort_order
  created_at
  updated_at
```

## AI & DAEMON

### `ai_agents` (16 columns)
```
  id
  name
  agent_type
  description
  owner_id
  organization_id
  system_prompt
  model
  temperature
  max_tokens
  tools
  settings
  knowledge_base_ids
  is_active
  created_at
  updated_at
```

### `ai_agent_sessions` (10 columns)
```
  id
  agent_id
  owner_id
  title
  status
  message_count
  metadata
  ended_at
  created_at
  updated_at
```

### `ai_agent_messages` (11 columns)
```
  id
  session_id
  owner_id
  role
  content
  tokens_used
  model
  metadata
  tool_calls
  tool_results
  created_at
```

### `ai_knowledge_bases` (11 columns)
```
  id
  name
  description
  owner_id
  organization_id
  source_type
  document_count
  last_synced_at
  settings
  created_at
  updated_at
```

### `ai_knowledge_documents` (15 columns)
```
  id
  knowledge_base_id
  name
  content
  file_path
  file_type
  file_size
  chunk_count
  owner_id
  status
  error_message
  processed_at
  metadata
  created_at
  updated_at
```

### `daemon_conversations` (6 columns)
```
  id
  user_id
  messages
  status
  created_at
  updated_at
```

### `daemon_actions_log` (9 columns)
```
  id
  conversation_id
  user_id
  tool_name
  tool_input
  tool_output
  status
  duration_ms
  created_at
```

## Community & Beta

### `community_posts` (10 columns)
```
  id
  author_id
  title
  content
  category
  image_urls
  file_urls
  video_url
  created_at
  updated_at
```

### `community_comments` (7 columns)
```
  id
  post_id
  author_id
  content
  parent_comment_id
  created_at
  updated_at
```

### `community_reactions` (6 columns)
```
  id
  user_id
  post_id
  comment_id
  reaction_type
  created_at
```

### `bug_reports` (10 columns)
```
  id
  user_id
  route
  screenshot_url
  description
  status
  admin_notes
  created_at
  updated_at
  fix_notes
```

### `feature_requests` (9 columns)
```
  id
  user_id
  title
  description
  status
  admin_response
  is_high_priority
  created_at
  updated_at
```

### `bugzapper_credits` (10 columns)
```
  id
  user_id
  lifetime_purchase_id
  bugs_at_purchase
  bugs_current
  credit_amount
  credited_at
  status
  created_at
  updated_at
```

## Memberships & Billing

### `lifetime_membership_slots` (5 columns)
```
  id
  total_slots
  claimed_slots
  created_at
  updated_at
```

### `lifetime_purchases` (13 columns)
```
  id
  user_id
  email
  company_name
  contact_name
  amount_paid
  discount_applied
  discount_at_purchase
  bugs_at_purchase
  transaction_id
  status
  created_at
  updated_at
```

### `payment_processor_connections` (6 columns)
```
  id
  organization_id
  processor_type
  is_active
  created_at
  updated_at
```

### `organization_payment_connections` (10 columns)
```
  id
  organization_id
  processor_type
  api_key_encrypted
  account_id
  is_active
  is_test_mode
  metadata
  created_at
  updated_at
```

## Files & Storage

### `organization_files` (12 columns)
```
  id
  owner_id
  organization_id
  folder_id
  name
  original_name
  file_path
  file_size
  mime_type
  tags
  created_at
  updated_at
```

### `organization_folders` (9 columns)
```
  id
  owner_id
  organization_id
  parent_folder_id
  name
  description
  color
  created_at
  updated_at
```

### `client_files` (14 columns)
```
  id
  owner_id
  organization_id
  client_id
  folder_id
  name
  original_name
  file_path
  file_size
  mime_type
  is_client_visible
  tags
  created_at
  updated_at
```

### `client_folders` (11 columns)
```
  id
  owner_id
  organization_id
  client_id
  parent_folder_id
  name
  description
  color
  is_client_visible
  created_at
  updated_at
```

## Integrations

### `google_calendar_tokens` (8 columns)
```
  id
  user_id
  access_token
  refresh_token
  token_expires_at
  calendar_id
  created_at
  updated_at
```

### `google_calendar_settings` (9 columns)
```
  id
  user_id
  sync_enabled
  sync_tasks
  sync_milestones
  sync_appointments
  default_calendar_id
  created_at
  updated_at
```

### `google_calendar_sync` (8 columns)
```
  id
  user_id
  schedule_item_id
  google_event_id
  last_synced_at
  sync_direction
  created_at
  updated_at
```

### `outlook_connections` (14 columns)
```
  id
  owner_id
  organization_id
  user_email
  user_name
  calendar_id
  access_token
  refresh_token
  token_expires_at
  is_active
  sync_settings
  last_sync_at
  created_at
  updated_at
```

### `outlook_sync_log` (10 columns)
```
  id
  connection_id
  owner_id
  entity_type
  local_id
  outlook_id
  sync_direction
  status
  error_message
  synced_at
```

### `quickbooks_connections` (12 columns)
```
  id
  owner_id
  organization_id
  realm_id
  access_token
  refresh_token
  token_expires_at
  is_active
  last_sync_at
  sync_settings
  created_at
  updated_at
```

### `quickbooks_sync_log` (10 columns)
```
  id
  connection_id
  owner_id
  entity_type
  local_id
  qb_id
  sync_direction
  status
  error_message
  synced_at
```

### `quickbooks_sync_conflicts` (15 columns)
```
  id
  connection_id
  owner_id
  entity_type
  local_id
  qb_id
  field_name
  local_value
  qb_value
  status
  resolution
  resolution_notes
  created_at
  resolved_at
  resolved_by
```

### `xero_connections` (13 columns)
```
  id
  owner_id
  organization_id
  tenant_id
  tenant_name
  access_token
  refresh_token
  token_expires_at
  is_active
  sync_settings
  last_sync_at
  created_at
  updated_at
```

### `xero_sync_log` (10 columns)
```
  id
  connection_id
  owner_id
  entity_type
  local_id
  xero_id
  sync_direction
  status
  error_message
  synced_at
```

### `procore_connections` (13 columns)
```
  id
  owner_id
  organization_id
  company_id
  company_name
  access_token
  refresh_token
  token_expires_at
  is_active
  sync_settings
  last_sync_at
  created_at
  updated_at
```

### `procore_sync_log` (10 columns)
```
  id
  connection_id
  owner_id
  entity_type
  local_id
  procore_id
  sync_direction
  status
  error_message
  synced_at
```

### `jobtread_connections` (13 columns)
```
  id
  organization_id
  owner_id
  grant_key
  jobtread_organization_id
  jobtread_organization_name
  is_active
  last_sync_at
  sync_status
  sync_error
  auto_sync_enabled
  created_at
  updated_at
```

### `jobtread_sync_logs` (10 columns)
```
  id
  connection_id
  owner_id
  sync_type
  status
  items_synced
  items_failed
  error_details
  started_at
  completed_at
```

### `organization_integrations` (12 columns)
```
  id
  organization_id
  integration_type
  is_connected
  access_token
  refresh_token
  token_expires_at
  settings
  connected_at
  connected_by
  created_at
  updated_at
```

## Booking & Calendar

### `booking_calendars` (20 columns)
```
  id
  name
  slug
  owner_id
  organization_id
  description
  duration_minutes
  buffer_before_minutes
  buffer_after_minutes
  min_notice_hours
  max_days_ahead
  availability
  timezone
  is_active
  sync_to_google
  sync_to_outlook
  confirmation_type
  confirmation_message
  created_at
  updated_at
```

### `calendar_bookings` (19 columns)
```
  id
  calendar_id
  owner_id
  booker_name
  booker_email
  booker_phone
  scheduled_at
  duration_minutes
  timezone
  notes
  status
  contact_id
  google_event_id
  outlook_event_id
  cancelled_at
  cancellation_reason
  reminder_sent_at
  created_at
  updated_at
```

## Courses & Learning

### `courses` (17 columns)
```
  id
  owner_id
  organization_id
  name
  slug
  description
  thumbnail_url
  is_published
  is_free
  price
  estimated_duration_minutes
  difficulty_level
  tags
  certificate_enabled
  certificate_template
  created_at
  updated_at
```

### `course_modules` (9 columns)
```
  id
  owner_id
  course_id
  name
  description
  sort_order
  is_locked
  created_at
  updated_at
```

### `course_lessons` (12 columns)
```
  id
  owner_id
  module_id
  course_id
  name
  lesson_type
  content
  duration_minutes
  sort_order
  is_preview
  created_at
  updated_at
```

### `course_enrollments` (14 columns)
```
  id
  owner_id
  course_id
  student_email
  student_name
  contact_id
  enrolled_at
  completed_at
  progress_percentage
  certificate_issued_at
  certificate_url
  status
  created_at
  updated_at
```

### `lesson_progress` (11 columns)
```
  id
  owner_id
  enrollment_id
  lesson_id
  started_at
  completed_at
  quiz_score
  quiz_attempts
  time_spent_seconds
  created_at
  updated_at
```

## Contractor Directory

### `contractor_profiles` (23 columns)
```
  id
  business_name
  owner_id
  trade
  trades
  description
  city
  state_code
  zip_code
  license_number
  certifications
  years_in_business
  rating
  review_count
  portfolio_images
  is_visible_in_directory
  is_available_today
  available_until
  contact_email
  contact_phone
  contact_on_request
  created_at
  updated_at
```

### `contractor_service_areas` (10 columns)
```
  id
  owner_id
  area_type
  area_name
  center_lat
  center_lng
  radius_miles
  state_code
  created_at
  updated_at
```

### `contractor_reviews` (10 columns)
```
  id
  contractor_profile_id
  reviewer_id
  rating
  review_text
  project_type
  is_verified
  owner_id
  created_at
  updated_at
```

### `contractor_work_requests` (14 columns)
```
  id
  contractor_profile_id
  requester_id
  owner_id
  project_description
  trade_needed
  location
  preferred_start_date
  budget_range
  status
  notes
  responded_at
  created_at
  updated_at
```

## Warranties

### `warranties` (15 columns)
```
  id
  owner_id
  organization_id
  job_id
  client_id
  warranty_type
  title
  description
  start_date
  end_date
  coverage_details
  terms
  is_active
  created_at
  updated_at
```

### `warranty_claims` (14 columns)
```
  id
  warranty_id
  owner_id
  claim_number
  reported_date
  issue_description
  status
  resolution
  resolved_date
  cost_to_repair
  photos
  notes
  created_at
  updated_at
```

## Misc

### `user_drafts` (7 columns)
```
  id
  user_id
  draft_key
  draft_data
  created_at
  updated_at
  expires_at
```

### `ux_audit_runs` (18 columns)
```
  id
  triggered_by
  audit_type
  target_route
  target_viewport
  status
  summary
  findings_count
  critical_count
  auto_fix_count
  page_snapshot
  screenshot_url
  duration_ms
  ai_model
  ai_tokens_used
  error_message
  created_at
  completed_at
```

### `ux_audit_findings` (19 columns)
```
  id
  run_id
  severity
  category
  title
  description
  element_selector
  element_html
  current_value
  expected_value
  wcag_criterion
  screenshot_region
  fix_suggestion
  status
  fixed_by
  dismissed_reason
  created_at
  updated_at
  scope
```

## Uncategorized

### `intake_form_settings` (19 columns)
```
  id
  owner_id
  form_title
  form_subtitle
  success_message
  primary_color
  show_phone
  show_company
  show_project_type
  show_budget
  show_timeline
  show_address
  show_how_heard
  project_types
  budget_ranges
  timeline_options
  notify_email
  created_at
  updated_at
```

### `job_statuses` (9 columns)
```
  id
  owner_id
  name
  color
  display_order
  is_default
  is_system
  created_at
  updated_at
```

---

## RPC Functions (Server-Side)

- `check_course_enrollment`
- `get_change_order_for_signing`
- `get_client_by_portal_token`
- `get_client_contracts_by_portal_token`
- `get_client_estimates_by_email`
- `get_client_estimates_by_portal_token`
- `get_client_invoices_by_email`
- `get_client_invoices_by_portal_token`
- `get_client_jobs_by_email`
- `get_client_messages_by_portal_token`
- `get_client_proposals_by_email`
- `get_client_proposals_by_portal_token`
- `get_client_schedule_items_by_portal_token`
- `get_client_schedules_by_portal_token`
- `get_client_team_by_portal_token`
- `get_client_vendors_by_portal_token`
- `get_contract_for_signing`
- `get_contractor_info_by_portal_token`
- `get_course_curriculum`
- `get_lead_form_by_slug`
- `get_lien_waiver_for_signing`
- `get_org_payment_connection`
- `get_public_course`
- `get_student_courses`
- `get_user_organization_id`
- `has_active_subscription`
- `has_role`
- `is_admin`
- `is_org_member`
- `is_org_owner_or_admin`
- `is_super_admin`
- `is_valid_public_proposal`
- `is_vendor_user`
- `user_has_permission`
- `validate_portal_token`
- `validate_proposal_token`
- `validate_team_invite`

---

## Connection Details

```
Supabase Project: fazcslzmxbqcaabjjtuz
REST API:         https://fazcslzmxbqcaabjjtuz.supabase.co/rest/v1
Anon Key:         eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhemNzbHpteGJxY2FhYmpqdHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1OTMyOTksImV4cCI6MjA4NjE2OTI5OX0.NbNASPvUVmYSP6Y1e78zKjN_u1RBvK8utPS2xN6Gj6Q
```

---

*251 tables, 37 RPC functions, 3269 total columns*
---
