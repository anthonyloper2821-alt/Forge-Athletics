import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Download, 
  Check, 
  FileSpreadsheet, 
  FileText, 
  Smartphone, 
  Info, 
  Zap,
  Dumbbell
} from 'lucide-react';
import { 
  WorkoutExportContext, 
  generateBevelSummary, 
  generateWorkoutCSV, 
  shareOrCopyWorkout, 
  downloadBlob 
} from '../utils/workoutExport';

interface BevelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportContext: WorkoutExportContext | null;
}

export const BevelExportModal: React.FC<BevelExportModalProps> = ({
  isOpen,
  onClose,
  exportContext
}) => {
  const [activeTab, setActiveTab] = useState<'share' | 'preview' | 'csv' | 'guide'>('share');
  const [copiedState, setCopiedState] = useState<'idle' | 'copied' | 'shared'>('idle');

  if (!isOpen || !exportContext) return null;

  const bevelSummaryText = generateBevelSummary(exportContext);
  const csvText = generateWorkoutCSV(exportContext);

  const handleShare = async () => {
    try {
      const result = await shareOrCopyWorkout(
        bevelSummaryText, 
        `${exportContext.program.name} - ${exportContext.day.name} Workout`
      );
      setCopiedState(result);
      setTimeout(() => setCopiedState('idle'), 3000);
    } catch {
      // fallback
    }
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(bevelSummaryText);
        setCopiedState('copied');
        setTimeout(() => setCopiedState('idle'), 3000);
      }
    } catch {
      // fallback
    }
  };

  const handleDownloadCSV = () => {
    const filename = `${exportContext.program.id}-${exportContext.day.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${exportContext.sessionLog.date || 'workout'}.csv`;
    downloadBlob(csvText, filename, 'text/csv');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bevel-modal-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 shadow-md">
              <Share2 className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="bevel-modal-title" className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Export & Sync with Bevel
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 uppercase">
                  Zero Double-Tracking
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {exportContext.program.name} · {exportContext.day.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 gap-1 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('share')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'share'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Quick Sync / Share</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'preview'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Formatted Notes</span>
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'csv'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>CSV Export</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'guide'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Bevel Setup Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeTab === 'share' && (
            <div className="space-y-4">
              {/* How it solves "no tracking twice" banner */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-emerald-300">
                    Seamless Bevel & Apple Health Integration
                  </div>
                  <p className="leading-relaxed">
                    Bevel reads your heart rate, strain, and active energy directly from Apple Health. Tap below to share or copy this session log directly into Bevel or Apple Notes so you never have to re-enter sets or exercises manually.
                  </p>
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-98"
                >
                  <Share2 className="w-4 h-4" />
                  <span>
                    {copiedState === 'shared' ? 'Opened iOS Share Sheet!' : '1-Tap Share (iOS Sheet / Bevel)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all active:scale-98"
                >
                  {copiedState === 'copied' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Formatted Notes</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Summary Preview Card */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Session Summary Ready for Export</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Date</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {exportContext.sessionLog.date || 'Today'}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Duration</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {exportContext.sessionLog.durationMinutes || exportContext.day.timeBudgetMinutes}m
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">RPE</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {exportContext.sessionLog.rpe || 7}/10
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Exercises</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {exportContext.day.exercises.length} Total
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Formatted Markdown & Text for notes or logging apps:
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
                >
                  {copiedState === 'copied' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedState === 'copied' ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-72 border border-slate-800 whitespace-pre-wrap select-all">
                {bevelSummaryText}
              </pre>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Standard spreadsheet CSV format (Excel, Google Sheets, Strong, Hevy):
                </span>
                <button
                  type="button"
                  onClick={handleDownloadCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .CSV</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto max-h-72 border border-slate-800 whitespace-pre select-all">
                {csvText}
              </pre>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                How to Track with Bevel Without Doing Double Work:
              </h3>
              
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="font-bold text-emerald-700 dark:text-emerald-400">
                  Step 1: Start 'Traditional Strength Training' on your Apple Watch or Bevel
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  When you walk into the gym, tap start on your Apple Watch workout. This accurately captures your active heart rate, calories burned, heart rate variability, and strain score.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="font-bold text-emerald-700 dark:text-emerald-400">
                  Step 2: Log your sets in Forge
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Forge handles your periodized loads, rest timer beeps, auto-advancing, and exercise alternatives.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <div className="font-bold text-emerald-700 dark:text-emerald-400">
                  Step 3: Tap 'Share to Bevel' at session end
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Tap '1-Tap Share' to open the iOS share sheet directly into Bevel notes, or copy the formatted breakdown into your workout record. Both your biological strain and your strength volume records stay in perfect sync!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV file</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
