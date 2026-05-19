# Genrok — Calculadora Anti-Glosas

Landing page de aquisição de leads para a solução Anti-Glosas da Genrok.

## Objetivo
Capturar leads qualificados via calculadora de perdas por glosas médicas,
direcionando para WhatsApp com contexto completo de qualificação.

## Stack
- Next.js 14 (App Router, Static Export)
- TypeScript (strict)
- Tailwind CSS
- Vercel

## Setup Local
1. Clone o repositório
2. Copie .env.example para .env.local e preencha os valores
3. `npm install`
4. `npm run dev`
5. Acesse http://localhost:3000

## Scripts
- `npm run dev` — desenvolvimento local
- `npm run build` — build de produção (gera /out)
- `npm run start` — não disponível (static export)

## Deploy
Deploy automático via GitHub → Vercel.
Branch main → produção.
Branches de feature → preview deployments.

## Estrutura
Ver blueprint técnico em /docs/blueprint.md
