import { SportId, SportProgram } from '../types/sport';
import { BOXING_PROGRAM } from './programs/boxing';
import { RUGBY_PROGRAM } from './programs/rugby';
import { FOOTBALL_PROGRAM } from './programs/football';
import { SOCCER_PROGRAM } from './programs/soccer';
import { BASKETBALL_PROGRAM } from './programs/basketball';
import { FUNCTIONAL_PROGRAM } from './programs/functional';

export const ALL_PROGRAMS: Record<SportId, SportProgram> = {
  boxing: BOXING_PROGRAM,
  rugby: RUGBY_PROGRAM,
  football: FOOTBALL_PROGRAM,
  soccer: SOCCER_PROGRAM,
  basketball: BASKETBALL_PROGRAM,
  functional: FUNCTIONAL_PROGRAM
};

export const SPORT_TABS: { id: SportId; name: string; iconName: string; shortBio: string; primaryFocus: string }[] = [
  {
    id: 'functional',
    name: 'Everyday Athlete',
    iconName: 'HeartPulse',
    shortBio: 'Functional strength, bulletproof joint armor, mobility & longevity engine',
    primaryFocus: '7 Human Movement Patterns & Pain-Free Durability'
  },
  {
    id: 'boxing',
    name: 'Boxing',
    iconName: 'Shield',
    shortBio: 'Athletic power, ring conditioning & lean functional armor',
    primaryFocus: 'Rotational Punch Power & Alactic-Aerobic Engine'
  },
  {
    id: 'rugby',
    name: 'Rugby',
    iconName: 'Flame',
    shortBio: 'Collision armor, repeat sprints & compressed 50-min superset splits',
    primaryFocus: 'Scrum/Tackle Armor & Repeat-Sprint Ability (RSA)'
  },
  {
    id: 'football',
    name: 'Football',
    iconName: 'Zap',
    shortBio: 'Collision neck armor, 0-10yd alactic burst & play-clock conditioning',
    primaryFocus: 'Combine Velocity & Concussion Neck Armor'
  },
  {
    id: 'soccer',
    name: 'Soccer',
    iconName: 'Activity',
    shortBio: 'Hamstring resilience (Nordic), groin durability & 120% MAS endurance',
    primaryFocus: 'Eccentric Injury Inoculation & Match Stamina'
  },
  {
    id: 'basketball',
    name: 'Basketball',
    iconName: 'TrendingUp',
    shortBio: 'Vertical jump RFD, patellar tendon isometrics & court agility',
    primaryFocus: 'Maximum Vertical Leap & Jumper\'s Knee Resilience'
  }
];

export const PROGRESSION_SYSTEM_RULES = {
  doubleProgression: [
    {
      step: '1. Hit the Floor',
      description: 'Every set must reach at least the bottom of the rep range (e.g. 5 of 5-8, or 10 of 10-12) with 2 clean reps left in reserve (RPE 8).'
    },
    {
      step: '2. Hit the Ceiling',
      description: 'When every working set reaches the top of the rep range (e.g. 8 of 5-8, or 12 of 10-12) at the same load with crisp form, you have earned a weight increase.'
    },
    {
      step: '3. Add Load, Reset Reps',
      description: 'Add 5 kg (10 lb) to lower-body compound lifts, and 2.5 kg (5 lb) to upper-body lifts. Reps naturally drop back toward the floor—climb the ladder again.'
    },
    {
      step: '4. Own the Progression',
      description: 'Repeat across the 8-week cycle. Strength, power, and lean functional muscle follow the paper trail logged in your session tables.'
    }
  ],
  rpeTable: [
    { rpe: 'RPE 6', rir: '4+ Reps in Reserve', description: 'Very easy warm-up or re-entry start. Move bar smoothly, zero grinding.' },
    { rpe: 'RPE 7', rir: '3 Reps in Reserve', description: 'Phase 1 working sets. Fast bar velocity, slight muscular tension, plenty in tank.' },
    { rpe: 'RPE 8', rir: '2 Reps in Reserve', description: 'Default working intensity throughout the programs. Solid effort, 2 crisp reps left.' },
    { rpe: 'RPE 9', rir: '1 Rep in Reserve', description: 'Top sets in Phase 2 strength weeks. Heavy strain, only 1 rep remaining.' },
    { rpe: 'RPE 10', rir: '0 Reps in Reserve', description: 'Test week only (Week 8 retests). Maximal effort without technical failure.' }
  ],
  regressionRules: [
    {
      name: 'Two-Strike Rule',
      rule: 'Miss the rep floor on a main lift for two sessions in a row? Drop that lift 10% on the following session and rebuild with speed. Log it, don\'t ego it.'
    },
    {
      name: 'Swap, Don\'t Stop',
      rule: 'If a lift continues to stall due to joint ache, biomechanical friction, or mobility, switch to its listed regression in the Movement Index for one week before returning.'
    },
    {
      name: 'Form First (Speed & Cleanliness)',
      rule: 'Grinding reps with ugly spinal flexion or knee valgus adds zero transfer to athletic performance. Every rep must look fast, explosive, and controlled.'
    },
    {
      name: 'Sleep Check & Volume Cap',
      rule: 'Under 6 hours of sleep? Cap the day at RPE 7, drop the final superset pair, and focus on movement quality. Recovery is training.'
    }
  ],
  timeCrunchHierarchy: [
    { order: '1. Cut 1st', target: 'Metabolic Finisher & Armor Circuits', note: 'The metabolic finisher and extra circuits go first. You lose a sliver of conditioning, not core strength.' },
    { order: '2. Cut 2nd', target: 'Last Round of Accessory Superset', note: 'Drop the final round of the second or third superset pair. 3 rounds still delivers 85%+ of the hypertrophy stimulus.' },
    { order: '3. Cut 3rd', target: 'A Set from the Main Lift (Not the Lift)', note: 'Reduce the main compound lift from 4 sets to 3 sets. Protect the load and stimulus, never skip the lift.' },
    { order: 'Never Cut', target: 'The 8-Minute Warm-Up & Fresh Sprint Quality', note: 'Shorten warm-up to 5 minutes minimum if pressed, but never skip. Sprint quality requires fresh neuromuscular firing.' }
  ]
};
