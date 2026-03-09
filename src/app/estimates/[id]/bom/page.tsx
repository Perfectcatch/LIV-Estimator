"use client";

import { useState } from "react";
import { ChevronLeft, Package, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockBOM = [
  {
    stage: "Excavation & Site", vendor: "Dirt Pro LLC", totalCost: 2180, totalSell: 3488, items: [
      { sku: "EXC-001", desc: "Excavation — Haul Away",   qty: 48.5, unit: "CY",  unitCost: 45,   sell: 72    },
    ],
  },
  {
    stage: "Steel & Rebar", vendor: "ABC Steel", totalCost: 777, totalSell: 1243, items: [
      { sku: "STL-001", desc: "#4 Rebar 20ft stick",      qty: 42,   unit: "EA",  unitCost: 18.5, sell: 29.6  },
    ],
  },
  {
    stage: "Shotcrete / Shell", vendor: "Sunstate Shotcrete", totalCost: 4130, totalSell: 6600, items: [
      { sku: "SHT-001", desc: "Gunite Shell — 4000psi",   qty: 22.3, unit: "CY",  unitCost: 185,  sell: 296   },
    ],
  },
  {
    stage: "Plumbing", vendor: "Precision Plumbing", totalCost: 8400, totalSell: 15120, items: [
      { sku: "PLB-001", desc: "2\" PVC Plumbing Pkg",     qty: 1,    unit: "LS",  unitCost: 8400, sell: 15120 },
    ],
  },
  {
    stage: "Equipment", vendor: "Pool Supply Co.", totalCost: 4245, totalSell: 10030, items: [
      { sku: "EQP-001", desc: "Pentair IntelliFlo3 VS",  qty: 1, unit: "EA", unitCost: 1285, sell: 3213 },
      { sku: "EQP-002", desc: "Pentair Clean & Clear 150",qty: 1, unit: "EA", unitCost: 860,  sell: 2150 },
      { sku: "EQP-003", desc: "IntelliCenter Controller", qty: 1, unit: "EA", unitCost: 2100, sell: 4667 },
    ],
  },
  {
    stage: "Interior Finish", vendor: "Pebble Tec", totalCost: 2160, totalSell: 5400, items: [
      { sku: "INT-001", desc: "Quartz Interior Finish",  qty: 450, unit: "SF", unitCost: 4.80, sell: 12 },
    ],
  },
  {
    stage: "Tile & Coping", vendor: "ABC Stone", totalCost: 5170, totalSell: 13750, items: [
      { sku: "COP-001", desc: "Travertine Coping 12\"",  qty: 110, unit: "LF", unitCost: 22, sell: 55 },
      { sku: "TIL-001", desc: "3\" Glass Tile Band",     qty: 110, unit: "LF", unitCost: 25, sell: 70 },
    ],
  },
];

export default function BomPage({ params }: { params: { id: string } }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [groupBy, setGroupBy] = useState<"stage" | "vendor">("stage");

  const totalCost = mockBOM.reduce((s, g) => s + g.totalCost, 0);
  const totalSell = mockBOM.reduce((s, g) => s + g.totalSell, 0);
  const margin    = ((totalSell - totalCost) / totalSell) * 100;

  function toggle(key: string) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#16213e] border-b border-[#2a2a4a] px-6 py-3 flex items-center gap-4">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Package className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-white">BOM Engine</span>
        </div>
        <div className="flex gap-1 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg p-1">
          {(["stage", "vendor"] as const).map((v) => (
            <button key={v} onClick={() => setGroupBy(v)}
              className={cn("px-3 py-1 rounded-md text-xs capitalize transition-colors", groupBy === v ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200")}>
              By {v}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Summary bar */}
        <div className="bg-[#16213e] border-b border-[#2a2a4a] px-6 py-3 flex items-center gap-8">
          {[
            { label: "Total Cost",  value: formatCurrency(totalCost),     color: "text-slate-200" },
            { label: "Total Sell",  value: formatCurrency(totalSell),     color: "text-white" },
            { label: "Gross Profit",value: formatCurrency(totalSell - totalCost), color: "text-green-400" },
            { label: "Margin",      value: `${margin.toFixed(1)}%`,       color: "text-indigo-300" },
            { label: "Line Items",  value: mockBOM.flatMap(g => g.items).length.toString(), color: "text-slate-300" },
          ].map((s) => (
            <div key={s.label}>
              <div className={`text-sm font-bold ${s.color}`}>{s.value}</div>
              <div className="text-[10px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* BOM groups */}
        <div className="p-4 space-y-2">
          {mockBOM.map((group) => {
            const key   = groupBy === "stage" ? group.stage : group.vendor;
            const open  = expanded[key] !== false;
            return (
              <div key={key} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
                <button onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors">
                  <div className="flex items-center gap-3">
                    {open ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                    <span className="text-sm font-semibold text-white">{group.stage}</span>
                    <span className="text-xs text-slate-500">{group.vendor}</span>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <div className="text-xs text-slate-500">Cost</div>
                      <div className="text-sm text-slate-300">{formatCurrency(group.totalCost)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Sell</div>
                      <div className="text-sm font-semibold text-white">{formatCurrency(group.totalSell)}</div>
                    </div>
                  </div>
                </button>
                {open && (
                  <table className="w-full text-sm border-t border-[#2a2a4a]">
                    <thead>
                      <tr className="text-[10px] text-slate-600 uppercase tracking-wider bg-white/3">
                        <th className="text-left pl-10 pr-4 py-2 font-medium">SKU</th>
                        <th className="text-left px-3 py-2 font-medium">Description</th>
                        <th className="text-right px-3 py-2 font-medium">Qty</th>
                        <th className="text-left px-3 py-2 font-medium">Unit</th>
                        <th className="text-right px-3 py-2 font-medium">Unit Cost</th>
                        <th className="text-right px-3 py-2 font-medium">Unit Sell</th>
                        <th className="text-right px-3 py-2 font-medium">Ext Cost</th>
                        <th className="text-right px-3 py-2 font-medium">Ext Sell</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item) => (
                        <tr key={item.sku} className="border-t border-[#2a2a4a]/30 hover:bg-white/3 transition-colors">
                          <td className="pl-10 pr-4 py-2 text-indigo-400 font-mono text-xs">{item.sku}</td>
                          <td className="px-3 py-2 text-slate-300">{item.desc}</td>
                          <td className="px-3 py-2 text-right text-slate-400">{item.qty}</td>
                          <td className="px-3 py-2 text-slate-500">{item.unit}</td>
                          <td className="px-3 py-2 text-right text-slate-400">{formatCurrency(item.unitCost)}</td>
                          <td className="px-3 py-2 text-right text-slate-400">{formatCurrency(item.sell)}</td>
                          <td className="px-3 py-2 text-right text-slate-300">{formatCurrency(item.qty * item.unitCost)}</td>
                          <td className="px-3 py-2 text-right font-medium text-white">{formatCurrency(item.qty * item.sell)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
