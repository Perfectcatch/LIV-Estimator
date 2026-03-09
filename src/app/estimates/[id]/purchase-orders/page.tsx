"use client";

import { ChevronLeft, Plus, FileText } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockPOs = [
  { id: "po1", num: "PO-2603-001", vendor: "Dirt Pro LLC",        desc: "Excavation — Henderson",   status: "issued",   total: 2180,  date: "Jan 20, 2026" },
  { id: "po2", num: "PO-2603-002", vendor: "Sunstate Shotcrete",  desc: "Gunite Shell Package",      status: "received", total: 4130,  date: "Jan 28, 2026" },
  { id: "po3", num: "PO-2603-003", vendor: "Pool Supply Co.",     desc: "Equipment Package",         status: "issued",   total: 4245,  date: "Feb 5, 2026" },
  { id: "po4", num: "PO-2603-004", vendor: "Precision Plumbing",  desc: "Plumbing Sub Contract",     status: "draft",    total: 8400,  date: "Feb 10, 2026" },
];

const STATUS_STYLES: Record<string, string> = {
  draft:    "bg-zinc-800 text-zinc-400",
  issued:   "bg-blue-900/40 text-blue-300",
  received: "bg-green-900/40 text-green-300",
  partial:  "bg-yellow-900/40 text-yellow-300",
};

export default function EstimatePOsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold text-white">Purchase Orders</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New PO
        </button>
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">PO #</th>
              <th className="text-left px-4 py-3 font-medium">Vendor</th>
              <th className="text-left px-4 py-3 font-medium">Description</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockPOs.map((po, i) => (
              <tr key={po.id} className={cn("hover:bg-white/3 transition-colors", i < mockPOs.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3 font-mono text-indigo-400 text-xs">{po.num}</td>
                <td className="px-4 py-3 text-slate-200 font-medium">{po.vendor}</td>
                <td className="px-4 py-3 text-slate-400">{po.desc}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[po.status])}>{po.status}</span>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(po.total)}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{po.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
