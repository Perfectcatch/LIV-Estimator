"use client";

import { ChevronLeft, Download, ExternalLink, Send, Droplets, CheckCircle } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const proposal = {
  client:       "James Henderson",
  address:      "1842 Sunset Blvd, Clearwater, FL 33755",
  projectName:  "Henderson Residence — 15x30 Pool",
  proposalNo:   "Q2603-0001",
  date:         "March 10, 2026",
  expiry:       "April 10, 2026",
  sections: [
    { title: "Base Pool Construction",  items: ["15×30 Rectangular Pool Shell", "4,000 PSI Gunite Construction", "#4 Rebar Grid (12\" O.C. each way)", "2\" PVC Plumbing System"], subtotal: 55000 },
    { title: "Equipment Package",       items: ["Pentair IntelliFlo3 VS Pump", "Pentair Clean & Clear 150 Filter", "IntelliCenter Pool Automation System"], subtotal: 10030 },
    { title: "Interior & Finishes",     items: ["Quartz Interior Finish — 450 SF", "Travertine Coping — 110 LF", "3\" Glass Tile Band — 110 LF"], subtotal: 22470 },
  ],
  total:   87500,
  paymentSchedule: [
    { label: "Deposit (10%)",          amount: 8750 },
    { label: "Shell Complete (45%)",    amount: 39375 },
    { label: "Equipment Set (20%)",     amount: 17500 },
    { label: "Final Completion (25%)",  amount: 21875 },
  ],
};

export default function ProposalPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#16213e] border-b border-[#2a2a4a] px-6 py-3 flex items-center gap-4">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <span className="text-sm font-semibold text-white flex-1">Proposal Preview</span>
        <div className="flex gap-2">
          <Link href={`/portal/${params.id}`} target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" /> Client Portal
          </Link>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
            <Send className="w-3.5 h-3.5" /> Send to Client
          </button>
        </div>
      </div>

      {/* Proposal document */}
      <div className="flex-1 overflow-auto bg-[#1a1a2e] p-8">
        <div className="max-w-3xl mx-auto bg-[#16213e] border border-[#2a2a4a] rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/40 px-8 py-8 border-b border-[#2a2a4a]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">LIV Pools LLC</div>
                  <div className="text-indigo-300 text-xs">Licensed Pool Contractor · FL-CPC1234567</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-lg">PROPOSAL</div>
                <div className="text-indigo-300 text-xs">{proposal.proposalNo}</div>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            {/* Client info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Prepared For</div>
                <div className="text-white font-semibold">{proposal.client}</div>
                <div className="text-slate-400 text-sm">{proposal.address}</div>
              </div>
              <div className="text-right">
                <div className="space-y-1">
                  {[["Date", proposal.date], ["Expires", proposal.expiry], ["Project", proposal.projectName]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-500">{k}:</span>
                      <span className="text-slate-300">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sections */}
            {proposal.sections.map((section) => (
              <div key={section.title} className="border border-[#2a2a4a] rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-white/3">
                  <span className="text-sm font-semibold text-white">{section.title}</span>
                  <span className="text-sm font-bold text-indigo-300">{formatCurrency(section.subtotal)}</span>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="border border-[#2a2a4a] rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-bold text-white">Total Investment</span>
                <span className="text-2xl font-bold text-indigo-300">{formatCurrency(proposal.total)}</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {proposal.paymentSchedule.map((p, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-slate-500 mb-1">{p.label.split("(")[0].trim()}</div>
                    <div className="text-sm font-bold text-white">{formatCurrency(p.amount)}</div>
                    <div className="text-[10px] text-indigo-300">{p.label.match(/\d+%/)?.[0]}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-600 text-center">
              This proposal is valid for 30 days. All work performed per Florida state licensing requirements. LIV Pools LLC · (727) 555-0100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
