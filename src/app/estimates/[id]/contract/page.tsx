"use client";

import { ChevronLeft, PenLine, Download, Send } from "lucide-react";
import Link from "next/link";

export default function ContractPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-bold text-white">Contract</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 border border-[#2a2a4a] transition-colors">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
            <Send className="w-3.5 h-3.5" /> Send for Signature
          </button>
        </div>
      </div>

      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#2a2a4a]">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
            <PenLine className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-base font-bold text-white">Pool Construction Agreement</div>
            <div className="text-xs text-slate-500">Henderson Residence · Q2603-0001 · Draft</div>
          </div>
        </div>
        <div className="prose prose-invert prose-sm max-w-none">
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p><strong className="text-white">CONSTRUCTION AGREEMENT</strong></p>
            <p>This Pool Construction Agreement ("Agreement") is entered into as of March 10, 2026, between <strong className="text-white">LIV Pools LLC</strong>, a Florida limited liability company, licensed pool contractor FL-CPC1234567 ("Contractor"), and <strong className="text-white">James Henderson</strong> ("Client").</p>
            <p><strong className="text-white">1. SCOPE OF WORK</strong><br />Contractor agrees to construct a residential swimming pool at 1842 Sunset Blvd, Clearwater, FL 33755, in accordance with the approved plans and specifications attached hereto as Exhibit A.</p>
            <p><strong className="text-white">2. CONTRACT PRICE</strong><br />The total contract price shall be <strong className="text-white">$87,500.00</strong>, payable per the milestone schedule: Deposit (10%), Shell Complete (45%), Equipment Set (20%), Final Completion (25%).</p>
            <p><strong className="text-white">3. COMPLETION DATE</strong><br />Contractor shall substantially complete the Work within 90 calendar days from the commencement date, subject to weather delays and permit approval timelines.</p>
            <p><strong className="text-white">4. WARRANTIES</strong><br />Contractor warrants the structural shell for 10 years, equipment packages per manufacturer warranty, and workmanship for 1 year from completion.</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#2a2a4a] grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-slate-500 mb-2">Client Signature</div>
            <div className="h-14 border border-dashed border-[#2a2a4a] rounded-lg flex items-center justify-center">
              <span className="text-xs text-slate-600">Awaiting signature</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-2">Contractor Signature</div>
            <div className="h-14 border border-dashed border-[#2a2a4a] rounded-lg flex items-center justify-center">
              <span className="text-xs text-slate-600">Awaiting signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
