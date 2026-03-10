"use client";

import { useState } from "react";
import { Plus, Search, FileText, Send, CheckCircle, TrendingUp, MoreHorizontal, Filter } from "lucide-react";
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

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  draft:     { bg: "rgba(60,60,80,0.5)",    text: "#8888b0", dot: "#50507a" },
  sent:      { bg: "rgba(37,99,235,0.12)",  text: "#93c5fd", dot: "#3b82f6" },
  approved:  { bg: "rgba(16,185,129,0.12)", text: "#6ee7b7", dot: "#10b981" },
  rejected:  { bg: "rgba(239,68,68,0.12)",  text: "#fca5a5", dot: "#ef4444" },
  converted: { bg: "rgba(139,92,246,0.12)", text: "#c4b5fd", dot: "#8b5cf6" },
};

const KPI_CONFIG = [
  { key: "drafts",   label: "Drafts",   icon: FileText,    accent: "#6060a0", accentBg: "rgba(80,80,160,0.08)", filter: "Drafts"   },
  { key: "sent",     label: "Sent",     icon: Send,        accent: "#3b82f6", accentBg: "rgba(59,130,246,0.08)", filter: "Sent"    },
  { key: "approved", label: "Approved", icon: CheckCircle, accent: "#10b981", accentBg: "rgba(16,185,129,0.08)", filter: "Approved"},
  { key: "pipeline", label: "Pipeline", icon: TrendingUp,  accent: "#6366f1", accentBg: "rgba(99,102,241,0.08)", filter: "All"    },
];

const TABS = ["All", "Drafts", "Sent", "Approved"];

