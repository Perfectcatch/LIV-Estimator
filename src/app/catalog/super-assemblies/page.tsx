"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Database, CheckCircle, Layers } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

const MOCK_SUPER_ASSEMBLIES = [
  {
    id: "sa1", code: "SA-15x30-STD", name: "Standard 15x30 Package",
    description: "Entry-level rectangular pool, standard finish, basic equipment. Ideal for smaller backyards.",
    assemblies: [
      { id: "a1", name: "Standard Pool Shell Package", cost: 11500 },
      { id: "a2", name: "Plumbing & Mechanical Package", cost: 8400 },
      { id: "a3", name: "Equipment & Automation Package", cost: 4725 },
      { id: "a4", name: "Interior Finish Package", cost: 7330 },
      { id: "a5", name: "Deck & Hardscape Package", cost: 6200 },
      { id: "a6", name: "Startup & Warranty Package", cost: 1200 },
    ],
    basePrice: 62000, assemblyCount: 6,
  },
  {
    id: "sa2", code: "SA-20x40-STD", name: "Standard 20x40 Package",
    description: "Mid-size rectangular pool, standard finish, variable-speed pump. Most popular residential size.",
    assemblies: [
      { id: "a1", name: "Standard Pool Shell Package", cost: 14200 },
      { id: "a2", name: "Plumbing & Mechanical Package", cost: 10200 },
      { id: "a3", name: "Equipment & Automation Package", cost: 5600 },
      { id: "a4", name: "Interior Finish Package", cost: 9800 },
      { id: "a5", name: "Deck & Hardscape Package", cost: 8400 },
      { id: "a6", name: "Startup & Warranty Package", cost: 1200 },
    ],
    basePrice: 89000, assemblyCount: 6,
  },
  {
    id: "sa3", code: "SA-POOL-SPA-PRM", name: "Premium Pool + Spa Package",
    description: "Pool and attached spa, premium tile, IntelliCenter automation, LED lighting, raised beam.",
    assemblies: [
      { id: "a1", name: "Standard Pool Shell Package", cost: 16500 },
      { id: "a7", name: "Spa Shell Package", cost: 6800 },
      { id: "a2", name: "Plumbing & Mechanical Package", cost: 12400 },
      { id: "a3", name: "Equipment & Automation Package", cost: 8200 },
      { id: "a4", name: "Interior Finish Package (Premium)", cost: 14600 },
      { id: "a5", name: "Deck & Hardscape Package", cost: 11200 },
      { id: "a8", name: "LED & Water Feature Package", cost: 4800 },
      { id: "a6", name: "Startup & Warranty Package", cost: 1200 },
    ],
    basePrice: 124000, assemblyCount: 8,
  },
  {
    id: "sa4", code: "SA-LAP-20x60", name: "Lap Pool 20x60 Package",
    description: "Long rectangular lap pool, minimal coping, commercial grade pump. Swimmer-optimized depth profile.",
    assemblies: [
      { id: "a1", name: "Lap Pool Shell Package", cost: 18000 },
      { id: "a2", name: "Plumbing & Mechanical Package", cost: 9400 },
      { id: "a3", name: "Equipment (Commercial) Package", cost: 6200 },
      { id: "a4", name: "Interior Finish Package", cost: 8800 },
      { id: "a5", name: "Minimal Deck Package", cost: 4200 },
      { id: "a6", name: "Startup & Warranty Package", cost: 1200 },
    ],
    basePrice: 78000, assemblyCount: 6,
  },
  {
    id: "sa5", code: "SA-INFINITY", name: "Infinity Edge Package",
    description: "Vanishing edge pool, custom beam, enhanced hydraulics. Requires catch basin and secondary pump.",
    assemblies: [
      { id: "a1", name: "Infinity Shell Package", cost: 28000 },
      { id: "a9", name: "Catch Basin Package", cost: 8500 },
      { id: "a2", name: "Enhanced Plumbing Package", cost: 14200 },
      { id: "a3", name: "Dual Pump Equipment Package", cost: 9800 },
      { id: "a4", name: "Premium Interior Finish", cost: 16200 },
      { id: "a5", name: "Deck & Hardscape Package", cost: 12800 },
      { id: "a8", name: "Water Feature & Lighting Package", cost: 6200 },
      { id: "a6", name: "Startup & Warranty Package", cost: 1200 },
    ],
    basePrice: 145000, assemblyCount: 8,
  },
  {
    id: "sa6", code: "SA-PLUNGE", name: "Plunge / Cocktail Package",
    description: "Small deep plunge pool, heated, bench seating. Perfect for compact luxury installations.",
    assemblies: [
      { id: "a1", name: "Plunge Shell Package", cost: 8200 },
      { id: "a2", name: "Plumbing (Compact) Package", cost: 5400 },
      { id: "a3", name: "Equipment & Heater Package", cost: 5200 },
      { id: "a4", name: "Interior Finish Package", cost: 4800 },
      { id: "a6", name: "Startup & Warranty Package", cost: 1200 },
    ],
    basePrice: 38000, assemblyCount: 5,
  },
];

