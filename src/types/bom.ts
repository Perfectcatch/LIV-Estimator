export type BomTier = "T0" | "T1" | "T2" | "T3";

export interface BomLine {
  id: string;
  estimateId: string;
  tier: BomTier;
  sortOrder: number;
  skuId?: string | null;
  kitId?: string | null;
  assemblyId?: string | null;
  superAssemblyId?: string | null;
  quantity?: number | null;
  unitCost?: number | null;
  extCost?: number | null;
  markupPct?: number | null;
  sellPrice?: number | null;
  parentKitId?: string | null;
  parentAssemblyId?: string | null;
  parentSuperAssemblyId?: string | null;
}

export interface BomStageSummary {
  costCode: string;
  stageName: string;
  materialCost: number;
  laborCost: number;
  equipmentCost: number;
  subcontractorCost: number;
  total: number;
  pct: number;
}

export interface BomVendorSummary {
  vendorName: string;
  itemCount: number;
  totalCost: number;
  totalSell: number;
  marginPct: number;
  pctOfTotal: number;
  terms?: string | null;
  leadDays?: number | null;
}
