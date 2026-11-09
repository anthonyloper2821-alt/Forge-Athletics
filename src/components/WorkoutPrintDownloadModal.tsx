import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Copy, 
  Check, 
  Layers, 
  Calendar, 
  Dumbbell, 
  ExternalLink,
  Eye,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DaySessionLog, SportProgram } from '../types/sport';
import { 
  triggerPrintWorkout, 
  openPrintableInNewTab,
  downloadWorkoutHTMLFile, 
  downloadWorkoutScopeCSV
} from '../utils/printWorkout';
import { downloadWorkoutPDFFile } from '../utils/workoutPdfGenerator';
import { shareOrCopyWorkout, generateBevelSummary } from '../utils/workoutExport';

interface WorkoutPrintDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: SportProgram;
  activePhaseIndex: number;
  activeDayNumber: number;
  activeWeek: number;
  sessionLogs: Record<string, DaySessionLog>;
  currentSessionLog?: DaySessionLog;
  athleteName?: string;
}

export const WorkoutPrintDownloadModal: React.FC<WorkoutPrintDownloadModalProps> = ({
  isOpen,
  onClose,
  program,
  activePhaseIndex,
  activeDayNumber,
  activeWeek,
  sessionLogs,
  currentSessionLog,
  athleteName = 'Athlete'
}) => {
  const [scope, setScope] = useState<'day' | 'phase' | 'program'>('day');
  const [includeLogs, setIncludeLogs] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [statusNotice, setStatusNotice] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  if (!isOpen) return null;

  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const currentDay = currentPhase.days.find(d => d.dayNumber === activeDayNumber) || currentPhase.days[0];

  const printOptions = {
    program,
    scope,
    activePhaseIndex,
    activeDayNumber,
    activeWeek,
    sessionLogs,
    currentSessionLog,
    includeLogs,
    athleteName
  };

  const handleDownloadPDF = () => {
    try {
      setIsGeneratingPdf(true);
      setStatusNotice({ message: 'Generating vector PDF document...', type: 'info' });

      // Run asynchronously to allow UI to render spinner
      setTimeout(() => {
        try {
          downloadWorkoutPDFFile(printOptions);
          setIsGeneratingPdf(false);
          const scopeLabel = scope === 'day' ? `Day ${activeDayNumber}` : scope === 'phase' ? currentPhase.title : 'Full Program';
          setStatusNotice({ 
            message: `✓ Downloaded ${program.name} (${scopeLabel}) as PDF!`, 
            type: 'success' 
          });
          setTimeout(() => setStatusNotice(null), 5000);
        } catch (err: any) {
          setIsGeneratingPdf(false);
          console.error('PDF generation error', err);
          setStatusNotice({ 
            message: 'Direct PDF generator encountered an issue, falling back to HTML download...', 
            type: 'error' 
          });
          downloadWorkoutHTMLFile(printOptions);
        }
      }, 50);
    } catch (e: any) {
      setIsGeneratingPdf(false);
      downloadWorkoutHTMLFile(printOptions);
    }
  };

  const handlePrint = () => {
    setStatusNotice({ message: 'Opening system printer / print preview...', type: 'info' });
    const res = triggerPrintWorkout(printOptions);

    if (res.fallbackTriggered) {
      setStatusNotice({ 
        message: 'Printer dialog initiated! (If your browser blocks print popups in this preview, use "Download PDF Document" above).', 
        type: 'info' 
      });
    } else {
      setStatusNotice({ 
        message: '✓ System print dialog triggered.', 
        type: 'success' 
      });
    }
    setTimeout(() => setStatusNotice(null), 6000);
  };

  const handleOpenNewTab = () => {
    openPrintableInNewTab(printOptions);
    setStatusNotice({ 
      message: '✓ Opened printable sheet in a clean standalone window.', 
      type: 'success' 
    });
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handleDownloadHTML = () => {
    downloadWorkoutHTMLFile(printOptions);
    setStatusNotice({ 
      message: '✓ Downloaded standalone offline HTML sheet.', 
      type: 'success' 
    });
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handleDownloadCSV = () => {
    downloadWorkoutScopeCSV(printOptions);
    setStatusNotice({ 
      message: '✓ Downloaded spreadsheet CSV file.', 
      type: 'success' 
    });
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handleCopyMarkdown = async () => {
    const summary = generateBevelSummary({
      program,
      day: currentDay,
      phaseIndex: activePhaseIndex,
      phaseTitle: currentPhase.title,
      weekNumber: activeWeek,
      sessionLog: currentSessionLog || { completed: false, exerciseLogs: {} },
      athleteName
    });

    const res = await shareOrCopyWorkout(summary, `${program.name} - ${currentDay.name}`);
    if (res === 'copied') {
      setCopiedText(true);
      setStatusNotice({ message: '✓ Workout summary copied to clipboard!', type: 'success' });
      setTimeout(() => {
        setCopiedText(false);
        setStatusNotice(null);
      }, 3500);
    }
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[94dvh] sm:max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 id="print-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Print &amp; Download Workouts
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct PDF files, physical clipboard printouts, or spreadsheet CSV
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Status / Notice Toast */}
        {statusNotice && (
          <div className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between border-b ${
            statusNotice.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : statusNotice.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                : 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              {statusNotice.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : statusNotice.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin shrink-0" />
              )}
              <span>{statusNotice.message}</span>
            </div>
            <button 
              type="button" 
              onClick={() => setStatusNotice(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* 1. Scope Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              1. Select What to Print or Download:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setScope('day')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  scope === 'day'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${scope === 'day' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    Today's Session
                  </span>
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate">
                  Day {activeDayNumber}: {currentDay.name}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  ~{currentDay.timeBudgetMinutes}m · {currentDay.exercises.length} Exercises
                </div>
              </button>

              <button
                type="button"
                onClick={() => setScope('phase')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  scope === 'phase'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${scope === 'phase' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    Current Block
                  </span>
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate">
                  {currentPhase.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {currentPhase.days.length} Days ({currentPhase.weeks})
                </div>
              </button>

              <button
                type="button"
                onClick={() => setScope('program')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  scope === 'program'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-750 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${scope === 'program' ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                    Full 8-Week Plan
                  </span>
                  <Dumbbell className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[11px] font-medium text-slate-600 dark:text-slate-300 truncate">
                  Complete Handbook
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  All 4 Blocks · 16 Workouts
                </div>
              </button>
            </div>
          </div>

          {/* 2. Format / Log Data Option */}
          <div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  Clean Workout Prescription Format
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Formatted cleanly without space for performed sets/reps. Dedicates 100% of the page to movement directives, target sets × reps, rest intervals, and progression standards.
                </div>
              </div>
            </div>
          </div>

          {/* 3. Output Actions */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              3. Select Output Format:
            </label>

            {/* Featured Primary Card: 1-Click Direct Vector PDF Download */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg mb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-200" />
                    <span className="font-extrabold text-sm sm:text-base">
                      Download PDF Document (.pdf)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/30 text-[10px] font-bold text-emerald-100 uppercase tracking-wide">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    Generates a crisp, letter-formatted PDF file directly on your device. Works 100% reliably in all browsers and webviews.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPdf}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-98 shrink-0 min-h-[46px]"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                      <span>Creating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-emerald-700" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Secondary Print & Export Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Native Print Dialog Button */}
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-750 text-white font-bold text-xs border border-slate-700 transition-all active:scale-98 min-h-[44px]"
                title="Opens the system printer or AirPrint dialog"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>Print via System Dialog</span>
              </button>

              {/* Open in Standalone Tab */}
              <button
                type="button"
                onClick={handleOpenNewTab}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all active:scale-98 min-h-[44px]"
                title="Open in a clean full-screen tab where you can inspect or print"
              >
                <ExternalLink className="w-4 h-4 text-emerald-500" />
                <span>Open Sheet in New Tab</span>
              </button>

              {/* Download Standalone HTML Card */}
              <button
                type="button"
                onClick={handleDownloadHTML}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all min-h-[44px]"
                title="Save self-contained interactive web card"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download HTML Sheet</span>
              </button>

              {/* Download CSV */}
              <button
                type="button"
                onClick={handleDownloadCSV}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all min-h-[44px]"
                title="Export structured data for Excel or Google Sheets"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                <span>Download CSV (Excel / Sheets)</span>
              </button>

              {/* Copy Markdown / Text Summary */}
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="sm:col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all min-h-[44px]"
              >
                {copiedText ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copy Clean Text Summary (Bevel / Notes)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Toggle Live Preview */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLivePreview ? 'Hide Sheet Preview' : 'Show Sheet Preview'}</span>
            </button>

            {showLivePreview && (
              <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 max-h-60 overflow-y-auto space-y-2">
                <div className="font-bold text-slate-900 dark:text-white border-b pb-1 dark:border-slate-800 break-words">
                  {program.name} · {currentDay.name} ({currentPhase.weeks})
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 break-words leading-relaxed">
                  Warm-Up: {currentDay.warmUpProtocol || 'General dynamic mobility'}
                </div>
                <div className="space-y-1.5 pt-1">
                  {currentDay.exercises.map((ex, i) => (
                    <div key={ex.id} className="flex items-start justify-between py-1 border-b border-slate-200/50 dark:border-slate-850 gap-2">
                      <span className="break-words min-w-0 flex-1 leading-snug">
                        {ex.supersetGroup ? `[${ex.supersetGroup}] ` : `${i + 1}. `}{ex.name}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 shrink-0 text-right font-medium">
                        {ex.targetSetsReps} · Rest {ex.rest}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 break-words leading-relaxed">
                  Cool-Down: {currentDay.coolDownProtocol || 'Decompression and static stretches'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span>Standard 8.5" × 11" Letter &amp; A4 formats supported</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
