import type { TakeoffInputs, TakeoffResults } from "@/types/database";

export function calculateTakeoff(inputs: TakeoffInputs): TakeoffResults {
  const {
    poolLength,
    poolWidth,
    shallowDepth,
    deepDepth,
    spaSelection,
    spaLength,
    spaWidth,
    spaDepth,
  } = inputs;

  const avgDepth = (shallowDepth + deepDepth) / 2;
  const poolSqFt = poolLength * poolWidth;
  const poolPerimeter = 2 * (poolLength + poolWidth);
  const poolGallons = poolLength * poolWidth * avgDepth * 7.48;
  const guniteCY = ((poolPerimeter * avgDepth * 0.5) + (poolSqFt * (4 / 12))) / 27;
  const excavCY = ((poolLength + 6) * (poolWidth + 6) * (avgDepth + 2)) / 27;
  const haulLoads = Math.ceil(excavCY / 14);
  const rebarSticks = Math.ceil(poolWidth / 2.5) + 1 + Math.ceil(poolLength / 2.5) + 1;
  const rebarLF = rebarSticks * 20;
  const plumbingLF = poolPerimeter * 1.5;
  const spaExists = spaSelection > 0;
  const interiorSF = poolSqFt + (spaExists ? spaLength * spaWidth : 0);
  const tileSF = poolPerimeter * 1;
  const copingLF = poolPerimeter + (spaExists ? 2 * (spaLength + spaWidth) : 0);
  const fenceLF = poolPerimeter * 1.2;
  const spaCY = spaExists
    ? ((2 * (spaLength + spaWidth) * spaDepth * 0.5) + (spaLength * spaWidth * (4 / 12))) / 27
    : 0;

  return {
    avgDepth,
    poolSqFt,
    poolPerimeter,
    poolGallons,
    guniteCY,
    excavCY,
    haulLoads,
    rebarSticks,
    rebarLF,
    plumbingLF,
    spaExists,
    interiorSF,
    tileSF,
    copingLF,
    fenceLF,
    spaCY,
  };
}

export function calculatePMFee(bomNonOverheadTotal: number): number {
  return bomNonOverheadTotal * 0.08;
}

export function calcExtCost(unitCost: number, quantity: number): number {
  return unitCost * quantity;
}

export function calcSellPrice(extCost: number, markupPct: number): number {
  return extCost / (1 - markupPct);
}

export function resolveQuantity(
  fixedVar: "FIXED" | "VARIABLE",
  defaultQty: number,
  formulaRef: string | null,
  takeoff: TakeoffResults
): number {
  if (fixedVar === "FIXED") return defaultQty;
  if (!formulaRef) return defaultQty;

  const map: Record<string, number> = {
    CALC_FenceLF:      takeoff.fenceLF,
    CALC_ExcavCY:      takeoff.excavCY,
    CALC_HaulLoads:    takeoff.haulLoads,
    CALC_RebarSticks:  takeoff.rebarSticks,
    CALC_RebarLF:      takeoff.rebarLF,
    CALC_GuniteCY:     takeoff.guniteCY,
    CALC_PlumbingLF:   takeoff.plumbingLF,
    CALC_SpaCY:        takeoff.spaCY,
    CALC_TileSF:       takeoff.tileSF,
    CALC_CopingLF:     takeoff.copingLF,
    CALC_InteriorSF:   takeoff.interiorSF,
    POOL_SqFt:         takeoff.poolSqFt,
    POOL_Perimeter:    takeoff.poolPerimeter,
    POOL_AvgDepth:     takeoff.avgDepth,
    CALC_PoolGallons:  takeoff.poolGallons,
  };

  return map[formulaRef] ?? defaultQty;
}
