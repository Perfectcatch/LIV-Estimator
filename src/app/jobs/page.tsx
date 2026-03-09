"use client";

import { useState } from "react";
import { Plus, Search, Briefcase, CheckCircle, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockJobs = [
  { id: "1", name: "Henderson Residence — 15x30 Pool", client: "James Henderson",    status: "in_progress", stage: "Steel / Rebar",  revenue: 87500,  cost: 58000,  progress: 45, start: "Jan 15, 2026" },
  { id: "2", name: "Clearwater Estates Pool & Spa",    client: "CW Estates HOA",     status: "in_progress", stage: "Plumbing",      revenue: 124000, cost: 82000,  progress: 62, start: "Dec 10, 2025" },
  { id: "3", name: "Bay Isle Custom Pool",             client: "Bay Isle Properties", status: "on_hold",     stage: "Excavation",    revenue: 69800,  cost: 35000,  progress: 22, start: "Feb 1, 2026" },
  { id: "4", name: "Suncoast Resort Feature Pool",     client: "Suncoast Resort",    status: "in_progress", stage: "Equipment Set", revenue: 215000, cost: 148000, progress: 78, start: "Nov 5, 2025" },
  { id: "5", name: "Torres Backyard Pool",             client: "Sandra & Mike Torres",status: "complete",    stage: "Complete",      revenue: 69800,  cost: 45200,  progress: 100, start: "Sep 1, 2025" },
];

const STATUS_STYLES: Record<string, string> = {
  in_progress: "bg-blue-900/50 text-blue-300",
  on_hold:     "bg-yellow-900/50 text-yellow-300",
  complete:    "bg-green-900/50 text-green-300",
  pending:     "bg-zinc-800 text-zinc-400",
  cancelled:   "bg-red-900/50 text-red-300",
};

const kpis = [
  { label: "Active Jobs",    value: "4",           icon: Briefcase,  color: "text-indigo-400" },
  { label: "Completed",      value: "1",           icon: CheckCircle, color: "text-green-400" },
  { label: "Total Revenue",  value: formatCurrency(566100), icon: DollarSign, color: "text-yellow-400" },
  { label: "Total Cost",     value: formatCurrency(368200), icon: TrendingUp, color: "text-blue-400" },
];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockJobs.filter((j) =>
    j.name.toLowerCase().includes(search.toLowerCase()) ||
    j.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Jobs</h1>
          <p className="text-sm text-slate-400">Project tracking and job management</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Job
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${k.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">{k.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{k.label}</div>
            </div>
          );
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Job</th>
              <th className="text-left px-4 py-3 font-medium">Client</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Stage</th>
              <th className="text-right px-4 py-3 font-medium">Revenue</th>
              <th className="text-right px-4 py-3 font-medium">Cost</th>
              <th className="text-left px-4 py-3 font-medium">Progress</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job, i) => (
              <tr key={job.id} className={cn("hover:bg-white/3 transition-colors", i < filtered.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3">
                  <a href={`/jobs/${job.id}`} className="text-slate-200 hover:text-indigo-300 font-medium">{job.name}</a>
                  <div className="text-[11px] text-slate-500">Started {job.start}</div>
                </td>
                <td className="px-4 py-3 text-slate-400">{job.client}</td>
                <td className="px-4 py-3">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[job.status])}>
                    {job.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-xs">{job.stage}</td>
                <td className="px-4 py-3 text-right text-white font-medium">{formatCurrency(job.revenue)}</td>
                <td className="px-4 py-3 text-right text-slate-400">{formatCurrency(job.cost)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                      <div className={cn("h-full rounded-full", job.progress === 100 ? "bg-green-500" : "bg-indigo-500")} style={{ width: `${job.progress}%` }} />
                    </div>
                    <span className="text-[11px] text-slate-500 w-8">{job.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
