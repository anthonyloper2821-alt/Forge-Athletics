import React from 'react';
import { WifiOff, ShieldCheck } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-slate-900/95 dark:bg-slate-900/95 border border-emerald-500/40 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md transition-all animate-bounce-slight"
    >
      <div className="relative flex items-center justify-center">
        <WifiOff className="w-4 h-4 text-amber-400" />
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-emerald-400 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Offline Resilient
        </span>
        <span className="text-[11px] text-slate-300">
          Gym floor mode: all sets, timers & math cached locally.
        </span>
      </div>
    </div>
  );
};
