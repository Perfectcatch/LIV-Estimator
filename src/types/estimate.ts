export type EstimateStatus = "DRAFT" | "PROPOSED" | "APPROVED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type Division = "RETAIL" | "RESIDENTIAL" | "COMMERCIAL";
export type SelectionCategory =
  | "INTERIOR_FINISH"
  | "COPING"
  | "EQUIPMENT"
  | "SANITIZATION"
  | "AUTOMATION"
  | "HEATING"
  | "LIGHTING"
  | "SPA";

export interface Selection {
  id: string;
  estimateId: string;
  category: SelectionCategory;
  optionIndex: number;
  optionName: string;
  costDelta: number;
}

export interface Takeoff {
  id: string;
  estimateId: string;
  poolLength: number;
  poolWidth: number;
  shallowDepth: number;
  deepDepth: number;
  spaLength: number;
  spaWidth: number;
  spaDepth: number;
  poolShape: string;
  avgDepth?: number | null;
  poolSqft?: number | null;
  poolPerimeter?: number | null;
  poolGallons?: number | null;
  guniteCY?: number | null;
  excavCY?: number | null;
  haulLoads?: number | null;
  rebarSticks?: number | null;
  rebarLF?: number | null;
  plumbingLF?: number | null;
  interiorSF?: number | null;
  tileSF?: number | null;
  copingLF?: number | null;
  fenceLF?: number | null;
  spaCY?: number | null;
  pmFee?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EstimateAddon {
  id: string;
  estimateId: string;
  slotNumber: number;
  description?: string | null;
  amount: number;
}

export interface EstimateUpgrade {
  id: string;
  estimateId: string;
  category: string;
  isOptional: boolean;
  description?: string | null;
  amount: number;
}

export interface Estimate {
  id: string;
  proposalNumber: string;
  status: EstimateStatus;
  date: Date;
  customerName: string;
  address: string;
  cityCounty: string;
  state: string;
  zip: string;
  phoneCel?: string | null;
  phoneHome?: string | null;
  email?: string | null;
  projectName?: string | null;
  siltFence: boolean;
  dewatering: boolean;
  yardScrape: boolean;
  capIrrigation: boolean;
  division: Division;
  poolCount: number;
  globalMarkup: number;
  targetMargin: number;
  minMargin: number;
  roundUp: boolean;
  roundGranularity: number;
  taxRate: number;
  depositPct: number;
  shellPct: number;
  equipmentPct: number;
  finalPct: number;
  basePoolSqft?: number | null;
  raisedAboveLf?: number | null;
  depthOver5ft?: number | null;
  removeSlabSqft?: number | null;
  sunshelfSqft?: number | null;
  swimoutLf?: number | null;
  extraStepsSqft?: number | null;
  halfRoundSteps?: number | null;
  handrail48?: number | null;
  stepLadder24?: number | null;
  copingLf?: number | null;
  poolFinishSqft?: number | null;
  waterlineTileLf?: number | null;
  raisedTileBondLf?: number | null;
  tileBacksideLf?: number | null;
  stuccoRiserFace?: number | null;
  baseSpa: boolean;
  baseSpaSquft?: number | null;
  spaOverBase?: number | null;
  raisedPer6in?: number | null;
  therapyJets?: number | null;
  spillways?: number | null;
  spaHandrail48?: number | null;
  mainDeckSqft?: number | null;
  secondDeckSqft?: number | null;
  customDeck1Sqft?: number | null;
  customDeck2Sqft?: number | null;
  screenType?: string | null;
  screenColor?: string | null;
  screenRoof?: string | null;
  wallPerimeter?: number | null;
  wallHeight?: number | null;
  screenDoors?: number | null;
  estimatorName?: string | null;
  bidEndDays: number;
  takeoff?: Takeoff;
  selections?: Selection[];
  addons?: EstimateAddon[];
  upgrades?: EstimateUpgrade[];
  createdAt: Date;
  updatedAt: Date;
}
