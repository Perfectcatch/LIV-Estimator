"use client";

import { useState } from "react";
import { Plus, Search, DollarSign, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockInvoices = [
  { id: "inv1", number: "INV-0089", client: "James Henderson",    job: "Henderson Residence",  status: "sent",    total: 31250, paid: 0,     due: "2026-03-18" },
  { id: "inv2", number: "INV-0088", client: "CW Estates HOA",     job: "Clearwater Estates",   status: "partial", total: 65000, paid: 32500, due: "2026-03-10" },
  { id: "inv3", number: "INV-0087", client: "Suncoast Resort",    job: "Suncoast Resort",      status: "paid",    total: 86000, paid: 86000, due: "2026-02-28" },
  { id: "inv4", number: "INV-0086", client: "Bay Isle Properties",job: "Bay Isle Custom Pool", status: "draft",   total: 7980,  paid: 0,     due: "2026-04-01" },
  { id: "inv5", number: "INV-0085", client: "Sandra Torres",      job: "Torres Backyard",      status: "paid",    total: 6980,  paid: 6980,  due: "2026-02-15" },
];

const STATUS_STYLES: Record<string, string> = {
  draft:   "bg-zinc-800 text-zinc-300",
  sent:    "bg-blue-900/50 text-blue-300",
  partial: "bg-yellow-900/50 text-yellow-300",
  paid:    "bg-green-900/50 text-green-300",
  overdue: "bg-red-900/50 text-red-300",
};

const totalOutstanding = mockInvoices.filter(i => i.status !== "paid").reduce((s, i) => s + (i.total - i.paid), 0);
const totalPaid        = mockInvoices.filter(i => i.status === "paid").reduce((s, i) => s + i.paid, 0);

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const filtered = mockInvoices.filter(i =>
    i.number.toLowerCase().includes(search.toLowerCase()) ||
    i.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Invoices</h1>
          <p className="text-sm text-slate-400">Client billing and payment tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Outstanding",    value: formatCurrency(totalOutstanding), icon: AlertTriangle, color: "text-yellow-400" },
          { label: "Collected",      value: formatCurrency(totalPaid),        icon: CheckCircle,  color: "text-green-400" },
          { label: "Invoices Sent",  value: "2",                              icon: DollarSign,   color: "text-blue-400" },
          { label: "Avg Days to Pay",value: "14 days",                        icon: Clock,        color: "text-indigo-400" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${s.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Invoice #</th>
              <th className="text-left px-4 py-3 font-medium">Client</th>
              <th className="text-left px-4 py-3 font-medium">Job</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-right px-4 py-3 font-medium">Paid</th>
              <th className="text-right px-4 py-3 font-medium">Balance</th>
              <th className="text-left px-4 py-3 font-medium">Due</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => (
              <tr key={inv.id} className={cn("hover:bg-white/3 transition-colors", i < filtered.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3 text-indigo-400 font-medium hover:text-indigo-300 cursor-pointer">{inv.number}</td>
                <td className="px-4 py-3 text-slate-200">{inv.client}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{inv.job}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[inv.status])}>{inv.status}</span>
                </td>
                <td className="px-4 py-3 text-right text-white font-medium">{formatCurrency(inv.total)}</td>
                <td className="px-4 py-3 text-right text-green-400">{formatCurrency(inv.paid)}</td>
                <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(inv.total - inv.paid)}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(inv.due)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
