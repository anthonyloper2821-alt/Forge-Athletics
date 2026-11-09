import React from 'react';
import { Dumbbell, TrendingUp, BookOpen, Flame } from 'lucide-react';

export type MainTabType = 'train' | 'progress' | 'playbook';

interface BottomNavBarProps {
  activeMainTab: MainTabType;
  onSelectMainTab: (tab: MainTabType) => void;
  isSessionActive?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeMainTab,
  onSelectMainTab,
  isSessionActive
}) => {
  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors shadow-lg"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-3 h-14 max-w-md mx-auto px-2">
        {/* Tab 1: Train */}
        <button
          onClick={() => onSelectMainTab('train')}
          className={`flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] active:scale-95 ${
            activeMainTab === 'train'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
          aria-label="Train - Gym Floor & Workouts"
        >
          <div className="relative">
            <Dumbbell className={`w-5 h-5 ${activeMainTab === 'train' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {isSessionActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">Train</span>
        </button>

        {/* Tab 2: Progress */}
        <button
          onClick={() => onSelectMainTab('progress')}
          className={`flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] active:scale-95 ${
            activeMainTab === 'progress'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
          aria-label="Progress - 8-Week Tracker & Benchmarks"
        >
          <TrendingUp className={`w-5 h-5 ${activeMainTab === 'progress' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Progress</span>
        </button>

        {/* Tab 3: Playbook */}
        <button
          onClick={() => onSelectMainTab('playbook')}
          className={`flex flex-col items-center justify-center gap-1 transition-all min-h-[48px] active:scale-95 ${
            activeMainTab === 'playbook'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
          aria-label="Playbook - Roles, Matrices & Science"
        >
          <BookOpen className={`w-5 h-5 ${activeMainTab === 'playbook' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Playbook</span>
        </button>
      </div>
    </nav>
  );
};
