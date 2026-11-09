import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileJson, 
  FileSpreadsheet, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Database,
  Calendar,
  Dumbbell
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  ApexAthleteBackupPayload, 
  validateBackupPayload, 
  downloadBlob, 
  generateAllWorkoutsCSV 
} from '../utils/workoutExport';
import { ALL_PROGRAMS } from '../data/sportsOverview';
import { SportId } from '../types/sport';

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportBackupPayload: () => ApexAthleteBackupPayload;
  importBackupPayload: (payload: ApexAthleteBackupPayload, mode: 'merge' | 'replace') => void;
  resetAllData: () => void;
  resetSportLogs: (sport: SportId) => void;
  selectedSport: SportId;
}

export const DataBackupModal: React.FC<DataBackupModalProps> = ({
  isOpen,
  onClose,
  exportBackupPayload,
  importBackupPayload,
  resetAllData,
  resetSportLogs,
  selectedSport
}) => {
  const [activeTab, setActiveTab] = useState<'backup' | 'restore' | 'reset'>('backup');
  const [fileToImport, setFileToImport] = useState<{
    payload: ApexAthleteBackupPayload;
    stats: { totalSessions: number; sports: string[]; athleteName: string; exportedAt: string };
  } | null>(null);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [importError, setImportError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentPayload = exportBackupPayload();
  const sessionCount = Object.keys(currentPayload.sessionLogs || {}).length;

  const handleDownloadJSON = () => {
    const payload = exportBackupPayload();
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `apex-athlete-backup-${dateStr}.json`;
    downloadBlob(JSON.stringify(payload, null, 2), filename, 'application/json');
    setSuccessMessage('Backup file downloaded successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleDownloadAllCSV = () => {
    const payload = exportBackupPayload();
    const csvStr = generateAllWorkoutsCSV(payload.sessionLogs || {}, ALL_PROGRAMS);
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `apex-athlete-all-workouts-${dateStr}.csv`;
    downloadBlob(csvStr, filename, 'text/csv');
    setSuccessMessage('Complete workout history CSV exported successfully!');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const validation = validateBackupPayload(parsed);

        if (!validation.valid || !validation.stats) {
          setImportError(validation.error || 'Invalid backup file format.');
          setFileToImport(null);
          return;
        }

        setFileToImport({
          payload: parsed,
          stats: validation.stats
        });
      } catch (err: any) {
        setImportError(`Failed to parse backup JSON: ${err.message || 'Syntax error'}`);
        setFileToImport(null);
      }
    };
    reader.readAsText(file);
  };

  const handleExecuteRestore = () => {
    if (!fileToImport) return;
    try {
      importBackupPayload(fileToImport.payload, importMode);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }
      setSuccessMessage(
        `Successfully restored ${fileToImport.stats.totalSessions} workout session(s) (${importMode === 'merge' ? 'merged' : 'replaced'})!`
      );
      setFileToImport(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setSuccessMessage(null), 4500);
    } catch (err: any) {
      setImportError(`Restore failed: ${err.message || 'Unknown error'}`);
    }
  };

  const handleConfirmReset = () => {
    resetAllData();
    setConfirmResetOpen(false);
    setSuccessMessage('All application workout data has been cleared.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="backup-modal-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-md">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 id="backup-modal-title" className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Data Backup & Restore
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Protect athlete training logs, progression records, and settings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 gap-1 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'backup'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Export & Backup</span>
          </button>
          <button
            onClick={() => setActiveTab('restore')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'restore'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Import & Restore</span>
          </button>
          <button
            onClick={() => setActiveTab('reset')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'reset'
                ? 'border-red-500 text-red-600 dark:text-red-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Data</span>
          </button>
        </div>

        {/* Success Toast */}
        {successMessage && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Current Saved Athlete Data</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Athlete</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {currentPayload.athleteName || 'Athlete'}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-500">Logged Sessions</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      {sessionCount} Sessions
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                    <div className="text-[10px] text-slate-500">Active Sport</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                      {ALL_PROGRAMS[selectedSport]?.name || selectedSport}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadJSON}
                  className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-98 text-center"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <FileJson className="w-5 h-5" />
                    <span>Download Full Backup (.json)</span>
                  </div>
                  <span className="text-[11px] font-normal opacity-90">
                    Complete state backup for safe keeping & device transfer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadAllCSV}
                  className="flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all active:scale-98 text-center"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                    <span>Export All Sessions (.csv)</span>
                  </div>
                  <span className="text-[11px] font-normal opacity-80 text-slate-300">
                    Spreadsheet view for Excel, Google Sheets, or aggregators
                  </span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'restore' && (
            <div className="space-y-4">
              {importError && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-800 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {/* Upload Drop Zone */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-950/40">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="backup-file-input"
                />
                <label htmlFor="backup-file-input" className="cursor-pointer block space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Choose Backup File (.json) or drag here
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Accepts valid Forge export files
                  </div>
                </label>
              </div>

              {/* File Preview */}
              {fileToImport && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Valid Backup File Detected</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {fileToImport.stats.exportedAt.split('T')[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500">Athlete</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {fileToImport.stats.athleteName}
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] text-slate-500">Sessions Found</div>
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        {fileToImport.stats.totalSessions} Sessions
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-slate-500">Sports</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {fileToImport.stats.sports.join(', ') || 'General'}
                      </div>
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div className="pt-2 border-t border-emerald-500/20">
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Restore Strategy:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setImportMode('merge')}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          importMode === 'merge'
                            ? 'bg-emerald-500/20 border-emerald-500 text-slate-900 dark:text-white font-bold'
                            : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Merge with existing</span>
                          {importMode === 'merge' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        </div>
                        <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                          Preserves local workouts and adds backup logs
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImportMode('replace')}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          importMode === 'replace'
                            ? 'bg-amber-500/20 border-amber-500 text-slate-900 dark:text-white font-bold'
                            : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Replace all data</span>
                          {importMode === 'replace' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />}
                        </div>
                        <div className="text-[10px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                          Cleanly overwrites all local logs with this backup
                        </div>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleExecuteRestore}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-98"
                  >
                    Confirm & Restore Backup Data
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reset' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
                <div className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span>Danger Zone: Workout Data Reset</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Clear workout logs if you wish to restart your training block or begin fresh. Make sure to download a backup first!
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    resetSportLogs(selectedSport);
                    setSuccessMessage(`Cleared workout session logs for ${ALL_PROGRAMS[selectedSport]?.name || selectedSport}.`);
                    setTimeout(() => setSuccessMessage(null), 4000);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <div className="text-left">
                    <div>Reset Only {ALL_PROGRAMS[selectedSport]?.name} Logs</div>
                    <div className="text-[10px] font-normal text-slate-500">
                      Clears session history for this sport only
                    </div>
                  </div>
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                </button>

                {!confirmResetOpen ? (
                  <button
                    type="button"
                    onClick={() => setConfirmResetOpen(true)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/60 text-red-700 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-900 transition-colors"
                  >
                    <div className="text-left">
                      <div>Factory Reset All Application Data</div>
                      <div className="text-[10px] font-normal text-red-500/80">
                        Permanently erases logs, trackers, and custom sets across all sports
                      </div>
                    </div>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-red-600 text-white space-y-3 animate-in fade-in">
                    <div className="text-xs font-extrabold">Are you absolutely sure?</div>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      This will erase all recorded logs from browser storage. This action cannot be undone.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleConfirmReset}
                        className="flex-1 py-2 rounded-lg bg-white text-red-700 font-extrabold text-xs hover:bg-slate-100"
                      >
                        Yes, Erase Everything
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmResetOpen(false)}
                        className="px-4 py-2 rounded-lg bg-red-800 text-white font-bold text-xs hover:bg-red-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
