import { PositionSpecialization, SportId } from '../types/sport';

export const POSITIONS_BY_SPORT: Record<SportId, PositionSpecialization[]> = {
  football: [
    {
      id: 'fb-linemen',
      sportId: 'football',
      name: 'Offensive & Defensive Linemen',
      shortCode: 'OL / DL',
      roleBadge: 'Trench Warfare & Impact Armor',
      tagline: 'Maximal absolute force, horizontal hand-punch drive, and cervical spine collision defense.',
      overview: 'Linemen operate across 1-3 yards of brutal trench collision on every snap. Play demands require 300+ lbs of functional mass with unmatched isometric core stiffness, horizontal hip drive, and thick neck circumference to dissipate head accelerations during contact.',
      demands: {
        energySystem: 'Alactic-Creatine Phosphate (3-5s bursts, 30s reset)',
        kineticChainFocus: 'Horizontal hip punch, closed-chain triple extension, cervical brace',
        injuryPreventionZone: 'Cervical spine, acromioclavicular joints, lumbar facet joints',
        biomotorPriority: 'Absolute Strength (1RM Squat/Deadlift) & Mass/Armor Accumulation'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Prioritize heavy Trap Bar Deadlifts and Anderson/Pin Squats from eye-level stance height. Emphasize horizontal barbell presses over incline.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-fb-neck',
            name: '4-Way 25lb Harness Cervical Neck Holds',
            prescription: '3 sets x 30s isometric holds each angle (Flexion, Extension, Lateral)',
            category: 'Core & Armor',
            coachingCue: 'Pack chin down and maintain neutral spine against band or plate resistance. Breathe through belly.',
            scientificRationale: 'Every 1 lb increase in neck composite strength decreases concussion hazard odds by 5% (Collins et al., 2014).'
          },
          {
            id: 'pos-fb-sled-punch',
            name: 'Heavy Sled Strike & Lockout Drive',
            prescription: '4 sets x 10m maximum-effort punch-and-drive',
            category: 'Power & Plyometrics',
            coachingCue: 'Strike handles violently with heels of the hands while driving knees high with positive shin angle.',
            scientificRationale: 'Replicates trench line-of-scrimmage hand engagement mechanics with zero axial spinal compressive penalty.'
          },
          {
            id: 'pos-fb-farmer-walk',
            name: 'Heavy Hex-Bar Farmers Walk (1.25x Bodyweight)',
            prescription: '3 sets x 30 meters (Rest 90s)',
            category: 'Pull',
            coachingCue: 'Stand tall, lock ribcage down, keep shoulder blades packed down and back. Take quick, choppy strides.',
            scientificRationale: 'Builds bone-crushing grip strength and isometric upper trapezius shield against helmet contact.'
          }
        ],
        finisherDrill: {
          name: 'Trench Play-Clock Sled Battery',
          workRest: '5s MAX drive / 25s complete rest x 8 rounds (mimics 8-play red zone drive)',
          protocol: 'Load sled to 1.5x bodyweight. On whistle, strike handles violently and drive legs through turf for 5 full seconds. Walk back, breathe deeply through nose for 25s, repeat.',
          energySystemGoal: 'Alactic power preservation without excessive lactic drop-off.'
        }
      },
      benchmarks: [
        { metric: 'Trap Bar Deadlift', proStandard: '585+ lb (2.0x+ BW)', collegeOrSemiPro: '495+ lb', unit: 'lb', notes: 'Neutral-grip high handles' },
        { metric: 'Bench Press (225 lb reps)', proStandard: '28 - 36 reps', collegeOrSemiPro: '20 - 25 reps', unit: 'reps', notes: 'NFL Combine standard' },
        { metric: '10-Yard Split (Acceleration)', proStandard: '1.68 - 1.75 s', collegeOrSemiPro: '1.78 - 1.88 s', unit: 'sec', notes: 'First-step explosive leverage' },
        { metric: 'Broad Jump', proStandard: '9 ft 0 in (108 in)', collegeOrSemiPro: '8 ft 4 in (100 in)', unit: 'in', notes: 'Horizontal ground reaction force' }
      ]
    },
    {
      id: 'fb-skill',
      sportId: 'football',
      name: 'Skill Positions',
      shortCode: 'WR / CB / RB / Safeties',
      roleBadge: 'Alactic Velocity & Deceleration',
      tagline: 'Top-end linear sprint speed (21+ mph), violent route cuts, and eccentric hamstring armor.',
      overview: 'Skill players cover vast yardage at supersonic speeds. The differentiator between an elite defensive back or receiver is not merely their 40-time, but their rate of deceleration into a 90-degree plant without popping a hamstring tendon.',
      demands: {
        energySystem: 'Alactic-Aerobic (4-6s top-velocity sprint, 35s jog back)',
        kineticChainFocus: 'Ankle stiffness, eccentric hamstring tolerance, multi-directional hip internal rotation',
        injuryPreventionZone: 'Biceps femoris long head (hamstring), ACL, groin/adductor longus',
        biomotorPriority: 'Maximum Velocity (Vmax), 0-10yd Burst & Reactive Agility'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Prioritize single-leg unilateral work (Rear-Foot Elevated Split Squats) and eccentric knee flexion (Nordic Curls) over heavy double-leg grinding squats.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-fb-nordic',
            name: 'Nordic Hamstring Curl with Slow 4-Second Negative',
            prescription: '4 sets x 5-6 slow reps',
            category: 'Hinge',
            coachingCue: 'Keep hips completely locked in full extension. Fight gravity down with hamstrings as far as possible.',
            scientificRationale: 'Increases biceps femoris fascicle length by 15-20%, reducing sprint-induced hamstring tears by up to 51% (Petersen et al., 2011).'
          },
          {
            id: 'pos-fb-pogo',
            name: 'Continuous Single-Leg Hurdle Pogo Hops',
            prescription: '3 sets x 8 hops each leg over 6-inch mini hurdles',
            category: 'Power & Plyometrics',
            coachingCue: 'Stiff ankle, toes pulled up (dorsiflexion). Spend minimum time on the floor (<150ms ground contact).',
            scientificRationale: 'Conditions Achilles tendon spring stiffness and reactive strength index (RSI).'
          },
          {
            id: 'pos-fb-tibialis',
            name: 'Loaded Tibialis Anterior Wall Raises & Calf Drop',
            prescription: '3 sets x 20 reps',
            category: 'Squat & Lunge',
            coachingCue: 'Lean hips against wall, dorsiflex toes high toward shins, pause 1s at top.',
            scientificRationale: 'Absorbs landing ground reaction forces up to 5-8x bodyweight during plant-and-cut maneuvers.'
          }
        ],
        finisherDrill: {
          name: '10-Yard Flying Sprint Sprints with Decel Bounding',
          workRest: '10m fly sprint, 5m decel zone, 45s walking rest x 6 reps',
          protocol: 'Accelerate smoothly over 15m, hit max velocity through 10m timing gate, then decelerate into a balanced athletic base within 5m.',
          energySystemGoal: 'Neuromuscular firing rate without metabolic fatigue.'
        }
      },
      benchmarks: [
        { metric: '40-Yard Dash', proStandard: '4.38 - 4.48 s', collegeOrSemiPro: '4.52 - 4.65 s', unit: 'sec', notes: 'Electronic laser timed' },
        { metric: '10-Yard Fly Burst', proStandard: '1.48 - 1.54 s', collegeOrSemiPro: '1.55 - 1.62 s', unit: 'sec', notes: 'Immediate first-step separation' },
        { metric: 'Vertical Jump', proStandard: '38.0 - 42.0 in', collegeOrSemiPro: '33.0 - 37.0 in', unit: 'in', notes: 'High-point catch power' },
        { metric: 'Pro Agility (5-10-5)', proStandard: '4.00 - 4.15 s', collegeOrSemiPro: '4.20 - 4.35 s', unit: 'sec', notes: 'Lateral change-of-direction' }
      ]
    },
    {
      id: 'fb-lb-te',
      sportId: 'football',
      name: 'Linebackers & Tight Ends',
      shortCode: 'LB / TE',
      roleBadge: 'Hybrid Impact & Multi-Directional Force',
      tagline: '230-260 lb collision engines: sideline-to-sideline pursuit and open-field tackle leverage.',
      overview: 'Linebackers and Tight Ends represent the ultimate hybrid athlete: heavy enough to anchor against 320 lb linemen, yet fast and agile enough to cover slot receivers and tight ends across 40 yards of open grass.',
      demands: {
        energySystem: 'Alactic-Anaerobic Glycolytic blend with high aerobic refill',
        kineticChainFocus: 'Rotational hip uncoiling, tackling deceleration, lat/thoracic armor',
        injuryPreventionZone: 'Pectoral tendon, shoulder labrum, knee collateral ligaments',
        biomotorPriority: 'Power-to-Mass Ratio, Multi-Angle Deceleration & Collision Leverage'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Combine heavy Trap Bar Jumps (20-30% 1RM) with heavy Front Squats and Barbell Push Presses to match open-field collision physics.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-fb-landmine-rot',
            name: 'Landmine Rotational Punch & Catch',
            prescription: '4 sets x 6 reps each side',
            category: 'Power & Plyometrics',
            coachingCue: 'Pivot through back foot and whip the barbell with hips and core, punch through ceiling.',
            scientificRationale: 'Develops rotational torque transmission from ground through hip into upper body contact.'
          },
          {
            id: 'pos-fb-chest-support-row',
            name: 'Heavy Chest-Supported T-Bar / DB Row with 2s Squeeze',
            prescription: '4 sets x 8-10 reps',
            category: 'Pull',
            coachingCue: 'Crush the handles, drive elbows past ribs, retract rhomboids completely. Prevent lower back rocking.',
            scientificRationale: 'Protects the anterior shoulder during heavy wrap-up tackling by balancing bench-heavy volume.'
          }
        ],
        finisherDrill: {
          name: 'Lateral Shuffle into 15-Yard Pursuit Sprint',
          workRest: '5s active drill / 30s rest x 6 reps',
          protocol: 'Start in linebacker stance. Shuffle 5 yards lateral, plant hard on outside foot, crossover and sprint 15 yards forward at 100%.',
          energySystemGoal: 'Reactionary change-of-direction under near-maximal anaerobic effort.'
        }
      },
      benchmarks: [
        { metric: '40-Yard Dash', proStandard: '4.55 - 4.68 s', collegeOrSemiPro: '4.70 - 4.85 s', unit: 'sec', notes: 'Hybrid speed' },
        { metric: 'Trap Bar Deadlift', proStandard: '525+ lb (2.2x BW)', collegeOrSemiPro: '445+ lb', unit: 'lb', notes: 'Neutral-grip power' },
        { metric: 'Vertical Jump', proStandard: '35.0 - 38.0 in', collegeOrSemiPro: '31.0 - 34.0 in', unit: 'in', notes: 'Closing burst height' },
        { metric: 'Broad Jump', proStandard: '10 ft 0 in (120 in)', collegeOrSemiPro: '9 ft 4 in (112 in)', unit: 'in', notes: 'Explosive hip extension' }
      ]
    },
    {
      id: 'fb-qb',
      sportId: 'football',
      name: 'Quarterbacks',
      shortCode: 'QB',
      roleBadge: 'Rotational Velocity & Scapular Deceleration',
      tagline: 'Throwing-arm longevity, thoracic mobility, rotational kinetic sequencing, and dropback agility.',
      overview: 'The quarterback demands extraordinary rotational elasticity and scapular upward rotation. Grinding bench press volume is replaced with rotational medicine ball work, posterior shoulder cuff eccentric strengthening, and hip internal rotation mobility.',
      demands: {
        energySystem: 'Alactic Power with high cognitive-motor precision',
        kineticChainFocus: 'Lead-hip plant deceleration, thoracic spine rotation, cuff eccentric deceleration',
        injuryPreventionZone: 'Rotator cuff, labrum, lead knee ACL during pocket collapse',
        biomotorPriority: 'Rotational Kinetic Sequencing, Arm Speed & Rapid Footwork'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Substitute flat barbell bench with Swiss Bar or Dumbbell Floor Press and Landmine Presses to protect the glenohumeral joint. Emphasize Trap Bar Deadlift and Split Squats.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-fb-medball-rot',
            name: 'Half-Kneeling Rotational Medicine Ball Shotput (6-8 lb)',
            prescription: '4 sets x 5 throws each side (Focus on peak ball velocity)',
            category: 'Power & Plyometrics',
            coachingCue: 'Keep front knee glued forward. Uncoil from rear hip and explode through core without rounding spine.',
            scientificRationale: 'Teaches kinetic sequencing: pelvis initiates rotation before torso and arm, maximizing ball release velocity.'
          },
          {
            id: 'pos-fb-prone-ytw',
            name: 'Prone Incline Y-T-W Scapular Series with 3s Iso Holds',
            prescription: '3 sets x 8 reps each position with 5 lb plates',
            category: 'Pull',
            coachingCue: 'Lead with thumbs up, squeeze lower traps, do not shrug shoulders into ears.',
            scientificRationale: 'Ensures posterior rotator cuff and serratus anterior decelerate the arm after high-velocity release.'
          }
        ],
        finisherDrill: {
          name: 'Dropback Agility Ladder into 10-Yard Escape Scramble',
          workRest: '6 reps, 40s rest between reps',
          protocol: 'Take 3-step or 5-step dropback, reset feet in 0.4s, weave through lateral bag obstacle and sprint 10 yards out of pocket.',
          energySystemGoal: 'Pocket maneuverability without lower limb fatigue.'
        }
      },
      benchmarks: [
        { metric: 'Rotational Med Ball Throw (8 lb)', proStandard: '45+ mph (or 48+ ft)', collegeOrSemiPro: '38+ mph', unit: 'mph', notes: 'Radar gun or distance' },
        { metric: 'Pro Agility (5-10-5)', proStandard: '4.15 - 4.30 s', collegeOrSemiPro: '4.35 - 4.50 s', unit: 'sec', notes: 'Footwork reset speed' },
        { metric: 'Trap Bar Deadlift', proStandard: '405+ lb (1.8x BW)', collegeOrSemiPro: '345+ lb', unit: 'lb', notes: 'Ground force baseline' },
        { metric: 'Vertical Jump', proStandard: '32.0 - 36.0 in', collegeOrSemiPro: '28.0 - 31.0 in', unit: 'in', notes: 'Lower body power' }
      ]
    }
  ],
  rugby: [
    {
      id: 'rugby-front-row',
      sportId: 'rugby',
      name: 'Front Row (Props & Hooker)',
      shortCode: 'Props & Hooker',
      roleBadge: 'Scrummaging Anchor & Cervical Density',
      tagline: 'Absorb tons of opposing scrum pack compression, win breakdown rucks, and anchor the tight phase.',
      overview: 'Front-row forwards endure the most demanding neck, shoulder, and spinal axial loads in team sport during contested scrums (forces exceeding 16,000 Newtons). They require massive neck girth, anti-flexion core endurance, and deep knee flexion pushing power.',
      demands: {
        energySystem: 'Anaerobic Glycolytic & Alactic resets (Repeated high-intensity efforts)',
        kineticChainFocus: 'Closed-chain scrum engagement, cervical isometric stabilization, quad knee-extension drive',
        injuryPreventionZone: 'Cervical vertebrae (C4-C7), sternoclavicular joints, lower lumbar spine',
        biomotorPriority: 'Maximal Isometric Force, Cervical Thickness & Heavy Ground Anchor'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Front Squats and Zercher Squats over Back Squats to replicate the upright torso scrum posture. Heavy Barbell Shrugs and Neck isometric holds.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-rugby-neck-iso',
            name: '4-Way Prone & Supine Cervical Isometric Bridge Holds',
            prescription: '4 sets x 25-30s holds (Neck harness or manual coach pressure)',
            category: 'Core & Armor',
            coachingCue: 'Tuck chin slightly, lock deep cervical flexors, maintain rigid cervical alignment without twisting.',
            scientificRationale: 'Directly fortifies the cervical musculature to resist catastrophic scrum collapse compression.'
          },
          {
            id: 'pos-rugby-zercher-hold',
            name: 'Zercher Squat Holds in Full Scrum Depth (1.2x BW)',
            prescription: '3 sets x 20-30s isometric pause at 80-degree knee bend',
            category: 'Squat & Lunge',
            coachingCue: 'Cradle bar in crook of elbows, pull fists to chest, hold flat back posture without collapsing.',
            scientificRationale: 'Conditioning the anterior core and thoracic extensors for sustained 15-second scrum engagements.'
          }
        ],
        finisherDrill: {
          name: 'Heavy Prowler Scrum Push into Ruck Roll',
          workRest: '10s maximum drive / 20s rest x 6 rounds',
          protocol: 'Lock low onto low Prowler horns. Drive forward for 10m with flat back, drop and roll over bag (simulate ruck clearout), reset.',
          energySystemGoal: 'Lactic tolerance under heavy upper body isometric tension.'
        }
      },
      benchmarks: [
        { metric: 'Front Squat (1RM)', proStandard: '385+ lb (1.5x+ BW)', collegeOrSemiPro: '315+ lb', unit: 'lb', notes: 'Full depth with upright torso' },
        { metric: 'Bench Press (1RM)', proStandard: '350+ lb (1.4x+ BW)', collegeOrSemiPro: '285+ lb', unit: 'lb', notes: 'Upper body contact armor' },
        { metric: 'Neck Circumference', proStandard: '18.5 - 20.0+ in', collegeOrSemiPro: '17.0 - 18.0 in', unit: 'in', notes: 'Protective muscle mass' },
        { metric: 'Bronco Yo-Yo Test', proStandard: '4:40 - 4:55 min', collegeOrSemiPro: '5:05 - 5:25 min', unit: 'min:sec', notes: 'Front row aerobic endurance' }
      ]
    },
    {
      id: 'rugby-second-back-row',
      sportId: 'rugby',
      name: 'Locks & Back Row',
      shortCode: 'Locks / Flankers / No. 8',
      roleBadge: 'Lineout Aerialist & Breakdown Engine',
      tagline: 'High-work-rate tackling machines: lineout vertical jumps, relentless ruck arrivals, and gainline carries.',
      overview: 'Second rows (Locks) and Back rows (Flankers, No. 8) log the highest collision counts in world rugby: 25+ tackles and 35+ rucks hit per match. They require massive triple-extension vertical leap for lineouts combined with a relentless workhorse engine.',
      demands: {
        energySystem: 'Alactic-Aerobic repeat sprint ability (RSA) with high lactate buffer capacity',
        kineticChainFocus: 'Triple-extension jump, single-leg collision stability, lat/core tackle wrap',
        injuryPreventionZone: 'Acromioclavicular (AC) joint, lumbar spine, knee ligaments',
        biomotorPriority: 'Work Capacity, High-Rate Collision Power & Lineout Jump Height'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Hang Power Cleans and Dumbbell Snatch for vertical lineout explosion, supplemented by Heavy Trap Bar Deadlifts.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-rugby-hang-clean',
            name: 'Hang Power Clean from Above Knees',
            prescription: '4 sets x 3 reps @ 75-82% 1RM (Fast bar velocity)',
            category: 'Power & Plyometrics',
            coachingCue: 'Violent hip extension, shrug and whip elbows high and fast underneath the bar.',
            scientificRationale: 'Maximizes rate of force development (RFD) directly matching the jumping second row in lineout contests.'
          },
          {
            id: 'pos-rugby-tackle-sled',
            name: 'Low Tackle Bag Drive & Wrestle Reset',
            prescription: '4 sets x 5 reps (Explode through bag, roll to feet in 1s)',
            category: 'Core & Armor',
            coachingCue: 'Drop hips below bag center of gravity, punch shoulder into sweet spot, leg drive for 3 steps.',
            scientificRationale: 'Develops game-specific contact dominance and rapid return-to-feet speed.'
          }
        ],
        finisherDrill: {
          name: 'The 1.2km Bronco Shuttle Run Benchmark',
          workRest: 'Continuous 1200m shuttle (20m, 40m, 60m out and back x 5 sets)',
          protocol: 'Perform full out-and-back shuttles touching lines with hand. Target under 4:35 for Back Row, under 4:45 for Locks.',
          energySystemGoal: 'Gold-standard international rugby anaerobic-aerobic threshold evaluation.'
        }
      },
      benchmarks: [
        { metric: 'Bronco Test (1.2km Shuttle)', proStandard: '< 4:35 min (Back Row) / < 4:45 (Lock)', collegeOrSemiPro: '< 4:55 min', unit: 'min:sec', notes: 'International rugby standard' },
        { metric: 'Countermovement Jump (CMJ)', proStandard: '52 - 58 cm (20.5 - 23.0 in)', collegeOrSemiPro: '44 - 50 cm', unit: 'cm', notes: 'Lineout jump height' },
        { metric: 'Trap Bar Deadlift', proStandard: '485+ lb (2.1x BW)', collegeOrSemiPro: '405+ lb', unit: 'lb', notes: 'Heavy gainline carry foundation' },
        { metric: 'Bench Press', proStandard: '315+ lb (1.3x BW)', collegeOrSemiPro: '265+ lb', unit: 'lb', notes: 'Ruck clearout pushing power' }
      ]
    },
    {
      id: 'rugby-backs',
      sportId: 'rugby',
      name: 'Half-Backs & Outside Backs',
      shortCode: 'Centres / Wings / Half-Backs',
      roleBadge: 'Breakaway Velocity & Evasive Agility',
      tagline: 'Top-speed sprint mechanics, evasive side-step cutting, long-distance kicking hip power.',
      overview: 'Backs operate in open space where top-end sprint speeds exceed 9.5-10 m/s (22+ mph). They must execute brutal defensive 1-on-1 tackles at full pace and possess supreme single-leg agility and kicking adductor resilience.',
      demands: {
        energySystem: 'Alactic Speed with repeated high-speed running (HSR > 700m per match)',
        kineticChainFocus: 'Horizontal propulsion, rapid lateral deceleration, kicking hip flexor elasticity',
        injuryPreventionZone: 'Hamstring sprint strains, groin/adductor strains, ankle syndesmosis',
        biomotorPriority: 'Maximum Velocity (Vmax), Change of Direction Speed (CODS) & Elastic Power'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Nordic Hamstring Curls, Single-Leg Romanian Deadlifts, and loaded Plyometric Box Jumps.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-rugby-copenhagen',
            name: 'Copenhagen Adductor Plank Holds',
            prescription: '3 sets x 25-30s each leg (top leg on bench, bottom leg active)',
            category: 'Core & Armor',
            coachingCue: 'Hips straight, spine neutral, hold pelvis level without sagging toward the floor.',
            scientificRationale: 'Increases eccentric adductor strength, preventing groin strains caused by high-volume kicking and cutting.'
          },
          {
            id: 'pos-rugby-nordic-back',
            name: 'Assisted Nordic Hamstring Curls',
            prescription: '4 sets x 6 reps with 3s eccentric lowering',
            category: 'Hinge',
            coachingCue: 'Control the descent all the way to the floor without hip hinge breaking.',
            scientificRationale: 'Protects the hamstring muscle-tendon junction during sprint decelerations.'
          }
        ],
        finisherDrill: {
          name: 'Curved Sprint to High-Ball Catch Deceleration',
          workRest: '6 reps with 45s rest',
          protocol: 'Sprint 30m along curved arc at 95% speed, jump for medicine ball toss at apex, stick 2-foot balanced landing and immediately backpedal 5m.',
          energySystemGoal: 'Open-field collision landing and aerial deceleration control.'
        }
      },
      benchmarks: [
        { metric: '10m Sprint Acceleration', proStandard: '1.60 - 1.68 s', collegeOrSemiPro: '1.70 - 1.78 s', unit: 'sec', notes: 'First-step evasion' },
        { metric: '40m Sprint Max Velocity', proStandard: '4.85 - 5.05 s', collegeOrSemiPro: '5.10 - 5.25 s', unit: 'sec', notes: 'Breakaway speed' },
        { metric: 'Bronco Test (1.2km Shuttle)', proStandard: '< 4:25 min (Half/Backs)', collegeOrSemiPro: '< 4:40 min', unit: 'min:sec', notes: 'Top-tier back endurance' },
        { metric: 'Trap Bar Deadlift', proStandard: '425+ lb (2.2x BW)', collegeOrSemiPro: '355+ lb', unit: 'lb', notes: 'High power-to-weight ratio' }
      ]
    }
  ],
  soccer: [
    {
      id: 'soccer-center-backs',
      sportId: 'soccer',
      name: 'Central Defenders (CB)',
      shortCode: 'CB',
      roleBadge: 'Aerial Dominance & Physical Shield',
      tagline: 'Vertical leap for defensive headers, physical shielding strength, and backwards-running deceleration.',
      overview: 'Central defenders contest 15+ aerial duels per match and make critical emergency slide and recovery tackles. They require superior vertical jump power, landing stability, upper-body shielding armor, and bulletproof adductor strength against groin strains.',
      demands: {
        energySystem: 'Aerobic base with intermittent high-intensity alactic bursts (jumps, blocks)',
        kineticChainFocus: 'Vertical countermovement jump, unilateral landing decel, upper body post-up shield',
        injuryPreventionZone: 'Adductor longus (groin), ACL during landing, thoracic posture',
        biomotorPriority: 'Vertical Jump Power, Physical Strength & Landing Mechanics'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Box Squats with explosive ascent, Trap Bar Deadlifts, and Single-Leg Landing Stick Drills.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-soccer-copen',
            name: 'Copenhagen Adductor Level 2 Holds',
            prescription: '3 sets x 30s each leg (bench at ankle)',
            category: 'Core & Armor',
            coachingCue: 'Keep shoulders, hips, and knees in a laser-straight line. Do not allow bottom hip to droop.',
            scientificRationale: 'Proven in UEFA elite studies to reduce groin injury incidence by over 41% (Haroy et al., 2019).'
          },
          {
            id: 'pos-soccer-depth-jump',
            name: 'Depth Jump to Strict Stick Landing (18" Box)',
            prescription: '3 sets x 5 jumps with 3s stick hold on landing',
            category: 'Power & Plyometrics',
            coachingCue: 'Step off box, land softly with knees tracking over toes, chest up, absorb quietly like a cat.',
            scientificRationale: 'Teaches neuromuscular pre-activation and prevents knee valgus collapse on contested header landings.'
          }
        ],
        finisherDrill: {
          name: 'Backpedal to Header Jump & 10m Recovery Sprint',
          workRest: '6 reps, 30s rest',
          protocol: 'Backpedal 5m rapidly, leap vertically for simulated defensive header, land balanced, pivot 180° and sprint 10m forward.',
          energySystemGoal: 'Defensive aerial recovery biomechanics under fatigue.'
        }
      },
      benchmarks: [
        { metric: 'Countermovement Jump (CMJ)', proStandard: '50 - 56 cm (20 - 22 in)', collegeOrSemiPro: '42 - 48 cm', unit: 'cm', notes: 'Aerial duel reach' },
        { metric: 'Trap Bar Deadlift', proStandard: '385+ lb (1.9x BW)', collegeOrSemiPro: '315+ lb', unit: 'lb', notes: 'Shielding physical strength' },
        { metric: 'Yo-Yo Intermittent Recovery Level 1', proStandard: '2,080 - 2,240 m', collegeOrSemiPro: '1,840 - 2,000 m', unit: 'm', notes: 'Aerobic match fitness' },
        { metric: '10m Sprint Acceleration', proStandard: '1.68 - 1.74 s', collegeOrSemiPro: '1.76 - 1.82 s', unit: 'sec', notes: 'Recovery pace' }
      ]
    },
    {
      id: 'soccer-fullbacks-wingers',
      sportId: 'soccer',
      name: 'Fullbacks & Wingers',
      shortCode: 'LB / RB / LW / RW',
      roleBadge: 'High-Volume Repeat Sprint Engine',
      tagline: '11-13 km match distance with peak High-Speed Running (HSR > 1,100m) and elite sprint repeatability.',
      overview: 'Modern wing-backs and wingers produce the highest sprinting volumes in world football: 35+ sprints over 25 km/h per match. Their primary physiological risk is eccentric hamstring strain during late-game high-velocity fatigue.',
      demands: {
        energySystem: 'High-capacity Aerobic Engine (VO2max > 60 ml/kg/min) + Repeated Sprint Ability',
        kineticChainFocus: 'High-velocity sprint mechanics, eccentric hamstring brake, hip flexor turnover',
        injuryPreventionZone: 'Biceps femoris (hamstring tears during peak sprint), plantar fascia',
        biomotorPriority: 'Maximum Sprint Velocity (Vmax), Aerobic MAS (>17 km/h) & Hamstring Armor'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Nordic Curls, Single-Leg RDLs, and Sprint Interval Training at 120% Maximal Aerobic Speed (MAS).',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-soccer-nordic-hs',
            name: 'Progressive Nordic Hamstring Lowering with Band Assistance',
            prescription: '4 sets x 6 reps (4-second eccentric descent)',
            category: 'Hinge',
            coachingCue: 'Squeeze glutes, keep pelvis locked in neutral, brake against ground all the way down.',
            scientificRationale: 'Shifts the hamstring torque-angle relationship toward longer muscle lengths where sprint tears occur.'
          },
          {
            id: 'pos-soccer-sl-rdl',
            name: 'Single-Leg Romanian Deadlift with Kettlebell',
            prescription: '3 sets x 8 reps each leg with 2s eccentric pause',
            category: 'Hinge',
            coachingCue: 'Reach back leg to opposite wall, keep hips square, hinge from front hip.',
            scientificRationale: 'Balances pelvic stability and strengthens semitendinosus and gluteus medius during unilateral running stance.'
          }
        ],
        finisherDrill: {
          name: '120% MAS Tabata Shuttle Repeats (Eurofit Protocol)',
          workRest: '15s work at 5.5 m/s (19.8 km/h) / 15s passive rest x 8 rounds',
          protocol: 'Mark cones at 82.5m distance. Sprint smoothly over 15s, rest completely for 15s. Repeat for 2 blocks.',
          energySystemGoal: 'Supra-maximal aerobic power (VO2max booster) with zero lactic pooling.'
        }
      },
      benchmarks: [
        { metric: 'Yo-Yo Intermittent Recovery Level 2', proStandard: '1,040 - 1,200+ m', collegeOrSemiPro: '840 - 980 m', unit: 'm', notes: 'Elite match stamina' },
        { metric: '30m Sprint Time', proStandard: '3.88 - 4.02 s', collegeOrSemiPro: '4.08 - 4.22 s', unit: 'sec', notes: 'Overlap sprint speed' },
        { metric: 'Max Velocity (GPS tracking)', proStandard: '32.5 - 35.0 km/h', collegeOrSemiPro: '30.0 - 32.0 km/h', unit: 'km/h', notes: 'Top-end speed' },
        { metric: 'Nordic Eccentric Force', proStandard: '> 400 Newtons / leg', collegeOrSemiPro: '> 320 N', unit: 'N', notes: 'NordBord hamstring standard' }
      ]
    },
    {
      id: 'soccer-midfielders',
      sportId: 'soccer',
      name: 'Central Midfielders (CM / CDM / CAM)',
      shortCode: 'CDM / CM / CAM',
      roleBadge: 'Box-to-Box Durability & 360° Agility',
      tagline: '12-14 km per match: continuous multi-directional agility, rotational balance, and non-stop work rate.',
      overview: 'Midfielders are the engine room of the squad: they log the highest total distance, perform hundreds of accelerations, decelerations, and changes of direction in 360 degrees, and must maintain crisp tactical execution under high cardiovascular fatigue.',
      demands: {
        energySystem: 'Relentless Aerobic Engine with rapid lactic clearance and phosphagen restoration',
        kineticChainFocus: 'Multi-directional deceleration, rotational core stiffness, knee-ankle joint resilience',
        injuryPreventionZone: 'Patellar tendon, groin adductors, lumbar-pelvic complex',
        biomotorPriority: 'Aerobic Power, Multi-Directional Change of Direction & Durability'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Front Squats, Rear-Foot Elevated Split Squats, Landmine Rotations, and rotational core work.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-soccer-curtsy',
            name: 'Curtsy / Transverse Lunge with Dumbbells',
            prescription: '3 sets x 10 reps each leg',
            category: 'Squat & Lunge',
            coachingCue: 'Step backward diagonally, keep front foot planted flat, absorb load into outside glute.',
            scientificRationale: 'Conditions the hip abductors and rotators for sudden 180-degree pivots under game conditions.'
          },
          {
            id: 'pos-soccer-pallof',
            name: 'Kneeling Cable Pallof Press with Lateral Step',
            prescription: '3 sets x 12 reps each side with 2s hold',
            category: 'Core & Armor',
            coachingCue: 'Brace core, push cable straight out from sternum, resist rotational pull without torso twisting.',
            scientificRationale: 'Builds anti-rotational stability required to resist tackles while distributing the ball.'
          }
        ],
        finisherDrill: {
          name: 'Box-to-Box 3-Cone Reaction Shuttles',
          workRest: '20s agility / 40s active jog x 6 rounds',
          protocol: 'Shuttle between 3 cones set in a triangle (5m apart) reacting to audio cues, followed by 50m tempo stride.',
          energySystemGoal: 'Agility under cognitive load and cardiovascular stress.'
        }
      },
      benchmarks: [
        { metric: 'Yo-Yo Intermittent Recovery Level 1', proStandard: '2,400 - 2,800+ m', collegeOrSemiPro: '2,000 - 2,300 m', unit: 'm', notes: 'Engine-room distance' },
        { metric: 'Maximal Aerobic Speed (MAS)', proStandard: '17.5 - 18.5 km/h', collegeOrSemiPro: '16.0 - 17.0 km/h', unit: 'km/h', notes: 'Continuous running speed' },
        { metric: '5-0-5 Agility Test', proStandard: '2.15 - 2.25 s', collegeOrSemiPro: '2.30 - 2.42 s', unit: 'sec', notes: '180-degree turning time' },
        { metric: 'Trap Bar Deadlift', proStandard: '350+ lb (1.8x BW)', collegeOrSemiPro: '295+ lb', unit: 'lb', notes: 'Structural joint stability' }
      ]
    },
    {
      id: 'soccer-goalkeepers',
      sportId: 'soccer',
      name: 'Goalkeepers (GK)',
      shortCode: 'GK',
      roleBadge: 'Lateral Plyometric Explosion & Diving Armor',
      tagline: 'Reactive lateral dive power, high-altitude ball catching, and shoulder impact landing tolerance.',
      overview: 'Goalkeepers require specialized biomechanics: unilateral horizontal and lateral jump explosion, rapid hip abduction, overhead shoulder mobility and landing armor to absorb repeated turf impacts from diving saves.',
      demands: {
        energySystem: 'Pure Alactic-Creatine Phosphate (1-2s maximum-power diving bursts)',
        kineticChainFocus: 'Lateral triple extension, shoulder-glenohumeral joint armor, unilateral push-off',
        injuryPreventionZone: 'Rotator cuff, acromioclavicular (AC) joint, hip labrum / adductor',
        biomotorPriority: 'Reactive Agility, Unilateral Lateral Power & Glenohumeral Stability'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Lateral Bounds with stick landing, Turkish Get-Ups for shoulder armor, and Trap Bar Jump Shrugs.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-soccer-lateral-bound',
            name: 'Heiden Lateral Skater Bounding with 2s Stick',
            prescription: '4 sets x 5 bounds each leg (Max lateral distance)',
            category: 'Power & Plyometrics',
            coachingCue: 'Explode sideways off single foot, land softly on opposite foot with knee bent, stick dead stop.',
            scientificRationale: 'Matches the exact ground push-off mechanics of diving across the goal line to tip shots.'
          },
          {
            id: 'pos-soccer-tgu',
            name: 'Kettlebell Turkish Get-Up (Controlled)',
            prescription: '3 sets x 3 reps each arm (24-32 kg)',
            category: 'Core & Armor',
            coachingCue: 'Keep eyes on bell, lock wrist straight, drive through heels and elbow with steady cadence.',
            scientificRationale: 'Gold standard for dynamic 360-degree shoulder stability and landing armor.'
          }
        ],
        finisherDrill: {
          name: 'Lateral Hurdle Reactive Dive into Stand-Up Reset',
          workRest: '5 reps each side, 45s rest between reps',
          protocol: 'Bound laterally over 12" hurdle, immediately drop into controlled diving roll on mat, pop up to athletic stance in <1.2s.',
          energySystemGoal: 'Neuromuscular speed and ground recovery efficiency.'
        }
      },
      benchmarks: [
        { metric: 'Lateral Skater Bound Distance', proStandard: '2.50 - 2.80+ m', collegeOrSemiPro: '2.20 - 2.45 m', unit: 'm', notes: 'Lateral reach explosive power' },
        { metric: 'Countermovement Jump (CMJ)', proStandard: '55 - 62 cm (21.5 - 24.5 in)', collegeOrSemiPro: '48 - 54 cm', unit: 'cm', notes: 'Vertical catch height' },
        { metric: 'Pro Agility (5-10-5)', proStandard: '4.15 - 4.30 s', collegeOrSemiPro: '4.35 - 4.50 s', unit: 'sec', notes: 'Goal crease footwork' },
        { metric: 'Overhead Barbell Press', proStandard: '165+ lb (0.9x BW)', collegeOrSemiPro: '135+ lb', unit: 'lb', notes: 'Shoulder stability armor' }
      ]
    }
  ],
  basketball: [
    {
      id: 'bb-guards',
      sportId: 'basketball',
      name: 'Point & Shooting Guards',
      shortCode: 'PG / SG',
      roleBadge: 'Patellar Tendon Armor & Deceleration Agility',
      tagline: 'Perimeter stop-and-pop deceleration, lateral defensive slides, and patellar tendon isometric stiffness.',
      overview: 'Guards absorb extreme deceleration forces up to 7-9x body weight on sudden step-backs, pull-up jumpers, and perimeter cuts. Their top vulnerability is jumper\'s knee (patellar tendinopathy). Training builds isometric tendon stiffness and lateral cut agility.',
      demands: {
        energySystem: 'Alactic-Aerobic with rapid change-of-direction (CODS)',
        kineticChainFocus: 'Patellar tendon stiffness, ankle plantarflexion elasticity, hip internal rotation',
        injuryPreventionZone: 'Patellar tendon, lateral ankle ligaments, ACL during non-contact deceleration',
        biomotorPriority: 'Deceleration (Braking Force), Lateral First-Step & Tendon Health'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Spanish Squat isometric holds, Trap Bar Deadlifts, Lateral Bounds, and Depth Drops from 12-18 inches.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-bb-spanish-squat',
            name: 'Heavy Spanish Squat 45-Second Isometric Pause',
            prescription: '4 sets x 45s holds @ 70-80 degree knee flexion with heavy band behind knees',
            category: 'Squat & Lunge',
            coachingCue: 'Sit back into vertical shins, let band pull knees back, hold rock-solid without trembling.',
            scientificRationale: 'Induces cortical tendon remodeling and analgesic pain relief for patellar tendinopathy (Rio et al., 2015).'
          },
          {
            id: 'pos-bb-slant-board',
            name: 'Slant Board Poliquin Step-Ups & Tibialis Raises',
            prescription: '3 sets x 15 reps each leg',
            category: 'Squat & Lunge',
            coachingCue: 'Drive knee far over toe under control, keep heel elevated, touch opposite heel lightly to floor.',
            scientificRationale: 'Strengthens vastus medialis oblique (VMO) and patellar tendon through deep knee flexion angles.'
          }
        ],
        finisherDrill: {
          name: 'Zig-Zag Defensive Slide to 15m Transition Sprint',
          workRest: '6 reps, 35s rest',
          protocol: 'Defensive slide diagonally 4m x 4 turns between cones maintaining low hips, plant hard and explode into linear sprint.',
          energySystemGoal: 'Lateral deceleration and first-step transition.'
        }
      },
      benchmarks: [
        { metric: 'Lane Agility Drill', proStandard: '10.40 - 10.90 s', collegeOrSemiPro: '11.00 - 11.50 s', unit: 'sec', notes: 'NBA Combine benchmark' },
        { metric: 'Three-Quarter Court Sprint (75 ft)', proStandard: '3.15 - 3.28 s', collegeOrSemiPro: '3.30 - 3.45 s', unit: 'sec', notes: 'Transition speed' },
        { metric: 'Standing Vertical Leap', proStandard: '32.0 - 36.0 in', collegeOrSemiPro: '28.0 - 31.0 in', unit: 'in', notes: 'First-step explosion' },
        { metric: 'Max Vertical Leap (Approach)', proStandard: '38.0 - 43.0 in', collegeOrSemiPro: '33.0 - 37.0 in', unit: 'in', notes: 'Pull-up & finish elevation' }
      ]
    },
    {
      id: 'bb-wings',
      sportId: 'basketball',
      name: 'Small Forwards & Wings',
      shortCode: 'SF / Wing',
      roleBadge: 'Transition Sprint & Versatile Vertical',
      tagline: 'High-flying rim attacks, one-foot and two-foot vertical takeoff, and versatile perimeter/post defense.',
      overview: 'Wings must bridge perimeter agility and interior contact. They produce electrifying fast-break dunks and chase-down blocks requiring both 1-foot running takeoff and 2-foot power leaps, combined with contact-absorbing upper body armor.',
      demands: {
        energySystem: 'Alactic-Aerobic with high-velocity anaerobic repeats',
        kineticChainFocus: 'Penultimate foot plant, Achilles reactive elasticity, unilateral hip extension',
        injuryPreventionZone: 'Achilles tendon, ankle sprains, lower back facet joints',
        biomotorPriority: 'Maximum Running Vertical Leap, Transition Speed & Multi-Angle Power'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Hang Cleans, Rear-Foot Elevated Split Squat Jumps, and Trap Bar Deadlifts.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-bb-penultimate-jump',
            name: 'Penultimate Step Approach Box Jump (30-36")',
            prescription: '4 sets x 4 jumps (Focus on violent penultimate plant step)',
            category: 'Power & Plyometrics',
            coachingCue: 'Long penultimate step, low center of mass, convert horizontal approach momentum into pure vertical climb.',
            scientificRationale: 'Maximizes transfer of linear running kinetic energy into vertical takeoff displacement.'
          },
          {
            id: 'pos-bb-chinup-armor',
            name: 'Weighted Neutral-Grip Pull-Ups',
            prescription: '4 sets x 5-6 reps (Add 25-45 lb plate)',
            category: 'Pull',
            coachingCue: 'Full dead hang at bottom, drive elbows down to ribs, chest touches bar at top.',
            scientificRationale: 'Builds upper body contact resilience when absorbing fouls at the rim.'
          }
        ],
        finisherDrill: {
          name: 'Rim Attack Rebound to Fast-Break Chase',
          workRest: '6 reps, 40s rest',
          protocol: 'Leap for backboard touch, land and immediately sprint 20m full court, transition into lateral shuffle for 5m.',
          energySystemGoal: 'Transition repeat burst power.'
        }
      },
      benchmarks: [
        { metric: 'Max Vertical Leap (Approach)', proStandard: '38.0 - 44.0 in', collegeOrSemiPro: '33.0 - 37.0 in', unit: 'in', notes: 'Rim attack finishing' },
        { metric: 'Three-Quarter Court Sprint', proStandard: '3.18 - 3.32 s', collegeOrSemiPro: '3.35 - 3.50 s', unit: 'sec', notes: 'Fast-break speed' },
        { metric: 'Standing Vertical Leap', proStandard: '30.0 - 34.0 in', collegeOrSemiPro: '26.0 - 29.0 in', unit: 'in', notes: 'Tip-in and rebound' },
        { metric: 'Trap Bar Deadlift', proStandard: '425+ lb (2.1x BW)', collegeOrSemiPro: '365+ lb', unit: 'lb', notes: 'Total force foundation' }
      ]
    },
    {
      id: 'bb-bigs',
      sportId: 'basketball',
      name: 'Power Forwards & Centers',
      shortCode: 'PF / C ("Bigs")',
      roleBadge: 'Post Armor & Heavy Landing Resilience',
      tagline: 'Paint defense battles, repetitive rebound jumps, and knee/ankle durability under 240-270 lb frames.',
      overview: 'Centers and Power Forwards contest physical position in the restricted area on every possession. At 6\'9" to 7\'0"+ and 240-270 lbs, their joints endure colossal impact stresses on repeat landings. Training focuses on joint longevity, posterior chain armor, and second-jump bounce.',
      demands: {
        energySystem: 'Alactic bursts with high isometric wrestling demands in the low post',
        kineticChainFocus: 'Posterior chain force, heavy landing absorption, overhead reach grip',
        injuryPreventionZone: 'Lumbar spine (stress fractures), meniscus, Achilles tendon in heavy frames',
        biomotorPriority: 'Absolute Strength, Repeat Jump Height ("Second Bounce") & Joint Armor'
      },
      recommendedModifications: {
        coreLiftingFocus: 'High-handle Trap Bar Deadlifts to protect lumbar spine on tall levers. Heavy Goblet/Front Squats and Band-Resisted Box Jumps.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-bb-repeat-jumps',
            name: 'Repeat Ankle Jump / Tip Drill over Low Hurdle',
            prescription: '3 sets x 8 rapid continuous jumps (Minimum ground contact time)',
            category: 'Power & Plyometrics',
            coachingCue: 'Spring off forefoot instantly upon touching floor, reach high with both hands overhead.',
            scientificRationale: 'Conditions reactive ankle stiffness required for offensive rebound tip-ins ("second bounce").'
          },
          {
            id: 'pos-bb-post-iso',
            name: 'Heavy Sled Post-Up Isometric Hold',
            prescription: '4 sets x 20s isometric hip brace against weighted sled',
            category: 'Core & Armor',
            coachingCue: 'Drop hips into 90-degree post defense stance, wide base, drive hips backward into resistance.',
            scientificRationale: 'Builds isometric hip and glute torque to hold low-post defensive position without fouling.'
          }
        ],
        finisherDrill: {
          name: '5-Spot Mikan Rebound Sprint Drill',
          workRest: '30s high tempo / 45s rest x 5 rounds',
          protocol: 'Alternate explosive rim touches left and right hand continuous for 15s, then sprint to top of key and back to rim.',
          energySystemGoal: 'High-density interior repeat power.'
        }
      },
      benchmarks: [
        { metric: 'Standing Vertical Leap', proStandard: '28.0 - 33.0 in', collegeOrSemiPro: '24.0 - 27.0 in', unit: 'in', notes: 'NBA Big Man Combine standard' },
        { metric: 'Max Vertical Leap', proStandard: '33.0 - 37.0 in', collegeOrSemiPro: '28.0 - 32.0 in', unit: 'in', notes: 'Contested rebound reach' },
        { metric: 'Trap Bar Deadlift', proStandard: '495+ lb (1.9x BW)', collegeOrSemiPro: '405+ lb', unit: 'lb', notes: 'Heavy post defense anchor' },
        { metric: 'Lane Agility Drill', proStandard: '11.00 - 11.60 s', collegeOrSemiPro: '11.80 - 12.50 s', unit: 'sec', notes: 'Big man perimeter mobility' }
      ]
    }
  ],
  boxing: [
    {
      id: 'box-slugger',
      sportId: 'boxing',
      name: 'Slugger / Power Puncher',
      shortCode: 'Power Puncher',
      roleBadge: 'Rotational Torque & Knockout Kinetic Chain',
      tagline: 'Violent hip-to-shoulder rotational torque, posterior chain drive, and heavy lead-hook armor.',
      overview: 'Power punchers look to end fights with catastrophic kinetic chain transfer. Over 80% of punch force comes from the drive of the legs through the hips and rotational torso uncoiling. Training builds maximum ground reaction force and rotary core rigidity at contact.',
      demands: {
        energySystem: 'Alactic Power with explosive alactic-anaerobic combinations',
        kineticChainFocus: 'Rear-foot triple extension, pelvic rotational torque, wrist/forearm collision stiffness',
        injuryPreventionZone: 'Rotator cuff tears from missed power hooks, wrist TFCC, lumbar rotation shear',
        biomotorPriority: 'Peak Punching Impulse (Ft), Rotational Velocity & Impact Rigidity'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Rotational Landmine Clean & Jerks, Heavy Trap Bar Deadlifts, and Med Ball Rotational Slams against wall.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-box-landmine-punch',
            name: 'Explosive Landmine Rotational Punch with Weight',
            prescription: '4 sets x 5 reps each arm (Max velocity acceleration)',
            category: 'Power & Plyometrics',
            coachingCue: 'Pivot hard off back ball-of-foot, transfer hip rotation through core, punch barbell explosively to lockout.',
            scientificRationale: 'Matches the exact kinetic chain ground-reaction vector of a knockout straight right or rear hook.'
          },
          {
            id: 'pos-box-heavy-wrist-rot',
            name: 'Loaded Wrist Roller & Forearm Sledgehammer Levers',
            prescription: '3 sets x 3 trips up/down + 10 hammer lever touches',
            category: 'Core & Armor',
            coachingCue: 'Keep arms parallel to floor, roll controlled, do not let wrist hyperextend on contact.',
            scientificRationale: 'Guarantees the wrist does not collapse upon impact with skull, transmitting 100% of bodyweight momentum.'
          }
        ],
        finisherDrill: {
          name: 'Heavy Bag 10-Second Knockout Combination Battery',
          workRest: '10s 100% max-power combinations / 20s active shadow slip x 8 rounds',
          protocol: 'On bell, unleash maximum force 3-4 punch power combinations into heavy bag with full hip rotation. Rest actively slipping punches.',
          energySystemGoal: 'Alactic power repeatability without dropping punch velocity.'
        }
      },
      benchmarks: [
        { metric: 'Rotational Med Ball Punch Throw (10 lb)', proStandard: '42+ mph (or 45+ ft)', collegeOrSemiPro: '35+ mph', unit: 'mph', notes: 'Direct punch power proxy' },
        { metric: 'Trap Bar Deadlift (1RM)', proStandard: '455+ lb (2.2x BW)', collegeOrSemiPro: '385+ lb', unit: 'lb', notes: 'Ground reaction force origin' },
        { metric: 'Bench Press (1RM)', proStandard: '285+ lb (1.4x BW)', collegeOrSemiPro: '240+ lb', unit: 'lb', notes: 'Punch impact collision base' },
        { metric: 'Jump Shrug Power Peak', proStandard: '> 55 Watts / kg', collegeOrSemiPro: '> 48 W/kg', unit: 'W/kg', notes: 'Force plate RFD' }
      ]
    },
    {
      id: 'box-outboxer',
      sportId: 'boxing',
      name: 'Out-Boxer / Pure Boxer',
      shortCode: 'Speed / Out-Boxer',
      roleBadge: 'Achilles Elasticity & Alactic-Aerobic Engine',
      tagline: 'Spring-loaded ring footwork, rapid jab volume, calf elasticity, and 12-round cardio stamina.',
      overview: 'Out-boxers control the ring with relentless lateral movement, pivots, and rapid jab volume. Their calves and Achilles tendons operate like pre-tensioned carbon springs, requiring supreme plyometric elasticity and a massive aerobic base to dance for 36 minutes.',
      demands: {
        energySystem: 'Relentless Aerobic Engine (VO2max > 62 ml/kg/min) + Rapid Alactic Jabs',
        kineticChainFocus: 'Ankle stiffness, Achilles spring recoil, rapid lead shoulder retraction',
        injuryPreventionZone: 'Achilles tendonitis, plantar fascia, lead shoulder impingement',
        biomotorPriority: 'Elastic Tendon Recoil, High-Volume Punch Capacity & Ring Movement Speed'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Continuous Hurdle Pogo Hops, Single-Leg Bounds, Jump Rope Double-Unders, and High-Velocity Band Presses.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-box-pogo-hop',
            name: 'Low-Amplitude Stiff-Ankle Pogo Hops with Jump Rope',
            prescription: '4 sets x 60 seconds (150+ RPM cadence)',
            category: 'Power & Plyometrics',
            coachingCue: 'Minimal knee bend. Bounce exclusively off forefeet with rigid ankles, pop instantly off canvas.',
            scientificRationale: 'Optimizes muscle-tendon unit hysteresis and elasticity in the gastrocnemius-soleus complex.'
          },
          {
            id: 'pos-box-band-jab',
            name: 'High-Velocity Resistance Band Jab Speed Repeats',
            prescription: '4 sets x 20 rapid jabs in 10 seconds each arm',
            category: 'Push',
            coachingCue: 'Snap jab out and retract back to chin twice as fast. Relax shoulder between strikes.',
            scientificRationale: 'Trains rapid agonist activation and immediate antagonist relaxation ("double activation" phenomenon).'
          }
        ],
        finisherDrill: {
          name: '12-Round Championship Pace Shuttle & Punch Intervals',
          workRest: '3 min round (30s high cadence jab flurry / 30s lateral ring shuffle x 3) / 1 min rest x 4 rounds',
          protocol: 'Simulates genuine championship round physiological pacing: sustained lateral footwork punctuated by high-output flurries.',
          energySystemGoal: 'Aerobic threshold with rapid phosphagen replenishment.'
        }
      },
      benchmarks: [
        { metric: 'Reactive Strength Index (RSI)', proStandard: '> 2.40 (Drop jump 30cm)', collegeOrSemiPro: '> 1.95', unit: 'index', notes: 'Spring-loaded ankle recoil' },
        { metric: '3-Mile Roadwork Time', proStandard: '< 18:30 min', collegeOrSemiPro: '< 20:00 min', unit: 'min:sec', notes: 'Championship aerobic base' },
        { metric: 'Punch Output Rate (Compubox simulated)', proStandard: '80 - 100 punches / rd', collegeOrSemiPro: '65 - 75 / rd', unit: 'punches', notes: 'Work capacity' },
        { metric: 'Trap Bar Deadlift', proStandard: '365+ lb (1.8x BW)', collegeOrSemiPro: '315+ lb', unit: 'lb', notes: 'Lean power-to-weight foundation' }
      ]
    },
    {
      id: 'box-swarmer',
      sportId: 'boxing',
      name: 'Inside Swarmer / Pressure Fighter',
      shortCode: 'Pressure / Swarmer',
      roleBadge: 'Infighting Clinch Armor & Body Shot Core',
      tagline: 'Infighting endurance, neck/cervical armor, ribcage core density, and relentless close-range hooks.',
      overview: 'Pressure fighters stay glued to their opponent\'s chest, cutting off the ring with head movement and slipping into infighting range. They absorb heavy counterpunches on the guard and ribs, requiring dense abdominal armor, neck bridge strength, and isometric clinch wrestling force.',
      demands: {
        energySystem: 'High Lactate Tolerance & Anaerobic Glycolytic buffering capacity',
        kineticChainFocus: 'Thoracic flexion-extension endurance, anti-lateral flexion core armor, clinch isometric grip',
        injuryPreventionZone: 'Cervical spine, rib fractures, lower back erector fatigue',
        biomotorPriority: 'Anaerobic Lactic Endurance, Isometric Clinch Wrestling & Core Armor'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Zercher Squats, Heavy Medicine Ball Slams into partner or floor, Weighted Neck Bridges, and Heavy Farmers Walks.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-box-zercher-carry',
            name: 'Heavy Zercher Sandbag / Barbell Carry (1.0x BW)',
            prescription: '4 sets x 40 meters (Rest 60s)',
            category: 'Core & Armor',
            coachingCue: 'Hug weight tight against chest, breathe through diaphragm, brace core like expecting a liver shot.',
            scientificRationale: 'Conditions the rectus abdominis and internal obliques to withstand punishing body blows without folding.'
          },
          {
            id: 'pos-box-neck-harness',
            name: '4-Way Heavy Neck Harness Flexion & Extension',
            prescription: '4 sets x 15 reps with 20-35 lb plate',
            category: 'Core & Armor',
            coachingCue: 'Slow 2s down, 1s up, smooth continuous motion without jerking cervical joints.',
            scientificRationale: 'Protects the brain stem against angular acceleration and rotational torque from heavy hooks.'
          }
        ],
        finisherDrill: {
          name: 'The Clinch Push-to-Infighting Hook Burnout',
          workRest: '20s maximum power infighting hooks / 10s isometric bag bear-hug x 6 rounds (Tabata)',
          protocol: 'Bury head into heavy bag in infighting stance. Unleash continuous short hooks to body and head for 20s, then immediately lock arms around bag and squeeze with 100% force for 10s.',
          energySystemGoal: 'Extreme lactic acid tolerance under sustained upper body hypoxia.'
        }
      },
      benchmarks: [
        { metric: 'Zercher Squat (1RM)', proStandard: '315+ lb (1.5x BW)', collegeOrSemiPro: '255+ lb', unit: 'lb', notes: 'Core and chest armor' },
        { metric: 'Neck Circumference', proStandard: '17.5 - 19.0 in', collegeOrSemiPro: '16.0 - 17.0 in', unit: 'in', notes: 'Punch dissipation shield' },
        { metric: 'Lactate Threshold Heart Rate Recovery', proStandard: '> 45 bpm drop in 60s', collegeOrSemiPro: '> 35 bpm drop', unit: 'bpm', notes: 'Between-round recovery' },
        { metric: 'Trap Bar Deadlift', proStandard: '425+ lb (2.1x BW)', collegeOrSemiPro: '355+ lb', unit: 'lb', notes: 'Low-center-of-gravity anchor' }
      ]
    }
  ],
  functional: [
    {
      id: 'fn-longevity-armor',
      sportId: 'functional',
      name: 'Longevity & Joint Armor',
      shortCode: 'JOINT ARMOR',
      roleBadge: 'Pain-Free Durability & Spinal Hygiene',
      tagline: 'Eliminate chronic stiffness, bulletproof knees and lower back, and master the McGill Big 3.',
      overview: 'Geared towards lifters and everyday athletes prioritizing lifelong joint health, spinal integrity, deep squat mobility, and injury inoculation over ego lifting.',
      demands: {
        energySystem: 'Aerobic Base (Zone 2) & Alactic-Isometric Durability',
        kineticChainFocus: 'Dr. Stuart McGill core stiffness, knees-over-toes deceleration, deep hip capsule rotation',
        injuryPreventionZone: 'Lumbar discs, patellar tendon, rotator cuff, SI joint',
        biomotorPriority: 'Joint Health, Muscular Endurance & Anti-Fragility'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Prioritize neutral-grip Trap Bar Deadlifts and Goblet Box Squats over straight bar. Supersets integrate active mobility and controlled tempos.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-fn-mcgill',
            name: 'Dr. Stuart McGill Big 3 (Spinal Hygiene)',
            prescription: '3 rounds x 8-6-4 descending second holds (Bird-Dog, Side Bridge, McGill Curl-Up)',
            category: 'Core & Armor',
            coachingCue: 'Lock ribcage to pelvis, brace abdominal wall like bracing for a punch, breathe without losing stiffness.',
            scientificRationale: 'Creates a 360-degree muscular corset around the lumbar spine, drastically minimizing spinal shear and disc herniation risk (McGill, 2015).'
          },
          {
            id: 'pos-fn-poliquin',
            name: 'Poliquin Step-Downs & Tibialis Wall Raises',
            prescription: '3 sets x 15 reps each leg / 20 tibialis raises',
            category: 'Squat & Lunge',
            coachingCue: 'Elevate heel on slant board or 25lb plate. Drive knee forward past toes with slow 3-second descent.',
            scientificRationale: 'Stimulates patellar and quadriceps tendon collagen turnover, inoculating against jumper knee and chronic patellar tendinopathy.'
          },
          {
            id: 'pos-fn-deadhang',
            name: 'Passive-to-Active Decompression Dead Hang',
            prescription: '3 sets x 60-90s continuous hold from pull-up bar',
            category: 'Pull',
            coachingCue: 'Grip bar tightly, relax lumbar spine and hips, allow gravity to decompress intervertebral discs.',
            scientificRationale: 'Expands the subacromial space, stretches tight pectoralis minor, and directly correlates with all-cause longevity in epidemiological studies.'
          }
        ],
        finisherDrill: {
          name: 'Joint Armor Synovial Flush & Sled Drag',
          workRest: '4 rounds: 30m Backward Sled Drag / 60s Deep Resting Squat Hold',
          protocol: 'Load sled moderately. Walk backward with positive shin angles to pump blood into knees. Immediately drop into a relaxed deep resting squat.',
          energySystemGoal: 'Parasympathetic recovery, synovial fluid circulation, and low-impact cardiovascular work.'
        }
      },
      benchmarks: [
        { metric: 'Dead Hang Duration', proStandard: '120+ seconds', collegeOrSemiPro: '90 seconds', unit: 'sec', notes: 'Grip & shoulder longevity' },
        { metric: 'Deep Resting Squat Hold', proStandard: '3:00 minutes', collegeOrSemiPro: '2:00 minutes', unit: 'min:sec', notes: 'Hip/ankle mobility baseline' },
        { metric: 'Trap Bar Deadlift 3RM', proStandard: '2.0x Bodyweight', collegeOrSemiPro: '1.5x Bodyweight', unit: 'lb', notes: 'Safe posterior chain force' },
        { metric: 'Resting Heart Rate', proStandard: '< 52 bpm', collegeOrSemiPro: '< 60 bpm', unit: 'bpm', notes: 'Cardiovascular recovery' }
      ]
    },
    {
      id: 'fn-hypertrophy',
      sportId: 'functional',
      name: 'Functional Hypertrophy & Physique',
      shortCode: 'LEAN MUSCLE',
      roleBadge: 'Athletic Muscle & Postural Shelf',
      tagline: 'Build dense, athletic muscle that enhances posture and movement rather than restricting it.',
      overview: 'For lifters seeking the physique benefits of hypertrophy training while preserving rotational athleticism, shoulder mobility, and functional movement freedom.',
      demands: {
        energySystem: 'Glycolytic Hypertrophy (60-90s rest, high mechanical tension)',
        kineticChainFocus: 'Full active range of motion, scapular retraction, glute/hamstring balance',
        injuryPreventionZone: 'Bicipital tendon, pectoral insertion, anterior hip impingement',
        biomotorPriority: 'Myofibrillar Hypertrophy & Structural Balance'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Emphasize dumbbell pressing, chest-supported rows, and Bulgarian split squats through deep pain-free stretch.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-fn-facepull',
            name: 'Cable Face Pull with External Rotation Squeeze',
            prescription: '3 sets x 15 reps with 2s peak hold',
            category: 'Pull',
            coachingCue: 'Pull rope toward nose while rotating thumbs backward behind ears.',
            scientificRationale: 'Directly counteracts upper-crossed syndrome and forward rounded shoulders from sedentary desk work.'
          },
          {
            id: 'pos-fn-incline-curl',
            name: 'Incline Dumbbell Curl (Long-Length Tension)',
            prescription: '3 sets x 10-12 reps with 3s eccentric',
            category: 'Pull',
            coachingCue: 'Sit at 60-degree incline, let arms hang directly perpendicular to floor. Curl with full supination.',
            scientificRationale: 'Stretches the long head of the biceps under load for superior muscle hypertrophy without elbow shear.'
          },
          {
            id: 'pos-fn-lateral-raise',
            name: 'Leaning Cable Lateral Raise',
            prescription: '3 sets x 12-15 reps /side',
            category: 'Push',
            coachingCue: 'Set cable at wrist height, lean slightly away, raise out in scapular plane.',
            scientificRationale: 'Provides continuous mechanical tension across the lateral deltoid throughout the entire arc.'
          }
        ],
        finisherDrill: {
          name: 'Hypertrophy Density AMRAP',
          workRest: '6-minute continuous flow: 10 Push-Ups + 10 DB Incline Rows + 10 Goblet Squats',
          protocol: 'Rotate smoothly between movements with minimal rest, maintaining pristine form and peak contraction.',
          energySystemGoal: 'High metabolic density and muscular work capacity.'
        }
      },
      benchmarks: [
        { metric: 'Strict Pull-Ups', proStandard: '15+ strict reps', collegeOrSemiPro: '10-12 reps', unit: 'reps', notes: 'Bodyweight pulling power' },
        { metric: 'Dumbbell Bench Press', proStandard: '100+ lb DBs x 8', collegeOrSemiPro: '80 lb DBs x 8', unit: 'lb', notes: 'Upper push pressing' },
        { metric: 'Bulgarian Split Squat', proStandard: '50% BW each hand x 8', collegeOrSemiPro: '35% BW x 8', unit: 'lb', notes: 'Unilateral leg strength' },
        { metric: 'Farmer\'s Walk (40m)', proStandard: '1.25x BW Total', collegeOrSemiPro: '1.0x BW Total', unit: 'lb', notes: 'Full kinetic chain integrity' }
      ]
    },
    {
      id: 'fn-hybrid-engine',
      sportId: 'functional',
      name: 'Hybrid Engine & Loaded Carries',
      shortCode: 'HYBRID ENGINE',
      roleBadge: 'Work Capacity & Loaded Carries',
      tagline: 'Unmatched conditioning, heavy farmer carries, kettlebell complexes, and high VO2 max.',
      overview: 'The hybrid training blueprint: combining heavy loaded carries, kettlebell ballistics, rowing/running engine, and rugged functional stamina.',
      demands: {
        energySystem: 'Alactic-Aerobic Repeat Power & High VO2 Max Engine',
        kineticChainFocus: 'Posterior chain hip snap, grip strength, thoracic extension under fatigue',
        injuryPreventionZone: 'Forearm flexors, lower back fatigue arching, Achilles tendon',
        biomotorPriority: 'Loaded Carry Endurance & Aerobic Power'
      },
      recommendedModifications: {
        coreLiftingFocus: 'Heavy Hex-Bar Carries, Suitcase Carries, Kettlebell Snatch/Swings, and Assault Bike / Rower intervals.',
        recommendedAccessoryProtocols: [
          {
            id: 'pos-fn-suitcase',
            name: 'Heavy Single-Arm Suitcase Carry',
            prescription: '4 sets x 30m /side (Rest 45s between sides)',
            category: 'Core & Armor',
            coachingCue: 'Walk tall, maintain perfectly level shoulders, zero lateral torso tilting.',
            scientificRationale: 'Massive contralateral quadratus lumborum and oblique activation, building spinal resilience under unilateral loads.'
          },
          {
            id: 'pos-fn-kb-swing',
            name: 'Hardstyle Kettlebell Swings (Speed Snap)',
            prescription: '5 sets x 15 reps (32kg / 24kg)',
            category: 'Hinge',
            coachingCue: 'Hinge back deeply at hips, explode forward, stand tall with glutes clenched at top.',
            scientificRationale: 'Rapid rate of force development (RFD) in hip extensors with minimal knee shear and high cardiorespiratory demand.'
          },
          {
            id: 'pos-fn-deadhang-grip',
            name: 'Fat-Grip / Towel Pull-Up Hangs',
            prescription: '3 sets x 40-50s holds',
            category: 'Pull',
            coachingCue: 'Wrap towels around bar or use thick grips. Squeeze with white-knuckle intensity.',
            scientificRationale: 'Overloads flexor digitorum muscles, dramatically improving real-world grip strength and forearm armor.'
          }
        ],
        finisherDrill: {
          name: 'The Hybrid Gauntlet (Carries & Erg Engine)',
          workRest: '4 rounds: 50m Heavy Farmer\'s Walk + 250m Row Sprint (Rest 60s)',
          protocol: 'Pick up 50% BW dumbbells per hand and walk 50m quickly. Drop weights, sprint on Concept2 rower for 250m under 50s. Rest 60s and repeat.',
          energySystemGoal: 'Peak aerobic power and lactate clearance under high muscular load.'
        }
      },
      benchmarks: [
        { metric: 'Farmer\'s Carry (50m)', proStandard: '1.25x BW Total', collegeOrSemiPro: '1.0x BW Total', unit: 'lb', notes: 'Grip and core stamina' },
        { metric: '2000m Rowing Erg', proStandard: '< 6:45 min', collegeOrSemiPro: '< 7:15 min', unit: 'min:sec', notes: 'Aerobic engine benchmark' },
        { metric: 'Kettlebell Swings (5 min)', proStandard: '120+ reps (32kg/24kg)', collegeOrSemiPro: '90 reps', unit: 'reps', notes: 'Posterior chain density' },
        { metric: 'Cooper 12-Min Test', proStandard: '3000+ meters', collegeOrSemiPro: '2600+ meters', unit: 'meters', notes: 'Aerobic VO2 capacity' }
      ]
    }
  ]
};

export function getPositionsForSport(sportId: SportId): PositionSpecialization[] {
  return POSITIONS_BY_SPORT[sportId] || POSITIONS_BY_SPORT.boxing;
}

export function getDefaultPositionForSport(sportId: SportId): PositionSpecialization {
  const list = getPositionsForSport(sportId);
  return list[0];
}
