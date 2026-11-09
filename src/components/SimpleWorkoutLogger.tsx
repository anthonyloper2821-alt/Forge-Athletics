import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  RotateCcw, 
  ArrowLeftRight, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SportProgram, DaySessionLog, WorkoutExerciseItem } from '../types/sport';
import { UserProfile } from '../types/profile';
import { dispatchWorkoutToNutriPulse, buildNutriPulseWorkoutData, NutriPulseWorkoutData } from '../utils/nutripulseSync';

interface SimpleWorkoutLoggerProps {
  program: SportProgram;
  activeProfile: UserProfile;
  activePhaseIndex: number;
  activeDayNumber: number;
  activeWeek: number;
  sessionLog: DaySessionLog;
  onUpdateExerciseLog: (exerciseId: string, setIndex: number, field: 'load' | 'reps' | 'completed', value: string | boolean) => void;
  onUpdateSessionMeta: (updates: Partial<DaySessionLog>) => void;
  onBackToOverview: () => void;
  onOpenSwapModal?: (exerciseId: string, name: string) => void;
  onStartRestTimer?: (restStr: string) => void;
  onAdvanceToNextDay?: () => void;
  swappedExercises?: Record<string, { name: string; equipment?: string }>;
}

export const SimpleWorkoutLogger: React.FC<SimpleWorkoutLoggerProps> = ({
  program,
  activeProfile,
  activePhaseIndex,
  activeDayNumber,
  activeWeek,
  sessionLog,
  onUpdateExerciseLog,
  onUpdateSessionMeta,
  onBackToOverview,
  onOpenSwapModal,
  onStartRestTimer,
  onAdvanceToNextDay,
  swappedExercises = {}
}) => {
  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const currentDay = currentPhase?.days?.find(d => d.dayNumber === activeDayNumber) || currentPhase?.days?.[0];
  const exercises = currentDay?.exercises || [];

  // Completed celebration toast state & NutriPulse sync info
  const [showCelebration, setShowCelebration] = useState(false);
  const [nutriPulseSyncInfo, setNutriPulseSyncInfo] = useState<NutriPulseWorkoutData | null>(null);

  // Extract set count from string (default 3)
  const getSetsCount = (targetStr: string): number => {
    const match = targetStr.match(/(\d+)\s*[x×]/i);
    return match ? Math.min(Math.max(parseInt(match[1], 10), 1), 6) : 3;
  };

  // Helper to get default or last load for an exercise
  // Handle toggling set completion
  const handleToggleSet = (ex: WorkoutExerciseItem, setIdx: number) => {
    const entries = sessionLog.exerciseLogs[ex.id] || [];
    const isCurrentlyDone = entries[setIdx]?.completed || false;
    const newStatus = !isCurrentlyDone;

    // If no reps was set, default to prescribed reps
    if (!entries[setIdx]?.reps) {
      const matchReps = ex.targetSetsReps.match(/[x×]\s*([0-9-]+)/i);
      const reps = matchReps ? matchReps[1] : '10';
      onUpdateExerciseLog(ex.id, setIdx, 'reps', reps);
    }

    onUpdateExerciseLog(ex.id, setIdx, 'completed', newStatus);

    // If marked done, trigger subtle rest timer automatically
    if (newStatus && onStartRestTimer) {
      onStartRestTimer(ex.rest || '60s');
    }
  };

  // Calculate completion percentage
  const stats = useMemo(() => {
    let total = 0;
    let done = 0;
    let completedExCount = 0;

    exercises.forEach(ex => {
      const count = getSetsCount(ex.targetSetsReps);
      total += count;
      const entries = sessionLog.exerciseLogs[ex.id] || [];
      let exAllDone = true;
      for (let s = 0; s < count; s++) {
        if (entries[s]?.completed) {
          done++;
        } else {
          exAllDone = false;
        }
      }
      if (exAllDone && count > 0) {
        completedExCount++;
      }
    });

    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, completedExCount, percent };
  }, [exercises, sessionLog.exerciseLogs]);

  // Finish Workout Action
  const handleFinishWorkout = () => {
    onUpdateSessionMeta({ completed: true, date: new Date().toISOString() });
    
    // Broadcast workout completed event to NutriPulse nutrition app
    const syncData = buildNutriPulseWorkoutData({
      dayName: currentDay?.name || 'Strength & Conditioning Workout',
      focus: currentDay?.focus,
      sportTitle: program.name,
      exerciseCount: exercises.length,
      totalSets: stats.total
    });
    dispatchWorkoutToNutriPulse(syncData);
    setNutriPulseSyncInfo(syncData);

    setShowCelebration(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-32">
      {/* Sticky Top Bar for In-Gym Navigation */}
      <div className="sticky top-14 sm:top-16 z-30 -mx-2.5 sm:mx-0 px-3 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
        <button
          type="button"
          onClick={onBackToOverview}
          className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Plan Overview</span>
        </button>

        <div className="text-center min-w-0">
          <div className="text-xs font-black text-slate-900 dark:text-white truncate">
            Day {activeDayNumber} · {currentDay?.name?.replace(/^Day\s*\d+\s*[-–]\s*/i, '')}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            {stats.done} of {stats.total} Sets Finished ({stats.percent}%)
          </div>
        </div>

        <button
          type="button"
          onClick={handleFinishWorkout}
          className="py-1.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-xs min-h-[40px] shrink-0"
        >
          Finish
        </button>
      </div>

      {/* Celebration Toast Card (when finished) */}
      {showCelebration && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-xl space-y-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-950 text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight">
                Workout Complete! Great job, {activeProfile.name}!
              </div>
              <div className="text-xs font-medium text-slate-900/90">
                All {stats.completedExCount} exercises completed and saved to your activity history.
              </div>
            </div>
          </div>

          {/* NutriPulse Broadcast Confirmation */}
          {nutriPulseSyncInfo && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/15 text-slate-950 text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>
                Synced to <strong>NutriPulse</strong> ({nutriPulseSyncInfo.caloriesBurned} kcal · {nutriPulseSyncInfo.duration} min · {nutriPulseSyncInfo.category.toUpperCase()})
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setShowCelebration(false);
                if (onAdvanceToNextDay) onAdvanceToNextDay();
                onBackToOverview();
              }}
              className="py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
            >
              Back to Today's Hub
            </button>
            <button
              type="button"
              onClick={() => setShowCelebration(false)}
              className="py-2.5 px-3 rounded-xl bg-emerald-600/30 text-slate-950 text-xs font-bold hover:bg-emerald-600/40"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Clean Exercise Cards List */}
      <div className="space-y-4">
        {exercises.map((ex, exIdx) => {
          const setsCount = getSetsCount(ex.targetSetsReps);
          const entries = sessionLog.exerciseLogs[ex.id] || [];
          const swapped = swappedExercises[ex.id];
          const displayName = swapped ? swapped.name : ex.name;

          // Check if all sets for this exercise are done
          let completedInThisEx = 0;
          for (let s = 0; s < setsCount; s++) {
            if (entries[s]?.completed) completedInThisEx++;
          }
          const isExDone = setsCount > 0 && completedInThisEx >= setsCount;

          return (
            <div 
              key={ex.id}
              className={`rounded-3xl p-5 border transition-all ${
                isExDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {/* Header: Name, Target & Swap Button */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {exIdx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate">
                      {displayName}
                    </h3>
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium pl-8">
                    Target: <span className="font-bold text-slate-800 dark:text-slate-200">{ex.targetSetsReps}</span>
                    {ex.rest && (
                      <span className="ml-2 text-slate-400 dark:text-slate-500">
                        · Rest {ex.rest}
                      </span>
                    )}
                  </div>
                </div>

                {/* 1-Tap Equipment Swap button */}
                {onOpenSwapModal && (
                  <button
                    type="button"
                    onClick={() => onOpenSwapModal(ex.id, displayName)}
                    className="p-2 min-h-[40px] rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-400 text-xs font-semibold flex items-center gap-1 shrink-0 border border-slate-200 dark:border-slate-700 transition-colors"
                    title="Swap exercise if equipment is taken"
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 text-amber-500" />
                    <span className="hidden sm:inline">Swap</span>
                  </button>
                )}
              </div>

              {/* Coaching Cue (Simple 1-line plain English advice) */}
              {ex.progressionCue && (
                <div className="py-2.5 px-3 my-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="leading-snug">{ex.progressionCue}</span>
                </div>
              )}



              {/* Big Tactile Set Rows with Per-Set Resistance Input */}
              <div className="space-y-2.5 pt-2">
                {Array.from({ length: setsCount }).map((_, setIdx) => {
                  const entry = entries[setIdx];
                  const isDone = entry?.completed || false;
                  const setReps = entry?.reps || ex.targetSetsReps.match(/[x×]\s*([0-9-]+)/i)?.[1] || '10';

                  return (
                    <div
                      key={setIdx}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                        isDone
                          ? 'bg-emerald-500/15 dark:bg-emerald-950/40 border-emerald-500/60 shadow-2xs'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {/* Left: Set Number & Prescription */}
                      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                          isDone 
                            ? 'bg-emerald-500 text-slate-950 font-black shadow-xs' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {setIdx + 1}
                        </span>

                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            Set {setIdx + 1}:
                          </span>
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {setReps} reps @
                          </span>

                          {/* Per-Set Custom Resistance Input (Completely Independent) */}
                          <div className="relative min-w-[95px] max-w-[140px]">
                            <input
                              type="text"
                              value={entry?.load ?? ''}
                              placeholder="e.g. 25 lbs"
                              onChange={(e) => onUpdateExerciseLog(ex.id, setIdx, 'load', e.target.value)}
                              aria-label={`Set ${setIdx + 1} resistance`}
                              className={`w-full py-1.5 px-2.5 rounded-xl font-mono text-xs font-bold border transition-all text-left ${
                                isDone
                                  ? 'bg-emerald-500/20 dark:bg-emerald-900/40 border-emerald-400 text-emerald-950 dark:text-emerald-100 placeholder:text-emerald-700 dark:placeholder:text-emerald-400'
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right: Tactile Check / Done Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleSet(ex, setIdx)}
                        className={`px-3.5 py-2 min-h-[42px] rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-xs ${
                          isDone
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                            : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-750 dark:hover:bg-slate-700 text-white'
                        }`}
                        aria-label={`Mark set ${setIdx + 1} ${isDone ? 'incomplete' : 'done'}`}
                      >
                        {isDone ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Done</span>
                          </>
                        ) : (
                          <>
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 inline-block" />
                            <span>Check</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Big Finish Button at Bottom */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleFinishWorkout}
          className="w-full py-4 px-6 min-h-[56px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black text-lg tracking-tight shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5"
        >
          <Check className="w-5 h-5 stroke-[3]" />
          <span>Finish &amp; Complete Workout</span>
        </button>
      </div>
    </div>
  );
};
