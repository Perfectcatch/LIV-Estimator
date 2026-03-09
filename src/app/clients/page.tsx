"use client";

import { useState } from "react";
import { Plus, Search, Users, DollarSign, Briefcase, TrendingUp, Mail, Phone, MapPin, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockClients = [
  { id: "1", name: "James Henderson", type: "Residential", email: "jhenderson@email.com", phone: "(813) 555-0142", address: "4821 Bayshore Blvd, Tampa, FL", status: "active", totalValue: 87500 },
  { id: "2", name: "Clearwater Estates HOA", type: "Commercial", email: "mgmt@cwEstates.com", phone: "(727) 555-0299", address: "100 Clearwater Dr, Clearwater, FL", status: "active", totalValue: 324000 },
  { id: "3", name: "Sandra & Mike Torres", type: "Residential", email: "storres@gmail.com", phone: "(727) 555-0381", address: "2190 Gulf Blvd, Indian Rocks Beach, FL", status: "active", totalValue: 69800 },
  { id: "4", name: "Suncoast Resort Group", type: "Commercial", email: "ops@suncoastresort.com", phone: "(727) 555-0477", address: "500 Beach Dr NE, St. Petersburg, FL", status: "active", totalValue: 215000 },
  { id: "5", name: "David Nguyen", type: "Residential", email: "dnguyen@email.com", phone: "(813) 555-0512", address: "1047 Palm Ave, Dunedin, FL", status: "inactive", totalValue: 54200 },
  { id: "6", name: "Bay Isle Properties", type: "Commercial", email: "contact@bayisle.com", phone: "(727) 555-0633", address: "8888 Bay Pines Blvd, St. Pete Beach, FL", status: "active", totalValue: 142000 },
];

const kpis = [
  { label: "Total Job Value",  value: formatCurrency(893500), icon: DollarSign, color: "text-green-400" },
  { label: "Total Projects",   value: "12",                   icon: Briefcase,  color: "text-indigo-400" },
  { label: "Total Clients",    value: "43",                   icon: Users,      color: "text-blue-400" },
  { label: "Avg. Job Value",   value: formatCurrency(74458),  icon: TrendingUp, color: "text-yellow-400" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div key={client.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/50 transition-colors group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-semibold text-sm">
                  {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{client.name}</div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${client.type === "Commercial" ? "bg-purple-900/50 text-purple-300" : "bg-blue-900/50 text-blue-300"}`}>
                    {client.type}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${client.status === "active" ? "bg-green-900/40 text-green-400" : "bg-zinc-800 text-zinc-400"}`}>
                {client.status}
              </span>
            </div>
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="w-3 h-3 text-slate-600" />
                {client.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="w-3 h-3 text-slate-600" />
                {client.phone}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3 h-3 text-slate-600" />
                {client.address}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#2a2a4a]">
              <div>
                <div className="text-[10px] text-slate-500">Total Value</div>
                <div className="text-sm font-semibold text-white">{formatCurrency(client.totalValue)}</div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-xs text-slate-300 hover:text-indigo-300 transition-colors">
                <Eye className="w-3.5 h-3.5" /> View as Client
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
