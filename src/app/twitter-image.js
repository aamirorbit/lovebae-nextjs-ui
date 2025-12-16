import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Lovebae - The #1 Couples App';
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
            left: '-100px',
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
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255, 182, 193, 0.2)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Heart emoji */}
        <div style={{ fontSize: 100, marginBottom: 20 }}>💕</div>
        
        {/* Logo/Brand name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#1a1a1a',
              letterSpacing: '-2px',
            }}
          >
            Love
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#E7000B',
              letterSpacing: '-2px',
            }}
          >
            bae
          </span>
        </div>
        
        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#666',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Stay Close, Even When Life Gets Busy
        </div>
        
        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 40,
            fontSize: 20,
            color: '#888',
          }}
        >
          <span>💌 Love Letters</span>
          <span>🎯 Daily Check-ins</span>
          <span>🐾 Virtual Pet</span>
          <span>📱 Widgets</span>
        </div>
        
        {/* CTA */}
        <div
          style={{
            marginTop: 50,
            padding: '16px 40px',
            background: '#E7000B',
            color: 'white',
            borderRadius: 50,
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Download Free for iOS & Android
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
