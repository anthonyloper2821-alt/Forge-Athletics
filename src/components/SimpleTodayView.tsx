import React, { useState } from 'react';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Dumbbell, 
  Sparkles, 
  RotateCcw,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  ChevronDown,
  X,
  Check
} from 'lucide-react';
import { SportProgram, DaySessionLog, SportId, PositionSpecialization } from '../types/sport';
import { UserProfile } from '../types/profile';
import { SPORT_TABS } from '../data/sportsOverview';
import { POSITIONS_BY_SPORT } from '../data/positionSpecializations';

interface SimpleTodayViewProps {
  program: SportProgram;
  activeProfile: UserProfile;
  activePhaseIndex: number;
  activeDayNumber: number;
  onSelectDayNumber: (day: number) => void;
  onStartSession: (dayNumber: number) => void;
  sessionLog?: DaySessionLog;
  allSessionLogs: Record<string, DaySessionLog>;
  onOpenProfileSwitcher: () => void;
  onSwitchToAdvanced: () => void;
  swappedExercises?: Record<string, { name: string }>;
  selectedSport?: SportId;
  onSelectSport?: (sport: SportId) => void;
  activePosition?: PositionSpecialization;
  onSelectPositionId?: (posId: string) => void;
}

export const SimpleTodayView: React.FC<SimpleTodayViewProps> = ({
  program,
  activeProfile,
  activePhaseIndex,
  activeDayNumber,
  onSelectDayNumber,
  onStartSession,
  sessionLog,
  allSessionLogs,
  onOpenProfileSwitcher,
  onSwitchToAdvanced,
  swappedExercises = {},
  selectedSport = 'functional',
  onSelectSport,
  activePosition,
  onSelectPositionId
}) => {
  const [isSportDrawerOpen, setIsSportDrawerOpen] = useState(false);
  const [expandedSport, setExpandedSport] = useState<SportId | null>(null);
  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const totalDays = currentPhase?.days?.length || 4;
  const currentDay = currentPhase?.days?.find(d => d.dayNumber === activeDayNumber) || currentPhase?.days?.[0];

  // Calculate completion for today's session
  const exercises = currentDay?.exercises || [];
  const exerciseLogs = sessionLog?.exerciseLogs || {};
  
  let totalSets = 0;
  let completedSets = 0;
  
  exercises.forEach(ex => {
    // Default 3 sets
    const match = ex.targetSetsReps.match(/(\d+)\s*[x×]/i);
    const count = match ? parseInt(match[1], 10) : 3;
    totalSets += count;
    
    const logs = exerciseLogs[ex.id] || [];
    logs.forEach(log => {
      if (log.completed) completedSets++;
    });
  });

  const isStarted = completedSets > 0;
  const isFinished = totalSets > 0 && completedSets >= totalSets;

  // Previous & Next Day handlers
  const handlePrevDay = () => {
    const prev = activeDayNumber > 1 ? activeDayNumber - 1 : totalDays;
    onSelectDayNumber(prev);
  };

  const handleNextDay = () => {
    const next = activeDayNumber < totalDays ? activeDayNumber + 1 : 1;
    onSelectDayNumber(next);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      {/* Friendly Profile Header Strip */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
            {activeProfile.avatarLabel || activeProfile.name.charAt(0)}
          </div>
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Welcome back,
            </div>
            <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{activeProfile.name}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                Simple Mode
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenProfileSwitcher}
          className="px-3 py-1.5 min-h-[40px] rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <span>Switch Profile</span>
        </button>
      </div>

      {/* Hero Card: Today's Workout */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        {/* Day Navigator Controls */}
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <button
            type="button"
            onClick={handlePrevDay}
            className="flex items-center gap-1 min-h-[44px] px-2 hover:text-white transition-colors"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4 text-emerald-400" />
            <span>Prev Day</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalDays }).map((_, idx) => {
              const dNum = idx + 1;
              const isSelected = dNum === activeDayNumber;
              return (
                <button
                  key={dNum}
                  type="button"
                  onClick={() => onSelectDayNumber(dNum)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isSelected
                      ? 'bg-emerald-400 scale-125'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to day ${dNum}`}
                />
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNextDay}
            className="flex items-center gap-1 min-h-[44px] px-2 hover:text-white transition-colors"
            aria-label="Next day"
          >
            <span>Next Day</span>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>

        {/* Big Workout Title */}
        <div className="space-y-2">
          <div className="text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
            Day {activeDayNumber} of {totalDays} · {program.name.split('·')[0].trim()}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {currentDay?.name?.replace(/^Day\s*\d+\s*[-–]\s*/i, '') || 'Today’s Training'}
          </h2>
          <p className="text-sm text-slate-300 font-medium">
            {currentDay?.focus || 'Full-body functional movement, core stability & joint health'}
          </p>
        </div>

        {/* Quick Meta Stats */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-300 pt-1">
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentDay?.timeBudgetMinutes || 40} Minutes</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
            <span>{exercises.length} Movements</span>
          </div>
        </div>

        {/* Big Start / Continue Button */}
        <div>
          <button
            type="button"
            onClick={() => onStartSession(activeDayNumber)}
            className="w-full py-4 px-6 min-h-[56px] rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black text-lg tracking-tight shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>
              {isFinished
                ? 'Workout Completed (Review)'
                : isStarted
                ? `Continue Workout (${completedSets}/${totalSets} Sets Done)`
                : 'Start Today’s Workout'}
            </span>
          </button>
        </div>
      </div>

      {/* Simple Exercise Checklist Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Exercises on the Schedule</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {exercises.length} Total
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {exercises.map((ex, idx) => {
            const swapped = swappedExercises[ex.id];
            const displayName = swapped ? swapped.name : ex.name;
            const logs = exerciseLogs[ex.id] || [];
            const isExDone = logs.length > 0 && logs.every(l => l.completed);

            return (
              <div 
                key={ex.id}
                className="py-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isExDone
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {isExDone ? '✓' : idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {displayName}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {ex.targetSetsReps}
                    </div>
                  </div>
                </div>

                {swapped && (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 shrink-0">
                    Alt
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Start button duplicate at bottom of preview */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => onStartSession(activeDayNumber)}
            className="w-full py-3 px-4 min-h-[48px] rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-900 dark:text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Enter Gym Floor Mode</span>
            <ArrowRight className="w-4 h-4 text-emerald-500" />
          </button>
        </div>
      </div>

      {/* Quiet Footer Switch to Advanced Mode */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onSwitchToAdvanced}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 underline font-medium"
        >
          Want more sports or advanced tools? Switch to Advanced Mode
        </button>
      </div>
    </div>
  );
};
