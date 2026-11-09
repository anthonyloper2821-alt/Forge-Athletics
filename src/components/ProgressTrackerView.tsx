import React, { useState } from 'react';
import { SportProgram, SportId, ProgressTrackerRow } from '../types/sport';
import { Download, Printer, ChevronDown } from 'lucide-react';

interface ProgressTrackerViewProps {
  program: SportProgram;
  progressTracker: Record<string, Record<number, ProgressTrackerRow>>;
  onUpdateProgressRow: (sport: SportId, weekNum: number, field: keyof ProgressTrackerRow, value: string) => void;
}

export const ProgressTrackerView: React.FC<ProgressTrackerViewProps> = ({
  program,
  progressTracker,
  onUpdateProgressRow
}) => {
  const sportData = progressTracker[program.id] || {};
  const [mobileViewWeek, setMobileViewWeek] = useState<number>(1);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Week', 'Date', 'Body Weight', 'Bench Top Set', 'Squat Top Set', 'Deadlift Top Set', 'Pull-Up Max', 'Waist', 'Rest HR', 'Notes'];
    const rows = [1, 2, 3, 4, 5, 6, 7, 8].map(wk => {
      const row = sportData[wk] || {} as Partial<ProgressTrackerRow>;
      return [
        `Week ${wk}`,
        `"${row.date || ''}"`,
        `"${row.bodyWeight || ''}"`,
        `"${row.benchTopSet || ''}"`,
        `"${row.squatTopSet || ''}"`,
        `"${row.deadliftTopSet || ''}"`,
        `"${row.pullUpMax || ''}"`,
        `"${row.waist || ''}"`,
        `"${row.restHeartRate || ''}"`,
        `"${(row.notes || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${program.id}_8_week_progress_tracker.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            8-Week Master Scorecard
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-white">
            {program.name} · Progress Tracker
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Log weekly numbers at the end of each training week to track physical progression across the 8-week cycle.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center no-print">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[40px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Mobile-Specific Week Card View (< 640px) */}
      <div className="sm:hidden bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
          <label htmlFor="progress-week-select" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 shrink-0">
            Select Week:
          </label>
          <div className="relative flex-1 max-w-[140px]">
            <select
              id="progress-week-select"
              value={mobileViewWeek}
              onChange={(e) => setMobileViewWeek(Number(e.target.value))}
              className="w-full appearance-none bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-900 dark:text-white text-xs font-bold pl-3 pr-8 py-2 min-h-[40px] rounded-xl border border-slate-300 dark:border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-xs transition-colors"
              aria-label="Select Progress Tracker Week"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(w => (
                <option key={w} value={w} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium py-1">
                  Week {w}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {(() => {
          const row = sportData[mobileViewWeek] || {
            weekNumber: mobileViewWeek,
            date: '',
            bodyWeight: '',
            benchTopSet: '',
            squatTopSet: '',
            deadliftTopSet: '',
            pullUpMax: '',
            waist: '',
            restHeartRate: '',
            notes: ''
          };

          return (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Date:</label>
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'date', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Body Weight:</label>
                  <input
                    type="text"
                    placeholder="e.g. 185 lb"
                    value={row.bodyWeight}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'bodyWeight', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Bench Top Set:</label>
                  <input
                    type="text"
                    placeholder="225 x 5"
                    value={row.benchTopSet}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'benchTopSet', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Squat Top Set:</label>
                  <input
                    type="text"
                    placeholder="315 x 5"
                    value={row.squatTopSet}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'squatTopSet', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Deadlift Top Set:</label>
                  <input
                    type="text"
                    placeholder="405 x 5"
                    value={row.deadliftTopSet}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'deadliftTopSet', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Pull-Up Max:</label>
                  <input
                    type="text"
                    placeholder="12 reps"
                    value={row.pullUpMax}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'pullUpMax', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Waist (in/cm):</label>
                  <input
                    type="text"
                    placeholder="32 in"
                    value={row.waist}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'waist', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Rest HR (bpm):</label>
                  <input
                    type="text"
                    placeholder="54 bpm"
                    value={row.restHeartRate}
                    onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'restHeartRate', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs font-mono text-slate-900 dark:text-white min-h-[40px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">Weekly Notes:</label>
                <input
                  type="text"
                  placeholder="Recovery, energy, fatigue levels..."
                  value={row.notes}
                  onChange={(e) => onUpdateProgressRow(program.id, mobileViewWeek, 'notes', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-base sm:text-xs text-slate-900 dark:text-white min-h-[40px]"
                />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Main 8-Week Table (Visible on Tablets & Desktops) */}
      <div className="hidden sm:block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-900 text-white uppercase font-bold tracking-wider text-[11px] border-b border-slate-800">
                <th className="py-3 px-3 w-16 text-center">Week</th>
                <th className="py-3 px-3 w-28">Date</th>
                <th className="py-3 px-3 w-28">Body Wt</th>
                <th className="py-3 px-3 w-32">Bench Top</th>
                <th className="py-3 px-3 w-32">Squat Top</th>
                <th className="py-3 px-3 w-32">Deadlift Top</th>
                <th className="py-3 px-3 w-28">Pull-Up</th>
                <th className="py-3 px-3 w-20">Waist</th>
                <th className="py-3 px-3 w-20">Rest HR</th>
                <th className="py-3 px-3">Weekly Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(weekNum => {
                const row = sportData[weekNum] || {
                  weekNumber: weekNum,
                  date: '',
                  bodyWeight: '',
                  benchTopSet: '',
                  squatTopSet: '',
                  deadliftTopSet: '',
                  pullUpMax: '',
                  waist: '',
                  restHeartRate: '',
                  notes: ''
                };

                return (
                  <tr key={weekNum} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80">
                      {weekNum}
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'date', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="e.g. 185 lb"
                        value={row.bodyWeight}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'bodyWeight', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono font-medium text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="225 x 5"
                        value={row.benchTopSet}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'benchTopSet', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono font-medium text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="315 x 5"
                        value={row.squatTopSet}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'squatTopSet', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono font-medium text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="405 x 5"
                        value={row.deadliftTopSet}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'deadliftTopSet', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono font-medium text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="+45 lb x 5"
                        value={row.pullUpMax}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'pullUpMax', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="32 in"
                        value={row.waist}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'waist', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="52 bpm"
                        value={row.restHeartRate}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'restHeartRate', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-900 dark:text-white"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <input
                        type="text"
                        placeholder="Weekly notes..."
                        value={row.notes}
                        onChange={(e) => onUpdateProgressRow(program.id, weekNum, 'notes', e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs text-slate-900 dark:text-white"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
