import React, { useState, useMemo } from 'react';
import { MovementCategory, EquipmentAlternative, ExerciseGuide } from '../types/sport';
import { EXERCISE_DATABASE } from '../data/exerciseDatabase';
import { X, ArrowLeftRight, Check, RotateCcw, Dumbbell, Shield, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export interface EquipmentSwapModalProps {
  isOpen: boolean;
  exerciseId: string | null;
  exerciseNameFallback: string;
  catalogExerciseId?: string;
  category?: MovementCategory;
  currentSwapped?: {
    name: string;
    originalExerciseId: string;
    newExerciseId?: string;
    equipment?: string;
    rationale?: string;
  };
  onClose: () => void;
  onConfirmSwap: (
    exerciseId: string,
    swapData: {
      name: string;
      originalExerciseId: string;
      newExerciseId?: string;
      equipment?: string;
      rationale?: string;
    }
  ) => void;
  onRevertSwap: (exerciseId: string) => void;
  onOpenExerciseGuide?: (exerciseId: string, name: string) => void;
}

// Sports science anatomical and biomechanical breakdown for each movement pattern
export const MOVEMENT_CATEGORY_INFO: Record<MovementCategory, {
  patternLabel: string;
  bodyRegion: string;
  primaryMuscles: string;
  biomechanicalAction: string;
  badgeStyle: string;
}> = {
  'Squat & Lunge': {
    patternLabel: 'Squat & Lunge',
    bodyRegion: 'Lower Extremity (Knee-Dominant)',
    primaryMuscles: 'Quadriceps, Gluteus Maximus, Adductors & Knee Extensors',
    biomechanicalAction: 'Bilateral & Unilateral Deep Knee Flexion / Extension',
    badgeStyle: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
  },
  'Hinge': {
    patternLabel: 'Hip Hinge',
    bodyRegion: 'Lower Extremity (Hip-Dominant / Posterior Chain)',
    primaryMuscles: 'Hamstrings, Gluteus Maximus, Adductor Magnus & Erector Spinae',
    biomechanicalAction: 'Maximal Hip Flexion / Extension with Soft Knee Bend',
    badgeStyle: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
  },
  'Push': {
    patternLabel: 'Upper Body Press',
    bodyRegion: 'Upper Extremity (Horizontal & Vertical Press)',
    primaryMuscles: 'Pectoralis Major, Anterior Deltoids & Triceps Brachii',
    biomechanicalAction: 'Humeral Adduction / Flexion & Scapulohumeral Elevation',
    badgeStyle: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
  },
  'Pull': {
    patternLabel: 'Upper Body Pull',
    bodyRegion: 'Upper Extremity (Horizontal & Vertical Pull)',
    primaryMuscles: 'Latissimus Dorsi, Rhomboids, Trapezius & Biceps Brachii',
    biomechanicalAction: 'Humeral Extension / Retraction & Scapular Depression',
    badgeStyle: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
  },
  'Power & Plyometrics': {
    patternLabel: 'Power & Plyometrics',
    bodyRegion: 'Neuromuscular & Rate of Force Development',
    primaryMuscles: 'Full-Body Triple Extension (Ankles, Knees, Hips)',
    biomechanicalAction: 'Rapid Elastic Force Impulse & Eccentric Landing Deceleration',
    badgeStyle: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800'
  },
  'Core & Armor': {
    patternLabel: 'Core & Trunk Armor',
    bodyRegion: 'Trunk & Kinetic Link',
    primaryMuscles: 'Rectus Abdominis, Obliques, Transverse & Grip Complex',
    biomechanicalAction: 'Anti-Extension, Anti-Rotation & Loaded Carries',
    badgeStyle: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
  },
  'Conditioning & Engine': {
    patternLabel: 'Conditioning & Engine',
    bodyRegion: 'Cardiovascular & Metabolic Systems',
    primaryMuscles: 'Whole-Body Alactic, Glycolytic & Aerobic Substrates',
    biomechanicalAction: 'High-Velocity Repeat Sprints & Metabolic Threshold Work',
    badgeStyle: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800'
  }
};

// Sports science curated fallback alternatives strictly segregated by movement category
const CATEGORY_DEFAULT_ALTERNATIVES: Record<MovementCategory, EquipmentAlternative[]> = {
  'Squat & Lunge': [
    {
      name: 'Bulgarian Split Squat (Dumbbells)',
      equipment: 'Pair of Dumbbells & Flat Bench',
      rationale: 'Equal or higher unilateral quadriceps motor recruitment with half the axial spine compression.',
      exerciseIdFallback: 'bulgarian-split-squat'
    },
    {
      name: 'Barbell Front Squat',
      equipment: 'Barbell in Rack or 2x KBs',
      rationale: 'Anterior load cues pristine upright thoracic posture and deep knee flexion without lower back strain.',
      exerciseIdFallback: 'front-squat'
    },
    {
      name: 'Dumbbell Walking Lunge',
      equipment: 'Pair of Dumbbells & Open Floor',
      rationale: 'Dynamic single-leg knee extensor deceleration and pelvic stabilizer endurance.',
      exerciseIdFallback: 'bulgarian-split-squat'
    },
    {
      name: '45-Degree Leg Press Machine',
      equipment: 'Leg Press Station',
      rationale: 'Safely isolates high-volume quadriceps and glute hypertrophy with zero spinal axial load.'
    },
    {
      name: 'Barbell Back Squat',
      equipment: 'Barbell & Squat Rack',
      rationale: 'Maximal bilateral knee and hip extensor strength progression when heavy loading is required.',
      exerciseIdFallback: 'barbell-back-squat'
    },
    {
      name: 'Box Squat to Parallel Bench',
      equipment: 'Dumbbells / Kettlebell & 16-inch Box',
      rationale: 'Regulated depth control breaking the stretch-shortening cycle to protect the patellar tendon.'
    },
    {
      name: 'Spanish Squat Isometric Hold',
      equipment: 'Heavy Resistance Band & Rig',
      rationale: 'Isometric quadriceps contraction producing analgesic patellar tendon loading with zero joint shear.',
      exerciseIdFallback: 'spanish-squat-isometric'
    },
    {
      name: 'Heavy Goblet Squat',
      equipment: 'Single Heavy Dumbbell or Kettlebell',
      rationale: 'Upright torso geometry with deep knee flexion without occupying a squat rack.',
      exerciseIdFallback: 'goblet-squat'
    }
  ],
  'Hinge': [
    {
      name: 'Dumbbell Romanian Deadlift (RDL)',
      equipment: 'Pair of Dumbbells',
      rationale: 'Direct eccentric hamstring and glute loading tracking naturally at the sides without barbell drag.',
      exerciseIdFallback: 'romanian-deadlift'
    },
    {
      name: 'Trap Bar (Hex Bar) Deadlift',
      equipment: 'Hex Bar & Plates',
      rationale: 'Inline center of mass significantly reduces lumbar shear torque compared to a straight bar.',
      exerciseIdFallback: 'trap-bar-deadlift'
    },
    {
      name: 'Conventional Barbell Deadlift',
      equipment: 'Olympic Barbell & Bumper Plates',
      rationale: 'Maximal bilateral posterior chain force production from the floor.',
      exerciseIdFallback: 'conventional-deadlift'
    },
    {
      name: 'Heavy Kettlebell Swing (Russian)',
      equipment: 'Heavy Kettlebell',
      rationale: 'High rate of force development at the hip hinge with zero barbell setup.'
    },
    {
      name: 'Nordic Hamstring Curl',
      equipment: 'Ankle Pad / Partner Hold',
      rationale: 'Gold-standard eccentric hamstring knee-flexion strength for sprint injury prevention.',
      exerciseIdFallback: 'nordic-hamstring-curl'
    },
    {
      name: 'Single-Leg Dumbbell RDL',
      equipment: 'Single Dumbbell & Open Floor',
      rationale: 'Unilateral hamstring balance and pelvic anti-rotation with reduced total load.'
    },
    {
      name: 'Cable Pull-Through',
      equipment: 'Low Cable & Rope Attachment',
      rationale: 'Reinforces aggressive horizontal hip extension against constant cable tension.'
    }
  ],
  'Push': [
    {
      name: 'Flat Dumbbell Bench Press',
      equipment: 'Pair of Dumbbells & Flat Bench',
      rationale: 'Accommodates natural wrist/shoulder convergence with zero barbell rack needed.',
      exerciseIdFallback: 'dumbbell-bench-press'
    },
    {
      name: 'Incline Dumbbell Press',
      equipment: 'Incline Bench & Dumbbells',
      rationale: 'Upper pectoral and anterior deltoid overload with joint-friendly hand path.',
      exerciseIdFallback: 'incline-dumbbell-press'
    },
    {
      name: 'Push-Up to Deficit (or Weighted)',
      equipment: 'Floor & Weight Plates / Handles',
      rationale: 'Full-range horizontal pressing with active scapular protraction on the gym floor.',
      exerciseIdFallback: 'plyo-push-up'
    },
    {
      name: 'Half-Kneeling Landmine Press',
      equipment: 'Landmine Post & Barbell',
      rationale: 'Scapulohumeral rhythm friendly overhead press protecting the acromion from impingement.',
      exerciseIdFallback: 'landmine-press'
    },
    {
      name: 'Standing Barbell Overhead Press',
      equipment: 'Barbell in Rack',
      rationale: 'Strict vertical pressing and kinetic chain anti-extension stability.',
      exerciseIdFallback: 'standing-overhead-press'
    },
    {
      name: 'Parallel Bar Dips',
      equipment: 'Dip Station / Power Tower',
      rationale: 'High-threshold triceps and lower pectoral motor unit recruitment.',
      exerciseIdFallback: 'weighted-dip'
    },
    {
      name: 'Seated Cable Chest Press',
      equipment: 'Cable Column / Functional Trainer',
      rationale: 'Constant muscular tension without stabilizing free weight overhead.'
    }
  ],
  'Pull': [
    {
      name: 'Chest-Supported Incline Dumbbell Row',
      equipment: 'Incline Bench & Dumbbells',
      rationale: 'Eliminates lower-back shear while hammering lats and rhomboids.',
      exerciseIdFallback: 'one-arm-dumbbell-row'
    },
    {
      name: 'Lat Pulldown (Neutral or Wide Grip)',
      equipment: 'Cable Lat Machine',
      rationale: 'Direct vertical lat recruitment with incremental pin loading when pull-up bar is occupied.',
      exerciseIdFallback: 'lat-pulldown'
    },
    {
      name: 'Weighted or Bodyweight Chin-Up',
      equipment: 'Pull-Up Bar & Optional Belt',
      rationale: 'High-threshold vertical pulling and lat/biceps recruitment.',
      exerciseIdFallback: 'weighted-pull-up'
    },
    {
      name: 'Single-Arm Dumbbell Row',
      equipment: 'Flat Bench & Heavy DB',
      rationale: 'Allows heavy unilateral loading and unrestricted rotational lat excursion.',
      exerciseIdFallback: 'one-arm-dumbbell-row'
    },
    {
      name: 'Barbell Bent-Over Row',
      equipment: 'Barbell & Weight Plates',
      rationale: 'Heavy horizontal pulling with isometric posterior chain bracing.',
      exerciseIdFallback: 'barbell-bent-over-row'
    },
    {
      name: 'Inverted Bodyweight Row',
      equipment: 'Barbell in Low Rack / Smith Machine',
      rationale: 'Horizontal bodyweight pull requiring zero dumbbells or cable towers.'
    },
    {
      name: 'Face Pull with External Rotation',
      equipment: 'Cable Tower & Rope',
      rationale: 'Posterior deltoid, rotator cuff, and upper back postural armor.',
      exerciseIdFallback: 'face-pull'
    }
  ],
  'Power & Plyometrics': [
    {
      name: 'Trap Bar Jump Squats',
      equipment: 'Trap Bar & Light Bumper Plates',
      rationale: 'Loaded vertical impulse and maximal rate of force development.',
      exerciseIdFallback: 'trap-bar-jump-squat'
    },
    {
      name: 'Hurdle Hop to Box Jump (Stick Landing)',
      equipment: 'Hurdles / Plyo Box',
      rationale: 'Reactive elastic ground contact and eccentric landing force absorption.',
      exerciseIdFallback: 'box-jump'
    },
    {
      name: 'Single-Arm Dumbbell Snatch',
      equipment: 'Single Dumbbell & Open Floor',
      rationale: 'Triple extension velocity from floor to overhead with zero wrist catch impact.',
      exerciseIdFallback: 'hang-power-clean'
    },
    {
      name: 'Standing Broad Jump',
      equipment: 'Open Turf / Floor Mat',
      rationale: 'Pure horizontal triple extension and eccentric landing force absorption.'
    },
    {
      name: 'Medicine Ball Overhead Slam',
      equipment: 'Non-Bouncing Med Ball & Floor',
      rationale: 'Violent explosive anterior chain recruitment without landing joint stress.',
      exerciseIdFallback: 'medicine-ball-slam'
    },
    {
      name: 'Rotational Med Ball Scoop Throw',
      equipment: 'Med Ball & Solid Concrete Wall',
      rationale: 'Transverse plane rotational power transferring hip torque to upper body.',
      exerciseIdFallback: 'rotational-med-ball-throw'
    },
    {
      name: 'Ankle Pogo Spring Hops',
      equipment: 'Open Turf / Track',
      rationale: 'Sub-180ms ground contact elasticity and Achilles tendon stiffness.',
      exerciseIdFallback: 'pogo-hops'
    }
  ],
  'Core & Armor': [
    {
      name: "Farmer's Carry (Heavy DBs or KBs)",
      equipment: 'Pair of Heavy DBs or KBs',
      rationale: 'Full-body armor, cervical grip endurance, and anti-lateral flexion core stability.',
      exerciseIdFallback: 'farmers-carry'
    },
    {
      name: 'Ab Wheel Rollout / Barbell Rollout',
      equipment: 'Ab Wheel or Barbell on Floor',
      rationale: 'Direct anterior abdominal anti-extension loading on any open gym mat.',
      exerciseIdFallback: 'ab-wheel-rollout'
    },
    {
      name: 'Hanging Knee / Leg Raise',
      equipment: 'Pull-Up Bar or Power Tower',
      rationale: 'Pelvic posterior tilt decompression and deep lower abdominal contraction.',
      exerciseIdFallback: 'hanging-leg-raise'
    },
    {
      name: 'Pallof Press (Cable or Band)',
      equipment: 'Cable Column or Resistance Band',
      rationale: 'Isometric anti-rotation targeting internal and external obliques.'
    },
    {
      name: 'Copenhagen Adductor Plank',
      equipment: 'Flat Bench & Floor Mat',
      rationale: 'High-load groin adductor strength and lateral trunk stability.',
      exerciseIdFallback: 'copenhagen-plank'
    },
    {
      name: 'Single-Arm Suitcase Carry',
      equipment: 'Single Heavy Dumbbell or KB',
      rationale: 'Unilateral anti-lateral flexion and quadratus lumborum recruitment.'
    }
  ],
  'Conditioning & Engine': [
    {
      name: 'Air Bike / Assault Bike Sprints',
      equipment: 'Fan Air Bike',
      rationale: 'Zero-impact maximal anaerobic lactic power output with full upper/lower drive.'
    },
    {
      name: 'Concept2 Rowing 100m Intervals',
      equipment: 'Rowing Ergometer',
      rationale: 'Whole-body posterior chain cardiovascular engine without turf track.'
    },
    {
      name: 'Dead-Mill / Motor-Off Treadmill Push',
      equipment: 'Turned-Off Treadmill',
      rationale: 'Manual belt leg drive simulating heavy prowler sled sprint.'
    },
    {
      name: 'MAS Shuttle Intervals (100% / 70%)',
      equipment: 'Cones & Open Floor',
      rationale: 'Aerobic speed reserve and repeat sprint deceleration.',
      exerciseIdFallback: 'mas-shuttle-intervals'
    },
    {
      name: 'Kettlebell Farmer Walk Intervals',
      equipment: 'Pair of Heavy KBs',
      rationale: 'Metabolic engine under load when running tracks are packed.'
    }
  ]
};

// Biomechanical heuristic parser to classify exercises when IDs don't match directly
export function detectMovementCategoryFromName(rawName: string): MovementCategory {
  const name = (rawName || '').toLowerCase();

  // Lower Extremity - Knee Dominant (Squat & Lunge)
  if (/\b(squat|squats|lunge|lunges|split squat|step-up|step up|leg press|hack squat|sissy squat|spanish squat|cossack|pistol squat|quad|knees|knee flexion)\b/i.test(name)) {
    return 'Squat & Lunge';
  }

  // Lower Extremity - Hip Dominant (Hinge)
  if (/\b(deadlift|deadlifts|rdl|hinge|good morning|hamstring|nordic|curl|glute|hip thrust|hyperextension|back extension|swings?)\b/i.test(name)) {
    return 'Hinge';
  }

  // Upper Extremity - Press (Push)
  if (/\b(bench|press|presses|push-up|pushup|dips?|overhead|military|shoulder press|landmine press|chest press)\b/i.test(name)) {
    return 'Push';
  }

  // Upper Extremity - Pull (Pull)
  if (/\b(row|rows|pull-up|pullup|chin-up|chinup|pulldown|lat|face pull|inverted row)\b/i.test(name)) {
    return 'Pull';
  }

  // Rate of Force / Explosive (Power & Plyometrics)
  if (/\b(jump|jumps|hop|hops|bound|bounds|clean|cleans|snatch|jerk|slam|slams|throw|throws|plyo|plyometric|pogo)\b/i.test(name)) {
    return 'Power & Plyometrics';
  }

  // Midsection (Core & Armor)
  if (/\b(carry|carries|plank|planks|rollout|knee raise|leg raise|ab wheel|pallof|core|anti-rotation|neck|trunk)\b/i.test(name)) {
    return 'Core & Armor';
  }

  // Conditioning & Engine
  if (/\b(sprint|sprints|shuttle|shuttles|bike|assault bike|rower|erg|interval|intervals|sled|prowler|agility)\b/i.test(name)) {
    return 'Conditioning & Engine';
  }

  // Safe lower extremity default instead of chest pressing
  return 'Squat & Lunge';
}

// Find exercise guide across catalog ID, workout ID, or sanitized name
export function findExerciseGuide(
  exerciseId: string | null,
  catalogExerciseId?: string,
  fallbackName?: string
): ExerciseGuide | undefined {
  if (exerciseId && EXERCISE_DATABASE[exerciseId]) {
    return EXERCISE_DATABASE[exerciseId];
  }
  if (catalogExerciseId && EXERCISE_DATABASE[catalogExerciseId]) {
    return EXERCISE_DATABASE[catalogExerciseId];
  }

  if (fallbackName) {
    const clean = fallbackName
      .replace(/^[A-Z0-9]+[·\s-]+/i, '')
      .replace(/\(.*?\)/g, '')
      .toLowerCase()
      .trim();

    const slug = clean.replace(/[^a-z0-9]+/g, '-');
    if (EXERCISE_DATABASE[slug]) {
      return EXERCISE_DATABASE[slug];
    }

    for (const guide of Object.values(EXERCISE_DATABASE)) {
      const gName = guide.name.toLowerCase();
      if (gName === clean || gName.includes(clean) || clean.includes(gName)) {
        return guide;
      }
    }
  }

  return undefined;
}

export const EquipmentSwapModal: React.FC<EquipmentSwapModalProps> = ({
  isOpen,
  exerciseId,
  exerciseNameFallback,
  catalogExerciseId,
  category,
  currentSwapped,
  onClose,
  onConfirmSwap,
  onRevertSwap,
  onOpenExerciseGuide
}) => {
  // Resolve guide and movement category
  const guide = findExerciseGuide(exerciseId, catalogExerciseId, exerciseNameFallback);
  const originalName = guide?.name || (exerciseNameFallback || '').replace(/^[A-Z0-9]+[·\s-]+/i, '').trim() || 'Exercise';

  // Category resolution: guide category > explicit prop category > biomechanical name detection
  const detectedCategory = detectMovementCategoryFromName(originalName);
  const targetCategory: MovementCategory = guide?.category || category || detectedCategory;

  const [activeCategory, setActiveCategory] = useState<MovementCategory>(targetCategory);
  const [filterType, setFilterType] = useState<string>('all');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEquipment, setCustomEquipment] = useState('');
  const [customRationale, setCustomRationale] = useState('');

  // Keep active category in sync if targetCategory changes
  React.useEffect(() => {
    setActiveCategory(targetCategory);
  }, [targetCategory]);

  const categoryMeta = MOVEMENT_CATEGORY_INFO[activeCategory] || MOVEMENT_CATEGORY_INFO['Squat & Lunge'];

  // Combine and deduplicate alternatives strictly within the active category
  const combinedAlternatives = useMemo(() => {
    // 1. Direct alternatives defined on the exercise guide (if category matches)
    const guideAlts = (guide && guide.category === activeCategory && guide.equipmentAlternatives) 
      ? guide.equipmentAlternatives 
      : [];

    // 2. Curated category alternatives
    const defaultAlts = CATEGORY_DEFAULT_ALTERNATIVES[activeCategory] || [];

    // 3. Peer exercises from the database in the exact same category
    const peerAlts: EquipmentAlternative[] = Object.values(EXERCISE_DATABASE)
      .filter(g => g.category === activeCategory && g.id !== guide?.id)
      .map(g => ({
        name: g.name,
        equipment: g.setup.split('.')[0] || 'Gym Equipment',
        rationale: g.sportsScienceRationale || `Direct ${activeCategory.toLowerCase()} substitution targeting ${categoryMeta.primaryMuscles}.`,
        exerciseIdFallback: g.id
      }));

    // Helper to identify self-references
    const isSelfExercise = (altName: string): boolean => {
      const n1 = altName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const n2 = originalName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (n1 === n2) return true;
      if (n1.includes('goblet') && n2.includes('goblet')) return true;
      if (n1.includes('backsquat') && n2.includes('backsquat')) return true;
      if (n1.includes('frontsquat') && n2.includes('frontsquat')) return true;
      return false;
    };

    const seenNames = new Set<string>();
    const list: EquipmentAlternative[] = [];

    // Prioritize direct guide alternatives first, then category defaults, then peers
    [...guideAlts, ...defaultAlts, ...peerAlts].forEach(item => {
      const norm = item.name.toLowerCase().trim();
      if (!seenNames.has(norm) && !isSelfExercise(item.name)) {
        seenNames.add(norm);
        list.push(item);
      }
    });

    return list;
  }, [guide, activeCategory, originalName, categoryMeta.primaryMuscles]);

  // Filter alternatives by equipment type
  const filteredAlternatives = useMemo(() => {
    return combinedAlternatives.filter(alt => {
      if (filterType === 'all') return true;
      const lower = (alt.equipment + ' ' + alt.name).toLowerCase();
      if (filterType === 'dumbbell') return lower.includes('dumbbell') || lower.includes('db') || lower.includes('kettlebell') || lower.includes('kb');
      if (filterType === 'barbell') return lower.includes('barbell') || lower.includes('bar') || lower.includes('rack') || lower.includes('trap');
      if (filterType === 'machine') return lower.includes('cable') || lower.includes('machine') || lower.includes('press station') || lower.includes('pulldown') || lower.includes('leg press');
      if (filterType === 'bodyweight') return lower.includes('floor') || lower.includes('mat') || lower.includes('band') || lower.includes('bodyweight') || lower.includes('box');
      return true;
    });
  }, [combinedAlternatives, filterType]);

  const handleApplySwap = (alt: EquipmentAlternative) => {
    if (!exerciseId) return;
    onConfirmSwap(exerciseId, {
      name: alt.name,
      originalExerciseId: exerciseId,
      newExerciseId: alt.exerciseIdFallback,
      equipment: alt.equipment,
      rationale: alt.rationale
    });
    onClose();
  };

  const handleApplyCustomSwap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseId || !customName.trim()) return;
    onConfirmSwap(exerciseId, {
      name: customName.trim(),
      originalExerciseId: exerciseId,
      equipment: customEquipment.trim() || 'Custom Equipment',
      rationale: customRationale.trim() || `Custom ${activeCategory} substitute.`
    });
    setShowCustomForm(false);
    onClose();
  };

  const handleRevert = () => {
    if (exerciseId) {
      onRevertSwap(exerciseId);
    }
    onClose();
  };

  if (!isOpen || !exerciseId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="swap-modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Gym Floor Usability · Biomechanical Substitution
                </span>
              </div>
              <h2 id="swap-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Swap: {originalName}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 min-h-[40px] min-w-[40px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-slate-800 dark:text-slate-200">
          {/* Active Swap Alert (if already swapped) */}
          {currentSwapped ? (
            <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider mb-0.5">
                  <Check className="w-3.5 h-3.5" />
                  Currently Swapped in Session
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {currentSwapped.name}
                </div>
                {currentSwapped.equipment && (
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Equipment: <span className="font-semibold text-slate-800 dark:text-slate-200">{currentSwapped.equipment}</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleRevert}
                className="flex items-center justify-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-bold text-xs hover:bg-slate-800 dark:hover:bg-white transition-colors shrink-0 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revert to Original</span>
              </button>
            </div>
          ) : null}

          {/* Biomechanical Anatomy & Movement Guarantee Card */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Target Region: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{categoryMeta.bodyRegion}</span>
                </span>
              </div>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${categoryMeta.badgeStyle}`}>
                {categoryMeta.patternLabel}
              </span>
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Primary Muscles: </span>
              {categoryMeta.primaryMuscles}
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-1 border-t border-slate-200/60 dark:border-slate-700/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>All suggestions below preserve this exact anatomical recruitment and neuromuscular velocity curve.</span>
            </div>
          </div>

          {/* Movement Category Filter Tabs */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Movement Pattern:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {(['Squat & Lunge', 'Hinge', 'Push', 'Pull', 'Power & Plyometrics', 'Core & Armor', 'Conditioning & Engine'] as MovementCategory[]).map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 text-[11px] font-medium rounded-lg whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Equipment Type Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {[
              { id: 'all', label: `All Substitutes (${combinedAlternatives.length})` },
              { id: 'dumbbell', label: 'Dumbbells / KBs' },
              { id: 'barbell', label: 'In-Rack / Barbell' },
              { id: 'machine', label: 'Machines / Cables' },
              { id: 'bodyweight', label: 'Floor / Bodyweight' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors min-h-[36px] ${
                  filterType === tab.id
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Alternatives Cards List */}
          <div className="space-y-3">
            {filteredAlternatives.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                No substitutes found matching the "{filterType}" equipment filter. Try selecting "All Substitutes" above.
              </div>
            ) : (
              filteredAlternatives.map((alt, idx) => {
                const isCurrentlyActive = currentSwapped?.name === alt.name;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isCurrentlyActive
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-600 ring-1 ring-emerald-500/30'
                        : 'bg-slate-50/80 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {alt.name}
                          </span>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1">
                            <Dumbbell className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            {alt.equipment}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-0.5">
                          <strong className="text-slate-800 dark:text-slate-200">Why it works: </strong>
                          {alt.rationale}
                        </p>

                        {alt.exerciseIdFallback && onOpenExerciseGuide && (
                          <button
                            onClick={() => onOpenExerciseGuide(alt.exerciseIdFallback!, alt.name)}
                            className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 pt-1"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>View instructions & cues</span>
                          </button>
                        )}
                      </div>

                      {/* Swap Action Button */}
                      <div className="shrink-0 self-end sm:self-center">
                        {isCurrentlyActive ? (
                          <button
                            onClick={handleRevert}
                            className="px-3.5 py-2 min-h-[40px] rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-emerald-500 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Active (Revert)</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleApplySwap(alt)}
                            className="px-3.5 py-2 min-h-[40px] rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                          >
                            <ArrowLeftRight className="w-3.5 h-3.5" />
                            <span>Swap into Session</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Custom Equipment Swap Option */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {!showCustomForm ? (
              <button
                onClick={() => setShowCustomForm(true)}
                className="w-full py-2.5 min-h-[44px] rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-400 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Can't find your gym's setup? Enter Custom Substitute</span>
              </button>
            ) : (
              <form onSubmit={handleApplyCustomSwap} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    Custom Exercise Substitute ({activeCategory})
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCustomForm(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Exercise Name *</label>
                    <input
                      type="text"
                      required
                      placeholder={`e.g. ${activeCategory === 'Squat & Lunge' ? 'Hack Squat Machine' : 'Incline Dumbbell Press'}`}
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 dark:text-slate-400 mb-1 font-medium">Equipment Available</label>
                    <input
                      type="text"
                      placeholder="e.g. Hack Squat Machine or Heavy Kettlebell"
                      value={customEquipment}
                      onChange={(e) => setCustomEquipment(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 mb-1 text-xs font-medium">Coaching Note / Rationale</label>
                  <input
                    type="text"
                    placeholder={`e.g. Isolates ${categoryMeta.primaryMuscles.split(',')[0]} with stable back support`}
                    value={customRationale}
                    onChange={(e) => setCustomRationale(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Apply Custom Swap to Workout</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between mt-auto">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
            Original blueprint will remember this substitute for session tracking.
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 min-h-[40px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
