// ============================================================
// FORMULA & PARAMETER TYPES
// ============================================================

export type ParameterType = "number" | "text" | "picklist" | "yesno" | "date";

export interface Parameter {
  id: string;
  name: string;
  type: ParameterType;
  defaultValue: string;
  description: string;
  options: string[];   // Picklist choices
  unit: string;        // e.g. "SF", "LF", "CY", "FT"
  createdAt: string;
  updatedAt: string;
}

export interface Formula {
  id: string;
  name: string;
  expression: string;
  description: string;
  outputUnit: string;
  createdAt: string;
  updatedAt: string;
}

export const PARAMETER_TYPE_LABELS: Record<ParameterType, string> = {
  number: "Number",
  text: "Text",
  picklist: "Picklist",
  yesno: "Yes / No",
  date: "Date",
};
