/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWorkoutStore } from './hooks/useWorkoutStore';
import { SportHeader } from './components/SportHeader';
import { SportHeroBanner } from './components/SportHeroBanner';
import { WorkoutBrowser } from './components/WorkoutBrowser';
import { WorkoutSessionView } from './components/WorkoutSessionView';
import { ProgressionRegressionMatrix } from './components/ProgressionRegressionMatrix';
import { TestingAndBenchmarks } from './components/TestingAndBenchmarks';
import { ProgressTrackerView } from './components/ProgressTrackerView';
import { SportsScienceLibrary } from './components/SportsScienceLibrary';
import { ExerciseGuideModal } from './components/ExerciseGuideModal';
import { RestTimerWidget } from './components/RestTimerWidget';
import { EquipmentSwapModal } from './components/EquipmentSwapModal';
import { SmartWarmUpCalculatorModal } from './components/SmartWarmUpCalculatorModal';
import { BarbellPlateCalculatorModal } from './components/BarbellPlateCalculatorModal';
import { PositionalSpecializationView } from './components/PositionalSpecializationView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { BevelExportModal } from './components/BevelExportModal';
import { DataBackupModal } from './components/DataBackupModal';
import { WorkoutPrintDownloadModal } from './components/WorkoutPrintDownloadModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { QuickGymToolsModal } from './components/QuickGymToolsModal';
import { CascadingWorkoutSelector } from './components/CascadingWorkoutSelector';
import { SimpleTodayView } from './components/SimpleTodayView';
import { SimpleWorkoutLogger } from './components/SimpleWorkoutLogger';
import { ProfileSwitcherModal } from './components/ProfileSwitcherModal';
import { ProgramScheduleDrawer } from './components/ProgramScheduleDrawer';
import { WatchCompanionView } from './components/WatchCompanionView';
import { WatchConnectModal } from './components/WatchConnectModal';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { WorkoutExportContext } from './utils/workoutExport';
import { SportId, MovementCategory } from './types/sport';

