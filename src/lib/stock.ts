import type { Material } from '../types/stock'

export const CRITICAL_STOCK_THRESHOLD = 5

export function isCriticalStock(material: Material): boolean {
  return material.amount < CRITICAL_STOCK_THRESHOLD
}
