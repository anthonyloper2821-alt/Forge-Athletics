export type ProfileId = 'primary' | 'partner';
export type AppExperienceMode = 'simple' | 'advanced';

export interface UserProfile {
  id: ProfileId;
  name: string;
  avatarLabel: string;
  mode: AppExperienceMode;
  sport: string; // SportId
  activePhaseIndex: number;
  activeDayNumber: number;
  activeWeek: number;
  trainingFrequency: number;
}

export const DEFAULT_PROFILES: Record<ProfileId, UserProfile> = {
  primary: {
    id: 'primary',
    name: 'Anthony',
    avatarLabel: 'A',
    mode: 'advanced',
    sport: 'functional',
    activePhaseIndex: 0,
    activeDayNumber: 1,
    activeWeek: 1,
    trainingFrequency: 4
  },
  partner: {
    id: 'partner',
    name: 'Sarah',
    avatarLabel: 'S',
    mode: 'simple',
    sport: 'functional',
    activePhaseIndex: 0,
    activeDayNumber: 1,
    activeWeek: 1,
    trainingFrequency: 3
  }
};
