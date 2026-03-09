"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Grid3x3, ArrowUpDown } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

const MOCK_KITS = [
  {
    id: "k1", code: "KIT-EQP-STD", name: "Equipment Package -- Standard", vendorLabel: "Pentair",
    stage: "Equipment Set", skuCount: 3, totalCost: 4245, totalSell: 6792,
    skus: [
      { code: "EQP-001", name: "Pentair IntelliFlo3 VS 3HP", qty: 1, unit: "EA", cost: 1285 },
      { code: "EQP-002", name: "Pentair Clean & Clear 150", qty: 1, unit: "EA", cost: 860 },
      { code: "EQP-003", name: "IntelliCenter Automation", qty: 1, unit: "EA", cost: 2100 },
    ],
  },
  {
    id: "k2", code: "KIT-PLB-RGH", name: "Plumbing Rough-in Kit", vendorLabel: "Multiple",
    stage: "Plumbing", skuCount: 4, totalCost: 8400, totalSell: 13440,
    skus: [
      { code: "PLB-001", name: "2\" PVC Schedule 40 (per LF)", qty: 280, unit: "LF", cost: 12 },
      { code: "PLB-002", name: "Return Fittings (Hayward)", qty: 4, unit: "EA", cost: 85 },
      { code: "PLB-003", name: "Main Drain Assembly", qty: 2, unit: "EA", cost: 220 },
      { code: "PLB-004", name: "Skimmer Assembly (Hayward SP1082)", qty: 1, unit: "EA", cost: 340 },
    ],
  },
  {
    id: "k3", code: "KIT-TIL-COP", name: "Tile & Coping Package", vendorLabel: "NPT / Stone",
    stage: "Tile & Coping", skuCount: 2, totalCost: 5170, totalSell: 8272,
    skus: [
      { code: "TIL-001", name: "Waterline Tile (6x6 glass, per LF)", qty: 74, unit: "LF", cost: 45 },
      { code: "TIL-002", name: "Bullnose Coping Stone (per LF)", qty: 74, unit: "LF", cost: 25 },
    ],
  },
  {
    id: "k4", code: "KIT-INT-QTZ", name: "Interior Finish Kit -- Quartz", vendorLabel: "NPT",
    stage: "Interior Finish", skuCount: 2, totalCost: 2160, totalSell: 3456,
    skus: [
      { code: "INT-001", name: "PebbleSheen Quartz (per SF)", qty: 400, unit: "SF", cost: 4.80 },
      { code: "INT-002", name: "Application Labor (per SF)", qty: 400, unit: "SF", cost: 0.60 },
    ],
  },
  {
    id: "k5", code: "KIT-STL-RBR", name: "Steel & Rebar Package", vendorLabel: "Steel Depot",
    stage: "Steel & Rebar", skuCount: 3, totalCost: 1200, totalSell: 1920,
    skus: [
      { code: "STL-001", name: "#3 Rebar 20ft stick", qty: 40, unit: "EA", cost: 14 },
      { code: "STL-002", name: "Tie Wire 16ga (per roll)", qty: 4, unit: "EA", cost: 18 },
      { code: "STL-003", name: "Rebar chairs (bag of 100)", qty: 2, unit: "EA", cost: 36 },
    ],
  },
  {
    id: "k6", code: "KIT-STR-CHM", name: "Startup & Chemical Kit", vendorLabel: "Pool Chem Co",
    stage: "Startup", skuCount: 5, totalCost: 480, totalSell: 768,
    skus: [
      { code: "CHM-001", name: "Liquid Chlorine (case)", qty: 2, unit: "CS", cost: 48 },
      { code: "CHM-002", name: "Muriatic Acid (gallon)", qty: 4, unit: "GAL", cost: 22 },
      { code: "CHM-003", name: "Calcium Hypochlorite 1lb", qty: 5, unit: "EA", cost: 12 },
      { code: "CHM-004", name: "Sequestering Agent (qt)", qty: 2, unit: "QT", cost: 28 },
      { code: "CHM-005", name: "Test Kit (Taylor K-2006)", qty: 1, unit: "EA", cost: 68 },
    ],
  },
  {
    id: "k7", code: "KIT-EXC-STD", name: "Excavation Package -- Standard", vendorLabel: "Heavy Equip Inc",
    stage: "Excavation", skuCount: 3, totalCost: 3800, totalSell: 6080,
    skus: [
      { code: "EXC-001", name: "Excavation (per CY)", qty: 60, unit: "CY", cost: 45 },
      { code: "EXC-002", name: "Haul-off (per load)", qty: 6, unit: "LD", cost: 180 },
      { code: "EXC-003", name: "Grading & Compaction", qty: 1, unit: "LS", cost: 620 },
    ],
  },
  {
    id: "k8", code: "KIT-GUN-SHL", name: "Gunite Shell Package", vendorLabel: "Shotcrete Co",
    stage: "Gunite", skuCount: 2, totalCost: 6500, totalSell: 10400,
    skus: [
      { code: "GUN-001", name: "Gunite / Shotcrete (per CY)", qty: 12, unit: "CY", cost: 425 },
      { code: "GUN-002", name: "Gunite Labor (per CY)", qty: 12, unit: "CY", cost: 116 },
    ],
  },
];

