"use client";

import { ChevronLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const stages = [
  { name: "Excavation",       estimated: 3488,  committed: 2180,  actual: 2180,  status: "complete" },
  { name: "Steel & Rebar",    estimated: 1243,  committed: 777,   actual: 777,   status: "complete" },
  { name: "Shell / Gunite",   estimated: 6600,  committed: 4130,  actual: 4130,  status: "complete" },
  { name: "Plumbing",         estimated: 15120, committed: 8400,  actual: 4200,  status: "in_progress" },
  { name: "Equipment",        estimated: 10030, committed: 4245,  actual: 0,     status: "pending" },
  { name: "Interior Finish",  estimated: 5400,  committed: 2160,  actual: 0,     status: "pending" },
  { name: "Tile & Coping",    estimated: 13750, committed: 5170,  actual: 0,     status: "pending" },
];

function VarianceIcon({ variance }: { variance: number }) {
  if (variance > 200)  return <TrendingUp className="w-3.5 h-3.5 text-red-400" />;
  if (variance < -200) return <TrendingDown className="w-3.5 h-3.5 text-green-400" />;
  return <Minus className="w-3.5 h-3.5 text-slate-500" />;
}

export default function CostTrackingPage({ params }: { params: { id: string } }) {
  const totalEst       = stages.reduce((s, r) => s + r.estimated, 0);
  const totalActual    = stages.reduce((s, r) => s + r.actual, 0);
  const totalCommitted = stages.reduce((s, r) => s + r.committed, 0);
  const totalVariance  = totalActual - totalEst;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-white">Cost Tracking</h1>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Estimated",  value: formatCurrency(totalEst),       color: "text-slate-200" },
          { label: "Committed",  value: formatCurrency(totalCommitted),  color: "text-blue-300" },
          { label: "Actual",     value: formatCurrency(totalActual),     color: "text-white" },
          { label: "Variance",   value: (totalVariance >= 0 ? "+" : "") + formatCurrency(totalVariance), color: totalVariance > 0 ? "text-red-400" : "text-green-400" },
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
              <th className="text-left px-4 py-3 font-medium">Stage</th>
              <th className="text-right px-4 py-3 font-medium">Estimated</th>
              <th className="text-right px-4 py-3 font-medium">Committed</th>
              <th className="text-right px-4 py-3 font-medium">Actual</th>
              <th className="text-right px-4 py-3 font-medium">Variance</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((row, i) => {
              const variance = row.actual > 0 ? row.actual - row.estimated : 0;
              return (
                <tr key={row.name} className={cn("hover:bg-white/3 transition-colors", i < stages.length - 1 && "border-b border-[#2a2a4a]/50")}>
                  <td className="px-4 py-3 text-slate-200 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-right text-slate-400">{formatCurrency(row.estimated)}</td>
                  <td className="px-4 py-3 text-right text-blue-300">{formatCurrency(row.committed)}</td>
                  <td className="px-4 py-3 text-right text-white font-semibold">{row.actual > 0 ? formatCurrency(row.actual) : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    {row.actual > 0 ? (
                      <div className="flex items-center justify-end gap-1">
                        <VarianceIcon variance={variance} />
                        <span className={variance > 200 ? "text-red-400" : variance < -200 ? "text-green-400" : "text-slate-400"}>
                          {variance >= 0 ? "+" : ""}{formatCurrency(variance)}
                        </span>
                      </div>
                    ) : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium",
                      row.status === "complete"    ? "bg-green-900/40 text-green-300" :
                      row.status === "in_progress" ? "bg-blue-900/40 text-blue-300" :
                      "bg-zinc-800 text-zinc-500")}>
                      {row.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
