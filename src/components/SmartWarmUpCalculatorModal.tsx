import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  X, 
  Dumbbell, 
  Clock, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  Flame, 
  ChevronRight, 
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SmartWarmUpCalculatorModalProps {
  isOpen: boolean;
  exerciseName?: string;
  initialWorkingWeight?: number;
  onClose: () => void;
  onApplyToSession?: (weightStr: string) => void;
}

type UnitType = 'lb' | 'kg';
type BarType = 'olympic' | 'women' | 'trap' | 'short' | 'custom';
type ProtocolType = 'heavy-strength' | 'power-velocity' | 'hypertrophy';

interface RampStep {
  stepNumber: number;
  percentage: number;
  targetWeight: number;
  reps: string;
  purpose: string;
  platesPerSide: { weight: number; count: number; color: string }[];
  plateSummary: string;
}

const BAR_WEIGHTS: Record<UnitType, Record<BarType, number>> = {
  lb: {
    olympic: 45,
    women: 35,
    trap: 55,
    short: 25,
    custom: 45
  },
  kg: {
    olympic: 20,
    women: 15,
    trap: 25,
    short: 10,
    custom: 20
  }
};

const STANDARD_PLATES: Record<UnitType, { weight: number; color: string }[]> = {
  lb: [
    { weight: 45, color: 'bg-blue-600 text-white' },
    { weight: 35, color: 'bg-yellow-500 text-slate-950' },
    { weight: 25, color: 'bg-emerald-600 text-white' },
    { weight: 10, color: 'bg-slate-700 text-white' },
    { weight: 5, color: 'bg-slate-500 text-white' },
    { weight: 2.5, color: 'bg-slate-400 text-slate-900' }
  ],
  kg: [
    { weight: 25, color: 'bg-red-600 text-white' },
    { weight: 20, color: 'bg-blue-600 text-white' },
    { weight: 15, color: 'bg-yellow-500 text-slate-950' },
    { weight: 10, color: 'bg-emerald-600 text-white' },
    { weight: 5, color: 'bg-slate-700 text-white' },
    { weight: 2.5, color: 'bg-slate-500 text-white' },
    { weight: 1.25, color: 'bg-slate-400 text-slate-900' }
  ]
};

