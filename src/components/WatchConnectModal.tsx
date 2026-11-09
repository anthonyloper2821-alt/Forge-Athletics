import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { 
  Watch, 
  X, 
  Copy, 
  Check, 
  MessageSquare, 
  ExternalLink, 
  Smartphone, 
  Sparkles,
  Info
} from 'lucide-react';
import { SportProgram } from '../types/sport';

interface WatchConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchSimulator: () => void;
  program: SportProgram;
  selectedSport: string;
  activeWeek: number;
  activePhaseIndex: number;
  activeDayNumber: number;
  activePosition: string;
}

export const WatchConnectModal: React.FC<WatchConnectModalProps> = ({
  isOpen,
  onClose,
  onLaunchSimulator,
  program,
  selectedSport,
  activeWeek,
  activePhaseIndex,
  activeDayNumber,
  activePosition
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Construct direct Watch URL with preset parameters
  const watchUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?watch=1&sport=${encodeURIComponent(selectedSport)}&week=${activeWeek}&phase=${activePhaseIndex}&day=${activeDayNumber}&role=${encodeURIComponent(activePosition || '')}`
    : '';

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !watchUrl) return;

    QRCode.toCanvas(
      canvasRef.current,
      watchUrl,
      {
        width: 180,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      },
      (error) => {
        if (error) console.error('Failed to generate QR code:', error);
      }
    );
  }, [isOpen, watchUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(watchUrl);
      } else {
        const input = document.createElement('input');
        input.value = watchUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const smsUrl = `sms:&body=${encodeURIComponent(`Forge Apple Watch Session: ${watchUrl}`)}`;
  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const currentDay = currentPhase?.days?.find(d => d.dayNumber === activeDayNumber) || currentPhase?.days?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
              <Watch className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Apple Watch Connect</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                  Direct Wrist Access
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log reps &amp; resistance straight from your wrist
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors min-h-[36px] min-w-[36px]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Active Workout Snapshot */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Session Target
              </span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                {program.name} · Day {activeDayNumber}
              </span>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate max-w-[220px]">
                {currentDay?.name || currentDay?.focus || 'Main Workout'}
              </div>
            </div>
            <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
              Week {activeWeek}
            </div>
          </div>

          {/* Direct Apple Watch Instructions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>How To Open On Your Apple Watch</span>
            </h3>

            {/* Method 1: iMessage to Self */}
            <a
              href={smsUrl}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm tracking-tight shadow-md hover:shadow-lg transition-all min-h-[48px] group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-extrabold leading-tight">Text Link to Myself (iMessage)</div>
                  <div className="text-[11px] font-normal text-slate-900/80">Opens Messages on iPhone &rarr; Send to Watch</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>

            {/* Method 2: Copy Direct Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-xs font-bold min-h-[48px] ${
                copied
                  ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? 'Direct Watch Link Copied!' : 'Copy Direct Watch Link'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Tap to copy</span>
            </button>
          </div>

          {/* QR Code Scan */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center text-center space-y-3">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-inner">
              <canvas ref={canvasRef} className="block mx-auto rounded-lg" />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">
              Or scan this QR code with your iPhone camera to open and share directly with your Apple Watch.
            </div>
          </div>

          {/* Step by step tip */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Apple Watch Wrist Tip</span>
            </div>
            <p className="text-[11px] leading-relaxed opacity-90">
              Once you text or mail the link to yourself, raise your wrist, tap the notification in <strong>Messages</strong> or <strong>Mail</strong> on your Apple Watch, and it will load the edge-to-edge tracker right on your watch screen!
            </p>
          </div>
        </div>

        {/* Footer: Simulator Fallback */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            type="button"
            onClick={onLaunchSimulator}
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-500 font-bold flex items-center gap-1.5 transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Preview Watch Screen Here</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
