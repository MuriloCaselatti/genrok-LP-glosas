declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// ============================================================
// META PIXEL
// ============================================================

export function trackPixelEvent(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params)
  }
}

export const PixelEvents = {
  pageView: () => trackPixelEvent('PageView'),

  // Usuário começou a preencher o formulário (Step 1, primeiro clique)
  lead: () =>
    trackPixelEvent('Lead', {
      content_name: 'Calculadora Anti-Glosas',
      content_category: 'HealthTech B2B',
    }),

  // Usuário clicou no botão WhatsApp (conversão final)
  completeRegistration: () =>
    trackPixelEvent('CompleteRegistration', {
      content_name: 'WhatsApp Lead',
      status: 'qualified',
    }),

  // Usuário chegou na Bridge (completou o formulário)
  initiateCheckout: () =>
    trackPixelEvent('InitiateCheckout', {
      content_name: 'Diagnóstico Solicitado',
    }),
}

// ============================================================
// GOOGLE ANALYTICS 4
// ============================================================

export function trackGA4Event(
  eventName: string,
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

export const GA4Events = {
  formStart: () =>
    trackGA4Event('form_start', { form_id: 'calculadora_glosas' }),
  formStepComplete: (step: number) =>
    trackGA4Event('form_step_complete', { step }),
  whatsappClick: () =>
    trackGA4Event('whatsapp_click', { source: 'bridge_cta' }),
}
