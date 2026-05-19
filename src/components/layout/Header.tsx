'use client'

export default function Header() {
  function scrollToCalc() {
    document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy h-14 md:h-16 flex items-center px-5 md:px-8">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-white text-xl tracking-wide">
            GENROK
          </span>
          <span className="bg-teal text-white text-xs font-body font-medium px-2 py-0.5 rounded-full">
            IA Anti-Glosas
          </span>
        </div>
        <button
          onClick={scrollToCalc}
          aria-label="Calcular minhas perdas em glosas — ir para calculadora"
          className="bg-teal hover:bg-teal-dark text-white font-display font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200"
        >
          Calcular Minhas Perdas
        </button>
      </div>
    </header>
  );
}
