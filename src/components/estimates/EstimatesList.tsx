"use client";

import { useState } from "react";
import { Plus, Search, FileText, Send, CheckCircle, TrendingUp, MoreHorizontal } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface EstimateRow {
  id: string;
  name: string;
  status: string;
  final_total: number | null;
  created_at: string;
  client_name: string;
}

const STATUS_STYLES: Record<string, string> = {
  draft:     "bg-zinc-800 text-zinc-300",
  sent:      "bg-blue-900/50 text-blue-300",
  approved:  "bg-green-900/50 text-green-300",
  rejected:  "bg-red-900/50 text-red-300",
  converted: "bg-purple-900/50 text-purple-300",
};

const TABS = ["All", "Drafts", "Sent", "Approved"];

function tabToStatus(tab: string): string | null {
  if (tab === "All") return null;
  if (tab === "Drafts") return "draft";
  return tab.toLowerCase();
}

export function EstimatesList({ estimates }: { estimates: EstimateRow[] }) {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = estimates.filter((e) => {
    const statusMatch = tabToStatus(tab);
    const matchTab = !statusMatch || e.status === statusMatch;
    const q = search.toLowerCase();
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.client_name.toLowerCase().includes(q);
    return matchTab && matchSearch;
  });

  const drafts = estimates.filter((e) => e.status === "draft");
  const sent = estimates.filter((e) => e.status === "sent");
  const approved = estimates.filter((e) => e.status === "approved");
  const pipelineTotal = estimates.reduce((s, e) => s + (e.final_total ?? 0), 0);

  const kpis = [
    { label: "Drafts",   value: String(drafts.length),   sub: formatCurrency(drafts.reduce((s, e) => s + (e.final_total ?? 0), 0)),   icon: FileText,    color: "text-zinc-400",  tab: "Drafts" },
    { label: "Sent",     value: String(sent.length),     sub: formatCurrency(sent.reduce((s, e) => s + (e.final_total ?? 0), 0)),     icon: Send,        color: "text-blue-400",  tab: "Sent" },
    { label: "Approved", value: String(approved.length), sub: formatCurrency(approved.reduce((s, e) => s + (e.final_total ?? 0), 0)), icon: CheckCircle, color: "text-green-400", tab: "Approved" },
    { label: "Pipeline", value: formatCurrency(pipelineTotal), sub: `${estimates.length} total`, icon: TrendingUp,  color: "text-indigo-400", tab: "All" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Estimates</h1>
          <p className="text-sm text-slate-400">Construction estimating with catalog integration</p>
        </div>
        <a href="/estimates/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Estimate
        </a>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <button key={k.label} onClick={() => setTab(k.tab)}
              className={cn("bg-[#16213e] border rounded-xl p-4 text-left transition-colors hover:border-indigo-500/50", tab === k.tab ? "border-indigo-500/60" : "border-[#2a2a4a]")}>
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${k.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">{k.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{k.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{k.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1 bg-[#16213e] border border-[#2a2a4a] rounded-lg p-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn("px-3 py-1.5 rounded-md text-sm transition-colors", tab === t ? "bg-indigo-600 text-white font-medium" : "text-slate-400 hover:text-slate-200")}>
              {t}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search estimates or clients..."
            className="w-full pl-9 pr-4 py-2 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Estimate</th>
              <th className="text-left px-4 py-3 font-medium">Client</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Total</th>
              <th className="text-left px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No estimates found.</td>
              </tr>
            ) : (
              filtered.map((e, i) => (
                <tr key={e.id} className={cn("hover:bg-white/[0.03] transition-colors", i < filtered.length - 1 && "border-b border-[#2a2a4a]/50")}>
                  <td className="px-4 py-3">
                    <a href={`/estimates/${e.id}`} className="text-slate-200 hover:text-indigo-300 font-medium">{e.name}</a>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{e.client_name}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize", STATUS_STYLES[e.status] ?? "bg-zinc-800 text-zinc-300")}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(e.final_total ?? 0)}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{formatDate(e.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-500 hover:text-slate-300 p-1 rounded"><MoreHorizontal className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
