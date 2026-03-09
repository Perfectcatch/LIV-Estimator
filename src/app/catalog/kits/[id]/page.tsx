"use client";

import { useState } from "react";
import { ChevronLeft, Grid3x3, Save, Plus, Trash2, GripVertical } from "lucide-react";
import Link from "next/link";
import { formatCurrency, cn } from "@/lib/utils";

const MOCK_KIT_DATA: Record<string, {
  code: string; name: string; vendorLabel: string; stage: string; notes: string;
  skus: { code: string; name: string; qty: number; unit: string; unitCost: number; markupPct: number }[];
}> = {
  k1: {
    code: "KIT-EQP-STD", name: "Equipment Package -- Standard", vendorLabel: "Pentair",
    stage: "Equipment Set", notes: "Standard equipment tier for pools up to 20,000 gal.",
    skus: [
      { code: "EQP-001", name: "Pentair IntelliFlo3 VS 3HP", qty: 1, unit: "EA", unitCost: 1285, markupPct: 60 },
      { code: "EQP-002", name: "Pentair Clean & Clear 150", qty: 1, unit: "EA", unitCost: 860, markupPct: 60 },
      { code: "EQP-003", name: "IntelliCenter Automation", qty: 1, unit: "EA", unitCost: 2100, markupPct: 60 },
    ],
  },
  k2: {
    code: "KIT-PLB-RGH", name: "Plumbing Rough-in Kit", vendorLabel: "Multiple",
    stage: "Plumbing", notes: "Standard plumbing for residential pool with 2 returns, 1 skimmer, 2 main drains.",
    skus: [
      { code: "PLB-001", name: "2\" PVC Schedule 40 (per LF)", qty: 280, unit: "LF", unitCost: 12, markupPct: 60 },
      { code: "PLB-002", name: "Return Fittings (Hayward)", qty: 4, unit: "EA", unitCost: 85, markupPct: 60 },
      { code: "PLB-003", name: "Main Drain Assembly", qty: 2, unit: "EA", unitCost: 220, markupPct: 60 },
      { code: "PLB-004", name: "Skimmer Assembly (Hayward SP1082)", qty: 1, unit: "EA", unitCost: 340, markupPct: 60 },
    ],
  },
};

const DEFAULT_KIT = {
  code: "KIT-XXX-000", name: "Untitled Kit", vendorLabel: "TBD",
  stage: "General", notes: "",
  skus: [
    { code: "SKU-001", name: "Sample Item", qty: 1, unit: "EA", unitCost: 100, markupPct: 60 },
  ],
};

function sellPrice(cost: number, markup: number) {
  return cost * (1 + markup / 100);
}

