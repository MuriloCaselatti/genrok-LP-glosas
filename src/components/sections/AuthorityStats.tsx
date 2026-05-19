const stats = [
  {
    number: '17%',
    description: 'do faturamento glosado',
    detail: 'Em Q1/2025 — recorde histórico',
    source: 'Fonte: Observatório Anahp',
    accentClass: 'text-danger',
  },
  {
    number: 'R$ 5,8 bi',
    description: 'retidos pelas operadoras',
    detail: 'Apenas em 2024, amostra Anahp',
    source: 'Fonte: Anahp 2024',
    accentClass: 'text-warning',
  },
  {
    number: '80%',
    description: 'das glosas são revertíveis',
    detail: 'Com auditoria preditiva adequada',
    source: 'Fonte: ANS / Anahp',
    accentClass: 'text-teal',
  },
] as const;

export default function AuthorityStats() {
  return (
    <section className="bg-[#F4F7FA] py-16 md:py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.number}
              className="bg-white border border-[#E8EDF2] rounded-xl p-8 shadow-[0_4px_24px_rgba(10,37,64,0.08)]"
            >
              <p className={`font-display font-extrabold text-4xl mb-2 ${stat.accentClass}`}>
                {stat.number}
              </p>
              <p className="font-body font-medium text-navy text-base mb-1">
                {stat.description}
              </p>
              <p className="font-body font-normal text-[#8C9BAB] text-sm mb-2">
                {stat.detail}
              </p>
              <p className="font-body font-normal text-[#8C9BAB] text-xs italic">
                {stat.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
