"use client";

import { useState } from "react";
import { ChevronLeft, Eye, Presentation, Save, MoreHorizontal, Plus, Trash2, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TABS = ["Scope", "Budget", "Assembly", "Selections"];

const STATUS_OPTIONS = ["draft", "sent", "approved", "rejected", "converted"];

const mockLineItems = [
  { id: "g1", type: "group",  name: "Base Pool Construction", items: [
    { id: "i1", name: "Excavation & Haul", qty: 48.5, unit: "CY",  unitCost: 45,   markup: 0.60, total: 3496 },
    { id: "i2", name: "Gunite Shell",      qty: 22.3, unit: "CY",  unitCost: 185,  markup: 0.60, total: 6600 },
    { id: "i3", name: "Rebar — #4 Steel",  qty: 42,   unit: "EA",  unitCost: 18.5, markup: 0.60, total: 1240 },
    { id: "i4", name: "Plumbing Package",  qty: 1,    unit: "LS",  unitCost: 8400, markup: 0.55, total: 15120 },
  ]},
  { id: "g2", type: "group",  name: "Equipment Package", items: [
    { id: "i5", name: "Pentair IntelliFlo3 VS Pump", qty: 1, unit: "EA", unitCost: 1285, markup: 0.60, total: 3213 },
    { id: "i6", name: "Pentair Clean & Clear Filter", qty: 1, unit: "EA", unitCost: 860,  markup: 0.60, total: 2150 },
    { id: "i7", name: "IntelliCenter Automation",     qty: 1, unit: "EA", unitCost: 2100, markup: 0.55, total: 4667 },
  ]},
  { id: "g3", type: "group",  name: "Interior & Finishes", items: [
    { id: "i8", name: "Quartz Interior Finish", qty: 450, unit: "SF", unitCost: 4.80, markup: 0.60, total: 5400 },
    { id: "i9", name: "Travertine Coping",       qty: 110, unit: "LF", unitCost: 22,   markup: 0.60, total: 6050 },
    { id: "ia", name: "Glass Tile Band",          qty: 110, unit: "LF", unitCost: 28,   markup: 0.60, total: 7700 },
  ]},
];

const financial = {
  subtotal: 55636,
  markup:   34364,
  total:    87500,
  taxRate:  0,
  tax:      0,
  margin:   0.393,
};

interface LineItem { id: string; name: string; qty: number; unit: string; unitCost: number; markup: number; total: number }
interface Group { id: string; type: string; name: string; items: LineItem[] }

function LineRow({ item }: { item: LineItem }) {
  return (
    <tr className="hover:bg-white/3 transition-colors border-b border-[#2a2a4a]/30 last:border-0">
      <td className="pl-8 pr-4 py-2.5 text-sm text-slate-300">{item.name}</td>
      <td className="px-3 py-2.5 text-right text-sm text-slate-400">{item.qty}</td>
      <td className="px-3 py-2.5 text-sm text-slate-500">{item.unit}</td>
      <td className="px-3 py-2.5 text-right text-sm text-slate-400">{formatCurrency(item.unitCost)}</td>
      <td className="px-3 py-2.5 text-right text-sm text-slate-400">{(item.markup * 100).toFixed(0)}%</td>
      <td className="px-3 py-2.5 text-right text-sm font-medium text-white">{formatCurrency(item.total)}</td>
      <td className="px-3 py-2.5">
        <button className="text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
      </td>
    </tr>
  );
}

export default function EstimateDetailPage({ params }: { params: { id: string } }) {
  const [tab, setTab] = useState("Scope");
  const [status, setStatus] = useState("approved");
  const [name, setName] = useState("Henderson Residence — 15x30 Pool");

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="bg-[#16213e] border-b border-[#2a2a4a] px-6 py-3 flex items-center gap-4">
        <Link href="/estimates" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent text-white font-semibold text-sm focus:outline-none border-b border-transparent focus:border-indigo-500 transition-colors pr-2 min-w-0 flex-1"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={cn(
                "text-[11px] px-2 py-0.5 rounded-full font-medium border-0 outline-none cursor-pointer capitalize",
                status === "draft"     ? "bg-zinc-800 text-zinc-300" :
                status === "sent"      ? "bg-blue-900/50 text-blue-300" :
                status === "approved"  ? "bg-green-900/50 text-green-300" :
                status === "rejected"  ? "bg-red-900/50 text-red-300" :
                                         "bg-purple-900/50 text-purple-300"
              )}
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">James Henderson · Q2603-0001</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
            <Eye className="w-3.5 h-3.5" /> Review
          </button>
          <a href={`/estimates/${params.id}/takeoff`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
            <Calculator className="w-3.5 h-3.5" /> Takeoff
          </a>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
            <Presentation className="w-3.5 h-3.5" /> Presentation
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
            <Save className="w-3.5 h-3.5" /> Save
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#16213e] border-b border-[#2a2a4a] px-6 flex gap-1">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("px-4 py-2.5 text-sm border-b-2 transition-colors",
              tab === t ? "border-indigo-500 text-white font-medium" : "border-transparent text-slate-400 hover:text-slate-200")}>
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto flex gap-0">
        {tab === "Scope" && (
          <>
            {/* Line Items */}
            <div className="flex-1 overflow-auto p-4">
              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-4">
                {["Spreadsheet","ACCEL","Stream","BLACKLEDGER","Summary"].map((v) => (
                  <button key={v} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-400 transition-colors">{v}</button>
                ))}
                <div className="ml-auto flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors">
                    <Plus className="w-3 h-3" /> Add Group
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-xs text-indigo-300 transition-colors">
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>
              </div>

              <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2a2a4a] text-[11px] text-slate-500 uppercase tracking-wider">
                      <th className="text-left px-4 py-2.5 font-medium">Item</th>
                      <th className="text-right px-3 py-2.5 font-medium">Qty</th>
                      <th className="text-left px-3 py-2.5 font-medium">Unit</th>
                      <th className="text-right px-3 py-2.5 font-medium">Unit Cost</th>
                      <th className="text-right px-3 py-2.5 font-medium">Markup</th>
                      <th className="text-right px-3 py-2.5 font-medium">Total</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {(mockLineItems as Group[]).map((group) => (
                      <>
                        <tr key={group.id} className="bg-white/3 border-b border-[#2a2a4a]">
                          <td colSpan={7} className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white uppercase tracking-wide">{group.name}</span>
                              <button className="text-slate-600 hover:text-indigo-400 ml-2"><Plus className="w-3 h-3" /></button>
                            </div>
                          </td>
                        </tr>
                        {group.items.map((item) => <LineRow key={item.id} item={item} />)}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary Panel */}
            <div className="w-64 flex-shrink-0 border-l border-[#2a2a4a] p-4 space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Financial Summary</h3>
              <div className="space-y-2">
                {[
                  { label: "Total Cost",  value: formatCurrency(financial.subtotal), muted: true },
                  { label: "Markup",      value: formatCurrency(financial.markup),   muted: true },
                  { label: "Subtotal",    value: formatCurrency(financial.total - financial.tax), muted: false },
                  { label: "Tax (0%)",    value: "$0.00",                             muted: true },
                  { label: "Margin",      value: `${(financial.margin * 100).toFixed(1)}%`, muted: false },
                ].map(({ label, value, muted }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className={muted ? "text-slate-300" : "text-white font-semibold"}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2a2a4a] pt-3">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-white">Grand Total</span>
                  <span className="text-lg font-bold text-indigo-300">{formatCurrency(financial.total)}</span>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Payment Schedule</div>
                {[
                  { label: "Deposit (10%)",           amt: 8750 },
                  { label: "Shell Complete (45%)",     amt: 39375 },
                  { label: "Equipment Set (20%)",      amt: 17500 },
                  { label: "Final Completion (25%)",   amt: 21875 },
                ].map(({ label, amt }) => (
                  <div key={label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-slate-300">{formatCurrency(amt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "Budget" && (
          <div className="p-6 w-full">
            <p className="text-slate-400 text-sm mb-4">Budget tracking by cost code. <a href={`/estimates/${params.id}/bom`} className="text-indigo-400 hover:underline">View full BOM →</a></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Permitting","Excavation","Steel & Rebar","Plumbing","Electrical","Shotcrete","Tile & Coping","Equipment","Interior Finish","Startup"].map((stage) => (
                <div key={stage} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-white">{stage}</span>
                    <span className="text-xs text-slate-400">—</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full"><div className="h-full bg-indigo-500 rounded-full w-0" /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "Assembly" && (
          <div className="p-6 w-full">
            <p className="text-slate-400 text-sm mb-4">4-tier pool catalog hierarchy. Run takeoff to auto-populate BOM. <a href={`/estimates/${params.id}/takeoff`} className="text-indigo-400 hover:underline">Go to Takeoff →</a></p>
            <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-6 text-center">
              <Calculator className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
              <p className="text-white font-medium mb-1">No BOM generated yet</p>
              <p className="text-slate-400 text-sm mb-4">Enter pool dimensions in Takeoff to auto-generate the full Bill of Materials from the 4-tier SKU→Kit→Assembly→SuperAssembly catalog.</p>
              <a href={`/estimates/${params.id}/takeoff`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
                <Calculator className="w-4 h-4" /> Run Takeoff
              </a>
            </div>
          </div>
        )}

        {tab === "Selections" && (
          <div className="p-6 w-full">
            <p className="text-slate-400 text-sm mb-4">Client upgrade selections — 8 pool option categories</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Interior Finish","Coping","Equipment","Sanitization","Automation","Heating","Lighting","Spa"].map((cat) => (
                <div key={cat} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
                  <div className="text-sm font-semibold text-white mb-3">{cat}</div>
                  <div className="space-y-2">
                    {["Option 1 — Base","Option 2 — Standard","Option 3 — Premium","Option 4 — Luxury"].map((opt, i) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={cat} defaultChecked={i === 1} className="accent-indigo-500" />
                        <span className="text-sm text-slate-300">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
