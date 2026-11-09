import { SportProgram } from '../../types/sport';

export const RUGBY_PROGRAM: SportProgram = {
  id: 'rugby',
  name: 'Rugby Union & Rugby League',
  badge: 'Collision Armor & Repeat-Sprint Engine',
  subtitle: 'Elite Rugby Physique & Performance (8-Week 4-Day Edition)',
  duration: '8 Weeks (3 Structured Phases: Foundation, Strength, Power & Peak)',
  frequency: '4 Focused Sessions Under 1 Hour / Week',
  heroImage: '/src/assets/images/sport_rugby_athlete_1791316792498.jpg',
  primaryGoals: [
    'Build dense musculoskeletal armor to absorb brutal collision contact',
    'Massive compound strength without sacrificing sprint speed and agility',
    'Repeat-Sprint Ability (RSA) to sustain line breaks through 80 minutes',
    'Compressed, high-density sessions capped under 55 minutes with superset pairs'
  ],
  equipmentNeeded: [
    'Olympic Barbell & Bumper Plates',
    'Trap Bar (Hex Bar)',
    'Dumbbells & Heavy Kettlebells',
    'Weight Belt for Dips & Pull-ups',
    'Turf Track / Sled / Wattbike or Rower'
  ],
  sportsSciencePrinciples: [
    {
      title: 'Dense Collision Armor & Structural Hypertrophy',
      description: 'Rugby athletes experience ~30-40 collisions per match with impact forces exceeding 3,000 N. Phase 1 & 2 prioritize upper back, cervical neck musculature, and posterior chain thickness to disperse contact forces and prevent concussive impulses.',
      researchCitation: 'Till et al. (2017) Anthropometric & Physiological Characteristics of Elite Rugby Union Players'
    },
    {
      title: 'Repeat Sprint Ability (RSA) & Alactic-Aerobic Engine',
      description: 'Match play features high-speed sprints (~15-30m) interspersed with brief wrestling/ruck collisions. Day 3 trains maximal sprint velocity (fresh legs) followed by repeated sprint series (20s work / 3 min recovery) to drive anaerobic glycolytic tolerance.',
      researchCitation: 'Gabbett et al. (2012) Physiological and Anthropometric Correlates of Tackling Ability in Rugby League'
    },
    {
      title: 'Antagonist Superset Pairing for Density',
      description: 'Pairs (e.g. Squat + Leg Raise, Bench + Pull-up, Press + Row) allow agonist recovery while antagonist performs work. Reduces session duration from 90 to 50 minutes with zero loss of hormonal or hypertrophic stimulus.',
      researchCitation: 'Robbins et al. (2010) Agonist-Antagonist Paired Set Training'
    }
  ],
  phases: [
    {
      id: 'rugby-phase-1',
      title: 'Phase 1 - Foundation',
      weeks: 'Weeks 1-3',
      weekNumbers: [1, 2, 3],
      theme: 'Rebuild the Base & Re-Entry',
      emphasis: 'Weeks 1-2 at RPE 6 with 50-60% of old working weights (3 sets of 10 reps), stepping up in Week 3 to RPE 7 (4 sets of 8 reps). Muscle memory brings strength back fast—let connective tissue catch up.',
      prescription: 'Main lifts: Wks 1-2 (3×10 @ RPE 6) » Wk 3 (4×8 @ RPE 7) | Accessories 3×10-12 | Supersets with 45-60s rest',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Strength',
          focus: 'Squat + Hinge + Single-Leg + Core',
          type: 'Lower Strength',
          timeBudgetMinutes: 55,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: 3 min bike/row + World\'s greatest stretch x5/side, hip flexor stretch 30s/side, ankle rocks x10/side + ramp-up squat sets.',
          coolDownProtocol: '5 min: Light walking + 90/90 hip stretch + hamstring wall stretch.',
          timeCrunchHierarchy: [
            'Cut 1st: Farmer\'s carry finisher (saves 5 min)',
            'Cut 2nd: Drop 4th round of Bulgarian split squats to 3 rounds (saves 4 min)',
            'Cut 3rd: Main squat down from 4 sets to 3—keep the load!',
            'Never cut: Warm-up (shorten to 5 min, never skip) and squat quality.'
          ],
          emergency30MinProtocol: '5 min warm-up » Back Squat 3 sets » Romanian Deadlift + Leg Raise pair 3 rounds » 5 min hard bike.',
          coachingNotes: 'B1 and B2 alternate: do set of RDL, rest 45-60s, do leg raises, rest 45-60s, repeat. Same for C pair.',
          exercises: [
            { id: 'r1-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Back Squat', targetSetsReps: '3×10 (Wk1-2) » 4×8 (Wk3)', rest: '2-3 min', progressionCue: 'Weeks 1-2: 3×10 @ 50-60% (RPE 6), Week 3: 4×8 @ RPE 7', supersetGroup: 'A' },
            { id: 'r1-d1-2', exerciseId: 'romanian-deadlift', name: 'B1 · Romanian Deadlift', targetSetsReps: '3x10', rest: 'pair (45-60s)', progressionCue: '+5 kg when 3x10 is clean', supersetGroup: 'B1' },
            { id: 'r1-d1-3', exerciseId: 'hanging-leg-raise', name: 'B2 · Hanging Leg Raise', targetSetsReps: '3x10-12', rest: 'pair (45-60s)', progressionCue: 'Strict toes or knee tuck', supersetGroup: 'B2' },
            { id: 'r1-d1-4', exerciseId: 'bulgarian-split-squat', name: 'C1 · Bulgarian Split Squat', targetSetsReps: '3x8 /leg', rest: 'pair (45-60s)', progressionCue: '+2.5 kg load Wk2-3', supersetGroup: 'C1' },
            { id: 'r1-d1-5', exerciseId: 'pogo-hops', name: 'C2 · Standing Calf Raise', targetSetsReps: '4x12', rest: 'pair (45-60s)', progressionCue: '+5% load', supersetGroup: 'C2' },
            { id: 'r1-d1-6', exerciseId: 'farmers-carry', name: 'D · Farmer\'s Carry', targetSetsReps: '3x40 m', rest: '90s', progressionCue: '+5% load Wk2-3', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Strength',
          focus: 'Bench + Pull-Up + Press/Row Pairs',
          type: 'Upper Strength',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Row 3 min + band pull-aparts x15, arm circles x10, push-up plus x10 + bench ramp-up sets.',
          coolDownProtocol: '5 min: Doorway pec stretch + child\'s pose + lat stretch.',
          timeCrunchHierarchy: [
            'Cut 1st: Weighted plank (saves 4 min)',
            'Cut 2nd: Drop 4th round of OHP/Row pair to 3 rounds',
            'Cut 3rd: Bench down from 4 sets to 3 sets'
          ],
          emergency30MinProtocol: '5 min warm-up » Bench Press 3 sets » Weighted Pull-Up + Face Pull 3 rounds » 5 min hard row.',
          coachingNotes: 'B1/B2 and C1/C2 alternate with 45-60s between sets. Opposite movements recover while the other works—zero wasted minutes.',
          exercises: [
            { id: 'r1-d2-1', exerciseId: 'barbell-bench-press', name: 'A · Barbell Bench Press', targetSetsReps: '3×10 (Wk1-2) » 4×8 (Wk3)', rest: '2-3 min', progressionCue: 'Weeks 1-2: 3×10 @ RPE 6 (50-60%), Week 3: 4×8 @ RPE 7', supersetGroup: 'A' },
            { id: 'r1-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Weighted Pull-Up', targetSetsReps: '3x8 » 4x6-8', rest: 'pair (45-60s)', progressionCue: 'Bodyweight or +2.5 kg once 8 clean', supersetGroup: 'B1' },
            { id: 'r1-d2-3', exerciseId: 'face-pull', name: 'B2 · Face Pull', targetSetsReps: '3x15', rest: 'pair (45-60s)', progressionCue: 'Thumbs pointing back', supersetGroup: 'B2' },
            { id: 'r1-d2-4', exerciseId: 'standing-overhead-press', name: 'C1 · Standing Overhead Press', targetSetsReps: '3x8', rest: 'pair (45-60s)', progressionCue: '+2.5 kg when 3x8 is solid', supersetGroup: 'C1' },
            { id: 'r1-d2-5', exerciseId: 'barbell-bent-over-row', name: 'C2 · Barbell Bent-Over Row', targetSetsReps: '3x10', rest: 'pair (45-60s)', progressionCue: 'Flat back, no hip bounce', supersetGroup: 'C2' },
            { id: 'r1-d2-6', exerciseId: 'copenhagen-plank', name: 'D · Weighted Plank', targetSetsReps: '3x30-45 s', rest: '60s', progressionCue: '+10s hold or +plate', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Speed, Power & Engine',
          focus: 'Fresh Legs: Cleans + Jumps + Sprints + Engine',
          type: 'Speed & Power',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday (after full rest day)',
          warmUpProtocol: '8 min: Easy jog/bike + hip mobility + 3 progressive build-up sprint runs (50%, 65%, 75%).',
          coolDownProtocol: '5 min: Light walk + quad and calf stretch.',
          timeCrunchHierarchy: [
            'Cut 1st: Zone-2 closeout (E) completely (saves 10 min)',
            'Cut 2nd: Trim sprint drills (C) to 5 sprints instead of 8',
            'Never cut: The Hang Clean (A) or Repeated Sprint Series (D)—they carry the engine.'
          ],
          emergency30MinProtocol: '5 min warm-up » Hang Power Clean 4 sets » Trap Bar Jump Squats 3 sets » 4x20m sprints.',
          coachingNotes: 'Order matters: Cleans and jumps first while fresh, sprints second, repeated sprints last. Never sprint hard on pre-fatigued legs.',
          exercises: [
            { id: 'r1-d3-1', exerciseId: 'hang-power-clean', name: 'A · Hang Power Clean', targetSetsReps: '4x4 @ 50-65%', rest: '2 min', progressionCue: 'Mechanics focus, snappy hip extension', supersetGroup: 'A' },
            { id: 'r1-d3-2', exerciseId: 'trap-bar-jump-squat', name: 'B · Trap-Bar Jump Squat', targetSetsReps: '4x5 light', rest: '90s', progressionCue: 'Stick every landing softly', supersetGroup: 'B' },
            { id: 'r1-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · Sprint Drills + Accelerations', targetSetsReps: '5x20 m @ 70-75%', rest: '45-60s', progressionCue: 'Focus on low shin angles & posture', supersetGroup: 'C' },
            { id: 'r1-d3-4', exerciseId: 'repeated-sprint-series', name: 'D · Repeated Sprint Series', targetSetsReps: '2 x (4 x 20 m)', rest: '20s reps / 3 min sets', progressionCue: 'All-out burst, record best time', supersetGroup: 'D' },
            { id: 'r1-d3-5', exerciseId: 'repeated-sprint-series', name: 'E · Zone-2 Closeout (Optional)', targetSetsReps: '10 min easy', rest: '—', progressionCue: 'Easy bike or jog for flushing waste', isOptionalFinisher: true, supersetGroup: 'E' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Hypertrophy & Armor',
          focus: 'Frame Building + Contact Neck & Shoulders',
          type: 'Hypertrophy & Armor',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Easy rower + shoulder circles, dislocates, scap pushups.',
          coolDownProtocol: '5 min: Full body decompression, foam rolling traps and quads.',
          timeCrunchHierarchy: [
            'Cut 1st: Metabolic finisher (E) is the first to go (saves 8 min)',
            'Cut 2nd: Drop final round of C pair (delt raises)',
            'Cut 3rd: Dips/Curls pair down to 2 rounds'
          ],
          emergency30MinProtocol: '5 min warm-up » Incline DB Press + Row 3 rounds » Armor neck circuit 2 rounds » Done.',
          coachingNotes: 'Three superset pairs + armor in under 50 minutes. Armor circuit: Med-ball rotational throw 6/side + neck curls/ext 15 reps.',
          exercises: [
            { id: 'r1-d4-1', exerciseId: 'incline-dumbbell-press', name: 'A1 · Incline Dumbbell Press', targetSetsReps: '3x12 » 4x10', rest: 'pair (45-60s)', progressionCue: 'RPE 7 pump work, moderate load', supersetGroup: 'A1' },
            { id: 'r1-d4-2', exerciseId: 'barbell-bent-over-row', name: 'A2 · Chest-Supported Row', targetSetsReps: '4x10-12', rest: 'pair (45-60s)', progressionCue: 'Squeeze shoulder blades for 1 sec', supersetGroup: 'A2' },
            { id: 'r1-d4-3', exerciseId: 'weighted-dip', name: 'B1 · Weighted Dip (or Push-Up)', targetSetsReps: '3x10', rest: 'pair (45-60s)', progressionCue: 'Add weight once 3x10 is owned', supersetGroup: 'B1' },
            { id: 'r1-d4-4', exerciseId: 'one-arm-dumbbell-row', name: 'B2 · Hammer Curl', targetSetsReps: '3x10-12', rest: 'pair (45-60s)', progressionCue: 'Elbows tight, control lowering', supersetGroup: 'B2' },
            { id: 'r1-d4-5', exerciseId: 'face-pull', name: 'C1 · Dumbbell Lateral Raise', targetSetsReps: '4x12-15', rest: 'pair (45-60s)', progressionCue: 'Lead with elbows, strict form', supersetGroup: 'C1' },
            { id: 'r1-d4-6', exerciseId: 'face-pull', name: 'C2 · Rear-Delt Fly', targetSetsReps: '3x15', rest: 'pair (45-60s)', progressionCue: 'Light DBs, high tension', supersetGroup: 'C2' },
            { id: 'r1-d4-7', exerciseId: 'neck-armor-protocol', name: 'D · Armor Circuit (Neck + Med-Ball)', targetSetsReps: 'Med-ball throw 4x6 + Neck 2x15', rest: '60s', progressionCue: 'Crucial for tackling resilience', supersetGroup: 'D' },
            { id: 'r1-d4-8', exerciseId: 'sled-push-prowler', name: 'E · Metabolic Finisher (Optional)', targetSetsReps: 'Sled 20m + ropes 30s x 3 rds', rest: '60s', progressionCue: 'First thing to cut when time is tight', isOptionalFinisher: true, supersetGroup: 'E' }
          ]
        }
      ]
    },
    {
      id: 'rugby-phase-2',
      title: 'Phase 2 - Strength',
      weeks: 'Weeks 4-6',
      weekNumbers: [4, 5, 6],
      theme: 'Reclaim Force & Densify Armor',
      emphasis: 'Sets of 4-5 reps at RPE 7-8 on the main lifts. Most returning lifters regain their old PRs here.',
      prescription: 'Main lifts 4-5x5 @ RPE 7-8 | Shorter rest on accessory pairs | Add 5kg to lower, 2.5kg to upper',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Strength',
          focus: 'Squat & Posterior Force Progression',
          type: 'Lower Strength',
          timeBudgetMinutes: 55,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Mobility + Back squat build-up sets.',
          coolDownProtocol: '5 min: Walking + hip stretch.',
          coachingNotes: 'Drop to 4-5 reps. Add 5-10 kg to squat if double-progression floor was hit in Phase 1.',
          exercises: [
            { id: 'r2-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Back Squat', targetSetsReps: '4-5x5', rest: '2-3 min', progressionCue: 'RPE 7-8: rebuild the load, don\'t chase it', supersetGroup: 'A' },
            { id: 'r2-d1-2', exerciseId: 'romanian-deadlift', name: 'B1 · Romanian Deadlift', targetSetsReps: '4x6', rest: 'pair (45-60s)', progressionCue: 'Heavier loads, strict hinge', supersetGroup: 'B1' },
            { id: 'r2-d1-3', exerciseId: 'hanging-leg-raise', name: 'B2 · Hanging Leg Raise', targetSetsReps: '3x10-12', rest: 'pair (45-60s)', progressionCue: 'Controlled negative', supersetGroup: 'B2' },
            { id: 'r2-d1-4', exerciseId: 'bulgarian-split-squat', name: 'C1 · Bulgarian Split Squat', targetSetsReps: '4x6 /leg', rest: 'pair (45-60s)', progressionCue: '+5% load Wk5', supersetGroup: 'C1' },
            { id: 'r2-d1-5', exerciseId: 'pogo-hops', name: 'C2 · Standing Calf Raise', targetSetsReps: '4x10', rest: 'pair (45-60s)', progressionCue: 'Heavy loading', supersetGroup: 'C2' },
            { id: 'r2-d1-6', exerciseId: 'farmers-carry', name: 'D · Heavy Farmer\'s Carry', targetSetsReps: '3x40 m heavy', rest: '90s', progressionCue: 'Trap bar or heavy DBs', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Strength',
          focus: 'Bench & Row Maximal Force',
          type: 'Upper Strength',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Ramp-up bench sets to working weight.',
          coolDownProtocol: '5 min: Chest stretch + lat stretch.',
          coachingNotes: '4-5x5 at RPE 7-8: heavy, but keep 2 reps in reserve on top sets.',
          exercises: [
            { id: 'r2-d2-1', exerciseId: 'barbell-bench-press', name: 'A · Barbell Bench Press', targetSetsReps: '4-5x5', rest: '2-3 min', progressionCue: 'Add 2.5-5 kg if Wk3 ceiling reached', supersetGroup: 'A' },
            { id: 'r2-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Weighted Pull-Up', targetSetsReps: '4-5x5', rest: 'pair (45-60s)', progressionCue: 'Add weight belt load', supersetGroup: 'B1' },
            { id: 'r2-d2-3', exerciseId: 'face-pull', name: 'B2 · Face Pull', targetSetsReps: '3x15', rest: 'pair (45-60s)', progressionCue: 'Scapular stability', supersetGroup: 'B2' },
            { id: 'r2-d2-4', exerciseId: 'standing-overhead-press', name: 'C1 · Standing Overhead Press', targetSetsReps: '4x6', rest: 'pair (45-60s)', progressionCue: '+2.5 kg', supersetGroup: 'C1' },
            { id: 'r2-d2-5', exerciseId: 'barbell-bent-over-row', name: 'C2 · Barbell Bent-Over Row', targetSetsReps: '4x6-8', rest: 'pair (45-60s)', progressionCue: 'Strict torso angle', supersetGroup: 'C2' },
            { id: 'r2-d2-6', exerciseId: 'copenhagen-plank', name: 'D · Weighted Plank', targetSetsReps: '3x40-50 s', rest: '60s', progressionCue: '+load on back', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Speed, Power & Engine',
          focus: 'Explode: Cleans 70-75% + Max Sprints',
          type: 'Speed & Power',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Sprint mechanics drills + 3 build-up runs.',
          coolDownProtocol: '5 min: Walk + quad flush.',
          coachingNotes: 'Sprint series increases to 3 sets. Sleep 8+ hours before this session!',
          exercises: [
            { id: 'r2-d3-1', exerciseId: 'hang-power-clean', name: 'A · Hang Power Clean', targetSetsReps: '4x3 @ 70-75%', rest: '2 min', progressionCue: 'Max acceleration, violent snap', supersetGroup: 'A' },
            { id: 'r2-d3-2', exerciseId: 'trap-bar-jump-squat', name: 'B · Trap-Bar Jump Squat', targetSetsReps: '5x4', rest: '90s', progressionCue: '+load toward 20% 1RM', supersetGroup: 'B' },
            { id: 'r2-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · Sprint Accelerations', targetSetsReps: '8x15 m max', rest: '45-60s', progressionCue: '100% effort, full velocity', supersetGroup: 'C' },
            { id: 'r2-d3-4', exerciseId: 'repeated-sprint-series', name: 'D · Repeated Sprint Series', targetSetsReps: '3 x (6 x 20 m)', rest: '20s reps / 3 min sets', progressionCue: 'Engine crucible—hold times under 3.5s', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Hypertrophy & Armor',
          focus: 'Densify Armor & Metabolic Strength',
          type: 'Hypertrophy & Armor',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Full body warm-up flow.',
          coolDownProtocol: '5 min: Stretching.',
          coachingNotes: '4x8-10 at RPE 8: shorter rest, more load. Densify the shoulders and neck.',
          exercises: [
            { id: 'r2-d4-1', exerciseId: 'incline-dumbbell-press', name: 'A1 · Incline Dumbbell Press', targetSetsReps: '4x8', rest: 'pair (45-60s)', progressionCue: 'Heavier dumbbells', supersetGroup: 'A1' },
            { id: 'r2-d4-2', exerciseId: 'barbell-bent-over-row', name: 'A2 · Chest-Supported Row', targetSetsReps: '4x10', rest: 'pair (45-60s)', progressionCue: 'Dead-stop pauses', supersetGroup: 'A2' },
            { id: 'r2-d4-3', exerciseId: 'weighted-dip', name: 'B1 · Weighted Dip (or Push-Up)', targetSetsReps: '3x8', rest: 'pair (45-60s)', progressionCue: 'Add weight plate', supersetGroup: 'B1' },
            { id: 'r2-d4-4', exerciseId: 'one-arm-dumbbell-row', name: 'B2 · Hammer Curl', targetSetsReps: '3x10', rest: 'pair (45-60s)', progressionCue: '+5% load', supersetGroup: 'B2' },
            { id: 'r2-d4-5', exerciseId: 'face-pull', name: 'C1 · Dumbbell Lateral Raise', targetSetsReps: '4x12', rest: 'pair (45-60s)', progressionCue: 'Strict delt isolation', supersetGroup: 'C1' },
            { id: 'r2-d4-6', exerciseId: 'face-pull', name: 'C2 · Rear-Delt Fly', targetSetsReps: '3x15', rest: 'pair (45-60s)', progressionCue: 'Posterior cuff armor', supersetGroup: 'C2' },
            { id: 'r2-d4-7', exerciseId: 'neck-armor-protocol', name: 'D · Armor Circuit', targetSetsReps: 'Med-ball throw 4x6 + neck 2x15', rest: '60s', progressionCue: 'Heavier med-ball', supersetGroup: 'D' },
            { id: 'r2-d4-8', exerciseId: 'hang-power-clean', name: 'E · Barbell Complex (Optional Finisher)', targetSetsReps: '4 rds x 5 reps', rest: '90s', progressionCue: 'DL+Row+Clean+Press+Squat', isOptionalFinisher: true, supersetGroup: 'E' }
          ]
        }
      ]
    },
    {
      id: 'rugby-phase-3',
      title: 'Phase 3 - Power & Peak',
      weeks: 'Weeks 7-8',
      weekNumbers: [7, 8],
      theme: 'Sharpen Speed & Retest Testing Battery',
      emphasis: 'Cleans, jumps and sprints at high quality, volume drops, Week 8 retests everything from Page 5. Power returns last—be patient.',
      prescription: 'Main lifts 4x3-5 fast @ RPE 8 | Sprints full speed with full recovery | Half volume Wk8',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 — Lower Power & Speed Squat',
          focus: 'Speed Reps & Neural Snap',
          type: 'Lower Power',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Dynamic mobility + speed squat prep.',
          coolDownProtocol: '5 min: Easy recovery walking.',
          coachingNotes: 'Move the bar with maximum possible speed on every rep.',
          exercises: [
            { id: 'r3-d1-1', exerciseId: 'barbell-back-squat', name: 'A · Back Squat', targetSetsReps: '4x3-5 fast @ RPE 8', rest: '2-3 min', progressionCue: 'Violent upward acceleration', supersetGroup: 'A' },
            { id: 'r3-d1-2', exerciseId: 'romanian-deadlift', name: 'B1 · Romanian Deadlift', targetSetsReps: '4x5', rest: 'pair (45-60s)', progressionCue: 'Crisp hinge execution', supersetGroup: 'B1' },
            { id: 'r3-d1-3', exerciseId: 'hanging-leg-raise', name: 'B2 · Hanging Leg Raise', targetSetsReps: '3x10-12', rest: 'pair (45-60s)', progressionCue: 'Strict control', supersetGroup: 'B2' },
            { id: 'r3-d1-4', exerciseId: 'bulgarian-split-squat', name: 'C1 · Bulgarian Split Squat', targetSetsReps: '3x5 /leg', rest: 'pair (45-60s)', progressionCue: 'Fast drive off front foot', supersetGroup: 'C1' },
            { id: 'r3-d1-5', exerciseId: 'pogo-hops', name: 'C2 · Standing Calf Raise', targetSetsReps: '4x8', rest: 'pair (45-60s)', progressionCue: 'Explosive extension', supersetGroup: 'C2' },
            { id: 'r3-d1-6', exerciseId: 'farmers-carry', name: 'D · Farmer\'s Carry', targetSetsReps: '3x40 m heavy', rest: '90s', progressionCue: 'Postural lock', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 — Upper Power',
          focus: 'Bench Speed Reps & Lat Snap',
          type: 'Upper Power',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Band face pulls + explosive pushup prep.',
          coolDownProtocol: '5 min: Upper body stretching.',
          coachingNotes: 'Press with intent! Barbell should accelerate off the chest like an ejection seat.',
          exercises: [
            { id: 'r3-d2-1', exerciseId: 'barbell-bench-press', name: 'A · Barbell Bench Press', targetSetsReps: '4x3-5 fast', rest: '2-3 min', progressionCue: 'Max intent, stop if bar slows', supersetGroup: 'A' },
            { id: 'r3-d2-2', exerciseId: 'weighted-pull-up', name: 'B1 · Weighted Pull-Up', targetSetsReps: '4x3-5', rest: 'pair (45-60s)', progressionCue: 'Explosive chin over bar', supersetGroup: 'B1' },
            { id: 'r3-d2-3', exerciseId: 'face-pull', name: 'B2 · Face Pull', targetSetsReps: '3x15', rest: 'pair (45-60s)', progressionCue: 'Smooth control', supersetGroup: 'B2' },
            { id: 'r3-d2-4', exerciseId: 'standing-overhead-press', name: 'C1 · Standing Overhead Press', targetSetsReps: '4x4', rest: 'pair (45-60s)', progressionCue: 'Push press transition option', supersetGroup: 'C1' },
            { id: 'r3-d2-5', exerciseId: 'barbell-bent-over-row', name: 'C2 · Barbell Bent-Over Row', targetSetsReps: '4x5', rest: 'pair (45-60s)', progressionCue: 'Heavy Pendlay row option', supersetGroup: 'C2' },
            { id: 'r3-d2-6', exerciseId: 'copenhagen-plank', name: 'D · Weighted Plank', targetSetsReps: '3x45-60 s', rest: '60s', progressionCue: 'Total body iron brace', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 — Speed, Power & Engine (Sharpen)',
          focus: 'Clean 75-80% + Full-Recovery Sprint Timing',
          type: 'Speed & Power',
          timeBudgetMinutes: 45,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Sprint warmup drills + 3 build-up runs.',
          coolDownProtocol: '5 min: Light walk.',
          coachingNotes: 'Full-recovery speed. Clean and sprint times should hit program peak numbers.',
          exercises: [
            { id: 'r3-d3-1', exerciseId: 'hang-power-clean', name: 'A · Hang Power Clean', targetSetsReps: '5x2 @ 75-80%', rest: '2 min', progressionCue: 'Full-recovery speed, crisp catch', supersetGroup: 'A' },
            { id: 'r3-d3-2', exerciseId: 'trap-bar-jump-squat', name: 'B · Trap-Bar Jump Squat', targetSetsReps: '6x3', rest: '90s', progressionCue: 'Maximum flight height', supersetGroup: 'B' },
            { id: 'r3-d3-3', exerciseId: 'repeated-sprint-series', name: 'C · Sprint Accelerations', targetSetsReps: '8x10 m max', rest: '45-60s', progressionCue: 'Laser focus on 10m burst time', supersetGroup: 'C' },
            { id: 'r3-d3-4', exerciseId: 'repeated-sprint-series', name: 'D · Repeated Sprint Series', targetSetsReps: '2 x (8 x 30 m)', rest: '20s reps / 3 min sets', progressionCue: 'Week 8 taper: reduce to 1 set', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 — Maintain Armor & Retest Prep',
          focus: 'Maintain Frame & Taper for Saturday Testing',
          type: 'Hypertrophy & Armor Taper',
          timeBudgetMinutes: 40,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Light mobility flow.',
          coolDownProtocol: '10 min: Complete recovery protocols.',
          coachingNotes: 'Cut volume: 3 sets of 8-10. Saturday of Week 8 is testing day for the full scorecard.',
          exercises: [
            { id: 'r3-d4-1', exerciseId: 'incline-dumbbell-press', name: 'A1 · Incline Dumbbell Press', targetSetsReps: '3x8', rest: 'pair (45-60s)', progressionCue: 'Moderate load, feel muscle contraction', supersetGroup: 'A1' },
            { id: 'r3-d4-2', exerciseId: 'barbell-bent-over-row', name: 'A2 · Chest-Supported Row', targetSetsReps: '3x10', rest: 'pair (45-60s)', progressionCue: 'Strict posture', supersetGroup: 'A2' },
            { id: 'r3-d4-3', exerciseId: 'weighted-dip', name: 'B1 · Weighted Dip', targetSetsReps: '3x6', rest: 'pair (45-60s)', progressionCue: 'High tension', supersetGroup: 'B1' },
            { id: 'r3-d4-4', exerciseId: 'one-arm-dumbbell-row', name: 'B2 · Hammer Curl', targetSetsReps: '3x10', rest: 'pair (45-60s)', progressionCue: 'Arms armor', supersetGroup: 'B2' },
            { id: 'r3-d4-5', exerciseId: 'face-pull', name: 'C1 · Dumbbell Lateral Raise', targetSetsReps: '3x12', rest: 'pair (45-60s)', progressionCue: 'Deltoid maintenance', supersetGroup: 'C1' },
            { id: 'r3-d4-6', exerciseId: 'face-pull', name: 'C2 · Rear-Delt Fly', targetSetsReps: '3x15', rest: 'pair (45-60s)', progressionCue: 'Shoulder health', supersetGroup: 'C2' },
            { id: 'r3-d4-7', exerciseId: 'neck-armor-protocol', name: 'D · Armor Circuit (Taper)', targetSetsReps: '1 round only', rest: '—', progressionCue: 'Taper volume before testing', supersetGroup: 'D' }
          ]
        }
      ]
    }
  ],
  benchmarkTests: [
    { id: 'rugby-test-bodyweight', name: 'Body Mass', protocol: 'Morning weight, before food', unit: 'kg', proTarget: '93-111 kg (backs 93, forwards 111)', category: 'Body Comp', description: 'Match-ready mass to withstand tackles.' },
    { id: 'rugby-test-squat', name: 'Back Squat 1RM', protocol: '3RM x 1.08 = est. 1RM', unit: 'kg', proTarget: '1.6-1.8x BW (157-176 kg)', category: 'Strength', description: 'Scrum and collision drive foundation.' },
    { id: 'rugby-test-bench', name: 'Bench Press 1RM', protocol: '3RM x 1.08 = est. 1RM', unit: 'kg', proTarget: '1.2-1.4x BW (118-131 kg)', category: 'Strength', description: 'Fend-off and upper body contact force.' },
    { id: 'rugby-test-deadlift', name: 'Trap-Bar / Deadlift 1RM', protocol: '3RM x 1.08 = est. 1RM', unit: 'kg', proTarget: '1.8-2.2x BW (175-220 kg)', category: 'Strength', description: 'Ruck clearing and hip hinge force.' },
    { id: 'rugby-test-pullups', name: 'Max Strict Pull-Ups', protocol: 'Dead hang, chin over bar', unit: 'reps', proTarget: '12+ reps bodyweight', category: 'Strength', description: 'Relative upper body pulling endurance.' },
    { id: 'rugby-test-10m', name: '10 m Sprint', protocol: '3 trials, best electronic or hand time', unit: 'sec', proTarget: '≤ 1.80 s', category: 'Speed', description: 'Defensive line speed & initial acceleration.' },
    { id: 'rugby-test-40m', name: '40 m Sprint', protocol: '3 trials, best time', unit: 'sec', proTarget: '≤ 5.20 s (backs < 5.2s, forwards < 5.5s)', category: 'Speed', description: 'Open field breakaway speed.' },
    { id: 'rugby-test-vjump', name: 'Vertical Jump', protocol: 'Countermovement jump, best of 3', unit: 'cm', proTarget: '≥ 50 cm (49-57 cm)', category: 'Power', description: 'Lineout jumping and lower leg power.' },
    { id: 'rugby-test-bjump', name: 'Broad Jump', protocol: 'Standing horizontal leap, best of 3', unit: 'm', proTarget: '≥ 2.50 m', category: 'Power', description: 'Horizontal hip power output.' },
    { id: 'rugby-test-agility', name: '5-10-5 Pro Agility Shuttle', protocol: 'Best of 3 trials', unit: 'sec', proTarget: '≤ 2.45 s', category: 'Speed', description: 'Change of direction and lateral reactivity.' },
    { id: 'rugby-test-bronco', name: 'Bronco Shuttle', protocol: '5 x (20-40-60 m shuttle continuous)', unit: 'min:sec', proTarget: '≤ 6:30 (aim under 6:00)', category: 'Conditioning', description: 'The gold standard rugby aerobic-anaerobic endurance test.' }
  ],
  recoveryRules: {
    sleep: '7 hours is the dad/athlete floor, 8+ when possible. Sleep is the single highest-return recovery tool.',
    protein: '1.6-2.2 g per kg bodyweight daily. Anchor each meal with a palm of meat, fish, eggs, or dairy.',
    hydration: 'Hydrate with water and sodium. Dark urine means delayed muscle recovery.',
    deloadRule: 'If resting heart rate spikes or joints ache, cut main-lift volume by 50% and keep loads at 80%.',
    twoStrikeRule: 'Miss rep floor on main lift for two sessions in a row? Drop that lift 10% and rebuild. Log it, don\'t ego it.'
  },
  sourcesAndStandards: [
    { title: 'Anthropometric and Physiological Characteristics of Elite Rugby Athletes', citation: 'Till et al., Journal of Strength & Conditioning Research (JSCR)' },
    { title: 'Performance Testing for Rugby League — Normative Data', citation: 'Scholars Research Library / League Standards' },
    { title: 'South African Rugby League — S&C Manual', citation: 'SARU High Performance Department (2020)' },
    { title: 'Strength & Conditioning Standards for Rugby', citation: 'Jack Tyler Performance Standards' },
    { title: 'Physical Qualities of Male Age-Grade Rugby Union Players', citation: 'Systematic Review, PMC7272054' }
  ]
};
