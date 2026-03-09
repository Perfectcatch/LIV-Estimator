"use client";

import { ChevronLeft, Database, CheckCircle } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const sa = {
  name: "Standard 15×30 Package",
  desc: "Entry-level rectangular pool, standard finish, basic equipment.",
  assemblies: [
    { name: "Standard Pool Shell Package",    costEst: 12500 },
    { name: "Plumbing & Mechanical Package",  costEst: 8400  },
    { name: "Equipment & Automation Package", costEst: 4245  },
    { name: "Interior Finish Package",       costEst: 7330  },
    { name: "Deck & Hardscape Package",       costEst: 6200  },
    { name: "Startup & Warranty Package",     costEst: 1200  },
  ],
};

export default function SuperAssemblyDetailPage({ params }: { params: { id: string } }) {
  const total = sa.assemblies.reduce((s, a) => s + a.costEst, 0);
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/catalog/super-assemblies" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <Database className="w-4 h-4 text-green-400" />
        <h1 className="text-xl font-bold text-white">{sa.name}</h1>
      </div>
      <p className="text-sm text-slate-400">{sa.desc}</p>
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-slate-500">{sa.assemblies.length} assemblies</span>
          <span className="text-sm font-bold text-white">Base Est. {formatCurrency(total)}</span>
        </div>
        <div className="space-y-2">
          {sa.assemblies.map((a, i) => (
            <div key={a.name} className="flex items-center gap-3 py-2.5 border-b border-[#2a2a4a]/50 last:border-0">
              <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              <span className="flex-1 text-sm text-slate-200">{a.name}</span>
              <span className="text-sm font-semibold text-white">{formatCurrency(a.costEst)}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 mt-2 border-t border-[#2a2a4a]">
          <button className="w-full py-2.5 rounded-lg bg-green-900/20 hover:bg-green-900/30 text-sm text-green-300 font-medium transition-colors">
            Use This Package in New Estimate
          </button>
        </div>
      </div>
    </div>
  );
}
