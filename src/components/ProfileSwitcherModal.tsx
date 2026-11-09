import React, { useState } from 'react';
import { 
  X, 
  User, 
  Check, 
  Sparkles, 
  SlidersHorizontal, 
  Dumbbell, 
  Shield, 
  Heart,
  Edit2
} from 'lucide-react';
import { ProfileId, UserProfile, AppExperienceMode } from '../types/profile';

interface ProfileSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfileId: ProfileId;
  profiles: Record<ProfileId, UserProfile>;
  onSelectProfile: (id: ProfileId) => void;
  onUpdateProfile: (id: ProfileId, updates: Partial<UserProfile>) => void;
}

export const ProfileSwitcherModal: React.FC<ProfileSwitcherModalProps> = ({
  isOpen,
  onClose,
  activeProfileId,
  profiles,
  onSelectProfile,
  onUpdateProfile
}) => {
  const [editingId, setEditingId] = useState<ProfileId | null>(null);
  const [editName, setEditName] = useState('');

  if (!isOpen) return null;

  const handleStartRename = (profile: UserProfile) => {
    setEditingId(profile.id);
    setEditName(profile.name);
  };

  const handleSaveRename = (id: ProfileId) => {
    if (editName.trim()) {
      onUpdateProfile(id, { 
        name: editName.trim(),
        avatarLabel: editName.trim().charAt(0).toUpperCase()
      });
    }
    setEditingId(null);
  };

  const handleToggleMode = (id: ProfileId, currentMode: AppExperienceMode) => {
    const nextMode: AppExperienceMode = currentMode === 'simple' ? 'advanced' : 'simple';
    onUpdateProfile(id, { mode: nextMode });
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 id="profile-modal-title" className="text-sm font-bold text-slate-900 dark:text-white">
                Who's Working Out?
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Switch between your routines &amp; preferences
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close profile switcher"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Selection Cards */}
        <div className="p-4 sm:p-5 space-y-3 overflow-y-auto">
          {(Object.values(profiles) as UserProfile[]).map((profile) => {
            const isActive = profile.id === activeProfileId;
            const isEditing = editingId === profile.id;

            return (
              <div
                key={profile.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/80 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div 
                    onClick={() => {
                      if (!isActive) {
                        onSelectProfile(profile.id);
                        onClose();
                      }
                    }}
                    className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-black text-base shadow-sm shrink-0 ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}>
                      {profile.avatarLabel || profile.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveRename(profile.id);
                            }}
                            className="px-2 py-1 bg-white dark:bg-slate-900 border border-emerald-500 rounded text-sm font-bold text-slate-900 dark:text-white w-32"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveRename(profile.id)}
                            className="px-2 py-1 bg-emerald-500 text-slate-950 rounded text-xs font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                            {profile.name}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartRename(profile);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
                            title="Rename Profile"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {profile.mode === 'simple'
                          ? '1-Tap Workouts · Clean Checkmarks'
                          : 'Full Sports Science & Periodization'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isActive ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectProfile(profile.id);
                          onClose();
                        }}
                        className="px-3 py-1.5 min-h-[36px] rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-emerald-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                      >
                        Switch
                      </button>
                    )}
                  </div>
                </div>

                {/* Experience Mode Switcher on this card */}
                <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    Interface Style:
                  </span>
                  
                  <div className="flex rounded-lg bg-slate-200 dark:bg-slate-800 p-0.5 font-bold text-[11px]">
                    <button
                      type="button"
                      onClick={() => onUpdateProfile(profile.id, { mode: 'simple' })}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        profile.mode === 'simple'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Simple
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateProfile(profile.id, { mode: 'advanced' })}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        profile.mode === 'advanced'
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-extrabold'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Advanced
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-700 dark:text-slate-300">Tip:</span> Simple Mode hides all dropdown menus, science libraries, and complex calculators so your partner can open the app and start immediately with zero confusion.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 font-bold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
