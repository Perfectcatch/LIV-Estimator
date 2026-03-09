"use client";

import { Plus, UserCog, Mail, Phone, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockTeam = [
  { id: "u1", name: "Luis Ramos",    role: "Project Manager",   email: "luis@livpools.com",   phone: "(727) 555-0101", rate: 65, status: "active" },
  { id: "u2", name: "Marco Vargas",  role: "Lead Plumber",       email: "marco@livpools.com",  phone: "(727) 555-0102", rate: 52, status: "active" },
  { id: "u3", name: "Jenna Kim",     role: "Office Manager",     email: "jenna@livpools.com",  phone: "(727) 555-0103", rate: 48, status: "active" },
  { id: "u4", name: "Derek Shaw",    role: "Equipment Tech",     email: "derek@livpools.com",  phone: "(727) 555-0104", rate: 45, status: "active" },
  { id: "u5", name: "Carlos Mena",   role: "Finisher",           email: "carlos@livpools.com", phone: "(727) 555-0105", rate: 38, status: "active" },
];

export default function TeamPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Team</h1>
          <p className="text-sm text-slate-400">Manage team members, roles, and billing rates</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Members",   value: mockTeam.length.toString() },
          { label: "Active Today",    value: "4" },
          { label: "Avg Hourly Rate", value: formatCurrency(mockTeam.reduce((s, m) => s + m.rate, 0) / mockTeam.length) + "/hr" },
        ].map((s) => (
          <div key={s.label} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <div className="text-xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockTeam.map((member) => (
          <div key={member.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-semibold text-sm">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{member.name}</div>
                <div className="text-xs text-slate-500">{member.role}</div>
              </div>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 font-medium">{member.status}</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-400"><Mail className="w-3 h-3 text-slate-600" />{member.email}</div>
              <div className="flex items-center gap-2 text-slate-400"><Phone className="w-3 h-3 text-slate-600" />{member.phone}</div>
              <div className="flex items-center gap-2 text-slate-400"><DollarSign className="w-3 h-3 text-slate-600" />${member.rate}/hr</div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2a2a4a] flex gap-2">
              <button className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors">View Hours</button>
              <button className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
