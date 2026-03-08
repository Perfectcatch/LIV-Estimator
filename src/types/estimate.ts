export interface Estimate {
  id: string
  proposalNumber: string
  status: string
  customerName: string
  address: string
  cityCounty: string
  state: string
  zip: string
  phoneCel?: string
  email?: string
  projectName?: string
  division: 'RETAIL' | 'RESIDENTIAL' | 'COMMERCIAL'
  globalMarkup: number
  targetMargin: number
  taxRate: number
  createdAt: string
  updatedAt: string
}

export interface Selection {
  id: string
  estimateId: string
  category: string
  optionIndex: number
  optionName: string
  costDelta: number
}

export interface Takeoff {
  id: string
  estimateId: string
  poolLength: number
  poolWidth: number
  shallowDepth: number
  deepDepth: number
  spaLength: number
  spaWidth: number
  spaDepth: number
  // Calculated
  avgDepth?: number
  poolSqft?: number
  poolPerimeter?: number
  poolGallons?: number
  guniteCY?: number
  excavCY?: number
  haulLoads?: number
  rebarSticks?: number
  plumbingLF?: number
}
