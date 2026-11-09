import React, { useState } from 'react';
import { MovementCategory } from '../types/sport';
import { EXERCISE_DATABASE } from '../data/exerciseDatabase';
import { PROGRESSION_SYSTEM_RULES } from '../data/sportsOverview';
import { ArrowUpRight, ArrowDownRight, Search, ShieldCheck, AlertOctagon } from 'lucide-react';

interface ProgressionRegressionMatrixProps {
  onOpenExerciseGuide: (exerciseId: string, name: string) => void;
}

export const ProgressionRegressionMatrix: React.FC<ProgressionRegressionMatrixProps> = ({
  onOpenExerciseGuide
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: (MovementCategory | 'All')[] = [
    'All',
    'Push',
    'Pull',
    'Squat & Lunge',
    'Hinge',
    'Power & Plyometrics',
    'Core & Armor',
    'Conditioning & Engine'
  ];

  const exerciseList = Object.values(EXERCISE_DATABASE).filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.progressTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.regressTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || ex.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800">
        <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
          Sports Science Governance
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-white mb-1.5">
          Progression & Regression Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Exactly when to add weight, and exactly when to scale back. Built on auto-regulation, double progression, and injury-risk mitigation protocols.
        </p>
      </div>

      {/* The 4 Principles of Double Progression & Regression */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Double Progression Engine */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Double Progression Engine
            </h2>
          </div>

          <div className="space-y-3">
            {PROGRESSION_SYSTEM_RULES.doubleProgression.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{item.step}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regression Rules & Safety Valves */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Regression Rules — When to Back Off
            </h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {PROGRESSION_SYSTEM_RULES.regressionRules.map((item, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
                  {item.name}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.rule}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RPE & Reps-in-Reserve (RIR) Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
          RPE / Reps-in-Reserve (RIR) Protocol Chart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 font-semibold">
                <th className="py-2.5 px-3 w-20 sm:w-24">Effort</th>
                <th className="py-2.5 px-3 w-36 sm:w-44">RIR</th>
                <th className="py-2.5 px-3">When You Use It</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PROGRESSION_SYSTEM_RULES.rpeTable.map((row) => (
                <tr key={row.rpe} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900 dark:text-white">{row.rpe}</td>
                  <td className="py-2.5 px-3 font-medium text-emerald-700 dark:text-emerald-400">{row.rir}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Master Movement Progression / Regression Index */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Master Movement Index ({exerciseList.length} Exercises)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any exercise for complete setup instructions and cues.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 min-h-[40px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full sm:w-44"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 min-h-[40px] text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Master Table / Responsive Cards */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-100/60 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-3 sm:px-4 w-44 sm:w-52">Exercise</th>
                <th className="py-3 px-3 sm:px-4 w-56 sm:w-64 text-emerald-800 dark:text-emerald-400">
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Progress To</span>
                  </div>
                </th>
                <th className="py-3 px-3 sm:px-4 w-56 sm:w-64 text-amber-800 dark:text-amber-400">
                  <div className="flex items-center gap-1">
                    <ArrowDownRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Regress To</span>
                  </div>
                </th>
                <th className="py-3 px-3 sm:px-4 hidden lg:table-cell">Rule & Cue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {exerciseList.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 sm:px-4 font-bold text-slate-900 dark:text-white">
                    <button
                      onClick={() => onOpenExerciseGuide(ex.id, ex.name)}
                      className="text-left hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors underline decoration-slate-200 dark:decoration-slate-700 min-h-[36px] flex flex-col justify-center"
                    >
                      <span>{ex.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal uppercase tracking-wider">
                        {ex.category}
                      </span>
                    </button>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{ex.progressTo}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {ex.whenToProgress}
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{ex.regressTo}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {ex.whenToRegress}
                    </div>
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed hidden lg:table-cell">
                    <span className="font-semibold text-slate-800 dark:text-white">Cue: </span>
                    "{ex.cue}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
