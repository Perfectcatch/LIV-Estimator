"use client";

import { Plus, Database, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockSuperAssemblies = [
  { id: "sa1", name: "Standard 15×30 Package",       assemblies: 6, desc: "Entry-level rectangular pool, standard finish, basic equipment.", basePrice: 62000 },
  { id: "sa2", name: "Standard 20×40 Package",       assemblies: 6, desc: "Mid-size rectangular pool, standard finish, variable-speed pump.",  basePrice: 89000 },
  { id: "sa3", name: "Premium Pool + Spa Package",   assemblies: 8, desc: "Pool and attached spa, premium tile, IntelliCenter automation.",      basePrice: 124000 },
  { id: "sa4", name: "Lap Pool 20×60 Package",       assemblies: 6, desc: "Long rectangular lap pool, minimal coping, commercial grade pump.",  basePrice: 78000 },
  { id: "sa5", name: "Infinity Edge Package",        assemblies: 8, desc: "Vanishing edge pool, custom beam, enhanced hydraulics.",              basePrice: 145000 },
  { id: "sa6", name: "Plunge / Cocktail Package",    assemblies: 5, desc: "Small deep plunge pool, heated, bench seating.",                     basePrice: 38000 },
];

export default function SuperAssembliesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Super-Assemblies <span className="text-slate-500 font-normal text-base">— Tier 4</span></h1>
          <p className="text-sm text-slate-400">Complete pool packages. Select one to generate a full BOM from takeoff inputs.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockSuperAssemblies.map((sa) => (
          <div key={sa.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 hover:border-green-500/40 transition-colors cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-900/20 flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white leading-snug">{sa.name}</div>
                <div className="text-xs text-green-400 mt-0.5">{sa.assemblies} assemblies</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">{sa.desc}</p>
            <div className="flex items-center justify-between pt-3 border-t border-[#2a2a4a]">
              <div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">Base Price Est.</div>
                <div className="text-sm font-bold text-white">{formatCurrency(sa.basePrice)}</div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-900/20 hover:bg-green-900/30 text-xs text-green-300 transition-colors">
                <CheckCircle className="w-3 h-3" /> Use Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
