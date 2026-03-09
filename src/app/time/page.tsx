"use client";

import { useState } from "react";
import { Plus, Clock, Play, Square } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockEntries = [
  { id: "e1", member: "Luis Ramos",   job: "Henderson Residence",  desc: "Rebar placement",       date: "Mar 10, 2026", hours: 8,   rate: 45, cost: 360 },
  { id: "e2", member: "Marco V.",     job: "Clearwater Estates",   desc: "Plumbing rough-in",     date: "Mar 10, 2026", hours: 7.5, rate: 52, cost: 390 },
  { id: "e3", member: "Jenna K.",     job: "Suncoast Resort",      desc: "Equipment installation", date: "Mar 10, 2026", hours: 9,   rate: 48, cost: 432 },
  { id: "e4", member: "Luis Ramos",   job: "Bay Isle Custom Pool",  desc: "Site prep",             date: "Mar 9, 2026",  hours: 6,   rate: 45, cost: 270 },
  { id: "e5", member: "Marco V.",     job: "Henderson Residence",  desc: "Plumbing inspection",   date: "Mar 9, 2026",  hours: 4,   rate: 52, cost: 208 },
];

const totalHours = mockEntries.reduce((s, e) => s + e.hours, 0);
const totalCost  = mockEntries.reduce((s, e) => s + e.cost,  0);

export default function TimePage() {
  const [timer, setTimer] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Time Tracking</h1>
          <p className="text-sm text-slate-400">Labor hours and cost tracking across jobs</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> Log Time
        </button>
      </div>

      {/* Timer Widget */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 flex items-center gap-6">
        <div className="text-3xl font-mono font-bold text-white tabular-nums w-24">
          {String(Math.floor(elapsed / 3600)).padStart(2,"0")}:{String(Math.floor((elapsed % 3600) / 60)).padStart(2,"0")}:{String(elapsed % 60).padStart(2,"0")}
        </div>
        <select className="bg-white/5 border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none flex-1">
          <option>Henderson Residence — Rebar</option>
          <option>Clearwater Estates — Plumbing</option>
          <option>Suncoast Resort — Equipment</option>
        </select>
        <button
          onClick={() => setTimer(!timer)}
          className={cn("flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors", timer ? "bg-red-600 hover:bg-red-500 text-white" : "bg-green-600 hover:bg-green-500 text-white")}
        >
          {timer ? <><Square className="w-4 h-4" /> Stop</> : <><Play className="w-4 h-4" /> Start</>}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Hours This Week",  value: `${totalHours}h`,             icon: Clock },
          { label: "Labor Cost",       value: formatCurrency(totalCost),    icon: Clock },
          { label: "Avg $/Hour",       value: formatCurrency(totalCost / totalHours), icon: Clock },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Time entries table */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Team Member</th>
              <th className="text-left px-4 py-3 font-medium">Job</th>
              <th className="text-left px-4 py-3 font-medium">Description</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-right px-4 py-3 font-medium">Hours</th>
              <th className="text-right px-4 py-3 font-medium">Rate</th>
              <th className="text-right px-4 py-3 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody>
            {mockEntries.map((e, i) => (
              <tr key={e.id} className={cn("hover:bg-white/3 transition-colors", i < mockEntries.length - 1 && "border-b border-[#2a2a4a]/50")}>
                <td className="px-4 py-3 text-slate-200 font-medium">{e.member}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{e.job}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{e.desc}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{e.date}</td>
                <td className="px-4 py-3 text-right text-white font-medium">{e.hours}h</td>
                <td className="px-4 py-3 text-right text-slate-400">${e.rate}/hr</td>
                <td className="px-4 py-3 text-right text-white font-semibold">{formatCurrency(e.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
