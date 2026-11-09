import React, { useState, useMemo } from 'react';
import { SportProgram, DaySessionLog, PositionSpecialization, MovementCategory, WorkoutExerciseItem, TrainingFrequency } from '../types/sport';
import { Clock, Info, Check, Award, CheckCircle2, ArrowLeftRight, Flame, RotateCcw, ChevronDown, ChevronUp, Target, Plus, Minus, Zap, Copy, SlidersHorizontal, Dumbbell, Sparkles, Share2, History, TrendingUp, Printer, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { findLastExercisePerformance, extractNumericLoad, PreviousExercisePerformance } from '../utils/performanceMemory';
import { FREQUENCY_CONFIGS } from '../utils/adaptiveFrequency';
import { dispatchWorkoutToNutriPulse, buildNutriPulseWorkoutData, NutriPulseWorkoutData } from '../utils/nutripulseSync';

interface WorkoutSessionViewProps {
  program: SportProgram;
  activePhaseIndex: number;
  onSelectPhaseIndex?: (index: number) => void;
  activeDayNumber: number;
  activeWeek: number;
  sessionLog: DaySessionLog;
  allSessionLogs?: Record<string, DaySessionLog>;
  onUpdateExerciseLog: (exerciseId: string, setIndex: number, field: 'load' | 'reps' | 'completed', value: string | boolean) => void;
  onUpdateSessionMeta: (updates: Partial<DaySessionLog>) => void;
  onOpenExerciseGuide: (exerciseId: string, name: string) => void;
  onStartRestTimer: (restStr: string) => void;
  onNavigateDay: (day: number) => void;
  onOpenSwapModal?: (exerciseId: string, name: string, catalogExerciseId?: string, category?: MovementCategory) => void;
  onRevertSwap?: (exerciseId: string) => void;
  onOpenPlateCalculator?: (exerciseName: string, initialWeight?: number) => void;
  onOpenWarmUpCalculator?: (exerciseName: string, initialWeight?: number) => void;
  onOpenBevelExport?: () => void;
  onOpenPrintModal?: () => void;
  activePosition?: PositionSpecialization;
  onNavigateToPositionsTab?: () => void;
  autoAdvance?: boolean;
  onToggleAutoAdvance?: () => void;
  phaseSetDefaults?: Record<string, Record<string, number>>;
  onUpdateExerciseSetCount?: (exerciseId: string, count: number, applyToPhase?: boolean) => void;
  onDuplicatePreviousSet?: (exerciseId: string, targetSetIndex: number) => void;
  trainingFrequency?: TrainingFrequency;
  onSelectFrequency?: (freq: TrainingFrequency) => void;
}

export const WorkoutSessionView: React.FC<WorkoutSessionViewProps> = ({
  program,
  activePhaseIndex,
  onSelectPhaseIndex,
  activeDayNumber,
  activeWeek,
  sessionLog,
  allSessionLogs = {},
  onUpdateExerciseLog,
  onUpdateSessionMeta,
  onOpenExerciseGuide,
  onStartRestTimer,
  onNavigateDay,
  onOpenSwapModal,
  onRevertSwap,
  onOpenPlateCalculator,
  onOpenWarmUpCalculator,
  onOpenBevelExport,
  onOpenPrintModal,
  activePosition,
  onNavigateToPositionsTab,
  autoAdvance = true,
  onToggleAutoAdvance,
  phaseSetDefaults = {},
  onUpdateExerciseSetCount,
  onDuplicatePreviousSet,
  trainingFrequency = 4,
  onSelectFrequency
}) => {
  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const currentDay = currentPhase?.days?.find(d => d.dayNumber === activeDayNumber) || currentPhase?.days?.[0];

  // Collapsible Session Stats Drawer (collapsed by default to maximize lift screen real estate on iPhone)
  const [isStatsDrawerOpen, setIsStatsDrawerOpen] = useState(false);

  // Quiet Collapsed Headers: track collapsed state per exercise
  const [collapsedExercises, setCollapsedExercises] = useState<Record<string, boolean>>({});

  // Auto-advance feedback notification
  const [autoAdvanceToast, setAutoAdvanceToast] = useState<string | null>(null);

  // Completion toast
  const [sessionCompletedNotice, setSessionCompletedNotice] = useState(false);
  const [nutriPulseSyncInfo, setNutriPulseSyncInfo] = useState<NutriPulseWorkoutData | null>(null);

  // Parse baseline sets count from target string (e.g. "4 x 10-12" -> 4 sets)
  const getBaseSetsCount = (targetStr: string): number => {
    const match = targetStr.match(/(\d+)\s*[x×]/i);
    if (match) return Math.min(Math.max(parseInt(match[1], 10), 1), 6);
    if (targetStr.toLowerCase().includes('rds x')) {
      const matchRds = targetStr.match(/(\d+)\s*rds/i);
      if (matchRds) return Math.min(parseInt(matchRds[1], 10), 6);
    }
    return 3;
  };

  // Phase-Aware effective set count
  const getEffectiveSetsCount = (ex: WorkoutExerciseItem): number => {
    // 1. Session log explicit override
    if (sessionLog.customSetCounts && sessionLog.customSetCounts[ex.id] !== undefined) {
      return sessionLog.customSetCounts[ex.id];
    }
    // 2. Phase-level configuration default for this sport & phase
    const phaseKey = `${program.id}_p${activePhaseIndex}`;
    const phaseConfig = phaseSetDefaults[phaseKey];
    if (phaseConfig) {
      if (phaseConfig[ex.id] !== undefined) return phaseConfig[ex.id];
      if (ex.exerciseId && phaseConfig[ex.exerciseId] !== undefined) return phaseConfig[ex.exerciseId];
    }
    // 3. Fallback to program blueprint
    return getBaseSetsCount(ex.targetSetsReps);
  };

  // Compute live session stats (Volume, Sets done, Completion percentage)
  const sessionStats = useMemo(() => {
    if (!currentDay) {
      return {
        totalVolumeLbs: 0,
        totalCompletedSets: 0,
        totalScheduledSets: 0,
        completedExercisesCount: 0,
        totalExercisesCount: 0,
        completionPercent: 0
      };
    }

    let totalVolumeLbs = 0;
    let totalCompletedSets = 0;
    let totalScheduledSets = 0;
    let completedExercisesCount = 0;

    currentDay.exercises.forEach(ex => {
      const setsCount = getEffectiveSetsCount(ex);
      totalScheduledSets += setsCount;
      const entries = sessionLog.exerciseLogs[ex.id] || [];
      let exAllCompleted = setsCount > 0;

      for (let s = 0; s < setsCount; s++) {
        const entry = entries[s];
        if (entry?.completed) {
          totalCompletedSets++;
          const numericWeight = parseFloat((entry.load || '').replace(/[^0-9.]/g, '')) || 0;
          const numericReps = parseFloat((entry.reps || '').replace(/[^0-9.]/g, '')) || 0;
          totalVolumeLbs += (numericWeight * numericReps);
        } else {
          exAllCompleted = false;
        }
      }

      if (exAllCompleted && setsCount > 0) {
        completedExercisesCount++;
      }
    });

    const completionPercent = totalScheduledSets > 0 ? Math.round((totalCompletedSets / totalScheduledSets) * 100) : 0;
    return {
      totalVolumeLbs,
      totalCompletedSets,
      totalScheduledSets,
      completedExercisesCount,
      totalExercisesCount: currentDay.exercises.length,
      completionPercent
    };
  }, [currentDay, sessionLog, phaseSetDefaults, activePhaseIndex, program.id]);

  // Auto-Rest Timer on Every Set (starts timer immediately when an athlete taps Done)
  const [autoRestEverySet, setAutoRestEverySet] = useState<boolean>(true);

  // Set toggle and Auto-Advance handler (with 1-tap smart inheritance)
  const handleToggleSetCompletion = (
    ex: WorkoutExerciseItem, 
    exIndex: number, 
    setIdx: number, 
    currentCompleted: boolean,
    explicitLoad?: string,
    explicitReps?: string
  ) => {
    const nextCompleted = !currentCompleted;
    const entries = sessionLog.exerciseLogs[ex.id] || [];
    const currentEntry = entries[setIdx];

    let finalLoad = explicitLoad !== undefined ? explicitLoad : (currentEntry?.load || '');
    let finalReps = explicitReps !== undefined ? explicitReps : (currentEntry?.reps || '');

    // If completing the set and load/reps are empty, auto-inherit from previous set or blueprint target!
    if (nextCompleted) {
      if (!finalLoad && setIdx > 0 && entries[setIdx - 1]?.load) {
        finalLoad = entries[setIdx - 1].load;
        onUpdateExerciseLog(ex.id, setIdx, 'load', finalLoad);
      }
      if (!finalReps) {
        if (setIdx > 0 && entries[setIdx - 1]?.reps) {
          finalReps = entries[setIdx - 1].reps;
        } else {
          const match = ex.targetSetsReps.match(/x\s*(\d+)/i) || ex.targetSetsReps.match(/(\d+)\s*reps/i);
          finalReps = match ? match[1] : '10';
        }
        onUpdateExerciseLog(ex.id, setIdx, 'reps', finalReps);
      }
    }

    onUpdateExerciseLog(ex.id, setIdx, 'completed', nextCompleted);

    // Auto-start rest timer between sets if enabled
    if (nextCompleted && autoRestEverySet) {
      onStartRestTimer(ex.rest || '90s');
    }

    if (nextCompleted && autoAdvance && currentDay) {
      const effectiveCount = getEffectiveSetsCount(ex);

      // Calculate if all sets for this exercise will be completed after this set
      let completedCount = 0;
      for (let i = 0; i < effectiveCount; i++) {
        if (i === setIdx) {
          completedCount++;
        } else if (entries[i]?.completed) {
          completedCount++;
        }
      }

      if (completedCount === effectiveCount) {
        // Quiet-collapse current exercise
        setCollapsedExercises(prev => ({ ...prev, [ex.id]: true }));

        // Check if there is a next exercise in currentDay
        const nextEx = currentDay.exercises[exIndex + 1];
        if (nextEx) {
          // Open next exercise
          setCollapsedExercises(prev => ({ ...prev, [nextEx.id]: false }));
          // Ensure rest timer is running for transition
          onStartRestTimer(ex.rest || '90s');
          // Smooth scroll to next exercise
          setTimeout(() => {
            const nextEl = document.getElementById(`exercise-card-${nextEx.id}`);
            if (nextEl) {
              nextEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);

          setAutoAdvanceToast(`Completed ${ex.name}! Advancing to ${nextEx.name} • ${ex.rest} rest`);
          setTimeout(() => setAutoAdvanceToast(null), 3500);
        } else {
          // All exercises finished!
          handleFinishWorkout();
        }
      }
    }
  };

  // Quick weight adjustment helper (+5 / -5 / +10 lb or kg)
  const handleAdjustLoad = (exerciseId: string, setIdx: number, delta: number) => {
    const entries = sessionLog.exerciseLogs[exerciseId] || [];
    const currentEntry = entries[setIdx];
    let currentVal = currentEntry?.load || '';
    if (!currentVal && setIdx > 0 && entries[setIdx - 1]?.load) {
      currentVal = entries[setIdx - 1].load;
    }
    const numMatch = currentVal.match(/([0-9.]+)/);
    const unitMatch = currentVal.match(/(lbs?|kg)/i);
    const unit = unitMatch ? ` ${unitMatch[1]}` : ' lb';
    const baseNum = numMatch ? parseFloat(numMatch[1]) : 135;
    const nextNum = Math.max(0, baseNum + delta);
    onUpdateExerciseLog(exerciseId, setIdx, 'load', `${nextNum}${unit}`);
  };

  // 1-Tap Quick Complete helper
  const handleQuickCompleteSet = (ex: WorkoutExerciseItem, exIndex: number, setIdx: number) => {
    const entries = sessionLog.exerciseLogs[ex.id] || [];
    const prevEntry = setIdx > 0 ? entries[setIdx - 1] : null;
    const targetRepsMatch = ex.targetSetsReps.match(/x\s*(\d+)/i) || ex.targetSetsReps.match(/(\d+)\s*reps/i);
    const defaultReps = targetRepsMatch ? targetRepsMatch[1] : '10';

    const loadToUse = entries[setIdx]?.load || prevEntry?.load || '';
    const repsToUse = entries[setIdx]?.reps || prevEntry?.reps || defaultReps;

    handleToggleSetCompletion(ex, exIndex, setIdx, false, loadToUse, repsToUse);
  };

  // Pre-fill empty sets using last time's performance
  const handleApplyPreviousPerformance = (
    exerciseId: string, 
    setsCount: number, 
    prevPerf: PreviousExercisePerformance
  ) => {
    const entries = sessionLog.exerciseLogs[exerciseId] || [];
    for (let s = 0; s < setsCount; s++) {
      const currentEntry = entries[s];
      if (!currentEntry?.completed) {
        const matchingSet = prevPerf.sets[s] || prevPerf.sets[0];
        const loadToSet = matchingSet?.load || prevPerf.peakLoad;
        const repsToSet = matchingSet?.reps || prevPerf.peakReps;
        if (loadToSet) {
          onUpdateExerciseLog(exerciseId, s, 'load', loadToSet);
        }
        if (repsToSet) {
          onUpdateExerciseLog(exerciseId, s, 'reps', repsToSet);
        }
      }
    }
    setAutoAdvanceToast(`Pre-filled ${prevPerf.peakLoad} from ${prevPerf.sessionLabel}!`);
    setTimeout(() => setAutoAdvanceToast(null), 3000);
  };

  const handleFinishWorkout = () => {
    onUpdateSessionMeta({ completed: true });
    setSessionCompletedNotice(true);

    // Broadcast workout completed event to NutriPulse nutrition app
    const syncData = buildNutriPulseWorkoutData({
      dayName: currentDay?.name || 'Strength & Conditioning Workout',
      focus: currentDay?.focus,
      sportTitle: program.name,
      exerciseCount: currentDay?.exercises?.length || 0,
      totalSets: sessionStats.totalScheduledSets
    });
    dispatchWorkoutToNutriPulse(syncData);
    setNutriPulseSyncInfo(syncData);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
    setTimeout(() => setSessionCompletedNotice(false), 5000);
  };

  // Toggle single exercise collapsed state
  const toggleExerciseCollapse = (exId: string) => {
    setCollapsedExercises(prev => ({
      ...prev,
      [exId]: !prev[exId]
    }));
  };

  if (!currentDay) {
    return (
      <div className="bg-slate-900 text-white rounded-xl p-8 border border-slate-800 text-center space-y-4">
        <p className="text-slate-300">No session scheduled for this selection.</p>
        <button
          onClick={() => onNavigateDay(1)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm"
        >
          Return to Day 1
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Auto-Advance Floating Feedback Banner */}
      {autoAdvanceToast && (
        <div className="sticky top-2 z-30 p-3 rounded-xl bg-slate-900/95 dark:bg-slate-900 text-white border border-emerald-500/50 shadow-xl backdrop-blur-md flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
            <span className="font-semibold text-emerald-300">{autoAdvanceToast}</span>
          </div>
          <button
            onClick={() => setAutoAdvanceToast(null)}
            className="text-slate-400 hover:text-white px-1.5 py-0.5 rounded text-[11px]"
          >
            ✕
          </button>
        </div>
      )}

      {/* COLLAPSIBLE SESSION STATS DRAWER */}
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
        {/* Quiet Top Summary Bar (Always Visible, Compact & High-Impact) */}
        <div className="p-3.5 sm:p-4 bg-white dark:bg-slate-900 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* Left: Program / Week / Phase */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex-wrap">
              <span>{program.name}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span>W{activeWeek}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              <span className="truncate max-w-[160px] sm:max-w-none text-slate-700 dark:text-slate-300">{currentPhase.title}</span>
            </div>

            {/* Right: Quick Tools & Drawer Toggle */}
            <div className="flex items-center gap-2">
              {/* Auto-Advance Quick Toggle Button */}
              {onToggleAutoAdvance && (
                <button
                  type="button"
                  onClick={onToggleAutoAdvance}
                  className={`flex items-center gap-1 px-2.5 py-1 min-h-[34px] rounded-lg text-[11px] font-mono font-semibold transition-all border ${
                    autoAdvance
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                  title="Toggle automatic advance to next exercise when last set is completed"
                  aria-label="Toggle Auto-Advance"
                >
                  <Zap className={`w-3.5 h-3.5 ${autoAdvance ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span className="hidden xs:inline">Auto-Advance:</span>
                  <span>{autoAdvance ? 'ON' : 'OFF'}</span>
                </button>
              )}

              {/* Auto-Rest Timer Quick Toggle */}
              <button
                type="button"
                onClick={() => setAutoRestEverySet(prev => !prev)}
                className={`flex items-center gap-1 px-2.5 py-1 min-h-[34px] rounded-lg text-[11px] font-mono font-semibold transition-all border ${
                  autoRestEverySet
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
                title="Automatically start rest timer countdown when any set is checked off"
                aria-label="Toggle Auto-Rest Timer"
              >
                <Clock className={`w-3.5 h-3.5 ${autoRestEverySet ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span className="hidden xs:inline">Auto-Rest:</span>
                <span>{autoRestEverySet ? 'ON' : 'OFF'}</span>
              </button>

              {/* Stats Drawer Expand / Collapse Button */}
              <button
                type="button"
                onClick={() => setIsStatsDrawerOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1 min-h-[34px] rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
                aria-label={isStatsDrawerOpen ? 'Collapse session drawer' : 'Expand session drawer'}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isStatsDrawerOpen ? 'Hide Drawer' : 'Session Drawer'}</span>
                {isStatsDrawerOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Main Title Row & Day Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  DAY {currentDay.dayNumber}
                </span>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentDay.name}
                </h1>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target: ~{currentDay.timeBudgetMinutes}m · {currentDay.focus}
              </p>
            </div>

            {/* Day Selector Dropdown */}
            <div className="relative inline-flex items-center self-start sm:self-auto min-w-[170px] max-w-full">
              <select
                id="session-day-select"
                value={activeDayNumber}
                onChange={(e) => onNavigateDay(Number(e.target.value))}
                className="w-full appearance-none bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-900 dark:text-white text-xs font-bold pl-3 pr-8 py-2 min-h-[40px] rounded-xl border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-xs transition-colors"
                aria-label="Select Training Day"
              >
                {currentPhase.days.map(d => (
                  <option key={d.dayNumber} value={d.dayNumber} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium py-1">
                    Day {d.dayNumber}: {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Quiet Progress Bar & Streamlined Session Metrics */}
          <div className="bg-slate-50 dark:bg-slate-950/70 rounded-xl p-2.5 border border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <strong>{sessionStats.completedExercisesCount} of {sessionStats.totalExercisesCount}</strong> exercises done
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {sessionStats.completionPercent}% Complete
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${sessionStats.completionPercent}%` }}
              />
            </div>

            {/* Quiet summary stats */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1.5 pt-1 border-t border-slate-200 dark:border-slate-800/60">
              <span>Sets: <span className="font-semibold text-slate-700 dark:text-slate-300">{sessionStats.totalCompletedSets} / {sessionStats.totalScheduledSets}</span></span>
              <span>Total Volume: <strong className="text-slate-900 dark:text-white font-bold">{sessionStats.totalVolumeLbs.toLocaleString()} lb</strong></span>
            </div>
          </div>
        </div>

        {/* Collapsible Drawer Interior (Smoothly opens on tap) */}
        {isStatsDrawerOpen && (
          <div className="p-4 sm:p-5 bg-slate-50/90 dark:bg-slate-950/85 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
            {/* Phase Selector & Smart Warm-Up Ramp */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                {onSelectPhaseIndex && (
                  <div className="flex-1 max-w-xs">
                    <label className="text-slate-700 dark:text-slate-300 block mb-1 text-[11px] font-semibold">Active Program Phase:</label>
                    <div className="relative">
                      <select
                        value={activePhaseIndex}
                        onChange={(e) => onSelectPhaseIndex(Number(e.target.value))}
                        className="w-full appearance-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-semibold pl-3 pr-8 py-2 min-h-[40px] rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer shadow-xs"
                        aria-label="Change Phase"
                      >
                        {program.phases.map((ph, idx) => (
                          <option key={ph.id} value={idx} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                            Phase {idx + 1}: {ph.title} ({ph.weeks})
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-600 dark:text-emerald-400">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                )}

                {onSelectFrequency && (
                  <div>
                    <label className="text-slate-700 dark:text-slate-300 block mb-1 text-[11px] font-semibold">
                      Weekly Split:
                    </label>
                    <div className="inline-flex items-center p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-xs">
                      {([3, 4, 5] as TrainingFrequency[]).map(f => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => onSelectFrequency(f)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            trainingFrequency === f
                              ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {f} Days
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start lg:self-end">
                {onOpenBevelExport && (
                  <button
                    type="button"
                    onClick={onOpenBevelExport}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-colors min-h-[40px]"
                    title="Export workout summary formatted for Bevel or Apple Health"
                  >
                    <Share2 className="w-4 h-4 text-emerald-500" />
                    <span>Sync / Share</span>
                  </button>
                )}

                {onOpenPrintModal && (
                  <button
                    type="button"
                    onClick={onOpenPrintModal}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold transition-colors min-h-[40px]"
                    title="Print workout card, save as PDF, or download CSV"
                  >
                    <Printer className="w-4 h-4 text-emerald-500" />
                    <span>Print / Download</span>
                  </button>
                )}

                {onOpenWarmUpCalculator && (
                  <button
                    type="button"
                    onClick={() => onOpenWarmUpCalculator(currentDay.exercises[0]?.name || 'Main Compound Lift')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors min-h-[40px]"
                  >
                    <Flame className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Warm-Up Ramp</span>
                  </button>
                )}
              </div>
            </div>

            {/* Session Metadata Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold text-[11px]">Date:</label>
                <input
                  type="date"
                  value={sessionLog.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => onUpdateSessionMeta({ date: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg px-2.5 py-2 text-base sm:text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold text-[11px]">Bodyweight:</label>
                <input
                  type="text"
                  placeholder="e.g. 185 lb"
                  value={sessionLog.bodyweight || ''}
                  onChange={(e) => onUpdateSessionMeta({ bodyweight: e.target.value })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg px-2.5 py-2 text-base sm:text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold text-[11px]">Duration (Min):</label>
                <input
                  type="number"
                  placeholder={`${currentDay.timeBudgetMinutes}`}
                  value={sessionLog.durationMinutes || ''}
                  onChange={(e) => onUpdateSessionMeta({ durationMinutes: parseInt(e.target.value, 10) || undefined })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg px-2.5 py-2 text-base sm:text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold text-[11px]">Session RPE (1-10):</label>
                <div className="relative">
                  <select
                    value={sessionLog.rpe || 7}
                    onChange={(e) => onUpdateSessionMeta({ rpe: parseInt(e.target.value, 10) })}
                    className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg pl-2.5 pr-7 py-2 text-base sm:text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer shadow-xs"
                  >
                    <option value={6} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">RPE 6 (3-4 in reserve)</option>
                    <option value={7} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">RPE 7 (3 in reserve)</option>
                    <option value={8} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">RPE 8 (2 in reserve)</option>
                    <option value={9} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">RPE 9 (1 in reserve)</option>
                    <option value={10} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">RPE 10 (Max effort)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Close Drawer Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsStatsDrawerOpen(false)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                <span>Collapse Drawer</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Completion Notice Toast */}
      {sessionCompletedNotice && (
        <div className="p-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 shrink-0" />
              <span>Workout Session Completed & Logged!</span>
            </div>
            {nutriPulseSyncInfo && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/20 text-slate-950 text-xs font-bold w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Synced to NutriPulse ({nutriPulseSyncInfo.caloriesBurned} kcal · {nutriPulseSyncInfo.duration}m)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onOpenBevelExport && (
              <button
                type="button"
                onClick={onOpenBevelExport}
                className="px-3 py-1.5 rounded-lg bg-slate-950 text-white hover:bg-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sync with Bevel</span>
              </button>
            )}
            {onOpenPrintModal && (
              <button
                type="button"
                onClick={onOpenPrintModal}
                className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-white hover:bg-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span>Print / PDF</span>
              </button>
            )}
            <span className="text-xs font-mono opacity-90">Week {activeWeek} · Day {activeDayNumber}</span>
          </div>
        </div>
      )}

      {/* INTERACTIVE EXERCISES SECTION WITH QUIET COLLAPSED HEADERS & PHASE-AWARE SETS */}
      <div className="space-y-3 sm:space-y-4">
        {currentDay.exercises.map((ex, exIndex) => {
          const setsCount = getEffectiveSetsCount(ex);
          const exerciseEntries = sessionLog.exerciseLogs[ex.id] || [];
          const swapped = sessionLog.swappedExercises?.[ex.id];
          const activeDisplayName = swapped?.name || ex.name;
          const isCollapsed = !!collapsedExercises[ex.id];

          // Compute exercise completion stats
          let completedSetsCount = 0;
          let peakLoad = '';
          let peakReps = '';
          let currentPeakNumeric = 0;

          for (let s = 0; s < setsCount; s++) {
            const entry = exerciseEntries[s];
            if (entry?.completed) {
              completedSetsCount++;
              if (entry.load) {
                peakLoad = entry.load;
                const num = extractNumericLoad(entry.load);
                if (num > currentPeakNumeric) currentPeakNumeric = num;
              }
              if (entry.reps) peakReps = entry.reps;
            }
          }
          const isAllSetsCompleted = setsCount > 0 && completedSetsCount === setsCount;
          const firstSetNumericLoad = exerciseEntries[0]?.load ? extractNumericLoad(exerciseEntries[0].load) : undefined;

          // Look up previous session performance memory
          const prevPerf = findLastExercisePerformance(
            allSessionLogs,
            program.id,
            activePhaseIndex,
            activeDayNumber,
            activeWeek,
            ex.id,
            ex.exerciseId
          );

          // ------------------------------------------------------------------
          // 1. QUIET COLLAPSED HEADER VIEW
          // ------------------------------------------------------------------
          if (isCollapsed) {
            return (
              <div
                key={ex.id}
                id={`exercise-card-${ex.id}`}
                onClick={() => toggleExerciseCollapse(ex.id)}
                className={`group cursor-pointer rounded-xl border p-3 sm:p-3.5 transition-all duration-200 flex items-center justify-between gap-3 ${
                  isAllSetsCompleted
                    ? 'bg-slate-900/40 dark:bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/60'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Left: Status icon & Title */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                    isAllSetsCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : completedSetsCount > 0
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {isAllSetsCompleted ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      ex.supersetGroup || (exIndex + 1)
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-emerald-500 transition-colors">
                        {activeDisplayName}
                      </span>
                      {swapped && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-mono">
                          Swapped
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center flex-wrap gap-x-2">
                      <span>Target: {ex.targetSetsReps}</span>
                      {peakLoad ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                          • Peak: {peakLoad} {peakReps ? `× ${peakReps}` : ''}
                        </span>
                      ) : prevPerf ? (
                        <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] sm:text-[11px] inline-flex items-center gap-1">
                          • <History className="w-3 h-3 text-emerald-500 shrink-0 inline" /> Last: {prevPerf.peakLoad} {prevPerf.peakReps ? `× ${prevPerf.peakReps}` : ''} ({prevPerf.sessionLabel})
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Right: Quiet stats & Expand Chevron */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isAllSetsCompleted
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {completedSetsCount}/{setsCount} Sets
                  </span>
                  <div className="p-1 text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          }

          // ------------------------------------------------------------------
          // 2. EXPANDED EXERCISE CARD VIEW
          // ------------------------------------------------------------------
          return (
            <div
              key={ex.id}
              id={`exercise-card-${ex.id}`}
              className={`bg-white dark:bg-slate-900 rounded-2xl border overflow-hidden shadow-sm transition-all duration-200 ${
                swapped 
                  ? 'border-amber-300 dark:border-amber-800/80 ring-1 ring-amber-500/10' 
                  : isAllSetsCompleted
                    ? 'border-emerald-300 dark:border-emerald-800/60'
                    : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Exercise Header */}
              <div className="p-3.5 sm:p-4 bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm border border-transparent dark:border-slate-700">
                      {ex.supersetGroup || (exIndex + 1)}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onOpenExerciseGuide(swapped?.newExerciseId || ex.exerciseId, activeDisplayName)}
                          className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-left"
                        >
                          <span className="truncate">{activeDisplayName}</span>
                          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </button>

                        {swapped && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-mono">
                            Swapped Alt
                          </span>
                        )}
                      </div>

                      {swapped && (
                        <div className="text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2 mt-0.5">
                          <span>Original: {ex.name} ({swapped.equipment || 'Alternative kit'})</span>
                          {onRevertSwap && (
                            <button
                              type="button"
                              onClick={() => onRevertSwap(ex.id)}
                              className="text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline flex items-center gap-0.5"
                            >
                              <RotateCcw className="w-2.5 h-2.5" />
                              <span>Undo</span>
                            </button>
                          )}
                        </div>
                      )}

                      <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Target:</span>
                        <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{ex.targetSetsReps}</span>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">{ex.progressionCue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Collapse Chevron Button (Collapses into Quiet Header) */}
                  <button
                    type="button"
                    onClick={() => toggleExerciseCollapse(ex.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
                    title="Collapse into Quiet Header"
                    aria-label="Collapse exercise"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>

                {/* Gym Actions Strip & Phase-Aware Set Customizer Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  {/* Phase-Aware Set Customization Control: [-] Sets [+] */}
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5 shadow-sm">
                      <button
                        type="button"
                        onClick={() => {
                          if (setsCount > 1 && onUpdateExerciseSetCount) {
                            onUpdateExerciseSetCount(ex.id, setsCount - 1, true);
                          }
                        }}
                        disabled={setsCount <= 1}
                        className="w-7 h-7 flex items-center justify-center rounded text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Remove set (Phase customized)"
                        aria-label="Remove set"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <div className="px-2 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 min-w-[50px] text-center">
                        {setsCount} {setsCount === 1 ? 'Set' : 'Sets'}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (setsCount < 12 && onUpdateExerciseSetCount) {
                            onUpdateExerciseSetCount(ex.id, setsCount + 1, true);
                          }
                        }}
                        disabled={setsCount >= 12}
                        className="w-7 h-7 flex items-center justify-center rounded text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        title="Add set (Phase customized)"
                        aria-label="Add set"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 hidden xs:inline">
                      Phase {activePhaseIndex + 1} Target
                    </span>
                  </div>

                  {/* Gym Action Buttons: Alt/Swap, Ramp, Rest */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {onOpenSwapModal && (
                      <button
                        type="button"
                        onClick={() => onOpenSwapModal(ex.id, activeDisplayName, ex.exerciseId)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] text-xs font-mono font-semibold rounded-lg transition-colors border ${
                          swapped
                            ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                            : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                        title="Instant equipment or biomechanical exercise swap"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5 text-amber-500" />
                        <span>{swapped ? 'Swapped' : 'Alt / Swap'}</span>
                      </button>
                    )}

                    {onOpenPlateCalculator && (
                      <button
                        type="button"
                        onClick={() => onOpenPlateCalculator(activeDisplayName, firstSetNumericLoad)}
                        className="flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] text-xs font-mono font-semibold rounded-lg bg-blue-50/80 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 transition-colors border border-blue-200 dark:border-blue-800"
                        title="Calculate barbell plate loading & sleeve visual"
                      >
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        <span>Plates</span>
                      </button>
                    )}

                    {onOpenWarmUpCalculator && (
                      <button
                        type="button"
                        onClick={() => onOpenWarmUpCalculator(activeDisplayName, firstSetNumericLoad)}
                        className="flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] text-xs font-mono font-semibold rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-200 dark:border-slate-700"
                        title="Calculate warm-up ramp sets and plates"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Ramp</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onStartRestTimer(ex.rest)}
                      className="flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] text-xs font-mono font-semibold rounded-lg bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
                      title={`Start rest countdown (${ex.rest})`}
                    >
                      <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{ex.rest}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Previous Session Memory Badge & 1-Tap Match */}
              {prevPerf && (
                <div className="mx-3.5 sm:mx-4 mt-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-150">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <History className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">
                          Last Session
                        </span>
                        <span className="font-mono font-extrabold text-slate-900 dark:text-white px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          {prevPerf.peakLoad} {prevPerf.peakReps ? `× ${prevPerf.peakReps}` : ''}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          ({prevPerf.sessionLabel})
                        </span>
                        {currentPeakNumeric > prevPerf.numericPeakLoad && prevPerf.numericPeakLoad > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-2xs animate-pulse">
                            <TrendingUp className="w-3 h-3" />
                            <span>+{Math.round((currentPeakNumeric - prevPerf.numericPeakLoad) * 10) / 10} lb PR!</span>
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                        {prevPerf.sets.length > 1 
                          ? `${prevPerf.sets.length} sets logged: ${prevPerf.sets.map(s => `${s.load}×${s.reps}`).join(', ')}`
                          : `Top set from previous training day`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleApplyPreviousPerformance(ex.id, setsCount, prevPerf)}
                      className="px-2.5 py-1.5 min-h-[34px] rounded-lg text-xs font-mono font-bold bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 hover:border-emerald-500 shadow-2xs transition-all flex items-center gap-1.5 active:scale-95"
                      title={`Pre-fill empty sets with ${prevPerf.peakLoad} from ${prevPerf.sessionLabel}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Match {prevPerf.peakLoad}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Set-by-Set Logging Rows (Mobile-Optimized Cards & Desktop Table) */}
              <div className="p-3 sm:p-4">
                {/* Desktop View Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-slate-400 dark:text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                        <th className="py-2 w-16">Set</th>
                        <th className="py-2 w-36">Weight / Load</th>
                        <th className="py-2 w-36">Reps Done</th>
                        <th className="py-2 text-center w-24">Done</th>
                        <th className="py-2 text-right">Quick Fill / Rest</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {Array.from({ length: setsCount }).map((_, setIdx) => {
                        const entry = exerciseEntries[setIdx] || {
                          setNumber: setIdx + 1,
                          load: '',
                          reps: '',
                          completed: false
                        };
                        const hasPrevSet = setIdx > 0 && !!exerciseEntries[setIdx - 1]?.load;

                        return (
                          <tr key={setIdx} className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors ${entry.completed ? 'bg-emerald-50/30 dark:bg-emerald-950/20' : ''}`}>
                            <td className="py-2.5 font-mono font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                              Set {setIdx + 1}
                            </td>
                            <td className="py-2.5 pr-2">
                              <div className="space-y-1">
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  placeholder={prevPerf?.peakLoad ? `Last: ${prevPerf.peakLoad}` : "e.g. 185 lb / 85 kg"}
                                  value={entry.load}
                                  onChange={(e) => onUpdateExerciseLog(ex.id, setIdx, 'load', e.target.value)}
                                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 rounded px-2.5 py-1.5 text-base sm:text-xs font-mono font-medium text-slate-900 dark:text-white"
                                />
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustLoad(ex.id, setIdx, -5)}
                                    className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                    title="Subtract 5 lbs"
                                  >
                                    -5
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustLoad(ex.id, setIdx, 5)}
                                    className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                    title="Add 5 lbs"
                                  >
                                    +5
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustLoad(ex.id, setIdx, 10)}
                                    className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                    title="Add 10 lbs"
                                  >
                                    +10
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="py-2.5 pr-2">
                              <input
                                type="text"
                                inputMode="numeric"
                                placeholder="e.g. 10"
                                value={entry.reps}
                                onChange={(e) => onUpdateExerciseLog(ex.id, setIdx, 'reps', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 rounded px-2.5 py-1.5 text-base sm:text-xs font-mono font-medium text-slate-900 dark:text-white"
                              />
                            </td>
                            <td className="py-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => handleToggleSetCompletion(ex, exIndex, setIdx, entry.completed)}
                                className={`w-8 h-8 rounded-lg inline-flex items-center justify-center transition-all ${
                                  entry.completed
                                    ? 'bg-emerald-600 text-white shadow-sm'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                                title={entry.completed ? 'Mark incomplete' : 'Mark set completed (triggers Auto-Advance on finish)'}
                              >
                                <Check className="w-4 h-4 stroke-[3]" />
                              </button>
                            </td>
                            <td className="py-2.5 text-right">
                              <div className="flex items-center justify-end gap-2 flex-wrap">
                                {!entry.completed && (
                                  <button
                                    type="button"
                                    onClick={() => handleQuickCompleteSet(ex, exIndex, setIdx)}
                                    className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 active:scale-95 transition-transform"
                                    title="1-Tap Auto-Fill & Complete Set"
                                  >
                                    <Zap className="w-2.5 h-2.5 text-emerald-500" />
                                    <span>1-Tap Done</span>
                                  </button>
                                )}
                                {hasPrevSet && onDuplicatePreviousSet && (
                                  <button
                                    type="button"
                                    onClick={() => onDuplicatePreviousSet(ex.id, setIdx)}
                                    className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                                    title="Copy load and reps from Set 1 / previous set"
                                  >
                                    <Copy className="w-3 h-3" />
                                    <span>Same as S{setIdx}</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => onStartRestTimer(ex.rest)}
                                  className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-2"
                                >
                                  {ex.rest}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View: Clean Stacked Cards for iPhone (No Horizontal Compression) */}
                <div className="sm:hidden space-y-2.5">
                  {Array.from({ length: setsCount }).map((_, setIdx) => {
                    const entry = exerciseEntries[setIdx] || {
                      setNumber: setIdx + 1,
                      load: '',
                      reps: '',
                      completed: false
                    };
                    const hasPrevSet = setIdx > 0 && !!exerciseEntries[setIdx - 1]?.load;

                    return (
                      <div
                        key={setIdx}
                        className={`p-3 rounded-xl border transition-colors flex flex-col gap-2 ${
                          entry.completed
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2.5">
                          {/* Set label & 1-Tap Duplicate Previous Set */}
                          <div className="flex items-center gap-2">
                            <span className="w-7 font-mono font-bold text-xs text-slate-700 dark:text-slate-300">
                              S{setIdx + 1}
                            </span>
                            {hasPrevSet && onDuplicatePreviousSet && (
                              <button
                                type="button"
                                onClick={() => onDuplicatePreviousSet(ex.id, setIdx)}
                                className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 active:scale-95 transition-transform"
                                title="Copy weight and reps from previous set"
                              >
                                <Copy className="w-2.5 h-2.5" />
                                <span>Copy S{setIdx}</span>
                              </button>
                            )}
                          </div>

                          {/* Quick rest trigger link */}
                          <button
                            type="button"
                            onClick={() => onStartRestTimer(ex.rest)}
                            className="text-[10px] font-mono text-slate-400 hover:text-emerald-400"
                          >
                            Rest: {ex.rest}
                          </button>
                        </div>

                        {/* Input Row: Load, Reps, Done Button */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div>
                              <input
                                type="text"
                                inputMode="decimal"
                                placeholder="Weight (lb/kg)"
                                value={entry.load}
                                onChange={(e) => onUpdateExerciseLog(ex.id, setIdx, 'load', e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-base sm:text-xs font-mono font-semibold text-slate-900 dark:text-white min-h-[42px]"
                              />
                            </div>
                            <div>
                              <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Reps"
                                value={entry.reps}
                                onChange={(e) => onUpdateExerciseLog(ex.id, setIdx, 'reps', e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-base sm:text-xs font-mono font-semibold text-slate-900 dark:text-white min-h-[42px]"
                              />
                            </div>
                          </div>

                          {/* Set Completion Button - 44px min tap target */}
                          <button
                            type="button"
                            onClick={() => handleToggleSetCompletion(ex, exIndex, setIdx, entry.completed)}
                            className={`w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-all shrink-0 ${
                              entry.completed
                                ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/30'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                            }`}
                            aria-label={`Mark Set ${setIdx + 1} complete`}
                          >
                            <Check className="w-5 h-5 stroke-[3]" />
                          </button>
                        </div>

                        {/* Quick Steppers & 1-Tap Complete Toolbar (Zero Keyboard Fumbling) */}
                        <div className="flex items-center justify-between gap-1 pt-1 border-t border-slate-200/50 dark:border-slate-800/80">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-mono text-slate-400 mr-0.5">Nudge:</span>
                            <button
                              type="button"
                              onClick={() => handleAdjustLoad(ex.id, setIdx, -5)}
                              className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform"
                              title="Minus 5 lbs"
                            >
                              -5
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdjustLoad(ex.id, setIdx, 5)}
                              className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform"
                              title="Plus 5 lbs"
                            >
                              +5
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdjustLoad(ex.id, setIdx, 10)}
                              className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 active:scale-95 transition-transform"
                              title="Plus 10 lbs"
                            >
                              +10
                            </button>
                          </div>

                          {!entry.completed && (
                            <button
                              type="button"
                              onClick={() => handleQuickCompleteSet(ex, exIndex, setIdx)}
                              className="px-2.5 py-1 min-h-[30px] rounded-lg text-[10px] font-mono font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1 active:scale-95 transition-transform shadow-xs"
                              title="1-Tap Log: Auto-fills load/reps and marks complete"
                            >
                              <Zap className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span>{hasPrevSet ? `Log ${exerciseEntries[setIdx - 1]?.load || ''} × ${exerciseEntries[setIdx - 1]?.reps || ''}` : '1-Tap Log'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer collapse action */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] font-mono">
                    {completedSetsCount} of {setsCount} sets logged
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleExerciseCollapse(ex.id)}
                    className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-500 flex items-center gap-1"
                  >
                    <span>Quiet Collapse</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Position Specialization Accessory & Finisher Checklist */}
      {activePosition && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-slate-50 dark:via-slate-900 to-transparent rounded-2xl p-4 sm:p-5 border border-emerald-500/30 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2 flex-wrap">
              <Target className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Role Focus: {activePosition.shortCode} — {activePosition.name}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                {activePosition.roleBadge}
              </span>
            </div>
            {onNavigateToPositionsTab && (
              <button
                type="button"
                onClick={onNavigateToPositionsTab}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Full Tactical Protocols</span>
                <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Role-Specific Targeted Accessories:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activePosition.recommendedModifications.recommendedAccessoryProtocols.map(acc => (
                <div key={acc.id} className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-slate-900 dark:text-white">{acc.name}</span>
                      <span className="font-mono text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">{acc.prescription}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-2">
                      <strong className="text-slate-800 dark:text-slate-200">Cue: </strong>{acc.coachingCue}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] text-slate-400 italic">{acc.scientificRationale}</span>
                    <button
                      type="button"
                      onClick={() => onStartRestTimer('60s')}
                      className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-mono flex items-center gap-1 shrink-0 ml-2"
                      title="Start 60s rest timer"
                    >
                      <Clock className="w-3 h-3 text-emerald-500" />
                      <span>60s</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tactical Finisher */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Finisher Drill: {activePosition.recommendedModifications.finisherDrill.name}</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200">Interval: </strong>{activePosition.recommendedModifications.finisherDrill.workRest}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {activePosition.recommendedModifications.finisherDrill.protocol}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onStartRestTimer('30s')}
                className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 self-start sm:self-center shrink-0"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Timer Preset</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Notes & Finish Workout Button */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
            Coach / Athlete Notes:
          </label>
          <textarea
            rows={3}
            placeholder="Log bar speed, joint readiness, soreness, or load adjustments..."
            value={sessionLog.sessionNotes || ''}
            onChange={(e) => onUpdateSessionMeta({ sessionNotes: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 rounded-lg p-3 text-base sm:text-xs text-slate-800 dark:text-slate-200 leading-relaxed focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Persistent auto-save enabled</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenPrintModal && (
              <button
                type="button"
                onClick={onOpenPrintModal}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg border border-slate-300 dark:border-slate-700 transition-all whitespace-nowrap"
                title="Print workout card, save as PDF, or download CSV"
              >
                <Printer className="w-4 h-4 text-emerald-500" />
                <span>Print / Download</span>
              </button>
            )}

            {onOpenBevelExport && (
              <button
                type="button"
                onClick={onOpenBevelExport}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg border border-slate-300 dark:border-slate-700 transition-all whitespace-nowrap"
                title="Export or share this workout with Bevel / Superset"
              >
                <Share2 className="w-4 h-4 text-emerald-500" />
                <span>Share to Bevel</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleFinishWorkout}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md transition-all whitespace-nowrap active:scale-98"
            >
              <Award className="w-4 h-4" />
              <span>Complete & Log Workout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
