export interface Vendor {
  id: string;
  name: string;
  category: "SUPPLIER" | "SUBCONTRACTOR";
  terms?: string | null;
  leadDays?: number | null;
  phone?: string | null;
  email?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CostCode {
  id: string;
  code: string;
  stageName: string;
  costType: string;
  stageNum: number;
  jtCode: number;
  jtId?: string | null;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sku {
  id: string;
  code: string;
  name: string;
  costType: "MATERIALS" | "LABOR" | "EQUIPMENT" | "OVERHEAD" | "SUBCONTRACTOR" | "EXPENSE" | "OTHER";
  category: string;
  detail?: string | null;
  vendorId: string;
  vendor?: Vendor;
  uom: string;
  unitCost: number;
  markupPct: number;
  costCodeId: string;
  costCode?: CostCode;
  stage: string;
  fixedVar: "FIXED" | "VARIABLE";
  defaultQty?: number | null;
  formulaRef?: string | null;
  notes?: string | null;
  altVendor1?: string | null;
  altCost1?: number | null;
  altVendor2?: string | null;
  altCost2?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface KitSku {
  id: string;
  kitId: string;
  skuId: string;
  sku?: Sku;
  sortOrder: number;
}

export interface Kit {
  id: string;
  code: string;
  name: string;
  vendorLabel: string;
  notes?: string | null;
  kitSkus?: KitSku[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AssemblyKit {
  id: string;
  assemblyId: string;
  kitId: string;
  kit?: Kit;
  sortOrder: number;
}

export interface Assembly {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  assemblyKits?: AssemblyKit[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SuperAssemblyAssembly {
  id: string;
  superAssemblyId: string;
  assemblyId: string;
  assembly?: Assembly;
  sortOrder: number;
}

export interface SuperAssembly {
  id: string;
  code: string;
  name: string;
  costCodeId?: string | null;
  costCode?: CostCode;
  description?: string | null;
  superAssemblyAssemblies?: SuperAssemblyAssembly[];
  createdAt: Date;
  updatedAt: Date;
}
