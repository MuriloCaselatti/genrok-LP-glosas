import type {
  CalculatorFormData,
  CalculationResult,
  FaturamentoRange,
  Especialidade,
  Operadora,
  UltimaAuditoria,
} from '@/types/calculator'

// ============================================================
// TABELAS DE REFERÊNCIA
// Fonte: Observatório Anahp + ANS Q1/2025 + Medicina S/A
// ============================================================

const FATURAMENTO_MIDPOINT: Record<FaturamentoRange, number> = {
  'ate80k': 50_000,
  '80k-200k': 130_000,
  '200k-500k': 320_000,
  'acima500k': 700_000,
}

export const FATURAMENTO_LABELS: Record<FaturamentoRange, string> = {
  'ate80k': 'Até R$ 80.000/mês',
  '80k-200k': 'R$ 80.001 a R$ 200.000/mês',
  '200k-500k': 'R$ 200.001 a R$ 500.000/mês',
  'acima500k': 'Acima de R$ 500.000/mês',
}

// Anahp 2024 · Medicina S/A · IESS
const TAXA_GLOSA_ESPECIALIDADE: Record<Especialidade, number> = {
  ortopedia: 0.18,     // Maior volume OPME — maior taxa
  cirurgia: 0.17,      // Centro cirúrgico — alto volume de guias
  cardiologia: 0.15,   // Média histórica
  oncologia: 0.16,     // OPME + quimio = glosa frequente
  oftalmologia: 0.14,  // Procedimentos mais padronizados
  outra: 0.13,         // Conservador para especialidades não mapeadas
}

export const ESPECIALIDADE_LABELS: Record<Especialidade, string> = {
  ortopedia: 'Ortopedia / Traumatologia',
  cirurgia: 'Cirurgia Geral / Centro Cirúrgico',
  cardiologia: 'Cardiologia',
  oncologia: 'Oncologia',
  oftalmologia: 'Oftalmologia',
  outra: 'Outra especialidade',
}

// Rankings de glosa por operadora — Hapvida/Unimed mais agressivas
const MULTIPLICADOR_OPERADORA: Record<Operadora, number> = {
  hapvida: 1.15,
  unimed: 1.05,
  amil: 1.00,
  sulamerica: 0.95,
  outra: 1.00,
}

export const OPERADORA_LABELS: Record<Operadora, string> = {
  hapvida: 'Hapvida / NotreDame',
  unimed: 'Unimed',
  amil: 'Amil',
  sulamerica: 'SulAmérica / Bradesco',
  outra: 'Outra operadora',
}

// Mais tempo sem auditoria = glosas acumuladas não contestadas
const MULTIPLICADOR_AUDITORIA: Record<UltimaAuditoria, number> = {
  nunca: 1.25,
  mais1ano: 1.15,
  entre6e12: 1.05,
  regular: 0.85,
}

export const AUDITORIA_LABELS: Record<UltimaAuditoria, string> = {
  nunca: 'Nunca realizei uma auditoria',
  mais1ano: 'Há mais de 1 ano',
  entre6e12: 'Entre 6 e 12 meses',
  regular: 'Realizo regularmente',
}

// ============================================================
// FUNÇÃO PRINCIPAL — pure function, sem side effects
// ============================================================
export function calcularPerdas(formData: CalculatorFormData): CalculationResult | null {
  const { faturamento, especialidade, operadora, ultimaAuditoria } = formData

  if (!faturamento || !especialidade || !operadora || !ultimaAuditoria) {
    return null
  }

  const faturamentoBase = FATURAMENTO_MIDPOINT[faturamento]
  const taxaGlosa = TAXA_GLOSA_ESPECIALIDADE[especialidade]
  const multOperadora = MULTIPLICADOR_OPERADORA[operadora]
  const multAuditoria = MULTIPLICADOR_AUDITORIA[ultimaAuditoria]

  const taxaGlosaAplicada = taxaGlosa * multOperadora * multAuditoria
  const perdaMensalBruta = faturamentoBase * taxaGlosaAplicada

  // 80% das glosas são revertíveis — ANS/Anahp
  const recuperavelMensal = perdaMensalBruta * 0.80
  const recuperavelAnual = recuperavelMensal * 12
  const recuperavel3Anos = recuperavelMensal * 36
  const recuperavel5Anos = recuperavelMensal * 60

  // Médico paga tributo sobre receita não recebida — lucro presumido PJ
  const choqueFiscal = perdaMensalBruta * 0.28

  return {
    perdaMensalBruta,
    recuperavelMensal,
    recuperavelAnual,
    recuperavel3Anos,
    recuperavel5Anos,
    choqueFiscal,
    taxaGlosaAplicada,
    faixaFaturamento: FATURAMENTO_LABELS[faturamento],
    especialidadeLabel: ESPECIALIDADE_LABELS[especialidade],
    operadoraLabel: OPERADORA_LABELS[operadora],
    ultimaAuditoriaLabel: AUDITORIA_LABELS[ultimaAuditoria],
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}
