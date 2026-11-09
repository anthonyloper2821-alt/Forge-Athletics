/**
 * Device Profile Management & Hardware Memory
 * Generates and stores a unique persistent profile per physical device (phone, watch, tablet, PC).
 */

import { SportId } from '../types/sport';
import { AppExperienceMode } from '../types/profile';

const DEVICE_ID_KEY = 'apex_device_id';
const DEVICE_PROFILE_KEY = 'apex_device_profile_meta';

export interface DeviceRoutineState {
  sportId: SportId;
  positionId: string;
  phaseIndex: number;
  weekNumber: number;
  dayNumber: number;
  lastUpdated: string;
}

export interface DeviceProfile {
  deviceId: string;
  name: string;
  deviceType: 'phone' | 'tablet' | 'desktop' | 'watch';
  mode: AppExperienceMode;
  lastRoutine: DeviceRoutineState;
  createdAt: string;
}

/**
 * Detect a user-friendly device label from user agent
 */
export function detectDeviceName(): { name: string; type: 'phone' | 'tablet' | 'desktop' | 'watch' } {
  if (typeof window === 'undefined' || !navigator) {
    return { name: 'Everyday Athlete', type: 'phone' };
  }

  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('watch') || (window.screen && window.screen.width < 250)) {
    return { name: 'Apple Watch', type: 'watch' };
  }
  if (ua.includes('ipad') || (ua.includes('macintosh') && 'ontouchend' in document)) {
    return { name: 'Gym iPad', type: 'tablet' };
  }
  if (ua.includes('iphone')) {
    return { name: 'iPhone Athlete', type: 'phone' };
  }
  if (ua.includes('android')) {
    return { name: 'Android Device', type: 'phone' };
  }
  if (ua.includes('mac') || ua.includes('win') || ua.includes('linux')) {
    return { name: 'Training Desktop', type: 'desktop' };
  }
  return { name: 'My Athlete Device', type: 'phone' };
}

/**
 * Get or create unique persistent Device ID
 */
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined' || !window.localStorage) {
    return 'device_default';
  }

  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = 'dev_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().slice(0, 12) : Date.now().toString(36));
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return 'device_fallback';
  }
}

/**
 * Get the current device profile with memory
 */
export function getDeviceProfile(): DeviceProfile {
  const deviceId = getOrCreateDeviceId();
  const detected = detectDeviceName();

  const defaultProfile: DeviceProfile = {
    deviceId,
    name: detected.name,
    deviceType: detected.type,
    mode: 'advanced',
    lastRoutine: {
      sportId: 'functional',
      positionId: 'all',
      phaseIndex: 0,
      weekNumber: 1,
      dayNumber: 1,
      lastUpdated: new Date().toISOString()
    },
    createdAt: new Date().toISOString()
  };

  if (typeof window === 'undefined' || !window.localStorage) {
    return defaultProfile;
  }

  try {
    const raw = localStorage.getItem(`${DEVICE_PROFILE_KEY}_${deviceId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultProfile,
        ...parsed,
        deviceId
      };
    }
    // First time on this device: save default
    localStorage.setItem(`${DEVICE_PROFILE_KEY}_${deviceId}`, JSON.stringify(defaultProfile));
  } catch {
    // fallback
  }

  return defaultProfile;
}

/**
 * Save updated device profile
 */
export function saveDeviceProfile(updates: Partial<DeviceProfile>): DeviceProfile {
  const current = getDeviceProfile();
  const updated: DeviceProfile = {
    ...current,
    ...updates,
    lastRoutine: {
      ...current.lastRoutine,
      ...(updates.lastRoutine || {})
    }
  };

  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(`${DEVICE_PROFILE_KEY}_${current.deviceId}`, JSON.stringify(updated));
    }
  } catch (err) {
    console.warn('Failed to save device profile:', err);
  }

  return updated;
}

/**
 * Save last viewed routine state (program, role, phase, week, day)
 */
export function saveDeviceRoutineState(routine: Partial<DeviceRoutineState>): void {
  const current = getDeviceProfile();
  const updatedRoutine: DeviceRoutineState = {
    ...current.lastRoutine,
    ...routine,
    lastUpdated: new Date().toISOString()
  };
  saveDeviceProfile({ lastRoutine: updatedRoutine });
}
