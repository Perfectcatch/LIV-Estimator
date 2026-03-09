"use client";

import { Plus, Layers } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockAssemblies = [
  { id: "a1", name: "Standard Pool Shell Package",     kits: 3, stage: "Shell",           costEst: 12500 },
  { id: "a2", name: "Plumbing & Mechanical Package",   kits: 2, stage: "Plumbing",        costEst: 8400  },
  { id: "a3", name: "Equipment & Automation Package",  kits: 2, stage: "Equipment Set",   costEst: 4245  },
  { id: "a4", name: "Interior Finish Package",        kits: 3, stage: "Interior Finish",  costEst: 7330  },
  { id: "a5", name: "Deck & Hardscape Package",        kits: 2, stage: "Deck",            costEst: 6200  },
  { id: "a6", name: "Startup & Warranty Package",      kits: 2, stage: "Startup",         costEst: 1200  },
];

export default function AssembliesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Assemblies <span className="text-slate-500 font-normal text-base">— Tier 3</span></h1>
          <p className="text-sm text-slate-400">Work packages composed of Kits, mapped to construction stages</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Assembly
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockAssemblies.map((asm) => (
          <div key={asm.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-purple-500/40 transition-colors cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white leading-snug">{asm.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{asm.stage}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">{asm.kits} kits</span>
              <span className="font-semibold text-white">{formatCurrency(asm.costEst)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
