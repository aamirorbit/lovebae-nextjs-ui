import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Lovebae Creator Program - Partner With Us';
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
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 107, 107, 0.15)',
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255, 182, 193, 0.2)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Handshake emoji */}
        <div style={{ fontSize: 80, marginBottom: 20 }}>🤝</div>
        
        {/* Badge */}
        <div
          style={{
            padding: '10px 30px',
            background: '#E7000B',
            borderRadius: 50,
            fontSize: 18,
            color: 'white',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: 25,
          }}
        >
          Creator Program
        </div>
        
        {/* Main text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            Partner with{' '}
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#1a1a1a',
            }}
          >
            Love
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#E7000B',
            }}
          >
            bae
          </span>
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#666',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Earn through content collaborations & referrals
        </div>
        
        {/* Benefits */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 40,
          }}
        >
          {[
            { emoji: '💰', text: '10% Lifetime Commission' },
            { emoji: '🎯', text: 'Flexible Collaboration' },
            { emoji: '📈', text: 'Grow Together' },
          ].map((benefit) => (
            <div
              key={benefit.text}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 24px',
                background: 'white',
                borderRadius: 16,
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              }}
            >
              <span style={{ fontSize: 24 }}>{benefit.emoji}</span>
              <span style={{ fontSize: 18, color: '#333', fontWeight: 500 }}>
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
