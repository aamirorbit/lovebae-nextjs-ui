'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const issueTypes = [
  { value: 'bug', label: 'Bug Report', emoji: '🐛' },
  { value: 'feature', label: 'Feature Request', emoji: '✨' },
  { value: 'account', label: 'Account Issue', emoji: '👤' },
  { value: 'billing', label: 'Billing Question', emoji: '💳' },
  { value: 'feedback', label: 'General Feedback', emoji: '💬' },
  { value: 'other', label: 'Other', emoji: '📝' },
];

const quickLinks = [
  {
    emoji: '📧',
    title: 'Email Us',
    description: 'Get a reply within 24 hours',
    action: 'support@lovebae.app',
    href: 'mailto:support@lovebae.app',
  },
  {
    emoji: '📖',
    title: 'Read Blog',
    description: 'Tips, guides & announcements',
    action: 'Visit blog',
    href: '/blog',
  },
  {
    emoji: '🎮',
    title: 'Play Games',
    description: 'Free couple games, no signup',
    action: 'Browse games',
    href: '/games',
  },
];

const faqs = [
  {
    q: 'How do I connect with my partner?',
    a: 'Once you create an account, you can invite your partner by sharing your unique couple code or sending them an invite link directly from the app.',
  },
  {
    q: 'Is my data private and secure?',
    a: "Absolutely! Your privacy is our top priority. Your data is only visible to you and your partner. We never share your personal information with third parties.",
  },
  {
    q: 'How does the 2-for-1 subscription work?',
    a: "One subscription covers both you and your partner! When either of you subscribes to Lovebae Premium, both accounts get access to all premium features.",
  },
  {
    q: 'Can I use Lovebae on multiple devices?',
    a: 'Yes! Your account syncs across all your devices. Log in on your phone, tablet, or any device and all your data will be there.',
  },
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', issueType: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F5] via-[#FFF5F8] to-white" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl" />
          <div className="relative container mx-auto px-4 text-center max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E7000B] mb-4">
              Support center
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-5 tracking-tight leading-[1.1]">
              How Can We Help?
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
              Have a question, found a bug, or just want to share feedback? We&apos;re
              here for you and your partner.
            </p>
          </div>
        </section>

        {/* Quick links */}
        <section className="border-y border-gray-100 bg-gray-50/60">
          <div className="container mx-auto px-4 py-10">
            <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group flex flex-col items-center text-center rounded-2xl bg-white border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-[#E7000B]/20"
                >
                  <span className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {link.emoji}
                  </span>
                  <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{link.description}</p>
                  <span className="text-sm font-medium text-[#E7000B]">{link.action}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section className="py-16" id="contact">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Fill out the form below and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            {/* Success state */}
            {submitStatus === 'success' && (
              <div className="text-center py-12 rounded-3xl border border-green-100 bg-green-50/40 mb-10">
                <span className="text-5xl block mb-4">🎉</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                <p className="text-gray-500 mb-6">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="text-[#E7000B] font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            )}

            {/* Error state */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 text-red-600 text-sm p-4 rounded-2xl mb-6" role="alert">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  Something went wrong. Please try again or email us at{' '}
                  <a href="mailto:support@lovebae.app" className="underline font-medium">
                    support@lovebae.app
                  </a>
                </span>
              </div>
            )}

            {submitStatus !== 'success' && (
              <div className="rounded-3xl border border-gray-100 bg-white p-6 md:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Issue type selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      What can we help with? <span className="text-[#E7000B]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {issueTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, issueType: type.value }))
                          }
                          className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                            formData.issueType === type.value
                              ? 'border-[#E7000B] bg-red-50/60 shadow-sm'
                              : 'border-gray-100 bg-gray-50/40 hover:border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-xl block mb-1.5">{type.emoji}</span>
                          <span
                            className={`text-sm font-medium ${
                              formData.issueType === type.value
                                ? 'text-[#E7000B]'
                                : 'text-gray-700'
                            }`}
                          >
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Your name <span className="text-[#E7000B]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Email <span className="text-[#E7000B]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Subject <span className="text-[#E7000B]">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Brief summary of your issue"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Message <span className="text-[#E7000B]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe your issue or feedback in detail..."
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:border-[#E7000B] focus:ring-2 focus:ring-[#E7000B]/10 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.issueType}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white bg-[#E7000B] hover:bg-[#C50009] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_12px_rgba(231,0,11,0.3)] hover:shadow-[0_6px_20px_rgba(231,0,11,0.4)]"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gray-50/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
              Quick answers to the most common questions.
            </p>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl bg-white border border-gray-100 transition-all duration-200 hover:border-[#E7000B]/20 hover:shadow-sm"
                >
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none p-6 flex items-center justify-between gap-4">
                    {faq.q}
                    <svg
                      className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <p className="px-6 pb-6 -mt-1 text-gray-500 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E7000B] via-[#D10009] to-[#FF4757]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative py-16">
            <div className="container mx-auto px-4 text-center text-white max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
                Can&apos;t find what you need?
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Join our community or explore everything Lovebae has to offer.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/waitlist"
                  className="inline-flex items-center bg-white text-[#E7000B] px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] btn-press"
                >
                  Join the Waitlist
                </Link>
                <Link
                  href="/games"
                  className="inline-flex items-center bg-white/15 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-white/25 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  Play Free Games
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
