
'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  // Only render in production or if measurement ID is valid
  if (!measurementId || measurementId === 'G-XXXXXXXXXX' || process.env.NODE_ENV === 'development') {
    return null;
  }
  
  return <GA gaId={measurementId} />;
}
