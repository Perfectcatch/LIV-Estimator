"use client";

import { ChevronLeft, Phone, Mail, MapPin, Star, Package } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const vendor = {
  name: "Pool Supply Co.", category: "equipment", contact: "Diana Lee",
  phone: "(727) 555-0403", email: "diana@poolsupply.com", address: "St. Petersburg, FL",
  rating: 5, terms: "Net 30", notes: "Primary equipment supplier — great pricing on Pentair products.",
  recentPOs: [
    { num: "PO-2603-003", desc: "Equipment Package", total: 4245, date: "Feb 5, 2026" },
    { num: "PO-2601-008", desc: "IntelliFlo3 Pump",   total: 1285, date: "Jan 12, 2026" },
  ],
};

export default function VendorDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/vendors" className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-bold text-white">{vendor.name}</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-300 capitalize">{vendor.category}</span>
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-slate-400"><Phone className="w-3.5 h-3.5 text-slate-600" />{vendor.phone}</div>
          <div className="flex items-center gap-2 text-sm text-slate-400"><Mail className="w-3.5 h-3.5 text-slate-600" />{vendor.email}</div>
          <div className="flex items-center gap-2 text-sm text-slate-400"><MapPin className="w-3.5 h-3.5 text-slate-600" />{vendor.address}</div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span>Contact: <span className="text-slate-300">{vendor.contact}</span></span>
          <span>Terms: <span className="text-slate-300">{vendor.terms}</span></span>
          <div className="flex">{Array.from({length:5}).map((_,i) => <Star key={i} className={`w-3 h-3 ${i < vendor.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />)}</div>
        </div>
        {vendor.notes && <p className="text-xs text-slate-500 pt-2 border-t border-[#2a2a4a]">{vendor.notes}</p>}
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-semibold text-white">Recent Purchase Orders</h3>
        </div>
        <div className="space-y-2">
          {vendor.recentPOs.map(po => (
            <div key={po.num} className="flex items-center justify-between py-2 border-b border-[#2a2a4a]/50 last:border-0">
              <div>
                <div className="text-sm font-mono text-indigo-400">{po.num}</div>
                <div className="text-xs text-slate-500">{po.desc} · {po.date}</div>
              </div>
              <div className="text-sm font-bold text-white">{formatCurrency(po.total)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
