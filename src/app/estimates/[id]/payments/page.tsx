"use client";

import { ChevronLeft, DollarSign, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const milestones = [
  { label: "Deposit",          pct: 10, amount: 8750,  status: "paid",    date: "Jan 15, 2026" },
  { label: "Shell Complete",   pct: 45, amount: 39375, status: "pending", date: "Apr 1, 2026" },
  { label: "Equipment Set",    pct: 20, amount: 17500, status: "pending", date: "May 15, 2026" },
  { label: "Final Completion", pct: 25, amount: 21875, status: "pending", date: "Jun 30, 2026" },
];

export default function PaymentsPage({ params }: { params: { id: string } }) {
  const paid  = milestones.filter(m => m.status === "paid").reduce((s,m) => s + m.amount, 0);
  const total = milestones.reduce((s,m) => s + m.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-white">Payment Schedule</h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Contract", value: formatCurrency(total),        color: "text-white" },
          { label: "Collected",      value: formatCurrency(paid),         color: "text-green-400" },
          { label: "Remaining",      value: formatCurrency(total - paid), color: "text-indigo-300" },
        ].map(s => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        {milestones.map((m, i) => (
          <div key={m.label} className={cn("flex items-center gap-4 px-5 py-4", i < milestones.length - 1 && "border-b border-[#2a2a4a]")}>  
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0", m.status === "paid" ? "bg-green-900/40" : "bg-white/5")}>
              {m.status === "paid" ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Clock className="w-4 h-4 text-slate-500" />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{m.label} <span className="text-slate-500 font-normal">({m.pct}%)</span></div>
              <div className="text-xs text-slate-500">Due: {m.date}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">{formatCurrency(m.amount)}</div>
              <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", m.status === "paid" ? "bg-green-900/40 text-green-300" : "bg-zinc-800 text-zinc-400")}>{m.status}</span>
            </div>
            {m.status === "pending" && (
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-xs text-indigo-300 transition-colors">Record Payment</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
