"use client";

import { useState } from "react";
import { ChevronLeft, Save, Package, DollarSign, Tag, Truck } from "lucide-react";
import Link from "next/link";
import { formatCurrency, cn } from "@/lib/utils";

interface CatalogItem {
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

function margin(cost: number, markup: number) {
  const sell = sellPrice(cost, markup);
  if (sell === 0) return 0;
  return ((sell - cost) / sell) * 100;
}

function costTypeBadge(category: string) {
  const c = category.toLowerCase();
  if (c.includes("labor"))     return { label: "Labor",         cls: "bg-amber-900/30 text-amber-300 border-amber-800/30" };
  if (c.includes("equipment")) return { label: "Equipment",     cls: "bg-blue-900/30 text-blue-300 border-blue-800/30" };
  if (c.includes("material"))  return { label: "Materials",     cls: "bg-emerald-900/30 text-emerald-300 border-emerald-800/30" };
  if (c.includes("sub"))       return { label: "Subcontractor", cls: "bg-orange-900/30 text-orange-300 border-orange-800/30" };
  return { label: category, cls: "bg-indigo-900/30 text-indigo-300 border-indigo-800/30" };
}

export function SkuDetailForm({ item }: { item: CatalogItem }) {
  const [form, setForm] = useState({
    name: item.name,
    description: item.description ?? "",
    category: item.category,
    subcategory: item.subcategory ?? "",
    unit: item.unit ?? "",
    unit_cost: item.unit_cost ?? 0,
    markup_percentage: item.markup_percentage ?? 0,
    cost_code: item.cost_code ?? "",
    source_supplier: item.source_supplier ?? "",
    is_active: item.is_active !== false,
  });

  const sell = sellPrice(form.unit_cost, form.markup_percentage);
  const marginPct = margin(form.unit_cost, form.markup_percentage);
  const badge = costTypeBadge(form.category);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const inputCls =
    "w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors";
  const labelCls = "block text-xs font-medium text-slate-500 mb-1.5";

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link
          href="/catalog/skus"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>SKUs</span>
        </Link>
        <span className="text-slate-700">/</span>
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-400" />
          <h1 className="text-lg font-bold text-white">{form.name}</h1>
          <span className={cn("inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border", badge.cls)}>
            {badge.label}
          </span>
          <span
            className={cn(
              "inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border",
              form.is_active
                ? "bg-emerald-900/30 text-emerald-300 border-emerald-800/30"
                : "bg-slate-700/40 text-slate-400 border-slate-600/30"
            )}
          >
            {form.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Cost Summary Card */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <DollarSign className="w-3 h-3" /> Unit Cost
            </div>
            <div className="text-2xl font-bold text-white">{formatCurrency(form.unit_cost)}</div>
          </div>
          <div className="text-center border-x border-[#2a2a4a]">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mb-1">
              <Tag className="w-3 h-3" /> Sell Price
            </div>
            <div className="text-2xl font-bold text-indigo-300">{formatCurrency(sell)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 mb-1">Margin</div>
            <div className={cn("text-2xl font-bold", marginPct >= 30 ? "text-emerald-400" : marginPct >= 15 ? "text-amber-400" : "text-red-400")}>
              {marginPct.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Detail Form */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Item Details</h2>

        <div>
          <label className={labelCls}>Name</label>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            className={cn(inputCls, "resize-none")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Category</label>
            <input value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Subcategory</label>
            <input value={form.subcategory} onChange={(e) => update("subcategory", e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Unit of Measure</label>
            <input value={form.unit} onChange={(e) => update("unit", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Unit Cost ($)</label>
            <input
              type="number"
              step="0.01"
              value={form.unit_cost}
              onChange={(e) => update("unit_cost", parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Markup (%)</label>
            <input
              type="number"
              step="0.1"
              value={form.markup_percentage}
              onChange={(e) => update("markup_percentage", parseFloat(e.target.value) || 0)}
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Cost Code</label>
            <input value={form.cost_code} onChange={(e) => update("cost_code", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>
              <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Supplier</span>
            </label>
            <input
              value={form.source_supplier}
              onChange={(e) => update("source_supplier", e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className={labelCls + " mb-0"}>Status</label>
          <button
            onClick={() => update("is_active", !form.is_active)}
            className={cn(
              "relative w-10 h-5 rounded-full transition-colors",
              form.is_active ? "bg-emerald-600" : "bg-slate-600"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                form.is_active ? "left-5" : "left-0.5"
              )}
            />
          </button>
          <span className="text-xs text-slate-400">{form.is_active ? "Active" : "Inactive"}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-600">
          ID: <span className="font-mono">{item.id.slice(0, 8)}...</span>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}
