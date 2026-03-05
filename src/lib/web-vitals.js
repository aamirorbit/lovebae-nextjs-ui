/**
 * Core Web Vitals - send helper.
 * Called from client-only WebVitalsReporter with metric payload.
 * Use from client to send to gtag when GA is configured.
 */

export function sendWebVitalToAnalytics(metric) {
  if (typeof window === 'undefined') return;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isPlaceholder = !gaId || gaId === 'G-XXXXXXXXXX';
  if (window.gtag && !isPlaceholder) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
    });
  }
}
