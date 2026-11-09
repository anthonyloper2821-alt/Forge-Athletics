# Implementation Plan: Everyday Athlete 3-Day Split Exercise Variation

Provide comprehensive, evidence-based exercise variation for the **Everyday Athlete** 3-day split. Eliminate repetitive exercises across days by establishing a dedicated 3-day full-body rotation matrix with distinct biomechanical vectors, equipment types (barbell, dumbbells, kettlebells, cables, sleds), and joint longevity armor.

---

## User Preferences & Clarifications
- **Split Structure**: Full-body rotation with distinct movement patterns each day.
- **Equipment Scope**: Mixed barbell, dumbbells, kettlebells, cables, and bodyweight/sleds.
- **Progression Cadence**: Keep primary compound anchors steady for 2 weeks (to allow double progressive overload), while rotating accessory angles, joint prehab, and core exercises.

---

## Proposed Changes

### 1. Dedicated Everyday Athlete 3-Day Split Matrix in `src/utils/adaptiveFrequency.ts`
Currently, the 3-day split generator uses a generic slice across days 1, 2, and 3 which causes repeated movements (e.g. rows or presses duplicated on consecutive days). We will introduce a dedicated, specialized builder for `sportId === 'functional'` that builds three completely distinct full-body sessions:

#### Day 1: Ground-Up Bilateral Squat & Horizontal Push/Pull + Anterior Core
- **A (Main Squat Compound)**: Goblet Squat with 3-second eccentric (or Barbell Front Squat)
- **B1 (Horizontal Press)**: Incline Dumbbell Bench Press (Neutral/Pronated)
- **B2 (Horizontal Pull)**: Chest-Supported Dumbbell Seal Row or Inverted Row
- **C1 (Hamstring & Posterior Knee Armor)**: Swiss Ball Leg Curl or Nordic Hamstring Lowering
- **C2 (Anti-Extension Core Stiffness)**: Ab Wheel Rollout or Hollow Body Hold
- **D (Grip & Trunk Carry)**: Heavy Dumbbell/Kettlebell Farmer's Walk

#### Day 2: Posterior Chain Hinge & Vertical Pull/Press + Scapular Armor
- **A (Main Hinge Compound)**: Trap Bar Deadlift (High Handles) or Barbell Romanian Deadlift
- **B1 (Vertical Pull)**: Neutral-Grip Pull-Up or Lat Pulldown
- **B2 (Vertical / Angled Press)**: Half-Kneeling Landmine Overhead Press or Kettlebell Strict Press
- **C1 (Rotator Cuff & Posture Armor)**: Cable Face Pull with External Rotation
- **C2 (Anti-Lateral Flexion Core)**: Suitcase Carry or Offset Kettlebell March
- **D (Spine Hygiene & Stabilization)**: Dr. Stuart McGill Big 3 (Bird-Dog & Side Bridge)

#### Day 3: Unilateral Power, Multi-Planar Rotation & Longevity Engine
- **A (Single-Leg Knee Dominant)**: Rear-Foot Elevated Split Squat (Bulgarian) or Deficit Reverse Lunge
- **B1 (Single-Leg Hip Dominant)**: Single-Leg Landmine RDL or Kickstand Dumbbell RDL
- **B2 (Multi-Planar / Anti-Rotation)**: Standing Cable Pallof Press with Press-Out or Landmine Rotations
- **C1 (Foot/Ankle/Knee Inoculation)**: Poliquin Step-Ups & Tibialis Wall Raises
- **C2 (Scapular Postural Armor)**: Prone Incline Y-T-W Dumbbell Raises
- **D (Longevity Work Capacity)**: Backward Sled Drag or Assault Bike Aerobic Conditioning Flush

---

### 2. Multi-Block Variation Across the 8-Week Program
Ensure the 3-day generator accounts for the athlete's progression across Block 1 (Integrity & Armor), Block 2 (Postural Density), Block 3 (Power-Endurance), and Block 4 (Peak Capacity), ensuring:
- Block 1 (Weeks 1-2): Movement tempo control (3-second eccentrics), joint armor, high-yield density.
- Block 2 (Weeks 3-4): Progressive load increase, explosive hip drive, heavy carries.
- Block 3 (Weeks 5-6): Contrast power pairs, speed-strength, work capacity.
- Block 4 (Weeks 7-8): Peak strength testing, functional capacity benchmarks.

---

### 3. Equipment Alternatives & Swaps Integration
Verify that every newly introduced exercise in the 3-day split has valid fallback data, exercise guide modal support, and equipment swap capabilities in `src/data/exerciseCatalog.ts`.

---

## Verification Plan

### Automated Checks
- Run `compile_applet` to ensure full TypeScript compilation and type safety across `WorkoutDay` and `WorkoutExerciseItem`.
- Run `lint_applet` (`tsc --noEmit`) to verify zero type mismatches or missing properties.

### Manual Verification in App
- Toggle the Everyday Athlete program to **3 Days / Wk** frequency.
- Inspect Day 1, Day 2, and Day 3 in the schedule drawer and workout browser:
  - Confirm Day 1, Day 2, and Day 3 have **100% unique exercises** with zero duplication.
  - Confirm proper superset grouping (A, B1/B2, C1/C2, D) and rest periods.
- Open **Apple Watch Mode** to verify that superset looping (B1 $\rightarrow$ B2 $\rightarrow$ Rest $\rightarrow$ Loop) functions seamlessly on the new exercise layouts.
