"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockPOs = [
  { id: "po1", number: "PO-0047", job: "Henderson Residence", vendor: "Pentair",         status: "issued",   total: 18400, issued: "2026-03-08", expected: "2026-03-15" },
  { id: "po2", number: "PO-0046", job: "Clearwater Estates",  vendor: "Pool Supply Co",  status: "received", total: 6240,  issued: "2026-03-01", expected: "2026-03-08" },
  { id: "po3", number: "PO-0045", job: "Suncoast Resort",     vendor: "Graybar Electric",status: "issued",   total: 4200,  issued: "2026-03-05", expected: "2026-03-18" },
  { id: "po4", number: "PO-0044", job: "Bay Isle Custom Pool",vendor: "ABC Steel",       status: "draft",    total: 1540,  issued: "2026-03-10", expected: "2026-03-20" },
];

const STATUS_STYLES: Record<string, string> = {
  draft:    "bg-zinc-800 text-zinc-300",
  issued:   "bg-blue-900/50 text-blue-300",
  received: "bg-green-900/50 text-green-300",
  partial:  "bg-yellow-900/50 text-yellow-300",
  cancelled:"bg-red-900/50 text-red-300",
};

export default function PurchaseOrdersPage() {
  const [search, setSearch] = useState("");
  const filtered = mockPOs.filter(po =>
    po.number.toLowerCase().includes(search.toLowerCase()) ||
    po.vendor.toLowerCase().includes(search.toLowerCase()) ||
    po.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Purchase Orders</h1>
          <p className="text-sm text-slate-400">Vendor purchase orders and materials procurement</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New PO
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total POs",     value: mockPOs.length.toString() },
          { label: "Issued",        value: mockPOs.filter(p => p.status === "issued").length.toString() },
          { label: "Received",      value: mockPOs.filter(p => p.status === "received").length.toString() },
          { label: "Total Value",   value: formatCurrency(mockPOs.reduce((s, p) => s + p.total, 0)) },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search purchase orders..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">PO #</th>
              <th className="text-left px-4 py-3 font-medium">Job</th>
              <th className="text-left px-4 py-3 font-medium">Vendor</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-left px-4 py-3 font-medium">Issued</th>
              <th className="text-left px-4 py-3 font-medium">Expected</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((po, i) => (
              <tr key={po.id} className={cn("hover:bg-white/3 transition-colors", i < filtered.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3 text-indigo-400 font-medium">{po.number}</td>
                <td className="px-4 py-3 text-slate-300">{po.job}</td>
                <td className="px-4 py-3 text-slate-400">{po.vendor}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[po.status])}>{po.status}</span>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(po.total)}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(po.issued)}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(po.expected)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
