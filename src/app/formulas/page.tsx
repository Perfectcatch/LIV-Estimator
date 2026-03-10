"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Plus, Trash2, Pencil, Save, X, Play, ChevronDown, ChevronRight,
  Search, Sigma, AlertCircle, CheckCircle2, Copy, Braces, Hash,
  Type, List, ToggleLeft, CalendarDays, BookOpen, Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { evaluateFormula, validateFormula, extractParameters, type FormulaValue } from "@/lib/formula-engine";
import type { Parameter, ParameterType, Formula } from "@/types/formulas";
import { PARAMETER_TYPE_LABELS } from "@/types/formulas";

// ─── Seed Data ──────────────────────────────────────────────
const now = new Date().toISOString();

const SEED_PARAMS: Parameter[] = [
  // ── POOL DIMENSIONS ──────────────────────────────────────────
  { id: "p01", name: "Pool Length",          type: "number",   defaultValue: "32",    description: "Pool length (long axis) in feet",                       options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p02", name: "Pool Width",           type: "number",   defaultValue: "16",    description: "Pool width (short axis) in feet",                       options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p03", name: "Shallow Depth",        type: "number",   defaultValue: "3.5",   description: "Depth at the shallow end in feet",                      options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p04", name: "Deep Depth",           type: "number",   defaultValue: "6",     description: "Depth at the deep end in feet",                         options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p05", name: "Wall Thickness",       type: "number",   defaultValue: "0.5",   description: "Gunite/shotcrete shell thickness in feet",               options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p06", name: "Overdig Factor",       type: "number",   defaultValue: "1.25",  description: "Excavation overdig multiplier (1.20–1.35 typical)",      options: [],                                                               unit: "",    createdAt: now, updatedAt: now },

  // ── SPA / WATER FEATURES ─────────────────────────────────────
  { id: "p07", name: "Has Spa",              type: "yesno",    defaultValue: "No",    description: "Whether a spa is included in this project",              options: [],                                                               unit: "",    createdAt: now, updatedAt: now },
  { id: "p08", name: "Spa Length",           type: "number",   defaultValue: "7",     description: "Spa length in feet (if applicable)",                    options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p09", name: "Spa Width",            type: "number",   defaultValue: "7",     description: "Spa width in feet (if applicable)",                     options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p10", name: "Spa Depth",            type: "number",   defaultValue: "3.5",   description: "Spa depth in feet",                                     options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p11", name: "Has Beach Entry",      type: "yesno",    defaultValue: "No",    description: "Zero-edge beach entry ramp",                            options: [],                                                               unit: "",    createdAt: now, updatedAt: now },
  { id: "p12", name: "Has Water Feature",    type: "yesno",    defaultValue: "No",    description: "Sheer descent, scupper, or waterfall feature",          options: [],                                                               unit: "",    createdAt: now, updatedAt: now },
  { id: "p13", name: "Water Feature Count",  type: "number",   defaultValue: "1",     description: "Number of individual water feature heads/scuppers",     options: [],                                                               unit: "EA",  createdAt: now, updatedAt: now },

  // ── DECK ─────────────────────────────────────────────────────
  { id: "p14", name: "Deck Area",            type: "number",   defaultValue: "800",   description: "Total deck/patio surface area",                         options: [],                                                               unit: "SF",  createdAt: now, updatedAt: now },
  { id: "p15", name: "Deck Material",        type: "picklist", defaultValue: "Travertine Pavers", description: "Primary deck finish material",             options: ["Concrete - Broom Finish","Concrete - Exposed Aggregate","Stamped Concrete","Travertine Pavers","Porcelain Pavers","Cool Deck Coating","Kool Deck Spray"], unit: "", createdAt: now, updatedAt: now },
  { id: "p16", name: "Deck Concrete PSI",    type: "picklist", defaultValue: "3500",  description: "Concrete mix design for deck (standard or high-strength)", options: ["3000","3500","4000","4500","5000"],                         unit: "PSI", createdAt: now, updatedAt: now },
  { id: "p17", name: "Has Raised Bond Beam", type: "yesno",    defaultValue: "No",    description: "Raised bond beam / elevated spillover spa wall",        options: [],                                                               unit: "",    createdAt: now, updatedAt: now },

  // ── COPING & TILE ─────────────────────────────────────────────
  { id: "p18", name: "Coping Material",      type: "picklist", defaultValue: "Travertine 12in", description: "Coping material selection",                  options: ["Travertine 12in","Travertine 6in","Limestone","Bullnose Brick","Cantilever Concrete","Natural Stone"],                                    unit: "",    createdAt: now, updatedAt: now },
  { id: "p19", name: "Tile Band Width",      type: "picklist", defaultValue: "6in",   description: "Height of the waterline tile band",                    options: ["3in","6in","12in","18in","Full Wall"],                          unit: "",    createdAt: now, updatedAt: now },
  { id: "p20", name: "Tile Material",        type: "picklist", defaultValue: "Glass 1x1", description: "Waterline tile material",                          options: ["Glass 1x1","Glass 2x2","Porcelain 6x6","Stone Mosaic","Ceramic 4x4","No Tile"],                                                        unit: "",    createdAt: now, updatedAt: now },

  // ── INTERIOR FINISH ───────────────────────────────────────────
  { id: "p21", name: "Interior Finish",      type: "picklist", defaultValue: "Pebble Sheen", description: "Pool interior finish / plaster type",           options: ["White Plaster","Colored Plaster","Quartz - Arctic White","Quartz - Beachcomber","Pebble Sheen","Pebble Fina","Pebble Tec","Diamond Brite"], unit: "",    createdAt: now, updatedAt: now },

  // ── STRUCTURAL / GUNITE ───────────────────────────────────────
  { id: "p22", name: "Gunite PSI",           type: "picklist", defaultValue: "4000",  description: "Shotcrete/gunite compressive strength",                options: ["3500","4000","4500","5000"],                                    unit: "PSI", createdAt: now, updatedAt: now },
  { id: "p23", name: "Rebar Spacing",        type: "picklist", defaultValue: "12in OC", description: "Rebar grid spacing in shell",                       options: ["6in OC","9in OC","12in OC","18in OC"],                          unit: "",    createdAt: now, updatedAt: now },
  { id: "p24", name: "Rebar Size",           type: "picklist", defaultValue: "#4",    description: "Rebar bar diameter designation",                       options: ["#3","#4","#5","#6"],                                            unit: "",    createdAt: now, updatedAt: now },
  { id: "p25", name: "Rebar Cost Per LF",    type: "number",   defaultValue: "1.15",  description: "Installed cost per linear foot of rebar",               options: [],                                                               unit: "$/LF", createdAt: now, updatedAt: now },

  // ── EQUIPMENT ─────────────────────────────────────────────────
  { id: "p26", name: "Pump Model",           type: "picklist", defaultValue: "Pentair IntelliFlo3 VS 3HP", description: "Variable speed pump selection",  options: ["Pentair IntelliFlo3 VS 3HP","Pentair IntelliFlo VSF","Hayward TriStar VS 1.85HP","Jandy VS FloPro 2.7HP","Pentair SuperFlo VS 1HP"],    unit: "",    createdAt: now, updatedAt: now },
  { id: "p27", name: "Filter Model",         type: "picklist", defaultValue: "Pentair Clean & Clear 150", description: "Filter system selection",          options: ["Pentair Clean & Clear 150","Pentair Clean & Clear 320","Hayward C4030 Cartridge","Pentair SD80 DE","Hayward S244T Sand"],               unit: "",    createdAt: now, updatedAt: now },
  { id: "p28", name: "Heater Type",          type: "picklist", defaultValue: "Gas 400k BTU", description: "Pool heater type and size",                   options: ["None","Gas 200k BTU","Gas 250k BTU","Gas 400k BTU","Heat Pump 110k BTU","Heat Pump 140k BTU","Solar Only"],                              unit: "",    createdAt: now, updatedAt: now },
  { id: "p29", name: "Automation System",    type: "picklist", defaultValue: "Pentair IntelliCenter", description: "Pool automation controller",          options: ["None","Pentair IntelliCenter","Pentair EasyTouch 8","Hayward OmniLogic","Jandy iAqualink","Basic Timer"],                               unit: "",    createdAt: now, updatedAt: now },
  { id: "p30", name: "Sanitization",         type: "picklist", defaultValue: "Salt Chlorine Generator", description: "Primary sanitization method",       options: ["Chlorine Tabs","Salt Chlorine Generator","UV System","Ozone System","Salt + UV Combo","Mineral System"],                                unit: "",    createdAt: now, updatedAt: now },

  // ── LIGHTING ──────────────────────────────────────────────────
  { id: "p31", name: "Pool Light Count",     type: "number",   defaultValue: "2",     description: "Number of in-pool LED lights",                         options: [],                                                               unit: "EA",  createdAt: now, updatedAt: now },
  { id: "p32", name: "Light Model",          type: "picklist", defaultValue: "Pentair IntelliBrite 5G Color", description: "Underwater light fixture model", options: ["Pentair IntelliBrite 5G Color","Hayward ColorLogic 320 LED","Jandy WaterColors LED","Standard White LED 300W","Fiber Optic Pkg"], unit: "",    createdAt: now, updatedAt: now },
  { id: "p33", name: "Has Landscape Light",  type: "yesno",    defaultValue: "No",    description: "Landscape / hardscape lighting included",              options: [],                                                               unit: "",    createdAt: now, updatedAt: now },
  { id: "p34", name: "Landscape Light Count",type: "number",   defaultValue: "8",     description: "Number of landscape light fixtures",                   options: [],                                                               unit: "EA",  createdAt: now, updatedAt: now },

  // ── PLUMBING ──────────────────────────────────────────────────
  { id: "p35", name: "Plumbing Pipe Size",   type: "picklist", defaultValue: "2in",   description: "Main circulation pipe diameter",                       options: ["1.5in","2in","2.5in","3in"],                                    unit: "",    createdAt: now, updatedAt: now },
  { id: "p36", name: "Return Jet Count",     type: "number",   defaultValue: "4",     description: "Number of return jets in pool",                        options: [],                                                               unit: "EA",  createdAt: now, updatedAt: now },
  { id: "p37", name: "Main Drain Count",     type: "number",   defaultValue: "2",     description: "Number of main drains (anti-entrapment requires 2+)",  options: [],                                                               unit: "EA",  createdAt: now, updatedAt: now },
  { id: "p38", name: "Has Floor Cleaner",    type: "yesno",    defaultValue: "No",    description: "In-floor cleaning system (Caretaker/A&A)",             options: [],                                                               unit: "",    createdAt: now, updatedAt: now },
  { id: "p39", name: "Floor Cleaner Heads",  type: "number",   defaultValue: "12",    description: "Number of in-floor cleaning heads",                    options: [],                                                               unit: "EA",  createdAt: now, updatedAt: now },

  // ── ELECTRICAL ────────────────────────────────────────────────
  { id: "p40", name: "Panel Distance",       type: "number",   defaultValue: "60",    description: "Distance from main panel to equipment pad in feet",    options: [],                                                               unit: "FT",  createdAt: now, updatedAt: now },
  { id: "p41", name: "Electrical Conduit",   type: "picklist", defaultValue: "1in EMT", description: "Conduit type for pool wiring runs",                 options: ["3/4in EMT","1in EMT","1in PVC","1.25in PVC","1.5in PVC"],       unit: "",    createdAt: now, updatedAt: now },
  { id: "p42", name: "GFCI Outlets",         type: "number",   defaultValue: "2",     description: "Number of GFCI outlets at equipment pad",              options: [],                                                               unit: "EA",  createdAt: now, updatedAt: now },
  { id: "p43", name: "Sub Panel Required",   type: "yesno",    defaultValue: "No",    description: "Dedicated sub panel required for equipment",           options: [],                                                               unit: "",    createdAt: now, updatedAt: now },

  // ── SAFETY & FENCE ────────────────────────────────────────────
  { id: "p44", name: "Fence Type",           type: "picklist", defaultValue: "Aluminum 4ft", description: "Pool safety barrier fence type",                options: ["None","Aluminum 4ft","Aluminum 5ft","Wrought Iron 4ft","Glass Panel","Wood Privacy 6ft","Mesh Removable"],                              unit: "",    createdAt: now, updatedAt: now },
  { id: "p45", name: "Has Safety Cover",     type: "yesno",    defaultValue: "No",    description: "Motorized or manual safety pool cover",                options: [],                                                               unit: "",    createdAt: now, updatedAt: now },
  { id: "p46", name: "Cover Type",           type: "picklist", defaultValue: "Automatic Safety", description: "Pool cover mechanism type",                options: ["Manual Safety","Automatic Safety","Solar Blanket Only","Mesh Safety","None"],                                                           unit: "",    createdAt: now, updatedAt: now },

  // ── SITE CONDITIONS ───────────────────────────────────────────
  { id: "p47", name: "Soil Type",            type: "picklist", defaultValue: "Normal", description: "On-site soil/rock conditions affecting excavation",   options: ["Normal","Caliche","Rocky","Expansive Clay","Sandy","Hardpan"],  unit: "",    createdAt: now, updatedAt: now },
  { id: "p48", name: "Haul Distance",        type: "number",   defaultValue: "15",    description: "One-way haul distance for spoil removal in miles",     options: [],                                                               unit: "MI",  createdAt: now, updatedAt: now },
  { id: "p49", name: "Access Difficulty",    type: "picklist", defaultValue: "Normal", description: "Site access conditions for equipment",                options: ["Easy","Normal","Difficult","Very Difficult"],                   unit: "",    createdAt: now, updatedAt: now },

  // ── PRICING & MARGIN ─────────────────────────────────────────
  { id: "p50", name: "Labor Rate",           type: "number",   defaultValue: "85",    description: "Blended crew labor rate per hour",                     options: [],                                                               unit: "$/HR", createdAt: now, updatedAt: now },
  { id: "p51", name: "Material Markup",      type: "number",   defaultValue: "0.20",  description: "Material markup as a decimal (0.20 = 20%)",            options: [],                                                               unit: "%",   createdAt: now, updatedAt: now },
  { id: "p52", name: "Target Margin",        type: "number",   defaultValue: "0.35",  description: "Target gross margin as a decimal (0.35 = 35%)",        options: [],                                                               unit: "%",   createdAt: now, updatedAt: now },
  { id: "p53", name: "PM Fee Rate",          type: "number",   defaultValue: "0.08",  description: "Project management fee as % of field cost",            options: [],                                                               unit: "%",   createdAt: now, updatedAt: now },
  { id: "p54", name: "Permit Fee",           type: "number",   defaultValue: "1200",  description: "City/county building permit fee",                      options: [],                                                               unit: "$",   createdAt: now, updatedAt: now },
  { id: "p55", name: "Contingency Rate",     type: "number",   defaultValue: "0.05",  description: "Contingency reserve as % of total project cost",       options: [],                                                               unit: "%",   createdAt: now, updatedAt: now },
];

const SEED_FORMULAS: Formula[] = [
  // ══ GROUP: POOL GEOMETRY ══════════════════════════════════════
  {
    id: "f01", name: "Pool Surface Area",
    expression: "{Pool Length} * {Pool Width}",
    description: "Bottom surface area of the pool shell",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },
  {
    id: "f02", name: "Pool Average Depth",
    expression: "({Shallow Depth} + {Deep Depth}) / 2",
    description: "Average of shallow and deep end depths",
    outputUnit: "FT", createdAt: now, updatedAt: now,
  },
  {
    id: "f03", name: "Pool Perimeter",
    expression: "2 * ({Pool Length} + {Pool Width})",
    description: "Total perimeter of the pool shell",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f04", name: "Pool Wall Area",
    expression: "2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2)",
    description: "Total interior wall wet surface area",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },
  {
    id: "f05", name: "Total Wet Surface Area",
    expression: "({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))",
    description: "Combined floor + wall interior surface (used for plaster, gunite, tile)",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },
  {
    id: "f06", name: "Pool Volume (Gallons)",
    expression: "{Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2) * 7.48",
    description: "Total pool water volume in US gallons",
    outputUnit: "GAL", createdAt: now, updatedAt: now,
  },
  {
    id: "f07", name: "Pool Volume (Cubic Feet)",
    expression: "{Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2)",
    description: "Pool water volume in cubic feet",
    outputUnit: "CF", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: SPA GEOMETRY ══════════════════════════════════════
  {
    id: "f08", name: "Spa Surface Area",
    expression: "if({Has Spa} = \"Yes\", {Spa Length} * {Spa Width}, 0)",
    description: "Spa bottom surface area (0 if no spa)",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },
  {
    id: "f09", name: "Spa Wall Area",
    expression: "if({Has Spa} = \"Yes\", 2 * ({Spa Length} + {Spa Width}) * {Spa Depth}, 0)",
    description: "Spa interior wall surface area",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },
  {
    id: "f10", name: "Spa Volume (Gallons)",
    expression: "if({Has Spa} = \"Yes\", {Spa Length} * {Spa Width} * {Spa Depth} * 7.48, 0)",
    description: "Spa water volume in gallons",
    outputUnit: "GAL", createdAt: now, updatedAt: now,
  },
  {
    id: "f11", name: "Combined Water Volume",
    expression: "({Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2) * 7.48) + if({Has Spa} = \"Yes\", {Spa Length} * {Spa Width} * {Spa Depth} * 7.48, 0)",
    description: "Total system volume (pool + spa if present) for equipment sizing",
    outputUnit: "GAL", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: EXCAVATION ════════════════════════════════════════
  {
    id: "f12", name: "Excavation CY (Pool)",
    expression: "ceil((({Pool Length} + 4) * ({Pool Width} + 4) * ((({Shallow Depth} + {Deep Depth}) / 2) + 1.5) * {Overdig Factor}) / 27)",
    description: "Pool excavation volume with 4ft overdig each side and 1.5ft over-depth",
    outputUnit: "CY", createdAt: now, updatedAt: now,
  },
  {
    id: "f13", name: "Excavation CY (Spa)",
    expression: "if({Has Spa} = \"Yes\", ceil((({Spa Length} + 3) * ({Spa Width} + 3) * ({Spa Depth} + 1.5) * {Overdig Factor}) / 27), 0)",
    description: "Spa excavation cubic yards (0 if no spa)",
    outputUnit: "CY", createdAt: now, updatedAt: now,
  },
  {
    id: "f14", name: "Total Excavation CY",
    expression: "ceil((({Pool Length} + 4) * ({Pool Width} + 4) * ((({Shallow Depth} + {Deep Depth}) / 2) + 1.5) * {Overdig Factor}) / 27) + if({Has Spa} = \"Yes\", ceil((({Spa Length} + 3) * ({Spa Width} + 3) * ({Spa Depth} + 1.5) * {Overdig Factor}) / 27), 0)",
    description: "Total excavation for pool + spa combined",
    outputUnit: "CY", createdAt: now, updatedAt: now,
  },
  {
    id: "f15", name: "Haul Loads (14 CY Truck)",
    expression: "ceil((ceil((({Pool Length} + 4) * ({Pool Width} + 4) * ((({Shallow Depth} + {Deep Depth}) / 2) + 1.5) * {Overdig Factor}) / 27) + if({Has Spa} = \"Yes\", ceil((({Spa Length} + 3) * ({Spa Width} + 3) * ({Spa Depth} + 1.5) * {Overdig Factor}) / 27), 0)) / 14)",
    description: "Number of 14 CY dump truck loads for spoil removal",
    outputUnit: "LOADS", createdAt: now, updatedAt: now,
  },
  {
    id: "f16", name: "Haul Cost",
    expression: "ceil((ceil((({Pool Length} + 4) * ({Pool Width} + 4) * ((({Shallow Depth} + {Deep Depth}) / 2) + 1.5) * {Overdig Factor}) / 27) + if({Has Spa} = \"Yes\", ceil((({Spa Length} + 3) * ({Spa Width} + 3) * ({Spa Depth} + 1.5) * {Overdig Factor}) / 27), 0)) / 14) * (95 + ({Haul Distance} * 3.50))",
    description: "Estimated haul cost: $95 base + $3.50/mile/load",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: STRUCTURAL SHELL ══════════════════════════════════
  {
    id: "f17", name: "Gunite CY (Pool Shell)",
    expression: "round((({Pool Length} * {Pool Width} * {Wall Thickness}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2) * {Wall Thickness})) / 27, 1)",
    description: "Cubic yards of gunite/shotcrete for the pool shell",
    outputUnit: "CY", createdAt: now, updatedAt: now,
  },
  {
    id: "f18", name: "Gunite CY (Spa Shell)",
    expression: "if({Has Spa} = \"Yes\", round((({Spa Length} * {Spa Width} * {Wall Thickness}) + (2 * ({Spa Length} + {Spa Width}) * {Spa Depth} * {Wall Thickness})) / 27, 1), 0)",
    description: "Cubic yards of gunite for spa shell (0 if no spa)",
    outputUnit: "CY", createdAt: now, updatedAt: now,
  },
  {
    id: "f19", name: "Total Gunite CY",
    expression: "round((({Pool Length} * {Pool Width} * {Wall Thickness}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2) * {Wall Thickness})) / 27, 1) + if({Has Spa} = \"Yes\", round((({Spa Length} * {Spa Width} * {Wall Thickness}) + (2 * ({Spa Length} + {Spa Width}) * {Spa Depth} * {Wall Thickness})) / 27, 1), 0)",
    description: "Total gunite/shotcrete for pool and spa shells combined",
    outputUnit: "CY", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: REBAR ═════════════════════════════════════════════
  {
    id: "f20", name: "Rebar LF (Pool Floor)",
    expression: "round((({Pool Length} / 1) * {Pool Width}) + (({Pool Width} / 1) * {Pool Length}), 0)",
    description: "Estimated linear feet of rebar for pool floor at 12in OC grid",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f21", name: "Rebar LF (Pool Walls)",
    expression: "round(2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2) * 2, 0)",
    description: "Estimated LF of rebar for pool walls (horizontal + vertical)",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f22", name: "Total Rebar LF",
    expression: "round((({Pool Length} / 1) * {Pool Width}) + (({Pool Width} / 1) * {Pool Length}), 0) + round(2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2) * 2, 0) + if({Has Spa} = \"Yes\", round(2 * ({Spa Length} + {Spa Width}) * {Spa Depth} * 4, 0), 0)",
    description: "Total rebar linear feet for pool shell + spa shell",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f23", name: "Rebar Cost",
    expression: "(round((({Pool Length} / 1) * {Pool Width}) + (({Pool Width} / 1) * {Pool Length}), 0) + round(2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2) * 2, 0) + if({Has Spa} = \"Yes\", round(2 * ({Spa Length} + {Spa Width}) * {Spa Depth} * 4, 0), 0)) * {Rebar Cost Per LF}",
    description: "Total rebar material + installation cost",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: COPING & TILE ═════════════════════════════════════
  {
    id: "f24", name: "Coping LF",
    expression: "(2 * ({Pool Length} + {Pool Width})) + if({Has Spa} = \"Yes\", 2 * ({Spa Length} + {Spa Width}), 0)",
    description: "Total coping linear feet for pool + spa bond beam tops",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f25", name: "Waterline Tile SF",
    expression: "if({Tile Band Width} = \"3in\", (2 * ({Pool Length} + {Pool Width}) + if({Has Spa} = \"Yes\", 2 * ({Spa Length} + {Spa Width}), 0)) * 0.25, if({Tile Band Width} = \"6in\", (2 * ({Pool Length} + {Pool Width}) + if({Has Spa} = \"Yes\", 2 * ({Spa Length} + {Spa Width}), 0)) * 0.5, if({Tile Band Width} = \"12in\", (2 * ({Pool Length} + {Pool Width}) + if({Has Spa} = \"Yes\", 2 * ({Spa Length} + {Spa Width}), 0)) * 1, if({Tile Band Width} = \"18in\", (2 * ({Pool Length} + {Pool Width}) + if({Has Spa} = \"Yes\", 2 * ({Spa Length} + {Spa Width}), 0)) * 1.5, 0))))",
    description: "Square footage of waterline tile based on band width selection",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: PLASTER / INTERIOR FINISH ════════════════════════
  {
    id: "f26", name: "Interior Finish SF",
    expression: "({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2)) + if({Has Spa} = \"Yes\", ({Spa Length} * {Spa Width}) + (2 * ({Spa Length} + {Spa Width}) * {Spa Depth}), 0)",
    description: "Total wet surface area to be plastered or finished",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },
  {
    id: "f27", name: "Plaster Cost",
    expression: "if({Interior Finish} = \"White Plaster\", (({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))) * 4.25, if({Interior Finish} = \"Colored Plaster\", (({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))) * 5.50, if({Interior Finish} = \"Pebble Sheen\", (({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))) * 7.50, if({Interior Finish} = \"Pebble Tec\", (({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))) * 9.00, (({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))) * 8.25))))",
    description: "Interior finish cost: White Plaster=$4.25, Colored=$5.50, Pebble Sheen=$7.50, Pebble Tec=$9.00, Quartz/Fina=$8.25/SF",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: PLUMBING ══════════════════════════════════════════
  {
    id: "f28", name: "Plumbing LF (Main Lines)",
    expression: "round((2 * ({Pool Length} + {Pool Width})) * 1.6, 0)",
    description: "Estimated main plumbing pipe run length (suction + return) at 1.6x perimeter factor",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f29", name: "In-Floor Cleaning Cost",
    expression: "if({Has Floor Cleaner} = \"Yes\", ({Floor Cleaner Heads} * 185) + 1200, 0)",
    description: "In-floor cleaning system cost: $185/head + $1,200 valve body install",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f30", name: "Return Jet Cost",
    expression: "{Return Jet Count} * 65",
    description: "Return jet fittings and installation at $65 each",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: ELECTRICAL ════════════════════════════════════════
  {
    id: "f31", name: "Electrical Conduit Run",
    expression: "{Panel Distance} * 1.15",
    description: "Conduit length with 15% for bends and routing",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f32", name: "Electrical Base Cost",
    expression: "({Panel Distance} * 1.15 * 4.50) + ({GFCI Outlets} * 125) + if({Sub Panel Required} = \"Yes\", 1800, 0)",
    description: "Electrical conduit at $4.50/LF + GFCI outlets + sub panel if needed",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f33", name: "Lighting Cost",
    expression: "if({Light Model} = \"Standard White LED 300W\", {Pool Light Count} * 425, if({Light Model} = \"Fiber Optic Pkg\", {Pool Light Count} * 380, {Pool Light Count} * 680)) + if({Has Landscape Light} = \"Yes\", {Landscape Light Count} * 145, 0)",
    description: "LED pool lights + optional landscape lighting package",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: EQUIPMENT COSTS ══════════════════════════════════
  {
    id: "f34", name: "Pump Cost",
    expression: "if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, if({Pump Model} = \"Pentair IntelliFlo VSF\", 1280, if({Pump Model} = \"Hayward TriStar VS 1.85HP\", 1100, if({Pump Model} = \"Jandy VS FloPro 2.7HP\", 1050, 890))))",
    description: "Variable speed pump material cost by model",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f35", name: "Filter Cost",
    expression: "if({Filter Model} = \"Pentair Clean & Clear 150\", 680, if({Filter Model} = \"Pentair Clean & Clear 320\", 920, if({Filter Model} = \"Hayward C4030 Cartridge\", 740, if({Filter Model} = \"Pentair SD80 DE\", 1050, 580))))",
    description: "Filter system material cost by model",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f36", name: "Heater Cost",
    expression: "if({Heater Type} = \"None\", 0, if({Heater Type} = \"Gas 200k BTU\", 1800, if({Heater Type} = \"Gas 250k BTU\", 2100, if({Heater Type} = \"Gas 400k BTU\", 2650, if({Heater Type} = \"Heat Pump 110k BTU\", 3200, if({Heater Type} = \"Heat Pump 140k BTU\", 3800, 850))))))",
    description: "Heater material cost: Gas units $1,800–$2,650 · Heat pumps $3,200–$3,800 · Solar $850",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f37", name: "Automation Cost",
    expression: "if({Automation System} = \"None\", 0, if({Automation System} = \"Basic Timer\", 280, if({Automation System} = \"Pentair EasyTouch 8\", 1650, if({Automation System} = \"Pentair IntelliCenter\", 2400, if({Automation System} = \"Hayward OmniLogic\", 2200, 1900)))))",
    description: "Automation controller cost by system level",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f38", name: "Sanitization Cost",
    expression: "if({Sanitization} = \"Chlorine Tabs\", 0, if({Sanitization} = \"Salt Chlorine Generator\", 850, if({Sanitization} = \"UV System\", 1200, if({Sanitization} = \"Ozone System\", 980, if({Sanitization} = \"Salt + UV Combo\", 1900, 650)))))",
    description: "Sanitization system cost above basic chlorine tabs",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f39", name: "Total Equipment Cost",
    expression: "if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, if({Pump Model} = \"Pentair IntelliFlo VSF\", 1280, if({Pump Model} = \"Hayward TriStar VS 1.85HP\", 1100, if({Pump Model} = \"Jandy VS FloPro 2.7HP\", 1050, 890)))) + if({Filter Model} = \"Pentair Clean & Clear 150\", 680, if({Filter Model} = \"Pentair Clean & Clear 320\", 920, if({Filter Model} = \"Hayward C4030 Cartridge\", 740, if({Filter Model} = \"Pentair SD80 DE\", 1050, 580)))) + if({Heater Type} = \"None\", 0, if({Heater Type} = \"Gas 200k BTU\", 1800, if({Heater Type} = \"Gas 250k BTU\", 2100, if({Heater Type} = \"Gas 400k BTU\", 2650, if({Heater Type} = \"Heat Pump 110k BTU\", 3200, if({Heater Type} = \"Heat Pump 140k BTU\", 3800, 850)))))) + if({Automation System} = \"None\", 0, if({Automation System} = \"Basic Timer\", 280, if({Automation System} = \"Pentair EasyTouch 8\", 1650, if({Automation System} = \"Pentair IntelliCenter\", 2400, if({Automation System} = \"Hayward OmniLogic\", 2200, 1900))))) + if({Sanitization} = \"Chlorine Tabs\", 0, if({Sanitization} = \"Salt Chlorine Generator\", 850, if({Sanitization} = \"UV System\", 1200, if({Sanitization} = \"Ozone System\", 980, if({Sanitization} = \"Salt + UV Combo\", 1900, 650)))))",
    description: "Sum of pump + filter + heater + automation + sanitization costs",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: DECK & FENCE ══════════════════════════════════════
  {
    id: "f40", name: "Deck Cost",
    expression: "if({Deck Material} = \"Concrete - Broom Finish\", {Deck Area} * 8.50, if({Deck Material} = \"Concrete - Exposed Aggregate\", {Deck Area} * 11.00, if({Deck Material} = \"Stamped Concrete\", {Deck Area} * 14.50, if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18.00, if({Deck Material} = \"Porcelain Pavers\", {Deck Area} * 22.00, if({Deck Material} = \"Cool Deck Coating\", {Deck Area} * 6.50, {Deck Area} * 9.00))))))",
    description: "Deck material + install: Broom=$8.50 · Exposed Agg=$11 · Stamped=$14.50 · Travertine=$18 · Porcelain=$22 · Cool Deck=$6.50/SF",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f41", name: "Fence LF",
    expression: "if({Fence Type} = \"None\", 0, (2 * ({Pool Length} + {Pool Width})) + 20)",
    description: "Safety fence linear feet: pool perimeter + 20ft for gate swing and corners",
    outputUnit: "LF", createdAt: now, updatedAt: now,
  },
  {
    id: "f42", name: "Fence Cost",
    expression: "if({Fence Type} = \"None\", 0, if({Fence Type} = \"Aluminum 4ft\", ((2 * ({Pool Length} + {Pool Width})) + 20) * 28, if({Fence Type} = \"Aluminum 5ft\", ((2 * ({Pool Length} + {Pool Width})) + 20) * 34, if({Fence Type} = \"Wrought Iron 4ft\", ((2 * ({Pool Length} + {Pool Width})) + 20) * 45, if({Fence Type} = \"Glass Panel\", ((2 * ({Pool Length} + {Pool Width})) + 20) * 120, if({Fence Type} = \"Wood Privacy 6ft\", ((2 * ({Pool Length} + {Pool Width})) + 20) * 38, ((2 * ({Pool Length} + {Pool Width})) + 20) * 22))))))",
    description: "Fence installed cost: Alum 4ft=$28/LF · Alum 5ft=$34 · Wrought Iron=$45 · Glass=$120 · Wood=$38 · Mesh=$22/LF",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: SAFETY COVER ══════════════════════════════════════
  {
    id: "f43", name: "Safety Cover Cost",
    expression: "if({Has Safety Cover} = \"No\", 0, if({Cover Type} = \"Automatic Safety\", ({Pool Length} * {Pool Width} * 38) + 3200, if({Cover Type} = \"Manual Safety\", ({Pool Length} * {Pool Width} * 3.50) + 450, if({Cover Type} = \"Mesh Safety\", ({Pool Length} * {Pool Width} * 2.80) + 350, if({Cover Type} = \"Solar Blanket Only\", ({Pool Length} * {Pool Width} * 1.20) + 80, 0)))))",
    description: "Pool cover cost: Automatic=$38/SF+$3200 reel · Manual Safety=$3.50/SF · Mesh=$2.80/SF · Solar blanket=$1.20/SF",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: WATER FEATURES ════════════════════════════════════
  {
    id: "f44", name: "Water Feature Cost",
    expression: "if({Has Water Feature} = \"Yes\", {Water Feature Count} * 1450 + 800, 0)",
    description: "Sheer descent / scupper water features at $1,450 each + $800 plumbing stub-in",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: SOIL & SITE ADJUSTMENT ════════════════════════════
  {
    id: "f45", name: "Soil Difficulty Multiplier",
    expression: "if({Soil Type} = \"Normal\", 1.00, if({Soil Type} = \"Sandy\", 0.95, if({Soil Type} = \"Caliche\", 1.35, if({Soil Type} = \"Rocky\", 1.55, if({Soil Type} = \"Expansive Clay\", 1.20, 1.45)))))",
    description: "Multiplier applied to excavation & shell costs based on soil conditions",
    outputUnit: "x", createdAt: now, updatedAt: now,
  },
  {
    id: "f46", name: "Access Difficulty Adder",
    expression: "if({Access Difficulty} = \"Easy\", -500, if({Access Difficulty} = \"Normal\", 0, if({Access Difficulty} = \"Difficult\", 2500, 5500)))",
    description: "Site access cost adjustment: Easy=-$500 · Normal=$0 · Difficult=+$2,500 · Very Difficult=+$5,500",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: TOTALS & MARGIN ════════════════════════════════════
  {
    id: "f47", name: "Field Cost Subtotal",
    expression: "if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, if({Pump Model} = \"Pentair IntelliFlo VSF\", 1280, 1000)) + if({Filter Model} = \"Pentair Clean & Clear 150\", 680, 740) + if({Heater Type} = \"None\", 0, if({Heater Type} = \"Gas 400k BTU\", 2650, 2100)) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + if({Interior Finish} = \"Pebble Sheen\", (({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))) * 7.50, (({Pool Length} * {Pool Width}) + (2 * ({Pool Length} + {Pool Width}) * (({Shallow Depth} + {Deep Depth}) / 2))) * 5.50) + {Permit Fee}",
    description: "Simplified field cost subtotal for quick margin checking (use detailed trade formulas for full BOM)",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f48", name: "PM Fee",
    expression: "(if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11)) * {PM Fee Rate}",
    description: "Project management fee applied to field costs at the configured rate",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f49", name: "Contingency Reserve",
    expression: "(if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + {Permit Fee}) * {Contingency Rate}",
    description: "Contingency reserve at configured rate applied to total field costs",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f50", name: "Sell Price from Cost (Margin Method)",
    expression: "round((if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + {Permit Fee}) / (1 - {Target Margin}), 0)",
    description: "Contract sell price derived from cost using gross margin target",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f51", name: "Sell Price from Cost (Markup Method)",
    expression: "round((if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + {Permit Fee}) * (1 + {Material Markup}), 0)",
    description: "Contract price using traditional markup (cost × (1 + markup%))",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f52", name: "Gross Profit",
    expression: "round((if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + {Permit Fee}) / (1 - {Target Margin}), 0) - (if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + {Permit Fee})",
    description: "Gross profit dollars: sell price minus total field cost",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
  {
    id: "f53", name: "Actual Gross Margin %",
    expression: "round((1 - ((if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + {Permit Fee}) / round((if({Pump Model} = \"Pentair IntelliFlo3 VS 3HP\", 1450, 1000) + if({Deck Material} = \"Travertine Pavers\", {Deck Area} * 18, {Deck Area} * 11) + {Permit Fee}) / (1 - {Target Margin}), 0))) * 100, 1)",
    description: "Calculated gross margin as a percentage of sell price",
    outputUnit: "%", createdAt: now, updatedAt: now,
  },

  // ══ GROUP: EQUIPMENT SIZING HELPERS ════════════════════════
  {
    id: "f54", name: "Turnover Rate (Hours)",
    expression: "round(({Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2) * 7.48) / 3500, 1)",
    description: "Pool turnover time at 3,500 GPH pump flow rate — target ≤8 hours",
    outputUnit: "HRS", createdAt: now, updatedAt: now,
  },
  {
    id: "f55", name: "Min Pump Flow Needed (GPH)",
    expression: "round(({Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2) * 7.48) / 8, 0)",
    description: "Minimum GPH pump flow to achieve 8-hour turnover (code minimum)",
    outputUnit: "GPH", createdAt: now, updatedAt: now,
  },
  {
    id: "f56", name: "Recommended Filter Size (SF)",
    expression: "ceil(round(({Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2) * 7.48) / 8, 0) / 500 + 25)",
    description: "Cartridge filter sizing: GPH ÷ 500 + 25 SF buffer",
    outputUnit: "SF", createdAt: now, updatedAt: now,
  },
  {
    id: "f57", name: "Salt Needed (Startup lbs)",
    expression: "round(({Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2) * 7.48) / 1000 * 8.3, 0)",
    description: "Pounds of salt needed to reach 3,200 ppm target for salt system startup",
    outputUnit: "LBS", createdAt: now, updatedAt: now,
  },
  {
    id: "f58", name: "Startup Chemical Kit Cost",
    expression: "round(({Pool Length} * {Pool Width} * (({Shallow Depth} + {Deep Depth}) / 2) * 7.48) / 10000 * 185, 0)",
    description: "Estimated startup chemical cost at $185 per 10,000 gallons",
    outputUnit: "$", createdAt: now, updatedAt: now,
  },
];

// ─── Function Reference Data ────────────────────────────────
const FUNC_REFERENCE = [
  { name: "+", syntax: "a + b", example: "6 + 3 = 9", desc: "Add values (sum)", insert: " + " },
  { name: "-", syntax: "a - b", example: "6 - 3 = 3", desc: "Subtract values", insert: " - " },
  { name: "*", syntax: "a * b", example: "6 * 3 = 18", desc: "Multiply values", insert: " * " },
  { name: "/", syntax: "a / b", example: "6 / 3 = 2", desc: "Divide values", insert: " / " },
  { name: "^", syntax: "a ^ b", example: "6 ^ 3 = 216", desc: "Exponential power", insert: " ^ " },
  { name: "sqrt", syntax: "sqrt(value)", example: "sqrt(4) = 2", desc: "Square root of a value", insert: "sqrt()" },
  { name: "round", syntax: "round(value, decimals)", example: "round(6.633, 2) = 6.63", desc: "Round to desired decimals", insert: "round(, 2)" },
  { name: "floor", syntax: "floor(value)", example: "floor(6.633) = 6", desc: "Round down to whole number", insert: "floor()" },
  { name: "ceil", syntax: "ceil(value)", example: "ceil(6.633) = 7", desc: "Round up to whole number", insert: "ceil()" },
  { name: "min", syntax: "min(a, b, ...)", example: "min(100, 9, 2) = 2", desc: "Identify the smallest value", insert: "min(, )" },
  { name: "max", syntax: "max(a, b, ...)", example: "max(100, 9, 2) = 100", desc: "Identify the largest value", insert: "max(, )" },
  { name: "if", syntax: "if(condition, then, else)", example: 'if({x} > 10, 1, 0)', desc: "Conditional logic", insert: "if( , , )" },
  { name: "and", syntax: "a and b", example: '{x} > 5 and {y} < 10', desc: "Both conditions must be true", insert: " and " },
  { name: "or", syntax: "a or b", example: '{x} > 5 or {y} < 10', desc: "Either condition can be true", insert: " or " },
  { name: "coalesce", syntax: "coalesce(a, b, ...)", example: "coalesce(null, 0) = 0", desc: "First non-null value", insert: "coalesce(, 0)" },
  { name: "number", syntax: "number(text)", example: 'number("$250,000") = 250000', desc: "Convert text to number", insert: "number()" },
  { name: "abs", syntax: "abs(value)", example: "abs(-5) = 5", desc: "Absolute value", insert: "abs()" },
];

const COMPARISON_OPS = [
  { label: "=", desc: "Equal to", insert: " = " },
  { label: "!=", desc: "Not equal to", insert: " != " },
  { label: "<", desc: "Less than", insert: " < " },
  { label: "<=", desc: "Less than or equal", insert: " <= " },
  { label: ">", desc: "Greater than", insert: " > " },
  { label: ">=", desc: "Greater than or equal", insert: " >= " },
];

const PARAM_TYPE_ICONS: Record<ParameterType, React.ComponentType<{ className?: string }>> = {
  number: Hash,
  text: Type,
  picklist: List,
  yesno: ToggleLeft,
  date: CalendarDays,
};

const PARAM_TYPE_COLORS: Record<ParameterType, string> = {
  number: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  text: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  picklist: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  yesno: "bg-green-500/15 text-green-400 border-green-500/20",
  date: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Input Styles ───────────────────────────────────────────
const inputCls = "w-full px-3 py-2 rounded-lg text-[13px] text-white focus:outline-none transition-colors bg-[#0d0d1a] border border-[#1e1e38] focus:border-indigo-500";
const labelCls = "block text-[11px] font-medium mb-1.5 text-[#40406a]";

// ═════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════
export default function FormulasPage() {
  const [tab, setTab] = useState<"parameters" | "formulas">("parameters");

  // ─── Parameters State ───
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [paramSearch, setParamSearch] = useState("");
  const [showParamForm, setShowParamForm] = useState(false);
  const [editParamId, setEditParamId] = useState<string | null>(null);
  const [paramForm, setParamForm] = useState({
    name: "", type: "number" as ParameterType, defaultValue: "", description: "", options: "", unit: "",
  });

  // ─── Formulas State ───
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [formulaSearch, setFormulaSearch] = useState("");
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(null);
  const [formulaForm, setFormulaForm] = useState({
    name: "", expression: "", description: "", outputUnit: "",
  });
  const [testValues, setTestValues] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<{ value: FormulaValue | null; error?: string }>({ value: null });
  const [showReference, setShowReference] = useState(false);
  const exprRef = useRef<HTMLTextAreaElement>(null);

  // ─── localStorage sync ───
  useEffect(() => {
    const DATA_VERSION = "v3";
    if (localStorage.getItem("liv-data-version") !== DATA_VERSION) {
      localStorage.removeItem("liv-parameters");
      localStorage.removeItem("liv-formulas");
      localStorage.setItem("liv-data-version", DATA_VERSION);
    }
    const savedParams = localStorage.getItem("liv-parameters");
    if (savedParams) {
      try { setParameters(JSON.parse(savedParams)); } catch { setParameters(SEED_PARAMS); }
    } else {
      setParameters(SEED_PARAMS);
    }
    const savedFormulas = localStorage.getItem("liv-formulas");
    if (savedFormulas) {
      try { setFormulas(JSON.parse(savedFormulas)); } catch { setFormulas(SEED_FORMULAS); }
    } else {
      setFormulas(SEED_FORMULAS);
    }
  }, []);

  useEffect(() => {
    if (parameters.length > 0) localStorage.setItem("liv-parameters", JSON.stringify(parameters));
  }, [parameters]);

  useEffect(() => {
    if (formulas.length > 0) localStorage.setItem("liv-formulas", JSON.stringify(formulas));
  }, [formulas]);

  // ─── Validation ───
  const validation = formulaForm.expression.trim()
    ? validateFormula(formulaForm.expression)
    : null;

  // ─── Auto-evaluate test ───
  useEffect(() => {
    if (!formulaForm.expression.trim()) {
      setTestResult({ value: null });
      return;
    }
    try {
      const context: Record<string, FormulaValue> = {};
      const paramNames = extractParameters(formulaForm.expression);
      for (const name of paramNames) {
        const param = parameters.find((p) => p.name === name);
        const testVal = testValues[name];
        if (testVal !== undefined && testVal !== "") {
          context[name] = param?.type === "number" ? Number(testVal) : testVal;
        } else if (param?.defaultValue) {
          context[name] = param.type === "number" ? Number(param.defaultValue) : param.defaultValue;
        } else {
          context[name] = 0;
        }
      }
      const result = evaluateFormula(formulaForm.expression, context);
      setTestResult({ value: result });
    } catch (e) {
      setTestResult({ value: null, error: (e as Error).message });
    }
  }, [formulaForm.expression, testValues, parameters]);

  // ─── Helpers ───
  const insertAtCursor = useCallback((text: string) => {
    const textarea = exprRef.current;
    if (!textarea) {
      setFormulaForm((prev) => ({ ...prev, expression: prev.expression + text }));
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = formulaForm.expression.slice(0, start);
    const after = formulaForm.expression.slice(end);
    const newExpr = before + text + after;
    setFormulaForm((prev) => ({ ...prev, expression: newExpr }));
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + text.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  }, [formulaForm.expression]);

  const filteredParams = parameters.filter((p) =>
    p.name.toLowerCase().includes(paramSearch.toLowerCase()) ||
    p.description.toLowerCase().includes(paramSearch.toLowerCase())
  );

  const filteredFormulas = formulas.filter((f) =>
    f.name.toLowerCase().includes(formulaSearch.toLowerCase()) ||
    f.description.toLowerCase().includes(formulaSearch.toLowerCase())
  );

  const expressionParams = formulaForm.expression ? extractParameters(formulaForm.expression) : [];

  // ─── Parameter CRUD ───
  function resetParamForm() {
    setParamForm({ name: "", type: "number", defaultValue: "", description: "", options: "", unit: "" });
    setEditParamId(null);
    setShowParamForm(false);
  }

  function startEditParam(p: Parameter) {
    setParamForm({
      name: p.name,
      type: p.type,
      defaultValue: p.defaultValue,
      description: p.description,
      options: p.options.join(", "),
      unit: p.unit,
    });
    setEditParamId(p.id);
    setShowParamForm(true);
  }

  function saveParam() {
    if (!paramForm.name.trim()) return;
    const ts = new Date().toISOString();
    const options = paramForm.type === "picklist"
      ? paramForm.options.split(",").map((o) => o.trim()).filter(Boolean)
      : [];

    if (editParamId) {
      setParameters((prev) =>
        prev.map((p) =>
          p.id === editParamId
            ? { ...p, name: paramForm.name.trim(), type: paramForm.type, defaultValue: paramForm.defaultValue, description: paramForm.description, options, unit: paramForm.unit, updatedAt: ts }
            : p
        )
      );
    } else {
      const newParam: Parameter = {
        id: generateId(),
        name: paramForm.name.trim(),
        type: paramForm.type,
        defaultValue: paramForm.defaultValue,
        description: paramForm.description,
        options,
        unit: paramForm.unit,
        createdAt: ts,
        updatedAt: ts,
      };
      setParameters((prev) => [...prev, newParam]);
    }
    resetParamForm();
  }

  function deleteParam(id: string) {
    setParameters((prev) => prev.filter((p) => p.id !== id));
  }

  // ─── Formula CRUD ───
  function selectFormula(f: Formula) {
    setSelectedFormulaId(f.id);
    setFormulaForm({
      name: f.name,
      expression: f.expression,
      description: f.description,
      outputUnit: f.outputUnit,
    });
    setTestValues({});
  }

  function newFormula() {
    setSelectedFormulaId(null);
    setFormulaForm({ name: "", expression: "", description: "", outputUnit: "" });
    setTestValues({});
  }

  function saveFormula() {
    if (!formulaForm.name.trim() || !formulaForm.expression.trim()) return;
    const ts = new Date().toISOString();
    if (selectedFormulaId) {
      setFormulas((prev) =>
        prev.map((f) =>
          f.id === selectedFormulaId
            ? { ...f, name: formulaForm.name.trim(), expression: formulaForm.expression, description: formulaForm.description, outputUnit: formulaForm.outputUnit, updatedAt: ts }
            : f
        )
      );
    } else {
      const newF: Formula = {
        id: generateId(),
        name: formulaForm.name.trim(),
        expression: formulaForm.expression,
        description: formulaForm.description,
        outputUnit: formulaForm.outputUnit,
        createdAt: ts,
        updatedAt: ts,
      };
      setFormulas((prev) => [...prev, newF]);
      setSelectedFormulaId(newF.id);
    }
  }

  function deleteFormula(id: string) {
    setFormulas((prev) => prev.filter((f) => f.id !== id));
    if (selectedFormulaId === id) newFormula();
  }

  function duplicateFormula(f: Formula) {
    const ts = new Date().toISOString();
    const copy: Formula = {
      ...f,
      id: generateId(),
      name: f.name + " (copy)",
      createdAt: ts,
      updatedAt: ts,
    };
    setFormulas((prev) => [...prev, copy]);
    selectFormula(copy);
  }

  // ═════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════
  return (
    <div className="flex flex-col h-full" style={{ background: "#0d0d1a" }}>
      {/* ── Header ── */}
      <div
        className="flex-shrink-0 px-6 py-4 flex items-center justify-between"
        style={{ background: "#0f0f22", borderBottom: "1px solid #1a1a32" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}
          >
            <Sigma className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-white tracking-tight">Functions & Parameters</h1>
            <p className="text-[11px] mt-0.5" style={{ color: "#40406a" }}>
              Build dynamic calculations for estimates and proposals
            </p>
          </div>
        </div>
        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid #1e1e38" }}>
          {(["parameters", "formulas"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2 text-[12px] font-semibold transition-all cursor-pointer capitalize",
                tab === t
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-[#50507a] hover:text-[#8080b0] hover:bg-white/[0.03]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-auto">
        {tab === "parameters" ? (
          /* ═══════════════════════════════════════════════════
             PARAMETERS TAB
             ═══════════════════════════════════════════════════ */
          <div className="p-6 max-w-6xl mx-auto">
            {/* Search + Add */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#35356a]" />
                <input
                  placeholder="Search parameters..."
                  value={paramSearch}
                  onChange={(e) => setParamSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg text-[13px] text-white bg-[#0f0f22] border border-[#1e1e38] focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <button
                onClick={() => { resetParamForm(); setShowParamForm(true); }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white cursor-pointer transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.25)" }}
              >
                <Plus className="w-3.5 h-3.5" /> New Parameter
              </button>
            </div>

            {/* Add/Edit Form */}
            {showParamForm && (
              <div
                className="rounded-xl p-5 mb-4 space-y-4"
                style={{ background: "#0f0f22", border: "1px solid #252545" }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-white">
                    {editParamId ? "Edit Parameter" : "New Parameter"}
                  </h3>
                  <button onClick={resetParamForm} className="text-[#50507a] hover:text-white transition-colors cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelCls}>Name *</label>
                    <input
                      value={paramForm.name}
                      onChange={(e) => setParamForm({ ...paramForm, name: e.target.value })}
                      placeholder="e.g. Square Foot"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Type</label>
                    <select
                      value={paramForm.type}
                      onChange={(e) => setParamForm({ ...paramForm, type: e.target.value as ParameterType })}
                      className={inputCls + " cursor-pointer"}
                    >
                      {(Object.entries(PARAMETER_TYPE_LABELS) as [ParameterType, string][]).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Unit</label>
                    <input
                      value={paramForm.unit}
                      onChange={(e) => setParamForm({ ...paramForm, unit: e.target.value })}
                      placeholder="e.g. SF, LF, CY, FT"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>
                      Default Value
                      {paramForm.type === "yesno" && <span className="ml-1 text-[#35356a]">(Yes or No)</span>}
                    </label>
                    {paramForm.type === "yesno" ? (
                      <select
                        value={paramForm.defaultValue}
                        onChange={(e) => setParamForm({ ...paramForm, defaultValue: e.target.value })}
                        className={inputCls + " cursor-pointer"}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    ) : paramForm.type === "picklist" ? (
                      <select
                        value={paramForm.defaultValue}
                        onChange={(e) => setParamForm({ ...paramForm, defaultValue: e.target.value })}
                        className={inputCls + " cursor-pointer"}
                      >
                        <option value="">— Select default —</option>
                        {paramForm.options.split(",").map((o) => o.trim()).filter(Boolean).map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={paramForm.defaultValue}
                        onChange={(e) => setParamForm({ ...paramForm, defaultValue: e.target.value })}
                        placeholder={paramForm.type === "number" ? "0" : ""}
                        type={paramForm.type === "number" ? "number" : paramForm.type === "date" ? "date" : "text"}
                        className={inputCls}
                      />
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>Description</label>
                    <input
                      value={paramForm.description}
                      onChange={(e) => setParamForm({ ...paramForm, description: e.target.value })}
                      placeholder="Brief description of this parameter"
                      className={inputCls}
                    />
                  </div>
                </div>
                {paramForm.type === "picklist" && (
                  <div>
                    <label className={labelCls}>Picklist Options <span className="text-[#35356a]">(comma-separated)</span></label>
                    <input
                      value={paramForm.options}
                      onChange={(e) => setParamForm({ ...paramForm, options: e.target.value })}
                      placeholder="e.g. steel, fiberglass, vinyl"
                      className={inputCls}
                    />
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={saveParam}
                    disabled={!paramForm.name.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-white cursor-pointer transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
                  >
                    <Save className="w-3.5 h-3.5" /> {editParamId ? "Update" : "Create"} Parameter
                  </button>
                  <button
                    onClick={resetParamForm}
                    className="px-4 py-2 rounded-lg text-[12px] font-medium text-[#50507a] hover:text-white border border-[#1e1e38] hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Parameters Table */}
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1a1a32" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#0f0f22", borderBottom: "1px solid #1a1a32" }}>
                    {["Name", "Type", "Default", "Unit", "Description", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-[10px] font-semibold tracking-wider uppercase" style={{ color: "#35356a" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredParams.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[13px]" style={{ color: "#35356a" }}>
                        {paramSearch ? "No parameters match your search" : "No parameters yet. Create one to get started."}
                      </td>
                    </tr>
                  ) : (
                    filteredParams.map((p, i) => {
                      const Icon = PARAM_TYPE_ICONS[p.type];
                      return (
                        <tr
                          key={p.id}
                          className="group transition-colors hover:bg-white/[0.02]"
                          style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent", borderBottom: "1px solid #141430" }}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Braces className="w-3.5 h-3.5 text-indigo-400/50" />
                              <span className="text-[13px] font-medium text-white">{p.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border", PARAM_TYPE_COLORS[p.type])}>
                              <Icon className="w-3 h-3" />
                              {PARAMETER_TYPE_LABELS[p.type]}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[#8080b0] font-mono">{p.defaultValue || "—"}</td>
                          <td className="px-4 py-3 text-[12px] text-[#50507a] font-medium">{p.unit || "—"}</td>
                          <td className="px-4 py-3 text-[12px] text-[#50507a] max-w-[200px] truncate">{p.description || "—"}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEditParam(p)}
                                className="p-1.5 rounded-md hover:bg-white/[0.06] text-[#50507a] hover:text-indigo-400 transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteParam(p.id)}
                                className="p-1.5 rounded-md hover:bg-red-500/10 text-[#50507a] hover:text-red-400 transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 flex gap-4">
              {(["number", "text", "picklist", "yesno", "date"] as ParameterType[]).map((t) => {
                const count = parameters.filter((p) => p.type === t).length;
                if (count === 0) return null;
                const Icon = PARAM_TYPE_ICONS[t];
                return (
                  <div key={t} className="flex items-center gap-1.5 text-[11px]" style={{ color: "#40406a" }}>
                    <Icon className="w-3 h-3" />
                    <span>{count} {PARAMETER_TYPE_LABELS[t]}</span>
                  </div>
                );
              })}
              <div className="text-[11px] ml-auto" style={{ color: "#30305a" }}>
                {parameters.length} total parameter{parameters.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        ) : (
          /* ═══════════════════════════════════════════════════
             FORMULAS TAB
             ═══════════════════════════════════════════════════ */
          <div className="flex h-full" style={{ minHeight: "calc(100vh - 72px)" }}>
            {/* ── Left Panel: Formula List ── */}
            <div
              className="w-72 flex-shrink-0 flex flex-col overflow-hidden"
              style={{ borderRight: "1px solid #1a1a32", background: "#0b0b18" }}
            >
              <div className="p-3 space-y-2" style={{ borderBottom: "1px solid #1a1a32" }}>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#35356a]" />
                  <input
                    placeholder="Search formulas..."
                    value={formulaSearch}
                    onChange={(e) => setFormulaSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg text-[12px] text-white bg-[#0d0d1a] border border-[#1e1e38] focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <button
                  onClick={newFormula}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> New Formula
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {filteredFormulas.length === 0 ? (
                  <div className="px-3 py-6 text-center text-[12px]" style={{ color: "#35356a" }}>
                    {formulaSearch ? "No match" : "No formulas yet"}
                  </div>
                ) : (
                  filteredFormulas.map((f) => {
                    const isValid = validateFormula(f.expression).valid;
                    return (
                      <button
                        key={f.id}
                        onClick={() => selectFormula(f)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-lg transition-all cursor-pointer group",
                          selectedFormulaId === f.id
                            ? "bg-indigo-500/12 border border-indigo-500/25"
                            : "hover:bg-white/[0.03] border border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full flex-shrink-0",
                            isValid ? "bg-emerald-400" : "bg-red-400"
                          )} />
                          <span className={cn(
                            "text-[12px] font-medium truncate",
                            selectedFormulaId === f.id ? "text-indigo-200" : "text-[#8080b0]"
                          )}>
                            {f.name}
                          </span>
                          {f.outputUnit && (
                            <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-[#40406a]">
                              {f.outputUnit}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-[10px] font-mono truncate" style={{ color: "#30305a" }}>
                          {f.expression}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              <div className="p-3 text-[10px]" style={{ borderTop: "1px solid #1a1a32", color: "#25254a" }}>
                {formulas.length} formula{formulas.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* ── Right Panel: Formula Editor ── */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl space-y-5">
                {/* Name & Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Formula Name *</label>
                    <input
                      value={formulaForm.name}
                      onChange={(e) => setFormulaForm({ ...formulaForm, name: e.target.value })}
                      placeholder="e.g. Pool Surface Area"
                      className={inputCls}
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className={labelCls}>Output Unit</label>
                      <input
                        value={formulaForm.outputUnit}
                        onChange={(e) => setFormulaForm({ ...formulaForm, outputUnit: e.target.value })}
                        placeholder="SF, LF, $, etc."
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Description</label>
                  <input
                    value={formulaForm.description}
                    onChange={(e) => setFormulaForm({ ...formulaForm, description: e.target.value })}
                    placeholder="What does this formula calculate?"
                    className={inputCls}
                  />
                </div>

                {/* Expression Editor */}
                <div
                  className="rounded-xl p-4 space-y-3"
                  style={{ background: "#0f0f22", border: "1px solid #1a1a32" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-[12px] font-semibold text-white">Expression</span>
                    </div>
                    {validation && (
                      <div className="flex items-center gap-1.5">
                        {validation.valid ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] text-emerald-400 font-medium">Valid</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                            <span className="text-[11px] text-red-400 font-medium">Error</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <textarea
                    ref={exprRef}
                    value={formulaForm.expression}
                    onChange={(e) => setFormulaForm({ ...formulaForm, expression: e.target.value })}
                    placeholder='e.g. if({Material} = "steel", {Square Foot} * 2.25, {Square Foot} * 1.50)'
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-lg text-[13px] text-white font-mono bg-[#0d0d1a] border border-[#1e1e38] focus:outline-none focus:border-indigo-500 transition-colors resize-y"
                    style={{ caretColor: "#6366f1", minHeight: 72 }}
                  />

                  {validation && !validation.valid && (
                    <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/8 border border-red-500/15">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-[11px] text-red-300 font-mono">{validation.error}</span>
                    </div>
                  )}

                  {/* Insert Buttons: Functions */}
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: "#30305a" }}>
                      Insert Function
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {FUNC_REFERENCE.filter((f) => !["and", "or"].includes(f.name) && !["+", "-", "*", "/", "^"].includes(f.name)).map((fn) => (
                        <button
                          key={fn.name}
                          onClick={() => insertAtCursor(fn.insert)}
                          className="px-2 py-1 rounded text-[11px] font-mono font-medium bg-indigo-500/8 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/15 transition-colors cursor-pointer"
                          title={fn.desc}
                        >
                          {fn.name}()
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Insert Buttons: Operators */}
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: "#30305a" }}>
                      Operators
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[
                        ...FUNC_REFERENCE.filter((f) => ["+", "-", "*", "/", "^"].includes(f.name)).map((f) => ({ key: f.name, label: f.name, insert: f.insert, desc: f.desc })),
                        ...COMPARISON_OPS.map((o) => ({ key: o.label, label: o.label, insert: o.insert, desc: o.desc })),
                        ...FUNC_REFERENCE.filter((f) => ["and", "or"].includes(f.name)).map((f) => ({ key: f.name, label: f.name, insert: f.insert, desc: f.desc })),
                      ].map((op) => (
                        <button
                          key={op.key}
                          onClick={() => insertAtCursor(op.insert)}
                          className="px-2 py-1 rounded text-[11px] font-mono font-medium bg-amber-500/8 text-amber-300 hover:bg-amber-500/20 border border-amber-500/15 transition-colors cursor-pointer"
                          title={op.desc}
                        >
                          {op.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Insert Buttons: Parameters */}
                  <div>
                    <div className="text-[10px] font-semibold tracking-wider uppercase mb-2" style={{ color: "#30305a" }}>
                      Parameters
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {parameters.length === 0 ? (
                        <span className="text-[11px]" style={{ color: "#30305a" }}>No parameters defined yet</span>
                      ) : (
                        parameters.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => insertAtCursor(`{${p.name}}`)}
                            className="px-2 py-1 rounded text-[11px] font-mono font-medium bg-emerald-500/8 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/15 transition-colors cursor-pointer"
                            title={`${p.description} (${PARAMETER_TYPE_LABELS[p.type]}${p.unit ? ` · ${p.unit}` : ""})`}
                          >
                            {`{${p.name}}`}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Test Panel */}
                <div
                  className="rounded-xl p-4 space-y-3"
                  style={{ background: "#0f0f22", border: "1px solid #1a1a32" }}
                >
                  <div className="flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[12px] font-semibold text-white">Live Test</span>
                    {formulaForm.expression && (
                      <span className="text-[10px] ml-1" style={{ color: "#30305a" }}>
                        (auto-evaluates as you type)
                      </span>
                    )}
                  </div>

                  {expressionParams.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {expressionParams.map((name) => {
                        const param = parameters.find((p) => p.name === name);
                        return (
                          <div key={name}>
                            <label className={labelCls}>
                              {`{${name}}`}
                              {param?.unit && <span className="ml-1 text-[#30305a]">({param.unit})</span>}
                            </label>
                            {param?.type === "picklist" ? (
                              <select
                                value={testValues[name] ?? param.defaultValue ?? ""}
                                onChange={(e) => setTestValues({ ...testValues, [name]: e.target.value })}
                                className={inputCls + " cursor-pointer"}
                              >
                                {param.options.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            ) : param?.type === "yesno" ? (
                              <select
                                value={testValues[name] ?? param.defaultValue ?? "Yes"}
                                onChange={(e) => setTestValues({ ...testValues, [name]: e.target.value })}
                                className={inputCls + " cursor-pointer"}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                            ) : (
                              <input
                                type={param?.type === "number" ? "number" : "text"}
                                value={testValues[name] ?? param?.defaultValue ?? ""}
                                onChange={(e) => setTestValues({ ...testValues, [name]: e.target.value })}
                                placeholder={param?.defaultValue || "0"}
                                className={inputCls}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Result */}
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-lg"
                    style={{ background: "#0d0d1a", border: "1px solid #1a1a32" }}
                  >
                    <span className="text-[12px] font-medium" style={{ color: "#50507a" }}>Result</span>
                    {testResult.error ? (
                      <span className="text-[13px] font-mono text-red-400">{testResult.error}</span>
                    ) : testResult.value !== null ? (
                      <span className="text-[15px] font-bold font-mono text-white">
                        {typeof testResult.value === "boolean"
                          ? testResult.value ? "TRUE" : "FALSE"
                          : typeof testResult.value === "number"
                            ? testResult.value.toLocaleString("en-US", { maximumFractionDigits: 4 })
                            : String(testResult.value)
                        }
                        {formulaForm.outputUnit && (
                          <span className="ml-1.5 text-[11px] font-normal text-[#50507a]">{formulaForm.outputUnit}</span>
                        )}
                      </span>
                    ) : (
                      <span className="text-[13px] font-mono" style={{ color: "#30305a" }}>—</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={saveFormula}
                    disabled={!formulaForm.name.trim() || !formulaForm.expression.trim()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold text-white cursor-pointer transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 16px rgba(99,102,241,0.25)" }}
                  >
                    <Save className="w-3.5 h-3.5" /> {selectedFormulaId ? "Update" : "Create"} Formula
                  </button>
                  {selectedFormulaId && (
                    <>
                      <button
                        onClick={() => {
                          const f = formulas.find((x) => x.id === selectedFormulaId);
                          if (f) duplicateFormula(f);
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-[#50507a] hover:text-white border border-[#1e1e38] hover:bg-white/[0.05] transition-colors cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Duplicate
                      </button>
                      <button
                        onClick={() => deleteFormula(selectedFormulaId)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12px] font-medium text-red-400/60 hover:text-red-400 border border-red-500/10 hover:bg-red-500/10 transition-colors cursor-pointer ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </>
                  )}
                </div>

                {/* Function Reference */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ border: "1px solid #1a1a32" }}
                >
                  <button
                    onClick={() => setShowReference(!showReference)}
                    className="w-full flex items-center justify-between px-4 py-3 transition-colors cursor-pointer hover:bg-white/[0.02]"
                    style={{ background: "#0f0f22" }}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400/60" />
                      <span className="text-[12px] font-semibold text-[#8080b0]">Function Reference</span>
                    </div>
                    {showReference
                      ? <ChevronDown className="w-3.5 h-3.5 text-[#35356a]" />
                      : <ChevronRight className="w-3.5 h-3.5 text-[#35356a]" />
                    }
                  </button>
                  {showReference && (
                    <div className="divide-y divide-[#141430]">
                      {FUNC_REFERENCE.map((fn) => (
                        <div
                          key={fn.name}
                          className="grid grid-cols-[100px_1fr_1fr] gap-3 px-4 py-2.5 hover:bg-white/[0.015] transition-colors"
                          style={{ background: "#0b0b18" }}
                        >
                          <div className="text-[12px] font-mono font-bold text-indigo-300">{fn.name}</div>
                          <div>
                            <div className="text-[11px] text-[#8080b0]">{fn.desc}</div>
                            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#40406a" }}>{fn.syntax}</div>
                          </div>
                          <div className="text-[11px] font-mono text-emerald-400/70">{fn.example}</div>
                        </div>
                      ))}
                      {/* Special syntax reference */}
                      <div className="px-4 py-3 space-y-2" style={{ background: "#0b0b18" }}>
                        <div className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "#30305a" }}>Syntax Notes</div>
                        <div className="grid grid-cols-[60px_1fr] gap-x-3 gap-y-1.5 text-[11px]">
                          <span className="font-mono text-indigo-300">{`{ }`}</span>
                          <span style={{ color: "#50507a" }}>Wrap parameter names: <span className="font-mono text-[#8080b0]">{`{Square Foot}`}</span></span>
                          <span className="font-mono text-indigo-300">{`" "`}</span>
                          <span style={{ color: "#50507a" }}>Wrap string values: <span className="font-mono text-[#8080b0]">{`"steel"`}</span></span>
                          <span className="font-mono text-indigo-300">( )</span>
                          <span style={{ color: "#50507a" }}>Order of operations: <span className="font-mono text-[#8080b0]">(12 + 6) * 2 = 36</span></span>
                          <span className="font-mono text-indigo-300">,</span>
                          <span style={{ color: "#50507a" }}>Separate function arguments</span>
                          <span className="font-mono text-indigo-300">null</span>
                          <span style={{ color: "#50507a" }}>Represents a blank/empty value</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
