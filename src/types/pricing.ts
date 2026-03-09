export type Division = "RETAIL" | "RESIDENTIAL" | "COMMERCIAL";

export const DIVISION_MULTIPLIERS: Record<Division, number> = {
  RETAIL: 1.0,
  RESIDENTIAL: 0.85,
  COMMERCIAL: 0.9,
};

export const VOLUME_DISCOUNTS: Array<{ minCount: number; discount: number }> = [
  { minCount: 1, discount: 0 },
  { minCount: 2, discount: 0.03 },
  { minCount: 3, discount: 0.05 },
  { minCount: 5, discount: 0.07 },
  { minCount: 10, discount: 0.1 },
];

export interface PricingSettings {
  division: Division;
  poolCount: number;
  globalMarkup: number;
  targetMargin: number;
  minMargin: number;
  roundUp: boolean;
  roundGranularity: number;
}

export interface PricingSummary {
  totalCost: number;
  totalSell: number;
  grossMargin: number;
  grossMarginPct: number;
  isAboveTarget: boolean;
  isAboveMin: boolean;
}
