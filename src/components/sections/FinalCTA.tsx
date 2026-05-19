'use client'

export default function FinalCTA() {
  function scrollToCalc() {
    document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="bg-gradient-to-b from-navy to-navy-light py-20 md:py-24 px-5 md:px-8 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-4 leading-snug">
          Cada mês sem auditoria é dinheiro perdido para sempre.
        </h2>
        <p className="font-body font-normal text-gray-300 text-base md:text-lg mb-10">
          Faça o cálculo agora. É gratuito e leva 2 minutos.
        </p>

        <button
          onClick={scrollToCalc}
          aria-label="Ir para calculadora"
          className="group inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-display font-semibold text-base md:text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] mb-4"
        >
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
          Calcular Minhas Perdas Agora
        </button>

        <p className="font-body font-normal text-[#8C9BAB] text-sm">
          Gratuito · Sem compromisso · Resultado via WhatsApp
        </p>
      </div>
    </section>
  )
}
