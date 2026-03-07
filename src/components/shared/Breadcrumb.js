import Link from 'next/link';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, i) => (
          <li key={item.href || item.label} className="flex items-center gap-1">
            {i > 0 && (
              <svg className="w-3.5 h-3.5 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-[#E7000B] transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium truncate max-w-[200px]" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
