'use client'

export default function Hero() {
  function scrollToCalc() {
    document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      className="bg-gradient-to-b from-navy to-navy-light pt-28 pb-20 md:pt-36 md:pb-24 px-5 md:px-8"
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-display font-extrabold text-white text-3xl md:text-5xl leading-tight mb-6 text-balance">
          Descubra Em 2 Minutos Quanto Sua Clínica Está Perdendo em Glosas Todo Mês
        </h1>
        <p className="font-body font-normal text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Os convênios usam robôs para negar pagamentos. Sua clínica ainda usa
          humanos para revisar. O resultado: até R$ 17 em cada R$ 100 que você fatura
          nunca chegam à sua conta.
        </p>
        <button
          onClick={scrollToCalc}
          aria-label="Calcular minhas perdas agora — ir para calculadora"
          className="group inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white font-display font-semibold text-base md:text-lg px-6 md:px-8 py-3.5 md:py-4 rounded-lg transition-all duration-200 hover:scale-[1.02] mb-4"
        >
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
          Calcular Minhas Perdas Agora
        </button>
        <p className="font-body font-normal text-[#8C9BAB] text-sm">
          Gratuito · 2 minutos · Sem compromisso
        </p>
      </div>
    </section>
  );
}
