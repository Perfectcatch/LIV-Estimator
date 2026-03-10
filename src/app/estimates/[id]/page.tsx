"use client";

import { useState } from "react";
import {
  ChevronLeft, Eye, FileText, Save, MoreHorizontal, Plus, Trash2,
  Calculator, ChevronDown, ChevronRight, TrendingUp, DollarSign,
  Layers, Settings2, CheckCircle2, Circle,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────
interface LineItem {
  id: string; name: string; qty: number; unit: string;
  unitCost: number; markup: number; total: number;
}
interface Group { id: string; name: string; color: string; items: LineItem[] }

// ── Mock data ────────────────────────────────────────────────
const GROUPS: Group[] = [
  {
    id: "g1", name: "Base Pool Construction", color: "#6366f1",
    items: [
      { id: "i1", name: "Excavation & Haul Away",      qty: 48.5, unit: "CY",  unitCost: 45,    markup: 0.60, total: 3496 },
      { id: "i2", name: "Gunite Shell",                qty: 22.3, unit: "CY",  unitCost: 185,   markup: 0.60, total: 6600 },
      { id: "i3", name: "Rebar — #4 Steel",            qty: 42,   unit: "EA",  unitCost: 18.5,  markup: 0.60, total: 1240 },
      { id: "i4", name: "Plumbing Package",            qty: 1,    unit: "LS",  unitCost: 8400,  markup: 0.55, total: 15120 },
      { id: "i5", name: "Electrical & Bonding",        qty: 1,    unit: "LS",  unitCost: 3200,  markup: 0.55, total: 5760 },
    ],
  },
  {
    id: "g2", name: "Equipment Package", color: "#10b981",
    items: [
      { id: "i6", name: "Pentair IntelliFlo3 VS Pump", qty: 1, unit: "EA", unitCost: 1285, markup: 0.60, total: 3213 },
      { id: "i7", name: "Pentair Clean & Clear Filter",qty: 1, unit: "EA", unitCost: 860,  markup: 0.60, total: 2150 },
      { id: "i8", name: "IntelliCenter Automation",    qty: 1, unit: "EA", unitCost: 2100, markup: 0.55, total: 4667 },
      { id: "i9", name: "Pentair MasterTemp Heater",   qty: 1, unit: "EA", unitCost: 3400, markup: 0.55, total: 7567 },
    ],
  },
  {
    id: "g3", name: "Interior & Finishes", color: "#f59e0b",
    items: [
      { id: "ia", name: "Quartz Interior Finish",      qty: 450, unit: "SF", unitCost: 4.80, markup: 0.60, total: 5400 },
      { id: "ib", name: "Travertine Coping",           qty: 110, unit: "LF", unitCost: 22,   markup: 0.60, total: 6050 },
      { id: "ic", name: "Glass Tile Band",             qty: 110, unit: "LF", unitCost: 28,   markup: 0.60, total: 7700 },
      { id: "id", name: "LED Lighting Package",        qty: 2,   unit: "EA", unitCost: 680,  markup: 0.60, total: 2176 },
    ],
  },
];

const FINANCIAL = { cost: 55636, markup: 34364, total: 90000, tax: 0, margin: 0.382 };

const PAYMENT_SCHEDULE = [
  { label: "Deposit (10%)",         pct: 0.10, color: "#6366f1" },
  { label: "Shell Complete (45%)",  pct: 0.45, color: "#10b981" },
  { label: "Equipment Set (20%)",   pct: 0.20, color: "#f59e0b" },
  { label: "Final Completion (25%)",pct: 0.25, color: "#8b5cf6" },
];

const BUDGET_STAGES = [
  { name: "Permitting",      pct: 0 },
  { name: "Excavation",      pct: 0 },
  { name: "Steel & Rebar",   pct: 0 },
  { name: "Plumbing",        pct: 0 },
  { name: "Electrical",      pct: 0 },
  { name: "Shotcrete",       pct: 0 },
  { name: "Tile & Coping",   pct: 0 },
  { name: "Equipment",       pct: 0 },
  { name: "Interior Finish", pct: 0 },
  { name: "Startup",         pct: 0 },
];

const SELECTIONS: { cat: string; icon: string; options: { label: string; price: string }[] }[] = [
  { cat: "Interior Finish", icon: "🏊", options: [
    { label: "Standard White Plaster",      price: "Included" },
    { label: "Diamond Brite Quartz",        price: "+$2,400" },
    { label: "Pebble Tec Classic",          price: "+$4,800" },
    { label: "Pebble Tec Sheen",            price: "+$6,200" },
  ]},
  { cat: "Coping", icon: "🪨", options: [
    { label: "Bullnose Concrete",           price: "Included" },
    { label: "Travertine Natural",          price: "+$1,800" },
    { label: "Cantera Stone",              price: "+$3,200" },
    { label: "Custom Porcelain",            price: "+$4,600" },
  ]},
  { cat: "Equipment Tier", icon: "⚙️", options: [
    { label: "Base — Hayward",             price: "Included" },
    { label: "Standard — Pentair",         price: "+$1,400" },
    { label: "Premium — Pentair VS",       price: "+$3,200" },
    { label: "Ultra — IntelliCenter",      price: "+$5,800" },
  ]},
  { cat: "Sanitization", icon: "💧", options: [
    { label: "Traditional Chlorine",       price: "Included" },
    { label: "Salt Chlorine Generator",    price: "+$900" },
    { label: "UV + Salt Hybrid",           price: "+$1,600" },
    { label: "Ozone + Salt",               price: "+$2,400" },
  ]},
  { cat: "Automation", icon: "📱", options: [
    { label: "Manual Operation",           price: "Included" },
    { label: "Basic Timer",               price: "+$400" },
    { label: "IntelliConnect WiFi",        price: "+$1,200" },
    { label: "IntelliCenter Full",         price: "+$3,800" },
  ]},
  { cat: "Heating", icon: "🌡️", options: [
    { label: "No Heater",                  price: "Included" },
    { label: "Electric Heat Pump",         price: "+$3,400" },
    { label: "Natural Gas Heater",         price: "+$2,800" },
    { label: "Solar + Heat Pump",          price: "+$6,200" },
  ]},
  { cat: "Lighting", icon: "💡", options: [
    { label: "Single White LED",           price: "Included" },
    { label: "Color LED (2 light)",        price: "+$680" },
    { label: "Color LED + Landscape",      price: "+$1,800" },
    { label: "Full Entertainment Package", price: "+$4,200" },
  ]},
  { cat: "Spa Option", icon: "♨️", options: [
    { label: "Pool Only",                  price: "Included" },
    { label: "Attached Spa (6-person)",    price: "+$14,500" },
    { label: "Elevated Spillover Spa",     price: "+$18,400" },
    { label: "Detached Custom Spa",        price: "+$22,000" },
  ]},
];

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  draft:     { bg: "rgba(60,60,80,0.6)",   text: "#9090b0", dot: "#6060a0" },
  sent:      { bg: "rgba(37,99,235,0.15)", text: "#93c5fd", dot: "#3b82f6" },
  approved:  { bg: "rgba(16,185,129,0.15)",text: "#6ee7b7", dot: "#10b981" },
  rejected:  { bg: "rgba(239,68,68,0.15)", text: "#fca5a5", dot: "#ef4444" },
  converted: { bg: "rgba(139,92,246,0.15)",text: "#c4b5fd", dot: "#8b5cf6" },
};

