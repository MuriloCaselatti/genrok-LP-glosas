export type Especialidade =
  | 'ortopedia'
  | 'cardiologia'
  | 'oncologia'
  | 'clinica-geral'
  | 'outra';

export type FaixaFaturamento =
  | 'ate-50k'
  | '50k-150k'
  | '150k-500k'
  | 'acima-500k';

export type Convenio =
  | 'unimed'
  | 'amil'
  | 'bradesco-sulamerica'
  | 'multiplos';

export type ControleGlosas =
  | 'nenhum'
  | 'manual-esporadico'
  | 'sistema-processo'
  | 'equipe-dedicada';

export interface CalculatorFormData {
  especialidade: Especialidade | null;
  faturamento: FaixaFaturamento | null;
  convenio: Convenio | null;
  controle: ControleGlosas | null;
}

export interface CalculatorResult {
  faturamentoEstimado: number;
  taxaGlosaPercent: number;
  perdaMensalEstimada: number;
  perdaAnualEstimada: number;
  valorRecuperavel: number;
}
