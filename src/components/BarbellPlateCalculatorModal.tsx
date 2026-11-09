import React, { useState, useMemo, useCallback } from 'react';
import { 
  X, 
  Dumbbell, 
  RotateCcw, 
  Check, 
  Flame, 
  Layers, 
  Sparkles, 
  SlidersHorizontal, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  Info
} from 'lucide-react';

export type PlateUnit = 'lb' | 'kg';
export type BarType = 'olympic' | 'women' | 'trap' | 'short' | 'custom';
export type CollarType = 'none' | 'spring' | 'competition';

export interface BarbellPlateCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName?: string;
  initialWeight?: number;
  onApplyToSession?: (weightStr: string) => void;
  onOpenWarmUpRamp?: (exerciseName: string, weight: number) => void;
}

interface PlateDefinition {
  weight: number;
  colorClass: string;
  borderColorClass: string;
  textColorClass: string;
  label: string;
  heightPct: number; // For realistic visual relative diameter
  widthPx: number;   // Relative thickness of the plate
  bgHex: string;
}

const BAR_SPECS: Record<PlateUnit, Record<BarType, { name: string; weight: number }>> = {
  lb: {
    olympic: { name: 'Olympic Barbell (45 lb)', weight: 45 },
    women: { name: "Women's / Tech Bar (35 lb)", weight: 35 },
    trap: { name: 'Trap / Hex Bar (55 lb)', weight: 55 },
    short: { name: 'Short / EZ Bar (25 lb)', weight: 25 },
    custom: { name: 'Custom Barbell', weight: 45 }
  },
  kg: {
    olympic: { name: 'Olympic Barbell (20 kg)', weight: 20 },
    women: { name: "Women's / Tech Bar (15 kg)", weight: 15 },
    trap: { name: 'Trap / Hex Bar (25 kg)', weight: 25 },
    short: { name: 'Short / EZ Bar (10 kg)', weight: 10 },
    custom: { name: 'Custom Barbell', weight: 20 }
  }
};

const COLLAR_WEIGHTS: Record<PlateUnit, Record<CollarType, { name: string; weight: number }>> = {
  lb: {
    none: { name: 'None (0 lb)', weight: 0 },
    spring: { name: 'Spring Clips (1 lb)', weight: 1 },
    competition: { name: 'Comp Collars (5 lb / pair)', weight: 5 }
  },
  kg: {
    none: { name: 'None (0 kg)', weight: 0 },
    spring: { name: 'Spring Clips (0.5 kg)', weight: 0.5 },
    competition: { name: 'Comp Collars (2.5 kg / pair)', weight: 2.5 }
  }
};

const PLATES_LB: PlateDefinition[] = [
  { weight: 45, label: '45', colorClass: 'bg-blue-600', borderColorClass: 'border-blue-400', textColorClass: 'text-white', heightPct: 100, widthPx: 26, bgHex: '#2563eb' },
  { weight: 35, label: '35', colorClass: 'bg-amber-500', borderColorClass: 'border-amber-300', textColorClass: 'text-slate-950', heightPct: 88, widthPx: 22, bgHex: '#f59e0b' },
  { weight: 25, label: '25', colorClass: 'bg-emerald-600', borderColorClass: 'border-emerald-400', textColorClass: 'text-white', heightPct: 76, widthPx: 18, bgHex: '#059669' },
  { weight: 10, label: '10', colorClass: 'bg-slate-700', borderColorClass: 'border-slate-500', textColorClass: 'text-white', heightPct: 62, widthPx: 14, bgHex: '#334155' },
  { weight: 5, label: '5', colorClass: 'bg-slate-400', borderColorClass: 'border-slate-300', textColorClass: 'text-slate-900', heightPct: 50, widthPx: 10, bgHex: '#94a3b8' },
  { weight: 2.5, label: '2.5', colorClass: 'bg-slate-300', borderColorClass: 'border-slate-200', textColorClass: 'text-slate-900', heightPct: 40, widthPx: 8, bgHex: '#cbd5e1' }
];

