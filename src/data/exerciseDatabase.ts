import { ExerciseGuide } from '../types/sport';

export const EXERCISE_DATABASE: Record<string, ExerciseGuide> = {
  // PUSH
  'barbell-bench-press': {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    category: 'Push',
    setup: 'Lie flat on the bench, feet planted firmly into the floor, shoulder blades retracted and depressed. Grip just wider than shoulder width.',
    execution: 'Lower the bar under control to the mid-chest/sternum, keeping elbows tucked at ~45 degrees from torso. Press back up to lockout along a slight backward arc.',
    cue: 'Drive your feet through the floor and pull the bar apart horizontally to engage the upper back.',
    avoid: 'Flaring elbows to 90 degrees, lifting hips off the bench, or bouncing the barbell off the sternum.',
    progressTo: '2-Second Pause Bench Press or Close-Grip Bench Press',
    whenToProgress: 'When all prescribed sets/reps are completed with RPE <= 7 and zero technique deviation for 2 consecutive weeks.',
    regressTo: 'Dumbbell Flat Bench Press or Deficit Push-Up',
    whenToRegress: 'If shoulder anterior impingement occurs, or if athlete misses the rep floor for two consecutive sessions (Two-Strike Rule).',
    sportsScienceRationale: 'Horizontal pressing force produces maximal pectoralis major, anterior deltoid, and triceps motor unit recruitment.',
    equipmentAlternatives: [
      { name: 'Flat Dumbbell Bench Press', equipment: 'Dumbbells & Flat Bench', rationale: 'Allows a converging pressing path that accommodates natural shoulder kinematics with zero barbell rack needed.', exerciseIdFallback: 'dumbbell-bench-press' },
      { name: 'Weighted Parallel Bar Dips', equipment: 'Dip Station / Belt', rationale: 'Heavy bilateral pressing targeting the lower pecs and triceps without requiring a bench press rack.', exerciseIdFallback: 'weighted-dip' },
      { name: 'Floor Dumbbell Press', equipment: 'Dumbbells & Floor Mat', rationale: 'Dead-stop press on the floor that eliminates shoulder hyperextension when all benches are taken.' },
      { name: 'Weighted Push-Up (Plates on Back)', equipment: 'Weight Plates & Floor', rationale: 'Open kinetic chain horizontal press with full scapular protraction on the floor.' }
    ]
  },
  'dumbbell-bench-press': {
    id: 'dumbbell-bench-press',
    name: 'Flat Dumbbell Bench Press',
    category: 'Push',
    setup: 'Sit on bench edge, dumbbells resting on thighs. Kick back smoothly to lie flat. Retract shoulder blades, feet anchored.',
    execution: 'Lower dumbbells until thumbs touch lateral chest line. Press upwards and slightly inward without banging weights.',
    cue: 'Pinch the shoulder blades together like holding a pencil between them.',
    avoid: 'Letting dumbbells drift toward neck or allowing elbows to hyperextend at the bottom.',
    progressTo: 'Barbell Bench Press or 1.5-Rep DB Bench Press',
    whenToProgress: 'When dumbbells become difficult to handle or exceed 40kg each with clean floor lock.',
    regressTo: 'Push-Up with feet elevated or Floor Dumbbell Press',
    whenToRegress: 'If wrist or shoulder stabilization fails at heavy loads.',
    equipmentAlternatives: [
      { name: 'Barbell Bench Press', equipment: 'Barbell & Bench', rationale: 'Direct bilateral compound barbell loading when dumbbells of adequate weight are in use.', exerciseIdFallback: 'barbell-bench-press' },
      { name: 'Deficit Push-Up (Hands on Plates)', equipment: 'Floor & Weight Plates', rationale: 'Full-range pectoral stretch and scapular engagement with zero bench required.' },
      { name: 'Seated Cable Chest Press', equipment: 'Cable Column / Functional Trainer', rationale: 'Continuous peak tension through horizontal adduction.' }
    ]
  },
  'incline-dumbbell-press': {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'Push',
    setup: 'Bench angled at 30 to 45 degrees. Kick dumbbells up to starting lockout, ribs stacked, feet flat.',
    execution: 'Lower under control towards upper clavicular chest line. Drive up with forceful intent.',
    cue: 'Keep chest lifted high toward the ceiling throughout the entire descent.',
    avoid: 'Arching lower back excessively to turn the lift into a flat bench.',
    progressTo: 'Incline Barbell Bench Press or Low Incline DB with Pause',
    whenToProgress: 'When top rep target is met with 2+ reps in reserve.',
    regressTo: 'Incline Push-Up or Landmine Press',
    whenToRegress: 'If anterior shoulder tenderness limits end-range flexion.',
    equipmentAlternatives: [
      { name: 'Half-Kneeling Landmine Press', equipment: 'Landmine / Barbell Corner', rationale: 'Presses at an identical 45-degree clavicular angle without needing an adjustable incline bench.', exerciseIdFallback: 'landmine-press' },
      { name: 'Incline Barbell Bench Press', equipment: 'Incline Barbell Station', rationale: 'Heavy bilateral overload for upper pectoralis and anterior delts.' },
      { name: 'Feet-Elevated Push-Up (Decline Push-Up)', equipment: 'Bench / Box & Floor', rationale: 'Bodyweight angle targets the upper clavicular chest fibers on the floor.' }
    ]
  },
  'standing-overhead-press': {
    id: 'standing-overhead-press',
    name: 'Standing Barbell Overhead Press',
    category: 'Push',
    setup: 'Barbell racked at clavicle height. Feet hip-width, grip just outside shoulders, glutes and abs braced tight.',
    execution: 'Press bar vertically, moving head slightly backward to clear chin, then push head through window once bar clears forehead.',
    cue: 'Brace your midsection as if bracing for a direct punch to the stomach.',
    avoid: 'Hyperextending lumbar spine or turning press into a standing incline bench.',
    progressTo: 'Push Press (integrating lower body triple extension) or 1.5-Rep Strict Press',
    whenToProgress: 'When strict overhead lockout is solid at 0.75x bodyweight.',
    regressTo: 'Half-Kneeling Landmine Press or Seated Dumbbell Shoulder Press',
    whenToRegress: 'If thoracic extension mobility is restricted or lower back arches under load.',
    equipmentAlternatives: [
      { name: 'Standing Dumbbell Overhead Press', equipment: 'Pair of Dumbbells', rationale: 'Permits a neutral grip and independent shoulder stabilization without tying up a barbell rack.' },
      { name: 'Half-Kneeling Landmine Press', equipment: 'Barbell in Landmine Pivot', rationale: 'Protects the lumbar spine and requires no overhead rack height clearance.', exerciseIdFallback: 'landmine-press' },
      { name: 'Kettlebell Overhead Press (Single or Double)', equipment: 'Kettlebells', rationale: 'Center of mass posterior to wrist encourages natural rotator cuff packing.' }
    ]
  },
  'push-press': {
    id: 'push-press',
    name: 'Push Press',
    category: 'Push',
    setup: 'Bar in solid front-rack position across anterior deltoids. Feet hip-to-shoulder width, torso tall.',
    execution: 'Dip knees 4–6 inches straight down in an upright elevator motion, violently drive through heels, and punch bar overhead.',
    cue: 'Dip, drive, press! The legs start the movement, the shoulders finish it.',
    avoid: 'Dipping too forward on toes or pressing with the arms before hips finish extending.',
    progressTo: 'Jerk or Split Jerk / Olympic Complex',
    whenToProgress: 'When bar speed exceeds 1.2 m/s on initial drive.',
    regressTo: 'Standing Dumbbell Push Press or Strict Overhead Press',
    whenToRegress: 'If knee tracking collapses during dip or timing is uncoordinated.',
    equipmentAlternatives: [
      { name: 'Dumbbell Push Press', equipment: 'Pair of Heavy Dumbbells', rationale: 'Identical dip-drive lower-body kinetic chain transfer without needing a front-rack barbell.' },
      { name: 'Single-Arm Kettlebell Push Press', equipment: 'Kettlebell', rationale: 'Trains unilateral vertical hip drive and overhead anti-lateral flexion core stability.' },
      { name: 'Medicine Ball Chest Push / Overhead Throw', equipment: 'Medicine Ball + High Wall', rationale: 'Pure velocity and explosive intent with zero joint deceleration on catch.' }
    ]
  },
  'weighted-dip': {
    id: 'weighted-dip',
    name: 'Weighted Dip',
    category: 'Push',
    setup: 'Mount parallel bars with locked arms. Lean torso forward ~15-20 degrees. Weight belt or dumbbell between feet.',
    execution: 'Lower until shoulders are just below elbow joints (90 deg bend). Press forcefully back to complete lockout.',
    cue: 'Maintain a forward chest tilt to recruit pectorals and protect anterior capsule.',
    avoid: 'Dropping down rapidly or going beyond 90 degrees with heavy loads.',
    progressTo: 'Add 2.5–5kg weight plate or Ring Dips',
    whenToProgress: 'When 3x10 bodyweight reps are performed with flawless control.',
    regressTo: 'Band-Assisted Dip or Deficit Push-Up',
    whenToRegress: 'If sternum or AC joint discomfort is present.',
    equipmentAlternatives: [
      { name: 'Decline Dumbbell Bench Press', equipment: 'Adjustable Bench & Dumbbells', rationale: 'Matches the downward pressing line of action when the dip station is occupied.' },
      { name: 'Deficit Push-Up (Hands on Dumbbells)', equipment: 'Pair of Hex DBs & Floor', rationale: 'Deep pec stretch and triceps lockout right on the gym floor.' },
      { name: 'Close-Grip Bench Press', equipment: 'Barbell & Bench', rationale: 'Heavy horizontal pressing emphasis on the triceps and anterior deltoids.', exerciseIdFallback: 'barbell-bench-press' }
    ]
  },
  'plyo-push-up': {
    id: 'plyo-push-up',
    name: 'Plyometric Push-Up',
    category: 'Power & Plyometrics',
    setup: 'Standard push-up position, core braced rigid, hands under shoulders.',
    execution: 'Lower chest with control, then explode off the floor violently so hands leave the ground. Absorb landing softly.',
    cue: 'Land like a spring: immediately absorb impact with bent elbows and transition smoothly.',
    avoid: 'Letting pelvis sag or landing with rigid, locked elbows.',
    progressTo: 'Clapping Push-Up or Drop Push-Up from mini-blocks',
    whenToProgress: 'When vertical hand clearance exceeds 4 inches on all reps.',
    regressTo: 'Incline Plyo Push-Up on bench or Fast Tempo Standard Push-Up',
    whenToRegress: 'If athlete cannot break ground contact without lumbar hyperextension.',
    equipmentAlternatives: [
      { name: 'Medicine Ball Chest Pass into Wall', equipment: 'Med Ball & Wall', rationale: 'Allows max upper-body acceleration without wrist-landing impact forces.', exerciseIdFallback: 'rotational-med-ball-throw' },
      { name: 'Incline Bench Plyo Push-Up', equipment: 'Weight Bench', rationale: 'Reduces gravitational load to prioritize explosive hand detachment velocity.' }
    ]
  },
  'landmine-press': {
    id: 'landmine-press',
    name: 'Landmine Single-Arm Press',
    category: 'Push',
    setup: 'Staggered athletic stance, hold sleeve of barbell at anterior shoulder. Opposite foot forward.',
    execution: 'Press barbell along natural 45-degree upward arc, driving through front foot and hip. Lower with control.',
    cue: 'Punch the bar through the wall in front of you while keeping ribs down.',
    avoid: 'Twisting lower back or overarching the spine.',
    progressTo: 'Rotational Landmine Punch with hip drive',
    whenToProgress: 'When scapular control is rock solid and loading feels light.',
    regressTo: 'Half-Kneeling Landmine Press (eliminates stance cheat)',
    whenToRegress: 'If pelvic stability is weak in standing position.',
    equipmentAlternatives: [
      { name: 'Standing Single-Arm Dumbbell Incline Press', equipment: 'Single Dumbbell', rationale: 'Mimics the 45-degree upward punching arc without needing a barbell corner/pivot.' },
      { name: 'Cable Standing Single-Arm Chest Press', equipment: 'Cable Column', rationale: 'Provides horizontal and diagonal rotational drive under constant cable tension.' }
    ]
  },

  // PULL
  'weighted-pull-up': {
    id: 'weighted-pull-up',
    name: 'Weighted Pull-Up',
    category: 'Pull',
    setup: 'Overhand grip slightly wider than shoulders. Dead hang with engaged scaps. Weight belt suspended at waist.',
    execution: 'Drive elbows down and back to pockets, pulling chest up to touch the bar. Lower under complete control.',
    cue: 'Pull your elbows into your back pockets, lead with the chest bone.',
    avoid: 'Kicking legs, kipping, or stopping short of full dead hang at bottom.',
    progressTo: 'Add +2.5kg or perform L-Sit Pull-Ups',
    whenToProgress: 'When 8 clean reps at current weight can be completed.',
    regressTo: 'Band-Assisted Pull-Up or Heavy Lat Pulldown',
    whenToRegress: 'If chin cannot clear bar for 3 consecutive reps.',
    equipmentAlternatives: [
      { name: 'Heavy Lat Pulldown', equipment: 'Cable Lat Machine', rationale: 'Exact vertical pulling line of force with granular incremental loading if the pull-up bar is taken.', exerciseIdFallback: 'lat-pulldown' },
      { name: 'Heavy Chest-Supported Incline Row', equipment: 'Incline Bench & Heavy DBs', rationale: 'High-load upper-back lat development without bodyweight hang requirements.' },
      { name: 'Kneeling Lat Pulldown with Resistance Bands', equipment: 'Bands anchored high', rationale: 'Vertical lat loading in any corner of the gym.' }
    ]
  },
  'lat-pulldown': {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Pull',
    setup: 'Thighs wedged securely beneath roller pads. Grip angled bar outside shoulders.',
    execution: 'Pull bar smoothly to upper clavicle, driving elbows downwards. Slowly release back to full stretch.',
    cue: 'Lead with the elbows, keep chest proud.',
    avoid: 'Swinging torso back 45 degrees to generate momentum.',
    progressTo: 'Eccentric 4-second Pulldown or Bodyweight Chin-Up',
    whenToProgress: 'When pulling bodyweight equivalent on cable stack.',
    regressTo: 'Chest-Supported Cable Row',
    whenToRegress: 'If grip or shoulder elevation hinders movement.',
    equipmentAlternatives: [
      { name: 'Bodyweight Pull-Up / Chin-Up', equipment: 'Pull-Up Bar', rationale: 'Direct vertical bodyweight pulling when the cable pulldown station is occupied.', exerciseIdFallback: 'weighted-pull-up' },
      { name: 'Dumbbell Pullover on Bench', equipment: 'Single Dumbbell & Bench', rationale: 'Isolates the latissimus dorsi through deep shoulder flexion.' },
      { name: 'Banded Kneeling Lat Pulldown', equipment: 'Heavy Loop Band', rationale: 'Fast setup anywhere in the gym with identical overhead lat vector.' }
    ]
  },
  'barbell-bent-over-row': {
    id: 'barbell-bent-over-row',
    name: 'Barbell Bent-Over Row / Pendlay Row',
    category: 'Pull',
    setup: 'Hinge at hips to 45–60 degrees (Pendlay parallel to floor). Bar over mid-foot, spine neutral.',
    execution: 'Pull bar to lower ribs / upper abdomen, driving elbows behind torso. Lower back to floor or mid-shin.',
    cue: 'Brace core hard like a deadlift; the low back must not round.',
    avoid: 'Standing upright as fatigue sets in or jerking weight with hips.',
    progressTo: 'Pendlay Row from dead floor stops or Snatch-Grip Barbell Row',
    whenToProgress: 'When strict back angle is held for all prescribed sets.',
    regressTo: 'Chest-Supported Incline DB Row or Single-Arm DB Row',
    whenToRegress: 'If lower back fatigues before upper lats and rhomboids.',
    equipmentAlternatives: [
      { name: 'Chest-Supported Incline Dumbbell Row', equipment: 'Incline Bench & DBs', rationale: 'Eliminates lower-back shear so lats and rhomboids receive 100% focused stimulus.' },
      { name: 'One-Arm Dumbbell Row', equipment: 'Flat Bench & Dumbbell', rationale: 'Allows heavy unilateral loading and deeper lat range of motion.', exerciseIdFallback: 'one-arm-dumbbell-row' },
      { name: 'Seated Cable Row (Neutral Grip)', equipment: 'Cable Row Machine', rationale: 'Constant horizontal pulling tension through full scapular retraction.' },
      { name: 'T-Bar Row Machine', equipment: 'T-Bar Station', rationale: 'Heavy mid-back thickness work with fixed foot plate stability.' }
    ]
  },
  'one-arm-dumbbell-row': {
    id: 'one-arm-dumbbell-row',
    name: 'One-Arm Dumbbell Row',
    category: 'Pull',
    setup: 'Opposite knee and hand supported on flat bench. Free arm holding DB straight down.',
    execution: 'Row dumbbell towards hip crease in an arc, squeezing shoulder blade at top. Lower slowly.',
    cue: 'Keep hips and shoulders level with the floor; don\'t rotate to fling the dumbbell.',
    avoid: 'Yanking with lower back instead of latissimus dorsi.',
    progressTo: 'Kroc Rows (high rep heavy) or Meadows Row',
    whenToProgress: 'When dumbbell maxes gym stock.',
    regressTo: 'Cable Single-Arm Row with seated bench support',
    whenToRegress: 'If hip or hamstring flexibility is limiting stance.',
    equipmentAlternatives: [
      { name: 'Chest-Supported Row Machine', equipment: 'Rowing Machine', rationale: 'Supported chest pad locks out spinal cheating when dumbbells are in use.' },
      { name: 'Single-Arm Half-Kneeling Cable Row', equipment: 'Cable Tower', rationale: 'Unilateral horizontal pull with active anti-rotational core stabilization.' },
      { name: 'Landmine Single-Arm Row (Meadows Row)', equipment: 'Barbell in Landmine', rationale: 'Thick grip barbell pulling targeting the lower lat fibers.' }
    ]
  },
  'face-pull': {
    id: 'face-pull',
    name: 'Face Pull',
    category: 'Pull',
    setup: 'Rope attachment at eye level on cable tower. Stand with slight knee flex, core braced.',
    execution: 'Pull rope toward eyes/forehead, flaring elbows wide and rotating hands back so thumbs point behind you.',
    cue: 'Finish in a double-biceps pose with thumbs pointed backwards.',
    avoid: 'Using excessive weight and turning it into a jerky upright row.',
    progressTo: 'Face Pull with 3-second isometric external rotation hold',
    whenToProgress: 'When posture and rear delt activation are locked in.',
    regressTo: 'Resistance Band Pull-Apart',
    whenToRegress: 'If internal rotation compensations occur.',
    equipmentAlternatives: [
      { name: 'Resistance Band Pull-Apart', equipment: 'Loop or Mini Resistance Band', rationale: 'Perform anywhere on the gym floor; excellent rotator cuff and rear-delt activation.' },
      { name: 'Prone Incline Rear-Delt DB Fly', equipment: 'Incline Bench & Light DBs', rationale: 'Direct rear deltoid and lower trap isolation without cable stack.' },
      { name: 'Chest-Supported Y-Raise (Dumbbells)', equipment: 'Incline Bench & 5-10lb DBs', rationale: 'Strengthens lower trapezius and upward scapular rotation.' }
    ]
  },

  // SQUAT & LUNGE
  'barbell-back-squat': {
    id: 'barbell-back-squat',
    name: 'Barbell Back Squat',
    category: 'Squat & Lunge',
    setup: 'Bar securely pinned on upper traps (high bar) or rear delts (low bar). Feet shoulder-width, slight toe-out.',
    execution: 'Inhale deep diaphragmatic breath, brace core. Break hips and knees together, descend to crease below knee. Drive up.',
    cue: 'Spread the floor with your feet and drive the traps straight up into the bar.',
    avoid: 'Knee valgus collapse (knees caving in), heels lifting off floor, or chest collapsing forward.',
    progressTo: '3-Second Pause Back Squat or Front Squat',
    whenToProgress: 'When hitting depth and rep ceiling for 2 cycles.',
    regressTo: 'Box Squat to parallel bench or Goblet Squat',
    whenToRegress: 'If hip mobility prevents reaching parallel without lumbar flexion (butt wink).',
    equipmentAlternatives: [
      { name: 'Heavy Goblet Squat', equipment: 'Heavy DB or KB', rationale: 'Maintains vertical spine and deep knee flexion; requires zero squat rack.', exerciseIdFallback: 'goblet-squat' },
      { name: 'Bulgarian Split Squat (Dumbbells)', equipment: 'Dumbbells & Flat Bench', rationale: 'Delivers equal or superior single-leg quadriceps recruitment with half the axial spine compression.', exerciseIdFallback: 'bulgarian-split-squat' },
      { name: 'Safety Squat Bar (SSB) Squat', equipment: 'SSB Bar & Rack', rationale: 'Comfortable padded yoke that spares beat-up shoulders and wrists.' },
      { name: '45-Degree Leg Press Machine', equipment: 'Leg Press', rationale: 'Heavy lower-body overload when free-weight racks are completely packed.' }
    ]
  },
  'front-squat': {
    id: 'front-squat',
    name: 'Front Squat',
    category: 'Squat & Lunge',
    setup: 'Bar racked across anterior delts, high elbows parallel to floor, clean grip or straps/cross-arm.',
    execution: 'Descend vertically keeping torso upright, hips dropping between ankles. Stand tall driving elbows up.',
    cue: 'Proud chest, laser elbows pointing straight ahead.',
    avoid: 'Letting elbows drop, which dumps barbell forward off deltoids.',
    progressTo: 'Pause Front Squat or 1.5-Rep Front Squat',
    whenToProgress: 'When maintaining upright spine at 1.2x bodyweight.',
    regressTo: 'Goblet Squat with kettlebell or Safety Bar Squat',
    whenToRegress: 'If wrist or lat tightness precludes front rack hold.',
    equipmentAlternatives: [
      { name: 'Heavy Double-Kettlebell Front Squat', equipment: 'Pair of Heavy KBs', rationale: 'Unlocks identical upright torso demands with clean kettlebell rack comfort.' },
      { name: 'Goblet Squat (Heavy DB)', equipment: 'Single Heavy DB', rationale: 'Anterior load cues pristine thoracic extension without rack setup.', exerciseIdFallback: 'goblet-squat' },
      { name: 'Zercher Squat (Crook of Elbows)', equipment: 'Barbell in Rack', rationale: 'Massive anterior core and upper-back challenge without wrist strain.' }
    ]
  },
  'goblet-squat': {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    category: 'Squat & Lunge',
    setup: 'Hold heavy dumbbell or kettlebell vertically at chest like a goblet. Feet slightly wider than shoulder-width.',
    execution: 'Squat down between legs until elbows gently brush inside of knees. Drive back up through whole foot.',
    cue: 'Use elbows to guide knees outwards as you sit down.',
    avoid: 'Rounding upper spine under dumbbell weight.',
    progressTo: 'Barbell Front Squat or Safety Squat Bar',
    whenToProgress: 'When maxing out available kettlebell/dumbbell weight.',
    regressTo: 'Box Squat to 16-inch box',
    whenToRegress: 'If athlete struggles with squat depth or balance.',
    equipmentAlternatives: [
      { name: 'Bulgarian Split Squat (Dumbbells)', equipment: 'Pair of Dumbbells & Flat Bench', rationale: 'Equal or superior single-leg quadriceps recruitment with half the axial spine compression.', exerciseIdFallback: 'bulgarian-split-squat' },
      { name: 'Barbell Front Squat', equipment: 'Barbell in Rack or 2x KBs', rationale: 'Anterior load cues pristine upright thoracic posture and deep knee flexion.', exerciseIdFallback: 'front-squat' },
      { name: 'Dumbbell Walking Lunge', equipment: 'Pair of Dumbbells', rationale: 'Dynamic single-leg knee extensor strength and hip stabilizer endurance.' },
      { name: '45-Degree Leg Press Machine', equipment: 'Leg Press Station', rationale: 'Safely allows high-volume quadriceps and glute hypertrophy with zero axial spine loading.' },
      { name: 'Barbell Back Squat', equipment: 'Barbell & Rack', rationale: 'Bilateral strength overload when dumbbells become too light.', exerciseIdFallback: 'barbell-back-squat' },
      { name: 'Box Squat to Parallel Bench', equipment: 'Dumbbell or Kettlebell & 16-inch Box', rationale: 'Enforces strict depth control while sparing patellar tendon shear stress.' }
    ]
  },
  'bulgarian-split-squat': {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'Squat & Lunge',
    setup: 'Rear foot laces down on 12-16 inch bench. Front foot out far enough so shin remains vertical or slightly forward.',
    execution: 'Drop rear knee straight down toward floor. Drive through front heel to return to top.',
    cue: 'Think of dropping your hips into an elevator shaft—straight down, not sliding forward.',
    avoid: 'Leaning excessively backwards or placing front foot too close to bench.',
    progressTo: 'Front-Rack Kettlebell Split Squat or Rear Foot on 30cm Box with Deficit',
    whenToProgress: 'When sets with dumbbells equal to 40% bodyweight feel balanced.',
    regressTo: 'Reverse Lunge on flat floor or TRX-Assisted Split Squat',
    whenToRegress: 'If knee shear pain or balance prevents proper range of motion.',
    equipmentAlternatives: [
      { name: 'Reverse Lunge (Floor)', equipment: 'Pair of Dumbbells & Floor', rationale: 'Eliminates elevated rear-foot balance demands while preserving single-leg hip loading.' },
      { name: 'High-Box Step-Up', equipment: 'Plyo Box / Bench & DBs', rationale: 'Unilateral glute and quad drive with lower balance complexity.', exerciseIdFallback: 'box-jump' },
      { name: 'Single-Leg Leg Press', equipment: 'Leg Press Machine', rationale: 'Pure unilateral leg drive without balance constraints.' }
    ]
  },
  'nordic-hamstring-curl': {
    id: 'nordic-hamstring-curl',
    name: 'Nordic Hamstring Curl',
    category: 'Squat & Lunge',
    setup: 'Kneel on padded mat. Partner locks ankles securely, or hook heels beneath weighted bar/specialized pad. Hips fully extended.',
    execution: 'Keep straight line from knees through hips to shoulders. Lower torso as slowly as possible using hamstrings to resist gravity. Catch on floor with hands and push back up.',
    cue: 'Break at the knees, NEVER at the hips. Stay like an iron plank.',
    avoid: 'Bending at waist or shooting butt backwards to avoid hamstring load.',
    progressTo: 'Unhanded Eccentric or Full Concentric Nordic Curl',
    whenToProgress: 'When lowering phase exceeds 5 seconds with zero hip flexion.',
    regressTo: 'Banded Nordic Curl (band anchored to chest) or Swiss Ball Leg Curls',
    whenToRegress: 'If cramp or inability to resist gravity lasts less than 2 seconds.',
    sportsScienceRationale: 'Petersen et al. (2011) showed a 51% reduction in acute hamstring strains in elite football/soccer players using progressive Nordic curls.',
    equipmentAlternatives: [
      { name: 'Seated or Lying Hamstring Curl Machine', equipment: 'Hamstring Machine', rationale: 'Isolated knee flexion eccentric overload if no partner or Nordic bench is available.' },
      { name: 'Swiss Ball / Floor Slider Leg Curls', equipment: 'Stability Ball or Furniture Sliders', rationale: 'Simultaneous hip extension and knee flexion on the gym floor.' },
      { name: 'Heavy Romanian Deadlift (Slow 4s Eccentric)', equipment: 'Barbell or Dumbbells', rationale: 'Lengthens hamstring fascicles under heavy eccentric load.', exerciseIdFallback: 'romanian-deadlift' }
    ]
  },
  'copenhagen-plank': {
    id: 'copenhagen-plank',
    name: 'Copenhagen Adductor Plank',
    category: 'Core & Armor',
    setup: 'Side plank position. Place top leg on top of a bench (knee or ankle), bottom leg free underneath.',
    execution: 'Elevate hips into a straight line, lifting bottom leg to hover right beneath bench. Hold with high adductor tension.',
    cue: 'Squeeze the bench like a pair of giant scissors closing.',
    avoid: 'Letting top hip drop or rotating torso towards the floor.',
    progressTo: 'Ankle-only contact (longer lever arm) or Copenhagen Adductor Raises',
    whenToProgress: 'When holding 30s per side with zero hip sagging.',
    regressTo: 'Knee-contact version (shorter lever arm) on bench',
    whenToRegress: 'If groin tenderness occurs or lever arm creates excessive adductor strain.',
    equipmentAlternatives: [
      { name: 'Side Plank with Top Leg Band Adduction', equipment: 'Resistance Band & Pole', rationale: 'Active adductor recruitment against band resistance without bench.' },
      { name: 'Cable Standing Hip Adduction', equipment: 'Low Cable Ankle Strap', rationale: 'Direct isolated adductor strength curve under cable load.' }
    ]
  },
  'spanish-squat-isometric': {
    id: 'spanish-squat-isometric',
    name: 'Spanish Squat Isometric Hold',
    category: 'Squat & Lunge',
    setup: 'Heavy looped resistance band anchored behind a sturdy upright. Loop band around both knees right below joint line.',
    execution: 'Step back to create heavy band tension. Sit back into a 70-90 degree squat with vertical shins. Hold position statically.',
    cue: 'Drive knees back hard against the band while maintaining an upright chest.',
    avoid: 'Letting knees collapse forward over toes or losing band tension.',
    progressTo: 'Add dumbbell goblet load or extend hold to 45–60 seconds',
    whenToProgress: 'When 45s holds provide analgesia and complete quadriceps endurance.',
    regressTo: 'Wall Sit with isometric ball squeeze',
    whenToRegress: 'If acute patellar tendinopathy triggers pain > 3/10 during hold.',
    sportsScienceRationale: 'Rio et al. (2015) demonstrated that 5x45s isometric quadriceps contractions produce immediate pain relief (analgesia) and motor cortex inhibition reduction for patellar tendinopathy.',
    equipmentAlternatives: [
      { name: 'Wall Sit (with Knee Adductor Squeeze)', equipment: 'Wall & Medicine Ball', rationale: '45-second static quadriceps loading available against any gym wall with zero band needed.' },
      { name: 'Leg Extension Isometric Hold at 60 Degrees', equipment: 'Leg Extension Machine', rationale: 'Direct isolated patellar tendon loading on machine stack (hold 45s at 60 deg).' },
      { name: 'Slant Board Single-Leg Squat Isometric Hold', equipment: 'Decline Board / 25lb Plate', rationale: 'High localized patellar tendon load without heavy band.' }
    ]
  },

  // HINGE
  'conventional-deadlift': {
    id: 'conventional-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'Hinge',
    setup: 'Feet hip-width, bar cutting mid-foot in half. Bend and grip bar outside knees. Pull slack out until bar clicks against plates.',
    execution: 'Drive the floor away with the legs. Keep bar dragging along shins and thighs. Lock hips and knees simultaneously.',
    cue: 'Push the earth away from you rather than trying to yank the bar off the floor.',
    avoid: 'Rounding lumbar spine, hyperextending back at lockout, or letting bar drift forward.',
    progressTo: 'Deficit Deadlift or Paused Deadlift (1 inch off floor)',
    whenToProgress: 'When 2x bodyweight deadlift is achieved with neutral spine.',
    regressTo: 'Trap Bar Deadlift or Romanian Deadlift from pins',
    whenToRegress: 'If athlete has anthropometric limitations (long femur, short arms) causing lumbar rounding.',
    equipmentAlternatives: [
      { name: 'Trap Bar (Hex Bar) Deadlift', equipment: 'Trap Bar & Plates', rationale: 'Neutral grip with center of mass inline with hips; easier on lumbar spine.', exerciseIdFallback: 'trap-bar-deadlift' },
      { name: 'Heavy Romanian Deadlift (Barbell or DBs)', equipment: 'Barbell or Dumbbells', rationale: 'Focuses entirely on the posterior chain eccentric hinge.', exerciseIdFallback: 'romanian-deadlift' },
      { name: 'Heavy Kettlebell Deadlift from Blocks', equipment: 'Heavy KBs / Elevated Blocks', rationale: 'Great high-load hinge when platforms are occupied.' }
    ]
  },
  'trap-bar-deadlift': {
    id: 'trap-bar-deadlift',
    name: 'Trap Bar (Hex Bar) Deadlift',
    category: 'Hinge',
    setup: 'Stand centered inside hexagonal bar, feet hip-width. Hinge down, grip neutral handles, pull chest tall.',
    execution: 'Drive feet straight down into the platform. Hips and shoulders rise at the same rate. Stand tall without leaning back.',
    cue: 'Leg press the floor away.',
    avoid: 'Letting knees shoot back first (turning it into a stiff-leg deadlift).',
    progressTo: 'Low Handles or Band-Resisted Trap Bar Pulls',
    whenToProgress: 'When high handle capacity exceeds 2.2x bodyweight.',
    regressTo: 'Kettlebell Deadlift from elevated blocks',
    whenToRegress: 'If back fatigue or hip motor control breaks down.',
    equipmentAlternatives: [
      { name: 'Conventional Barbell Deadlift', equipment: 'Olympic Barbell & Plates', rationale: 'Direct straight-bar pull when the gym only has standard barbells.', exerciseIdFallback: 'conventional-deadlift' },
      { name: 'Heavy Dumbbell Suitcase Deadlift', equipment: 'Pair of Heavy DBs', rationale: 'Neutral grip at sides mimicking the exact hex-bar hand position.' },
      { name: 'Barbell Romanian Deadlift', equipment: 'Barbell', rationale: 'Pure posterior chain force development.', exerciseIdFallback: 'romanian-deadlift' }
    ]
  },
  'romanian-deadlift': {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    category: 'Hinge',
    setup: 'Start from standing with bar or dumbbells at thighs. Soft knees (15-20 deg bend), core braced.',
    execution: 'Push hips straight back toward the wall behind you. Slide weights down thighs to mid-shin until hamstrings stretch. Drive hips forward.',
    cue: 'Close the car door with your hips while holding groceries in both hands.',
    avoid: 'Squatting the weight down or letting lower back round.',
    progressTo: 'Deficit RDL or Single-Leg RDL',
    whenToProgress: 'When full hamstring stretch is reached with 1.2x bodyweight on bar.',
    regressTo: 'Kettlebell RDL or Dowel-Guided Wall Hinge Drill',
    whenToRegress: 'If athlete cannot decouple hip hinging from knee bending.',
    equipmentAlternatives: [
      { name: 'Dumbbell Romanian Deadlift', equipment: 'Pair of Dumbbells', rationale: 'Allows weights to track naturally along the lateral shins without barbell drag.' },
      { name: 'Single-Leg Romanian Deadlift', equipment: 'Single Dumbbell / Kettlebell', rationale: 'Deep eccentric hamstring stretch and pelvic anti-rotation with lighter weights.' },
      { name: 'Cable Pull-Through', equipment: 'Low Cable & Rope', rationale: 'Forces aggressive horizontal glute lockout at the top.' }
    ]
  },

  // POWER & PLYOMETRICS
  'hang-power-clean': {
    id: 'hang-power-clean',
    name: 'Hang Power Clean',
    category: 'Power & Plyometrics',
    setup: 'Deadlift bar to standing, then slide bar down thighs to mid-thigh power position. Knees soft, chest over bar.',
    execution: 'Violently extend hips, knees, and ankles (triple extension), shrug traps, whip elbows fast underneath, and catch on front delts in quarter squat.',
    cue: 'Jump the bar to the ceiling and snap the elbows through like lightning.',
    avoid: 'Pulling with the arms early before the hips finish snapping, or catching in a deep round-back squat.',
    progressTo: 'Full Clean from floor or Clean High Pull with heavy load',
    whenToProgress: 'When bar turnover is instantaneous and catch is stable at 75-80% 1RM.',
    regressTo: 'Dumbbell High Pull or Heavy Kettlebell Swing',
    whenToRegress: 'If wrist mobility prevents front rack catch or technique creates jarring impact.',
    equipmentAlternatives: [
      { name: 'Single-Arm Dumbbell Snatch', equipment: 'Single Dumbbell', rationale: 'Rapid hip extension into overhead punch without wrist catch discomfort.', exerciseIdFallback: 'hang-power-clean' },
      { name: 'Heavy Kettlebell Swing (Russian)', equipment: 'Heavy Kettlebell', rationale: 'Violent hip hinge rate of force development when bumpers are unavailable.' },
      { name: 'Trap Bar High Pull', equipment: 'Trap Bar', rationale: 'Explosive triple extension shrug without wrist turnover.' }
    ]
  },
  'trap-bar-jump-squat': {
    id: 'trap-bar-jump-squat',
    name: 'Trap Bar Jump Squat',
    category: 'Power & Plyometrics',
    setup: 'Step inside trap bar loaded with 15–30% of 1RM squat (light explosive load). Neutral grip.',
    execution: 'Dip into quarter squat, explode vertically off the floor for maximum height. Absorb landing softly and reset.',
    cue: 'Reach for the rafters with your head; leave the floor behind you.',
    avoid: 'Overloading with heavy weight that turns the jump into a slow grind.',
    progressTo: 'Band-Accelerated Jumps or Contrast Depth Jumps',
    whenToProgress: 'When peak flight height and ground velocity are maintained.',
    regressTo: 'Bodyweight Box Jump or Broad Jump',
    whenToRegress: 'If landing mechanics are stiff or knees buckle on contact.',
    equipmentAlternatives: [
      { name: 'Dumbbell Jump Squat', equipment: 'Pair of Light Dumbbells (15-25 lb)', rationale: 'Holds dumbbells at sides for loaded vertical propulsion with zero rack needed.' },
      { name: 'Bodyweight Box Jump (Max Height)', equipment: 'Plyo Box (30-36 inch)', rationale: 'Explosive triple extension with zero joint impact on landing.', exerciseIdFallback: 'box-jump' },
      { name: 'Medicine Ball Overhead Backward Toss', equipment: 'Med Ball & Open Space', rationale: 'Full-body triple extension release.' }
    ]
  },
  'box-jump': {
    id: 'box-jump',
    name: 'Box Jump (Stick Landing)',
    category: 'Power & Plyometrics',
    setup: 'Stand arm\'s length from sturdy plyo box (24–36 inches). Feet hip-width.',
    execution: 'Swing arms back, dip hips, explode up. Land softly in the center of the box with knees soft, sticking landing for 1 second. Step down.',
    cue: 'Land like a ninja—silent feet on the box.',
    avoid: 'Jumping off the box on the descent, or picking a box so tall you land in a deep tucked fetal position.',
    progressTo: 'Increase box height or perform Hurdle Hop to Box Jump',
    whenToProgress: 'When landing is whisper quiet and absorbed through hips.',
    regressTo: 'Step-Ups or Lower Box (18-20 inch)',
    whenToRegress: 'If athlete makes loud slamming contact upon landing.',
    equipmentAlternatives: [
      { name: 'Standing Broad Jump (Stick Landing)', equipment: 'Floor / Turf', rationale: 'Pure horizontal triple extension and landing absorption without needing a plyo box.' },
      { name: 'Tuck Jump to Stick Landing', equipment: 'Gym Floor', rationale: 'Vertical power on flat floor.' },
      { name: 'Weighted Box Step-Up (Explosive Knee Drive)', equipment: 'Bench / Sturdy Box & DBs', rationale: 'Single-leg vertical drive.' }
    ]
  },
  'medicine-ball-slam': {
    id: 'medicine-ball-slam',
    name: 'Medicine Ball Slam',
    category: 'Power & Plyometrics',
    setup: 'Athletic stance holding a non-bouncing slam ball (10–25 lb) at chest.',
    execution: 'Reach up fully on toes with ball high overhead, then violently contract abs and slam ball into floor directly in front of feet.',
    cue: 'Exhale hard and spike the ball through the gym floor.',
    avoid: 'Bending purely at the lumbar spine without engaging the core and hips.',
    progressTo: 'Heavier Slam Ball or Rotational Scoop Toss',
    whenToProgress: 'When velocity and hip extension are effortless.',
    regressTo: 'Lighter 6-8 lb Slam Ball or Standing Cable Pulldown',
    whenToRegress: 'If lower back feels strained during downward acceleration.',
    equipmentAlternatives: [
      { name: 'Battle Rope Explosive Double Slams', equipment: 'Battle Ropes', rationale: 'Simultaneous overhead flexion and core acceleration with zero ball rebound.', exerciseIdFallback: 'neck-armor-protocol' },
      { name: 'Explosive Cable Woodchopper (High to Low)', equipment: 'Cable Tower', rationale: 'High-velocity abdominal pulling under constant load.' }
    ]
  },
  'rotational-med-ball-throw': {
    id: 'rotational-med-ball-throw',
    name: 'Rotational Medicine Ball Throw',
    category: 'Power & Plyometrics',
    setup: 'Stand perpendicular to concrete wall, 3–4 feet away. Ball held at back hip in athletic stance.',
    execution: 'Shift weight from back hip to front hip, rotate pelvis explosively, and release ball into wall with chest/shoulder follow-through.',
    cue: 'Throw from the back hip, not just the arms—like throwing a punch or swinging a bat.',
    avoid: 'Letting back knee collapse inward without hip rotation.',
    progressTo: 'Step-Behind Rotational Throw or Heavier 12-14 lb ball',
    whenToProgress: 'When wall rebound velocity is sharp and explosive.',
    regressTo: 'Half-Kneeling Rotational Chest Pass',
    whenToRegress: 'If rotational hip drive disconnects from torso.',
    equipmentAlternatives: [
      { name: 'Cable Rotational Punch / Chop', equipment: 'Cable Column', rationale: 'Explosive transverse rotation when concrete throw walls are unavailable.' },
      { name: 'Landmine Rotational Pivot Press', equipment: 'Landmine Barbell', rationale: 'Barbell rotational hip transfer and punch.', exerciseIdFallback: 'landmine-press' }
    ]
  },
  'pogo-hops': {
    id: 'pogo-hops',
    name: 'Ankle Pogo Hops (Reactive Elasticity)',
    category: 'Power & Plyometrics',
    setup: 'Tall posture, feet hip-width, knees slightly bent but stiff, toes pulled up (dorsiflexed).',
    execution: 'Bounce rapidly off the balls of feet with minimal ground contact time (< 200 ms). Ankle joint acts like a stiff spring.',
    cue: 'The floor is lava—pop off the turf before it burns you.',
    avoid: 'Letting heels touch the floor or bending knees into deep squats.',
    progressTo: 'Single-Leg Pogo Hops or Low Hurdle Pogos',
    whenToProgress: 'When ground contact is crisp, bouncy, and elastic.',
    regressTo: 'Two-Foot Low Hops or Jump Rope',
    whenToRegress: 'If Achilles or calf tendon lacks adequate stiffness.',
    equipmentAlternatives: [
      { name: 'Speed Jump Rope (Double Unders)', equipment: 'Jump Rope', rationale: 'Trains rhythmic ankle reactive stiffness and short ground contact.' },
      { name: 'Low Hurdle Reactive Bounces', equipment: 'Agility Hurdles or Line on Floor', rationale: 'Multi-directional elastic bounce mechanics.' }
    ]
  },

  // CORE & ARMOR
  'neck-armor-protocol': {
    id: 'neck-armor-protocol',
    name: 'Cervical Neck Armor Circuit (Curls & Extensions)',
    category: 'Core & Armor',
    setup: 'Lie supine (on back) for neck curls; lie prone (on stomach) on bench for neck extensions. Optional light plate with towel.',
    execution: 'Nod chin towards chest for curls (15 reps), then lift head upward towards ceiling for extensions (15 reps). Move through slow, controlled 2-second tempos.',
    cue: 'Smooth rhythm, zero jerking. Build the football/rugby shock absorber.',
    avoid: 'Yanking with heavy weights or snapping movement quickly.',
    progressTo: '4-Way Manual Resistance or Neck Harness with cable load',
    whenToProgress: 'When 2x20 bodyweight reps feel effortless without soreness.',
    regressTo: 'Isometric 4-Way Hand Presses against forehead, sides, and back',
    whenToRegress: 'If any cervical spine disc symptoms or headaches arise.',
    sportsScienceRationale: 'Collins et al. (2014) showed that for every 1-pound increase in neck strength, odds of concussion decrease by 5% in high-impact collision sports.',
    equipmentAlternatives: [
      { name: 'Isometric 4-Way Manual Neck Holds (30s each)', equipment: 'Towel & Hands / Partner', rationale: 'Zero equipment needed; hold static resistance against palm pressure in all 4 planes.' },
      { name: 'Band-Resisted Cervical Retractions', equipment: 'Mini Loop Band', rationale: 'Reinforces deep neck flexors and postural cervical packing.' }
    ]
  },
  'farmers-carry': {
    id: 'farmers-carry',
    name: 'Farmer\'s Carry',
    category: 'Core & Armor',
    setup: 'Pick up heavy trap bar, farmer\'s walk handles, or dumbbells. Stand tall with neutral spine and retracted scaps.',
    execution: 'Walk in a controlled line for prescribed distance (30–40m). Keep ribs stacked over pelvis, resisting any wobble.',
    cue: 'Walk as if balancing a heavy book on your head. Don\'t let the weights sway.',
    avoid: 'Leaning forward, letting shoulders slump forward, or taking rushed uncontrolled steps.',
    progressTo: 'Heavy Farmer\'s Carry (exceeding bodyweight per hand) or Trap Bar Carry',
    whenToProgress: 'When 40m walk is completed without dropping and clean posture.',
    regressTo: 'Suitcase Carry (single dumbbell) or Shorter 20m distance',
    whenToRegress: 'If grip drops before distance or lower back arches.',
    equipmentAlternatives: [
      { name: 'Heavy Trap Bar Carry', equipment: 'Trap Bar loaded with plates', rationale: 'Allows heavier total loading with natural neutral grip.' },
      { name: 'Suitcase Carry (Single Dumbbell / Kettlebell)', equipment: 'Single Heavy DB or KB', rationale: 'High anti-lateral flexion core challenge when gym walkway space is constrained.' },
      { name: 'Plate Pinch Carry', equipment: 'Smooth Weight Plates', rationale: 'Severe grip and forearm armor work.' }
    ]
  },
  'turkish-get-up': {
    id: 'turkish-get-up',
    name: 'Turkish Get-Up',
    category: 'Core & Armor',
    setup: 'Lie on floor holding kettlebell pressed above chest with straight locked elbow. Same side knee bent.',
    execution: 'Roll to elbow, press to hand, bridge hips high, sweep back leg under to half-kneeling, then stand up tall. Reverse every step back down.',
    cue: 'Keep your eyes glued to the kettlebell the entire time.',
    avoid: 'Allowing the working elbow to bend or rushing between transition steps.',
    progressTo: 'Heavier Kettlebell or Speed-Tempo Get-Up',
    whenToProgress: 'When 3 reps per side can be done with absolute robotic control.',
    regressTo: 'Shoe-Balance Get-Up (balancing shoe on fist) or Half Get-Up to Hand',
    whenToRegress: 'If shoulder stability feels unstable or wrists bend.',
    equipmentAlternatives: [
      { name: 'Dumbbell Turkish Get-Up', equipment: 'Light Dumbbell', rationale: 'Identical multi-planar core sequence if kettlebells are in use.' },
      { name: 'Half Get-Up (Roll to Elbow and Hand)', equipment: 'Floor & Light Weight', rationale: 'Focuses on the rotational abdominal sit-up and shoulder packing.' }
    ]
  },
  'hanging-leg-raise': {
    id: 'hanging-leg-raise',
    name: 'Hanging Leg Raise',
    category: 'Core & Armor',
    setup: 'Hang from pull-up bar with overhand grip, shoulders slightly active (scapular pull).',
    execution: 'Curl pelvis under and raise toes or knees toward bar using abdominal compression. Lower slowly without swinging.',
    cue: 'Roll your belt buckle up towards your chin.',
    avoid: 'Swinging legs with momentum like a pendulum.',
    progressTo: 'Toes-to-Bar with 3-second negative descent',
    whenToProgress: 'When 12 strict toes-to-90-degrees reps are done without swing.',
    regressTo: 'Hanging Knee Raise or Lying Reverse Crunch',
    whenToRegress: 'If hip flexors take over or swing breaks rhythm.',
    equipmentAlternatives: [
      { name: 'Captain\'s Chair Knee / Leg Raise', equipment: 'Power Tower Machine', rationale: 'Forearm pads eliminate grip fatigue so abs do 100% of the compression.' },
      { name: 'Lying Floor Dragon Flag or Reverse Crunch', equipment: 'Floor Mat & Post', rationale: 'Zero bar hanging required; anchor hands on a sturdy upright.' },
      { name: 'Ab Wheel Rollout', equipment: 'Ab Wheel Roller', rationale: 'Severe anti-extension anterior core loading.', exerciseIdFallback: 'ab-wheel-rollout' }
    ]
  },
  'ab-wheel-rollout': {
    id: 'ab-wheel-rollout',
    name: 'Ab Wheel Rollout',
    category: 'Core & Armor',
    setup: 'Kneel on pad, grip ab wheel handles beneath chest, round upper back slightly into hollow body posture.',
    execution: 'Roll wheel forward while keeping abs braced and hips open. Go as far as can be controlled, then pull back using core.',
    cue: 'Keep your ribs glued down toward your pelvis—never let your back sag.',
    avoid: 'Over-extending and letting lower back bow into lordosis.',
    progressTo: 'Standing Ab Wheel Rollout or Rollout with Weight Vest',
    whenToProgress: 'When nose touches floor on kneeling rollout for 12 reps.',
    regressTo: 'Rollout to a wall stop (limits distance) or Stability Ball Rollout',
    whenToRegress: 'If lumbar spine feels pinched or hips drop early.',
    equipmentAlternatives: [
      { name: 'Barbell Rollout', equipment: 'Barbell with Round 25/45lb Plates', rationale: 'Uses standard barbell on floor as an immediate ab wheel substitute.' },
      { name: 'Stability Ball Rollout', equipment: 'Swiss Ball', rationale: 'Easier on wrists and lower back while maintaining anti-extension mechanics.' },
      { name: 'RKC Long-Lever Plank Hold', equipment: 'Gym Floor', rationale: 'Maximal static abdominal tension with hands reached 6 inches further forward.' }
    ]
  },

  // CONDITIONING & ENGINE
  'sled-push-prowler': {
    id: 'sled-push-prowler',
    name: 'Sled Push (Prowler)',
    category: 'Conditioning & Engine',
    setup: 'Hands gripping high or low handles of sled. Torso at 45-degree angle, spine neutral.',
    execution: 'Drive violently through balls of feet, driving legs like pistons with short, powerful strides for prescribed distance.',
    cue: 'Punch the ground away behind you with every single step.',
    avoid: 'Standing upright (kills horizontal drive angle) or bouncing hips wildly.',
    progressTo: 'Add load or increase sprint velocity / reduce rest periods',
    whenToProgress: 'When distance is covered under target time.',
    regressTo: 'Lighter sled load or treadmill incline march',
    whenToRegress: 'If stride mechanics deteriorate into plodding shuffle.',
    equipmentAlternatives: [
      { name: 'Dead-Mill / Motor-Off Treadmill Sprints', equipment: 'Standard Treadmill (Turned Off)', rationale: 'Keep treadmill motor off and push the belt manually with your feet for identical horizontal leg drive.' },
      { name: 'Assault / Air Bike 30s All-Out Sprints', equipment: 'Air Bike', rationale: 'Brutal leg and cardiovascular lactate overload without turf track.' },
      { name: 'Heavy Kettlebell / Dumbbell Farmer Walk Intervals', equipment: 'Dumbbells or KBs', rationale: 'Loaded leg drive and metabolic engine when no sled or turf is accessible.', exerciseIdFallback: 'farmers-carry' }
    ]
  },
  'repeated-sprint-series': {
    id: 'repeated-sprint-series',
    name: 'Repeated Sprint Series (Alactic-Aerobic Engine)',
    category: 'Conditioning & Engine',
    setup: 'Cones set at 10m, 15m, 20m, or 30m distances. 2-point staggered athletic start.',
    execution: 'Sprint at 95–100% maximal effort. Decelerate smoothly. Walk back during short rest (20–30s) and repeat.',
    cue: 'Zero coasting—attack the first three steps out of the hole.',
    avoid: 'Jogging the sprints or cutting rest periods too short (turns speed into junk fatigue).',
    progressTo: 'Add reps per set (4 -> 6 -> 8) or increase distance (20m -> 30m)',
    whenToProgress: 'When velocity drop-off across all reps is under 8%.',
    regressTo: 'Tempo Strides at 75% effort or Stationary Bike 20s/40s intervals',
    whenToRegress: 'If sprint speed drops > 15% from fatigue or hamstring tightness occurs.',
    equipmentAlternatives: [
      { name: 'Curved Woodway / Manual Treadmill Sprint Series', equipment: 'Curved Treadmill', rationale: 'Allows true 100% sprint acceleration indoors.' },
      { name: 'Concept2 Rowing Machine 100m Sprint Intervals', equipment: 'Rowing Ergometer', rationale: 'Maximal whole-body power and sprint turnover without outdoor turf.' },
      { name: 'Air Bike 15s All-Out Burst / 45s Rest', equipment: 'Air Bike', rationale: 'Repeat sprint power with zero hamstring deceleration strain.' }
    ]
  },
  'mas-shuttle-intervals': {
    id: 'mas-shuttle-intervals',
    name: '120% MAS Shuttle Intervals (Maximal Aerobic Speed)',
    category: 'Conditioning & Engine',
    setup: 'Measure cones based on athlete MAS score (e.g., 60-70 meters for 15s).',
    execution: 'Run to target cone within 15 seconds, rest 15 seconds. Repeat for 8 to 12 repetitions.',
    cue: 'Metronomic pacing—hit the line exactly on the 15-second beep.',
    avoid: 'Sprinting out too fast in rep 1 and dying by rep 6.',
    progressTo: 'Increase to 12 reps or bump MAS target distance by 5%',
    whenToProgress: 'When heart rate recovers to zone 2 during 3-minute set break.',
    regressTo: '100% MAS Continuous Run or 15s work / 30s rest',
    whenToRegress: 'If athlete fails to reach line before time expires 2 times.',
    equipmentAlternatives: [
      { name: 'Treadmill 15s Run (12-14 mph) / 15s Feet on Rails', equipment: 'Treadmill', rationale: 'Direct mechanical MAS pacing indoors.' },
      { name: 'Rowing Ergometer 15s High Pace / 15s Paddle', equipment: 'Rowing Machine', rationale: 'Non-impact high aerobic velocity intervals.' }
    ]
  },
  'court-17s-intervals': {
    id: 'court-17s-intervals',
    name: '17-Second Court Shuttles (Basketball Engine)',
    category: 'Conditioning & Engine',
    setup: 'Standard basketball court baseline to opposite baseline (full court).',
    execution: 'Sprint baseline-to-baseline touches: goal is 17 touches (or 2.5 full court lengths) in 17 seconds. Rest 45-60s.',
    cue: 'Touch the line, drop your hips, snap back the other way.',
    avoid: 'Spinning around turns instead of planting and cutting low.',
    progressTo: 'Reduce rest from 60s to 45s to 30s',
    whenToProgress: 'When completed within 17s for 5 consecutive sets.',
    regressTo: 'Half-Court Shuttles or 20-second target',
    whenToRegress: 'If athlete fails to finish within 19 seconds.',
    equipmentAlternatives: [
      { name: '17-Second Turf Shuttle (25yd Out and Back)', equipment: 'Cones & Turf', rationale: 'Replicates identical change-of-direction court shuttles on grass/turf.' },
      { name: 'Air Bike 17-Second All-Out Sprint', equipment: 'Air Bike', rationale: 'Cardiovascular 17s anaerobic sprint engine with zero knee/floor pounding.' }
    ]
  },
  'push-up-plus': {
    id: 'push-up-plus',
    name: 'Push-Up with Scapular Plus',
    category: 'Push',
    setup: 'High plank position with hands under shoulders, toes planted, ribs tucked, neutral cervical spine.',
    execution: 'Lower chest until 2 inches above the ground. Press back up and at the top, push chest away from floor to protract shoulder blades fully ("the Plus").',
    cue: 'Push the floor through the basement at the lockout to spread shoulder blades.',
    avoid: 'Sagging lower back, flaring elbows to 90 degrees, or skipping the scapular protraction.',
    progressTo: 'Weighted Push-Up Plus or Feet-Elevated Push-Up Plus',
    whenToProgress: 'When 3x15 strict reps are performed with robotic control.',
    regressTo: 'Incline Push-Up Plus or Hands-Elevated Push-Up',
    whenToRegress: 'If core hyperextends or scapular winging occurs.',
    sportsScienceRationale: 'Maximally recruits the serratus anterior, crucial for upward scapular rotation and subacromial impingement prevention.',
    equipmentAlternatives: [
      { name: 'Dumbbell Floor Press with Scapular Punch', equipment: 'Dumbbells & Mat', rationale: 'Supine variation allowing targeted serratus activation without bodyweight load.' },
      { name: 'Band-Resisted Push-Up Plus', equipment: 'Resistance Band', rationale: 'Adds accommodating peak tension at lockout.' }
    ]
  },
  'chest-supported-row': {
    id: 'chest-supported-row',
    name: 'Chest-Supported Dumbbell Row',
    category: 'Pull',
    setup: 'Set adjustable incline bench to 30–45 degrees. Lie face down with sternum supported, holding dumbbells with neutral grip.',
    execution: 'Row dumbbells toward lower ribs, driving elbows up and back while retracting scapulae. Hold peak contraction for 1 second before lowering slowly.',
    cue: 'Drive with elbows and pinch your shoulder blades together like squeezing a lemon between them.',
    avoid: 'Hyperextending neck or lifting chest off the bench pad to yank weights.',
    progressTo: 'Incline Bench DB Row with 3-second isometric pause',
    whenToProgress: 'When 3x12 reps are completed with clean squeeze and zero momentum.',
    regressTo: 'Chest-Supported Machine Row or Cable Seated Row',
    whenToRegress: 'If grip fails prematurely or lower back aches.',
    sportsScienceRationale: 'Completely eliminates lumbar shear and spinal fatigue, isolating the rhomboids, middle trapezius, and posterior deltoids.',
    equipmentAlternatives: [
      { name: 'Seated Cable Row with Wide Handle', equipment: 'Cable Column', rationale: 'Continuous horizontal pull tension without bench setup.' },
      { name: 'Seal Row / Barbell Row on High Bench', equipment: 'Barbell & Elevated Bench', rationale: 'Heavy bilateral horizontal pulling with zero lower back strain.' }
    ]
  },
  'single-leg-rdl': {
    id: 'single-leg-rdl',
    name: 'Single-Leg Dumbbell Romanian Deadlift',
    category: 'Hinge',
    setup: 'Stand tall holding a dumbbell in opposite hand of working leg (contralateral loading). Soft bend in standing knee.',
    execution: 'Hinge forward at hip while extending non-working leg straight back like a counterbalance. Lower until torso is nearly parallel to floor, then drive hip forward.',
    cue: 'Imagine a straight rod connecting your head to your back heel. Hinge at the hip crease.',
    avoid: 'Opening or rotating hips outward to the ceiling, or rounding lumbar spine.',
    progressTo: 'Barbell Single-Leg RDL or Contralateral + Ipsilateral DBs',
    whenToProgress: 'When 3x10 reps per side are done with zero loss of balance.',
    regressTo: 'Kickstand / B-Stance Romanian Deadlift (toe lightly on floor behind)',
    whenToRegress: 'If balance wobble prevents effective hamstring loading.',
    sportsScienceRationale: 'Develops gluteus medius pelvic stabilization and eccentric hamstring resilience, bulletproofing knees and SI joint.',
    equipmentAlternatives: [
      { name: 'Kickstand Dumbbell RDL (B-Stance)', equipment: 'Dumbbells & Floor', rationale: 'Provides 90% unilateral loading with stable ground kickstand.' },
      { name: 'Cable Single-Leg Pull-Through', equipment: 'Low Cable & Rope', rationale: 'Smooth horizontal pull vector reinforcing hip hinge pattern.' }
    ]
  },
  'kettlebell-swing': {
    id: 'kettlebell-swing',
    name: 'Hardstyle Kettlebell Russian Swing',
    category: 'Hinge',
    setup: 'Stand behind kettlebell with feet shoulder-width. Hinge back, grab bell handle, tilt it back toward you.',
    execution: 'Hike bell between legs like a football center, then explosively snap hips forward into a standing plank, floating bell to chest height. Let gravity guide bell back down.',
    cue: 'Snap hips like breaking a board with your belt buckle. Tense glutes and abs at the top.',
    avoid: 'Squatting the bell with knees, or pulling the bell up with arms/shoulders.',
    progressTo: 'Heavier Kettlebell (e.g. 28kg -> 32kg) or Single-Arm Swing',
    whenToProgress: 'When 20 unbroken explosive reps can be done with crisp hip snap.',
    regressTo: 'Kettlebell Deadlift from Floor or Cable Pull-Through',
    whenToRegress: 'If lower back arches or arms lead the motion.',
    sportsScienceRationale: 'Generates extreme rate of force development (RFD) in hip extensors with minimal axial compressive load on the lumbar spine.',
    equipmentAlternatives: [
      { name: 'Dumbbell Hip Hinge Swing', equipment: 'Single Heavy Dumbbell', rationale: 'Hold top head of dumbbell with both hands as an immediate substitute.' },
      { name: 'Broad Jumps with Reset', equipment: 'Gym Turf', rationale: 'Horizontal explosive hip extension using pure bodyweight.' }
    ]
  },
  'seated-cable-row': {
    id: 'seated-cable-row',
    name: 'Seated Cable Row (Neutral Grip)',
    category: 'Pull',
    setup: 'Sit upright on cable bench, feet secure on footplates with knees slightly bent. Grasp neutral-grip handle with arms extended.',
    execution: 'Pull handle toward belly button, driving elbows back and squeezing shoulder blades together. Pause for 1 second, then control weight back to start.',
    cue: 'Sit tall, lift chest toward the cable pulley, and pull through your elbows.',
    avoid: 'Rocking torso backward and forward excessively to use momentum.',
    progressTo: 'Single-Arm Cable Row with Rotation or Add 2-second hold',
    whenToProgress: 'When target reps are achieved with perfect upright spinal posture.',
    regressTo: 'Resistance Band Seated Row or Chest-Supported Machine Row',
    whenToRegress: 'If lower back fatigues before lats and rhomboids.',
    sportsScienceRationale: 'Recruits the latissimus dorsi, middle trapezius, and rhomboids while keeping spinal axial compression low.',
    equipmentAlternatives: [
      { name: 'Chest-Supported Dumbbell Row', equipment: 'Incline Bench & DBs', rationale: 'Full back development with chest pad supporting spine.' },
      { name: 'Inverted Bodyweight Row (TRX or Barbell)', equipment: 'Smith Machine / TRX', rationale: 'Horizontal bodyweight pull focusing on core and scapular engagement.' }
    ]
  },
  'pallof-press': {
    id: 'pallof-press',
    name: 'Standing Cable / Band Pallof Press',
    category: 'Core & Armor',
    setup: 'Stand athletic and perpendicular to cable pulley set at chest height. Grasp handle with both hands at sternum.',
    execution: 'Press arms straight out in front of chest. Hold the extended position for 2-3 seconds, fighting the rotational pull of the cable. Return smoothly to chest.',
    cue: 'Keep your belt buckle facing straight forward. Don\'t let the cable rotate you even an inch.',
    avoid: 'Shrugging shoulders, twisting hips, or locking knees stiffly.',
    progressTo: 'Half-Kneeling Pallof Press or Pallof Press with Overhead Raise',
    whenToProgress: 'When 3x12 reps with 3-second holds are effortless and stationary.',
    regressTo: 'Isometric Pallof Hold (hands extended for 30s) or Wider Athletic Stance',
    whenToRegress: 'If hips rotate or athlete compensates with lower back arching.',
    sportsScienceRationale: 'The premier anti-rotation core exercise. Trains obliques and transverse abdominis to resist twisting under shear stress.',
    equipmentAlternatives: [
      { name: 'Resistance Band Pallof Press', equipment: 'Loop Band tied to Rig', rationale: 'Portable anti-rotation training anywhere in the gym or at home.' },
      { name: 'Side Plank with Rotation Reach', equipment: 'Gym Floor', rationale: 'Bodyweight lateral core stabilization and anti-rotation.' }
    ]
  }
};
