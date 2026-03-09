"use client";

import { useState } from "react";
import { Droplets, CheckCircle, DollarSign, FileText, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockProposal = {
  clientName:   "James Henderson",
  companyName:  "LIV Pools LLC",
  projectName:  "Henderson Residence — 15x30 Pool",
  proposalNo:   "Q2603-0001",
  expiry:       "April 10, 2026",
  total:        87500,
  status:       "pending",
  sections: [
    { title: "Base Pool Construction",  items: ["15x30 Rectangular Pool", "Gunite Shell", "#4 Rebar Grid", "2\" PVC Plumbing System"], subtotal: 55000 },
    { title: "Equipment Package",       items: ["Pentair IntelliFlo3 VS Pump", "Pentair Filter 150 Sq Ft", "IntelliCenter Automation"], subtotal: 10030 },
    { title: "Interior & Finishes",     items: ["Quartz Interior Finish (450 SF)", "Travertine Coping (110 LF)", "Glass Tile Band (110 LF)"], subtotal: 22470 },
  ],
  paymentSchedule: [
    { label: "Deposit (10%)",         amount: 8750,  status: "pending" },
    { label: "Shell Complete (45%)",   amount: 39375, status: "pending" },
    { label: "Equipment Set (20%)",    amount: 17500, status: "pending" },
    { label: "Final Completion (25%)", amount: 21875, status: "pending" },
  ],
};

export default function ClientPortalPage() {
  const [tab, setTab] = useState<"proposal" | "payments" | "messages">("proposal");
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Header */}
      <header className="bg-[#16213e] border-b border-[#2a2a4a] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">{mockProposal.companyName}</span>
          </div>
          <div className="text-sm text-slate-400">Client Portal · {mockProposal.proposalNo}</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Hello, {mockProposal.clientName}</h1>
          <p className="text-slate-400 mt-1">{mockProposal.projectName}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#16213e] border border-[#2a2a4a] rounded-xl p-1 mb-6 w-fit">
          {([["proposal", "Proposal"], ["payments", "Payments"], ["messages", "Messages"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${tab === key ? "bg-indigo-600 text-white font-medium" : "text-slate-400 hover:text-slate-200"}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === "proposal" && (
          <div className="space-y-4">
            {/* Proposal sections */}
            {mockProposal.sections.map((section) => (
              <div key={section.title} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                  <span className="text-sm font-bold text-indigo-300">{formatCurrency(section.subtotal)}</span>
                </div>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-400">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Total + Accept */}
            <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-semibold text-white">Total Investment</span>
                <span className="text-2xl font-bold text-indigo-300">{formatCurrency(mockProposal.total)}</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">This proposal expires {mockProposal.expiry}. All work performed per FL state licensing requirements.</p>
              {!accepted ? (
                <button onClick={() => setAccepted(true)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors">
                  Accept Proposal & Sign Digitally
                </button>
              ) : (
                <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-green-900/30 border border-green-700/40">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-semibold text-green-300">Proposal Accepted — Thank you!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "payments" && (
          <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Payment Schedule</h3>
            <div className="space-y-3">
              {mockProposal.paymentSchedule.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-[#2a2a4a] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-slate-400">{i + 1}</div>
                    <span className="text-sm text-slate-200">{p.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">{formatCurrency(p.amount)}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-medium">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "messages" && (
          <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
            <div className="flex flex-col items-center py-12 text-center">
              <MessageCircle className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-white font-medium mb-1">Direct Messaging</p>
              <p className="text-slate-400 text-sm">Send a message directly to your project team at LIV Pools.</p>
              <textarea className="w-full mt-4 px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none h-24" placeholder="Type your message..." />
              <button className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">Send Message</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
