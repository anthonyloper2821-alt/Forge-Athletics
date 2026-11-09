import React from 'react';
import { 
  X, 
  Flame, 
  Share2, 
  Database, 
  SlidersHorizontal, 
  Moon, 
  Sun, 
  UserCheck, 
  BookOpen, 
  Layers, 
  Sparkles,
  Zap,
  Target,
  Printer,
  Watch
} from 'lucide-react';
import { TrainingFrequency } from '../types/sport';
import { FREQUENCY_CONFIGS } from '../utils/adaptiveFrequency';

interface QuickGymToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWatchMode?: () => void;
  onOpenPlateCalculator?: () => void;
  onOpenWarmUpCalc: () => void;
  onOpenBevelExport: () => void;
  onOpenBackup: () => void;
  onOpenPrintModal?: () => void;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  autoAdvance: boolean;
  onToggleAutoAdvance: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  viewMode: 'athlete' | 'coach';
  onToggleViewMode: () => void;
  onNavigateTab: (tab: string) => void;
  trainingFrequency?: TrainingFrequency;
  onSelectFrequency?: (freq: TrainingFrequency) => void;
}

export const QuickGymToolsModal: React.FC<QuickGymToolsModalProps> = ({
  isOpen,
  onClose,
  onOpenWatchMode,
  onOpenPlateCalculator,
  onOpenWarmUpCalc,
  onOpenBevelExport,
  onOpenBackup,
  onOpenPrintModal,
  isFocusMode,
  onToggleFocusMode,
  autoAdvance,
  onToggleAutoAdvance,
  theme,
  onToggleTheme,
  viewMode,
  onToggleViewMode,
  onNavigateTab,
  trainingFrequency = 4,
  onSelectFrequency
}) => {
  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="tools-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
      >
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 id="tools-modal-title" className="text-sm font-bold text-slate-900 dark:text-white">
                Quick Gym Tools & Utilities
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                1-Tap controls without menu fumbling
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close tools menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Weekly Training Split Frequency */}
          {onSelectFrequency && (
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center justify-between">
                <span>Weekly Training Split</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {FREQUENCY_CONFIGS[trainingFrequency].label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {([3, 4, 5] as TrainingFrequency[]).map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => onSelectFrequency(f)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      trainingFrequency === f
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20 font-extrabold'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{f} Days / Wk</div>
                    <div className="text-[9.5px] opacity-75 mt-0.5">{FREQUENCY_CONFIGS[f].badge}</div>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {FREQUENCY_CONFIGS[trainingFrequency].description}
              </p>
            </div>
          )}

          {/* Gym Floor Toggles */}
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Gym Floor Experience
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Focus / Minimal Mode Toggle */}
              <button
                type="button"
                onClick={onToggleFocusMode}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all min-h-[72px] ${
                  isFocusMode
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Zap className={`w-4 h-4 ${isFocusMode ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className="font-mono text-[10px] font-bold">
                    {isFocusMode ? 'ON' : 'OFF'}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold">Gym Focus Mode</div>
                  <div className="text-[10px] opacity-75">Hides menus & hero banner</div>
                </div>
              </button>

              {/* Auto-Advance Sets Toggle */}
              <button
                type="button"
                onClick={onToggleAutoAdvance}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all min-h-[72px] ${
                  autoAdvance
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Sparkles className={`w-4 h-4 ${autoAdvance ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <span className="font-mono text-[10px] font-bold">
                    {autoAdvance ? 'ON' : 'OFF'}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold">Auto-Advance</div>
                  <div className="text-[10px] opacity-75">Auto-scroll & quiet collapse</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Calculators & Sync */}
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Lifting Calculators & Export
            </div>
            <div className="space-y-2">
              {/* Apple Watch Companion */}
              {onOpenWatchMode && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenWatchMode();
                  }}
                  className="w-full p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-left flex items-center justify-between transition-colors min-h-[48px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Watch className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Apple Watch Companion</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-600 text-white">LIVE</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Direct wrist tracking &amp; superset auto-looping</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Open</span>
                </button>
              )}

              {/* Barbell Plate Calculator */}
              {onOpenPlateCalculator && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPlateCalculator();
                  }}
                  className="w-full p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-left flex items-center justify-between transition-colors min-h-[48px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Barbell Plate Calculator</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-600 text-white">NEW</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Visual sleeve graphics &amp; reverse barbell math</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Open</span>
                </button>
              )}

              {/* Ramp Calculator */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenWarmUpCalc();
                }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Warm-Up Ramp & Plate Calculator</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Calculate 45/25/10/5 plate stack per side</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Open</span>
              </button>

              {/* Print & Download Workouts */}
              {onOpenPrintModal && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPrintModal();
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between transition-colors min-h-[48px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Printer className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Print &amp; Download Workouts</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Print sheets, save PDF, or download CSV/HTML</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Print</span>
                </button>
              )}

              {/* Bevel Export */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBevelExport();
                }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Share to Bevel & Apple Health</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Format formatted workout summary / CSV</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Export</span>
              </button>

              {/* Data Backup */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBackup();
                }}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center justify-between transition-colors min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Backup & Restore Athlete Data</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Full JSON download / safe restore</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Manage</span>
              </button>
            </div>
          </div>

          {/* Quick Playbook & Science Links */}
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Playbook & Secondary Views
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateTab('positions');
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center gap-2 min-h-[44px]"
              >
                <Target className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Role Protocols</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateTab('progression');
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center gap-2 min-h-[44px]"
              >
                <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Progression Matrix</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateTab('testing');
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center gap-2 min-h-[44px]"
              >
                <UserCheck className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Testing & 1RM</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateTab('science');
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left flex items-center gap-2 min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Science Library</span>
              </button>
            </div>
          </div>

          {/* Quick Preferences: Theme & Role View */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <button
              type="button"
              onClick={onToggleViewMode}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px]"
            >
              <UserCheck className="w-4 h-4 text-emerald-500" />
              <span className="capitalize">{viewMode} Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
