import { SportId, TrainingFrequency, TrainingPhaseOrBlock, WorkoutDay, WorkoutExerciseItem } from '../types/sport';

export const FREQUENCY_CONFIGS: Record<TrainingFrequency, {
  daysPerWeek: number;
  label: string;
  badge: string;
  tagline: string;
  description: string;
  sessionDurationEstimate: string;
}> = {
  3: {
    daysPerWeek: 3,
    label: '3 Days / Wk',
    badge: 'Full-Body Hybrid',
    tagline: 'High-yield compound rotations with 4 recovery days',
    description: 'Every session hits all primary human movement patterns. Ideal for busy professionals, in-season athletes, and lifters prioritizing recovery.',
    sessionDurationEstimate: '~52 Min'
  },
  4: {
    daysPerWeek: 4,
    label: '4 Days / Wk',
    badge: 'Upper / Lower (Standard)',
    tagline: 'The sports-science golden standard for power & recovery',
    description: 'The baseline periodized split balancing hypertrophy, strength, and energy system conditioning across 4 progressive days.',
    sessionDurationEstimate: '~50 Min'
  },
  5: {
    daysPerWeek: 5,
    label: '5 Days / Wk',
    badge: 'Dedicated Armor Split',
    tagline: 'Shorter, hyper-focused daily sessions with dedicated carry/engine days',
    description: 'Distributes volume into shorter ~40-min workouts with dedicated days for joint armor, scapular health, and loaded carries.',
    sessionDurationEstimate: '~40 Min'
  }
};

/**
 * Returns the adaptive workout days for a training phase based on the athlete's selected frequency (3, 4, or 5 days).
 */
