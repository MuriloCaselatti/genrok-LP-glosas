'use client';

import { useCalculator } from '@/hooks/useCalculator';
import ProgressBar from '@/components/ui/ProgressBar';
import RadioCard from '@/components/ui/RadioCard';
import type { CalculatorFormData } from '@/types/calculator';

type StepConfig = {
  title: string;
  field: keyof CalculatorFormData;
  options: { value: string; label: string; description: string }[];
};

const STEPS: StepConfig[] = [
  {
    title: 'Qual é a especialidade da sua clínica?',
    field: 'especialidade',
    options: [
      { value: 'ortopedia', label: 'Ortopedia / Traumatologia', description: 'Cirurgias, procedimentos e implantes ortopédicos' },
      { value: 'cardiologia', label: 'Cardiologia / Hemodinâmica', description: 'Cateterismo, stents, exames especializados' },
      { value: 'oncologia', label: 'Oncologia', description: 'Quimioterapia, imunoterapia, protocolos oncológicos' },
      { value: 'clinica-geral', label: 'Clínica Geral / Medicina Interna', description: 'Consultas, exames de rotina, internações' },
      { value: 'outra', label: 'Outra especialidade', description: 'Ginecologia, pediatria, neurologia, etc.' },
    ],
  },
  {
    title: 'Qual é o faturamento mensal com convênios?',
    field: 'faturamento',
    options: [
      { value: 'ate-50k', label: 'Até R$ 50.000 / mês', description: 'Clínica de menor porte' },
      { value: '50k-150k', label: 'R$ 50.000 a R$ 150.000 / mês', description: 'Clínica de médio porte' },
      { value: '150k-500k', label: 'R$ 150.000 a R$ 500.000 / mês', description: 'Clínica de grande porte' },
      { value: 'acima-500k', label: 'Acima de R$ 500.000 / mês', description: 'Hospital ou grupo médico' },
    ],
  },
  {
    title: 'Qual é o seu principal convênio?',
    field: 'convenio',
    options: [
      { value: 'unimed', label: 'Unimed', description: 'Qualquer cooperativa Unimed' },
      { value: 'amil', label: 'Amil / Medial / UnitedHealth', description: 'Grupo UnitedHealth no Brasil' },
      { value: 'bradesco-sulamerica', label: 'Bradesco Saúde / SulAmérica', description: 'Grupos Bradesco e SulAmérica' },
      { value: 'multiplos', label: 'Múltiplos convênios / Outro', description: 'Carteira diversificada ou outro operador' },
    ],
  },
  {
    title: 'Como você controla suas glosas hoje?',
    field: 'controle',
    options: [
      { value: 'nenhum', label: 'Não controlo / Não tenho processo', description: 'Sem acompanhamento sistemático' },
      { value: 'manual-esporadico', label: 'Revisão manual esporádica', description: 'Quando há tempo disponível' },
      { value: 'sistema-processo', label: 'Tenho sistema ou processo definido', description: 'Acompanhamento regular' },
      { value: 'equipe-dedicada', label: 'Equipe dedicada ao faturamento', description: 'Profissionais exclusivos para glosas' },
    ],
  },
];

export default function Calculator() {
  const { step, totalSteps, form, isComplete, canAdvance, setField, next, back } =
    useCalculator();

  const currentStep = STEPS[step - 1];
  const isLastStep = step === totalSteps;
  const currentValue = form[currentStep.field];

  if (isComplete) {
    return (
      <section id="calculadora" className="bg-[#F4F7FA] py-16 md:py-20 px-5 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 mb-6">
            <span className="text-teal text-3xl">✓</span>
          </div>
          <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-3">
            Calculando suas perdas...
          </h2>
          <p className="font-body text-[#8C9BAB] text-base">
            Seu diagnóstico está sendo preparado logo abaixo.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="calculadora" className="bg-[#F4F7FA] py-16 md:py-20 px-5 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-3">
            Calcule Suas Perdas Agora
          </h2>
          <p className="font-body text-[#8C9BAB] text-base">
            4 perguntas · Resultado imediato · Gratuito
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8EDF2] shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-6 md:p-8">
          <div className="mb-8">
            <ProgressBar current={step} total={totalSteps} />
          </div>

          <h3 className="font-display font-semibold text-navy text-lg md:text-xl mb-6">
            {currentStep.title}
          </h3>

          <div
            role="radiogroup"
            aria-label={currentStep.title}
            className="space-y-3 mb-8"
          >
            {currentStep.options.map((opt) => (
              <RadioCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                value={opt.value}
                selected={currentValue === opt.value}
                onChange={(val) => setField(currentStep.field, val)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={back}
                className="font-body font-medium text-[#8C9BAB] hover:text-navy transition-colors text-sm px-4 py-2"
              >
                ← Voltar
              </button>
            ) : (
              <div aria-hidden="true" />
            )}
            <button
              type="button"
              onClick={next}
              disabled={!canAdvance}
              aria-disabled={!canAdvance}
              className={[
                'font-display font-semibold text-white px-6 py-3 rounded-lg transition-all duration-200 text-base',
                canAdvance
                  ? 'bg-teal hover:bg-teal-dark hover:scale-[1.02]'
                  : 'bg-[#8C9BAB] cursor-not-allowed opacity-60',
              ].join(' ')}
            >
              {isLastStep ? 'Calcular Minhas Perdas →' : 'Próximo →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
