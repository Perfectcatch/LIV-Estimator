"use client";

import { Plus, Box, Upload, FileArchive, Eye } from "lucide-react";

const mockModels = [
  { id: "m1", name: "Henderson Pool — Final Design",      job: "Henderson Residence",  type: "IFC",   size: "4.2 MB",   date: "Jan 28, 2026" },
  { id: "m2", name: "Clearwater Estates — Pool & Spa",   job: "Clearwater Estates",   type: "RVT",   size: "12.8 MB",  date: "Dec 15, 2025" },
  { id: "m3", name: "Suncoast Lap Pool — Structural",    job: "Suncoast Resort",       type: "DWG",   size: "3.1 MB",   date: "Nov 10, 2025" },
  { id: "m4", name: "Bay Isle — Site Plan",              job: "Bay Isle Custom Pool",  type: "PDF",   size: "1.4 MB",   date: "Feb 18, 2026" },
];

const TYPE_COLORS: Record<string, string> = {
  IFC: "bg-blue-900/50 text-blue-300",
  RVT: "bg-purple-900/50 text-purple-300",
  DWG: "bg-orange-900/50 text-orange-300",
  PDF: "bg-red-900/50 text-red-300",
};

export default function BimPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">BIM</h1>
          <p className="text-sm text-slate-400">Building information models, structural drawings & site plans</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 border border-[#2a2a4a] transition-colors">
            <Upload className="w-4 h-4" /> Upload
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
            <Plus className="w-4 h-4" /> New Model
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[{ label: "Total Models", value: "4" }, { label: "IFC Files", value: "1" }, { label: "Drawings", value: "2" }, { label: "Total Size", value: "21.5 MB" }].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Models grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockModels.map((model) => (
          <div key={model.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <Box className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate">{model.name}</div>
                <div className="text-xs text-slate-500">{model.job}</div>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${TYPE_COLORS[model.type] || "bg-zinc-800 text-zinc-400"}`}>{model.type}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-[#2a2a4a]">
              <div className="flex items-center gap-1">
                <FileArchive className="w-3 h-3" />
                {model.size}
              </div>
              <span>{model.date}</span>
              <button className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors">
                <Eye className="w-3 h-3" /> View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RFI / Submittals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Open RFIs</h3>
            <button className="text-indigo-400 hover:text-indigo-300 text-xs">+ New RFI</button>
          </div>
          <p className="text-slate-500 text-sm">No open RFIs.</p>
        </div>
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Submittals</h3>
            <button className="text-indigo-400 hover:text-indigo-300 text-xs">+ New Submittal</button>
          </div>
          <p className="text-slate-500 text-sm">No pending submittals.</p>
        </div>
      </div>
    </div>
  );
}
