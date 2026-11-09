import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, X, Minimize2, Maximize2 } from 'lucide-react';

interface RestTimerWidgetProps {
  initialSeconds?: number;
  autoStart?: boolean;
  onComplete?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

// Module-level shared Web Audio Context singleton to prevent iOS WebKit context exhaustion
let sharedAudioCtx: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    if (!sharedAudioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

export const RestTimerWidget: React.FC<RestTimerWidgetProps> = ({
  initialSeconds = 90,
  autoStart = false,
  onComplete,
  isOpen,
  onClose
}) => {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  // Target wall-clock epoch timestamp (ms) when timer completes (survives iOS screen sleep/tab suspend)
  const targetEndTimeRef = useRef<number | null>(null);
  const lastBeepSecondRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Beep sound generator via shared Web Audio API
  const playBeep = useCallback((freq = 880, duration = 0.25) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = getSharedAudioContext();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  }, [soundEnabled]);

  // When initialSeconds or autoStart changes
  useEffect(() => {
    if (initialSeconds) {
      setTotalSeconds(initialSeconds);
      setRemainingSeconds(initialSeconds);
      lastBeepSecondRef.current = null;
      if (autoStart) {
        getSharedAudioContext();
        targetEndTimeRef.current = Date.now() + initialSeconds * 1000;
        setIsRunning(true);
      } else {
        targetEndTimeRef.current = null;
        setIsRunning(false);
      }
    }
  }, [initialSeconds, autoStart]);

  // Wall-Clock Accurate Timer Interval (handles iOS backgrounding & screen lock)
  useEffect(() => {
    if (!isRunning) {
      targetEndTimeRef.current = null;
      return;
    }

    if (!targetEndTimeRef.current) {
      targetEndTimeRef.current = Date.now() + remainingSeconds * 1000;
    }

    const intervalId = window.setInterval(() => {
      if (!targetEndTimeRef.current) return;
      const now = Date.now();
      const diffMs = targetEndTimeRef.current - now;
      const secondsLeft = Math.max(0, Math.ceil(diffMs / 1000));

      setRemainingSeconds(secondsLeft);

      // Warning beeps for countdown
      if (secondsLeft <= 3 && secondsLeft > 0 && lastBeepSecondRef.current !== secondsLeft) {
        lastBeepSecondRef.current = secondsLeft;
        playBeep(659, 0.15);
      }

      // Completion
      if (secondsLeft === 0) {
        clearInterval(intervalId);
        setIsRunning(false);
        targetEndTimeRef.current = null;
        lastBeepSecondRef.current = 0;
        playBeep(1046, 0.4);
        setTimeout(() => playBeep(1318, 0.5), 200);
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    }, 250);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, playBeep]);

  if (!isOpen) return null;

  const toggleRunning = () => {
    getSharedAudioContext();
    if (isRunning) {
      // Pause
      setIsRunning(false);
      targetEndTimeRef.current = null;
    } else {
      // Resume / Start
      const secondsToRun = remainingSeconds > 0 ? remainingSeconds : totalSeconds;
      setRemainingSeconds(secondsToRun);
      targetEndTimeRef.current = Date.now() + secondsToRun * 1000;
      lastBeepSecondRef.current = null;
      setIsRunning(true);
    }
  };

  const setPreset = (sec: number) => {
    getSharedAudioContext();
    setTotalSeconds(sec);
    setRemainingSeconds(sec);
    targetEndTimeRef.current = Date.now() + sec * 1000;
    lastBeepSecondRef.current = null;
    setIsRunning(true);
  };

  const resetTimer = () => {
    getSharedAudioContext();
    setIsRunning(false);
    targetEndTimeRef.current = null;
    lastBeepSecondRef.current = null;
    setRemainingSeconds(totalSeconds);
  };

  const progressPercent = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className={`fixed z-50 transition-all duration-200 no-print ${
      isMinimized 
        ? 'bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-white rounded-xl p-2.5 shadow-2xl border border-slate-700 dark:border-slate-800 flex items-center gap-3'
        : 'bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 left-3 sm:left-auto sm:w-80 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md text-slate-100 rounded-2xl shadow-2xl border border-slate-800 p-4'
    }`}>
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Rest Timer</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              getSharedAudioContext();
              setSoundEnabled(!soundEnabled);
            }}
            className="p-1.5 min-h-[32px] min-w-[32px] text-slate-400 hover:text-slate-100 transition-colors flex items-center justify-center"
            title={soundEnabled ? 'Mute Chime' : 'Unmute Chime'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1.5 min-h-[32px] min-w-[32px] text-slate-400 hover:text-slate-100 transition-colors flex items-center justify-center"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 min-h-[32px] min-w-[32px] text-slate-400 hover:text-rose-400 transition-colors flex items-center justify-center"
            title="Close Timer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isMinimized ? (
        <div className="flex items-center gap-3 mt-1">
          <span className="font-mono text-xl font-bold tracking-tight text-white tabular-nums">{timeFormatted}</span>
          <button
            onClick={toggleRunning}
            className="p-2 min-h-[36px] min-w-[36px] rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold flex items-center justify-center"
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      ) : (
        <div className="pt-2">
          {/* Main Display */}
          <div className="text-center py-1 sm:py-2">
            <div className={`font-mono text-4xl sm:text-5xl font-extrabold tracking-tight tabular-nums ${
              remainingSeconds === 0 ? 'text-emerald-400 animate-bounce' : remainingSeconds <= 5 ? 'text-amber-400' : 'text-white'
            }`}>
              {timeFormatted}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {remainingSeconds === 0 ? 'Rest Complete — Begin Next Set!' : isRunning ? 'Rest in progress...' : 'Paused'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 my-2.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Primary Controls */}
          <div className="flex items-center justify-center gap-2.5 my-2">
            <button
              onClick={toggleRunning}
              className={`flex items-center gap-2 px-5 py-2 min-h-[44px] rounded-xl font-bold text-xs sm:text-sm transition-all ${
                isRunning
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-950/40'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause' : 'Start'}</span>
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm transition-colors border border-slate-700/60"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="mt-2.5 pt-2 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Quick Presets:</div>
            <div className="grid grid-cols-5 gap-1">
              {[
                { label: '30s', val: 30 },
                { label: '60s', val: 60 },
                { label: '90s', val: 90 },
                { label: '2m', val: 120 },
                { label: '3m', val: 180 }
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => setPreset(preset.val)}
                  className={`py-2 min-h-[38px] text-xs font-mono rounded-lg text-center transition-colors ${
                    totalSeconds === preset.val
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
