import { DaySessionLog, SportProgram, WorkoutDay, SportId } from '../types/sport';

export interface ApexAthleteBackupPayload {
  version: number;
  exportedAt: string;
  app: string;
  athleteName: string;
  activeSport: SportId;
  sessionLogs: Record<string, DaySessionLog>;
  progressTracker: Record<string, Record<number, any>>;
  assessments: Record<string, { baseline: Record<string, string>; final: Record<string, string>; notes?: string }>;
  phaseSetDefaults: Record<string, Record<string, number>>;
  selectedPositions: Record<string, string>;
  theme?: 'dark' | 'light';
  autoAdvance?: boolean;
}

export interface WorkoutExportContext {
  program: SportProgram;
  day: WorkoutDay;
  phaseIndex: number;
  phaseTitle: string;
  weekNumber: number;
  sessionLog: DaySessionLog;
  athleteName?: string;
  customSetCounts?: Record<string, number>;
}

/**
 * Generates a clean, beautifully formatted Markdown/Text summary
 * optimized for Bevel (formerly Superset Health), Apple Health notes,
 * and fitness logs.
 */
export function generateBevelSummary(ctx: WorkoutExportContext): string {
  const { program, day, phaseTitle, weekNumber, sessionLog, athleteName } = ctx;
  const dateStr = sessionLog.date || new Date().toISOString().split('T')[0];
  const duration = sessionLog.durationMinutes || day.timeBudgetMinutes;
  const rpe = sessionLog.rpe || 7;

  // Calculate volume & completed sets
  let totalVolume = 0;
  let totalCompletedSets = 0;
  let totalScheduledSets = 0;

  const exerciseLines: string[] = [];

  day.exercises.forEach((ex, idx) => {
    const swapped = sessionLog.swappedExercises?.[ex.id];
    const exName = swapped?.name || ex.name;
    const entries = sessionLog.exerciseLogs[ex.id] || [];
    
    // Determine target sets count
    const targetSetCount = ctx.customSetCounts?.[ex.id] || 
      (ex.targetSetsReps.match(/^(\d+)\s*x/i) ? parseInt(ex.targetSetsReps.match(/^(\d+)\s*x/i)![1], 10) : 3);
    
    totalScheduledSets += targetSetCount;

    const setDetails: string[] = [];
    for (let s = 0; s < targetSetCount; s++) {
      const entry = entries[s];
      const isCompleted = entry?.completed ?? false;
      const load = entry?.load?.trim() || '';
      const reps = entry?.reps?.trim() || '';

      if (isCompleted) {
        totalCompletedSets++;
        const numLoad = parseFloat(load) || 0;
        const numReps = parseFloat(reps) || 0;
        if (numLoad > 0 && numReps > 0) {
          totalVolume += numLoad * numReps;
        }
      }

      if (load || reps || isCompleted) {
        const checkMark = isCompleted ? '✓' : '○';
        const loadStr = load ? `${load}` : '-';
        const repsStr = reps ? `${reps} reps` : '';
        setDetails.push(`   ${checkMark} Set ${s + 1}: ${loadStr}${repsStr ? ` × ${repsStr}` : ''}`);
      }
    }

    const swapNote = swapped ? ` (Swapped: ${swapped.equipment || 'Alternative'})` : '';
    const setsHeader = `• ${idx + 1}. ${exName}${swapNote} [Target: ${ex.targetSetsReps}]`;
    if (setDetails.length > 0) {
      exerciseLines.push(`${setsHeader}\n${setDetails.join('\n')}`);
    } else {
      exerciseLines.push(`${setsHeader}\n   (Scheduled: ${targetSetCount} sets · Rest ${ex.rest})`);
    }
  });

  const lines = [
    `🏋️ FORGE — WORKOUT LOG`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🏅 Sport: ${program.name}`,
    `⚡ Phase: ${phaseTitle}`,
    `📅 Session: ${day.name} (Week ${weekNumber})`,
    `📆 Date: ${dateStr}${athleteName ? ` | Athlete: ${athleteName}` : ''}`,
    `⏱️ Duration: ${duration} min | Session RPE: ${rpe}/10`,
    `📊 Total Volume: ${totalVolume.toLocaleString()} lb | Sets: ${totalCompletedSets}/${totalScheduledSets}`,
    ``,
    `📋 EXERCISES & SET DETAILS:`,
    exerciseLines.join('\n\n'),
    ``
  ];

  if (sessionLog.sessionNotes && sessionLog.sessionNotes.trim()) {
    lines.push(`📝 NOTES & READINESS:\n${sessionLog.sessionNotes.trim()}\n`);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`Synced from Forge · Built under pressure · Driven by science`);

  return lines.join('\n');
}

/**
 * Generates CSV string for a single workout session
 */
export function generateWorkoutCSV(ctx: WorkoutExportContext): string {
  const { program, day, phaseTitle, weekNumber, sessionLog } = ctx;
  const dateStr = sessionLog.date || new Date().toISOString().split('T')[0];

  const headers = ['Date', 'Sport', 'Phase', 'Week', 'Day', 'Exercise', 'Set', 'Load', 'Reps', 'Completed', 'TargetReps', 'Rest', 'SessionRPE', 'Notes'];
  const rows: string[][] = [];

  day.exercises.forEach((ex) => {
    const swapped = sessionLog.swappedExercises?.[ex.id];
    const exName = swapped?.name || ex.name;
    const entries = sessionLog.exerciseLogs[ex.id] || [];
    const targetSetCount = ctx.customSetCounts?.[ex.id] || 
      (ex.targetSetsReps.match(/^(\d+)\s*x/i) ? parseInt(ex.targetSetsReps.match(/^(\d+)\s*x/i)![1], 10) : 3);

    for (let s = 0; s < targetSetCount; s++) {
      const entry = entries[s];
      rows.push([
        dateStr,
        `"${program.name.replace(/"/g, '""')}"`,
        `"${phaseTitle.replace(/"/g, '""')}"`,
        String(weekNumber),
        `"${day.name.replace(/"/g, '""')}"`,
        `"${exName.replace(/"/g, '""')}"`,
        String(s + 1),
        `"${(entry?.load || '').replace(/"/g, '""')}"`,
        `"${(entry?.reps || '').replace(/"/g, '""')}"`,
        entry?.completed ? 'TRUE' : 'FALSE',
        `"${ex.targetSetsReps.replace(/"/g, '""')}"`,
        `"${ex.rest.replace(/"/g, '""')}"`,
        String(sessionLog.rpe || 7),
        `"${(sessionLog.sessionNotes || '').replace(/"/g, '""')}"`
      ]);
    }
  });

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

