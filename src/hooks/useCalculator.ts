'use client';

import { useState } from 'react';
import type { CalculatorFormData, CalculatorResult } from '@/types/calculator';
import { calcularPerdas } from '@/lib/calculator';

const FIELD_BY_STEP: Record<number, keyof CalculatorFormData> = {
  1: 'especialidade',
  2: 'faturamento',
  3: 'convenio',
  4: 'controle',
};

const initialForm: CalculatorFormData = {
  especialidade: null,
  faturamento: null,
  convenio: null,
  controle: null,
};

export function useCalculator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<CalculatorFormData>(initialForm);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = 4;
  const currentField = FIELD_BY_STEP[step];
  const canAdvance = form[currentField] !== null;

  function setField(key: keyof CalculatorFormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      const calc = calcularPerdas(form);
      setResult(calc);
      setIsComplete(true);
      // Bridge section reads `result` in Etapa 4
      document.getElementById('resultado')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  return {
    step,
    totalSteps,
    form,
    result,
    isComplete,
    canAdvance,
    setField,
    next,
    back,
  };
}
