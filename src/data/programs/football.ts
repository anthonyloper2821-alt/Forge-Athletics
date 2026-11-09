import { SportProgram } from '../../types/sport';

export const FOOTBALL_PROGRAM: SportProgram = {
  id: 'football',
  name: 'American Football',
  badge: 'Collision Armor & Alactic Velocity',
  subtitle: 'Gridiron S&C: Explosive Power, Deceleration & Collision Armor',
  duration: '8 Weeks (3 Structured Phases: Hypertrophy & Armor Base, Max Force, Explosive Peak)',
  frequency: '4 Sessions / Week (Play-Clock Conditioning)',
  heroImage: '/src/assets/images/sport_football_athlete_1791316805346.jpg',
  primaryGoals: [
    'Maximize horizontal acceleration and first-step explosion (0-10 yard burst)',
    'Fortify cervical spine, trapezius, and posterior chain to mitigate collision concussive impulse',
    'Develop elite rate of force development (RFD) to dominate line of scrimmage and contact leverage',
    'Build an alactic-aerobic conditioning engine matching true 4-6 second NFL play clocks with 30s resets'
  ],
  equipmentNeeded: [
    'Olympic Barbell & Bumper Plates',
    'Trap Bar (Hex Bar)',
    'Dumbbells & Heavy Sled / Prowler',
    'Plyometric Boxes & Medicine Balls (10-20 lb)',
    'Neck Harness or Resistance Bands'
  ],
  sportsSciencePrinciples: [
    {
      title: 'Alactic-Aerobic Energy System Specificity',
      description: 'American football plays average 4.8 to 6.2 seconds of maximal alactic anaerobic power, followed by 25 to 40 seconds of passive recovery between snaps. Conditioning mimics exact play-clock intervals to preserve maximal velocity rather than grinding lactic fatigue.',
      researchCitation: 'Hoffman (2014) Physiological Demands of American Football, Sports Medicine'
    },
    {
      title: 'Cervical Spine Armor & Concussion Risk Mitigation',
      description: 'Biomechanical research shows that every 1 lb increase in composite neck strength reduces concussion odds by 5%. Dedicated cervical flexion, extension, and lateral stabilization protocols are non-negotiable fixtures in all weekly blocks.',
      researchCitation: 'Collins et al. (2014) Neck Strength: A Protective Factor Against Concussions in High School Athletics'
    },
    {
      title: 'Triple-Extension Rate of Force Development (RFD)',
      description: 'Whether blocking in the trenches, driving off the line as a wide receiver, or tackling as a linebacker, ground-reaction force production in the initial 100-200 ms dictates athletic dominance.',
      researchCitation: 'Suchomel et al. (2016) The Importance of Muscular Strength in Athletic Performance'
    }
  ],
  phases: [
    {
      id: 'football-phase-1',
      title: 'Phase 1 - Hypertrophy & Armor Base',
      weeks: 'Weeks 1-3',
      weekNumbers: [1, 2, 3],
      theme: 'Armor Accumulation & Tissue Resilience',
      emphasis: 'Build protective lean tissue on shoulders, neck, and posterior chain. Re-groove heavy hinge and squat patterns.',
      prescription: 'Main lifts 4x8-10 @ RPE 7 | Armor pairs 3x10-12 | Rest 90-120s',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Force & Posterior Chain',
          focus: 'Trap Bar Deadlift + Single-Leg Stability + Nordic Curls',
          type: 'Lower Strength',
          timeBudgetMinutes: 55,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Bike 3 min + hip 90/90, glute bridges, ankle rocks, empty bar ramp-ups.',
          coolDownProtocol: '5 min: Hamstring floss, hip flexor stretch.',
          timeCrunchHierarchy: [
            'Cut 1st: Farmer\'s carry finisher (saves 5 min)',
            'Cut 2nd: Drop 4th round of Bulgarian split squats to 3',
            'Never cut: Trap bar deadlift or Nordic hamstring eccentrics.'
          ],
          emergency30MinProtocol: '5 min warm-up » Trap Bar Deadlift 4 sets » Nordic Curls 3 sets » 5 min sled push.',
          coachingNotes: 'Nordic curls preserve the biceps femoris during high-speed sprint decelerations. Control lowering!',
          exercises: [
            { id: 'fb1-d1-1', exerciseId: 'trap-bar-deadlift', name: 'A · Trap Bar Deadlift', targetSetsReps: '4 x 8', rest: '2-3 min', progressionCue: '+5-10 lb Wk2-3', supersetGroup: 'A' },
            { id: 'fb1-d1-2', exerciseId: 'nordic-hamstring-curl', name: 'B1 · Nordic Hamstring Eccentric', targetSetsReps: '3 x 6', rest: 'pair (60s)', progressionCue: 'Lower under 4s control', supersetGroup: 'B1' },
            { id: 'fb1-d1-3', exerciseId: 'hanging-leg-raise', name: 'B2 · Hanging Knee-to-Elbow', targetSetsReps: '3 x 10', rest: 'pair (60s)', progressionCue: '+2 reps', supersetGroup: 'B2' },
            { id: 'fb1-d1-4', exerciseId: 'bulgarian-split-squat', name: 'C1 · Bulgarian Split Squat (DB)', targetSetsReps: '3 x 8 /leg', rest: 'pair (60s)', progressionCue: '+5 lb dumbbells', supersetGroup: 'C1' },
            { id: 'fb1-d1-5', exerciseId: 'pogo-hops', name: 'C2 · Standing Heavy Calf / Soleus Raise', targetSetsReps: '3 x 12', rest: 'pair (60s)', progressionCue: '+5% load', supersetGroup: 'C2' },
            { id: 'fb1-d1-6', exerciseId: 'farmers-carry', name: 'D · Heavy Trap Bar Carry', targetSetsReps: '3 x 40m', rest: '90s', progressionCue: 'Build grip & shoulder girdle', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Armor & Horizontal Power',
          focus: 'Incline Bench + Heavy Pendlay Rows + Neck Fortification',
          type: 'Upper Strength',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Band face pulls, arm swings, scap push-ups + incline bench ramp-ups.',
          coolDownProtocol: '5 min: Pec stretch, lat stretch.',
          coachingNotes: 'Incline bench press directly mimics the 45-degree punch angle required for blocking and shedding tackles.',
          exercises: [
            { id: 'fb1-d2-1', exerciseId: 'barbell-bench-press', name: 'A · Incline Barbell Bench Press', targetSetsReps: '4 x 8', rest: '2-3 min', progressionCue: '+5-10 lb Wk2-3', supersetGroup: 'A' },
            { id: 'fb1-d2-2', exerciseId: 'barbell-bent-over-row', name: 'B1 · Pendlay Barbell Row (Floor Resets)', targetSetsReps: '4 x 8', rest: 'pair (60s)', progressionCue: 'Violent pull from dead stop', supersetGroup: 'B1' },
            { id: 'fb1-d2-3', exerciseId: 'face-pull', name: 'B2 · Cable Face Pull & External Rotation', targetSetsReps: '3 x 15', rest: 'pair (60s)', progressionCue: '+5% load', supersetGroup: 'B2' },
            { id: 'fb1-d2-4', exerciseId: 'landmine-press', name: 'C1 · Landmine Rotational Punch', targetSetsReps: '3 x 8 /side', rest: 'pair (60s)', progressionCue: 'Explode through rear hip', supersetGroup: 'C1' },
            { id: 'fb1-d2-5', exerciseId: 'weighted-dip', name: 'C2 · Parallel Bar Dip (Weighted)', targetSetsReps: '3 x 8', rest: 'pair (60s)', progressionCue: '+5 lb plate', supersetGroup: 'C2' },
            { id: 'fb1-d2-6', exerciseId: 'neck-armor-protocol', name: 'D · Cervical Neck Armor Circuit', targetSetsReps: 'Neck curls 2x15 + ext 2x15', rest: '60s', progressionCue: 'Slow 2s tempo, never skip', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Alactic Speed & Change of Direction',
          focus: 'Acceleration Flys + 5-10-5 Pro Agility + Contrast Jumps',
          type: 'Speed & Agility',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday (fresh legs)',
          warmUpProtocol: '8 min: Hurdle mobility, A-skips, prime leg swings + 3 build-up accelerations.',
          coolDownProtocol: '5 min: Walk + hip flush.',
          coachingNotes: '100% maximal speed. 5-10-5 Pro Agility drill measures NFL combine lateral change-of-direction.',
          exercises: [
            { id: 'fb1-d3-1', exerciseId: 'repeated-sprint-series', name: 'A · 10-Yard Acceleration Flys (Laser Intent)', targetSetsReps: '6 x 10 yds', rest: '90s', progressionCue: 'Explode out of 2-point stance', supersetGroup: 'A' },
            { id: 'fb1-d3-2', exerciseId: 'box-jump', name: 'B · Box Jump (Stick Landing)', targetSetsReps: '4 x 5', rest: '90s', progressionCue: 'Stick landing for 1 full second', supersetGroup: 'B' },
            { id: 'fb1-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · 5-10-5 Pro Agility Shuttle', targetSetsReps: '4 reps (2 left / 2 right)', rest: '2 min', progressionCue: 'Touch lines, drop hips low', supersetGroup: 'C' },
            { id: 'fb1-d3-4', exerciseId: 'rotational-med-ball-throw', name: 'D · Rotational Med Ball Scoop Toss', targetSetsReps: '4 x 6 /side', rest: '60s', progressionCue: 'Wall rebound velocity', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Contact Armor & Play-Clock Conditioning',
          focus: 'Push Press + Lateral Sled + 5s Play-Clock Drives',
          type: 'Power & Play-Clock Engine',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Dynamic stretch + push press ramp-ups.',
          coolDownProtocol: '5 min: Recovery breathing.',
          coachingNotes: 'Play-clock finisher: 5-6s maximal sled push drive, rest 30s (matches NFL play clock). Repeat 8 reps.',
          exercises: [
            { id: 'fb1-d4-1', exerciseId: 'push-press', name: 'A · Push Press (Triple Extension Drive)', targetSetsReps: '4 x 6', rest: '2 min', progressionCue: 'Legs drive, arms finish', supersetGroup: 'A' },
            { id: 'fb1-d4-2', exerciseId: 'one-arm-dumbbell-row', name: 'B1 · Heavy Kroc Row (DB)', targetSetsReps: '3 x 10 /side', rest: 'pair (60s)', progressionCue: 'Upper back thickness', supersetGroup: 'B1' },
            { id: 'fb1-d4-3', exerciseId: 'plyo-push-up', name: 'B2 · Explosive Plyo Push-Up', targetSetsReps: '3 x 6', rest: 'pair (60s)', progressionCue: 'Hands leave floor cleanly', supersetGroup: 'B2' },
            { id: 'fb1-d4-4', exerciseId: 'neck-armor-protocol', name: 'C · Football Shrug & Neck Isometric', targetSetsReps: 'Trap bar shrugs 3x12 + 4-way iso', rest: '60s', progressionCue: 'Trapezius collision pad', supersetGroup: 'C' },
            { id: 'fb1-d4-5', exerciseId: 'sled-push-prowler', name: 'D · Play-Clock Sled Drive Finisher', targetSetsReps: '8 x (5s max push / 30s rest)', rest: '30s', progressionCue: 'Mimics 8-play goal-line drive', supersetGroup: 'D' }
          ]
        }
      ]
    },
    {
      id: 'football-phase-2',
      title: 'Phase 2 - Maximal Force & Collision Power',
      weeks: 'Weeks 4-6',
      weekNumbers: [4, 5, 6],
      theme: 'High-Load Compound Strength',
      emphasis: 'Heavy 4-5 rep sets. Transitioning base hypertrophy into absolute force output across squats, benches, and cleans.',
      prescription: 'Main lifts 4-5x5 @ RPE 8 | Rest 2-3 min | Heavy explosive speed',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Max Force',
          focus: 'Back Squat 5x5 + Heavy RDL',
          type: 'Lower Strength',
          timeBudgetMinutes: 55,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Squat mobility + bar ramp-ups.',
          coolDownProtocol: '5 min: Walking + stretching.',
          coachingNotes: 'Spread the floor on squats. Heavy force transfers into driving defenders backward.',
          exercises: [
            { id: 'fb2-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Barbell Back Squat', targetSetsReps: '5 x 5', rest: '3 min', progressionCue: '+5-10 lb Wk5', supersetGroup: 'A' },
            { id: 'fb2-d1-2', exerciseId: 'romanian-deadlift', name: 'B1 · Barbell Romanian Deadlift', targetSetsReps: '4 x 6', rest: 'pair (60s)', progressionCue: '+5% load', supersetGroup: 'B1' },
            { id: 'fb2-d1-3', exerciseId: 'nordic-hamstring-curl', name: 'B2 · Nordic Hamstring Curl', targetSetsReps: '3 x 5', rest: 'pair (60s)', progressionCue: '5s slow descent', supersetGroup: 'B2' },
            { id: 'fb2-d1-4', exerciseId: 'bulgarian-split-squat', name: 'C · Bulgarian Split Squat (Heavy DB)', targetSetsReps: '3 x 6 /leg', rest: '90s', progressionCue: '+5 lb dumbbells', supersetGroup: 'C' },
            { id: 'fb2-d1-5', exerciseId: 'farmers-carry', name: 'D · Heavy Suitcase Carry', targetSetsReps: '3 x 30m /side', rest: '90s', progressionCue: 'Resist lateral spinal lean', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Force & Collarbone Armor',
          focus: 'Barbell Flat Bench 5x5 + Weighted Pull-Ups',
          type: 'Upper Strength',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Bench ramp-up sets.',
          coolDownProtocol: '5 min: Upper body release.',
          coachingNotes: 'NFL Combine uses 225 lb bench press reps. Build maximal 1RM force to elevate repetition endurance.',
          exercises: [
            { id: 'fb2-d2-1', exerciseId: 'barbell-bench-press', name: 'A · Barbell Bench Press', targetSetsReps: '5 x 5', rest: '3 min', progressionCue: '+5 lb Wk5', supersetGroup: 'A' },
            { id: 'fb2-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Weighted Pull-Up', targetSetsReps: '4 x 5', rest: 'pair (60s)', progressionCue: 'Add weight plate', supersetGroup: 'B1' },
            { id: 'fb2-d2-3', exerciseId: 'face-pull', name: 'B2 · Face Pull', targetSetsReps: '3 x 15', rest: 'pair (60s)', progressionCue: '+5% load', supersetGroup: 'B2' },
            { id: 'fb2-d2-4', exerciseId: 'standing-overhead-press', name: 'C · Push Press (Barbell)', targetSetsReps: '4 x 5', rest: '2 min', progressionCue: '+5 lb', supersetGroup: 'C' },
            { id: 'fb2-d2-5', exerciseId: 'neck-armor-protocol', name: 'D · Neck Extension & Curl Harness', targetSetsReps: '3 x 15 each', rest: '60s', progressionCue: 'Heavy armor', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Speed, Combine Agility & Contrast',
          focus: 'Trap Bar Jump Squats + 20-Yard Flying Sprints',
          type: 'Speed & Power',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Speed drills, ankle pogos, 3 build-up sprints.',
          coolDownProtocol: '5 min: Walk + quad flush.',
          coachingNotes: 'Contrast pairing: perform trap bar jumps, rest 2 min, then execute flying sprint for post-activation potentiation (PAP).',
          exercises: [
            { id: 'fb2-d3-1', exerciseId: 'trap-bar-jump-squat', name: 'A · Trap Bar Jump Squat (20% 1RM)', targetSetsReps: '5 x 3', rest: '2 min', progressionCue: 'Maximum vertical air', supersetGroup: 'A' },
            { id: 'fb2-d3-2', exerciseId: 'repeated-sprint-series', name: 'B · 20-Yard Flying Accelerations', targetSetsReps: '6 x 20 yds', rest: '2 min', progressionCue: 'Laser split timing', supersetGroup: 'B' },
            { id: 'fb2-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · Pro Agility 5-10-5 Shuttle', targetSetsReps: '6 reps total', rest: '90s', progressionCue: 'Aim for sub 4.30s', supersetGroup: 'C' },
            { id: 'fb2-d3-4', exerciseId: 'rotational-med-ball-throw', name: 'D · Heavy Rotational Wall Slam', targetSetsReps: '4 x 6 /side', rest: '60s', progressionCue: '15-20 lb med ball', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Full-Body Power & Drive Engine',
          focus: 'Hang Cleans + Heavy Sled Pulls + Armor',
          type: 'Power & Conditioning',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Dowel cleans, knee-tucks.',
          coolDownProtocol: '5 min: Breathing.',
          coachingNotes: 'Olympic cleans transfer hip-knee extension to dominant shedding of blocks on the gridiron.',
          exercises: [
            { id: 'fb2-d4-1', exerciseId: 'hang-power-clean', name: 'A · Hang Power Clean', targetSetsReps: '5 x 3 @ 75%', rest: '2 min', progressionCue: 'Explosive hip extension', supersetGroup: 'A' },
            { id: 'fb2-d4-2', exerciseId: 'incline-dumbbell-press', name: 'B1 · Incline Dumbbell Bench', targetSetsReps: '4 x 6', rest: 'pair (60s)', progressionCue: '+5 lb DBs', supersetGroup: 'B1' },
            { id: 'fb2-d4-3', exerciseId: 'barbell-bent-over-row', name: 'B2 · Chest-Supported Row', targetSetsReps: '4 x 8', rest: 'pair (60s)', progressionCue: 'Strong rhomboids', supersetGroup: 'B2' },
            { id: 'fb2-d4-4', exerciseId: 'sled-push-prowler', name: 'C · Heavy Prowler Sprint Series', targetSetsReps: '6 x 20m', rest: '90s', progressionCue: '+10% load', supersetGroup: 'C' }
          ]
        }
      ]
    },
    {
      id: 'football-phase-3',
      title: 'Phase 3 - Explosive Peak & Combine Retest',
      weeks: 'Weeks 7-8',
      weekNumbers: [7, 8],
      theme: 'Peak Velocity & Combine Testing',
      emphasis: 'Low volume, maximal neurological sharpness. Week 8 retests the official football testing battery (40yd dash, 225 bench, vertical, pro agility).',
      prescription: '3-4 sets of 3 reps fast | Full rest | Retest on Saturday Week 8',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Power & Speed Squat',
          focus: 'Speed Squats 4x3 fast + Broad Jump',
          type: 'Lower Power',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Speed drills.',
          coolDownProtocol: '5 min: Mobility.',
          coachingNotes: 'Bar must move with blistering speed. Stop set if bar slows down.',
          exercises: [
            { id: 'fb3-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Speed Back Squat (60-65% load)', targetSetsReps: '4 x 3 fast', rest: '2 min', progressionCue: 'Sub-0.5s ascent speed', supersetGroup: 'A' },
            { id: 'fb3-d1-2', exerciseId: 'box-jump', name: 'B · Standing Broad Jump', targetSetsReps: '4 x 3', rest: '90s', progressionCue: 'Record max distance (m / inches)', supersetGroup: 'B' },
            { id: 'fb3-d1-3', exerciseId: 'nordic-hamstring-curl', name: 'C · Nordic Hamstring Curl', targetSetsReps: '3 x 4', rest: '90s', progressionCue: 'High tension maintenance', supersetGroup: 'C' },
            { id: 'fb3-d1-4', exerciseId: 'copenhagen-plank', name: 'D · Copenhagen Adductor Hold', targetSetsReps: '3 x 25s /side', rest: '60s', progressionCue: 'Pelvic stability', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Speed & Push Press',
          focus: 'Speed Bench 4x3 + Push Press + Neck Retest',
          type: 'Upper Power',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Shoulder mobility.',
          coolDownProtocol: '5 min: Stretching.',
          coachingNotes: 'Peak upper body velocity in preparation for testing week.',
          exercises: [
            { id: 'fb3-d2-1', exerciseId: 'barbell-bench-press', name: 'A · Speed Barbell Bench (65% load)', targetSetsReps: '4 x 3 fast', rest: '2 min', progressionCue: 'Max acceleration off chest', supersetGroup: 'A' },
            { id: 'fb3-d2-2', exerciseId: 'push-press', name: 'B · Push Press', targetSetsReps: '4 x 3', rest: '2 min', progressionCue: 'Explosive drive', supersetGroup: 'B' },
            { id: 'fb3-d2-3', exerciseId: 'weighted-pull-up', name: 'C · Explosive Chin-Up', targetSetsReps: '3 x 4', rest: '90s', progressionCue: 'Fast chin over bar', supersetGroup: 'C' },
            { id: 'fb3-d2-4', exerciseId: 'neck-armor-protocol', name: 'D · Neck Armor Maintenance', targetSetsReps: '2 x 15', rest: '60s', progressionCue: 'Concussion armor ready', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — 40-Yard Dash Mechanics & Agility Sharpness',
          focus: '40-Yard Stance & Starts + Pro Agility Tune-Up',
          type: 'Speed Testing Prep',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Sprint warmup drills + 3 build-up runs.',
          coolDownProtocol: '5 min: Walk + foam roll.',
          coachingNotes: 'Perfect your 3-point or 2-point stance. First 10 yards are critical for elite 40-yard time.',
          exercises: [
            { id: 'fb3-d3-1', exerciseId: 'repeated-sprint-series', name: 'A · 10-Yard Starts from Stance', targetSetsReps: '5 x 10 yds', rest: '2 min', progressionCue: 'Zero false steps', supersetGroup: 'A' },
            { id: 'fb3-d3-2', exerciseId: 'repeated-sprint-series', name: 'B · 40-Yard Sprint Timing', targetSetsReps: '3 trials', rest: '3 min', progressionCue: 'Record laser or stopwatch split', supersetGroup: 'B' },
            { id: 'fb3-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · 5-10-5 Pro Agility Tune-up', targetSetsReps: '3 trials', rest: '2 min', progressionCue: 'Sharp deceleration and cut', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Taper & Combine Scorecard Day',
          focus: 'Taper Review & Saturday Retest Battery',
          type: 'Combine Retest',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Dynamic full-body testing warmup.',
          coolDownProtocol: '10 min: Complete post-test recovery.',
          coachingNotes: 'Saturday Week 8: Execute the official football testing battery. Compare Week 0 vs Week 8 numbers!',
          exercises: [
            { id: 'fb3-d4-1', exerciseId: 'trap-bar-jump-squat', name: 'A · Vertical Jump Test', targetSetsReps: '3 trials', rest: '90s', progressionCue: 'Best of 3 attempts' },
            { id: 'fb3-d4-2', exerciseId: 'barbell-bench-press', name: 'B · 225-lb Bench Press Reps (or 1RM)', targetSetsReps: '1 all-out set', rest: '3 min', progressionCue: 'NFL Combine benchmark' },
            { id: 'fb3-d4-3', exerciseId: 'box-jump', name: 'C · Standing Broad Jump', targetSetsReps: '3 trials', rest: '90s', progressionCue: 'Best of 3 attempts' },
            { id: 'fb3-d4-4', exerciseId: 'sled-push-prowler', name: 'D · 10-Yard Fly & Pro Agility', targetSetsReps: 'Final trials', rest: '2 min', progressionCue: 'Log on scorecard' }
          ]
        }
      ]
    }
  ],
  benchmarkTests: [
    { id: 'fb-test-40yd', name: '40-Yard Dash', protocol: 'Electronic or laser timed, 3 trials', unit: 'sec', proTarget: 'Skill < 4.50s | LB < 4.65s | Line < 5.10s', category: 'Speed', description: 'NFL marquee sprint benchmark.' },
    { id: 'fb-test-10yd', name: '10-Yard Split', protocol: 'First 10 yards of 40-yard dash', unit: 'sec', proTarget: 'Skill ≤ 1.52s | LB ≤ 1.58s | Line ≤ 1.75s', category: 'Speed', description: 'Measures explosive first-step drive and initial burst.' },
    { id: 'fb-test-vjump', name: 'Vertical Jump', protocol: 'Vertec or jump mat countermovement', unit: 'inches', proTarget: 'Skill 35-40+ in | LB 33-37 in | Line 28-32 in', category: 'Power', description: 'Lower extremity rate of force development.' },
    { id: 'fb-test-bjump', name: 'Broad Jump', protocol: 'Standing two-foot horizontal leap', unit: 'in / cm', proTarget: 'Skill ≥ 122 in (3.10m) | Line ≥ 105 in (2.67m)', category: 'Power', description: 'Horizontal hip propulsion power.' },
    { id: 'fb-test-agility', name: '5-10-5 Pro Agility Shuttle', protocol: 'NFL 20-yard shuttle, best of 3', unit: 'sec', proTarget: 'Skill ≤ 4.15s | LB ≤ 4.25s | Line ≤ 4.60s', category: 'Speed', description: 'Short-space lateral change-of-direction and deceleration.' },
    { id: 'fb-test-bench225', name: '225-lb Bench Press', protocol: 'Strict repetitions at 225 lb (102 kg)', unit: 'reps', proTarget: 'Skill 15-20 reps | LB 20-26 reps | Line 28-35+ reps', category: 'Strength', description: 'NFL Combine horizontal endurance benchmark.' },
    { id: 'fb-test-squat', name: 'Back Squat 1RM', protocol: '3RM x 1.08 = est. 1RM', unit: 'lb / kg', proTarget: '2.0-2.2x BW', category: 'Strength', description: 'Lower body absolute collision drive.' },
    { id: 'fb-test-clean', name: 'Power Clean 1RM', protocol: 'From floor or hang', unit: 'lb / kg', proTarget: '1.4-1.6x BW', category: 'Power', description: 'Whole-body explosive triple extension.' }
  ],
  recoveryRules: {
    sleep: '8+ hours required. High neural collision sports require deep slow-wave sleep for CNS repair.',
    protein: '2.0-2.4 g per kg bodyweight. Repair muscle trauma from contact drills and heavy lifting.',
    hydration: 'Hydrate with electrolytes (sodium/potassium) to avoid cramping under heavy sled drives.',
    deloadRule: 'If CNS velocity drops > 10% on jump tests, cut lifting volume by 50% for 5 days.',
    twoStrikeRule: 'If failing target reps 2 sessions in a row, regress load 10% or swap to safety bar variation.'
  },
  sourcesAndStandards: [
    { title: 'NFL Combine Performance Norms & Positional Standards', citation: 'National Football League Scouting Combine Official Archives' },
    { title: 'Physiological Demands and Testing in American Football', citation: 'Hoffman, J., Human Kinetics & Sports Medicine (2014)' },
    { title: 'Neck Strength and Concussion Prevention in Contact Athletes', citation: 'Collins et al., Journal of Primary Prevention (2014) 35:309–319' },
    { title: 'Periodization and Velocity-Based Training for Gridiron Athletes', citation: 'Mann et al., NSCA Coach & Performance (2015)' }
  ]
};