function tabToStatus(tab: string): string | null {
  if (tab === "All") return null;
  if (tab === "Drafts") return "draft";
  return tab.toLowerCase();
}

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {status}
    </span>
  );
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

  const drafts   = estimates.filter(e => e.status === "draft");
  const sent     = estimates.filter(e => e.status === "sent");
  const approved = estimates.filter(e => e.status === "approved");
  const pipelineTotal = estimates.reduce((s, e) => s + (e.final_total ?? 0), 0);

  const kpiValues: Record<string, { count: string; sub: string }> = {
    drafts:   { count: String(drafts.length),   sub: formatCurrency(drafts.reduce((s, e)   => s + (e.final_total ?? 0), 0)) },
    sent:     { count: String(sent.length),     sub: formatCurrency(sent.reduce((s, e)     => s + (e.final_total ?? 0), 0)) },
    approved: { count: String(approved.length), sub: formatCurrency(approved.reduce((s, e) => s + (e.final_total ?? 0), 0)) },
    pipeline: { count: formatCurrency(pipelineTotal), sub: `${estimates.length} total estimates` },
  };

  return (
    <div className="p-6 space-y-5" style={{ minHeight: "100%" }}>

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-white tracking-tight">Estimates</h1>
          <p className="text-[12px] mt-0.5" style={{ color: "#40406a" }}>
            Construction estimating with 4-tier catalog integration
          </p>
        </div>
        <a
          href="/estimates/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white transition-all cursor-pointer hover:brightness-110"
          style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.25)" }}
        >
          <Plus className="w-4 h-4" /> New Estimate
        </a>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPI_CONFIG.map((k) => {
          const Icon = k.icon;
          const vals = kpiValues[k.key];
          const isActive = tab === k.filter;
          return (
            <button
              key={k.key}
              onClick={() => setTab(k.filter)}
              className="text-left rounded-xl p-4 transition-all duration-150 cursor-pointer"
              style={{
                background: isActive ? k.accentBg : "#0f0f22",
                border: `1px solid ${isActive ? k.accent + "40" : "#1a1a32"}`,
                boxShadow: isActive ? `0 0 0 1px ${k.accent}20` : "none",
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = "#252545"; }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = "#1a1a32"; }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${k.accent}15` }}
              >
                <Icon className="w-4 h-4" style={{ color: k.accent }} />
              </div>
              <div className="text-[20px] font-bold text-white leading-none">{vals.count}</div>
              <div className="text-[11px] font-medium mt-1" style={{ color: "#40406a" }}>{k.label}</div>
              <div className="text-[11px] mt-0.5 tabular-nums" style={{ color: isActive ? k.accent : "#35356a" }}>{vals.sub}</div>
            </button>
          );
        })}
      </div>

      {/* ── Filters row ── */}
      <div className="flex items-center gap-3">
        {/* Tab pills */}
        <div className="flex gap-0.5 p-1 rounded-lg" style={{ background: "#0c0c1e", border: "1px solid #1a1a32" }}>
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-150 cursor-pointer"
              style={{
                background: tab === t ? "#6366f1" : "transparent",
                color: tab === t ? "#fff" : "#4a4a70",
              }}
              onMouseEnter={e => { if (tab !== t) (e.currentTarget as HTMLElement).style.color = "#c0c0e0"; }}
              onMouseLeave={e => { if (tab !== t) (e.currentTarget as HTMLElement).style.color = "#4a4a70"; }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#35355a" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search estimates or clients…"
            className="w-full pl-9 pr-4 py-2 rounded-lg text-[13px] text-white focus:outline-none transition-colors"
            style={{
              background: "#0c0c1e",
              border: "1px solid #1a1a32",
              caretColor: "#6366f1",
            }}
            onFocus={e => (e.target.style.borderColor = "#6366f1")}
            onBlur={e => (e.target.style.borderColor = "#1a1a32")}
          />
        </div>

        {/* Filter button */}
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors cursor-pointer"
          style={{ background: "#0c0c1e", border: "1px solid #1a1a32", color: "#35355a" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c0c0e0"; (e.currentTarget as HTMLElement).style.borderColor = "#252545"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#35355a"; (e.currentTarget as HTMLElement).style.borderColor = "#1a1a32"; }}
        >
          <Filter className="w-3.5 h-3.5" /> Filter
        </button>
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1a1a32" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid #1a1a32" }}>
              {[
                { label: "Estimate", align: "left" },
                { label: "Client",   align: "left" },
                { label: "Status",   align: "left" },
                { label: "Total",    align: "right" },
                { label: "Created",  align: "left" },
                { label: "",         align: "right" },
              ].map((h, i) => (
                <th
                  key={i}
                  className={cn("px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em]", h.align === "right" ? "text-right" : "text-left")}
                  style={{ color: "#30305a" }}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center" style={{ color: "#35355a" }}>
                  <div className="text-[13px] font-medium mb-1">No estimates found</div>
                  <div className="text-[11px]">Try adjusting your search or filters</div>
                </td>
              </tr>
            ) : (
              filtered.map((e, i) => (
                <tr
                  key={e.id}
                  style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(26,26,50,0.8)" : "none" }}
                  onMouseEnter={ev => (ev.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={ev => (ev.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <a
                      href={`/estimates/${e.id}`}
                      className="text-[13px] font-semibold transition-colors"
                      style={{ color: "#c0c0e0" }}
                      onMouseEnter={ev => (ev.currentTarget.style.color = "#a5b4fc")}
                      onMouseLeave={ev => (ev.currentTarget.style.color = "#c0c0e0")}
                    >
                      {e.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[13px]" style={{ color: "#50507a" }}>{e.client_name}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={e.status} />
                  </td>
                  <td className="px-4 py-3 text-right text-[13px] font-semibold tabular-nums text-white">
                    {formatCurrency(e.final_total ?? 0)}
                  </td>
                  <td className="px-4 py-3 text-[12px] tabular-nums" style={{ color: "#35355a" }}>
                    {formatDate(e.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-white/[0.05]"
                      style={{ color: "#35355a" }}
                      onMouseEnter={ev => (ev.currentTarget.style.color = "#8080b8")}
                      onMouseLeave={ev => (ev.currentTarget.style.color = "#35355a")}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Footer count */}
        {filtered.length > 0 && (
          <div
            className="px-4 py-2.5 flex items-center justify-between"
            style={{ borderTop: "1px solid #141428" }}
          >
            <span className="text-[11px]" style={{ color: "#2e2e4a" }}>
              {filtered.length} estimate{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[11px] font-semibold tabular-nums" style={{ color: "#35356a" }}>
              {formatCurrency(filtered.reduce((s, e) => s + (e.final_total ?? 0), 0))} total
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
