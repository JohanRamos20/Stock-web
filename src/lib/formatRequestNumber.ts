export function formatRequestNumber(numero: number | string | null | undefined): string {
  const value = String(numero ?? '')
  return /^\d+$/.test(value) ? value.padStart(4, '0') : '----'
}
