"use client";

import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CatalogItemRow {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  subcategory?: string | null;
  unit?: string | null;
  unit_cost?: number | null;
  markup_percentage?: number | null;
  cost_code?: string | null;
  is_active?: boolean | null;
  source_supplier?: string | null;
}

function sellPrice(cost: number, markup: number) {
  return cost * (1 + markup / 100);
}

export function CatalogSkusList({ items }: { items: CatalogItemRow[] }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category))].sort();
    return ["All", ...cats];
  }, [items]);

  const filtered = items.filter((item) => {
    const matchCat = cat === "All" || item.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || item.name.toLowerCase().includes(q) || (item.cost_code ?? "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            SKUs <span className="text-slate-500 font-normal text-base">-- Tier 1</span>
          </h1>
          <p className="text-sm text-slate-400">Base items with unit costs and vendor assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New SKU
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search SKUs..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)}
          className="bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Unit</th>
              <th className="text-right px-4 py-3 font-medium">Cost</th>
              <th className="text-right px-4 py-3 font-medium">{"Markup %"}</th>
              <th className="text-right px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium">Cost Code</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500">No catalog items found.</td>
              </tr>
            ) : (
              filtered.map((item, i) => (
                <tr key={item.id} className={cn("hover:bg-white/[0.03] transition-colors", i < filtered.length - 1 && "border-b border-[#2a2a4a]/50")}>
                  <td className="px-4 py-3">
                    <div className="text-slate-200 font-medium">{item.name}</div>
                    {item.source_supplier && <div className="text-[11px] text-slate-500 mt-0.5">{item.source_supplier}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs capitalize">{item.category}</td>
                  <td className="px-4 py-3 text-slate-500">{item.unit ?? "—"}</td>
                  <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(item.unit_cost ?? 0)}</td>
                  <td className="px-4 py-3 text-right text-slate-400">{(item.markup_percentage ?? 0).toFixed(0)}%</td>
                  <td className="px-4 py-3 text-right font-semibold text-indigo-300">
                    {formatCurrency(sellPrice(item.unit_cost ?? 0, item.markup_percentage ?? 0))}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs font-mono">{item.cost_code ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
