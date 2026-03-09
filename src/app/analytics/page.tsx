"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";

const revenueData = [
  { month: "Oct", revenue: 95000, cost: 62000, margin: 34.7 },
  { month: "Nov", revenue: 112000, cost: 74000, margin: 33.9 },
  { month: "Dec", revenue: 78000, cost: 51000, margin: 34.6 },
  { month: "Jan", revenue: 134000, cost: 88000, margin: 34.3 },
  { month: "Feb", revenue: 98000, cost: 63000, margin: 35.7 },
  { month: "Mar", revenue: 156000, cost: 99000, margin: 36.5 },
];

const costBreakdown = [
  { name: "Materials",      value: 42, color: "#4f46e5" },
  { name: "Labor",          value: 28, color: "#10b981" },
  { name: "Subcontractors", value: 18, color: "#f59e0b" },
  { name: "Equipment",      value: 8,  color: "#e94560" },
  { name: "Overhead",       value: 4,  color: "#6b7280" },
];

const jobPerf = [
  { name: "Henderson",   margin: 39, revenue: 87500 },
  { name: "Clearwater",  margin: 34, revenue: 124000 },
  { name: "Suncoast",    margin: 31, revenue: 215000 },
  { name: "Bay Isle",    margin: 38, revenue: 69800 },
  { name: "Torres",      margin: 35, revenue: 69800 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-slate-400">Business performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "YTD Revenue",     value: formatCurrency(673000) },
          { label: "YTD Cost",        value: formatCurrency(437000) },
          { label: "Avg Margin",      value: "35.1%" },
          { label: "Jobs Completed",  value: "8" },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Revenue vs Cost</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => formatCurrency(v as number)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[4,4,0,0]} name="Revenue" />
              <Bar dataKey="cost"    fill="#e94560" radius={[4,4,0,0]} name="Cost" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Gross Margin %</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} />
              <YAxis domain={[25, 45]} tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
              <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => `${v}%`} />
              <Line type="monotone" dataKey="margin" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} name="Margin %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Cost Breakdown</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={costBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                  {costBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {costBreakdown.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-slate-300">{d.name}</span>
                  <span className="text-slate-500 ml-auto">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Job Performance</h3>
          <div className="space-y-3">
            {jobPerf.map((j) => (
              <div key={j.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">{j.name}</span>
                  <span className="text-slate-400">{j.margin}% margin · {formatCurrency(j.revenue)}</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${j.margin}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
