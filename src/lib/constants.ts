// Selection categories matching the 8 dropdown groups
export const SELECTION_CATEGORIES = [
  'INTERIOR_FINISH',
  'COPING',
  'EQUIPMENT',
  'SANITIZATION',
  'AUTOMATION',
  'HEATING',
  'LIGHTING',
  'SPA',
] as const

// Estimate status lifecycle
export const ESTIMATE_STATUSES = [
  'DRAFT',
  'PROPOSED',
  'APPROVED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const

// Construction stages for PO builder
export const CONSTRUCTION_STAGES = [
  { num: 1, name: 'Pre-Construction' },
  { num: 2, name: 'Excavation' },
  { num: 3, name: 'Steel & Rebar' },
  { num: 4, name: 'Plumbing' },
  { num: 5, name: 'Electrical' },
  { num: 6, name: 'Shotcrete Shell' },
  { num: 7, name: 'Tile & Coping' },
  { num: 8, name: 'Equipment Set' },
  { num: 9, name: 'Interior Finish' },
  { num: 10, name: 'Startup & Closeout' },
] as const

// Company defaults
export const COMPANY = {
  name: 'LIV Pools LLC',
  license: 'CPC1459998',
  phone: '(727) 555-0100',
  email: 'info@livpools.com',
  cityStateZip: 'Clearwater, FL 34619',
} as const
