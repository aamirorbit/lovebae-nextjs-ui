import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import WebVitalsReporter from '@/components/analytics/WebVitalsReporter';
import Script from 'next/script';

export const metadata = {
  title: {
    default: "Lovebae - The #1 Couples App for Long Distance & Everyday Love",
    template: "%s | Lovebae",
  },
  description: "Lovebae is the best couples app for long-distance relationships and everyday love. Share moods, send love letters, raise a virtual pet together, and stay connected. Download free for iOS and Android.",
  keywords: "couples app, relationship app, long distance relationship app, couple games, love letters app, couple widget, partner app, mood sharing, LDR app, best couples app, relationship goals app, best couples app UK, couples app Australia, relationship app USA",
  metadataBase: new URL('https://lovebae.app'),
  applicationName: 'Lovebae',
  authors: [{ name: 'Lovebae Team', url: 'https://lovebae.app' }],
  creator: 'Lovebae',
  publisher: 'Lovebae',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // NOTE: Canonical URLs are set per-page in their respective layout.js or page.js files
  // DO NOT set a global canonical here as it causes SEO issues with duplicate canonicals
  alternates: {
    languages: {
      'en-US': 'https://lovebae.app',
      'en-GB': 'https://lovebae.app',
      'en-AU': 'https://lovebae.app',
      'x-default': 'https://lovebae.app',
    },
  },
  openGraph: {
    title: 'Lovebae - The #1 Couples App for Long Distance & Everyday Love',
    description: 'Stay connected with your partner through mood sharing, love letters, shared activities, and more. The best app for couples in long-distance relationships.',
    url: 'https://lovebae.app',
    siteName: 'Lovebae',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_AU'],
    type: 'website',
    // OG image is auto-generated from opengraph-image.js
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lovebae - The #1 Couples App for Long Distance & Everyday Love',
    description: 'A private space for couples to share moods, send love letters, raise a virtual pet together, and stay connected.',
    creator: '@lovebaeapp',
    // Twitter image is auto-generated from twitter-image.js
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
      other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION },
    }),
  },
  category: 'lifestyle',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints for external domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        {/* JSON-LD structured data - rendered inline for crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lovebae',
              url: 'https://lovebae.app',
              logo: 'https://lovebae.app/assets/brand/lovebae-logo.png',
              inLanguage: 'en',
              sameAs: [
                'https://twitter.com/lovebaeapp',
                'https://instagram.com/lovebaeapp',
                'https://tiktok.com/@lovebaeapp',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@lovebae.app',
                contactType: 'customer service',
                areaServed: ['US', 'GB', 'AU', 'CA'],
                availableLanguage: 'English',
              },
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MobileApplication',
              name: 'Lovebae - Couples App',
              url: 'https://lovebae.app',
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'iOS, Android',
              inLanguage: 'en',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                description: 'Free to download with optional premium subscription',
              },
              description: 'The best couples app for long-distance relationships and everyday love. Share moods, send love letters, raise a virtual pet together, and stay connected.',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '1000',
                bestRating: '5',
                worstRating: '1',
              },
              featureList: 'Mood Sharing, Love Letters, Virtual Pet, Couple Widgets, Daily Check-ins, Question Games',
              countryOfOrigin: {
                '@type': 'Country',
                name: 'United States',
              },
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lovebae',
              url: 'https://lovebae.app',
              inLanguage: 'en',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://lovebae.app/blog?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <SpeedInsights />
        <WebVitalsReporter />

        {/* Google Analytics - only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
         process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname
                  });
                `
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
