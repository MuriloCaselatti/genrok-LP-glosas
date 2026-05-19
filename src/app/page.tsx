import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import AuthorityStats from '@/components/sections/AuthorityStats';
import Calculator from '@/components/sections/Calculator';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AuthorityStats />
        <Calculator />
        {/* Bridge + demais seções — Etapas 4 e 5 */}
      </main>
    </>
  );
}