function tierBadge(count: number) {
  if (count >= 8) return { label: "Premium", cls: "bg-amber-900/30 text-amber-300 border-amber-800/30" };
  if (count >= 6) return { label: "Standard", cls: "bg-emerald-900/30 text-emerald-300 border-emerald-800/30" };
  return { label: "Compact", cls: "bg-blue-900/30 text-blue-300 border-blue-800/30" };
}

export default function SuperAssembliesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<"All" | "Under $75k" | "$75k-$125k" | "Over $125k">("All");

  const filtered = useMemo(() => {
    return MOCK_SUPER_ASSEMBLIES.filter((sa) => {
      const q = search.toLowerCase();
      const matchSearch = !q || sa.name.toLowerCase().includes(q) || sa.code.toLowerCase().includes(q) || sa.description.toLowerCase().includes(q);
      let matchPrice = true;
      if (priceFilter === "Under $75k") matchPrice = sa.basePrice < 75000;
      else if (priceFilter === "$75k-$125k") matchPrice = sa.basePrice >= 75000 && sa.basePrice <= 125000;
      else if (priceFilter === "Over $125k") matchPrice = sa.basePrice > 125000;
      return matchSearch && matchPrice;
    });
  }, [search, priceFilter]);

  const totalValue = MOCK_SUPER_ASSEMBLIES.reduce((s, sa) => s + sa.basePrice, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            Super-Assemblies <span className="text-slate-500 font-normal text-base">-- Tier 4</span>
          </h1>
          <p className="text-sm text-slate-400">
            Complete pool packages. Select one to generate a full BOM from takeoff inputs.
            <span className="ml-2 text-slate-600">{MOCK_SUPER_ASSEMBLIES.length} packages</span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          <Plus className="w-4 h-4" /> New Package
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search packages by name or description..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex rounded-lg border border-[#2a2a4a] overflow-hidden">
          {(["All", "Under $75k", "$75k-$125k", "Over $125k"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setPriceFilter(opt)}
              className={cn(
                "px-3 py-2 text-xs font-medium transition-colors",
                priceFilter === opt
                  ? "bg-indigo-600 text-white"
                  : "bg-[#16213e] text-slate-400 hover:text-slate-200"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Database className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <div className="text-slate-500 text-sm">No packages match your search.</div>
          </div>
        ) : (
          filtered.map((sa) => {
            const badge = tierBadge(sa.assemblyCount);
            const totalAssemblyCost = sa.assemblies.reduce((s, a) => s + a.cost, 0);
            return (
              <div
                key={sa.id}
                onClick={() => router.push(`/catalog/super-assemblies/${sa.id}`)}
                className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5 hover:border-emerald-500/40 transition-all cursor-pointer group"
              >
                {/* Card Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/20 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-900/30 transition-colors">
                    <Database className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white leading-snug">{sa.name}</span>
                      <span className={cn("inline-flex px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide border", badge.cls)}>
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-600 mt-0.5">{sa.code}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{sa.description}</p>

                {/* Assembly Summary */}
                <div className="space-y-1.5 mb-4">
                  {sa.assemblies.slice(0, 4).map((a) => (
                    <div key={a.id + a.name} className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-400 flex-1 truncate">{a.name}</span>
                      <span className="text-slate-600 font-mono">{formatCurrency(a.cost)}</span>
                    </div>
                  ))}
                  {sa.assemblies.length > 4 && (
                    <div className="text-xs text-slate-600 pl-5">+ {sa.assemblies.length - 4} more assemblies</div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[#2a2a4a]">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {sa.assemblyCount} assemblies</span>
                      <span>Cost: {formatCurrency(totalAssemblyCost)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-600 uppercase tracking-wider">Base Price</div>
                    <div className="text-lg font-bold text-white">{formatCurrency(sa.basePrice)}</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Footer */}
      {filtered.length > 0 && (
        <div className="text-center text-xs text-slate-600">
          Showing {filtered.length} of {MOCK_SUPER_ASSEMBLIES.length} packages / Total catalog value: {formatCurrency(totalValue)}
        </div>
      )}
    </div>
  );
}
