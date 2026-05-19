import type {
  CalculatorFormData,
  CalculatorResult,
  Especialidade,
  FaixaFaturamento,
  Convenio,
  ControleGlosas,
} from '@/types/calculator';

// Taxa de glosa por especialidade — Anahp/ANS 2024-2025
const TAXA_POR_ESPECIALIDADE: Record<Especialidade, number> = {
  ortopedia: 0.22,     // Alta complexidade procedimental — Anahp Q1/2025
  cardiologia: 0.20,   // Alto volume em hemodinâmica e stents
  oncologia: 0.18,     // Protocolos rígidos de oncológicos e quimio
  'clinica-geral': 0.14, // Menor complexidade procedimental
  outra: 0.17,         // Média do setor — ANS/Anahp 2024
};

// Multiplicador por operadora — histórico de auditoria agressiva
const MULTIPLICADOR_CONVENIO: Record<Convenio, number> = {
  unimed: 1.0,
  amil: 1.12,               // Histórico de negativas sistemáticas
  'bradesco-sulamerica': 1.06,
  multiplos: 0.97,          // Diversificação reduz concentração de risco
};

// Ponto médio conservador de cada faixa de faturamento
const PONTO_MEDIO_FATURAMENTO: Record<FaixaFaturamento, number> = {
  'ate-50k': 35_000,
  '50k-150k': 100_000,
  '150k-500k': 325_000,
  'acima-500k': 700_000,
};

// Taxa de recuperação já praticada com o processo atual do cliente
const RECUPERACAO_ATUAL: Record<ControleGlosas, number> = {
  nenhum: 0.02,              // Praticamente nada é contestado
  'manual-esporadico': 0.15,
  'sistema-processo': 0.35,
  'equipe-dedicada': 0.50,
};

export function calcularPerdas(data: CalculatorFormData): CalculatorResult | null {
  if (
    !data.especialidade ||
    !data.faturamento ||
    !data.convenio ||
    !data.controle
  ) {
    return null;
  }

  const faturamentoEstimado = PONTO_MEDIO_FATURAMENTO[data.faturamento];
  const taxaBase = TAXA_POR_ESPECIALIDADE[data.especialidade];
  const multiplicador = MULTIPLICADOR_CONVENIO[data.convenio];
  const taxaGlosa = taxaBase * multiplicador;

  const perdaBruta = faturamentoEstimado * taxaGlosa;
  const recuperacaoAtual = RECUPERACAO_ATUAL[data.controle];

  // Perda líquida = o que já não está sendo recuperado pelo processo atual
  const perdaMensalEstimada = Math.round(perdaBruta * (1 - recuperacaoAtual));
  const perdaAnualEstimada = perdaMensalEstimada * 12;

  // 80% das glosas são revertíveis com auditoria preditiva (ANS/Anahp)
  const valorRecuperavel = Math.round(perdaMensalEstimada * 0.80);

  return {
    faturamentoEstimado,
    taxaGlosaPercent: Math.round(taxaGlosa * 100),
    perdaMensalEstimada,
    perdaAnualEstimada,
    valorRecuperavel,
  };
}
