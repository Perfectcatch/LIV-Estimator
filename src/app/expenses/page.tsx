"use client";

import { useState } from "react";
import { Plus, Search, Receipt } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockExpenses = [
  { id: "x1", desc: "Rebar — #4 Steel (42 sticks)",      job: "Henderson Residence", vendor: "ABC Steel",      amount: 777,   category: "Materials",    status: "approved", date: "2026-03-08" },
  { id: "x2", desc: "Excavation subcontractor — Haul",   job: "Henderson Residence", vendor: "Dirt Pro LLC",   amount: 2180,  category: "Sub",          status: "approved", date: "2026-03-06" },
  { id: "x3", desc: "Pentair IntelliFlo3 VS Pump",       job: "Clearwater Estates",  vendor: "Pool Supply Co", amount: 1285,  category: "Equipment",    status: "pending",  date: "2026-03-09" },
  { id: "x4", desc: "Quartz interior finish material",   job: "Clearwater Estates",  vendor: "Pebble Tec",     amount: 2160,  category: "Materials",    status: "pending",  date: "2026-03-10" },
  { id: "x5", desc: "Fuel & truck maintenance",          job: "All Jobs",             vendor: "Petro Fleet",    amount: 340,   category: "Overhead",     status: "approved", date: "2026-03-07" },
  { id: "x6", desc: "Electrical panel & breakers",       job: "Suncoast Resort",     vendor: "Graybar Electric",amount: 4200, category: "Materials",    status: "approved", date: "2026-03-05" },
];

const CAT_COLORS: Record<string, string> = {
  Materials:  "bg-blue-900/40 text-blue-300",
  Sub:        "bg-purple-900/40 text-purple-300",
  Equipment:  "bg-yellow-900/40 text-yellow-300",
  Overhead:   "bg-zinc-800 text-zinc-400",
  Labor:      "bg-green-900/40 text-green-300",
};

const totalApproved = mockExpenses.filter(e => e.status === "approved").reduce((s, e) => s + e.amount, 0);
const totalPending  = mockExpenses.filter(e => e.status === "pending").reduce((s, e) => s + e.amount, 0);

export default function ExpensesPage() {
  const [search, setSearch] = useState("");
  const filtered = mockExpenses.filter(e =>
    e.desc.toLowerCase().includes(search.toLowerCase()) ||
    e.vendor.toLowerCase().includes(search.toLowerCase()) ||
    e.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Expenses</h1>
          <p className="text-sm text-slate-400">Track job costs, vendor payments, and receipts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Expenses",  value: formatCurrency(mockExpenses.reduce((s,e) => s + e.amount, 0)), color: "text-white" },
          { label: "Approved",        value: formatCurrency(totalApproved), color: "text-green-400" },
          { label: "Pending Review",  value: formatCurrency(totalPending),  color: "text-yellow-400" },
          { label: "This Month",      value: formatCurrency(10942),          color: "text-indigo-400" },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search expenses..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Description</th>
              <th className="text-left px-4 py-3 font-medium">Job</th>
              <th className="text-left px-4 py-3 font-medium">Vendor</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-right px-4 py-3 font-medium">Amount</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e, i) => (
              <tr key={e.id} className={cn("hover:bg-white/3 transition-colors", i < filtered.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3 text-slate-200 font-medium">{e.desc}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{e.job}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{e.vendor}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", CAT_COLORS[e.category] || "bg-zinc-800 text-zinc-400")}>{e.category}</span>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(e.amount)}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", e.status === "approved" ? "bg-green-900/40 text-green-300" : "bg-yellow-900/40 text-yellow-300")}>
                    {e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(e.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
