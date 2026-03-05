import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs';

export const alt = 'Lovebae Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Category to emoji mapping
const categoryEmojis = {
  'Travel': '✈️',
  'Gifts': '🎁',
  'Questions': '💬',
  'Date Ideas': '🏠',
  'Relationship Tips': '✨',
  'Communication': '💭',
  'Long Distance': '💕',
};

// Category to color mapping
const categoryColors = {
  'Travel': '#3B82F6',
  'Gifts': '#EC4899',
  'Questions': '#8B5CF6',
  'Date Ideas': '#F59E0B',
  'Relationship Tips': '#EF4444',
  'Communication': '#10B981',
  'Long Distance': '#E879F9',
};

const metadataBase = process.env.NEXT_PUBLIC_APP_URL || 'https://lovebae.app';

export default async function Image({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  const title = post?.frontmatter?.title || 'Lovebae Blog';
  const category = post?.frontmatter?.category || 'Blog';
  const emoji = categoryEmojis[category] || '❤️';
  const accentColor = categoryColors[category] || '#E7000B';
  const imagePath = post?.frontmatter?.image;
  const rawImageUrl = imagePath
    ? `${metadataBase.replace(/\/$/, '')}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
    : null;
  let imageUrl = null;
  if (rawImageUrl) {
    try {
      const res = await fetch(rawImageUrl, { cache: 'force-cache' });
      if (res.ok) imageUrl = rawImageUrl;
    } catch {
      // fall back to gradient-only
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: imageUrl
            ? '#1a1a1a'
            : 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 50%, #FFF5F8 100%)',
          position: 'relative',
          padding: 60,
        }}
      >
        {/* Optional featured image from frontmatter - real image for OG */}
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              width={1200}
              height={630}
              style={{
                position: 'absolute',
                inset: 0,
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.6) 100%)',
              }}
            />
          </>
        )}
        {/* Content layer */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        {/* Decorative accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: accentColor,
          }}
        />

        {!imageUrl && (
          <div
            style={{
              position: 'absolute',
              bottom: '-150px',
              right: '-150px',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: `${accentColor}15`,
              filter: 'blur(80px)',
            }}
          />
        )}
        
        {/* Top section: Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 30,
          }}
        >
          <span style={{ fontSize: 40 }}>{emoji}</span>
          <span
            style={{
              fontSize: 24,
              color: imageUrl ? '#fff' : accentColor,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 48 : 56,
              fontWeight: 700,
              color: imageUrl ? '#ffffff' : '#1a1a1a',
              lineHeight: 1.2,
              maxWidth: '90%',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom section: Branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: imageUrl ? '#fff' : '#1a1a1a',
              }}
            >
              Love
            </span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#E7000B',
              }}
            >
              bae
            </span>
            <span
              style={{
                fontSize: 24,
                color: imageUrl ? 'rgba(255,255,255,0.9)' : '#999',
                marginLeft: 16,
              }}
            >
              Blog
            </span>
          </div>
          <div
            style={{
              fontSize: 20,
              color: imageUrl ? 'rgba(255,255,255,0.8)' : '#666',
            }}
          >
            lovebae.app/blog
          </div>
        </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
