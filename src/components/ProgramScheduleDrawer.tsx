import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Calendar, 
  Layers, 
  Shield, 
  ChevronRight, 
  Clock, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { SportProgram, SportId, PositionSpecialization } from '../types/sport';
import { SPORT_TABS } from '../data/sportsOverview';
import { POSITIONS_BY_SPORT } from '../data/positionSpecializations';
import { saveDeviceRoutineState } from '../utils/deviceProfile';

interface ProgramScheduleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  program: SportProgram;
  selectedSport: SportId;
  onSelectSport: (sport: SportId) => void;
  activePhaseIndex: number;
  onSelectPhaseIndex: (phaseIdx: number) => void;
  activeDayNumber: number;
  onSelectDayNumber: (dayNum: number) => void;
  activePosition?: PositionSpecialization;
  positions: PositionSpecialization[];
  onSelectPosition: (positionId: string) => void;
  activeWeek: number;
  onSelectWeek?: (weekNum: number) => void;
}

export const ProgramScheduleDrawer: React.FC<ProgramScheduleDrawerProps> = ({
  isOpen,
  onClose,
  program,
  selectedSport,
  onSelectSport,
  activePhaseIndex,
  onSelectPhaseIndex,
  activeDayNumber,
  onSelectDayNumber,
  activePosition,
  positions,
  onSelectPosition,
  activeWeek,
  onSelectWeek
}) => {
  if (!isOpen) return null;

  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];
  const phaseDays = currentPhase?.days || [];
  const weekNumbers = currentPhase?.weekNumbers || [1, 2, 3, 4];
  const sportPositions = positions.length > 0 ? positions : (POSITIONS_BY_SPORT[selectedSport] || []);

  const handleApplySport = (sportId: SportId) => {
    onSelectSport(sportId);
    // Reset to phase 0, day 1 for new sport
    onSelectPhaseIndex(0);
    onSelectDayNumber(1);
    const newPositions = POSITIONS_BY_SPORT[sportId] || [];
    const defaultPosId = newPositions[0]?.id || 'all';
    if (newPositions.length > 0) {
      onSelectPosition(defaultPosId);
    }
    saveDeviceRoutineState({
      sportId,
      positionId: defaultPosId,
      phaseIndex: 0,
      weekNumber: 1,
      dayNumber: 1
    });
  };

  const handleApplyPosition = (posId: string) => {
    onSelectPosition(posId);
    saveDeviceRoutineState({ positionId: posId });
  };

  const handleApplyPhase = (idx: number) => {
    onSelectPhaseIndex(idx);
    onSelectDayNumber(1);
    const targetPhase = program.phases[idx];
    const firstWeek = targetPhase?.weekNumbers?.[0] || 1;
    if (onSelectWeek) onSelectWeek(firstWeek);
    saveDeviceRoutineState({
      phaseIndex: idx,
      weekNumber: firstWeek,
      dayNumber: 1
    });
  };

  const handleApplyDay = (dayNum: number) => {
    onSelectDayNumber(dayNum);
    saveDeviceRoutineState({ dayNumber: dayNum });
    onClose();
  };

  const handleApplyWeek = (weekNum: number) => {
    if (onSelectWeek) onSelectWeek(weekNum);
    saveDeviceRoutineState({ weekNumber: weekNum });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-fade-in p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 space-y-5 max-h-[88vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                Program &amp; Schedule Selector
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selections are automatically remembered on this device
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors min-h-[32px] min-w-[32px]"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Sport Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>1. Select Athletic Discipline:</span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold lowercase">
              active: {selectedSport}
            </span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SPORT_TABS.map((sport) => {
              const isSelected = selectedSport === sport.id;
              return (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() => handleApplySport(sport.id)}
                  className={`p-3 rounded-2xl border text-left transition-all min-h-[56px] flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs sm:text-sm font-black truncate">{sport.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
                  </div>
                  <span className="text-[10px] opacity-75 truncate">{sport.shortBio}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Role / Position Focus (if sport has positions) */}
        {sportPositions.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>2. Role / Position Specialization:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sportPositions.map((pos) => {
                const isSelected = activePosition?.id === pos.id;
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => handleApplyPosition(pos.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all min-h-[44px] ${
                      isSelected
                        ? 'bg-slate-950 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 dark:border-emerald-400 font-black shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{pos.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
                    </div>
                    <div className="text-[10px] opacity-75 truncate">{pos.roleBadge || pos.shortCode}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 3: Training Block & Week */}
        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>3. Periodized Training Block &amp; Week:</span>
          </label>

          {/* Phase / Block Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {program.phases.map((ph, pIdx) => {
              const isSelected = activePhaseIndex === pIdx;
              return (
                <button
                  key={ph.id || pIdx}
                  type="button"
                  onClick={() => handleApplyPhase(pIdx)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all min-h-[46px] ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-extrabold'
                      : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{ph.title || `Phase ${pIdx + 1}`}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[3]" />}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{ph.weeks} · {ph.theme || ph.emphasis}</div>
                </button>
              );
            })}
          </div>

          {/* Week Selector Chips */}
          {weekNumbers.length > 1 && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Week:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {weekNumbers.map((wk) => {
                  const isWkSelected = activeWeek === wk;
                  return (
                    <button
                      key={wk}
                      type="button"
                      onClick={() => handleApplyWeek(wk)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all min-h-[32px] ${
                        isWkSelected
                          ? 'bg-slate-900 text-white dark:bg-emerald-400 dark:text-slate-950 font-black shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      Wk {wk}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Day & Target Routine */}
        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>4. Target Routine (Tap to Open):</span>
            </span>
            <span className="text-[10px] text-slate-400">Total {phaseDays.length} Days</span>
          </label>

          <div className="space-y-2">
            {phaseDays.map((day) => {
              const isSelected = activeDayNumber === day.dayNumber;
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  onClick={() => handleApplyDay(day.dayNumber)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all min-h-[54px] active:scale-98 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected
                        ? 'bg-slate-950 text-emerald-400'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      {day.dayNumber}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-black truncate">{day.name}</div>
                      <div className={`text-xs truncate ${isSelected ? 'text-slate-900/80' : 'text-slate-500 dark:text-slate-400'}`}>
                        {day.focus} · {day.timeBudgetMinutes || 45}m · {day.exercises.length} moves
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {isSelected ? (
                      <span className="px-2 py-0.5 rounded-md bg-slate-950 text-emerald-400 text-[10px] font-black uppercase">
                        Current
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
