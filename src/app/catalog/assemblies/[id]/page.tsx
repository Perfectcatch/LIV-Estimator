"use client";

import { ChevronLeft, Layers } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const assembly = {
  name: "Equipment & Automation Package",
  stage: "Equipment Set",
  kits: [
    { name: "Equipment Package — Standard", skus: 3, cost: 4245 },
    { name: "Startup & Chemical Kit",        skus: 5, cost: 480  },
  ],
};

export default function AssemblyDetailPage({ params }: { params: { id: string } }) {
  const total = assembly.kits.reduce((s, k) => s + k.cost, 0);
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/catalog/assemblies" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <Layers className="w-4 h-4 text-purple-400" />
        <h1 className="text-xl font-bold text-white">{assembly.name}</h1>
      </div>
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-slate-500">Stage: {assembly.stage}</span>
          <span className="text-sm font-bold text-white">{formatCurrency(total)} est.</span>
        </div>
        <div className="space-y-3">
          {assembly.kits.map(k => (
            <div key={k.name} className="flex items-center justify-between py-3 border-b border-[#2a2a4a]/50 last:border-0">
              <div>
                <div className="text-sm font-medium text-white">{k.name}</div>
                <div className="text-xs text-slate-500">{k.skus} SKUs</div>
              </div>
              <div className="text-sm font-bold text-white">{formatCurrency(k.cost)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
