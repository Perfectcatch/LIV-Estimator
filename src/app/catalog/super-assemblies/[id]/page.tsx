"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft, Database, Save, Plus, Trash2, Layers,
  CheckCircle, ArrowRight, DollarSign, BarChart3,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency, cn } from "@/lib/utils";

const MOCK_SA_DATA: Record<string, {
  code: string; name: string; description: string; costCodeLabel: string;
  assemblies: { id: string; name: string; stage: string; kitCount: number; cost: number; sell: number }[];
  basePrice: number;
}> = {
  sa1: {
    code: "SA-15x30-STD", name: "Standard 15x30 Package", costCodeLabel: "00-General",
    description: "Entry-level rectangular pool, standard finish, basic equipment. Ideal for smaller backyards with straightforward access.",
    assemblies: [
      { id: "a1", name: "Standard Pool Shell Package", stage: "Shell", kitCount: 3, cost: 11500, sell: 18400 },
      { id: "a2", name: "Plumbing & Mechanical Package", stage: "Plumbing", kitCount: 1, cost: 8400, sell: 13440 },
      { id: "a3", name: "Equipment & Automation Package", stage: "Equipment Set", kitCount: 2, cost: 4725, sell: 7560 },
      { id: "a4", name: "Interior Finish Package", stage: "Interior Finish", kitCount: 2, cost: 7330, sell: 11728 },
      { id: "a5", name: "Deck & Hardscape Package", stage: "Deck", kitCount: 2, cost: 6200, sell: 9920 },
      { id: "a6", name: "Startup & Warranty Package", stage: "Startup", kitCount: 2, cost: 1200, sell: 1920 },
    ],
    basePrice: 62000,
  },
  sa3: {
    code: "SA-POOL-SPA-PRM", name: "Premium Pool + Spa Package", costCodeLabel: "00-General",
    description: "Pool and attached spa, premium tile, IntelliCenter automation, LED lighting, raised beam. Full luxury treatment.",
    assemblies: [
      { id: "a1", name: "Standard Pool Shell Package", stage: "Shell", kitCount: 3, cost: 16500, sell: 26400 },
      { id: "a7", name: "Spa Shell Package", stage: "Shell", kitCount: 2, cost: 6800, sell: 10880 },
      { id: "a2", name: "Plumbing & Mechanical Package", stage: "Plumbing", kitCount: 1, cost: 12400, sell: 19840 },
      { id: "a3", name: "Equipment & Automation Package", stage: "Equipment Set", kitCount: 2, cost: 8200, sell: 13120 },
      { id: "a4", name: "Interior Finish Package (Premium)", stage: "Interior Finish", kitCount: 3, cost: 14600, sell: 23360 },
      { id: "a5", name: "Deck & Hardscape Package", stage: "Deck", kitCount: 2, cost: 11200, sell: 17920 },
      { id: "a8", name: "LED & Water Feature Package", stage: "Features", kitCount: 2, cost: 4800, sell: 7680 },
      { id: "a6", name: "Startup & Warranty Package", stage: "Startup", kitCount: 2, cost: 1200, sell: 1920 },
    ],
    basePrice: 124000,
  },
  sa5: {
    code: "SA-INFINITY", name: "Infinity Edge Package", costCodeLabel: "00-General",
    description: "Vanishing edge pool, custom beam, enhanced hydraulics. Requires catch basin and secondary pump.",
    assemblies: [
      { id: "a1", name: "Infinity Shell Package", stage: "Shell", kitCount: 4, cost: 28000, sell: 44800 },
      { id: "a9", name: "Catch Basin Package", stage: "Shell", kitCount: 2, cost: 8500, sell: 13600 },
      { id: "a2", name: "Enhanced Plumbing Package", stage: "Plumbing", kitCount: 2, cost: 14200, sell: 22720 },
      { id: "a3", name: "Dual Pump Equipment Package", stage: "Equipment Set", kitCount: 2, cost: 9800, sell: 15680 },
      { id: "a4", name: "Premium Interior Finish", stage: "Interior Finish", kitCount: 3, cost: 16200, sell: 25920 },
      { id: "a5", name: "Deck & Hardscape Package", stage: "Deck", kitCount: 2, cost: 12800, sell: 20480 },
      { id: "a8", name: "Water Feature & Lighting Package", stage: "Features", kitCount: 2, cost: 6200, sell: 9920 },
      { id: "a6", name: "Startup & Warranty Package", stage: "Startup", kitCount: 2, cost: 1200, sell: 1920 },
    ],
    basePrice: 145000,
  },
};

