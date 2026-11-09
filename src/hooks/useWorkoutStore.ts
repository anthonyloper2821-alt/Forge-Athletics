import { useState, useEffect, useCallback, useMemo } from 'react';
import { SportId, DaySessionLog, ExerciseLogEntry, ProgressTrackerRow, TrainingFrequency, SportProgram } from '../types/sport';
import { ProfileId, UserProfile, DEFAULT_PROFILES } from '../types/profile';
import { ALL_PROGRAMS } from '../data/sportsOverview';
import { getPositionsForSport, getDefaultPositionForSport } from '../data/positionSpecializations';
import { safeStorage } from '../utils/safeStorage';
import { getAdaptiveDaysForPhase, FREQUENCY_CONFIGS } from '../utils/adaptiveFrequency';
import { getDeviceProfile, saveDeviceRoutineState, saveDeviceProfile, DeviceProfile } from '../utils/deviceProfile';
import { ApexAthleteBackupPayload } from '../utils/workoutExport';

const STORAGE_KEYS = {
  ACTIVE_PROFILE: 'apex_athlete_active_profile',
  PROFILES: 'apex_athlete_profiles',
  ACTIVE_SPORT: 'apex_athlete_active_sport',
  ACTIVE_WEEK: 'apex_athlete_active_week',
  ACTIVE_PHASE: 'apex_athlete_active_phase',
  ACTIVE_DAY: 'apex_athlete_active_day',
  VIEW_MODE: 'apex_athlete_view_mode', // 'athlete' | 'coach'
  SESSION_LOGS: 'apex_athlete_session_logs',
  SESSION_LOGS_PARTNER: 'apex_athlete_session_logs_partner',
  PROGRESS_TRACKER: 'apex_athlete_progress_tracker',
  ASSESSMENTS: 'apex_athlete_assessments',
  ATHLETE_NAME: 'apex_athlete_name',
  THEME: 'apex_athlete_theme',
  ACTIVE_POSITIONS: 'apex_athlete_active_positions',
  AUTO_ADVANCE: 'apex_athlete_auto_advance',
  PHASE_SET_CONFIG: 'apex_athlete_phase_set_config',
  SESSION_DISPLAY_MODE: 'apex_athlete_session_display_mode',
  TRAINING_FREQUENCY: 'apex_athlete_training_frequency',
  SWAPPED_EXERCISES: 'apex_athlete_swapped_exercises'
};

