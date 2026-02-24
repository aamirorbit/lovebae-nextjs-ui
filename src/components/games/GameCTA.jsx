import Link from 'next/link';

export function GameCTA() {
  return (
    <div className="relative overflow-hidden mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E7000B] via-[#D10009] to-[#FF4757]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
      <div className="relative py-16">
        <div className="container mx-auto px-4 text-center text-white max-w-2xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
            Want daily games & prompts?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Fresh conversation starters, challenges, and connection activities every day.
          </p>
          <Link
            href="/waitlist"
            className="inline-flex items-center bg-white text-[#E7000B] px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] btn-press"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
