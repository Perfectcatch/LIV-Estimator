"use client";

import { Package, Layers, Grid3x3, Database, ChevronRight } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    href:    "/catalog/skus",
    icon:    Package,
    color:   "text-blue-400",
    bg:      "bg-blue-900/20",
    border:  "border-blue-800/40",
    label:   "SKUs",
    sub:     "Tier 1 — Base items",
    desc:    "Individual raw materials, parts, and line items with unit costs and vendor assignments.",
    count:   "142 items",
  },
  {
    href:    "/catalog/kits",
    icon:    Grid3x3,
    color:   "text-indigo-400",
    bg:      "bg-indigo-900/20",
    border:  "border-indigo-800/40",
    label:   "Kits",
    sub:     "Tier 2 — SKU bundles",
    desc:    "Grouped SKUs that are commonly purchased or installed together as a unit.",
    count:   "28 kits",
  },
  {
    href:    "/catalog/assemblies",
    icon:    Layers,
    color:   "text-purple-400",
    bg:      "bg-purple-900/20",
    border:  "border-purple-800/40",
    label:   "Assemblies",
    sub:     "Tier 3 — Work packages",
    desc:    "Scope-defined work packages composed of Kits and SKUs. Maps to a construction stage.",
    count:   "12 assemblies",
  },
  {
    href:    "/catalog/super-assemblies",
    icon:    Database,
    color:   "text-green-400",
    bg:      "bg-green-900/20",
    border:  "border-green-800/40",
    label:   "Super-Assemblies",
    sub:     "Tier 4 — Full pool packages",
    desc:    "Complete pool packages. One Super-Assembly generates the entire BOM from takeoff inputs.",
    count:   "6 packages",
  },
];

export default function CatalogPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Catalog</h1>
        <p className="text-sm text-slate-400">4-tier pool catalog hierarchy: SKU → Kit → Assembly → Super-Assembly</p>
      </div>

      {/* Tier overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <Link key={tier.href} href={tier.href}
              className={`bg-[#16213e] border ${tier.border} rounded-xl p-5 hover:border-opacity-80 transition-all group`}>
              <div className={`w-10 h-10 rounded-xl ${tier.bg} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${tier.color}`} />
              </div>
              <div className="flex items-start justify-between mb-1">
                <div>
                  <div className="text-base font-bold text-white">{tier.label}</div>
                  <div className={`text-xs font-medium ${tier.color}`}>{tier.sub}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors mt-1" />
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{tier.desc}</p>
              <div className={`mt-4 text-xs font-semibold ${tier.color}`}>{tier.count}</div>
            </Link>
          );
        })}
      </div>

      {/* How it works */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-3">How the 4-Tier System Works</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {["Pool Dimensions (Takeoff)", "→", "Super-Assembly selected", "→", "Assemblies exploded", "→", "Kits resolved", "→", "SKUs with quantities", "→", "Full BOM"].map((s, i) => (
            <span key={i} className={s === "→" ? "text-slate-600" : "text-xs px-2 py-1 rounded-lg bg-white/5 text-slate-300 font-medium"}>{s}</span>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Enter pool dimensions in Takeoff, select a Super-Assembly package, and the BOM Engine automatically resolves the entire bill of materials — quantities, costs, and sell prices — ready for the estimate.
        </p>
      </div>
    </div>
  );
}
