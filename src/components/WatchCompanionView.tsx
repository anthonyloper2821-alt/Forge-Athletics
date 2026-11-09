import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Check, 
  Clock, 
  RotateCcw, 
  ChevronRight, 
  ArrowRight, 
  Layers, 
  Flame, 
  X, 
  Sparkles,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Watch,
  List,
  Volume2
} from 'lucide-react';
import { SportProgram, WorkoutExerciseItem, DaySessionLog } from '../types/sport';
import { 
  getNextWorkoutTarget, 
  getSupersetPrefix, 
  parsePrescribedSets, 
  ExerciseStepTarget 
} from '../utils/supersetHelper';
import { playWristChime, triggerWristHaptic } from '../utils/watchAudio';

interface WatchCompanionViewProps {
  program: SportProgram;
  exercises: WorkoutExerciseItem[];
  sessionLog: DaySessionLog;
  onUpdateExerciseLog: (exerciseId: string, setIndex: number, field: 'load' | 'reps' | 'completed', value: string | boolean) => void;
  onUpdateSessionMeta: (updates: Partial<DaySessionLog>) => void;
  onClose: () => void;
  dayName: string;
  isDirectWatchLaunch?: boolean;
}

export const WatchCompanionView: React.FC<WatchCompanionViewProps> = ({
  program,
  exercises,
  sessionLog,
  onUpdateExerciseLog,
  onUpdateSessionMeta,
  onClose,
  dayName,
  isDirectWatchLaunch = false
}) => {
  // Find current active exercise & set
  const [activeExIndex, setActiveExIndex] = useState<number>(0);
  const [activeSetIndex, setActiveSetIndex] = useState<number>(0);

  // Exercise list drawer on watch
  const [showMoveList, setShowMoveList] = useState<boolean>(false);

  // Rest Timer State
  const [isResting, setIsResting] = useState<boolean>(false);
  const [restSecondsLeft, setRestSecondsLeft] = useState<number>(0);
  const [totalRestPlanned, setTotalRestPlanned] = useState<number>(60);
  const [pendingNextTarget, setPendingNextTarget] = useState<ExerciseStepTarget | null>(null);

  // Temporary per-set inputs before logging
  const currentEx = exercises[activeExIndex] || exercises[0];
  const currentEntries = (currentEx && sessionLog.exerciseLogs[currentEx.id]) || [];
  const currentEntry = currentEntries[activeSetIndex];

  const [currentLoadInput, setCurrentLoadInput] = useState<string>('');
  const [currentRepsInput, setCurrentRepsInput] = useState<string>('');

  // Sync inputs when active exercise or set changes
  useEffect(() => {
    if (!currentEx) return;
    const existing = sessionLog.exerciseLogs[currentEx.id]?.[activeSetIndex];
    if (existing && existing.load) {
      setCurrentLoadInput(existing.load);
    } else {
      // Find last used load for this exercise
      const prevSetLoad = sessionLog.exerciseLogs[currentEx.id]?.find(s => s?.load)?.load;
      setCurrentLoadInput(prevSetLoad || '');
    }

    if (existing && existing.reps) {
      setCurrentRepsInput(existing.reps);
    } else {
      const matchReps = currentEx.targetSetsReps.match(/[x×]\s*([0-9-]+)/i);
      setCurrentRepsInput(matchReps ? matchReps[1] : '10');
    }
  }, [activeExIndex, activeSetIndex, currentEx, sessionLog]);

  // Rest countdown ticker with Web Audio melodic chime
  useEffect(() => {
    if (!isResting || restSecondsLeft <= 0) return;

    const interval = setInterval(() => {
      setRestSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleRestComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isResting, restSecondsLeft, pendingNextTarget]);

  // When rest completes, loop to the pending target (e.g. back to A1 for set 2)
  const handleRestComplete = () => {
    setIsResting(false);
    
    // Melodic double-chime audible on Apple Watch speaker
    playWristChime('rest_complete');
    triggerWristHaptic('alert');

    if (pendingNextTarget) {
      setActiveExIndex(pendingNextTarget.exerciseIndex);
      setActiveSetIndex(pendingNextTarget.setIndex);
      setPendingNextTarget(null);
    }
  };

  const handleSkipRest = () => {
    playWristChime('step_advance');
    triggerWristHaptic('click');
    handleRestComplete();
  };

  // Helper to adjust load by +/- 5 lbs with wrist tap
  const handleAdjustLoad = (delta: number) => {
    triggerWristHaptic('click');
    const num = parseFloat(currentLoadInput.replace(/[^0-9.]/g, '')) || 0;
    const unitMatch = currentLoadInput.match(/[a-zA-Z]+/);
    const unit = unitMatch ? unitMatch[0] : 'lbs';
    const nextWeight = Math.max(0, num + delta);
    const formatted = nextWeight > 0 ? `${nextWeight} ${unit}` : '';
    setCurrentLoadInput(formatted);
  };

  // Helper to adjust reps with wrist tap
  const handleAdjustReps = (delta: number) => {
    triggerWristHaptic('click');
    const num = parseInt(currentRepsInput, 10) || 10;
    const nextReps = Math.max(1, num + delta);
    setCurrentRepsInput(String(nextReps));
  };

  // Parse rest seconds from string (e.g. "90s" -> 90, "2 min" -> 120)
  const parseRestSeconds = (restStr?: string): number => {
    if (!restStr) return 60;
    if (restStr.includes('min')) {
      const match = restStr.match(/(\d+)/);
      return match ? parseInt(match[1], 10) * 60 : 120;
    }
    const match = restStr.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 60;
  };

  // Log Set Action
  const handleLogSet = () => {
    if (!currentEx) return;

    // 1. Commit values to exercise log
    onUpdateExerciseLog(currentEx.id, activeSetIndex, 'load', currentLoadInput || 'BW');
    onUpdateExerciseLog(currentEx.id, activeSetIndex, 'reps', currentRepsInput || '10');
    onUpdateExerciseLog(currentEx.id, activeSetIndex, 'completed', true);

    playWristChime('set_logged');
    triggerWristHaptic('success');

    // 2. Determine next target via superset state engine
    const nextTarget = getNextWorkoutTarget(
      exercises,
      sessionLog,
      currentEx.id,
      activeSetIndex
    );

    const currentPrefix = getSupersetPrefix(currentEx.supersetGroup);

    // Case A: Next target is partner in active superset round (e.g. A1 -> A2, same set index)
    if (nextTarget && nextTarget.isSuperset && nextTarget.supersetLetter === currentPrefix && nextTarget.setIndex === activeSetIndex) {
      // Direct jump without resting!
      setActiveExIndex(nextTarget.exerciseIndex);
      setActiveSetIndex(nextTarget.setIndex);
      triggerWristHaptic('click');
      return;
    }

    // Case B: Completed superset round (A2 finished) OR standalone exercise set finished
    // Start planned rest timer, then loop back (e.g. back to A1 for next round)
    const plannedRestSec = parseRestSeconds(currentEx.rest || '60s');
    setTotalRestPlanned(plannedRestSec);
    setRestSecondsLeft(plannedRestSec);
    setIsResting(true);
    setPendingNextTarget(nextTarget);
  };

  // Calculate upcoming exercise preview
  const nextPreview = useMemo(() => {
    if (activeExIndex + 1 < exercises.length) {
      return exercises[activeExIndex + 1];
    }
    return null;
  }, [activeExIndex, exercises]);

  const totalSets = parsePrescribedSets(currentEx?.targetSetsReps || '3 x 10');
  const currentPrefix = getSupersetPrefix(currentEx?.supersetGroup);

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between font-sans select-none touch-manipulation overflow-y-auto overscroll-none">
      {/* Watch Top Navigation Bar */}
      <div className="px-3 py-2 flex items-center justify-between border-b border-white/10 bg-black/95 shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-1.5 min-w-0">
          <Watch className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px] font-mono font-black tracking-widest text-emerald-400 uppercase truncate">
            {isDirectWatchLaunch ? 'Wrist Session' : 'Watch Mode'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Movement List Toggle on Wrist */}
          <button
            type="button"
            onClick={() => setShowMoveList(prev => !prev)}
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono font-bold flex items-center gap-1 min-h-[30px]"
            aria-label="View Movement List"
          >
            <List className="w-3 h-3 text-emerald-400" />
            <span>Moves</span>
          </button>

          {!isDirectWatchLaunch && (
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center min-h-[28px] min-w-[28px]"
              aria-label="Exit Watch Mode"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Movement List Drawer (Quick Jump on Wrist) */}
      {showMoveList && (
        <div className="p-3 bg-zinc-900 border-b border-white/15 animate-fadeIn max-h-56 overflow-y-auto space-y-1.5 z-30">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between pb-1 border-b border-white/10">
            <span>Exercises ({exercises.length})</span>
            <button
              type="button"
              onClick={() => setShowMoveList(false)}
              className="text-white/60 hover:text-white"
            >
              Close
            </button>
          </div>
          {exercises.map((ex, idx) => {
            const isCurrent = idx === activeExIndex;
            const completedSets = sessionLog.exerciseLogs[ex.id]?.filter(s => s?.completed).length || 0;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => {
                  setActiveExIndex(idx);
                  setActiveSetIndex(0);
                  setIsResting(false);
                  setShowMoveList(false);
                }}
                className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                  isCurrent 
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' 
                    : 'bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="font-mono text-[10px] text-white/40 mr-1.5">#{idx + 1}</span>
                  <span className="truncate">{ex.name}</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 shrink-0">
                  {completedSets > 0 ? `${completedSets} done` : ex.targetSetsReps}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Watch Body */}
      <div className="flex-1 flex flex-col justify-center px-3 py-2 max-w-sm mx-auto w-full">
        {isResting ? (
          /* ======================================================== */
          /* REST COUNTDOWN VIEW (Large Glare-Free Wrist Display)    */
          /* ======================================================== */
          <div className="text-center space-y-3 animate-fade-in my-auto py-2">
            <div className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Resting · Set Complete</span>
            </div>

            {/* Giant Countdown Clock */}
            <div className="py-1">
              <div className="text-6xl sm:text-7xl font-mono font-black text-white tracking-tighter">
                {Math.floor(restSecondsLeft / 60)}:
                {(restSecondsLeft % 60).toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] text-white/60 font-mono mt-0.5 flex items-center justify-center gap-1">
                <Volume2 className="w-3 h-3 text-emerald-400" />
                <span>Planned: {totalRestPlanned}s · Chime Active</span>
              </div>
            </div>

            {/* Loop indicator */}
            {pendingNextTarget && (
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="text-white/50 block text-[9px] uppercase font-bold">Auto-Looping Next to:</span>
                <span className="text-emerald-300 font-black text-xs truncate block">
                  {pendingNextTarget.exercise.name} (Set {pendingNextTarget.setNumber})
                </span>
              </div>
            )}

            {/* Skip Rest Button */}
            <button
              type="button"
              onClick={handleSkipRest}
              className="w-full py-3.5 px-4 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-black text-xs tracking-wide transition-all min-h-[46px]"
            >
              Skip Rest &amp; Start Set
            </button>
          </div>
        ) : (
          /* ======================================================== */
          /* ACTIVE EXERCISE & SET TRACKER VIEW                       */
          /* ======================================================== */
          <div className="space-y-2.5 animate-fade-in my-auto py-1">
            {/* Superset Group Badge */}
            {currentPrefix && (
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                <Layers className="w-3 h-3" />
                <span>Superset {currentEx.supersetGroup || currentPrefix}</span>
              </div>
            )}

            {/* Exercise Name */}
            <div>
              <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                Move {activeExIndex + 1} of {exercises.length}
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white leading-tight line-clamp-2">
                {currentEx.name}
              </h1>
              <div className="text-[11px] text-emerald-400 font-mono font-bold mt-0.5">
                Target: {currentEx.targetSetsReps}
              </div>
            </div>

            {/* Set Tracker & Quick Adjusters */}
            <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-white/60">
                <span>SET {activeSetIndex + 1} OF {totalSets}</span>
                <span className="font-mono text-emerald-400">Rest: {currentEx.rest || '60s'}</span>
              </div>

              {/* Resistance Stepper & Direct Input */}
              <div className="flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAdjustLoad(-5)}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90 text-white font-black flex items-center justify-center shrink-0 min-h-[44px] min-w-[44px]"
                  aria-label="Decrease 5 lbs"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="flex-1 text-center min-w-0 px-1">
                  <input
                    type="text"
                    value={currentLoadInput}
                    onChange={(e) => setCurrentLoadInput(e.target.value)}
                    placeholder="Weight"
                    className="w-full text-center bg-transparent text-lg font-mono font-black text-white border-b border-white/20 focus:border-emerald-400 focus:outline-none py-0.5"
                  />
                  <span className="text-[9px] text-white/40 block font-mono">Resistance</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdjustLoad(5)}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90 text-white font-black flex items-center justify-center shrink-0 min-h-[44px] min-w-[44px]"
                  aria-label="Increase 5 lbs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Reps Quick Stepper */}
              <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handleAdjustReps(-1)}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 text-white font-bold flex items-center justify-center shrink-0 min-h-[40px] min-w-[40px]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="flex-1 text-center min-w-0 px-1">
                  <input
                    type="text"
                    value={currentRepsInput}
                    onChange={(e) => setCurrentRepsInput(e.target.value)}
                    placeholder="Reps"
                    className="w-full text-center bg-transparent text-base font-mono font-black text-emerald-400 border-b border-white/20 focus:border-emerald-400 focus:outline-none py-0.5"
                  />
                  <span className="text-[9px] text-white/40 block font-mono">Reps</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdjustReps(1)}
                  className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 text-white font-bold flex items-center justify-center shrink-0 min-h-[40px] min-w-[40px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Giant 1-Tap Log Button */}
            <button
              type="button"
              onClick={handleLogSet}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-sm tracking-tight flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all min-h-[50px]"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>LOG SET {activeSetIndex + 1}</span>
            </button>
          </div>
        )}
      </div>

      {/* Up Next Exercise Preview Bar */}
      {nextPreview && !isResting && (
        <div className="px-3 py-1.5 bg-white/5 border-t border-white/10 flex items-center justify-between text-xs text-white/70 shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-emerald-400 font-bold shrink-0 text-[10px]">Up Next:</span>
            <span className="truncate text-white font-medium text-[11px]">{nextPreview.name}</span>
          </div>
          <span className="text-[9px] font-mono text-white/50 shrink-0 ml-1.5">
            {nextPreview.targetSetsReps}
          </span>
        </div>
      )}
    </div>
  );
};
