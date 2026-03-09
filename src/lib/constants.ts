// ============================================================
// COMPANY
// ============================================================
export const COMPANY = {
  name: "LIV Pools LLC",
  license: "CPC1459998",
  phone: "(727) 555-0100",
  email: "info@livpools.com",
  cityStateZip: "Clearwater, FL 34619",
} as const;

// ============================================================
// ESTIMATE
// ============================================================
export const ESTIMATE_STATUSES = ["draft", "sent", "approved", "rejected", "converted"] as const;
export type EstimateStatusConst = typeof ESTIMATE_STATUSES[number];

export const ESTIMATE_STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  approved: "Approved",
  rejected: "Rejected",
  converted: "Converted",
};

export const ESTIMATE_STATUS_COLORS: Record<string, string> = {
  draft: "bg-zinc-700 text-zinc-200",
  sent: "bg-blue-900 text-blue-200",
  approved: "bg-green-900 text-green-200",
  rejected: "bg-red-900 text-red-200",
  converted: "bg-purple-900 text-purple-200",
};

// ============================================================
// JOBS
// ============================================================
export const JOB_STATUSES = ["pending", "in_progress", "on_hold", "complete", "cancelled"] as const;
export const JOB_STATUS_COLORS: Record<string, string> = {
  pending: "bg-zinc-700 text-zinc-200",
  in_progress: "bg-blue-900 text-blue-200",
  on_hold: "bg-yellow-900 text-yellow-200",
  complete: "bg-green-900 text-green-200",
  cancelled: "bg-red-900 text-red-200",
};

// ============================================================
// CATALOG
// ============================================================
export const ITEM_CATEGORIES = ["materials", "labor", "equipment", "overhead", "other"] as const;
export type ItemCategoryConst = typeof ITEM_CATEGORIES[number];

export const ITEM_CATEGORY_LABELS: Record<string, string> = {
  materials: "Materials",
  labor: "Labor",
  equipment: "Equipment",
  overhead: "Overhead",
  other: "Other",
};

export const VENDOR_CATEGORIES = ["SUPPLIER", "SUBCONTRACTOR"] as const;

// ============================================================
// POOL SELECTIONS
// ============================================================
export const SELECTION_CATEGORIES = [
  "INTERIOR_FINISH",
  "COPING",
  "EQUIPMENT",
  "SANITIZATION",
  "AUTOMATION",
  "HEATING",
  "LIGHTING",
  "SPA",
] as const;

export const SELECTION_OPTIONS = {
  INTERIOR_FINISH: [
    { index: 0, name: "Standard Plaster",  costDelta: 0,     notes: "White plaster — entry level" },
    { index: 1, name: "Quartz Finish",      costDelta: 3.60,  notes: "Quartz blend — most popular" },
    { index: 2, name: "Pebble Tec",         costDelta: 8.30,  notes: "Pebble aggregate — premium" },
    { index: 3, name: "Pebble Sheen",       costDelta: 10.50, notes: "Fine pebble — luxury option" },
  ],
  COPING: [
    { index: 0, name: "Travertine 12x12",      costDelta: 0,   notes: "Standard travertine" },
    { index: 1, name: "Travertine 12x24",      costDelta: 10,  notes: "Larger format — per LF" },
    { index: 2, name: "Cantilever Concrete",   costDelta: -5,  notes: "Poured cantilever coping" },
    { index: 3, name: "Natural Bullnose Tile", costDelta: 15,  notes: "Porcelain bullnose" },
  ],
  EQUIPMENT: [
    { index: 0, name: "Pentair IntelliFlo3 1.5HP", costDelta: 0,   notes: "Standard VS pump" },
    { index: 1, name: "Pentair IntelliFlo3 2.0HP", costDelta: 130, notes: "High flow" },
    { index: 2, name: "Jandy JEP VS 1.85HP",      costDelta: -30, notes: "Alt brand" },
    { index: 3, name: "Hayward MaxFlo VS 1.65HP",  costDelta: -50, notes: "Budget VS pump" },
  ],
  SANITIZATION: [
    { index: 0, name: "Chlorine Only (no SWG)", costDelta: 0,    notes: "Traditional chlorine" },
    { index: 1, name: "Salt System IC40",       costDelta: 620,  notes: "Pentair IntelliChlor IC40" },
    { index: 2, name: "Salt System IC60",       costDelta: 820,  notes: "IC60 — larger pools" },
    { index: 3, name: "UV + Salt Combo",        costDelta: 1100, notes: "UV sanitizer + IC40" },
  ],
  AUTOMATION: [
    { index: 0, name: "Manual Controls",       costDelta: 0,    notes: "Timer + basic switches" },
    { index: 1, name: "Pentair IntelliCenter",  costDelta: 1850, notes: "Full automation" },
    { index: 2, name: "Jandy iAqualink",        costDelta: 1650, notes: "Alt automation system" },
    { index: 3, name: "Hayward OmniLogic",      costDelta: 1750, notes: "Alt automation system" },
  ],
  HEATING: [
    { index: 0, name: "No Heater",              costDelta: 0,    notes: "Unheated pool" },
    { index: 1, name: "Heat Pump 110k BTU",     costDelta: 2400, notes: "Hayward HeatPro — efficient" },
    { index: 2, name: "Heat Pump 140k BTU",     costDelta: 2900, notes: "Larger pools" },
    { index: 3, name: "Gas Heater 400k BTU",    costDelta: 1800, notes: "Fast heat — higher operating cost" },
  ],
  LIGHTING: [
    { index: 0, name: "No Lights",              costDelta: 0,   notes: "Unlit pool" },
    { index: 1, name: "1 LED Light",            costDelta: 285, notes: "Single color-changing LED" },
    { index: 2, name: "2 LED Lights",           costDelta: 570, notes: "Two lights — larger pools" },
    { index: 3, name: "2 LED + Spa Light",      costDelta: 855, notes: "Full lighting package" },
  ],
  SPA: [
    { index: 0, name: "Pool Only",              costDelta: 0,     notes: "No attached spa" },
    { index: 1, name: "Attached Spa (6x8)",     costDelta: 8500,  notes: "Standard attached spa" },
    { index: 2, name: "Attached Spa (8x8)",     costDelta: 10500, notes: "Larger spa — seats 6-8" },
    { index: 3, name: "Raised Spillway Spa",    costDelta: 12000, notes: "Raised spa with spillway" },
  ],
} as const;