export function useWorkoutStore() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    // Default to dark mode for athletic performance UI
    return 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#020617' : '#ffffff');
    }
  }, [theme]);

  const [deviceProfile, setDeviceProfile] = useState<DeviceProfile>(() => getDeviceProfile());

  const [selectedSport, setSelectedSport] = useState<SportId>(() => {
    const device = getDeviceProfile();
    if (device.lastRoutine?.sportId && device.lastRoutine.sportId in ALL_PROGRAMS) {
      return device.lastRoutine.sportId;
    }
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_SPORT);
    if (saved && saved in ALL_PROGRAMS) return saved as SportId;
    return 'functional'; // default Everyday Athlete
  });

  const [activeWeek, setActiveWeek] = useState<number>(() => {
    const device = getDeviceProfile();
    if (device.lastRoutine?.weekNumber) return device.lastRoutine.weekNumber;
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_WEEK);
    return saved ? parseInt(saved, 10) : 1;
  });

  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(() => {
    const device = getDeviceProfile();
    if (device.lastRoutine?.phaseIndex !== undefined) return device.lastRoutine.phaseIndex;
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_PHASE);
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [activeDayNumber, setActiveDayNumber] = useState<number>(() => {
    const device = getDeviceProfile();
    if (device.lastRoutine?.dayNumber) return device.lastRoutine.dayNumber;
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_DAY);
    return saved !== null ? parseInt(saved, 10) : 1;
  });
  const [trainingFrequency, setTrainingFrequency] = useState<TrainingFrequency>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.TRAINING_FREQUENCY);
    if (saved === '3' || saved === '4' || saved === '5') {
      return parseInt(saved, 10) as TrainingFrequency;
    }
    return 4;
  });

  const setFrequency = useCallback((freq: TrainingFrequency) => {
    setTrainingFrequency(freq);
    safeStorage.setItem(STORAGE_KEYS.TRAINING_FREQUENCY, freq.toString());
    setActiveDayNumber(prev => (prev > freq ? 1 : prev));
  }, []);

  const [viewMode, setViewMode] = useState<'athlete' | 'coach'>(() => {
    return (safeStorage.getItem(STORAGE_KEYS.VIEW_MODE) as 'athlete' | 'coach') || 'athlete';
  });

  const [athleteName, setAthleteName] = useState<string>(() => {
    return safeStorage.getItem(STORAGE_KEYS.ATHLETE_NAME) || 'Athlete';
  });

  // Dual-Profile Storage State (Primary Athlete vs Partner/Simple Profile)
  const [profiles, setProfiles] = useState<Record<ProfileId, UserProfile>>(() => {
    return safeStorage.getJSON<Record<ProfileId, UserProfile>>(STORAGE_KEYS.PROFILES, DEFAULT_PROFILES);
  });

  const [activeProfileId, setActiveProfileId] = useState<ProfileId>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
    return saved === 'partner' ? 'partner' : 'primary';
  });

  const [emergency30MinMode, setEmergency30MinMode] = useState<boolean>(false);

  // Session logs: profile-scoped (primary uses standard key, partner uses partner key)
  const [sessionLogs, setSessionLogs] = useState<Record<string, DaySessionLog>>(() => {
    const activeProf = safeStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE);
    const key = activeProf === 'partner' ? STORAGE_KEYS.SESSION_LOGS_PARTNER : STORAGE_KEYS.SESSION_LOGS;
    return safeStorage.getJSON<Record<string, DaySessionLog>>(key, {});
  });

  // Progress tracker 8-week rows: record per sport
  const [progressTracker, setProgressTracker] = useState<Record<string, Record<number, ProgressTrackerRow>>>(() => {
    return safeStorage.getJSON<Record<string, Record<number, ProgressTrackerRow>>>(STORAGE_KEYS.PROGRESS_TRACKER, {});
  });

  // Assessment results: record per sport { baseline: Record<string, string>, final: Record<string, string> }
  const [assessments, setAssessments] = useState<Record<string, { baseline: Record<string, string>; final: Record<string, string>; notes?: string }>>(() => {
    return safeStorage.getJSON<Record<string, { baseline: Record<string, string>; final: Record<string, string>; notes?: string }>>(STORAGE_KEYS.ASSESSMENTS, {});
  });

  // Auto-Advance setting (default true for streamlined flow)
  const [autoAdvance, setAutoAdvance] = useState<boolean>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.AUTO_ADVANCE);
    return saved !== null ? saved === 'true' : true;
  });

  // Gym Floor Session Display Mode: 'focus' (1 active set card at a time) or 'list' (full exercise list)
  const [sessionDisplayMode, setSessionDisplayMode] = useState<'focus' | 'list'>(() => {
    const saved = safeStorage.getItem(STORAGE_KEYS.SESSION_DISPLAY_MODE);
    return saved === 'list' || saved === 'focus' ? saved : 'focus';
  });

  // Phase-specific set customizations default map: Record<sport_p{phaseIndex}, Record<exerciseId, number>>
  const [phaseSetDefaults, setPhaseSetDefaults] = useState<Record<string, Record<string, number>>>(() => {
    return safeStorage.getJSON<Record<string, Record<string, number>>>(STORAGE_KEYS.PHASE_SET_CONFIG, {});
  });

  // Active position per sport: Record<SportId, string>
  const [selectedPositions, setSelectedPositions] = useState<Record<string, string>>(() => {
    return safeStorage.getJSON<Record<string, string>>(STORAGE_KEYS.ACTIVE_POSITIONS, {});
  });

  // Persistent exercise blueprint swaps: Record<exerciseId, SwapData>
  const [swappedExercises, setSwappedExercises] = useState<Record<string, {
    name: string;
    originalExerciseId: string;
    newExerciseId?: string;
    equipment?: string;
    rationale?: string;
  }>>(() => {
    return safeStorage.getJSON(STORAGE_KEYS.SWAPPED_EXERCISES, {});
  });

  const sportPositions = getPositionsForSport(selectedSport);
  const activePositionId = selectedPositions[selectedSport] || (sportPositions[0]?.id ?? '');
  const activePosition = sportPositions.find(p => p.id === activePositionId) || sportPositions[0] || getDefaultPositionForSport(selectedSport);

  const setActivePosition = useCallback((positionId: string) => {
    setSelectedPositions(prev => {
      const updated = { ...prev, [selectedSport]: positionId };
      safeStorage.setJSON(STORAGE_KEYS.ACTIVE_POSITIONS, updated);
      return updated;
    });
  }, [selectedSport]);

  // Immediate state saves for lightweight scalars and device hardware memory
  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.AUTO_ADVANCE, autoAdvance.toString());
  }, [autoAdvance]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.SESSION_DISPLAY_MODE, sessionDisplayMode);
  }, [sessionDisplayMode]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ACTIVE_SPORT, selectedSport);
    saveDeviceRoutineState({ sportId: selectedSport });
  }, [selectedSport]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ACTIVE_WEEK, activeWeek.toString());
    saveDeviceRoutineState({ weekNumber: activeWeek });
  }, [activeWeek]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ACTIVE_PHASE, activePhaseIndex.toString());
    saveDeviceRoutineState({ phaseIndex: activePhaseIndex });
  }, [activePhaseIndex]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ACTIVE_DAY, activeDayNumber.toString());
    saveDeviceRoutineState({ dayNumber: activeDayNumber });
  }, [activeDayNumber]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
  }, [viewMode]);

  useEffect(() => {
    safeStorage.setItem(STORAGE_KEYS.ATHLETE_NAME, athleteName);
  }, [athleteName]);

  // Debounced persistent storage for heavy JSON objects (prevents typing input lag & storage thrashing)
  useEffect(() => {
    const timer = setTimeout(() => {
      const key = activeProfileId === 'partner' ? STORAGE_KEYS.SESSION_LOGS_PARTNER : STORAGE_KEYS.SESSION_LOGS;
      safeStorage.setJSON(key, sessionLogs);
    }, 300);
    return () => clearTimeout(timer);
  }, [sessionLogs, activeProfileId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      safeStorage.setJSON(STORAGE_KEYS.PROGRESS_TRACKER, progressTracker);
    }, 300);
    return () => clearTimeout(timer);
  }, [progressTracker]);

  useEffect(() => {
    const timer = setTimeout(() => {
      safeStorage.setJSON(STORAGE_KEYS.ASSESSMENTS, assessments);
    }, 300);
    return () => clearTimeout(timer);
  }, [assessments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      safeStorage.setJSON(STORAGE_KEYS.PHASE_SET_CONFIG, phaseSetDefaults);
    }, 300);
    return () => clearTimeout(timer);
  }, [phaseSetDefaults]);

  useEffect(() => {
    const timer = setTimeout(() => {
      safeStorage.setJSON(STORAGE_KEYS.SWAPPED_EXERCISES, swappedExercises);
    }, 300);
    return () => clearTimeout(timer);
  }, [swappedExercises]);

  // Synchronous flush on app exit / backgrounding to ensure 100% data durability
  useEffect(() => {
    const flushData = () => {
      const key = activeProfileId === 'partner' ? STORAGE_KEYS.SESSION_LOGS_PARTNER : STORAGE_KEYS.SESSION_LOGS;
      safeStorage.setJSON(key, sessionLogs);
      safeStorage.setJSON(STORAGE_KEYS.PROGRESS_TRACKER, progressTracker);
      safeStorage.setJSON(STORAGE_KEYS.ASSESSMENTS, assessments);
      safeStorage.setJSON(STORAGE_KEYS.PHASE_SET_CONFIG, phaseSetDefaults);
      safeStorage.setJSON(STORAGE_KEYS.SWAPPED_EXERCISES, swappedExercises);
    };

    const handleVisibility = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        flushData();
      }
    };

    window.addEventListener('beforeunload', flushData);
    window.addEventListener('pagehide', flushData);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('beforeunload', flushData);
      window.removeEventListener('pagehide', flushData);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [sessionLogs, progressTracker, assessments, phaseSetDefaults]);

  // Set Phase Index and intelligently sync active week and day with strict clamping
  const setPhaseIndex = useCallback((phaseIdx: number) => {
    const program = ALL_PROGRAMS[selectedSport] || ALL_PROGRAMS.boxing;
    if (!program || !program.phases || program.phases.length === 0) return;
    const clamped = Math.max(0, Math.min(phaseIdx, program.phases.length - 1));
    setActivePhaseIndex(clamped);

    const targetPhase = program.phases[clamped];
    if (targetPhase) {
      // Sync activeWeek if not inside this phase
      if (targetPhase.weekNumbers && targetPhase.weekNumbers.length > 0) {
        if (!targetPhase.weekNumbers.includes(activeWeek)) {
          setActiveWeek(targetPhase.weekNumbers[0]);
        }
      }
      // Ensure activeDayNumber is valid for this phase
      const totalDays = targetPhase.days ? targetPhase.days.length : 1;
      if (activeDayNumber > totalDays || activeDayNumber < 1) {
        setActiveDayNumber(1);
      }
    }
  }, [selectedSport, activeWeek, activeDayNumber]);

  // Set Week and intelligently sync phase
  const setWeek = useCallback((week: number) => {
    setActiveWeek(week);
    const program = ALL_PROGRAMS[selectedSport] || ALL_PROGRAMS.boxing;
    if (!program || !program.phases) return;
    const matchingPhaseIdx = program.phases.findIndex(p => p.weekNumbers.includes(week));
    if (matchingPhaseIdx !== -1) {
      setActivePhaseIndex(matchingPhaseIdx);
    }
  }, [selectedSport]);

  // When selectedSport changes, validate that phase, week, and day are strictly within bounds
  useEffect(() => {
    const program = ALL_PROGRAMS[selectedSport] || ALL_PROGRAMS.boxing;
    if (!program || !program.phases || program.phases.length === 0) return;

    let targetPhaseIdx = activePhaseIndex;
    if (activePhaseIndex >= program.phases.length || activePhaseIndex < 0) {
      targetPhaseIdx = 0;
      setActivePhaseIndex(0);
    }

    const currentPhase = program.phases[targetPhaseIdx];
    if (currentPhase) {
      if (currentPhase.weekNumbers && currentPhase.weekNumbers.length > 0 && !currentPhase.weekNumbers.includes(activeWeek)) {
        setActiveWeek(currentPhase.weekNumbers[0]);
      }
      const totalDays = currentPhase.days ? currentPhase.days.length : 1;
      if (activeDayNumber > totalDays || activeDayNumber < 1) {
        setActiveDayNumber(1);
      }
    }
  }, [selectedSport]);

  // Session Log Key helper (with backwards-compatible 4-day standard key)
  const getSessionKey = useCallback((sport: SportId, phaseIdx: number, dayNum: number, weekNum: number, freq: TrainingFrequency = trainingFrequency) => {
    return freq === 4 
      ? `${sport}_p${phaseIdx}_d${dayNum}_w${weekNum}`
      : `${sport}_p${phaseIdx}_d${dayNum}_w${weekNum}_f${freq}`;
  }, [trainingFrequency]);

  const currentSessionKey = getSessionKey(selectedSport, activePhaseIndex, activeDayNumber, activeWeek);
  const currentSessionLog: DaySessionLog = useMemo(() => {
    const raw = sessionLogs[currentSessionKey] || {
      completed: false,
      exerciseLogs: {}
    };
    return {
      ...raw,
      swappedExercises: {
        ...(swappedExercises || {}),
        ...(raw.swappedExercises || {})
      }
    };
  }, [sessionLogs, currentSessionKey, swappedExercises]);

  // Update a single exercise log entry
  const updateExerciseLog = useCallback((exerciseId: string, setIndex: number, field: 'load' | 'reps' | 'completed', value: string | boolean) => {
    setSessionLogs(prev => {
      const session = prev[currentSessionKey] || { completed: false, exerciseLogs: {} };
      const currentEntries = session.exerciseLogs[exerciseId] || [];
      const updatedEntries: ExerciseLogEntry[] = [...currentEntries];

      while (updatedEntries.length <= setIndex) {
        updatedEntries.push({
          setNumber: updatedEntries.length + 1,
          load: '',
          reps: '',
          completed: false
        });
      }

      updatedEntries[setIndex] = {
        ...updatedEntries[setIndex],
        [field]: value
      };

      return {
        ...prev,
        [currentSessionKey]: {
          ...session,
          exerciseLogs: {
            ...session.exerciseLogs,
            [exerciseId]: updatedEntries
          }
        }
      };
    });
  }, [currentSessionKey]);

  // Fast 1-Tap Gym Floor Set Logger (sets load, reps, and completed atomically)
  const quickLogSet = useCallback((exerciseId: string, setIndex: number, load: string, reps: string) => {
    setSessionLogs(prev => {
      const session = prev[currentSessionKey] || { completed: false, exerciseLogs: {} };
      const currentEntries = session.exerciseLogs[exerciseId] || [];
      const updatedEntries = [...currentEntries];

      while (updatedEntries.length <= setIndex) {
        updatedEntries.push({
          setNumber: updatedEntries.length + 1,
          load: '',
          reps: '',
          completed: false
        });
      }

      updatedEntries[setIndex] = {
        ...updatedEntries[setIndex],
        setNumber: setIndex + 1,
        load,
        reps,
        completed: true
      };

      return {
        ...prev,
        [currentSessionKey]: {
          ...session,
          exerciseLogs: {
            ...session.exerciseLogs,
            [exerciseId]: updatedEntries
          }
        }
      };
    });
  }, [currentSessionKey]);

  // Update overall session metadata
  const updateSessionMeta = useCallback((updates: Partial<DaySessionLog>) => {
    setSessionLogs(prev => {
      const session = prev[currentSessionKey] || { completed: false, exerciseLogs: {} };
      return {
        ...prev,
        [currentSessionKey]: {
          ...session,
          ...updates
        }
      };
    });
  }, [currentSessionKey]);

  // Swap an exercise in the active workout session and persistent blueprint
  const swapExercise = useCallback((exerciseId: string, swapData: { name: string; originalExerciseId: string; newExerciseId?: string; equipment?: string; rationale?: string }) => {
    // 1. Persist to global blueprint swaps
    setSwappedExercises(prev => ({
      ...prev,
      [exerciseId]: swapData
    }));

    // 2. Also record in session logs
    setSessionLogs(prev => {
      const session = prev[currentSessionKey] || { completed: false, exerciseLogs: {} };
      const currentSwaps = session.swappedExercises || {};
      return {
        ...prev,
        [currentSessionKey]: {
          ...session,
          swappedExercises: {
            ...currentSwaps,
            [exerciseId]: swapData
          }
        }
      };
    });
  }, [currentSessionKey]);

  // Update custom set count for an exercise (phase-aware + session-specific)
  const updateExerciseSetCount = useCallback((exerciseId: string, count: number, applyToPhase: boolean = true) => {
    const clampedCount = Math.min(Math.max(count, 1), 12);
    setSessionLogs(prev => {
      const session = prev[currentSessionKey] || { completed: false, exerciseLogs: {} };
      const currentCustomCounts = session.customSetCounts || {};
      return {
        ...prev,
        [currentSessionKey]: {
          ...session,
          customSetCounts: {
            ...currentCustomCounts,
            [exerciseId]: clampedCount
          }
        }
      };
    });

    if (applyToPhase) {
      const phaseKey = `${selectedSport}_p${activePhaseIndex}`;
      setPhaseSetDefaults(prev => ({
        ...prev,
        [phaseKey]: {
          ...(prev[phaseKey] || {}),
          [exerciseId]: clampedCount
        }
      }));
    }
  }, [currentSessionKey, selectedSport, activePhaseIndex]);

  // Duplicate previous set load and reps into target set (for quick iOS logging)
  const duplicatePreviousSet = useCallback((exerciseId: string, targetSetIndex: number) => {
    if (targetSetIndex <= 0) return;
    setSessionLogs(prev => {
      const session = prev[currentSessionKey] || { completed: false, exerciseLogs: {} };
      const entries = session.exerciseLogs[exerciseId] || [];
      const prevEntry = entries[targetSetIndex - 1];
      if (!prevEntry) return prev;

      const updated = [...entries];
      while (updated.length <= targetSetIndex) {
        updated.push({
          setNumber: updated.length + 1,
          load: '',
          reps: '',
          completed: false
        });
      }

      updated[targetSetIndex] = {
        ...updated[targetSetIndex],
        load: prevEntry.load || '',
        reps: prevEntry.reps || ''
      };

      return {
        ...prev,
        [currentSessionKey]: {
          ...session,
          exerciseLogs: {
            ...session.exerciseLogs,
            [exerciseId]: updated
          }
        }
      };
    });
  }, [currentSessionKey]);

  // Revert a swapped exercise back to its original blueprint
  const revertExerciseSwap = useCallback((exerciseId: string) => {
    // 1. Remove from global blueprint swaps
    setSwappedExercises(prev => {
      if (!prev[exerciseId]) return prev;
      const updated = { ...prev };
      delete updated[exerciseId];
      return updated;
    });

    // 2. Remove from active session log if present
    setSessionLogs(prev => {
      const session = prev[currentSessionKey];
      if (!session || !session.swappedExercises) return prev;
      const currentSwaps = { ...session.swappedExercises };
      delete currentSwaps[exerciseId];
      return {
        ...prev,
        [currentSessionKey]: {
          ...session,
          swappedExercises: currentSwaps
        }
      };
    });
  }, [currentSessionKey]);

  // Update progress tracker row for a specific week
  const updateProgressRow = useCallback((sport: SportId, weekNum: number, field: keyof ProgressTrackerRow, value: string) => {
    setProgressTracker(prev => {
      const sportData = prev[sport] || {};
      const existingRow: ProgressTrackerRow = sportData[weekNum] || {
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

      return {
        ...prev,
        [sport]: {
          ...sportData,
          [weekNum]: {
            ...existingRow,
            [field]: value
          }
        }
      };
    });
  }, []);

  // Update Assessment values
  const updateAssessmentValue = useCallback((sport: SportId, type: 'baseline' | 'final', testId: string, value: string) => {
    setAssessments(prev => {
      const sportRecord = prev[sport] || { baseline: {}, final: {} };
      return {
        ...prev,
        [sport]: {
          ...sportRecord,
          [type]: {
            ...sportRecord[type],
            [testId]: value
          }
        }
      };
    });
  }, []);

  const updateAssessmentNotes = useCallback((sport: SportId, notes: string) => {
    setAssessments(prev => {
      const sportRecord = prev[sport] || { baseline: {}, final: {} };
      return {
        ...prev,
        [sport]: {
          ...sportRecord,
          notes
        }
      };
    });
  }, []);

  // Quick 1RM estimator calculation
  const calculate1RM = (weight: number, reps: number): { epley: number; brzycki: number; threeRmEst: number } => {
    if (!weight || !reps || reps <= 0) return { epley: 0, brzycki: 0, threeRmEst: 0 };
    if (reps === 1) return { epley: weight, brzycki: weight, threeRmEst: weight };
    const epley = Math.round(weight * (1 + reps / 30));
    const brzycki = Math.round(weight / (1.0278 - 0.0278 * reps));
    const threeRmEst = reps === 3 ? Math.round(weight * 1.08) : Math.round(epley);
    return { epley, brzycki, threeRmEst };
  };

  // Reset current sport logs
  const resetSportLogs = useCallback((sport: SportId) => {
    setSessionLogs(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(key => {
        if (key.startsWith(`${sport}_`)) {
          delete copy[key];
        }
      });
      return copy;
    });
  }, []);

  // Export full athlete backup payload
  const exportBackupPayload = useCallback((): ApexAthleteBackupPayload => {
    return {
      version: 1,
      exportedAt: new Date().toISOString(),
      app: 'Forge',
      athleteName,
      activeSport: selectedSport,
      sessionLogs,
      progressTracker,
      assessments,
      phaseSetDefaults,
      selectedPositions,
      theme,
      autoAdvance
    };
  }, [athleteName, selectedSport, sessionLogs, progressTracker, assessments, phaseSetDefaults, selectedPositions, theme, autoAdvance]);

  // Import full backup with merge or replace
  const importBackupPayload = useCallback((payload: ApexAthleteBackupPayload, mode: 'merge' | 'replace' = 'merge') => {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid backup file payload');
    }

    if (mode === 'replace') {
      const newLogs = payload.sessionLogs || {};
      const newProgress = payload.progressTracker || {};
      const newAssessments = payload.assessments || {};
      const newPhaseSets = payload.phaseSetDefaults || {};
      const newPositions = payload.selectedPositions || {};

      setSessionLogs(newLogs);
      safeStorage.setJSON(STORAGE_KEYS.SESSION_LOGS, newLogs);

      setProgressTracker(newProgress);
      safeStorage.setJSON(STORAGE_KEYS.PROGRESS_TRACKER, newProgress);

      setAssessments(newAssessments);
      safeStorage.setJSON(STORAGE_KEYS.ASSESSMENTS, newAssessments);

      setPhaseSetDefaults(newPhaseSets);
      safeStorage.setJSON(STORAGE_KEYS.PHASE_SET_CONFIG, newPhaseSets);

      setSelectedPositions(newPositions);
      safeStorage.setJSON(STORAGE_KEYS.ACTIVE_POSITIONS, newPositions);

      if (payload.athleteName) {
        setAthleteName(payload.athleteName);
        safeStorage.setItem(STORAGE_KEYS.ATHLETE_NAME, payload.athleteName);
      }
      if (payload.activeSport && payload.activeSport in ALL_PROGRAMS) {
        setSelectedSport(payload.activeSport);
        safeStorage.setItem(STORAGE_KEYS.ACTIVE_SPORT, payload.activeSport);
      }
    } else {
      // Merge mode
      setSessionLogs(prev => {
        const merged = { ...prev, ...(payload.sessionLogs || {}) };
        safeStorage.setJSON(STORAGE_KEYS.SESSION_LOGS, merged);
        return merged;
      });

      setProgressTracker(prev => {
        const merged = { ...prev };
        if (payload.progressTracker) {
          Object.entries(payload.progressTracker).forEach(([sport, rows]) => {
            merged[sport] = { ...(merged[sport] || {}), ...rows };
          });
        }
        safeStorage.setJSON(STORAGE_KEYS.PROGRESS_TRACKER, merged);
        return merged;
      });

      setAssessments(prev => {
        const merged = { ...prev };
        if (payload.assessments) {
          Object.entries(payload.assessments).forEach(([sport, data]) => {
            merged[sport] = {
              baseline: { ...(merged[sport]?.baseline || {}), ...(data.baseline || {}) },
              final: { ...(merged[sport]?.final || {}), ...(data.final || {}) },
              notes: data.notes || merged[sport]?.notes
            };
          });
        }
        safeStorage.setJSON(STORAGE_KEYS.ASSESSMENTS, merged);
        return merged;
      });

      setPhaseSetDefaults(prev => {
        const merged = { ...prev };
        if (payload.phaseSetDefaults) {
          Object.entries(payload.phaseSetDefaults).forEach(([key, val]) => {
            merged[key] = { ...(merged[key] || {}), ...val };
          });
        }
        safeStorage.setJSON(STORAGE_KEYS.PHASE_SET_CONFIG, merged);
        return merged;
      });

      setSelectedPositions(prev => {
        const merged = { ...prev, ...(payload.selectedPositions || {}) };
        safeStorage.setJSON(STORAGE_KEYS.ACTIVE_POSITIONS, merged);
        return merged;
      });

      if (payload.athleteName && athleteName === 'Athlete') {
        setAthleteName(payload.athleteName);
        safeStorage.setItem(STORAGE_KEYS.ATHLETE_NAME, payload.athleteName);
      }
    }
  }, [athleteName]);

  // Clean reset of all logged workouts
  const resetAllData = useCallback(() => {
    setSessionLogs({});
    setProgressTracker({});
    setAssessments({});
    setPhaseSetDefaults({});
    setSelectedPositions({});
    setSwappedExercises({});
    safeStorage.removeItem(STORAGE_KEYS.SESSION_LOGS);
    safeStorage.removeItem(STORAGE_KEYS.PROGRESS_TRACKER);
    safeStorage.removeItem(STORAGE_KEYS.ASSESSMENTS);
    safeStorage.removeItem(STORAGE_KEYS.PHASE_SET_CONFIG);
    safeStorage.removeItem(STORAGE_KEYS.ACTIVE_POSITIONS);
    safeStorage.removeItem(STORAGE_KEYS.SWAPPED_EXERCISES);
  }, []);

  const activeProfile = profiles[activeProfileId] || DEFAULT_PROFILES[activeProfileId];
  const isSimpleMode = activeProfile.mode === 'simple';

  const updateProfile = useCallback((profileId: ProfileId, updates: Partial<UserProfile>) => {
    setProfiles(prev => {
      const updated = {
        ...prev,
        [profileId]: {
          ...prev[profileId],
          ...updates
        }
      };
      safeStorage.setJSON(STORAGE_KEYS.PROFILES, updated);
      return updated;
    });
  }, []);

  const switchProfile = useCallback((profileId: ProfileId) => {
    setActiveProfileId(profileId);
    safeStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE, profileId);

    const target = profiles[profileId] || DEFAULT_PROFILES[profileId];
    // Load target logs
    const key = profileId === 'partner' ? STORAGE_KEYS.SESSION_LOGS_PARTNER : STORAGE_KEYS.SESSION_LOGS;
    const targetLogs = safeStorage.getJSON<Record<string, DaySessionLog>>(key, {});
    setSessionLogs(targetLogs);

    // Apply target profile's current selections
    if (target.sport && target.sport in ALL_PROGRAMS) {
      setSelectedSport(target.sport as SportId);
    }
    setActivePhaseIndex(target.activePhaseIndex ?? 0);
    setActiveDayNumber(target.activeDayNumber ?? 1);
    setActiveWeek(target.activeWeek ?? 1);
    if (target.trainingFrequency) {
      setTrainingFrequency(target.trainingFrequency as TrainingFrequency);
    }
    if (target.name) {
      setAthleteName(target.name);
    }
  }, [profiles]);

  const toggleExperienceMode = useCallback(() => {
    const currentMode = profiles[activeProfileId]?.mode || 'advanced';
    const nextMode = currentMode === 'simple' ? 'advanced' : 'simple';
    updateProfile(activeProfileId, { mode: nextMode });
    saveDeviceProfile({ mode: nextMode });
  }, [activeProfileId, profiles, updateProfile]);

  const updateDeviceProfileName = useCallback((newName: string) => {
    const updated = saveDeviceProfile({ name: newName });
    setDeviceProfile(updated);
    setAthleteName(newName);
  }, []);

  return {
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
    setActiveWeek: setWeek,
    activePhaseIndex,
    setActivePhaseIndex: setPhaseIndex,
    activeDayNumber,
    setActiveDayNumber,
    viewMode,
    setViewMode,
    athleteName,
    setAthleteName,
    emergency30MinMode,
    setEmergency30MinMode,
    sessionLogs,
    currentSessionKey,
    currentSessionLog,
    swappedExercises,
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
    resetSportLogs,
    resetAllData,
    exportBackupPayload,
    importBackupPayload,
    theme,
    toggleTheme,
    autoAdvance,
    setAutoAdvance,
    phaseSetDefaults,
    updateExerciseSetCount,
    duplicatePreviousSet,
    quickLogSet,
    sessionDisplayMode,
    setSessionDisplayMode,
    trainingFrequency,
    setTrainingFrequency: setFrequency,
    currentProgram: (() => {
      const baseProgram = ALL_PROGRAMS[selectedSport] || ALL_PROGRAMS.boxing;
      if (trainingFrequency === 4) return baseProgram;
      const freqConfig = FREQUENCY_CONFIGS[trainingFrequency];
      return {
        ...baseProgram,
        frequency: `${freqConfig.label} (${freqConfig.badge})`,
        phases: baseProgram.phases.map(phase => ({
          ...phase,
          days: getAdaptiveDaysForPhase(phase, trainingFrequency, selectedSport)
        }))
      };
    })(),
    activePosition,
    setActivePosition,
    sportPositions
  };
}
