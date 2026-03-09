"use client";

import { useState } from "react";
import { ChevronLeft, TrendingUp, Save } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatPercent } from "@/lib/utils";

const divisions = [
  { name: "Excavation",      baseMarkup: 0.60, multiplier: 1.0, cost: 2180 },
  { name: "Steel & Rebar",   baseMarkup: 0.60, multiplier: 1.0, cost: 777  },
  { name: "Shell / Gunite",  baseMarkup: 0.60, multiplier: 1.0, cost: 4130 },
  { name: "Plumbing",        baseMarkup: 0.55, multiplier: 1.0, cost: 8400 },
  { name: "Equipment",       baseMarkup: 0.60, multiplier: 1.0, cost: 4245 },
  { name: "Interior Finish", baseMarkup: 0.60, multiplier: 1.0, cost: 2160 },
  { name: "Tile & Coping",   baseMarkup: 0.60, multiplier: 1.0, cost: 5170 },
];

export default function PricingPage({ params }: { params: { id: string } }) {
  const [globalMarkup, setGlobalMarkup] = useState(0.60);
  const [pmFee, setPmFee] = useState(0.08);
  const [contingency, setContingency] = useState(0.05);
  const [divs, setDivs] = useState(divisions);

  const totalCost   = divs.reduce((s, d) => s + d.cost, 0);
  const totalSell   = divs.reduce((s, d) => s + d.cost / (1 - d.baseMarkup * d.multiplier), 0);
  const pmFeeAmt    = totalCost * pmFee;
  const contAmt     = totalCost * contingency;
  const grandTotal  = totalSell + pmFeeAmt + contAmt;
  const margin      = (grandTotal - totalCost - pmFeeAmt - contAmt) / grandTotal;

  function setDivMarkup(idx: number, markup: number) {
    setDivs(prev => prev.map((d, i) => i === idx ? { ...d, baseMarkup: markup } : d));
  }
  function setDivMult(idx: number, mult: number) {
    setDivs(prev => prev.map((d, i) => i === idx ? { ...d, multiplier: mult } : d));
  }
  function applyGlobal() {
    setDivs(prev => prev.map(d => ({ ...d, baseMarkup: globalMarkup })));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#16213e] border-b border-[#2a2a4a] px-6 py-3 flex items-center gap-4">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-white">Pricing Hub</span>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
          <Save className="w-3.5 h-3.5" /> Save Pricing
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Global controls */}
          <div className="space-y-4">
            <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Global Controls</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Global Markup %</label>
                  <div className="flex gap-2">
                    <input type="number" value={(globalMarkup * 100).toFixed(0)}
                      onChange={(e) => setGlobalMarkup(parseFloat(e.target.value) / 100 || 0)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
                    <button onClick={applyGlobal}
                      className="px-3 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-xs text-indigo-300 transition-colors">
                      Apply All
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">PM Fee %</label>
                  <input type="number" value={(pmFee * 100).toFixed(0)}
                    onChange={(e) => setPmFee(parseFloat(e.target.value) / 100 || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Contingency %</label>
                  <input type="number" value={(contingency * 100).toFixed(0)}
                    onChange={(e) => setContingency(parseFloat(e.target.value) / 100 || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Pricing Summary</h3>
              <div className="space-y-2">
                {[
                  { label: "Total Cost",      value: formatCurrency(totalCost),              muted: true },
                  { label: "Total Sell",       value: formatCurrency(totalSell),              muted: false },
                  { label: `PM Fee (${(pmFee*100).toFixed(0)}%)`, value: formatCurrency(pmFeeAmt), muted: true },
                  { label: `Contingency (${(contingency*100).toFixed(0)}%)`, value: formatCurrency(contAmt), muted: true },
                  { label: "Gross Margin",     value: formatPercent(margin),                  muted: false },
                ].map(({ label, value, muted }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className={muted ? "text-slate-300" : "text-white font-semibold"}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2a2a4a] mt-3 pt-3 flex justify-between">
                <span className="text-sm font-semibold text-white">Grand Total</span>
                <span className="text-lg font-bold text-indigo-300">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Division table */}
          <div className="lg:col-span-2 bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2a2a4a]">
              <h3 className="text-sm font-semibold text-white">Division Markup Controls</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a4a] text-[10px] text-slate-500 uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-medium">Division</th>
                  <th className="text-right px-3 py-3 font-medium">Cost</th>
                  <th className="text-right px-3 py-3 font-medium">Markup %</th>
                  <th className="text-right px-3 py-3 font-medium">Multiplier</th>
                  <th className="text-right px-3 py-3 font-medium">Sell Price</th>
                  <th className="text-right px-3 py-3 font-medium">Margin</th>
                </tr>
              </thead>
              <tbody>
                {divs.map((div, i) => {
                  const effectiveMarkup = div.baseMarkup * div.multiplier;
                  const sell = div.cost / (1 - Math.min(effectiveMarkup, 0.99));
                  const divMargin = (sell - div.cost) / sell;
                  return (
                    <tr key={div.name} className={`hover:bg-white/3 transition-colors ${i < divs.length - 1 ? "border-b border-[#2a2a4a]/50" : ""}`}>
                      <td className="px-4 py-3 text-slate-200 font-medium">{div.name}</td>
                      <td className="px-3 py-3 text-right text-slate-400">{formatCurrency(div.cost)}</td>
                      <td className="px-3 py-3 text-right">
                        <input type="number" value={(div.baseMarkup * 100).toFixed(0)}
                          onChange={(e) => setDivMarkup(i, parseFloat(e.target.value) / 100 || 0)}
                          className="w-16 px-2 py-1 rounded bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 text-right" />
                      </td>
                      <td className="px-3 py-3 text-right">
                        <input type="number" value={div.multiplier.toFixed(2)} step="0.05"
                          onChange={(e) => setDivMult(i, parseFloat(e.target.value) || 1)}
                          className="w-16 px-2 py-1 rounded bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 text-right" />
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-white">{formatCurrency(sell)}</td>
                      <td className="px-3 py-3 text-right text-green-400">{formatPercent(divMargin)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
