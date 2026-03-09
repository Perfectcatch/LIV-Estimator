"use client";

import { TrendingUp, Briefcase, Users, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, AlertTriangle, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";

const kpis = [
  { label: "Pipeline Value",  value: "$847,500", change: "+12.4%", up: true,  icon: TrendingUp, color: "text-indigo-400" },
  { label: "Active Jobs",     value: "7",         change: "$2.1M revenue", up: true,  icon: Briefcase,  color: "text-green-400" },
  { label: "Customers",       value: "43",        change: "+3 this month", up: true,  icon: Users,      color: "text-blue-400" },
  { label: "Open Invoices",   value: "$124,800",  change: "8 pending",    up: false, icon: DollarSign, color: "text-yellow-400" },
];

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

const activeJobs = [
  { name: "Henderson Residence — 15x30 Pool", status: "In Progress", stage: "Steel / Rebar", revenue: 87500,  progress: 45 },
  { name: "Clearwater Estates Pool & Spa",    status: "In Progress", stage: "Plumbing",     revenue: 124000, progress: 62 },
  { name: "Bay Isle Custom Pool",             status: "On Hold",     stage: "Excavation",   revenue: 69800,  progress: 22 },
  { name: "Suncoast Resort Feature Pool",     status: "In Progress", stage: "Equipment",    revenue: 215000, progress: 78 },
];

const recentActivity = [
  { text: "Estimate Q2603-0012 approved by J. Henderson", time: "2h ago",  type: "success" },
  { text: "PO-0047 issued to Pentair — $18,400",          time: "4h ago",  type: "info" },
  { text: "Change order CO-008 submitted — +$4,200",      time: "Yesterday", type: "warning" },
  { text: "Clearwater Estates shell inspection passed",   time: "Yesterday", type: "success" },
  { text: "Invoice INV-0089 — $31,250 due in 3 days",     time: "2 days ago", type: "warning" },
];

function KpiCard({ kpi }: { kpi: typeof kpis[0] }) {
  const Icon = kpi.icon;
  return (
    <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center ${kpi.color}`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-green-400" : "text-yellow-400"}`}>
          {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {kpi.change}
        </span>
      </div>
      <div className="text-2xl font-bold text-white">{kpi.value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{kpi.label}</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Overview</h1>
          <p className="text-sm text-slate-400">LIV Pools LLC · Clearwater, FL</p>
        </div>
        <select className="bg-[#16213e] border border-[#2a2a4a] text-sm text-slate-300 rounded-lg px-3 py-1.5 outline-none">
          <option>All Jobs Overview</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
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
              <YAxis tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }}
                formatter={(v: unknown) => formatCurrency(v as number)}
              />
              <Bar dataKey="budget" fill="#4f46e5" radius={[4,4,0,0]} opacity={0.6} name="Budget" />
              <Bar dataKey="spent"  fill="#10b981" radius={[4,4,0,0]} name="Spent" />
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
              <YAxis tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => formatCurrency(v as number)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="received" stroke="#10b981" fill="url(#received)" strokeWidth={2} name="Received" />
              <Area type="monotone" dataKey="spent"    stroke="#e94560" fill="url(#spent)"    strokeWidth={2} name="Spent" />
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
          <div className="space-y-3">
            {activeJobs.map((job) => (
              <div key={job.name} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-200 truncate">{job.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${job.status === "In Progress" ? "bg-blue-900/50 text-blue-300" : "bg-yellow-900/50 text-yellow-300"}`}>
                      {job.status}
                    </span>
                    <span className="text-[11px] text-slate-500">{job.stage}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium text-white">{formatCurrency(job.revenue)}</div>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1.5">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${job.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            <Activity className="w-4 h-4 text-slate-500" />
          </div>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="flex-shrink-0 mt-0.5">
                  {item.type === "success" && <CheckCircle className="w-3.5 h-3.5 text-green-400" />}
                  {item.type === "warning" && <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />}
                  {item.type === "info" && <Clock className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 leading-snug">{item.text}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
