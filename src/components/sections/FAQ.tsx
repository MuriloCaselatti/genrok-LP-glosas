'use client'

import { useState } from 'react'

const FAQS = [
  {
    question: 'Meu sistema de gestão já tem um módulo de glosas.',
    answer:
      'Os sistemas de gestão são reativos — eles identificam glosas depois que elas acontecem. A Genrok opera de forma preditiva: auditamos as guias antes do envio à operadora, eliminando a causa da glosa antes que ela exista. São abordagens complementares, não concorrentes.',
  },
  {
    question: 'Já tenho uma equipe de faturamento que faz esse trabalho.',
    answer:
      'Sua equipe é valiosa — e vai continuar sendo. A diferença é que hoje sua equipe compete com sistemas automatizados das operadoras usando revisão manual. Com a Genrok, você coloca IA do lado da sua equipe, nivelando o campo de batalha. Mais resultado, menos retrabalho.',
  },
  {
    question: 'Não quero pagar mensalidade antes de ver resultado.',
    answer:
      'Entendemos. Por isso nosso modelo comercial inclui uma opção de Success Fee: você só paga quando a glosa é efetivamente reduzida ou recuperada. O risco fica do nosso lado. Zero compromisso antes do resultado.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="bg-white py-16 md:py-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-navy text-2xl md:text-3xl mb-10 text-center">
          Perguntas frequentes
        </h2>

        <div className="divide-y divide-[#E8EDF2]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div key={index}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                >
                  <span
                    className={[
                      'font-body font-medium text-base transition-colors duration-150',
                      isOpen ? 'text-teal' : 'text-navy group-hover:text-teal',
                    ].join(' ')}
                  >
                    {faq.question}
                  </span>
                  <span
                    className={[
                      'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-200',
                      isOpen
                        ? 'border-teal text-teal rotate-45'
                        : 'border-[#8C9BAB] text-[#8C9BAB]',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  className={[
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-96 pb-5' : 'max-h-0',
                  ].join(' ')}
                >
                  <p className="font-body font-normal text-[#3D4F61] text-[15px] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
