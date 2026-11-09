import React, { useState } from 'react';
import { SportId, SportProgram, PositionSpecialization } from '../types/sport';
import { SPORT_TABS } from '../data/sportsOverview';
import { 
  HeartPulse, 
  Shield, 
  Flame, 
  Zap, 
  Activity, 
  TrendingUp, 
  ChevronDown, 
  ChevronRight, 
  Calendar, 
  Layers, 
  Target,
  SlidersHorizontal,
  Check
} from 'lucide-react';

interface CascadingWorkoutSelectorProps {
  program: SportProgram;
  selectedSport: SportId;
  onSelectSport: (sport: SportId) => void;
  activePhaseIndex: number;
  onSelectPhaseIndex: (phaseIndex: number) => void;
  activeDayNumber: number;
  onSelectDayNumber: (dayNumber: number) => void;
  activePosition?: PositionSpecialization;
  positions?: PositionSpecialization[];
  onSelectPosition?: (positionId: string) => void;
  activeWeek?: number;
  isCollapsedByDefault?: boolean;
  onStartSession?: () => void;
}

export const CascadingWorkoutSelector: React.FC<CascadingWorkoutSelectorProps> = ({
  program,
  selectedSport,
  onSelectSport,
  activePhaseIndex,
  onSelectPhaseIndex,
  activeDayNumber,
  onSelectDayNumber,
  activePosition,
  positions = [],
  onSelectPosition,
  activeWeek = 1,
  isCollapsedByDefault = false,
  onStartSession
}) => {
  // Collapse state for the breadcrumb mode
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isCollapsedByDefault);

  const getSportIcon = (id: SportId) => {
    switch (id) {
      case 'functional': return <HeartPulse className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'boxing': return <Shield className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'rugby': return <Flame className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'football': return <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'soccer': return <Activity className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
      case 'basketball': return <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
    }
  };

  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const currentDay = currentPhase?.days?.find(d => d.dayNumber === activeDayNumber) || currentPhase?.days?.[0];
  const hasPositions = positions && positions.length > 0;

  // Handle sport change: ensure active phase & day reset safely to valid values
  const handleSportChange = (newSport: SportId) => {
    onSelectSport(newSport);
    onSelectPhaseIndex(0);
    onSelectDayNumber(1);
  };

  // Handle phase change: ensure active day resets safely to first day of new phase
  const handlePhaseChange = (newPhaseIdx: number) => {
    onSelectPhaseIndex(newPhaseIdx);
    const targetPhase = program.phases[newPhaseIdx];
    if (targetPhase && targetPhase.days.length > 0) {
      onSelectDayNumber(targetPhase.days[0].dayNumber);
    }
  };

  // -------------------------------------------------------------
  // Collapsed Breadcrumb View (Option A: Streamlined Command Bar)
  // -------------------------------------------------------------
  if (isCollapsed) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 sm:px-4 py-2.5 shadow-xs mb-4 transition-all">
        <div className="flex items-center justify-between gap-3">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600 dark:text-slate-300 overflow-x-auto no-scrollbar py-0.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white shrink-0">
              {getSportIcon(selectedSport)}
              <span>{program.name.replace(' Program', '')}</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" aria-hidden="true" />

            <div className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[140px] sm:max-w-[200px] shrink-0" title={currentPhase.title}>
              Phase {activePhaseIndex + 1}: {currentPhase.title}
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" aria-hidden="true" />

            <div className="font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[160px] sm:max-w-none shrink-0">
              Day {activeDayNumber}: {currentDay?.name?.replace(/Day \d+ —? ?/, '') || `Day ${activeDayNumber}`}
            </div>

            {activePosition && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" aria-hidden="true" />
                <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
                  [{activePosition.shortCode}]
                </span>
              </>
            )}
          </div>

          {/* Action Trigger to Re-open Cascading Bar */}
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 transition-colors"
            title="Modify sport, phase, or day"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Change Session</span>
            <span className="sm:hidden">Change</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Expanded Cascading Dropdowns Bar (Option A: Step-by-Step Flow)
  // -------------------------------------------------------------
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-sm mb-5 transition-all">
      {/* Top Header of the Cascading Selector */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Sequential Program Selector
          </span>
          <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">·</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
            Follow steps 1 through {hasPositions ? '4' : '3'} to lock in your training session
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 py-1 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Minimize selector bar"
        >
          <span>Collapse</span>
          <ChevronDown className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>

      {/* Cascading Steps Grid: Horizontal on Desktop, Vertical Stepper on Mobile */}
      <div className={`grid grid-cols-1 ${hasPositions ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-3 sm:gap-4`}>
        
        {/* ======================================================== */}
        {/* STEP 1: SPORT DISCIPLINE (Always visible)                */}
        {/* ======================================================== */}
        <div className="space-y-1.5">
          <label 
            htmlFor="cascade-sport-select" 
            className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-mono text-[10px] flex items-center justify-center font-bold">
                1
              </span>
              <span>Discipline</span>
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              Active
            </span>
          </label>

          <div className="relative">
            <select
              id="cascade-sport-select"
              value={selectedSport}
              onChange={(e) => handleSportChange(e.target.value as SportId)}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold pl-9 pr-8 py-2.5 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs cursor-pointer transition-colors"
            >
              {SPORT_TABS.map((sport) => (
                <option key={sport.id} value={sport.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1.5">
                  {sport.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              {getSportIcon(selectedSport)}
            </div>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate px-1" title={program.subtitle}>
            {program.badge} · {program.phases.length} Phases
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 2: TRAINING PHASE / BLOCK (Cascades from Step 1)     */}
        {/* ======================================================== */}
        <div className="space-y-1.5 animate-fadeIn">
          <label 
            htmlFor="cascade-phase-select" 
            className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-mono text-[10px] flex items-center justify-center font-bold">
                2
              </span>
              <span>Training Block</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              {currentPhase.weeks}
            </span>
          </label>

          <div className="relative">
            <select
              id="cascade-phase-select"
              value={activePhaseIndex}
              onChange={(e) => handlePhaseChange(Number(e.target.value))}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold pl-9 pr-8 py-2.5 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs cursor-pointer transition-colors"
            >
              {program.phases.map((phase, idx) => (
                <option key={phase.id} value={idx} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1.5">
                  Phase {idx + 1}: {phase.title} ({phase.weeks})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate px-1" title={currentPhase.theme}>
            Focus: <span className="font-medium text-slate-700 dark:text-slate-300">{currentPhase.theme}</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 3: TRAINING DAY / SESSION (Cascades from Step 2)     */}
        {/* ======================================================== */}
        <div className="space-y-1.5 animate-fadeIn">
          <label 
            htmlFor="cascade-day-select" 
            className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-mono text-[10px] flex items-center justify-center font-bold">
                3
              </span>
              <span>Session / Day</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              ~{currentDay?.timeBudgetMinutes || 60}m
            </span>
          </label>

          <div className="relative">
            <select
              id="cascade-day-select"
              value={activeDayNumber}
              onChange={(e) => onSelectDayNumber(Number(e.target.value))}
              className="w-full appearance-none bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold pl-9 pr-8 py-2.5 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs cursor-pointer transition-colors"
            >
              {currentPhase.days.map((day) => (
                <option key={day.dayNumber} value={day.dayNumber} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1.5">
                  Day {day.dayNumber}: {day.name} ({day.typicalPlacement})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate px-1" title={currentDay?.focus}>
            Split: <span className="font-medium text-slate-700 dark:text-slate-300">{currentDay?.focus}</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STEP 4: POSITIONAL ROLE SPECIALIZATION (If applicable)   */}
        {/* ======================================================== */}
        {hasPositions && (
          <div className="space-y-1.5 animate-fadeIn">
            <label 
              htmlFor="cascade-role-select" 
              className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-mono text-[10px] flex items-center justify-center font-bold">
                  4
                </span>
                <span>Role Focus</span>
              </span>
              {activePosition && (
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {activePosition.shortCode}
                </span>
              )}
            </label>

            <div className="relative">
              <select
                id="cascade-role-select"
                value={activePosition?.id || positions[0]?.id}
                onChange={(e) => onSelectPosition?.(e.target.value)}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold pl-9 pr-8 py-2.5 min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs cursor-pointer transition-colors"
              >
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white py-1.5">
                    {pos.shortCode} — {pos.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 dark:text-emerald-400">
                <Target className="w-4 h-4" />
              </div>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate px-1" title={activePosition?.roleBadge}>
              Standard: <span className="font-medium text-slate-700 dark:text-slate-300">{activePosition?.roleBadge}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Confirmation & Action Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>
            Ready for <strong>{currentDay?.name}</strong> (~{currentDay?.exercises.length || 0} movements)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onStartSession && (
            <button
              type="button"
              onClick={onStartSession}
              className="flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <span>Open Logger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 min-h-[40px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <span>Lock &amp; Collapse</span>
          </button>
        </div>
      </div>
    </div>
  );
};
