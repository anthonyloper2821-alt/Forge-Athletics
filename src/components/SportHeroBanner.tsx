import React from 'react';
import { SportId, SportProgram, PositionSpecialization } from '../types/sport';
import { SPORT_TABS } from '../data/sportsOverview';
import { Shield, Flame, Zap, Activity, TrendingUp, HeartPulse, ChevronDown, Target, ChevronRight } from 'lucide-react';

interface SportHeroBannerProps {
  program: SportProgram;
  selectedSport: SportId;
  onSelectSport: (sport: SportId) => void;
  activePosition?: PositionSpecialization;
  positions?: PositionSpecialization[];
  onSelectPosition?: (positionId: string) => void;
  onNavigateToPositionsTab?: () => void;
}

export const SportHeroBanner: React.FC<SportHeroBannerProps> = ({
  program,
  selectedSport,
  onSelectSport,
  activePosition,
  positions,
  onSelectPosition,
  onNavigateToPositionsTab
}) => {
  const getIcon = (id: SportId) => {
    switch (id) {
      case 'functional': return <HeartPulse className="w-4 h-4" />;
      case 'boxing': return <Shield className="w-4 h-4" />;
      case 'rugby': return <Flame className="w-4 h-4" />;
      case 'football': return <Zap className="w-4 h-4" />;
      case 'soccer': return <Activity className="w-4 h-4" />;
      case 'basketball': return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative bg-slate-950 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-800 dark:border-slate-800/80 mb-6 transition-all">
      {/* Background Hero Image with Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={program.heroImage}
          alt={program.name}
          className="w-full h-full object-cover object-center opacity-25 dark:opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        {/* Streamlined Sport Title & Focus */}
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-xs sm:text-sm font-normal mb-2 leading-relaxed tracking-normal">
            <span className="font-semibold text-emerald-400 tracking-normal flex items-center gap-1.5">
              {getIcon(selectedSport)}
              <span>{program.badge}</span>
            </span>
            <span aria-hidden="true" className="text-slate-500/70 select-none font-light">
              ·
            </span>
            <span
              className="font-medium text-slate-300 tracking-normal"
              title={program.duration}
            >
              {program.duration.includes('(') ? program.duration.split('(')[0].trim() : program.duration}
            </span>
            <span aria-hidden="true" className="text-slate-500/70 select-none font-light">
              ·
            </span>
            <span
              className="font-medium text-slate-300 tracking-normal"
              title={program.frequency}
            >
              {program.frequency
                .replace(/\s*\([^)]*\)/g, '')
                .replace(/\s*\+.*$/, '')
                .replace('Focused Sessions Under 1 Hour', 'Sessions')
                .replace('Training Days', 'Days')
                .trim()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 text-balance leading-tight">
            {program.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300/90 font-normal leading-relaxed max-w-2xl">
            {program.subtitle}
          </p>
        </div>


        {/* Desktop / Tablet Positional Role Selector & Demands Bar */}
        {positions && positions.length > 0 && (
          <div className="hidden sm:flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span>Role Focus:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {positions.map(p => {
                  const isCurrentPos = activePosition?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectPosition?.(p.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isCurrentPos
                          ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      <span>{p.shortCode}</span>
                      <span className="hidden lg:inline text-[11px] opacity-80">· {p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {onNavigateToPositionsTab && (
              <button
                onClick={onNavigateToPositionsTab}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
              >
                <span>View Full Tactical Breakdown</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

