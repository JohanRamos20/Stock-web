import type { Material } from '../types/stock'

/** Catálogo de exemplo pra validar a tela de solicitação de materiais (sem backend próprio ainda). */
export const mockMaterials: Material[] = [
  { id: 'mock-1', name: 'Papel A4 75g (resma)', category: 'CONSUMIVEL', location: 'Prateleira A-1', amount: 184, unitType: 'BOX', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-2', name: 'Caneta esferográfica azul', category: 'CONSUMIVEL', location: 'Prateleira A-2', amount: 640, unitType: 'UNITY', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-3', name: 'Toner HP 26A preto', category: 'CONSUMIVEL', location: 'Armário C-4', amount: 6, unitType: 'UNITY', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-4', name: 'Cabo HDMI 2m', category: 'FERRAMENTA', location: 'Armário C-1', amount: 23, unitType: 'UNITY', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-5', name: 'Álcool 70% 1L', category: 'CONSUMIVEL', location: 'Depósito B', amount: 41, unitType: 'UNITY', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-6', name: 'Luva nitrílica M (caixa)', category: 'EPI', location: 'Depósito B', amount: 9, unitType: 'BOX', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-7', name: 'Grampeador metálico 26/6', category: 'FERRAMENTA', location: 'Prateleira A-4', amount: 11, unitType: 'UNITY', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
  { id: 'mock-8', name: 'Detergente neutro 5L', category: 'CONSUMIVEL', location: 'Depósito B', amount: 7, unitType: 'UNITY', createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' },
]
