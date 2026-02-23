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
          '*opengraph-image*',
          '*twitter-image*',
          '/opengraph-image',
          '/twitter-image',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/creators/dashboard/',
          '/login/',
          '*opengraph-image*',
          '*twitter-image*',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/creators/dashboard/',
          '/login/',
          '*opengraph-image*',
          '*twitter-image*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
