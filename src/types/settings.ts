export interface AppSettings {
  id: string;
  companyName: string;
  cityStateZip: string;
  license: string;
  phone: string;
  email: string;
  defaultMarkup: number;
  taxRate: number;
  depositPct: number;
  shellPct: number;
  equipmentPct: number;
  finalPct: number;
  targetMargin: number;
  minMargin: number;
  roundUp: boolean;
  roundGranularity: number;
  updatedAt: Date;
}
