"use client";

import { useState } from "react";
import { Plus, Search, Users, DollarSign, Briefcase, TrendingUp, Mail, Phone, MapPin, Eye } from "lucide-react";
import type { Clients } from "@/types/schema";

interface ClientsListProps {
  clients: Clients[];
}

export function ClientsList({ clients }: ClientsListProps) {
  const [search, setSearch] = useState("");

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q) || (c.company ?? "").toLowerCase().includes(q);
  });

  const kpis = [
    { label: "Total Clients",   value: String(clients.length), icon: Users,      color: "text-blue-400" },
    { label: "Companies",       value: String(clients.filter((c) => c.company).length), icon: Briefcase,  color: "text-indigo-400" },
    { label: "With Email",      value: String(clients.filter((c) => c.email).length),   icon: Mail,       color: "text-green-400" },
    { label: "With Phone",      value: String(clients.filter((c) => c.phone).length),   icon: Phone,      color: "text-yellow-400" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Customers</h1>
          <p className="text-sm text-slate-400">Manage your client relationships</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${k.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">{k.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Client Cards */}
      {filtered.length === 0 ? (
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-8 text-center text-slate-500">
          No clients found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((client) => (
            <div key={client.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/50 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-semibold text-sm">
                    {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{client.name}</div>
                    {client.company && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-purple-900/50 text-purple-300">
                        {client.company}
                      </span>
                    )}
                    {client.title && !client.company && (
                      <span className="text-[10px] text-slate-500">{client.title}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                {client.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Mail className="w-3 h-3 text-slate-600" />
                    {client.email}
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Phone className="w-3 h-3 text-slate-600" />
                    {client.phone}
                  </div>
                )}
                {client.address && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-600" />
                    {client.address}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end pt-3 border-t border-[#2a2a4a]">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-xs text-slate-300 hover:text-indigo-300 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