export function getAdaptiveDaysForPhase(
  phase: TrainingPhaseOrBlock,
  frequency: TrainingFrequency,
  sportId: SportId
): WorkoutDay[] {
  // If frequency is 4, return standard program days directly
  if (frequency === 4 || !phase.days || phase.days.length === 0) {
    return phase.days;
  }

  const d1 = phase.days[0] || phase.days[0];
  const d2 = phase.days[1] || phase.days[0];
  const d3 = phase.days[2] || phase.days[0];
  const d4 = phase.days[3] || phase.days[phase.days.length - 1];

  // ==========================================
  // 3-DAY ADAPTIVE SPLIT (Full-Body / High-Yield)
  // ==========================================
  if (frequency === 3) {
    // Dedicated Evidence-Based 3-Day Rotation Matrix for Everyday Athlete
    if (sportId === 'functional') {
      return getFunctional3DaySplit(phase);
    }

    // Generic 3-day split for other sports
    // Day 1: Squat + Horizontal Push & Pull + Anterior Core
    const day1Exercises: WorkoutExerciseItem[] = [
      ...(d1.exercises.slice(0, 2)), // Primary Squat + Hinge/Accessory
      ...(d2.exercises.filter(e => e.supersetGroup?.includes('B') || e.supersetGroup?.includes('C')).slice(0, 2)), // Horizontal Push / Pull
      ...(d1.exercises.filter(e => e.supersetGroup?.includes('C') || e.supersetGroup?.includes('D')).slice(0, 2)) // Core / Armor
    ];

    const day1: WorkoutDay = {
      dayNumber: 1,
      name: `Day 1 - Total-Body (Squat & Horizontal Push/Pull)`,
      focus: `Bilateral Squat / Chest & Back / Core Stiffness`,
      type: `Full-Body Strength`,
      timeBudgetMinutes: 52,
      typicalPlacement: 'Monday',
      warmUpProtocol: d1.warmUpProtocol || '8 min: Dynamic full-body mobility flow + warm-up sets.',
      coolDownProtocol: d1.coolDownProtocol || '5 min: Hip flexor couch stretch, lat stretch, belly breathing.',
      coachingNotes: `3-Day Frequency: High-yield compound density. Hit all working sets with 2 reps in reserve (RPE 7-8).`,
      emergency30MinProtocol: d1.emergency30MinProtocol,
      timeCrunchHierarchy: d1.timeCrunchHierarchy,
      exercises: deduplicateExercises(day1Exercises, 6)
    };

    // Day 2: Hinge + Vertical Push & Pull + Scapular Armor
    const day2Exercises: WorkoutExerciseItem[] = [
      ...(d2.exercises.slice(0, 2)), // Primary Hinge (Trap Bar/Deadlift) + Pull-up/Pulldown
      ...(d2.exercises.filter(e => e.supersetGroup?.includes('B') || e.supersetGroup?.includes('C')).slice(0, 2)), // Overhead Press / Row
      ...(d2.exercises.filter(e => e.supersetGroup?.includes('D') || e.supersetGroup?.includes('C2')).slice(0, 2)) // Face-pulls / McGill core
    ];

    const day2: WorkoutDay = {
      dayNumber: 2,
      name: `Day 2 - Total-Body (Hinge & Vertical Pull/Press)`,
      focus: `Deadlift / Upper Posture / Scapular Durability`,
      type: `Posterior Chain & Structural Armor`,
      timeBudgetMinutes: 52,
      typicalPlacement: 'Wednesday',
      warmUpProtocol: d2.warmUpProtocol || '8 min: Band dislocates, band pull-aparts, hip openers.',
      coolDownProtocol: d2.coolDownProtocol || '6 min: Bar hang decompression, doorframe chest stretch.',
      coachingNotes: `3-Day Frequency: Lock in posterior chain hinge mechanics and tall spine posture.`,
      emergency30MinProtocol: d2.emergency30MinProtocol,
      timeCrunchHierarchy: d2.timeCrunchHierarchy,
      exercises: deduplicateExercises(day2Exercises, 6)
    };

    // Day 3: Unilateral Stability + Loaded Carries & Athletic Engine
    const day3Exercises: WorkoutExerciseItem[] = [
      ...(d3.exercises.slice(0, 2)), // Single-leg split squat / lunge + DB press
      ...(d4.exercises.filter(e => e.supersetGroup?.includes('A') || e.supersetGroup?.includes('B')).slice(0, 2)), // KB swings / Carries
      ...(d3.exercises.filter(e => e.supersetGroup?.includes('C')).slice(0, 1)), // Knee / Calf prehab
      ...(d4.exercises.filter(e => e.isOptionalFinisher || e.supersetGroup?.includes('D')).slice(0, 1)) // Metcon / Engine
    ];

    const day3: WorkoutDay = {
      dayNumber: 3,
      name: `Day 3 - Unilateral Power, Carries & Longevity Engine`,
      focus: `Single-Leg Drive / Farmer's Carries / Aerobic Capacity`,
      type: `Unilateral Durability & Work Capacity`,
      timeBudgetMinutes: 54,
      typicalPlacement: 'Friday',
      warmUpProtocol: d3.warmUpProtocol || '8 min: Ankle rocks, backward sled/walking, glute bridges.',
      coolDownProtocol: d4.coolDownProtocol || '8 min: Deep squat hold, slow nose breathing.',
      coachingNotes: `3-Day Frequency: Finish the week with bulletproof single-leg balance and loaded carry stamina.`,
      emergency30MinProtocol: d3.emergency30MinProtocol,
      timeCrunchHierarchy: d3.timeCrunchHierarchy,
      exercises: deduplicateExercises(day3Exercises, 6)
    };

    return [day1, day2, day3];
  }

  // ==========================================
  // 5-DAY ADAPTIVE SPLIT (Focused ~40-Min Sessions)
  // ==========================================
  if (frequency === 5) {
    // Day 1: Lower Squat & Knee Armor (~40 min)
    const day1Exercises: WorkoutExerciseItem[] = [
      ...(d1.exercises.filter(e => isSquatOrLeg(e)).slice(0, 3)),
      ...(d3.exercises.filter(e => e.name.toLowerCase().includes('tibialis') || e.name.toLowerCase().includes('calf') || e.name.toLowerCase().includes('pogo')).slice(0, 1)),
      ...(d1.exercises.filter(e => isCore(e)).slice(0, 1))
    ];

    const day1: WorkoutDay = {
      dayNumber: 1,
      name: `Day 1 - Lower Squat & Knee Armor`,
      focus: `Bilateral Squat / Quad Hypertrophy / Patellar Resilience`,
      type: `Lower Strength (~40m)`,
      timeBudgetMinutes: 40,
      typicalPlacement: 'Monday',
      warmUpProtocol: d1.warmUpProtocol,
      coolDownProtocol: d1.coolDownProtocol,
      coachingNotes: `5-Day Split: Focused lower session. Drive through whole foot and control the 3-second descent.`,
      exercises: deduplicateExercises(day1Exercises, 5)
    };

    // Day 2: Upper Push & Scapular Posture (~40 min)
    const day2Exercises: WorkoutExerciseItem[] = [
      ...(d1.exercises.filter(e => isPush(e))),
      ...(d3.exercises.filter(e => isPush(e))),
      ...(d2.exercises.filter(e => e.name.toLowerCase().includes('press')).slice(0, 1))
    ];

    const day2: WorkoutDay = {
      dayNumber: 2,
      name: `Day 2 - Upper Push & Scapular Armor`,
      focus: `Horizontal & Incline Press / Serratus Posture / Triceps`,
      type: `Upper Push (~40m)`,
      timeBudgetMinutes: 40,
      typicalPlacement: 'Tuesday',
      warmUpProtocol: '6 min: Band dislocates, arm circles, push-up plus.',
      coolDownProtocol: '5 min: Doorway chest stretch, triceps stretch.',
      coachingNotes: `5-Day Split: Strict upper push volume without shoulder anterior impingement.`,
      exercises: deduplicateExercises(day2Exercises, 5)
    };

    // Day 3: Posterior Chain, Hinge & Hamstring Resilience (~40 min)
    const day3Exercises: WorkoutExerciseItem[] = [
      ...(d2.exercises.filter(e => isHinge(e))),
      ...(d1.exercises.filter(e => isHinge(e))),
      ...(d3.exercises.filter(e => isHinge(e) || e.name.toLowerCase().includes('rdl'))),
      ...(d2.exercises.filter(e => isCore(e)).slice(0, 1))
    ];

    const day3: WorkoutDay = {
      dayNumber: 3,
      name: `Day 3 - Posterior Chain & Hinge Armor`,
      focus: `Trap Bar / Deadlift / RDL / Hamstring Resilience`,
      type: `Posterior Strength (~40m)`,
      timeBudgetMinutes: 40,
      typicalPlacement: 'Wednesday',
      warmUpProtocol: d2.warmUpProtocol,
      coolDownProtocol: '6 min: Hamstring elevated stretch, child\'s pose.',
      coachingNotes: `5-Day Split: Heavy slow hinge loading. Keep lats locked in back pockets.`,
      exercises: deduplicateExercises(day3Exercises, 5)
    };

    // Day 4: Upper Pull & Rotator Cuff Durability (~40 min)
    const day4Exercises: WorkoutExerciseItem[] = [
      ...(d2.exercises.filter(e => isPull(e))),
      ...(d1.exercises.filter(e => isPull(e))),
      ...(d4.exercises.filter(e => isPull(e))),
      ...(d2.exercises.filter(e => e.name.toLowerCase().includes('face pull') || e.name.toLowerCase().includes('armor'))).slice(0, 1)
    ];

    const day4: WorkoutDay = {
      dayNumber: 4,
      name: `Day 4 - Upper Pull & Scapular Armor`,
      focus: `Pull-Ups / Cable Rows / Face Pulls / Upper Posture`,
      type: `Upper Pull (~40m)`,
      timeBudgetMinutes: 40,
      typicalPlacement: 'Thursday',
      warmUpProtocol: '6 min: Band pull-aparts, cat-cow, scapular pull-ups.',
      coolDownProtocol: '6 min: Passive bar hang, doorway lat stretch.',
      coachingNotes: `5-Day Split: Build the upper back shelf to eliminate desk posture slouching.`,
      exercises: deduplicateExercises(day4Exercises, 5)
    };

    // Day 5: Unilateral Power, Loaded Carries & Longevity Engine (~42 min)
    const day5Exercises: WorkoutExerciseItem[] = [
      ...(d3.exercises.filter(e => e.name.toLowerCase().includes('lunge') || e.name.toLowerCase().includes('split squat'))).slice(0, 1),
      ...(d4.exercises.filter(e => e.name.toLowerCase().includes('carry') || e.name.toLowerCase().includes('farmer') || e.name.toLowerCase().includes('suitcase'))),
      ...(d4.exercises.filter(e => e.name.toLowerCase().includes('swing') || e.name.toLowerCase().includes('sled'))).slice(0, 2),
      ...(d4.exercises.filter(e => e.isOptionalFinisher || e.name.toLowerCase().includes('interval') || e.name.toLowerCase().includes('cardio'))).slice(0, 1)
    ];

    const day5: WorkoutDay = {
      dayNumber: 5,
      name: `Day 5 - Loaded Carries & Longevity Engine`,
      focus: `Heavy Carries / Kettlebell Swings / Sled / Aerobic Flush`,
      type: `Hybrid Engine & Grip (~42m)`,
      timeBudgetMinutes: 42,
      typicalPlacement: 'Friday / Saturday',
      warmUpProtocol: '6 min: Hip openers, air squats, inchworms.',
      coolDownProtocol: '8 min: Deep resting squat hold (2 min), diaphragmatic breathing.',
      coachingNotes: `5-Day Split: Functional durability, grip strength, and cardiovascular heart rate recovery.`,
      exercises: deduplicateExercises(day5Exercises, 5)
    };

    return [day1, day2, day3, day4, day5];
  }

  return phase.days;
}

