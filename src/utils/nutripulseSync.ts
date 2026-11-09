/**
 * NutriPulse Workout Sync Integration
 * Broadcasts completed workout events via BroadcastChannel to connect with the user's NutriPulse app.
 */

const syncChannel = typeof BroadcastChannel !== 'undefined' 
  ? new BroadcastChannel('nutripulse_workout_sync') 
  : null;

export interface NutriPulseWorkoutData {
  title: string;                             // e.g. "Upper Body Strength"
  category: 'strength' | 'cardio' | 'hiit' | 'mobility';
  duration: number;                          // in minutes, e.g. 45
  caloriesBurned: number;                    // e.g. 320
}

export function dispatchWorkoutToNutriPulse(workoutData: NutriPulseWorkoutData) {
  const payload = {
    type: 'WORKOUT_COMPLETED',
    workout: {
      id: 'w_' + Date.now(),
      title: workoutData.title,          // e.g. "Upper Body Strength"
      category: workoutData.category,    // 'strength' | 'cardio' | 'hiit' | 'mobility'
      durationMinutes: workoutData.duration, // e.g. 45
      caloriesBurned: workoutData.caloriesBurned, // e.g. 320
      date: new Date().toISOString().split('T')[0],
      sourceApp: 'My AI Studio Workout App'
    }
  };

  try {
    if (syncChannel) {
      syncChannel.postMessage(payload);
    } else if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('nutripulse_workout_sync');
      channel.postMessage(payload);
    }
    console.info('[NutriPulse Sync] Dispatched completed workout to NutriPulse:', payload.workout);
  } catch (error) {
    console.warn('[NutriPulse Sync] Failed to post workout message:', error);
  }
}

/**
 * Helper to calculate category, realistic duration, and calories burned for a workout day
 */
export function buildNutriPulseWorkoutData(params: {
  dayName: string;
  focus?: string;
  sportTitle?: string;
  exerciseCount?: number;
  totalSets?: number;
  elapsedMinutes?: number;
}): NutriPulseWorkoutData {
  const text = `${params.dayName} ${params.focus || ''} ${params.sportTitle || ''}`.toLowerCase();

  // 1. Determine category
  let category: 'strength' | 'cardio' | 'hiit' | 'mobility' = 'strength';
  if (text.includes('mobility') || text.includes('recovery') || text.includes('flexibility') || text.includes('decompress')) {
    category = 'mobility';
  } else if (text.includes('hiit') || text.includes('sprint') || text.includes('plyo') || text.includes('circuit') || text.includes('tabata')) {
    category = 'hiit';
  } else if (text.includes('cardio') || text.includes('conditioning') || text.includes('aerobic') || text.includes('endurance') || text.includes('zone 2')) {
    category = 'cardio';
  } else {
    category = 'strength';
  }

  // 2. Determine duration in minutes
  let duration = params.elapsedMinutes && params.elapsedMinutes > 5 
    ? Math.round(params.elapsedMinutes)
    : 45;
  
  if (!params.elapsedMinutes) {
    const sets = params.totalSets || (params.exerciseCount ? params.exerciseCount * 3.5 : 15);
    if (sets <= 8) duration = 25;
    else if (sets <= 14) duration = 40;
    else if (sets <= 20) duration = 50;
    else duration = 65;
  }

  // 3. Estimate calories based on category MET intensity & duration
  // Approx burn rate: strength ~7.2 kcal/min, hiit ~10.5 kcal/min, cardio ~8.5 kcal/min, mobility ~4.2 kcal/min
  let burnRate = 7.2;
  if (category === 'hiit') burnRate = 10.5;
  else if (category === 'cardio') burnRate = 8.5;
  else if (category === 'mobility') burnRate = 4.2;

  const caloriesBurned = Math.round(duration * burnRate);

  const title = params.dayName || params.focus || 'Strength & Conditioning Workout';

  return {
    title,
    category,
    duration,
    caloriesBurned
  };
}
