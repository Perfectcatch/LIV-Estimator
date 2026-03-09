"use client";

import { useState } from "react";
import { Plus, Search, Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockSkus = [
  { id: "s1", sku: "EXC-001", name: "Excavation — Haul Away",      category: "Excavation",  unit: "CY",  unitCost: 45,    vendor: "Dirt Pro LLC",       active: true },
  { id: "s2", sku: "STL-001", name: "#4 Rebar 20ft stick",         category: "Steel",       unit: "EA",  unitCost: 18.5,  vendor: "ABC Steel",         active: true },
  { id: "s3", sku: "SHT-001", name: "Gunite Shell — 4000psi",      category: "Shell",       unit: "CY",  unitCost: 185,   vendor: "Sunstate Shotcrete",active: true },
  { id: "s4", sku: "PLB-001", name: "2\" PVC Plumbing Package",     category: "Plumbing",   unit: "LS",  unitCost: 8400,  vendor: "Precision Plumbing",active: true },
  { id: "s5", sku: "EQP-001", name: "Pentair IntelliFlo3 VS Pump", category: "Equipment",  unit: "EA",  unitCost: 1285,  vendor: "Pool Supply Co.",   active: true },
  { id: "s6", sku: "EQP-002", name: "Pentair Clean & Clear 150",   category: "Equipment",  unit: "EA",  unitCost: 860,   vendor: "Pool Supply Co.",   active: true },
  { id: "s7", sku: "EQP-003", name: "IntelliCenter Automation",    category: "Equipment",  unit: "EA",  unitCost: 2100,  vendor: "Pool Supply Co.",   active: true },
  { id: "s8", sku: "INT-001", name: "Quartz Interior Finish",      category: "Finishes",   unit: "SF",  unitCost: 4.80,  vendor: "Pebble Tec",        active: true },
  { id: "s9", sku: "COP-001", name: "Travertine Coping 12\"",      category: "Finishes",   unit: "LF",  unitCost: 22,    vendor: "ABC Stone",         active: true },
  { id: "sa", sku: "TIL-001", name: "3\" Glass Tile Band",         category: "Finishes",   unit: "LF",  unitCost: 25,    vendor: "ABC Stone",         active: true },
];

const cats = ["All", ...Array.from(new Set(mockSkus.map(s => s.category)))];

export default function SkusPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = mockSkus.filter(s => {
    const matchCat = cat === "All" || s.category === cat;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">SKUs <span className="text-slate-500 font-normal text-base">— Tier 1</span></h1>
          <p className="text-sm text-slate-400">Base items with unit costs and vendor assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New SKU
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search SKUs..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)}
          className="bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">SKU</th>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Unit</th>
              <th className="text-right px-4 py-3 font-medium">Unit Cost</th>
              <th className="text-left px-4 py-3 font-medium">Vendor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sku, i) => (
              <tr key={sku.id} className={cn("hover:bg-white/3 transition-colors", i < filtered.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3 font-mono text-indigo-400 text-xs">{sku.sku}</td>
                <td className="px-4 py-3 text-slate-200 font-medium">{sku.name}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{sku.category}</td>
                <td className="px-4 py-3 text-slate-500">{sku.unit}</td>
                <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(sku.unitCost)}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{sku.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
