"use client";

import { Plus, Shield, CheckCircle, Clock } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockWaivers = [
  { id: "w1", job: "Henderson Residence",  vendor: "ABC Steel",       type: "Conditional",   amount: 777,   status: "signed",  due: "2026-03-10" },
  { id: "w2", job: "Henderson Residence",  vendor: "Dirt Pro LLC",    type: "Conditional",   amount: 2180,  status: "pending", due: "2026-03-12" },
  { id: "w3", job: "Clearwater Estates",   vendor: "Pool Supply Co",  type: "Unconditional", amount: 1285,  status: "signed",  due: "2026-03-08" },
  { id: "w4", job: "Suncoast Resort",      vendor: "Graybar Electric",type: "Conditional",   amount: 4200,  status: "pending", due: "2026-03-18" },
];

export default function LienWaiversPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Lien Waivers</h1>
          <p className="text-sm text-slate-400">Track conditional and unconditional lien waivers from vendors and subs</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> Request Waiver
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Signed",  value: mockWaivers.filter(w => w.status === "signed").length,  color: "text-green-400",  icon: CheckCircle },
          { label: "Pending", value: mockWaivers.filter(w => w.status === "pending").length, color: "text-yellow-400", icon: Clock },
          { label: "Total Amount", value: formatCurrency(mockWaivers.reduce((s,w) => s + w.amount, 0)), color: "text-white", icon: Shield },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${s.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Job</th>
              <th className="text-left px-4 py-3 font-medium">Vendor / Sub</th>
              <th className="text-left px-4 py-3 font-medium">Type</th>
              <th className="text-right px-4 py-3 font-medium">Amount</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {mockWaivers.map((w, i) => (
              <tr key={w.id} className={cn("hover:bg-white/3 transition-colors", i < mockWaivers.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3 text-slate-200 font-medium">{w.job}</td>
                <td className="px-4 py-3 text-slate-400">{w.vendor}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", w.type === "Conditional" ? "bg-blue-900/50 text-blue-300" : "bg-green-900/50 text-green-300")}>{w.type}</span>
                </td>
                <td className="px-4 py-3 text-right text-white font-medium">{formatCurrency(w.amount)}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", w.status === "signed" ? "bg-green-900/50 text-green-300" : "bg-yellow-900/50 text-yellow-300")}>{w.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(w.due)}</td>
                <td className="px-4 py-3 text-right">
                  {w.status === "pending" && (
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Send Reminder</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
