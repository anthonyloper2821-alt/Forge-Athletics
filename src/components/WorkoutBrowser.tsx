import React, { useState } from 'react';
import { SportProgram, PositionSpecialization, MovementCategory, TrainingFrequency } from '../types/sport';
import { Clock, Play, Info, AlertCircle, ChevronRight, Zap, ArrowLeftRight, Flame, ChevronDown, Layers, Target, Calendar, Printer, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { FREQUENCY_CONFIGS } from '../utils/adaptiveFrequency';

interface WorkoutBrowserProps {
  program: SportProgram;
  activePhaseIndex: number;
  onSelectPhaseIndex: (index: number) => void;
  activeDayNumber: number;
  onSelectDayNumber: (day: number) => void;
  onOpenExerciseGuide: (exerciseId: string, name: string) => void;
  onStartSession: (dayNumber: number) => void;
  emergency30MinMode: boolean;
  onToggleEmergencyMode: () => void;
  onStartTimerWithRest: (restStr: string) => void;
  onOpenSwapModal?: (exerciseId: string, name: string, catalogExerciseId?: string, category?: MovementCategory) => void;
  onOpenPlateCalculator?: (exerciseName: string) => void;
  onOpenWarmUpCalculator?: (exerciseName: string) => void;
  onOpenPrintModal?: () => void;
  activePosition?: PositionSpecialization;
  onNavigateToPositionsTab?: () => void;
  trainingFrequency?: TrainingFrequency;
  onSelectFrequency?: (freq: TrainingFrequency) => void;
  swappedExercises?: Record<string, {
    name: string;
    originalExerciseId: string;
    newExerciseId?: string;
    equipment?: string;
    rationale?: string;
  }>;
  onRevertSwap?: (exerciseId: string) => void;
}

export const WorkoutBrowser: React.FC<WorkoutBrowserProps> = ({
  program,
  activePhaseIndex,
  onSelectPhaseIndex,
  activeDayNumber,
  onSelectDayNumber,
  onOpenExerciseGuide,
  onStartSession,
  emergency30MinMode,
  onToggleEmergencyMode,
  onStartTimerWithRest,
  onOpenSwapModal,
  onOpenPlateCalculator,
  onOpenWarmUpCalculator,
  onOpenPrintModal,
  activePosition,
  onNavigateToPositionsTab,
  trainingFrequency = 4,
  onSelectFrequency,
  swappedExercises,
  onRevertSwap
}) => {
  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const currentDay = currentPhase?.days?.find(d => d.dayNumber === activeDayNumber) || currentPhase?.days?.[0];
  const [showTimeCrunchDetails, setShowTimeCrunchDetails] = useState(false);

  // Filter exercises if 30-minute emergency protocol is enabled
  const displayedExercises = emergency30MinMode
    ? (currentDay?.exercises?.slice(0, 3) || [])
    : (currentDay?.exercises || []);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Phase Directive Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 pb-3.5 mb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex-1 max-w-2xl space-y-1">
            <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span>Phase Directive</span>
              <span className="text-slate-300 dark:text-slate-700 font-normal">·</span>
              <span className="text-slate-900 dark:text-white font-extrabold">{currentPhase.theme}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {currentPhase.emphasis}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/70 rounded-lg p-2.5 sm:px-3.5 sm:py-2.5 border border-slate-200 dark:border-slate-700/80 shrink-0 w-full lg:w-auto lg:max-w-md">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">
              Prescription Target
            </div>
            <div className="text-xs font-mono font-bold text-slate-900 dark:text-emerald-300 leading-snug">
              {currentPhase.prescription}
            </div>
          </div>
        </div>

        {/* Adaptive Training Frequency Selector */}
        {onSelectFrequency && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Split Frequency:
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {FREQUENCY_CONFIGS[trainingFrequency].label} · {FREQUENCY_CONFIGS[trainingFrequency].badge}
              </span>
            </div>

            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit">
              {([3, 4, 5] as TrainingFrequency[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => onSelectFrequency(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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

        {/* Adaptive Days Selector Grid */}
        <div className={`grid grid-cols-2 ${currentPhase.days.length === 5 ? 'sm:grid-cols-5' : currentPhase.days.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'} gap-2 pt-1`}>
          {currentPhase.days.map((day, dIdx) => {
            const isDaySelected = day.dayNumber === activeDayNumber;
            const isOddLast = currentPhase.days.length % 2 !== 0 && dIdx === currentPhase.days.length - 1;
            return (
              <button
                key={day.dayNumber}
                onClick={() => onSelectDayNumber(day.dayNumber)}
                className={`p-3 min-h-[56px] rounded-lg text-left transition-all border ${
                  isOddLast ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isDaySelected
                    ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 dark:border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-bold ${isDaySelected ? 'text-emerald-400 dark:text-slate-950' : 'text-slate-900 dark:text-white'}`}>
                    Day {day.dayNumber}
                  </span>
                  <span className={`text-[10px] ${isDaySelected ? 'text-slate-300 dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}>
                    {day.typicalPlacement}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate" title={day.name}>
                  {day.name.replace(/Day \d+ —? ?/, '')}
                </div>
                <div className={`text-[11px] flex items-center gap-1 mt-1 ${isDaySelected ? 'text-slate-300 dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}>
                  <Clock className="w-3 h-3" />
                  <span>{day.timeBudgetMinutes}m</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Day Detail Header */}
      <div className="bg-slate-900 dark:bg-slate-900/90 text-white rounded-xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <span>Day {currentDay.dayNumber}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="truncate max-w-[200px] sm:max-w-none">{currentDay.focus}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>~{currentDay.timeBudgetMinutes} Min</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {currentDay.name}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            {currentDay.coachingNotes}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Warm-Up Ramp Calculator Button */}
          {onOpenWarmUpCalculator && (
            <button
              onClick={() => onOpenWarmUpCalculator(currentDay.exercises[0]?.name || 'Main Compound Lift')}
              className="flex items-center justify-center gap-1.5 px-3 py-2 min-h-[44px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold rounded-lg transition-all"
              title="Calculate warm-up ramp sets and barbell plate math"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Warm-Up Ramp</span>
              <span className="sm:hidden">Ramp</span>
            </button>
          )}

          {/* Print / Download Button */}
          {onOpenPrintModal && (
            <button
              onClick={onOpenPrintModal}
              className="flex items-center justify-center gap-1.5 px-3 py-2 min-h-[44px] bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold rounded-lg transition-all"
              title="Print workout card, save as PDF, or download CSV"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Print / Download</span>
              <span className="sm:hidden">Print</span>
            </button>
          )}

          {/* Emergency 30-min Toggle */}
          <button
            onClick={onToggleEmergencyMode}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 min-h-[44px] text-xs font-semibold rounded-lg transition-all border ${
              emergency30MinMode
                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Toggle compressed 30-minute essential session"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{emergency30MinMode ? '30-Min ON' : '30-Min Emergency'}</span>
            <span className="sm:hidden">30-Min</span>
          </button>

          {/* Start Live Session Button */}
          <button
            onClick={() => onStartSession(currentDay.dayNumber)}
            className="flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md transition-all whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Open Logger</span>
          </button>
        </div>
      </div>

      {/* Emergency Mode Banner (if active) */}
      {emergency30MinMode && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">30-Minute Emergency Protocol Activated: </span>
            {currentDay.emergency30MinProtocol || '5 min warm-up » Primary compound 3 sets » Main superset pair 3 rounds » 5 min hard cardio finisher.'}
          </div>
        </div>
      )}

      {/* Warm-Up / Cool-Down Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Warm-Up Protocol (8-10 Min)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {currentDay.warmUpProtocol}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Cool-Down & Flush (5-10 Min)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {currentDay.coolDownProtocol}
          </p>
        </div>
      </div>

      {/* Exercises Table / List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="px-4 sm:px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Movement Sequence ({displayedExercises.length} Exercises)
          </span>
          <button
            onClick={() => setShowTimeCrunchDetails(!showTimeCrunchDetails)}
            className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Time-Crunch Rules</span>
            <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showTimeCrunchDetails ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Time-crunch hierarchy dropdown drawer */}
        {showTimeCrunchDetails && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <div className="font-bold text-slate-900 dark:text-white mb-1">Time-Crunch Hierarchy:</div>
            <div>1. <strong>Cut 1st:</strong> Metabolic finisher / armor circuit (saves 8-10 min).</div>
            <div>2. <strong>Cut 2nd:</strong> Drop final round of last superset pair.</div>
            <div>3. <strong>Cut 3rd:</strong> Reduce main lift from 4 sets to 3 sets (keep the weight!).</div>
            <div><strong>Never cut:</strong> The 5-8 min warm-up or sprint mechanics.</div>
          </div>
        )}

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {displayedExercises.map((ex, idx) => {
            const swapped = swappedExercises?.[ex.id];
            const activeDisplayName = swapped?.name || ex.name;
            const activeExerciseId = swapped?.newExerciseId || ex.exerciseId;

            return (
              <div
                key={ex.id}
                className={`p-3.5 sm:p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  swapped ? 'bg-amber-500/[0.04] dark:bg-amber-500/[0.06]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Superset / Pair Badge */}
                  <div className={`w-8 h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                    swapped
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}>
                    {ex.supersetGroup || (idx + 1)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => onOpenExerciseGuide(activeExerciseId, activeDisplayName)}
                        className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left flex items-center gap-1.5 min-h-[32px]"
                      >
                        <span>{activeDisplayName}</span>
                        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                      {swapped && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-mono">
                          Swapped Alt
                        </span>
                      )}
                      {ex.isOptionalFinisher && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 italic">Optional</span>
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
                            title="Revert back to original blueprint exercise"
                          >
                            <RotateCcw className="w-2.5 h-2.5" />
                            <span>Undo</span>
                          </button>
                        )}
                      </div>
                    )}

                    <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Progression Cue: </span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">{ex.progressionCue}</span>
                    </div>
                  </div>
                </div>

                {/* Targets and Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800/60">
                  <div className="text-left sm:text-right">
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {ex.targetSetsReps}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Rest: {ex.rest}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Equipment Swap / In-Rack Alt Trigger */}
                    {onOpenSwapModal && (
                      <button
                        onClick={() => onOpenSwapModal(ex.id, activeDisplayName, activeExerciseId)}
                        className={`px-2 py-1.5 min-h-[36px] rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1 ${
                          swapped
                            ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/25'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                        title="View instant equipment or in-rack alternatives"
                      >
                        <ArrowLeftRight className="w-3 h-3 text-amber-500" />
                        <span className="hidden sm:inline">{swapped ? 'Swapped' : 'Swap'}</span>
                      </button>
                    )}

                    {/* Plate Calculator Trigger */}
                    {onOpenPlateCalculator && (
                      <button
                        onClick={() => onOpenPlateCalculator(activeDisplayName)}
                        className="px-2 py-1.5 min-h-[36px] bg-blue-50/80 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1"
                        title="Calculate barbell plates & sleeve visual"
                      >
                        <Layers className="w-3 h-3 text-blue-500" />
                        <span className="hidden sm:inline">Plates</span>
                      </button>
                    )}

                    {/* Warm-Up Ramp Calculator Trigger */}
                    {onOpenWarmUpCalculator && (
                      <button
                        onClick={() => onOpenWarmUpCalculator(activeDisplayName)}
                        className="px-2 py-1.5 min-h-[36px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1"
                        title="Calculate warm-up ramp ladder & plates"
                      >
                        <Flame className="w-3 h-3 text-amber-500" />
                        <span className="hidden sm:inline">Ramp</span>
                      </button>
                    )}

                    {/* Rest Timer Preset Trigger */}
                    <button
                      onClick={() => onStartTimerWithRest(ex.rest)}
                      className="px-2.5 py-1.5 min-h-[36px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1"
                      title={`Start ${ex.rest} rest timer`}
                    >
                      <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>Timer</span>
                    </button>

                    <button
                      onClick={() => onOpenExerciseGuide(activeExerciseId, activeDisplayName)}
                      className="p-1.5 min-h-[36px] min-w-[36px] text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors flex items-center justify-center"
                      title="View instructions & progressions"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Positional Role Specialization Focus & Finisher Block */}
        {activePosition && (
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-slate-50 dark:via-slate-900 to-transparent border border-emerald-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2 flex-wrap">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Active Role Protocol: {activePosition.shortCode} — {activePosition.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  {activePosition.roleBadge}
                </span>
              </div>
              {onNavigateToPositionsTab && (
                <button
                  onClick={onNavigateToPositionsTab}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Role Breakdown & Standards</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-slate-900 dark:text-white">Prescribed Positional Accessories:</strong>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activePosition.recommendedModifications.recommendedAccessoryProtocols.map(acc => (
                  <div key={acc.id} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 dark:text-white">{acc.name}</span>
                      <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">{acc.prescription}</span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Cue: </span>{acc.coachingCue}
                    </div>
                    <div className="text-[10px] text-slate-400 italic">
                      {acc.scientificRationale}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 mb-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Role Finisher Drill: {activePosition.recommendedModifications.finisherDrill.name}</span>
                </div>
                <div className="text-slate-600 dark:text-slate-300 text-[11px] mb-1">
                  <span className="font-semibold">Work/Rest: </span>{activePosition.recommendedModifications.finisherDrill.workRest}
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                  {activePosition.recommendedModifications.finisherDrill.protocol}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

