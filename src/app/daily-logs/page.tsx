"use client";

import { useState } from "react";
import { Plus, BookOpen, Cloud, Sun, CloudRain, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const mockLogs = [
  { id: "l1", date: "Mar 10, 2026", job: "Henderson Residence",  status: "submitted", weather: "Sunny",    workers: 6, notes: "Rebar placement 60% complete. No issues." },
  { id: "l2", date: "Mar 9, 2026",  job: "Clearwater Estates",   status: "submitted", weather: "Cloudy",   workers: 8, notes: "Plumbing rough-in complete. Inspection scheduled Mar 12." },
  { id: "l3", date: "Mar 9, 2026",  job: "Suncoast Resort",      status: "submitted", weather: "Sunny",    workers: 12, notes: "Equipment pad poured. Pool pump installed." },
  { id: "l4", date: "Mar 10, 2026", job: "Bay Isle Custom Pool",  status: "draft",     weather: "Rain",     workers: 0, notes: "Rain delay. Work postponed to Mar 12." },
];

const WEATHER_ICONS: Record<string, React.ReactNode> = {
  Sunny:  <Sun className="w-3.5 h-3.5 text-yellow-400" />,
  Cloudy: <Cloud className="w-3.5 h-3.5 text-slate-400" />,
  Rain:   <CloudRain className="w-3.5 h-3.5 text-blue-400" />,
};

export default function DailyLogsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedLog = mockLogs.find((l) => l.id === selected);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Daily Logs</h1>
          <p className="text-sm text-slate-400">Field reports and on-site documentation</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Log list */}
        <div className="lg:col-span-2 space-y-3">
          {mockLogs.map((log) => (
            <div
              key={log.id}
              onClick={() => setSelected(log.id === selected ? null : log.id)}
              className={cn(
                "bg-[#16213e] border rounded-xl p-4 cursor-pointer transition-colors hover:border-indigo-500/40",
                selected === log.id ? "border-indigo-500/60" : "border-[#2a2a4a]"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{log.job}</div>
                    <div className="text-xs text-slate-500">{log.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", log.status === "submitted" ? "bg-green-900/40 text-green-300" : "bg-zinc-800 text-zinc-400")}>
                    {log.status}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">{WEATHER_ICONS[log.weather]} {log.weather}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-500" /> {log.workers} workers</span>
              </div>
              <p className="mt-2 text-xs text-slate-400 line-clamp-2">{log.notes}</p>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          {selectedLog ? (
            <>
              <h3 className="text-sm font-semibold text-white mb-1">{selectedLog.job}</h3>
              <p className="text-xs text-slate-500 mb-4">{selectedLog.date}</p>
              <div className="space-y-3">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Weather</div>
                  <div className="flex items-center gap-2 text-sm text-slate-300">
                    {WEATHER_ICONS[selectedLog.weather]} {selectedLog.weather}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Workers On Site</div>
                  <div className="text-sm text-slate-300">{selectedLog.workers}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Field Notes</div>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedLog.notes}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#2a2a4a] flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors">Edit</button>
                <button className="flex-1 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-xs text-indigo-300 transition-colors">Submit</button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <BookOpen className="w-8 h-8 text-slate-600 mb-3" />
              <p className="text-sm text-slate-500">Select a log to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
