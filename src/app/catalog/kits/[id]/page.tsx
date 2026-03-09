"use client";

import { ChevronLeft, Grid3x3 } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const kit = {
  name: "Equipment Package — Standard",
  category: "Equipment", stage: "Equipment Set",
  skus: [
    { sku: "EQP-001", name: "Pentair IntelliFlo3 VS 3HP", qty: 1, unit: "EA", unitCost: 1285 },
    { sku: "EQP-002", name: "Pentair Clean & Clear 150",  qty: 1, unit: "EA", unitCost: 860  },
    { sku: "EQP-003", name: "IntelliCenter Automation",   qty: 1, unit: "EA", unitCost: 2100 },
  ],
};

export default function KitDetailPage({ params }: { params: { id: string } }) {
  const total = kit.skus.reduce((s, i) => s + i.qty * i.unitCost, 0);
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/catalog/kits" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <Grid3x3 className="w-4 h-4 text-indigo-400" />
        <h1 className="text-xl font-bold text-white">{kit.name}</h1>
      </div>
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[#2a2a4a] flex items-center justify-between">
          <div className="text-xs text-slate-500">{kit.category} · {kit.stage}</div>
          <div className="text-sm font-bold text-white">{formatCurrency(total)}</div>
        </div>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
            <th className="text-left px-4 py-3 font-medium">SKU</th>
            <th className="text-left px-4 py-3 font-medium">Name</th>
            <th className="text-right px-4 py-3 font-medium">Qty</th>
            <th className="text-left px-4 py-3 font-medium">Unit</th>
            <th className="text-right px-4 py-3 font-medium">Cost</th>
          </tr></thead>
          <tbody>{kit.skus.map((s, i) => (
            <tr key={s.sku} className={i < kit.skus.length - 1 ? "border-b border-[#2a2a4a]/50" : ""}>
              <td className="px-4 py-3 font-mono text-indigo-400 text-xs">{s.sku}</td>
              <td className="px-4 py-3 text-slate-200">{s.name}</td>
              <td className="px-4 py-3 text-right text-slate-400">{s.qty}</td>
              <td className="px-4 py-3 text-slate-500">{s.unit}</td>
              <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(s.unitCost)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
