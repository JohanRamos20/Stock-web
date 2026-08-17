export interface StockItem {
  id: number
  codigo: string
  nome: string
  categoria: string
  local: string
  qtd: number
  min: number
  un: string
}

export const CATEGORIAS = ['Expediente', 'Informática', 'Limpeza', 'Laboratório', 'Mobiliário', 'Elétrica'] as const

export const LOCAIS = [
  'Prateleira A-1',
  'Prateleira A-2',
  'Prateleira A-3',
  'Prateleira A-4',
  'Armário C-1',
  'Armário C-2',
  'Armário C-4',
  'Depósito B',
  'Sala L-2',
] as const

export const UNIDADES = ['un', 'caixa', 'pacote', 'resma', 'frasco', 'galão', 'par'] as const

/**
 * Catálogo de exemplo extraído de data/modelo-de-dados.md do design handoff.
 * Servem apenas para validar a tela de Registro de itens (sem backend próprio).
 */
export const mockItems: StockItem[] = [
  { id: 1, codigo: 'MA-0142', nome: 'Papel A4 75g (resma)', categoria: 'Expediente', local: 'Prateleira A-1', qtd: 184, min: 80, un: 'resma' },
  { id: 2, codigo: 'MA-0187', nome: 'Caneta esferográfica azul', categoria: 'Expediente', local: 'Prateleira A-2', qtd: 640, min: 200, un: 'un' },
  { id: 3, codigo: 'MA-0203', nome: 'Toner HP 26A preto', categoria: 'Informática', local: 'Armário C-4', qtd: 6, min: 12, un: 'un' },
  { id: 4, codigo: 'MA-0219', nome: 'Cabo HDMI 2m', categoria: 'Informática', local: 'Armário C-1', qtd: 23, min: 10, un: 'un' },
  { id: 5, codigo: 'MA-0244', nome: 'Álcool 70% 1L', categoria: 'Limpeza', local: 'Depósito B', qtd: 41, min: 30, un: 'frasco' },
  { id: 6, codigo: 'MA-0251', nome: 'Papel toalha interfolhado', categoria: 'Limpeza', local: 'Depósito B', qtd: 18, min: 40, un: 'pacote' },
  { id: 7, codigo: 'MA-0268', nome: 'Luva nitrílica M (caixa)', categoria: 'Laboratório', local: 'Depósito B', qtd: 9, min: 15, un: 'caixa' },
  { id: 8, codigo: 'MA-0290', nome: 'Pasta suspensa kraft', categoria: 'Expediente', local: 'Prateleira A-3', qtd: 212, min: 60, un: 'un' },
  { id: 9, codigo: 'MA-0311', nome: 'Pilha alcalina AA (par)', categoria: 'Informática', local: 'Armário C-2', qtd: 74, min: 24, un: 'par' },
  { id: 10, codigo: 'MA-0330', nome: 'Béquer vidro 250ml', categoria: 'Laboratório', local: 'Sala L-2', qtd: 32, min: 20, un: 'un' },
  { id: 11, codigo: 'MA-0348', nome: 'Grampeador metálico 26/6', categoria: 'Expediente', local: 'Prateleira A-4', qtd: 11, min: 8, un: 'un' },
  { id: 12, codigo: 'MA-0362', nome: 'Detergente neutro 5L', categoria: 'Limpeza', local: 'Depósito B', qtd: 7, min: 10, un: 'galão' },
]
