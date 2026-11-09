import React, { useState } from 'react';
import { SportId } from '../types/sport';
import { ALL_PROGRAMS, SPORT_TABS, PROGRESSION_SYSTEM_RULES } from '../data/sportsOverview';
import { BookOpen, Moon, Coffee, HeartPulse } from 'lucide-react';

export const SportsScienceLibrary: React.FC = () => {
  const [activeSportFilter, setActiveSportFilter] = useState<SportId>('rugby');

  const selectedProg = ALL_PROGRAMS[activeSportFilter];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800">
        <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
          Sports Science Rationale & Biomechanics
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-white mb-1.5">
          Evidence-Based Performance Principles
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          Every set, rep, rest interval, and movement in this platform is grounded in peer-reviewed sports science literature to maximize rate of force development and eliminate junk volume.
        </p>
      </div>

      {/* Sport Principle Selector */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
        {SPORT_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSportFilter(tab.id)}
            className={`px-3 sm:px-3.5 py-1.5 min-h-[40px] rounded-lg text-xs font-bold transition-all ${
              activeSportFilter === tab.id
                ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Sport Specific Deep Dive Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 sm:space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-0.5">
            {selectedProg.badge}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {selectedProg.name} · Sports Science Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {selectedProg.subtitle}
          </p>
        </div>

        {/* 3 Core Principles for this Sport */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {selectedProg.sportsSciencePrinciples.map((principle, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{principle.title}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {principle.description}
                </p>
              </div>
              {principle.researchCitation && (
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                  {principle.researchCitation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recovery Protocols */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
            Sport Recovery Non-Negotiables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Sleep Optimization
              </div>
              <p className="text-slate-600 dark:text-slate-300">{selectedProg.recoveryRules.sleep}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Protein & Fueling
              </div>
              <p className="text-slate-600 dark:text-slate-300">{selectedProg.recoveryRules.protein}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                Deload & Joint Auto-regulation
              </div>
              <p className="text-slate-600 dark:text-slate-300">{selectedProg.recoveryRules.deloadRule}</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Universal Time-Crunch Hierarchy */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          The Time-Crunch Hierarchy — What to Cut First when Busy
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {PROGRESSION_SYSTEM_RULES.timeCrunchHierarchy.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750">
              <div className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                {item.order}
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                {item.target}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Academic Bibliography */}
      <div className="bg-slate-900 dark:bg-slate-900/95 text-white rounded-xl p-5 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            Academic Research Foundations & Citations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="font-bold text-white mb-0.5">Till et al. (2017)</div>
            <p className="text-slate-400">Anthropometric and Physiological Characteristics of Elite Rugby Athletes. <em>JSCR</em>.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="font-bold text-white mb-0.5">Petersen et al. (2011)</div>
            <p className="text-slate-400">Preventive Effect of Eccentric Training on Acute Hamstring Injuries in Soccer. <em>AJSM</em> (51% risk reduction).</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="font-bold text-white mb-0.5">Rio et al. (2015)</div>
            <p className="text-slate-400">Isometric Exercise Induces Analgesia and Reduces Inhibition in Patellar Tendinopathy. <em>BJSM</em>.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700">
            <div className="font-bold text-white mb-0.5">Collins et al. (2014)</div>
            <p className="text-slate-400">Neck Strength: A Protective Factor Against Concussions in High School Contact Sports. <em>J Prim Prev</em>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
