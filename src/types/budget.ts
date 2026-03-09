export type StageStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETE" | "ON_HOLD";
export type ChangeOrderStatus = "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
export type AddRemove = "ADD" | "REMOVE";

export interface BudgetLine {
  id: string;
  estimateId: string;
  costCodeId: string;
  estimated: number;
  committed: number;
  actual: number;
  notes?: string | null;
}

export interface CostTracking {
  costCode: string;
  stageName: string;
  estimated: number;
  actual: number;
  varianceDollar: number;
  variancePct: number;
  notes?: string | null;
}

export interface JobStage {
  id: string;
  estimateId: string;
  costCodeId: string;
  status: StageStatus;
  startDate?: Date | null;
  endDate?: Date | null;
  durationDays?: number | null;
  notes?: string | null;
}

export interface Payment {
  id: string;
  estimateId: string;
  milestoneNum: number;
  milestoneName: string;
  percentage: number;
  amountDue: number;
  datePaid?: Date | null;
  amountPaid: number;
}

export interface ChangeOrderLine {
  id: string;
  changeOrderId: string;
  description: string;
  addRemove: AddRemove;
  amount: number;
}

export interface ChangeOrder {
  id: string;
  estimateId: string;
  coNumber: number;
  date: Date;
  reason?: string | null;
  totalDelta: number;
  status: ChangeOrderStatus;
  lines?: ChangeOrderLine[];
}
