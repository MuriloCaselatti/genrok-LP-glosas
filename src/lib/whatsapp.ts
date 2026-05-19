import type { CalculationResult } from '@/types/calculator'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

export function buildWhatsAppMessage(result: CalculationResult): string {
  return `Olá! Acabei de usar a Calculadora de Glosas da Genrok.

Meu perfil:
📊 Faturamento: ${result.faixaFaturamento}
🏥 Especialidade: ${result.especialidadeLabel}
🏦 Convênio principal: ${result.operadoraLabel}
⏰ Última auditoria: ${result.ultimaAuditoriaLabel}

Quero receber o diagnóstico completo e entender quanto posso recuperar.`
}

export function buildWhatsAppUrl(result: CalculationResult): string {
  const message = buildWhatsAppMessage(result)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
