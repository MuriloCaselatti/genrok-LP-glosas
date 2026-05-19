const STEP_LABELS = ['Faturamento', 'Especialidade', 'Convênio', 'Auditoria']

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Passo ${currentStep} de ${totalSteps}`}
    >
      {/* Mobile: texto simples */}
      <p className="md:hidden font-body text-sm text-[#8C9BAB]">
        Passo {currentStep} de {totalSteps}
      </p>

      {/* Desktop: circles + labels + linhas de conexão */}
      <div className="hidden md:flex items-start">
        {STEP_LABELS.map((label, index) => {
          const stepNum = index + 1
          const isCompleted = stepNum < currentStep
          const isCurrent = stepNum === currentStep
          const isLast = index === STEP_LABELS.length - 1

          return (
            <div key={stepNum} className="flex items-start flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium transition-all duration-200',
                    isCompleted ? 'bg-teal text-white' :
                    isCurrent  ? 'bg-teal text-white ring-4 ring-teal/20' :
                                 'bg-[#E8EDF2] text-[#8C9BAB]',
                  ].join(' ')}
                >
                  {isCompleted ? '✓' : stepNum}
                </div>
                <p
                  className={[
                    'text-xs mt-1.5 font-body whitespace-nowrap',
                    isCurrent  ? 'text-teal font-medium' : 'text-[#8C9BAB]',
                  ].join(' ')}
                >
                  {label}
                </p>
              </div>

              {/* Linha de conexão entre steps */}
              {!isLast && (
                <div className="flex-1 h-0.5 mt-4 bg-[#E8EDF2] overflow-hidden">
                  <div
                    className="h-full bg-teal transition-all duration-300"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
