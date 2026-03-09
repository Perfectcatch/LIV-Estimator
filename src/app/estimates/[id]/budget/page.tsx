"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const budgetRows = [
  { div: "Excavation",      estimated: 3488,  committed: 2180,  actual: 2180  },
  { div: "Steel & Rebar",   estimated: 1243,  committed: 777,   actual: 777   },
  { div: "Shell / Gunite",  estimated: 6600,  committed: 4130,  actual: 4130  },
  { div: "Plumbing",        estimated: 15120, committed: 8400,  actual: 4200  },
  { div: "Equipment",       estimated: 10030, committed: 4245,  actual: 0     },
  { div: "Interior Finish", estimated: 5400,  committed: 2160,  actual: 0     },
  { div: "Tile & Coping",   estimated: 13750, committed: 5170,  actual: 0     },
  { div: "Deck",            estimated: 9800,  committed: 0,     actual: 0     },
  { div: "PM Fee",          estimated: 6320,  committed: 6320,  actual: 6320  },
  { div: "Contingency",     estimated: 3950,  committed: 0,     actual: 0     },
];

export default function BudgetPage({ params }: { params: { id: string } }) {
  const totEst  = budgetRows.reduce((s, r) => s + r.estimated, 0);
  const totComm = budgetRows.reduce((s, r) => s + r.committed, 0);
  const totAct  = budgetRows.reduce((s, r) => s + r.actual, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-white">Budget</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Estimated",  value: formatCurrency(totEst),  color: "text-slate-200" },
          { label: "Committed",  value: formatCurrency(totComm), color: "text-blue-300"  },
          { label: "Actual",     value: formatCurrency(totAct),  color: "text-white"     },
        ].map(s => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Division</th>
              <th className="text-right px-4 py-3 font-medium">Estimated</th>
              <th className="text-right px-4 py-3 font-medium">Committed</th>
              <th className="text-right px-4 py-3 font-medium">Actual</th>
              <th className="text-right px-4 py-3 font-medium">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {budgetRows.map((row, i) => (
              <tr key={row.div} className={`hover:bg-white/3 transition-colors ${i < budgetRows.length - 1 ? "border-b border-[#2a2a4a]/50" : ""}`}>
                <td className="px-4 py-3 text-slate-200 font-medium">{row.div}</td>
                <td className="px-4 py-3 text-right text-slate-400">{formatCurrency(row.estimated)}</td>
                <td className="px-4 py-3 text-right text-blue-300">{row.committed > 0 ? formatCurrency(row.committed) : "—"}</td>
                <td className="px-4 py-3 text-right text-white font-semibold">{row.actual > 0 ? formatCurrency(row.actual) : "—"}</td>
                <td className="px-4 py-3 text-right text-slate-400">{formatCurrency(row.estimated - row.actual)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-[#2a2a4a] bg-white/3">
              <td className="px-4 py-3 text-white font-bold">Total</td>
              <td className="px-4 py-3 text-right font-bold text-white">{formatCurrency(totEst)}</td>
              <td className="px-4 py-3 text-right font-bold text-blue-300">{formatCurrency(totComm)}</td>
              <td className="px-4 py-3 text-right font-bold text-white">{formatCurrency(totAct)}</td>
              <td className="px-4 py-3 text-right font-bold text-indigo-300">{formatCurrency(totEst - totAct)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
