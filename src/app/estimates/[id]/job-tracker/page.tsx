"use client";

import { useState } from "react";
import { ChevronLeft, CheckCircle, Circle, Clock, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type StageStatus = "complete" | "in_progress" | "pending";

const stages = [
  { name: "Permitting",        status: "complete"    as StageStatus, date: "Jan 5, 2026",  tasks: ["Submit permit application", "HOA approval", "Utility locates"] },
  { name: "Excavation",        status: "complete"    as StageStatus, date: "Jan 20, 2026", tasks: ["Layout pool footprint", "Excavate pool shell", "Haul debris"] },
  { name: "Steel & Plumbing",  status: "complete"    as StageStatus, date: "Jan 30, 2026", tasks: ["Rebar cage install", "Rough plumbing", "Inspection passed"] },
  { name: "Gunite / Shell",    status: "complete"    as StageStatus, date: "Feb 8, 2026",  tasks: ["Shotcrete application", "Wall cure (28 days)", "Shell inspection"] },
  { name: "Plumbing Trim",     status: "in_progress" as StageStatus, date: "Mar 1, 2026",  tasks: ["Equipment pad pour", "Plumbing connections", "Pressure test"] },
  { name: "Electrical",        status: "pending"     as StageStatus, date: "Mar 15, 2026", tasks: ["Conduit run", "Panel connections", "Bond wire inspection"] },
  { name: "Tile & Coping",     status: "pending"     as StageStatus, date: "Apr 1, 2026",  tasks: ["Tile band install", "Coping set", "Deck pour"] },
  { name: "Equipment Install", status: "pending"     as StageStatus, date: "Apr 20, 2026", tasks: ["Pump & filter set", "Automation wiring", "Equipment startup"] },
  { name: "Interior Finish",   status: "pending"     as StageStatus, date: "May 5, 2026",  tasks: ["Plaster / quartz apply", "Acid wash", "Fill pool"] },
  { name: "Startup & Clean",   status: "pending"     as StageStatus, date: "May 15, 2026", tasks: ["Chemical startup", "Client walkthrough", "Punch list complete"] },
];

const STATUS_CONFIG = {
  complete:    { icon: CheckCircle, color: "text-green-400",  bg: "bg-green-900/20",  label: "Complete" },
  in_progress: { icon: Clock,       color: "text-blue-400",   bg: "bg-blue-900/20",   label: "In Progress" },
  pending:     { icon: Circle,      color: "text-slate-600",  bg: "bg-white/5",       label: "Pending" },
};

export default function JobTrackerPage({ params }: { params: { id: string } }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "Plumbing Trim": true });

  const complete = stages.filter(s => s.status === "complete").length;
  const pct = Math.round((complete / stages.length) * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-white">Job Tracker</h1>
      </div>

      {/* Progress */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Overall Progress</span>
          <span className="text-sm font-bold text-white">{pct}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/5">
          <div className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"
            style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
          <span className="text-green-400">{complete} complete</span>
          <span className="text-blue-400">1 in progress</span>
          <span>{stages.length - complete - 1} pending</span>
        </div>
      </div>

      {/* Stage list */}
      <div className="space-y-2">
        {stages.map((stage, i) => {
          const cfg  = STATUS_CONFIG[stage.status];
          const Icon = cfg.icon;
          const open = expanded[stage.name];
          return (
            <div key={stage.name} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
              <button onClick={() => setExpanded(p => ({ ...p, [stage.name]: !p[stage.name] }))}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                <span className="text-xs text-slate-600 w-5 text-right">{i + 1}</span>
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", cfg.bg)}>
                  <Icon className={cn("w-3.5 h-3.5", cfg.color)} />
                </div>
                <span className="flex-1 text-sm font-semibold text-white text-left">{stage.name}</span>
                <span className="text-xs text-slate-500">{stage.date}</span>
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", cfg.bg, cfg.color)}>{cfg.label}</span>
                {open ? <ChevronDown className="w-3.5 h-3.5 text-slate-600" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
              </button>
              {open && (
                <div className="px-4 pb-3 border-t border-[#2a2a4a]/50 pt-3 space-y-1.5">
                  {stage.tasks.map(task => (
                    <div key={task} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={cn("w-3.5 h-3.5 flex-shrink-0", stage.status === "complete" ? "text-green-400" : "text-slate-600")} />
                      <span className={stage.status === "complete" ? "text-slate-400 line-through" : "text-slate-300"}>{task}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
