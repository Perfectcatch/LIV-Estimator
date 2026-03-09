import type { BomLine, TakeoffResults } from "@/types/schema";
import { resolveQuantity, calcExtCost, calcSellPrice, calculatePMFee } from "./formulas";

export interface SkuRecord {
  id: string;
  code: string;
  name: string;
  vendorName: string;
  costCodeCode: string;
  stageName: string;
  uom: string;
  unitCost: number;
  markupPct: number;
  fixedVar: "FIXED" | "VARIABLE";
  defaultQty: number;
  formulaRef: string | null;
}

export interface KitRecord {
  id: string;
  code: string;
  name: string;
  skus: Array<{ sku: SkuRecord; quantity: number }>;
}

export interface AssemblyRecord {
  id: string;
  code: string;
  name: string;
  division: string | null;
  kits: Array<{ kit: KitRecord; quantity: number }>;
}

export interface SuperAssemblyRecord {
  id: string;
  code: string;
  name: string;
  assemblies: Array<{ assembly: AssemblyRecord; quantity: number }>;
}

export function explodeBom(
  superAssemblies: SuperAssemblyRecord[],
  takeoff: TakeoffResults,
  selections: Record<string, number>
): BomLine[] {
  const lines: BomLine[] = [];

  for (const sa of superAssemblies) {
    for (const { assembly, quantity: saQty } of sa.assemblies) {
      for (const { kit, quantity: aQty } of assembly.kits) {
        for (const { sku, quantity: kQty } of kit.skus) {
          const baseQty = resolveQuantity(
            sku.fixedVar,
            sku.defaultQty,
            sku.formulaRef,
            takeoff
          );

          const quantity = baseQty * kQty * aQty * saQty;
          if (quantity <= 0) continue;

          const extCost = calcExtCost(sku.unitCost, quantity);
          const sellPrice = calcSellPrice(extCost, sku.markupPct);

          lines.push({
            skuId: sku.id,
            skuCode: sku.code,
            skuName: sku.name,
            vendorName: sku.vendorName,
            costCodeCode: sku.costCodeCode,
            stageName: sku.stageName,
            uom: sku.uom,
            quantity,
            unitCost: sku.unitCost,
            extCost,
            markupPct: sku.markupPct,
            sellPrice,
            fixedVar: sku.fixedVar,
            tier: "SKU",
            kitName: kit.name,
            assemblyName: assembly.name,
            superAssemblyName: sa.name,
          });
        }
      }
    }
  }

  // Add PM Fee line
  const nonOverheadTotal = lines
    .filter((l) => !l.skuCode.startsWith("SKU-OVH"))
    .reduce((sum, l) => sum + l.extCost, 0);

  const pmFee = calculatePMFee(nonOverheadTotal);
  if (pmFee > 0) {
    lines.push({
      skuId: "ovh-001",
      skuCode: "SKU-OVH-001",
      skuName: "Project Management Fee (8%)",
      vendorName: "In-House",
      costCodeCode: "01-PREP",
      stageName: "Permitting & Inspections",
      uom: "LS",
      quantity: 1,
      unitCost: pmFee,
      extCost: pmFee,
      markupPct: 0.60,
      sellPrice: calcSellPrice(pmFee, 0.60),
      fixedVar: "FIXED",
      tier: "SKU",
    });
  }

  return lines;
}

export function groupBomByStage(lines: BomLine[]): Record<string, BomLine[]> {
  return lines.reduce<Record<string, BomLine[]>>((acc, line) => {
    const key = line.stageName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(line);
    return acc;
  }, {});
}

export function groupBomByVendor(lines: BomLine[]): Record<string, BomLine[]> {
  return lines.reduce<Record<string, BomLine[]>>((acc, line) => {
    const key = line.vendorName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(line);
    return acc;
  }, {});
}

export function calcBomTotals(lines: BomLine[]) {
  const totalCost = lines.reduce((s, l) => s + l.extCost, 0);
  const totalSell = lines.reduce((s, l) => s + l.sellPrice, 0);
  const margin = totalSell > 0 ? (totalSell - totalCost) / totalSell : 0;
  return { totalCost, totalSell, margin };
}
