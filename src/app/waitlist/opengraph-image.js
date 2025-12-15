import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Join the Lovebae Waitlist - Get Early Access';
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
          background: 'linear-gradient(135deg, #FF6B6B 0%, #E55555 50%, #FF8585 100%)',
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
            background: 'rgba(255, 255, 255, 0.1)',
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
            background: 'rgba(255, 255, 255, 0.08)',
            filter: 'blur(80px)',
          }}
        />
        
        {/* Heart emoji */}
        <div style={{ fontSize: 80, marginBottom: 20 }}>💕</div>
        
        {/* Badge */}
        <div
          style={{
            padding: '10px 30px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 50,
            fontSize: 20,
            color: 'white',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: 20,
          }}
        >
          Early Access
        </div>
        
        {/* Main text */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Join the Lovebae Waitlist
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Be the first to experience the #1 couples app
        </div>
        
        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 30,
            marginTop: 40,
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <span>✓ Free to start</span>
          <span>✓ No spam</span>
          <span>✓ Early access perks</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
