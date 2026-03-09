"use client";

import { Plus } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockCOs = [
  { id: "c1", number: "CO-008", job: "Henderson Residence", client: "James Henderson",    title: "Upgrade to Pebble Tec finish",         status: "pending",  total: 4200,  created: "2026-03-09" },
  { id: "c2", number: "CO-007", job: "Clearwater Estates",  client: "CW Estates HOA",     title: "Add raised spa spillway",               status: "approved", total: 12000, created: "2026-02-28" },
  { id: "c3", number: "CO-006", job: "Suncoast Resort",     client: "Suncoast Resort",    title: "Additional deck lighting package",      status: "approved", total: 3800,  created: "2026-02-15" },
  { id: "c4", number: "CO-005", job: "Bay Isle Custom Pool",client: "Bay Isle Properties","title": "Soil conditions — extra excavation",  status: "rejected", total: 2100,  created: "2026-01-20" },
];

const STATUS_STYLES: Record<string, string> = {
  draft:    "bg-zinc-800 text-zinc-300",
  pending:  "bg-yellow-900/50 text-yellow-300",
  approved: "bg-green-900/50 text-green-300",
  rejected: "bg-red-900/50 text-red-300",
};

export default function ChangeOrdersPage() {
  const totalApproved = mockCOs.filter(c => c.status === "approved").reduce((s, c) => s + c.total, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Change Orders</h1>
          <p className="text-sm text-slate-400">Scope changes and client approved additions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Change Order
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total COs",     value: mockCOs.length.toString() },
          { label: "Pending",       value: mockCOs.filter(c => c.status === "pending").length.toString() },
          { label: "Approved Value",value: formatCurrency(totalApproved) },
          { label: "Avg CO Value",  value: formatCurrency(totalApproved / mockCOs.filter(c => c.status === "approved").length) },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {mockCOs.map((co) => (
          <div key={co.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xs font-mono text-indigo-400 bg-indigo-900/30 px-2 py-1 rounded">{co.number}</div>
                <div>
                  <div className="text-sm font-semibold text-white">{co.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{co.job} · {co.client}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{formatCurrency(co.total)}</div>
                  <div className="text-[11px] text-slate-500">{formatDate(co.created)}</div>
                </div>
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[co.status])}>{co.status}</span>
              </div>
            </div>
            {co.status === "pending" && (
              <div className="mt-3 pt-3 border-t border-[#2a2a4a] flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-xs text-green-300 transition-colors">Approve</button>
                <button className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-xs text-red-300 transition-colors">Reject</button>
                <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors ml-auto">Send to Client</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
