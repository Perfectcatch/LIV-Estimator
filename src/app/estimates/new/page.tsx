"use client";

import { useState } from "react";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewEstimatePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    clientName:   "",
    jobName:      "",
    description:  "",
    poolType:     "rectangular",
    superAssembly: "standard-15x30",
  });

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/estimates/demo-id/takeoff");
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/estimates" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-white">New Estimate</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Client & Project</h2>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Client Name *</label>
            <input required value={form.clientName} onChange={e => set("clientName", e.target.value)}
              placeholder="e.g. James Henderson"
              className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Project / Job Name *</label>
            <input required value={form.jobName} onChange={e => set("jobName", e.target.value)}
              placeholder="e.g. Henderson Residence — 15x30 Pool"
              className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => set("description", e.target.value)}
              rows={3} placeholder="Optional notes about this estimate..."
              className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
          </div>
        </div>

        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Pool Configuration</h2>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Pool Type</label>
            <select value={form.poolType} onChange={e => set("poolType", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="rectangular">Rectangular</option>
              <option value="freeform">Freeform</option>
              <option value="lap">Lap Pool</option>
              <option value="infinity">Infinity Edge</option>
              <option value="plunge">Plunge / Cocktail</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1.5">Starting Package (Super-Assembly)</label>
            <select value={form.superAssembly} onChange={e => set("superAssembly", e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="standard-15x30">Standard 15×30 Package</option>
              <option value="standard-20x40">Standard 20×40 Package</option>
              <option value="premium-with-spa">Premium Pool + Spa Package</option>
              <option value="lap-20x60">Lap Pool 20×60 Package</option>
              <option value="custom">Custom (manual BOM)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/estimates" className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors text-center">
            Cancel
          </Link>
          <button type="submit"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-colors">
            <Save className="w-4 h-4" /> Create & Open Takeoff
          </button>
        </div>
      </form>
    </div>
  );
}
