"use client";

import { useState } from "react";
import { Plus, Search, Star, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const mockVendors = [
  { id: "v1", name: "ABC Steel & Supply",      category: "materials",     contact: "Bob Martinez",  phone: "(813) 555-0201", email: "sales@abcsteel.com",    rating: 5, active: true },
  { id: "v2", name: "Dirt Pro Excavation",      category: "excavation",    contact: "Rick Paulson",  phone: "(727) 555-0302", email: "rick@dirtpro.com",       rating: 4, active: true },
  { id: "v3", name: "Pool Supply Co.",          category: "equipment",     contact: "Diana Lee",     phone: "(727) 555-0403", email: "diana@poolsupply.com",   rating: 5, active: true },
  { id: "v4", name: "Graybar Electric",         category: "electrical",    contact: "Tom Harris",    phone: "(813) 555-0504", email: "tom@graybar.com",        rating: 4, active: true },
  { id: "v5", name: "Precision Plumbing Sub",  category: "plumbing",      contact: "Carlos Ruiz",   phone: "(727) 555-0605", email: "carlos@precplumb.com",  rating: 5, active: true },
  { id: "v6", name: "Sunstate Shotcrete",      category: "subcontractor", contact: "Jeff Moss",     phone: "(727) 555-0706", email: "jeff@sunstate.com",      rating: 5, active: true },
  { id: "v7", name: "Pebble Tec",             category: "materials",     contact: "Sales Dept",    phone: "(800) 555-0800", email: "sales@pebbletec.com",    rating: 5, active: true },
];

const cats = ["All", ...Array.from(new Set(mockVendors.map(v => v.category)))];

const CAT_COLORS: Record<string, string> = {
  materials:     "bg-blue-900/30 text-blue-300",
  excavation:    "bg-yellow-900/30 text-yellow-300",
  equipment:     "bg-purple-900/30 text-purple-300",
  electrical:    "bg-orange-900/30 text-orange-300",
  plumbing:      "bg-cyan-900/30 text-cyan-300",
  subcontractor: "bg-green-900/30 text-green-300",
};

export default function VendorsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = mockVendors.filter(v => {
    const matchCat    = cat === "All" || v.category === cat;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Vendors</h1>
          <p className="text-sm text-slate-400">Subcontractors, suppliers, and material vendors</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> Add Vendor
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search vendors..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
        </div>
        <select value={cat} onChange={e => setCat(e.target.value)}
          className="bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none capitalize">
          {cats.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((v) => (
          <div key={v.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-white">{v.name}</div>
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium capitalize mt-1 inline-block", CAT_COLORS[v.category] || "bg-zinc-800 text-zinc-400")}>{v.category}</span>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("w-3 h-3", i < v.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700")} />
                ))}
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-400"><Phone className="w-3 h-3 text-slate-600" />{v.phone}</div>
              <div className="flex items-center gap-2 text-slate-400"><Mail className="w-3 h-3 text-slate-600" />{v.email}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#2a2a4a] text-xs text-slate-500">Contact: {v.contact}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
