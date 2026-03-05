'use client';

import React, { useState } from 'react';

const relationshipTypes = [
  'Long distance',
  'Dating',
  'Engaged',
  'Married',
  'Newlywed',
  'Other',
];

export default function SuccessStoryForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    authorName: '',
    partnerNames: '',
    story: '',
    relationshipType: '',
    duration: '',
    email: '',
    consentToPublish: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/success-stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you! Your story has been submitted.');
        setForm({
          authorName: '',
          partnerNames: '',
          story: '',
          relationshipType: '',
          duration: '',
          email: '',
          consentToPublish: true,
        });
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <span className="text-5xl block mb-4">🎉</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Story submitted!</h3>
        <p className="text-gray-500 mb-6">
          Thank you for sharing. We&apos;ll review it and may feature it on this
          page.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-[#E7000B] font-semibold hover:underline"
        >
          Submit another story
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="story" className="block text-sm font-semibold text-gray-900 mb-2">
          Your story <span className="text-[#E7000B]">*</span>
        </label>
        <textarea
          id="story"
          name="story"
          required
          minLength={20}
          maxLength={3000}
          rows={5}
          value={form.story}
          onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
          placeholder="How do you and your partner stay connected? What has helped your relationship?"
          className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all resize-none"
        />
        <div className="flex justify-between mt-1.5">
          <p className="text-xs text-gray-400">Min 20 characters</p>
          <p className="text-xs text-gray-400">{form.story.length} / 3,000</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="authorName" className="block text-sm font-semibold text-gray-900 mb-2">
            Your name(s)
          </label>
          <input
            id="authorName"
            name="authorName"
            type="text"
            maxLength={100}
            value={form.authorName}
            onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))}
            placeholder="e.g. Maya & Alex"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all"
          />
        </div>
        <div>
          <label htmlFor="relationshipType" className="block text-sm font-semibold text-gray-900 mb-2">
            Relationship type
          </label>
          <select
            id="relationshipType"
            name="relationshipType"
            value={form.relationshipType}
            onChange={(e) => setForm((f) => ({ ...f, relationshipType: e.target.value }))}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all appearance-none"
          >
            <option value="">Select one...</option>
            {relationshipTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-semibold text-gray-900 mb-2">
            How long together?
          </label>
          <input
            id="duration"
            name="duration"
            type="text"
            value={form.duration}
            onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
            placeholder="e.g. 2 years"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
            Email <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all"
          />
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={form.consentToPublish}
          onChange={(e) => setForm((f) => ({ ...f, consentToPublish: e.target.checked }))}
          className="mt-0.5 h-5 w-5 rounded-md border-gray-300 text-[#E7000B] focus:ring-[#E7000B]"
        />
        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
          I&apos;m okay with Lovebae featuring this story on the website (we may
          edit for length).
        </span>
      </label>

      {message && status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-4 rounded-2xl" role="alert">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || form.story.length < 20}
        className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-[#E7000B] hover:bg-[#C50009] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_12px_rgba(231,0,11,0.3)] hover:shadow-[0_6px_20px_rgba(231,0,11,0.4)]"
      >
        {status === 'loading' ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting…
          </span>
        ) : (
          'Submit Your Story'
        )}
      </button>
    </form>
  );
}
