import React from 'react';
import { ExerciseGuide, MovementCategory } from '../types/sport';
import { EXERCISE_DATABASE } from '../data/exerciseDatabase';
import { X, ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle2, BookOpen } from 'lucide-react';

interface ExerciseGuideModalProps {
  exerciseId: string | null;
  exerciseNameFallback?: string;
  onClose: () => void;
  onStartRestTimer?: (restStr: string) => void;
  onOpenSwapModal?: (exerciseId: string, name: string, catalogExerciseId?: string, category?: MovementCategory) => void;
  onOpenWarmUpCalculator?: (exerciseName: string) => void;
}

export const ExerciseGuideModal: React.FC<ExerciseGuideModalProps> = ({
  exerciseId,
  exerciseNameFallback,
  onClose,
  onStartRestTimer,
  onOpenSwapModal,
  onOpenWarmUpCalculator
}) => {
  if (!exerciseId) return null;

  const guide: ExerciseGuide | undefined = EXERCISE_DATABASE[exerciseId];
  const displayName = guide ? guide.name : (exerciseNameFallback || 'Exercise Guide');
  const category = guide ? guide.category : 'Movement Quality';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Top Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between z-10">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-0.5">
              {category} · Movement Guide
            </div>
            <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {displayName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-h-[40px] min-w-[40px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 text-slate-800 dark:text-slate-200">
          {guide ? (
            <>
              {/* Setup & Execution */}
              <div className="space-y-3.5">
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Setup & Body Position
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {guide.setup}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Execution & Movement Path
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {guide.execution}
                  </p>
                </div>
              </div>

              {/* Coaching Cue & Mistakes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
                    Primary Coaching Cue
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-emerald-950 dark:text-emerald-100 italic">
                    "{guide.cue}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-800/60">
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    Common Mistake to Avoid
                  </div>
                  <p className="text-xs sm:text-sm text-rose-950 dark:text-rose-200">
                    {guide.avoid}
                  </p>
                </div>
              </div>

              {/* Progressions & Regressions Engine */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Progression / Regression Engine (When to Scale)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Progression Card */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1.5">
                      <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Level Up (Progression):</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      {guide.progressTo}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-slate-800 dark:text-white">When to implement: </span>
                      {guide.whenToProgress}
                    </div>
                  </div>

                  {/* Regression Card */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-1.5">
                      <ArrowDownRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Scale Down (Regression):</span>
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-2">
                      {guide.regressTo}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-slate-800 dark:text-white">When to implement: </span>
                      {guide.whenToRegress}
                    </div>
                  </div>
                </div>
              </div>

              {/* In-Rack & Equipment Alternatives */}
              {guide.equipmentAlternatives && guide.equipmentAlternatives.length > 0 && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <span>In-Rack & Equipment Alternatives</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        {guide.equipmentAlternatives.length} Substitutes
                      </span>
                    </h3>
                    {onOpenSwapModal && (
                      <button
                        onClick={() => onOpenSwapModal(guide.id, guide.name, guide.id, guide.category)}
                        className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <span>Swap in Session</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {guide.equipmentAlternatives.map((alt, aIdx) => (
                      <div
                        key={aIdx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {alt.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                              {alt.equipment}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                            {alt.rationale}
                          </p>
                        </div>

                        {onOpenSwapModal && (
                          <button
                            onClick={() => onOpenSwapModal(guide.id, guide.name, guide.id, guide.category)}
                            className="self-end sm:self-center px-2.5 py-1.5 min-h-[32px] rounded-lg bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-bold text-[11px] transition-colors whitespace-nowrap shrink-0 shadow-xs"
                          >
                            Swap Alt
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sports Science Rationale */}
              {guide.sportsScienceRationale && (
                <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-slate-200 text-xs leading-relaxed border border-slate-800">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    Sports Science Research
                  </div>
                  <p className="text-slate-300">{guide.sportsScienceRationale}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mb-3">
                Movement guidelines for {displayName}.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
                <p>• <strong>Double Progression:</strong> Reach the rep ceiling for all sets with 2 clean reps in reserve before bumping load.</p>
                <p>• <strong>Two-Strike Rule:</strong> If missing rep floor 2 sessions in a row, drop load 10% and rebuild.</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            Form First · Clean Speed Beats Heavy Grinding
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenWarmUpCalculator && (
              <button
                onClick={() => {
                  onClose();
                  onOpenWarmUpCalculator(displayName);
                }}
                className="flex-1 sm:flex-none px-3.5 py-2 min-h-[40px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
              >
                Warm-Up Ramp Calc
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 min-h-[40px] bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 text-xs font-semibold rounded-lg transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
