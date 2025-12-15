import Script from 'next/script';

// JSON-LD structured data for blog
const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Lovebae Blog',
  description: 'Relationship tips, date ideas, long-distance relationship advice, and guidance for couples to grow closer every day.',
  url: 'https://lovebae.app/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Lovebae',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lovebae.app/assets/brand/lovebae-logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://lovebae.app/blog',
  },
};

export default function BlogLayout({ children }) {
  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {children}
    </>
  );
}