// Helpers for classifying exercises
function isSquatOrLeg(ex: WorkoutExerciseItem): boolean {
  const n = ex.name.toLowerCase();
  return n.includes('squat') || n.includes('lunge') || n.includes('step') || n.includes('leg');
}

function isHinge(ex: WorkoutExerciseItem): boolean {
  const n = ex.name.toLowerCase();
  return n.includes('deadlift') || n.includes('rdl') || n.includes('hinge') || n.includes('nordic') || n.includes('hamstring');
}

function isPush(ex: WorkoutExerciseItem): boolean {
  const n = ex.name.toLowerCase();
  return n.includes('press') || n.includes('push') || n.includes('dip');
}

function isPull(ex: WorkoutExerciseItem): boolean {
  const n = ex.name.toLowerCase();
  return n.includes('row') || n.includes('pull') || n.includes('chin') || n.includes('curl');
}

function isCore(ex: WorkoutExerciseItem): boolean {
  const n = ex.name.toLowerCase();
  return n.includes('rollout') || n.includes('plank') || n.includes('pallof') || n.includes('raise') || n.includes('core') || n.includes('mcgill');
}

function deduplicateExercises(list: WorkoutExerciseItem[], maxCount: number): WorkoutExerciseItem[] {
  const seenIds = new Set<string>();
  const results: WorkoutExerciseItem[] = [];

  for (const ex of list) {
    if (!seenIds.has(ex.id)) {
      seenIds.add(ex.id);
      results.push(ex);
    }
    if (results.length >= maxCount) break;
  }

  // Ensure groups A, B1, B2, C1, C2, D are assigned cleanly
  const groups = ['A', 'B1', 'B2', 'C1', 'C2', 'D'];
  return results.map((ex, i) => ({
    ...ex,
    supersetGroup: ex.supersetGroup || groups[i] || 'D'
  }));
}

/**
 * Dedicated 3-Day Full-Body Rotation Matrix for the Everyday Athlete.
 * Ensures zero repetitive exercises within each week, rotating through
 * all 7 human movement patterns with multi-equipment variation (barbell, DB, KB, cable, sled).
 */