const PLATES_KG: PlateDefinition[] = [
  { weight: 25, label: '25', colorClass: 'bg-red-600', borderColorClass: 'border-red-400', textColorClass: 'text-white', heightPct: 100, widthPx: 26, bgHex: '#dc2626' },
  { weight: 20, label: '20', colorClass: 'bg-blue-600', borderColorClass: 'border-blue-400', textColorClass: 'text-white', heightPct: 92, widthPx: 24, bgHex: '#2563eb' },
  { weight: 15, label: '15', colorClass: 'bg-amber-500', borderColorClass: 'border-amber-300', textColorClass: 'text-slate-950', heightPct: 82, widthPx: 20, bgHex: '#f59e0b' },
  { weight: 10, label: '10', colorClass: 'bg-emerald-600', borderColorClass: 'border-emerald-400', textColorClass: 'text-white', heightPct: 70, widthPx: 16, bgHex: '#059669' },
  { weight: 5, label: '5', colorClass: 'bg-slate-600', borderColorClass: 'border-slate-400', textColorClass: 'text-white', heightPct: 56, widthPx: 12, bgHex: '#475569' },
  { weight: 2.5, label: '2.5', colorClass: 'bg-slate-400', borderColorClass: 'border-slate-300', textColorClass: 'text-slate-900', heightPct: 45, widthPx: 9, bgHex: '#94a3b8' },
  { weight: 1.25, label: '1.25', colorClass: 'bg-slate-300', borderColorClass: 'border-slate-200', textColorClass: 'text-slate-900', heightPct: 36, widthPx: 7, bgHex: '#cbd5e1' }
];

const QUICK_PRESETS_LB = [135, 185, 225, 275, 315, 365, 405, 495];
const QUICK_PRESETS_KG = [60, 80, 100, 120, 140, 160, 180, 220];

