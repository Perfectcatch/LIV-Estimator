"use client";

import { useState } from "react";
import { Plus, CheckSquare, Clock, AlertTriangle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const mockTasks = [
  { id: "t1", title: "Submit permit application — Henderson",  job: "Henderson Residence", assignee: "Luis R.",  priority: "high",   status: "in_progress", due: "Mar 15, 2026" },
  { id: "t2", title: "Order rebar delivery — Clearwater",      job: "Clearwater Estates",  assignee: "Marco V.", priority: "high",   status: "pending",     due: "Mar 12, 2026" },
  { id: "t3", title: "Schedule shotcrete crew",                job: "Henderson Residence", assignee: "Luis R.",  priority: "medium", status: "pending",     due: "Mar 20, 2026" },
  { id: "t4", title: "Verify equipment delivery — Suncoast",  job: "Suncoast Resort",     assignee: "Jenna K.", priority: "high",   status: "complete",    due: "Mar 8, 2026" },
  { id: "t5", title: "Final walkthrough — Torres pool",        job: "Torres Backyard",     assignee: "Luis R.",  priority: "low",    status: "complete",    due: "Feb 28, 2026" },
  { id: "t6", title: "Send invoice INV-0089 to Henderson",    job: "Henderson Residence", assignee: "Jenna K.", priority: "medium", status: "pending",     due: "Mar 18, 2026" },
  { id: "t7", title: "Update Bay Isle scope estimate",        job: "Bay Isle Custom Pool", assignee: "Luis R.",  priority: "medium", status: "in_progress", due: "Mar 22, 2026" },
];

const PRIORITY_STYLES: Record<string, string> = {
  high:   "bg-red-900/40 text-red-300",
  medium: "bg-yellow-900/40 text-yellow-300",
  low:    "bg-zinc-800 text-zinc-400",
};
const STATUS_STYLES: Record<string, string> = {
  pending:     "bg-zinc-800 text-zinc-400",
  in_progress: "bg-blue-900/50 text-blue-300",
  complete:    "bg-green-900/50 text-green-300",
};
const COLUMNS = ["pending", "in_progress", "complete"];
const COL_LABELS: Record<string, string> = { pending: "To Do", in_progress: "In Progress", complete: "Done" };

export default function TasksPage() {
  const [view, setView] = useState<"board" | "list">("board");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Tasks</h1>
          <p className="text-sm text-slate-400">Project task management across all jobs</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-[#16213e] border border-[#2a2a4a] rounded-lg p-1">
            {(["board", "list"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={cn("px-3 py-1.5 rounded-md text-sm capitalize transition-colors", view === v ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200")}>
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
            <Plus className="w-4 h-4" /> New Task
          </button>
        </div>
      </div>

      {view === "board" ? (
        <div className="grid grid-cols-3 gap-4">
          {COLUMNS.map((col) => (
            <div key={col} className="bg-[#16213e]/50 border border-[#2a2a4a] rounded-xl p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{COL_LABELS[col]}</span>
                <span className="text-[10px] bg-white/10 text-slate-400 rounded-full px-2 py-0.5">
                  {mockTasks.filter((t) => t.status === col).length}
                </span>
              </div>
              <div className="space-y-2">
                {mockTasks.filter((t) => t.status === col).map((task) => (
                  <div key={task.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-lg p-3 hover:border-indigo-500/40 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm text-slate-200 leading-snug">{task.title}</span>
                      <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0", PRIORITY_STYLES[task.priority])}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{task.job}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.due}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5 text-[11px] text-slate-500">
                      <User className="w-3 h-3" />
                      {task.assignee}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Task</th>
                <th className="text-left px-4 py-3 font-medium">Job</th>
                <th className="text-left px-4 py-3 font-medium">Assignee</th>
                <th className="text-left px-4 py-3 font-medium">Priority</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Due</th>
              </tr>
            </thead>
            <tbody>
              {mockTasks.map((task, i) => (
                <tr key={task.id} className={cn("hover:bg-white/3 transition-colors", i < mockTasks.length - 1 && "border-b border-[#2a2a4a]/50")}>
                  <td className="px-4 py-3 text-slate-200 font-medium">{task.title}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{task.job}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{task.assignee}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", PRIORITY_STYLES[task.priority])}>{task.priority}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", STATUS_STYLES[task.status])}>{task.status.replace("_"," ")}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{task.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
