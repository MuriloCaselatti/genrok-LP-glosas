import type { CalculationResult } from '@/types/calculator'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

interface BridgeProps {
  result: CalculationResult
  whatsappUrl: string
}

const BENEFITS = [
  'O valor estimado que sua clínica perde por mês',
  'O potencial de recuperação nos próximos 12 meses',
  'Os 3 tipos de glosa mais prováveis no seu perfil',
  'Um plano de ação inicial sem compromisso',
]

export default function Bridge({ whatsappUrl }: BridgeProps) {
  return (
    <section
      id="resultado"
      className="bg-gradient-to-b from-[#F4F7FA] to-white py-20 md:py-24 px-5 md:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-[#E8EDF2] shadow-[0_4px_24px_rgba(10,37,64,0.08)] p-8 md:p-12">
          <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-6 leading-snug">
            Calculamos. O número não é pequeno.
          </h2>

          <div className="font-body text-[#3D4F61] text-base leading-relaxed space-y-4 mb-8">
            <p>
              Com base no seu faturamento e especialidade, identificamos um padrão
              de perda financeira recorrente — consistente com o que estamos vendo
              nas clínicas da sua especialidade e faixa de faturamento.
            </p>
            <p>
              Para preservar a confidencialidade dos seus dados financeiros, enviamos
              o diagnóstico completo diretamente no seu WhatsApp. Em menos de 5 minutos
              você recebe:
            </p>
          </div>

          <ul className="space-y-3 mb-10">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="text-teal text-lg leading-none mt-0.5" aria-hidden="true">
                  ✅
                </span>
                <span className="font-body font-normal text-navy text-base">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-3">
            <WhatsAppButton url={whatsappUrl} />
            <p className="font-body font-normal text-[#8C9BAB] text-sm">
              Resposta em até 5 minutos · Sem compromisso · 100% gratuito
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
