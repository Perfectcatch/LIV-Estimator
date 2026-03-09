"use client";

import {
  TrendingUp, Briefcase, Users, DollarSign,
  ArrowUpRight, ArrowDownRight, CheckCircle, Clock, AlertTriangle, Activity,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import type { Jobs } from "@/types/schema";

// ── Types ────────────────────────────────────────────────────
interface DashboardKpis {
  pipelineValue: number;
  activeJobCount: number;
  customerCount: number;
  openInvoiceTotal: number;
  openInvoiceCount: number;
}

interface ActivityRow {
  id: string;
  activity_type: string;
  entity_type: string;
  entity_name?: string;
  description: string;
  created_at: string;
}

interface DashboardProps {
  kpis: DashboardKpis;
  activeJobs: Pick<Jobs, "id" | "name" | "status" | "description" | "estimated_revenue" | "actual_cost" | "estimated_cost">[];
  recentActivity: ActivityRow[];
}

// ── Static chart data (until real financials are wired) ─────
const budgetData = [
  { stage: "Pre-Construction", budget: 45000, spent: 42000 },
  { stage: "Excavation",       budget: 28000, spent: 28000 },
  { stage: "Steel / Shell",    budget: 85000, spent: 71000 },
  { stage: "Plumbing",         budget: 32000, spent: 29000 },
  { stage: "Electrical",       budget: 18000, spent: 15000 },
  { stage: "Equipment",        budget: 64000, spent: 48000 },
  { stage: "Finishes",         budget: 55000, spent: 22000 },
];

const cashFlowData = [
  { month: "Oct", received: 95000, spent: 72000 },
  { month: "Nov", received: 112000, spent: 88000 },
  { month: "Dec", received: 78000, spent: 65000 },
  { month: "Jan", received: 134000, spent: 91000 },
  { month: "Feb", received: 98000, spent: 84000 },
  { month: "Mar", received: 156000, spent: 108000 },
];

// ── KPI card ─────────────────────────────────────────────────
const kpiDefs = [
  { key: "pipeline", label: "Pipeline Value", icon: TrendingUp, color: "text-indigo-400" },
  { key: "jobs",     label: "Active Jobs",    icon: Briefcase,  color: "text-green-400" },
  { key: "clients",  label: "Customers",      icon: Users,      color: "text-blue-400" },
  { key: "invoices", label: "Open Invoices",  icon: DollarSign, color: "text-yellow-400" },
] as const;

function KpiCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: React.ComponentType<{ className?: string }>; color: string }) {
  const isUp = !sub.includes("pending");
  return (
    <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${color}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${isUp ? "text-green-400" : "text-yellow-400"}`}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {sub}
        </span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function statusStyle(status: string) {
  if (status === "in_progress") return "bg-blue-900/50 text-blue-300";
  if (status === "on_hold") return "bg-yellow-900/50 text-yellow-300";
  if (status === "complete") return "bg-green-900/50 text-green-300";
  return "bg-zinc-800 text-zinc-300";
}

function statusLabel(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function activityIcon(type: string) {
  if (type === "estimate_approved" || type === "payment_received" || type === "inspection_passed") return <CheckCircle className="w-3.5 h-3.5 text-green-400" />;
  if (type === "invoice_due" || type === "change_order") return <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />;
  return <Clock className="w-3.5 h-3.5 text-blue-400" />;
}

// ── Main Component ───────────────────────────────────────────
export function DashboardContent({ kpis, activeJobs, recentActivity }: DashboardProps) {
  const kpiCards = [
    { ...kpiDefs[0], value: formatCurrency(kpis.pipelineValue), sub: "pipeline" },
    { ...kpiDefs[1], value: String(kpis.activeJobCount), sub: "active" },
    { ...kpiDefs[2], value: String(kpis.customerCount), sub: "total" },
    { ...kpiDefs[3], value: formatCurrency(kpis.openInvoiceTotal), sub: `${kpis.openInvoiceCount} pending` },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Overview</h1>
          <p className="text-sm text-slate-400">LIV Pools LLC &middot; Clearwater, FL</p>
        </div>
        <select className="bg-[#16213e] border border-[#2a2a4a] text-sm text-slate-300 rounded-lg px-3 py-1.5 outline-none">
          <option>All Jobs Overview</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((k) => (
          <KpiCard key={k.key} label={k.label} value={k.value} sub={k.sub} icon={k.icon} color={k.color} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Budget vs Spent */}
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Budget vs Spent</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={budgetData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="stage" tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }}
                formatter={(v: unknown) => formatCurrency(v as number)}
              />
              <Bar dataKey="budget" fill="#4f46e5" radius={[4, 4, 0, 0]} opacity={0.6} name="Budget" />
              <Bar dataKey="spent" fill="#10b981" radius={[4, 4, 0, 0]} name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow */}
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Cash Flow</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={cashFlowData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="received" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="spent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e94560" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e94560" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => formatCurrency(v as number)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="received" stroke="#10b981" fill="url(#received)" strokeWidth={2} name="Received" />
              <Area type="monotone" dataKey="spent" stroke="#e94560" fill="url(#spent)" strokeWidth={2} name="Spent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Jobs */}
        <div className="lg:col-span-2 bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Active Jobs</h3>
            <a href="/jobs" className="text-xs text-indigo-400 hover:text-indigo-300">View All</a>
          </div>
          {activeJobs.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">No active jobs yet.</p>
          ) : (
            <div className="space-y-3">
              {activeJobs.map((job) => {
                const progress = job.estimated_cost && job.actual_cost
                  ? Math.min(100, Math.round((job.actual_cost / job.estimated_cost) * 100))
                  : 0;
                return (
                  <div key={job.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-200 truncate">{job.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${statusStyle(job.status)}`}>
                          {statusLabel(job.status)}
                        </span>
                        {job.description && <span className="text-[11px] text-slate-500 truncate">{job.description}</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-medium text-white">{formatCurrency(job.estimated_revenue ?? 0)}</div>
                      <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1.5">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            <Activity className="w-4 h-4 text-slate-500" />
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-slate-500 py-4">No recent activity.</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex gap-2.5">
                  <div className="flex-shrink-0 mt-0.5">
                    {activityIcon(item.activity_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-snug">{item.description}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{timeAgo(item.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
