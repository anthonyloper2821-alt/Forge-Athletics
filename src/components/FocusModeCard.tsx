import React from 'react';
import { 
  WorkoutDay, 
  DaySessionLog, 
  WorkoutExerciseItem, 
  MovementCategory 
} from '../types/sport';
import { 
  Check, 
  Clock, 
  Flame, 
  ArrowLeftRight, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  Award,
  Zap,
  Sparkles
} from 'lucide-react';

interface FocusModeCardProps {
  currentDay: WorkoutDay;
  sessionLog: DaySessionLog;
  focusExerciseIndex: number;
  onSelectExerciseIndex: (idx: number) => void;
  getEffectiveSetsCount: (ex: WorkoutExerciseItem) => number;
  onUpdateExerciseLog: (exerciseId: string, setIndex: number, field: 'load' | 'reps' | 'completed', value: string | boolean) => void;
  onQuickLogSet?: (exerciseId: string, setIndex: number, load: string, reps: string) => void;
  onStartRestTimer: (restStr: string) => void;
  onOpenWarmUpCalculator?: (name: string, initialWeight?: number) => void;
  onOpenSwapModal?: (exerciseId: string, name: string, catalogExerciseId?: string, category?: MovementCategory) => void;
  onOpenExerciseGuide: (exerciseId: string, name: string) => void;
  onFinishWorkout: () => void;
}

