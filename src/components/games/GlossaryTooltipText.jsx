'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import glossary from '@/content/games/glossary.json';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildPattern(terms) {
  const escaped = terms
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((term) => escapeRegExp(term).replace(/\\ /g, '\\s+'));

  if (!escaped.length) return null;
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

export default function GlossaryTooltipText({ text, className = '' }) {
  const containerRef = useRef(null);
  const [activeTerm, setActiveTerm] = useState(null);
  const [reportStatus, setReportStatus] = useState({});

  const submitDifficultWordReport = async ({ termId, word, definition, phrase }) => {
    if (!word || reportStatus[termId] === 'loading' || reportStatus[termId] === 'sent') return;

    setReportStatus((prev) => ({ ...prev, [termId]: 'loading' }));

    try {
      const pagePath = typeof window !== 'undefined' ? window.location.pathname : '';
      const response = await fetch('/api/glossary-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, definition, phrase, pagePath, source: 'game_glossary_tooltip' }),
      });

      if (!response.ok) throw new Error('Failed to submit report');

      setReportStatus((prev) => ({ ...prev, [termId]: 'sent' }));
    } catch (_) {
      setReportStatus((prev) => ({ ...prev, [termId]: 'error' }));
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target)) {
        setActiveTerm(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') setActiveTerm(null);
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setActiveTerm(null);
  }, [text]);

  if (!text || typeof text !== 'string') {
    return <>{text}</>;
  }

  const terms = Object.keys(glossary);
  const pattern = buildPattern(terms);

  if (!pattern) return <>{text}</>;

  const parts = text.split(pattern);

  return (
    <span ref={containerRef} className={`relative z-40 ${className}`}>
      {parts.map((part, idx) => {
        const key = part.toLowerCase();
        const explanation = glossary[key];
        const termId = `${key}-${idx}`;
        const isOpen = activeTerm === termId;

        if (!explanation) return <span key={`${part}-${idx}`}>{part}</span>;

        return (
          <span key={`${part}-${idx}`} className="relative inline-block align-baseline">
            <button
              type="button"
              className="inline rounded px-0.5 -mx-0.5 text-[#C21824] bg-[#E7000B]/5 border-b border-dotted border-[#E7000B]/60 cursor-pointer hover:bg-[#E7000B]/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E7000B]/30"
              onClick={(event) => {
                event.stopPropagation();
                setActiveTerm((prev) => (prev === termId ? null : termId));
              }}
              onFocus={() => setActiveTerm(termId)}
              aria-label={`${part}: ${explanation}`}
              aria-expanded={isOpen}
            >
              {part}
            </button>

            <span
              role="tooltip"
              className={`absolute left-1/2 top-full z-[70] mt-2 w-72 -translate-x-1/2 rounded-xl bg-gray-900 px-3 py-3 text-left text-xs leading-relaxed text-white shadow-xl transition-all duration-200 ${
                isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <p className="text-gray-100">{explanation}</p>
              <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                <span className="text-[11px] text-gray-300">Is this word difficult?</span>
                <button
                  type="button"
                  className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition-colors duration-200"
                  onClick={(event) => {
                    event.stopPropagation();
                    submitDifficultWordReport({
                      termId,
                      word: part.toLowerCase(),
                      definition: explanation,
                      phrase: text,
                    });
                  }}
                >
                  {reportStatus[termId] === 'loading'
                    ? 'Sending...'
                    : reportStatus[termId] === 'sent'
                      ? 'Reported'
                      : reportStatus[termId] === 'error'
                        ? 'Retry'
                        : 'Report'}
                </button>
              </div>
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function ReportDifficultWords({ context = '' }) {
  const modalRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [word, setWord] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle');
  const [pos, setPos] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (event) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    const visualX = rect.left;
    const visualY = rect.top;
    setPos({ x: visualX, y: visualY });
    dragOffsetRef.current = { x: event.clientX - visualX, y: event.clientY - visualY };
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      const w = modalRef.current?.offsetWidth || 360;
      const h = modalRef.current?.offsetHeight || 280;
      setPos({
        x: Math.min(Math.max(8, e.clientX - dragOffsetRef.current.x), window.innerWidth - w - 8),
        y: Math.min(Math.max(8, e.clientY - dragOffsetRef.current.y), window.innerHeight - h - 8),
      });
    };
    const onEnd = () => setDragging(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onEnd);
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onEnd); };
  }, [dragging]);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') setShow(false); };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const submit = async () => {
    const normalized = word.trim().toLowerCase();
    if (!normalized || status === 'loading') return;
    setStatus('loading');
    try {
      const pagePath = typeof window !== 'undefined' ? window.location.pathname : '';
      const res = await fetch('/api/glossary-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: normalized, note: note.trim(), phrase: context, pagePath, source: 'missing_glossary_word', isMissingGlossaryWord: true }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setWord('');
      setNote('');
    } catch (_) {
      setStatus('error');
    }
  };

  return (
    <>
      <div className="mt-3 text-center">
        <button
          type="button"
          className="text-[11px] text-gray-400 hover:text-[#C21824] transition-colors duration-200"
          onClick={() => { setPos(null); setShow(true); }}
        >
          Report the difficult words
        </button>
      </div>

      {mounted && show && createPortal(
        <div
          ref={modalRef}
          className={`fixed z-[100] w-[min(92vw,360px)] max-h-[70vh] overflow-hidden rounded-2xl border border-white/20 bg-gray-900 text-white shadow-2xl ${
            !pos ? 'left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2' : ''
          }`}
          style={pos ? { left: `${pos.x}px`, top: `${pos.y}px` } : undefined}
        >
          <div
            className={`flex items-center justify-between px-3 py-2 border-b border-white/15 bg-white/5 ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={handleDragStart}
          >
            <span className="text-xs font-semibold tracking-wide">Report the difficult words</span>
            <button
              type="button"
              className="rounded-md bg-white/10 px-2 py-1 text-[11px] hover:bg-white/20 transition-colors duration-200"
              onClick={() => setShow(false)}
            >
              Close
            </button>
          </div>
          <div className="max-h-[calc(70vh-40px)] overflow-y-auto p-3 text-xs">
            <p className="text-gray-200 mb-2">
              Add any word you find difficult. You can copy text and paste details below.
            </p>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Word to add (e.g. ecstasy)"
              className="w-full rounded-md bg-white/10 border border-white/20 px-2 py-1.5 text-xs text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note/context (you can paste sentence or explanation request)"
              rows={4}
              className="mt-2 w-full resize-y rounded-md bg-white/10 border border-white/20 px-2 py-1.5 text-xs text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[11px] text-gray-300">
                {status === 'sent' ? 'Thanks! Added to review queue.' : status === 'error' ? 'Could not send. Try again.' : 'Sent to content + Slack.'}
              </span>
              <button
                type="button"
                className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition-colors duration-200"
                onClick={submit}
              >
                {status === 'loading' ? 'Sending...' : status === 'sent' ? 'Sent' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