export default function KitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = typeof params === "object" && "then" in params ? { id: "k1" } : params as { id: string };
  const kit = MOCK_KIT_DATA[resolvedParams.id] ?? DEFAULT_KIT;

  const [form, setForm] = useState({
    code: kit.code,
    name: kit.name,
    vendorLabel: kit.vendorLabel,
    stage: kit.stage,
    notes: kit.notes,
  });
  const [skus, setSkus] = useState(kit.skus);

  const totalCost = skus.reduce((s, sku) => s + sku.qty * sku.unitCost, 0);
  const totalSell = skus.reduce((s, sku) => s + sku.qty * sellPrice(sku.unitCost, sku.markupPct), 0);
  const marginPct = totalSell > 0 ? ((totalSell - totalCost) / totalSell) * 100 : 0;

  const inputCls =
    "w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors";
  const labelCls = "block text-xs font-medium text-slate-500 mb-1.5";

  function removeSku(idx: number) {
    setSkus((prev) => prev.filter((_, i) => i !== idx));
  }

  function addSku() {
    setSkus((prev) => [...prev, { code: "", name: "New Item", qty: 1, unit: "EA", unitCost: 0, markupPct: 60 }]);
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link href="/catalog/kits" className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Kits</span>
        </Link>
        <span className="text-slate-700">/</span>
        <div className="flex items-center gap-2">
          <Grid3x3 className="w-4 h-4 text-indigo-400" />
          <h1 className="text-lg font-bold text-white">{form.name}</h1>
          <span className="text-xs font-mono text-slate-600">{form.code}</span>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">SKUs</div>
            <div className="text-xl font-bold text-white">{skus.length}</div>
          </div>
          <div className="text-center border-x border-[#2a2a4a]">
            <div className="text-xs text-slate-500 mb-1">Total Cost</div>
            <div className="text-xl font-bold text-white">{formatCurrency(totalCost)}</div>
          </div>
          <div className="text-center border-r border-[#2a2a4a]">
            <div className="text-xs text-slate-500 mb-1">Total Sell</div>
            <div className="text-xl font-bold text-indigo-300">{formatCurrency(totalSell)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">Margin</div>
            <div className={cn("text-xl font-bold", marginPct >= 30 ? "text-emerald-400" : marginPct >= 15 ? "text-amber-400" : "text-red-400")}>
              {marginPct.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Kit Details Form */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Kit Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Kit Code</label>
            <input value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Name</label>
            <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Primary Vendor</label>
            <input value={form.vendorLabel} onChange={(e) => setForm((p) => ({ ...p, vendorLabel: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Stage</label>
            <input value={form.stage} onChange={(e) => setForm((p) => ({ ...p, stage: e.target.value }))} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} rows={2} className={cn(inputCls, "resize-none")} />
        </div>
      </div>

      {/* SKU Line Items */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a4a] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">SKU Line Items</h2>
          <button onClick={addSku} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/30 hover:bg-indigo-900/50 text-xs text-indigo-300 transition-colors">
            <Plus className="w-3 h-3" /> Add SKU
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="w-8 px-2 py-3" />
              <th className="text-left px-3 py-3 font-medium">SKU</th>
              <th className="text-left px-3 py-3 font-medium">Name</th>
              <th className="text-right px-3 py-3 font-medium">Qty</th>
              <th className="text-left px-3 py-3 font-medium">Unit</th>
              <th className="text-right px-3 py-3 font-medium">Unit Cost</th>
              <th className="text-right px-3 py-3 font-medium">Ext Cost</th>
              <th className="text-right px-3 py-3 font-medium">Sell</th>
              <th className="w-8 px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {skus.map((sku, i) => {
              const ext = sku.qty * sku.unitCost;
              const sell = sku.qty * sellPrice(sku.unitCost, sku.markupPct);
              return (
                <tr key={i} className={cn("hover:bg-white/[0.03] transition-colors", i < skus.length - 1 && "border-b border-[#2a2a4a]/50")}>
                  <td className="px-2 py-3 text-slate-600"><GripVertical className="w-3 h-3" /></td>
                  <td className="px-3 py-3 text-xs font-mono text-indigo-400">{sku.code || "--"}</td>
                  <td className="px-3 py-3 text-slate-200">{sku.name}</td>
                  <td className="px-3 py-3 text-right text-slate-300">{sku.qty}</td>
                  <td className="px-3 py-3 text-slate-500">{sku.unit}</td>
                  <td className="px-3 py-3 text-right text-white">{formatCurrency(sku.unitCost)}</td>
                  <td className="px-3 py-3 text-right font-semibold text-white">{formatCurrency(ext)}</td>
                  <td className="px-3 py-3 text-right font-semibold text-indigo-300">{formatCurrency(sell)}</td>
                  <td className="px-2 py-3">
                    <button onClick={() => removeSku(i)} className="text-slate-600 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t border-[#2a2a4a]">
              <td colSpan={6} className="px-3 py-3 text-right text-xs text-slate-500 uppercase">Totals</td>
              <td className="px-3 py-3 text-right font-bold text-white">{formatCurrency(totalCost)}</td>
              <td className="px-3 py-3 text-right font-bold text-indigo-300">{formatCurrency(totalSell)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Save className="w-4 h-4" /> Save Kit
        </button>
      </div>
    </div>
  );
}
