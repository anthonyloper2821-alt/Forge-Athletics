import { SportProgram } from '../../types/sport';

export const BASKETBALL_PROGRAM: SportProgram = {
  id: 'basketball',
  name: 'Basketball',
  badge: 'Vertical RFD & Tendon Armor',
  subtitle: 'Elite Hoops S&C: Vertical Explosion, Patellar Tendon Armor & Court Agility',
  duration: '8 Weeks (3 Structured Phases: Tendon Armor, RFD Force, Reactive Peak)',
  frequency: '4 Sessions / Week (Capped at 50 Minutes)',
  heroImage: '/src/assets/images/sport_basketball_athlete_1791316825237.jpg',
  primaryGoals: [
    'Maximize standing and maximum-approach vertical jump height (RFD & penultimate footwork)',
    'Fortify patellar and Achilles tendons against jumper\'s knee via heavy slow isometrics',
    'Develop reactive elastic stiffness (short ground contact time < 180 ms) for repeat rebounding',
    'Build multi-directional change-of-direction and deceleration capacity on unforgiving hardwood'
  ],
  equipmentNeeded: [
    'Barbell & Trap Bar',
    'Heavy Resistance Loop Bands (for Spanish Squats)',
    'Dumbbells & Medicine Balls',
    'Plyo Boxes (24-36 inch)',
    'Full Basketball Court for Lane Agility & 17s Shuttles'
  ],
  sportsSciencePrinciples: [
    {
      title: 'Patellar Tendon Fortification (Rio Isometric Protocol)',
      description: 'Patellar tendinopathy (jumper\'s knee) afflicts up to 45% of elite basketball players due to repetitive high-deceleration landing forces. Rio et al. showed that 5x45-second heavy isometric quadriceps holds (Spanish Squats) produce immediate analgesia and relieve cortical muscle inhibition.',
      researchCitation: 'Rio et al. (2015) Isometric Exercise Induces Analgesia and Reduces Inhibition in Patellar Tendinopathy, BJSM'
    },
    {
      title: 'Rate of Force Development (RFD) & Penultimate Step Mechanics',
      description: 'Vertical jumping in basketball occurs within 300-400 ms during standing dunks and < 250 ms in approach dunks. Training transitions from absolute slow strength to high-velocity trap bar jump squats and penultimate footwork plant drills.',
      researchCitation: 'Suchomel et al. (2018) Force-Time Characteristics and Vertical Jump Performance in Basketball Athletes'
    },
    {
      title: 'Elastic Reactive Strength Index (RSI)',
      description: 'Rebounding and repeat shot-blocking require instantaneous ankle-knee stiffness. Continuous hurdle hops and pogo progressions train the stretch-shortening cycle (SSC) to bounce elastically with minimum ground dwell time.',
      researchCitation: 'Flanagan & Comyns (2008) The Use of Contact Time and the Reactive Strength Index to Optimize Plyometrics'
    }
  ],
  phases: [
    {
      id: 'hoops-phase-1',
      title: 'Phase 1 - Tendon Armor & Jumping Foundation',
      weeks: 'Weeks 1-3',
      weekNumbers: [1, 2, 3],
      theme: 'Tendon Fortification & Bilateral Base',
      emphasis: 'Build patellar tendon resilience with Spanish squat isometrics, strengthen ankle complexes, and establish squat/hinge force capacity.',
      prescription: 'Main lifts 4x8-10 @ RPE 7 | Spanish squat isometrics 4x45s | Controlled landing plyos',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Vertical Force & Patellar Tendon Armor',
          focus: 'Trap Bar Deadlift + Spanish Squat Isometrics + Calf Stiffness',
          type: 'Lower Strength & Tendon Armor',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Ankle mobilizations, glute bridges, band knee drives + 2 sets Spanish squat warmup holds.',
          coolDownProtocol: '5 min: Quadriceps couch stretch + foam rolling calves and IT bands.',
          coachingNotes: 'Spanish squat holds must be heavy and static with vertical shins. Keep thighs parallel to floor for full 45s.',
          exercises: [
            { id: 'bb1-d1-1', exerciseId: 'trap-bar-deadlift', name: 'A · Trap Bar Deadlift', targetSetsReps: '4 x 8', rest: '2 min', progressionCue: '+5 kg when 4x8 is clean', supersetGroup: 'A' },
            { id: 'bb1-d1-2', exerciseId: 'spanish-squat-isometric', name: 'B1 · Spanish Squat Isometric Hold', targetSetsReps: '4 x 45s holds', rest: 'pair (60s)', progressionCue: 'Add dumbbell goblet load Wk2', supersetGroup: 'B1' },
            { id: 'bb1-d1-3', exerciseId: 'pogo-hops', name: 'B2 · Heavy Single-Leg Calf Raise (3s top pause)', targetSetsReps: '4 x 12 /leg', rest: 'pair (60s)', progressionCue: '+2.5 kg dumbbell', supersetGroup: 'B2' },
            { id: 'bb1-d1-4', exerciseId: 'bulgarian-split-squat', name: 'C1 · Bulgarian Split Squat (DB)', targetSetsReps: '3 x 8 /leg', rest: 'pair (60s)', progressionCue: 'Front shin vertical', supersetGroup: 'C1' },
            { id: 'bb1-d1-5', exerciseId: 'hanging-leg-raise', name: 'C2 · Hanging Leg Raise', targetSetsReps: '3 x 10', rest: 'pair (60s)', progressionCue: 'Strict hollow body', supersetGroup: 'C2' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Rebounding Power & Overhead Armor',
          focus: 'Incline DB Press + Chin-Ups + Delts & Rotator Cuff',
          type: 'Upper Strength & Armor',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Band face pulls, arm circles, overhead reach drills.',
          coolDownProtocol: '5 min: Pec doorway stretch + lat stretch.',
          coachingNotes: 'Builds upper body length, reach stability, and grip strength for contested rebounds.',
          exercises: [
            { id: 'bb1-d2-1', exerciseId: 'incline-dumbbell-press', name: 'A · Incline Dumbbell Neutral Press', targetSetsReps: '4 x 8', rest: '90s', progressionCue: '+2.5 kg DBs', supersetGroup: 'A' },
            { id: 'bb1-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Weighted Neutral-Grip Chin-Up', targetSetsReps: '3 x 8', rest: 'pair (60s)', progressionCue: 'Bodyweight or +2.5 kg belt', supersetGroup: 'B1' },
            { id: 'bb1-d2-3', exerciseId: 'face-pull', name: 'B2 · Cable Face Pull & External Rotation', targetSetsReps: '3 x 15', rest: 'pair (60s)', progressionCue: 'Scapular control', supersetGroup: 'B2' },
            { id: 'bb1-d2-4', exerciseId: 'standing-overhead-press', name: 'C1 · Push Press (Triple Extension Drive)', targetSetsReps: '3 x 6', rest: 'pair (60s)', progressionCue: '+5 lb on bar', supersetGroup: 'C1' },
            { id: 'bb1-d2-5', exerciseId: 'ab-wheel-rollout', name: 'C2 · Ab Wheel Rollout', targetSetsReps: '3 x 10', rest: 'pair (60s)', progressionCue: 'Anti-extension stability', supersetGroup: 'C2' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Elastic Plyometrics & Court Footwork',
          focus: 'Continuous Hurdle Hops + Box Jump Stick + Lane Agility',
          type: 'Plyometrics & Agility',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday (fresh court)',
          warmUpProtocol: '8 min: Dynamic high knees, defensive slides, ankle pogos, 3 short build-up runs.',
          coolDownProtocol: '5 min: Walking + calf stretches.',
          coachingNotes: 'Focus on silent landings. In hurdle hops, minimize ground contact time (<200 ms).',
          exercises: [
            { id: 'bb1-d3-1', exerciseId: 'pogo-hops', name: 'A · Reactive Ankle Pogo Hops', targetSetsReps: '4 x 15 reps', rest: '60s', progressionCue: 'Stiff spring ankles', supersetGroup: 'A' },
            { id: 'bb1-d3-2', exerciseId: 'box-jump', name: 'B · Hurdle Hop to Box Jump (Stick Landing)', targetSetsReps: '4 x 5', rest: '90s', progressionCue: 'Absorb through hips softly', supersetGroup: 'B' },
            { id: 'bb1-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · Pro Lane Agility Drill (NBA Combine)', targetSetsReps: '4 trials (2 clockwise / 2 counter)', rest: '2 min', progressionCue: 'Sprint, defensive slide, backpedal', supersetGroup: 'C' },
            { id: 'bb1-d3-4', exerciseId: 'rotational-med-ball-throw', name: 'D · Rotational Med Ball Throw', targetSetsReps: '3 x 6 /side', rest: '60s', progressionCue: 'Hip rotation', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Full-Body Power & 17-Second Court Engine',
          focus: 'Dumbbell Snatch + Step-Ups + 17s Shuttles',
          type: 'Power & Fastbreak Engine',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Full body dynamic warmup.',
          coolDownProtocol: '10 min: Active walk + recovery hydration.',
          coachingNotes: '17-second shuttles: full court baseline-to-baseline touches. 17 touches in 17 seconds, rest 45-60s.',
          exercises: [
            { id: 'bb1-d4-1', exerciseId: 'hang-power-clean', name: 'A · Single-Arm Dumbbell Snatch', targetSetsReps: '4 x 5 /side', rest: '90s', progressionCue: '+5% load', supersetGroup: 'A' },
            { id: 'bb1-d4-2', exerciseId: 'bulgarian-split-squat', name: 'B1 · Explosive Box Step-Up with High Knee', targetSetsReps: '3 x 6 /leg', rest: 'pair (60s)', progressionCue: 'Punch top knee high', supersetGroup: 'B1' },
            { id: 'bb1-d4-3', exerciseId: 'medicine-ball-slam', name: 'B2 · Overhead Medicine Ball Slam', targetSetsReps: '3 x 8', rest: 'pair (60s)', progressionCue: 'Violent abdominal snap', supersetGroup: 'B2' },
            { id: 'bb1-d4-4', exerciseId: 'court-17s-intervals', name: 'C · 17-Second Full-Court Shuttles', targetSetsReps: '6 x (17s sprint / 50s rest)', rest: '50s', progressionCue: 'Fastbreak endurance crucible', supersetGroup: 'C' }
          ]
        }
      ]
    },
    {
      id: 'hoops-phase-2',
      title: 'Phase 2 - Maximal Rate of Force Development',
      weeks: 'Weeks 4-6',
      weekNumbers: [4, 5, 6],
      theme: 'RFD Velocity & Contrast Jumping',
      emphasis: 'Contrast heavy strength with explosive jumps. Shift from bilateral base into maximum approach vertical jumping.',
      prescription: 'Trap bar jumps with 15-20% load | Penultimate footwork approach jumps | Heavy squats 4x5',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Vertical RFD & Heavy Compounds',
          focus: 'Trap Bar Jump Squats + Front Squat + Spanish Holds',
          type: 'Lower RFD & Force',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Mobility + jump ramp-ups.',
          coolDownProtocol: '5 min: Couch stretch + foam rolling.',
          coachingNotes: 'Contrast pairing: Heavy front squat followed by unloaded max vertical jump produces potentiation.',
          exercises: [
            { id: 'bb2-d1-1', exerciseId: 'trap-bar-jump-squat', name: 'A · Trap Bar Jump Squats (15-20% 1RM)', targetSetsReps: '5 x 3', rest: '2 min', progressionCue: 'Violent vertical pop', supersetGroup: 'A' },
            { id: 'bb2-d1-2', exerciseId: 'barbell-back-squat', name: 'B · Barbell Front Squat', targetSetsReps: '4 x 5', rest: '2-3 min', progressionCue: '+5 kg Wk5', supersetGroup: 'B' },
            { id: 'bb2-d1-3', exerciseId: 'spanish-squat-isometric', name: 'C1 · Spanish Squat Isometric (Weighted)', targetSetsReps: '4 x 45s holds', rest: 'pair (60s)', progressionCue: 'Hold 25-35 lb plate', supersetGroup: 'C1' },
            { id: 'bb2-d1-4', exerciseId: 'pogo-hops', name: 'C2 · Standing Calf / Soleus High-Load Raise', targetSetsReps: '4 x 10', rest: 'pair (60s)', progressionCue: '+5% load', supersetGroup: 'C2' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Rebounding Force & Core',
          focus: 'Barbell Push Press + Heavy Rows + Grip Carries',
          type: 'Upper Force',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Shoulder mobility.',
          coolDownProtocol: '5 min: Stretching.',
          coachingNotes: 'Push press trains simultaneous triple-extension drive into overhead rebound reach.',
          exercises: [
            { id: 'bb2-d2-1', exerciseId: 'push-press', name: 'A · Barbell Push Press', targetSetsReps: '4 x 5', rest: '2 min', progressionCue: '+5 lb on bar', supersetGroup: 'A' },
            { id: 'bb2-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Weighted Chin-Up', targetSetsReps: '4 x 5', rest: 'pair (60s)', progressionCue: '+5 kg weight belt', supersetGroup: 'B1' },
            { id: 'bb2-d2-3', exerciseId: 'barbell-bent-over-row', name: 'B2 · Chest-Supported Row', targetSetsReps: '4 x 8', rest: 'pair (60s)', progressionCue: 'Upper back armor', supersetGroup: 'B2' },
            { id: 'bb2-d2-4', exerciseId: 'farmers-carry', name: 'C · Heavy Suitcase Carry', targetSetsReps: '3 x 30m /side', rest: '60s', progressionCue: 'Anti-lateral flexion', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Penultimate Approach Jumps & Lane Agility',
          focus: '2-Foot & 1-Foot Approach Jumps + 3/4 Court Sprint',
          type: 'Jumping Specificity & Agility',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Approach footwork drills + build-up sprints.',
          coolDownProtocol: '5 min: Walking + flush.',
          coachingNotes: 'Penultimate step: plant the back foot, drop hips smoothly, and transfer horizontal speed into vertical leap.',
          exercises: [
            { id: 'bb2-d3-1', exerciseId: 'box-jump', name: 'A · Penultimate 2-Foot Approach Max Jumps', targetSetsReps: '5 x 2 jumps', rest: '2 min', progressionCue: 'Measure touch height on backboard', supersetGroup: 'A' },
            { id: 'bb2-d3-2', exerciseId: 'box-jump', name: 'B · Depth Jump from 18-inch Box (Quick Rebound)', targetSetsReps: '4 x 3', rest: '2 min', progressionCue: 'Land and spring immediately', supersetGroup: 'B' },
            { id: 'bb2-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · 3/4 Court Sprint Trials (NBA Combine)', targetSetsReps: '4 trials', rest: '2 min', progressionCue: 'Aim for sub 3.25s', supersetGroup: 'C' },
            { id: 'bb2-d3-4', exerciseId: 'repeated-sprint-series', name: 'D · Lateral Defensive Slide Reactivity', targetSetsReps: '4 x 15s max', rest: '60s', progressionCue: 'Low stance, zero hop steps', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Full-Body Power & 17s Shuttle Density',
          focus: 'Hang Cleans + Split Squat Jumps + 17s Shuttles (8 Reps)',
          type: 'Power & Court Engine',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Dowel cleans, knee-tucks.',
          coolDownProtocol: '10 min: Cooldown walk.',
          coachingNotes: 'Conditioning increases to 8 sets of 17-second shuttles with 45s rest.',
          exercises: [
            { id: 'bb2-d4-1', exerciseId: 'hang-power-clean', name: 'A · Hang Power Clean', targetSetsReps: '4 x 3 @ 70%', rest: '2 min', progressionCue: 'Triple extension velocity', supersetGroup: 'A' },
            { id: 'bb2-d4-2', exerciseId: 'bulgarian-split-squat', name: 'B · Bulgarian Split Squat Jump', targetSetsReps: '3 x 5 /leg', rest: '90s', progressionCue: 'Explode off front foot', supersetGroup: 'B' },
            { id: 'bb2-d4-3', exerciseId: 'court-17s-intervals', name: 'C · 17-Second Court Shuttles', targetSetsReps: '8 x (17s sprint / 45s rest)', rest: '45s', progressionCue: '4th quarter overtime engine', supersetGroup: 'C' }
          ]
        }
      ]
    },
    {
      id: 'hoops-phase-3',
      title: 'Phase 3 - Reactive Elasticity & Game Speed Peak',
      weeks: 'Weeks 7-8',
      weekNumbers: [7, 8],
      theme: 'Peak Vertical Jump & Combine Testing',
      emphasis: 'Low volume, high flight. Week 8 retests the official NBA Combine testing battery (Standing vertical, max approach vertical, 3/4 court sprint, lane agility).',
      prescription: '3 sets of 3 reps fast | Full recovery | Retest on Saturday Week 8',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Speed Squat & Tendon Prime',
          focus: 'Speed Front Squats + Spanish Hold Maintenance',
          type: 'Lower Power',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Ankle mob + light jumps.',
          coolDownProtocol: '5 min: Quad stretch.',
          coachingNotes: 'Tendon maintenance: 2 sets of 45s Spanish holds to keep knees 100% pain-free for testing.',
          exercises: [
            { id: 'bb3-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Speed Front Squat (60% load)', targetSetsReps: '4 x 3 fast', rest: '2 min', progressionCue: 'Explode from parallel', supersetGroup: 'A' },
            { id: 'bb3-d1-2', exerciseId: 'spanish-squat-isometric', name: 'B · Spanish Squat Isometric (Maintenance)', targetSetsReps: '2 x 45s holds', rest: '90s', progressionCue: 'Tendon analgesic lock', supersetGroup: 'B' },
            { id: 'bb3-d1-3', exerciseId: 'pogo-hops', name: 'C · Ankle Pogo Spring Hops', targetSetsReps: '3 x 10', rest: '60s', progressionCue: 'Sub-180ms ground contact', supersetGroup: 'C' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Speed & Push Press Snap',
          focus: 'Speed Push Press + Chin-Up Speed',
          type: 'Upper Power',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Arm swings.',
          coolDownProtocol: '5 min: Stretching.',
          coachingNotes: 'Keep nervous system crisp and primed.',
          exercises: [
            { id: 'bb3-d2-1', exerciseId: 'push-press', name: 'A · Speed Push Press (65% load)', targetSetsReps: '4 x 3 fast', rest: '2 min', progressionCue: 'Violent leg drive', supersetGroup: 'A' },
            { id: 'bb3-d2-2', exerciseId: 'weighted-pull-up', name: 'B · Explosive Chin-Up (Bodyweight)', targetSetsReps: '3 x 4 fast', rest: '90s', progressionCue: 'Rapid chin over bar', supersetGroup: 'B' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — 3/4 Court Sprint & Lane Agility Tune-Up',
          focus: 'Sprint Timing & Agility Practice Trials',
          type: 'Speed & Agility Tune-Up',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Sprint warmup drills + 3 build-up runs.',
          coolDownProtocol: '5 min: Walk.',
          coachingNotes: 'Final rehearsal for Saturday testing battery.',
          exercises: [
            { id: 'bb3-d3-1', exerciseId: 'repeated-sprint-series', name: 'A · 3/4 Court Sprint Practice', targetSetsReps: '3 trials', rest: '2 min', progressionCue: 'Laser timing', supersetGroup: 'A' },
            { id: 'bb3-d3-2', exerciseId: 'repeated-sprint-series', name: 'B · Lane Agility Practice Drill', targetSetsReps: '3 trials', rest: '2 min', progressionCue: 'Clean footwork around cones', supersetGroup: 'B' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Taper & NBA Combine Scorecard Day',
          focus: 'Vertical Jump Battery Retest',
          type: 'Testing Battery',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Jump test warmup protocol.',
          coolDownProtocol: '10 min: Complete post-testing recovery.',
          coachingNotes: 'Saturday Week 8: Execute Standing Vertical, Max Approach Vertical, 3/4 Court Sprint, and Lane Agility!',
          exercises: [
            { id: 'bb3-d4-1', exerciseId: 'box-jump', name: 'A · Standing No-Step Vertical Jump', targetSetsReps: '3 trials', rest: '90s', progressionCue: 'Vertec / wall reach (inches)' },
            { id: 'bb3-d4-2', exerciseId: 'box-jump', name: 'B · Maximum Approach Vertical Jump', targetSetsReps: '3 trials', rest: '2 min', progressionCue: 'Full approach leap (inches)' },
            { id: 'bb3-d4-3', exerciseId: 'repeated-sprint-series', name: 'C · 3/4 Court Sprint Official Test', targetSetsReps: '2 trials', rest: '3 min', progressionCue: 'Record best time' },
            { id: 'bb3-d4-4', exerciseId: 'repeated-sprint-series', name: 'D · Pro Lane Agility Official Test', targetSetsReps: '2 trials', rest: '3 min', progressionCue: 'Record best time' }
          ]
        }
      ]
    }
  ],
  benchmarkTests: [
    { id: 'bb-test-standvert', name: 'Standing Vertical Jump (No Step)', protocol: 'Vertec or jump mat countermovement, best of 3', unit: 'inches', proTarget: 'Guards 28-33 in | Wings 28-32 in | Bigs 26-30 in', category: 'Power', description: 'Pure standing vertical force output.' },
    { id: 'bb-test-maxvert', name: 'Max Approach Vertical Jump', protocol: 'Full running approach (penultimate step), best of 3', unit: 'inches', proTarget: 'Guards 35-42+ in | Wings 34-40 in | Bigs 32-37 in', category: 'Power', description: 'NBA Combine marquee vertical explosion standard.' },
    { id: 'bb-test-34court', name: '3/4 Court Sprint (75 ft)', protocol: 'Baseline to opposite free throw line (22.86m), electronic', unit: 'sec', proTarget: 'Guards ≤ 3.15s | Wings ≤ 3.22s | Bigs ≤ 3.35s', category: 'Speed', description: 'Fastbreak sprint transition velocity.' },
    { id: 'bb-test-lane', name: 'Lane Agility Drill', protocol: 'NBA 19x16 ft free-throw lane drill (sprint, slide, backpedal, slide)', unit: 'sec', proTarget: 'Guards ≤ 10.60s | Wings ≤ 10.90s | Bigs ≤ 11.50s', category: 'Speed', description: 'Complete multi-directional court agility test.' },
    { id: 'bb-test-rsi', name: 'Reactive Strength Index (RSI)', protocol: 'Drop jump from 30cm box: jump height (m) / contact time (s)', unit: 'ratio', proTarget: 'Elite Hoops: RSI ≥ 2.2 - 2.8', category: 'Power', description: 'Elastic reactive stiffness and stretch-shortening cycle speed.' },
    { id: 'bb-test-squat', name: 'Front Squat 1RM', protocol: '3RM x 1.08 = est. 1RM', unit: 'kg / lb', proTarget: '1.4-1.6x BW', category: 'Strength', description: 'Upright torso lower limb force production.' }
  ],
  recoveryRules: {
    sleep: '8-9 hours. Essential for patellar and Achilles collagen cross-linking and central nervous restoration.',
    protein: '1.8-2.2 g per kg bodyweight. Gelatin / Vitamin C 45 min before sessions supports tendon synthesis.',
    hydration: '3.5-4 liters daily. Hardwood running causes high fluid and sodium losses.',
    deloadRule: 'If patellar tendon pain exceeds 3/10 during warmups, replace jumps with Spanish squat isometrics and upper body.',
    twoStrikeRule: 'If failing prescribed jump squat speed or lifting floor for 2 sessions, drop load 10%.'
  },
  sourcesAndStandards: [
    { title: 'Isometric Exercise Induces Analgesia in Patellar Tendinopathy', citation: 'Rio et al., British Journal of Sports Medicine (2015) 49(19):1277–1283' },
    { title: 'NBA Draft Combine Anthropometric & Athletic Performance Testing', citation: 'National Basketball Association Official Combine Archives' },
    { title: 'The Reactive Strength Index and Elastic Tendon Mechanics', citation: 'Flanagan & Comyns, Strength & Conditioning Journal (2008) 30(5):32–38' },
    { title: 'Conditioning Demands of Elite Basketball: Repeated High-Intensity Sprints', citation: 'Stojanović et al., Sports Medicine (2018)' }
  ]
};
