import type { MaterialUnitType } from '../types/stock'

const UNIT_ABBREVIATIONS: Record<MaterialUnitType, string> = {
  UNITY: 'Un',
  BOX: 'Cx',
}

export function formatUnit(unit: string): string {
  return UNIT_ABBREVIATIONS[unit as MaterialUnitType] ?? unit
}
