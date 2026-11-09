import React, { useState } from 'react';
import { 
  Timer, 
  UserCheck, 
  Dumbbell, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Flame, 
  Database, 
  TrendingUp, 
  BookOpen, 
  Layers, 
  CheckSquare, 
  Award,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Watch
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface SportHeaderProps {
  onOpenWatchMode?: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  viewMode: 'athlete' | 'coach';
  onToggleViewMode: () => void;
  onOpenTimer: () => void;
  isTimerRunning?: boolean;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenPlateCalculator?: () => void;
  onOpenWarmUpCalculator?: () => void;
  onOpenBackup?: () => void;
  activeProfile?: { name: string; avatarLabel: string; mode: string };
  isSimpleMode?: boolean;
  onOpenProfileSwitcher?: () => void;
  onToggleExperienceMode?: () => void;
}

export const SportHeader: React.FC<SportHeaderProps> = ({
  activeTab,
  onSelectTab,
  viewMode,
  onToggleViewMode,
  onOpenTimer,
  isTimerRunning,
  theme,
  onToggleTheme,
  onOpenPlateCalculator,
  onOpenWarmUpCalculator,
  onOpenBackup,
  activeProfile,
  isSimpleMode = false,
  onOpenProfileSwitcher,
  onToggleExperienceMode,
  onOpenWatchMode
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Grouped Navigation Buckets for the desktop center bar (Simplified in Simple Mode)
  const primaryBuckets = isSimpleMode
    ? [
        {
          id: 'train',
          label: 'Today',
          icon: Dumbbell,
          matches: ['training', 'session']
        },
        {
          id: 'progress',
          label: 'Activity',
          icon: TrendingUp,
          matches: ['progress', 'testing']
        }
      ]
    : [
        {
          id: 'train',
          label: 'Train',
          icon: Dumbbell,
          matches: ['training', 'session']
        },
        {
          id: 'progress',
          label: 'Progress',
          icon: TrendingUp,
          matches: ['progress', 'testing']
        },
        {
          id: 'playbook',
          label: 'Playbook',
          icon: BookOpen,
          matches: ['positions', 'progression', 'science']
        }
      ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMenuOpen(false);
  };

  return (
    <header 
      className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors pt-safe"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavClick('session')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-950 dark:bg-emerald-500/10 flex items-center justify-center text-white font-bold text-sm border border-slate-800 dark:border-emerald-500/30 group-hover:border-emerald-500/50 transition-colors">
                <Dumbbell className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <div className="flex flex-col text-left">
                <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 whitespace-nowrap leading-none">
                  <span className="tracking-wider">FORGE</span>
                </div>
                <span className="hidden sm:inline text-[9px] font-mono font-bold text-slate-400 dark:text-slate-400 tracking-tight mt-0.5 whitespace-nowrap">
                  Built under pressure · Driven by science
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Core Hub Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-semibold">
            {primaryBuckets.map(bucket => {
              const isActive = bucket.matches.includes(activeTab);
              const Icon = bucket.icon;
              return (
                <button
                  key={bucket.id}
                  onClick={() => {
                    if (bucket.id === 'train') {
                      onSelectTab(activeTab === 'session' ? 'training' : 'session');
                    } else if (bucket.id === 'progress') {
                      onSelectTab('progress');
                    } else if (bucket.id === 'playbook') {
                      onSelectTab('positions');
                    }
                  }}
                  className={`relative py-2 transition-colors whitespace-nowrap min-h-[44px] flex items-center gap-2 ${
                    isActive
                      ? 'text-slate-950 dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                  <span>{bucket.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Profile Switcher & Clean Menu Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            {activeProfile && onOpenProfileSwitcher && (
              <button
                type="button"
                onClick={onOpenProfileSwitcher}
                className={`flex items-center gap-2 px-2.5 py-1.5 min-h-[40px] text-xs font-bold rounded-xl transition-all border ${
                  isSimpleMode
                    ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
                title="Switch active user profile"
                aria-label={`Current Profile: ${activeProfile.name}`}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {activeProfile.avatarLabel || activeProfile.name.charAt(0)}
                </div>
                <span className="font-extrabold max-w-[80px] sm:max-w-none truncate">{activeProfile.name}</span>
                <span className="hidden sm:inline text-[10px] opacity-75 font-mono px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700">
                  {isSimpleMode ? 'Simple' : 'Adv'}
                </span>
              </button>
            )}


            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center gap-2 px-3 py-2 min-h-[40px] text-xs font-semibold rounded-lg transition-all border ${
                menuOpen
                  ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 dark:border-emerald-400 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
              aria-label="Toggle Navigation & Gym Tools Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              )}
              <span className="font-bold">Menu</span>
              {isTimerRunning && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Timer Running" />
              )}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMPREHENSIVE MENU PANEL (Selectors, Tools & Navigation) */}
        {/* ======================================================== */}
        {menuOpen && (
          <div className="py-5 border-t border-slate-200 dark:border-slate-800 animate-fadeIn max-h-[calc(100dvh-4.5rem)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-3">
              
              {/* Column 1: Mode Selectors & App Preferences */}
              <div className="space-y-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Preferences &amp; Selectors</span>
                </div>

                {/* Coach vs. Athlete View Mode Selector */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Training Interface Mode
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        if (viewMode !== 'athlete') onToggleViewMode();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'athlete'
                          ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Athlete</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (viewMode !== 'coach') onToggleViewMode();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'coach'
                          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Coach</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight pt-0.5">
                    {viewMode === 'athlete' 
                      ? 'Streamlined for sets, loads & rest on the gym floor.' 
                      : 'Includes periodization science, loading targets & coach cues.'}
                  </p>
                </div>

                {/* Dark / Light Theme Mode Selector */}
                <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Color Theme
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => {
                        if (theme !== 'dark') onToggleTheme();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <Moon className="w-3.5 h-3.5 text-slate-300" />
                      <span>Dark Theme</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (theme !== 'light') onToggleTheme();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-bold transition-all ${
                        theme === 'light'
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Light Theme</span>
                    </button>
                  </div>
                </div>

                {/* PWA Install Button */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <PWAInstallButton />
                </div>
              </div>

              {/* Column 2: Quick Gym Tools & Calculators */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Gym Tools &amp; Calculators</span>
                </div>

                <div className="space-y-2">
                  {/* Apple Watch Companion */}
                  {onOpenWatchMode && (
                    <button
                      type="button"
                      onClick={() => {
                        onOpenWatchMode();
                        setMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-left transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <Watch className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>Apple Watch Companion</span>
                            <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-600 text-white">LIVE</span>
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            Log sets, reps &amp; superset rest on your wrist
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-500" />
                    </button>
                  )}

                  {/* Rest Timer Button */}
                  <button
                    onClick={() => {
                      onOpenTimer();
                      setMenuOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-left transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <Timer className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          Floating Rest Timer
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {isTimerRunning ? 'Running in background' : 'Auto-countdown on set completion'}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Barbell Plate Calculator */}
                  {onOpenPlateCalculator && (
                    <button
                      onClick={() => {
                        onOpenPlateCalculator();
                        setMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-left transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>Plate Calculator</span>
                            <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-blue-600 text-white">NEW</span>
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            Barbell visualizer &amp; reverse plate math
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                    </button>
                  )}

                  {/* Warm-Up Calculator */}
                  {onOpenWarmUpCalculator && (
                    <button
                      onClick={() => {
                        onOpenWarmUpCalculator();
                        setMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-left transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <Flame className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            Warm-Up Ramp &amp; Plates
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            Barbell math &amp; audible pacing
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  )}

                  {/* Data Backup & Export */}
                  {onOpenBackup && (
                    <button
                      onClick={() => {
                        onOpenBackup();
                        setMenuOpen(false);
                      }}
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-left transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                          <Database className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            Backup &amp; Export Data
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">
                            Save workout logs to JSON or restore
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Column 3: Navigation Hubs & Playbook */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Forge Navigation</span>
                </div>

                <div className="space-y-1.5">
                  <button
                    onClick={() => handleNavClick('session')}
                    className={`w-full text-left px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === 'session'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CheckSquare className="w-4 h-4" />
                      <span>Live Workout Logger</span>
                    </span>
                    {activeTab === 'session' && <span className="w-2 h-2 rounded-full bg-white" />}
                  </button>

                  <button
                    onClick={() => handleNavClick('training')}
                    className={`w-full text-left px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === 'training'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" />
                      <span>Training Plan Overview</span>
                    </span>
                    {activeTab === 'training' && <span className="w-2 h-2 rounded-full bg-white" />}
                  </button>

                  <button
                    onClick={() => handleNavClick('progress')}
                    className={`w-full text-left px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === 'progress'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>8-Week Volume &amp; Load Tracker</span>
                    </span>
                    {activeTab === 'progress' && <span className="w-2 h-2 rounded-full bg-white" />}
                  </button>

                  <button
                    onClick={() => handleNavClick('testing')}
                    className={`w-full text-left px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === 'testing'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Athletic Testing &amp; Standards</span>
                    </span>
                    {activeTab === 'testing' && <span className="w-2 h-2 rounded-full bg-white" />}
                  </button>

                  <button
                    onClick={() => handleNavClick('positions')}
                    className={`w-full text-left px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === 'positions'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>Tactical Role Specialization</span>
                    </span>
                    {activeTab === 'positions' && <span className="w-2 h-2 rounded-full bg-white" />}
                  </button>

                  <button
                    onClick={() => handleNavClick('science')}
                    className={`w-full text-left px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === 'science'
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>Sports Science Principles</span>
                    </span>
                    {activeTab === 'science' && <span className="w-2 h-2 rounded-full bg-white" />}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </header>
  );
};
