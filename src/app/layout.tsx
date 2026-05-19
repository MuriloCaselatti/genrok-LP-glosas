import type { Metadata } from "next";
import { Sora, DM_Sans } from "next/font/google";
import Script from "next/script";
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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://diagnostico.genrok.com.br";

export const metadata: Metadata = {
  title: "Calculadora de Glosas Médicas | Genrok IA Anti-Glosas",
  description:
    "Descubra em 2 minutos quanto sua clínica perde em glosas por mês. Diagnóstico gratuito baseado em dados ANS/Anahp 2025. Recupere até 80% das perdas.",
  keywords: [
    "glosas médicas",
    "calculadora glosas",
    "anti-glosas",
    "IA saúde",
    "auditoria médica",
  ],
  authors: [{ name: "Genrok AI" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Genrok Anti-Glosas",
    title: "Sua Clínica Perde Até 17% do Faturamento em Glosas. Descubra Quanto.",
    description:
      "Calculadora gratuita de perdas por glosas médicas. 2 minutos. Diagnóstico personalizado via WhatsApp.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Genrok — Calculadora de Glosas Médicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Glosas Médicas | Genrok",
    description: "Descubra em 2 minutos quanto sua clínica perde em glosas.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${sora.variable} ${dmSans.variable} font-body antialiased`}
      >
        {children}

        {/* Google Analytics 4 — afterInteractive, não bloqueia renderização */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA4_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel — afterInteractive, não bloqueia renderização */}
        {META_PIXEL_ID && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
