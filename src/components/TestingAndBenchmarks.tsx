import React, { useState } from 'react';
import { SportProgram, SportId, PositionSpecialization } from '../types/sport';
import { Calculator, BookOpen, Target, ChevronRight, Award } from 'lucide-react';

interface TestingAndBenchmarksProps {
  program: SportProgram;
  assessments: Record<string, { baseline: Record<string, string>; final: Record<string, string>; notes?: string }>;
  onUpdateAssessmentValue: (sport: SportId, type: 'baseline' | 'final', testId: string, value: string) => void;
  onUpdateAssessmentNotes: (sport: SportId, notes: string) => void;
  calculate1RM: (weight: number, reps: number) => { epley: number; brzycki: number; threeRmEst: number };
  activePosition?: PositionSpecialization;
  onNavigateToPositionsTab?: () => void;
}

export const TestingAndBenchmarks: React.FC<TestingAndBenchmarksProps> = ({
  program,
  assessments,
  onUpdateAssessmentValue,
  onUpdateAssessmentNotes,
  calculate1RM,
  activePosition,
  onNavigateToPositionsTab
}) => {
  const sportAssessment = assessments[program.id] || { baseline: {}, final: {} };

  // 1RM Calculator Local State
  const [calcWeight, setCalcWeight] = useState<number>(225);
  const [calcReps, setCalcReps] = useState<number>(5);
  const calculated1RM = calculate1RM(calcWeight, calcReps);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800">
        <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
          Sports Science Scoreboard
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-white mb-1.5">
          {program.name} · Testing Battery
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Log baseline numbers in Week 0 and retest in Week 8. Compare directly against published pro benchmarks.
        </p>
      </div>

      {/* Interactive 1RM Calculator Tool */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
          <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            1RM Estimator (Epley & 3RM Multiplier)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Weight / Load:
              </label>
              <input
                type="number"
                value={calcWeight}
                onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Clean Reps:
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={calcReps}
                onChange={(e) => setCalcReps(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Epley</div>
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">
                {calculated1RM.epley}
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">kg / lb</div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Brzycki</div>
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">
                {calculated1RM.brzycki}
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">kg / lb</div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 uppercase">3RM × 1.08</div>
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-950 dark:text-emerald-200 mt-1 tabular-nums">
                {calculated1RM.threeRmEst}
              </div>
              <div className="text-[9px] sm:text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">kg / lb</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Testing Scorecard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Assessment Battery & Normative Pro Targets
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Fill in your Week 0 baseline and Week 8 retest.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md self-start sm:self-auto">
            {program.benchmarkTests.length} Tests Standardized
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-3 sm:px-4 w-40 sm:w-48">Test Item</th>
                <th className="py-3 px-3 sm:px-4 w-36 sm:w-48 text-emerald-800 dark:text-emerald-400">Pro Target</th>
                <th className="py-3 px-3 sm:px-4 w-28 sm:w-32 bg-slate-50/80 dark:bg-slate-800/40">Week 0 (Base)</th>
                <th className="py-3 px-3 sm:px-4 w-28 sm:w-32 bg-emerald-50/40 dark:bg-emerald-950/20">Week 8 (Retest)</th>
                <th className="py-3 px-3 sm:px-4 hidden md:table-cell">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {program.benchmarkTests.map((test) => {
                const baseVal = sportAssessment.baseline[test.id] || '';
                const finalVal = sportAssessment.final[test.id] || '';

                return (
                  <tr key={test.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white">
                      <div>{test.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal uppercase">{test.unit}</div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-semibold text-emerald-700 dark:text-emerald-400">
                      {test.proTarget}
                    </td>
                    <td className="py-3 px-3 sm:px-4 bg-slate-50/80 dark:bg-slate-800/40">
                      <input
                        type="text"
                        placeholder="Wk 0"
                        value={baseVal}
                        onChange={(e) => onUpdateAssessmentValue(program.id, 'baseline', test.id, e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                      />
                    </td>
                    <td className="py-3 px-3 sm:px-4 bg-emerald-50/40 dark:bg-emerald-950/20">
                      <input
                        type="text"
                        placeholder="Wk 8"
                        value={finalVal}
                        onChange={(e) => onUpdateAssessmentValue(program.id, 'final', test.id, e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 rounded px-2.5 py-1.5 text-xs font-mono font-bold text-emerald-950 dark:text-emerald-200 focus:outline-none focus:border-emerald-500"
                      />
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-slate-500 dark:text-slate-400 text-[11px] hidden md:table-cell">
                      {test.protocol}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role-Calibrated Standards Focus */}
      {activePosition && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 flex-wrap">
              <Target className="w-5 h-5 text-emerald-500" />
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Positional Standards: {activePosition.shortCode} — {activePosition.name}
                </h2>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activePosition.roleBadge}
                </span>
              </div>
            </div>
            {onNavigateToPositionsTab && (
              <button
                onClick={onNavigateToPositionsTab}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Change Role / View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Metric</th>
                  <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-extrabold">Pro Tier 1 Target</th>
                  <th className="py-2.5 px-3">Collegiate / Semi-Pro</th>
                  <th className="py-2.5 px-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activePosition.benchmarks.map((bm, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{bm.metric}</td>
                    <td className="py-2.5 px-3 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{bm.proStandard}</td>
                    <td className="py-2.5 px-3 font-mono font-medium text-slate-600 dark:text-slate-300">{bm.collegeOrSemiPro}</td>
                    <td className="py-2.5 px-3 text-[11px] text-slate-500">{bm.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Evaluation Notes Field */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Post-Block Retest Evaluation (Notes & Next Block)
        </h2>
        <textarea
          rows={3}
          placeholder="Document percentage gains in compound 1RMs, sprint split reductions, or notes for the next training phase..."
          value={sportAssessment.notes || ''}
          onChange={(e) => onUpdateAssessmentNotes(program.id, e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-xs text-slate-800 dark:text-slate-200 leading-relaxed focus:bg-white dark:focus:bg-slate-750 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Research Citations */}
      <div className="bg-slate-900 dark:bg-slate-900/90 text-slate-300 rounded-xl p-5 sm:p-6 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <BookOpen className="w-4 h-4" />
          <span>Research Sources & Published Normative Databases</span>
        </div>
        <div className="divide-y divide-slate-800">
          {program.sourcesAndStandards.map((source, idx) => (
            <div key={idx} className="py-2.5 text-xs">
              <div className="font-semibold text-white">{source.title}</div>
              <div className="text-slate-400 mt-0.5">{source.citation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
