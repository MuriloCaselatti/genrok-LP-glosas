export type FaturamentoRange =
  | 'ate80k'
  | '80k-200k'
  | '200k-500k'
  | 'acima500k'

export type Especialidade =
  | 'ortopedia'
  | 'cirurgia'
  | 'cardiologia'
  | 'oncologia'
  | 'oftalmologia'
  | 'outra'

export type Operadora =
  | 'unimed'
  | 'hapvida'
  | 'amil'
  | 'sulamerica'
  | 'outra'

export type UltimaAuditoria =
  | 'nunca'
  | 'mais1ano'
  | 'entre6e12'
  | 'regular'

export interface CalculatorFormData {
  faturamento: FaturamentoRange | null
  especialidade: Especialidade | null
  operadora: Operadora | null
  ultimaAuditoria: UltimaAuditoria | null
}

export interface CalculationResult {
  perdaMensalBruta: number
  recuperavelMensal: number
  recuperavelAnual: number
  recuperavel3Anos: number
  recuperavel5Anos: number
  choqueFiscal: number
  taxaGlosaAplicada: number
  faixaFaturamento: string
  especialidadeLabel: string
  operadoraLabel: string
  ultimaAuditoriaLabel: string
}

export interface CalculatorState {
  currentStep: number
  formData: CalculatorFormData
  isCalculating: boolean
  result: CalculationResult | null
  showBridge: boolean
}
