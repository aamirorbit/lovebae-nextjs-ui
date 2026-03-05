'use client';

import VideoEmbed from '@/components/shared/VideoEmbed';

export default function GamesVideoSection({ youtubeId }) {
  if (!youtubeId) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
          See how it works
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Quick guide to playing our free couple games with your partner.
        </p>
        <VideoEmbed youtubeId={youtubeId} title="How to play Lovebae couple games" lazy />
      </div>
    </section>
  );
}
