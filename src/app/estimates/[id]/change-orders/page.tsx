"use client";

import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockCOs = [
  { id: "co1", num: "CO-001", title: "Add beach entry steps",         status: "approved", total: 4200,  date: "Feb 12, 2026" },
  { id: "co2", num: "CO-002", title: "Upgrade to color LED lighting", status: "pending",  total: 1850,  date: "Mar 3, 2026"  },
  { id: "co3", num: "CO-003", title: "Add raised spa spillway",       status: "draft",    total: 6500,  date: "Mar 8, 2026"  },
];

const STATUS_STYLES: Record<string, string> = {
  draft:    "bg-zinc-800 text-zinc-400",
  pending:  "bg-yellow-900/40 text-yellow-300",
  approved: "bg-green-900/40 text-green-300",
  rejected: "bg-red-900/40 text-red-300",
};

export default function EstimateCOsPage({ params }: { params: { id: string } }) {
  const approvedTotal = mockCOs.filter(c => c.status === "approved").reduce((s, c) => s + c.total, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold text-white">Change Orders</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New CO
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total COs",      value: mockCOs.length.toString() },
          { label: "Approved Value", value: formatCurrency(approvedTotal) },
          { label: "Pending",        value: mockCOs.filter(c => c.status === "pending").length.toString() },
        ].map(s => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {mockCOs.map((co) => (
          <div key={co.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-indigo-400">{co.num}</span>
                <span className="text-sm font-semibold text-white">{co.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">{formatCurrency(co.total)}</span>
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[co.status])}>{co.status}</span>
                <span className="text-xs text-slate-500">{co.date}</span>
              </div>
            </div>
            {co.status === "pending" && (
              <div className="mt-3 pt-3 border-t border-[#2a2a4a] flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-green-900/20 hover:bg-green-900/30 text-xs text-green-300 transition-colors">Approve</button>
                <button className="px-3 py-1.5 rounded-lg bg-red-900/20 hover:bg-red-900/30 text-xs text-red-300 transition-colors">Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
