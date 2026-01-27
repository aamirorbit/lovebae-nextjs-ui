/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  
  // SEO: Ensure consistent URLs without trailing slashes
  // This prevents redirect chains like /blog → /blog/
  trailingSlash: false,
  
  // SEO: Generate ETags for better caching
  generateEtags: true,
  
  // SEO: Compress responses
  compress: true,
  
  // SEO: PoweredBy header removal for cleaner responses
  poweredByHeader: false,
  
  // SEO: Redirect www to non-www (or vice versa) - configure in your hosting provider
  // Vercel handles this automatically, but for other providers, add redirects here:
  async redirects() {
    return [
      // Redirect common URL variations to canonical URLs
      // Example: Remove .html extensions if any legacy URLs exist
      // {
      //   source: '/:path*.html',
      //   destination: '/:path*',
      //   permanent: true,
      // },
    ];
  },
  
  // SEO: Security headers that also help with SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache static assets for better Core Web Vitals
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
