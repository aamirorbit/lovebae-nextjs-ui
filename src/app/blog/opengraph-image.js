import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Lovebae Blog - Relationship Tips & Couples Advice';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E9 50%, #FFF5F8 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(255, 107, 107, 0.12)',
            filter: 'blur(50px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(236, 72, 153, 0.1)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Category emojis floating */}
        <div
          style={{
            display: 'flex',
            gap: 30,
            marginBottom: 30,
            fontSize: 50,
          }}
        >
          <span>💕</span>
          <span>✨</span>
          <span>💌</span>
          <span>🏠</span>
          <span>💬</span>
        </div>
        
        {/* Main title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            The{' '}
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            Love
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#FF6B6B',
            }}
          >
            bae
          </span>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            {' '}Blog
          </span>
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#666',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          Relationship Tips, Date Ideas & Couples Advice
        </div>
        
        {/* Topics */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          {['Long Distance', 'Date Ideas', 'Communication', 'Relationship Tips', 'Gifts'].map((topic) => (
            <div
              key={topic}
              style={{
                padding: '12px 24px',
                background: 'white',
                borderRadius: 50,
                fontSize: 20,
                color: '#666',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              {topic}
            </div>
          ))}
        </div>
        
        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 22,
            color: '#FF6B6B',
            fontWeight: 600,
          }}
        >
          lovebae.app/blog
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
