export type SportId = 'boxing' | 'rugby' | 'football' | 'soccer' | 'basketball' | 'functional';

export type TrainingFrequency = 3 | 4 | 5;

export type MovementCategory = 
  | 'Push'
  | 'Pull'
  | 'Squat & Lunge'
  | 'Hinge'
  | 'Power & Plyometrics'
  | 'Core & Armor'
  | 'Conditioning & Engine';

export interface EquipmentAlternative {
  name: string;
  equipment: string; // e.g. "Dumbbells", "Cables", "Machine", "Trap Bar", "Bodyweight / Bands"
  rationale: string;
  exerciseIdFallback?: string;
}

export interface ExerciseGuide {
  id: string;
  name: string;
  category: MovementCategory;
  setup: string;
  execution: string;
  cue: string;
  avoid: string;
  progressTo: string;
  whenToProgress: string;
  regressTo: string;
  whenToRegress: string;
  sportsScienceRationale?: string;
  equipmentAlternatives?: EquipmentAlternative[];
}

export interface WorkoutExerciseItem {
  id: string;
  exerciseId: string;
  name: string;
  targetSetsReps: string; // e.g. "4 x 10-12" or "5 x 5" or "40s work / 20s rest"
  rest: string; // e.g. "90s" or "2-3 min" or "pair (45-60s)"
  progressionCue: string; // e.g. "+1 rep or +5% Wk2"
  supersetGroup?: string; // e.g. "A", "B1", "B2", "C1", "C2", "D"
  notes?: string;
  isOptionalFinisher?: boolean;
}

export interface WorkoutDay {
  dayNumber: number;
  name: string; // e.g. "Day 1 - Lower Strength"
  focus: string; // e.g. "Squat / Hinge / Single-Leg"
  type: string; // e.g. "Strength / Power"
  timeBudgetMinutes: number; // e.g. 55
  typicalPlacement: string; // e.g. "Monday"
  warmUpProtocol: string;
  coolDownProtocol: string;
  timeCrunchHierarchy?: string[];
  emergency30MinProtocol?: string;
  exercises: WorkoutExerciseItem[];
  coachingNotes: string;
}

export interface TrainingPhaseOrBlock {
  id: string;
  title: string; // e.g. "Block 1 - Foundation (Weeks 1-2)"
  weeks: string; // e.g. "Weeks 1-2" or "Weeks 1-3"
  weekNumbers: number[];
  theme: string;
  emphasis: string; // e.g. "Hypertrophy + work capacity: build lean muscle..."
  prescription: string; // e.g. "Main lifts 3-4 x 10-12 | Accessories 3 x 12-15 | Rest 60-90s"
  days: WorkoutDay[];
}

export interface BenchmarkTest {
  id: string;
  name: string;
  protocol: string;
  unit: string;
  proTarget: string;
  category: 'Strength' | 'Power' | 'Speed' | 'Conditioning' | 'Body Comp';
  description: string;
}

export interface SportProgram {
  id: SportId;
  name: string;
  badge: string;
  subtitle: string;
  duration: string; // "8 Weeks"
  frequency: string; // "4 Days / Week"
  heroImage: string;
  primaryGoals: string[];
  equipmentNeeded: string[];
  sportsSciencePrinciples: {
    title: string;
    description: string;
    researchCitation?: string;
  }[];
  phases: TrainingPhaseOrBlock[];
  benchmarkTests: BenchmarkTest[];
  recoveryRules: {
    sleep: string;
    protein: string;
    hydration: string;
    deloadRule: string;
    twoStrikeRule: string;
  };
  sourcesAndStandards: {
    title: string;
    citation: string;
    url?: string;
  }[];
}

export interface ExerciseLogEntry {
  setNumber: number;
  load: string;
  reps: string;
  completed: boolean;
}

export interface DaySessionLog {
  completed: boolean;
  date?: string;
  bodyweight?: string;
  durationMinutes?: number;
  rpe?: number; // 1-10
  exerciseLogs: Record<string, ExerciseLogEntry[]>; // exerciseId -> logs
  customSetCounts?: Record<string, number>; // exerciseId -> custom set count for this session/phase
  swappedExercises?: Record<string, { name: string; originalExerciseId: string; newExerciseId?: string; equipment?: string; rationale?: string }>;
  sessionNotes?: string;
}

export interface ProgressTrackerRow {
  weekNumber: number;
  date: string;
  bodyWeight: string;
  benchTopSet: string;
  squatTopSet: string;
  deadliftTopSet: string;
  pullUpMax: string;
  waist: string;
  restHeartRate: string;
  notes: string;
}

export interface AthleteProfile {
  name: string;
  sport: SportId;
  positionOrClass: string;
  startDate: string;
  primaryGoal: string;
}

export interface PositionAccessoryProtocol {
  id: string;
  name: string;
  prescription: string; // e.g. "3 sets x 12-15 reps"
  category: MovementCategory;
  coachingCue: string;
  scientificRationale: string;
}

export interface PositionFinisherDrill {
  name: string;
  workRest: string;
  protocol: string;
  energySystemGoal: string;
}

export interface PositionBenchmarkTarget {
  metric: string;
  proStandard: string;
  collegeOrSemiPro: string;
  unit: string;
  notes: string;
}

export interface PositionSpecialization {
  id: string;
  sportId: SportId;
  name: string;
  shortCode: string;
  roleBadge: string;
  tagline: string;
  overview: string;
  demands: {
    energySystem: string;
    kineticChainFocus: string;
    injuryPreventionZone: string;
    biomotorPriority: string;
  };
  recommendedModifications: {
    coreLiftingFocus: string;
    recommendedAccessoryProtocols: PositionAccessoryProtocol[];
    finisherDrill: PositionFinisherDrill;
  };
  benchmarks: PositionBenchmarkTarget[];
}
