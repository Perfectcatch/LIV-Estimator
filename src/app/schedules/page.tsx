"use client";

import { Plus, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const ganttItems = [
  { job: "Henderson Residence",  stage: "Excavation",    start: 2, end: 4,   color: "bg-blue-600" },
  { job: "Henderson Residence",  stage: "Steel / Rebar", start: 4, end: 7,   color: "bg-indigo-600" },
  { job: "Henderson Residence",  stage: "Plumbing",      start: 6, end: 9,   color: "bg-purple-600" },
  { job: "Clearwater Estates",   stage: "Plumbing",      start: 1, end: 5,   color: "bg-indigo-600" },
  { job: "Clearwater Estates",   stage: "Equipment",     start: 5, end: 8,   color: "bg-yellow-600" },
  { job: "Suncoast Resort",      stage: "Equipment Set", start: 0, end: 3,   color: "bg-yellow-600" },
  { job: "Suncoast Resort",      stage: "Interior Fin.", start: 3, end: 6,   color: "bg-green-600" },
  { job: "Bay Isle Custom",      stage: "Excavation",    start: 4, end: 7,   color: "bg-blue-600" },
];

const upcomingMilestones = [
  { date: "Mar 12", label: "Rebar delivery — Clearwater Estates" },
  { date: "Mar 15", label: "Permit approval — Henderson" },
  { date: "Mar 18", label: "Shotcrete crew — Henderson" },
  { date: "Mar 24", label: "Equipment delivery — Suncoast" },
  { date: "Apr 2",  label: "Tile & coping start — Clearwater" },
];

export default function SchedulesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Schedules</h1>
          <p className="text-sm text-slate-400">Project timelines and Gantt views</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gantt chart */}
        <div className="lg:col-span-2 bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">All Jobs — 12-Month View</h3>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400 px-2">2026</span>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Month headers */}
          <div className="flex mb-2 pl-36">
            {MONTHS.map((m) => (
              <div key={m} className="flex-1 text-center text-[10px] text-slate-500">{m}</div>
            ))}
          </div>

          {/* Gantt rows */}
          <div className="space-y-2">
            {ganttItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-36 flex-shrink-0">
                  <div className="text-xs text-slate-300 truncate">{item.job}</div>
                  <div className="text-[10px] text-slate-600">{item.stage}</div>
                </div>
                <div className="flex-1 relative h-6">
                  <div className="absolute inset-0 flex">
                    {MONTHS.map((_, mi) => (
                      <div key={mi} className="flex-1 border-l border-[#2a2a4a]/30" />
                    ))}
                  </div>
                  <div
                    className={cn("absolute h-5 top-0.5 rounded-md opacity-80", item.color)}
                    style={{
                      left: `${(item.start / 12) * 100}%`,
                      width: `${((item.end - item.start) / 12) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming milestones */}
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">Upcoming Milestones</h3>
          </div>
          <div className="space-y-3">
            {upcomingMilestones.map((m) => (
              <div key={m.label} className="flex gap-3">
                <div className="w-12 flex-shrink-0">
                  <div className="text-[11px] font-semibold text-indigo-400">{m.date}</div>
                </div>
                <div className="text-xs text-slate-300 leading-snug">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
