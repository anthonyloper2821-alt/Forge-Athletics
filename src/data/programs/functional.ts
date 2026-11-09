import { SportProgram } from '../../types/sport';

export const FUNCTIONAL_PROGRAM: SportProgram = {
  id: 'functional',
  name: 'Everyday Athlete · Functional Strength & Longevity',
  badge: 'Functional Movement & Joint Armor',
  subtitle: '8-Week Longevity, Joint Resilience & Functional Human Movement Program',
  duration: '8 Weeks (4 Progressive 2-Week Blocks)',
  frequency: '4 Focused Sessions / Week + Active Longevity Walks',
  heroImage: '/src/assets/images/functional_athlete_hero_1792618211356.jpg',
  primaryGoals: [
    'Total-body functional strength across all 7 primal movement patterns (Squat, Hinge, Lunge, Push, Pull, Carry, Rotate)',
    'Bulletproof joint armor: hips, knees-over-toes, rotator cuff, and spine durability',
    'Pain-free movement longevity with Dr. Stuart McGill spinal hygiene protocols',
    'Grip strength, loaded carry stamina, and aerobic heart rate recovery (VO2 max foundation)'
  ],
  equipmentNeeded: [
    'Trap Bar / Barbell & Bumper Plates',
    'Dumbbells & Kettlebells',
    'Pull-Up Bar & Dip Station / Rings',
    'Cable Tower or Resistance Bands',
    'Sled / Turf Track or Cardio Ergometer (Rower / Ski / Bike)'
  ],
  sportsSciencePrinciples: [
    {
      title: 'The 7 Primal Human Movement Patterns',
      description: 'Rather than isolating vanity body parts, longevity training develops neuromuscular mastery across Squat, Hinge, Lunge (unilateral), Push, Pull, Carry, and Rotation/Anti-Rotation. This maintains multi-planar mobility and functional independence for decades.',
      researchCitation: 'NSCA Foundation Principles & Gray Cook Functional Movement Systems (FMS)'
    },
    {
      title: 'Tendon Remodeling & Joint Armor (Heavy Slow Resistance)',
      description: 'Cartilage, tendons, and ligaments respond to heavy slow resistance (HSR) and sustained isometric contractions (>30s) rather than high-repetition sloppy reps. Controlled tempos (3-second eccentrics) stimulate collagen synthesis and eliminate nagging joint inflammation.',
      researchCitation: 'Kongsgaard et al. (2009) & Rio et al. (2015) British Journal of Sports Medicine'
    },
    {
      title: 'Spinal Hygiene & 360-Degree Core Stiffness (McGill Big 3)',
      description: 'The spine is designed to transfer force, not generate explosive spinal twisting under load. Integrating Dr. Stuart McGill\'s Big 3 (McGill Curl-up, Side Bridge, Bird-Dog) creates a rigid muscular corset that eliminates lower back friction and protects lumbar discs.',
      researchCitation: 'McGill, S. M. (2015) Ultimate Back Fitness and Performance, BackFitPro'
    },
    {
      title: 'The Longevity Triad: Grip, Carries & Aerobic Engine',
      description: 'Epidemiological longevity research shows all-cause mortality drops dramatically with high grip strength, bodyweight carry endurance, and robust cardiorespiratory fitness (VO2 max and low resting heart rate). Every session blends strength with metabolic durability.',
      researchCitation: 'Leong et al. (2015) The Lancet Prospective Urban Rural Epidemiology (PURE) Study'
    }
  ],
  phases: [
    {
      id: 'functional-block-1',
      title: 'Block 1 - Movement Integrity & Joint Armor',
      weeks: 'Weeks 1-2',
      weekNumbers: [1, 2],
      theme: 'Movement Quality, Scapular Stability & Tendon Adaptation',
      emphasis: 'Build bulletproof joint armor, groove pristine hinge and squat mechanics, and accumulate high-yield postural density with 2 reps in reserve (RPE 7-8).',
      prescription: 'Compound lifts 3-4 x 8-10 (3s eccentric) | Unilateral accessories 3 x 10-12 | Core & Carries 3 x 30-40s | Rest 60-90s',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Ground-Up Squat & Core Stiffness',
          focus: 'Bilateral Squat / Knee Stability / Anti-Extension Core',
          type: 'Functional Strength / Foundation',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: 2 min light bike + 90/90 hip openers, world\'s greatest stretch, deep goblet squat pry holds (30s) + 2 light warm-up sets.',
          coolDownProtocol: '5 min: Couch stretch (hip flexors 60s/side), pigeon pose, diaphragmatic belly breathing (5 slow breaths).',
          coachingNotes: 'Focus on full controlled depth without lumbar flexion ("butt wink"). Drive through whole foot (tripod foot: heel, big toe, pinky toe).',
          emergency30MinProtocol: 'Drop Superset C and Finisher D. Complete A and B1/B2 in 26 minutes flat.',
          timeCrunchHierarchy: ['Drop D Finisher', 'Reduce C2 rounds from 3 to 2', 'Execute A & B supersets'],
          exercises: [
            { id: 'fn-b1-d1-1', exerciseId: 'goblet-squat', name: 'Goblet Squat (or Front Squat)', targetSetsReps: '4 x 8-10 (3s down)', rest: '90s', progressionCue: '+1 rep or +5 lb Wk2', supersetGroup: 'A' },
            { id: 'fn-b1-d1-2', exerciseId: 'romanian-deadlift', name: 'Dumbbell Romanian Deadlift', targetSetsReps: '3 x 10-12', rest: '75s', progressionCue: '+5% load Wk2', supersetGroup: 'B1' },
            { id: 'fn-b1-d1-3', exerciseId: 'push-up-plus', name: 'Push-Up with Scapular Plus', targetSetsReps: '3 x 12-15', rest: '75s', progressionCue: '+2 reps Wk2', supersetGroup: 'B2' },
            { id: 'fn-b1-d1-4', exerciseId: 'bulgarian-split-squat', name: 'Rear-Foot Elevated Split Squat', targetSetsReps: '3 x 8-10 /leg', rest: '60s', progressionCue: '+1 rep/leg Wk2', supersetGroup: 'C1' },
            { id: 'fn-b1-d1-5', exerciseId: 'ab-wheel-rollout', name: 'Ab Wheel Rollout (or Plank to Pike)', targetSetsReps: '3 x 10-12', rest: '60s', progressionCue: '+1 rep Wk2', supersetGroup: 'C2' },
            { id: 'fn-b1-d1-6', exerciseId: 'farmers-carry', name: 'Dumbbell / Kettlebell Farmer\'s Walk', targetSetsReps: '3 x 35 meters', rest: '60s', progressionCue: '+5 lb/hand Wk2', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Posture, Scapular Armor & Upper Pull',
          focus: 'Hinge / Vertical & Horizontal Pull / Rotator Cuff Prehab',
          type: 'Functional Strength / Structural Armor',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Band dislocates, band pull-aparts (20 reps), cat-cow, thoracic spine windmill rotations + 2 ramp-up sets Trap Bar Deadlift.',
          coolDownProtocol: '6 min: Dead hang from bar (30-45s gentle decompression), doorway chest stretch, foam roll upper thoracic spine.',
          coachingNotes: 'Pack shoulders down and back on all rows. Never let head jut forward. Build the upper back shelf to eliminate desk hunching.',
          emergency30MinProtocol: 'Execute Trap Bar Deadlift + Pull-Up / Face-Pull supersets. Skip arm accessories.',
          timeCrunchHierarchy: ['Drop D accessories', 'Cut C superset to 2 rounds', 'Preserve A & B'],
          exercises: [
            { id: 'fn-b1-d2-1', exerciseId: 'trap-bar-deadlift', name: 'Trap Bar Deadlift (High Handles)', targetSetsReps: '4 x 6-8', rest: '90-120s', progressionCue: '+5-10 lb Wk2', supersetGroup: 'A' },
            { id: 'fn-b1-d2-2', exerciseId: 'lat-pulldown', name: 'Neutral-Grip Lat Pulldown / Pull-Up', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+1 rep Wk2', supersetGroup: 'B1' },
            { id: 'fn-b1-d2-3', exerciseId: 'standing-overhead-press', name: 'Half-Kneeling Landmine Press (or DB OHP)', targetSetsReps: '3 x 10 /side', rest: '75s', progressionCue: '+2.5 lb Wk2', supersetGroup: 'B2' },
            { id: 'fn-b1-d2-4', exerciseId: 'chest-supported-row', name: 'Chest-Supported Dumbbell Row', targetSetsReps: '3 x 10-12', rest: '60s', progressionCue: '+2.5 lb/hand Wk2', supersetGroup: 'C1' },
            { id: 'fn-b1-d2-5', exerciseId: 'face-pull', name: 'Cable Face Pull with External Rotation', targetSetsReps: '3 x 15', rest: '60s', progressionCue: '+2 reps Wk2', supersetGroup: 'C2' },
            { id: 'fn-b1-d2-6', exerciseId: 'turkish-get-up', name: 'McGill Big 3 (Bird-Dog & Side Plank)', targetSetsReps: '3 rounds x 30s holds', rest: '45s', progressionCue: 'Stricter spine stiffness', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Unilateral Power & Knee Resilience',
          focus: 'Single-Leg Balance / Knees-Over-Toes / Upper Push',
          type: 'Unilateral Stability & Durability',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: 2 min jump rope or row + backward sled drag / incline walking, ankle dorsiflexion rocks, single-leg glute bridges.',
          coolDownProtocol: '5 min: Quad foam roll, seated hamstring stretch, calves against wall stretch (45s each).',
          coachingNotes: 'Single-leg strength fixes hidden left/right imbalances that cause hip, SI joint, and knee pain. Move with slow, proud control.',
          emergency30MinProtocol: 'Do A, B1, and B2. Omit C2 and D finisher.',
          timeCrunchHierarchy: ['Drop D Metcon', 'Reduce C rounds', 'Prioritize A and B unilateral work'],
          exercises: [
            { id: 'fn-b1-d3-1', exerciseId: 'split-squat-isometric', name: 'Walking Dumbbell Lunge (Controlled Pace)', targetSetsReps: '3 x 10-12 /leg', rest: '75s', progressionCue: '+5 lb/hand Wk2', supersetGroup: 'A' },
            { id: 'fn-b1-d3-2', exerciseId: 'dumbbell-bench-press', name: 'Flat Dumbbell Press (Neutral Grip)', targetSetsReps: '4 x 8-10', rest: '75s', progressionCue: '+2.5-5 lb Wk2', supersetGroup: 'B1' },
            { id: 'fn-b1-d3-3', exerciseId: 'one-arm-dumbbell-row', name: 'One-Arm Dumbbell Row (Tripod Stance)', targetSetsReps: '3 x 10-12 /side', rest: '75s', progressionCue: '+2.5 lb Wk2', supersetGroup: 'B2' },
            { id: 'fn-b1-d3-4', exerciseId: 'pogo-hops', name: 'Tibialis Raises & Calf Raise Superset', targetSetsReps: '3 x 15-20 each', rest: '60s', progressionCue: '+2 reps Wk2', supersetGroup: 'C1' },
            { id: 'fn-b1-d3-5', exerciseId: 'pallof-press', name: 'Standing Cable / Band Pallof Press', targetSetsReps: '3 x 12 /side', rest: '45s', progressionCue: '+3s pause Wk2', supersetGroup: 'C2' },
            { id: 'fn-b1-d3-6', exerciseId: 'sled-push-prowler', name: 'Backward Sled Drag or Incline Treadmill Walk', targetSetsReps: '4 x 25 meters (or 5 min)', rest: '60s', progressionCue: '+10 lb on sled Wk2', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Total-Body Integration & Longevity Engine',
          focus: 'Loaded Carries / Kettlebell Hinge / Aerobic Flush',
          type: 'Functional Conditioning & Work Capacity',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '6 min: Arm circles, hip circles, bodyweight air squats, inchworms with push-up.',
          coolDownProtocol: '8 min: Deep resting squat sit (90s), child\'s pose, physiological sigh breathing (5 cycles).',
          coachingNotes: 'Carries build unstoppable grip, trap development, and oblique anti-lateral flexion. Walk smooth like water.',
          emergency30MinProtocol: 'Run the KB Swings and Suitcase Carries as an EMOM for 20 minutes.',
          timeCrunchHierarchy: ['Drop final 5 min aerobic flush', 'Reduce carry rounds to 2', 'Preserve core compound pairs'],
          exercises: [
            { id: 'fn-b1-d4-1', exerciseId: 'kettlebell-swing', name: 'Kettlebell Russian Swing (Hip Snap)', targetSetsReps: '4 x 15', rest: '60s', progressionCue: '+4 kg bell Wk2', supersetGroup: 'A1' },
            { id: 'fn-b1-d4-2', exerciseId: 'farmers-carry', name: 'Suitcase Carry (Single Heavy KB / DB)', targetSetsReps: '4 x 30m /side', rest: '60s', progressionCue: '+5 lb Wk2', supersetGroup: 'A2' },
            { id: 'fn-b1-d4-3', exerciseId: 'incline-dumbbell-press', name: 'Incline Dumbbell Press (30-deg)', targetSetsReps: '3 x 10-12', rest: '75s', progressionCue: '+1 rep Wk2', supersetGroup: 'B1' },
            { id: 'fn-b1-d4-4', exerciseId: 'seated-cable-row', name: 'Seated Cable Row (Wide Neutral Grip)', targetSetsReps: '3 x 10-12', rest: '75s', progressionCue: '+5% load Wk2', supersetGroup: 'B2' },
            { id: 'fn-b1-d4-5', exerciseId: 'hanging-leg-raise', name: 'Dead Hang from Bar (Grip Longevity)', targetSetsReps: '3 x 45-60s max hold', rest: '60s', progressionCue: '+5s hold Wk2', supersetGroup: 'C1' },
            { id: 'fn-b1-d4-6', exerciseId: 'mas-shuttle-intervals', name: 'Zone 2 Cardio Flush (Row, Erg, or Incline Walk)', targetSetsReps: '10-12 min steady state (HR 120-140)', rest: '0s', progressionCue: '+2 min Wk2', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        }
      ]
    },
    {
      id: 'functional-block-2',
      title: 'Block 2 - Functional Strength & Postural Density',
      weeks: 'Weeks 3-4',
      weekNumbers: [3, 4],
      theme: 'Absolute Strength Overload & Structural Balance',
      emphasis: 'Increase mechanical tension on prime mover compound patterns (5-6 rep brackets). Maintain 2 RIR on heavy compounds.',
      prescription: 'Main lifts 4 x 6-8 (Heavy compound) | Accessories 3 x 8-10 | Core 3 x 12 | Rest 90-120s',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Lower Strength & Knee Durability',
          focus: 'Barbell/Goblet Squat / RDL / Hamstring Resilience',
          type: 'Functional Strength Overload',
          timeBudgetMinutes: 52,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Hip mobility flow, ankle pogo rocks, 3 progressive warm-up sets building to working load.',
          coolDownProtocol: '5 min: Hip flexor couch stretch, elevated calf stretch.',
          coachingNotes: 'Week 3 is a step up in weight. Brace your core 360-degrees before beginning the descent.',
          exercises: [
            { id: 'fn-b2-d1-1', exerciseId: 'barbell-back-squat', name: 'Barbell Box Squat or Heavy Goblet Squat', targetSetsReps: '4 x 6-8', rest: '120s', progressionCue: '+5-10 lb Wk4', supersetGroup: 'A' },
            { id: 'fn-b2-d1-2', exerciseId: 'romanian-deadlift', name: 'Barbell or Heavy DB Romanian Deadlift', targetSetsReps: '3 x 8-10', rest: '90s', progressionCue: '+5 lb Wk4', supersetGroup: 'B1' },
            { id: 'fn-b2-d1-3', exerciseId: 'dumbbell-bench-press', name: 'Neutral-Grip Dumbbell Floor Press', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+2.5 lb/hand Wk4', supersetGroup: 'B2' },
            { id: 'fn-b2-d1-4', exerciseId: 'bulgarian-split-squat', name: 'Bulgarian Split Squat (Rear Foot on Bench)', targetSetsReps: '3 x 8-10 /leg', rest: '75s', progressionCue: '+1 rep/leg Wk4', supersetGroup: 'C1' },
            { id: 'fn-b2-d1-5', exerciseId: 'ab-wheel-rollout', name: 'Ab Wheel Rollout with 2s Pause', targetSetsReps: '3 x 10', rest: '60s', progressionCue: 'Extend 2 inches further Wk4', supersetGroup: 'C2' },
            { id: 'fn-b2-d1-6', exerciseId: 'farmers-carry', name: 'Heavy Hex-Bar / DB Farmer\'s Walk', targetSetsReps: '3 x 40m', rest: '90s', progressionCue: '+10 lb total Wk4', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Posterior Chain & Scapular Armor',
          focus: 'Trap Bar Hinge / Weighted Pull / Shoulder Prehab',
          type: 'Upper / Posterior Strength',
          timeBudgetMinutes: 52,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Thoracic foam rolling, band dislocates, scapular pull-ups, 2 warm-up hinge sets.',
          coolDownProtocol: '6 min: Passive bar hang, lat stretch against post.',
          coachingNotes: 'On Trap Bar Deadlift, push the floor away like a leg press while keeping your lats locked in your back pockets.',
          exercises: [
            { id: 'fn-b2-d2-1', exerciseId: 'trap-bar-deadlift', name: 'Trap Bar Deadlift (Low or High Handles)', targetSetsReps: '4 x 5-6', rest: '120s', progressionCue: '+10 lb Wk4', supersetGroup: 'A' },
            { id: 'fn-b2-d2-2', exerciseId: 'lat-pulldown', name: 'Weighted or Strict Pull-Up', targetSetsReps: '4 x 6-8', rest: '90s', progressionCue: '+1 rep or +2.5 lb Wk4', supersetGroup: 'B1' },
            { id: 'fn-b2-d2-3', exerciseId: 'standing-overhead-press', name: 'Standing Dumbbell Overhead Press', targetSetsReps: '3 x 8-10', rest: '90s', progressionCue: '+2.5 lb/hand Wk4', supersetGroup: 'B2' },
            { id: 'fn-b2-d2-4', exerciseId: 'barbell-bent-over-row', name: 'Chest-Supported T-Bar or DB Row', targetSetsReps: '3 x 8-10', rest: '60s', progressionCue: '+5 lb Wk4', supersetGroup: 'C1' },
            { id: 'fn-b2-d2-5', exerciseId: 'face-pull', name: 'Face Pull with 2s Peak Squeeze', targetSetsReps: '3 x 15', rest: '60s', progressionCue: '+1 plate Wk4', supersetGroup: 'C2' },
            { id: 'fn-b2-d2-6', exerciseId: 'hanging-leg-raise', name: 'Hanging Leg Raise (Strict Toes to Bar / 90)', targetSetsReps: '3 x 10-12', rest: '60s', progressionCue: '+1 rep Wk4', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Unilateral Strength & Rotational Armor',
          focus: 'Single-Leg Hinge / Horizontal Push / Anti-Rotation',
          type: 'Unilateral Functional Power',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Lateral band walks, single-leg RDL reach bodyweight, arm swings.',
          coolDownProtocol: '5 min: Pigeon pose, glute stretch, foam roll IT band and quads.',
          coachingNotes: 'Single-leg Romanian Deadlifts build immense ankle proprioception and protect the hamstring tendon.',
          exercises: [
            { id: 'fn-b2-d3-1', exerciseId: 'single-leg-rdl', name: 'Single-Leg Dumbbell Romanian Deadlift', targetSetsReps: '3 x 8-10 /leg', rest: '75s', progressionCue: '+5 lb Wk4', supersetGroup: 'A' },
            { id: 'fn-b2-d3-2', exerciseId: 'barbell-bench-press', name: 'Barbell or Heavy DB Bench Press', targetSetsReps: '4 x 6-8', rest: '90s', progressionCue: '+5 lb Wk4', supersetGroup: 'B1' },
            { id: 'fn-b2-d3-3', exerciseId: 'one-arm-dumbbell-row', name: 'Heavy Single-Arm DB Row (Lawnmower)', targetSetsReps: '3 x 8-10 /arm', rest: '75s', progressionCue: '+5 lb Wk4', supersetGroup: 'B2' },
            { id: 'fn-b2-d3-4', exerciseId: 'box-jump', name: 'Low Step-Down / Poliquin Step-Up (Knee Health)', targetSetsReps: '3 x 12 /leg', rest: '60s', progressionCue: '+1 in height Wk4', supersetGroup: 'C1' },
            { id: 'fn-b2-d3-5', exerciseId: 'pallof-press', name: 'Half-Kneeling Cable Pallof Press', targetSetsReps: '3 x 12 /side', rest: '45s', progressionCue: '+2.5 lb Wk4', supersetGroup: 'C2' },
            { id: 'fn-b2-d3-6', exerciseId: 'sled-push-prowler', name: 'Forward Sled Push (Heavy Leg Drive)', targetSetsReps: '4 x 20m', rest: '60s', progressionCue: '+15 lb on sled Wk4', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Full Kinetic Chain & Longevity Engine',
          focus: 'Complex Movement / Carries / Aerobic Capacity',
          type: 'Functional Conditioning',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '6 min: Dynamic full-body mobility flow, inchworms, spider-man lunges.',
          coolDownProtocol: '6 min: Deep breathing, quad and hip stretches.',
          coachingNotes: 'The Farmer\'s Carry is your ultimate test of posture and spinal integrity under fatigue.',
          exercises: [
            { id: 'fn-b2-d4-1', exerciseId: 'kettlebell-swing', name: 'Heavy Kettlebell Swing (or Snatch)', targetSetsReps: '4 x 12-15', rest: '60s', progressionCue: '+4 kg bell Wk4', supersetGroup: 'A1' },
            { id: 'fn-b2-d4-2', exerciseId: 'farmers-carry', name: 'Suitcase / Offset Carry (Uneven DBs)', targetSetsReps: '4 x 30m /side', rest: '60s', progressionCue: '+5 lb Wk4', supersetGroup: 'A2' },
            { id: 'fn-b2-d4-3', exerciseId: 'push-press', name: 'Standing DB Push Press or Landmine Press', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+2.5 lb Wk4', supersetGroup: 'B1' },
            { id: 'fn-b2-d4-4', exerciseId: 'lat-pulldown', name: 'Neutral Grip Chin-Up / Assisted Chin', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+1 rep Wk4', supersetGroup: 'B2' },
            { id: 'fn-b2-d4-5', exerciseId: 'hanging-leg-raise', name: 'Dead Hang Active Grip Hold', targetSetsReps: '3 x Max Time (>60s)', rest: '60s', progressionCue: '+5s hold Wk4', supersetGroup: 'C1' },
            { id: 'fn-b2-d4-6', exerciseId: 'mas-shuttle-intervals', name: 'Concept2 Rower or Air Bike Intervals (30s on / 30s off)', targetSetsReps: '8 rounds (8 min total)', rest: '30s', progressionCue: '+50m total distance Wk4', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        }
      ]
    },
    {
      id: 'functional-block-3',
      title: 'Block 3 - Power-Endurance & Work Capacity',
      weeks: 'Weeks 5-6',
      weekNumbers: [5, 6],
      theme: 'Density, Speed of Contraction & Total-Body Integration',
      emphasis: 'Slightly shorter rest intervals, pairing antagonist movements to elevate VO2 max and burn metabolic fuel without grinding joints.',
      prescription: 'Main lifts 4 x 6 | Antagonist supersets 3 x 8-10 | Density finishers 3 x 40s work / 20s rest',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Squat Power & Core Armor',
          focus: 'Explosive Lower / Bilateral Squat / Oblique Bracing',
          type: 'Power & Durability',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '8 min: Jump rope, bodyweight squats, deep squat pry, 2 barbell ramp-up sets.',
          coolDownProtocol: '5 min: Butterfly groin stretch, couch stretch.',
          coachingNotes: 'Explode up on the concentric portion of the squat, then control the descent smoothly.',
          exercises: [
            { id: 'fn-b3-d1-1', exerciseId: 'front-squat', name: 'Front Squat or Heavy Goblet Squat', targetSetsReps: '4 x 6', rest: '90s', progressionCue: '+5 lb Wk6', supersetGroup: 'A' },
            { id: 'fn-b3-d1-2', exerciseId: 'romanian-deadlift', name: 'Dumbbell Romanian Deadlift with 2s Pause', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+5 lb Wk6', supersetGroup: 'B1' },
            { id: 'fn-b3-d1-3', exerciseId: 'dumbbell-bench-press', name: 'Incline Dumbbell Chest Press', targetSetsReps: '3 x 8-10', rest: '75s', progressionCue: '+2.5 lb/hand Wk6', supersetGroup: 'B2' },
            { id: 'fn-b3-d1-4', exerciseId: 'split-squat-isometric', name: 'Deficit Reverse Lunge (Front Foot on Plate)', targetSetsReps: '3 x 8-10 /leg', rest: '60s', progressionCue: '+5 lb Wk6', supersetGroup: 'C1' },
            { id: 'fn-b3-d1-5', exerciseId: 'ab-wheel-rollout', name: 'Ab Wheel Rollout (Continuous Rhythm)', targetSetsReps: '3 x 12', rest: '45s', progressionCue: '+2 reps Wk6', supersetGroup: 'C2' },
            { id: 'fn-b3-d1-6', exerciseId: 'farmers-carry', name: 'Hex-Bar Farmer\'s Walk (1.0x Bodyweight Total)', targetSetsReps: '4 x 30m', rest: '75s', progressionCue: '+10 lb Wk6', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Posterior Velocity & Pulling Density',
          focus: 'Trap Bar / Pull-Up Density / Rotational Elasticity',
          type: 'Functional Pull & Armor',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '8 min: Rotator cuff band series, band pull-aparts, thoracic twist, 2 hinge ramp-ups.',
          coolDownProtocol: '5 min: Overhead bar hang, lat door stretch.',
          coachingNotes: 'Maintain pristine cervical spine posture. Never pull the bar with a rounded thoracic spine.',
          exercises: [
            { id: 'fn-b3-d2-1', exerciseId: 'trap-bar-deadlift', name: 'Trap Bar Deadlift (Fast Concentric)', targetSetsReps: '4 x 5-6', rest: '90-120s', progressionCue: '+10 lb Wk6', supersetGroup: 'A' },
            { id: 'fn-b3-d2-2', exerciseId: 'lat-pulldown', name: 'Neutral-Grip Pull-Up or Heavy Pulldown', targetSetsReps: '4 x 6-8', rest: '75s', progressionCue: '+1 rep Wk6', supersetGroup: 'B1' },
            { id: 'fn-b3-d2-3', exerciseId: 'standing-overhead-press', name: 'Half-Kneeling Landmine Press', targetSetsReps: '3 x 8-10 /side', rest: '75s', progressionCue: '+2.5 lb Wk6', supersetGroup: 'B2' },
            { id: 'fn-b3-d2-4', exerciseId: 'one-arm-dumbbell-row', name: 'Chest-Supported Row or Pendlay Row', targetSetsReps: '3 x 8-10', rest: '60s', progressionCue: '+5 lb Wk6', supersetGroup: 'C1' },
            { id: 'fn-b3-d2-5', exerciseId: 'face-pull', name: 'Face Pull with External Rotation', targetSetsReps: '3 x 15', rest: '45s', progressionCue: '+2 reps Wk6', supersetGroup: 'C2' },
            { id: 'fn-b3-d2-6', exerciseId: 'rotational-med-ball-throw', name: 'Rotational Med-Ball Slam or Cable Woodchopper', targetSetsReps: '3 x 10 /side', rest: '45s', progressionCue: 'Sharper hip snap Wk6', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Unilateral Drive & Joint Armor',
          focus: 'Single-Leg Force / Horizontal Pressing / Knees Over Toes',
          type: 'Unilateral Mastery',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Ankle mobilization, lateral bounds, glute bridges, push-up plus.',
          coolDownProtocol: '6 min: Pigeon stretch, hamstring stretch, foam roll glutes.',
          coachingNotes: 'Lock the front foot down like a suction cup during Bulgarian Split Squats. Complete all reps with balance.',
          exercises: [
            { id: 'fn-b3-d3-1', exerciseId: 'bulgarian-split-squat', name: 'Bulgarian Split Squat (Loaded DBs)', targetSetsReps: '3 x 8-10 /leg', rest: '75s', progressionCue: '+5 lb/hand Wk6', supersetGroup: 'A' },
            { id: 'fn-b3-d3-2', exerciseId: 'barbell-bench-press', name: 'Flat Barbell or DB Bench Press', targetSetsReps: '4 x 6', rest: '90s', progressionCue: '+5 lb Wk6', supersetGroup: 'B1' },
            { id: 'fn-b3-d3-3', exerciseId: 'barbell-bent-over-row', name: 'One-Arm DB Row (Heavy & Controlled)', targetSetsReps: '3 x 8 /side', rest: '75s', progressionCue: '+5 lb Wk6', supersetGroup: 'B2' },
            { id: 'fn-b3-d3-4', exerciseId: 'pogo-hops', name: 'Tibialis Raise + Standing Calf Raise Superset', targetSetsReps: '3 x 15-20 each', rest: '45s', progressionCue: '+2 reps Wk6', supersetGroup: 'C1' },
            { id: 'fn-b3-d3-5', exerciseId: 'pallof-press', name: 'Standing Anti-Rotation Cable Hold', targetSetsReps: '3 x 30s /side', rest: '45s', progressionCue: '+5 lb Wk6', supersetGroup: 'C2' },
            { id: 'fn-b3-d3-6', exerciseId: 'sled-push-prowler', name: 'Backward Sled Drag or Hill Walking', targetSetsReps: '4 x 30 meters', rest: '60s', progressionCue: '+10 lb on sled Wk6', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Full-Body Carry Complex & Longevity Engine',
          focus: 'Farmer\'s Walk / Kettlebell Snatch & Swings / Aerobic Engine',
          type: 'Conditioning & Durability',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '6 min: World\'s greatest stretch, deep squat hold, shoulder sweeps.',
          coolDownProtocol: '8 min: Deep resting squat (2 min hold), gentle spinal twists, diaphragmatic breathing.',
          coachingNotes: 'Keep heart rate in check with rhythmic nasal breathing between sets.',
          exercises: [
            { id: 'fn-b3-d4-1', exerciseId: 'kettlebell-swing', name: 'Hardstyle Kettlebell Swings', targetSetsReps: '4 x 15-20', rest: '45s', progressionCue: '+4 kg bell Wk6', supersetGroup: 'A1' },
            { id: 'fn-b3-d4-2', exerciseId: 'farmers-carry', name: 'Farmer\'s Carry (Heavy Walk 40m)', targetSetsReps: '4 x 40m', rest: '60s', progressionCue: '+5 lb/hand Wk6', supersetGroup: 'A2' },
            { id: 'fn-b3-d4-3', exerciseId: 'dumbbell-bench-press', name: 'Dumbbell Push Press', targetSetsReps: '3 x 8-10', rest: '60s', progressionCue: '+2.5 lb/hand Wk6', supersetGroup: 'B1' },
            { id: 'fn-b3-d4-4', exerciseId: 'lat-pulldown', name: 'Wide-Grip Lat Pulldown or Chin-Up', targetSetsReps: '3 x 8-10', rest: '60s', progressionCue: '+5% load Wk6', supersetGroup: 'B2' },
            { id: 'fn-b3-d4-5', exerciseId: 'hanging-leg-raise', name: 'Passive/Active Dead Hang Duration Hold', targetSetsReps: '3 x Max Seconds (>75s)', rest: '60s', progressionCue: '+10s hold Wk6', supersetGroup: 'C1' },
            { id: 'fn-b3-d4-6', exerciseId: 'mas-shuttle-intervals', name: 'Zone 2 Cardio Aerobic Engine (Rower / Bike)', targetSetsReps: '12-15 min continuous pace', rest: '0s', progressionCue: '+2 min Wk6', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        }
      ]
    },
    {
      id: 'functional-block-4',
      title: 'Block 4 - Peak Functional Performance & Testing',
      weeks: 'Weeks 7-8',
      weekNumbers: [7, 8],
      theme: 'Peak Strength & Longevity Benchmark Testing',
      emphasis: 'Week 7 is peak strength overload; Week 8 is structured testing of all functional longevity benchmarks (Dead Hang, Trap Bar 3RM, Farmer\'s Carry, Deep Squat Hold, VO2 Aerobic Engine).',
      prescription: 'Week 7: 3 x 4-5 top sets (RPE 8.5) | Week 8: Standardized Benchmark Testing & Active Recovery',
      days: [
        {
          dayNumber: 1,
          name: 'Day 1 - Lower Benchmark Testing & Squat Power',
          focus: 'Deep Squat Mobility Test / Squat Peak / Posterior Chain',
          type: 'Peak Testing & Strength',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Monday',
          warmUpProtocol: '10 min: Thorough hip and ankle mobilization, empty bar squats, 3 gradual warm-up ramp-up sets.',
          coolDownProtocol: '6 min: Deep resting squat hold, quad stretch, slow walking.',
          coachingNotes: 'Week 8 Test Day: Log your Deep Resting Squat continuous hold time and your top 3RM Squat or Goblet load.',
          exercises: [
            { id: 'fn-b4-d1-1', exerciseId: 'goblet-squat', name: 'Deep Resting Squat Hold (Mobility Benchmark)', targetSetsReps: '1 x Max Duration (Goal: 3:00 min)', rest: '120s', progressionCue: 'Retest baseline time', supersetGroup: 'A' },
            { id: 'fn-b4-d1-2', exerciseId: 'barbell-back-squat', name: 'Bilateral Squat 3RM or Heavy Goblet Squat', targetSetsReps: '3 x 5 (Wk7) / 1 x 3RM Peak (Wk8)', rest: '120s', progressionCue: 'Peak load test', supersetGroup: 'B' },
            { id: 'fn-b4-d1-3', exerciseId: 'romanian-deadlift', name: 'Romanian Deadlift (Controlled Eccentric)', targetSetsReps: '3 x 8', rest: '90s', progressionCue: 'Clean crisp reps', supersetGroup: 'C1' },
            { id: 'fn-b4-d1-4', exerciseId: 'dumbbell-bench-press', name: 'Dumbbell Bench Press (Peak Working Load)', targetSetsReps: '3 x 6-8', rest: '75s', progressionCue: 'Maintain clean form', supersetGroup: 'C2' },
            { id: 'fn-b4-d1-5', exerciseId: 'ab-wheel-rollout', name: 'Strict Ab Wheel Rollout', targetSetsReps: '3 x 10', rest: '60s', progressionCue: 'Zero lumbar extension', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 2,
          name: 'Day 2 - Hinge 3RM & Shoulder Longevity Testing',
          focus: 'Trap Bar Deadlift 3RM / Dead Hang Benchmark / Upper Back',
          type: 'Peak Testing & Pull',
          timeBudgetMinutes: 52,
          typicalPlacement: 'Tuesday',
          warmUpProtocol: '10 min: Thoracic spine foam roll, band pull-aparts, 3 progressive warm-up deadlift sets.',
          coolDownProtocol: '6 min: Gentle bar hang, child\'s pose, slow nose-breathing.',
          coachingNotes: 'Week 8 Test Day: Log your Trap Bar Deadlift 3RM and your strict Dead Hang duration to failure.',
          exercises: [
            { id: 'fn-b4-d2-1', exerciseId: 'trap-bar-deadlift', name: 'Trap Bar Deadlift (3RM Strength Benchmark)', targetSetsReps: '3 x 5 (Wk7) / 1 x 3RM Peak (Wk8)', rest: '150s', progressionCue: 'Log final 3RM load', supersetGroup: 'A' },
            { id: 'fn-b4-d2-2', exerciseId: 'hanging-leg-raise', name: 'Strict Dead Hang from Bar (Longevity Benchmark)', targetSetsReps: '1 x Max Duration to Failure', rest: '120s', progressionCue: 'Goal: 90-120+ seconds', supersetGroup: 'B' },
            { id: 'fn-b4-d2-3', exerciseId: 'lat-pulldown', name: 'Strict Pull-Up or Heavy Lat Pulldown', targetSetsReps: '3 x 6-8', rest: '90s', progressionCue: 'Full extension', supersetGroup: 'C1' },
            { id: 'fn-b4-d2-4', exerciseId: 'standing-overhead-press', name: 'Standing DB Overhead Press', targetSetsReps: '3 x 8', rest: '75s', progressionCue: 'Lock out overhead', supersetGroup: 'C2' },
            { id: 'fn-b4-d2-5', exerciseId: 'face-pull', name: 'Face Pull with 2s Squeeze', targetSetsReps: '3 x 15', rest: '45s', progressionCue: 'Posture armor', supersetGroup: 'D' }
          ]
        },
        {
          dayNumber: 3,
          name: 'Day 3 - Unilateral Power & Joint Armor Check',
          focus: 'Single-Leg Durability / Push Strength / Knee Resilience',
          type: 'Unilateral Peak',
          timeBudgetMinutes: 48,
          typicalPlacement: 'Thursday',
          warmUpProtocol: '8 min: Backward sled drag / treadmill walk, ankle rocks, glute bridges.',
          coolDownProtocol: '5 min: Quad couch stretch, pigeon pose.',
          coachingNotes: 'Feel how stable and balanced your knees and hips are compared to Week 1.',
          exercises: [
            { id: 'fn-b4-d3-1', exerciseId: 'bulgarian-split-squat', name: 'Bulgarian Split Squat (Peak DB Load)', targetSetsReps: '3 x 6-8 /leg', rest: '90s', progressionCue: 'Maximum balanced load', supersetGroup: 'A' },
            { id: 'fn-b4-d3-2', exerciseId: 'barbell-bench-press', name: 'Barbell or Flat DB Bench Press', targetSetsReps: '3 x 6', rest: '90s', progressionCue: 'Crisp bar velocity', supersetGroup: 'B1' },
            { id: 'fn-b4-d3-3', exerciseId: 'one-arm-dumbbell-row', name: 'Single-Arm DB Row (Strict Form)', targetSetsReps: '3 x 8 /arm', rest: '75s', progressionCue: 'Full stretch and contraction', supersetGroup: 'B2' },
            { id: 'fn-b4-d3-4', exerciseId: 'pogo-hops', name: 'Tibialis Raises & Standing Calf Raises', targetSetsReps: '3 x 15 each', rest: '45s', progressionCue: 'Clean joint mechanics', supersetGroup: 'C' },
            { id: 'fn-b4-d3-5', exerciseId: 'sled-push-prowler', name: 'Heavy Sled Push (Work Capacity Test)', targetSetsReps: '3 x 25 meters', rest: '60s', progressionCue: 'Speed and drive', supersetGroup: 'D', isOptionalFinisher: true }
          ]
        },
        {
          dayNumber: 4,
          name: 'Day 4 - Carry Benchmark & Longevity Engine Retest',
          focus: 'Bodyweight Farmer\'s Carry Test / Aerobic Engine Test',
          type: 'Longevity Testing & Celebration',
          timeBudgetMinutes: 50,
          typicalPlacement: 'Saturday',
          warmUpProtocol: '8 min: Light cardio, hip openers, arm circles.',
          coolDownProtocol: '8 min: Deep resting squat, slow full-body mobility, celebrate cycle completion.',
          coachingNotes: 'Final Test Day: Complete the 40m Bodyweight Farmer\'s Carry and your 12-minute aerobic distance test. Compare directly to your Week 0 baseline!',
          exercises: [
            { id: 'fn-b4-d4-1', exerciseId: 'farmers-carry', name: 'Farmer\'s Carry 40m Test (Benchmark: BW Total)', targetSetsReps: '1 x 40m Max Load (Goal: 100% BW total)', rest: '120s', progressionCue: 'Log final test weight', supersetGroup: 'A' },
            { id: 'fn-b4-d4-2', exerciseId: 'kettlebell-swing', name: 'Hardstyle Kettlebell Swings', targetSetsReps: '3 x 15', rest: '60s', progressionCue: 'Crisp hip snap', supersetGroup: 'B1' },
            { id: 'fn-b4-d4-3', exerciseId: 'push-press', name: 'Landmine or Neutral DB Shoulder Press', targetSetsReps: '3 x 8', rest: '60s', progressionCue: 'Smooth lockout', supersetGroup: 'B2' },
            { id: 'fn-b4-d4-4', exerciseId: 'mas-shuttle-intervals', name: '12-Minute Cooper Aerobic Run / Row Test (Benchmark)', targetSetsReps: '1 x 12 min Continuous Max Distance', rest: '0s', progressionCue: 'Log total distance in meters', supersetGroup: 'C' }
          ]
        }
      ]
    }
  ],
  benchmarkTests: [
    {
      id: 'bench-dead-hang',
      name: 'Dead Hang Duration (Grip & Shoulder Longevity)',
      protocol: 'Hang passively from a pull-up bar with overhand grip until grip gives out. Keep shoulders slightly packed.',
      unit: 'sec',
      proTarget: '120+ seconds (Gold Standard: 90-120s)',
      category: 'Strength',
      description: 'The single highest-correlated physical biomarker for all-cause longevity, rotator cuff health, and grip strength.'
    },
    {
      id: 'bench-farmers-carry',
      name: 'Trap Bar / DB Farmer\'s Carry (40 Meters)',
      protocol: 'Pick up trap bar or pair of dumbbells totaling bodyweight (50% BW in each hand). Walk 40 continuous meters with tall posture without dropping.',
      unit: 'lb',
      proTarget: '1.0x to 1.25x Bodyweight Total for 40m',
      category: 'Power',
      description: 'Measures full-body kinetic chain integrity, postural trap armor, and spinal shear resistance.'
    },
    {
      id: 'bench-resting-squat',
      name: 'Deep Resting Squat Hold (Mobility Standard)',
      protocol: 'Lower into a full deep resting squat with heels flat on the floor and chest upright. Hold relaxed for maximum continuous time.',
      unit: 'min:sec',
      proTarget: '3:00 continuous minutes',
      category: 'Body Comp',
      description: 'The ultimate indicator of hip capsule, knee, and ankle dorsiflexion mobility for lifelong independent movement.'
    },
    {
      id: 'bench-trapbar-3rm',
      name: 'Trap Bar Deadlift 3RM (Safe Hip Hinge)',
      protocol: 'Perform a clean 3-repetition maximum using neutral high or low handles with pristine spinal neutrality.',
      unit: 'lb',
      proTarget: '1.75x to 2.2x Bodyweight 3RM',
      category: 'Strength',
      description: 'Demonstrates maximal absolute posterior chain force with significantly less lumbar shear stress than straight-bar pulling.'
    },
    {
      id: 'bench-cooper-test',
      name: '12-Minute Longevity Engine Test (Cooper Distance)',
      protocol: 'Cover as much distance as possible in 12 minutes on a track, treadmill, or Concept2 rowing machine.',
      unit: 'meters',
      proTarget: '2,800+ meters (or >1.75 miles)',
      category: 'Conditioning',
      description: 'Clinically validated field test for cardiorespiratory VO2 max and aerobic metabolic efficiency.'
    }
  ],
  recoveryRules: {
    sleep: '7.5 to 8.5 hours of uninterrupted sleep. Connective tissue, collagen remodeling, and muscle protein synthesis peak during deep non-REM stages.',
    protein: '1.6 to 2.2g per kg of bodyweight daily. Consider 10-15g hydrolyzed collagen peptides with 50mg Vitamin C 45 minutes pre-workout to stimulate tendon remodeling.',
    hydration: '35–45 ml of water per kg of bodyweight, supplemented with sodium and magnesium electrolytes to keep spinal discs hydrated and muscles firing cramp-free.',
    deloadRule: 'Every 4th week or whenever morning resting heart rate is elevated by 5+ bpm for two consecutive mornings, reduce training volume by 40% and prioritize 10,000 brisk steps.',
    twoStrikeRule: 'If a lift triggers joint friction or pain for two sessions in a row, swap immediately to its listed regression in the Movement Index. Longevity training prioritizes training consistency over stubbornness.'
  },
  sourcesAndStandards: [
    {
      title: 'Dr. Stuart McGill — Ultimate Back Fitness and Performance',
      citation: 'McGill, S. M. (2015). Low Back Disorders: Evidence-Based Prevention and Rehabilitation. Human Kinetics.'
    },
    {
      title: 'Dr. Peter Attia — Outlive: The Science and Art of Longevity',
      citation: 'Attia, P. & Gifford, B. (2023). Outlive: The Science and Art of Longevity. Harmony Books.'
    },
    {
      title: 'Heavy Slow Resistance & Tendon Remodeling',
      citation: 'Kongsgaard, M. et al. (2009). Corticosteroid injections, eccentric decline squat training and heavy slow resistance training in patellar tendinopathy. Scand J Med Sci Sports.'
    },
    {
      title: 'The Lancet Grip Strength & All-Cause Longevity Study',
      citation: 'Leong, D. P. et al. (2015). Prognostic value of grip strength: findings from the Prospective Urban Rural Epidemiology (PURE) study. The Lancet, 386(9990), 266-273.'
    }
  ]
};
