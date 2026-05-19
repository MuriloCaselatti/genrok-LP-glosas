'use client'

import { useState, useCallback } from 'react'
import type { CalculatorState, CalculatorFormData } from '@/types/calculator'
import { calcularPerdas } from '@/lib/calculator'

const INITIAL_STATE: CalculatorState = {
  currentStep: 1,
  formData: {
    faturamento: null,
    especialidade: null,
    operadora: null,
    ultimaAuditoria: null,
  },
  isCalculating: false,
  result: null,
  showBridge: false,
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(INITIAL_STATE)

  const updateField = useCallback((field: keyof CalculatorFormData, value: string) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [field]: value },
    }))
  }, [])

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4),
    }))
  }, [])

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }))
  }, [])

  // Loading de 3s — cria antecipação emocional intencional
  const executarCalculo = useCallback(async () => {
    setState(prev => ({ ...prev, isCalculating: true }))

    await new Promise<void>(resolve => setTimeout(resolve, 3000))

    setState(prev => {
      const result = calcularPerdas(prev.formData)
      return {
        ...prev,
        isCalculating: false,
        result,
        showBridge: true,
      }
    })
  }, [])

  const canAdvance = useCallback((): boolean => {
    const { formData, currentStep } = state
    switch (currentStep) {
      case 1: return formData.faturamento !== null
      case 2: return formData.especialidade !== null
      case 3: return formData.operadora !== null
      case 4: return formData.ultimaAuditoria !== null
      default: return false
    }
  }, [state])

  return {
    state,
    updateField,
    nextStep,
    prevStep,
    executarCalculo,
    canAdvance,
  }
}
