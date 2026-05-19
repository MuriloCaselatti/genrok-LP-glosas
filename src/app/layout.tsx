import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calculadora de Glosas Médicas | Genrok IA Anti-Glosas",
  description:
    "Descubra em 2 minutos quanto sua clínica perde em glosas médicas por mês. Calculadora gratuita baseada em dados ANS/Anahp 2025.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${dmSans.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
