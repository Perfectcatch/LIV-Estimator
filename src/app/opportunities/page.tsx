"use client";

import { Plus, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Won", "Lost"];

const mockOpps = [
  { id: "o1", name: "Reyes Backyard Pool",         client: "Maria Reyes",      stage: "Proposal",     value: 72000,  probability: 70 },
  { id: "o2", name: "Largo Resort — Infinity Pool", client: "Largo Resort Grp", stage: "Qualified",    value: 285000, probability: 40 },
  { id: "o3", name: "Dupont Residence",            client: "Tim Dupont",        stage: "Lead",         value: 58000,  probability: 20 },
  { id: "o4", name: "Palm Harbor HOA",             client: "Palm Harbor HOA",   stage: "Negotiation",  value: 195000, probability: 85 },
  { id: "o5", name: "Clearwater Condo Complex",    client: "PCM Properties",    stage: "Won",          value: 340000, probability: 100 },
];

const STAGE_COLORS: Record<string, string> = {
  Lead:        "bg-zinc-800 text-zinc-300",
  Qualified:   "bg-blue-900/50 text-blue-300",
  Proposal:    "bg-indigo-900/50 text-indigo-300",
  Negotiation: "bg-yellow-900/50 text-yellow-300",
  Won:         "bg-green-900/50 text-green-300",
  Lost:        "bg-red-900/50 text-red-300",
};

export default function OpportunitiesPage() {
  const pipeline = mockOpps.filter(o => !["Won","Lost"].includes(o.stage)).reduce((s, o) => s + o.value * o.probability / 100, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Opportunities</h1>
          <p className="text-sm text-slate-400">Sales pipeline and lead tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Opportunity
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Open Opps",     value: mockOpps.filter(o => !["Won","Lost"].includes(o.stage)).length.toString() },
          { label: "Weighted Pipeline", value: formatCurrency(pipeline) },
          { label: "Total Value",   value: formatCurrency(mockOpps.reduce((s, o) => s + o.value, 0)) },
          { label: "Won This Quarter", value: "1" },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {stages.map((stage) => {
            const opps = mockOpps.filter(o => o.stage === stage);
            return (
              <div key={stage} className="w-52 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stage}</span>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", STAGE_COLORS[stage])}>{opps.length}</span>
                </div>
                <div className="space-y-2">
                  {opps.map(opp => (
                    <div key={opp.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-3 hover:border-indigo-500/40 transition-colors cursor-pointer">
                      <div className="text-sm font-medium text-white mb-1 leading-snug">{opp.name}</div>
                      <div className="text-xs text-slate-500 mb-2">{opp.client}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{formatCurrency(opp.value)}</span>
                        <span className="text-xs text-slate-400">{opp.probability}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full mt-2">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${opp.probability}%` }} />
                      </div>
                    </div>
                  ))}
                  {opps.length === 0 && (
                    <div className="h-16 border border-dashed border-[#2a2a4a] rounded-xl flex items-center justify-center">
                      <span className="text-xs text-slate-600">Empty</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
