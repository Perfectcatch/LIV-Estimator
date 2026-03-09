"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, ArrowUpDown, Package } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

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

const STATUS_OPTIONS = ["All", "Active", "Inactive"] as const;

function costTypeBadge(category: string) {
  const c = category.toLowerCase();
  if (c.includes("labor"))        return { label: "Labor",        cls: "bg-amber-900/30 text-amber-300" };
  if (c.includes("equipment"))    return { label: "Equipment",    cls: "bg-blue-900/30 text-blue-300" };
  if (c.includes("material"))     return { label: "Materials",    cls: "bg-emerald-900/30 text-emerald-300" };
  if (c.includes("sub"))          return { label: "Subcontractor",cls: "bg-orange-900/30 text-orange-300" };
  if (c.includes("overhead"))     return { label: "Overhead",     cls: "bg-slate-700/40 text-slate-300" };
  return { label: category, cls: "bg-indigo-900/30 text-indigo-300" };
}

export function CatalogSkusList({ items }: { items: CatalogItemRow[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [statusFilter, setStatusFilter] = useState<typeof STATUS_OPTIONS[number]>("All");
  const [sortKey, setSortKey] = useState<"name" | "unit_cost" | "category">("name");
  const [sortAsc, setSortAsc] = useState(true);

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category))].sort();
    return ["All", ...cats];
  }, [items]);

  const filtered = useMemo(() => {
    let list = items.filter((item) => {
      const matchCat = cat === "All" || item.category === cat;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.cost_code ?? "").toLowerCase().includes(q) ||
        (item.source_supplier ?? "").toLowerCase().includes(q);
      const matchStatus =
        statusFilter === "All" ||
        (statusFilter === "Active" && item.is_active !== false) ||
        (statusFilter === "Inactive" && item.is_active === false);
      return matchCat && matchSearch && matchStatus;
    });

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "unit_cost") cmp = (a.unit_cost ?? 0) - (b.unit_cost ?? 0);
      else if (sortKey === "category") cmp = a.category.localeCompare(b.category);
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [items, search, cat, statusFilter, sortKey, sortAsc]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  const activeCount = items.filter((i) => i.is_active !== false).length;
  const inactiveCount = items.length - activeCount;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            SKUs <span className="text-slate-500 font-normal text-base">-- Tier 1</span>
          </h1>
          <p className="text-sm text-slate-400">
            Base items with unit costs and vendor assignments
            <span className="ml-2 text-slate-600">
              {activeCount} active / {inactiveCount} inactive
            </span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New SKU
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, code, or supplier..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="flex rounded-lg border border-[#2a2a4a] overflow-hidden">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setStatusFilter(opt)}
              className={cn(
                "px-3 py-2 text-xs font-medium transition-colors",
                statusFilter === opt
                  ? "bg-indigo-600 text-white"
                  : "bg-[#16213e] text-slate-400 hover:text-slate-200"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">
                <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  Name <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium">
                <button onClick={() => toggleSort("category")} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  Type <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium">Unit</th>
              <th className="text-right px-4 py-3 font-medium">
                <button onClick={() => toggleSort("unit_cost")} className="flex items-center gap-1 justify-end hover:text-slate-300 transition-colors">
                  Cost <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right px-4 py-3 font-medium">{"Markup %"}</th>
              <th className="text-right px-4 py-3 font-medium">Sell Price</th>
              <th className="text-left px-4 py-3 font-medium">Cost Code</th>
              <th className="text-center px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <Package className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <div className="text-slate-500 text-sm">No catalog items found.</div>
                  <div className="text-slate-600 text-xs mt-1">Try adjusting your search or filters.</div>
                </td>
              </tr>
            ) : (
              filtered.map((item, i) => {
                const badge = costTypeBadge(item.category);
                return (
                  <tr
                    key={item.id}
                    onClick={() => router.push(`/catalog/skus/${item.id}`)}
                    className={cn(
                      "hover:bg-white/[0.04] transition-colors cursor-pointer",
                      i < filtered.length - 1 && "border-b border-[#2a2a4a]/50",
                      item.is_active === false && "opacity-50"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="text-slate-200 font-medium">{item.name}</div>
                      {item.source_supplier && (
                        <div className="text-[11px] text-slate-500 mt-0.5">{item.source_supplier}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide", badge.cls)}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{item.unit ?? "--"}</td>
                    <td className="px-4 py-3 text-right font-semibold text-white">
                      {formatCurrency(item.unit_cost ?? 0)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400">
                      {(item.markup_percentage ?? 0).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-indigo-300">
                      {formatCurrency(sellPrice(item.unit_cost ?? 0, item.markup_percentage ?? 0))}
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs font-mono">{item.cost_code ?? "--"}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={cn(
                          "inline-block w-2 h-2 rounded-full",
                          item.is_active !== false ? "bg-emerald-400" : "bg-slate-600"
                        )}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-[#2a2a4a] flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {items.length} items</span>
            <span>Total cost: {formatCurrency(filtered.reduce((s, i) => s + (i.unit_cost ?? 0), 0))}</span>
          </div>
        )}
      </div>
    </div>
  );
}