export const SmartWarmUpCalculatorModal: React.FC<SmartWarmUpCalculatorModalProps> = ({
  isOpen,
  exerciseName = 'Main Compound Lift',
  initialWorkingWeight,
  onClose,
  onApplyToSession
}) => {
  // Input parameters
  const [unit, setUnit] = useState<UnitType>('lb');
  const [workingWeight, setWorkingWeight] = useState<number>(() => {
    if (initialWorkingWeight && initialWorkingWeight > 0) return initialWorkingWeight;
    return 225;
  });
  const [barType, setBarType] = useState<BarType>('olympic');
  const [customBarWeight, setCustomBarWeight] = useState<number>(45);
  const [protocol, setProtocol] = useState<ProtocolType>('heavy-strength');

  // Guided Walkthrough & Sound States
  const [isGuidedMode, setIsGuidedMode] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [restSecondsRemaining, setRestSecondsRemaining] = useState(60);
  const [restTotalSeconds, setRestTotalSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [soundTestTriggered, setSoundTestTriggered] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Update working weight if initialWorkingWeight changes
  useEffect(() => {
    if (initialWorkingWeight && initialWorkingWeight > 0) {
      setWorkingWeight(initialWorkingWeight);
    }
  }, [initialWorkingWeight]);

  const activeBarWeight = barType === 'custom' ? customBarWeight : BAR_WEIGHTS[unit][barType];

  // Synthesize acoustic alerts via Web Audio API
  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  }, [soundEnabled]);

  // Triple harmonic alert for set completion
  const playSetReadyAlert = useCallback(() => {
    if (!soundEnabled) return;
    playTone(587.33, 0.25, 'triangle', 0.4); // D5
    setTimeout(() => playTone(739.99, 0.25, 'triangle', 0.4), 120); // F#5
    setTimeout(() => playTone(880, 0.5, 'sine', 0.5), 240); // A5
  }, [playTone, soundEnabled]);

  // Spoken voice prompt via SpeechSynthesis
  const speakPrompt = useCallback((text: string) => {
    if (!voiceEnabled || !soundEnabled) return;
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback
      }
    }
  }, [voiceEnabled, soundEnabled]);

  // Sound test button
  const handleTestSound = () => {
    setSoundTestTriggered(true);
    playSetReadyAlert();
    if (voiceEnabled) {
      setTimeout(() => speakPrompt('Audio alerts active. Set ready.'), 400);
    }
    setTimeout(() => setSoundTestTriggered(false), 2000);
  };

  // Calculate plates per side for a given target total weight
  const calculatePlatesPerSide = useCallback((targetTotal: number): { weight: number; count: number; color: string }[] => {
    const availablePlates = STANDARD_PLATES[unit];
    const weightToDistribute = Math.max(0, targetTotal - activeBarWeight);
    const weightPerSide = weightToDistribute / 2;

    let remaining = weightPerSide;
    const result: { weight: number; count: number; color: string }[] = [];

    for (const plate of availablePlates) {
      if (remaining <= 0.001) break;
      const count = Math.floor(remaining / plate.weight);
      if (count > 0) {
        result.push({
          weight: plate.weight,
          count,
          color: plate.color
        });
        remaining = Math.round((remaining - count * plate.weight) * 100) / 100;
      }
    }

    return result;
  }, [unit, activeBarWeight]);

  // Generate Ramp Sets based on Protocol
  const rampSteps: RampStep[] = useMemo(() => {
    const roundIncrement = unit === 'lb' ? 5 : 2.5;

    const roundWeight = (w: number) => {
      if (w <= activeBarWeight) return activeBarWeight;
      const rounded = Math.round(w / roundIncrement) * roundIncrement;
      return Math.max(activeBarWeight, rounded);
    };

    let stepConfigs: { pct: number; reps: string; purpose: string }[] = [];

    if (protocol === 'heavy-strength') {
      // 5-Set Heavy Strength PAP Ladder
      stepConfigs = [
        { pct: 0, reps: '8-10', purpose: 'Empty Bar · Joint lubrication & bar path' },
        { pct: 0.45, reps: '5', purpose: '45% · Dynamic movement patterning' },
        { pct: 0.65, reps: '3', purpose: '65% · Accelerate bar speed & intent' },
        { pct: 0.85, reps: '1-2', purpose: '85% · Neural PAP primer (Zero fatigue)' },
        { pct: 1.0, reps: 'Target Working Set', purpose: '100% · Peak Working Load' }
      ];
    } else if (protocol === 'power-velocity') {
      // 4-Set Explosive Power Ladder
      stepConfigs = [
        { pct: 0, reps: '6-8', purpose: 'Empty Bar · Hip drive & catch mechanics' },
        { pct: 0.50, reps: '3', purpose: '50% · Maximum barbell velocity' },
        { pct: 0.75, reps: '2', purpose: '75% · Violent triple extension intent' },
        { pct: 0.90, reps: '1', purpose: '90% · High-threshold motor unit primer' },
        { pct: 1.0, reps: 'Target Set', purpose: '100% · Full Explosive Work' }
      ];
    } else {
      // 4-Set Hypertrophy / Volume Ladder
      stepConfigs = [
        { pct: 0.40, reps: '8', purpose: '40% · Muscle temperature & blood flow' },
        { pct: 0.60, reps: '6', purpose: '60% · Groove mind-muscle coordination' },
        { pct: 0.80, reps: '3-4', purpose: '80% · Acclimate stabilizer tension' },
        { pct: 1.0, reps: 'Prescribed Reps', purpose: '100% · Hypertrophy Working Sets' }
      ];
    }

    return stepConfigs.map((cfg, idx) => {
      let targetWeight = cfg.pct === 0 ? activeBarWeight : roundWeight(workingWeight * cfg.pct);
      if (idx === stepConfigs.length - 1) {
        targetWeight = roundWeight(workingWeight);
      }

      const plates = calculatePlatesPerSide(targetWeight);
      const plateSummary = plates.length === 0
        ? 'Empty Bar'
        : plates.map(p => `${p.count}× ${p.weight}${unit}`).join(', ');

      return {
        stepNumber: idx + 1,
        percentage: cfg.pct === 0 ? 0 : Math.round((targetWeight / workingWeight) * 100),
        targetWeight,
        reps: cfg.reps,
        purpose: cfg.purpose,
        platesPerSide: plates,
        plateSummary
      };
    });
  }, [protocol, workingWeight, activeBarWeight, unit, calculatePlatesPerSide]);

  // Guided Walkthrough Timer Hook
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = window.setInterval(() => {
        setRestSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);

            // Trigger Set Ready Audible Alert & Voice
            playSetReadyAlert();
            const nextStep = rampSteps[currentStepIndex + 1];
            if (nextStep) {
              speakPrompt(`Set ${nextStep.stepNumber} ready. ${nextStep.targetWeight} ${unit === 'lb' ? 'pounds' : 'kilograms'}.`);
              setCurrentStepIndex(currentStepIndex + 1);
            } else {
              speakPrompt('Warm-up complete! You are ready for your working sets.');
            }
            return 0;
          }

          // 3-2-1 Acoustic Countdown Pings
          if (prev === 4) playTone(880, 0.15, 'sine', 0.3); // 3 sec
          if (prev === 3) playTone(880, 0.15, 'sine', 0.3); // 2 sec
          if (prev === 2) playTone(1046, 0.2, 'sine', 0.35); // 1 sec

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, currentStepIndex, rampSteps, unit, playTone, playSetReadyAlert, speakPrompt]);

  const handleStartRestTimer = (seconds = 60) => {
    setRestTotalSeconds(seconds);
    setRestSecondsRemaining(seconds);
    setIsTimerRunning(true);
    playTone(660, 0.15, 'sine', 0.25);
  };

  const handleSkipOrAdvance = () => {
    setIsTimerRunning(false);
    if (currentStepIndex < rampSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleApplyToSessionClick = () => {
    if (onApplyToSession) {
      onApplyToSession(`${workingWeight} ${unit}`);
    }
    onClose();
  };

  if (!isOpen) return null;

  const currentGuidedStep = rampSteps[currentStepIndex] || rampSteps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="warmup-title"
      >
        {/* Top Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Sports Science Potentiation · Barbell Plate Math
              </div>
              <h2 id="warmup-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate max-w-sm sm:max-w-md">
                Smart Warm-Up Ramp: {exerciseName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle in Header */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 min-h-[40px] min-w-[40px] rounded-lg transition-colors flex items-center justify-center border ${
                soundEnabled
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
              title={soundEnabled ? 'Mute audible ramp alerts' : 'Enable audible alerts'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 min-h-[40px] min-w-[40px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 text-slate-800 dark:text-slate-200">
          {/* Target Working Weight & Unit Selectors */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Target Working Set Load
                </label>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Calculates progressive neurological ramp & per-side barbell sleeve loading.
                </div>
              </div>

              {/* Units Toggle (LB / KG) */}
              <div className="flex items-center bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg self-start sm:self-auto text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setUnit('lb')}
                  className={`px-3 py-1.5 rounded-md transition-colors min-h-[32px] ${
                    unit === 'lb'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  LB
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('kg')}
                  className={`px-3 py-1.5 rounded-md transition-colors min-h-[32px] ${
                    unit === 'kg'
                      ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  KG
                </button>
              </div>
            </div>

            {/* Stepper Input & Quick Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setWorkingWeight(prev => Math.max(activeBarWeight, prev - (unit === 'lb' ? 10 : 5)))}
                  className="w-10 h-11 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-l-lg font-bold font-mono text-base flex items-center justify-center text-slate-800 dark:text-slate-200"
                >
                  -
                </button>
                <input
                  type="number"
                  min={activeBarWeight}
                  step={unit === 'lb' ? 5 : 2.5}
                  value={workingWeight}
                  onChange={(e) => setWorkingWeight(Math.max(activeBarWeight, parseFloat(e.target.value) || activeBarWeight))}
                  className="w-28 h-11 text-center bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-700 font-mono font-extrabold text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setWorkingWeight(prev => prev + (unit === 'lb' ? 10 : 5))}
                  className="w-10 h-11 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-r-lg font-bold font-mono text-base flex items-center justify-center text-slate-800 dark:text-slate-200"
                >
                  +
                </button>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(unit === 'lb' ? [135, 185, 225, 275, 315] : [60, 80, 100, 120, 140]).map(wt => (
                  <button
                    key={wt}
                    type="button"
                    onClick={() => setWorkingWeight(wt)}
                    className={`px-2.5 py-1.5 min-h-[36px] rounded-lg text-xs font-mono font-semibold transition-colors border ${
                      workingWeight === wt
                        ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 dark:border-emerald-400'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                    }`}
                  >
                    {wt} {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Barbell Type & Protocol Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <label className="text-slate-500 dark:text-slate-400 font-medium block mb-1">
                  Barbell Specification:
                </label>
                <select
                  value={barType}
                  onChange={(e) => setBarType(e.target.value as BarType)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 font-medium text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500 text-xs"
                >
                  <option value="olympic">Olympic Standard ({unit === 'lb' ? '45 lb' : '20 kg'})</option>
                  <option value="women">Women's / Tech Bar ({unit === 'lb' ? '35 lb' : '15 kg'})</option>
                  <option value="trap">Trap / Hex Bar ({unit === 'lb' ? '55 lb' : '25 kg'})</option>
                  <option value="short">EZ / Short Bar ({unit === 'lb' ? '25 lb' : '10 kg'})</option>
                  <option value="custom">Custom Bar Weight...</option>
                </select>
                {barType === 'custom' && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <input
                      type="number"
                      value={customBarWeight}
                      onChange={(e) => setCustomBarWeight(parseFloat(e.target.value) || 0)}
                      placeholder="Bar weight"
                      className="w-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-xs font-mono text-slate-900 dark:text-white"
                    />
                    <span className="text-slate-400 text-xs">{unit} bar weight</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-slate-500 dark:text-slate-400 font-medium block mb-1">
                  Sports Science Ramp Protocol:
                </label>
                <select
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value as ProtocolType)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 font-medium text-slate-900 dark:text-white focus:ring-1 focus:ring-emerald-500 text-xs"
                >
                  <option value="heavy-strength">Heavy Strength (5 Sets) · PAP Potentiated</option>
                  <option value="power-velocity">Power & Velocity (4 Sets) · Low Volume</option>
                  <option value="hypertrophy">Hypertrophy (4 Sets) · Muscle Priming</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Guided Mode Banner / Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  Gym Floor Guided Mode {isGuidedMode ? 'Active' : 'Available'}
                </div>
                <div className="text-[11px] text-slate-400">
                  Step-by-step plate loading with audible 3-2-1 timer beeps & set-ready chimes.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={handleTestSound}
                className="px-2.5 py-1.5 min-h-[36px] rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 transition-colors flex items-center gap-1 border border-slate-700"
                title="Test audio chime"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{soundTestTriggered ? 'Beeping...' : 'Test Audio'}</span>
              </button>

              <button
                onClick={() => {
                  setIsGuidedMode(!isGuidedMode);
                  if (!isGuidedMode) {
                    setCurrentStepIndex(0);
                    setIsTimerRunning(false);
                  }
                }}
                className={`px-3.5 py-1.5 min-h-[36px] rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm ${
                  isGuidedMode
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                }`}
              >
                <span>{isGuidedMode ? 'Exit Guided' : 'Start Guided Walkthrough'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Guided Mode Stage (If active) */}
          {isGuidedMode && currentGuidedStep && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border-2 border-emerald-500/60 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider">
                    Set {currentGuidedStep.stepNumber} of {rampSteps.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentGuidedStep.percentage > 0 ? `${currentGuidedStep.percentage}% Load` : 'Bar Only'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
                    disabled={currentStepIndex === 0}
                    className="p-1.5 min-h-[32px] min-w-[32px] rounded bg-slate-800 text-slate-300 disabled:opacity-30 text-xs font-mono"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleSkipOrAdvance}
                    disabled={currentStepIndex >= rampSteps.length - 1}
                    className="p-1.5 min-h-[32px] min-w-[32px] rounded bg-slate-800 text-slate-300 disabled:opacity-30 text-xs font-mono"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Big High-Contrast Gym Floor Display */}
              <div className="bg-slate-950/80 rounded-xl p-4 sm:p-5 border border-slate-800 text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400 tracking-tight">
                  {currentGuidedStep.targetWeight} <span className="text-xl sm:text-2xl text-slate-300">{unit}</span>
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-200">
                  Target: {currentGuidedStep.reps} reps
                </div>
                <div className="text-xs text-slate-400">
                  {currentGuidedStep.purpose}
                </div>

                {/* Per-Side Plates Visual Display */}
                <div className="pt-3 border-t border-slate-800 flex flex-col items-center gap-2">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    Load on Each Barbell Sleeve:
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {currentGuidedStep.platesPerSide.length === 0 ? (
                      <span className="px-3 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono font-bold">
                        Empty Bar ({activeBarWeight} {unit})
                      </span>
                    ) : (
                      currentGuidedStep.platesPerSide.map((plate, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-1">
                          {Array.from({ length: plate.count }).map((_, cIdx) => (
                            <span
                              key={cIdx}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-black shadow-md ${plate.color}`}
                            >
                              {plate.weight} {unit}
                            </span>
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Live Rest Timer Controls with Acoustic Alerts */}
              <div className="bg-slate-800/80 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-emerald-400 text-lg tabular-nums">
                    {restSecondsRemaining}s
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isTimerRunning ? 'Rest Interval Counting Down' : 'Rest Between Warm-Up Sets'}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Audible beep pings at 3-2-1s · Set ready chime at 0s
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-center">
                  {!isTimerRunning ? (
                    <>
                      <button
                        onClick={() => handleStartRestTimer(45)}
                        className="px-2.5 py-1.5 min-h-[36px] bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-mono font-medium text-slate-200"
                      >
                        45s
                      </button>
                      <button
                        onClick={() => handleStartRestTimer(60)}
                        className="px-3 py-1.5 min-h-[36px] bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-mono font-bold text-white flex items-center gap-1 shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start 60s Rest</span>
                      </button>
                      <button
                        onClick={() => handleStartRestTimer(90)}
                        className="px-2.5 py-1.5 min-h-[36px] bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-mono font-medium text-slate-200"
                      >
                        90s
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setRestSecondsRemaining(prev => prev + 15)}
                        className="px-2 py-1.5 min-h-[36px] bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-mono text-slate-200"
                      >
                        +15s
                      </button>
                      <button
                        onClick={() => setIsTimerRunning(false)}
                        className="px-3 py-1.5 min-h-[36px] bg-amber-600 hover:bg-amber-500 rounded-lg text-xs font-mono font-bold text-white flex items-center gap-1"
                      >
                        <Pause className="w-3 h-3 fill-current" />
                        <span>Pause</span>
                      </button>
                      <button
                        onClick={handleSkipOrAdvance}
                        className="px-3 py-1.5 min-h-[36px] bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-mono text-slate-200 flex items-center gap-1"
                      >
                        <span>Ready (Skip)</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Full Protocol Plate Math Breakdown Table */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Complete Ramp-Up Ladder & Plate Math
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Bar: {activeBarWeight} {unit}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 px-3 w-14">Set</th>
                    <th className="py-2.5 px-3 w-28">Weight</th>
                    <th className="py-2.5 px-3 w-28">Reps</th>
                    <th className="py-2.5 px-3">Plates Per Side (Sleeve)</th>
                    <th className="py-2.5 px-3 hidden md:table-cell">Neuro Objective</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {rampSteps.map((step) => {
                    const isWorking = step.stepNumber === rampSteps.length;
                    const isSelectedInGuided = isGuidedMode && currentStepIndex === step.stepNumber - 1;

                    return (
                      <tr 
                        key={step.stepNumber}
                        className={`transition-colors ${
                          isSelectedInGuided
                            ? 'bg-emerald-50 dark:bg-emerald-950/30'
                            : isWorking
                            ? 'bg-slate-50/80 dark:bg-slate-800/40 font-bold'
                            : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/20'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono">
                          <span className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                            isWorking 
                              ? 'bg-emerald-600 text-white font-bold' 
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                          }`}>
                            {step.stepNumber}
                          </span>
                        </td>

                        <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                          <span>{step.targetWeight} {unit}</span>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            {step.percentage > 0 ? `${step.percentage}%` : 'Bar only'}
                          </span>
                        </td>

                        <td className="py-3 px-3 font-mono text-slate-800 dark:text-slate-200">
                          {step.reps}
                        </td>

                        <td className="py-3 px-3">
                          {step.platesPerSide.length === 0 ? (
                            <span className="text-slate-400 font-mono text-[11px] italic">
                              Empty Bar
                            </span>
                          ) : (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {step.platesPerSide.map((plate, pIdx) => (
                                <div key={pIdx} className="flex items-center gap-0.5">
                                  {Array.from({ length: plate.count }).map((_, cIdx) => (
                                    <span
                                      key={cIdx}
                                      className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold shadow-xs ${plate.color}`}
                                      title={`${plate.count}x ${plate.weight}${unit} plate`}
                                    >
                                      {plate.weight}
                                    </span>
                                  ))}
                                </div>
                              ))}
                              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline ml-1">
                                (per side)
                              </span>
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 text-slate-600 dark:text-slate-400 text-xs hidden md:table-cell">
                          {step.purpose}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Research Insight */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-500" />
              <span>Sports Science Rationale (Post-Activation Potentiation)</span>
            </div>
            <p>
              Ramp-up sets should never induce metabolic exhaustion (high lactate). Keeping warm-up reps low (5 $\rightarrow$ 3 $\rightarrow$ 1-2) with maximal bar speed excites high-threshold Type IIx motor units and potentiates the central nervous system without draining ATP-CP stores.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border-t border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>Voice cues</span>
            </label>
            <span>·</span>
            <span>Audible tone alerts {soundEnabled ? 'ON' : 'OFF'}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 min-h-[40px] bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
            >
              Close
            </button>

            {onApplyToSession && (
              <button
                onClick={handleApplyToSessionClick}
                className="flex-1 sm:flex-none px-4 py-2 min-h-[40px] bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Log {workingWeight} {unit} in Session</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
