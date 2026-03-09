"use client";

import { Plus, FileCode, Search } from "lucide-react";
import { useState } from "react";

const mockSpecs = [
  { id: "s1", title: "Pool Shell Structural Specs",        job: "Henderson Residence",  category: "Structural",  date: "Jan 20, 2026" },
  { id: "s2", title: "Plumbing System Requirements",       job: "Clearwater Estates",   category: "Plumbing",    date: "Dec 12, 2025" },
  { id: "s3", title: "Equipment Pad & Mechanical Specs",  job: "Suncoast Resort",       category: "Mechanical",  date: "Nov 8, 2025" },
  { id: "s4", title: "Interior Finish Spec Sheet",        job: "Henderson Residence",  category: "Finishes",    date: "Feb 2, 2026" },
  { id: "s5", title: "Electrical & Lighting Standards",   job: "Bay Isle Custom Pool",  category: "Electrical",  date: "Feb 20, 2026" },
];

const CAT_COLORS: Record<string, string> = {
  Structural: "bg-blue-900/50 text-blue-300",
  Plumbing:   "bg-cyan-900/50 text-cyan-300",
  Mechanical: "bg-orange-900/50 text-orange-300",
  Finishes:   "bg-purple-900/50 text-purple-300",
  Electrical: "bg-yellow-900/50 text-yellow-300",
};

export default function SpecificationsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockSpecs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Spec Sheets</h1>
          <p className="text-sm text-slate-400">Technical specifications and material standards</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Spec
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search specifications..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((spec) => (
          <div key={spec.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors cursor-pointer">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <FileCode className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white leading-snug">{spec.title}</div>
                <div className="text-xs text-slate-500 mt-0.5">{spec.job}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${CAT_COLORS[spec.category] || "bg-zinc-800 text-zinc-400"}`}>{spec.category}</span>
              <span className="text-slate-500">{spec.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