// ============================================================
// CONSTRUCTION STAGES
// ============================================================
export const CONSTRUCTION_STAGES = [
  { num: 1,  name: "Pre-Construction" },
  { num: 2,  name: "Excavation" },
  { num: 3,  name: "Steel & Rebar" },
  { num: 4,  name: "Plumbing" },
  { num: 5,  name: "Electrical" },
  { num: 6,  name: "Shotcrete Shell" },
  { num: 7,  name: "Tile & Coping" },
  { num: 8,  name: "Equipment Set" },
  { num: 9,  name: "Interior Finish" },
  { num: 10, name: "Startup & Closeout" },
] as const;

// ============================================================
// FINANCE
// ============================================================
export const PAYMENT_MILESTONES = [
  { key: "deposit",   label: "Deposit",          pct: 0.10 },
  { key: "shell",     label: "Shell Complete",    pct: 0.45 },
  { key: "equipment",label: "Equipment Set",      pct: 0.20 },
  { key: "final",    label: "Final / Completion", pct: 0.25 },
] as const;

// ============================================================
// COMMUNITY
// ============================================================
export const COMMUNITY_CATEGORIES = [
  "all", "tips", "showcase", "help", "discussion", "announcements",
] as const;

// ============================================================
// NAVIGATION
// ============================================================
export const NAV_CORE = [
  { href: "/",        label: "Dashboard",    icon: "LayoutDashboard" },
  { href: "/clients", label: "Customers",    icon: "Users" },
  { href: "/jobs",    label: "Jobs",         icon: "Briefcase" },
  { href: "/agent",   label: "OVERMIND",     icon: "Brain" },
] as const;

export const NAV_WORK = [
  { href: "/estimates",    label: "Estimates",   icon: "FileText" },
  { href: "/tasks",        label: "Tasks",       icon: "CheckSquare" },
  { href: "/schedules",    label: "Schedules",   icon: "Calendar" },
  { href: "/bim",          label: "BIM",         icon: "Box" },
  { href: "/daily-logs",   label: "Daily Logs",  icon: "BookOpen" },
  { href: "/specifications",label: "Specs",       icon: "FileCode" },
  { href: "/time",         label: "Time",        icon: "Clock" },
] as const;

export const NAV_FINANCE = [
  { href: "/expenses",     label: "Expenses",     icon: "Receipt" },
  { href: "/cashflow",     label: "Cash Flow",    icon: "TrendingUp" },
  { href: "/planner",      label: "Planner",      icon: "PieChart" },
  { href: "/analytics",    label: "Analytics",    icon: "BarChart2" },
  { href: "/lien-waivers", label: "Lien Waivers", icon: "Shield" },
  { href: "/invoices",     label: "Invoices",     icon: "DollarSign" },
] as const;

export const NAV_SYSTEM = [
  { href: "/catalog",    label: "Catalog",     icon: "Database" },
  { href: "/files",      label: "Files",       icon: "Folder" },
  { href: "/contracts",  label: "Contracts",   icon: "PenLine" },
  { href: "/team",       label: "Team",        icon: "UserCog" },
  { href: "/directory",  label: "Directory",   icon: "Search" },
  { href: "/workflows",  label: "Workflows",   icon: "Zap" },
  { href: "/community",  label: "Community",   icon: "MessageCircle" },
  { href: "/settings",   label: "Settings",    icon: "Settings" },
] as const;
