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

export default async function Image({ params }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  const title = post?.frontmatter?.title || 'Lovebae Blog';
  const category = post?.frontmatter?.category || 'Blog';
  const emoji = categoryEmojis[category] || '❤️';
  const accentColor = categoryColors[category] || '#E7000B';
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 50%, #FFF5F8 100%)',
          position: 'relative',
          padding: 60,
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
        
        {/* Decorative circle */}
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
              color: accentColor,
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
              color: '#1a1a1a',
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#1a1a1a',
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
                color: '#999',
                marginLeft: 16,
              }}
            >
              Blog
            </span>
          </div>
          
          <div
            style={{
              fontSize: 20,
              color: '#666',
            }}
          >
            lovebae.app/blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
