'use client';

import { useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';
import { sendWebVitalToAnalytics } from '@/lib/web-vitals';

/**
 * Mounts once and reports Core Web Vitals to Google Analytics (when configured).
 * Add to root layout for site-wide CWV tracking.
 */
export default function WebVitalsReporter() {
  useEffect(() => {
    onCLS(sendWebVitalToAnalytics);
    onINP(sendWebVitalToAnalytics);
    onLCP(sendWebVitalToAnalytics);
    onFCP(sendWebVitalToAnalytics);
    onTTFB(sendWebVitalToAnalytics);
  }, []);
  return null;
}
