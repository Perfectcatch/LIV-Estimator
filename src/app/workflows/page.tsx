"use client";

import { Plus, Zap, Play, Pause, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const mockWorkflows = [
  { id: "w1", name: "New Estimate → Notify Team",         trigger: "Estimate Created",    actions: 2, runs: 14, status: "active",   lastRun: "2h ago" },
  { id: "w2", name: "Estimate Approved → Create Job",     trigger: "Estimate Approved",   actions: 3, runs: 6,  status: "active",   lastRun: "1d ago" },
  { id: "w3", name: "Job Complete → Request Lien Waiver", trigger: "Job Status → Complete",actions: 2, runs: 4,  status: "active",   lastRun: "3d ago" },
  { id: "w4", name: "Invoice Overdue → Send Reminder",    trigger: "Invoice 7 Days Overdue",actions: 1, runs: 2, status: "paused",  lastRun: "1w ago" },
  { id: "w5", name: "New Client → Welcome Email",         trigger: "Client Created",      actions: 1, runs: 22, status: "active",   lastRun: "1h ago" },
];

export default function WorkflowsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Workflows</h1>
          <p className="text-sm text-slate-400">Automation triggers, actions, and rules</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Workflow
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Workflows",  value: mockWorkflows.filter(w => w.status === "active").length.toString() },
          { label: "Total Runs",        value: mockWorkflows.reduce((s, w) => s + w.runs, 0).toString() },
          { label: "Paused",            value: mockWorkflows.filter(w => w.status === "paused").length.toString() },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {mockWorkflows.map((wf) => (
          <div key={wf.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", wf.status === "active" ? "bg-green-900/30" : "bg-zinc-800")}>
                  <Zap className={cn("w-4 h-4", wf.status === "active" ? "text-green-400" : "text-zinc-500")} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{wf.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Trigger: {wf.trigger} · {wf.actions} actions · {wf.runs} runs</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Last: {wf.lastRun}</span>
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", wf.status === "active" ? "bg-green-900/40 text-green-300" : "bg-zinc-800 text-zinc-400")}>{wf.status}</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                  {wf.status === "active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
