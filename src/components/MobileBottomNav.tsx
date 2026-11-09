import React from 'react';
import { Dumbbell, Timer, TrendingUp, Sliders, CheckSquare } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenTimer: () => void;
  isTimerRunning?: boolean;
  timerSecondsRemaining?: number;
  onOpenQuickTools: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  isSimpleMode?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenTimer,
  isTimerRunning = false,
  timerSecondsRemaining,
  onOpenQuickTools,
  isFocusMode,
  onToggleFocusMode,
  isSimpleMode = false
}) => {
  // Format MM:SS for timer badge if running
  const formatTimerBadge = (seconds?: number) => {
    if (seconds === undefined) return '';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isWorkoutActive = activeTab === 'session' || activeTab === 'training';

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl transition-colors no-print"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className={`grid items-center h-14 max-w-md mx-auto px-1 ${isSimpleMode ? 'grid-cols-3' : 'grid-cols-4'}`}>
        {/* Tab 1: Workout / Gym Floor */}
        <button
          type="button"
          onClick={() => onSelectTab('session')}
          className={`flex flex-col items-center justify-center py-1 min-h-[44px] transition-colors relative ${
            activeTab === 'session' || activeTab === 'training'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Active Workout Tracker"
        >
          <div className="relative">
            <CheckSquare className="w-5 h-5" />
            {(activeTab === 'session' || activeTab === 'training') && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">
            {isSimpleMode ? 'Today' : 'Workout'}
          </span>
        </button>

        {/* Tab 2: Rest Timer (with Live Countdown badge if running) */}
        <button
          type="button"
          onClick={onOpenTimer}
          className={`flex flex-col items-center justify-center py-1 min-h-[44px] transition-colors relative ${
            isTimerRunning
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Rest Timer"
        >
          <div className="relative">
            <Timer className={`w-5 h-5 ${isTimerRunning ? 'animate-spin' : ''}`} />
            {isTimerRunning && timerSecondsRemaining !== undefined && timerSecondsRemaining > 0 && (
              <span className="absolute -top-1.5 -right-3.5 px-1 py-0.2 bg-emerald-600 text-white text-[9px] font-mono font-black rounded-full shadow-xs">
                {formatTimerBadge(timerSecondsRemaining)}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">
            {isTimerRunning && timerSecondsRemaining ? formatTimerBadge(timerSecondsRemaining) : 'Rest Timer'}
          </span>
        </button>

        {/* Tab 3: Progress & PRs */}
        <button
          type="button"
          onClick={() => onSelectTab('progress')}
          className={`flex flex-col items-center justify-center py-1 min-h-[44px] transition-colors ${
            activeTab === 'progress' || activeTab === 'testing'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
          aria-label="Progress & PR Tracker"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">
            {isSimpleMode ? 'Activity' : 'Progress'}
          </span>
        </button>

        {/* Tab 4: Quick Tools / Sheet (Hidden in Simple Mode) */}
        {!isSimpleMode && (
          <button
            type="button"
            onClick={onOpenQuickTools}
            className="flex flex-col items-center justify-center py-1 min-h-[44px] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            aria-label="Quick Gym Tools"
          >
            <Sliders className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Tools</span>
          </button>
        )}
      </div>
    </nav>
  );
};