/**
 * Generates a full CSV of all logged sessions across all sports
 */
export function generateAllWorkoutsCSV(
  sessionLogs: Record<string, DaySessionLog>,
  allPrograms: Record<string, SportProgram>
): string {
  const headers = ['Date', 'SportKey', 'SportName', 'SessionKey', 'ExerciseId', 'ExerciseName', 'SetNumber', 'Load', 'Reps', 'Completed', 'SessionRPE', 'SessionDuration', 'Notes'];
  const rows: string[][] = [];

  Object.entries(sessionLogs).forEach(([sessionKey, log]) => {
    // Key format: `${sport}_p${phaseIndex}_d${dayNumber}_w${weekNumber}`
    const parts = sessionKey.split('_');
    const sportKey = parts[0] || 'unknown';
    const program = allPrograms[sportKey];
    const sportName = program?.name || sportKey;
    const dateStr = log.date || '';

    if (!log.exerciseLogs) return;

    Object.entries(log.exerciseLogs).forEach(([exId, entries]) => {
      // Find exercise name if possible from program
      let foundName = exId;
      if (log.swappedExercises?.[exId]) {
        foundName = log.swappedExercises[exId].name;
      } else if (program) {
        for (const phase of program.phases) {
          for (const d of phase.days) {
            const match = d.exercises.find(e => e.id === exId);
            if (match) {
              foundName = match.name;
              break;
            }
          }
        }
      }

      entries.forEach((setEntry) => {
        rows.push([
          dateStr,
          `"${sportKey}"`,
          `"${sportName.replace(/"/g, '""')}"`,
          `"${sessionKey}"`,
          `"${exId}"`,
          `"${foundName.replace(/"/g, '""')}"`,
          String(setEntry.setNumber || 1),
          `"${(setEntry.load || '').replace(/"/g, '""')}"`,
          `"${(setEntry.reps || '').replace(/"/g, '""')}"`,
          setEntry.completed ? 'TRUE' : 'FALSE',
          String(log.rpe || ''),
          String(log.durationMinutes || ''),
          `"${(log.sessionNotes || '').replace(/"/g, '""')}"`
        ]);
      });
    });
  });

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

/**
 * Downloads a string as a file in the browser
 */
export function downloadBlob(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Web Share API with clipboard fallback
 * Returns 'shared' if native share sheet opened, 'copied' if copied to clipboard, or throws error
 */
export async function shareOrCopyWorkout(text: string, title: string = 'Forge Workout'): Promise<'shared' | 'copied'> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text
      });
      return 'shared';
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User cancelled the share dialog
        return 'shared';
      }
      // Fallback to clipboard if share threw
    }
  }

  // Fallback to clipboard
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return 'copied';
  } else {
    // Ultra-legacy fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return 'copied';
  }
}

/**
 * Validates an uploaded JSON backup file
 */
export function validateBackupPayload(parsed: any): {
  valid: boolean;
  error?: string;
  stats?: {
    totalSessions: number;
    sports: string[];
    athleteName: string;
    exportedAt: string;
  };
} {
  if (!parsed || typeof parsed !== 'object') {
    return { valid: false, error: 'File content is not a valid JSON object.' };
  }

  if (!parsed.sessionLogs && !parsed.progressTracker && !parsed.assessments) {
    return { valid: false, error: 'Backup does not contain valid Forge training records.' };
  }

  const sessionLogs = parsed.sessionLogs || {};
  const totalSessions = Object.keys(sessionLogs).length;

  const sportsSet = new Set<string>();
  Object.keys(sessionLogs).forEach(key => {
    const s = key.split('_')[0];
    if (s) sportsSet.add(s);
  });

  return {
    valid: true,
    stats: {
      totalSessions,
      sports: Array.from(sportsSet),
      athleteName: parsed.athleteName || 'Athlete',
      exportedAt: parsed.exportedAt || 'Unknown Date'
    }
  };
}