export const BarbellPlateCalculatorModal: React.FC<BarbellPlateCalculatorModalProps> = ({
  isOpen,
  onClose,
  exerciseName,
  initialWeight,
  onApplyToSession,
  onOpenWarmUpRamp
}) => {
  // ALL HOOKS CALLED AT TOP LEVEL BEFORE ANY RETURN
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [unit, setUnit] = useState<PlateUnit>('lb');
  const [barType, setBarType] = useState<BarType>('olympic');
  const [customBarWeight, setCustomBarWeight] = useState<number>(45);
  const [collarType, setCollarType] = useState<CollarType>('none');
  
  // Forward mode target weight
  const [targetWeight, setTargetWeight] = useState<number>(() => {
    if (initialWeight && initialWeight > 0) return initialWeight;
    return 225;
  });

  // Reverse mode: array of plate weights loaded on one sleeve
  // (In symmetric mode, each entry represents 1 plate on the left AND 1 on the right)
  const [reversePlatesPerSleeve, setReversePlatesPerSleeve] = useState<number[]>([45, 45]);
  const [isSymmetricReverse, setIsSymmetricReverse] = useState<boolean>(true);

  // Quick applied feedback
  const [appliedNotice, setAppliedNotice] = useState(false);

  // Active bar weight
  const barWeight = useMemo(() => {
    if (barType === 'custom') return customBarWeight;
    return BAR_SPECS[unit][barType]?.weight || 45;
  }, [barType, customBarWeight, unit]);

  // Active collar weight
  const collarWeight = useMemo(() => {
    return COLLAR_WEIGHTS[unit][collarType]?.weight || 0;
  }, [collarType, unit]);

  // Plate catalogue based on active unit
  const plateCatalogue = useMemo(() => {
    return unit === 'lb' ? PLATES_LB : PLATES_KG;
  }, [unit]);

  // Forward Mode Calculation: computes plates needed per side
  const forwardCalculation = useMemo(() => {
    const totalWithoutBar = Math.max(0, targetWeight - barWeight - collarWeight);
    const perSideNeeded = totalWithoutBar / 2;

    let remaining = perSideNeeded;
    const platesPerSide: { def: PlateDefinition; count: number }[] = [];

    for (const def of plateCatalogue) {
      if (remaining <= 0.001) break;
      const count = Math.floor(remaining / def.weight);
      if (count > 0) {
        platesPerSide.push({ def, count });
        remaining = Math.round((remaining - count * def.weight) * 100) / 100;
      }
    }

    const loadedPlatesWeightPerSide = platesPerSide.reduce(
      (sum, item) => sum + item.def.weight * item.count,
      0
    );
    const achievableTotal = barWeight + collarWeight + (loadedPlatesWeightPerSide * 2);
    const remainder = Math.round((targetWeight - achievableTotal) * 100) / 100;

    // Flatten to ordered list for visual display (inside collar to outer sleeve)
    const visualPlateList: PlateDefinition[] = [];
    platesPerSide.forEach(item => {
      for (let i = 0; i < item.count; i++) {
        visualPlateList.push(item.def);
      }
    });

    return {
      platesPerSide,
      visualPlateList,
      loadedPlatesWeightPerSide,
      achievableTotal,
      remainder
    };
  }, [targetWeight, barWeight, collarWeight, plateCatalogue]);

  // Reverse Mode Calculation: computes total from loaded plates
  const reverseCalculation = useMemo(() => {
    const perSleevePlateSum = reversePlatesPerSleeve.reduce((sum, w) => sum + w, 0);
    const totalPlateWeight = isSymmetricReverse ? perSleevePlateSum * 2 : perSleevePlateSum;
    const grandTotal = barWeight + collarWeight + totalPlateWeight;

    // Map sleeve plates to definitions
    const visualList = reversePlatesPerSleeve
      .map(w => plateCatalogue.find(p => p.weight === w))
      .filter((p): p is PlateDefinition => !!p);

    // Grouping for summary breakdown
    const countsMap = new Map<number, number>();
    reversePlatesPerSleeve.forEach(w => {
      countsMap.set(w, (countsMap.get(w) || 0) + 1);
    });

    const breakdown = Array.from(countsMap.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([weight, count]) => {
        const def = plateCatalogue.find(p => p.weight === weight);
        return { weight, count, def };
      });

    return {
      perSleevePlateSum,
      totalPlateWeight,
      grandTotal,
      visualList,
      breakdown
    };
  }, [reversePlatesPerSleeve, isSymmetricReverse, barWeight, collarWeight, plateCatalogue]);

  // Handlers
  const handleAddReversePlate = useCallback((weight: number) => {
    setReversePlatesPerSleeve(prev => [...prev, weight]);
  }, []);

  const handleRemoveOuterPlate = useCallback(() => {
    setReversePlatesPerSleeve(prev => prev.slice(0, -1));
  }, []);

  const handleClearBar = useCallback(() => {
    setReversePlatesPerSleeve([]);
  }, []);

  const handleApplyWeight = useCallback(() => {
    const finalWeight = mode === 'forward' 
      ? forwardCalculation.achievableTotal 
      : reverseCalculation.grandTotal;
    
    if (onApplyToSession) {
      onApplyToSession(`${finalWeight} ${unit}`);
      setAppliedNotice(true);
      setTimeout(() => setAppliedNotice(false), 2000);
    }
  }, [mode, forwardCalculation.achievableTotal, reverseCalculation.grandTotal, onApplyToSession, unit]);

  const handleOpenRamp = useCallback(() => {
    const weightToRamp = mode === 'forward' 
      ? forwardCalculation.achievableTotal 
      : reverseCalculation.grandTotal;

    if (onOpenWarmUpRamp) {
      onClose();
      onOpenWarmUpRamp(exerciseName || 'Main Compound Lift', weightToRamp);
    }
  }, [mode, forwardCalculation.achievableTotal, reverseCalculation.grandTotal, onOpenWarmUpRamp, exerciseName, onClose]);

  // CONDITIONAL RETURN OCCURS AFTER ALL HOOKS
  if (!isOpen) return null;

  const currentDisplayTotal = mode === 'forward' 
    ? forwardCalculation.achievableTotal 
    : reverseCalculation.grandTotal;

  const activeVisualPlates = mode === 'forward' 
    ? forwardCalculation.visualPlateList 
    : reverseCalculation.visualList;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="plate-calc-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="plate-calc-title" className="text-sm font-bold text-slate-900 dark:text-white">
                  Barbell Plate Calculator
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                  Visual Bar
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {exerciseName ? `Calibrated for: ${exerciseName}` : 'Sleeve graphics & reverse barbell math'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Unit Switcher */}
            <div className="flex rounded-lg bg-slate-200 dark:bg-slate-800 p-0.5 text-xs font-bold font-mono">
              <button
                type="button"
                onClick={() => setUnit('lb')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  unit === 'lb'
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                LB
              </button>
              <button
                type="button"
                onClick={() => setUnit('kg')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  unit === 'kg'
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                KG
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close plate calculator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* Mode Tabs: Target -> Plates VS What's On The Bar? */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setMode('forward')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'forward'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Target Weight &rarr; Plates</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('reverse')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'reverse'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5 text-emerald-500" />
              <span>What's on the Bar? (Tap)</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* VISUAL BARBELL SLEEVE GRAPHIC (Interactive & Dynamic)     */}
          {/* ========================================================= */}
          <div className="bg-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
                Sleeve Graphic (Left or Right)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-md font-bold">
                  {barWeight} {unit} Bar
                </span>
                {collarWeight > 0 && (
                  <span className="text-[11px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/80 px-2 py-0.5 rounded-md">
                    +{collarWeight} {unit} Collars
                  </span>
                )}
              </div>
            </div>

            {/* Realistic Barbell Graphic Render */}
            <div className="relative py-4 px-2 bg-slate-900/90 rounded-xl border border-slate-800/80 overflow-x-auto flex items-center justify-center min-h-[140px]">
              <div className="relative flex items-center min-w-[320px] max-w-full">
                
                {/* 1. Barbell Shaft (Knurled center section) */}
                <div 
                  className="h-5 w-20 sm:w-28 rounded-l bg-gradient-to-r from-slate-600 via-slate-400 to-slate-500 shadow-inner relative flex items-center justify-center border-y border-slate-400/30"
                  title="Barbell Grip Shaft"
                >
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]" />
                  <span className="text-[9px] font-mono font-bold text-slate-900 select-none">
                    {barWeight}{unit}
                  </span>
                </div>

                {/* 2. Inner Barbell Collar (Thick stopper) */}
                <div 
                  className="h-16 w-5 rounded bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 shadow-lg border border-slate-300 relative z-10 shrink-0"
                  title="Barbell Inner Collar"
                />

                {/* 3. The Sleeve (Loading pin) + Plates */}
                <div className="relative flex items-center h-16 min-w-[170px] sm:min-w-[220px] bg-gradient-to-b from-slate-500 via-slate-300 to-slate-600 rounded-r border-y border-slate-400 px-0.5">
                  {/* Loaded Plates Stack (Inside -> Outside) */}
                  <div className="flex items-center gap-0.5 z-10 pl-0.5">
                    {activeVisualPlates.length === 0 ? (
                      <div className="text-[11px] font-mono text-slate-700 px-3 italic select-none font-medium">
                        Empty Sleeve
                      </div>
                    ) : (
                      activeVisualPlates.map((plate, idx) => (
                        <div
                          key={idx}
                          style={{
                            height: `${Math.max(34, (plate.heightPct / 100) * 80)}px`,
                            width: `${plate.widthPx}px`,
                            backgroundColor: plate.bgHex
                          }}
                          onClick={() => {
                            if (mode === 'reverse') {
                              // Tapping a plate in reverse mode removes that specific plate
                              setReversePlatesPerSleeve(prev => prev.filter((_, i) => i !== idx));
                            }
                          }}
                          className={`rounded-sm shadow-md flex flex-col items-center justify-center text-center transition-all cursor-pointer hover:brightness-110 border border-white/25 select-none relative group shrink-0`}
                          title={`Click to remove ${plate.weight} ${unit}`}
                        >
                          <span className={`text-[9px] sm:text-[10px] font-black font-mono leading-none ${plate.textColorClass} -rotate-90 select-none`}>
                            {plate.label}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* 4. Spring / Comp Collar Clamp at outer edge */}
                  {collarType !== 'none' && activeVisualPlates.length > 0 && (
                    <div 
                      className="h-10 w-3 rounded-sm bg-gradient-to-r from-blue-400 to-blue-600 border border-blue-200 shadow-md ml-0.5 z-10 shrink-0" 
                      title={`Collar Clamp (${collarWeight} ${unit})`}
                    />
                  )}

                  {/* Empty Sleeve Space Guide */}
                  <div className="flex-1 h-5 min-w-[20px]" />
                </div>
              </div>
            </div>

            {/* Big High-Contrast Total Weight Callout */}
            <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                  Total Barbell Load:
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight flex items-baseline justify-center sm:justify-start gap-1.5">
                  <span>{currentDisplayTotal}</span>
                  <span className="text-lg text-slate-300 font-bold">{unit}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono space-y-0.5">
                <div>
                  <span className="text-slate-300">Each Sleeve:</span>{' '}
                  <span className="text-white font-bold">
                    {mode === 'forward' 
                      ? `${forwardCalculation.loadedPlatesWeightPerSide} ${unit}`
                      : `${reverseCalculation.perSleevePlateSum} ${unit}`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-300">Plates Total:</span>{' '}
                  <span className="text-white font-bold">
                    {mode === 'forward' 
                      ? `${forwardCalculation.loadedPlatesWeightPerSide * 2} ${unit}`
                      : `${reverseCalculation.totalPlateWeight} ${unit}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Remainder warning if odd number entered */}
            {mode === 'forward' && Math.abs(forwardCalculation.remainder) > 0.01 && (
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>
                  Target {targetWeight} {unit} has a {forwardCalculation.remainder} {unit} remainder. Achievable load shown is {forwardCalculation.achievableTotal} {unit}.
                </span>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* MODE 1: FORWARD (Target Weight Input & Fast Steppers)       */}
          {/* ========================================================= */}
          {mode === 'forward' && (
            <div className="space-y-4">
              {/* Target Weight Input Controls */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="target-weight-input" className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    Enter Desired Barbell Target
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Includes bar + plates
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetWeight(prev => Math.max(barWeight, prev - (unit === 'lb' ? 10 : 5)))}
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center font-bold font-mono text-sm"
                    aria-label="Decrease 10 lbs"
                  >
                    -{unit === 'lb' ? 10 : 5}
                  </button>

                  <div className="relative flex-1">
                    <input
                      id="target-weight-input"
                      type="number"
                      step={unit === 'lb' ? 5 : 2.5}
                      min={barWeight}
                      max={1200}
                      value={targetWeight || ''}
                      onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                      className="w-full text-center text-2xl font-extrabold font-mono text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold font-mono text-slate-400">
                      {unit}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTargetWeight(prev => prev + (unit === 'lb' ? 10 : 5))}
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center font-bold font-mono text-sm"
                    aria-label="Increase 10 lbs"
                  >
                    +{unit === 'lb' ? 10 : 5}
                  </button>
                </div>

                {/* Quick Milestone Chips (135, 185, 225, 315, etc.) */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold">
                    Quick Milestones ({unit}):
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(unit === 'lb' ? QUICK_PRESETS_LB : QUICK_PRESETS_KG).map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setTargetWeight(preset)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                          targetWeight === preset
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Exact Plate Breakdown List */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    Load Each Sleeve With:
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {forwardCalculation.platesPerSide.length === 0 ? 'Empty Bar' : `${forwardCalculation.loadedPlatesWeightPerSide} ${unit} / side`}
                  </span>
                </div>

                {forwardCalculation.platesPerSide.length === 0 ? (
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-mono text-center border border-slate-200 dark:border-slate-700">
                    Just the empty barbell ({barWeight} {unit})
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {forwardCalculation.platesPerSide.map((item, idx) => (
                      <div 
                        key={idx}
                        className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            style={{ backgroundColor: item.def.bgHex }}
                            className="w-3.5 h-3.5 rounded-full inline-block shadow-2xs border border-white/20"
                          />
                          <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                            {item.def.weight} {unit}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400">
                          &times; {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* MODE 2: REVERSE (What's on the Bar? / Tap to Stack)       */}
          {/* ========================================================= */}
          {mode === 'reverse' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Tap Plates to Load Onto Bar
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Walk up to a loaded bar and tap what you see.
                    </p>
                  </div>

                  {/* Symmetry Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsSymmetricReverse(!isSymmetricReverse)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors border ${
                      isSymmetricReverse
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                    }`}
                    title="Toggle both sleeves vs single sleeve calculation"
                  >
                    {isSymmetricReverse ? 'Symmetric (Both Sides)' : 'Single Sleeve Only'}
                  </button>
                </div>

                {/* Tactile Plate Buttons */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {plateCatalogue.map((plate) => (
                    <button
                      key={plate.weight}
                      type="button"
                      onClick={() => handleAddReversePlate(plate.weight)}
                      style={{ backgroundColor: plate.bgHex }}
                      className={`p-3 rounded-xl shadow-sm text-center flex flex-col items-center justify-center min-h-[56px] transition-transform active:scale-95 hover:brightness-110 border border-white/20`}
                    >
                      <span className={`text-base font-extrabold font-mono leading-none ${plate.textColorClass}`}>
                        +{plate.label}
                      </span>
                      <span className={`text-[10px] font-mono opacity-80 ${plate.textColorClass}`}>
                        {unit}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Undo / Clear Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={handleRemoveOuterPlate}
                    disabled={reversePlatesPerSleeve.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-medium flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Undo Outer Plate</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearBar}
                    disabled={reversePlatesPerSleeve.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 text-xs font-medium flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear to Empty Bar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BARBELL & HARDWARE CONFIGURATION ACCORDION                */}
          {/* ========================================================= */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>Barbell Type &amp; Hardware</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Barbell Model Selector */}
              <div>
                <label htmlFor="bar-type-select" className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Barbell Model
                </label>
                <select
                  id="bar-type-select"
                  value={barType}
                  onChange={(e) => setBarType(e.target.value as BarType)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="olympic">{BAR_SPECS[unit].olympic.name}</option>
                  <option value="women">{BAR_SPECS[unit].women.name}</option>
                  <option value="trap">{BAR_SPECS[unit].trap.name}</option>
                  <option value="short">{BAR_SPECS[unit].short.name}</option>
                  <option value="custom">Custom Barbell Weight...</option>
                </select>
              </div>

              {/* Collars Selector */}
              <div>
                <label htmlFor="collar-type-select" className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Collar Clamp Weight
                </label>
                <select
                  id="collar-type-select"
                  value={collarType}
                  onChange={(e) => setCollarType(e.target.value as CollarType)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="none">{COLLAR_WEIGHTS[unit].none.name}</option>
                  <option value="spring">{COLLAR_WEIGHTS[unit].spring.name}</option>
                  <option value="competition">{COLLAR_WEIGHTS[unit].competition.name}</option>
                </select>
              </div>
            </div>

            {barType === 'custom' && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <label htmlFor="custom-bar-weight" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Custom Bar Weight ({unit}):
                </label>
                <input
                  id="custom-bar-weight"
                  type="number"
                  value={customBarWeight}
                  onChange={(e) => setCustomBarWeight(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs font-mono font-bold"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenWarmUpRamp && (
              <button
                type="button"
                onClick={handleOpenRamp}
                className="flex-1 sm:flex-initial px-3.5 py-2 min-h-[44px] rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                title="Open full warm-up ramp protocol with this weight"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Build Warm-Up Ramp</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onApplyToSession && (
              <button
                type="button"
                onClick={handleApplyWeight}
                className="flex-1 sm:flex-initial px-4 py-2 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
              >
                {appliedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Applied to Session!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Apply {currentDisplayTotal} {unit} to Session</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 min-h-[44px] rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
