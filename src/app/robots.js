export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/creators/dashboard'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/', '/creators/dashboard'],
      },
    ],
    sitemap: 'https://lovebae.app/sitemap.xml',
    host: 'https://lovebae.app',
  };
}
