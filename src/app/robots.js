export default function robots() {
  const baseUrl = 'https://lovebae.app';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/creators/dashboard/',
          '/login/',
          '/_next/',
          '/private/',
        ],
      },
      {
        // Googlebot-specific rules for optimal crawling
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/creators/dashboard/',
          '/login/',
        ],
      },
      {
        // GPTBot and AI crawlers - allow for now but can be blocked if needed
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        // Bing bot
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/creators/dashboard/',
          '/login/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