const DEFAULT_SA = {
  code: "SA-XXX-000", name: "Untitled Package", costCodeLabel: "00-General",
  description: "Package description.",
  assemblies: [
    { id: "a1", name: "Sample Assembly", stage: "General", kitCount: 1, cost: 5000, sell: 8000 },
  ],
  basePrice: 50000,
};

function stageBadgeColor(stage: string) {
  const s = stage.toLowerCase();
  if (s.includes("shell"))    return "bg-orange-900/30 text-orange-300";
  if (s.includes("plumb"))    return "bg-cyan-900/30 text-cyan-300";
  if (s.includes("equip"))    return "bg-blue-900/30 text-blue-300";
  if (s.includes("interior")) return "bg-violet-900/30 text-violet-300";
  if (s.includes("deck"))     return "bg-amber-900/30 text-amber-300";
  if (s.includes("startup"))  return "bg-emerald-900/30 text-emerald-300";
  if (s.includes("feature"))  return "bg-pink-900/30 text-pink-300";
  return "bg-slate-700/40 text-slate-300";
}

export default function SuperAssemblyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = typeof params === "object" && "then" in params ? { id: "sa1" } : params as { id: string };
  const sa = MOCK_SA_DATA[resolvedParams.id] ?? DEFAULT_SA;

  const [form, setForm] = useState({
    code: sa.code,
    name: sa.name,
    description: sa.description,
    costCodeLabel: sa.costCodeLabel,
    basePrice: sa.basePrice,
  });
  const [assemblies, setAssemblies] = useState(sa.assemblies);

  const totalCost = assemblies.reduce((s, a) => s + a.cost, 0);
  const totalSell = assemblies.reduce((s, a) => s + a.sell, 0);
  const totalKits = assemblies.reduce((s, a) => s + a.kitCount, 0);
  const marginPct = totalSell > 0 ? ((totalSell - totalCost) / totalSell) * 100 : 0;

  const inputCls =
    "w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors";
  const labelCls = "block text-xs font-medium text-slate-500 mb-1.5";

  function removeAssembly(idx: number) {
    setAssemblies((prev) => prev.filter((_, i) => i !== idx));
  }

  // Group by stage for visual breakdown
  const stageGroups = assemblies.reduce<Record<string, typeof assemblies>>((acc, a) => {
    (acc[a.stage] = acc[a.stage] || []).push(a);
    return acc;
  }, {});

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link href="/catalog/super-assemblies" className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors text-sm">
          <ChevronLeft className="w-4 h-4" />
          <span>Packages</span>
        </Link>
        <span className="text-slate-700">/</span>
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <h1 className="text-lg font-bold text-white">{form.name}</h1>
          <span className="text-xs font-mono text-slate-600">{form.code}</span>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
              <Layers className="w-3 h-3" /> Assemblies
            </div>
            <div className="text-xl font-bold text-white">{assemblies.length}</div>
          </div>
          <div className="text-center border-x border-[#2a2a4a]">
            <div className="text-xs text-slate-500 mb-1">Total Kits</div>
            <div className="text-xl font-bold text-white">{totalKits}</div>
          </div>
          <div className="text-center border-r border-[#2a2a4a]">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
              <DollarSign className="w-3 h-3" /> Total Cost
            </div>
            <div className="text-xl font-bold text-white">{formatCurrency(totalCost)}</div>
          </div>
          <div className="text-center border-r border-[#2a2a4a]">
            <div className="text-xs text-slate-500 mb-1">Total Sell</div>
            <div className="text-xl font-bold text-indigo-300">{formatCurrency(totalSell)}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-1">
              <BarChart3 className="w-3 h-3" /> Margin
            </div>
            <div className={cn("text-xl font-bold", marginPct >= 30 ? "text-emerald-400" : marginPct >= 15 ? "text-amber-400" : "text-red-400")}>
              {marginPct.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Package Details</h2>
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
            <label className={labelCls}>Base Price Override ($)</label>
            <input type="number" value={form.basePrice} onChange={(e) => setForm((p) => ({ ...p, basePrice: parseFloat(e.target.value) || 0 }))} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description</label>
          <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={2} className={cn(inputCls, "resize-none")} />
        </div>
      </div>

      {/* Assembly Breakdown by Stage */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a4a] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Assembly Breakdown</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/30 hover:bg-emerald-900/50 text-xs text-emerald-300 transition-colors">
            <Plus className="w-3 h-3" /> Add Assembly
          </button>
        </div>

        {Object.entries(stageGroups).map(([stage, groupAssemblies]) => {
          const groupCost = groupAssemblies.reduce((s, a) => s + a.cost, 0);
          const groupSell = groupAssemblies.reduce((s, a) => s + a.sell, 0);
          return (
            <div key={stage}>
              {/* Stage Header */}
              <div className="px-5 py-2 bg-[#1a1a2e]/50 border-b border-[#2a2a4a]/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn("inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide", stageBadgeColor(stage))}>
                    {stage}
                  </span>
                  <span className="text-xs text-slate-600">{groupAssemblies.length} {groupAssemblies.length === 1 ? "assembly" : "assemblies"}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500">{formatCurrency(groupCost)}</span>
                  <span className="text-indigo-400">{formatCurrency(groupSell)}</span>
                </div>
              </div>
              {/* Assemblies in stage */}
              <div className="divide-y divide-[#2a2a4a]/30">
                {groupAssemblies.map((asm, i) => (
                  <div
                    key={asm.id + i}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.03] transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={() => router.push(`/catalog/assemblies/${asm.id}`)}
                        className="text-sm font-medium text-slate-200 hover:text-indigo-300 transition-colors text-left"
                      >
                        {asm.name}
                      </button>
                      <div className="text-xs text-slate-600 mt-0.5">{asm.kitCount} kits</div>
                    </div>
                    <div className="text-right flex-shrink-0 min-w-[120px]">
                      <div className="text-sm font-semibold text-white">{formatCurrency(asm.cost)}</div>
                      <div className="text-xs text-indigo-400">{formatCurrency(asm.sell)} sell</div>
                    </div>
                    <button
                      onClick={() => removeAssembly(assemblies.indexOf(asm))}
                      className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Totals Footer */}
        <div className="px-5 py-3 border-t border-[#2a2a4a] flex items-center justify-between bg-[#1a1a2e]/30">
          <span className="text-xs text-slate-500">{assemblies.length} assemblies / {totalKits} kits</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-white">{formatCurrency(totalCost)} cost</span>
            <span className="text-sm font-bold text-indigo-300">{formatCurrency(totalSell)} sell</span>
          </div>
        </div>
      </div>

      {/* Base Price vs Calculated */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 mb-1">Base Price (Override)</div>
            <div className="text-2xl font-bold text-white">{formatCurrency(form.basePrice)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Calculated Sell</div>
            <div className="text-2xl font-bold text-indigo-300">{formatCurrency(totalSell)}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Difference</div>
            <div className={cn("text-2xl font-bold", form.basePrice >= totalSell ? "text-emerald-400" : "text-amber-400")}>
              {form.basePrice >= totalSell ? "+" : ""}{formatCurrency(form.basePrice - totalSell)}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Save className="w-4 h-4" /> Save Package
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-800/30 text-sm font-medium text-emerald-300 transition-colors">
          Use in New Estimate <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
