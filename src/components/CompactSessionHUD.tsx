import React from 'react';
import { SportId, SportProgram, PositionSpecialization } from '../types/sport';
import { SPORT_TABS } from '../data/sportsOverview';
import { 
  Shield, 
  Flame, 
  Zap, 
  Activity, 
  TrendingUp, 
  HeartPulse,
  ChevronDown, 
  Target, 
  SlidersHorizontal,
  ChevronRight,
  Maximize2,
  Calendar
} from 'lucide-react';

interface CompactSessionHUDProps {
  program: SportProgram;
  selectedSport: SportId;
  onSelectSport: (sport: SportId) => void;
  activePhaseIndex: number;
  onSelectPhaseIndex?: (phaseIndex: number) => void;
  activeDayNumber: number;
  onSelectDayNumber: (day: number) => void;
  activePosition?: PositionSpecialization;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  onExpandFullBanner: () => void;
}

export const CompactSessionHUD: React.FC<CompactSessionHUDProps> = ({
  program,
  selectedSport,
  onSelectSport,
  activePhaseIndex,
  onSelectPhaseIndex,
  activeDayNumber,
  onSelectDayNumber,
  activePosition,
  isFocusMode,
  onToggleFocusMode,
  onExpandFullBanner
}) => {
  const getIcon = (id: SportId) => {
    switch (id) {
      case 'functional': return <HeartPulse className="w-4 h-4 text-emerald-400" />;
      case 'boxing': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'rugby': return <Flame className="w-4 h-4 text-emerald-400" />;
      case 'football': return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'soccer': return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'basketball': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    }
  };

  const currentPhase = program.phases[activePhaseIndex] || program.phases[0];

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg p-3 sm:p-4 mb-4 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Sport, Phase & Role Indicator */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative inline-flex items-center">
            <select
              value={selectedSport}
              onChange={(e) => onSelectSport(e.target.value as SportId)}
              className="appearance-none bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold pl-7 pr-6 py-1.5 min-h-[36px] rounded-lg border border-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
              aria-label="Switch sport"
            >
              {SPORT_TABS.map(tab => (
                <option key={tab.id} value={tab.id} className="bg-slate-900 text-white font-medium">
                  {tab.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute left-2 text-emerald-400">
              {getIcon(selectedSport)}
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 pointer-events-none absolute right-2" />
          </div>

          <span className="text-slate-600 hidden sm:inline">·</span>

          {/* Phase Badge */}
          <span className="text-xs font-semibold text-slate-300">
            {currentPhase?.title}
          </span>

          {/* Role badge if active */}
          {activePosition && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {activePosition.shortCode}
            </span>
          )}
        </div>

        {/* Right: Expand Full Hub button */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={onExpandFullBanner}
            className="flex items-center gap-1.5 px-2.5 py-1.5 min-h-[34px] rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Expand Full Sport Showcase & Playbook Hub"
          >
            <Maximize2 className="w-3 h-3 text-emerald-400" />
            <span className="text-[11px]">Full Hub</span>
          </button>
        </div>
      </div>

      {/* Day Selector Dropdown */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <label htmlFor="compact-hud-day-select" className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>Training Day:</span>
        </label>
        <div className="relative flex-1 max-w-sm">
          <select
            id="compact-hud-day-select"
            value={activeDayNumber}
            onChange={(e) => onSelectDayNumber(Number(e.target.value))}
            className="w-full appearance-none bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold pl-3 pr-8 py-2 min-h-[40px] rounded-xl border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-xs transition-colors"
            aria-label="Select Training Day"
          >
            {currentPhase.days.map((d) => (
              <option key={d.dayNumber} value={d.dayNumber} className="bg-slate-900 text-white py-1.5">
                Day {d.dayNumber}: {d.name} ({d.timeBudgetMinutes}m)
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-emerald-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};