function stageBadgeColor(stage: string) {
  const s = stage.toLowerCase();
  if (s.includes("equip"))    return "bg-blue-900/30 text-blue-300 border-blue-800/30";
  if (s.includes("plumb"))    return "bg-cyan-900/30 text-cyan-300 border-cyan-800/30";
  if (s.includes("tile") || s.includes("coping")) return "bg-pink-900/30 text-pink-300 border-pink-800/30";
  if (s.includes("interior")) return "bg-violet-900/30 text-violet-300 border-violet-800/30";
  if (s.includes("steel") || s.includes("rebar")) return "bg-slate-700/40 text-slate-300 border-slate-600/30";
  if (s.includes("startup"))  return "bg-emerald-900/30 text-emerald-300 border-emerald-800/30";
  if (s.includes("excav"))    return "bg-amber-900/30 text-amber-300 border-amber-800/30";
  if (s.includes("gunite"))   return "bg-orange-900/30 text-orange-300 border-orange-800/30";
  return "bg-indigo-900/30 text-indigo-300 border-indigo-800/30";
}

export default function KitsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [sortKey, setSortKey] = useState<"name" | "totalCost" | "skuCount">("name");
  const [sortAsc, setSortAsc] = useState(true);

  const stages = useMemo(() => {
    const s = [...new Set(MOCK_KITS.map((k) => k.stage))].sort();
    return ["All", ...s];
  }, []);

  const filtered = useMemo(() => {
    let list = MOCK_KITS.filter((k) => {
      const matchStage = stageFilter === "All" || k.stage === stageFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || k.name.toLowerCase().includes(q) || k.code.toLowerCase().includes(q) || k.vendorLabel.toLowerCase().includes(q);
      return matchStage && matchSearch;
    });
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "totalCost") cmp = a.totalCost - b.totalCost;
      else if (sortKey === "skuCount") cmp = a.skuCount - b.skuCount;
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [search, stageFilter, sortKey, sortAsc]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  const totalKitCost = MOCK_KITS.reduce((s, k) => s + k.totalCost, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            Kits <span className="text-slate-500 font-normal text-base">-- Tier 2</span>
          </h1>
          <p className="text-sm text-slate-400">
            SKU bundles commonly installed or purchased together
            <span className="ml-2 text-slate-600">{MOCK_KITS.length} kits / {formatCurrency(totalKitCost)} total cost</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Kit
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search kits by name, code, or vendor..."
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
                  Kit <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium">Code</th>
              <th className="text-left px-4 py-3 font-medium">Stage</th>
              <th className="text-left px-4 py-3 font-medium">Vendor</th>
              <th className="text-center px-4 py-3 font-medium">
                <button onClick={() => toggleSort("skuCount")} className="flex items-center gap-1 justify-center hover:text-slate-300 transition-colors">
                  SKUs <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right px-4 py-3 font-medium">
                <button onClick={() => toggleSort("totalCost")} className="flex items-center gap-1 justify-end hover:text-slate-300 transition-colors">
                  Total Cost <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right px-4 py-3 font-medium">Total Sell</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <Grid3x3 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <div className="text-slate-500 text-sm">No kits match your search.</div>
                </td>
              </tr>
            ) : (
              filtered.map((kit, i) => (
                <tr
                  key={kit.id}
                  onClick={() => router.push(`/catalog/kits/${kit.id}`)}
                  className={cn(
                    "hover:bg-white/[0.04] transition-colors cursor-pointer",
                    i < filtered.length - 1 && "border-b border-[#2a2a4a]/50"
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                        <Grid3x3 className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="text-slate-200 font-medium">{kit.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-slate-500">{kit.code}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide border", stageBadgeColor(kit.stage))}>
                      {kit.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{kit.vendorLabel}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-700/40 text-slate-300 text-xs font-medium">
                      {kit.skuCount}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-white">{formatCurrency(kit.totalCost)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-indigo-300">{formatCurrency(kit.totalSell)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-[#2a2a4a] flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {MOCK_KITS.length} kits</span>
            <span>Filtered total: {formatCurrency(filtered.reduce((s, k) => s + k.totalCost, 0))}</span>
          </div>
        )}
      </div>
    </div>
  );
}
