/**
 * Superset & Workout Step Transition State Engine
 * Handles seamless A1 -> A2 pairing transitions, group rest timing,
 * and automatic looping back to A1 after rest until all prescribed sets are complete.
 */

import { WorkoutExerciseItem, DaySessionLog } from '../types/sport';

export interface SupersetGroupInfo {
  groupId: string;            // e.g. "A", "B", "C"
  exerciseIds: string[];      // e.g. ["ex-1", "ex-2"]
  plannedRest: string;        // e.g. "90s"
  totalPrescribedSets: number;// e.g. 3
}

export interface ExerciseStepTarget {
  exerciseIndex: number;
  exercise: WorkoutExerciseItem;
  setIndex: number;
  setNumber: number;
  isSuperset: boolean;
  supersetLetter?: string;
  isLastInGroup: boolean;
  nextExercisePreview?: WorkoutExerciseItem;
}

/**
 * Extract clean superset letter prefix (e.g. "A1" -> "A", "B2" -> "B")
 */
export function getSupersetPrefix(group?: string): string | null {
  if (!group) return null;
  const match = group.trim().match(/^([A-Za-z])/);
  return match ? match[1].toUpperCase() : null;
}

/**
 * Parse set count from target string (e.g. "4 x 10" -> 4)
 */
export function parsePrescribedSets(targetStr: string): number {
  const match = targetStr.match(/(\d+)\s*[x×]/i);
  return match ? Math.min(Math.max(parseInt(match[1], 10), 1), 8) : 3;
}

/**
 * Find the next uncompleted exercise and set according to superset rules:
 * - In a superset (A1, A2):
 *   Completing Set N of A1 immediately directs to Set N of A2 (no rest).
 *   Completing Set N of A2 starts the group rest timer, then loops back to Set N+1 of A1.
 */
export function getNextWorkoutTarget(
  exercises: WorkoutExerciseItem[],
  sessionLog: DaySessionLog,
  currentExId?: string,
  currentSetIdx?: number
): ExerciseStepTarget | null {
  if (!exercises || exercises.length === 0) return null;

  // Build map of groups
  const groupMap = new Map<string, WorkoutExerciseItem[]>();
  exercises.forEach(ex => {
    const prefix = getSupersetPrefix(ex.supersetGroup);
    if (prefix) {
      if (!groupMap.has(prefix)) groupMap.set(prefix, []);
      groupMap.get(prefix)!.push(ex);
    }
  });

  // If currently on an exercise, determine where to go next based on superset loop
  if (currentExId !== undefined && currentSetIdx !== undefined) {
    const currentEx = exercises.find(e => e.id === currentExId);
    const currentPrefix = getSupersetPrefix(currentEx?.supersetGroup);

    if (currentPrefix && groupMap.has(currentPrefix)) {
      const groupExercises = groupMap.get(currentPrefix)!;
      const posInGroup = groupExercises.findIndex(e => e.id === currentExId);

      // If there is another partner in this superset group for the SAME set round (e.g. A1 -> A2)
      if (posInGroup !== -1 && posInGroup < groupExercises.length - 1) {
        const nextPartner = groupExercises[posInGroup + 1];
        const nextPartnerEntries = sessionLog.exerciseLogs[nextPartner.id] || [];
        const isNextPartnerDone = nextPartnerEntries[currentSetIdx]?.completed;

        if (!isNextPartnerDone) {
          const nextExIdx = exercises.findIndex(e => e.id === nextPartner.id);
          const previewNext = getNextExercisePreview(exercises, nextExIdx);
          return {
            exerciseIndex: nextExIdx,
            exercise: nextPartner,
            setIndex: currentSetIdx,
            setNumber: currentSetIdx + 1,
            isSuperset: true,
            supersetLetter: currentPrefix,
            isLastInGroup: posInGroup + 1 === groupExercises.length - 1,
            nextExercisePreview: previewNext
          };
        }
      }

      // If we are at the end of the group (e.g. A2 just completed):
      // Loop back to the first exercise (A1) for the next set (currentSetIdx + 1)
      const firstPartner = groupExercises[0];
      const maxSets = parsePrescribedSets(firstPartner.targetSetsReps);
      const nextRoundSetIdx = currentSetIdx + 1;

      if (nextRoundSetIdx < maxSets) {
        const nextExIdx = exercises.findIndex(e => e.id === firstPartner.id);
        const previewNext = groupExercises.length > 1 ? groupExercises[1] : getNextExercisePreview(exercises, nextExIdx);
        return {
          exerciseIndex: nextExIdx,
          exercise: firstPartner,
          setIndex: nextRoundSetIdx,
          setNumber: nextRoundSetIdx + 1,
          isSuperset: true,
          supersetLetter: currentPrefix,
          isLastInGroup: false,
          nextExercisePreview: previewNext
        };
      }
    }
  }

  // Otherwise, find first uncompleted set in routine order
  for (let eIdx = 0; eIdx < exercises.length; eIdx++) {
    const ex = exercises[eIdx];
    const setsCount = parsePrescribedSets(ex.targetSetsReps);
    const entries = sessionLog.exerciseLogs[ex.id] || [];
    const prefix = getSupersetPrefix(ex.supersetGroup);

    for (let s = 0; s < setsCount; s++) {
      if (!entries[s]?.completed) {
        const previewNext = getNextExercisePreview(exercises, eIdx);
        return {
          exerciseIndex: eIdx,
          exercise: ex,
          setIndex: s,
          setNumber: s + 1,
          isSuperset: Boolean(prefix),
          supersetLetter: prefix || undefined,
          isLastInGroup: false,
          nextExercisePreview: previewNext
        };
      }
    }
  }

  // All sets completed
  return null;
}

/**
 * Get next exercise preview in line
 */
function getNextExercisePreview(exercises: WorkoutExerciseItem[], currentIndex: number): WorkoutExerciseItem | undefined {
  if (currentIndex + 1 < exercises.length) {
    return exercises[currentIndex + 1];
  }
  return undefined;
}