const TABS = [
  { id: "scope",      label: "Scope",      icon: Layers },
  { id: "budget",     label: "Budget",     icon: DollarSign },
  { id: "selections", label: "Selections", icon: Settings2 },
  { id: "assembly",   label: "Assembly",   icon: Calculator },
];

// ── Sub-components ───────────────────────────────────────────

function GroupRow({ group }: { group: Group }) {
  const [open, setOpen] = useState(true);
  const groupTotal = group.items.reduce((s, i) => s + i.total, 0);

  return (
    <>
      <tr
        className="cursor-pointer select-none"
        onClick={() => setOpen(!open)}
        style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid #1e1e38" }}
      >
        <td colSpan={7} className="px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: group.color }} />
            {open
              ? <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#4a4a70" }} />
              : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#4a4a70" }} />
            }
            <span className="text-[12px] font-semibold tracking-wide text-white">{group.name}</span>
            <span className="text-[11px] ml-1" style={{ color: "#4a4a70" }}>({group.items.length} items)</span>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[12px] font-semibold text-white">{formatCurrency(groupTotal)}</span>
              <button
                onClick={(e) => { e.stopPropagation(); }}
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-white/[0.05]"
                style={{ color: "#4a4a70" }}
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
          </div>
        </td>
      </tr>
      {open && group.items.map((item, idx) => (
        <tr
          key={item.id}
          className="group/row transition-colors"
          style={{
            borderBottom: idx < group.items.length - 1 ? "1px solid rgba(30,30,56,0.8)" : "1px solid #1e1e38",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <td className="pl-10 pr-4 py-2.5 text-[13px]" style={{ color: "#c0c0e0" }}>{item.name}</td>
          <td className="px-3 py-2.5 text-right text-[13px] tabular-nums" style={{ color: "#7070a0" }}>{item.qty}</td>
          <td className="px-3 py-2.5 text-[12px]" style={{ color: "#50506a" }}>{item.unit}</td>
          <td className="px-3 py-2.5 text-right text-[13px] tabular-nums" style={{ color: "#7070a0" }}>{formatCurrency(item.unitCost)}</td>
          <td className="px-3 py-2.5 text-right text-[12px] tabular-nums">
            <span className="px-1.5 py-0.5 rounded" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>
              {(item.markup * 100).toFixed(0)}%
            </span>
          </td>
          <td className="px-3 py-2.5 text-right text-[13px] font-semibold tabular-nums text-white">{formatCurrency(item.total)}</td>
          <td className="px-3 py-2.5 w-8">
            <button className="opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer" style={{ color: "#3a3a58" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={e => (e.currentTarget.style.color = "#3a3a58")}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

function MarginBar({ margin }: { margin: number }) {
  const pct = Math.round(margin * 100);
  const color = pct >= 40 ? "#10b981" : pct >= 30 ? "#f59e0b" : "#ef4444";
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[11px] font-medium" style={{ color: "#606090" }}>Margin</span>
        <span className="text-[13px] font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────
export default function EstimateDetailPage({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState("scope");
  const [status, setStatus] = useState("approved");
  const [name, setName] = useState("Henderson Residence — 15×30 Pool");
  const [selections, setSelections] = useState<Record<string, number>>({
    "Interior Finish": 1, Coping: 1, "Equipment Tier": 2, Sanitization: 1,
    Automation: 2, Heating: 1, Lighting: 1, "Spa Option": 0,
  });

  const ss = STATUS_STYLES[status] ?? STATUS_STYLES.draft;

  return (
    <div className="flex flex-col h-full" style={{ background: "#0d0d1a" }}>

      {/* ── Header ── */}
      <div
        className="flex-shrink-0 px-5 py-3 flex items-center gap-4"
        style={{ background: "#0f0f22", borderBottom: "1px solid #1a1a32" }}
      >
        <Link
          href="/estimates"
          className="w-7 h-7 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors cursor-pointer hover:bg-white/[0.06]"
          style={{ color: "#3a3a58" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="bg-transparent text-[14px] font-semibold text-white focus:outline-none min-w-0 truncate"
              style={{ caretColor: "#6366f1" }}
            />
            {/* Status pill */}
            <button
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold flex-shrink-0 cursor-pointer transition-opacity hover:opacity-80"
              style={{ background: ss.bg, color: ss.text }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ss.dot }} />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: "#40406a" }}>
            James Henderson · Q2603-0001 · Created Mar 2026
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer hover:bg-white/[0.05]" style={{ color: "#6060a0" }}>
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <Link href={`/estimates/${params.id}/takeoff`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer hover:bg-white/[0.05]" style={{ color: "#6060a0" }}>
            <Calculator className="w-3.5 h-3.5" /> Takeoff
          </Link>
          <Link href={`/estimates/${params.id}/proposal`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer hover:bg-white/[0.05]" style={{ color: "#6060a0" }}>
            <FileText className="w-3.5 h-3.5" /> Proposal
          </Link>
          <button
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-all cursor-pointer hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}
          >
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-white/[0.05]" style={{ color: "#3a3a58" }}>
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        className="flex-shrink-0 px-5 flex items-center gap-0.5"
        style={{ background: "#0d0d1c", borderBottom: "1px solid #161628" }}
      >
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium border-b-2 transition-all duration-150 cursor-pointer",
              tab === id
                ? "border-indigo-500 text-indigo-300"
                : "border-transparent hover:text-slate-200"
            )}
            style={tab !== id ? { color: "#4a4a70" } : {}}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}

        {/* Breadcrumb links */}
        <div className="ml-auto flex items-center gap-1 pb-0.5">
          {[
            { label: "BOM", href: `/estimates/${params.id}/bom` },
            { label: "Pricing", href: `/estimates/${params.id}/pricing` },
            { label: "Change Orders", href: `/estimates/${params.id}/change-orders` },
          ].map(({ label, href }) => (
            <Link key={href} href={href}
              className="px-3 py-1 text-[11px] font-medium rounded-md transition-colors cursor-pointer hover:bg-white/[0.04]"
              style={{ color: "#35355a" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-hidden flex">

        {/* ══ SCOPE TAB ══ */}
        {tab === "scope" && (
          <>
            {/* Line items main area */}
            <div className="flex-1 overflow-auto p-5">
              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {["Spreadsheet", "Summary", "ACCEL"].map(v => (
                    <button key={v} className="px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer hover:bg-white/[0.05]" style={{ color: "#40406a" }}>{v}</button>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer hover:bg-white/[0.05]" style={{ color: "#5050808", border: "1px solid #1e1e38" }}>
                    <Plus className="w-3 h-3" /> Add Group
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer"
                    style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.18)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(99,102,241,0.12)")}
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e1e38" }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1e1e38", background: "rgba(255,255,255,0.02)" }}>
                      {[
                        { label: "Item",      align: "left",  cls: "pl-4" },
                        { label: "Qty",       align: "right", cls: "" },
                        { label: "Unit",      align: "left",  cls: "" },
                        { label: "Unit Cost", align: "right", cls: "" },
                        { label: "Markup",    align: "right", cls: "" },
                        { label: "Total",     align: "right", cls: "" },
                        { label: "",          align: "right", cls: "w-8" },
                      ].map((h, i) => (
                        <th key={i} className={cn("px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em]", h.cls, h.align === "right" ? "text-right" : "text-left")} style={{ color: "#35355a" }}>
                          {h.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {GROUPS.map(group => <GroupRow key={group.id} group={group} />)}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Right summary panel ── */}
            <div
              className="w-64 flex-shrink-0 flex flex-col overflow-auto p-4 gap-5"
              style={{ borderLeft: "1px solid #161628" }}
            >
              {/* Project card */}
              <div className="rounded-xl p-3.5" style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#4a4a6a" }}>Project</div>
                <div className="text-[13px] font-semibold text-white leading-tight">Henderson Residence</div>
                <div className="text-[11px] mt-0.5" style={{ color: "#5a5a80" }}>15×30 Freeform · Clearwater FL</div>
                <div className="mt-2.5 flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(16,185,129,0.12)", color: "#6ee7b7" }}>Approved</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc" }}>Q2603-0001</span>
                </div>
              </div>

              {/* Financial breakdown */}
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#35356a" }}>Financial Summary</div>
                <div className="space-y-2.5">
                  {[
                    { label: "Total Cost",  value: formatCurrency(FINANCIAL.cost),   dim: true },
                    { label: "Markup",      value: formatCurrency(FINANCIAL.markup),  dim: true },
                    { label: "Tax (0%)",    value: "$0.00",                            dim: true },
                  ].map(({ label, value, dim }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-[12px]" style={{ color: "#40406a" }}>{label}</span>
                      <span className="text-[12px] tabular-nums" style={{ color: dim ? "#6060a0" : "#e0e0f8" }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div className="my-3 h-px" style={{ background: "#1a1a32" }} />

                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-white">Grand Total</span>
                  <span className="text-[18px] font-bold" style={{ color: "#a5b4fc" }}>{formatCurrency(FINANCIAL.total)}</span>
                </div>

                <div className="mt-3">
                  <MarginBar margin={FINANCIAL.margin} />
                </div>
              </div>

              {/* Payment schedule */}
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#35356a" }}>Payment Schedule</div>
                <div className="space-y-2">
                  {PAYMENT_SCHEDULE.map(({ label, pct, color }) => (
                    <div key={label} className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="text-[11px] truncate" style={{ color: "#50507a" }}>{label}</span>
                      </div>
                      <span className="text-[12px] font-semibold tabular-nums flex-shrink-0" style={{ color: "#8080b0" }}>
                        {formatCurrency(FINANCIAL.total * pct)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stacked bar */}
                <div className="mt-3 flex h-2 rounded-full overflow-hidden gap-0.5">
                  {PAYMENT_SCHEDULE.map(({ label, pct, color }) => (
                    <div key={label} className="h-full rounded-sm" style={{ width: `${pct * 100}%`, background: color }} />
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest mb-2.5" style={{ color: "#35356a" }}>Quick Actions</div>
                <div className="space-y-1">
                  {[
                    { label: "View Full BOM",         href: `/estimates/${params.id}/bom` },
                    { label: "Open Pricing Hub",      href: `/estimates/${params.id}/pricing` },
                    { label: "Generate Proposal",     href: `/estimates/${params.id}/proposal` },
                    { label: "Create Purchase Orders",href: `/estimates/${params.id}/purchase-orders` },
                  ].map(({ label, href }) => (
                    <Link key={href} href={href}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-[12px] font-medium transition-colors cursor-pointer group/link"
                      style={{ color: "#50508a" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLElement).style.color = "#c0c0e0"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#50508a"; }}
                    >
                      {label}
                      <ChevronRight className="w-3 h-3 opacity-50" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══ BUDGET TAB ══ */}
        {tab === "budget" && (
          <div className="flex-1 overflow-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[14px] font-semibold text-white">Budget Tracking</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "#40406a" }}>Cost by construction stage · No BOM generated yet</p>
              </div>
              <Link href={`/estimates/${params.id}/bom`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer"
                style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                <TrendingUp className="w-3.5 h-3.5" /> View Full BOM
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BUDGET_STAGES.map((stage, i) => (
                <div key={stage.name} className="rounded-xl p-4 transition-colors" style={{ background: "#111124", border: "1px solid #1a1a32" }}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold tabular-nums" style={{ color: "#2e2e4a" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] font-medium text-white">{stage.name}</span>
                    </div>
                    <span className="text-[11px] font-medium" style={{ color: "#3a3a58" }}>—</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${stage.pct}%` }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px]" style={{ color: "#2e2e48" }}>Estimated</span>
                    <span className="text-[10px]" style={{ color: "#2e2e48" }}>$0 / $0</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl p-5 text-center" style={{ background: "#0f0f22", border: "1px dashed #252540" }}>
              <Calculator className="w-8 h-8 mx-auto mb-2" style={{ color: "#2a2a48" }} />
              <p className="text-[13px] font-medium" style={{ color: "#4a4a70" }}>Run Takeoff to auto-populate budget</p>
              <p className="text-[11px] mt-1 mb-4" style={{ color: "#30305a" }}>
                Pool dimensions → BOM explosion → stage cost breakdown
              </p>
              <Link href={`/estimates/${params.id}/takeoff`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-all cursor-pointer hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.25)" }}
              >
                <Calculator className="w-4 h-4" /> Run Takeoff
              </Link>
            </div>
          </div>
        )}

        {/* ══ SELECTIONS TAB ══ */}
        {tab === "selections" && (
          <div className="flex-1 overflow-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[14px] font-semibold text-white">Client Selections</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "#40406a" }}>8 option categories · Upgrades affect BOM & pricing</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[12px] font-medium" style={{ color: "#606090" }}>
                  Upgrades total:
                </div>

                <div className="text-[14px] font-bold" style={{ color: "#a5b4fc" }}>
                  {formatCurrency(
                    SELECTIONS.reduce((sum, sel) => {
                      const opt = sel.options[selections[sel.cat] ?? 0];
                      const price = opt?.price.replace(/[^0-9]/g, "") ?? "0";
                      return sum + (opt?.price.startsWith("+") ? parseInt(price) : 0);
                    }, 0)
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {SELECTIONS.map(sel => (
                <div key={sel.cat} className="rounded-xl overflow-hidden" style={{ background: "#0f0f22", border: "1px solid #1a1a32" }}>
                  <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: "1px solid #161630" }}>
                    <span className="text-[15px]">{sel.icon}</span>
                    <span className="text-[13px] font-semibold text-white">{sel.cat}</span>
                    {selections[sel.cat] !== undefined && selections[sel.cat] > 0 && (
                      <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc" }}>
                        Upgraded
                      </span>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    {sel.options.map((opt, i) => {
                      const active = (selections[sel.cat] ?? 0) === i;
                      return (
                        <label
                          key={opt.label}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150"
                          style={{
                            background: active ? "rgba(99,102,241,0.1)" : "transparent",
                            border: `1px solid ${active ? "rgba(99,102,241,0.25)" : "transparent"}`,
                          }}
                          onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                          onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                          <input
                            type="radio"
                            name={sel.cat}
                            checked={active}
                            onChange={() => setSelections(prev => ({ ...prev, [sel.cat]: i }))}
                            className="sr-only"
                          />
                          {active
                            ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#6366f1" }} />
                            : <Circle className="w-4 h-4 flex-shrink-0" style={{ color: "#252545" }} />
                          }
                          <span className={cn("text-[12px] font-medium flex-1", active ? "text-white" : "")} style={!active ? { color: "#50508a" } : {}}>
                            {opt.label}
                          </span>
                          <span className={cn("text-[11px] font-semibold tabular-nums flex-shrink-0", opt.price === "Included" ? "" : "")}
                            style={{ color: opt.price === "Included" ? "#10b981" : active ? "#a5b4fc" : "#3a3a5a" }}>
                            {opt.price}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ASSEMBLY TAB ══ */}
        {tab === "assembly" && (
          <div className="flex-1 overflow-auto p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[14px] font-semibold text-white">4-Tier Catalog Assembly</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "#40406a" }}>SKU → Kit → Assembly → Super-Assembly</p>
              </div>
              <Link href={`/estimates/${params.id}/takeoff`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer"
                style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                <Calculator className="w-3.5 h-3.5" /> Run Takeoff
              </Link>
            </div>

            {/* Tier legend */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { tier: "T3", label: "Super-Assembly", count: "3", color: "#6366f1", desc: "Proposal sections" },
                { tier: "T2", label: "Assembly",        count: "13", color: "#10b981", desc: "Customer line items" },
                { tier: "T1", label: "Kit",             count: "30", color: "#f59e0b", desc: "Vendor bundles" },
                { tier: "T0", label: "SKU",             count: "428", color: "#8b5cf6", desc: "Purchasable items" },
              ].map(({ tier, label, count, color, desc }) => (
                <div key={tier} className="rounded-xl p-3.5" style={{ background: "#0f0f22", border: "1px solid #1a1a32" }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${color}20`, color }}>{tier}</span>
                    <span className="text-[12px] font-semibold text-white">{label}</span>
                  </div>
                  <div className="text-[20px] font-bold" style={{ color }}>{count}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "#35356a" }}>{desc}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-8 text-center" style={{ background: "#0a0a18", border: "1px dashed #1e1e38" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <Calculator className="w-6 h-6" style={{ color: "#4040608" }} />
              </div>
              <p className="text-[14px] font-semibold text-white mb-1.5">No BOM Generated Yet</p>
              <p className="text-[12px] mb-5 max-w-sm mx-auto" style={{ color: "#35356a" }}>
                Enter pool dimensions in the Takeoff module to auto-explode the full Bill of Materials through the 4-tier catalog hierarchy.
              </p>
              <Link href={`/estimates/${params.id}/takeoff`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all cursor-pointer hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.3)" }}
              >
                <Calculator className="w-4 h-4" /> Open Takeoff Calculator
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
