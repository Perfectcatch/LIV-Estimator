"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Layers, Save, Plus, Trash2, Grid3x3 } from "lucide-react";
import Link from "next/link";
import { formatCurrency, cn } from "@/lib/utils";

const MOCK_ASSEMBLY_DATA: Record<string, {
  code: string; name: string; stage: string; description: string;
  kits: { id: string; name: string; skuCount: number; cost: number; sell: number }[];
}> = {
  a1: {
    code: "ASM-SHL-STD", name: "Standard Pool Shell Package", stage: "Shell",
    description: "Excavation, steel, gunite, and grading for standard rectangular pool.",
    kits: [
      { id: "k7", name: "Excavation Package -- Standard", skuCount: 3, cost: 3800, sell: 6080 },
      { id: "k5", name: "Steel & Rebar Package", skuCount: 3, cost: 1200, sell: 1920 },
      { id: "k8", name: "Gunite Shell Package", skuCount: 2, cost: 6500, sell: 10400 },
    ],
  },
  a3: {
    code: "ASM-EQP-AUT", name: "Equipment & Automation Package", stage: "Equipment Set",
    description: "Pump, filter, automation controller, and chemical startup.",
    kits: [
      { id: "k1", name: "Equipment Package -- Standard", skuCount: 3, cost: 4245, sell: 6792 },
      { id: "k6", name: "Startup & Chemical Kit", skuCount: 5, cost: 480, sell: 768 },
    ],
  },
  a4: {
    code: "ASM-INT-FIN", name: "Interior Finish Package", stage: "Interior Finish",
    description: "Quartz plaster interior, waterline tile, and bullnose coping.",
    kits: [
      { id: "k3", name: "Tile & Coping Package", skuCount: 2, cost: 5170, sell: 8272 },
      { id: "k4", name: "Interior Finish Kit -- Quartz", skuCount: 2, cost: 2160, sell: 3456 },
    ],
  },
};

const DEFAULT_ASM = {
  code: "ASM-XXX-000", name: "Untitled Assembly", stage: "General",
  description: "Assembly description.",
  kits: [{ id: "k1", name: "Sample Kit", skuCount: 1, cost: 500, sell: 800 }],
};

export default function AssemblyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = typeof params === "object" && "then" in params ? { id: "a1" } : params as { id: string };
  const asm = MOCK_ASSEMBLY_DATA[resolvedParams.id] ?? DEFAULT_ASM;

  const [form, setForm] = useState({
    code: asm.code,
    name: asm.name,
    stage: asm.stage,
    description: asm.description,
  });
  const [kits, setKits] = useState(asm.kits);

  const totalCost = kits.reduce((s, k) => s + k.cost, 0);
  const totalSell = kits.reduce((s, k) => s + k.sell, 0);
  const totalSkus = kits.reduce((s, k) => s + k.skuCount, 0);
  const marginPct = totalSell > 0 ? ((totalSell - totalCost) / totalSell) * 100 : 0;

  const inputCls =
    "w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors";
  const labelCls = "block text-xs font-medium text-slate-500 mb-1.5";

  function removeKit(idx: number) {
    setKits((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link href="/catalog/assemblies" className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Assemblies</span>
        </Link>
        <span className="text-slate-700">/</span>
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <h1 className="text-lg font-bold text-white">{form.name}</h1>
          <span className="text-xs font-mono text-slate-600">{form.code}</span>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">Kits / SKUs</div>
            <div className="text-xl font-bold text-white">{kits.length} <span className="text-sm text-slate-500 font-normal">/ {totalSkus}</span></div>
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

      {/* Assembly Details */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Assembly Details</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Code</label>
            <input value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Name</label>
            <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Stage</label>
            <input value={form.stage} onChange={(e) => setForm((p) => ({ ...p, stage: e.target.value }))} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} className={cn(inputCls, "resize-none")} />
        </div>
      </div>

      {/* Kit Breakdown */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a4a] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Kit Breakdown</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-900/30 hover:bg-purple-900/50 text-xs text-purple-300 transition-colors">
            <Plus className="w-3 h-3" /> Add Kit
          </button>
        </div>
        <div className="divide-y divide-[#2a2a4a]/50">
          {kits.map((kit, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <Grid3x3 className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => router.push(`/catalog/kits/${kit.id}`)}
                  className="text-sm font-medium text-slate-200 hover:text-indigo-300 transition-colors text-left"
                >
                  {kit.name}
                </button>
                <div className="text-xs text-slate-500 mt-0.5">{kit.skuCount} SKUs</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-semibold text-white">{formatCurrency(kit.cost)}</div>
                <div className="text-xs text-indigo-400">{formatCurrency(kit.sell)} sell</div>
              </div>
              <button onClick={() => removeKit(i)} className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-[#2a2a4a] flex items-center justify-between">
          <span className="text-xs text-slate-500">{kits.length} kits / {totalSkus} SKUs total</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-white">{formatCurrency(totalCost)} cost</span>
            <span className="text-sm font-bold text-indigo-300">{formatCurrency(totalSell)} sell</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Save className="w-4 h-4" /> Save Assembly
        </button>
      </div>
    </div>
  );
}
