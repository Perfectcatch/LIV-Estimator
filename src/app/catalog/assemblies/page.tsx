"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Layers, ArrowUpDown } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

const MOCK_ASSEMBLIES = [
  {
    id: "a1", code: "ASM-SHL-STD", name: "Standard Pool Shell Package",
    stage: "Shell", description: "Excavation, steel, gunite, and grading for standard rectangular pool.",
    kits: [
      { id: "k7", name: "Excavation Package -- Standard", skuCount: 3, cost: 3800 },
      { id: "k5", name: "Steel & Rebar Package", skuCount: 3, cost: 1200 },
      { id: "k8", name: "Gunite Shell Package", skuCount: 2, cost: 6500 },
    ],
    totalCost: 11500, totalSell: 18400,
  },
  {
    id: "a2", code: "ASM-PLB-MEC", name: "Plumbing & Mechanical Package",
    stage: "Plumbing", description: "All plumbing runs, returns, drains, and gas lines.",
    kits: [
      { id: "k2", name: "Plumbing Rough-in Kit", skuCount: 4, cost: 8400 },
    ],
    totalCost: 8400, totalSell: 13440,
  },
  {
    id: "a3", code: "ASM-EQP-AUT", name: "Equipment & Automation Package",
    stage: "Equipment Set", description: "Pump, filter, automation controller, and chemical startup.",
    kits: [
      { id: "k1", name: "Equipment Package -- Standard", skuCount: 3, cost: 4245 },
      { id: "k6", name: "Startup & Chemical Kit", skuCount: 5, cost: 480 },
    ],
    totalCost: 4725, totalSell: 7560,
  },
  {
    id: "a4", code: "ASM-INT-FIN", name: "Interior Finish Package",
    stage: "Interior Finish", description: "Quartz plaster interior, waterline tile, and bullnose coping.",
    kits: [
      { id: "k3", name: "Tile & Coping Package", skuCount: 2, cost: 5170 },
      { id: "k4", name: "Interior Finish Kit -- Quartz", skuCount: 2, cost: 2160 },
    ],
    totalCost: 7330, totalSell: 11728,
  },
  {
    id: "a5", code: "ASM-DCK-HRD", name: "Deck & Hardscape Package",
    stage: "Deck", description: "Concrete deck pour, travertine pavers, and expansion joints.",
    kits: [
      { id: "k9", name: "Concrete Deck Kit", skuCount: 3, cost: 3800 },
      { id: "k10", name: "Paver Kit -- Travertine", skuCount: 2, cost: 2400 },
    ],
    totalCost: 6200, totalSell: 9920,
  },
  {
    id: "a6", code: "ASM-STR-WAR", name: "Startup & Warranty Package",
    stage: "Startup", description: "Chemical startup, orientation, warranty registration.",
    kits: [
      { id: "k6", name: "Startup & Chemical Kit", skuCount: 5, cost: 480 },
      { id: "k11", name: "Warranty & Orientation Kit", skuCount: 2, cost: 720 },
    ],
    totalCost: 1200, totalSell: 1920,
  },
];

function stageBadgeColor(stage: string) {
  const s = stage.toLowerCase();
  if (s.includes("shell"))    return "bg-orange-900/30 text-orange-300 border-orange-800/30";
  if (s.includes("plumb"))    return "bg-cyan-900/30 text-cyan-300 border-cyan-800/30";
  if (s.includes("equip"))    return "bg-blue-900/30 text-blue-300 border-blue-800/30";
  if (s.includes("interior")) return "bg-violet-900/30 text-violet-300 border-violet-800/30";
  if (s.includes("deck"))     return "bg-amber-900/30 text-amber-300 border-amber-800/30";
  if (s.includes("startup"))  return "bg-emerald-900/30 text-emerald-300 border-emerald-800/30";
  return "bg-indigo-900/30 text-indigo-300 border-indigo-800/30";
}

export default function AssembliesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [sortKey, setSortKey] = useState<"name" | "totalCost" | "kitCount">("name");
  const [sortAsc, setSortAsc] = useState(true);

  const stages = useMemo(() => {
    const s = [...new Set(MOCK_ASSEMBLIES.map((a) => a.stage))].sort();
    return ["All", ...s];
  }, []);

  const filtered = useMemo(() => {
    let list = MOCK_ASSEMBLIES.filter((a) => {
      const matchStage = stageFilter === "All" || a.stage === stageFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q);
      return matchStage && matchSearch;
    });
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "totalCost") cmp = a.totalCost - b.totalCost;
      else if (sortKey === "kitCount") cmp = a.kits.length - b.kits.length;
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [search, stageFilter, sortKey, sortAsc]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  const totalCost = MOCK_ASSEMBLIES.reduce((s, a) => s + a.totalCost, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            Assemblies <span className="text-slate-500 font-normal text-base">-- Tier 3</span>
          </h1>
          <p className="text-sm text-slate-400">
            Work packages composed of Kits, mapped to construction stages
            <span className="ml-2 text-slate-600">{MOCK_ASSEMBLIES.length} assemblies / {formatCurrency(totalCost)} total</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Assembly
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assemblies by name or code..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none"
        >
          {stages.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">
                <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-slate-300 transition-colors">
                  Assembly <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium">Code</th>
              <th className="text-left px-4 py-3 font-medium">Stage</th>
              <th className="text-center px-4 py-3 font-medium">
                <button onClick={() => toggleSort("kitCount")} className="flex items-center gap-1 justify-center hover:text-slate-300 transition-colors">
                  Kits <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right px-4 py-3 font-medium">
                <button onClick={() => toggleSort("totalCost")} className="flex items-center gap-1 justify-end hover:text-slate-300 transition-colors">
                  Cost <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right px-4 py-3 font-medium">Sell</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <div className="text-slate-500 text-sm">No assemblies match your search.</div>
                </td>
              </tr>
            ) : (
              filtered.map((asm, i) => (
                <tr
                  key={asm.id}
                  onClick={() => router.push(`/catalog/assemblies/${asm.id}`)}
                  className={cn(
                    "hover:bg-white/[0.04] transition-colors cursor-pointer",
                    i < filtered.length - 1 && "border-b border-[#2a2a4a]/50"
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Layers className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-slate-200 font-medium">{asm.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{asm.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-500">{asm.code}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border", stageBadgeColor(asm.stage))}>
                      {asm.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-700/40 text-slate-300 text-xs font-medium">
                      {asm.kits.length}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(asm.totalCost)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-indigo-300">{formatCurrency(asm.totalSell)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-[#2a2a4a] flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {MOCK_ASSEMBLIES.length} assemblies</span>
            <span>Filtered total: {formatCurrency(filtered.reduce((s, a) => s + a.totalCost, 0))}</span>
          </div>
        )}
      </div>
    </div>
  );
}
