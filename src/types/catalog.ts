export interface Sku {
  id: string
  code: string
  name: string
  costType: 'MATERIALS' | 'LABOR' | 'EQUIPMENT' | 'OVERHEAD'
  category: string
  detail?: string
  vendorId: string
  uom: string
  unitCost: number
  markupPct: number
  costCodeId: string
  stage: string
  fixedVar: 'FIXED' | 'VARIABLE'
  defaultQty?: number
  formulaRef?: string
  notes?: string
}

export interface Kit {
  id: string
  code: string
  name: string
  vendorLabel: string
  skus: Sku[]
}

export interface Assembly {
  id: string
  code: string
  name: string
  description?: string
  kits: Kit[]
}

export interface SuperAssembly {
  id: string
  code: string
  name: string
  assemblies: Assembly[]
}