function getFunctional3DaySplit(phase: TrainingPhaseOrBlock): WorkoutDay[] {
  const blockId = phase.id || '';

  // -------------------------------------------------------------
  // BLOCK 2 (Weeks 3-4): Absolute Strength & Postural Density
  // -------------------------------------------------------------
  if (blockId.includes('block-2')) {
    const day1: WorkoutDay = {
      dayNumber: 1,
      name: 'Day 1 - Bilateral Squat & Floor Press Power',
      focus: 'Box Squat / Floor Press / Inverted Row / Hamstring Sliders',
      type: 'Full-Body Strength Overload',
      timeBudgetMinutes: 52,
      typicalPlacement: 'Monday',
      warmUpProtocol: '8 min: Hip mobility flow, ankle pogo rocks, 3 progressive warm-up sets building to working load.',
      coolDownProtocol: '5 min: Hip flexor couch stretch, elevated calf stretch.',
      coachingNotes: 'Step up in load on squat. Maintain 360-degree core bracing on descent.',
      exercises: [
        { id: 'fn-b2-3d-d1-1', exerciseId: 'barbell-back-squat', name: 'Barbell Box Squat (or Heavy Goblet Squat)', targetSetsReps: '4 x 6-8', rest: '120s', progressionCue: '+5-10 lb Wk4', supersetGroup: 'A' },
        { id: 'fn-b2-3d-d1-2', exerciseId: 'dumbbell-bench-press', name: 'Neutral-Grip Dumbbell Floor Press', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+2.5 lb/hand Wk4', supersetGroup: 'B1' },
        { id: 'fn-b2-3d-d1-3', exerciseId: 'barbell-bent-over-row', name: 'Inverted Barbell Bodyweight Row', targetSetsReps: '3 x 10-12', rest: '75s', progressionCue: '+1 rep Wk4', supersetGroup: 'B2' },
        { id: 'fn-b2-3d-d1-4', exerciseId: 'romanian-deadlift', name: 'Hamstring Sliders (Eccentric Leg Curl)', targetSetsReps: '3 x 10', rest: '60s', progressionCue: '+2s eccentric Wk4', supersetGroup: 'C1' },
        { id: 'fn-b2-3d-d1-5', exerciseId: 'hanging-leg-raise', name: 'Hanging Knee / Leg Raise', targetSetsReps: '3 x 10-12', rest: '60s', progressionCue: '+1 rep Wk4', supersetGroup: 'C2' },
        { id: 'fn-b2-3d-d1-6', exerciseId: 'farmers-carry', name: 'Heavy Hex-Bar / DB Farmer\'s Walk', targetSetsReps: '3 x 40m', rest: '90s', progressionCue: '+10 lb total Wk4', supersetGroup: 'D', isOptionalFinisher: true }
      ]
    };

    const day2: WorkoutDay = {
      dayNumber: 2,
      name: 'Day 2 - Heavy Trap Bar Hinge & Standing Press',
      focus: 'Deadlift / Strict Pull-Up / DB Overhead Press / Face Pull',
      type: 'Posterior & Vertical Structural Armor',
      timeBudgetMinutes: 52,
      typicalPlacement: 'Wednesday',
      warmUpProtocol: '8 min: Thoracic foam rolling, band dislocates, scapular pull-ups, 2 warm-up hinge sets.',
      coolDownProtocol: '6 min: Passive bar hang, doorway lat stretch.',
      coachingNotes: 'Push floor away on Trap Bar Deadlift. Lock lats into back pockets.',
      exercises: [
        { id: 'fn-b2-3d-d2-1', exerciseId: 'trap-bar-deadlift', name: 'Heavy Trap Bar Deadlift (Low or High Handles)', targetSetsReps: '4 x 5-6', rest: '120s', progressionCue: '+10 lb Wk4', supersetGroup: 'A' },
        { id: 'fn-b2-3d-d2-2', exerciseId: 'lat-pulldown', name: 'Weighted or Strict Pull-Up', targetSetsReps: '4 x 6-8', rest: '90s', progressionCue: '+1 rep or +2.5 lb Wk4', supersetGroup: 'B1' },
        { id: 'fn-b2-3d-d2-3', exerciseId: 'standing-overhead-press', name: 'Standing Dumbbell Overhead Press', targetSetsReps: '3 x 8-10', rest: '90s', progressionCue: '+2.5 lb/hand Wk4', supersetGroup: 'B2' },
        { id: 'fn-b2-3d-d2-4', exerciseId: 'face-pull', name: 'Face Pull with 2s Peak Squeeze', targetSetsReps: '3 x 15', rest: '60s', progressionCue: '+1 plate Wk4', supersetGroup: 'C1' },
        { id: 'fn-b2-3d-d2-5', exerciseId: 'farmers-carry', name: 'Suitcase Deadlift & Hold', targetSetsReps: '3 x 8 /side (5s hold)', rest: '60s', progressionCue: '+5 lb Wk4', supersetGroup: 'C2' },
        { id: 'fn-b2-3d-d2-6', exerciseId: 'turkish-get-up', name: 'Dr. Stuart McGill Curl-Up & Side Plank', targetSetsReps: '3 rounds x 30s holds', rest: '45s', progressionCue: 'Stricter spine stiffness', supersetGroup: 'D' }
      ]
    };

    const day3: WorkoutDay = {
      dayNumber: 3,
      name: 'Day 3 - Unilateral Power, Rotation & Sled Leg Drive',
      focus: 'Walking Lunge / Single-Leg RDL / Pallof / Poliquin / Sled Push',
      type: 'Unilateral Functional Power & Engine',
      timeBudgetMinutes: 52,
      typicalPlacement: 'Friday',
      warmUpProtocol: '8 min: Lateral band walks, single-leg RDL reach bodyweight, arm swings.',
      coolDownProtocol: '5 min: Pigeon pose, glute stretch, foam roll IT band and quads.',
      coachingNotes: 'Single-leg RDLs build ankle proprioception and protect the hamstring tendon.',
      exercises: [
        { id: 'fn-b2-3d-d3-1', exerciseId: 'split-squat-isometric', name: 'Walking Dumbbell Lunge (Controlled Pace)', targetSetsReps: '3 x 10-12 /leg', rest: '75s', progressionCue: '+5 lb/hand Wk4', supersetGroup: 'A' },
        { id: 'fn-b2-3d-d3-2', exerciseId: 'single-leg-rdl', name: 'Single-Leg Dumbbell Romanian Deadlift', targetSetsReps: '3 x 8-10 /leg', rest: '75s', progressionCue: '+5 lb Wk4', supersetGroup: 'B1' },
        { id: 'fn-b2-3d-d3-3', exerciseId: 'pallof-press', name: 'Half-Kneeling Cable Pallof Press', targetSetsReps: '3 x 12 /side', rest: '45s', progressionCue: '+2.5 lb Wk4', supersetGroup: 'B2' },
        { id: 'fn-b2-3d-d3-4', exerciseId: 'box-jump', name: 'Low Step-Down / Poliquin Step-Up (Knee Health)', targetSetsReps: '3 x 12 /leg', rest: '60s', progressionCue: '+1 in height Wk4', supersetGroup: 'C1' },
        { id: 'fn-b2-3d-d3-5', exerciseId: 'face-pull', name: 'Prone Incline Y-T-W Postural Raises', targetSetsReps: '3 x 12', rest: '60s', progressionCue: '+1 lb Wk4', supersetGroup: 'C2' },
        { id: 'fn-b2-3d-d3-6', exerciseId: 'sled-push-prowler', name: 'Forward Sled Push (Heavy Leg Drive)', targetSetsReps: '4 x 20m', rest: '60s', progressionCue: '+15 lb on sled Wk4', supersetGroup: 'D', isOptionalFinisher: true }
      ]
    };

    return [day1, day2, day3];
  }

  // -------------------------------------------------------------
  // BLOCK 3 (Weeks 5-6): Power-Endurance & Work Capacity
  // -------------------------------------------------------------
  if (blockId.includes('block-3')) {
    const day1: WorkoutDay = {
      dayNumber: 1,
      name: 'Day 1 - Front Squat & Antagonist Chest/Row Density',
      focus: 'Front Squat / DB Bench / T-Bar Row / Nordic Hamstrings',
      type: 'Power & Density',
      timeBudgetMinutes: 52,
      typicalPlacement: 'Monday',
      warmUpProtocol: '8 min: Jump rope, bodyweight squats, deep squat pry, 2 barbell ramp-up sets.',
      coolDownProtocol: '5 min: Butterfly groin stretch, couch stretch.',
      coachingNotes: 'Explode up on concentric squat, control descent smoothly.',
      exercises: [
        { id: 'fn-b3-3d-d1-1', exerciseId: 'front-squat', name: 'Front Squat (or Double KB Front Squat)', targetSetsReps: '4 x 6', rest: '90s', progressionCue: '+5 lb Wk6', supersetGroup: 'A' },
        { id: 'fn-b3-3d-d1-2', exerciseId: 'barbell-bench-press', name: 'Flat Barbell or Heavy Dumbbell Bench Press', targetSetsReps: '3 x 6-8', rest: '75s', progressionCue: '+5 lb Wk6', supersetGroup: 'B1' },
        { id: 'fn-b3-3d-d1-3', exerciseId: 'barbell-bent-over-row', name: 'Chest-Supported T-Bar Row (or DB Row)', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+5 lb Wk6', supersetGroup: 'B2' },
        { id: 'fn-b3-3d-d1-4', exerciseId: 'romanian-deadlift', name: 'Nordic Hamstring Lowering (Eccentric Control)', targetSetsReps: '3 x 6-8', rest: '60s', progressionCue: '+2s lower Wk6', supersetGroup: 'C1' },
        { id: 'fn-b3-3d-d1-5', exerciseId: 'ab-wheel-rollout', name: 'Ab Wheel Rollout with 2s Pause', targetSetsReps: '3 x 10', rest: '60s', progressionCue: '+2 reps Wk6', supersetGroup: 'C2' },
        { id: 'fn-b3-3d-d1-6', exerciseId: 'farmers-carry', name: 'Heavy Trap Bar Farmer\'s Walk', targetSetsReps: '3 x 45m', rest: '60s', progressionCue: '+10 lb Wk6', supersetGroup: 'D', isOptionalFinisher: true }
      ]
    };

    const day2: WorkoutDay = {
      dayNumber: 2,
      name: 'Day 2 - Paused RDL Hinge & Vertical Pull/Press',
      focus: 'Barbell RDL / Chin-Up / 1-Arm KB Press / McGill Core',
      type: 'Posterior Power & Overhead Stability',
      timeBudgetMinutes: 52,
      typicalPlacement: 'Wednesday',
      warmUpProtocol: '8 min: Band dislocates, glute activation, scapular pull-ups.',
      coolDownProtocol: '6 min: Dead hang decompression, foam roll glutes.',
      coachingNotes: 'Feel maximum hamstring stretch at the bottom of the paused RDL.',
      exercises: [
        { id: 'fn-b3-3d-d2-1', exerciseId: 'romanian-deadlift', name: 'Barbell Romanian Deadlift (2s Pause at Knee)', targetSetsReps: '4 x 6-8', rest: '90s', progressionCue: '+5 lb Wk6', supersetGroup: 'A' },
        { id: 'fn-b3-3d-d2-2', exerciseId: 'lat-pulldown', name: 'Neutral Grip Chin-Up (or Lat Pulldown)', targetSetsReps: '3 x 8', rest: '75s', progressionCue: '+1 rep Wk6', supersetGroup: 'B1' },
        { id: 'fn-b3-3d-d2-3', exerciseId: 'standing-overhead-press', name: 'Standing One-Arm Kettlebell Press', targetSetsReps: '3 x 8 /side', rest: '75s', progressionCue: '+2.5 lb Wk6', supersetGroup: 'B2' },
        { id: 'fn-b3-3d-d2-4', exerciseId: 'face-pull', name: 'Cable Face Pull with High Pull', targetSetsReps: '3 x 12-15', rest: '60s', progressionCue: '+2 reps Wk6', supersetGroup: 'C1' },
        { id: 'fn-b3-3d-d2-5', exerciseId: 'farmers-carry', name: 'Single-Arm Suitcase Carry', targetSetsReps: '3 x 35m /side', rest: '60s', progressionCue: '+5 lb Wk6', supersetGroup: 'C2' },
        { id: 'fn-b3-3d-d2-6', exerciseId: 'turkish-get-up', name: 'Dr. Stuart McGill Big 3 Protocol', targetSetsReps: '3 rounds x 30s holds', rest: '45s', progressionCue: 'Stricter spine stiffness', supersetGroup: 'D' }
      ]
    };

    const day3: WorkoutDay = {
      dayNumber: 3,
      name: 'Day 3 - Deficit Lunges, Landmine Rotations & Erg Engine',
      focus: 'Deficit Lunge / Landmine RDL / Landmine Rotation / Intervals',
      type: 'Unilateral Endurance & Metabolic Engine',
      timeBudgetMinutes: 54,
      typicalPlacement: 'Friday',
      warmUpProtocol: '8 min: Ankle rocks, backward walking, spider-man lunges.',
      coolDownProtocol: '6 min: Deep pigeon stretch, slow diaphragmatic breathing.',
      coachingNotes: 'Deficit lunges build deep hip flexion mobility and glute drive.',
      exercises: [
        { id: 'fn-b3-3d-d3-1', exerciseId: 'split-squat-isometric', name: 'Deficit Reverse Lunge with Dumbbells', targetSetsReps: '3 x 8-10 /leg', rest: '75s', progressionCue: '+5 lb/hand Wk6', supersetGroup: 'A' },
        { id: 'fn-b3-3d-d3-2', exerciseId: 'single-leg-rdl', name: 'Single-Leg Landmine RDL', targetSetsReps: '3 x 8 /leg', rest: '75s', progressionCue: '+5 lb Wk6', supersetGroup: 'B1' },
        { id: 'fn-b3-3d-d3-3', exerciseId: 'pallof-press', name: 'Standing Landmine Rotations (Core Power)', targetSetsReps: '3 x 10 /side', rest: '60s', progressionCue: '+2.5 lb Wk6', supersetGroup: 'B2' },
        { id: 'fn-b3-3d-d3-4', exerciseId: 'pogo-hops', name: 'Poliquin Step-Ups & Tibialis Raises', targetSetsReps: '3 x 15 /side', rest: '60s', progressionCue: '+2 reps Wk6', supersetGroup: 'C1' },
        { id: 'fn-b3-3d-d3-5', exerciseId: 'face-pull', name: 'Prone Incline Y-T-W Postural Raises', targetSetsReps: '3 x 12', rest: '60s', progressionCue: '+1 lb Wk6', supersetGroup: 'C2' },
        { id: 'fn-b3-3d-d3-6', exerciseId: 'mas-shuttle-intervals', name: 'Concept2 Rower or Air Bike Intervals (30s on / 30s off)', targetSetsReps: '8 rounds (8 min total)', rest: '30s', progressionCue: '+50m total distance Wk6', supersetGroup: 'D', isOptionalFinisher: true }
      ]
    };

    return [day1, day2, day3];
  }

  // -------------------------------------------------------------
  // BLOCK 4 (Weeks 7-8): Peak Functional Performance & Testing
  // -------------------------------------------------------------
  if (blockId.includes('block-4')) {
    const day1: WorkoutDay = {
      dayNumber: 1,
      name: 'Day 1 - Peak Bilateral Squat & Push/Pull Benchmark',
      focus: 'Squat 5RM / Weighted Push-Up / Seal Row / Dragon Flag',
      type: 'Peak Strength & Capacity Testing',
      timeBudgetMinutes: 52,
      typicalPlacement: 'Monday',
      warmUpProtocol: '8 min: Hip openers, dynamic squat prep, 3 ramp-up squat sets.',
      coolDownProtocol: '6 min: Couch stretch, lat stretch, belly breathing.',
      coachingNotes: 'Perform testing with pristine form. Stop sets at technical failure (1-2 RIR).',
      exercises: [
        { id: 'fn-b4-3d-d1-1', exerciseId: 'barbell-back-squat', name: 'Barbell Back Squat (or Front Squat) Peak', targetSetsReps: '4 x 5', rest: '120s', progressionCue: 'Peak 5RM test', supersetGroup: 'A' },
        { id: 'fn-b4-3d-d1-2', exerciseId: 'push-up-plus', name: 'Weighted Push-Up (or Incline DB Bench)', targetSetsReps: '3 x 6-8', rest: '90s', progressionCue: '+5 lb Wk8', supersetGroup: 'B1' },
        { id: 'fn-b4-3d-d1-3', exerciseId: 'chest-supported-row', name: 'Seal Row or Chest-Supported DB Row', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+5 lb Wk8', supersetGroup: 'B2' },
        { id: 'fn-b4-3d-d1-4', exerciseId: 'romanian-deadlift', name: 'Glute-Ham Raise (or Hamstring Sliders)', targetSetsReps: '3 x 8-10', rest: '60s', progressionCue: '+2 reps Wk8', supersetGroup: 'C1' },
        { id: 'fn-b4-3d-d1-5', exerciseId: 'hanging-leg-raise', name: 'Dragon Flag Progression (or Hanging Leg Raise)', targetSetsReps: '3 x 8-10', rest: '60s', progressionCue: '+1 rep Wk8', supersetGroup: 'C2' },
        { id: 'fn-b4-3d-d1-6', exerciseId: 'farmers-carry', name: 'Maximum Farmer\'s Walk Capacity', targetSetsReps: '3 x 50m', rest: '90s', progressionCue: 'Max distance record', supersetGroup: 'D', isOptionalFinisher: true }
      ]
    };

    const day2: WorkoutDay = {
      dayNumber: 2,
      name: 'Day 2 - Peak Trap Bar Deadlift & Strict Pull-Up Benchmark',
      focus: 'Deadlift 5RM / Pull-Up Max / Overhead Press / Offset Carry',
      type: 'Posterior & Pull Strength Benchmark',
      timeBudgetMinutes: 52,
      typicalPlacement: 'Wednesday',
      warmUpProtocol: '8 min: Band dislocates, scapular pulls, 3 ramp-up hinge sets.',
      coolDownProtocol: '6 min: Decompression bar hang, foam rolling.',
      coachingNotes: 'Lock spine into extension before breaking floor on Trap Bar Deadlift.',
      exercises: [
        { id: 'fn-b4-3d-d2-1', exerciseId: 'trap-bar-deadlift', name: 'Trap Bar Deadlift Benchmark Test', targetSetsReps: '4 x 5', rest: '150s', progressionCue: 'Peak 5RM test', supersetGroup: 'A' },
        { id: 'fn-b4-3d-d2-2', exerciseId: 'lat-pulldown', name: 'Strict Pull-Up Benchmark Test', targetSetsReps: '3 x Max Reps (RIR 1)', rest: '90s', progressionCue: 'Record max clean reps', supersetGroup: 'B1' },
        { id: 'fn-b4-3d-d2-3', exerciseId: 'standing-overhead-press', name: 'Push Press or Heavy DB Overhead Press', targetSetsReps: '3 x 6', rest: '90s', progressionCue: '+5 lb Wk8', supersetGroup: 'B2' },
        { id: 'fn-b4-3d-d2-4', exerciseId: 'face-pull', name: 'Cable Face Pull with High Pull', targetSetsReps: '3 x 15', rest: '60s', progressionCue: '+1 plate Wk8', supersetGroup: 'C1' },
        { id: 'fn-b4-3d-d2-5', exerciseId: 'farmers-carry', name: 'Heavy Offset Kettlebell Carry', targetSetsReps: '3 x 40m /side', rest: '60s', progressionCue: '+5 lb Wk8', supersetGroup: 'C2' },
        { id: 'fn-b4-3d-d2-6', exerciseId: 'turkish-get-up', name: 'McGill Big 3 Stability Protocol', targetSetsReps: '3 rounds x 30s holds', rest: '45s', progressionCue: 'Maximum endurance', supersetGroup: 'D' }
      ]
    };

    const day3: WorkoutDay = {
      dayNumber: 3,
      name: 'Day 3 - Unilateral 8RM Benchmark & Longevity MAS Test',
      focus: 'Bulgarian Split Squat / Landmine RDL / Pallof / MAS Test',
      type: 'Unilateral Capacity & Aerobic Benchmark',
      timeBudgetMinutes: 54,
      typicalPlacement: 'Friday',
      warmUpProtocol: '8 min: Ankle rocks, backward sled, spider-man lunges.',
      coolDownProtocol: '8 min: Passive squat hold (2 min), nose breathing.',
      coachingNotes: 'Final longevity assessment: single-leg symmetry and 12-minute aerobic power.',
      exercises: [
        { id: 'fn-b4-3d-d3-1', exerciseId: 'bulgarian-split-squat', name: 'Bulgarian Split Squat 8RM Test', targetSetsReps: '3 x 8 /leg', rest: '90s', progressionCue: 'Record 8RM /leg load', supersetGroup: 'A' },
        { id: 'fn-b4-3d-d3-2', exerciseId: 'single-leg-rdl', name: 'Single-Leg Landmine RDL', targetSetsReps: '3 x 8 /leg', rest: '75s', progressionCue: '+5 lb Wk8', supersetGroup: 'B1' },
        { id: 'fn-b4-3d-d3-3', exerciseId: 'pallof-press', name: 'Standing Cable Pallof Press with Punch', targetSetsReps: '3 x 10 /side', rest: '60s', progressionCue: '+2.5 lb Wk8', supersetGroup: 'B2' },
        { id: 'fn-b4-3d-d3-4', exerciseId: 'box-jump', name: 'Poliquin Step-Up Test & Tibialis Raises', targetSetsReps: '3 x 15 /side', rest: '60s', progressionCue: '+2 reps Wk8', supersetGroup: 'C1' },
        { id: 'fn-b4-3d-d3-5', exerciseId: 'face-pull', name: 'Prone Incline Y-T-W Postural Raises', targetSetsReps: '3 x 12', rest: '60s', progressionCue: '+1 lb Wk8', supersetGroup: 'C2' },
        { id: 'fn-b4-3d-d3-6', exerciseId: 'mas-shuttle-intervals', name: '12-Minute Longevity MAS Aerobic Test (Row, Ski, or Bike)', targetSetsReps: '12 min steady tempo', rest: '90s', progressionCue: 'Record total distance meters', supersetGroup: 'D', isOptionalFinisher: true }
      ]
    };

    return [day1, day2, day3];
  }

  // -------------------------------------------------------------
  // BLOCK 1 (Weeks 1-2): Movement Integrity & Joint Armor (Default)
  // -------------------------------------------------------------
  const day1: WorkoutDay = {
    dayNumber: 1,
    name: 'Day 1 - Ground-Up Bilateral Squat & Horizontal Density',
    focus: 'Goblet Squat / Incline DB Bench / Seal Row / Hamstring Curl',
    type: 'Full-Body Movement Integrity',
    timeBudgetMinutes: 52,
    typicalPlacement: 'Monday',
    warmUpProtocol: '8 min: 2 min bike + 90/90 hip openers, world\'s greatest stretch, goblet squat pry holds (30s) + 2 light sets.',
    coolDownProtocol: '5 min: Couch stretch (hip flexors 60s/side), pigeon pose, diaphragmatic belly breathing.',
    coachingNotes: 'Focus on full controlled depth with 3-second descent. Drive through whole foot (tripod contact).',
    exercises: [
      { id: 'fn-b1-3d-d1-1', exerciseId: 'goblet-squat', name: 'Goblet Squat (or Front Squat)', targetSetsReps: '4 x 8-10 (3s down)', rest: '90s', progressionCue: '+1 rep or +5 lb Wk2', supersetGroup: 'A' },
      { id: 'fn-b1-3d-d1-2', exerciseId: 'dumbbell-bench-press', name: 'Incline Dumbbell Bench Press', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+2.5 lb/hand Wk2', supersetGroup: 'B1' },
      { id: 'fn-b1-3d-d1-3', exerciseId: 'chest-supported-row', name: 'Chest-Supported Dumbbell Seal Row', targetSetsReps: '3 x 10-12', rest: '75s', progressionCue: '+2.5 lb/hand Wk2', supersetGroup: 'B2' },
      { id: 'fn-b1-3d-d1-4', exerciseId: 'romanian-deadlift', name: 'Swiss Ball Hamstring Leg Curl (or Nordic)', targetSetsReps: '3 x 10-12', rest: '60s', progressionCue: '+2 reps Wk2', supersetGroup: 'C1' },
      { id: 'fn-b1-3d-d1-5', exerciseId: 'ab-wheel-rollout', name: 'Ab Wheel Rollout (or Hollow Body Hold)', targetSetsReps: '3 x 10-12', rest: '60s', progressionCue: '+1 rep Wk2', supersetGroup: 'C2' },
      { id: 'fn-b1-3d-d1-6', exerciseId: 'farmers-carry', name: 'Heavy Kettlebell / DB Farmer\'s Walk', targetSetsReps: '3 x 40m', rest: '60s', progressionCue: '+5 lb/hand Wk2', supersetGroup: 'D', isOptionalFinisher: true }
    ]
  };

  const day2: WorkoutDay = {
    dayNumber: 2,
    name: 'Day 2 - Posterior Chain Hinge & Vertical Pull/Press',
    focus: 'Trap Bar Deadlift / Neutral Pull-Up / Landmine Press / Face Pull',
    type: 'Posterior & Structural Armor',
    timeBudgetMinutes: 52,
    typicalPlacement: 'Wednesday',
    warmUpProtocol: '8 min: Band dislocates, band pull-aparts (20 reps), cat-cow, thoracic rotations + 2 ramp-up sets Trap Bar.',
    coolDownProtocol: '6 min: Dead hang from bar (30-45s gentle decompression), doorway chest stretch.',
    coachingNotes: 'Build upper back shelf to eliminate desk hunching. Pack shoulders down and back on all pulls.',
    exercises: [
      { id: 'fn-b1-3d-d2-1', exerciseId: 'trap-bar-deadlift', name: 'Trap Bar Deadlift (High Handles)', targetSetsReps: '4 x 6-8', rest: '120s', progressionCue: '+5-10 lb Wk2', supersetGroup: 'A' },
      { id: 'fn-b1-3d-d2-2', exerciseId: 'lat-pulldown', name: 'Neutral-Grip Pull-Up or Lat Pulldown', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+1 rep Wk2', supersetGroup: 'B1' },
      { id: 'fn-b1-3d-d2-3', exerciseId: 'standing-overhead-press', name: 'Half-Kneeling Landmine Overhead Press', targetSetsReps: '3 x 10 /side', rest: '75s', progressionCue: '+2.5 lb Wk2', supersetGroup: 'B2' },
      { id: 'fn-b1-3d-d2-4', exerciseId: 'face-pull', name: 'Cable Face Pull with External Rotation', targetSetsReps: '3 x 15', rest: '60s', progressionCue: '+2 reps Wk2', supersetGroup: 'C1' },
      { id: 'fn-b1-3d-d2-5', exerciseId: 'farmers-carry', name: 'Suitcase Carry (Single-Arm Asymmetric Offset)', targetSetsReps: '3 x 35m /side', rest: '60s', progressionCue: '+5 lb Wk2', supersetGroup: 'C2' },
      { id: 'fn-b1-3d-d2-6', exerciseId: 'turkish-get-up', name: 'Dr. Stuart McGill Big 3 (Bird-Dog & Side Bridge)', targetSetsReps: '3 rounds x 30s holds', rest: '45s', progressionCue: 'Stricter spine stiffness', supersetGroup: 'D' }
    ]
  };

  const day3: WorkoutDay = {
    dayNumber: 3,
    name: 'Day 3 - Unilateral Power, Multi-Planar Rotation & Longevity Engine',
    focus: 'Bulgarian Split Squat / Landmine RDL / Pallof / Poliquin / Sled Drag',
    type: 'Unilateral Durability & Work Capacity',
    timeBudgetMinutes: 54,
    typicalPlacement: 'Friday',
    warmUpProtocol: '8 min: 2 min jump rope or row + backward walking, ankle rocks, single-leg glute bridges.',
    coolDownProtocol: '5 min: Quad foam roll, seated hamstring stretch, calves against wall stretch (45s each).',
    coachingNotes: 'Single-leg balance fixes hidden left/right discrepancies that cause lower back and knee friction.',
    exercises: [
      { id: 'fn-b1-3d-d3-1', exerciseId: 'bulgarian-split-squat', name: 'Rear-Foot Elevated Split Squat (Bulgarian)', targetSetsReps: '3 x 8-10 /leg', rest: '75s', progressionCue: '+1 rep/leg Wk2', supersetGroup: 'A' },
      { id: 'fn-b1-3d-d3-2', exerciseId: 'single-leg-rdl', name: 'Single-Leg Landmine RDL (or Kickstand DB RDL)', targetSetsReps: '3 x 8-10 /leg', rest: '75s', progressionCue: '+2.5 lb Wk2', supersetGroup: 'B1' },
      { id: 'fn-b1-3d-d3-3', exerciseId: 'pallof-press', name: 'Standing Cable / Band Pallof Press with Press-Out', targetSetsReps: '3 x 12 /side', rest: '60s', progressionCue: '+3s pause Wk2', supersetGroup: 'B2' },
      { id: 'fn-b1-3d-d3-4', exerciseId: 'pogo-hops', name: 'Low Step-Down / Poliquin Step-Up & Tibialis Raises', targetSetsReps: '3 x 15 each', rest: '60s', progressionCue: '+2 reps Wk2', supersetGroup: 'C1' },
      { id: 'fn-b1-3d-d3-5', exerciseId: 'face-pull', name: 'Prone Incline Y-T-W Dumbbell Postural Raises', targetSetsReps: '3 x 12', rest: '60s', progressionCue: '+1 lb Wk2', supersetGroup: 'C2' },
      { id: 'fn-b1-3d-d3-6', exerciseId: 'sled-push-prowler', name: 'Backward Sled Drag (or Incline Treadmill Walk)', targetSetsReps: '4 x 25 meters (or 5 min)', rest: '60s', progressionCue: '+10 lb on sled Wk2', supersetGroup: 'D', isOptionalFinisher: true }
    ]
  };

  return [day1, day2, day3];
}
