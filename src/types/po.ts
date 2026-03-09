export type PoStatus = "DRAFT" | "SENT" | "ACKNOWLEDGED" | "RECEIVED" | "PARTIAL" | "COMPLETE";

export interface PoLine {
  id: string;
  purchaseOrderId: string;
  skuId: string;
  description: string;
  quantity: number;
  uom: string;
  unitCost: number;
  total: number;
  sortOrder: number;
}

export interface PurchaseOrder {
  id: string;
  estimateId: string;
  poNumber: string;
  vendorId: string;
  date: Date;
  terms?: string | null;
  status: PoStatus;
  subtotal: number;
  notes?: string | null;
  lines?: PoLine[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PoBuilderInput {
  poType: "SUPPLIER" | "SUBCONTRACTOR";
  stages: string[];
  selectedItems: string[];
  vendorOverride?: string;
}
