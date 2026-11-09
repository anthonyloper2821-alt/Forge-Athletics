import { DaySessionLog, ExerciseLogEntry, SportId } from '../types/sport';

export interface PreviousExercisePerformance {
  peakLoad: string;
  peakReps: string;
  numericPeakLoad: number;
  sets: ExerciseLogEntry[];
  weekNumber: number;
  phaseIndex: number;
  dayNumber: number;
  sessionLabel: string;
  completedAt?: string;
  summaryText: string;
}

/**
 * Extracts a numeric load value from a string like "185 lb", "85kg", "225"
 */
export function extractNumericLoad(loadStr?: string): number {
  if (!loadStr) return 0;
  const match = loadStr.match(/([0-9.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Scans sessionLogs to find the most recent previous performance of an exercise.
 */
export function findLastExercisePerformance(
  sessionLogs: Record<string, DaySessionLog>,
  sport: SportId,
  currentPhaseIndex: number,
  currentDayNumber: number,
  currentWeek: number,
  exerciseId: string,
  baseExerciseId?: string
): PreviousExercisePerformance | null {
  if (!sessionLogs) return null;

  const currentKey = `${sport}_p${currentPhaseIndex}_d${currentDayNumber}_w${currentWeek}`;

  // Helper to extract performance from a specific session log
  const extractFromSession = (
    session: DaySessionLog,
    key: string
  ): PreviousExercisePerformance | null => {
    const entries = session.exerciseLogs[exerciseId] || 
      (baseExerciseId ? session.exerciseLogs[baseExerciseId] : undefined);

    if (!entries || entries.length === 0) return null;

    // Filter sets that have an actual load or were marked completed
    const validSets = entries.filter(s => s && (s.completed || (s.load && s.load.trim().length > 0)));
    if (validSets.length === 0) return null;

    // Parse week, phase, day from key if possible: `${sport}_p${phase}_d${day}_w${week}`
    const match = key.match(/_p(\d+)_d(\d+)_w(\d+)/);
    const phaseIndex = match ? parseInt(match[1], 10) : currentPhaseIndex;
    const dayNumber = match ? parseInt(match[2], 10) : currentDayNumber;
    const weekNumber = match ? parseInt(match[3], 10) : 1;

    // Find the peak load
    let peakNum = 0;
    let peakLoadStr = '';
    let peakRepsStr = '';

    validSets.forEach(s => {
      const num = extractNumericLoad(s.load);
      if (num >= peakNum) {
        peakNum = num;
        peakLoadStr = s.load;
        peakRepsStr = s.reps;
      }
    });

    if (!peakLoadStr && validSets[0]) {
      peakLoadStr = validSets[0].load;
      peakRepsStr = validSets[0].reps;
      peakNum = extractNumericLoad(peakLoadStr);
    }

    if (!peakLoadStr && !peakRepsStr) return null;

    const sessionLabel = `W${weekNumber} D${dayNumber}`;
    const summaryText = peakRepsStr ? `${peakLoadStr} × ${peakRepsStr}` : peakLoadStr;

    return {
      peakLoad: peakLoadStr,
      peakReps: peakRepsStr,
      numericPeakLoad: peakNum,
      sets: validSets,
      weekNumber,
      phaseIndex,
      dayNumber,
      sessionLabel,
      completedAt: session.date,
      summaryText
    };
  };

  // 1. Direct priority check: Previous weeks in the exact same phase and day
  for (let w = currentWeek - 1; w >= 1; w--) {
    const key = `${sport}_p${currentPhaseIndex}_d${currentDayNumber}_w${w}`;
    if (key !== currentKey && sessionLogs[key]) {
      const perf = extractFromSession(sessionLogs[key], key);
      if (perf) return perf;
    }
  }

  // 2. Previous phases in the same sport and day
  for (let p = currentPhaseIndex - 1; p >= 0; p--) {
    for (let w = 4; w >= 1; w--) {
      const key = `${sport}_p${p}_d${currentDayNumber}_w${w}`;
      if (key !== currentKey && sessionLogs[key]) {
        const perf = extractFromSession(sessionLogs[key], key);
        if (perf) return perf;
      }
    }
  }

  // 3. Any previous session in the same sport where week < currentWeek (or earlier session)
  const allSportKeys = Object.keys(sessionLogs)
    .filter(k => k.startsWith(`${sport}_`) && k !== currentKey);

  // Sort keys by week descending, then phase descending
  allSportKeys.sort((a, b) => {
    const matchA = a.match(/_p(\d+)_d(\d+)_w(\d+)/);
    const matchB = b.match(/_p(\d+)_d(\d+)_w(\d+)/);
    const wA = matchA ? parseInt(matchA[3], 10) : 0;
    const wB = matchB ? parseInt(matchB[3], 10) : 0;
    if (wB !== wA) return wB - wA;
    const pA = matchA ? parseInt(matchA[1], 10) : 0;
    const pB = matchB ? parseInt(matchB[1], 10) : 0;
    return pB - pA;
  });

  for (const k of allSportKeys) {
    const perf = extractFromSession(sessionLogs[k], k);
    if (perf) return perf;
  }

  return null;
}
