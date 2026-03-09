"use client";

import { Plus, PenLine, CheckCircle, Clock, FileText } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockContracts = [
  { id: "c1", title: "Henderson Pool Construction Agreement",      client: "James Henderson",    job: "Henderson Residence",  status: "signed",  total: 87500,  signed: "2026-01-12" },
  { id: "c2", title: "Clearwater Estates Pool & Spa Contract",    client: "CW Estates HOA",     job: "Clearwater Estates",   status: "signed",  total: 124000, signed: "2025-12-08" },
  { id: "c3", title: "Suncoast Resort Lap Pool Agreement",        client: "Suncoast Resort",    job: "Suncoast Resort",      status: "signed",  total: 215000, signed: "2025-11-02" },
  { id: "c4", title: "Bay Isle Custom Pool Contract",             client: "Bay Isle Properties", job: "Bay Isle Custom Pool", status: "pending", total: 69800,  signed: "" },
];

const STATUS_STYLES: Record<string, string> = {
  draft:   "bg-zinc-800 text-zinc-300",
  pending: "bg-yellow-900/50 text-yellow-300",
  signed:  "bg-green-900/50 text-green-300",
  expired: "bg-red-900/50 text-red-300",
};

export default function ContractsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Contracts</h1>
          <p className="text-sm text-slate-400">Construction agreements and e-signatures</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 border border-[#2a2a4a] transition-colors">
            <FileText className="w-4 h-4" /> Templates
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
            <Plus className="w-4 h-4" /> New Contract
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Contracts",  value: mockContracts.length.toString(),                                      icon: PenLine,     color: "text-indigo-400" },
          { label: "Signed",           value: mockContracts.filter(c => c.status === "signed").length.toString(),   icon: CheckCircle, color: "text-green-400" },
          { label: "Pending Signature",value: mockContracts.filter(c => c.status === "pending").length.toString(), icon: Clock,       color: "text-yellow-400" },
          { label: "Total Value",      value: formatCurrency(mockContracts.reduce((s,c) => s + c.total, 0)),        icon: FileText,    color: "text-blue-400" },
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

      <div className="space-y-3">
        {mockContracts.map((contract) => (
          <div key={contract.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <PenLine className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{contract.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{contract.client} · {contract.job}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{formatCurrency(contract.total)}</div>
                  <div className="text-[11px] text-slate-500">{contract.signed ? `Signed ${formatDate(contract.signed)}` : "Awaiting signature"}</div>
                </div>
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[contract.status])}>{contract.status}</span>
              </div>
            </div>
            {contract.status === "pending" && (
              <div className="mt-3 pt-3 border-t border-[#2a2a4a] flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors">Preview</button>
                <button className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-xs text-indigo-300 transition-colors">Send for Signature</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
