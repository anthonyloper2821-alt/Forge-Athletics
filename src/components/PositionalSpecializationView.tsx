import React, { useState } from 'react';
import { PositionSpecialization, SportProgram } from '../types/sport';
import { 
  Target, 
  Shield, 
  Zap, 
  Flame, 
  Activity, 
  CheckCircle2, 
  Award, 
  Info, 
  Timer, 
  ChevronRight, 
  Sliders, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface PositionalSpecializationViewProps {
  program: SportProgram;
  positions: PositionSpecialization[];
  activePosition: PositionSpecialization;
  onSelectPosition: (positionId: string) => void;
  onStartSession?: () => void;
  onOpenTimer?: (restStr: string) => void;
}

export const PositionalSpecializationView: React.FC<PositionalSpecializationViewProps> = ({
  program,
  positions,
  activePosition,
  onSelectPosition,
  onStartSession,
  onOpenTimer
}) => {
  const [selectedPosId, setSelectedPosId] = useState<string>(activePosition.id);

  // Sync if activePosition changes from outside
  React.useEffect(() => {
    setSelectedPosId(activePosition.id);
  }, [activePosition.id]);

  const displayedPosition = positions.find(p => p.id === selectedPosId) || activePosition;
  const isCurrentlyActive = activePosition.id === displayedPosition.id;

  return (
    <div className="space-y-6">
      {/* Top Banner & Context */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
              <Target className="w-4 h-4" />
              <span>Positional & Role Specialization</span>
              <span>·</span>
              <span>{program.name}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Tactical Role Biomechanics & Targeted Protocols
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Every position in {program.name} possesses unique energy system timelines, collision physics, and injury vulnerabilities. Select your on-field or ring role below to unlock tailored accessory protocols, sport-science demands, and pro benchmark standards.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Current Profile:</span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              {activePosition.shortCode} — {activePosition.name}
            </span>
          </div>
        </div>

        {/* Position Selector Controls */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Mobile Dropdown for small screens */}
          <div className="block sm:hidden">
            <label htmlFor="position-select" className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1 block">
              Choose Tactical Role:
            </label>
            <div className="relative">
              <select
                id="position-select"
                value={selectedPosId}
                onChange={(e) => {
                  setSelectedPosId(e.target.value);
                  onSelectPosition(e.target.value);
                }}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-bold px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:border-emerald-500"
              >
                {positions.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.shortCode} — {p.name} {p.id === activePosition.id ? '★ (Active)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop & Tablet Selector Tabs */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {positions.map(p => {
              const isSelected = p.id === displayedPosition.id;
              const isActiveProfile = p.id === activePosition.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPosId(p.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 dark:border-emerald-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="font-extrabold">{p.shortCode}</span>
                  <span className="hidden md:inline font-medium text-[11px] opacity-80">· {p.name}</span>
                  {isActiveProfile && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 dark:bg-slate-950 dark:text-emerald-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                    }`}>
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Position Detailed Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        {/* Header of Active Position */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                {displayedPosition.shortCode}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {displayedPosition.roleBadge}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {displayedPosition.name}
            </h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {displayedPosition.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isCurrentlyActive ? (
              <button
                onClick={() => onSelectPosition(displayedPosition.id)}
                className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Set as My Active Role</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your Active Position</span>
              </div>
            )}

            {onStartSession && (
              <button
                onClick={onStartSession}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>Jump to Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Sports Science Role Overview */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Sports Science Role Demands</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {displayedPosition.overview}
          </p>
        </div>

        {/* 4 Demands Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Energy System</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {displayedPosition.demands.energySystem}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Kinetic Chain Focus</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {displayedPosition.demands.kineticChainFocus}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Injury Risk Zone</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {displayedPosition.demands.injuryPreventionZone}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Biomotor Priority</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              {displayedPosition.demands.biomotorPriority}
            </div>
          </div>
        </div>

        {/* Tailored Accessory Protocols */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Prescribed Positional Accessory Protocols
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {displayedPosition.recommendedModifications.recommendedAccessoryProtocols.length} Target Drills
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            <strong className="text-slate-800 dark:text-slate-200">Core Lifting Focus:</strong> {displayedPosition.recommendedModifications.coreLiftingFocus}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {displayedPosition.recommendedModifications.recommendedAccessoryProtocols.map((protocol) => (
              <div 
                key={protocol.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {protocol.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                      {protocol.category}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                    {protocol.prescription}
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-2 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/70 dark:border-slate-800/80">
                    <span className="font-bold text-slate-900 dark:text-white">Coaching Cue: </span>
                    {protocol.coachingCue}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-1 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                  {protocol.scientificRationale}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Positional Finisher Drill */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-emerald-500/5 to-transparent border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Tactical Role Finisher: {displayedPosition.recommendedModifications.finisherDrill.name}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-2">
            <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="font-bold block text-slate-500 text-[10px] uppercase">Work / Rest Interval</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {displayedPosition.recommendedModifications.finisherDrill.workRest}
              </span>
            </div>
            <div className="md:col-span-2 p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <span className="font-bold block text-slate-500 text-[10px] uppercase">Energy System Goal</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {displayedPosition.recommendedModifications.finisherDrill.energySystemGoal}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
            <strong className="text-slate-900 dark:text-white">Protocol: </strong>
            {displayedPosition.recommendedModifications.finisherDrill.protocol}
          </p>
        </div>

        {/* Pro vs College/Semi-Pro Benchmarks */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Role-Calibrated Performance Standards
              </h4>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              Calibrated to {displayedPosition.shortCode}
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 sm:px-4">Metric</th>
                  <th className="py-2.5 px-3 sm:px-4 text-emerald-600 dark:text-emerald-400 font-extrabold">Tier 1 Pro Standard</th>
                  <th className="py-2.5 px-3 sm:px-4">Collegiate / Semi-Pro</th>
                  <th className="py-2.5 px-3 sm:px-4">Sports Science Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {displayedPosition.benchmarks.map((bm, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white">
                      {bm.metric}
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      {bm.proStandard}
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-medium text-slate-600 dark:text-slate-300 font-mono">
                      {bm.collegeOrSemiPro}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      {bm.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
