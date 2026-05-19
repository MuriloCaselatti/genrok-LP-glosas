import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import AuthorityStats from '@/components/sections/AuthorityStats';
import Calculator from '@/components/sections/Calculator';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AuthorityStats />
        <Calculator />
        {/* Bridge é renderizada dentro do Calculator após showBridge=true */}
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
