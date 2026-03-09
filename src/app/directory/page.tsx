"use client";

import { useState } from "react";
import { Search, Star, Phone, Mail, MapPin } from "lucide-react";

const mockDirectory = [
  { id: "d1", name: "ABC Steel & Supply",       category: "Materials",      contact: "Bob Martinez",    phone: "(813) 555-0201", email: "sales@abcsteel.com",    location: "Tampa, FL",      rating: 5 },
  { id: "d2", name: "Dirt Pro Excavation",       category: "Excavation",     contact: "Rick Paulson",    phone: "(727) 555-0302", email: "rick@dirtpro.com",       location: "Largo, FL",      rating: 4 },
  { id: "d3", name: "Pool Supply Co.",           category: "Equipment",      contact: "Diana Lee",       phone: "(727) 555-0403", email: "diana@poolsupply.com",   location: "St. Pete, FL",   rating: 5 },
  { id: "d4", name: "Graybar Electric",          category: "Electrical",     contact: "Tom Harris",      phone: "(813) 555-0504", email: "tom@graybar.com",        location: "Tampa, FL",      rating: 4 },
  { id: "d5", name: "Precision Plumbing Sub",   category: "Plumbing",       contact: "Carlos Ruiz",     phone: "(727) 555-0605", email: "carlos@precplumb.com",  location: "Clearwater, FL", rating: 5 },
  { id: "d6", name: "Sunstate Shotcrete",       category: "Gunite / Shell", contact: "Jeff Moss",       phone: "(727) 555-0706", email: "jeff@sunstate.com",      location: "Pinellas, FL",   rating: 5 },
];

const categories = ["All", ...Array.from(new Set(mockDirectory.map(d => d.category)))];

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = mockDirectory.filter(d => {
    const matchCat  = cat === "All" || d.category === cat;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Contractor Directory</h1>
        <p className="text-sm text-slate-400">Trusted vendors, subcontractors, and suppliers</p>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search directory..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)}
          className="bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((entry) => (
          <div key={entry.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-white">{entry.name}</div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-900/40 text-indigo-300 font-medium">{entry.category}</span>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < entry.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700"}`} />
                ))}
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-400"><Phone className="w-3 h-3 text-slate-600" />{entry.phone}</div>
              <div className="flex items-center gap-2 text-slate-400"><Mail className="w-3 h-3 text-slate-600" />{entry.email}</div>
              <div className="flex items-center gap-2 text-slate-400"><MapPin className="w-3 h-3 text-slate-600" />{entry.location}</div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#2a2a4a] text-xs text-slate-500">
              Contact: {entry.contact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
