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

  const inputCls = "w-full px-3 py-2 rounded-lg text-[13px] text-white focus:outline-none transition-colors";
  const inputStyle = { background: "#0d0d1a", border: "1px solid #1e1e38", caretColor: "#6366f1" };

  return (
    <div className="flex flex-col h-full" style={{ background: "#0d0d1a" }}>
      {/* Header */}
      <div className="flex-shrink-0 px-5 py-3 flex items-center gap-4" style={{ background: "#0f0f22", borderBottom: "1px solid #1a1a32" }}>
        <Link href={`/estimates/${params.id}`}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-white/[0.06]"
          style={{ color: "#3a3a58" }}>
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <div className="flex items-center gap-2 flex-1">
          <Calculator className="w-4 h-4" style={{ color: "#6366f1" }} />
          <span className="text-[14px] font-semibold text-white">Pool Takeoff</span>
          <span className="text-[11px] ml-1" style={{ color: "#35356a" }}>· Dimensions → Computed Quantities</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setInputs(defaultInputs)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer hover:bg-white/[0.05]"
            style={{ color: "#50508a", border: "1px solid #1e1e38" }}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-all cursor-pointer hover:brightness-110"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}>
            <Save className="w-3.5 h-3.5" /> Save & Generate BOM
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl">
          {/* Inputs */}
          <div className="space-y-4">
            <div className="rounded-xl p-5" style={{ background: "#0f0f22", border: "1px solid #1a1a32" }}>
              <h3 className="text-[13px] font-semibold text-white mb-4">Pool Dimensions</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Length (ft)",         key: "length" as const },
                  { label: "Width (ft)",           key: "width" as const },
                  { label: "Avg Depth (ft)",       key: "avgDepth" as const },
                  { label: "Perimeter Wall (LF)",  key: "perimWall" as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-medium mb-1.5" style={{ color: "#40406a" }}>{label}</label>
                    <input
                      type="number"
                      value={inputs[key] as number}
                      onChange={e => set(key, parseFloat(e.target.value) || 0)}
                      className={inputCls}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#6366f1")}
                      onBlur={e => (e.target.style.borderColor = "#1e1e38")}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ background: "#0f0f22", border: "1px solid #1a1a32" }}>
              <h3 className="text-[13px] font-semibold text-white mb-4">Finishes & Deck</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Deck Area (SF)", key: "deckSF" as const },
                  { label: "Coping (LF)",    key: "copingLF" as const },
                  { label: "Tile Band (LF)", key: "tileBandLF" as const },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-medium mb-1.5" style={{ color: "#40406a" }}>{label}</label>
                    <input
                      type="number"
                      value={inputs[key] as number}
                      onChange={e => set(key, parseFloat(e.target.value) || 0)}
                      className={inputCls}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = "#6366f1")}
                      onBlur={e => (e.target.style.borderColor = "#1e1e38")}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-5 mt-4">
                {[
                  { label: "Beach Entry", key: "hasBeach" as const },
                  { label: "Spa",         key: "hasSpa" as const },
                ].map(({ label, key }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={inputs[key] as boolean}
                      onChange={e => set(key, e.target.checked)}
                      className="w-3.5 h-3.5 accent-indigo-500 cursor-pointer" />
                    <span className="text-[12px] font-medium" style={{ color: "#8080b0" }}>{label}</span>
                  </label>
                ))}
              </div>
              {inputs.hasSpa && (
                <div className="mt-3">
                  <label className="block text-[11px] font-medium mb-1.5" style={{ color: "#40406a" }}>Spa Volume (gal)</label>
                  <input
                    type="number"
                    value={inputs.spaGallons}
                    onChange={e => set("spaGallons", parseFloat(e.target.value) || 0)}
                    className={inputCls}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "#6366f1")}
                    onBlur={e => (e.target.style.borderColor = "#1e1e38")}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="rounded-xl p-5" style={{ background: "#0f0f22", border: "1px solid #1a1a32" }}>
            <h3 className="text-[13px] font-semibold text-white mb-4">Computed Quantities</h3>
            <div className="space-y-0.5">
              {resultRows.map(({ label, value }, i) => (
                <div key={label}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                  style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                  <span className="text-[12px]" style={{ color: "#50507a" }}>{label}</span>
                  <span className="text-[13px] font-semibold tabular-nums text-white">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 text-[11px]" style={{ borderTop: "1px solid #1a1a32", color: "#30305a" }}>
              These quantities auto-populate the BOM Engine when you click &ldquo;Save &amp; Generate BOM&rdquo;.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
