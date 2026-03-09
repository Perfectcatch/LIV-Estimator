"use client";

import { useState } from "react";
import { ChevronLeft, Save, Package } from "lucide-react";
import Link from "next/link";

const mockSku = {
  sku: "EQP-001", name: "Pentair IntelliFlo3 VS 3HP", category: "Equipment",
  unit: "EA", unitCost: 1285, markupPct: 60, vendor: "Pool Supply Co.",
  description: "Variable speed pump, 3HP, energy-efficient, programmable schedules, IntelliBrite compatible.",
};

export default function SkuDetailPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState(mockSku);
  const sell = form.unitCost / (1 - form.markupPct / 100);

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/catalog/skus" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-400" />
          <h1 className="text-xl font-bold text-white">{form.sku}</h1>
          <span className="text-sm text-slate-500">{form.name}</span>
        </div>
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-4">
        {[
          { label: "SKU Code",    key: "sku" },
          { label: "Name",        key: "name" },
          { label: "Category",    key: "category" },
          { label: "Unit",        key: "unit" },
          { label: "Vendor",      key: "vendor" },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="block text-xs text-slate-500 mb-1">{label}</label>
            <input value={form[key as keyof typeof form] as string}
              onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Unit Cost ($)</label>
            <input type="number" value={form.unitCost}
              onChange={e => setForm(p => ({ ...p, unitCost: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Markup (%)</label>
            <input type="number" value={form.markupPct}
              onChange={e => setForm(p => ({ ...p, markupPct: parseFloat(e.target.value) || 0 }))}
              className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
          </div>
        </div>
        <div className="pt-3 border-t border-[#2a2a4a] flex items-center justify-between">
          <div className="text-sm text-slate-400">Sell Price: <span className="text-white font-bold">${sell.toFixed(2)}</span></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
            <Save className="w-4 h-4" /> Save SKU
          </button>
        </div>
      </div>
    </div>
  );
}
