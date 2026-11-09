import { SportProgram } from '../../types/sport';

export const SOCCER_PROGRAM: SportProgram = {
  id: 'soccer',
  name: 'Soccer (Association Football)',
  badge: 'Hamstring Armor & High-Speed Tolerance',
  subtitle: 'Elite Football S&C: Relative Strength, Deceleration & MAS Conditioning',
  duration: '8 Weeks (3 Structured Phases: Resilience, Relative Strength, Match Speed)',
  frequency: '4 Sessions / Week (Capped at 50 Minutes)',
  heroImage: '/src/assets/images/sport_soccer_athlete_1791316815858.jpg',
  primaryGoals: [
    'Hamstring injury risk reduction via progressive eccentric overload (Nordic Hamstring Curls)',
    'Groin & adductor fortification against sports hernias (Copenhagen Adductor Planks)',
    'Elite multi-directional deceleration control and single-leg landing mechanics',
    'Maximal Aerobic Speed (MAS 120%) conditioning to sprint repeatedly across 90+ minutes'
  ],
  equipmentNeeded: [
    'Trap Bar & Bumper Plates',
    'Dumbbells & Nordic Bench / Straps',
    'Resistance Bands & Mini Hurdles',
    'Agility Cones & Measuring Tape',
    'Pitch or Turf Track for MAS Running'
  ],
  sportsSciencePrinciples: [
    {
      title: 'Hamstring Injury Mitigation (Nordic Overload)',
      description: 'Hamstring strains account for 37% of all muscle injuries in professional soccer. Petersen et al. demonstrated a 51% reduction in acute hamstring injuries using progressive eccentric Nordic curls by shifting the optimum length of tension to longer muscle fascicle lengths.',
      researchCitation: 'Petersen et al. (2011) Preventive Effect of Eccentric Training on Acute Hamstring Injuries in Men\'s Soccer, AJSM'
    },
    {
      title: 'Adductor Fortification (Copenhagen Protocol)',
      description: 'Adductor-related groin pain causes significant lost time in football. Harøy et al. verified that integrating progressive Copenhagen planks increases eccentric adductor strength by 13% and reduces groin problems by 41%.',
      researchCitation: 'Harøy et al. (2019) The Adductor Strengthening Programme Prevents Groin Problems in Male Football Players, BJSM'
    },
    {
      title: 'Maximal Aerobic Speed (MAS) Prescription',
      description: 'Elite footballers cover 10-13 km per match with intermittent maximal accelerations. 120% MAS intervals (15s run / 15s rest) maximize time spent near VO2 max without excessive neuromuscular breakdown.',
      researchCitation: 'Buchheit (2008) The 30-15 Intermittent Fitness Test & MAS Conditioning Principles'
    }
  ],
  phases: [
    {
      id: 'soccer-phase-1',
      title: 'Phase 1 - Movement Quality & Tissue Resilience',
      weeks: 'Weeks 1-3',
      weekNumbers: [1, 2, 3],
      theme: 'Hamstring & Groin Resilience Base',
      emphasis: 'Build eccentric hamstring tolerance, adductor strength, and single-leg stability to inoculate against match-play injuries.',
      prescription: 'Main lifts 3-4 x 8-10 | Nordic curls 3 x 6 (slow tempo) | Copenhagen 3 x 20-30s | Rest 60-90s',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Relative Force & Hamstring Armor',
          focus: 'Trap Bar Deadlift + Nordic Curls + Copenhagen Plank',
          type: 'Injury Prevention & Lower Force',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: FIFA 11+ dynamic warmup (running drills, hip in/out, knee lifts, calf bounces).',
          coolDownProtocol: '5 min: Quadriceps couch stretch + hamstring wall stretch.',
          coachingNotes: 'Slow 4-second descent on Nordic hamstring curls. Never rush the eccentric phase.',
          exercises: [
            { id: 'sc1-d1-1', exerciseId: 'trap-bar-deadlift', name: 'A · Trap Bar Deadlift', targetSetsReps: '4 x 8', rest: '2 min', progressionCue: '+5 kg when 4x8 is clean', supersetGroup: 'A' },
            { id: 'sc1-d1-2', exerciseId: 'nordic-hamstring-curl', name: 'B1 · Nordic Hamstring Curl', targetSetsReps: '3 x 6', rest: 'pair (60s)', progressionCue: '4s slow eccentric descent', supersetGroup: 'B1' },
            { id: 'sc1-d1-3', exerciseId: 'copenhagen-plank', name: 'B2 · Copenhagen Adductor Plank', targetSetsReps: '3 x 25s /side', rest: 'pair (60s)', progressionCue: '+5s hold per side Wk2', supersetGroup: 'B2' },
            { id: 'sc1-d1-4', exerciseId: 'romanian-deadlift', name: 'C1 · Single-Leg Romanian Deadlift (DB)', targetSetsReps: '3 x 8 /side', rest: 'pair (60s)', progressionCue: 'Strict pelvic levelness', supersetGroup: 'C1' },
            { id: 'sc1-d1-5', exerciseId: 'pogo-hops', name: 'C2 · Standing Calf / Achilles Iso-Hold', targetSetsReps: '3 x 15 (3s pause at top)', rest: 'pair (60s)', progressionCue: 'Achilles tendon stiffness', supersetGroup: 'C2' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Torso Shielding & Upper-Body Balance',
          focus: 'Dumbbell Bench + Chin-Ups + Anti-Rotation Core',
          type: 'Upper Stability & Armor',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Thoracic spine rotations, band dislocates, scap pushups.',
          coolDownProtocol: '5 min: Chest stretch + lat stretch.',
          coachingNotes: 'Builds upper body shielding strength to hold off defenders on the ball without adding excessive heavy mass.',
          exercises: [
            { id: 'sc1-d2-1', exerciseId: 'dumbbell-bench-press', name: 'A · Neutral-Grip Dumbbell Bench Press', targetSetsReps: '4 x 10', rest: '90s', progressionCue: '+2.5 kg DBs Wk2', supersetGroup: 'A' },
            { id: 'sc1-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Chin-Up (2s pause at top)', targetSetsReps: '3 x 8', rest: 'pair (60s)', progressionCue: 'Add weight once 8 reps clean', supersetGroup: 'B1' },
            { id: 'sc1-d2-3', exerciseId: 'face-pull', name: 'B2 · Face Pull & Scap Retraction', targetSetsReps: '3 x 15', rest: 'pair (60s)', progressionCue: 'Thumbs back', supersetGroup: 'B2' },
            { id: 'sc1-d2-4', exerciseId: 'landmine-press', name: 'C1 · Half-Kneeling Landmine Press', targetSetsReps: '3 x 8 /side', rest: 'pair (60s)', progressionCue: 'Pelvic stability', supersetGroup: 'C1' },
            { id: 'sc1-d2-5', exerciseId: 'copenhagen-plank', name: 'C2 · Half-Kneeling Pallof Press', targetSetsReps: '3 x 10 /side (3s hold)', rest: 'pair (60s)', progressionCue: 'Resist cable rotation', supersetGroup: 'C2' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Elastic Speed & Deceleration Mechanics',
          focus: 'Low Hurdle Pogos + 10-30m Acceleration + 5-0-5 Deceleration',
          type: 'Speed & Elastic Reactivity',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday (fresh pitch)',
          warmUpProtocol: '8 min: FIFA 11+ agility lines, high knees, butt kicks, 3 build-up sprints.',
          coolDownProtocol: '5 min: Walk + quad flush.',
          coachingNotes: 'Focus on crisp braking! Decelerating in 2-3 aggressive steps with low center of gravity prevents ACL shearing forces.',
          exercises: [
            { id: 'sc1-d3-1', exerciseId: 'pogo-hops', name: 'A · Low Hurdle Pogo Hops (Reactive Ankle)', targetSetsReps: '4 x 8 hurdles', rest: '90s', progressionCue: 'Quick ground contact (<200ms)', supersetGroup: 'A' },
            { id: 'sc1-d3-2', exerciseId: 'repeated-sprint-series', name: 'B · 10m & 20m Acceleration Sprints', targetSetsReps: '6 x (10m + 20m)', rest: '90s', progressionCue: 'Low shin angles, drive turf away', supersetGroup: 'B' },
            { id: 'sc1-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · 5-0-5 Deceleration Test Drill', targetSetsReps: '4 trials (2 left plant / 2 right plant)', rest: '2 min', progressionCue: 'Sprint 15m, turn at 10m, sprint back 5m', supersetGroup: 'C' },
            { id: 'sc1-d3-4', exerciseId: 'box-jump', name: 'D · Skater Jumps (Stick Landing)', targetSetsReps: '3 x 6 /side', rest: '60s', progressionCue: 'Absorb on single leg for 1.5s', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Power & 120% MAS Conditioning Engine',
          focus: 'Dumbbell Clean & Press + MAS 15s/15s Shuttles',
          type: 'Power & Aerobic Engine',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Light jog + dynamic stretches.',
          coolDownProtocol: '10 min: Active recovery walk + breathing.',
          coachingNotes: 'MAS protocol: Run at 120% of Maximal Aerobic Speed for 15s, rest 15s. Repeat 8-10 reps. The gold standard for soccer fitness.',
          exercises: [
            { id: 'sc1-d4-1', exerciseId: 'hang-power-clean', name: 'A · Dumbbell Hang Clean & Push Press', targetSetsReps: '4 x 6', rest: '90s', progressionCue: 'Hip extension into overhead punch', supersetGroup: 'A' },
            { id: 'sc1-d4-2', exerciseId: 'bulgarian-split-squat', name: 'B1 · Lateral Box Step-Up', targetSetsReps: '3 x 8 /side', rest: 'pair (60s)', progressionCue: 'Drive top leg', supersetGroup: 'B1' },
            { id: 'sc1-d4-3', exerciseId: 'rotational-med-ball-throw', name: 'B2 · Rotational Med Ball Throw', targetSetsReps: '3 x 6 /side', rest: 'pair (60s)', progressionCue: 'Wall rebound', supersetGroup: 'B2' },
            { id: 'sc1-d4-4', exerciseId: 'mas-shuttle-intervals', name: 'C · 120% MAS Shuttle Run Intervals', targetSetsReps: '10 x (15s run / 15s rest)', rest: '15s', progressionCue: 'Hit target cone on the beep', supersetGroup: 'C' }
          ]
        }
      ]
    },
    {
      id: 'soccer-phase-2',
      title: 'Phase 2 - Relative Strength & Deceleration Power',
      weeks: 'Weeks 4-6',
      weekNumbers: [4, 5, 6],
      theme: 'Single-Leg Force & Match Deceleration',
      emphasis: 'Increase absolute force ceiling to improve sprint speed, increase Nordic volume, and sharpen multi-directional cutting.',
      prescription: 'Main lifts 4 x 5-6 @ RPE 7-8 | Nordic 3 x 8 | Curvilinear sprinting drills',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Relative Force',
          focus: 'Back Squat + Nordic Curls + Single-Leg Control',
          type: 'Lower Strength',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Dynamic FIFA 11+.',
          coolDownProtocol: '5 min: Hamstring and hip mobility.',
          coachingNotes: 'Squat depth to parallel. Nordic curls up to 8 reps with 5s eccentric hold.',
          exercises: [
            { id: 'sc2-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Barbell Back Squat', targetSetsReps: '4 x 6', rest: '2-3 min', progressionCue: '+5 kg Wk5', supersetGroup: 'A' },
            { id: 'sc2-d1-2', exerciseId: 'nordic-hamstring-curl', name: 'B1 · Nordic Hamstring Curl', targetSetsReps: '3 x 8', rest: 'pair (60s)', progressionCue: '5s slow lowering', supersetGroup: 'B1' },
            { id: 'sc2-d1-3', exerciseId: 'copenhagen-plank', name: 'B2 · Copenhagen Adductor Plank (Long Lever)', targetSetsReps: '3 x 30s /side', rest: 'pair (60s)', progressionCue: 'Ankle on bench', supersetGroup: 'B2' },
            { id: 'sc2-d1-4', exerciseId: 'bulgarian-split-squat', name: 'C · Bulgarian Split Squat (DB)', targetSetsReps: '3 x 6 /leg', rest: '90s', progressionCue: '+2.5 kg DBs', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Stability & Core Armor',
          focus: 'Incline DB Press + Weighted Pull-Up + Rotational Power',
          type: 'Upper Strength',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Shoulder mobility.',
          coolDownProtocol: '5 min: Stretching.',
          coachingNotes: 'Keep bodyweight relative strength high.',
          exercises: [
            { id: 'sc2-d2-1', exerciseId: 'incline-dumbbell-press', name: 'A · Incline Dumbbell Press', targetSetsReps: '4 x 8', rest: '90s', progressionCue: '+2.5 kg DBs', supersetGroup: 'A' },
            { id: 'sc2-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Weighted Pull-Up', targetSetsReps: '3 x 6', rest: 'pair (60s)', progressionCue: '+2.5-5 kg belt', supersetGroup: 'B1' },
            { id: 'sc2-d2-3', exerciseId: 'face-pull', name: 'B2 · Face Pull', targetSetsReps: '3 x 15', rest: 'pair (60s)', progressionCue: 'Shoulder health', supersetGroup: 'B2' },
            { id: 'sc2-d2-4', exerciseId: 'rotational-med-ball-throw', name: 'C · Rotational Medicine Ball Scoop', targetSetsReps: '4 x 6 /side', rest: '60s', progressionCue: 'Explode through core', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Curvilinear Speed & Agility Cuts',
          focus: 'Curved Sprints + 180 Cuts + Reactive Pogos',
          type: 'Speed & Agility',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Sprint drills + curved strides.',
          coolDownProtocol: '5 min: Walk + quad stretch.',
          coachingNotes: 'Curvilinear sprinting trains the outer and inner foot forces used when running around defenders along the touchline.',
          exercises: [
            { id: 'sc2-d3-1', exerciseId: 'pogo-hops', name: 'A · Single-Leg Pogo Hops', targetSetsReps: '3 x 10 /leg', rest: '60s', progressionCue: 'Elastic reactive stiffness', supersetGroup: 'A' },
            { id: 'sc2-d3-2', exerciseId: 'repeated-sprint-series', name: 'B · Curvilinear Circle / Arc Sprints', targetSetsReps: '6 x 25m curve', rest: '90s', progressionCue: 'Inward lean, maintain velocity', supersetGroup: 'B' },
            { id: 'sc2-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · 5-0-5 Deceleration Cut Drills', targetSetsReps: '6 reps (3 left / 3 right)', rest: '90s', progressionCue: 'Sharp drop of center of gravity', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Repeat Sprint Ability & MAS Shuttles',
          focus: 'Jump Squats + 120% MAS Shuttles (12 Reps)',
          type: 'Conditioning Engine',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Dynamic warmup.',
          coolDownProtocol: '10 min: Flushing jog.',
          coachingNotes: 'Push MAS to 12 reps. Rest periods remain strictly 15 seconds.',
          exercises: [
            { id: 'sc2-d4-1', exerciseId: 'trap-bar-jump-squat', name: 'A · Trap Bar Jump Squat (Light)', targetSetsReps: '4 x 4', rest: '2 min', progressionCue: 'Fast velocity', supersetGroup: 'A' },
            { id: 'sc2-d4-2', exerciseId: 'mas-shuttle-intervals', name: 'B · 120% MAS Shuttle Intervals', targetSetsReps: '12 x (15s run / 15s rest)', rest: '15s', progressionCue: 'Match fitness summit', supersetGroup: 'B' },
            { id: 'sc2-d4-3', exerciseId: 'ab-wheel-rollout', name: 'C · Ab Wheel Rollout', targetSetsReps: '3 x 10', rest: '60s', progressionCue: 'Pelvic anti-extension', supersetGroup: 'C' }
          ]
        }
      ]
    },
    {
      id: 'soccer-phase-3',
      title: 'Phase 3 - Match Speed & Elastic Peak',
      weeks: 'Weeks 7-8',
      weekNumbers: [7, 8],
      theme: 'Match Velocity Peak & Retest Testing Battery',
      emphasis: 'Low volume, high velocity. Week 8 retests the official soccer testing battery (Yo-Yo IR1, 30m sprint, Nordic peak holds, CMJ).',
      prescription: '3 sets of 3-5 reps | Full recovery on speed | Taper Wk8',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Speed Squat & Hamstring Maintenance',
          focus: 'Speed Squats + Nordic Maintenance',
          type: 'Lower Power',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: FIFA 11+.',
          coolDownProtocol: '5 min: Foam rolling.',
          coachingNotes: 'Crisp quality. Keep hamstrings primed without inducing soreness.',
          exercises: [
            { id: 'sc3-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Speed Back Squat (60% load)', targetSetsReps: '4 x 3 fast', rest: '2 min', progressionCue: 'Explode up', supersetGroup: 'A' },
            { id: 'sc3-d1-2', exerciseId: 'nordic-hamstring-curl', name: 'B · Nordic Hamstring Curl', targetSetsReps: '3 x 4', rest: '90s', progressionCue: 'Pristine form', supersetGroup: 'B' },
            { id: 'sc3-d1-3', exerciseId: 'copenhagen-plank', name: 'C · Copenhagen Plank', targetSetsReps: '2 x 20s /side', rest: '60s', progressionCue: 'Adductor tone', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Speed & Push Press',
          focus: 'Dumbbell Bench + Chin-Ups Speed',
          type: 'Upper Power',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Arm swings.',
          coolDownProtocol: '5 min: Stretch.',
          coachingNotes: 'Speed reps with intent.',
          exercises: [
            { id: 'sc3-d2-1', exerciseId: 'dumbbell-bench-press', name: 'A · Speed DB Bench Press', targetSetsReps: '3 x 6 fast', rest: '90s', progressionCue: 'Fast punch off chest', supersetGroup: 'A' },
            { id: 'sc3-d2-2', exerciseId: 'weighted-pull-up', name: 'B · Bodyweight Chin-Up (Explosive)', targetSetsReps: '3 x 5', rest: '90s', progressionCue: 'Chest to bar', supersetGroup: 'B' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — 30m Sprint Timing & Agility Sharpen',
          focus: '30m Sprint Trials + 5-0-5 Agility Tune-Up',
          type: 'Speed Testing Prep',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Sprint warmup drills + 3 build-up runs.',
          coolDownProtocol: '5 min: Walk.',
          coachingNotes: 'Electronic or laser timing over 30 meters.',
          exercises: [
            { id: 'sc3-d3-1', exerciseId: 'repeated-sprint-series', name: 'A · 10m Acceleration Sprints', targetSetsReps: '4 x 10m', rest: '90s', progressionCue: 'First-step explosion', supersetGroup: 'A' },
            { id: 'sc3-d3-2', exerciseId: 'repeated-sprint-series', name: 'B · 30m Sprint Trials', targetSetsReps: '3 trials', rest: '3 min', progressionCue: 'Record best split', supersetGroup: 'B' },
            { id: 'sc3-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · 5-0-5 Agility Retest Drill', targetSetsReps: '3 trials', rest: '2 min', progressionCue: 'Laser cut timing', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Taper & Scorecard Retest Day',
          focus: 'Yo-Yo IR1 / MAS Test Battery',
          type: 'Testing Battery',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: FIFA 11+ protocol.',
          coolDownProtocol: '10 min: Complete recovery.',
          coachingNotes: 'Saturday Week 8: Execute Yo-Yo Intermittent Recovery Test Level 1 (or Bronco shuttle) and jump scorecard.',
          exercises: [
            { id: 'sc3-d4-1', exerciseId: 'box-jump', name: 'A · Countermovement Jump (CMJ)', targetSetsReps: '3 trials', rest: '90s', progressionCue: 'Best jump height (cm)' },
            { id: 'sc3-d4-2', exerciseId: 'mas-shuttle-intervals', name: 'B · Yo-Yo IR1 Test (or 1.5-Mile MAS Run)', targetSetsReps: '1 test battery', rest: '—', progressionCue: 'Record final stage and distance' }
          ]
        }
      ]
    }
  ],
  benchmarkTests: [
    { id: 'sc-test-yoyo', name: 'Yo-Yo Intermittent Recovery Test (Level 1)', protocol: 'Standard 20m shuttle audio beeps with 10s active recovery', unit: 'meters / level', proTarget: 'Elite: Level 18-20+ (1,800 - 2,400+ m)', category: 'Conditioning', description: 'Premier league standard for match repeated high-intensity running.' },
    { id: 'sc-test-30m', name: '30 m Sprint', protocol: 'Electronic timing gates, 3 trials', unit: 'sec', proTarget: '≤ 3.95-4.10 s (10m split ≤ 1.68s)', category: 'Speed', description: 'Breakaway sprint speed in open pitch play.' },
    { id: 'sc-test-10m', name: '10 m Acceleration', protocol: 'Electronic timing gates, 3 trials', unit: 'sec', proTarget: '≤ 1.68 s (elite ≤ 1.64 s)', category: 'Speed', description: 'First step burst to beat opponent to loose ball.' },
    { id: 'sc-test-cmj', name: 'Countermovement Jump (CMJ)', protocol: 'Hands on hips, best of 3 trials', unit: 'cm', proTarget: '≥ 42-48 cm', category: 'Power', description: 'Aerial duel capability and lower extremity elasticity.' },
    { id: 'sc-test-505', name: '5-0-5 Agility Test', protocol: 'Sprint 15m, turn on 10m mark, sprint back 5m', unit: 'sec', proTarget: '≤ 2.25-2.35 s', category: 'Speed', description: 'Measures pure deceleration and 180-degree change of direction.' },
    { id: 'sc-test-nordic', name: 'Nordic Hamstring Peak Force', protocol: 'NordBord load cell or 5s unassisted hold', unit: 'Newtons / sec', proTarget: '≥ 350-400 N (> 4 N/kg)', category: 'Strength', description: 'Direct biomarker for hamstring strain resilience.' }
  ],
  recoveryRules: {
    sleep: '7.5-9 hours. Essential for glycogen resynthesis and lower limb muscle tendon remodeling.',
    protein: '1.6-2.0 g per kg bodyweight. Focus on leucine-rich sources post-session.',
    hydration: 'Electrolyte replenishment. High sweat loss in running sessions requires 1.5L fluid per kg lost.',
    deloadRule: 'If groin or hamstring tightness scores > 3/10 during warmups, replace running with bike and perform isometrics.',
    twoStrikeRule: 'If missing rep floor on squat or Nordic curl for 2 sessions, reduce load 10% or shorten lever.'
  },
  sourcesAndStandards: [
    { title: 'Preventive Effect of Eccentric Training on Hamstring Injuries in Soccer', citation: 'Petersen et al., American Journal of Sports Medicine (2011) 39(11):2296–2303' },
    { title: 'The Adductor Strengthening Programme Prevents Groin Problems in Soccer', citation: 'Harøy et al., British Journal of Sports Medicine (2019) 53(3):150–157' },
    { title: 'The 30-15 Intermittent Fitness Test: Accuracy and Reliability for Soccer', citation: 'Buchheit, M., Journal of Strength and Conditioning Research (2008)' },
    { title: 'Physical Demands of Professional Soccer Match-Play', citation: 'Bangsbo et al., Journal of Sports Sciences (2006)' }
  ]
};
