'use client';

import React, { useState, useRef, useEffect } from 'react';

/**
 * Lazy-loading video embed for YouTube or Vimeo.
 * Loads iframe when in view (IntersectionObserver) or on play click to protect LCP.
 */
export default function VideoEmbed({
  youtubeId,
  vimeoId,
  title = 'Video',
  className = '',
  lazy = true,
}) {
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!lazy || !containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [lazy]);

  const baseSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}`
    : vimeoId
      ? `https://player.vimeo.com/video/${vimeoId}`
      : null;

  if (!baseSrc) return null;

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 ${className}`}
    >
      {shouldLoad ? (
        <iframe
          src={baseSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white focus:outline-none focus:ring-2 focus:ring-[#E7000B] focus:ring-offset-2"
          aria-label={`Play ${title}`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E7000B] shadow-lg transition-transform hover:scale-110">
            <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
          <span className="text-sm font-medium opacity-90">Play video</span>
        </button>
      )}
    </div>
  );
}
