"use client";

import { useState } from "react";
import { Plus, Search, Grid3x3 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockKits = [
  { id: "k1", name: "Equipment Package — Standard",    skus: 3, category: "Equipment",  totalCost: 4245, stage: "Equipment Set" },
  { id: "k2", name: "Plumbing Rough-in Kit",           skus: 4, category: "Plumbing",   totalCost: 8400, stage: "Plumbing" },
  { id: "k3", name: "Tile & Coping Package",           skus: 2, category: "Finishes",   totalCost: 5170, stage: "Tile & Coping" },
  { id: "k4", name: "Interior Finish Kit — Quartz",   skus: 2, category: "Finishes",   totalCost: 2160, stage: "Interior Finish" },
  { id: "k5", name: "Steel & Rebar Package",           skus: 3, category: "Structure",  totalCost: 1200, stage: "Steel & Rebar" },
  { id: "k6", name: "Startup & Chemical Kit",         skus: 5, category: "Startup",    totalCost: 480,  stage: "Startup" },
];

export default function KitsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockKits.filter(k => k.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Kits <span className="text-slate-500 font-normal text-base">— Tier 2</span></h1>
          <p className="text-sm text-slate-400">SKU bundles commonly installed or purchased together</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Kit
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search kits..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((kit) => (
          <div key={kit.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <Grid3x3 className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white leading-snug">{kit.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{kit.stage}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-3">
                <span className="text-slate-500">{kit.skus} SKUs</span>
                <span className="text-slate-500">{kit.category}</span>
              </div>
              <span className="font-semibold text-white">{formatCurrency(kit.totalCost)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
