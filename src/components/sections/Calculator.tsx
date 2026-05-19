'use client'

import { useCallback } from 'react'
import { useCalculator } from '@/hooks/useCalculator'
import ProgressBar from '@/components/ui/ProgressBar'
import RadioCard from '@/components/ui/RadioCard'
import type { CalculatorFormData } from '@/types/calculator'

type StepOption = {
  value: string
  label: string
  sublabel?: string
}

type StepConfig = {
  field: keyof CalculatorFormData
  question: string
  microcopy: string
  options: StepOption[]
}

const STEPS: StepConfig[] = [
  {
    field: 'faturamento',
    question: 'Qual é o faturamento mensal da sua clínica com convênios?',
    microcopy: 'Use uma estimativa — o cálculo ajusta automaticamente',
    options: [
      { value: 'ate80k',    label: 'Até R$ 80.000/mês' },
      { value: '80k-200k',  label: 'R$ 80.001 a R$ 200.000/mês' },
      { value: '200k-500k', label: 'R$ 200.001 a R$ 500.000/mês' },
      { value: 'acima500k', label: 'Acima de R$ 500.000/mês' },
    ],
  },
  {
    field: 'especialidade',
    question: 'Qual é a sua principal especialidade médica?',
    microcopy: 'Especialidades cirúrgicas têm as maiores taxas de glosa',
    options: [
      { value: 'ortopedia',   label: 'Ortopedia / Traumatologia' },
      { value: 'cirurgia',    label: 'Cirurgia Geral / Centro Cirúrgico' },
      { value: 'cardiologia', label: 'Cardiologia' },
      { value: 'oncologia',   label: 'Oncologia' },
      { value: 'oftalmologia',label: 'Oftalmologia' },
      { value: 'outra',       label: 'Outra especialidade' },
    ],
  },
  {
    field: 'operadora',
    question: 'Qual é o principal convênio da sua clínica?',
    microcopy: 'Algumas operadoras têm taxas de glosa até 3× maiores que a média',
    options: [
      { value: 'hapvida',    label: 'Hapvida / NotreDame' },
      { value: 'unimed',     label: 'Unimed' },
      { value: 'amil',       label: 'Amil' },
      { value: 'sulamerica', label: 'SulAmérica / Bradesco' },
      { value: 'outra',      label: 'Outra operadora' },
    ],
  },
  {
    field: 'ultimaAuditoria',
    question: 'Há quanto tempo não realiza uma auditoria formal de glosas?',
    microcopy: 'Esse dado é determinante — quanto mais tempo, maior a perda acumulada',
    options: [
      { value: 'nunca',      label: 'Nunca realizei uma auditoria',  sublabel: 'Situação de risco máximo' },
      { value: 'mais1ano',   label: 'Há mais de 1 ano',              sublabel: 'Glosas acumuladas sem recurso' },
      { value: 'entre6e12',  label: 'Entre 6 e 12 meses',            sublabel: 'Auditoria desatualizada' },
      { value: 'regular',    label: 'Realizo regularmente',           sublabel: 'Boa prática — mas perdas ainda ocorrem' },
    ],
  },
]

function LoadingState() {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal/10 mb-6 animate-spin">
        <span className="text-2xl" role="img" aria-label="Calculando">🧮</span>
      </div>
      <h3 className="font-display font-bold text-navy text-xl mb-2">
        Calculando suas perdas...
      </h3>
      <p className="font-body text-[#8C9BAB] text-sm mb-8">
        Cruzando dados com benchmarks Anahp/ANS 2025
      </p>
      <div className="max-w-xs mx-auto h-1.5 bg-[#E8EDF2] rounded-full overflow-hidden">
        <div className="animate-loading-bar h-full bg-teal rounded-full" />
      </div>
    </div>
  )
}

export default function Calculator() {
  const { state, updateField, nextStep, prevStep, executarCalculo, canAdvance } =
    useCalculator()

  const { currentStep, formData, isCalculating, showBridge } = state

  const handleNext = useCallback(() => {
    if (currentStep < 4) {
      nextStep()
    } else {
      executarCalculo()
    }
  }, [currentStep, nextStep, executarCalculo])

  // Bridge section placeholder — implementada na Etapa 4
  if (showBridge) return null

  const step = STEPS[currentStep - 1]
  const currentValue = formData[step.field]
  const isLastStep = currentStep === 4
  const enabled = canAdvance()

  return (
    <section id="calculadora" className="bg-white py-20 md:py-24 px-5 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-3">
            Responda 4 perguntas. Calculamos sua perda real.
          </h2>
          <p className="font-body text-[#8C9BAB] text-base">
            Diagnóstico gratuito baseado em dados oficiais ANS/Anahp 2025
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8EDF2] shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-6 md:p-8">
          {isCalculating ? (
            <LoadingState />
          ) : (
            <>
              <div className="mb-8">
                <ProgressBar currentStep={currentStep} totalSteps={4} />
              </div>

              <h3 className="font-display font-semibold text-navy text-lg md:text-xl mb-1">
                {step.question}
              </h3>
              <p className="font-body text-[#8C9BAB] text-sm mb-6">
                {step.microcopy}
              </p>

              <div
                role="radiogroup"
                aria-label={step.question}
                className="space-y-3 mb-8"
              >
                {step.options.map((opt) => (
                  <RadioCard
                    key={opt.value}
                    value={opt.value}
                    label={opt.label}
                    sublabel={opt.sublabel}
                    selected={currentValue === opt.value}
                    onChange={(val) => updateField(step.field, val)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="font-body font-medium text-[#8C9BAB] hover:text-navy transition-colors text-sm px-4 py-2"
                  >
                    ← Voltar
                  </button>
                ) : (
                  <div aria-hidden="true" />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!enabled}
                  aria-disabled={!enabled}
                  className={[
                    'font-display font-semibold text-white px-6 py-3 rounded-lg transition-all duration-200 text-base',
                    enabled
                      ? 'bg-teal hover:bg-teal-dark hover:scale-[1.02]'
                      : 'bg-[#8C9BAB] cursor-not-allowed opacity-50',
                  ].join(' ')}
                >
                  {isLastStep ? 'Calcular Minhas Perdas →' : 'Próximo →'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
