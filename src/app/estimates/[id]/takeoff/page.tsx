"use client";

import { useState, useMemo } from "react";
import { Calculator, ChevronLeft, Save, RotateCcw } from "lucide-react";
import Link from "next/link";


interface TakeoffInputs {
  length: number; width: number; avgDepth: number; perimWall: number;
  deckSF: number; copingLF: number; tileBandLF: number;
  hasBeach: boolean; hasSpa: boolean; spaGallons: number;
}

const defaultInputs: TakeoffInputs = {
  length: 15, width: 30, avgDepth: 5, perimWall: 90,
  deckSF: 600, copingLF: 90, tileBandLF: 90,
  hasBeach: false, hasSpa: false, spaGallons: 800,
};

function computeTakeoff(i: TakeoffInputs) {
  const surfaceArea = i.length * i.width;
  const wallArea    = i.perimWall * i.avgDepth;
  const wetSurface  = surfaceArea + wallArea;
  const gallons     = surfaceArea * i.avgDepth * 7.48;
  const poolGallons = gallons + (i.hasSpa ? i.spaGallons : 0);
  const excavCY     = Math.ceil((surfaceArea * (i.avgDepth + 1) * 1.25) / 27);
  const concreteCY  = Math.ceil(wetSurface * 0.5 / 27);
  const steelLBS    = Math.ceil(wetSurface * 0.8);
  const plasterSF   = wetSurface;
  const copingLF    = i.copingLF;
  const tileLF      = i.tileBandLF;
  const deckSF      = i.deckSF;
  return { surfaceArea, wallArea, wetSurface, gallons: poolGallons, excavCY, concreteCY, steelLBS, plasterSF, copingLF, tileLF, deckSF };
}

export default function TakeoffPage({ params }: { params: { id: string } }) {
  const [inputs, setInputs] = useState<TakeoffInputs>(defaultInputs);
  const results = useMemo(() => computeTakeoff(inputs), [inputs]);

  function set(key: keyof TakeoffInputs, value: number | boolean) {
    setInputs(prev => ({ ...prev, [key]: value }));
  }

  const resultRows = [
    { label: "Surface Area (bottom)",   value: `${results.surfaceArea.toFixed(0)} SF` },
    { label: "Wall Wet Area",           value: `${results.wallArea.toFixed(0)} SF` },
    { label: "Total Wet Surface",       value: `${results.wetSurface.toFixed(0)} SF` },
    { label: "Pool Volume",             value: `${results.gallons.toFixed(0)} gal` },
    { label: "Excavation",             value: `${results.excavCY} CY` },
    { label: "Shotcrete / Gunite",      value: `${results.concreteCY} CY` },
    { label: "Rebar (est.)",            value: `${results.steelLBS.toLocaleString()} LBS` },
    { label: "Plaster / Interior SF",   value: `${results.plasterSF.toFixed(0)} SF` },
    { label: "Coping",                  value: `${results.copingLF} LF` },
    { label: "Tile Band",               value: `${results.tileLF} LF` },
    { label: "Deck Area",               value: `${results.deckSF} SF` },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#16213e] border-b border-[#2a2a4a] px-6 py-3 flex items-center gap-4">
        <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Calculator className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-semibold text-white">Pool Takeoff</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setInputs(defaultInputs)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
            <Save className="w-3.5 h-3.5" /> Save & Generate BOM
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Pool Dimensions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Length (ft)",    key: "length" as const },
                  { label: "Width (ft)",     key: "width" as const },
                  { label: "Avg Depth (ft)", key: "avgDepth" as const },
                  { label: "Perimeter Wall (LF)", key: "perimWall" as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs text-slate-500 mb-1">{label}</label>
                    <input
                      type="number"
                      value={inputs[key] as number}
                      onChange={(e) => set(key, parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Finishes & Deck</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Deck Area (SF)",   key: "deckSF" as const },
                  { label: "Coping (LF)",      key: "copingLF" as const },
                  { label: "Tile Band (LF)",   key: "tileBandLF" as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-xs text-slate-500 mb-1">{label}</label>
                    <input
                      type="number"
                      value={inputs[key] as number}
                      onChange={(e) => set(key, parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={inputs.hasBeach} onChange={(e) => set("hasBeach", e.target.checked)} className="accent-indigo-500" />
                  <span className="text-sm text-slate-300">Beach Entry</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={inputs.hasSpa} onChange={(e) => set("hasSpa", e.target.checked)} className="accent-indigo-500" />
                  <span className="text-sm text-slate-300">Spa</span>
                </label>
              </div>
              {inputs.hasSpa && (
                <div className="mt-3">
                  <label className="block text-xs text-slate-500 mb-1">Spa Volume (gal)</label>
                  <input
                    type="number"
                    value={inputs.spaGallons}
                    onChange={(e) => set("spaGallons", parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Computed Quantities</h3>
            <div className="space-y-3">
              {resultRows.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-[#2a2a4a]/50 last:border-0">
                  <span className="text-sm text-slate-400">{label}</span>
                  <span className="text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#2a2a4a] text-xs text-slate-500">
              These quantities auto-populate the BOM Engine when you click &ldquo;Save &amp; Generate BOM&rdquo;.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
