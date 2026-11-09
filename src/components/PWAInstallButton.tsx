import React, { useState, useEffect } from 'react';
import { Download, Share2, X, Smartphone, CheckCircle2, PlusSquare, ArrowRight, Copy, Check, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowIOSGuide(false);
      }
    };
    if (showIOSGuide) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showIOSGuide]);

  // If already running as an installed PWA in standalone mode, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 min-h-[40px] text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
        title="Install Forge for 100% offline gym floor use"
        aria-label="Install App"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">Install</span>
      </button>
    );
  }

  const directUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(directUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 3000);
      }
    } catch {
      // fallback
    }
  };

  // iOS Safari / Brave / Chrome on iOS flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 min-h-[40px] text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none active:scale-95"
          title="Install on iPhone / iPad without Google AI Studio wrapper"
          aria-label="Install on iOS"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">Install</span>
        </button>

        {showIOSGuide && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowIOSGuide(false);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 relative my-auto max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/60 dark:bg-slate-950/40">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 id="ios-install-title" className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      Install on iPhone / iPad
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Standalone Home Screen App (No AI Studio)
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  aria-label="Close install instructions"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
                {/* Notice: Why AI Studio appeared */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 dark:text-amber-300 space-y-1 text-[11px] leading-relaxed">
                  <div className="font-bold flex items-center gap-1.5">
                    <span>💡 How to Avoid the "Google AI Studio" Label:</span>
                  </div>
                  <p>
                    If you tap <em>Share → Add to Home Screen</em> while inside the AI Studio editor page, iOS bookmarks the AI Studio website.
                  </p>
                  <p>
                    Instead, open this <strong>direct app link</strong> directly in Safari or Brave:
                  </p>
                  <div className="pt-1 flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-600 dark:bg-amber-500 text-white font-bold text-[11px] flex items-center gap-1 hover:bg-amber-700 transition active:scale-95 shadow-xs"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Link Copied!' : 'Copy Direct App Link'}</span>
                    </button>
                    <a
                      href={directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[11px] flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in New Tab</span>
                    </a>
                  </div>
                </div>

                {/* Steps List */}
                <div className="space-y-2.5 bg-slate-50 dark:bg-slate-950/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Installation Steps (in Safari or Brave):
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5 shadow-xs">
                      1
                    </span>
                    <div className="leading-snug">
                      <span>Open the direct app link in </span>
                      <strong className="text-slate-900 dark:text-white font-semibold">Safari</strong>
                      <span> (or Brave/Chrome on iOS).</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5 shadow-xs">
                      2
                    </span>
                    <div className="leading-snug">
                      <span>Tap the </span>
                      <strong className="text-slate-900 dark:text-white inline-flex items-center gap-1 font-semibold">
                        <Share2 className="w-3.5 h-3.5 text-blue-500 inline" /> Share
                      </strong>
                      <span> icon in your browser bar.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5 shadow-xs">
                      3
                    </span>
                    <div className="leading-snug">
                      <span>Select </span>
                      <strong className="text-slate-900 dark:text-white inline-flex items-center gap-1 font-semibold">
                        <PlusSquare className="w-3.5 h-3.5 text-emerald-500 inline" /> Add to Home Screen
                      </strong>
                      <span>. It will automatically be named </span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Forge</strong>.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-[10px] shrink-0 mt-0.5 shadow-xs">
                      4
                    </span>
                    <div className="leading-snug">
                      <span>Tap </span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Add</strong>
                      <span> in the top-right corner.</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex items-center gap-2 text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>Runs full-screen with zero browser bars & 100% offline access.</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 shrink-0">
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="w-full py-2.5 sm:py-3 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <span>Got It, Thanks!</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
