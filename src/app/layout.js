import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

export const metadata = {
  title: {
    default: "Lovebae - The #1 Couples App for Long Distance & Everyday Love",
    template: "%s | Lovebae",
  },
  description: "Lovebae is the best couples app for long-distance relationships and everyday love. Share moods, send love letters, raise a virtual pet together, and stay connected. Download free for iOS and Android.",
  keywords: "couples app, relationship app, long distance relationship app, couple games, love letters app, couple widget, partner app, mood sharing, LDR app, best couples app, relationship goals app",
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
  openGraph: {
    title: 'Lovebae - The #1 Couples App for Long Distance & Everyday Love',
    description: 'Stay connected with your partner through mood sharing, love letters, shared activities, and more. The best app for couples in long-distance relationships.',
    url: 'https://lovebae.app',
    siteName: 'Lovebae',
    locale: 'en_US',
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
  verification: {
    // IMPORTANT: Add your Google Search Console verification code here
    // Get it from: https://search.google.com/search-console → Settings → Ownership verification → HTML tag
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'lifestyle',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <SpeedInsights />
        
        {/* JSON-LD structured data - Organization */}
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lovebae',
              url: 'https://lovebae.app',
              logo: 'https://lovebae.app/assets/brand/lovebae-logo.png',
              sameAs: [
                'https://twitter.com/lovebaeapp',
                'https://instagram.com/lovebaeapp',
                'https://tiktok.com/@lovebaeapp',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@lovebae.app',
                contactType: 'customer service',
              },
            })
          }}
        />
        
        {/* JSON-LD structured data - Mobile Application */}
        <Script
          id="app-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MobileApplication',
              name: 'Lovebae - Couples App',
              url: 'https://lovebae.app',
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'iOS, Android',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
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
            })
          }}
        />
        
        {/* JSON-LD structured data - WebSite with SearchAction */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lovebae',
              url: 'https://lovebae.app',
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
        
        {/* Google Analytics - Replace with your GA ID */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', { 
                page_path: window.location.pathname,
                'anonymize_ip': true
              });
            `
          }}
        />
      </body>
    </html>
  );
}
