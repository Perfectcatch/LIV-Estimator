"use client";

import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "@/lib/utils";

const cashFlowData = [
  { month: "Oct", inflow: 95000,  outflow: 72000,  net: 23000 },
  { month: "Nov", inflow: 112000, outflow: 88000,  net: 24000 },
  { month: "Dec", inflow: 78000,  outflow: 65000,  net: 13000 },
  { month: "Jan", inflow: 134000, outflow: 91000,  net: 43000 },
  { month: "Feb", inflow: 98000,  outflow: 84000,  net: 14000 },
  { month: "Mar", inflow: 156000, outflow: 108000, net: 48000 },
  { month: "Apr", inflow: 142000, outflow: 95000,  net: 47000 },
  { month: "May", inflow: 168000, outflow: 112000, net: 56000 },
];

const receivables = [
  { client: "James Henderson",    amount: 31250, days: 8,  status: "due_soon" },
  { client: "CW Estates HOA",     amount: 32500, days: 3,  status: "overdue" },
  { client: "Suncoast Resort",    amount: 86000, days: 14, status: "paid" },
];

export default function CashFlowPage() {
  const totalNet = cashFlowData.reduce((s, d) => s + d.net, 0);
  const totalIn  = cashFlowData.reduce((s, d) => s + d.inflow, 0);
  const totalOut = cashFlowData.reduce((s, d) => s + d.outflow, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Cash Flow</h1>
        <p className="text-sm text-slate-400">Revenue vs. expenses over time</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Inflow",  value: formatCurrency(totalIn),  color: "text-green-400" },
          { label: "Total Outflow", value: formatCurrency(totalOut), color: "text-red-400" },
          { label: "Net Cash",      value: formatCurrency(totalNet), color: "text-indigo-400" },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-4">8-Month Cash Flow</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={cashFlowData}>
            <defs>
              <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="go" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e94560" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#e94560" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#606080" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => formatCurrency(v as number)} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Area type="monotone" dataKey="inflow"  stroke="#10b981" fill="url(#gi)" strokeWidth={2} name="Inflow" />
            <Area type="monotone" dataKey="outflow" stroke="#e94560" fill="url(#go)" strokeWidth={2} name="Outflow" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Net by Month</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a4a" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#606080" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "#1e1e3a", border: "1px solid #2a2a4a", borderRadius: 8, fontSize: 12 }} formatter={(v: unknown) => formatCurrency(v as number)} />
              <Bar dataKey="net" fill="#4f46e5" radius={[4,4,0,0]} name="Net" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-white mb-4">Receivables</h3>
          <div className="space-y-3">
            {receivables.map((r) => (
              <div key={r.client} className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-200">{r.client}</div>
                  <div className="text-xs text-slate-500">{r.days} days {r.status === "overdue" ? "overdue" : "until due"}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white">{formatCurrency(r.amount)}</div>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${r.status === "overdue" ? "bg-red-900/50 text-red-300" : r.status === "paid" ? "bg-green-900/50 text-green-300" : "bg-yellow-900/50 text-yellow-300"}`}>
                    {r.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