export const FocusModeCard: React.FC<FocusModeCardProps> = ({
  currentDay,
  sessionLog,
  focusExerciseIndex,
  onSelectExerciseIndex,
  getEffectiveSetsCount,
  onUpdateExerciseLog,
  onQuickLogSet,
  onStartRestTimer,
  onOpenWarmUpCalculator,
  onOpenSwapModal,
  onOpenExerciseGuide,
  onFinishWorkout
}) => {
  const safeIndex = Math.min(Math.max(focusExerciseIndex, 0), currentDay.exercises.length - 1);
  const ex = currentDay.exercises[safeIndex] || currentDay.exercises[0];

  if (!ex) return null;

  const setsCount = getEffectiveSetsCount(ex);
  const exerciseEntries = sessionLog.exerciseLogs[ex.id] || [];
  const swapped = sessionLog.swappedExercises?.[ex.id];
  const activeDisplayName = swapped?.name || ex.name;

  // Find the first uncompleted set index
  let activeSetIdx = exerciseEntries.findIndex((s, idx) => idx < setsCount && !s.completed);
  if (activeSetIdx === -1) {
    if (exerciseEntries.length >= setsCount && exerciseEntries.slice(0, setsCount).every(s => s.completed)) {
      activeSetIdx = setsCount; // All sets complete
    } else {
      activeSetIdx = exerciseEntries.length < setsCount ? exerciseEntries.length : 0;
    }
  }

  const isAllSetsComplete = activeSetIdx >= setsCount;

  // Determine current working set values (or inherit from previous set)
  const currentSetEntry = exerciseEntries[activeSetIdx];
  const prevSetEntry = activeSetIdx > 0 ? exerciseEntries[activeSetIdx - 1] : undefined;

  // Fallback target reps
  const targetRepsMatch = ex.targetSetsReps.match(/x\s*(\d+)/i);
  const defaultReps = targetRepsMatch ? targetRepsMatch[1] : '8';

  const workingLoad = currentSetEntry?.load || prevSetEntry?.load || '';
  const workingReps = currentSetEntry?.reps || prevSetEntry?.reps || defaultReps;

  const firstSetNumericLoad = exerciseEntries[0]?.load 
    ? parseFloat(exerciseEntries[0].load.replace(/[^0-9.]/g, '')) 
    : undefined;

  // Quick steppers
  const handleDeltaLoad = (delta: number) => {
    const currentNum = parseFloat((workingLoad || '0').replace(/[^0-9.]/g, '')) || 0;
    const nextNum = Math.max(0, currentNum + delta);
    onUpdateExerciseLog(ex.id, activeSetIdx, 'load', `${nextNum}`);
    if (!currentSetEntry?.reps) {
      onUpdateExerciseLog(ex.id, activeSetIdx, 'reps', workingReps);
    }
  };

  const handleDeltaReps = (delta: number) => {
    const currentNum = parseInt((workingReps || '8').replace(/[^0-9]/g, ''), 10) || 8;
    const nextNum = Math.max(1, currentNum + delta);
    onUpdateExerciseLog(ex.id, activeSetIdx, 'reps', `${nextNum}`);
  };

  // 1-Tap Log Set
  const handleLogActiveSet = () => {
    const loadToSave = workingLoad || '0';
    const repsToSave = workingReps || defaultReps;

    if (onQuickLogSet) {
      onQuickLogSet(ex.id, activeSetIdx, loadToSave, repsToSave);
    } else {
      onUpdateExerciseLog(ex.id, activeSetIdx, 'load', loadToSave);
      onUpdateExerciseLog(ex.id, activeSetIdx, 'reps', repsToSave);
      onUpdateExerciseLog(ex.id, activeSetIdx, 'completed', true);
    }

    // Rest timer trigger
    onStartRestTimer(ex.rest || '90s');

    // If this was the last set for this exercise, automatically check next exercise
    if (activeSetIdx + 1 >= setsCount) {
      if (safeIndex + 1 < currentDay.exercises.length) {
        onSelectExerciseIndex(safeIndex + 1);
      }
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* 1. Horizontal Exercise Stepper Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {currentDay.exercises.map((item, idx) => {
          const itemSets = getEffectiveSetsCount(item);
          const itemEntries = sessionLog.exerciseLogs[item.id] || [];
          const itemDone = itemSets > 0 && itemEntries.slice(0, itemSets).filter(s => s?.completed).length === itemSets;
          const isCurrent = idx === safeIndex;

          return (
            <button
              key={item.id}
              onClick={() => onSelectExerciseIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 border ${
                isCurrent
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/30 font-bold'
                  : itemDone
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                isCurrent
                  ? 'bg-white text-slate-950 font-extrabold'
                  : itemDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {itemDone ? '✓' : idx + 1}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Focused Exercise Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Exercise {safeIndex + 1} of {currentDay.exercises.length}
              </span>
              {swapped && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  Swapped: {swapped.name}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeDisplayName}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
              <span>Target: <strong className="text-slate-800 dark:text-slate-200">{ex.targetSetsReps}</strong></span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Rest {ex.rest}</span>
              </span>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-1.5 self-start sm:self-center">
            {onOpenWarmUpCalculator && (
              <button
                type="button"
                onClick={() => onOpenWarmUpCalculator(activeDisplayName, firstSetNumericLoad)}
                className="flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Warm-up ramp and plate math"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Ramp</span>
              </button>
            )}

            {onOpenSwapModal && (
              <button
                type="button"
                onClick={() => onOpenSwapModal(ex.id, activeDisplayName, ex.exerciseId)}
                className="flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                title="Swap exercise alternative"
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Swap</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenExerciseGuide(ex.exerciseId, activeDisplayName)}
              className="flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Exercise How-To guide"
            >
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Guide</span>
            </button>
          </div>
        </div>

        {/* 3. The Active Working Set Card (Hero Section in Thumb Zone) */}
        {!isAllSetsComplete ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/80 dark:to-slate-900/60 border-2 border-emerald-500/40 shadow-inner space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-mono font-black text-xs shadow-xs">
                  SET {activeSetIdx + 1} OF {setsCount}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Ready to Lift
                </span>
              </div>

              {prevSetEntry && (
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Last Set: <strong className="text-slate-800 dark:text-slate-200">{prevSetEntry.load || '0'} lb × {prevSetEntry.reps || '0'}</strong>
                </div>
              )}
            </div>

            {/* Steppers: Load & Reps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Load Controls */}
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Working Weight (lb)
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDeltaLoad(-10)}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  >
                    -10
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeltaLoad(-5)}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  >
                    -5
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={currentSetEntry?.load ?? workingLoad}
                      placeholder={workingLoad || '0'}
                      onChange={(e) => onUpdateExerciseLog(ex.id, activeSetIdx, 'load', e.target.value)}
                      className="w-full text-center py-1.5 px-2 text-base sm:text-lg font-black font-mono bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeltaLoad(5)}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  >
                    +5
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeltaLoad(10)}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  >
                    +10
                  </button>
                </div>
              </div>

              {/* Reps Controls */}
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Reps to Complete
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeltaReps(-1)}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-base font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={currentSetEntry?.reps ?? workingReps}
                      placeholder={workingReps || defaultReps}
                      onChange={(e) => onUpdateExerciseLog(ex.id, activeSetIdx, 'reps', e.target.value)}
                      className="w-full text-center py-1.5 px-2 text-base sm:text-lg font-black font-mono bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeltaReps(1)}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-base font-bold text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Giant 1-Tap Log Button */}
            <button
              type="button"
              onClick={handleLogActiveSet}
              className="w-full py-4 min-h-[54px] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black text-sm sm:text-base shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>LOG SET {activeSetIdx + 1} ({workingLoad ? `${workingLoad} lb` : 'Bodyweight'} × {workingReps} reps)</span>
            </button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                All {setsCount} Sets Completed!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Great effort on {activeDisplayName}.
              </p>
            </div>

            {safeIndex + 1 < currentDay.exercises.length ? (
              <button
                type="button"
                onClick={() => onSelectExerciseIndex(safeIndex + 1)}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-black text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Advance to Next Exercise ({currentDay.exercises[safeIndex + 1].name})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onFinishWorkout}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Finish & Log Entire Workout!</span>
              </button>
            )}
          </div>
        )}

        {/* 4. Logged Sets History for this Exercise */}
        {exerciseEntries.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Recorded Sets:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {exerciseEntries.slice(0, setsCount).map((s, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-xs font-mono flex items-center justify-between border ${
                    s.completed
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="font-bold">Set {idx + 1}:</span>
                  <span>{s.completed ? `${s.load || '-'} lb × ${s.reps || '-'}` : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Prev / Next Exercise Switcher */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            disabled={safeIndex <= 0}
            onClick={() => onSelectExerciseIndex(safeIndex - 1)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev Lift</span>
          </button>

          <span className="text-[11px] font-mono text-slate-400">
            {safeIndex + 1} / {currentDay.exercises.length}
          </span>

          <button
            type="button"
            disabled={safeIndex >= currentDay.exercises.length - 1}
            onClick={() => onSelectExerciseIndex(safeIndex + 1)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1"
          >
            <span>Next Lift</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
