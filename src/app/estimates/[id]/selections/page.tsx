"use client";

import { useState } from "react";
import { ChevronLeft, Save, CheckCircle } from "lucide-react";
import Link from "next/link";

const selectionCategories = [
  {
    cat: "Interior Finish",
    options: ["Quartz — Arctic White", "Quartz — Beachcomber", "Pebble Sheen — Tahoe Blue", "Pebble Fina — Natural", "Plaster — White"],
    selected: "Quartz — Beachcomber",
  },
  {
    cat: "Coping",
    options: ["Travertine — Ivory 12\"", "Travertine — Walnut 12\"", "Bullnose Brick — Buff", "Cantilever Concrete", "Limestone — Cream"],
    selected: "Travertine — Ivory 12\"",
  },
  {
    cat: "Tile Band",
    options: ["3\" Glass — Azure Blue", "3\" Glass — Verde Green", "4\" Porcelain — White", "6\" Mosaic — Mixed Blue", "No Tile — Waterline Only"],
    selected: "3\" Glass — Azure Blue",
  },
  {
    cat: "Deck Material",
    options: ["Concrete — Broom Finish", "Travertine Pavers", "Exposed Aggregate", "Cool Deck Coating", "Stamped Concrete"],
    selected: "Travertine Pavers",
  },
  {
    cat: "Pump",
    options: ["Pentair IntelliFlo3 VS 3HP", "Pentair IntelliFlo VSF", "Hayward TriStar VS", "Jandy VS FloPro", "Standard Single Speed"],
    selected: "Pentair IntelliFlo3 VS 3HP",
  },
  {
    cat: "Filter",
    options: ["Pentair Clean & Clear 150", "Hayward Star-Clear C1750", "Jandy CS150 Cartridge", "Pentair SD80 DE", "Hayward S244T Sand"],
    selected: "Pentair Clean & Clear 150",
  },
  {
    cat: "Automation",
    options: ["Pentair IntelliCenter", "Pentair EasyTouch 8", "Hayward OmniLogic", "Jandy iAqualink", "No Automation"],
    selected: "Pentair IntelliCenter",
  },
  {
    cat: "Lighting",
    options: ["Pentair IntelliBrite 5G Color LED", "Hayward ColorLogic 320 LED", "Jandy WaterColors LED", "Standard White LED", "No Lights"],
    selected: "Pentair IntelliBrite 5G Color LED",
  },
];

export default function SelectionsPage({ params }: { params: { id: string } }) {
  const [selections, setSelections] = useState<Record<string, string>>(
    Object.fromEntries(selectionCategories.map(c => [c.cat, c.selected]))
  );
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/estimates/${params.id}`} className="text-slate-500 hover:text-slate-300 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Selections</h1>
            <p className="text-xs text-slate-500">Client finish and equipment choices</p>
          </div>
        </div>
        <button onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Selections"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectionCategories.map((cat) => (
          <div key={cat.cat} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">{cat.cat}</label>
            <select
              value={selections[cat.cat]}
              onChange={e => setSelections(prev => ({ ...prev, [cat.cat]: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors">
              {cat.options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
