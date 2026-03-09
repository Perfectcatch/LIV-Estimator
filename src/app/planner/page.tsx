"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency, formatPercent } from "@/lib/utils";

const jobBudgets = [
  { name: "Henderson Residence",  budget: 87500,  spent: 52000,  committed: 8000 },
  { name: "Clearwater Estates",   budget: 124000, spent: 88000,  committed: 12000 },
  { name: "Suncoast Resort",      budget: 215000, spent: 148000, committed: 22000 },
  { name: "Bay Isle Custom Pool", budget: 69800,  spent: 18000,  committed: 5000 },
];

const allocationData = [
  { name: "Materials",      value: 42, color: "#4f46e5" },
  { name: "Labor",          value: 28, color: "#10b981" },
  { name: "Subcontractors", value: 18, color: "#f59e0b" },
  { name: "Equipment",      value: 8,  color: "#e94560" },
  { name: "Overhead",       value: 4,  color: "#6b7280" },
];

const totalBudget  = jobBudgets.reduce((s, j) => s + j.budget, 0);
const totalSpent   = jobBudgets.reduce((s, j) => s + j.spent, 0);
const totalCommit  = jobBudgets.reduce((s, j) => s + j.committed, 0);

export default function PlannerPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Financial Planner</h1>
        <p className="text-sm text-slate-400">Budget planning and cost projection across all active jobs</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Budget",    value: formatCurrency(totalBudget), color: "text-white" },
          { label: "Spent to Date",   value: formatCurrency(totalSpent),  color: "text-red-400" },
          { label: "Committed",       value: formatCurrency(totalCommit), color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Job budget bars */}
        <div className="lg:col-span-2 bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Budget vs Spent by Job</h3>
          <div className="space-y-5">
            {jobBudgets.map((job) => {
              const pctSpent    = job.spent / job.budget;
              const pctCommit   = job.committed / job.budget;
              const over        = pctSpent > 0.9;
              return (
                <div key={job.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-200 font-medium">{job.name}</span>
                    <span className={over ? "text-red-400" : "text-slate-400"}>
                      {formatCurrency(job.spent)} / {formatCurrency(job.budget)} ({formatPercent(pctSpent)})
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full relative overflow-hidden">
                    <div className="absolute h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${Math.min(pctSpent * 100, 100)}%` }} />
                    <div className="absolute h-full bg-yellow-500/60 rounded-full transition-all" style={{ left: `${Math.min(pctSpent * 100, 100)}%`, width: `${Math.min(pctCommit * 100, 100 - pctSpent * 100)}%` }} />
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[10px] text-slate-600">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-indigo-500 inline-block" /> Spent</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-yellow-500/60 inline-block" /> Committed</span>
                    <span className="ml-auto">Remaining: {formatCurrency(job.budget - job.spent - job.committed)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Allocation donut */}
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Cost Allocation</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={allocationData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} dataKey="value">
                {allocationData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {allocationData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-slate-300 flex-1">{d.name}</span>
                <span className="text-slate-500">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
