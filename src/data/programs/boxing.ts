import { SportProgram } from '../../types/sport';

export const BOXING_PROGRAM: SportProgram = {
  id: 'boxing',
  name: 'Boxing & Combat Athletics',
  badge: 'Combat Power & Conditioning',
  subtitle: '8-Week Athletic Power & Physique Program (Functional Strength & Conditioning)',
  duration: '8 Weeks (4 Progressive 2-Week Blocks)',
  frequency: '4 Training Days / Week + Active Recovery',
  heroImage: '/src/assets/images/sport_boxing_athlete_1791316781872.jpg',
  primaryGoals: [
    'Lean, powerful athletic physique without excess sluggish bulk',
    'Explosive rotational punching power and triple-extension snap',
    'Ironclad core stability, anti-rotation, and ring agility',
    'High-intensity anaerobic threshold engine that never fades in late rounds'
  ],
  equipmentNeeded: [
    'Barbell & Bumper Plates',
    'Dumbbells & Kettlebells',
    'Cable Tower & Pull-up Station',
    'Sled / Prowler & Battle Ropes',
    'Medicine Balls & Jump Rope'
  ],
  sportsSciencePrinciples: [
    {
      title: 'Kinetic Chain Sequencing (Ground-to-Fist)',
      description: 'Rotational punching force originates in the lower limbs (~38%), transfers through pelvic-lumbar core rotation (~37%), and culminates in upper body strike velocity (~25%). Training emphasizes explosive ankle/knee extension and stiff core braking.',
      researchCitation: 'Lenetsky et al. (2013) & Mack et al. (2010) Journal of Sports Science & Medicine'
    },
    {
      title: 'High-Density Alactic-Aerobic Conditioning',
      description: 'Boxers rely on repeated bursts of high-velocity movement (2-3s combos) superimposed on a steady aerobic recovery engine. Conditioning focuses on 40s/20s and sprint-interval protocols to elevate VO2 max and rapid lactate clearance.',
      researchCitation: 'Chaabène et al. (2015) Sports Medicine Review on Boxing Physiology'
    },
    {
      title: 'Double Progression & Wave Periodization',
      description: 'Progression alternates between muscular foundation, maximal absolute strength, velocity-based power, and peak metabolic density across 2-week progressive blocks.',
    }
  ],
  phases: [
    {
      id: 'boxing-block-1',
      title: 'Block 1 - Foundation',
      weeks: 'Weeks 1-2',
      weekNumbers: [1, 2],
      theme: 'Hypertrophy & Work Capacity',
      emphasis: 'Build lean muscle armor, groove pristine movement mechanics, and lay down an unbreakable aerobic base.',
      prescription: 'Main lifts 3-4 x 10-12 | Accessories 3 x 12-15 | Rest 60-90s',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Upper Body (Push & Pull)',
          focus: 'Chest / Back / Shoulders / Arms',
          type: 'Strength / Foundation',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8-10 min: 3 min easy jump rope + arm circles, band pull-aparts, inchworms + 2 warm-up sets DB bench.',
          coolDownProtocol: '5-10 min: Light shoulder static stretches, doorframe chest stretch, lat foam rolling.',
          coachingNotes: 'Log Week 1 as baseline. In Week 2 apply double progression (+1 rep or +5% load). Keep 2 reps in reserve (RPE 7-8).',
          exercises: [
            { id: 'b1-d1-1', exerciseId: 'dumbbell-bench-press', name: 'Flat Dumbbell Bench Press', targetSetsReps: '4 x 10-12', rest: '90s', progressionCue: '+1 rep or +5% load Wk2', supersetGroup: 'A' },
            { id: 'b1-d1-2', exerciseId: 'lat-pulldown', name: 'Lat Pulldown or Assisted Pull-Up', targetSetsReps: '4 x 10-12', rest: '90s', progressionCue: '+1 rep or +5% load Wk2', supersetGroup: 'B1' },
            { id: 'b1-d1-3', exerciseId: 'standing-overhead-press', name: 'Seated Dumbbell Shoulder Press', targetSetsReps: '3 x 10-12', rest: '90s', progressionCue: '+1 rep or +5% load Wk2', supersetGroup: 'B2' },
            { id: 'b1-d1-4', exerciseId: 'one-arm-dumbbell-row', name: 'One-Arm Dumbbell Row', targetSetsReps: '3 x 10-12 /side', rest: '90s', progressionCue: '+1 rep or +5% load Wk2', supersetGroup: 'C1' },
            { id: 'b1-d1-5', exerciseId: 'plyo-push-up', name: 'Incline Push-Up (feet on bench)', targetSetsReps: '3 x 12-15', rest: '60s', progressionCue: '+2 reps Wk2', supersetGroup: 'C2' },
            { id: 'b1-d1-6', exerciseId: 'face-pull', name: 'Face Pull', targetSetsReps: '3 x 15', rest: '60s', progressionCue: '+2 reps Wk2', supersetGroup: 'D1' },
            { id: 'b1-d1-7', exerciseId: 'push-press', name: 'Cable Triceps Pushdown', targetSetsReps: '3 x 12-15', rest: '60s', progressionCue: '+5% load Wk2', supersetGroup: 'D2' },
            { id: 'b1-d1-8', exerciseId: 'barbell-bent-over-row', name: 'Dumbbell Biceps Curl', targetSetsReps: '3 x 12-15', rest: '45s', progressionCue: '+5% load Wk2', supersetGroup: 'D3' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Lower Body',
          focus: 'Legs / Glutes / Calves & Posterior Chain',
          type: 'Strength / Foundation',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: 3 min bike + leg swings, walking lunges with twist, hip openers + empty goblet squat warmups.',
          coolDownProtocol: '5-10 min: Couch stretch (hip flexors), pigeon pose (glutes), calf foam roll.',
          coachingNotes: 'Boxing footwork requires immense single-leg balance and calf/ankle elasticity. Keep lunges clean and vertical.',
          exercises: [
            { id: 'b1-d2-1', exerciseId: 'goblet-squat', name: 'Goblet Squat', targetSetsReps: '4 x 10-12', rest: '90s', progressionCue: '+1 rep or +5% load Wk2', supersetGroup: 'A' },
            { id: 'b1-d2-2', exerciseId: 'romanian-deadlift', name: 'Romanian Deadlift (DB/BB)', targetSetsReps: '3 x 10-12', rest: '90s', progressionCue: '+1 rep or +5% load Wk2', supersetGroup: 'B1' },
            { id: 'b1-d2-3', exerciseId: 'bulgarian-split-squat', name: 'Walking Lunge', targetSetsReps: '3 x 12 /leg', rest: '60s', progressionCue: '+2 reps/leg Wk2', supersetGroup: 'B2' },
            { id: 'b1-d2-4', exerciseId: 'box-jump', name: 'Box Step-Up', targetSetsReps: '3 x 10 /leg', rest: '60s', progressionCue: 'Raise box height Wk2', supersetGroup: 'C1' },
            { id: 'b1-d2-5', exerciseId: 'pogo-hops', name: 'Standing Calf Raise', targetSetsReps: '3 x 15', rest: '45s', progressionCue: '+5% load Wk2', supersetGroup: 'C2' },
            { id: 'b1-d2-6', exerciseId: 'hanging-leg-raise', name: 'Hanging Knee Raise', targetSetsReps: '3 x 12-15', rest: '45s', progressionCue: '+2 reps Wk2', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Full-Body Functional',
          focus: 'Carries / Core / Rotational Stability',
          type: 'Power / Athletic Functional',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Light row + world\'s greatest stretch, dynamic thoracic rotations.',
          coolDownProtocol: '5 min: Diaphragmatic box breathing + child\'s pose.',
          coachingNotes: 'Builds core bracing that absorbs punches and links the hips to shoulders. Stay tall on all carries.',
          exercises: [
            { id: 'b1-d3-1', exerciseId: 'turkish-get-up', name: 'Kettlebell Turkish Get-Up', targetSetsReps: '3 x 3-5 /side', rest: '90s', progressionCue: '+1 rep/side Wk2' },
            { id: 'b1-d3-2', exerciseId: 'farmers-carry', name: 'Farmer\'s Carry', targetSetsReps: '3 x 40m', rest: '90s', progressionCue: '+5% load Wk2' },
            { id: 'b1-d3-3', exerciseId: 'medicine-ball-slam', name: 'Medicine Ball Slam', targetSetsReps: '3 x 12', rest: '60s', progressionCue: '+2 reps Wk2' },
            { id: 'b1-d3-4', exerciseId: 'sled-push-prowler', name: 'Sled Push (moderate)', targetSetsReps: '4 x 20m', rest: '90s', progressionCue: '+5% load Wk2' },
            { id: 'b1-d3-5', exerciseId: 'farmers-carry', name: 'Suitcase Carry', targetSetsReps: '3 x 30m /side', rest: '60s', progressionCue: '+5% load Wk2' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Conditioning & Core',
          focus: 'Aerobic Base & Anaerobic Engine',
          type: 'High-Intensity Circuits',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Friday',
          warmUpProtocol: '5 min easy jump rope + dynamic wrist and ankle circles.',
          coolDownProtocol: '5-10 min light walk + deep abdominal cobra stretches.',
          coachingNotes: 'Perform as a circuit: 40s work / 20s rest per station. Repeat x 3-4 rounds with 2 min rest between rounds.',
          exercises: [
            { id: 'b1-d4-1', exerciseId: 'hang-power-clean', name: 'Kettlebell Swing', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+5% load Wk2' },
            { id: 'b1-d4-2', exerciseId: 'repeated-sprint-series', name: 'Rowing Machine Sprint', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+pace / distance Wk2' },
            { id: 'b1-d4-3', exerciseId: 'sled-push-prowler', name: 'Sled Push', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+5% load Wk2' },
            { id: 'b1-d4-4', exerciseId: 'neck-armor-protocol', name: 'Battle Ropes', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+5s work Wk2' },
            { id: 'b1-d4-5', exerciseId: 'pogo-hops', name: 'Jump Rope', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: 'Add double-unders Wk2' },
            { id: 'b1-d4-6', exerciseId: 'copenhagen-plank', name: 'Russian Twist (weighted)', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: 'Add plate Wk2' }
          ]
        }
      ]
    },
    {
      id: 'boxing-block-2',
      title: 'Block 2 - Strength',
      weeks: 'Weeks 3-4',
      weekNumbers: [3, 4],
      theme: 'Maximal Compound Force',
      emphasis: 'Build raw strength on the big compound lifts while holding onto muscle armor. Heavy loads, full recovery.',
      prescription: 'Main lifts 4-5 x 4-6 | Accessories 3 x 8-10 | Rest 2-3 min (compounds), 90s (accessories)',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Upper Body (Push & Pull)',
          focus: 'Max Strength: Chest / Back / Shoulders',
          type: 'Strength',
          timeBudgetMinutes: 55,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Band face pulls, empty bar ramp-up sets (bar x10, 50% x5, 75% x3).',
          coolDownProtocol: '5 min: Upper body stretching, pec minor release.',
          coachingNotes: 'Compounds are straight sets with 2-3 min rest. Move the bar with violent concentric intent.',
          exercises: [
            { id: 'b2-d1-1', exerciseId: 'barbell-bench-press', name: 'Barbell Bench Press', targetSetsReps: '5 x 5', rest: '3 min', progressionCue: '+5-10 lb Wk4' },
            { id: 'b2-d1-2', exerciseId: 'weighted-pull-up', name: 'Weighted Pull-Up', targetSetsReps: '5 x 5', rest: '3 min', progressionCue: '+5 lb Wk4' },
            { id: 'b2-d1-3', exerciseId: 'standing-overhead-press', name: 'Standing Barbell Overhead Press', targetSetsReps: '4 x 5-6', rest: '2-3 min', progressionCue: '+5 lb Wk4' },
            { id: 'b2-d1-4', exerciseId: 'barbell-bent-over-row', name: 'Pendlay Row (Barbell)', targetSetsReps: '4 x 5-6', rest: '2-3 min', progressionCue: '+5-10 lb Wk4' },
            { id: 'b2-d1-5', exerciseId: 'weighted-dip', name: 'Weighted Dip', targetSetsReps: '4 x 6-8', rest: '2 min', progressionCue: '+5 lb Wk4' },
            { id: 'b2-d1-6', exerciseId: 'one-arm-dumbbell-row', name: 'T-Bar Row', targetSetsReps: '3 x 8', rest: '90s', progressionCue: '+5% load Wk4' },
            { id: 'b2-d1-7', exerciseId: 'barbell-bench-press', name: 'Close-Grip Bench Press', targetSetsReps: '3 x 8', rest: '90s', progressionCue: '+5% load Wk4' },
            { id: 'b2-d1-8', exerciseId: 'barbell-bent-over-row', name: 'Barbell Curl', targetSetsReps: '3 x 8-10', rest: '90s', progressionCue: '+5% load Wk4' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Lower Body',
          focus: 'Max Strength: Squat & Hinge',
          type: 'Strength',
          timeBudgetMinutes: 55,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Hip 90/90, world\'s greatest stretch, progressive barbell squat warmups.',
          coolDownProtocol: '5-10 min: Hamstring floss, hip flexor stretch, foam rolling.',
          coachingNotes: 'Drive through the floor. Respect the 3-minute rest periods to ensure high neurological output.',
          exercises: [
            { id: 'b2-d2-1', exerciseId: 'barbell-back-squat', name: 'Barbell Back Squat', targetSetsReps: '5 x 5', rest: '3 min', progressionCue: '+5-10 lb Wk4' },
            { id: 'b2-d2-2', exerciseId: 'conventional-deadlift', name: 'Conventional Deadlift', targetSetsReps: '4 x 4-5', rest: '3 min', progressionCue: '+5-10 lb Wk4' },
            { id: 'b2-d2-3', exerciseId: 'bulgarian-split-squat', name: 'Bulgarian Split Squat (DB)', targetSetsReps: '3 x 8 /leg', rest: '90s', progressionCue: '+5% load Wk4' },
            { id: 'b2-d2-4', exerciseId: 'nordic-hamstring-curl', name: 'Seated Leg Curl', targetSetsReps: '3 x 10', rest: '60s', progressionCue: '+5% load Wk4' },
            { id: 'b2-d2-5', exerciseId: 'copenhagen-plank', name: 'Weighted Plank', targetSetsReps: '3 x 45s', rest: '60s', progressionCue: '+10s or +load Wk4' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Full-Body Strength',
          focus: 'Posterior Chain & Loaded Armor',
          type: 'Strength / Power',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Dynamic band work, hip hinges with dowel, progressive trap bar pulls.',
          coolDownProtocol: '5 min: Low back traction hang from bar, quad stretch.',
          coachingNotes: 'Farmer\'s carries and complexes fortify the grip, traps, and midsection under heavy loads.',
          exercises: [
            { id: 'b2-d3-1', exerciseId: 'trap-bar-deadlift', name: 'Trap Bar Deadlift', targetSetsReps: '4 x 6', rest: '2 min', progressionCue: '+5-10 lb Wk4' },
            { id: 'b2-d3-2', exerciseId: 'hang-power-clean', name: 'Barbell Complex (DL + Row + Clean + Press)', targetSetsReps: '4 rds x 5 reps', rest: '2 min', progressionCue: '+5% load Wk4' },
            { id: 'b2-d3-3', exerciseId: 'farmers-carry', name: 'Heavy Farmer\'s Carry', targetSetsReps: '4 x 30m', rest: '2 min', progressionCue: '+5-10% load Wk4' },
            { id: 'b2-d3-4', exerciseId: 'push-press', name: 'Sandbag / Log Clean & Press', targetSetsReps: '4 x 6', rest: '2 min', progressionCue: '+5% load Wk4' },
            { id: 'b2-d3-5', exerciseId: 'sled-push-prowler', name: 'Sled Drag (Backward)', targetSetsReps: '3 x 20m', rest: '90s', progressionCue: '+5-10% load Wk4' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Conditioning & Core',
          focus: 'Loaded Sled & Interval Output',
          type: 'High-Intensity Conditioning',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Friday',
          warmUpProtocol: '5 min jump rope + dynamic leg swings.',
          coolDownProtocol: '5 min easy walk + hip flexor stretches.',
          coachingNotes: 'High mechanical output. Push the prowler like a freight train, maintain max split pace on rower.',
          exercises: [
            { id: 'b2-d4-1', exerciseId: 'sled-push-prowler', name: 'Prowler / Sled Sprint', targetSetsReps: '6 x 20m', rest: '90s', progressionCue: '+5% load Wk4' },
            { id: 'b2-d4-2', exerciseId: 'repeated-sprint-series', name: 'Rowing Sprint Intervals', targetSetsReps: '6 x 250m', rest: '90s', progressionCue: '+pace / speed Wk4' },
            { id: 'b2-d4-3', exerciseId: 'hanging-leg-raise', name: 'Hanging Leg Raise', targetSetsReps: '3 x 12-15', rest: '60s', progressionCue: '+2 reps Wk4' },
            { id: 'b2-d4-4', exerciseId: 'ab-wheel-rollout', name: 'Ab Wheel Rollout', targetSetsReps: '3 x 10-12', rest: '60s', progressionCue: '+2 reps or +ROM Wk4' }
          ]
        }
      ]
    },
    {
      id: 'boxing-block-3',
      title: 'Block 3 - Power',
      weeks: 'Weeks 5-6',
      weekNumbers: [5, 6],
      theme: 'Speed, Explosiveness & Velocity',
      emphasis: 'Convert Block 2 strength into lightning speed and punching power with Olympic lifts, jumps, and rotational throws.',
      prescription: 'Explosive lifts 4-5 x 3-5 | Plyometrics 3-5 x 5-8 (max quality, low volume) | Rest 2-3 min (full recovery)',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Upper Body Power',
          focus: 'Explosive Pressing & Pulling Snap',
          type: 'Power',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Light med ball chest passes, band dislocates, push press ramp-ups.',
          coolDownProtocol: '5 min: Lat stretch, pec minor foam rolling.',
          coachingNotes: 'Every single rep is 100% effort. Stop immediately if bar speed slows down.',
          exercises: [
            { id: 'b3-d1-1', exerciseId: 'push-press', name: 'Push Press', targetSetsReps: '5 x 3', rest: '3 min', progressionCue: '+5% load Wk6' },
            { id: 'b3-d1-2', exerciseId: 'weighted-pull-up', name: 'Explosive Pull-Up (max height)', targetSetsReps: '5 x 3-5', rest: '2-3 min', progressionCue: 'Add pause at top Wk6' },
            { id: 'b3-d1-3', exerciseId: 'plyo-push-up', name: 'Plyo Push-Up', targetSetsReps: '4 x 5', rest: '2 min', progressionCue: 'Add clap Wk6' },
            { id: 'b3-d1-4', exerciseId: 'hang-power-clean', name: 'Single-Arm Dumbbell Snatch', targetSetsReps: '4 x 5 /side', rest: '2 min', progressionCue: '+5% load Wk6' },
            { id: 'b3-d1-5', exerciseId: 'rotational-med-ball-throw', name: 'Medicine Ball Chest Pass', targetSetsReps: '4 x 6', rest: '90s', progressionCue: '+ball wt / distance Wk6' },
            { id: 'b3-d1-6', exerciseId: 'medicine-ball-slam', name: 'Medicine Ball Slam', targetSetsReps: '4 x 8', rest: '90s', progressionCue: '+ball wt Wk6' },
            { id: 'b3-d1-7', exerciseId: 'landmine-press', name: 'Landmine Press', targetSetsReps: '3 x 6', rest: '90s', progressionCue: '+5% load Wk6' },
            { id: 'b3-d1-8', exerciseId: 'barbell-bent-over-row', name: 'Renegade Row', targetSetsReps: '3 x 8 /side', rest: '90s', progressionCue: '+5% load Wk6' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Lower Body Power',
          focus: 'Jumps & Triple Extension',
          type: 'Power / Plyometrics',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Ankle pogos, bodyweight squats, knee-tuck hops.',
          coolDownProtocol: '5-10 min: Hip mobility, quad stretch.',
          coachingNotes: 'Land quietly like a spring. Quality over volume—absorb every impact through the hips and knees.',
          exercises: [
            { id: 'b3-d2-1', exerciseId: 'trap-bar-jump-squat', name: 'Trap Bar Jump Squat', targetSetsReps: '5 x 3', rest: '3 min', progressionCue: '+5% load Wk6' },
            { id: 'b3-d2-2', exerciseId: 'box-jump', name: 'Box Jump', targetSetsReps: '4 x 5', rest: '2 min', progressionCue: 'Raise box height Wk6' },
            { id: 'b3-d2-3', exerciseId: 'box-jump', name: 'Broad Jump', targetSetsReps: '4 x 5', rest: '2 min', progressionCue: '+distance Wk6' },
            { id: 'b3-d2-4', exerciseId: 'box-jump', name: 'Depth Jump (advanced)', targetSetsReps: '3 x 5', rest: '2-3 min', progressionCue: 'Raise drop height Wk6' },
            { id: 'b3-d2-5', exerciseId: 'bulgarian-split-squat', name: 'Bulgarian Split Squat Jump', targetSetsReps: '3 x 6 /leg', rest: '90s', progressionCue: '+1 rep/leg Wk6' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Full-Body Power',
          focus: 'Olympic Pull & Loaded Speed',
          type: 'Power',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Dowel cleans, kettlebell high pulls, lateral bounds warmup.',
          coolDownProtocol: '5 min: Spine decompression, gentle hamstring stretch.',
          coachingNotes: 'Violent hip extension. Jump the bar up and snap elbows through underneath fast.',
          exercises: [
            { id: 'b3-d3-1', exerciseId: 'hang-power-clean', name: 'Hang Power Clean', targetSetsReps: '5 x 3', rest: '3 min', progressionCue: '+5% load Wk6' },
            { id: 'b3-d3-2', exerciseId: 'hang-power-clean', name: 'Kettlebell Snatch', targetSetsReps: '5 x 5 /side', rest: '90s', progressionCue: '+5% load Wk6' },
            { id: 'b3-d3-3', exerciseId: 'sled-push-prowler', name: 'Sled Sprint (light load)', targetSetsReps: '6 x 15m', rest: '90s', progressionCue: '+speed Wk6' },
            { id: 'b3-d3-4', exerciseId: 'box-jump', name: 'Lateral Bound', targetSetsReps: '4 x 6 /side', rest: '90s', progressionCue: '+distance Wk6' },
            { id: 'b3-d3-5', exerciseId: 'turkish-get-up', name: 'Turkish Get-Up (speed focus)', targetSetsReps: '3 x 3 /side', rest: '90s', progressionCue: '+speed, same load Wk6' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Conditioning & Core',
          focus: 'Explosive Rotational Conditioning',
          type: 'Conditioning & Core',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Friday',
          warmUpProtocol: '5 min jump rope + dynamic rotational hip twists.',
          coolDownProtocol: '5 min light walk + deep abdominal cobra stretch.',
          coachingNotes: 'All-out sprints are true maximal efforts with full neurological recovery (90s-2min).',
          exercises: [
            { id: 'b3-d4-1', exerciseId: 'repeated-sprint-series', name: 'All-Out Sprints (track / bike / sled)', targetSetsReps: '6 x 20-30s', rest: '90s-2 min', progressionCue: '+speed Wk6' },
            { id: 'b3-d4-2', exerciseId: 'neck-armor-protocol', name: 'Battle Rope Power Slams', targetSetsReps: '5 x 20s max', rest: '40s', progressionCue: '+intensity Wk6' },
            { id: 'b3-d4-3', exerciseId: 'rotational-med-ball-throw', name: 'Rotational Med Ball Throw', targetSetsReps: '4 x 6 /side', rest: '90s', progressionCue: '+ball wt Wk6' },
            { id: 'b3-d4-4', exerciseId: 'hanging-leg-raise', name: 'Hanging Leg Raise', targetSetsReps: '3 x 12-15', rest: '60s', progressionCue: '+2 reps Wk6' }
          ]
        }
      ]
    },
    {
      id: 'boxing-block-4',
      title: 'Block 4 - Peak Athletic Conditioning',
      weeks: 'Weeks 7-8',
      weekNumbers: [7, 8],
      theme: 'High Density Peak & Taper',
      emphasis: 'Peak-week blend of strength, power, and high-density metabolic endurance. In Week 8, perform the Final Assessment.',
      prescription: 'Circuits / complexes, higher density | Rest 30-90s | Combine strength + power + conditioning',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Upper Body Circuit',
          focus: 'Pressing & Pulling Endurance',
          type: 'Density Circuit',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Jump rope + shoulder mobility + push-up prep.',
          coolDownProtocol: '5 min: Easy cooldown walk + chest and lat stretches.',
          coachingNotes: '40s work / 20s rest per station. Complete 4 rounds. Rest 90s between rounds.',
          exercises: [
            { id: 'b4-d1-1', exerciseId: 'dumbbell-bench-press', name: 'DB Bench Press (moderate load)', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d1-2', exerciseId: 'weighted-pull-up', name: 'Pull-Up', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d1-3', exerciseId: 'push-press', name: 'Push Press', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d1-4', exerciseId: 'one-arm-dumbbell-row', name: 'Dumbbell Row', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d1-5', exerciseId: 'plyo-push-up', name: 'Plyo Push-Up', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d1-6', exerciseId: 'neck-armor-protocol', name: 'Battle Ropes', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Lower Body Circuit',
          focus: 'Athletic Leg Endurance & Power',
          type: 'Density Circuit',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Mobility hip flow, bodyweight lunges, light jumps.',
          coolDownProtocol: '5 min: Quad and glute foam roll.',
          coachingNotes: '40s work / 20s rest per exercise. Repeat x 4 rounds, 90s rest between rounds.',
          exercises: [
            { id: 'b4-d2-1', exerciseId: 'front-squat', name: 'Front Squat (moderate load)', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d2-2', exerciseId: 'box-jump', name: 'Box Jump', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d2-3', exerciseId: 'bulgarian-split-squat', name: 'Walking Lunge', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' },
            { id: 'b4-d2-4', exerciseId: 'box-jump', name: 'Broad Jump', targetSetsReps: '40s work / 20s rest', rest: '20s', progressionCue: '+1 round Wk8' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Full-Body Peak Complex',
          focus: 'Barbell Complex + Retest Readiness',
          type: 'Complex & Sled',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Barbell warmups, empty bar technique flow.',
          coolDownProtocol: '5 min: Full body decompression.',
          coachingNotes: 'Complex: 5 clean reps each of Clean + Press + Squat + Row without setting bar down! In Week 8, do final assessment.',
          exercises: [
            { id: 'b4-d3-1', exerciseId: 'hang-power-clean', name: 'KB / Barbell Complex (Clean + Press + Squat + Row)', targetSetsReps: '5 rds x 5 reps', rest: '60-90s', progressionCue: '+1 round or load Wk8' },
            { id: 'b4-d3-2', exerciseId: 'sled-push-prowler', name: 'Sled Push Finisher', targetSetsReps: '4 x 20m', rest: '60s', progressionCue: '+load or speed Wk8' },
            { id: 'b4-d3-3', exerciseId: 'farmers-carry', name: 'Farmer\'s Carry Finisher', targetSetsReps: '3 x 40m', rest: '60s', progressionCue: '+load Wk8' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Peak Conditioning Finisher',
          focus: 'Max Output Ring Engine',
          type: 'Peak Conditioning',
          timeBudgetMinutes: 35,
          typicalPlacement: 'Friday',
          warmUpProtocol: '5 min jump rope easy.',
          coolDownProtocol: '10 min static stretching + breathing.',
          coachingNotes: '4 stations of 3-minute intervals with 1 minute rest (matches championship boxing rounds!).',
          exercises: [
            { id: 'b4-d4-1', exerciseId: 'sled-push-prowler', name: 'Sled Push / Prowler Sprint', targetSetsReps: '3 min interval', rest: '1 min', progressionCue: '+1 round Wk8' },
            { id: 'b4-d4-2', exerciseId: 'plyo-push-up', name: 'Bodyweight Combo (squat + push-up + burpee)', targetSetsReps: '3 min interval', rest: '1 min', progressionCue: '+reps Wk8' },
            { id: 'b4-d4-3', exerciseId: 'pogo-hops', name: 'Jump Rope', targetSetsReps: '3 min interval', rest: '1 min', progressionCue: '+double-unders Wk8' },
            { id: 'b4-d4-4', exerciseId: 'repeated-sprint-series', name: 'Rowing or Bike Sprint', targetSetsReps: '3 min interval', rest: '1 min', progressionCue: '+pace Wk8' }
          ]
        }
      ]
    }
  ],
  benchmarkTests: [
    { id: 'box-test-bench', name: 'Bench Press 1RM', protocol: '3RM x 1.08 or 1RM test', unit: 'kg / lb', proTarget: '1.3-1.5x BW', category: 'Strength', description: 'Upper body horizontal pressing force.' },
    { id: 'box-test-squat', name: 'Back Squat 1RM', protocol: '3RM x 1.08 or 1RM test', unit: 'kg / lb', proTarget: '1.7-1.9x BW', category: 'Strength', description: 'Lower body force production for punch foundation.' },
    { id: 'box-test-deadlift', name: 'Deadlift 1RM', protocol: '3RM x 1.08 or 1RM test', unit: 'kg / lb', proTarget: '2.0-2.2x BW', category: 'Strength', description: 'Posterior chain force transfer.' },
    { id: 'box-test-ohp', name: 'Overhead Press 1RM', protocol: 'Strict barbell press', unit: 'kg / lb', proTarget: '0.8-1.0x BW', category: 'Strength', description: 'Overhead stability and deltoid armor.' },
    { id: 'box-test-pullups', name: 'Max Strict Pull-Ups', protocol: 'Dead hang, chin over bar', unit: 'reps', proTarget: '15-20+ reps', category: 'Strength', description: 'Relative pulling endurance.' },
    { id: 'box-test-pushups', name: 'Max Push-Ups (1 min)', protocol: 'Chest to floor, full lockout in 60s', unit: 'reps', proTarget: '55-65+ reps', category: 'Power', description: 'Anterior pressing muscular endurance.' },
    { id: 'box-test-vjump', name: 'Vertical Jump', protocol: 'Countermovement jump, best of 3', unit: 'inches / cm', proTarget: '26-30 inches (66-76 cm)', category: 'Power', description: 'Lower-limb rate of force development.' },
    { id: 'box-test-mile', name: '1-Mile Run / 500m Row Time', protocol: 'All-out time trial', unit: 'min:sec', proTarget: 'Sub 5:45 mile / Sub 1:26 500m row', category: 'Conditioning', description: 'Aerobic-glycolytic engine capacity.' }
  ],
  recoveryRules: {
    sleep: 'Aim for 7-9 hours per night. Sleep is the primary physiological recovery engine.',
    protein: '0.8-1.0 g per lb of bodyweight daily (1.8-2.2 g/kg). Distribute evenly across 4 meals.',
    hydration: '3-4 liters of water minimum, plus electrolytes during high-sweat conditioning sessions.',
    deloadRule: 'If performance drops for 2+ sessions or joint discomfort arises, take an extra rest day and drop load 15-20%.',
    twoStrikeRule: 'If you miss a target rep ceiling two sessions in a row, hold weight steady or drop 10% to rebuild momentum.'
  },
  sourcesAndStandards: [
    { title: 'Physiological Profiles of Elite Boxers', citation: 'Chaabène et al., Sports Medicine (2015) 45:511–522' },
    { title: 'The Mechanical Characteristics of Punching in Boxing', citation: 'Lenetsky et al., Strength & Conditioning Journal (2013) 35(5):1-7' },
    { title: 'Periodization for Combat Athletes', citation: 'Bompa & Buzzichelli, Periodization: Theory and Methodology of Training (6th Edition)' }
  ]
};