export default function App() {
  const {
    deviceProfile,
    updateDeviceProfileName,
    profiles,
    activeProfileId,
    activeProfile,
    isSimpleMode,
    switchProfile,
    updateProfile,
    toggleExperienceMode,
    selectedSport,
    setSelectedSport,
    activeWeek,
    setActiveWeek,
    activePhaseIndex,
    setActivePhaseIndex,
    activeDayNumber,
    setActiveDayNumber,
    viewMode,
    setViewMode,
    emergency30MinMode,
    setEmergency30MinMode,
    sessionLogs,
    currentSessionLog,
    updateExerciseLog,
    updateSessionMeta,
    swapExercise,
    revertExerciseSwap,
    progressTracker,
    updateProgressRow,
    assessments,
    updateAssessmentValue,
    updateAssessmentNotes,
    calculate1RM,
    currentProgram,
    theme,
    toggleTheme,
    autoAdvance,
    setAutoAdvance,
    phaseSetDefaults,
    updateExerciseSetCount,
    duplicatePreviousSet,
    athleteName,
    exportBackupPayload,
    importBackupPayload,
    resetAllData,
    resetSportLogs,
    activePosition,
    setActivePosition,
    sportPositions,
    trainingFrequency,
    setTrainingFrequency,
    swappedExercises
  } = useWorkoutStore();

  const [activeTab, setActiveTab] = useState<string>('training');

  // Profile Switcher Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Unified Program & Schedule Drawer State
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);

  // Apple Watch Companion Mode State
  const [isWatchModeOpen, setIsWatchModeOpen] = useState(false);
  const [isWatchConnectModalOpen, setIsWatchConnectModalOpen] = useState(false);

  // Check if opened directly on Apple Watch or with direct watch mode link
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const isWatchParam = params.get('watch') === '1' || params.get('watch') === 'true' || window.location.hash === '#watch';
    const isWatchScreen = window.innerWidth <= 260;

    if (isWatchParam || isWatchScreen) {
      setIsWatchModeOpen(true);
    }

    const sportParam = params.get('sport');
    if (sportParam) {
      setSelectedSport(sportParam as SportId);
    }
    const weekParam = params.get('week');
    if (weekParam) {
      const parsedWeek = parseInt(weekParam, 10);
      if (!isNaN(parsedWeek)) setActiveWeek(parsedWeek);
    }
    const phaseParam = params.get('phase');
    if (phaseParam) {
      const parsedPhase = parseInt(phaseParam, 10);
      if (!isNaN(parsedPhase)) setActivePhaseIndex(parsedPhase);
    }
    const dayParam = params.get('day');
    if (dayParam) {
      const parsedDay = parseInt(dayParam, 10);
      if (!isNaN(parsedDay)) setActiveDayNumber(parsedDay);
    }
    const roleParam = params.get('role');
    if (roleParam) {
      setActivePosition(roleParam);
    }
  }, []);

  // Print & Download Workouts Modal State
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Bevel & Workout Export Modal State
  const [isBevelModalOpen, setIsBevelModalOpen] = useState(false);

  // Full Data Backup & Restore Modal State
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  // Gym Floor Focus Mode & Quick Tools Drawer State
  const [isFocusMode, setIsFocusMode] = useState<boolean>(true);
  const [isQuickToolsOpen, setIsQuickToolsOpen] = useState<boolean>(false);

  // Exercise Guide Modal State
  const [modalExerciseId, setModalExerciseId] = useState<string | null>(null);
  const [modalFallbackName, setModalFallbackName] = useState<string>('');

  // Equipment Swap Modal State
  const [swapModalExerciseId, setSwapModalExerciseId] = useState<string | null>(null);
  const [swapModalExerciseName, setSwapModalExerciseName] = useState<string>('');
  const [swapModalCatalogId, setSwapModalCatalogId] = useState<string | undefined>(undefined);
  const [swapModalCategory, setSwapModalCategory] = useState<MovementCategory | undefined>(undefined);

  // Smart Warm-Up Ramp-Up Calculator Modal State
  const [isWarmUpModalOpen, setIsWarmUpModalOpen] = useState(false);
  const [warmUpExerciseName, setWarmUpExerciseName] = useState<string>('Main Lift');
  const [warmUpInitialWeight, setWarmUpInitialWeight] = useState<number | undefined>(undefined);

  // Barbell Plate Calculator Modal State
  const [isPlateCalculatorOpen, setIsPlateCalculatorOpen] = useState(false);
  const [plateCalculatorExerciseName, setPlateCalculatorExerciseName] = useState<string>('Main Compound Lift');
  const [plateCalculatorInitialWeight, setPlateCalculatorInitialWeight] = useState<number | undefined>(undefined);

  // Floating Rest Timer State
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerInitialSeconds, setTimerInitialSeconds] = useState(90);
  const [timerAutoStart, setTimerAutoStart] = useState(false);

  // Parse rest string into seconds
  const parseRestSeconds = (restStr: string): number => {
    if (!restStr) return 90;
    const lower = restStr.toLowerCase();
    if (lower.includes('3 min') || lower.includes('3m')) return 180;
    if (lower.includes('2 min') || lower.includes('2m') || lower.includes('2-3 min')) return 120;
    if (lower.includes('90s') || lower.includes('90 s')) return 90;
    if (lower.includes('60s') || lower.includes('60 s') || lower.includes('pair')) return 60;
    if (lower.includes('45s') || lower.includes('45 s')) return 45;
    if (lower.includes('30s') || lower.includes('30 s')) return 30;
    if (lower.includes('20s') || lower.includes('20 s')) return 20;
    return 90;
  };

  const handleStartTimerWithRest = (restStr: string) => {
    const sec = parseRestSeconds(restStr);
    setTimerInitialSeconds(sec);
    setTimerAutoStart(true);
    setIsTimerOpen(true);
  };

  const handleOpenExerciseGuide = (exerciseId: string, name: string) => {
    setModalExerciseId(exerciseId);
    setModalFallbackName(name);
  };

  const handleOpenSwapModal = (
    exerciseId: string, 
    name: string, 
    catalogExerciseId?: string, 
    category?: MovementCategory
  ) => {
    setSwapModalExerciseId(exerciseId);
    setSwapModalExerciseName(name);
    setSwapModalCatalogId(catalogExerciseId);
    setSwapModalCategory(category);
  };

  const handleOpenWarmUpCalculator = (exerciseName: string, initialWeight?: number) => {
    setWarmUpExerciseName(exerciseName);
    setWarmUpInitialWeight(initialWeight);
    setIsWarmUpModalOpen(true);
  };

  const handleOpenPlateCalculator = (exerciseName?: string, initialWeight?: number) => {
    setPlateCalculatorExerciseName(exerciseName || 'Main Compound Lift');
    setPlateCalculatorInitialWeight(initialWeight);
    setIsPlateCalculatorOpen(true);
  };

  const handleApplyWarmUpToSession = (weightStr: string) => {
    // If we have an active day session, apply this weight to the target exercise Set 1
    const currentPhase = currentProgram.phases[activePhaseIndex] || currentProgram.phases[0];
    const currentDay = currentPhase.days.find(d => d.dayNumber === activeDayNumber) || currentPhase.days[0];
    if (currentDay && currentDay.exercises.length > 0) {
      const match = currentDay.exercises.find(e => 
        e.name.toLowerCase().includes(warmUpExerciseName.toLowerCase()) || 
        warmUpExerciseName.toLowerCase().includes(e.name.toLowerCase())
      ) || currentDay.exercises[0];

      updateExerciseLog(match.id, 0, 'load', weightStr);
    }
  };

  const handleApplyPlateWeightToSession = (weightStr: string) => {
    // Apply calculated barbell load to Set 1 of target compound exercise
    const currentPhase = currentProgram.phases[activePhaseIndex] || currentProgram.phases[0];
    const currentDay = currentPhase.days.find(d => d.dayNumber === activeDayNumber) || currentPhase.days[0];
    if (currentDay && currentDay.exercises.length > 0) {
      const match = currentDay.exercises.find(e => 
        e.name.toLowerCase().includes(plateCalculatorExerciseName.toLowerCase()) || 
        plateCalculatorExerciseName.toLowerCase().includes(e.name.toLowerCase())
      ) || currentDay.exercises[0];

      updateExerciseLog(match.id, 0, 'load', weightStr);
    }
  };

  const handleStartSession = (dayNumber: number) => {
    setActiveDayNumber(dayNumber);
    setActiveTab('session');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSwappedForModal = swapModalExerciseId
    ? (swappedExercises?.[swapModalExerciseId] || currentSessionLog.swappedExercises?.[swapModalExerciseId])
    : undefined;

  // Context for Bevel / Workout Export
  const currentPhaseForExport = currentProgram.phases[activePhaseIndex] || currentProgram.phases[0];
  const currentDayForExport = currentPhaseForExport?.days?.find(d => d.dayNumber === activeDayNumber) || currentPhaseForExport?.days?.[0];

  const bevelExportContext: WorkoutExportContext | null = currentDayForExport ? {
    program: currentProgram,
    day: currentDayForExport,
    phaseIndex: activePhaseIndex,
    phaseTitle: currentPhaseForExport.title,
    weekNumber: activeWeek,
    sessionLog: currentSessionLog,
    athleteName,
    customSetCounts: currentSessionLog.customSetCounts || phaseSetDefaults[`${selectedSport}_p${activePhaseIndex}`]
  } : null;

  return (
    <div className="min-h-screen min-h-dvh w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Clean 1-Row Top Bar */}
      <SportHeader
        activeTab={activeTab}
        onSelectTab={(tab: string) => setActiveTab(tab)}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === 'athlete' ? 'coach' : 'athlete')}
        onOpenTimer={() => setIsTimerOpen(true)}
        isTimerRunning={isTimerOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
        activeProfile={activeProfile}
        isSimpleMode={isSimpleMode}
        onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
        onToggleExperienceMode={toggleExperienceMode}
        onOpenWatchMode={() => setIsWatchConnectModalOpen(true)}
        onOpenPlateCalculator={() => {
          const currentPhase = currentProgram.phases[activePhaseIndex] || currentProgram.phases[0];
          const currentDay = currentPhase.days.find(d => d.dayNumber === activeDayNumber) || currentPhase.days[0];
          handleOpenPlateCalculator(currentDay.exercises[0]?.name || 'Main Compound Lift');
        }}
        onOpenWarmUpCalculator={() => {
          const currentPhase = currentProgram.phases[activePhaseIndex] || currentProgram.phases[0];
          const currentDay = currentPhase.days.find(d => d.dayNumber === activeDayNumber) || currentPhase.days[0];
          handleOpenWarmUpCalculator(currentDay.exercises[0]?.name || 'Main Compound Lift');
        }}
        onOpenBackup={() => setIsBackupModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-6 pb-28 sm:pb-8">
        {/* Minimal Schedule Bar with Drawer Trigger (Replaces Cascading Selectors) */}
        {!isSimpleMode && (
          <>
            <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black shrink-0 border border-emerald-500/20">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Schedule &amp; Focus
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">·</span>
                    <span className="text-[11px] font-mono font-medium text-slate-500 truncate">
                      {deviceProfile.name}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate flex items-center gap-1.5">
                    <span>{currentProgram.name.split('·')[0].trim()}</span>
                    {activePosition && (
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                        ({activePosition.shortCode || activePosition.name.split(' ')[0]})
                      </span>
                    )}
                    <span className="text-slate-400 dark:text-slate-600">·</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Phase {activePhaseIndex + 1} · Wk {activeWeek} · Day {activeDayNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsScheduleDrawerOpen(true)}
                  className="py-2 px-3 sm:px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition-all min-h-[40px] shadow-sm"
                >
                  <span>Change</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sport Showcase Hero Banner (in training view) */}
            {activeTab !== 'session' && (
              <div className="relative">
                <SportHeroBanner
                  program={currentProgram}
                  selectedSport={selectedSport}
                  onSelectSport={(sport: SportId) => setSelectedSport(sport)}
                  activePosition={activePosition}
                  positions={sportPositions}
                  onSelectPosition={setActivePosition}
                  onNavigateToPositionsTab={() => setActiveTab('positions')}
                />
              </div>
            )}
          </>
        )}

        {/* Dynamic Tab Views */}
        {activeTab === 'training' && (
          isSimpleMode ? (
            <SimpleTodayView
              program={currentProgram}
              activeProfile={activeProfile}
              activePhaseIndex={activePhaseIndex}
              activeDayNumber={activeDayNumber}
              onSelectDayNumber={setActiveDayNumber}
              onStartSession={(dNum) => {
                setActiveDayNumber(dNum);
                setActiveTab('session');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              sessionLog={currentSessionLog}
              allSessionLogs={sessionLogs}
              onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
              onSwitchToAdvanced={toggleExperienceMode}
              swappedExercises={swappedExercises}
              selectedSport={selectedSport}
              onSelectSport={setSelectedSport}
              activePosition={activePosition}
              onSelectPositionId={setActivePosition}
            />
          ) : (
            <WorkoutBrowser
              program={currentProgram}
              activePhaseIndex={activePhaseIndex}
              onSelectPhaseIndex={setActivePhaseIndex}
              activeDayNumber={activeDayNumber}
              onSelectDayNumber={setActiveDayNumber}
              onOpenExerciseGuide={handleOpenExerciseGuide}
              onStartSession={handleStartSession}
              emergency30MinMode={emergency30MinMode}
              onToggleEmergencyMode={() => setEmergency30MinMode(!emergency30MinMode)}
              onStartTimerWithRest={handleStartTimerWithRest}
              onOpenSwapModal={handleOpenSwapModal}
              onOpenPlateCalculator={(name: string) => handleOpenPlateCalculator(name)}
              onOpenWarmUpCalculator={(name: string) => handleOpenWarmUpCalculator(name)}
              onOpenPrintModal={() => setIsPrintModalOpen(true)}
              activePosition={activePosition}
              onNavigateToPositionsTab={() => setActiveTab('positions')}
              trainingFrequency={trainingFrequency}
              onSelectFrequency={setTrainingFrequency}
              swappedExercises={swappedExercises}
              onRevertSwap={revertExerciseSwap}
            />
          )
        )}

        {activeTab === 'session' && (
          isSimpleMode ? (
            <SimpleWorkoutLogger
              program={currentProgram}
              activeProfile={activeProfile}
              activePhaseIndex={activePhaseIndex}
              activeDayNumber={activeDayNumber}
              activeWeek={activeWeek}
              sessionLog={currentSessionLog}
              onUpdateExerciseLog={updateExerciseLog}
              onUpdateSessionMeta={updateSessionMeta}
              onBackToOverview={() => setActiveTab('training')}
              onOpenSwapModal={handleOpenSwapModal}
              onStartRestTimer={handleStartTimerWithRest}
              onAdvanceToNextDay={() => {
                const totalDays = currentProgram.phases[activePhaseIndex]?.days?.length || 4;
                const nextDay = activeDayNumber < totalDays ? activeDayNumber + 1 : 1;
                setActiveDayNumber(nextDay);
              }}
              swappedExercises={swappedExercises}
            />
          ) : (
            <WorkoutSessionView
              program={currentProgram}
              activePhaseIndex={activePhaseIndex}
              onSelectPhaseIndex={setActivePhaseIndex}
              activeDayNumber={activeDayNumber}
              activeWeek={activeWeek}
              sessionLog={currentSessionLog}
              allSessionLogs={sessionLogs}
              onUpdateExerciseLog={updateExerciseLog}
              onUpdateSessionMeta={updateSessionMeta}
              onOpenExerciseGuide={handleOpenExerciseGuide}
              onStartRestTimer={handleStartTimerWithRest}
              onNavigateDay={(day: number) => setActiveDayNumber(day)}
              onOpenSwapModal={handleOpenSwapModal}
              onRevertSwap={revertExerciseSwap}
              onOpenPlateCalculator={handleOpenPlateCalculator}
              onOpenWarmUpCalculator={handleOpenWarmUpCalculator}
              onOpenBevelExport={() => setIsBevelModalOpen(true)}
              onOpenPrintModal={() => setIsPrintModalOpen(true)}
              activePosition={activePosition}
              onNavigateToPositionsTab={() => setActiveTab('positions')}
              autoAdvance={autoAdvance}
              onToggleAutoAdvance={() => setAutoAdvance(prev => !prev)}
              phaseSetDefaults={phaseSetDefaults}
              onUpdateExerciseSetCount={updateExerciseSetCount}
              onDuplicatePreviousSet={duplicatePreviousSet}
              trainingFrequency={trainingFrequency}
              onSelectFrequency={setTrainingFrequency}
            />
          )
        )}

        {activeTab === 'positions' && (
          <PositionalSpecializationView
            program={currentProgram}
            positions={sportPositions}
            activePosition={activePosition}
            onSelectPosition={setActivePosition}
            onStartSession={() => handleStartSession(activeDayNumber)}
            onOpenTimer={handleStartTimerWithRest}
          />
        )}

        {activeTab === 'progression' && (
          <ProgressionRegressionMatrix
            onOpenExerciseGuide={handleOpenExerciseGuide}
          />
        )}

        {activeTab === 'testing' && (
          <TestingAndBenchmarks
            program={currentProgram}
            assessments={assessments}
            onUpdateAssessmentValue={updateAssessmentValue}
            onUpdateAssessmentNotes={updateAssessmentNotes}
            calculate1RM={calculate1RM}
            activePosition={activePosition}
            onNavigateToPositionsTab={() => setActiveTab('positions')}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTrackerView
            program={currentProgram}
            progressTracker={progressTracker}
            onUpdateProgressRow={updateProgressRow}
          />
        )}

        {activeTab === 'science' && (
          <SportsScienceLibrary />
        )}
      </main>

      {/* Exercise How-To & Progression Modal */}
      <ExerciseGuideModal
        exerciseId={modalExerciseId}
        exerciseNameFallback={modalFallbackName}
        onClose={() => setModalExerciseId(null)}
        onStartRestTimer={handleStartTimerWithRest}
        onOpenSwapModal={handleOpenSwapModal}
        onOpenWarmUpCalculator={(name: string) => handleOpenWarmUpCalculator(name)}
      />

      {/* Equipment Swap & In-Rack Alternatives Modal */}
      <EquipmentSwapModal
        isOpen={swapModalExerciseId !== null}
        exerciseId={swapModalExerciseId}
        catalogExerciseId={swapModalCatalogId}
        exerciseNameFallback={swapModalExerciseName}
        category={swapModalCategory}
        currentSwapped={activeSwappedForModal}
        onClose={() => setSwapModalExerciseId(null)}
        onConfirmSwap={(exId, swapData) => {
          swapExercise(exId, swapData);
        }}
        onRevertSwap={(exId) => {
          revertExerciseSwap(exId);
        }}
        onOpenExerciseGuide={handleOpenExerciseGuide}
      />

      {/* Smart Warm-Up Ramp-Up Calculator with Audible Alerts Modal */}
      <SmartWarmUpCalculatorModal
        isOpen={isWarmUpModalOpen}
        exerciseName={warmUpExerciseName}
        initialWorkingWeight={warmUpInitialWeight}
        onClose={() => setIsWarmUpModalOpen(false)}
        onApplyToSession={handleApplyWarmUpToSession}
      />

      {/* Barbell Plate Calculator (Forward Target & Reverse Tap Math) Modal */}
      <BarbellPlateCalculatorModal
        isOpen={isPlateCalculatorOpen}
        onClose={() => setIsPlateCalculatorOpen(false)}
        exerciseName={plateCalculatorExerciseName}
        initialWeight={plateCalculatorInitialWeight}
        onApplyToSession={handleApplyPlateWeightToSession}
        onOpenWarmUpRamp={(name, weight) => {
          handleOpenWarmUpCalculator(name, weight);
        }}
      />

      {/* Floating Rest Timer Widget */}
      <RestTimerWidget
        initialSeconds={timerInitialSeconds}
        autoStart={timerAutoStart}
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* Bevel Workout Sync & Share Modal */}
      <BevelExportModal
        isOpen={isBevelModalOpen}
        onClose={() => setIsBevelModalOpen(false)}
        exportContext={bevelExportContext}
      />

      {/* Workout Print & Download Modal */}
      <WorkoutPrintDownloadModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        program={currentProgram}
        activePhaseIndex={activePhaseIndex}
        activeDayNumber={activeDayNumber}
        activeWeek={activeWeek}
        sessionLogs={sessionLogs}
        currentSessionLog={currentSessionLog}
        athleteName={athleteName}
      />

      {/* Full Data Backup & Restore Modal */}
      <DataBackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        exportBackupPayload={exportBackupPayload}
        importBackupPayload={importBackupPayload}
        resetAllData={resetAllData}
        resetSportLogs={resetSportLogs}
        selectedSport={selectedSport}
      />

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-12 no-print transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-200">FORGE</span>
            <span>·</span>
            <span>Built under pressure · Driven by science</span>
            <span>·</span>
            <span className="capitalize">{currentProgram.name}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-medium flex items-center gap-1"
            >
              Print &amp; Download Workouts
            </button>
            <span>·</span>
            <button
              onClick={() => setIsBackupModalOpen(true)}
              className="hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-medium flex items-center gap-1"
            >
              Backup & Export Data
            </button>
            <span>·</span>
            <span>Periodized Strength & Conditioning</span>
          </div>
        </div>
      </footer>
      {/* Quick Gym Tools & Utilities Modal */}
      <QuickGymToolsModal
        isOpen={isQuickToolsOpen}
        onClose={() => setIsQuickToolsOpen(false)}
        onOpenWatchMode={() => setIsWatchConnectModalOpen(true)}
        onOpenPlateCalculator={() => {
          const currentPhase = currentProgram.phases[activePhaseIndex] || currentProgram.phases[0];
          const currentDay = currentPhase.days.find(d => d.dayNumber === activeDayNumber) || currentPhase.days[0];
          handleOpenPlateCalculator(currentDay.exercises[0]?.name || 'Main Compound Lift');
        }}
        onOpenWarmUpCalc={() => {
          const currentPhase = currentProgram.phases[activePhaseIndex] || currentProgram.phases[0];
          const currentDay = currentPhase.days.find(d => d.dayNumber === activeDayNumber) || currentPhase.days[0];
          handleOpenWarmUpCalculator(currentDay.exercises[0]?.name || 'Main Compound Lift');
        }}
        onOpenBevelExport={() => setIsBevelModalOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => setIsFocusMode(prev => !prev)}
        autoAdvance={autoAdvance}
        onToggleAutoAdvance={() => setAutoAdvance(prev => !prev)}
        theme={theme}
        onToggleTheme={toggleTheme}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === 'athlete' ? 'coach' : 'athlete')}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
        }}
        trainingFrequency={trainingFrequency}
        onSelectFrequency={setTrainingFrequency}
      />

      {/* Thumb-Friendly Mobile Bottom Navigation Bar (1-Thumb Access) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
        }}
        onOpenTimer={() => setIsTimerOpen(true)}
        isTimerRunning={isTimerOpen}
        onOpenQuickTools={() => setIsQuickToolsOpen(true)}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => setIsFocusMode(prev => !prev)}
        isSimpleMode={isSimpleMode}
      />

      {/* User Profile Switcher Modal */}
      <ProfileSwitcherModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        activeProfileId={activeProfileId}
        profiles={profiles}
        onSelectProfile={switchProfile}
        onUpdateProfile={updateProfile}
      />

      {/* Unified Program & Schedule Selection Drawer */}
      <ProgramScheduleDrawer
        isOpen={isScheduleDrawerOpen}
        onClose={() => setIsScheduleDrawerOpen(false)}
        program={currentProgram}
        selectedSport={selectedSport}
        onSelectSport={setSelectedSport}
        activePhaseIndex={activePhaseIndex}
        onSelectPhaseIndex={setActivePhaseIndex}
        activeDayNumber={activeDayNumber}
        onSelectDayNumber={setActiveDayNumber}
        activePosition={activePosition}
        positions={sportPositions}
        onSelectPosition={setActivePosition}
        activeWeek={activeWeek}
        onSelectWeek={setActiveWeek}
      />

      {/* Apple Watch Direct Connect Modal */}
      <WatchConnectModal
        isOpen={isWatchConnectModalOpen}
        onClose={() => setIsWatchConnectModalOpen(false)}
        onLaunchSimulator={() => {
          setIsWatchConnectModalOpen(false);
          setIsWatchModeOpen(true);
        }}
        program={currentProgram}
        selectedSport={selectedSport}
        activeWeek={activeWeek}
        activePhaseIndex={activePhaseIndex}
        activeDayNumber={activeDayNumber}
        activePosition={typeof activePosition === 'string' ? activePosition : activePosition?.id || ''}
      />

      {/* Apple Watch & Wearable Live Session Companion */}
      {isWatchModeOpen && (
        <WatchCompanionView
          program={currentProgram}
          exercises={currentProgram.phases[activePhaseIndex]?.days?.find(d => d.dayNumber === activeDayNumber)?.exercises || currentProgram.phases[0]?.days?.[0]?.exercises || []}
          sessionLog={currentSessionLog}
          onUpdateExerciseLog={updateExerciseLog}
          onUpdateSessionMeta={updateSessionMeta}
          onClose={() => setIsWatchModeOpen(false)}
          dayName={currentProgram.phases[activePhaseIndex]?.days?.find(d => d.dayNumber === activeDayNumber)?.name || 'Today’s Workout'}
          isDirectWatchLaunch={typeof window !== 'undefined' && (window.location.search.includes('watch') || window.innerWidth <= 260)}
        />
      )}

      {/* Offline Status Indicator */}
      <OfflineIndicator />
    </div>
  );
}
