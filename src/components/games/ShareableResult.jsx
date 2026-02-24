'use client';

import { useRef, useState } from 'react';

export function ShareableResult({ title, score, subtitle, children }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!navigator.share) {
      if (canvasRef.current) {
        try {
          const blob = await new Promise((resolve) => canvasRef.current?.toBlob(resolve, 'image/png'));
          if (blob) {
            const data = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([data]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        } catch {
          window.alert('Share this page link: ' + window.location.href);
        }
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      return;
    }
    try {
      await navigator.share({
        title: title || 'Lovebae Couple Quiz',
        text: subtitle || `We scored ${score}!`,
        url: window.location.href,
      });
    } catch (e) {
      if (e.name !== 'AbortError') {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="space-y-4 animate-fade-in-up">
      {children}
      <button
        onClick={handleShare}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 btn-press border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        {copied ? 'Copied!' : 'Share results'}
      </button>
    </div>
  );
}
