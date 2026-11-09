# Forge Athletics

> **Sports Science & Everyday Longevity Performance Web Application**  
> Built with React 19, TypeScript, Vite, Tailwind CSS, and HTML5 Web APIs.

---

## 📍 Where the Code Lives (Quick Directory Guide)

All application source code is organized cleanly within the `/src` directory:

```
/ (Workspace Root)
├── index.html                   # HTML entry point, SEO metadata & web fonts
├── package.json                 # Dependencies & build scripts (Vite, Tailwind, etc.)
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
└── src/
    ├── main.tsx                 # React root renderer
    ├── App.tsx                  # Master application orchestrator & modal coordinator
    │
    ├── components/              # User Interface & Gym Floor Components
    │   ├── SimpleTodayView.tsx       # 1-Tap Home Hub for Simple Mode (zero clutter)
    │   ├── SimpleWorkoutLogger.tsx   # Tactile gym floor logger with custom resistance
    │   ├── ProfileSwitcherModal.tsx  # Dual Profile Switcher (Anthony vs Sarah)
    │   ├── WorkoutSessionView.tsx    # Advanced In-Gym floor logger & volume tracker
    │   ├── WorkoutBrowser.tsx        # Periodized block & weekly workout browser
    │   ├── SportHeader.tsx           # Responsive header, profile pill & navigation
    │   ├── MobileBottomNav.tsx       # Mobile 3-column navigation bar
    │   ├── FocusModeCard.tsx         # Single-movement distraction-free focus view
    │   ├── PlateCalculatorModal.tsx  # Barbell plate math (45, 35, 25, 10, 5, 2.5 lb)
    │   ├── WarmUpCalculatorModal.tsx # Scientific 5-step warmup set ramp calculator
    │   ├── ExerciseGuideModal.tsx    # Movement cues, anatomy & regression guides
    │   ├── SwapExerciseModal.tsx     # 1-Tap equipment substitution engine
    │   └── WorkoutPrintDownloadModal.tsx # Clean print & PDF export generator
    │
    ├── data/                    # Sports Science Curricula & Programs
    │   ├── sportsOverview.ts         # Sport definitions (Everyday, Boxing, Rugby, etc.)
    │   ├── positionSpecializations.ts# Position profiles (Linemen, Backs, Guards, etc.)
    │   ├── exerciseDatabase.ts       # 70+ compound movements with video/cues/regressions
    │   └── programs/                 # Periodized 8-week block blueprints
    │       ├── functional.ts         # Everyday Athlete / Longevity & joint armor
    │       ├── boxing.ts             # Alactic-aerobic rotational power
    │       ├── rugby.ts              # Collision armor & repeat sprint ability
    │       ├── football.ts           # Trench power, burst & cervical neck armor
    │       ├── soccer.ts             # Nordic hamstring & aerobic endurance
    │       └── basketball.ts         # Max vertical leap & patellar tendon armor
    │
    ├── hooks/                   # State Management & Local Storage
    │   ├── useWorkoutStore.ts        # Master state hook with dual-profile persistence
    │   └── useRestTimer.ts           # Rest interval countdown timer
    │
    ├── types/                   # TypeScript Interfaces & Models
    │   ├── sport.ts                  # Movement, workout day, phase, and logging types
    │   └── profile.ts                # Dual profile schemas & experience mode types
    │
    └── utils/                   # Business Logic & External Integrations
        ├── nutripulseSync.ts         # BroadcastChannel API connecting to NutriPulse
        ├── adaptiveFrequency.ts      # 2-day, 3-day, 4-day, 5-day adaptive splits
        ├── performanceMemory.ts      # Previous set weight memory & progression
        ├── plateMath.ts              # Barbell collar & disc calculation logic
        ├── printWorkout.ts           # Print stylesheet & ink-saving clean PDF layout
        └── workoutExport.ts          # Bevel & CSV export formatting
```

---

## ⚡ Core Features & User Workflows

### 1. Dual Profiles & "Simple Mode"
* **Isolated Data Persistence**: Workouts logged under Anthony are saved separately from Sarah's workouts (`apex_athlete_session_logs_partner`), preventing accidental overwrites.
* **Simple Mode**:
  * Strips away multi-sport cascading menus, dense science charts, and plate math.
  * Displays today's routine in plain English with estimated duration and movement count.
  * Features a **Sport & Position Drawer**: Tapping the sport pill on the Today card opens a bottom sheet to switch between Everyday Athlete, Boxing, Rugby, Football, Soccer, or Basketball (with positions).
  * **Custom Resistance Input**: Allows typing any weight or resistance (`35 lbs`, `Green Band`, `15 kg`, `BW`) directly, with stepper buttons removed for clean simplicity.
  * Large tap-to-complete checkmark buttons for gym floor convenience.

### 2. NutriPulse Nutrition App Sync (`BroadcastChannel`)
Whenever a workout is completed (in either Simple or Advanced mode), the app broadcasts a `WORKOUT_COMPLETED` message over the `nutripulse_workout_sync` BroadcastChannel:

```javascript
syncChannel.postMessage({
  type: 'WORKOUT_COMPLETED',
  workout: {
    id: 'w_' + Date.now(),
    title: 'Upper Body Strength',
    category: 'strength',          // 'strength' | 'cardio' | 'hiit' | 'mobility'
    durationMinutes: 45,
    caloriesBurned: 320,
    date: '2026-11-07',
    sourceApp: 'My AI Studio Workout App'
  }
});
```

### 3. Advanced S&C Floor Mode
* Multi-sport periodization (Hypertrophy $\rightarrow$ Max Strength $\rightarrow$ Power Conversion $\rightarrow$ Deload).
* Barbell plate calculator and warmup ramp calculator.
* Exercise alternatives / equipment swaps with biomechanical rationales.
* Ink-saving PDF exporter without manual logging blanks.

---

## 🚀 Development & Build Commands

```bash
# Install dependencies
npm install

# Run local development server (Port 3000)
npm run dev

# Run TypeScript type-checker
npm run lint

# Build production bundle
npm run build
```
