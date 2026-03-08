import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function generateProposalNumber(): string {
  const now = new Date()
  const yy = now.getFullYear().toString().slice(-2)
  const mm = (now.getMonth() + 1).toString().padStart(2, '0')
  const seq = '0001' // TODO: query DB for next sequence
  return `Q${yy}${mm}${seq}`
}
