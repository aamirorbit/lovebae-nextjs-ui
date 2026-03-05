'use client';

import React, { useState } from 'react';

const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lovebae.app';

function buildSnippets({ url, title, description }) {
  const fullUrl = url ? `${baseUrl}${url}` : (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const shortTitle = title?.length > 50 ? title.slice(0, 47) + '…' : title;

  return {
    twitter: `${shortTitle || 'Check this out'} 💕\n\n${fullUrl}`,
    instagram: `${title || 'Lovebae'}\n\n${description || ''}\n\nLink in bio 🔗\n\n#lovebae #couples #relationshipgoals #longdistancerelationship #couplegoals`,
    linkedin: `I found this useful: "${shortTitle || 'Article'}" — ${description || 'Worth a read.'} ${fullUrl}`,
  };
}

export default function ShareableSnippets({ url, title, description }) {
  const [copied, setCopied] = useState(null);
  const snippets = buildSnippets({ url, title, description });

  async function copy(label, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4">
      <p className="text-sm font-medium text-gray-700 mb-3">Copy for social</p>
      <div className="space-y-3">
        {[
          { label: 'Twitter / X', key: 'twitter', text: snippets.twitter },
          { label: 'Instagram caption', key: 'instagram', text: snippets.instagram },
          { label: 'LinkedIn', key: 'linkedin', text: snippets.linkedin },
        ].map(({ label, key, text }) => (
          <div key={key} className="flex flex-col gap-1">
            <span className="text-xs font-medium text-gray-500">{label}</span>
            <div className="flex gap-2">
              <pre className="flex-1 overflow-x-auto rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-700 whitespace-pre-wrap break-words">
                {text}
              </pre>
              <button
                type="button"
                onClick={() => copy(key)}
                className="shrink-0 self-start rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                {copied === key ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
